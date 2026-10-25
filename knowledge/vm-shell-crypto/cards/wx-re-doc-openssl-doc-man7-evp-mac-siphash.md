---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-mac-siphash",
  "title": "OpenSSL：消息认证：Siphash · EVP_MAC-Siphash（man7）",
  "type": "note",
  "tags": [
    "消息认证",
    "HMAC",
    "完整性",
    "openssl",
    "EVP_MAC-Siphash",
    "SipHash带密钥哈希"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "dbe788946c6127be55ddabf7e5b568d6455b6a1a5d1fb4458c90debe182e6f8a",
  "generatedHash": "008ce78adcfaa926e3d60da51e22900a2077a71903c4ebf86886d7f78e02a9d0",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "消息认证：Siphash：EVP_MAC-Siphash - The Siphash EVP_MAC implementation",
  "l1": "Support for computing Siphash MACs through the **EVP_MAC** API. This implementation is identified with this name and properties, to be used with EVP_MAC_fetch(): The general description of these parameters can be found in EVP_MAC(3)/PARAMETERS. All these parameters can be set with EVP_MAC_CTX_set_params(). Furthermore, the \"size\" parameter can be retrieved with EVP_MAC_CTX_get_params(), or with EVP_MAC_CTX_get_mac_size(). The length of the \"size\" parameter should not exceed that of a **size_t**. Sets the MAC key. Setting this parameter is identical to passing a `key` to EVP_MAC_init(3). Sets the MAC size. Specifies the number of rounds per message block. By default this is `2`. Specifies the number of finalisation rounds. By default this is `4`. ",
  "questions": [
    "EVP_MAC-Siphash 如何用于消息认证：Siphash？",
    "EVP_MAC-Siphash 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-mac-siphash",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_MAC-Siphash.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：消息认证：Siphash · EVP_MAC-Siphash（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：消息认证：Siphash。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_MAC-Siphash - The Siphash EVP_MAC implementation

## 技术正文

## NAME


EVP_MAC-Siphash - The Siphash EVP_MAC implementation

## DESCRIPTION


Support for computing Siphash MACs through the **EVP_MAC** API.

### Identity


This implementation is identified with this name and properties, to be
used with EVP_MAC_fetch():


- "SIPHASH", "provider=default"



### Supported parameters


The general description of these parameters can be found in
EVP_MAC(3)/PARAMETERS.

All these parameters can be set with EVP_MAC_CTX_set_params().
Furthermore, the "size" parameter can be retrieved with
EVP_MAC_CTX_get_params(), or with EVP_MAC_CTX_get_mac_size().
The length of the "size" parameter should not exceed that of a **size_t**.


- "key" (**OSSL_MAC_PARAM_KEY**) <octet string>

Sets the MAC key.
Setting this parameter is identical to passing a `key` to EVP_MAC_init(3).

- "size" (**OSSL_MAC_PARAM_SIZE**) <unsigned integer>

Sets the MAC size.

- "c-rounds" (**OSSL_MAC_PARAM_C_ROUNDS**) <unsigned integer>

Specifies the number of rounds per message block.  By default this is `2`.

- "d-rounds" (**OSSL_MAC_PARAM_D_ROUNDS**) <unsigned integer>

Specifies the number of finalisation rounds.  By default this is `4`.


## SEE ALSO


EVP_MAC_CTX_get_params(3), EVP_MAC_CTX_set_params(3),
EVP_MAC(3)/PARAMETERS, OSSL_PARAM(3)

## COPYRIGHT


Copyright 2018-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_MAC-Siphash.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_MAC-Siphash.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_MAC-Siphash.pod`；SHA-256：`dbe788946c6127be55ddabf7e5b568d6455b6a1a5d1fb4458c90debe182e6f8a`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
