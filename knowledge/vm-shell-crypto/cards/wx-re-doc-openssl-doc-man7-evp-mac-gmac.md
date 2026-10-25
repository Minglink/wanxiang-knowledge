---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-mac-gmac",
  "title": "OpenSSL：消息认证：GMAC · EVP_MAC-GMAC（man7）",
  "type": "note",
  "tags": [
    "消息认证",
    "HMAC",
    "完整性",
    "openssl",
    "EVP_MAC-GMAC"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "72df37efb5cb7c7ee88345b49af7c3da647143e90702cbad0c14264aad2a372b",
  "generatedHash": "0dbc5691ba0de5c9523ebc401e84d13527282d3e532c10d03106921c8fffa17c",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "消息认证：GMAC：EVP_MAC-GMAC - The GMAC EVP_MAC implementation",
  "l1": "Support for computing GMAC MACs through the **EVP_MAC** API. This implementation uses EVP_CIPHER functions to get access to the underlying cipher. This implementation is identified with this name and properties, to be used with EVP_MAC_fetch(): The general description of these parameters can be found in EVP_MAC(3)/PARAMETERS. The following parameter can be set with EVP_MAC_CTX_set_params(): Sets the MAC key. Setting this parameter is identical to passing a `key` to EVP_MAC_init(3). Sets the IV of the underlying cipher, when applicable. Sets the name of the underlying cipher to be used. Sets the properties to be queried when trying to fetch the underlying cipher. This must be given together with the cipher naming parameter to be considered valid. The following parameters can be retrieved with EVP_MAC_CTX_get_params(): Gets the MAC size. Th",
  "questions": [
    "EVP_MAC-GMAC 如何用于消息认证：GMAC？",
    "EVP_MAC-GMAC 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-mac-gmac",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_MAC-GMAC.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：消息认证：GMAC · EVP_MAC-GMAC（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：消息认证：GMAC。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_MAC-GMAC - The GMAC EVP_MAC implementation

## 技术正文

## NAME


EVP_MAC-GMAC - The GMAC EVP_MAC implementation

## DESCRIPTION


Support for computing GMAC MACs through the **EVP_MAC** API.

This implementation uses EVP_CIPHER functions to get access to the underlying
cipher.

### Identity


This implementation is identified with this name and properties, to be
used with EVP_MAC_fetch():


- "GMAC", "provider=default" or "provider=fips"


### Supported parameters


The general description of these parameters can be found in
EVP_MAC(3)/PARAMETERS.

The following parameter can be set with EVP_MAC_CTX_set_params():


- "key" (**OSSL_MAC_PARAM_KEY**) <octet string>

Sets the MAC key.
Setting this parameter is identical to passing a `key` to EVP_MAC_init(3).

- "iv" (**OSSL_MAC_PARAM_IV**) <octet string>

Sets the IV of the underlying cipher, when applicable.

- "cipher" (**OSSL_MAC_PARAM_CIPHER**) <UTF8 string>

Sets the name of the underlying cipher to be used.

- "properties" (**OSSL_MAC_PARAM_PROPERTIES**) <UTF8 string>

Sets the properties to be queried when trying to fetch the underlying cipher.
This must be given together with the cipher naming parameter to be considered
valid.


The following parameters can be retrieved with
EVP_MAC_CTX_get_params():


- "size" (**OSSL_MAC_PARAM_SIZE**) <unsigned integer>

Gets the MAC size.


The "size" parameter can also be retrieved with EVP_MAC_CTX_get_mac_size().
The length of the "size" parameter is equal to that of an **unsigned int**.

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

- 上游：[doc/man7/EVP_MAC-GMAC.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_MAC-GMAC.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_MAC-GMAC.pod`；SHA-256：`72df37efb5cb7c7ee88345b49af7c3da647143e90702cbad0c14264aad2a372b`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
