"""Acquire pinned, licensed technical documents as substantive searchable cards."""
import concurrent.futures, hashlib, html, json, pathlib, re, time, urllib.request

ROOT=pathlib.Path(__file__).resolve().parents[1]
PACK=ROOT/'knowledge/vm-shell-crypto'
BATCH='focused-2026-10-25-003'
DATE='2026-10-25T00:00:00+08:00'
CACHE=pathlib.Path(__import__('tempfile').gettempdir())/'wanxiang-pinned-documents'
CACHE.mkdir(exist_ok=True)
def sha(b):return hashlib.sha256(b).hexdigest()
def get(url):
    dest=CACHE/(sha(url.encode())+'.txt')
    if dest.exists():return dest.read_bytes()
    for attempt in range(3):
        try:
            with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'WanxiangKnowledge/1.0'}),timeout=45) as r:raw=r.read(5_000_000)
            if len(raw)>=50:dest.write_bytes(raw)
            return raw
        except Exception:
            if attempt==2:raise
            time.sleep(1+attempt)

def inline_pod(s):
    # Protect POD angle brackets before treating nested inline formatting.
    s=s.replace('E<lt>','\u0001').replace('E<gt>','\u0002').replace('E<sol>','/')
    for _ in range(6):
        old=s
        s=re.sub(r'B<([^<>]*)>',r'**\1**',s)
        s=re.sub(r'[CI]<([^<>]*)>',r'`\1`',s)
        s=re.sub(r'F<([^<>]*)>',r'`\1`',s)
        s=re.sub(r'L<([^<>]*)>',lambda m: (m[1].split('|',1)[0] if '|' in m[1] else m[1]),s)
        s=re.sub(r'[SZ]<([^<>]*)>',r'\1',s)
        s=re.sub(r'E<([^<>]*)>',lambda m:html.unescape('&'+m[1]+';'),s)
        if s==old:break
    return s.replace('\u0001','<').replace('\u0002','>')

def pod_markdown(raw):
    out=[];code=[];skip=False
    def flush():
        if code:out.extend(['```c',*code,'```','']);code.clear()
    for line in raw.splitlines():
        if line.startswith('=begin '):flush();skip=True;continue
        if line.startswith('=end '):skip=False;continue
        if skip:continue
        if line.startswith(('=pod','=cut','=over','=back','=for ')):flush();continue
        m=re.match(r'=head([1-4])\s+(.+)',line)
        if m:flush();out.extend(['#'*(int(m[1])+1)+' '+inline_pod(m[2]),'']);continue
        if line.startswith('=item'):flush();out.append('- '+inline_pod(line[5:].strip()));continue
        if line.startswith((' ','\t')):code.append(line[1:] if line.startswith(' ') else line);continue
        if not line and code:code.append('');continue
        flush();out.append(inline_pod(line))
    flush()
    return '\n'.join(out).strip()

def rst_markdown(raw):
    lines=raw.splitlines();out=[];i=0
    levels={};chars='=-~^"+#*'
    while i<len(lines):
        line=lines[i]
        if i+2<len(lines) and re.fullmatch(r'([=~^"+#*\-])\1{2,}',line.strip()) and lines[i+2].strip()==line.strip():
            i+=1;continue
        if i+1<len(lines) and len(lines[i+1].strip())>=max(3,len(line.strip())) and re.fullmatch(r'([=~^"+#*\-])\1{2,}',lines[i+1].strip()) and line.strip():
            c=lines[i+1].strip()[0];levels.setdefault(c,min(len(levels)+2,6));out.extend(['#'*levels[c]+' '+line.strip(),'']);i+=2;continue
        if re.match(r'\.\. _[^:]+:\s*$',line):i+=1;continue
        m=re.match(r'(\s*)\.\. (?:code-block|sourcecode|parsed-literal)::\s*(\S*)',line)
        if m:
            indent=len(m[1]);i+=1
            while i<len(lines) and (not lines[i].strip() or lines[i].lstrip().startswith(':')):i+=1
            block=[]
            while i<len(lines) and (not lines[i].strip() or len(lines[i])-len(lines[i].lstrip())>indent):block.append(lines[i]);i+=1
            nonempty=[len(x)-len(x.lstrip()) for x in block if x.strip()];base=min(nonempty) if nonempty else 0
            out.extend(['```'+m[2],*[x[base:] for x in block],'```','']);continue
        if re.match(r'\s*\.\. (?:include|literalinclude|table|list-table|toctree|image|figure|graphviz|doxygen\w*)::',line):
            # Keep unresolved directives legible and explicitly identify the limitation.
            out.append('> 原文 RST 指令（依赖上游工程，未展开）：`'+line.strip()+'`');i+=1;continue
        line=re.sub(r'`([^`<>]+)\s*<([^>]+)>`__?',r'[\1](\2)',line)
        line=re.sub(r':(?:ref|doc|func|class|meth|attr|option|program|file|c:func|c:type|cpp:class):`([^`]+)`',r'`\1`',line)
        line=re.sub(r'``([^`]+)``',r'`\1`',line)
        out.append(line);i+=1
    return '\n'.join(out).strip()

