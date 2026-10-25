---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-cipher-ctx-get-original-iv",
  "title": "OpenSSL：对称密码与工作模式 · EVP_CIPHER_CTX_get_original_iv（man3）",
  "type": "note",
  "tags": [
    "对称加密",
    "分组密码",
    "加密算法",
    "工作模式",
    "openssl",
    "EVP_CIPHER_CTX_get_original_iv"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "59e248ee66e349ae98e9b78351408186c72adc580577a0cadc4f3bdcb6676399",
  "generatedHash": "c0b0e335fa29d1fd6e35bfa6a74a6264d72e507d40334ba74d1908e91512bce6",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "对称密码与工作模式：EVP_CIPHER_CTX_get_original_iv, EVP_CIPHER_CTX_get_updated_iv, EVP_CIPHER_CTX_iv, EVP_CIPHER_CTX_original_iv, EVP_CIPHER_CTX_iv_noconst - Routines to inspect EVP_CIPHER_CTX IV data",
  "l1": "EVP_CIPHER_CTX_get_original_iv() and EVP_CIPHER_CTX_get_updated_iv() copy initialization vector (IV) information from the **EVP_CIPHER_CTX** into the caller-supplied buffer. EVP_CIPHER_CTX_get_iv_length(3) can be used to determine an appropriate buffer size, and if the supplied buffer is too small, an error will be returned (and no data copied). EVP_CIPHER_CTX_get_original_iv() accesses the (\"original\") IV that was supplied when the **EVP_CIPHER_CTX** was initialized, and EVP_CIPHER_CTX_get_updated_iv() accesses the current \"IV state\" of the cipher, which is updated during cipher operation for certain cipher modes (e.g., CBC and OFB). The functions EVP_CIPHER_CTX_iv(), EVP_CIPHER_CTX_original_iv(), and EVP_CIPHER_CTX_iv_noconst() are deprecated functions that provide similar (at a conceptual level) functionality. EVP_CIPHER_CTX_iv() retur",
  "questions": [
    "EVP_CIPHER_CTX_get_original_iv 如何用于对称密码与工作模式？",
    "EVP_CIPHER_CTX_get_original_iv 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-cipher-ctx-get-original-iv",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_CIPHER_CTX_get_original_iv.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：对称密码与工作模式 · EVP_CIPHER_CTX_get_original_iv（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：对称密码与工作模式。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_CIPHER_CTX_get_original_iv, EVP_CIPHER_CTX_get_updated_iv,
EVP_CIPHER_CTX_iv, EVP_CIPHER_CTX_original_iv,
EVP_CIPHER_CTX_iv_noconst - Routines to inspect EVP_CIPHER_CTX IV data

## 技术正文

## NAME


EVP_CIPHER_CTX_get_original_iv, EVP_CIPHER_CTX_get_updated_iv,
EVP_CIPHER_CTX_iv, EVP_CIPHER_CTX_original_iv,
EVP_CIPHER_CTX_iv_noconst - Routines to inspect EVP_CIPHER_CTX IV data

## SYNOPSIS


```c
#include <openssl/evp.h>

int EVP_CIPHER_CTX_get_original_iv(EVP_CIPHER_CTX *ctx, void *buf, size_t len);
int EVP_CIPHER_CTX_get_updated_iv(EVP_CIPHER_CTX *ctx, void *buf, size_t len);

```

The following functions have been deprecated since OpenSSL 3.0, and can be
hidden entirely by defining **OPENSSL_API_COMPAT** with a suitable version value,
see openssl_user_macros(7):

```c
const unsigned char *EVP_CIPHER_CTX_iv(const EVP_CIPHER_CTX *ctx);
const unsigned char *EVP_CIPHER_CTX_original_iv(const EVP_CIPHER_CTX *ctx);
unsigned char *EVP_CIPHER_CTX_iv_noconst(EVP_CIPHER_CTX *ctx);

```

## DESCRIPTION


EVP_CIPHER_CTX_get_original_iv() and EVP_CIPHER_CTX_get_updated_iv() copy
initialization vector (IV) information from the **EVP_CIPHER_CTX** into the
caller-supplied buffer. EVP_CIPHER_CTX_get_iv_length(3) can be used to
determine an appropriate buffer size, and if the supplied buffer is too small,
an error will be returned (and no data copied).
EVP_CIPHER_CTX_get_original_iv() accesses the ("original") IV that was
supplied when the **EVP_CIPHER_CTX** was initialized, and
EVP_CIPHER_CTX_get_updated_iv() accesses the current "IV state"
of the cipher, which is updated during cipher operation for certain cipher modes
(e.g., CBC and OFB).

The functions EVP_CIPHER_CTX_iv(), EVP_CIPHER_CTX_original_iv(), and
EVP_CIPHER_CTX_iv_noconst() are deprecated functions that provide similar (at
a conceptual level) functionality.  EVP_CIPHER_CTX_iv() returns a pointer to
the beginning of the "IV state" as maintained internally in the
**EVP_CIPHER_CTX**; EVP_CIPHER_CTX_original_iv() returns a pointer to the
beginning of the ("original") IV, as maintained by the **EVP_CIPHER_CTX**, that
was provided when the **EVP_CIPHER_CTX** was initialized; and
EVP_CIPHER_CTX_get_iv_noconst() is the same as EVP_CIPHER_CTX_iv() but has a
different return type for the pointer.

## RETURN VALUES


EVP_CIPHER_CTX_get_original_iv() and EVP_CIPHER_CTX_get_updated_iv() return 1
on success and 0 on failure.

The functions EVP_CIPHER_CTX_iv(), EVP_CIPHER_CTX_original_iv(), and
EVP_CIPHER_CTX_iv_noconst() return a pointer to an IV as an array of bytes on
success, and NULL on failure.

## HISTORY


EVP_CIPHER_CTX_get_original_iv() and EVP_CIPHER_CTX_get_updated_iv() were added
in OpenSSL 3.0.0.

EVP_CIPHER_CTX_iv(), EVP_CIPHER_CTX_original_iv(), and
EVP_CIPHER_CTX_iv_noconst() were added in OpenSSL 1.1.0, and were deprecated
in OpenSSL 3.0.0.

## COPYRIGHT


Copyright 2020-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_CIPHER_CTX_get_original_iv.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_CIPHER_CTX_get_original_iv.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_CIPHER_CTX_get_original_iv.pod`；SHA-256：`59e248ee66e349ae98e9b78351408186c72adc580577a0cadc4f3bdcb6676399`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
