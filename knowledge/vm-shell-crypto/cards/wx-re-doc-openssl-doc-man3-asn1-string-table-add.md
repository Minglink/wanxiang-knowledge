---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-asn1-string-table-add",
  "title": "OpenSSL：ASN.1 编码 · ASN1_STRING_TABLE_add（man3）",
  "type": "note",
  "tags": [
    "ASN.1",
    "DER",
    "编码解析",
    "二进制格式",
    "openssl",
    "ASN1_STRING_TABLE_add"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "b53d0c264e55a720dc074b8708403d269dc263e1bbbc098b752ff4b12e8a900c",
  "generatedHash": "17e405a377b0737c24e85c4a65c702896ad10a0115be210a6e22c9b29b5bc08a",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "ASN.1 编码：ASN1_STRING_TABLE, ASN1_STRING_TABLE_add, ASN1_STRING_TABLE_get, ASN1_STRING_TABLE_cleanup - ASN1_STRING_TABLE manipulation functions",
  "l1": " **ASN1_STRING_TABLE** is a table which holds string information (basically minimum size, maximum size, type and etc) for a NID object. ASN1_STRING_TABLE_add() adds a new **ASN1_STRING_TABLE** item into the local ASN1 string table based on the `nid` along with other parameters. If the item is already in the table, fields of **ASN1_STRING_TABLE** are updated (depending on the values of those parameters, e.g., `minsize` and `maxsize` >= 0, `mask` and `flags` != 0). If the `nid` is standard, a copy of the standard **ASN1_STRING_TABLE** is created and updated with other parameters. ASN1_STRING_TABLE_get() searches for an **ASN1_STRING_TABLE** item based on `nid`. It will search the local table first, then the standard one. ASN1_STRING_TABLE_cleanup() frees all **ASN1_STRING_TABLE** items added by ASN1_STRING_TABLE_add().",
  "questions": [
    "ASN1_STRING_TABLE_add 如何用于ASN.1 编码？",
    "ASN1_STRING_TABLE_add 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-asn1-string-table-add",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/ASN1_STRING_TABLE_add.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：ASN.1 编码 · ASN1_STRING_TABLE_add（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：ASN.1 编码。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

ASN1_STRING_TABLE, ASN1_STRING_TABLE_add, ASN1_STRING_TABLE_get,
ASN1_STRING_TABLE_cleanup - ASN1_STRING_TABLE manipulation functions

## 技术正文

## NAME


ASN1_STRING_TABLE, ASN1_STRING_TABLE_add, ASN1_STRING_TABLE_get,
ASN1_STRING_TABLE_cleanup - ASN1_STRING_TABLE manipulation functions

## SYNOPSIS


```c
#include <openssl/asn1.h>

typedef struct asn1_string_table_st ASN1_STRING_TABLE;

int ASN1_STRING_TABLE_add(int nid, long minsize, long maxsize,
                          unsigned long mask, unsigned long flags);
ASN1_STRING_TABLE *ASN1_STRING_TABLE_get(int nid);
void ASN1_STRING_TABLE_cleanup(void);

```

## DESCRIPTION


### Types


**ASN1_STRING_TABLE** is a table which holds string information
(basically minimum size, maximum size, type and etc) for a NID object.

### Functions


ASN1_STRING_TABLE_add() adds a new **ASN1_STRING_TABLE** item into the
local ASN1 string table based on the `nid` along with other parameters.

If the item is already in the table, fields of **ASN1_STRING_TABLE** are
updated (depending on the values of those parameters, e.g., `minsize`
and `maxsize` >= 0, `mask` and `flags` != 0). If the `nid` is standard,
a copy of the standard **ASN1_STRING_TABLE** is created and updated with
other parameters.

ASN1_STRING_TABLE_get() searches for an **ASN1_STRING_TABLE** item based
on `nid`. It will search the local table first, then the standard one.

ASN1_STRING_TABLE_cleanup() frees all **ASN1_STRING_TABLE** items added
by ASN1_STRING_TABLE_add().

## RETURN VALUES


ASN1_STRING_TABLE_add() returns 1 on success, 0 if an error occurred.

ASN1_STRING_TABLE_get() returns a valid **ASN1_STRING_TABLE** structure
or NULL if nothing is found.

ASN1_STRING_TABLE_cleanup() does not return a value.

## SEE ALSO


ERR_get_error(3)

## COPYRIGHT


Copyright 2017-2020 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/ASN1_STRING_TABLE_add.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/ASN1_STRING_TABLE_add.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/ASN1_STRING_TABLE_add.pod`；SHA-256：`b53d0c264e55a720dc074b8708403d269dc263e1bbbc098b752ff4b12e8a900c`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
