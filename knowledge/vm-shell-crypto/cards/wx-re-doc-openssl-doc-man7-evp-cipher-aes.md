---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-cipher-aes",
  "title": "OpenSSL：对称密码：AES · EVP_CIPHER-AES（man7）",
  "type": "note",
  "tags": [
    "对称加密",
    "分组密码",
    "加密算法",
    "工作模式",
    "openssl",
    "EVP_CIPHER-AES",
    "AES高级加密标准"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "4e261a316eba74fd08e6a1e01eec0f60960597f858acd636ffc439e4e4f979c3",
  "generatedHash": "346c0a3ee1f58071e5377503426add6ea5c5e4b766be8ef6ed347079fc3e1b20",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "对称密码：AES：EVP_CIPHER-AES - The AES EVP_CIPHER implementations",
  "l1": "Support for AES symmetric encryption using the **EVP_CIPHER** API. The following algorithms are available in the FIPS provider as well as the default provider: \"AES-128-CFB1\", \"AES-192-CFB1\", \"AES-256-CFB1\", \"AES-128-CFB8\", \"AES-192-CFB8\" and \"AES-256-CFB8\" \"AES-128-WRAP-PAD\", \"AES-192-WRAP-PAD\", \"AES-256-WRAP-PAD\", \"AES-128-WRAP-INV\", \"AES-192-WRAP-INV\", \"AES-256-WRAP-INV\", \"AES-128-WRAP-PAD-INV\", \"AES-192-WRAP-PAD-INV\" and \"AES-256-WRAP-PAD-INV\" \"AES-128-CBC-HMAC-SHA256\" and \"AES-256-CBC-HMAC-SHA256\" The following algorithms are available in the default provider, but not the FIPS provider: This implementation supports the parameters described in EVP_EncryptInit(3)/PARAMETERS.",
  "questions": [
    "EVP_CIPHER-AES 如何用于对称密码：AES？",
    "EVP_CIPHER-AES 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-focus-crypto-aes-shape",
      "kind": "机制参照"
    }
  ],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-cipher-aes",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_CIPHER-AES.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：对称密码：AES · EVP_CIPHER-AES（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：对称密码：AES。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_CIPHER-AES - The AES EVP_CIPHER implementations

## 技术正文

## NAME


EVP_CIPHER-AES - The AES EVP_CIPHER implementations

## DESCRIPTION


Support for AES symmetric encryption using the **EVP_CIPHER** API.

### Algorithm Names


The following algorithms are available in the FIPS provider as well as the
default provider:


- "AES-128-CBC", "AES-192-CBC" and  "AES-256-CBC"

- "AES-128-CBC-CTS", "AES-192-CBC-CTS" and "AES-256-CBC-CTS"

- "AES-128-CFB", "AES-192-CFB", "AES-256-CFB",
"AES-128-CFB1", "AES-192-CFB1", "AES-256-CFB1",
"AES-128-CFB8", "AES-192-CFB8" and "AES-256-CFB8"

- "AES-128-CTR", "AES-192-CTR" and "AES-256-CTR"

- "AES-128-ECB", "AES-192-ECB" and "AES-256-ECB"

- "AES-192-OFB", "AES-128-OFB" and "AES-256-OFB"

- "AES-128-XTS" and "AES-256-XTS"

- "AES-128-CCM", "AES-192-CCM" and "AES-256-CCM"

- "AES-128-GCM", "AES-192-GCM" and "AES-256-GCM"

- "AES-128-WRAP", "AES-192-WRAP", "AES-256-WRAP",
"AES-128-WRAP-PAD", "AES-192-WRAP-PAD", "AES-256-WRAP-PAD",
"AES-128-WRAP-INV", "AES-192-WRAP-INV", "AES-256-WRAP-INV",
"AES-128-WRAP-PAD-INV", "AES-192-WRAP-PAD-INV" and "AES-256-WRAP-PAD-INV"

- "AES-128-CBC-HMAC-SHA1", "AES-256-CBC-HMAC-SHA1",
"AES-128-CBC-HMAC-SHA256" and "AES-256-CBC-HMAC-SHA256"


The following algorithms are available in the default provider, but not the
FIPS provider:


- "AES-128-OCB", "AES-192-OCB" and "AES-256-OCB"

- "AES-128-SIV", "AES-192-SIV" and "AES-256-SIV"

- "AES-128-GCM-SIV", "AES-192-GCM-SIV" and "AES-256-GCM-SIV"


### Parameters


This implementation supports the parameters described in
EVP_EncryptInit(3)/PARAMETERS.

## NOTES


The AES-SIV and AES-WRAP mode implementations do not support streaming. That
means to obtain correct results there can be only one EVP_EncryptUpdate(3)
or EVP_DecryptUpdate(3) call after the initialization of the context.

The AES-XTS implementations allow streaming to be performed, but each
EVP_EncryptUpdate(3) or EVP_DecryptUpdate(3) call requires each input
to be a multiple of the blocksize. Only the final EVP_EncryptUpdate() or
EVP_DecryptUpdate() call can optionally have an input that is not a multiple
of the blocksize but is larger than one block. In that case ciphertext
stealing (CTS) is used to fill the block.

## SEE ALSO


provider-cipher(7), OSSL_PROVIDER-FIPS(7), OSSL_PROVIDER-default(7)

## HISTORY


The GCM-SIV mode ciphers were added in OpenSSL version 3.2.

## COPYRIGHT


Copyright 2021-2023 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_CIPHER-AES.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_CIPHER-AES.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_CIPHER-AES.pod`；SHA-256：`4e261a316eba74fd08e6a1e01eec0f60960597f858acd636ffc439e4e4f979c3`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
