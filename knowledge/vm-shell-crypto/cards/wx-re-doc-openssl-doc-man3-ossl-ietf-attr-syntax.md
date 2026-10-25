---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-ietf-attr-syntax",
  "title": "OpenSSL：密码实现与接口 · OSSL_IETF_ATTR_SYNTAX（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_IETF_ATTR_SYNTAX"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "b58a27faa71690a637ff1a7af8d52e7aab170554ed194b77acf71abcafaf4cda",
  "generatedHash": "246b9b3cddf43c8b1dd5570dfc5aabb10b23f5112fe87aa73434fbc41130090e",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_IETF_ATTR_SYNTAX, OSSL_IETF_ATTR_SYNTAX_get0_policyAuthority, OSSL_IETF_ATTR_SYNTAX_set0_policyAuthority, OSSL_IETF_ATTR_SYNTAX_get_value_num, OSSL_IETF_ATTR_SYNTAX_get0_value, OSSL_IETF_ATTR_SYNTAX_add1_value - Accessors and setters for OSSL_IETF_ATTR_SYNTAX",
  "l1": "**OSSL_IETF_ATTR_SYNTAX** is an opaque structure that represents the IetfAttrSyntax type defined in RFC 5755 (Section 4.4) for use as an AttributeValue. OSSL_IETF_ATTR_SYNTAX_get0_policyAuthority() and OSSL_IETF_ATTR_SYNTAX_set0_policyAuthority() get and set the policyAuthority field of the structure. Both routines act on internal pointers of the structure and must not be freed by the application. An **OSSL_IETF_ATTR_SYNTAX** object also holds a sequence of values. OSSL_IETF_ATTR_SYNTAX_get_value_num() returns the number of values in the sequence. OSSL_IETF_ATTR_SYNTAX_add1_value(), adds a copy of `data` of a specified `type` to the sequence. The caller should free the `data` after use. OSSL_IETF_ATTR_SYNTAX_get0_value() will return the value and a specific index `ind` in the sequence or NULL on error. If `type` is not NULL, the type of t",
  "questions": [
    "OSSL_IETF_ATTR_SYNTAX 如何用于密码实现与接口？",
    "OSSL_IETF_ATTR_SYNTAX 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-ietf-attr-syntax",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_IETF_ATTR_SYNTAX.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_IETF_ATTR_SYNTAX（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_IETF_ATTR_SYNTAX,
OSSL_IETF_ATTR_SYNTAX_get0_policyAuthority,
OSSL_IETF_ATTR_SYNTAX_set0_policyAuthority,
OSSL_IETF_ATTR_SYNTAX_get_value_num,
OSSL_IETF_ATTR_SYNTAX_get0_value,
OSSL_IETF_ATTR_SYNTAX_add1_value
- Accessors and setters for OSSL_IETF_ATTR_SYNTAX

## 技术正文

## NAME


OSSL_IETF_ATTR_SYNTAX,
OSSL_IETF_ATTR_SYNTAX_get0_policyAuthority,
OSSL_IETF_ATTR_SYNTAX_set0_policyAuthority,
OSSL_IETF_ATTR_SYNTAX_get_value_num,
OSSL_IETF_ATTR_SYNTAX_get0_value,
OSSL_IETF_ATTR_SYNTAX_add1_value
- Accessors and setters for OSSL_IETF_ATTR_SYNTAX

## SYNOPSIS


```c
#include <openssl/x509_acert.h>

typedef struct OSSL_IETF_ATTR_SYNTAX_st OSSL_IETF_ATTR_SYNTAX;

const GENERAL_NAMES *
OSSL_IETF_ATTR_SYNTAX_get0_policyAuthority(const OSSL_IETF_ATTR_SYNTAX *a);
void OSSL_IETF_ATTR_SYNTAX_set0_policyAuthority(OSSL_IETF_ATTR_SYNTAX *a,
                                                GENERAL_NAMES *names);

int OSSL_IETF_ATTR_SYNTAX_get_value_num(const OSSL_IETF_ATTR_SYNTAX *a);
void *OSSL_IETF_ATTR_SYNTAX_get0_value(const OSSL_IETF_ATTR_SYNTAX *a,
                                       int ind, int *type);
int OSSL_IETF_ATTR_SYNTAX_add1_value(OSSL_IETF_ATTR_SYNTAX *a, int type,
                                     void *data);

```

## DESCRIPTION


**OSSL_IETF_ATTR_SYNTAX** is an opaque structure that represents the
IetfAttrSyntax type defined in RFC 5755 (Section 4.4) for use
as an AttributeValue.

OSSL_IETF_ATTR_SYNTAX_get0_policyAuthority() and OSSL_IETF_ATTR_SYNTAX_set0_policyAuthority()
get and set the policyAuthority field of the structure. Both routines act on
internal pointers of the structure and must not be freed by the application.

An **OSSL_IETF_ATTR_SYNTAX** object also holds a sequence of values.
OSSL_IETF_ATTR_SYNTAX_get_value_num() returns the number of values in the
sequence.  OSSL_IETF_ATTR_SYNTAX_add1_value(), adds a copy of `data` of a specified
`type` to the sequence.  The caller should free the `data` after use.

OSSL_IETF_ATTR_SYNTAX_get0_value() will return the value and a specific index `ind`
in the sequence or NULL on error.  If `type` is not NULL, the type of the
value will be written to this location.

The `type` of the values stored in the **OSSL_IETF_ATTR_SYNTAX** value sequence is
one of the following:


- OSSL_IETFAS_OCTETS

A pointer to an ASN1_OCTET_STRING

- OSSL_IETFAS_OID

A pointer to an ASN1_OBJECT

- OSSL_IETFAS_STRING

A pointer to an ASN1_UTF8STRING


## RETURN VALUES


OSSL_IETF_ATTR_SYNTAX_get0_policyAuthority() returns an pointer to a
**GENERAL_NAMES** structure or **NULL** if the policy authority has not been
set.

OSSL_IETF_ATTR_SYNTAX_get_value_num() returns the number of entries in the value
sequence or -1 on error.

OSSL_IETF_ATTR_SYNTAX_get0_value() returns a pointer to the value at the given index
or NULL if the index is out of range.

OSSL_IETF_ATTR_SYNTAX_add1_value() returns 1 on success and 0 on failure.

## HISTORY


OSSL_IETF_ATTR_SYNTAX_get0_policyAuthority(), OSSL_IETF_ATTR_SYNTAX_set0_policyAuthority(),
OSSL_IETF_ATTR_SYNTAX_get_value_num(), OSSL_IETF_ATTR_SYNTAX_get0_value(), and
OSSL_IETF_ATTR_SYNTAX_add1_value() were added in OpenSSL 3.4.

## COPYRIGHT


Copyright 2021-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_IETF_ATTR_SYNTAX.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_IETF_ATTR_SYNTAX.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_IETF_ATTR_SYNTAX.pod`；SHA-256：`b58a27faa71690a637ff1a7af8d52e7aab170554ed194b77acf71abcafaf4cda`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
