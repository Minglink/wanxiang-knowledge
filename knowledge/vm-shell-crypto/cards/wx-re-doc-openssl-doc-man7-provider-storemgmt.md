---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-provider-storemgmt",
  "title": "OpenSSL：Provider 架构 · provider-storemgmt（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "Provider",
    "算法实现",
    "openssl",
    "provider-storemgmt"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "a57857783df7bf12671523238f4ebfd8a145a5b7f39fbab01514485adb343f68",
  "generatedHash": "d5c7cd4694932277458de21accfa146e42086bc7d0f0b7e8905354a16d6d8f8f",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Provider 架构：provider-storemgmt - The OSSL_STORE library <-> provider functions",
  "l1": "The STORE operation is the provider side of the ossl_store(7) API. The primary responsibility of the STORE operation is to load all sorts of objects from a container indicated by URI. These objects are given to the OpenSSL library in provider-native object abstraction form (see provider-object(7)). The OpenSSL library is then responsible for passing on that abstraction to suitable provided functions. Examples of functions that the OpenSSL library can pass the abstraction to include OSSL_FUNC_keymgmt_load() (provider-keymgmt(7)), OSSL_FUNC_store_export_object() (which exports the object in parameterized form). All \"functions\" mentioned here are passed as function pointers between `libcrypto` and the provider in OSSL_DISPATCH(3) arrays via OSSL_ALGORITHM(3) arrays that are returned by the provider's provider_query_operation() function (see ",
  "questions": [
    "provider-storemgmt 如何用于Provider 架构？",
    "provider-storemgmt 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-provider-storemgmt",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/provider-storemgmt.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：Provider 架构 · provider-storemgmt（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：Provider 架构。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

provider-storemgmt - The OSSL_STORE library <-> provider functions

## 技术正文

## NAME


provider-storemgmt - The OSSL_STORE library <-> provider functions

## SYNOPSIS


```c
#include <openssl/core_dispatch.h>

/*
 * None of these are actual functions, but are displayed like this for
 * the function signatures for functions that are offered as function
 * pointers in OSSL_DISPATCH arrays.
 */

void *OSSL_FUNC_store_open(void *provctx, const char *uri);
void *OSSL_FUNC_store_attach(void *provctx, OSSL_CORE_BIO *bio);
const OSSL_PARAM *store_settable_ctx_params(void *provctx);
int OSSL_FUNC_store_set_ctx_params(void *loaderctx, const OSSL_PARAM[]);
int OSSL_FUNC_store_load(void *loaderctx,
                         OSSL_CALLBACK *object_cb, void *object_cbarg,
                         OSSL_PASSPHRASE_CALLBACK *pw_cb, void *pw_cbarg);
int OSSL_FUNC_store_eof(void *loaderctx);
int OSSL_FUNC_store_close(void *loaderctx);

int OSSL_FUNC_store_export_object
    (void *loaderctx, const void *objref, size_t objref_sz,
     OSSL_CALLBACK *export_cb, void *export_cbarg);
void *OSSL_FUNC_store_open_ex(void *provctx, const char *uri,
                              const OSSL_PARAM params[],
                              OSSL_PASSPHRASE_CALLBACK *pw_cb,
                              void *pw_cbarg);

int OSSL_FUNC_store_delete(void *provctx, const char *uri,
                   const OSSL_PARAM params[],
                   OSSL_PASSPHRASE_CALLBACK *pw_cb, void *pw_cbarg);

```

## DESCRIPTION


The STORE operation is the provider side of the ossl_store(7) API.

The primary responsibility of the STORE operation is to load all sorts
of objects from a container indicated by URI.  These objects are given
to the OpenSSL library in provider-native object abstraction form (see
provider-object(7)).  The OpenSSL library is then responsible for
passing on that abstraction to suitable provided functions.

Examples of functions that the OpenSSL library can pass the abstraction to
include OSSL_FUNC_keymgmt_load() (provider-keymgmt(7)),
OSSL_FUNC_store_export_object() (which exports the object in parameterized
form).

All "functions" mentioned here are passed as function pointers between
`libcrypto` and the provider in OSSL_DISPATCH(3) arrays via
OSSL_ALGORITHM(3) arrays that are returned by the provider's
provider_query_operation() function
(see provider-base(7)/Provider Functions).

All these "functions" have a corresponding function type definition named
**OSSL_FUNC_{name}_fn**, and a helper function to retrieve the function pointer
from a OSSL_DISPATCH(3) element named **OSSL_get_{name}**.
For example, the "function" OSSL_FUNC_store_attach() has these:

```c
typedef void *(OSSL_FUNC_store_attach_fn)(void *provctx,
                                          OSSL_CORE_BIO * bio);
static ossl_inline OSSL_FUNC_store_attach_fn
    OSSL_FUNC_store_attach(const OSSL_DISPATCH *opf);

```

OSSL_DISPATCH(3) arrays are indexed by numbers that are provided as macros
in openssl-core_dispatch.h(7), as follows:

```c
OSSL_FUNC_store_open                 OSSL_FUNC_STORE_OPEN
OSSL_FUNC_store_attach               OSSL_FUNC_STORE_ATTACH
OSSL_FUNC_store_settable_ctx_params  OSSL_FUNC_STORE_SETTABLE_CTX_PARAMS
OSSL_FUNC_store_set_ctx_params       OSSL_FUNC_STORE_SET_CTX_PARAMS
OSSL_FUNC_store_load                 OSSL_FUNC_STORE_LOAD
OSSL_FUNC_store_eof                  OSSL_FUNC_STORE_EOF
OSSL_FUNC_store_close                OSSL_FUNC_STORE_CLOSE
OSSL_FUNC_store_export_object        OSSL_FUNC_STORE_EXPORT_OBJECT
OSSL_FUNC_store_delete               OSSL_FUNC_STORE_DELETE
OSSL_FUNC_store_open_ex              OSSL_FUNC_STORE_OPEN_EX

```

### Functions


OSSL_FUNC_store_open() should create a provider side context with data based
on the input `uri`.  The implementation is entirely responsible for the
interpretation of the URI.

OSSL_FUNC_store_attach() should create a provider side context with the core
**BIO** `bio` attached.  This is an alternative to using a URI to find storage,
supporting OSSL_STORE_attach(3).

OSSL_FUNC_store_settable_ctx_params() should return a constant array of
descriptor OSSL_PARAM(3), for parameters that OSSL_FUNC_store_set_ctx_params()
can handle.

OSSL_FUNC_store_set_ctx_params() should set additional parameters, such as what
kind of data to expect, search criteria, and so on.  More on those below, in
/Load Parameters.  Whether unrecognised parameters are an error or simply
ignored is at the implementation's discretion.
Passing NULL for `params` should return true.

OSSL_FUNC_store_load() loads the next object from the URI opened by
OSSL_FUNC_store_open(), creates an object abstraction for it (see
provider-object(7)), and calls `object_cb` with it as well as
`object_cbarg`.  `object_cb` will then interpret the object abstraction
and do what it can to wrap it or decode it into an OpenSSL structure.  In
case a passphrase needs to be prompted to unlock an object, `pw_cb` should
be called.

OSSL_FUNC_store_eof() indicates if the end of the set of objects from the
URI has been reached.  When that happens, there's no point trying to do any
further loading.

OSSL_FUNC_store_close() frees the provider side context `ctx`.

When a provider-native object is created by a store manager it would be unsuitable
for direct use with a foreign provider. The export function allows for
exporting the object to that foreign provider if the foreign provider
supports the type of the object and provides an import function.

OSSL_FUNC_store_export_object() should export the object of size `objref_sz`
referenced by `objref` as an OSSL_PARAM(3) array and pass that to the
`export_cb` as well as the given `export_cbarg`.

OSSL_FUNC_store_delete() deletes the object identified by the `uri`. The
implementation is entirely responsible for the interpretation of the URI.  In
case a passphrase needs to be prompted to remove an object, `pw_cb` should be
called.

OSSL_FUNC_store_open_ex() is an extended variant of OSSL_FUNC_store_open(). If
the provider does not implement this function the code internally falls back to
use the original OSSL_FUNC_store_open().
This variant additionally accepts an OSSL_PARAM(3) object and a `pw_cb`
callback that can be used to request a passphrase in cases where the whole
store needs to be unlocked before performing any load operation.

### Load Parameters



- "expect" (**OSSL_STORE_PARAM_EXPECT**) <integer>

Is a hint of what type of data the OpenSSL library expects to get.
This is only useful for optimization, as the library will check that the
object types match the expectation too.

The number that can be given through this parameter is found in
F<< <openssl/store.h> >>, with the macros having names starting with
`OSSL_STORE_INFO_`.  These are further described in
OSSL_STORE_INFO(3)/SUPPORTED OBJECTS.

- "subject" (**OSSL_STORE_PARAM_SUBJECT**) <octet string>

Indicates that the caller wants to search for an object with the given
subject associated.  This can be used to select specific certificates
by subject.

The contents of the octet string is expected to be in DER form.

- "issuer" (**OSSL_STORE_PARAM_ISSUER**) <octet string>

Indicates that the caller wants to search for an object with the given
issuer associated.  This can be used to select specific certificates
by issuer.

The contents of the octet string is expected to be in DER form.

- "serial" (**OSSL_STORE_PARAM_SERIAL**) <integer>

Indicates that the caller wants to search for an object with the given
serial number associated.

- "digest" (**OSSL_STORE_PARAM_DIGEST**) <UTF8 string>

- "fingerprint" (**OSSL_STORE_PARAM_FINGERPRINT**) <octet string>

Indicates that the caller wants to search for an object with the given
fingerprint, computed with the given digest.

- "alias" (**OSSL_STORE_PARAM_ALIAS**) <UTF8 string>

Indicates that the caller wants to search for an object with the given
alias (some call it a "friendly name").

- "properties" (**OSSL_STORE_PARAM_PROPERTIES**) <utf8 string>

Property string to use when querying for algorithms such as the **OSSL_DECODER**
decoder implementations.

- "input-type" (**OSSL_STORE_PARAM_INPUT_TYPE**) <utf8 string>

Type of the input format as a hint to use when decoding the objects in the
store.


Several of these search criteria may be combined.  For example, to
search for a certificate by issuer+serial, both the "issuer" and the
"serial" parameters will be given.

## SEE ALSO


provider(7)

## HISTORY


The STORE interface was introduced in OpenSSL 3.0.

OSSL_FUNC_store_delete() callback was added in OpenSSL 3.2

## COPYRIGHT


Copyright 2020-2023 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/provider-storemgmt.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/provider-storemgmt.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/provider-storemgmt.pod`；SHA-256：`a57857783df7bf12671523238f4ebfd8a145a5b7f39fbab01514485adb343f68`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
