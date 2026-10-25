---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-rand-egd",
  "title": "OpenSSL：密码随机数 · RAND_egd（man3）",
  "type": "note",
  "tags": [
    "随机数",
    "熵源",
    "密钥生成",
    "openssl",
    "RAND_egd"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "f82ed449f008fadcdb68a0d77491356ce0d3d549013477a2c23796db26a5fef8",
  "generatedHash": "d64a233790c5ad528a843dd9b57a843a15abe8da6473eadda4946e21b2f2c928",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码随机数：RAND_egd, RAND_egd_bytes, RAND_query_egd_bytes - query entropy gathering daemon",
  "l1": "On older platforms without a good source of randomness such as `/dev/urandom`, it is possible to query an Entropy Gathering Daemon (EGD) over a local socket to obtain randomness and seed the OpenSSL RNG. The protocol used is defined by the EGDs available at http://egd.sourceforge.net/ or http://prngd.sourceforge.net. RAND_egd_bytes() requests **num** bytes of randomness from an EGD at the specified socket **path**, and passes the data it receives into RAND_add(). RAND_egd() is equivalent to RAND_egd_bytes() with **num** set to 255. RAND_query_egd_bytes() requests **num** bytes of randomness from an EGD at the specified socket **path**, where **num** must be less than 256. If **buf** is **NULL**, it is equivalent to RAND_egd_bytes(). If **buf** is not **NULL**, then the data is copied to the buffer and RAND_add() is not called. OpenSSL can",
  "questions": [
    "RAND_egd 如何用于密码随机数？",
    "RAND_egd 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-rand-egd",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/RAND_egd.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码随机数 · RAND_egd（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码随机数。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

RAND_egd, RAND_egd_bytes, RAND_query_egd_bytes - query entropy gathering daemon

## 技术正文

## NAME


RAND_egd, RAND_egd_bytes, RAND_query_egd_bytes - query entropy gathering daemon

## SYNOPSIS


```c
#include <openssl/rand.h>

int RAND_egd_bytes(const char *path, int num);
int RAND_egd(const char *path);

int RAND_query_egd_bytes(const char *path, unsigned char *buf, int num);

```

## DESCRIPTION


On older platforms without a good source of randomness such as `/dev/urandom`,
it is possible to query an Entropy Gathering Daemon (EGD) over a local
socket to obtain randomness and seed the OpenSSL RNG.
The protocol used is defined by the EGDs available at
http://egd.sourceforge.net/ or http://prngd.sourceforge.net.

RAND_egd_bytes() requests **num** bytes of randomness from an EGD at the
specified socket **path**, and passes the data it receives into RAND_add().
RAND_egd() is equivalent to RAND_egd_bytes() with **num** set to 255.

RAND_query_egd_bytes() requests **num** bytes of randomness from an EGD at
the specified socket **path**, where **num** must be less than 256.
If **buf** is **NULL**, it is equivalent to RAND_egd_bytes().
If **buf** is not **NULL**, then the data is copied to the buffer and
RAND_add() is not called.

OpenSSL can be configured at build time to try to use the EGD for seeding
automatically.

## RETURN VALUES


RAND_egd() and RAND_egd_bytes() return the number of bytes read from the
daemon on success, or -1 if the connection failed or the daemon did not
return enough data to fully seed the PRNG.

RAND_query_egd_bytes() returns the number of bytes read from the daemon on
success, or -1 if the connection failed.

## SEE ALSO


RAND_add(3),
RAND_bytes(3),
RAND(7)

## COPYRIGHT


Copyright 2000-2018 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/RAND_egd.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/RAND_egd.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/RAND_egd.pod`；SHA-256：`f82ed449f008fadcdb68a0d77491356ce0d3d549013477a2c23796db26a5fef8`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
