---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-md-meth-new",
  "title": "OpenSSL：摘要算法 · EVP_MD_meth_new（man3）",
  "type": "note",
  "tags": [
    "哈希",
    "消息摘要",
    "加密算法",
    "openssl",
    "EVP_MD_meth_new"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "7290a884fbfe10c13c54115571a0835514826ea257511253c603a680d79b18ea",
  "generatedHash": "604d11a0420cdde1d07255023cb85347f392ad2743f3c6f7534a2ec2032cd644",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "摘要算法：EVP_MD_meth_new, EVP_MD_meth_dup, EVP_MD_meth_free, EVP_MD_meth_set_input_blocksize, EVP_MD_meth_set_result_size, EVP_MD_meth_set_app_datasize, EVP_MD_meth_set_flags, EVP_MD_meth_set_init, EVP_MD_meth_set_update, EVP_MD_meth_set_final, EVP_MD_meth_set_copy, EVP_MD_meth_set_cleanup, EVP_MD_meth_set_c",
  "l1": "All of the functions described on this page are deprecated. Applications should instead use the OSSL_PROVIDER APIs. The **EVP_MD** type is a structure for digest method implementation. It can also have associated public/private key signing and verifying routines. EVP_MD_meth_new() creates a new **EVP_MD** structure. These **EVP_MD** structures are reference counted. EVP_MD_meth_dup() creates a copy of **md**. EVP_MD_meth_free() decrements the reference count for the **EVP_MD** structure. If the reference count drops to 0 then the structure is freed. If the argument is NULL, nothing is done. EVP_MD_meth_set_input_blocksize() sets the internal input block size for the method **md** to **blocksize** bytes. EVP_MD_meth_set_result_size() sets the size of the result that the digest method in **md** is expected to produce to **resultsize** bytes",
  "questions": [
    "EVP_MD_meth_new 如何用于摘要算法？",
    "EVP_MD_meth_new 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-md-meth-new",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_MD_meth_new.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：摘要算法 · EVP_MD_meth_new（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：摘要算法。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_MD_meth_new, EVP_MD_meth_dup, EVP_MD_meth_free,
EVP_MD_meth_set_input_blocksize,
EVP_MD_meth_set_result_size, EVP_MD_meth_set_app_datasize,
EVP_MD_meth_set_flags, EVP_MD_meth_set_init, EVP_MD_meth_set_update,
EVP_MD_meth_set_final, EVP_MD_meth_set_copy, EVP_MD_meth_set_cleanup,
EVP_MD_meth_set_ctrl, EVP_MD_meth_get_input_blocksize,
EVP_MD_meth_get_result_size, EVP_MD_meth_get_app_datasize,
EVP_MD_meth_get_flags, EVP_MD_meth_get_init, EVP_MD_meth_get_update,
EVP_MD_meth_get_final, EVP_MD_meth_get_copy, EVP_MD_meth_get_cleanup,
EVP_MD_meth_get_ctrl
- Routines to build up legacy EVP_MD methods

## 技术正文

## NAME


EVP_MD_meth_new, EVP_MD_meth_dup, EVP_MD_meth_free,
EVP_MD_meth_set_input_blocksize,
EVP_MD_meth_set_result_size, EVP_MD_meth_set_app_datasize,
EVP_MD_meth_set_flags, EVP_MD_meth_set_init, EVP_MD_meth_set_update,
EVP_MD_meth_set_final, EVP_MD_meth_set_copy, EVP_MD_meth_set_cleanup,
EVP_MD_meth_set_ctrl, EVP_MD_meth_get_input_blocksize,
EVP_MD_meth_get_result_size, EVP_MD_meth_get_app_datasize,
EVP_MD_meth_get_flags, EVP_MD_meth_get_init, EVP_MD_meth_get_update,
EVP_MD_meth_get_final, EVP_MD_meth_get_copy, EVP_MD_meth_get_cleanup,
EVP_MD_meth_get_ctrl
- Routines to build up legacy EVP_MD methods

## SYNOPSIS


```c
#include <openssl/evp.h>

```

The following functions have been deprecated since OpenSSL 3.0, and can be
hidden entirely by defining **OPENSSL_API_COMPAT** with a suitable version value,
see openssl_user_macros(7):

```c
EVP_MD *EVP_MD_meth_new(int md_type, int pkey_type);
void EVP_MD_meth_free(EVP_MD *md);
EVP_MD *EVP_MD_meth_dup(const EVP_MD *md);

int EVP_MD_meth_set_input_blocksize(EVP_MD *md, int blocksize);
int EVP_MD_meth_set_result_size(EVP_MD *md, int resultsize);
int EVP_MD_meth_set_app_datasize(EVP_MD *md, int datasize);
int EVP_MD_meth_set_flags(EVP_MD *md, unsigned long flags);
int EVP_MD_meth_set_init(EVP_MD *md, int (*init)(EVP_MD_CTX *ctx));
int EVP_MD_meth_set_update(EVP_MD *md, int (*update)(EVP_MD_CTX *ctx,
                                                     const void *data,
                                                     size_t count));
int EVP_MD_meth_set_final(EVP_MD *md, int (*final)(EVP_MD_CTX *ctx,
                                                   unsigned char *md));
int EVP_MD_meth_set_copy(EVP_MD *md, int (*copy)(EVP_MD_CTX *to,
                                                 const EVP_MD_CTX *from));
int EVP_MD_meth_set_cleanup(EVP_MD *md, int (*cleanup)(EVP_MD_CTX *ctx));
int EVP_MD_meth_set_ctrl(EVP_MD *md, int (*ctrl)(EVP_MD_CTX *ctx, int cmd,
                                                 int p1, void *p2));

int EVP_MD_meth_get_input_blocksize(const EVP_MD *md);
int EVP_MD_meth_get_result_size(const EVP_MD *md);
int EVP_MD_meth_get_app_datasize(const EVP_MD *md);
unsigned long EVP_MD_meth_get_flags(const EVP_MD *md);
int (*EVP_MD_meth_get_init(const EVP_MD *md))(EVP_MD_CTX *ctx);
int (*EVP_MD_meth_get_update(const EVP_MD *md))(EVP_MD_CTX *ctx,
                                                const void *data,
                                                size_t count);
int (*EVP_MD_meth_get_final(const EVP_MD *md))(EVP_MD_CTX *ctx,
                                               unsigned char *md);
int (*EVP_MD_meth_get_copy(const EVP_MD *md))(EVP_MD_CTX *to,
                                              const EVP_MD_CTX *from);
int (*EVP_MD_meth_get_cleanup(const EVP_MD *md))(EVP_MD_CTX *ctx);
int (*EVP_MD_meth_get_ctrl(const EVP_MD *md))(EVP_MD_CTX *ctx, int cmd,
                                              int p1, void *p2);

```

## DESCRIPTION


All of the functions described on this page are deprecated.
Applications should instead use the OSSL_PROVIDER APIs.

The **EVP_MD** type is a structure for digest method implementation.
It can also have associated public/private key signing and verifying
routines.

EVP_MD_meth_new() creates a new **EVP_MD** structure.
These **EVP_MD** structures are reference counted.

EVP_MD_meth_dup() creates a copy of **md**.

EVP_MD_meth_free() decrements the reference count for the **EVP_MD** structure.
If the reference count drops to 0 then the structure is freed.
If the argument is NULL, nothing is done.

EVP_MD_meth_set_input_blocksize() sets the internal input block size
for the method **md** to **blocksize** bytes.

EVP_MD_meth_set_result_size() sets the size of the result that the
digest method in **md** is expected to produce to **resultsize** bytes.

The digest method may have its own private data, which OpenSSL will
allocate for it.  EVP_MD_meth_set_app_datasize() should be used to
set the size for it to **datasize**.

EVP_MD_meth_set_flags() sets the flags to describe optional
behaviours in the particular **md**.  Several flags can be or'd
together.  The available flags are:


- EVP_MD_FLAG_ONESHOT

This digest method can only handle one block of input.

- EVP_MD_FLAG_XOF

This digest method is an extensible-output function (XOF) and supports
the **EVP_MD_CTRL_XOF_LEN** control.

- EVP_MD_FLAG_DIGALGID_NULL

When setting up a DigestAlgorithmIdentifier, this flag will have the
parameter set to NULL by default.  Use this for PKCS#1.  I<Note: if
combined with EVP_MD_FLAG_DIGALGID_ABSENT, the latter will override.>

- EVP_MD_FLAG_DIGALGID_ABSENT

When setting up a DigestAlgorithmIdentifier, this flag will have the
parameter be left absent by default.  I<Note: if combined with
EVP_MD_FLAG_DIGALGID_NULL, the latter will be overridden.>

- EVP_MD_FLAG_DIGALGID_CUSTOM

Custom DigestAlgorithmIdentifier handling via ctrl, with
**EVP_MD_FLAG_DIGALGID_ABSENT** as default.  I<Note: if combined with
EVP_MD_FLAG_DIGALGID_NULL, the latter will be overridden.>
Currently unused.

- EVP_MD_FLAG_FIPS

This digest method is suitable for use in FIPS mode.
Currently unused.


EVP_MD_meth_set_init() sets the digest init function for **md**.
The digest init function is called by EVP_Digest(), EVP_DigestInit(),
EVP_DigestInit_ex(), EVP_SignInit, EVP_SignInit_ex(), EVP_VerifyInit()
and EVP_VerifyInit_ex().

EVP_MD_meth_set_update() sets the digest update function for **md**.
The digest update function is called by EVP_Digest(), EVP_DigestUpdate() and
EVP_SignUpdate().

EVP_MD_meth_set_final() sets the digest final function for **md**.
The digest final function is called by EVP_Digest(), EVP_DigestFinal(),
EVP_DigestFinal_ex(), EVP_SignFinal() and EVP_VerifyFinal().

EVP_MD_meth_set_copy() sets the function for **md** to do extra
computations after the method's private data structure has been copied
from one **EVP_MD_CTX** to another.  If all that's needed is to copy
the data, there is no need for this copy function.
Note that the copy function is passed two **EVP_MD_CTX ***, the private
data structure is then available with EVP_MD_CTX_get0_md_data().
This copy function is called by EVP_MD_CTX_copy() and
EVP_MD_CTX_copy_ex().

EVP_MD_meth_set_cleanup() sets the function for **md** to do extra
cleanup before the method's private data structure is cleaned out and
freed.
Note that the cleanup function is passed a **EVP_MD_CTX ***, the
private data structure is then available with EVP_MD_CTX_get0_md_data().
This cleanup function is called by EVP_MD_CTX_reset() and
EVP_MD_CTX_free().

EVP_MD_meth_set_ctrl() sets the control function for **md**.
See EVP_MD_CTX_ctrl(3) for the available controls.

EVP_MD_meth_get_input_blocksize(), EVP_MD_meth_get_result_size(),
EVP_MD_meth_get_app_datasize(), EVP_MD_meth_get_flags(),
EVP_MD_meth_get_init(), EVP_MD_meth_get_update(),
EVP_MD_meth_get_final(), EVP_MD_meth_get_copy(),
EVP_MD_meth_get_cleanup() and EVP_MD_meth_get_ctrl() are all used
to retrieve the method data given with the EVP_MD_meth_set_*()
functions above.

## RETURN VALUES


EVP_MD_meth_new() and EVP_MD_meth_dup() return a pointer to a newly
created **EVP_MD**, or NULL on failure.
All EVP_MD_meth_set_*() functions return 1.
EVP_MD_get_input_blocksize(), EVP_MD_meth_get_result_size(),
EVP_MD_meth_get_app_datasize() and EVP_MD_meth_get_flags() return the
indicated sizes or flags.
All other EVP_CIPHER_meth_get_*() functions return pointers to their
respective **md** function.

## SEE ALSO


EVP_DigestInit(3), EVP_SignInit(3), EVP_VerifyInit(3)

## HISTORY


All of these functions were deprecated in OpenSSL 3.0.

The **EVP_MD** structure was openly available in OpenSSL before version
1.1.
The functions described here were added in OpenSSL 1.1.
The **EVP_MD** structure created with these functions became reference
counted in OpenSSL 3.0.

## COPYRIGHT


Copyright 2015-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_MD_meth_new.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_MD_meth_new.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_MD_meth_new.pod`；SHA-256：`7290a884fbfe10c13c54115571a0835514826ea257511253c603a680d79b18ea`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
