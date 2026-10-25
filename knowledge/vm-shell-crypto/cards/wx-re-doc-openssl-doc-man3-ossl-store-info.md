---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-store-info",
  "title": "OpenSSL：密码实现与接口 · OSSL_STORE_INFO（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_STORE_INFO"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "a70b9e43494ae0b3998a87a5b8c91f2c61e5dc13587d70dba0f2acae86fcec2e",
  "generatedHash": "36c76f6eb9baeee4c22456ab724629595a8097241bd924343b1bc1b4b559cd1d",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_STORE_INFO, OSSL_STORE_INFO_get_type, OSSL_STORE_INFO_get0_NAME, OSSL_STORE_INFO_get0_NAME_description, OSSL_STORE_INFO_get0_PARAMS, OSSL_STORE_INFO_get0_PUBKEY, OSSL_STORE_INFO_get0_PKEY, OSSL_STORE_INFO_get0_CERT, OSSL_STORE_INFO_get0_CRL, OSSL_STORE_INFO_get1_NAME, OSSL_STORE_INFO_get1_NAME_",
  "l1": "These functions are primarily useful for applications to retrieve supported objects from **OSSL_STORE_INFO** objects and for scheme specific loaders to create **OSSL_STORE_INFO** holders. **OSSL_STORE_INFO** is an opaque type that's just an intermediary holder for the objects that have been retrieved by OSSL_STORE_load() and similar functions. Supported OpenSSL type object can be extracted using one of STORE_INFO_get0_<TYPE>() where <TYPE> can be NAME, PARAMS, PKEY, CERT, or CRL. The life time of this extracted object is as long as the life time of the **OSSL_STORE_INFO** it was extracted from, so care should be taken not to free the latter too early. As an alternative, STORE_INFO_get1_<TYPE>() extracts a duplicate (or the same object with its reference count increased), which can be used after the containing **OSSL_STORE_INFO** has been ",
  "questions": [
    "OSSL_STORE_INFO 如何用于密码实现与接口？",
    "OSSL_STORE_INFO 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-store-info",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_STORE_INFO.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_STORE_INFO（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_STORE_INFO, OSSL_STORE_INFO_get_type, OSSL_STORE_INFO_get0_NAME,
OSSL_STORE_INFO_get0_NAME_description,
OSSL_STORE_INFO_get0_PARAMS, OSSL_STORE_INFO_get0_PUBKEY,
OSSL_STORE_INFO_get0_PKEY, OSSL_STORE_INFO_get0_CERT, OSSL_STORE_INFO_get0_CRL,
OSSL_STORE_INFO_get1_NAME, OSSL_STORE_INFO_get1_NAME_description,
OSSL_STORE_INFO_get1_PARAMS, OSSL_STORE_INFO_get1_PUBKEY,
OSSL_STORE_INFO_get1_PKEY, OSSL_STORE_INFO_get1_CERT, OSSL_STORE_INFO_get1_CRL,
OSSL_STORE_INFO_type_string, OSSL_STORE_INFO_free,
OSSL_STORE_INFO_new_NAME, OSSL_STORE_INFO_set0_NAME_description,
OSSL_STORE_INFO_new_PARAMS, OSSL_STORE_INFO_new_PUBKEY,
OSSL_STORE_INFO_new_PKEY, OSSL_STORE_INFO_new_CERT, OSSL_STORE_INFO_new_CRL,
OSSL_STORE_INFO_new, OSSL_STORE_INFO_get0_data
- Functions to manipulate OSSL_STORE_INFO objects

## 技术正文

## NAME


OSSL_STORE_INFO, OSSL_STORE_INFO_get_type, OSSL_STORE_INFO_get0_NAME,
OSSL_STORE_INFO_get0_NAME_description,
OSSL_STORE_INFO_get0_PARAMS, OSSL_STORE_INFO_get0_PUBKEY,
OSSL_STORE_INFO_get0_PKEY, OSSL_STORE_INFO_get0_CERT, OSSL_STORE_INFO_get0_CRL,
OSSL_STORE_INFO_get1_NAME, OSSL_STORE_INFO_get1_NAME_description,
OSSL_STORE_INFO_get1_PARAMS, OSSL_STORE_INFO_get1_PUBKEY,
OSSL_STORE_INFO_get1_PKEY, OSSL_STORE_INFO_get1_CERT, OSSL_STORE_INFO_get1_CRL,
OSSL_STORE_INFO_type_string, OSSL_STORE_INFO_free,
OSSL_STORE_INFO_new_NAME, OSSL_STORE_INFO_set0_NAME_description,
OSSL_STORE_INFO_new_PARAMS, OSSL_STORE_INFO_new_PUBKEY,
OSSL_STORE_INFO_new_PKEY, OSSL_STORE_INFO_new_CERT, OSSL_STORE_INFO_new_CRL,
OSSL_STORE_INFO_new, OSSL_STORE_INFO_get0_data
- Functions to manipulate OSSL_STORE_INFO objects

## SYNOPSIS


```c
#include <openssl/store.h>

typedef struct ossl_store_info_st OSSL_STORE_INFO;

int OSSL_STORE_INFO_get_type(const OSSL_STORE_INFO *store_info);
const char *OSSL_STORE_INFO_get0_NAME(const OSSL_STORE_INFO *store_info);
char *OSSL_STORE_INFO_get1_NAME(const OSSL_STORE_INFO *store_info);
const char *OSSL_STORE_INFO_get0_NAME_description(const OSSL_STORE_INFO
                                                  *store_info);
char *OSSL_STORE_INFO_get1_NAME_description(const OSSL_STORE_INFO *store_info);
EVP_PKEY *OSSL_STORE_INFO_get0_PARAMS(const OSSL_STORE_INFO *store_info);
EVP_PKEY *OSSL_STORE_INFO_get1_PARAMS(const OSSL_STORE_INFO *store_info);
EVP_PKEY *OSSL_STORE_INFO_get0_PUBKEY(const OSSL_STORE_INFO *info);
EVP_PKEY *OSSL_STORE_INFO_get1_PUBKEY(const OSSL_STORE_INFO *info);
EVP_PKEY *OSSL_STORE_INFO_get0_PKEY(const OSSL_STORE_INFO *store_info);
EVP_PKEY *OSSL_STORE_INFO_get1_PKEY(const OSSL_STORE_INFO *store_info);
X509 *OSSL_STORE_INFO_get0_CERT(const OSSL_STORE_INFO *store_info);
X509 *OSSL_STORE_INFO_get1_CERT(const OSSL_STORE_INFO *store_info);
X509_CRL *OSSL_STORE_INFO_get0_CRL(const OSSL_STORE_INFO *store_info);
X509_CRL *OSSL_STORE_INFO_get1_CRL(const OSSL_STORE_INFO *store_info);

const char *OSSL_STORE_INFO_type_string(int type);

void OSSL_STORE_INFO_free(OSSL_STORE_INFO *store_info);

OSSL_STORE_INFO *OSSL_STORE_INFO_new_NAME(char *name);
int OSSL_STORE_INFO_set0_NAME_description(OSSL_STORE_INFO *info, char *desc);
OSSL_STORE_INFO *OSSL_STORE_INFO_new_PARAMS(DSA *dsa_params);
OSSL_STORE_INFO *OSSL_STORE_INFO_new_PUBKEY(EVP_PKEY *pubkey);
OSSL_STORE_INFO *OSSL_STORE_INFO_new_PKEY(EVP_PKEY *pkey);
OSSL_STORE_INFO *OSSL_STORE_INFO_new_CERT(X509 *x509);
OSSL_STORE_INFO *OSSL_STORE_INFO_new_CRL(X509_CRL *crl);

OSSL_STORE_INFO *OSSL_STORE_INFO_new(int type, void *data);
void *OSSL_STORE_INFO_get0_data(int type, const OSSL_STORE_INFO *info);

```

## DESCRIPTION


These functions are primarily useful for applications to retrieve
supported objects from **OSSL_STORE_INFO** objects and for scheme specific
loaders to create **OSSL_STORE_INFO** holders.

### Types


**OSSL_STORE_INFO** is an opaque type that's just an intermediary holder for
the objects that have been retrieved by OSSL_STORE_load() and similar functions.
Supported OpenSSL type object can be extracted using one of
STORE_INFO_get0_<TYPE>() where <TYPE> can be NAME, PARAMS, PKEY, CERT, or CRL.
The life time of this extracted object is as long as the life time of
the **OSSL_STORE_INFO** it was extracted from, so care should be taken not
to free the latter too early.
As an alternative, STORE_INFO_get1_<TYPE>() extracts a duplicate (or the
same object with its reference count increased), which can be used
after the containing **OSSL_STORE_INFO** has been freed.
The object returned by STORE_INFO_get1_<TYPE>() must be freed separately
by the caller.
See /SUPPORTED OBJECTS for more information on the types that are supported.

### Functions


OSSL_STORE_INFO_get_type() takes a **OSSL_STORE_INFO** and returns the STORE
type number for the object inside.

STORE_INFO_get_type_string() takes a STORE type number and returns a
short string describing it.

OSSL_STORE_INFO_get0_NAME(), OSSL_STORE_INFO_get0_NAME_description(),
OSSL_STORE_INFO_get0_PARAMS(), OSSL_STORE_INFO_get0_PUBKEY(),
OSSL_STORE_INFO_get0_PKEY(), OSSL_STORE_INFO_get0_CERT(),
OSSL_STORE_INFO_get0_CRL()
all take a **OSSL_STORE_INFO** and return the object it holds if the
**OSSL_STORE_INFO** type (as returned by OSSL_STORE_INFO_get_type())
matches the function, otherwise NULL.

OSSL_STORE_INFO_get1_NAME(), OSSL_STORE_INFO_get1_NAME_description(),
OSSL_STORE_INFO_get1_PARAMS(), OSSL_STORE_INFO_get1_PUBKEY(),
OSSL_STORE_INFO_get1_PKEY(), OSSL_STORE_INFO_get1_CERT() and
OSSL_STORE_INFO_get1_CRL()
all take a **OSSL_STORE_INFO** and return a duplicate the object it
holds if the **OSSL_STORE_INFO** type (as returned by
OSSL_STORE_INFO_get_type()) matches the function, otherwise NULL.

OSSL_STORE_INFO_free() frees a **OSSL_STORE_INFO** and its contained type.
If the argument is NULL, nothing is done.

OSSL_STORE_INFO_new_NAME() , OSSL_STORE_INFO_new_PARAMS(),
, OSSL_STORE_INFO_new_PUBKEY(), OSSL_STORE_INFO_new_PKEY(),
OSSL_STORE_INFO_new_CERT() and OSSL_STORE_INFO_new_CRL()
create a **OSSL_STORE_INFO** object to hold the given input object.
On success the input object is consumed.

Additionally, for **OSSL_STORE_INFO_NAME** objects,
OSSL_STORE_INFO_set0_NAME_description() can be used to add an extra
description.
This description is meant to be human readable and should be used for
information printout.

OSSL_STORE_INFO_new() creates a **OSSL_STORE_INFO** with an arbitrary `type`
number and `data` structure.  It's the responsibility of the caller to
define type numbers other than the ones defined by F<< <openssl/store.h> >>,
and to handle freeing the associated data structure on their own.
I<Using type numbers that are defined by F<< <openssl/store.h> >> may cause
undefined behaviours, including crashes>.

OSSL_STORE_INFO_get0_data() returns the data pointer that was passed to
OSSL_STORE_INFO_new() if `type` matches the type number in `info`.

OSSL_STORE_INFO_new() and OSSL_STORE_INFO_get0_data() may be useful for
applications that define their own STORE data, but must be used with care.

## SUPPORTED OBJECTS


Currently supported object types are:


- OSSL_STORE_INFO_NAME

A name is exactly that, a name.
It's like a name in a directory, but formatted as a complete URI.
For example, the path in URI `file:/foo/bar/` could include a file
named `cookie.pem`, and in that case, the returned **OSSL_STORE_INFO_NAME**
object would have the URI `file:/foo/bar/cookie.pem`, which can be
used by the application to get the objects in that file.
This can be applied to all schemes that can somehow support a listing
of object URIs.

For `file:` URIs that are used without the explicit scheme, the
returned name will be the path of each object, so if `/foo/bar` was
given and that path has the file `cookie.pem`, the name
`/foo/bar/cookie.pem` will be returned.

The returned URI is considered canonical and must be unique and permanent
for the storage where the object (or collection of objects) resides.
Each loader is responsible for ensuring that it only returns canonical
URIs.
However, it's possible that certain schemes allow an object (or collection
thereof) to be reached with alternative URIs; just because one URI is
canonical doesn't mean that other variants can't be used.

