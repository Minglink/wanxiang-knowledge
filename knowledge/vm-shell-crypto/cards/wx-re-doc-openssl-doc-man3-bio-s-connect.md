---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bio-s-connect",
  "title": "OpenSSL：密码数据流 · BIO_s_connect（man3）",
  "type": "note",
  "tags": [
    "BIO",
    "输入输出",
    "缓冲区",
    "openssl",
    "BIO_s_connect"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "a6b242f331427e7e0eceddd025ba5abaad3045fe85de40ad9c26c5a65f2b80db",
  "generatedHash": "f2961335ba81613362fe2531dba9b56f2a3ea18bda81764d6d40798ba518ccbc",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码数据流：BIO_s_connect, BIO_new_connect, BIO_set_conn_hostname, BIO_set_conn_port, BIO_set_conn_address, BIO_set_conn_ip_family, BIO_get_conn_hostname, BIO_get_conn_port, BIO_get_conn_address, BIO_get_conn_ip_family, BIO_set_nbio, BIO_set_sock_type, BIO_get_sock_type, BIO_get0_dgram_bio, BIO_do_connect - con",
  "l1": "BIO_s_connect() returns the connect BIO method. This is a wrapper round the platform's TCP/IP socket connection routines. Using connect BIOs, TCP/IP connections can be made and data transferred using only BIO routines. In this way any platform specific operations are hidden by the BIO abstraction. Read and write operations on a connect BIO will perform I/O on the underlying connection. If no connection is established and the port and hostname (see below) is set up properly then a connection is established first. Connect BIOs support BIO_puts() and BIO_gets(). If the close flag is set on a connect BIO then any active connection is shutdown and the socket closed when the BIO is freed. Calling BIO_reset() on a connect BIO will close any active connection and reset the BIO into a state where it can connect to the same host again. BIO_new_conn",
  "questions": [
    "BIO_s_connect 如何用于密码数据流？",
    "BIO_s_connect 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bio-s-connect",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_s_connect.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码数据流 · BIO_s_connect（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码数据流。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BIO_s_connect, BIO_new_connect,
BIO_set_conn_hostname, BIO_set_conn_port,
BIO_set_conn_address, BIO_set_conn_ip_family,
BIO_get_conn_hostname, BIO_get_conn_port,
BIO_get_conn_address, BIO_get_conn_ip_family,
BIO_set_nbio, BIO_set_sock_type, BIO_get_sock_type, BIO_get0_dgram_bio,
BIO_do_connect - connect BIO

## 技术正文

## NAME


BIO_s_connect, BIO_new_connect,
BIO_set_conn_hostname, BIO_set_conn_port,
BIO_set_conn_address, BIO_set_conn_ip_family,
BIO_get_conn_hostname, BIO_get_conn_port,
BIO_get_conn_address, BIO_get_conn_ip_family,
BIO_set_nbio, BIO_set_sock_type, BIO_get_sock_type, BIO_get0_dgram_bio,
BIO_do_connect - connect BIO

## SYNOPSIS


```c
#include <openssl/bio.h>

const BIO_METHOD *BIO_s_connect(void);

BIO *BIO_new_connect(const char *name);

long BIO_set_conn_hostname(BIO *b, char *name);
long BIO_set_conn_port(BIO *b, char *port);
long BIO_set_conn_address(BIO *b, BIO_ADDR *addr);
long BIO_set_conn_ip_family(BIO *b, long family);
const char *BIO_get_conn_hostname(BIO *b);
const char *BIO_get_conn_port(BIO *b);
const BIO_ADDR *BIO_get_conn_address(BIO *b);
const long BIO_get_conn_ip_family(BIO *b);

long BIO_set_nbio(BIO *b, long n);

int BIO_set_sock_type(BIO *b, int sock_type);
int BIO_get_sock_type(BIO *b);
int BIO_get0_dgram_bio(BIO *B, BIO **dgram_bio);

long BIO_do_connect(BIO *b);

```

## DESCRIPTION


BIO_s_connect() returns the connect BIO method. This is a wrapper
round the platform's TCP/IP socket connection routines.

Using connect BIOs, TCP/IP connections can be made and data
transferred using only BIO routines. In this way any platform
specific operations are hidden by the BIO abstraction.

Read and write operations on a connect BIO will perform I/O
on the underlying connection. If no connection is established
and the port and hostname (see below) is set up properly then
a connection is established first.

Connect BIOs support BIO_puts() and BIO_gets().

If the close flag is set on a connect BIO then any active
connection is shutdown and the socket closed when the BIO
is freed.

Calling BIO_reset() on a connect BIO will close any active
connection and reset the BIO into a state where it can connect
to the same host again.

BIO_new_connect() combines BIO_new() and BIO_set_conn_hostname() into
a single call: that is it creates a new connect BIO with hostname **name**.

BIO_set_conn_hostname() uses the string **name** to set the hostname.
The hostname can be an IP address; if the address is an IPv6 one, it
must be enclosed in brackets `[` and `]`.
The hostname can also include the port in the form hostname:port;
see BIO_parse_hostserv(3) and BIO_set_conn_port() for details.

BIO_set_conn_port() sets the port to **port**. **port** can be the
numerical form or a service string such as "http", which
will be mapped to a port number using the system function getservbyname().

BIO_set_conn_address() sets the address and port information using
a BIO_ADDR(3ssl).

BIO_set_conn_ip_family() sets the IP family.

BIO_get_conn_hostname() returns the hostname of the connect BIO or
NULL if the BIO is initialized but no hostname is set.
This return value is an internal pointer which should not be modified.

BIO_get_conn_port() returns the port as a string.
This return value is an internal pointer which should not be modified.

BIO_get_conn_address() returns the address information as a BIO_ADDR.
This return value is an internal pointer which should not be modified.

BIO_get_conn_ip_family() returns the IP family of the connect BIO.

BIO_set_nbio() sets the non blocking I/O flag to **n**. If **n** is
zero then blocking I/O is set. If **n** is 1 then non blocking I/O
is set. Blocking I/O is the default. The call to BIO_set_nbio()
should be made before the connection is established because
non blocking I/O is set during the connect process.

BIO_do_connect() attempts to connect the supplied BIO.
This performs an SSL/TLS handshake as far as supported by the BIO.
For non-SSL BIOs the connection is done typically at TCP level.
If domain name resolution yields multiple IP addresses all of them are tried
after connect() failures.
The function returns 1 if the connection was established successfully.
A zero or negative value is returned if the connection could not be established.
The call BIO_should_retry() should be used for non blocking connect BIOs
to determine if the call should be retried.
If a connection has already been established this call has no effect.

BIO_set_sock_type() can be used to set a socket type value as would be passed in
a call to socket(2). The only currently supported values are **SOCK_STREAM** (the
default) and **SOCK_DGRAM**. If **SOCK_DGRAM** is configured, the connection
created is a UDP datagram socket handled via BIO_s_datagram(3).
I/O calls such as BIO_read(3) and BIO_write(3) are forwarded transparently
to an internal BIO_s_datagram(3) instance. The created BIO_s_datagram(3)
instance can be retrieved using BIO_get0_dgram_bio() if desired, which writes
a pointer to the BIO_s_datagram(3) instance to `*dgram_bio`. The lifetime
of the internal BIO_s_datagram(3) is managed by BIO_s_connect() and does not
need to be freed by the caller.

BIO_get_sock_type() retrieves the value set using BIO_set_sock_type().

## NOTES


If blocking I/O is set then a non positive return value from any
I/O call is caused by an error condition, although a zero return
will normally mean that the connection was closed.

If the port name is supplied as part of the hostname then this will
override any value set with BIO_set_conn_port(). This may be undesirable
if the application does not wish to allow connection to arbitrary
ports. This can be avoided by checking for the presence of the ':'
character in the passed hostname and either indicating an error or
truncating the string at that point.

The values returned by BIO_get_conn_hostname(), BIO_get_conn_address(),
and BIO_get_conn_port() are updated when a connection attempt is made.
Before any connection attempt the values returned are those set by the
application itself.

Applications do not have to call BIO_do_connect() but may wish to do
so to separate the connection process from other I/O processing.

If non blocking I/O is set then retries will be requested as appropriate.

It addition to BIO_should_read() and BIO_should_write() it is also
possible for BIO_should_io_special() to be true during the initial
connection process with the reason BIO_RR_CONNECT. If this is returned
then this is an indication that a connection attempt would block,
the application should then take appropriate action to wait until
the underlying socket has connected and retry the call.

BIO_set_conn_hostname(), BIO_set_conn_port(), BIO_get_conn_hostname(),
BIO_set_conn_address(), BIO_get_conn_port(), BIO_get_conn_address(),
BIO_set_conn_ip_family(), BIO_get_conn_ip_family(),
BIO_set_nbio(), and BIO_do_connect() are macros.

## RETURN VALUES


BIO_s_connect() returns the connect BIO method.

BIO_set_conn_address(), BIO_set_conn_port(), and BIO_set_conn_ip_family()
return 1 or <=0 if an error occurs.

BIO_set_conn_hostname() returns 1 on success and <=0 on failure.

BIO_get_conn_address() returns the address information or NULL if none
was set.

BIO_get_conn_hostname() returns the connected hostname or NULL if
none was set.

BIO_get_conn_ip_family() returns the address family or -1 if none was set.

BIO_get_conn_port() returns a string representing the connected
port or NULL if not set.

BIO_set_nbio() returns 1 or <=0 if an error occurs.

BIO_do_connect() returns 1 if the connection was successfully
established and <=0 if the connection failed.

BIO_set_sock_type() returns 1 on success or 0 on failure.

BIO_get_sock_type() returns a socket type or 0 if the call is not supported.

BIO_get0_dgram_bio() returns 1 on success or 0 on failure.

## EXAMPLES


This is example connects to a webserver on the local host and attempts
to retrieve a page and copy the result to standard output.


```c
BIO *cbio, *out;
int len;
char tmpbuf[1024];

cbio = BIO_new_connect("localhost:http");
out = BIO_new_fp(stdout, BIO_NOCLOSE);
if (BIO_do_connect(cbio) <= 0) {
    fprintf(stderr, "Error connecting to server\n");
    ERR_print_errors_fp(stderr);
    exit(1);
}
BIO_puts(cbio, "GET / HTTP/1.0\n\n");
for (;;) {
    len = BIO_read(cbio, tmpbuf, 1024);
    if (len <= 0)
        break;
    BIO_write(out, tmpbuf, len);
}
BIO_free(cbio);
BIO_free(out);


```

## SEE ALSO


BIO_ADDR(3), BIO_parse_hostserv(3)

## HISTORY


BIO_set_conn_int_port(), BIO_get_conn_int_port(), BIO_set_conn_ip(), and BIO_get_conn_ip()
were removed in OpenSSL 1.1.0.
Use BIO_set_conn_address() and BIO_get_conn_address() instead.

Connect BIOs support BIO_gets() since OpenSSL 3.2.

## COPYRIGHT


Copyright 2000-2023 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BIO_s_connect.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_s_connect.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BIO_s_connect.pod`；SHA-256：`a6b242f331427e7e0eceddd025ba5abaad3045fe85de40ad9c26c5a65f2b80db`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
