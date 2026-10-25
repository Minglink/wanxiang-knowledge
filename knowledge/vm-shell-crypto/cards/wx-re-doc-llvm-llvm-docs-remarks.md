---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-llvm-llvm-docs-remarks",
  "title": "LLVM：Remarks",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "Remarks",
    "llvm"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "a066d7cee458f3a247428216efee5239d912c5231155e1353f4f472e280dfe42",
  "generatedHash": "9157c34f060a504533d05a4f49017863466110dc88e047cf2c780e98721bae88",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Remarks：Remarks",
  "l1": ".. contents:: :local: LLVM is able to emit diagnostics from passes describing whether an optimization has been performed or missed for a particular reason, which should give more insight to users about what the compiler did during the compilation pipeline. There are three main remark types: `Passed` Remarks that describe a successful optimization performed by the compiler. :Example: :: foo inlined into bar with (cost=always): always inline attribute `Missed` Remarks that describe an attempt to an optimization by the compiler that could not be performed. :Example: :: foo not inlined into bar because it should never be inlined (cost=never): noinline function attribute `Analysis` Remarks that describe the result of an analysis, that can bring more information to the user regarding the generated code. :Example: :: 16 stack bytes in function :",
  "questions": [
    "Remarks 如何用于Remarks？",
    "Remarks 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-llvm-llvm-docs-remarks",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/Remarks.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# LLVM：Remarks

> 本文收录 LLVM 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：Remarks。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

Remarks

## 技术正文

## Remarks


.. contents::
   :local:

## Introduction to the LLVM remark diagnostics


LLVM is able to emit diagnostics from passes describing whether an optimization
has been performed or missed for a particular reason, which should give more
insight to users about what the compiler did during the compilation pipeline.

There are three main remark types:

`Passed`

    Remarks that describe a successful optimization performed by the compiler.

    :Example:

    ::

        foo inlined into bar with (cost=always): always inline attribute

`Missed`

    Remarks that describe an attempt to an optimization by the compiler that
    could not be performed.

    :Example:

    ::

        foo not inlined into bar because it should never be inlined
        (cost=never): noinline function attribute

`Analysis`

    Remarks that describe the result of an analysis, that can bring more
    information to the user regarding the generated code.

    :Example:

    ::

        16 stack bytes in function

    ::

        10 instructions in function

## Enabling optimization remarks


There are two modes that are supported for enabling optimization remarks in
LLVM: through remark diagnostics, or through serialized remarks.

### Remark diagnostics


Optimization remarks can be emitted as diagnostics. These diagnostics will be
propagated to front-ends if desired, or emitted by tools like :doc:`llc
<CommandGuide/llc>` or `opt <CommandGuide/opt>`.

.. option:: -pass-remarks=<regex>

  Enables optimization remarks from passes whose name match the given (POSIX)
  regular expression.

.. option:: -pass-remarks-missed=<regex>

  Enables missed optimization remarks from passes whose name match the given
  (POSIX) regular expression.

.. option:: -pass-remarks-analysis=<regex>

  Enables optimization analysis remarks from passes whose name match the given
  (POSIX) regular expression.

### Serialized remarks


While diagnostics are useful during development, it is often more useful to
refer to optimization remarks post-compilation, typically during performance
analysis.

For that, LLVM can serialize the remarks produced for each compilation unit to
a file that can be consumed later.

By default, the format of the serialized remarks is :ref:`YAML
<yamlremarks>`, and it can be accompanied by a `section <remarkssection>`
in the object files to easily retrieve it.

`llc <CommandGuide/llc>` and `opt <CommandGuide/opt>` support the
following options:


`Basic options`

    .. option:: -pass-remarks-output=<filename>

      Enables the serialization of remarks to a file specified in <filename>.

      By default, the output is serialized to `YAML <yamlremarks>`.

    .. option:: -pass-remarks-format=<format>

      Specifies the output format of the serialized remarks.

      Supported formats:

      * `yaml <yamlremarks>` (default)
      * `yaml-strtab <yamlstrtabremarks>`
      * `bitstream <bitstreamremarks>`

`Content configuration`

    .. option:: -pass-remarks-filter=<regex>

      Only passes whose name match the given (POSIX) regular expression will be
      serialized to the final output.

    .. option:: -pass-remarks-with-hotness

      With PGO, include profile count in optimization remarks.

    .. option:: -pass-remarks-hotness-threshold

      The minimum profile count required for an optimization remark to be
      emitted.

Other tools that support remarks:

`llvm-lto`

    .. option:: -lto-pass-remarks-output=<filename>
    .. option:: -lto-pass-remarks-filter=<regex>
    .. option:: -lto-pass-remarks-format=<format>
    .. option:: -lto-pass-remarks-with-hotness
    .. option:: -lto-pass-remarks-hotness-threshold

`gold-plugin` and `lld`

    .. option:: -opt-remarks-filename=<filename>
    .. option:: -opt-remarks-filter=<regex>
    .. option:: -opt-remarks-format=<format>
    .. option:: -opt-remarks-with-hotness

## Serialization modes


There are two modes available for serializing remarks:

`Separate`

    In this mode, the remarks and the metadata are serialized separately. The
    client is responsible for parsing the metadata first, then use the metadata
    to correctly parse the remarks.

`Standalone`

    In this mode, the remarks and the metadata are serialized to the same
    stream. The metadata will always come before the remarks.

    The compiler does not support emitting standalone remarks. This mode is
    more suited for post-processing tools like linkers, that can merge the
    remarks for one whole project.


## YAML remarks


A typical remark serialized to YAML looks like this:

```yaml
--- !<TYPE>
Pass: <pass>
Name: <name>
DebugLoc: { File: <file>, Line: <line>, Column: <column> }
Function: <function>
Hotness: <hotness>
Args:
  - <key>: <value>
    DebugLoc: { File: <arg-file>, Line: <arg-line>, Column: <arg-column> }

```

The following entries are mandatory:

* `<TYPE>`: can be `Passed`, `Missed`, `Analysis`,
  `AnalysisFPCommute`, `AnalysisAliasing`, `Failure`.
* `<pass>`: the name of the pass that emitted this remark.
* `<name>`: the name of the remark coming from `<pass>`.
* `<function>`: the mangled name of the function.

If a `DebugLoc` entry is specified, the following fields are required:

* `<file>`
* `<line>`
* `<column>`

If an `arg` entry is specified, the following fields are required:

* `<key>`
* `<value>`

If a `DebugLoc` entry is specified within an `arg` entry, the following
fields are required:

* `<arg-file>`
* `<arg-line>`
* `<arg-column>`


### YAML with a string table


The YAML serialization supports the usage of a string table by using the
`yaml-strtab` format.

This format replaces strings in the YAML output with integers representing the
index in the string table that can be provided separately through metadata.

The following entries can take advantage of the string table while respecting
YAML rules:

* `<pass>`
* `<name>`
* `<function>`
* `<file>`
* `<value>`
* `<arg-file>`

Currently, none of the tools in `the opt-viewer directory <optviewer>`
support this format.


### YAML metadata


The metadata used together with the YAML format is:

* a magic number: "REMARKS\\0"
* the version number: a little-endian uint64_t
* the total size of the string table (the size itself excluded):
  little-endian uint64_t
* a list of null-terminated strings

Optional:

* the absolute file path to the serialized remark diagnostics: a
  null-terminated string.

When the metadata is serialized separately from the remarks, the file path
should be present and point to the file where the remarks are serialized to.

In case the metadata only acts as a header to the remarks, the file path can be
omitted.


## LLVM bitstream remarks


This format is using `LLVM bitstream <BitCodeFormat>` to serialize remarks
and their associated metadata.

A bitstream remark stream can be identified by the magic number `"RMRK"` that
is placed at the very beginning.

The format for serializing remarks is composed of two different block types:


### META_BLOCK


The block providing information about the rest of the content in the stream.

Exactly one block is expected. Having multiple metadata blocks is an error.

This block can contain the following records:


`RECORD_META_CONTAINER_INFO`

    The container version and type.

    Version: u32

    Type:    u2


`RECORD_META_REMARK_VERSION`

    The version of the remark entries. This can change independently from the
    container version.

    Version: u32


`RECORD_META_STRTAB`

    The string table used by the remark entries. The format of the string table
    is a sequence of strings separated by `\0`.


`RECORD_META_EXTERNAL_FILE`

    The external remark file path that contains the remark blocks associated
    with this metadata. This is an absolute path.


### REMARK_BLOCK


The block describing a remark entry.

0 or more blocks per file are allowed. Each block will depend on the
`META_BLOCK <bitstreamremarksmetablock>` in order to be parsed correctly.

This block can contain the following records:

`RECORD_REMARK_HEADER`

    The header of the remark. This contains all the mandatory information about
    a remark.

    +---------------+---------------------------+
    | Type          | u3                        |
    +---------------+---------------------------+
    | Remark name   | VBR6 (string table index) |
    +---------------+---------------------------+
    | Pass name     | VBR6 (string table index) |
    +---------------+---------------------------+
    | Function name | VBR6 (string table index) |
    +---------------+---------------------------+

`RECORD_REMARK_DEBUG_LOC`

    The source location for the corresponding remark. This record is optional.

    +--------+---------------------------+
    | File   | VBR7 (string table index) |
    +--------+---------------------------+
    | Line   | u32                       |
    +--------+---------------------------+
    | Column | u32                       |
    +--------+---------------------------+

`RECORD_REMARK_HOTNESS`

    The hotness of the remark. This record is optional.

    +---------------+---------------------+
    | Hotness | VBR8 (string table index) |
    +---------------+---------------------+

`RECORD_REMARK_ARG_WITH_DEBUGLOC`

    A remark argument with an associated debug location.

    +--------+---------------------------+
    | Key    | VBR7 (string table index) |
    +--------+---------------------------+
    | Value  | VBR7 (string table index) |
    +--------+---------------------------+
    | File   | VBR7 (string table index) |
    +--------+---------------------------+
    | Line   | u32                       |
    +--------+---------------------------+
    | Column | u32                       |
    +--------+---------------------------+

`RECORD_REMARK_ARG_WITHOUT_DEBUGLOC`

    A remark argument with an associated debug location.

    +--------+---------------------------+
    | Key    | VBR7 (string table index) |
    +--------+---------------------------+
    | Value  | VBR7 (string table index) |
    +--------+---------------------------+

### The remark container


Bitstream remarks are designed to be used in two different modes:

`The separate mode`

    The separate mode is the mode that is typically used during compilation. It
    provides a way to serialize the remark entries to a stream while some
    metadata is kept in memory to be emitted in the product of the compilation
    (typically, an object file).

`The standalone mode`

    The standalone mode is typically stored and used after the distribution of
    a program. It contains all the information that allows the parsing of all
    the remarks without having any external dependencies.

In order to support multiple modes, the format introduces the concept of a
bitstream remark container type.


`SeparateRemarksMeta: the metadata emitted separately`

    This container type expects only a `META_BLOCK <bitstreamremarksmetablock>` containing only:

    * `RECORD_META_CONTAINER_INFO <bitstreamremarksrecordmetacontainerinfo>`
    * `RECORD_META_STRTAB <bitstreamremarksrecordmetastrtab>`
    * `RECORD_META_EXTERNAL_FILE <bitstreamremarksrecordmetaexternalfile>`

    Typically, this is emitted in a section in the object files, allowing
    clients to retrieve remarks and their associated metadata directly from
    intermediate products.

`SeparateRemarksFile: the remark entries emitted separately`

    This container type expects only a `META_BLOCK <bitstreamremarksmetablock>` containing only:

    * `RECORD_META_CONTAINER_INFO <bitstreamremarksrecordmetacontainerinfo>`
    * `RECORD_META_REMARK_VERSION <bitstreamremarksrecordmetaremarkversion>`

    This container type expects 0 or more `REMARK_BLOCK <bitstreamremarksremarkblock>`.

    Typically, this is emitted in a side-file alongside an object file, and is
    made to be able to stream to without increasing the memory consumption of
    the compiler. This is referenced by the :ref:`RECORD_META_EXTERNAL_FILE
    <bitstreamremarksrecordmetaexternalfile>` entry in the
    `SeparateRemarksMeta <bitstreamremarksseparateremarksmeta>` container.

When the parser tries to parse a container that contains the metadata for the
separate remarks, it should parse the version and type, then keep the string
table in memory while opening the external file, validating its metadata and
parsing the remark entries.

The container versions from the separate container should match in order to
have a well-formed file.

`Standalone: the metadata and the remark entries emitted together`

    This container type expects only a `META_BLOCK <bitstreamremarksmetablock>` containing only:

    * `RECORD_META_CONTAINER_INFO <bitstreamremarksrecordmetacontainerinfo>`
    * `RECORD_META_REMARK_VERSION <bitstreamremarksrecordmetaremarkversion>`
    * `RECORD_META_STRTAB <bitstreamremarksrecordmetastrtab>`

    This container type expects 0 or more `REMARK_BLOCK <bitstreamremarksremarkblock>`.

A complete output of `llvm-bcanalyzer` on the different container types:

`SeparateRemarksMeta`

```none
<BLOCKINFO_BLOCK/>
<Meta BlockID=8 NumWords=13 BlockCodeSize=3>
  <Container info codeid=1 abbrevid=4 op0=5 op1=0/>
  <String table codeid=3 abbrevid=5/> blob data = 'pass\\x00key\\x00value\\x00'
  <External File codeid=4 abbrevid=6/> blob data = '/path/to/file/name'
</Meta>

```

`SeparateRemarksFile`

```none
<BLOCKINFO_BLOCK/>
<Meta BlockID=8 NumWords=3 BlockCodeSize=3>
  <Container info codeid=1 abbrevid=4 op0=0 op1=1/>
  <Remark version codeid=2 abbrevid=5 op0=0/>
</Meta>
<Remark BlockID=9 NumWords=8 BlockCodeSize=4>
  <Remark header codeid=5 abbrevid=4 op0=2 op1=0 op2=1 op3=2/>
  <Remark debug location codeid=6 abbrevid=5 op0=3 op1=99 op2=55/>
  <Remark hotness codeid=7 abbrevid=6 op0=999999999/>
  <Argument with debug location codeid=8 abbrevid=7 op0=4 op1=5 op2=6 op3=11 op4=66/>
</Remark>

```

`Standalone`

```none
<BLOCKINFO_BLOCK/>
<Meta BlockID=8 NumWords=15 BlockCodeSize=3>
  <Container info codeid=1 abbrevid=4 op0=5 op1=2/>
  <Remark version codeid=2 abbrevid=5 op0=30/>
  <String table codeid=3 abbrevid=6/> blob data = 'pass\\x00remark\\x00function\\x00path\\x00key\\x00value\\x00argpath\\x00'
</Meta>
<Remark BlockID=9 NumWords=8 BlockCodeSize=4>
  <Remark header codeid=5 abbrevid=4 op0=2 op1=1 op2=0 op3=2/>
  <Remark debug location codeid=6 abbrevid=5 op0=3 op1=99 op2=55/>
  <Remark hotness codeid=7 abbrevid=6 op0=999999999/>
  <Argument with debug location codeid=8 abbrevid=7 op0=4 op1=5 op2=6 op3=11 op4=66/>
</Remark>

```

## opt-viewer


The `opt-viewer` directory contains a collection of tools that visualize and
summarize serialized remarks.

The tools only support the `yaml` format.


### opt-viewer.py


Output a HTML page which gives visual feedback on compiler interactions with
your program.

    :Examples:

    ::

        $ opt-viewer.py my_yaml_file.opt.yaml

    ::

        $ opt-viewer.py my_build_dir/


### opt-stats.py


Output statistics about the optimization remarks in the input set.

    :Example:

    ::

        $ opt-stats.py my_yaml_file.opt.yaml

        Total number of remarks           3


        Top 10 remarks by pass:
          inline                         33%
          asm-printer                    33%
          prologepilog                   33%

        Top 10 remarks:
          asm-printer/InstructionCount   33%
          inline/NoDefinition            33%
          prologepilog/StackSize         33%

### opt-diff.py


Produce a new YAML file which contains all of the changes in optimizations
between two YAML files.

Typically, this tool should be used to do diffs between:

* new compiler + fixed source vs old compiler + fixed source
* fixed compiler + new source vs fixed compiler + old source

This diff file can be displayed using `opt-viewer.py <optviewerpy>`.

    :Example:

    ::

        $ opt-diff.py my_opt_yaml1.opt.yaml my_opt_yaml2.opt.yaml -o my_opt_diff.opt.yaml
        $ opt-viewer.py my_opt_diff.opt.yaml


## Emitting remark diagnostics in the object file


A section containing metadata on remark diagnostics will be emitted for the
following formats:

* `yaml-strtab`
* `bitstream`

This can be overridden by using the flag `-remarks-section=<bool>`.

The section is named:

* `__LLVM,__remarks` (MachO)

## C API


LLVM provides a library that can be used to parse remarks through a shared
library named `libRemarks`.

The typical usage through the C API is like the following:

```c
LLVMRemarkParserRef Parser = LLVMRemarkParserCreateYAML(Buf, Size);
LLVMRemarkEntryRef Remark = NULL;
while ((Remark = LLVMRemarkParserGetNext(Parser))) {
   // use Remark
   LLVMRemarkEntryDispose(Remark); // Release memory.
}
bool HasError = LLVMRemarkParserHasError(Parser);
LLVMRemarkParserDispose(Parser);

```

## Remark streamers


The `RemarkStreamer` interface is used to unify the serialization
capabilities of remarks across all the components that can generate remarks.

All remark serialization should go through the main remark streamer, the
`llvm::remarks::RemarkStreamer` set up in the `LLVMContext`. The interface
takes remark objects converted to `llvm::remarks::Remark`, and takes care of
serializing it to the requested format, using the requested type of metadata,
etc.

Typically, a specialized remark streamer will hold a reference to the one set
up in the `LLVMContext`, and will operate on its own type of diagnostics.

For example, LLVM IR passes will emit `llvm::DiagnosticInfoOptimization*`
that get converted to `llvm::remarks::Remark` objects.  Then, clang could set
up its own specialized remark streamer that takes `clang::Diagnostic`
objects. This can allow various components of the frontend to emit remarks
using the same techniques as the LLVM remarks.

This gives us the following advantages:

* Composition: during the compilation pipeline, multiple components can set up
  their specialized remark streamers that all emit remarks through the same
  main streamer.
* Re-using the remark infrastructure in `lib/Remarks`.
* Using the same file and format for the remark emitters created throughout the
  compilation.

at the cost of an extra layer of abstraction.

.. FIXME: add documentation for llvm-opt-report.
.. FIXME: add documentation for Passes supporting optimization remarks
.. FIXME: add documentation for IR Passes
.. FIXME: add documentation for CodeGen Passes

## 来源、版本与核验

- 上游：[llvm/docs/Remarks.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/Remarks.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/llvm/llvm/docs/Remarks.rst`；SHA-256：`a066d7cee458f3a247428216efee5239d912c5231155e1353f4f472e280dfe42`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
