---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-rand-jitter",
  "title": "OpenSSL：密码随机数 · EVP_RAND-JITTER（man7）",
  "type": "note",
  "tags": [
    "随机数",
    "熵源",
    "DRBG",
    "openssl",
    "EVP_RAND-JITTER"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "3212c9eeff872fd56efda377bcd0edf19cdae3b5b387364bd3b300cbc8c0e86e",
  "generatedHash": "92b1a63d26e3a61a82f0dd46026b85a1709654341e95040659db510144c99294",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码随机数：EVP_RAND-JITTER - The randomness seed source EVP_RAND implementation",
  "l1": "Support for deterministic random number generator seeding through the **EVP_RAND** API. This software seed source produces randomness based on tiny CPU \"jitter\" fluctuations. It is available when OpenSSL is compiled with **enable-jitter** option. When available it is listed in **openssl list -random-generators** and **openssl info -seeds**. \"JITTER\" is the name for this implementation; it can be used with the EVP_RAND_fetch() function. The supported parameters are: These parameters work as described in EVP_RAND(3)/PARAMETERS. ",
  "questions": [
    "EVP_RAND-JITTER 如何用于密码随机数？",
    "EVP_RAND-JITTER 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-focus-vm-jit-cache",
      "kind": "机制参照"
    }
  ],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-rand-jitter",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_RAND-JITTER.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码随机数 · EVP_RAND-JITTER（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码随机数。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_RAND-JITTER - The randomness seed source EVP_RAND implementation

## 技术正文

## NAME


EVP_RAND-JITTER - The randomness seed source EVP_RAND implementation

## DESCRIPTION


Support for deterministic random number generator seeding through the
**EVP_RAND** API.

This software seed source produces randomness based on tiny CPU
"jitter" fluctuations.

It is available when OpenSSL is compiled with **enable-jitter**
option. When available it is listed in B<openssl list
-random-generators> and **openssl info -seeds**.

### Identity


"JITTER" is the name for this implementation; it can be used with the
EVP_RAND_fetch() function.

### Supported parameters


The supported parameters are:


- "state" (**OSSL_RAND_PARAM_STATE**) <integer>

- "strength" (**OSSL_RAND_PARAM_STRENGTH**) <unsigned integer>

- "max_request" (**OSSL_RAND_PARAM_MAX_REQUEST**) <unsigned integer>

These parameters work as described in EVP_RAND(3)/PARAMETERS.


## NOTES


A context for the seed source can be obtained by calling:

```c
EVP_RAND *rand = EVP_RAND_fetch(NULL, "JITTER", NULL);
EVP_RAND_CTX *rctx = EVP_RAND_CTX_new(rand, NULL);

```

The **enable-jitter** option was added in OpenSSL 3.4.

By specifying the **enable-fips-jitter** configuration option, the FIPS
provider will use an internal jitter source for its entropy.  Enabling
this option will cause the FIPS provider to operate in a non-compliant
mode unless an entropy assessment
ESV
and validation through the
CMVP
are additionally conducted.  This option was added in OpenSSL 3.5.

## EXAMPLES


```c
EVP_RAND *rand;
EVP_RAND_CTX *seed, *rctx;
unsigned char bytes[100];
OSSL_PARAM params[2], *p = params;
unsigned int strength = 128;

/* Create and instantiate a seed source */
rand = EVP_RAND_fetch(NULL, "JITTER", NULL);
seed = EVP_RAND_CTX_new(rand, NULL);
EVP_RAND_instantiate(seed, strength, 0, NULL, 0, NULL);
EVP_RAND_free(rand);

/* Feed this into a DRBG */
rand = EVP_RAND_fetch(NULL, "CTR-DRBG", NULL);
rctx = EVP_RAND_CTX_new(rand, seed);
EVP_RAND_free(rand);

/* Configure the DRBG */
*p++ = OSSL_PARAM_construct_utf8_string(OSSL_DRBG_PARAM_CIPHER,
                                        SN_aes_256_ctr, 0);
*p = OSSL_PARAM_construct_end();
EVP_RAND_instantiate(rctx, strength, 0, NULL, 0, params);

EVP_RAND_generate(rctx, bytes, sizeof(bytes), strength, 0, NULL, 0);

EVP_RAND_CTX_free(rctx);
EVP_RAND_CTX_free(seed);

```

## SEE ALSO


EVP_RAND(3),
EVP_RAND(3)/PARAMETERS

## COPYRIGHT


Copyright 2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_RAND-JITTER.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_RAND-JITTER.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_RAND-JITTER.pod`；SHA-256：`3212c9eeff872fd56efda377bcd0edf19cdae3b5b387364bd3b300cbc8c0e86e`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
