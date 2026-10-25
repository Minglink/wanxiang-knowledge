---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-ossl-provider-legacy",
  "title": "OpenSSL：Provider 架构 · OSSL_PROVIDER-legacy（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "Provider",
    "算法获取",
    "openssl",
    "OSSL_PROVIDER-legacy"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "31b529f1603b7c521109b0bbde63166fc9beb058ff2bc70d356455d460eb1f17",
  "generatedHash": "d99b6e2b8e79c3c778005809d47db45f3480155b25521bd71f9f91a40e990bd5",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Provider 架构：OSSL_PROVIDER-legacy - OpenSSL legacy provider",
  "l1": "The OpenSSL legacy provider supplies OpenSSL implementations of algorithms that have been deemed legacy. Such algorithms have commonly fallen out of use, have been deemed insecure by the cryptography community, or something similar. We can consider this the retirement home of cryptographic algorithms. The implementations in this provider specifically has this property defined: It may be used in a property query string with fetching functions such as EVP_MD_fetch(3) or EVP_CIPHER_fetch(3), as well as with other functions that take a property query string, such as EVP_PKEY_CTX_new_from_name(3). It isn't mandatory to query for any of these properties, except to make sure to get implementations of this provider and none other.",
  "questions": [
    "OSSL_PROVIDER-legacy 如何用于Provider 架构？",
    "OSSL_PROVIDER-legacy 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-ossl-provider-legacy",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/OSSL_PROVIDER-legacy.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：Provider 架构 · OSSL_PROVIDER-legacy（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：Provider 架构。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_PROVIDER-legacy - OpenSSL legacy provider

## 技术正文

## NAME


OSSL_PROVIDER-legacy - OpenSSL legacy provider

## DESCRIPTION


The OpenSSL legacy provider supplies OpenSSL implementations of algorithms
that have been deemed legacy.  Such algorithms have commonly fallen out of
use, have been deemed insecure by the cryptography community, or something
similar.

We can consider this the retirement home of cryptographic algorithms.

### Properties


The implementations in this provider specifically has this property
defined:


- "provider=legacy"


It may be used in a property query string with fetching functions such as
EVP_MD_fetch(3) or EVP_CIPHER_fetch(3), as well as with other
functions that take a property query string, such as
EVP_PKEY_CTX_new_from_name(3).

It isn't mandatory to query for any of these properties, except to
make sure to get implementations of this provider and none other.

## OPERATIONS AND ALGORITHMS


The OpenSSL legacy provider supports these operations and algorithms:

### Hashing Algorithms / Message Digests



- MD2, see EVP_MD-MD2(7)

Disabled by default. Use `enable-md2` config option to enable.

- MD4, see EVP_MD-MD4(7)

- MDC2, see EVP_MD-MDC2(7)

- WHIRLPOOL, see EVP_MD-WHIRLPOOL(7)

- RIPEMD160, see EVP_MD-RIPEMD160(7)


### Symmetric Ciphers


Not all of these symmetric cipher algorithms are enabled by default.


- Blowfish, see EVP_CIPHER-BLOWFISH(7)

- CAST, see EVP_CIPHER-CAST(7)

- DES, see EVP_CIPHER-DES(7)

The algorithm names are: DES_ECB, DES_CBC, DES_OFB, DES_CFB, DES_CFB1, DES_CFB8
and DESX_CBC.

- IDEA, see EVP_CIPHER-IDEA(7)

- RC2, see EVP_CIPHER-RC2(7)

- RC4, see EVP_CIPHER-RC4(7)

- RC5, see EVP_CIPHER-RC5(7)

Disabled by default. Use `enable-rc5` config option to enable.

- SEED, see EVP_CIPHER-SEED(7)


### Key Derivation Function (KDF)



- PBKDF1

- PVKKDF



## SEE ALSO


OSSL_PARAM(3),
openssl-core.h(7),
openssl-core_dispatch.h(7),
provider(7)

## HISTORY


This functionality was added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2020-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/OSSL_PROVIDER-legacy.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/OSSL_PROVIDER-legacy.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/OSSL_PROVIDER-legacy.pod`；SHA-256：`31b529f1603b7c521109b0bbde63166fc9beb058ff2bc70d356455d460eb1f17`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
