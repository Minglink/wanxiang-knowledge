---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-trace-enabled",
  "title": "OpenSSL：密码实现与接口 · OSSL_trace_enabled（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_trace_enabled"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "bc981030dab60345a175df1d458788a75e174f5d3093d524381f9f4489aa5347",
  "generatedHash": "959d0b82f78805b3d44a77a019ecdd85473244f931086fc4d48fa87a6e1007d8",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_trace_enabled, OSSL_trace_begin, OSSL_trace_end, OSSL_TRACE_BEGIN, OSSL_TRACE_END, OSSL_TRACE_CANCEL, OSSL_TRACE, OSSL_TRACE1, OSSL_TRACE2, OSSL_TRACE3, OSSL_TRACE4, OSSL_TRACE5, OSSL_TRACE6, OSSL_TRACE7, OSSL_TRACE8, OSSL_TRACE9, OSSL_TRACEV, OSSL_TRACE_STRING, OSSL_TRACE_STRING_MAX, OSSL_trac",
  "l1": "The functions described here are mainly interesting for those who provide OpenSSL functionality, either in OpenSSL itself or in engine modules or similar. If the tracing facility is enabled (see /Configure Tracing below), these functions are used to generate free text tracing output. The tracing output is divided into types which are enabled individually by the application. The tracing types are described in detail in OSSL_trace_set_callback(3)/Trace types. The fallback type **OSSL_TRACE_CATEGORY_ALL** should `not` be used with the functions described here. Tracing for a specific category is enabled at run-time if a so-called `trace channel` is attached to it. A trace channel is simply a BIO object to which the application can write its trace output. The application has two different ways of registering a trace channel, either by directly",
  "questions": [
    "OSSL_trace_enabled 如何用于密码实现与接口？",
    "OSSL_trace_enabled 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-trace-enabled",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_trace_enabled.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_trace_enabled（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_trace_enabled, OSSL_trace_begin, OSSL_trace_end,
OSSL_TRACE_BEGIN, OSSL_TRACE_END, OSSL_TRACE_CANCEL,
OSSL_TRACE, OSSL_TRACE1, OSSL_TRACE2, OSSL_TRACE3, OSSL_TRACE4,
OSSL_TRACE5, OSSL_TRACE6, OSSL_TRACE7, OSSL_TRACE8, OSSL_TRACE9,
OSSL_TRACEV,
OSSL_TRACE_STRING, OSSL_TRACE_STRING_MAX, OSSL_trace_string,
OSSL_TRACE_ENABLED
- OpenSSL Tracing API

## 技术正文

## NAME


OSSL_trace_enabled, OSSL_trace_begin, OSSL_trace_end,
OSSL_TRACE_BEGIN, OSSL_TRACE_END, OSSL_TRACE_CANCEL,
OSSL_TRACE, OSSL_TRACE1, OSSL_TRACE2, OSSL_TRACE3, OSSL_TRACE4,
OSSL_TRACE5, OSSL_TRACE6, OSSL_TRACE7, OSSL_TRACE8, OSSL_TRACE9,
OSSL_TRACEV,
OSSL_TRACE_STRING, OSSL_TRACE_STRING_MAX, OSSL_trace_string,
OSSL_TRACE_ENABLED
- OpenSSL Tracing API

## SYNOPSIS



```c
#include <openssl/trace.h>

int OSSL_trace_enabled(int category);

BIO *OSSL_trace_begin(int category);
void OSSL_trace_end(int category, BIO *channel);

/* trace group macros */
OSSL_TRACE_BEGIN(category) {
    ...
    if (some_error) {
        /* Leave trace group prematurely in case of an error */
        OSSL_TRACE_CANCEL(category);
        goto err;
    }
    ...
} OSSL_TRACE_END(category);

/* one-shot trace macros */
OSSL_TRACE(category, text)
OSSL_TRACE1(category, format, arg1)
OSSL_TRACE2(category, format, arg1, arg2)
...
OSSL_TRACE9(category, format, arg1, ..., arg9)
OSSL_TRACE_STRING(category, text, full, data, len)

#define OSSL_TRACE_STRING_MAX 80
int OSSL_trace_string(BIO *out, int text, int full,
                      const unsigned char *data, size_t size);

/* check whether a trace category is enabled */
if (OSSL_TRACE_ENABLED(category)) {
    ...
}

```

## DESCRIPTION


The functions described here are mainly interesting for those who provide
OpenSSL functionality, either in OpenSSL itself or in engine modules
or similar.

If the tracing facility is enabled (see /Configure Tracing below),
these functions are used to generate free text tracing output.

The tracing output is divided into types which are enabled
individually by the application.
The tracing types are described in detail in
OSSL_trace_set_callback(3)/Trace types.
The fallback type **OSSL_TRACE_CATEGORY_ALL** should `not` be used
with the functions described here.

Tracing for a specific category is enabled at run-time if a so-called
`trace channel` is attached to it. A trace channel is simply a
BIO object to which the application can write its trace output.

The application has two different ways of registering a trace channel,
either by directly providing a BIO object using OSSL_trace_set_channel(3),
or by providing a callback routine using OSSL_trace_set_callback(3).
The latter is wrapped internally by a dedicated BIO object, so for the
tracing code both channel types are effectively indistinguishable.
We call them a `simple trace channel` and a `callback trace channel`,
respectively.

To produce trace output, it is necessary to obtain a pointer to the
trace channel (i.e., the BIO object) using OSSL_trace_begin(), write
to it using arbitrary BIO output routines, and finally releases the
channel using OSSL_trace_end(). The OSSL_trace_begin()/OSSL_trace_end()
calls surrounding the trace output create a group, which acts as a
critical section (guarded by a mutex) to ensure that the trace output
of different threads does not get mixed up.

The tracing code normally does not call OSSL_trace_{begin,end}() directly,
but rather uses a set of convenience macros, see the /Macros section below.


### Functions


OSSL_trace_enabled() can be used to check if tracing for the given
`category` is enabled, i.e., if the tracing facility has been statically
enabled (see /Configure Tracing below) and a trace channel has been
registered using OSSL_trace_set_channel(3) or OSSL_trace_set_callback(3).

OSSL_trace_begin() is used to start a tracing section,
and get the channel for the given `category` in form of a BIO.
This BIO can only be used for output.
The pointer returned is NULL if the category is invalid or not enabled.

OSSL_trace_end() is used to end a tracing section.

Using OSSL_trace_begin() and OSSL_trace_end() to wrap tracing sections
is `mandatory`.
The result of trying to produce tracing output outside of such
sections is undefined.

OSSL_trace_string() outputs `data` of length `size` as a string on BIO `out`.
If `text` is 0, the function masks any included control characters apart from
newlines and makes sure for nonempty input that the output ends with a newline.
Unless `full` is nonzero, the length is limited (with a suitable warning)
to **OSSL_TRACE_STRING_MAX** characters, which currently is 80.

### Macros


There are a number of convenience macros defined, to make tracing
easy and consistent.

OSSL_TRACE_BEGIN() and OSSL_TRACE_END() reserve the **BIO** `trc_out` and are
used as follows to wrap a trace section:

```c
OSSL_TRACE_BEGIN(TLS) {

    BIO_printf(trc_out, ... );

} OSSL_TRACE_END(TLS);

```

This will normally expand to:

```c
do {
    BIO *trc_out = OSSL_trace_begin(OSSL_TRACE_CATEGORY_TLS);
    if (trc_out != NULL) {
        ...
        BIO_printf(trc_out, ...);
    }
    OSSL_trace_end(OSSL_TRACE_CATEGORY_TLS, trc_out);
} while (0);

```

OSSL_TRACE_CANCEL() must be used before returning from or jumping out of a
trace section:

```c
OSSL_TRACE_BEGIN(TLS) {

    if (some_error) {
        OSSL_TRACE_CANCEL(TLS);
        goto err;
    }
    BIO_printf(trc_out, ... );

} OSSL_TRACE_END(TLS);

```

This will normally expand to:

```c
do {
    BIO *trc_out = OSSL_trace_begin(OSSL_TRACE_CATEGORY_TLS);
    if (trc_out != NULL) {
        if (some_error) {
            OSSL_trace_end(OSSL_TRACE_CATEGORY_TLS, trc_out);
            goto err;
        }
        BIO_printf(trc_out, ... );
    }
    OSSL_trace_end(OSSL_TRACE_CATEGORY_TLS, trc_out);
} while (0);


```

OSSL_TRACE() and OSSL_TRACE1(), OSSL_TRACE2(), ... OSSL_TRACE9() are
so-called one-shot macros:

The macro call `OSSL_TRACE(category, text)`, produces literal text trace output.

The macro call `OSSL_TRACEn(category, format, arg1, ..., argn)` produces
printf-style trace output with n format field arguments (n=1,...,9).
It expands to:

```c
OSSL_TRACE_BEGIN(category) {
    BIO_printf(trc_out, format, arg1, ..., argN);
} OSSL_TRACE_END(category)

```

Internally, all one-shot macros are implemented using a generic OSSL_TRACEV()
macro, since C90 does not support variadic macros. This helper macro has a rather
weird synopsis and should not be used directly.

The macro call `OSSL_TRACE_STRING(category, text, full, data, len)`
outputs `data` of length `size` as a string
if tracing for the given `category` is enabled.
It expands to:

```c
OSSL_TRACE_BEGIN(category) {
    OSSL_trace_string(trc_out, text, full, data, len);
} OSSL_TRACE_END(category)

```

The OSSL_TRACE_ENABLED() macro can be used to conditionally execute some code
only if a specific trace category is enabled.
In some situations this is simpler than entering a trace section using
OSSL_TRACE_BEGIN() and OSSL_TRACE_END().
For example, the code

```c
if (OSSL_TRACE_ENABLED(TLS)) {
    ...
}

```

expands to

```c
if (OSSL_trace_enabled(OSSL_TRACE_CATEGORY_TLS) {
    ...
}

```

## NOTES


It is not needed to guard trace output function calls like
`OSSL_TRACE(category, ...)` by `OSSL_TRACE_ENABLED(category)`.

If producing the trace output requires carrying out auxiliary calculations,
this auxiliary code should be placed inside a conditional block which is
executed only if the trace category is enabled.

The most natural way to do this is to place the code inside the trace section
itself because it already introduces such a conditional block.

```c
OSSL_TRACE_BEGIN(TLS) {
    int var = do_some_auxiliary_calculation();

    BIO_printf(trc_out, "var = %d\n", var);

} OSSL_TRACE_END(TLS);

```

In some cases it is more advantageous to use a simple conditional group instead
of a trace section. This is the case if calculations and tracing happen in
different locations of the code, or if the calculations are so time consuming
that placing them inside a (critical) trace section would create too much
contention.

```c
if (OSSL_TRACE_ENABLED(TLS)) {
    int var = do_some_auxiliary_calculation();

    OSSL_TRACE1("var = %d\n", var);
}

```

Note however that premature optimization of tracing code is in general futile
and it's better to keep the tracing code as simple as possible.
Because most often the limiting factor for the application's speed is the time
it takes to print the trace output, not to calculate it.

### Configure Tracing


By default, the OpenSSL library is built with tracing disabled. To
use the tracing functionality documented here, it is therefore
necessary to configure and build OpenSSL with the 'enable-trace' option.

When the library is built with tracing disabled:


- *

The macro **OPENSSL_NO_TRACE** is defined in F<< <openssl/opensslconf.h> >>.

- *

all functions are still present, but OSSL_trace_enabled() will always
report the categories as disabled, and all other functions will do
nothing.

- *

the convenience macros are defined to produce dead code.
For example, take this example from /Macros section above:

```c
OSSL_TRACE_BEGIN(TLS) {

    if (condition) {
        OSSL_TRACE_CANCEL(TLS);
        goto err;
    }
    BIO_printf(trc_out, ... );

} OSSL_TRACE_END(TLS);

```

When the tracing API isn't operational, that will expand to:

```c
do {
    BIO *trc_out = NULL;
    if (0) {
        if (condition) {
            ((void)0);
            goto err;
        }
        BIO_printf(trc_out, ... );
    }
} while (0);

```


## RETURN VALUES


OSSL_trace_enabled() returns 1 if tracing for the given `type` is
operational and enabled, otherwise 0.

OSSL_trace_begin() returns a **BIO** pointer if the given `type` is enabled,
otherwise NULL.

OSSL_trace_string() returns the number of characters emitted, or -1 on error.

## SEE ALSO


OSSL_trace_set_channel(3), OSSL_trace_set_callback(3)

## HISTORY


The OpenSSL Tracing API was added in OpenSSL 3.0.

OSSL_TRACE_STRING(), OSSL_TRACE_STRING_MAX, and OSSL_trace_string
were added in OpenSSL 3.2.

## COPYRIGHT


Copyright 2019-2023 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_trace_enabled.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_trace_enabled.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_trace_enabled.pod`；SHA-256：`bc981030dab60345a175df1d458788a75e174f5d3093d524381f9f4489aa5347`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