FAMILIES=[
 ('EVP_PKEY','非对称密钥与签名','非对称密码,公钥,私钥,签名,密钥管理'),
 ('EVP_CIPHER','对称密码与工作模式','对称加密,分组密码,加密算法,工作模式'),
 ('EVP_MD','摘要算法','哈希,消息摘要,加密算法'),('EVP_MAC','消息认证码','消息认证,HMAC,完整性'),
 ('EVP_KDF','密钥派生','密钥派生,KDF,加密算法'),('EVP_RAND','密码随机数','随机数,熵源,DRBG'),
 ('EVP_','EVP 密码接口','加密算法,密码接口,Provider'),('OSSL_PROVIDER','Provider 架构','加密算法,Provider,算法获取'),
 ('provider','Provider 架构','加密算法,Provider,算法实现'),('BN_','大整数运算','大整数,模运算,密码实现'),
 ('EC_','椭圆曲线','椭圆曲线,非对称密码,公钥'),('RSA','RSA 密码','RSA,非对称密码,填充'),
 ('AES','AES 分组密码','AES,对称加密,分组密码'),('SHA','SHA 摘要','SHA,消息摘要,哈希'),
 ('HMAC','消息认证码','HMAC,消息认证,完整性'),('RAND','密码随机数','随机数,熵源,密钥生成'),
 ('ASN1','ASN.1 编码','ASN.1,DER,编码解析,二进制格式'),('d2i','ASN.1 解码','ASN.1,DER,解码'),
 ('i2d','ASN.1 编码','ASN.1,DER,编码'),('PKCS','PKCS 密码容器','PKCS,密钥容器,密码标准'),
 ('PEM','PEM 编码','PEM,密钥容器,编码'),('X509','证书与信任链','X.509,证书,信任链'),
 ('SSL','TLS 协议','TLS,握手,协议,加密算法'),('BIO','密码数据流','BIO,输入输出,缓冲区'),
 ('OPENSSL','密码库基础设施','OpenSSL,内存,密码库'),('CRYPTO','密码库基础设施','OpenSSL,线程,密码库')]

GLOSSARY={
 'AliasAnalysis':'别名分析','Atomics':'原子操作与内存模型','BitCodeFormat':'位码格式','CodeGenerator':'代码生成器',
 'Coroutines':'协程','DebuggingJITedCode':'JIT 代码调试','ExceptionHandling':'异常处理','GarbageCollection':'垃圾回收',
 'GetElementPtr':'指针寻址语义','InAlloca':'栈参数存储','JITLink':'JIT 链接器','LangRef':'中间表示语言规范',
 'LibFuzzer':'覆盖引导模糊测试','LinkTimeOptimization':'链接时优化','MCJITDesignAndImplementation':'MCJIT 设计与实现',
 'MIRLangRef':'机器中间表示','MemorySSA':'内存静态单赋值','NewPassManager':'优化 Pass 管理器','ORCv2':'ORC JIT 架构',
 'OpaquePointers':'不透明指针','ScudoHardenedAllocator':'Scudo 加固分配器','SourceLevelDebugging':'源码级调试信息',
 'StackMaps':'栈映射','StackSafetyAnalysis':'栈安全分析','Statepoints':'垃圾回收安全点','TypeMetadata':'类型元数据',
 'UndefinedBehavior':'未定义行为','Vectorizers':'向量化','WritingAnLLVMBackend':'后端实现','XRay':'函数执行追踪',
 'AddressSanitizer':'地址消毒器','MemorySanitizer':'未初始化内存检测','ThreadSanitizer':'数据竞争检测',
 'UndefinedBehaviorSanitizer':'未定义行为检测','DataFlowSanitizer':'数据流追踪','SanitizerCoverage':'覆盖率插桩',
 'ControlFlowIntegrity':'控制流完整性','ControlFlowIntegrityDesign':'控制流完整性设计','SafeStack':'安全栈',
 'ShadowCallStack':'影子调用栈','PointerAuthentication':'指针认证','AutomaticReferenceCounting':'自动引用计数',
 'ClangStaticAnalyzer':'静态分析器','ConstantInterpreter':'常量表达式解释器','DriverInternals':'编译驱动内部机制',
 'InternalsManual':'编译器内部机制','IntroductionToTheClangAST':'抽象语法树','ItaniumMangleAbiTags':'名称修饰与 ABI 标签',
 'LanguageExtensions':'语言扩展','LeakSanitizer':'内存泄漏检测','MSVCCompatibility':'MSVC 兼容性',
 'PCHInternals':'预编译头内部格式','SafeBuffers':'缓冲区安全','SourceBasedCodeCoverage':'源码覆盖率',
 'ThreadSafetyAnalysis':'线程安全分析','ThinLTO':'ThinLTO 链接优化','TypeSanitizer':'类型别名违规检测',
 'tcg':'TCG 动态翻译','atomics':'原子操作','decodetree':'指令译码树','memory':'内存模型',
 'migration':'虚拟机迁移','multi-thread-tcg':'多线程 TCG','multi-thread-tcg-design':'多线程 TCG 设计',
 'qom':'对象模型','qapi-code-gen':'QAPI 代码生成','secure-coding-practices':'安全编码','crypto':'密码后端',
 'control-flow-integrity':'控制流完整性','reset':'设备复位','rcu':'读复制更新','virtio':'半虚拟化设备',
 'qemu-block-drivers':'块设备驱动','qemu-cpu-models':'CPU 模型','qemu-storage-daemon':'存储守护进程'}

