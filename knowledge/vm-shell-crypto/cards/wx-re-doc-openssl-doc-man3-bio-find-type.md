---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bio-find-type",
  "title": "OpenSSL：密码数据流 · BIO_find_type（man3）",
  "type": "note",
  "tags": [
    "BIO",
    "输入输出",
    "缓冲区",
    "openssl",
    "BIO_find_type",
    "RSA非对称密码"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "59255968a4d48cb472b73c2e6723d30fe6fca93f6cfab97148e42f525ce4955f",
  "generatedHash": "305748634617f5d26fde1c3ef3b601226f5a6795adb46a7d543d68801fc359e7",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码数据流：BIO_find_type, BIO_next, BIO_method_type - BIO chain traversal",
  "l1": "The BIO_find_type() searches for a **BIO** of a given type in a chain, starting at **BIO** `b`. If `type` is a specific type (such as **BIO_TYPE_MEM**) then a search is made for a **BIO** of that type. If `type` is a general type (such as **BIO_TYPE_SOURCE_SINK**) then the next matching **BIO** of the given general type is searched for. BIO_find_type() returns the next matching **BIO** or NULL if none is found. If `type` is **BIO_TYPE_NONE** it will not find a match. The following general types are defined: **BIO_TYPE_DESCRIPTOR**, **BIO_TYPE_FILTER**, and **BIO_TYPE_SOURCE_SINK**. For a list of the specific types, see the F<< <openssl/bio.h> >> header file. BIO_next() returns the next BIO in a chain. It can be used to traverse all BIOs in a chain or used in conjunction with BIO_find_type() to find all BIOs of a certain type. BIO_method_t",
  "questions": [
    "BIO_find_type 如何用于密码数据流？",
    "BIO_find_type 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bio-find-type",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_find_type.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码数据流 · BIO_find_type（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码数据流。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BIO_find_type, BIO_next, BIO_method_type - BIO chain traversal

## 技术正文

## NAME


BIO_find_type, BIO_next, BIO_method_type - BIO chain traversal

## SYNOPSIS


```c
#include <openssl/bio.h>

BIO *BIO_find_type(BIO *b, int bio_type);
BIO *BIO_next(BIO *b);
int BIO_method_type(const BIO *b);

```

## DESCRIPTION


The BIO_find_type() searches for a **BIO** of a given type in a chain, starting
at **BIO** `b`. If `type` is a specific type (such as **BIO_TYPE_MEM**) then a
search is made for a **BIO** of that type. If `type` is a general type (such as
**BIO_TYPE_SOURCE_SINK**) then the next matching **BIO** of the given general type is
searched for. BIO_find_type() returns the next matching **BIO** or NULL if none is
found. If `type` is **BIO_TYPE_NONE** it will not find a match.

The following general types are defined:
**BIO_TYPE_DESCRIPTOR**, **BIO_TYPE_FILTER**, and **BIO_TYPE_SOURCE_SINK**.

For a list of the specific types, see the F<< <openssl/bio.h> >> header file.

BIO_next() returns the next BIO in a chain. It can be used to traverse all BIOs
in a chain or used in conjunction with BIO_find_type() to find all BIOs of a
certain type.

BIO_method_type() returns the type of a BIO.

## RETURN VALUES


BIO_find_type() returns a matching BIO or NULL for no match.

BIO_next() returns the next BIO in a chain.

BIO_method_type() returns the type of the BIO `b`.

## EXAMPLES


Traverse a chain looking for digest BIOs:

```c
BIO *btmp;

btmp = in_bio; /* in_bio is chain to search through */
do {
    btmp = BIO_find_type(btmp, BIO_TYPE_MD);
    if (btmp == NULL)
        break; /* Not found */
    /* btmp is a digest BIO, do something with it ...*/
    ...

    btmp = BIO_next(btmp);
} while (btmp);


```

## COPYRIGHT


Copyright 2000-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BIO_find_type.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_find_type.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BIO_find_type.pod`；SHA-256：`59255968a4d48cb472b73c2e6723d30fe6fca93f6cfab97148e42f525ce4955f`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
