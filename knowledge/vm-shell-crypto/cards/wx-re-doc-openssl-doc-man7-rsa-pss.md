---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-rsa-pss",
  "title": "OpenSSL：RSA 密码 · RSA-PSS（man7）",
  "type": "note",
  "tags": [
    "RSA",
    "非对称密码",
    "填充",
    "openssl",
    "RSA-PSS",
    "RSA非对称密码"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "4604d311f9dab19bfeefe9ee3dc1afd8bf9eea8e594fe91a0309555751212ac4",
  "generatedHash": "fe03c45198c5fcc6fdcd193b923a0cd00733ec1fcdf0616f97e6ca5fb844cbf0",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "RSA 密码：RSA-PSS - EVP_PKEY RSA-PSS algorithm support",
  "l1": "The **RSA-PSS** EVP_PKEY implementation is a restricted version of the RSA algorithm which only supports signing, verification and key generation using PSS padding modes with optional parameter restrictions. It has associated private key and public key formats. This algorithm shares several control operations with the **RSA** algorithm but with some restrictions described below. Signing and verification is similar to the **RSA** algorithm except the padding mode is always PSS. If the key in use has parameter restrictions then the corresponding signature parameters are set to the restrictions: for example, if the key can only be used with digest SHA256, MGF1 SHA256 and minimum salt length 32 then the digest, MGF1 digest and salt length will be set to SHA256, SHA256 and 32 respectively. By default no parameter restrictions are placed on the",
  "questions": [
    "RSA-PSS 如何用于RSA 密码？",
    "RSA-PSS 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-focus-crypto-rsa-oaep",
      "kind": "机制参照"
    }
  ],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-rsa-pss",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/RSA-PSS.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：RSA 密码 · RSA-PSS（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：RSA 密码。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

RSA-PSS - EVP_PKEY RSA-PSS algorithm support

## 技术正文

## NAME


RSA-PSS - EVP_PKEY RSA-PSS algorithm support

## DESCRIPTION


The **RSA-PSS** EVP_PKEY implementation is a restricted version of the RSA
algorithm which only supports signing, verification and key generation
using PSS padding modes with optional parameter restrictions.

It has associated private key and public key formats.

This algorithm shares several control operations with the **RSA** algorithm
but with some restrictions described below.

### Signing and Verification


Signing and verification is similar to the **RSA** algorithm except the
padding mode is always PSS. If the key in use has parameter restrictions then
the corresponding signature parameters are set to the restrictions:
for example, if the key can only be used with digest SHA256, MGF1 SHA256
and minimum salt length 32 then the digest, MGF1 digest and salt length
will be set to SHA256, SHA256 and 32 respectively.

### Key Generation


By default no parameter restrictions are placed on the generated key.

## NOTES


The public key format is documented in RFC4055.

The PKCS#8 private key format used for RSA-PSS keys is similar to the RSA
format except it uses the **id-RSASSA-PSS** OID and the parameters field, if
present, restricts the key parameters in the same way as the public key.

## CONFORMING TO


RFC 4055

## SEE ALSO


EVP_PKEY_CTX_set_rsa_pss_keygen_md(3),
EVP_PKEY_CTX_set_rsa_pss_keygen_mgf1_md(3),
EVP_PKEY_CTX_set_rsa_pss_keygen_saltlen(3),
EVP_PKEY_CTX_new(3),
EVP_PKEY_CTX_ctrl_str(3),
EVP_PKEY_derive(3)

## COPYRIGHT


Copyright 2017-2018 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/RSA-PSS.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/RSA-PSS.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/RSA-PSS.pod`；SHA-256：`4604d311f9dab19bfeefe9ee3dc1afd8bf9eea8e594fe91a0309555751212ac4`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
