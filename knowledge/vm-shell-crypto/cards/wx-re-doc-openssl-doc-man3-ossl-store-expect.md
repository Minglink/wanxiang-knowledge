---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-store-expect",
  "title": "OpenSSL：密码实现与接口 · OSSL_STORE_expect（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_STORE_expect"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "991ac18942ab3b2cc286c98db093b372e86c8df1eacb40cf5e7f749c6e516e4e",
  "generatedHash": "4f00ac064a926f4c6dd64fb19348db1ca00b45d5b2817d5bbd7f075bb9af5bf9",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_STORE_expect, OSSL_STORE_supports_search, OSSL_STORE_find - Specify what object type is expected",
  "l1": "OSSL_STORE_expect() helps applications filter what OSSL_STORE_load() returns by specifying a **OSSL_STORE_INFO** type. By default, no expectations on the types of objects to be loaded are made. `expected_type` may be 0 to indicate explicitly that no expectation is made, or it may be any of the known object types (see OSSL_STORE_INFO(3)/SUPPORTED OBJECTS) except for **OSSL_STORE_INFO_NAME**. For example, if `file:/foo/bar/store.pem` contains several objects of different type and only certificates are interesting, the application can simply say that it expects the type **OSSL_STORE_INFO_CERT**. OSSL_STORE_find() helps applications specify a criterion for a more fine grained search of objects. OSSL_STORE_supports_search() checks if the loader of the given OSSL_STORE context supports the given search type. See OSSL_STORE_SEARCH(3)/SUPPORTED C",
  "questions": [
    "OSSL_STORE_expect 如何用于密码实现与接口？",
    "OSSL_STORE_expect 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-store-expect",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_STORE_expect.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_STORE_expect（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_STORE_expect,
OSSL_STORE_supports_search,
OSSL_STORE_find
- Specify what object type is expected

## 技术正文

## NAME


OSSL_STORE_expect,
OSSL_STORE_supports_search,
OSSL_STORE_find
- Specify what object type is expected

## SYNOPSIS


```c
#include <openssl/store.h>

int OSSL_STORE_expect(OSSL_STORE_CTX *ctx, int expected_type);

int OSSL_STORE_supports_search(OSSL_STORE_CTX *ctx, int criterion_type);

int OSSL_STORE_find(OSSL_STORE_CTX *ctx, OSSL_STORE_SEARCH *search);

```

## DESCRIPTION


OSSL_STORE_expect() helps applications filter what OSSL_STORE_load() returns
by specifying a **OSSL_STORE_INFO** type.
By default, no expectations on the types of objects to be loaded are made.
`expected_type` may be 0 to indicate explicitly that no expectation is made,
or it may be any of the known object types (see
OSSL_STORE_INFO(3)/SUPPORTED OBJECTS) except for **OSSL_STORE_INFO_NAME**.
For example, if `file:/foo/bar/store.pem` contains several objects of different
type and only certificates are interesting, the application can simply say
that it expects the type **OSSL_STORE_INFO_CERT**.

OSSL_STORE_find() helps applications specify a criterion for a more fine
grained search of objects.

OSSL_STORE_supports_search() checks if the loader of the given OSSL_STORE
context supports the given search type.
See OSSL_STORE_SEARCH(3)/SUPPORTED CRITERION TYPES for information on the
supported search criterion types.

OSSL_STORE_expect() and OSSL_STORE_find `must` be called before the first
OSSL_STORE_load() of a given session, or they will fail.

## NOTES


If a more elaborate filter is required by the application, a better choice
would be to use a post-processing function.
See OSSL_STORE_open(3) for more information.

However, some loaders may take advantage of the knowledge of an expected type
to make object retrieval more efficient, so if a single type is expected, this
method is usually preferable.

## RETURN VALUES


OSSL_STORE_expect() returns 1 on success, or 0 on failure.

OSSL_STORE_supports_search() returns 1 if the criterion is supported, or 0
otherwise.

OSSL_STORE_find() returns 1 on success, or 0 on failure.

## SEE ALSO


ossl_store(7), OSSL_STORE_INFO(3), OSSL_STORE_SEARCH(3),
OSSL_STORE_load(3)

## HISTORY


OSSL_STORE_expect(), OSSL_STORE_supports_search() and OSSL_STORE_find()
were added in OpenSSL 1.1.1.

## COPYRIGHT


Copyright 2018-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_STORE_expect.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_STORE_expect.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_STORE_expect.pod`；SHA-256：`991ac18942ab3b2cc286c98db093b372e86c8df1eacb40cf5e7f749c6e516e4e`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
