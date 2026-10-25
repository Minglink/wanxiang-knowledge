"""Read public documentation; retain hashes/status, never download executable samples."""
import concurrent.futures, hashlib, html, json, pathlib, re, urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1] / 'knowledge' / 'vm-shell-crypto'
SOURCES = [
 ('tigress-vm','Tigress Virtualize','https://tigress.wtf/virtualize.html','Tigress project'),
 ('tigress-flat','Tigress Flatten','https://tigress.wtf/flatten.html','Tigress project'),
 ('tigress-opaque','Tigress AddOpaque','https://tigress.wtf/addOpaque.html','Tigress project'),
 ('vmp-research','VMProtect Devirtualization','https://raw.githubusercontent.com/JonathanSalwan/VMProtect-devirtualization/main/README.md','Jonathan Salwan'),
 ('remill','Remill semantics lifting','https://raw.githubusercontent.com/lifting-bits/remill/master/README.md','Remill contributors'),
 ('llvm-ir','LLVM Language Reference','https://llvm.org/docs/LangRef.html','LLVM project'),
 ('llvm-alias','LLVM Alias Analysis','https://llvm.org/docs/AliasAnalysis.html','LLVM project'),
 ('triton','Triton dynamic binary analysis','https://triton-library.github.io/','Jonathan Salwan and contributors'),
 ('kanxue-vm','VMProtect3.5.1还原演示','https://bbs.kanxue.com/thread-293303.htm','zZhouQing / malware/zhouqing'),
 ('52-vm','如何用OD的跟踪功能分析虚拟机保护','https://www.52pojie.cn/thread-572327-1-1.html','原帖作者，访问成功后核对'),
 ('52-vmp','VMProtect 分析原帖','https://www.52pojie.cn/thread-607830-1-1.html','原帖作者，访问成功后核对'),
 ('xz-pending','先知新文章候选','https://xz.aliyun.com/news/92968','原帖作者，访问成功后核对'),
 ('upx','UPX manual','https://raw.githubusercontent.com/upx/upx/devel/doc/upx.pod','UPX contributors'),
 ('themida','Themida overview','https://www.oreans.com/Themida.php','Oreans Technologies'),
 ('codevirtualizer','Code Virtualizer overview','https://www.oreans.com/CodeVirtualizer.php','Oreans Technologies'),
 ('winlicense','WinLicense overview','https://www.oreans.com/WinLicense.php','Oreans Technologies'),
 ('aspack','ASPack overview','https://www.aspack.com/aspack.html','ASPack Software'),
 ('mpress','MPRESS','https://www.matcode.com/mpress.htm','MATCODE'),
 ('enigma','Enigma Protector','https://enigmaprotector.com/en/about.html','The Enigma Protector Developers Team'),
 ('pe','PE Format','https://learn.microsoft.com/en-us/windows/win32/debug/pe-format','Microsoft'),
 ('vprotect','VirtualProtect','https://learn.microsoft.com/en-us/windows/win32/api/memoryapi/nf-memoryapi-virtualprotect','Microsoft'),
 ('unwind','x64 exception handling','https://learn.microsoft.com/en-us/cpp/build/exception-handling-x64','Microsoft'),
 ('classloader','InMemoryDexClassLoader','https://developer.android.com/reference/dalvik/system/InMemoryDexClassLoader','Android Open Source Project'),
 ('confuser','ConfuserEx','https://raw.githubusercontent.com/mkaring/ConfuserEx/master/README.md','ConfuserEx contributors'),
 ('aes','FIPS 197 AES','https://csrc.nist.gov/pubs/fips/197/final','NIST'),
 ('modes','SP 800-38A modes','https://csrc.nist.gov/pubs/sp/800/38/a/final','NIST'),
 ('gcm','SP 800-38D GCM','https://csrc.nist.gov/pubs/sp/800/38/d/final','NIST'),
 ('chacha','RFC 8439 ChaCha20-Poly1305','https://www.rfc-editor.org/rfc/rfc8439.txt','Y. Nir and A. Langley'),
 ('sha','FIPS 180-4 SHS','https://csrc.nist.gov/pubs/fips/180-4/upd1/final','NIST'),
 ('hmac','RFC 2104 HMAC','https://www.rfc-editor.org/rfc/rfc2104.txt','H. Krawczyk, M. Bellare, R. Canetti'),
 ('hkdf','RFC 5869 HKDF','https://www.rfc-editor.org/rfc/rfc5869.txt','H. Krawczyk and P. Eronen'),
 ('pbkdf','RFC 8018 PKCS 5','https://www.rfc-editor.org/rfc/rfc8018.txt','K. Moriarty et al.'),
 ('argon','RFC 9106 Argon2','https://www.rfc-editor.org/rfc/rfc9106.txt','A. Biryukov et al.'),
 ('rsa','RFC 8017 PKCS 1','https://www.rfc-editor.org/rfc/rfc8017.txt','K. Moriarty et al.'),
 ('curve','RFC 7748 Elliptic Curves','https://www.rfc-editor.org/rfc/rfc7748.txt','A. Langley et al.'),
 ('eddsa','RFC 8032 EdDSA','https://www.rfc-editor.org/rfc/rfc8032.txt','S. Josefsson and I. Liusvaara'),
 ('tea','TEA original paper','https://www.cl.cam.ac.uk/ftp/papers/djw-rmn/djw-rmn-tea.html','David J. Wheeler and Roger M. Needham'),
 ('xtea','TEA extensions','https://www.cl.cam.ac.uk/ftp/users/djw3/xtea.ps','David J. Wheeler and Roger M. Needham'),
 ('xxtea','Corrected Block TEA','https://www.cl.cam.ac.uk/ftp/users/djw3/xxtea.ps','David J. Wheeler and Roger M. Needham'),
 ('sm4','SM4 EVP provider documentation','https://docs.openssl.org/3.5/man7/EVP_CIPHER-SM4/','OpenSSL project'),
 ('sm3','SM3 EVP provider documentation','https://docs.openssl.org/3.5/man7/EVP_MD-SM3/','OpenSSL project'),
 ('base64','RFC 4648 Base encodings','https://www.rfc-editor.org/rfc/rfc4648.txt','S. Josefsson'),
 ('crc','RFC 1952 gzip CRC32','https://www.rfc-editor.org/rfc/rfc1952.txt','P. Deutsch'),
 ('ct','CRYPTO_memcmp','https://docs.openssl.org/3.5/man3/CRYPTO_memcmp/','OpenSSL project'),
 ('sanitizer','AddressSanitizer','https://clang.llvm.org/docs/AddressSanitizer.html','LLVM project'),
 ('fuzzer','LibFuzzer','https://llvm.org/docs/LibFuzzer.html','LLVM project'),
 ('ubsan','UndefinedBehaviorSanitizer','https://clang.llvm.org/docs/UndefinedBehaviorSanitizer.html','LLVM project'),
 ('atomic','C++ memory model','https://eel.is/c++draft/intro.races','C++ draft editors'),
 ('wasm','WebAssembly validation','https://webassembly.github.io/spec/core/valid/index.html','WebAssembly specification contributors'),
 ('jit','QEMU TCG translator internals','https://www.qemu.org/docs/master/devel/tcg.html','QEMU project'),
]

