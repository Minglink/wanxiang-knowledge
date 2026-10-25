---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-pkey-ctx-get-algor",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY_CTX_get_algor（man3）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY_CTX_get_algor"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "ccd6c13fab606b65b6b3c2d1c66e5a140a18adeb006d1ab78df2d5bb611bb291",
  "generatedHash": "192871859c1432e7e6b66b88d3ed1a11ac0c8433060a5b9c3cc2ef49073c1e85",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_CIPHER_CTX_get_algor, EVP_CIPHER_CTX_get_algor_params, EVP_CIPHER_CTX_set_algor_params, EVP_PKEY_CTX_get_algor, EVP_PKEY_CTX_get_algor_params, EVP_PKEY_CTX_set_algor_params - pass AlgorithmIdentifier and its params to/from algorithm implementations",
  "l1": "In the description here and the /SYNOPSIS above, **`TYPE`** is used as a placeholder for any EVP operation type. **EVP_`TYPE`_CTX_get_algor**() attempts to retrieve a complete AlgorithmIdentifier from the **EVP_`TYPE`** implementation, and populates `*alg` with it. If `alg` is NULL, calling this function will serve to see if calling this function is supported at all by the **EVP_`TYPE`** implementation. If `*alg` is NULL, space will be allocated automatically, and assigned to `*alg`. **EVP_`TYPE`_CTX_get_algor_params**() attempts to retrieve the `parameters` part of an AlgorithmIdentifier from the **EVP_`TYPE`** implementation, and populates `alg-`parameters> with it. If `alg` is NULL, calling this function will serve to see if calling this function is supported at all by the **EVP_`TYPE`** implementation. If I<< alg->parameters >> is NUL",
  "questions": [
    "EVP_PKEY_CTX_get_algor 如何用于非对称密钥与签名？",
    "EVP_PKEY_CTX_get_algor 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-pkey-ctx-get-algor",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_CTX_get_algor.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY_CTX_get_algor（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_CIPHER_CTX_get_algor,
EVP_CIPHER_CTX_get_algor_params,
EVP_CIPHER_CTX_set_algor_params,
EVP_PKEY_CTX_get_algor,
EVP_PKEY_CTX_get_algor_params,
EVP_PKEY_CTX_set_algor_params
- pass AlgorithmIdentifier and its params to/from algorithm implementations

## 技术正文

## NAME


EVP_CIPHER_CTX_get_algor,
EVP_CIPHER_CTX_get_algor_params,
EVP_CIPHER_CTX_set_algor_params,
EVP_PKEY_CTX_get_algor,
EVP_PKEY_CTX_get_algor_params,
EVP_PKEY_CTX_set_algor_params
- pass AlgorithmIdentifier and its params to/from algorithm implementations

## SYNOPSIS



```c
int EVP_TYPE_CTX_get_algor(EVP_TYPE_CTX *ctx, X509_ALGOR **alg);
int EVP_TYPE_CTX_get_algor_params(EVP_TYPE_CTX *ctx, X509_ALGOR *alg);
int EVP_TYPE_CTX_set_algor_params(EVP_TYPE_CTX *ctx, const X509_ALGOR *alg);

```

## DESCRIPTION


In the description here and the /SYNOPSIS above, **`TYPE`** is used as a
placeholder for any EVP operation type.

**EVP_`TYPE`_CTX_get_algor**() attempts to retrieve a complete
AlgorithmIdentifier from the **EVP_`TYPE`** implementation, and populates
`*alg` with it.
If `alg` is NULL, calling this function will serve to see if calling this
function is supported at all by the **EVP_`TYPE`** implementation.
If `*alg` is NULL, space will be allocated automatically, and assigned to
`*alg`.

**EVP_`TYPE`_CTX_get_algor_params**() attempts to retrieve the `parameters`
part of an AlgorithmIdentifier from the **EVP_`TYPE`** implementation, and
populates `alg-`parameters> with it.
If `alg` is NULL, calling this function will serve to see if calling this
function is supported at all by the **EVP_`TYPE`** implementation.
If I<< alg->parameters >> is NULL, space will be allocated automatically, and
assigned to  I<< alg->parameters >>.
If I<< alg->parameters >> is not NULL, its previous contents will be overwritten
with the retrieved AlgorithmIdentifier parameters.  Beware!

**EVP_`TYPE`_CTX_set_algor_params**() attempts to pass I<< alg->parameters >>
to the **EVP_`TYPE`** implementation.
If `alg` is NULL, calling this function will serve to see if calling this
function is supported at all by the **EVP_`TYPE`** implementation.

## RETURN VALUES


All functions return 1 for success, and 0 or a negative number if an error
occurs.  In particular, -2 is returned when the function isn't supported by
the **EVP_`TYPE`** implementation.

## HISTORY


These functions were added in OpenSSL 3.4.

## COPYRIGHT


Copyright 2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_PKEY_CTX_get_algor.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_CTX_get_algor.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_PKEY_CTX_get_algor.pod`；SHA-256：`ccd6c13fab606b65b6b3c2d1c66e5a140a18adeb006d1ab78df2d5bb611bb291`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
