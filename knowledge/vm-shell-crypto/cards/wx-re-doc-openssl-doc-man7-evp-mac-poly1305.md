---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-mac-poly1305",
  "title": "OpenSSL：消息认证：Poly1305 · EVP_MAC-Poly1305（man7）",
  "type": "note",
  "tags": [
    "消息认证",
    "HMAC",
    "完整性",
    "openssl",
    "EVP_MAC-Poly1305",
    "Poly1305认证"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "98cb66b0f322def95c636a61304a5679d6cba5d744f77be5e8d6051999f27ac3",
  "generatedHash": "05b0420139605061f5944b08ff4ab538e9473397e8c7bb3b384ced9fb0459204",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "消息认证：Poly1305：EVP_MAC-Poly1305 - The Poly1305 EVP_MAC implementation",
  "l1": "Support for computing Poly1305 MACs through the **EVP_MAC** API. This implementation is identified with this name and properties, to be used with EVP_MAC_fetch(): The general description of these parameters can be found in EVP_MAC(3)/PARAMETERS. The following parameter can be set with EVP_MAC_CTX_set_params(): Sets the MAC key. Setting this parameter is identical to passing a `key` to EVP_MAC_init(3). The following parameters can be retrieved with EVP_MAC_CTX_get_params(): Gets the MAC size. The \"size\" parameter can also be retrieved with with EVP_MAC_CTX_get_mac_size(). The length of the \"size\" parameter should not exceed that of an **unsigned int**.",
  "questions": [
    "EVP_MAC-Poly1305 如何用于消息认证：Poly1305？",
    "EVP_MAC-Poly1305 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-focus-crypto-chacha-quarter",
      "kind": "机制参照"
    }
  ],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-mac-poly1305",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_MAC-Poly1305.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：消息认证：Poly1305 · EVP_MAC-Poly1305（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：消息认证：Poly1305。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_MAC-Poly1305 - The Poly1305 EVP_MAC implementation

## 技术正文

## NAME


EVP_MAC-Poly1305 - The Poly1305 EVP_MAC implementation

## DESCRIPTION


Support for computing Poly1305 MACs through the **EVP_MAC** API.

### Identity


This implementation is identified with this name and properties, to be
used with EVP_MAC_fetch():


- "POLY1305", "provider=default"


### Supported parameters


The general description of these parameters can be found in
EVP_MAC(3)/PARAMETERS.

The following parameter can be set with EVP_MAC_CTX_set_params():


- "key" (**OSSL_MAC_PARAM_KEY**) <octet string>

Sets the MAC key.
Setting this parameter is identical to passing a `key` to EVP_MAC_init(3).


The following parameters can be retrieved with
EVP_MAC_CTX_get_params():


- "size" (**OSSL_MAC_PARAM_SIZE**) <unsigned integer>

Gets the MAC size.


The "size" parameter can also be retrieved with with EVP_MAC_CTX_get_mac_size().
The length of the "size" parameter should not exceed that of an **unsigned int**.

## NOTES


The OpenSSL implementation of the Poly 1305 MAC corresponds to RFC 7539.

It is critical to never reuse the key.  The security implication noted in
RFC 8439 applies equally to the OpenSSL implementation.

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

- 上游：[doc/man7/EVP_MAC-Poly1305.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_MAC-Poly1305.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_MAC-Poly1305.pod`；SHA-256：`98cb66b0f322def95c636a61304a5679d6cba5d744f77be5e8d6051999f27ac3`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
