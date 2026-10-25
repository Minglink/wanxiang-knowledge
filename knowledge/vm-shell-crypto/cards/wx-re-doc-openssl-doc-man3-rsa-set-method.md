---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-rsa-set-method",
  "title": "OpenSSL：RSA 密码 · RSA_set_method（man3）",
  "type": "note",
  "tags": [
    "RSA",
    "非对称密码",
    "填充",
    "openssl",
    "RSA_set_method",
    "RSA非对称密码"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "4e2a02e832098c1d6ebe4d558bf24ef4f0f5166c7a75d6f1228d8c76558ebf30",
  "generatedHash": "0c7ef51bd0dc6b79138cf1e37d623aa5bd292d3eb8297571faa434dcd6a028f9",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "RSA 密码：RSA_set_default_method, RSA_get_default_method, RSA_set_method, RSA_get_method, RSA_PKCS1_OpenSSL, RSA_flags, RSA_new_method - select RSA method",
  "l1": "All of the functions described on this page are deprecated. Applications should instead use the OSSL_PROVIDER APIs. An **RSA_METHOD** specifies the functions that OpenSSL uses for RSA operations. By modifying the method, alternative implementations such as hardware accelerators may be used. IMPORTANT: See the NOTES section for important information about how these RSA API functions are affected by the use of **ENGINE** API calls. Initially, the default RSA_METHOD is the OpenSSL internal implementation, as returned by RSA_PKCS1_OpenSSL(). RSA_set_default_method() makes **meth** the default method for all RSA structures created later. **NB**: This is true only whilst no ENGINE has been set as a default for RSA, so this function is no longer recommended. This function is not thread-safe and should not be called at the same time as other Open",
  "questions": [
    "RSA_set_method 如何用于RSA 密码？",
    "RSA_set_method 有哪些参数、约束、实现语义和注意事项？"
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
      "id": "doc-openssl-doc-man3-rsa-set-method",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/RSA_set_method.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：RSA 密码 · RSA_set_method（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：RSA 密码。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

RSA_set_default_method, RSA_get_default_method, RSA_set_method,
RSA_get_method, RSA_PKCS1_OpenSSL, RSA_flags,
RSA_new_method - select RSA method

## 技术正文

## NAME


RSA_set_default_method, RSA_get_default_method, RSA_set_method,
RSA_get_method, RSA_PKCS1_OpenSSL, RSA_flags,
RSA_new_method - select RSA method

## SYNOPSIS


```c
#include <openssl/rsa.h>

```

The following functions have been deprecated since OpenSSL 3.0, and can be
hidden entirely by defining **OPENSSL_API_COMPAT** with a suitable version value,
see openssl_user_macros(7):

```c
void RSA_set_default_method(const RSA_METHOD *meth);

const RSA_METHOD *RSA_get_default_method(void);

int RSA_set_method(RSA *rsa, const RSA_METHOD *meth);

const RSA_METHOD *RSA_get_method(const RSA *rsa);

const RSA_METHOD *RSA_PKCS1_OpenSSL(void);

int RSA_flags(const RSA *rsa);

RSA *RSA_new_method(ENGINE *engine);

```

## DESCRIPTION


All of the functions described on this page are deprecated.
Applications should instead use the OSSL_PROVIDER APIs.

An **RSA_METHOD** specifies the functions that OpenSSL uses for RSA
operations. By modifying the method, alternative implementations such as
hardware accelerators may be used. IMPORTANT: See the NOTES section for
important information about how these RSA API functions are affected by the
use of **ENGINE** API calls.

Initially, the default RSA_METHOD is the OpenSSL internal implementation,
as returned by RSA_PKCS1_OpenSSL().

RSA_set_default_method() makes **meth** the default method for all RSA
structures created later.
**NB**: This is true only whilst no ENGINE has
been set as a default for RSA, so this function is no longer recommended.
This function is not thread-safe and should not be called at the same time
as other OpenSSL functions.

RSA_get_default_method() returns a pointer to the current default
RSA_METHOD. However, the meaningfulness of this result is dependent on
whether the ENGINE API is being used, so this function is no longer
recommended.

RSA_set_method() selects **meth** to perform all operations using the key
**rsa**. This will replace the RSA_METHOD used by the RSA key and if the
previous method was supplied by an ENGINE, the handle to that ENGINE will
be released during the change. It is possible to have RSA keys that only
work with certain RSA_METHOD implementations (e.g. from an ENGINE module
that supports embedded hardware-protected keys), and in such cases
attempting to change the RSA_METHOD for the key can have unexpected
results.

RSA_get_method() returns a pointer to the RSA_METHOD being used by **rsa**.
This method may or may not be supplied by an ENGINE implementation, but if
it is, the return value can only be guaranteed to be valid as long as the
RSA key itself is valid and does not have its implementation changed by
RSA_set_method().

RSA_flags() returns the **flags** that are set for **rsa**'s current
RSA_METHOD. See the BUGS section.

RSA_new_method() allocates and initializes an RSA structure so that
**engine** will be used for the RSA operations. If **engine** is NULL, the
default ENGINE for RSA operations is used, and if no default ENGINE is set,
the RSA_METHOD controlled by RSA_set_default_method() is used.

RSA_flags() returns the **flags** that are set for **rsa**'s current method.

RSA_new_method() allocates and initializes an **RSA** structure so that
**method** will be used for the RSA operations. If **method** is **NULL**,
the default method is used.

## THE RSA_METHOD STRUCTURE


```c
typedef struct rsa_meth_st
{
    /* name of the implementation */
    const char *name;

    /* encrypt */
    int (*rsa_pub_enc)(int flen, unsigned char *from,
                       unsigned char *to, RSA *rsa, int padding);

    /* verify arbitrary data */
    int (*rsa_pub_dec)(int flen, unsigned char *from,
                       unsigned char *to, RSA *rsa, int padding);

    /* sign arbitrary data */
    int (*rsa_priv_enc)(int flen, unsigned char *from,
                        unsigned char *to, RSA *rsa, int padding);

    /* decrypt */
    int (*rsa_priv_dec)(int flen, unsigned char *from,
                        unsigned char *to, RSA *rsa, int padding);

    /* compute r0 = r0 ^ I mod rsa->n (May be NULL for some implementations) */
    int (*rsa_mod_exp)(BIGNUM *r0, BIGNUM *I, RSA *rsa);

    /* compute r = a ^ p mod m (May be NULL for some implementations) */
    int (*bn_mod_exp)(BIGNUM *r, BIGNUM *a, const BIGNUM *p,
                      const BIGNUM *m, BN_CTX *ctx, BN_MONT_CTX *m_ctx);

    /* called at RSA_new */
    int (*init)(RSA *rsa);

    /* called at RSA_free */
    int (*finish)(RSA *rsa);

    /*
     * RSA_FLAG_EXT_PKEY        - rsa_mod_exp is called for private key
     *                            operations, even if p,q,dmp1,dmq1,iqmp
     *                            are NULL
     * RSA_METHOD_FLAG_NO_CHECK - don't check pub/private match
     */
    int flags;

    char *app_data; /* ?? */

    int (*rsa_sign)(int type,
                    const unsigned char *m, unsigned int m_length,
                    unsigned char *sigret, unsigned int *siglen, const RSA *rsa);
    int (*rsa_verify)(int dtype,
                      const unsigned char *m, unsigned int m_length,
                      const unsigned char *sigbuf, unsigned int siglen,
                      const RSA *rsa);
    /* keygen. If NULL built-in RSA key generation will be used */
    int (*rsa_keygen)(RSA *rsa, int bits, BIGNUM *e, BN_GENCB *cb);

} RSA_METHOD;

```

## RETURN VALUES


RSA_PKCS1_OpenSSL(), RSA_PKCS1_null_method(), RSA_get_default_method()
and RSA_get_method() return pointers to the respective RSA_METHODs.

RSA_set_default_method() returns no value.

RSA_set_method() returns a pointer to the old RSA_METHOD implementation
that was replaced. However, this return value should probably be ignored
because if it was supplied by an ENGINE, the pointer could be invalidated
at any time if the ENGINE is unloaded (in fact it could be unloaded as a
result of the RSA_set_method() function releasing its handle to the
ENGINE). For this reason, the return type may be replaced with a **void**
declaration in a future release.

RSA_new_method() returns NULL and sets an error code that can be obtained
by ERR_get_error(3) if the allocation fails. Otherwise
it returns a pointer to the newly allocated structure.

## BUGS


The behaviour of RSA_flags() is a mis-feature that is left as-is for now
to avoid creating compatibility problems. RSA functionality, such as the
encryption functions, are controlled by the **flags** value in the RSA key
itself, not by the **flags** value in the RSA_METHOD attached to the RSA key
(which is what this function returns). If the flags element of an RSA key
is changed, the changes will be honoured by RSA functionality but will not
be reflected in the return value of the RSA_flags() function - in effect
RSA_flags() behaves more like an RSA_default_flags() function (which does
not currently exist).

## SEE ALSO


RSA_new(3)

## HISTORY


All of these functions were deprecated in OpenSSL 3.0.

The RSA_null_method(), which was a partial attempt to avoid patent issues,
was replaced to always return NULL in OpenSSL 1.1.1.

## COPYRIGHT


Copyright 2000-2020 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/RSA_set_method.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/RSA_set_method.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/RSA_set_method.pod`；SHA-256：`4e2a02e832098c1d6ebe4d558bf24ef4f0f5166c7a75d6f1228d8c76558ebf30`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
