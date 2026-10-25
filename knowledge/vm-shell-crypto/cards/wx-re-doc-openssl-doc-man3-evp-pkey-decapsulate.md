---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-pkey-decapsulate",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY_decapsulate（man3）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY_decapsulate"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "1fdaa7bb0005bf2fcd69587c21e4c14cbc69276c5079a455d916cb652f46bd87",
  "generatedHash": "12abbbfa467115f55c4c9e098e44c9d062ed4784656c8d39fb568d3c9d0c8881",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY_decapsulate_init, EVP_PKEY_auth_decapsulate_init, EVP_PKEY_decapsulate - Key decapsulation using a KEM algorithm with a private key",
  "l1": "The EVP_PKEY_decapsulate_init() function initializes a private key algorithm context `ctx` for a decapsulation operation and then sets the `params` on the context in the same way as calling EVP_PKEY_CTX_set_params(3). Note that `ctx` usually is produced using EVP_PKEY_CTX_new_from_pkey(3), specifying the private key to use. The EVP_PKEY_auth_decapsulate_init() function is similar to EVP_PKEY_decapsulate_init() but also passes an `authpub` authentication public key that is used during decapsulation. The EVP_PKEY_decapsulate() function performs a private key decapsulation operation using `ctx`. The data to be decapsulated is specified using the `wrapped` and `wrappedlen` parameters (which must both non-NULL). The `wrapped` parameter is an output argument, to which the decapsulated shared secret is written. The shared secret may not match th",
  "questions": [
    "EVP_PKEY_decapsulate 如何用于非对称密钥与签名？",
    "EVP_PKEY_decapsulate 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-pkey-decapsulate",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_decapsulate.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY_decapsulate（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY_decapsulate_init, EVP_PKEY_auth_decapsulate_init, EVP_PKEY_decapsulate
- Key decapsulation using a KEM algorithm with a private key

## 技术正文

## NAME


EVP_PKEY_decapsulate_init, EVP_PKEY_auth_decapsulate_init, EVP_PKEY_decapsulate
- Key decapsulation using a KEM algorithm with a private key

## SYNOPSIS


```c
#include <openssl/evp.h>

int EVP_PKEY_decapsulate_init(EVP_PKEY_CTX *ctx, const OSSL_PARAM params[]);
int EVP_PKEY_auth_decapsulate_init(EVP_PKEY_CTX *ctx, EVP_PKEY *authpub,
                                  const OSSL_PARAM params[]);
int EVP_PKEY_decapsulate(EVP_PKEY_CTX *ctx,
                         unsigned char *unwrapped, size_t *unwrappedlen,
                         const unsigned char *wrapped, size_t wrappedlen);

```

## DESCRIPTION


The EVP_PKEY_decapsulate_init() function initializes a private key algorithm
context `ctx` for a decapsulation operation and then sets the `params`
on the context in the same way as calling EVP_PKEY_CTX_set_params(3).
Note that `ctx` usually is produced using EVP_PKEY_CTX_new_from_pkey(3),
specifying the private key to use.

The EVP_PKEY_auth_decapsulate_init() function is similar to
EVP_PKEY_decapsulate_init() but also passes an `authpub` authentication public
key that is used during decapsulation.

The EVP_PKEY_decapsulate() function performs a private key decapsulation
operation using `ctx`. The data to be decapsulated is specified using the
`wrapped` and `wrappedlen` parameters (which must both non-NULL).

The `wrapped` parameter is an output argument, to which the decapsulated
shared secret is written.
The shared secret may not match the peer's value even when decapsulation
returns success.
Instead, the shared secret must be used to derive a key that is used to
authenticate data subsequently received from the peer.
If `unwrapped` is NULL then the size of the output shared secret buffer is
written to `*unwrappedlen` and no decapsulation is performed, this makes it
possible to determine the required buffer size at run time.  Otherwise, the
decapsulated secret data is written to `unwrapped` and the length of shared
secret is written to `*unwrappedlen`.

Note that the value pointed to by `unwrappedlen` (which must NOT be **NULL**)
must be initialised to the length of `unwrapped`, so that the call can
validate it is of sufficient size to hold the result of the operation.

Absent detailed prior knowledge of the internals of the specific KEM
algorithm, callers SHOULD NOT assume that the returned shared secret
is necessarily of the maximum possible length.
The length returned via `*unwrappedlen` SHOULD be used to determine the actual
length of the output.

## NOTES


After the call to EVP_PKEY_decapsulate_init() algorithm-specific parameters
for the operation may be set or modified using EVP_PKEY_CTX_set_params(3).

## RETURN VALUES


EVP_PKEY_decapsulate_init(), EVP_PKEY_auth_decapsulate_init() and
EVP_PKEY_decapsulate() return 1 for success and 0 or a negative value for
failure. In particular a return value of -2 indicates the operation is not
supported by the private key algorithm.

## EXAMPLES


Decapsulate data using RSA:

```c
#include <openssl/evp.h>

/*
 * NB: assumes rsa_priv_key is an RSA private key,
 * and that in, inlen are already set up to contain encapsulated data.
 */

EVP_PKEY_CTX *ctx = NULL;
size_t secretlen = 0;
unsigned char *secret = NULL;;

ctx = EVP_PKEY_CTX_new_from_pkey(libctx, rsa_priv_key, NULL);
if (ctx == NULL)
    /* Error */
if (EVP_PKEY_decapsulate_init(ctx, NULL) <= 0)
    /* Error */

/* Set the mode - only 'RSASVE' is currently supported */
if (EVP_PKEY_CTX_set_kem_op(ctx, "RSASVE") <= 0)
    /* Error */

/* Determine buffer length */
if (EVP_PKEY_decapsulate(ctx, NULL, &secretlen, in, inlen) <= 0)
    /* Error */

secret = OPENSSL_malloc(secretlen);
if (secret == NULL)
    /* malloc failure */

/* Decapsulated secret data is secretlen bytes long */
if (EVP_PKEY_decapsulate(ctx, secret, &secretlen, in, inlen) <= 0)
    /* Error */


```

## SEE ALSO


EVP_PKEY_CTX_new_from_pkey(3),
EVP_PKEY_encapsulate(3),
EVP_KEM-RSA(7),
EVP_KEM-X25519(7),
EVP_KEM-EC(7),
EVP_KEM-ML-KEM-512(7),
EVP_KEM-ML-KEM-768(7),
EVP_KEM-ML-KEM-1024(7)

## HISTORY


The functions EVP_PKEY_decapsulate_init() and EVP_PKEY_decapsulate() were added
in OpenSSL 3.0.

The function EVP_PKEY_auth_decapsulate_init() was added in OpenSSL 3.2.

Support for **ML-KEM** was added in OpenSSL 3.5.

## COPYRIGHT


Copyright 2020-2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_PKEY_decapsulate.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_decapsulate.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_PKEY_decapsulate.pod`；SHA-256：`1fdaa7bb0005bf2fcd69587c21e4c14cbc69276c5079a455d916cb652f46bd87`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
