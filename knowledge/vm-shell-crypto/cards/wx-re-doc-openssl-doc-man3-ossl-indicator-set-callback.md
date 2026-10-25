---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-indicator-set-callback",
  "title": "OpenSSL：密码实现与接口 · OSSL_INDICATOR_set_callback（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_INDICATOR_set_callback"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "90ab4f72ae8d5b0c9cccd1743d04caac8d8e3b5699ec1473676b4f06b78bdda9",
  "generatedHash": "c6aea81b025199c1d725f9b38bdf806e2e37d4338d3652bd5a7a827ecb3b4e08",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_INDICATOR_set_callback, OSSL_INDICATOR_get_callback - specify a callback for FIPS indicators",
  "l1": "OSSL_INDICATOR_set_callback() sets a user callback `cb` associated with a `libctx` that will be called when a non approved FIPS operation is detected. The user's callback may be triggered multiple times during an algorithm operation to indicate different approved mode checks have failed. Non approved operations may only occur if the user has deliberately chosen to do so (either by setting a global FIPS configuration option or via an option in an algorithm's operation context). The user's callback **OSSL_INDICATOR_CALLBACK** `type` and `desc` contain the algorithm type and operation that is not approved. `params` is not currently used. If the user callback returns 0, an error will occur in the caller. This can be used for testing purposes.",
  "questions": [
    "OSSL_INDICATOR_set_callback 如何用于密码实现与接口？",
    "OSSL_INDICATOR_set_callback 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-indicator-set-callback",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_INDICATOR_set_callback.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_INDICATOR_set_callback（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_INDICATOR_set_callback,
OSSL_INDICATOR_get_callback - specify a callback for FIPS indicators

## 技术正文

## NAME


OSSL_INDICATOR_set_callback,
OSSL_INDICATOR_get_callback - specify a callback for FIPS indicators

## SYNOPSIS


```c
#include <openssl/indicator.h>

```

typedef int (OSSL_INDICATOR_CALLBACK)(const char *type, const char *desc,
```c
                                     const OSSL_PARAM params[]);

void OSSL_INDICATOR_set_callback(OSSL_LIB_CTX *libctx,
                                 OSSL_INDICATOR_CALLBACK *cb);
void OSSL_INDICATOR_get_callback(OSSL_LIB_CTX *libctx,
                                 OSSL_INDICATOR_CALLBACK **cb);

```

## DESCRIPTION


OSSL_INDICATOR_set_callback() sets a user callback `cb` associated with a
`libctx` that will be called when a non approved FIPS operation is detected.

The user's callback may be triggered multiple times during an algorithm operation
to indicate different approved mode checks have failed.

Non approved operations may only occur if the user has deliberately chosen to do
so (either by setting a global FIPS configuration option or via an option in an
algorithm's operation context).

The user's callback **OSSL_INDICATOR_CALLBACK** `type` and `desc`
contain the algorithm type and operation that is not approved.
`params` is not currently used.

If the user callback returns 0, an error will occur in the caller. This can be
used for testing purposes.

## RETURN VALUES


OSSL_INDICATOR_get_callback() returns the callback that has been set via
OSSL_INDICATOR_set_callback() for the given library context `libctx`, or NULL
if no callback is currently set.

## EXAMPLES


A simple indicator callback to log non approved FIPS operations

```c
static int indicator_cb(const char *type, const char *desc,
                        const OSSL_PARAM params[])
{
    if (type != NULL && desc != NULL)
        fprintf(stdout, "%s %s is not approved\n", type, desc);
```

end:
```c
    /* For Testing purposes you could return 0 here to cause an error */
    return 1;
}

OSSL_INDICATOR_set_callback(libctx, indicator_cb);


```

## SEE ALSO


openssl-core.h(7),
OSSL_PROVIDER-FIPS(7)
OSSL_LIB_CTX(3)

## HISTORY


The functions described here were added in OpenSSL 3.4.

## COPYRIGHT


Copyright 2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_INDICATOR_set_callback.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_INDICATOR_set_callback.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_INDICATOR_set_callback.pod`；SHA-256：`90ab4f72ae8d5b0c9cccd1743d04caac8d8e3b5699ec1473676b4f06b78bdda9`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
