---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bio-new",
  "title": "OpenSSL：密码数据流 · BIO_new（man3）",
  "type": "note",
  "tags": [
    "BIO",
    "输入输出",
    "缓冲区",
    "openssl",
    "BIO_new"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "b7e7defad0827bccacf428ef46c9bf25e8489859872008f8e4647820909c1087",
  "generatedHash": "50f8bb90015e1c5390ad7681243db5d2a70e2b3dfd30c2f25c3eb09ddd7513bc",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码数据流：BIO_new_ex, BIO_new, BIO_up_ref, BIO_free, BIO_vfree, BIO_free_all - BIO allocation and freeing functions",
  "l1": "The BIO_new_ex() function returns a new BIO using method **type** associated with the library context `libctx` (see OSSL_LIB_CTX(3)). The library context may be NULL to indicate the default library context. `type` **MUST NOT** be NULL. The BIO_new() is the same as BIO_new_ex() except the default library context is always used. BIO_up_ref() increments the reference count associated with the BIO object. BIO_free() frees up a single BIO, BIO_vfree() also frees up a single BIO but it does not return a value. If **a** is NULL nothing is done. Calling BIO_free() may also have some effect on the underlying I/O structure, for example it may close the file being referred to under certain circumstances. For more details see the individual BIO_METHOD descriptions. BIO_free_all() frees up an entire BIO chain, it does not halt if an error occurs freei",
  "questions": [
    "BIO_new 如何用于密码数据流？",
    "BIO_new 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bio-new",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_new.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码数据流 · BIO_new（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码数据流。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BIO_new_ex, BIO_new, BIO_up_ref, BIO_free, BIO_vfree, BIO_free_all
- BIO allocation and freeing functions

## 技术正文

## NAME


BIO_new_ex, BIO_new, BIO_up_ref, BIO_free, BIO_vfree, BIO_free_all
- BIO allocation and freeing functions

## SYNOPSIS


```c
#include <openssl/bio.h>

BIO *BIO_new_ex(OSSL_LIB_CTX *libctx, const BIO_METHOD *type);
BIO *BIO_new(const BIO_METHOD *type);
int BIO_up_ref(BIO *a);
int BIO_free(BIO *a);
void BIO_vfree(BIO *a);
void BIO_free_all(BIO *a);

```

## DESCRIPTION


The BIO_new_ex() function returns a new BIO using method **type** associated with
the library context `libctx` (see OSSL_LIB_CTX(3)). The library context may be
NULL to indicate the default library context. `type` **MUST NOT** be NULL.

The BIO_new() is the same as BIO_new_ex() except the default library context is
always used.

BIO_up_ref() increments the reference count associated with the BIO object.

BIO_free() frees up a single BIO, BIO_vfree() also frees up a single BIO
but it does not return a value.
If **a** is NULL nothing is done.
Calling BIO_free() may also have some effect
on the underlying I/O structure, for example it may close the file being
referred to under certain circumstances. For more details see the individual
BIO_METHOD descriptions.

BIO_free_all() frees up an entire BIO chain, it does not halt if an error
occurs freeing up an individual BIO in the chain.
If **a** is NULL nothing is done.

## RETURN VALUES


BIO_new_ex() and BIO_new() return a newly created BIO or NULL if the call fails.

BIO_up_ref() and BIO_free() return 1 for success and 0 for failure.

BIO_free_all() and BIO_vfree() do not return values.

## NOTES


If BIO_free() is called on a BIO chain it will only free one BIO resulting
in a memory leak.

Calling BIO_free_all() on a single BIO has the same effect as calling BIO_free()
on it other than the discarded return value.

## HISTORY


BIO_set() was removed in OpenSSL 1.1.0 as BIO type is now opaque.

BIO_new_ex() was added in OpenSSL 3.0.

## EXAMPLES


Create a memory BIO:

```c
BIO *mem = BIO_new(BIO_s_mem());

```

## COPYRIGHT


Copyright 2000-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BIO_new.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_new.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BIO_new.pod`；SHA-256：`b7e7defad0827bccacf428ef46c9bf25e8489859872008f8e4647820909c1087`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
