---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-signature-rsa",
  "title": "OpenSSL：EVP 密码接口 · EVP_SIGNATURE-RSA（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "密码接口",
    "Provider",
    "openssl",
    "EVP_SIGNATURE-RSA",
    "RSA非对称密码"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "7d589f7a75d84b33b9cb2036ae5d411e7f6e3d6f33db685ff0bbebbc653a97a6",
  "generatedHash": "c4cb99dcd9a75f279aabde7bd1ab67e51c5661df361fa4b42373e198d061c6a7",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "EVP 密码接口：EVP_SIGNATURE-RSA - The EVP_PKEY RSA signature implementation",
  "l1": "Support for computing RSA signatures. See EVP_PKEY-RSA(7) for information related to RSA keys. In this list, names are grouped together to signify that they are the same algorithm having multiple names. This also includes the OID in canonical decimal form (which means that they are possible to fetch if the caller has a mere OID which came out in this form after a call to OBJ_obj2txt(3)). The base signature algorithm, supported explicitly fetched with EVP_PKEY_sign_init_ex2(3), and implicitly fetched (through RSA keys) with EVP_DigestSignInit(3) and EVP_DigestVerifyInit(3). It can't be used with EVP_PKEY_sign_message_init(3) PKCS#1 v1.5 RSA signature schemes with diverse message digest algorithms. They are all supported explicitly fetched with EVP_PKEY_sign_init_ex2(3) and EVP_PKEY_sign_message_init(3). They are all pre-set to use the pad ",
  "questions": [
    "EVP_SIGNATURE-RSA 如何用于EVP 密码接口？",
    "EVP_SIGNATURE-RSA 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-focus-crypto-rsa-oaep",
      "kind": "机制参照"
    }
  ],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-signature-rsa",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_SIGNATURE-RSA.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：EVP 密码接口 · EVP_SIGNATURE-RSA（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：EVP 密码接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_SIGNATURE-RSA
- The EVP_PKEY RSA signature implementation

## 技术正文

## NAME


EVP_SIGNATURE-RSA
- The EVP_PKEY RSA signature implementation

## DESCRIPTION


Support for computing RSA signatures.
See EVP_PKEY-RSA(7) for information related to RSA keys.

### Algorithm Names


In this list, names are grouped together to signify that they are the same
algorithm having multiple names.  This also includes the OID in canonical
decimal form (which means that they are possible to fetch if the caller has a
mere OID which came out in this form after a call to OBJ_obj2txt(3)).


- "RSA", "rsaEncryption", "1.2.840.113549.1.1.1"

The base signature algorithm, supported explicitly fetched with
EVP_PKEY_sign_init_ex2(3), and implicitly fetched (through
RSA keys) with EVP_DigestSignInit(3) and
EVP_DigestVerifyInit(3).

It can't be used with EVP_PKEY_sign_message_init(3)

- "RSA-RIPEMD160", "ripemd160WithRSA", "1.3.36.3.3.1.2"

- "RSA-SHA2-256", "RSA-SHA256", "sha256WithRSAEncryption", "1.2.840.113549.1.1.11"

- "RSA-SHA2-384", "RSA-SHA384", "sha384WithRSAEncryption", "1.2.840.113549.1.1.12"

- "RSA-SHA2-512", "RSA-SHA512", "sha512WithRSAEncryption", "1.2.840.113549.1.1.13"

- "RSA-SHA2-224", "RSA-SHA224", "sha224WithRSAEncryption", "1.2.840.113549.1.1.14"

- "RSA-SHA2-512/224", "RSA-SHA512-224", "sha512-224WithRSAEncryption", "1.2.840.113549.1.1.15"

- "RSA-SHA2-512/256", "RSA-SHA512-256", "sha512-256WithRSAEncryption", "1.2.840.113549.1.1.16"

- "RSA-SHA3-224", "id-rsassa-pkcs1-v1_5-with-sha3-224", "2.16.840.1.101.3.4.3.13"

- "RSA-SHA3-256", "id-rsassa-pkcs1-v1_5-with-sha3-256", "2.16.840.1.101.3.4.3.14"

- "RSA-SHA3-384", "id-rsassa-pkcs1-v1_5-with-sha3-384", "2.16.840.1.101.3.4.3.15"

- "RSA-SHA3-512", "id-rsassa-pkcs1-v1_5-with-sha3-512", "2.16.840.1.101.3.4.3.16"

- "RSA-SM3", "sm3WithRSAEncryption", "1.2.156.10197.1.504"

PKCS#1 v1.5 RSA signature schemes with diverse message digest algorithms.  They
are all supported explicitly fetched with EVP_PKEY_sign_init_ex2(3) and
EVP_PKEY_sign_message_init(3).
They are all pre-set to use the pad mode "pkcs1".  This cannot be changed.


### Signature Parameters


The following signature parameters can be set using EVP_PKEY_CTX_set_params().
This may be called after EVP_PKEY_sign_init() or EVP_PKEY_verify_init(),
and before calling EVP_PKEY_sign() or EVP_PKEY_verify().  They may also be set
using EVP_PKEY_sign_init_ex() or EVP_PKEY_verify_init_ex().


