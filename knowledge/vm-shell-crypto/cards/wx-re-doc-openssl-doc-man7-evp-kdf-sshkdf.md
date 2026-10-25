---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-kdf-sshkdf",
  "title": "OpenSSL：密钥派生：SSHKDF · EVP_KDF-SSHKDF（man7）",
  "type": "note",
  "tags": [
    "密钥派生",
    "KDF",
    "加密算法",
    "openssl",
    "EVP_KDF-SSHKDF",
    "HKDF密钥派生"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "f027a6570a3c1d6d8ac4178aed87838f55abcc0fd7597684fb2566f9f866a771",
  "generatedHash": "ef7b28533cd05b38b1edbad825018864a5dfe3106eaf6a97bcd4b5a0088f1e7f",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密钥派生：SSHKDF：EVP_KDF-SSHKDF - The SSHKDF EVP_KDF implementation",
  "l1": "Support for computing the **SSHKDF** KDF through the **EVP_KDF** API. The EVP_KDF-SSHKDF algorithm implements the SSHKDF key derivation function. It is defined in RFC 4253, section 7.2 and is used by SSH to derive IVs, encryption keys and integrity keys. Five inputs are required to perform key derivation: The hashing function (for example SHA256), the Initial Key, the Exchange Hash, the Session ID, and the derivation key type. The output is considered to be keying material. \"SSHKDF\" is the name for this implementation; it can be used with the EVP_KDF_fetch() function. The supported parameters are: These parameters work as described in EVP_KDF(3)/PARAMETERS. These parameters set the respective values for the KDF. If a value is already set, the contents are replaced. This parameter sets the type for the SSHKDF operation. There are six suppo",
  "questions": [
    "EVP_KDF-SSHKDF 如何用于密钥派生：SSHKDF？",
    "EVP_KDF-SSHKDF 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-focus-crypto-hkdf-context",
      "kind": "机制参照"
    }
  ],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-kdf-sshkdf",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KDF-SSHKDF.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密钥派生：SSHKDF · EVP_KDF-SSHKDF（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密钥派生：SSHKDF。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_KDF-SSHKDF - The SSHKDF EVP_KDF implementation

## 技术正文

## NAME


EVP_KDF-SSHKDF - The SSHKDF EVP_KDF implementation

## DESCRIPTION


Support for computing the **SSHKDF** KDF through the **EVP_KDF** API.

The EVP_KDF-SSHKDF algorithm implements the SSHKDF key derivation function.
It is defined in RFC 4253, section 7.2 and is used by SSH to derive IVs,
encryption keys and integrity keys.
Five inputs are required to perform key derivation: The hashing function
(for example SHA256), the Initial Key, the Exchange Hash, the Session ID,
and the derivation key type.

The output is considered to be keying material.

### Identity


"SSHKDF" is the name for this implementation; it
can be used with the EVP_KDF_fetch() function.

### Supported parameters


The supported parameters are:


- "properties" (**OSSL_KDF_PARAM_PROPERTIES**) <UTF8 string>

- "digest" (**OSSL_KDF_PARAM_DIGEST**) <UTF8 string>

- "key" (**OSSL_KDF_PARAM_KEY**) <octet string>

These parameters work as described in EVP_KDF(3)/PARAMETERS.

- "xcghash" (**OSSL_KDF_PARAM_SSHKDF_XCGHASH**) <octet string>

- "session_id" (**OSSL_KDF_PARAM_SSHKDF_SESSION_ID**) <octet string>

These parameters set the respective values for the KDF.
If a value is already set, the contents are replaced.

- "type" (**OSSL_KDF_PARAM_SSHKDF_TYPE**) <UTF8 string>

This parameter sets the type for the SSHKDF operation.
There are six supported types:


- EVP_KDF_SSHKDF_TYPE_INITIAL_IV_CLI_TO_SRV

The Initial IV from client to server.
A single char of value 65 (ASCII char 'A').

- EVP_KDF_SSHKDF_TYPE_INITIAL_IV_SRV_TO_CLI

The Initial IV from server to client
A single char of value 66 (ASCII char 'B').

- EVP_KDF_SSHKDF_TYPE_ENCRYPTION_KEY_CLI_TO_SRV

The Encryption Key from client to server
A single char of value 67 (ASCII char 'C').

- EVP_KDF_SSHKDF_TYPE_ENCRYPTION_KEY_SRV_TO_CLI

The Encryption Key from server to client
A single char of value 68 (ASCII char 'D').

