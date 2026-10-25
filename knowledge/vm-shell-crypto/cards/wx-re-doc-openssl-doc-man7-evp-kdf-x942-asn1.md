---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-kdf-x942-asn1",
  "title": "OpenSSL：密钥派生：X942-ASN1 · EVP_KDF-X942-ASN1（man7）",
  "type": "note",
  "tags": [
    "密钥派生",
    "KDF",
    "加密算法",
    "openssl",
    "EVP_KDF-X942-ASN1"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "59223be8437f8b905067084c4bfbe53d78b1ee61b3f0603ff546a77c2b508d58",
  "generatedHash": "ca15a85345afe1f217325f6b505d2065b4c6a2ac4dffd282cbf08f35b066f023",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密钥派生：X942-ASN1：EVP_KDF-X942-ASN1 - The X9.42-2003 asn1 EVP_KDF implementation",
  "l1": "The EVP_KDF-X942-ASN1 algorithm implements the key derivation function X942KDF-ASN1. It is used by DH KeyAgreement, to derive a key using input such as a shared secret key and other info. The other info is DER encoded data that contains a 32 bit counter as well as optional fields for \"partyu-info\", \"partyv-info\", \"supp-pubinfo\" and \"supp-privinfo\". This kdf is used by Cryptographic Message Syntax (CMS). The output is considered to be keying material. \"X942KDF-ASN1\" or \"X942KDF\" is the name for this implementation; it can be used with the EVP_KDF_fetch() function. The supported parameters are: These parameters work as described in EVP_KDF(3)/PARAMETERS. The shared secret used for key derivation. This parameter sets the secret. This value should not be used in production and should only be used for ACVP testing. It is an optional octet stri",
  "questions": [
    "EVP_KDF-X942-ASN1 如何用于密钥派生：X942-ASN1？",
    "EVP_KDF-X942-ASN1 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-kdf-x942-asn1",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KDF-X942-ASN1.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密钥派生：X942-ASN1 · EVP_KDF-X942-ASN1（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密钥派生：X942-ASN1。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_KDF-X942-ASN1 - The X9.42-2003 asn1 EVP_KDF implementation

## 技术正文

## NAME


EVP_KDF-X942-ASN1 - The X9.42-2003 asn1 EVP_KDF implementation

## DESCRIPTION


The EVP_KDF-X942-ASN1 algorithm implements the key derivation function
X942KDF-ASN1. It is used by DH KeyAgreement, to derive a key using input such as
a shared secret key and other info. The other info is DER encoded data that
contains a 32 bit counter as well as optional fields for "partyu-info",
"partyv-info", "supp-pubinfo" and "supp-privinfo".
This kdf is used by Cryptographic Message Syntax (CMS).

The output is considered to be keying material.

### Identity


"X942KDF-ASN1" or "X942KDF" is the name for this implementation; it
can be used with the EVP_KDF_fetch() function.

### Supported parameters


The supported parameters are:


- "properties" (**OSSL_KDF_PARAM_PROPERTIES**) <UTF8 string>

- "digest" (**OSSL_KDF_PARAM_DIGEST**) <UTF8 string>

These parameters work as described in EVP_KDF(3)/PARAMETERS.

- "secret" (**OSSL_KDF_PARAM_SECRET**) <octet string>

The shared secret used for key derivation.  This parameter sets the secret.

- "acvp-info" (**OSSL_KDF_PARAM_X942_ACVPINFO**) <octet string>

This value should not be used in production and should only be used for ACVP
testing. It is an optional octet string containing a combined DER encoded blob
of any of the optional fields related to "partyu-info", "partyv-info",
"supp-pubinfo" and "supp-privinfo". If it is specified then none of these other
fields should be used.

- "partyu-info" (**OSSL_KDF_PARAM_X942_PARTYUINFO**) <octet string>

An optional octet string containing public info contributed by the initiator.

- "ukm" (**OSSL_KDF_PARAM_UKM**) <octet string>

An alias for "partyu-info".
In CMS this is the user keying material.

- "partyv-info" (**OSSL_KDF_PARAM_X942_PARTYVINFO**) <octet string>

An optional octet string containing public info contributed by the responder.

- "supp-pubinfo" (**OSSL_KDF_PARAM_X942_SUPP_PUBINFO**) <octet string>

An optional octet string containing some additional, mutually-known public
information. Setting this value also sets "use-keybits" to 0.

- "use-keybits" (**OSSL_KDF_PARAM_X942_USE_KEYBITS**) <integer>

The default value of 1 will use the KEK key length (in bits) as the
"supp-pubinfo". A value of 0 disables setting the "supp-pubinfo".

- "supp-privinfo" (**OSSL_KDF_PARAM_X942_SUPP_PRIVINFO**) <octet string>

An optional octet string containing some additional, mutually-known private
information.

- "cekalg" (**OSSL_KDF_PARAM_CEK_ALG**) <UTF8 string>

This parameter sets the CEK wrapping algorithm name.
Valid values are "AES-128-WRAP", "AES-192-WRAP", "AES-256-WRAP" and "DES3-WRAP".


The OpenSSL FIPS provider also supports the following parameters:


- "fips-indicator" (**OSSL_KDF_PARAM_FIPS_APPROVED_INDICATOR**) <integer>

A getter that returns 1 if the operation is FIPS approved, or 0 otherwise.
This may be used after calling EVP_KDF_derive. It returns 0 if "key-check"
parameter is set to 0 and the check fails.

- "key-check" (**OSSL_KDF_PARAM_FIPS_KEY_CHECK**) <integer>

The default value of 1 causes an error during EVP_KDF_CTX_set_params() if the
length of used key-derivation key (**OSSL_KDF_PARAM_KEY**) is shorter than 112
bits.
Setting this to zero will ignore the error and set the approved
"fips-indicator" to 0.
This option breaks FIPS compliance if it causes the approved "fips-indicator"
to return 0.


## NOTES


A context for X942KDF can be obtained by calling:

```c
EVP_KDF *kdf = EVP_KDF_fetch(NULL, "X942KDF", NULL);
EVP_KDF_CTX *kctx = EVP_KDF_CTX_new(kdf);

```

The output length of an X942KDF is specified via the `keylen`
parameter to the EVP_KDF_derive(3) function.

## EXAMPLES


This example derives 24 bytes, with the secret key "secret" and random user
keying material:

```c
 EVP_KDF_CTX *kctx;
 EVP_KDF_CTX *kctx;
 unsigned char out[192/8];
 unsignred char ukm[64];
 OSSL_PARAM params[5], *p = params;

 if (RAND_bytes(ukm, sizeof(ukm)) <= 0)
     error("RAND_bytes");

 kdf = EVP_KDF_fetch(NULL, "X942KDF", NULL);
 if (kctx == NULL)
     error("EVP_KDF_fetch");
 kctx = EVP_KDF_CTX_new(kdf);
 EVP_KDF_free(kdf);
 if (kctx == NULL)
     error("EVP_KDF_CTX_new");

 *p++ = OSSL_PARAM_construct_utf8_string(OSSL_KDF_PARAM_DIGEST, "SHA256", 0);
 *p++ = OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_SECRET,
                                          "secret", (size_t)6);
 *p++ = OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_UKM, ukm, sizeof(ukm));
 *p++ = OSSL_PARAM_construct_utf8_string(OSSL_KDF_PARAM_CEK_ALG, "AES-256-WRAP, 0);
 *p = OSSL_PARAM_construct_end();
 if (EVP_KDF_derive(kctx, out, sizeof(out), params) <= 0)
     error("EVP_KDF_derive");

 EVP_KDF_CTX_free(kctx);

```

## CONFORMING TO


ANS1 X9.42-2003
RFC 2631

## SEE ALSO


EVP_KDF(3),
EVP_KDF_CTX_new(3),
EVP_KDF_CTX_free(3),
EVP_KDF_CTX_set_params(3),
EVP_KDF_CTX_get_kdf_size(3),
EVP_KDF_derive(3),
EVP_KDF(3)/PARAMETERS

## HISTORY


This functionality was added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2019-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_KDF-X942-ASN1.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KDF-X942-ASN1.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_KDF-X942-ASN1.pod`；SHA-256：`59223be8437f8b905067084c4bfbe53d78b1ee61b3f0603ff546a77c2b508d58`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
