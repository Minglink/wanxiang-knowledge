---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bn-ctx-start",
  "title": "OpenSSL：大整数运算 · BN_CTX_start（man3）",
  "type": "note",
  "tags": [
    "大整数",
    "模运算",
    "密码实现",
    "openssl",
    "BN_CTX_start"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "5f9cfeaa748ac3186180958bee3ba70f9ea09d323633d7969431509bcec5b797",
  "generatedHash": "002202b555216f5b1773f002bae64fb03aa69d44ead157f1ae1e204244961d17",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "大整数运算：BN_CTX_start, BN_CTX_get, BN_CTX_end - use temporary BIGNUM variables",
  "l1": "These functions are used to obtain temporary **BIGNUM** variables from a **BN_CTX** (which can been created by using BN_CTX_new(3)) in order to save the overhead of repeatedly creating and freeing **BIGNUM**s in functions that are called from inside a loop. A function must call BN_CTX_start() first. Then, BN_CTX_get() may be called repeatedly to obtain temporary **BIGNUM**s. All BN_CTX_get() calls must be made before calling any other functions that use the **ctx** as an argument. Finally, BN_CTX_end() must be called before returning from the function. If **ctx** is NULL, nothing is done. When BN_CTX_end() is called, the **BIGNUM** pointers obtained from BN_CTX_get() become invalid.",
  "questions": [
    "BN_CTX_start 如何用于大整数运算？",
    "BN_CTX_start 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bn-ctx-start",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BN_CTX_start.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：大整数运算 · BN_CTX_start（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：大整数运算。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BN_CTX_start, BN_CTX_get, BN_CTX_end - use temporary BIGNUM variables

## 技术正文

## NAME


BN_CTX_start, BN_CTX_get, BN_CTX_end - use temporary BIGNUM variables

## SYNOPSIS


```c
#include <openssl/bn.h>

void BN_CTX_start(BN_CTX *ctx);

BIGNUM *BN_CTX_get(BN_CTX *ctx);

void BN_CTX_end(BN_CTX *ctx);

```

## DESCRIPTION


These functions are used to obtain temporary **BIGNUM** variables from
a **BN_CTX** (which can been created by using BN_CTX_new(3))
in order to save the overhead of repeatedly creating and
freeing **BIGNUM**s in functions that are called from inside a loop.

A function must call BN_CTX_start() first. Then, BN_CTX_get() may be
called repeatedly to obtain temporary **BIGNUM**s. All BN_CTX_get()
calls must be made before calling any other functions that use the
**ctx** as an argument.

Finally, BN_CTX_end() must be called before returning from the function.
If **ctx** is NULL, nothing is done.
When BN_CTX_end() is called, the **BIGNUM** pointers obtained from
BN_CTX_get() become invalid.

## RETURN VALUES


BN_CTX_start() and BN_CTX_end() return no values.

BN_CTX_get() returns a pointer to the **BIGNUM**, or **NULL** on error.
Once BN_CTX_get() has failed, the subsequent calls will return **NULL**
as well, so it is sufficient to check the return value of the last
BN_CTX_get() call. In case of an error, an error code is set, which
can be obtained by ERR_get_error(3).


## SEE ALSO


BN_CTX_new(3)

## COPYRIGHT


Copyright 2000-2016 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BN_CTX_start.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BN_CTX_start.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BN_CTX_start.pod`；SHA-256：`5f9cfeaa748ac3186180958bee3ba70f9ea09d323633d7969431509bcec5b797`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
