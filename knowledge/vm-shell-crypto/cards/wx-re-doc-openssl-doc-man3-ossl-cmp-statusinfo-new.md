---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-cmp-statusinfo-new",
  "title": "OpenSSL：密码实现与接口 · OSSL_CMP_STATUSINFO_new（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_CMP_STATUSINFO_new"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "f28fc30d4a4457de4da18fc288e73cfb384a0c9a5f23fc0c9e4e9558c6aa7c6b",
  "generatedHash": "555de67a7d2516d87b22b65a166bc667bb168be9d3a68a4b5636fac5a421044a",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_CMP_STATUSINFO_new, OSSL_CMP_snprint_PKIStatusInfo, OSSL_CMP_CTX_snprint_PKIStatus - function(s) for managing the CMP PKIStatus",
  "l1": "This is the PKIStatus API for using CMP (Certificate Management Protocol) with OpenSSL. OSSL_CMP_STATUSINFO_new() creates a new PKIStatusInfo structure and fills in the given values. It sets the status field to `status`, copies `text` (unless it is NULL) to statusString, and interprets `fail_info` as bit pattern for the failInfo field. OSSL_CMP_snprint_PKIStatusInfo() places a human-readable string representing the given statusInfo in the given buffer, with the given maximal length. OSSL_CMP_CTX_snprint_PKIStatus() places a human-readable string representing the PKIStatusInfo components of the CMP context `ctx` in the given buffer, with the given maximal length.",
  "questions": [
    "OSSL_CMP_STATUSINFO_new 如何用于密码实现与接口？",
    "OSSL_CMP_STATUSINFO_new 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-cmp-statusinfo-new",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_CMP_STATUSINFO_new.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_CMP_STATUSINFO_new（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_CMP_STATUSINFO_new,
OSSL_CMP_snprint_PKIStatusInfo,
OSSL_CMP_CTX_snprint_PKIStatus
- function(s) for managing the CMP PKIStatus

## 技术正文

## NAME


OSSL_CMP_STATUSINFO_new,
OSSL_CMP_snprint_PKIStatusInfo,
OSSL_CMP_CTX_snprint_PKIStatus
- function(s) for managing the CMP PKIStatus

## SYNOPSIS


```c
#include <openssl/cmp.h>

OSSL_CMP_PKISI *OSSL_CMP_STATUSINFO_new(int status, int fail_info,
                                        const char *text);
char *OSSL_CMP_snprint_PKIStatusInfo(const OSSL_CMP_PKISI *statusInfo,
                                     char *buf, size_t bufsize);
char *OSSL_CMP_CTX_snprint_PKIStatus(const OSSL_CMP_CTX *ctx, char *buf,
                                     size_t bufsize);

```

## DESCRIPTION


This is the PKIStatus API for using CMP (Certificate Management Protocol) with
OpenSSL.

OSSL_CMP_STATUSINFO_new() creates a new PKIStatusInfo structure
and fills in the given values.
It sets the status field to `status`,
copies `text` (unless it is NULL) to statusString,
and interprets `fail_info` as bit pattern for the failInfo field.

OSSL_CMP_snprint_PKIStatusInfo() places a human-readable string
representing the given statusInfo
in the given buffer, with the given maximal length.

OSSL_CMP_CTX_snprint_PKIStatus() places a human-readable string
representing the PKIStatusInfo components of the CMP context `ctx`
in the given buffer, with the given maximal length.

## NOTES


CMP is defined in RFC 4210 (and CRMF in RFC 4211).

## RETURN VALUES


OSSL_CMP_STATUSINFO_new()
returns a pointer to the structure on success, or NULL on error.

OSSL_CMP_snprint_PKIStatusInfo() and
OSSL_CMP_CTX_snprint_PKIStatus()
return a copy of the buffer pointer containing the string or NULL on error.

## HISTORY


The OpenSSL CMP support was added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2007-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_CMP_STATUSINFO_new.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_CMP_STATUSINFO_new.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_CMP_STATUSINFO_new.pod`；SHA-256：`f28fc30d4a4457de4da18fc288e73cfb384a0c9a5f23fc0c9e4e9558c6aa7c6b`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
