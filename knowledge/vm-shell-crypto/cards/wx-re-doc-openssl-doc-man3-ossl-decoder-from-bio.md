---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-decoder-from-bio",
  "title": "OpenSSL：密码实现与接口 · OSSL_DECODER_from_bio（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_DECODER_from_bio"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "f071e947b402c9247ec737d0b6a7a24db9080f35fecb600e2f1fb5a4da38d220",
  "generatedHash": "c9e596db8aae7555d46b77056be3155b34626aa92a075a28ab38623f20d7ca46",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_DECODER_from_data, OSSL_DECODER_from_bio, OSSL_DECODER_from_fp - Routines to perform a decoding",
  "l1": "OSSL_DECODER_from_data() runs the decoding process for the context `ctx`, with input coming from `*pdata`, `*pdata_len` bytes long. Both `*pdata` and `*pdata_len` must be non-NULL. When OSSL_DECODER_from_data() returns, `*pdata` is updated to point at the location after what has been decoded, and `*pdata_len` to have the number of remaining bytes. OSSL_DECODER_from_bio() runs the decoding process for the context `ctx`, with the input coming from the **BIO** `in`. Should it make a difference, it's recommended to have the BIO set in binary mode rather than text mode. OSSL_DECODER_from_fp() does the same thing as OSSL_DECODER_from_bio(), except that the input is coming from the **FILE** `fp`.",
  "questions": [
    "OSSL_DECODER_from_bio 如何用于密码实现与接口？",
    "OSSL_DECODER_from_bio 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-decoder-from-bio",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_DECODER_from_bio.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_DECODER_from_bio（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_DECODER_from_data,
OSSL_DECODER_from_bio,
OSSL_DECODER_from_fp
- Routines to perform a decoding

## 技术正文

## NAME


OSSL_DECODER_from_data,
OSSL_DECODER_from_bio,
OSSL_DECODER_from_fp
- Routines to perform a decoding

## SYNOPSIS


```c
#include <openssl/decoder.h>

int OSSL_DECODER_from_bio(OSSL_DECODER_CTX *ctx, BIO *in);
int OSSL_DECODER_from_fp(OSSL_DECODER_CTX *ctx, FILE *fp);
int OSSL_DECODER_from_data(OSSL_DECODER_CTX *ctx, const unsigned char **pdata,
                           size_t *pdata_len);

```

Feature availability macros:


- OSSL_DECODER_from_fp() is only available when **OPENSSL_NO_STDIO**
is undefined.


## DESCRIPTION


OSSL_DECODER_from_data() runs the decoding process for the context `ctx`,
with input coming from `*pdata`, `*pdata_len` bytes long.  Both `*pdata`
and `*pdata_len` must be non-NULL.  When OSSL_DECODER_from_data() returns,
`*pdata` is updated to point at the location after what has been decoded,
and `*pdata_len` to have the number of remaining bytes.

OSSL_DECODER_from_bio() runs the decoding process for the context `ctx`,
with the input coming from the **BIO** `in`.  Should it make a difference,
it's recommended to have the BIO set in binary mode rather than text mode.

OSSL_DECODER_from_fp() does the same thing as OSSL_DECODER_from_bio(),
except that the input is coming from the **FILE** `fp`.

## RETURN VALUES


OSSL_DECODER_from_bio(), OSSL_DECODER_from_data() and OSSL_DECODER_from_fp()
return 1 on success, or 0 on failure.

## EXAMPLES


To decode an RSA key encoded with PEM from a bio:

```c
OSSL_DECODER_CTX *dctx;
EVP_PKEY *pkey = NULL;
const char *format = "PEM";   /* NULL for any format */
const char *structure = NULL; /* any structure */
const char *keytype = "RSA";  /* NULL for any key */
const unsigned char *pass = "my password";

dctx = OSSL_DECODER_CTX_new_for_pkey(&pkey, format, structure,
                                     keytype,
                                     OSSL_KEYMGMT_SELECT_KEYPAIR,
                                     NULL, NULL);
if (dctx == NULL) {
    /* error: no suitable potential decoders found */
}
if (pass != NULL)
    OSSL_DECODER_CTX_set_passphrase(dctx, pass, strlen(pass));
if (OSSL_DECODER_from_bio(dctx, bio)) {
    /* pkey is created with the decoded data from the bio */
} else {
    /* decoding failure */
}
OSSL_DECODER_CTX_free(dctx);

```

To decode an EC key encoded with DER from a buffer:

```c
OSSL_DECODER_CTX *dctx;
EVP_PKEY *pkey = NULL;
const char *format = "DER";   /* NULL for any format */
const char *structure = NULL; /* any structure */
const char *keytype = "EC";   /* NULL for any key */
const unsigned char *pass = NULL
const unsigned char *data = buffer;
size_t datalen = sizeof(buffer);

dctx = OSSL_DECODER_CTX_new_for_pkey(&pkey, format, structure,
                                     keytype,
                                     OSSL_KEYMGMT_SELECT_KEYPAIR
                                     | OSSL_KEYMGMT_SELECT_DOMAIN_PARAMETERS,
                                     NULL, NULL);
if (dctx == NULL) {
    /* error: no suitable potential decoders found */
}
if (pass != NULL)
    OSSL_DECODER_CTX_set_passphrase(dctx, pass, strlen(pass));
if (OSSL_DECODER_from_data(dctx, &data, &datalen)) {
    /* pkey is created with the decoded data from the buffer */
} else {
    /* decoding failure */
}
OSSL_DECODER_CTX_free(dctx);

```

## SEE ALSO


provider(7), OSSL_DECODER_CTX(3)

## HISTORY


The functions described here were added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2020-2023 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_DECODER_from_bio.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_DECODER_from_bio.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_DECODER_from_bio.pod`；SHA-256：`f071e947b402c9247ec737d0b6a7a24db9080f35fecb600e2f1fb5a4da38d220`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
