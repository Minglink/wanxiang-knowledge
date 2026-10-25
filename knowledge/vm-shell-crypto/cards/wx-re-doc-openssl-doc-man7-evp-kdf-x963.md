---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-kdf-x963",
  "title": "OpenSSL：密钥派生：X963 · EVP_KDF-X963（man7）",
  "type": "note",
  "tags": [
    "密钥派生",
    "KDF",
    "加密算法",
    "openssl",
    "EVP_KDF-X963"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "c7ecb3584be8efa9d59468d6622541db085fec3c713f7bc77426754106e43fa0",
  "generatedHash": "61a24ef5e933f2b5fa41c76a14fb5d8443ff7bded35a80f925a5e03d1f06e252",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密钥派生：X963：EVP_KDF-X963 - The X9.63-2001 EVP_KDF implementation",
  "l1": "The EVP_KDF-X963 algorithm implements the key derivation function (X963KDF). X963KDF is used by Cryptographic Message Syntax (CMS) for EC KeyAgreement, to derive a key using input such as a shared secret key and shared info. The output is considered to be keying material. \"X963KDF\" is the name for this implementation; it can be used with the EVP_KDF_fetch() function. The supported parameters are: These parameters work as described in EVP_KDF(3)/PARAMETERS. The shared secret used for key derivation. This parameter sets the secret. This parameter specifies an optional value for shared info. The OpenSSL FIPS provider also supports the following parameters: A getter that returns 1 if the operation is FIPS approved, or 0 otherwise. This may be used after calling EVP_KDF_derive. It returns 0 if any \"***-check\" related parameter is set to 0 and ",
  "questions": [
    "EVP_KDF-X963 如何用于密钥派生：X963？",
    "EVP_KDF-X963 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-kdf-x963",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KDF-X963.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密钥派生：X963 · EVP_KDF-X963（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密钥派生：X963。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_KDF-X963 - The X9.63-2001 EVP_KDF implementation

## 技术正文

## NAME


EVP_KDF-X963 - The X9.63-2001 EVP_KDF implementation

## DESCRIPTION


The EVP_KDF-X963 algorithm implements the key derivation function (X963KDF).
X963KDF is used by Cryptographic Message Syntax (CMS) for EC KeyAgreement, to
derive a key using input such as a shared secret key and shared info.

The output is considered to be keying material.

### Identity


"X963KDF" is the name for this implementation; it
can be used with the EVP_KDF_fetch() function.

### Supported parameters


The supported parameters are:


- "properties" (**OSSL_KDF_PARAM_PROPERTIES**) <UTF8 string>

- "digest" (**OSSL_KDF_PARAM_DIGEST**) <UTF8 string>

These parameters work as described in EVP_KDF(3)/PARAMETERS.

- "key" (**OSSL_KDF_PARAM_KEY**) <octet string>

The shared secret used for key derivation.
This parameter sets the secret.

- "info" (**OSSL_KDF_PARAM_INFO**) <octet string>

This parameter specifies an optional value for shared info.


The OpenSSL FIPS provider also supports the following parameters:


- "fips-indicator" (**OSSL_KDF_PARAM_FIPS_APPROVED_INDICATOR**) <integer>

A getter that returns 1 if the operation is FIPS approved, or 0 otherwise.
This may be used after calling EVP_KDF_derive. It returns 0 if any "***-check"
related parameter is set to 0 and the check fails.

- "digest-check" (**OSSL_KDF_PARAM_FIPS_DIGEST_CHECK**) <int>

The default value of 1 causes an error during EVP_KDF_CTX_set_params() if
used digest is not approved.
Setting this to zero will ignore the error and set the approved
"fips-indicator" to 0.
This option breaks FIPS compliance if it causes the approved "fips-indicator"
to return 0.

According to ANSI X9.63-2001, the following are approved digest algorithms:
SHA2-224, SHA2-256, SHA2-384, SHA2-512, SHA2-512/224, SHA2-512/256, SHA3-224,
SHA3-256, SHA3-384, SHA3-512.

- "key-check" (**OSSL_KDF_PARAM_FIPS_KEY_CHECK**) <integer>

The default value of 1 causes an error during EVP_KDF_CTX_set_params() if the
length of used key-derivation key (**OSSL_KDF_PARAM_KEY**) is shorter than 112
bits.
Setting this to zero will ignore the error and set the approved
"fips-indicator" to 0.
This option breaks FIPS compliance if it causes the approved "fips-indicator"
to return 0.


## NOTES


X963KDF is very similar to the SSKDF that uses a digest as the auxiliary function,
X963KDF appends the counter to the secret, whereas SSKDF prepends the counter.

A context for X963KDF can be obtained by calling:

```c
EVP_KDF *kdf = EVP_KDF_fetch(NULL, "X963KDF", NULL);
EVP_KDF_CTX *kctx = EVP_KDF_CTX_new(kdf);

```

The output length of an X963KDF is specified via the `keylen`
parameter to the EVP_KDF_derive(3) function.

## EXAMPLES


This example derives 10 bytes, with the secret key "secret" and sharedinfo
value "label":

```c
EVP_KDF *kdf;
EVP_KDF_CTX *kctx;
unsigned char out[10];
OSSL_PARAM params[4], *p = params;

kdf = EVP_KDF_fetch(NULL, "X963KDF", NULL);
kctx = EVP_KDF_CTX_new(kdf);
EVP_KDF_free(kdf);

*p++ = OSSL_PARAM_construct_utf8_string(OSSL_KDF_PARAM_DIGEST,
                                        SN_sha256, strlen(SN_sha256));
*p++ = OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_SECRET,
                                         "secret", (size_t)6);
*p++ = OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_INFO,
                                         "label", (size_t)5);
*p = OSSL_PARAM_construct_end();
if (EVP_KDF_derive(kctx, out, sizeof(out), params) <= 0) {
    error("EVP_KDF_derive");
}

EVP_KDF_CTX_free(kctx);

```

## CONFORMING TO


"SEC 1: Elliptic Curve Cryptography"

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


Copyright 2019-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_KDF-X963.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KDF-X963.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_KDF-X963.pod`；SHA-256：`c7ecb3584be8efa9d59468d6622541db085fec3c713f7bc77426754106e43fa0`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
