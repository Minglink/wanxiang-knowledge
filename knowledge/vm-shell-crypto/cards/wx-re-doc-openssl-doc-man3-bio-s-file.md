---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bio-s-file",
  "title": "OpenSSL：密码数据流 · BIO_s_file（man3）",
  "type": "note",
  "tags": [
    "BIO",
    "输入输出",
    "缓冲区",
    "openssl",
    "BIO_s_file"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "462c1ca61010b9cf3c16de4ac3e82034908563101c65a59e8cb02669b2259126",
  "generatedHash": "fb61f375e6b92782f1de4b85889c8b0de96b6ab2474492abea81ca64e6330c36",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码数据流：BIO_s_file, BIO_new_file, BIO_new_fp, BIO_set_fp, BIO_get_fp, BIO_read_filename, BIO_write_filename, BIO_append_filename, BIO_rw_filename - FILE bio",
  "l1": "BIO_s_file() returns the BIO file method. As its name implies it is a wrapper round the stdio FILE structure and it is a source/sink BIO. Calls to BIO_read_ex() and BIO_write_ex() read and write data to the underlying stream. BIO_gets() and BIO_puts() are supported on file BIOs. BIO_flush() on a file BIO calls the fflush() function on the wrapped stream. BIO_reset() attempts to change the file pointer to the start of file using fseek(stream, 0, 0). BIO_seek() sets the file pointer to position **ofs** from start of file using fseek(stream, ofs, 0). BIO_eof() calls feof(). Setting the BIO_CLOSE flag calls fclose() on the stream when the BIO is freed. BIO_new_file() creates a new file BIO with mode **mode** the meaning of **mode** is the same as the stdio function fopen(). The BIO_CLOSE flag is set on the returned BIO. BIO_new_fp() creates a",
  "questions": [
    "BIO_s_file 如何用于密码数据流？",
    "BIO_s_file 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bio-s-file",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_s_file.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码数据流 · BIO_s_file（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码数据流。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BIO_s_file, BIO_new_file, BIO_new_fp, BIO_set_fp, BIO_get_fp,
BIO_read_filename, BIO_write_filename, BIO_append_filename,
BIO_rw_filename - FILE bio

## 技术正文

## NAME


BIO_s_file, BIO_new_file, BIO_new_fp, BIO_set_fp, BIO_get_fp,
BIO_read_filename, BIO_write_filename, BIO_append_filename,
BIO_rw_filename - FILE bio

## SYNOPSIS


```c
#include <openssl/bio.h>

const BIO_METHOD *BIO_s_file(void);
BIO *BIO_new_file(const char *filename, const char *mode);
BIO *BIO_new_fp(FILE *stream, int flags);

BIO_set_fp(BIO *b, FILE *fp, int flags);
BIO_get_fp(BIO *b, FILE **fpp);

int BIO_read_filename(BIO *b, char *name);
int BIO_write_filename(BIO *b, char *name);
int BIO_append_filename(BIO *b, char *name);
int BIO_rw_filename(BIO *b, char *name);

```

## DESCRIPTION


BIO_s_file() returns the BIO file method. As its name implies it
is a wrapper round the stdio FILE structure and it is a
source/sink BIO.

Calls to BIO_read_ex() and BIO_write_ex() read and write data to the
underlying stream. BIO_gets() and BIO_puts() are supported on file BIOs.

BIO_flush() on a file BIO calls the fflush() function on the wrapped
stream.

BIO_reset() attempts to change the file pointer to the start of file
using fseek(stream, 0, 0).

BIO_seek() sets the file pointer to position **ofs** from start of file
using fseek(stream, ofs, 0).

BIO_eof() calls feof().

Setting the BIO_CLOSE flag calls fclose() on the stream when the BIO
is freed.

BIO_new_file() creates a new file BIO with mode **mode** the meaning
of **mode** is the same as the stdio function fopen(). The BIO_CLOSE
flag is set on the returned BIO.

BIO_new_fp() creates a file BIO wrapping **stream**. Flags can be:
BIO_CLOSE, BIO_NOCLOSE (the close flag) BIO_FP_TEXT (sets the underlying
stream to text mode, default is binary: this only has any effect under
Win32).

BIO_set_fp() sets the fp of a file BIO to **fp**. **flags** has the same
meaning as in BIO_new_fp(), it is a macro.

BIO_get_fp() retrieves the fp of a file BIO, it is a macro.

BIO_seek() is a macro that sets the position pointer to **offset** bytes
from the start of file.

BIO_tell() returns the value of the position pointer.

BIO_read_filename(), BIO_write_filename(), BIO_append_filename() and
BIO_rw_filename() set the file BIO **b** to use file **name** for
reading, writing, append or read write respectively.

## NOTES


When wrapping stdout, stdin or stderr the underlying stream should not
normally be closed so the BIO_NOCLOSE flag should be set.

Because the file BIO calls the underlying stdio functions any quirks
in stdio behaviour will be mirrored by the corresponding BIO.

On Windows BIO_new_files reserves for the filename argument to be
UTF-8 encoded. In other words if you have to make it work in multi-
lingual environment, encode filenames in UTF-8.

## RETURN VALUES


BIO_s_file() returns the file BIO method.

BIO_new_file() and BIO_new_fp() return a file BIO or NULL if an error
occurred.

BIO_set_fp() and BIO_get_fp() return 1 for success or <=0 for failure
(although the current implementation never return 0).

BIO_seek() returns 0 for success or negative values for failure.

BIO_tell() returns the current file position or negative values for failure.

BIO_read_filename(), BIO_write_filename(), BIO_append_filename() and
BIO_rw_filename() return 1 for success or <=0 for failure. An error is also
returned if the file does not exist.

## EXAMPLES


File BIO "hello world":

```c
BIO *bio_out;

bio_out = BIO_new_fp(stdout, BIO_NOCLOSE);
BIO_printf(bio_out, "Hello World\n");

```

Alternative technique:

```c
BIO *bio_out;

bio_out = BIO_new(BIO_s_file());
if (bio_out == NULL)
    /* Error */
if (BIO_set_fp(bio_out, stdout, BIO_NOCLOSE) <= 0)
    /* Error */
BIO_printf(bio_out, "Hello World\n");

```

Write to a file:

```c
BIO *out;

out = BIO_new_file("filename.txt", "w");
if (!out)
    /* Error */
BIO_printf(out, "Hello World\n");
BIO_free(out);

```

Alternative technique:

```c
BIO *out;

out = BIO_new(BIO_s_file());
if (out == NULL)
    /* Error */
if (BIO_write_filename(out, "filename.txt") <= 0)
    /* Error */
BIO_printf(out, "Hello World\n");
BIO_free(out);

```

## BUGS


BIO_reset() and BIO_seek() are implemented using fseek() on the underlying
stream. The return value for fseek() is 0 for success or -1 if an error
occurred this differs from other types of BIO which will typically return
1 for success and a non positive value if an error occurred.

## SEE ALSO


BIO_seek(3), BIO_tell(3),
BIO_reset(3), BIO_flush(3),
BIO_read_ex(3),
BIO_write_ex(3), BIO_puts(3),
BIO_gets(3), BIO_printf(3),
BIO_set_close(3), BIO_get_close(3)

## COPYRIGHT


Copyright 2000-2020 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BIO_s_file.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_s_file.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BIO_s_file.pod`；SHA-256：`462c1ca61010b9cf3c16de4ac3e82034908563101c65a59e8cb02669b2259126`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
