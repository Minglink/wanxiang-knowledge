---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-kdf-krb5kdf",
  "title": "OpenSSL：密钥派生：KRB5KDF · EVP_KDF-KRB5KDF（man7）",
  "type": "note",
  "tags": [
    "密钥派生",
    "KDF",
    "加密算法",
    "openssl",
    "EVP_KDF-KRB5KDF"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "26078663218dd69f006a0572d32ec57dae19687a78b0787b8cd422cbbdfd6527",
  "generatedHash": "4e26516d5ffb0d60997222ac45156ee173d647d86ac848377b60b61f218ea4ce",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密钥派生：KRB5KDF：EVP_KDF-KRB5KDF - The RFC3961 Krb5 KDF EVP_KDF implementation",
  "l1": "Support for computing the **KRB5KDF** KDF through the **EVP_KDF** API. The EVP_KDF-KRB5KDF algorithm implements the key derivation function defined in RFC 3961, section 5.1 and is used by Krb5 to derive session keys. Three inputs are required to perform key derivation: a cipher, (for example AES-128-CBC), the initial key, and a constant. \"KRB5KDF\" is the name for this implementation; it can be used with the EVP_KDF_fetch() function. The supported parameters are: These parameters work as described in EVP_KDF(3)/PARAMETERS. This parameter sets the constant value for the KDF. If a value is already set, the contents are replaced. ",
  "questions": [
    "EVP_KDF-KRB5KDF 如何用于密钥派生：KRB5KDF？",
    "EVP_KDF-KRB5KDF 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-kdf-krb5kdf",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KDF-KRB5KDF.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密钥派生：KRB5KDF · EVP_KDF-KRB5KDF（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密钥派生：KRB5KDF。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_KDF-KRB5KDF - The RFC3961 Krb5 KDF EVP_KDF implementation

## 技术正文

## NAME


EVP_KDF-KRB5KDF - The RFC3961 Krb5 KDF EVP_KDF implementation

## DESCRIPTION


Support for computing the **KRB5KDF** KDF through the **EVP_KDF** API.

The EVP_KDF-KRB5KDF algorithm implements the key derivation function defined
in RFC 3961, section 5.1 and is used by Krb5 to derive session keys.
Three inputs are required to perform key derivation: a cipher, (for example
AES-128-CBC), the initial key, and a constant.

### Identity


"KRB5KDF" is the name for this implementation;
it can be used with the EVP_KDF_fetch() function.

### Supported parameters


The supported parameters are:


- "properties" (**OSSL_KDF_PARAM_PROPERTIES**) <UTF8 string>

- "cipher" (**OSSL_KDF_PARAM_CIPHER**) <UTF8 string>

- "key" (**OSSL_KDF_PARAM_KEY**) <octet string>

These parameters work as described in EVP_KDF(3)/PARAMETERS.

- "constant" (**OSSL_KDF_PARAM_CONSTANT**) <octet string>

This parameter sets the constant value for the KDF.
If a value is already set, the contents are replaced.


## NOTES


A context for KRB5KDF can be obtained by calling:

```c
EVP_KDF *kdf = EVP_KDF_fetch(NULL, "KRB5KDF", NULL);
EVP_KDF_CTX *kctx = EVP_KDF_CTX_new(kdf);

```

The output length of the KRB5KDF derivation is specified via the `keylen`
parameter to the EVP_KDF_derive(3) function, and MUST match the key
length for the chosen cipher or an error is returned. Moreover, the
constant's length must not exceed the block size of the cipher.
Since the KRB5KDF output length depends on the chosen cipher, calling
EVP_KDF_CTX_get_kdf_size(3) to obtain the requisite length returns the correct length
only after the cipher is set. Prior to that **EVP_MAX_KEY_LENGTH** is returned.
The caller must allocate a buffer of the correct length for the chosen
cipher, and pass that buffer to the EVP_KDF_derive(3) function along
with that length.

## EXAMPLES


This example derives a key using the AES-128-CBC cipher:

```c
EVP_KDF *kdf;
EVP_KDF_CTX *kctx;
unsigned char key[16] = "01234...";
unsigned char constant[] = "I'm a constant";
unsigned char out[16];
size_t outlen = sizeof(out);
OSSL_PARAM params[4], *p = params;

kdf = EVP_KDF_fetch(NULL, "KRB5KDF", NULL);
kctx = EVP_KDF_CTX_new(kdf);
EVP_KDF_free(kdf);

*p++ = OSSL_PARAM_construct_utf8_string(OSSL_KDF_PARAM_CIPHER,
                                        SN_aes_128_cbc,
                                        strlen(SN_aes_128_cbc));
*p++ = OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_KEY,
                                         key, (size_t)16);
*p++ = OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_CONSTANT,
                                         constant, strlen(constant));
*p = OSSL_PARAM_construct_end();
if (EVP_KDF_derive(kctx, out, outlen, params) <= 0)
    /* Error */

EVP_KDF_CTX_free(kctx);

```

## CONFORMING TO


RFC 3961

## SEE ALSO


EVP_KDF(3),
EVP_KDF_CTX_free(3),
EVP_KDF_CTX_get_kdf_size(3),
EVP_KDF_derive(3),
EVP_KDF(3)/PARAMETERS

## HISTORY


This functionality was added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2016-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_KDF-KRB5KDF.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KDF-KRB5KDF.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_KDF-KRB5KDF.pod`；SHA-256：`26078663218dd69f006a0572d32ec57dae19687a78b0787b8cd422cbbdfd6527`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
