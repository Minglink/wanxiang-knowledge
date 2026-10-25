---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-md-shake",
  "title": "OpenSSL：摘要算法：SHAKE · EVP_MD-SHAKE（man7）",
  "type": "note",
  "tags": [
    "哈希",
    "消息摘要",
    "加密算法",
    "openssl",
    "EVP_MD-SHAKE",
    "SHAKE可扩展输出",
    "KMAC消息认证"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "6df6b2054f020199497f22b95c2ed7d5c2a6fb42dfc337e75e9ada92c42f6e97",
  "generatedHash": "855c158326dd578689191ed1c4487285f9679e89e67f4af0ccf1decb16a7536c",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "摘要算法：SHAKE：EVP_MD-SHAKE, EVP_MD-KECCAK-KMAC - The SHAKE / KECCAK family EVP_MD implementations",
  "l1": "Support for computing SHAKE or KECCAK-KMAC digests through the **EVP_MD** API. KECCAK-KMAC is an Extendable Output Function (XOF), with a definition similar to SHAKE, used by the KMAC EVP_MAC implementation (see EVP_MAC-KMAC(7)). This implementation is available in the FIPS provider as well as the default provider, and includes the following varieties: Known names are \"KECCAK-KMAC-128\" and \"KECCAK-KMAC128\". This is used by EVP_MAC-KMAC128(7). Using the notation from NIST FIPS 202 (Section 6.2), we have KECCAK-KMAC-128(M, d) = KECCAK[256](M || 00, d) (see the description of KMAC128 in Appendix A of NIST SP 800-185). Known names are \"KECCAK-KMAC-256\" and \"KECCAK-KMAC256\". This is used by EVP_MAC-KMAC256(7). Using the notation from NIST FIPS 202 (Section 6.2), we have KECCAK-KMAC-256(M, d) = KECCAK[512](M || 00, d) (see the description of KM",
  "questions": [
    "EVP_MD-SHAKE 如何用于摘要算法：SHAKE？",
    "EVP_MD-SHAKE 有哪些参数、约束、实现语义和注意事项？"
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
      "id": "doc-openssl-doc-man7-evp-md-shake",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_MD-SHAKE.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：摘要算法：SHAKE · EVP_MD-SHAKE（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：摘要算法：SHAKE。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_MD-SHAKE, EVP_MD-KECCAK-KMAC
- The SHAKE / KECCAK family EVP_MD implementations

## 技术正文

## NAME


EVP_MD-SHAKE, EVP_MD-KECCAK-KMAC
- The SHAKE / KECCAK family EVP_MD implementations

## DESCRIPTION


Support for computing SHAKE or KECCAK-KMAC digests through the
**EVP_MD** API.

KECCAK-KMAC is an Extendable Output Function (XOF), with a definition
similar to SHAKE, used by the KMAC EVP_MAC implementation (see
EVP_MAC-KMAC(7)).

### Identities


This implementation is available in the FIPS provider as well as the default
provider, and includes the following varieties:


- KECCAK-KMAC-128

Known names are "KECCAK-KMAC-128" and "KECCAK-KMAC128".  This is used
by EVP_MAC-KMAC128(7).  Using the notation from NIST FIPS 202
(Section 6.2), we have KECCAK-KMAC-128(M, d) = KECCAK[256](M || 00, d)
(see the description of KMAC128 in Appendix A of NIST SP 800-185).

- KECCAK-KMAC-256

Known names are "KECCAK-KMAC-256" and "KECCAK-KMAC256".  This is used
by EVP_MAC-KMAC256(7).  Using the notation from NIST FIPS 202
(Section 6.2), we have KECCAK-KMAC-256(M, d) = KECCAK[512](M || 00, d)
(see the description of KMAC256 in Appendix A of NIST SP 800-185).

- SHAKE-128

Known names are "SHAKE-128" and "SHAKE128".

- SHAKE-256

Known names are "SHAKE-256" and "SHAKE256".


### Parameters


This implementation supports the following OSSL_PARAM(3) entries:


- "xoflen" (**OSSL_DIGEST_PARAM_XOFLEN**) <unsigned integer>

Sets or Gets the digest length for extendable output functions.
The length of the "xoflen" parameter should not exceed that of a **size_t**.

The SHAKE-128 and SHAKE-256 implementations do not have any default digest
length.

This parameter must be set before calling either EVP_DigestFinal_ex() or
EVP_DigestFinal(), since these functions were not designed to handle variable
length output. It is recommended to either use EVP_DigestSqueeze() or
EVP_DigestFinalXOF() instead.

- "size" (**OSSL_DIGEST_PARAM_SIZE**) <unsigned integer>

An alias of "xoflen".


See EVP_DigestInit(3)/PARAMETERS for further information related to parameters

## NOTES


For SHAKE-128, to ensure the maximum security strength of 128 bits, the output
length passed to EVP_DigestFinalXOF() should be at least 32.

For SHAKE-256, to ensure the maximum security strength of 256 bits, the output
length passed to EVP_DigestFinalXOF() should be at least 64.

## SEE ALSO


EVP_MD_CTX_set_params(3), provider-digest(7), OSSL_PROVIDER-default(7)

## HISTORY


Since OpenSSL 3.4 the SHAKE-128 and SHAKE-256 implementations have no default
digest length.

## COPYRIGHT


Copyright 2020-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_MD-SHAKE.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_MD-SHAKE.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_MD-SHAKE.pod`；SHA-256：`6df6b2054f020199497f22b95c2ed7d5c2a6fb42dfc337e75e9ada92c42f6e97`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
