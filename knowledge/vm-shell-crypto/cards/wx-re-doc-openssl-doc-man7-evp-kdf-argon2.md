---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-kdf-argon2",
  "title": "OpenSSL：密钥派生：ARGON2 · EVP_KDF-ARGON2（man7）",
  "type": "note",
  "tags": [
    "密钥派生",
    "KDF",
    "加密算法",
    "openssl",
    "EVP_KDF-ARGON2",
    "Argon2口令哈希"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "adbb1548f995d57f7aabca5d8bae6e88e854ba0e4021e261328497d7d35ae70c",
  "generatedHash": "f621abb24245adbc82d8dd0229420f947aa748dd859556b1dfd3dfe63b6c47d0",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密钥派生：ARGON2：EVP_KDF-ARGON2 - The Argon2 EVP KDF implementation",
  "l1": "Support for computing the **argon2** password-based KDF through the **EVP_KDF** API. The EVP_KDF-ARGON2 algorithm implements the Argon2 password-based key derivation function, as described in IETF RFC 9106. It is memory-hard in the sense that it deliberately requires a significant amount of RAM for efficient computation. The intention of this is to render brute forcing of passwords on systems that lack large amounts of main memory (such as GPUs or ASICs) computationally infeasible. Argon2d (Argon2i) uses data-dependent (data-independent) memory access and primary seek to address trade-off (side-channel) attacks. Argon2id is a hybrid construction which, in the first two slices of the first pass, generates reference addresses data-independently as in Argon2i, whereas in later slices and next passes it generates them data-dependently as in A",
  "questions": [
    "EVP_KDF-ARGON2 如何用于密钥派生：ARGON2？",
    "EVP_KDF-ARGON2 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-focus-crypto-argon2-memory",
      "kind": "机制参照"
    }
  ],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-kdf-argon2",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KDF-ARGON2.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密钥派生：ARGON2 · EVP_KDF-ARGON2（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密钥派生：ARGON2。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_KDF-ARGON2 - The Argon2 EVP KDF implementation

## 技术正文

## NAME


EVP_KDF-ARGON2 - The Argon2 EVP KDF implementation

## DESCRIPTION


Support for computing the **argon2** password-based KDF through the **EVP_KDF**
API.

The EVP_KDF-ARGON2 algorithm implements the Argon2 password-based key
derivation function, as described in IETF RFC 9106.  It is memory-hard in
the sense that it deliberately requires a significant amount of RAM for efficient
computation. The intention of this is to render brute forcing of passwords on
systems that lack large amounts of main memory (such as GPUs or ASICs)
computationally infeasible.

Argon2d (Argon2i) uses data-dependent (data-independent) memory access and
primary seek to address trade-off (side-channel) attacks.

Argon2id is a hybrid construction which, in the first two slices of the first
pass, generates reference addresses data-independently as in Argon2i, whereas
in later slices and next passes it generates them data-dependently as in
Argon2d.

Sbox-hardened version Argon2ds is not supported.

For more information, please refer to RFC 9106.

### Supported parameters


The supported parameters are:


- "pass" (**OSSL_KDF_PARAM_PASSWORD**) <octet string>

- "salt" (**OSSL_KDF_PARAM_SALT**) <octet string>

- "secret" (**OSSL_KDF_PARAM_SECRET**) <octet string>

- "iter" (**OSSL_KDF_PARAM_ITER**) <unsigned integer>

- "size" (**OSSL_KDF_PARAM_SIZE**) <unsigned integer>

- "properties" (**OSSL_KDF_PARAM_PROPERTIES**) <UTF8 string>

These parameters work as described in EVP_KDF(3)/PARAMETERS.

Note that RFC 9106 recommends 128 bits salt for most applications, or 64 bits
salt in the case of space constraints. At least 128 bits output length is
recommended.

Note that secret (or pepper) is an optional secret data used along the
password.

- "threads" (**OSSL_KDF_PARAM_THREADS**) <unsigned integer>

The number of threads, bounded above by the number of lanes.

This can only be used with built-in thread support. Threading must be
explicitly enabled. See EXAMPLES section for more information.

- "ad" (**OSSL_KDF_PARAM_ARGON2_AD**) <octet string>

Optional associated data, may be used to "tag" a group of keys, or tie them
to a particular public key, without having to modify salt.

- "lanes" (**OSSL_KDF_PARAM_ARGON2_LANES**) <unsigned integer>

