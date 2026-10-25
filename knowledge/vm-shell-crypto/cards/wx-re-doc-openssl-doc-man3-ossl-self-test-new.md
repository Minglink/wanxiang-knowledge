---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-self-test-new",
  "title": "OpenSSL：密码实现与接口 · OSSL_SELF_TEST_new（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_SELF_TEST_new"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "5e70c9561e63e3672affd676bb521cc885154dc9c7fb1a7a6d1bc96e055e0b94",
  "generatedHash": "5b8488e56d00f83c2d5fa0f2f269ed6b6b9a7bef5bbe3396c4cb4fd3e01af7e3",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_SELF_TEST_new, OSSL_SELF_TEST_free, OSSL_SELF_TEST_onbegin, OSSL_SELF_TEST_oncorrupt_byte, OSSL_SELF_TEST_onend - functionality to trigger a callback during a self test",
  "l1": "These methods are intended for use by provider implementers, to display diagnostic information during self testing. OSSL_SELF_TEST_new() allocates an opaque **OSSL_SELF_TEST** object that has a callback and callback argument associated with it. The callback `cb` may be triggered multiple times by a self test to indicate different phases. OSSL_SELF_TEST_free() frees the space allocated by OSSL_SELF_TEST_new(). If the argument is NULL, nothing is done. OSSL_SELF_TEST_onbegin() may be inserted at the start of a block of self test code. It can be used for diagnostic purposes. If this method is called the callback `cb` will receive the following OSSL_PARAM(3) object. The value is the string \"Start\" OSSL_SELF_TEST_oncorrupt_byte() may be inserted just after the known answer is calculated, but before the self test compares the result. The first ",
  "questions": [
    "OSSL_SELF_TEST_new 如何用于密码实现与接口？",
    "OSSL_SELF_TEST_new 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-self-test-new",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_SELF_TEST_new.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_SELF_TEST_new（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_SELF_TEST_new,
OSSL_SELF_TEST_free,
OSSL_SELF_TEST_onbegin,
OSSL_SELF_TEST_oncorrupt_byte,
OSSL_SELF_TEST_onend - functionality to trigger a callback during a self test

## 技术正文

## NAME


OSSL_SELF_TEST_new,
OSSL_SELF_TEST_free,
OSSL_SELF_TEST_onbegin,
OSSL_SELF_TEST_oncorrupt_byte,
OSSL_SELF_TEST_onend - functionality to trigger a callback during a self test

## SYNOPSIS


```c
#include <openssl/self_test.h>

OSSL_SELF_TEST *OSSL_SELF_TEST_new(OSSL_CALLBACK *cb, void *cbarg);
void OSSL_SELF_TEST_free(OSSL_SELF_TEST *st);

void OSSL_SELF_TEST_onbegin(OSSL_SELF_TEST *st, const char *type,
                            const char *desc);
int OSSL_SELF_TEST_oncorrupt_byte(OSSL_SELF_TEST *st, unsigned char *bytes);
void OSSL_SELF_TEST_onend(OSSL_SELF_TEST *st, int ret);

```

## DESCRIPTION


These methods are intended for use by provider implementers, to display
diagnostic information during self testing.

OSSL_SELF_TEST_new() allocates an opaque **OSSL_SELF_TEST** object that has a
callback and callback argument associated with it.

The callback `cb` may be triggered multiple times by a self test to indicate
different phases.

OSSL_SELF_TEST_free() frees the space allocated by OSSL_SELF_TEST_new().
If the argument is NULL, nothing is done.

OSSL_SELF_TEST_onbegin() may be inserted at the start of a block of self test
code. It can be used for diagnostic purposes.
If this method is called the callback `cb` will receive the following
OSSL_PARAM(3) object.


- "st-phase" (**OSSL_PROV_PARAM_SELF_TEST_PHASE**) <UTF8 string>

The value is the string "Start"


OSSL_SELF_TEST_oncorrupt_byte() may be inserted just after the known answer is
calculated, but before the self test compares the result. The first byte in the
passed in array of `bytes` will be corrupted if the callback returns 0,
otherwise it leaves the array unaltered. It can be used for failure testing.
The `type` and `desc` can be used to identify an individual self test to
target for failure testing.
If this method is called the callback `cb` will receive the following
OSSL_PARAM(3) object.


- "st-phase" (**OSSL_PROV_PARAM_SELF_TEST_PHASE**) <UTF8 string>

The value is the string "Corrupt"


OSSL_SELF_TEST_onend() may be inserted at the end of a block of self test code
just before cleanup to indicate if the test passed or failed. It can be used for
diagnostic purposes.
If this method is called the callback `cb` will receive the following
OSSL_PARAM(3) object.


- "st-phase" (**OSSL_PROV_PARAM_SELF_TEST_PHASE**) <UTF8 string>

The value of the string is "Pass" if `ret` is non zero, otherwise it has the
value "Fail".


After the callback `cb` has been called the values that were set by
OSSL_SELF_TEST_onbegin() for `type` and `desc` are set to the value "None".

If OSSL_SELF_TEST_onbegin(), OSSL_SELF_TEST_oncorrupt_byte() or
OSSL_SELF_TEST_onend() is called the following additional OSSL_PARAM(3) are
passed to the callback.


- "st-type" (**OSSL_PROV_PARAM_SELF_TEST_TYPE**) <UTF8 string>

The value is setup by the `type` passed to OSSL_SELF_TEST_onbegin().
This allows the callback to identify the type of test being run.

- "st-desc" (**OSSL_PROV_PARAM_SELF_TEST_DESC**) <UTF8 string>

The value is setup by the `type` passed to OSSL_SELF_TEST_onbegin().
This allows the callback to identify the sub category of the test being run.


## RETURN VALUES


OSSL_SELF_TEST_new() returns the allocated **OSSL_SELF_TEST** object, or NULL if
it fails.

OSSL_SELF_TEST_oncorrupt_byte() returns 1 if corruption occurs, otherwise it
returns 0.

## EXAMPLES


A single self test could be set up in the following way:

```c
   OSSL_SELF_TEST *st = NULL;
   OSSL_CALLBACK *cb;
   void *cbarg;
   int ok = 0;
   unsigned char out[EVP_MAX_MD_SIZE];
   unsigned int out_len = 0;
   EVP_MD_CTX *ctx = EVP_MD_CTX_new();
   EVP_MD *md = EVP_MD_fetch(libctx, t->algorithm, NULL);

   /*
    * Retrieve the callback - will be NULL if not set by the application via
    * OSSL_SELF_TEST_set_callback().
    */
   OSSL_SELF_TEST_get_callback(libctx, &cb, &cbarg);

   st = OSSL_SELF_TEST_new(cb, cb_arg);

   /* Trigger the optional callback */
   OSSL_SELF_TEST_onbegin(st, OSSL_SELF_TEST_TYPE_KAT_DIGEST,
                          OSSL_SELF_TEST_DESC_MD_SHA2);

   if (!EVP_DigestInit_ex(ctx, md, NULL)
       || !EVP_DigestUpdate(ctx, pt, pt_len)
       || !EVP_DigestFinal(ctx, out, &out_len))
       goto err;

   /* Optional corruption - If the application callback returns 0 */
   OSSL_SELF_TEST_oncorrupt_byte(st, out);

   if (out_len != t->expected_len
       || memcmp(out, t->expected, out_len) != 0)
       goto err;
   ok = 1;
 err:
   OSSL_SELF_TEST_onend(st, ok);
   EVP_MD_free(md);
   EVP_MD_CTX_free(ctx);

```

Multiple self test's can be set up in a similar way by repeating the pattern of
OSSL_SELF_TEST_onbegin(), OSSL_SELF_TEST_oncorrupt_byte(), OSSL_SELF_TEST_onend()
for each test.

## SEE ALSO


OSSL_SELF_TEST_set_callback(3),
openssl-core.h(7),
OSSL_PROVIDER-FIPS(7)

## HISTORY


The functions described here were added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2020-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_SELF_TEST_new.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_SELF_TEST_new.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_SELF_TEST_new.pod`；SHA-256：`5e70c9561e63e3672affd676bb521cc885154dc9c7fb1a7a6d1bc96e055e0b94`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
