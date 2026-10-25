---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-kdf-hmac-drbg",
  "title": "OpenSSL：密钥派生：HMAC-DRBG · EVP_KDF-HMAC-DRBG（man7）",
  "type": "note",
  "tags": [
    "密钥派生",
    "KDF",
    "加密算法",
    "openssl",
    "EVP_KDF-HMAC-DRBG",
    "HMAC消息认证"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "a1ae3b29c863c9dc8bcfa5679386d5d03d707806ecbfcc50d0aabb099b056395",
  "generatedHash": "d2933f4364cd2cf63ba87bcdb7a565b8fd607384fc02ba9fb6b4c0be3bcc0b24",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密钥派生：HMAC-DRBG：EVP_KDF-HMAC-DRBG - The HMAC DRBG DETERMINISTIC EVP_KDF implementation",
  "l1": "Support for a deterministic HMAC DRBG using the **EVP_KDF** API. This is similar to EVP_RAND-HMAC-DRBG(7), but uses fixed values for its entropy and nonce values. This is used to generate deterministic nonce value required by ECDSA and DSA (as defined in RFC 6979). \"HMAC-DRBG-KDF\" is the name for this implementation; it can be used with the EVP_KDF_fetch() function. The supported parameters are: These parameters work as described in EVP_KDF(3)/PARAMETERS. Sets the entropy bytes supplied to the HMAC-DRBG. Sets the nonce bytes supplied to the HMAC-DRBG. ",
  "questions": [
    "EVP_KDF-HMAC-DRBG 如何用于密钥派生：HMAC-DRBG？",
    "EVP_KDF-HMAC-DRBG 有哪些参数、约束、实现语义和注意事项？"
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
      "id": "doc-openssl-doc-man7-evp-kdf-hmac-drbg",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KDF-HMAC-DRBG.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密钥派生：HMAC-DRBG · EVP_KDF-HMAC-DRBG（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密钥派生：HMAC-DRBG。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_KDF-HMAC-DRBG
- The HMAC DRBG DETERMINISTIC EVP_KDF implementation

## 技术正文

## NAME


EVP_KDF-HMAC-DRBG
- The HMAC DRBG DETERMINISTIC EVP_KDF implementation

## DESCRIPTION


Support for a deterministic HMAC DRBG using the **EVP_KDF** API. This is similar
to EVP_RAND-HMAC-DRBG(7), but uses fixed values for its entropy and nonce
values. This is used to generate deterministic nonce value required by ECDSA
and DSA (as defined in RFC 6979).

### Identity


"HMAC-DRBG-KDF" is the name for this implementation; it can be used
with the EVP_KDF_fetch() function.

### Supported parameters


The supported parameters are:


- "digest" (**OSSL_DRBG_PARAM_DIGEST**) <UTF8 string>

- "properties" (**OSSL_DRBG_PARAM_PROPERTIES**) <UTF8 string>

These parameters work as described in EVP_KDF(3)/PARAMETERS.

- "entropy" (**OSSL_KDF_PARAM_HMACDRBG_ENTROPY**) <octet string>

Sets the entropy bytes supplied to the HMAC-DRBG.

- "nonce" (**OSSL_KDF_PARAM_HMACDRBG_NONCE**) <octet string>

Sets the nonce bytes supplied to the HMAC-DRBG.


## NOTES


A context for KDF HMAC DRBG can be obtained by calling:

```c
EVP_KDF *kdf = EVP_KDF_fetch(NULL, "HMAC-DRBG-KDF", NULL);
EVP_KDF_CTX *kdf_ctx = EVP_KDF_CTX_new(kdf, NULL);

```

## CONFORMING TO


RFC 6979

## SEE ALSO


EVP_KDF(3),
EVP_KDF(3)/PARAMETERS

## HISTORY


The EVP_KDF-HMAC-DRBG functionality was added in OpenSSL 3.2.

## COPYRIGHT


Copyright 2022-2023 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_KDF-HMAC-DRBG.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KDF-HMAC-DRBG.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_KDF-HMAC-DRBG.pod`；SHA-256：`a1ae3b29c863c9dc8bcfa5679386d5d03d707806ecbfcc50d0aabb099b056395`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
