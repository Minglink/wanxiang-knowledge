---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-kdf-tls1-prf",
  "title": "OpenSSL：密钥派生：TLS1_PRF · EVP_KDF-TLS1_PRF（man7）",
  "type": "note",
  "tags": [
    "密钥派生",
    "KDF",
    "加密算法",
    "openssl",
    "EVP_KDF-TLS1_PRF"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "c8b2ba4bc425e5e0cc11ced2558487cd21336319005a66c0ca74708f854f77cd",
  "generatedHash": "d39aab1cfea8065d637f24bb50d74db2e051f413059b02a5b5a726efdcbcee9d",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密钥派生：TLS1_PRF：EVP_KDF-TLS1_PRF - The TLS1 PRF EVP_KDF implementation",
  "l1": "Support for computing the **TLS1** PRF through the **EVP_KDF** API. The EVP_KDF-TLS1_PRF algorithm implements the PRF used by TLS versions up to and including TLS 1.2. The output is considered to be keying material. \"TLS1-PRF\" is the name for this implementation; it can be used with the EVP_KDF_fetch() function. The supported parameters are: These parameters work as described in EVP_KDF(3)/PARAMETERS. The **OSSL_KDF_PARAM_DIGEST** parameter is used to set the message digest associated with the TLS PRF. EVP_md5_sha1() is treated as a special case which uses the PRF algorithm using both **MD5** and **SHA1** as used in TLS 1.0 and 1.1. This parameter sets the secret value of the TLS PRF. Any existing secret value is replaced. This parameter sets the context seed. The length of the context seed cannot exceed 1024 bytes; this should be more th",
  "questions": [
    "EVP_KDF-TLS1_PRF 如何用于密钥派生：TLS1_PRF？",
    "EVP_KDF-TLS1_PRF 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-kdf-tls1-prf",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KDF-TLS1_PRF.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密钥派生：TLS1_PRF · EVP_KDF-TLS1_PRF（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密钥派生：TLS1_PRF。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_KDF-TLS1_PRF - The TLS1 PRF EVP_KDF implementation

## 技术正文

## NAME


EVP_KDF-TLS1_PRF - The TLS1 PRF EVP_KDF implementation

## DESCRIPTION


Support for computing the **TLS1** PRF through the **EVP_KDF** API.

The EVP_KDF-TLS1_PRF algorithm implements the PRF used by TLS versions up to
and including TLS 1.2.

The output is considered to be keying material.

### Identity


"TLS1-PRF" is the name for this implementation; it
can be used with the EVP_KDF_fetch() function.

### Supported parameters


The supported parameters are:


- "properties" (**OSSL_KDF_PARAM_PROPERTIES**) <UTF8 string>

- "digest" (**OSSL_KDF_PARAM_DIGEST**) <UTF8 string>

These parameters work as described in EVP_KDF(3)/PARAMETERS.

The **OSSL_KDF_PARAM_DIGEST** parameter is used to set the message digest
associated with the TLS PRF.
EVP_md5_sha1() is treated as a special case which uses the
PRF algorithm using both **MD5** and **SHA1** as used in TLS 1.0 and 1.1.

- "secret" (**OSSL_KDF_PARAM_SECRET**) <octet string>

This parameter sets the secret value of the TLS PRF.
Any existing secret value is replaced.

- "seed" (**OSSL_KDF_PARAM_SEED**) <octet string>

This parameter sets the context seed.
The length of the context seed cannot exceed 1024 bytes;
this should be more than enough for any normal use of the TLS PRF.


The OpenSSL FIPS provider also supports the following parameters:


- "fips-indicator" (**OSSL_KDF_PARAM_FIPS_APPROVED_INDICATOR**) <integer>

A getter that returns 1 if the operation is FIPS approved, or 0 otherwise.
This may be used after calling EVP_KDF_derive. It returns 0 if any "***-check"
related parameter is set to 0 and the check fails.

- "ems_check" (**OSSL_KDF_PARAM_FIPS_EMS_CHECK**) <integer>

The default value of 1 causes an error during EVP_KDF_derive() if
"master secret" is used instead of "extended master secret" Setting this to zero
will ignore the error and set the approved "fips-indicator" to 0.
This option breaks FIPS compliance if it causes the approved "fips-indicator"
to return 0.

- "digest-check" (**OSSL_KDF_PARAM_FIPS_DIGEST_CHECK**) <integer>

The default value of 1 causes an error during EVP_KDF_CTX_set_params() if
used digest is not approved.
Setting this to zero will ignore the error and set the approved
"fips-indicator" to 0.
This option breaks FIPS compliance if it causes the approved "fips-indicator"
to return 0.

According to SP 800-135r1, the following are approved digest algorithms:
SHA2-256, SHA2-384, SHA2-512.

- "key-check" (**OSSL_KDF_PARAM_FIPS_KEY_CHECK**) <integer>

The default value of 1 causes an error during EVP_KDF_CTX_set_params() if the
length of used key-derivation key (**OSSL_KDF_PARAM_SECRET**) is shorter than 112
bits.
Setting this to zero will ignore the error and set the approved
"fips-indicator" to 0.
This option breaks FIPS compliance if it causes the approved "fips-indicator"
to return 0.


## NOTES


A context for the TLS PRF can be obtained by calling:

```c
EVP_KDF *kdf = EVP_KDF_fetch(NULL, "TLS1-PRF", NULL);
EVP_KDF_CTX *kctx = EVP_KDF_CTX_new(kdf);

```

The digest, secret value and seed must be set before a key is derived otherwise
an error will occur.

The output length of the PRF is specified by the `keylen` parameter to the
EVP_KDF_derive() function.

## EXAMPLES


This example derives 10 bytes using SHA-256 with the secret key "secret"
and seed value "seed":

```c
EVP_KDF *kdf;
EVP_KDF_CTX *kctx;
unsigned char out[10];
OSSL_PARAM params[4], *p = params;

kdf = EVP_KDF_fetch(NULL, "TLS1-PRF", NULL);
kctx = EVP_KDF_CTX_new(kdf);
EVP_KDF_free(kdf);

*p++ = OSSL_PARAM_construct_utf8_string(OSSL_KDF_PARAM_DIGEST,
                                        SN_sha256, strlen(SN_sha256));
*p++ = OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_SECRET,
                                         "secret", (size_t)6);
*p++ = OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_SEED,
                                         "seed", (size_t)4);
*p = OSSL_PARAM_construct_end();
if (EVP_KDF_derive(kctx, out, sizeof(out), params) <= 0) {
    error("EVP_KDF_derive");
}
EVP_KDF_CTX_free(kctx);

```

## CONFORMING TO


RFC 2246, RFC 5246 and NIST SP 800-135 r1

## SEE ALSO


EVP_KDF(3),
EVP_KDF_CTX_new(3),
EVP_KDF_CTX_free(3),
EVP_KDF_CTX_set_params(3),
EVP_KDF_derive(3),
EVP_KDF(3)/PARAMETERS

## HISTORY


This functionality was added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2018-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_KDF-TLS1_PRF.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KDF-TLS1_PRF.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_KDF-TLS1_PRF.pod`；SHA-256：`c8b2ba4bc425e5e0cc11ced2558487cd21336319005a66c0ca74708f854f77cd`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
