---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-pkey-encapsulate",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY_encapsulate（man3）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY_encapsulate"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "c1c65a6e0717989fc0bc8cfb6e8ce7389f800fa7ffc95eaa1c6b9173a826fba3",
  "generatedHash": "90a782551ec9335ee360147dcae7fb33fa94187a3d4aea630c25704d3416294e",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY_encapsulate_init, EVP_PKEY_auth_encapsulate_init, EVP_PKEY_encapsulate - Key encapsulation using a KEM algorithm with a public key",
  "l1": "The EVP_PKEY_encapsulate_init() function initializes a public key algorithm context `ctx` for an encapsulation operation and then sets the `params` on the context in the same way as calling EVP_PKEY_CTX_set_params(3). Note that `ctx` is usually is produced using EVP_PKEY_CTX_new_from_pkey(3), specifying the public key to use. The EVP_PKEY_auth_encapsulate_init() function is similar to EVP_PKEY_encapsulate_init() but also passes an `authpriv` authentication private key that is used during encapsulation. The EVP_PKEY_encapsulate() function performs a public key encapsulation operation using `ctx`. The shared secret writen to `genkey` can be used as an input for key derivation, typically for various symmetric algorithms. Its size is written to `genkeylen`, which must be initialised to the size of the provided buffer. The ciphertext written t",
  "questions": [
    "EVP_PKEY_encapsulate 如何用于非对称密钥与签名？",
    "EVP_PKEY_encapsulate 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-pkey-encapsulate",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_encapsulate.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY_encapsulate（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY_encapsulate_init, EVP_PKEY_auth_encapsulate_init, EVP_PKEY_encapsulate
- Key encapsulation using a KEM algorithm with a public key

## 技术正文

## NAME


EVP_PKEY_encapsulate_init, EVP_PKEY_auth_encapsulate_init, EVP_PKEY_encapsulate
- Key encapsulation using a KEM algorithm with a public key

## SYNOPSIS


```c
#include <openssl/evp.h>

int EVP_PKEY_encapsulate_init(EVP_PKEY_CTX *ctx, const OSSL_PARAM params[]);
int EVP_PKEY_auth_encapsulate_init(EVP_PKEY_CTX *ctx, EVP_PKEY *authpriv,
                                  const OSSL_PARAM params[]);
int EVP_PKEY_encapsulate(EVP_PKEY_CTX *ctx,
                         unsigned char *wrappedkey, size_t *wrappedkeylen,
                         unsigned char *genkey, size_t *genkeylen);

```

## DESCRIPTION


The EVP_PKEY_encapsulate_init() function initializes a public key algorithm
context `ctx` for an encapsulation operation and then sets the `params`
on the context in the same way as calling EVP_PKEY_CTX_set_params(3).
Note that `ctx` is usually is produced using EVP_PKEY_CTX_new_from_pkey(3),
specifying the public key to use.

The EVP_PKEY_auth_encapsulate_init() function is similar to
EVP_PKEY_encapsulate_init() but also passes an `authpriv` authentication private
key that is used during encapsulation.

The EVP_PKEY_encapsulate() function performs a public key encapsulation
operation using `ctx`.
The shared secret writen to `genkey` can be used as an input for key
derivation, typically for various symmetric algorithms.
Its size is written to `genkeylen`, which must be initialised to the
size of the provided buffer.

The ciphertext written to `wrappedkey` is an encapsulated form, which
is expected to be only usable by the holder of the private key corresponding
to wthe public key associated with `ctx`.
This ciphertext is then communicated to the private-key holder, who can use
EVP_PKEY_decapsulate(3) to securely recover the same shared secret.

If `wrappedkey` is NULL then the maximum size of the output buffer is written
to the `*wrappedkeylen` parameter unless `wrappedkeylen` is NULL and the
maximum size of the generated key buffer is written to `*genkeylen` unless
`genkeylen` is NULL.

If `wrappedkey` is not NULL and the call is successful then the generated
shared secret is written to `genkey` and its size is written to
`*genkeylen` (which must be non-NULL).
The encapsulated ciphertext is written to `wrappedkey` and
its size is written to `*wrappedkeylen` (must also be non-NULL),
The value pointed to by `wrappedlen` initially hold the size of the
`unwrapped` buffer so that its size can be validated by the call, ensuring it
is large enough to hold the result written to `wrapped`.

Absent detailed prior knowledge of the internals of the specific KEM
algorithm, callers SHOULD NOT assume that the returned shared secret and
ciphertext are necessarily of the maximum possible length.
The lengths returned via `*wrappedkeylen` and `*genkeylen` SHOULD
be used to determine the actual lengths of the outputs.

## NOTES


After the call to EVP_PKEY_encapsulate_init(), algorithm-specific parameters
for the operation may be set or modified using EVP_PKEY_CTX_set_params(3).

## RETURN VALUES


EVP_PKEY_encapsulate_init(), EVP_PKEY_auth_encapsulate_init() and
EVP_PKEY_encapsulate() return 1 for success and 0 or a negative value for
failure. In particular a return value of -2 indicates the operation is not
supported by the public key algorithm.

## EXAMPLES


Encapsulate an RSASVE key (for RSA keys).

```c
#include <openssl/evp.h>

/*
 * NB: assumes rsa_pub_key is an public key of another party.
 */

EVP_PKEY_CTX *ctx = NULL;
size_t secretlen = 0, outlen = 0;
unsigned char *out = NULL, *secret = NULL;

ctx = EVP_PKEY_CTX_new_from_pkey(libctx, rsa_pub_key, NULL);
if (ctx == NULL)
    /* Error */
if (EVP_PKEY_encapsulate_init(ctx, NULL) <= 0)
    /* Error */

/* Set the mode - only 'RSASVE' is currently supported */
 if (EVP_PKEY_CTX_set_kem_op(ctx, "RSASVE") <= 0)
    /* Error */
/* Determine buffer length */
if (EVP_PKEY_encapsulate(ctx, NULL, &outlen, NULL, &secretlen) <= 0)
    /* Error */

out = OPENSSL_malloc(outlen);
secret = OPENSSL_malloc(secretlen);
if (out == NULL || secret == NULL)
    /* malloc failure */

/*
 * The generated 'secret' can be used as key material.
 * The encapsulated 'out' can be sent to another party who can
 * decapsulate it using their private key to retrieve the 'secret'.
 */
if (EVP_PKEY_encapsulate(ctx, out, &outlen, secret, &secretlen) <= 0)
    /* Error */

```

## SEE ALSO


EVP_PKEY_CTX_new_from_pkey(3),
EVP_PKEY_decapsulate(3),
EVP_KEM-RSA(7),
EVP_KEM-X25519(7),
EVP_KEM-EC(7),
EVP_KEM-ML-KEM-512(7),
EVP_KEM-ML-KEM-768(7),
EVP_KEM-ML-KEM-1024(7)

## HISTORY


The functions EVP_PKEY_encapsulate_init() and EVP_PKEY_encapsulate() were
added in OpenSSL 3.0.
The function EVP_PKEY_auth_encapsulate_init() was added in OpenSSL 3.2.

Support for **ML-KEM** was added in OpenSSL 3.5.

## COPYRIGHT


Copyright 2020-2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_PKEY_encapsulate.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_encapsulate.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_PKEY_encapsulate.pod`；SHA-256：`c1c65a6e0717989fc0bc8cfb6e8ce7389f800fa7ffc95eaa1c6b9173a826fba3`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
