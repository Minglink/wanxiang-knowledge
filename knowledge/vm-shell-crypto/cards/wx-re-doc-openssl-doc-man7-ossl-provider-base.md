---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-ossl-provider-base",
  "title": "OpenSSL：Provider 架构 · OSSL_PROVIDER-base（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "Provider",
    "算法获取",
    "openssl",
    "OSSL_PROVIDER-base"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "c95c61fa62360c767666dd82892b06a3e3e51d1d0432ae6e4c7b87a8a29b7cec",
  "generatedHash": "c0b2fdf25d092c937681a4cec506137974ac64567a733e8f78065664087fc959",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Provider 架构：OSSL_PROVIDER-base - OpenSSL base provider",
  "l1": "The OpenSSL base provider supplies the encoding for OpenSSL's asymmetric cryptography. The implementations in this provider specifically have this property defined: It may be used in a property query string with fetching functions. It isn't mandatory to query for this property, except to make sure to get implementations of this provider and none other. These may be used in a property query string with fetching functions to select which data are to be encoded. Either the private key material, the public key material or the domain parameters can be selected. These may be used in a property query string with fetching functions to select the encoding output format. Either the DER, PEM and plaintext are currently permitted.",
  "questions": [
    "OSSL_PROVIDER-base 如何用于Provider 架构？",
    "OSSL_PROVIDER-base 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-ossl-provider-base",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/OSSL_PROVIDER-base.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：Provider 架构 · OSSL_PROVIDER-base（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：Provider 架构。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_PROVIDER-base - OpenSSL base provider

## 技术正文

## NAME


OSSL_PROVIDER-base - OpenSSL base provider

## DESCRIPTION


The OpenSSL base provider supplies the encoding for OpenSSL's
asymmetric cryptography.

### Properties


The implementations in this provider specifically have this property
defined:


- "provider=base"


It may be used in a property query string with fetching functions.

It isn't mandatory to query for this property, except to make sure to get
implementations of this provider and none other.


- "type=parameters"

- "type=private"

- "type=public"


These may be used in a property query string with fetching functions to select
which data are to be encoded.  Either the private key material, the public
key material or the domain parameters can be selected.


- "format=der"

- "format=pem"

- "format=text"


These may be used in a property query string with fetching functions to select
the encoding output format.  Either the DER, PEM and plaintext are
currently permitted.

## OPERATIONS AND ALGORITHMS


The OpenSSL base provider supports these operations and algorithms:

### Random Number Generation



- SEED-SRC,  see EVP_RAND-SEED-SRC(7)

- JITTER,  see EVP_RAND-JITTER(7)


In addition to this provider, the "SEED-SRC" and "JITTER" algorithms
are also available in the default provider.

### Asymmetric Key Encoder



- RSA

- RSA-PSS

- DH

- DHX

- DSA

- EC

- ED25519

- ED448

- X25519

- X448

- SM2

- ML-DSA-44

- ML-DSA-65

- ML-DSA-87

- ML-KEM-512

- ML-KEM-768

- ML-KEM-1024

- SLH-DSA-SHA2-128s

- SLH-DSA-SHA2-128f

- SLH-DSA-SHA2-192s

- SLH-DSA-SHA2-192f

- SLH-DSA-SHA2-256s

- SLH-DSA-SHA2-256f

- SLH-DSA-SHAKE-128s

- SLH-DSA-SHAKE-128f

- SLH-DSA-SHAKE-192s

- SLH-DSA-SHAKE-192f

- SLH-DSA-SHAKE-256s

- SLH-DSA-SHAKE-256f


In addition to this provider, all of these encoding algorithms are also
available in the default provider. Some of these algorithms may be used in
combination with the FIPS provider.

### Asymmetric Key Decoder



- RSA

- RSA-PSS

- DH

- DHX

- DSA

- EC

- ED25519

- ED448

- X25519

- X448

- SM2

- DER

- ML-DSA-44

- ML-DSA-65

- ML-DSA-87

- ML-KEM-512

- ML-KEM-768

- ML-KEM-1024

- SLH-DSA-SHA2-128s

- SLH-DSA-SHA2-128f

- SLH-DSA-SHA2-192s

- SLH-DSA-SHA2-192f

- SLH-DSA-SHA2-256s

- SLH-DSA-SHA2-256f

- SLH-DSA-SHAKE-128s

- SLH-DSA-SHAKE-128f

- SLH-DSA-SHAKE-192s

- SLH-DSA-SHAKE-192f

- SLH-DSA-SHAKE-256s

- SLH-DSA-SHAKE-256f


In addition to this provider, all of these decoding algorithms are also
available in the default provider. Some of these algorithms may be used in
combination with the FIPS provider.

### Stores



- file

- org.openssl.winstore, see OSSL_STORE-winstore(7)


In addition to this provider, all of these store algorithms are also
available in the default provider.

## SEE ALSO


OSSL_PROVIDER-default(7), openssl-core.h(7),
openssl-core_dispatch.h(7), provider(7)

## HISTORY


This functionality was added in OpenSSL 3.0.

Support for **ML-DSA** and <ML-KEM> was added in OpenSSL 3.5.

## COPYRIGHT


Copyright 2020-2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/OSSL_PROVIDER-base.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/OSSL_PROVIDER-base.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/OSSL_PROVIDER-base.pod`；SHA-256：`c95c61fa62360c767666dd82892b06a3e3e51d1d0432ae6e4c7b87a8a29b7cec`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
