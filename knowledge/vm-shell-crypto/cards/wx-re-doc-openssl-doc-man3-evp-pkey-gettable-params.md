---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-pkey-gettable-params",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY_gettable_params（man3）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY_gettable_params"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "c2071f23452adc5fdbf3526122fc53870fad08d4dbe6a741d198d249c409e5d6",
  "generatedHash": "7a22d5c3f75bf87b7d7fe879d0c381c38aaf20b92259af9c144bce4571caf55f",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY_gettable_params, EVP_PKEY_get_params, EVP_PKEY_get_int_param, EVP_PKEY_get_size_t_param, EVP_PKEY_get_bn_param, EVP_PKEY_get_utf8_string_param, EVP_PKEY_get_octet_string_param - retrieve key parameters from a key",
  "l1": "See OSSL_PARAM(3) for information about parameters. EVP_PKEY_get_params() retrieves parameters from the key `pkey`, according to the contents of `params`. EVP_PKEY_gettable_params() returns a constant list of `params` indicating the names and types of key parameters that can be retrieved. An OSSL_PARAM(3) of type **OSSL_PARAM_INTEGER** or **OSSL_PARAM_UNSIGNED_INTEGER** is of arbitrary length. Such a parameter can be obtained using any of the functions EVP_PKEY_get_int_param(), EVP_PKEY_get_size_t_param() or EVP_PKEY_get_bn_param(). Attempting to obtain an integer value that does not fit into a native C **int** type will cause EVP_PKEY_get_int_param() to fail. Similarly attempting to obtain an integer value that is negative or does not fit into a native C **size_t** type using EVP_PKEY_get_size_t_param() will also fail. EVP_PKEY_get_int_p",
  "questions": [
    "EVP_PKEY_gettable_params 如何用于非对称密钥与签名？",
    "EVP_PKEY_gettable_params 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-pkey-gettable-params",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_gettable_params.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY_gettable_params（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY_gettable_params, EVP_PKEY_get_params,
EVP_PKEY_get_int_param, EVP_PKEY_get_size_t_param,
EVP_PKEY_get_bn_param, EVP_PKEY_get_utf8_string_param,
EVP_PKEY_get_octet_string_param
- retrieve key parameters from a key

## 技术正文

## NAME


EVP_PKEY_gettable_params, EVP_PKEY_get_params,
EVP_PKEY_get_int_param, EVP_PKEY_get_size_t_param,
EVP_PKEY_get_bn_param, EVP_PKEY_get_utf8_string_param,
EVP_PKEY_get_octet_string_param
- retrieve key parameters from a key

## SYNOPSIS


```c
#include <openssl/evp.h>

const OSSL_PARAM *EVP_PKEY_gettable_params(EVP_PKEY *pkey);
int EVP_PKEY_get_params(const EVP_PKEY *pkey, OSSL_PARAM params[]);
int EVP_PKEY_get_int_param(const EVP_PKEY *pkey, const char *key_name,
                           int *out);
int EVP_PKEY_get_size_t_param(const EVP_PKEY *pkey, const char *key_name,
                              size_t *out);
int EVP_PKEY_get_bn_param(const EVP_PKEY *pkey, const char *key_name,
                          BIGNUM **bn);
int EVP_PKEY_get_utf8_string_param(const EVP_PKEY *pkey, const char *key_name,
                                   char *str, size_t max_buf_sz,
                                   size_t *out_len);
int EVP_PKEY_get_octet_string_param(const EVP_PKEY *pkey, const char *key_name,
                                    unsigned char *buf, size_t max_buf_sz,
                                    size_t *out_len);

```

## DESCRIPTION


See OSSL_PARAM(3) for information about parameters.

EVP_PKEY_get_params() retrieves parameters from the key `pkey`, according to
the contents of `params`.

EVP_PKEY_gettable_params() returns a constant list of `params` indicating
the names and types of key parameters that can be retrieved.

An OSSL_PARAM(3) of type **OSSL_PARAM_INTEGER** or
**OSSL_PARAM_UNSIGNED_INTEGER** is of arbitrary length. Such a parameter can be
obtained using any of the functions EVP_PKEY_get_int_param(),
EVP_PKEY_get_size_t_param() or EVP_PKEY_get_bn_param(). Attempting to
obtain an integer value that does not fit into a native C **int** type will cause
EVP_PKEY_get_int_param() to fail. Similarly attempting to obtain an integer
value that is negative or does not fit into a native C **size_t** type using
EVP_PKEY_get_size_t_param() will also fail.

EVP_PKEY_get_int_param() retrieves a key `pkey` integer value `*out`
associated with a name of `key_name` if it fits into `int` type. For
parameters that do not fit into `int` use EVP_PKEY_get_bn_param().

EVP_PKEY_get_size_t_param() retrieves a key `pkey` size_t value `*out`
associated with a name of `key_name` if it fits into `size_t` type. For
parameters that do not fit into `size_t` use EVP_PKEY_get_bn_param().

EVP_PKEY_get_bn_param() retrieves a key `pkey` BIGNUM value `**bn`
associated with a name of `key_name`. If `*bn` is NULL then the BIGNUM
is allocated by the method.

EVP_PKEY_get_utf8_string_param() get a key `pkey` UTF8 string value into a
buffer `str` of maximum size `max_buf_sz` associated with a name of
`key_name`.  The maximum size must be large enough to accommodate the string
value including a terminating NUL byte, or this function will fail.
If `out_len` is not NULL, `*out_len` is set to the length of the string
not including the terminating NUL byte. The required buffer size not including
the terminating NUL byte can be obtained from `*out_len` by calling the
function with `str` set to NULL.

EVP_PKEY_get_octet_string_param() get a key `pkey`'s octet string value into a
buffer `buf` of maximum size `max_buf_sz` associated with a name of `key_name`.
If `out_len` is not NULL, `*out_len` is set to the length of the contents.
The required buffer size can be obtained from `*out_len` by calling the
function with `buf` set to NULL.

## NOTES


These functions only work for **EVP_PKEY**s that contain a provider side key.

## RETURN VALUES


EVP_PKEY_gettable_params() returns NULL on error or if it is not supported.

All other methods return 1 if a value associated with the key's `key_name` was
successfully returned, or 0 if there was an error.
An error may be returned by methods EVP_PKEY_get_utf8_string_param() and
EVP_PKEY_get_octet_string_param() if `max_buf_sz` is not big enough to hold the
value.  If `out_len` is not NULL, `*out_len` will be assigned the required
buffer size to hold the value.

## EXAMPLES


```c
#include <openssl/evp.h>

char curve_name[64];
unsigned char pub[256];
BIGNUM *bn_priv = NULL;

/*
 * NB: assumes 'key' is set up before the next step. In this example the key
 * is an EC key.
 */

if (!EVP_PKEY_get_utf8_string_param(key, OSSL_PKEY_PARAM_GROUP_NAME,
                                    curve_name, sizeof(curve_name), &len)) {
  /* Error */
}
if (!EVP_PKEY_get_octet_string_param(key, OSSL_PKEY_PARAM_PUB_KEY,
                                     pub, sizeof(pub), &len)) {
    /* Error */
}
if (!EVP_PKEY_get_bn_param(key, OSSL_PKEY_PARAM_PRIV_KEY, &bn_priv)) {
    /* Error */
}

BN_clear_free(bn_priv);

```

## SEE ALSO


EVP_PKEY_CTX_new(3), provider-keymgmt(7), OSSL_PARAM(3)

## HISTORY


These functions were added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2020-2022 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_PKEY_gettable_params.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_gettable_params.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_PKEY_gettable_params.pod`；SHA-256：`c2071f23452adc5fdbf3526122fc53870fad08d4dbe6a741d198d249c409e5d6`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
