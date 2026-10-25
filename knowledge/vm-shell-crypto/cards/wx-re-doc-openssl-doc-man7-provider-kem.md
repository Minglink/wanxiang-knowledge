---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-provider-kem",
  "title": "OpenSSL：Provider 架构 · provider-kem（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "Provider",
    "算法实现",
    "openssl",
    "provider-kem"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "20333d8359eeab629195f8d0a9ff9759b8c8db76a1e607edca20575302283b90",
  "generatedHash": "119621d9d4cdff589a7e229d23a91076db4da668b7c97b519f60f8099927e859",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Provider 架构：provider-kem - The kem library <-> provider functions",
  "l1": "This documentation is primarily aimed at provider authors. See provider(7) for further information. The asymmetric kem (OSSL_OP_KEM) operation enables providers to implement asymmetric kem algorithms and make them available to applications via the API functions EVP_PKEY_encapsulate(3), EVP_PKEY_decapsulate(3) and other related functions. All \"functions\" mentioned here are passed as function pointers between `libcrypto` and the provider in OSSL_DISPATCH(3) arrays via OSSL_ALGORITHM(3) arrays that are returned by the provider's provider_query_operation() function (see provider-base(7)/Provider Functions). All these \"functions\" have a corresponding function type definition named **OSSL_FUNC_{name}_fn**, and a helper function to retrieve the function pointer from an OSSL_DISPATCH(3) element named **OSSL_FUNC_{name}**. For example, the \"functi",
  "questions": [
    "provider-kem 如何用于Provider 架构？",
    "provider-kem 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-provider-kem",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/provider-kem.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：Provider 架构 · provider-kem（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：Provider 架构。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

provider-kem - The kem library <-> provider functions

## 技术正文

## NAME


provider-kem - The kem library <-> provider functions

## SYNOPSIS



```c
#include <openssl/core_dispatch.h>
#include <openssl/core_names.h>

/*
 * None of these are actual functions, but are displayed like this for
 * the function signatures for functions that are offered as function
 * pointers in OSSL_DISPATCH arrays.
 */

/* Context management */
void *OSSL_FUNC_kem_newctx(void *provctx);
void OSSL_FUNC_kem_freectx(void *ctx);
void *OSSL_FUNC_kem_dupctx(void *ctx);

/* Encapsulation */
int OSSL_FUNC_kem_encapsulate_init(void *ctx, void *provkey,
                                   const OSSL_PARAM params[]);
int OSSL_FUNC_kem_auth_encapsulate_init(void *ctx, void *provkey,
                                        void *provauthkey,
                                        const OSSL_PARAM params[]);
int OSSL_FUNC_kem_encapsulate(void *ctx, unsigned char *out, size_t *outlen,
                              unsigned char *secret, size_t *secretlen);

/* Decapsulation */
int OSSL_FUNC_kem_decapsulate_init(void *ctx, void *provkey);
int OSSL_FUNC_kem_auth_decapsulate_init(void *ctx, void *provkey,
                                        void *provauthkey,
                                        const OSSL_PARAM params[]);
int OSSL_FUNC_kem_decapsulate(void *ctx, unsigned char *out, size_t *outlen,
                              const unsigned char *in, size_t inlen);

/* KEM parameters */
int OSSL_FUNC_kem_get_ctx_params(void *ctx, OSSL_PARAM params[]);
const OSSL_PARAM *OSSL_FUNC_kem_gettable_ctx_params(void *ctx, void *provctx);
int OSSL_FUNC_kem_set_ctx_params(void *ctx, const OSSL_PARAM params[]);
const OSSL_PARAM *OSSL_FUNC_kem_settable_ctx_params(void *ctx, void *provctx);

```

## DESCRIPTION


This documentation is primarily aimed at provider authors. See provider(7)
for further information.

The asymmetric kem (OSSL_OP_KEM) operation enables providers to
implement asymmetric kem algorithms and make them available to applications
via the API functions EVP_PKEY_encapsulate(3),
EVP_PKEY_decapsulate(3) and other related functions.

All "functions" mentioned here are passed as function pointers between
`libcrypto` and the provider in OSSL_DISPATCH(3) arrays via
OSSL_ALGORITHM(3) arrays that are returned by the provider's
provider_query_operation() function
(see provider-base(7)/Provider Functions).

All these "functions" have a corresponding function type definition
named **OSSL_FUNC_{name}_fn**, and a helper function to retrieve the
function pointer from an OSSL_DISPATCH(3) element named
**OSSL_FUNC_{name}**.
For example, the "function" OSSL_FUNC_kem_newctx() has these:

```c
typedef void *(OSSL_FUNC_kem_newctx_fn)(void *provctx);
static ossl_inline OSSL_FUNC_kem_newctx_fn
    OSSL_FUNC_kem_newctx(const OSSL_DISPATCH *opf);

```

OSSL_DISPATCH(3) arrays are indexed by numbers that are provided as
macros in openssl-core_dispatch.h(7), as follows:

```c
OSSL_FUNC_kem_newctx                OSSL_FUNC_KEM_NEWCTX
OSSL_FUNC_kem_freectx               OSSL_FUNC_KEM_FREECTX
OSSL_FUNC_kem_dupctx                OSSL_FUNC_KEM_DUPCTX

OSSL_FUNC_kem_encapsulate_init      OSSL_FUNC_KEM_ENCAPSULATE_INIT
OSSL_FUNC_kem_auth_encapsulate_init OSSL_FUNC_KEM_AUTH_ENCAPSULATE_INIT
OSSL_FUNC_kem_encapsulate           OSSL_FUNC_KEM_ENCAPSULATE

OSSL_FUNC_kem_decapsulate_init      OSSL_FUNC_KEM_DECAPSULATE_INIT
OSSL_FUNC_kem_auth_decapsulate_init OSSL_FUNC_KEM_AUTH_DECAPSULATE_INIT
OSSL_FUNC_kem_decapsulate           OSSL_FUNC_KEM_DECAPSULATE

OSSL_FUNC_kem_get_ctx_params        OSSL_FUNC_KEM_GET_CTX_PARAMS
OSSL_FUNC_kem_gettable_ctx_params   OSSL_FUNC_KEM_GETTABLE_CTX_PARAMS
OSSL_FUNC_kem_set_ctx_params        OSSL_FUNC_KEM_SET_CTX_PARAMS
OSSL_FUNC_kem_settable_ctx_params   OSSL_FUNC_KEM_SETTABLE_CTX_PARAMS

```

An asymmetric kem algorithm implementation may not implement all of these
functions.
In order to be a consistent set of functions a provider must implement
OSSL_FUNC_kem_newctx and OSSL_FUNC_kem_freectx.
It must also implement both of OSSL_FUNC_kem_encapsulate_init and
OSSL_FUNC_kem_encapsulate, or both of OSSL_FUNC_kem_decapsulate_init and
OSSL_FUNC_kem_decapsulate.
OSSL_FUNC_kem_auth_encapsulate_init is optional but if it is present then so
must OSSL_FUNC_kem_auth_decapsulate_init.
OSSL_FUNC_kem_get_ctx_params is optional but if it is present then so must
OSSL_FUNC_kem_gettable_ctx_params.
Similarly, OSSL_FUNC_kem_set_ctx_params is optional but if it is present then
OSSL_FUNC_kem_settable_ctx_params must also be present.

An asymmetric kem algorithm must also implement some mechanism for generating,
loading or importing keys via the key management (OSSL_OP_KEYMGMT) operation.
See provider-keymgmt(7) for further details.

### Context Management Functions


OSSL_FUNC_kem_newctx() should create and return a pointer to a provider side
structure for holding context information during an asymmetric kem operation.
A pointer to this context will be passed back in a number of the other
asymmetric kem operation function calls.
The parameter `provctx` is the provider context generated during provider
initialisation (see provider(7)).

OSSL_FUNC_kem_freectx() is passed a pointer to the provider side asymmetric
kem context in the `ctx` parameter.
This function should free any resources associated with that context.

OSSL_FUNC_kem_dupctx() should duplicate the provider side asymmetric kem
context in the `ctx` parameter and return the duplicate copy.

### Asymmetric Key Encapsulation Functions


OSSL_FUNC_kem_encapsulate_init() initialises a context for an asymmetric
encapsulation given a provider side asymmetric kem context in the `ctx`
parameter, a pointer to a provider key object in the `provkey` parameter and
the `name` of the algorithm.
The `params`, if not NULL, should be set on the context in a manner similar to
using OSSL_FUNC_kem_set_ctx_params().
The key object should have been previously generated, loaded or imported into
the provider using the key management (OSSL_OP_KEYMGMT) operation (see
provider-keymgmt(7)>.

OSSL_FUNC_kem_auth_encapsulate_init() is similar to
OSSL_FUNC_kem_encapsulate_init(), but also passes an additional authentication
key `provauthkey` which cannot be NULL.

OSSL_FUNC_kem_encapsulate() performs the actual encapsulation itself.
A previously initialised asymmetric kem context is passed in the `ctx`
parameter.
Unless `out` is NULL, the data to be encapsulated is internally generated,
and returned into the buffer pointed to by the `secret` parameter and the
encapsulated data should also be written to the location pointed to by the
`out` parameter. The length of the encapsulated data should be written to
`*outlen` and the length of the generated secret should be written to
`*secretlen`.

If `out` is NULL then the maximum length of the encapsulated data should be
written to `*outlen`, and the maximum length of the generated secret should be
written to `*secretlen`.

### Decapsulation Functions


OSSL_FUNC_kem_decapsulate_init() initialises a context for an asymmetric
decapsulation given a provider side asymmetric kem context in the `ctx`
parameter, a pointer to a provider key object in the `provkey` parameter, and
a `name` of the algorithm.
The key object should have been previously generated, loaded or imported into
the provider using the key management (OSSL_OP_KEYMGMT) operation (see
provider-keymgmt(7)>.

OSSL_FUNC_kem_auth_decapsulate_init() is similar to
OSSL_FUNC_kem_decapsulate_init(), but also passes an additional authentication
key `provauthkey` which cannot be NULL.

OSSL_FUNC_kem_decapsulate() performs the actual decapsulation itself.
A previously initialised asymmetric kem context is passed in the `ctx`
parameter.
The data to be decapsulated is pointed to by the `in` parameter which is `inlen`
bytes long.
Unless `out` is NULL, the decapsulated data should be written to the location
pointed to by the `out` parameter.
The length of the decapsulated data should be written to `*outlen`.
If `out` is NULL then the maximum length of the decapsulated data should be
written to `*outlen`.

### Asymmetric Key Encapsulation Parameters


See OSSL_PARAM(3) for further details on the parameters structure used by
the OSSL_FUNC_kem_get_ctx_params() and OSSL_FUNC_kem_set_ctx_params()
functions.

The OpenSSL FIPS provider also supports the following parameters:


- "fips-indicator" (**OSSL_KEM_PARAM_FIPS_APPROVED_INDICATOR**) <integer>

A getter that returns 1 if the operation is FIPS approved, or 0 otherwise.
This may be used after calling either OSSL_FUNC_kem_encapsulate() or 
OSSL_FUNC_kem_decapsulate(). It may return 0 if the "key-check" is set to 0.

- "key-check" (**OSSL_KEM_PARAM_FIPS_KEY_CHECK**) <integer>

If required this parameter should be set using OSSL_FUNC_kem_encapsulate_init()
or OSSL_FUNC_kem_decapsulate_init().
The default value of 1 causes an error during the init if the key is not FIPS
approved (e.g. The key has a security strength of less than 112 bits). Setting
this to 0 will ignore the error and set the approved "fips-indicator" to 0.
This option breaks FIPS compliance if it causes the approved "fips-indicator"
to return 0.


### Asymmetric Key Encapsulation Parameter Functions


OSSL_FUNC_kem_get_ctx_params() gets asymmetric KEM parameters associated
with the given provider side asymmetric kem context `ctx` and stores them in
`params`.
Passing NULL for `params` should return true.

OSSL_FUNC_kem_set_ctx_params() sets the asymmetric KEM parameters associated
with the given provider side asymmetric kem context `ctx` to `params`.
Any parameter settings are additional to any that were previously set.
Passing NULL for `params` should return true.

No parameters are currently recognised by built-in asymmetric kem algorithms.

OSSL_FUNC_kem_gettable_ctx_params() and OSSL_FUNC_kem_settable_ctx_params()
get a constant OSSL_PARAM(3) array that describes the gettable and settable
parameters, i.e. parameters that can be used with OSSL_FUNC_kem_get_ctx_params()
and OSSL_FUNC_kem_set_ctx_params() respectively.

## RETURN VALUES


OSSL_FUNC_kem_newctx() and OSSL_FUNC_kem_dupctx() should return the newly
created provider side asymmetric kem context, or NULL on failure.

All other functions should return 1 for success or 0 on error.

## SEE ALSO


provider(7)

## HISTORY


The provider KEM interface was introduced in OpenSSL 3.0.

OSSL_FUNC_kem_auth_encapsulate_init() and OSSL_FUNC_kem_auth_decapsulate_init()
were added in OpenSSL 3.2.

The Asymmetric Key Encapsulation Parameters "fips-indicator" and "key-check"
were added in OpenSSL 3.4.

## COPYRIGHT


Copyright 2020-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/provider-kem.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/provider-kem.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/provider-kem.pod`；SHA-256：`20333d8359eeab629195f8d0a9ff9759b8c8db76a1e607edca20575302283b90`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
