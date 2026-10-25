---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-skey",
  "title": "OpenSSL：EVP 密码接口 · EVP_SKEY（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "密码接口",
    "Provider",
    "openssl",
    "EVP_SKEY"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "b415d5455f3164288c23f4a9f2106152a15a51477161e6c5f9a43edbea0ecb5c",
  "generatedHash": "bb0b709b1f4bd9c3fb314047a91a3f13b0ca3663f8b92ddcfef2ba9c9e8d35d3",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "EVP 密码接口：EVP_SKEY, EVP_SKEY_generate, EVP_SKEY_import, EVP_SKEY_import_raw_key, EVP_SKEY_up_ref, EVP_SKEY_export, EVP_SKEY_get0_raw_key, EVP_SKEY_get0_key_id, EVP_SKEY_get0_skeymgmt_name, EVP_SKEY_get0_provider_name, EVP_SKEY_free, EVP_SKEY_is_a, EVP_SKEY_to_provider - opaque symmetric key allocation and han",
  "l1": "**EVP_SKEY** is a generic structure to hold symmetric keys as opaque objects. The keys themselves are often referred to as the \"internal key\", and are handled by providers using EVP_SKEYMGMT(3). Conceptually, an **EVP_SKEY** internal key may hold a symmetric key, and along with those, key parameters if the key type requires them. The EVP_SKEY_generate() functions creates a new **EVP_SKEY** object and initializes it according to the **params** argument. The EVP_SKEY_import() function allocates an empty **EVP_SKEY** structure which is used by OpenSSL to store symmetric keys, assigns the **EVP_SKEYMGMT** object associated with the key, and initializes the object from the **params** argument. The EVP_SKEY_import_raw_key() function is a helper that creates an **EVP_SKEY** object containing the raw byte representation of the symmetric keys. The",
  "questions": [
    "EVP_SKEY 如何用于EVP 密码接口？",
    "EVP_SKEY 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-skey",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_SKEY.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：EVP 密码接口 · EVP_SKEY（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：EVP 密码接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_SKEY, EVP_SKEY_generate,
EVP_SKEY_import, EVP_SKEY_import_raw_key, EVP_SKEY_up_ref,
EVP_SKEY_export, EVP_SKEY_get0_raw_key, EVP_SKEY_get0_key_id,
EVP_SKEY_get0_skeymgmt_name, EVP_SKEY_get0_provider_name,
EVP_SKEY_free, EVP_SKEY_is_a, EVP_SKEY_to_provider
- opaque symmetric key allocation and handling functions

## 技术正文

## NAME


EVP_SKEY, EVP_SKEY_generate,
EVP_SKEY_import, EVP_SKEY_import_raw_key, EVP_SKEY_up_ref,
EVP_SKEY_export, EVP_SKEY_get0_raw_key, EVP_SKEY_get0_key_id,
EVP_SKEY_get0_skeymgmt_name, EVP_SKEY_get0_provider_name,
EVP_SKEY_free, EVP_SKEY_is_a, EVP_SKEY_to_provider
- opaque symmetric key allocation and handling functions

## SYNOPSIS


```c
#include <openssl/evp.h>

typedef evp_skey_st EVP_SKEY;

EVP_SKEY *EVP_SKEY_generate(OSSL_LIB_CTX *libctx, const char *skeymgmtname,
                            const char *propquery, const OSSL_PARAM *params);
EVP_SKEY *EVP_SKEY_import(OSSL_LIB_CTX *libctx, const char *skeymgmtname,
                          const char *propquery,
                          int selection, const OSSL_PARAM *params);
EVP_SKEY *EVP_SKEY_import_raw_key(OSSL_LIB_CTX *libctx, const char *skeymgmtname,
                                  unsigned char *key, size_t *len,
                                  const char *propquery);
int EVP_SKEY_export(const EVP_SKEY *skey, int selection,
                    OSSL_CALLBACK *export_cb, void *export_cbarg);
int EVP_SKEY_get0_raw_key(const EVP_SKEY *skey, const unsigned char **key,
                         size_t *len);
const char *EVP_SKEY_get0_key_id(const EVP_SKEY *skey);

const char *EVP_SKEY_get0_skeymgmt_name(const EVP_SKEY *skey);
const char *EVP_SKEY_get0_provider_name(const EVP_SKEY *skey);

int EVP_SKEY_up_ref(EVP_SKEY *key);
void EVP_SKEY_free(EVP_SKEY *key);
int EVP_SKEY_is_a(const EVP_SKEY *skey, const char *name);
EVP_SKEY *EVP_SKEY_to_provider(EVP_SKEY *skey, OSSL_LIB_CTX *libctx,
                               OSSL_PROVIDER *prov, const char *propquery);


```

## DESCRIPTION


**EVP_SKEY** is a generic structure to hold symmetric keys as opaque objects.
The keys themselves are often referred to as the "internal key", and are handled by
providers using EVP_SKEYMGMT(3).

Conceptually, an **EVP_SKEY** internal key may hold a symmetric key, and along
with those, key parameters if the key type requires them.

The EVP_SKEY_generate() functions creates a new **EVP_SKEY** object and
initializes it according to the **params** argument.

The EVP_SKEY_import() function allocates an empty **EVP_SKEY** structure
which is used by OpenSSL to store symmetric keys, assigns the
**EVP_SKEYMGMT** object associated with the key, and initializes the object from
the **params** argument.

The EVP_SKEY_import_raw_key() function is a helper that creates an **EVP_SKEY** object
containing the raw byte representation of the symmetric keys.

The EVP_SKEY_export() function extracts values from a key `skey` using the
`selection`.  `selection` is described below. It uses a callback `export_cb`
that gets passed the value of `export_cbarg`.  See openssl-core.h(7) for
more information about the callback. Note that the OSSL_PARAM(3) array that
is passed to the callback is not persistent after the callback returns.

The EVP_SKEY_get0_raw_key() returns a pointer to a raw key bytes to the passed
address and sets the key len. The returned address is managed by the internal
key management and shouldn't be freed explicitly.  The operation can fail when
the underlying key management doesn't support export of the secret key.

The EVP_SKEY_get0_key_id() returns a NUL-terminated string providing some
human-readable identifier of the key if provided by the underlying key
management. The pointer becomes invalid after freeing the EVP_SKEY object.

The EVP_SKEY_get0_skeymgmt_name() and EVP_SKEY_get0_provider_name() return the
names of the associated EVP_SKEYMGMT object and its provider correspondingly.

EVP_SKEY_up_ref() increments the reference count of `key`.

EVP_SKEY_free() decrements the reference count of `key` and, if the reference
count is zero, frees it. If `key` is NULL, nothing is done.

EVP_SKEY_is_a() checks if the key type of `skey` is `name`.

EVP_SKEY_to_provider() simplifies the task of importing a `skey` into a
different provider identified by `prov`. If `prov` is NULL, the default
provider for the key type identified via `skey` is used.

### Selections


The following constants can be used for `selection`:


- **OSSL_SKEYMGMT_SELECT_SECRET_KEY**

Only the raw key representation will be selected.

- **OSSL_SKEYMGMT_SELECT_PARAMETERS**

Only the key parameters will be selected. This includes optional key
parameters.

- **OSSL_SKEYMGMT_SELECT_ALL**

All parameters will be selected.


## NOTES


The **EVP_SKEY** structure is used by various OpenSSL functions which require a
general symmetric key without reference to any particular algorithm.

The EVP_SKEY_to_provider() function will fail and return NULL if the origin
key `skey` cannot be exported from its provider.

## RETURN VALUES


EVP_SKEY_generate(), EVP_SKEY_import() and EVP_SKEY_import_raw_key() return
either the newly allocated **EVP_SKEY** structure or NULL if an error occurred.

EVP_SKEY_get0_key_id() returns either a valid pointer or NULL.

EVP_SKEY_up_ref() returns 1 for success and 0 on failure.

EVP_SKEY_export() and EVP_SKEY_get0_raw_key() return 1 for success and 0 on failure.

EVP_SKEY_get0_skeymgmt_name() and EVP_SKEY_get0_provider_name() return the
names of the associated EVP_SKEYMGMT object and its provider correspondigly.

EVP_SKEY_is_a() returns 1 if `skey` has the key type `name`,
otherwise 0.

EVP_SKEY_to_provider() returns a new **EVP_SKEY** suitable for operations with
the `prov` provider or NULL in case of failure.

## SEE ALSO


EVP_SKEYMGMT(3), provider(7), OSSL_PARAM(3)

## HISTORY


The **EVP_SKEY** API and functions EVP_SKEY_export(),
EVP_SKEY_free(), EVP_SKEY_get0_raw_key(), EVP_SKEY_import(),
EVP_SKEY_import_raw_key(), EVP_SKEY_up_ref(), EVP_SKEY_generate(),
EVP_SKEY_get0_key_id(), EVP_SKEY_get0_provider_name(),
EVP_SKEY_get0_skeymgmt_name(), EVP_SKEY_is_a(), EVP_SKEY_to_provider()
were introduced in OpenSSL 3.5.

## COPYRIGHT


Copyright 2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_SKEY.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_SKEY.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_SKEY.pod`；SHA-256：`b415d5455f3164288c23f4a9f2106152a15a51477161e6c5f9a43edbea0ecb5c`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
