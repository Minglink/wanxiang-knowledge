---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-keyexch-free",
  "title": "OpenSSL：EVP 密码接口 · EVP_KEYEXCH_free（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "密码接口",
    "Provider",
    "openssl",
    "EVP_KEYEXCH_free"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "f11cf624456f640d20ba1b534e4419ddd686b4350c4ff36b820ba99866b81561",
  "generatedHash": "d2bd9cc39706f297d31c8799179c9033f202b310a6558a1c9f7bf6fb999d5805",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "EVP 密码接口：EVP_KEYEXCH_fetch, EVP_KEYEXCH_free, EVP_KEYEXCH_up_ref, EVP_KEYEXCH_get0_provider, EVP_KEYEXCH_is_a, EVP_KEYEXCH_do_all_provided, EVP_KEYEXCH_names_do_all, EVP_KEYEXCH_get0_name, EVP_KEYEXCH_get0_description, EVP_KEYEXCH_gettable_ctx_params, EVP_KEYEXCH_settable_ctx_params - Functions to manage EVP",
  "l1": "EVP_KEYEXCH_fetch() fetches the key exchange implementation for the given `algorithm` from any provider offering it, within the criteria given by the `properties`. See crypto(7)/ALGORITHM FETCHING for further information. The returned value must eventually be freed with EVP_KEYEXCH_free(). EVP_KEYEXCH_free() decrements the reference count for the **EVP_KEYEXCH** structure. Typically this structure will have been obtained from an earlier call to EVP_KEYEXCH_fetch(). If the reference count drops to 0 then the structure is freed. If the argument is NULL, nothing is done. EVP_KEYEXCH_up_ref() increments the reference count for an **EVP_KEYEXCH** structure. EVP_KEYEXCH_get0_provider() returns the provider that `exchange` was fetched from. EVP_KEYEXCH_is_a() checks if `exchange` is an implementation of an algorithm that's identifiable with `nam",
  "questions": [
    "EVP_KEYEXCH_free 如何用于EVP 密码接口？",
    "EVP_KEYEXCH_free 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-keyexch-free",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_KEYEXCH_free.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：EVP 密码接口 · EVP_KEYEXCH_free（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：EVP 密码接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_KEYEXCH_fetch, EVP_KEYEXCH_free, EVP_KEYEXCH_up_ref,
EVP_KEYEXCH_get0_provider, EVP_KEYEXCH_is_a, EVP_KEYEXCH_do_all_provided,
EVP_KEYEXCH_names_do_all, EVP_KEYEXCH_get0_name, EVP_KEYEXCH_get0_description,
EVP_KEYEXCH_gettable_ctx_params, EVP_KEYEXCH_settable_ctx_params
- Functions to manage EVP_KEYEXCH algorithm objects

## 技术正文

## NAME


EVP_KEYEXCH_fetch, EVP_KEYEXCH_free, EVP_KEYEXCH_up_ref,
EVP_KEYEXCH_get0_provider, EVP_KEYEXCH_is_a, EVP_KEYEXCH_do_all_provided,
EVP_KEYEXCH_names_do_all, EVP_KEYEXCH_get0_name, EVP_KEYEXCH_get0_description,
EVP_KEYEXCH_gettable_ctx_params, EVP_KEYEXCH_settable_ctx_params
- Functions to manage EVP_KEYEXCH algorithm objects

## SYNOPSIS


```c
#include <openssl/evp.h>

EVP_KEYEXCH *EVP_KEYEXCH_fetch(OSSL_LIB_CTX *ctx, const char *algorithm,
                               const char *properties);
void EVP_KEYEXCH_free(EVP_KEYEXCH *exchange);
int EVP_KEYEXCH_up_ref(EVP_KEYEXCH *exchange);
OSSL_PROVIDER *EVP_KEYEXCH_get0_provider(const EVP_KEYEXCH *exchange);
int EVP_KEYEXCH_is_a(const EVP_KEYEXCH *exchange, const char *name);
const char *EVP_KEYEXCH_get0_name(const EVP_KEYEXCH *exchange);
void EVP_KEYEXCH_do_all_provided(OSSL_LIB_CTX *libctx,
                                 void (*fn)(EVP_KEYEXCH *exchange, void *arg),
                                 void *arg);
int EVP_KEYEXCH_names_do_all(const EVP_KEYEXCH *exchange,
                             void (*fn)(const char *name, void *data),
                             void *data);
const char *EVP_KEYEXCH_get0_description(const EVP_KEYEXCH *keyexch);
const OSSL_PARAM *EVP_KEYEXCH_gettable_ctx_params(const EVP_KEYEXCH *keyexch);
const OSSL_PARAM *EVP_KEYEXCH_settable_ctx_params(const EVP_KEYEXCH *keyexch);

```

## DESCRIPTION


EVP_KEYEXCH_fetch() fetches the key exchange implementation for the given
`algorithm` from any provider offering it, within the criteria given
by the `properties`.
See crypto(7)/ALGORITHM FETCHING for further information.

The returned value must eventually be freed with EVP_KEYEXCH_free().

EVP_KEYEXCH_free() decrements the reference count for the **EVP_KEYEXCH**
structure. Typically this structure will have been obtained from an earlier call
to EVP_KEYEXCH_fetch(). If the reference count drops to 0 then the
structure is freed. If the argument is NULL, nothing is done.

EVP_KEYEXCH_up_ref() increments the reference count for an **EVP_KEYEXCH**
structure.

EVP_KEYEXCH_get0_provider() returns the provider that `exchange` was
fetched from.

EVP_KEYEXCH_is_a() checks if `exchange` is an implementation of an
algorithm that's identifiable with `name`.

EVP_KEYEXCH_get0_name() returns the algorithm name from the provided
implementation for the given `exchange`. Note that the `exchange` may have
multiple synonyms associated with it. In this case the first name from the
algorithm definition is returned. Ownership of the returned string is retained
by the `exchange` object and should not be freed by the caller.

EVP_KEYEXCH_names_do_all() traverses all names for the `exchange`, and
calls `fn` with each name and `data`.

EVP_KEYEXCH_get0_description() returns a description of the `keyexch`, meant
for display and human consumption.  The description is at the discretion of
the `keyexch` implementation.

EVP_KEYEXCH_do_all_provided() traverses all key exchange implementations by
all activated providers in the library context `libctx`, and for each
of the implementations, calls `fn` with the implementation method and
`data` as arguments.

EVP_KEYEXCH_gettable_ctx_params() and EVP_KEYEXCH_settable_ctx_params() return
a constant OSSL_PARAM(3) array that describes the names and types of key
parameters that can be retrieved or set by a key exchange algorithm using
EVP_PKEY_CTX_get_params(3) and EVP_PKEY_CTX_set_params(3).

## RETURN VALUES


EVP_KEYEXCH_fetch() returns a pointer to a **EVP_KEYEXCH** for success
or NULL for failure.

EVP_KEYEXCH_up_ref() returns 1 for success or 0 otherwise.

EVP_KEYEXCH_names_do_all() returns 1 if the callback was called for all
names. A return value of 0 means that the callback was not called for any names.

EVP_KEYEXCH_is_a() returns 1 of `exchange` was identifiable,
otherwise 0.

EVP_KEYEXCH_gettable_ctx_params() and EVP_KEYEXCH_settable_ctx_params() return
a constant OSSL_PARAM(3) array or NULL on error.

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

- 上游：[doc/man3/EVP_KEYEXCH_free.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_KEYEXCH_free.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_KEYEXCH_free.pod`；SHA-256：`f11cf624456f640d20ba1b534e4419ddd686b4350c4ff36b820ba99866b81561`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