At the discretion of the loader that was used to get these names, an
extra description may be attached as well.

- OSSL_STORE_INFO_PARAMS

Key parameters.

- OSSL_STORE_INFO_PKEY

A keypair or just a private key (possibly with key parameters).

- OSSL_STORE_INFO_PUBKEY

A public key (possibly with key parameters).

- OSSL_STORE_INFO_CERT

An X.509 certificate.

- OSSL_STORE_INFO_CRL

A X.509 certificate revocation list.


## RETURN VALUES


OSSL_STORE_INFO_get_type() returns the STORE type number of the given
**OSSL_STORE_INFO**.
There is no error value.

OSSL_STORE_INFO_get0_NAME(), OSSL_STORE_INFO_get0_NAME_description(),
OSSL_STORE_INFO_get0_PARAMS(), OSSL_STORE_INFO_get0_PKEY(),
OSSL_STORE_INFO_get0_CERT() and OSSL_STORE_INFO_get0_CRL() all return
a pointer to the OpenSSL object on success, NULL otherwise.

OSSL_STORE_INFO_get1_NAME(), OSSL_STORE_INFO_get1_NAME_description(),
OSSL_STORE_INFO_get1_PARAMS(), OSSL_STORE_INFO_get1_PKEY(),
OSSL_STORE_INFO_get1_CERT() and OSSL_STORE_INFO_get1_CRL() all return
a pointer to a duplicate of the OpenSSL object on success, NULL otherwise.

OSSL_STORE_INFO_type_string() returns a string on success, or NULL on
failure.

OSSL_STORE_INFO_new_NAME(), OSSL_STORE_INFO_new_PARAMS(),
OSSL_STORE_INFO_new_PKEY(), OSSL_STORE_INFO_new_CERT() and
OSSL_STORE_INFO_new_CRL() return a **OSSL_STORE_INFO**
pointer on success, or NULL on failure.

OSSL_STORE_INFO_set0_NAME_description() returns 1 on success, or 0 on
failure.

## SEE ALSO


ossl_store(7), OSSL_STORE_open(3), OSSL_STORE_register_loader(3)

## HISTORY


The OSSL_STORE API was added in OpenSSL 1.1.1.

The OSSL_STORE_INFO_PUBKEY object type was added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2016-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_STORE_INFO.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_STORE_INFO.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_STORE_INFO.pod`；SHA-256：`a70b9e43494ae0b3998a87a5b8c91f2c61e5dc13587d70dba0f2acae86fcec2e`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
