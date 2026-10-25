---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bio-s-fd",
  "title": "OpenSSL：密码数据流 · BIO_s_fd（man3）",
  "type": "note",
  "tags": [
    "BIO",
    "输入输出",
    "缓冲区",
    "openssl",
    "BIO_s_fd"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "66314189df20db4cd8cb35d354163c9a41a8e970bc0071f273fcc37ed79361d1",
  "generatedHash": "b4ffd4bd1608af2b16d176e9799b5bf2a0a405818dabc5486bd7845f4cd55a1c",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码数据流：BIO_s_fd, BIO_set_fd, BIO_get_fd, BIO_new_fd - file descriptor BIO",
  "l1": "BIO_s_fd() returns the file descriptor BIO method. This is a wrapper round the platforms file descriptor routines such as read() and write(). BIO_read_ex() and BIO_write_ex() read or write the underlying descriptor. BIO_puts() is supported but BIO_gets() is not. If the close flag is set then close() is called on the underlying file descriptor when the BIO is freed. BIO_reset() attempts to change the file pointer to the start of file such as by using **lseek(fd, 0, 0)**. BIO_seek() sets the file pointer to position **ofs** from start of file such as by using **lseek(fd, ofs, 0)**. BIO_tell() returns the current file position such as by calling **lseek(fd, 0, 1)**. BIO_set_fd() sets the file descriptor of BIO **b** to **fd** and the close flag to **c**. BIO_get_fd() places the file descriptor of BIO **b** in **c** if it is not NULL. It also",
  "questions": [
    "BIO_s_fd 如何用于密码数据流？",
    "BIO_s_fd 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bio-s-fd",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_s_fd.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码数据流 · BIO_s_fd（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码数据流。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BIO_s_fd, BIO_set_fd, BIO_get_fd, BIO_new_fd - file descriptor BIO

## 技术正文

## NAME


BIO_s_fd, BIO_set_fd, BIO_get_fd, BIO_new_fd - file descriptor BIO

## SYNOPSIS


```c
#include <openssl/bio.h>

const BIO_METHOD *BIO_s_fd(void);

int BIO_set_fd(BIO *b, int fd, int c);
int BIO_get_fd(BIO *b, int *c);

BIO *BIO_new_fd(int fd, int close_flag);

```

## DESCRIPTION


BIO_s_fd() returns the file descriptor BIO method. This is a wrapper
round the platforms file descriptor routines such as read() and write().

BIO_read_ex() and BIO_write_ex() read or write the underlying descriptor.
BIO_puts() is supported but BIO_gets() is not.

If the close flag is set then close() is called on the underlying
file descriptor when the BIO is freed.

BIO_reset() attempts to change the file pointer to the start of file
such as by using **lseek(fd, 0, 0)**.

BIO_seek() sets the file pointer to position **ofs** from start of file
such as by using **lseek(fd, ofs, 0)**.

BIO_tell() returns the current file position such as by calling
**lseek(fd, 0, 1)**.

BIO_set_fd() sets the file descriptor of BIO **b** to **fd** and the close
flag to **c**.

BIO_get_fd() places the file descriptor of BIO **b** in **c** if it is not NULL.
It also returns the file descriptor.

BIO_new_fd() returns a file descriptor BIO using **fd** and **close_flag**.

## NOTES


The behaviour of BIO_read_ex() and BIO_write_ex() depends on the behavior of the
platforms read() and write() calls on the descriptor. If the underlying
file descriptor is in a non blocking mode then the BIO will behave in the
manner described in the BIO_read_ex(3) and BIO_should_retry(3)
manual pages.

File descriptor BIOs should not be used for socket I/O. Use socket BIOs
instead.

BIO_set_fd() and BIO_get_fd() are implemented as macros.

## RETURN VALUES


BIO_s_fd() returns the file descriptor BIO method.

BIO_set_fd() returns 1 on success or <=0 for failure.

BIO_get_fd() returns the file descriptor or -1 if the BIO has not
been initialized. It also returns zero and negative values if other error occurs.

BIO_new_fd() returns the newly allocated BIO or NULL is an error
occurred.

## EXAMPLES


This is a file descriptor BIO version of "Hello World":

```c
BIO *out;

out = BIO_new_fd(fileno(stdout), BIO_NOCLOSE);
BIO_printf(out, "Hello World\n");
BIO_free(out);

```

## SEE ALSO


BIO_seek(3), BIO_tell(3),
BIO_reset(3), BIO_read_ex(3),
BIO_write_ex(3), BIO_puts(3),
BIO_gets(3), BIO_printf(3),
BIO_set_close(3), BIO_get_close(3)

## COPYRIGHT


Copyright 2000-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BIO_s_fd.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_s_fd.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BIO_s_fd.pod`；SHA-256：`66314189df20db4cd8cb35d354163c9a41a8e970bc0071f273fcc37ed79361d1`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
