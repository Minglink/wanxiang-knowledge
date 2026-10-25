---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-signature-slh-dsa",
  "title": "OpenSSL：EVP 密码接口 · EVP_SIGNATURE-SLH-DSA（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "密码接口",
    "Provider",
    "openssl",
    "EVP_SIGNATURE-SLH-DSA",
    "SHAKE可扩展输出"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "3812e8c22da7551ea9a29325ac5cad04b5d84c5345313eb783418820e76e8143",
  "generatedHash": "c07440be804500d5f8e8f5ad3367c6ff773030a56adfb039da5f466d37887675",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "EVP 密码接口：EVP_SIGNATURE-SLH-DSA, EVP_SIGNATURE-SLH-DSA-SHA2-128s, EVP_SIGNATURE-SLH-DSA-SHA2-128f, EVP_SIGNATURE-SLH-DSA-SHA2-192s, EVP_SIGNATURE-SLH-DSA-SHA2-192f, EVP_SIGNATURE-SLH-DSA-SHA2-256s, EVP_SIGNATURE-SLH-DSA-SHA2-256f, EVP_SIGNATURE-SLH-DSA-SHAKE-128s, EVP_SIGNATURE-SLH-DSA-SHAKE-128f, EVP_SIGNATU",
  "l1": "The **SLH-DSA-SHA2-128s**, **EVP_PKEY-SLH-DSA-SHA2-128f**, **SLH-DSA-SHA2-192s**, **EVP_PKEY-SLH-DSA-SHA2-192f**, **SLH-DSA-SHA2-256s**, **EVP_PKEY-SLH-DSA-SHA2-256f**, **SLH-DSA-SHAKE-128s**, **EVP_PKEY-SLH-DSA-SHAKE-128f**, **SLH-DSA-SHAKE-192s**, **EVP_PKEY-SLH-DSA-SHAKE-192f**, **SLH-DSA-SHAKE-256s** and **EVP_PKEY-SLH-DSA-SHAKE-256f** EVP_PKEY implementations supports key generation, one-shot sign and verify using the SLH-DSA signature schemes described in FIPS 205. The different algorithms names correspond to the parameter sets defined in FIPS 205 Section 11 Table 2. `s` types have smaller signature sizes, and the `f` variants are faster, (The signatures range from ~8K to ~50K depending on the type chosen). There are 3 different security categories also depending on the type. EVP_SIGNATURE_fetch(3) can be used to explicitely fetch o",
  "questions": [
    "EVP_SIGNATURE-SLH-DSA 如何用于EVP 密码接口？",
    "EVP_SIGNATURE-SLH-DSA 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-signature-slh-dsa",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_SIGNATURE-SLH-DSA.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：EVP 密码接口 · EVP_SIGNATURE-SLH-DSA（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：EVP 密码接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_SIGNATURE-SLH-DSA,
EVP_SIGNATURE-SLH-DSA-SHA2-128s, EVP_SIGNATURE-SLH-DSA-SHA2-128f,
EVP_SIGNATURE-SLH-DSA-SHA2-192s, EVP_SIGNATURE-SLH-DSA-SHA2-192f,
EVP_SIGNATURE-SLH-DSA-SHA2-256s, EVP_SIGNATURE-SLH-DSA-SHA2-256f,
EVP_SIGNATURE-SLH-DSA-SHAKE-128s, EVP_SIGNATURE-SLH-DSA-SHAKE-128f,
EVP_SIGNATURE-SLH-DSA-SHAKE-192s, EVP_SIGNATURE-SLH-DSA-SHAKE-192f,
EVP_SIGNATURE-SLH-DSA-SHAKE-256s, EVP_SIGNATURE-SLH-DSA-SHAKE-256f
- EVP_PKEY SLH-DSA support

## 技术正文

## NAME


EVP_SIGNATURE-SLH-DSA,
EVP_SIGNATURE-SLH-DSA-SHA2-128s, EVP_SIGNATURE-SLH-DSA-SHA2-128f,
EVP_SIGNATURE-SLH-DSA-SHA2-192s, EVP_SIGNATURE-SLH-DSA-SHA2-192f,
EVP_SIGNATURE-SLH-DSA-SHA2-256s, EVP_SIGNATURE-SLH-DSA-SHA2-256f,
EVP_SIGNATURE-SLH-DSA-SHAKE-128s, EVP_SIGNATURE-SLH-DSA-SHAKE-128f,
EVP_SIGNATURE-SLH-DSA-SHAKE-192s, EVP_SIGNATURE-SLH-DSA-SHAKE-192f,
EVP_SIGNATURE-SLH-DSA-SHAKE-256s, EVP_SIGNATURE-SLH-DSA-SHAKE-256f
- EVP_PKEY SLH-DSA support

## DESCRIPTION


The **SLH-DSA-SHA2-128s**, **EVP_PKEY-SLH-DSA-SHA2-128f**,
**SLH-DSA-SHA2-192s**, **EVP_PKEY-SLH-DSA-SHA2-192f**,
**SLH-DSA-SHA2-256s**, **EVP_PKEY-SLH-DSA-SHA2-256f**,
**SLH-DSA-SHAKE-128s**, **EVP_PKEY-SLH-DSA-SHAKE-128f**,
**SLH-DSA-SHAKE-192s**, **EVP_PKEY-SLH-DSA-SHAKE-192f**,
**SLH-DSA-SHAKE-256s** and **EVP_PKEY-SLH-DSA-SHAKE-256f** EVP_PKEY implementations
supports key generation, one-shot sign and verify using the SLH-DSA
signature schemes described in FIPS 205.

The different algorithms names correspond to the parameter sets defined in
FIPS 205 Section 11 Table 2.
`s` types have smaller signature sizes, and the `f` variants are faster,
(The signatures range from ~8K to ~50K depending on the type chosen). There are
3 different security categories also depending on the type.

EVP_SIGNATURE_fetch(3) can be used to explicitely fetch one of the 12
algorithms which can then be used with EVP_PKEY_sign_message_init(3),
EVP_PKEY_sign(3), EVP_PKEY_verify_message_init(3), and
EVP_PKEY_verify(3) to perform one-shot message signing or verification.

The normal signing process (called Pure SLH-DSA Signature Generation)
encodes the message internally as 0x00 || len(ctx) || ctx || message.
where **ctx** is some optional value of size 0x00..0xFF.
OpenSSL also allows the message to not be encoded which is required for
testing. OpenSSL does not support Pre Hash SLH-DSA Signature Generation, but this
may be done by the user by doing Pre hash encoding externally and then chosing
the option to not encode the message.

### SLH-DSA Signature Parameters


The `context-string` parameter, described below, can be used for both signing
and verification.
It may be set by passing an OSSL_PARAM array to EVP_PKEY_sign_init_ex2(3) or
EVP_PKEY_verify_init_ex2(3)


- "context-string" (**OSSL_SIGNATURE_PARAM_CONTEXT_STRING**) <octet string>

A string of octets with length at most 255. By default it is the empty string.


The following parameters can be used when signing:
They can be set by passing an OSSL_PARAM array to EVP_PKEY_sign_init_ex2(3).


- "message-encoding" (**OSSL_SIGNATURE_PARAM_MESSAGE_ENCODING**) <integer>

The default value of 1 uses 'Pure SLH-DSA Signature Generation' as described
above. Setting it to 0 does not encode the message, which is used for testing,
but can also be used for 'Pre Hash SLH-DSA Signature Generation'.

- "test-entropy" (B<OSSL_SIGNATURE_PARAM_TEST_ENTROPY <octet string>

Used for testing to pass a optional random value.

- "deterministic" (**OSSL_SIGNATURE_PARAM_DETERMINISTIC**) <integer>

The default value of 0 generates a random value (using a DRBG) this is used when
processing the message. Setting this to 1 causes the private key seed to be used
instead. This value is ignored if "test-entropy" is set.


See EVP_PKEY-SLH-DSA(7) for information related to **SLH-DSA** keys.

## NOTES


For backwards compatibility reasons EVP_DigestSignInit_ex(), EVP_DigestSign(),
EVP_DigestVerifyInit_ex() and EVP_DigestVerify() may also be used, but the digest
passed in `mdname` must be NULL.

## EXAMPLES


To sign a message using an SLH-DSA EVP_PKEY structure:

```c
   void do_sign(EVP_PKEY *key, unsigned char *msg, size_t msg_len)
   {
       size_t sig_len;
       unsigned char *sig = NULL;
       const OSSL_PARAM params[] = {
           OSSL_PARAM_octet_string("context-string", (unsigned char *)"A context string", 33),
           OSSL_PARAM_END
       };
       EVP_PKEY_CTX *sctx = EVP_PKEY_CTX_new_from_pkey(NULL, pkey, NULL);
       EVP_SIGNATURE *sig_alg = EVP_SIGNATURE_fetch(NULL, "SLH-DSA-SHA2-128s", NULL);

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


EVP_PKEY-SLH-DSA(7)
provider-signature(7),
EVP_PKEY_sign(3),
EVP_PKEY_verify(3),

## HISTORY


This functionality was added in OpenSSL 3.5.

## COPYRIGHT


Copyright 2024-2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_SIGNATURE-SLH-DSA.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_SIGNATURE-SLH-DSA.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_SIGNATURE-SLH-DSA.pod`；SHA-256：`3812e8c22da7551ea9a29325ac5cad04b5d84c5345313eb783418820e76e8143`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
