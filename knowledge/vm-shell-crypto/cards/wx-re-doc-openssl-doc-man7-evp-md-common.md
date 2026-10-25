---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-md-common",
  "title": "OpenSSL：摘要算法：common · EVP_MD-common（man7）",
  "type": "note",
  "tags": [
    "哈希",
    "消息摘要",
    "加密算法",
    "openssl",
    "EVP_MD-common"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "567cba7409300d15f37babcc023c8c7d0d03239d4c0386e761dc70baa4032bec",
  "generatedHash": "e2c818653a7ada34dd2f80ad93bcc9eac4c36f12d50ddd8f57e76919aca37c6a",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "摘要算法：common：EVP_MD-common - The OpenSSL EVP_MD implementations, common things",
  "l1": "All the OpenSSL EVP_MD implementations understand the following OSSL_PARAM(3) entries that are gettable with EVP_MD_get_params(3), as well as these: The digest block size. The length of the \"blocksize\" parameter should not exceed that of a **size_t**. This value can also be retrieved with EVP_MD_get_block_size(3). The digest output size. The length of the \"size\" parameter should not exceed that of a **size_t**. This value can also be retrieved with EVP_MD_get_size(3). Diverse flags that describe exceptional behaviour for the digest. These flags are described in EVP_MD_meth_set_flags(3)/DESCRIPTION. The length of the \"flags\" parameter should equal that of an **unsigned long int**. The description of these flags should probably be moved. Also, EVP_MD_FLAG_FIPS isn't relevant any more. This value can also be retrieved with EVP_MD_get_flags(3",
  "questions": [
    "EVP_MD-common 如何用于摘要算法：common？",
    "EVP_MD-common 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-md-common",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_MD-common.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：摘要算法：common · EVP_MD-common（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：摘要算法：common。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_MD-common - The OpenSSL EVP_MD implementations, common things

## 技术正文

## NAME


EVP_MD-common - The OpenSSL EVP_MD implementations, common things

## DESCRIPTION


All the OpenSSL EVP_MD implementations understand the following
OSSL_PARAM(3) entries that are
gettable with EVP_MD_get_params(3), as well as these:


- "blocksize" (**OSSL_DIGEST_PARAM_BLOCK_SIZE**) <unsigned integer>

The digest block size.
The length of the "blocksize" parameter should not exceed that of a
**size_t**.

This value can also be retrieved with EVP_MD_get_block_size(3).

- "size" (**OSSL_DIGEST_PARAM_SIZE**) <unsigned integer>

The digest output size.
The length of the "size" parameter should not exceed that of a **size_t**.

This value can also be retrieved with EVP_MD_get_size(3).

- "flags" (**OSSL_DIGEST_PARAM_FLAGS**) <unsigned integer>

Diverse flags that describe exceptional behaviour for the digest.
These flags are described in EVP_MD_meth_set_flags(3)/DESCRIPTION.

The length of the "flags" parameter should equal that of an
**unsigned long int**.


This value can also be retrieved with EVP_MD_get_flags(3).


## SEE ALSO


EVP_DigestInit(3)/PARAMETERS, EVP_MD_get_params(3), provider-digest(7)

## COPYRIGHT


Copyright 2020-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_MD-common.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_MD-common.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_MD-common.pod`；SHA-256：`567cba7409300d15f37babcc023c8c7d0d03239d4c0386e761dc70baa4032bec`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
