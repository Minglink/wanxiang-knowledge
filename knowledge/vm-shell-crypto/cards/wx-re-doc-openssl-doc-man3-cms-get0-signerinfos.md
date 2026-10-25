---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-cms-get0-signerinfos",
  "title": "OpenSSL：密码实现与接口 · CMS_get0_SignerInfos（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "CMS_get0_SignerInfos"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "a7a125239934e5507f9cefd37b4cc46e5a04f79d41e0427f93871c59fc625f81",
  "generatedHash": "93017887f146beb413e6d6db644ff2ad83208864f9348bb277d228063734396c",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：CMS_SignerInfo_set1_signer_cert, CMS_get0_SignerInfos, CMS_SignerInfo_get0_signer_id, CMS_SignerInfo_get0_signature, CMS_SignerInfo_cert_cmp - CMS signedData signer functions",
  "l1": "The function CMS_get0_SignerInfos() returns all the CMS_SignerInfo structures associated with a CMS signedData structure. CMS_SignerInfo_get0_signer_id() retrieves the certificate signer identifier associated with a specific CMS_SignerInfo structure **si**. Either the keyidentifier will be set in **keyid** or **both** issuer name and serial number in **issuer** and **sno**. CMS_SignerInfo_get0_signature() retrieves the signature associated with **si** in a pointer to an ASN1_OCTET_STRING structure. This pointer returned corresponds to the internal signature value if **si** so it may be read or modified. CMS_SignerInfo_cert_cmp() compares the certificate **cert** against the signer identifier **si**. It returns zero if the comparison is successful and non zero if not. CMS_SignerInfo_set1_signer_cert() sets the signers certificate of **si**",
  "questions": [
    "CMS_get0_SignerInfos 如何用于密码实现与接口？",
    "CMS_get0_SignerInfos 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-cms-get0-signerinfos",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/CMS_get0_SignerInfos.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · CMS_get0_SignerInfos（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

CMS_SignerInfo_set1_signer_cert,
CMS_get0_SignerInfos, CMS_SignerInfo_get0_signer_id,
CMS_SignerInfo_get0_signature, CMS_SignerInfo_cert_cmp
- CMS signedData signer functions

## 技术正文

## NAME


CMS_SignerInfo_set1_signer_cert,
CMS_get0_SignerInfos, CMS_SignerInfo_get0_signer_id,
CMS_SignerInfo_get0_signature, CMS_SignerInfo_cert_cmp
- CMS signedData signer functions

## SYNOPSIS


```c
#include <openssl/cms.h>

STACK_OF(CMS_SignerInfo) *CMS_get0_SignerInfos(CMS_ContentInfo *cms);

int CMS_SignerInfo_get0_signer_id(CMS_SignerInfo *si, ASN1_OCTET_STRING **keyid,
                                  X509_NAME **issuer, ASN1_INTEGER **sno);
ASN1_OCTET_STRING *CMS_SignerInfo_get0_signature(CMS_SignerInfo *si);
int CMS_SignerInfo_cert_cmp(CMS_SignerInfo *si, X509 *cert);
void CMS_SignerInfo_set1_signer_cert(CMS_SignerInfo *si, X509 *signer);

```

## DESCRIPTION


The function CMS_get0_SignerInfos() returns all the CMS_SignerInfo structures
associated with a CMS signedData structure.

CMS_SignerInfo_get0_signer_id() retrieves the certificate signer identifier
associated with a specific CMS_SignerInfo structure **si**. Either the
keyidentifier will be set in **keyid** or **both** issuer name and serial number
in **issuer** and **sno**.

CMS_SignerInfo_get0_signature() retrieves the signature associated with
**si** in a pointer to an ASN1_OCTET_STRING structure. This pointer returned
corresponds to the internal signature value if **si** so it may be read or
modified.

CMS_SignerInfo_cert_cmp() compares the certificate **cert** against the signer
identifier **si**. It returns zero if the comparison is successful and non zero
if not.

CMS_SignerInfo_set1_signer_cert() sets the signers certificate of **si** to
**signer**.

## NOTES


The main purpose of these functions is to enable an application to lookup
signers certificates using any appropriate technique when the simpler method
of CMS_verify() is not appropriate.

In typical usage and application will retrieve all CMS_SignerInfo structures
using CMS_get0_SignerInfo() and retrieve the identifier information using
CMS. It will then obtain the signer certificate by some unspecified means
(or return and error if it cannot be found) and set it using
CMS_SignerInfo_set1_signer_cert().

Once all signer certificates have been set CMS_verify() can be used.

Although CMS_get0_SignerInfos() can return NULL if an error occurs **or** if
there are no signers this is not a problem in practice because the only
error which can occur is if the **cms** structure is not of type signedData
due to application error.

## RETURN VALUES


CMS_get0_SignerInfos() returns all CMS_SignerInfo structures, or NULL there
are no signers or an error occurs.

CMS_SignerInfo_get0_signer_id() returns 1 for success and 0 for failure.

CMS_SignerInfo_cert_cmp() returns 0 for a successful comparison and non
zero otherwise.

CMS_SignerInfo_set1_signer_cert() does not return a value.

Any error can be obtained from ERR_get_error(3)

## SEE ALSO


ERR_get_error(3), CMS_verify(3)

## COPYRIGHT


Copyright 2008-2018 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/CMS_get0_SignerInfos.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/CMS_get0_SignerInfos.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/CMS_get0_SignerInfos.pod`；SHA-256：`a7a125239934e5507f9cefd37b4cc46e5a04f79d41e0427f93871c59fc625f81`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
