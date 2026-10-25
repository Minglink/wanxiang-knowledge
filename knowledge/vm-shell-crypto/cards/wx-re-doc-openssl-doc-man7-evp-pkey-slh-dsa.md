---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-pkey-slh-dsa",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY-SLH-DSA（man7）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY-SLH-DSA",
    "SHAKE可扩展输出"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "b01d5ed6d4b80de9b9673b496dbb8a6e5831b31b0ae51a09b482f5b99b6d3eb2",
  "generatedHash": "2290ae3f0199b73bad283ccf3b1ab3600275e24cb2b5ef9e0e8c9a859087c4dc",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY-SLH-DSA, EVP_KEYMGMT-SLH-DSA, EVP_PKEY-SLH-DSA-SHA2-128s, EVP_PKEY-SLH-DSA-SHA2-128f, EVP_PKEY-SLH-DSA-SHA2-192s, EVP_PKEY-SLH-DSA-SHA2-192f, EVP_PKEY-SLH-DSA-SHA2-256s, EVP_PKEY-SLH-DSA-SHA2-256f, EVP_PKEY-SLH-DSA-SHAKE-128s, EVP_PKEY-SLH-DSA-SHAKE-128f, EVP_PKEY-SLH-DSA-SHAKE-192s, EVP_PK",
  "l1": "The **SLH-DSA-SHA2-128s**, **EVP_PKEY-SLH-DSA-SHA2-128f**, **SLH-DSA-SHA2-192s**, **EVP_PKEY-SLH-DSA-SHA2-192f**, **SLH-DSA-SHA2-256s**, **EVP_PKEY-SLH-DSA-SHA2-256f**, **SLH-DSA-SHAKE-128s**, **EVP_PKEY-SLH-DSA-SHAKE-128f**, **SLH-DSA-SHAKE-192s**, **EVP_PKEY-SLH-DSA-SHAKE-192f**, **SLH-DSA-SHAKE-256s** and **EVP_PKEY-SLH-DSA-SHAKE-256f** key types are implemented in OpenSSL's default and FIPS providers. These implementations support the associated key, containing the public key `pub` and the private key `priv`. SLH-DSA (Stateless Hash-based Digital Signature Standard) uses small keys, but has relatively large signatures and is relatively slow performing all operations compared to **ML-DSA**. It does however have proven security proofs, since it relies only on hash functions. Each of the different key types has an associated security par",
  "questions": [
    "EVP_PKEY-SLH-DSA 如何用于非对称密钥与签名？",
    "EVP_PKEY-SLH-DSA 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-pkey-slh-dsa",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_PKEY-SLH-DSA.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY-SLH-DSA（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY-SLH-DSA, EVP_KEYMGMT-SLH-DSA,
EVP_PKEY-SLH-DSA-SHA2-128s, EVP_PKEY-SLH-DSA-SHA2-128f,
EVP_PKEY-SLH-DSA-SHA2-192s, EVP_PKEY-SLH-DSA-SHA2-192f,
EVP_PKEY-SLH-DSA-SHA2-256s, EVP_PKEY-SLH-DSA-SHA2-256f,
EVP_PKEY-SLH-DSA-SHAKE-128s, EVP_PKEY-SLH-DSA-SHAKE-128f,
EVP_PKEY-SLH-DSA-SHAKE-192s, EVP_PKEY-SLH-DSA-SHAKE-192f,
EVP_PKEY-SLH-DSA-SHAKE-256s, EVP_PKEY-SLH-DSA-SHAKE-256f
- EVP_PKEY SLH-DSA keytype and algorithm support

## 技术正文

## NAME


EVP_PKEY-SLH-DSA, EVP_KEYMGMT-SLH-DSA,
EVP_PKEY-SLH-DSA-SHA2-128s, EVP_PKEY-SLH-DSA-SHA2-128f,
EVP_PKEY-SLH-DSA-SHA2-192s, EVP_PKEY-SLH-DSA-SHA2-192f,
EVP_PKEY-SLH-DSA-SHA2-256s, EVP_PKEY-SLH-DSA-SHA2-256f,
EVP_PKEY-SLH-DSA-SHAKE-128s, EVP_PKEY-SLH-DSA-SHAKE-128f,
EVP_PKEY-SLH-DSA-SHAKE-192s, EVP_PKEY-SLH-DSA-SHAKE-192f,
EVP_PKEY-SLH-DSA-SHAKE-256s, EVP_PKEY-SLH-DSA-SHAKE-256f
- EVP_PKEY SLH-DSA keytype and algorithm support

## DESCRIPTION


The **SLH-DSA-SHA2-128s**, **EVP_PKEY-SLH-DSA-SHA2-128f**,
**SLH-DSA-SHA2-192s**, **EVP_PKEY-SLH-DSA-SHA2-192f**,
**SLH-DSA-SHA2-256s**, **EVP_PKEY-SLH-DSA-SHA2-256f**,
**SLH-DSA-SHAKE-128s**, **EVP_PKEY-SLH-DSA-SHAKE-128f**,
**SLH-DSA-SHAKE-192s**, **EVP_PKEY-SLH-DSA-SHAKE-192f**,
**SLH-DSA-SHAKE-256s** and **EVP_PKEY-SLH-DSA-SHAKE-256f** key types are
implemented in OpenSSL's default and FIPS providers.  These implementations
support the associated key, containing the public key `pub` and the
private key `priv`.

SLH-DSA (Stateless Hash-based Digital Signature Standard) uses small keys,
but has relatively large signatures and is relatively slow performing all
operations compared to **ML-DSA**. It does however have proven security proofs,
since it relies only on hash functions.

Each of the different key types has an associated security parameter **n**.
This value is one of 16, 24 or 32 for key types **SLH-DSA*128***, **SLH-DSA*192***
and **SLH-DSA*256***, respectively.

Both the public and private key components contain 2 elements of size **n**.
Key generation generates the private key elements and one of the public key
elements randomly, and the final public key element is computed from these values.

The public key has relatively small sizes of 32, 48 or 64 bytes,
corresponding to the algorithm names of 128, 192 and 256 respectively.

The algorithms ending with **s** produce smaller signatures, but are much slower
than the faster **f** variants.

The signature sizes for the **s** algorithm variants are 7856, 16224 and 29792
which correspond to the algorithm names of 128s, 192s and 256s respectively.
The signature sizes for the **f** algorithm variants are 17088, 35664 and 49856
which correspond to the algorithm names containing 128f, 192f and 256f respectively.

Internally there are 7 hash related functions that are used for each algorithm.
For algorithms containing **SHAKE** in their name **SHAKE-256** is used for all
functions.
For the <SHA2-128> algorithms the functions use <MGF1-SHA-256>, <HMAC-SHA-256>
and <SHA-256>.
The remaining <SHA2> algorithms use <MGF1-SHA-512>, <HMAC-SHA-512>, <SHA-256> and
<SHA-512>.
See FIPS 205 Section 11.1 and 11.2 for more information.

### Keygen Parameters



- "seed" (**OSSL_PKEY_PARAM_SLH_DSA_SEED**) <octet string>

Supplies values to use for the private seed, private prf and
public seed instead of generating random values. This is used for testing
purposes only. The length of the value supplied must be 3 * **n**.

- "properties" (**OSSL_PKEY_PARAM_PROPERTIES**) <utf8_string>

Sets properties to be used when fetching algorithm implementations used for
SLH-DSA hashing operations.


Use EVP_PKEY_CTX_set_params() after calling EVP_PKEY_keygen_init().

### Common SLH-DSA parameters


In addition to the common parameters that all keytypes should support (see
provider-keymgmt(7)/Common Information Parameters), the implementation of
these key types support the following.

The following parameters are gettable using EVP_PKEY_get_octet_string_param(),
and settable when using EVP_PKEY_fromdata().


- "pub" (**OSSL_PKEY_PARAM_PUB_KEY**) <octet string>

The public key has a size of 2 * **n** bytes.
i.e. It consists of the concatenation of PK.seed and PK.root
as defined by FIPS 205 Figure 16.

- "priv" (**OSSL_PKEY_PARAM_PRIV_KEY**) <octet string>

The private key has a size of 4 * **n** bytes, which includes the public key components.
i.e. It consists of the concatenation of SK.seed, SK.prf, PK.seed and PF.root
as defined by FIPS 205 Figure 15.

- "mandatory-digest" (**OSSL_PKEY_PARAM_MANDATORY_DIGEST**) <UTF8 string>

The empty string, signifying that no digest may be specified.


## CONFORMING TO



- FIPS 205


## EXAMPLES


An **EVP_PKEY** context can be obtained by calling:

```c
   EVP_PKEY_CTX *pctx =
       EVP_PKEY_CTX_new_from_name(NULL, "SLH-DSA-SHA2-128f", NULL);

```

An **SLH-DSA** key can be generated like this:

```c
   pkey = EVP_PKEY_Q_keygen(NULL, NULL, "SLH-DSA-SHA2-128f");

```

The key pair components can be extracted from a key by calling:

```c
   uint8_t priv[64], pub[32];
   size_t priv_len, pub_len;

   EVP_PKEY_get_octet_string_param(pkey, OSSL_PKEY_PARAM_PRIV_KEY,
                                   priv, sizeof(priv), &priv_len);
   EVP_PKEY_get_octet_string_param(pkey, OSSL_PKEY_PARAM_PUB_KEY,
                                   pub, sizeof(pub), &pub_len));

```

Similar code can be used for the other key types such as "SLH-DSA-SHAKE-256f".

## SEE ALSO


EVP_KEYMGMT(3), EVP_PKEY(3), provider-keymgmt(7),
EVP_SIGNATURE-SLH-DSA(7)

## HISTORY


This functionality was added in OpenSSL 3.5.

## COPYRIGHT


Copyright 2024-2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_PKEY-SLH-DSA.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_PKEY-SLH-DSA.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_PKEY-SLH-DSA.pod`；SHA-256：`b01d5ed6d4b80de9b9673b496dbb8a6e5831b31b0ae51a09b482f5b99b6d3eb2`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
