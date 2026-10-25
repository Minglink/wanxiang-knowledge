---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-des-cbc",
  "title": "OpenSSL：EVP 密码接口 · EVP_des_cbc（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "密码接口",
    "Provider",
    "openssl",
    "EVP_des_cbc"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "5da9d2bc69a69524458d6670095d07f800cb6b9bc96ce4c3f907fb8a0c46794f",
  "generatedHash": "e37d0a2a4865b36a88577566fa243c03372e0999ab854fdcbee1915970dad050",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "EVP 密码接口：EVP_des_cbc, EVP_des_cfb, EVP_des_cfb1, EVP_des_cfb8, EVP_des_cfb64, EVP_des_ecb, EVP_des_ofb, EVP_des_ede, EVP_des_ede_cbc, EVP_des_ede_cfb, EVP_des_ede_cfb64, EVP_des_ede_ecb, EVP_des_ede_ofb, EVP_des_ede3, EVP_des_ede3_cbc, EVP_des_ede3_cfb, EVP_des_ede3_cfb1, EVP_des_ede3_cfb8, EVP_des_ede3_cfb6",
  "l1": "The DES encryption algorithm for EVP. EVP_des_ecb(), EVP_des_cfb(), EVP_des_cfb1(), EVP_des_cfb8(), EVP_des_cfb64(), EVP_des_ofb() DES in CBC, ECB, CFB with 64-bit shift, CFB with 1-bit shift, CFB with 8-bit shift and OFB modes. None of these algorithms are provided by the OpenSSL default provider. To use them it is necessary to load either the OpenSSL legacy provider or another implementation. EVP_des_ede_cbc(), EVP_des_ede_cfb(), EVP_des_ede_cfb64(), EVP_des_ede_ecb(), EVP_des_ede_ofb() Two key triple DES in ECB, CBC, CFB with 64-bit shift and OFB modes. EVP_des_ede3_cbc(), EVP_des_ede3_cfb(), EVP_des_ede3_cfb1(), EVP_des_ede3_cfb8(), EVP_des_ede3_cfb64(), EVP_des_ede3_ecb(), EVP_des_ede3_ofb() Three-key triple DES in ECB, CBC, CFB with 64-bit shift, CFB with 1-bit shift, CFB with 8-bit shift and OFB modes. Triple-DES key wrap according",
  "questions": [
    "EVP_des_cbc 如何用于EVP 密码接口？",
    "EVP_des_cbc 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-des-cbc",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_des_cbc.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：EVP 密码接口 · EVP_des_cbc（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：EVP 密码接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_des_cbc,
EVP_des_cfb,
EVP_des_cfb1,
EVP_des_cfb8,
EVP_des_cfb64,
EVP_des_ecb,
EVP_des_ofb,
EVP_des_ede,
EVP_des_ede_cbc,
EVP_des_ede_cfb,
EVP_des_ede_cfb64,
EVP_des_ede_ecb,
EVP_des_ede_ofb,
EVP_des_ede3,
EVP_des_ede3_cbc,
EVP_des_ede3_cfb,
EVP_des_ede3_cfb1,
EVP_des_ede3_cfb8,
EVP_des_ede3_cfb64,
EVP_des_ede3_ecb,
EVP_des_ede3_ofb,
EVP_des_ede3_wrap
- EVP DES cipher

## 技术正文

## NAME


EVP_des_cbc,
EVP_des_cfb,
EVP_des_cfb1,
EVP_des_cfb8,
EVP_des_cfb64,
EVP_des_ecb,
EVP_des_ofb,
EVP_des_ede,
EVP_des_ede_cbc,
EVP_des_ede_cfb,
EVP_des_ede_cfb64,
EVP_des_ede_ecb,
EVP_des_ede_ofb,
EVP_des_ede3,
EVP_des_ede3_cbc,
EVP_des_ede3_cfb,
EVP_des_ede3_cfb1,
EVP_des_ede3_cfb8,
EVP_des_ede3_cfb64,
EVP_des_ede3_ecb,
EVP_des_ede3_ofb,
EVP_des_ede3_wrap
- EVP DES cipher

## SYNOPSIS



```c
#include <openssl/evp.h>

const EVP_CIPHER *EVP_ciphername(void)

```

`EVP_ciphername` is used a placeholder for any of the described cipher
functions, such as `EVP_des_cbc`.

## DESCRIPTION


The DES encryption algorithm for EVP.


- EVP_des_cbc(),
EVP_des_ecb(),
EVP_des_cfb(),
EVP_des_cfb1(),
EVP_des_cfb8(),
EVP_des_cfb64(),
EVP_des_ofb()

DES in CBC, ECB, CFB with 64-bit shift, CFB with 1-bit shift, CFB with 8-bit
shift and OFB modes.

None of these algorithms are provided by the OpenSSL default provider.
To use them it is necessary to load either the OpenSSL legacy provider or another
implementation.

- EVP_des_ede(),
EVP_des_ede_cbc(),
EVP_des_ede_cfb(),
EVP_des_ede_cfb64(),
EVP_des_ede_ecb(),
EVP_des_ede_ofb()

Two key triple DES in ECB, CBC, CFB with 64-bit shift and OFB modes.

- EVP_des_ede3(),
EVP_des_ede3_cbc(),
EVP_des_ede3_cfb(),
EVP_des_ede3_cfb1(),
EVP_des_ede3_cfb8(),
EVP_des_ede3_cfb64(),
EVP_des_ede3_ecb(),
EVP_des_ede3_ofb()

Three-key triple DES in ECB, CBC, CFB with 64-bit shift, CFB with 1-bit shift,
CFB with 8-bit shift and OFB modes.

- EVP_des_ede3_wrap()

Triple-DES key wrap according to RFC 3217 Section 3.


## NOTES


Developers should be aware of the negative performance implications of
calling these functions multiple times and should consider using
EVP_CIPHER_fetch(3) with EVP_CIPHER-DES(7) instead.
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

- 上游：[doc/man3/EVP_des_cbc.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_des_cbc.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_des_cbc.pod`；SHA-256：`5da9d2bc69a69524458d6670095d07f800cb6b9bc96ce4c3f907fb8a0c46794f`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
