---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-openssl-env",
  "title": "OpenSSL：密码实现与接口 · openssl-env（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "openssl-env"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "ef3bc8fa09ff0f66be442298d16abaf6e22903a8b5d430bd7251d6aa15fea521",
  "generatedHash": "2789e0b549b4b753ffb0944818f7ce91240f9708fb5295327b2a75926a284009",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：openssl-env - OpenSSL environment variables",
  "l1": "The OpenSSL libraries use environment variables to override the compiled-in default paths for various data. To avoid security risks, the environment is usually not consulted when the executable is set-user-ID or set-group-ID. Specifies the path to a certificate transparency log list. See CTLOG_STORE_new(3). Specifies the path to the **openssl** executable. Used by the **rehash** script (see openssl-rehash(1)/Script Configuration) and by the **CA.pl** script (see CA.pl(1)/NOTES Specifies the path to a configuration file and the directory for included files. See config(5). Specifies a configuration option and filename for the **req** and **ca** commands invoked by the **CA.pl** script. See CA.pl(1). Specifies the directory from which dynamic engines are loaded. See openssl-engine(1). If built with debugging, this allows memory allocation to",
  "questions": [
    "openssl-env 如何用于密码实现与接口？",
    "openssl-env 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-openssl-env",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/openssl-env.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · openssl-env（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

openssl-env - OpenSSL environment variables

## 技术正文

## NAME


openssl-env - OpenSSL environment variables

## DESCRIPTION


The OpenSSL libraries use environment variables to override the
compiled-in default paths for various data.
To avoid security risks, the environment is usually not consulted when
the executable is set-user-ID or set-group-ID.


- **CTLOG_FILE**

Specifies the path to a certificate transparency log list.
See CTLOG_STORE_new(3).

- **OPENSSL**

Specifies the path to the **openssl** executable. Used by
the **rehash** script (see openssl-rehash(1)/Script Configuration)
and by the **CA.pl** script (see CA.pl(1)/NOTES

- **OPENSSL_CONF**, **OPENSSL_CONF_INCLUDE**

Specifies the path to a configuration file and the directory for
included files.
See config(5).

- **OPENSSL_CONFIG**

Specifies a configuration option and filename for the **req** and **ca**
commands invoked by the **CA.pl** script.
See CA.pl(1).

- **OPENSSL_ENGINES**

Specifies the directory from which dynamic engines are loaded.
See openssl-engine(1).

- **OPENSSL_MALLOC_FD**, **OPENSSL_MALLOC_FAILURES**

If built with debugging, this allows memory allocation to fail.
See OPENSSL_malloc(3).

- **OPENSSL_MODULES**

Specifies the directory from which cryptographic providers are loaded.
Equivalently, the generic **-provider-path** command-line option may be used.

- **OPENSSL_TRACE**

By default the OpenSSL trace feature is disabled statically.
To enable it, OpenSSL must be built with tracing support,
which may be configured like this: `./config enable-trace`

Unless OpenSSL tracing support is generally disabled,
enable trace output of specific parts of OpenSSL libraries, by name.
This output usually makes sense only if you know OpenSSL internals well.

The value of this environment varialble is a comma-separated list of names,
with the following available:


- **TRACE**

Traces the OpenSSL trace API itself.

- **INIT**

Traces OpenSSL library initialization and cleanup.

- **TLS**

Traces the TLS/SSL protocol.

- **TLS_CIPHER**

Traces the ciphers used by the TLS/SSL protocol.

- **CONF**

Show details about provider and engine configuration.

- **ENGINE_TABLE**

The function that is used by RSA, DSA (etc) code to select registered
ENGINEs, cache defaults and functional references (etc), will generate
debugging summaries.

- **ENGINE_REF_COUNT**

Reference counts in the ENGINE structure will be monitored with a line
of generated for each change.

- **PKCS5V2**

Traces PKCS#5 v2 key generation.

- **PKCS12_KEYGEN**

Traces PKCS#12 key generation.

- **PKCS12_DECRYPT**

Traces PKCS#12 decryption.

- **X509V3_POLICY**

Generates the complete policy tree at various points during X.509 v3
policy evaluation.

- **BN_CTX**

Traces BIGNUM context operations.

- **CMP**

Traces CMP client and server activity.

- **STORE**

Traces STORE operations.

- **DECODER**

Traces decoder operations.

- **ENCODER**

Traces encoder operations.

- **REF_COUNT**

Traces decrementing certain ASN.1 structure references.

- **HTTP**

Traces the HTTP client and server, such as messages being sent and received.


- **OPENSSL_WIN32_UTF8**

If set, then UI_OpenSSL(3) returns UTF-8 encoded strings, rather than
ones encoded in the current code page, and
the openssl(1) program also transcodes the command-line parameters
from the current code page to UTF-8.
This environment variable is only checked on Microsoft Windows platforms.

- **RANDFILE**

The state file for the random number generator.
This should not be needed in normal use.
See RAND_load_file(3).

- **SSL_CERT_DIR**, **SSL_CERT_FILE**

Specify the default directory or file containing CA certificates.
See SSL_CTX_load_verify_locations(3).

- **TSGET**

Additional arguments for the tsget(1) command.

- **OPENSSL_ia32cap**, **OPENSSL_sparcv9cap**, **OPENSSL_ppccap**, **OPENSSL_armcap**, **OPENSSL_s390xcap**, **OPENSSL_riscvcap**

OpenSSL supports a number of different algorithm implementations for
various machines and, by default, it determines which to use based on the
processor capabilities and run time feature enquiry.  These environment
variables can be used to exert more control over this selection process.
See OPENSSL_ia32cap(3), OPENSSL_s390xcap(3) and OPENSSL_riscvcap(3).

- **NO_PROXY**, **HTTPS_PROXY**, **HTTP_PROXY**

Specify a proxy hostname.
See OSSL_HTTP_parse_url(3).

- **QLOGDIR**

Specifies a QUIC qlog output directory. See openssl-qlog(7).

- **OSSL_QFILTER**

Used to set a QUIC qlog filter specification. See openssl-qlog(7).

- **SSLKEYLOGFILE**

Used to produce the standard format output file for SSL key logging.  Optionally
set this variable to a filename to log all secrets produced by SSL connections.
Note, use of the environment variable is predicated on configuring OpenSSL at
build time with the enable-sslkeylog feature.  The file format standard can be
found at https://datatracker.ietf.org/doc/draft-ietf-tls-keylogfile/.
Note: the use of **SSLKEYLOGFILE** poses an explicit security risk.  By recording
the exchanged keys during an SSL session, it allows any available party with
read access to the file to decrypt application traffic sent over that session.
Use of this feature should be restricted to test and debug environments only.


## COPYRIGHT


Copyright 2019-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/openssl-env.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/openssl-env.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/openssl-env.pod`；SHA-256：`ef3bc8fa09ff0f66be442298d16abaf6e22903a8b5d430bd7251d6aa15fea521`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
