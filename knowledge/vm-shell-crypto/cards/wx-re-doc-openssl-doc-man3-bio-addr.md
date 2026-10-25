---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bio-addr",
  "title": "OpenSSL：密码数据流 · BIO_ADDR（man3）",
  "type": "note",
  "tags": [
    "BIO",
    "输入输出",
    "缓冲区",
    "openssl",
    "BIO_ADDR"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "fd78c25638846e4bc4c74e8a93d1a6fae3d05e92cd4da84f6226a725d587de76",
  "generatedHash": "071360a8fbb125e6cbe4280d77e802ee3116424604faf4a1e39ffe113ac2facc",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码数据流：BIO_ADDR, BIO_ADDR_new, BIO_ADDR_copy, BIO_ADDR_dup, BIO_ADDR_clear, BIO_ADDR_free, BIO_ADDR_rawmake, BIO_ADDR_family, BIO_ADDR_rawaddress, BIO_ADDR_rawport, BIO_ADDR_hostname_string, BIO_ADDR_service_string, BIO_ADDR_path_string - BIO_ADDR routines",
  "l1": "The **BIO_ADDR** type is a wrapper around all types of socket addresses that OpenSSL deals with, currently transparently supporting AF_INET, AF_INET6 and AF_UNIX according to what's available on the platform at hand. BIO_ADDR_new() creates a new unfilled **BIO_ADDR**, to be used with routines that will fill it with information, such as BIO_accept_ex(). BIO_ADDR_copy() copies the contents of **src** into **dst**. Neither **src** or **dst** can be NULL. BIO_ADDR_dup() creates a new **BIO_ADDR**, with a copy of the address data in **ap**. BIO_ADDR_free() frees a **BIO_ADDR** created with BIO_ADDR_new() or BIO_ADDR_dup(). If the argument is NULL, nothing is done. BIO_ADDR_clear() clears any data held within the provided **BIO_ADDR** and sets it back to an uninitialised state. BIO_ADDR_rawmake() takes a protocol **family**, a byte array of siz",
  "questions": [
    "BIO_ADDR 如何用于密码数据流？",
    "BIO_ADDR 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bio-addr",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_ADDR.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码数据流 · BIO_ADDR（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码数据流。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BIO_ADDR, BIO_ADDR_new, BIO_ADDR_copy, BIO_ADDR_dup, BIO_ADDR_clear,
BIO_ADDR_free, BIO_ADDR_rawmake,
BIO_ADDR_family, BIO_ADDR_rawaddress, BIO_ADDR_rawport,
BIO_ADDR_hostname_string, BIO_ADDR_service_string,
BIO_ADDR_path_string - BIO_ADDR routines

## 技术正文

## NAME


BIO_ADDR, BIO_ADDR_new, BIO_ADDR_copy, BIO_ADDR_dup, BIO_ADDR_clear,
BIO_ADDR_free, BIO_ADDR_rawmake,
BIO_ADDR_family, BIO_ADDR_rawaddress, BIO_ADDR_rawport,
BIO_ADDR_hostname_string, BIO_ADDR_service_string,
BIO_ADDR_path_string - BIO_ADDR routines

## SYNOPSIS


```c
#include <sys/types.h>
#include <openssl/bio.h>

typedef union bio_addr_st BIO_ADDR;

BIO_ADDR *BIO_ADDR_new(void);
int BIO_ADDR_copy(BIO_ADDR *dst, const BIO_ADDR *src);
BIO_ADDR *BIO_ADDR_dup(const BIO_ADDR *ap);
void BIO_ADDR_free(BIO_ADDR *ap);
void BIO_ADDR_clear(BIO_ADDR *ap);
int BIO_ADDR_rawmake(BIO_ADDR *ap, int family,
                     const void *where, size_t wherelen, unsigned short port);
int BIO_ADDR_family(const BIO_ADDR *ap);
int BIO_ADDR_rawaddress(const BIO_ADDR *ap, void *p, size_t *l);
unsigned short BIO_ADDR_rawport(const BIO_ADDR *ap);
char *BIO_ADDR_hostname_string(const BIO_ADDR *ap, int numeric);
char *BIO_ADDR_service_string(const BIO_ADDR *ap, int numeric);
char *BIO_ADDR_path_string(const BIO_ADDR *ap);

```

## DESCRIPTION


The **BIO_ADDR** type is a wrapper around all types of socket
addresses that OpenSSL deals with, currently transparently
supporting AF_INET, AF_INET6 and AF_UNIX according to what's
available on the platform at hand.

BIO_ADDR_new() creates a new unfilled **BIO_ADDR**, to be used
with routines that will fill it with information, such as
BIO_accept_ex().

BIO_ADDR_copy() copies the contents of **src** into **dst**. Neither **src** or
**dst** can be NULL.

BIO_ADDR_dup() creates a new **BIO_ADDR**, with a copy of the
address data in **ap**.

BIO_ADDR_free() frees a **BIO_ADDR** created with BIO_ADDR_new()
or BIO_ADDR_dup(). If the argument is NULL, nothing is done.

BIO_ADDR_clear() clears any data held within the provided **BIO_ADDR** and sets
it back to an uninitialised state.

BIO_ADDR_rawmake() takes a protocol **family**, a byte array of
size **wherelen** with an address in network byte order pointed at
by **where** and a port number in network byte order in **port** (except
for the **AF_UNIX** protocol family, where **port** is meaningless and
therefore ignored) and populates the given **BIO_ADDR** with them.
In case this creates a **AF_UNIX** **BIO_ADDR**, **wherelen** is expected
to be the length of the path string (not including the terminating
NUL, such as the result of a call to strlen()).
Read on about the addresses in /RAW ADDRESSES below.

BIO_ADDR_family() returns the protocol family of the given
**BIO_ADDR**.  The possible non-error results are one of the
constants AF_INET, AF_INET6 and AF_UNIX. It will also return AF_UNSPEC if the
BIO_ADDR has not been initialised.

BIO_ADDR_rawaddress() will write the raw address of the given
**BIO_ADDR** in the area pointed at by **p** if **p** is non-NULL,
and will set ***l** to be the amount of bytes the raw address
takes up if **l** is non-NULL.
A technique to only find out the size of the address is a call
with **p** set to **NULL**.  The raw address will be in network byte
order, most significant byte first.
In case this is a **AF_UNIX** **BIO_ADDR**, **l** gets the length of the
path string (not including the terminating NUL, such as the result of
a call to strlen()).
Read on about the addresses in /RAW ADDRESSES below.

BIO_ADDR_rawport() returns the raw port of the given **BIO_ADDR**.
The raw port will be in network byte order.

BIO_ADDR_hostname_string() returns a character string with the
hostname of the given **BIO_ADDR**.  If **numeric** is 1, the string
will contain the numerical form of the address.  This only works for
**BIO_ADDR** of the protocol families AF_INET and AF_INET6.  The
returned string has been allocated on the heap and must be freed
with OPENSSL_free().

BIO_ADDR_service_string() returns a character string with the
service name of the port of the given **BIO_ADDR**.  If **numeric**
is 1, the string will contain the port number.  This only works
for **BIO_ADDR** of the protocol families AF_INET and AF_INET6.  The
returned string has been allocated on the heap and must be freed
with OPENSSL_free().

BIO_ADDR_path_string() returns a character string with the path
of the given **BIO_ADDR**.  This only works for **BIO_ADDR** of the
protocol family AF_UNIX.  The returned string has been allocated
on the heap and must be freed with OPENSSL_free().

## RAW ADDRESSES


Both BIO_ADDR_rawmake() and BIO_ADDR_rawaddress() take a pointer to a
network byte order address of a specific site.  Internally, those are
treated as a pointer to **struct in_addr** (for **AF_INET**), B<struct
in6_addr> (for **AF_INET6**) or **char *** (for **AF_UNIX**), all
depending on the protocol family the address is for.

## RETURN VALUES


The string producing functions BIO_ADDR_hostname_string(),
BIO_ADDR_service_string() and BIO_ADDR_path_string() will
return **NULL** on error and leave an error indication on the
OpenSSL error stack.

BIO_ADDR_copy() returns 1 on success or 0 on error.

All other functions described here return 0 or **NULL** when the
information they should return isn't available.

## SEE ALSO


BIO_connect(3), BIO_s_connect(3)

## HISTORY


BIO_ADDR_copy() and BIO_ADDR_dup() were added in OpenSSL 3.2.

## COPYRIGHT


Copyright 2016-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BIO_ADDR.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_ADDR.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BIO_ADDR.pod`；SHA-256：`fd78c25638846e4bc4c74e8a93d1a6fae3d05e92cd4da84f6226a725d587de76`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
