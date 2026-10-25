---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-provider-skeymgmt",
  "title": "OpenSSL：Provider 架构 · provider-skeymgmt（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "Provider",
    "算法实现",
    "openssl",
    "provider-skeymgmt"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "f2ab4fbe6995b908391cd1c42842b18d0eea9dfcbfeacc3d3c21e12cdf620bc4",
  "generatedHash": "61bf945146c5abf917d2f94e888f4c22281e697837c9dafaa633b24403872c9d",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Provider 架构：provider-skeymgmt - The SKEYMGMT library <-> provider functions",
  "l1": "The SKEYMGMT operation doesn't have much public visibility in the OpenSSL libraries, rather it is an internal operation that is designed to work with operations that use opaque symmetric keys objects. The SKEYMGMT operation shares knowledge with the operations it works with, therefore the SKEYMGMT and the algorithms which use it must belong to the same provider. The OpenSSL libraries will ensure that they do. The primary responsibility of the SKEYMGMT operation is to hold the provider side key data for the OpenSSL library EVP_SKEY structure. All \"functions\" mentioned here are passed as function pointers between `libcrypto` and the provider in OSSL_DISPATCH(3) arrays via OSSL_ALGORITHM(3) arrays that are returned by the provider's provider_query_operation() function (see provider-base(7)/Provider Functions). All these \"functions\" have a co",
  "questions": [
    "provider-skeymgmt 如何用于Provider 架构？",
    "provider-skeymgmt 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-provider-skeymgmt",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/provider-skeymgmt.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：Provider 架构 · provider-skeymgmt（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：Provider 架构。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

provider-skeymgmt - The SKEYMGMT library <-> provider functions

## 技术正文

## NAME


provider-skeymgmt - The SKEYMGMT library <-> provider functions

## SYNOPSIS


```c
#include <openssl/core_dispatch.h>

/*
 * None of these are actual functions, but are displayed like this for
 * the function signatures for functions that are offered as function
 * pointers in OSSL_DISPATCH arrays.
 */

/* Key object destruction */
void OSSL_FUNC_skeymgmt_free(void *keydata);

/* Key object import and export functions */
void *OSSL_FUNC_skeymgmt_import(void *provctx, int selection,
                                const OSSL_PARAM params[]);
int OSSL_FUNC_skeymgmt_export(void *keydata, int selection,
                              OSSL_CALLBACK *param_cb, void *cbarg);
void *OSSL_FUNC_skeymgmt_generate(void *provctx,
                                  const OSSL_PARAM params[]);
const OSSL_PARAM *OSSL_FUNC_skeymgmt_gen_settable_params(void *provctx);
const OSSL_PARAM *OSSL_FUNC_skeymgmt_imp_settable_params(void *provctx);
const char *OSSL_FUNC_skeymgmt_get_key_id(void *keydata);

```

## DESCRIPTION


The SKEYMGMT operation doesn't have much public visibility in the OpenSSL
libraries, rather it is an internal operation that is designed to work
with operations that use opaque symmetric keys objects.

The SKEYMGMT operation shares knowledge with the operations it works with,
therefore the SKEYMGMT and the algorithms which use it must belong to the same
provider.  The OpenSSL libraries will ensure that they do.

The primary responsibility of the SKEYMGMT operation is to hold the
provider side key data for the OpenSSL library EVP_SKEY structure.

All "functions" mentioned here are passed as function pointers between
`libcrypto` and the provider in OSSL_DISPATCH(3) arrays via
OSSL_ALGORITHM(3) arrays that are returned by the provider's
provider_query_operation() function
(see provider-base(7)/Provider Functions).

All these "functions" have a corresponding function type definition
named **OSSL_FUNC_{name}_fn**, and a helper function to retrieve the
function pointer from a OSSL_DISPATCH(3) element named
**OSSL_FUNC_{name}**.

OSSL_DISPATCH(3) arrays are indexed by numbers that are provided as
macros in openssl-core_dispatch.h(7), as follows:

```c
OSSL_FUNC_skeymgmt_free                 OSSL_FUNC_SKEYMGMT_FREE

OSSL_FUNC_skeymgmt_import               OSSL_FUNC_SKEYMGMT_IMPORT
OSSL_FUNC_skeymgmt_export               OSSL_FUNC_SKEYMGMT_EXPORT

OSSL_FUNC_skeymgmt_generate             OSSL_FUNC_SKEYMGMT_GENERATE

OSSL_FUNC_skeymgmt_get_key_id           OSSL_FUNC_SKEYMGMT_GET_KEY_ID
OSSL_FUNC_skeymgmt_imp_settable_params  OSSL_FUNC_SKEYMGMT_IMP_SETTABLE_PARAMS
OSSL_FUNC_skeymgmt_gen_settable_params  OSSL_FUNC_SKEYMGMT_GEN_SETTABLE_PARAMS

```

The SKEYMGMT management is inspired by KEYMGMT but is simpler.

### Key Objects


A key object is a collection of data for an symmetric key, and is
represented as `keydata` in this manual.

The exact contents of a key object are defined by the provider, and it
is assumed that different operations in one and the same provider use
the exact same structure to represent this collection of data, so that
for example, a key object that has been created using the SKEYMGMT
interface can be passed as is to other algorithms from the same provider
operations, such as OSSL_FUNC_mac_init_opaque() (see
provider-mac(7)).

With the export SKEYMGMT function, it's possible to select a specific
subset of data to handle, governed by the bits in a `selection`
indicator.  The bits are:


- **OSSL_SKEYMGMT_SELECT_SECRET_KEY**

Indicating that the secret key raw bytes in a key object should be
included.

- **OSSL_SKEYMGMT_SELECT_PARAMETERS**

Indicating that the parameters in a key object should be
included.


Combined selector bits are also defined for easier use:


- **OSSL_SKEYMGMT_SELECT_ALL**

Indicating that everything in a key object should be included.


The exact interpretation of those bits or how they combine is left to
each function where you can specify a selector.

### Destructing Function


OSSL_FUNC_skeymgmt_free() should free the passed `keydata`.

### Key Object Import and Export Functions


OSSL_FUNC_skeymgmt_import() should import data into `keydata` with values
taken from the OSSL_PARAM(3) array `params`. It allocates the `keydata`
object (there is no separate allocation function).

OSSL_FUNC_skeymgmt_imp_settable_params() returns a list of parameters that can
be provided to the OSSL_FUNC_skeymgmt_import() function.

OSSL_FUNC_skeymgmt_export() should extract values indicated by `selection`
from `keydata`, create an OSSL_PARAM(3) array with them and call
`param_cb` with that array as well as the given `cbarg`.
The passed OSSL_PARAM(3) array is transient and is freed upon the return from `param_cb`.

### Key Object Generation Functions


OSSL_FUNC_skeymgmt_generate() creates a new key according to the values
taken from the OSSL_PARAM(3) array `params`. It allocates the `keydata`
object.

OSSL_FUNC_skeymgmt_gen_settable_params() returns a list of parameters that can
be provided to the OSSL_FUNC_skeymgmt_generate() function.

### Key Object Information functions


OSSL_FUNC_skeymgmt_get_key_id() returns a NUL-terminated string identifying the
particular key. The returned string will be freed by a call to EVP_SKEY_free()
so callers need to copy it themselves if they want to preserve the value past
the key lifetime.  The purpose of this function is providing a printable string
that can help users to access the specific key.  The content of this string is
provider-specific.

### Common Import and Export Parameters


See OSSL_PARAM(3) for further details on the parameters structure.

Common information parameters currently recognised by built-in
skeymgmt algorithms are as follows:


- "raw-bytes" (**SKEY_PARAM_RAW_BYTES**) <octet string>

The value represents symmetric key as a byte array.

- "key-length" (**SKEY_PARAM_KEY_LENGTH**) <integer>

The value is the byte length of the given key.


## RETURN VALUES


OSSL_FUNC_skeymgmt_import() and OSSL_FUNC_skeymgmt_generate() return a pointer
to an allocated object on success and NULL on error.

OSSL_FUNC_skeymgmt_export() returns 1 for success or 0 on error.

OSSL_FUNC_skeymgmt_get_key_id() returns a pointer to a 0-terminated string or NULL.

OSSL_FUNC_skeymgmt_gen_settable_params() and OSSL_FUNC_skeymgmt_imp_settable_params()
return references to an array of **OSSL_PARAM** which can be NULL if there are
no settable parameters.

## SEE ALSO


provider(7), EVP_SKEY(3), EVP_KEYMGMT(3)

## HISTORY


The SKEYMGMT interface was introduced in OpenSSL 3.5.

## COPYRIGHT


Copyright 2024-2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/provider-skeymgmt.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/provider-skeymgmt.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/provider-skeymgmt.pod`；SHA-256：`f2ab4fbe6995b908391cd1c42842b18d0eea9dfcbfeacc3d3c21e12cdf620bc4`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
