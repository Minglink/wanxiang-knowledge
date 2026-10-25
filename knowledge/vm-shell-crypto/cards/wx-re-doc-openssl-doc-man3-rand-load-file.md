---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-rand-load-file",
  "title": "OpenSSL：密码随机数 · RAND_load_file（man3）",
  "type": "note",
  "tags": [
    "随机数",
    "熵源",
    "密钥生成",
    "openssl",
    "RAND_load_file"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "cc9af14520e6dfa841004beac69e8b65f4e6a623084d69172fa08906ca15bc3b",
  "generatedHash": "94ab0bb22e9d895f2c39de3e5d2705f3bc9d57045bae932b5e5ecb57c986b03c",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码随机数：RAND_load_file, RAND_write_file, RAND_file_name - PRNG seed file",
  "l1": "RAND_load_file() reads a number of bytes from file **filename** and adds them to the PRNG. If **max_bytes** is nonnegative, up to **max_bytes** are read; if **max_bytes** is -1, the complete file is read. Do not load the same file multiple times unless its contents have been updated by RAND_write_file() between reads. Also, note that **filename** should be adequately protected so that an attacker cannot replace or examine the contents. If **filename** is not a regular file, then user is considered to be responsible for any side effects, e.g. non-anticipated blocking or capture of controlling terminal. RAND_write_file() writes a number of random bytes (currently 128) to file **filename** which can be used to initialize the PRNG by calling RAND_load_file() in a later session. RAND_file_name() generates a default path for the random seed fil",
  "questions": [
    "RAND_load_file 如何用于密码随机数？",
    "RAND_load_file 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-rand-load-file",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/RAND_load_file.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码随机数 · RAND_load_file（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码随机数。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

RAND_load_file, RAND_write_file, RAND_file_name - PRNG seed file

## 技术正文

## NAME


RAND_load_file, RAND_write_file, RAND_file_name - PRNG seed file

## SYNOPSIS


```c
#include <openssl/rand.h>

int RAND_load_file(const char *filename, long max_bytes);

int RAND_write_file(const char *filename);

const char *RAND_file_name(char *buf, size_t num);

```

## DESCRIPTION


RAND_load_file() reads a number of bytes from file **filename** and
adds them to the PRNG. If **max_bytes** is nonnegative,
up to **max_bytes** are read;
if **max_bytes** is -1, the complete file is read.
Do not load the same file multiple times unless its contents have
been updated by RAND_write_file() between reads.
Also, note that **filename** should be adequately protected so that an
attacker cannot replace or examine the contents.
If **filename** is not a regular file, then user is considered to be
responsible for any side effects, e.g. non-anticipated blocking or
capture of controlling terminal.

RAND_write_file() writes a number of random bytes (currently 128) to
file **filename** which can be used to initialize the PRNG by calling
RAND_load_file() in a later session.

RAND_file_name() generates a default path for the random seed
file. **buf** points to a buffer of size **num** in which to store the
filename.

On all systems, if the environment variable **RANDFILE** is set, its
value will be used as the seed filename.
Otherwise, the file is called `.rnd`, found in platform dependent locations:


- On Windows (in order of preference)

```c
%HOME%, %USERPROFILE%, %SYSTEMROOT%, C:\

```

- On VMS

```c
SYS$LOGIN:

```

- On all other systems

```c
$HOME

```


If `$HOME` (on non-Windows and non-VMS system) is not set either, or
**num** is too small for the pathname, an error occurs.

## RETURN VALUES


RAND_load_file() returns the number of bytes read or -1 on error.

RAND_write_file() returns the number of bytes written, or -1 if the
bytes written were generated without appropriate seeding.

RAND_file_name() returns a pointer to **buf** on success, and NULL on
error.

## SEE ALSO


RAND_add(3),
RAND_bytes(3),
RAND(7)

## COPYRIGHT


Copyright 2000-2020 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/RAND_load_file.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/RAND_load_file.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/RAND_load_file.pod`；SHA-256：`cc9af14520e6dfa841004beac69e8b65f4e6a623084d69172fa08906ca15bc3b`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
