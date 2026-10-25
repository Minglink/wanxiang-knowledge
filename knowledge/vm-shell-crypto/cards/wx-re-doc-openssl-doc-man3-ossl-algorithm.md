---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-algorithm",
  "title": "OpenSSL：密码实现与接口 · OSSL_ALGORITHM（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_ALGORITHM"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "426ee9dde0fc5ff8b0b11fbe02bd621c4c169f9d486f12eab1be32b803f1219f",
  "generatedHash": "107d0646eb8afaf08377e3b19e0a412f5bed3963786d9d1afdea93b83565c4e9",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_ALGORITHM - OpenSSL Core type to define a fetchable algorithm",
  "l1": "The **OSSL_ALGORITHM** type is a `public structure` that describes an algorithm that a provider(7) provides. Arrays of this type are returned by providers on demand from the OpenSSL libraries to describe what algorithms the providers provide implementations of, and with what properties. Arrays of this type must be terminated with a tuple where `algorithm_names` is NULL. This type of array is typically returned by the provider's operation querying function, further described in provider-base(7)/Provider Functions. This string is a colon separated set of names / identities, and is used by the appropriate fetching functionality (such as EVP_CIPHER_fetch(3), EVP_MD_fetch(3), etc) to find the desired algorithm. Multiple names / identities allow a specific algorithm implementation to be fetched multiple ways. For example, the RSA algorithm has ",
  "questions": [
    "OSSL_ALGORITHM 如何用于密码实现与接口？",
    "OSSL_ALGORITHM 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-algorithm",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_ALGORITHM.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_ALGORITHM（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_ALGORITHM - OpenSSL Core type to define a fetchable algorithm

## 技术正文

## NAME


OSSL_ALGORITHM - OpenSSL Core type to define a fetchable algorithm

## SYNOPSIS


```c
#include <openssl/core.h>

typedef struct ossl_algorithm_st OSSL_ALGORITHM;
struct ossl_algorithm_st {
    const char *algorithm_names;     /* key */
    const char *property_definition; /* key */
    const OSSL_DISPATCH *implementation;
    const char *algorithm_description;
};

```

## DESCRIPTION


The **OSSL_ALGORITHM** type is a `public structure` that describes an
algorithm that a provider(7) provides.  Arrays of this type are returned
by providers on demand from the OpenSSL libraries to describe what
algorithms the providers provide implementations of, and with what
properties.

Arrays of this type must be terminated with a tuple where `algorithm_names`
is NULL.

This type of array is typically returned by the provider's operation querying
function, further described in provider-base(7)/Provider Functions.

### **OSSL_ALGORITHM** fields



- `algorithm_names`

This string is a colon separated set of names / identities, and is used by
the appropriate fetching functionality (such as EVP_CIPHER_fetch(3),
EVP_MD_fetch(3), etc) to find the desired algorithm.

Multiple names / identities allow a specific algorithm implementation to be
fetched multiple ways.  For example, the RSA algorithm has the following
known identities:


- *

`RSA`

- *

`rsaEncryption`

This is the name of the algorithm's OBJECT IDENTIFIER (OID), as given by the
PKCS#1 RFC's ASN.1 module

- *

`1.2.840.113549.1.1.1`

This is the OID itself for `rsaEncryption`, in canonical decimal text form.


The resulting `algorithm_names` string would look like this:

```c
"RSA:rsaEncryption:1.2.840.113549.1.1.1"

```

The OpenSSL libraries use the first of the algorithm names as the main
or canonical name, on a per algorithm implementation basis.

See the notes /On the subject of algorithm names below for a more in
depth discussion on `algorithm_names` and how that may interact with
applications and libraries, including OpenSSL's.

- `property_definition`

This string defines a set of properties associated with a particular
algorithm implementation, and is used by the appropriate fetching
functionality (such as EVP_CIPHER_fetch(3), EVP_MD_fetch(3), etc) for
a finer grained lookup of an algorithm implementation, which is useful in
case multiple implementations of the same algorithm are available.

See property(7) for a further description of the contents of this
string.

- `implementation`

Pointer to an OSSL_DISPATCH(3) array, containing pointers to the
functions of a particular algorithm implementation.

- `algorithm_description`

A string with a short human-readable description of the algorithm.


## NOTES


### On the subject of algorithm names


Providers may find the need to register ASN.1 OIDs for algorithms using
OBJ_create(3) (via the **core_obj_create** upcall described in
provider-base(7), because some application or library -- possibly still
the OpenSSL libraries, even -- use NIDs to look up algorithms.

In that scenario, you must make sure that the corresponding **OSSL_ALGORITHM**'s
`algorithm_names` includes both the short and the long name.

Most of the time, registering ASN.1 OIDs like this shouldn't be necessary,
and applications and libraries are encouraged to use OBJ_obj2txt(3) to
get a text representation of the OID, which may be a long or short name for
OIDs that are registered, or the OID itself in canonical decimal text form
if not (or if OBJ_obj2txt(3) is called with `no_name` = 1).

It's recommended to make sure that the corresponding **OSSL_ALGORITHM**'s
`algorithm_names` include known names as well as the OID itself in
canonical decimal text form.  That should cover all scenarios.


## SEE ALSO


crypto(7), provider-base(7), openssl-core.h(7),
openssl-core_dispatch.h(7), OSSL_DISPATCH(3)

## HISTORY


**OSSL_ALGORITHM** was added in OpenSSL 3.0

## COPYRIGHT


Copyright 2022 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_ALGORITHM.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_ALGORITHM.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_ALGORITHM.pod`；SHA-256：`426ee9dde0fc5ff8b0b11fbe02bd621c4c169f9d486f12eab1be32b803f1219f`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