- "digest" (**OSSL_SIGNATURE_PARAM_DIGEST**) <UTF8 string>

- "properties" (**OSSL_SIGNATURE_PARAM_PROPERTIES**) <UTF8 string>

These are not supported with the RSA signature schemes that already include a
message digest algorithm, See /Algorithm Names above.

These common parameters are described in provider-signature(7).

- "pad-mode" (**OSSL_SIGNATURE_PARAM_PAD_MODE**) <UTF8 string>

The type of padding to be used. Its value can be one of the following:


- "none" (**OSSL_PKEY_RSA_PAD_MODE_NONE**)

- "pkcs1" (**OSSL_PKEY_RSA_PAD_MODE_PKCSV15**)

- "x931" (**OSSL_PKEY_RSA_PAD_MODE_X931**)

This padding mode is no longer supported by the FIPS provider for signature
generation, but may be used for signature verification for legacy use cases.
(This is a FIPS 140-3 requirement)

- "pss" (**OSSL_PKEY_RSA_PAD_MODE_PSS**)


- "mgf1-digest" (**OSSL_SIGNATURE_PARAM_MGF1_DIGEST**) <UTF8 string>

The digest algorithm name to use for the maskGenAlgorithm used by "pss" mode.

- "mgf1-properties" (**OSSL_SIGNATURE_PARAM_MGF1_PROPERTIES**) <UTF8 string>

Sets the name of the property query associated with the "mgf1-digest" algorithm.
NULL is used if this optional value is not set.

- "saltlen" (**OSSL_SIGNATURE_PARAM_PSS_SALTLEN**) <integer> or <UTF8 string>

The "pss" mode minimum salt length. The value can either be an integer,
a string value representing a number or one of the following string values:


- "digest" (**OSSL_PKEY_RSA_PSS_SALT_LEN_DIGEST**)

Use the same length as the digest size.

- "max" (**OSSL_PKEY_RSA_PSS_SALT_LEN_MAX**)

Use the maximum salt length.

- "auto" (**OSSL_PKEY_RSA_PSS_SALT_LEN_AUTO**)

Auto detect the salt length.

- "auto-digestmax" (**OSSL_PKEY_RSA_PSS_SALT_LEN_AUTO_DIGEST_MAX**)

Auto detect the salt length when verifying.  Maximize the salt length up to the
digest size when signing to comply with FIPS 186-4 section 5.5.



The OpenSSL FIPS provider also supports the following parameters:


- "key-check" (**OSSL_SIGNATURE_PARAM_FIPS_KEY_CHECK**) <integer>

- "digest-check" (**OSSL_SIGNATURE_PARAM_FIPS_DIGEST_CHECK**) <integer>

- "sign-x931-pad-check" (**OSSL_SIGNATURE_PARAM_FIPS_SIGN_X931_PAD_CHECK**) <integer>

These parameters are described in provider-signature(7).

- "rsa-pss-saltlen-check" (**OSSL_SIGNATURE_PARAM_FIPS_RSA_PSS_SALTLEN_CHECK**) <integer>

The default value of 1 causes an error during signature generation or
verification if salt length (**OSSL_SIGNATURE_PARAM_PSS_SALTLEN**) is not between
zero and the output block size of the digest function (inclusive).
Setting this to zero will ignore the error and set the approved "fips-indicator"
to 0.
This option breaks FIPS compliance if it causes the approved "fips-indicator"
to return 0.


The following signature parameters can be retrieved using
EVP_PKEY_CTX_get_params().


- "algorithm-id" (**OSSL_SIGNATURE_PARAM_ALGORITHM_ID**) <octet string>

- "fips-indicator" (**OSSL_SIGNATURE_PARAM_FIPS_APPROVED_INDICATOR**) <integer>

- "verify-message" (**OSSL_SIGNATURE_PARAM_FIPS_VERIFY_MESSAGE** <integer>

These common parameter are described in provider-signature(7).

- "digest" (**OSSL_SIGNATURE_PARAM_DIGEST**) <UTF8 string>

- "pad-mode" (**OSSL_SIGNATURE_PARAM_PAD_MODE**) <UTF8 string>

- "mgf1-digest" (**OSSL_SIGNATURE_PARAM_MGF1_DIGEST**) <UTF8 string>

- "saltlen" (**OSSL_SIGNATURE_PARAM_PSS_SALTLEN**) <integer> or <UTF8 string>

These parameters are as described above.


## SEE ALSO


EVP_PKEY_CTX_set_params(3),
EVP_PKEY_sign(3),
EVP_PKEY_verify(3),
provider-signature(7),

## COPYRIGHT


Copyright 2020-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_SIGNATURE-RSA.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_SIGNATURE-RSA.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_SIGNATURE-RSA.pod`；SHA-256：`7d589f7a75d84b33b9cb2036ae5d411e7f6e3d6f33db685ff0bbebbc653a97a6`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
