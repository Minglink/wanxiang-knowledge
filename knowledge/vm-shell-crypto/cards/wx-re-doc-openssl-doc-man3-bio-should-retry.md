---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bio-should-retry",
  "title": "OpenSSL：密码数据流 · BIO_should_retry（man3）",
  "type": "note",
  "tags": [
    "BIO",
    "输入输出",
    "缓冲区",
    "openssl",
    "BIO_should_retry"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "54d60c4f920f7922cc0b428aa55f3ee2c388ae88e3a5e0288c6d1b05510ca38c",
  "generatedHash": "e5fec5e21e49271131b36a5c26356b0a1595a0523fc358aa1b2f9605ad892d60",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码数据流：BIO_should_read, BIO_should_write, BIO_should_io_special, BIO_retry_type, BIO_should_retry, BIO_get_retry_BIO, BIO_get_retry_reason, BIO_set_retry_reason - BIO retry functions",
  "l1": "These functions determine why a BIO is not able to read or write data. They will typically be called after a failed BIO_read_ex() or BIO_write_ex() call. BIO_should_retry() is true if the call that produced this condition should then be retried at a later time. If BIO_should_retry() is false then the cause is an error condition. BIO_should_read() is true if the cause of the condition is that the BIO has insufficient data to return. Check for readability and/or retry the last operation. BIO_should_write() is true if the cause of the condition is that the BIO has pending data to write. Check for writability and/or retry the last operation. BIO_should_io_special() is true if some \"special\" condition, that is a reason other than reading or writing is the cause of the condition. BIO_retry_type() returns a mask of the cause of a retry condition",
  "questions": [
    "BIO_should_retry 如何用于密码数据流？",
    "BIO_should_retry 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bio-should-retry",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_should_retry.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码数据流 · BIO_should_retry（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码数据流。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BIO_should_read, BIO_should_write,
BIO_should_io_special, BIO_retry_type, BIO_should_retry,
BIO_get_retry_BIO, BIO_get_retry_reason, BIO_set_retry_reason - BIO retry
functions

## 技术正文

## NAME


BIO_should_read, BIO_should_write,
BIO_should_io_special, BIO_retry_type, BIO_should_retry,
BIO_get_retry_BIO, BIO_get_retry_reason, BIO_set_retry_reason - BIO retry
functions

## SYNOPSIS


```c
#include <openssl/bio.h>

int BIO_should_read(BIO *b);
int BIO_should_write(BIO *b);
int BIO_should_io_special(iBIO *b);
int BIO_retry_type(BIO *b);
int BIO_should_retry(BIO *b);

BIO *BIO_get_retry_BIO(BIO *bio, int *reason);
int BIO_get_retry_reason(BIO *bio);
void BIO_set_retry_reason(BIO *bio, int reason);

```

## DESCRIPTION


These functions determine why a BIO is not able to read or write data.
They will typically be called after a failed BIO_read_ex() or BIO_write_ex()
call.

BIO_should_retry() is true if the call that produced this condition
should then be retried at a later time.

If BIO_should_retry() is false then the cause is an error condition.

BIO_should_read() is true if the cause of the condition is that the BIO
has insufficient data to return. Check for readability and/or retry the
last operation.

BIO_should_write() is true if the cause of the condition is that the BIO
has pending data to write. Check for writability and/or retry the
last operation.

BIO_should_io_special() is true if some "special" condition, that is a
reason other than reading or writing is the cause of the condition.

BIO_retry_type() returns a mask of the cause of a retry condition
consisting of the values **BIO_FLAGS_READ**, **BIO_FLAGS_WRITE**,
**BIO_FLAGS_IO_SPECIAL** though current BIO types will only set one of
these.

BIO_get_retry_BIO() determines the precise reason for the special
condition, it returns the BIO that caused this condition and if
**reason** is not NULL it contains the reason code. The meaning of
the reason code and the action that should be taken depends on
the type of BIO that resulted in this condition.

BIO_get_retry_reason() returns the reason for a special condition if
passed the relevant BIO, for example as returned by BIO_get_retry_BIO().

BIO_set_retry_reason() sets the retry reason for a special condition for a given
BIO. This would usually only be called by BIO implementations.

## NOTES


BIO_should_read(), BIO_should_write(), BIO_should_io_special(),
BIO_retry_type(), and BIO_should_retry(), are implemented as macros.

If BIO_should_retry() returns false then the precise "error condition"
depends on the BIO type that caused it and the return code of the BIO
operation. For example if a call to BIO_read_ex() on a socket BIO returns
0 and BIO_should_retry() is false then the cause will be that the
connection closed. A similar condition on a file BIO will mean that it
has reached EOF. Some BIO types may place additional information on
the error queue. For more details see the individual BIO type manual
pages.

If the underlying I/O structure is in a blocking mode almost all current
BIO types will not request a retry, because the underlying I/O
calls will not. If the application knows that the BIO type will never
signal a retry then it need not call BIO_should_retry() after a failed
BIO I/O call. This is typically done with file BIOs.

SSL BIOs are the only current exception to this rule: they can request a
retry even if the underlying I/O structure is blocking, if a handshake
occurs during a call to BIO_read(). An application can retry the failed
call immediately or avoid this situation by setting SSL_MODE_AUTO_RETRY
on the underlying SSL structure.

While an application may retry a failed non blocking call immediately
this is likely to be very inefficient because the call will fail
repeatedly until data can be processed or is available. An application
will normally wait until the necessary condition is satisfied. How
this is done depends on the underlying I/O structure.

For example if the cause is ultimately a socket and BIO_should_read()
is true then a call to select() may be made to wait until data is
available and then retry the BIO operation. By combining the retry
conditions of several non blocking BIOs in a single select() call
it is possible to service several BIOs in a single thread, though
the performance may be poor if SSL BIOs are present because long delays
can occur during the initial handshake process.

It is possible for a BIO to block indefinitely if the underlying I/O
structure cannot process or return any data. This depends on the behaviour of
the platforms I/O functions. This is often not desirable: one solution
is to use non blocking I/O and use a timeout on the select() (or
equivalent) call.

## BUGS


The OpenSSL ASN1 functions cannot gracefully deal with non blocking I/O:
that is they cannot retry after a partial read or write. This is usually
worked around by only passing the relevant data to ASN1 functions when
the entire structure can be read or written.

## RETURN VALUES


BIO_should_read(), BIO_should_write(), BIO_should_io_special(), and
BIO_should_retry() return either 1 or 0 based on the actual conditions
of the **BIO**.

BIO_retry_type() returns a flag combination presenting the cause of a retry
condition or false if there is no retry condition.

BIO_get_retry_BIO() returns a valid **BIO** structure.

BIO_get_retry_reason() returns the reason for a special condition.

## SEE ALSO


bio(7)

## HISTORY


The BIO_get_retry_reason() and BIO_set_retry_reason() functions were added in
OpenSSL 1.1.0.

## COPYRIGHT


Copyright 2000-2018 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BIO_should_retry.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_should_retry.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BIO_should_retry.pod`；SHA-256：`54d60c4f920f7922cc0b428aa55f3ee2c388ae88e3a5e0288c6d1b05510ca38c`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
