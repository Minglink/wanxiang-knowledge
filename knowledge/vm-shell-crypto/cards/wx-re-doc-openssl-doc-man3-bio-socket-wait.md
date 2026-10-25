---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bio-socket-wait",
  "title": "OpenSSL：密码数据流 · BIO_socket_wait（man3）",
  "type": "note",
  "tags": [
    "BIO",
    "输入输出",
    "缓冲区",
    "openssl",
    "BIO_socket_wait"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "81046aaa4aaf8564d15a58b42c90a5867d3d1aaa7bc148a4906e7be4ef8ef4df",
  "generatedHash": "51ea7387ec7b4b0786d68bf8c40f54cb923c32e918aaedb9b77bcf2c71653949",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码数据流：BIO_socket_wait, BIO_wait, BIO_do_connect_retry - BIO connection utility functions",
  "l1": "BIO_socket_wait() waits on the socket **fd** for reading if **for_read** is not 0, else for writing, at most until **max_time**. It succeeds immediately if **max_time** == 0 (which means no timeout given). BIO_wait() waits at most until **max_time** on the given (typically socket-based) **bio**, for reading if **bio** is supposed to read, else for writing. It is used by BIO_do_connect_retry() and can be used together BIO_read(3). It succeeds immediately if **max_time** == 0 (which means no timeout given). If sockets are not available it supports polling by succeeding after sleeping at most the given **nap_milliseconds** in order to avoid a tight busy loop. Via **nap_milliseconds** the caller determines the polling granularity. BIO_do_connect_retry() connects via the given **bio**. It retries BIO_do_connect() as far as needed to reach a de",
  "questions": [
    "BIO_socket_wait 如何用于密码数据流？",
    "BIO_socket_wait 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bio-socket-wait",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_socket_wait.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码数据流 · BIO_socket_wait（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码数据流。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BIO_socket_wait,
BIO_wait,
BIO_do_connect_retry
- BIO connection utility functions

## 技术正文

## NAME


BIO_socket_wait,
BIO_wait,
BIO_do_connect_retry
- BIO connection utility functions

## SYNOPSIS


```c
#include <openssl/bio.h>

#ifndef OPENSSL_NO_SOCK
int BIO_socket_wait(int fd, int for_read, time_t max_time);
#endif
int BIO_wait(BIO *bio, time_t max_time, unsigned int nap_milliseconds);
int BIO_do_connect_retry(BIO *bio, int timeout, int nap_milliseconds);

```

## DESCRIPTION


BIO_socket_wait() waits on the socket **fd** for reading if **for_read** is not 0,
else for writing, at most until **max_time**.
It succeeds immediately if **max_time** == 0 (which means no timeout given).

BIO_wait() waits at most until **max_time** on the given (typically socket-based)
**bio**, for reading if **bio** is supposed to read, else for writing.
It is used by BIO_do_connect_retry() and can be used together BIO_read(3).
It succeeds immediately if **max_time** == 0 (which means no timeout given).
If sockets are not available it supports polling by succeeding after sleeping
at most the given **nap_milliseconds** in order to avoid a tight busy loop.
Via **nap_milliseconds** the caller determines the polling granularity.

BIO_do_connect_retry() connects via the given **bio**.
It retries BIO_do_connect() as far as needed to reach a definite outcome,
i.e., connection succeeded, timeout has been reached, or an error occurred.
For nonblocking and potentially even non-socket BIOs it polls
every **nap_milliseconds** and sleeps in between using BIO_wait().
If **nap_milliseconds** is < 0 then a default value of 100 ms is used.
If the **timeout** parameter is > 0 this indicates the maximum number of seconds
to wait until the connection is established or a definite error occurred.
A value of 0 enables waiting indefinitely (i.e, no timeout),
while a value < 0 means that BIO_do_connect() is tried only once.
The function may, directly or indirectly, invoke ERR_clear_error().

## RETURN VALUES


BIO_socket_wait(), BIO_wait(), and BIO_do_connect_retry()
return -1 on error, 0 on timeout, and 1 on success.

## SEE ALSO


BIO_do_connect(3), BIO_read(3)

## HISTORY


BIO_socket_wait(), BIO_wait(), and BIO_do_connect_retry()
were added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2019-2020 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BIO_socket_wait.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_socket_wait.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BIO_socket_wait.pod`；SHA-256：`81046aaa4aaf8564d15a58b42c90a5867d3d1aaa7bc148a4906e7be4ef8ef4df`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
