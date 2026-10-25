---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-rsa-sign",
  "title": "OpenSSL：RSA 密码 · RSA_sign（man3）",
  "type": "note",
  "tags": [
    "RSA",
    "非对称密码",
    "填充",
    "openssl",
    "RSA_sign",
    "RSA非对称密码"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "142de0aabce4b5372c47aa9906cda8cc2ef3bd062da5197cf6df8a5b21c509c8",
  "generatedHash": "0d7b1c46eaca94001095f8932361c52aca4691d7cbfeee98dc8fd20fb123210e",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "RSA 密码：RSA_sign, RSA_verify - RSA signatures",
  "l1": "All of the functions described on this page are deprecated. Applications should instead use EVP_PKEY_sign_init(3), EVP_PKEY_sign(3), EVP_PKEY_verify_init(3) and EVP_PKEY_verify(3). RSA_sign() signs the message digest **m** of size **m_len** using the private key **rsa** using RSASSA-PKCS1-v1_5 as specified in RFC 3447. It stores the signature in **sigret** and the signature size in **siglen**. **sigret** must point to RSA_size(**rsa**) bytes of memory. Note that PKCS #1 adds meta-data, placing limits on the size of the key that can be used. See RSA_private_encrypt(3) for lower-level operations. **type** denotes the message digest algorithm that was used to generate **m**. If **type** is **NID_md5_sha1**, an SSL signature (MD5 and SHA1 message digests with PKCS #1 padding and no algorithm identifier) is created. RSA_verify() verifies that ",
  "questions": [
    "RSA_sign 如何用于RSA 密码？",
    "RSA_sign 有哪些参数、约束、实现语义和注意事项？"
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
      "id": "doc-openssl-doc-man3-rsa-sign",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/RSA_sign.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：RSA 密码 · RSA_sign（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：RSA 密码。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

RSA_sign, RSA_verify - RSA signatures

## 技术正文

## NAME


RSA_sign, RSA_verify - RSA signatures

## SYNOPSIS


```c
#include <openssl/rsa.h>

```

The following functions have been deprecated since OpenSSL 3.0, and can be
hidden entirely by defining **OPENSSL_API_COMPAT** with a suitable version value,
see openssl_user_macros(7):

```c
int RSA_sign(int type, const unsigned char *m, unsigned int m_len,
             unsigned char *sigret, unsigned int *siglen, RSA *rsa);

int RSA_verify(int type, const unsigned char *m, unsigned int m_len,
               unsigned char *sigbuf, unsigned int siglen, RSA *rsa);

```

## DESCRIPTION


All of the functions described on this page are deprecated.
Applications should instead use EVP_PKEY_sign_init(3), EVP_PKEY_sign(3),
EVP_PKEY_verify_init(3) and EVP_PKEY_verify(3).

RSA_sign() signs the message digest **m** of size **m_len** using the
private key **rsa** using RSASSA-PKCS1-v1_5 as specified in RFC 3447. It
stores the signature in **sigret** and the signature size in **siglen**.
**sigret** must point to RSA_size(**rsa**) bytes of memory.
Note that PKCS #1 adds meta-data, placing limits on the size of the
key that can be used.
See RSA_private_encrypt(3) for lower-level
operations.

**type** denotes the message digest algorithm that was used to generate
**m**.
If **type** is **NID_md5_sha1**,
an SSL signature (MD5 and SHA1 message digests with PKCS #1 padding
and no algorithm identifier) is created.

RSA_verify() verifies that the signature **sigbuf** of size **siglen**
matches a given message digest **m** of size **m_len**. **type** denotes
the message digest algorithm that was used to generate the signature.
**rsa** is the signer's public key.

## RETURN VALUES


RSA_sign() returns 1 on success and 0 for failure.
RSA_verify() returns 1 on successful verification and 0 for failure.

The error codes can be obtained by ERR_get_error(3).

## CONFORMING TO


SSL, PKCS #1 v2.0

## SEE ALSO


ERR_get_error(3),
RSA_private_encrypt(3),
RSA_public_decrypt(3)

## HISTORY


All of these functions were deprecated in OpenSSL 3.0.

## COPYRIGHT


Copyright 2000-2020 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/RSA_sign.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/RSA_sign.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/RSA_sign.pod`；SHA-256：`142de0aabce4b5372c47aa9906cda8cc2ef3bd062da5197cf6df8a5b21c509c8`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
