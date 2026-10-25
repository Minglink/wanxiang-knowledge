---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-cms-add1-signer",
  "title": "OpenSSL：密码实现与接口 · CMS_add1_signer（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "CMS_add1_signer"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "ab83426e07ebbe33a7c73b0212c93117e50edf8d044ecbdd9bf7aafe8ca095de",
  "generatedHash": "5ce87c49a21cbd5bca5489d4a83b29d377e97a3e5039fb506ba11b18f08162f9",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：CMS_add1_signer, CMS_SignerInfo_sign - add a signer to a CMS_ContentInfo signed data structure",
  "l1": "CMS_add1_signer() adds a signer with certificate **signcert** and private key **pkey** using message digest **md** to CMS_ContentInfo SignedData structure **cms**. The CMS_ContentInfo structure should be obtained from an initial call to CMS_sign() with the flag **CMS_PARTIAL** set or in the case or re-signing a valid CMS_ContentInfo SignedData structure. If the **md** parameter is **NULL** then the default digest for the public key algorithm will be used. Unless the **CMS_REUSE_DIGEST** flag is set the returned CMS_ContentInfo structure is not complete and must be finalized either by streaming (if applicable) or a call to CMS_final(). The CMS_SignerInfo_sign() function explicitly signs a CMS_SignerInfo structure, its main use is when the **CMS_REUSE_DIGEST** and **CMS_PARTIAL** flags are both set.",
  "questions": [
    "CMS_add1_signer 如何用于密码实现与接口？",
    "CMS_add1_signer 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-cms-add1-signer",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/CMS_add1_signer.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · CMS_add1_signer（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

CMS_add1_signer, CMS_SignerInfo_sign - add a signer to a CMS_ContentInfo signed data structure

## 技术正文

## NAME


CMS_add1_signer, CMS_SignerInfo_sign - add a signer to a CMS_ContentInfo signed data structure

## SYNOPSIS


```c
#include <openssl/cms.h>

CMS_SignerInfo *CMS_add1_signer(CMS_ContentInfo *cms, X509 *signcert,
                                EVP_PKEY *pkey, const EVP_MD *md,
                                unsigned int flags);

int CMS_SignerInfo_sign(CMS_SignerInfo *si);

```

## DESCRIPTION


CMS_add1_signer() adds a signer with certificate **signcert** and private
key **pkey** using message digest **md** to CMS_ContentInfo SignedData
structure **cms**.

The CMS_ContentInfo structure should be obtained from an initial call to
CMS_sign() with the flag **CMS_PARTIAL** set or in the case or re-signing a
valid CMS_ContentInfo SignedData structure.

If the **md** parameter is **NULL** then the default digest for the public
key algorithm will be used.

Unless the **CMS_REUSE_DIGEST** flag is set the returned CMS_ContentInfo
structure is not complete and must be finalized either by streaming (if
applicable) or a call to CMS_final().

The CMS_SignerInfo_sign() function explicitly signs a CMS_SignerInfo
structure, its main use is when the **CMS_REUSE_DIGEST** and **CMS_PARTIAL** flags
are both set.

## NOTES


The main purpose of CMS_add1_signer() is to provide finer control
over a CMS signed data structure where the simpler CMS_sign() function defaults
are not appropriate. For example if multiple signers or non default digest
algorithms are needed. New attributes can also be added using the returned
CMS_SignerInfo structure and the CMS attribute utility functions or the
CMS signed receipt request functions.

Any of the following flags (ored together) can be passed in the **flags**
parameter.

If **CMS_REUSE_DIGEST** is set then an attempt is made to copy the content
digest value from the CMS_ContentInfo structure: to add a signer to an existing
structure.  An error occurs if a matching digest value cannot be found to copy.
The returned CMS_ContentInfo structure will be valid and finalized when this
flag is set.

If **CMS_PARTIAL** is set in addition to **CMS_REUSE_DIGEST** then the
CMS_SignerInfo structure will not be finalized so additional attributes
can be added. In this case an explicit call to CMS_SignerInfo_sign() is
needed to finalize it.

If **CMS_NOCERTS** is set the signer's certificate will not be included in the
CMS_ContentInfo structure, the signer's certificate must still be supplied in
the **signcert** parameter though. This can reduce the size of the signature if
the signers certificate can be obtained by other means: for example a
previously signed message.

The SignedData structure includes several CMS signedAttributes including the
signing time, the CMS content type and the supported list of ciphers in an
SMIMECapabilities attribute. If **CMS_NOATTR** is set then no signedAttributes
will be used at all. If **CMS_NOSMIMECAP** is set then the SMIMECapabilities
will be omitted. If **CMS_NO_SIGNING_TIME** is set then the signing time will be
omitted.

OpenSSL will by default identify signing certificates using issuer name
and serial number. If **CMS_USE_KEYID** is set it will use the subject key
identifier value instead. An error occurs if the signing certificate does not
have a subject key identifier extension.

If present the SMIMECapabilities attribute indicates support for the following
algorithms in preference order: 256 bit AES, Gost R3411-94, Gost 28147-89, 192
bit AES, 128 bit AES, triple DES, 128 bit RC2, 64 bit RC2, DES and 40 bit RC2.
If any of these algorithms is not available then it will not be included: for example the GOST algorithms will not be included if the GOST ENGINE is
not loaded.

CMS_add1_signer() returns an internal pointer to the CMS_SignerInfo
structure just added, this can be used to set additional attributes
before it is finalized.

## RETURN VALUES


CMS_add1_signer() returns an internal pointer to the CMS_SignerInfo
structure just added or NULL if an error occurs.

CMS_SignerInfo_sign() returns 1 on success, 0 on failure.

## SEE ALSO


ERR_get_error(3), CMS_sign(3),
CMS_final(3),

## COPYRIGHT


Copyright 2014-2016 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/CMS_add1_signer.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/CMS_add1_signer.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/CMS_add1_signer.pod`；SHA-256：`ab83426e07ebbe33a7c73b0212c93117e50edf8d044ecbdd9bf7aafe8ca095de`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
