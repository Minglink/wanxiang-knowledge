---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-rand-bytes",
  "title": "OpenSSL：密码随机数 · RAND_bytes（man3）",
  "type": "note",
  "tags": [
    "随机数",
    "熵源",
    "密钥生成",
    "openssl",
    "RAND_bytes"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "58fb8944556fd8d19f7c2602ea143d06775a63ec2032f7d0bb101c69b4172bb8",
  "generatedHash": "dea223b2cb57c2df4572cfd53d90026cfd2288b2c1bc054b2e1cf3baa0d9f7f6",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码随机数：RAND_bytes, RAND_priv_bytes, RAND_bytes_ex, RAND_priv_bytes_ex, RAND_pseudo_bytes, RAND_set1_random_provider - generate random data",
  "l1": "RAND_bytes() generates **num** random bytes using a cryptographically secure pseudo random generator (CSPRNG) and stores them in **buf**. **buf** **MUST NOT** be NULL. RAND_priv_bytes() has the same semantics as RAND_bytes(). It is intended to be used for generating values that should remain private. If using the default RAND_METHOD, this function uses a separate \"private\" PRNG instance so that a compromise of the \"public\" PRNG instance will not affect the secrecy of these private values, as described in RAND(7) and EVP_RAND(7). RAND_bytes_ex() and RAND_priv_bytes_ex() are the same as RAND_bytes() and RAND_priv_bytes() except that they both take additional `strength` and `ctx` parameters. The bytes generated will have a security strength of at least `strength` bits. The DRBG used for the operation is the public or private DRBG associated ",
  "questions": [
    "RAND_bytes 如何用于密码随机数？",
    "RAND_bytes 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-rand-bytes",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/RAND_bytes.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码随机数 · RAND_bytes（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码随机数。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

RAND_bytes, RAND_priv_bytes, RAND_bytes_ex, RAND_priv_bytes_ex,
RAND_pseudo_bytes, RAND_set1_random_provider - generate random data

## 技术正文

## NAME


RAND_bytes, RAND_priv_bytes, RAND_bytes_ex, RAND_priv_bytes_ex,
RAND_pseudo_bytes, RAND_set1_random_provider - generate random data

## SYNOPSIS


```c
#include <openssl/rand.h>

int RAND_bytes(unsigned char *buf, int num);
int RAND_priv_bytes(unsigned char *buf, int num);

int RAND_bytes_ex(OSSL_LIB_CTX *ctx, unsigned char *buf, size_t num,
                  unsigned int strength);
int RAND_priv_bytes_ex(OSSL_LIB_CTX *ctx, unsigned char *buf, size_t num,
                       unsigned int strength);

int RAND_set1_random_provider(OSSL_LIB_CTX *ctx, OSSL_PROVIDER *p);

```

The following function has been deprecated since OpenSSL 1.1.0, and can be
hidden entirely by defining **OPENSSL_API_COMPAT** with a suitable version value,
see openssl_user_macros(7):

```c
int RAND_pseudo_bytes(unsigned char *buf, int num);

```

## DESCRIPTION


RAND_bytes() generates **num** random bytes using a cryptographically
secure pseudo random generator (CSPRNG) and stores them in **buf**. **buf** **MUST NOT** be NULL.

RAND_priv_bytes() has the same semantics as RAND_bytes().  It is intended to
be used for generating values that should remain private. If using the
default RAND_METHOD, this function uses a separate "private" PRNG
instance so that a compromise of the "public" PRNG instance will not
affect the secrecy of these private values, as described in RAND(7)
and EVP_RAND(7).

RAND_bytes_ex() and RAND_priv_bytes_ex() are the same as RAND_bytes() and
RAND_priv_bytes() except that they both take additional `strength` and
`ctx` parameters. The bytes generated will have a security strength of at
least `strength` bits.
The DRBG used for the operation is the public or private DRBG associated with
the specified `ctx`. The parameter can be NULL, in which case
the default library context is used (see OSSL_LIB_CTX(3).
If the default RAND_METHOD has been changed then for compatibility reasons the
RAND_METHOD will be used in preference and the DRBG of the library context
ignored.

RAND_set1_random_provider() specifies a provider, `prov`, which will be used
by the library context `ctx` for all of the generate calls above instead
of the built-in in DRBGs and entropy source.  Pass NULL for the provider
to disable the random provider functionality.  In this case, the built-in DRBGs
and entropy source will be used.  This call should not be considered thread safe.

## NOTES


By default, the OpenSSL CSPRNG supports a security level of 256 bits, provided it
was able to seed itself from a trusted entropy source.
On all major platforms supported by OpenSSL (including the Unix-like platforms
and Windows), OpenSSL is configured to automatically seed the CSPRNG on first use
using the operating systems's random generator.

If the entropy source fails or is not available, the CSPRNG will enter an
error state and refuse to generate random bytes. For that reason, it is important
to always check the error return value of RAND_bytes() and RAND_priv_bytes() and
not take randomness for granted.

On other platforms, there might not be a trusted entropy source available
or OpenSSL might have been explicitly configured to use different entropy sources.
If you are in doubt about the quality of the entropy source, don't hesitate to ask
your operating system vendor or post a question on GitHub or the openssl-users
mailing list.

## RETURN VALUES


RAND_bytes() and RAND_priv_bytes()
return 1 on success, -1 if not supported by the current
RAND method, or 0 on other failure. The error code can be
obtained by ERR_get_error(3).

RAND_set1_random_provider() returns 1 on success and 0 on failure.

## SEE ALSO


RAND_add(3),
RAND_bytes(3),
RAND_priv_bytes(3),
ERR_get_error(3),
RAND(7),
EVP_RAND(7)

## HISTORY



- *

RAND_pseudo_bytes() was deprecated in OpenSSL 1.1.0; use RAND_bytes() instead.

- *

The RAND_priv_bytes() function was added in OpenSSL 1.1.1.

- *

The RAND_bytes_ex() and RAND_priv_bytes_ex() functions were added in OpenSSL 3.0

- *

The RAND_set1_random_provider() function was added in OpenSSL 3.5


## COPYRIGHT


Copyright 2000-2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/RAND_bytes.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/RAND_bytes.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/RAND_bytes.pod`；SHA-256：`58fb8944556fd8d19f7c2602ea143d06775a63ec2032f7d0bb101c69b4172bb8`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
