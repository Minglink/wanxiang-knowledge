---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-kdf-ss",
  "title": "OpenSSL：密钥派生：SS · EVP_KDF-SS（man7）",
  "type": "note",
  "tags": [
    "密钥派生",
    "KDF",
    "加密算法",
    "openssl",
    "EVP_KDF-SS"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "0620468158feddf83267d05e04bfc7688d30080147c01ee0161bd5ce3c3a6a0f",
  "generatedHash": "e6603682c58cf66225062ccc8c1f574ae233df5cbf9c6fdb602ffebab3172b76",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密钥派生：SS：EVP_KDF-SS - The Single Step / One Step EVP_KDF implementation",
  "l1": "The EVP_KDF-SS algorithm implements the Single Step key derivation function (SSKDF). SSKDF derives a key using input such as a shared secret key (that was generated during the execution of a key establishment scheme) and fixedinfo. SSKDF is also informally referred to as 'Concat KDF'. The output is considered to be keying material. The implementation uses a selectable auxiliary function H, which can be one of: Both the HMAC and KMAC implementations set the key using the 'salt' value. The hash and HMAC also require the digest to be set. \"SSKDF\" is the name for this implementation; it can be used with the EVP_KDF_fetch() function. The supported parameters are: This parameter is ignored for KMAC. These parameters work as described in EVP_KDF(3)/PARAMETERS. This parameter set the shared secret that is used for key derivation. This parameter s",
  "questions": [
    "EVP_KDF-SS 如何用于密钥派生：SS？",
    "EVP_KDF-SS 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-kdf-ss",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KDF-SS.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密钥派生：SS · EVP_KDF-SS（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密钥派生：SS。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_KDF-SS - The Single Step / One Step EVP_KDF implementation

## 技术正文

## NAME


EVP_KDF-SS - The Single Step / One Step EVP_KDF implementation

## DESCRIPTION


The EVP_KDF-SS algorithm implements the Single Step key derivation function (SSKDF).
SSKDF derives a key using input such as a shared secret key (that was generated
during the execution of a key establishment scheme) and fixedinfo.
SSKDF is also informally referred to as 'Concat KDF'.

The output is considered to be keying material.

### Auxiliary function


The implementation uses a selectable auxiliary function H, which can be one of:


- **H(x) = hash(x, digest=md)**

- **H(x) = HMAC_hash(x, key=salt, digest=md)**

- **H(x) = KMACxxx(x, key=salt, custom="KDF", outlen=mac_size)**


Both the HMAC and KMAC implementations set the key using the 'salt' value.
The hash and HMAC also require the digest to be set.

### Identity


"SSKDF" is the name for this implementation; it
can be used with the EVP_KDF_fetch() function.

### Supported parameters


The supported parameters are:


- "properties" (**OSSL_KDF_PARAM_PROPERTIES**) <UTF8 string>

- "digest" (**OSSL_KDF_PARAM_DIGEST**) <UTF8 string>

This parameter is ignored for KMAC.

- "mac" (**OSSL_KDF_PARAM_MAC**) <UTF8 string>

- "maclen" (**OSSL_KDF_PARAM_MAC_SIZE**) <unsigned integer>

- "salt" (**OSSL_KDF_PARAM_SALT**) <octet string>

These parameters work as described in EVP_KDF(3)/PARAMETERS.

- "key" (**OSSL_KDF_PARAM_SECRET**) <octet string>

This parameter set the shared secret that is used for key derivation.

- "info" (**OSSL_KDF_PARAM_INFO**) <octet string>

This parameter sets an optional value for fixedinfo, also known as otherinfo.


The OpenSSL FIPS provider also supports the following parameters:


- "fips-indicator" (**OSSL_KDF_PARAM_FIPS_APPROVED_INDICATOR**) <integer>

A getter that returns 1 if the operation is FIPS approved, or 0 otherwise.
This may be used after calling EVP_KDF_derive. It returns 0 if "key-check"
is set to 0 and the check fails.

- "key-check" (**OSSL_KDF_PARAM_FIPS_KEY_CHECK**) <integer>

The default value of 1 causes an error during EVP_KDF_CTX_set_params() if the
length of used key-derivation key (**OSSL_KDF_PARAM_KEY**) is shorter than 112
bits.
Setting this to zero will ignore the error and set the approved
"fips-indicator" to 0.
This option breaks FIPS compliance if it causes the approved "fips-indicator"
to return 0.


## NOTES


A context for SSKDF can be obtained by calling:

```c
EVP_KDF *kdf = EVP_KDF_fetch(NULL, "SSKDF", NULL);
EVP_KDF_CTX *kctx = EVP_KDF_CTX_new(kdf);

```

The output length of an SSKDF is specified via the `keylen`
parameter to the EVP_KDF_derive(3) function.

## EXAMPLES


This example derives 10 bytes using H(x) = SHA-256, with the secret key "secret"
and fixedinfo value "label":

```c
EVP_KDF *kdf;
EVP_KDF_CTX *kctx;
unsigned char out[10];
OSSL_PARAM params[4], *p = params;

kdf = EVP_KDF_fetch(NULL, "SSKDF", NULL);
kctx = EVP_KDF_CTX_new(kdf);
EVP_KDF_free(kdf);

*p++ = OSSL_PARAM_construct_utf8_string(OSSL_KDF_PARAM_DIGEST,
                                        SN_sha256, strlen(SN_sha256));
*p++ = OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_KEY,
                                         "secret", (size_t)6);
*p++ = OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_INFO,
                                         "label", (size_t)5);
*p = OSSL_PARAM_construct_end();
if (EVP_KDF_derive(kctx, out, sizeof(out), params) <= 0) {
    error("EVP_KDF_derive");
}

EVP_KDF_CTX_free(kctx);

```

This example derives 10 bytes using H(x) = HMAC(SHA-256), with the secret key "secret",
fixedinfo value "label" and salt "salt":

```c
EVP_KDF *kdf;
EVP_KDF_CTX *kctx;
unsigned char out[10];
OSSL_PARAM params[6], *p = params;

kdf = EVP_KDF_fetch(NULL, "SSKDF", NULL);
kctx = EVP_KDF_CTX_new(kdf);
EVP_KDF_free(kdf);

*p++ = OSSL_PARAM_construct_utf8_string(OSSL_KDF_PARAM_MAC,
                                        SN_hmac, strlen(SN_hmac));
*p++ = OSSL_PARAM_construct_utf8_string(OSSL_KDF_PARAM_DIGEST,
                                        SN_sha256, strlen(SN_sha256));
*p++ = OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_SECRET,
                                         "secret", (size_t)6);
*p++ = OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_INFO,
                                         "label", (size_t)5);
*p++ = OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_SALT,
                                         "salt", (size_t)4);
*p = OSSL_PARAM_construct_end();
if (EVP_KDF_derive(kctx, out, sizeof(out), params) <= 0) {
    error("EVP_KDF_derive");
}

EVP_KDF_CTX_free(kctx);

```

This example derives 10 bytes using H(x) = KMAC128(x,salt,outlen), with the secret key "secret"
fixedinfo value "label", salt of "salt" and KMAC outlen of 20:

```c
EVP_KDF *kdf;
EVP_KDF_CTX *kctx;
unsigned char out[10];
OSSL_PARAM params[6], *p = params;

kdf = EVP_KDF_fetch(NULL, "SSKDF", NULL);
kctx = EVP_KDF_CTX_new(kdf);
EVP_KDF_free(kdf);

*p++ = OSSL_PARAM_construct_utf8_string(OSSL_KDF_PARAM_MAC,
                                        SN_kmac128, strlen(SN_kmac128));
*p++ = OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_SECRET,
                                         "secret", (size_t)6);
*p++ = OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_INFO,
                                         "label", (size_t)5);
*p++ = OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_SALT,
                                         "salt", (size_t)4);
*p++ = OSSL_PARAM_construct_size_t(OSSL_KDF_PARAM_MAC_SIZE, (size_t)20);
*p = OSSL_PARAM_construct_end();
if (EVP_KDF_derive(kctx, out, sizeof(out), params) <= 0) {
    error("EVP_KDF_derive");
}

EVP_KDF_CTX_free(kctx);

```

## CONFORMING TO


NIST SP800-56Cr1.

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


Copyright 2019-2024 The OpenSSL Project Authors. All Rights Reserved.  Copyright
(c) 2019, Oracle and/or its affiliates.  All rights reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_KDF-SS.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KDF-SS.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_KDF-SS.pod`；SHA-256：`0620468158feddf83267d05e04bfc7688d30080147c01ee0161bd5ce3c3a6a0f`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
