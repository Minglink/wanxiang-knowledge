---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-set-default-properties",
  "title": "OpenSSL：EVP 密码接口 · EVP_set_default_properties（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "密码接口",
    "Provider",
    "openssl",
    "EVP_set_default_properties"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "b614abfa3d456969150842956317efd3a50f1713905fd14b605af02f7604f248",
  "generatedHash": "6229e12428bd1248d26128e4a06f1be7804990c26b03e8b0ef4037cfc79959e8",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "EVP 密码接口：EVP_set_default_properties, EVP_default_properties_enable_fips, EVP_default_properties_is_fips_enabled, EVP_get1_default_properties - manage default properties for future algorithm fetches",
  "l1": "EVP_set_default_properties() sets the default properties for all future EVP algorithm fetches, implicit as well as explicit. See crypto(7)/ALGORITHM FETCHING for information about implicit and explicit fetching. EVP_set_default_properties stores the properties given with the string `propq` among the EVP data that's been stored in the library context given with `libctx` (NULL signifies the default library context). Any previous default property for the specified library context will be dropped. EVP_get1_default_properties() gets the default properties set for all future EVP algorithm fetches, implicit as well as explicit, for the specific library context. EVP_default_properties_enable_fips() sets the 'fips=yes' to be a default property if `enable` is non zero, otherwise it clears 'fips' from the default property query for the given `libctx",
  "questions": [
    "EVP_set_default_properties 如何用于EVP 密码接口？",
    "EVP_set_default_properties 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-set-default-properties",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_set_default_properties.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：EVP 密码接口 · EVP_set_default_properties（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：EVP 密码接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_set_default_properties, EVP_default_properties_enable_fips,
EVP_default_properties_is_fips_enabled, EVP_get1_default_properties
- manage default properties for future algorithm fetches

## 技术正文

## NAME


EVP_set_default_properties, EVP_default_properties_enable_fips,
EVP_default_properties_is_fips_enabled, EVP_get1_default_properties
- manage default properties for future algorithm fetches

## SYNOPSIS


```c
#include <openssl/evp.h>

int EVP_set_default_properties(OSSL_LIB_CTX *libctx, const char *propq);
char *EVP_get1_default_properties(OSSL_LIB_CTX *libctx);
int EVP_default_properties_enable_fips(OSSL_LIB_CTX *libctx, int enable);
int EVP_default_properties_is_fips_enabled(OSSL_LIB_CTX *libctx);

```

## DESCRIPTION


EVP_set_default_properties() sets the default properties for all
future EVP algorithm fetches, implicit as well as explicit. See
crypto(7)/ALGORITHM FETCHING for information about implicit and explicit
fetching.

EVP_set_default_properties stores the properties given with the string
`propq` among the EVP data that's been stored in the library context
given with `libctx` (NULL signifies the default library context).

Any previous default property for the specified library context will
be dropped.

EVP_get1_default_properties() gets the default properties set for all future EVP
algorithm fetches, implicit as well as explicit, for the specific library
context.

EVP_default_properties_enable_fips() sets the 'fips=yes' to be a default property
if `enable` is non zero, otherwise it clears 'fips' from the default property
query for the given `libctx`. It merges the fips default property query with any
existing query strings that have been set via EVP_set_default_properties().

EVP_default_properties_is_fips_enabled() indicates if 'fips=yes' is a default
property for the given `libctx`.

## NOTES


EVP_set_default_properties() and  EVP_default_properties_enable_fips() are not
thread safe. They are intended to be called only during the initialisation
phase of a `libctx`.

EVP_get1_default_properties() is not thread safe. The application must ensure
that the context reference is valid and default fetching properties are not
being modified by a different thread.

## RETURN VALUES


EVP_set_default_properties() and  EVP_default_properties_enable_fips() return 1
on success, or 0 on failure. An error is placed on the error stack if a
failure occurs.

EVP_default_properties_is_fips_enabled() returns 1 if the 'fips=yes' default
property is set for the given `libctx`, otherwise it returns 0.

EVP_get1_default_properties() returns allocated memory that must be freed by
OPENSSL_free(3) on success and NULL on failure.

## SEE ALSO


EVP_MD_fetch(3)

## HISTORY


The functions EVP_set_default_properties(), EVP_default_properties_enable_fips(),
EVP_default_properties_is_fips_enabled() were added in OpenSSL 3.0.

The function EVP_get1_default_properties() was added in OpenSSL 3.5.


## COPYRIGHT


Copyright 2019-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_set_default_properties.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_set_default_properties.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_set_default_properties.pod`；SHA-256：`b614abfa3d456969150842956317efd3a50f1713905fd14b605af02f7604f248`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
