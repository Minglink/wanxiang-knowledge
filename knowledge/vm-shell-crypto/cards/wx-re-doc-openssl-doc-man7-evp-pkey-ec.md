---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-pkey-ec",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY-EC（man7）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY-EC"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "ebffd3f144fd4fa48f0e216caa37f782dc400379037210724a91bcb396c8c2b0",
  "generatedHash": "c370ca9a1cd8d84f4191105381c1500c4568c2b524721c5242a70039bec5c72e",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY-EC, EVP_KEYMGMT-EC - EVP_PKEY EC keytype and algorithm support",
  "l1": "The **EC** keytype is implemented in OpenSSL's default provider. The normal way of specifying domain parameters for an EC curve is via the curve name \"group\". For curves with no curve name, explicit parameters can be used that specify \"field-type\", \"p\", \"a\", \"b\", \"generator\" and \"order\". Explicit parameters are supported for backwards compatibility reasons, but they are not compliant with multiple standards (including RFC5915) which only allow named curves. The following Key generation/Gettable/Import/Export types are available for the built-in EC algorithm: The curve name. The value should be either \"prime-field\" or \"characteristic-two-field\", which correspond to prime field Fp and binary field F2^m. For a curve over Fp `p` is the prime for the field. For a curve over F2^m `p` represents the irreducible polynomial - each bit represents a",
  "questions": [
    "EVP_PKEY-EC 如何用于非对称密钥与签名？",
    "EVP_PKEY-EC 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-pkey-ec",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_PKEY-EC.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY-EC（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY-EC,
EVP_KEYMGMT-EC
- EVP_PKEY EC keytype and algorithm support

## 技术正文

## NAME


EVP_PKEY-EC,
EVP_KEYMGMT-EC
- EVP_PKEY EC keytype and algorithm support

## DESCRIPTION


The **EC** keytype is implemented in OpenSSL's default provider.

### Common EC parameters


The normal way of specifying domain parameters for an EC curve is via the
curve name "group". For curves with no curve name, explicit parameters can be
used that specify "field-type", "p", "a", "b", "generator" and "order".
Explicit parameters are supported for backwards compatibility reasons, but they
are not compliant with multiple standards (including RFC5915) which only allow
named curves.

The following Key generation/Gettable/Import/Export types are available for the
built-in EC algorithm:


- "group" (**OSSL_PKEY_PARAM_GROUP_NAME**) <UTF8 string>

The curve name.

- "field-type" (**OSSL_PKEY_PARAM_EC_FIELD_TYPE**) <UTF8 string>

The value should be either "prime-field" or "characteristic-two-field",
which correspond to prime field Fp and binary field F2^m.

- "p" (**OSSL_PKEY_PARAM_EC_P**) <unsigned integer>

For a curve over Fp `p` is the prime for the field. For a curve over F2^m `p`
represents the irreducible polynomial - each bit represents a term in the
polynomial. Therefore, there will either be three or five bits set dependent on
whether the polynomial is a trinomial or a pentanomial.

- "a" (**OSSL_PKEY_PARAM_EC_A**) <unsigned integer>

- "b" (**OSSL_PKEY_PARAM_EC_B**) <unsigned integer>

- "seed" (**OSSL_PKEY_PARAM_EC_SEED**) <octet string>

`a` and `b` represents the coefficients of the curve
For Fp:   y^2 mod p = x^3 +ax + b mod p OR
For F2^m: y^2 + xy = x^3 + ax^2 + b

`seed` is an optional value that is for information purposes only.
It represents the random number seed used to generate the coefficient `b` from a
random number.

- "generator" (**OSSL_PKEY_PARAM_EC_GENERATOR**) <octet string>

- "order" (**OSSL_PKEY_PARAM_EC_ORDER**) <unsigned integer>

- "cofactor" (**OSSL_PKEY_PARAM_EC_COFACTOR**) <unsigned integer>

The `generator` is a well defined point on the curve chosen for cryptographic
operations. The encoding conforms with Sec. 2.3.3 of the SECG SEC 1 ("Elliptic Curve
Cryptography") standard. See EC_POINT_oct2point().
Integers used for point multiplications will be between 0 and
`order` - 1.
`cofactor` is an optional value.
`order` multiplied by the `cofactor` gives the number of points on the curve.

- "decoded-from-explicit" (**OSSL_PKEY_PARAM_EC_DECODED_FROM_EXPLICIT_PARAMS**) <integer>

Gets a flag indicating whether the key or parameters were decoded from explicit
curve parameters. Set to 1 if so or 0 if a named curve was used.

- "use-cofactor-flag" (**OSSL_PKEY_PARAM_USE_COFACTOR_ECDH**) <integer>

Enable Cofactor DH (ECC CDH) if this value is 1, otherwise it uses normal EC DH
if the value is zero. The cofactor variant multiplies the shared secret by the
EC curve's cofactor (note for some curves the cofactor is 1).

See also EVP_KEYEXCH-ECDH(7) for the related
**OSSL_EXCHANGE_PARAM_EC_ECDH_COFACTOR_MODE** parameter that can be set on a
per-operation basis.

- "encoding" (**OSSL_PKEY_PARAM_EC_ENCODING**) <UTF8 string>

Set the format used for serializing the EC group parameters.
Valid values are "explicit" or "named_curve". The default value is "named_curve".

- "point-format" (**OSSL_PKEY_PARAM_EC_POINT_CONVERSION_FORMAT**) <UTF8 string>

Sets or gets the point_conversion_form for the `key`. For a description of
point_conversion_forms please see EC_POINT_new(3). Valid values are
"uncompressed" or "compressed". The default value is "uncompressed".

- "group-check" (**OSSL_PKEY_PARAM_EC_GROUP_CHECK_TYPE**) <UTF8 string>

Sets or Gets the type of group check done when EVP_PKEY_param_check() is called.
Valid values are "default", "named" and "named-nist".
The "named" type checks that the domain parameters match the inbuilt curve parameters,
"named-nist" is similar but also checks that the named curve is a nist curve.
The "default" type does domain parameter validation for the OpenSSL default provider,
but is equivalent to "named-nist" for the OpenSSL FIPS provider.

- "include-public" (**OSSL_PKEY_PARAM_EC_INCLUDE_PUBLIC**) <integer>

Setting this value to 0 indicates that the public key should not be included when
encoding the private key. The default value of 1 will include the public key.

- "pub" (**OSSL_PKEY_PARAM_PUB_KEY**) <octet string>

The public key value in encoded EC point format conforming to Sec. 2.3.3 and
2.3.4 of the SECG SEC 1 ("Elliptic Curve Cryptography") standard.
This parameter is used when importing or exporting the public key value with the
EVP_PKEY_fromdata() and EVP_PKEY_todata() functions.

Note, in particular, that the choice of point compression format used for
encoding the exported value via EVP_PKEY_todata() depends on the underlying
provider implementation.
Before OpenSSL 3.0.8, the implementation of providers included with OpenSSL always
opted for an encoding in compressed format, unconditionally.
Since OpenSSL 3.0.8, the implementation has been changed to honor the
**OSSL_PKEY_PARAM_EC_POINT_CONVERSION_FORMAT** parameter, if set, or to default
to uncompressed format.

- "priv" (**OSSL_PKEY_PARAM_PRIV_KEY**) <unsigned integer>

The private key value.

- "encoded-pub-key" (**OSSL_PKEY_PARAM_ENCODED_PUBLIC_KEY**) <octet string>

Used for getting and setting the encoding of an EC public key. The public key
is expected to be a point conforming to Sec. 2.3.4 of the SECG SEC 1 ("Elliptic
Curve Cryptography") standard.

- "qx" (**OSSL_PKEY_PARAM_EC_PUB_X**) <unsigned integer>

Used for getting the EC public key X component.

- "qy" (**OSSL_PKEY_PARAM_EC_PUB_Y**) <unsigned integer>

Used for getting the EC public key Y component.

- "default-digest" (**OSSL_PKEY_PARAM_DEFAULT_DIGEST**) <UTF8 string>

Getter that returns the default digest name.
(Currently returns "SHA256" as of OpenSSL 3.0).

- "dhkem-ikm" (**OSSL_PKEY_PARAM_DHKEM_IKM**) <octet string>

DHKEM requires the generation of a keypair using an input key material (seed).
Use this to specify the key material used for generation of the private key.
This value should not be reused for other purposes. It can only be used
for the curves "P-256", "P-384" and "P-521" and should have a length of at least
the size of the encoded private key (i.e. 32, 48 and 66 for the listed curves).


The following Gettable types are also available for the built-in EC algorithm:


- "basis-type" (**OSSL_PKEY_PARAM_EC_CHAR2_TYPE**) <UTF8 string>

Supports the values "tpBasis" for a trinomial or "ppBasis" for a pentanomial.
This field is only used for a binary field F2^m.

- "m" (**OSSL_PKEY_PARAM_EC_CHAR2_M**) <integer>

- "tp" (**OSSL_PKEY_PARAM_EC_CHAR2_TP_BASIS**) <integer>

- "k1" (**OSSL_PKEY_PARAM_EC_CHAR2_PP_K1**) <integer>

- "k2" (**OSSL_PKEY_PARAM_EC_CHAR2_PP_K2**) <integer>

- "k3" (**OSSL_PKEY_PARAM_EC_CHAR2_PP_K3**) <integer>

These fields are only used for a binary field F2^m.
`m` is the degree of the binary field.

`tp` is the middle bit of a trinomial so its value must be in the
range m > tp > 0.

`k1`, `k2` and `k3` are used to get the middle bits of a pentanomial such
that m > k3 > k2 > k1 > 0


The following key generation settable parameter is also available for the
OpenSSL FIPS provider's EC algorithm:


- "key-check" (**OSSL_PKEY_PARAM_FIPS_KEY_CHECK**) <integer>

See provider-keymgmt(7)/Common Information Parameters for further information.


The following key generation Gettable parameter is available for the OpenSSL
FIPS provider's EC algorithm:


- "fips-indicator" (**OSSL_PKEY_PARAM_FIPS_APPROVED_INDICATOR**) <integer>

See provider-keymgmt(7)/Common Information Parameters for further information.


### EC key validation


For EC keys, EVP_PKEY_param_check(3) behaves in the following way:
For the OpenSSL default provider it uses either
EC_GROUP_check(3) or EC_GROUP_check_named_curve(3) depending on the flag
EC_FLAG_CHECK_NAMED_GROUP.
The OpenSSL FIPS provider uses EC_GROUP_check_named_curve(3) in order to
conform to SP800-56Ar3 `Assurances of Domain-Parameter Validity`.

For EC keys, EVP_PKEY_param_check_quick(3) is equivalent to
EVP_PKEY_param_check(3).

For EC keys, EVP_PKEY_public_check(3) and EVP_PKEY_public_check_quick(3)
conform to SP800-56Ar3 `ECC Full Public-Key Validation` and
`ECC Partial Public-Key Validation` respectively.

For EC Keys, EVP_PKEY_private_check(3) and EVP_PKEY_pairwise_check(3)
conform to SP800-56Ar3 `Private key validity` and
`Owner Assurance of Pair-wise Consistency` respectively.

## EXAMPLES


An **EVP_PKEY** context can be obtained by calling:

```c
   EVP_PKEY_CTX *pctx =
       EVP_PKEY_CTX_new_from_name(NULL, "EC", NULL);

```

An **EVP_PKEY** ECDSA or ECDH key can be generated with a "P-256" named group by
calling:

```c
   pkey = EVP_EC_gen("P-256");

```

or like this:

```c
   EVP_PKEY *key = NULL;
   OSSL_PARAM params[2];
   EVP_PKEY_CTX *gctx =
       EVP_PKEY_CTX_new_from_name(NULL, "EC", NULL);

   EVP_PKEY_keygen_init(gctx);

   params[0] = OSSL_PARAM_construct_utf8_string(OSSL_PKEY_PARAM_GROUP_NAME,
                                                "P-256", 0);
   params[1] = OSSL_PARAM_construct_end();
   EVP_PKEY_CTX_set_params(gctx, params);

   EVP_PKEY_generate(gctx, &key);

   EVP_PKEY_print_private(bio_out, key, 0, NULL);
   ...
   EVP_PKEY_free(key);
   EVP_PKEY_CTX_free(gctx);

```

An **EVP_PKEY** EC CDH (Cofactor Diffie-Hellman) key can be generated with a
"K-571" named group by calling:

```c
   int use_cdh = 1;
   EVP_PKEY *key = NULL;
   OSSL_PARAM params[3];
   EVP_PKEY_CTX *gctx =
       EVP_PKEY_CTX_new_from_name(NULL, "EC", NULL);

   EVP_PKEY_keygen_init(gctx);

   params[0] = OSSL_PARAM_construct_utf8_string(OSSL_PKEY_PARAM_GROUP_NAME,
                                                "K-571", 0);
   /*
    * This curve has a cofactor that is not 1 - so setting CDH mode changes
    * the behaviour. For many curves the cofactor is 1 - so setting this has
    * no effect.
    */
   params[1] = OSSL_PARAM_construct_int(OSSL_PKEY_PARAM_USE_COFACTOR_ECDH,
                                        &use_cdh);
   params[2] = OSSL_PARAM_construct_end();
   EVP_PKEY_CTX_set_params(gctx, params);

   EVP_PKEY_generate(gctx, &key);
   EVP_PKEY_print_private(bio_out, key, 0, NULL);
   ...
   EVP_PKEY_free(key);
   EVP_PKEY_CTX_free(gctx);

```

## SEE ALSO


EVP_EC_gen(3),
EVP_KEYMGMT(3),
EVP_PKEY(3),
provider-keymgmt(7),
EVP_SIGNATURE-ECDSA(7),
EVP_KEYEXCH-ECDH(7)

## COPYRIGHT


Copyright 2020-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_PKEY-EC.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_PKEY-EC.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_PKEY-EC.pod`；SHA-256：`ebffd3f144fd4fa48f0e216caa37f782dc400379037210724a91bcb396c8c2b0`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
