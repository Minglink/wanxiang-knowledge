---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bio-ctrl",
  "title": "OpenSSL：密码数据流 · BIO_ctrl（man3）",
  "type": "note",
  "tags": [
    "BIO",
    "输入输出",
    "缓冲区",
    "openssl",
    "BIO_ctrl"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "f02ddf5b961a7034e6005710f44b205171510dc6273e03ce9535082b6b078e76",
  "generatedHash": "deda5d686988d84db176dfd07a4f39ce5919c3c53dd9ad53a1d202db2de5c9f5",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码数据流：BIO_ctrl, BIO_callback_ctrl, BIO_ptr_ctrl, BIO_int_ctrl, BIO_reset, BIO_seek, BIO_tell, BIO_flush, BIO_eof, BIO_set_close, BIO_get_close, BIO_pending, BIO_wpending, BIO_ctrl_pending, BIO_ctrl_wpending, BIO_get_info_callback, BIO_set_info_callback, BIO_info_cb, BIO_get_ktls_send, BIO_get_ktls_recv, B",
  "l1": "BIO_ctrl(), BIO_callback_ctrl(), BIO_ptr_ctrl() and BIO_int_ctrl() are BIO \"control\" operations taking arguments of various types. These functions are not normally called directly, various macros are used instead. The standard macros are described below, macros specific to a particular type of BIO are described in the specific BIOs manual page as well as any special features of the standard calls. BIO_reset() typically resets a BIO to some initial state, in the case of file related BIOs for example it rewinds the file pointer to the start of the file. BIO_seek() resets a file related BIO's (that is file descriptor and FILE BIOs) file position pointer to **ofs** bytes from start of file. BIO_tell() returns the current file position of a file related BIO. BIO_flush() normally writes out any internally buffered data, in some cases it is used",
  "questions": [
    "BIO_ctrl 如何用于密码数据流？",
    "BIO_ctrl 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bio-ctrl",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_ctrl.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码数据流 · BIO_ctrl（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码数据流。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BIO_ctrl, BIO_callback_ctrl, BIO_ptr_ctrl, BIO_int_ctrl, BIO_reset,
BIO_seek, BIO_tell, BIO_flush, BIO_eof, BIO_set_close, BIO_get_close,
BIO_pending, BIO_wpending, BIO_ctrl_pending, BIO_ctrl_wpending,
BIO_get_info_callback, BIO_set_info_callback, BIO_info_cb, BIO_get_ktls_send,
BIO_get_ktls_recv, BIO_set_conn_mode, BIO_get_conn_mode, BIO_set_tfo
- BIO control operations

## 技术正文

## NAME


BIO_ctrl, BIO_callback_ctrl, BIO_ptr_ctrl, BIO_int_ctrl, BIO_reset,
BIO_seek, BIO_tell, BIO_flush, BIO_eof, BIO_set_close, BIO_get_close,
BIO_pending, BIO_wpending, BIO_ctrl_pending, BIO_ctrl_wpending,
BIO_get_info_callback, BIO_set_info_callback, BIO_info_cb, BIO_get_ktls_send,
BIO_get_ktls_recv, BIO_set_conn_mode, BIO_get_conn_mode, BIO_set_tfo
- BIO control operations

## SYNOPSIS


```c
#include <openssl/bio.h>

typedef int BIO_info_cb(BIO *b, int state, int res);

long BIO_ctrl(BIO *bp, int cmd, long larg, void *parg);
long BIO_callback_ctrl(BIO *b, int cmd, BIO_info_cb *cb);
void *BIO_ptr_ctrl(BIO *bp, int cmd, long larg);
long BIO_int_ctrl(BIO *bp, int cmd, long larg, int iarg);

int BIO_reset(BIO *b);
int BIO_seek(BIO *b, int ofs);
int BIO_tell(BIO *b);
int BIO_flush(BIO *b);
int BIO_eof(BIO *b);
int BIO_set_close(BIO *b, long flag);
int BIO_get_close(BIO *b);
int BIO_pending(BIO *b);
int BIO_wpending(BIO *b);
size_t BIO_ctrl_pending(BIO *b);
size_t BIO_ctrl_wpending(BIO *b);

int BIO_get_info_callback(BIO *b, BIO_info_cb **cbp);
int BIO_set_info_callback(BIO *b, BIO_info_cb *cb);

int BIO_get_ktls_send(BIO *b);
int BIO_get_ktls_recv(BIO *b);

int BIO_set_conn_mode(BIO *b, int mode);
int BIO_get_conn_mode(BIO *b);

int BIO_set_tfo(BIO *b, int onoff);

```

## DESCRIPTION


BIO_ctrl(), BIO_callback_ctrl(), BIO_ptr_ctrl() and BIO_int_ctrl()
are BIO "control" operations taking arguments of various types.
These functions are not normally called directly, various macros
are used instead. The standard macros are described below, macros
specific to a particular type of BIO are described in the specific
BIOs manual page as well as any special features of the standard
calls.

BIO_reset() typically resets a BIO to some initial state, in the case
of file related BIOs for example it rewinds the file pointer to the
start of the file.

BIO_seek() resets a file related BIO's (that is file descriptor and
FILE BIOs) file position pointer to **ofs** bytes from start of file.

BIO_tell() returns the current file position of a file related BIO.

BIO_flush() normally writes out any internally buffered data, in some
cases it is used to signal EOF and that no more data will be written.

BIO_eof() returns 1 if the BIO has read EOF, the precise meaning of
"EOF" varies according to the BIO type.

BIO_set_close() sets the BIO **b** close flag to **flag**. **flag** can
take the value BIO_CLOSE or BIO_NOCLOSE. Typically BIO_CLOSE is used
in a source/sink BIO to indicate that the underlying I/O stream should
be closed when the BIO is freed.

BIO_get_close() returns the BIOs close flag.

BIO_pending(), BIO_ctrl_pending(), BIO_wpending() and BIO_ctrl_wpending()
return the number of pending characters in the BIOs read and write buffers.
Not all BIOs support these calls. BIO_ctrl_pending() and BIO_ctrl_wpending()
return a size_t type and are functions, BIO_pending() and BIO_wpending() are
macros which call BIO_ctrl().

BIO_get_ktls_send() returns 1 if the BIO is using the Kernel TLS data-path for
sending. Otherwise, it returns zero.
BIO_get_ktls_recv() returns 1 if the BIO is using the Kernel TLS data-path for
receiving. Otherwise, it returns zero.

BIO_get_conn_mode() returns the BIO connection mode. BIO_set_conn_mode() sets
the BIO connection mode.

BIO_set_tfo() disables TCP Fast Open when **onoff** is 0, and enables TCP Fast
Open when **onoff** is nonzero. Setting the value to 1 is equivalent to setting
**BIO_SOCK_TFO** in BIO_set_conn_mode().

## RETURN VALUES


BIO_reset() normally returns 1 for success and <=0 for failure. File
BIOs are an exception, they return 0 for success and -1 for failure.

BIO_seek() and BIO_tell() both return the current file position on success
and -1 for failure, except file BIOs which for BIO_seek() always return 0
for success and -1 for failure.

BIO_flush() returns 1 for success and <=0 for failure.

BIO_eof() returns 1 if EOF has been reached, 0 if not, or negative values for failure.

BIO_set_close() returns 1 on success or <=0 for failure.

BIO_get_close() returns the close flag value: BIO_CLOSE or BIO_NOCLOSE. It also
returns other negative values if an error occurs.

BIO_pending(), BIO_ctrl_pending(), BIO_wpending() and BIO_ctrl_wpending()
return the amount of pending data. BIO_pending() and BIO_wpending() return
negative value or 0 on error. BIO_ctrl_pending() and BIO_ctrl_wpending() return
0 on error.

BIO_get_ktls_send() returns 1 if the BIO is using the Kernel TLS data-path for
sending. Otherwise, it returns zero.
BIO_get_ktls_recv() returns 1 if the BIO is using the Kernel TLS data-path for
receiving. Otherwise, it returns zero.

BIO_set_conn_mode() returns 1 for success and 0 for failure. BIO_get_conn_mode()
returns the current connection mode. Which may contain the bitwise-or of the
following flags:

```c
BIO_SOCK_REUSEADDR
BIO_SOCK_V6_ONLY
BIO_SOCK_KEEPALIVE
BIO_SOCK_NONBLOCK
BIO_SOCK_NODELAY
BIO_SOCK_TFO

```

BIO_set_tfo() returns 1 for success, and 0 for failure.

## NOTES


BIO_flush(), because it can write data may return 0 or -1 indicating
that the call should be retried later in a similar manner to BIO_write_ex().
The BIO_should_retry() call should be used and appropriate action taken
is the call fails.

The return values of BIO_pending() and BIO_wpending() may not reliably
determine the amount of pending data in all cases. For example in the
case of a file BIO some data may be available in the FILE structures
internal buffers but it is not possible to determine this in a
portably way. For other types of BIO they may not be supported.

Filter BIOs if they do not internally handle a particular BIO_ctrl()
operation usually pass the operation to the next BIO in the chain.
This often means there is no need to locate the required BIO for
a particular operation, it can be called on a chain and it will
be automatically passed to the relevant BIO. However, this can cause
unexpected results: for example no current filter BIOs implement
BIO_seek(), but this may still succeed if the chain ends in a FILE
or file descriptor BIO.

Source/sink BIOs return an 0 if they do not recognize the BIO_ctrl()
operation.

## BUGS


Some of the return values are ambiguous and care should be taken. In
particular a return value of 0 can be returned if an operation is not
supported, if an error occurred, if EOF has not been reached and in
the case of BIO_seek() on a file BIO for a successful operation.

In older versions of OpenSSL the BIO_ctrl_pending() and
BIO_ctrl_wpending() could return values greater than INT_MAX on error.

## HISTORY


The BIO_get_ktls_send() and BIO_get_ktls_recv() macros were added in
OpenSSL 3.0. They were modified to never return -1 in OpenSSL 3.0.4.

The BIO_get_conn_mode(), BIO_set_conn_mode() and BIO_set_tfo() functions
were added in OpenSSL 3.2.

## COPYRIGHT


Copyright 2000-2022 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BIO_ctrl.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_ctrl.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BIO_ctrl.pod`；SHA-256：`f02ddf5b961a7034e6005710f44b205171510dc6273e03ce9535082b6b078e76`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
