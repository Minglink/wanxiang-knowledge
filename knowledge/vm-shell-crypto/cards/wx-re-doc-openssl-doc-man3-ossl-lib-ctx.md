---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-lib-ctx",
  "title": "OpenSSL：密码实现与接口 · OSSL_LIB_CTX（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_LIB_CTX"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "6df9470e884e75f00cb0d7e59cffb86a1ef3e0e4b428eda22df95abef65e9651",
  "generatedHash": "8627885f09e4ab9219280ff7c30331e1894d5990bb1f53ded325c29f3a3e5a18",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_LIB_CTX, OSSL_LIB_CTX_get_data, OSSL_LIB_CTX_new, OSSL_LIB_CTX_new_from_dispatch, OSSL_LIB_CTX_new_child, OSSL_LIB_CTX_free, OSSL_LIB_CTX_load_config, OSSL_LIB_CTX_get0_global_default, OSSL_LIB_CTX_set0_default - OpenSSL library context",
  "l1": "**OSSL_LIB_CTX** is an internal OpenSSL library context type. Applications may allocate their own, but may also use NULL to use a default context with functions that take an **OSSL_LIB_CTX** argument. When a non default library context is in use care should be taken with multi-threaded applications to properly clean up thread local resources before the OSSL_LIB_CTX is freed. See OPENSSL_thread_stop_ex(3) for more information. OSSL_LIB_CTX_new() creates a new OpenSSL library context. OSSL_LIB_CTX_new_from_dispatch() creates a new OpenSSL library context initialised to use callbacks from the OSSL_DISPATCH structure. This is primarily useful for provider authors. The `handle` and dispatch structure arguments passed should be the same ones as passed to a provider's OSSL_provider_init function. Some OpenSSL functions, such as BIO_new_from_core",
  "questions": [
    "OSSL_LIB_CTX 如何用于密码实现与接口？",
    "OSSL_LIB_CTX 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-lib-ctx",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_LIB_CTX.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_LIB_CTX（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_LIB_CTX, OSSL_LIB_CTX_get_data, OSSL_LIB_CTX_new,
OSSL_LIB_CTX_new_from_dispatch, OSSL_LIB_CTX_new_child,
OSSL_LIB_CTX_free, OSSL_LIB_CTX_load_config,
OSSL_LIB_CTX_get0_global_default, OSSL_LIB_CTX_set0_default
- OpenSSL library context

## 技术正文

## NAME


OSSL_LIB_CTX, OSSL_LIB_CTX_get_data, OSSL_LIB_CTX_new,
OSSL_LIB_CTX_new_from_dispatch, OSSL_LIB_CTX_new_child,
OSSL_LIB_CTX_free, OSSL_LIB_CTX_load_config,
OSSL_LIB_CTX_get0_global_default, OSSL_LIB_CTX_set0_default
- OpenSSL library context

## SYNOPSIS


```c
#include <openssl/crypto.h>

typedef struct ossl_lib_ctx_st OSSL_LIB_CTX;

OSSL_LIB_CTX *OSSL_LIB_CTX_new(void);
OSSL_LIB_CTX *OSSL_LIB_CTX_new_from_dispatch(const OSSL_CORE_HANDLE *handle,
                                             const OSSL_DISPATCH *in);
OSSL_LIB_CTX *OSSL_LIB_CTX_new_child(const OSSL_CORE_HANDLE *handle,
                                     const OSSL_DISPATCH *in);
int OSSL_LIB_CTX_load_config(OSSL_LIB_CTX *ctx, const char *config_file);
void OSSL_LIB_CTX_free(OSSL_LIB_CTX *ctx);
OSSL_LIB_CTX *OSSL_LIB_CTX_get0_global_default(void);
OSSL_LIB_CTX *OSSL_LIB_CTX_set0_default(OSSL_LIB_CTX *ctx);
void *OSSL_LIB_CTX_get_data(OSSL_LIB_CTX *ctx, int index);

```

## DESCRIPTION


**OSSL_LIB_CTX** is an internal OpenSSL library context type.
Applications may allocate their own, but may also use NULL to use
a default context with functions that take an **OSSL_LIB_CTX**
argument.

When a non default library context is in use care should be taken with
multi-threaded applications to properly clean up thread local resources before
the OSSL_LIB_CTX is freed.
See OPENSSL_thread_stop_ex(3) for more information.

OSSL_LIB_CTX_new() creates a new OpenSSL library context.

OSSL_LIB_CTX_new_from_dispatch() creates a new OpenSSL library context
initialised to use callbacks from the OSSL_DISPATCH structure. This is primarily
useful for provider authors. The `handle` and dispatch structure arguments
passed should be the same ones as passed to a provider's
OSSL_provider_init function. Some OpenSSL functions, such as
BIO_new_from_core_bio(3), require the library context to be created in this
way in order to work.

OSSL_LIB_CTX_new_child() is only useful to provider authors and does the same
thing as OSSL_LIB_CTX_new_from_dispatch() except that it additionally links the
new library context to the application library context. The new library context
is a full library context in its own right, but will have all the same providers
available to it that are available in the application library context (without
having to reload them). If the application loads or unloads providers from the
application library context then this will be automatically mirrored in the
child library context.

In addition providers that are not loaded in the parent library context can be
explicitly loaded into the child library context independently from the parent
library context. Providers loaded independently in this way will not be mirrored
in the parent library context and will not be affected if the parent library
context subsequently loads the same provider.

A provider may call the function OSSL_PROVIDER_load(3) with the child library
context as required. If the provider already exists due to it being mirrored
from the parent library context then it will remain available and its reference
count will be increased. If OSSL_PROVIDER_load(3) is called in this way then
OSSL_PROVIDER_unload(3) should be subsequently called to decrement the
reference count. OSSL_PROVIDER_unload(3) must not be called for a provider in
the child library context that did not have an earlier OSSL_PROVIDER_load(3)
call for that provider in that child library context.

In addition to providers, a child library context will also mirror the default
properties (set via EVP_set_default_properties(3)) from the parent library
context. If EVP_set_default_properties(3) is called directly on a child
library context then the new properties will override anything from the parent
library context and mirroring of the properties will stop.

When OSSL_LIB_CTX_new_child() is called from within the scope of a provider's
**OSSL_provider_init** function the currently initialising provider is not yet
available in the application's library context and therefore will similarly not
yet be available in the newly constructed child library context. As soon as the
**OSSL_provider_init** function returns then the new provider is available in the
application's library context and will be similarly mirrored in the child
library context.

OSSL_LIB_CTX_load_config() loads a configuration file using the given `ctx`.
This can be used to associate a library context with providers that are loaded
from a configuration. This function must not be called concurrently from
multiple threads on a single `ctx`.

OSSL_LIB_CTX_free() frees the given `ctx`, unless it happens to be the
default OpenSSL library context. If the argument is NULL, nothing is done.

OSSL_LIB_CTX_get0_global_default() returns a concrete (non NULL) reference to
the global default library context.

OSSL_LIB_CTX_set0_default() sets the default OpenSSL library context to be
`ctx` in the current thread.  The previous default library context is
returned.  Care should be taken by the caller to restore the previous
default library context with a subsequent call of this function. If `ctx` is
NULL then no change is made to the default library context, but a pointer to
the current library context is still returned. On a successful call of this
function the returned value will always be a concrete (non NULL) library
context.

Care should be taken when changing the default library context and starting
async jobs (see ASYNC_start_job(3)), as the default library context when
the job is started will be used throughout the lifetime of an async job, no
matter how the calling thread makes further default library context changes
in the mean time.  This means that the calling thread must not free the
library context that was the default at the start of the async job before
that job has finished.

OSSL_LIB_CTX_get_data() returns a memory address whose interpretation depends
on the index.  The index argument refers to a context member which is
to be retrieved. The values for index are all private to OpenSSL currently
and so applications should not typically call this function.
If ctx is NULL then the function operates on the default library context.
OSSL_LIB_CTX_get_data() returns a memory address whose interpretation
depends on the index.

## RETURN VALUES


OSSL_LIB_CTX_new(), OSSL_LIB_CTX_get0_global_default() and
OSSL_LIB_CTX_set0_default() return a library context pointer on success, or NULL
on error.

OSSL_LIB_CTX_free() doesn't return any value.

OSSL_LIB_CTX_load_config() returns 1 on success, 0 on error.

OSSL_LIB_CTX_get_data() returns a memory address whose interpretation
depends on the index.

## HISTORY


All of the functions described on this page were added in OpenSSL 3.0.

OSSL_LIB_CTX_get_data() was introduced in OpenSSL 3.4.

## COPYRIGHT


Copyright 2019-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_LIB_CTX.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_LIB_CTX.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_LIB_CTX.pod`；SHA-256：`6df9470e884e75f00cb0d7e59cffb86a1ef3e0e4b428eda22df95abef65e9651`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
