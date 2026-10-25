---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-md-md5-sha1",
  "title": "OpenSSL：摘要算法：MD5-SHA1 · EVP_MD-MD5-SHA1（man7）",
  "type": "note",
  "tags": [
    "哈希",
    "消息摘要",
    "加密算法",
    "openssl",
    "EVP_MD-MD5-SHA1"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "e12dcef32cb4d1bf7a6e460b6541d3dbf1b27ba6fc0e7c62b7609a28541996c1",
  "generatedHash": "b3eb47fb1b7824db9650dd7d1ea4af5505195650f8688804e95c9f232ad0a462",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "摘要算法：MD5-SHA1：EVP_MD-MD5-SHA1 - The MD5-SHA1 EVP_MD implementation",
  "l1": "Support for computing MD5-SHA1 digests through the **EVP_MD** API. MD5-SHA1 is a rather special digest that's used with SSLv3. This implementation is only available with the default provider, and is identified with the name \"MD5-SHA1\". This implementation supports the common gettable parameters described in EVP_MD-common(7). This implementation supports the following OSSL_PARAM(3) entries, settable for an **EVP_MD_CTX** with EVP_MD_CTX_set_params(3): This parameter is set by libssl in order to calculate a signature hash for an SSLv3 CertificateVerify message as per RFC6101. It is only set after all handshake messages have already been digested via OP_digest_update() calls. The parameter provides the master secret value to be added to the digest. The digest implementation should calculate the complete digest as per RFC6101 section 5.6.8. T",
  "questions": [
    "EVP_MD-MD5-SHA1 如何用于摘要算法：MD5-SHA1？",
    "EVP_MD-MD5-SHA1 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-focus-crypto-sha-state",
      "kind": "机制参照"
    }
  ],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-md-md5-sha1",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_MD-MD5-SHA1.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：摘要算法：MD5-SHA1 · EVP_MD-MD5-SHA1（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：摘要算法：MD5-SHA1。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_MD-MD5-SHA1 - The MD5-SHA1 EVP_MD implementation

## 技术正文

## NAME


EVP_MD-MD5-SHA1 - The MD5-SHA1 EVP_MD implementation

## DESCRIPTION


Support for computing MD5-SHA1 digests through the **EVP_MD** API.

MD5-SHA1 is a rather special digest that's used with SSLv3.

### Identity


This implementation is only available with the default provider, and is
identified with the name "MD5-SHA1".

### Gettable Parameters


This implementation supports the common gettable parameters described
in EVP_MD-common(7).

### Settable Context Parameters


This implementation supports the following OSSL_PARAM(3) entries,
settable for an **EVP_MD_CTX** with EVP_MD_CTX_set_params(3):


- "ssl3-ms" (**OSSL_DIGEST_PARAM_SSL3_MS**) <octet string>

This parameter is set by libssl in order to calculate a signature hash for an
SSLv3 CertificateVerify message as per RFC6101.
It is only set after all handshake messages have already been digested via
OP_digest_update() calls.
The parameter provides the master secret value to be added to the digest.
The digest implementation should calculate the complete digest as per RFC6101
section 5.6.8.
The next call after setting this parameter should be OP_digest_final().


## SEE ALSO


EVP_MD_CTX_set_params(3), provider-digest(7), OSSL_PROVIDER-default(7)

## COPYRIGHT


Copyright 2020 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_MD-MD5-SHA1.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_MD-MD5-SHA1.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_MD-MD5-SHA1.pod`；SHA-256：`e12dcef32cb4d1bf7a6e460b6541d3dbf1b27ba6fc0e7c62b7609a28541996c1`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
