---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-pkey-todata",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY_todata（man3）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY_todata"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "69f286cb1a74a3a1499cb6645a04a66d7f73cb521206b4b656e982bd7251a9f5",
  "generatedHash": "96b4972652df36fa065c85db3817438cb848e417834a4eeeb4a014814bd8b0ad",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY_todata, EVP_PKEY_export - functions to return keys as an array of key parameters",
  "l1": "The functions described here are used to extract **EVP_PKEY** key values as an array of OSSL_PARAM(3). EVP_PKEY_todata() extracts values from a key `pkey` using the `selection`. `selection` is described in EVP_PKEY_fromdata(3)/Selections. OSSL_PARAM_free(3) should be used to free the returned parameters in `*params`. EVP_PKEY_export() is similar to EVP_PKEY_todata() but uses a callback `export_cb` that gets passed the value of `export_cbarg`. See openssl-core.h(7) for more information about the callback. Note that the OSSL_PARAM(3) array that is passed to the callback is not persistent after the callback returns. The user must preserve the items of interest, or use EVP_PKEY_todata() if persistence is required.",
  "questions": [
    "EVP_PKEY_todata 如何用于非对称密钥与签名？",
    "EVP_PKEY_todata 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-pkey-todata",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_todata.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY_todata（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY_todata, EVP_PKEY_export
- functions to return keys as an array of key parameters

## 技术正文

## NAME


EVP_PKEY_todata, EVP_PKEY_export
- functions to return keys as an array of key parameters

## SYNOPSIS


```c
#include <openssl/evp.h>

int EVP_PKEY_todata(const EVP_PKEY *pkey, int selection, OSSL_PARAM **params);
int EVP_PKEY_export(const EVP_PKEY *pkey, int selection,
                    OSSL_CALLBACK *export_cb, void *export_cbarg);

```

## DESCRIPTION


The functions described here are used to extract **EVP_PKEY** key values as an
array of OSSL_PARAM(3).

EVP_PKEY_todata() extracts values from a key `pkey` using the `selection`.
`selection` is described in EVP_PKEY_fromdata(3)/Selections.
OSSL_PARAM_free(3) should be used to free the returned parameters in
`*params`.

EVP_PKEY_export() is similar to EVP_PKEY_todata() but uses a callback
`export_cb` that gets passed the value of `export_cbarg`.
See openssl-core.h(7) for more information about the callback. Note that the
OSSL_PARAM(3) array that is passed to the callback is not persistent after the
callback returns. The user must preserve the items of interest, or use
EVP_PKEY_todata() if persistence is required.

## NOTES


These functions only work with key management methods coming from a provider.
This is the mirror function to EVP_PKEY_fromdata(3).

## RETURN VALUES


EVP_PKEY_todata() and EVP_PKEY_export() return 1 for success and 0 for failure.

## SEE ALSO


OSSL_PARAM(3),
openssl-core.h(7),
EVP_PKEY_fromdata(3),
EVP_PKEY-RSA(7),
EVP_PKEY-EC(7),
EVP_PKEY-DSA(7),
EVP_PKEY-ED25519(7)
EVP_PKEY-ED448(7),
EVP_PKEY-DH(7),
EVP_PKEY-X25519(7),
EVP_PKEY-X448(7),
EVP_PKEY-ML-DSA(7),
EVP_PKEY-ML-KEM(7),
EVP_PKEY-SLH-DSA(7).

## HISTORY


These functions were added in OpenSSL 3.0.

Support for **ML-DSA**, **ML-KEM** and **SLH-DSA** was added in OpenSSL 3.5.

## COPYRIGHT


Copyright 2021-2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_PKEY_todata.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_todata.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_PKEY_todata.pod`；SHA-256：`69f286cb1a74a3a1499cb6645a04a66d7f73cb521206b4b656e982bd7251a9f5`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
