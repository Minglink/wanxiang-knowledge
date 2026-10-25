---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-pkey-dh",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY-DH（man7）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY-DH"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "7616d432582057983eada85e0f9b5ac30b16b815d2f4aa85c15d471411e70878",
  "generatedHash": "bf8ab15db5a08bbe5d9585dba0b143335ec7bb9f6d9c948df5f5fe69972d28c6",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY-DH, EVP_PKEY-DHX, EVP_KEYMGMT-DH, EVP_KEYMGMT-DHX - EVP_PKEY DH and DHX keytype and algorithm support",
  "l1": "For finite field Diffie-Hellman key agreement, two classes of domain parameters can be used: \"safe\" domain parameters that are associated with approved named safe-prime groups, and a class of \"FIPS186-type\" domain parameters. FIPS186-type domain parameters should only be used for backward compatibility with existing applications that cannot be upgraded to use the approved safe-prime groups. See EVP_PKEY-FFC(7) for more information about FFC keys. The **DH** key type uses PKCS#3 format which saves `p` and `g`, but not the `q` value. The **DHX** key type uses X9.42 format which saves the value of `q` and this must be used for FIPS186-4. If key validation is required, users should be aware of the nuances associated with FIPS186-4 style parameters as discussed in /DH and DHX key validation. In addition to the common FFC parameters that all FF",
  "questions": [
    "EVP_PKEY-DH 如何用于非对称密钥与签名？",
    "EVP_PKEY-DH 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-pkey-dh",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_PKEY-DH.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY-DH（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY-DH, EVP_PKEY-DHX, EVP_KEYMGMT-DH, EVP_KEYMGMT-DHX
- EVP_PKEY DH and DHX keytype and algorithm support

## 技术正文

## NAME


EVP_PKEY-DH, EVP_PKEY-DHX, EVP_KEYMGMT-DH, EVP_KEYMGMT-DHX
- EVP_PKEY DH and DHX keytype and algorithm support

## DESCRIPTION


For finite field Diffie-Hellman key agreement, two classes of domain
parameters can be used: "safe" domain parameters that are associated with
approved named safe-prime groups, and a class of "FIPS186-type" domain
parameters. FIPS186-type domain parameters should only be used for backward
compatibility with existing applications that cannot be upgraded to use the
approved safe-prime groups.

See EVP_PKEY-FFC(7) for more information about FFC keys.

The **DH** key type uses PKCS#3 format which saves `p` and `g`, but not the
`q` value.
The **DHX** key type uses X9.42 format which saves the value of `q` and this
must be used for FIPS186-4. If key validation is required, users should be aware
of the nuances associated with FIPS186-4 style parameters as discussed in
/DH and DHX key validation.

### DH and DHX domain parameters


In addition to the common FFC parameters that all FFC keytypes should support
(see EVP_PKEY-FFC(7)/FFC parameters) the **DHX** and **DH** keytype
implementations support the following:


- "group" (**OSSL_PKEY_PARAM_GROUP_NAME**) <UTF8 string>

Sets or gets a string that associates a **DH** or **DHX** named safe prime group
with known values for `p`, `q` and `g`.

The following values can be used by the OpenSSL's default and FIPS providers:
"ffdhe2048", "ffdhe3072", "ffdhe4096", "ffdhe6144", "ffdhe8192",
"modp_2048", "modp_3072", "modp_4096", "modp_6144", "modp_8192".

The following additional values can also be used by OpenSSL's default provider:
"modp_1536", "dh_1024_160", "dh_2048_224", "dh_2048_256".

DH/DHX named groups can be easily validated since the parameters are well known.
For protocols that only transfer `p` and `g` the value of `q` can also be
retrieved.


### DH and DHX additional parameters



- "encoded-pub-key" (**OSSL_PKEY_PARAM_ENCODED_PUBLIC_KEY**) <octet string>

Used for getting and setting the encoding of the DH public key used in a key
exchange message for the TLS protocol.
See EVP_PKEY_set1_encoded_public_key() and EVP_PKEY_get1_encoded_public_key().


### DH additional domain parameters



- "safeprime-generator" (**OSSL_PKEY_PARAM_DH_GENERATOR**) <integer>

Used for DH generation of safe primes using the old safe prime generator code.
The default value is 2.
It is recommended to use a named safe prime group instead, if domain parameter
validation is required.

Randomly generated safe primes are not allowed by FIPS, so setting this value
for the OpenSSL FIPS provider will instead choose a named safe prime group
based on the size of `p`.


### DH and DHX domain parameter / key generation parameters


In addition to the common FFC key generation parameters that all FFC key types
should support (see EVP_PKEY-FFC(7)/FFC key generation parameters) the
**DH** and **DHX** keytype implementation supports the following:


- "type" (**OSSL_PKEY_PARAM_FFC_TYPE**) <UTF8 string>

Sets the type of parameter generation. For **DH** valid values are:


- "fips186_4"

- "default"

- "fips186_2"

These are described in EVP_PKEY-FFC(7)/FFC key generation parameters

- "group"

This specifies that a named safe prime name will be chosen using the "pbits"
type.

- "generator"

A safe prime generator. See the "safeprime-generator" type above.
This is only valid for **DH** keys.


- "pbits" (**OSSL_PKEY_PARAM_FFC_PBITS**) <unsigned integer>

Sets the size (in bits) of the prime 'p'.

For "fips186_4" this must be 2048.
For "fips186_2" this must be 1024.
For "group" this can be any one of 2048, 3072, 4096, 6144 or 8192.

- "priv_len" (**OSSL_PKEY_PARAM_DH_PRIV_LEN**) <integer>

An optional value to set the maximum length of the generated private key.
The default value used if this is not set is the maximum value of
BN_num_bits(`q`)). The minimum value that this can be set to is 2 * s.
Where s is the security strength of the key which has values of
112, 128, 152, 176 and 200 for key sizes of 2048, 3072, 4096, 6144 and 8192.


