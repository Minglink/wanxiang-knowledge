---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-cms-compress",
  "title": "OpenSSL：密码实现与接口 · CMS_compress（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "CMS_compress"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "6cae57c634fcb6adce2e97fb0d59174c4ad3d7a955bc59b8875357511a160a65",
  "generatedHash": "4f3f226f9e60eb359f4fb692c54e44e05e10d92de13d3101cd799c69425ab3e9",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：CMS_compress - create a CMS CompressedData structure",
  "l1": "CMS_compress() creates and returns a CMS CompressedData structure. **comp_nid** is the compression algorithm to use or **NID_undef** to use the default algorithm (zlib compression). **in** is the content to be compressed. **flags** is an optional set of flags. The only currently supported compression algorithm is zlib using the NID NID_zlib_compression. If zlib support is not compiled into OpenSSL then CMS_compress() will return an error. If the **CMS_TEXT** flag is set MIME headers for type **text/plain** are prepended to the data. Normally the supplied content is translated into MIME canonical format (as required by the S/MIME specifications) if **CMS_BINARY** is set no translation occurs. This option should be used if the supplied data is in binary format otherwise the translation will corrupt it. If **CMS_BINARY** is set then **CMS_TE",
  "questions": [
    "CMS_compress 如何用于密码实现与接口？",
    "CMS_compress 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-cms-compress",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/CMS_compress.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · CMS_compress（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

CMS_compress - create a CMS CompressedData structure

## 技术正文

## NAME


CMS_compress - create a CMS CompressedData structure

## SYNOPSIS


```c
#include <openssl/cms.h>

CMS_ContentInfo *CMS_compress(BIO *in, int comp_nid, unsigned int flags);

```

## DESCRIPTION


CMS_compress() creates and returns a CMS CompressedData structure. **comp_nid**
is the compression algorithm to use or **NID_undef** to use the default
algorithm (zlib compression). **in** is the content to be compressed.
**flags** is an optional set of flags.

The only currently supported compression algorithm is zlib using the NID
NID_zlib_compression.

If zlib support is not compiled into OpenSSL then CMS_compress() will return
an error.

If the **CMS_TEXT** flag is set MIME headers for type **text/plain** are
prepended to the data.

Normally the supplied content is translated into MIME canonical format (as
required by the S/MIME specifications) if **CMS_BINARY** is set no translation
occurs. This option should be used if the supplied data is in binary format
otherwise the translation will corrupt it. If **CMS_BINARY** is set then
**CMS_TEXT** is ignored.

If the **CMS_STREAM** flag is set a partial **CMS_ContentInfo** structure is
returned suitable for streaming I/O: no data is read from the BIO **in**.

The compressed data is included in the CMS_ContentInfo structure, unless
**CMS_DETACHED** is set in which case it is omitted. This is rarely used in
practice and is not supported by SMIME_write_CMS().

If the flag **CMS_STREAM** is set the returned **CMS_ContentInfo** structure is
**not** complete and outputting its contents via a function that does not
properly finalize the **CMS_ContentInfo** structure will give unpredictable
results.

Several functions including SMIME_write_CMS(), i2d_CMS_bio_stream(),
PEM_write_bio_CMS_stream() finalize the structure. Alternatively finalization
can be performed by obtaining the streaming ASN1 **BIO** directly using
BIO_new_CMS().

Additional compression parameters such as the zlib compression level cannot
currently be set.

## RETURN VALUES


CMS_compress() returns either a CMS_ContentInfo structure or NULL if an error
occurred. The error can be obtained from ERR_get_error(3).

## SEE ALSO


ERR_get_error(3), CMS_uncompress(3)

## HISTORY


The **CMS_STREAM** flag was added in OpenSSL 1.0.0.

## COPYRIGHT


Copyright 2008-2016 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/CMS_compress.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/CMS_compress.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/CMS_compress.pod`；SHA-256：`6cae57c634fcb6adce2e97fb0d59174c4ad3d7a955bc59b8875357511a160a65`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
