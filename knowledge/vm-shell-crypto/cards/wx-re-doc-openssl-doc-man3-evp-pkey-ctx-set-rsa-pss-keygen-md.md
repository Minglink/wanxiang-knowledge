---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-pkey-ctx-set-rsa-pss-keygen-md",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY_CTX_set_rsa_pss_keygen_md（man3）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY_CTX_set_rsa_pss_keygen_md",
    "RSA非对称密码"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "e49444ff7263ccbfbf505ba10d0f01602b6f2b03a03d4654165178e595799263",
  "generatedHash": "7396e9a60a542498cbfe22f8a6799f67dae3e8b4f75147bbf5a80baddbb6f1f2",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY_CTX_set_rsa_pss_keygen_md, EVP_PKEY_CTX_set_rsa_pss_keygen_md_name, EVP_PKEY_CTX_set_rsa_pss_keygen_mgf1_md, EVP_PKEY_CTX_set_rsa_pss_keygen_mgf1_md_name, EVP_PKEY_CTX_set_rsa_pss_keygen_saltlen - EVP_PKEY RSA-PSS algorithm support functions",
  "l1": "These are the functions that implement RSA-PSS(7). The macro EVP_PKEY_CTX_set_rsa_padding() is supported but an error is returned if an attempt is made to set the padding mode to anything other than **PSS**. It is otherwise similar to the **RSA** version. The EVP_PKEY_CTX_set_rsa_pss_saltlen() macro is used to set the salt length. If the key has usage restrictions then an error is returned if an attempt is made to set the salt length below the minimum value. It is otherwise similar to the **RSA** operation except detection of the salt length (using RSA_PSS_SALTLEN_AUTO) is not supported for verification if the key has usage restrictions. The EVP_PKEY_CTX_set_signature_md(3) and EVP_PKEY_CTX_set_rsa_mgf1_md(3) functions are used to set the digest and MGF1 algorithms respectively. If the key has usage restrictions then an error is returned ",
  "questions": [
    "EVP_PKEY_CTX_set_rsa_pss_keygen_md 如何用于非对称密钥与签名？",
    "EVP_PKEY_CTX_set_rsa_pss_keygen_md 有哪些参数、约束、实现语义和注意事项？"
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
      "id": "doc-openssl-doc-man3-evp-pkey-ctx-set-rsa-pss-keygen-md",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_CTX_set_rsa_pss_keygen_md.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY_CTX_set_rsa_pss_keygen_md（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY_CTX_set_rsa_pss_keygen_md,
EVP_PKEY_CTX_set_rsa_pss_keygen_md_name,
EVP_PKEY_CTX_set_rsa_pss_keygen_mgf1_md,
EVP_PKEY_CTX_set_rsa_pss_keygen_mgf1_md_name,
EVP_PKEY_CTX_set_rsa_pss_keygen_saltlen
- EVP_PKEY RSA-PSS algorithm support functions

## 技术正文

## NAME


EVP_PKEY_CTX_set_rsa_pss_keygen_md,
EVP_PKEY_CTX_set_rsa_pss_keygen_md_name,
EVP_PKEY_CTX_set_rsa_pss_keygen_mgf1_md,
EVP_PKEY_CTX_set_rsa_pss_keygen_mgf1_md_name,
EVP_PKEY_CTX_set_rsa_pss_keygen_saltlen
- EVP_PKEY RSA-PSS algorithm support functions

## SYNOPSIS


```c
#include <openssl/rsa.h>

int EVP_PKEY_CTX_set_rsa_pss_keygen_md(EVP_PKEY_CTX *pctx,
                                       const EVP_MD *md);
int EVP_PKEY_CTX_set_rsa_pss_keygen_md_name(EVP_PKEY_CTX *ctx,
                                            const char *mdname,
                                            const char *mdprops);
int EVP_PKEY_CTX_set_rsa_pss_keygen_mgf1_md(EVP_PKEY_CTX *pctx,
                                            const EVP_MD *md);
int EVP_PKEY_CTX_set_rsa_pss_keygen_mgf1_md_name(EVP_PKEY_CTX *pctx,
                                                 const char *mdname);
int EVP_PKEY_CTX_set_rsa_pss_keygen_saltlen(EVP_PKEY_CTX *pctx,
                                            int saltlen);

```

## DESCRIPTION


These are the functions that implement RSA-PSS(7).

### Signing and Verification


The macro EVP_PKEY_CTX_set_rsa_padding() is supported but an error is
returned if an attempt is made to set the padding mode to anything other
than **PSS**. It is otherwise similar to the **RSA** version.

The EVP_PKEY_CTX_set_rsa_pss_saltlen() macro is used to set the salt length.
If the key has usage restrictions then an error is returned if an attempt is
made to set the salt length below the minimum value. It is otherwise similar
to the **RSA** operation except detection of the salt length (using
RSA_PSS_SALTLEN_AUTO) is not supported for verification if the key has
usage restrictions.

The EVP_PKEY_CTX_set_signature_md(3) and EVP_PKEY_CTX_set_rsa_mgf1_md(3)
functions are used to set the digest and MGF1 algorithms respectively. If the
key has usage restrictions then an error is returned if an attempt is made to
set the digest to anything other than the restricted value. Otherwise these are
similar to the **RSA** versions.

### Key Generation


As with RSA key generation the EVP_PKEY_CTX_set_rsa_keygen_bits()
and EVP_PKEY_CTX_set_rsa_keygen_pubexp() macros are supported for RSA-PSS:
they have exactly the same meaning as for the RSA algorithm.

Optional parameter restrictions can be specified when generating a PSS key.
If any restrictions are set (using the macros described below) then **all**
parameters are restricted. For example, setting a minimum salt length also
restricts the digest and MGF1 algorithms. If any restrictions are in place
then they are reflected in the corresponding parameters of the public key
when (for example) a certificate request is signed.

EVP_PKEY_CTX_set_rsa_pss_keygen_md() restricts the digest algorithm the
generated key can use to `md`.
EVP_PKEY_CTX_set_rsa_pss_keygen_md_name() does the same thing, but
passes the algorithm by name rather than by **EVP_MD**.

EVP_PKEY_CTX_set_rsa_pss_keygen_mgf1_md() restricts the MGF1 algorithm the
generated key can use to `md`.
EVP_PKEY_CTX_set_rsa_pss_keygen_mgf1_md_name() does the same thing, but
passes the algorithm by name rather than by **EVP_MD**.

EVP_PKEY_CTX_set_rsa_pss_keygen_saltlen() restricts the minimum salt length
to `saltlen`.

## NOTES


A context for the **RSA-PSS** algorithm can be obtained by calling:

```c
EVP_PKEY_CTX *pctx = EVP_PKEY_CTX_new_id(EVP_PKEY_RSA_PSS, NULL);

```

## RETURN VALUES


All these functions return 1 for success and 0 or a negative value for failure.
In particular a return value of -2 indicates the operation is not supported by
the public key algorithm.

## SEE ALSO


RSA-PSS(7),
EVP_PKEY_CTX_new(3),
EVP_PKEY_CTX_ctrl_str(3),
EVP_PKEY_derive(3)

## COPYRIGHT


Copyright 2017-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_PKEY_CTX_set_rsa_pss_keygen_md.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_CTX_set_rsa_pss_keygen_md.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_PKEY_CTX_set_rsa_pss_keygen_md.pod`；SHA-256：`e49444ff7263ccbfbf505ba10d0f01602b6f2b03a03d4654165178e595799263`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
