---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-openssl-glossary",
  "title": "OpenSSL：密码实现与接口 · openssl-glossary（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "openssl-glossary"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "8437c819231db56ff64d831be97e9f717e0c1e84c46357ae8d6d6d377dfe7445",
  "generatedHash": "31ab7d8f47b5b9bf5eb4478840ec21645025b786d61c0b418abb7687fac5074c",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：openssl-glossary - An OpenSSL Glossary",
  "l1": " Cryptographic primitives such as the SHA256 digest, or AES encryption are referred to in OpenSSL as \"algorithms\". There can be more than one implementation for any given algorithm available for use. crypto(7) ASN.1 (\"Abstract Syntax Notation One\") is a notation for describing abstract types and values. It is defined in the ITU-T documents X.680 to X.683: https://www.itu.int/rec/T-REC-X.680, https://www.itu.int/rec/T-REC-X.681, https://www.itu.int/rec/T-REC-X.682, https://www.itu.int/rec/T-REC-X.683 An OpenSSL Provider that contains encoders and decoders for OpenSSL keys. All the algorithm implementations in the Base Provider are also available in the Default Provider. OSSL_PROVIDER-base(7) A decoder is a type of algorithm used for decoding keys and parameters from some external format such as PEM or DER. OSSL_DECODER_CTX_new_for_pkey(3) ",
  "questions": [
    "openssl-glossary 如何用于密码实现与接口？",
    "openssl-glossary 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-openssl-glossary",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/openssl-glossary.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · openssl-glossary（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

openssl-glossary - An OpenSSL Glossary

## 技术正文

## NAME


openssl-glossary - An OpenSSL Glossary

## DESCRIPTION




- Algorithm

Cryptographic primitives such as the SHA256 digest, or AES encryption are
referred to in OpenSSL as "algorithms". There can be more than one
implementation for any given algorithm available for use.

crypto(7)

- ASN.1, ASN1

ASN.1 ("Abstract Syntax Notation One") is a notation for describing abstract
types and values.  It is defined in the ITU-T documents X.680 to X.683:

https://www.itu.int/rec/T-REC-X.680,
https://www.itu.int/rec/T-REC-X.681,
https://www.itu.int/rec/T-REC-X.682,
https://www.itu.int/rec/T-REC-X.683

- Base Provider

An OpenSSL Provider that contains encoders and decoders for OpenSSL keys.  All
the algorithm implementations in the Base Provider are also available in the
Default Provider.

OSSL_PROVIDER-base(7)

- Decoder

A decoder is a type of algorithm used for decoding keys and parameters from some
external format such as PEM or DER.

OSSL_DECODER_CTX_new_for_pkey(3)

- Default Provider

An OpenSSL Provider that contains the most common OpenSSL algorithm
implementations. It is loaded by default if no other provider is available. All
the algorithm implementations in the Base Provider are also available in the
Default Provider.

OSSL_PROVIDER-default(7)

- DER ("Distinguished Encoding Rules")

DER is a binary encoding of data, structured according to an ASN.1
specification.  This is a common encoding used for cryptographic objects
such as private and public keys, certificates, CRLs, ...

It is defined in ITU-T document X.690:

https://www.itu.int/rec/T-REC-X.690

- Encoder

An encoder is a type of algorithm used for encoding keys and parameters to some
external format such as PEM or DER.

OSSL_ENCODER_CTX_new_for_pkey(3)

- Explicit Fetching

Explicit Fetching is a type of Fetching (see Fetching). Explicit Fetching is
where a function call is made to obtain an algorithm object representing an
implementation such as EVP_MD_fetch(3) or EVP_CIPHER_fetch(3)

- Fetching

Fetching is the process of looking through the available algorithm
implementations, applying selection criteria (via a property query string), and
finally choosing the implementation that will be used.

Also see Explicit Fetching and Implicit Fetching.

crypto(7)

- FIPS Provider

An OpenSSL Provider that contains OpenSSL algorithm implementations that have
been validated according to the FIPS 140-2 standard.

OSSL_PROVIDER-FIPS(7)

- Implicit Fetching

Implicit Fetching is a type of Fetching (see Fetching). Implicit Fetching is
where an algorithm object with no associated implementation is used such as the
return value from EVP_sha256(3) or EVP_aes_128_cbc(3). With implicit
fetching an implementation is fetched automatically using default selection
criteria the first time the algorithm is used.

- Legacy Provider

An OpenSSL Provider that contains algorithm implementations that are considered
insecure or are no longer in common use.

OSSL_PROVIDER-legacy(7)

- Library Context

A Library Context in OpenSSL is represented by the type **OSSL_LIB_CTX**. It can
be thought of as a scope within which configuration options apply. If an
application does not explicitly create a library context then the "default"
one is used. Many OpenSSL functions can take a library context as an argument.
A NULL value can always be passed to indicate the default library context.

OSSL_LIB_CTX(3)

- MSBLOB

MSBLOB is a Microsoft specific binary format for RSA and DSA keys, both
private and public.  This form is never passphrase protected.

- Null Provider

An OpenSSL Provider that contains no algorithm implementations. This can be
useful to prevent the default provider from being automatically loaded in a
library context.

OSSL_PROVIDER-null(7)

- Operation

An operation is a group of OpenSSL functions with a common purpose such as
encryption, or digesting.

crypto(7)

- PEM ("Privacy Enhanced Message")

PEM is a format used for encoding of binary content into a mail and ASCII
friendly form.  The content is a series of base64-encoded lines, surrounded
by begin/end markers each on their own line.  For example:

```c
-----BEGIN PRIVATE KEY-----
MIICdg....
... bhTQ==
-----END PRIVATE KEY-----

```

Optional header line(s) may appear after the begin line, and their existence
depends on the type of object being written or read.

For all OpenSSL uses, the binary content is expected to be a DER encoded
structure.

This is defined in IETF RFC 1421:

https://tools.ietf.org/html/rfc1421

- PKCS#8

PKCS#8 is a specification of ASN.1 structures that OpenSSL uses for storing
or transmitting any private key in a key type agnostic manner.
There are two structures worth noting for OpenSSL use, one that contains the
key data in unencrypted form (known as "PrivateKeyInfo") and an encrypted
wrapper structure (known as "EncryptedPrivateKeyInfo").

This is specified in RFC 5208:

https://tools.ietf.org/html/rfc5208

- Property

A property is a way of classifying and selecting algorithm implementations.
A property is a key/value pair expressed as a string. For example all algorithm
implementations in the default provider have the property "provider=default".
An algorithm implementation can have multiple properties defined against it.

Also see Property Query String.

property(7)

- Property Query String

A property query string is a string containing a sequence of properties that
can be used to select an algorithm implementation. For example the query string
"provider=example,foo=bar" will select algorithms from the "example" provider
that have a "foo" property defined for them with a value of "bar".

Property Query Strings are used during fetching. See Fetching.

property(7)

- Provider

A provider in OpenSSL is a component that groups together algorithm
implementations. Providers can come from OpenSSL itself or from third parties.

provider(7)

- PVK

PVK is a Microsoft specific binary format for RSA and DSA private keys.
This form may be passphrase protected.

- SubjectPublicKeyInfo

SubjectPublicKeyInfo is an ASN.1 structure that OpenSSL uses for storing and
transmitting any public key in a key type agnostic manner.

This is specified as part of the specification for certificates, RFC 5280:

https://tools.ietf.org/html/rfc5280


## HISTORY


This glossary was added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2020-2022 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/openssl-glossary.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/openssl-glossary.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/openssl-glossary.pod`；SHA-256：`8437c819231db56ff64d831be97e9f717e0c1e84c46357ae8d6d6d377dfe7445`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
