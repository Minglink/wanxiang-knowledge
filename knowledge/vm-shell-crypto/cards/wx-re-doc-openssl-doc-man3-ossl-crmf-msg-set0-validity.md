---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-crmf-msg-set0-validity",
  "title": "OpenSSL：密码实现与接口 · OSSL_CRMF_MSG_set0_validity（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_CRMF_MSG_set0_validity"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "288ce8bd6fbd0d9c8191f44843a39a63d9ddf141a1a8d25661c80d1768cfe7fa",
  "generatedHash": "293a01c37be1b8dca5816c86be0426cf66409c161d5047610182d58ff331684c",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_CRMF_MSG_set0_validity, OSSL_CRMF_MSG_set_certReqId, OSSL_CRMF_CERTTEMPLATE_fill, OSSL_CRMF_MSG_set0_extensions, OSSL_CRMF_MSG_push0_extension, OSSL_CRMF_MSG_create_popo, OSSL_CRMF_MSGS_verify_popo - functions populating and verifying CRMF CertReqMsg structures",
  "l1": "OSSL_CRMF_MSG_set0_validity() sets the `notBefore` and `notAfter` fields as validity constraints in the certTemplate of `crm`. Any of the `notBefore` and `notAfter` parameters may be NULL, which means no constraint for the respective field. On success ownership of `notBefore` and `notAfter` is transferred to `crm`. OSSL_CRMF_MSG_set_certReqId() sets `rid` as the certReqId of `crm`. OSSL_CRMF_CERTTEMPLATE_fill() sets those fields of the certTemplate `tmpl` for which non-NULL values are provided: `pubkey`, `subject`, `issuer`, and/or `serial`. X.509 extensions may be set using OSSL_CRMF_MSG_set0_extensions(). On success the reference counter of the `pubkey` (if given) is incremented, while the `subject`, `issuer`, and `serial` structures (if given) are copied. OSSL_CRMF_MSG_set0_extensions() sets `exts` as the extensions in the certTemplate",
  "questions": [
    "OSSL_CRMF_MSG_set0_validity 如何用于密码实现与接口？",
    "OSSL_CRMF_MSG_set0_validity 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-crmf-msg-set0-validity",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_CRMF_MSG_set0_validity.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_CRMF_MSG_set0_validity（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_CRMF_MSG_set0_validity,
OSSL_CRMF_MSG_set_certReqId,
OSSL_CRMF_CERTTEMPLATE_fill,
OSSL_CRMF_MSG_set0_extensions,
OSSL_CRMF_MSG_push0_extension,
OSSL_CRMF_MSG_create_popo,
OSSL_CRMF_MSGS_verify_popo
- functions populating and verifying CRMF CertReqMsg structures

## 技术正文

## NAME


OSSL_CRMF_MSG_set0_validity,
OSSL_CRMF_MSG_set_certReqId,
OSSL_CRMF_CERTTEMPLATE_fill,
OSSL_CRMF_MSG_set0_extensions,
OSSL_CRMF_MSG_push0_extension,
OSSL_CRMF_MSG_create_popo,
OSSL_CRMF_MSGS_verify_popo
- functions populating and verifying CRMF CertReqMsg structures

## SYNOPSIS


```c
#include <openssl/crmf.h>

int OSSL_CRMF_MSG_set0_validity(OSSL_CRMF_MSG *crm,
                                ASN1_TIME *notBefore, ASN1_TIME *notAfter);

int OSSL_CRMF_MSG_set_certReqId(OSSL_CRMF_MSG *crm, int rid);

int OSSL_CRMF_CERTTEMPLATE_fill(OSSL_CRMF_CERTTEMPLATE *tmpl,
                                EVP_PKEY *pubkey,
                                const X509_NAME *subject,
                                const X509_NAME *issuer,
                                const ASN1_INTEGER *serial);

int OSSL_CRMF_MSG_set0_extensions(OSSL_CRMF_MSG *crm, X509_EXTENSIONS *exts);

int OSSL_CRMF_MSG_push0_extension(OSSL_CRMF_MSG *crm, X509_EXTENSION *ext);

int OSSL_CRMF_MSG_create_popo(int meth, OSSL_CRMF_MSG *crm,
                              EVP_PKEY *pkey, const EVP_MD *digest,
                              OSSL_LIB_CTX *libctx, const char *propq);

int OSSL_CRMF_MSGS_verify_popo(const OSSL_CRMF_MSGS *reqs,
                               int rid, int acceptRAVerified,
                               OSSL_LIB_CTX *libctx, const char *propq);

```

## DESCRIPTION


OSSL_CRMF_MSG_set0_validity() sets the `notBefore` and `notAfter` fields
as validity constraints in the certTemplate of `crm`.
Any of the `notBefore` and `notAfter` parameters may be NULL,
which means no constraint for the respective field.
On success ownership of `notBefore` and `notAfter` is transferred to `crm`.

OSSL_CRMF_MSG_set_certReqId() sets `rid` as the certReqId of `crm`.

OSSL_CRMF_CERTTEMPLATE_fill() sets those fields of the certTemplate `tmpl`
for which non-NULL values are provided: `pubkey`, `subject`, `issuer`,
and/or `serial`.
X.509 extensions may be set using OSSL_CRMF_MSG_set0_extensions().
On success the reference counter of the `pubkey` (if given) is incremented,
while the `subject`, `issuer`, and `serial` structures (if given) are copied.

OSSL_CRMF_MSG_set0_extensions() sets `exts` as the extensions in the
certTemplate of `crm`. Frees any pre-existing ones and consumes `exts`.

OSSL_CRMF_MSG_push0_extension() pushes the X509 extension `ext` to the
extensions in the certTemplate of `crm`.  Consumes `ext`.

OSSL_CRMF_MSG_create_popo() creates and sets the Proof-of-Possession (POPO)
according to the method `meth` in `crm`.
The library context `libctx` and property query string `propq`,
may be NULL to select the defaults.
In case the method is OSSL_CRMF_POPO_SIGNATURE the POPO is calculated
using the private key `pkey` and the digest method `digest`,
where the `digest` argument is ignored if `pkey` is of a type (such as
Ed25519 and Ed448) that is implicitly associated with a digest algorithm.

`meth` can be one of the following:


- * OSSL_CRMF_POPO_NONE       - RFC 4211, section 4, POP field omitted.
CA/RA uses out-of-band method to verify POP. Note that servers may fail in this
case, resulting for instance in HTTP error code 500 (Internal error).

- * OSSL_CRMF_POPO_RAVERIFIED - RFC 4211, section 4, explicit indication
that the RA has already verified the POP.

- * OSSL_CRMF_POPO_SIGNATURE  - RFC 4211, section 4.1, only case 3 supported
so far.

- * OSSL_CRMF_POPO_KEYENC     - RFC 4211, section 4.2, only indirect method
(subsequentMessage/enccert) supported,
challenge-response exchange (challengeResp) not yet supported.

- * OSSL_CRMF_POPO_KEYAGREE   - RFC 4211, section 4.3, not yet supported.


OSSL_CRMF_MSGS_verify_popo verifies the Proof-of-Possession of the request with
the given `rid` in the list of `reqs`. Optionally accepts RAVerified. It can
make use of the library context `libctx` and property query string `propq`.

## RETURN VALUES


All functions return 1 on success, 0 on error.

## SEE ALSO


RFC 4211

## HISTORY


The OpenSSL CRMF support was added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2007-2023 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_CRMF_MSG_set0_validity.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_CRMF_MSG_set0_validity.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_CRMF_MSG_set0_validity.pod`；SHA-256：`288ce8bd6fbd0d9c8191f44843a39a63d9ddf141a1a8d25661c80d1768cfe7fa`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
