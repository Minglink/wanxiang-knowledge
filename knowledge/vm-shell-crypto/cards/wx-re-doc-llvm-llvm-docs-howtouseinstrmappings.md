---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-llvm-llvm-docs-howtouseinstrmappings",
  "title": "LLVM：How To Use Instruction Mappings",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "HowToUseInstrMappings",
    "llvm"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "26b3785884bc1bab90d9253e3296374c296eec54537d5d092e6143f89452ea94",
  "generatedHash": "891789b711fcbbfe1e2219f6c500089b7b52f4abeecde660c559e2854a6f5cdb",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "How To Use Instruction Mappings：How To Use Instruction Mappings",
  "l1": ".. contents:: :local: This document contains information about adding instruction mapping support for a target. The motivation behind this feature comes from the need to switch between different instruction formats during various optimizations. One approach could be to use switch cases which list all the instructions along with formats they can transition to. However, it has large maintenance overhead because of the hardcoded instruction names. Also, whenever a new instruction is added in the .td files, all the relevant switch cases should be modified accordingly. Instead, the same functionality could be achieved with TableGen and some support from the .td files for a fraction of maintenance cost. TableGen uses relationship models to map instructions with each other. These models are described using `InstrMapping` class as a base. Each mo",
  "questions": [
    "HowToUseInstrMappings 如何用于How To Use Instruction Mappings？",
    "HowToUseInstrMappings 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-llvm-llvm-docs-howtouseinstrmappings",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/HowToUseInstrMappings.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# LLVM：How To Use Instruction Mappings

> 本文收录 LLVM 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：How To Use Instruction Mappings。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

How To Use Instruction Mappings

## 技术正文

## How To Use Instruction Mappings


.. contents::
   :local:

## Introduction


This document contains information about adding instruction mapping support
for a target. The motivation behind this feature comes from the need to switch
between different instruction formats during various optimizations. One approach
could be to use switch cases which list all the instructions along with formats
they can transition to. However, it has large maintenance overhead
because of the hardcoded instruction names. Also, whenever a new instruction is
added in the .td files, all the relevant switch cases should be modified
accordingly. Instead, the same functionality could be achieved with TableGen and
some support from the .td files for a fraction of maintenance cost.

## ``InstrMapping`` Class Overview


TableGen uses relationship models to map instructions with each other. These
models are described using `InstrMapping` class as a base. Each model sets
various fields of the `InstrMapping` class such that they can uniquely
describe all the instructions using that model. TableGen parses all the relation
models and uses the information to construct relation tables which relate
instructions with each other. These tables are emitted in the
`XXXInstrInfo.inc` file along with the functions to query them. Following
is the definition of `InstrMapping` class defined in Target.td file:

```text
class InstrMapping {
  // Used to reduce search space only to the instructions using this
  // relation model.
  string FilterClass;

  // List of fields/attributes that should be same for all the instructions in
  // a row of the relation table. Think of this as a set of properties shared
  // by all the instructions related by this relationship.
  list<string> RowFields = [];

  // List of fields/attributes that are same for all the instructions
  // in a column of the relation table.
  list<string> ColFields = [];

  // Values for the fields/attributes listed in 'ColFields' corresponding to
  // the key instruction. This is the instruction that will be transformed
  // using this relation model.
  list<string> KeyCol = [];

  // List of values for the fields/attributes listed in 'ColFields', one for
  // each column in the relation table. These are the instructions a key
  // instruction will be transformed into.
  list<list<string> > ValueCols = [];
}

```

### Sample Example


Let's say that we want to have a function
`int getPredOpcode(uint16_t Opcode, enum PredSense inPredSense)` which
takes a non-predicated instruction and returns its predicated true or false form
depending on some input flag, `inPredSense`. The first step in the process is
to define a relationship model that relates predicated instructions to their
non-predicated form by assigning appropriate values to the `InstrMapping`
fields. For this relationship, non-predicated instructions are treated as key
instruction since they are the one used to query the interface function.

```text
def getPredOpcode : InstrMapping {
  // Choose a FilterClass that is used as a base class for all the
  // instructions modeling this relationship. This is done to reduce the
  // search space only to these set of instructions.
  let FilterClass = "PredRel";

  // Instructions with same values for all the fields in RowFields form a
  // row in the resulting relation table.
  // For example, if we want to relate 'ADD' (non-predicated) with 'Add_pt'
  // (predicated true) and 'Add_pf' (predicated false), then all 3
  // instructions need to have same value for BaseOpcode field. It can be any
  // unique value (Ex: XYZ) and should not be shared with any other
  // instruction not related to 'add'.
  let RowFields = ["BaseOpcode"];

  // List of attributes that can be used to define key and column instructions
  // for a relation. Key instruction is passed as an argument
  // to the function used for querying relation tables. Column instructions
  // are the instructions they (key) can transform into.
  //
  // Here, we choose 'PredSense' as ColFields since this is the unique
  // attribute of the key (non-predicated) and column (true/false)
  // instructions involved in this relationship model.
  let ColFields = ["PredSense"];

  // The key column contains non-predicated instructions.
  let KeyCol = ["none"];

  // Two value columns - first column contains instructions with
  // PredSense=true while second column has instructions with PredSense=false.
  let ValueCols = [["true"], ["false"]];
}

```

TableGen uses the above relationship model to emit relation table that maps
non-predicated instructions with their predicated forms. It also outputs the
interface function
`int getPredOpcode(uint16_t Opcode, enum PredSense inPredSense)` to query
the table. Here, Function `getPredOpcode` takes two arguments, opcode of the
current instruction and PredSense of the desired instruction, and returns
predicated form of the instruction, if found in the relation table.
In order for an instruction to be added into the relation table, it needs
to include relevant information in its definition. For example, consider
following to be the current definitions of ADD, ADD_pt (true) and ADD_pf (false)
instructions:

```text
def ADD : ALU32_rr<(outs IntRegs:$dst), (ins IntRegs:$a, IntRegs:$b),
            "$dst = add($a, $b)",
            [(set (i32 IntRegs:$dst), (add (i32 IntRegs:$a),
                                           (i32 IntRegs:$b)))]>;

def ADD_Pt : ALU32_rr<(outs IntRegs:$dst),
                       (ins PredRegs:$p, IntRegs:$a, IntRegs:$b),
            "if ($p) $dst = add($a, $b)",
            []>;

def ADD_Pf : ALU32_rr<(outs IntRegs:$dst),
                       (ins PredRegs:$p, IntRegs:$a, IntRegs:$b),
            "if (!$p) $dst = add($a, $b)",
            []>;

```

In this step, we modify these instructions to include the information
required by the relationship model, <tt>getPredOpcode</tt>, so that they can
be related.

```text
def ADD : PredRel, ALU32_rr<(outs IntRegs:$dst), (ins IntRegs:$a, IntRegs:$b),
            "$dst = add($a, $b)",
            [(set (i32 IntRegs:$dst), (add (i32 IntRegs:$a),
                                           (i32 IntRegs:$b)))]> {
  let BaseOpcode = "ADD";
  let PredSense = "none";
}

def ADD_Pt : PredRel, ALU32_rr<(outs IntRegs:$dst),
                       (ins PredRegs:$p, IntRegs:$a, IntRegs:$b),
            "if ($p) $dst = add($a, $b)",
            []> {
  let BaseOpcode = "ADD";
  let PredSense = "true";
}

def ADD_Pf : PredRel, ALU32_rr<(outs IntRegs:$dst),
                       (ins PredRegs:$p, IntRegs:$a, IntRegs:$b),
            "if (!$p) $dst = add($a, $b)",
            []> {
  let BaseOpcode = "ADD";
  let PredSense = "false";
}

```

Please note that all the above instructions use `PredRel` as a base class.
This is extremely important since TableGen uses it as a filter for selecting
instructions for `getPredOpcode` model. Any instruction not derived from
`PredRel` is excluded from the analysis. `BaseOpcode` is another important
field. Since it's selected as a `RowFields` of the model, it is required
to have the same value for all 3 instructions in order to be related. Next,
`PredSense` is used to determine their column positions by comparing its value
with `KeyCol` and `ValueCols`. If an instruction sets its `PredSense`
value to something not used in the relation model, it will not be assigned
a column in the relation table.

## 来源、版本与核验

- 上游：[llvm/docs/HowToUseInstrMappings.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/HowToUseInstrMappings.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/llvm/llvm/docs/HowToUseInstrMappings.rst`；SHA-256：`26b3785884bc1bab90d9253e3296374c296eec54537d5d092e6143f89452ea94`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
