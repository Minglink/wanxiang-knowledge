---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bio-addrinfo",
  "title": "OpenSSL：密码数据流 · BIO_ADDRINFO（man3）",
  "type": "note",
  "tags": [
    "BIO",
    "输入输出",
    "缓冲区",
    "openssl",
    "BIO_ADDRINFO"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "2087a04da545b3b702f22785b67ba4184662211c7b9035dcdc2ee53759282389",
  "generatedHash": "e87a0105fadacc52b2d7a0c5f1012f98de5e345a0c5062e6484f503ff8f3dd81",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码数据流：BIO_lookup_type, BIO_ADDRINFO, BIO_ADDRINFO_next, BIO_ADDRINFO_free, BIO_ADDRINFO_family, BIO_ADDRINFO_socktype, BIO_ADDRINFO_protocol, BIO_ADDRINFO_address, BIO_lookup_ex, BIO_lookup - BIO_ADDRINFO type and routines",
  "l1": "The **BIO_ADDRINFO** type is a wrapper for address information types provided on your platform. **BIO_ADDRINFO** normally forms a chain of several that can be picked at one by one. BIO_lookup_ex() looks up a specified **host** and **service**, and uses **lookup_type** to determine what the default address should be if **host** is **NULL**. **family**, **socktype** and **protocol** are used to determine what protocol family, socket type and protocol should be used for the lookup. **family** can be any of AF_INET, AF_INET6, AF_UNIX and AF_UNSPEC. **socktype** can be SOCK_STREAM, SOCK_DGRAM or 0. Specifying 0 indicates that any type can be used. **protocol** specifies a protocol such as IPPROTO_TCP, IPPROTO_UDP or IPPORTO_SCTP. If set to 0 than any protocol can be used. **res** points at a pointer to hold the start of a **BIO_ADDRINFO** chai",
  "questions": [
    "BIO_ADDRINFO 如何用于密码数据流？",
    "BIO_ADDRINFO 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bio-addrinfo",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_ADDRINFO.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码数据流 · BIO_ADDRINFO（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码数据流。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BIO_lookup_type,
BIO_ADDRINFO, BIO_ADDRINFO_next, BIO_ADDRINFO_free,
BIO_ADDRINFO_family, BIO_ADDRINFO_socktype, BIO_ADDRINFO_protocol,
BIO_ADDRINFO_address,
BIO_lookup_ex,
BIO_lookup
- BIO_ADDRINFO type and routines

## 技术正文

## NAME


BIO_lookup_type,
BIO_ADDRINFO, BIO_ADDRINFO_next, BIO_ADDRINFO_free,
BIO_ADDRINFO_family, BIO_ADDRINFO_socktype, BIO_ADDRINFO_protocol,
BIO_ADDRINFO_address,
BIO_lookup_ex,
BIO_lookup
- BIO_ADDRINFO type and routines

## SYNOPSIS


```c
#include <sys/types.h>
#include <openssl/bio.h>

typedef union bio_addrinfo_st BIO_ADDRINFO;

enum BIO_lookup_type {
    BIO_LOOKUP_CLIENT, BIO_LOOKUP_SERVER
};

int BIO_lookup_ex(const char *host, const char *service, int lookup_type,
                  int family, int socktype, int protocol, BIO_ADDRINFO **res);
int BIO_lookup(const char *host, const char *service,
               enum BIO_lookup_type lookup_type,
               int family, int socktype, BIO_ADDRINFO **res);

const BIO_ADDRINFO *BIO_ADDRINFO_next(const BIO_ADDRINFO *bai);
int BIO_ADDRINFO_family(const BIO_ADDRINFO *bai);
int BIO_ADDRINFO_socktype(const BIO_ADDRINFO *bai);
int BIO_ADDRINFO_protocol(const BIO_ADDRINFO *bai);
const BIO_ADDR *BIO_ADDRINFO_address(const BIO_ADDRINFO *bai);
void BIO_ADDRINFO_free(BIO_ADDRINFO *bai);

```

## DESCRIPTION


The **BIO_ADDRINFO** type is a wrapper for address information
types provided on your platform.

**BIO_ADDRINFO** normally forms a chain of several that can be
picked at one by one.

BIO_lookup_ex() looks up a specified **host** and **service**, and
uses **lookup_type** to determine what the default address should
be if **host** is **NULL**. **family**, **socktype** and **protocol** are used to
determine what protocol family, socket type and protocol should be used for
the lookup.  **family** can be any of AF_INET, AF_INET6, AF_UNIX and
AF_UNSPEC. **socktype** can be SOCK_STREAM, SOCK_DGRAM or 0. Specifying 0
indicates that any type can be used. **protocol** specifies a protocol such as
IPPROTO_TCP, IPPROTO_UDP or IPPORTO_SCTP. If set to 0 than any protocol can be
used. **res** points at a pointer to hold the start of a **BIO_ADDRINFO**
chain.

For the family **AF_UNIX**, BIO_lookup_ex() will ignore the **service**
parameter and expects the **host** parameter to hold the path to the socket file.

BIO_lookup() does the same as BIO_lookup_ex() but does not provide the ability
to select based on the protocol (any protocol may be returned).

BIO_ADDRINFO_family() returns the family of the given
**BIO_ADDRINFO**.  The result will be one of the constants
AF_INET, AF_INET6 and AF_UNIX.

BIO_ADDRINFO_socktype() returns the socket type of the given
**BIO_ADDRINFO**.  The result will be one of the constants
SOCK_STREAM and SOCK_DGRAM.

BIO_ADDRINFO_protocol() returns the protocol id of the given
**BIO_ADDRINFO**.  The result will be one of the constants
IPPROTO_TCP and IPPROTO_UDP.

BIO_ADDRINFO_address() returns the underlying **BIO_ADDR**
of the given **BIO_ADDRINFO**.

BIO_ADDRINFO_next() returns the next **BIO_ADDRINFO** in the chain
from the given one.

BIO_ADDRINFO_free() frees the chain of **BIO_ADDRINFO** starting
with the given one. If the argument is NULL, nothing is done.

## RETURN VALUES


BIO_lookup_ex() and BIO_lookup() return 1 on success and 0 when an error
occurred, and will leave an error indication on the OpenSSL error stack in that
case.

All other functions described here return 0 or **NULL** when the
information they should return isn't available.

## NOTES


The BIO_lookup_ex() implementation uses the platform provided getaddrinfo()
function. On Linux it is known that specifying 0 for the protocol will not
return any SCTP based addresses when calling getaddrinfo(). Therefore, if an SCTP
address is required then the **protocol** parameter to BIO_lookup_ex() should be
explicitly set to IPPROTO_SCTP. The same may be true on other platforms.

## HISTORY


The BIO_lookup_ex() function was added in OpenSSL 1.1.1.

## COPYRIGHT


Copyright 2016-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BIO_ADDRINFO.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_ADDRINFO.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BIO_ADDRINFO.pod`；SHA-256：`2087a04da545b3b702f22785b67ba4184662211c7b9035dcdc2ee53759282389`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
