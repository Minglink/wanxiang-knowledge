---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-cmp-exec-certreq",
  "title": "OpenSSL：密码实现与接口 · OSSL_CMP_exec_certreq（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_CMP_exec_certreq"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "191de7dbd5618b1c89cfeeba687459363ad225ad55171bdab73d8ade542191b5",
  "generatedHash": "37442d50872e0b264418eeb71903db6a505d6c22e2ff4b639f66238d4f51fdd0",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_CMP_exec_certreq, OSSL_CMP_exec_IR_ses, OSSL_CMP_exec_CR_ses, OSSL_CMP_exec_P10CR_ses, OSSL_CMP_exec_KUR_ses, OSSL_CMP_IR, OSSL_CMP_CR, OSSL_CMP_P10CR, OSSL_CMP_KUR, OSSL_CMP_try_certreq, OSSL_CMP_exec_RR_ses, OSSL_CMP_exec_GENM_ses, OSSL_CMP_get1_caCerts, OSSL_CMP_get1_rootCaKeyUpdate, OSSL_CM",
  "l1": "This is the OpenSSL API for doing CMP (Certificate Management Protocol) client-server transactions, i.e., sequences of CMP requests and responses. All functions take a populated OSSL_CMP_CTX structure as their first argument. Usually the server name, port, and path (\"CMP alias\") need to be set, as well as credentials the client can use for authenticating itself to the server. In order to authenticate the server the client typically needs a trust store. The functions return their respective main results directly, while there are also accessor functions for retrieving various results and status information from the `ctx`. See OSSL_CMP_CTX_new(3) etc. for details. The default conveying protocol is HTTP. Timeout values may be given per request-response pair and per transaction. See OSSL_CMP_MSG_http_perform(3) for details. OSSL_CMP_exec_IR_se",
  "questions": [
    "OSSL_CMP_exec_certreq 如何用于密码实现与接口？",
    "OSSL_CMP_exec_certreq 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-cmp-exec-certreq",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_CMP_exec_certreq.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_CMP_exec_certreq（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_CMP_exec_certreq,
OSSL_CMP_exec_IR_ses,
OSSL_CMP_exec_CR_ses,
OSSL_CMP_exec_P10CR_ses,
OSSL_CMP_exec_KUR_ses,
OSSL_CMP_IR,
OSSL_CMP_CR,
OSSL_CMP_P10CR,
OSSL_CMP_KUR,
OSSL_CMP_try_certreq,
OSSL_CMP_exec_RR_ses,
OSSL_CMP_exec_GENM_ses,
OSSL_CMP_get1_caCerts,
OSSL_CMP_get1_rootCaKeyUpdate,
OSSL_CMP_get1_crlUpdate,
OSSL_CMP_get1_certReqTemplate
- functions implementing CMP client transactions

## 技术正文

## NAME


OSSL_CMP_exec_certreq,
OSSL_CMP_exec_IR_ses,
OSSL_CMP_exec_CR_ses,
OSSL_CMP_exec_P10CR_ses,
OSSL_CMP_exec_KUR_ses,
OSSL_CMP_IR,
OSSL_CMP_CR,
OSSL_CMP_P10CR,
OSSL_CMP_KUR,
OSSL_CMP_try_certreq,
OSSL_CMP_exec_RR_ses,
OSSL_CMP_exec_GENM_ses,
OSSL_CMP_get1_caCerts,
OSSL_CMP_get1_rootCaKeyUpdate,
OSSL_CMP_get1_crlUpdate,
OSSL_CMP_get1_certReqTemplate
- functions implementing CMP client transactions

## SYNOPSIS


```c
#include <openssl/cmp.h>

X509 *OSSL_CMP_exec_certreq(OSSL_CMP_CTX *ctx, int req_type,
                            const OSSL_CRMF_MSG *crm);
X509 *OSSL_CMP_exec_IR_ses(OSSL_CMP_CTX *ctx);
X509 *OSSL_CMP_exec_CR_ses(OSSL_CMP_CTX *ctx);
X509 *OSSL_CMP_exec_P10CR_ses(OSSL_CMP_CTX *ctx);
X509 *OSSL_CMP_exec_KUR_ses(OSSL_CMP_CTX *ctx);
#define OSSL_CMP_IR
#define OSSL_CMP_CR
#define OSSL_CMP_P10CR
#define OSSL_CMP_KUR
int OSSL_CMP_try_certreq(OSSL_CMP_CTX *ctx, int req_type,
                         const OSSL_CRMF_MSG *crm, int *checkAfter);
int OSSL_CMP_exec_RR_ses(OSSL_CMP_CTX *ctx);

STACK_OF(OSSL_CMP_ITAV) *OSSL_CMP_exec_GENM_ses(OSSL_CMP_CTX *ctx);
int OSSL_CMP_get1_caCerts(OSSL_CMP_CTX *ctx, STACK_OF(X509) **out);
int OSSL_CMP_get1_rootCaKeyUpdate(OSSL_CMP_CTX *ctx,
                                  const X509 *oldWithOld, X509 **newWithNew,
                                  X509 **newWithOld, X509 **oldWithNew);
int OSSL_CMP_get1_crlUpdate(OSSL_CMP_CTX *ctx, const X509 *crlcert,
                            const X509_CRL *last_crl,
                            X509_CRL **crl);
int OSSL_CMP_get1_certReqTemplate(OSSL_CMP_CTX *ctx,
                                  OSSL_CRMF_CERTTEMPLATE **certTemplate,
                                  OSSL_CMP_ATAVS **keySpec);
```

## DESCRIPTION


This is the OpenSSL API for doing CMP (Certificate Management Protocol)
client-server transactions, i.e., sequences of CMP requests and responses.

All functions take a populated OSSL_CMP_CTX structure as their first argument.
Usually the server name, port, and path ("CMP alias") need to be set, as well as
credentials the client can use for authenticating itself to the server.
In order to authenticate the server the client typically needs a trust store.
The functions return their respective main results directly, while there are
also accessor functions for retrieving various results and status information
from the `ctx`. See OSSL_CMP_CTX_new(3) etc. for details.

The default conveying protocol is HTTP.
Timeout values may be given per request-response pair and per transaction.
See OSSL_CMP_MSG_http_perform(3) for details.

OSSL_CMP_exec_IR_ses() requests an initial certificate from the given PKI.

OSSL_CMP_exec_CR_ses() requests an additional certificate.

OSSL_CMP_exec_P10CR_ses() conveys a legacy PKCS#10 CSR requesting a certificate.

OSSL_CMP_exec_KUR_ses() obtains an updated certificate.

These four types of certificate enrollment are implemented as macros
calling OSSL_CMP_exec_certreq().

OSSL_CMP_exec_certreq() performs a certificate request of the type specified
by the `req_type` parameter, which may be IR, CR, P10CR, or KUR.
For IR, CR, and KUR, the certificate template to be used in the request
may be supplied via the `crm` parameter pointing to a CRMF structure.
Typically `crm` is NULL, then the template ingredients are taken from `ctx`
and need to be filled in using OSSL_CMP_CTX_set1_subjectName(3),
OSSL_CMP_CTX_set0_newPkey(3), OSSL_CMP_CTX_set1_oldCert(3), etc.
For P10CR, OSSL_CMP_CTX_set1_p10CSR(3) needs to be used instead.
The enrollment session may be blocked (with polling and sleeping in between)
until the server side can fully process and ultimately answer the request.

OSSL_CMP_try_certreq() is an alternative to the above functions that is
more flexible regarding what to do after receiving a checkAfter value.
When called for the first time (with no certificate request in progress for
the given `ctx`) it starts a new transaction by sending a certificate request
constructed as stated above using the `req_type` and optional `crm` parameter.
Otherwise (when according to `ctx` a 'waiting' status has been received before)
it continues polling for the pending request
unless the `req_type` argument is < 0, which aborts the request.
If the requested certificate is available the function returns 1 and the
caller can use OSSL_CMP_CTX_get0_newCert(3) to retrieve the new certificate.
If no error occurred but no certificate is available yet then
OSSL_CMP_try_certreq() remembers in the CMP context that it should be retried
and returns -1 after assigning the received checkAfter value
via the output pointer argument (unless it is NULL).
The checkAfter value indicates the number of seconds the caller should let pass
before trying again. The caller is free to sleep for the given number of seconds
or for some other time and/or to do anything else before retrying by calling
OSSL_CMP_try_certreq() again with the same parameter values as before.
OSSL_CMP_try_certreq() then polls
to see whether meanwhile the requested certificate is available.
If the caller decides to abort the pending certificate request and provides
a negative value as the `req_type` argument then OSSL_CMP_try_certreq()
aborts the CMP transaction by sending an error message to the server.

OSSL_CMP_exec_RR_ses() requests the revocation of the certificate
specified in the `ctx` using the issuer DN and serial number set by
OSSL_CMP_CTX_set1_issuer(3) and OSSL_CMP_CTX_set1_serialNumber(3), respectively,
otherwise the issuer DN and serial number
of the certificate set by OSSL_CMP_CTX_set1_oldCert(3),
otherwise the subject DN and public key
of the certificate signing request set by OSSL_CMP_CTX_set1_p10CSR(3).
RFC 4210 is vague in which PKIStatus should be returned by the server.
We take "accepted" and "grantedWithMods" as clear success and handle
"revocationWarning" and "revocationNotification" just as warnings because CAs
typically return them as an indication that the certificate was already revoked.
"rejection" is a clear error. The values "waiting" and "keyUpdateWarning"
make no sense for revocation and thus are treated as an error as well.
The revocation session may be blocked (with polling and sleeping in between)
until the server can fully process and ultimately answer the request.

OSSL_CMP_exec_GENM_ses() sends a genm general message containing the sequence of
infoType and infoValue pairs (InfoTypeAndValue; short: **ITAV**)
optionally provided in the `ctx` using OSSL_CMP_CTX_push0_genm_ITAV(3).
The message exchange may be blocked (with polling and sleeping in between)
until the server can fully process and ultimately answer the request.
On success the function records in `ctx` status **OSSL_CMP_PKISTATUS_accepted**
and returns the list of **ITAV**s received in a genp response message.
This can be used, for instance,
with infoType `signKeyPairTypes` to obtain the set of signature
algorithm identifiers that the CA will certify for subject public keys.
See RFC 4210 section 5.3.19 and appendix E.5 for details.
Functions implementing more specific genm/genp exchanges are described next.

OSSL_CMP_get1_caCerts() uses a genm/genp message exchange with infoType caCerts
to obtain a list of CA certificates from the CMP server referenced by `ctx`.
On success it assigns to `*out` the list of certificates received,
which must be freed by the caller.
NULL output means that no CA certificates were provided by the server.

OSSL_CMP_get1_rootCaKeyUpdate() uses a genm request message
with infoType rootCaCert to obtain from the CMP server referenced by `ctx`
in a genp response message with infoType rootCaKeyUpdate any update of the
given root CA certificate `oldWithOld` and verifies it as far as possible.
See RFC 4210 section 4.4 for details.
On success it assigns to `*newWithNew` the root certificate received.
When the `newWithOld` and `oldWithNew` output parameters are not NULL,
it assigns to them the corresponding transition certificates.
NULL means that the respective certificate was not provided by the server.
All certificates obtained this way must be freed by the caller.

**WARNING:**
The `newWithNew` certificate is meant to be a certificate that will be trusted.
The trust placed in it cannot be stronger than the trust placed in
the `oldwithold` certificate if present, otherwise it cannot be stronger than
the weakest trust in any of the certificates in the trust store of `ctx`.

OSSL_CMP_get1_crlUpdate() uses a genm request message with infoType crlStatusList
to obtain CRL from the CMP server referenced by `ctx` in a genp response message
with infoType crls. It uses `last_crl` and `crlcert` to create  
a request with a status field as described for OSSL_CMP_CRLSTATUS_create(3). 
On success it assigns to `*crl` the CRL received.
NULL means that no CRL was provided by the server.
The CRL obtained this way must be freed by the caller.

OSSL_CMP_get1_certReqTemplate() uses a genm request message with
infoType certReqTemplate to obtain a certificate request template from the
CMP server referenced by `ctx`. On success it assigns to `*certTemplate`
the certificate template received. NULL output means that no certificate
request template was provided by the server.
The optional `keySpec` output parameter is assigned the key specification
if received, otherwise it set to NULL.
Both must be freed by the caller.

## NOTES


CMP is defined in RFC 4210 (and CRMF in RFC 4211).

The CMP client implementation is limited to one request per CMP message
(and consequently to at most one response component per CMP message).

When a client obtains from a CMP server CA certificates that it is going to
trust, for instance via the caPubs field of a certificate response or using
functions like OSSL_CMP_get1_caCerts() and OSSL_CMP_get1_rootCaKeyUpdate(),
authentication of the CMP server is particularly critical.
So special care must be taken setting up server authentication in `ctx`
using functions such as
OSSL_CMP_CTX_set0_trusted(3) (for certificate-based authentication) or
OSSL_CMP_CTX_set1_secretValue(3) (for MAC-based protection).
If authentication is certificate-based, OSSL_CMP_CTX_get0_validatedSrvCert(3)
should be used to obtain the server validated certificate
and perform an authorization check based on it.

## RETURN VALUES


OSSL_CMP_exec_certreq(), OSSL_CMP_exec_IR_ses(), OSSL_CMP_exec_CR_ses(),
OSSL_CMP_exec_P10CR_ses(), and OSSL_CMP_exec_KUR_ses() return a
pointer to the newly obtained X509 certificate on success, NULL on error.
This pointer will be freed implicitly by OSSL_CMP_CTX_free() or
CSSL_CMP_CTX_reinit().

OSSL_CMP_try_certreq() returns 1 if the requested certificate is available
via OSSL_CMP_CTX_get0_newCert(3)
or on successfully aborting a pending certificate request, 0 on error, and -1
in case a 'waiting' status has been received and checkAfter value is available.
In the latter case OSSL_CMP_CTX_get0_newCert(3) yields NULL
and the output parameter `checkAfter` has been used to
assign the received value unless `checkAfter` is NULL.

OSSL_CMP_exec_RR_ses(), OSSL_CMP_get1_caCerts(),
OSSL_CMP_get1_rootCaKeyUpdate(), OSSL_CMP_get1_crlUpdate()
and OSSL_CMP_get1_certReqTemplate()
return 1 on success, 0 on error.

OSSL_CMP_exec_GENM_ses() returns NULL on error,
otherwise a pointer to the sequence of **ITAV** received, which may be empty.
This pointer must be freed by the caller.

## EXAMPLES


See OSSL_CMP_CTX for examples on how to prepare the context for these
functions.

## SEE ALSO


OSSL_CMP_CTX_new(3), OSSL_CMP_CTX_free(3),
OSSL_CMP_CTX_set1_subjectName(3), OSSL_CMP_CTX_set0_newPkey(3),
OSSL_CMP_CTX_set1_p10CSR(3), OSSL_CMP_CTX_set1_oldCert(3),
OSSL_CMP_CTX_get0_newCert(3), OSSL_CMP_CTX_push0_genm_ITAV(3),
OSSL_CMP_MSG_http_perform(3), OSSL_CMP_CRLSTATUS_create(3)

## HISTORY


The OpenSSL CMP support was added in OpenSSL 3.0.

OSSL_CMP_get1_caCerts() and OSSL_CMP_get1_rootCaKeyUpdate()
were added in OpenSSL 3.2.

Support for delayed delivery of all types of response messages
was added in OpenSSL 3.3.

OSSL_CMP_get1_crlUpdate() and OSSL_CMP_get1_certReqTemplate()
were added in OpenSSL 3.4.

## COPYRIGHT


Copyright 2007-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_CMP_exec_certreq.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_CMP_exec_certreq.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_CMP_exec_certreq.pod`；SHA-256：`191de7dbd5618b1c89cfeeba687459363ad225ad55171bdab73d8ade542191b5`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
