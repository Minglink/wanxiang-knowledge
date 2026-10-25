---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-mac-kmac",
  "title": "OpenSSL：消息认证：KMAC · EVP_MAC-KMAC（man7）",
  "type": "note",
  "tags": [
    "消息认证",
    "HMAC",
    "完整性",
    "openssl",
    "EVP_MAC-KMAC",
    "KMAC消息认证"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "ca58c783b7a51b11fd649a779a266cc596b83975b51554c3dceb8c1d94b944f6",
  "generatedHash": "a9325bbaa23b74dd9e7edc237876fc97b281598706744f9db4238627cab3c1ad",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "消息认证：KMAC：EVP_MAC-KMAC, EVP_MAC-KMAC128, EVP_MAC-KMAC256 - The KMAC EVP_MAC implementations",
  "l1": "Support for computing KMAC MACs through the **EVP_MAC** API. These implementations are identified with one of these names and properties, to be used with EVP_MAC_fetch(): The general description of these parameters can be found in EVP_MAC(3)/PARAMETERS. All these parameters (except for \"block-size\") can be set with EVP_MAC_CTX_set_params(). Furthermore, the \"size\" parameter can be retrieved with EVP_MAC_CTX_get_params(), or with EVP_MAC_CTX_get_mac_size(). The length of the \"size\" parameter should not exceed that of a **size_t**. Likewise, the \"block-size\" parameter can be retrieved with EVP_MAC_CTX_get_params(), or with EVP_MAC_CTX_get_block_size(). Sets the MAC key. Setting this parameter is identical to passing a `key` to EVP_MAC_init(3). The length of the key (in bytes) must be in the range 4...512. Sets the customization string. It i",
  "questions": [
    "EVP_MAC-KMAC 如何用于消息认证：KMAC？",
    "EVP_MAC-KMAC 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-mac-kmac",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_MAC-KMAC.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：消息认证：KMAC · EVP_MAC-KMAC（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：消息认证：KMAC。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_MAC-KMAC, EVP_MAC-KMAC128, EVP_MAC-KMAC256
- The KMAC EVP_MAC implementations

## 技术正文

## NAME


EVP_MAC-KMAC, EVP_MAC-KMAC128, EVP_MAC-KMAC256
- The KMAC EVP_MAC implementations

## DESCRIPTION


Support for computing KMAC MACs through the **EVP_MAC** API.

### Identity


These implementations are identified with one of these names and
properties, to be used with EVP_MAC_fetch():


- "KMAC-128", "provider=default" or "provider=fips"

- "KMAC-256", "provider=default" or "provider=fips"


### Supported parameters


The general description of these parameters can be found in
EVP_MAC(3)/PARAMETERS.

All these parameters (except for "block-size") can be set with
EVP_MAC_CTX_set_params().
Furthermore, the "size" parameter can be retrieved with
EVP_MAC_CTX_get_params(), or with EVP_MAC_CTX_get_mac_size().
The length of the "size" parameter should not exceed that of a **size_t**.
Likewise, the "block-size" parameter can be retrieved with
EVP_MAC_CTX_get_params(), or with EVP_MAC_CTX_get_block_size().


- "key" (**OSSL_MAC_PARAM_KEY**) <octet string>

Sets the MAC key.
Setting this parameter is identical to passing a `key` to EVP_MAC_init(3).
The length of the key (in bytes) must be in the range 4...512.

- "custom" (**OSSL_MAC_PARAM_CUSTOM**) <octet string>

Sets the customization string.
It is an optional value with a length of at most 512 bytes, and is
empty by default.

- "size" (**OSSL_MAC_PARAM_SIZE**) <unsigned integer>

Sets the MAC size.
By default, it is 32 for `KMAC-128` and 64 for `KMAC-256`.

- "block-size" (**OSSL_MAC_PARAM_BLOCK_SIZE**) <unsigned integer>

Gets the MAC block size.
It is 168 for `KMAC-128` and 136 for `KMAC-256`.

- "xof" (**OSSL_MAC_PARAM_XOF**) <integer>

The "xof" parameter value is expected to be 1 or 0. Use 1 to enable XOF mode.
The default value is 0.

- "fips-indicator" (**OSSL_MAC_PARAM_FIPS_APPROVED_INDICATOR**) <int>

This settable parameter is described in provider-mac(7).

- "no-short-mac" (**OSSL_MAC_PARAM_FIPS_NO_SHORT_MAC**) <integer>

This settable parameter is described in provider-mac(7).  It is used by
the OpenSSL FIPS provider and the minimum length output for KMAC
is defined by NIST's SP 800-185 8.4.2.

- "key-check" (**OSSL_MAC_PARAM_FIPS_KEY_CHECK**) <integer>

This settable parameter is described in provider-mac(7).


The "custom" and "no-short-mac" parameters must be set as part of or before
the EVP_MAC_init() call.
The "xof" and "size" parameters can be set at any time before EVP_MAC_final().
The "key" parameter is set as part of the EVP_MAC_init() call, but can be
set before it instead.

## EXAMPLES


```c
 #include <openssl/evp.h>
 #include <openssl/params.h>

 static int do_kmac(const unsigned char *in, size_t in_len,
                    const unsigned char *key, size_t key_len,
                    const unsigned char *custom, size_t custom_len,
                    int xof_enabled, unsigned char *out, int out_len)
 {
     EVP_MAC_CTX *ctx = NULL;
     EVP_MAC *mac = NULL;
     OSSL_PARAM params[4], *p;
     int ret = 0;
     size_t l = 0;

     mac = EVP_MAC_fetch(NULL, "KMAC-128", NULL);
     if (mac == NULL)
         goto err;
     ctx = EVP_MAC_CTX_new(mac);
     /* The mac can be freed after it is used by EVP_MAC_CTX_new */
     EVP_MAC_free(mac);
     if (ctx == NULL)
         goto err;

     /*
      * Setup parameters required before calling EVP_MAC_init()
      * The parameters OSSL_MAC_PARAM_XOF and OSSL_MAC_PARAM_SIZE may also be
      * used at this point.
      */
     p = params;
     *p++ = OSSL_PARAM_construct_octet_string(OSSL_MAC_PARAM_KEY,
                                              (void *)key, key_len);
     if (custom != NULL && custom_len != 0)
       *p++ = OSSL_PARAM_construct_octet_string(OSSL_MAC_PARAM_CUSTOM,
                                                (void *)custom, custom_len);
     *p = OSSL_PARAM_construct_end();
     if (!EVP_MAC_CTX_set_params(ctx, params))
         goto err;

     if (!EVP_MAC_init(ctx))
         goto err;

     /*
      * Note: the following optional parameters can be set any time
      * before EVP_MAC_final().
      */
     p = params;
     *p++ = OSSL_PARAM_construct_int(OSSL_MAC_PARAM_XOF, &xof_enabled);
     *p++ = OSSL_PARAM_construct_int(OSSL_MAC_PARAM_SIZE, &out_len);
     *p = OSSL_PARAM_construct_end();
     if (!EVP_MAC_CTX_set_params(ctx, params))
         goto err;

     /* The update may be called multiple times here for streamed input */
     if (!EVP_MAC_update(ctx, in, in_len))
         goto err;
     if (!EVP_MAC_final(ctx, out, &l, out_len))
         goto err;
     ret = 1;
 err:
     EVP_MAC_CTX_free(ctx);
     return ret;
 }

```

## SEE ALSO


EVP_MAC_CTX_get_params(3), EVP_MAC_CTX_set_params(3),
EVP_MAC(3)/PARAMETERS, OSSL_PARAM(3),
SP 800-185 8.4.2

## COPYRIGHT


Copyright 2018-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_MAC-KMAC.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_MAC-KMAC.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_MAC-KMAC.pod`；SHA-256：`ca58c783b7a51b11fd649a779a266cc596b83975b51554c3dceb8c1d94b944f6`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
