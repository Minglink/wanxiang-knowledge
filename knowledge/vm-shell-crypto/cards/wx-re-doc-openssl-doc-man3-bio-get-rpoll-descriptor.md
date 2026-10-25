---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bio-get-rpoll-descriptor",
  "title": "OpenSSL：密码数据流 · BIO_get_rpoll_descriptor（man3）",
  "type": "note",
  "tags": [
    "BIO",
    "输入输出",
    "缓冲区",
    "openssl",
    "BIO_get_rpoll_descriptor"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "bde9ab2af91d0998619db989d776f6d50c2444bbff08f7ed7cb3734c4147e3a7",
  "generatedHash": "d0c9ebb74ffad59a345f43d16b055e49b64bebc20f90b6631d7888d531c9eca1",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码数据流：BIO_get_rpoll_descriptor, BIO_get_wpoll_descriptor - obtain a structure which can be used to determine when a BIO object can next be read or written",
  "l1": "BIO_get_rpoll_descriptor() and BIO_get_wpoll_descriptor(), on success, fill `*desc` with a poll descriptor. A poll descriptor is a tagged union structure which represents some kind of OS or non-OS resource which can be used to synchronise on I/O availability events. BIO_get_rpoll_descriptor() outputs a descriptor which can be used to determine when the BIO can (potentially) next be read, and BIO_get_wpoll_descriptor() outputs a descriptor which can be used to determine when the BIO can (potentially) next be written. It is permissible for BIO_get_rpoll_descriptor() and BIO_get_wpoll_descriptor() to output the same descriptor. Poll descriptors can represent different kinds of information. A typical kind of resource which might be represented by a poll descriptor is an OS file descriptor which can be used with APIs such as select(). The kind",
  "questions": [
    "BIO_get_rpoll_descriptor 如何用于密码数据流？",
    "BIO_get_rpoll_descriptor 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bio-get-rpoll-descriptor",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_get_rpoll_descriptor.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码数据流 · BIO_get_rpoll_descriptor（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码数据流。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BIO_get_rpoll_descriptor, BIO_get_wpoll_descriptor - obtain a structure which
can be used to determine when a BIO object can next be read or written

## 技术正文

## NAME


BIO_get_rpoll_descriptor, BIO_get_wpoll_descriptor - obtain a structure which
can be used to determine when a BIO object can next be read or written

## SYNOPSIS


```c
#include <openssl/bio.h>

typedef struct bio_poll_descriptor_st {
    uint32_t type;
    union {
        int        fd;
        void       *custom;
        uintptr_t  custom_ui;
    } value;
} BIO_POLL_DESCRIPTOR;

int BIO_get_rpoll_descriptor(BIO *b, BIO_POLL_DESCRIPTOR *desc);
int BIO_get_wpoll_descriptor(BIO *b, BIO_POLL_DESCRIPTOR *desc);

```

## DESCRIPTION


BIO_get_rpoll_descriptor() and BIO_get_wpoll_descriptor(), on success, fill
`*desc` with a poll descriptor. A poll descriptor is a tagged union structure
which represents some kind of OS or non-OS resource which can be used to
synchronise on I/O availability events.

BIO_get_rpoll_descriptor() outputs a descriptor which can be used to determine
when the BIO can (potentially) next be read, and BIO_get_wpoll_descriptor()
outputs a descriptor which can be used to determine when the BIO can
(potentially) next be written.

It is permissible for BIO_get_rpoll_descriptor() and BIO_get_wpoll_descriptor()
to output the same descriptor.

Poll descriptors can represent different kinds of information. A typical kind of
resource which might be represented by a poll descriptor is an OS file
descriptor which can be used with APIs such as select().

The kinds of poll descriptor defined by OpenSSL are:


- BIO_POLL_DESCRIPTOR_TYPE_NONE

Represents the absence of a valid poll descriptor. It may be used by
BIO_get_rpoll_descriptor() or BIO_get_wpoll_descriptor() to indicate that the
BIO is not pollable for readability or writeability respectively.

For this type, no field within the `value` field of the **BIO_POLL_DESCRIPTOR**
is valid.

- BIO_POLL_DESCRIPTOR_TYPE_SOCK_FD

The poll descriptor represents an OS socket resource. The field `value.fd`
in the **BIO_POLL_DESCRIPTOR** is valid if it is not set to -1.

The resource is whatever kind of handle is used by a given OS to represent
sockets, which may vary by OS. For example, on Windows, the value is a **SOCKET**
for use with the Winsock API. On POSIX-like platforms, it is a file descriptor.

Where a poll descriptor of this type is output by BIO_get_rpoll_descriptor(), it
should be polled for readability to determine when the BIO might next be able to
successfully complete a BIO_read() operation; likewise, where a poll descriptor
of this type is output by BIO_get_wpoll_descriptor(), it should be polled for
writeability to determine when the BIO might next be able to successfully
complete a BIO_write() operation.

- BIO_POLL_DESCRIPTOR_CUSTOM_START

Type values beginning with this value (inclusive) are reserved for application
allocation for custom poll descriptor types. Any of the definitions in the union
field `value` can be used by the application arbitrarily as opaque values.


Because poll descriptors are a tagged union structure, they can represent
different kinds of information. New types of poll descriptor may be defined,
including by applications, according to their needs.

## RETURN VALUES


The functions BIO_get_rpoll_descriptor() and BIO_get_wpoll_descriptor() return 1
on success and 0 on failure.

These functions are permitted to succeed and initialise `*desc` with a poll
descriptor of type **BIO_POLL_DESCRIPTOR_TYPE_NONE** to indicate that the BIO is
not pollable for readability or writeability respectively.

## SEE ALSO


SSL_handle_events(3), SSL_get_event_timeout(3), SSL_get_rpoll_descriptor(3),
SSL_get_wpoll_descriptor(3), bio(7)

## HISTORY


The BIO_get_rpoll_descriptor() and BIO_get_wpoll_descriptor() functions were
added in OpenSSL 3.2.

## COPYRIGHT


Copyright 2022-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BIO_get_rpoll_descriptor.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_get_rpoll_descriptor.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BIO_get_rpoll_descriptor.pod`；SHA-256：`bde9ab2af91d0998619db989d776f6d50c2444bbff08f7ed7cb3734c4147e3a7`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
