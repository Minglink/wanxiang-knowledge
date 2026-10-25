---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bio-f-prefix",
  "title": "OpenSSL：密码数据流 · BIO_f_prefix（man3）",
  "type": "note",
  "tags": [
    "BIO",
    "输入输出",
    "缓冲区",
    "openssl",
    "BIO_f_prefix"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "c8ad89082fab7e1dcf282af73ebe82074908c3b003e9721de597a06f2d1af28d",
  "generatedHash": "7483baec44bc921ac95289a9b48e52ed95642cc65d312ed24edbeb3e0608f51b",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码数据流：BIO_f_prefix, BIO_set_prefix, BIO_set_indent, BIO_get_indent - prefix BIO filter",
  "l1": "BIO_f_cipher() returns the prefix BIO method. This is a filter for text output, where each line gets automatically prefixed and indented according to user input. The prefix and the indentation are combined. For each line of output going through this filter, the prefix is output first, then the amount of additional spaces indicated by the indentation, and then the line itself. By default, there is no prefix, and indentation is set to 0. BIO_set_prefix() sets the prefix to be used for future lines of text, using `prefix`. `prefix` may be NULL, signifying that there should be no prefix. If `prefix` isn't NULL, this function makes a copy of it. BIO_set_indent() sets the indentation to be used for future lines of text, using `indent`. Negative values are not allowed. BIO_get_indent() gets the current indentation.",
  "questions": [
    "BIO_f_prefix 如何用于密码数据流？",
    "BIO_f_prefix 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bio-f-prefix",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_f_prefix.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码数据流 · BIO_f_prefix（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码数据流。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BIO_f_prefix, BIO_set_prefix, BIO_set_indent, BIO_get_indent
- prefix BIO filter

## 技术正文

## NAME


BIO_f_prefix, BIO_set_prefix, BIO_set_indent, BIO_get_indent
- prefix BIO filter

## SYNOPSIS


```c
#include <openssl/bio.h>

const BIO_METHOD *BIO_f_prefix(void);
long BIO_set_prefix(BIO *b, const char *prefix);
long BIO_set_indent(BIO *b, long indent);
long BIO_get_indent(BIO *b);

```

## DESCRIPTION


BIO_f_cipher() returns the prefix BIO method. This is a filter for
text output, where each line gets automatically prefixed and indented
according to user input.

The prefix and the indentation are combined.  For each line of output
going through this filter, the prefix is output first, then the amount
of additional spaces indicated by the indentation, and then the line
itself.

By default, there is no prefix, and indentation is set to 0.

BIO_set_prefix() sets the prefix to be used for future lines of
text, using `prefix`.  `prefix` may be NULL, signifying that there
should be no prefix.  If `prefix` isn't NULL, this function makes a
copy of it.

BIO_set_indent() sets the indentation to be used for future lines of
text, using `indent`.  Negative values are not allowed.

BIO_get_indent() gets the current indentation.

## NOTES


BIO_set_prefix(), BIO_set_indent() and BIO_get_indent() are
implemented as macros.

## RETURN VALUES


BIO_f_prefix() returns the prefix BIO method.

BIO_set_prefix() returns 1 if the prefix was correctly set, or <=0 on
failure.

BIO_set_indent() returns 1 if the prefix was correctly set, or <=0 on
failure.

BIO_get_indent() returns the current indentation, or a negative value for failure.

## SEE ALSO


bio(7)

## COPYRIGHT


Copyright 2019 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BIO_f_prefix.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_f_prefix.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BIO_f_prefix.pod`；SHA-256：`c8ad89082fab7e1dcf282af73ebe82074908c3b003e9721de597a06f2d1af28d`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
