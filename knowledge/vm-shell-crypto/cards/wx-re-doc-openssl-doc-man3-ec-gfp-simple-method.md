---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ec-gfp-simple-method",
  "title": "OpenSSL：椭圆曲线 · EC_GFp_simple_method（man3）",
  "type": "note",
  "tags": [
    "椭圆曲线",
    "非对称密码",
    "公钥",
    "openssl",
    "EC_GFp_simple_method"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "d3d8c78adfa203a81f033618d70dc5d947d6f8b1ac727dc82bd45256416d7216",
  "generatedHash": "e9d3a1ff071a1ee87ac87ec23135dd0c64252336f9752357c20910926b2de22e",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "椭圆曲线：EC_GFp_simple_method, EC_GFp_mont_method, EC_GFp_nist_method, EC_GFp_nistp224_method, EC_GFp_nistp256_method, EC_GFp_nistp521_method, EC_GF2m_simple_method, EC_METHOD_get_field_type - Functions for obtaining EC_METHOD objects",
  "l1": "All const EC_METHOD *EC_GF* functions were deprecated in OpenSSL 3.0, since EC_METHOD is no longer a public concept. The Elliptic Curve library provides a number of different implementations through a single common interface. When constructing a curve using EC_GROUP_new (see EC_GROUP_new(3)) an implementation method must be provided. The functions described here all return a const pointer to an **EC_METHOD** structure that can be passed to EC_GROUP_NEW. It is important that the correct implementation type for the form of curve selected is used. For F2^m curves there is only one implementation choice, i.e. EC_GF2_simple_method. For Fp curves the lowest common denominator implementation is the EC_GFp_simple_method implementation. All other implementations are based on this one. EC_GFp_mont_method builds on EC_GFp_simple_method but adds the ",
  "questions": [
    "EC_GFp_simple_method 如何用于椭圆曲线？",
    "EC_GFp_simple_method 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ec-gfp-simple-method",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EC_GFp_simple_method.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：椭圆曲线 · EC_GFp_simple_method（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：椭圆曲线。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EC_GFp_simple_method, EC_GFp_mont_method, EC_GFp_nist_method, EC_GFp_nistp224_method, EC_GFp_nistp256_method, EC_GFp_nistp521_method, EC_GF2m_simple_method, EC_METHOD_get_field_type - Functions for obtaining EC_METHOD objects

## 技术正文

## NAME


EC_GFp_simple_method, EC_GFp_mont_method, EC_GFp_nist_method, EC_GFp_nistp224_method, EC_GFp_nistp256_method, EC_GFp_nistp521_method, EC_GF2m_simple_method, EC_METHOD_get_field_type - Functions for obtaining EC_METHOD objects

## SYNOPSIS


```c
#include <openssl/ec.h>

```

The following functions have been deprecated since OpenSSL 3.0, and can be
hidden entirely by defining **OPENSSL_API_COMPAT** with a suitable version value,
see openssl_user_macros(7):

```c
const EC_METHOD *EC_GFp_simple_method(void);
const EC_METHOD *EC_GFp_mont_method(void);
const EC_METHOD *EC_GFp_nist_method(void);
const EC_METHOD *EC_GFp_nistp224_method(void);
const EC_METHOD *EC_GFp_nistp256_method(void);
const EC_METHOD *EC_GFp_nistp521_method(void);

const EC_METHOD *EC_GF2m_simple_method(void);

int EC_METHOD_get_field_type(const EC_METHOD *meth);

```

## DESCRIPTION



All const EC_METHOD *EC_GF* functions were deprecated in OpenSSL 3.0, since
EC_METHOD is no longer a public concept.

The Elliptic Curve library provides a number of different implementations through a single common interface.
When constructing a curve using EC_GROUP_new (see EC_GROUP_new(3)) an
implementation method must be provided. The functions described here all return a const pointer to an
**EC_METHOD** structure that can be passed to EC_GROUP_NEW. It is important that the correct implementation
type for the form of curve selected is used.

For F2^m curves there is only one implementation choice, i.e. EC_GF2_simple_method.

For Fp curves the lowest common denominator implementation is the EC_GFp_simple_method implementation. All
other implementations are based on this one. EC_GFp_mont_method builds on EC_GFp_simple_method but adds the
use of montgomery multiplication (see BN_mod_mul_montgomery(3)). EC_GFp_nist_method
offers an implementation optimised for use with NIST recommended curves (NIST curves are available through
EC_GROUP_new_by_curve_name as described in EC_GROUP_new(3)).

The functions EC_GFp_nistp224_method, EC_GFp_nistp256_method and EC_GFp_nistp521_method offer 64 bit
optimised implementations for the NIST P224, P256 and P521 curves respectively. Note, however, that these
implementations are not available on all platforms.

EC_METHOD_get_field_type() was deprecated in OpenSSL 3.0.
Applications should use EC_GROUP_get_field_type() as a replacement (see EC_GROUP_copy(3)).

## RETURN VALUES


All EC_GFp* functions and EC_GF2m_simple_method always return a const pointer to an EC_METHOD structure.

EC_METHOD_get_field_type returns an integer that identifies the type of field the EC_METHOD structure supports.

## SEE ALSO


crypto(7), EC_GROUP_new(3), EC_GROUP_copy(3),
EC_POINT_new(3), EC_POINT_add(3), EC_KEY_new(3),
d2i_ECPKParameters(3),
BN_mod_mul_montgomery(3)

## HISTORY


EC_GFp_simple_method(), EC_GFp_mont_method(void),
EC_GFp_nist_method(), EC_GFp_nistp224_method(),
EC_GFp_nistp256_method(), EC_GFp_nistp521_method(),
EC_GF2m_simple_method(), and EC_METHOD_get_field_type()
were deprecated in OpenSSL 3.0.

## COPYRIGHT


Copyright 2013-2020 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EC_GFp_simple_method.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EC_GFp_simple_method.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EC_GFp_simple_method.pod`；SHA-256：`d3d8c78adfa203a81f033618d70dc5d947d6f8b1ac727dc82bd45256416d7216`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
