---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-provider-keyexch",
  "title": "OpenSSL：Provider 架构 · provider-keyexch（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "Provider",
    "算法实现",
    "openssl",
    "provider-keyexch"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "3ea051f599b6e95c8d07579dfc5e9a0766f44b051dcbe804930cb696472c2ac7",
  "generatedHash": "3809b2ed3a4a67b03796e61839eebe3230744e8e77461d20d0f4fa416cccf8f4",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Provider 架构：provider-keyexch - The keyexch library <-> provider functions",
  "l1": "This documentation is primarily aimed at provider authors. See provider(7) for further information. The key exchange (OSSL_OP_KEYEXCH) operation enables providers to implement key exchange algorithms and make them available to applications via EVP_PKEY_derive(3) and other related functions). All \"functions\" mentioned here are passed as function pointers between `libcrypto` and the provider in OSSL_DISPATCH(3) arrays via OSSL_ALGORITHM(3) arrays that are returned by the provider's provider_query_operation() function (see provider-base(7)/Provider Functions). All these \"functions\" have a corresponding function type definition named **OSSL_FUNC_{name}_fn**, and a helper function to retrieve the function pointer from an OSSL_DISPATCH(3) element named **OSSL_FUNC_{name}**. For example, the \"function\" OSSL_FUNC_keyexch_newctx() has these: typed",
  "questions": [
    "provider-keyexch 如何用于Provider 架构？",
    "provider-keyexch 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-provider-keyexch",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/provider-keyexch.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：Provider 架构 · provider-keyexch（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：Provider 架构。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

provider-keyexch - The keyexch library <-> provider functions

## 技术正文

## NAME


provider-keyexch - The keyexch library <-> provider functions

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
void *OSSL_FUNC_keyexch_newctx(void *provctx);
void OSSL_FUNC_keyexch_freectx(void *ctx);
void *OSSL_FUNC_keyexch_dupctx(void *ctx);

/* Shared secret derivation */
int OSSL_FUNC_keyexch_init(void *ctx, void *provkey,
                           const OSSL_PARAM params[]);
int OSSL_FUNC_keyexch_set_peer(void *ctx, void *provkey);
int OSSL_FUNC_keyexch_derive(void *ctx, unsigned char *secret, size_t *secretlen,
                             size_t outlen);

/* Key Exchange parameters */
int OSSL_FUNC_keyexch_set_ctx_params(void *ctx, const OSSL_PARAM params[]);
const OSSL_PARAM *OSSL_FUNC_keyexch_settable_ctx_params(void *ctx,
                                                        void *provctx);
int OSSL_FUNC_keyexch_get_ctx_params(void *ctx, OSSL_PARAM params[]);
const OSSL_PARAM *OSSL_FUNC_keyexch_gettable_ctx_params(void *ctx,
                                                        void *provctx);

```

## DESCRIPTION


This documentation is primarily aimed at provider authors. See provider(7)
for further information.

The key exchange (OSSL_OP_KEYEXCH) operation enables providers to implement key
exchange algorithms and make them available to applications via
EVP_PKEY_derive(3) and
other related functions).

All "functions" mentioned here are passed as function pointers between
`libcrypto` and the provider in OSSL_DISPATCH(3) arrays via
OSSL_ALGORITHM(3) arrays that are returned by the provider's
provider_query_operation() function
(see provider-base(7)/Provider Functions).

All these "functions" have a corresponding function type definition
named **OSSL_FUNC_{name}_fn**, and a helper function to retrieve the
function pointer from an OSSL_DISPATCH(3) element named
**OSSL_FUNC_{name}**.
For example, the "function" OSSL_FUNC_keyexch_newctx() has these:

```c
typedef void *(OSSL_FUNC_keyexch_newctx_fn)(void *provctx);
static ossl_inline OSSL_FUNC_keyexch_newctx_fn
    OSSL_FUNC_keyexch_newctx(const OSSL_DISPATCH *opf);

```

OSSL_DISPATCH(3) arrays are indexed by numbers that are provided as
macros in openssl-core_dispatch.h(7), as follows:

```c
OSSL_FUNC_keyexch_newctx                OSSL_FUNC_KEYEXCH_NEWCTX
OSSL_FUNC_keyexch_freectx               OSSL_FUNC_KEYEXCH_FREECTX
OSSL_FUNC_keyexch_dupctx                OSSL_FUNC_KEYEXCH_DUPCTX

OSSL_FUNC_keyexch_init                  OSSL_FUNC_KEYEXCH_INIT
OSSL_FUNC_keyexch_set_peer              OSSL_FUNC_KEYEXCH_SET_PEER
OSSL_FUNC_keyexch_derive                OSSL_FUNC_KEYEXCH_DERIVE

OSSL_FUNC_keyexch_set_ctx_params        OSSL_FUNC_KEYEXCH_SET_CTX_PARAMS
OSSL_FUNC_keyexch_settable_ctx_params   OSSL_FUNC_KEYEXCH_SETTABLE_CTX_PARAMS
OSSL_FUNC_keyexch_get_ctx_params        OSSL_FUNC_KEYEXCH_GET_CTX_PARAMS
OSSL_FUNC_keyexch_gettable_ctx_params   OSSL_FUNC_KEYEXCH_GETTABLE_CTX_PARAMS

```

A key exchange algorithm implementation may not implement all of these functions.
In order to be a consistent set of functions a provider must implement
OSSL_FUNC_keyexch_newctx, OSSL_FUNC_keyexch_freectx, OSSL_FUNC_keyexch_init and OSSL_FUNC_keyexch_derive.
All other functions are optional.

A key exchange algorithm must also implement some mechanism for generating,
loading or importing keys via the key management (OSSL_OP_KEYMGMT) operation.
See provider-keymgmt(7) for further details.

### Context Management Functions


OSSL_FUNC_keyexch_newctx() should create and return a pointer to a provider side
structure for holding context information during a key exchange operation.
A pointer to this context will be passed back in a number of the other key
exchange operation function calls.
The parameter `provctx` is the provider context generated during provider
initialisation (see provider(7)).

OSSL_FUNC_keyexch_freectx() is passed a pointer to the provider side key exchange
context in the `ctx` parameter.
This function should free any resources associated with that context.

OSSL_FUNC_keyexch_dupctx() should duplicate the provider side key exchange context in
the `ctx` parameter and return the duplicate copy.

### Shared Secret Derivation Functions


OSSL_FUNC_keyexch_init() initialises a key exchange operation given a provider side key
exchange context in the `ctx` parameter, and a pointer to a provider key object
in the `provkey` parameter.
The `params`, if not NULL, should be set on the context in a manner similar to
using OSSL_FUNC_keyexch_set_params().
The key object should have been previously
generated, loaded or imported into the provider using the key management
(OSSL_OP_KEYMGMT) operation (see provider-keymgmt(7)>.

OSSL_FUNC_keyexch_set_peer() is called to supply the peer's public key (in the
`provkey` parameter) to be used when deriving the shared secret.
It is also passed a previously initialised key exchange context in the `ctx`
parameter.
The key object should have been previously generated, loaded or imported into
the provider using the key management (OSSL_OP_KEYMGMT) operation (see
provider-keymgmt(7)>.

OSSL_FUNC_keyexch_derive() performs the actual key exchange itself by deriving a shared
secret.
A previously initialised key exchange context is passed in the `ctx`
parameter.
The derived secret should be written to the location `secret` which should not
exceed `outlen` bytes.
The length of the shared secret should be written to `*secretlen`.
If `secret` is NULL then the maximum length of the shared secret should be
written to `*secretlen`.

### Key Exchange Parameters Functions


OSSL_FUNC_keyexch_set_ctx_params() sets key exchange parameters associated with the
given provider side key exchange context `ctx` to `params`,
see /Common Key Exchange parameters.
Any parameter settings are additional to any that were previously set.
Passing NULL for `params` should return true.

OSSL_FUNC_keyexch_get_ctx_params() gets key exchange parameters associated with the
given provider side key exchange context `ctx` into `params`,
see /Common Key Exchange parameters.
Passing NULL for `params` should return true.

OSSL_FUNC_keyexch_settable_ctx_params() yields a constant OSSL_PARAM(3) array that
describes the settable parameters, i.e. parameters that can be used with
OP_signature_set_ctx_params().
If OSSL_FUNC_keyexch_settable_ctx_params() is present, OSSL_FUNC_keyexch_set_ctx_params() must
also be present, and vice versa.
Similarly, OSSL_FUNC_keyexch_gettable_ctx_params() yields a constant OSSL_PARAM(3)
array that describes the gettable parameters, i.e. parameters that can be
handled by OP_signature_get_ctx_params().
If OSSL_FUNC_keyexch_gettable_ctx_params() is present, OSSL_FUNC_keyexch_get_ctx_params() must
also be present, and vice versa.

Notice that not all settable parameters are also gettable, and vice versa.

### Common Key Exchange parameters


See OSSL_PARAM(3) for further details on the parameters structure used by
the OSSL_FUNC_keyexch_set_ctx_params() and OSSL_FUNC_keyexch_get_ctx_params() functions.

Common parameters currently recognised by built-in key exchange algorithms are
as follows.


- "kdf-type" (**OSSL_EXCHANGE_PARAM_KDF_TYPE**) <UTF8 string>

Sets or gets the Key Derivation Function type to apply within the associated key
exchange ctx.

- "kdf-digest" (**OSSL_EXCHANGE_PARAM_KDF_DIGEST**) <UTF8 string>

Sets or gets the Digest algorithm to be used as part of the Key Derivation Function
associated with the given key exchange ctx.

- "kdf-digest-props" (**OSSL_EXCHANGE_PARAM_KDF_DIGEST_PROPS**) <UTF8 string>

Sets properties to be used upon look up of the implementation for the selected
Digest algorithm for the Key Derivation Function associated with the given key
exchange ctx.

- "kdf-outlen" (**OSSL_EXCHANGE_PARAM_KDF_OUTLEN**) <unsigned integer>

Sets or gets the desired size for the output of the chosen Key Derivation Function
associated with the given key exchange ctx.
The length of the "kdf-outlen" parameter should not exceed that of a **size_t**.

- "kdf-ukm" (**OSSL_EXCHANGE_PARAM_KDF_UKM**) <octet string>

Sets the User Key Material to be used as part of the selected Key Derivation
Function associated with the given key exchange ctx.

- "kdf-ukm" (**OSSL_EXCHANGE_PARAM_KDF_UKM**) <octet string ptr>

Gets a pointer to the User Key Material to be used as part of the selected
Key Derivation Function associated with the given key exchange ctx. Providers
usually do not need to support this gettable parameter as its sole purpose
is to support functionality of the deprecated EVP_PKEY_CTX_get0_ecdh_kdf_ukm()
and EVP_PKEY_CTX_get0_dh_kdf_ukm() functions.


The OpenSSL FIPS provider also supports the following parameters:


- "fips-indicator" (**OSSL_EXCHANGE_PARAM_FIPS_APPROVED_INDICATOR**) <integer>

A getter that returns 1 if the operation is FIPS approved, or 0 otherwise.
This may be used after calling OSSL_FUNC_keyexch_derive(). It may
return 0 if either the "digest-check" or the "key-check" are set to 0.

- "key-check" (**OSSL_EXCHANGE_PARAM_FIPS_KEY_CHECK**) <integer>

If required this parameter should be set using OSSL_FUNC_keyexch_init().
The default value of 1 causes an error during the init if the key is not FIPS
approved (e.g. The key has a security strength of less than 112 bits). Setting
this to 0 will ignore the error and set the approved "fips-indicator" to 0.
This option breaks FIPS compliance if it causes the approved "fips-indicator"
to return 0.

- "digest-check" (**OSSL_EXCHANGE_PARAM_FIPS_DIGEST_CHECK**) <integer>

If required this parameter should be set before any optional digest is set.
The default value of 1 causes an error when the digest is set if the digest is
not FIPS approved. Setting this to 0 will ignore the error and set the
approved "fips-indicator" to 0.
This option breaks FIPS compliance if it causes the approved "fips-indicator"
to return 0.


## RETURN VALUES


OSSL_FUNC_keyexch_newctx() and OSSL_FUNC_keyexch_dupctx() should return the newly created
provider side key exchange context, or NULL on failure.

OSSL_FUNC_keyexch_init(), OSSL_FUNC_keyexch_set_peer(), OSSL_FUNC_keyexch_derive(),
OSSL_FUNC_keyexch_set_params(), and OSSL_FUNC_keyexch_get_params() should return 1 for success
or 0 on error.

OSSL_FUNC_keyexch_settable_ctx_params() and OSSL_FUNC_keyexch_gettable_ctx_params() should
always return a constant OSSL_PARAM(3) array.

## SEE ALSO


provider(7)

## HISTORY


The provider KEYEXCH interface was introduced in OpenSSL 3.0.

The Key Exchange Parameters "fips-indicator", "key-check" and "digest-check"
were added in OpenSSL 3.4.

## COPYRIGHT


Copyright 2019-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/provider-keyexch.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/provider-keyexch.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/provider-keyexch.pod`；SHA-256：`3ea051f599b6e95c8d07579dfc5e9a0766f44b051dcbe804930cb696472c2ac7`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
