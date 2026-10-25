---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-rand-ctr-drbg",
  "title": "OpenSSL：密码随机数 · EVP_RAND-CTR-DRBG（man7）",
  "type": "note",
  "tags": [
    "随机数",
    "熵源",
    "DRBG",
    "openssl",
    "EVP_RAND-CTR-DRBG"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "14e2ee76b3f0a419d8c359fe2975a0aa148b32c66439bc8aab7d68cb07850236",
  "generatedHash": "81bf4dba89d718c1467ed5cc4414ffec24106c8918ae1ecc2b65f79fe98d8d29",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码随机数：EVP_RAND-CTR-DRBG - The CTR DRBG EVP_RAND implementation",
  "l1": "Support for the counter deterministic random bit generator through the **EVP_RAND** API. \"CTR-DRBG\" is the name for this implementation; it can be used with the EVP_RAND_fetch() function. The supported parameters are: These parameters work as described in EVP_RAND(3)/PARAMETERS. This Boolean indicates if a derivation function should be used or not. A nonzero value (the default) uses the derivation function. A zero value does not. ",
  "questions": [
    "EVP_RAND-CTR-DRBG 如何用于密码随机数？",
    "EVP_RAND-CTR-DRBG 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-rand-ctr-drbg",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_RAND-CTR-DRBG.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码随机数 · EVP_RAND-CTR-DRBG（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码随机数。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_RAND-CTR-DRBG - The CTR DRBG EVP_RAND implementation

## 技术正文

## NAME


EVP_RAND-CTR-DRBG - The CTR DRBG EVP_RAND implementation

## DESCRIPTION


Support for the counter deterministic random bit generator through the
**EVP_RAND** API.

### Identity


"CTR-DRBG" is the name for this implementation; it can be used with the
EVP_RAND_fetch() function.

### Supported parameters


The supported parameters are:


- "state" (**OSSL_RAND_PARAM_STATE**) <integer>

- "strength" (**OSSL_RAND_PARAM_STRENGTH**) <unsigned integer>

- "max_request" (**OSSL_RAND_PARAM_MAX_REQUEST**) <unsigned integer>

- "reseed_requests" (**OSSL_DRBG_PARAM_RESEED_REQUESTS**) <unsigned integer>

- "reseed_time_interval" (**OSSL_DRBG_PARAM_RESEED_TIME_INTERVAL**) <integer>

- "min_entropylen" (**OSSL_DRBG_PARAM_MIN_ENTROPYLEN**) <unsigned integer>

- "max_entropylen" (**OSSL_DRBG_PARAM_MAX_ENTROPYLEN**) <unsigned integer>

- "min_noncelen" (**OSSL_DRBG_PARAM_MIN_NONCELEN**) <unsigned integer>

- "max_noncelen" (**OSSL_DRBG_PARAM_MAX_NONCELEN**) <unsigned integer>

- "max_perslen" (**OSSL_DRBG_PARAM_MAX_PERSLEN**) <unsigned integer>

- "max_adinlen" (**OSSL_DRBG_PARAM_MAX_ADINLEN**) <unsigned integer>

- "reseed_counter" (**OSSL_DRBG_PARAM_RESEED_COUNTER**) <unsigned integer>

- "properties" (**OSSL_DRBG_PARAM_PROPERTIES**) <UTF8 string>

- "cipher" (**OSSL_DRBG_PARAM_CIPHER**) <UTF8 string>

These parameters work as described in EVP_RAND(3)/PARAMETERS.

- "use_derivation_function" (**OSSL_DRBG_PARAM_USE_DF**) <integer>

This Boolean indicates if a derivation function should be used or not.
A nonzero value (the default) uses the derivation function.  A zero value
does not.


## NOTES


A context for CTR DRBG can be obtained by calling:

```c
EVP_RAND *rand = EVP_RAND_fetch(NULL, "CTR-DRBG", NULL);
EVP_RAND_CTX *rctx = EVP_RAND_CTX_new(rand, NULL);

```

The default CTR-DRBG implementation attempts to fetch the required internal
algorithms from the provider they are built into (eg the default provider)
regardless of the properties provided. Should the provider not implement
the required algorithms then properties will be used to find a different
implementation.

## EXAMPLES


```c
EVP_RAND *rand;
EVP_RAND_CTX *rctx;
unsigned char bytes[100];
OSSL_PARAM params[2], *p = params;
unsigned int strength = 128;

rand = EVP_RAND_fetch(NULL, "CTR-DRBG", NULL);
rctx = EVP_RAND_CTX_new(rand, NULL);
EVP_RAND_free(rand);

*p++ = OSSL_PARAM_construct_utf8_string(OSSL_DRBG_PARAM_CIPHER,
                                        SN_aes_256_ctr, 0);
*p = OSSL_PARAM_construct_end();
EVP_RAND_instantiate(rctx, strength, 0, NULL, 0, params);

EVP_RAND_generate(rctx, bytes, sizeof(bytes), strength, 0, NULL, 0);

EVP_RAND_CTX_free(rctx);

```

## CONFORMING TO


NIST SP 800-90A and SP 800-90B

## SEE ALSO


EVP_RAND(3),
EVP_RAND(3)/PARAMETERS

## COPYRIGHT


Copyright 2020-2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_RAND-CTR-DRBG.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_RAND-CTR-DRBG.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_RAND-CTR-DRBG.pod`；SHA-256：`14e2ee76b3f0a419d8c359fe2975a0aa148b32c66439bc8aab7d68cb07850236`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
