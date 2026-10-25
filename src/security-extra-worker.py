"""Additional fixed analysis recipes; UTF-8 JSON protocol, no sample execution."""
import sys, json, pathlib, importlib.metadata, hashlib, math, collections, zipfile, itertools, re
PACKAGES = ['androguard', 'dnfile', 'dncil', 'lief', 'yara-python', 'oletools', 'puremagic',
            'scapy', 'keystone-engine', 'unicorn', 'ropper', 'ROPGadget', 'flare-capa', 'flare-floss']

def run(a):
    action = a['action']
    if action == 'extra_versions':
        result = {}
        for p in PACKAGES:
            try: result[p] = importlib.metadata.version(p)
            except importlib.metadata.PackageNotFoundError: result[p] = None
        return result
    if action == 'assemble':
        from keystone import Ks, KS_ARCH_X86, KS_MODE_32, KS_MODE_64, KS_ARCH_ARM, KS_MODE_ARM, KS_ARCH_ARM64
        modes = {'x86': (KS_ARCH_X86, KS_MODE_32), 'x64': (KS_ARCH_X86, KS_MODE_64), 'arm': (KS_ARCH_ARM, KS_MODE_ARM), 'arm64': (KS_ARCH_ARM64, KS_MODE_ARM)}
        encoded, count = Ks(*modes[a['arch']]).asm(a['assembly'], addr=a['address'])
        return {'arch': a['arch'], 'address': a['address'], 'instructions': count, 'hex': bytes(encoded or []).hex()}
    p = pathlib.Path(a['file'])
    if action == 'apk':
        from loguru import logger
        logger.remove()
        from androguard.core.apk import APK
        apk = APK(str(p))
        if not apk.is_valid_APK(): raise ValueError('invalid APK manifest')
        return {'package': apk.get_package(), 'versionName': apk.get_androidversion_name(), 'versionCode': apk.get_androidversion_code(),
                'minSdk': apk.get_min_sdk_version(), 'targetSdk': apk.get_target_sdk_version(), 'mainActivity': apk.get_main_activity(),
                'permissions': apk.get_permissions()[:200], 'activities': apk.get_activities()[:200],
                'services': apk.get_services()[:200], 'receivers': apk.get_receivers()[:200],
                'providers': apk.get_providers()[:200], 'files': apk.get_files()[:200]}
    if action == 'dex':
        from loguru import logger
        logger.remove()
        from androguard.core.dex import DEX
        dex = DEX(p.read_bytes())
        return {'classes': [{'name': c.get_name(), 'super': c.get_superclassname(),
                             'methods': [{'name': m.get_name(), 'descriptor': m.get_descriptor()} for m in itertools.islice(c.get_methods(), 30)]}
                            for c in itertools.islice(dex.get_classes(), a['limit'])], 'limit': a['limit']}
    if action == 'dotnet':
        import dnfile
        pe = dnfile.dnPE(str(p), fast_load=False)
        try:
            if not pe.net: return {'managed': False}
            tables = pe.net.mdtables
            types = [{'namespace': str(t.TypeNamespace), 'name': str(t.TypeName)} for t in itertools.islice(getattr(tables.TypeDef, 'rows', []), a['limit'])]
            refs = [str(r.Name) for r in itertools.islice(getattr(tables.AssemblyRef, 'rows', []), a['limit'])]
            methods = [{'name': str(r.Name), 'rva': r.Rva} for r in itertools.islice(getattr(tables.MethodDef, 'rows', []), a['limit'])]
            return {'managed': True, 'types': types, 'assemblyReferences': refs, 'methods': methods}
        finally: pe.close()
    if action == 'yara':
        import yara
        # Includes disabled: rules cannot cause arbitrary file reads through include directives.
        rules = yara.compile(source=pathlib.Path(a['rules']).read_text(encoding='utf-8-sig'), includes=False)
        return {'matches': [{'rule': m.rule, 'namespace': m.namespace, 'tags': m.tags} for m in rules.match(data=p.read_bytes(), timeout=10)][:200]}
    if action == 'office':
        from oletools.olevba import VBA_Parser
        parser = VBA_Parser(str(p))
        try:
            found = parser.detect_vba_macros()
            macros = []
            if found:
                for _, stream, name, code in itertools.islice(parser.extract_macros(), 20):
                    macros.append({'name': name, 'stream': stream, 'preview': code[:1500]})
            return {'hasVba': found, 'macros': macros, 'indicators': list(itertools.islice(parser.analyze_macros() or [], 100)) if found else []}
        finally: parser.close()
    if action == 'archive':
        with zipfile.ZipFile(p) as z:
            items = z.infolist()
            return {'members': len(items), 'uncompressedBytes': sum(i.file_size for i in items),
                    'items': [{'name': i.filename, 'bytes': i.file_size, 'compressedBytes': i.compress_size,
                               'encrypted': bool(i.flag_bits & 1), 'pathRisk': i.filename.startswith(('/', '\\')) or '..' in pathlib.PurePosixPath(i.filename.replace('\\', '/')).parts}
                              for i in items[:a['limit']]], 'extracted': False}
    data = p.read_bytes()
    base = {'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()}
    if action == 'identify':
        import puremagic
        try: matches = [{'name': m.name, 'extension': m.extension, 'mime': m.mime_type, 'confidence': m.confidence} for m in puremagic.magic_string(data[:65536])[:20]]
        except puremagic.PureError: matches = []
        return dict(base, matches=matches, magic=data[:32].hex())
    if action == 'lief':
        import lief
        lief.logging.disable()
        binary = lief.parse(data)
        if binary is None: raise ValueError('unsupported executable format')
        return dict(base, format=type(binary).__module__, entrypoint=binary.entrypoint,
                    sections=[{'name': s.name, 'offset': s.offset, 'size': s.size, 'virtualAddress': s.virtual_address, 'entropy': s.entropy} for s in itertools.islice(binary.sections, 96)])
    if action == 'firmware':
        def entropy(block):
            n = len(block)
            return round(-sum((c/n)*math.log2(c/n) for c in collections.Counter(block).values()), 4) if n else 0
        signatures = [(b'\x7fELF', 'ELF'), (b'hsqs', 'SquashFS little endian'), (b'sqsh', 'SquashFS big endian'),
                      (b'UBI#', 'UBI'), (b'\x85\x19', 'JFFS2 little endian'), (b'\x27\x05\x19\x56', 'uImage'),
                      (b'\xd0\x0d\xfe\xed', 'FDT/FIT'), (b'PK\x03\x04', 'ZIP'), (b'\x1f\x8b\x08', 'gzip'),
                      (b'\xfd7zXZ\x00', 'XZ'), (b'7z\xbc\xaf\x27\x1c', '7zip')]
        hits=[]
        for sig, name in signatures:
            start=0
            for _ in range(20):
                offset=data.find(sig,start)
                if offset<0:break
                hits.append({'offset':offset,'signature':name});start=offset+len(sig)
        # Evenly sampled blocks cover the whole file; signatures are candidates, not extracted files.
        step=max(65536, math.ceil(max(1,len(data))/128))
        return dict(base, entropy=entropy(data), signatures=sorted(hits,key=lambda h:h['offset']),
                    blocks=[{'offset':i,'bytes':len(data[i:i+65536]),'entropy':entropy(data[i:i+65536])} for i in range(0,len(data),step)],
                    notice='签名命中可能为误报；未解压或执行内容')
    raise ValueError('unsupported recipe')

try:
    request=json.loads(sys.stdin.buffer.read().decode('utf-8'))
    print(json.dumps({'ok':True,'result':run(request)},ensure_ascii=True))
except Exception as e:
    print(json.dumps({'ok':False,'error':f'{type(e).__name__}: {e}'},ensure_ascii=True))
    sys.exit(1)
