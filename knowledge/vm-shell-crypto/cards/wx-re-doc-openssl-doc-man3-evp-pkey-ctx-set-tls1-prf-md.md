---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-pkey-ctx-set-tls1-prf-md",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY_CTX_set_tls1_prf_md（man3）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY_CTX_set_tls1_prf_md"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "cab28dcd7e0f11c5bc7846d99d6c4cd56089d1ae05914290f6804ea04b2cbc5f",
  "generatedHash": "85963d53c7444c4b4383c5e9c84bf2349add7ced690a93988915c5b30276f51f",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY_CTX_set_tls1_prf_md, EVP_PKEY_CTX_set1_tls1_prf_secret, EVP_PKEY_CTX_add1_tls1_prf_seed - TLS PRF key derivation algorithm",
  "l1": "The **EVP_PKEY_TLS1_PRF** algorithm implements the PRF key derivation function for TLS. It has no associated private key and only implements key derivation using EVP_PKEY_derive(3). EVP_PKEY_set_tls1_prf_md() sets the message digest associated with the TLS PRF. EVP_md5_sha1() is treated as a special case which uses the PRF algorithm using both **MD5** and **SHA1** as used in TLS 1.0 and 1.1. EVP_PKEY_CTX_set_tls1_prf_secret() sets the secret value of the TLS PRF to **seclen** bytes of the buffer **sec**. Any existing secret value is replaced and any seed is reset. EVP_PKEY_CTX_add1_tls1_prf_seed() sets the seed to **seedlen** bytes of **seed**. If a seed is already set it is appended to the existing value.",
  "questions": [
    "EVP_PKEY_CTX_set_tls1_prf_md 如何用于非对称密钥与签名？",
    "EVP_PKEY_CTX_set_tls1_prf_md 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-pkey-ctx-set-tls1-prf-md",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_CTX_set_tls1_prf_md.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY_CTX_set_tls1_prf_md（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY_CTX_set_tls1_prf_md,
EVP_PKEY_CTX_set1_tls1_prf_secret, EVP_PKEY_CTX_add1_tls1_prf_seed -
TLS PRF key derivation algorithm

## 技术正文

## NAME


EVP_PKEY_CTX_set_tls1_prf_md,
EVP_PKEY_CTX_set1_tls1_prf_secret, EVP_PKEY_CTX_add1_tls1_prf_seed -
TLS PRF key derivation algorithm

## SYNOPSIS


```c
#include <openssl/kdf.h>

int EVP_PKEY_CTX_set_tls1_prf_md(EVP_PKEY_CTX *pctx, const EVP_MD *md);
int EVP_PKEY_CTX_set1_tls1_prf_secret(EVP_PKEY_CTX *pctx,
                                      unsigned char *sec, int seclen);
int EVP_PKEY_CTX_add1_tls1_prf_seed(EVP_PKEY_CTX *pctx,
                                    unsigned char *seed, int seedlen);

```

## DESCRIPTION


The **EVP_PKEY_TLS1_PRF** algorithm implements the PRF key derivation function for
TLS. It has no associated private key and only implements key derivation
using EVP_PKEY_derive(3).

EVP_PKEY_set_tls1_prf_md() sets the message digest associated with the
TLS PRF. EVP_md5_sha1() is treated as a special case which uses the PRF
algorithm using both **MD5** and **SHA1** as used in TLS 1.0 and 1.1.

EVP_PKEY_CTX_set_tls1_prf_secret() sets the secret value of the TLS PRF
to **seclen** bytes of the buffer **sec**. Any existing secret value is replaced
and any seed is reset.

EVP_PKEY_CTX_add1_tls1_prf_seed() sets the seed to **seedlen** bytes of **seed**.
If a seed is already set it is appended to the existing value.

## STRING CTRLS


The TLS PRF also supports string based control operations using
EVP_PKEY_CTX_ctrl_str(3).
The **type** parameter "md" uses the supplied **value** as the name of the digest
algorithm to use.
The **type** parameters "secret" and "seed" use the supplied **value** parameter
as a secret or seed value.
The names "hexsecret" and "hexseed" are similar except they take a hex string
which is converted to binary.

## NOTES


A context for the TLS PRF can be obtained by calling:

```c
EVP_PKEY_CTX *pctx = EVP_PKEY_CTX_new_id(EVP_PKEY_TLS1_PRF, NULL);

```

The digest, secret value and seed must be set before a key is derived or an
error occurs.

The total length of all seeds cannot exceed 1024 bytes in length: this should
be more than enough for any normal use of the TLS PRF.

The output length of the PRF is specified by the length parameter in the
EVP_PKEY_derive() function. Since the output length is variable, setting
the buffer to **NULL** is not meaningful for the TLS PRF.

Optimised versions of the TLS PRF can be implemented in an ENGINE.

## RETURN VALUES


All these functions return 1 for success and 0 or a negative value for failure.
In particular a return value of -2 indicates the operation is not supported by
the public key algorithm.

## EXAMPLES


This example derives 10 bytes using SHA-256 with the secret key "secret"
and seed value "seed":

```c
EVP_PKEY_CTX *pctx;
unsigned char out[10];
size_t outlen = sizeof(out);

pctx = EVP_PKEY_CTX_new_id(EVP_PKEY_TLS1_PRF, NULL);
if (EVP_PKEY_derive_init(pctx) <= 0)
    /* Error */
if (EVP_PKEY_CTX_set_tls1_prf_md(pctx, EVP_sha256()) <= 0)
    /* Error */
if (EVP_PKEY_CTX_set1_tls1_prf_secret(pctx, "secret", 6) <= 0)
    /* Error */
if (EVP_PKEY_CTX_add1_tls1_prf_seed(pctx, "seed", 4) <= 0)
    /* Error */
if (EVP_PKEY_derive(pctx, out, &outlen) <= 0)
    /* Error */

```

## SEE ALSO


EVP_PKEY_CTX_new(3),
EVP_PKEY_CTX_ctrl_str(3),
EVP_PKEY_derive(3)

## HISTORY


All of the functions described here were converted from macros to functions in
OpenSSL 3.0.

## COPYRIGHT


Copyright 2016-2020 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_PKEY_CTX_set_tls1_prf_md.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_CTX_set_tls1_prf_md.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_PKEY_CTX_set_tls1_prf_md.pod`；SHA-256：`cab28dcd7e0f11c5bc7846d99d6c4cd56089d1ae05914290f6804ea04b2cbc5f`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
