---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-hpke-ctx-new",
  "title": "OpenSSL：密码实现与接口 · OSSL_HPKE_CTX_new（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_HPKE_CTX_new"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "4b09ca709eee88f8dd15723401cb4ac8df97e971c59c8198cbf3f9139eb695c9",
  "generatedHash": "885570d48fa2b954c771770c3b4032e8ce7c301dbfd2960740b31c98651d37b2",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_HPKE_CTX_new, OSSL_HPKE_CTX_free, OSSL_HPKE_encap, OSSL_HPKE_decap, OSSL_HPKE_seal, OSSL_HPKE_open, OSSL_HPKE_export, OSSL_HPKE_suite_check, OSSL_HPKE_str2suite, OSSL_HPKE_keygen, OSSL_HPKE_get_grease_value, OSSL_HPKE_get_ciphertext_size, OSSL_HPKE_get_public_encap_size, OSSL_HPKE_get_recommend",
  "l1": "These functions provide an API for using the form of Hybrid Public Key Encryption (HPKE) defined in RFC9180. Understanding the HPKE specification is likely required before using these APIs. HPKE is used by various other IETF specifications, including the TLS Encrypted Client Hello (ECH) specification and others. HPKE is a standardised, highly flexible construct for encrypting \"to\" a public key that supports combinations of a key encapsulation method (KEM), a key derivation function (KDF) and an authenticated encryption with additional data (AEAD) algorithm, with optional sender authentication. The sender and a receiver here will generally be using some application or protocol making use of HPKE. For example, with ECH, the sender will be a browser and the receiver will be a web server. **OSSL_HPKE_SUITE** is a structure that holds identifi",
  "questions": [
    "OSSL_HPKE_CTX_new 如何用于密码实现与接口？",
    "OSSL_HPKE_CTX_new 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-hpke-ctx-new",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_HPKE_CTX_new.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_HPKE_CTX_new（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_HPKE_CTX_new, OSSL_HPKE_CTX_free,
OSSL_HPKE_encap, OSSL_HPKE_decap,
OSSL_HPKE_seal, OSSL_HPKE_open, OSSL_HPKE_export,
OSSL_HPKE_suite_check, OSSL_HPKE_str2suite,
OSSL_HPKE_keygen, OSSL_HPKE_get_grease_value,
OSSL_HPKE_get_ciphertext_size, OSSL_HPKE_get_public_encap_size,
OSSL_HPKE_get_recommended_ikmelen,
OSSL_HPKE_CTX_set1_psk, OSSL_HPKE_CTX_set1_ikme,
OSSL_HPKE_CTX_set1_authpriv, OSSL_HPKE_CTX_set1_authpub,
OSSL_HPKE_CTX_get_seq, OSSL_HPKE_CTX_set_seq
- Hybrid Public Key Encryption (HPKE) functions

## 技术正文

## NAME


OSSL_HPKE_CTX_new, OSSL_HPKE_CTX_free,
OSSL_HPKE_encap, OSSL_HPKE_decap,
OSSL_HPKE_seal, OSSL_HPKE_open, OSSL_HPKE_export,
OSSL_HPKE_suite_check, OSSL_HPKE_str2suite,
OSSL_HPKE_keygen, OSSL_HPKE_get_grease_value,
OSSL_HPKE_get_ciphertext_size, OSSL_HPKE_get_public_encap_size,
OSSL_HPKE_get_recommended_ikmelen,
OSSL_HPKE_CTX_set1_psk, OSSL_HPKE_CTX_set1_ikme,
OSSL_HPKE_CTX_set1_authpriv, OSSL_HPKE_CTX_set1_authpub,
OSSL_HPKE_CTX_get_seq, OSSL_HPKE_CTX_set_seq
- Hybrid Public Key Encryption (HPKE) functions

## SYNOPSIS


```c
#include <openssl/hpke.h>

typedef struct {
    uint16_t    kem_id;
    uint16_t    kdf_id;
    uint16_t    aead_id;
} OSSL_HPKE_SUITE;

OSSL_HPKE_CTX *OSSL_HPKE_CTX_new(int mode, OSSL_HPKE_SUITE suite, int role,
                                 OSSL_LIB_CTX *libctx, const char *propq);
void OSSL_HPKE_CTX_free(OSSL_HPKE_CTX *ctx);

int OSSL_HPKE_encap(OSSL_HPKE_CTX *ctx,
                    unsigned char *enc, size_t *enclen,
                    const unsigned char *pub, size_t publen,
                    const unsigned char *info, size_t infolen);
int OSSL_HPKE_seal(OSSL_HPKE_CTX *ctx,
                   unsigned char *ct, size_t *ctlen,
                   const unsigned char *aad, size_t aadlen,
                   const unsigned char *pt, size_t ptlen);

int OSSL_HPKE_keygen(OSSL_HPKE_SUITE suite,
                     unsigned char *pub, size_t *publen, EVP_PKEY **priv,
                     const unsigned char *ikm, size_t ikmlen,
                     OSSL_LIB_CTX *libctx, const char *propq);
int OSSL_HPKE_decap(OSSL_HPKE_CTX *ctx,
                    const unsigned char *enc, size_t enclen,
                    EVP_PKEY *recippriv,
                    const unsigned char *info, size_t infolen);
int OSSL_HPKE_open(OSSL_HPKE_CTX *ctx,
                   unsigned char *pt, size_t *ptlen,
                   const unsigned char *aad, size_t aadlen,
                   const unsigned char *ct, size_t ctlen);

int OSSL_HPKE_export(OSSL_HPKE_CTX *ctx,
                     unsigned char *secret, size_t secretlen,
                     const unsigned char *label, size_t labellen);

int OSSL_HPKE_CTX_set1_authpriv(OSSL_HPKE_CTX *ctx, EVP_PKEY *priv);
int OSSL_HPKE_CTX_set1_authpub(OSSL_HPKE_CTX *ctx,
                               unsigned char *pub, size_t publen);
int OSSL_HPKE_CTX_set1_psk(OSSL_HPKE_CTX *ctx,
                           const char *pskid,
                           const unsigned char *psk, size_t psklen);

int OSSL_HPKE_CTX_get_seq(OSSL_HPKE_CTX *ctx, uint64_t *seq);
int OSSL_HPKE_CTX_set_seq(OSSL_HPKE_CTX *ctx, uint64_t seq);

int OSSL_HPKE_CTX_set1_ikme(OSSL_HPKE_CTX *ctx,
                            const unsigned char *ikme, size_t ikmelen);

int OSSL_HPKE_suite_check(OSSL_HPKE_SUITE suite);
int OSSL_HPKE_get_grease_value(const OSSL_HPKE_SUITE *suite_in,
                               OSSL_HPKE_SUITE *suite,
                               unsigned char *enc, size_t *enclen,
                               unsigned char *ct, size_t ctlen,
                               OSSL_LIB_CTX *libctx, const char *propq);

int OSSL_HPKE_str2suite(const char *str, OSSL_HPKE_SUITE *suite);
size_t OSSL_HPKE_get_ciphertext_size(OSSL_HPKE_SUITE suite, size_t clearlen);
size_t OSSL_HPKE_get_public_encap_size(OSSL_HPKE_SUITE suite);
size_t OSSL_HPKE_get_recommended_ikmelen(OSSL_HPKE_SUITE suite);

```

## DESCRIPTION


These functions provide an API for using the form of Hybrid Public Key
Encryption (HPKE) defined in RFC9180. Understanding the HPKE specification
is likely required before using these APIs.  HPKE is used by various
other IETF specifications, including the TLS Encrypted Client
Hello (ECH) specification and others.

HPKE is a standardised, highly flexible construct for encrypting "to" a public
key that supports combinations of a key encapsulation method (KEM), a key
derivation function (KDF) and an authenticated encryption with additional data
(AEAD) algorithm, with optional sender authentication.

The sender and a receiver here will generally be using some application or
protocol making use of HPKE. For example, with ECH,
the sender will be a browser and the receiver will be a web server.

### Data Structures


**OSSL_HPKE_SUITE** is a structure that holds identifiers for the algorithms
used for KEM, KDF and AEAD operations.

**OSSL_HPKE_CTX** is a context that maintains internal state as HPKE
operations are carried out. Separate **OSSL_HPKE_CTX** objects must be used for
the sender and receiver. Attempting to use a single context for both will
result in errors.

### OSSL_HPKE_SUITE Identifiers


The identifiers used by **OSSL_HPKE_SUITE** are:

The KEM identifier `kem_id` is one of the following:


- 0x10 **OSSL_HPKE_KEM_ID_P256**

- 0x11 **OSSL_HPKE_KEM_ID_P384**

- 0x12 **OSSL_HPKE_KEM_ID_P521**

- 0x20 **OSSL_HPKE_KEM_ID_X25519**

- 0x21 **OSSL_HPKE_KEM_ID_X448**


The KDF identifier `kdf_id` is one of the following:


- 0x01 **OSSL_HPKE_KDF_ID_HKDF_SHA256**

- 0x02 **OSSL_HPKE_KDF_ID_HKDF_SHA384**

- 0x03 **OSSL_HPKE_KDF_ID_HKDF_SHA512**


The AEAD identifier `aead_id` is one of the following:


- 0x01 **OSSL_HPKE_AEAD_ID_AES_GCM_128**

- 0x02 **OSSL_HPKE_AEAD_ID_AES_GCM_256**

- 0x03 **OSSL_HPKE_AEAD_ID_CHACHA_POLY1305**

- 0xFFFF **OSSL_HPKE_AEAD_ID_EXPORTONLY**

The last identifier above indicates that AEAD operations are not needed.
OSSL_HPKE_export() can be used, but OSSL_HPKE_open() and OSSL_HPKE_seal() will
return an error if called with a context using that AEAD identifier.


### HPKE Modes


HPKE supports the following variants of Authentication using a mode Identifier:


- **OSSL_HPKE_MODE_BASE**, 0x00

Authentication is not used.

- **OSSL_HPKE_MODE_PSK**, 0x01

Authenticates possession of a pre-shared key (PSK).

- **OSSL_HPKE_MODE_AUTH**, 0x02

Authenticates possession of a KEM-based sender private key.

- **OSSL_HPKE_MODE_PSKAUTH**, 0x03

A combination of **OSSL_HPKE_MODE_PSK** and **OSSL_HPKE_MODE_AUTH**.
Both the PSK and the senders authentication public/private must be
supplied before the encapsulation/decapsulation operation will work.


For further information related to authentication see L</Pre-Shared Key HPKE
modes> and /Sender-authenticated HPKE Modes.

### HPKE Roles


HPKE contexts have a role - either sender or receiver. This is used
to control which functions can be called and so that senders do not
reuse a key and nonce with different plaintexts.

OSSL_HPKE_CTX_free(), OSSL_HPKE_export(), OSSL_HPKE_CTX_set1_psk(),
and OSSL_HPKE_CTX_get_seq() can be called regardless of role.


- **OSSL_HPKE_ROLE_SENDER**, 0

An `OSSL_HPKE_CTX` with this role can be used with
OSSL_HPKE_encap(), OSSL_HPKE_seal(), OSSL_HPKE_CTX_set1_ikme() and
OSSL_HPKE_CTX_set1_authpriv().

- **OSSL_HPKE_ROLE_RECEIVER**, 1

An `OSSL_HPKE_CTX` with this role can be used with OSSL_HPKE_decap(),
OSSL_HPKE_open(), OSSL_HPKE_CTX_set1_authpub() and OSSL_HPKE_CTX_set_seq().


Calling a function with an incorrect role set on `OSSL_HPKE_CTX` will result
in an error.

### Parameter Size Limits


In order to improve interoperability, RFC9180, section 7.2.1 suggests a
RECOMMENDED maximum size of 64 octets for various input parameters.  In this
implementation we apply a limit of 66 octets for the `ikmlen`, `psklen`, and
`labellen` parameters, and for the length of the string `pskid` for HPKE
functions below. The constant `OSSL_HPKE_MAX_PARMLEN` is defined as the limit
of this value.  (We chose 66 octets so that we can validate all the test
vectors present in RFC9180, Appendix A.)

In accordance with RFC9180, section 9.5, we define a constant
`OSSL_HPKE_MIN_PSKLEN` with a value of 32 for the minimum length of a
pre-shared key, passed in `psklen`.

While RFC9180 also RECOMMENDS a 64 octet limit for the `infolen` parameter,
that is not sufficient for TLS Encrypted ClientHello (ECH) processing, so we
enforce a limit of `OSSL_HPKE_MAX_INFOLEN` with a value of 1024 as the limit
for the `infolen` parameter.

### Context Construct/Free


OSSL_HPKE_CTX_new() creates a **OSSL_HPKE_CTX** context object used for
subsequent HPKE operations, given a `mode` (See /HPKE Modes), `suite` (see
/OSSL_HPKE_SUITE Identifiers) and a `role` (see /HPKE Roles). The
`libctx` and `propq` are used when fetching algorithms from providers and may
be set to NULL.

OSSL_HPKE_CTX_free() frees the `ctx` **OSSL_HPKE_CTX** that was created
previously by a call to OSSL_HPKE_CTX_new().  If the argument to
OSSL_HPKE_CTX_free() is NULL, nothing is done.

### Sender APIs


A sender's goal is to use HPKE to encrypt using a public key, via use of a
KEM, then a KDF and finally an AEAD.  The first step is to encapsulate (using
OSSL_HPKE_encap()) the sender's public value using the recipient's public key,
(`pub`) and to internally derive secrets. This produces the encapsulated public value
(`enc`) to be sent to the recipient in whatever protocol is using HPKE. Having done the
encapsulation step, the sender can then make one or more calls to
OSSL_HPKE_seal() to encrypt plaintexts using the secret stored within `ctx`.

OSSL_HPKE_encap() uses the HPKE context `ctx`, the recipient public value
`pub` of size `publen`, and an optional `info` parameter of size `infolen`,
to produce the encapsulated public value `enc`.
On input `enclen` should contain the maximum size of the `enc` buffer, and returns
the output size. An error will occur if the input `enclen` is
smaller than the value returned from OSSL_HPKE_get_public_encap_size().
`info` may be used to bind other protocol or application artefacts such as identifiers.
Generally, the encapsulated public value `enc` corresponds to a
single-use ephemeral private value created as part of the encapsulation
process. Only a single call to OSSL_HPKE_encap() is allowed for a given
**OSSL_HPKE_CTX**.

OSSL_HPKE_seal() takes the **OSSL_HPKE_CTX** context `ctx`, the plaintext
buffer `pt` of size `ptlen` and optional additional authenticated data buffer
`aad` of size `aadlen`, and returns the ciphertext `ct` of size `ctlen`.
On input `ctlen` should contain the maximum size of the `ct` buffer, and returns
the output size. An error will occur if the input `ctlen` is
smaller than the value returned from OSSL_HPKE_get_public_encap_size().

OSSL_HPKE_encap() must be called before the OSSL_HPKE_seal().  OSSL_HPKE_seal()
may be called multiple times, with an internal "nonce" being incremented by one
after each call.

### Recipient APIs


Recipients using HPKE require a typically less ephemeral private value so that
the public value can be distributed to potential senders via whatever protocol
is using HPKE. For this reason, recipients will generally first generate a key
pair and will need to manage their private key value using standard mechanisms
outside the scope of this API. Private keys use normal EVP_PKEY(3) pointers
so normal private key management mechanisms can be used for the relevant
values.

In order to enable encapsulation, the recipient needs to make it's public value
available to the sender. There is no generic HPKE format defined for that - the
relevant formatting is intended to be defined by the application/protocols that
makes use of HPKE. ECH for example defines an ECHConfig data structure that
combines the public value with other ECH data items. Normal library functions
must therefore be used to extract the public value in the required format based
on the EVP_PKEY(3) for the private value.

OSSL_HPKE_keygen() provides a way for recipients to generate a key pair based
on the HPKE `suite` to be used. It returns a EVP_PKEY(3) pointer
for the private value `priv` and a encoded public key `pub` of size `publen`.
On input `publen` should contain the maximum size of the `pub` buffer, and
returns the output size. An error will occur if the input `publen` is too small.
The `libctx` and `propq` are used when fetching algorithms from providers
and may be set to NULL.
The HPKE specification also defines a deterministic key generation scheme where
the private value is derived from initial keying material (IKM), so
OSSL_HPKE_keygen() also has an option to use that scheme, using the `ikm`
parameter of size `ikmlen`. If either `ikm` is NULL or `ikmlen` is zero,
then a randomly generated key for the relevant `suite` will be produced.
If required `ikmlen` should be greater than or equal to
OSSL_HPKE_get_recommended_ikmelen().

OSSL_HPKE_decap() takes as input the sender's encapsulated public value
produced by OSSL_HPKE_encap() (`enc`) and the recipient's EVP_PKEY(3)
pointer (`prov`), and then re-generates the internal secret derived by the
sender. As before, an optional `info` parameter allows binding that derived
secret to other application/protocol artefacts. Only a single call to
OSSL_HPKE_decap() is allowed for a given **OSSL_HPKE_CTX**.

OSSL_HPKE_open() is used by the recipient to decrypt the ciphertext `ct` of
size `ctlen` using the `ctx` and additional authenticated data `aad` of
size `aadlen`, to produce the plaintext `pt` of size `ptlen`.
On input `ptlen` should contain the maximum size of the `pt` buffer, and
returns the output size. A `pt` buffer that is the same size as the
`ct` buffer will suffice - generally the plaintext output will be
a little smaller than the ciphertext input.
An error will occur if the input `ptlen` is too small.
OSSL_HPKE_open() may be called multiple times, but as with OSSL_HPKE_seal()
there is an internally incrementing nonce value so ciphertexts need to be
presented in the same order as used by the OSSL_HPKE_seal().
See /Re-sequencing if you need to process multiple ciphertexts in a
different order.

### Exporting Secrets


HPKE defines a way to produce exported secrets for use by the
application.

OSSL_HPKE_export() takes as input the **OSSL_HPKE_CTX**, and an application
supplied label `label` of size `labellen`, to produce a secret `secret`
of size `secretlen`. The sender must first call OSSL_HPKE_encap(), and the
receiver must call OSSL_HPKE_decap() in order to derive the same shared secret.

Multiple calls to OSSL_HPKE_export() with the same inputs will produce the
same secret.
`OSSL_HPKE_AEAD_ID_EXPORTONLY` may be used as the **OSSL_HPKE_SUITE** `aead_id`
that is passed to OSSL_HPKE_CTX_new() if the user needs to produce a shared
secret, but does not wish to perform HPKE encryption.

### Sender-authenticated HPKE Modes


HPKE defines modes that support KEM-based sender-authentication
**OSSL_HPKE_MODE_AUTH** and **OSSL_HPKE_MODE_PSKAUTH**. This works by binding
the sender's authentication private/public values into the encapsulation and
decapsulation operations. The key used for such modes must also use the same
KEM as used for the overall exchange. OSSL_HPKE_keygen() can be used to
generate the private value required.

OSSL_HPKE_CTX_set1_authpriv() can be used by the sender to set the senders
private `priv` **EVP_PKEY** key into the **OSSL_HPKE_CTX** `ctx` before calling
OSSL_HPKE_encap().

OSSL_HPKE_CTX_set1_authpub() can be used by the receiver to set the senders
encoded pub key `pub` of size `publen` into the **OSSL_HPKE_CTX** `ctx` before
calling OSSL_HPKE_decap().

### Pre-Shared Key HPKE modes


HPKE also defines a symmetric equivalent to the authentication described above
using a pre-shared key (PSK) and a PSK identifier. PSKs can be used with the
**OSSL_HPKE_MODE_PSK** and **OSSL_HPKE_MODE_PSKAUTH** modes.

OSSL_HPKE_CTX_set1_psk() sets the PSK identifier `pskid` string, and PSK buffer
`psk` of size `psklen` into the `ctx`. If required this must be called
before OSSL_HPKE_encap() or OSSL_HPKE_decap().
As per RFC9180, if required, both `psk` and `pskid` must be set to non-NULL values.
As PSKs are symmetric the same calls must happen on both sender and receiver
sides.

### Deterministic key generation for senders


Normally the senders ephemeral private key is generated randomly inside
OSSL_HPKE_encap() and remains secret.
OSSL_HPKE_CTX_set1_ikme() allows the user to override this behaviour by
setting a deterministic input key material `ikm` of size `ikmlen` into
the **OSSL_HPKE_CTX** `ctx`.
If required OSSL_HPKE_CTX_set1_ikme() can optionally be called before
OSSL_HPKE_encap().
`ikmlen` should be greater than or equal to OSSL_HPKE_get_recommended_ikmelen().

It is generally undesirable to use OSSL_HPKE_CTX_set1_ikme(), since it
exposes the relevant secret to the application rather then preserving it
within the library, and is more likely to result in use of predictable values
or values that leak.

### Re-sequencing


Some protocols may have to deal with packet loss while still being able to
decrypt arriving packets later. We provide a way to set the increment used for
the nonce to the next subsequent call to OSSL_HPKE_open() (but not to
OSSL_HPKE_seal() as explained below).  The OSSL_HPKE_CTX_set_seq() API can be
used for such purposes with the `seq` parameter value resetting the internal
nonce increment to be used for the next call.

A baseline nonce value is established based on the encapsulation or
decapsulation operation and is then incremented by 1 for each call to seal or
open. (In other words, the first `seq` increment defaults to zero.)

If a caller needs to determine how many calls to seal or open have been made
the OSSL_HPKE_CTX_get_seq() API can be used to retrieve the increment (in the
`seq` output) that will be used in the next call to seal or open. That would
return 0 before the first call a sender made to OSSL_HPKE_seal() and 1 after
that first call.

Note that reuse of the same nonce and key with different plaintexts would
be very dangerous and could lead to loss of confidentiality and integrity.
We therefore only support application control over `seq` for decryption
(i.e. OSSL_HPKE_open()) operations.

For compatibility with other implementations these `seq` increments are
represented as `uint64_t`.

### Protocol Convenience Functions


Additional convenience APIs allow the caller to access internal details of
local HPKE support and/or algorithms, such as parameter lengths.

OSSL_HPKE_suite_check() checks if a specific **OSSL_HPKE_SUITE** `suite`
is supported locally.

To assist with memory allocation, OSSL_HPKE_get_ciphertext_size() provides a
way for the caller to know by how much ciphertext will be longer than a
plaintext of length `clearlen`.  (AEAD algorithms add a data integrity tag,
so there is a small amount of ciphertext expansion.)

OSSL_HPKE_get_public_encap_size() provides a way for senders to know how big
the encapsulated public value will be for a given HPKE `suite`.

OSSL_HPKE_get_recommended_ikmelen() returns the recommended Input Key Material
size (in bytes) for a given `suite`. This is needed in cases where the same
public value needs to be regenerated by a sender before calling OSSL_HPKE_seal().
`ikmlen` should be at least this size.

OSSL_HPKE_get_grease_value() produces values of the appropriate length for a
given `suite_in` value (or a random value if `suite_in` is NULL) so that a
protocol using HPKE can send so-called GREASE (see RFC8701) values that are
harder to distinguish from a real use of HPKE. The buffer sizes should
be supplied on input. The output `enc` value will have an appropriate
length for `suite_out` and a random value, and the `ct` output will be
a random value. The relevant sizes for buffers can be found using
OSSL_HPKE_get_ciphertext_size() and OSSL_HPKE_get_public_encap_size().

OSSL_HPKE_str2suite() maps input `str` strings to an **OSSL_HPKE_SUITE** object.
The input `str` should be a comma-separated string with a KEM,
KDF and AEAD name in that order, for example "x25519,hkdf-sha256,aes128gcm".
This can be used by command line tools that accept string form names for HPKE
codepoints. Valid (case-insensitive) names are:
"p-256", "p-384", "p-521", "x25519" and "x448" for KEM,
"hkdf-sha256", "hkdf-sha384" and "hkdf-sha512" for KDF, and
"aes-gcm-128", "aes-gcm-256", "chacha20-poly1305" and "exporter" for AEAD.
String variants of the numbers listed in /OSSL_HPKE_SUITE Identifiers
can also be used.

## RETURN VALUES


OSSL_HPKE_CTX_new() returns an OSSL_HPKE_CTX pointer or NULL on error.

OSSL_HPKE_get_ciphertext_size(), OSSL_HPKE_get_public_encap_size(),
OSSL_HPKE_get_recommended_ikmelen() all return a size_t with the
relevant value or zero on error.

All other functions return 1 for success or zero for error.

## EXAMPLES


This example demonstrates a minimal round-trip using HPKE.

```c
   #include <stddef.h>
   #include <string.h>
   #include <openssl/hpke.h>
   #include <openssl/evp.h>

   /*
    * this is big enough for this example, real code would need different
    * handling
    */
   #define LBUFSIZE 48

   /* Do a round-trip, generating a key, encrypting and decrypting */
   int main(int argc, char **argv)
   {
       int ok = 0;
       int hpke_mode = OSSL_HPKE_MODE_BASE;
       OSSL_HPKE_SUITE hpke_suite = OSSL_HPKE_SUITE_DEFAULT;
       OSSL_HPKE_CTX *sctx = NULL, *rctx = NULL;
       EVP_PKEY *priv = NULL;
       unsigned char pub[LBUFSIZE];
       size_t publen = sizeof(pub);
       unsigned char enc[LBUFSIZE];
       size_t enclen = sizeof(enc);
       unsigned char ct[LBUFSIZE];
       size_t ctlen = sizeof(ct);
       unsigned char clear[LBUFSIZE];
       size_t clearlen = sizeof(clear);
       const unsigned char *pt = "a message not in a bottle";
       size_t ptlen = strlen((char *)pt);
       const unsigned char *info = "Some info";
       size_t infolen = strlen((char *)info);
       unsigned char aad[] = { 1, 2, 3, 4, 5, 6, 7, 8 };
       size_t aadlen = sizeof(aad);

       /*
        * Generate receiver's key pair.
        * The receiver gives this public key to the sender.
        */
       if (OSSL_HPKE_keygen(hpke_suite, pub, &publen, &priv,
                            NULL, 0, NULL, NULL) != 1)
           goto err;

       /* sender's actions - encrypt data using the receivers public key */
       if ((sctx = OSSL_HPKE_CTX_new(hpke_mode, hpke_suite,
                                     OSSL_HPKE_ROLE_SENDER,
                                     NULL, NULL)) == NULL)
           goto err;
       if (OSSL_HPKE_encap(sctx, enc, &enclen, pub, publen, info, infolen) != 1)
           goto err;
       if (OSSL_HPKE_seal(sctx, ct, &ctlen, aad, aadlen, pt, ptlen) != 1)
           goto err;

       /* receiver's actions - decrypt data using the receivers private key */
       if ((rctx = OSSL_HPKE_CTX_new(hpke_mode, hpke_suite,
                                     OSSL_HPKE_ROLE_RECEIVER,
                                     NULL, NULL)) == NULL)
           goto err;
       if (OSSL_HPKE_decap(rctx, enc, enclen, priv, info, infolen) != 1)
           goto err;
       if (OSSL_HPKE_open(rctx, clear, &clearlen, aad, aadlen, ct, ctlen) != 1)
           goto err;
       ok = 1;
   err:
       /* clean up */
       printf(ok ? "All Good!\n" : "Error!\n");
       OSSL_HPKE_CTX_free(rctx);
       OSSL_HPKE_CTX_free(sctx);
       EVP_PKEY_free(priv);
       return 0;
   }

```

## WARNINGS


Note that the OSSL_HPKE_CTX_set_seq() API could be dangerous - if used with GCM
that could lead to nonce-reuse, which is a known danger. So avoid that
entirely, or be very very careful when using that API.

Use of an IKM value for deterministic key generation (via
OSSL_HPKE_CTX_set1_ikme() or OSSL_HPKE_keygen()) creates the potential for
leaking keys (or IKM values). Only use that if really needed and if you
understand how keys or IKM values could be abused.

## SEE ALSO


The RFC9180 specification: https://datatracker.ietf.org/doc/rfc9180/

## HISTORY


This functionality described here was added in OpenSSL 3.2.

## COPYRIGHT


Copyright 2022-2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_HPKE_CTX_new.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_HPKE_CTX_new.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_HPKE_CTX_new.pod`；SHA-256：`4b09ca709eee88f8dd15723401cb4ac8df97e971c59c8198cbf3f9139eb695c9`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
