---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-pkey-get-attr",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY_get_attr（man3）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY_get_attr"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "d8e1e11ec9b0847732560c00fa12d07dfc059fa30993b11df429ef874f1697f9",
  "generatedHash": "b06121310e3e3188c6e53d07486632f3de82ea750aff73aca38eb44451a556f8",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY_get_attr, EVP_PKEY_get_attr_count, EVP_PKEY_get_attr_by_NID, EVP_PKEY_get_attr_by_OBJ, EVP_PKEY_delete_attr, EVP_PKEY_add1_attr, EVP_PKEY_add1_attr_by_OBJ, EVP_PKEY_add1_attr_by_NID, EVP_PKEY_add1_attr_by_txt - EVP_PKEY **X509_ATTRIBUTE** functions",
  "l1": "These functions are used by **PKCS12**. EVP_PKEY_get_attr_by_OBJ() finds the location of the first matching object `obj` in the `key` attribute list. The search starts at the position after `lastpos`. If the returned value is positive then it can be used on the next call to EVP_PKEY_get_attr_by_OBJ() as the value of `lastpos` in order to iterate through the remaining attributes. `lastpos` can be set to any negative value on the first call, in order to start searching from the start of the attribute list. EVP_PKEY_get_attr_by_NID() is similar to EVP_PKEY_get_attr_by_OBJ() except that it passes the numerical identifier (NID) `nid` associated with the object. See <openssl/obj_mac.h> for a list of NID_*. EVP_PKEY_get_attr() returns the **X509_ATTRIBUTE** object at index `loc` in the `key` attribute list. `loc` should be in the range from 0 to",
  "questions": [
    "EVP_PKEY_get_attr 如何用于非对称密钥与签名？",
    "EVP_PKEY_get_attr 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-pkey-get-attr",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_get_attr.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY_get_attr（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY_get_attr,
EVP_PKEY_get_attr_count,
EVP_PKEY_get_attr_by_NID, EVP_PKEY_get_attr_by_OBJ,
EVP_PKEY_delete_attr,
EVP_PKEY_add1_attr,
EVP_PKEY_add1_attr_by_OBJ, EVP_PKEY_add1_attr_by_NID, EVP_PKEY_add1_attr_by_txt
- EVP_PKEY **X509_ATTRIBUTE** functions

## 技术正文

## NAME


EVP_PKEY_get_attr,
EVP_PKEY_get_attr_count,
EVP_PKEY_get_attr_by_NID, EVP_PKEY_get_attr_by_OBJ,
EVP_PKEY_delete_attr,
EVP_PKEY_add1_attr,
EVP_PKEY_add1_attr_by_OBJ, EVP_PKEY_add1_attr_by_NID, EVP_PKEY_add1_attr_by_txt
- EVP_PKEY **X509_ATTRIBUTE** functions

## SYNOPSIS


```c
#include <openssl/x509.h>

int EVP_PKEY_get_attr_count(const EVP_PKEY *key);
int EVP_PKEY_get_attr_by_NID(const EVP_PKEY *key, int nid, int lastpos);
int EVP_PKEY_get_attr_by_OBJ(const EVP_PKEY *key, const ASN1_OBJECT *obj,
                             int lastpos);
X509_ATTRIBUTE *EVP_PKEY_get_attr(const EVP_PKEY *key, int loc);
X509_ATTRIBUTE *EVP_PKEY_delete_attr(EVP_PKEY *key, int loc);
int EVP_PKEY_add1_attr(EVP_PKEY *key, X509_ATTRIBUTE *attr);
int EVP_PKEY_add1_attr_by_OBJ(EVP_PKEY *key,
                              const ASN1_OBJECT *obj, int type,
                              const unsigned char *bytes, int len);
int EVP_PKEY_add1_attr_by_NID(EVP_PKEY *key,
                              int nid, int type,
                              const unsigned char *bytes, int len);
int EVP_PKEY_add1_attr_by_txt(EVP_PKEY *key,
                              const char *attrname, int type,
                              const unsigned char *bytes, int len);

```

## DESCRIPTION


These functions are used by **PKCS12**.

EVP_PKEY_get_attr_by_OBJ() finds the location of the first matching object `obj`
in the `key` attribute list. The search starts at the position after `lastpos`.
If the returned value is positive then it can be used on the next call to
EVP_PKEY_get_attr_by_OBJ() as the value of `lastpos` in order to iterate through
the remaining attributes. `lastpos` can be set to any negative value on the
first call, in order to start searching from the start of the attribute list.

EVP_PKEY_get_attr_by_NID() is similar to EVP_PKEY_get_attr_by_OBJ() except that
it passes the numerical identifier (NID) `nid` associated with the object.
See <openssl/obj_mac.h> for a list of NID_*.

EVP_PKEY_get_attr() returns the **X509_ATTRIBUTE** object at index `loc` in the
`key` attribute list. `loc` should be in the range from 0 to
EVP_PKEY_get_attr_count() - 1.

EVP_PKEY_delete_attr() removes the **X509_ATTRIBUTE** object at index `loc` in
the `key` attribute list.

EVP_PKEY_add1_attr() pushes a copy of the passed in **X509_ATTRIBUTE** object
to the `key` attribute list. A new `key` attribute list is created if required.
An error occurs if either `attr` is NULL, or the attribute already exists.

EVP_PKEY_add1_attr_by_OBJ() creates a new **X509_ATTRIBUTE** using
X509_ATTRIBUTE_set1_object() and X509_ATTRIBUTE_set1_data() to assign a new
`obj` with type `type` and data `bytes` of length `len` and then pushes it
to the `key` object's attribute list. If `obj` already exists in the attribute
list then an error occurs.

EVP_PKEY_add1_attr_by_NID() is similar to EVP_PKEY_add1_attr_by_OBJ() except
that it passes the numerical identifier (NID) `nid` associated with the object.
See <openssl/obj_mac.h> for a list of NID_*.

EVP_PKEY_add1_attr_by_txt() is similar to EVP_PKEY_add1_attr_by_OBJ() except
that it passes a name `attrname` associated with the object.
See <openssl/obj_mac.h> for a list of SN_* names.

## RETURN VALUES


EVP_PKEY_get_attr_count() returns the number of attributes in the `key` object
attribute list or -1 if the attribute list is NULL.

EVP_PKEY_get_attr_by_OBJ() returns -1 if either the list is empty OR the object
is not found, otherwise it returns the location of the object in the list.

EVP_PKEY_get_attr_by_NID() is similar to EVP_PKEY_get_attr_by_OBJ(), except that
it returns -2 if the `nid` is not known by OpenSSL.

EVP_PKEY_get_attr() returns either a **X509_ATTRIBUTE** or NULL if there is a
error.

EVP_PKEY_delete_attr() returns either the removed **X509_ATTRIBUTE** or NULL if
there is a error.

EVP_PKEY_add1_attr(), EVP_PKEY_add1_attr_by_OBJ(), EVP_PKEY_add1_attr_by_NID()
and EVP_PKEY_add1_attr_by_txt() return 1 on success or 0 otherwise.

## NOTES


A **EVP_PKEY** object's attribute list is initially NULL. All the above functions
listed will return an error unless EVP_PKEY_add1_attr() is called.
All functions listed assume that the `key` is not NULL.

## SEE ALSO


X509_ATTRIBUTE(3)

## COPYRIGHT


Copyright 2023-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_PKEY_get_attr.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_get_attr.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_PKEY_get_attr.pod`；SHA-256：`d8e1e11ec9b0847732560c00fa12d07dfc059fa30993b11df429ef874f1697f9`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
