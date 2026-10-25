---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-store-open",
  "title": "OpenSSL：密码实现与接口 · OSSL_STORE_open（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_STORE_open"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "81099cdb61e4fa4bf09508d669cfeb244a9648ee89105be98105d51d363524be",
  "generatedHash": "7a20a484735353b3ccefc3b31aab8258573ca5c6eff71bd80031ccd852da3692",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_STORE_CTX, OSSL_STORE_post_process_info_fn, OSSL_STORE_open, OSSL_STORE_open_ex, OSSL_STORE_ctrl, OSSL_STORE_load, OSSL_STORE_eof, OSSL_STORE_delete, OSSL_STORE_error, OSSL_STORE_close - Types and functions to read objects from a URI",
  "l1": "These functions help the application to fetch supported objects (see OSSL_STORE_INFO(3)/SUPPORTED OBJECTS for information on which those are) from a given URI. The general method to do so is to \"open\" the URI using OSSL_STORE_open(), read each available and supported object using OSSL_STORE_load() as long as OSSL_STORE_eof() hasn't been reached, and finish it off with OSSL_STORE_close(). The retrieved information is stored in a **OSSL_STORE_INFO**, which is further described in OSSL_STORE_INFO(3). **OSSL_STORE_CTX** is a context variable that holds all the internal information for OSSL_STORE_open(), OSSL_STORE_open_ex(), OSSL_STORE_load(), OSSL_STORE_eof() and OSSL_STORE_close() to work together. OSSL_STORE_open_ex() takes a uri or path `uri`, password UI method `ui_method` with associated data `ui_data`, and post processing callback `pos",
  "questions": [
    "OSSL_STORE_open 如何用于密码实现与接口？",
    "OSSL_STORE_open 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-store-open",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_STORE_open.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_STORE_open（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_STORE_CTX, OSSL_STORE_post_process_info_fn,
OSSL_STORE_open, OSSL_STORE_open_ex,
OSSL_STORE_ctrl, OSSL_STORE_load, OSSL_STORE_eof, OSSL_STORE_delete,
OSSL_STORE_error, OSSL_STORE_close
- Types and functions to read objects from a URI

## 技术正文

## NAME


OSSL_STORE_CTX, OSSL_STORE_post_process_info_fn,
OSSL_STORE_open, OSSL_STORE_open_ex,
OSSL_STORE_ctrl, OSSL_STORE_load, OSSL_STORE_eof, OSSL_STORE_delete,
OSSL_STORE_error, OSSL_STORE_close
- Types and functions to read objects from a URI

## SYNOPSIS


```c
#include <openssl/store.h>

typedef struct ossl_store_ctx_st OSSL_STORE_CTX;

typedef OSSL_STORE_INFO *(*OSSL_STORE_post_process_info_fn)(OSSL_STORE_INFO *,
                                                            void *);

OSSL_STORE_CTX *OSSL_STORE_open(const char *uri, const UI_METHOD *ui_method,
                                void *ui_data,
                                OSSL_STORE_post_process_info_fn post_process,
                                void *post_process_data);
OSSL_STORE_CTX *
OSSL_STORE_open_ex(const char *uri, OSSL_LIB_CTX *libctx, const char *propq,
                   const UI_METHOD *ui_method, void *ui_data,
                   const OSSL_PARAM params[],
                   OSSL_STORE_post_process_info_fn post_process,
                   void *post_process_data);

OSSL_STORE_INFO *OSSL_STORE_load(OSSL_STORE_CTX *ctx);
int OSSL_STORE_eof(OSSL_STORE_CTX *ctx);
int OSSL_STORE_delete(const char *uri, OSSL_LIB_CTX *libctx, const char *propq,
                      const UI_METHOD *ui_method, void *ui_data,
                      const OSSL_PARAM params[]);
int OSSL_STORE_error(OSSL_STORE_CTX *ctx);
int OSSL_STORE_close(OSSL_STORE_CTX *ctx);

```

The following function has been deprecated since OpenSSL 3.0, and can be
hidden entirely by defining **OPENSSL_API_COMPAT** with a suitable version value,
see openssl_user_macros(7):

```c
int OSSL_STORE_ctrl(OSSL_STORE_CTX *ctx, int cmd, ... /* args */);

```

## DESCRIPTION


These functions help the application to fetch supported objects (see
OSSL_STORE_INFO(3)/SUPPORTED OBJECTS for information on which those are)
from a given URI.
The general method to do so is to "open" the URI using OSSL_STORE_open(),
read each available and supported object using OSSL_STORE_load() as long as
OSSL_STORE_eof() hasn't been reached, and finish it off with OSSL_STORE_close().

The retrieved information is stored in a **OSSL_STORE_INFO**, which is further
described in OSSL_STORE_INFO(3).

### Types


**OSSL_STORE_CTX** is a context variable that holds all the internal
information for OSSL_STORE_open(), OSSL_STORE_open_ex(),
OSSL_STORE_load(), OSSL_STORE_eof() and OSSL_STORE_close() to work
together.

### Functions


OSSL_STORE_open_ex() takes a uri or path `uri`, password UI method
`ui_method` with associated data `ui_data`, and post processing
callback `post_process` with associated data `post_process_data`,
a library context `libctx` with an associated property query `propq`,
and opens a channel to the data located at the URI and returns a
**OSSL_STORE_CTX** with all necessary internal information.
The given `ui_method` and `ui_data` will be reused by all
functions that use **OSSL_STORE_CTX** when interaction is needed,
for instance to provide a password.
The auxiliary OSSL_PARAM(3) parameters in `params` can be set to further
modify the store operation.
The given `post_process` and `post_process_data` will be reused by
OSSL_STORE_load() to manipulate or drop the value to be returned.
The `post_process` function drops values by returning NULL, which
will cause OSSL_STORE_load() to start its process over with loading
the next object, until `post_process` returns something other than
NULL, or the end of data is reached as indicated by OSSL_STORE_eof().

OSSL_STORE_open() is similar to OSSL_STORE_open_ex() but uses NULL for
the `params`, the library context `libctx` and property query `propq`.

OSSL_STORE_ctrl() takes a **OSSL_STORE_CTX**, and command number `cmd` and
more arguments not specified here.
The available loader specific command numbers and arguments they each
take depends on the loader that's used and is documented together with
that loader.

There are also global controls available:


- **OSSL_STORE_C_USE_SECMEM**

Controls if the loader should attempt to use secure memory for any
allocated **OSSL_STORE_INFO** and its contents.
This control expects one argument, a pointer to an `int` that is expected to
have the value 1 (yes) or 0 (no).
Any other value is an error.


OSSL_STORE_load() takes a **OSSL_STORE_CTX** and tries to load the next
available object and return it wrapped with **OSSL_STORE_INFO**.

OSSL_STORE_delete() deletes the object identified by `uri`.

OSSL_STORE_eof() takes a **OSSL_STORE_CTX** and checks if we've reached the end
of data.

OSSL_STORE_error() takes a **OSSL_STORE_CTX** and checks if an error occurred in
the last OSSL_STORE_load() call.
Note that it may still be meaningful to try and load more objects, unless
OSSL_STORE_eof() shows that the end of data has been reached.

OSSL_STORE_close() takes a **OSSL_STORE_CTX**, closes the channel that was opened
by OSSL_STORE_open() and frees all other information that was stored in the
**OSSL_STORE_CTX**, as well as the **OSSL_STORE_CTX** itself.
If `ctx` is NULL it does nothing.

## NOTES


A string without a scheme prefix (that is, a non-URI string) is
implicitly interpreted as using the `file:` scheme.

There are some tools that can be used together with
OSSL_STORE_open() to determine if any failure is caused by an unparsable
URI, or if it's a different error (such as memory allocation
failures); if the URI was parsable but the scheme unregistered, the
top error will have the reason `OSSL_STORE_R_UNREGISTERED_SCHEME`.

