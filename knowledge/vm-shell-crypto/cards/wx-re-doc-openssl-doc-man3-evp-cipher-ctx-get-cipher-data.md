---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-cipher-ctx-get-cipher-data",
  "title": "OpenSSL：对称密码与工作模式 · EVP_CIPHER_CTX_get_cipher_data（man3）",
  "type": "note",
  "tags": [
    "对称加密",
    "分组密码",
    "加密算法",
    "工作模式",
    "openssl",
    "EVP_CIPHER_CTX_get_cipher_data"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "db71993e15c9cc4a70554ed08bd3258bc54ca19b102be562106d77ebfa0497ab",
  "generatedHash": "a82df6a5f83378b4a51d382b87f9746f6bed3f985159326305e9c2ffa7be3311",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "对称密码与工作模式：EVP_CIPHER_CTX_get_cipher_data, EVP_CIPHER_CTX_set_cipher_data - Routines to inspect and modify EVP_CIPHER_CTX objects",
  "l1": "The EVP_CIPHER_CTX_get_cipher_data() function returns a pointer to the cipher data relevant to EVP_CIPHER_CTX. The contents of this data is specific to the particular implementation of the cipher. For example this data can be used by engines to store engine specific information. The data is automatically allocated and freed by OpenSSL, so applications and engines should not normally free this directly (but see below). The EVP_CIPHER_CTX_set_cipher_data() function allows an application or engine to replace the cipher data with new data. A pointer to any existing cipher data is returned from this function. If the old data is no longer required then it should be freed through a call to OPENSSL_free().",
  "questions": [
    "EVP_CIPHER_CTX_get_cipher_data 如何用于对称密码与工作模式？",
    "EVP_CIPHER_CTX_get_cipher_data 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-cipher-ctx-get-cipher-data",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_CIPHER_CTX_get_cipher_data.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：对称密码与工作模式 · EVP_CIPHER_CTX_get_cipher_data（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：对称密码与工作模式。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_CIPHER_CTX_get_cipher_data, EVP_CIPHER_CTX_set_cipher_data - Routines to
inspect and modify EVP_CIPHER_CTX objects

## 技术正文

## NAME


EVP_CIPHER_CTX_get_cipher_data, EVP_CIPHER_CTX_set_cipher_data - Routines to
inspect and modify EVP_CIPHER_CTX objects

## SYNOPSIS


```c
#include <openssl/evp.h>

void *EVP_CIPHER_CTX_get_cipher_data(const EVP_CIPHER_CTX *ctx);
void *EVP_CIPHER_CTX_set_cipher_data(EVP_CIPHER_CTX *ctx, void *cipher_data);

```

## DESCRIPTION


The EVP_CIPHER_CTX_get_cipher_data() function returns a pointer to the cipher
data relevant to EVP_CIPHER_CTX. The contents of this data is specific to the
particular implementation of the cipher. For example this data can be used by
engines to store engine specific information. The data is automatically
allocated and freed by OpenSSL, so applications and engines should not normally
free this directly (but see below).

The EVP_CIPHER_CTX_set_cipher_data() function allows an application or engine to
replace the cipher data with new data. A pointer to any existing cipher data is
returned from this function. If the old data is no longer required then it
should be freed through a call to OPENSSL_free().

## RETURN VALUES


The EVP_CIPHER_CTX_get_cipher_data() function returns a pointer to the current
cipher data for the EVP_CIPHER_CTX.

The EVP_CIPHER_CTX_set_cipher_data() function returns a pointer to the old
cipher data for the EVP_CIPHER_CTX.

## HISTORY


The EVP_CIPHER_CTX_get_cipher_data() and EVP_CIPHER_CTX_set_cipher_data()
functions were added in OpenSSL 1.1.0.

## COPYRIGHT


Copyright 2016 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_CIPHER_CTX_get_cipher_data.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_CIPHER_CTX_get_cipher_data.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_CIPHER_CTX_get_cipher_data.pod`；SHA-256：`db71993e15c9cc4a70554ed08bd3258bc54ca19b102be562106d77ebfa0497ab`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
