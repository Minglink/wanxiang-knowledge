---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-llvm-llvm-docs-mcjitdesignandimplementation",
  "title": "LLVM：MCJIT 设计与实现",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "MCJITDesignAndImplementation",
    "llvm"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "11d3d264cb3bcbac6922cc8ea0137fe8eb29264ea663cad489bb4926f40269fa",
  "generatedHash": "122c5c371684d23e4408b6ea69bf2dafed2613379abaad252a695235479ac38c",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "MCJIT 设计与实现：MCJIT Design and Implementation",
  "l1": "This document describes the internal workings of the MCJIT execution engine and the RuntimeDyld component. It is intended as a high level overview of the implementation, showing the flow and interactions of objects throughout the code generation and dynamic loading process. In most cases, an EngineBuilder object is used to create an instance of the MCJIT execution engine. The EngineBuilder takes an llvm::Module object as an argument to its constructor. The client may then set various options that we control the later be passed along to the MCJIT engine, including the selection of MCJIT as the engine type to be created. Of particular interest is the EngineBuilder::setMCJITMemoryManager function. If the client does not explicitly create a memory manager at this time, a default memory manager (specifically SectionMemoryManager) will be creat",
  "questions": [
    "MCJITDesignAndImplementation 如何用于MCJIT 设计与实现？",
    "MCJITDesignAndImplementation 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-focus-vm-jit-cache",
      "kind": "机制参照"
    }
  ],
  "externalSources": [
    {
      "id": "doc-llvm-llvm-docs-mcjitdesignandimplementation",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/MCJITDesignAndImplementation.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# LLVM：MCJIT 设计与实现

> 本文收录 LLVM 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：MCJIT 设计与实现。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

MCJIT Design and Implementation

## 技术正文

## MCJIT Design and Implementation


## Introduction


This document describes the internal workings of the MCJIT execution
engine and the RuntimeDyld component.  It is intended as a high level
overview of the implementation, showing the flow and interactions of
objects throughout the code generation and dynamic loading process.

## Engine Creation


In most cases, an EngineBuilder object is used to create an instance of
the MCJIT execution engine.  The EngineBuilder takes an llvm::Module
object as an argument to its constructor.  The client may then set various
options that we control the later be passed along to the MCJIT engine,
including the selection of MCJIT as the engine type to be created.
Of particular interest is the EngineBuilder::setMCJITMemoryManager
function.  If the client does not explicitly create a memory manager at
this time, a default memory manager (specifically SectionMemoryManager)
will be created when the MCJIT engine is instantiated.

Once the options have been set, a client calls EngineBuilder::create to
create an instance of the MCJIT engine.  If the client does not use the
form of this function that takes a TargetMachine as a parameter, a new
TargetMachine will be created based on the target triple associated with
the Module that was used to create the EngineBuilder.

> 原文 RST 指令（依赖上游工程，未展开）：`.. image:: MCJIT-engine-builder.png`

EngineBuilder::create will call the static MCJIT::createJIT function,
passing in its pointers to the module, memory manager and target machine
objects, all of which will subsequently be owned by the MCJIT object.

The MCJIT class has a member variable, Dyld, which contains an instance of
the RuntimeDyld wrapper class.  This member will be used for
communications between MCJIT and the actual RuntimeDyldImpl object that
gets created when an object is loaded.

> 原文 RST 指令（依赖上游工程，未展开）：`.. image:: MCJIT-creation.png`

Upon creation, MCJIT holds a pointer to the Module object that it received
from EngineBuilder but it does not immediately generate code for this
module.  Code generation is deferred until either the
MCJIT::finalizeObject method is called explicitly or a function such as
MCJIT::getPointerToFunction is called which requires the code to have been
generated.

## Code Generation


When code generation is triggered, as described above, MCJIT will first
attempt to retrieve an object image from its ObjectCache member, if one
has been set.  If a cached object image cannot be retrieved, MCJIT will
call its emitObject method.  MCJIT::emitObject uses a local PassManager
instance and creates a new ObjectBufferStream instance, both of which it
passes to TargetMachine::addPassesToEmitMC before calling PassManager::run
on the Module with which it was created.

> 原文 RST 指令（依赖上游工程，未展开）：`.. image:: MCJIT-load.png`

The PassManager::run call causes the MC code generation mechanisms to emit
a complete relocatable binary object image (either in either ELF or MachO
format, depending on the target) into the ObjectBufferStream object, which
is flushed to complete the process.  If an ObjectCache is being used, the
image will be passed to the ObjectCache here.

At this point, the ObjectBufferStream contains the raw object image.
Before the code can be executed, the code and data sections from this
image must be loaded into suitable memory, relocations must be applied and
memory permission and code cache invalidation (if required) must be completed.

## Object Loading


Once an object image has been obtained, either through code generation or
having been retrieved from an ObjectCache, it is passed to RuntimeDyld to
be loaded.  The RuntimeDyld wrapper class examines the object to determine
its file format and creates an instance of either RuntimeDyldELF or
RuntimeDyldMachO (both of which derive from the RuntimeDyldImpl base
class) and calls the RuntimeDyldImpl::loadObject method to perform that
actual loading.

> 原文 RST 指令（依赖上游工程，未展开）：`.. image:: MCJIT-dyld-load.png`

RuntimeDyldImpl::loadObject begins by creating an ObjectImage instance
from the ObjectBuffer it received.  ObjectImage, which wraps the
ObjectFile class, is a helper class which parses the binary object image
and provides access to the information contained in the format-specific
headers, including section, symbol and relocation information.

RuntimeDyldImpl::loadObject then iterates through the symbols in the
image.  Information about common symbols is collected for later use.  For
each function or data symbol, the associated section is loaded into memory
and the symbol is stored in a symbol table map data structure.  When the
iteration is complete, a section is emitted for the common symbols.

Next, RuntimeDyldImpl::loadObject iterates through the sections in the
object image and for each section iterates through the relocations for
that sections.  For each relocation, it calls the format-specific
processRelocationRef method, which will examine the relocation and store
it in one of two data structures, a section-based relocation list map and
an external symbol relocation map.

> 原文 RST 指令（依赖上游工程，未展开）：`.. image:: MCJIT-load-object.png`

When RuntimeDyldImpl::loadObject returns, all of the code and data
sections for the object will have been loaded into memory allocated by the
memory manager and relocation information will have been prepared, but the
relocations have not yet been applied and the generated code is still not
ready to be executed.

[Currently (as of August 2013) the MCJIT engine will immediately apply
relocations when loadObject completes.  However, this shouldn't be
happening.  Because the code may have been generated for a remote target,
the client should be given a chance to re-map the section addresses before
relocations are applied.  It is possible to apply relocations multiple
times, but in the case where addresses are to be re-mapped, this first
application is wasted effort.]

## Address Remapping


At any time after initial code has been generated and before
finalizeObject is called, the client can remap the address of sections in
the object.  Typically this is done because the code was generated for an
external process and is being mapped into that process' address space.
The client remaps the section address by calling MCJIT::mapSectionAddress.
This should happen before the section memory is copied to its new
location.

When MCJIT::mapSectionAddress is called, MCJIT passes the call on to
RuntimeDyldImpl (via its Dyld member).  RuntimeDyldImpl stores the new
address in an internal data structure but does not update the code at this
time, since other sections are likely to change.

When the client is finished remapping section addresses, it will call
MCJIT::finalizeObject to complete the remapping process.

## Final Preparations


When MCJIT::finalizeObject is called, MCJIT calls
RuntimeDyld::resolveRelocations.  This function will attempt to locate any
external symbols and then apply all relocations for the object.

External symbols are resolved by calling the memory manager's
getPointerToNamedFunction method.  The memory manager will return the
address of the requested symbol in the target address space.  (Note, this
may not be a valid pointer in the host process.)  RuntimeDyld will then
iterate through the list of relocations it has stored which are associated
with this symbol and invoke the resolveRelocation method which, through an
format-specific implementation, will apply the relocation to the loaded
section memory.

Next, RuntimeDyld::resolveRelocations iterates through the list of
sections and for each section iterates through a list of relocations that
have been saved which reference that symbol and call resolveRelocation for
each entry in this list.  The relocation list here is a list of
relocations for which the symbol associated with the relocation is located
in the section associated with the list.  Each of these locations will
have a target location at which the relocation will be applied that is
likely located in a different section.

> 原文 RST 指令（依赖上游工程，未展开）：`.. image:: MCJIT-resolve-relocations.png`

Once relocations have been applied as described above, MCJIT calls
RuntimeDyld::getEHFrameSection, and if a non-zero result is returned
passes the section data to the memory manager's registerEHFrames method.
This allows the memory manager to call any desired target-specific
functions, such as registering the EH frame information with a debugger.

Finally, MCJIT calls the memory manager's finalizeMemory method.  In this
method, the memory manager will invalidate the target code cache, if
necessary, and apply final permissions to the memory pages it has
allocated for code and data memory.

## 来源、版本与核验

- 上游：[llvm/docs/MCJITDesignAndImplementation.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/MCJITDesignAndImplementation.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/llvm/llvm/docs/MCJITDesignAndImplementation.rst`；SHA-256：`11d3d264cb3bcbac6922cc8ea0137fe8eb29264ea663cad489bb4926f40269fa`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