Argon2 splits the requested memory size into lanes, each of which is designed
to be processed in parallel. For example, on a system with p cores, it's
recommended to use p lanes.

The number of lanes is used to derive the key. It is possible to specify
more lanes than the number of available computational threads. This is
especially encouraged if multi-threading is disabled.

- "memcost" (**OSSL_KDF_PARAM_ARGON2_MEMCOST**) <unsigned integer>

Memory cost parameter (the number of 1k memory blocks used).

- "version" (**OSSL_KDF_PARAM_ARGON2_VERSION**) <unsigned integer>

Argon2 version. Supported values: 0x10, 0x13 (default).

- "early_clean" (**OSSL_KDF_PARAM_EARLY_CLEAN**) <unsigned integer>

If set (nonzero), password and secret stored in Argon2 context are zeroed
early during initial hash computation, as soon as they are not needed.
Otherwise, they are zeroed along the rest of Argon2 context data on clear,
free, reset.

This can be useful if, for example, multiple keys with different ad value
are to be generated from a single password and secret.


## EXAMPLES


This example uses Argon2d with password "1234567890", salt "saltsalt",
using 2 lanes, 2 threads, and memory cost of 65536:

```c
#include <string.h>                 /* strlen               */
#include <openssl/core_names.h>     /* OSSL_KDF_*           */
#include <openssl/params.h>         /* OSSL_PARAM_*         */
#include <openssl/thread.h>         /* OSSL_set_max_threads */
#include <openssl/kdf.h>            /* EVP_KDF_*            */

int main(void)
{
    int retval = 1;

    EVP_KDF *kdf = NULL;
    EVP_KDF_CTX *kctx = NULL;
    OSSL_PARAM params[6], *p = params;

    /* argon2 params, please refer to RFC9106 for recommended defaults */
    uint32_t lanes = 2, threads = 2, memcost = 65536;
    char pwd[] = "1234567890", salt[] = "saltsalt";

    /* derive result */
    size_t outlen = 128;
    unsigned char result[outlen];

    /* required if threads > 1 */
    if (OSSL_set_max_threads(NULL, threads) != 1)
        goto fail;

    p = params;
    *p++ = OSSL_PARAM_construct_uint32(OSSL_KDF_PARAM_THREADS, &threads);
    *p++ = OSSL_PARAM_construct_uint32(OSSL_KDF_PARAM_ARGON2_LANES,
                                       &lanes);
    *p++ = OSSL_PARAM_construct_uint32(OSSL_KDF_PARAM_ARGON2_MEMCOST,
                                       &memcost);
    *p++ = OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_SALT,
                                             salt,
                                             strlen((const char *)salt));
    *p++ = OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_PASSWORD,
                                             pwd,
                                             strlen((const char *)pwd));
    *p++ = OSSL_PARAM_construct_end();

    if ((kdf = EVP_KDF_fetch(NULL, "ARGON2D", NULL)) == NULL)
        goto fail;
    if ((kctx = EVP_KDF_CTX_new(kdf)) == NULL)
        goto fail;
    if (EVP_KDF_derive(kctx, &result[0], outlen, params) != 1)
        goto fail;

    printf("Output = %s\n", OPENSSL_buf2hexstr(result, outlen));
    retval = 0;

fail:
    EVP_KDF_free(kdf);
    EVP_KDF_CTX_free(kctx);
    OSSL_set_max_threads(NULL, 0);

    return retval;
}

```

## NOTES


"ARGON2I", "ARGON2D", and "ARGON2ID" are the names for this implementation; it
can be used with the EVP_KDF_fetch() function.

## CONFORMING TO


RFC 9106 Argon2, see https://www.rfc-editor.org/rfc/rfc9106.txt.

## SEE ALSO


EVP_KDF(3),
EVP_KDF_CTX_new(3),
EVP_KDF_CTX_free(3),
EVP_KDF_CTX_set_params(3),
EVP_KDF_derive(3),
EVP_KDF(3)/PARAMETERS

## HISTORY


This functionality was added to OpenSSL 3.2.

## COPYRIGHT


Copyright 2022-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_KDF-ARGON2.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KDF-ARGON2.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_KDF-ARGON2.pod`；SHA-256：`adbb1548f995d57f7aabca5d8bae6e88e854ba0e4021e261328497d7d35ae70c`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
