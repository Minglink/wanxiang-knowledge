---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bn-bn2bin",
  "title": "OpenSSL：大整数运算 · BN_bn2bin（man3）",
  "type": "note",
  "tags": [
    "大整数",
    "模运算",
    "密码实现",
    "openssl",
    "BN_bn2bin"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "6902f642d3e58cd02cde2ec97b5f30ac1863b89f72852fbf9ad9c8b9b87a9aaf",
  "generatedHash": "dbb472d064f233b76c2061be4bb443f3ed4e88ec439fc7fa9fbe2c448fd22fb3",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "大整数运算：BN_bn2binpad, BN_signed_bn2bin, BN_bn2bin, BN_bin2bn, BN_signed_bin2bn, BN_bn2lebinpad, BN_signed_bn2lebin, BN_lebin2bn, BN_signed_lebin2bn, BN_bn2nativepad, BN_signed_bn2native, BN_native2bn, BN_signed_native2bn, BN_bn2hex, BN_bn2dec, BN_hex2bn, BN_dec2bn, BN_print, BN_print_fp, BN_bn2mpi, BN_mpi2b",
  "l1": "BN_bn2bin() converts the absolute value of **a** into big-endian form and stores it at **to**. **to** must point to BN_num_bytes(**a**) bytes of memory. **a** and **to** **MUST NOT** be NULL. BN_bn2binpad() also converts the absolute value of **a** into big-endian form and stores it at **to**. **tolen** indicates the length of the output buffer **to**. The result is padded with zeros if necessary. If **tolen** is less than BN_num_bytes(**a**) an error is returned. BN_signed_bn2bin() converts the value of **a** into big-endian signed 2's complements form and stores it at **to**. **tolen** indicates the length of the output buffer **to**. The result is signed extended (padded with 0x00 for positive numbers or with 0xff for negative numbers) if necessary. If **tolen** is smaller than the necessary size (which may be C<<BN_num_bytes(**a**) + ",
  "questions": [
    "BN_bn2bin 如何用于大整数运算？",
    "BN_bn2bin 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bn-bn2bin",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BN_bn2bin.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：大整数运算 · BN_bn2bin（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：大整数运算。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BN_bn2binpad, BN_signed_bn2bin, BN_bn2bin, BN_bin2bn, BN_signed_bin2bn,
BN_bn2lebinpad, BN_signed_bn2lebin, BN_lebin2bn, BN_signed_lebin2bn,
BN_bn2nativepad, BN_signed_bn2native, BN_native2bn, BN_signed_native2bn,
BN_bn2hex, BN_bn2dec, BN_hex2bn, BN_dec2bn,
BN_print, BN_print_fp, BN_bn2mpi, BN_mpi2bn - format conversions

## 技术正文

## NAME


BN_bn2binpad, BN_signed_bn2bin, BN_bn2bin, BN_bin2bn, BN_signed_bin2bn,
BN_bn2lebinpad, BN_signed_bn2lebin, BN_lebin2bn, BN_signed_lebin2bn,
BN_bn2nativepad, BN_signed_bn2native, BN_native2bn, BN_signed_native2bn,
BN_bn2hex, BN_bn2dec, BN_hex2bn, BN_dec2bn,
BN_print, BN_print_fp, BN_bn2mpi, BN_mpi2bn - format conversions

## SYNOPSIS


```c
#include <openssl/bn.h>

int BN_bn2bin(const BIGNUM *a, unsigned char *to);
int BN_bn2binpad(const BIGNUM *a, unsigned char *to, int tolen);
int BN_signed_bn2bin(const BIGNUM *a, unsigned char *to, int tolen);
BIGNUM *BN_bin2bn(const unsigned char *s, int len, BIGNUM *ret);
BIGNUM *BN_signed_bin2bn(const unsigned char *s, int len, BIGNUM *ret);

int BN_bn2lebinpad(const BIGNUM *a, unsigned char *to, int tolen);
int BN_signed_bn2lebin(const BIGNUM *a, unsigned char *to, int tolen);
BIGNUM *BN_lebin2bn(const unsigned char *s, int len, BIGNUM *ret);
BIGNUM *BN_signed_lebin2bn(const unsigned char *s, int len, BIGNUM *ret);

int BN_bn2nativepad(const BIGNUM *a, unsigned char *to, int tolen);
int BN_signed_bn2native(const BIGNUM *a, unsigned char *to, int tolen);
BIGNUM *BN_native2bn(const unsigned char *s, int len, BIGNUM *ret);
BIGNUM *BN_signed_native2bn(const unsigned char *s, int len, BIGNUM *ret);

char *BN_bn2hex(const BIGNUM *a);
char *BN_bn2dec(const BIGNUM *a);
int BN_hex2bn(BIGNUM **a, const char *str);
int BN_dec2bn(BIGNUM **a, const char *str);

int BN_print(BIO *fp, const BIGNUM *a);
int BN_print_fp(FILE *fp, const BIGNUM *a);

int BN_bn2mpi(const BIGNUM *a, unsigned char *to);
BIGNUM *BN_mpi2bn(unsigned char *s, int len, BIGNUM *ret);

```

## DESCRIPTION


BN_bn2bin() converts the absolute value of **a** into big-endian form
and stores it at **to**. **to** must point to BN_num_bytes(**a**) bytes of
memory. **a** and **to** **MUST NOT** be NULL.

BN_bn2binpad() also converts the absolute value of **a** into big-endian form
and stores it at **to**. **tolen** indicates the length of the output buffer
**to**. The result is padded with zeros if necessary. If **tolen** is less than
BN_num_bytes(**a**) an error is returned.

BN_signed_bn2bin() converts the value of **a** into big-endian signed 2's
complements form and stores it at **to**. **tolen** indicates the length of
the output buffer **to**. The result is signed extended (padded with 0x00
for positive numbers or with 0xff for negative numbers) if necessary.
If **tolen** is smaller than the necessary size (which may be
C<<BN_num_bytes(**a**) + 1>>), an error is returned.

BN_bin2bn() converts the positive integer in big-endian form of length
**len** at **s** into a **BIGNUM** and places it in **ret**. If **ret** is
NULL, a new **BIGNUM** is created. **s** **MUST NOT** be NULL.

BN_signed_bin2bn() converts the integer in big-endian signed 2's complement
form of length **len** at **s** into a **BIGNUM** and places it in **ret**. If
**ret** is NULL, a new **BIGNUM** is created.

BN_bn2lebinpad(), BN_signed_bn2lebin() and BN_lebin2bn() are identical to
BN_bn2binpad(), BN_signed_bn2bin() and BN_bin2bn() except the buffer is in
little-endian format.

BN_bn2nativepad(), BN_signed_bn2native() and BN_native2bn() are identical
to BN_bn2binpad(), BN_signed_bn2bin() and BN_bin2bn() except the buffer is
in native format, i.e. most significant byte first on big-endian platforms,
and least significant byte first on little-endian platforms.

BN_bn2hex() and BN_bn2dec() return printable strings containing the
hexadecimal and decimal encoding of **a** respectively. For negative
numbers, the string is prefaced with a leading '-'. The string must be
freed later using OPENSSL_free().

BN_hex2bn() takes as many characters as possible from the string **str**,
including the leading character '-' which means negative, to form a valid
hexadecimal number representation and converts them to a **BIGNUM** and
stores it in ****a**. If ***a** is NULL, a new **BIGNUM** is created. If
**a** is NULL, it only computes the length of valid representation.
A "negative zero" is converted to zero.
BN_dec2bn() is the same using the decimal system.

BN_print() and BN_print_fp() write the hexadecimal encoding of **a**,
with a leading '-' for negative numbers, to the **BIO** or **FILE**
**fp**.

BN_bn2mpi() and BN_mpi2bn() convert **BIGNUM**s from and to a format
that consists of the number's length in bytes represented as a 4-byte
big-endian number, and the number itself in big-endian format, where
the most significant bit signals a negative number (the representation
of numbers with the MSB set is prefixed with null byte).

BN_bn2mpi() stores the representation of **a** at **to**, where **to**
must be large enough to hold the result. The size can be determined by
calling BN_bn2mpi(**a**, NULL).

BN_mpi2bn() converts the **len** bytes long representation at **s** to
a **BIGNUM** and stores it at **ret**, or in a newly allocated **BIGNUM**
if **ret** is NULL.

## RETURN VALUES


BN_bn2bin() returns the length of the big-endian number placed at **to**.
BN_bin2bn() returns the **BIGNUM**, NULL on error.

BN_bn2binpad(), BN_signed_bn2bin(), BN_bn2lebinpad(), BN_signed_bn2lebin(),
BN_bn2nativepad(), and_signed BN_bn2native() return the number of bytes
written or -1 if the supplied buffer is too small.

BN_bn2hex() and BN_bn2dec() return a NUL-terminated string, or NULL
on error. BN_hex2bn() and BN_dec2bn() return the number of characters
used in parsing, or 0 on error, in which
case no new **BIGNUM** will be created.

BN_print_fp() and BN_print() return 1 on success, 0 on write errors.

BN_bn2mpi() returns the length of the representation. BN_mpi2bn()
returns the **BIGNUM**, and NULL on error.

The error codes can be obtained by ERR_get_error(3).

## SEE ALSO


ERR_get_error(3), BN_zero(3),
ASN1_INTEGER_to_BN(3),
BN_num_bytes(3)

## HISTORY


The functions BN_signed_bin2bn(), BN_signed_bn2bin(), BN_signed_lebin2bn(),
BN_signed_bn2lebin(), BN_signed_native2bn(), BN_signed_bn2native()
were added in OpenSSL 3.2.

## COPYRIGHT


Copyright 2000-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BN_bn2bin.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BN_bn2bin.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BN_bn2bin.pod`；SHA-256：`6902f642d3e58cd02cde2ec97b5f30ac1863b89f72852fbf9ad9c8b9b87a9aaf`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
