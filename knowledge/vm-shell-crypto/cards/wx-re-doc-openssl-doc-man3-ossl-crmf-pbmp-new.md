---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-crmf-pbmp-new",
  "title": "OpenSSL：密码实现与接口 · OSSL_CRMF_pbmp_new（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_CRMF_pbmp_new"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "7da984fc2fffe64e9aab5b77f888f590e184256ae220b0e474c0f6b89ef1478b",
  "generatedHash": "01f733edffe785891e0c5c2778ef4c09b8c5988a9e64e9feead6fbbb7dcc2b9a",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_CRMF_pbm_new, OSSL_CRMF_pbmp_new - functions for producing Password-Based MAC (PBM)",
  "l1": "OSSL_CRMF_pbm_new() generates a PBM (Password-Based MAC) based on given PBM parameters `pbmp`, message `msg`, and secret `sec`, along with the respective lengths `msglen` and `seclen`. The optional library context `libctx` and `propq` parameters may be used to influence the selection of the MAC algorithm referenced in the `pbmp`; see crypto(7)/ALGORITHM FETCHING for further information. On success writes the address of the newly allocated MAC via the `mac` reference parameter and writes the length via the `maclen` reference parameter unless it its NULL. OSSL_CRMF_pbmp_new() initializes and returns a new **PBMParameter** structure with a new random salt of given length `saltlen`, OWF (one-way function) NID `owfnid`, OWF iteration count `itercnt`, and MAC NID `macnid`. The library context `libctx` parameter may be used to select the provide",
  "questions": [
    "OSSL_CRMF_pbmp_new 如何用于密码实现与接口？",
    "OSSL_CRMF_pbmp_new 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-crmf-pbmp-new",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_CRMF_pbmp_new.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_CRMF_pbmp_new（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_CRMF_pbm_new,
OSSL_CRMF_pbmp_new
- functions for producing Password-Based MAC (PBM)

## 技术正文

## NAME


OSSL_CRMF_pbm_new,
OSSL_CRMF_pbmp_new
- functions for producing Password-Based MAC (PBM)

## SYNOPSIS


```c
#include <openssl/crmf.h>

int OSSL_CRMF_pbm_new(OSSL_LIB_CTX *libctx, const char *propq,
                      const OSSL_CRMF_PBMPARAMETER *pbmp,
                      const unsigned char *msg, size_t msglen,
                      const unsigned char *sec, size_t seclen,
                      unsigned char **mac, size_t *maclen);

OSSL_CRMF_PBMPARAMETER *OSSL_CRMF_pbmp_new(OSSL_LIB_CTX *libctx, size_t saltlen,
                                           int owfnid, size_t itercnt,
                                           int macnid);

```

## DESCRIPTION


OSSL_CRMF_pbm_new() generates a PBM (Password-Based MAC) based on given PBM
parameters `pbmp`, message `msg`, and secret `sec`, along with the respective
lengths `msglen` and `seclen`.
The optional library context `libctx` and `propq` parameters may be used
to influence the selection of the MAC algorithm referenced in the `pbmp`;
see crypto(7)/ALGORITHM FETCHING for further information.
On success writes the address of the newly
allocated MAC via the `mac` reference parameter and writes the length via the
`maclen` reference parameter unless it its NULL.

OSSL_CRMF_pbmp_new() initializes and returns a new **PBMParameter** structure
with a new random salt of given length `saltlen`,
OWF (one-way function) NID `owfnid`, OWF iteration count `itercnt`,
and MAC NID `macnid`.
The library context `libctx` parameter may be used to select the provider
for the random number generation (DRBG) and may be NULL for the default.

## NOTES


The algorithms for the OWF (one-way function) and for the MAC (message
authentication code) may be any with a NID defined in F<< <openssl/objects.h> >>.
As specified by RFC 4210, these should include NID_hmac_sha1.

RFC 4210 recommends that the salt SHOULD be at least 8 bytes (64 bits) long,
where 16 bytes is common.

The iteration count must be at least 100, as stipulated by RFC 4211, and is
limited to at most 100000 to avoid DoS through manipulated or otherwise
malformed input.

## RETURN VALUES


OSSL_CRMF_pbm_new() returns 1 on success, 0 on error.

OSSL_CRMF_pbmp_new() returns a new and initialized OSSL_CRMF_PBMPARAMETER
structure, or NULL on error.

## EXAMPLES


```c
OSSL_CRMF_PBMPARAMETER *pbm = NULL;
unsigned char *msg = "Hello";
unsigned char *sec = "SeCrEt";
unsigned char *mac = NULL;
size_t maclen;

if ((pbm = OSSL_CRMF_pbmp_new(16, NID_sha256, 500, NID_hmac_sha1) == NULL))
    goto err;
if (!OSSL_CRMF_pbm_new(pbm, msg, 5, sec, 6, &mac, &maclen))
    goto err;

```

## SEE ALSO


RFC 4211 section 4.4

## HISTORY


The OpenSSL CRMF support was added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2007-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_CRMF_pbmp_new.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_CRMF_pbmp_new.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_CRMF_pbmp_new.pod`；SHA-256：`7da984fc2fffe64e9aab5b77f888f590e184256ae220b0e474c0f6b89ef1478b`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
