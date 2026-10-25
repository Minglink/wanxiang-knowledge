---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-kem-x25519",
  "title": "OpenSSL：EVP 密码接口 · EVP_KEM-X25519（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "密码接口",
    "Provider",
    "openssl",
    "EVP_KEM-X25519",
    "X25519密钥协商"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "57bdd9fda19d409141adbaec4619c39a8c6d45687d8f2c1960d651046e26e74c",
  "generatedHash": "282b370ac3fa53fb20ce1a7b10360b05e3479f3dbac9087d97f3779e56fc341c",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "EVP 密码接口：EVP_KEM-X25519, EVP_KEM-X448 - EVP_KEM X25519 and EVP_KEM X448 keytype and algorithm support",
  "l1": "The **X25519** and <X448> keytype and its parameters are described in EVP_PKEY-X25519(7). See EVP_PKEY_encapsulate(3) and EVP_PKEY_decapsulate(3) for more info. The OpenSSL X25519 and X448 Key Encapsulation Mechanisms only support the following default operation (operating mode): The encapsulate function generates an ephemeral keypair. It produces keymaterial by doing an X25519 or X448 key exchange using the ephemeral private key and a supplied recipient public key. A HKDF operation using the keymaterial and a kem context then produces a shared secret. The shared secret and the ephemeral public key are returned. The decapsulate function uses the recipient private key and the ephemeral public key to produce the same keymaterial, which can then be used to produce the same shared secret. See https://www.rfc-editor.org/rfc/rfc9180.html#name-d",
  "questions": [
    "EVP_KEM-X25519 如何用于EVP 密码接口？",
    "EVP_KEM-X25519 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-focus-crypto-x25519-kdf",
      "kind": "机制参照"
    }
  ],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-kem-x25519",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KEM-X25519.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：EVP 密码接口 · EVP_KEM-X25519（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：EVP 密码接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_KEM-X25519, EVP_KEM-X448
- EVP_KEM X25519 and EVP_KEM X448 keytype and algorithm support

## 技术正文

## NAME


EVP_KEM-X25519, EVP_KEM-X448
- EVP_KEM X25519 and EVP_KEM X448 keytype and algorithm support

## DESCRIPTION


The **X25519** and <X448> keytype and its parameters are described in
EVP_PKEY-X25519(7).
See EVP_PKEY_encapsulate(3) and EVP_PKEY_decapsulate(3) for more info.

### X25519 and X448 KEM parameters



- "operation" (**OSSL_KEM_PARAM_OPERATION**)<UTF8 string>

The OpenSSL X25519 and X448 Key Encapsulation Mechanisms only support the
following default operation (operating mode):


- "DHKEM" (**OSSL_KEM_PARAM_OPERATION_DHKEM**)

The encapsulate function generates an ephemeral keypair. It produces keymaterial
by doing an X25519 or X448 key exchange using the ephemeral private key and a
supplied recipient public key. A HKDF operation using the keymaterial and a kem
context then produces a shared secret. The shared secret and the ephemeral
public key are returned.
The decapsulate function uses the recipient private key and the
ephemeral public key to produce the same keymaterial, which can then be used to
produce the same shared secret.
See https://www.rfc-editor.org/rfc/rfc9180.html#name-dh-based-kem-dhkem


This can be set using either EVP_PKEY_CTX_set_kem_op() or
EVP_PKEY_CTX_set_params().

- "ikme" (**OSSL_KEM_PARAM_IKME**) <octet string>

Used to specify the key material used for generation of the ephemeral key.
This value should not be reused for other purposes.
It should have a length of at least 32 for X25519, and 56 for X448.
If this value is not set, then a random ikm is used.


## CONFORMING TO



- RFC9180


## SEE ALSO


EVP_PKEY_CTX_set_kem_op(3),
EVP_PKEY_encapsulate(3),
EVP_PKEY_decapsulate(3)
EVP_KEYMGMT(3),
EVP_PKEY(3),
provider-keymgmt(7)

## HISTORY


This functionality was added in OpenSSL 3.2.

The `operation` (operating mode) was a required parameter prior to OpenSSL 3.5.
As of OpenSSL 3.5, `DHKEM` is the default operating mode, and no explicit value
need be specified.

## COPYRIGHT


Copyright 2022-2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_KEM-X25519.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KEM-X25519.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_KEM-X25519.pod`；SHA-256：`57bdd9fda19d409141adbaec4619c39a8c6d45687d8f2c1960d651046e26e74c`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
