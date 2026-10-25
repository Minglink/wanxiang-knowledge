---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-cmp-srv-ctx-new",
  "title": "OpenSSL：密码实现与接口 · OSSL_CMP_SRV_CTX_new（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_CMP_SRV_CTX_new"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "a3cc76eb03145e45ae96a3780021522ea1be536bdd32db6dbbe58b886d129f20",
  "generatedHash": "5bcac2087f658ec7217c0bfb47b22fe7b353b2b76315006bf65779f2d010a8e6",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_CMP_SRV_process_request, OSSL_CMP_CTX_server_perform, OSSL_CMP_SRV_CTX_new, OSSL_CMP_SRV_CTX_free, OSSL_CMP_SRV_cert_request_cb_t, OSSL_CMP_SRV_rr_cb_t, OSSL_CMP_SRV_certConf_cb_t, OSSL_CMP_SRV_genm_cb_t, OSSL_CMP_SRV_error_cb_t, OSSL_CMP_SRV_pollReq_cb_t, OSSL_CMP_SRV_CTX_init, OSSL_CMP_SRV_de",
  "l1": "OSSL_CMP_SRV_process_request() implements the generic aspects of a CMP server. Its arguments are the **OSSL_CMP_SRV_CTX** `srv_ctx` and the CMP request message `req`. It does the typical generic checks on `req`, calls the respective callback function (if present) for more specific processing, and then assembles a result message, which may be a CMP error message. If after return of the function the expression `OSSL_CMP_CTX_get_status(OSSL_CMP_SRV_CTX_get0_cmp_ctx(srv_ctx))` yields -1 then the function has closed the current transaction, which may be due to normal successful end of the transaction or due to an error. OSSL_CMP_CTX_server_perform() is an interface to OSSL_CMP_SRV_process_request() that can be used by a CMP client in the same way as OSSL_CMP_MSG_http_perform(3). The **OSSL_CMP_SRV_CTX** must be set as `transfer_cb_arg` of `cli",
  "questions": [
    "OSSL_CMP_SRV_CTX_new 如何用于密码实现与接口？",
    "OSSL_CMP_SRV_CTX_new 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-cmp-srv-ctx-new",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_CMP_SRV_CTX_new.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_CMP_SRV_CTX_new（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_CMP_SRV_process_request,
OSSL_CMP_CTX_server_perform,
OSSL_CMP_SRV_CTX_new,
OSSL_CMP_SRV_CTX_free,
OSSL_CMP_SRV_cert_request_cb_t,
OSSL_CMP_SRV_rr_cb_t,
OSSL_CMP_SRV_certConf_cb_t,
OSSL_CMP_SRV_genm_cb_t,
OSSL_CMP_SRV_error_cb_t,
OSSL_CMP_SRV_pollReq_cb_t,
OSSL_CMP_SRV_CTX_init,
OSSL_CMP_SRV_delayed_delivery_cb_t,
OSSL_CMP_SRV_clean_transaction_cb_t,
OSSL_CMP_SRV_CTX_init_trans,
OSSL_CMP_SRV_CTX_get0_cmp_ctx,
OSSL_CMP_SRV_CTX_get0_custom_ctx,
OSSL_CMP_SRV_CTX_set_send_unprotected_errors,
OSSL_CMP_SRV_CTX_set_accept_unprotected,
OSSL_CMP_SRV_CTX_set_accept_raverified,
OSSL_CMP_SRV_CTX_set_grant_implicit_confirm
- generic functions to set up and control a CMP server

## 技术正文

## NAME


OSSL_CMP_SRV_process_request,
OSSL_CMP_CTX_server_perform,
OSSL_CMP_SRV_CTX_new,
OSSL_CMP_SRV_CTX_free,
OSSL_CMP_SRV_cert_request_cb_t,
OSSL_CMP_SRV_rr_cb_t,
OSSL_CMP_SRV_certConf_cb_t,
OSSL_CMP_SRV_genm_cb_t,
OSSL_CMP_SRV_error_cb_t,
OSSL_CMP_SRV_pollReq_cb_t,
OSSL_CMP_SRV_CTX_init,
OSSL_CMP_SRV_delayed_delivery_cb_t,
OSSL_CMP_SRV_clean_transaction_cb_t,
OSSL_CMP_SRV_CTX_init_trans,
OSSL_CMP_SRV_CTX_get0_cmp_ctx,
OSSL_CMP_SRV_CTX_get0_custom_ctx,
OSSL_CMP_SRV_CTX_set_send_unprotected_errors,
OSSL_CMP_SRV_CTX_set_accept_unprotected,
OSSL_CMP_SRV_CTX_set_accept_raverified,
OSSL_CMP_SRV_CTX_set_grant_implicit_confirm
- generic functions to set up and control a CMP server

## SYNOPSIS


```c
#include <openssl/cmp.h>

OSSL_CMP_MSG *OSSL_CMP_SRV_process_request(OSSL_CMP_SRV_CTX *srv_ctx,
                                           const OSSL_CMP_MSG *req);
OSSL_CMP_MSG *OSSL_CMP_CTX_server_perform(OSSL_CMP_CTX *client_ctx,
                                          const OSSL_CMP_MSG *req);
OSSL_CMP_SRV_CTX *OSSL_CMP_SRV_CTX_new(OSSL_LIB_CTX *libctx, const char *propq);
void OSSL_CMP_SRV_CTX_free(OSSL_CMP_SRV_CTX *srv_ctx);

typedef OSSL_CMP_PKISI *(*OSSL_CMP_SRV_cert_request_cb_t)(
                                                OSSL_CMP_SRV_CTX *srv_ctx,
                                                const OSSL_CMP_MSG *req,
                                                int certReqId,
                                                const OSSL_CRMF_MSG *crm,
                                                const X509_REQ *p10cr,
                                                X509 **certOut,
                                                STACK_OF(X509) **chainOut,
                                                STACK_OF(X509) **caPubs);
typedef OSSL_CMP_PKISI *(*OSSL_CMP_SRV_rr_cb_t)(OSSL_CMP_SRV_CTX *srv_ctx,
                                                const OSSL_CMP_MSG *req,
                                                const X509_NAME *issuer,
                                                const ASN1_INTEGER *serial);
typedef int (*OSSL_CMP_SRV_genm_cb_t)(OSSL_CMP_SRV_CTX *srv_ctx,
                                      const OSSL_CMP_MSG *req,
                                      STACK_OF(OSSL_CMP_ITAV) *in,
                                      STACK_OF(OSSL_CMP_ITAV) **out);
typedef void (*OSSL_CMP_SRV_error_cb_t)(OSSL_CMP_SRV_CTX *srv_ctx,
                                        const OSSL_CMP_MSG *req,
                                        const OSSL_CMP_PKISI *statusInfo,
                                        const ASN1_INTEGER *errorCode,
                                        const OSSL_CMP_PKIFREETEXT *errorDetails);
typedef int (*OSSL_CMP_SRV_certConf_cb_t)(OSSL_CMP_SRV_CTX *srv_ctx,
                                          const OSSL_CMP_MSG *req,
                                          int certReqId,
                                          const ASN1_OCTET_STRING *certHash,
                                          const OSSL_CMP_PKISI *si);
typedef int (*OSSL_CMP_SRV_pollReq_cb_t)(OSSL_CMP_SRV_CTX *srv_ctx,
                                         const OSSL_CMP_MSG *req,
                                         int certReqId,
                                         OSSL_CMP_MSG **certReq,
                                         int64_t *check_after);
int OSSL_CMP_SRV_CTX_init(OSSL_CMP_SRV_CTX *srv_ctx, void *custom_ctx,
                          OSSL_CMP_SRV_cert_request_cb_t process_cert_request,
                          OSSL_CMP_SRV_rr_cb_t process_rr,
                          OSSL_CMP_SRV_genm_cb_t process_genm,
                          OSSL_CMP_SRV_error_cb_t process_error,
                          OSSL_CMP_SRV_certConf_cb_t process_certConf,
                          OSSL_CMP_SRV_pollReq_cb_t process_pollReq);
typedef int (*OSSL_CMP_SRV_delayed_delivery_cb_t)(OSSL_CMP_SRV_CTX *srv_ctx,
                                                  const OSSL_CMP_MSG *req);
typedef int (*OSSL_CMP_SRV_clean_transaction_cb_t)(OSSL_CMP_SRV_CTX *srv_ctx,
                                                   const ASN1_OCTET_STRING *id);
int OSSL_CMP_SRV_CTX_init_trans(OSSL_CMP_SRV_CTX *srv_ctx,
                                OSSL_CMP_SRV_delayed_delivery_cb_t delay,
                                OSSL_CMP_SRV_clean_transaction_cb_t clean);

OSSL_CMP_CTX *OSSL_CMP_SRV_CTX_get0_cmp_ctx(const OSSL_CMP_SRV_CTX *srv_ctx);
void *OSSL_CMP_SRV_CTX_get0_custom_ctx(const OSSL_CMP_SRV_CTX *srv_ctx);

int OSSL_CMP_SRV_CTX_set_send_unprotected_errors(OSSL_CMP_SRV_CTX *srv_ctx,
                                                 int val);
int OSSL_CMP_SRV_CTX_set_accept_unprotected(OSSL_CMP_SRV_CTX *srv_ctx, int val);
int OSSL_CMP_SRV_CTX_set_accept_raverified(OSSL_CMP_SRV_CTX *srv_ctx, int val);
int OSSL_CMP_SRV_CTX_set_grant_implicit_confirm(OSSL_CMP_SRV_CTX *srv_ctx,
                                                int val);

```

## DESCRIPTION


OSSL_CMP_SRV_process_request() implements the generic aspects of a CMP server.
Its arguments are the **OSSL_CMP_SRV_CTX** `srv_ctx` and the CMP request message
`req`. It does the typical generic checks on `req`, calls
the respective callback function (if present) for more specific processing,
and then assembles a result message, which may be a CMP error message.
If after return of the function the expression
`OSSL_CMP_CTX_get_status(OSSL_CMP_SRV_CTX_get0_cmp_ctx(srv_ctx))` yields -1
then the function has closed the current transaction,
which may be due to normal successful end of the transaction or due to an error.

OSSL_CMP_CTX_server_perform() is an interface to
OSSL_CMP_SRV_process_request() that can be used by a CMP client
in the same way as OSSL_CMP_MSG_http_perform(3).
The **OSSL_CMP_SRV_CTX** must be set as `transfer_cb_arg` of `client_ctx`.

OSSL_CMP_SRV_CTX_new() creates and initializes an **OSSL_CMP_SRV_CTX** structure
associated with the library context `libctx` and property query string
`propq`, both of which may be NULL to select the defaults.

OSSL_CMP_SRV_CTX_free() deletes the given `srv_ctx`.
If the argument is NULL, nothing is done.

OSSL_CMP_SRV_CTX_init() sets in the given `srv_ctx` a custom server context
pointer as well as callback functions performing the specific processing of CMP
certificate requests, revocation requests, certificate confirmation requests,
general messages, error messages, and poll requests.
All arguments except `srv_ctx` may be NULL.
If a callback for some message type is not given this means that the respective
type of CMP message is not supported by the server.

OSSL_CMP_SRV_CTX_init_trans() sets in `srv_ctx` the optional callback
functions for initiating delayed delivery and cleaning up a transaction.
If the <delay> function is NULL then delivery of responses is never delayed.
Otherwise `delay` takes a custom server context and a request message as input.
It must return 1 if delivery of the respective response shall be delayed,
0 if not, and -1 on error.
If the <clean> function is NULL then no specific cleanup is performed.
Otherwise `clean` takes a custom server context and a transaction ID pointer
as input, where the pointer is NULL in case a new transaction is being started
and otherwise provides the ID of the transaction being terminated.
The <clean> function should reset the respective portions of the state
and free related memory.
It must return 1 on success and 0 on error.

OSSL_CMP_SRV_CTX_get0_cmp_ctx() returns the **OSSL_CMP_CTX** from the `srv_ctx`.

OSSL_CMP_SRV_CTX_get0_custom_ctx() returns the custom server context from
`srv_ctx` that has been set using OSSL_CMP_SRV_CTX_init().

OSSL_CMP_SRV_CTX_set_send_unprotected_errors() enables sending error messages
and other forms of negative responses unprotected.

OSSL_CMP_SRV_CTX_set_accept_unprotected() enables acceptance of requests
without protection of with invalid protection.

OSSL_CMP_SRV_CTX_set_accept_raverified() enables acceptance of ir/cr/kur
messages with POPO 'RAVerified'.

OSSL_CMP_SRV_CTX_set_grant_implicit_confirm() enables granting implicit
confirmation of newly enrolled certificates if requested.

## NOTES


CMP is defined in RFC 4210 (and CRMF in RFC 4211).

So far the CMP server implementation is limited to one request per CMP message
(and consequently to at most one response component per CMP message).

## RETURN VALUES


OSSL_CMP_SRV_CTX_new() returns a **OSSL_CMP_SRV_CTX** structure on success,
NULL on error.

OSSL_CMP_SRV_CTX_free() does not return a value.

OSSL_CMP_SRV_CTX_get0_cmp_ctx() returns a **OSSL_CMP_CTX** structure on success,
NULL on error.

OSSL_CMP_SRV_CTX_get0_custom_ctx() returns the custom server context
that has been set using OSSL_CMP_SRV_CTX_init().

All other functions return 1 on success, 0 on error.

## HISTORY


The OpenSSL CMP support was added in OpenSSL 3.0.

OSSL_CMP_SRV_CTX_init_trans()
supporting delayed delivery of all types of response messages
was added in OpenSSL 3.3.

## COPYRIGHT


Copyright 2007-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_CMP_SRV_CTX_new.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_CMP_SRV_CTX_new.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_CMP_SRV_CTX_new.pod`；SHA-256：`a3cc76eb03145e45ae96a3780021522ea1be536bdd32db6dbbe58b886d129f20`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
