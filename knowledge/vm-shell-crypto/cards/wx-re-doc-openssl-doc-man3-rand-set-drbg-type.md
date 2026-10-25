---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-rand-set-drbg-type",
  "title": "OpenSSL：密码随机数 · RAND_set_DRBG_type（man3）",
  "type": "note",
  "tags": [
    "随机数",
    "熵源",
    "密钥生成",
    "openssl",
    "RAND_set_DRBG_type"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "e917434b6851301f5d5d4db9400f9bced7e8a41c20747e8528386a2a0e085930",
  "generatedHash": "d1b9f9af699179baaa0953b22af48447aeda326164c1780373844d94f60c1f0e",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码随机数：RAND_set_DRBG_type, RAND_set_seed_source_type - specify the global random number generator types",
  "l1": "RAND_set_DRBG_type() specifies the random bit generator that will be used within the library context `ctx`. A generator of name `drbg` with properties `propq` will be fetched. It will be instantiated with either `cipher` or `digest` as its underlying cryptographic algorithm. This specifies the type that will be used for the primary, public and private random instances. RAND_set_seed_source_type() specifies the seed source that will be used within the library context `ctx`. The seed source of name `seed` with properties `propq` will be fetched and used to seed the primary random bit generator.",
  "questions": [
    "RAND_set_DRBG_type 如何用于密码随机数？",
    "RAND_set_DRBG_type 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-rand-set-drbg-type",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/RAND_set_DRBG_type.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码随机数 · RAND_set_DRBG_type（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码随机数。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

RAND_set_DRBG_type,
RAND_set_seed_source_type
- specify the global random number generator types

## 技术正文

## NAME


RAND_set_DRBG_type,
RAND_set_seed_source_type
- specify the global random number generator types

## SYNOPSIS


```c
#include <openssl/rand.h>

int RAND_set_DRBG_type(OSSL_LIB_CTX *ctx, const char *drbg, const char *propq,
                       const char *cipher, const char *digest);
int RAND_set_seed_source_type(OSSL_LIB_CTX *ctx, const char *seed,
                              const char *propq);

```

## DESCRIPTION


RAND_set_DRBG_type() specifies the random bit generator that will be
used within the library context `ctx`.  A generator of name `drbg`
with properties `propq` will be fetched.  It will be instantiated with
either `cipher` or `digest` as its underlying cryptographic algorithm.
This specifies the type that will be used for the primary, public and
private random instances.

RAND_set_seed_source_type() specifies the seed source that will be used
within the library context `ctx`.  The seed source of name `seed`
with properties `propq` will be fetched and used to seed the primary
random bit generator.

## RETURN VALUES


These function return 1 on success and 0 on failure.

## NOTES


These functions must be called before the random bit generators are first
created in the library context.  They will return an error if the call
is made too late.

The default DRBG is "CTR-DRBG" using the "AES-256-CTR" cipher.

The default seed source can be configured when OpenSSL is compiled by
setting **-DOPENSSL_DEFAULT_SEED_SRC=SEED-SRC**. If not set then
"SEED-SRC" is used.

## EXAMPLES


```c
unsigned char bytes[100];
RAND_set_seed_source_type(NULL, "JITTER", NULL);
RAND_bytes(bytes, 100);

```

## SEE ALSO


EVP_RAND(3),
RAND_get0_primary(3)

## HISTORY


These functions were added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2021-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/RAND_set_DRBG_type.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/RAND_set_DRBG_type.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/RAND_set_DRBG_type.pod`；SHA-256：`e917434b6851301f5d5d4db9400f9bced7e8a41c20747e8528386a2a0e085930`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
