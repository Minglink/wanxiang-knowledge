---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-aria-128-gcm",
  "title": "OpenSSL：EVP 密码接口 · EVP_aria_128_gcm（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "密码接口",
    "Provider",
    "openssl",
    "EVP_aria_128_gcm"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "167676c5b39d7f35979ccb8b75d5dd93361e096b732f04e1af086e2e1f4729d2",
  "generatedHash": "cd39368626fbb802683d9bc773e578fa3756ea89ddfb7d7535d4432ad211bd24",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "EVP 密码接口：EVP_aria_128_cbc, EVP_aria_192_cbc, EVP_aria_256_cbc, EVP_aria_128_cfb, EVP_aria_192_cfb, EVP_aria_256_cfb, EVP_aria_128_cfb1, EVP_aria_192_cfb1, EVP_aria_256_cfb1, EVP_aria_128_cfb8, EVP_aria_192_cfb8, EVP_aria_256_cfb8, EVP_aria_128_cfb128, EVP_aria_192_cfb128, EVP_aria_256_cfb128, EVP_aria_128_ct",
  "l1": "The ARIA encryption algorithm for EVP. EVP_aria_192_cbc(), EVP_aria_256_cbc(), EVP_aria_128_cfb(), EVP_aria_192_cfb(), EVP_aria_256_cfb(), EVP_aria_128_cfb1(), EVP_aria_192_cfb1(), EVP_aria_256_cfb1(), EVP_aria_128_cfb8(), EVP_aria_192_cfb8(), EVP_aria_256_cfb8(), EVP_aria_128_cfb128(), EVP_aria_192_cfb128(), EVP_aria_256_cfb128(), EVP_aria_128_ctr(), EVP_aria_192_ctr(), EVP_aria_256_ctr(), EVP_aria_128_ecb(), EVP_aria_192_ecb(), EVP_aria_256_ecb(), EVP_aria_128_ofb(), EVP_aria_192_ofb(), EVP_aria_256_ofb() ARIA for 128, 192 and 256 bit keys in the following modes: CBC, CFB with 128-bit shift, CFB with 1-bit shift, CFB with 8-bit shift, CTR, ECB and OFB. EVP_aria_192_ccm(), EVP_aria_256_ccm(), EVP_aria_128_gcm(), EVP_aria_192_gcm(), EVP_aria_256_gcm(), ARIA for 128, 192 and 256 bit keys in CBC-MAC Mode (CCM) and Galois Counter Mode (GCM).",
  "questions": [
    "EVP_aria_128_gcm 如何用于EVP 密码接口？",
    "EVP_aria_128_gcm 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-aria-128-gcm",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_aria_128_gcm.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：EVP 密码接口 · EVP_aria_128_gcm（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：EVP 密码接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_aria_128_cbc,
EVP_aria_192_cbc,
EVP_aria_256_cbc,
EVP_aria_128_cfb,
EVP_aria_192_cfb,
EVP_aria_256_cfb,
EVP_aria_128_cfb1,
EVP_aria_192_cfb1,
EVP_aria_256_cfb1,
EVP_aria_128_cfb8,
EVP_aria_192_cfb8,
EVP_aria_256_cfb8,
EVP_aria_128_cfb128,
EVP_aria_192_cfb128,
EVP_aria_256_cfb128,
EVP_aria_128_ctr,
EVP_aria_192_ctr,
EVP_aria_256_ctr,
EVP_aria_128_ecb,
EVP_aria_192_ecb,
EVP_aria_256_ecb,
EVP_aria_128_ofb,
EVP_aria_192_ofb,
EVP_aria_256_ofb,
EVP_aria_128_ccm,
EVP_aria_192_ccm,
EVP_aria_256_ccm,
EVP_aria_128_gcm,
EVP_aria_192_gcm,
EVP_aria_256_gcm,
- EVP ARIA cipher

## 技术正文

## NAME


EVP_aria_128_cbc,
EVP_aria_192_cbc,
EVP_aria_256_cbc,
EVP_aria_128_cfb,
EVP_aria_192_cfb,
EVP_aria_256_cfb,
EVP_aria_128_cfb1,
EVP_aria_192_cfb1,
EVP_aria_256_cfb1,
EVP_aria_128_cfb8,
EVP_aria_192_cfb8,
EVP_aria_256_cfb8,
EVP_aria_128_cfb128,
EVP_aria_192_cfb128,
EVP_aria_256_cfb128,
EVP_aria_128_ctr,
EVP_aria_192_ctr,
EVP_aria_256_ctr,
EVP_aria_128_ecb,
EVP_aria_192_ecb,
EVP_aria_256_ecb,
EVP_aria_128_ofb,
EVP_aria_192_ofb,
EVP_aria_256_ofb,
EVP_aria_128_ccm,
EVP_aria_192_ccm,
EVP_aria_256_ccm,
EVP_aria_128_gcm,
EVP_aria_192_gcm,
EVP_aria_256_gcm,
- EVP ARIA cipher

## SYNOPSIS



```c
#include <openssl/evp.h>

const EVP_CIPHER *EVP_ciphername(void)

```

`EVP_ciphername` is used a placeholder for any of the described cipher
functions, such as `EVP_aria_128_cbc`.

## DESCRIPTION


The ARIA encryption algorithm for EVP.


- EVP_aria_128_cbc(),
EVP_aria_192_cbc(),
EVP_aria_256_cbc(),
EVP_aria_128_cfb(),
EVP_aria_192_cfb(),
EVP_aria_256_cfb(),
EVP_aria_128_cfb1(),
EVP_aria_192_cfb1(),
EVP_aria_256_cfb1(),
EVP_aria_128_cfb8(),
EVP_aria_192_cfb8(),
EVP_aria_256_cfb8(),
EVP_aria_128_cfb128(),
EVP_aria_192_cfb128(),
EVP_aria_256_cfb128(),
EVP_aria_128_ctr(),
EVP_aria_192_ctr(),
EVP_aria_256_ctr(),
EVP_aria_128_ecb(),
EVP_aria_192_ecb(),
EVP_aria_256_ecb(),
EVP_aria_128_ofb(),
EVP_aria_192_ofb(),
EVP_aria_256_ofb()

ARIA for 128, 192 and 256 bit keys in the following modes: CBC, CFB with
128-bit shift, CFB with 1-bit shift, CFB with 8-bit shift, CTR, ECB and OFB.

- EVP_aria_128_ccm(),
EVP_aria_192_ccm(),
EVP_aria_256_ccm(),
EVP_aria_128_gcm(),
EVP_aria_192_gcm(),
EVP_aria_256_gcm(),

ARIA for 128, 192 and 256 bit keys in CBC-MAC Mode (CCM) and Galois Counter
Mode (GCM). These ciphers require additional control operations to function
correctly, see the EVP_EncryptInit(3)/AEAD Interface section for details.


## NOTES


Developers should be aware of the negative performance implications of
calling these functions multiple times and should consider using
EVP_CIPHER_fetch(3) with EVP_CIPHER-ARIA(7) instead.
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

- 上游：[doc/man3/EVP_aria_128_gcm.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_aria_128_gcm.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_aria_128_gcm.pod`；SHA-256：`167676c5b39d7f35979ccb8b75d5dd93361e096b732f04e1af086e2e1f4729d2`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
