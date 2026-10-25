---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-asym-cipher-free",
  "title": "OpenSSL：EVP 密码接口 · EVP_ASYM_CIPHER_free（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "密码接口",
    "Provider",
    "openssl",
    "EVP_ASYM_CIPHER_free"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "fe411d862be63e096f3d09a1d5fb2ed96bfb9ae5a12c4a7c6cc75eb290ac6106",
  "generatedHash": "2e9b4d0782e47d43c6a7518eaf3b584efeac8b982c3381d15c81e6932210f66d",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "EVP 密码接口：EVP_ASYM_CIPHER_fetch, EVP_ASYM_CIPHER_free, EVP_ASYM_CIPHER_up_ref, EVP_ASYM_CIPHER_is_a, EVP_ASYM_CIPHER_get0_provider, EVP_ASYM_CIPHER_do_all_provided, EVP_ASYM_CIPHER_names_do_all, EVP_ASYM_CIPHER_get0_name, EVP_ASYM_CIPHER_get0_description, EVP_ASYM_CIPHER_gettable_ctx_params, EVP_ASYM_CIPHER_s",
  "l1": "EVP_ASYM_CIPHER_fetch() fetches the implementation for the given **algorithm** from any provider offering it, within the criteria given by the **properties** and in the scope of the given library context **ctx** (see OSSL_LIB_CTX(3)). The algorithm will be one offering functions for performing asymmetric cipher related tasks such as asymmetric encryption and decryption. See crypto(7)/ALGORITHM FETCHING for further information. The returned value must eventually be freed with EVP_ASYM_CIPHER_free(). EVP_ASYM_CIPHER_free() decrements the reference count for the **EVP_ASYM_CIPHER** structure. Typically this structure will have been obtained from an earlier call to EVP_ASYM_CIPHER_fetch(). If the reference count drops to 0 then the structure is freed. If the argument is NULL, nothing is done. EVP_ASYM_CIPHER_up_ref() increments the reference ",
  "questions": [
    "EVP_ASYM_CIPHER_free 如何用于EVP 密码接口？",
    "EVP_ASYM_CIPHER_free 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-asym-cipher-free",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_ASYM_CIPHER_free.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：EVP 密码接口 · EVP_ASYM_CIPHER_free（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：EVP 密码接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_ASYM_CIPHER_fetch, EVP_ASYM_CIPHER_free, EVP_ASYM_CIPHER_up_ref,
EVP_ASYM_CIPHER_is_a, EVP_ASYM_CIPHER_get0_provider,
EVP_ASYM_CIPHER_do_all_provided, EVP_ASYM_CIPHER_names_do_all,
EVP_ASYM_CIPHER_get0_name, EVP_ASYM_CIPHER_get0_description,
EVP_ASYM_CIPHER_gettable_ctx_params, EVP_ASYM_CIPHER_settable_ctx_params
- Functions to manage EVP_ASYM_CIPHER algorithm objects

## 技术正文

## NAME


EVP_ASYM_CIPHER_fetch, EVP_ASYM_CIPHER_free, EVP_ASYM_CIPHER_up_ref,
EVP_ASYM_CIPHER_is_a, EVP_ASYM_CIPHER_get0_provider,
EVP_ASYM_CIPHER_do_all_provided, EVP_ASYM_CIPHER_names_do_all,
EVP_ASYM_CIPHER_get0_name, EVP_ASYM_CIPHER_get0_description,
EVP_ASYM_CIPHER_gettable_ctx_params, EVP_ASYM_CIPHER_settable_ctx_params
- Functions to manage EVP_ASYM_CIPHER algorithm objects

## SYNOPSIS


```c
#include <openssl/evp.h>

EVP_ASYM_CIPHER *EVP_ASYM_CIPHER_fetch(OSSL_LIB_CTX *ctx, const char *algorithm,
                                       const char *properties);
void EVP_ASYM_CIPHER_free(EVP_ASYM_CIPHER *cipher);
int EVP_ASYM_CIPHER_up_ref(EVP_ASYM_CIPHER *cipher);
const char *EVP_ASYM_CIPHER_get0_name(const EVP_ASYM_CIPHER *cipher);
int EVP_ASYM_CIPHER_is_a(const EVP_ASYM_CIPHER *cipher, const char *name);
OSSL_PROVIDER *EVP_ASYM_CIPHER_get0_provider(const EVP_ASYM_CIPHER *cipher);
void EVP_ASYM_CIPHER_do_all_provided(OSSL_LIB_CTX *libctx,
                                     void (*fn)(EVP_ASYM_CIPHER *cipher,
                                                void *arg),
                                     void *arg);
int EVP_ASYM_CIPHER_names_do_all(const EVP_ASYM_CIPHER *cipher,
                                 void (*fn)(const char *name, void *data),
                                 void *data);
const char *EVP_ASYM_CIPHER_get0_description(const EVP_ASYM_CIPHER *cipher);
const OSSL_PARAM *EVP_ASYM_CIPHER_gettable_ctx_params(const EVP_ASYM_CIPHER *cip);
const OSSL_PARAM *EVP_ASYM_CIPHER_settable_ctx_params(const EVP_ASYM_CIPHER *cip);

```

## DESCRIPTION


EVP_ASYM_CIPHER_fetch() fetches the implementation for the given
**algorithm** from any provider offering it, within the criteria given
by the **properties** and in the scope of the given library context **ctx** (see
OSSL_LIB_CTX(3)). The algorithm will be one offering functions for performing
asymmetric cipher related tasks such as asymmetric encryption and decryption.
See crypto(7)/ALGORITHM FETCHING for further information.

The returned value must eventually be freed with EVP_ASYM_CIPHER_free().

EVP_ASYM_CIPHER_free() decrements the reference count for the **EVP_ASYM_CIPHER**
structure. Typically this structure will have been obtained from an earlier call
to EVP_ASYM_CIPHER_fetch(). If the reference count drops to 0 then the
structure is freed. If the argument is NULL, nothing is done.

EVP_ASYM_CIPHER_up_ref() increments the reference count for an
**EVP_ASYM_CIPHER** structure.

EVP_ASYM_CIPHER_is_a() returns 1 if `cipher` is an implementation of an
algorithm that's identifiable with `name`, otherwise 0.

EVP_ASYM_CIPHER_get0_provider() returns the provider that `cipher` was
fetched from.

EVP_ASYM_CIPHER_do_all_provided() traverses all EVP_ASYM_CIPHERs implemented by
all activated providers in the given library context `libctx`, and for each of
the implementations, calls the given function `fn` with the implementation
method and the given `arg` as argument.

EVP_ASYM_CIPHER_get0_name() returns the algorithm name from the provided
implementation for the given `cipher`. Note that the `cipher` may have
multiple synonyms associated with it. In this case the first name from the
algorithm definition is returned. Ownership of the returned string is retained
by the `cipher` object and should not be freed by the caller.

EVP_ASYM_CIPHER_names_do_all() traverses all names for `cipher`, and calls
`fn` with each name and `data`.

EVP_ASYM_CIPHER_get0_description() returns a description of the `cipher`,
meant for display and human consumption.  The description is at the
discretion of the `cipher` implementation.

EVP_ASYM_CIPHER_gettable_ctx_params() and EVP_ASYM_CIPHER_settable_ctx_params()
return a constant OSSL_PARAM(3) array that describes the names and types of key
parameters that can be retrieved or set by a key encryption algorithm using
EVP_PKEY_CTX_get_params(3) and EVP_PKEY_CTX_set_params(3).

## RETURN VALUES


EVP_ASYM_CIPHER_fetch() returns a pointer to an **EVP_ASYM_CIPHER** for success
or **NULL** for failure.

EVP_ASYM_CIPHER_up_ref() returns 1 for success or 0 otherwise.

EVP_ASYM_CIPHER_names_do_all() returns 1 if the callback was called for all
names. A return value of 0 means that the callback was not called for any names.

EVP_ASYM_CIPHER_gettable_ctx_params() and EVP_ASYM_CIPHER_settable_ctx_params()
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

- 上游：[doc/man3/EVP_ASYM_CIPHER_free.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_ASYM_CIPHER_free.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_ASYM_CIPHER_free.pod`；SHA-256：`fe411d862be63e096f3d09a1d5fb2ed96bfb9ae5a12c4a7c6cc75eb290ac6106`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
