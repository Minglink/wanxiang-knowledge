---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-cmp-msg-http-perform",
  "title": "OpenSSL：密码实现与接口 · OSSL_CMP_MSG_http_perform（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_CMP_MSG_http_perform"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "a80d3677d13cd9d33bd8439f61bd19f1a168779aeaeb5c5855b0a442c0232fd5",
  "generatedHash": "f3aa2ceefe81b82f9fd3dabe3fc159fd4ab357207cad0f514b5d1f50a87d94ae",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_CMP_MSG_http_perform - client-side HTTP(S) transfer of a CMP request-response pair",
  "l1": "OSSL_CMP_MSG_http_perform() sends the given PKIMessage `req` to the CMP server specified in `ctx` and returns the result obtained from it. If OSSL_CMP_CTX_set_transfer_cb_arg(3) has been used to set the transfer callback argument then the provided pointer `bios` is taken as a two-element **BIO** array to use for the exchange with the server as described for the `bio` and `rbio` parameters of OSSL_HTTP_open(3). For instance, the two BIO pointers may be equal and refer to a TLS connection, such as in BRSKI-AE where a pre-established TLS channel is reused for CMP. Otherwise the server specified via OSSL_CMP_CTX_set1_server(3) and optionally OSSL_CMP_CTX_set_serverPort(3) is contacted, where the default port is 80 for HTTP and 443 for HTTPS. The HTTP path (aka \"CMP alias\" in this context) to use is by default `/`, otherwise the string specifi",
  "questions": [
    "OSSL_CMP_MSG_http_perform 如何用于密码实现与接口？",
    "OSSL_CMP_MSG_http_perform 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-cmp-msg-http-perform",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_CMP_MSG_http_perform.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_CMP_MSG_http_perform（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_CMP_MSG_http_perform
- client-side HTTP(S) transfer of a CMP request-response pair

## 技术正文

## NAME


OSSL_CMP_MSG_http_perform
- client-side HTTP(S) transfer of a CMP request-response pair

## SYNOPSIS


```c
#include <openssl/cmp.h>

OSSL_CMP_MSG *OSSL_CMP_MSG_http_perform(OSSL_CMP_CTX *ctx,
                                        const OSSL_CMP_MSG *req);

```

## DESCRIPTION


OSSL_CMP_MSG_http_perform() sends the given PKIMessage `req` to the
CMP server specified in `ctx` and returns the result obtained from it.

If OSSL_CMP_CTX_set_transfer_cb_arg(3) has been used to set the transfer
callback argument then the provided pointer `bios` is taken as
a two-element **BIO** array to use for the exchange with the server
as described for the `bio` and `rbio` parameters of OSSL_HTTP_open(3).
For instance, the two BIO pointers may be equal and refer to a TLS connection,
such as in BRSKI-AE where a pre-established TLS channel is reused for CMP.

Otherwise the server specified via OSSL_CMP_CTX_set1_server(3)
and optionally OSSL_CMP_CTX_set_serverPort(3) is contacted,
where the default port is 80 for HTTP and 443 for HTTPS.
The HTTP path (aka "CMP alias" in this context) to use is by default `/`,
otherwise the string specified via OSSL_CMP_CTX_set1_serverPath(3).
On success the function returns the server's response PKIMessage.

The function makes use of any HTTP callback function
set via OSSL_CMP_CTX_set_http_cb(3).
It respects any timeout value set via OSSL_CMP_CTX_set_option(3)
with an **OSSL_CMP_OPT_MSG_TIMEOUT** argument.
It also respects any HTTP(S) proxy options set via OSSL_CMP_CTX_set1_proxy(3)
and OSSL_CMP_CTX_set1_no_proxy(3) and the respective environment variables.
Proxying plain HTTP is supported directly,
while using a proxy for HTTPS connections requires a suitable callback function
such as OSSL_HTTP_proxy_connect(3).

## NOTES


CMP is defined in RFC 4210.
HTTP transfer for CMP is defined in RFC 6712.

## RETURN VALUES


OSSL_CMP_MSG_http_perform()
returns the received CMP response message on success, else NULL.

## SEE ALSO


OSSL_CMP_CTX_new(3), OSSL_HTTP_open(3), and OSSL_HTTP_proxy_connect(3).

## HISTORY


The OpenSSL CMP support was added in OpenSSL 3.0.

The OSSL_CMP_MSG_http_perform() use of transfer_cb_arg was added in OpenSSL 3.5.

## COPYRIGHT


Copyright 2007-2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_CMP_MSG_http_perform.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_CMP_MSG_http_perform.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_CMP_MSG_http_perform.pod`；SHA-256：`a80d3677d13cd9d33bd8439f61bd19f1a168779aeaeb5c5855b0a442c0232fd5`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
