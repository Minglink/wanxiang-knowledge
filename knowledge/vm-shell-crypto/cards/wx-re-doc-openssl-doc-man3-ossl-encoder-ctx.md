---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-encoder-ctx",
  "title": "OpenSSL：密码实现与接口 · OSSL_ENCODER_CTX（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_ENCODER_CTX"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "3a701a6d5023f2a78f9b2ee9505802d4fae7960bc89d1dbee2359f4665f93783",
  "generatedHash": "fd008ecb2ec72671bc78d36cf4920a464036840666bc5dfe99b567d17fe2e5b7",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_ENCODER_CTX, OSSL_ENCODER_CTX_new, OSSL_ENCODER_settable_ctx_params, OSSL_ENCODER_CTX_set_params, OSSL_ENCODER_CTX_free, OSSL_ENCODER_CTX_set_selection, OSSL_ENCODER_CTX_set_output_type, OSSL_ENCODER_CTX_set_output_structure, OSSL_ENCODER_CTX_add_encoder, OSSL_ENCODER_CTX_add_extra, OSSL_ENCODE",
  "l1": "Encoding an input object to the desired encoding may be done with a chain of encoder implementations, which means that the output from one encoder may be the input for the next in the chain. The **OSSL_ENCODER_CTX** holds all the data about these encoders. This allows having generic format encoders such as DER to PEM, as well as more specialized encoders like RSA to DER. The final output type must be given, and a chain of encoders must end with an implementation that produces that output type. At the beginning of the encoding process, a constructor provided by the caller is called to ensure that there is an appropriate provider-side object to start with. The constructor is set with OSSL_ENCODER_CTX_set_construct(). **OSSL_ENCODER_INSTANCE** is an opaque structure that contains data about the encoder that is going to be used, and that may ",
  "questions": [
    "OSSL_ENCODER_CTX 如何用于密码实现与接口？",
    "OSSL_ENCODER_CTX 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-encoder-ctx",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_ENCODER_CTX.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_ENCODER_CTX（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_ENCODER_CTX,
OSSL_ENCODER_CTX_new,
OSSL_ENCODER_settable_ctx_params,
OSSL_ENCODER_CTX_set_params,
OSSL_ENCODER_CTX_free,
OSSL_ENCODER_CTX_set_selection,
OSSL_ENCODER_CTX_set_output_type,
OSSL_ENCODER_CTX_set_output_structure,
OSSL_ENCODER_CTX_add_encoder,
OSSL_ENCODER_CTX_add_extra,
OSSL_ENCODER_CTX_get_num_encoders,
OSSL_ENCODER_INSTANCE,
OSSL_ENCODER_INSTANCE_get_encoder,
OSSL_ENCODER_INSTANCE_get_encoder_ctx,
OSSL_ENCODER_INSTANCE_get_output_type,
OSSL_ENCODER_INSTANCE_get_output_structure,
OSSL_ENCODER_CONSTRUCT,
OSSL_ENCODER_CLEANUP,
OSSL_ENCODER_CTX_set_construct,
OSSL_ENCODER_CTX_set_construct_data,
OSSL_ENCODER_CTX_set_cleanup
- Encoder context routines

## 技术正文

## NAME


OSSL_ENCODER_CTX,
OSSL_ENCODER_CTX_new,
OSSL_ENCODER_settable_ctx_params,
OSSL_ENCODER_CTX_set_params,
OSSL_ENCODER_CTX_free,
OSSL_ENCODER_CTX_set_selection,
OSSL_ENCODER_CTX_set_output_type,
OSSL_ENCODER_CTX_set_output_structure,
OSSL_ENCODER_CTX_add_encoder,
OSSL_ENCODER_CTX_add_extra,
OSSL_ENCODER_CTX_get_num_encoders,
OSSL_ENCODER_INSTANCE,
OSSL_ENCODER_INSTANCE_get_encoder,
OSSL_ENCODER_INSTANCE_get_encoder_ctx,
OSSL_ENCODER_INSTANCE_get_output_type,
OSSL_ENCODER_INSTANCE_get_output_structure,
OSSL_ENCODER_CONSTRUCT,
OSSL_ENCODER_CLEANUP,
OSSL_ENCODER_CTX_set_construct,
OSSL_ENCODER_CTX_set_construct_data,
OSSL_ENCODER_CTX_set_cleanup
- Encoder context routines

## SYNOPSIS


```c
#include <openssl/encoder.h>

typedef struct ossl_encoder_ctx_st OSSL_ENCODER_CTX;

OSSL_ENCODER_CTX *OSSL_ENCODER_CTX_new();
const OSSL_PARAM *OSSL_ENCODER_settable_ctx_params(OSSL_ENCODER *encoder);
int OSSL_ENCODER_CTX_set_params(OSSL_ENCODER_CTX *ctx,
                                const OSSL_PARAM params[]);
void OSSL_ENCODER_CTX_free(OSSL_ENCODER_CTX *ctx);

int OSSL_ENCODER_CTX_set_selection(OSSL_ENCODER_CTX *ctx, int selection);
int OSSL_ENCODER_CTX_set_output_type(OSSL_ENCODER_CTX *ctx,
                                     const char *output_type);
int OSSL_ENCODER_CTX_set_output_structure(OSSL_ENCODER_CTX *ctx,
                                          const char *output_structure);

int OSSL_ENCODER_CTX_add_encoder(OSSL_ENCODER_CTX *ctx, OSSL_ENCODER *encoder);
int OSSL_ENCODER_CTX_add_extra(OSSL_ENCODER_CTX *ctx,
                               OSSL_LIB_CTX *libctx, const char *propq);
int OSSL_ENCODER_CTX_get_num_encoders(OSSL_ENCODER_CTX *ctx);

typedef struct ossl_encoder_instance_st OSSL_ENCODER_INSTANCE;
OSSL_ENCODER *
OSSL_ENCODER_INSTANCE_get_encoder(OSSL_ENCODER_INSTANCE *encoder_inst);
void *
OSSL_ENCODER_INSTANCE_get_encoder_ctx(OSSL_ENCODER_INSTANCE *encoder_inst);
const char *
OSSL_ENCODER_INSTANCE_get_output_type(OSSL_ENCODER_INSTANCE *encoder_inst);
const char *
OSSL_ENCODER_INSTANCE_get_output_structure(OSSL_ENCODER_INSTANCE *encoder_inst);

typedef const void *OSSL_ENCODER_CONSTRUCT(OSSL_ENCODER_INSTANCE *encoder_inst,
                                           void *construct_data);
typedef void OSSL_ENCODER_CLEANUP(void *construct_data);

int OSSL_ENCODER_CTX_set_construct(OSSL_ENCODER_CTX *ctx,
                                   OSSL_ENCODER_CONSTRUCT *construct);
int OSSL_ENCODER_CTX_set_construct_data(OSSL_ENCODER_CTX *ctx,
                                        void *construct_data);
int OSSL_ENCODER_CTX_set_cleanup(OSSL_ENCODER_CTX *ctx,
                                 OSSL_ENCODER_CLEANUP *cleanup);

```

## DESCRIPTION


Encoding an input object to the desired encoding may be done with a chain of
encoder implementations, which means that the output from one encoder may be
the input for the next in the chain.  The **OSSL_ENCODER_CTX** holds all the
data about these encoders.  This allows having generic format encoders such
as DER to PEM, as well as more specialized encoders like RSA to DER.

The final output type must be given, and a chain of encoders must end with
an implementation that produces that output type.

At the beginning of the encoding process, a constructor provided by the
caller is called to ensure that there is an appropriate provider-side object
to start with.
The constructor is set with OSSL_ENCODER_CTX_set_construct().

**OSSL_ENCODER_INSTANCE** is an opaque structure that contains data about the
encoder that is going to be used, and that may be useful for the
constructor.  There are some functions to extract data from this type,
described in /Constructor below.

### Functions


OSSL_ENCODER_CTX_new() creates a **OSSL_ENCODER_CTX**.

OSSL_ENCODER_settable_ctx_params() returns an OSSL_PARAM(3)
array of parameter descriptors.

OSSL_ENCODER_CTX_set_params() attempts to set parameters specified
with an OSSL_PARAM(3) array `params`.  Parameters that the
implementation doesn't recognise should be ignored.

OSSL_ENCODER_CTX_free() frees the given context `ctx`.
If the argument is NULL, nothing is done.

OSSL_ENCODER_CTX_add_encoder() populates the **OSSL_ENCODER_CTX**
`ctx` with a encoder, to be used to encode an input object.

OSSL_ENCODER_CTX_add_extra() finds encoders that further encodes output
from already added encoders, and adds them as well.  This is used to build
encoder chains.

OSSL_ENCODER_CTX_set_output_type() sets the ending output type.  This must
be specified, and determines if a complete encoder chain is available.

OSSL_ENCODER_CTX_set_output_structure() sets the desired output structure.
This may be used to determines what encoder implementations may be used.
Depending on the type of object being encoded, the output structure may
not be relevant.

OSSL_ENCODER_CTX_get_num_encoders() gets the number of encoders currently
added to the context `ctx`.

OSSL_ENCODER_CTX_set_construct() sets the constructor `construct`.

OSSL_ENCODER_CTX_set_construct_data() sets the constructor data that is
passed to the constructor every time it's called.

OSSL_ENCODER_CTX_set_cleanup() sets the constructor data `cleanup`
function.  This is called by OSSL_ENCODER_CTX_free(3).

### Constructor


A **OSSL_ENCODER_CONSTRUCT** gets the following arguments:


- `encoder_inst`

The **OSSL_ENCODER_INSTANCE** for the encoder from which the constructor gets
its data.

- `construct_data`

The pointer that was set with OSSL_ENCODE_CTX_set_construct_data().


The constructor is expected to return a valid (non-NULL) pointer to a
provider-native object that can be used as first input of an encoding chain,
or NULL to indicate that an error has occurred.

These utility functions may be used by a constructor:

OSSL_ENCODER_INSTANCE_get_encoder() can be used to get the encoder
implementation of the encoder instance `encoder_inst`.

OSSL_ENCODER_INSTANCE_get_encoder_ctx() can be used to get the encoder
implementation's provider context of the encoder instance `encoder_inst`.

OSSL_ENCODER_INSTANCE_get_output_type() can be used to get the output type
for the encoder implementation of the encoder instance `encoder_inst`.
This will never be NULL.

OSSL_ENCODER_INSTANCE_get_output_structure() can be used to get the output
structure for the encoder implementation of the encoder instance
`encoder_inst`.
This may be NULL.

## RETURN VALUES


OSSL_ENCODER_CTX_new() returns a pointer to a **OSSL_ENCODER_CTX**, or NULL
if the context structure couldn't be allocated.

OSSL_ENCODER_settable_ctx_params() returns an OSSL_PARAM(3) array, or
NULL if none is available.

OSSL_ENCODER_CTX_set_params() returns 1 if all recognised parameters were
valid, or 0 if one of them was invalid or caused some other failure in the
implementation.

OSSL_ENCODER_CTX_add_encoder(), OSSL_ENCODER_CTX_add_extra(),
OSSL_ENCODER_CTX_set_construct(), OSSL_ENCODER_CTX_set_construct_data() and
OSSL_ENCODER_CTX_set_cleanup() return 1 on success, or 0 on failure.

OSSL_ENCODER_CTX_get_num_encoders() returns the current number of encoders.
It returns 0 if `ctx` is NULL.

OSSL_ENCODER_INSTANCE_get_encoder() returns an **OSSL_ENCODER** pointer on
success, or NULL on failure.

OSSL_ENCODER_INSTANCE_get_encoder_ctx() returns a provider context pointer on
success, or NULL on failure.

OSSL_ENCODER_INSTANCE_get_output_type() returns a string with the name of the
input type, if relevant.  NULL is a valid returned value.

OSSL_ENCODER_INSTANCE_get_output_type() returns a string with the name of the
output type.

OSSL_ENCODER_INSTANCE_get_output_structure() returns a string with the name
of the output structure.

## SEE ALSO


provider(7), OSSL_ENCODER(3)

## HISTORY


The functions described here were added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2019-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_ENCODER_CTX.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_ENCODER_CTX.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_ENCODER_CTX.pod`；SHA-256：`3a701a6d5023f2a78f9b2ee9505802d4fae7960bc89d1dbee2359f4665f93783`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