def candidates():
    src=PACK/'sources'
    oi=json.loads((src/'openssl-inventory.json').read_text(encoding='utf8'))
    op=[x['path'] for x in oi['tree'] if re.match(r'doc/man[37]/.*\.pod$',x['path'])]
    def score(p):
        n=pathlib.PurePosixPath(p).stem
        return (0 if '/man7/' in p and re.search('EVP_|provider|crypto|fips',n,re.I) else 1 if re.match('EVP_|BN_|EC_|RSA|AES|SHA|HMAC|RAND|OSSL_',n) else 2 if '/man7/' in p else 3,n)
    yield 'openssl',320,'openssl/openssl','openssl-3.5.0',oi['sha'],sorted(op,key=score)
    excluded=re.compile(r'index|CodeOfConduct|CodeReview|CodingStandards|Contribut|DeveloperPolicy|Release|Getting|HowToBuild|CMake|Docker|GitHub|GitBisect|BugLife|Meetup|Sphinx|Reporting|ResponseGuide|SupportPolicy|SecurityTransparency|AdvancedBuild|BuildingA|Project|HowToAddABuilder|MyFirst|HowToSubmit|CompileCuda|TestSuiteMakefile|TestingGuide|Security\.rst|^Reference\.rst$|UserGuides|FAQ|ClangFormat|ExternalClangExamples|ClangTools|ClangStaticAnalyzer',re.I)
    for name,n in [('llvm',90),('clang',50)]:
        inv=json.loads((src/(name+'-inventory.json')).read_text(encoding='utf8'))
        paths=[x['path'] for x in inv if x['name'].endswith('.rst') and not excluded.search(x['name'])]
        paths.sort(key=lambda x:(0 if pathlib.PurePosixPath(x).stem in GLOSSARY else 1,x))
        yield name,n,'llvm/llvm-project','llvmorg-20.1.0','tag:llvmorg-20.1.0',paths
    qi=json.loads((src/'qemu-inventory.json').read_text(encoding='utf8'))
    paths=[x['path'] for x in qi['tree'] if x['path'].endswith('.rst') and x['path'].startswith(('docs/devel/','docs/system/')) and not re.search(r'index|code-of-conduct|build-|style|submitting|testing/|maintainer|rust/|test|virtio-net-failover|conflict-resolution|trivial-patches|stable-process|docs\.rst|codebase|sphinx',x['path'])]
    paths.sort(key=lambda p:(0 if p.startswith('docs/devel/') else 1,p))
    yield 'qemu',60,'qemu/qemu','v10.0.0',qi['sha'],paths

