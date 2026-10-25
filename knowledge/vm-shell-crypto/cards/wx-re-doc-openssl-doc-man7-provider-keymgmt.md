---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-provider-keymgmt",
  "title": "OpenSSL：Provider 架构 · provider-keymgmt（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "Provider",
    "算法实现",
    "openssl",
    "provider-keymgmt"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "ca9a0f7eabc9dfcd5a11ddf55dda1f242f0a6c61aebdfef86bfc0b76e392e71f",
  "generatedHash": "52abc89431c090147a1778f7f190e3dbbcd3789e6503a3b5c8f68b401688c0fe",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Provider 架构：provider-keymgmt - The KEYMGMT library <-> provider functions",
  "l1": "The KEYMGMT operation doesn't have much public visibility in OpenSSL libraries, it's rather an internal operation that's designed to work in tandem with operations that use private/public key pairs. Because the KEYMGMT operation shares knowledge with the operations it works with in tandem, they must belong to the same provider. The OpenSSL libraries will ensure that they do. The primary responsibility of the KEYMGMT operation is to hold the provider side key data for the OpenSSL library EVP_PKEY structure. All \"functions\" mentioned here are passed as function pointers between `libcrypto` and the provider in OSSL_DISPATCH(3) arrays via OSSL_ALGORITHM(3) arrays that are returned by the provider's provider_query_operation() function (see provider-base(7)/Provider Functions). All these \"functions\" have a corresponding function type definition",
  "questions": [
    "provider-keymgmt 如何用于Provider 架构？",
    "provider-keymgmt 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-provider-keymgmt",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/provider-keymgmt.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：Provider 架构 · provider-keymgmt（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：Provider 架构。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

provider-keymgmt - The KEYMGMT library <-> provider functions

## 技术正文

## NAME


provider-keymgmt - The KEYMGMT library <-> provider functions

## SYNOPSIS


```c
#include <openssl/core_dispatch.h>

/*
 * None of these are actual functions, but are displayed like this for
 * the function signatures for functions that are offered as function
 * pointers in OSSL_DISPATCH arrays.
 */

/* Key object (keydata) creation and destruction */
void *OSSL_FUNC_keymgmt_new(void *provctx);
void OSSL_FUNC_keymgmt_free(void *keydata);

/* Generation, a more complex constructor */
void *OSSL_FUNC_keymgmt_gen_init(void *provctx, int selection,
                                 const OSSL_PARAM params[]);
int OSSL_FUNC_keymgmt_gen_set_template(void *genctx, void *template);
int OSSL_FUNC_keymgmt_gen_get_params(void *genctx, OSSL_PARAM params[]);
int OSSL_FUNC_keymgmt_gen_set_params(void *genctx, const OSSL_PARAM params[]);
const OSSL_PARAM *OSSL_FUNC_keymgmt_gen_gettable_params(void *genctx,
                                                        void *provctx);
const OSSL_PARAM *OSSL_FUNC_keymgmt_gen_settable_params(void *genctx,
                                                        void *provctx);
void *OSSL_FUNC_keymgmt_gen(void *genctx, OSSL_CALLBACK *cb, void *cbarg);
void OSSL_FUNC_keymgmt_gen_cleanup(void *genctx);

/* Key loading by object reference, also a constructor */
void *OSSL_FUNC_keymgmt_load(const void *reference, size_t *reference_sz);

/* Key object information */
int OSSL_FUNC_keymgmt_get_params(void *keydata, OSSL_PARAM params[]);
const OSSL_PARAM *OSSL_FUNC_keymgmt_gettable_params(void *provctx);
int OSSL_FUNC_keymgmt_set_params(void *keydata, const OSSL_PARAM params[]);
const OSSL_PARAM *OSSL_FUNC_keymgmt_settable_params(void *provctx);

/* Key object content checks */
int OSSL_FUNC_keymgmt_has(const void *keydata, int selection);
int OSSL_FUNC_keymgmt_match(const void *keydata1, const void *keydata2,
                            int selection);

/* Discovery of supported operations */
const char *OSSL_FUNC_keymgmt_query_operation_name(int operation_id);

/* Key object import and export functions */
int OSSL_FUNC_keymgmt_import(void *keydata, int selection, const OSSL_PARAM params[]);
const OSSL_PARAM *OSSL_FUNC_keymgmt_import_types(int selection);
const OSSL_PARAM *OSSL_FUNC_keymgmt_import_types_ex(void *provctx, int selection);
int OSSL_FUNC_keymgmt_export(void *keydata, int selection,
                             OSSL_CALLBACK *param_cb, void *cbarg);
const OSSL_PARAM *OSSL_FUNC_keymgmt_export_types(int selection);
const OSSL_PARAM *OSSL_FUNC_keymgmt_export_types_ex(void *provctx, int selection);

/* Key object duplication, a constructor */
void *OSSL_FUNC_keymgmt_dup(const void *keydata_from, int selection);

/* Key object validation */
int OSSL_FUNC_keymgmt_validate(const void *keydata, int selection, int checktype);

```

## DESCRIPTION


The KEYMGMT operation doesn't have much public visibility in OpenSSL
libraries, it's rather an internal operation that's designed to work
in tandem with operations that use private/public key pairs.

Because the KEYMGMT operation shares knowledge with the operations it
works with in tandem, they must belong to the same provider.
The OpenSSL libraries will ensure that they do.

The primary responsibility of the KEYMGMT operation is to hold the
provider side key data for the OpenSSL library EVP_PKEY structure.

All "functions" mentioned here are passed as function pointers between
`libcrypto` and the provider in OSSL_DISPATCH(3) arrays via
OSSL_ALGORITHM(3) arrays that are returned by the provider's
provider_query_operation() function
(see provider-base(7)/Provider Functions).

All these "functions" have a corresponding function type definition
named **OSSL_FUNC_{name}_fn**, and a helper function to retrieve the
function pointer from a OSSL_DISPATCH(3) element named
**OSSL_FUNC_{name}**.
For example, the "function" OSSL_FUNC_keymgmt_new() has these:

```c
typedef void *(OSSL_FUNC_keymgmt_new_fn)(void *provctx);
static ossl_inline OSSL_FUNC_keymgmt_new_fn
    OSSL_FUNC_keymgmt_new(const OSSL_DISPATCH *opf);

```

OSSL_DISPATCH(3) arrays are indexed by numbers that are provided as
macros in openssl-core_dispatch.h(7), as follows:

```c
OSSL_FUNC_keymgmt_new                  OSSL_FUNC_KEYMGMT_NEW
OSSL_FUNC_keymgmt_free                 OSSL_FUNC_KEYMGMT_FREE

OSSL_FUNC_keymgmt_gen_init             OSSL_FUNC_KEYMGMT_GEN_INIT
OSSL_FUNC_keymgmt_gen_set_template     OSSL_FUNC_KEYMGMT_GEN_SET_TEMPLATE
OSSL_FUNC_keymgmt_gen_get_params       OSSL_FUNC_KEYMGMT_GEN_GET_PARAMS
OSSL_FUNC_keymgmt_gen_gettable_params  OSSL_FUNC_KEYMGMT_GEN_GETTABLE_PARAMS
OSSL_FUNC_keymgmt_gen_set_params       OSSL_FUNC_KEYMGMT_GEN_SET_PARAMS
OSSL_FUNC_keymgmt_gen_settable_params  OSSL_FUNC_KEYMGMT_GEN_SETTABLE_PARAMS
OSSL_FUNC_keymgmt_gen                  OSSL_FUNC_KEYMGMT_GEN
OSSL_FUNC_keymgmt_gen_cleanup          OSSL_FUNC_KEYMGMT_GEN_CLEANUP

OSSL_FUNC_keymgmt_load                 OSSL_FUNC_KEYMGMT_LOAD

OSSL_FUNC_keymgmt_get_params           OSSL_FUNC_KEYMGMT_GET_PARAMS
OSSL_FUNC_keymgmt_gettable_params      OSSL_FUNC_KEYMGMT_GETTABLE_PARAMS
OSSL_FUNC_keymgmt_set_params           OSSL_FUNC_KEYMGMT_SET_PARAMS
OSSL_FUNC_keymgmt_settable_params      OSSL_FUNC_KEYMGMT_SETTABLE_PARAMS

OSSL_FUNC_keymgmt_query_operation_name OSSL_FUNC_KEYMGMT_QUERY_OPERATION_NAME

OSSL_FUNC_keymgmt_has                  OSSL_FUNC_KEYMGMT_HAS
OSSL_FUNC_keymgmt_validate             OSSL_FUNC_KEYMGMT_VALIDATE
OSSL_FUNC_keymgmt_match                OSSL_FUNC_KEYMGMT_MATCH

OSSL_FUNC_keymgmt_import               OSSL_FUNC_KEYMGMT_IMPORT
OSSL_FUNC_keymgmt_import_types         OSSL_FUNC_KEYMGMT_IMPORT_TYPES
OSSL_FUNC_keymgmt_import_types_ex      OSSL_FUNC_KEYMGMT_IMPORT_TYPES_EX
OSSL_FUNC_keymgmt_export               OSSL_FUNC_KEYMGMT_EXPORT
OSSL_FUNC_keymgmt_export_types         OSSL_FUNC_KEYMGMT_EXPORT_TYPES
OSSL_FUNC_keymgmt_export_types_ex      OSSL_FUNC_KEYMGMT_EXPORT_TYPES_EX

OSSL_FUNC_keymgmt_dup                  OSSL_FUNC_KEYMGMT_DUP

```

### Key Objects


A key object is a collection of data for an asymmetric key, and is
represented as `keydata` in this manual.

The exact contents of a key object are defined by the provider, and it
is assumed that different operations in one and the same provider use
the exact same structure to represent this collection of data, so that
for example, a key object that has been created using the KEYMGMT
interface that we document here can be passed as is to other provider
operations, such as OP_signature_sign_init() (see
provider-signature(7)).

With some of the KEYMGMT functions, it's possible to select a specific
subset of data to handle, governed by the bits in a `selection`
indicator.  The bits are:


- **OSSL_KEYMGMT_SELECT_PRIVATE_KEY**

Indicating that the private key data in a key object should be
considered.

- **OSSL_KEYMGMT_SELECT_PUBLIC_KEY**

Indicating that the public key data in a key object should be
considered.

- **OSSL_KEYMGMT_SELECT_DOMAIN_PARAMETERS**

Indicating that the domain parameters in a key object should be
considered.

- **OSSL_KEYMGMT_SELECT_OTHER_PARAMETERS**

Indicating that other parameters in a key object should be
considered.

Other parameters are key parameters that don't fit any other
classification.  In other words, this particular selector bit works as
a last resort bit bucket selector.


Some selector bits have also been combined for easier use:


- **OSSL_KEYMGMT_SELECT_ALL_PARAMETERS**

Indicating that all key object parameters should be considered,
regardless of their more granular classification.

EVP_PKEY_copy_parameters() and EVP_PKEY_parameters_eq()

This is a combination of **OSSL_KEYMGMT_SELECT_DOMAIN_PARAMETERS** and
**OSSL_KEYMGMT_SELECT_OTHER_PARAMETERS**.

mentioned here too.

- **OSSL_KEYMGMT_SELECT_KEYPAIR**

Indicating that both the whole key pair in a key object should be
considered, i.e. the combination of public and private key.

This is a combination of **OSSL_KEYMGMT_SELECT_PRIVATE_KEY** and
**OSSL_KEYMGMT_SELECT_PUBLIC_KEY**.

- **OSSL_KEYMGMT_SELECT_ALL**

Indicating that everything in a key object should be considered.


The exact interpretation of those bits or how they combine is left to
each function where you can specify a selector.

It's left to the provider implementation to decide what is reasonable
to do with regards to received selector bits and how to do it.
Among others, an implementation of OSSL_FUNC_keymgmt_match() might opt
to not compare the private half if it has compared the public half,
since a match of one half implies a match of the other half.

### Constructing and Destructing Functions


OSSL_FUNC_keymgmt_new() should create a provider side key object.  The
provider context `provctx` is passed and may be incorporated in the
key object, but that is not mandatory.

OSSL_FUNC_keymgmt_free() should free the passed `keydata`.

OSSL_FUNC_keymgmt_gen_init(), OSSL_FUNC_keymgmt_gen_set_template(),
OSSL_FUNC_keymgmt_gen_get_params(), OSSL_FUNC_keymgmt_gen_gettable_params(),
OSSL_FUNC_keymgmt_gen_set_params(), OSSL_FUNC_keymgmt_gen_settable_params(),
OSSL_FUNC_keymgmt_gen() and OSSL_FUNC_keymgmt_gen_cleanup() work together as a
more elaborate context based key object constructor.

OSSL_FUNC_keymgmt_gen_init() should create the key object generation context
and initialize it with `selections`, which will determine what kind
of contents the key object to be generated should get.
The `params`, if not NULL, should be set on the context in a manner similar to
using OSSL_FUNC_keymgmt_set_params().

OSSL_FUNC_keymgmt_gen_set_template() should add `template` to the context
`genctx`.  The `template` is assumed to be a key object constructed
with the same KEYMGMT, and from which content that the implementation
chooses can be used as a template for the key object to be generated.
Typically, the generation of a DSA or DH key would get the domain
parameters from this `template`.

OSSL_FUNC_keymgmt_gen_get_params() should retrieve parameters into
`params` in the key object generation context `genctx`.

OSSL_FUNC_keymgmt_gen_gettable_params() should return a constant array of
descriptor OSSL_PARAM(3), for parameters that
OSSL_FUNC_keymgmt_gen_get_params() can handle.

OSSL_FUNC_keymgmt_gen_set_params() should set additional parameters from
`params` in the key object generation context `genctx`.

OSSL_FUNC_keymgmt_gen_settable_params() should return a constant array of
descriptor OSSL_PARAM(3), for parameters that OSSL_FUNC_keymgmt_gen_set_params()
can handle.

OSSL_FUNC_keymgmt_gen() should perform the key object generation itself, and
return the result.  The callback `cb` should be called at regular
intervals with indications on how the key object generation
progresses.

OSSL_FUNC_keymgmt_gen_cleanup() should clean up and free the key object
generation context `genctx`

OSSL_FUNC_keymgmt_load() creates a provider side key object based on a
`reference` object with a size of `reference_sz` bytes, that only the
provider knows how to interpret, but that may come from other operations.
Outside the provider, this reference is simply an array of bytes.

At least one of OSSL_FUNC_keymgmt_new(), OSSL_FUNC_keymgmt_gen() and
OSSL_FUNC_keymgmt_load() are mandatory, as well as OSSL_FUNC_keymgmt_free() and
OSSL_FUNC_keymgmt_has(). Additionally, if OSSL_FUNC_keymgmt_gen() is present,
OSSL_FUNC_keymgmt_gen_init() and OSSL_FUNC_keymgmt_gen_cleanup() must be
present as well.

### Key Object Information Functions


OSSL_FUNC_keymgmt_get_params() should extract information data associated
with the given `keydata`, see /Common Information Parameters.

OSSL_FUNC_keymgmt_gettable_params() should return a constant array of
descriptor OSSL_PARAM(3), for parameters that OSSL_FUNC_keymgmt_get_params()
can handle.

If OSSL_FUNC_keymgmt_gettable_params() is present, OSSL_FUNC_keymgmt_get_params()
must also be present, and vice versa.

OSSL_FUNC_keymgmt_set_params() should update information data associated
with the given `keydata`, see /Common Information Parameters.

OSSL_FUNC_keymgmt_settable_params() should return a constant array of
descriptor OSSL_PARAM(3), for parameters that OSSL_FUNC_keymgmt_set_params()
can handle.

If OSSL_FUNC_keymgmt_settable_params() is present, OSSL_FUNC_keymgmt_set_params()
must also be present, and vice versa.

### Key Object Checking Functions


OSSL_FUNC_keymgmt_query_operation_name() should return the name of the
supported algorithm for the operation `operation_id`.  This is
similar to provider_query_operation() (see provider-base(7)),
but only works as an advisory.  If this function is not present, or
returns NULL, the caller is free to assume that there's an algorithm
from the same provider, of the same name as the one used to fetch the
keymgmt and try to use that.

OSSL_FUNC_keymgmt_has() should check whether the given `keydata` contains the subsets
of data indicated by the `selector`.  A combination of several
selector bits must consider all those subsets, not just one.  An
implementation is, however, free to consider an empty subset of data
to still be a valid subset. For algorithms where some selection is
not meaningful such as **OSSL_KEYMGMT_SELECT_DOMAIN_PARAMETERS** for
RSA keys the function should just return 1 as the selected subset
is not really missing in the key.

OSSL_FUNC_keymgmt_validate() should check if the `keydata` contains valid
data subsets indicated by `selection`.  Some combined selections of
data subsets may cause validation of the combined data.
For example, the combination of **OSSL_KEYMGMT_SELECT_PRIVATE_KEY** and
**OSSL_KEYMGMT_SELECT_PUBLIC_KEY** (or **OSSL_KEYMGMT_SELECT_KEYPAIR**
for short) is expected to check that the pairwise consistency of
`keydata` is valid. The `checktype` parameter controls what type of check is
performed on the subset of data. Two types of check are defined:
**OSSL_KEYMGMT_VALIDATE_FULL_CHECK** and **OSSL_KEYMGMT_VALIDATE_QUICK_CHECK**.
The interpretation of how much checking is performed in a full check versus a
quick check is key type specific. Some providers may have no distinction
between a full check and a quick check. For algorithms where some selection is
not meaningful such as **OSSL_KEYMGMT_SELECT_DOMAIN_PARAMETERS** for
RSA keys the function should just return 1 as there is nothing to validate for
that selection.

OSSL_FUNC_keymgmt_match() should check if the data subset indicated by
`selection` in `keydata1` and `keydata2` match.  It is assumed that
the caller has ensured that `keydata1` and `keydata2` are both owned
by the implementation of this function.

### Key Object Import, Export and Duplication Functions


OSSL_FUNC_keymgmt_import() should import data indicated by `selection` into
`keydata` with values taken from the OSSL_PARAM(3) array `params`.

OSSL_FUNC_keymgmt_export() should extract values indicated by `selection`
from `keydata`, create an OSSL_PARAM(3) array with them and call
`param_cb` with that array as well as the given `cbarg`.

OSSL_FUNC_keymgmt_import_types() and OSSL_FUNC_keymgmt_import_types_ex()
should return a constant array of descriptor
OSSL_PARAM(3) for data indicated by `selection`, for parameters that
OSSL_FUNC_keymgmt_import() can handle.
Either OSSL_FUNC_keymgmt_import_types() or OSSL_FUNC_keymgmt_import_types_ex(),
must be implemented, if OSSL_FUNC_keymgmt_import_types_ex() is implemented, then
it is preferred over OSSL_FUNC_keymgmt_import_types().
Providers that are supposed to be backward compatible with OpenSSL 3.0 or 3.1
must continue to implement OSSL_FUNC_keymgmt_import_types().

OSSL_FUNC_keymgmt_export_types() and OSSL_FUNC_keymgmt_export_types_ex()
should return a constant array of descriptor
OSSL_PARAM(3) for data indicated by `selection`, that the
OSSL_FUNC_keymgmt_export() callback can expect to receive.
Either OSSL_FUNC_keymgmt_export_types() or OSSL_FUNC_keymgmt_export_types_ex(),
must be implemented, if OSSL_FUNC_keymgmt_export_types_ex() is implemented, then
it is preferred over OSSL_FUNC_keymgmt_export_types().
Providers that are supposed to be backward compatible with OpenSSL 3.0 or 3.1
must continue to implement OSSL_FUNC_keymgmt_export_types().

OSSL_FUNC_keymgmt_dup() should duplicate data subsets indicated by
`selection` or the whole key data `keydata_from` and create a new
provider side key object with the data.

### Common Information Parameters


See OSSL_PARAM(3) for further details on the parameters structure.

Common information parameters currently recognised by all built-in
keymgmt algorithms are as follows:


- "bits" (**OSSL_PKEY_PARAM_BITS**) <integer>

The value should be the cryptographic length of the cryptosystem to
which the key belongs, in bits.  The definition of cryptographic
length is specific to the key cryptosystem.

- "max-size" (**OSSL_PKEY_PARAM_MAX_SIZE**) <integer>

The value should be the maximum size that a caller should allocate to
safely store a signature (called `sig` in provider-signature(7)),
the result of asymmetric encryption / decryption (`out` in
provider-asym_cipher(7), a derived secret (`secret` in
provider-keyexch(7), and similar data).

Providers need to implement this parameter
in order to properly support various use cases such as CMS signing.

Because an EVP_KEYMGMT method is always tightly bound to another method
(signature, asymmetric cipher, key exchange, ...) and must be of the
same provider, this number only needs to be synchronised with the
dimensions handled in the rest of the same provider.

- "security-bits" (**OSSL_PKEY_PARAM_SECURITY_BITS**) <integer>

The value should be the number of security bits of the given key.
Bits of security is defined in SP800-57.

- "mandatory-digest" (**OSSL_PKEY_PARAM_MANDATORY_DIGEST**) <UTF8 string>

If there is a mandatory digest for performing a signature operation with
keys from this keymgmt, this parameter should get its name as value.

When EVP_PKEY_get_default_digest_name() queries this parameter and it's
filled in by the implementation, its return value will be 2.

If the keymgmt implementation fills in the value `""` or `"UNDEF"`,
EVP_PKEY_get_default_digest_name(3) will place the string `"UNDEF"` into
its argument `mdname`.  This signifies that no digest should be specified
with the corresponding signature operation.

- "default-digest" (**OSSL_PKEY_PARAM_DEFAULT_DIGEST**) <UTF8 string>

If there is a default digest for performing a signature operation with
keys from this keymgmt, this parameter should get its name as value.

When EVP_PKEY_get_default_digest_name(3) queries this parameter and it's
filled in by the implementation, its return value will be 1.  Note that if
**OSSL_PKEY_PARAM_MANDATORY_DIGEST** is responded to as well,
EVP_PKEY_get_default_digest_name(3) ignores the response to this
parameter.

If the keymgmt implementation fills in the value `""` or `"UNDEF"`,
EVP_PKEY_get_default_digest_name(3) will place the string `"UNDEF"` into
its argument `mdname`.  This signifies that no digest has to be specified
with the corresponding signature operation, but may be specified as an
option.


The OpenSSL FIPS provider also supports the following parameters:


- "fips-indicator" (**OSSL_PKEY_PARAM_FIPS_APPROVED_INDICATOR**) <integer>

A getter that returns 1 if the operation is FIPS approved, or 0 otherwise.
This may be used after calling OSSL_FUNC_keymgmt_gen() function. It may
return 0 if either the "key-check", or "sign-check" are set to 0.

- "key-check" (**OSSL_PKEY_PARAM_FIPS_KEY_CHECK**) <integer>

If required this parameter should be set using OSSL_FUNC_keymgmt_gen_set_params()
or OSSL_FUNC_keymgmt_gen_init().
The default value of 1 causes an error during the init if the key is not FIPS
approved (e.g. The key has a security strength of less than 112 bits). Setting
this to 0 will ignore the error and set the approved "fips-indicator" to 0.
This option breaks FIPS compliance if it causes the approved "fips-indicator"
to return 0.

- "sign-check" (**OSSL_PKEY_PARAM_FIPS_SIGN_CHECK**) <integer>

If required this parameter should be set before the OSSL_FUNC_keymgmt_gen()
function. This value is not supported by all keygen algorithms.
The default value of 1 will cause an error if the generated key is not
allowed to be used for signing.
Setting this to 0 will ignore the error and set the approved "fips-indicator" to 0.
This option breaks FIPS compliance if it causes the approved "fips-indicator"
to return 0.


## RETURN VALUES


OSSL_FUNC_keymgmt_new() and OSSL_FUNC_keymgmt_dup() should return a valid
reference to the newly created provider side key object, or NULL on failure.

OSSL_FUNC_keymgmt_import(), OSSL_FUNC_keymgmt_export(), OSSL_FUNC_keymgmt_get_params() and
OSSL_FUNC_keymgmt_set_params() should return 1 for success or 0 on error.

OSSL_FUNC_keymgmt_validate() should return 1 on successful validation, or 0 on
failure.

OSSL_FUNC_keymgmt_has() should return 1 if all the selected data subsets are contained
in the given `keydata` or 0 otherwise.

OSSL_FUNC_keymgmt_query_operation_name() should return a pointer to a string matching
the requested operation, or NULL if the same name used to fetch the keymgmt
applies.

OSSL_FUNC_keymgmt_gettable_params() and OSSL_FUNC_keymgmt_settable_params()
OSSL_FUNC_keymgmt_import_types(), OSSL_FUNC_keymgmt_import_types_ex(),
OSSL_FUNC_keymgmt_export_types(), OSSL_FUNC_keymgmt_export_types_ex()
should
always return a constant OSSL_PARAM(3) array.

## SEE ALSO


EVP_PKEY_get_size(3),
EVP_PKEY_get_bits(3),
EVP_PKEY_get_security_bits(3),
provider(7),
EVP_PKEY-X25519(7),
EVP_PKEY-X448(7),
EVP_PKEY-ED25519(7),
EVP_PKEY-ED448(7),
EVP_PKEY-EC(7),
EVP_PKEY-RSA(7),
EVP_PKEY-DSA(7),
EVP_PKEY-DH(7),
EVP_PKEY-ML-DSA(7),
EVP_PKEY-ML-KEM(7),
EVP_PKEY-SLH-DSA(7).

## HISTORY


The KEYMGMT interface was introduced in OpenSSL 3.0.

Functions OSSL_FUNC_keymgmt_import_types_ex(), and OSSL_FUNC_keymgmt_export_types_ex()
were added with OpenSSL 3.2.

The functions OSSL_FUNC_keymgmt_gen_get_params() and
OSSL_FUNC_keymgmt_gen_gettable_params() were added in OpenSSL 3.4.

The parameters "sign-check" and "fips-indicator" were added in OpenSSL 3.4.

Support for the **ML-DSA**, **ML-KEM** and **SLH-DSA** algorithms was added in OpenSSL 3.5.

## COPYRIGHT


Copyright 2019-2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/provider-keymgmt.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/provider-keymgmt.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/provider-keymgmt.pod`；SHA-256：`ca9a0f7eabc9dfcd5a11ddf55dda1f242f0a6c61aebdfef86bfc0b76e392e71f`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
