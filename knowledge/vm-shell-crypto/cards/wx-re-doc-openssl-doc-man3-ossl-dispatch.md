---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-dispatch",
  "title": "OpenSSL：密码实现与接口 · OSSL_DISPATCH（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_DISPATCH"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "853fc189c8c5cc7aec0fca46de6ef6aec74f65fa76e38f1e3c8dc1f0636524fa",
  "generatedHash": "27ae48e426c1945dbd40b604c574006a78946092f00033dd8de8d364c4ac467e",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_DISPATCH, OSSL_DISPATCH_END - OpenSSL Core type to define a dispatchable function table",
  "l1": "This type is a tuple of function identity and function pointer. Arrays of this type are passed between the OpenSSL libraries and the providers to describe what functionality one side provides to the other. Arrays of this type must be terminated with the OSSL_DISPATCH_END macro. OpenSSL defined function identity of the implemented function. Pointer to the implemented function itself. Despite the generic definition of this field, the implemented function it points to must have a function signature that corresponds to the `function_id` Available function identities and corresponding function signatures are defined in openssl-core_dispatch.h(7). Furthermore, the chosen function identities and associated function signature must be chosen specifically for the operation that it's intended for, as determined by the intended OSSL_ALGORITHM(3) arra",
  "questions": [
    "OSSL_DISPATCH 如何用于密码实现与接口？",
    "OSSL_DISPATCH 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-dispatch",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_DISPATCH.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_DISPATCH（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_DISPATCH, OSSL_DISPATCH_END - OpenSSL Core type to define a dispatchable function table

## 技术正文

## NAME


OSSL_DISPATCH, OSSL_DISPATCH_END - OpenSSL Core type to define a dispatchable function table

## SYNOPSIS


```c
#include <openssl/core.h>

typedef struct ossl_dispatch_st OSSL_DISPATCH;
struct ossl_dispatch_st {
    int function_id;
    void (*function)(void);
};

#define OSSL_DISPATCH_END

```

## DESCRIPTION


This type is a tuple of function identity and function pointer.
Arrays of this type are passed between the OpenSSL libraries and the
providers to describe what functionality one side provides to the other.

Arrays of this type must be terminated with the OSSL_DISPATCH_END macro.

### **OSSL_DISPATCH** fields



- `function_id`

OpenSSL defined function identity of the implemented function.

- `function`

Pointer to the implemented function itself.  Despite the generic definition
of this field, the implemented function it points to must have a function
signature that corresponds to the `function_id`


Available function identities and corresponding function signatures are
defined in openssl-core_dispatch.h(7).
Furthermore, the chosen function identities and associated function
signature must be chosen specifically for the operation that it's intended
for, as determined by the intended OSSL_ALGORITHM(3) array.

Any function identity not recognised by the recipient of this type
will be ignored.
This ensures that providers built with one OpenSSL version in mind
will work together with any other OpenSSL version that supports this
mechanism.


## SEE ALSO


crypto(7), openssl-core_dispatch.h(7), OSSL_ALGORITHM(3)

## HISTORY


**OSSL_DISPATCH** was added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2022-2023 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_DISPATCH.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_DISPATCH.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_DISPATCH.pod`；SHA-256：`853fc189c8c5cc7aec0fca46de6ef6aec74f65fa76e38f1e3c8dc1f0636524fa`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
