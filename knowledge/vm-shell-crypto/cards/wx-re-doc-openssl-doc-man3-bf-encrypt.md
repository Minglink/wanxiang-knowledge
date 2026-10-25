---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bf-encrypt",
  "title": "OpenSSL：密码实现与接口 · BF_encrypt（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "BF_encrypt"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "a94aa2413d7ea27ebc248057c086e3170860833e23ac3633928af0ec7ee651ca",
  "generatedHash": "60522f7f0aa9a3a704c312ebec18ac6f4c80e404778b1fc1b53220bd098b4e67",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：BF_set_key, BF_encrypt, BF_decrypt, BF_ecb_encrypt, BF_cbc_encrypt, BF_cfb64_encrypt, BF_ofb64_encrypt, BF_options - Blowfish encryption",
  "l1": "All of the functions described on this page are deprecated. Applications should instead use EVP_EncryptInit_ex(3), EVP_EncryptUpdate(3) and EVP_EncryptFinal_ex(3) or the equivalently named decrypt functions. This library implements the Blowfish cipher, which was invented and described by Counterpane (see http://www.counterpane.com/blowfish.html ). Blowfish is a block cipher that operates on 64 bit (8 byte) blocks of data. It uses a variable size key, but typically, 128 bit (16 byte) keys are considered good for strong encryption. Blowfish can be used in the same modes as DES (see des_modes(7)). Blowfish is currently one of the faster block ciphers. It is quite a bit faster than DES, and much faster than IDEA or RC2. Blowfish consists of a key setup phase and the actual encryption or decryption phase. BF_set_key() sets up the **BF_KEY** **",
  "questions": [
    "BF_encrypt 如何用于密码实现与接口？",
    "BF_encrypt 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bf-encrypt",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BF_encrypt.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · BF_encrypt（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BF_set_key, BF_encrypt, BF_decrypt, BF_ecb_encrypt, BF_cbc_encrypt,
BF_cfb64_encrypt, BF_ofb64_encrypt, BF_options - Blowfish encryption

## 技术正文

## NAME


BF_set_key, BF_encrypt, BF_decrypt, BF_ecb_encrypt, BF_cbc_encrypt,
BF_cfb64_encrypt, BF_ofb64_encrypt, BF_options - Blowfish encryption

## SYNOPSIS


```c
#include <openssl/blowfish.h>

```

The following functions have been deprecated since OpenSSL 3.0, and can be
hidden entirely by defining **OPENSSL_API_COMPAT** with a suitable version value,
see openssl_user_macros(7):

```c
void BF_set_key(BF_KEY *key, int len, const unsigned char *data);

void BF_ecb_encrypt(const unsigned char *in, unsigned char *out,
                    BF_KEY *key, int enc);
void BF_cbc_encrypt(const unsigned char *in, unsigned char *out,
                    long length, BF_KEY *schedule,
                    unsigned char *ivec, int enc);
void BF_cfb64_encrypt(const unsigned char *in, unsigned char *out,
                      long length, BF_KEY *schedule,
                      unsigned char *ivec, int *num, int enc);
void BF_ofb64_encrypt(const unsigned char *in, unsigned char *out,
                      long length, BF_KEY *schedule,
                      unsigned char *ivec, int *num);
const char *BF_options(void);

void BF_encrypt(BF_LONG *data, const BF_KEY *key);
void BF_decrypt(BF_LONG *data, const BF_KEY *key);

```

## DESCRIPTION


All of the functions described on this page are deprecated. Applications should
instead use EVP_EncryptInit_ex(3), EVP_EncryptUpdate(3) and
EVP_EncryptFinal_ex(3) or the equivalently named decrypt functions.

This library implements the Blowfish cipher, which was invented and described
by Counterpane (see http://www.counterpane.com/blowfish.html ).

Blowfish is a block cipher that operates on 64 bit (8 byte) blocks of data.
It uses a variable size key, but typically, 128 bit (16 byte) keys are
considered good for strong encryption.  Blowfish can be used in the same
modes as DES (see des_modes(7)).  Blowfish is currently one
of the faster block ciphers.  It is quite a bit faster than DES, and much
faster than IDEA or RC2.

Blowfish consists of a key setup phase and the actual encryption or decryption
phase.

BF_set_key() sets up the **BF_KEY** **key** using the **len** bytes long key
at **data**.

BF_ecb_encrypt() is the basic Blowfish encryption and decryption function.
It encrypts or decrypts the first 64 bits of **in** using the key **key**,
putting the result in **out**.  **enc** decides if encryption (**BF_ENCRYPT**)
or decryption (**BF_DECRYPT**) shall be performed.  The vector pointed at by
**in** and **out** must be 64 bits in length, no less.  If they are larger,
everything after the first 64 bits is ignored.

The mode functions BF_cbc_encrypt(), BF_cfb64_encrypt() and BF_ofb64_encrypt()
all operate on variable length data.  They all take an initialization vector
**ivec** which needs to be passed along into the next call of the same function
for the same message.  **ivec** may be initialized with anything, but the
recipient needs to know what it was initialized with, or it won't be able
to decrypt.  Some programs and protocols simplify this, like SSH, where
**ivec** is simply initialized to zero.
BF_cbc_encrypt() operates on data that is a multiple of 8 bytes long, while
BF_cfb64_encrypt() and BF_ofb64_encrypt() are used to encrypt a variable
number of bytes (the amount does not have to be an exact multiple of 8).  The
purpose of the latter two is to simulate stream ciphers, and therefore, they
need the parameter **num**, which is a pointer to an integer where the current
offset in **ivec** is stored between calls.  This integer must be initialized
to zero when **ivec** is initialized.

BF_cbc_encrypt() is the Cipher Block Chaining function for Blowfish.  It
encrypts or decrypts the 64 bits chunks of **in** using the key **schedule**,
putting the result in **out**.  **enc** decides if encryption (BF_ENCRYPT) or
decryption (BF_DECRYPT) shall be performed.  **ivec** must point at an 8 byte
long initialization vector.

BF_cfb64_encrypt() is the CFB mode for Blowfish with 64 bit feedback.
It encrypts or decrypts the bytes in **in** using the key **schedule**,
putting the result in **out**.  **enc** decides if encryption (**BF_ENCRYPT**)
or decryption (**BF_DECRYPT**) shall be performed.  **ivec** must point at an
8 byte long initialization vector. **num** must point at an integer which must
be initially zero.

BF_ofb64_encrypt() is the OFB mode for Blowfish with 64 bit feedback.
It uses the same parameters as BF_cfb64_encrypt(), which must be initialized
the same way.

BF_encrypt() and BF_decrypt() are the lowest level functions for Blowfish
encryption.  They encrypt/decrypt the first 64 bits of the vector pointed by
**data**, using the key **key**.  These functions should not be used unless you
implement 'modes' of Blowfish.  The alternative is to use BF_ecb_encrypt().
If you still want to use these functions, you should be aware that they take
each 32-bit chunk in host-byte order, which is little-endian on little-endian
platforms and big-endian on big-endian ones.

## RETURN VALUES


None of the functions presented here return any value.

## NOTE


Applications should use the higher level functions
EVP_EncryptInit(3) etc. instead of calling these
functions directly.

## SEE ALSO


EVP_EncryptInit(3),
des_modes(7)

## HISTORY


All of these functions were deprecated in OpenSSL 3.0.

## COPYRIGHT


Copyright 2000-2020 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BF_encrypt.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BF_encrypt.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BF_encrypt.pod`；SHA-256：`a94aa2413d7ea27ebc248057c086e3170860833e23ac3633928af0ec7ee651ca`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
