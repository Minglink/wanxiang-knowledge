---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp",
  "title": "OpenSSL：密码实现与接口 · evp（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "evp"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "f26c2afeb6d43d33a6a58e1af4ab36434267bc235a1e92f6d9b2eb307cd489b5",
  "generatedHash": "92404b7f4317a169f38b5334a0d5a61d7154a1ee494f79ca6c89da55ce746e28",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：evp - high-level cryptographic functions",
  "l1": "The EVP library provides a high-level interface to cryptographic functions. The **EVP_Seal**`XXX` and **EVP_Open**`XXX` functions provide public key encryption and decryption to implement digital \"envelopes\". The **EVP_DigestSign**`XXX` and **EVP_DigestVerify**`XXX` functions implement digital signatures and Message Authentication Codes (MACs). Also see the older **EVP_Sign**`XXX` and **EVP_Verify**`XXX` functions. Symmetric encryption is available with the **EVP_Encrypt**`XXX` functions. The **EVP_Digest**`XXX` functions provide message digests. The **EVP_PKEY**`XXX` functions provide a high-level interface to asymmetric algorithms. To create a new EVP_PKEY see EVP_PKEY_new(3). EVP_PKEYs can be associated with a private key of a particular algorithm by using the functions described on the EVP_PKEY_fromdata(3) page, or new keys can be gen",
  "questions": [
    "evp 如何用于密码实现与接口？",
    "evp 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/evp.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · evp（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

evp - high-level cryptographic functions

## 技术正文

## NAME


evp - high-level cryptographic functions

## SYNOPSIS


```c
#include <openssl/evp.h>

```

## DESCRIPTION


The EVP library provides a high-level interface to cryptographic
functions.

The **EVP_Seal**`XXX` and **EVP_Open**`XXX`
functions provide public key encryption and decryption to implement digital "envelopes".

The **EVP_DigestSign**`XXX` and
**EVP_DigestVerify**`XXX` functions implement
digital signatures and Message Authentication Codes (MACs). Also see the older
**EVP_Sign**`XXX` and **EVP_Verify**`XXX`
functions.

Symmetric encryption is available with the **EVP_Encrypt**`XXX`
functions.  The **EVP_Digest**`XXX` functions provide message digests.

The **EVP_PKEY**`XXX` functions provide a high-level interface to
asymmetric algorithms. To create a new EVP_PKEY see
EVP_PKEY_new(3). EVP_PKEYs can be associated
with a private key of a particular algorithm by using the functions
described on the EVP_PKEY_fromdata(3) page, or
new keys can be generated using EVP_PKEY_keygen(3).
EVP_PKEYs can be compared using EVP_PKEY_eq(3), or printed using
EVP_PKEY_print_private(3). EVP_PKEY_todata(3) can be used to convert a
key back into an OSSL_PARAM(3) array.

The EVP_PKEY functions support the full range of asymmetric algorithm operations:


- For key agreement see EVP_PKEY_derive(3)

- For signing and verifying see EVP_PKEY_sign(3),
EVP_PKEY_verify(3) and EVP_PKEY_verify_recover(3).
However, note that
these functions do not perform a digest of the data to be signed. Therefore,
normally you would use the EVP_DigestSignInit(3)
functions for this purpose.

- For encryption and decryption see EVP_PKEY_encrypt(3)
and EVP_PKEY_decrypt(3) respectively. However, note that
these functions perform encryption and decryption only. As public key
encryption is an expensive operation, normally you would wrap
an encrypted message in a "digital envelope" using the EVP_SealInit(3) and
EVP_OpenInit(3) functions.


The EVP_BytesToKey(3) function provides some limited support for password
based encryption. Careful selection of the parameters will provide a PKCS#5 PBKDF1 compatible
implementation. However, new applications should not typically use this (preferring, for example,
PBKDF2 from PCKS#5).

The **EVP_Encode**`XXX` and
**EVP_Decode**`XXX` functions implement base64 encoding
and decoding.

All the symmetric algorithms (ciphers), digests and asymmetric algorithms
(public key algorithms) can be replaced by ENGINE modules providing alternative
implementations. If ENGINE implementations of ciphers or digests are registered
as defaults, then the various EVP functions will automatically use those
implementations automatically in preference to built in software
implementations. For more information, consult the engine(3) man page.

Although low-level algorithm specific functions exist for many algorithms
their use is discouraged. They cannot be used with an ENGINE and ENGINE
versions of new algorithms cannot be accessed using the low-level functions.
Also makes code harder to adapt to new algorithms and some options are not
cleanly supported at the low-level and some operations are more efficient
using the high-level interface.

## SEE ALSO


EVP_DigestInit(3),
EVP_EncryptInit(3),
EVP_OpenInit(3),
EVP_SealInit(3),
EVP_DigestSignInit(3),
EVP_SignInit(3),
EVP_VerifyInit(3),
EVP_EncodeInit(3),
EVP_PKEY_new(3),
EVP_PKEY_fromdata(3),
EVP_PKEY_todata(3),
EVP_PKEY_keygen(3),
EVP_PKEY_print_private(3),
EVP_PKEY_decrypt(3),
EVP_PKEY_encrypt(3),
EVP_PKEY_sign(3),
EVP_PKEY_verify(3),
EVP_PKEY_verify_recover(3),
EVP_PKEY_derive(3),
EVP_BytesToKey(3),
ENGINE_by_id(3)

## COPYRIGHT


Copyright 2000-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/evp.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/evp.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/evp.pod`；SHA-256：`f26c2afeb6d43d33a6a58e1af4ab36434267bc235a1e92f6d9b2eb307cd489b5`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
