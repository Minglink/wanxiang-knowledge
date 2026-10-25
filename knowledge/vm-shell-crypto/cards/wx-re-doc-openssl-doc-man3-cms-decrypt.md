---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-cms-decrypt",
  "title": "OpenSSL：密码实现与接口 · CMS_decrypt（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "CMS_decrypt"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "ac69706b316b697b7757b733e0612c6120a75da661afc0d6098aafec5b93a43e",
  "generatedHash": "d082c105918f9934ffad29b7cfad7ede05cc3b8bf2a51547bc9c0709ba78e074",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：CMS_decrypt, CMS_decrypt_set1_pkey_and_peer, CMS_decrypt_set1_pkey, CMS_decrypt_set1_password - decrypt content from a CMS envelopedData structure",
  "l1": "CMS_decrypt() extracts the decrypted content from a CMS EnvelopedData or AuthEnvelopedData structure. It uses CMS_decrypt_set1_pkey() to decrypt the content with the recipient private key `pkey` if `pkey` is not NULL. In this case, the associated certificate is recommended to provide in `cert` - see the NOTES below. `out` is a BIO to write the content to and `flags` is an optional set of flags. If `pkey` is NULL the function assumes that decryption was already done (e.g., using CMS_decrypt_set1_pkey() or CMS_decrypt_set1_password()) and just provides the content unless `cert`, `dcont`, and `out` are NULL as well. The `dcont` parameter is used in the rare case where the encrypted content is detached. It will normally be set to NULL. CMS_decrypt_set1_pkey_and_peer() decrypts the CMS_ContentInfo structure `cms` using the private key `pkey`, ",
  "questions": [
    "CMS_decrypt 如何用于密码实现与接口？",
    "CMS_decrypt 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-cms-decrypt",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/CMS_decrypt.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · CMS_decrypt（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

CMS_decrypt, CMS_decrypt_set1_pkey_and_peer,
CMS_decrypt_set1_pkey, CMS_decrypt_set1_password
- decrypt content from a CMS envelopedData structure

## 技术正文

## NAME


CMS_decrypt, CMS_decrypt_set1_pkey_and_peer,
CMS_decrypt_set1_pkey, CMS_decrypt_set1_password
- decrypt content from a CMS envelopedData structure

## SYNOPSIS


```c
#include <openssl/cms.h>

int CMS_decrypt(CMS_ContentInfo *cms, EVP_PKEY *pkey, X509 *cert,
                BIO *dcont, BIO *out, unsigned int flags);
int CMS_decrypt_set1_pkey_and_peer(CMS_ContentInfo *cms,
                EVP_PKEY *pk, X509 *cert, X509 *peer);
int CMS_decrypt_set1_pkey(CMS_ContentInfo *cms, EVP_PKEY *pk, X509 *cert);
int CMS_decrypt_set1_password(CMS_ContentInfo *cms,
                              unsigned char *pass, ossl_ssize_t passlen);

```

## DESCRIPTION


CMS_decrypt() extracts the decrypted content from a CMS EnvelopedData
or AuthEnvelopedData structure.
It uses CMS_decrypt_set1_pkey() to decrypt the content
with the recipient private key `pkey` if `pkey` is not NULL.
In this case, the associated certificate is recommended to provide in `cert` -
see the NOTES below.
`out` is a BIO to write the content to and
`flags` is an optional set of flags.
If `pkey` is NULL the function assumes that decryption was already done
(e.g., using CMS_decrypt_set1_pkey() or CMS_decrypt_set1_password()) and just
provides the content unless `cert`, `dcont`, and `out` are NULL as well.
The `dcont` parameter is used in the rare case where the encrypted content
is detached. It will normally be set to NULL.

CMS_decrypt_set1_pkey_and_peer() decrypts the CMS_ContentInfo structure `cms`
using the private key `pkey`, the corresponding certificate `cert`, which is
recommended but may be NULL, and the (optional) originator certificate `peer`.
On success, it also records in `cms` the decryption key `pkey`, and then
should be followed by `CMS_decrypt(cms, NULL, NULL, dcont, out, flags)`.
This call deallocates any decryption key stored in `cms`.

CMS_decrypt_set1_pkey() is the same as
CMS_decrypt_set1_pkey_and_peer() with `peer` being NULL.

CMS_decrypt_set1_password() decrypts the CMS_ContentInfo structure `cms`
using the secret `pass` of length `passlen`.
On success, it also records in `cms` the decryption key used, and then
should be followed by `CMS_decrypt(cms, NULL, NULL, dcont, out, flags)`.
This call deallocates any decryption key stored in `cms`.

## NOTES


Although the recipients certificate is not needed to decrypt the data it is
needed to locate the appropriate (of possible several) recipients in the CMS
structure.

If `cert` is set to NULL all possible recipients are tried. This case however
is problematic. To thwart the MMA attack (Bleichenbacher's attack on
PKCS #1 v1.5 RSA padding) all recipients are tried whether they succeed or
not. If no recipient succeeds then a random symmetric key is used to decrypt
the content: this will typically output garbage and may (but is not guaranteed
to) ultimately return a padding error only. If CMS_decrypt() just returned an
error when all recipient encrypted keys failed to decrypt an attacker could
use this in a timing attack. If the special flag **CMS_DEBUG_DECRYPT** is set
then the above behaviour is modified and an error **is** returned if no
recipient encrypted key can be decrypted **without** generating a random
content encryption key. Applications should use this flag with
**extreme caution** especially in automated gateways as it can leave them
open to attack.

It is possible to determine the correct recipient key by other means (for
example looking them up in a database) and setting them in the CMS structure
in advance using the CMS utility functions such as CMS_set1_pkey(),
or use CMS_decrypt_set1_password() if the recipient has a symmetric key.
In these cases both `cert` and `pkey` should be set to NULL.

To process KEKRecipientInfo types CMS_set1_key() or CMS_RecipientInfo_set0_key()
and CMS_RecipientInfo_decrypt() should be called before CMS_decrypt() and
`cert` and `pkey` set to NULL.

The following flags can be passed in the `flags` parameter.

If the **CMS_TEXT** flag is set MIME headers for type `text/plain` are deleted
from the content. If the content is not of type `text/plain` then an error is
returned.

## RETURN VALUES


CMS_decrypt(), CMS_decrypt_set1_pkey_and_peer(),
CMS_decrypt_set1_pkey(), and CMS_decrypt_set1_password()
return either 1 for success or 0 for failure.
The error can be obtained from ERR_get_error(3).

## BUGS


The **set1_** part of these function names is misleading
and should better read: **with_**.

The lack of single pass processing and the need to hold all data in memory as
mentioned in CMS_verify() also applies to CMS_decrypt().

## SEE ALSO


ERR_get_error(3), CMS_encrypt(3)

## HISTORY


CMS_decrypt_set1_pkey_and_peer() and CMS_decrypt_set1_password()
were added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2008-2020 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/CMS_decrypt.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/CMS_decrypt.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/CMS_decrypt.pod`；SHA-256：`ac69706b316b697b7757b733e0612c6120a75da661afc0d6098aafec5b93a43e`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