def acquire(arg):
    group,repo,ref,tree,p=arg;url=f'https://raw.githubusercontent.com/{repo}/{ref}/{p}'
    try:
        raw=get(url);text=raw.decode('utf8');stem=pathlib.PurePosixPath(p).stem
        if len(text)<1500 or len(re.findall(r'\b[A-Za-z]{2,}\b',text))<180:return None
        if group=='openssl' and not all(s in text for s in ['=head1 NAME','=head1 DESCRIPTION']):return None
        if group=='openssl':
            # NAME is not the content: require substantive DESCRIPTION as well.
            desc=re.split(r'=head1 DESCRIPTION\s*',text,maxsplit=1)[1].split('=head1')[0].strip()
            if len(desc)<600:return None
            name=inline_pod(re.split(r'=head1 NAME\s*',text,maxsplit=1)[1].split('=head1')[0]).strip()
            category,tags=next(((c,t.split(',')) for prefix,c,t in FAMILIES if stem.startswith(prefix)),('密码实现与接口',['加密算法','OpenSSL','密码实现']))
            if stem.startswith('EVP_CIPHER-'):category='对称密码：'+stem.removeprefix('EVP_CIPHER-')
            elif stem.startswith('EVP_MD-'):category='摘要算法：'+stem.removeprefix('EVP_MD-')
            elif stem.startswith('EVP_KDF-'):category='密钥派生：'+stem.removeprefix('EVP_KDF-')
            elif stem.startswith('EVP_MAC-'):category='消息认证：'+stem.removeprefix('EVP_MAC-')
            title='OpenSSL：'+category+' · '+stem+'（'+pathlib.PurePosixPath(p).parent.name+'）'
            markdown=pod_markdown(text);summary=re.sub(r'\s+',' ',re.sub(r'^=\w+[^\n]*','',inline_pod(desc),flags=re.M))[:1100]
            project='密码算法与实现';license_name='Apache-2.0'
        else:
            headers=[];lines=text.splitlines()
            for i,line in enumerate(lines[:-1]):
                if line.strip() and re.fullmatch(r'([=~^"+#*\-])\1{2,}',lines[i+1].strip()):headers.append(line.strip())
            # Exclude navigation-only documents without meaningful prose.
            prose=' '.join(line.strip() for line in lines if line.strip() and not line.startswith(('..',':')))
            if len(prose)<1200:return None
            name=headers[0] if headers else stem
            category=GLOSSARY.get(stem,name.replace('``',''))
            title=('QEMU' if group=='qemu' else group.upper())+'：'+category
            if group=='qemu' and '/system/arm/' in p:title='QEMU：ARM设备模型 · '+stem
            tags=['软件底层','编译器','逆向分析',stem] if group!='qemu' else ['VM','系统虚拟机','QEMU','底层实现',stem]
            if any(x.lower() in stem.lower() for x in ['sanit','safety','safe','fuzzer','integrity']):tags+=['漏洞研究','内存安全']
            markdown=rst_markdown(text)
            summary=re.sub(r'\s+',' ',re.sub(r'^#+ .*|^> .*|^[=~^"+#*\-]+$','',markdown,flags=re.M)).strip()[:1100]
            project='VM与动态翻译' if group=='qemu' else '编译器与漏洞研究'
            license_name='GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）' if group=='qemu' else 'Apache-2.0 WITH LLVM-exception'
            spdx=re.search(r'SPDX-License-Identifier:\s*([^\n]+)',text)
            if spdx:license_name=spdx[1].strip()
        return dict(group=group,path=p,repo=repo,ref=ref,tree=tree,url=url,raw=raw,text=text,stem=stem,title=title,name=name,category=category,tags=tags,summary=summary,markdown=markdown,project=project,license=license_name)
    except Exception as e:
        print('SKIP',group,p,str(e),flush=True);return None

