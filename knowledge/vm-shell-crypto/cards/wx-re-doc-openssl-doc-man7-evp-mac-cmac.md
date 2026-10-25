---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-mac-cmac",
  "title": "OpenSSL：消息认证：CMAC · EVP_MAC-CMAC（man7）",
  "type": "note",
  "tags": [
    "消息认证",
    "HMAC",
    "完整性",
    "openssl",
    "EVP_MAC-CMAC"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "2437c9ae1dff068661733f2f58d9d2d63a78b7f929cccb0107bc0b309917b652",
  "generatedHash": "9fc4b9377aea79e13bae7f48b59b1c4cee377266fa437839e07b0e2c16550ce9",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "消息认证：CMAC：EVP_MAC-CMAC - The CMAC EVP_MAC implementation",
  "l1": "Support for computing CMAC MACs through the **EVP_MAC** API. This implementation uses EVP_CIPHER functions to get access to the underlying cipher. This implementation is identified with this name and properties, to be used with EVP_MAC_fetch(): The general description of these parameters can be found in EVP_MAC(3)/PARAMETERS. The following parameter can be set with EVP_MAC_CTX_set_params(): Sets the MAC key. Setting this parameter is identical to passing a `key` to EVP_MAC_init(3). Sets the name of the underlying cipher to be used. The mode of the cipher must be CBC. Sets the properties to be queried when trying to fetch the underlying cipher. This must be given together with the cipher naming parameter to be considered valid. This option is used by the OpenSSL FIPS provider. If required this parameter should be set before EVP_MAC_init() ",
  "questions": [
    "EVP_MAC-CMAC 如何用于消息认证：CMAC？",
    "EVP_MAC-CMAC 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-mac-cmac",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_MAC-CMAC.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：消息认证：CMAC · EVP_MAC-CMAC（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：消息认证：CMAC。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_MAC-CMAC - The CMAC EVP_MAC implementation

## 技术正文

## NAME


EVP_MAC-CMAC - The CMAC EVP_MAC implementation

## DESCRIPTION


Support for computing CMAC MACs through the **EVP_MAC** API.

This implementation uses EVP_CIPHER functions to get access to the underlying
cipher.

### Identity


This implementation is identified with this name and properties, to be
used with EVP_MAC_fetch():


- "CMAC", "provider=default" or "provider=fips"


### Supported parameters


The general description of these parameters can be found in
EVP_MAC(3)/PARAMETERS.

The following parameter can be set with EVP_MAC_CTX_set_params():


- "key" (**OSSL_MAC_PARAM_KEY**) <octet string>

Sets the MAC key.
Setting this parameter is identical to passing a `key` to EVP_MAC_init(3).

- "cipher" (**OSSL_MAC_PARAM_CIPHER**) <UTF8 string>

Sets the name of the underlying cipher to be used. The mode of the cipher
must be CBC.

- "properties" (**OSSL_MAC_PARAM_PROPERTIES**) <UTF8 string>

Sets the properties to be queried when trying to fetch the underlying cipher.
This must be given together with the cipher naming parameter to be considered
valid.

- "encrypt-check" (**OSSL_CIPHER_PARAM_FIPS_ENCRYPT_CHECK**) <integer>

This option is used by the OpenSSL FIPS provider.
If required this parameter should be set before EVP_MAC_init()

The default value of 1 causes an error when a unapproved Triple-DES encryption
operation is triggered.
Setting this to 0 will ignore the error and set the approved
"fips-indicator" to 0.
This option breaks FIPS compliance if it causes the approved "fips-indicator"
to return 0.


The following parameters can be retrieved with
EVP_MAC_CTX_get_params():


- "size" (**OSSL_MAC_PARAM_SIZE**) <unsigned integer>

The "size" parameter can also be retrieved with with EVP_MAC_CTX_get_mac_size().
The length of the "size" parameter is equal to that of an **unsigned int**.


- "block-size" (**OSSL_MAC_PARAM_BLOCK_SIZE**) <unsigned integer>

Gets the MAC block size.  The "block-size" parameter can also be retrieved with
EVP_MAC_CTX_get_block_size().

- "fips-indicator" (**OSSL_CIPHER_PARAM_FIPS_APPROVED_INDICATOR**) <integer>

This option is used by the OpenSSL FIPS provider.

A getter that returns 1 if the operation is FIPS approved, or 0 otherwise.
This may be used after calling EVP_MAC_final().
It may return 0 if the "encrypt-check" option is set to 0.


## SEE ALSO


EVP_MAC_CTX_get_params(3), EVP_MAC_CTX_set_params(3),
EVP_MAC(3)/PARAMETERS, OSSL_PARAM(3)

## COPYRIGHT


Copyright 2018-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_MAC-CMAC.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_MAC-CMAC.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_MAC-CMAC.pod`；SHA-256：`2437c9ae1dff068661733f2f58d9d2d63a78b7f929cccb0107bc0b309917b652`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
