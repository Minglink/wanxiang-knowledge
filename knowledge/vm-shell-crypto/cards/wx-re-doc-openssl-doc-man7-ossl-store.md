---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-ossl-store",
  "title": "OpenSSL：密码实现与接口 · ossl_store（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "ossl_store"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "6c596db362625067deb55d4fd99687055088d3dcf71f7c529632a07f2537c029",
  "generatedHash": "625c21648fd6e0f8f329907ac19bafd07e53bb0fdf005ad9e3c121394eb435a6",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：ossl_store - Store retrieval functions",
  "l1": " A STORE is a layer of functionality to retrieve a number of supported objects from a repository of any kind, addressable as a filename or as a URI. The functionality supports the pattern \"open a channel to the repository\", \"loop and retrieve one object at a time\", and \"finish up by closing the channel\". The retrieved objects are returned as a wrapper type **OSSL_STORE_INFO**, from which an OpenSSL type can be retrieved. Support for a URI scheme is called a STORE \"loader\", and can be added dynamically from the calling application or from a loadable engine. Support for the 'file' scheme is built into `libcrypto`. See ossl_store-file(7) for more information. The **OSS_STORE** API does nothing to enforce any specific format or encoding on the pass phrase that the **UI_METHOD** provides. However, the pass phrase is expected to be UTF-8 encode",
  "questions": [
    "ossl_store 如何用于密码实现与接口？",
    "ossl_store 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-ossl-store",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/ossl_store.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · ossl_store（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

ossl_store - Store retrieval functions

## 技术正文

## NAME


ossl_store - Store retrieval functions

## SYNOPSIS



#include <openssl/store.h>

## DESCRIPTION


### General


A STORE is a layer of functionality to retrieve a number of supported
objects from a repository of any kind, addressable as a filename or
as a URI.

The functionality supports the pattern "open a channel to the
repository", "loop and retrieve one object at a time", and "finish up
by closing the channel".

The retrieved objects are returned as a wrapper type **OSSL_STORE_INFO**,
from which an OpenSSL type can be retrieved.

### URI schemes and loaders


Support for a URI scheme is called a STORE "loader", and can be added
dynamically from the calling application or from a loadable engine.

Support for the 'file' scheme is built into `libcrypto`.
See ossl_store-file(7) for more information.

### UI_METHOD and pass phrases


The **OSS_STORE** API does nothing to enforce any specific format or
encoding on the pass phrase that the **UI_METHOD** provides.  However,
the pass phrase is expected to be UTF-8 encoded.  The result of any
other encoding is undefined.

## EXAMPLES


### A generic call


```c
#include <openssl/ui.h> /* for UI_get_default_method */
#include <openssl/store.h>

OSSL_STORE_CTX *ctx = OSSL_STORE_open("file:/foo/bar/data.pem",
                       UI_get_default_method(), NULL, NULL, NULL);

/*
 * OSSL_STORE_eof() simulates file semantics for any repository to signal
 * that no more data can be expected
 */
while (!OSSL_STORE_eof(ctx)) {
    OSSL_STORE_INFO *info = OSSL_STORE_load(ctx);

    /*
     * Do whatever is necessary with the OSSL_STORE_INFO,
     * here just one example
     */
    switch (OSSL_STORE_INFO_get_type(info)) {
    case OSSL_STORE_INFO_CERT:
        /* Print the X.509 certificate text */
        X509_print_fp(stdout, OSSL_STORE_INFO_get0_CERT(info));
        /* Print the X.509 certificate PEM output */
        PEM_write_X509(stdout, OSSL_STORE_INFO_get0_CERT(info));
        break;
    }
    OSSL_STORE_INFO_free(info);
}

OSSL_STORE_close(ctx);

```

## SEE ALSO


OSSL_STORE_INFO(3), OSSL_STORE_LOADER(3),
OSSL_STORE_open(3), OSSL_STORE_expect(3),
OSSL_STORE_SEARCH(3)

## COPYRIGHT


Copyright 2016-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/ossl_store.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/ossl_store.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/ossl_store.pod`；SHA-256：`6c596db362625067deb55d4fd99687055088d3dcf71f7c529632a07f2537c029`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
