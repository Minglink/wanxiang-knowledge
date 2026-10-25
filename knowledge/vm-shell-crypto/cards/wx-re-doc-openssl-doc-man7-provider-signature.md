---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-provider-signature",
  "title": "OpenSSL：Provider 架构 · provider-signature（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "Provider",
    "算法实现",
    "openssl",
    "provider-signature"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "57aea15a3f60b9edbc562dbc273263d0e482041983e0785d301a9451b5be15a1",
  "generatedHash": "6d6108b16d9abe5e7a7fe08dc34ca85e73e85292dee5584757da106ed4f71482",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Provider 架构：provider-signature - The signature library <-> provider functions",
  "l1": "This documentation is primarily aimed at provider authors. See provider(7) for further information. The signature (OSSL_OP_SIGNATURE) operation enables providers to implement signature algorithms and make them available to applications via the API functions EVP_PKEY_sign(3), EVP_PKEY_verify(3), and EVP_PKEY_verify_recover(3) (as well as other related functions). All \"functions\" mentioned here are passed as function pointers between `libcrypto` and the provider in OSSL_DISPATCH(3) arrays via OSSL_ALGORITHM(3) arrays that are returned by the provider's provider_query_operation() function (see provider-base(7)/Provider Functions). All these \"functions\" have a corresponding function type definition named **OSSL_FUNC_{name}_fn**, and a helper function to retrieve the function pointer from an OSSL_DISPATCH(3) element named **OSSL_FUNC_{name}**.",
  "questions": [
    "provider-signature 如何用于Provider 架构？",
    "provider-signature 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-provider-signature",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/provider-signature.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：Provider 架构 · provider-signature（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：Provider 架构。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

provider-signature - The signature library <-> provider functions

## 技术正文

## NAME


provider-signature - The signature library <-> provider functions

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
void *OSSL_FUNC_signature_newctx(void *provctx, const char *propq);
void OSSL_FUNC_signature_freectx(void *ctx);
void *OSSL_FUNC_signature_dupctx(void *ctx);

/* Get the key types that a signature algorithm supports */
const char **OSSL_FUNC_signature_query_key_types(void);

/* Signing */
int OSSL_FUNC_signature_sign_init(void *ctx, void *provkey,
                                  const OSSL_PARAM params[]);
int OSSL_FUNC_signature_sign(void *ctx, unsigned char *sig, size_t *siglen,
                             size_t sigsize, const unsigned char *tbs, size_t tbslen);
int OSSL_FUNC_signature_sign_message_init(void *ctx, void *provkey,
                                          const OSSL_PARAM params[]);
int OSSL_FUNC_signature_sign_message_update(void *ctx, const unsigned char *in,
                                            size_t inlen);
int OSSL_FUNC_signature_sign_message_final(void *ctx, unsigned char *sig,
                                           size_t *siglen, size_t sigsize);

/* Verifying */
int OSSL_FUNC_signature_verify_init(void *ctx, void *provkey,
                                    const OSSL_PARAM params[]);
int OSSL_FUNC_signature_verify(void *ctx, const unsigned char *sig, size_t siglen,
                               const unsigned char *tbs, size_t tbslen);
int OSSL_FUNC_signature_verify_message_init(void *ctx, void *provkey,
                                            const OSSL_PARAM params[]);
int OSSL_FUNC_signature_verify_message_update(void *ctx, const unsigned char *in,
                                              size_t inlen);
/*
 * OSSL_FUNC_signature_verify_message_final requires that the signature to be
 * verified is specified via a "signature" OSSL_PARAM, which is given with a
 * previous call of OSSL_FUNC_signature_set_ctx_params().
 */
int OSSL_FUNC_signature_verify_message_final(void *ctx);

/* Verify Recover */
int OSSL_FUNC_signature_verify_recover_init(void *ctx, void *provkey,
                                            const OSSL_PARAM params[]);
int OSSL_FUNC_signature_verify_recover(void *ctx, unsigned char *rout,
                                       size_t *routlen, size_t routsize,
                                       const unsigned char *sig, size_t siglen);

/* Digest Sign */
int OSSL_FUNC_signature_digest_sign_init(void *ctx, const char *mdname,
                                         void *provkey,
                                         const OSSL_PARAM params[]);
int OSSL_FUNC_signature_digest_sign_update(void *ctx, const unsigned char *data,
                                    size_t datalen);
int OSSL_FUNC_signature_digest_sign_final(void *ctx, unsigned char *sig,
                                          size_t *siglen, size_t sigsize);
int OSSL_FUNC_signature_digest_sign(void *ctx,
                             unsigned char *sig, size_t *siglen,
                             size_t sigsize, const unsigned char *tbs,
                             size_t tbslen);

/* Digest Verify */
int OSSL_FUNC_signature_digest_verify_init(void *ctx, const char *mdname,
                                           void *provkey,
                                           const OSSL_PARAM params[]);
int OSSL_FUNC_signature_digest_verify_update(void *ctx,
                                             const unsigned char *data,
                                             size_t datalen);
int OSSL_FUNC_signature_digest_verify_final(void *ctx, const unsigned char *sig,
                                     size_t siglen);
int OSSL_FUNC_signature_digest_verify(void *ctx, const unsigned char *sig,
                               size_t siglen, const unsigned char *tbs,
                               size_t tbslen);

/* Signature parameters */
int OSSL_FUNC_signature_get_ctx_params(void *ctx, OSSL_PARAM params[]);
const OSSL_PARAM *OSSL_FUNC_signature_gettable_ctx_params(void *ctx,
                                                          void *provctx);
int OSSL_FUNC_signature_set_ctx_params(void *ctx, const OSSL_PARAM params[]);
const OSSL_PARAM *OSSL_FUNC_signature_settable_ctx_params(void *ctx,
                                                          void *provctx);
/* MD parameters */
int OSSL_FUNC_signature_get_ctx_md_params(void *ctx, OSSL_PARAM params[]);
const OSSL_PARAM * OSSL_FUNC_signature_gettable_ctx_md_params(void *ctx);
int OSSL_FUNC_signature_set_ctx_md_params(void *ctx, const OSSL_PARAM params[]);
const OSSL_PARAM * OSSL_FUNC_signature_settable_ctx_md_params(void *ctx);

```

## DESCRIPTION


This documentation is primarily aimed at provider authors. See provider(7)
for further information.

The signature (OSSL_OP_SIGNATURE) operation enables providers to implement
signature algorithms and make them available to applications via the API
functions EVP_PKEY_sign(3), EVP_PKEY_verify(3),
and EVP_PKEY_verify_recover(3) (as well
as other related functions).

All "functions" mentioned here are passed as function pointers between
`libcrypto` and the provider in OSSL_DISPATCH(3) arrays via
OSSL_ALGORITHM(3) arrays that are returned by the provider's
provider_query_operation() function
(see provider-base(7)/Provider Functions).

All these "functions" have a corresponding function type definition
named **OSSL_FUNC_{name}_fn**, and a helper function to retrieve the
function pointer from an OSSL_DISPATCH(3) element named
**OSSL_FUNC_{name}**.
For example, the "function" OSSL_FUNC_signature_newctx() has these:

```c
typedef void *(OSSL_FUNC_signature_newctx_fn)(void *provctx, const char *propq);
static ossl_inline OSSL_FUNC_signature_newctx_fn
    OSSL_FUNC_signature_newctx(const OSSL_DISPATCH *opf);

```

OSSL_DISPATCH(3) arrays are indexed by numbers that are provided as
macros in openssl-core_dispatch.h(7), as follows:

```c
OSSL_FUNC_signature_newctx                 OSSL_FUNC_SIGNATURE_NEWCTX
OSSL_FUNC_signature_freectx                OSSL_FUNC_SIGNATURE_FREECTX
OSSL_FUNC_signature_dupctx                 OSSL_FUNC_SIGNATURE_DUPCTX

OSSL_FUNC_signature_query_key_types        OSSL_FUNC_SIGNATURE_QUERY_KEY_TYPES

OSSL_FUNC_signature_sign_init              OSSL_FUNC_SIGNATURE_SIGN_INIT
OSSL_FUNC_signature_sign                   OSSL_FUNC_SIGNATURE_SIGN
OSSL_FUNC_signature_sign_message_init      OSSL_FUNC_SIGNATURE_SIGN_MESSAGE_INIT
OSSL_FUNC_signature_sign_message_update    OSSL_FUNC_SIGNATURE_SIGN_MESSAGE_UPDATE
OSSL_FUNC_signature_sign_message_final     OSSL_FUNC_SIGNATURE_SIGN_MESSAGE_FINAL

OSSL_FUNC_signature_verify_init            OSSL_FUNC_SIGNATURE_VERIFY_INIT
OSSL_FUNC_signature_verify                 OSSL_FUNC_SIGNATURE_VERIFY
OSSL_FUNC_signature_verify_message_init    OSSL_FUNC_SIGNATURE_VERIFY_MESSAGE_INIT
OSSL_FUNC_signature_verify_message_update  OSSL_FUNC_SIGNATURE_VERIFY_MESSAGE_UPDATE
OSSL_FUNC_signature_verify_message_final   OSSL_FUNC_SIGNATURE_VERIFY_MESSAGE_FINAL

OSSL_FUNC_signature_verify_recover_init    OSSL_FUNC_SIGNATURE_VERIFY_RECOVER_INIT
OSSL_FUNC_signature_verify_recover         OSSL_FUNC_SIGNATURE_VERIFY_RECOVER

OSSL_FUNC_signature_digest_sign_init       OSSL_FUNC_SIGNATURE_DIGEST_SIGN_INIT
OSSL_FUNC_signature_digest_sign_update     OSSL_FUNC_SIGNATURE_DIGEST_SIGN_UPDATE
OSSL_FUNC_signature_digest_sign_final      OSSL_FUNC_SIGNATURE_DIGEST_SIGN_FINAL
OSSL_FUNC_signature_digest_sign            OSSL_FUNC_SIGNATURE_DIGEST_SIGN

OSSL_FUNC_signature_digest_verify_init     OSSL_FUNC_SIGNATURE_DIGEST_VERIFY_INIT
OSSL_FUNC_signature_digest_verify_update   OSSL_FUNC_SIGNATURE_DIGEST_VERIFY_UPDATE
OSSL_FUNC_signature_digest_verify_final    OSSL_FUNC_SIGNATURE_DIGEST_VERIFY_FINAL
OSSL_FUNC_signature_digest_verify          OSSL_FUNC_SIGNATURE_DIGEST_VERIFY

OSSL_FUNC_signature_get_ctx_params         OSSL_FUNC_SIGNATURE_GET_CTX_PARAMS
OSSL_FUNC_signature_gettable_ctx_params    OSSL_FUNC_SIGNATURE_GETTABLE_CTX_PARAMS
OSSL_FUNC_signature_set_ctx_params         OSSL_FUNC_SIGNATURE_SET_CTX_PARAMS
OSSL_FUNC_signature_settable_ctx_params    OSSL_FUNC_SIGNATURE_SETTABLE_CTX_PARAMS

OSSL_FUNC_signature_get_ctx_md_params      OSSL_FUNC_SIGNATURE_GET_CTX_MD_PARAMS
OSSL_FUNC_signature_gettable_ctx_md_params OSSL_FUNC_SIGNATURE_GETTABLE_CTX_MD_PARAMS
OSSL_FUNC_signature_set_ctx_md_params      OSSL_FUNC_SIGNATURE_SET_CTX_MD_PARAMS
OSSL_FUNC_signature_settable_ctx_md_params OSSL_FUNC_SIGNATURE_SETTABLE_CTX_MD_PARAMS

```

A signature algorithm implementation may not implement all of these functions.
In order to be a consistent set of functions we must have at least a set of
context functions (OSSL_FUNC_signature_newctx and OSSL_FUNC_signature_freectx) as well as a
set of "signature" functions, i.e. at least one of:


- OSSL_FUNC_signature_sign_init and OSSL_FUNC_signature_sign

- OSSL_FUNC_signature_sign_message_init and OSSL_FUNC_signature_sign

- OSSL_FUNC_signature_sign_message_init, OSSL_FUNC_signature_sign_message_update and OSSL_FUNC_signature_sign_message_final

- OSSL_FUNC_signature_verify_init and OSSL_FUNC_signature_verify

- OSSL_FUNC_signature_verify_message_init and OSSL_FUNC_signature_verify

- OSSL_FUNC_signature_verify_message_init, OSSL_FUNC_signature_verify_message_update and OSSL_FUNC_signature_verify_message_final

- OSSL_FUNC_signature_verify_recover_init and OSSL_FUNC_signature_verify_recover

- OSSL_FUNC_signature_digest_sign_init, OSSL_FUNC_signature_digest_sign_update and OSSL_FUNC_signature_digest_sign_final

- OSSL_FUNC_signature_digest_verify_init, OSSL_FUNC_signature_digest_verify_update and OSSL_FUNC_signature_digest_verify_final

- OSSL_FUNC_signature_digest_sign_init and OSSL_FUNC_signature_digest_sign

- OSSL_FUNC_signature_digest_verify_init and OSSL_FUNC_signature_digest_verify


OSSL_FUNC_signature_set_ctx_params and OSSL_FUNC_signature_settable_ctx_params are optional,
but if one of them is present then the other one must also be present. The same
applies to OSSL_FUNC_signature_get_ctx_params and OSSL_FUNC_signature_gettable_ctx_params, as
well as the "md_params" functions. The OSSL_FUNC_signature_dupctx function is optional.

A signature algorithm must also implement some mechanism for generating,
loading or importing keys via the key management (OSSL_OP_KEYMGMT) operation.
See provider-keymgmt(7) for further details.

### Context Management Functions


OSSL_FUNC_signature_newctx() should create and return a pointer to a provider side
structure for holding context information during a signature operation.
A pointer to this context will be passed back in a number of the other signature
operation function calls.
The parameter `provctx` is the provider context generated during provider
initialisation (see provider(7)). The `propq` parameter is a property query
string that may be (optionally) used by the provider during any "fetches" that
it may perform (if it performs any).

OSSL_FUNC_signature_freectx() is passed a pointer to the provider side signature
context in the `ctx` parameter.
This function should free any resources associated with that context.

OSSL_FUNC_signature_dupctx() should duplicate the provider side signature context in
the `ctx` parameter and return the duplicate copy.

### Signing Functions


OSSL_FUNC_signature_sign_init() initialises a context for signing given a provider side
signature context in the `ctx` parameter, and a pointer to a provider key object
in the `provkey` parameter.
The `params`, if not NULL, should be set on the context in a manner similar to
using OSSL_FUNC_signature_set_ctx_params().
The key object should have been previously generated, loaded or imported into
the provider using the key management (OSSL_OP_KEYMGMT) operation (see
provider-keymgmt(7)).

OSSL_FUNC_signature_sign() performs the actual signing itself.
A previously initialised signature context is passed in the `ctx`
parameter.
The data to be signed is pointed to be the `tbs` parameter which is `tbslen`
bytes long.
Unless `sig` is NULL, the signature should be written to the location pointed
to by the `sig` parameter and it should not exceed `sigsize` bytes in length.
The length of the signature should be written to `*siglen`.
If `sig` is NULL then the maximum length of the signature should be written to
`*siglen`.

### Message Signing Functions


These functions are suitable for providers that implement algorithms that
accumulate a full message and sign the result of that accumulation, such as
RSA-SHA256.

OSSL_FUNC_signature_sign_message_init() initialises a context for signing a
message given a provider side signature context in the `ctx` parameter, and a
pointer to a provider key object in the `provkey` parameter.
The `params`, if not NULL, should be set on the context in a manner similar to
using OSSL_FUNC_signature_set_ctx_params().
The key object should have been previously generated, loaded or imported into
the provider using the key management (OSSL_OP_KEYMGMT) operation (see
provider-keymgmt(7)).

OSSL_FUNC_signature_sign_message_update() gathers the data pointed at by
`in`, which is `inlen` bytes long.

OSSL_FUNC_signature_sign_message_final() performs the actual signing on the
data that was gathered with OSSL_FUNC_signature_sign_message_update().

OSSL_FUNC_signature_sign() can be used for one-shot signature calls.  In that
case, `tbs` is expected to be the whole message to be signed, `tbslen` bytes
long.

For both OSSL_FUNC_signature_sign_message_final() and OSSL_FUNC_signature_sign(),
if `sig` is not NULL, the signature should be written to the location pointed
to by `sig`, and it should not exceed `sigsize` bytes in length.
The length of the signature should be written to `*siglen`.
If `sig` is NULL then the maximum length of the signature should be written to
`*siglen`.

### Verify Functions


OSSL_FUNC_signature_verify_init() initialises a context for verifying a signature given
a provider side signature context in the `ctx` parameter, and a pointer to a
provider key object in the `provkey` parameter.
The `params`, if not NULL, should be set on the context in a manner similar to
using OSSL_FUNC_signature_set_ctx_params().
The key object should have been previously generated, loaded or imported into
the provider using the key management (OSSL_OP_KEYMGMT) operation (see
provider-keymgmt(7)).

OSSL_FUNC_signature_verify() performs the actual verification itself.
A previously initialised signature context is passed in the `ctx` parameter.
The data that the signature covers is pointed to be the `tbs` parameter which
is `tbslen` bytes long.
The signature is pointed to by the `sig` parameter which is `siglen` bytes
long.

### Message Verify Functions


These functions are suitable for providers that implement algorithms that
accumulate a full message and verify a signature on the result of that
accumulation, such as RSA-SHA256.

OSSL_FUNC_signature_verify_message_init() initialises a context for verifying
a signature on a message given a provider side signature context in the `ctx`
parameter, and a pointer to a provider key object in the `provkey` parameter.
The `params`, if not NULL, should be set on the context in a manner similar to
using OSSL_FUNC_signature_set_ctx_params().
The key object should have been previously generated, loaded or imported into
the provider using the key management (OSSL_OP_KEYMGMT) operation (see
provider-keymgmt(7)).

OSSL_FUNC_signature_verify_message_update() gathers the data pointed at by
`in`, which is `inlen` bytes long.

OSSL_FUNC_signature_verify_message_final() performs the actual verification on
the data that was gathered with OSSL_FUNC_signature_verify_message_update().
The signature itself must have been passed through the "signature"
(**OSSL_SIGNATURE_PARAM_SIGNATURE**) Signature parameter
before this function is called.

OSSL_FUNC_signature_verify() can be used for one-shot verification calls.  In
that case, `tbs` is expected to be the whole message to be verified on,
`tbslen` bytes long.

### Verify Recover Functions


OSSL_FUNC_signature_verify_recover_init() initialises a context for recovering the
signed data given a provider side signature context in the `ctx` parameter, and
a pointer to a provider key object in the `provkey` parameter.
The `params`, if not NULL, should be set on the context in a manner similar to
using OSSL_FUNC_signature_set_ctx_params().
The key object should have been previously generated, loaded or imported into
the provider using the key management (OSSL_OP_KEYMGMT) operation (see
provider-keymgmt(7)).

OSSL_FUNC_signature_verify_recover() performs the actual verify recover itself.
A previously initialised signature context is passed in the `ctx` parameter.
The signature is pointed to by the `sig` parameter which is `siglen` bytes
long.
Unless `rout` is NULL, the recovered data should be written to the location
pointed to by `rout` which should not exceed `routsize` bytes in length.
The length of the recovered data should be written to `*routlen`.
If `rout` is NULL then the maximum size of the output buffer is written to
the `routlen` parameter.

### Digest Sign Functions


OSSL_FUNC_signature_digest_sign_init() initialises a context for signing given a
provider side signature context in the `ctx` parameter, and a pointer to a
provider key object in the `provkey` parameter.
The `params`, if not NULL, should be set on the context in a manner similar to
using OSSL_FUNC_signature_set_ctx_params() and
OSSL_FUNC_signature_set_ctx_md_params().
The key object should have been
previously generated, loaded or imported into the provider using the
key management (OSSL_OP_KEYMGMT) operation (see provider-keymgmt(7)).
The name of the digest to be used will be in the `mdname` parameter.

OSSL_FUNC_signature_digest_sign_update() provides data to be signed in the `data`
parameter which should be of length `datalen`. A previously initialised
signature context is passed in the `ctx` parameter. This function may be called
multiple times to cumulatively add data to be signed.

OSSL_FUNC_signature_digest_sign_final() finalises a signature operation previously
started through OSSL_FUNC_signature_digest_sign_init() and
OSSL_FUNC_signature_digest_sign_update() calls. Once finalised no more data will be
added through OSSL_FUNC_signature_digest_sign_update(). A previously initialised
signature context is passed in the `ctx` parameter. Unless `sig` is NULL, the
signature should be written to the location pointed to by the `sig` parameter
and it should not exceed `sigsize` bytes in length. The length of the signature
should be written to `*siglen`. If `sig` is NULL then the maximum length of
the signature should be written to `*siglen`.

OSSL_FUNC_signature_digest_sign() implements a "one shot" digest sign operation
previously started through OSSL_FUNC_signature_digeset_sign_init(). A previously
initialised signature context is passed in the `ctx` parameter. The data to be
signed is in `tbs` which should be `tbslen` bytes long. Unless `sig` is NULL,
the signature should be written to the location pointed to by the `sig`
parameter and it should not exceed `sigsize` bytes in length. The length of the
signature should be written to `*siglen`. If `sig` is NULL then the maximum
length of the signature should be written to `*siglen`.

### Digest Verify Functions


OSSL_FUNC_signature_digeset_verify_init() initialises a context for verifying given a
provider side verification context in the `ctx` parameter, and a pointer to a
provider key object in the `provkey` parameter.
The `params`, if not NULL, should be set on the context in a manner similar to
OSSL_FUNC_signature_set_ctx_params() and
OSSL_FUNC_signature_set_ctx_md_params().
The key object should have been
previously generated, loaded or imported into the provider using the
key management (OSSL_OP_KEYMGMT) operation (see provider-keymgmt(7)).
The name of the digest to be used will be in the `mdname` parameter.

OSSL_FUNC_signature_digest_verify_update() provides data to be verified in the `data`
parameter which should be of length `datalen`. A previously initialised
verification context is passed in the `ctx` parameter. This function may be
called multiple times to cumulatively add data to be verified.

OSSL_FUNC_signature_digest_verify_final() finalises a verification operation previously
started through OSSL_FUNC_signature_digest_verify_init() and
OSSL_FUNC_signature_digest_verify_update() calls. Once finalised no more data will be
added through OSSL_FUNC_signature_digest_verify_update(). A previously initialised
verification context is passed in the `ctx` parameter. The signature to be
verified is in `sig` which is `siglen` bytes long.

OSSL_FUNC_signature_digest_verify() implements a "one shot" digest verify operation
previously started through OSSL_FUNC_signature_digeset_verify_init(). A previously
initialised verification context is passed in the `ctx` parameter. The data to be
verified is in `tbs` which should be `tbslen` bytes long. The signature to be
verified is in `sig` which is `siglen` bytes long.

### Signature parameters


See OSSL_PARAM(3) for further details on the parameters structure used by
the OSSL_FUNC_signature_get_ctx_params() and OSSL_FUNC_signature_set_ctx_params() functions.

OSSL_FUNC_signature_get_ctx_params() gets signature parameters associated with the
given provider side signature context `ctx` and stored them in `params`.
Passing NULL for `params` should return true.

OSSL_FUNC_signature_set_ctx_params() sets the signature parameters associated with the
given provider side signature context `ctx` to `params`.
Any parameter settings are additional to any that were previously set.
Passing NULL for `params` should return true.

Common parameters currently recognised by built-in signature algorithms are as
follows.


- "digest" (**OSSL_SIGNATURE_PARAM_DIGEST**) <UTF8 string>

Get or sets the name of the digest algorithm used for the input to the
signature functions. It is required in order to calculate the "algorithm-id".

- "properties" (**OSSL_SIGNATURE_PARAM_PROPERTIES**) <UTF8 string>

Sets the name of the property query associated with the "digest" algorithm.
NULL is used if this optional value is not set.


Note that when implementing a signature algorithm that gathers a full message,
like RSA-SHA256, the "digest" and "properties" parameters should not be used.
For such implementations, it's acceptable to simply ignore them if they happen
to be passed in a call to OSSL_FUNC_signature_set_ctx_params().  For such
implementations, however, it is not acceptable to have them in the **OSSL_PARAM**
array that's returned by OSSL_FUNC_signature_settable_ctx_params().


- "signature" (**OSSL_SIGNATURE_PARAM_SIGNATURE**) <octet string>

Sets the signature to verify, specifically when
OSSL_FUNC_signature_verify_message_final() is used.

- "digest-size" (**OSSL_SIGNATURE_PARAM_DIGEST_SIZE**) <unsigned integer>

Gets or sets the output size of the digest algorithm used for the input to the
signature functions.
The length of the "digest-size" parameter should not exceed that of a **size_t**.

- "algorithm-id" (**OSSL_SIGNATURE_PARAM_ALGORITHM_ID**) <octet string>

Gets the DER encoded AlgorithmIdentifier that corresponds to the combination of
signature algorithm and digest algorithm for the signature operation.

- "nonce-type" (**OSSL_SIGNATURE_PARAM_NONCE_TYPE**) <unsigned integer>

Set this to 1 to use deterministic digital signature generation with
ECDSA or DSA, as defined in RFC 6979 (see Section 3.2 "Generation of
k").  In this case, the "digest" parameter must be explicitly set
(otherwise, deterministic nonce generation will fail).  Before using
deterministic digital signature generation, please read RFC 6979
Section 4 "Security Considerations".  The default value for
"nonce-type" is 0 and results in a random value being used for the
nonce **k** as defined in FIPS 186-4 Section 6.3 "Secret Number
Generation".

The FIPS provider does not support deterministic digital signature generation.

- "kat" (**OSSL_SIGNATURE_PARAM_KAT**) <unsigned integer>

Sets a flag to modify the sign operation to return an error if the initial
calculated signature is invalid.
In the normal mode of operation - new random values are chosen until the
signature operation succeeds.
By default it retries until a signature is calculated.
Setting the value to 0 causes the sign operation to retry,
otherwise the sign operation is only tried once and returns whether or not it
was successful.
Known answer tests can be performed if the random generator is overridden to
supply known values that either pass or fail.


The following parameters are used by the OpenSSL FIPS provider:


- "fips-indicator" (**OSSL_SIGNATURE_PARAM_FIPS_APPROVED_INDICATOR**) <integer>

A getter that returns 1 if the operation is FIPS approved, or 0 otherwise.
This may be used after calling either the sign or verify final functions. It may
return 0 if either the "digest-check", "key-check", or "sign-check" are set to 0.

- "verify-message" (**OSSL_SIGNATURE_PARAM_FIPS_VERIFY_MESSAGE** <integer>

A getter that returns 1 if a signature verification operation acted on
a raw message, or 0 if it verified a predigested message.  A value of 0
indicates likely non-approved usage of the FIPS provider.  This flag is
set when any signature verification initialisation function is called.
It is also set to 1 when any signing operation is performed to signify
compliance.  See FIPS 140-3 IG 2.4.B for further information.

- "key-check" (**OSSL_SIGNATURE_PARAM_FIPS_KEY_CHECK**) <integer>

If required this parameter should be set early via an init function
(e.g. OSSL_FUNC_signature_sign_init() or OSSL_FUNC_signature_verify_init()).
The default value of 1 causes an error during the init if the key is not FIPS
approved (e.g. The key has a security strength of less than 112 bits).
Setting this to 0 will ignore the error and set the approved "indicator" to 0.
This option breaks FIPS compliance if it causes the approved "fips-indicator"
to return 0.

- "digest-check" (**OSSL_SIGNATURE_PARAM_FIPS_DIGEST_CHECK**) <integer>

If required this parameter should be set before the signature digest is set.
The default value of 1 causes an error when the digest is set if the digest is
not FIPS approved (e.g. SHA1 is used for signing). Setting this to 0 will ignore
the error and set the approved "fips-indicator" to 0.
This option breaks FIPS compliance if it causes the approved "fips-indicator"
to return 0.

- "sign-check" (**OSSL_SIGNATURE_PARAM_FIPS_SIGN_CHECK**) <integer>

If required this parameter should be set early via an init function.
The default value of 1 causes an error when a signing algorithm is used. (This
is triggered by deprecated signing algorithms).
Setting this to 0 will ignore the error and set the approved "fips-indicator" to 0.
This option breaks FIPS compliance if it causes the approved "fips-indicator" to
return 0.

- "sign-x931-pad-check" (**OSSL_SIGNATURE_PARAM_FIPS_SIGN_X931_PAD_CHECK**) <integer>

If required this parameter should be set before the padding mode is set.
The default value of 1 causes an error if the padding mode is set to X9.31 padding
for a RSA signing operation. Setting this to 0 will ignore the error and set the
approved "fips-indicator" to 0.
This option breaks FIPS compliance if it causes the approved "fips-indicator"
to return 0.


OSSL_FUNC_signature_gettable_ctx_params() and OSSL_FUNC_signature_settable_ctx_params() get a
constant OSSL_PARAM(3) array that describes the gettable and settable parameters,
i.e. parameters that can be used with OSSL_FUNC_signature_get_ctx_params() and
OSSL_FUNC_signature_set_ctx_params() respectively.

### MD parameters


See OSSL_PARAM(3) for further details on the parameters structure used by
the OSSL_FUNC_signature_get_md_ctx_params() and OSSL_FUNC_signature_set_md_ctx_params()
functions.

OSSL_FUNC_signature_get_md_ctx_params() gets digest parameters associated with the
given provider side digest signature context `ctx` and stores them in `params`.
Passing NULL for `params` should return true.

OSSL_FUNC_signature_set_ms_ctx_params() sets the digest parameters associated with the
given provider side digest signature context `ctx` to `params`.
Any parameter settings are additional to any that were previously set.
Passing NULL for `params` should return true.

Parameters currently recognised by built-in signature algorithms are the same
as those for built-in digest algorithms. See
provider-digest(7)/Digest Parameters for further information.

OSSL_FUNC_signature_gettable_md_ctx_params() and OSSL_FUNC_signature_settable_md_ctx_params()
get a constant OSSL_PARAM(3) array that describes the gettable and settable
digest parameters, i.e. parameters that can be used with
OSSL_FUNC_signature_get_md_ctx_params() and OSSL_FUNC_signature_set_md_ctx_params()
respectively.

## RETURN VALUES


OSSL_FUNC_signature_newctx() and OSSL_FUNC_signature_dupctx() should return the newly created
provider side signature context, or NULL on failure.

OSSL_FUNC_signature_gettable_ctx_params(), OSSL_FUNC_signature_settable_ctx_params(),
OSSL_FUNC_signature_gettable_md_ctx_params() and OSSL_FUNC_signature_settable_md_ctx_params(),
return the gettable or settable parameters in a constant OSSL_PARAM(3) array.

All other functions should return 1 for success or 0 on error.

## SEE ALSO


provider(7)

## HISTORY


The provider SIGNATURE interface was introduced in OpenSSL 3.0.
The Signature Parameters "fips-indicator", "key-check" and "digest-check"
were added in OpenSSL 3.4.

## COPYRIGHT


Copyright 2019-2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/provider-signature.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/provider-signature.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/provider-signature.pod`；SHA-256：`57aea15a3f60b9edbc562dbc273263d0e482041983e0785d301a9451b5be15a1`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
