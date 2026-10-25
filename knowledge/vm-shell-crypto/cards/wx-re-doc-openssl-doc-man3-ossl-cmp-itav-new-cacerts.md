---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-cmp-itav-new-cacerts",
  "title": "OpenSSL：密码实现与接口 · OSSL_CMP_ITAV_new_caCerts（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_CMP_ITAV_new_caCerts"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "4dad7c70cf7ca2c72893c13569717c64c4f5fb6b5d065f6daa2a92f7e861c4e5",
  "generatedHash": "42738443d0ebafcff1782b1e16044cb0f1b604de3205644617e03b2b67bcf199",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_CMP_ITAV_new_caCerts, OSSL_CMP_ITAV_get0_caCerts, OSSL_CMP_ITAV_new_rootCaCert, OSSL_CMP_ITAV_get0_rootCaCert, OSSL_CMP_ITAV_new_rootCaKeyUpdate, OSSL_CMP_ITAV_get0_rootCaKeyUpdate, OSSL_CMP_CRLSTATUS_new1, OSSL_CMP_CRLSTATUS_create, OSSL_CMP_CRLSTATUS_get0, OSSL_CMP_ITAV_new0_crlStatusList, OS",
  "l1": "ITAV is short for InfoTypeAndValue. OSSL_CMP_ITAV_new_caCerts() creates an **OSSL_CMP_ITAV** structure of type **caCerts** and fills it with a copy of the provided list of certificates. The `caCerts` argument may be NULL or contain any number of certificates. OSSL_CMP_ITAV_get0_caCerts() requires that `itav` has type **caCerts**. It assigns NULL to `*out` if there are no CA certificates in `itav`, otherwise the internal pointer of type **STACK_OF(X509)** with the certificates present. OSSL_CMP_ITAV_new_rootCaCert() creates a new **OSSL_CMP_ITAV** structure of type **rootCaCert** that includes the optionally given certificate. OSSL_CMP_ITAV_get0_rootCaCert() requires that `itav` has type **rootCaCert**. It assigns NULL to `*out` if no certificate is included in `itav`, otherwise the internal pointer to the certificate contained in the info",
  "questions": [
    "OSSL_CMP_ITAV_new_caCerts 如何用于密码实现与接口？",
    "OSSL_CMP_ITAV_new_caCerts 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-cmp-itav-new-cacerts",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_CMP_ITAV_new_caCerts.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_CMP_ITAV_new_caCerts（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_CMP_ITAV_new_caCerts,
OSSL_CMP_ITAV_get0_caCerts,
OSSL_CMP_ITAV_new_rootCaCert,
OSSL_CMP_ITAV_get0_rootCaCert,
OSSL_CMP_ITAV_new_rootCaKeyUpdate,
OSSL_CMP_ITAV_get0_rootCaKeyUpdate,
OSSL_CMP_CRLSTATUS_new1,
OSSL_CMP_CRLSTATUS_create,
OSSL_CMP_CRLSTATUS_get0,
OSSL_CMP_ITAV_new0_crlStatusList,
OSSL_CMP_ITAV_get0_crlStatusList,
OSSL_CMP_ITAV_new_crls,
OSSL_CMP_ITAV_get0_crls,
OSSL_CMP_ITAV_new0_certReqTemplate,
OSSL_CMP_ITAV_get1_certReqTemplate
- CMP utility functions for handling specific genm and genp messages

## 技术正文

## NAME


OSSL_CMP_ITAV_new_caCerts,
OSSL_CMP_ITAV_get0_caCerts,
OSSL_CMP_ITAV_new_rootCaCert,
OSSL_CMP_ITAV_get0_rootCaCert,
OSSL_CMP_ITAV_new_rootCaKeyUpdate,
OSSL_CMP_ITAV_get0_rootCaKeyUpdate,
OSSL_CMP_CRLSTATUS_new1,
OSSL_CMP_CRLSTATUS_create,
OSSL_CMP_CRLSTATUS_get0,
OSSL_CMP_ITAV_new0_crlStatusList,
OSSL_CMP_ITAV_get0_crlStatusList,
OSSL_CMP_ITAV_new_crls,
OSSL_CMP_ITAV_get0_crls,
OSSL_CMP_ITAV_new0_certReqTemplate,
OSSL_CMP_ITAV_get1_certReqTemplate
- CMP utility functions for handling specific genm and genp messages

## SYNOPSIS


```c
#include <openssl/cmp.h>

OSSL_CMP_ITAV *OSSL_CMP_ITAV_new_caCerts(const STACK_OF(X509) *caCerts);
int OSSL_CMP_ITAV_get0_caCerts(const OSSL_CMP_ITAV *itav, STACK_OF(X509) **out);

OSSL_CMP_ITAV *OSSL_CMP_ITAV_new_rootCaCert(const X509 *rootCaCert);
int OSSL_CMP_ITAV_get0_rootCaCert(const OSSL_CMP_ITAV *itav, X509 **out);
OSSL_CMP_ITAV *OSSL_CMP_ITAV_new_rootCaKeyUpdate(const X509 *newWithNew,
                                                 const X509 *newWithOld,
                                                 const X509 *oldWithNew);
int OSSL_CMP_ITAV_get0_rootCaKeyUpdate(const OSSL_CMP_ITAV *itav,
                                       X509 **newWithNew,
                                       X509 **newWithOld,
                                       X509 **oldWithNew);

OSSL_CMP_CRLSTATUS *OSSL_CMP_CRLSTATUS_new1(const DIST_POINT_NAME *dpn,
                                            const GENERAL_NAMES *issuer,
                                            const ASN1_TIME *thisUpdate);
OSSL_CMP_CRLSTATUS *OSSL_CMP_CRLSTATUS_create(const X509_CRL *crl,
                                              const X509 *cert, int only_DN);
int OSSL_CMP_CRLSTATUS_get0(const OSSL_CMP_CRLSTATUS *crlstatus,
                            DIST_POINT_NAME **dpn, GENERAL_NAMES **issuer,
                            ASN1_TIME **thisUpdate);
OSSL_CMP_ITAV
*OSSL_CMP_ITAV_new0_crlStatusList(STACK_OF(OSSL_CMP_CRLSTATUS) *crlStatusList);
int OSSL_CMP_ITAV_get0_crlStatusList(const OSSL_CMP_ITAV *itav,
                                     STACK_OF(OSSL_CMP_CRLSTATUS) **out);
OSSL_CMP_ITAV *OSSL_CMP_ITAV_new_crls(const X509_CRL *crl);
int OSSL_CMP_ITAV_get0_crls(const OSSL_CMP_ITAV *itav, STACK_OF(X509_CRL) **out);
OSSL_CMP_ITAV
*OSSL_CMP_ITAV_new0_certReqTemplate(OSSL_CRMF_CERTTEMPLATE *certTemplate,
                                    OSSL_CMP_ATAVS *keySpec);
int OSSL_CMP_ITAV_get1_certReqTemplate(const OSSL_CMP_ITAV *itav,
                                       OSSL_CRMF_CERTTEMPLATE **certTemplate,
                                       OSSL_CMP_ATAVS **keySpec);

```

## DESCRIPTION


ITAV is short for InfoTypeAndValue.

OSSL_CMP_ITAV_new_caCerts() creates an **OSSL_CMP_ITAV** structure of type
**caCerts** and fills it with a copy of the provided list of certificates.
The `caCerts` argument may be NULL or contain any number of certificates.

OSSL_CMP_ITAV_get0_caCerts() requires that `itav` has type **caCerts**.
It assigns NULL to `*out` if there are no CA certificates in `itav`, otherwise
the internal pointer of type **STACK_OF(X509)** with the certificates present.

OSSL_CMP_ITAV_new_rootCaCert() creates a new **OSSL_CMP_ITAV** structure
of type **rootCaCert** that includes the optionally given certificate.

OSSL_CMP_ITAV_get0_rootCaCert() requires that `itav` has type **rootCaCert**.
It assigns NULL to `*out` if no certificate is included in `itav`, otherwise
the internal pointer to the certificate contained in the infoValue field.

OSSL_CMP_ITAV_new_rootCaKeyUpdate() creates a new **OSSL_CMP_ITAV** structure
of type **rootCaKeyUpdate** that includes an RootCaKeyUpdateContent structure
with the optional `newWithNew`, `newWithOld`, and `oldWithNew` certificates.
An RootCaKeyUpdateContent structure is included only if `newWithNew`
is not NULL.

OSSL_CMP_ITAV_get0_rootCaKeyUpdate() requires that `itav` has infoType
**rootCaKeyUpdate**.
If an update of a root CA certificate is included,
it assigns to `*newWithNew` the internal pointer
to the certificate contained in the newWithNew infoValue sub-field of `itav`.
If `newWithOld` is not NULL, it assigns to `*newWithOld` the internal pointer
to the certificate contained in the newWithOld infoValue sub-field of `itav`.
If `oldWithNew` is not NULL, it assigns to `*oldWithNew` the internal pointer
to the certificate contained in the oldWithNew infoValue sub-field of `itav`.
Each of these pointers will be set to NULL if no root CA certificate update 
is present or the respective sub-field is not included.

OSSL_CMP_CRLSTATUS_new1() allocates a new **OSSL_CMP_CRLSTATUS** structure
that contains either a copy of the distribution point name `dpn`
or a copy of the certificate issuer `issuer`, while giving both is an error.
If given, a copy of the CRL issuance time `thisUpdate` is also included.

OSSL_CMP_CRLSTATUS_create() is a high-level variant of OSSL_CMP_CRLSTATUS_new1().
It fills the thisUpdate field with a copy of the thisUpdate field of `crl` if present.
It fills the CRLSource field with a copy of the first data item found using the `crl`
and/or `cert` parameters as follows.
Any available distribution point name is preferred over issuer names.
Data from `cert`, if present, is preferred over data from `crl`.
If no distribution point names are available,
candidate issuer names are taken from following sources, as far as present:


- the list of distribution points in the first cRLDistributionPoints
extension of `cert`,

- the issuer field of the authority key identifier of `cert`,

- the issuer DN of `cert`,

- the issuer field of the authority key identifier of `crl`, and

- the issuer DN of `crl`.


If <only_DN> is set, a candidate issuer name of type **GENERAL_NAMES** is
accepted only if it contains exactly one general name of type directoryName.

OSSL_CMP_CRLSTATUS_get0() reads the fields of `crlstatus`
and assigns them to `*dpn`, `*issuer`, and `*thisUpdate`.
`*thisUpdate` is assigned only if the `thisUpdate` argument is not NULL.
Depending on the choice present, either `*dpn` or `*issuer` will be NULL.
`*thisUpdate` can also be NULL if the field is not present.

OSSL_CMP_ITAV_new0_crlStatusList() creates a new **OSSL_CMP_ITAV** structure of
type **crlStatusList** that includes the optionally given list of
CRL status data, each of which is of type **OSSL_CMP_CRLSTATUS**.

OSSL_CMP_ITAV_get0_crlStatusList() on success assigns to `*out` an internal
pointer to the list of CRL status data in the infoValue field of `itav`.
The pointer may be NULL if no CRL status data is included.
It is an error if the infoType of `itav` is not **crlStatusList**.

OSSL_CMP_ITAV_new_crls() creates a new **OSSL_CMP_ITAV** structure
of type **crls** including an empty list of CRLs if the `crl` argument is NULL
or including a singleton list a with copy of the provided CRL otherwise.

OSSL_CMP_ITAV_get0_crls() on success assigns to `*out` an internal pointer to
the list of CRLs contained in the infoValue field of `itav`.
The pointer may be NULL if no CRL is included.
It is an error if the infoType of `itav` is not **crls**.

OSSL_CMP_ITAV_new0_certReqTemplate() creates an **OSSL_CMP_ITAV** structure
of type **certReqTemplate**.
If `certTemplate` is NULL then also `keySpec` must be NULL,
and the resulting ITAV can be used in a **genm** message to obtain the
requirements a PKI has on the certificate template used to request certificates,
or in a **genp** message stating that there are no such requirements.
Otherwise the resulting ITAV includes a CertReqTemplateValue structure
with `certTemplate` of type **OSSL_CRMF_CERTTEMPLATE** and an optional list
of key specifications `keySpec`, each being of type **OSSL_CMP_ATAV**, and
the resulting ATAV can be used in a **genp** message to provide requirements.

OSSL_CMP_ITAV_get1_certReqTemplate()
requires that `itav` has type **certReqTemplate**.
If assigns NULL to `*certTemplate` if no **OSSL_CRMF_CERTTEMPLATE** structure
with a certificate template value is in `itav`,
otherwise a copy of the certTemplate field value.
If `keySpec` is not NULL, it is assigned NULL
if the structure is not present in `itav` or the keySpec field is absent.
Otherwise, the function checks that all elements of keySpec field are of type
**algId** or **rsaKeyLen** and assigns to `*keySpec` a copy of the keySpec field.

## NOTES


CMP is defined in RFC 4210.

## RETURN VALUES


OSSL_CMP_ITAV_new_caCerts(), OSSL_CMP_ITAV_new_rootCaCert(),
OSSL_CMP_ITAV_new_rootCaKeyUpdate(), OSSL_CMP_CRLSTATUS_new1(),
OSSL_CMP_CRLSTATUS_create(), OSSL_CMP_ITAV_new0_crlStatusList(),
OSSL_CMP_ITAV_new_crls() and OSSL_CMP_ITAV_new0_certReqTemplate()
return a pointer to the new ITAV structure on success, or NULL on error.

OSSL_CMP_ITAV_get0_caCerts(), OSSL_CMP_ITAV_get0_rootCaCert(),
OSSL_CMP_ITAV_get0_rootCaKeyUpdate(), OSSL_CMP_CRLSTATUS_get0(),
OSSL_CMP_ITAV_get0_crlStatusList(), OSSL_CMP_ITAV_get0_crls()
and OSSL_CMP_ITAV_get1_certReqTemplate()
return 1 on success, 0 on error.

## SEE ALSO


OSSL_CMP_ITAV_create(3) and OSSL_CMP_ITAV_get0_type(3)

## HISTORY


OSSL_CMP_ITAV_new_caCerts(), OSSL_CMP_ITAV_get0_caCerts(),
OSSL_CMP_ITAV_new_rootCaCert(), OSSL_CMP_ITAV_get0_rootCaCert(),
OSSL_CMP_ITAV_new_rootCaKeyUpdate(), and OSSL_CMP_ITAV_get0_rootCaKeyUpdate()
were added in OpenSSL 3.2.

OSSL_CMP_CRLSTATUS_new1(), OSSL_CMP_CRLSTATUS_create(),
OSSL_CMP_CRLSTATUS_get0(), OSSL_CMP_ITAV_new0_crlStatusList(),
OSSL_CMP_ITAV_get0_crlStatusList(), OSSL_CMP_ITAV_new_crls(),
OSSL_CMP_ITAV_get0_crls(), OSSL_CMP_ITAV_new0_certReqTemplate()
and OSSL_CMP_ITAV_get1_certReqTemplate() were added in OpenSSL 3.4.

## COPYRIGHT


Copyright 2022-2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_CMP_ITAV_new_caCerts.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_CMP_ITAV_new_caCerts.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_CMP_ITAV_new_caCerts.pod`；SHA-256：`4dad7c70cf7ca2c72893c13569717c64c4f5fb6b5d065f6daa2a92f7e861c4e5`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
