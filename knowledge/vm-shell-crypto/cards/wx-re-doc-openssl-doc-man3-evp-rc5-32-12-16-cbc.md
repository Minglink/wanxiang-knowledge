---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-rc5-32-12-16-cbc",
  "title": "OpenSSL：EVP 密码接口 · EVP_rc5_32_12_16_cbc（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "密码接口",
    "Provider",
    "openssl",
    "EVP_rc5_32_12_16_cbc"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "463540ab2fa86a86befad8041a5e1cc8cd3b44a94496e8d3a21cee9a86c02757",
  "generatedHash": "1cbe957c451233a9b3934511e06a5c6c3154b6f1f49e4ebabb5b5012ff33f4d2",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "EVP 密码接口：EVP_rc5_32_12_16_cbc, EVP_rc5_32_12_16_cfb, EVP_rc5_32_12_16_cfb64, EVP_rc5_32_12_16_ecb, EVP_rc5_32_12_16_ofb - EVP RC5 cipher",
  "l1": "The RC5 encryption algorithm for EVP. EVP_rc5_32_12_16_cfb(), EVP_rc5_32_12_16_cfb64(), EVP_rc5_32_12_16_ecb(), EVP_rc5_32_12_16_ofb() RC5 encryption algorithm in CBC, CFB, ECB and OFB modes respectively. This is a variable key length cipher with an additional \"number of rounds\" parameter. By default the key length is set to 128 bits and 12 rounds. Alternative key lengths can be set using EVP_CIPHER_CTX_set_key_length(3). The maximum key length is 2040 bits. The following rc5 specific `ctrl`s are supported (see EVP_CIPHER_CTX_ctrl(3)). Sets the number of rounds to **rounds**. This must be one of RC5_8_ROUNDS, RC5_12_ROUNDS or RC5_16_ROUNDS. Stores the number of rounds currently configured in ***rounds** where ***rounds** is an int. ",
  "questions": [
    "EVP_rc5_32_12_16_cbc 如何用于EVP 密码接口？",
    "EVP_rc5_32_12_16_cbc 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-rc5-32-12-16-cbc",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_rc5_32_12_16_cbc.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：EVP 密码接口 · EVP_rc5_32_12_16_cbc（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：EVP 密码接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_rc5_32_12_16_cbc,
EVP_rc5_32_12_16_cfb,
EVP_rc5_32_12_16_cfb64,
EVP_rc5_32_12_16_ecb,
EVP_rc5_32_12_16_ofb
- EVP RC5 cipher

## 技术正文

## NAME


EVP_rc5_32_12_16_cbc,
EVP_rc5_32_12_16_cfb,
EVP_rc5_32_12_16_cfb64,
EVP_rc5_32_12_16_ecb,
EVP_rc5_32_12_16_ofb
- EVP RC5 cipher

## SYNOPSIS


```c
#include <openssl/evp.h>

const EVP_CIPHER *EVP_rc5_32_12_16_cbc(void);
const EVP_CIPHER *EVP_rc5_32_12_16_cfb(void);
const EVP_CIPHER *EVP_rc5_32_12_16_cfb64(void);
const EVP_CIPHER *EVP_rc5_32_12_16_ecb(void);
const EVP_CIPHER *EVP_rc5_32_12_16_ofb(void);

```

## DESCRIPTION


The RC5 encryption algorithm for EVP.


- EVP_rc5_32_12_16_cbc(),
EVP_rc5_32_12_16_cfb(),
EVP_rc5_32_12_16_cfb64(),
EVP_rc5_32_12_16_ecb(),
EVP_rc5_32_12_16_ofb()

RC5 encryption algorithm in CBC, CFB, ECB and OFB modes respectively. This is a
variable key length cipher with an additional "number of rounds" parameter. By
default the key length is set to 128 bits and 12 rounds. Alternative key lengths
can be set using EVP_CIPHER_CTX_set_key_length(3). The maximum key length is
2040 bits.

The following rc5 specific `ctrl`s are supported (see
EVP_CIPHER_CTX_ctrl(3)).


- EVP_CIPHER_CTX_ctrl(ctx, EVP_CTRL_SET_RC5_ROUNDS, rounds, NULL)

Sets the number of rounds to **rounds**. This must be one of RC5_8_ROUNDS,
RC5_12_ROUNDS or RC5_16_ROUNDS.

- EVP_CIPHER_CTX_ctrl(ctx, EVP_CTRL_GET_RC5_ROUNDS, 0, &rounds)

Stores the number of rounds currently configured in ***rounds** where ***rounds**
is an int.



## NOTES


Developers should be aware of the negative performance implications of
calling these functions multiple times and should consider using
EVP_CIPHER_fetch(3) with EVP_CIPHER-RC5(7) instead.
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

- 上游：[doc/man3/EVP_rc5_32_12_16_cbc.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_rc5_32_12_16_cbc.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_rc5_32_12_16_cbc.pod`；SHA-256：`463540ab2fa86a86befad8041a5e1cc8cd3b44a94496e8d3a21cee9a86c02757`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
