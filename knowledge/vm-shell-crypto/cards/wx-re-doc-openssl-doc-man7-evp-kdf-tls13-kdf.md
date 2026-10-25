---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-kdf-tls13-kdf",
  "title": "OpenSSL：密钥派生：TLS13_KDF · EVP_KDF-TLS13_KDF（man7）",
  "type": "note",
  "tags": [
    "密钥派生",
    "KDF",
    "加密算法",
    "openssl",
    "EVP_KDF-TLS13_KDF"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "034c216f98dc723459abe6c6d3cc9fadcf9aef77491369d7895da09d71c99399",
  "generatedHash": "1479c6255055c7fbbd9f04ccab329654d1485929d5ded956736b05065ba3b47d",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密钥派生：TLS13_KDF：EVP_KDF-TLS13_KDF - The TLS 1.3 EVP_KDF implementation",
  "l1": "Support for computing the TLS 1.3 version of the **HKDF** KDF through the **EVP_KDF** API. The EVP_KDF-TLS13_KDF algorithm implements the HKDF key derivation function as used by TLS 1.3. The output is considered to be keying material. \"TLS13-KDF\" is the name for this implementation; it can be used with the EVP_KDF_fetch() function. The supported parameters are: These parameters work as described in EVP_KDF(3)/PARAMETERS. This parameter sets the label prefix on the specified TLS 1.3 KDF context. For TLS 1.3 this should be set to the ASCII string \"tls13 \" without a trailing zero byte. Refer to RFC 8446 section 7.1 \"Key Schedule\" for details. This parameter sets the label on the specified TLS 1.3 KDF context. Refer to RFC 8446 section 7.1 \"Key Schedule\" for details. This parameter sets the context data on the specified TLS 1.3 KDF context. R",
  "questions": [
    "EVP_KDF-TLS13_KDF 如何用于密钥派生：TLS13_KDF？",
    "EVP_KDF-TLS13_KDF 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-kdf-tls13-kdf",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KDF-TLS13_KDF.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密钥派生：TLS13_KDF · EVP_KDF-TLS13_KDF（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密钥派生：TLS13_KDF。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_KDF-TLS13_KDF - The TLS 1.3 EVP_KDF implementation

## 技术正文

## NAME


EVP_KDF-TLS13_KDF - The TLS 1.3 EVP_KDF implementation

## DESCRIPTION


Support for computing the TLS 1.3 version of the **HKDF** KDF through
the **EVP_KDF** API.

The EVP_KDF-TLS13_KDF algorithm implements the HKDF key derivation function
as used by TLS 1.3.

The output is considered to be keying material.

### Identity


"TLS13-KDF" is the name for this implementation; it
can be used with the EVP_KDF_fetch() function.

### Supported parameters


The supported parameters are:


- "properties" (**OSSL_KDF_PARAM_PROPERTIES**) <UTF8 string>

- "digest" (**OSSL_KDF_PARAM_DIGEST**) <UTF8 string>

- "key" (**OSSL_KDF_PARAM_KEY**) <octet string>

- "salt" (**OSSL_KDF_PARAM_SALT**) <octet string>

These parameters work as described in EVP_KDF(3)/PARAMETERS.

- "prefix" (**OSSL_KDF_PARAM_PREFIX**) <octet string>

This parameter sets the label prefix on the specified TLS 1.3 KDF context.
For TLS 1.3 this should be set to the ASCII string "tls13 " without a
trailing zero byte.  Refer to RFC 8446 section 7.1 "Key Schedule" for details.

- "label" (**OSSL_KDF_PARAM_LABEL**) <octet string>

This parameter sets the label on the specified TLS 1.3 KDF context.
Refer to RFC 8446 section 7.1 "Key Schedule" for details.

- "data" (**OSSL_KDF_PARAM_DATA**) <octet string>

This parameter sets the context data on the specified TLS 1.3 KDF context.
Refer to RFC 8446 section 7.1 "Key Schedule" for details.

- "mode" (**OSSL_KDF_PARAM_MODE**) <UTF8 string> or <integer>

This parameter sets the mode for the TLS 1.3 KDF operation.
There are two modes that are currently defined:


- "EXTRACT_ONLY" or **EVP_KDF_HKDF_MODE_EXTRACT_ONLY**

In this mode calling EVP_KDF_derive(3) will just perform the extract
operation. The value returned will be the intermediate fixed-length pseudorandom
key K.  The `keylen` parameter must match the size of K, which can be looked
up by calling EVP_KDF_CTX_get_kdf_size() after setting the mode and digest.

The digest, key and salt values must be set before a key is derived otherwise
an error will occur.

- "EXPAND_ONLY" or **EVP_KDF_HKDF_MODE_EXPAND_ONLY**

In this mode calling EVP_KDF_derive(3) will just perform the expand
operation. The input key should be set to the intermediate fixed-length
pseudorandom key K returned from a previous extract operation.

The digest, key and info values must be set before a key is derived otherwise
an error will occur.



The OpenSSL FIPS provider also supports the following parameters:


- "fips-indicator" (**OSSL_KDF_PARAM_FIPS_APPROVED_INDICATOR**) <integer>

A getter that returns 1 if the operation is FIPS approved, or 0 otherwise.
This may be used after calling EVP_KDF_derive. It returns 0 if any "***-check"
related parameter is set to 0 and the check fails.

- "digest-check" (**OSSL_KDF_PARAM_FIPS_DIGEST_CHECK**) <integer>

The default value of 1 causes an error during EVP_KDF_CTX_set_params() if
used digest is not approved.
Setting this to zero will ignore the error and set the approved
"fips-indicator" to 0.
This option breaks FIPS compliance if it causes the approved "fips-indicator"
to return 0.

According to RFC 8446, the following are approved digest algorithms: SHA2-256,
SHA2-384.

- "key-check" (**OSSL_KDF_PARAM_FIPS_KEY_CHECK**) <integer>

The default value of 1 causes an error during EVP_KDF_CTX_set_params() if the
length of used key-derivation key (**OSSL_KDF_PARAM_KEY**) is shorter than 112
bits.
Setting this to zero will ignore the error and set the approved
"fips-indicator" to 0.
This option breaks FIPS compliance if it causes the approved "fips-indicator"
to return 0.


## NOTES


This KDF is intended for use by the TLS 1.3 implementation in libssl.
It does not support all the options and capabilities that HKDF does.

The `OSSL_PARAM` array passed to EVP_KDF_derive(3) or
EVP_KDF_CTX_set_params(3) must specify all of the parameters required.
This KDF does not support a piecemeal approach to providing these.

A context for a TLS 1.3 KDF can be obtained by calling:

```c
EVP_KDF *kdf = EVP_KDF_fetch(NULL, "TLS13-KDF", NULL);
EVP_KDF_CTX *kctx = EVP_KDF_CTX_new(kdf);

```

The output length of a TLS 1.3 KDF expand operation is specified via the
`keylen` parameter to the EVP_KDF_derive(3) function.  When using
EVP_KDF_HKDF_MODE_EXTRACT_ONLY the `keylen` parameter must equal the size of
the intermediate fixed-length pseudorandom key otherwise an error will occur.
For that mode, the fixed output size can be looked up by calling
EVP_KDF_CTX_get_kdf_size() after setting the mode and digest on the
**EVP_KDF_CTX**.

## CONFORMING TO


RFC 8446

## SEE ALSO


EVP_KDF(3),
EVP_KDF_CTX_new(3),
EVP_KDF_CTX_free(3),
EVP_KDF_CTX_get_kdf_size(3),
EVP_KDF_CTX_set_params(3),
EVP_KDF_derive(3),
EVP_KDF(3)/PARAMETERS,
EVP_KDF-HKDF(7)

## HISTORY


This functionality was added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2021-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_KDF-TLS13_KDF.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KDF-TLS13_KDF.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_KDF-TLS13_KDF.pod`；SHA-256：`034c216f98dc723459abe6c6d3cc9fadcf9aef77491369d7895da09d71c99399`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
