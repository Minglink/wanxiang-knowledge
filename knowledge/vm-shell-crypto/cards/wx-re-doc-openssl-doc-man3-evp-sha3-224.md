---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-sha3-224",
  "title": "OpenSSL：EVP 密码接口 · EVP_sha3_224（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "密码接口",
    "Provider",
    "openssl",
    "EVP_sha3_224",
    "SHAKE可扩展输出",
    "SHA3摘要"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "f0a7fb7dfe4d140a61b45cf49116059351cbeac1fdf72bcc7fa9696206a8e9d4",
  "generatedHash": "2d95665232386472e8a6c44d0fa6f54eb266a42840724de4507148b1d2faabda",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "EVP 密码接口：EVP_sha3_224, EVP_sha3_256, EVP_sha3_384, EVP_sha3_512, EVP_shake128, EVP_shake256 - SHA-3 For EVP",
  "l1": "SHA-3 (Secure Hash Algorithm 3) is a family of cryptographic hash functions standardized in NIST FIPS 202, first published in 2015. It is based on the Keccak algorithm. EVP_sha3_256(), EVP_sha3_384(), EVP_sha3_512() The SHA-3 SHA-3-224, SHA-3-256, SHA-3-384, and SHA-3-512 algorithms respectively. They produce 224, 256, 384 and 512 bits of output from a given input. EVP_shake256() The SHAKE-128 and SHAKE-256 Extendable Output Functions (XOF) that can generate a variable hash length. Specifically, **EVP_shake128** provides an overall security of 128 bits, while **EVP_shake256** provides that of 256 bits. ",
  "questions": [
    "EVP_sha3_224 如何用于EVP 密码接口？",
    "EVP_sha3_224 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-focus-crypto-sha-state",
      "kind": "机制参照"
    }
  ],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-sha3-224",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_sha3_224.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：EVP 密码接口 · EVP_sha3_224（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：EVP 密码接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_sha3_224,
EVP_sha3_256,
EVP_sha3_384,
EVP_sha3_512,
EVP_shake128,
EVP_shake256
- SHA-3 For EVP

## 技术正文

## NAME


EVP_sha3_224,
EVP_sha3_256,
EVP_sha3_384,
EVP_sha3_512,
EVP_shake128,
EVP_shake256
- SHA-3 For EVP

## SYNOPSIS


```c
#include <openssl/evp.h>

const EVP_MD *EVP_sha3_224(void);
const EVP_MD *EVP_sha3_256(void);
const EVP_MD *EVP_sha3_384(void);
const EVP_MD *EVP_sha3_512(void);

const EVP_MD *EVP_shake128(void);
const EVP_MD *EVP_shake256(void);

```

## DESCRIPTION


SHA-3 (Secure Hash Algorithm 3) is a family of cryptographic hash functions
standardized in NIST FIPS 202, first published in 2015. It is based on the
Keccak algorithm.


- EVP_sha3_224(),
EVP_sha3_256(),
EVP_sha3_384(),
EVP_sha3_512()

The SHA-3 SHA-3-224, SHA-3-256, SHA-3-384, and SHA-3-512 algorithms
respectively. They produce 224, 256, 384 and 512 bits of output from a given
input.

- EVP_shake128(),
EVP_shake256()

The SHAKE-128 and SHAKE-256 Extendable Output Functions (XOF) that can generate
a variable hash length.

Specifically, **EVP_shake128** provides an overall security of 128 bits, while
**EVP_shake256** provides that of 256 bits.


## NOTES


Developers should be aware of the negative performance implications of
calling these functions multiple times and should consider using
EVP_MD_fetch(3) with EVP_MD-SHA3(7) or EVP_MD-SHAKE(7) instead.
See crypto(7)/Performance for further information.

## RETURN VALUES


These functions return a **EVP_MD** structure that contains the
implementation of the message digest. See EVP_MD_meth_new(3) for
details of the **EVP_MD** structure.

## CONFORMING TO


NIST FIPS 202.

## SEE ALSO


evp(7),
EVP_DigestInit(3)

## COPYRIGHT


Copyright 2017-2023 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_sha3_224.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_sha3_224.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_sha3_224.pod`；SHA-256：`f0a7fb7dfe4d140a61b45cf49116059351cbeac1fdf72bcc7fa9696206a8e9d4`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
