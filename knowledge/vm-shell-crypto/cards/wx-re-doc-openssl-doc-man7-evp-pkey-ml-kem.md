---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-pkey-ml-kem",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY-ML-KEM（man7）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY-ML-KEM"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "37ed2ba4fd46a0a47c20f360d59769ea841d01db3608c900e8cf603bbec46021",
  "generatedHash": "0a17f803bc73fd3426327166fdc5f9ad17b032b90f29c0e5c559f6e7eca1ecd5",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY-ML-KEM, EVP_KEYMGMT-ML-KEM, EVP_PKEY-ML-KEM-512, EVP_PKEY-ML-KEM-768, EVP_PKEY-ML-KEM-1024, EVP_KEYMGMT-ML-KEM-512, EVP_KEYMGMT-ML-KEM-768, EVP_KEYMGMT-ML-KEM-1024 - ML-KEM keytype and algorithm support",
  "l1": "The **ML-KEM-512**, **ML-KEM-768**, and **ML-KEM-1024** keytypes are implemented in OpenSSL's default and FIPS providers. No mandatory parameters are required for generating a key pair. To set explicit parameters, use EVP_PKEY_CTX_set_params() after calling EVP_PKEY_keygen_init(). Internally, ML-KEM generates keys using a 64-byte random value (seed), which is the concatenation of the 32-byte `d` and `z` parameters described in FIPS 203. This optional parameter can be used to set a pre-determined seed prior to keypair generation. Generated keys default to retaining the seed used. The seed is also by default retained when keys are loaded from **PKCS#8** files in the seed format. When available, the seed parameter is also used during key export and import, with keys (by default) regenerated from the seed even when also provided on import. Se",
  "questions": [
    "EVP_PKEY-ML-KEM 如何用于非对称密钥与签名？",
    "EVP_PKEY-ML-KEM 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-pkey-ml-kem",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_PKEY-ML-KEM.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY-ML-KEM（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY-ML-KEM,
EVP_KEYMGMT-ML-KEM,
EVP_PKEY-ML-KEM-512,
EVP_PKEY-ML-KEM-768,
EVP_PKEY-ML-KEM-1024,
EVP_KEYMGMT-ML-KEM-512,
EVP_KEYMGMT-ML-KEM-768,
EVP_KEYMGMT-ML-KEM-1024
- ML-KEM keytype and algorithm support

## 技术正文

## NAME


EVP_PKEY-ML-KEM,
EVP_KEYMGMT-ML-KEM,
EVP_PKEY-ML-KEM-512,
EVP_PKEY-ML-KEM-768,
EVP_PKEY-ML-KEM-1024,
EVP_KEYMGMT-ML-KEM-512,
EVP_KEYMGMT-ML-KEM-768,
EVP_KEYMGMT-ML-KEM-1024
- ML-KEM keytype and algorithm support

## DESCRIPTION


The **ML-KEM-512**, **ML-KEM-768**, and **ML-KEM-1024** keytypes are implemented
in OpenSSL's default and FIPS providers.

### Keygen Parameters


No mandatory parameters are required for generating a key pair.
To set explicit parameters, use EVP_PKEY_CTX_set_params() after calling
EVP_PKEY_keygen_init().


- "seed" (**OSSL_PKEY_PARAM_ML_KEM_SEED**) <octet string>

Internally, ML-KEM generates keys using a 64-byte random value (seed), which is
the concatenation of the 32-byte `d` and `z` parameters described in FIPS 203.
This optional parameter can be used to set a pre-determined seed prior to
keypair generation.

Generated keys default to retaining the seed used.
The seed is also by default retained when keys are loaded from **PKCS#8** files
in the seed format.
When available, the seed parameter is also used during key export and import,
with keys (by default) regenerated from the seed even when also provided on import.
See /Provider configuration parameters below for related controls.

When the seed is retained, it is also available as a **gettable** parameter,
and private key output to **PKCS#8** files will by default include the seed.
When the seed was not initially known, or was not retained, **PKCS#8** private
key files will contain only the private key in FIPS 203 `dk` format.

- "properties" (**OSSL_PKEY_PARAM_PROPERTIES**) <UTF8 string>

Sets properties to be used when fetching algorithm implementations used for
ML-KEM hashing operations.

Use EVP_PKEY_CTX_set_params(3) after calling EVP_PKEY_keygen_init(3).


### Common parameters


In addition to the common parameters that all keytypes should support (see
provider-keymgmt(7)/Common Information Parameters), **ML-KEM** keys
keys support the parameters listed below.
These are gettable using
EVP_PKEY_get_octet_string_param(3) or EVP_PKEY_get_params(3).
They can be initialised via EVP_PKEY_fromdata(3), and are returned by
EVP_PKEY_todata(3) given a suitable `selection`.
Once a public or private key is configured, it can no longer be modified,
nor can another key component be added.


- "pub" (**OSSL_PKEY_PARAM_PUB_KEY**) <octet string>

The public key value.

This parameter is used when importing or exporting the public key value with
the EVP_PKEY_fromdata() and EVP_PKEY_todata() functions.
The key length and content is that of the FIPS 203 (Algorithm 16:
**ML-KEM.KeyGen_internal**) **ek** public key for the given ML-KEM variant.
Initial import aside, this parameter is otherwise only gettable.

- "priv" (**OSSL_PKEY_PARAM_PRIV_KEY**) <octet string>

The private key value.

This parameter is used when importing or exporting the private key value with
the EVP_PKEY_fromdata() and EVP_PKEY_todata() functions.
The key length and content is that of the FIPS 203 (Algorithm 16:
**ML-KEM.KeyGen_internal**) **dk** private key for the given ML-KEM variant.
Initial import aside, this parameter is otherwise only gettable.

- "encoded-pub-key" (**OSSL_PKEY_PARAM_ENCODED_PUBLIC_KEY**) <octet string>

Used for getting and setting the encoding of a public key.
The key format is that of **ek** in FIPS 203, Algorithm 16:
**ML-KEM.KeyGen_internal**.
Updates of the public and private key components are only allowed on keys that
are empty.
Once a public or private key component is set, no further changes are allowed.
This parameter is gettable and settable (once only).


### Provider configuration parameters


See the description of the **-provparam** option in openssl(1) to learn
how to set provider configuration parameters in the command line tools.
See OSSL_PROVIDER_add_conf_parameter(3) to learn how to set provider
configuration options programmatically.


- `ml-kem.import_pct_type` (**OSSL_PKEY_PARAM_ML_KEM_IMPORT_PCT_TYPE**) <UTF8 string>

When an **ML-KEM** key is imported as an explict FIPS 203 **dk** decapsulation
key, rather than a seed, a pairwise consistency test (PCT) is optionally
performed.
By default, or when this parameter is set explicitly to `random`, the PCT
is performed with a random entropy value for the encapsulation step.
Setting the parameter to `fixed`, still runs the test, but the encapsulation
entropy is a fixed 32 byte value.
Specifying any other value of the parameter, e.g. `none`, skips the test.

- `ml-kem.retain_seed` (**OSSL_PKEY_PARAM_ML_KEM_RETAIN_SEED**) <UTF8 string>

When set to a string representing a false boolean value (see
OSSL_PROVIDER_conf_get_bool(3)), the seed will not be retained after key
generation or key import from a seed value.
If the resulting key is then written to a PKCS#8 object, it will contain
only the FIPS 203 `dk` key.

- `ml-kem.prefer_seed` (**OSSL_PKEY_PARAM_ML_KEM_PREFER_SEED**) <UTF8 string>

When decoding PKCS#8 objects that contain both a seed and the FIPS 203 `dk`
private key, the seed is by default used to regenerate the key, and the
companion key is ignored.
When this configuration parameter is set to a string representing a false
boolean value (see OSSL_PROVIDER_conf_get_bool(3)), the seed is ignored
(neither used to regenerate the key, nor retained), and the companion key is
used instead.

- `ml-kem.input_formats` (**OSSL_PKEY_PARAM_ML_KEM_INPUT_FORMATS**) <UTF8 string>

List of enabled private key input formats when parsing PKCS#8 objects.
List elements are separated by commas and/or spaces or tabs.
The list of enabled formats can be specified in the configuration file, as seen
in the /EXAMPLES section below, or the via the **-provparam** command-line
option (see also OSSL_PROVIDER_add_conf_parameter(3)).

Values specified on the command-line override any configuration file settings.
By default all the supported formats are enabled.
The supported formats are:


- `seed-priv`:

This format represents **PKCS#8** objects in which both the FIPS 203 64-byte
**(d, z)** seed and the decapsulation key **dk** are present in the private key
as part of the DER encoding of the ASN.1 sequence:

```c
   ML-KEM-PrivateKey ::= CHOICE {
     seed [0] IMPLICIT OCTET STRING (SIZE (64)),
     expandedKey OCTET STRING (SIZE (1632 | 2400 | 3168)),
     both SEQUENCE {
       seed OCTET STRING (SIZE (64)),
       expandedKey OCTET STRING (SIZE (1632 | 2400 | 3168)) } }

```

If the `seed-priv` format is not included in the list, this format will not be
recognised on input.

- `seed-only`:

This format represents **PKCS#8** objects in which only the 64-byte **(d, z)**
seed is present in the above sequence.
If the `seed-only` format is not included in the list, this format will not be
recognised on input.

- `priv-only`:

This format represents **PKCS#8** objects in which only the FIPS 203
decapsulation key **dk** is present in the above sequence.
If the `priv-only` format is not included in the list, this format will not be
recognised on input.

- `oqskeypair`:

This format represents **PKCS#8** objects in which the private key is a DER
encoding of an octet string containing the concatenaton of the FIPS 203
decapsulation key **dk** and the encapsulation key **ek**.
This encoding is used in some builds of the `oqsprovider`.
If the `oqskeypair` format is not included in the list, this format will not be
recognised on input.

- `bare-seed`:

This format represents **PKCS#8** objects in which the private key contains
the 64-byte FIPS 204 seed **(d, z)** without any ASN.1 encapsulation.
If the `bare-seed` format is not included in the list, this format will not be
recognised on input.

- `bare-priv`:

This format represents **PKCS#8** objects in which the private key contains
the FIPS 204 decapsulation key **dk** without any ASN.1 encapsulation.
If the `bare-priv` format is not included in the list, this format will not be
recognised on input.


- `ml-kem.output_formats` (**OSSL_PKEY_PARAM_ML_KEM_OUTPUT_FORMATS**) <UTF8 string>

Ordered list of enabled private key output formats when writing **PKCS#8** files.
List elements are separated by commas, spaces or tabs.
The list of enabled formats can be specified in the configuration file, as seen
in the /EXAMPLES section below, or the via the **-provparam** command-line
option.

This supports the same set of formats as described under `ml-kem.input_formats`
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



- FIPS 203


## EXAMPLES


An **EVP_PKEY** context can be obtained by calling:

```c
   EVP_PKEY_CTX *pctx =
       EVP_PKEY_CTX_new_from_name(NULL, "ML-KEM-768", NULL);

```

An **ML-KEM-768** key can be generated like this:

```c
   pkey = EVP_PKEY_Q_keygen(NULL, NULL, "ML-KEM-768");

```

An **ML-KEM** private key in seed format can be converted to a key in the FIPS
203 **dk** format by running:

```c
   $ openssl pkey -provparam ml-kem.retain_seed=no \
       -in seed-only.pem -out priv-only.pem

```

To generate an, e.g., **ML-KEM-768** key, in FIPS 203 **dk** format, you can run:

```c
   $ openssl genpkey -provparam ml-kem.retain_seed=no \
       -algorithm ml-kem-768 -out priv-only.pem

```

If you have a **PKCS#8** file with both a seed and a key, and prefer to import the
companion key rather than the seed, you can run:

```c
   $ openssl pkey -provparam ml-kem.prefer_seed=no \
       -in seed-priv.pem -out priv-only.pem

```

In the **openssl.cnf** file, this looks like:

```c
   openssl_conf = openssl_init

   [openssl_init]
   providers = providers_sect

   # Can be referenced in one or more provider sections
   [ml_kem_sect]
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
   ml-kem = ml_kem_sect

   [base_sect]
   ml-kem = ml_kem_sect

```

## SEE ALSO


openssl(1),
openssl-pkey(1),
openssl-genpkey(1),
EVP_KEYMGMT(3),
EVP_PKEY(3),
EVP_PKEY_get_raw_private_key(3),
EVP_PKEY_get_raw_public_key(3),
EVP_PKEY_get1_encoded_public_key(3),
OSSL_PROVIDER_add_conf_parameter(3),
provider-keymgmt(7),
EVP_KEM-ML-KEM(7)

## HISTORY


This functionality was added in OpenSSL 3.5.

## COPYRIGHT


Copyright 2024-2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_PKEY-ML-KEM.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_PKEY-ML-KEM.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_PKEY-ML-KEM.pod`；SHA-256：`37ed2ba4fd46a0a47c20f360d59769ea841d01db3608c900e8cf603bbec46021`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
