---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ec-key-get-enc-flags",
  "title": "OpenSSL：椭圆曲线 · EC_KEY_get_enc_flags（man3）",
  "type": "note",
  "tags": [
    "椭圆曲线",
    "非对称密码",
    "公钥",
    "openssl",
    "EC_KEY_get_enc_flags"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "81a780c86162c89aeb3e3f77d770f928bcacf7d6faca1311e7a634ebd904d901",
  "generatedHash": "1d2086a3bccd2d7b31842056dc890a281a3efd487521660d4bdce417d87fd12b",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "椭圆曲线：EC_KEY_get_enc_flags, EC_KEY_set_enc_flags - Get and set flags for encoding EC_KEY structures",
  "l1": "The format of the external representation of the public key written by i2d_ECPrivateKey() (such as whether it is stored in a compressed form or not) is described by the point_conversion_form. See EC_GROUP_copy(3) for a description of point_conversion_form. When reading a private key encoded without an associated public key (e.g. if EC_PKEY_NO_PUBKEY has been used - see below), then d2i_ECPrivateKey() generates the missing public key automatically. Private keys encoded without parameters (e.g. if EC_PKEY_NO_PARAMETERS has been used - see below) cannot be loaded using d2i_ECPrivateKey(). The functions EC_KEY_get_enc_flags() and EC_KEY_set_enc_flags() get and set the value of the encoding flags for the **key**. There are two encoding flags currently defined - EC_PKEY_NO_PARAMETERS and EC_PKEY_NO_PUBKEY. These flags define the behaviour of ho",
  "questions": [
    "EC_KEY_get_enc_flags 如何用于椭圆曲线？",
    "EC_KEY_get_enc_flags 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ec-key-get-enc-flags",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EC_KEY_get_enc_flags.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：椭圆曲线 · EC_KEY_get_enc_flags（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：椭圆曲线。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EC_KEY_get_enc_flags, EC_KEY_set_enc_flags
- Get and set flags for encoding EC_KEY structures

## 技术正文

## NAME


EC_KEY_get_enc_flags, EC_KEY_set_enc_flags
- Get and set flags for encoding EC_KEY structures

## SYNOPSIS


```c
#include <openssl/ec.h>

unsigned int EC_KEY_get_enc_flags(const EC_KEY *key);
void EC_KEY_set_enc_flags(EC_KEY *eckey, unsigned int flags);

```

## DESCRIPTION


The format of the external representation of the public key written by
i2d_ECPrivateKey() (such as whether it is stored in a compressed form or not) is
described by the point_conversion_form. See EC_GROUP_copy(3)
for a description of point_conversion_form.

When reading a private key encoded without an associated public key (e.g. if
EC_PKEY_NO_PUBKEY has been used - see below), then d2i_ECPrivateKey() generates
the missing public key automatically. Private keys encoded without parameters
(e.g. if EC_PKEY_NO_PARAMETERS has been used - see below) cannot be loaded using
d2i_ECPrivateKey().

The functions EC_KEY_get_enc_flags() and EC_KEY_set_enc_flags() get and set the
value of the encoding flags for the **key**. There are two encoding flags
currently defined - EC_PKEY_NO_PARAMETERS and EC_PKEY_NO_PUBKEY.  These flags
define the behaviour of how the  **key** is converted into ASN1 in a call to
i2d_ECPrivateKey(). If EC_PKEY_NO_PARAMETERS is set then the public parameters for
the curve are not encoded along with the private key. If EC_PKEY_NO_PUBKEY is
set then the public key is not encoded along with the private key.

## RETURN VALUES


EC_KEY_get_enc_flags() returns the value of the current encoding flags for the
EC_KEY.

## SEE ALSO


crypto(7), EC_GROUP_new(3),
EC_GROUP_copy(3), EC_POINT_new(3),
EC_POINT_add(3),
EC_GFp_simple_method(3),
d2i_ECPKParameters(3),
d2i_ECPrivateKey(3)

## COPYRIGHT


Copyright 2015-2017 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EC_KEY_get_enc_flags.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EC_KEY_get_enc_flags.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EC_KEY_get_enc_flags.pod`；SHA-256：`81a780c86162c89aeb3e3f77d770f928bcacf7d6faca1311e7a634ebd904d901`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
