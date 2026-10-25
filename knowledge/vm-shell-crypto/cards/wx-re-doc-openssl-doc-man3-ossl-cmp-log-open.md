---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-cmp-log-open",
  "title": "OpenSSL：密码实现与接口 · OSSL_CMP_log_open（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_CMP_log_open"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "fd68457029b8a29f620fc0f82731ace9d22a48a7355da887a8be7312fccebd51",
  "generatedHash": "3a5556f4ad69ea23963786d82432d85d6045a9535c90e11ef08edcfca7e91c9e",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_CMP_log_open, OSSL_CMP_log_close, OSSL_CMP_severity, OSSL_CMP_LOG_EMERG, OSSL_CMP_LOG_ALERT, OSSL_CMP_LOG_CRIT, OSSL_CMP_LOG_ERR, OSSL_CMP_LOG_WARNING, OSSL_CMP_LOG_NOTICE, OSSL_CMP_LOG_INFO, OSSL_CMP_LOG_DEBUG, OSSL_CMP_LOG_TRACE, OSSL_CMP_log_cb_t, OSSL_CMP_print_to_bio, OSSL_CMP_print_errors",
  "l1": "The logging and error reporting facility described here contains convenience functions for CMP-specific logging, including a string prefix mirroring the severity levels of syslog.h, and enhancements of the error queue mechanism needed for large diagnostic messages produced by the CMP library in case of certificate validation failures. When an interesting activity is performed or an error occurs, some detail should be provided for user information, debugging, and auditing purposes. A CMP application can obtain this information by providing a callback function with the following type: typedef int (*OSSL_CMP_log_cb_t)(const char *component, const char *file, int line, OSSL_CMP_severity level, const char *msg); The parameters may provide some component info (which may be a module name and/or function name) or NULL, a file pathname or NULL, a ",
  "questions": [
    "OSSL_CMP_log_open 如何用于密码实现与接口？",
    "OSSL_CMP_log_open 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-cmp-log-open",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_CMP_log_open.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_CMP_log_open（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_CMP_log_open,
OSSL_CMP_log_close,
OSSL_CMP_severity,
OSSL_CMP_LOG_EMERG,
OSSL_CMP_LOG_ALERT,
OSSL_CMP_LOG_CRIT,
OSSL_CMP_LOG_ERR,
OSSL_CMP_LOG_WARNING,
OSSL_CMP_LOG_NOTICE,
OSSL_CMP_LOG_INFO,
OSSL_CMP_LOG_DEBUG,
OSSL_CMP_LOG_TRACE,

OSSL_CMP_log_cb_t,
OSSL_CMP_print_to_bio,
OSSL_CMP_print_errors_cb
- functions for logging and error reporting

## 技术正文

## NAME


OSSL_CMP_log_open,
OSSL_CMP_log_close,
OSSL_CMP_severity,
OSSL_CMP_LOG_EMERG,
OSSL_CMP_LOG_ALERT,
OSSL_CMP_LOG_CRIT,
OSSL_CMP_LOG_ERR,
OSSL_CMP_LOG_WARNING,
OSSL_CMP_LOG_NOTICE,
OSSL_CMP_LOG_INFO,
OSSL_CMP_LOG_DEBUG,
OSSL_CMP_LOG_TRACE,

OSSL_CMP_log_cb_t,
OSSL_CMP_print_to_bio,
OSSL_CMP_print_errors_cb
- functions for logging and error reporting

## SYNOPSIS


```c
#include <openssl/cmp_util.h>

int  OSSL_CMP_log_open(void);
void OSSL_CMP_log_close(void);

/* severity level declarations resemble those from syslog.h */
typedef int OSSL_CMP_severity;
#define OSSL_CMP_LOG_EMERG   0
#define OSSL_CMP_LOG_ALERT   1
#define OSSL_CMP_LOG_CRIT    2
#define OSSL_CMP_LOG_ERR     3
#define OSSL_CMP_LOG_WARNING 4
#define OSSL_CMP_LOG_NOTICE  5
#define OSSL_CMP_LOG_INFO    6
#define OSSL_CMP_LOG_DEBUG   7
#define OSSL_CMP_LOG_TRACE   8

typedef int (*OSSL_CMP_log_cb_t)(const char *component,
                                 const char *file, int line,
                                 OSSL_CMP_severity level, const char *msg);
int OSSL_CMP_print_to_bio(BIO *bio, const char *component, const char *file,
                          int line, OSSL_CMP_severity level, const char *msg);
void OSSL_CMP_print_errors_cb(OSSL_CMP_log_cb_t log_fn);

```

## DESCRIPTION


The logging and error reporting facility described here contains
convenience functions for CMP-specific logging,
including a string prefix mirroring the severity levels of syslog.h,
and enhancements of the error queue mechanism needed for large diagnostic
messages produced by the CMP library in case of certificate validation failures.

When an interesting activity is performed or an error occurs, some detail
should be provided for user information, debugging, and auditing purposes.
A CMP application can obtain this information by providing a callback function
with the following type:

```c
typedef int (*OSSL_CMP_log_cb_t)(const char *component,
                                 const char *file, int line,
                                 OSSL_CMP_severity level, const char *msg);

```

The parameters may provide
some component info (which may be a module name and/or function name) or NULL,
a file pathname or NULL,
a line number or 0 indicating the source code location,
a severity level, and
a message string describing the nature of the event, terminated by '\n'.

Even when an activity is successful some warnings may be useful and some degree
of auditing may be required. Therefore, the logging facility supports a severity
level and the callback function has a `level` parameter indicating such a
level, such that error, warning, info, debug, etc. can be treated differently.
The callback is activated only when the severity level is sufficient according
to the current level of verbosity, which by default is **OSSL_CMP_LOG_INFO**.

The callback function may itself do non-trivial tasks like writing to
a log file or remote stream, which in turn may fail.
Therefore, the function should return 1 on success and 0 on failure.

OSSL_CMP_log_open() initializes the CMP-specific logging facility to output
everything to STDOUT. It fails if the integrated tracing is disabled or STDIO
is not available. It may be called during application startup.
Alternatively, OSSL_CMP_CTX_set_log_cb(3) can be used for more flexibility.
As long as neither if the two is used any logging output is ignored.

OSSL_CMP_log_close() may be called when all activities are finished to flush
any pending CMP-specific log output and deallocate related resources.
It may be called multiple times. It does get called at OpenSSL shutdown.

OSSL_CMP_print_to_bio() prints the given component info, filename, line number,
severity level, and log message or error queue message to the given `bio`.
`component` usually is a function or module name.
If it is NULL, empty, or "(unknown function)" then "CMP" is used as fallback.

OSSL_CMP_print_errors_cb() outputs any entries in the OpenSSL error queue.
It is similar to ERR_print_errors_cb(3) but uses the CMP log callback
function `log_fn` for uniformity with CMP logging if not NULL. Otherwise it
prints to STDERR using OSSL_CMP_print_to_bio(3) (unless **OPENSSL_NO_STDIO**
is defined).

## RETURN VALUES


OSSL_CMP_log_close() and OSSL_CMP_print_errors_cb() do not return anything.

All other functions return 1 on success, 0 on error.

## HISTORY


The OpenSSL CMP support was added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2007-2022 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_CMP_log_open.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_CMP_log_open.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_CMP_log_open.pod`；SHA-256：`fd68457029b8a29f620fc0f82731ace9d22a48a7355da887a8be7312fccebd51`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
