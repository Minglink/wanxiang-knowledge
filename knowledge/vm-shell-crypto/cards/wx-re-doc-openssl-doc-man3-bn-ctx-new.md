---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bn-ctx-new",
  "title": "OpenSSL：大整数运算 · BN_CTX_new（man3）",
  "type": "note",
  "tags": [
    "大整数",
    "模运算",
    "密码实现",
    "openssl",
    "BN_CTX_new"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "97dfec6da18f7ad324a490ad0804420b4b557aaa72fcce3f31060dfccbf3e87a",
  "generatedHash": "31ea3f420944fb07bdd7d7f6d12cf39b451bbd392ebb44a85397aee26d1e0f77",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "大整数运算：BN_CTX_new_ex, BN_CTX_new, BN_CTX_secure_new_ex, BN_CTX_secure_new, BN_CTX_free - allocate and free BN_CTX structures",
  "l1": "A **BN_CTX** is a structure that holds **BIGNUM** temporary variables used by library functions. Since dynamic memory allocation to create **BIGNUM**s is rather expensive when used in conjunction with repeated subroutine calls, the **BN_CTX** structure is used. BN_CTX_new_ex() allocates and initializes a **BN_CTX** structure for the given library context **ctx**. The <ctx> value may be NULL in which case the default library context will be used. BN_CTX_new() is the same as BN_CTX_new_ex() except that the default library context is always used. BN_CTX_secure_new_ex() allocates and initializes a **BN_CTX** structure but uses the secure heap (see CRYPTO_secure_malloc(3)) to hold the **BIGNUM**s for the given library context **ctx**. The <ctx> value may be NULL in which case the default library context will be used. BN_CTX_secure_new() is the",
  "questions": [
    "BN_CTX_new 如何用于大整数运算？",
    "BN_CTX_new 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bn-ctx-new",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BN_CTX_new.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：大整数运算 · BN_CTX_new（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：大整数运算。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BN_CTX_new_ex, BN_CTX_new, BN_CTX_secure_new_ex, BN_CTX_secure_new, BN_CTX_free
- allocate and free BN_CTX structures

## 技术正文

## NAME


BN_CTX_new_ex, BN_CTX_new, BN_CTX_secure_new_ex, BN_CTX_secure_new, BN_CTX_free
- allocate and free BN_CTX structures

## SYNOPSIS


```c
#include <openssl/bn.h>

BN_CTX *BN_CTX_new_ex(OSSL_LIB_CTX *ctx);
BN_CTX *BN_CTX_new(void);

BN_CTX *BN_CTX_secure_new_ex(OSSL_LIB_CTX *ctx);
BN_CTX *BN_CTX_secure_new(void);

void BN_CTX_free(BN_CTX *c);

```

## DESCRIPTION


A **BN_CTX** is a structure that holds **BIGNUM** temporary variables used by
library functions. Since dynamic memory allocation to create **BIGNUM**s
is rather expensive when used in conjunction with repeated subroutine
calls, the **BN_CTX** structure is used.

BN_CTX_new_ex() allocates and initializes a **BN_CTX** structure for the given
library context **ctx**. The <ctx> value may be NULL in which case the default
library context will be used. BN_CTX_new() is the same as BN_CTX_new_ex() except
that the default library context is always used.

BN_CTX_secure_new_ex() allocates and initializes a **BN_CTX** structure
but uses the secure heap (see CRYPTO_secure_malloc(3)) to hold the
**BIGNUM**s for the given library context **ctx**. The <ctx> value may be NULL in
which case the default library context will be used. BN_CTX_secure_new() is the
same as BN_CTX_secure_new_ex() except that the default library context is always
used.

BN_CTX_free() frees the components of the **BN_CTX** and the structure itself.
Since BN_CTX_start() is required in order to obtain **BIGNUM**s from the
**BN_CTX**, in most cases BN_CTX_end() must be called before the **BN_CTX** may
be freed by BN_CTX_free().  If **c** is NULL, nothing is done.

A given **BN_CTX** must only be used by a single thread of execution.  No
locking is performed, and the internal pool allocator will not properly handle
multiple threads of execution.

## RETURN VALUES


BN_CTX_new() and BN_CTX_secure_new() return a pointer to the **BN_CTX**.
If the allocation fails,
they return **NULL** and sets an error code that can be obtained by
ERR_get_error(3).

BN_CTX_free() has no return values.

## REMOVED FUNCTIONALITY


```c
void BN_CTX_init(BN_CTX *c);

```

BN_CTX_init() is no longer available as of OpenSSL 1.1.0. Applications should
replace use of BN_CTX_init with BN_CTX_new instead:

```c
BN_CTX *ctx;
ctx = BN_CTX_new();
if (!ctx)
    /* error */
...
BN_CTX_free(ctx);

```

## SEE ALSO


ERR_get_error(3), BN_add(3),
BN_CTX_start(3)

## HISTORY


BN_CTX_init() was removed in OpenSSL 1.1.0.

## COPYRIGHT


Copyright 2000-2020 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BN_CTX_new.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BN_CTX_new.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BN_CTX_new.pod`；SHA-256：`97dfec6da18f7ad324a490ad0804420b4b557aaa72fcce3f31060dfccbf3e87a`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
