---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-provider-asym-cipher",
  "title": "OpenSSL：Provider 架构 · provider-asym_cipher（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "Provider",
    "算法实现",
    "openssl",
    "provider-asym_cipher"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "6dac592b69dd6752a59f3fec2030fb052eab6424848bdf209eeae73187b8a7da",
  "generatedHash": "0ced21d85e1d1c84aea972c7ca6d3fb84ca5093c373783771af714e7a3c57946",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Provider 架构：provider-asym_cipher - The asym_cipher library <-> provider functions",
  "l1": "This documentation is primarily aimed at provider authors. See provider(7) for further information. The asymmetric cipher (OSSL_OP_ASYM_CIPHER) operation enables providers to implement asymmetric cipher algorithms and make them available to applications via the API functions EVP_PKEY_encrypt(3), EVP_PKEY_decrypt(3) and other related functions). All \"functions\" mentioned here are passed as function pointers between `libcrypto` and the provider in OSSL_DISPATCH(3) arrays via OSSL_ALGORITHM(3) arrays that are returned by the provider's provider_query_operation() function (see provider-base(7)/Provider Functions). All these \"functions\" have a corresponding function type definition named **OSSL_FUNC_{name}_fn**, and a helper function to retrieve the function pointer from an OSSL_DISPATCH(3) element named **OSSL_FUNC_{name}**. For example, the ",
  "questions": [
    "provider-asym_cipher 如何用于Provider 架构？",
    "provider-asym_cipher 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-provider-asym-cipher",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/provider-asym_cipher.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：Provider 架构 · provider-asym_cipher（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：Provider 架构。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

provider-asym_cipher - The asym_cipher library <-> provider functions

## 技术正文

## NAME


provider-asym_cipher - The asym_cipher library <-> provider functions

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
void *OSSL_FUNC_asym_cipher_newctx(void *provctx);
void OSSL_FUNC_asym_cipher_freectx(void *ctx);
void *OSSL_FUNC_asym_cipher_dupctx(void *ctx);

/* Encryption */
int OSSL_FUNC_asym_cipher_encrypt_init(void *ctx, void *provkey,
                                       const OSSL_PARAM params[]);
int OSSL_FUNC_asym_cipher_encrypt(void *ctx, unsigned char *out, size_t *outlen,
                                  size_t outsize, const unsigned char *in,
                                  size_t inlen);

/* Decryption */
int OSSL_FUNC_asym_cipher_decrypt_init(void *ctx, void *provkey,
                                       const OSSL_PARAM params[]);
int OSSL_FUNC_asym_cipher_decrypt(void *ctx, unsigned char *out, size_t *outlen,
                                  size_t outsize, const unsigned char *in,
                                  size_t inlen);

/* Asymmetric Cipher parameters */
int OSSL_FUNC_asym_cipher_get_ctx_params(void *ctx, OSSL_PARAM params[]);
const OSSL_PARAM *OSSL_FUNC_asym_cipher_gettable_ctx_params(void *provctx);
int OSSL_FUNC_asym_cipher_set_ctx_params(void *ctx, const OSSL_PARAM params[]);
const OSSL_PARAM *OSSL_FUNC_asym_cipher_settable_ctx_params(void *provctx);

```

## DESCRIPTION


This documentation is primarily aimed at provider authors. See provider(7)
for further information.

The asymmetric cipher (OSSL_OP_ASYM_CIPHER) operation enables providers to
implement asymmetric cipher algorithms and make them available to applications
via the API functions EVP_PKEY_encrypt(3),
EVP_PKEY_decrypt(3) and
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
For example, the "function" OSSL_FUNC_asym_cipher_newctx() has these:

```c
typedef void *(OSSL_FUNC_asym_cipher_newctx_fn)(void *provctx);
static ossl_inline OSSL_FUNC_asym_cipher_newctx_fn
    OSSL_FUNC_asym_cipher_newctx(const OSSL_DISPATCH *opf);

```

OSSL_DISPATCH(3) arrays are indexed by numbers that are provided as
macros in openssl-core_dispatch.h(7), as follows:

```c
OSSL_FUNC_asym_cipher_newctx               OSSL_FUNC_ASYM_CIPHER_NEWCTX
OSSL_FUNC_asym_cipher_freectx              OSSL_FUNC_ASYM_CIPHER_FREECTX
OSSL_FUNC_asym_cipher_dupctx               OSSL_FUNC_ASYM_CIPHER_DUPCTX

OSSL_FUNC_asym_cipher_encrypt_init         OSSL_FUNC_ASYM_CIPHER_ENCRYPT_INIT
OSSL_FUNC_asym_cipher_encrypt              OSSL_FUNC_ASYM_CIPHER_ENCRYPT

OSSL_FUNC_asym_cipher_decrypt_init         OSSL_FUNC_ASYM_CIPHER_DECRYPT_INIT
OSSL_FUNC_asym_cipher_decrypt              OSSL_FUNC_ASYM_CIPHER_DECRYPT

OSSL_FUNC_asym_cipher_get_ctx_params       OSSL_FUNC_ASYM_CIPHER_GET_CTX_PARAMS
OSSL_FUNC_asym_cipher_gettable_ctx_params  OSSL_FUNC_ASYM_CIPHER_GETTABLE_CTX_PARAMS
OSSL_FUNC_asym_cipher_set_ctx_params       OSSL_FUNC_ASYM_CIPHER_SET_CTX_PARAMS
OSSL_FUNC_asym_cipher_settable_ctx_params  OSSL_FUNC_ASYM_CIPHER_SETTABLE_CTX_PARAMS

```

An asymmetric cipher algorithm implementation may not implement all of these
functions.
In order to be a consistent set of functions a provider must implement
OSSL_FUNC_asym_cipher_newctx and OSSL_FUNC_asym_cipher_freectx.
It must also implement both of OSSL_FUNC_asym_cipher_encrypt_init and
OSSL_FUNC_asym_cipher_encrypt, or both of OSSL_FUNC_asym_cipher_decrypt_init and
OSSL_FUNC_asym_cipher_decrypt.
OSSL_FUNC_asym_cipher_get_ctx_params is optional but if it is present then so must
OSSL_FUNC_asym_cipher_gettable_ctx_params.
Similarly, OSSL_FUNC_asym_cipher_set_ctx_params is optional but if it is present then
so must OSSL_FUNC_asym_cipher_settable_ctx_params.

An asymmetric cipher algorithm must also implement some mechanism for generating,
loading or importing keys via the key management (OSSL_OP_KEYMGMT) operation.
See provider-keymgmt(7) for further details.

### Context Management Functions


OSSL_FUNC_asym_cipher_newctx() should create and return a pointer to a provider side
structure for holding context information during an asymmetric cipher operation.
A pointer to this context will be passed back in a number of the other
asymmetric cipher operation function calls.
The parameter `provctx` is the provider context generated during provider
initialisation (see provider(7)).

OSSL_FUNC_asym_cipher_freectx() is passed a pointer to the provider side asymmetric
cipher context in the `ctx` parameter.
This function should free any resources associated with that context.

OSSL_FUNC_asym_cipher_dupctx() should duplicate the provider side asymmetric cipher
context in the `ctx` parameter and return the duplicate copy.

### Encryption Functions


OSSL_FUNC_asym_cipher_encrypt_init() initialises a context for an asymmetric encryption
given a provider side asymmetric cipher context in the `ctx` parameter, and a
pointer to a provider key object in the `provkey` parameter.
The `params`, if not NULL, should be set on the context in a manner similar to
using OSSL_FUNC_asym_cipher_set_ctx_params().
The key object should have been previously generated, loaded or imported into
the provider using the key management (OSSL_OP_KEYMGMT) operation (see provider-keymgmt(7)).
OSSL_FUNC_asym_cipher_encrypt() performs the actual encryption itself.
A previously initialised asymmetric cipher context is passed in the `ctx`
parameter.
The data to be encrypted is pointed to by the `in` parameter which is `inlen`
bytes long.
Unless `out` is NULL, the encrypted data should be written to the location
pointed to by the `out` parameter and it should not exceed `outsize` bytes in
length.
The length of the encrypted data should be written to `*outlen`.
If `out` is NULL then the maximum length of the encrypted data should be
written to `*outlen`.

### Decryption Functions


OSSL_FUNC_asym_cipher_decrypt_init() initialises a context for an asymmetric decryption
given a provider side asymmetric cipher context in the `ctx` parameter, and a
pointer to a provider key object in the `provkey` parameter.
The `params`, if not NULL, should be set on the context in a manner similar to
using OSSL_FUNC_asym_cipher_set_ctx_params().
The key object should have been previously generated, loaded or imported into
the provider using the key management (OSSL_OP_KEYMGMT) operation (see
provider-keymgmt(7)).

OSSL_FUNC_asym_cipher_decrypt() performs the actual decryption itself.
A previously initialised asymmetric cipher context is passed in the `ctx`
parameter.
The data to be decrypted is pointed to by the `in` parameter which is `inlen`
bytes long.
Unless `out` is NULL, the decrypted data should be written to the location
pointed to by the `out` parameter and it should not exceed `outsize` bytes in
length.
The length of the decrypted data should be written to `*outlen`.
If `out` is NULL then the maximum length of the decrypted data should be
written to `*outlen`.

### Asymmetric Cipher Parameters


See OSSL_PARAM(3) for further details on the parameters structure used by
the OSSL_FUNC_asym_cipher_get_ctx_params() and OSSL_FUNC_asym_cipher_set_ctx_params()
functions.

OSSL_FUNC_asym_cipher_get_ctx_params() gets asymmetric cipher parameters associated
with the given provider side asymmetric cipher context `ctx` and stores them in
`params`.
Passing NULL for `params` should return true.

OSSL_FUNC_asym_cipher_set_ctx_params() sets the asymmetric cipher parameters associated
with the given provider side asymmetric cipher context `ctx` to `params`.
Any parameter settings are additional to any that were previously set.
Passing NULL for `params` should return true.

Parameters currently recognised by built-in asymmetric cipher algorithms are as
follows.
Not all parameters are relevant to, or are understood by all asymmetric cipher
algorithms:


- "pad-mode" (**OSSL_ASYM_CIPHER_PARAM_PAD_MODE**) <UTF8 string> OR <integer>

The type of padding to be used. The interpretation of this value will depend
on the algorithm in use.

- "digest" (**OSSL_ASYM_CIPHER_PARAM_OAEP_DIGEST**) <UTF8 string>

Gets or sets the name of the OAEP digest algorithm used when OAEP padding is in
use.

- "digest" (**OSSL_ASYM_CIPHER_PARAM_DIGEST**) <UTF8 string>

Gets or sets the name of the digest algorithm used by the algorithm (where
applicable).

- "digest-props" (**OSSL_ASYM_CIPHER_PARAM_OAEP_DIGEST_PROPS**) <UTF8 string>

Gets or sets the properties to use when fetching the OAEP digest algorithm.

- "digest-props" (**OSSL_ASYM_CIPHER_PARAM_DIGEST_PROPS**) <UTF8 string>

Gets or sets the properties to use when fetching the cipher digest algorithm.

- "mgf1-digest" (**OSSL_ASYM_CIPHER_PARAM_MGF1_DIGEST**) <UTF8 string>

Gets or sets the name of the MGF1 digest algorithm used when OAEP or PSS padding
is in use.

- "mgf1-digest-props" (**OSSL_ASYM_CIPHER_PARAM_MGF1_DIGEST_PROPS**) <UTF8 string>

Gets or sets the properties to use when fetching the MGF1 digest algorithm.

- "oaep-label" (**OSSL_ASYM_CIPHER_PARAM_OAEP_LABEL**) <octet string ptr>

Gets the OAEP label used when OAEP padding is in use.

- "oaep-label" (**OSSL_ASYM_CIPHER_PARAM_OAEP_LABEL**) <octet string>

Sets the OAEP label used when OAEP padding is in use.

- "tls-client-version" (**OSSL_ASYM_CIPHER_PARAM_TLS_CLIENT_VERSION**) <unsigned integer>

The TLS protocol version first requested by the client.

- "tls-negotiated-version" (**OSSL_ASYM_CIPHER_PARAM_TLS_CLIENT_VERSION**) <unsigned integer>

The negotiated TLS protocol version.

- "implicit-rejection" (**OSSL_ASYM_CIPHER_PARAM_IMPLICIT_REJECTION**) <unsigned integer>

Gets or sets the use of the implicit rejection mechanism for RSA PKCS#1 v1.5
decryption. When set (non zero value), the decryption API will return
a deterministically random value if the PKCS#1 v1.5 padding check fails.
This makes exploitation of the Bleichenbacher significantly harder, even
if the code using the RSA decryption API is not implemented in side-channel
free manner. Set by default in OpenSSL providers.


The OpenSSL FIPS provider also supports the following parameters:


- "fips-indicator" (**OSSL_ASYM_CIPHER_PARAM_FIPS_APPROVED_INDICATOR**) <integer>

A getter that returns 1 if the operation is FIPS approved, or 0 otherwise.
This may be used after calling either OSSL_FUNC_asym_cipher_encrypt() or
OSSL_FUNC_asym_cipher_decrypt(). It may return 0 if "key-check" is set to 0.

- "key-check" (**OSSL_ASYM_CIPHER_PARAM_FIPS_KEY_CHECK**) <integer>

If required this parameter should be set using either
OSSL_FUNC_asym_cipher_encrypt_init() or OSSL_FUNC_asym_cipher_decrypt_init().
The default value of 1 causes an error during the init if the key is not FIPS
approved (e.g. The key has a security strength of less than 112 bits). Setting
this to 0 will ignore the error and set the approved "fips-indicator" to 0.
This option breaks FIPS compliance if it causes the approved "fips-indicator"
to return 0.


OSSL_FUNC_asym_cipher_gettable_ctx_params() and OSSL_FUNC_asym_cipher_settable_ctx_params()
get a constant OSSL_PARAM(3) array that describes the gettable and settable
parameters, i.e. parameters that can be used with OSSL_FUNC_asym_cipherget_ctx_params()
and OSSL_FUNC_asym_cipher_set_ctx_params() respectively.

## RETURN VALUES


OSSL_FUNC_asym_cipher_newctx() and OSSL_FUNC_asym_cipher_dupctx() should return the newly
created provider side asymmetric cipher context, or NULL on failure.

All other functions should return 1 for success or 0 on error.

## SEE ALSO


provider(7)

## HISTORY


The provider ASYM_CIPHER interface was introduced in OpenSSL 3.0.
The Asymmetric Cipher Parameters "fips-indicator" and "key-check"
were added in OpenSSL 3.4.

## COPYRIGHT


Copyright 2019-2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/provider-asym_cipher.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/provider-asym_cipher.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/provider-asym_cipher.pod`；SHA-256：`6dac592b69dd6752a59f3fec2030fb052eab6424848bdf209eeae73187b8a7da`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
