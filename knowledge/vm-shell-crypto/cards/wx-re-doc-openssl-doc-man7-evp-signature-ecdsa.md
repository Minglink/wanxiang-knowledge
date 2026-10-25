---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-signature-ecdsa",
  "title": "OpenSSL：EVP 密码接口 · EVP_SIGNATURE-ECDSA（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "密码接口",
    "Provider",
    "openssl",
    "EVP_SIGNATURE-ECDSA",
    "椭圆曲线签名"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "59b1372c725021521ef539960c2981aa4e1ed31d0ffc03974adde07bc90ca176",
  "generatedHash": "61472c0dd59aaae55e78cfdd9add1df3b36a1b4e3b2aa138d32267cb067a6953",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "EVP 密码接口：EVP_SIGNATURE-ECDSA - The EVP_PKEY ECDSA signature implementation.",
  "l1": "Support for computing ECDSA signatures. See EVP_PKEY-EC(7) for information related to EC keys. In this list, names are grouped together to signify that they are the same algorithm having multiple names. This also includes the OID in canonical decimal form (which means that they are possible to fetch if the caller has a mere OID which came out in this form after a call to OBJ_obj2txt(3)). The base signature algorithm, supported explicitly fetched with EVP_PKEY_sign_init_ex2(3), and implicitly fetched (through EC keys) with EVP_DigestSignInit(3) and EVP_DigestVerifyInit(3). It can't be used with EVP_PKEY_sign_message_init(3) ECDSA signature schemes with diverse message digest algorithms. They are all supported explicitly fetched with EVP_PKEY_sign_init_ex2(3) and EVP_PKEY_sign_message_init(3). The following signature parameters can be set u",
  "questions": [
    "EVP_SIGNATURE-ECDSA 如何用于EVP 密码接口？",
    "EVP_SIGNATURE-ECDSA 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-signature-ecdsa",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_SIGNATURE-ECDSA.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：EVP 密码接口 · EVP_SIGNATURE-ECDSA（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：EVP 密码接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_SIGNATURE-ECDSA - The EVP_PKEY ECDSA signature implementation.

## 技术正文

## NAME


EVP_SIGNATURE-ECDSA - The EVP_PKEY ECDSA signature implementation.

## DESCRIPTION


Support for computing ECDSA signatures.
See EVP_PKEY-EC(7) for information related to EC keys.

### Algorithm Names


In this list, names are grouped together to signify that they are the same
algorithm having multiple names.  This also includes the OID in canonical
decimal form (which means that they are possible to fetch if the caller has a
mere OID which came out in this form after a call to OBJ_obj2txt(3)).


- "ECDSA"

The base signature algorithm, supported explicitly fetched with
EVP_PKEY_sign_init_ex2(3), and implicitly fetched (through
EC keys) with EVP_DigestSignInit(3) and
EVP_DigestVerifyInit(3).

It can't be used with EVP_PKEY_sign_message_init(3)

- "ECDSA-SHA1", "ECDSA-SHA-1", "ecdsa-with-SHA1", "1.2.840.10045.4.1"

- "ECDSA-SHA2-224", "ECDSA-SHA224", "ecdsa-with-SHA224", "1.2.840.10045.4.3.1"

- "ECDSA-SHA2-256", "ECDSA-SHA256", "ecdsa-with-SHA256", "1.2.840.10045.4.3.2"

- "ECDSA-SHA2-384", "ECDSA-SHA384", "ecdsa-with-SHA384", "1.2.840.10045.4.3.3"

- "ECDSA-SHA2-512", "ECDSA-SHA512", "ecdsa-with-SHA512", "1.2.840.10045.4.3.4"

- "ECDSA-SHA3-224", "ecdsa_with_SHA3-224", "id-ecdsa-with-sha3-224", "2.16.840.1.101.3.4.3.9"

- "ECDSA-SHA3-256", "ecdsa_with_SHA3-256", "id-ecdsa-with-sha3-256", "2.16.840.1.101.3.4.3.10"

- "ECDSA-SHA3-384", "ecdsa_with_SHA3-384", "id-ecdsa-with-sha3-384", "2.16.840.1.101.3.4.3.11"

- "ECDSA-SHA3-512", "ecdsa_with_SHA3-512", "id-ecdsa-with-sha3-512", "2.16.840.1.101.3.4.3.12"

ECDSA signature schemes with diverse message digest algorithms.  They are all
supported explicitly fetched with EVP_PKEY_sign_init_ex2(3) and
EVP_PKEY_sign_message_init(3).


### ECDSA Signature Parameters


The following signature parameters can be set using EVP_PKEY_CTX_set_params().
This may be called after EVP_PKEY_sign_init() or EVP_PKEY_verify_init(),
and before calling EVP_PKEY_sign() or EVP_PKEY_verify().


- "digest" (**OSSL_SIGNATURE_PARAM_DIGEST**) <UTF8 string>

- "properties" (**OSSL_SIGNATURE_PARAM_PROPERTIES**) <UTF8 string>

These two are not supported with the ECDSA signature schemes that already
include a message digest algorithm, See /Algorithm Names above.

- "nonce-type" (**OSSL_SIGNATURE_PARAM_NONCE_TYPE**) <unsigned integer>

- "key-check" (**OSSL_SIGNATURE_PARAM_FIPS_KEY_CHECK**) <integer>

- "digest-check" (**OSSL_SIGNATURE_PARAM_FIPS_DIGEST_CHECK**) <integer>

These parameters are described in provider-signature(7).


The following signature parameters can be retrieved using
EVP_PKEY_CTX_get_params().


- "algorithm-id" (**OSSL_SIGNATURE_PARAM_ALGORITHM_ID**) <octet string>

- "digest" (**OSSL_SIGNATURE_PARAM_DIGEST**) <UTF8 string>

- "nonce-type" (**OSSL_SIGNATURE_PARAM_NONCE_TYPE**) <unsigned integer>

- "fips-indicator" (**OSSL_SIGNATURE_PARAM_FIPS_APPROVED_INDICATOR**) <integer>

- "verify-message" (**OSSL_SIGNATURE_PARAM_FIPS_VERIFY_MESSAGE** <integer>

The parameters are described in provider-signature(7).


## SEE ALSO


EVP_PKEY_CTX_set_params(3),
EVP_PKEY_sign(3),
EVP_PKEY_verify(3),
provider-signature(7),

## COPYRIGHT


Copyright 2020-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_SIGNATURE-ECDSA.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_SIGNATURE-ECDSA.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_SIGNATURE-ECDSA.pod`；SHA-256：`59b1372c725021521ef539960c2981aa4e1ed31d0ffc03974adde07bc90ca176`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
