---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-rand-crng-test",
  "title": "OpenSSL：密码随机数 · EVP_RAND-CRNG-TEST（man7）",
  "type": "note",
  "tags": [
    "随机数",
    "熵源",
    "DRBG",
    "openssl",
    "EVP_RAND-CRNG-TEST"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "5ffe0cac8363cadd5078f088f9a8fe8a1f5a847bda6db751be0fd8c69e9f9169",
  "generatedHash": "30bcd54ca9841c3be13071c412db6b44acbc16bad2fd0982ced12a64dac71fff",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码随机数：EVP_RAND-CRNG-TEST - The FIPS health testing EVP_RAND filter",
  "l1": "This **EVP_RAND** object acts as a filter between the entropy source and its users. It performs CRNG health tests as defined in SP 800-90B Section 4 \"Health Tests\". Most requests are forwarded to the entropy source, either via its parent reference or via the provider entropy upcalls. \"CRNG-TEST\" is the name for this implementation; it can be used with the EVP_RAND_fetch() function. If a parent EVP_RAND is specified on context creation, the parent's parameters are supported because the request is forwarded to the parent seed source for processing. If no parent EVP_RAND is specified on context creation, the following parameters are supported: These parameters work as described in EVP_RAND(3)/PARAMETERS. This parameter works as described in provider-rand(7)/PARAMETERS. ",
  "questions": [
    "EVP_RAND-CRNG-TEST 如何用于密码随机数？",
    "EVP_RAND-CRNG-TEST 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-rand-crng-test",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_RAND-CRNG-TEST.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码随机数 · EVP_RAND-CRNG-TEST（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码随机数。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_RAND-CRNG-TEST - The FIPS health testing EVP_RAND filter

## 技术正文

## NAME


EVP_RAND-CRNG-TEST - The FIPS health testing EVP_RAND filter

## DESCRIPTION


This **EVP_RAND** object acts as a filter between the entropy source
and its users.  It performs CRNG health tests as defined in
SP 800-90B Section 4 "Health
Tests".  Most requests are forwarded to the entropy source, either via
its parent reference or via the provider entropy upcalls.

### Identity


"CRNG-TEST" is the name for this implementation; it can be used with the
EVP_RAND_fetch() function.

### Supported parameters


If a parent EVP_RAND is specified on context creation, the parent's
parameters are supported because the request is forwarded to the parent
seed source for processing.

If no parent EVP_RAND is specified on context creation, the following parameters
are supported:


- "state" (**OSSL_RAND_PARAM_STATE**) <integer>

- "strength" (**OSSL_RAND_PARAM_STRENGTH**) <unsigned integer>

- "max_request" (**OSSL_RAND_PARAM_MAX_REQUEST**) <unsigned integer>

These parameters work as described in EVP_RAND(3)/PARAMETERS.

- "fips-indicator" (**OSSL_DRBG_PARAM_FIPS_APPROVED_INDICATOR**) <integer>

This parameter works as described in provider-rand(7)/PARAMETERS.


## NOTES


This EVP_RAND is only implemented by the OpenSSL FIPS provider.

A context for a health test filter can be obtained by calling:

```c
EVP_RAND *parent = ...;
EVP_RAND *rand = EVP_RAND_fetch(NULL, "CRNG-TEST", NULL);
EVP_RAND_CTX *rctx = EVP_RAND_CTX_new(rand, parent);

```

## SEE ALSO


EVP_RAND(3), OSSL_PROVIDER-FIPS(7)

## HISTORY


This functionality was added in OpenSSL 3.4.

## COPYRIGHT


Copyright 2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_RAND-CRNG-TEST.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_RAND-CRNG-TEST.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_RAND-CRNG-TEST.pod`；SHA-256：`5ffe0cac8363cadd5078f088f9a8fe8a1f5a847bda6db751be0fd8c69e9f9169`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
