---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-clang-clang-docs-ltovisibility",
  "title": "CLANG：LTO Visibility",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "LTOVisibility",
    "clang"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "9aece33f94ce5dd25f57e113d62a094899ec773e6824fcc230ee731f8b1c6eda",
  "generatedHash": "f80e3401d7ecc0d133a74665b2e3c5485ce09f7eea526b6bc6e2dff9c76d7b3f",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "LTO Visibility：LTO Visibility",
  "l1": "*LTO visibility* is a property of an entity that specifies whether it can be referenced from outside the current LTO unit. A *linkage unit* is a set of translation units linked together into an executable or DSO, and a linkage unit's *LTO unit* is the subset of the linkage unit that is linked together using link-time optimization; in the case where LTO is not being used, the linkage unit's LTO unit is empty. Each linkage unit has only a single LTO unit. The LTO visibility of a class is used by the compiler to determine which classes the whole-program devirtualization (`-fwhole-program-vtables`) and control flow integrity (`-fsanitize=cfi-vcall` and `-fsanitize=cfi-mfcall`) features apply to. These features use whole-program information, so they require the entire class hierarchy to be visible in order to work correctly. If any translation",
  "questions": [
    "LTOVisibility 如何用于LTO Visibility？",
    "LTOVisibility 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-clang-clang-docs-ltovisibility",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/clang/docs/LTOVisibility.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# CLANG：LTO Visibility

> 本文收录 CLANG 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：LTO Visibility。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

LTO Visibility

## 技术正文

## LTO Visibility


*LTO visibility* is a property of an entity that specifies whether it can be
referenced from outside the current LTO unit. A *linkage unit* is a set of
translation units linked together into an executable or DSO, and a linkage
unit's *LTO unit* is the subset of the linkage unit that is linked together
using link-time optimization; in the case where LTO is not being used, the
linkage unit's LTO unit is empty. Each linkage unit has only a single LTO unit.

The LTO visibility of a class is used by the compiler to determine which
classes the whole-program devirtualization (`-fwhole-program-vtables`) and
control flow integrity (`-fsanitize=cfi-vcall` and `-fsanitize=cfi-mfcall`)
features apply to. These features use whole-program information, so they
require the entire class hierarchy to be visible in order to work correctly.

If any translation unit in the program uses either of the whole-program
devirtualization or control flow integrity features, it is effectively an ODR
violation to define a class with hidden LTO visibility in multiple linkage
units. A class with public LTO visibility may be defined in multiple linkage
units, but the tradeoff is that the whole-program devirtualization and
control flow integrity features can only be applied to classes with hidden LTO
visibility. A class's LTO visibility is treated as an ODR-relevant property
of its definition, so it must be consistent between translation units.

In translation units built with LTO, LTO visibility is based on the
class's symbol visibility as expressed at the source level (i.e. the
`__attribute__((visibility("...")))` attribute, or the `-fvisibility=`
flag) or, on the Windows platform, the dllimport and dllexport attributes. When
targeting non-Windows platforms, classes with a visibility other than hidden
visibility receive public LTO visibility. When targeting Windows, classes
with dllimport or dllexport attributes receive public LTO visibility. All
other classes receive hidden LTO visibility. Classes with internal linkage
(e.g. classes declared in unnamed namespaces) also receive hidden LTO
visibility.

During the LTO link, all classes with public LTO visibility but not marked with
`[[clang::lto_visibility_public]]` (see below) will be refined to hidden LTO
visibility when the `--lto-whole-program-visibility` lld linker option is
applied (`-plugin-opt=whole-program-visibility` for gold).  This flag can be
used to defer specifying whether classes have hidden LTO visibility until link
time, to allow bitcode objects to be shared by different LTO links.  Due to an
implementation limitation, symbols associated with classes with hidden LTO
visibility may still be exported from the binary when using this flag. It is
unsafe to refer to these symbols, and their visibility may be relaxed to hidden
in a future compiler release.

