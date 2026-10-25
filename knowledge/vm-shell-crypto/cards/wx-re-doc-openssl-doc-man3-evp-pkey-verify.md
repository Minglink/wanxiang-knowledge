---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-pkey-verify",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY_verify（man3）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY_verify"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "163d055c81a15946b87456c99c33a395efae8792cf9d041ca6129dc49087ca73",
  "generatedHash": "e14f885dcfb48e45d1a4490237caf1ec849260738d61e3b2f88896c3db385cbb",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY_verify_init, EVP_PKEY_verify_init_ex, EVP_PKEY_verify_init_ex2, EVP_PKEY_verify, EVP_PKEY_verify_message_init, EVP_PKEY_verify_message_update, EVP_PKEY_verify_message_final, EVP_PKEY_CTX_set_signature - signature verification using a public key algorithm",
  "l1": "EVP_PKEY_verify_init() initializes a public key algorithm context `ctx` for verification using the algorithm given when the context was created using EVP_PKEY_CTX_new(3) or variants thereof. The algorithm is used to fetch a **EVP_SIGNATURE** method implicitly, see provider(7)/Implicit fetch for more information about implicit fetches. EVP_PKEY_verify_init_ex() is the same as EVP_PKEY_verify_init() but additionally sets the passed parameters `params` on the context before returning. EVP_PKEY_verify_init_ex2() is the same as EVP_PKEY_verify_init_ex(), but works with an explicitly fetched **EVP_SIGNATURE** `algo`. A context `ctx` without a pre-loaded key cannot be used with this function. Depending on what algorithm was fetched, certain details revolving around the treatment of the input to EVP_PKEY_verify() may be pre-determined, and in tha",
  "questions": [
    "EVP_PKEY_verify 如何用于非对称密钥与签名？",
    "EVP_PKEY_verify 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-pkey-verify",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_verify.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY_verify（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY_verify_init, EVP_PKEY_verify_init_ex, EVP_PKEY_verify_init_ex2,
EVP_PKEY_verify, EVP_PKEY_verify_message_init, EVP_PKEY_verify_message_update,
EVP_PKEY_verify_message_final, EVP_PKEY_CTX_set_signature - signature
verification using a public key algorithm

## 技术正文

## NAME


EVP_PKEY_verify_init, EVP_PKEY_verify_init_ex, EVP_PKEY_verify_init_ex2,
EVP_PKEY_verify, EVP_PKEY_verify_message_init, EVP_PKEY_verify_message_update,
EVP_PKEY_verify_message_final, EVP_PKEY_CTX_set_signature - signature
verification using a public key algorithm

## SYNOPSIS


```c
#include <openssl/evp.h>

int EVP_PKEY_verify_init(EVP_PKEY_CTX *ctx);
int EVP_PKEY_verify_init_ex(EVP_PKEY_CTX *ctx, const OSSL_PARAM params[]);
int EVP_PKEY_verify_init_ex2(EVP_PKEY_CTX *ctx, EVP_SIGNATURE *algo,
                             const OSSL_PARAM params[]);
int EVP_PKEY_verify_message_init(EVP_PKEY_CTX *ctx, EVP_SIGNATURE *algo,
                                 const OSSL_PARAM params[]);
int EVP_PKEY_CTX_set_signature(EVP_PKEY_CTX *pctx,
                               const unsigned char *sig, size_t siglen);
int EVP_PKEY_verify_message_update(EVP_PKEY_CTX *ctx,
                                   unsigned char *in, size_t inlen);
int EVP_PKEY_verify_message_final(EVP_PKEY_CTX *ctx);
int EVP_PKEY_verify(EVP_PKEY_CTX *ctx,
                    const unsigned char *sig, size_t siglen,
                    const unsigned char *tbs, size_t tbslen);

```

## DESCRIPTION


EVP_PKEY_verify_init() initializes a public key algorithm context `ctx` for
verification using the algorithm given when the context was created
using EVP_PKEY_CTX_new(3) or variants thereof.  The algorithm is used to
fetch a **EVP_SIGNATURE** method implicitly, see provider(7)/Implicit fetch
for more information about implicit fetches.

EVP_PKEY_verify_init_ex() is the same as EVP_PKEY_verify_init() but additionally
sets the passed parameters `params` on the context before returning.

EVP_PKEY_verify_init_ex2() is the same as EVP_PKEY_verify_init_ex(), but works
with an explicitly fetched **EVP_SIGNATURE** `algo`.
A context `ctx` without a pre-loaded key cannot be used with this function.
Depending on what algorithm was fetched, certain details revolving around the
treatment of the input to EVP_PKEY_verify() may be pre-determined, and in that
case, those details may normally not be changed.
See /NOTES below for a deeper explanation.

EVP_PKEY_verify_message_init() initializes a public key algorithm context
`ctx` for verifying an unlimited size message using the algorithm given by
`algo` and the key given through EVP_PKEY_CTX_new(3) or
EVP_PKEY_CTX_new_from_pkey(3).
Passing the message is supported both in a one-shot fashion using
EVP_PKEY_verify(), and through the combination of EVP_PKEY_verify_update() and
EVP_PKEY_verify_final().
This function enables using algorithms that can process input of arbitrary
length, such as ED25519, RSA-SHA256 and similar.

EVP_PKEY_CTX_set_signature() specifies the `siglen` bytes long signature
`sig` to be verified against by EVP_PKEY_verify_final().
It `must` be used together with EVP_PKEY_verify_update() and
EVP_PKEY_verify_final().
See /NOTES below for a deeper explanation.

EVP_PKEY_verify_update() adds `inlen` bytes from `in` to the data to be
processed for verification.  The signature algorithm specification and
implementation determine how the input bytes are processed and if there's a
limit on the total size of the input.  See /NOTES below for a deeper
explanation.

EVP_PKEY_verify_final() verifies the processed data, given only `ctx`.
The signature to verify against must have been given with
EVP_PKEY_CTX_set_signature().

EVP_PKEY_verify() is a one-shot function that performs the same thing as
EVP_PKEY_CTX_set_signature() call with `sig` and `siglen` as parameters,
followed by a single EVP_PKEY_verify_update() call with `tbs` and `tbslen`,
followed by EVP_PKEY_verify_final() call.

## NOTES



### General


Some signature implementations only accumulate the input data and do no
further processing before verifying it (they expect the input to be a digest),
while others compress the data, typically by internally producing a digest,
and signing the result, which is then verified against a given signature.
Some of them support both modes of operation at the same time.
The caller is expected to know how the chosen algorithm is supposed to behave
and under what conditions.

For example, an RSA implementation can be expected to only expect a digest as
input, while ED25519 can be expected to process the input with a hash, i.e.
to produce the digest internally, and while RSA-SHA256 can be expected to
handle either mode of operation, depending on if the operation was initialized
with EVP_PKEY_verify_init_ex2() or with EVP_PKEY_verify_message_init().

Similarly, an RSA implementation usually expects additional details to be set,
like the message digest algorithm that the input is supposed to be digested
with, as well as the padding mode (see EVP_PKEY_CTX_set_signature_md(3) and
EVP_PKEY_CTX_set_rsa_padding(3) and similar others), while an RSA-SHA256
implementation usually has these details pre-set and immutable.

The functions described here can't be used to combine separate algorithms.  In
particular, neither EVP_PKEY_CTX_set_signature_md(3) nor the **OSSL_PARAM**
parameter "digest" (**OSSL_SIGNATURE_PARAM_DIGEST**) can be used to combine a
signature algorithm with a hash algorithm to process the input.  In other
words, it's not possible to specify a `ctx` pre-loaded with an RSA pkey, or
an `algo` that fetched `RSA` and try to specify SHA256 separately to get the
functionality of RSA-SHA256.  If combining algorithms in that manner is
desired, please use EVP_DigestVerifyInit(3) and associated functions, or
EVP_VerifyInit(3) and associated functions.

### Performing multiple verifications


When initialized using EVP_PKEY_verify_init_ex() or  EVP_PKEY_verify_init_ex2(),
EVP_PKEY_verify() can be called more than once on the same context to have
several one-shot operations performed using the same parameters.

When initialized using EVP_PKEY_verify_message_init(), it's not possible to
call EVP_PKEY_verify() multiple times.

### On EVP_PKEY_CTX_set_signature()


Some signature algorithms (such as LMS) require the signature verification
data be specified before verifying the message.
Other algorithms allow the signature to be specified late.
To allow either way (which may depend on the application's flow of input), the
signature to be verified against `must` be specified using this function when
using EVP_PKEY_verify_message_update() and EVP_PKEY_verify_message_final() to
perform the verification.

## RETURN VALUES


All functions return 1 for success and 0 or a negative value for failure.
However, unlike other functions, the return value 0 from EVP_PKEY_verify(),
EVP_PKEY_verify_recover() and EVP_PKEY_verify_message_final() only indicates
that the signature did not verify successfully (that is tbs did not match the
original data or the signature was of invalid form) it is not an indication of
a more serious error.

A negative value indicates an error other that signature verification failure.
In particular a return value of -2 indicates the operation is not supported by
the public key algorithm.

## EXAMPLES



### RSA with PKCS#1 padding for SHA256


Verify signature using PKCS#1 padding and a SHA256 digest as input:

```c
#include <openssl/evp.h>
#include <openssl/rsa.h>

EVP_PKEY_CTX *ctx;
unsigned char *md, *sig;
size_t mdlen, siglen;
EVP_PKEY *verify_key;

/*
 * NB: assumes verify_key, sig, siglen md and mdlen are already set up
 * and that verify_key is an RSA public key
 */
ctx = EVP_PKEY_CTX_new(verify_key, NULL /* no engine */);
if (ctx == NULL)
    /* Error occurred */
if (EVP_PKEY_verify_init(ctx) <= 0)
    /* Error */
if (EVP_PKEY_CTX_set_rsa_padding(ctx, RSA_PKCS1_PADDING) <= 0)
    /* Error */
if (EVP_PKEY_CTX_set_signature_md(ctx, EVP_sha256()) <= 0)
    /* Error */

/* Perform operation */
ret = EVP_PKEY_verify(ctx, sig, siglen, md, mdlen);

/*
 * ret == 1 indicates success, 0 verify failure and < 0 for some
 * other error.
 */

```

### RSA-SHA256 with a pre-computed digest


Verify a digest with RSA-SHA256 using one-shot functions.  To be noted is that
RSA-SHA256 is assumed to be an implementation of `sha256WithRSAEncryption`,
for which the padding is pre-determined to be **RSA_PKCS1_PADDING**, and the
input digest is assumed to have been computed using SHA256.

```c
#include <openssl/evp.h>
#include <openssl/rsa.h>

EVP_PKEY_CTX *ctx;
/* md is a SHA-256 digest in this example. */
unsigned char *md, *sig;
size_t mdlen = 32, siglen;
EVP_PKEY *signing_key;

/*
 * NB: assumes verify_key, sig, siglen, md and mdlen are already set up
 * and that verify_key is an RSA public key
 */
ctx = EVP_PKEY_CTX_new(signing_key, NULL /* no engine */);
alg = EVP_SIGNATURE_fetch(NULL, "RSA-SHA256", NULL);

if (ctx == NULL)
    /* Error occurred */
if (EVP_PKEY_verify_init_ex2(ctx, alg, NULL) <= 0)
    /* Error */

/* Determine buffer length */
if (EVP_PKEY_verify(ctx, sig, siglen, md, mdlen) <= 0)
    /* Error or signature doesn't verify */

/* Perform operation */
ret = EVP_PKEY_verify(ctx, sig, siglen, md, mdlen);

/*
 * ret == 1 indicates success, 0 verify failure and < 0 for some
 * other error.
 */

```

### RSA-SHA256, one-shot


Verify a document with RSA-SHA256 using one-shot functions.
To be noted is that RSA-SHA256 is assumed to be an implementation of
`sha256WithRSAEncryption`, for which the padding is pre-determined to be
**RSA_PKCS1_PADDING**.

```c
#include <openssl/evp.h>
#include <openssl/rsa.h>

EVP_PKEY_CTX *ctx;
/* in the input in this example. */
unsigned char *in, *sig;
/* inlen is the length of the input in this example. */
size_t inlen, siglen;
EVP_PKEY *signing_key;
EVP_SIGNATURE *alg;

/*
 * NB: assumes signing_key, in and inlen are set up before
 * the next step. signing_key must be an RSA private key,
 * in must point to data to be digested and signed, and
 * inlen must be the size of the data in bytes.
 */
ctx = EVP_PKEY_CTX_new(signing_key, NULL /* no engine */);
alg = EVP_SIGNATURE_fetch(NULL, "RSA-SHA256", NULL);

if (ctx == NULL || alg == NULL)
    /* Error occurred */
if (EVP_PKEY_verify_message_init(ctx, alg, NULL) <= 0)
    /* Error */

/* Perform operation */
ret = EVP_PKEY_verify(ctx, sig, siglen, in, inlen);

/*
 * ret == 1 indicates success, 0 verify failure and < 0 for some
 * other error.
 */

```

### RSA-SHA256, using update and final


This is the same as the previous example, but allowing stream-like
functionality.

```c
#include <openssl/evp.h>
#include <openssl/rsa.h>

EVP_PKEY_CTX *ctx;
/* in is the input in this example. */
unsigned char *in, *sig;
/* inlen is the length of the input in this example. */
size_t inlen, siglen;
EVP_PKEY *signing_key;
EVP_SIGNATURE *alg;

/*
 * NB: assumes signing_key, in and inlen are set up before
 * the next step. signing_key must be an RSA private key,
 * in must point to data to be digested and signed, and
 * inlen must be the size of the data in bytes.
 */
ctx = EVP_PKEY_CTX_new(signing_key, NULL /* no engine */);
alg = EVP_SIGNATURE_fetch(NULL, "RSA-SHA256", NULL);

if (ctx == NULL || alg == NULL)
    /* Error occurred */
if (EVP_PKEY_verify_message_init(ctx, alg, NULL) <= 0)
    /* Error */

/* We have the signature, specify it early */
EVP_PKEY_CTX_set_signature(ctx, sig, siglen);

/* Perform operation */
while (inlen > 0) {
    if (EVP_PKEY_verify_message_update(ctx, in, inlen)) <= 0)
        /* Error */
    if (inlen > 256) {
        inlen -= 256;
        in += 256;
    } else {
        inlen = 0;
    }
}
ret = EVP_PKEY_verify_message_final(ctx);

/*
 * ret == 1 indicates success, 0 verify failure and < 0 for some
 * other error.
 */


```

## SEE ALSO


EVP_PKEY_CTX_new(3),
EVP_PKEY_encrypt(3),
EVP_PKEY_decrypt(3),
EVP_PKEY_sign(3),
EVP_PKEY_verify_recover(3),
EVP_PKEY_derive(3)

## HISTORY


The EVP_PKEY_verify_init() and EVP_PKEY_verify() functions were added in
OpenSSL 1.0.0.

The EVP_PKEY_verify_init_ex() function was added in OpenSSL 3.0.

The EVP_PKEY_verify_init_ex2(), EVP_PKEY_verify_message_init(),
EVP_PKEY_verify_message_update(), EVP_PKEY_verify_message_final() and
EVP_PKEY_CTX_set_signature() functions where added in OpenSSL 3.4.

## COPYRIGHT


Copyright 2006-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_PKEY_verify.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_verify.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_PKEY_verify.pod`；SHA-256：`163d055c81a15946b87456c99c33a395efae8792cf9d041ca6129dc49087ca73`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
