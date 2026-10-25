---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-cmp-validate-msg",
  "title": "OpenSSL：密码实现与接口 · OSSL_CMP_validate_msg（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_CMP_validate_msg"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "d6f42886f463a3bdbf125ce37143a61ea0bec7486c51d9cef4c69657bded6879",
  "generatedHash": "19aa2776070a42cbd504634982c8761210cc863c9391f500195d0a2b01d454f9",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_CMP_validate_msg, OSSL_CMP_validate_cert_path - functions for verifying CMP message protection",
  "l1": "This is the API for validating the protection of CMP messages, which includes validating CMP message sender certificates and their paths while optionally checking the revocation status of the certificates(s). OSSL_CMP_validate_msg() validates the protection of the given `msg`, which must be signature-based or using password-based MAC (PBM). In the former case a suitable trust anchor must be given in the CMP context `ctx`, and in the latter case the matching secret must have been set there using OSSL_CMP_CTX_set1_secretValue(3). In case of signature algorithm, the certificate to use for the signature check is preferably the one provided by a call to OSSL_CMP_CTX_set1_srvCert(3). If no such sender cert has been pinned then candidate sender certificates are taken from the list of certificates received in the `msg` extraCerts, then any certif",
  "questions": [
    "OSSL_CMP_validate_msg 如何用于密码实现与接口？",
    "OSSL_CMP_validate_msg 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-cmp-validate-msg",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_CMP_validate_msg.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_CMP_validate_msg（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_CMP_validate_msg,
OSSL_CMP_validate_cert_path
- functions for verifying CMP message protection

## 技术正文

## NAME


OSSL_CMP_validate_msg,
OSSL_CMP_validate_cert_path
- functions for verifying CMP message protection

## SYNOPSIS


```c
#include <openssl/cmp.h>
int OSSL_CMP_validate_msg(OSSL_CMP_CTX *ctx, OSSL_CMP_MSG *msg);
int OSSL_CMP_validate_cert_path(const OSSL_CMP_CTX *ctx,
                                X509_STORE *trusted_store, X509 *cert);

```

## DESCRIPTION


This is the API for validating the protection of CMP messages,
which includes validating CMP message sender certificates and their paths
while optionally checking the revocation status of the certificates(s).

OSSL_CMP_validate_msg() validates the protection of the given `msg`,
which must be signature-based or using password-based MAC (PBM).
In the former case a suitable trust anchor must be given in the CMP context
`ctx`, and in the latter case the matching secret must have been set there
using OSSL_CMP_CTX_set1_secretValue(3).

In case of signature algorithm, the certificate to use for the signature check
is preferably the one provided by a call to OSSL_CMP_CTX_set1_srvCert(3).
If no such sender cert has been pinned then candidate sender certificates are
taken from the list of certificates received in the `msg` extraCerts, then any
certificates provided before via OSSL_CMP_CTX_set1_untrusted(3), and
then all trusted certificates provided via OSSL_CMP_CTX_set0_trusted(3).
A candidate certificate is acceptable only if it is currently valid
(or the trust store contains a verification callback that overrides the verdict
that the certificate is expired or not yet valid), its subject DN matches
the `msg` sender DN (as far as present), and its subject key identifier
is present and matches the senderKID (as far as the latter is present).
Each acceptable cert is tried in the given order to see if the message
signature check succeeds and the cert and its path can be verified
using any trust store set via OSSL_CMP_CTX_set0_trusted(3).

If the option OSSL_CMP_OPT_PERMIT_TA_IN_EXTRACERTS_FOR_IR was set by calling
OSSL_CMP_CTX_set_option(3), for an Initialization Response (IP) message
any self-issued certificate from the `msg` extraCerts field may be used
as a trust anchor for the path verification of an 'acceptable' cert if it can be
used also to validate the issued certificate returned in the IP message. This is
according to TS 33.310 [Network Domain Security (NDS); Authentication Framework
(AF)] document specified by The 3rd Generation Partnership Project (3GPP).
Note that using this option is dangerous as the certificate obtained this way
has not been authenticated (at least not at CMP level).
Taking it over as a trust anchor implements trust-on-first-use (TOFU).

Any cert that has been found as described above is cached and tried first when
validating the signatures of subsequent messages in the same transaction.

OSSL_CMP_validate_cert_path() attempts to validate the given certificate and its
path using the given store of trusted certs (possibly including CRLs and a cert
verification callback) and non-trusted intermediate certs from the `ctx`.

## NOTES


CMP is defined in RFC 4210 (and CRMF in RFC 4211).

## RETURN VALUES


OSSL_CMP_validate_msg() and OSSL_CMP_validate_cert_path()
return 1 on success, 0 on error or validation failed.

## SEE ALSO


OSSL_CMP_CTX_new(3), OSSL_CMP_exec_certreq(3),
OSSL_CMP_CTX_set1_secretValue(3), OSSL_CMP_CTX_set1_srvCert(3),
OSSL_CMP_CTX_set1_untrusted(3), OSSL_CMP_CTX_set0_trusted(3)

## HISTORY


The OpenSSL CMP support was added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2007-2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_CMP_validate_msg.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_CMP_validate_msg.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_CMP_validate_msg.pod`；SHA-256：`d6f42886f463a3bdbf125ce37143a61ea0bec7486c51d9cef4c69657bded6879`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
