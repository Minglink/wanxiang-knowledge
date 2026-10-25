---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-encoder-to-bio",
  "title": "OpenSSL：密码实现与接口 · OSSL_ENCODER_to_bio（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_ENCODER_to_bio"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "da801078edd35f3266e76ecdd156a302887db097d6cee707c4a7fcec56c6b286",
  "generatedHash": "6c9664ad62e11a72605e84849ddb72db4061ed84744512b2973bd1023cd0c56e",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_ENCODER_to_data, OSSL_ENCODER_to_bio, OSSL_ENCODER_to_fp - Routines to perform an encoding",
  "l1": "OSSL_ENCODER_to_data() runs the encoding process for the context `ctx`, with the output going to the `*pdata` and `*pdata_len`. If `*pdata` is NULL when OSSL_ENCODER_to_data() is called, a buffer will be allocated using OPENSSL_zalloc(3), and `*pdata` will be set to point at the start of that buffer, and `*pdata_len` will be assigned its length when OSSL_ENCODER_to_data() returns. If `*pdata` is non-NULL when OSSL_ENCODER_to_data() is called, `*pdata_len` is assumed to have its size. In this case, `*pdata` will be set to point after the encoded bytes, and `*pdata_len` will be assigned the number of remaining bytes. OSSL_ENCODER_to_bio() runs the encoding process for the context `ctx`, with the output going to the **BIO** `out`. OSSL_ENCODER_to_fp() does the same thing as OSSL_ENCODER_to_bio(), except that the output is going to the **FILE",
  "questions": [
    "OSSL_ENCODER_to_bio 如何用于密码实现与接口？",
    "OSSL_ENCODER_to_bio 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-encoder-to-bio",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_ENCODER_to_bio.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_ENCODER_to_bio（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_ENCODER_to_data,
OSSL_ENCODER_to_bio,
OSSL_ENCODER_to_fp
- Routines to perform an encoding

## 技术正文

## NAME


OSSL_ENCODER_to_data,
OSSL_ENCODER_to_bio,
OSSL_ENCODER_to_fp
- Routines to perform an encoding

## SYNOPSIS


```c
#include <openssl/encoder.h>

int OSSL_ENCODER_to_data(OSSL_ENCODER_CTX *ctx, unsigned char **pdata,
                         size_t *pdata_len);
int OSSL_ENCODER_to_bio(OSSL_ENCODER_CTX *ctx, BIO *out);
int OSSL_ENCODER_to_fp(OSSL_ENCODER_CTX *ctx, FILE *fp);

```

Feature availability macros:


- OSSL_ENCODER_to_fp() is only available when **OPENSSL_NO_STDIO**
is undefined.


## DESCRIPTION


OSSL_ENCODER_to_data() runs the encoding process for the context `ctx`,
with the output going to the `*pdata` and `*pdata_len`.
If `*pdata` is NULL when OSSL_ENCODER_to_data() is called, a buffer will be
allocated using OPENSSL_zalloc(3), and `*pdata` will be set to point at
the start of that buffer, and `*pdata_len` will be assigned its length when
OSSL_ENCODER_to_data() returns.
If `*pdata` is non-NULL when OSSL_ENCODER_to_data() is called, `*pdata_len`
is assumed to have its size.  In this case, `*pdata` will be set to point
after the encoded bytes, and `*pdata_len` will be assigned the number of
remaining bytes.

OSSL_ENCODER_to_bio() runs the encoding process for the context `ctx`, with
the output going to the **BIO** `out`.

OSSL_ENCODER_to_fp() does the same thing as OSSL_ENCODER_to_bio(), except
that the output is going to the **FILE** `fp`.


For OSSL_ENCODER_to_bio() and OSSL_ENCODER_to_fp(), the application is
required to set up the **BIO** or **FILE** properly, for example to have
it in text or binary mode as is appropriate for the encoder output type.

## RETURN VALUES


OSSL_ENCODER_to_bio(), OSSL_ENCODER_to_fp() and OSSL_ENCODER_to_data()
return 1 on success, or 0 on failure.

## EXAMPLES


To encode a pkey as PKCS#8 with PEM format into a bio:

```c
OSSL_ENCODER_CTX *ectx;
const char *format = "PEM";
const char *structure = "PrivateKeyInfo"; /* PKCS#8 structure */
const unsigned char *pass = "my password";

ectx = OSSL_ENCODER_CTX_new_for_pkey(pkey,
                                     OSSL_KEYMGMT_SELECT_KEYPAIR
                                     | OSSL_KEYMGMT_SELECT_DOMAIN_PARAMETERS,
                                     format, structure,
                                     NULL);
if (ectx == NULL) {
    /* error: no suitable potential encoders found */
}
if (pass != NULL)
    OSSL_ENCODER_CTX_set_passphrase(ectx, pass, strlen(pass));
if (OSSL_ENCODER_to_bio(ectx, bio)) {
    /* pkey was successfully encoded into the bio */
} else {
    /* encoding failure */
}
OSSL_ENCODER_CTX_free(ectx);

```

To encode a pkey as PKCS#8 with DER format encrypted with
AES-256-CBC into a buffer:

```c
OSSL_ENCODER_CTX *ectx;
const char *format = "DER";
const char *structure = "PrivateKeyInfo"; /* PKCS#8 structure */
const unsigned char *pass = "my password";
unsigned char *data = NULL;
size_t datalen;

ectx = OSSL_ENCODER_CTX_new_for_pkey(pkey,
                                     OSSL_KEYMGMT_SELECT_KEYPAIR
                                     | OSSL_KEYMGMT_SELECT_DOMAIN_PARAMETERS,
                                     format, structure,
                                     NULL);
if (ectx == NULL) {
    /* error: no suitable potential encoders found */
}
if (pass != NULL) {
    OSSL_ENCODER_CTX_set_passphrase(ectx, pass, strlen(pass));
    OSSL_ENCODER_CTX_set_cipher(ctx, "AES-256-CBC", NULL);
}
if (OSSL_ENCODER_to_data(ectx, &data, &datalen)) {
    /*
     * pkey was successfully encoded into a newly allocated
     * data buffer
     */
} else {
    /* encoding failure */
}
OSSL_ENCODER_CTX_free(ectx);

```

## SEE ALSO


provider(7), OSSL_ENCODER_CTX(3)

## HISTORY


The functions described here were added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2019-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_ENCODER_to_bio.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_ENCODER_to_bio.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_ENCODER_to_bio.pod`；SHA-256：`da801078edd35f3266e76ecdd156a302887db097d6cee707c4a7fcec56c6b286`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
