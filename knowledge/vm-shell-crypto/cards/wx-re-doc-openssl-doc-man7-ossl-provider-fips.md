---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-ossl-provider-fips",
  "title": "OpenSSL：Provider 架构 · OSSL_PROVIDER-FIPS（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "Provider",
    "算法获取",
    "openssl",
    "OSSL_PROVIDER-FIPS"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "d45d2c3845c5818c84eb7ca03394840e66d8cea7c5be8e7a9dc09993ea98768b",
  "generatedHash": "0cbe88b5aacb0369326a44c4695e13bea168cd5bab19686fb9e81fcf99b23094",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Provider 架构：OSSL_PROVIDER-FIPS - OpenSSL FIPS provider",
  "l1": "The OpenSSL FIPS provider is a special provider that conforms to the Federal Information Processing Standards (FIPS) specified in FIPS 140-3. This 'module' contains an approved set of cryptographic algorithms that is validated by an accredited testing laboratory. The implementations in this provider specifically have these properties defined: It may be used in a property query string with fetching functions such as EVP_MD_fetch(3) or EVP_CIPHER_fetch(3), as well as with other functions that take a property query string, such as EVP_PKEY_CTX_new_from_name(3). To be FIPS compliant, it is mandatory to include `fips=yes` as part of all property queries. This ensures that only FIPS approved implementations are used for cryptographic operations. The `fips=yes` query may also include other non-crypto support operations that are not in the FIPS p",
  "questions": [
    "OSSL_PROVIDER-FIPS 如何用于Provider 架构？",
    "OSSL_PROVIDER-FIPS 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-ossl-provider-fips",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/OSSL_PROVIDER-FIPS.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：Provider 架构 · OSSL_PROVIDER-FIPS（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：Provider 架构。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_PROVIDER-FIPS - OpenSSL FIPS provider

## 技术正文

## NAME


OSSL_PROVIDER-FIPS - OpenSSL FIPS provider

## DESCRIPTION


The OpenSSL FIPS provider is a special provider that conforms to the Federal
Information Processing Standards (FIPS) specified in FIPS 140-3. This 'module'
contains an approved set of cryptographic algorithms that is validated by an
accredited testing laboratory.

### Properties


The implementations in this provider specifically have these properties
defined:


- "provider=fips"

- "fips=yes"


It may be used in a property query string with fetching functions such as
EVP_MD_fetch(3) or EVP_CIPHER_fetch(3), as well as with other
functions that take a property query string, such as
EVP_PKEY_CTX_new_from_name(3).

To be FIPS compliant, it is mandatory to include `fips=yes` as
part of all property queries.  This ensures that only FIPS approved
implementations are used for cryptographic operations.  The `fips=yes`
query may also include other non-crypto support operations that
are not in the FIPS provider, such as asymmetric key encoders, see
OSSL_PROVIDER-default(7)/Asymmetric Key Management.

It is not mandatory to include `provider=fips` as part of your property
query.  Including `provider=fips` in your property query guarantees
that the OpenSSL FIPS provider is used for cryptographic operations
rather than other FIPS capable providers.

### Provider parameters


See provider-base(7)/Provider parameters for a list of base parameters.
Additionally the OpenSSL FIPS provider also supports the following gettable
parameters:


- "security-checks" (**OSSL_OSSL_PROV_PARAM_SECURITY_CHECKS**) <unsigned integer>

For further information refer to the openssl-fipsinstall(1) option
**-no_security_checks**.


## OPERATIONS AND ALGORITHMS


The OpenSSL FIPS provider supports these operations and algorithms:

### Hashing Algorithms / Message Digests



- SHA1, see EVP_MD-SHA1(7)

- SHA2, see EVP_MD-SHA2(7)

- SHA3, see EVP_MD-SHA3(7)

- KECCAK-KMAC, see EVP_MD-KECCAK-KMAC(7)

- SHAKE, see EVP_MD-SHAKE(7)


### Symmetric Ciphers



- AES, see EVP_CIPHER-AES(7)

- 3DES, see EVP_CIPHER-DES(7)

This is an unapproved algorithm.


### Message Authentication Code (MAC)



- CMAC, see EVP_MAC-CMAC(7)

- GMAC, see EVP_MAC-GMAC(7)

- HMAC, see EVP_MAC-HMAC(7)

- KMAC, see EVP_MAC-KMAC(7)


### Key Derivation Function (KDF)



- HKDF, see EVP_KDF-HKDF(7)

- TLS13-KDF, see EVP_KDF-TLS13_KDF(7)

- SSKDF, see EVP_KDF-SS(7)

- PBKDF2, see EVP_KDF-PBKDF2(7)

- SSHKDF, see EVP_KDF-SSHKDF(7)

- TLS1-PRF, see EVP_KDF-TLS1_PRF(7)

- KBKDF, see EVP_KDF-KB(7)

- X942KDF-ASN1, see EVP_KDF-X942-ASN1(7)

- X942KDF-CONCAT, see EVP_KDF-X942-CONCAT(7)

- X963KDF, see EVP_KDF-X963(7)


### Key Exchange



- DH, see EVP_KEYEXCH-DH(7)

- ECDH, see EVP_KEYEXCH-ECDH(7)

- X25519, see EVP_KEYEXCH-X25519(7)

- X448, see EVP_KEYEXCH-X448(7)

- ML-KEM, see EVP_KEM-ML-KEM(7)

- TLS1-PRF

- HKDF


### Asymmetric Signature



- RSA, see EVP_SIGNATURE-RSA(7)

The **X931** padding mode "OSSL_PKEY_RSA_PAD_MODE_X931" is no longer supported
for signature generation, but may be used for verification for legacy use cases.
(This is a FIPS 140-3 requirement)

- DSA, see EVP_SIGNATURE-DSA(7)

- ED25519, see EVP_SIGNATURE-ED25519(7)

- ED448, see EVP_SIGNATURE-ED448(7)

- ECDSA, see EVP_SIGNATURE-ECDSA(7)

- ML-DSA-44, see EVP_SIGNATURE-ML-DSA(7)

- ML-DSA-65, see EVP_SIGNATURE-ML-DSA(7)

- ML-DSA-87, see EVP_SIGNATURE-ML-DSA(7)

- SLH-DSA, see EVP_SIGNATURE-SLH-DSA(7)

- HMAC, see EVP_SIGNATURE-HMAC(7)

- CMAC, see EVP_SIGNATURE-CMAC(7)


### Asymmetric Cipher



- RSA, see EVP_ASYM_CIPHER-RSA(7)


### Asymmetric Key Encapsulation



- RSA, see EVP_KEM-RSA(7)


### Asymmetric Key Management



- DH, see EVP_KEYMGMT-DH(7)

- DHX, see EVP_KEYMGMT-DHX(7)

- DSA, see EVP_KEYMGMT-DSA(7)

- RSA, see EVP_KEYMGMT-RSA(7)

- RSA-PSS

- EC, see EVP_KEYMGMT-EC(7)

- X25519, see EVP_KEYMGMT-X25519(7)

This is an unapproved algorithm.

- X448, see EVP_KEYMGMT-X448(7)

This is an unapproved algorithm.

- ED25519, see EVP_KEYMGMT-ED25519(7)

This is an unapproved algorithm.

- ED448, see EVP_KEYMGMT-ED448(7)

This is an unapproved algorithm.

- TLS1-PRF

- HKDF

- HMAC, see EVP_KEYMGMT-HMAC(7)

- CMAC, see EVP_KEYMGMT-CMAC(7)

- ML-DSA-44, see EVP_KEYMGMT-ML-DSA(7)

- ML-DSA-65, see EVP_KEYMGMT-ML-DSA(7)

- ML-DSA-87, see EVP_KEYMGMT-ML-DSA(7)

- SLH-DSA-SHA2-128s, see EVP_KEYMGMT-SLH-DSA(7)

- SLH-DSA-SHA2-128f, see EVP_KEYMGMT-SLH-DSA(7)

- SLH-DSA-SHA2-192s, see EVP_KEYMGMT-SLH-DSA(7)

- SLH-DSA-SHA2-192f, see EVP_KEYMGMT-SLH-DSA(7)

- SLH-DSA-SHA2-256s, see EVP_KEYMGMT-SLH-DSA(7)

- SLH-DSA-SHA2-256f, see EVP_KEYMGMT-SLH-DSA(7)

- SLH-DSA-SHAKE-128s, see EVP_KEYMGMT-SLH-DSA(7)

- SLH-DSA-SHAKE-128f, see EVP_KEYMGMT-SLH-DSA(7)

- SLH-DSA-SHAKE-192s, see EVP_KEYMGMT-SLH-DSA(7)

- SLH-DSA-SHAKE-192f, see EVP_KEYMGMT-SLH-DSA(7)

- SLH-DSA-SHAKE-256s, see EVP_KEYMGMT-SLH-DSA(7)

- SLH-DSA-SHAKE-256f, see EVP_KEYMGMT-SLH-DSA(7)


### Random Number Generation



- CRNG-TEST, see EVP_RAND-CRNG-TEST(7)

- CTR-DRBG, see EVP_RAND-CTR-DRBG(7)

- HASH-DRBG, see EVP_RAND-HASH-DRBG(7)

- HMAC-DRBG, see EVP_RAND-HMAC-DRBG(7)

- TEST-RAND, see EVP_RAND-TEST-RAND(7)

TEST-RAND is an unapproved algorithm.


## SELF TESTING


One of the requirements for the FIPS module is self testing. An optional callback
mechanism is available to return information to the user using
OSSL_SELF_TEST_set_callback(3).

The parameters passed to the callback are described in OSSL_SELF_TEST_new(3)

The OpenSSL FIPS module uses the following mechanism to provide information
about the self tests as they run.
This is useful for debugging if a self test is failing.
The callback also allows forcing any self test to fail, in order to check that
it operates correctly on failure.
Note that all self tests run even if a self test failure occurs.

The FIPS module passes the following type(s) to OSSL_SELF_TEST_onbegin().


- "Module_Integrity" (**OSSL_SELF_TEST_TYPE_MODULE_INTEGRITY**)

Uses HMAC SHA256 on the module file to validate that the module has not been
modified. The integrity value is compared to a value written to a configuration
file during installation.

- "Install_Integrity" (**OSSL_SELF_TEST_TYPE_INSTALL_INTEGRITY**)

Uses HMAC SHA256 on a fixed string to validate that the installation process
has already been performed and the self test KATS have already been tested,
The integrity value is compared to a value written to a configuration
file after successfully running the self tests during installation.

- "KAT_Cipher" (**OSSL_SELF_TEST_TYPE_KAT_CIPHER**)

Known answer test for a symmetric cipher.

- "KAT_AsymmetricCipher" (**OSSL_SELF_TEST_TYPE_KAT_ASYM_CIPHER**)

Known answer test for a asymmetric cipher.

- "KAT_Digest" (**OSSL_SELF_TEST_TYPE_KAT_DIGEST**)

Known answer test for a digest.

- "KAT_AsymmetricKeyGeneration" (**OSSL_SELF_TEST_TYPE_KAT_ASYM_KEYGEN**)

Known answer test for asymmetric key generation.

- "KAT_Signature" (**OSSL_SELF_TEST_TYPE_KAT_SIGNATURE**)

Known answer test for a signature.

- "PCT_Signature" (**OSSL_SELF_TEST_TYPE_PCT_SIGNATURE**)

Pairwise Consistency check for a signature.

- "KAT_KDF" (**OSSL_SELF_TEST_TYPE_KAT_KDF**)

Known answer test for a key derivation function.

- "KAT_KA" (**OSSL_SELF_TEST_TYPE_KAT_KA**)

Known answer test for key agreement.

- "KAT_KEM" (**OSSL_SELF_TEST_TYPE_KAT_KEM**)

Known answer test for key encapsulation.

- "DRBG" (**OSSL_SELF_TEST_TYPE_DRBG**)

Known answer test for a Deterministic Random Bit Generator.

- "Conditional_PCT" (**OSSL_SELF_TEST_TYPE_PCT**)

Conditional test that is run during the generation or importing of key pairs.

- "Continuous_RNG_Test" (**OSSL_SELF_TEST_TYPE_CRNG**)

Continuous random number generator test.


The "Module_Integrity" self test is always run at startup.
The "Install_Integrity" self test is used to check if the self tests have
already been run at installation time. If they have already run then the
self tests are not run on subsequent startups.
All other self test categories are run once at installation time, except for the
"Pairwise_Consistency_Test".

There is only one instance of the "Module_Integrity" and "Install_Integrity"
self tests. All other self tests may have multiple instances.


The FIPS module passes the following descriptions(s) to OSSL_SELF_TEST_onbegin().


- "HMAC" (**OSSL_SELF_TEST_DESC_INTEGRITY_HMAC**)

"Module_Integrity" and "Install_Integrity" use this.

- "RSA" (**OSSL_SELF_TEST_DESC_PCT_RSA_PKCS1**)

- "RSA" (**OSSL_SELF_TEST_DESC_PCT_RSA**)

- "ECDSA" (**OSSL_SELF_TEST_DESC_PCT_ECDSA**)

- "EDDSA" (**OSSL_SELF_TEST_DESC_PCT_EDDSA**)

- "DSA" (**OSSL_SELF_TEST_DESC_PCT_DSA**)

- "ML-DSA" (**OSSL_SELF_TEST_DESC_PCT_ML_DSA**)

- "ML-KEM" (**OSSL_SELF_TEST_DESC_PCT_ML_KEM**)

- "SLH-DSA" (**OSSL_SELF_TEST_DESC_PCT_SLH_DSA**)

Key generation tests used with the "Pairwise_Consistency_Test" type.

- "RSA_Encrypt" (**OSSL_SELF_TEST_DESC_ASYM_RSA_ENC**)

- "RSA_Decrypt" (**OSSL_SELF_TEST_DESC_ASYM_RSA_DEC**)

"KAT_AsymmetricCipher" uses this to indicate an encrypt or decrypt KAT.

- "ML-DSA" (**OSSL_SELF_TEST_DESC_KEYGEN_ML_DSA**)

- "ML-KEM" (**OSSL_SELF_TEST_DESC_KEYGEN_ML_KEM**)

- "SLH-DSA" (**OSSL_SELF_TEST_DESC_KEYGEN_SLH_DSA**)

"KAT_AsymmetricKeyGeneration" uses this to indicate a key generation KAT.

- "AES_GCM" (**OSSL_SELF_TEST_DESC_CIPHER_AES_GCM**)

- "AES_ECB_Decrypt" (**OSSL_SELF_TEST_DESC_CIPHER_AES_ECB**)

- "TDES" (**OSSL_SELF_TEST_DESC_CIPHER_TDES**)

Symmetric cipher tests used with the "KAT_Cipher" type.

- "SHA1" (**OSSL_SELF_TEST_DESC_MD_SHA1**)

- "SHA2" (**OSSL_SELF_TEST_DESC_MD_SHA2**)

- "SHA3" (**OSSL_SELF_TEST_DESC_MD_SHA3**)

Digest tests used with the "KAT_Digest" type.

- "DSA" (**OSSL_SELF_TEST_DESC_SIGN_DSA**)

- "RSA" (**OSSL_SELF_TEST_DESC_SIGN_RSA**)

- "ECDSA" (**OSSL_SELF_TEST_DESC_SIGN_ECDSA**)

- "EDDSA" (**OSSL_SELF_TEST_DESC_SIGN_EDDSA**)

- "ML-DSA" (**OSSL_SELF_TEST_DESC_SIGN_ML_DSA**)

- "SLH-DSA" (**OSSL_SELF_TEST_DESC_SIGN_SLH_DSA**)

Signature tests used with the "KAT_Signature" type.

- "ECDH" (**OSSL_SELF_TEST_DESC_KA_ECDH**)

- "DH" (**OSSL_SELF_TEST_DESC_KA_DH**)

Key agreement tests used with the "KAT_KA" type.

- "HKDF" (**OSSL_SELF_TEST_DESC_KDF_HKDF**)

- "TLS13_KDF_EXTRACT" (**OSSL_SELF_TEST_DESC_KDF_TLS13_EXTRACT**)

- "TLS13_KDF_EXPAND" (**OSSL_SELF_TEST_DESC_KDF_TLS13_EXPAND**)

- "SSKDF" (**OSSL_SELF_TEST_DESC_KDF_SSKDF**)

- "X963KDF" (**OSSL_SELF_TEST_DESC_KDF_X963KDF**)

- "X942KDF" (**OSSL_SELF_TEST_DESC_KDF_X942KDF**)

- "PBKDF2" (**OSSL_SELF_TEST_DESC_KDF_PBKDF2**)

- "SSHKDF" (**OSSL_SELF_TEST_DESC_KDF_SSHKDF**)

- "TLS12_PRF" (**OSSL_SELF_TEST_DESC_KDF_TLS12_PRF**)

- "KBKDF" (**OSSL_SELF_TEST_DESC_KDF_KBKDF**)

Key Encapsulation Function tests used with the "KAT_KEM" type.

- "KEM_Encap" (**OSSL_SELF_TEST_DESC_ENCAP_KEM**)

- "KEM_Decap" (**OSSL_SELF_TEST_DESC_DECAP_KEM**)

- "KEM_Decap_Reject" (**OSSL_SELF_TEST_DESC_DECAP_REJ_KEM**)

Key Derivation Function tests used with the "KAT_KDF" type.

- "CTR" (**OSSL_SELF_TEST_DESC_DRBG_CTR**)

- "HASH" (**OSSL_SELF_TEST_DESC_DRBG_HASH**)

- "HMAC" (**OSSL_SELF_TEST_DESC_DRBG_HMAC**)

DRBG tests used with the "DRBG" type.

- "RNG" (**OSSL_SELF_TEST_DESC_RNG**)

"Continuous_RNG_Test" uses this.


## EXAMPLES


A simple self test callback is shown below for illustrative purposes.

```c
 #include <openssl/self_test.h>

 static OSSL_CALLBACK self_test_cb;

 static int self_test_cb(const OSSL_PARAM params[], void *arg)
 {
   int ret = 0;
   const OSSL_PARAM *p = NULL;
   const char *phase = NULL, *type = NULL, *desc = NULL;

   p = OSSL_PARAM_locate_const(params, OSSL_PROV_PARAM_SELF_TEST_PHASE);
   if (p == NULL || p->data_type != OSSL_PARAM_UTF8_STRING)
       goto err;
   phase = (const char *)p->data;

   p = OSSL_PARAM_locate_const(params, OSSL_PROV_PARAM_SELF_TEST_DESC);
   if (p == NULL || p->data_type != OSSL_PARAM_UTF8_STRING)
       goto err;
   desc = (const char *)p->data;

   p = OSSL_PARAM_locate_const(params, OSSL_PROV_PARAM_SELF_TEST_TYPE);
   if (p == NULL || p->data_type != OSSL_PARAM_UTF8_STRING)
       goto err;
   type = (const char *)p->data;

   /* Do some logging */
   if (strcmp(phase, OSSL_SELF_TEST_PHASE_START) == 0)
       BIO_printf(bio_out, "%s : (%s) : ", desc, type);
   if (strcmp(phase, OSSL_SELF_TEST_PHASE_PASS) == 0
           || strcmp(phase, OSSL_SELF_TEST_PHASE_FAIL) == 0)
       BIO_printf(bio_out, "%s\n", phase);

   /* Corrupt the SHA1 self test during the 'corrupt' phase by returning 0 */
   if (strcmp(phase, OSSL_SELF_TEST_PHASE_CORRUPT) == 0
           && strcmp(desc, OSSL_SELF_TEST_DESC_MD_SHA1) == 0) {
       BIO_printf(bio_out, "%s %s", phase, desc);
       return 0;
   }
   ret = 1;
 err:
   return ret;
 }

```

## NOTES


Some released versions of OpenSSL do not include a validated
FIPS provider.  To determine which versions have undergone
the validation process, please refer to the
OpenSSL Downloads page.  If you
require FIPS-approved functionality, it is essential to build your FIPS
provider using one of the validated versions listed there.  Normally,
it is possible to utilize a FIPS provider constructed from one of the
validated versions alongside `libcrypto` and `libssl` compiled from any
release within the same major release series.  This flexibility enables
you to address bug fixes and CVEs that fall outside the FIPS boundary.

The FIPS provider in OpenSSL 3.1 includes some non-FIPS validated algorithms,
consequently the property query `fips=yes` is mandatory for applications that
want to operate in a FIPS approved manner.  The algorithms are:


- Triple DES ECB

- Triple DES CBC

- EdDSA


## SEE ALSO


openssl-fipsinstall(1),
fips_config(5),
OSSL_SELF_TEST_set_callback(3),
OSSL_SELF_TEST_new(3),
OSSL_PARAM(3),
openssl-core.h(7),
openssl-core_dispatch.h(7),
provider(7),
https://www.openssl.org/source/

## HISTORY


This functionality was added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2019-2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/OSSL_PROVIDER-FIPS.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/OSSL_PROVIDER-FIPS.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/OSSL_PROVIDER-FIPS.pod`；SHA-256：`d45d2c3845c5818c84eb7ca03394840e66d8cea7c5be8e7a9dc09993ea98768b`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
