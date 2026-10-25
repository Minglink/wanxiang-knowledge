---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-rsa-sign-asn1-octet-string",
  "title": "OpenSSL：RSA 密码 · RSA_sign_ASN1_OCTET_STRING（man3）",
  "type": "note",
  "tags": [
    "RSA",
    "非对称密码",
    "填充",
    "openssl",
    "RSA_sign_ASN1_OCTET_STRING",
    "RSA非对称密码"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "1dd0440f8867dbabe763a32d657ee61e29d399ea56cb4bd33e73273407ec7af0",
  "generatedHash": "a90783501ce4184ec1586fd06c1f7534a48620e9fd2d6b09eeb9bc4bc50c9632",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "RSA 密码：RSA_sign_ASN1_OCTET_STRING, RSA_verify_ASN1_OCTET_STRING - RSA signatures",
  "l1": "All of the functions described on this page are deprecated. Applications should instead use EVP PKEY APIs. RSA_sign_ASN1_OCTET_STRING() signs the octet string **m** of size **m_len** using the private key **rsa** represented in DER using PKCS #1 padding. It stores the signature in **sigret** and the signature size in **siglen**. **sigret** must point to **RSA_size(rsa)** bytes of memory. **dummy** is ignored. The random number generator must be seeded when calling RSA_sign_ASN1_OCTET_STRING(). If the automatic seeding or reseeding of the OpenSSL CSPRNG fails due to external circumstances (see RAND(7)), the operation will fail. RSA_verify_ASN1_OCTET_STRING() verifies that the signature **sigbuf** of size **siglen** is the DER representation of a given octet string **m** of size **m_len**. **dummy** is ignored. **rsa** is the signer's publi",
  "questions": [
    "RSA_sign_ASN1_OCTET_STRING 如何用于RSA 密码？",
    "RSA_sign_ASN1_OCTET_STRING 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-focus-crypto-rsa-oaep",
      "kind": "机制参照"
    }
  ],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-rsa-sign-asn1-octet-string",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/RSA_sign_ASN1_OCTET_STRING.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：RSA 密码 · RSA_sign_ASN1_OCTET_STRING（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：RSA 密码。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

RSA_sign_ASN1_OCTET_STRING, RSA_verify_ASN1_OCTET_STRING - RSA signatures

## 技术正文

## NAME


RSA_sign_ASN1_OCTET_STRING, RSA_verify_ASN1_OCTET_STRING - RSA signatures

## SYNOPSIS


```c
#include <openssl/rsa.h>

```

The following functions have been deprecated since OpenSSL 3.0, and can be
hidden entirely by defining **OPENSSL_API_COMPAT** with a suitable version value,
see openssl_user_macros(7):

```c
int RSA_sign_ASN1_OCTET_STRING(int dummy, unsigned char *m,
                               unsigned int m_len, unsigned char *sigret,
                               unsigned int *siglen, RSA *rsa);

int RSA_verify_ASN1_OCTET_STRING(int dummy, unsigned char *m,
                                 unsigned int m_len, unsigned char *sigbuf,
                                 unsigned int siglen, RSA *rsa);

```

## DESCRIPTION


All of the functions described on this page are deprecated.
Applications should instead use EVP PKEY APIs.

RSA_sign_ASN1_OCTET_STRING() signs the octet string **m** of size
**m_len** using the private key **rsa** represented in DER using PKCS #1
padding. It stores the signature in **sigret** and the signature size
in **siglen**. **sigret** must point to **RSA_size(rsa)** bytes of
memory.

**dummy** is ignored.

The random number generator must be seeded when calling
RSA_sign_ASN1_OCTET_STRING().
If the automatic seeding or reseeding of the OpenSSL CSPRNG fails due to
external circumstances (see RAND(7)), the operation will fail.

RSA_verify_ASN1_OCTET_STRING() verifies that the signature **sigbuf**
of size **siglen** is the DER representation of a given octet string
**m** of size **m_len**. **dummy** is ignored. **rsa** is the signer's
public key.

## RETURN VALUES


RSA_sign_ASN1_OCTET_STRING() returns 1 on success, 0 otherwise.
RSA_verify_ASN1_OCTET_STRING() returns 1 on successful verification, 0
otherwise.

The error codes can be obtained by ERR_get_error(3).

## BUGS


These functions serve no recognizable purpose.

## SEE ALSO


ERR_get_error(3),
RAND_bytes(3), RSA_sign(3),
RSA_verify(3),
RAND(7)

## HISTORY


All of these functions were deprecated in OpenSSL 3.0.

## COPYRIGHT


Copyright 2000-2020 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/RSA_sign_ASN1_OCTET_STRING.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/RSA_sign_ASN1_OCTET_STRING.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/RSA_sign_ASN1_OCTET_STRING.pod`；SHA-256：`1dd0440f8867dbabe763a32d657ee61e29d399ea56cb4bd33e73273407ec7af0`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
