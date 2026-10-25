---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-crmf-msg-get0-tmpl",
  "title": "OpenSSL：密码实现与接口 · OSSL_CRMF_MSG_get0_tmpl（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_CRMF_MSG_get0_tmpl"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "d22bcf7e518a41fcc3cb02816f1a9bc4c72cca61df6baca7ea53f703007c5cda",
  "generatedHash": "9b0ee3df903469911e4f01a0e63b7cf992d6696a75b956f81b296fb927cc0da9",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_CRMF_MSG_get0_tmpl, OSSL_CRMF_CERTTEMPLATE_get0_publicKey, OSSL_CRMF_CERTTEMPLATE_get0_subject, OSSL_CRMF_CERTTEMPLATE_get0_issuer, OSSL_CRMF_CERTTEMPLATE_get0_serialNumber, OSSL_CRMF_CERTTEMPLATE_get0_extensions, OSSL_CRMF_CERTID_get0_serialNumber, OSSL_CRMF_CERTID_get0_issuer, OSSL_CRMF_ENCRY",
  "l1": "OSSL_CRMF_MSG_get0_tmpl() retrieves the certificate template of `crm`. OSSL_CRMF_CERTTEMPLATE_get0_publicKey() retrieves the public key of the given certificate template `tmpl`. OSSL_CRMF_CERTTEMPLATE_get0_subject() retrieves the subject name of the given certificate template `tmpl`. OSSL_CRMF_CERTTEMPLATE_get0_issuer() retrieves the issuer name of the given certificate template `tmpl`. OSSL_CRMF_CERTTEMPLATE_get0_serialNumber() retrieves the serialNumber of the given certificate template `tmpl`. OSSL_CRMF_CERTTEMPLATE_get0_extensions() retrieves the X.509 extensions of the given certificate template `tmpl`, or NULL if not present. OSSL_CRMF_CERTID_get0_serialNumber retrieves the serialNumber of the given CertId `cid`. OSSL_CRMF_CERTID_get0_issuer retrieves the issuer name of the given CertId `cid`, which must be of ASN.1 type GEN_DIRNAME",
  "questions": [
    "OSSL_CRMF_MSG_get0_tmpl 如何用于密码实现与接口？",
    "OSSL_CRMF_MSG_get0_tmpl 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-crmf-msg-get0-tmpl",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_CRMF_MSG_get0_tmpl.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_CRMF_MSG_get0_tmpl（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_CRMF_MSG_get0_tmpl,
OSSL_CRMF_CERTTEMPLATE_get0_publicKey,
OSSL_CRMF_CERTTEMPLATE_get0_subject,
OSSL_CRMF_CERTTEMPLATE_get0_issuer,
OSSL_CRMF_CERTTEMPLATE_get0_serialNumber,
OSSL_CRMF_CERTTEMPLATE_get0_extensions,
OSSL_CRMF_CERTID_get0_serialNumber,
OSSL_CRMF_CERTID_get0_issuer,
OSSL_CRMF_ENCRYPTEDKEY_get1_encCert,
OSSL_CRMF_ENCRYPTEDKEY_get1_pkey,
OSSL_CRMF_ENCRYPTEDKEY_init_envdata,
OSSL_CRMF_ENCRYPTEDVALUE_decrypt,
OSSL_CRMF_ENCRYPTEDVALUE_get1_encCert,
OSSL_CRMF_MSG_get_certReqId,
OSSL_CRMF_MSG_centralkeygen_requested
- functions reading from CRMF CertReqMsg structures

## 技术正文

## NAME


OSSL_CRMF_MSG_get0_tmpl,
OSSL_CRMF_CERTTEMPLATE_get0_publicKey,
OSSL_CRMF_CERTTEMPLATE_get0_subject,
OSSL_CRMF_CERTTEMPLATE_get0_issuer,
OSSL_CRMF_CERTTEMPLATE_get0_serialNumber,
OSSL_CRMF_CERTTEMPLATE_get0_extensions,
OSSL_CRMF_CERTID_get0_serialNumber,
OSSL_CRMF_CERTID_get0_issuer,
OSSL_CRMF_ENCRYPTEDKEY_get1_encCert,
OSSL_CRMF_ENCRYPTEDKEY_get1_pkey,
OSSL_CRMF_ENCRYPTEDKEY_init_envdata,
OSSL_CRMF_ENCRYPTEDVALUE_decrypt,
OSSL_CRMF_ENCRYPTEDVALUE_get1_encCert,
OSSL_CRMF_MSG_get_certReqId,
OSSL_CRMF_MSG_centralkeygen_requested
- functions reading from CRMF CertReqMsg structures

## SYNOPSIS


```c
#include <openssl/crmf.h>

OSSL_CRMF_CERTTEMPLATE *OSSL_CRMF_MSG_get0_tmpl(const OSSL_CRMF_MSG *crm);
X509_PUBKEY
*OSSL_CRMF_CERTTEMPLATE_get0_publicKey(const OSSL_CRMF_CERTTEMPLATE *tmpl);
const X509_NAME
*OSSL_CRMF_CERTTEMPLATE_get0_subject(const OSSL_CRMF_CERTTEMPLATE *tmpl);
const X509_NAME
*OSSL_CRMF_CERTTEMPLATE_get0_issuer(const OSSL_CRMF_CERTTEMPLATE *tmpl);
const ASN1_INTEGER
*OSSL_CRMF_CERTTEMPLATE_get0_serialNumber(const OSSL_CRMF_CERTTEMPLATE *tmpl);
X509_EXTENSIONS
*OSSL_CRMF_CERTTEMPLATE_get0_extensions(const OSSL_CRMF_CERTTEMPLATE *tmpl);

const ASN1_INTEGER
*OSSL_CRMF_CERTID_get0_serialNumber(const OSSL_CRMF_CERTID *cid);
const X509_NAME *OSSL_CRMF_CERTID_get0_issuer(const OSSL_CRMF_CERTID *cid);

X509 *OSSL_CRMF_ENCRYPTEDKEY_get1_encCert(const OSSL_CRMF_ENCRYPTEDKEY *ecert,
                                          OSSL_LIB_CTX *libctx, const char *propq,
                                          EVP_PKEY *pkey, unsigned int flags);
EVP_PKEY
*OSSL_CRMF_ENCRYPTEDKEY_get1_pkey(OSSL_CRMF_ENCRYPTEDKEY *encryptedKey,
                                  X509_STORE *ts, STACK_OF(X509) *extra,
                                  EVP_PKEY *pkey, X509 *cert,
                                  ASN1_OCTET_STRING *secret,
                                  OSSL_LIB_CTX *libctx, const char *propq);
OSSL_CRMF_ENCRYPTEDKEY
*OSSL_CRMF_ENCRYPTEDKEY_init_envdata(CMS_EnvelopedData *envdata);

unsigned char
*OSSL_CRMF_ENCRYPTEDVALUE_decrypt(const OSSL_CRMF_ENCRYPTEDVALUE *enc,
                                  OSSL_LIB_CTX *libctx, const char *propq,
                                  EVP_PKEY *pkey, int *outlen);
X509
*OSSL_CRMF_ENCRYPTEDVALUE_get1_encCert(const OSSL_CRMF_ENCRYPTEDVALUE *ecert,
                                       OSSL_LIB_CTX *libctx, const char *propq,
                                       EVP_PKEY *pkey);

int OSSL_CRMF_MSG_get_certReqId(const OSSL_CRMF_MSG *crm);
int OSSL_CRMF_MSG_centralkeygen_requested(const OSSL_CRMF_MSG *crm,
                                          const X509_REQ *p10cr);

```

## DESCRIPTION


OSSL_CRMF_MSG_get0_tmpl() retrieves the certificate template of `crm`.

OSSL_CRMF_CERTTEMPLATE_get0_publicKey() retrieves the public key of the
given certificate template `tmpl`.

OSSL_CRMF_CERTTEMPLATE_get0_subject() retrieves the subject name of the
given certificate template `tmpl`.

OSSL_CRMF_CERTTEMPLATE_get0_issuer() retrieves the issuer name of the
given certificate template `tmpl`.

OSSL_CRMF_CERTTEMPLATE_get0_serialNumber() retrieves the serialNumber of the
given certificate template `tmpl`.

OSSL_CRMF_CERTTEMPLATE_get0_extensions() retrieves the X.509 extensions
of the given certificate template `tmpl`, or NULL if not present.

OSSL_CRMF_CERTID_get0_serialNumber retrieves the serialNumber
of the given CertId `cid`.

OSSL_CRMF_CERTID_get0_issuer retrieves the issuer name
of the given CertId `cid`, which must be of ASN.1 type GEN_DIRNAME.

OSSL_CRMF_ENCRYPTEDKEY_get1_encCert() decrypts the certificate in the given
encryptedKey `ecert`, using the private key `pkey`, library context
`libctx` and property query string `propq` (see OSSL_LIB_CTX(3)).
This is needed for the indirect POPO method as in RFC 4210 section 5.2.8.2.
The function returns the decrypted certificate as a copy, leaving its ownership
with the caller, who is responsible for freeing it.

OSSL_CRMF_ENCRYPTEDKEY_get1_pkey() decrypts the private key in `encryptedKey`.
If `encryptedKey` is not of type **OSSL_CRMF_ENCRYPTEDKEY_ENVELOPEDDATA**,
decryption uses the private key `pkey`.
The library context `libctx` and property query `propq` are taken into account as usual.
The rest of this paragraph is relevant only if CMS support not disabled for the OpenSSL build
and `encryptedKey` is of type case **OSSL_CRMF_ENCRYPTEDKEY_ENVELOPEDDATA**.
Decryption uses the `secret` parameter if not NULL;
otherwise uses the private key <pkey> and the certificate `cert` 
related to `pkey`, where `cert` is recommended to be given if available.
On success, the function verifies the decrypted data as signed data,
using the trust store `ts` and any untrusted certificates in `extra`.
Doing so, it checks for the purpose "CMP Key Generation Authority" (cmKGA).

OSSL_CRMF_ENCRYPTEDKEY_init_envdata() returns `OSSL_CRMF_ENCRYPTEDKEY`, intialized with 
the enveloped data `envdata`.

OSSL_CRMF_ENCRYPTEDVALUE_decrypt() decrypts the encrypted value in the given
encryptedValue `enc`, using the private key `pkey`, library context
`libctx` and property query string `propq` (see OSSL_LIB_CTX(3)).

OSSL_CRMF_ENCRYPTEDVALUE_get1_encCert() decrypts the certificate in the given
encryptedValue `ecert`, using the private key `pkey`, library context
`libctx` and property query string `propq` (see OSSL_LIB_CTX(3)).
This is needed for the indirect POPO method as in RFC 4210 section 5.2.8.2.
The function returns the decrypted certificate as a copy, leaving its ownership
with the caller, who is responsible for freeing it.

OSSL_CRMF_MSG_get_certReqId() retrieves the certReqId of `crm`.

OSSL_CRMF_MSG_centralkeygen_requested() returns 1 if central key generation
is requested i.e., the public key in the certificate request (`crm` is taken if it is non-NULL,
otherwise `p10cr`) is NULL or has an empty key value (with length zero).
In case `crm` is non-NULL, this is checked for consistency with its **popo** field
(must be NULL if and only if central key generation is requested).
Otherwise it returns 0, and on error a negative value.

## RETURN VALUES


OSSL_CRMF_MSG_get_certReqId() returns the certificate request ID as a
nonnegative integer or -1 on error.

OSSL_CRMF_MSG_centralkeygen_requested() returns 1 if central key generation
is requested, 0 if it is not requested, and a negative value on error.

All other functions return a pointer with the intended result or NULL on error.

## SEE ALSO


RFC 4211

## HISTORY


The OpenSSL CRMF support was added in OpenSSL 3.0.

OSSL_CRMF_CERTTEMPLATE_get0_publicKey() was added in OpenSSL 3.2.

OSSL_CRMF_ENCRYPTEDKEY_get1_encCert(), OSSL_CRMF_ENCRYPTEDKEY_get1_pkey(),
OSSL_CRMF_ENCRYPTEDKEY_init_envdata(), OSSL_CRMF_ENCRYPTEDVALUE_decrypt()
and OSSL_CRMF_MSG_centralkeygen_requested() were added in OpenSSL 3.5.

## COPYRIGHT


Copyright 2007-2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_CRMF_MSG_get0_tmpl.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_CRMF_MSG_get0_tmpl.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_CRMF_MSG_get0_tmpl.pod`；SHA-256：`d22bcf7e518a41fcc3cb02816f1a9bc4c72cca61df6baca7ea53f703007c5cda`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
