---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-rand-seed-src",
  "title": "OpenSSL：密码随机数 · EVP_RAND-SEED-SRC（man7）",
  "type": "note",
  "tags": [
    "随机数",
    "熵源",
    "DRBG",
    "openssl",
    "EVP_RAND-SEED-SRC"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "c0e2a43c04969e68da6e4f17c5c163499a9066c9d4875a4ebf6df2e574177cba",
  "generatedHash": "0783d97e5c56507b81c994d4cadad733a57bc33c82b104bd2d2075580ce55e09",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码随机数：EVP_RAND-SEED-SRC - The randomness seed source EVP_RAND implementation",
  "l1": "Support for deterministic random number generator seeding through the **EVP_RAND** API. The seed sources used are specified at the time OpenSSL is configured for building using the **--with-rand-seed=** option. By default, operating system randomness sources are used. \"SEED-SRC\" is the name for this implementation; it can be used with the EVP_RAND_fetch() function. The supported parameters are: These parameters work as described in EVP_RAND(3)/PARAMETERS. ",
  "questions": [
    "EVP_RAND-SEED-SRC 如何用于密码随机数？",
    "EVP_RAND-SEED-SRC 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-rand-seed-src",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_RAND-SEED-SRC.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码随机数 · EVP_RAND-SEED-SRC（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码随机数。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_RAND-SEED-SRC - The randomness seed source EVP_RAND implementation

## 技术正文

## NAME


EVP_RAND-SEED-SRC - The randomness seed source EVP_RAND implementation

## DESCRIPTION


Support for deterministic random number generator seeding through the
**EVP_RAND** API.

The seed sources used are specified at the time OpenSSL is configured for
building using the **--with-rand-seed=** option.  By default, operating system
randomness sources are used.

### Identity


"SEED-SRC" is the name for this implementation; it can be used with the
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
EVP_RAND *rand = EVP_RAND_fetch(NULL, "SEED-SRC", NULL);
EVP_RAND_CTX *rctx = EVP_RAND_CTX_new(rand, NULL);

```

## EXAMPLES


```c
EVP_RAND *rand;
EVP_RAND_CTX *seed, *rctx;
unsigned char bytes[100];
OSSL_PARAM params[2], *p = params;
unsigned int strength = 128;

/* Create and instantiate a seed source */
rand = EVP_RAND_fetch(NULL, "SEED-SRC", NULL);
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


Copyright 2020-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_RAND-SEED-SRC.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_RAND-SEED-SRC.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_RAND-SEED-SRC.pod`；SHA-256：`c0e2a43c04969e68da6e4f17c5c163499a9066c9d4875a4ebf6df2e574177cba`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
