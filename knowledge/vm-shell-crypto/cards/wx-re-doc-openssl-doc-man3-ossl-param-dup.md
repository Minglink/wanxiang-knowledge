---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-param-dup",
  "title": "OpenSSL：密码实现与接口 · OSSL_PARAM_dup（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_PARAM_dup"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "236f93f4fb7073e59ac398da2fb7b0ed4190ce057a498556718f256d2c6ec1de",
  "generatedHash": "c1004bda6ce2751207afd698cab0d885bf33f2e71850f0ad669048453e3c985b",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_PARAM_dup, OSSL_PARAM_merge, OSSL_PARAM_free - OSSL_PARAM array copy functions",
  "l1": "Algorithm parameters can be exported/imported from/to providers using arrays of OSSL_PARAM(3). The following utility functions allow the parameters to be duplicated and merged with other OSSL_PARAM(3) to assist in this process. OSSL_PARAM_dup() duplicates the parameter array `params`. This function does a deep copy of the data. OSSL_PARAM_merge() merges the parameter arrays `params` and `params1` into a new parameter array. If `params` and `params1` contain values with the same 'key' then the value from `params1` will replace the `param` value. This function does a shallow copy of the parameters. Either `params` or `params1` may be NULL. The behaviour of the merge is unpredictable if `params` and `params1` contain the same key, and there are multiple entries within either array that have the same key. OSSL_PARAM_free() frees the parameter",
  "questions": [
    "OSSL_PARAM_dup 如何用于密码实现与接口？",
    "OSSL_PARAM_dup 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-param-dup",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_PARAM_dup.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_PARAM_dup（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_PARAM_dup, OSSL_PARAM_merge, OSSL_PARAM_free
- OSSL_PARAM array copy functions

## 技术正文

## NAME


OSSL_PARAM_dup, OSSL_PARAM_merge, OSSL_PARAM_free
- OSSL_PARAM array copy functions

## SYNOPSIS


```c
#include <openssl/params.h>

OSSL_PARAM *OSSL_PARAM_dup(const OSSL_PARAM *params);
OSSL_PARAM *OSSL_PARAM_merge(const OSSL_PARAM *params, const OSSL_PARAM *params1);
void OSSL_PARAM_free(OSSL_PARAM *params);

```

## DESCRIPTION


Algorithm parameters can be exported/imported from/to providers using arrays of
OSSL_PARAM(3). The following utility functions allow the parameters to be
duplicated and merged with other OSSL_PARAM(3) to assist in this process.

OSSL_PARAM_dup() duplicates the parameter array `params`. This function does a
deep copy of the data.

OSSL_PARAM_merge() merges the parameter arrays `params` and `params1` into a
new parameter array. If `params` and `params1` contain values with the same
'key' then the value from `params1` will replace the `param` value. This
function does a shallow copy of the parameters. Either `params` or `params1`
may be NULL. The behaviour of the merge is unpredictable if `params` and
`params1` contain the same key, and there are multiple entries within either
array that have the same key.

OSSL_PARAM_free() frees the parameter array `params` that was created using
OSSL_PARAM_dup(), OSSL_PARAM_merge() or OSSL_PARAM_BLD_to_param().
If the argument to OSSL_PARAM_free() is NULL, nothing is done.

## RETURN VALUES


The functions OSSL_PARAM_dup() and OSSL_PARAM_merge() return a newly allocated
OSSL_PARAM(3) array, or NULL if there was an error. If both parameters are NULL
```c
then NULL is returned.

```

## SEE ALSO


OSSL_PARAM(3), OSSL_PARAM_BLD(3)

## HISTORY


The functions were added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2021-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_PARAM_dup.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_PARAM_dup.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_PARAM_dup.pod`；SHA-256：`236f93f4fb7073e59ac398da2fb7b0ed4190ce057a498556718f256d2c6ec1de`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
