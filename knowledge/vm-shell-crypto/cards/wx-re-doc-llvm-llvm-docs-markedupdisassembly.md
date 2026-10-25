---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-llvm-llvm-docs-markedupdisassembly",
  "title": "LLVM：LLVM's Optional Rich Disassembly Output",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "MarkedUpDisassembly",
    "llvm"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "a0b9360948f4d1aac206411d6cfd61409ed812b0e069a9e3f102ee77b6b977d1",
  "generatedHash": "7ee0f45404b7082aa7ae7616ab054d7e41abecabe7689ce66574035b961cd919",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "LLVM's Optional Rich Disassembly Output：LLVM's Optional Rich Disassembly Output",
  "l1": ".. contents:: :local: LLVM's default disassembly output is raw text. To allow consumers more ability to introspect the instructions' textual representation or to reformat for a more user friendly display there is an optional rich disassembly output. This optional output is sufficient to reference into individual portions of the instruction text. This is intended for clients like disassemblers, list file generators, and pretty-printers, which need more than the raw instructions and the ability to print them. To provide this functionality the assembly text is marked up with annotations. The markup is simple enough in syntax to be robust even in the case of version mismatches between consumers and producers. That is, the syntax generally does not carry semantics beyond \"this text has an annotation,\" so consumers can simply ignore annotations",
  "questions": [
    "MarkedUpDisassembly 如何用于LLVM's Optional Rich Disassembly Output？",
    "MarkedUpDisassembly 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-llvm-llvm-docs-markedupdisassembly",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/MarkedUpDisassembly.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# LLVM：LLVM's Optional Rich Disassembly Output

> 本文收录 LLVM 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：LLVM's Optional Rich Disassembly Output。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

LLVM's Optional Rich Disassembly Output

## 技术正文

## LLVM's Optional Rich Disassembly Output


.. contents::
   :local:

## Introduction


LLVM's default disassembly output is raw text. To allow consumers more ability
to introspect the instructions' textual representation or to reformat for a more
user friendly display there is an optional rich disassembly output.

This optional output is sufficient to reference into individual portions of the
instruction text. This is intended for clients like disassemblers, list file
generators, and pretty-printers, which need more than the raw instructions and
the ability to print them.

To provide this functionality the assembly text is marked up with annotations.
The markup is simple enough in syntax to be robust even in the case of version
mismatches between consumers and producers. That is, the syntax generally does
not carry semantics beyond "this text has an annotation," so consumers can
simply ignore annotations they do not understand or do not care about.

After calling `LLVMCreateDisasm()` to create a disassembler context the
optional output is enable with this call:

```c
LLVMSetDisasmOptions(DC, LLVMDisassembler_Option_UseMarkup);

```

Then subsequent calls to `LLVMDisasmInstruction()` will return output strings
with the marked up annotations.

## Instruction Annotations



### Contextual markups


Annotated assembly display will supply contextual markup to help clients more
efficiently implement things like pretty printers. Most markup will be target
independent, so clients can effectively provide good display without any target
specific knowledge.

Annotated assembly goes through the normal instruction printer, but optionally
includes contextual tags on portions of the instruction string. An annotation
is any '<' '>' delimited section of text(1).

```bat
annotation: '<' tag-name tag-modifier-list ':' annotated-text '>'
tag-name: identifier
tag-modifier-list: comma delimited identifier list

```

The tag-name is an identifier which gives the type of the annotation. For the
first pass, this will be very simple, with memory references, registers, and
immediates having the tag names "mem", "reg", and "imm", respectively.

The tag-modifier-list is typically additional target-specific context, such as
register class.

Clients should accept and ignore any tag-names or tag-modifiers they do not
understand, allowing the annotations to grow in richness without breaking older
clients.

For example, a possible annotation of an ARM load of a stack-relative location
might be annotated as:

```text
ldr <reg gpr:r0>, <mem regoffset:[<reg gpr:sp>, <imm:#4>]>


```

1: For assembly dialects in which '<' and/or '>' are legal tokens, a literal token is escaped by following immediately with a repeat of the character.  For example, a literal '<' character is output as '<<' in an annotated assembly string.

### C API Details


The intended consumers of this information use the C API, therefore the new C
API function for the disassembler will be added to provide an option to produce
disassembled instructions with annotations, `LLVMSetDisasmOptions()` and the
`LLVMDisassembler_Option_UseMarkup` option (see above).

## 来源、版本与核验

- 上游：[llvm/docs/MarkedUpDisassembly.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/MarkedUpDisassembly.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/llvm/llvm/docs/MarkedUpDisassembly.rst`；SHA-256：`a0b9360948f4d1aac206411d6cfd61409ed812b0e069a9e3f102ee77b6b977d1`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
