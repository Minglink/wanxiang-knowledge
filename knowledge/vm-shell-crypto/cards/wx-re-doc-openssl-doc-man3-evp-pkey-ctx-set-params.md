---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-pkey-ctx-set-params",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY_CTX_set_params（man3）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY_CTX_set_params"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "71aebdf9f335cd66c655087b2bdb4a781187f4a595af066d4371c929c880561d",
  "generatedHash": "729690de3844ba915c2ee623ac55a1c5a824a95bde9a48f868544a23000cf3aa",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY_CTX_set_params, EVP_PKEY_CTX_settable_params, EVP_PKEY_CTX_get_params, EVP_PKEY_CTX_gettable_params - provider parameter passing operations",
  "l1": "The EVP_PKEY_CTX_get_params() and EVP_PKEY_CTX_set_params() functions allow transfer of arbitrary key parameters to and from providers. Not all parameters may be supported by all providers. See OSSL_PROVIDER(3) for more information on providers. The `params` field is a pointer to a list of **OSSL_PARAM** structures, terminated with a OSSL_PARAM_END(3) struct. See OSSL_PARAM(3) for information about passing parameters. These functions must only be called after the EVP_PKEY_CTX has been initialised for use in an operation. These methods replace the EVP_PKEY_CTX_ctrl() mechanism. (EVP_PKEY_CTX_ctrl now calls these methods internally to interact with providers). EVP_PKEY_CTX_gettable_params() and EVP_PKEY_CTX_settable_params() get a constant OSSL_PARAM(3) array that describes the gettable and settable parameters for the current algorithm impl",
  "questions": [
    "EVP_PKEY_CTX_set_params 如何用于非对称密钥与签名？",
    "EVP_PKEY_CTX_set_params 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-pkey-ctx-set-params",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_CTX_set_params.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY_CTX_set_params（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY_CTX_set_params,
EVP_PKEY_CTX_settable_params,
EVP_PKEY_CTX_get_params,
EVP_PKEY_CTX_gettable_params
- provider parameter passing operations

## 技术正文

## NAME


EVP_PKEY_CTX_set_params,
EVP_PKEY_CTX_settable_params,
EVP_PKEY_CTX_get_params,
EVP_PKEY_CTX_gettable_params
- provider parameter passing operations

## SYNOPSIS


```c
#include <openssl/evp.h>

int EVP_PKEY_CTX_set_params(EVP_PKEY_CTX *ctx, const OSSL_PARAM *params);
const OSSL_PARAM *EVP_PKEY_CTX_settable_params(const EVP_PKEY_CTX *ctx);
int EVP_PKEY_CTX_get_params(EVP_PKEY_CTX *ctx, OSSL_PARAM *params);
const OSSL_PARAM *EVP_PKEY_CTX_gettable_params(const EVP_PKEY_CTX *ctx);

```

## DESCRIPTION


The EVP_PKEY_CTX_get_params() and EVP_PKEY_CTX_set_params() functions allow
transfer of arbitrary key parameters to and from providers.
Not all parameters may be supported by all providers.
See OSSL_PROVIDER(3) for more information on providers.
The `params` field is a pointer to a list of **OSSL_PARAM** structures,
terminated with a OSSL_PARAM_END(3) struct.
See OSSL_PARAM(3) for information about passing parameters.
These functions must only be called after the EVP_PKEY_CTX has been initialised
for use in an operation.
These methods replace the EVP_PKEY_CTX_ctrl() mechanism. (EVP_PKEY_CTX_ctrl now
calls these methods internally to interact with providers).

EVP_PKEY_CTX_gettable_params() and EVP_PKEY_CTX_settable_params() get a
constant OSSL_PARAM(3) array that describes the gettable and
settable parameters for the current algorithm implementation, i.e. parameters
that can be used with EVP_PKEY_CTX_get_params() and EVP_PKEY_CTX_set_params()
respectively.
These functions must only be called after the EVP_PKEY_CTX has been initialised
for use in an operation.

### Parameters


Examples of EVP_PKEY parameters include the following:

provider-keymgmt(7)/Common parameters
provider-keyexch(7)/Key Exchange parameters
provider-signature(7)/Signature parameters

EVP_PKEY-RSA(7)/Common RSA parameters
EVP_PKEY-RSA(7)/RSA key generation parameters
EVP_PKEY-FFC(7)/FFC parameters
EVP_PKEY-FFC(7)/FFC key generation parameters
EVP_PKEY-DSA(7)/DSA parameters
EVP_PKEY-DSA(7)/DSA key generation parameters
EVP_PKEY-DH(7)/DH parameters
EVP_PKEY-DH(7)/DH key generation parameters
EVP_PKEY-EC(7)/Common EC parameters
EVP_PKEY-X25519(7)/Common X25519, X448, ED25519 and ED448 parameters
EVP_PKEY-ML-DSA(7)/Common parameters
EVP_PKEY-ML-KEM(7)/Common parameters

## RETURN VALUES


EVP_PKEY_CTX_set_params() returns 1 for success or 0 otherwise.
EVP_PKEY_CTX_settable_params() returns an OSSL_PARAM array on success or NULL on
error.
It may also return NULL if there are no settable parameters available.

All other functions and macros described on this page return a positive value
for success and 0 or a negative value for failure. In particular a return value
of -2 indicates the operation is not supported by the public key algorithm.

## SEE ALSO


EVP_PKEY_CTX_new(3),
EVP_PKEY_encrypt(3),
EVP_PKEY_decrypt(3),
EVP_PKEY_sign(3),
EVP_PKEY_verify(3),
EVP_PKEY_verify_recover(3),
EVP_PKEY_derive(3),
EVP_PKEY_keygen(3)

## HISTORY


All functions were added in OpenSSL 3.0.

Support for **ML-DSA**> and **ML-KEM** was added in OpenSSL 3.5.

## COPYRIGHT


Copyright 2020-2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_PKEY_CTX_set_params.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_CTX_set_params.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_PKEY_CTX_set_params.pod`；SHA-256：`71aebdf9f335cd66c655087b2bdb4a781187f4a595af066d4371c929c880561d`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
