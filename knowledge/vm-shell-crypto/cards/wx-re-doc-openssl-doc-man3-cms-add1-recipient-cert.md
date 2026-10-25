---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-cms-add1-recipient-cert",
  "title": "OpenSSL：密码实现与接口 · CMS_add1_recipient_cert（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "CMS_add1_recipient_cert"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "ef13d8ca940b6682cf11ce6740cf77528bafd99e7d4ebf8e36597bfc82583c0e",
  "generatedHash": "e72322e5f508fbabeefd00a54fc37724ead7d978916914daa1d24c347f05026f",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：CMS_add1_recipient, CMS_add1_recipient_cert, CMS_add0_recipient_key - add recipients to a CMS enveloped data structure",
  "l1": "CMS_add1_recipient() adds recipient **recip** and provides the originator pkey **originatorPrivKey** and originator certificate **originator** to CMS_ContentInfo. The originator-related fields are relevant only in case when the keyAgreement method of providing of the shared key is in use. CMS_add1_recipient_cert() adds recipient **recip** to CMS_ContentInfo enveloped data structure **cms** as a KeyTransRecipientInfo structure. CMS_add0_recipient_key() adds symmetric key **key** of length **keylen** using wrapping algorithm **nid**, identifier **id** of length **idlen** and optional values **date**, **otherTypeId** and **otherType** to CMS_ContentInfo enveloped data structure **cms** as a KEKRecipientInfo structure. The CMS_ContentInfo structure should be obtained from an initial call to CMS_encrypt() with the flag **CMS_PARTIAL** set.",
  "questions": [
    "CMS_add1_recipient_cert 如何用于密码实现与接口？",
    "CMS_add1_recipient_cert 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-cms-add1-recipient-cert",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/CMS_add1_recipient_cert.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · CMS_add1_recipient_cert（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

CMS_add1_recipient, CMS_add1_recipient_cert, CMS_add0_recipient_key - add recipients to a CMS enveloped data structure

## 技术正文

## NAME


CMS_add1_recipient, CMS_add1_recipient_cert, CMS_add0_recipient_key - add recipients to a CMS enveloped data structure

## SYNOPSIS


```c
#include <openssl/cms.h>

CMS_RecipientInfo *CMS_add1_recipient(CMS_ContentInfo *cms, X509 *recip,
                                      EVP_PKEY *originatorPrivKey,
                                      X509 *originator, unsigned int flags);

CMS_RecipientInfo *CMS_add1_recipient_cert(CMS_ContentInfo *cms,
                                           X509 *recip, unsigned int flags);

CMS_RecipientInfo *CMS_add0_recipient_key(CMS_ContentInfo *cms, int nid,
                                          unsigned char *key, size_t keylen,
                                          unsigned char *id, size_t idlen,
                                          ASN1_GENERALIZEDTIME *date,
                                          ASN1_OBJECT *otherTypeId,
                                          ASN1_TYPE *otherType);

```

## DESCRIPTION


CMS_add1_recipient() adds recipient **recip** and provides the originator pkey
**originatorPrivKey** and originator certificate **originator** to CMS_ContentInfo.
The originator-related fields are relevant only in case when the keyAgreement
method of providing of the shared key is in use.

CMS_add1_recipient_cert() adds recipient **recip** to CMS_ContentInfo enveloped
data structure **cms** as a KeyTransRecipientInfo structure.

CMS_add0_recipient_key() adds symmetric key **key** of length **keylen** using
wrapping algorithm **nid**, identifier **id** of length **idlen** and optional
values **date**, **otherTypeId** and **otherType** to CMS_ContentInfo enveloped
data structure **cms** as a KEKRecipientInfo structure.

The CMS_ContentInfo structure should be obtained from an initial call to
CMS_encrypt() with the flag **CMS_PARTIAL** set.

## NOTES


The main purpose of this function is to provide finer control over a CMS
enveloped data structure where the simpler CMS_encrypt() function defaults are
not appropriate. For example if one or more KEKRecipientInfo structures
need to be added. New attributes can also be added using the returned
CMS_RecipientInfo structure and the CMS attribute utility functions.

OpenSSL will by default identify recipient certificates using issuer name
and serial number. If **CMS_USE_KEYID** is set it will use the subject key
identifier value instead. An error occurs if all recipient certificates do not
have a subject key identifier extension.

Currently only AES based key wrapping algorithms are supported for **nid**,
specifically: NID_id_aes128_wrap, NID_id_aes192_wrap and NID_id_aes256_wrap.
If **nid** is set to **NID_undef** then an AES wrap algorithm will be used
consistent with **keylen**.

## RETURN VALUES


CMS_add1_recipient_cert() and CMS_add0_recipient_key() return an internal
pointer to the CMS_RecipientInfo structure just added or NULL if an error
occurs.

## SEE ALSO


ERR_get_error(3), CMS_decrypt(3),
CMS_final(3),

## HISTORY


**CMS_add1_recipient_cert** and **CMS_add0_recipient_key** were added in
OpenSSL 3.0.

## COPYRIGHT


Copyright 2008-2020 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/CMS_add1_recipient_cert.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/CMS_add1_recipient_cert.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/CMS_add1_recipient_cert.pod`；SHA-256：`ef13d8ca940b6682cf11ce6740cf77528bafd99e7d4ebf8e36597bfc82583c0e`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
