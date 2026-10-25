---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-aes-128-gcm",
  "title": "OpenSSL：EVP 密码接口 · EVP_aes_128_gcm（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "密码接口",
    "Provider",
    "openssl",
    "EVP_aes_128_gcm",
    "AES高级加密标准"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "ce8b93efbc122deac5cf0c120d69287a6308e32b2425749f26d1a7c79028ce7c",
  "generatedHash": "9697fd2fe5f615f34facb0d257f6fa5f756971e18dc16f8ebce113f0085d7a78",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "EVP 密码接口：EVP_aes_128_cbc, EVP_aes_192_cbc, EVP_aes_256_cbc, EVP_aes_128_cfb, EVP_aes_192_cfb, EVP_aes_256_cfb, EVP_aes_128_cfb1, EVP_aes_192_cfb1, EVP_aes_256_cfb1, EVP_aes_128_cfb8, EVP_aes_192_cfb8, EVP_aes_256_cfb8, EVP_aes_128_cfb128, EVP_aes_192_cfb128, EVP_aes_256_cfb128, EVP_aes_128_ctr, EVP_aes_192_c",
  "l1": "The AES encryption algorithm for EVP. EVP_aes_192_cbc(), EVP_aes_256_cbc(), EVP_aes_128_cfb(), EVP_aes_192_cfb(), EVP_aes_256_cfb(), EVP_aes_128_cfb1(), EVP_aes_192_cfb1(), EVP_aes_256_cfb1(), EVP_aes_128_cfb8(), EVP_aes_192_cfb8(), EVP_aes_256_cfb8(), EVP_aes_128_cfb128(), EVP_aes_192_cfb128(), EVP_aes_256_cfb128(), EVP_aes_128_ctr(), EVP_aes_192_ctr(), EVP_aes_256_ctr(), EVP_aes_128_ecb(), EVP_aes_192_ecb(), EVP_aes_256_ecb(), EVP_aes_128_ofb(), EVP_aes_192_ofb(), EVP_aes_256_ofb() AES for 128, 192 and 256 bit keys in the following modes: CBC, CFB with 128-bit shift, CFB with 1-bit shift, CFB with 8-bit shift, CTR, ECB, and OFB. EVP_aes_256_cbc_hmac_sha1() Authenticated encryption with AES in CBC mode using SHA-1 as HMAC, with keys of 128 and 256 bits length respectively. The authentication tag is 160 bits long. WARNING: this is not int",
  "questions": [
    "EVP_aes_128_gcm 如何用于EVP 密码接口？",
    "EVP_aes_128_gcm 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-focus-crypto-aes-shape",
      "kind": "机制参照"
    }
  ],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-aes-128-gcm",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_aes_128_gcm.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：EVP 密码接口 · EVP_aes_128_gcm（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：EVP 密码接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_aes_128_cbc,
EVP_aes_192_cbc,
EVP_aes_256_cbc,
EVP_aes_128_cfb,
EVP_aes_192_cfb,
EVP_aes_256_cfb,
EVP_aes_128_cfb1,
EVP_aes_192_cfb1,
EVP_aes_256_cfb1,
EVP_aes_128_cfb8,
EVP_aes_192_cfb8,
EVP_aes_256_cfb8,
EVP_aes_128_cfb128,
EVP_aes_192_cfb128,
EVP_aes_256_cfb128,
EVP_aes_128_ctr,
EVP_aes_192_ctr,
EVP_aes_256_ctr,
EVP_aes_128_ecb,
EVP_aes_192_ecb,
EVP_aes_256_ecb,
EVP_aes_128_ofb,
EVP_aes_192_ofb,
EVP_aes_256_ofb,
EVP_aes_128_cbc_hmac_sha1,
EVP_aes_256_cbc_hmac_sha1,
EVP_aes_128_cbc_hmac_sha256,
EVP_aes_256_cbc_hmac_sha256,
EVP_aes_128_ccm,
EVP_aes_192_ccm,
EVP_aes_256_ccm,
EVP_aes_128_gcm,
EVP_aes_192_gcm,
EVP_aes_256_gcm,
EVP_aes_128_ocb,
EVP_aes_192_ocb,
EVP_aes_256_ocb,
EVP_aes_128_wrap,
EVP_aes_192_wrap,
EVP_aes_256_wrap,
EVP_aes_128_wrap_pad,
EVP_aes_192_wrap_pad,
EVP_aes_256_wrap_pad,
EVP_aes_128_xts,
EVP_aes_256_xts
- EVP AES cipher

## 技术正文

## NAME


EVP_aes_128_cbc,
EVP_aes_192_cbc,
EVP_aes_256_cbc,
EVP_aes_128_cfb,
EVP_aes_192_cfb,
EVP_aes_256_cfb,
EVP_aes_128_cfb1,
EVP_aes_192_cfb1,
EVP_aes_256_cfb1,
EVP_aes_128_cfb8,
EVP_aes_192_cfb8,
EVP_aes_256_cfb8,
EVP_aes_128_cfb128,
EVP_aes_192_cfb128,
EVP_aes_256_cfb128,
EVP_aes_128_ctr,
EVP_aes_192_ctr,
EVP_aes_256_ctr,
EVP_aes_128_ecb,
EVP_aes_192_ecb,
EVP_aes_256_ecb,
EVP_aes_128_ofb,
EVP_aes_192_ofb,
EVP_aes_256_ofb,
EVP_aes_128_cbc_hmac_sha1,
EVP_aes_256_cbc_hmac_sha1,
EVP_aes_128_cbc_hmac_sha256,
EVP_aes_256_cbc_hmac_sha256,
EVP_aes_128_ccm,
EVP_aes_192_ccm,
EVP_aes_256_ccm,
EVP_aes_128_gcm,
EVP_aes_192_gcm,
EVP_aes_256_gcm,
EVP_aes_128_ocb,
EVP_aes_192_ocb,
EVP_aes_256_ocb,
EVP_aes_128_wrap,
EVP_aes_192_wrap,
EVP_aes_256_wrap,
EVP_aes_128_wrap_pad,
EVP_aes_192_wrap_pad,
EVP_aes_256_wrap_pad,
EVP_aes_128_xts,
EVP_aes_256_xts
- EVP AES cipher

