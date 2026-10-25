---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-kdf-kb",
  "title": "OpenSSL：密钥派生：KB · EVP_KDF-KB（man7）",
  "type": "note",
  "tags": [
    "密钥派生",
    "KDF",
    "加密算法",
    "openssl",
    "EVP_KDF-KB"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "f91ec0d8b1f18e64270ab83cf3f4d74af971dca46364c8c781a8d29b1cf00c6b",
  "generatedHash": "a98eaa30da3acc6a43e4b3f6f1715ce84e107bf803b82292af8361a711f39c5e",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密钥派生：KB：EVP_KDF-KB - The Key-Based EVP_KDF implementation",
  "l1": "The EVP_KDF-KB algorithm implements the Key-Based key derivation function (KBKDF). KBKDF derives a key from repeated application of a keyed MAC to an input secret (and other optional values). The output is considered to be keying material. \"KBKDF\" is the name for this implementation; it can be used with the EVP_KDF_fetch() function. The supported parameters are: The mode parameter determines which flavor of KBKDF to use - currently the choices are \"counter\" and \"feedback\". \"counter\" is the default, and will be used if unspecified. The value is either CMAC, HMAC, KMAC128 or KMAC256. The seed parameter is unused in counter mode. Set to **0** to disable use of the optional Fixed Input data 'L' (see SP800-108). The default value of **1** will be used if unspecified. Set to **0** to disable use of the optional Fixed Input data 'zero separator'",
  "questions": [
    "EVP_KDF-KB 如何用于密钥派生：KB？",
    "EVP_KDF-KB 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-kdf-kb",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KDF-KB.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密钥派生：KB · EVP_KDF-KB（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密钥派生：KB。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_KDF-KB - The Key-Based EVP_KDF implementation

## 技术正文

## NAME


EVP_KDF-KB - The Key-Based EVP_KDF implementation

## DESCRIPTION


The EVP_KDF-KB algorithm implements the Key-Based key derivation function
(KBKDF).  KBKDF derives a key from repeated application of a keyed MAC to an
input secret (and other optional values).

The output is considered to be keying material.

### Identity


"KBKDF" is the name for this implementation; it can be used with the
EVP_KDF_fetch() function.

### Supported parameters


The supported parameters are:


- "mode" (**OSSL_KDF_PARAM_MODE**) <UTF8 string>

The mode parameter determines which flavor of KBKDF to use - currently the
choices are "counter" and "feedback". "counter" is the default, and will be
used if unspecified.

- "mac" (**OSSL_KDF_PARAM_MAC**) <UTF8 string>

The value is either CMAC, HMAC, KMAC128 or KMAC256.

- "digest" (**OSSL_KDF_PARAM_DIGEST**) <UTF8 string>

- "cipher" (**OSSL_KDF_PARAM_CIPHER**) <UTF8 string>

- "properties" (**OSSL_KDF_PARAM_PROPERTIES**) <UTF8 string>

- "key" (**OSSL_KDF_PARAM_KEY**) <octet string>

- "salt" (**OSSL_KDF_PARAM_SALT**) <octet string>

- "info (**OSSL_KDF_PARAM_INFO**) <octet string>

- "seed" (**OSSL_KDF_PARAM_SEED**) <octet string>

The seed parameter is unused in counter mode.

- "use-l" (**OSSL_KDF_PARAM_KBKDF_USE_L**) <integer>

Set to **0** to disable use of the optional Fixed Input data 'L' (see SP800-108).
The default value of **1** will be used if unspecified.

- "use-separator" (**OSSL_KDF_PARAM_KBKDF_USE_SEPARATOR**) <integer>

Set to **0** to disable use of the optional Fixed Input data 'zero separator'
(see SP800-108) that is placed between the Label and Context.
The default value of **1** will be used if unspecified.

- "r" (**OSSL_KDF_PARAM_KBKDF_R**) <integer>

Set the fixed value 'r', indicating the length of the counter in bits.

Supported values are **8**, **16**, **24**, and **32**.
The default value of **32** will be used if unspecified.


The OpenSSL FIPS provider also supports the following parameters:


- "fips-indicator" (**OSSL_KDF_PARAM_FIPS_APPROVED_INDICATOR**) <integer>

A getter that returns 1 if the operation is FIPS approved, or 0 otherwise.
This may be used after calling EVP_KDF_derive. It returns 0 if "key-check"
is set to 0 and the check fails.

- "key-check" (**OSSL_KDF_PARAM_FIPS_KEY_CHECK**) <integer>

The default value of 1 causes an error during EVP_KDF_CTX_set_params() if the
length of used key-derivation key (**OSSL_KDF_PARAM_KEY**) is shorter than 112
bits.
Setting this to zero will ignore the error and set the approved
"fips-indicator" to 0.
This option breaks FIPS compliance if it causes the approved "fips-indicator"
to return 0.


Depending on whether mac is CMAC or HMAC, either digest or cipher is required
(respectively) and the other is unused. They are unused for KMAC128 and KMAC256.

The parameters key, salt, info, and seed correspond to KI, Label, Context, and
IV (respectively) in SP800-108.  As in that document, salt, info, and seed are
optional and may be omitted.

"mac", "digest", cipher" and "properties" are described in
EVP_KDF(3)/PARAMETERS.

## NOTES


A context for KBKDF can be obtained by calling:

```c
EVP_KDF *kdf = EVP_KDF_fetch(NULL, "KBKDF", NULL);
EVP_KDF_CTX *kctx = EVP_KDF_CTX_new(kdf);

```

The output length of an KBKDF is specified via the `keylen`
parameter to the EVP_KDF_derive(3) function.

Note that currently OpenSSL only implements counter and feedback modes.  Other
variants may be supported in the future.

## EXAMPLES


This example derives 10 bytes using COUNTER-HMAC-SHA256, with KI "secret",
Label "label", and Context "context".

```c
EVP_KDF *kdf;
EVP_KDF_CTX *kctx;
unsigned char out[10];
OSSL_PARAM params[6], *p = params;

kdf = EVP_KDF_fetch(NULL, "KBKDF", NULL);
kctx = EVP_KDF_CTX_new(kdf);
EVP_KDF_free(kdf);

*p++ = OSSL_PARAM_construct_utf8_string(OSSL_KDF_PARAM_DIGEST,
                                        "SHA2-256", 0);
*p++ = OSSL_PARAM_construct_utf8_string(OSSL_KDF_PARAM_MAC,
                                        "HMAC", 0);
*p++ = OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_KEY,
                                         "secret", strlen("secret"));
*p++ = OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_SALT,
                                         "label", strlen("label"));
*p++ = OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_INFO,
                                         "context", strlen("context"));
*p = OSSL_PARAM_construct_end();
if (EVP_KDF_derive(kctx, out, sizeof(out), params) <= 0)
    error("EVP_KDF_derive");

EVP_KDF_CTX_free(kctx);

```

This example derives 10 bytes using FEEDBACK-CMAC-AES256, with KI "secret",
Label "label", and IV "sixteen bytes iv".

```c
EVP_KDF *kdf;
EVP_KDF_CTX *kctx;
unsigned char out[10];
OSSL_PARAM params[8], *p = params;
unsigned char *iv = "sixteen bytes iv";

kdf = EVP_KDF_fetch(NULL, "KBKDF", NULL);
kctx = EVP_KDF_CTX_new(kdf);
EVP_KDF_free(kdf);

*p++ = OSSL_PARAM_construct_utf8_string(OSSL_KDF_PARAM_CIPHER, "AES256", 0);
*p++ = OSSL_PARAM_construct_utf8_string(OSSL_KDF_PARAM_MAC, "CMAC", 0);
*p++ = OSSL_PARAM_construct_utf8_string(OSSL_KDF_PARAM_MODE, "FEEDBACK", 0);
*p++ = OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_KEY,
                                         "secret", strlen("secret"));
*p++ = OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_SALT,
                                         "label", strlen("label"));
*p++ = OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_INFO,
                                         "context", strlen("context"));
*p++ = OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_SEED,
                                         iv, strlen(iv));
*p = OSSL_PARAM_construct_end();
if (EVP_KDF_derive(kctx, out, sizeof(out), params) <= 0)
    error("EVP_KDF_derive");

EVP_KDF_CTX_free(kctx);

```

## CONFORMING TO


NIST SP800-108, IETF RFC 6803, IETF RFC 8009.

## SEE ALSO


EVP_KDF(3),
EVP_KDF_CTX_free(3),
EVP_KDF_CTX_get_kdf_size(3),
EVP_KDF_derive(3),
EVP_KDF(3)/PARAMETERS

## HISTORY


This functionality was added in OpenSSL 3.0.

Support for KMAC was added in OpenSSL 3.1.

## COPYRIGHT


Copyright 2019-2024 The OpenSSL Project Authors. All Rights Reserved.
Copyright 2019 Red Hat, Inc.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_KDF-KB.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KDF-KB.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_KDF-KB.pod`；SHA-256：`f91ec0d8b1f18e64270ab83cf3f4d74af971dca46364c8c781a8d29b1cf00c6b`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
