---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-keyexch-dh",
  "title": "OpenSSL：EVP 密码接口 · EVP_KEYEXCH-DH（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "密码接口",
    "Provider",
    "openssl",
    "EVP_KEYEXCH-DH"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "fe0004384067f3a6afa6379140ec9ca80daf4abb402ea39b330551b7167f8f77",
  "generatedHash": "508d414133be802369efeb53763b8a9bf197ec929d99ae0de82f898ead0f9d1c",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "EVP 密码接口：EVP_KEYEXCH-DH - DH Key Exchange algorithm support",
  "l1": "Key exchange support for the **DH** and **DHX** key types. Please note that although both key types support the same key exchange operations, they cannot be used together in a single key exchange. It is not possible to use a private key of the **DH** type in key exchange with the public key of **DHX** type and vice versa. Sets the padding mode for the associated key exchange ctx. Setting a value of 1 will turn padding on. Setting a value of 0 will turn padding off. If padding is off then the derived shared secret may be smaller than the largest possible secret size. If padding is on then the derived shared secret will have its first bytes filled with zeros where necessary to make the shared secret the same size as the largest possible secret size. The padding mode parameter is ignored (and padding implicitly enabled) when the KDF type is ",
  "questions": [
    "EVP_KEYEXCH-DH 如何用于EVP 密码接口？",
    "EVP_KEYEXCH-DH 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-keyexch-dh",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KEYEXCH-DH.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：EVP 密码接口 · EVP_KEYEXCH-DH（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：EVP 密码接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_KEYEXCH-DH
- DH Key Exchange algorithm support

## 技术正文

## NAME


EVP_KEYEXCH-DH
- DH Key Exchange algorithm support

## DESCRIPTION


Key exchange support for the **DH** and **DHX** key types.

Please note that although both key types support the same key exchange
operations, they cannot be used together in a single key exchange. It
is not possible to use a private key of the **DH** type in key exchange
with the public key of **DHX** type and vice versa.

### DH and DHX key exchange parameters



- "pad" (**OSSL_EXCHANGE_PARAM_PAD**) <unsigned integer>

Sets the padding mode for the associated key exchange ctx.
Setting a value of 1 will turn padding on.
Setting a value of 0 will turn padding off.
If padding is off then the derived shared secret may be smaller than the
largest possible secret size.
If padding is on then the derived shared secret will have its first bytes
filled with zeros where necessary to make the shared secret the same size as
the largest possible secret size.
The padding mode parameter is ignored (and padding implicitly enabled) when
the KDF type is set to "X942KDF-ASN1" (**OSSL_KDF_NAME_X942KDF_ASN1**).

- "kdf-type" (**OSSL_EXCHANGE_PARAM_KDF_TYPE**) <UTF8 string>

- "kdf-digest" (**OSSL_EXCHANGE_PARAM_KDF_DIGEST**) <UTF8 string>

- "kdf-digest-props" (**OSSL_EXCHANGE_PARAM_KDF_DIGEST_PROPS**) <UTF8 string>

- "kdf-outlen" (**OSSL_EXCHANGE_PARAM_KDF_OUTLEN**) <unsigned integer>

- "kdf-ukm" (**OSSL_EXCHANGE_PARAM_KDF_UKM**) <octet string>

- "fips-indicator" (**OSSL_EXCHANGE_PARAM_FIPS_APPROVED_INDICATOR**) <integer>

- "key-check" (**OSSL_EXCHANGE_PARAM_FIPS_KEY_CHECK**) <integer>

- "digest-check" (**OSSL_EXCHANGE_PARAM_FIPS_DIGEST_CHECK**) <integer>

See provider-keyexch(7)/Common Key Exchange parameters.

- "cekalg" (**OSSL_KDF_PARAM_CEK_ALG**) <octet string ptr>

See provider-kdf(7)/KDF Parameters.


## EXAMPLES


The examples assume a host and peer both generate keys using the same
named group (or domain parameters). See EVP_PKEY-DH(7)/Examples.
Both the host and peer transfer their public key to each other.

To convert the peer's generated key pair to a public key in DER format in order
to transfer to the host:

```c
   EVP_PKEY *peer_key; /* It is assumed this contains the peers generated key */
   unsigned char *peer_pub_der = NULL;
   int peer_pub_der_len;

   peer_pub_der_len = i2d_PUBKEY(peer_key, &peer_pub_der);
   ...
   OPENSSL_free(peer_pub_der);

```

To convert the received peer's public key from DER format on the host:

```c
   const unsigned char *pd = peer_pub_der;
   EVP_PKEY *peer_pub_key = d2i_PUBKEY(NULL, &pd, peer_pub_der_len);
   ...
   EVP_PKEY_free(peer_pub_key);

```

To derive a shared secret on the host using the host's key and the peer's public
key:

```c
   /* It is assumed that the host_key and peer_pub_key are set up */
   void derive_secret(EVP_KEY *host_key, EVP_PKEY *peer_pub_key)
   {
       unsigned int pad = 1;
       OSSL_PARAM params[2];
       unsigned char *secret = NULL;
       size_t secret_len = 0;
       EVP_PKEY_CTX *dctx = EVP_PKEY_CTX_new_from_pkey(NULL, host_key, NULL);

       EVP_PKEY_derive_init(dctx);

       /* Optionally set the padding */
       params[0] = OSSL_PARAM_construct_uint(OSSL_EXCHANGE_PARAM_PAD, &pad);
       params[1] = OSSL_PARAM_construct_end();
       EVP_PKEY_CTX_set_params(dctx, params);

       EVP_PKEY_derive_set_peer(dctx, peer_pub_key);

       /* Get the size by passing NULL as the buffer */
       EVP_PKEY_derive(dctx, NULL, &secret_len);
       secret = OPENSSL_zalloc(secret_len);

       EVP_PKEY_derive(dctx, secret, &secret_len);
       ...
       OPENSSL_clear_free(secret, secret_len);
       EVP_PKEY_CTX_free(dctx);
   }

```

Very similar code can be used by the peer to derive the same shared secret
using the host's public key and the peer's generated key pair.

## SEE ALSO


EVP_PKEY-DH(7),
EVP_PKEY-FFC(7),
EVP_PKEY(3),
provider-keyexch(7),
provider-keymgmt(7),
OSSL_PROVIDER-default(7),
OSSL_PROVIDER-FIPS(7),

## COPYRIGHT


Copyright 2020-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/EVP_KEYEXCH-DH.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KEYEXCH-DH.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_KEYEXCH-DH.pod`；SHA-256：`fe0004384067f3a6afa6379140ec9ca80daf4abb402ea39b330551b7167f8f77`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
