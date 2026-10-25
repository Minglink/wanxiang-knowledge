---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-pkey-settable-params",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY_settable_params（man3）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY_settable_params"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "6910698e54f6e4ff60c25a0c2baf4da005bb31c4c46e12ed5a03d89c9cce92ab",
  "generatedHash": "24edf804afa69cd1d6a1f53c82f4fb23527eb12619d2ad7532c8b7bdb5238a0b",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY_settable_params, EVP_PKEY_set_params, EVP_PKEY_set_int_param, EVP_PKEY_set_size_t_param, EVP_PKEY_set_bn_param, EVP_PKEY_set_utf8_string_param, EVP_PKEY_set_octet_string_param - set key parameters into a key",
  "l1": "These functions can be used to set additional parameters into an existing **EVP_PKEY**. EVP_PKEY_set_params() sets one or more `params` into a `pkey`. See OSSL_PARAM(3) for information about parameters. EVP_PKEY_settable_params() returns a constant list of `params` indicating the names and types of key parameters that can be set. See OSSL_PARAM(3) for information about parameters. EVP_PKEY_set_int_param() sets an integer value `in` into a key `pkey` for the associated field `key_name`. EVP_PKEY_set_size_t_param() sets an size_t value `in` into a key `pkey` for the associated field `key_name`. EVP_PKEY_set_bn_param() sets the BIGNUM value `bn` into a key `pkey` for the associated field `key_name`. EVP_PKEY_set_utf8_string_param() sets the UTF8 string `str` into a key `pkey` for the associated field `key_name`. EVP_PKEY_set_octet_string_par",
  "questions": [
    "EVP_PKEY_settable_params 如何用于非对称密钥与签名？",
    "EVP_PKEY_settable_params 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-pkey-settable-params",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_settable_params.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY_settable_params（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY_settable_params, EVP_PKEY_set_params,
EVP_PKEY_set_int_param, EVP_PKEY_set_size_t_param, EVP_PKEY_set_bn_param,
EVP_PKEY_set_utf8_string_param, EVP_PKEY_set_octet_string_param
- set key parameters into a key

## 技术正文

## NAME


EVP_PKEY_settable_params, EVP_PKEY_set_params,
EVP_PKEY_set_int_param, EVP_PKEY_set_size_t_param, EVP_PKEY_set_bn_param,
EVP_PKEY_set_utf8_string_param, EVP_PKEY_set_octet_string_param
- set key parameters into a key

## SYNOPSIS


```c
#include <openssl/evp.h>

const OSSL_PARAM *EVP_PKEY_settable_params(const EVP_PKEY *pkey);
int EVP_PKEY_set_params(EVP_PKEY *pkey, OSSL_PARAM params[]);
int EVP_PKEY_set_int_param(EVP_PKEY *pkey, const char *key_name, int in);
int EVP_PKEY_set_size_t_param(EVP_PKEY *pkey, const char *key_name, size_t in);
int EVP_PKEY_set_bn_param(EVP_PKEY *pkey, const char *key_name,
                          const BIGNUM *bn);
int EVP_PKEY_set_utf8_string_param(EVP_PKEY *pkey, const char *key_name,
                                   const char *str);
int EVP_PKEY_set_octet_string_param(EVP_PKEY *pkey, const char *key_name,
                                    const unsigned char *buf, size_t bsize);

```

## DESCRIPTION


These functions can be used to set additional parameters into an existing
**EVP_PKEY**.

EVP_PKEY_set_params() sets one or more `params` into a `pkey`.
See OSSL_PARAM(3) for information about parameters.

EVP_PKEY_settable_params() returns a constant list of `params` indicating
the names and types of key parameters that can be set.
See OSSL_PARAM(3) for information about parameters.

EVP_PKEY_set_int_param() sets an integer value `in` into a key `pkey` for the
associated field `key_name`.

EVP_PKEY_set_size_t_param() sets an size_t value `in` into a key `pkey` for
the associated field `key_name`.

EVP_PKEY_set_bn_param() sets the BIGNUM value `bn` into a key `pkey` for the
associated field `key_name`.

EVP_PKEY_set_utf8_string_param() sets the UTF8 string `str` into a key `pkey`
for the associated field `key_name`.

EVP_PKEY_set_octet_string_param() sets the octet string value `buf` with a
size `bsize` into a key `pkey` for the associated field `key_name`.

## NOTES


These functions only work for **EVP_PKEY**s that contain a provider side key.

## RETURN VALUES


EVP_PKEY_settable_params() returns NULL on error or if it is not supported,

All other methods return 1 if a value was successfully set, or 0 if
there was an error.

## SEE ALSO


EVP_PKEY_gettable_params(3),
EVP_PKEY_CTX_new(3), provider-keymgmt(7), OSSL_PARAM(3),


## HISTORY


These functions were added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2020-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_PKEY_settable_params.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_settable_params.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_PKEY_settable_params.pod`；SHA-256：`6910698e54f6e4ff60c25a0c2baf4da005bb31c4c46e12ed5a03d89c9cce92ab`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
