---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-pkey-verify-recover",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY_verify_recover（man3）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY_verify_recover"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "baa90a9759f8aaaf0f9f215a7d385b65413e1b67e6f73c61024a8bf049c2f950",
  "generatedHash": "4b192d43bf8cc27f6cc5dd453704628db56241f6f3bac0dcf9118000ca9413e6",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY_verify_recover_init, EVP_PKEY_verify_recover_init_ex, EVP_PKEY_verify_recover_init_ex2, EVP_PKEY_verify_recover - recover signature using a public key algorithm",
  "l1": "EVP_PKEY_verify_recover_init() initializes a public key algorithm context `ctx` for signing using the algorithm given when the context was created using EVP_PKEY_CTX_new(3) or variants thereof. The algorithm is used to fetch a **EVP_SIGNATURE** method implicitly, see provider(7)/Implicit fetch for more information about implicit fetches. EVP_PKEY_verify_recover_init_ex() is the same as EVP_PKEY_verify_recover_init() but additionally sets the passed parameters `params` on the context before returning. EVP_PKEY_verify_recover_init_ex2() is the same as EVP_PKEY_verify_recover_init_ex(), but works with an explicitly fetched **EVP_SIGNATURE** `algo`. A context `ctx` without a pre-loaded key cannot be used with this function. Depending on what algorithm was fetched, certain details revolving around the treatment of the input to EVP_PKEY_verify(",
  "questions": [
    "EVP_PKEY_verify_recover 如何用于非对称密钥与签名？",
    "EVP_PKEY_verify_recover 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-pkey-verify-recover",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_verify_recover.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY_verify_recover（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY_verify_recover_init, EVP_PKEY_verify_recover_init_ex,
EVP_PKEY_verify_recover_init_ex2, EVP_PKEY_verify_recover
- recover signature using a public key algorithm

## 技术正文

## NAME


EVP_PKEY_verify_recover_init, EVP_PKEY_verify_recover_init_ex,
EVP_PKEY_verify_recover_init_ex2, EVP_PKEY_verify_recover
- recover signature using a public key algorithm

## SYNOPSIS


```c
#include <openssl/evp.h>

int EVP_PKEY_verify_recover_init(EVP_PKEY_CTX *ctx);
int EVP_PKEY_verify_recover_init_ex(EVP_PKEY_CTX *ctx,
                                    const OSSL_PARAM params[]);
int EVP_PKEY_verify_recover_init_ex2(EVP_PKEY_CTX *ctx, EVP_SIGNATURE *algo,
                                     const OSSL_PARAM params[]);
int EVP_PKEY_verify_recover(EVP_PKEY_CTX *ctx,
                            unsigned char *rout, size_t *routlen,
                            const unsigned char *sig, size_t siglen);

```

## DESCRIPTION


EVP_PKEY_verify_recover_init() initializes a public key algorithm context
`ctx` for signing using the algorithm given when the context was created
using EVP_PKEY_CTX_new(3) or variants thereof.  The algorithm is used to
fetch a **EVP_SIGNATURE** method implicitly, see provider(7)/Implicit fetch
for more information about implicit fetches.

EVP_PKEY_verify_recover_init_ex() is the same as
EVP_PKEY_verify_recover_init() but additionally sets the passed parameters
`params` on the context before returning.

EVP_PKEY_verify_recover_init_ex2() is the same as EVP_PKEY_verify_recover_init_ex(),
but works with an explicitly fetched **EVP_SIGNATURE** `algo`.
A context `ctx` without a pre-loaded key cannot be used with this function.
Depending on what algorithm was fetched, certain details revolving around the
treatment of the input to EVP_PKEY_verify() may be pre-determined, and in that
case, those details may normally not be changed.
See /NOTES below for a deeper explanation.

The EVP_PKEY_verify_recover() function recovers signed data
using `ctx`. The signature is specified using the `sig` and
`siglen` parameters. If `rout` is NULL then the maximum size of the output
buffer is written to the `routlen` parameter. If `rout` is not NULL then
before the call the `routlen` parameter should contain the length of the
`rout` buffer, if the call is successful recovered data is written to
`rout` and the amount of data written to `routlen`.

## NOTES


Normally an application is only interested in whether a signature verification
operation is successful in those cases the EVP_verify() function should be
used.

Sometimes however it is useful to obtain the data originally signed using a
signing operation. Only certain public key algorithms can recover a signature
in this way (for example RSA in PKCS padding mode).

After the call to EVP_PKEY_verify_recover_init() algorithm specific control
operations can be performed to set any appropriate parameters for the
operation.

After the call to EVP_PKEY_verify_recover_init_ex2(), algorithm specific control
operations may not be needed if the chosen algorithm implies that those controls
pre-set (and immutable).

The function EVP_PKEY_verify_recover() can be called more than once on the same
context if several operations are performed using the same parameters.

## RETURN VALUES


EVP_PKEY_verify_recover_init() and EVP_PKEY_verify_recover() return 1 for success
and 0 or a negative value for failure. In particular a return value of -2
indicates the operation is not supported by the public key algorithm.

## EXAMPLES


Recover digest originally signed using PKCS#1 and SHA256 digest:

```c
#include <openssl/evp.h>
#include <openssl/rsa.h>

EVP_PKEY_CTX *ctx;
unsigned char *rout, *sig;
size_t routlen, siglen;
EVP_PKEY *verify_key;

/*
 * NB: assumes verify_key, sig and siglen are already set up
 * and that verify_key is an RSA public key
 */
ctx = EVP_PKEY_CTX_new(verify_key, NULL /* no engine */);
if (!ctx)
    /* Error occurred */
if (EVP_PKEY_verify_recover_init(ctx) <= 0)
    /* Error */
if (EVP_PKEY_CTX_set_rsa_padding(ctx, RSA_PKCS1_PADDING) <= 0)
    /* Error */
if (EVP_PKEY_CTX_set_signature_md(ctx, EVP_sha256()) <= 0)
    /* Error */

/* Determine buffer length */
if (EVP_PKEY_verify_recover(ctx, NULL, &routlen, sig, siglen) <= 0)
    /* Error */

rout = OPENSSL_malloc(routlen);

if (!rout)
    /* malloc failure */

if (EVP_PKEY_verify_recover(ctx, rout, &routlen, sig, siglen) <= 0)
    /* Error */

/* Recovered data is routlen bytes written to buffer rout */

```

## SEE ALSO


EVP_PKEY_CTX_new(3),
EVP_PKEY_encrypt(3),
EVP_PKEY_decrypt(3),
EVP_PKEY_sign(3),
EVP_PKEY_verify(3),
EVP_PKEY_derive(3)

## HISTORY


The EVP_PKEY_verify_recover_init() and EVP_PKEY_verify_recover()
functions were added in OpenSSL 1.0.0.

The EVP_PKEY_verify_recover_init_ex() function was added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2013-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_PKEY_verify_recover.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_verify_recover.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_PKEY_verify_recover.pod`；SHA-256：`baa90a9759f8aaaf0f9f215a7d385b65413e1b67e6f73c61024a8bf049c2f950`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
