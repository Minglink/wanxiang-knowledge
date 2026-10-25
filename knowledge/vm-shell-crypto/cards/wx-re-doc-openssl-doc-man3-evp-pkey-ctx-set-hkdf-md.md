---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-pkey-ctx-set-hkdf-md",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY_CTX_set_hkdf_md（man3）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY_CTX_set_hkdf_md",
    "HKDF密钥派生",
    "HMAC消息认证"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "fe196d93cdd1d04873270aed5139986158d8c46fac28328e6ed408d29955df75",
  "generatedHash": "da7a6791af3cad2aa2c5d6d1efd956447a947c0818f58012f31cda63c76cd6df",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY_CTX_set_hkdf_md, EVP_PKEY_CTX_set1_hkdf_salt, EVP_PKEY_CTX_set1_hkdf_key, EVP_PKEY_CTX_add1_hkdf_info, EVP_PKEY_CTX_set_hkdf_mode - HMAC-based Extract-and-Expand key derivation algorithm",
  "l1": "The EVP_PKEY_HKDF algorithm implements the HKDF key derivation function. HKDF follows the \"extract-then-expand\" paradigm, where the KDF logically consists of two modules. The first stage takes the input keying material and \"extracts\" from it a fixed-length pseudorandom key K. The second stage \"expands\" the key K into several additional pseudorandom keys (the output of the KDF). EVP_PKEY_CTX_set_hkdf_mode() sets the mode for the HKDF operation. There are three modes that are currently defined: This is the default mode. Calling EVP_PKEY_derive(3) on an EVP_PKEY_CTX set up for HKDF will perform an extract followed by an expand operation in one go. The derived key returned will be the result after the expand operation. The intermediate fixed-length pseudorandom key K is not returned. In this mode the digest, key, salt and info values must be ",
  "questions": [
    "EVP_PKEY_CTX_set_hkdf_md 如何用于非对称密钥与签名？",
    "EVP_PKEY_CTX_set_hkdf_md 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-focus-crypto-hkdf-context",
      "kind": "机制参照"
    }
  ],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-pkey-ctx-set-hkdf-md",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_CTX_set_hkdf_md.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY_CTX_set_hkdf_md（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY_CTX_set_hkdf_md, EVP_PKEY_CTX_set1_hkdf_salt,
EVP_PKEY_CTX_set1_hkdf_key, EVP_PKEY_CTX_add1_hkdf_info,
EVP_PKEY_CTX_set_hkdf_mode -
HMAC-based Extract-and-Expand key derivation algorithm

## 技术正文

## NAME


EVP_PKEY_CTX_set_hkdf_md, EVP_PKEY_CTX_set1_hkdf_salt,
EVP_PKEY_CTX_set1_hkdf_key, EVP_PKEY_CTX_add1_hkdf_info,
EVP_PKEY_CTX_set_hkdf_mode -
HMAC-based Extract-and-Expand key derivation algorithm

## SYNOPSIS


```c
#include <openssl/kdf.h>

int EVP_PKEY_CTX_set_hkdf_mode(EVP_PKEY_CTX *pctx, int mode);

int EVP_PKEY_CTX_set_hkdf_md(EVP_PKEY_CTX *pctx, const EVP_MD *md);

int EVP_PKEY_CTX_set1_hkdf_salt(EVP_PKEY_CTX *pctx, unsigned char *salt,
                                int saltlen);

int EVP_PKEY_CTX_set1_hkdf_key(EVP_PKEY_CTX *pctx, unsigned char *key,
                               int keylen);

int EVP_PKEY_CTX_add1_hkdf_info(EVP_PKEY_CTX *pctx, unsigned char *info,
                                int infolen);

```

## DESCRIPTION


The EVP_PKEY_HKDF algorithm implements the HKDF key derivation function.
HKDF follows the "extract-then-expand" paradigm, where the KDF logically
consists of two modules. The first stage takes the input keying material
and "extracts" from it a fixed-length pseudorandom key K. The second stage
"expands" the key K into several additional pseudorandom keys (the output
of the KDF).

EVP_PKEY_CTX_set_hkdf_mode() sets the mode for the HKDF operation. There
are three modes that are currently defined:


- EVP_PKEY_HKDEF_MODE_EXTRACT_AND_EXPAND

This is the default mode. Calling EVP_PKEY_derive(3) on an EVP_PKEY_CTX set
up for HKDF will perform an extract followed by an expand operation in one go.
The derived key returned will be the result after the expand operation. The
intermediate fixed-length pseudorandom key K is not returned.

