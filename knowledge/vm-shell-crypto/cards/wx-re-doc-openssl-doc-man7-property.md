---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-property",
  "title": "OpenSSL：密码实现与接口 · property（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "property"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "32b769bc5b85875242f5105f7385b88002d27b3aefff830a815243af53ed2e7a",
  "generatedHash": "0da0ab69fe54887bac0ad4495cc6e2ba92ef18e3ee4f4dbd31b2a8afdb267710",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：property - Properties, a selection mechanism for algorithm implementations",
  "l1": "As of OpenSSL 3.0, a new method has been introduced to decide which of multiple implementations of an algorithm will be used. The method is centered around the concept of properties. Each implementation defines a number of properties and when an algorithm is being selected, filters based on these properties can be used to choose the most appropriate implementation of the algorithm. Properties are like variables, they are referenced by name and have a value assigned. Property names fall into two categories: those reserved by the OpenSSL project and user defined names. A `reserved` property name consists of a single C-style identifier (except for leading underscores not being permitted), which begins with a letter and can be followed by any number of letters, numbers and underscores. Property names are case-insensitive, but OpenSSL will onl",
  "questions": [
    "property 如何用于密码实现与接口？",
    "property 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-property",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/property.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · property（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

property - Properties, a selection mechanism for algorithm implementations

## 技术正文

## NAME


property - Properties, a selection mechanism for algorithm implementations

## DESCRIPTION


As of OpenSSL 3.0, a new method has been introduced to decide which of
multiple implementations of an algorithm will be used.
The method is centered around the concept of properties.
Each implementation defines a number of properties and when an algorithm
is being selected, filters based on these properties can be used to
choose the most appropriate implementation of the algorithm.

Properties are like variables, they are referenced by name and have a value
assigned.

### Property Names


Property names fall into two categories: those reserved by the OpenSSL
project and user defined names.
A `reserved` property name consists of a single C-style identifier
(except for leading underscores not being permitted), which begins
with a letter and can be followed by any number of letters, numbers
and underscores.
Property names are case-insensitive, but OpenSSL will only use lowercase
letters.

A `user defined` property name is similar, but it **must** consist of
two or more C-style identifiers, separated by periods.
The last identifier in the name can be considered the 'true' property
name, which is prefixed by some sort of 'namespace'.
Providers for example could include their name in the prefix and use
property names like

```c
 <provider_name>.<property_name>
 <provider_name>.<algorithm_name>.<property_name>

```

### Properties


A `property` is a `name=value` pair.
A `property definition` is a sequence of comma separated properties.
There can be any number of properties in a definition, however each name must
be unique.
For example: "" defines an empty property definition (i.e., no restriction);
"my.foo=bar" defines a property named `my.foo` which has a string value `bar`
and "iteration.count=3" defines a property named `iteration.count` which
has a numeric value of `3`.
The full syntax for property definitions appears below.

### Implementations


Each implementation of an algorithm can define any number of
properties.
For example, the default provider defines the property `provider=default`
for all of its algorithms.
Likewise, OpenSSL's FIPS provider defines `provider=fips` and the legacy
provider defines `provider=legacy` for all of their algorithms.

### Queries


A `property query clause` is a single conditional test.
For example, "fips=yes", "provider!=default" or "?iteration.count=3".
The first two represent mandatory clauses, such clauses **must** match
for any algorithm to even be under consideration.
The third clause represents an optional clause.
Matching such clauses is not a requirement, but any additional optional
match counts in favor of the algorithm.
More details about that in the **Lookups** section.
A `property query` is a sequence of comma separated property query clauses.
It is an error if a property name appears in more than one query clause.
The full syntax for property queries appears below, but the available syntactic
features are:


- *

**=** is an infix operator providing an equality test.

- *

**!=** is an infix operator providing an inequality test.

- *

**?** is a prefix operator that means that the following clause is optional
but preferred.

- *

**-** is a prefix operator that means any global query clause involving the
following property name should be ignored.

- *

**"..."** is a quoted string.
The quotes are not included in the body of the string.

- *

**'...'** is a quoted string.
The quotes are not included in the body of the string.


### Lookups


When an algorithm is looked up, a property query is used to determine
the best matching algorithm.
All mandatory query clauses **must** be present and the implementation
that additionally has the largest number of matching optional query
clauses will be used.
If there is more than one such optimal candidate, the result will be
chosen from amongst those in an indeterminate way.
Ordering of optional clauses is not significant.

### Shortcut


In order to permit a more concise expression of boolean properties, there
is one short cut: a property name alone (e.g. "my.property") is
exactly equivalent to "my.property=yes" in both definitions and queries.

### Global and Local


Two levels of property query are supported.
A context based property query that applies to all fetch operations and a local
property query.
Where both the context and local queries include a clause with the same name,
the local clause overrides the context clause.

It is possible for a local property query to remove a clause in the context
property query by preceding the property name with a '-'.
For example, a context property query that contains "fips=yes" would normally
result in implementations that have "fips=yes".

However, if the setting of the "fips" property is irrelevant to the
operations being performed, the local property query can include the
clause "-fips".
Note that the local property query could not use "fips=no" because that would
disallow any implementations with "fips=yes" rather than not caring about the
setting.

## SYNTAX


The lexical syntax in EBNF is given by:

```c
Definition     ::= PropertyName ( '=' Value )?
                       ( ',' PropertyName ( '=' Value )? )*
Query          ::= PropertyQuery ( ',' PropertyQuery )*
PropertyQuery  ::= '-' PropertyName
                 | '?'? ( PropertyName (( '=' | '!=' ) Value)?)
Value          ::= NumberLiteral | StringLiteral
StringLiteral  ::= QuotedString | UnquotedString
QuotedString   ::= '"' [^"]* '"' | "'" [^']* "'"
UnquotedString ::= [A-Za-z] [^{space},]+
NumberLiteral  ::= '0' ( [0-7]* | 'x' [0-9A-Fa-f]+ ) | '-'? [1-9] [0-9]+
PropertyName   ::= [A-Za-z] [A-Za-z0-9_]* ( '.' [A-Za-z] [A-Za-z0-9_]* )*

```

The flavour of EBNF being used is defined by:
https://www.w3.org/TR/2010/REC-xquery-20101214/#EBNFNotation.

## HISTORY


Properties were added in OpenSSL 3.0

## COPYRIGHT


Copyright 2019-2023 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/property.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/property.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/property.pod`；SHA-256：`32b769bc5b85875242f5105f7385b88002d27b3aefff830a815243af53ed2e7a`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
