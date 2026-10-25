---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-keymgmt",
  "title": "OpenSSL：EVP 密码接口 · EVP_KEYMGMT（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "密码接口",
    "Provider",
    "openssl",
    "EVP_KEYMGMT"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "527f08939a9aa1d113bbb13ef36cbc86a4c7b01db077556f42f3dbcccaa924bb",
  "generatedHash": "ce268e330a90bcd230d46b218c1b8c41c91975e40391638bb4157540fcecda42",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "EVP 密码接口：EVP_KEYMGMT, EVP_KEYMGMT_fetch, EVP_KEYMGMT_up_ref, EVP_KEYMGMT_free, EVP_KEYMGMT_get0_provider, EVP_KEYMGMT_is_a, EVP_KEYMGMT_get0_description, EVP_KEYMGMT_get0_name, EVP_KEYMGMT_do_all_provided, EVP_KEYMGMT_names_do_all, EVP_KEYMGMT_gettable_params, EVP_KEYMGMT_settable_params, EVP_KEYMGMT_gen_get",
  "l1": "**EVP_KEYMGMT** is a method object that represents key management implementations for different cryptographic algorithms. This method object provides functionality to have providers import key material from the outside, as well as export key material to the outside. Most of the functionality can only be used internally and has no public interface, this object is simply passed into other functions when needed. EVP_KEYMGMT_fetch() looks for an algorithm within the provider that has been loaded into the **OSSL_LIB_CTX** given by `ctx`, having the name given by `algorithm` and the properties given by `properties`. EVP_KEYMGMT_up_ref() increments the reference count for the given **EVP_KEYMGMT** `keymgmt`. EVP_KEYMGMT_free() decrements the reference count for the given **EVP_KEYMGMT** `keymgmt`, and when the count reaches zero, frees it. If th",
  "questions": [
    "EVP_KEYMGMT 如何用于EVP 密码接口？",
    "EVP_KEYMGMT 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-keymgmt",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_KEYMGMT.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：EVP 密码接口 · EVP_KEYMGMT（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：EVP 密码接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_KEYMGMT,
EVP_KEYMGMT_fetch,
EVP_KEYMGMT_up_ref,
EVP_KEYMGMT_free,
EVP_KEYMGMT_get0_provider,
EVP_KEYMGMT_is_a,
EVP_KEYMGMT_get0_description,
EVP_KEYMGMT_get0_name,
EVP_KEYMGMT_do_all_provided,
EVP_KEYMGMT_names_do_all,
EVP_KEYMGMT_gettable_params,
EVP_KEYMGMT_settable_params,
EVP_KEYMGMT_gen_gettable_params,
EVP_KEYMGMT_gen_settable_params
- EVP key management routines

## 技术正文

## NAME


EVP_KEYMGMT,
EVP_KEYMGMT_fetch,
EVP_KEYMGMT_up_ref,
EVP_KEYMGMT_free,
EVP_KEYMGMT_get0_provider,
EVP_KEYMGMT_is_a,
EVP_KEYMGMT_get0_description,
EVP_KEYMGMT_get0_name,
EVP_KEYMGMT_do_all_provided,
EVP_KEYMGMT_names_do_all,
EVP_KEYMGMT_gettable_params,
EVP_KEYMGMT_settable_params,
EVP_KEYMGMT_gen_gettable_params,
EVP_KEYMGMT_gen_settable_params
- EVP key management routines

## SYNOPSIS


```c
#include <openssl/evp.h>

typedef struct evp_keymgmt_st EVP_KEYMGMT;

EVP_KEYMGMT *EVP_KEYMGMT_fetch(OSSL_LIB_CTX *ctx, const char *algorithm,
                               const char *properties);
int EVP_KEYMGMT_up_ref(EVP_KEYMGMT *keymgmt);
void EVP_KEYMGMT_free(EVP_KEYMGMT *keymgmt);
const OSSL_PROVIDER *EVP_KEYMGMT_get0_provider(const EVP_KEYMGMT *keymgmt);
int EVP_KEYMGMT_is_a(const EVP_KEYMGMT *keymgmt, const char *name);
const char *EVP_KEYMGMT_get0_name(const EVP_KEYMGMT *keymgmt);
const char *EVP_KEYMGMT_get0_description(const EVP_KEYMGMT *keymgmt);

void EVP_KEYMGMT_do_all_provided(OSSL_LIB_CTX *libctx,
                                 void (*fn)(EVP_KEYMGMT *keymgmt, void *arg),
                                 void *arg);
int EVP_KEYMGMT_names_do_all(const EVP_KEYMGMT *keymgmt,
                             void (*fn)(const char *name, void *data),
                             void *data);
const OSSL_PARAM *EVP_KEYMGMT_gettable_params(const EVP_KEYMGMT *keymgmt);
const OSSL_PARAM *EVP_KEYMGMT_settable_params(const EVP_KEYMGMT *keymgmt);
const OSSL_PARAM *EVP_KEYMGMT_gen_settable_params(const EVP_KEYMGMT *keymgmt);
const OSSL_PARAM *EVP_KEYMGMT_gen_gettable_params(const EVP_KEYMGMT *keymgmt);

```

## DESCRIPTION


**EVP_KEYMGMT** is a method object that represents key management
implementations for different cryptographic algorithms.
This method object provides functionality to have providers import key
material from the outside, as well as export key material to the
outside.
Most of the functionality can only be used internally and has no
public interface, this object is simply passed into other functions
when needed.

EVP_KEYMGMT_fetch() looks for an algorithm within the provider that
has been loaded into the **OSSL_LIB_CTX** given by `ctx`, having the
name given by `algorithm` and the properties given by `properties`.

EVP_KEYMGMT_up_ref() increments the reference count for the given
**EVP_KEYMGMT** `keymgmt`.

EVP_KEYMGMT_free() decrements the reference count for the given
**EVP_KEYMGMT** `keymgmt`, and when the count reaches zero, frees it.
If the argument is NULL, nothing is done.

EVP_KEYMGMT_get0_provider() returns the provider that has this particular
implementation.

EVP_KEYMGMT_is_a() checks if `keymgmt` is an implementation of an
algorithm that's identifiable with `name`.

EVP_KEYMGMT_get0_name() returns the algorithm name from the provided
implementation for the given `keymgmt`. Note that the `keymgmt` may have
multiple synonyms associated with it. In this case the first name from the
algorithm definition is returned. Ownership of the returned string is
retained by the `keymgmt` object and should not be freed by the caller.

EVP_KEYMGMT_names_do_all() traverses all names for the `keymgmt`, and
calls `fn` with each name and `data`.

EVP_KEYMGMT_get0_description() returns a description of the `keymgmt`, meant
for display and human consumption.  The description is at the discretion
of the `keymgmt` implementation.

EVP_KEYMGMT_do_all_provided() traverses all key keymgmt implementations by
all activated providers in the library context `libctx`, and for each
of the implementations, calls `fn` with the implementation method and
`data` as arguments.

EVP_KEYMGMT_gettable_params() and EVP_KEYMGMT_settable_params() return a
constant OSSL_PARAM(3) array that describes the names and types of key
parameters that can be retrieved or set.
EVP_KEYMGMT_gettable_params() is used by EVP_PKEY_gettable_params(3).

EVP_KEYMGMT_gen_gettable_params() and EVP_KEYMGMT_gen_settable_params() return a
constant OSSL_PARAM(3) array that describes the names and types of key
generation parameters that can be retrieved or set via
EVP_PKEY_CTX_get_params(3) or EVP_PKEY_CTX_set_params(3) respectively.

## NOTES


EVP_KEYMGMT_fetch() may be called implicitly by other fetching
functions, using the same library context and properties.
Any other API that uses keys will typically do this.

## RETURN VALUES


EVP_KEYMGMT_fetch() returns a pointer to the key management
implementation represented by an EVP_KEYMGMT object, or NULL on
error.

EVP_KEYMGMT_up_ref() returns 1 on success, or 0 on error.

EVP_KEYMGMT_names_do_all() returns 1 if the callback was called for all
names. A return value of 0 means that the callback was not called for any names.

EVP_KEYMGMT_free() doesn't return any value.

EVP_KEYMGMT_get0_provider() returns a pointer to a provider object, or NULL
on error.

EVP_KEYMGMT_is_a() returns 1 of `keymgmt` was identifiable,
otherwise 0.

EVP_KEYMGMT_get0_name() returns the algorithm name, or NULL on error.

EVP_KEYMGMT_get0_description() returns a pointer to a description, or NULL if
there isn't one.

EVP_KEYMGMT_gettable_params(), EVP_KEYMGMT_settable_params(),
EVP_KEYMGMT_gen_gettable_params() and EVP_KEYMGMT_gen_settable_params()
return a constant OSSL_PARAM(3) array or NULL on error.

## SEE ALSO


EVP_MD_fetch(3), OSSL_LIB_CTX(3)

## HISTORY


The function EVP_KEYMGMT_gen_gettable_params() was added in OpenSSL 3.4.0
All other functions described here were added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2019-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_KEYMGMT.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_KEYMGMT.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_KEYMGMT.pod`；SHA-256：`527f08939a9aa1d113bbb13ef36cbc86a4c7b01db077556f42f3dbcccaa924bb`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
