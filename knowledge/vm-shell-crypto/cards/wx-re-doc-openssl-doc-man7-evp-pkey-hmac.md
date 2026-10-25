---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-pkey-hmac",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY-HMAC（man7）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY-HMAC",
    "HMAC消息认证",
    "Poly1305认证",
    "SipHash带密钥哈希"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "c2448d82a3ca7c98378ad3c5b1714619ddb359ee75234a65e6b03b0093576427",
  "generatedHash": "121b2187667db2e8eef8fac1482d08ff6c454a8259d30e9ed78cb8a139481245",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY-HMAC, EVP_KEYMGMT-HMAC, EVP_PKEY-Siphash, EVP_KEYMGMT-Siphash, EVP_PKEY-Poly1305, EVP_KEYMGMT-Poly1305, EVP_PKEY-CMAC, EVP_KEYMGMT-CMAC - EVP_PKEY legacy MAC keytypes and algorithm support",
  "l1": "The **HMAC** and **CMAC** key types are implemented in OpenSSL's default and FIPS providers. Additionally the **Siphash** and **Poly1305** key types are implemented in the default provider. Performing MAC operations via an EVP_PKEY is considered legacy and are only available for backwards compatibility purposes and for a restricted set of algorithms. The preferred way of performing MAC operations is via the EVP_MAC APIs. See EVP_MAC_init(3). For further details on using EVP_PKEY based MAC keys see EVP_SIGNATURE-HMAC(7), EVP_SIGNATURE-Siphash(7), EVP_SIGNATURE-Poly1305(7) or EVP_SIGNATURE-CMAC(7). All the **MAC** keytypes support the following parameters. The MAC key value. A property query string to be used when any algorithms are fetched. As well as the parameters described above, the **CMAC** keytype additionally supports the following ",
  "questions": [
    "EVP_PKEY-HMAC 如何用于非对称密钥与签名？",
    "EVP_PKEY-HMAC 有哪些参数、约束、实现语义和注意事项？"
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
      "id": "doc-openssl-doc-man7-evp-pkey-hmac",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_PKEY-HMAC.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY-HMAC（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY-HMAC, EVP_KEYMGMT-HMAC, EVP_PKEY-Siphash, EVP_KEYMGMT-Siphash,
EVP_PKEY-Poly1305, EVP_KEYMGMT-Poly1305, EVP_PKEY-CMAC, EVP_KEYMGMT-CMAC
- EVP_PKEY legacy MAC keytypes and algorithm support

## 技术正文

## NAME


EVP_PKEY-HMAC, EVP_KEYMGMT-HMAC, EVP_PKEY-Siphash, EVP_KEYMGMT-Siphash,
EVP_PKEY-Poly1305, EVP_KEYMGMT-Poly1305, EVP_PKEY-CMAC, EVP_KEYMGMT-CMAC
- EVP_PKEY legacy MAC keytypes and algorithm support

## DESCRIPTION


The **HMAC** and **CMAC** key types are implemented in OpenSSL's default and FIPS
providers. Additionally the **Siphash** and **Poly1305** key types are implemented
in the default provider. Performing MAC operations via an EVP_PKEY
is considered legacy and are only available for backwards compatibility purposes
and for a restricted set of algorithms. The preferred way of performing MAC
operations is via the EVP_MAC APIs. See EVP_MAC_init(3).

For further details on using EVP_PKEY based MAC keys see
EVP_SIGNATURE-HMAC(7), EVP_SIGNATURE-Siphash(7),
EVP_SIGNATURE-Poly1305(7) or EVP_SIGNATURE-CMAC(7).

### Common MAC parameters


All the **MAC** keytypes support the following parameters.


- "priv" (**OSSL_PKEY_PARAM_PRIV_KEY**) <octet string>

The MAC key value.

- "properties" (**OSSL_PKEY_PARAM_PROPERTIES**) <UTF8 string>

A property query string to be used when any algorithms are fetched.


### CMAC parameters


As well as the parameters described above, the **CMAC** keytype additionally
supports the following parameters.


- "cipher" (**OSSL_PKEY_PARAM_CIPHER**) <UTF8 string>

The name of a cipher to be used when generating the MAC.

- "engine" (**OSSL_PKEY_PARAM_ENGINE**) <UTF8 string>

The name of an engine to be used for the specified cipher (if any).


### Common MAC key generation parameters


MAC key generation is unusual in that no new key is actually generated. Instead
a new provider side key object is created with the supplied raw key value. This
is done for backwards compatibility with previous versions of OpenSSL.


- "priv" (**OSSL_PKEY_PARAM_PRIV_KEY**) <octet string>

The MAC key value.


### CMAC key generation parameters


In addition to the common MAC key generation parameters, the CMAC key generation
additionally recognises the following.


- "cipher" (**OSSL_PKEY_PARAM_CIPHER**) <UTF8 string>

The name of a cipher to be used when generating the MAC.


## SEE ALSO


EVP_KEYMGMT(3), EVP_PKEY(3), provider-keymgmt(7)

## COPYRIGHT


Copyright 2020 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_PKEY-HMAC.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_PKEY-HMAC.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_PKEY-HMAC.pod`；SHA-256：`c2448d82a3ca7c98378ad3c5b1714619ddb359ee75234a65e6b03b0093576427`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
