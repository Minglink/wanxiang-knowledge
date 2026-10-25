---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-pkey-get-default-digest-nid",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY_get_default_digest_nid（man3）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY_get_default_digest_nid"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "817bc64d83f71e1d15d9889a2d7c043dc316cb4513530b46e8677fb0ad5ae586",
  "generatedHash": "181f4af148ff4df67519ccaee3da66b8cf85eb93550cd0fa8ee7732b19f26f65",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY_get_default_digest_nid, EVP_PKEY_get_default_digest_name - get default signature digest",
  "l1": "EVP_PKEY_get_default_digest_name() fills in the default message digest name for the public key signature operations associated with key `pkey` into `mdname`, up to at most `mdname_sz` bytes including the ending NUL byte. The name could be `\"UNDEF\"`, signifying that a digest must (for return value 2) or may (for return value 1) be left unspecified. EVP_PKEY_get_default_digest_nid() sets `pnid` to the default message digest NID for the public key signature operations associated with key `pkey`. Note that some signature algorithms (i.e. Ed25519 and Ed448) do not use a digest during signing. In this case `pnid` will be set to NID_undef. This function is only reliable for legacy keys, which are keys with a **EVP_PKEY_ASN1_METHOD**; these keys have typically been loaded from engines, or created with EVP_PKEY_assign_RSA(3) or similar.",
  "questions": [
    "EVP_PKEY_get_default_digest_nid 如何用于非对称密钥与签名？",
    "EVP_PKEY_get_default_digest_nid 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-pkey-get-default-digest-nid",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_get_default_digest_nid.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY_get_default_digest_nid（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY_get_default_digest_nid, EVP_PKEY_get_default_digest_name
- get default signature digest

## 技术正文

## NAME


EVP_PKEY_get_default_digest_nid, EVP_PKEY_get_default_digest_name
- get default signature digest

## SYNOPSIS


```c
#include <openssl/evp.h>

int EVP_PKEY_get_default_digest_name(EVP_PKEY *pkey,
                                     char *mdname, size_t mdname_sz);
int EVP_PKEY_get_default_digest_nid(EVP_PKEY *pkey, int *pnid);

```

## DESCRIPTION


EVP_PKEY_get_default_digest_name() fills in the default message digest
name for the public key signature operations associated with key
`pkey` into `mdname`, up to at most `mdname_sz` bytes including the
ending NUL byte.  The name could be `"UNDEF"`, signifying that a digest
must (for return value 2) or may (for return value 1) be left unspecified.

EVP_PKEY_get_default_digest_nid() sets `pnid` to the default message
digest NID for the public key signature operations associated with key
`pkey`.  Note that some signature algorithms (i.e. Ed25519 and Ed448)
do not use a digest during signing.  In this case `pnid` will be set
to NID_undef.  This function is only reliable for legacy keys, which
are keys with a **EVP_PKEY_ASN1_METHOD**; these keys have typically
been loaded from engines, or created with EVP_PKEY_assign_RSA(3) or
similar.

## NOTES


For all current standard OpenSSL public key algorithms SHA256 is returned.

## RETURN VALUES


EVP_PKEY_get_default_digest_name() and EVP_PKEY_get_default_digest_nid()
both return 1 if the message digest is advisory (that is other digests
can be used) and 2 if it is mandatory (other digests can not be used).
They return 0 or a negative value for failure.  In particular a return
value of -2 indicates the operation is not supported by the public key
algorithm.

## SEE ALSO


EVP_PKEY_CTX_new(3),
EVP_PKEY_sign(3),
EVP_PKEY_digestsign_supports_digest(3),
EVP_PKEY_verify(3),
EVP_PKEY_verify_recover(3),

## HISTORY


This function was added in OpenSSL 1.0.0.

## COPYRIGHT


Copyright 2006-2023 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_PKEY_get_default_digest_nid.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_get_default_digest_nid.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_PKEY_get_default_digest_nid.pod`；SHA-256：`817bc64d83f71e1d15d9889a2d7c043dc316cb4513530b46e8677fb0ad5ae586`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
