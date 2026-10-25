---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-rsa-check-key",
  "title": "OpenSSL：RSA 密码 · RSA_check_key（man3）",
  "type": "note",
  "tags": [
    "RSA",
    "非对称密码",
    "填充",
    "openssl",
    "RSA_check_key",
    "RSA非对称密码"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "782de17a01141bdda99710d46850918da4875054c8ef2cdb01e09ecf73bad926",
  "generatedHash": "5a54d3951d17624d591485ed1dceee9ac7fbb5e80857679f5d80f411ad52167f",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "RSA 密码：RSA_check_key_ex, RSA_check_key - validate private RSA keys",
  "l1": "Both of the functions described on this page are deprecated. Applications should instead use EVP_PKEY_public_check(3), EVP_PKEY_private_check(3) and EVP_PKEY_pairwise_check(3). RSA_check_key_ex() function validates RSA keys. It checks that **p** and **q** are in fact prime, and that **n = p*q**. It does not work on RSA public keys that have only the modulus and public exponent elements populated. It also checks that **d*e = 1 mod (p-1*q-1)**, and that **dmp1**, **dmq1** and **iqmp** are set correctly or are **NULL**. It performs integrity checks on all the RSA key material, so the RSA key structure must contain all the private key data too. Therefore, it cannot be used with any arbitrary RSA key object, even if it is otherwise fit for regular RSA operation. The **cb** parameter is a callback that will be invoked in the same manner as BN_i",
  "questions": [
    "RSA_check_key 如何用于RSA 密码？",
    "RSA_check_key 有哪些参数、约束、实现语义和注意事项？"
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
      "id": "doc-openssl-doc-man3-rsa-check-key",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/RSA_check_key.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：RSA 密码 · RSA_check_key（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：RSA 密码。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

RSA_check_key_ex, RSA_check_key - validate private RSA keys

## 技术正文

## NAME


RSA_check_key_ex, RSA_check_key - validate private RSA keys

## SYNOPSIS


```c
#include <openssl/rsa.h>

```

The following functions have been deprecated since OpenSSL 3.0, and can be
hidden entirely by defining **OPENSSL_API_COMPAT** with a suitable version value,
see openssl_user_macros(7):

```c
int RSA_check_key_ex(const RSA *rsa, BN_GENCB *cb);

int RSA_check_key(const RSA *rsa);

```

## DESCRIPTION


Both of the functions described on this page are deprecated.
Applications should instead use EVP_PKEY_public_check(3),
EVP_PKEY_private_check(3) and EVP_PKEY_pairwise_check(3).

RSA_check_key_ex() function validates RSA keys.
It checks that **p** and **q** are
in fact prime, and that **n = p*q**.

It does not work on RSA public keys that have only the modulus
and public exponent elements populated.
It also checks that **d*e = 1 mod (p-1*q-1)**,
and that **dmp1**, **dmq1** and **iqmp** are set correctly or are **NULL**.
It performs integrity checks on all
the RSA key material, so the RSA key structure must contain all the private
key data too.
Therefore, it cannot be used with any arbitrary RSA key object,
even if it is otherwise fit for regular RSA operation.

The **cb** parameter is a callback that will be invoked in the same
manner as BN_is_prime_ex(3).

RSA_check_key() is equivalent to RSA_check_key_ex() with a NULL **cb**.

## RETURN VALUES


RSA_check_key_ex() and RSA_check_key()
return 1 if **rsa** is a valid RSA key, and 0 otherwise.
They return -1 if an error occurs while checking the key.

If the key is invalid or an error occurred, the reason code can be
obtained using ERR_get_error(3).

## NOTES


Unlike most other RSA functions, this function does **not** work
transparently with any underlying ENGINE implementation because it uses the
key data in the RSA structure directly. An ENGINE implementation can
override the way key data is stored and handled, and can even provide
support for HSM keys - in which case the RSA structure may contain **no**
key data at all! If the ENGINE in question is only being used for
acceleration or analysis purposes, then in all likelihood the RSA key data
is complete and untouched, but this can't be assumed in the general case.

## BUGS


A method of verifying the RSA key using opaque RSA API functions might need
to be considered. Right now RSA_check_key() simply uses the RSA structure
elements directly, bypassing the RSA_METHOD table altogether (and
completely violating encapsulation and object-orientation in the process).
The best fix will probably be to introduce a "check_key()" handler to the
RSA_METHOD function table so that alternative implementations can also
provide their own verifiers.

## SEE ALSO


BN_is_prime_ex(3),
ERR_get_error(3)

## HISTORY


All of these functions were deprecated in OpenSSL 3.0.

RSA_check_key_ex() appeared after OpenSSL 1.0.2.

## COPYRIGHT


Copyright 2000-2020 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/RSA_check_key.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/RSA_check_key.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/RSA_check_key.pod`；SHA-256：`782de17a01141bdda99710d46850918da4875054c8ef2cdb01e09ecf73bad926`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
