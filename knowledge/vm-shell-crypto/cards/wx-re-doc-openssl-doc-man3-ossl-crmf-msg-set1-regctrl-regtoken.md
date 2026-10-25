---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-crmf-msg-set1-regctrl-regtoken",
  "title": "OpenSSL：密码实现与接口 · OSSL_CRMF_MSG_set1_regCtrl_regToken（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_CRMF_MSG_set1_regCtrl_regToken"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "33459589862e9763503352f149dd54b8f4d01ef0bb895556d7b3c170e385631a",
  "generatedHash": "4681905992b4e1cf9180180f7f5eb86f5ac3f2e249cbc9c798ae213f0af8f523",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_CRMF_MSG_get0_regCtrl_regToken, OSSL_CRMF_MSG_set1_regCtrl_regToken, OSSL_CRMF_MSG_get0_regCtrl_authenticator, OSSL_CRMF_MSG_set1_regCtrl_authenticator, OSSL_CRMF_MSG_PKIPublicationInfo_push0_SinglePubInfo, OSSL_CRMF_MSG_set0_SinglePubInfo, OSSL_CRMF_MSG_set_PKIPublicationInfo_action, OSSL_CRMF",
  "l1": "Each of the OSSL_CRMF_MSG_get0_regCtrl_X() functions returns the respective control X in the given `msg`, if present. OSSL_CRMF_MSG_set1_regCtrl_regToken() sets the regToken control in the given `msg` copying the given `tok` as value. See RFC 4211, section 6.1. OSSL_CRMF_MSG_set1_regCtrl_authenticator() sets the authenticator control in the given `msg` copying the given `auth` as value. See RFC 4211, section 6.2. OSSL_CRMF_MSG_PKIPublicationInfo_push0_SinglePubInfo() pushes the given `spi` to `si`. Consumes the `spi` pointer. OSSL_CRMF_MSG_set0_SinglePubInfo() sets in the given SinglePubInfo `spi` the `method` and publication location, in the form of a GeneralName, `nm`. The publication location is optional, and therefore `nm` may be NULL. The function consumes the `nm` pointer if present. Available methods are: # define OSSL_CRMF_PUB_MET",
  "questions": [
    "OSSL_CRMF_MSG_set1_regCtrl_regToken 如何用于密码实现与接口？",
    "OSSL_CRMF_MSG_set1_regCtrl_regToken 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-crmf-msg-set1-regctrl-regtoken",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_CRMF_MSG_set1_regCtrl_regToken.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_CRMF_MSG_set1_regCtrl_regToken（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_CRMF_MSG_get0_regCtrl_regToken,
OSSL_CRMF_MSG_set1_regCtrl_regToken,
OSSL_CRMF_MSG_get0_regCtrl_authenticator,
OSSL_CRMF_MSG_set1_regCtrl_authenticator,
OSSL_CRMF_MSG_PKIPublicationInfo_push0_SinglePubInfo,
OSSL_CRMF_MSG_set0_SinglePubInfo,
OSSL_CRMF_MSG_set_PKIPublicationInfo_action,
OSSL_CRMF_MSG_get0_regCtrl_pkiPublicationInfo,
OSSL_CRMF_MSG_set1_regCtrl_pkiPublicationInfo,
OSSL_CRMF_MSG_get0_regCtrl_protocolEncrKey,
OSSL_CRMF_MSG_set1_regCtrl_protocolEncrKey,
OSSL_CRMF_MSG_get0_regCtrl_oldCertID,
OSSL_CRMF_MSG_set1_regCtrl_oldCertID,
OSSL_CRMF_CERTID_gen
- functions getting or setting CRMF Registration Controls

## 技术正文

## NAME


OSSL_CRMF_MSG_get0_regCtrl_regToken,
OSSL_CRMF_MSG_set1_regCtrl_regToken,
OSSL_CRMF_MSG_get0_regCtrl_authenticator,
OSSL_CRMF_MSG_set1_regCtrl_authenticator,
OSSL_CRMF_MSG_PKIPublicationInfo_push0_SinglePubInfo,
OSSL_CRMF_MSG_set0_SinglePubInfo,
OSSL_CRMF_MSG_set_PKIPublicationInfo_action,
OSSL_CRMF_MSG_get0_regCtrl_pkiPublicationInfo,
OSSL_CRMF_MSG_set1_regCtrl_pkiPublicationInfo,
OSSL_CRMF_MSG_get0_regCtrl_protocolEncrKey,
OSSL_CRMF_MSG_set1_regCtrl_protocolEncrKey,
OSSL_CRMF_MSG_get0_regCtrl_oldCertID,
OSSL_CRMF_MSG_set1_regCtrl_oldCertID,
OSSL_CRMF_CERTID_gen
- functions getting or setting CRMF Registration Controls

## SYNOPSIS


```c
#include <openssl/crmf.h>

ASN1_UTF8STRING
   *OSSL_CRMF_MSG_get0_regCtrl_regToken(const OSSL_CRMF_MSG *msg);
int OSSL_CRMF_MSG_set1_regCtrl_regToken(OSSL_CRMF_MSG *msg,
                                        const ASN1_UTF8STRING *tok);
ASN1_UTF8STRING
   *OSSL_CRMF_MSG_get0_regCtrl_authenticator(const OSSL_CRMF_MSG *msg);
int OSSL_CRMF_MSG_set1_regCtrl_authenticator(OSSL_CRMF_MSG *msg,
                                             const ASN1_UTF8STRING *auth);
int OSSL_CRMF_MSG_PKIPublicationInfo_push0_SinglePubInfo(
                                 OSSL_CRMF_PKIPUBLICATIONINFO *pi,
                                 OSSL_CRMF_SINGLEPUBINFO *spi);
int OSSL_CRMF_MSG_set0_SinglePubInfo(OSSL_CRMF_SINGLEPUBINFO *spi,
                                     int method, GENERAL_NAME *nm);
int OSSL_CRMF_MSG_set_PKIPublicationInfo_action(
                                 OSSL_CRMF_PKIPUBLICATIONINFO *pi, int action);
OSSL_CRMF_PKIPUBLICATIONINFO
   *OSSL_CRMF_MSG_get0_regCtrl_pkiPublicationInfo(const OSSL_CRMF_MSG *msg);
int OSSL_CRMF_MSG_set1_regCtrl_pkiPublicationInfo(OSSL_CRMF_MSG *msg,
                                       const OSSL_CRMF_PKIPUBLICATIONINFO *pi);
X509_PUBKEY
   *OSSL_CRMF_MSG_get0_regCtrl_protocolEncrKey(const OSSL_CRMF_MSG *msg);
int OSSL_CRMF_MSG_set1_regCtrl_protocolEncrKey(OSSL_CRMF_MSG *msg,
                                               const X509_PUBKEY *pubkey);
OSSL_CRMF_CERTID
   *OSSL_CRMF_MSG_get0_regCtrl_oldCertID(const OSSL_CRMF_MSG *msg);
int OSSL_CRMF_MSG_set1_regCtrl_oldCertID(OSSL_CRMF_MSG *msg,
                                         const OSSL_CRMF_CERTID *cid);
OSSL_CRMF_CERTID *OSSL_CRMF_CERTID_gen(const X509_NAME *issuer,
                                       const ASN1_INTEGER *serial);

```

## DESCRIPTION


Each of the OSSL_CRMF_MSG_get0_regCtrl_X() functions
returns the respective control X in the given `msg`, if present.

OSSL_CRMF_MSG_set1_regCtrl_regToken() sets the regToken control in the given
`msg` copying the given `tok` as value. See RFC 4211, section 6.1.

OSSL_CRMF_MSG_set1_regCtrl_authenticator() sets the authenticator control in
the given `msg` copying the given `auth` as value. See RFC 4211, section 6.2.

OSSL_CRMF_MSG_PKIPublicationInfo_push0_SinglePubInfo() pushes the given `spi`
to `si`. Consumes the `spi` pointer.

OSSL_CRMF_MSG_set0_SinglePubInfo() sets in the given SinglePubInfo `spi`
the `method` and publication location, in the form of a GeneralName, `nm`.
The publication location is optional, and therefore `nm` may be NULL.
The function consumes the `nm` pointer if present.
Available methods are:
```c
# define OSSL_CRMF_PUB_METHOD_DONTCARE 0
# define OSSL_CRMF_PUB_METHOD_X500     1
# define OSSL_CRMF_PUB_METHOD_WEB      2
# define OSSL_CRMF_PUB_METHOD_LDAP     3

```

OSSL_CRMF_MSG_set_PKIPublicationInfo_action() sets the action in the given `pi`
using the given `action` as value. See RFC 4211, section 6.3.
Available actions are:
```c
# define OSSL_CRMF_PUB_ACTION_DONTPUBLISH   0
# define OSSL_CRMF_PUB_ACTION_PLEASEPUBLISH 1

```

OSSL_CRMF_MSG_set1_regCtrl_pkiPublicationInfo() sets the pkiPublicationInfo
control in the given `msg` copying the given `tok` as value. See RFC 4211,
section 6.3.

OSSL_CRMF_MSG_set1_regCtrl_protocolEncrKey() sets the protocolEncrKey control in
the given `msg` copying the given `pubkey` as value. See RFC 4211 section 6.6.

OSSL_CRMF_MSG_set1_regCtrl_oldCertID() sets the **oldCertID** regToken control in
the given `msg` copying the given `cid` as value. See RFC 4211, section 6.5.

OSSL_CRMF_CERTID_gen produces an OSSL_CRMF_CERTID_gen structure copying the
given `issuer` name and `serial` number.

## RETURN VALUES


All OSSL_CRMF_MSG_get0_*() functions
return the respective pointer value or NULL if not present and on error.

All OSSL_CRMF_MSG_set1_*() functions return 1 on success, 0 on error.

OSSL_CRMF_CERTID_gen() returns a pointer to the resulting structure
or NULL on error.

## NOTES


A function OSSL_CRMF_MSG_set1_regCtrl_pkiArchiveOptions() for setting an
Archive Options Control is not yet implemented due to missing features to
create the needed OSSL_CRMF_PKIARCHIVEOPTINS content.

## SEE ALSO


RFC 4211

## HISTORY


The OpenSSL CRMF support was added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2007-2022 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_CRMF_MSG_set1_regCtrl_regToken.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_CRMF_MSG_set1_regCtrl_regToken.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_CRMF_MSG_set1_regCtrl_regToken.pod`；SHA-256：`33459589862e9763503352f149dd54b8f4d01ef0bb895556d7b3c170e385631a`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
