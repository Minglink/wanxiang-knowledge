---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bio-connect",
  "title": "OpenSSL：密码数据流 · BIO_connect（man3）",
  "type": "note",
  "tags": [
    "BIO",
    "输入输出",
    "缓冲区",
    "openssl",
    "BIO_connect"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "9f31606be3d544b9060775c0466b01e2ecfd03b91d3cbcae4bb791bfae2cd307",
  "generatedHash": "d99c21afcd5b6006c72e52eb4240ef26e0cdc3e0a8d607a53d916bdf4d5460f0",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码数据流：BIO_socket, BIO_bind, BIO_connect, BIO_listen, BIO_accept_ex, BIO_closesocket - BIO socket communication setup routines",
  "l1": "BIO_socket() creates a socket in the domain **domain**, of type **socktype** and **protocol**. Socket **options** are currently unused, but is present for future use. BIO_bind() binds the source address and service to a socket and may be useful before calling BIO_connect(). The options may include **BIO_SOCK_REUSEADDR**, which is described in /FLAGS below. BIO_connect() connects **sock** to the address and service given by **addr**. Connection **options** may be zero or any combination of **BIO_SOCK_KEEPALIVE**, **BIO_SOCK_NONBLOCK** and **BIO_SOCK_NODELAY**. The flags are described in /FLAGS below. BIO_listen() has **sock** start listening on the address and service given by **addr**. Connection **options** may be zero or any combination of **BIO_SOCK_KEEPALIVE**, **BIO_SOCK_NONBLOCK**, **BIO_SOCK_NODELAY**, **BIO_SOCK_REUSEADDR** and **",
  "questions": [
    "BIO_connect 如何用于密码数据流？",
    "BIO_connect 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bio-connect",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_connect.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码数据流 · BIO_connect（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码数据流。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BIO_socket, BIO_bind, BIO_connect, BIO_listen, BIO_accept_ex, BIO_closesocket - BIO
socket communication setup routines

## 技术正文

## NAME


BIO_socket, BIO_bind, BIO_connect, BIO_listen, BIO_accept_ex, BIO_closesocket - BIO
socket communication setup routines

## SYNOPSIS


```c
#include <openssl/bio.h>

int BIO_socket(int domain, int socktype, int protocol, int options);
int BIO_bind(int sock, const BIO_ADDR *addr, int options);
int BIO_connect(int sock, const BIO_ADDR *addr, int options);
int BIO_listen(int sock, const BIO_ADDR *addr, int options);
int BIO_accept_ex(int accept_sock, BIO_ADDR *peer, int options);
int BIO_closesocket(int sock);

```

## DESCRIPTION


BIO_socket() creates a socket in the domain **domain**, of type
**socktype** and **protocol**.  Socket **options** are currently unused,
but is present for future use.

BIO_bind() binds the source address and service to a socket and
may be useful before calling BIO_connect().  The options may include
**BIO_SOCK_REUSEADDR**, which is described in /FLAGS below.

BIO_connect() connects **sock** to the address and service given by
**addr**.  Connection **options** may be zero or any combination of
**BIO_SOCK_KEEPALIVE**, **BIO_SOCK_NONBLOCK** and **BIO_SOCK_NODELAY**.
The flags are described in /FLAGS below.

BIO_listen() has **sock** start listening on the address and service
given by **addr**.  Connection **options** may be zero or any
combination of **BIO_SOCK_KEEPALIVE**, **BIO_SOCK_NONBLOCK**,
**BIO_SOCK_NODELAY**, **BIO_SOCK_REUSEADDR** and **BIO_SOCK_V6_ONLY**.
The flags are described in /FLAGS below.

BIO_accept_ex() waits for an incoming connections on the given
socket **accept_sock**.  When it gets a connection, the address and
port of the peer gets stored in **peer** if that one is non-NULL.
Accept **options** may be zero or **BIO_SOCK_NONBLOCK**, and is applied
on the accepted socket.  The flags are described in /FLAGS below.

BIO_closesocket() closes **sock**.

## FLAGS



- BIO_SOCK_KEEPALIVE

Enables regular sending of keep-alive messages.

- BIO_SOCK_NONBLOCK

Sets the socket to nonblocking mode.

- BIO_SOCK_NODELAY

Corresponds to **TCP_NODELAY**, and disables the Nagle algorithm.  With
this set, any data will be sent as soon as possible instead of being
buffered until there's enough for the socket to send out in one go.

- BIO_SOCK_REUSEADDR

Try to reuse the address and port combination for a recently closed
port.

- BIO_SOCK_V6_ONLY

When creating an IPv6 socket, make it only listen for IPv6 addresses
and not IPv4 addresses mapped to IPv6.

- BIO_SOCK_TFO

Enables TCP Fast Open on the socket. Uses appropriate APIs on
supported operating systems, including Linux, macOS and FreeBSD. Can
be used with BIO_connect(), BIO_set_conn_mode(), BIO_set_bind_mode(),
and BIO_listen().
On Linux kernels before 4.14, use BIO_set_conn_address() to specify
the peer address before starting the TLS handshake.


These flags are bit flags, so they are to be combined with the
`|` operator, for example:

```c
BIO_connect(sock, addr, BIO_SOCK_KEEPALIVE | BIO_SOCK_NONBLOCK);

```

## RETURN VALUES


BIO_socket() returns the socket number on success or **INVALID_SOCKET**
(-1) on error.  When an error has occurred, the OpenSSL error stack
will hold the error data and errno has the system error.

BIO_bind(), BIO_connect() and BIO_listen() return 1 on success or 0 on error.
When an error has occurred, the OpenSSL error stack will hold the error
data and errno has the system error.

BIO_accept_ex() returns the accepted socket on success or
**INVALID_SOCKET** (-1) on error.  When an error has occurred, the
OpenSSL error stack will hold the error data and errno has the system
error.

## SEE ALSO


BIO_ADDR(3)

## HISTORY


BIO_gethostname(), BIO_get_port(), BIO_get_host_ip(),
BIO_get_accept_socket() and BIO_accept() were deprecated in OpenSSL 1.1.0.
Use the functions described above instead.

## COPYRIGHT


Copyright 2016-2022 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BIO_connect.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_connect.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BIO_connect.pod`；SHA-256：`9f31606be3d544b9060775c0466b01e2ecfd03b91d3cbcae4bb791bfae2cd307`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
