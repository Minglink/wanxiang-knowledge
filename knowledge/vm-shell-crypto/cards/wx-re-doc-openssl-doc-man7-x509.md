---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-x509",
  "title": "OpenSSL：密码实现与接口 · x509（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "x509"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "7d1a74b429f2ba9536abc9a8f256acf3f0e1bd36c2dfc68ce0239f968b50a127",
  "generatedHash": "dde17b3c3fdc6535eb66e26c88497f7a8be940ed73600222591f062a0da51f3e",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：x509 - X.509 certificate handling",
  "l1": "An X.509 certificate is a structured grouping of information about an individual, a device, or anything one can imagine. An X.509 CRL (certificate revocation list) is a tool to help determine if a certificate is still valid. The exact definition of those can be found in the X.509 document from ITU-T, or in RFC3280 from PKIX. In OpenSSL, the type X509 is used to express such a certificate, and the type X509_CRL is used to express a CRL. A related structure is a certificate request, defined in PKCS#10 from RSA Security, Inc, also reflected in RFC2896. In OpenSSL, the type X509_REQ is used to express such a certificate request. To handle some complex parts of a certificate, there are the types X509_NAME (to express a certificate name), X509_ATTRIBUTE (to express a certificate attribute), X509_EXTENSION (to express a certificate extension) an",
  "questions": [
    "x509 如何用于密码实现与接口？",
    "x509 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-x509",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/x509.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · x509（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

x509 - X.509 certificate handling

## 技术正文

## NAME


x509 - X.509 certificate handling

## SYNOPSIS


```c
#include <openssl/x509.h>

```

## DESCRIPTION


An X.509 certificate is a structured grouping of information about
an individual, a device, or anything one can imagine.  An X.509 CRL
(certificate revocation list) is a tool to help determine if a
certificate is still valid.  The exact definition of those can be
found in the X.509 document from ITU-T, or in RFC3280 from PKIX.
In OpenSSL, the type X509 is used to express such a certificate, and
the type X509_CRL is used to express a CRL.

A related structure is a certificate request, defined in PKCS#10 from
RSA Security, Inc, also reflected in RFC2896.  In OpenSSL, the type
X509_REQ is used to express such a certificate request.

To handle some complex parts of a certificate, there are the types
X509_NAME (to express a certificate name), X509_ATTRIBUTE (to express
a certificate attribute), X509_EXTENSION (to express a certificate
extension) and a few more.

Finally, there's the supertype X509_INFO, which can contain a CRL, a
certificate and a corresponding private key.

**X509_**`XXX`, **d2i_X509_**`XXX`, and **i2d_X509_**`XXX` functions
handle X.509 certificates, with some exceptions, shown below.

**X509_CRL_**`XXX`, **d2i_X509_CRL_**`XXX`, and **i2d_X509_CRL_**`XXX`
functions handle X.509 CRLs.

**X509_REQ_**`XXX`, **d2i_X509_REQ_**`XXX`, and **i2d_X509_REQ_**`XXX`
functions handle PKCS#10 certificate requests.

**X509_NAME_**`XXX` functions handle certificate names.

**X509_ATTRIBUTE_**`XXX` functions handle certificate attributes.

**X509_EXTENSION_**`XXX` functions handle certificate extensions.

## SEE ALSO


X509_NAME_ENTRY_get_object(3),
X509_NAME_add_entry_by_txt(3),
X509_NAME_add_entry_by_NID(3),
X509_NAME_print_ex(3),
X509_NAME_new(3),
PEM_X509_INFO_read(3),
d2i_X509(3),
d2i_X509_ALGOR(3),
d2i_X509_CRL(3),
d2i_X509_NAME(3),
d2i_X509_REQ(3),
d2i_X509_SIG(3),
crypto(7)

## COPYRIGHT


Copyright 2003-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/x509.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/x509.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/x509.pod`；SHA-256：`7d1a74b429f2ba9536abc9a8f256acf3f0e1bd36c2dfc68ce0239f968b50a127`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
