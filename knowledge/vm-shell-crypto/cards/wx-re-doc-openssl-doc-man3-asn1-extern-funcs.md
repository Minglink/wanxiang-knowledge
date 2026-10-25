---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-asn1-extern-funcs",
  "title": "OpenSSL：ASN.1 编码 · ASN1_EXTERN_FUNCS（man3）",
  "type": "note",
  "tags": [
    "ASN.1",
    "DER",
    "编码解析",
    "二进制格式",
    "openssl",
    "ASN1_EXTERN_FUNCS"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "5fed7bc0c9b4a4fee9b03fdc303412586ce8207791d58ee7de7f8e0c2662827a",
  "generatedHash": "a2c6524f700fd93ab40712b039040a563df5b883ed40a518515acbf1b0d6bb18",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "ASN.1 编码：ASN1_EXTERN_FUNCS, ASN1_ex_d2i, ASN1_ex_d2i_ex, ASN1_ex_i2d, ASN1_ex_new_func, ASN1_ex_new_ex_func, ASN1_ex_free_func, ASN1_ex_print_func, IMPLEMENT_EXTERN_ASN1 - ASN.1 external function support",
  "l1": "ASN.1 data structures templates are typically defined in OpenSSL using a series of macros such as ASN1_SEQUENCE(), ASN1_SEQUENCE_END() and so on. Instead templates can also be defined based entirely on external functions. These external functions are called to perform operations such as creating a new **ASN1_VALUE** or converting an **ASN1_VALUE** to or from DER encoding. The macro IMPLEMENT_EXTERN_ASN1() can be used to create such an externally defined structure. The name of the structure should be supplied in the `sname` parameter. The tag for the structure (e.g. typically **V_ASN1_SEQUENCE**) should be supplied in the `tag` parameter. Finally a pointer to an **ASN1_EXTERN_FUNCS** structure should be supplied in the `fptrs` parameter. The **ASN1_EXTERN_FUNCS** structure has the following entries. A pointer to arbitrary application speci",
  "questions": [
    "ASN1_EXTERN_FUNCS 如何用于ASN.1 编码？",
    "ASN1_EXTERN_FUNCS 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-asn1-extern-funcs",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/ASN1_EXTERN_FUNCS.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：ASN.1 编码 · ASN1_EXTERN_FUNCS（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：ASN.1 编码。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

ASN1_EXTERN_FUNCS, ASN1_ex_d2i, ASN1_ex_d2i_ex, ASN1_ex_i2d, ASN1_ex_new_func,
ASN1_ex_new_ex_func, ASN1_ex_free_func, ASN1_ex_print_func,
IMPLEMENT_EXTERN_ASN1
- ASN.1 external function support

## 技术正文

## NAME


ASN1_EXTERN_FUNCS, ASN1_ex_d2i, ASN1_ex_d2i_ex, ASN1_ex_i2d, ASN1_ex_new_func,
ASN1_ex_new_ex_func, ASN1_ex_free_func, ASN1_ex_print_func,
IMPLEMENT_EXTERN_ASN1
- ASN.1 external function support

## SYNOPSIS


```c
#include <openssl/asn1t.h>

typedef int ASN1_ex_d2i(ASN1_VALUE **pval, const unsigned char **in, long len,
                        const ASN1_ITEM *it, int tag, int aclass, char opt,
                        ASN1_TLC *ctx);
typedef int ASN1_ex_d2i_ex(ASN1_VALUE **pval, const unsigned char **in, long len,
                           const ASN1_ITEM *it, int tag, int aclass, char opt,
                           ASN1_TLC *ctx, OSSL_LIB_CTX *libctx,
                           const char *propq);
typedef int ASN1_ex_i2d(const ASN1_VALUE **pval, unsigned char **out,
                        const ASN1_ITEM *it, int tag, int aclass);
typedef int ASN1_ex_new_func(ASN1_VALUE **pval, const ASN1_ITEM *it);
typedef int ASN1_ex_new_ex_func(ASN1_VALUE **pval, const ASN1_ITEM *it,
                                OSSL_LIB_CTX *libctx, const char *propq);
typedef void ASN1_ex_free_func(ASN1_VALUE **pval, const ASN1_ITEM *it);
typedef int ASN1_ex_print_func(BIO *out, const ASN1_VALUE **pval,
                               int indent, const char *fname,
                               const ASN1_PCTX *pctx);

struct ASN1_EXTERN_FUNCS_st {
   void *app_data;
   ASN1_ex_new_func *asn1_ex_new;
   ASN1_ex_free_func *asn1_ex_free;
   ASN1_ex_free_func *asn1_ex_clear;
   ASN1_ex_d2i *asn1_ex_d2i;
   ASN1_ex_i2d *asn1_ex_i2d;
   ASN1_ex_print_func *asn1_ex_print;
   ASN1_ex_new_ex_func *asn1_ex_new_ex;
   ASN1_ex_d2i_ex *asn1_ex_d2i_ex;
};
typedef struct ASN1_EXTERN_FUNCS_st ASN1_EXTERN_FUNCS;

#define IMPLEMENT_EXTERN_ASN1(sname, tag, fptrs)

```

## DESCRIPTION


ASN.1 data structures templates are typically defined in OpenSSL using a series
of macros such as ASN1_SEQUENCE(), ASN1_SEQUENCE_END() and so on. Instead
templates can also be defined based entirely on external functions. These
external functions are called to perform operations such as creating a new
**ASN1_VALUE** or converting an **ASN1_VALUE** to or from DER encoding.

The macro IMPLEMENT_EXTERN_ASN1() can be used to create such an externally
defined structure. The name of the structure should be supplied in the `sname`
parameter. The tag for the structure (e.g. typically **V_ASN1_SEQUENCE**) should
be supplied in the `tag` parameter. Finally a pointer to an
**ASN1_EXTERN_FUNCS** structure should be supplied in the `fptrs` parameter.

The **ASN1_EXTERN_FUNCS** structure has the following entries.


- `app_data`

A pointer to arbitrary application specific data.

- `asn1_ex_new`

A "new" function responsible for constructing a new **ASN1_VALUE** object. The
newly constructed value should be stored in `*pval`. The `it` parameter is a
pointer to the **ASN1_ITEM** template object created via the
IMPLEMENT_EXTERN_ASN1() macro.

Returns a positive value on success or 0 on error.

- `asn1_ex_free`

A "free" function responsible for freeing the **ASN1_VALUE** passed in `*pval`
that was previously allocated via a "new" function. The `it` parameter is a
pointer to the **ASN1_ITEM** template object created via the
IMPLEMENT_EXTERN_ASN1() macro.

- `asn1_ex_clear`

A "clear" function responsible for clearing any data in the **ASN1_VALUE** passed
in `*pval` and making it suitable for reuse. The `it` parameter is a pointer
to the **ASN1_ITEM** template object created via the IMPLEMENT_EXTERN_ASN1()
macro.

- `asn1_ex_d2i`

A "d2i" function responsible for converting DER data with the tag `tag` and
class `class` into an **ASN1_VALUE**. If `*pval` is non-NULL then the
**ASN_VALUE** it points to should be reused. Otherwise a new **ASN1_VALUE**
should be allocated and stored in `*pval`. `*in` points to the DER data to be
decoded and `len` is the length of that data. After decoding `*in` should be
updated to point at the next byte after the decoded data. If the **ASN1_VALUE**
is considered optional in this context then `opt` will be nonzero. Otherwise
it will be zero. The `it` parameter is a pointer to the **ASN1_ITEM** template
object created via the IMPLEMENT_EXTERN_ASN1() macro. A pointer to the current
**ASN1_TLC** context (which may be required for other ASN1 function calls) is
passed in the `ctx` parameter.

The `asn1_ex_d2i` entry may be NULL if `asn1_ex_d2i_ex` has been specified
instead.

Returns <= 0 on error or a positive value on success.

- `asn1_ex_i2d`

An "i2d" function responsible for converting an **ASN1_VALUE** into DER encoding.
On entry `*pval` will contain the **ASN1_VALUE** to be encoded. If default
tagging is to be used then `tag` will be -1 on entry. Otherwise if implicit
tagging should be used then `tag` and `aclass` will be the tag and associated
class.

If `out` is not NULL then this function should write the DER encoded data to
the buffer in `*out`, and then increment `*out` to point to immediately after
the data just written.

If `out` is NULL then no data should be written but the length calculated and
returned as if it were.

The `asn1_ex_i2d` entry may be NULL if `asn1_ex_i2d_ex` has been specified
instead.

The return value should be negative if a fatal error occurred, or 0 if a
non-fatal error occurred. Otherwise it should return the length of the encoded
data.

- `asn1_ex_print`

A "print" function. `out` is the BIO to print the output to. `*pval` is the
**ASN1_VALUE** to be printed. `indent` is the number of spaces of indenting to
be printed before any data is printed. `fname` is currently unused and is
always "". `pctx` is a pointer to the **ASN1_PCTX** for the print operation.

Returns 0 on error or a positive value on success. If the return value is 2 then
an additional newline will be printed after the data printed by this function.

- `asn1_ex_new_ex`

This is the same as `asn1_ex_new` except that it is additionally passed the
OSSL_LIB_CTX to be used in `libctx` and any property query string to be used
for algorithm fetching in the `propq` parameter. See
crypto(7)/ALGORITHM FETCHING for further details. If `asn1_ex_new_ex` is
non NULL, then it will always be called in preference to `asn1_ex_new`.

- `asn1_ex_d2i_ex`

This is the same as `asn1_ex_d2i` except that it is additionally passed the
OSSL_LIB_CTX to be used in `libctx` and any property query string to be used
for algorithm fetching in the `propq` parameter. See
crypto(7)/ALGORITHM FETCHING for further details. If `asn1_ex_d2i_ex` is
non NULL, then it will always be called in preference to `asn1_ex_d2i`.


## RETURN VALUES


Return values for the various callbacks are as described above.

## SEE ALSO


ASN1_item_new_ex(3)

## HISTORY


The `asn1_ex_new_ex` and `asn1_ex_d2i_ex` callbacks were added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/ASN1_EXTERN_FUNCS.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/ASN1_EXTERN_FUNCS.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/ASN1_EXTERN_FUNCS.pod`；SHA-256：`5fed7bc0c9b4a4fee9b03fdc303412586ce8207791d58ee7de7f8e0c2662827a`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
