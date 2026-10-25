---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-clang-clang-docs-itaniummangleabitags",
  "title": "CLANG：名称修饰与 ABI 标签",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "ItaniumMangleAbiTags",
    "clang"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "2a4edcb0426803c5b78f3a3d49a8bd889d1c837674b1989191436746d8bda7a0",
  "generatedHash": "192e1fd9b1be8c4ca88e2b01b6d3b6be7f491d7767ff02f2081f167ffd191579",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "名称修饰与 ABI 标签：ABI tags",
  "l1": "This text tries to describe gcc semantic for mangling \"abi_tag\" attributes described in https://gcc.gnu.org/onlinedocs/gcc/C_002b_002b-Attributes.html There is no guarantee the following rules are correct, complete or make sense in any way as they were determined empirically by experiments with gcc5. ABI tags are declared in an abi_tag attribute and can be applied to a function, variable, class or inline namespace declaration. The attribute takes one or more strings (called tags); the order does not matter. See https://gcc.gnu.org/onlinedocs/gcc/C_002b_002b-Attributes.html for details. Tags on an inline namespace are called \"implicit tags\", all other tags are \"explicit tags\". All tags that are \"active\" on an <unqualified-name> are emitted after the <unqualified-name>, before <template-args> or <discriminator>, and are part of the same <su",
  "questions": [
    "ItaniumMangleAbiTags 如何用于名称修饰与 ABI 标签？",
    "ItaniumMangleAbiTags 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-clang-clang-docs-itaniummangleabitags",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/clang/docs/ItaniumMangleAbiTags.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# CLANG：名称修饰与 ABI 标签

> 本文收录 CLANG 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：名称修饰与 ABI 标签。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

ABI tags

## 技术正文

## ABI tags


## Introduction


This text tries to describe gcc semantic for mangling "abi_tag" attributes
described in https://gcc.gnu.org/onlinedocs/gcc/C_002b_002b-Attributes.html

There is no guarantee the following rules are correct, complete or make sense
in any way as they were determined empirically by experiments with gcc5.

## Declaration


ABI tags are declared in an abi_tag attribute and can be applied to a
function, variable, class or inline namespace declaration. The attribute takes
one or more strings (called tags); the order does not matter.

See https://gcc.gnu.org/onlinedocs/gcc/C_002b_002b-Attributes.html for
details.

Tags on an inline namespace are called "implicit tags", all other tags are
"explicit tags".

## Mangling


All tags that are "active" on an <unqualified-name> are emitted after the
<unqualified-name>, before <template-args> or <discriminator>, and are part of
the same <substitution> the <unqualified-name> is.

They are mangled as:

```none
<abi-tags> ::= <abi-tag>*   # sort by name
<abi-tag> ::= B <tag source-name>

```

Example:

```c++
__attribute__((abi_tag("test")))
void Func();
// gets mangled as: _Z4FuncB4testv (prettified as `Func[abi:test]()`)

```

## Active tags


A namespace does not have any active tags. For types (class / struct / union /
enum), the explicit tags are the active tags.

For variables and functions, the active tags are the explicit tags plus any
"required tags" which are not in the "available tags" set:

```none
derived-tags := (required-tags - available-tags)
active-tags := explicit-tags + derived-tags

```

## Required tags for a function


If a function is used as a local scope for another name, and is part of
another function as local scope, it doesn't have any required tags.

If a function is used as a local scope for a guard variable name, it doesn't
have any required tags.

Otherwise the function requires any implicit or explicit tag used in the name
for the return type.

Example:

```c++
namespace A {
  inline namespace B __attribute__((abi_tag)) {
    struct C { int x; };
  }
}

A::C foo(); // gets mangled as: _Z3fooB1Bv (prettified as `foo[abi:B]()`)

```

## Required tags for a variable


A variable requires any implicit or explicit tag used in its type.

## Available tags


All tags used in the prefix and in the template arguments for a name are
available. Also, for functions, all tags from the <bare-function-type>
(which might include the return type for template functions) are available.

For <local-name>s all active tags used in the local part (<function-
encoding>) are available, but not implicit tags which were not active.

Implicit and explicit tags used in the <unqualified-name> for a function (as
in the type of a cast operator) are NOT available.

Example: a cast operator to std::string (which is
std::__cxx11::basic_string<...>) will use 'cxx11' as an active tag, as it is
required from the return type `std::string` but not available.

## 来源、版本与核验

- 上游：[clang/docs/ItaniumMangleAbiTags.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/clang/docs/ItaniumMangleAbiTags.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/clang/clang/docs/ItaniumMangleAbiTags.rst`；SHA-256：`2a4edcb0426803c5b78f3a3d49a8bd889d1c837674b1989191436746d8bda7a0`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
