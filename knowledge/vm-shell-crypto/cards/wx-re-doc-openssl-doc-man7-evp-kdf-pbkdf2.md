---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-kdf-pbkdf2",
  "title": "OpenSSL：密钥派生：PBKDF2 · EVP_KDF-PBKDF2（man7）",
  "type": "note",
  "tags": [
    "密钥派生",
    "KDF",
    "加密算法",
    "openssl",
    "EVP_KDF-PBKDF2",
    "PBKDF2口令派生"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "5867af4ff4d041e345f1466a883bf7db4a5bfce875693609cc074a61b3793499",
  "generatedHash": "712eec7cd8c168c512fd296095d3c53bf81d030ffd367363d26470b289c7f848",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密钥派生：PBKDF2：EVP_KDF-PBKDF2 - The PBKDF2 EVP_KDF implementation",
  "l1": "Support for computing the **PBKDF2** password-based KDF through the **EVP_KDF** API. The EVP_KDF-PBKDF2 algorithm implements the PBKDF2 password-based key derivation function, as described in SP800-132; it derives a key from a password using a salt and iteration count. The output is considered to be a cryptographic key. \"PBKDF2\" is the name for this implementation; it can be used with the EVP_KDF_fetch() function. The supported parameters are: This parameter has a default value of 2048. These parameters work as described in EVP_KDF(3)/PARAMETERS. This parameter can be used to enable or disable SP800-132 compliance checks. Setting the mode to 0 enables the compliance checks. The checks performed are: The default provider uses a default mode of 1 for backwards compatibility, and the FIPS provider uses a default mode of 0. This option breaks",
  "questions": [
    "EVP_KDF-PBKDF2 如何用于密钥派生：PBKDF2？",
    "EVP_KDF-PBKDF2 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-focus-crypto-pbkdf2-params",
      "kind": "机制参照"
    }
  ],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-kdf-pbkdf2",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KDF-PBKDF2.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密钥派生：PBKDF2 · EVP_KDF-PBKDF2（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密钥派生：PBKDF2。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_KDF-PBKDF2 - The PBKDF2 EVP_KDF implementation

## 技术正文

## NAME


EVP_KDF-PBKDF2 - The PBKDF2 EVP_KDF implementation

## DESCRIPTION


Support for computing the **PBKDF2** password-based KDF through the **EVP_KDF**
API.

The EVP_KDF-PBKDF2 algorithm implements the PBKDF2 password-based key
derivation function, as described in SP800-132; it derives a key from a password
using a salt and iteration count.

The output is considered to be a cryptographic key.

### Identity


"PBKDF2" is the name for this implementation; it
can be used with the EVP_KDF_fetch() function.

### Supported parameters


The supported parameters are:


- "pass" (**OSSL_KDF_PARAM_PASSWORD**) <octet string>

- "salt" (**OSSL_KDF_PARAM_SALT**) <octet string>

- "iter" (**OSSL_KDF_PARAM_ITER**) <unsigned integer>

This parameter has a default value of 2048.

- "properties" (**OSSL_KDF_PARAM_PROPERTIES**) <UTF8 string>

- "digest" (**OSSL_KDF_PARAM_DIGEST**) <UTF8 string>

These parameters work as described in EVP_KDF(3)/PARAMETERS.

- "pkcs5" (**OSSL_KDF_PARAM_PKCS5**) <integer>

This parameter can be used to enable or disable SP800-132 compliance checks.
Setting the mode to 0 enables the compliance checks.

The checks performed are:


- - the iteration count is at least 1000.

- - the salt length is at least 128 bits.

- - the derived key length is at least 112 bits.


The default provider uses a default mode of 1 for backwards compatibility,
and the FIPS provider uses a default mode of 0.
This option breaks FIPS compliance if it causes the approved "fips-indicator"
to return 0.

- "fips-indicator" (**OSSL_KDF_PARAM_FIPS_APPROVED_INDICATOR**) <integer>

This option is used by the OpenSSL FIPS provider.

A getter that returns 1 if the operation is FIPS approved, or 0 otherwise.
This may be used after calling EVP_KDF_derive. It returns 0 if "pkcs5"
is set to 1 and the derived key length, salt length or iteration count test
fails.


## NOTES


A typical application of this algorithm is to derive keying material for an
encryption algorithm from a password in the "pass", a salt in "salt",
and an iteration count.

Increasing the "iter" parameter slows down the algorithm which makes it
harder for an attacker to perform a brute force attack using a large number
of candidate passwords.

No assumption is made regarding the given password; it is simply treated as a
byte sequence.

## CONFORMING TO


SP800-132

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

- 上游：[doc/man7/EVP_KDF-PBKDF2.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KDF-PBKDF2.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_KDF-PBKDF2.pod`；SHA-256：`5867af4ff4d041e345f1466a883bf7db4a5bfce875693609cc074a61b3793499`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