## SYNOPSIS



```c
#include <openssl/evp.h>

const EVP_CIPHER *EVP_ciphername(void)

```

`EVP_ciphername` is used a placeholder for any of the described cipher
functions, such as `EVP_aes_128_cbc`.

## DESCRIPTION


The AES encryption algorithm for EVP.


- EVP_aes_128_cbc(),
EVP_aes_192_cbc(),
EVP_aes_256_cbc(),
EVP_aes_128_cfb(),
EVP_aes_192_cfb(),
EVP_aes_256_cfb(),
EVP_aes_128_cfb1(),
EVP_aes_192_cfb1(),
EVP_aes_256_cfb1(),
EVP_aes_128_cfb8(),
EVP_aes_192_cfb8(),
EVP_aes_256_cfb8(),
EVP_aes_128_cfb128(),
EVP_aes_192_cfb128(),
EVP_aes_256_cfb128(),
EVP_aes_128_ctr(),
EVP_aes_192_ctr(),
EVP_aes_256_ctr(),
EVP_aes_128_ecb(),
EVP_aes_192_ecb(),
EVP_aes_256_ecb(),
EVP_aes_128_ofb(),
EVP_aes_192_ofb(),
EVP_aes_256_ofb()

AES for 128, 192 and 256 bit keys in the following modes: CBC, CFB with 128-bit
shift, CFB with 1-bit shift, CFB with 8-bit shift, CTR, ECB, and OFB.

- EVP_aes_128_cbc_hmac_sha1(),
EVP_aes_256_cbc_hmac_sha1()

Authenticated encryption with AES in CBC mode using SHA-1 as HMAC, with keys of
128 and 256 bits length respectively. The authentication tag is 160 bits long.

WARNING: this is not intended for usage outside of TLS and requires calling of
some undocumented ctrl functions. These ciphers do not conform to the EVP AEAD
interface.

- EVP_aes_128_cbc_hmac_sha256(),
EVP_aes_256_cbc_hmac_sha256()

Authenticated encryption with AES in CBC mode using SHA256 (SHA-2, 256-bits) as
HMAC, with keys of 128 and 256 bits length respectively. The authentication tag
is 256 bits long.

WARNING: this is not intended for usage outside of TLS and requires calling of
some undocumented ctrl functions. These ciphers do not conform to the EVP AEAD
interface.

- EVP_aes_128_ccm(),
EVP_aes_192_ccm(),
EVP_aes_256_ccm(),
EVP_aes_128_gcm(),
EVP_aes_192_gcm(),
EVP_aes_256_gcm(),
EVP_aes_128_ocb(),
EVP_aes_192_ocb(),
EVP_aes_256_ocb()

AES for 128, 192 and 256 bit keys in CBC-MAC Mode (CCM), Galois Counter Mode
(GCM) and OCB Mode respectively. These ciphers require additional control
operations to function correctly, see the EVP_EncryptInit(3)/AEAD Interface
section for details.

- EVP_aes_128_wrap(),
EVP_aes_192_wrap(),
EVP_aes_256_wrap(),
EVP_aes_128_wrap_pad(),
EVP_aes_192_wrap_pad(),
EVP_aes_256_wrap_pad()

AES key wrap with 128, 192 and 256 bit keys, as according to RFC 3394 section
2.2.1 ("wrap") and RFC 5649 section 4.1 ("wrap with padding") respectively.

- EVP_aes_128_xts(),
EVP_aes_256_xts()

AES XTS mode (XTS-AES) is standardized in IEEE Std. 1619-2007 and described in NIST
SP 800-38E. The XTS (XEX-based tweaked-codebook mode with ciphertext stealing)
mode was designed by Prof. Phillip Rogaway of University of California, Davis,
intended for encrypting data on a storage device.

XTS-AES provides confidentiality but not authentication of data. It also
requires a key of double-length for protection of a certain key size.
In particular, XTS-AES-128 (**EVP_aes_128_xts**) takes input of a 256-bit key to
achieve AES 128-bit security, and XTS-AES-256 (**EVP_aes_256_xts**) takes input
of a 512-bit key to achieve AES 256-bit security.

The XTS implementation in OpenSSL does not support streaming. That is there must
only be one EVP_EncryptUpdate(3) call per EVP_EncryptInit_ex(3) call (and
similarly with the "Decrypt" functions).

The `iv` parameter to EVP_EncryptInit_ex(3) or EVP_DecryptInit_ex(3) is
the XTS "tweak" value.


## NOTES


Developers should be aware of the negative performance implications of
calling these functions multiple times and should consider using
EVP_CIPHER_fetch(3) with EVP_CIPHER-AES(7) instead.
See crypto(7)/Performance for further information.

## RETURN VALUES


These functions return an **EVP_CIPHER** structure that contains the
implementation of the symmetric cipher. See EVP_CIPHER_meth_new(3) for
details of the **EVP_CIPHER** structure.

## SEE ALSO


evp(7),
EVP_EncryptInit(3),
EVP_CIPHER_meth_new(3)

## COPYRIGHT


Copyright 2017-2023 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_aes_128_gcm.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_aes_128_gcm.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_aes_128_gcm.pod`；SHA-256：`ce8b93efbc122deac5cf0c120d69287a6308e32b2425749f26d1a7c79028ce7c`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
