---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-llvm-llvm-docs-howtouseattributes",
  "title": "LLVM：How To Use Attributes",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "HowToUseAttributes",
    "llvm"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "68d89e8934a6a5d8f4325c383c6acbfe50bc5daa66194a90e5a0634b53964611",
  "generatedHash": "51014c43812a2191e0dcda9385d20b54228cb468511c7c609e9fd8344892d6d2",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "How To Use Attributes：How To Use Attributes",
  "l1": ".. contents:: :local: Attributes in LLVM have changed in some fundamental ways. It was necessary to do this to support expanding the attributes to encompass more than a handful of attributes --- e.g. command line options. The old way of handling attributes consisted of representing them as a bit mask of values. This bit mask was stored in a \"list\" structure that was reference counted. The advantage of this was that attributes could be manipulated with 'or's and 'and's. The disadvantage of this was that there was limited room for expansion, and virtually no support for attribute-value pairs other than alignment. In the new scheme, an `Attribute` object represents a single attribute that's uniqued. You use the `Attribute::get` methods to create a new `Attribute` object. An attribute can be a single \"enum\" value (the enum being the `Attribut",
  "questions": [
    "HowToUseAttributes 如何用于How To Use Attributes？",
    "HowToUseAttributes 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-llvm-llvm-docs-howtouseattributes",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/HowToUseAttributes.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# LLVM：How To Use Attributes

> 本文收录 LLVM 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：How To Use Attributes。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

How To Use Attributes

## 技术正文

## How To Use Attributes


.. contents::
  :local:

## Introduction


Attributes in LLVM have changed in some fundamental ways.  It was necessary to
do this to support expanding the attributes to encompass more than a handful of
attributes --- e.g. command line options.  The old way of handling attributes
consisted of representing them as a bit mask of values.  This bit mask was
stored in a "list" structure that was reference counted.  The advantage of this
was that attributes could be manipulated with 'or's and 'and's.  The
disadvantage of this was that there was limited room for expansion, and
virtually no support for attribute-value pairs other than alignment.

In the new scheme, an `Attribute` object represents a single attribute that's
uniqued.  You use the `Attribute::get` methods to create a new `Attribute`
object.  An attribute can be a single "enum" value (the enum being the
`Attribute::AttrKind` enum), a string representing a target-dependent
attribute, or an attribute-value pair.  Some examples:

* Target-independent: `noinline`, `zext`
* Target-dependent: `"no-sse"`, `"thumb2"`
* Attribute-value pair: `"cpu" = "cortex-a8"`, `align = 4`

Note: for an attribute value pair, we expect a target-dependent attribute to
have a string for the value.

## ``Attribute``

An `Attribute` object is designed to be passed around by value.

Because attributes are no longer represented as a bit mask, you will need to
convert any code which does treat them as a bit mask to use the new query
methods on the Attribute class.

## ``AttributeList``


The `AttributeList` stores a collection of Attribute objects for each kind of
object that may have an attribute associated with it: the function as a whole,
the return type, or the function's parameters.  A function's attributes are at
index `AttributeList::FunctionIndex`; the return type's attributes are at
index `AttributeList::ReturnIndex`; and the function's parameters' attributes
are at indices 1, ..., n (where 'n' is the number of parameters).  Most methods
on the `AttributeList` class take an index parameter.

An `AttributeList` is also a uniqued and immutable object.  You create an
`AttributeList` through the `AttributeList::get` methods.  You can add and
remove attributes, which result in the creation of a new `AttributeList`.

An `AttributeList` object is designed to be passed around by value.

Note: It is advised that you do *not* use the `AttributeList` "introspection"
methods (e.g. `Raw`, `getRawPointer`, etc.).  These methods break
encapsulation, and may be removed in a future release.

## ``AttrBuilder``


Lastly, we have a "builder" class to help create the `AttributeList` object
without having to create several different intermediate uniqued
`AttributeList` objects.  The `AttrBuilder` class allows you to add and
remove attributes at will.  The attributes won't be uniqued until you call the
appropriate `AttributeList::get` method.

An `AttrBuilder` object is *not* designed to be passed around by value.  It
should be passed by reference.

Note: It is advised that you do *not* use the `AttrBuilder::addRawValue()`
method or the `AttrBuilder(uint64_t Val)` constructor.  These are for
backwards compatibility and may be removed in a future release.

And that's basically it! A lot of functionality is hidden behind these classes,
but the interfaces are pretty straight forward.

## 来源、版本与核验

- 上游：[llvm/docs/HowToUseAttributes.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/HowToUseAttributes.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/llvm/llvm/docs/HowToUseAttributes.rst`；SHA-256：`68d89e8934a6a5d8f4325c383c6acbfe50bc5daa66194a90e5a0634b53964611`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
