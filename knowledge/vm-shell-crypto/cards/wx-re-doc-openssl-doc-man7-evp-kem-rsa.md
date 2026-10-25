---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-kem-rsa",
  "title": "OpenSSL：EVP 密码接口 · EVP_KEM-RSA（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "密码接口",
    "Provider",
    "openssl",
    "EVP_KEM-RSA",
    "RSA非对称密码"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "110c145354830a95baed959f33e66a495e26a2bdbd8d61628ba7ea18b2338a7b",
  "generatedHash": "5d4d2f1df9552bc06059b79a1a6522d54621f3fb5a4dd5bbf3203d5d1345dbda",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "EVP 密码接口：EVP_KEM-RSA - EVP_KEM RSA keytype and algorithm support",
  "l1": "The **RSA** keytype and its parameters are described in EVP_PKEY-RSA(7). See EVP_PKEY_encapsulate(3) and EVP_PKEY_decapsulate(3) for more info. The OpenSSL RSA Key Encapsulation Mechanism only currently supports the following default operation (operating mode): The encapsulate function simply generates a secret using random bytes and then encrypts the secret using the RSA public key (with no padding). The decapsulate function recovers the secret using the RSA private key. This can be set using EVP_PKEY_CTX_set_kem_op(). These parameters are described in provider-kem(7). ",
  "questions": [
    "EVP_KEM-RSA 如何用于EVP 密码接口？",
    "EVP_KEM-RSA 有哪些参数、约束、实现语义和注意事项？"
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
      "id": "doc-openssl-doc-man7-evp-kem-rsa",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KEM-RSA.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：EVP 密码接口 · EVP_KEM-RSA（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：EVP 密码接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_KEM-RSA
- EVP_KEM RSA keytype and algorithm support

## 技术正文

## NAME


EVP_KEM-RSA
- EVP_KEM RSA keytype and algorithm support

## DESCRIPTION


The **RSA** keytype and its parameters are described in EVP_PKEY-RSA(7).
See EVP_PKEY_encapsulate(3) and EVP_PKEY_decapsulate(3) for more info.

### RSA KEM parameters



- "operation" (**OSSL_KEM_PARAM_OPERATION**) <UTF8 string>

The OpenSSL RSA Key Encapsulation Mechanism only currently supports the
following default operation (operating mode):


- "RSASVE"

The encapsulate function simply generates a secret using random bytes and then
encrypts the secret using the RSA public key (with no padding).
The decapsulate function recovers the secret using the RSA private key.


This can be set using EVP_PKEY_CTX_set_kem_op().

- "fips-indicator" (**OSSL_KEM_PARAM_FIPS_APPROVED_INDICATOR**) <integer>

- "key-check" (**OSSL_KEM_PARAM_FIPS_KEY_CHECK**) <integer>

These parameters are described in provider-kem(7).


## CONFORMING TO



- SP800-56Br2

Section 7.2.1.2 RSASVE Generate Operation (RSASVE.GENERATE).
Section 7.2.1.3 RSASVE Recovery Operation (RSASVE.RECOVER).


## SEE ALSO


EVP_PKEY_CTX_set_kem_op(3),
EVP_PKEY_encapsulate(3),
EVP_PKEY_decapsulate(3)
EVP_KEYMGMT(3),
EVP_PKEY(3),
provider-keymgmt(7)

## HISTORY


This functionality was added in OpenSSL 3.0.

The `operation` (operating mode) was a required parameter prior to OpenSSL 3.5.
As of OpenSSL 3.5, `RSASVE` is the default operating mode, and no explicit
value need be specified.

## COPYRIGHT


Copyright 2020-2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_KEM-RSA.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KEM-RSA.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_KEM-RSA.pod`；SHA-256：`110c145354830a95baed959f33e66a495e26a2bdbd8d61628ba7ea18b2338a7b`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
