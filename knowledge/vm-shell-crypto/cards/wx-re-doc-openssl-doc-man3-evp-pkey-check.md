---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-pkey-check",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY_check（man3）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY_check"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "1fc30683667dfdf9f61d95bf1ba4c3320cd5f2f2b9e455ef15dd29d481a0a4ff",
  "generatedHash": "6d3371acfdee3eed72f04db71986b43185b4fa5de86bd39ca68ceca4510df365",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY_check, EVP_PKEY_param_check, EVP_PKEY_param_check_quick, EVP_PKEY_public_check, EVP_PKEY_public_check_quick, EVP_PKEY_private_check, EVP_PKEY_pairwise_check - key and parameter validation functions",
  "l1": "EVP_PKEY_param_check() validates the parameters component of the key given by **ctx**. This check will always succeed for key types that do not have parameters. EVP_PKEY_param_check_quick() validates the parameters component of the key given by **ctx** like EVP_PKEY_param_check() does. However some algorithm implementations may offer a quicker form of validation that omits some checks in order to perform a lightweight sanity check of the key. If a quicker form is not provided then this function call does the same thing as EVP_PKEY_param_check(). EVP_PKEY_public_check() validates the public component of the key given by **ctx**. EVP_PKEY_public_check_quick() validates the public component of the key given by **ctx** like EVP_PKEY_public_check() does. However some algorithm implementations may offer a quicker form of validation that omits s",
  "questions": [
    "EVP_PKEY_check 如何用于非对称密钥与签名？",
    "EVP_PKEY_check 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-pkey-check",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_check.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY_check（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY_check, EVP_PKEY_param_check, EVP_PKEY_param_check_quick,
EVP_PKEY_public_check, EVP_PKEY_public_check_quick, EVP_PKEY_private_check,
EVP_PKEY_pairwise_check
- key and parameter validation functions

## 技术正文

## NAME


EVP_PKEY_check, EVP_PKEY_param_check, EVP_PKEY_param_check_quick,
EVP_PKEY_public_check, EVP_PKEY_public_check_quick, EVP_PKEY_private_check,
EVP_PKEY_pairwise_check
- key and parameter validation functions

## SYNOPSIS


```c
#include <openssl/evp.h>

int EVP_PKEY_check(EVP_PKEY_CTX *ctx);
int EVP_PKEY_param_check(EVP_PKEY_CTX *ctx);
int EVP_PKEY_param_check_quick(EVP_PKEY_CTX *ctx);
int EVP_PKEY_public_check(EVP_PKEY_CTX *ctx);
int EVP_PKEY_public_check_quick(EVP_PKEY_CTX *ctx);
int EVP_PKEY_private_check(EVP_PKEY_CTX *ctx);
int EVP_PKEY_pairwise_check(EVP_PKEY_CTX *ctx);

```

## DESCRIPTION


EVP_PKEY_param_check() validates the parameters component of the key
given by **ctx**. This check will always succeed for key types that do not have
parameters.

EVP_PKEY_param_check_quick() validates the parameters component of the key
given by **ctx** like EVP_PKEY_param_check() does. However some algorithm
implementations may offer a quicker form of validation that omits some checks in
order to perform a lightweight sanity check of the key. If a quicker form is not
provided then this function call does the same thing as EVP_PKEY_param_check().

EVP_PKEY_public_check() validates the public component of the key given by **ctx**.

EVP_PKEY_public_check_quick() validates the public component of the key
given by **ctx** like EVP_PKEY_public_check() does. However some algorithm
implementations may offer a quicker form of validation that omits some checks in
order to perform a lightweight sanity check of the key. If a quicker form is not
provided then this function call does the same thing as EVP_PKEY_public_check().

EVP_PKEY_private_check() validates the private component of the key given by **ctx**.

EVP_PKEY_pairwise_check() validates that the public and private components have
the correct mathematical relationship to each other for the key given by **ctx**.

EVP_PKEY_check() is an alias for the EVP_PKEY_pairwise_check() function.

## NOTES


Key validation used by the OpenSSL FIPS provider complies with the rules
within SP800-56A and SP800-56B. For backwards compatibility reasons the OpenSSL
default provider may use checks that are not as restrictive for certain key types.
For further information see EVP_PKEY-DSA(7)/DSA key validation,
EVP_PKEY-DH(7)/DH key validation, EVP_PKEY-EC(7)/EC key validation and
EVP_PKEY-RSA(7)/RSA key validation.

Refer to SP800-56A and SP800-56B for rules relating to when these functions
should be called during key establishment.
It is not necessary to call these functions after locally calling an approved key
generation method, but may be required for assurance purposes when receiving
keys from a third party.

The EVP_PKEY_pairwise_check() and EVP_PKEY_private_check() might not be bounded
by any key size limits as private keys are not expected to be supplied by
attackers. For that reason they might take an unbounded time if run on
arbitrarily large keys.

## RETURN VALUES


All functions return 1 for success or others for failure.
They return -2 if the operation is not supported for the specific algorithm.

## SEE ALSO


EVP_PKEY_CTX_new(3),
EVP_PKEY_fromdata(3),
EVP_PKEY-DH(7),
EVP_PKEY-FFC(7),
EVP_PKEY-DSA(7),
EVP_PKEY-EC(7),
EVP_PKEY-RSA(7),

## HISTORY


EVP_PKEY_check(), EVP_PKEY_public_check() and EVP_PKEY_param_check() were added
in OpenSSL 1.1.1.

EVP_PKEY_param_check_quick(), EVP_PKEY_public_check_quick(),
EVP_PKEY_private_check() and EVP_PKEY_pairwise_check() were added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2006-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_PKEY_check.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_check.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_PKEY_check.pod`；SHA-256：`1fc30683667dfdf9f61d95bf1ba4c3320cd5f2f2b9e455ef15dd29d481a0a4ff`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
