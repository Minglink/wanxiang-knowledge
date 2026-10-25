---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-param-allocate-from-text",
  "title": "OpenSSL：密码实现与接口 · OSSL_PARAM_allocate_from_text（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_PARAM_allocate_from_text"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "63b2bdf3e407842802b7e6282930ecccefad04a397a3630592033ef5868bcc64",
  "generatedHash": "1f50813d732f837d7a45dac5f04683af33c9a38faab8ad48ee059b4d88800ad1",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_PARAM_allocate_from_text - OSSL_PARAM construction utilities",
  "l1": "With OpenSSL before version 3.0, parameters were passed down to or retrieved from algorithm implementations via control functions. Some of these control functions existed in variants that took string parameters, for example EVP_PKEY_CTX_ctrl_str(3). OpenSSL 3.0 introduces a new mechanism to do the same thing with an array of parameters that contain name, value, value type and value size (see OSSL_PARAM(3) for more information). OSSL_PARAM_allocate_from_text() uses `key` to look up an item in `paramdefs`. If an item was found, it converts `value` to something suitable for that item's `data_type`, and stores the result in I<< to->data >> as well as its size in I<< to->data_size >>. I<< to->key >> and I<< to->data_type >> are assigned the corresponding values from the item that was found, and I<< to->return_size >> is set to zero. I<< to->da",
  "questions": [
    "OSSL_PARAM_allocate_from_text 如何用于密码实现与接口？",
    "OSSL_PARAM_allocate_from_text 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-param-allocate-from-text",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_PARAM_allocate_from_text.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_PARAM_allocate_from_text（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_PARAM_allocate_from_text
- OSSL_PARAM construction utilities

## 技术正文

## NAME


OSSL_PARAM_allocate_from_text
- OSSL_PARAM construction utilities

## SYNOPSIS


```c
#include <openssl/params.h>

int OSSL_PARAM_allocate_from_text(OSSL_PARAM *to,
                                  const OSSL_PARAM *paramdefs,
                                  const char *key, const char *value,
                                  size_t value_n,
                                  int *found);

```

## DESCRIPTION


With OpenSSL before version 3.0, parameters were passed down to or
retrieved from algorithm implementations via control functions.
Some of these control functions existed in variants that took string
parameters, for example EVP_PKEY_CTX_ctrl_str(3).

OpenSSL 3.0 introduces a new mechanism to do the same thing with an
array of parameters that contain name, value, value type and value
size (see OSSL_PARAM(3) for more information).

OSSL_PARAM_allocate_from_text() uses `key` to look up an item in
`paramdefs`.  If an item was found, it converts `value` to something
suitable for that item's `data_type`, and stores the result in
I<< to->data >> as well as its size in I<< to->data_size >>.
I<< to->key >> and I<< to->data_type >> are assigned the corresponding
values from the item that was found, and I<< to->return_size >> is set
to zero.

I<< to->data >> is always allocated using OPENSSL_zalloc(3) and
needs to be freed by the caller when it's not useful any more, using
OPENSSL_free(3).

If `found` is not NULL, `*found` is set to 1 if `key` could be
located in `paramdefs`, and to 0 otherwise.

### The use of `key` and `value` in detail


OSSL_PARAM_allocate_from_text() takes note if `key` starts with
"hex", and will only use the rest of `key` to look up an item in
`paramdefs` in that case.  As an example, if `key` is "hexid", "id"
will be looked up in `paramdefs`.

When an item in `paramdefs` has been found, `value` is converted
depending on that item's `data_type`, as follows:


- **OSSL_PARAM_INTEGER** and **OSSL_PARAM_UNSIGNED_INTEGER**

If `key` didn't start with "hex", `value` is assumed to contain
`value_n` decimal characters, which are decoded, and the resulting
bytes become the number stored in the I<< to->data >> storage.

If `value` starts with "0x", it is assumed to contain `value_n`
hexadecimal characters.

If `key` started with "hex", `value` is assumed to contain
`value_n` hexadecimal characters without the "0x" prefix.

If `value` contains characters that couldn't be decoded as
hexadecimal or decimal characters, OSSL_PARAM_allocate_from_text()
considers that an error.

- **OSSL_PARAM_UTF8_STRING**

If `key` started with "hex", OSSL_PARAM_allocate_from_text()
considers that an error.

Otherwise, `value` is considered a C string and is copied to the
I<< to->data >> storage.
On systems where the native character encoding is EBCDIC, the bytes in
I<< to->data >> are converted to ASCII.

- **OSSL_PARAM_OCTET_STRING**

If `key` started with "hex", `value` is assumed to contain
`value_n` hexadecimal characters, which are decoded, and the
resulting bytes are stored in the I<< to->data >> storage.
If `value` contains characters that couldn't be decoded as
hexadecimal or decimal characters, OSSL_PARAM_allocate_from_text()
considers that an error.

If `key` didn't start with "hex", `value_n` bytes from `value` are
copied to the I<< to->data >> storage.


## RETURN VALUES


OSSL_PARAM_allocate_from_text() returns 1 if `key` was found in
`paramdefs` and there was no other failure, otherwise 0.

## NOTES


The parameter descriptor array comes from functions dedicated to
return them.
The following OSSL_PARAM(3) attributes are used:


- `key`

- `data_type`

- `data_size`


All other attributes are ignored.

The `data_size` attribute can be zero, meaning that the parameter it
describes expects arbitrary length data.

## EXAMPLES


Code that looked like this:

```c
 int mac_ctrl_string(EVP_PKEY_CTX *ctx, const char *value)
 {
     int rv;
     char *stmp, *vtmp = NULL;

     stmp = OPENSSL_strdup(value);
     if (stmp == NULL)
         return -1;
     vtmp = strchr(stmp, ':');
     if (vtmp != NULL)
         *vtmp++ = '\0';
     rv = EVP_MAC_ctrl_str(ctx, stmp, vtmp);
     OPENSSL_free(stmp);
     return rv;
 }

 ...


 for (i = 0; i < sk_OPENSSL_STRING_num(macopts); i++) {
     char *macopt = sk_OPENSSL_STRING_value(macopts, i);

     if (pkey_ctrl_string(mac_ctx, macopt) <= 0) {
         BIO_printf(bio_err,
                    "MAC parameter error \"%s\"\n", macopt);
         ERR_print_errors(bio_err);
         goto mac_end;
     }
 }

```

Can be written like this instead:

```c
 OSSL_PARAM *params =
     OPENSSL_zalloc(sizeof(*params)
                    * (sk_OPENSSL_STRING_num(opts) + 1));
 const OSSL_PARAM *paramdefs = EVP_MAC_settable_ctx_params(mac);
 size_t params_n;
 char *opt = "<unknown>";

 for (params_n = 0; params_n < (size_t)sk_OPENSSL_STRING_num(opts);
      params_n++) {
     char *stmp, *vtmp = NULL;

     opt = sk_OPENSSL_STRING_value(opts, (int)params_n);
     if ((stmp = OPENSSL_strdup(opt)) == NULL
             || (vtmp = strchr(stmp, ':')) == NULL)
         goto err;

     *vtmp++ = '\0';
     if (!OSSL_PARAM_allocate_from_text(&params[params_n],
                                        paramdefs, stmp,
                                        vtmp, strlen(vtmp), NULL))
         goto err;
 }
 params[params_n] = OSSL_PARAM_construct_end();
 if (!EVP_MAC_CTX_set_params(ctx, params))
     goto err;
 while (params_n-- > 0)
     OPENSSL_free(params[params_n].data);
 OPENSSL_free(params);
 /* ... */
 return;

err:
 BIO_printf(bio_err, "MAC parameter error '%s'\n", opt);
 ERR_print_errors(bio_err);


```

## SEE ALSO


OSSL_PARAM(3), OSSL_PARAM_int(3)

## COPYRIGHT


Copyright 2019-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_PARAM_allocate_from_text.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_PARAM_allocate_from_text.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_PARAM_allocate_from_text.pod`；SHA-256：`63b2bdf3e407842802b7e6282930ecccefad04a397a3630592033ef5868bcc64`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
