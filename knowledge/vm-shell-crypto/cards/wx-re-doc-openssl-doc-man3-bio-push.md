---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bio-push",
  "title": "OpenSSL：密码数据流 · BIO_push（man3）",
  "type": "note",
  "tags": [
    "BIO",
    "输入输出",
    "缓冲区",
    "openssl",
    "BIO_push"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "61f422c21127fa9b9ad11482138ac74c84e3ca8abd83e06d376c2ec9dd1a5ff6",
  "generatedHash": "608d236ee63b6a7d510e2431a8c65adf8546ab799745e65e6872ea506a73624c",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码数据流：BIO_push, BIO_pop, BIO_set_next - add and remove BIOs from a chain",
  "l1": "BIO_push() pushes `b` on `next`. If `b` is NULL the function does nothing and returns `next`. Otherwise it prepends `b`, which may be a single BIO or a chain of BIOs, to `next` (unless `next` is NULL). It then makes a control call on `b` and returns `b`. BIO_pop() removes the BIO `b` from any chain is is part of. If `b` is NULL the function does nothing and returns NULL. Otherwise it makes a control call on `b` and returns the next BIO in the chain, or NULL if there is no next BIO. The removed BIO becomes a single BIO with no association with the original chain, it can thus be freed or be made part of a different chain. BIO_set_next() replaces the existing next BIO in a chain with the BIO pointed to by `next`. The new chain may include some of the same BIOs from the old chain or it may be completely different.",
  "questions": [
    "BIO_push 如何用于密码数据流？",
    "BIO_push 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bio-push",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_push.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码数据流 · BIO_push（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码数据流。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BIO_push, BIO_pop, BIO_set_next - add and remove BIOs from a chain

## 技术正文

## NAME


BIO_push, BIO_pop, BIO_set_next - add and remove BIOs from a chain

## SYNOPSIS


```c
#include <openssl/bio.h>

BIO *BIO_push(BIO *b, BIO *next);
BIO *BIO_pop(BIO *b);
void BIO_set_next(BIO *b, BIO *next);

```

## DESCRIPTION


BIO_push() pushes `b` on `next`.
If `b` is NULL the function does nothing and returns `next`.
Otherwise it prepends `b`, which may be a single BIO or a chain of BIOs,
to `next` (unless `next` is NULL).
It then makes a control call on `b` and returns `b`.

BIO_pop() removes the BIO `b` from any chain is is part of.
If `b` is NULL the function does nothing and returns NULL.
Otherwise it makes a control call on `b` and
returns the next BIO in the chain, or NULL if there is no next BIO.
The removed BIO becomes a single BIO with no association with
the original chain, it can thus be freed or be made part of a different chain.

BIO_set_next() replaces the existing next BIO in a chain with the BIO pointed to
by `next`. The new chain may include some of the same BIOs from the old chain
or it may be completely different.

## NOTES


The names of these functions are perhaps a little misleading. BIO_push()
joins two BIO chains whereas BIO_pop() deletes a single BIO from a chain,
the deleted BIO does not need to be at the end of a chain.

The process of calling BIO_push() and BIO_pop() on a BIO may have additional
consequences (a control call is made to the affected BIOs).
Any effects will be noted in the descriptions of individual BIOs.

## RETURN VALUES


BIO_push() returns the head of the chain,
which usually is `b`, or `next` if `b` is NULL.

BIO_pop() returns the next BIO in the chain,
or NULL if there is no next BIO.

## EXAMPLES


For these examples suppose `md1` and `md2` are digest BIOs,
`b64` is a base64 BIO and `f` is a file BIO.

If the call:

```c
BIO_push(b64, f);

```

is made then the new chain will be `b64-f`. After making the calls

```c
BIO_push(md2, b64);
BIO_push(md1, md2);

```

the new chain is `md1-md2-b64-f`. Data written to `md1` will be digested
by `md1` and `md2`, base64 encoded, and finally written to `f`.

It should be noted that reading causes data to pass in the reverse
direction, that is data is read from `f`, base64 decoded,
and digested by `md2` and then `md1`.

The call:

```c
BIO_pop(md2);

```

will return `b64` and the new chain will be `md1-b64-f`.
Data can be written to and read from `md1` as before,
except that `md2` will no more be applied.

## SEE ALSO


bio(7)

## HISTORY


The BIO_set_next() function was added in OpenSSL 1.1.0.

## COPYRIGHT


Copyright 2000-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BIO_push.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_push.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BIO_push.pod`；SHA-256：`61f422c21127fa9b9ad11482138ac74c84e3ca8abd83e06d376c2ec9dd1a5ff6`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
