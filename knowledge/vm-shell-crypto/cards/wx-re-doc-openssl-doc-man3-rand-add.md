---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-rand-add",
  "title": "OpenSSL：密码随机数 · RAND_add（man3）",
  "type": "note",
  "tags": [
    "随机数",
    "熵源",
    "密钥生成",
    "openssl",
    "RAND_add"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "a25251fa4172763b9c6e4094a91e5768a487592a14c0bd9e90a935bf591f5c15",
  "generatedHash": "ae2bf10da22c368c89d561fe8d25f1661125b93ff484c2d4b034bc71ccc2a537",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码随机数：RAND_add, RAND_poll, RAND_seed, RAND_status, RAND_event, RAND_screen, RAND_keep_random_devices_open - add randomness to the PRNG or get its status",
  "l1": "These functions can be used to seed the random generator and to check its seeded state. In general, manual (re-)seeding of the default OpenSSL random generator (RAND_OpenSSL(3)) is not necessary (but allowed), since it does (re-)seed itself automatically using trusted system entropy sources. This holds unless the default RAND_METHOD has been replaced or OpenSSL was built with automatic reseeding disabled, see RAND(7) for more details. RAND_status() indicates whether or not the random generator has been sufficiently seeded. If not, functions such as RAND_bytes(3) will fail. RAND_poll() uses the system's capabilities to seed the random generator using random input obtained from polling various trusted entropy sources. The default choice of the entropy source can be modified at build time, see RAND(7) for more details. RAND_add() mixes the *",
  "questions": [
    "RAND_add 如何用于密码随机数？",
    "RAND_add 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-rand-add",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/RAND_add.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码随机数 · RAND_add（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码随机数。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

RAND_add, RAND_poll, RAND_seed, RAND_status, RAND_event, RAND_screen,
RAND_keep_random_devices_open
- add randomness to the PRNG or get its status

## 技术正文

## NAME


RAND_add, RAND_poll, RAND_seed, RAND_status, RAND_event, RAND_screen,
RAND_keep_random_devices_open
- add randomness to the PRNG or get its status

## SYNOPSIS


```c
#include <openssl/rand.h>

int RAND_status(void);
int RAND_poll();

void RAND_add(const void *buf, int num, double randomness);
void RAND_seed(const void *buf, int num);

void RAND_keep_random_devices_open(int keep);

```

The following functions have been deprecated since OpenSSL 1.1.0, and can be
hidden entirely by defining **OPENSSL_API_COMPAT** with a suitable version value,
see openssl_user_macros(7):

```c
int RAND_event(UINT iMsg, WPARAM wParam, LPARAM lParam);
void RAND_screen(void);

```

## DESCRIPTION


These functions can be used to seed the random generator and to check its
seeded state.
In general, manual (re-)seeding of the default OpenSSL random generator
(RAND_OpenSSL(3)) is not necessary (but allowed), since it does (re-)seed
itself automatically using trusted system entropy sources.
This holds unless the default RAND_METHOD has been replaced or OpenSSL was
built with automatic reseeding disabled, see RAND(7) for more details.

RAND_status() indicates whether or not the random generator has been sufficiently
seeded. If not, functions such as RAND_bytes(3) will fail.

RAND_poll() uses the system's capabilities to seed the random generator using
random input obtained from polling various trusted entropy sources.
The default choice of the entropy source can be modified at build time,
see RAND(7) for more details.

RAND_add() mixes the **num** bytes at **buf** into the internal state
of the random generator.
This function will not normally be needed, as mentioned above.
The **randomness** argument is an estimate of how much randomness is
contained in
**buf**, in bytes, and should be a number between zero and **num**.
Details about sources of randomness and how to estimate their randomness
can be found in the literature; for example [NIST SP 800-90B].
The content of **buf** cannot be recovered from subsequent random generator output.
Applications that intend to save and restore random state in an external file
should consider using RAND_load_file(3) instead.

NOTE: In FIPS mode, random data provided by the application is not considered to
be a trusted entropy source. It is mixed into the internal state of the RNG as
additional data only and this does not count as a full reseed.
For more details, see EVP_RAND(7).

RAND_seed() is equivalent to RAND_add() with **randomness** set to **num**.

RAND_keep_random_devices_open() is used to control file descriptor
usage by the random seed sources. Some seed sources maintain open file
descriptors by default, which allows such sources to operate in a
chroot(2) jail without the associated device nodes being available. When
the **keep** argument is zero, this call disables the retention of file
descriptors. Conversely, a nonzero argument enables the retention of
file descriptors. This function is usually called during initialization
and it takes effect immediately. This capability only applies to the default
provider.

RAND_event() and RAND_screen() are equivalent to RAND_poll() and exist
for compatibility reasons only. See HISTORY section below.

## RETURN VALUES


RAND_status() returns 1 if the random generator has been seeded
with enough data, 0 otherwise.

RAND_poll() returns 1 if it generated seed data, 0 otherwise.

RAND_event() returns RAND_status().

The other functions do not return values.

## SEE ALSO


RAND_bytes(3),
RAND_egd(3),
RAND_load_file(3),
RAND(7)
EVP_RAND(7)

## HISTORY


RAND_event() and RAND_screen() were deprecated in OpenSSL 1.1.0 and should
not be used.

## COPYRIGHT


Copyright 2000-2020 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/RAND_add.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/RAND_add.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/RAND_add.pod`；SHA-256：`a25251fa4172763b9c6e4094a91e5768a487592a14c0bd9e90a935bf591f5c15`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
