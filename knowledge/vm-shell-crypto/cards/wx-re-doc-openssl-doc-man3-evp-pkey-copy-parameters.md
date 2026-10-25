---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-pkey-copy-parameters",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY_copy_parameters（man3）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY_copy_parameters"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "848819a45c022bf6e028ce6a2d446bb9d7f5d75cd4d5734d6466d2588777867f",
  "generatedHash": "9383c20c70631667ca6c6842c1ea07caa16bfdc5812ea81143eba9051ccc1475",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY_missing_parameters, EVP_PKEY_copy_parameters, EVP_PKEY_parameters_eq, EVP_PKEY_cmp_parameters, EVP_PKEY_eq, EVP_PKEY_cmp - public key parameter and comparison functions",
  "l1": "The function EVP_PKEY_missing_parameters() returns 1 if the public key parameters of **pkey** are missing and 0 if they are present or the algorithm doesn't use parameters. The function EVP_PKEY_copy_parameters() copies the parameters from key **from** to key **to**. An error is returned if the parameters are missing in **from** or present in both **from** and **to** and mismatch. If the parameters in **from** and **to** are both present and match this function has no effect. The function EVP_PKEY_parameters_eq() checks the parameters of keys **a** and **b** for equality. The function EVP_PKEY_eq() checks the keys **a** and **b** for equality, including their parameters if they are available.",
  "questions": [
    "EVP_PKEY_copy_parameters 如何用于非对称密钥与签名？",
    "EVP_PKEY_copy_parameters 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-pkey-copy-parameters",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_copy_parameters.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY_copy_parameters（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY_missing_parameters, EVP_PKEY_copy_parameters, EVP_PKEY_parameters_eq,
EVP_PKEY_cmp_parameters, EVP_PKEY_eq,
EVP_PKEY_cmp - public key parameter and comparison functions

## 技术正文

## NAME


EVP_PKEY_missing_parameters, EVP_PKEY_copy_parameters, EVP_PKEY_parameters_eq,
EVP_PKEY_cmp_parameters, EVP_PKEY_eq,
EVP_PKEY_cmp - public key parameter and comparison functions

## SYNOPSIS


```c
#include <openssl/evp.h>

int EVP_PKEY_missing_parameters(const EVP_PKEY *pkey);
int EVP_PKEY_copy_parameters(EVP_PKEY *to, const EVP_PKEY *from);

int EVP_PKEY_parameters_eq(const EVP_PKEY *a, const EVP_PKEY *b);
int EVP_PKEY_eq(const EVP_PKEY *a, const EVP_PKEY *b);

```

The following functions have been deprecated since OpenSSL 3.0, and can be
hidden entirely by defining **OPENSSL_API_COMPAT** with a suitable version value,
see openssl_user_macros(7):

```c
int EVP_PKEY_cmp_parameters(const EVP_PKEY *a, const EVP_PKEY *b);
int EVP_PKEY_cmp(const EVP_PKEY *a, const EVP_PKEY *b);

```

## DESCRIPTION


The function EVP_PKEY_missing_parameters() returns 1 if the public key
parameters of **pkey** are missing and 0 if they are present or the algorithm
doesn't use parameters.

The function EVP_PKEY_copy_parameters() copies the parameters from key
**from** to key **to**. An error is returned if the parameters are missing in
**from** or present in both **from** and **to** and mismatch. If the parameters
in **from** and **to** are both present and match this function has no effect.

The function EVP_PKEY_parameters_eq() checks the parameters of keys
**a** and **b** for equality.

The function EVP_PKEY_eq() checks the keys **a** and **b** for equality,
including their parameters if they are available.

## NOTES


The main purpose of the functions EVP_PKEY_missing_parameters() and
EVP_PKEY_copy_parameters() is to handle public keys in certificates where the
parameters are sometimes omitted from a public key if they are inherited from
the CA that signed it.

The deprecated functions EVP_PKEY_cmp() and EVP_PKEY_cmp_parameters() differ in
their return values compared to other _cmp() functions. They are aliases for
EVP_PKEY_eq() and EVP_PKEY_parameters_eq().

The function EVP_PKEY_cmp() previously only checked the key parameters
(if there are any) and the public key, assuming that there always was
a public key and that private key equality could be derived from that.
Because it's no longer assumed that the private key in an EVP_PKEY(3) is
always accompanied by a public key, the comparison can not rely on public
key comparison alone.

Instead, EVP_PKEY_eq() (and therefore also EVP_PKEY_cmp()) now compares:


- 1.

the key parameters (if there are any)

- 2.

the public keys or the private keys of the two **EVP_PKEY**s, depending on
what they both contain.



## RETURN VALUES


The function EVP_PKEY_missing_parameters() returns 1 if the public key
parameters of **pkey** are missing and 0 if they are present or the algorithm
doesn't use parameters.

These functions EVP_PKEY_copy_parameters() returns 1 for success and 0 for
failure.

The functions EVP_PKEY_cmp_parameters(), EVP_PKEY_parameters_eq(),
EVP_PKEY_cmp() and EVP_PKEY_eq() return 1 if their
inputs match, 0 if they don't match, -1 if the key types are different and
-2 if the operation is not supported.

## SEE ALSO


EVP_PKEY_CTX_new(3),
EVP_PKEY_keygen(3)

## HISTORY


The EVP_PKEY_cmp() and EVP_PKEY_cmp_parameters() functions were deprecated in
OpenSSL 3.0.

The EVP_PKEY_eq() and EVP_PKEY_parameters_eq() were added in OpenSSL 3.0 to
replace EVP_PKEY_cmp() and EVP_PKEY_cmp_parameters().

## COPYRIGHT


Copyright 2006-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_PKEY_copy_parameters.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_copy_parameters.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_PKEY_copy_parameters.pod`；SHA-256：`848819a45c022bf6e028ce6a2d446bb9d7f5d75cd4d5734d6466d2588777867f`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
