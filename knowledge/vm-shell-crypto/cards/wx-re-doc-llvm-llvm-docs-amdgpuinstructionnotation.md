---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-llvm-llvm-docs-amdgpuinstructionnotation",
  "title": "LLVM：AMDGPU Instructions Notation",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "AMDGPUInstructionNotation",
    "llvm"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "cef25631a3dcd210ff8bf599697306d1ecdc0b78818ca6179400fe32e70c6cf5",
  "generatedHash": "5166b843acd32e8f5d4229cacfe2da163266f755e5871fc8f26cb4df1a33bc89",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "AMDGPU Instructions Notation：AMDGPU Instructions Notation",
  "l1": ".. contents:: :local: This is an overview of notation used to describe the syntax of AMDGPU assembler instructions. This notation looks a lot like the `syntax of assembler instructions<amdgpu_syn_instructions>`, except that instead of real operands and modifiers, it uses references to their descriptions. This is the notation used to describe AMDGPU instructions: | `<`\\ `opcode description<amdgpu_syn_opcode_notation>`\\ ``> <``\\ `operands description<amdgpu_syn_instruction_operands_notation>`\\ ``> <``\\ `modifiers description<amdgpu_syn_instruction_modifiers_notation>`\\ `>` TBD An instruction may have zero or more *operands*. They are comma-separated in the description: | `<`\\ `description of operand 0<amdgpu_syn_instruction_operand_notation>`\\ ``>, <``\\ `description of operand 1<amdgpu_syn_instruction_operand_notation>`\\ `>, ...` The order ",
  "questions": [
    "AMDGPUInstructionNotation 如何用于AMDGPU Instructions Notation？",
    "AMDGPUInstructionNotation 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-llvm-llvm-docs-amdgpuinstructionnotation",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/AMDGPUInstructionNotation.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# LLVM：AMDGPU Instructions Notation

> 本文收录 LLVM 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：AMDGPU Instructions Notation。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

AMDGPU Instructions Notation

## 技术正文

## AMDGPU Instructions Notation


.. contents::
   :local:


## Introduction


This is an overview of notation used to describe the syntax of AMDGPU assembler instructions.

This notation looks a lot like the `syntax of assembler instructions<amdgpu_syn_instructions>`,
except that instead of real operands and modifiers, it uses references to their descriptions.

## Instructions


### Notation


This is the notation used to describe AMDGPU instructions:

  | `<`\ `opcode description<amdgpu_syn_opcode_notation>`\ ``>
      <``\ `operands description<amdgpu_syn_instruction_operands_notation>`\ ``>
      <``\ `modifiers description<amdgpu_syn_instruction_modifiers_notation>`\ `>`


## Opcode


### Notation


TBD


## Operands


An instruction may have zero or more *operands*. They are comma-separated in the description:

  | `<`\ `description of operand 0<amdgpu_syn_instruction_operand_notation>`\ ``>,
      <``\ `description of operand 1<amdgpu_syn_instruction_operand_notation>`\ `>, ...`

The order of *operands* is fixed. *Operands* cannot be omitted
except for special cases described below.


### Notation


An operand is described using the following notation:

    *<kind><name><tag0><tag1>...*

Where:

* *kind* is an optional prefix describing operand `kind<amdgpu_syn_instruction_operand_kinds>`.
* *name* is a link to a description of the operand.
* *tags* are optional. They are used to indicate
  `special operand properties<amdgpu_syn_instruction_operand_tags>`.


#### Operand Kinds


Operand kind indicates which values are accepted by the operand.

* Operands which only accept *vector* registers are labelled with 'v' prefix.
* Operands which only accept *scalar* registers and values are labelled with 's' prefix.
* Operands which accept any registers and values have no prefix.

Examples:

```
vdata          // operand only accepts vector registers
sdst           // operand only accepts scalar registers
src1           // operand accepts vector registers, scalar registers, and scalar values

```


#### Operand Tags


Operand tags indicate special operand properties.

    ============== =================================================================================
    Operand tag    Meaning
    ============== =================================================================================
    :opt           An optional operand.
    :m             An operand which may be used with operand modifiers
                   `abs<amdgpu_synid_abs>`, `neg<amdgpu_synid_neg>` or
                   `sext<amdgpu_synid_sext>`.
    :dst           An input operand which is also used as a destination
                   if `glc<amdgpu_synid_glc>` modifier is specified.
    :fx            This is a *f32* or *f16* operand, depending on
                   `m_op_sel_hi<amdgpu_synid_mad_mix_op_sel_hi>` modifier.
    :<type>        The operand *type* differs from the *type*
                   `implied by the opcode name<amdgpu_syn_instruction_type>`.
                   This tag specifies the actual operand *type*.
    ============== =================================================================================

Examples:

```
src1:m             // src1 operand may be used with operand modifiers
vdata:dst          // vdata operand may be used as both source and destination
vdst:u32           // vdst operand has u32 type

```


## Modifiers


An instruction may have zero or more optional *modifiers*. They are space-separated in the description:

  | `<`\ `description of modifier 0<amdgpu_syn_instruction_modifier_notation>`\ ``>
      <``\ `description of modifier 1<amdgpu_syn_instruction_modifier_notation>`\ `> ...`

The order of *modifiers* is fixed.


### Notation


A *modifier* is described using the following notation:

    *<name>*

Where the *name* is a link to a description of the *modifier*.

## 来源、版本与核验

- 上游：[llvm/docs/AMDGPUInstructionNotation.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/AMDGPUInstructionNotation.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/llvm/llvm/docs/AMDGPUInstructionNotation.rst`；SHA-256：`cef25631a3dcd210ff8bf599697306d1ecdc0b78818ca6179400fe32e70c6cf5`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
