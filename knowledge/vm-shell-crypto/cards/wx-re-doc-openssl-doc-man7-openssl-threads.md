---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-openssl-threads",
  "title": "OpenSSL：密码实现与接口 · openssl-threads（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "openssl-threads"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "ad9ce57f230c53bb96950e5a2f43e15d2ab29c725f1d6a3d463bac10395714db",
  "generatedHash": "ea49a5bd4c9cfcc4e89a02f744efd967c49dcf2c8d05b24662706f5fad0c76c8",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：openssl-threads - Overview of thread safety in OpenSSL",
  "l1": "In this man page, we use the term **thread-safe** to indicate that an object or function can be used by multiple threads at the same time. OpenSSL can be built with or without threads support. The most important use of this support is so that OpenSSL itself can use a single consistent API, as shown in CRYPTO_THREAD_run_once(3)/EXAMPLES. Multi-platform applications can also use this API. In particular, being configured for threads support does not imply that all OpenSSL objects are thread-safe. To emphasize: `most objects are not safe for simultaneous use`. Exceptions to this should be documented on the specific manual pages, and some general high-level guidance is given here. One major use of the OpenSSL thread API is to implement reference counting. Many objects within OpenSSL are reference-counted, so resources are not released, until t",
  "questions": [
    "openssl-threads 如何用于密码实现与接口？",
    "openssl-threads 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-openssl-threads",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/openssl-threads.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · openssl-threads（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

openssl-threads - Overview of thread safety in OpenSSL

## 技术正文

## NAME


openssl-threads - Overview of thread safety in OpenSSL

## DESCRIPTION


In this man page, we use the term **thread-safe** to indicate that an
object or function can be used by multiple threads at the same time.

OpenSSL can be built with or without threads support. The most important
use of this support is so that OpenSSL itself can use a single consistent
API, as shown in CRYPTO_THREAD_run_once(3)/EXAMPLES.
Multi-platform applications can also use this API.

In particular, being configured for threads support does not imply that
all OpenSSL objects are thread-safe.
To emphasize: `most objects are not safe for simultaneous use`.
Exceptions to this should be documented on the specific manual pages, and
some general high-level guidance is given here.

One major use of the OpenSSL thread API is to implement reference counting.
Many objects within OpenSSL are reference-counted, so resources are not
released, until the last reference is removed.
References are often increased automatically (such as when an **X509**
certificate object is added into an **X509_STORE** trust store).
There is often an **`object`_up_ref**() function that can be used to increase
the reference count.
Failure to match **`object`_up_ref**() calls with the right number of
**`object`_free**() calls is a common source of memory leaks when a program
exits.

Many objects have set and get API's to set attributes in the object.
A `set0` passes ownership from the caller to the object and a
`get0` returns a pointer but the attribute ownership
remains with the object and a reference to it is returned.
A `set1` or `get1` function does not change the ownership, but instead
updates the attribute's reference count so that the object is shared
between the caller and the object; the caller must free the returned
attribute when finished.
Functions that involve attributes that have reference counts themselves,
but are named with just `set` or `get` are historical; and the documentation
must state how the references are handled.
Get methods are often thread-safe as long as the ownership requirements are
met and shared objects are not modified.
Set methods, or modifying shared objects, are generally not thread-safe
as discussed below.

Objects are thread-safe
as long as the API's being invoked don't modify the object; in this
case the parameter is usually marked in the API as `const`.
Not all parameters are marked this way.
Note that a `const` declaration does not mean immutable; for example
X509_cmp(3) takes pointers to `const` objects, but the implementation
uses a C cast to remove that so it can lock objects, generate and cache
a DER encoding, and so on.

Another instance of thread-safety is when updates to an object's
internal state, such as cached values, are done with locks.
One example of this is the reference counting API's described above.

In all cases, however, it is generally not safe for one thread to
mutate an object, such as setting elements of a private or public key,
while another thread is using that object, such as verifying a signature.

The same API's can usually be used simultaneously on different objects
without interference.
For example, two threads can calculate a signature using two different
**EVP_PKEY_CTX** objects.

For implicit global state or singletons, thread-safety depends on the facility.
The CRYPTO_secure_malloc(3) and related API's have their own lock,
while CRYPTO_malloc(3) assumes the underlying platform allocation
will do any necessary locking.
Some API's, such as NCONF_load(3) and related do no locking at all;
this can be considered a bug.

A separate, although related, issue is modifying "factory" objects
when other objects have been created from that.
For example, an **SSL_CTX** object created by SSL_CTX_new(3) is used
to create per-connection **SSL** objects by calling SSL_new(3).
In this specific case, and probably for factory methods in general, it is
not safe to modify the factory object after it has been used to create
other objects.

## SEE ALSO


CRYPTO_THREAD_run_once(3),
local system threads documentation.

## BUGS


This page is admittedly very incomplete.

## COPYRIGHT


Copyright 2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/openssl-threads.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/openssl-threads.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/openssl-threads.pod`；SHA-256：`ad9ce57f230c53bb96950e5a2f43e15d2ab29c725f1d6a3d463bac10395714db`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
