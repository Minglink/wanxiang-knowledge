---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-rand-hmac-drbg",
  "title": "OpenSSL：密码随机数 · EVP_RAND-HMAC-DRBG（man7）",
  "type": "note",
  "tags": [
    "随机数",
    "熵源",
    "DRBG",
    "openssl",
    "EVP_RAND-HMAC-DRBG",
    "HMAC消息认证"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "e9d0908364a1558cedee1c0afaa32ad2d3801166607970f70223084a13192363",
  "generatedHash": "1d689a514fb13ecb16db095284f8849f0dc6d6f1ae7b7ce2da8d82d03a85f9c9",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码随机数：EVP_RAND-HMAC-DRBG - The HMAC DRBG EVP_RAND implementation",
  "l1": "Support for the HMAC deterministic random bit generator through the **EVP_RAND** API. \"HMAC-DRBG\" is the name for this implementation; it can be used with the EVP_RAND_fetch() function. The supported parameters are: These parameters work as described in EVP_RAND(3)/PARAMETERS. These parameters work as described in provider-rand(7)/PARAMETERS. ",
  "questions": [
    "EVP_RAND-HMAC-DRBG 如何用于密码随机数？",
    "EVP_RAND-HMAC-DRBG 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-focus-crypto-hmac-layers",
      "kind": "机制参照"
    }
  ],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-rand-hmac-drbg",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_RAND-HMAC-DRBG.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码随机数 · EVP_RAND-HMAC-DRBG（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码随机数。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_RAND-HMAC-DRBG - The HMAC DRBG EVP_RAND implementation

## 技术正文

## NAME


EVP_RAND-HMAC-DRBG - The HMAC DRBG EVP_RAND implementation

## DESCRIPTION


Support for the HMAC deterministic random bit generator through the
**EVP_RAND** API.

### Identity


"HMAC-DRBG" is the name for this implementation; it can be used with the
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

- "mac" (**OSSL_DRBG_PARAM_MAC**) <UTF8 string>

- "digest" (**OSSL_DRBG_PARAM_DIGEST**) <UTF8 string>

These parameters work as described in EVP_RAND(3)/PARAMETERS.

- "fips-indicator" (**OSSL_DRBG_PARAM_FIPS_APPROVED_INDICATOR**) <integer>

- "digest-check" (**OSSL_DRBG_PARAM_FIPS_DIGEST_CHECK**) <integer>

These parameters work as described in provider-rand(7)/PARAMETERS.


## NOTES


When using the FIPS provider, only these digests are permitted (as per
FIPS 140-3 IG D.R):

The default HMAC-DRBG implementation attempts to fetch the required internal
algorithms from the provider they are built into (eg the default provider)
regardless of the properties provided. Should the provider not implement
the required algorithms then properties will be used to find a different
implementation.


- SHA-1

- SHA2-256

- SHA2-512

- SHA3-256

- SHA3-512


A context for HMAC DRBG can be obtained by calling:

```c
EVP_RAND *rand = EVP_RAND_fetch(NULL, "HMAC-DRBG", NULL);
EVP_RAND_CTX *rctx = EVP_RAND_CTX_new(rand, NULL);

```

## EXAMPLES


```c
EVP_RAND *rand;
EVP_RAND_CTX *rctx;
unsigned char bytes[100];
OSSL_PARAM params[3], *p = params;
unsigned int strength = 128;

rand = EVP_RAND_fetch(NULL, "HMAC-DRBG", NULL);
rctx = EVP_RAND_CTX_new(rand, NULL);
EVP_RAND_free(rand);

*p++ = OSSL_PARAM_construct_utf8_string(OSSL_DRBG_PARAM_MAC, SN_hmac, 0);
*p++ = OSSL_PARAM_construct_utf8_string(OSSL_DRBG_PARAM_DIGEST, SN_sha256, 0);
*p = OSSL_PARAM_construct_end();
EVP_RAND_instantiate(rctx, strength, 0, NULL, 0, params);

EVP_RAND_generate(rctx, bytes, sizeof(bytes), strength, 0, NULL, 0);

EVP_RAND_CTX_free(rctx);

```

## CONFORMING TO


NIST SP 800-90A and SP 800-90B

## SEE ALSO


EVP_RAND(3),
EVP_RAND(3)/PARAMETERS,
openssl-fipsinstall(1)


## HISTORY


OpenSSL 3.1.1 introduced the **-no_drbg_truncated_digests** option to
fipsinstall which restricts the permitted digests when using the FIPS
provider in a complaint manner.  For details refer to
FIPS 140-3 IG D.R).

## COPYRIGHT


Copyright 2020-2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_RAND-HMAC-DRBG.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_RAND-HMAC-DRBG.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_RAND-HMAC-DRBG.pod`；SHA-256：`e9d0908364a1558cedee1c0afaa32ad2d3801166607970f70223084a13192363`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
