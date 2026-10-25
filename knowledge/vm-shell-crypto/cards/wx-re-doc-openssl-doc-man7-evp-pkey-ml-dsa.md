---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-pkey-ml-dsa",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY-ML-DSA（man7）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY-ML-DSA"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "b35f6931981d3a1b69c7dd8f821a9d58450be615b755f887599630aa2cce6d5c",
  "generatedHash": "43e3fd60dfae94478de409c9a4373765e249ebab12fedbccf053932292307690",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY-ML-DSA, EVP_KEYMGMT-ML-DSA, EVP_PKEY-ML-DSA-44, EVP_PKEY-ML-DSA-65, EVP_PKEY-ML-DSA-87 - EVP_PKEY ML-DSA keytype and algorithm support",
  "l1": "ML-DSA implements the algorithms **ML-DSA-44**, **ML-DSA-65** and **ML-DSA-87**. The key types **EVP_PKEY_ML_DSA_44**, **EVP_PKEY_ML_DSA_65** and **EVP_PKEY_ML_DSA_87** are implemented in OpenSSL's default and FIPS providers. These implementations support the associated key, containing the public key `pub` and the private key `priv`. Each of the different key types has an associated security category. This value is one of 2, 3 or 5 for key types **ML-DSA-44**, **ML-DSA-65** and **ML-DSA-87** respectively, which correspond to security strengths of 128, 192 and 256 repsectively. The seed can be used to generate the private and public key components in a deterministic manner. The length of the value supplied must be 32 bytes. When this value is not supplied the seed is generated randomly using a DRBG. Generated keys default to retaining the ",
  "questions": [
    "EVP_PKEY-ML-DSA 如何用于非对称密钥与签名？",
    "EVP_PKEY-ML-DSA 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-pkey-ml-dsa",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_PKEY-ML-DSA.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY-ML-DSA（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY-ML-DSA, EVP_KEYMGMT-ML-DSA,
EVP_PKEY-ML-DSA-44, EVP_PKEY-ML-DSA-65, EVP_PKEY-ML-DSA-87
- EVP_PKEY ML-DSA keytype and algorithm support

## 技术正文

=encoding utf-8

## NAME


EVP_PKEY-ML-DSA, EVP_KEYMGMT-ML-DSA,
EVP_PKEY-ML-DSA-44, EVP_PKEY-ML-DSA-65, EVP_PKEY-ML-DSA-87
- EVP_PKEY ML-DSA keytype and algorithm support

## DESCRIPTION


ML-DSA implements the algorithms **ML-DSA-44**, **ML-DSA-65** and **ML-DSA-87**. 
The key types **EVP_PKEY_ML_DSA_44**, **EVP_PKEY_ML_DSA_65** and
**EVP_PKEY_ML_DSA_87** are implemented in OpenSSL's default and FIPS providers.
These implementations support the associated key, containing the public key `pub`
and the private key `priv`.

Each of the different key types has an associated security category.
This value is one of 2, 3 or 5 for key types **ML-DSA-44**, **ML-DSA-65**
and **ML-DSA-87** respectively, which correspond to security strengths of
128, 192 and 256 repsectively.

### Keygen Parameters



- "seed" (**OSSL_PKEY_PARAM_ML_DSA_SEED**) <octet string>

The seed can be used to generate the private and public key components in a
deterministic manner.
The length of the value supplied must be 32 bytes.
When this value is not supplied the seed is generated randomly using a DRBG. 

Generated keys default to retaining the seed used.
The seed is also by default retained when keys are loaded from **PKCS#8** files
in the seed format.
When available, the seed parameter is also used during key export and import,
with keys (by default) regenerated from the seed even when also provided on import.
See /Provider configuration parameters below for related controls.

When the seed is retained, it is also available as a **gettable** parameter,
and private key output to **PKCS#8** files will by default include the seed.
When the seed was not initially known, or was not retained, **PKCS#8** private
key files will contain only the private key in FIPS 204 `sk` format.

- "properties" (**OSSL_PKEY_PARAM_PROPERTIES**) <UTF8 string>

Sets properties to be used when fetching algorithm implementations used for
ML-DSA hashing operations.


Use EVP_PKEY_CTX_set_params(3) after calling EVP_PKEY_keygen_init(3).

### Common ML-DSA parameters


In addition to the common parameters that all keytypes should support (see
provider-keymgmt(7)/Common Information Parameters, the implementation of
these key types support the parameters listed below.
These are gettable using
EVP_PKEY_get_octet_string_param(3) or EVP_PKEY_get_params(3).
They can be initialised via EVP_PKEY_fromdata(3), and are returned by
EVP_PKEY_todata(3) given a suitable `selection`.
Once a public or private key is configured, it can no longer be modified,
nor can another key component be added.


- "pub" (**OSSL_PKEY_PARAM_PUB_KEY**) <octet string>

The encoded public key value of size 1312, 1952 or 2592 bytes depending on the
respective key type of **ML-DSA-44**, **ML-DSA-65** or **ML-DSA-87**.

- "priv" (**OSSL_PKEY_PARAM_PRIV_KEY**) <octet string>

The encoded private key value of size 2560, 4032 or 4896 bytes depending on the
respective key type of **ML-DSA-44**, **ML-DSA-65** or **ML-DSA-87**.


### Provider configuration parameters


See the description of the **-provparam** option in openssl(1) to learn
how to set provider configuration parameters in the command line tools.
See OSSL_PROVIDER_add_conf_parameter(3) to learn how to set provider
configuration options programmatically.


- `ml-dsa.retain_seed` (**OSSL_PKEY_PARAM_ML_DSA_RETAIN_SEED**) <UTF8 string>

When set to a string representing a false boolean value (see
OSSL_PROVIDER_conf_get_bool(3)), the seed will not be retained after key
generation or key import from a seed value.
If the resulting key is then written to a PKCS#8 object, it will contain
only the FIPS 204 `sk` key.

- `ml-dsa.prefer_seed` (**OSSL_PKEY_PARAM_ML_DSA_PREFER_SEED**) <UTF8 string>

When decoding PKCS#8 objects that contain both a seed and the FIPS 204 `sk`
private key, the seed is by default used to regenerate the key, and the
companion private key is ignored.
When this configuration parameter is set to a string representing a false
boolean value (see OSSL_PROVIDER_conf_get_bool(3)), the seed is ignored
(neither used to regenerate the key, nor retained), and the companion key is
used instead.

- `ml-dsa.input_formats` (**OSSL_PKEY_PARAM_ML_DSA_INPUT_FORMATS**) <UTF8 string>

List of enabled private key input formats when parsing PKCS#8 objects.
List elements are separated by commas, spaces or tabs.
The list of enabled formats can be specified in the configuration file, as seen
in the /EXAMPLES section below, or the via the **-provparam** command-line
option (see also OSSL_PROVIDER_add_conf_parameter(3)).

Values specified on the command-line override any configuration file settings.
By default all the supported formats are enabled.
The supported formats are:


- `seed-priv`:

This format represents **PKCS#8** objects in which both the FIPS 204 32-byte
**ξ** seed and the secret key **sk** are present in the private key as part of
the DER encoding of the ASN.1 sequence:

```c
   ML-DSA-PrivateKey ::= CHOICE {
     seed [0] IMPLICIT OCTET STRING (SIZE (32)),
     expandedKey OCTET STRING (SIZE (2560 | 4032 | 4896)),
     both SEQUENCE {
       seed OCTET STRING (SIZE (32)),
       expandedKey OCTET STRING (SIZE (2560 | 4032 | 4896)) } }

```

If the `seed-priv` format is not included in the list, this format will not be
recognised on input.

- `seed-only`:

This format represents **PKCS#8** objects in which only the 32-byte FIPS 204
**ξ** seed is present in the above sequence.
If the `seed-only` format is not included in the list, this format will not be
recognised on input.

- `priv-only`:

This format represents **PKCS#8** objects in which only the FIPS 204
private key **sk** is present in the above sequence.
If the `priv-only` format is not included in the list, this format will not be
recognised on input.

- `oqskeypair`:

This format represents **PKCS#8** objects in which the private key is a DER
encoding of an octet string containing the concatenaton of the FIPS 204 private
key **sk** and the public key **pk**.
This encoding is used in some builds of the `oqsprovider`.
If the `oqskeypair` format is not included in the list, this format will not be
recognised on input.

- `bare-seed`:

This format represents **PKCS#8** objects in which the private key contains
the 32-byte FIPS 204 seed **ξ** without any ASN.1 encapsulation.
If the `bare-seed` format is not included in the list, this format will not be
recognised on input.

- `bare-priv`:

This format represents **PKCS#8** objects in which the private key contains
the FIPS 204 secret key **sk** without any ASN.1 encapsulation.
If the `bare-priv` format is not included in the list, this format will not be
recognised on input.


- `ml-dsa.output_formats` (**OSSL_PKEY_PARAM_ML_DSA_OUTPUT_FORMATS**) <UTF8 string>

Ordered list of enabled private key output formats when writing **PKCS#8** files.
List elements are separated by commas, spaces or tabs.
The list of enabled formats can be specified in the configuration file, as seen
in the /EXAMPLES section below, or the via the **-provparam** command-line
option.

This supports the same set of formats as described under `ml-dsa.input_formats`
above.
The order in which elements are listed is important, the selected format will be
the first one that is possible to output.
If the key seed is known, the first listed format will be selected.
If the key seed is not known, the first format that omits the seed will be selected.
The default order is equivalent to `seed-priv` first and `priv-only` second, with
both seed and key output when the seed is available, and just the
key otherwise.
If `seed-only` is listed first, then the seed will be output without the key
when available, otherwise the output will have just the key.
If `priv-only` is listed first, then just the key is output regardless of
whether the seed is present.
The legacy `oqskeypair`, `bare-seed` and `bare-priv` formats can also be
output, by listing those first.


## CONFORMING TO



- FIPS 204


## EXAMPLES


An **EVP_PKEY** context can be obtained by calling:

```c
   EVP_PKEY_CTX *pctx =
       EVP_PKEY_CTX_new_from_name(NULL, "ML-DSA-44", NULL);

```

An **ML-DSA-44** key can be generated like this:

```c
   pkey = EVP_PKEY_Q_keygen(NULL, NULL, "ML-DSA-44");

```

The key pair components can be extracted from a key by calling:

```c
   /* Sizes large enough for ML-DSA-87 */
   uint8_t pub[2592], priv[4896], seed[32]:
   size_t priv_len, pub_len, seed_len;

   EVP_PKEY_get_octet_string_param(pkey, OSSL_PKEY_PARAM_ML_DSA_SEED,
                                   seed, sizeof(seed), &seed_len);
   EVP_PKEY_get_octet_string_param(pkey, OSSL_PKEY_PARAM_PRIV_KEY,
                                   priv, sizeof(priv), &priv_len);
   EVP_PKEY_get_octet_string_param(pkey, OSSL_PKEY_PARAM_PUB_KEY,
                                   pub, sizeof(pub), &pub_len));

```

An **ML-DSA** private key in seed format can be converted to a key in the FIPS
204 **sk** format by running:

```c
   $ openssl pkey -provparam ml-dsa.retain_seed=no \
       -in seed-only.pem -out priv-only.pem

```

To generate an, e.g., **ML-DSA-65** key, in FIPS 204 **sk** format, you can run:

```c
   $ openssl genpkey -provparam ml-dsa.retain_seed=no \
       -algorithm ml-dsa-65 -out priv-only.pem

```

If you have a **PKCS#8** file with both a seed and a key, and prefer to import the
companion key rather than the seed, you can run:

```c
   $ openssl pkey -provparam ml-dsa.prefer_seed=no \
       -in seed-priv.pem -out priv-only.pem

```

In the **openssl.cnf** file, this looks like:

```c
   openssl_conf = openssl_init

   [openssl_init]
   providers = providers_sect

   # Can be referenced in one or more provider sections
   [ml_dsa_sect]
   prefer_seed = yes
   retain_seed = yes
   # OQS legacy formats disabled
   input_formats = seed-priv, seed-only, priv-only
   # Output either the seed alone, or else the key alone
   output_formats = seed-only, priv-only

   [providers_sect]
   default = default_sect
   # Or perhaps just: base = default_sect
   base = base_sect

   [default_sect]
   ml-dsa = ml_dsa_sect

   [base_sect]
   ml-dsa = ml_dsa_sect

```

## SEE ALSO


EVP_KEYMGMT(3),
EVP_PKEY(3),
provider-keymgmt(7),
EVP_PKEY_get_raw_private_key(3),
EVP_PKEY_get_raw_public_key(3),
EVP_PKEY_get1_encoded_public_key(3),
OSSL_PROVIDER_add_conf_parameter(3),
provider-keymgmt(7),
EVP_SIGNATURE-ML-DSA(7)

## HISTORY


This functionality was added in OpenSSL 3.5.

## COPYRIGHT


Copyright 2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_PKEY-ML-DSA.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_PKEY-ML-DSA.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_PKEY-ML-DSA.pod`；SHA-256：`b35f6931981d3a1b69c7dd8f821a9d58450be615b755f887599630aa2cce6d5c`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
