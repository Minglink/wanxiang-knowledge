---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-ess-check-signing-certs",
  "title": "OpenSSL：密码实现与接口 · OSSL_ESS_check_signing_certs（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_ESS_check_signing_certs"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "9ea9e8127d1ce6ffa23f46d5221b89de7c20407661c3e63238fbfa6e8f8d0a75",
  "generatedHash": "685159d22b35c7e1c579e777230e7e5ba9fc80dfc56ce734c1fae6d97ff8069a",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_ESS_signing_cert_new_init, OSSL_ESS_signing_cert_v2_new_init, OSSL_ESS_check_signing_certs - Enhanced Security Services (ESS) functions",
  "l1": "OSSL_ESS_signing_cert_new_init() generates a new **ESS_SIGNING_CERT** structure referencing the given `signcert` and any given further `certs` using their SHA-1 fingerprints. If `set_issuer_serial` is nonzero then also the issuer and serial number of `signcert` are included in the **ESS_CERT_ID** as the **issuerSerial** field. For all members of `certs` the **issuerSerial** field is always included. OSSL_ESS_signing_cert_v2_new_init() is the same as OSSL_ESS_signing_cert_new_init() except that it uses the given `hash_alg` and generates a **ESS_SIGNING_CERT_V2** structure with **ESS_CERT_ID_V2** elements. OSSL_ESS_check_signing_certs() checks if the validation chain `chain` contains the certificates required by the identifiers given in `ss` and/or `ssv2`. If `require_signing_cert` is nonzero, `ss` or `ssv2` must not be NULL. If both `ss` a",
  "questions": [
    "OSSL_ESS_check_signing_certs 如何用于密码实现与接口？",
    "OSSL_ESS_check_signing_certs 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-ess-check-signing-certs",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_ESS_check_signing_certs.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_ESS_check_signing_certs（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_ESS_signing_cert_new_init,
OSSL_ESS_signing_cert_v2_new_init,
OSSL_ESS_check_signing_certs
- Enhanced Security Services (ESS) functions

## 技术正文

## NAME


OSSL_ESS_signing_cert_new_init,
OSSL_ESS_signing_cert_v2_new_init,
OSSL_ESS_check_signing_certs
- Enhanced Security Services (ESS) functions

## SYNOPSIS


```c
#include <openssl/ess.h>

ESS_SIGNING_CERT *OSSL_ESS_signing_cert_new_init(const X509 *signcert,
                                                 const STACK_OF(X509) *certs,
                                                 int set_issuer_serial);
ESS_SIGNING_CERT_V2 *OSSL_ESS_signing_cert_v2_new_init(const EVP_MD *hash_alg,
                                                       const X509 *signcert,
                                                       const
                                                       STACK_OF(X509) *certs,
                                                       int set_issuer_serial);
int OSSL_ESS_check_signing_certs(const ESS_SIGNING_CERT *ss,
                                 const ESS_SIGNING_CERT_V2 *ssv2,
                                 const STACK_OF(X509) *chain,
                                 int require_signing_cert);

```

## DESCRIPTION


OSSL_ESS_signing_cert_new_init() generates a new **ESS_SIGNING_CERT** structure
referencing the given `signcert` and any given further `certs`
using their SHA-1 fingerprints.
If `set_issuer_serial` is nonzero then also the issuer and serial number
of `signcert` are included in the **ESS_CERT_ID** as the **issuerSerial** field.
For all members of `certs` the  **issuerSerial** field is always included.

OSSL_ESS_signing_cert_v2_new_init() is the same as
OSSL_ESS_signing_cert_new_init() except that it uses the given `hash_alg` and
generates a **ESS_SIGNING_CERT_V2** structure with **ESS_CERT_ID_V2** elements.

OSSL_ESS_check_signing_certs() checks if the validation chain `chain` contains
the certificates required by the identifiers given in `ss` and/or `ssv2`.
If `require_signing_cert` is nonzero, `ss` or `ssv2` must not be NULL.
If both `ss` and `ssv2` are not NULL, they are evaluated independently.
The list of certificate identifiers in `ss` is of type **ESS_CERT_ID**,
while the list contained in `ssv2` is of type **ESS_CERT_ID_V2**.
As far as these lists are present, they must be nonempty.
The certificate identified by their first entry must be the first element of
`chain`, i.e. the signer certificate.
Any further certificates referenced in the list must also be found in `chain`.
The matching is done using the given certificate hash algorithm and value.
In addition to the checks required by RFCs 2624 and 5035,
if the **issuerSerial** field is included in an **ESSCertID** or **ESSCertIDv2**
it must match the certificate issuer and serial number attributes.

## NOTES


ESS has been defined in RFC 2634, which has been updated in RFC 5035
(ESS version 2) to support hash algorithms other than SHA-1.
This is used for TSP (RFC 3161) and CAdES-BES (informational RFC 5126).

## RETURN VALUES


OSSL_ESS_signing_cert_new_init() and OSSL_ESS_signing_cert_v2_new_init()
return a pointer to the new structure or NULL on malloc failure.

OSSL_ESS_check_signing_certs() returns 1 on success,
0 if a required certificate cannot be found, -1 on other error.

## SEE ALSO


TS_VERIFY_CTX_set_certs(3),
CMS_verify(3)

## HISTORY


OSSL_ESS_signing_cert_new_init(), OSSL_ESS_signing_cert_v2_new_init(), and
OSSL_ESS_check_signing_certs() were added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2021-2022 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_ESS_check_signing_certs.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_ESS_check_signing_certs.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_ESS_check_signing_certs.pod`；SHA-256：`9ea9e8127d1ce6ffa23f46d5221b89de7c20407661c3e63238fbfa6e8f8d0a75`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
