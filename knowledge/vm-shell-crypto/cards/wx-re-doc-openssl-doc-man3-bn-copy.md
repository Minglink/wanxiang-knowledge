---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bn-copy",
  "title": "OpenSSL：大整数运算 · BN_copy（man3）",
  "type": "note",
  "tags": [
    "大整数",
    "模运算",
    "密码实现",
    "openssl",
    "BN_copy"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "8645571da1038a12a1b2833c30a860ba8ce57ddf2085e5c32937ce5d3453d33e",
  "generatedHash": "ba160ed79497c790a16e529ce86e1e3b692aa27d464a37f97df042702ce4c0e1",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "大整数运算：BN_copy, BN_dup, BN_with_flags - copy BIGNUMs",
  "l1": "BN_copy() copies **from** to **to**. BN_dup() creates a new **BIGNUM** containing the value **from**. BN_with_flags creates a **temporary** shallow copy of **b** in **dest**. It places significant restrictions on the copied data. Applications that do no adhere to these restrictions may encounter unexpected side effects or crashes. For that reason use of this function is discouraged. Any flags provided in **flags** will be set in **dest** in addition to any flags already set in **b**. For example this might commonly be used to create a temporary copy of a BIGNUM with the **BN_FLG_CONSTTIME** flag set for constant time operations. The temporary copy in **dest** will share some internal state with **b**. For this reason the following restrictions apply to the use of **dest**: **dest** should be a newly allocated BIGNUM obtained via a call to",
  "questions": [
    "BN_copy 如何用于大整数运算？",
    "BN_copy 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bn-copy",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BN_copy.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：大整数运算 · BN_copy（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：大整数运算。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BN_copy, BN_dup, BN_with_flags - copy BIGNUMs

## 技术正文

## NAME


BN_copy, BN_dup, BN_with_flags - copy BIGNUMs

## SYNOPSIS


```c
#include <openssl/bn.h>

BIGNUM *BN_copy(BIGNUM *to, const BIGNUM *from);

BIGNUM *BN_dup(const BIGNUM *from);

void BN_with_flags(BIGNUM *dest, const BIGNUM *b, int flags);

```

## DESCRIPTION


BN_copy() copies **from** to **to**. BN_dup() creates a new **BIGNUM**
containing the value **from**.

BN_with_flags creates a **temporary** shallow copy of **b** in **dest**. It places
significant restrictions on the copied data. Applications that do no adhere to
these restrictions may encounter unexpected side effects or crashes. For that
reason use of this function is discouraged. Any flags provided in **flags** will
be set in **dest** in addition to any flags already set in **b**. For example this
might commonly be used to create a temporary copy of a BIGNUM with the
**BN_FLG_CONSTTIME** flag set for constant time operations. The temporary copy in
**dest** will share some internal state with **b**. For this reason the following
restrictions apply to the use of **dest**:


- *

**dest** should be a newly allocated BIGNUM obtained via a call to BN_new(). It
should not have been used for other purposes or initialised in any way.

- *

**dest** must only be used in "read-only" operations, i.e. typically those
functions where the relevant parameter is declared "const".

- *

**dest** must be used and freed before any further subsequent use of **b**


## RETURN VALUES


BN_copy() returns **to** on success, NULL on error. BN_dup() returns
the new **BIGNUM**, and NULL on error. The error codes can be obtained
by ERR_get_error(3).

## SEE ALSO


ERR_get_error(3)

## COPYRIGHT


Copyright 2000-2017 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BN_copy.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BN_copy.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BN_copy.pod`；SHA-256：`8645571da1038a12a1b2833c30a860ba8ce57ddf2085e5c32937ce5d3453d33e`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
