---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-kdf-pbkdf1",
  "title": "OpenSSL：密钥派生：PBKDF1 · EVP_KDF-PBKDF1（man7）",
  "type": "note",
  "tags": [
    "密钥派生",
    "KDF",
    "加密算法",
    "openssl",
    "EVP_KDF-PBKDF1"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "6bfca23405c178cd095c74fcbd9bb7c52d3707b224fcab714c5f232767d2220a",
  "generatedHash": "f23fa1868db63421aabb61358c5c9dbf582408a0fbe65f42d9c6c86a0c7394e0",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密钥派生：PBKDF1：EVP_KDF-PBKDF1 - The PBKDF1 EVP_KDF implementation",
  "l1": "Support for computing the **PBKDF1** password-based KDF through the **EVP_KDF** API. The EVP_KDF-PBKDF1 algorithm implements the PBKDF1 password-based key derivation function, as described in RFC 8018; it derives a key from a password using a salt and iteration count. \"PBKDF1\" is the name for this implementation; it can be used with the EVP_KDF_fetch() function. The supported parameters are: This parameter has a default value of 0 and should be set. These parameters work as described in EVP_KDF(3)/PARAMETERS. ",
  "questions": [
    "EVP_KDF-PBKDF1 如何用于密钥派生：PBKDF1？",
    "EVP_KDF-PBKDF1 有哪些参数、约束、实现语义和注意事项？"
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
      "id": "doc-openssl-doc-man7-evp-kdf-pbkdf1",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KDF-PBKDF1.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密钥派生：PBKDF1 · EVP_KDF-PBKDF1（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密钥派生：PBKDF1。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_KDF-PBKDF1 - The PBKDF1 EVP_KDF implementation

## 技术正文

## NAME


EVP_KDF-PBKDF1 - The PBKDF1 EVP_KDF implementation

## DESCRIPTION


Support for computing the **PBKDF1** password-based KDF through the **EVP_KDF**
API.

The EVP_KDF-PBKDF1 algorithm implements the PBKDF1 password-based key
derivation function, as described in RFC 8018; it derives a key from a password
using a salt and iteration count.

### Identity


"PBKDF1" is the name for this implementation; it
can be used with the EVP_KDF_fetch() function.

### Supported parameters


The supported parameters are:


- "pass" (**OSSL_KDF_PARAM_PASSWORD**) <octet string>

- "salt" (**OSSL_KDF_PARAM_SALT**) <octet string>

- "iter" (**OSSL_KDF_PARAM_ITER**) <unsigned integer>

This parameter has a default value of 0 and should be set.

- "properties" (**OSSL_KDF_PARAM_PROPERTIES**) <UTF8 string>

- "digest" (**OSSL_KDF_PARAM_DIGEST**) <UTF8 string>

These parameters work as described in EVP_KDF(3)/PARAMETERS.


## NOTES


A typical application of this algorithm is to derive keying material for an
encryption algorithm from a password in the "pass", a salt in "salt",
and an iteration count.

Increasing the "iter" parameter slows down the algorithm which makes it
harder for an attacker to perform a brute force attack using a large number
of candidate passwords.

No assumption is made regarding the given password; it is simply treated as a
byte sequence.

The legacy provider needs to be available in order to access this algorithm.

## CONFORMING TO


RFC 8018

## SEE ALSO


EVP_KDF(3),
EVP_KDF_CTX_new(3),
EVP_KDF_CTX_free(3),
EVP_KDF_CTX_set_params(3),
EVP_KDF_derive(3),
EVP_KDF(3)/PARAMETERS,
OSSL_PROVIDER-legacy(7)

## HISTORY


This functionality was added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_KDF-PBKDF1.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KDF-PBKDF1.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_KDF-PBKDF1.pod`；SHA-256：`6bfca23405c178cd095c74fcbd9bb7c52d3707b224fcab714c5f232767d2220a`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
