---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bio-printf",
  "title": "OpenSSL：密码数据流 · BIO_printf（man3）",
  "type": "note",
  "tags": [
    "BIO",
    "输入输出",
    "缓冲区",
    "openssl",
    "BIO_printf"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "0d93e70c5238781cc7c70a05f5d2718d27d0e883037f2b65b7a71009a2861891",
  "generatedHash": "571456086c5b07b76ecf5523d53a8eaca8a8f6223fb84361e96c74d2c1301701",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码数据流：BIO_printf, BIO_vprintf, BIO_snprintf, BIO_vsnprintf - formatted output to a BIO",
  "l1": "BIO_printf() is similar to the standard C printf() function, except that the output is sent to the specified BIO, `bio`, rather than standard output. All common format specifiers are supported. BIO_vprintf() is similar to the vprintf() function found on many platforms, the output is sent to the specified BIO, `bio`, rather than standard output. All common format specifiers are supported. The argument list `args` is a stdarg argument list. BIO_snprintf() is for platforms that do not have the common snprintf() function. It is like sprintf() except that the size parameter, `n`, specifies the size of the output buffer. BIO_vsnprintf() is to BIO_snprintf() as BIO_vprintf() is to BIO_printf().",
  "questions": [
    "BIO_printf 如何用于密码数据流？",
    "BIO_printf 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bio-printf",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_printf.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码数据流 · BIO_printf（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码数据流。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BIO_printf, BIO_vprintf, BIO_snprintf, BIO_vsnprintf
- formatted output to a BIO

## 技术正文

## NAME


BIO_printf, BIO_vprintf, BIO_snprintf, BIO_vsnprintf
- formatted output to a BIO

## SYNOPSIS


```c
#include <openssl/bio.h>

int BIO_printf(BIO *bio, const char *format, ...);
int BIO_vprintf(BIO *bio, const char *format, va_list args);

int BIO_snprintf(char *buf, size_t n, const char *format, ...);
int BIO_vsnprintf(char *buf, size_t n, const char *format, va_list args);

```

## DESCRIPTION


BIO_printf() is similar to the standard C printf() function, except that
the output is sent to the specified BIO, `bio`, rather than standard
output.  All common format specifiers are supported.

BIO_vprintf() is similar to the vprintf() function found on many platforms,
the output is sent to the specified BIO, `bio`, rather than standard
output.  All common format specifiers are supported. The argument
list `args` is a stdarg argument list.

BIO_snprintf() is for platforms that do not have the common snprintf()
function. It is like sprintf() except that the size parameter, `n`,
specifies the size of the output buffer.

BIO_vsnprintf() is to BIO_snprintf() as BIO_vprintf() is to BIO_printf().

## RETURN VALUES


All functions return the number of bytes written, or -1 on error.
For BIO_snprintf() and BIO_vsnprintf() this includes when the output
buffer is too small.

## NOTES


Except when `n` is 0, both BIO_snprintf() and BIO_vsnprintf() always
terminate their output with `'\0'`.  This includes cases where -1 is
returned, such as when there is insufficient space to output the whole
string.

## COPYRIGHT


Copyright 2017-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BIO_printf.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_printf.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BIO_printf.pod`；SHA-256：`0d93e70c5238781cc7c70a05f5d2718d27d0e883037f2b65b7a71009a2861891`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
