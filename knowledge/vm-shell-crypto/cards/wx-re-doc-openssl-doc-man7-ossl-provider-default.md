---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-ossl-provider-default",
  "title": "OpenSSL：Provider 架构 · OSSL_PROVIDER-default（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "Provider",
    "算法获取",
    "openssl",
    "OSSL_PROVIDER-default"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "292d41750f0b66e3b16dba32fb1ac9d4c9710f6e436e1632bd753600d33dd84a",
  "generatedHash": "e62ff99ef210f83d7e91ad4d911e382b29b3531b2a187819da39a26debade2cf",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Provider 架构：OSSL_PROVIDER-default - OpenSSL default provider",
  "l1": "The OpenSSL default provider supplies the majority of OpenSSL's diverse algorithm implementations. If an application doesn't specify anything else explicitly (e.g. in the application or via config), then this is the provider that will be used as fallback: It is loaded automatically the first time that an algorithm is fetched from a provider or a function acting on providers is called and no other provider has been loaded yet. If an attempt to load a provider has already been made (whether successful or not) then the default provider won't be loaded automatically. Therefore if the default provider is to be used in conjunction with other providers then it must be loaded explicitly. Automatic loading of the default provider only occurs a maximum of once; if the default provider is explicitly unloaded then the default provider will not be aut",
  "questions": [
    "OSSL_PROVIDER-default 如何用于Provider 架构？",
    "OSSL_PROVIDER-default 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-ossl-provider-default",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/OSSL_PROVIDER-default.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：Provider 架构 · OSSL_PROVIDER-default（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：Provider 架构。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_PROVIDER-default - OpenSSL default provider

## 技术正文

## NAME


OSSL_PROVIDER-default - OpenSSL default provider

## DESCRIPTION


The OpenSSL default provider supplies the majority of OpenSSL's diverse
algorithm implementations. If an application doesn't specify anything else
explicitly (e.g. in the application or via config), then this is the
provider that will be used as fallback: It is loaded automatically the
first time that an algorithm is fetched from a provider or a function
acting on providers is called and no other provider has been loaded yet.

If an attempt to load a provider has already been made (whether successful
or not) then the default provider won't be loaded automatically. Therefore
if the default provider is to be used in conjunction with other providers
then it must be loaded explicitly. Automatic loading of the default
provider only occurs a maximum of once; if the default provider is
explicitly unloaded then the default provider will not be automatically
loaded again.

### Properties


The implementations in this provider specifically have this property
defined:


- "provider=default"


It may be used in a property query string with fetching functions such as
EVP_MD_fetch(3) or EVP_CIPHER_fetch(3), as well as with other
functions that take a property query string, such as
EVP_PKEY_CTX_new_from_name(3).

It isn't mandatory to query for this property, except to make sure to get
implementations of this provider and none other.

Some implementations may define additional properties.  Exact information is
listed below

## OPERATIONS AND ALGORITHMS


The OpenSSL default provider supports these operations and algorithms:

### Hashing Algorithms / Message Digests



- SHA1, see EVP_MD-SHA1(7)

- SHA2, see EVP_MD-SHA2(7)

- SHA3, see EVP_MD-SHA3(7)

- KECCAK, see EVP_MD-KECCAK(7)

- KECCAK-KMAC, see EVP_MD-KECCAK-KMAC(7)

- SHAKE, see EVP_MD-SHAKE(7)

- BLAKE2, see EVP_MD-BLAKE2(7)

- SM3, see EVP_MD-SM3(7)

- MD5, see EVP_MD-MD5(7)

- MD5-SHA1, see EVP_MD-MD5-SHA1(7)

- RIPEMD160, see EVP_MD-RIPEMD160(7)

- NULL, see EVP_MD-NULL(7)


### Symmetric Ciphers



- AES, see EVP_CIPHER-AES(7)

- ARIA, see EVP_CIPHER-ARIA(7)

- CAMELLIA, see EVP_CIPHER-CAMELLIA(7)

- 3DES, see EVP_CIPHER-DES(7)

- SM4, see EVP_CIPHER-SM4(7)

- ChaCha20, see EVP_CIPHER-CHACHA(7)

- ChaCha20-Poly1305, see EVP_CIPHER-CHACHA(7)

- NULL, see EVP_CIPHER-NULL(7)


### Message Authentication Code (MAC)



- BLAKE2, see EVP_MAC-BLAKE2(7)

- CMAC, see EVP_MAC-CMAC(7)

- GMAC, see EVP_MAC-GMAC(7)

- HMAC, see EVP_MAC-HMAC(7)

- KMAC, see EVP_MAC-KMAC(7)

- SIPHASH, see EVP_MAC-Siphash(7)

- POLY1305, see EVP_MAC-Poly1305(7)


### Key Derivation Function (KDF)



- HKDF, see EVP_KDF-HKDF(7)

- TLS13-KDF, see EVP_KDF-TLS13_KDF(7)

- SSKDF, see EVP_KDF-SS(7)

- PBKDF2, see EVP_KDF-PBKDF2(7)

- PKCS12KDF, see EVP_KDF-PKCS12KDF(7)

- SSHKDF, see EVP_KDF-SSHKDF(7)

- TLS1-PRF, see EVP_KDF-TLS1_PRF(7)

- KBKDF, see EVP_KDF-KB(7)

- X942KDF-ASN1, see EVP_KDF-X942-ASN1(7)

- X942KDF-CONCAT, see EVP_KDF-X942-CONCAT(7)

- X963KDF, see EVP_KDF-X963(7)

- SCRYPT, see EVP_KDF-SCRYPT(7)

- KRB5KDF, see EVP_KDF-KRB5KDF(7)

- HMAC-DRBG, see EVP_KDF-HMAC-DRBG(7)

- ARGON2, see EVP_KDF-ARGON2(7)


### Key Exchange



- DH, see EVP_KEYEXCH-DH(7)

- ECDH, see EVP_KEYEXCH-ECDH(7)

- X25519, see EVP_KEYEXCH-X25519(7)

- X448, see EVP_KEYEXCH-X448(7)

- ML-KEM-512, see EVP_KEM-ML-KEM-512(7)

- ML-KEM-768, see EVP_KEM-ML-KEM-768(7)

- ML-KEM-1024, see EVP_KEM-ML-KEM-1024(7)

- TLS1-PRF

- HKDF

- SCRYPT


### Asymmetric Signature



- DSA, see EVP_SIGNATURE-DSA(7)

- RSA, see EVP_SIGNATURE-RSA(7)

- ED25519, see EVP_SIGNATURE-ED25519(7)

- ED448, see EVP_SIGNATURE-ED448(7)

- ECDSA, see EVP_SIGNATURE-ECDSA(7)

- SM2

- ML-DSA-44, see EVP_SIGNATURE-ML-DSA(7)

- ML-DSA-65, see EVP_SIGNATURE-ML-DSA(7)

- ML-DSA-87, see EVP_SIGNATURE-ML-DSA(7)

- HMAC, see EVP_SIGNATURE-HMAC(7)

- SIPHASH, see EVP_SIGNATURE-Siphash(7)

- POLY1305, see EVP_SIGNATURE-Poly1305(7)

- CMAC, see EVP_SIGNATURE-CMAC(7)

- SLH-DSA-SHA2-128s, see EVP_SIGNATURE-SLH-DSA(7)

- SLH-DSA-SHA2-128f, see EVP_SIGNATURE-SLH-DSA(7)

- SLH-DSA-SHA2-192s, see EVP_SIGNATURE-SLH-DSA(7)

- SLH-DSA-SHA2-192f, see EVP_SIGNATURE-SLH-DSA(7)

- SLH-DSA-SHA2-256s, see EVP_SIGNATURE-SLH-DSA(7)

- SLH-DSA-SHA2-256f, see EVP_SIGNATURE-SLH-DSA(7)

- SLH-DSA-SHAKE-128s, see EVP_SIGNATURE-SLH-DSA(7)

- SLH-DSA-SHAKE-128f, see EVP_SIGNATURE-SLH-DSA(7)

- SLH-DSA-SHAKE-192s, see EVP_SIGNATURE-SLH-DSA(7)

- SLH-DSA-SHAKE-192f, see EVP_SIGNATURE-SLH-DSA(7)

- SLH-DSA-SHAKE-256s, see EVP_SIGNATURE-SLH-DSA(7)

- SLH-DSA-SHAKE-256f, see EVP_SIGNATURE-SLH-DSA(7)


### Asymmetric Cipher



- RSA, see EVP_ASYM_CIPHER-RSA(7)

- SM2, see EVP_ASYM_CIPHER-SM2(7)


### Asymmetric Key Encapsulation



- RSA, see EVP_KEM-RSA(7)

- X25519, see EVP_KEM-X25519(7)

- X448, see EVP_KEM-X448(7)

- EC, see EVP_KEM-EC(7)

- ML-KEM-512, see EVP_KEM-ML-KEM-512(7)

- ML-KEM-768, see EVP_KEM-ML-KEM-768(7)

- ML-KEM-1024, see EVP_KEM-ML-KEM-1024(7)


### Asymmetric Key Management



- DSA, see EVP_KEYMGMT-DSA(7)

- RSA, see EVP_KEYMGMT-RSA(7)

- RSA-PSS

- EC, see EVP_KEYMGMT-EC(7)

- ED25519, see EVP_KEYMGMT-ED25519(7)

- ED448, see EVP_KEYMGMT-ED448(7)

- SM2, see EVP_KEYMGMT-SM2(7)

- DH, see EVP_KEYMGMT-DH(7)

- DHX, see EVP_KEYMGMT-DHX(7)

- X25519, see EVP_KEYMGMT-X25519(7)

- X448, see EVP_KEYMGMT-X448(7)

- ML-DSA-44, see EVP_KEYMGMT-ML-DSA(7)

- ML-DSA-65, see EVP_KEYMGMT-ML-DSA(7)

- ML-DSA-87, see EVP_KEYMGMT-ML-DSA(7)

- MK-KEM-512, see EVP_KEYMGMT-ML-KEM-512(7)

- MK-KEM-768, see EVP_KEYMGMT-ML-KEM-768(7)

- MK-KEM-1024, see EVP_KEYMGMT-ML-KEM-1024(7)

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

- TLS1-PRF

- HKDF

- SCRYPT

- HMAC, see EVP_KEYMGMT-HMAC(7)

- SIPHASH, see EVP_KEYMGMT-Siphash(7)

- POLY1305, see EVP_KEYMGMT-Poly1305(7)

- CMAC, see EVP_KEYMGMT-CMAC(7)


### Random Number Generation



- CTR-DRBG, see EVP_RAND-CTR-DRBG(7)

- HASH-DRBG, see EVP_RAND-HASH-DRBG(7)

- HMAC-DRBG, see EVP_RAND-HMAC-DRBG(7)

- SEED-SRC,  see EVP_RAND-SEED-SRC(7)

- JITTER,  see EVP_RAND-JITTER(7)

- TEST-RAND, see EVP_RAND-TEST-RAND(7)


In addition to this provider, the "SEED-SRC" and "JITTER" algorithms
are also available in the base provider.

### Asymmetric Key Encoder



- RSA

- RSA-PSS

- DH

- DHX

- DSA

- EC

- ED25519

- ED448

- X25519

- X448

- SM2

- ML-DSA-44

- ML-DSA-65

- ML-DSA-87

- ML-KEM-512

- ML-KEM-768

- ML-KEM-1024

- SLH-DSA-SHA2-128s

- SLH-DSA-SHA2-128f

- SLH-DSA-SHA2-192s

- SLH-DSA-SHA2-192f

- SLH-DSA-SHA2-256s

- SLH-DSA-SHA2-256f

- SLH-DSA-SHAKE-128s

- SLH-DSA-SHAKE-128f

- SLH-DSA-SHAKE-192s

- SLH-DSA-SHAKE-192f

- SLH-DSA-SHAKE-256s

- SLH-DSA-SHAKE-256f


In addition to this provider, all of these encoding algorithms are also
available in the base provider. Some of these algorithms may be used in
combination with the FIPS provider.

### Asymmetric Key Decoder



- RSA

- RSA-PSS

- DH

- DHX

- DSA

- EC

- ED25519

- ED448

- X25519

- X448

- SM2

- ML-DSA-44

- ML-DSA-65

- ML-DSA-87

- ML-KEM-512

- ML-KEM-768

- ML-KEM-1024

- SLH-DSA-SHA2-128s

- SLH-DSA-SHA2-128f

- SLH-DSA-SHA2-192s

- SLH-DSA-SHA2-192f

- SLH-DSA-SHA2-256s

- SLH-DSA-SHA2-256f

- SLH-DSA-SHAKE-128s

- SLH-DSA-SHAKE-128f

- SLH-DSA-SHAKE-192s

- SLH-DSA-SHAKE-192f

- SLH-DSA-SHAKE-256s

- SLH-DSA-SHAKE-256f


In addition to this provider, all of these decoding algorithms are also
available in the base provider. Some of these algorithms may be used in
combination with the FIPS provider.

### Stores



- file

- org.openssl.winstore, see OSSL_STORE-winstore(7)


In addition to this provider, all of these store algorithms are also
available in the base provider.

## SEE ALSO


openssl-core.h(7), openssl-core_dispatch.h(7), provider(7),
OSSL_PROVIDER-base(7)

## HISTORY


The RIPEMD160 digest was added to the default provider in OpenSSL 3.0.7.

All other functionality was added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2020-2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/OSSL_PROVIDER-default.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/OSSL_PROVIDER-default.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/OSSL_PROVIDER-default.pod`；SHA-256：`292d41750f0b66e3b16dba32fb1ac9d4c9710f6e436e1632bd753600d33dd84a`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
