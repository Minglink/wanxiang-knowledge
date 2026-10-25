---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-rsa-public-encrypt",
  "title": "OpenSSL：RSA 密码 · RSA_public_encrypt（man3）",
  "type": "note",
  "tags": [
    "RSA",
    "非对称密码",
    "填充",
    "openssl",
    "RSA_public_encrypt",
    "RSA非对称密码"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "8fc0e7571a6285653bf91613a266386727de88d6cb974c0e790507684d5b323d",
  "generatedHash": "bd0e68cc8b87faec4192b412fb9446ae7fa1d1d79658c1dffdb8cf03c28fd0c6",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "RSA 密码：RSA_public_encrypt, RSA_private_decrypt - RSA public key cryptography",
  "l1": "Both of the functions described on this page are deprecated. Applications should instead use EVP_PKEY_encrypt_init_ex(3), EVP_PKEY_encrypt(3), EVP_PKEY_decrypt_init_ex(3) and EVP_PKEY_decrypt(3). RSA_public_encrypt() encrypts the **flen** bytes at **from** (usually a session key) using the public key **rsa** and stores the ciphertext in **to**. **to** must point to RSA_size(**rsa**) bytes of memory. **padding** denotes one of the following modes: PKCS #1 v1.5 padding. This currently is the most widely used mode. However, it is highly recommended to use RSA_PKCS1_OAEP_PADDING in new applications. SEE WARNING BELOW. EME-OAEP as defined in PKCS #1 v2.0 with SHA-1, MGF1 and an empty encoding parameter. This mode is recommended for all new applications. Raw RSA encryption. This mode should `only` be used to implement cryptographically sound pa",
  "questions": [
    "RSA_public_encrypt 如何用于RSA 密码？",
    "RSA_public_encrypt 有哪些参数、约束、实现语义和注意事项？"
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
      "id": "doc-openssl-doc-man3-rsa-public-encrypt",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/RSA_public_encrypt.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：RSA 密码 · RSA_public_encrypt（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：RSA 密码。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

RSA_public_encrypt, RSA_private_decrypt - RSA public key cryptography

## 技术正文

## NAME


RSA_public_encrypt, RSA_private_decrypt - RSA public key cryptography

## SYNOPSIS


```c
#include <openssl/rsa.h>

```

The following functions have been deprecated since OpenSSL 3.0, and can be
hidden entirely by defining **OPENSSL_API_COMPAT** with a suitable version value,
see openssl_user_macros(7):

```c
int RSA_public_encrypt(int flen, const unsigned char *from,
                       unsigned char *to, RSA *rsa, int padding);

int RSA_private_decrypt(int flen, const unsigned char *from,
                        unsigned char *to, RSA *rsa, int padding);

```

## DESCRIPTION


Both of the functions described on this page are deprecated.
Applications should instead use EVP_PKEY_encrypt_init_ex(3),
EVP_PKEY_encrypt(3), EVP_PKEY_decrypt_init_ex(3) and
EVP_PKEY_decrypt(3).

RSA_public_encrypt() encrypts the **flen** bytes at **from** (usually a
session key) using the public key **rsa** and stores the ciphertext in
**to**. **to** must point to RSA_size(**rsa**) bytes of memory.

**padding** denotes one of the following modes:


- RSA_PKCS1_PADDING

PKCS #1 v1.5 padding. This currently is the most widely used mode.
However, it is highly recommended to use RSA_PKCS1_OAEP_PADDING in
new applications. SEE WARNING BELOW.

- RSA_PKCS1_OAEP_PADDING

EME-OAEP as defined in PKCS #1 v2.0 with SHA-1, MGF1 and an empty
encoding parameter. This mode is recommended for all new applications.

- RSA_NO_PADDING

Raw RSA encryption. This mode should `only` be used to implement
cryptographically sound padding modes in the application code.
Encrypting user data directly with RSA is insecure.


When encrypting **flen** must not be more than RSA_size(**rsa**) - 11 for the
PKCS #1 v1.5 based padding modes, not more than RSA_size(**rsa**) - 42 for
RSA_PKCS1_OAEP_PADDING and exactly RSA_size(**rsa**) for RSA_NO_PADDING.
When a padding mode other than RSA_NO_PADDING is in use, then
RSA_public_encrypt() will include some random bytes into the ciphertext
and therefore the ciphertext will be different each time, even if the
plaintext and the public key are exactly identical.
The returned ciphertext in **to** will always be zero padded to exactly
RSA_size(**rsa**) bytes.
**to** and **from** may overlap.

RSA_private_decrypt() decrypts the **flen** bytes at **from** using the
private key **rsa** and stores the plaintext in **to**. **flen** should
be equal to RSA_size(**rsa**) but may be smaller, when leading zero
bytes are in the ciphertext. Those are not important and may be removed,
but RSA_public_encrypt() does not do that. **to** must point
to a memory section large enough to hold the maximal possible decrypted
data (which is equal to RSA_size(**rsa**) for RSA_NO_PADDING,
RSA_size(**rsa**) - 11 for the PKCS #1 v1.5 based padding modes and
RSA_size(**rsa**) - 42 for RSA_PKCS1_OAEP_PADDING).
**padding** is the padding mode that was used to encrypt the data.
**to** and **from** may overlap.

## RETURN VALUES


RSA_public_encrypt() returns the size of the encrypted data (i.e.,
RSA_size(**rsa**)). RSA_private_decrypt() returns the size of the
recovered plaintext. A return value of 0 is not an error and
means only that the plaintext was empty.

On error, -1 is returned; the error codes can be
obtained by ERR_get_error(3).

## WARNINGS


Decryption failures in the RSA_PKCS1_PADDING mode leak information
which can potentially be used to mount a Bleichenbacher padding oracle
attack. This is an inherent weakness in the PKCS #1 v1.5 padding
design. Prefer RSA_PKCS1_OAEP_PADDING.

In OpenSSL before version 3.2.0, both the return value and the length of
returned value could be used to mount the Bleichenbacher attack.
Since version 3.2.0, the default provider in OpenSSL does not return an
error when padding checks fail. Instead it generates a random
message based on used private
key and provided ciphertext so that application code doesn't have to implement
a side-channel secure error handling.
Applications that want to be secure against side-channel attacks with
providers that don't implement implicit rejection, still need to
handle the returned values using side-channel free code.
Side-channel free handling of the error stack can be performed using
either a pair of unconditional ERR_set_mark(3) and ERR_pop_to_mark(3)
calls or by using the ERR_clear_error(3) call.

## CONFORMING TO


SSL, PKCS #1 v2.0

## SEE ALSO


ERR_get_error(3), RAND_bytes(3),
RSA_size(3), EVP_PKEY_decrypt(3), EVP_PKEY_encrypt(3)

## HISTORY


Both of these functions were deprecated in OpenSSL 3.0.

## COPYRIGHT


Copyright 2000-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/RSA_public_encrypt.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/RSA_public_encrypt.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/RSA_public_encrypt.pod`；SHA-256：`8fc0e7571a6285653bf91613a266386727de88d6cb974c0e790507684d5b323d`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