A class defined in a translation unit built without LTO receives public
LTO visibility regardless of its object file visibility, linkage or other
attributes.

This mechanism will produce the correct result in most cases, but there are
two cases where it may wrongly infer hidden LTO visibility.

1. As a corollary of the above rules, if a linkage unit is produced from a
   combination of LTO object files and non-LTO object files, any hidden
   visibility class defined in both a translation unit built with LTO and
   a translation unit built without LTO must be defined with public LTO
   visibility in order to avoid an ODR violation.

2. Some ABIs provide the ability to define an abstract base class without
   visibility attributes in multiple linkage units and have virtual calls
   to derived classes in other linkage units work correctly. One example of
   this is COM on Windows platforms. If the ABI allows this, any base class
   used in this way must be defined with public LTO visibility.

Classes that fall into either of these categories can be marked up with the
`[[clang::lto_visibility_public]]` attribute. To specifically handle the
COM case, classes with the `__declspec(uuid())` attribute receive public
LTO visibility. On Windows platforms, clang-cl's `/MT` and `/MTd`
flags statically link the program against a prebuilt standard library;
these flags imply public LTO visibility for every class declared in the
`std` and `stdext` namespaces.

## Example


The following example shows how LTO visibility works in practice in several
cases involving two linkage units, `main` and `dso.so`.

```none
+-----------------------------------------------------------+  +----------------------------------------------------+
| main (clang++ -fvisibility=hidden):                       |  | dso.so (clang++ -fvisibility=hidden):              |
|                                                           |  |                                                    |
|  +-----------------------------------------------------+  |  |  struct __attribute__((visibility("default"))) C { |
|  | LTO unit (clang++ -fvisibility=hidden -flto):       |  |  |    virtual void f();                               |
|  |                                                     |  |  |  }                                                 |
|  |  struct A { ... };                                  |  |  |  void C::f() {}                                    |
|  |  struct [[clang::lto_visibility_public]] B { ... }; |  |  |  struct D {                                        |
|  |  struct __attribute__((visibility("default"))) C {  |  |  |    virtual void g() = 0;                           |
|  |    virtual void f();                                |  |  |  };                                                |
|  |  };                                                 |  |  |  struct E : D {                                    |
|  |  struct [[clang::lto_visibility_public]] D {        |  |  |    virtual void g() { ... }                        |
|  |    virtual void g() = 0;                            |  |  |  };                                                |
|  |  };                                                 |  |  |  __attribute__((visibility("default"))) D *mkE() { |
|  |                                                     |  |  |    return new E;                                   |
|  +-----------------------------------------------------+  |  |  }                                                 |
|                                                           |  |                                                    |
|  struct B { ... };                                        |  +----------------------------------------------------+
|                                                           |
+-----------------------------------------------------------+

```

We will now describe the LTO visibility of each of the classes defined in
these linkage units.

Class `A` is not defined outside of `main`'s LTO unit, so it can have
hidden LTO visibility. This is inferred from the object file visibility
specified on the command line.

Class `B` is defined in `main`, both inside and outside its LTO unit. The
definition outside the LTO unit has public LTO visibility, so the definition
inside the LTO unit must also have public LTO visibility in order to avoid
an ODR violation.

Class `C` is defined in both `main` and `dso.so` and therefore must
have public LTO visibility. This is correctly inferred from the `visibility`
attribute.

Class `D` is an abstract base class with a derived class `E` defined
in `dso.so`.  This is an example of the COM scenario; the definition of
`D` in `main`'s LTO unit must have public LTO visibility in order to be
compatible with the definition of `D` in `dso.so`, which is observable
by calling the function `mkE`.

## 来源、版本与核验

- 上游：[clang/docs/LTOVisibility.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/clang/docs/LTOVisibility.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/clang/clang/docs/LTOVisibility.rst`；SHA-256：`9aece33f94ce5dd25f57e113d62a094899ec773e6824fcc230ee731f8b1c6eda`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