def fetch(row):
    key,title,url,author=row
    result=dict(id=key,title=title,url=url,author=author,checkedAt='2026-10-25',mode='原创机制归纳；不镜像全文',version='获取日公开文档；未固定上游提交')
    try:
        req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 (compatible; knowledge-research)'})
        with urllib.request.urlopen(req,timeout=35) as response:
            raw=response.read(8_000_000); result['finalUrl']=response.url; result['httpStatus']=response.status
            charset=response.headers.get_content_charset() or ('gb18030' if b'charset=gbk' in raw.lower() else 'utf-8')
        text=raw.decode(charset,errors='replace')
        if key in ('xtea','xxtea'):
            plain=text
        else:
            text=re.sub(r'<(script|style)\b[^>]*>[\s\S]*?</\1>','',text,flags=re.I)
            plain=html.unescape(re.sub('<[^>]+>',' ',text))
        plain=re.sub(r'[ \t]+',' ',plain)
        result['sha256']=hashlib.sha256(raw).hexdigest(); result['bytes']=len(raw)
        challenged=any(s in plain.lower() for s in ['var arg1=', 'acw_sc__v2', 'just a moment...', 'verify you are human'])
        result['status']='challenge' if challenged else 'readable'
        # Local temporary cache is for reading only, not a redistributed third-party mirror.
        cache=pathlib.Path(__import__('tempfile').gettempdir())/'wanxiang-focused-source-cache'
        cache.mkdir(exist_ok=True); (cache/(key+'.txt')).write_text(plain,encoding='utf-8')
        result['readingCache']=str(cache/(key+'.txt'))
    except Exception as e:
        result['status']='unavailable';result['error']=str(e)
    return result

if __name__=='__main__':
    ROOT.joinpath('sources').mkdir(parents=True,exist_ok=True)
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool: results=list(pool.map(fetch,SOURCES))
    ROOT.joinpath('sources/acquisition.json').write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    for r in results: print(r['id'],r['status'],r.get('bytes',r.get('error')))
