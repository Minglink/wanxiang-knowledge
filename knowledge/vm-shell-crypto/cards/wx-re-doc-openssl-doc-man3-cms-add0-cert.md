---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-cms-add0-cert",
  "title": "OpenSSL：密码实现与接口 · CMS_add0_cert（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "CMS_add0_cert"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "c1016f47c1a50fd9eaca130776fae3afa2359983b563180b0a498d71c9c5ea79",
  "generatedHash": "75a4bcf6ad45e15b982a20f2ba598bb4d04f4b99f9d53b33eb5dd72149431212",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：CMS_add0_cert, CMS_add1_cert, CMS_get1_certs, CMS_add0_crl, CMS_add1_crl, CMS_get1_crls - CMS certificate and CRL utility functions",
  "l1": "CMS_add0_cert() and CMS_add1_cert() add certificate `cert` to `cms` unless it is already present. This is used by CMS_sign_ex(3) and CMS_sign(3) and may be used before calling CMS_verify(3) to help chain building in certificate validation. As the 0 implies, CMS_add0_cert() adds `cert` internally to `cms` and on success it must not be freed up by the caller. In contrast, the caller of CMS_add1_cert() must free `cert`. `cms` must be of type signed data or (authenticated) enveloped data. For signed data, such a certificate can be used when signing or verifying to fill in the signer certificate or to provide an extra CA certificate that may be needed for chain building in certificate validation. CMS_get1_certs() returns all certificates in `cms`. CMS_add0_crl() and CMS_add1_crl() add CRL `crl` to `cms`. `cms` must be of type signed data or (a",
  "questions": [
    "CMS_add0_cert 如何用于密码实现与接口？",
    "CMS_add0_cert 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-cms-add0-cert",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/CMS_add0_cert.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · CMS_add0_cert（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

CMS_add0_cert, CMS_add1_cert, CMS_get1_certs,
CMS_add0_crl, CMS_add1_crl, CMS_get1_crls
- CMS certificate and CRL utility functions

## 技术正文

## NAME


CMS_add0_cert, CMS_add1_cert, CMS_get1_certs,
CMS_add0_crl, CMS_add1_crl, CMS_get1_crls
- CMS certificate and CRL utility functions

## SYNOPSIS


```c
#include <openssl/cms.h>

int CMS_add0_cert(CMS_ContentInfo *cms, X509 *cert);
int CMS_add1_cert(CMS_ContentInfo *cms, X509 *cert);
STACK_OF(X509) *CMS_get1_certs(CMS_ContentInfo *cms);

int CMS_add0_crl(CMS_ContentInfo *cms, X509_CRL *crl);
int CMS_add1_crl(CMS_ContentInfo *cms, X509_CRL *crl);
STACK_OF(X509_CRL) *CMS_get1_crls(CMS_ContentInfo *cms);

```

## DESCRIPTION


CMS_add0_cert() and CMS_add1_cert() add certificate `cert` to `cms`
unless it is already present.
This is used by CMS_sign_ex(3) and CMS_sign(3) and may be used before
calling CMS_verify(3) to help chain building in certificate validation.
As the 0 implies, CMS_add0_cert() adds `cert` internally to `cms`
and on success it must not be freed up by the caller.
In contrast, the caller of CMS_add1_cert() must free `cert`.
`cms` must be of type signed data or (authenticated) enveloped data.
For signed data, such a certificate can be used when signing or verifying
to fill in the signer certificate or to provide an extra CA certificate
that may be needed for chain building in certificate validation.

CMS_get1_certs() returns all certificates in `cms`.

CMS_add0_crl() and CMS_add1_crl() add CRL `crl` to `cms`.
`cms` must be of type signed data or (authenticated) enveloped data.
For signed data, such a CRL may be used in certificate validation
with CMS_verify(3).
It may be given both for inclusion when signing a CMS message
and when verifying a signed CMS message.

CMS_get1_crls() returns all CRLs in `cms`.

## NOTES


The CMS_ContentInfo structure `cms` must be of type signed data or enveloped
data or authenticated enveloped data or an error will be returned.

For signed data, certificates and CRLs are added to the `certificates` and
`crls` fields of SignedData structure.
For enveloped data they are added to **OriginatorInfo**.

## RETURN VALUES


CMS_add0_cert(), CMS_add1_cert() and CMS_add0_crl() and CMS_add1_crl() return
1 for success and 0 for failure.

CMS_get1_certs() and CMS_get1_crls() return the STACK of certificates or CRLs
or NULL if there are none or an error occurs.
Besides out-of-memory, the only error which will occur
in practice is if the `cms` type is invalid.

## SEE ALSO


ERR_get_error(3),
CMS_sign(3), CMS_sign_ex(3), CMS_verify(3),
CMS_encrypt(3)

## HISTORY


CMS_add0_cert() and CMS_add1_cert() have been changed in OpenSSL 3.2
not to throw an error if a certificate to be added is already present.

## COPYRIGHT


Copyright 2008-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/CMS_add0_cert.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/CMS_add0_cert.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/CMS_add0_cert.pod`；SHA-256：`c1016f47c1a50fd9eaca130776fae3afa2359983b563180b0a498d71c9c5ea79`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
