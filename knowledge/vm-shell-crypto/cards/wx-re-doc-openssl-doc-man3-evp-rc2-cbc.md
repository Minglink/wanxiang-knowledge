---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-rc2-cbc",
  "title": "OpenSSL：EVP 密码接口 · EVP_rc2_cbc（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "密码接口",
    "Provider",
    "openssl",
    "EVP_rc2_cbc"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "22580e9fbb3f0c6d31b5da42b1d31d2bef4e764cf7c3810ec72ec6c179f72ea8",
  "generatedHash": "f1428572a53c2606cb89d6605ae3f249603b2411cdf0a08cc9e6df8e2243d3aa",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "EVP 密码接口：EVP_rc2_cbc, EVP_rc2_cfb, EVP_rc2_cfb64, EVP_rc2_ecb, EVP_rc2_ofb, EVP_rc2_40_cbc, EVP_rc2_64_cbc - EVP RC2 cipher",
  "l1": "The RC2 encryption algorithm for EVP. EVP_rc2_cfb(), EVP_rc2_cfb64(), EVP_rc2_ecb(), EVP_rc2_ofb() RC2 encryption algorithm in CBC, CFB, ECB and OFB modes respectively. This is a variable key length cipher with an additional parameter called \"effective key bits\" or \"effective key length\". By default both are set to 128 bits. EVP_rc2_64_cbc() RC2 algorithm in CBC mode with a default key length and effective key length of 40 and 64 bits. WARNING: these functions are obsolete. Their usage should be replaced with the EVP_rc2_cbc(), EVP_CIPHER_CTX_set_key_length() and EVP_CIPHER_CTX_ctrl() functions to set the key length and effective key length. ",
  "questions": [
    "EVP_rc2_cbc 如何用于EVP 密码接口？",
    "EVP_rc2_cbc 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-rc2-cbc",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_rc2_cbc.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：EVP 密码接口 · EVP_rc2_cbc（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：EVP 密码接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_rc2_cbc,
EVP_rc2_cfb,
EVP_rc2_cfb64,
EVP_rc2_ecb,
EVP_rc2_ofb,
EVP_rc2_40_cbc,
EVP_rc2_64_cbc
- EVP RC2 cipher

## 技术正文

## NAME


EVP_rc2_cbc,
EVP_rc2_cfb,
EVP_rc2_cfb64,
EVP_rc2_ecb,
EVP_rc2_ofb,
EVP_rc2_40_cbc,
EVP_rc2_64_cbc
- EVP RC2 cipher

## SYNOPSIS


```c
#include <openssl/evp.h>

const EVP_CIPHER *EVP_rc2_cbc(void);
const EVP_CIPHER *EVP_rc2_cfb(void);
const EVP_CIPHER *EVP_rc2_cfb64(void);
const EVP_CIPHER *EVP_rc2_ecb(void);
const EVP_CIPHER *EVP_rc2_ofb(void);
const EVP_CIPHER *EVP_rc2_40_cbc(void);
const EVP_CIPHER *EVP_rc2_64_cbc(void);

```

## DESCRIPTION


The RC2 encryption algorithm for EVP.


- EVP_rc2_cbc(),
EVP_rc2_cfb(),
EVP_rc2_cfb64(),
EVP_rc2_ecb(),
EVP_rc2_ofb()

RC2 encryption algorithm in CBC, CFB, ECB and OFB modes respectively. This is a
variable key length cipher with an additional parameter called "effective key
bits" or "effective key length". By default both are set to 128 bits.

- EVP_rc2_40_cbc(),
EVP_rc2_64_cbc()

RC2 algorithm in CBC mode with a default key length and effective key length of
40 and 64 bits.

WARNING: these functions are obsolete. Their usage should be replaced with the
EVP_rc2_cbc(), EVP_CIPHER_CTX_set_key_length() and EVP_CIPHER_CTX_ctrl()
functions to set the key length and effective key length.


## NOTES


Developers should be aware of the negative performance implications of
calling these functions multiple times and should consider using
EVP_CIPHER_fetch(3) with EVP_CIPHER-RC2(7) instead.
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

- 上游：[doc/man3/EVP_rc2_cbc.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_rc2_cbc.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_rc2_cbc.pod`；SHA-256：`22580e9fbb3f0c6d31b5da42b1d31d2bef4e764cf7c3810ec72ec6c179f72ea8`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
