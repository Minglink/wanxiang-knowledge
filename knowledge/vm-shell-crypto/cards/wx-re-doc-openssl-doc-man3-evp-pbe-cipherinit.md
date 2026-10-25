---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-pbe-cipherinit",
  "title": "OpenSSL：EVP 密码接口 · EVP_PBE_CipherInit（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "密码接口",
    "Provider",
    "openssl",
    "EVP_PBE_CipherInit"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "d99c4c65401235cf8bfce9ac44e8c51a1baa740afd5b590f90e779f8280bba10",
  "generatedHash": "dd5cf7c1d1e77e64be9c94cce51a631fb411d944d05bad626589fb90d977030d",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "EVP 密码接口：EVP_PBE_CipherInit, EVP_PBE_CipherInit_ex, EVP_PBE_find, EVP_PBE_find_ex, EVP_PBE_alg_add_type, EVP_PBE_alg_add - Password based encryption routines",
  "l1": " EVP_PBE_CipherInit() and EVP_PBE_CipherInit_ex() initialise an **EVP_CIPHER_CTX** `ctx` for encryption (`en_de`=1) or decryption (`en_de`=0) using the password `pass` of length `passlen`. The PBE algorithm type and parameters are extracted from an OID `pbe_obj` and parameters `param`. EVP_PBE_CipherInit_ex() also allows the application to specify a library context `libctx` and property query `propq` to select appropriate algorithm implementations. EVP_PBE_find() and EVP_PBE_find_ex() search for a matching algorithm using two parameters: 1. An algorithm type `type` which can be: EVP_PBE_TYPE_OUTER - A PBE algorithm EVP_PBE_TYPE_PRF - A pseudo-random function EVP_PBE_TYPE_KDF - A key derivation function 2. A `pbe_nid` which can represent the algorithm identifier with parameters e.g. **NID_pbeWithSHA1AndRC2_CBC** or an algorithm class e.g. ",
  "questions": [
    "EVP_PBE_CipherInit 如何用于EVP 密码接口？",
    "EVP_PBE_CipherInit 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-pbe-cipherinit",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PBE_CipherInit.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：EVP 密码接口 · EVP_PBE_CipherInit（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：EVP 密码接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PBE_CipherInit, EVP_PBE_CipherInit_ex,
EVP_PBE_find, EVP_PBE_find_ex,
EVP_PBE_alg_add_type, EVP_PBE_alg_add - Password based encryption routines

## 技术正文

## NAME


EVP_PBE_CipherInit, EVP_PBE_CipherInit_ex,
EVP_PBE_find, EVP_PBE_find_ex,
EVP_PBE_alg_add_type, EVP_PBE_alg_add - Password based encryption routines

## SYNOPSIS


```c
#include <openssl/evp.h>

int EVP_PBE_CipherInit(ASN1_OBJECT *pbe_obj, const char *pass, int passlen,
                       ASN1_TYPE *param, EVP_CIPHER_CTX *ctx, int en_de);
int EVP_PBE_CipherInit_ex(ASN1_OBJECT *pbe_obj, const char *pass, int passlen,
                          ASN1_TYPE *param, EVP_CIPHER_CTX *ctx, int en_de,
                          OSSL_LIB_CTX *libctx, const char *propq);

int EVP_PBE_find(int type, int pbe_nid, int *pcnid, int *pmnid,
                 EVP_PBE_KEYGEN **pkeygen);
int EVP_PBE_find_ex(int type, int pbe_nid, int *pcnid, int *pmnid,
                    EVP_PBE_KEYGEN **pkeygen, EVP_PBE_KEYGEN_EX **keygen_ex);

int EVP_PBE_alg_add_type(int pbe_type, int pbe_nid, int cipher_nid,
                         int md_nid, EVP_PBE_KEYGEN *keygen);
int EVP_PBE_alg_add(int nid, const EVP_CIPHER *cipher, const EVP_MD *md,
                    EVP_PBE_KEYGEN *keygen);

```

## DESCRIPTION


### PBE operations


EVP_PBE_CipherInit() and EVP_PBE_CipherInit_ex() initialise an **EVP_CIPHER_CTX**
`ctx` for encryption (`en_de`=1) or decryption (`en_de`=0) using the password
`pass` of length `passlen`. The PBE algorithm type and parameters are extracted
from an OID `pbe_obj` and parameters `param`.

EVP_PBE_CipherInit_ex() also allows the application to specify a library context
`libctx` and property query `propq` to select appropriate algorithm
implementations.

### PBE algorithm search


EVP_PBE_find() and EVP_PBE_find_ex() search for a matching algorithm using two parameters:

1. An algorithm type `type` which can be:


- *

EVP_PBE_TYPE_OUTER - A PBE algorithm

- *

EVP_PBE_TYPE_PRF - A pseudo-random function

- *

EVP_PBE_TYPE_KDF - A key derivation function


2. A `pbe_nid` which can represent the algorithm identifier with parameters e.g.
**NID_pbeWithSHA1AndRC2_CBC** or an algorithm class e.g. **NID_pbes2**.

They return the algorithm's cipher ID `pcnid`, digest ID `pmnid` and a key
generation function for the algorithm `pkeygen`. EVP_PBE_CipherInit_ex() also
returns an extended key generation function `keygen_ex` which takes a library
context and property query.

If a NULL is supplied for any of `pcnid`, `pmnid`, `pkeygen` or `pkeygen_ex`
then this parameter is not returned.

### PBE algorithm add


EVP_PBE_alg_add_type() and EVP_PBE_alg_add() add an algorithm to the list
of known algorithms. Their parameters have the same meaning as for
EVP_PBE_find() and EVP_PBE_find_ex() functions.

## NOTES


The arguments `pbe_obj` and `param` to EVP_PBE_CipherInit() and EVP_PBE_CipherInit_ex()
together form an **X509_ALGOR** and can often be extracted directly from this structure.

## RETURN VALUES


Return value is 1 for success and 0 if an error occurred.

## SEE ALSO


PKCS5_PBE_keyivgen(3),
PKCS12_PBE_keyivgen_ex(3),
PKCS5_v2_PBE_keyivgen_ex(3),
PKCS12_pbe_crypt_ex(3),
PKCS12_create_ex(3)

## HISTORY


EVP_PBE_CipherInit_ex() and EVP_PBE_find_ex() were added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_PBE_CipherInit.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PBE_CipherInit.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_PBE_CipherInit.pod`；SHA-256：`d99c4c65401235cf8bfce9ac44e8c51a1baa740afd5b590f90e779f8280bba10`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
