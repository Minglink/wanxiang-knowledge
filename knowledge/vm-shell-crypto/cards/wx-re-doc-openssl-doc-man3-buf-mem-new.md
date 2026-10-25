---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-buf-mem-new",
  "title": "OpenSSL：密码实现与接口 · BUF_MEM_new（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "BUF_MEM_new"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "aa67297943480f8c53ffcc61487c88fe15ec98fa484b79c367eaf6a41d922f80",
  "generatedHash": "76ff941c987af1bab59ff031d53fbd0741cccf795f7f1197dfa55a84d868f3f4",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：BUF_MEM_new, BUF_MEM_new_ex, BUF_MEM_free, BUF_MEM_grow, BUF_MEM_grow_clean, BUF_reverse - simple character array structure",
  "l1": "The buffer library handles simple character arrays. Buffers are used for various purposes in the library, most notably memory BIOs. BUF_MEM_new() allocates a new buffer of zero size. BUF_MEM_new_ex() allocates a buffer with the specified flags. The flag **BUF_MEM_FLAG_SECURE** specifies that the **data** pointer should be allocated on the secure heap; see CRYPTO_secure_malloc(3). BUF_MEM_free() frees up an already existing buffer. The data is zeroed before freeing up in case the buffer contains sensitive data. If the argument is NULL, nothing is done. BUF_MEM_grow() changes the size of an already existing buffer to **len**. Any data already in the buffer is preserved if it increases in size. BUF_MEM_grow_clean() is similar to BUF_MEM_grow() but it sets any free'd or additionally-allocated memory to zero. BUF_reverse() reverses **size** by",
  "questions": [
    "BUF_MEM_new 如何用于密码实现与接口？",
    "BUF_MEM_new 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-buf-mem-new",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BUF_MEM_new.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · BUF_MEM_new（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BUF_MEM_new, BUF_MEM_new_ex, BUF_MEM_free, BUF_MEM_grow,
BUF_MEM_grow_clean, BUF_reverse
- simple character array structure

## 技术正文

## NAME


BUF_MEM_new, BUF_MEM_new_ex, BUF_MEM_free, BUF_MEM_grow,
BUF_MEM_grow_clean, BUF_reverse
- simple character array structure

## SYNOPSIS


```c
#include <openssl/buffer.h>

BUF_MEM *BUF_MEM_new(void);

BUF_MEM *BUF_MEM_new_ex(unsigned long flags);

void BUF_MEM_free(BUF_MEM *a);

int BUF_MEM_grow(BUF_MEM *str, int len);
size_t BUF_MEM_grow_clean(BUF_MEM *str, size_t len);

void BUF_reverse(unsigned char *out, const unsigned char *in, size_t size);

```

## DESCRIPTION


The buffer library handles simple character arrays. Buffers are used for
various purposes in the library, most notably memory BIOs.

BUF_MEM_new() allocates a new buffer of zero size.

BUF_MEM_new_ex() allocates a buffer with the specified flags.
The flag **BUF_MEM_FLAG_SECURE** specifies that the **data** pointer
should be allocated on the secure heap; see CRYPTO_secure_malloc(3).

BUF_MEM_free() frees up an already existing buffer. The data is zeroed
before freeing up in case the buffer contains sensitive data.
If the argument is NULL, nothing is done.

BUF_MEM_grow() changes the size of an already existing buffer to
**len**. Any data already in the buffer is preserved if it increases in
size.

BUF_MEM_grow_clean() is similar to BUF_MEM_grow() but it sets any free'd
or additionally-allocated memory to zero.

BUF_reverse() reverses **size** bytes at **in** into **out**.  If **in**
is NULL, the array is reversed in-place.

## RETURN VALUES


BUF_MEM_new() returns the buffer or NULL on error.

BUF_MEM_free() has no return value.

BUF_MEM_grow() and BUF_MEM_grow_clean() return
zero on error or the new size (i.e., **len**).

## SEE ALSO


bio(7),
CRYPTO_secure_malloc(3).

## HISTORY


The BUF_MEM_new_ex() function was added in OpenSSL 1.1.0.

## COPYRIGHT


Copyright 2000-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BUF_MEM_new.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BUF_MEM_new.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BUF_MEM_new.pod`；SHA-256：`aa67297943480f8c53ffcc61487c88fe15ec98fa484b79c367eaf6a41d922f80`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
