---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bio-s-core",
  "title": "OpenSSL：密码数据流 · BIO_s_core（man3）",
  "type": "note",
  "tags": [
    "BIO",
    "输入输出",
    "缓冲区",
    "openssl",
    "BIO_s_core"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "0e97965851b4e641e30186b0f9b698e7f7147b0e9b89a4075550a48489f74fcc",
  "generatedHash": "cfae966f98dcbde4606764b8f2bd1869382ae89cb60c92c3487bb0e8c003592e",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码数据流：BIO_s_core, BIO_new_from_core_bio - OSSL_CORE_BIO functions",
  "l1": "BIO_s_core() returns the core BIO method function. A core BIO is treated as source/sink BIO which communicates to some external BIO. This is primarily useful to provider authors. A number of calls from libcrypto into a provider supply an OSSL_CORE_BIO parameter. This represents a BIO within libcrypto, but cannot be used directly by a provider. Instead it should be wrapped using a BIO_s_core(). Once a BIO is constructed based on BIO_s_core(), the associated OSSL_CORE_BIO object should be set on it using BIO_set_data(3). Note that the BIO will only operate correctly if it is associated with a library context constructed using OSSL_LIB_CTX_new_from_dispatch(3). To associate the BIO with a library context construct it using BIO_new_ex(3). BIO_new_from_core_bio() is a convenience function that constructs a new BIO based on BIO_s_core() and tha",
  "questions": [
    "BIO_s_core 如何用于密码数据流？",
    "BIO_s_core 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bio-s-core",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_s_core.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码数据流 · BIO_s_core（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码数据流。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BIO_s_core, BIO_new_from_core_bio - OSSL_CORE_BIO functions

## 技术正文

## NAME


BIO_s_core, BIO_new_from_core_bio - OSSL_CORE_BIO functions

## SYNOPSIS


```c
#include <openssl/bio.h>

const BIO_METHOD *BIO_s_core(void);

BIO *BIO_new_from_core_bio(OSSL_LIB_CTX *libctx, OSSL_CORE_BIO *corebio);

```

## DESCRIPTION


BIO_s_core() returns the core BIO method function.

A core BIO is treated as source/sink BIO which communicates to some external
BIO. This is primarily useful to provider authors. A number of calls from
libcrypto into a provider supply an OSSL_CORE_BIO parameter. This represents
a BIO within libcrypto, but cannot be used directly by a provider. Instead it
should be wrapped using a BIO_s_core().

Once a BIO is constructed based on BIO_s_core(), the associated OSSL_CORE_BIO
object should be set on it using BIO_set_data(3). Note that the BIO will only
operate correctly if it is associated with a library context constructed using
OSSL_LIB_CTX_new_from_dispatch(3). To associate the BIO with a library context
construct it using BIO_new_ex(3).

BIO_new_from_core_bio() is a convenience function that constructs a new BIO
based on BIO_s_core() and that is associated with the given library context. It
then also sets the OSSL_CORE_BIO object on the BIO using BIO_set_data(3).

## RETURN VALUES


BIO_s_core() return a core BIO **BIO_METHOD** structure.

BIO_new_from_core_bio() returns a BIO structure on success or NULL on failure.
A failure will most commonly be because the library context was not constructed
using OSSL_LIB_CTX_new_from_dispatch(3).

## HISTORY


BIO_s_core() and BIO_new_from_core_bio() were added in OpenSSL 3.0.

## EXAMPLES


Create a core BIO and write some data to it:

```c
int some_function(OSSL_LIB_CTX *libctx, OSSL_CORE_BIO *corebio) {
    BIO *cbio = BIO_new_from_core_bio(libctx, corebio);

    if (cbio == NULL)
        return 0;

    BIO_puts(cbio, "Hello World\n");

    BIO_free(cbio);
    return 1;
}

```

## COPYRIGHT


Copyright 2021-2022 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BIO_s_core.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_s_core.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BIO_s_core.pod`；SHA-256：`0e97965851b4e641e30186b0f9b698e7f7147b0e9b89a4075550a48489f74fcc`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
