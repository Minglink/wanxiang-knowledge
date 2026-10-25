---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-skeymgmt",
  "title": "OpenSSL：EVP 密码接口 · EVP_SKEYMGMT（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "密码接口",
    "Provider",
    "openssl",
    "EVP_SKEYMGMT"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "32780f501dd79c31ba5d3146a0f1b0d3b067e56e798751ebd4603afbc6672c9f",
  "generatedHash": "6d823ecc0378e662e67c0f07a17175ba1db5edf9f448540483851e54aa63bbf2",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "EVP 密码接口：EVP_SKEYMGMT, EVP_SKEYMGMT_fetch, EVP_SKEYMGMT_up_ref, EVP_SKEYMGMT_free, EVP_SKEYMGMT_get0_provider, EVP_SKEYMGMT_is_a, EVP_SKEYMGMT_get0_description, EVP_SKEYMGMT_get0_name, EVP_SKEYMGMT_do_all_provided, EVP_SKEYMGMT_names_do_all, EVP_SKEYMGMT_get0_gen_settable_params, EVP_SKEYMGMT_get0_imp_settab",
  "l1": "**EVP_SKEYMGMT** is a method object that represents symmetric key management implementations for different cryptographic algorithms. This method object provides functionality to allow providers to import key material from the outside, as well as export key material to the outside. Most of the functionality can only be used internally and has no public interface, this opaque object is simply passed into other functions when needed. EVP_SKEYMGMT_fetch() looks for an algorithm within a provider that has been loaded into the **OSSL_LIB_CTX** given by `ctx`, having the name given by `algorithm` and the properties given by `properties`. EVP_SKEYMGMT_up_ref() increments the reference count for the given **EVP_SKEYMGMT** `skeymgmt`. EVP_SKEYMGMT_free() decrements the reference count for the given **EVP_SKEYMGMT** `skeymgmt`, and when the count re",
  "questions": [
    "EVP_SKEYMGMT 如何用于EVP 密码接口？",
    "EVP_SKEYMGMT 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-skeymgmt",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_SKEYMGMT.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：EVP 密码接口 · EVP_SKEYMGMT（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：EVP 密码接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_SKEYMGMT,
EVP_SKEYMGMT_fetch,
EVP_SKEYMGMT_up_ref,
EVP_SKEYMGMT_free,
EVP_SKEYMGMT_get0_provider,
EVP_SKEYMGMT_is_a,
EVP_SKEYMGMT_get0_description,
EVP_SKEYMGMT_get0_name,
EVP_SKEYMGMT_do_all_provided,
EVP_SKEYMGMT_names_do_all,
EVP_SKEYMGMT_get0_gen_settable_params,
EVP_SKEYMGMT_get0_imp_settable_params
- EVP key management routines for opaque symmetric keys

## 技术正文

## NAME


EVP_SKEYMGMT,
EVP_SKEYMGMT_fetch,
EVP_SKEYMGMT_up_ref,
EVP_SKEYMGMT_free,
EVP_SKEYMGMT_get0_provider,
EVP_SKEYMGMT_is_a,
EVP_SKEYMGMT_get0_description,
EVP_SKEYMGMT_get0_name,
EVP_SKEYMGMT_do_all_provided,
EVP_SKEYMGMT_names_do_all,
EVP_SKEYMGMT_get0_gen_settable_params,
EVP_SKEYMGMT_get0_imp_settable_params
- EVP key management routines for opaque symmetric keys

## SYNOPSIS


```c
#include <openssl/evp.h>

typedef struct evp_sskeymgmt_st EVP_SKEYMGMT;

EVP_SKEYMGMT *EVP_SKEYMGMT_fetch(OSSL_LIB_CTX *ctx, const char *algorithm,
                                 const char *properties);
int EVP_SKEYMGMT_up_ref(EVP_SKEYMGMT *skeymgmt);
void EVP_SKEYMGMT_free(EVP_SKEYMGMT *skeymgmt);
const OSSL_PROVIDER *EVP_SKEYMGMT_get0_provider(const EVP_SKEYMGMT *skeymgmt);
int EVP_SKEYMGMT_is_a(const EVP_SKEYMGMT *skeymgmt, const char *name);
const char *EVP_SKEYMGMT_get0_name(const EVP_SKEYMGMT *skeymgmt);
const char *EVP_SKEYMGMT_get0_description(const EVP_SKEYMGMT *skeymgmt);

void EVP_SKEYMGMT_do_all_provided(OSSL_LIB_CTX *libctx,
                                  void (*fn)(EVP_SKEYMGMT *skeymgmt, void *arg),
                                  void *arg);
int EVP_SKEYMGMT_names_do_all(const EVP_SKEYMGMT *skeymgmt,
                              void (*fn)(const char *name, void *data),
                              void *data);
const OSSL_PARAM *EVP_SKEYMGMT_get0_gen_settable_params(const EVP_SKEYMGMT *skeymgmt);
const OSSL_PARAM *EVP_SKEYMGMT_get0_imp_settable_params(const EVP_SKEYMGMT *skeymgmt);

```

## DESCRIPTION


**EVP_SKEYMGMT** is a method object that represents symmetric key management
implementations for different cryptographic algorithms.  This method object
provides functionality to allow providers to import key material from the
outside, as well as export key material to the outside.

Most of the functionality can only be used internally and has no public
interface, this opaque object is simply passed into other functions when
needed.

EVP_SKEYMGMT_fetch() looks for an algorithm within a provider that
has been loaded into the **OSSL_LIB_CTX** given by `ctx`, having the
name given by `algorithm` and the properties given by `properties`.

EVP_SKEYMGMT_up_ref() increments the reference count for the given
**EVP_SKEYMGMT** `skeymgmt`.

EVP_SKEYMGMT_free() decrements the reference count for the given
**EVP_SKEYMGMT** `skeymgmt`, and when the count reaches zero, frees it.
If the argument is NULL, nothing is done.

EVP_SKEYMGMT_get0_provider() returns the provider that has this particular
implementation.

EVP_SKEYMGMT_is_a() checks if `skeymgmt` is an implementation of an
algorithm that's identified by `name`.

EVP_SKEYMGMT_get0_name() returns the algorithm name from the provided
implementation for the given `skeymgmt`. Note that the `skeymgmt` may have
multiple synonyms associated with it. In this case the first name from the
algorithm definition is returned. Ownership of the returned string is
retained by the `skeymgmt` object and should not be freed by the caller.

EVP_SKEYMGMT_names_do_all() traverses all names for the `skeymgmt`, and
calls `fn` with each name and `data`.

EVP_SKEYMGMT_get0_description() returns a description of the `skeymgmt`, meant
for display and human consumption.  The description is at the discretion
of the `skeymgmt` implementation.

EVP_SKEYMGMT_do_all_provided() traverses all key `skeymgmt` implementations by
all activated providers in the library context `libctx`, and for each
of the implementations, calls `fn` with the implementation method and
`data` as arguments.

EVP_SKEYMGMT_get0_gen_settable_params() and EVP_SKEYMGMT_get0_imp_settable_params()
get a constant OSSL_PARAM(3) array that describes the settable parameters
that can be used with EVP_SKEY_generate() and EVP_SKEY_import() correspondingly.

## NOTES


EVP_SKEYMGMT_fetch() may be called implicitly by other fetching
functions, using the same library context and properties.
Any other API that uses symmetric keys will typically do this.

## RETURN VALUES


EVP_SKEYMGMT_fetch() returns a pointer to the key management
implementation represented by an EVP_SKEYMGMT object, or NULL on
error.

EVP_SKEYMGMT_up_ref() returns 1 on success, or 0 on error.

EVP_SKEYMGMT_names_do_all() returns 1 if the callback was called for all
names. A return value of 0 means that the callback was not called for any names.

EVP_SKEYMGMT_free() doesn't return any value.

EVP_SKEYMGMT_get0_provider() returns a pointer to a provider object, or NULL
on error.

EVP_SKEYMGMT_is_a() returns 1 if `skeymgmt` was identifiable, otherwise 0.

EVP_SKEYMGMT_get0_name() returns the algorithm name, or NULL on error.

EVP_SKEYMGMT_get0_description() returns a pointer to a description, or NULL if
there isn't one.

## SEE ALSO


EVP_SKEY(3), EVP_MD_fetch(3), OSSL_LIB_CTX(3)

## HISTORY


**EVP_SKEYMGMT** structure and functions
EVP_SKEYMGMT_fetch(),
EVP_SKEYMGMT_up_ref(),
EVP_SKEYMGMT_free(),
EVP_SKEYMGMT_get0_provider(),
EVP_SKEYMGMT_is_a(),
EVP_SKEYMGMT_get0_description(),
EVP_SKEYMGMT_get0_name(),
EVP_SKEYMGMT_do_all_provided(),
EVP_SKEYMGMT_names_do_all(),
EVP_SKEYMGMT_get0_gen_settable_params(),
EVP_SKEYMGMT_get0_imp_settable_params()
were added in OpenSSL 3.5.

## COPYRIGHT


Copyright 2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_SKEYMGMT.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_SKEYMGMT.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_SKEYMGMT.pod`；SHA-256：`32780f501dd79c31ba5d3146a0f1b0d3b067e56e798751ebd4603afbc6672c9f`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
