---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-pkey-derive",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY_derive（man3）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY_derive"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "bddafa9f0de027c16dcbdd3c41fd7c1824efb48da5bae429799bec1b99af8203",
  "generatedHash": "030d5d6d8be56a7a05a446a60cf23b95b30a59dfe90d3dfe521ecd77a1ced179",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY_derive_init, EVP_PKEY_derive_init_ex, EVP_PKEY_derive_set_peer_ex, EVP_PKEY_derive_set_peer, EVP_PKEY_derive - derive public key algorithm shared secret",
  "l1": "EVP_PKEY_derive_init() initializes a public key algorithm context `ctx` for shared secret derivation using the algorithm given when the context was created using EVP_PKEY_CTX_new(3) or variants thereof. The algorithm is used to fetch a **EVP_KEYEXCH** method implicitly, see provider(7)/Implicit fetch for more information about implicit fetches. EVP_PKEY_derive_init_ex() is the same as EVP_PKEY_derive_init() but additionally sets the passed parameters `params` on the context before returning. EVP_PKEY_derive_set_peer_ex() sets the peer key: this will normally be a public key. The `validate_peer` will validate the public key if this value is non zero. EVP_PKEY_derive_set_peer() is similar to EVP_PKEY_derive_set_peer_ex() with `validate_peer` set to 1. EVP_PKEY_derive() derives a shared secret using `ctx`. If `key` is NULL then the maximum s",
  "questions": [
    "EVP_PKEY_derive 如何用于非对称密钥与签名？",
    "EVP_PKEY_derive 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-pkey-derive",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_derive.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY_derive（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY_derive_init, EVP_PKEY_derive_init_ex,
EVP_PKEY_derive_set_peer_ex, EVP_PKEY_derive_set_peer, EVP_PKEY_derive
- derive public key algorithm shared secret

## 技术正文

## NAME


EVP_PKEY_derive_init, EVP_PKEY_derive_init_ex,
EVP_PKEY_derive_set_peer_ex, EVP_PKEY_derive_set_peer, EVP_PKEY_derive
- derive public key algorithm shared secret

## SYNOPSIS


```c
#include <openssl/evp.h>

int EVP_PKEY_derive_init(EVP_PKEY_CTX *ctx);
int EVP_PKEY_derive_init_ex(EVP_PKEY_CTX *ctx, const OSSL_PARAM params[]);
int EVP_PKEY_derive_set_peer_ex(EVP_PKEY_CTX *ctx, EVP_PKEY *peer,
                                int validate_peer);
int EVP_PKEY_derive_set_peer(EVP_PKEY_CTX *ctx, EVP_PKEY *peer);
int EVP_PKEY_derive(EVP_PKEY_CTX *ctx, unsigned char *key, size_t *keylen);

```

## DESCRIPTION


EVP_PKEY_derive_init() initializes a public key algorithm context `ctx` for
shared secret derivation using the algorithm given when the context was created
using EVP_PKEY_CTX_new(3) or variants thereof.  The algorithm is used to
fetch a **EVP_KEYEXCH** method implicitly, see provider(7)/Implicit fetch for
more information about implicit fetches.

EVP_PKEY_derive_init_ex() is the same as EVP_PKEY_derive_init() but additionally
sets the passed parameters `params` on the context before returning.

EVP_PKEY_derive_set_peer_ex() sets the peer key: this will normally
be a public key. The `validate_peer` will validate the public key if this value
is non zero.

EVP_PKEY_derive_set_peer() is similar to EVP_PKEY_derive_set_peer_ex() with
`validate_peer` set to 1.

EVP_PKEY_derive() derives a shared secret using `ctx`.
If `key` is NULL then the maximum size of the output buffer is written to the
`keylen` parameter. If `key` is not NULL then before the call the `keylen`
parameter should contain the length of the `key` buffer, if the call is
successful the shared secret is written to `key` and the amount of data
written to `keylen`.

## NOTES


After the call to EVP_PKEY_derive_init(), algorithm
specific control operations can be performed to set any appropriate parameters
for the operation.

The function EVP_PKEY_derive() can be called more than once on the same
context if several operations are performed using the same parameters.

## RETURN VALUES


EVP_PKEY_derive_init() and EVP_PKEY_derive() return 1
for success and 0 or a negative value for failure.
In particular a return value of -2 indicates the operation is not supported by
the public key algorithm.

## EXAMPLES


Derive shared secret (for example DH or EC keys):

```c
#include <openssl/evp.h>
#include <openssl/rsa.h>

EVP_PKEY_CTX *ctx;
ENGINE *eng;
unsigned char *skey;
size_t skeylen;
EVP_PKEY *pkey, *peerkey;
/* NB: assumes pkey, eng, peerkey have been already set up */

ctx = EVP_PKEY_CTX_new(pkey, eng);
if (!ctx)
    /* Error occurred */
if (EVP_PKEY_derive_init(ctx) <= 0)
    /* Error */
if (EVP_PKEY_derive_set_peer(ctx, peerkey) <= 0)
    /* Error */

/* Determine buffer length */
if (EVP_PKEY_derive(ctx, NULL, &skeylen) <= 0)
    /* Error */

skey = OPENSSL_malloc(skeylen);

if (!skey)
    /* malloc failure */

if (EVP_PKEY_derive(ctx, skey, &skeylen) <= 0)
    /* Error */

/* Shared secret is skey bytes written to buffer skey */

```

## SEE ALSO


EVP_PKEY_CTX_new(3),
EVP_PKEY_encrypt(3),
EVP_PKEY_decrypt(3),
EVP_PKEY_sign(3),
EVP_PKEY_verify(3),
EVP_PKEY_verify_recover(3),
EVP_KEYEXCH_fetch(3)

## HISTORY


The EVP_PKEY_derive_init(), EVP_PKEY_derive_set_peer() and EVP_PKEY_derive()
functions were originally added in OpenSSL 1.0.0.

The EVP_PKEY_derive_init_ex() and EVP_PKEY_derive_set_peer_ex() functions were
added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2006-2022 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_PKEY_derive.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_derive.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_PKEY_derive.pod`；SHA-256：`bddafa9f0de027c16dcbdd3c41fd7c1824efb48da5bae429799bec1b99af8203`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
