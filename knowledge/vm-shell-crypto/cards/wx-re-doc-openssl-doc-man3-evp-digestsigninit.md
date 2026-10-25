---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-digestsigninit",
  "title": "OpenSSL：EVP 密码接口 · EVP_DigestSignInit（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "密码接口",
    "Provider",
    "openssl",
    "EVP_DigestSignInit"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "4e23297ebe3689ac948f14ae1c137ea4b39e115c1dfc5087509fb5954a03e211",
  "generatedHash": "ddba2c176fea517d0fcad57a391cf0c825069e5b513abbb626a802c62a2813a3",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "EVP 密码接口：EVP_DigestSignInit_ex, EVP_DigestSignInit, EVP_DigestSignUpdate, EVP_DigestSignFinal, EVP_DigestSign - EVP signing functions",
  "l1": "The EVP signature routines are a high-level interface to digital signatures. Input data is digested first before the signing takes place. EVP_DigestSignInit_ex() sets up signing context `ctx` to use a digest with the name `mdname` and private key `pkey`. The name of the digest to be used is passed to the provider of the signature algorithm in use. How that provider interprets the digest name is provider specific. The provider may implement that digest directly itself or it may (optionally) choose to fetch it (which could result in a digest from a different provider being selected). If the provider supports fetching the digest then it may use the `props` argument for the properties to be used during the fetch. Finally, the passed parameters `params`, if not NULL, are set on the context before returning. The `pkey` algorithm is used to fetc",
  "questions": [
    "EVP_DigestSignInit 如何用于EVP 密码接口？",
    "EVP_DigestSignInit 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-digestsigninit",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_DigestSignInit.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：EVP 密码接口 · EVP_DigestSignInit（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：EVP 密码接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_DigestSignInit_ex, EVP_DigestSignInit, EVP_DigestSignUpdate,
EVP_DigestSignFinal, EVP_DigestSign - EVP signing functions

## 技术正文

## NAME


EVP_DigestSignInit_ex, EVP_DigestSignInit, EVP_DigestSignUpdate,
EVP_DigestSignFinal, EVP_DigestSign - EVP signing functions

## SYNOPSIS


```c
#include <openssl/evp.h>

int EVP_DigestSignInit_ex(EVP_MD_CTX *ctx, EVP_PKEY_CTX **pctx,
                          const char *mdname, OSSL_LIB_CTX *libctx,
                          const char *props, EVP_PKEY *pkey,
                          const OSSL_PARAM params[]);
int EVP_DigestSignInit(EVP_MD_CTX *ctx, EVP_PKEY_CTX **pctx,
                       const EVP_MD *type, ENGINE *e, EVP_PKEY *pkey);
int EVP_DigestSignUpdate(EVP_MD_CTX *ctx, const void *d, size_t cnt);
int EVP_DigestSignFinal(EVP_MD_CTX *ctx, unsigned char *sig, size_t *siglen);

int EVP_DigestSign(EVP_MD_CTX *ctx, unsigned char *sig,
                   size_t *siglen, const unsigned char *tbs,
                   size_t tbslen);

```

## DESCRIPTION


The EVP signature routines are a high-level interface to digital signatures.
Input data is digested first before the signing takes place.

EVP_DigestSignInit_ex() sets up signing context `ctx` to use a digest
with the name `mdname` and private key `pkey`. The name of the digest to be
used is passed to the provider of the signature algorithm in use. How that
provider interprets the digest name is provider specific. The provider may
implement that digest directly itself or it may (optionally) choose to fetch it
(which could result in a digest from a different provider being selected). If the
provider supports fetching the digest then it may use the `props` argument for
the properties to be used during the fetch. Finally, the passed parameters
`params`, if not NULL, are set on the context before returning.

The `pkey` algorithm is used to fetch a **EVP_SIGNATURE** method implicitly, to
be used for the actual signing. See provider(7)/Implicit fetch for
more information about implicit fetches.

The OpenSSL default and legacy providers support fetching digests and can fetch
those digests from any available provider. The OpenSSL FIPS provider also
supports fetching digests but will only fetch digests that are themselves
implemented inside the FIPS provider.

`ctx` must be created with EVP_MD_CTX_new() before calling this function. If
`pctx` is not NULL, the EVP_PKEY_CTX of the signing operation will be written
to `*pctx`: this can be used to set alternative signing options. Note that any
existing value in `*pctx` is overwritten. The EVP_PKEY_CTX value returned must
not be freed directly by the application if `ctx` is not assigned an
EVP_PKEY_CTX value before being passed to EVP_DigestSignInit_ex()
(which means the EVP_PKEY_CTX is created inside EVP_DigestSignInit_ex()
and it will be freed automatically when the EVP_MD_CTX is freed). If the
EVP_PKEY_CTX to be used is created by EVP_DigestSignInit_ex then it
will use the **OSSL_LIB_CTX** specified in `libctx` and the property query string
specified in `props`.

The digest `mdname` may be NULL if the signing algorithm supports it. The
`props` argument can always be NULL.

No **EVP_PKEY_CTX** will be created by EVP_DigestSignInit_ex() if the
passed `ctx` has already been assigned one via EVP_MD_CTX_set_pkey_ctx(3).
See also SM2(7).

Only EVP_PKEY types that support signing can be used with these functions. This
includes MAC algorithms where the MAC generation is considered as a form of
"signing". Built-in EVP_PKEY types supported by these functions are CMAC,
Poly1305, DSA, ECDSA, HMAC, RSA, SipHash, Ed25519 and Ed448.

Not all digests can be used for all key types. The following combinations apply.


- DSA

Supports SHA1, SHA224, SHA256, SHA384 and SHA512

- ECDSA

Supports SHA1, SHA224, SHA256, SHA384, SHA512 and SM3

- RSA with no padding

Supports no digests (the digest `type` must be NULL)

- RSA with X931 padding

Supports SHA1, SHA256, SHA384 and SHA512

- All other RSA padding types

Support SHA1, SHA224, SHA256, SHA384, SHA512, MD5, MD5_SHA1, MD2, MD4, MDC2,
SHA3-224, SHA3-256, SHA3-384, SHA3-512

- Ed25519 and Ed448

Support no digests (the digest `type` must be NULL)

- HMAC

Supports any digest

- CMAC, Poly1305 and SipHash

Will ignore any digest provided.


If RSA-PSS is used and restrictions apply then the digest must match.

EVP_DigestSignInit() works in the same way as EVP_DigestSignInit_ex()
except that the `mdname` parameter will be inferred from the supplied
digest `type`, and `props` will be NULL. Where supplied the ENGINE `e` will
be used for the signing and digest algorithm implementations. `e` may be NULL.

EVP_DigestSignUpdate() hashes `cnt` bytes of data at `d` into the
signature context `ctx`. This function can be called several times on the
same `ctx` to include additional data. `ctx` **MUST NOT** be NULL.

Unless `sig` is NULL EVP_DigestSignFinal() signs the data in `ctx`
and places the signature in `sig`.
Otherwise the maximum necessary size of the output buffer is written to
the `siglen` parameter. If `sig` is not NULL then before the call the
`siglen` parameter should contain the length of the `sig` buffer. If the
call is successful the signature is written to `sig` and the amount of data
written to `siglen`.

EVP_DigestSign() is similar to a single call to EVP_DigestSignUpdate() and
EVP_DigestSignFinal().
Unless `sig` is NULL, EVP_DigestSign() signs the data `tbs` of length `tbslen`
bytes and places the signature in a buffer `sig` of size `siglen`.
If `sig` is NULL, the maximum necessary size of the signature buffer is written
to the `siglen` parameter.

## RETURN VALUES


EVP_DigestSignInit(), EVP_DigestSignUpdate(), EVP_DigestSignFinal() and
EVP_DigestSign() return 1 for success and 0 for failure.

The error codes can be obtained from ERR_get_error(3).

## NOTES


The **EVP** interface to digital signatures should almost always be used in
preference to the low-level interfaces. This is because the code then becomes
transparent to the algorithm used and much more flexible.

EVP_DigestSign() is a one shot operation which signs a single block of data
in one function. For algorithms that support streaming it is equivalent to
calling EVP_DigestSignUpdate() and EVP_DigestSignFinal(). For algorithms which
do not support streaming (e.g. PureEdDSA) it is the only way to sign data.

In previous versions of OpenSSL there was a link between message digest types
and public key algorithms. This meant that "clone" digests such as EVP_dss1()
needed to be used to sign using SHA1 and DSA. This is no longer necessary and
the use of clone digest is now discouraged.

For some key types and parameters the random number generator must be seeded.
If the automatic seeding or reseeding of the OpenSSL CSPRNG fails due to
external circumstances (see RAND(7)), the operation will fail.

The call to EVP_DigestSignFinal() internally finalizes a copy of the digest
context. This means that calls to EVP_DigestSignUpdate() and
EVP_DigestSignFinal() can be called later to digest and sign additional data.
Applications may disable this behavior by setting the EVP_MD_CTX_FLAG_FINALISE
context flag via EVP_MD_CTX_set_flags(3).

Note that not all providers support continuation, in case the selected
provider does not allow to duplicate contexts EVP_DigestSignFinal() will
finalize the digest context and attempting to process additional data via
EVP_DigestSignUpdate() will result in an error.

EVP_DigestSignInit() and EVP_DigestSignInit_ex() functions can be called
multiple times on a context and the parameters set by previous calls should be
preserved if the `pkey` parameter is NULL. The call then just resets the state
of the `ctx`.

EVP_DigestSign() can not be called again, once a signature is generated (by
passing `sig` as non NULL), unless the **EVP_MD_CTX** is reinitialised by
calling EVP_DigestSignInit_ex().

Ignoring failure returns of EVP_DigestSignInit() and EVP_DigestSignInit_ex()
functions can lead to subsequent undefined behavior when calling
EVP_DigestSignUpdate(), EVP_DigestSignFinal(), or EVP_DigestSign().

The use of EVP_PKEY_get_size() with these functions is discouraged because some
signature operations may have a signature length which depends on the
parameters set. As a result EVP_PKEY_get_size() would have to return a value
which indicates the maximum possible signature for any set of parameters.

## SEE ALSO


EVP_DigestVerifyInit(3),
EVP_DigestInit(3),
evp(7), HMAC(3), MD2(3),
MD5(3), MDC2(3), RIPEMD160(3),
SHA1(3), openssl-dgst(1),
RAND(7)

## HISTORY


EVP_DigestSignInit(), EVP_DigestSignUpdate() and EVP_DigestSignFinal()
were added in OpenSSL 1.0.0.

EVP_DigestSignInit_ex() was added in OpenSSL 3.0.

EVP_DigestSignUpdate() was converted from a macro to a function in OpenSSL 3.0.

## COPYRIGHT


Copyright 2006-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_DigestSignInit.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_DigestSignInit.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_DigestSignInit.pod`；SHA-256：`4e23297ebe3689ac948f14ae1c137ea4b39e115c1dfc5087509fb5954a03e211`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
