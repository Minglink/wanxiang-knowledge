---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-signature-ml-dsa",
  "title": "OpenSSL：EVP 密码接口 · EVP_SIGNATURE-ML-DSA（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "密码接口",
    "Provider",
    "openssl",
    "EVP_SIGNATURE-ML-DSA"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "428c6a0a0cb9bae2f56e29c5f6db5c70b89ae3d71f170aad9358ae59ced415f4",
  "generatedHash": "bf8161e6c2c7ff70c7ecc19bde378638546abb01ce7a67155c71a8eeb1c44a37",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "EVP 密码接口：EVP_SIGNATURE-ML-DSA, EVP_SIGNATURE-ML-DSA-44, EVP_SIGNATURE-ML-DSA-65, EVP_SIGNATURE-ML-DSA-87, - EVP_SIGNATURE ML-DSA support",
  "l1": "The **ML-DSA-44**, **ML-DSA-65** and **ML-DSA-87** EVP_PKEY implementations support key generation, and one-shot sign and verify using the ML-DSA signature schemes described in FIPS 204. The different algorithms names correspond to the parameter sets defined in FIPS 204 Section 4 Table 1. (The signatures range in size from ~2.5K to ~4.5K depending on the type chosen). There are 3 different security categories also depending on the type. EVP_SIGNATURE_fetch(3) can be used to explicitely fetch one of the 3 algorithms which can then be used with EVP_PKEY_sign_message_init(3), EVP_PKEY_sign(3), EVP_PKEY_verify_message_init(3), and EVP_PKEY_verify(3) to perform one-shot message signing or signature verification. The normal signing process (called Pure ML-DSA Signature Generation) encodes the message internally as 0x00 || len(ctx) || ctx || mes",
  "questions": [
    "EVP_SIGNATURE-ML-DSA 如何用于EVP 密码接口？",
    "EVP_SIGNATURE-ML-DSA 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-signature-ml-dsa",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_SIGNATURE-ML-DSA.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：EVP 密码接口 · EVP_SIGNATURE-ML-DSA（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：EVP 密码接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_SIGNATURE-ML-DSA,
EVP_SIGNATURE-ML-DSA-44, EVP_SIGNATURE-ML-DSA-65, EVP_SIGNATURE-ML-DSA-87,
- EVP_SIGNATURE ML-DSA support

## 技术正文

## NAME


EVP_SIGNATURE-ML-DSA,
EVP_SIGNATURE-ML-DSA-44, EVP_SIGNATURE-ML-DSA-65, EVP_SIGNATURE-ML-DSA-87,
- EVP_SIGNATURE ML-DSA support

## DESCRIPTION


The **ML-DSA-44**, **ML-DSA-65** and **ML-DSA-87** EVP_PKEY implementations
support key generation, and one-shot sign and verify using the ML-DSA
signature schemes described in FIPS 204.

The different algorithms names correspond to the parameter sets defined in
FIPS 204 Section 4 Table 1.
(The signatures range in size from ~2.5K to ~4.5K depending on the type chosen).
There are 3 different security categories also depending on the type.

EVP_SIGNATURE_fetch(3) can be used to explicitely fetch one of the 3
algorithms which can then be used with EVP_PKEY_sign_message_init(3),
EVP_PKEY_sign(3), EVP_PKEY_verify_message_init(3), and
EVP_PKEY_verify(3) to perform one-shot message signing or signature verification.

The normal signing process (called Pure ML-DSA Signature Generation)
encodes the message internally as 0x00 || len(ctx) || ctx || message.
where **ctx** is some optional value of size 0x00..0xFF.  This process is
defined in FIPS 204 Algorithm 2
step 10 and Algorithm 3 step 5.
OpenSSL also allows the message to not be encoded which is required for
testing. OpenSSL does not support Pre Hash ML-DSA Signature Generation, but this
may be done by the user by doing Pre hash encoding externally and then choosing
the option to not encode the message.

### ML-DSA Signature Parameters


The following parameter can be used for both signing and verification.
it may be set by passing an OSSL_PARAM array to EVP_PKEY_sign_message_init(3)
or EVP_PKEY_verify_message_init(3)


- "context-string" (**OSSL_SIGNATURE_PARAM_CONTEXT_STRING**) <octet string>

A string of octets with length at most 255. By default it is the empty string.


The following parameters can be used when signing:
They can be set by passing an OSSL_PARAM array to EVP_PKEY_sign_init_ex2(3).


- "message-encoding" (**OSSL_SIGNATURE_PARAM_MESSAGE_ENCODING**) <integer>

The default value of 1 uses 'Pure ML-DSA Signature Generation' as described
above. Setting it to 0 does not encode the message, which is used for testing.
The message encoding steps are defined in
FIPS 204 Algorithm 2 step 10 and
Algorithm 3 step 5.

- "test-entropy" (**OSSL_SIGNATURE_PARAM_TEST_ENTROPY**) <octet string>

Used for testing to pass an optional deterministic per message random value.
If set the size must be 32 bytes.

- "deterministic" (**OSSL_SIGNATURE_PARAM_DETERMINISTIC**) <integer>

The default value of 0 causes the per message randomness to be randomly
generated using a DRBG. Setting this to 1 causes the per message randomness
to be set to 32 bytes of zeros. This value is ignored if "test-entropy" is set.

- "mu" (**OSSL_SIGNATURE_PARAM_MU**) <integer>

The default value of 0 causes sign and verify operations to process a raw message.
Setting this to 1 causes those operations to assume the input is the `mu` value
from FIPS 204 Algorithm 7 step 6 and
Algorithm 8 step 7.

Note that the message encoding steps from
FIPS 204 Algorithm 2 step 10 and
Algorithm 3 step 5 are omitted when this setting is 1.


See EVP_PKEY-ML-DSA(7) for information related to **ML-DSA** keys.

## NOTES


For backwards compatability reasons EVP_DigestSignInit_ex(), EVP_DigestSign(),
EVP_DigestVerifyInit_ex() and EVP_DigestVerify() may also be used, but the digest
passed in `mdname` must be NULL.

## EXAMPLES


To sign a message using an ML-DSA EVP_PKEY structure:

```c
   void do_sign(EVP_PKEY *key, unsigned char *msg, size_t msg_len)
   {
       size_t sig_len;
       unsigned char *sig = NULL;
       const OSSL_PARAM params[] = {
           OSSL_PARAM_octet_string("context-string", (unsigned char *)"A context string", 16),
           OSSL_PARAM_END
       };
       EVP_PKEY_CTX *sctx = EVP_PKEY_CTX_new_from_pkey(NULL, pkey, NULL);
       EVP_SIGNATURE *sig_alg = EVP_SIGNATURE_fetch(NULL, "ML-DSA-65", NULL);

       EVP_PKEY_sign_message_init(sctx, sig_alg, params);
       /* Calculate the required size for the signature by passing a NULL buffer. */
       EVP_PKEY_sign(sctx, NULL, &sig_len, msg, msg_len);
       sig = OPENSSL_zalloc(sig_len);
       EVP_PKEY_sign(sctx, sig, &sig_len, msg, msg_len);
       ...
       OPENSSL_free(sig);
       EVP_SIGNATURE(sig_alg);
       EVP_PKEY_CTX_free(sctx);
   }

```

## SEE ALSO


EVP_PKEY-ML-DSA(7)
provider-signature(7),
EVP_PKEY_sign(3),
EVP_PKEY_verify(3),
FIPS 204

## HISTORY


This functionality was added in OpenSSL 3.5.

## COPYRIGHT


Copyright 2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_SIGNATURE-ML-DSA.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_SIGNATURE-ML-DSA.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_SIGNATURE-ML-DSA.pod`；SHA-256：`428c6a0a0cb9bae2f56e29c5f6db5c70b89ae3d71f170aad9358ae59ced415f4`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
