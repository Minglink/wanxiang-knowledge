---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-pkey-x25519",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY-X25519（man7）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY-X25519",
    "Ed25519签名",
    "X25519密钥协商"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "76c7d1e28818274d095775bded2b9ef3bdee760ae7dd65fdbab4e95ab4679dde",
  "generatedHash": "26c41ec55032c2b6150f0971cb8477a7a16a3ca6074f4fd2475a4281891c5184",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY-X25519, EVP_PKEY-X448, EVP_PKEY-ED25519, EVP_PKEY-ED448, EVP_KEYMGMT-X25519, EVP_KEYMGMT-X448, EVP_KEYMGMT-ED25519, EVP_KEYMGMT-ED448 - EVP_PKEY X25519, X448, ED25519 and ED448 keytype and algorithm support",
  "l1": "The **X25519**, **X448**, **ED25519** and **ED448** keytypes are implemented in OpenSSL's default and FIPS providers. These implementations support the associated key, containing the public key `pub` and the private key `priv`. DHKEM requires the generation of a keypair using an input key material (seed). Use this to specify the key material used for generation of the private key. This value should not be reused for other purposes. It should have a length of at least 32 for X25519, and 56 for X448. This is only supported by X25519 and X448. This getter is only supported by X25519 and X448 for the FIPS provider. Since X25519 and X448 are unapproved in FIPS 140-3 this getter return 0. See provider-keymgmt(7)/Common Information Parameters for further information. Use EVP_PKEY_CTX_set_params() after calling EVP_PKEY_keygen_init(). In addition",
  "questions": [
    "EVP_PKEY-X25519 如何用于非对称密钥与签名？",
    "EVP_PKEY-X25519 有哪些参数、约束、实现语义和注意事项？"
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
      "id": "doc-openssl-doc-man7-evp-pkey-x25519",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_PKEY-X25519.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY-X25519（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY-X25519, EVP_PKEY-X448, EVP_PKEY-ED25519, EVP_PKEY-ED448,
EVP_KEYMGMT-X25519, EVP_KEYMGMT-X448, EVP_KEYMGMT-ED25519, EVP_KEYMGMT-ED448
- EVP_PKEY X25519, X448, ED25519 and ED448 keytype and algorithm support

## 技术正文

## NAME


EVP_PKEY-X25519, EVP_PKEY-X448, EVP_PKEY-ED25519, EVP_PKEY-ED448,
EVP_KEYMGMT-X25519, EVP_KEYMGMT-X448, EVP_KEYMGMT-ED25519, EVP_KEYMGMT-ED448
- EVP_PKEY X25519, X448, ED25519 and ED448 keytype and algorithm support

## DESCRIPTION


The **X25519**, **X448**, **ED25519** and **ED448** keytypes are
implemented in OpenSSL's default and FIPS providers.  These implementations
support the associated key, containing the public key `pub` and the
private key `priv`.

### Keygen Parameters



- "dhkem-ikm" (**OSSL_PKEY_PARAM_DHKEM_IKM**) <octet string>

DHKEM requires the generation of a keypair using an input key material (seed).
Use this to specify the key material used for generation of the private key.
This value should not be reused for other purposes.
It should have a length of at least 32 for X25519, and 56 for X448.
This is only supported by X25519 and X448.

- "fips-indicator" (**OSSL_PKEY_PARAM_FIPS_APPROVED_INDICATOR**) <integer>

This getter is only supported by X25519 and X448 for the FIPS provider.
Since X25519 and X448 are unapproved in FIPS 140-3 this getter return 0.

See provider-keymgmt(7)/Common Information Parameters for further information.


Use EVP_PKEY_CTX_set_params() after calling EVP_PKEY_keygen_init().

### Common X25519, X448, ED25519 and ED448 parameters


In addition to the common parameters that all keytypes should support (see
provider-keymgmt(7)/Common parameters), the implementation of these keytypes
support the following.


- "group" (**OSSL_PKEY_PARAM_GROUP_NAME**) <UTF8 string>

This is only supported by X25519 and X448. The group name must be "x25519" or
"x448" respectively for those algorithms. This is only present for consistency
with other key exchange algorithms and is typically not needed.

- "pub" (**OSSL_PKEY_PARAM_PUB_KEY**) <octet string>

The public key value.

- "priv" (**OSSL_PKEY_PARAM_PRIV_KEY**) <octet string>

The private key value.

- "encoded-pub-key" (**OSSL_PKEY_PARAM_ENCODED_PUBLIC_KEY**) <octet string>

Used for getting and setting the encoding of a public key for the **X25519** and
**X448** key types. Public keys are expected be encoded in a format as defined by
RFC7748.


### ED25519 and ED448 parameters



- "mandatory-digest" (**OSSL_PKEY_PARAM_MANDATORY_DIGEST**) <UTF8 string>

The empty string, signifying that no digest may be specified.


## CONFORMING TO



- RFC 8032

- RFC 8410


## EXAMPLES


An **EVP_PKEY** context can be obtained by calling:

```c
   EVP_PKEY_CTX *pctx =
       EVP_PKEY_CTX_new_from_name(NULL, "X25519", NULL);

   EVP_PKEY_CTX *pctx =
       EVP_PKEY_CTX_new_from_name(NULL, "X448", NULL);

   EVP_PKEY_CTX *pctx =
       EVP_PKEY_CTX_new_from_name(NULL, "ED25519", NULL);

   EVP_PKEY_CTX *pctx =
       EVP_PKEY_CTX_new_from_name(NULL, "ED448", NULL);

```

An **X25519** key can be generated like this:

```c
   pkey = EVP_PKEY_Q_keygen(NULL, NULL, "X25519");

```

An **X448**, **ED25519**, or **ED448** key can be generated likewise.

## SEE ALSO


EVP_KEYMGMT(3), EVP_PKEY(3), provider-keymgmt(7),
EVP_KEYEXCH-X25519(7), EVP_KEYEXCH-X448(7),
EVP_SIGNATURE-ED25519(7), EVP_SIGNATURE-ED448(7)

## COPYRIGHT


Copyright 2020-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_PKEY-X25519.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_PKEY-X25519.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_PKEY-X25519.pod`；SHA-256：`76c7d1e28818274d095775bded2b9ef3bdee760ae7dd65fdbab4e95ab4679dde`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
