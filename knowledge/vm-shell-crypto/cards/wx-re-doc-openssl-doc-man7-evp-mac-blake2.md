---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-mac-blake2",
  "title": "OpenSSL：消息认证：BLAKE2 · EVP_MAC-BLAKE2（man7）",
  "type": "note",
  "tags": [
    "消息认证",
    "HMAC",
    "完整性",
    "openssl",
    "EVP_MAC-BLAKE2",
    "BLAKE2摘要"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "3682a3fd814d4b069667c8bbe6b941aee77c6dc9295517df087f047e8083b6b5",
  "generatedHash": "a4cb17245318153d9185a760e9df8cdc83edccd5cc06cb3f2ba3a5fb7d933641",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "消息认证：BLAKE2：EVP_MAC-BLAKE2, EVP_MAC-BLAKE2BMAC, EVP_MAC-BLAKE2SMAC - The BLAKE2 EVP_MAC implementations",
  "l1": "Support for computing BLAKE2 MACs through the **EVP_MAC** API. These implementations are identified with one of these names and properties, to be used with EVP_MAC_fetch(): The general description of these parameters can be found in EVP_MAC(3)/PARAMETERS. All these parameters (except for \"block-size\") can be set with EVP_MAC_CTX_set_params(). Furthermore, the \"size\" parameter can be retrieved with EVP_MAC_CTX_get_params(), or with EVP_MAC_CTX_get_mac_size(). The length of the \"size\" parameter should not exceed that of a **size_t**. Likewise, the \"block-size\" parameter can be retrieved with EVP_MAC_CTX_get_params(), or with EVP_MAC_CTX_get_block_size(). Sets the MAC key. It may be at most 64 bytes for BLAKE2BMAC or 32 for BLAKE2SMAC and at least 1 byte in both cases. Setting this parameter is identical to passing a `key` to EVP_MAC_init(3)",
  "questions": [
    "EVP_MAC-BLAKE2 如何用于消息认证：BLAKE2？",
    "EVP_MAC-BLAKE2 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-mac-blake2",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_MAC-BLAKE2.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：消息认证：BLAKE2 · EVP_MAC-BLAKE2（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：消息认证：BLAKE2。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_MAC-BLAKE2, EVP_MAC-BLAKE2BMAC, EVP_MAC-BLAKE2SMAC
- The BLAKE2 EVP_MAC implementations

## 技术正文

## NAME


EVP_MAC-BLAKE2, EVP_MAC-BLAKE2BMAC, EVP_MAC-BLAKE2SMAC
- The BLAKE2 EVP_MAC implementations

## DESCRIPTION


Support for computing BLAKE2 MACs through the **EVP_MAC** API.

### Identity


These implementations are identified with one of these names and
properties, to be used with EVP_MAC_fetch():


- "BLAKE2BMAC", "provider=default"

- "BLAKE2SMAC", "provider=default"


### Supported parameters


The general description of these parameters can be found in
EVP_MAC(3)/PARAMETERS.

All these parameters (except for "block-size") can be set with
EVP_MAC_CTX_set_params().
Furthermore, the "size" parameter can be retrieved with
EVP_MAC_CTX_get_params(), or with EVP_MAC_CTX_get_mac_size().
The length of the "size" parameter should not exceed that of a **size_t**.
Likewise, the "block-size" parameter can be retrieved with
EVP_MAC_CTX_get_params(), or with EVP_MAC_CTX_get_block_size().


- "key" (**OSSL_MAC_PARAM_KEY**) <octet string>

Sets the MAC key.
It may be at most 64 bytes for BLAKE2BMAC or 32 for BLAKE2SMAC and at
least 1 byte in both cases.
Setting this parameter is identical to passing a `key` to EVP_MAC_init(3).

- "custom" (**OSSL_MAC_PARAM_CUSTOM**) <octet string>

Sets the customization/personalization string.
It is an optional value of at most 16 bytes for BLAKE2BMAC or 8 for
BLAKE2SMAC, and is empty by default.

- "salt" (**OSSL_MAC_PARAM_SALT**) <octet string>

Sets the salt.
It is an optional value of at most 16 bytes for BLAKE2BMAC or 8 for
BLAKE2SMAC, and is empty by default.

- "size" (**OSSL_MAC_PARAM_SIZE**) <unsigned integer>

Sets the MAC size.
It can be any number between 1 and 32 for EVP_MAC_BLAKE2S or between 1
and 64 for EVP_MAC_BLAKE2B.
It is 32 and 64 respectively by default.

- "block-size" (**OSSL_MAC_PARAM_BLOCK_SIZE**) <unsigned integer>

Gets the MAC block size.
It is 64 for EVP_MAC_BLAKE2S and 128 for EVP_MAC_BLAKE2B.


## SEE ALSO


EVP_MAC_CTX_get_params(3), EVP_MAC_CTX_set_params(3),
EVP_MAC(3)/PARAMETERS, OSSL_PARAM(3)

## HISTORY


The macros and functions described here were added to OpenSSL 3.0.

## COPYRIGHT


Copyright 2018-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_MAC-BLAKE2.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_MAC-BLAKE2.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_MAC-BLAKE2.pod`；SHA-256：`3682a3fd814d4b069667c8bbe6b941aee77c6dc9295517df087f047e8083b6b5`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
