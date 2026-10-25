---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-pkey-get-size",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY_get_size（man3）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY_get_size"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "344e7d655868da91ed5d086cc4d1fc0223a57c49f749e03604b6dd9072f5a278",
  "generatedHash": "59a9fe870ff61595dc6758b43a57a467f3438d9a3000ef0f25207d894f785a3c",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY_get_size, EVP_PKEY_get_bits, EVP_PKEY_get_security_bits, EVP_PKEY_bits, EVP_PKEY_security_bits, EVP_PKEY_size - EVP_PKEY information functions",
  "l1": "EVP_PKEY_get_size() returns the maximum suitable size for the output buffers for almost all operations that can be done with `pkey`. This corresponds to the provider parameter **OSSL_PKEY_PARAM_MAX_SIZE**. The primary documented use is with EVP_SignFinal(3) and EVP_SealInit(3), but it isn't limited there. The returned size is also large enough for the output buffer of EVP_PKEY_sign(3), EVP_PKEY_encrypt(3), EVP_PKEY_decrypt(3), EVP_PKEY_derive(3). It must be stressed that, unless the documentation for the operation that's being performed says otherwise, the size returned by EVP_PKEY_get_size() is only preliminary and not exact, so the final contents of the target buffer may be smaller. It is therefore crucial to take note of the size given back by the function that performs the operation, such as EVP_PKEY_sign(3) (the `siglen` argument wil",
  "questions": [
    "EVP_PKEY_get_size 如何用于非对称密钥与签名？",
    "EVP_PKEY_get_size 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-pkey-get-size",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_get_size.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY_get_size（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY_get_size, EVP_PKEY_get_bits, EVP_PKEY_get_security_bits,
EVP_PKEY_bits, EVP_PKEY_security_bits, EVP_PKEY_size
- EVP_PKEY information functions

## 技术正文

## NAME


EVP_PKEY_get_size, EVP_PKEY_get_bits, EVP_PKEY_get_security_bits,
EVP_PKEY_bits, EVP_PKEY_security_bits, EVP_PKEY_size
- EVP_PKEY information functions

## SYNOPSIS


```c
#include <openssl/evp.h>

int EVP_PKEY_get_size(const EVP_PKEY *pkey);
int EVP_PKEY_get_bits(const EVP_PKEY *pkey);
int EVP_PKEY_get_security_bits(const EVP_PKEY *pkey);

#define EVP_PKEY_bits EVP_PKEY_get_bits
#define EVP_PKEY_security_bits EVP_PKEY_get_security_bits
#define EVP_PKEY_size EVP_PKEY_get_size

```

## DESCRIPTION


EVP_PKEY_get_size() returns the maximum suitable size for the output
buffers for almost all operations that can be done with `pkey`.
This corresponds to the provider parameter **OSSL_PKEY_PARAM_MAX_SIZE**.
The primary documented use is with EVP_SignFinal(3) and
EVP_SealInit(3), but it isn't limited there.  The returned size is
also large enough for the output buffer of EVP_PKEY_sign(3),
EVP_PKEY_encrypt(3), EVP_PKEY_decrypt(3), EVP_PKEY_derive(3).

It must be stressed that, unless the documentation for the operation
that's being performed says otherwise, the size returned by
EVP_PKEY_get_size() is only preliminary and not exact, so the final
contents of the target buffer may be smaller.  It is therefore crucial
to take note of the size given back by the function that performs the
operation, such as EVP_PKEY_sign(3) (the `siglen` argument will
receive that length), to avoid bugs.

EVP_PKEY_get_bits() returns the cryptographic length of the cryptosystem
to which the key in `pkey` belongs, in bits.  Note that the definition
of cryptographic length is specific to the key cryptosystem.
This length corresponds to the provider parameter **OSSL_PKEY_PARAM_BITS**.

EVP_PKEY_get_security_bits() returns the number of security bits of the given
`pkey`, bits of security is defined in NIST SP800-57.
This corresponds to the provider parameter **OSSL_PKEY_PARAM_SECURITY_BITS**.

## RETURN VALUES


EVP_PKEY_get_size(), EVP_PKEY_get_bits() and EVP_PKEY_get_security_bits()
return a positive number, or 0 if this size isn't available.

## NOTES


Most functions that have an output buffer and are mentioned with
EVP_PKEY_get_size() have a functionality where you can pass NULL for the
buffer and still pass a pointer to an integer and get the exact size
that this function call delivers in the context that it's called in.
This allows those functions to be called twice, once to find out the
exact buffer size, then allocate the buffer in between, and call that
function again actually output the data.  For those functions, it
isn't strictly necessary to call EVP_PKEY_get_size() to find out the
buffer size, but may be useful in cases where it's desirable to know
the upper limit in advance.

It should also be especially noted that EVP_PKEY_get_size() shouldn't be
used to get the output size for EVP_DigestSignFinal(), according to
EVP_DigestSignFinal(3)/NOTES.

## SEE ALSO


provider-keymgmt(7),
EVP_SignFinal(3),
EVP_SealInit(3),
EVP_PKEY_sign(3),
EVP_PKEY_encrypt(3),
EVP_PKEY_decrypt(3),
EVP_PKEY_derive(3)

## HISTORY


The EVP_PKEY_bits(), EVP_PKEY_security_bits(), and EVP_PKEY_size() functions
were renamed to include `get` in their names in OpenSSL 3.0, respectively.
The old names are kept as non-deprecated alias macros.

## COPYRIGHT


Copyright 2020-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_PKEY_get_size.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_get_size.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_PKEY_get_size.pod`；SHA-256：`344e7d655868da91ed5d086cc4d1fc0223a57c49f749e03604b6dd9072f5a278`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
