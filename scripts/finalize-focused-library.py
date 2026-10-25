import collections,hashlib,json,pathlib,re
ROOT=pathlib.Path(__file__).resolve().parents[1]
PACK=ROOT/'knowledge/vm-shell-crypto'
BATCH='focused-2026-10-25-003'
def sha(b):return hashlib.sha256(b).hexdigest()

entries=json.loads((PACK/'document-entries.json').read_text(encoding='utf8'))+json.loads((PACK/'original-entries.json').read_text(encoding='utf8'))
registry=json.loads((PACK/'sources'/f'{BATCH}.json').read_text(encoding='utf8'))
all_ids={e['id'] for e in entries}
prior_ids=set()
for folder in ['reverse-engineering','security-research']:
    prior_ids.update(e['id'] for e in json.loads((ROOT/'knowledge'/folder/'manifest.json').read_text(encoding='utf8'))['entries'])

def focus(name):return 'wx-re-focus-'+name
anchors=[
 ('hmac','crypto-hmac-layers'),('hkdf','crypto-hkdf-context'),('pbkdf','crypto-pbkdf2-params'),
 ('argon','crypto-argon2-memory'),('rsa','crypto-rsa-oaep'),('x25519','crypto-x25519-kdf'),
 ('ed25519','crypto-ed25519-variants'),('sm4','crypto-sm4-provider'),('sm3','crypto-sm3-interface'),
 ('aes','crypto-aes-shape'),('chacha','crypto-chacha-quarter'),('poly1305','crypto-chacha-quarter'),
 ('sha','crypto-sha-state'),('alias','vm-alias-state'),('langref','vm-llvm-poison'),
 ('memoryssa','vm-taint-slice'),('jit','vm-jit-cache'),('tcg','vm-jit-cache'),('atomics','vm-state-model')]
explicit={
 'shell-pe-tls':'wx-re-pe-address','shell-pe-relocation':'wx-re-pe-address','shell-unwind-metadata':'wx-re-x64-abi',
 'shell-android-inmemory':'wx-re-dex-indices','shell-confuser-features':'wx-re-dotnet-layers',
 'vm-path-coverage':'wx-re-symbolic-constraints','vm-lifting-memory':'wx-re-decompiler-evidence',
 'vm-trace-completeness':focus('vm-state-model'),'vm-context-rotation':focus('vm-stack-register'),
 'crypto-cbc-chain':focus('crypto-aes-shape'),'crypto-ctr-counter':focus('crypto-aes-shape'),
 'crypto-gcm-auth':focus('crypto-aes-shape'),'crypto-xtea-diff':focus('crypto-tea-width'),
 'crypto-xxtea-length':focus('crypto-xtea-diff'),'crypto-rsa-pss':focus('crypto-rsa-oaep'),
 'crypto-sm3-interface':focus('crypto-sha-state'),'crypto-constant-compare':focus('crypto-hmac-layers')}
counts=collections.Counter();edge_count=0
for entry in entries:
    file=PACK/entry['file'];raw=file.read_text(encoding='utf8');parts=raw.split('\n---\n',1)
    meta=json.loads(parts[0][4:]);body=parts[1]
    links=[]
    if meta['id'].startswith('wx-re-doc-'):
        lower=meta['id'].lower()
        target=next((focus(slug) for word,slug in anchors if word in lower),None)
        if target:links.append(dict(to=target,kind='机制参照'))
        if 'sanitizer' in lower:links.append(dict(to='wx-re-cwe-787',kind='检测相关'))
        if 'fuzzer' in lower:links.append(dict(to='wx-re-cwe-20',kind='检测相关'))
    else:
        slug=meta['id'].removeprefix('wx-re-focus-')
        if slug in explicit:links.append(dict(to=explicit[slug],kind='相关机制'))
    meta['links']=links
    # Add useful Chinese algorithm aliases to API cards without replacing the source wording.
    searchtext=(meta['title']+' '+meta['l0']).upper()
    aliases={'ARGON2':'Argon2口令哈希','HKDF':'HKDF密钥派生','PBKDF2':'PBKDF2口令派生','SCRYPT':'scrypt内存硬度',
             'RSA':'RSA非对称密码','ECDSA':'椭圆曲线签名','ECDH':'椭圆曲线密钥交换','ED25519':'Ed25519签名',
             'X25519':'X25519密钥协商','AES':'AES高级加密标准','SHAKE':'SHAKE可扩展输出','SHA3':'SHA3摘要',
             'SM2':'国密SM2','SM3':'国密SM3','SM4':'国密SM4','BLAKE2':'BLAKE2摘要','HMAC':'HMAC消息认证',
             'POLY1305':'Poly1305认证','CHACHA':'ChaCha流密码','SIPHASH':'SipHash带密钥哈希','KMAC':'KMAC消息认证'}
    meta['tags']=list(dict.fromkeys(meta['tags']+[alias for word,alias in aliases.items() if word in searchtext]))
    for link in links:assert link['to'] in all_ids|prior_ids,link
    edge_count+=len(links);counts[meta['project']]+=1
    file.write_text('---\n'+json.dumps(meta,ensure_ascii=False,indent=2)+'\n---\n'+body,encoding='utf8',newline='\n')
    entry['sha256']=sha(file.read_bytes())

