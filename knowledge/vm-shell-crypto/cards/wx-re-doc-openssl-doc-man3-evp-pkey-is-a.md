---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-pkey-is-a",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY_is_a（man3）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY_is_a"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "78ea9858b9357dd2b9dfeedb265b4d5567d790699b31facd975e8c2569b38b61",
  "generatedHash": "8a5755b1ef4193881fd54a829e7ddb57c15ff4ff059dd97933efb5e55197f364",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY_is_a, EVP_PKEY_can_sign, EVP_PKEY_type_names_do_all, EVP_PKEY_get0_type_name, EVP_PKEY_get0_description, EVP_PKEY_get0_provider - key type and capabilities functions",
  "l1": "EVP_PKEY_is_a() checks if the key type of `pkey` is `name`. EVP_PKEY_can_sign() checks if the functionality for the key type of `pkey` supports signing. No other check is done, such as whether `pkey` contains a private key. EVP_PKEY_type_names_do_all() traverses all names for `pkey`'s key type, and calls `fn` with each name and `data`. For example, an RSA **EVP_PKEY** may be named both `RSA` and `rsaEncryption`. The order of the names depends on the provider implementation that holds the key. EVP_PKEY_get0_type_name() returns the first key type name that is found for the given `pkey`. Note that the `pkey` may have multiple synonyms associated with it. In this case it depends on the provider implementation that holds the key which one will be returned. Ownership of the returned string is retained by the `pkey` object and should not be free",
  "questions": [
    "EVP_PKEY_is_a 如何用于非对称密钥与签名？",
    "EVP_PKEY_is_a 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-pkey-is-a",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_is_a.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY_is_a（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY_is_a, EVP_PKEY_can_sign, EVP_PKEY_type_names_do_all,
EVP_PKEY_get0_type_name, EVP_PKEY_get0_description, EVP_PKEY_get0_provider
- key type and capabilities functions

## 技术正文

## NAME


EVP_PKEY_is_a, EVP_PKEY_can_sign, EVP_PKEY_type_names_do_all,
EVP_PKEY_get0_type_name, EVP_PKEY_get0_description, EVP_PKEY_get0_provider
- key type and capabilities functions

## SYNOPSIS


```c
#include <openssl/evp.h>

int EVP_PKEY_is_a(const EVP_PKEY *pkey, const char *name);
int EVP_PKEY_can_sign(const EVP_PKEY *pkey);
int EVP_PKEY_type_names_do_all(const EVP_PKEY *pkey,
                               void (*fn)(const char *name, void *data),
                               void *data);
const char *EVP_PKEY_get0_type_name(const EVP_PKEY *key);
const char *EVP_PKEY_get0_description(const EVP_PKEY *key);
const OSSL_PROVIDER *EVP_PKEY_get0_provider(const EVP_PKEY *key);

```

## DESCRIPTION


EVP_PKEY_is_a() checks if the key type of `pkey` is `name`.

EVP_PKEY_can_sign() checks if the functionality for the key type of
`pkey` supports signing.  No other check is done, such as whether
`pkey` contains a private key.

EVP_PKEY_type_names_do_all() traverses all names for `pkey`'s key type, and
calls `fn` with each name and `data`.  For example, an RSA **EVP_PKEY** may
be named both `RSA` and `rsaEncryption`.
The order of the names depends on the provider implementation that holds
the key.

EVP_PKEY_get0_type_name() returns the first key type name that is found
for the given `pkey`. Note that the `pkey` may have multiple synonyms
associated with it. In this case it depends on the provider implementation
that holds the key which one will be returned.
Ownership of the returned string is retained by the `pkey` object and should
not be freed by the caller.

EVP_PKEY_get0_description() returns a description of the type of **EVP_PKEY**,
meant for display and human consumption.  The description is at the
discretion of the key type implementation.

EVP_PKEY_get0_provider() returns the provider of the **EVP_PKEY**'s
EVP_KEYMGMT(3).

## RETURN VALUES


EVP_PKEY_is_a() returns 1 if `pkey` has the key type `name`,
otherwise 0.

EVP_PKEY_can_sign() returns 1 if the `pkey` key type functionality
supports signing, otherwise 0.

EVP_PKEY_get0_type_name() returns the name that is found or NULL on error.

EVP_PKEY_get0_description() returns the description if found or NULL if not.

EVP_PKEY_get0_provider() returns the provider if found or NULL if not.

EVP_PKEY_type_names_do_all() returns 1 if the callback was called for all
names. A return value of 0 means that the callback was not called for any
names.

## EXAMPLES


### EVP_PKEY_is_a()


The loaded providers and what key types they support will ultimately
determine what `name` is possible to use with EVP_PKEY_is_a().  We do know
that the default provider supports RSA, DH, DSA and EC keys, so we can use
this as an crude example:

```c
#include <openssl/evp.h>

...
    /* |pkey| is an EVP_PKEY* */
    if (EVP_PKEY_is_a(pkey, "RSA")) {
        BIGNUM *modulus = NULL;
        if (EVP_PKEY_get_bn_param(pkey, "n", &modulus))
            /* do whatever with the modulus */
        BN_free(modulus);
    }

```

### EVP_PKEY_can_sign()


```c
#include <openssl/evp.h>

...
    /* |pkey| is an EVP_PKEY* */
    if (!EVP_PKEY_can_sign(pkey)) {
        fprintf(stderr, "Not a signing key!");
        exit(1);
    }
    /* Sign something... */

```

## HISTORY


The functions described here were added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2020-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_PKEY_is_a.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_is_a.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_PKEY_is_a.pod`；SHA-256：`78ea9858b9357dd2b9dfeedb265b4d5567d790699b31facd975e8c2569b38b61`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
