---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-pkey-ctx-new",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY_CTX_new（man3）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY_CTX_new"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "b84bc9f267c85a889560b700286db6b8872d28544c73fc0cc03cb4714ae3fbb3",
  "generatedHash": "3dda8438fae60fe2cec5e3ed30133b0a947b8af6b65d7137477c9bb90435cad3",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY_CTX_new, EVP_PKEY_CTX_new_id, EVP_PKEY_CTX_new_from_name, EVP_PKEY_CTX_new_from_pkey, EVP_PKEY_CTX_dup, EVP_PKEY_CTX_free, EVP_PKEY_CTX_is_a - public key algorithm context functions",
  "l1": "The EVP_PKEY_CTX_new() function allocates public key algorithm context using the `pkey` key type and ENGINE `e`. The EVP_PKEY_CTX_new_id() function allocates public key algorithm context using the key type specified by `id` and ENGINE `e`. The EVP_PKEY_CTX_new_from_name() function allocates a public key algorithm context using the library context `libctx` (see OSSL_LIB_CTX(3)), the key type specified by `name` and the property query `propquery`. None of the arguments are duplicated, so they must remain unchanged for the lifetime of the returned **EVP_PKEY_CTX** or of any of its duplicates. Read further about the possible names in /NOTES below. The EVP_PKEY_CTX_new_from_pkey() function allocates a public key algorithm context using the library context `libctx` (see OSSL_LIB_CTX(3)) and the algorithm specified by `pkey` and the property que",
  "questions": [
    "EVP_PKEY_CTX_new 如何用于非对称密钥与签名？",
    "EVP_PKEY_CTX_new 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-pkey-ctx-new",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_CTX_new.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY_CTX_new（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY_CTX_new, EVP_PKEY_CTX_new_id, EVP_PKEY_CTX_new_from_name,
EVP_PKEY_CTX_new_from_pkey, EVP_PKEY_CTX_dup, EVP_PKEY_CTX_free,
EVP_PKEY_CTX_is_a
- public key algorithm context functions

## 技术正文

## NAME


EVP_PKEY_CTX_new, EVP_PKEY_CTX_new_id, EVP_PKEY_CTX_new_from_name,
EVP_PKEY_CTX_new_from_pkey, EVP_PKEY_CTX_dup, EVP_PKEY_CTX_free,
EVP_PKEY_CTX_is_a
- public key algorithm context functions

## SYNOPSIS


```c
#include <openssl/evp.h>

EVP_PKEY_CTX *EVP_PKEY_CTX_new(EVP_PKEY *pkey, ENGINE *e);
EVP_PKEY_CTX *EVP_PKEY_CTX_new_id(int id, ENGINE *e);
EVP_PKEY_CTX *EVP_PKEY_CTX_new_from_name(OSSL_LIB_CTX *libctx,
                                         const char *name,
                                         const char *propquery);
EVP_PKEY_CTX *EVP_PKEY_CTX_new_from_pkey(OSSL_LIB_CTX *libctx,
                                         EVP_PKEY *pkey,
                                         const char *propquery);
EVP_PKEY_CTX *EVP_PKEY_CTX_dup(const EVP_PKEY_CTX *ctx);
void EVP_PKEY_CTX_free(EVP_PKEY_CTX *ctx);
int EVP_PKEY_CTX_is_a(EVP_PKEY_CTX *ctx, const char *keytype);

```

## DESCRIPTION


The EVP_PKEY_CTX_new() function allocates public key algorithm context using
the `pkey` key type and ENGINE `e`.

The EVP_PKEY_CTX_new_id() function allocates public key algorithm context
using the key type specified by `id` and ENGINE `e`.

The EVP_PKEY_CTX_new_from_name() function allocates a public key algorithm
context using the library context `libctx` (see OSSL_LIB_CTX(3)), the
key type specified by `name` and the property query `propquery`.  None
of the arguments are duplicated, so they  must remain unchanged for the
lifetime of the returned **EVP_PKEY_CTX** or of any of its duplicates.  Read
further about the possible names in /NOTES below.

The EVP_PKEY_CTX_new_from_pkey() function allocates a public key algorithm
context using the library context `libctx` (see OSSL_LIB_CTX(3)) and the
algorithm specified by `pkey` and the property query `propquery`. None of the
arguments are duplicated, so they must remain unchanged for the lifetime of the
returned **EVP_PKEY_CTX** or any of its duplicates.

EVP_PKEY_CTX_new_id() and EVP_PKEY_CTX_new_from_name() are normally
used when no **EVP_PKEY** structure is associated with the operations,
for example during parameter generation or key generation for some
algorithms.

EVP_PKEY_CTX_dup() duplicates the context `ctx`. It is not supported for a
keygen operation.

EVP_PKEY_CTX_free() frees up the context `ctx`.
If `ctx` is NULL, nothing is done.

EVP_PKEY_is_a() checks if the key type associated with `ctx` is `keytype`.

## NOTES


### On **EVP_PKEY_CTX**


The **EVP_PKEY_CTX** structure is an opaque public key algorithm context used
by the OpenSSL high-level public key API. Contexts **MUST NOT** be shared between
threads: that is it is not permissible to use the same context simultaneously
in two threads.

### On Key Types


We mention "key type" in this manual, which is the same
as "algorithm" in most cases, allowing either term to be used
interchangeably.  There are algorithms where the `key type` and the
`algorithm` of the operations that use the keys are not the same,
such as EC keys being used for ECDSA and ECDH operations.

Key types are given in two different manners:


- Legacy NID or EVP_PKEY type

This is the `id` used with EVP_PKEY_CTX_new_id().

These are **EVP_PKEY_RSA**, **EVP_PKEY_RSA_PSS**, **EVP_PKEY_DSA**,
**EVP_PKEY_DH**, **EVP_PKEY_EC**, **EVP_PKEY_SM2**, **EVP_PKEY_X25519**,
**EVP_PKEY_X448**, and are used by legacy methods.

- Name strings

This is the `name` used with EVP_PKEY_CTX_new_from_name().

These are names like "RSA", "DSA", and what's available depends on what
providers are currently accessible.

The OpenSSL providers offer a set of key types available this way, please
see OSSL_PROVIDER-FIPS(7) and OSSL_PROVIDER-default(7) and related
documentation for more information.


## RETURN VALUES


EVP_PKEY_CTX_new(), EVP_PKEY_CTX_new_id() and EVP_PKEY_CTX_dup() return either
the newly allocated **EVP_PKEY_CTX** structure or **NULL** if an error occurred.

EVP_PKEY_CTX_free() does not return a value.

EVP_PKEY_CTX_is_a() returns 1 for true and 0 for false.

## SEE ALSO


EVP_PKEY_new(3)

## HISTORY


The EVP_PKEY_CTX_new(), EVP_PKEY_CTX_new_id(), EVP_PKEY_CTX_dup() and
EVP_PKEY_CTX_free() functions were added in OpenSSL 1.0.0.

The EVP_PKEY_CTX_new_from_name() and EVP_PKEY_CTX_new_from_pkey() functions were
added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2006-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_PKEY_CTX_new.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_CTX_new.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_PKEY_CTX_new.pod`；SHA-256：`b84bc9f267c85a889560b700286db6b8872d28544c73fc0cc03cb4714ae3fbb3`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
