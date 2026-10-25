---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-passphrase-encoding",
  "title": "OpenSSL：密码实现与接口 · passphrase-encoding（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "passphrase-encoding"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "4404a22567d2db9b92b5816292ae78c06e1625267f3a8ea77fbea00b9dfda57c",
  "generatedHash": "aa2d92e6c0f4a77f6f944096d41dbd8e2d3885815c0997832834ab7b52fb3059",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：passphrase-encoding - How diverse parts of OpenSSL treat pass phrases character encoding",
  "l1": "In a modern world with all sorts of character encodings, the treatment of pass phrases has become increasingly complex. This manual page attempts to give an overview over how this problem is currently addressed in different parts of the OpenSSL library. The OpenSSL library doesn't treat pass phrases in any special way as a general rule, and trusts the application or user to choose a suitable character set and stick to that throughout the lifetime of affected objects. This means that for an object that was encrypted using a pass phrase encoded in ISO-8859-1, that object needs to be decrypted using a pass phrase encoded in ISO-8859-1. Using the wrong encoding is expected to cause a decryption failure. PKCS#12 is a bit different regarding pass phrase encoding. The standard stipulates that the pass phrase shall be encoded as an ASN.1 BMPStrin",
  "questions": [
    "passphrase-encoding 如何用于密码实现与接口？",
    "passphrase-encoding 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-passphrase-encoding",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/passphrase-encoding.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · passphrase-encoding（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

passphrase-encoding
- How diverse parts of OpenSSL treat pass phrases character encoding

## 技术正文

=encoding utf8

## NAME


passphrase-encoding
- How diverse parts of OpenSSL treat pass phrases character encoding

## DESCRIPTION


In a modern world with all sorts of character encodings, the treatment of pass
phrases has become increasingly complex.
This manual page attempts to give an overview over how this problem is
currently addressed in different parts of the OpenSSL library.

### The general case


The OpenSSL library doesn't treat pass phrases in any special way as a general
rule, and trusts the application or user to choose a suitable character set
and stick to that throughout the lifetime of affected objects.
This means that for an object that was encrypted using a pass phrase encoded in
ISO-8859-1, that object needs to be decrypted using a pass phrase encoded in
ISO-8859-1.
Using the wrong encoding is expected to cause a decryption failure.

### PKCS#12


PKCS#12 is a bit different regarding pass phrase encoding.
The standard stipulates that the pass phrase shall be encoded as an ASN.1
BMPString, which consists of the code points of the basic multilingual plane,
encoded in big endian (UCS-2 BE).

OpenSSL tries to adapt to this requirements in one of the following manners:


- 1.

Treats the received pass phrase as UTF-8 encoded and tries to re-encode it to
UTF-16 (which is the same as UCS-2 for characters U+0000 to U+D7FF and U+E000
to U+FFFF, but becomes an expansion for any other character), or failing that,
proceeds with step 2.

- 2.

Assumes that the pass phrase is encoded in ASCII or ISO-8859-1 and
opportunistically prepends each byte with a zero byte to obtain the UCS-2
encoding of the characters, which it stores as a BMPString.

Note that since there is no check of your locale, this may produce UCS-2 /
UTF-16 characters that do not correspond to the original pass phrase characters
for other character sets, such as any ISO-8859-X encoding other than
ISO-8859-1 (or for Windows, CP 1252 with exception for the extra "graphical"
characters in the 0x80-0x9F range).


OpenSSL versions older than 1.1.0 do variant 2 only, and that is the reason why
OpenSSL still does this, to be able to read files produced with older versions.

It should be noted that this approach isn't entirely fault free.

A pass phrase encoded in ISO-8859-2 could very well have a sequence such as
0xC3 0xAF (which is the two characters "LATIN CAPITAL LETTER A WITH BREVE"
and "LATIN CAPITAL LETTER Z WITH DOT ABOVE" in ISO-8859-2 encoding), but would
be misinterpreted as the perfectly valid UTF-8 encoded code point U+00EF (LATIN
SMALL LETTER I WITH DIAERESIS) I<if the pass phrase doesn't contain anything that
would be invalid UTF-8>.
A pass phrase that contains this kind of byte sequence will give a different
outcome in OpenSSL 1.1.0 and newer than in OpenSSL older than 1.1.0.

```c
0x00 0xC3 0x00 0xAF                    # OpenSSL older than 1.1.0
0x00 0xEF                              # OpenSSL 1.1.0 and newer

```

On the same accord, anything encoded in UTF-8 that was given to OpenSSL older
than 1.1.0 was misinterpreted as ISO-8859-1 sequences.

### OSSL_STORE


ossl_store(7) acts as a general interface to access all kinds of objects,
potentially protected with a pass phrase, a PIN or something else.
This API stipulates that pass phrases should be UTF-8 encoded, and that any
other pass phrase encoding may give undefined results.
This API relies on the application to ensure UTF-8 encoding, and doesn't check
that this is the case, so what it gets, it will also pass to the underlying
loader.

## RECOMMENDATIONS


This section assumes that you know what pass phrase was used for encryption,
but that it may have been encoded in a different character encoding than the
one used by your current input method.
For example, the pass phrase may have been used at a time when your default
encoding was ISO-8859-1 (i.e. "naïve" resulting in the byte sequence 0x6E 0x61
0xEF 0x76 0x65), and you're now in an environment where your default encoding
is UTF-8 (i.e. "naïve" resulting in the byte sequence 0x6E 0x61 0xC3 0xAF 0x76
0x65).
Whenever it's mentioned that you should use a certain character encoding, it
should be understood that you either change the input method to use the
mentioned encoding when you type in your pass phrase, or use some suitable tool
to convert your pass phrase from your default encoding to the target encoding.

Also note that the sub-sections below discuss human readable pass phrases.
This is particularly relevant for PKCS#12 objects, where human readable pass
phrases are assumed.
For other objects, it's as legitimate to use any byte sequence (such as a
sequence of bytes from `/dev/urandom` that's been saved away), which makes any
character encoding discussion irrelevant; in such cases, simply use the same
byte sequence as it is.

### Creating new objects


For creating new pass phrase protected objects, make sure the pass phrase is
encoded using UTF-8.
This is default on most modern Unixes, but may involve an effort on other
platforms.
Specifically for Windows, setting the environment variable
**OPENSSL_WIN32_UTF8** will have anything entered on [Windows] console prompt
converted to UTF-8 (command line and separately prompted pass phrases alike).

### Opening existing objects


For opening pass phrase protected objects where you know what character
encoding was used for the encryption pass phrase, make sure to use the same
encoding again.

For opening pass phrase protected objects where the character encoding that was
used is unknown, or where the producing application is unknown, try one of the
following:


- 1.

Try the pass phrase that you have as it is in the character encoding of your
environment.
It's possible that its byte sequence is exactly right.

- 2.

Convert the pass phrase to UTF-8 and try with the result.
Specifically with PKCS#12, this should open up any object that was created
according to the specification.

- 3.

Do a naïve (i.e. purely mathematical) ISO-8859-1 to UTF-8 conversion and try
with the result.
This differs from the previous attempt because ISO-8859-1 maps directly to
U+0000 to U+00FF, which other non-UTF-8 character sets do not.

This also takes care of the case when a UTF-8 encoded string was used with
OpenSSL older than 1.1.0.
(for example, `ï`, which is 0xC3 0xAF when encoded in UTF-8, would become 0xC3
0x83 0xC2 0xAF when re-encoded in the naïve manner.
The conversion to BMPString would then yield 0x00 0xC3 0x00 0xA4 0x00 0x00, the
erroneous/non-compliant encoding used by OpenSSL older than 1.1.0)


## SEE ALSO


evp(7),
ossl_store(7),
EVP_BytesToKey(3), EVP_DecryptInit(3),
PEM_do_header(3),
PKCS12_parse(3), PKCS12_newpass(3),
d2i_PKCS8PrivateKey_bio(3)

## COPYRIGHT


Copyright 2018-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/passphrase-encoding.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/passphrase-encoding.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/passphrase-encoding.pod`；SHA-256：`4404a22567d2db9b92b5816292ae78c06e1625267f3a8ea77fbea00b9dfda57c`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
