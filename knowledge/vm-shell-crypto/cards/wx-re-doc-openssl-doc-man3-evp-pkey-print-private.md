---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-pkey-print-private",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY_print_private（man3）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY_print_private"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "bd62522e2d5015bfdb9c1dbe92a92043bed84fb4ba94f50f21418505b1eddbd0",
  "generatedHash": "06c73187c8b47d3b8f9781048146e98b2957dd8d9cb074e8b7731e98fc3bb1d7",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY_print_public, EVP_PKEY_print_private, EVP_PKEY_print_params, EVP_PKEY_print_public_fp, EVP_PKEY_print_private_fp, EVP_PKEY_print_params_fp - public key algorithm printing routines",
  "l1": "The functions EVP_PKEY_print_public(), EVP_PKEY_print_private() and EVP_PKEY_print_params() print out the public, private or parameter components of key `pkey` respectively. The key is sent to **BIO** `out` in human readable form. The parameter `indent` indicates how far the printout should be indented. The `pctx` parameter allows the print output to be finely tuned by using ASN1 printing options. If `pctx` is set to NULL then default values will be used. The functions EVP_PKEY_print_public_fp(), EVP_PKEY_print_private_fp() and EVP_PKEY_print_params_fp() do the same as the **BIO** based functions but use **FILE** `fp` instead.",
  "questions": [
    "EVP_PKEY_print_private 如何用于非对称密钥与签名？",
    "EVP_PKEY_print_private 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-pkey-print-private",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_print_private.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY_print_private（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY_print_public, EVP_PKEY_print_private, EVP_PKEY_print_params,
EVP_PKEY_print_public_fp, EVP_PKEY_print_private_fp,
EVP_PKEY_print_params_fp - public key algorithm printing routines

## 技术正文

## NAME


EVP_PKEY_print_public, EVP_PKEY_print_private, EVP_PKEY_print_params,
EVP_PKEY_print_public_fp, EVP_PKEY_print_private_fp,
EVP_PKEY_print_params_fp - public key algorithm printing routines

## SYNOPSIS


```c
#include <openssl/evp.h>

int EVP_PKEY_print_public(BIO *out, const EVP_PKEY *pkey,
                          int indent, ASN1_PCTX *pctx);
int EVP_PKEY_print_public_fp(FILE *fp, const EVP_PKEY *pkey,
                             int indent, ASN1_PCTX *pctx);
int EVP_PKEY_print_private(BIO *out, const EVP_PKEY *pkey,
                           int indent, ASN1_PCTX *pctx);
int EVP_PKEY_print_private_fp(FILE *fp, const EVP_PKEY *pkey,
                              int indent, ASN1_PCTX *pctx);
int EVP_PKEY_print_params(BIO *out, const EVP_PKEY *pkey,
                          int indent, ASN1_PCTX *pctx);
int EVP_PKEY_print_params_fp(FILE *fp, const EVP_PKEY *pkey,
                             int indent, ASN1_PCTX *pctx);

```

## DESCRIPTION


The functions EVP_PKEY_print_public(), EVP_PKEY_print_private() and
EVP_PKEY_print_params() print out the public, private or parameter components
of key `pkey` respectively. The key is sent to **BIO** `out` in human readable
form. The parameter `indent` indicates how far the printout should be indented.

The `pctx` parameter allows the print output to be finely tuned by using
ASN1 printing options. If `pctx` is set to NULL then default values will
be used.

The functions EVP_PKEY_print_public_fp(), EVP_PKEY_print_private_fp() and
EVP_PKEY_print_params_fp() do the same as the **BIO** based functions
but use **FILE** `fp` instead.

## NOTES


Currently no public key algorithms include any options in the `pctx` parameter.

If the key does not include all the components indicated by the function then
only those contained in the key will be printed. For example passing a public
key to EVP_PKEY_print_private() will only print the public components.

## RETURN VALUES


These functions all return 1 for success and 0 or a negative value for failure.
In particular a return value of -2 indicates the operation is not supported by
the public key algorithm.

## SEE ALSO


EVP_PKEY_CTX_new(3),
EVP_PKEY_keygen(3)

## HISTORY


The functions EVP_PKEY_print_public(), EVP_PKEY_print_private(),
and EVP_PKEY_print_params() were added in OpenSSL 1.0.0.

The functions EVP_PKEY_print_public_fp(), EVP_PKEY_print_private_fp(),
and EVP_PKEY_print_params_fp() were added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2006-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_PKEY_print_private.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_print_private.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_PKEY_print_private.pod`；SHA-256：`bd62522e2d5015bfdb9c1dbe92a92043bed84fb4ba94f50f21418505b1eddbd0`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
