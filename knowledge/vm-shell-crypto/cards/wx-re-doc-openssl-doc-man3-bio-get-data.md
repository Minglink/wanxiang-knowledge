---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bio-get-data",
  "title": "OpenSSL：密码数据流 · BIO_get_data（man3）",
  "type": "note",
  "tags": [
    "BIO",
    "输入输出",
    "缓冲区",
    "openssl",
    "BIO_get_data"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "92d86b1f051b29872f335de5f4b89d3df09ffcce552be4f694515a72b16808a1",
  "generatedHash": "1de20fc60dfed2c6702f0bec3f3670529b3acf64048f61f60ba5c6b8592a8a49",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码数据流：BIO_set_data, BIO_get_data, BIO_set_init, BIO_get_init, BIO_set_shutdown, BIO_get_shutdown - functions for managing BIO state information",
  "l1": "These functions are mainly useful when implementing a custom BIO. The BIO_set_data() function associates the custom data pointed to by **ptr** with the BIO. This data can subsequently be retrieved via a call to BIO_get_data(). This can be used by custom BIOs for storing implementation specific information. The BIO_set_init() function sets the value of the BIO's \"init\" flag to indicate whether initialisation has been completed for this BIO or not. A nonzero value indicates that initialisation is complete, whilst zero indicates that it is not. Often initialisation will complete during initial construction of the BIO. For some BIOs however, initialisation may not complete until after additional steps have occurred (for example through calling custom ctrls). The BIO_get_init() function returns the value of the \"init\" flag. The BIO_set_shutdow",
  "questions": [
    "BIO_get_data 如何用于密码数据流？",
    "BIO_get_data 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bio-get-data",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_get_data.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码数据流 · BIO_get_data（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码数据流。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BIO_set_data, BIO_get_data, BIO_set_init, BIO_get_init, BIO_set_shutdown,
BIO_get_shutdown - functions for managing BIO state information

## 技术正文

## NAME


BIO_set_data, BIO_get_data, BIO_set_init, BIO_get_init, BIO_set_shutdown,
BIO_get_shutdown - functions for managing BIO state information

## SYNOPSIS


```c
#include <openssl/bio.h>

void BIO_set_data(BIO *a, void *ptr);
void *BIO_get_data(BIO *a);
void BIO_set_init(BIO *a, int init);
int BIO_get_init(BIO *a);
void BIO_set_shutdown(BIO *a, int shut);
int BIO_get_shutdown(BIO *a);

```

## DESCRIPTION


These functions are mainly useful when implementing a custom BIO.

The BIO_set_data() function associates the custom data pointed to by **ptr** with
the BIO. This data can subsequently be retrieved via a call to BIO_get_data().
This can be used by custom BIOs for storing implementation specific information.

The BIO_set_init() function sets the value of the BIO's "init" flag to indicate
whether initialisation has been completed for this BIO or not. A nonzero value
indicates that initialisation is complete, whilst zero indicates that it is not.
Often initialisation will complete during initial construction of the BIO. For
some BIOs however, initialisation may not complete until after additional steps
have occurred (for example through calling custom ctrls). The BIO_get_init()
function returns the value of the "init" flag.

The BIO_set_shutdown() and BIO_get_shutdown() functions set and get the state of
this BIO's shutdown (i.e. BIO_CLOSE) flag. If set then the underlying resource
is also closed when the BIO is freed.

## RETURN VALUES


BIO_get_data() returns a pointer to the implementation specific custom data
associated with this BIO, or NULL if none has been set.

BIO_get_init() returns the state of the BIO's init flag.

BIO_get_shutdown() returns the stat of the BIO's shutdown (i.e. BIO_CLOSE) flag.

## SEE ALSO


bio(7), BIO_meth_new(3)

## HISTORY


The functions described here were added in OpenSSL 1.1.0.

## COPYRIGHT


Copyright 2016 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BIO_get_data.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_get_data.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BIO_get_data.pod`；SHA-256：`92d86b1f051b29872f335de5f4b89d3df09ffcce552be4f694515a72b16808a1`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
