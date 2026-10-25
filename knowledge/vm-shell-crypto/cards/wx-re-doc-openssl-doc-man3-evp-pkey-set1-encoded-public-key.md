---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-pkey-set1-encoded-public-key",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY_set1_encoded_public_key（man3）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY_set1_encoded_public_key"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "04d184097622060b45141d1bb47b629d2f79e1f3217c9dcbc7e3fad8bd42ad8b",
  "generatedHash": "ae3a04be4a91877d5bf2568bd0a662c9569e2e5ee7a3116fb08ae2aaee99fcb0",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY_set1_encoded_public_key, EVP_PKEY_get1_encoded_public_key, EVP_PKEY_set1_tls_encodedpoint, EVP_PKEY_get1_tls_encodedpoint - functions to set and get public key data within an EVP_PKEY",
  "l1": "EVP_PKEY_set1_encoded_public_key() can be used to set the public key value within an existing EVP_PKEY object, which does not yet have either a public or private key assigned. For the built-in OpenSSL algorithms this currently only works for those that support key exchange or key encapsulation. Parameters are not set as part of this operation, so typically an application will create an EVP_PKEY first, set the parameters on it, and then call this function. For example setting the parameters might be done using EVP_PKEY_copy_parameters(3). The format for the encoded public key will depend on the algorithm in use. For DH it should be encoded as a positive integer in big-endian form. For EC is should be a point conforming to Sec. 2.3.4 of the SECG SEC 1 (\"Elliptic Curve Cryptography\") standard. For **X25519** and **X448** it should be encoded",
  "questions": [
    "EVP_PKEY_set1_encoded_public_key 如何用于非对称密钥与签名？",
    "EVP_PKEY_set1_encoded_public_key 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-pkey-set1-encoded-public-key",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_set1_encoded_public_key.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY_set1_encoded_public_key（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY_set1_encoded_public_key, EVP_PKEY_get1_encoded_public_key,
EVP_PKEY_set1_tls_encodedpoint, EVP_PKEY_get1_tls_encodedpoint
- functions to set and get public key data within an EVP_PKEY

## 技术正文

## NAME


EVP_PKEY_set1_encoded_public_key, EVP_PKEY_get1_encoded_public_key,
EVP_PKEY_set1_tls_encodedpoint, EVP_PKEY_get1_tls_encodedpoint
- functions to set and get public key data within an EVP_PKEY

## SYNOPSIS


```c
#include <openssl/evp.h>

int EVP_PKEY_set1_encoded_public_key(EVP_PKEY *pkey,
                                     const unsigned char *pub, size_t publen);

size_t EVP_PKEY_get1_encoded_public_key(EVP_PKEY *pkey, unsigned char **ppub);

```

The following functions have been deprecated since OpenSSL 3.0, and can be
hidden entirely by defining **OPENSSL_API_COMPAT** with a suitable version value,
see openssl_user_macros(7):

```c
int EVP_PKEY_set1_tls_encodedpoint(EVP_PKEY *pkey,
                                   const unsigned char *pt, size_t ptlen);

size_t EVP_PKEY_get1_tls_encodedpoint(EVP_PKEY *pkey, unsigned char **ppt);

```

## DESCRIPTION


EVP_PKEY_set1_encoded_public_key() can be used to set the public key value
within an existing EVP_PKEY object, which does not yet have either a public or
private key assigned.
For the built-in OpenSSL algorithms this currently only works for those that
support key exchange or key encapsulation.
Parameters are not set as part of this operation, so typically an application
will create an EVP_PKEY first, set the parameters on it, and then call this
function.
For example setting the parameters might be done using
EVP_PKEY_copy_parameters(3).

The format for the encoded public key will depend on the algorithm in use. For
DH it should be encoded as a positive integer in big-endian form. For EC is
should be a point conforming to Sec. 2.3.4 of the SECG SEC 1 ("Elliptic
Curve Cryptography") standard. For **X25519** and **X448** it should be encoded
in the format defined by RFC7748.
For **ML-KEM-512**, **ML-KEM-768** and **ML-KEM-1024**, this is the public key
format defined in **FIPS 203** (the 12-bit per-coefficient encoded public `t`
vector and 32-byte matrix seed `rho`).

The key to be updated is supplied in **pkey**. The buffer containing the encoded
key is pointed to be **pub**. The length of the buffer is supplied in **publen**.

EVP_PKEY_get1_encoded_public_key() does the equivalent operation except that
the encoded public key is returned to the application. The key containing the
public key data is supplied in **pkey**. A buffer containing the encoded key will
be allocated and stored in ***ppub**. The length of the encoded public key is
returned by the function. The application is responsible for freeing the
allocated buffer.

The macro EVP_PKEY_set1_tls_encodedpoint() is deprecated and simply calls
EVP_PKEY_set1_encoded_public_key() with all the same arguments. New applications
should use EVP_PKEY_set1_encoded_public_key() instead.

The macro EVP_PKEY_get1_tls_encodedpoint() is deprecated and simply calls
EVP_PKEY_get1_encoded_public_key() with all the same arguments. New applications
should use EVP_PKEY_get1_encoded_public_key() instead.


## RETURN VALUES


EVP_PKEY_set1_encoded_public_key() returns 1 for success and 0 or a negative
value for failure.

EVP_PKEY_get1_encoded_public_key() returns the length of the encoded key or 0 for failure.

## EXAMPLES


See EVP_PKEY_derive_init(3) and EVP_PKEY_derive(3) for information about
performing a key exchange operation.

### Set up a peer's EVP_PKEY ready for a key exchange operation


```c
#include <openssl/evp.h>

int exchange(EVP_PKEY *ourkey, unsigned char *peer_pub, size_t peer_pub_len)
{
    EVP_PKEY *peerkey = EVP_PKEY_new();

    if (peerkey == NULL || EVP_PKEY_copy_parameters(peerkey, ourkey) <= 0)
        return 0;

    if (EVP_PKEY_set1_encoded_public_key(peerkey, peer_pub,
                                         peer_pub_len) <= 0)
        return 0;

    /* Do the key exchange here */

    EVP_PKEY_free(peerkey);

    return 1;
}

```

### Get an encoded public key to send to a peer


```c
#include <openssl/evp.h>

int get_encoded_pub_key(EVP_PKEY *ourkey)
{
    unsigned char *pubkey;
    size_t pubkey_len;

   pubkey_len = EVP_PKEY_get1_encoded_public_key(ourkey, &pubkey);
   if (pubkey_len == 0)
       return 0;

   /*
    * Send the encoded public key stored in the buffer at "pubkey" and of
    * length pubkey_len, to the peer.
    */

   OPENSSL_free(pubkey);
   return 1;
}

```

## SEE ALSO


EVP_PKEY_new(3),
EVP_PKEY_copy_parameters(3),
EVP_PKEY_derive_init(3),
EVP_PKEY_derive(3),
EVP_PKEY-DH(7),
EVP_PKEY-EC(7),
EVP_PKEY-X25519(7),
EVP_PKEY-X448(7),
EVP_PKEY-ML-KEM-512(7),
EVP_PKEY-ML-KEM-768(7),
EVP_PKEY-ML-KEM-1024(7).

## HISTORY


EVP_PKEY_set1_encoded_public_key() and EVP_PKEY_get1_encoded_public_key() were
added in OpenSSL 3.0.

EVP_PKEY_set1_tls_encodedpoint() and EVP_PKEY_get1_tls_encodedpoint() were
deprecated in OpenSSL 3.0.

Support for **ML-KEM** was added in OpenSSL 3.5.

## COPYRIGHT


Copyright 2020-2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_PKEY_set1_encoded_public_key.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_set1_encoded_public_key.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_PKEY_set1_encoded_public_key.pod`；SHA-256：`04d184097622060b45141d1bb47b629d2f79e1f3217c9dcbc7e3fad8bd42ad8b`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