In this mode the digest, key, salt and info values must be set before a key is
derived or an error occurs.

- EVP_PKEY_HKDEF_MODE_EXTRACT_ONLY

In this mode calling EVP_PKEY_derive(3) will just perform the extract
operation. The value returned will be the intermediate fixed-length pseudorandom
key K.

The digest, key and salt values must be set before a key is derived or an
error occurs.

- EVP_PKEY_HKDEF_MODE_EXPAND_ONLY

In this mode calling EVP_PKEY_derive(3) will just perform the expand
operation. The input key should be set to the intermediate fixed-length
pseudorandom key K returned from a previous extract operation.

The digest, key and info values must be set before a key is derived or an
error occurs.


EVP_PKEY_CTX_set_hkdf_md() sets the message digest associated with the HKDF.

EVP_PKEY_CTX_set1_hkdf_salt() sets the salt to **saltlen** bytes of the
buffer **salt**. Any existing value is replaced.

EVP_PKEY_CTX_set1_hkdf_key() sets the key to **keylen** bytes of the buffer
**key**. Any existing value is replaced.

EVP_PKEY_CTX_add1_hkdf_info() sets the info value to **infolen** bytes of the
buffer **info**. If a value is already set, it is appended to the existing
value.

## STRING CTRLS


HKDF also supports string based control operations via
EVP_PKEY_CTX_ctrl_str(3).
The **type** parameter "md" uses the supplied **value** as the name of the digest
algorithm to use.
The **type** parameter "mode" uses the values "EXTRACT_AND_EXPAND",
"EXTRACT_ONLY" and "EXPAND_ONLY" to determine the mode to use.
The **type** parameters "salt", "key" and "info" use the supplied **value**
parameter as a **seed**, **key** or **info** value.
The names "hexsalt", "hexkey" and "hexinfo" are similar except they take a hex
string which is converted to binary.

## NOTES


A context for HKDF can be obtained by calling:

```c
EVP_PKEY_CTX *pctx = EVP_PKEY_CTX_new_id(EVP_PKEY_HKDF, NULL);

```

The total length of the info buffer cannot exceed 2048 bytes in length: this
should be more than enough for any normal use of HKDF.

The output length of an HKDF expand operation is specified via the length
parameter to the EVP_PKEY_derive(3) function.
Since the HKDF output length is variable, passing a **NULL** buffer as a means
to obtain the requisite length is not meaningful with HKDF in any mode that
performs an expand operation. Instead, the caller must allocate a buffer of the
desired length, and pass that buffer to EVP_PKEY_derive(3) along with (a
pointer initialized to) the desired length. Passing a **NULL** buffer to obtain
the length is allowed when using EVP_PKEY_HKDEF_MODE_EXTRACT_ONLY.

Optimised versions of HKDF can be implemented in an ENGINE.

## RETURN VALUES


All these functions return 1 for success and 0 or a negative value for failure.
In particular a return value of -2 indicates the operation is not supported by
the public key algorithm.

## EXAMPLES


This example derives 10 bytes using SHA-256 with the secret key "secret",
salt value "salt" and info value "label":

```c
EVP_PKEY_CTX *pctx;
unsigned char out[10];
size_t outlen = sizeof(out);
pctx = EVP_PKEY_CTX_new_id(EVP_PKEY_HKDF, NULL);

if (EVP_PKEY_derive_init(pctx) <= 0)
    /* Error */
if (EVP_PKEY_CTX_set_hkdf_md(pctx, EVP_sha256()) <= 0)
    /* Error */
if (EVP_PKEY_CTX_set1_hkdf_salt(pctx, "salt", 4) <= 0)
    /* Error */
if (EVP_PKEY_CTX_set1_hkdf_key(pctx, "secret", 6) <= 0)
    /* Error */
if (EVP_PKEY_CTX_add1_hkdf_info(pctx, "label", 5) <= 0)
    /* Error */
if (EVP_PKEY_derive(pctx, out, &outlen) <= 0)
    /* Error */

```

## CONFORMING TO


RFC 5869

## SEE ALSO


EVP_PKEY_CTX_new(3),
EVP_PKEY_CTX_ctrl_str(3),
EVP_PKEY_derive(3)

## HISTORY


All of the functions described here were converted from macros to functions in
OpenSSL 3.0.

## COPYRIGHT


Copyright 2016-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_PKEY_CTX_set_hkdf_md.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_CTX_set_hkdf_md.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_PKEY_CTX_set_hkdf_md.pod`；SHA-256：`fe196d93cdd1d04873270aed5139986158d8c46fac28328e6ed408d29955df75`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
