---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-rsa-private-encrypt",
  "title": "OpenSSL：RSA 密码 · RSA_private_encrypt（man3）",
  "type": "note",
  "tags": [
    "RSA",
    "非对称密码",
    "填充",
    "openssl",
    "RSA_private_encrypt",
    "RSA非对称密码"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "e42f3bd2684d4d0fe75f73c8057526b39ab6469367b901c2f62c6c2ef362d1ab",
  "generatedHash": "27768d9a8e38c8c98f2ccf9f8497555c62e89e4b941611ad10b6e83bb09c5716",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "RSA 密码：RSA_private_encrypt, RSA_public_decrypt - low-level signature operations",
  "l1": "Both of the functions described on this page are deprecated. Applications should instead use EVP_PKEY_sign_init_ex(3), EVP_PKEY_sign(3), EVP_PKEY_verify_recover_init(3), and EVP_PKEY_verify_recover(3). These functions handle RSA signatures at a low-level. RSA_private_encrypt() signs the **flen** bytes at **from** (usually a message digest with an algorithm identifier) using the private key **rsa** and stores the signature in **to**. **to** must point to **RSA_size(rsa)** bytes of memory. **padding** denotes one of the following modes: PKCS #1 v1.5 padding. This function does not handle the **algorithmIdentifier** specified in PKCS #1. When generating or verifying PKCS #1 signatures, RSA_sign(3) and RSA_verify(3) should be used. Raw RSA signature. This mode should `only` be used to implement cryptographically sound padding modes in the app",
  "questions": [
    "RSA_private_encrypt 如何用于RSA 密码？",
    "RSA_private_encrypt 有哪些参数、约束、实现语义和注意事项？"
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
      "id": "doc-openssl-doc-man3-rsa-private-encrypt",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/RSA_private_encrypt.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：RSA 密码 · RSA_private_encrypt（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：RSA 密码。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

RSA_private_encrypt, RSA_public_decrypt - low-level signature operations

## 技术正文

## NAME


RSA_private_encrypt, RSA_public_decrypt - low-level signature operations

## SYNOPSIS


```c
#include <openssl/rsa.h>

```

The following functions have been deprecated since OpenSSL 3.0, and can be
hidden entirely by defining **OPENSSL_API_COMPAT** with a suitable version value,
see openssl_user_macros(7):

```c
int RSA_private_encrypt(int flen, unsigned char *from,
                        unsigned char *to, RSA *rsa, int padding);

int RSA_public_decrypt(int flen, unsigned char *from,
                       unsigned char *to, RSA *rsa, int padding);

```

## DESCRIPTION


Both of the functions described on this page are deprecated.
Applications should instead use EVP_PKEY_sign_init_ex(3),
EVP_PKEY_sign(3), EVP_PKEY_verify_recover_init(3), and
EVP_PKEY_verify_recover(3).

These functions handle RSA signatures at a low-level.

RSA_private_encrypt() signs the **flen** bytes at **from** (usually a
message digest with an algorithm identifier) using the private key
**rsa** and stores the signature in **to**. **to** must point to
**RSA_size(rsa)** bytes of memory.

**padding** denotes one of the following modes:


- RSA_PKCS1_PADDING

PKCS #1 v1.5 padding. This function does not handle the
**algorithmIdentifier** specified in PKCS #1. When generating or
verifying PKCS #1 signatures, RSA_sign(3) and RSA_verify(3) should be
used.

- RSA_NO_PADDING

Raw RSA signature. This mode should `only` be used to implement
cryptographically sound padding modes in the application code.
Signing user data directly with RSA is insecure.


RSA_public_decrypt() recovers the message digest from the **flen**
bytes long signature at **from** using the signer's public key
**rsa**. **to** must point to a memory section large enough to hold the
message digest (which is smaller than B<RSA_size(rsa) -
11>). **padding** is the padding mode that was used to sign the data.

## RETURN VALUES


RSA_private_encrypt() returns the size of the signature (i.e.,
RSA_size(rsa)). RSA_public_decrypt() returns the size of the
recovered message digest.

On error, -1 is returned; the error codes can be
obtained by ERR_get_error(3).

## SEE ALSO


ERR_get_error(3),
RSA_sign(3), RSA_verify(3),
EVP_PKEY_sign(3), EVP_PKEY_verify_recover(3)

## HISTORY


Both of these functions were deprecated in OpenSSL 3.0.

## COPYRIGHT


Copyright 2000-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/RSA_private_encrypt.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/RSA_private_encrypt.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/RSA_private_encrypt.pod`；SHA-256：`e42f3bd2684d4d0fe75f73c8057526b39ab6469367b901c2f62c6c2ef362d1ab`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
