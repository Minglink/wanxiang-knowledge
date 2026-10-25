---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-rsa-generate-key",
  "title": "OpenSSL：RSA 密码 · RSA_generate_key（man3）",
  "type": "note",
  "tags": [
    "RSA",
    "非对称密码",
    "填充",
    "openssl",
    "RSA_generate_key",
    "RSA非对称密码"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "d80929b5a263d4afd4c05cccce7a2e82023c883d857c9cd1c0224efa2d8fc889",
  "generatedHash": "dbc86f0eb9e90a7b1863df2fff67df6e7295224c4c2073e90ba143241afc599e",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "RSA 密码：EVP_RSA_gen, RSA_generate_key_ex, RSA_generate_key, RSA_generate_multi_prime_key - generate RSA key pair",
  "l1": "EVP_RSA_gen() generates a new RSA key pair with modulus size `bits`. All of the functions described below are deprecated. Applications should instead use EVP_RSA_gen(), EVP_PKEY_Q_keygen(3), or EVP_PKEY_keygen_init(3) and EVP_PKEY_keygen(3). RSA_generate_key_ex() generates a 2-prime RSA key pair and stores it in the **RSA** structure provided in `rsa`. RSA_generate_multi_prime_key() generates a multi-prime RSA key pair and stores it in the **RSA** structure provided in `rsa`. The number of primes is given by the `primes` parameter. If the automatic seeding or reseeding of the OpenSSL CSPRNG fails due to external circumstances (see RAND(7)), the operation will fail. The modulus size will be of length `bits`, the number of primes to form the modulus will be `primes`, and the public exponent will be `e`. Key sizes with `num` < 1024 should be",
  "questions": [
    "RSA_generate_key 如何用于RSA 密码？",
    "RSA_generate_key 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-focus-crypto-rsa-oaep",
      "kind": "机制参照"
    }
  ],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-rsa-generate-key",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/RSA_generate_key.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：RSA 密码 · RSA_generate_key（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：RSA 密码。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_RSA_gen,
RSA_generate_key_ex, RSA_generate_key,
RSA_generate_multi_prime_key - generate RSA key pair

## 技术正文

## NAME


EVP_RSA_gen,
RSA_generate_key_ex, RSA_generate_key,
RSA_generate_multi_prime_key - generate RSA key pair

## SYNOPSIS


```c
#include <openssl/rsa.h>

EVP_PKEY *EVP_RSA_gen(unsigned int bits);

```

The following functions have been deprecated since OpenSSL 3.0, and can be
hidden entirely by defining **OPENSSL_API_COMPAT** with a suitable version value,
see openssl_user_macros(7):

```c
int RSA_generate_key_ex(RSA *rsa, int bits, BIGNUM *e, BN_GENCB *cb);
int RSA_generate_multi_prime_key(RSA *rsa, int bits, int primes, BIGNUM *e, BN_GENCB *cb);

```

The following function has been deprecated since OpenSSL 0.9.8, and can be
hidden entirely by defining **OPENSSL_API_COMPAT** with a suitable version value,
see openssl_user_macros(7):

```c
RSA *RSA_generate_key(int bits, unsigned long e,
                      void (*callback)(int, int, void *), void *cb_arg);

```

## DESCRIPTION


EVP_RSA_gen() generates a new RSA key pair with modulus size `bits`.

All of the functions described below are deprecated.
Applications should instead use EVP_RSA_gen(), EVP_PKEY_Q_keygen(3), or
EVP_PKEY_keygen_init(3) and EVP_PKEY_keygen(3).

RSA_generate_key_ex() generates a 2-prime RSA key pair and stores it in the
**RSA** structure provided in `rsa`.

RSA_generate_multi_prime_key() generates a multi-prime RSA key pair and stores
it in the **RSA** structure provided in `rsa`. The number of primes is given by
the `primes` parameter.
If the automatic seeding or reseeding of the OpenSSL CSPRNG fails due to
external circumstances (see RAND(7)), the operation will fail.

The modulus size will be of length `bits`, the number of primes to form the
modulus will be `primes`, and the public exponent will be `e`. Key sizes
with `num` < 1024 should be considered insecure. The exponent is an odd
number, typically 3, 17 or 65537.

In order to maintain adequate security level, the maximum number of permitted
`primes` depends on modulus bit length:

```c
  <1024 | >=1024 | >=4096 | >=8192
  ------+--------+--------+-------
    2   |   3    |   4    |   5

```

A callback function may be used to provide feedback about the
progress of the key generation. If `cb` is not NULL, it
will be called as follows using the BN_GENCB_call() function
described on the BN_generate_prime(3) page.

RSA_generate_key() is similar to RSA_generate_key_ex() but
expects an old-style callback function; see
BN_generate_prime(3) for information on the old-style callback.


- *

While a random prime number is generated, it is called as
described in BN_generate_prime(3).

- *

When the n-th randomly generated prime is rejected as not
suitable for the key, `BN_GENCB_call(cb, 2, n)` is called.

- *

When a random p has been found with p-1 relatively prime to `e`,
it is called as `BN_GENCB_call(cb, 3, 0)`.


The process is then repeated for prime q and other primes (if any)
with `BN_GENCB_call(cb, 3, i)` where `i` indicates the i-th prime.

## RETURN VALUES


EVP_RSA_gen() returns an `EVP_PKEY` or NULL on failure.

RSA_generate_multi_prime_key() returns 1 on success or 0 on error.
RSA_generate_key_ex() returns 1 on success or 0 on error.
The error codes can be obtained by ERR_get_error(3).

RSA_generate_key() returns a pointer to the RSA structure or
NULL if the key generation fails.

## BUGS


`BN_GENCB_call(cb, 2, x)` is used with two different meanings.

## SEE ALSO


EVP_PKEY_Q_keygen(3)
BN_generate_prime(3), ERR_get_error(3),
RAND_bytes(3), RAND(7)

## HISTORY


EVP_RSA_gen() was added in OpenSSL 3.0.
All other functions described here were deprecated in OpenSSL 3.0.
For replacement see EVP_PKEY-RSA(7).

## COPYRIGHT


Copyright 2000-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/RSA_generate_key.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/RSA_generate_key.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/RSA_generate_key.pod`；SHA-256：`d80929b5a263d4afd4c05cccce7a2e82023c883d857c9cd1c0224efa2d8fc889`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
