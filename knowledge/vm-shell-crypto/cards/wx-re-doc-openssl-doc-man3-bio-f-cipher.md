---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bio-f-cipher",
  "title": "OpenSSL：密码数据流 · BIO_f_cipher（man3）",
  "type": "note",
  "tags": [
    "BIO",
    "输入输出",
    "缓冲区",
    "openssl",
    "BIO_f_cipher"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "213335eb86e0c3caa73a93e8fa2ce22b9c45f3cac830a385a5a02bf9b4caf7a1",
  "generatedHash": "0b0fac5150b6529f2f233d1b20c18b3af389191ab381a973c05b5d5b2a861729",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码数据流：BIO_f_cipher, BIO_set_cipher, BIO_get_cipher_status, BIO_get_cipher_ctx - cipher BIO filter",
  "l1": "BIO_f_cipher() returns the cipher BIO method. This is a filter BIO that encrypts any data written through it, and decrypts any data read from it. It is a BIO wrapper for the cipher routines EVP_CipherInit(), EVP_CipherUpdate() and EVP_CipherFinal(). Cipher BIOs do not support BIO_gets() or BIO_puts(). BIO_flush() on an encryption BIO that is being written through is used to signal that no more data is to be encrypted: this is used to flush and possibly pad the final block through the BIO. BIO_set_cipher() sets the cipher of BIO **b** to **cipher** using key **key** and IV **iv**. **enc** should be set to 1 for encryption and zero for decryption. When reading from an encryption BIO the final block is automatically decrypted and checked when EOF is detected. BIO_get_cipher_status() is a BIO_ctrl() macro which can be called to determine whet",
  "questions": [
    "BIO_f_cipher 如何用于密码数据流？",
    "BIO_f_cipher 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bio-f-cipher",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_f_cipher.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码数据流 · BIO_f_cipher（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码数据流。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BIO_f_cipher, BIO_set_cipher, BIO_get_cipher_status, BIO_get_cipher_ctx - cipher BIO filter

## 技术正文

## NAME


BIO_f_cipher, BIO_set_cipher, BIO_get_cipher_status, BIO_get_cipher_ctx - cipher BIO filter

## SYNOPSIS



```c
#include <openssl/bio.h>
#include <openssl/evp.h>

const BIO_METHOD *BIO_f_cipher(void);
int BIO_set_cipher(BIO *b, const EVP_CIPHER *cipher,
                   const unsigned char *key, const unsigned char *iv, int enc);
int BIO_get_cipher_status(BIO *b);
int BIO_get_cipher_ctx(BIO *b, EVP_CIPHER_CTX **pctx);

```

## DESCRIPTION


BIO_f_cipher() returns the cipher BIO method. This is a filter
BIO that encrypts any data written through it, and decrypts any data
read from it. It is a BIO wrapper for the cipher routines
EVP_CipherInit(), EVP_CipherUpdate() and EVP_CipherFinal().

Cipher BIOs do not support BIO_gets() or BIO_puts().

BIO_flush() on an encryption BIO that is being written through is
used to signal that no more data is to be encrypted: this is used
to flush and possibly pad the final block through the BIO.

BIO_set_cipher() sets the cipher of BIO **b** to **cipher** using key **key**
and IV **iv**. **enc** should be set to 1 for encryption and zero for
decryption.

When reading from an encryption BIO the final block is automatically
decrypted and checked when EOF is detected. BIO_get_cipher_status()
is a BIO_ctrl() macro which can be called to determine whether the
decryption operation was successful.

BIO_get_cipher_ctx() is a BIO_ctrl() macro which retrieves the internal
BIO cipher context. The retrieved context can be used in conjunction
with the standard cipher routines to set it up. This is useful when
BIO_set_cipher() is not flexible enough for the applications needs.

## NOTES


When encrypting BIO_flush() **must** be called to flush the final block
through the BIO. If it is not then the final block will fail a subsequent
decrypt.

When decrypting an error on the final block is signaled by a zero
return value from the read operation. A successful decrypt followed
by EOF will also return zero for the final read. BIO_get_cipher_status()
should be called to determine if the decrypt was successful.

As always, if BIO_gets() or BIO_puts() support is needed then it can
be achieved by preceding the cipher BIO with a buffering BIO.

## RETURN VALUES


BIO_f_cipher() returns the cipher BIO method.

BIO_set_cipher() returns 1 for success and 0 for failure.

BIO_get_cipher_status() returns 1 for a successful decrypt and <=0
for failure.

BIO_get_cipher_ctx() returns 1 for success and <=0 for failure.

## COPYRIGHT


Copyright 2000-2020 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BIO_f_cipher.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_f_cipher.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BIO_f_cipher.pod`；SHA-256：`213335eb86e0c3caa73a93e8fa2ce22b9c45f3cac830a385a5a02bf9b4caf7a1`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
