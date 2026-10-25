---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-sha256-init",
  "title": "OpenSSL：SHA 摘要 · SHA256_Init（man3）",
  "type": "note",
  "tags": [
    "SHA",
    "消息摘要",
    "哈希",
    "openssl",
    "SHA256_Init",
    "SHA3摘要"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "adf6f1710b7be8541bea6e5b70b8de885c987ba80b638ec3d7490b4c252ea675",
  "generatedHash": "987e8b1fb6cbf30eb5f613f7aab449433fc9c730f9e5fa38f5542bd9a2a454b3",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "SHA 摘要：SHA1, SHA1_Init, SHA1_Update, SHA1_Final, SHA224, SHA224_Init, SHA224_Update, SHA224_Final, SHA256, SHA256_Init, SHA256_Update, SHA256_Final, SHA384, SHA384_Init, SHA384_Update, SHA384_Final, SHA512, SHA512_Init, SHA512_Update, SHA512_Final - Secure Hash Algorithm",
  "l1": "All of the functions described on this page except for SHA1(), SHA224(), SHA256(), SHA384() and SHA512() are deprecated. Applications should instead use EVP_DigestInit_ex(3), EVP_DigestUpdate(3) and EVP_DigestFinal_ex(3), or the quick one-shot function EVP_Q_digest(3). SHA1(), SHA224(), SHA256(), SHA384(), and SHA256() can continue to be used. They can also be replaced by, e.g., (EVP_Q_digest(d, n, md, NULL, NULL, \"SHA256\", NULL) ? md : NULL) SHA-1 (Secure Hash Algorithm) is a cryptographic hash function with a 160 bit output. SHA1() computes the SHA-1 message digest of the **n** bytes at **d** and places it in **md** (which must have space for SHA_DIGEST_LENGTH == 20 bytes of output). If **md** is NULL, the digest is placed in a static array. Note: setting **md** to NULL is **not thread safe**. The following functions may be used if the ",
  "questions": [
    "SHA256_Init 如何用于SHA 摘要？",
    "SHA256_Init 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-focus-crypto-sha-state",
      "kind": "机制参照"
    }
  ],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-sha256-init",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/SHA256_Init.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：SHA 摘要 · SHA256_Init（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：SHA 摘要。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

SHA1, SHA1_Init, SHA1_Update, SHA1_Final, SHA224, SHA224_Init, SHA224_Update,
SHA224_Final, SHA256, SHA256_Init, SHA256_Update, SHA256_Final, SHA384,
SHA384_Init, SHA384_Update, SHA384_Final, SHA512, SHA512_Init, SHA512_Update,
SHA512_Final - Secure Hash Algorithm

## 技术正文

## NAME


SHA1, SHA1_Init, SHA1_Update, SHA1_Final, SHA224, SHA224_Init, SHA224_Update,
SHA224_Final, SHA256, SHA256_Init, SHA256_Update, SHA256_Final, SHA384,
SHA384_Init, SHA384_Update, SHA384_Final, SHA512, SHA512_Init, SHA512_Update,
SHA512_Final - Secure Hash Algorithm

## SYNOPSIS


```c
#include <openssl/sha.h>

unsigned char *SHA1(const unsigned char *data, size_t count, unsigned char *md_buf);
unsigned char *SHA224(const unsigned char *data, size_t count, unsigned char *md_buf);
unsigned char *SHA256(const unsigned char *data, size_t count, unsigned char *md_buf);
unsigned char *SHA384(const unsigned char *data, size_t count, unsigned char *md_buf);
unsigned char *SHA512(const unsigned char *data, size_t count, unsigned char *md_buf);

```

The following functions have been deprecated since OpenSSL 3.0, and can be
hidden entirely by defining **OPENSSL_API_COMPAT** with a suitable version value,
see openssl_user_macros(7):

