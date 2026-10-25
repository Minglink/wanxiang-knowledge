---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-chacha20",
  "title": "OpenSSL：EVP 密码接口 · EVP_chacha20（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "密码接口",
    "Provider",
    "openssl",
    "EVP_chacha20",
    "Poly1305认证",
    "ChaCha流密码"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "ca3ae049f7630f8a2aba195fac6b0a1ad4b4f77c23749e264a2b46c5cd121885",
  "generatedHash": "0e7260bd2e5cebc0f07dc062fecb61f355e4170998407fbbbc60f378fe539599",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "EVP 密码接口：EVP_chacha20, EVP_chacha20_poly1305 - EVP ChaCha20 stream cipher",
  "l1": "The ChaCha20 stream cipher for EVP. The ChaCha20 stream cipher. The key length is 256 bits, the IV is 128 bits long. The first 64 bits consists of a counter in little-endian order followed by a 64 bit nonce. For example a nonce of: 0000000000000002 With an initial counter of 42 (2a in hex) would be expressed as: 2a000000000000000000000000000002 Authenticated encryption with ChaCha20-Poly1305. Like EVP_chacha20(), the key is 256 bits and the IV is 96 bits. This supports additional authenticated data (AAD) and produces a 128-bit authentication tag. See the EVP_EncryptInit(3)/AEAD Interface section for more information. ",
  "questions": [
    "EVP_chacha20 如何用于EVP 密码接口？",
    "EVP_chacha20 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-focus-crypto-chacha-quarter",
      "kind": "机制参照"
    }
  ],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-chacha20",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_chacha20.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：EVP 密码接口 · EVP_chacha20（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：EVP 密码接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_chacha20,
EVP_chacha20_poly1305
- EVP ChaCha20 stream cipher

## 技术正文

## NAME


EVP_chacha20,
EVP_chacha20_poly1305
- EVP ChaCha20 stream cipher

## SYNOPSIS


```c
#include <openssl/evp.h>

const EVP_CIPHER *EVP_chacha20(void);
const EVP_CIPHER *EVP_chacha20_poly1305(void);

```

## DESCRIPTION


The ChaCha20 stream cipher for EVP.


- EVP_chacha20()

The ChaCha20 stream cipher. The key length is 256 bits, the IV is 128 bits long.
The first 64 bits consists of a counter in little-endian order followed by a 64
bit nonce. For example a nonce of:

0000000000000002

With an initial counter of 42 (2a in hex) would be expressed as:

2a000000000000000000000000000002

- EVP_chacha20_poly1305()

Authenticated encryption with ChaCha20-Poly1305. Like EVP_chacha20(), the key
is 256 bits and the IV is 96 bits. This supports additional authenticated data
(AAD) and produces a 128-bit authentication tag. See the
EVP_EncryptInit(3)/AEAD Interface section for more information.


## NOTES


Developers should be aware of the negative performance implications of
calling these functions multiple times and should consider using
EVP_CIPHER_fetch(3) with EVP_CIPHER-CHACHA(7) instead.
See crypto(7)/Performance for further information.

RFC 7539
uses a 32 bit counter and a 96 bit nonce for the IV.

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

- 上游：[doc/man3/EVP_chacha20.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_chacha20.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_chacha20.pod`；SHA-256：`ca3ae049f7630f8a2aba195fac6b0a1ad4b4f77c23749e264a2b46c5cd121885`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
