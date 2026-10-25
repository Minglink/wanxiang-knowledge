---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-verifyinit",
  "title": "OpenSSL：EVP 密码接口 · EVP_VerifyInit（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "密码接口",
    "Provider",
    "openssl",
    "EVP_VerifyInit"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "17be6aef6d7b13f376086bb4405be900fd8756370a728f1a445f6180b8ffca6b",
  "generatedHash": "6f56b50ca6aed2a95b0dc5ab4b34c0ad1259fd638ad2d61cff8f60062a42cb10",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "EVP 密码接口：EVP_VerifyInit_ex, EVP_VerifyInit, EVP_VerifyUpdate, EVP_VerifyFinal_ex, EVP_VerifyFinal - EVP signature verification functions",
  "l1": "The EVP signature verification routines are a high-level interface to digital signatures. EVP_VerifyInit_ex() sets up verification context `ctx` to use digest `type` from ENGINE `impl`. `ctx` must be created by calling EVP_MD_CTX_new() before calling this function. EVP_VerifyUpdate() hashes `cnt` bytes of data at `d` into the verification context `ctx`. This function can be called several times on the same `ctx` to include additional data. EVP_VerifyFinal_ex() verifies the data in `ctx` using the public key `pkey` and `siglen` bytes in `sigbuf`. The library context `libctx` and property query `propq` are used when creating a context to use with the key `pkey`. EVP_VerifyFinal() is similar to EVP_VerifyFinal_ex() but uses default values of NULL for the library context `libctx` and the property query `propq`. EVP_VerifyInit() initializes ve",
  "questions": [
    "EVP_VerifyInit 如何用于EVP 密码接口？",
    "EVP_VerifyInit 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-verifyinit",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_VerifyInit.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：EVP 密码接口 · EVP_VerifyInit（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：EVP 密码接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_VerifyInit_ex,
EVP_VerifyInit, EVP_VerifyUpdate, EVP_VerifyFinal_ex, EVP_VerifyFinal
- EVP signature verification functions

## 技术正文

## NAME


EVP_VerifyInit_ex,
EVP_VerifyInit, EVP_VerifyUpdate, EVP_VerifyFinal_ex, EVP_VerifyFinal
- EVP signature verification functions

## SYNOPSIS


```c
#include <openssl/evp.h>

int EVP_VerifyInit_ex(EVP_MD_CTX *ctx, const EVP_MD *type, ENGINE *impl);
int EVP_VerifyUpdate(EVP_MD_CTX *ctx, const void *d, unsigned int cnt);
int EVP_VerifyFinal_ex(EVP_MD_CTX *ctx, const unsigned char *sigbuf,
                       unsigned int siglen, EVP_PKEY *pkey,
                       OSSL_LIB_CTX *libctx, const char *propq);
int EVP_VerifyFinal(EVP_MD_CTX *ctx, unsigned char *sigbuf, unsigned int siglen,
                    EVP_PKEY *pkey);

int EVP_VerifyInit(EVP_MD_CTX *ctx, const EVP_MD *type);

```

## DESCRIPTION


The EVP signature verification routines are a high-level interface to digital
signatures.

EVP_VerifyInit_ex() sets up verification context `ctx` to use digest
`type` from ENGINE `impl`. `ctx` must be created by calling
EVP_MD_CTX_new() before calling this function.

EVP_VerifyUpdate() hashes `cnt` bytes of data at `d` into the
verification context `ctx`. This function can be called several times on the
same `ctx` to include additional data.

EVP_VerifyFinal_ex() verifies the data in `ctx` using the public key
`pkey` and `siglen` bytes in `sigbuf`.
The library context `libctx` and property query `propq` are used when creating
a context to use with the key `pkey`.

EVP_VerifyFinal() is similar to EVP_VerifyFinal_ex() but uses default
values of NULL for the library context `libctx` and the property query `propq`.

EVP_VerifyInit() initializes verification context `ctx` to use the default
implementation of digest `type`.

## RETURN VALUES


EVP_VerifyInit_ex() and EVP_VerifyUpdate() return 1 for success and 0 for
failure.

EVP_VerifyFinal_ex() and EVP_VerifyFinal() return 1 for a correct
signature, 0 for failure and a negative value if some other error occurred.

The error codes can be obtained by ERR_get_error(3).

## NOTES


The **EVP** interface to digital signatures should almost always be used in
preference to the low-level interfaces. This is because the code then becomes
transparent to the algorithm used and much more flexible.

The call to EVP_VerifyFinal() internally finalizes a copy of the digest context.
This means that calls to EVP_VerifyUpdate() and EVP_VerifyFinal() can be called
later to digest and verify additional data. Applications may disable this
behavior by setting the EVP_MD_CTX_FLAG_FINALISE context flag via
EVP_MD_CTX_set_flags(3).

Since only a copy of the digest context is ever finalized the context must
be cleaned up after use by calling EVP_MD_CTX_free() or a memory leak
will occur.

Note that not all providers support continuation, in case the selected
provider does not allow to duplicate contexts EVP_VerifyFinal() will
finalize the digest context and attempting to process additional data via
EVP_VerifyUpdate() will result in an error.

## BUGS


Older versions of this documentation wrongly stated that calls to
EVP_VerifyUpdate() could not be made after calling EVP_VerifyFinal().

Since the public key is passed in the call to EVP_SignFinal() any error
relating to the private key (for example an unsuitable key and digest
combination) will not be indicated until after potentially large amounts of
data have been passed through EVP_SignUpdate().

It is not possible to change the signing parameters using these function.

The previous two bugs are fixed in the newer EVP_DigestVerify*() function.

## SEE ALSO


evp(7),
EVP_SignInit(3),
EVP_DigestInit(3),
evp(7), HMAC(3), MD2(3),
MD5(3), MDC2(3), RIPEMD160(3),
SHA1(3), openssl-dgst(1)

## HISTORY


The function EVP_VerifyFinal_ex() was added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2000-2023 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_VerifyInit.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_VerifyInit.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_VerifyInit.pod`；SHA-256：`17be6aef6d7b13f376086bb4405be900fd8756370a728f1a445f6180b8ffca6b`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
