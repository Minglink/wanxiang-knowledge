---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-asym-cipher-rsa",
  "title": "OpenSSL：EVP 密码接口 · EVP_ASYM_CIPHER-RSA（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "密码接口",
    "Provider",
    "openssl",
    "EVP_ASYM_CIPHER-RSA",
    "RSA非对称密码"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "9f812bc85689d334e78fef6feaccffbca8706cd046f4cbba649945aea84f4e7c",
  "generatedHash": "ad0fa0957ff3c3fa59b783617b2d8ba1dfdfe3c899535a1f979398d11cace9ca",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "EVP 密码接口：EVP_ASYM_CIPHER-RSA - RSA Asymmetric Cipher algorithm support",
  "l1": "Asymmetric Cipher support for the **RSA** key type. The default provider understands these RSA padding modes in string form: This padding mode is no longer supported by the FIPS provider for key agreement and key transport. (This is a FIPS 140-3 requirement) The default provider understands these RSA padding modes in integer form: This padding mode is no longer supported by the FIPS provider for key agreement and key transport. (This is a FIPS 140-3 requirement) See EVP_PKEY_CTX_set_rsa_padding(3) for further details. See **RSA_PKCS1_WITH_TLS_PADDING** on the page EVP_PKEY_CTX_set_rsa_padding(3). See **RSA_PKCS1_WITH_TLS_PADDING** on the page EVP_PKEY_CTX_set_rsa_padding(3). See provider-asym_cipher(7)/Asymmetric Cipher Parameters for more information. The OpenSSL FIPS provider also supports the following parameters: See provider-asym_cip",
  "questions": [
    "EVP_ASYM_CIPHER-RSA 如何用于EVP 密码接口？",
    "EVP_ASYM_CIPHER-RSA 有哪些参数、约束、实现语义和注意事项？"
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
      "id": "doc-openssl-doc-man7-evp-asym-cipher-rsa",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_ASYM_CIPHER-RSA.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：EVP 密码接口 · EVP_ASYM_CIPHER-RSA（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：EVP 密码接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_ASYM_CIPHER-RSA
- RSA Asymmetric Cipher algorithm support

## 技术正文

## NAME


EVP_ASYM_CIPHER-RSA
- RSA Asymmetric Cipher algorithm support

## DESCRIPTION


Asymmetric Cipher support for the **RSA** key type.

### RSA Asymmetric Cipher parameters



- "pad-mode" (**OSSL_ASYM_CIPHER_PARAM_PAD_MODE**) <UTF8 string>

The default provider understands these RSA padding modes in string form:


- "none" (**OSSL_PKEY_RSA_PAD_MODE_NONE**)

- "oaep" (**OSSL_PKEY_RSA_PAD_MODE_OAEP**)

- "pkcs1" (**OSSL_PKEY_RSA_PAD_MODE_PKCSV15**)

This padding mode is no longer supported by the FIPS provider for key
agreement and key transport.
(This is a FIPS 140-3 requirement)

- "x931" (**OSSL_PKEY_RSA_PAD_MODE_X931**)


- "pad-mode" (**OSSL_ASYM_CIPHER_PARAM_PAD_MODE**) <integer>

The default provider understands these RSA padding modes in integer form:


- 1 (**RSA_PKCS1_PADDING**)

This padding mode is no longer supported by the FIPS provider for key
agreement and key transport.
(This is a FIPS 140-3 requirement)

- 3 (**RSA_NO_PADDING**)

- 4 (**RSA_PKCS1_OAEP_PADDING**)

- 5 (**RSA_X931_PADDING**)


See EVP_PKEY_CTX_set_rsa_padding(3) for further details.

- "digest" (**OSSL_ASYM_CIPHER_PARAM_OAEP_DIGEST**) <UTF8 string>

- "digest-props" (**OSSL_ASYM_CIPHER_PARAM_OAEP_DIGEST_PROPS**) <UTF8 string>

- "mgf1-digest" (**OSSL_ASYM_CIPHER_PARAM_MGF1_DIGEST**) <UTF8 string>

- "mgf1-digest-props" (**OSSL_ASYM_CIPHER_PARAM_MGF1_DIGEST_PROPS**) <UTF8 string>

- "oaep-label" (**OSSL_ASYM_CIPHER_PARAM_OAEP_LABEL**) <octet string>

- "tls-client-version" (**OSSL_ASYM_CIPHER_PARAM_TLS_CLIENT_VERSION**) <unsigned integer>

See **RSA_PKCS1_WITH_TLS_PADDING** on the page EVP_PKEY_CTX_set_rsa_padding(3).

- "tls-negotiated-version" (**OSSL_ASYM_CIPHER_PARAM_TLS_CLIENT_VERSION**) <unsigned integer>

See **RSA_PKCS1_WITH_TLS_PADDING** on the page EVP_PKEY_CTX_set_rsa_padding(3).

See provider-asym_cipher(7)/Asymmetric Cipher Parameters for more information.


The OpenSSL FIPS provider also supports the following parameters:


- "fips-indicator" (**OSSL_ASYM_CIPHER_PARAM_FIPS_APPROVED_INDICATOR**) <integer>

- "key-check" (**OSSL_ASYM_CIPHER_PARAM_FIPS_KEY_CHECK**) <integer>

See provider-asym_cipher(7)/Asymmetric Cipher Parameters for more information.

- "pkcs15-pad-disabled" (**OSSL_ASYM_CIPHER_PARAM_FIPS_RSA_PKCS15_PAD_DISABLED**) <integer>

The default value of 1 causes an error during encryption if the RSA padding
mode is set to "pkcs1".
Setting this to zero will ignore the error and set the approved
"fips-indicator" to 0.
This option breaks FIPS compliance if it causes the approved "fips-indicator"
to return 0.


## SEE ALSO


EVP_PKEY-RSA(7),
EVP_PKEY(3),
provider-asym_cipher(7),
provider-keymgmt(7),
OSSL_PROVIDER-default(7)
OSSL_PROVIDER-FIPS(7)

## COPYRIGHT


Copyright 2022-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_ASYM_CIPHER-RSA.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_ASYM_CIPHER-RSA.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_ASYM_CIPHER-RSA.pod`；SHA-256：`9f812bc85689d334e78fef6feaccffbca8706cd046f4cbba649945aea84f4e7c`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
