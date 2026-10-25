---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bio-meth-new",
  "title": "OpenSSL：密码数据流 · BIO_meth_new（man3）",
  "type": "note",
  "tags": [
    "BIO",
    "输入输出",
    "缓冲区",
    "openssl",
    "BIO_meth_new"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "80e509fbd56e35a1668913a235ba1b47ab7733acea0f81159ec34d2f9eca9c8e",
  "generatedHash": "1080a304ea94d414c8f9abb9535d16f2ae565ecc9e82eb7382ff20a802ac8a45",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码数据流：BIO_get_new_index, BIO_meth_new, BIO_meth_free, BIO_meth_get_read_ex, BIO_meth_set_read_ex, BIO_meth_get_write_ex, BIO_meth_set_write_ex, BIO_meth_get_write, BIO_meth_set_write, BIO_meth_get_read, BIO_meth_set_read, BIO_meth_get_puts, BIO_meth_set_puts, BIO_meth_get_gets, BIO_meth_set_gets, BIO_meth",
  "l1": "The **BIO_METHOD** type is a structure used for the implementation of new BIO types. It provides a set of functions used by OpenSSL for the implementation of the various BIO capabilities. See the bio(7) page for more information. BIO_meth_new() creates a new **BIO_METHOD** structure that contains a type identifier `type` and a string that represents its **name**. **type** can be set to either **BIO_TYPE_NONE** or via BIO_get_new_index() if a unique type is required for searching (See BIO_find_type(3)) Note that BIO_get_new_index() can only be used 127 times before it returns an error. The set of standard OpenSSL provided BIO types is provided in F<< <openssl/bio.h> >>. Some examples include **BIO_TYPE_BUFFER** and **BIO_TYPE_CIPHER**. Filter BIOs should have a type which have the \"filter\" bit set (**BIO_TYPE_FILTER**). Source/sink BIOs sh",
  "questions": [
    "BIO_meth_new 如何用于密码数据流？",
    "BIO_meth_new 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bio-meth-new",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_meth_new.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码数据流 · BIO_meth_new（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码数据流。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BIO_get_new_index,
BIO_meth_new, BIO_meth_free, BIO_meth_get_read_ex, BIO_meth_set_read_ex,
BIO_meth_get_write_ex, BIO_meth_set_write_ex, BIO_meth_get_write,
BIO_meth_set_write, BIO_meth_get_read, BIO_meth_set_read, BIO_meth_get_puts,
BIO_meth_set_puts, BIO_meth_get_gets, BIO_meth_set_gets, BIO_meth_get_ctrl,
BIO_meth_set_ctrl, BIO_meth_get_create, BIO_meth_set_create,
BIO_meth_get_destroy, BIO_meth_set_destroy, BIO_meth_get_callback_ctrl,
BIO_meth_set_callback_ctrl, BIO_meth_set_sendmmsg, BIO_meth_get_sendmmsg,
BIO_meth_set_recvmmsg, BIO_meth_get_recvmmsg - Routines to build up BIO methods

## 技术正文

## NAME


BIO_get_new_index,
BIO_meth_new, BIO_meth_free, BIO_meth_get_read_ex, BIO_meth_set_read_ex,
BIO_meth_get_write_ex, BIO_meth_set_write_ex, BIO_meth_get_write,
BIO_meth_set_write, BIO_meth_get_read, BIO_meth_set_read, BIO_meth_get_puts,
BIO_meth_set_puts, BIO_meth_get_gets, BIO_meth_set_gets, BIO_meth_get_ctrl,
BIO_meth_set_ctrl, BIO_meth_get_create, BIO_meth_set_create,
BIO_meth_get_destroy, BIO_meth_set_destroy, BIO_meth_get_callback_ctrl,
BIO_meth_set_callback_ctrl, BIO_meth_set_sendmmsg, BIO_meth_get_sendmmsg,
BIO_meth_set_recvmmsg, BIO_meth_get_recvmmsg - Routines to build up BIO methods

## SYNOPSIS


```c
#include <openssl/bio.h>

int BIO_get_new_index(void);

BIO_METHOD *BIO_meth_new(int type, const char *name);

void BIO_meth_free(BIO_METHOD *biom);

int BIO_meth_set_write_ex(BIO_METHOD *biom,
                          int (*bwrite)(BIO *, const char *, size_t, size_t *));
int BIO_meth_set_write(BIO_METHOD *biom,
                       int (*write)(BIO *, const char *, int));

int BIO_meth_set_read_ex(BIO_METHOD *biom,
                         int (*bread)(BIO *, char *, size_t, size_t *));
int BIO_meth_set_read(BIO_METHOD *biom, int (*read)(BIO *, char *, int));

int BIO_meth_set_puts(BIO_METHOD *biom, int (*puts)(BIO *, const char *));
int BIO_meth_set_gets(BIO_METHOD *biom,
                      int (*gets)(BIO *, char *, int));

int BIO_meth_set_ctrl(BIO_METHOD *biom,
                      long (*ctrl)(BIO *, int, long, void *));

int BIO_meth_set_create(BIO_METHOD *biom, int (*create)(BIO *));
int BIO_meth_set_destroy(BIO_METHOD *biom, int (*destroy)(BIO *));

int BIO_meth_set_callback_ctrl(BIO_METHOD *biom,
                               long (*callback_ctrl)(BIO *, int, BIO_info_cb *));

int BIO_meth_set_sendmmsg(BIO_METHOD *biom,
                          ossl_ssize_t (*f) (BIO *, BIO_MSG *, size_t,
                                             size_t, uint64_t));
int BIO_meth_set_recvmmsg(BIO_METHOD *biom,
                          ossl_ssize_t (*f) (BIO *, BIO_MSG *, size_t,
                                             size_t, uint64_t));

```

The following functions have been deprecated since OpenSSL 3.5:

```c
int (*BIO_meth_get_write_ex(const BIO_METHOD *biom))(BIO *, const char *, size_t,
                                               size_t *);
int (*BIO_meth_get_write(const BIO_METHOD *biom))(BIO *, const char *, int);

int (*BIO_meth_get_read_ex(const BIO_METHOD *biom))(BIO *, char *, size_t, size_t *);
int (*BIO_meth_get_read(const BIO_METHOD *biom))(BIO *, char *, int);

int (*BIO_meth_get_puts(const BIO_METHOD *biom))(BIO *, const char *);
int (*BIO_meth_get_gets(const BIO_METHOD *biom))(BIO *, char *, int);

long (*BIO_meth_get_ctrl(const BIO_METHOD *biom))(BIO *, int, long, void *);

int (*BIO_meth_get_create(const BIO_METHOD *bion))(BIO *);
int (*BIO_meth_get_destroy(const BIO_METHOD *biom))(BIO *);

long (*BIO_meth_get_callback_ctrl(const BIO_METHOD *biom))(BIO *, int, BIO_info_cb *);

ossl_ssize_t (*BIO_meth_get_sendmmsg(const BIO_METHOD *biom))(BIO *,
                                                              BIO_MSG *,
                                                              size_t,
                                                              size_t,
                                                              uint64_t);
ossl_ssize_t (*BIO_meth_get_recvmmsg(const BIO_METHOD *biom))(BIO *,
                                                              BIO_MSG *,
                                                              size_t,
                                                              size_t,
                                                              uint64_t);

```

## DESCRIPTION


The **BIO_METHOD** type is a structure used for the implementation of new BIO
types. It provides a set of functions used by OpenSSL for the implementation
of the various BIO capabilities. See the bio(7) page for more information.

BIO_meth_new() creates a new **BIO_METHOD** structure that contains a type
identifier `type` and a string that represents its **name**.
**type** can be set to either **BIO_TYPE_NONE** or via BIO_get_new_index() if
a unique type is required for searching (See BIO_find_type(3))

Note that BIO_get_new_index() can only be used 127 times before it returns an
error.

The set of
standard OpenSSL provided BIO types is provided in F<< <openssl/bio.h> >>.
Some examples include **BIO_TYPE_BUFFER** and **BIO_TYPE_CIPHER**. Filter BIOs
should have a type which have the "filter" bit set (**BIO_TYPE_FILTER**).
Source/sink BIOs should have the "source/sink" bit set (**BIO_TYPE_SOURCE_SINK**).
File descriptor based BIOs (e.g. socket, fd, connect, accept etc) should
additionally have the "descriptor" bit set (**BIO_TYPE_DESCRIPTOR**). See the
BIO_find_type(3) page for more information.

BIO_meth_free() destroys a **BIO_METHOD** structure and frees up any memory
associated with it. If the argument is NULL, nothing is done.

BIO_meth_get_write_ex() and BIO_meth_set_write_ex() get and set the function
used for writing arbitrary length data to the BIO respectively. This function
will be called in response to the application calling BIO_write_ex() or
BIO_write(). The parameters for the function have the same meaning as for
BIO_write_ex(). Older code may call BIO_meth_get_write() and
BIO_meth_set_write() instead. Applications should not call both
BIO_meth_set_write_ex() and BIO_meth_set_write() or call BIO_meth_get_write()
when the function was set with BIO_meth_set_write_ex().

BIO_meth_get_read_ex() and BIO_meth_set_read_ex() get and set the function used
for reading arbitrary length data from the BIO respectively. This function will
be called in response to the application calling BIO_read_ex() or BIO_read().
The parameters for the function have the same meaning as for BIO_read_ex().
Older code may call BIO_meth_get_read() and BIO_meth_set_read() instead.
Applications should not call both BIO_meth_set_read_ex() and BIO_meth_set_read()
or call BIO_meth_get_read() when the function was set with
BIO_meth_set_read_ex().

BIO_meth_get_puts() and BIO_meth_set_puts() get and set the function used for
writing a NULL terminated string to the BIO respectively. This function will be
called in response to the application calling BIO_puts(). The parameters for
the function have the same meaning as for BIO_puts().

BIO_meth_get_gets() and BIO_meth_set_gets() get and set the function typically
used for reading a line of data from the BIO respectively (see the BIO_gets(3)
page for more information). This function will be called in response to the
application calling BIO_gets(). The parameters for the function have the same
meaning as for BIO_gets().

BIO_meth_get_ctrl() and BIO_meth_set_ctrl() get and set the function used for
processing ctrl messages in the BIO respectively. See the BIO_ctrl(3) page for
more information. This function will be called in response to the application
calling BIO_ctrl(). The parameters for the function have the same meaning as for
BIO_ctrl().

BIO_meth_get_create() and BIO_meth_set_create() get and set the function used
for creating a new instance of the BIO respectively. This function will be
called in response to the application calling BIO_new() and passing
in a pointer to the current BIO_METHOD. The BIO_new() function will allocate the
memory for the new BIO, and a pointer to this newly allocated structure will
be passed as a parameter to the function. If a create function is set,
BIO_new() will not mark the BIO as initialised on allocation.
BIO_set_init(3) must then be called either by the create function, or later,
by a BIO ctrl function, once BIO initialisation is complete.

BIO_meth_get_destroy() and BIO_meth_set_destroy() get and set the function used
for destroying an instance of a BIO respectively. This function will be
called in response to the application calling BIO_free(). A pointer to the BIO
to be destroyed is passed as a parameter. The destroy function should be used
for BIO specific clean up. The memory for the BIO itself should not be freed by
this function.

BIO_meth_get_callback_ctrl() and BIO_meth_set_callback_ctrl() get and set the
function used for processing callback ctrl messages in the BIO respectively. See
the BIO_callback_ctrl(3) page for more information. This function will be called
in response to the application calling BIO_callback_ctrl(). The parameters for
the function have the same meaning as for BIO_callback_ctrl().

BIO_meth_get_sendmmsg(), BIO_meth_set_sendmmsg(), BIO_meth_get_recvmmsg() and
BIO_meth_set_recvmmsg() get and set the functions used for handling
BIO_sendmmsg() and BIO_recvmmsg() calls respectively. See BIO_sendmmsg(3) for
more information.

## RETURN VALUES


BIO_get_new_index() returns the new BIO type value or -1 if an error occurred.

BIO_meth_new(int type, const char *name) returns a valid **BIO_METHOD** or NULL
if an error occurred.

The **BIO_meth_set** functions return 1 on success or 0 on error.

The **BIO_meth_get** functions return the corresponding function pointers.

## BUGS


It is not safe to use `BIO_meth_get_` functions to reuse the **BIO**
implementation of **BIO**s implemented by OpenSSL itself with
application-implemented **BIO**s. Instead either the applications ought to
implement these functions themselves or they should implement a filter BIO.

For more details please see https://github.com/openssl/openssl/issues/26047.

## SEE ALSO


bio(7), BIO_find_type(3), BIO_ctrl(3), BIO_read_ex(3), BIO_new(3)

## HISTORY


The functions BIO_meth_get_sendmmsg(), BIO_meth_set_sendmmsg(),
BIO_meth_get_recvmmsg() and BIO_meth_set_recvmmsg() were added in OpenSSL 3.2.

All the other functions described here were added in OpenSSL 1.1.0.

The functions BIO_meth_get_read_ex(), BIO_meth_get_write_ex(),
BIO_meth_get_write(), BIO_meth_get_read(), BIO_meth_get_puts(),
BIO_meth_get_gets(), BIO_meth_get_ctrl(), BIO_meth_get_create(),
BIO_meth_get_destroy(), BIO_meth_get_callback_ctrl(),
BIO_meth_get_sendmmsg() and BIO_meth_get_recvmmsg() are deprecated since
OpenSSL 3.5.

## COPYRIGHT


Copyright 2016-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BIO_meth_new.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_meth_new.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BIO_meth_new.pod`；SHA-256：`80e509fbd56e35a1668913a235ba1b47ab7733acea0f81159ec34d2f9eca9c8e`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
