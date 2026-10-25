---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-rand",
  "title": "OpenSSL：密码随机数 · RAND（man7）",
  "type": "note",
  "tags": [
    "随机数",
    "熵源",
    "密钥生成",
    "openssl",
    "RAND"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "d63b943972ad87306fec797c4194d64e1338ed3663f51946a265596873ba186d",
  "generatedHash": "dfc6662931441d5943f5e61f1a319ac35ab82a684a3e59ef75224970660f2558",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码随机数：RAND - the OpenSSL random generator",
  "l1": "Random numbers are a vital part of cryptography, they are needed to provide unpredictability for tasks like key generation, creating salts, and many more. Software-based generators must be seeded with external randomness before they can be used as a cryptographically-secure pseudo-random number generator (CSPRNG). The availability of common hardware with special instructions and modern operating systems, which may use items such as interrupt jitter and network packet timings, can be reasonable sources of seeding material. OpenSSL comes with a default implementation of the RAND API which is based on the deterministic random bit generator (DRBG) model as described in [NIST SP 800-90A Rev. 1]. The default random generator will initialize automatically on first use and will be fully functional without having to be initialized ('seeded') expli",
  "questions": [
    "RAND 如何用于密码随机数？",
    "RAND 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-rand",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/RAND.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码随机数 · RAND（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码随机数。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

RAND
- the OpenSSL random generator

## 技术正文

## NAME


RAND
- the OpenSSL random generator

## DESCRIPTION


Random numbers are a vital part of cryptography, they are needed to provide
unpredictability for tasks like key generation, creating salts, and many more.
Software-based generators must be seeded with external randomness before they
can be used as a cryptographically-secure pseudo-random number generator
(CSPRNG).
The availability of common hardware with special instructions and
modern operating systems, which may use items such as interrupt jitter
and network packet timings, can be reasonable sources of seeding material.

OpenSSL comes with a default implementation of the RAND API which is based on
the deterministic random bit generator (DRBG) model as described in
[NIST SP 800-90A Rev. 1]. The default random generator will initialize
automatically on first use and will be fully functional without having
to be initialized ('seeded') explicitly.
It seeds and reseeds itself automatically using trusted random sources
provided by the operating system.

As a normal application developer, you do not have to worry about any details,
just use RAND_bytes(3) to obtain random data.
Having said that, there is one important rule to obey: Always check the error
return value of RAND_bytes(3) and do not take randomness for granted.
Although (re-)seeding is automatic, it can fail because no trusted random source
is available or the trusted source(s) temporarily fail to provide sufficient
random seed material.
In this case the CSPRNG enters an error state and ceases to provide output,
until it is able to recover from the error by reseeding itself.
For more details on reseeding and error recovery, see EVP_RAND(7).

For values that should remain secret, you can use RAND_priv_bytes(3)
instead.
This method does not provide 'better' randomness, it uses the same type of
CSPRNG.
The intention behind using a dedicated CSPRNG exclusively for private
values is that none of its output should be visible to an attacker (e.g.,
used as salt value), in order to reveal as little information as
possible about its internal state, and that a compromise of the "public"
CSPRNG instance will not affect the secrecy of these private values.

In the rare case where the default implementation does not satisfy your special
requirements, the default RAND internals can be replaced by your own
EVP_RAND(3) objects.

Changing the default random generator should be necessary
only in exceptional cases and is not recommended, unless you have a profound
knowledge of cryptographic principles and understand the implications of your
changes.

Finally, it is possible for a provider to bypass the default RAND setup for
RAND_bytes(3) and associated functions.  A provider can be specified as the
single randomness source via the RAND_set1_random_provider(3) function or via
configuration using the **random_provider** option in config(5).  Once specified,
the nominated provider will be used directly when calling the RAND_bytes(3)
family of functions.

## DEFAULT SETUP


The default OpenSSL RAND method is based on the EVP_RAND deterministic random
bit generator (DRBG) classes.
A DRBG is a certain type of cryptographically-secure pseudo-random
number generator (CSPRNG), which is described in [NIST SP 800-90A Rev. 1].


## SEE ALSO


RAND_bytes(3),
RAND_priv_bytes(3),
EVP_RAND(3),
RAND_get0_primary(3),
config(5),
EVP_RAND(7),
RAND_set1_random_provider(3).

## COPYRIGHT


Copyright 2018-2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/RAND.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/RAND.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/RAND.pod`；SHA-256：`d63b943972ad87306fec797c4194d64e1338ed3663f51946a265596873ba186d`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
