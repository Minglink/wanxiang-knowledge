---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-signature",
  "title": "OpenSSL：EVP 密码接口 · EVP_SIGNATURE（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "密码接口",
    "Provider",
    "openssl",
    "EVP_SIGNATURE"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "845745c3afe31dfc49db918e9fe52b26584f5c759e7b743b262c3410d8e76dc4",
  "generatedHash": "c0b361eaa0cdc41c75c7683fc98a85b9c26bb18b1bf13add92419f098fe4e7ba",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "EVP 密码接口：EVP_SIGNATURE, EVP_SIGNATURE_fetch, EVP_SIGNATURE_free, EVP_SIGNATURE_up_ref, EVP_SIGNATURE_is_a, EVP_SIGNATURE_get0_provider, EVP_SIGNATURE_do_all_provided, EVP_SIGNATURE_names_do_all, EVP_SIGNATURE_get0_name, EVP_SIGNATURE_get0_description, EVP_SIGNATURE_gettable_ctx_params, EVP_SIGNATURE_settable",
  "l1": "EVP_SIGNATURE_fetch() fetches the implementation for the given **algorithm** from any provider offering it, within the criteria given by the **properties**. The algorithm will be one offering functions for performing signature related tasks such as signing and verifying. See crypto(7)/ALGORITHM FETCHING for further information. The returned value must eventually be freed with EVP_SIGNATURE_free(). EVP_SIGNATURE_free() decrements the reference count for the **EVP_SIGNATURE** structure. Typically this structure will have been obtained from an earlier call to EVP_SIGNATURE_fetch(). If the reference count drops to 0 then the structure is freed. If the argument is NULL, nothing is done. EVP_SIGNATURE_up_ref() increments the reference count for an **EVP_SIGNATURE** structure. EVP_SIGNATURE_is_a() returns 1 if `signature` is an implementation of",
  "questions": [
    "EVP_SIGNATURE 如何用于EVP 密码接口？",
    "EVP_SIGNATURE 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-signature",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_SIGNATURE.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：EVP 密码接口 · EVP_SIGNATURE（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：EVP 密码接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_SIGNATURE,
EVP_SIGNATURE_fetch, EVP_SIGNATURE_free, EVP_SIGNATURE_up_ref,
EVP_SIGNATURE_is_a, EVP_SIGNATURE_get0_provider,
EVP_SIGNATURE_do_all_provided, EVP_SIGNATURE_names_do_all,
EVP_SIGNATURE_get0_name, EVP_SIGNATURE_get0_description,
EVP_SIGNATURE_gettable_ctx_params, EVP_SIGNATURE_settable_ctx_params
- Functions to manage EVP_SIGNATURE algorithm objects

## 技术正文

## NAME


EVP_SIGNATURE,
EVP_SIGNATURE_fetch, EVP_SIGNATURE_free, EVP_SIGNATURE_up_ref,
EVP_SIGNATURE_is_a, EVP_SIGNATURE_get0_provider,
EVP_SIGNATURE_do_all_provided, EVP_SIGNATURE_names_do_all,
EVP_SIGNATURE_get0_name, EVP_SIGNATURE_get0_description,
EVP_SIGNATURE_gettable_ctx_params, EVP_SIGNATURE_settable_ctx_params
- Functions to manage EVP_SIGNATURE algorithm objects

## SYNOPSIS


```c
#include <openssl/evp.h>

typedef struct evp_signature_st EVP_SIGNATURE;

EVP_SIGNATURE *EVP_SIGNATURE_fetch(OSSL_LIB_CTX *ctx, const char *algorithm,
                                   const char *properties);
void EVP_SIGNATURE_free(EVP_SIGNATURE *signature);
int EVP_SIGNATURE_up_ref(EVP_SIGNATURE *signature);
const char *EVP_SIGNATURE_get0_name(const EVP_SIGNATURE *signature);
int EVP_SIGNATURE_is_a(const EVP_SIGNATURE *signature, const char *name);
OSSL_PROVIDER *EVP_SIGNATURE_get0_provider(const EVP_SIGNATURE *signature);
void EVP_SIGNATURE_do_all_provided(OSSL_LIB_CTX *libctx,
                                   void (*fn)(EVP_SIGNATURE *signature,
                                              void *arg),
                                   void *arg);
int EVP_SIGNATURE_names_do_all(const EVP_SIGNATURE *signature,
                               void (*fn)(const char *name, void *data),
                               void *data);
const char *EVP_SIGNATURE_get0_name(const EVP_SIGNATURE *signature);
const char *EVP_SIGNATURE_get0_description(const EVP_SIGNATURE *signature);
const OSSL_PARAM *EVP_SIGNATURE_gettable_ctx_params(const EVP_SIGNATURE *sig);
const OSSL_PARAM *EVP_SIGNATURE_settable_ctx_params(const EVP_SIGNATURE *sig);

```

## DESCRIPTION


EVP_SIGNATURE_fetch() fetches the implementation for the given
**algorithm** from any provider offering it, within the criteria given
by the **properties**.
The algorithm will be one offering functions for performing signature related
tasks such as signing and verifying.
See crypto(7)/ALGORITHM FETCHING for further information.

The returned value must eventually be freed with EVP_SIGNATURE_free().

EVP_SIGNATURE_free() decrements the reference count for the **EVP_SIGNATURE**
structure. Typically this structure will have been obtained from an earlier call
to EVP_SIGNATURE_fetch(). If the reference count drops to 0 then the
structure is freed. If the argument is NULL, nothing is done.

EVP_SIGNATURE_up_ref() increments the reference count for an **EVP_SIGNATURE**
structure.

EVP_SIGNATURE_is_a() returns 1 if `signature` is an implementation of an
algorithm that's identifiable with `name`, otherwise 0.

EVP_SIGNATURE_get0_provider() returns the provider that `signature` was
fetched from.

EVP_SIGNATURE_do_all_provided() traverses all SIGNATURE implemented by all
activated providers in the given library context `libctx`, and for each of the
implementations, calls the given function `fn` with the implementation method
and the given `arg` as argument.

EVP_SIGNATURE_get0_name() returns the algorithm name from the provided
implementation for the given `signature`. Note that the `signature` may have
multiple synonyms associated with it. In this case the first name from the
algorithm definition is returned. Ownership of the returned string is retained
by the `signature` object and should not be freed by the caller.

EVP_SIGNATURE_names_do_all() traverses all names for `signature`, and calls
`fn` with each name and `data`.

EVP_SIGNATURE_get0_description() returns a description of the `signature`,
meant for display and human consumption.  The description is at the
discretion of the `signature` implementation.

EVP_SIGNATURE_gettable_ctx_params() and EVP_SIGNATURE_settable_ctx_params()
return a constant OSSL_PARAM(3) array that describes the names and types of key
parameters that can be retrieved or set by a signature algorithm using
EVP_PKEY_CTX_get_params(3) and EVP_PKEY_CTX_set_params(3).

## RETURN VALUES


EVP_SIGNATURE_fetch() returns a pointer to an **EVP_SIGNATURE** for success
or **NULL** for failure.

EVP_SIGNATURE_up_ref() returns 1 for success or 0 otherwise.

EVP_SIGNATURE_names_do_all() returns 1 if the callback was called for all names.
A return value of 0 means that the callback was not called for any names.

EVP_SIGNATURE_gettable_ctx_params() and EVP_SIGNATURE_settable_ctx_params()
return a constant OSSL_PARAM(3) array or NULL on error.

## SEE ALSO


crypto(7)/ALGORITHM FETCHING, OSSL_PROVIDER(3)

## HISTORY


The functions described here were added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2019-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_SIGNATURE.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_SIGNATURE.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_SIGNATURE.pod`；SHA-256：`845745c3afe31dfc49db918e9fe52b26584f5c759e7b743b262c3410d8e76dc4`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
