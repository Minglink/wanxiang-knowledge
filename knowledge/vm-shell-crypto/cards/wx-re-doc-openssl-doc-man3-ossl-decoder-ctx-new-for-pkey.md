---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-decoder-ctx-new-for-pkey",
  "title": "OpenSSL：密码实现与接口 · OSSL_DECODER_CTX_new_for_pkey（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_DECODER_CTX_new_for_pkey"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "5784e5882de01ad0863de781da803c0f522af6b5706012755a90d7682861b1fc",
  "generatedHash": "69495b76697e8b6612c521e47d12f894f56edf2d04b64c31f3a2c6bbe96ca3e0",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_DECODER_CTX_new_for_pkey, OSSL_DECODER_CTX_set_passphrase, OSSL_DECODER_CTX_set_pem_password_cb, OSSL_DECODER_CTX_set_passphrase_ui, OSSL_DECODER_CTX_set_passphrase_cb - Decoder routines to decode EVP_PKEYs",
  "l1": "OSSL_DECODER_CTX_new_for_pkey() is a utility function that creates a **OSSL_DECODER_CTX**, finds all applicable decoder implementations and sets them up, so all the caller has to do next is call functions like OSSL_DECODER_from_bio(3). The caller may use the optional `input_type`, `input_struct`, `keytype` and `selection` to specify what the input is expected to contain. The `pkey` must reference an **EVP_PKEY *** variable that will be set to the newly created **EVP_PKEY** on successful decoding. The referenced variable must be initialized to NULL before calling the function. Internally OSSL_DECODER_CTX_new_for_pkey() searches for all available EVP_KEYMGMT(3) implementations, and then builds a list of all potential decoder implementations that may be able to process the encoded input into data suitable for **EVP_PKEY**s. All these impleme",
  "questions": [
    "OSSL_DECODER_CTX_new_for_pkey 如何用于密码实现与接口？",
    "OSSL_DECODER_CTX_new_for_pkey 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-decoder-ctx-new-for-pkey",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_DECODER_CTX_new_for_pkey.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_DECODER_CTX_new_for_pkey（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_DECODER_CTX_new_for_pkey,
OSSL_DECODER_CTX_set_passphrase,
OSSL_DECODER_CTX_set_pem_password_cb,
OSSL_DECODER_CTX_set_passphrase_ui,
OSSL_DECODER_CTX_set_passphrase_cb
- Decoder routines to decode EVP_PKEYs

## 技术正文

## NAME


OSSL_DECODER_CTX_new_for_pkey,
OSSL_DECODER_CTX_set_passphrase,
OSSL_DECODER_CTX_set_pem_password_cb,
OSSL_DECODER_CTX_set_passphrase_ui,
OSSL_DECODER_CTX_set_passphrase_cb
- Decoder routines to decode EVP_PKEYs

## SYNOPSIS


```c
#include <openssl/decoder.h>

OSSL_DECODER_CTX *
OSSL_DECODER_CTX_new_for_pkey(EVP_PKEY **pkey,
                              const char *input_type,
                              const char *input_struct,
                              const char *keytype, int selection,
                              OSSL_LIB_CTX *libctx, const char *propquery);

int OSSL_DECODER_CTX_set_passphrase(OSSL_DECODER_CTX *ctx,
                                    const unsigned char *kstr,
                                    size_t klen);
int OSSL_DECODER_CTX_set_pem_password_cb(OSSL_DECODER_CTX *ctx,
                                         pem_password_cb *cb,
                                         void *cbarg);
int OSSL_DECODER_CTX_set_passphrase_ui(OSSL_DECODER_CTX *ctx,
                                       const UI_METHOD *ui_method,
                                       void *ui_data);
int OSSL_DECODER_CTX_set_passphrase_cb(OSSL_DECODER_CTX *ctx,
                                       OSSL_PASSPHRASE_CALLBACK *cb,
                                       void *cbarg);

```

## DESCRIPTION


OSSL_DECODER_CTX_new_for_pkey() is a utility function that creates a
**OSSL_DECODER_CTX**, finds all applicable decoder implementations and sets
them up, so all the caller has to do next is call functions like
OSSL_DECODER_from_bio(3).  The caller may use the optional `input_type`,
`input_struct`, `keytype` and `selection` to specify what the input is
expected to contain.  The `pkey` must reference an **EVP_PKEY *** variable
that will be set to the newly created **EVP_PKEY** on successful decoding.
The referenced variable must be initialized to NULL before calling the
function.

Internally OSSL_DECODER_CTX_new_for_pkey() searches for all available
EVP_KEYMGMT(3) implementations, and then builds a list of all potential
decoder implementations that may be able to process the encoded input into
data suitable for **EVP_PKEY**s.  All these implementations are implicitly
fetched using `libctx` and `propquery`.

The search of decoder implementations can be limited with `input_type` and
`input_struct` which specifies a starting input type and input structure.
NULL is valid for both of them and signifies that the decoder implementations
will find out the input type on their own.
They are set with OSSL_DECODER_CTX_set_input_type(3) and
OSSL_DECODER_CTX_set_input_structure(3).
See /Input Types and /Input Structures below for further information.

The search of decoder implementations can also be limited with `keytype`
and `selection`, which specifies the expected resulting keytype and contents.
NULL and zero are valid and signify that the decoder implementations will
find out the keytype and key contents on their own from the input they get.

If no suitable decoder implementation is found,
OSSL_DECODER_CTX_new_for_pkey() still creates a **OSSL_DECODER_CTX**, but
with no associated decoder (OSSL_DECODER_CTX_get_num_decoders(3) returns
zero).  This helps the caller to distinguish between an error when creating
the **OSSL_ENCODER_CTX** and missing encoder implementation, and allows it to
act accordingly.

OSSL_DECODER_CTX_set_passphrase() gives the implementation a pass phrase to
use when decrypting the encoded private key. Alternatively, a pass phrase
callback may be specified with the following functions.

OSSL_DECODER_CTX_set_pem_password_cb(), OSSL_DECODER_CTX_set_passphrase_ui()
and OSSL_DECODER_CTX_set_passphrase_cb() set up a callback method that the
implementation can use to prompt for a pass phrase, giving the caller the
choice of preferred pass phrase callback form.  These are called indirectly,
through an internal OSSL_PASSPHRASE_CALLBACK(3) function.

The internal OSSL_PASSPHRASE_CALLBACK(3) function caches the pass phrase, to
be reused in all decodings that are performed in the same decoding run (for
example, within one OSSL_DECODER_from_bio(3) call).

### Input Types


Available input types depend on the implementations that available providers
offer, and provider documentation should have the details.

Among the known input types that OpenSSL decoder implementations offer
for **EVP_PKEY**s are `DER`, `PEM`, `MSBLOB` and `PVK`.
See openssl-glossary(7) for further information on what these input
types mean.

### Input Structures


Available input structures depend on the implementations that available
providers offer, and provider documentation should have the details.

Among the known input structures that OpenSSL decoder implementations
offer for **EVP_PKEY**s are `pkcs8` and `SubjectPublicKeyInfo`.

OpenSSL decoder implementations also support the input structure
`type-specific`.  This is the structure used for keys encoded
according to key type specific specifications.  For example, RSA keys
encoded according to PKCS#1.

### Selections


`selection` can be any one of the values described in
EVP_PKEY_fromdata(3)/Selections.
Additionally `selection` can also be set to **0** to indicate that the code will
auto detect the selection.

## RETURN VALUES


OSSL_DECODER_CTX_new_for_pkey() returns a pointer to a
**OSSL_DECODER_CTX**, or NULL if it couldn't be created.

OSSL_DECODER_CTX_set_passphrase(), OSSL_DECODER_CTX_set_pem_password_cb(),
OSSL_DECODER_CTX_set_passphrase_ui() and
OSSL_DECODER_CTX_set_passphrase_cb() all return 1 on success, or 0 on
failure.

## SEE ALSO


provider(7), OSSL_DECODER(3), OSSL_DECODER_CTX(3)

## HISTORY


The functions described here were added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2020-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_DECODER_CTX_new_for_pkey.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_DECODER_CTX_new_for_pkey.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_DECODER_CTX_new_for_pkey.pod`；SHA-256：`5784e5882de01ad0863de781da803c0f522af6b5706012755a90d7682861b1fc`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