These functions make no direct assumption regarding the pass phrase received
from the password callback.
The loaders may make assumptions, however.
For example, the **file:** scheme loader inherits the assumptions made by
OpenSSL functionality that handles the different file types; this is mostly
relevant for PKCS#12 objects.
See passphrase-encoding(7) for further information.

## RETURN VALUES


OSSL_STORE_open() returns a pointer to a **OSSL_STORE_CTX** on success, or
NULL on failure.

OSSL_STORE_load() returns a pointer to a **OSSL_STORE_INFO** on success, or NULL
on error or when end of data is reached.
Use OSSL_STORE_error() and OSSL_STORE_eof() to determine the meaning of a
returned NULL.

OSSL_STORE_eof() returns 1 if the end of data has been reached
or an error occurred, 0 otherwise.

OSSL_STORE_error() returns 1 if an error occurred in an OSSL_STORE_load() call,
otherwise 0.

OSSL_STORE_delete(), OSSL_STORE_ctrl() and OSSL_STORE_close() return 1 on
success, or 0 on failure.

## SEE ALSO


ossl_store(7), OSSL_STORE_INFO(3), OSSL_STORE_register_loader(3),
passphrase-encoding(7)

## HISTORY


OSSL_STORE_delete() was added in OpenSSL 3.2.

OSSL_STORE_open_ex() was added in OpenSSL 3.0.

**OSSL_STORE_CTX**, OSSL_STORE_post_process_info_fn(), OSSL_STORE_open(),
OSSL_STORE_ctrl(), OSSL_STORE_load(), OSSL_STORE_eof() and OSSL_STORE_close()
were added in OpenSSL 1.1.1.

Handling of NULL `ctx` argument for OSSL_STORE_close()
was introduced in OpenSSL 1.1.1h.

OSSL_STORE_ctrl() and OSSL_STORE_vctrl() were deprecated in OpenSSL 3.0.

## COPYRIGHT


Copyright 2016-2023 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_STORE_open.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_STORE_open.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_STORE_open.pod`；SHA-256：`81099cdb61e4fa4bf09508d669cfeb244a9648ee89105be98105d51d363524be`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
