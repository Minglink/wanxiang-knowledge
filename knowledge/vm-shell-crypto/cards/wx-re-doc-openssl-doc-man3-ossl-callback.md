---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-callback",
  "title": "OpenSSL：密码实现与接口 · OSSL_CALLBACK（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_CALLBACK"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "574ec87a5756ef6bc4b1d1375ba379a059afbe195eecc852b4ece090787be193",
  "generatedHash": "9506f35af14756148a6d70b651166cfe33634cb459bc550a386a0f663be3fd5d",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_CALLBACK, OSSL_PASSPHRASE_CALLBACK - OpenSSL Core type to define callbacks",
  "l1": "For certain events or activities, provider functionality may need help from the application or the calling OpenSSL libraries themselves. For example, user input or direct (possibly optional) user output could be implemented this way. Callback functions themselves are always provided by or through the calling OpenSSL libraries, along with a generic pointer to data `arg`. As far as the function receiving the pointer to the function pointer and `arg` is concerned, the data that `arg` points at is opaque, and the pointer should simply be passed back to the callback function when it's called. This is a generic callback function. When calling this callback function, the caller is expected to build an OSSL_PARAM(3) array of data it wants or is expected to pass back, and pass that as `params`, as well as the opaque data pointer it received, as `a",
  "questions": [
    "OSSL_CALLBACK 如何用于密码实现与接口？",
    "OSSL_CALLBACK 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-callback",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_CALLBACK.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_CALLBACK（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_CALLBACK, OSSL_PASSPHRASE_CALLBACK - OpenSSL Core type to define callbacks

## 技术正文

## NAME


OSSL_CALLBACK, OSSL_PASSPHRASE_CALLBACK - OpenSSL Core type to define callbacks

## SYNOPSIS


```c
#include <openssl/core.h>
typedef int (OSSL_CALLBACK)(const OSSL_PARAM params[], void *arg);
typedef int (OSSL_PASSPHRASE_CALLBACK)(char *pass, size_t pass_size,
                                       size_t *pass_len,
                                       const OSSL_PARAM params[],
                                       void *arg);

```

## DESCRIPTION


For certain events or activities, provider functionality may need help from
the application or the calling OpenSSL libraries themselves.  For example,
user input or direct (possibly optional) user output could be implemented
this way.

Callback functions themselves are always provided by or through the calling
OpenSSL libraries, along with a generic pointer to data `arg`.  As far as
the function receiving the pointer to the function pointer and `arg` is
concerned, the data that `arg` points at is opaque, and the pointer should
simply be passed back to the callback function when it's called.


- **OSSL_CALLBACK**

This is a generic callback function.  When calling this callback function,
the caller is expected to build an OSSL_PARAM(3) array of data it wants or
is expected to pass back, and pass that as `params`, as well as the opaque
data pointer it received, as `arg`.

- **OSSL_PASSPHRASE_CALLBACK**

This is a specialised callback function, used specifically to prompt the
user for a passphrase.  When calling this callback function, a buffer to
store the pass phrase needs to be given with `pass`, and its size with
`pass_size`.  The length of the prompted pass phrase will be given back in
`*pass_len`.

Additional parameters can be passed with the OSSL_PARAM(3) array `params`,



## SEE ALSO


openssl-core.h(7)

## HISTORY


The types described here were added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2022 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_CALLBACK.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_CALLBACK.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_CALLBACK.pod`；SHA-256：`574ec87a5756ef6bc4b1d1375ba379a059afbe195eecc852b4ece090787be193`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