- EVP_KDF_SSHKDF_TYPE_INTEGRITY_KEY_CLI_TO_SRV

The Integrity Key from client to server
A single char of value 69 (ASCII char 'E').

- EVP_KDF_SSHKDF_TYPE_INTEGRITY_KEY_SRV_TO_CLI

The Integrity Key from client to server
A single char of value 70 (ASCII char 'F').



The OpenSSL FIPS provider also supports the following parameters:


- "fips-indicator" (**OSSL_KDF_PARAM_FIPS_APPROVED_INDICATOR**) <integer>

A getter that returns 1 if the operation is FIPS approved, or 0 otherwise.
This may be used after calling EVP_KDF_derive. It returns 0 if any "***-check"
related parameter is set to 0 and the check fails.

- "digest-check" (**OSSL_KDF_PARAM_FIPS_DIGEST_CHECK**) <integer>

The default value of 1 causes an error during EVP_KDF_CTX_set_params() if
used digest is not approved.
Setting this to zero will ignore the error and set the approved
"fips-indicator" to 0.
This option breaks FIPS compliance if it causes the approved "fips-indicator"
to return 0.

According to SP 800-135r1, the following are approved digest algorithms: SHA-1,
SHA2-224, SHA2-256, SHA2-384, SHA2-512.

- "key-check" (**OSSL_KDF_PARAM_FIPS_KEY_CHECK**) <integer>

The default value of 1 causes an error during EVP_KDF_CTX_set_params() if the
length of used key-derivation key (**OSSL_KDF_PARAM_KEY**) is shorter than 112
bits.
Setting this to zero will ignore the error and set the approved
"fips-indicator" to 0.
This option breaks FIPS compliance if it causes the approved "fips-indicator"
to return 0.


## NOTES


A context for SSHKDF can be obtained by calling:

```c
EVP_KDF *kdf = EVP_KDF_fetch(NULL, "SSHKDF", NULL);
EVP_KDF_CTX *kctx = EVP_KDF_CTX_new(kdf);

```

The output length of the SSHKDF derivation is specified via the `keylen`
parameter to the EVP_KDF_derive(3) function.
Since the SSHKDF output length is variable, calling EVP_KDF_CTX_get_kdf_size(3)
to obtain the requisite length is not meaningful. The caller must
allocate a buffer of the desired length, and pass that buffer to the
EVP_KDF_derive(3) function along with the desired length.

## EXAMPLES


This example derives an 8 byte IV using SHA-256 with a 1K "key" and appropriate
"xcghash" and "session_id" values:

```c
EVP_KDF *kdf;
EVP_KDF_CTX *kctx;
char type = EVP_KDF_SSHKDF_TYPE_INITIAL_IV_CLI_TO_SRV;
unsigned char key[1024] = "01234...";
unsigned char xcghash[32] = "012345...";
unsigned char session_id[32] = "012345...";
unsigned char out[8];
size_t outlen = sizeof(out);
OSSL_PARAM params[6], *p = params;

kdf = EVP_KDF_fetch(NULL, "SSHKDF", NULL);
kctx = EVP_KDF_CTX_new(kdf);
EVP_KDF_free(kdf);

*p++ = OSSL_PARAM_construct_utf8_string(OSSL_KDF_PARAM_DIGEST,
                                        SN_sha256, strlen(SN_sha256));
*p++ = OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_KEY,
                                         key, (size_t)1024);
*p++ = OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_SSHKDF_XCGHASH,
                                         xcghash, (size_t)32);
*p++ = OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_SSHKDF_SESSION_ID,
                                         session_id, (size_t)32);
*p++ = OSSL_PARAM_construct_utf8_string(OSSL_KDF_PARAM_SSHKDF_TYPE,
                                        &type, sizeof(type));
*p = OSSL_PARAM_construct_end();
if (EVP_KDF_derive(kctx, out, outlen, params) <= 0)
    /* Error */


```

## CONFORMING TO


RFC 4253

## SEE ALSO


EVP_KDF(3),
EVP_KDF_CTX_new(3),
EVP_KDF_CTX_free(3),
EVP_KDF_CTX_set_params(3),
EVP_KDF_CTX_get_kdf_size(3),
EVP_KDF_derive(3),
EVP_KDF(3)/PARAMETERS

## HISTORY


This functionality was added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2016-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_KDF-SSHKDF.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KDF-SSHKDF.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_KDF-SSHKDF.pod`；SHA-256：`f027a6570a3c1d6d8ac4178aed87838f55abcc0fd7597684fb2566f9f866a771`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
