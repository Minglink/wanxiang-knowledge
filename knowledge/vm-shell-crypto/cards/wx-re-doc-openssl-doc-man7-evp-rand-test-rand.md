---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-rand-test-rand",
  "title": "OpenSSL：密码随机数 · EVP_RAND-TEST-RAND（man7）",
  "type": "note",
  "tags": [
    "随机数",
    "熵源",
    "DRBG",
    "openssl",
    "EVP_RAND-TEST-RAND"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "954ee5894d86c2ee2ba24d3a5019ef6296131fe51ee83de5c210017a1ac26254",
  "generatedHash": "0e3da062dda0b03b9fe28501c39f464425cd1b87b51cdcc1ff0b139b10e3b6df",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码随机数：EVP_RAND-TEST-RAND - The test EVP_RAND implementation",
  "l1": "Support for a test generator through the **EVP_RAND** API. This generator is for test purposes only, it does not generate random numbers. \"TEST-RAND\" is the name for this implementation; it can be used with the EVP_RAND_fetch() function. The supported parameters are: These parameter works as described in EVP_RAND(3)/PARAMETERS. These parameters work as described in EVP_RAND(3)/PARAMETERS, except that they can all be set as well as read. Sets the bytes returned when the test generator is sent an entropy request. The current position is remembered across generate calls. If there are insufficient data present to satisfy a call, an error is returned. Sets the bytes returned when the test generator is sent a nonce request. Each nonce request will return all of the bytes. If this parameter is zero, it will only emit the nonce and entropy data s",
  "questions": [
    "EVP_RAND-TEST-RAND 如何用于密码随机数？",
    "EVP_RAND-TEST-RAND 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-rand-test-rand",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_RAND-TEST-RAND.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码随机数 · EVP_RAND-TEST-RAND（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码随机数。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_RAND-TEST-RAND - The test EVP_RAND implementation

## 技术正文

## NAME


EVP_RAND-TEST-RAND - The test EVP_RAND implementation

## DESCRIPTION


Support for a test generator through the **EVP_RAND** API. This generator is
for test purposes only, it does not generate random numbers.

### Identity


"TEST-RAND" is the name for this implementation; it can be used with the
EVP_RAND_fetch() function.

### Supported parameters


The supported parameters are:


- "state" (**OSSL_RAND_PARAM_STATE**) <integer>

- "fips-indicator" (**OSSL_RAND_PARAM_FIPS_APPROVED_INDICATOR**) <integer>

These parameter works as described in EVP_RAND(3)/PARAMETERS.

- "strength" (**OSSL_RAND_PARAM_STRENGTH**) <unsigned integer>

- "reseed_requests" (**OSSL_DRBG_PARAM_RESEED_REQUESTS**) <unsigned integer>

- "reseed_time_interval" (**OSSL_DRBG_PARAM_RESEED_TIME_INTERVAL**) <integer>

- "max_request" (**OSSL_DRBG_PARAM_RESEED_REQUESTS**) <unsigned integer>

- "min_entropylen" (**OSSL_DRBG_PARAM_MIN_ENTROPYLEN**) <unsigned integer>

- "max_entropylen" (**OSSL_DRBG_PARAM_MAX_ENTROPYLEN**) <unsigned integer>

- "min_noncelen" (**OSSL_DRBG_PARAM_MIN_NONCELEN**) <unsigned integer>

- "max_noncelen" (**OSSL_DRBG_PARAM_MAX_NONCELEN**) <unsigned integer>

- "max_perslen" (**OSSL_DRBG_PARAM_MAX_PERSLEN**) <unsigned integer>

- "max_adinlen" (**OSSL_DRBG_PARAM_MAX_ADINLEN**) <unsigned integer>

- "reseed_counter" (**OSSL_DRBG_PARAM_RESEED_COUNTER**) <unsigned integer>

These parameters work as described in EVP_RAND(3)/PARAMETERS, except that
they can all be set as well as read.

- "test_entropy" (**OSSL_RAND_PARAM_TEST_ENTROPY**) <octet string>

Sets the bytes returned when the test generator is sent an entropy request.
The current position is remembered across generate calls.
If there are insufficient data present to satisfy a call, an error is returned.

- "test_nonce" (**OSSL_RAND_PARAM_TEST_NONCE**) <octet string>

Sets the bytes returned when the test generator is sent a nonce request.
Each nonce request will return all of the bytes.

- "generate" (**OSSL_RAND_PARAM_GENERATE**) <integer>

If this parameter is zero, it will only emit the nonce and entropy data
supplied via the aforementioned parameters.  Otherwise, low quality
non-cryptographic pseudorandom output is produced.  This parameter defaults
to zero.


## NOTES


A context for a test generator can be obtained by calling:

```c
EVP_RAND *rand = EVP_RAND_fetch(NULL, "TEST-RAND", NULL);
EVP_RAND_CTX *rctx = EVP_RAND_CTX_new(rand, NULL);

```

## EXAMPLES


```c
EVP_RAND *rand;
EVP_RAND_CTX *rctx;
unsigned char bytes[100];
OSSL_PARAM params[4], *p = params;
unsigned char entropy[1000] = { ... };
unsigned char nonce[20] = { ... };
unsigned int strength = 48;

rand = EVP_RAND_fetch(NULL, "TEST-RAND", NULL);
rctx = EVP_RAND_CTX_new(rand, NULL);
EVP_RAND_free(rand);

*p++ = OSSL_PARAM_construct_uint(OSSL_RAND_PARAM_STRENGTH, &strength);
*p++ = OSSL_PARAM_construct_octet_string(OSSL_RAND_PARAM_TEST_ENTROPY,
                                         entropy, sizeof(entropy));
*p++ = OSSL_PARAM_construct_octet_string(OSSL_RAND_PARAM_TEST_NONCE,
                                         nonce, sizeof(nonce));
*p = OSSL_PARAM_construct_end();
EVP_RAND_instantiate(rctx, strength, 0, NULL, 0, params);

EVP_RAND_generate(rctx, bytes, sizeof(bytes), strength, 0, NULL, 0);

EVP_RAND_CTX_free(rctx);

```

## SEE ALSO


EVP_RAND(3),
EVP_RAND(3)/PARAMETERS

## HISTORY


This functionality was added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2020-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_RAND-TEST-RAND.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_RAND-TEST-RAND.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_RAND-TEST-RAND.pod`；SHA-256：`954ee5894d86c2ee2ba24d3a5019ef6296131fe51ee83de5c210017a1ac26254`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
