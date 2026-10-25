---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-pkey-set-type",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY_set_type（man3）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY_set_type"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "f9e3a4cc4cc543dc0f24bc5cbb1831802dd22dc9712ac4e279c42f727eb2aee1",
  "generatedHash": "8469973b0dcf620a0d634bf9572bba806d2edd096693a8b13a43b6473d2e52d9",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY_set_type, EVP_PKEY_set_type_str, EVP_PKEY_set_type_by_keymgmt - functions to change the EVP_PKEY type",
  "l1": "All the functions described here behave the same in so far that they clear all the previous key data and methods from `pkey`, and reset it to be of the type of key given by the different arguments. If `pkey` is NULL, these functions will still return the same return values as if it wasn't. EVP_PKEY_set_type() initialises `pkey` to contain an internal legacy key. When doing this, it finds a EVP_PKEY_ASN1_METHOD(3) corresponding to `type`, and associates `pkey` with the findings. It is an error if no EVP_PKEY_ASN1_METHOD(3) could be found for `type`. EVP_PKEY_set_type_str() initialises `pkey` to contain an internal legacy key. When doing this, it finds a EVP_PKEY_ASN1_METHOD(3) corresponding to `str` that has then length `len`, and associates `pkey` with the findings. It is an error if no EVP_PKEY_ASN1_METHOD(3) could be found for `type`. F",
  "questions": [
    "EVP_PKEY_set_type 如何用于非对称密钥与签名？",
    "EVP_PKEY_set_type 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-pkey-set-type",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_set_type.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY_set_type（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY_set_type, EVP_PKEY_set_type_str, EVP_PKEY_set_type_by_keymgmt
- functions to change the EVP_PKEY type

## 技术正文

## NAME


EVP_PKEY_set_type, EVP_PKEY_set_type_str, EVP_PKEY_set_type_by_keymgmt
- functions to change the EVP_PKEY type

## SYNOPSIS


```c
#include <openssl/evp.h>

int EVP_PKEY_set_type(EVP_PKEY *pkey, int type);
int EVP_PKEY_set_type_str(EVP_PKEY *pkey, const char *str, int len);
int EVP_PKEY_set_type_by_keymgmt(EVP_PKEY *pkey, EVP_KEYMGMT *keymgmt);

```

## DESCRIPTION


All the functions described here behave the same in so far that they
clear all the previous key data and methods from `pkey`, and reset it
to be of the type of key given by the different arguments.  If
`pkey` is NULL, these functions will still return the same return
values as if it wasn't.

EVP_PKEY_set_type() initialises `pkey` to contain an internal legacy
key.  When doing this, it finds a EVP_PKEY_ASN1_METHOD(3)
corresponding to `type`, and associates `pkey` with the findings.
It is an error if no EVP_PKEY_ASN1_METHOD(3) could be found for
`type`.

EVP_PKEY_set_type_str() initialises `pkey` to contain an internal legacy
key. When doing this, it finds a EVP_PKEY_ASN1_METHOD(3)
corresponding to `str` that has then length `len`, and associates
`pkey` with the findings.
It is an error if no EVP_PKEY_ASN1_METHOD(3) could be found for
`type`.

For both EVP_PKEY_set_type() and EVP_PKEY_set_type_str(), `pkey` gets
a numeric type, which can be retrieved with EVP_PKEY_get_id(3).  This
numeric type is taken from the EVP_PKEY_ASN1_METHOD(3) that was
found, and is equal to or closely related to `type` in the case of
EVP_PKEY_set_type(), or related to `str` in the case of
EVP_PKEY_set_type_str().

EVP_PKEY_set_type_by_keymgmt() initialises `pkey` to contain an
internal provider side key.  When doing this, it associates `pkey`
with `keymgmt`.  For keys initialised like this, the numeric type
retrieved with EVP_PKEY_get_id(3) will always be **EVP_PKEY_NONE**.

## RETURN VALUES


All functions described here return 1 if successful, or 0 on error.

## SEE ALSO


EVP_PKEY_assign(3), EVP_PKEY_get_id(3), EVP_PKEY_get0_RSA(3),
EVP_PKEY_copy_parameters(3), EVP_PKEY_ASN1_METHOD(3),
EVP_KEYMGMT(3)

## COPYRIGHT


Copyright 2020-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_PKEY_set_type.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_set_type.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_PKEY_set_type.pod`；SHA-256：`f9e3a4cc4cc543dc0f24bc5cbb1831802dd22dc9712ac4e279c42f727eb2aee1`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
