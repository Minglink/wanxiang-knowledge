---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bio-get-ex-new-index",
  "title": "OpenSSL：密码数据流 · BIO_get_ex_new_index（man3）",
  "type": "note",
  "tags": [
    "BIO",
    "输入输出",
    "缓冲区",
    "openssl",
    "BIO_get_ex_new_index"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "b88a836be07cfad6e49dbbbc754bf79f5510c000c419edce8b22f13ad6c96167",
  "generatedHash": "864c5df79ae8462dc174daa7c3a8bff03c1187ac39fc5fac199b91979154cfb5",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码数据流：BIO_get_ex_new_index, BIO_set_ex_data, BIO_get_ex_data, BIO_set_app_data, BIO_get_app_data, DH_get_ex_new_index, DH_set_ex_data, DH_get_ex_data, DSA_get_ex_new_index, DSA_set_ex_data, DSA_get_ex_data, EC_KEY_get_ex_new_index, EC_KEY_set_ex_data, EC_KEY_get_ex_data, ENGINE_get_ex_new_index, ENGINE_se",
  "l1": "In the description here, `TYPE` is used a placeholder for any of the OpenSSL datatypes listed in CRYPTO_get_ex_new_index(3). All functions with a `TYPE` of **DH**, **DSA**, **RSA** and **EC_KEY** are deprecated. Applications should instead use EVP_PKEY_set_ex_data(), EVP_PKEY_get_ex_data() and EVP_PKEY_get_ex_new_index(). All functions with a `TYPE` of **ENGINE** are deprecated. Applications using engines should be replaced by providers. These functions handle application-specific data for OpenSSL data structures. TYPE_get_ex_new_index() is a macro that calls CRYPTO_get_ex_new_index() with the correct **index** value. TYPE_set_ex_data() is a function that calls CRYPTO_set_ex_data() with an offset into the opaque exdata part of the TYPE object. `d` **MUST NOT** be NULL. TYPE_get_ex_data() is a function that calls CRYPTO_get_ex_data() with ",
  "questions": [
    "BIO_get_ex_new_index 如何用于密码数据流？",
    "BIO_get_ex_new_index 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bio-get-ex-new-index",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_get_ex_new_index.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码数据流 · BIO_get_ex_new_index（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码数据流。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BIO_get_ex_new_index, BIO_set_ex_data, BIO_get_ex_data,
BIO_set_app_data, BIO_get_app_data,
DH_get_ex_new_index, DH_set_ex_data, DH_get_ex_data,
DSA_get_ex_new_index, DSA_set_ex_data, DSA_get_ex_data,
EC_KEY_get_ex_new_index, EC_KEY_set_ex_data, EC_KEY_get_ex_data,
ENGINE_get_ex_new_index, ENGINE_set_ex_data, ENGINE_get_ex_data,
EVP_PKEY_get_ex_new_index, EVP_PKEY_set_ex_data, EVP_PKEY_get_ex_data,
RSA_get_ex_new_index, RSA_set_ex_data, RSA_get_ex_data,
RSA_set_app_data, RSA_get_app_data,
SSL_get_ex_new_index, SSL_set_ex_data, SSL_get_ex_data,
SSL_set_app_data, SSL_get_app_data,
SSL_CTX_get_ex_new_index, SSL_CTX_set_ex_data, SSL_CTX_get_ex_data,
SSL_CTX_set_app_data, SSL_CTX_get_app_data,
SSL_SESSION_get_ex_new_index, SSL_SESSION_set_ex_data, SSL_SESSION_get_ex_data,
SSL_SESSION_set_app_data, SSL_SESSION_get_app_data,
UI_get_ex_new_index, UI_set_ex_data, UI_get_ex_data,
UI_set_app_data, UI_get_app_data,
X509_STORE_CTX_get_ex_new_index, X509_STORE_CTX_set_ex_data, X509_STORE_CTX_get_ex_data,
X509_STORE_CTX_set_app_data, X509_STORE_CTX_get_app_data,
X509_STORE_get_ex_new_index, X509_STORE_set_ex_data, X509_STORE_get_ex_data,
X509_get_ex_new_index, X509_set_ex_data, X509_get_ex_data
- application-specific data

## 技术正文

## NAME


BIO_get_ex_new_index, BIO_set_ex_data, BIO_get_ex_data,
BIO_set_app_data, BIO_get_app_data,
DH_get_ex_new_index, DH_set_ex_data, DH_get_ex_data,
DSA_get_ex_new_index, DSA_set_ex_data, DSA_get_ex_data,
EC_KEY_get_ex_new_index, EC_KEY_set_ex_data, EC_KEY_get_ex_data,
ENGINE_get_ex_new_index, ENGINE_set_ex_data, ENGINE_get_ex_data,
EVP_PKEY_get_ex_new_index, EVP_PKEY_set_ex_data, EVP_PKEY_get_ex_data,
RSA_get_ex_new_index, RSA_set_ex_data, RSA_get_ex_data,
RSA_set_app_data, RSA_get_app_data,
SSL_get_ex_new_index, SSL_set_ex_data, SSL_get_ex_data,
SSL_set_app_data, SSL_get_app_data,
SSL_CTX_get_ex_new_index, SSL_CTX_set_ex_data, SSL_CTX_get_ex_data,
SSL_CTX_set_app_data, SSL_CTX_get_app_data,
SSL_SESSION_get_ex_new_index, SSL_SESSION_set_ex_data, SSL_SESSION_get_ex_data,
SSL_SESSION_set_app_data, SSL_SESSION_get_app_data,
UI_get_ex_new_index, UI_set_ex_data, UI_get_ex_data,
UI_set_app_data, UI_get_app_data,
X509_STORE_CTX_get_ex_new_index, X509_STORE_CTX_set_ex_data, X509_STORE_CTX_get_ex_data,
X509_STORE_CTX_set_app_data, X509_STORE_CTX_get_app_data,
X509_STORE_get_ex_new_index, X509_STORE_set_ex_data, X509_STORE_get_ex_data,
X509_get_ex_new_index, X509_set_ex_data, X509_get_ex_data
- application-specific data

## SYNOPSIS



```c
#include <openssl/x509.h>

int TYPE_get_ex_new_index(long argl, void *argp,
                          CRYPTO_EX_new *new_func,
                          CRYPTO_EX_dup *dup_func,
                          CRYPTO_EX_free *free_func);

int TYPE_set_ex_data(TYPE *d, int idx, void *arg);

void *TYPE_get_ex_data(const TYPE *d, int idx);

#define TYPE_set_app_data(TYPE *d, void *arg)
#define TYPE_get_app_data(TYPE *d)

```

The following functions have been deprecated since OpenSSL 3.0, and can be
hidden entirely by defining **OPENSSL_API_COMPAT** with a suitable version value,
see openssl_user_macros(7):

```c
int DH_get_ex_new_index(long argl, void *argp, CRYPTO_EX_new *new_func,
                        CRYPTO_EX_dup *dup_func, CRYPTO_EX_free *free_func);
int DH_set_ex_data(DH *type, int idx, void *arg);
void *DH_get_ex_data(DH *type, int idx);
int DSA_get_ex_new_index(long argl, void *argp, CRYPTO_EX_new *new_func,
                         CRYPTO_EX_dup *dup_func, CRYPTO_EX_free *free_func);
int DSA_set_ex_data(DSA *type, int idx, void *arg);
void *DSA_get_ex_data(DSA *type, int idx);
int EC_KEY_get_ex_new_index(long argl, void *argp, CRYPTO_EX_new *new_func,
                            CRYPTO_EX_dup *dup_func, CRYPTO_EX_free *free_func);
int EC_KEY_set_ex_data(EC_KEY *type, int idx, void *arg);
void *EC_KEY_get_ex_data(EC_KEY *type, int idx);
int RSA_get_ex_new_index(long argl, void *argp, CRYPTO_EX_new *new_func,
                         CRYPTO_EX_dup *dup_func, CRYPTO_EX_free *free_func);
int RSA_set_ex_data(RSA *type, int idx, void *arg);
void *RSA_get_ex_data(RSA *type, int idx);
int RSA_set_app_data(RSA *type, void *arg);
void *RSA_get_app_data(RSA *type);
int ENGINE_get_ex_new_index(long argl, void *argp, CRYPTO_EX_new *new_func,
                            CRYPTO_EX_dup *dup_func, CRYPTO_EX_free *free_func);
int ENGINE_set_ex_data(ENGINE *type, int idx, void *arg);
void *ENGINE_get_ex_data(ENGINE *type, int idx);

```

## DESCRIPTION


In the description here, `TYPE` is used a placeholder
for any of the OpenSSL datatypes listed in CRYPTO_get_ex_new_index(3).

All functions with a `TYPE` of **DH**, **DSA**, **RSA** and **EC_KEY** are deprecated.
Applications should instead use EVP_PKEY_set_ex_data(),
EVP_PKEY_get_ex_data() and EVP_PKEY_get_ex_new_index().

All functions with a `TYPE` of **ENGINE** are deprecated.
Applications using engines should be replaced by providers.

These functions handle application-specific data for OpenSSL data
structures.

TYPE_get_ex_new_index() is a macro that calls CRYPTO_get_ex_new_index()
with the correct **index** value.

TYPE_set_ex_data() is a function that calls CRYPTO_set_ex_data() with
an offset into the opaque exdata part of the TYPE object. `d` **MUST NOT** be NULL.

TYPE_get_ex_data() is a function that calls CRYPTO_get_ex_data() with
an offset into the opaque exdata part of the TYPE object. `d` **MUST NOT** be NULL.

For compatibility with previous releases, the exdata index of zero is
reserved for "application data." There are two convenience functions for
this.
TYPE_set_app_data() is a macro that invokes TYPE_set_ex_data() with
**idx** set to zero.
TYPE_get_app_data() is a macro that invokes TYPE_get_ex_data() with
**idx** set to zero.

## RETURN VALUES


TYPE_get_ex_new_index() returns a new index on success or -1 on error.

TYPE_set_ex_data() returns 1 on success or 0 on error.

TYPE_get_ex_data() returns the application data or NULL if an error occurred.

## SEE ALSO


CRYPTO_get_ex_new_index(3).

## HISTORY


The functions DH_get_ex_new_index(), DH_set_ex_data(), DH_get_ex_data(),
DSA_get_ex_new_index(), DSA_set_ex_data(), DSA_get_ex_data(),
EC_KEY_get_ex_new_index(), EC_KEY_set_ex_data(), EC_KEY_get_ex_data(),
ENGINE_get_ex_new_index(), ENGINE_set_ex_data(), ENGINE_get_ex_data(),
RSA_get_ex_new_index(), RSA_set_ex_data(), RSA_get_ex_data(),
RSA_set_app_data() and RSA_get_app_data() were deprecated in OpenSSL 3.0.

## COPYRIGHT


Copyright 2015-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BIO_get_ex_new_index.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_get_ex_new_index.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BIO_get_ex_new_index.pod`；SHA-256：`b88a836be07cfad6e49dbbbc754bf79f5510c000c419edce8b22f13ad6c96167`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
