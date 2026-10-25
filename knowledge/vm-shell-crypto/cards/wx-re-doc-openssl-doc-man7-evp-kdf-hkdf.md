---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-kdf-hkdf",
  "title": "OpenSSL：密钥派生：HKDF · EVP_KDF-HKDF（man7）",
  "type": "note",
  "tags": [
    "密钥派生",
    "KDF",
    "加密算法",
    "openssl",
    "EVP_KDF-HKDF",
    "HKDF密钥派生"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "d8ffd6c6db7c9c5b67f5d2402f94f4976dfcc03f7ded549a47b84ac5da1e367f",
  "generatedHash": "5edde61693b43a9932ff7c4f2bc13fda3ae1fd5ad8b06a1bb0e2c5b8a5bb437f",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密钥派生：HKDF：EVP_KDF-HKDF - The HKDF EVP_KDF implementation",
  "l1": "Support for computing the **HKDF** KDF through the **EVP_KDF** API. The EVP_KDF-HKDF algorithm implements the HKDF key derivation function. HKDF follows the \"extract-then-expand\" paradigm, where the KDF logically consists of two modules. The first stage takes the input keying material and \"extracts\" from it a fixed-length pseudorandom key K. The second stage \"expands\" the key K into several additional pseudorandom keys (the output of the KDF). The output is considered to be keying material. \"HKDF\" is the name for this implementation; it can be used with the EVP_KDF_fetch() function. The supported parameters are: These parameters work as described in EVP_KDF(3)/PARAMETERS. This parameter sets the info value. The length of the context info buffer cannot exceed 1024 bytes; this should be more than enough for any normal use of HKDF. This para",
  "questions": [
    "EVP_KDF-HKDF 如何用于密钥派生：HKDF？",
    "EVP_KDF-HKDF 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-focus-crypto-hkdf-context",
      "kind": "机制参照"
    }
  ],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-kdf-hkdf",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KDF-HKDF.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密钥派生：HKDF · EVP_KDF-HKDF（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密钥派生：HKDF。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_KDF-HKDF - The HKDF EVP_KDF implementation

## 技术正文

## NAME


EVP_KDF-HKDF - The HKDF EVP_KDF implementation

## DESCRIPTION


Support for computing the **HKDF** KDF through the **EVP_KDF** API.

The EVP_KDF-HKDF algorithm implements the HKDF key derivation function.
HKDF follows the "extract-then-expand" paradigm, where the KDF logically
consists of two modules. The first stage takes the input keying material
and "extracts" from it a fixed-length pseudorandom key K. The second stage
"expands" the key K into several additional pseudorandom keys (the output
of the KDF).

The output is considered to be keying material.

### Identity


"HKDF" is the name for this implementation; it
can be used with the EVP_KDF_fetch() function.

### Supported parameters


The supported parameters are:


- "properties" (**OSSL_KDF_PARAM_PROPERTIES**) <UTF8 string>

- "digest" (**OSSL_KDF_PARAM_DIGEST**) <UTF8 string>

- "key" (**OSSL_KDF_PARAM_KEY**) <octet string>

- "salt" (**OSSL_KDF_PARAM_SALT**) <octet string>

These parameters work as described in EVP_KDF(3)/PARAMETERS.

- "info" (**OSSL_KDF_PARAM_INFO**) <octet string>

This parameter sets the info value.
The length of the context info buffer cannot exceed 1024 bytes;
this should be more than enough for any normal use of HKDF.

- "mode" (**OSSL_KDF_PARAM_MODE**) <UTF8 string> or <integer>

This parameter sets the mode for the HKDF operation.
There are three modes that are currently defined:


- "EXTRACT_AND_EXPAND" or **EVP_KDF_HKDF_MODE_EXTRACT_AND_EXPAND**

This is the default mode.  Calling EVP_KDF_derive(3) on an EVP_KDF_CTX set
up for HKDF will perform an extract followed by an expand operation in one go.
The derived key returned will be the result after the expand operation. The
intermediate fixed-length pseudorandom key K is not returned.

In this mode the digest, key, salt and info values must be set before a key is
derived otherwise an error will occur.

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


A context for HKDF can be obtained by calling:

```c
EVP_KDF *kdf = EVP_KDF_fetch(NULL, "HKDF", NULL);
EVP_KDF_CTX *kctx = EVP_KDF_CTX_new(kdf);

```

The output length of an HKDF expand operation is specified via the `keylen`
parameter to the EVP_KDF_derive(3) function.  When using
EVP_KDF_HKDF_MODE_EXTRACT_ONLY the `keylen` parameter must equal the size of
the intermediate fixed-length pseudorandom key otherwise an error will occur.
For that mode, the fixed output size can be looked up by calling EVP_KDF_CTX_get_kdf_size()
after setting the mode and digest on the **EVP_KDF_CTX**.

## EXAMPLES


This example derives 10 bytes using SHA-256 with the secret key "secret",
salt value "salt" and info value "label":

```c
EVP_KDF *kdf;
EVP_KDF_CTX *kctx;
unsigned char out[10];
OSSL_PARAM params[5], *p = params;

kdf = EVP_KDF_fetch(NULL, "HKDF", NULL);
kctx = EVP_KDF_CTX_new(kdf);
EVP_KDF_free(kdf);

*p++ = OSSL_PARAM_construct_utf8_string(OSSL_KDF_PARAM_DIGEST,
                                        SN_sha256, strlen(SN_sha256));
*p++ = OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_KEY,
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

## CONFORMING TO


RFC 5869

## SEE ALSO


EVP_KDF(3),
EVP_KDF_CTX_new(3),
EVP_KDF_CTX_free(3),
EVP_KDF_CTX_get_kdf_size(3),
EVP_KDF_CTX_set_params(3),
EVP_KDF_derive(3),
EVP_KDF(3)/PARAMETERS,
EVP_KDF-TLS13_KDF(7)

## HISTORY


This functionality was added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2016-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_KDF-HKDF.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KDF-HKDF.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_KDF-HKDF.pod`；SHA-256：`d8ffd6c6db7c9c5b67f5d2402f94f4976dfcc03f7ded549a47b84ac5da1e367f`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
