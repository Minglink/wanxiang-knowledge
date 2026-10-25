---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bio-f-md",
  "title": "OpenSSL：密码数据流 · BIO_f_md（man3）",
  "type": "note",
  "tags": [
    "BIO",
    "输入输出",
    "缓冲区",
    "openssl",
    "BIO_f_md"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "75e5402ecd439b2db4b9e7a3d82cd555e92d3586b2036c4f49fb076f32122af4",
  "generatedHash": "e8d4667bf6dd79edb0944baa9fd2a74649c1cd48b87134b946c7c69290f91610",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码数据流：BIO_f_md, BIO_set_md, BIO_get_md, BIO_get_md_ctx - message digest BIO filter",
  "l1": "BIO_f_md() returns the message digest BIO method. This is a filter BIO that digests any data passed through it. It is a BIO wrapper for the digest routines EVP_DigestInit(), EVP_DigestUpdate() and EVP_DigestFinal(). Any data written or read through a digest BIO using BIO_read_ex() and BIO_write_ex() is digested. BIO_gets(), if its **size** parameter is large enough finishes the digest calculation and returns the digest value. BIO_puts() is not supported. BIO_reset() reinitialises a digest BIO. BIO_set_md() sets the message digest of BIO **b** to **md**: this must be called to initialize a digest BIO before any data is passed through it. It is a BIO_ctrl() macro. BIO_get_md() places a pointer to the digest BIOs digest method in **mdp**. It is a BIO_ctrl() macro. BIO_get_md_ctx() returns the digest BIOs context into **mdcp**.",
  "questions": [
    "BIO_f_md 如何用于密码数据流？",
    "BIO_f_md 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bio-f-md",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_f_md.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码数据流 · BIO_f_md（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码数据流。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BIO_f_md, BIO_set_md, BIO_get_md, BIO_get_md_ctx - message digest BIO filter

## 技术正文

## NAME


BIO_f_md, BIO_set_md, BIO_get_md, BIO_get_md_ctx - message digest BIO filter

## SYNOPSIS



```c
#include <openssl/bio.h>
#include <openssl/evp.h>

const BIO_METHOD *BIO_f_md(void);
int BIO_set_md(BIO *b, EVP_MD *md);
int BIO_get_md(BIO *b, EVP_MD **mdp);
int BIO_get_md_ctx(BIO *b, EVP_MD_CTX **mdcp);

```

## DESCRIPTION


BIO_f_md() returns the message digest BIO method. This is a filter
BIO that digests any data passed through it.  It is a BIO wrapper
for the digest routines EVP_DigestInit(), EVP_DigestUpdate()
and EVP_DigestFinal().

Any data written or read through a digest BIO using BIO_read_ex() and
BIO_write_ex() is digested.

BIO_gets(), if its **size** parameter is large enough finishes the
digest calculation and returns the digest value. BIO_puts() is
not supported.

BIO_reset() reinitialises a digest BIO.

BIO_set_md() sets the message digest of BIO **b** to **md**: this
must be called to initialize a digest BIO before any data is
passed through it. It is a BIO_ctrl() macro.

BIO_get_md() places a pointer to the digest BIOs digest method
in **mdp**.  It is a BIO_ctrl() macro.

BIO_get_md_ctx() returns the digest BIOs context into **mdcp**.

## NOTES


The context returned by BIO_get_md_ctx() can be used in calls
to EVP_DigestFinal() and also the signature routines EVP_SignFinal()
and EVP_VerifyFinal().

The context returned by BIO_get_md_ctx() is an internal context
structure. Changes made to this context will affect the digest
BIO itself and the context pointer will become invalid when the digest
BIO is freed.

After the digest has been retrieved from a digest BIO it must be
reinitialized by calling BIO_reset(), or BIO_set_md() before any more
data is passed through it.

If an application needs to call BIO_gets() or BIO_puts() through
a chain containing digest BIOs then this can be done by prepending
a buffering BIO.

Calling BIO_get_md_ctx() will return the context and initialize the BIO
state. This allows applications to initialize the context externally
if the standard calls such as BIO_set_md() are not sufficiently flexible.

## RETURN VALUES


BIO_f_md() returns the digest BIO method.

BIO_set_md(), BIO_get_md() and BIO_md_ctx() return 1 for success and
<=0 for failure.

## EXAMPLES


The following example creates a BIO chain containing an SHA1 and MD5
digest BIO and passes the string "Hello World" through it. Error
checking has been omitted for clarity.

```c
BIO *bio, *mdtmp;
char message[] = "Hello World";

bio = BIO_new(BIO_s_null());
mdtmp = BIO_new(BIO_f_md());
BIO_set_md(mdtmp, EVP_sha1());
/*
 * For BIO_push() we want to append the sink BIO and keep a note of
 * the start of the chain.
 */
bio = BIO_push(mdtmp, bio);
mdtmp = BIO_new(BIO_f_md());
BIO_set_md(mdtmp, EVP_md5());
bio = BIO_push(mdtmp, bio);
/* Note: mdtmp can now be discarded */
BIO_write(bio, message, strlen(message));

```

The next example digests data by reading through a chain instead:

```c
BIO *bio, *mdtmp;
char buf[1024];
int rdlen;

bio = BIO_new_file(file, "rb");
mdtmp = BIO_new(BIO_f_md());
BIO_set_md(mdtmp, EVP_sha1());
bio = BIO_push(mdtmp, bio);
mdtmp = BIO_new(BIO_f_md());
BIO_set_md(mdtmp, EVP_md5());
bio = BIO_push(mdtmp, bio);
do {
    rdlen = BIO_read(bio, buf, sizeof(buf));
    /* Might want to do something with the data here */
} while (rdlen > 0);

```

This next example retrieves the message digests from a BIO chain and
outputs them. This could be used with the examples above.

```c
BIO *mdtmp;
unsigned char mdbuf[EVP_MAX_MD_SIZE];
int mdlen;
int i;

mdtmp = bio;   /* Assume bio has previously been set up */
do {
    EVP_MD *md;

    mdtmp = BIO_find_type(mdtmp, BIO_TYPE_MD);
    if (!mdtmp)
        break;
    BIO_get_md(mdtmp, &md);
    printf("%s digest", OBJ_nid2sn(EVP_MD_get_type(md)));
    mdlen = BIO_gets(mdtmp, mdbuf, EVP_MAX_MD_SIZE);
    for (i = 0; i < mdlen; i++) printf(":%02X", mdbuf[i]);
    printf("\n");
    mdtmp = BIO_next(mdtmp);
} while (mdtmp);

BIO_free_all(bio);

```

## BUGS


The lack of support for BIO_puts() and the non standard behaviour of
BIO_gets() could be regarded as anomalous. It could be argued that BIO_gets()
and BIO_puts() should be passed to the next BIO in the chain and digest
the data passed through and that digests should be retrieved using a
separate BIO_ctrl() call.

## HISTORY


Before OpenSSL 1.0.0., the call to BIO_get_md_ctx() would only work if the
BIO was initialized first.

## COPYRIGHT


Copyright 2000-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BIO_f_md.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_f_md.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BIO_f_md.pod`；SHA-256：`75e5402ecd439b2db4b9e7a3d82cd555e92d3586b2036c4f49fb076f32122af4`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