assets=[]
asset_files={s['asset'] for s in registry['sources'] if 'asset' in s}
asset_files.update(str(p.relative_to(PACK)).replace('\\','/') for p in (PACK/'sources'/BATCH/'licenses').rglob('*') if p.is_file())
asset_files.add('sources/acquisition.json')
for name in sorted(asset_files):assets.append(dict(file=name,sha256=sha((PACK/name).read_bytes())))
manifest=dict(schemaVersion=1,batchId=BATCH,checkedAt='2026-10-25',kind='54条中文原创机制归纳与520篇固定版本许可技术正文',sourceCount=len(registry['sources']),entries=entries,assets=assets,counts=dict(counts),previousEntries=len(prior_ids),newEntries=len(entries),totalEntries=len(prior_ids)+len(entries),relationships=edge_count)
(PACK/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf8')

text=f'''# VM、壳、密码算法与底层研究 · 新增574条

2026-10-25，本批**新增574条独立知识正文**，此前608条不抵扣本批数量，合计1182条。目录、来源、许可和失败页面均不计入。

| 内容 | 新增条数 | 收录方式 |
| --- | ---: | --- |
| VM与去虚拟化 | 20 | 中文原创机制卡片，含构造分析例与边界 |
| 壳与装载研究 | 12 | 中文原创机制卡片 |
| 密码算法机制 | 22 | 中文原创机制卡片 |
| OpenSSL密码算法与实现 | 320 | 固定openssl-3.5.0标签的独立文献正文 |
| LLVM/Clang编译与漏洞研究 | 140 | 固定llvmorg-20.1.0标签的独立文献正文 |
| QEMU系统VM与动态翻译 | 60 | 固定v10.0.0标签的独立文献正文 |

## 阅读与检索

54条原创卡片以中文解释机制，构造示例未执行。520篇许可文献保留**英文技术正文**，配中文分类、部分中文标题、算法别名与检索问法；不宣称全部翻译为中文。每篇都有独立内容、固定标签、原始文件、SHA-256与许可。代码示例均未执行，文献不是逐篇实验复现报告。

保护VM和系统VM分别组织：前者包括VPC/VSP、分发、Handler融合、上下文轮转、切片、MBA、IR与路径覆盖；后者包括TCG、内存模型、译码、迁移与设备仿真。壳专题涉及UPX、Themida、Code Virtualizer、WinLicense、Enigma、ConfuserEx及PE/Android装载。

算法专题覆盖TEA/XTEA/XXTEA、AES、CBC/CTR/GCM、ChaCha20、SHA/SM3、SM4、HMAC、HKDF、PBKDF2、Argon2id、RSA-OAEP/PSS、X25519、Ed25519等；标准算法与历史兼容研究分清用途，不把旧参数当作新系统建议。

## 来源与核验状态

吾爱破解suno的VM跟踪原帖、看雪zZhouQing的VMP3.5.1研究原帖已取得正文并归纳。先知新候选仍返回验证内容，未计为新正文；此前已收录的先知3篇继续保留。ASPack页面获取失败、MPRESS页面无有效正文，也没有据此生成卡片。不会把其他站转载当作这些论坛的原始证据。

OpenSSL遵循Apache-2.0，LLVM/Clang遵循Apache-2.0 WITH LLVM-exception；QEMU按原文件单独声明及仓库许可保留。原始文件及许可位于sources/{BATCH}/，原始署名保留，不随插件代码许可改变。RST工程include、跨页引用或生成表可能未展开，原始文件和上游链接用于复核。

## 增量导入

```powershell
node scripts/import-reverse-knowledge.mjs --root "C:\\Users\\Administrator\\Documents\\万象知识库" --source "C:\\Users\\Administrator\\Desktop\\万象知识库\\knowledge\\vm-shell-crypto"
```

导入仅新增，相同内容跳过，冲突拒绝覆盖。宿主运行时请在空闲时使用“重建索引”刷新缓存；本批不会直接修改运行中的数据库或重启宿主。

## 本批知识条目

'''
for project,count in counts.items():
    text+='\n### '+project+f'（{count}条）\n\n'
    for e in entries:
        raw=(PACK/e['file']).read_text(encoding='utf8');m=json.loads(raw.split('\n---\n',1)[0][4:])
        if m['project']==project:text+=f'- [{e["title"]}]({e["file"]})\n'
(PACK/'README.md').write_text(text,encoding='utf8')
print(json.dumps(dict(newEntries=len(entries),counts=counts,assets=len(assets),relationships=edge_count),ensure_ascii=False))