def write_card(row):
    group=row['group'];slug=re.sub('[^a-z0-9-]+','-',row['path'].lower().removesuffix('.pod').removesuffix('.rst')).strip('-')
    ident='wx-re-doc-'+group+'-'+slug
    asset=f'sources/{BATCH}/originals/{group}/{row["path"]}'
    dest=PACK/asset;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(row['raw'])
    sourceid=ident.removeprefix('wx-re-')
    url=f'https://github.com/{row["repo"]}/blob/{row["ref"]}/{row["path"]}'
    lead=f'本文收录 {group.upper()} 的独立技术文献正文，固定标签 `{row["ref"]}`。主题：{row["category"]}。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。'
    body=f'# {row["title"]}\n\n> {lead}\n\n## 内容定位\n\n{row["name"]}\n\n## 技术正文\n\n{row["markdown"]}\n\n## 来源、版本与核验\n\n- 上游：[{row["path"]}]({url})\n- 作者：{row["repo"]} 项目贡献者，原文内具体署名保留。\n- 标签：{row["ref"]}；树标识：{row["tree"]}；获取日期：2026-10-25。\n- 许可：{row["license"]}；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。\n- 原始文件：`{asset}`；SHA-256：`{sha(row["raw"])}`。\n- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。\n'
    meta=dict(schemaVersion=2,id=ident,title=row['title'],type='note',tags=list(dict.fromkeys(row['tags']+[group,row['stem']])),project=row['project'],createdAt=DATE,updatedAt=DATE,sourceSession='external:'+BATCH,sourceTitle='固定版本公开许可技术文献（非宿主会话）',sourceSeqs=[],snapshotHash=sha(row['raw']),generatedHash=sha(body.encode()),archived=False,verification='固定标签正文收录；自动结构核验；未逐篇翻译或实验复现',l0=row['category']+'：'+re.sub(r'\s+',' ',row['name'])[:300],l1=row['summary'][:850],questions=[f'{row["stem"]} 如何用于{row["category"]}？',f'{row["stem"]} 有哪些参数、约束、实现语义和注意事项？'],validFrom=DATE,invalidAt=None,links=[],externalSources=[dict(id=sourceid,url=url,checkedAt='2026-10-25',version=row['ref'])],batchId=BATCH,contentLicense=row['license'])
    content='---\n'+json.dumps(meta,ensure_ascii=False,indent=2)+'\n---\n'+body
    target=PACK/'cards'/f'{ident}.md';target.parent.mkdir(exist_ok=True);target.write_text(content,encoding='utf8')
    return dict(id=ident,title=row['title'],file='cards/'+target.name,sha256=sha(target.read_bytes()),sourceIds=[sourceid]),dict(id=sourceid,title=row['title'],url=url,author=row['repo']+' contributors',version=row['ref'],tree=row['tree'],sha256=sha(row['raw']),asset=asset,mode='许可文献正文收录；英文原文，中文检索元数据',status='正文已取得；自动结构核验；未逐篇人工翻译/复现',checkedAt='2026-10-25')

if __name__=='__main__':
    prior=PACK/'document-entries.json'
    prior_entries=json.loads(prior.read_text(encoding='utf8')) if prior.exists() else []
    groups=list(candidates());selected=[];counts={}
    # Download bounded candidate lists, then select by explicit substantive-content rules.
    for group,target,repo,ref,tree,paths in groups:
        args=[(group,repo,ref,tree,p) for p in paths]
        good=[]
        for start in range(0,len(args),24):
            with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
                good.extend(x for x in pool.map(acquire,args[start:start+24]) if x)
            print('ACQUIRED',group,len(good),'target',target,flush=True)
            if len(good)>=target:break
        selected.extend(good[:target]);counts[group]=min(len(good),target)
    # Never count failures or short stubs. Make up any category shortfall using remaining cryptography documents.
    if len(selected)<520:
        group,target,repo,ref,tree,paths=groups[0];used={x['path'] for x in selected if x['group']=='openssl'}
        for start in range(0,len(paths),24):
            args=[(group,repo,ref,tree,p) for p in paths[start:start+24] if p not in used]
            with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
                for row in pool.map(acquire,args):
                    if row and len(selected)<520:selected.append(row);counts['openssl']+=1;used.add(row['path'])
            if len(selected)>=520:break
    assert len(selected)==520,(len(selected),counts)
    entries=[];sources=[]
    for row in selected:
        e,s=write_card(row);entries.append(e);sources.append(s)
    new_files={e['file'] for e in entries}
    for old in prior_entries:
        if old['file'] not in new_files:
            f=PACK/old['file']
            if f.exists():
                assert f.resolve().is_relative_to((PACK/'cards').resolve())
                assert sha(f.read_bytes())==old['sha256'],'Refuse to remove edited prior generated card'
                f.unlink()
    licenses=[('openssl','openssl/openssl','openssl-3.5.0','LICENSE.txt'),('llvm','llvm/llvm-project','llvmorg-20.1.0','LICENSE.TXT'),('qemu','qemu/qemu','v10.0.0','COPYING'),('qemu','qemu/qemu','v10.0.0','COPYING.LIB')]
    for group,repo,ref,p in licenses:
        raw=get(f'https://raw.githubusercontent.com/{repo}/{ref}/{p}');dest=PACK/'sources'/BATCH/'licenses'/group/p;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(raw)
    (PACK/'sources'/f'{BATCH}.json').write_text(json.dumps(dict(batchId=BATCH,retrievedAt='2026-10-25',sources=sources,counts=counts),ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    (PACK/'document-entries.json').write_text(json.dumps(entries,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    print('DONE',json.dumps(counts),len(entries),flush=True)
