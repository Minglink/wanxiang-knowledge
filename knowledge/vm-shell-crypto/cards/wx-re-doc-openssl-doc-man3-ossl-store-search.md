---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-store-search",
  "title": "OpenSSL：密码实现与接口 · OSSL_STORE_SEARCH（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_STORE_SEARCH"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "bd417c2378326dc6223699b5683ced5361e089bcfd03a2b944433851ae54303b",
  "generatedHash": "f84641339fdcae9e69427f02acb8c7844da8917a1c79fcbedf1e8c2e356abea2",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_STORE_SEARCH, OSSL_STORE_SEARCH_by_name, OSSL_STORE_SEARCH_by_issuer_serial, OSSL_STORE_SEARCH_by_key_fingerprint, OSSL_STORE_SEARCH_by_alias, OSSL_STORE_SEARCH_free, OSSL_STORE_SEARCH_get_type, OSSL_STORE_SEARCH_get0_name, OSSL_STORE_SEARCH_get0_serial, OSSL_STORE_SEARCH_get0_bytes, OSSL_STORE",
  "l1": "These functions are used to specify search criteria to help search for specific objects through other names than just the URI that's given to OSSL_STORE_open(). For example, this can be useful for an application that has received a URI and then wants to add on search criteria in a uniform and supported manner. **OSSL_STORE_SEARCH** is an opaque type that holds the constructed search criterion, and that can be given to an OSSL_STORE context with OSSL_STORE_find(). The calling application owns the allocation of an **OSSL_STORE_SEARCH** at all times, and should therefore be careful not to deallocate it before OSSL_STORE_close() has been called for the OSSL_STORE context it was given to. OSSL_STORE_SEARCH_by_name(), OSSL_STORE_SEARCH_by_issuer_serial(), OSSL_STORE_SEARCH_by_key_fingerprint(), and OSSL_STORE_SEARCH_by_alias() are used to creat",
  "questions": [
    "OSSL_STORE_SEARCH 如何用于密码实现与接口？",
    "OSSL_STORE_SEARCH 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-store-search",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_STORE_SEARCH.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_STORE_SEARCH（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_STORE_SEARCH,
OSSL_STORE_SEARCH_by_name,
OSSL_STORE_SEARCH_by_issuer_serial,
OSSL_STORE_SEARCH_by_key_fingerprint,
OSSL_STORE_SEARCH_by_alias,
OSSL_STORE_SEARCH_free,
OSSL_STORE_SEARCH_get_type,
OSSL_STORE_SEARCH_get0_name,
OSSL_STORE_SEARCH_get0_serial,
OSSL_STORE_SEARCH_get0_bytes,
OSSL_STORE_SEARCH_get0_string,
OSSL_STORE_SEARCH_get0_digest
- Type and functions to create OSSL_STORE search criteria

## 技术正文

## NAME


OSSL_STORE_SEARCH,
OSSL_STORE_SEARCH_by_name,
OSSL_STORE_SEARCH_by_issuer_serial,
OSSL_STORE_SEARCH_by_key_fingerprint,
OSSL_STORE_SEARCH_by_alias,
OSSL_STORE_SEARCH_free,
OSSL_STORE_SEARCH_get_type,
OSSL_STORE_SEARCH_get0_name,
OSSL_STORE_SEARCH_get0_serial,
OSSL_STORE_SEARCH_get0_bytes,
OSSL_STORE_SEARCH_get0_string,
OSSL_STORE_SEARCH_get0_digest
- Type and functions to create OSSL_STORE search criteria

## SYNOPSIS


```c
#include <openssl/store.h>

typedef struct ossl_store_search_st OSSL_STORE_SEARCH;

OSSL_STORE_SEARCH *OSSL_STORE_SEARCH_by_name(X509_NAME *name);
OSSL_STORE_SEARCH *OSSL_STORE_SEARCH_by_issuer_serial(X509_NAME *name,
                                                      const ASN1_INTEGER
                                                      *serial);
OSSL_STORE_SEARCH *OSSL_STORE_SEARCH_by_key_fingerprint(const EVP_MD *digest,
                                                        const unsigned char
                                                        *bytes, int len);
OSSL_STORE_SEARCH *OSSL_STORE_SEARCH_by_alias(const char *alias);

void OSSL_STORE_SEARCH_free(OSSL_STORE_SEARCH *search);

int OSSL_STORE_SEARCH_get_type(const OSSL_STORE_SEARCH *criterion);
X509_NAME *OSSL_STORE_SEARCH_get0_name(OSSL_STORE_SEARCH *criterion);
const ASN1_INTEGER *OSSL_STORE_SEARCH_get0_serial(const OSSL_STORE_SEARCH
                                                  *criterion);
const unsigned char *OSSL_STORE_SEARCH_get0_bytes(const OSSL_STORE_SEARCH
                                                  *criterion, size_t *length);
const char *OSSL_STORE_SEARCH_get0_string(const OSSL_STORE_SEARCH *criterion);
const EVP_MD *OSSL_STORE_SEARCH_get0_digest(const OSSL_STORE_SEARCH
                                            *criterion);

```

## DESCRIPTION


These functions are used to specify search criteria to help search for specific
objects through other names than just the URI that's given to OSSL_STORE_open().
For example, this can be useful for an application that has received a URI
and then wants to add on search criteria in a uniform and supported manner.

### Types


**OSSL_STORE_SEARCH** is an opaque type that holds the constructed search
criterion, and that can be given to an OSSL_STORE context with
OSSL_STORE_find().

The calling application owns the allocation of an **OSSL_STORE_SEARCH** at all
times, and should therefore be careful not to deallocate it before
OSSL_STORE_close() has been called for the OSSL_STORE context it was given
to.

### Application Functions


OSSL_STORE_SEARCH_by_name(),
OSSL_STORE_SEARCH_by_issuer_serial(),
OSSL_STORE_SEARCH_by_key_fingerprint(),
and OSSL_STORE_SEARCH_by_alias()
are used to create an **OSSL_STORE_SEARCH** from a subject name, an issuer name
and serial number pair, a key fingerprint, and an alias (for example a friendly
name).
The parameters that are provided are not copied, only referred to in a
criterion, so they must have at least the same life time as the created
**OSSL_STORE_SEARCH**.

OSSL_STORE_SEARCH_free() is used to free the **OSSL_STORE_SEARCH**.
If the argument is NULL, nothing is done.

### Loader Functions


OSSL_STORE_SEARCH_get_type() returns the criterion type for the given
**OSSL_STORE_SEARCH**.

OSSL_STORE_SEARCH_get0_name(), OSSL_STORE_SEARCH_get0_serial(),
OSSL_STORE_SEARCH_get0_bytes(), OSSL_STORE_SEARCH_get0_string(),
and OSSL_STORE_SEARCH_get0_digest()
are used to retrieve different data from a **OSSL_STORE_SEARCH**, as
available for each type.
For more information, see /SUPPORTED CRITERION TYPES below.

## SUPPORTED CRITERION TYPES


Currently supported criterion types are:


- OSSL_STORE_SEARCH_BY_NAME

This criterion supports a search by exact match of subject name.
The subject name itself is a **X509_NAME** pointer.
A criterion of this type is created with OSSL_STORE_SEARCH_by_name(),
and the actual subject name is retrieved with OSSL_STORE_SEARCH_get0_name().

- OSSL_STORE_SEARCH_BY_ISSUER_SERIAL

This criterion supports a search by exact match of both issuer name and serial
number.
The issuer name itself is a **X509_NAME** pointer, and the serial number is
a **ASN1_INTEGER** pointer.
A criterion of this type is created with OSSL_STORE_SEARCH_by_issuer_serial()
and the actual issuer name and serial number are retrieved with
OSSL_STORE_SEARCH_get0_name() and OSSL_STORE_SEARCH_get0_serial().

- OSSL_STORE_SEARCH_BY_KEY_FINGERPRINT

This criterion supports a search by exact match of key fingerprint.
The key fingerprint in itself is a string of bytes and its length, as
well as the algorithm that was used to compute the fingerprint.
The digest may be left unspecified (NULL), and in that case, the
loader has to decide on a default digest and compare fingerprints
accordingly.
A criterion of this type is created with OSSL_STORE_SEARCH_by_key_fingerprint()
and the actual fingerprint and its length can be retrieved with
OSSL_STORE_SEARCH_get0_bytes().
The digest can be retrieved with OSSL_STORE_SEARCH_get0_digest().

- OSSL_STORE_SEARCH_BY_ALIAS

This criterion supports a search by match of an alias of some kind.
The alias in itself is a simple C string.
A criterion of this type is created with OSSL_STORE_SEARCH_by_alias()
and the actual alias is retrieved with OSSL_STORE_SEARCH_get0_string().


## RETURN VALUES


OSSL_STORE_SEARCH_by_name(),
OSSL_STORE_SEARCH_by_issuer_serial(),
OSSL_STORE_SEARCH_by_key_fingerprint(),
and OSSL_STORE_SEARCH_by_alias()
return a **OSSL_STORE_SEARCH** pointer on success, or NULL on failure.

OSSL_STORE_SEARCH_get_type() returns the criterion type of the given
**OSSL_STORE_SEARCH**.
There is no error value.

OSSL_STORE_SEARCH_get0_name() returns a **X509_NAME** pointer on success,
or NULL when the given **OSSL_STORE_SEARCH** was of a different type.

OSSL_STORE_SEARCH_get0_serial() returns a **ASN1_INTEGER** pointer on success,
or NULL when the given **OSSL_STORE_SEARCH** was of a different type.

OSSL_STORE_SEARCH_get0_bytes() returns a **const unsigned char** pointer and
sets `*length` to the strings length on success, or NULL when the given
**OSSL_STORE_SEARCH** was of a different type.

OSSL_STORE_SEARCH_get0_string() returns a **const char** pointer on success,
or NULL when the given **OSSL_STORE_SEARCH** was of a different type.

OSSL_STORE_SEARCH_get0_digest() returns a **const EVP_MD** pointer.
NULL is a valid value and means that the store loader default will
be used when applicable.

## SEE ALSO


ossl_store(7), OSSL_STORE_supports_search(3), OSSL_STORE_find(3)

## HISTORY


**OSSL_STORE_SEARCH**,
OSSL_STORE_SEARCH_by_name(),
OSSL_STORE_SEARCH_by_issuer_serial(),
OSSL_STORE_SEARCH_by_key_fingerprint(),
OSSL_STORE_SEARCH_by_alias(),
OSSL_STORE_SEARCH_free(),
OSSL_STORE_SEARCH_get_type(),
OSSL_STORE_SEARCH_get0_name(),
OSSL_STORE_SEARCH_get0_serial(),
OSSL_STORE_SEARCH_get0_bytes(),
and OSSL_STORE_SEARCH_get0_string()
were added in OpenSSL 1.1.1.

## COPYRIGHT


Copyright 2018-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_STORE_SEARCH.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_STORE_SEARCH.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_STORE_SEARCH.pod`；SHA-256：`bd417c2378326dc6223699b5683ced5361e089bcfd03a2b944433851ae54303b`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
