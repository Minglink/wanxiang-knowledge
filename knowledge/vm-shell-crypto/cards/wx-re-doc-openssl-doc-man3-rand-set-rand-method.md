---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-rand-set-rand-method",
  "title": "OpenSSL：密码随机数 · RAND_set_rand_method（man3）",
  "type": "note",
  "tags": [
    "随机数",
    "熵源",
    "密钥生成",
    "openssl",
    "RAND_set_rand_method"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "e8c34a8396084d47d45fcd20a88ff4a728b760f5e31458ac0af77d6f0beb0fdd",
  "generatedHash": "2c8421a0ce9820907d407a598ba95a2518509389e34979899793f5a76b165bd9",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码随机数：RAND_set_rand_method, RAND_get_rand_method, RAND_OpenSSL - select RAND method",
  "l1": "All of the functions described on this page are deprecated. Applications should instead use RAND_set_DRBG_type(3), EVP_RAND(3) and EVP_RAND(7). A **RAND_METHOD** specifies the functions that OpenSSL uses for random number generation. RAND_OpenSSL() returns the default **RAND_METHOD** implementation by OpenSSL. This implementation ensures that the PRNG state is unique for each thread. If an **ENGINE** is loaded that provides the RAND API, however, it will be used instead of the method returned by RAND_OpenSSL(). This is deprecated in OpenSSL 3.0. RAND_set_rand_method() makes **meth** the method for PRNG use. If an ENGINE was providing the method, it will be released first. RAND_get_rand_method() returns a pointer to the current **RAND_METHOD**.",
  "questions": [
    "RAND_set_rand_method 如何用于密码随机数？",
    "RAND_set_rand_method 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-rand-set-rand-method",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/RAND_set_rand_method.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码随机数 · RAND_set_rand_method（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码随机数。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

RAND_set_rand_method, RAND_get_rand_method, RAND_OpenSSL - select RAND method

## 技术正文

## NAME


RAND_set_rand_method, RAND_get_rand_method, RAND_OpenSSL - select RAND method

## SYNOPSIS


```c
#include <openssl/rand.h>

```

The following functions have been deprecated since OpenSSL 3.0, and can be
hidden entirely by defining **OPENSSL_API_COMPAT** with a suitable version value,
see openssl_user_macros(7):

```c
RAND_METHOD *RAND_OpenSSL(void);

int RAND_set_rand_method(const RAND_METHOD *meth);

const RAND_METHOD *RAND_get_rand_method(void);

```

## DESCRIPTION


All of the functions described on this page are deprecated.
Applications should instead use RAND_set_DRBG_type(3),
EVP_RAND(3) and EVP_RAND(7).

A **RAND_METHOD** specifies the functions that OpenSSL uses for random number
generation.

RAND_OpenSSL() returns the default **RAND_METHOD** implementation by OpenSSL.
This implementation ensures that the PRNG state is unique for each thread.

If an **ENGINE** is loaded that provides the RAND API, however, it will
be used instead of the method returned by RAND_OpenSSL().  This is deprecated
in OpenSSL 3.0.

RAND_set_rand_method() makes **meth** the method for PRNG use.  If an
ENGINE was providing the method, it will be released first.

RAND_get_rand_method() returns a pointer to the current **RAND_METHOD**.

## THE RAND_METHOD STRUCTURE


```c
typedef struct rand_meth_st {
    int (*seed)(const void *buf, int num);
    int (*bytes)(unsigned char *buf, int num);
    void (*cleanup)(void);
    int (*add)(const void *buf, int num, double entropy);
    int (*pseudorand)(unsigned char *buf, int num);
    int (*status)(void);
} RAND_METHOD;

```

The fields point to functions that are used by, in order,
RAND_seed(), RAND_bytes(), internal RAND cleanup, RAND_add(), RAND_pseudo_rand()
and RAND_status().
Each pointer may be NULL if the function is not implemented.

## RETURN VALUES


RAND_set_rand_method() returns 1 on success and 0 on failure.
RAND_get_rand_method() and RAND_OpenSSL() return pointers to the respective
methods.

## SEE ALSO


EVP_RAND(3),
RAND_set_DRBG_type(3),
RAND_bytes(3),
ENGINE_by_id(3),
EVP_RAND(7),
RAND(7)

## HISTORY


All of these functions were deprecated in OpenSSL 3.0.

## COPYRIGHT


Copyright 2000-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/RAND_set_rand_method.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/RAND_set_rand_method.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/RAND_set_rand_method.pod`；SHA-256：`e8c34a8396084d47d45fcd20a88ff4a728b760f5e31458ac0af77d6f0beb0fdd`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
