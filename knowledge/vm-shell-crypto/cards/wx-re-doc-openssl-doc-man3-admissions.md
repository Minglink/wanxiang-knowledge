---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-admissions",
  "title": "OpenSSL：密码实现与接口 · ADMISSIONS（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "ADMISSIONS"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "d78e4fa8e955af6e4018d2ed4ec1ebb4f6dda24fc93f6ee76a90d1c569e3396a",
  "generatedHash": "c016c3047704d6d4f2751c6cab7c2aef1ee04a5ff46b5d438ae790101b27b8e2",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：ADMISSIONS, ADMISSIONS_get0_admissionAuthority, ADMISSIONS_get0_namingAuthority, ADMISSIONS_get0_professionInfos, ADMISSIONS_set0_admissionAuthority, ADMISSIONS_set0_namingAuthority, ADMISSIONS_set0_professionInfos, ADMISSION_SYNTAX, ADMISSION_SYNTAX_get0_admissionAuthority, ADMISSION_SYNTAX_get0_co",
  "l1": "The **PROFESSION_INFOS**, **ADMISSION_SYNTAX**, **ADMISSIONS**, and **PROFESSION_INFO** types are opaque structures representing the analogous types defined in the Common PKI Specification published by https://www.t7ev.org. Knowledge of those structures and their semantics is assumed. The conventional routines to convert between DER and the local format are described in d2i_X509(3). The conventional routines to allocate and free the types are defined in X509_dup(3). The **PROFESSION_INFOS** type is a stack of **PROFESSION_INFO**; see DEFINE_STACK_OF(3) for details. The **NAMING_AUTHORITY** type has an authority ID and URL, and text fields. The NAMING_AUTHORITY_get0_authorityId(), NAMING_AUTHORITY_get0_get0_authorityURL(), and NAMING_AUTHORITY_get0_get0_authorityText(), functions return pointers to those values within the object. The NAMIN",
  "questions": [
    "ADMISSIONS 如何用于密码实现与接口？",
    "ADMISSIONS 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-admissions",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/ADMISSIONS.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · ADMISSIONS（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

ADMISSIONS,
ADMISSIONS_get0_admissionAuthority,
ADMISSIONS_get0_namingAuthority,
ADMISSIONS_get0_professionInfos,
ADMISSIONS_set0_admissionAuthority,
ADMISSIONS_set0_namingAuthority,
ADMISSIONS_set0_professionInfos,
ADMISSION_SYNTAX,
ADMISSION_SYNTAX_get0_admissionAuthority,
ADMISSION_SYNTAX_get0_contentsOfAdmissions,
ADMISSION_SYNTAX_set0_admissionAuthority,
ADMISSION_SYNTAX_set0_contentsOfAdmissions,
NAMING_AUTHORITY,
NAMING_AUTHORITY_get0_authorityId,
NAMING_AUTHORITY_get0_authorityURL,
NAMING_AUTHORITY_get0_authorityText,
NAMING_AUTHORITY_set0_authorityId,
NAMING_AUTHORITY_set0_authorityURL,
NAMING_AUTHORITY_set0_authorityText,
PROFESSION_INFO,
PROFESSION_INFOS,
PROFESSION_INFO_get0_addProfessionInfo,
PROFESSION_INFO_get0_namingAuthority,
PROFESSION_INFO_get0_professionItems,
PROFESSION_INFO_get0_professionOIDs,
PROFESSION_INFO_get0_registrationNumber,
PROFESSION_INFO_set0_addProfessionInfo,
PROFESSION_INFO_set0_namingAuthority,
PROFESSION_INFO_set0_professionItems,
PROFESSION_INFO_set0_professionOIDs,
PROFESSION_INFO_set0_registrationNumber
- Accessors and settors for ADMISSION_SYNTAX

## 技术正文

## NAME


ADMISSIONS,
ADMISSIONS_get0_admissionAuthority,
ADMISSIONS_get0_namingAuthority,
ADMISSIONS_get0_professionInfos,
ADMISSIONS_set0_admissionAuthority,
ADMISSIONS_set0_namingAuthority,
ADMISSIONS_set0_professionInfos,
ADMISSION_SYNTAX,
ADMISSION_SYNTAX_get0_admissionAuthority,
ADMISSION_SYNTAX_get0_contentsOfAdmissions,
ADMISSION_SYNTAX_set0_admissionAuthority,
ADMISSION_SYNTAX_set0_contentsOfAdmissions,
NAMING_AUTHORITY,
NAMING_AUTHORITY_get0_authorityId,
NAMING_AUTHORITY_get0_authorityURL,
NAMING_AUTHORITY_get0_authorityText,
NAMING_AUTHORITY_set0_authorityId,
NAMING_AUTHORITY_set0_authorityURL,
NAMING_AUTHORITY_set0_authorityText,
PROFESSION_INFO,
PROFESSION_INFOS,
PROFESSION_INFO_get0_addProfessionInfo,
PROFESSION_INFO_get0_namingAuthority,
PROFESSION_INFO_get0_professionItems,
PROFESSION_INFO_get0_professionOIDs,
PROFESSION_INFO_get0_registrationNumber,
PROFESSION_INFO_set0_addProfessionInfo,
PROFESSION_INFO_set0_namingAuthority,
PROFESSION_INFO_set0_professionItems,
PROFESSION_INFO_set0_professionOIDs,
PROFESSION_INFO_set0_registrationNumber
- Accessors and settors for ADMISSION_SYNTAX

## SYNOPSIS


```c
typedef struct NamingAuthority_st NAMING_AUTHORITY;
typedef struct ProfessionInfo_st PROFESSION_INFO;
typedef STACK_OF(PROFESSION_INFO) PROFESSION_INFOS;
typedef struct Admissions_st ADMISSIONS;
typedef struct AdmissionSyntax_st ADMISSION_SYNTAX;

const ASN1_OBJECT *NAMING_AUTHORITY_get0_authorityId(
    const NAMING_AUTHORITY *n);
void NAMING_AUTHORITY_set0_authorityId(NAMING_AUTHORITY *n,
    ASN1_OBJECT* namingAuthorityId);
const ASN1_IA5STRING *NAMING_AUTHORITY_get0_authorityURL(
    const NAMING_AUTHORITY *n);
void NAMING_AUTHORITY_set0_authorityURL(NAMING_AUTHORITY *n,
    ASN1_IA5STRING* namingAuthorityUrl);
const ASN1_STRING *NAMING_AUTHORITY_get0_authorityText(
    const NAMING_AUTHORITY *n);
void NAMING_AUTHORITY_set0_authorityText(NAMING_AUTHORITY *n,
    ASN1_STRING* namingAuthorityText);

const GENERAL_NAME *ADMISSION_SYNTAX_get0_admissionAuthority(
    const ADMISSION_SYNTAX *as);
void ADMISSION_SYNTAX_set0_admissionAuthority(
    ADMISSION_SYNTAX *as, GENERAL_NAME *aa);
const STACK_OF(ADMISSIONS) *ADMISSION_SYNTAX_get0_contentsOfAdmissions(
    const ADMISSION_SYNTAX *as);
void ADMISSION_SYNTAX_set0_contentsOfAdmissions(
    ADMISSION_SYNTAX *as, STACK_OF(ADMISSIONS) *a);

const GENERAL_NAME *ADMISSIONS_get0_admissionAuthority(const ADMISSIONS *a);
void ADMISSIONS_set0_admissionAuthority(ADMISSIONS *a, GENERAL_NAME *aa);
const NAMING_AUTHORITY *ADMISSIONS_get0_namingAuthority(const ADMISSIONS *a);
void ADMISSIONS_set0_namingAuthority(ADMISSIONS *a, NAMING_AUTHORITY *na);
const PROFESSION_INFOS *ADMISSIONS_get0_professionInfos(const ADMISSIONS *a);
void ADMISSIONS_set0_professionInfos(ADMISSIONS *a, PROFESSION_INFOS *pi);

const ASN1_OCTET_STRING *PROFESSION_INFO_get0_addProfessionInfo(
    const PROFESSION_INFO *pi);
void PROFESSION_INFO_set0_addProfessionInfo(
    PROFESSION_INFO *pi, ASN1_OCTET_STRING *aos);
const NAMING_AUTHORITY *PROFESSION_INFO_get0_namingAuthority(
    const PROFESSION_INFO *pi);
void PROFESSION_INFO_set0_namingAuthority(
    PROFESSION_INFO *pi, NAMING_AUTHORITY *na);
const STACK_OF(ASN1_STRING) *PROFESSION_INFO_get0_professionItems(
    const PROFESSION_INFO *pi);
void PROFESSION_INFO_set0_professionItems(
    PROFESSION_INFO *pi, STACK_OF(ASN1_STRING) *as);
const STACK_OF(ASN1_OBJECT) *PROFESSION_INFO_get0_professionOIDs(
    const PROFESSION_INFO *pi);
void PROFESSION_INFO_set0_professionOIDs(
    PROFESSION_INFO *pi, STACK_OF(ASN1_OBJECT) *po);
const ASN1_PRINTABLESTRING *PROFESSION_INFO_get0_registrationNumber(
    const PROFESSION_INFO *pi);
void PROFESSION_INFO_set0_registrationNumber(
    PROFESSION_INFO *pi, ASN1_PRINTABLESTRING *rn);

```

## DESCRIPTION


The **PROFESSION_INFOS**, **ADMISSION_SYNTAX**, **ADMISSIONS**, and
**PROFESSION_INFO** types are opaque structures representing the
analogous types defined in the Common PKI Specification published
by https://www.t7ev.org.
Knowledge of those structures and their semantics is assumed.

The conventional routines to convert between DER and the local format
are described in d2i_X509(3).
The conventional routines to allocate and free the types are defined
in X509_dup(3).

The **PROFESSION_INFOS** type is a stack of **PROFESSION_INFO**; see
DEFINE_STACK_OF(3) for details.

The **NAMING_AUTHORITY** type has an authority ID and URL, and text fields.
The NAMING_AUTHORITY_get0_authorityId(),
NAMING_AUTHORITY_get0_get0_authorityURL(), and
NAMING_AUTHORITY_get0_get0_authorityText(), functions return pointers
to those values within the object.
The NAMING_AUTHORITY_set0_authorityId(),
NAMING_AUTHORITY_set0_get0_authorityURL(), and
NAMING_AUTHORITY_set0_get0_authorityText(),
functions free any existing value and set the pointer to the specified value.

The **ADMISSION_SYNTAX** type has an authority name and a stack of
**ADMISSION** objects.
The ADMISSION_SYNTAX_get0_admissionAuthority()
and ADMISSION_SYNTAX_get0_contentsOfAdmissions() functions return pointers
to those values within the object.
The
ADMISSION_SYNTAX_set0_admissionAuthority() and
ADMISSION_SYNTAX_set0_contentsOfAdmissions()
functions free any existing value and set the pointer to the specified value.

The **ADMISSION** type has an authority name, authority object, and a
stack of **PROFESSION_INFO** items.
The ADMISSIONS_get0_admissionAuthority(), ADMISSIONS_get0_namingAuthority(),
and ADMISSIONS_get0_professionInfos()
functions return pointers to those values within the object.
The
ADMISSIONS_set0_admissionAuthority(),
ADMISSIONS_set0_namingAuthority(), and
ADMISSIONS_set0_professionInfos()
functions free any existing value and set the pointer to the specified value.

The **PROFESSION_INFO** type has a name authority, stacks of
profession Items and OIDs, a registration number, and additional
profession info.
The functions PROFESSION_INFO_get0_addProfessionInfo(),
PROFESSION_INFO_get0_namingAuthority(), PROFESSION_INFO_get0_professionItems(),
PROFESSION_INFO_get0_professionOIDs(), and
PROFESSION_INFO_get0_registrationNumber()
functions return pointers to those values within the object.
The
PROFESSION_INFO_set0_addProfessionInfo(),
PROFESSION_INFO_set0_namingAuthority(),
PROFESSION_INFO_set0_professionItems(),
PROFESSION_INFO_set0_professionOIDs(), and
PROFESSION_INFO_set0_registrationNumber()
functions free any existing value and set the pointer to the specified value.

## RETURN VALUES


Described above.
Note that all of the `get0` functions return a pointer to the internal data
structure and must not be freed.

## SEE ALSO


X509_dup(3),
d2i_X509(3),

## COPYRIGHT


Copyright 2017-2018 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/ADMISSIONS.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/ADMISSIONS.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/ADMISSIONS.pod`；SHA-256：`d78e4fa8e955af6e4018d2ed4ec1ebb4f6dda24fc93f6ee76a90d1c569e3396a`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
