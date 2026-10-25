---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-decoder",
  "title": "OpenSSL：密码实现与接口 · OSSL_DECODER（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_DECODER"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "817f086e296e0b73c651ad85c11b47e76ca28bb57eb21b6e9157a39395fb3c8c",
  "generatedHash": "6b19557587752ae1e3f3899e6192df8f4f89c34ecce9946c89db50526f98f935",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_DECODER, OSSL_DECODER_fetch, OSSL_DECODER_up_ref, OSSL_DECODER_free, OSSL_DECODER_get0_provider, OSSL_DECODER_get0_properties, OSSL_DECODER_is_a, OSSL_DECODER_get0_name, OSSL_DECODER_get0_description, OSSL_DECODER_do_all_provided, OSSL_DECODER_names_do_all, OSSL_DECODER_gettable_params, OSSL_DE",
  "l1": "**OSSL_DECODER** is a method for decoders, which know how to decode encoded data into an object of some type that the rest of OpenSSL knows how to handle. OSSL_DECODER_fetch() looks for an algorithm within the provider that has been loaded into the **OSSL_LIB_CTX** given by `ctx`, having the name given by `name` and the properties given by `properties`. The `name` determines what type of object the fetched decoder method is expected to be able to decode, and the properties are used to determine the expected output type. For known properties and the values they may have, please have a look in provider-encoder(7)/Names and properties. OSSL_DECODER_up_ref() increments the reference count for the given `decoder`. OSSL_DECODER_free() decrements the reference count for the given `decoder`, and when the count reaches zero, frees it. If the argum",
  "questions": [
    "OSSL_DECODER 如何用于密码实现与接口？",
    "OSSL_DECODER 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-decoder",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_DECODER.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_DECODER（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_DECODER,
OSSL_DECODER_fetch,
OSSL_DECODER_up_ref,
OSSL_DECODER_free,
OSSL_DECODER_get0_provider,
OSSL_DECODER_get0_properties,
OSSL_DECODER_is_a,
OSSL_DECODER_get0_name,
OSSL_DECODER_get0_description,
OSSL_DECODER_do_all_provided,
OSSL_DECODER_names_do_all,
OSSL_DECODER_gettable_params,
OSSL_DECODER_get_params
- Decoder method routines

## 技术正文

## NAME


OSSL_DECODER,
OSSL_DECODER_fetch,
OSSL_DECODER_up_ref,
OSSL_DECODER_free,
OSSL_DECODER_get0_provider,
OSSL_DECODER_get0_properties,
OSSL_DECODER_is_a,
OSSL_DECODER_get0_name,
OSSL_DECODER_get0_description,
OSSL_DECODER_do_all_provided,
OSSL_DECODER_names_do_all,
OSSL_DECODER_gettable_params,
OSSL_DECODER_get_params
- Decoder method routines

## SYNOPSIS


```c
#include <openssl/decoder.h>

typedef struct ossl_decoder_st OSSL_DECODER;

OSSL_DECODER *OSSL_DECODER_fetch(OSSL_LIB_CTX *ctx, const char *name,
                                 const char *properties);
int OSSL_DECODER_up_ref(OSSL_DECODER *decoder);
void OSSL_DECODER_free(OSSL_DECODER *decoder);
const OSSL_PROVIDER *OSSL_DECODER_get0_provider(const OSSL_DECODER *decoder);
const char *OSSL_DECODER_get0_properties(const OSSL_DECODER *decoder);
int OSSL_DECODER_is_a(const OSSL_DECODER *decoder, const char *name);
const char *OSSL_DECODER_get0_name(const OSSL_DECODER *decoder);
const char *OSSL_DECODER_get0_description(const OSSL_DECODER *decoder);
void OSSL_DECODER_do_all_provided(OSSL_LIB_CTX *libctx,
                                  void (*fn)(OSSL_DECODER *decoder, void *arg),
                                  void *arg);
int OSSL_DECODER_names_do_all(const OSSL_DECODER *decoder,
                              void (*fn)(const char *name, void *data),
                              void *data);
const OSSL_PARAM *OSSL_DECODER_gettable_params(OSSL_DECODER *decoder);
int OSSL_DECODER_get_params(OSSL_DECODER_CTX *ctx, const OSSL_PARAM params[]);

```

## DESCRIPTION


**OSSL_DECODER** is a method for decoders, which know how to
decode encoded data into an object of some type that the rest
of OpenSSL knows how to handle.

OSSL_DECODER_fetch() looks for an algorithm within the provider that
has been loaded into the **OSSL_LIB_CTX** given by `ctx`, having the
name given by `name` and the properties given by `properties`.
The `name` determines what type of object the fetched decoder
method is expected to be able to decode, and the properties are
used to determine the expected output type.
For known properties and the values they may have, please have a look
in provider-encoder(7)/Names and properties.

OSSL_DECODER_up_ref() increments the reference count for the given
`decoder`.

OSSL_DECODER_free() decrements the reference count for the given
`decoder`, and when the count reaches zero, frees it.
If the argument is NULL, nothing is done.

OSSL_DECODER_get0_provider() returns the provider of the given
`decoder`.

OSSL_DECODER_get0_properties() returns the property definition associated
with the given `decoder`.

OSSL_DECODER_is_a() checks if `decoder` is an implementation
of an algorithm that's identifiable with `name`.

OSSL_DECODER_get0_name() returns the name used to fetch the given `decoder`.

OSSL_DECODER_get0_description() returns a description of the `decoder`, meant
for display and human consumption.  The description is at the discretion
of the `decoder` implementation.

OSSL_DECODER_names_do_all() traverses all names for the given
`decoder`, and calls `fn` with each name and `data` as arguments.

OSSL_DECODER_do_all_provided() traverses all decoder
implementations by all activated providers in the library context
`libctx`, and for each of the implementations, calls `fn` with the
implementation method and `arg` as arguments.

OSSL_DECODER_gettable_params() returns an OSSL_PARAM(3)
array of parameter descriptors.

OSSL_DECODER_get_params() attempts to get parameters specified
with an OSSL_PARAM(3) array `params`.  Parameters that the
implementation doesn't recognise should be ignored.

## RETURN VALUES


OSSL_DECODER_fetch() returns a pointer to an OSSL_DECODER object,
or NULL on error.

OSSL_DECODER_up_ref() returns 1 on success, or 0 on error.

OSSL_DECODER_free() doesn't return any value.

OSSL_DECODER_get0_provider() returns a pointer to a provider object, or
NULL on error.

OSSL_DECODER_get0_properties() returns a pointer to a property
definition string, or NULL on error.

OSSL_DECODER_is_a() returns 1 if `decoder` was identifiable,
otherwise 0.

OSSL_DECODER_get0_name() returns the algorithm name from the provided
implementation for the given `decoder`. Note that the `decoder` may have
multiple synonyms associated with it. In this case the first name from the
algorithm definition is returned. Ownership of the returned string is retained
by the `decoder` object and should not be freed by the caller.

OSSL_DECODER_get0_description() returns a pointer to a description, or NULL if
there isn't one.

OSSL_DECODER_names_do_all() returns 1 if the callback was called for all
names. A return value of 0 means that the callback was not called for any names.

## NOTES


OSSL_DECODER_fetch() may be called implicitly by other fetching
functions, using the same library context and properties.
Any other API that uses keys will typically do this.

## EXAMPLES


To list all decoders in a provider to a bio_out:

```c
static void collect_decoders(OSSL_DECODER *decoder, void *stack)
{
    STACK_OF(OSSL_DECODER) *decoder_stack = stack;

    sk_OSSL_DECODER_push(decoder_stack, decoder);
    OSSL_DECODER_up_ref(decoder);
}

void print_name(const char *name, void *vdata)
{
    BIO *bio = vdata;

    BIO_printf(bio, "%s ", name);
}


STACK_OF(OSSL_DECODER) *decoders;
int i;

decoders = sk_OSSL_DECODER_new_null();

BIO_printf(bio_out, "DECODERs provided by %s:\n", provider);
OSSL_DECODER_do_all_provided(NULL, collect_decoders,
                             decoders);

for (i = 0; i < sk_OSSL_DECODER_num(decoders); i++) {
    OSSL_DECODER *decoder = sk_OSSL_DECODER_value(decoders, i);

    if (strcmp(OSSL_PROVIDER_get0_name(OSSL_DECODER_get0_provider(decoder)),
               provider) != 0)
        continue;

    if (OSSL_DECODER_names_do_all(decoder, print_name, bio_out))
           BIO_printf(bio_out, "\n");
}
sk_OSSL_DECODER_pop_free(decoders, OSSL_DECODER_free);

```

## SEE ALSO


provider(7), OSSL_DECODER_CTX(3), OSSL_DECODER_from_bio(3),
OSSL_DECODER_CTX_new_for_pkey(3), OSSL_LIB_CTX(3)

## HISTORY


The functions described here were added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2020-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_DECODER.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_DECODER.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_DECODER.pod`；SHA-256：`817f086e296e0b73c651ad85c11b47e76ca28bb57eb21b6e9157a39395fb3c8c`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