### DH and DHX key validation


For keys that are not a named group the FIPS186-4 standard specifies that the
values used for FFC parameter generation are also required for parameter
validation. This means that optional FFC domain parameter values for
`seed`, `pcounter` and `gindex` or `hindex` may need to be stored for
validation purposes.
For **DHX** the `seed` and `pcounter` can be stored in ASN1 data
(but the `gindex` or `hindex` cannot be stored). It is recommended to use a
**DH** parameters with named safe prime group instead.

With the OpenSSL FIPS provider, EVP_PKEY_param_check(3) and
EVP_PKEY_param_check_quick(3) behave in the following way: the parameters
are tested if they are either an approved safe prime group OR that the FFC
parameters conform to FIPS186-4 as defined in SP800-56Ar3 I<Assurances of
Domain-Parameter Validity>.

The OpenSSL default provider uses simpler checks that allows there to be no `q`
value for backwards compatibility, however the EVP_PKEY_param_check(3) will
test the `p` value for being a prime (and a safe prime if `q` is missing)
which can take significant time. The EVP_PKEY_param_check_quick(3) avoids
the prime tests.

EVP_PKEY_public_check(3) conforms to SP800-56Ar3
`FFC Full Public-Key Validation`.

EVP_PKEY_public_check_quick(3) conforms to SP800-56Ar3
`FFC Partial Public-Key Validation` when the key is an approved named safe
prime group, otherwise it is the same as EVP_PKEY_public_check(3).

EVP_PKEY_private_check(3) tests that the private key is in the correct range
according to SP800-56Ar3. The OpenSSL FIPS provider requires the value of `q`
to be set (note that this is implicitly set for named safe prime groups).
For backwards compatibility the OpenSSL default provider only requires `p` to
be set.

EVP_PKEY_pairwise_check(3) conforms to SP800-56Ar3
`Owner Assurance of Pair-wise Consistency`.

## EXAMPLES


An **EVP_PKEY** context can be obtained by calling:

```c
   EVP_PKEY_CTX *pctx = EVP_PKEY_CTX_new_from_name(NULL, "DH", NULL);

```

A **DH** key can be generated with a named safe prime group by calling:

```c
   int priv_len = 2 * 112;
   OSSL_PARAM params[3];
   EVP_PKEY *pkey = NULL;
   EVP_PKEY_CTX *pctx = EVP_PKEY_CTX_new_from_name(NULL, "DH", NULL);

   params[0] = OSSL_PARAM_construct_utf8_string("group", "ffdhe2048", 0);
   /* "priv_len" is optional */
   params[1] = OSSL_PARAM_construct_int("priv_len", &priv_len);
   params[2] = OSSL_PARAM_construct_end();

   EVP_PKEY_keygen_init(pctx);
   EVP_PKEY_CTX_set_params(pctx, params);
   EVP_PKEY_generate(pctx, &pkey);
   ...
   EVP_PKEY_free(pkey);
   EVP_PKEY_CTX_free(pctx);

```

**DHX** domain parameters can be generated according to **FIPS186-4** by calling:

```c
   int gindex = 2;
   unsigned int pbits = 2048;
   unsigned int qbits = 256;
   OSSL_PARAM params[6];
   EVP_PKEY *param_key = NULL;
   EVP_PKEY_CTX *pctx = NULL;

   pctx = EVP_PKEY_CTX_new_from_name(NULL, "DHX", NULL);
   EVP_PKEY_paramgen_init(pctx);

   params[0] = OSSL_PARAM_construct_uint("pbits", &pbits);
   params[1] = OSSL_PARAM_construct_uint("qbits", &qbits);
   params[2] = OSSL_PARAM_construct_int("gindex", &gindex);
   params[3] = OSSL_PARAM_construct_utf8_string("type", "fips186_4", 0);
   params[4] = OSSL_PARAM_construct_utf8_string("digest", "SHA256", 0);
   params[5] = OSSL_PARAM_construct_end();
   EVP_PKEY_CTX_set_params(pctx, params);

   EVP_PKEY_generate(pctx, &param_key);

   EVP_PKEY_print_params(bio_out, param_key, 0, NULL);
   ...
   EVP_PKEY_free(param_key);
   EVP_PKEY_CTX_free(pctx);

```

