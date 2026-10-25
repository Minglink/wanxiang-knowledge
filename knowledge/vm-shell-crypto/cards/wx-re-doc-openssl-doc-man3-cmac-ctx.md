---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-cmac-ctx",
  "title": "OpenSSL：密码实现与接口 · CMAC_CTX（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "CMAC_CTX"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "3ab2da3ae249da5c9399d9d671e3c681564dd2b02608a205f7add87ceb164ab2",
  "generatedHash": "6c6e3f6d38d0d59ffc20122d9499577d3f58e057cefa48162465d26efa2eebb9",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：CMAC_CTX, CMAC_CTX_new, CMAC_CTX_cleanup, CMAC_CTX_free, CMAC_CTX_get0_cipher_ctx, CMAC_CTX_copy, CMAC_Init, CMAC_Update, CMAC_Final, CMAC_resume - create cipher-based message authentication codes",
  "l1": "The low-level MAC functions documented on this page are deprecated. Applications should use the new EVP_MAC(3) interface. Specifically, utilize the following functions for MAC operations: Alternatively, for a single-step MAC computation, use the EVP_Q_mac(3) function. The **CMAC_CTX** type is a structure used for the provision of CMAC (Cipher-based Message Authentication Code) operations. CMAC_CTX_new() creates a new **CMAC_CTX** structure and returns a pointer to it. CMAC_CTX_cleanup() resets the **CMAC_CTX** structure, clearing any internal data but not freeing the structure itself. CMAC_CTX_free() frees the **CMAC_CTX** structure and any associated resources. If the argument is NULL, no action is taken. CMAC_CTX_get0_cipher_ctx() returns a pointer to the internal **EVP_CIPHER_CTX** structure within the **CMAC_CTX**. CMAC_CTX_copy() cop",
  "questions": [
    "CMAC_CTX 如何用于密码实现与接口？",
    "CMAC_CTX 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-cmac-ctx",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/CMAC_CTX.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · CMAC_CTX（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

CMAC_CTX, CMAC_CTX_new, CMAC_CTX_cleanup, CMAC_CTX_free,
CMAC_CTX_get0_cipher_ctx, CMAC_CTX_copy, CMAC_Init, CMAC_Update, CMAC_Final,
CMAC_resume
- create cipher-based message authentication codes

## 技术正文

## NAME


CMAC_CTX, CMAC_CTX_new, CMAC_CTX_cleanup, CMAC_CTX_free,
CMAC_CTX_get0_cipher_ctx, CMAC_CTX_copy, CMAC_Init, CMAC_Update, CMAC_Final,
CMAC_resume
- create cipher-based message authentication codes

## SYNOPSIS


```c
#include <openssl/cmac.h>

```

The following functions have been deprecated since OpenSSL 3.0, and can be
disabled entirely by defining **OPENSSL_API_COMPAT** with a suitable version
value, see openssl_user_macros(7).

```c
typedef struct CMAC_CTX_st CMAC_CTX;

CMAC_CTX *CMAC_CTX_new(void);
void CMAC_CTX_cleanup(CMAC_CTX *ctx);
void CMAC_CTX_free(CMAC_CTX *ctx);
EVP_CIPHER_CTX *CMAC_CTX_get0_cipher_ctx(CMAC_CTX *ctx);
int CMAC_CTX_copy(CMAC_CTX *out, const CMAC_CTX *in);
int CMAC_Init(CMAC_CTX *ctx, const void *key, size_t keylen,
              const EVP_CIPHER *cipher, ENGINE *impl);
int CMAC_Update(CMAC_CTX *ctx, const void *data, size_t dlen);
int CMAC_Final(CMAC_CTX *ctx, unsigned char *out, size_t *poutlen);
int CMAC_resume(CMAC_CTX *ctx);

```

## DESCRIPTION


The low-level MAC functions documented on this page are deprecated.
Applications should use the new EVP_MAC(3) interface.
Specifically, utilize the following functions for MAC operations:


- EVP_MAC_CTX_new(3) to create a new MAC context.

- EVP_MAC_CTX_free(3) to free the MAC context.

- EVP_MAC_init(3) to initialize the MAC context.

- EVP_MAC_update(3) to update the MAC with data.

- EVP_MAC_final(3) to finalize the MAC and retrieve the output.


Alternatively, for a single-step MAC computation, use the EVP_Q_mac(3)
function.

The **CMAC_CTX** type is a structure used for the provision of CMAC
(Cipher-based Message Authentication Code) operations.

CMAC_CTX_new() creates a new **CMAC_CTX** structure and returns a pointer to it.

CMAC_CTX_cleanup() resets the **CMAC_CTX** structure, clearing any internal data
but not freeing the structure itself.

CMAC_CTX_free() frees the **CMAC_CTX** structure and any associated resources.
If the argument is NULL, no action is taken.

CMAC_CTX_get0_cipher_ctx() returns a pointer to the internal **EVP_CIPHER_CTX**
structure within the **CMAC_CTX**.

CMAC_CTX_copy() copies the state from one **CMAC_CTX** structure to another.

CMAC_Init() initializes the **CMAC_CTX** structure for a new CMAC calculation
with the specified key, key length, and cipher type.
Optionally, an **ENGINE** can be provided.

CMAC_Update() processes data to be included in the CMAC calculation.
This function can be called multiple times to update the context with
additional data.

CMAC_Final() finalizes the CMAC calculation and retrieves the resulting
MAC value. The output is stored in the provided buffer, and the length is
stored in the variable pointed to by `poutlen`. To determine the required
buffer size, call with `out` set to NULL, which stores only the length in
`poutlen`. Allocate a buffer of this size and call CMAC_Final() again with
the allocated buffer to retrieve the MAC.

CMAC_resume() resumes a previously finalized CMAC calculation, allowing
additional data to be processed and a new MAC to be generated.

## RETURN VALUES


CMAC_CTX_new() returns a pointer to a new **CMAC_CTX** structure or NULL if
an error occurs.

CMAC_CTX_get0_cipher_ctx() returns a pointer to the internal
**EVP_CIPHER_CTX** structure, or NULL if an error occurs.

CMAC_CTX_copy(), CMAC_Init(), CMAC_Update(), CMAC_Final() and CMAC_resume()
return 1 for success or 0 if an error occurs.

## HISTORY


All functions described here were deprecated in OpenSSL 3.0. For replacements,
see EVP_MAC_CTX_new(3), EVP_MAC_CTX_free(3), EVP_MAC_init(3),
EVP_MAC_update(3), and EVP_MAC_final(3).

## COPYRIGHT


Copyright 2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/CMAC_CTX.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/CMAC_CTX.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/CMAC_CTX.pod`；SHA-256：`3ab2da3ae249da5c9399d9d671e3c681564dd2b02608a205f7add87ceb164ab2`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
