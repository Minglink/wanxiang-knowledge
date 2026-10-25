---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-md-blake2",
  "title": "OpenSSL：摘要算法：BLAKE2 · EVP_MD-BLAKE2（man7）",
  "type": "note",
  "tags": [
    "哈希",
    "消息摘要",
    "加密算法",
    "openssl",
    "EVP_MD-BLAKE2",
    "BLAKE2摘要"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "3caa249d1e9a3f875e6236fb0cb873dd591b3f6e11658cdeda9d27c9239fbca5",
  "generatedHash": "30b5a022aa90434acef1b01de7527513fb33c46aad6a93104c5166203b15c99a",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "摘要算法：BLAKE2：EVP_MD-BLAKE2 - The BLAKE2 EVP_MD implementation",
  "l1": "Support for computing BLAKE2 digests through the **EVP_MD** API. This implementation is only available with the default provider, and includes the following varieties: Known names are \"BLAKE2S-256\" and \"BLAKE2s256\". Known names are \"BLAKE2B-512\" and \"BLAKE2b512\". \"BLAKE2B-512\" supports the following EVP_MD_CTX_set_params() key described in EVP_DigestInit(3)/PARAMETERS. This implementation supports the common gettable parameters described in EVP_MD-common(7). The implementation supports the following OSSL_PARAM(3) entries which are settable for an **EVP_MD_CTX** with EVP_DigestInit_ex2(3) or EVP_MD_CTX_set_params(3): Sets a different digest length for the EVP_DigestFinal(3) output. The value of the \"size\" parameter must not exceed the default digest length of the respective BLAKE2 algorithm variants, 64 for BLAKE2B-512 and 32 for BLAKE2S-2",
  "questions": [
    "EVP_MD-BLAKE2 如何用于摘要算法：BLAKE2？",
    "EVP_MD-BLAKE2 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-md-blake2",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_MD-BLAKE2.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：摘要算法：BLAKE2 · EVP_MD-BLAKE2（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：摘要算法：BLAKE2。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_MD-BLAKE2 - The BLAKE2 EVP_MD implementation

## 技术正文

## NAME


EVP_MD-BLAKE2 - The BLAKE2 EVP_MD implementation

## DESCRIPTION


Support for computing BLAKE2 digests through the **EVP_MD** API.

### Identities


This implementation is only available with the default provider, and
includes the following varieties:


- BLAKE2S-256

Known names are "BLAKE2S-256" and "BLAKE2s256".

- BLAKE2B-512

Known names are "BLAKE2B-512" and "BLAKE2b512".


### Settable Parameters


"BLAKE2B-512" supports the following EVP_MD_CTX_set_params() key
described in EVP_DigestInit(3)/PARAMETERS.


- "size" (**OSSL_DIGEST_PARAM_SIZE**) <unsigned integer>


### Gettable Parameters


This implementation supports the common gettable parameters described
in EVP_MD-common(7).

### Settable Context Parameters


The implementation supports the following OSSL_PARAM(3) entries which
are settable for an **EVP_MD_CTX** with EVP_DigestInit_ex2(3) or
EVP_MD_CTX_set_params(3):


- "size" (**OSSL_DIGEST_PARAM_SIZE**) <unsigned integer>

Sets a different digest length for the EVP_DigestFinal(3) output.
The value of the "size" parameter must not exceed the default digest length
of the respective BLAKE2 algorithm variants, 64 for BLAKE2B-512 and
32 for BLAKE2S-256. The parameter must be set with the
EVP_DigestInit_ex2(3) call to have an immediate effect. When set with
EVP_MD_CTX_set_params(3) it will have an effect only if the **EVP_MD_CTX**
context is reinitialized.


## SEE ALSO


provider-digest(7), OSSL_PROVIDER-default(7)

## HISTORY


This functionality was added in OpenSSL 3.0.

The variable size support was added in OpenSSL 3.2 for BLAKE2B-512 and
in OpenSSL 3.3 for BLAKE2S-256.

## COPYRIGHT


Copyright 2020-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_MD-BLAKE2.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_MD-BLAKE2.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_MD-BLAKE2.pod`；SHA-256：`3caa249d1e9a3f875e6236fb0cb873dd591b3f6e11658cdeda9d27c9239fbca5`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
