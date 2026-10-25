---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-rsa-padding-add-pkcs1-type-1",
  "title": "OpenSSL：RSA 密码 · RSA_padding_add_PKCS1_type_1（man3）",
  "type": "note",
  "tags": [
    "RSA",
    "非对称密码",
    "填充",
    "openssl",
    "RSA_padding_add_PKCS1_type_1",
    "RSA非对称密码"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "55b97c8c9be9748e6a564cd443fe6b21f7f3979950c8ff0d310297bdfa4aa4ba",
  "generatedHash": "fd94092de487e3a86a5a03c1f7f1b8e3c08d218ad1429458ef9085568a12dcd9",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "RSA 密码：RSA_padding_add_PKCS1_type_1, RSA_padding_check_PKCS1_type_1, RSA_padding_add_PKCS1_type_2, RSA_padding_check_PKCS1_type_2, RSA_padding_add_PKCS1_OAEP, RSA_padding_check_PKCS1_OAEP, RSA_padding_add_PKCS1_OAEP_mgf1, RSA_padding_check_PKCS1_OAEP_mgf1, RSA_padding_add_none, RSA_padding_check_none - asy",
  "l1": "All of the functions described on this page are deprecated. Applications should instead use the EVP PKEY APIs. The RSA_padding_xxx_xxx() functions are called from the RSA encrypt, decrypt, sign and verify functions. Normally they should not be called from application programs. However, they can also be called directly to implement padding for other asymmetric ciphers. RSA_padding_add_PKCS1_OAEP() and RSA_padding_check_PKCS1_OAEP() may be used in an application combined with **RSA_NO_PADDING** in order to implement OAEP with an encoding parameter. RSA_padding_add_xxx() encodes **fl** bytes from **f** so as to fit into **tlen** bytes and stores the result at **to**. An error occurs if **fl** does not meet the size requirements of the encoding method. The following encoding methods are implemented: PKCS #1 v2.0 EMSA-PKCS1-v1_5 (PKCS #1 v1.5 ",
  "questions": [
    "RSA_padding_add_PKCS1_type_1 如何用于RSA 密码？",
    "RSA_padding_add_PKCS1_type_1 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-focus-crypto-rsa-oaep",
      "kind": "机制参照"
    }
  ],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-rsa-padding-add-pkcs1-type-1",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/RSA_padding_add_PKCS1_type_1.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：RSA 密码 · RSA_padding_add_PKCS1_type_1（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：RSA 密码。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

RSA_padding_add_PKCS1_type_1, RSA_padding_check_PKCS1_type_1,
RSA_padding_add_PKCS1_type_2, RSA_padding_check_PKCS1_type_2,
RSA_padding_add_PKCS1_OAEP, RSA_padding_check_PKCS1_OAEP,
RSA_padding_add_PKCS1_OAEP_mgf1, RSA_padding_check_PKCS1_OAEP_mgf1,
RSA_padding_add_none, RSA_padding_check_none - asymmetric encryption
padding

## 技术正文

## NAME


RSA_padding_add_PKCS1_type_1, RSA_padding_check_PKCS1_type_1,
RSA_padding_add_PKCS1_type_2, RSA_padding_check_PKCS1_type_2,
RSA_padding_add_PKCS1_OAEP, RSA_padding_check_PKCS1_OAEP,
RSA_padding_add_PKCS1_OAEP_mgf1, RSA_padding_check_PKCS1_OAEP_mgf1,
RSA_padding_add_none, RSA_padding_check_none - asymmetric encryption
padding

## SYNOPSIS


```c
#include <openssl/rsa.h>

```

The following functions have been deprecated since OpenSSL 3.0, and can be
hidden entirely by defining **OPENSSL_API_COMPAT** with a suitable version value,
see openssl_user_macros(7):

```c
int RSA_padding_add_PKCS1_type_1(unsigned char *to, int tlen,
                                 const unsigned char *f, int fl);

int RSA_padding_check_PKCS1_type_1(unsigned char *to, int tlen,
                                   const unsigned char *f, int fl, int rsa_len);

int RSA_padding_add_PKCS1_type_2(unsigned char *to, int tlen,
                                 const unsigned char *f, int fl);

int RSA_padding_check_PKCS1_type_2(unsigned char *to, int tlen,
                                   const unsigned char *f, int fl, int rsa_len);

int RSA_padding_add_PKCS1_OAEP(unsigned char *to, int tlen,
                               const unsigned char *f, int fl,
                               const unsigned char *p, int pl);

int RSA_padding_check_PKCS1_OAEP(unsigned char *to, int tlen,
                                 const unsigned char *f, int fl, int rsa_len,
                                 const unsigned char *p, int pl);

int RSA_padding_add_PKCS1_OAEP_mgf1(unsigned char *to, int tlen,
                                    const unsigned char *f, int fl,
                                    const unsigned char *p, int pl,
                                    const EVP_MD *md, const EVP_MD *mgf1md);

int RSA_padding_check_PKCS1_OAEP_mgf1(unsigned char *to, int tlen,
                                      const unsigned char *f, int fl, int rsa_len,
                                      const unsigned char *p, int pl,
                                      const EVP_MD *md, const EVP_MD *mgf1md);

int RSA_padding_add_none(unsigned char *to, int tlen,
                         const unsigned char *f, int fl);

int RSA_padding_check_none(unsigned char *to, int tlen,
                           const unsigned char *f, int fl, int rsa_len);

```

