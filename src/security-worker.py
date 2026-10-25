"""Fixed, offline analysis recipes. Requests arrive as JSON on stdin."""
import sys, json, pathlib, hashlib, re, importlib.metadata, itertools

PACKAGES = ['pefile', 'pyelftools', 'capstone', 'dpkt', 'frida-tools', 'frida', 'mitmproxy']

def run(a):
    action = a['action']
    if action == 'versions':
        return {p: importlib.metadata.version(p) for p in PACKAGES}
    if action == 'devices':
        import frida
        return [{'id': d.id, 'name': d.name, 'type': d.type} for d in frida.enumerate_devices()]
    p = pathlib.Path(a['file'])
    if action == 'flows':
        from mitmproxy import io, http
        rows = []
        with p.open('rb') as f:
            for flow in itertools.islice(io.FlowReader(f).stream(), a['limit']):
                if isinstance(flow, http.HTTPFlow):
                    req, res = flow.request, flow.response
                    rows.append({'method': req.method, 'scheme': req.scheme, 'host': req.host,
                                 'port': req.port, 'path': req.path[:1000],
                                 'status': res.status_code if res else None,
                                 'requestBytes': len(req.raw_content or b''),
                                 'responseBytes': len(res.raw_content or b'') if res else 0})
        return {'flows': rows, 'limit': a['limit'], 'scope': 'prefix; bodies and credentials omitted'}
    if action == 'pcap':
        import dpkt, socket
        rows = []
        with p.open('rb') as f:
            try:
                reader = dpkt.pcap.Reader(f)
            except ValueError:
                f.seek(0)
                reader = dpkt.pcapng.Reader(f)
            link = reader.datalink()
            for ts, buf in itertools.islice(reader, a['limit']):
                row = {'time': float(ts), 'bytes': len(buf), 'linktype': link}
                try:
                    ip = dpkt.ethernet.Ethernet(buf).data if link == 1 else dpkt.ip.IP(buf) if link in (101, 228) else None
                    if isinstance(ip, (dpkt.ip.IP, dpkt.ip6.IP6)):
                        af = socket.AF_INET if len(ip.src) == 4 else socket.AF_INET6
                        row.update(src=socket.inet_ntop(af, ip.src), dst=socket.inet_ntop(af, ip.dst), protocol=ip.p)
                        if isinstance(ip.data, (dpkt.tcp.TCP, dpkt.udp.UDP)):
                            row.update(sport=ip.data.sport, dport=ip.data.dport)
                    else:
                        row['note'] = 'non-IP or unsupported link type'
                except (ValueError, dpkt.Error):
                    row['note'] = 'malformed or unsupported packet'
                rows.append(row)
        return {'packets': rows, 'limit': a['limit'], 'scope': 'prefix; payload omitted'}
    if action == 'disasm':
        import capstone as c
        modes = {'x86': (c.CS_ARCH_X86, c.CS_MODE_32), 'x64': (c.CS_ARCH_X86, c.CS_MODE_64),
                 'arm': (c.CS_ARCH_ARM, c.CS_MODE_ARM), 'thumb': (c.CS_ARCH_ARM, c.CS_MODE_THUMB),
                 'arm64': (c.CS_ARCH_ARM64, c.CS_MODE_ARM)}
        with p.open('rb') as f:
            f.seek(a['offset'])
            data = f.read(a['size'])
        md = c.Cs(*modes[a['arch']])
        return {'arch': a['arch'], 'fileOffset': a['offset'], 'bytesRead': len(data),
                'instructions': [{'address': i.address, 'bytes': i.bytes.hex(), 'mnemonic': i.mnemonic, 'operands': i.op_str}
                                 for i in md.disasm(data, a['address'], count=256)]}
    data = p.read_bytes()
    base = {'file': str(p), 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()}
    if action == 'strings':
        # Report byte offsets in each encoding; no execution or extraction to disk.
        rows = []
        for encoding, pattern in [('ascii', rb'[\x20-\x7e]{4,}'), ('utf16le', rb'(?:[\x20-\x7e]\x00){4,}')]:
            for m in re.finditer(pattern, data):
                rows.append({'offset': m.start(), 'encoding': encoding, 'text': m.group().decode('utf-16-le' if encoding == 'utf16le' else encoding)[:500]})
                if len(rows) >= a['limit']:
                    break
            if len(rows) >= a['limit']:
                break
        return dict(base, strings=rows, limit=a['limit'])
    if data[:2] == b'MZ':
        import pefile
        pe = pefile.PE(data=data, fast_load=True)
        pe.parse_data_directories(directories=[pefile.DIRECTORY_ENTRY['IMAGE_DIRECTORY_ENTRY_IMPORT'], pefile.DIRECTORY_ENTRY['IMAGE_DIRECTORY_ENTRY_EXPORT']])
        def text(x): return x.decode('utf-8', errors='replace') if x else ''
        result = dict(base, format='PE', machine=hex(pe.FILE_HEADER.Machine), imageBase=pe.OPTIONAL_HEADER.ImageBase,
                      entryRva=pe.OPTIONAL_HEADER.AddressOfEntryPoint,
                      sections=[{'name': text(s.Name.rstrip(b'\0')), 'rva': s.VirtualAddress, 'offset': s.PointerToRawData,
                                 'size': s.SizeOfRawData, 'entropy': s.get_entropy(), 'flags': hex(s.Characteristics)} for s in pe.sections[:96]],
                      imports=[{'dll': text(d.dll), 'symbols': [text(i.name) or f'ordinal:{i.ordinal}' for i in d.imports[:128]]}
                               for d in getattr(pe, 'DIRECTORY_ENTRY_IMPORT', [])[:64]],
                      exports=[text(s.name) or f'ordinal:{s.ordinal}' for s in getattr(getattr(pe, 'DIRECTORY_ENTRY_EXPORT', None), 'symbols', [])[:256]])
        pe.close()
        return result
    if data[:4] == b'\x7fELF':
        from elftools.elf.elffile import ELFFile
        with p.open('rb') as f:
            elf = ELFFile(f)
            return dict(base, format='ELF', bits=elf.elfclass, littleEndian=elf.little_endian,
                        header={k: elf.header[k] for k in ('e_type', 'e_machine', 'e_entry', 'e_phoff', 'e_shoff')},
                        sections=[{'name': s.name, 'type': s['sh_type'], 'address': s['sh_addr'], 'offset': s['sh_offset'], 'size': s['sh_size']}
                                  for s in itertools.islice(elf.iter_sections(), 128)])
    return dict(base, format='unknown', magic=data[:32].hex())

try:
    # -I deliberately ignores PYTHON* variables; decode the JSON protocol explicitly.
    print(json.dumps({'ok': True, 'result': run(json.loads(sys.stdin.buffer.read().decode('utf-8')))}, ensure_ascii=True))
except Exception as e:
    print(json.dumps({'ok': False, 'error': f'{type(e).__name__}: {e}'}, ensure_ascii=True))
    sys.exit(1)
