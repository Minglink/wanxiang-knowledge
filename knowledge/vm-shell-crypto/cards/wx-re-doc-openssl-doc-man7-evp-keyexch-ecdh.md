---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-evp-keyexch-ecdh",
  "title": "OpenSSL：EVP 密码接口 · EVP_KEYEXCH-ECDH（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "密码接口",
    "Provider",
    "openssl",
    "EVP_KEYEXCH-ECDH",
    "椭圆曲线密钥交换"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "397127289cf03cf79a3997fc281d17b749a47069d7c0db4228183e9f139bf167",
  "generatedHash": "8d1b998a69029b420c635bb94d5a163fde0a7e983284085a69d0c8b6199a96fb",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "EVP 密码接口：EVP_KEYEXCH-ECDH - ECDH Key Exchange algorithm support",
  "l1": "Key exchange support for the **ECDH** key type. Sets or gets the ECDH mode of operation for the associated key exchange ctx. In the context of an Elliptic Curve Diffie-Hellman key exchange, this parameter can be used to select between the plain Diffie-Hellman (DH) or Cofactor Diffie-Hellman (CDH) variants of the key exchange algorithm. When setting, the value should be 1, 0 or -1, respectively forcing cofactor mode on, off, or resetting it to the default for the private key associated with the given key exchange ctx. When getting, the value should be either 1 or 0, respectively signaling if the cofactor mode is on or off. See also provider-keymgmt(7) for the related **OSSL_PKEY_PARAM_USE_COFACTOR_ECDH** parameter that can be set on a per-key basis. The OpenSSL FIPS provider also supports the following parameters: See provider-keyexch(7)/C",
  "questions": [
    "EVP_KEYEXCH-ECDH 如何用于EVP 密码接口？",
    "EVP_KEYEXCH-ECDH 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-evp-keyexch-ecdh",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KEYEXCH-ECDH.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：EVP 密码接口 · EVP_KEYEXCH-ECDH（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：EVP 密码接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_KEYEXCH-ECDH - ECDH Key Exchange algorithm support

## 技术正文

## NAME


EVP_KEYEXCH-ECDH - ECDH Key Exchange algorithm support

## DESCRIPTION


Key exchange support for the **ECDH** key type.

### ECDH Key Exchange parameters



- "ecdh-cofactor-mode" (**OSSL_EXCHANGE_PARAM_EC_ECDH_COFACTOR_MODE**) <integer>

Sets or gets the ECDH mode of operation for the associated key exchange ctx.

In the context of an Elliptic Curve Diffie-Hellman key exchange, this parameter
can be used to select between the plain Diffie-Hellman (DH) or Cofactor
Diffie-Hellman (CDH) variants of the key exchange algorithm.

When setting, the value should be 1, 0 or -1, respectively forcing cofactor mode
on, off, or resetting it to the default for the private key associated with the
given key exchange ctx.

When getting, the value should be either 1 or 0, respectively signaling if the
cofactor mode is on or off.

See also provider-keymgmt(7) for the related
**OSSL_PKEY_PARAM_USE_COFACTOR_ECDH** parameter that can be set on a
per-key basis.

- "kdf-type" (**OSSL_EXCHANGE_PARAM_KDF_TYPE**) <UTF8 string>

- "kdf-digest" (**OSSL_EXCHANGE_PARAM_KDF_DIGEST**) <UTF8 string>

- "kdf-digest-props" (**OSSL_EXCHANGE_PARAM_KDF_DIGEST_PROPS**) <UTF8 string>

- "kdf-outlen" (**OSSL_EXCHANGE_PARAM_KDF_OUTLEN**) <unsigned integer>

- "kdf-ukm" (**OSSL_EXCHANGE_PARAM_KDF_UKM**) <octet string>


The OpenSSL FIPS provider also supports the following parameters:


- "fips-indicator" (**OSSL_EXCHANGE_PARAM_FIPS_APPROVED_INDICATOR**) <integer>

- "key-check" (**OSSL_EXCHANGE_PARAM_FIPS_KEY_CHECK**) <integer>

- "digest-check" (**OSSL_EXCHANGE_PARAM_FIPS_DIGEST_CHECK**) <integer>

See provider-keyexch(7)/Common Key Exchange parameters.

- "ecdh-cofactor-check" (**OSSL_EXCHANGE_PARAM_FIPS_ECDH_COFACTOR_CHECK**) <integer>

If required this parameter should before OSSL_FUNC_keyexch_derive().
The default value of 1 causes an error during the OSSL_FUNC_keyexch_derive if
the EC curve has a cofactor that is not 1, and the cofactor is not used.
Setting this to 0 will ignore the error and set the approved
"fips-indicator" to 0.
This option breaks FIPS compliance if it causes the approved "fips-indicator"
to return 0.


## EXAMPLES


Examples of key agreement can be found in demos/keyexch.

Keys for the host and peer must be generated as shown in
EVP_PKEY-EC(7)/Examples using the same curve name.

The code to generate a shared secret for the normal case is identical to
EVP_KEYEXCH-DH(7)/Examples.

To derive a shared secret on the host using the host's key and the peer's public
key but also using X963KDF with a user key material:

```c
   /* It is assumed that the host_key, peer_pub_key and ukm are set up */
   void derive_secret(EVP_PKEY *host_key, EVP_PKEY *peer_key,
                      unsigned char *ukm, size_t ukm_len)
   {
       unsigned char secret[64];
       size_t out_len = sizeof(secret);
       size_t secret_len = out_len;
       unsigned int pad = 1;
       OSSL_PARAM params[6];
       EVP_PKEY_CTX *dctx = EVP_PKEY_CTX_new_from_pkey(NULL, host_key, NULL);

       EVP_PKEY_derive_init(dctx);

       params[0] = OSSL_PARAM_construct_uint(OSSL_EXCHANGE_PARAM_PAD, &pad);
       params[1] = OSSL_PARAM_construct_utf8_string(OSSL_EXCHANGE_PARAM_KDF_TYPE,
                                                    "X963KDF", 0);
       params[2] = OSSL_PARAM_construct_utf8_string(OSSL_EXCHANGE_PARAM_KDF_DIGEST,
                                                    "SHA1", 0);
       params[3] = OSSL_PARAM_construct_size_t(OSSL_EXCHANGE_PARAM_KDF_OUTLEN,
                                               &out_len);
       params[4] = OSSL_PARAM_construct_octet_string(OSSL_EXCHANGE_PARAM_KDF_UKM,
                                                     ukm, ukm_len);
       params[5] = OSSL_PARAM_construct_end();
       EVP_PKEY_CTX_set_params(dctx, params);

       EVP_PKEY_derive_set_peer(dctx, peer_pub_key);
       EVP_PKEY_derive(dctx, secret, &secret_len);
       ...
       OPENSSL_clear_free(secret, secret_len);
       EVP_PKEY_CTX_free(dctx);
   }

```

## SEE ALSO


EVP_PKEY-EC(7)
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

- 上游：[doc/man7/EVP_KEYEXCH-ECDH.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/EVP_KEYEXCH-ECDH.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/EVP_KEYEXCH-ECDH.pod`；SHA-256：`397127289cf03cf79a3997fc281d17b749a47069d7c0db4228183e9f139bf167`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
