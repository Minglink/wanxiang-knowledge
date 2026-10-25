---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bio-parse-hostserv",
  "title": "OpenSSL：密码数据流 · BIO_parse_hostserv（man3）",
  "type": "note",
  "tags": [
    "BIO",
    "输入输出",
    "缓冲区",
    "openssl",
    "BIO_parse_hostserv"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "ac608cd14f515c6824b88d7b5a7665af8c36e8cbbd7ebec301daeb8626b6ad5e",
  "generatedHash": "c46b2b0636a2d49a1ee33194af74a1e79c22d4297c16e7d7d52b08f658afbb62",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码数据流：BIO_hostserv_priorities, BIO_parse_hostserv - utility routines to parse a standard host and service string",
  "l1": "BIO_parse_hostserv() will parse the information given in **hostserv**, create strings with the hostname and service name and give those back via **host** and **service**. Those will need to be freed after they are used. **hostserv_prio** helps determine if **hostserv** shall be interpreted primarily as a hostname or a service name in ambiguous cases. The syntax the BIO_parse_hostserv() recognises is: host + ':' + service host + ':' + '*' host + ':' ':' + service '*' + ':' + service host service The host part can be a name or an IP address. If it's a IPv6 address, it MUST be enclosed in brackets, such as '[::1]'. The service part can be a service name or its port number. A service name will be mapped to a port number using the system function getservbyname(). The returned values will depend on the given **hostserv** string and **hostserv_p",
  "questions": [
    "BIO_parse_hostserv 如何用于密码数据流？",
    "BIO_parse_hostserv 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bio-parse-hostserv",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_parse_hostserv.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码数据流 · BIO_parse_hostserv（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码数据流。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BIO_hostserv_priorities,
BIO_parse_hostserv
- utility routines to parse a standard host and service string

## 技术正文

## NAME


BIO_hostserv_priorities,
BIO_parse_hostserv
- utility routines to parse a standard host and service string

## SYNOPSIS


```c
#include <openssl/bio.h>

enum BIO_hostserv_priorities {
    BIO_PARSE_PRIO_HOST, BIO_PARSE_PRIO_SERV
};
int BIO_parse_hostserv(const char *hostserv, char **host, char **service,
                       enum BIO_hostserv_priorities hostserv_prio);

```

## DESCRIPTION


BIO_parse_hostserv() will parse the information given in **hostserv**,
create strings with the hostname and service name and give those
back via **host** and **service**.  Those will need to be freed after
they are used.  **hostserv_prio** helps determine if **hostserv** shall
be interpreted primarily as a hostname or a service name in ambiguous
cases.

The syntax the BIO_parse_hostserv() recognises is:

```c
host + ':' + service
host + ':' + '*'
host + ':'
       ':' + service
'*'  + ':' + service
host
service

```

The host part can be a name or an IP address.  If it's a IPv6
address, it MUST be enclosed in brackets, such as '[::1]'.

The service part can be a service name or its port number.  A service name
will be mapped to a port number using the system function getservbyname().

The returned values will depend on the given **hostserv** string
and **hostserv_prio**, as follows:

```c
host + ':' + service  => *host = "host", *service = "service"
host + ':' + '*'      => *host = "host", *service = NULL
host + ':'            => *host = "host", *service = NULL
       ':' + service  => *host = NULL, *service = "service"
 '*' + ':' + service  => *host = NULL, *service = "service"

in case no ':' is present in the string, the result depends on
hostserv_prio, as follows:

when hostserv_prio == BIO_PARSE_PRIO_HOST
host                 => *host = "host", *service untouched

when hostserv_prio == BIO_PARSE_PRIO_SERV
service              => *host untouched, *service = "service"

```

## RETURN VALUES


BIO_parse_hostserv() returns 1 on success or 0 on error.

## SEE ALSO


BIO_ADDRINFO(3)

## COPYRIGHT


Copyright 2016-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BIO_parse_hostserv.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BIO_parse_hostserv.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BIO_parse_hostserv.pod`；SHA-256：`ac608cd14f515c6824b88d7b5a7665af8c36e8cbbd7ebec301daeb8626b6ad5e`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
