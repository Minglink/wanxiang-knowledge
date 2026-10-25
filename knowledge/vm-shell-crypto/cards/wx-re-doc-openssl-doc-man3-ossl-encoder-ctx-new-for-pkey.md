---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-encoder-ctx-new-for-pkey",
  "title": "OpenSSL：密码实现与接口 · OSSL_ENCODER_CTX_new_for_pkey（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_ENCODER_CTX_new_for_pkey"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "7227c894b6881722f63caf5363c575301fe03f70ba413a72e2cb2e0ad67e7284",
  "generatedHash": "efa205d7bbcb31c5f88d1da5c3e932dcada3211164c99c22bcfc5351f0c3c2c5",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_ENCODER_CTX_new_for_pkey, OSSL_ENCODER_CTX_set_cipher, OSSL_ENCODER_CTX_set_passphrase, OSSL_ENCODER_CTX_set_pem_password_cb, OSSL_ENCODER_CTX_set_passphrase_cb, OSSL_ENCODER_CTX_set_passphrase_ui - Encoder routines to encode EVP_PKEYs",
  "l1": "OSSL_ENCODER_CTX_new_for_pkey() is a utility function that creates a **OSSL_ENCODER_CTX**, finds all applicable encoder implementations and sets them up, so almost all the caller has to do next is call functions like OSSL_ENCODER_to_bio(3). `output_type` determines the final output encoding, and `selection` can be used to select what parts of the `pkey` should be included in the output. `output_type` is further discussed in /Output types below, and `selection` is further described in /Selections. Internally, OSSL_ENCODER_CTX_new_for_pkey() uses the names from the EVP_KEYMGMT(3) implementation associated with `pkey` to build a list of applicable encoder implementations that are used to process the `pkey` into the encoding named by `output_type`, with the outermost structure named by `output_structure` if that's relevant. All these implemen",
  "questions": [
    "OSSL_ENCODER_CTX_new_for_pkey 如何用于密码实现与接口？",
    "OSSL_ENCODER_CTX_new_for_pkey 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-encoder-ctx-new-for-pkey",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_ENCODER_CTX_new_for_pkey.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_ENCODER_CTX_new_for_pkey（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_ENCODER_CTX_new_for_pkey,
OSSL_ENCODER_CTX_set_cipher,
OSSL_ENCODER_CTX_set_passphrase,
OSSL_ENCODER_CTX_set_pem_password_cb,
OSSL_ENCODER_CTX_set_passphrase_cb,
OSSL_ENCODER_CTX_set_passphrase_ui
- Encoder routines to encode EVP_PKEYs

## 技术正文

## NAME


OSSL_ENCODER_CTX_new_for_pkey,
OSSL_ENCODER_CTX_set_cipher,
OSSL_ENCODER_CTX_set_passphrase,
OSSL_ENCODER_CTX_set_pem_password_cb,
OSSL_ENCODER_CTX_set_passphrase_cb,
OSSL_ENCODER_CTX_set_passphrase_ui
- Encoder routines to encode EVP_PKEYs

## SYNOPSIS


```c
#include <openssl/encoder.h>

OSSL_ENCODER_CTX *
OSSL_ENCODER_CTX_new_for_pkey(const EVP_PKEY *pkey, int selection,
                              const char *output_type,
                              const char *output_structure,
                              const char *propquery);

int OSSL_ENCODER_CTX_set_cipher(OSSL_ENCODER_CTX *ctx,
                                const char *cipher_name,
                                const char *propquery);
int OSSL_ENCODER_CTX_set_passphrase(OSSL_ENCODER_CTX *ctx,
                                    const unsigned char *kstr,
                                    size_t klen);
int OSSL_ENCODER_CTX_set_pem_password_cb(OSSL_ENCODER_CTX *ctx,
                                         pem_password_cb *cb, void *cbarg);
int OSSL_ENCODER_CTX_set_passphrase_ui(OSSL_ENCODER_CTX *ctx,
                                       const UI_METHOD *ui_method,
                                       void *ui_data);
int OSSL_ENCODER_CTX_set_passphrase_cb(OSSL_ENCODER_CTX *ctx,
                                       OSSL_PASSPHRASE_CALLBACK *cb,
                                       void *cbarg);

```

## DESCRIPTION


OSSL_ENCODER_CTX_new_for_pkey() is a utility function that creates a
**OSSL_ENCODER_CTX**, finds all applicable encoder implementations and sets
them up, so almost all the caller has to do next is call functions like
OSSL_ENCODER_to_bio(3).  `output_type` determines the final output
encoding, and `selection` can be used to select what parts of the `pkey`
should be included in the output.  `output_type` is further discussed in
/Output types below, and `selection` is further described in
/Selections.

Internally, OSSL_ENCODER_CTX_new_for_pkey() uses the names from the
EVP_KEYMGMT(3) implementation associated with `pkey` to build a list of
applicable encoder implementations that are used to process the `pkey` into
the encoding named by `output_type`, with the outermost structure named by
`output_structure` if that's relevant.  All these implementations are
implicitly fetched, with `propquery` for finer selection.

If no suitable encoder implementation is found,
OSSL_ENCODER_CTX_new_for_pkey() still creates a **OSSL_ENCODER_CTX**, but
with no associated encoder (OSSL_ENCODER_CTX_get_num_encoders(3) returns
zero).  This helps the caller to distinguish between an error when creating
the **OSSL_ENCODER_CTX** and missing encoder implementation, and allows it to
act accordingly.

OSSL_ENCODER_CTX_set_cipher() tells the implementation what cipher
should be used to encrypt encoded keys.  The cipher is given by
name `cipher_name`.  The interpretation of that `cipher_name` is
implementation dependent.  The implementation may implement the cipher
directly itself or by other implementations, or it may choose to fetch
it.  If the implementation supports fetching the cipher, then it may
use `propquery` as properties to be queried for when fetching.
`cipher_name` may also be NULL, which will result in unencrypted
encoding.

OSSL_ENCODER_CTX_set_passphrase() gives the implementation a
pass phrase to use when encrypting the encoded private key.
Alternatively, a pass phrase callback may be specified with the
following functions.

OSSL_ENCODER_CTX_set_pem_password_cb(), OSSL_ENCODER_CTX_set_passphrase_ui()
and OSSL_ENCODER_CTX_set_passphrase_cb() sets up a callback method that the
implementation can use to prompt for a pass phrase, giving the caller the
choice of preferred pass phrase callback form.  These are called indirectly,
through an internal OSSL_PASSPHRASE_CALLBACK(3) function.

### Output types


The possible **EVP_PKEY** output types depends on the available
implementations.

OpenSSL has built in implementations for the following output types:


- `TEXT`

The output is a human readable description of the key.
EVP_PKEY_print_private(3), EVP_PKEY_print_public(3) and
EVP_PKEY_print_params(3) use this for their output.

- `DER`

The output is the DER encoding of the `selection` of the `pkey`.

- `PEM`

The output is the `selection` of the `pkey` in PEM format.


### Selections


`selection` can be any one of the values described in
EVP_PKEY_fromdata(3)/Selections.

These are only 'hints' since the encoder implementations are free to
determine what makes sense to include in the output, and this may depend on
the desired output.  For example, an EC key in a PKCS#8 structure doesn't
usually include the public key.

## RETURN VALUES


OSSL_ENCODER_CTX_new_for_pkey() returns a pointer to an **OSSL_ENCODER_CTX**,
or NULL if it couldn't be created.

OSSL_ENCODER_CTX_set_cipher(), OSSL_ENCODER_CTX_set_passphrase(),
OSSL_ENCODER_CTX_set_pem_password_cb(), OSSL_ENCODER_CTX_set_passphrase_ui()
and OSSL_ENCODER_CTX_set_passphrase_cb() all return 1 on success, or 0 on
failure.

## SEE ALSO


provider(7), OSSL_ENCODER(3), OSSL_ENCODER_CTX(3)

## HISTORY


The functions described here were added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2019-2022 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_ENCODER_CTX_new_for_pkey.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_ENCODER_CTX_new_for_pkey.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_ENCODER_CTX_new_for_pkey.pod`；SHA-256：`7227c894b6881722f63caf5363c575301fe03f70ba413a72e2cb2e0ad67e7284`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