## DESCRIPTION


All of the functions described on this page are deprecated.
Applications should instead use the EVP PKEY APIs.

The RSA_padding_xxx_xxx() functions are called from the RSA encrypt,
decrypt, sign and verify functions. Normally they should not be called
from application programs.

However, they can also be called directly to implement padding for other
asymmetric ciphers. RSA_padding_add_PKCS1_OAEP() and
RSA_padding_check_PKCS1_OAEP() may be used in an application combined
with **RSA_NO_PADDING** in order to implement OAEP with an encoding
parameter.

RSA_padding_add_xxx() encodes **fl** bytes from **f** so as to fit into
**tlen** bytes and stores the result at **to**. An error occurs if **fl**
does not meet the size requirements of the encoding method.

The following encoding methods are implemented:


- PKCS1_type_1

PKCS #1 v2.0 EMSA-PKCS1-v1_5 (PKCS #1 v1.5 block type 1); used for signatures

- PKCS1_type_2

PKCS #1 v2.0 EME-PKCS1-v1_5 (PKCS #1 v1.5 block type 2)

- PKCS1_OAEP

PKCS #1 v2.0 EME-OAEP

- none

simply copy the data


The random number generator must be seeded prior to calling
RSA_padding_add_xxx().
If the automatic seeding or reseeding of the OpenSSL CSPRNG fails due to
external circumstances (see RAND(7)), the operation will fail.

RSA_padding_check_xxx() verifies that the **fl** bytes at **f** contain
a valid encoding for a **rsa_len** byte RSA key in the respective
encoding method and stores the recovered data of at most **tlen** bytes
(for **RSA_NO_PADDING**: of size **tlen**)
at **to**.

For RSA_padding_xxx_OAEP(), **p** points to the encoding parameter
of length **pl**. **p** may be **NULL** if **pl** is 0.

For RSA_padding_xxx_OAEP_mgf1(), **md** points to the md hash,
if **md** is **NULL** that means md=sha1, and **mgf1md** points to
the mgf1 hash, if **mgf1md** is **NULL** that means mgf1md=md.

## RETURN VALUES


The RSA_padding_add_xxx() functions return 1 on success, 0 on error.
The RSA_padding_check_xxx() functions return the length of the
recovered data, -1 on error. Error codes can be obtained by calling
ERR_get_error(3).

## WARNINGS


The result of RSA_padding_check_PKCS1_type_2() is exactly the
information which is used to mount a classical Bleichenbacher
padding oracle attack. This is an inherent weakness in the PKCS #1
v1.5 padding design. Prefer PKCS1_OAEP padding. If that is not
possible, the result of RSA_padding_check_PKCS1_type_2() should be
checked in constant time if it matches the expected length of the
plaintext and additionally some application specific consistency
checks on the plaintext need to be performed in constant time.
If the plaintext is rejected it must be kept secret which of the
checks caused the application to reject the message.
Do not remove the zero-padding from the decrypted raw RSA data
which was computed by RSA_private_decrypt() with **RSA_NO_PADDING**,
as this would create a small timing side channel which could be
used to mount a Bleichenbacher attack against any padding mode
including PKCS1_OAEP.

You should prefer the use of EVP PKEY APIs for PKCS#1 v1.5 decryption
as they implement the necessary workarounds internally.

## SEE ALSO


RSA_public_encrypt(3),
RSA_private_decrypt(3),
RSA_sign(3), RSA_verify(3),
RAND(7)

## HISTORY


All of these functions were deprecated in OpenSSL 3.0.

## COPYRIGHT


Copyright 2000-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/RSA_padding_add_PKCS1_type_1.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/RSA_padding_add_PKCS1_type_1.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/RSA_padding_add_PKCS1_type_1.pod`；SHA-256：`55b97c8c9be9748e6a564cd443fe6b21f7f3979950c8ff0d310297bdfa4aa4ba`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
