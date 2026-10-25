---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-kdf-pvkkdf",
  "title": "OpenSSL：密钥派生：PVKKDF · EVP_KDF-PVKKDF（man7）",
  "type": "note",
  "tags": [
    "密钥派生",
    "KDF",
    "加密算法",
    "openssl",
    "EVP_KDF-PVKKDF"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "0f7f91e5ecd6767e38d57c858eebf051b0907f5dfd178436d91d1d06e4a8e0ec",
  "generatedHash": "e1990c8430ac34f728ec1d71b128f261f37fab3f1d288dca8265607b623c7534",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密钥派生：PVKKDF：EVP_KDF-PVKKDF - The PVK EVP_KDF implementation",
  "l1": "Support for computing the **PVK KDF** PIN-based KDF through the **EVP_KDF** API. The EVP_KDF-PVKKDF algorithm implements a PVK PIN-based key derivation function; it derives a key from a password using a salt. \"PVKKDF\" is the name for this implementation; it can be used with the EVP_KDF_fetch() function. The supported parameters are: These parameters work as described in EVP_KDF(3)/PARAMETERS. ",
  "questions": [
    "EVP_KDF-PVKKDF 如何用于密钥派生：PVKKDF？",
    "EVP_KDF-PVKKDF 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-kdf-pvkkdf",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KDF-PVKKDF.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密钥派生：PVKKDF · EVP_KDF-PVKKDF（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密钥派生：PVKKDF。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_KDF-PVKKDF - The PVK EVP_KDF implementation

## 技术正文

## NAME


EVP_KDF-PVKKDF - The PVK EVP_KDF implementation

## DESCRIPTION


Support for computing the **PVK KDF** PIN-based KDF through the **EVP_KDF**
API.

The EVP_KDF-PVKKDF algorithm implements a PVK PIN-based key
derivation function; it derives a key from a password using a salt.

### Identity


"PVKKDF" is the name for this implementation; it
can be used with the EVP_KDF_fetch() function.

### Supported parameters


The supported parameters are:


- "pass" (**OSSL_KDF_PARAM_PASSWORD**) <octet string>

- "salt" (**OSSL_KDF_PARAM_SALT**) <octet string>

- "properties" (**OSSL_KDF_PARAM_PROPERTIES**) <UTF8 string>

- "digest" (**OSSL_KDF_PARAM_DIGEST**) <UTF8 string>

These parameters work as described in EVP_KDF(3)/PARAMETERS.


## NOTES


A typical application of this algorithm is to derive keying material for an
encryption algorithm from a password in the "pass" and a salt in "salt".

No assumption is made regarding the given password; it is simply treated as a
byte sequence.

The legacy provider needs to be available in order to access this algorithm.

## SEE ALSO


EVP_KDF(3),
EVP_KDF_CTX_new(3),
EVP_KDF_CTX_free(3),
EVP_KDF_CTX_set_params(3),
EVP_KDF_derive(3),
EVP_KDF(3)/PARAMETERS,
OSSL_PROVIDER-legacy(7)

## HISTORY


This functionality was added in OpenSSL 3.2.

## COPYRIGHT


Copyright 2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_KDF-PVKKDF.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KDF-PVKKDF.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_KDF-PVKKDF.pod`；SHA-256：`0f7f91e5ecd6767e38d57c858eebf051b0907f5dfd178436d91d1d06e4a8e0ec`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
