---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-llvm-llvm-docs-amdgpuinstructionsyntax",
  "title": "LLVM：AMDGPU Instruction Syntax",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "AMDGPUInstructionSyntax",
    "llvm"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "666b562d2d0f583d4e956047d804faf4df057bb5de493537f4279cc2c43f5f8f",
  "generatedHash": "6ec00905f5dcd3831058345376297c91474eb09e217d03a4d26cb56dc410d87d",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "AMDGPU Instruction Syntax：AMDGPU Instruction Syntax",
  "l1": ".. contents:: :local: An instruction has the following syntax: | `<`\\ *opcode mnemonic*\\ `> <`\\ *operand0*\\ ``>, <`\\ *operand1*\\ `>,... <`\\ *modifier0*\\ `> <`\\ *modifier1*\\ `>...`` `Operands<AMDGPUOperandSyntax>` are normally comma-separated, while `modifiers<AMDGPUModifierSyntax>` are space-separated. The order of *operands* and *modifiers* is fixed. Most *modifiers* are optional and may be omitted. *VOPDX* and *VOPDY* instructions must be concatenated with the :: operator to form a single *VOPD* instruction: `<`\\ *VOPDX instruction*\\ `> :: <`\\ *VOPDY instruction*\\ `>` An example: ``` v_dual_add_f32 v255, v255, v2 :: v_dual_fmaak_f32 v6, v2, v3, 1.0 ``` Note that *VOPDX* and *VOPDY* instructions cannot be used as separate opcodes. Opcode mnemonic describes opcode semantics and may include one or more suffices in this order: * `Packing su",
  "questions": [
    "AMDGPUInstructionSyntax 如何用于AMDGPU Instruction Syntax？",
    "AMDGPUInstructionSyntax 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-llvm-llvm-docs-amdgpuinstructionsyntax",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/AMDGPUInstructionSyntax.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# LLVM：AMDGPU Instruction Syntax

> 本文收录 LLVM 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：AMDGPU Instruction Syntax。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

AMDGPU Instruction Syntax

## 技术正文

## AMDGPU Instruction Syntax


.. contents::
   :local:


## Instructions


### Syntax


#### Syntax of Regular Instructions


An instruction has the following syntax:

  | `<`\ *opcode mnemonic*\ `>    <`\ *operand0*\ ``>,
      <`\ *operand1*\ `>,...    <`\ *modifier0*\ `> <`\ *modifier1*\ `>...``

`Operands<AMDGPUOperandSyntax>` are normally comma-separated, while
`modifiers<AMDGPUModifierSyntax>` are space-separated.

The order of *operands* and *modifiers* is fixed.
Most *modifiers* are optional and may be omitted.

#### Syntax of VOPD Instructions


*VOPDX* and *VOPDY* instructions must be concatenated with the :: operator to form a single *VOPD* instruction:

    `<`\ *VOPDX instruction*\ `>  ::  <`\ *VOPDY instruction*\ `>`

An example:

```
v_dual_add_f32 v255, v255, v2 :: v_dual_fmaak_f32 v6, v2, v3, 1.0

```

Note that *VOPDX* and *VOPDY* instructions cannot be used as separate opcodes.


### Opcode Mnemonic


Opcode mnemonic describes opcode semantics
and may include one or more suffices in this order:

* `Packing suffix<amdgpu_syn_instruction_pk>`.
* `Destination operand type suffix<amdgpu_syn_instruction_type>`.
* `Source operand type suffix<amdgpu_syn_instruction_type>`.
* `Encoding suffix<amdgpu_syn_instruction_enc>`.


### Packing Suffix


Most instructions which operate on packed data have a *_pk* suffix.
Unless otherwise `noted<amdgpu_syn_instruction_operand_tags>`,
these instructions operate on and produce packed data composed of
two values. The type of values is indicated by
`type suffices<amdgpu_syn_instruction_type>`.

For example, the following instruction sums up two pairs of f16 values
and produces a pair of f16 values:

```
v_pk_add_f16 v1, v2, v3     // Each operand has f16x2 type

```


### Type and Size Suffices


Instructions which operate with data have an implied type of *data* operands.
This data type is specified as a suffix of instruction mnemonic.

There are instructions which have 2 type suffices:
the first is the data type of the destination operand,
the second is the data type of source *data* operand(s).

Note that data type specified by an instruction does not apply
to other kinds of operands such as *addresses*, *offsets* and so on.

The following table enumerates the most frequently used type suffices.

    ============================================ ======================= ============================
    Type Suffices                                Packed instruction?     Data Type
    ============================================ ======================= ============================
    _b512, _b256, _b128, _b64, _b32, _b16, _b8   No                      Bits.
    _u64, _u32, _u16, _u8                        No                      Unsigned integer.
    _i64, _i32, _i16, _i8                        No                      Signed integer.
    _f64, _f32, _f16                             No                      Floating-point.
    _b16, _u16, _i16, _f16                       Yes                     Packed (b16x2, u16x2, etc).
    ============================================ ======================= ============================

Instructions which have no type suffices are assumed to operate with typeless data.
The size of typeless data is specified by size suffices:

    ================= =================== =====================================
    Size Suffix       Implied data type   Required register size in dwords
    ================= =================== =====================================
    \-                b32                 1
    x2                b64                 2
    x3                b96                 3
    x4                b128                4
    x8                b256                8
    x16               b512                16
    x                 b32                 1
    xy                b64                 2
    xyz               b96                 3
    xyzw              b128                4
    d16_x             b16                 1
    d16_xy            b16x2               2 for GFX8.0, 1 for GFX8.1 and GFX9+
    d16_xyz           b16x3               3 for GFX8.0, 2 for GFX8.1 and GFX9+
    d16_xyzw          b16x4               4 for GFX8.0, 2 for GFX8.1 and GFX9+
    d16_format_x      b16                 1
    d16_format_xy     b16x2               1
    d16_format_xyz    b16x3               2
    d16_format_xyzw   b16x4               2
    ================= =================== =====================================

.. WARNING::
    There are exceptions to the rules described above.
    Operands which have a type different from the type specified by the opcode are
    `tagged<amdgpu_syn_instruction_operand_tags>` in the description.

Examples of instructions with different types of source and destination operands:

```
s_bcnt0_i32_b64
v_cvt_f32_u32

```

Examples of instructions with one data type:

```
v_max3_f32
v_max3_i16

```

Examples of instructions which operate with packed data:

```
v_pk_add_u16
v_pk_add_i16
v_pk_add_f16

```

Examples of typeless instructions which operate on b128 data:

```
buffer_store_dwordx4
flat_load_dwordx4

```


### Encoding Suffices


Most *VOP1*, *VOP2* and *VOPC* instructions have several variants:
they may also be encoded in *VOP3*, *DPP* and *SDWA* formats.

The assembler selects an optimal encoding automatically
based on instruction operands and modifiers,
unless a specific encoding is explicitly requested.
To force specific encoding, one can add a suffix to the opcode of the instruction:

    =================================================== =================
    Encoding                                            Encoding Suffix
    =================================================== =================
    *VOP1*, *VOP2* and *VOPC* (32-bit) encoding         _e32
    *VOP3* (64-bit) encoding                            _e64
    *DPP* encoding                                      _dpp
    *SDWA* encoding                                     _sdwa
    *VOP3 DPP* encoding                                 _e64_dpp
    =================================================== =================

This reference uses encoding suffices to specify which encoding is implied.
When no suffix is specified, native instruction encoding is assumed.

## Operands


### Syntax


The syntax of generic operands is described `in this document<AMDGPUOperandSyntax>`.

For detailed information about operands, follow *operand links* in GPU-specific documents.

## Modifiers


### Syntax


The syntax of modifiers is described `in this document<AMDGPUModifierSyntax>`.

Information about modifiers supported for individual instructions
may be found in GPU-specific documents.

## 来源、版本与核验

- 上游：[llvm/docs/AMDGPUInstructionSyntax.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/AMDGPUInstructionSyntax.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/llvm/llvm/docs/AMDGPUInstructionSyntax.rst`；SHA-256：`666b562d2d0f583d4e956047d804faf4df057bb5de493537f4279cc2c43f5f8f`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
