---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-mac-hmac",
  "title": "OpenSSL：消息认证：HMAC · EVP_MAC-HMAC（man7）",
  "type": "note",
  "tags": [
    "消息认证",
    "HMAC",
    "完整性",
    "openssl",
    "EVP_MAC-HMAC",
    "HMAC消息认证"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "d3f9a1f1e25f338f4aa602e23c40c279638eb8bab2acfe74b99ec27f7101f3e5",
  "generatedHash": "ec789deb0364caaaacb76742ba834794cbcbd9aa918128ba6113b9486a4e3da4",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "消息认证：HMAC：EVP_MAC-HMAC - The HMAC EVP_MAC implementation",
  "l1": "Support for computing HMAC MACs through the **EVP_MAC** API. This implementation uses EVP_MD functions to get access to the underlying digest. This implementation is identified with this name and properties, to be used with EVP_MAC_fetch(): The general description of these parameters can be found in EVP_MAC(3)/PARAMETERS. The following parameters can be set with EVP_MAC_CTX_set_params(): Sets the MAC key. Setting this parameter is identical to passing a `key` to EVP_MAC_init(3). Sets the name of the underlying digest to be used. Sets the properties to be queried when trying to fetch the underlying digest. This must be given together with the digest naming parameter (\"digest\", or **OSSL_MAC_PARAM_DIGEST**) to be considered valid. A flag to set the MAC digest to not initialise the implementation specific data. The value 0 or 1 is expected. ",
  "questions": [
    "EVP_MAC-HMAC 如何用于消息认证：HMAC？",
    "EVP_MAC-HMAC 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-focus-crypto-hmac-layers",
      "kind": "机制参照"
    }
  ],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-mac-hmac",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_MAC-HMAC.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：消息认证：HMAC · EVP_MAC-HMAC（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：消息认证：HMAC。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_MAC-HMAC - The HMAC EVP_MAC implementation

## 技术正文

## NAME


EVP_MAC-HMAC - The HMAC EVP_MAC implementation

## DESCRIPTION


Support for computing HMAC MACs through the **EVP_MAC** API.

This implementation uses EVP_MD functions to get access to the underlying
digest.

### Identity


This implementation is identified with this name and properties, to be
used with EVP_MAC_fetch():


- "HMAC", "provider=default" or "provider=fips"


### Supported parameters


The general description of these parameters can be found in
EVP_MAC(3)/PARAMETERS.

The following parameters can be set with EVP_MAC_CTX_set_params():


- "key" (**OSSL_MAC_PARAM_KEY**) <octet string>

Sets the MAC key.
Setting this parameter is identical to passing a `key` to EVP_MAC_init(3).

- "digest" (**OSSL_MAC_PARAM_DIGEST**) <UTF8 string>

Sets the name of the underlying digest to be used.

- "properties" (**OSSL_MAC_PARAM_PROPERTIES**) <UTF8 string>

Sets the properties to be queried when trying to fetch the underlying digest.
This must be given together with the digest naming parameter ("digest", or
**OSSL_MAC_PARAM_DIGEST**) to be considered valid.

- "digest-noinit" (**OSSL_MAC_PARAM_DIGEST_NOINIT**) <integer>

A flag to set the MAC digest to not initialise the implementation
specific data.
The value 0 or 1 is expected.
This option is deprecated and will be removed in a future release.
It may be set but is currently ignored

- "digest-oneshot" (**OSSL_MAC_PARAM_DIGEST_ONESHOT**) <integer>

A flag to set the MAC digest to be a one-shot operation.
The value 0 or 1 is expected.
This option is deprecated and will be removed in a future release.
It may be set but is currently ignored.

- "tls-data-size" (**OSSL_MAC_PARAM_TLS_DATA_SIZE**) <unsigned integer>

- "key-check" (**OSSL_MAC_PARAM_FIPS_KEY_CHECK**) <integer>

See provider-mac(7)/Mac Parameters.



The following parameters can be retrieved with EVP_MAC_CTX_get_params():


- "size" (**OSSL_MAC_PARAM_SIZE**) <unsigned integer>

The "size" parameter can also be retrieved with EVP_MAC_CTX_get_mac_size().
The length of the "size" parameter is equal to that of an **unsigned int**.

- "block-size" (**OSSL_MAC_PARAM_BLOCK_SIZE**) <unsigned integer>

Gets the MAC block size.  The "block-size" parameter can also be retrieved with
EVP_MAC_CTX_get_block_size().

- "fips-indicator" (**OSSL_KDF_PARAM_FIPS_APPROVED_INDICATOR**) <integer>

See provider-mac(7)/Mac Parameters.


## SEE ALSO


EVP_MAC_CTX_get_params(3), EVP_MAC_CTX_set_params(3),
EVP_MAC(3)/PARAMETERS, OSSL_PARAM(3), HMAC(3)

## COPYRIGHT


Copyright 2018-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_MAC-HMAC.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_MAC-HMAC.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_MAC-HMAC.pod`；SHA-256：`d3f9a1f1e25f338f4aa602e23c40c279638eb8bab2acfe74b99ec27f7101f3e5`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
