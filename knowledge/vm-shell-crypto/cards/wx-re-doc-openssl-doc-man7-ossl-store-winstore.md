---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-ossl-store-winstore",
  "title": "OpenSSL：密码实现与接口 · OSSL_STORE-winstore（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_STORE-winstore"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "211d4378193451a1b17ae32d40321a0d6959e78de1d7a63b6dae9486319dcdc1",
  "generatedHash": "1ff0562cf88957ffac2d5bdc6bb5f6f6481f2da60997f4859738ad9e3802d1ba",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_STORE-winstore - OpenSSL built in OSSL_STORE for Windows",
  "l1": "The OSSL_STORE implementation for Windows provides access to Windows' system `ROOT` certificate store through URIs, using the URI scheme `org.openssl.winstore`. There is only one supported URI: org.openssl.winstore: No authority (host, etc), no path, no query, no fragment. As a matter of fact, this must be used. It is not possible to enumerate all available certificates in the store. Apart from diverse constraints present in the certificates themselves, the Windows certificate store also has the ability to associate additional constraining properties alongside a certificate in the store. This includes both documented and undocumented capabilities: The documented capability to override EKU The undocumented capability to add name constraints The undocumented capability to override the certificate expiry date `Such constraints are not checke",
  "questions": [
    "OSSL_STORE-winstore 如何用于密码实现与接口？",
    "OSSL_STORE-winstore 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-ossl-store-winstore",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/OSSL_STORE-winstore.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_STORE-winstore（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_STORE-winstore - OpenSSL built in OSSL_STORE for Windows

## 技术正文

## NAME


OSSL_STORE-winstore - OpenSSL built in OSSL_STORE for Windows

## DESCRIPTION


The OSSL_STORE implementation for Windows provides access to Windows' system
`ROOT` certificate store through URIs, using the URI scheme
`org.openssl.winstore`.

### Supported URIs


There is only one supported URI:

```c
 org.openssl.winstore:

```

No authority (host, etc), no path, no query, no fragment.

### Supported OSSL_STORE_SEARCH operations



- OSSL_STORE_SEARCH_by_name(3)

As a matter of fact, this must be used.  It is not possible to enumerate all
available certificates in the store.


### Windows certificate store features


Apart from diverse constraints present in the certificates themselves, the
Windows certificate store also has the ability to associate additional
constraining properties alongside a certificate in the store. This includes
both documented and undocumented capabilities:


- *

The documented capability to override EKU

- *

The undocumented capability to add name constraints

- *

The undocumented capability to override the certificate expiry date


I<Such constraints are not checked by this OSSL_STORE implementation, and
thereby not honoured>.

However, once extracted with OSSL_STORE_load(3), certificates that have
constraints in their X.509 extensions will go through the usual constraint
checks when used by OpenSSL, and are thereby honoured.

## SEE ALSO


ossl_store(7), OSSL_STORE_open_ex(3), OSSL_STORE_SEARCH(3)

## HISTORY


The winstore (`org.openssl.winstore`) implementation was added in OpenSSL
3.2.0.

## NOTES


OpenSSL uses OSSL_DECODER(3) implementations under the hood.
To influence what OSSL_DECODER(3) implementations are used, it's advisable
to use OSSL_STORE_open_ex(3) and set the `propq` argument.

## COPYRIGHT


Copyright 2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/OSSL_STORE-winstore.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/OSSL_STORE-winstore.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/OSSL_STORE-winstore.pod`；SHA-256：`211d4378193451a1b17ae32d40321a0d6959e78de1d7a63b6dae9486319dcdc1`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