A **DH** key can be generated using domain parameters by calling:

```c
   EVP_PKEY *key = NULL;
   EVP_PKEY_CTX *gctx = EVP_PKEY_CTX_new_from_pkey(NULL, param_key, NULL);

   EVP_PKEY_keygen_init(gctx);
   EVP_PKEY_generate(gctx, &key);
   EVP_PKEY_print_private(bio_out, key, 0, NULL);
   ...
   EVP_PKEY_free(key);
   EVP_PKEY_CTX_free(gctx);

```

To validate **FIPS186-4** **DHX** domain parameters decoded from **PEM** or
**DER** data, additional values used during generation may be required to
be set into the key.

EVP_PKEY_todata(), OSSL_PARAM_merge(), and EVP_PKEY_fromdata() are useful
to add these parameters to the original key or domain parameters before
the actual validation. In production code the return values should be checked.

```c
   EVP_PKEY *received_domp = ...; /* parameters received and decoded */
   unsigned char *seed = ...;     /* and additional parameters received */
   size_t seedlen = ...;          /* by other means, required */
   int gindex = ...;              /* for the validation */
   int pcounter = ...;
   int hindex = ...;
   OSSL_PARAM extra_params[4];
   OSSL_PARAM *domain_params = NULL;
   OSSL_PARAM *merged_params = NULL;
   EVP_PKEY_CTX *ctx = NULL, *validate_ctx = NULL;
   EVP_PKEY *complete_domp = NULL;

   EVP_PKEY_todata(received_domp, OSSL_KEYMGMT_SELECT_DOMAIN_PARAMETERS,
                   &domain_params);
   extra_params[0] = OSSL_PARAM_construct_octet_string("seed", seed, seedlen);
   /*
    * NOTE: For unverifiable g use "hindex" instead of "gindex"
    * extra_params[1] = OSSL_PARAM_construct_int("hindex", &hindex);
    */
   extra_params[1] = OSSL_PARAM_construct_int("gindex", &gindex);
   extra_params[2] = OSSL_PARAM_construct_int("pcounter", &pcounter);
   extra_params[3] = OSSL_PARAM_construct_end();
   merged_params = OSSL_PARAM_merge(domain_params, extra_params);

   ctx = EVP_PKEY_CTX_new_from_name(NULL, "DHX", NULL);
   EVP_PKEY_fromdata_init(ctx);
   EVP_PKEY_fromdata(ctx, &complete_domp, OSSL_KEYMGMT_SELECT_ALL,
                     merged_params);

   validate_ctx = EVP_PKEY_CTX_new_from_pkey(NULL, complete_domp, NULL);
   if (EVP_PKEY_param_check(validate_ctx) > 0)
       /* validation_passed(); */
   else
       /* validation_failed(); */

   OSSL_PARAM_free(domain_params);
   OSSL_PARAM_free(merged_params);
   EVP_PKEY_CTX_free(ctx);
   EVP_PKEY_CTX_free(validate_ctx);
   EVP_PKEY_free(complete_domp);

```

## CONFORMING TO



- RFC 7919 (TLS ffdhe named safe prime groups)

- RFC 3526 (IKE modp named safe prime groups)

- RFC 5114 (Additional DH named groups for dh_1024_160", "dh_2048_224"
```c
         and "dh_2048_256").

```


The following sections of SP800-56Ar3:


- 5.5.1.1 FFC Domain Parameter Selection/Generation

- Appendix D: FFC Safe-prime Groups


The following sections of FIPS186-4:


- A.1.1.2 Generation of Probable Primes p and q Using an Approved Hash Function.

- A.2.3 Generation of canonical generator g.

- A.2.1 Unverifiable Generation of the Generator g.


## SEE ALSO


EVP_PKEY-FFC(7),
EVP_KEYEXCH-DH(7)
EVP_PKEY(3),
provider-keymgmt(7),
EVP_KEYMGMT(3),
OSSL_PROVIDER-default(7),
OSSL_PROVIDER-FIPS(7)

## COPYRIGHT


Copyright 2020-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_PKEY-DH.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_PKEY-DH.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_PKEY-DH.pod`；SHA-256：`7616d432582057983eada85e0f9b5ac30b16b815d2f4aa85c15d471411e70878`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