```c
int SHA1_Init(SHA_CTX *c);
int SHA1_Update(SHA_CTX *c, const void *data, size_t len);
int SHA1_Final(unsigned char *md, SHA_CTX *c);

int SHA224_Init(SHA256_CTX *c);
int SHA224_Update(SHA256_CTX *c, const void *data, size_t len);
int SHA224_Final(unsigned char *md, SHA256_CTX *c);

int SHA256_Init(SHA256_CTX *c);
int SHA256_Update(SHA256_CTX *c, const void *data, size_t len);
int SHA256_Final(unsigned char *md, SHA256_CTX *c);

int SHA384_Init(SHA512_CTX *c);
int SHA384_Update(SHA512_CTX *c, const void *data, size_t len);
int SHA384_Final(unsigned char *md, SHA512_CTX *c);

int SHA512_Init(SHA512_CTX *c);
int SHA512_Update(SHA512_CTX *c, const void *data, size_t len);
int SHA512_Final(unsigned char *md, SHA512_CTX *c);

```

## DESCRIPTION


All of the functions described on this page
except for SHA1(), SHA224(), SHA256(), SHA384() and SHA512() are deprecated.
Applications should instead use EVP_DigestInit_ex(3), EVP_DigestUpdate(3)
and EVP_DigestFinal_ex(3), or the quick one-shot function EVP_Q_digest(3).
SHA1(), SHA224(), SHA256(), SHA384(), and SHA256()
can continue to be used. They can also be replaced by, e.g.,

```c
   (EVP_Q_digest(d, n, md, NULL, NULL, "SHA256", NULL) ? md : NULL)

```

SHA-1 (Secure Hash Algorithm) is a cryptographic hash function with a
160 bit output.

SHA1() computes the SHA-1 message digest of the **n**
bytes at **d** and places it in **md** (which must have space for
SHA_DIGEST_LENGTH == 20 bytes of output). If **md** is NULL, the digest
is placed in a static array. Note: setting **md** to NULL is **not thread safe**.

The following functions may be used if the message is not completely
stored in memory:

SHA1_Init() initializes a **SHA_CTX** structure.

SHA1_Update() can be called repeatedly with chunks of the message to
be hashed (**len** bytes at **data**).

SHA1_Final() places the message digest in **md**, which must have space
for SHA_DIGEST_LENGTH == 20 bytes of output, and erases the **SHA_CTX**.

The SHA224, SHA256, SHA384 and SHA512 families of functions operate in the
same way as for the SHA1 functions. Note that SHA224 and SHA256 use a
**SHA256_CTX** object instead of **SHA_CTX**. SHA384 and SHA512 use **SHA512_CTX**.
The buffer **md** must have space for the output from the SHA variant being used
(defined by SHA224_DIGEST_LENGTH, SHA256_DIGEST_LENGTH, SHA384_DIGEST_LENGTH and
SHA512_DIGEST_LENGTH). Also note that, as for the SHA1() function above, the
SHA224(), SHA256(), SHA384() and SHA512() functions are not thread safe if
**md** is NULL.

## RETURN VALUES


SHA1(), SHA224(), SHA256(), SHA384() and SHA512() return a pointer to the hash
value.

SHA1_Init(), SHA1_Update() and SHA1_Final() and equivalent SHA224, SHA256,
SHA384 and SHA512 functions return 1 for success, 0 otherwise.

## CONFORMING TO


US Federal Information Processing Standard FIPS PUB 180-4 (Secure Hash
Standard),
ANSI X9.30

## SEE ALSO


EVP_Q_digest(3),
EVP_DigestInit(3)

## HISTORY


All of these functions except SHA*() were deprecated in OpenSSL 3.0.

## COPYRIGHT


Copyright 2000-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/SHA256_Init.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/SHA256_Init.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/SHA256_Init.pod`；SHA-256：`adf6f1710b7be8541bea6e5b70b8de885c987ba80b638ec3d7490b4c252ea675`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
