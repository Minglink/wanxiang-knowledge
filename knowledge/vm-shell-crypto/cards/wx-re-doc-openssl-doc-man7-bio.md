---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-bio",
  "title": "OpenSSL：密码实现与接口 · bio（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "bio"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "be660cb019c27e0b8453f1be1476beb62c0af63348de2c293a85f028a6698914",
  "generatedHash": "ff04166f29a4e34ff5be7a48ca65584e32acec5aabdb7fed072f4c49e9dbdaae",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：bio - Basic I/O abstraction",
  "l1": "A BIO is an I/O abstraction, it hides many of the underlying I/O details from an application. If an application uses a BIO for its I/O it can transparently handle SSL connections, unencrypted network connections and file I/O. There are two types of BIO, a source/sink BIO and a filter BIO. As its name implies a source/sink BIO is a source and/or sink of data, examples include a socket BIO and a file BIO. A filter BIO takes data from one BIO and passes it through to another, or the application. The data may be left unmodified (for example a message digest BIO) or translated (for example an encryption BIO). The effect of a filter BIO may change according to the I/O operation it is performing: for example an encryption BIO will encrypt data if it is being written to and decrypt data if it is being read from. BIOs can be joined together to for",
  "questions": [
    "bio 如何用于密码实现与接口？",
    "bio 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-bio",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/bio.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · bio（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

bio - Basic I/O abstraction

## 技术正文

## NAME


bio - Basic I/O abstraction

## SYNOPSIS



```c
#include <openssl/bio.h>

```

## DESCRIPTION


A BIO is an I/O abstraction, it hides many of the underlying I/O
details from an application. If an application uses a BIO for its
I/O it can transparently handle SSL connections, unencrypted network
connections and file I/O.

There are two types of BIO, a source/sink BIO and a filter BIO.

As its name implies a source/sink BIO is a source and/or sink of data,
examples include a socket BIO and a file BIO.

A filter BIO takes data from one BIO and passes it through to
another, or the application. The data may be left unmodified (for
example a message digest BIO) or translated (for example an
encryption BIO). The effect of a filter BIO may change according
to the I/O operation it is performing: for example an encryption
BIO will encrypt data if it is being written to and decrypt data
if it is being read from.

BIOs can be joined together to form a chain (a single BIO is a chain
with one component). A chain normally consists of one source/sink
BIO and one or more filter BIOs. Data read from or written to the
first BIO then traverses the chain to the end (normally a source/sink
BIO).

Some BIOs (such as memory BIOs) can be used immediately after calling
BIO_new(). Others (such as file BIOs) need some additional initialization,
and frequently a utility function exists to create and initialize such BIOs.

If BIO_free() is called on a BIO chain it will only free one BIO resulting
in a memory leak.

Calling BIO_free_all() on a single BIO has the same effect as calling
BIO_free() on it other than the discarded return value.

Normally the `type` argument is supplied by a function which returns a
pointer to a BIO_METHOD. There is a naming convention for such functions:
a source/sink BIO typically starts with `BIO_s_` and
a filter BIO with `BIO_f_`.

### TCP Fast Open


TCP Fast Open (RFC7413), abbreviated "TFO", is supported by the BIO
interface since OpenSSL 3.2. TFO is supported in the following operating systems:


- * Linux kernel 3.13 and later, where TFO is enabled by default.

- * Linux kernel 4.11 and later, using TCP_FASTOPEN_CONNECT.

- * FreeBSD 10.3 to 11.4, supports server TFO only.

- * FreeBSD 12.0 and later, supports both client and server TFO.

- * macOS 10.14 and later.


Each operating system has a slightly different API for TFO. Please
refer to the operating systems' API documentation when using
sockets directly.

## EXAMPLES


Create a memory BIO:

```c
BIO *mem = BIO_new(BIO_s_mem());

```

## SEE ALSO


BIO_ctrl(3),
BIO_f_base64(3), BIO_f_buffer(3),
BIO_f_cipher(3), BIO_f_md(3),
BIO_f_null(3), BIO_f_ssl(3),
BIO_f_readbuffer(3),
BIO_find_type(3),
BIO_get_conn_mode(3),
BIO_new(3),
BIO_new_bio_pair(3),
BIO_push(3), BIO_read_ex(3),
BIO_s_accept(3), BIO_s_bio(3),
BIO_s_connect(3), BIO_s_fd(3),
BIO_s_file(3), BIO_s_mem(3),
BIO_s_null(3), BIO_s_socket(3),
BIO_set_callback(3),
BIO_set_conn_mode(3),
BIO_set_tfo(3),
BIO_set_tfo_accept(3),
BIO_should_retry(3)

## COPYRIGHT


Copyright 2000-2022 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/bio.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/bio.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/bio.pod`；SHA-256：`be660cb019c27e0b8453f1be1476beb62c0af63348de2c293a85f028a6698914`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
