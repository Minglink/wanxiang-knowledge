---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-http-parse-url",
  "title": "OpenSSL：密码实现与接口 · OSSL_HTTP_parse_url（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_HTTP_parse_url"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "e04daf2658d99e39317dfcef11eaaaecc1041f04bea5df80e7036b76a6ce28cb",
  "generatedHash": "e191cba73771416b63d39cbc58aafdfff8663adf43dadca984a29bcd1eef2506",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_HTTP_adapt_proxy, OSSL_parse_url, OSSL_HTTP_parse_url, OCSP_parse_url - http utility functions",
  "l1": "OSSL_HTTP_adapt_proxy() takes an optional proxy hostname `proxy` and returns it transformed according to the optional `no_proxy` parameter, `server`, `use_ssl`, and the applicable environment variable, as follows. If `proxy` is NULL, take any default value from the `http_proxy` environment variable, or from `https_proxy` if `use_ssl` is nonzero. If this still does not yield a proxy hostname, take any further default value from the `HTTP_PROXY` environment variable, or from `HTTPS_PROXY` if `use_ssl` is nonzero. If `no_proxy` is NULL, take any default exclusion value from the `no_proxy` environment variable, or else from `NO_PROXY`. Return the determined proxy host unless the exclusion value, which is a list of proxy hosts separated by `,` and/or whitespace, contains `server`. Otherwise return NULL. When `server` is a string delimited by `",
  "questions": [
    "OSSL_HTTP_parse_url 如何用于密码实现与接口？",
    "OSSL_HTTP_parse_url 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-http-parse-url",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_HTTP_parse_url.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_HTTP_parse_url（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_HTTP_adapt_proxy,
OSSL_parse_url,
OSSL_HTTP_parse_url,
OCSP_parse_url
- http utility functions

## 技术正文

## NAME


OSSL_HTTP_adapt_proxy,
OSSL_parse_url,
OSSL_HTTP_parse_url,
OCSP_parse_url
- http utility functions

## SYNOPSIS


```c
#include <openssl/http.h>

const char *OSSL_HTTP_adapt_proxy(const char *proxy, const char *no_proxy,
                                  const char *server, int use_ssl);

int OSSL_parse_url(const char *url, char **pscheme, char **puser, char **phost,
                   char **pport, int *pport_num,
                   char **ppath, char **pquery, char **pfrag);
int OSSL_HTTP_parse_url(const char *url,
                        int *pssl, char **puser, char **phost,
                        char **pport, int *pport_num,
                        char **ppath, char **pquery, char **pfrag);

```

The following functions have been deprecated since OpenSSL 3.0, and can be
hidden entirely by defining **OPENSSL_API_COMPAT** with a suitable version value,
see openssl_user_macros(7):

```c
int OCSP_parse_url(const char *url, char **phost, char **pport, char **ppath,
                   int *pssl);

```

## DESCRIPTION


OSSL_HTTP_adapt_proxy() takes an optional proxy hostname `proxy`
and returns it transformed according to the optional `no_proxy` parameter,
`server`, `use_ssl`, and the applicable environment variable, as follows.
If `proxy` is NULL, take any default value from the `http_proxy`
environment variable, or from `https_proxy` if `use_ssl` is nonzero.
If this still does not yield a proxy hostname,
take any further default value from the `HTTP_PROXY`
environment variable, or from `HTTPS_PROXY` if `use_ssl` is nonzero.
If `no_proxy` is NULL, take any default exclusion value from the `no_proxy`
environment variable, or else from `NO_PROXY`.
Return the determined proxy host unless the exclusion value,
which is a list of proxy hosts separated by `,` and/or whitespace,
contains `server`.
Otherwise return NULL.
When `server` is a string delimited by `[` and `]`, which are used for IPv6
addresses, the enclosing `[` and `]` are stripped prior to comparison.

OSSL_parse_url() parses its input string `url` as a URL of the form
`[scheme://][userinfo@]host[:port][/path][?query][#fragment]` and splits it up
into scheme, userinfo, host, port, path, query, and fragment components.
The host (or server) component may be a DNS name or an IP address
where IPv6 addresses must be enclosed in square brackets `[` and `]`.
The port component is optional and defaults to `0`.
If given, it must be in decimal form.  If the `pport_num` argument is not NULL
the integer value of the port number is assigned to `*pport_num` on success.
The path component is also optional and defaults to `/`.
Each non-NULL result pointer argument `pscheme`, `puser`, `phost`, `pport`,
`ppath`, `pquery`, and `pfrag`, is assigned the respective url component.
Any IPv6 address in `*phost` is enclosed in `[` and `]`.
On success, they are guaranteed to contain non-NULL string pointers, else NULL.
It is the responsibility of the caller to free them using OPENSSL_free(3).
If `pquery` is NULL, any given query component is handled as part of the path.
A string returned via `*ppath` is guaranteed to begin with a `/` character.
For absent scheme, userinfo, port, query, and fragment components
an empty string is provided.

OSSL_HTTP_parse_url() is a special form of OSSL_parse_url()
where the scheme, if given, must be `http` or `https`.
If `pssl` is not NULL, `*pssl` is assigned 1 in case parsing was successful
and the scheme is `https`, else 0.
The port component is optional and defaults to `443` if the scheme is `https`,
else `80`.
Note that relative paths must be given with a leading `/`,
otherwise the first path element is interpreted as the host.

Calling the deprecated function OCSP_parse_url(url, host, port, path, ssl)
is equivalent to
OSSL_HTTP_parse_url(url, ssl, NULL, host, port, NULL, path, NULL, NULL).

## RETURN VALUES


OSSL_HTTP_adapt_proxy() returns NULL if no proxy is to be used,
otherwise a constant proxy hostname string,
which is either the proxy name handed in or an environment variable value.

OSSL_parse_url(), OSSL_HTTP_parse_url(), and OCSP_parse_url()
return 1 on success, 0 on error.

## SEE ALSO


OSSL_HTTP_transfer(3)

## HISTORY


OSSL_HTTP_adapt_proxy(),
OSSL_parse_url() and OSSL_HTTP_parse_url() were added in OpenSSL 3.0.
OCSP_parse_url() was deprecated in OpenSSL 3.0.

## COPYRIGHT


Copyright 2019-2022 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_HTTP_parse_url.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_HTTP_parse_url.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_HTTP_parse_url.pod`；SHA-256：`e04daf2658d99e39317dfcef11eaaaecc1041f04bea5df80e7036b76a6ce28cb`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
