---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-llvm-llvm-docs-writinganllvmnewpmpass",
  "title": "LLVM：Writing an LLVM Pass",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "WritingAnLLVMNewPMPass",
    "llvm"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "0159bda01894c0fef26b5713decc2a17ab9bfcc7a4b48ff43fdcbf53d8598476",
  "generatedHash": "1670892254398c7e9359284f2abe49a3ca270313d03860aac6386f07925eb71d",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Writing an LLVM Pass：Writing an LLVM Pass",
  "l1": ".. program:: opt .. contents:: :local: .. warning:: This document deals with the new pass manager. LLVM uses the legacy pass manager for the codegen pipeline. For more details, see `WritingAnLLVMPass` and `NewPassManager`. The LLVM pass framework is an important part of the LLVM system, because LLVM passes are where most of the interesting parts of the compiler exist. Passes perform the transformations and optimizations that make up the compiler, they build the analysis results that are used by these transformations, and they are, above all, a structuring technique for compiler code. Unlike passes under the legacy pass manager where the pass interface is defined via inheritance, passes under the new pass manager rely on concept-based polymorphism, meaning there is no explicit interface (see comments in `PassManager.h` for more details). A",
  "questions": [
    "WritingAnLLVMNewPMPass 如何用于Writing an LLVM Pass？",
    "WritingAnLLVMNewPMPass 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-llvm-llvm-docs-writinganllvmnewpmpass",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/WritingAnLLVMNewPMPass.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# LLVM：Writing an LLVM Pass

> 本文收录 LLVM 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：Writing an LLVM Pass。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

Writing an LLVM Pass

## 技术正文

## Writing an LLVM Pass


.. program:: opt

.. contents::
    :local:

## Introduction --- What is a pass?


.. warning::
  This document deals with the new pass manager. LLVM uses the legacy pass
  manager for the codegen pipeline. For more details, see
  `WritingAnLLVMPass` and `NewPassManager`.

The LLVM pass framework is an important part of the LLVM system, because LLVM
passes are where most of the interesting parts of the compiler exist. Passes
perform the transformations and optimizations that make up the compiler, they
build the analysis results that are used by these transformations, and they
are, above all, a structuring technique for compiler code.

Unlike passes under the legacy pass manager where the pass interface is
defined via inheritance, passes under the new pass manager rely on
concept-based polymorphism, meaning there is no explicit interface (see
comments in `PassManager.h` for more details). All LLVM passes inherit from
the CRTP mix-in `PassInfoMixin<PassT>`. The pass should have a `run()`
method which returns a `PreservedAnalyses` and takes in some unit of IR
along with an analysis manager. For example, a function pass would have a
`PreservedAnalyses run(Function &F, FunctionAnalysisManager &AM);` method.

We start by showing you how to construct a pass, from setting up the build,
creating the pass, to executing and testing it. Looking at existing passes is
always a great way to learn details.

## Quick Start --- Writing hello world


Here we describe how to write the "hello world" of passes. The "HelloWorld"
pass is designed to simply print out the name of non-external functions that
exist in the program being compiled. It does not modify the program at all,
it just inspects it.

The code below already exists; feel free to create a pass with a different
name alongside the HelloWorld source files.


### Setting up the build


First, configure and build LLVM as described in `GettingStarted`.

Next, we will reuse an existing directory (creating a new directory involves
messing around with more CMake files than we want). For this example, we'll use
`llvm/lib/Transforms/Utils/HelloWorld.cpp`, which has already been created.
If you'd like to create your own pass, add a new source file into
`llvm/lib/Transforms/Utils/CMakeLists.txt` (assuming you want your pass in
the `Transforms/Utils` directory.

Now that we have the build set up for a new pass, we need to write the code
for the pass itself.


### Basic code required


Now that the build is setup for a new pass, we just have to write it.

First we need to define the pass in a header file. We'll create
`llvm/include/llvm/Transforms/Utils/HelloWorld.h`. The file should
contain the following boilerplate:

```c++
#ifndef LLVM_TRANSFORMS_HELLONEW_HELLOWORLD_H
#define LLVM_TRANSFORMS_HELLONEW_HELLOWORLD_H

#include "llvm/IR/PassManager.h"

namespace llvm {

class HelloWorldPass : public PassInfoMixin<HelloWorldPass> {
public:
  PreservedAnalyses run(Function &F, FunctionAnalysisManager &AM);
};

} // namespace llvm

#endif // LLVM_TRANSFORMS_HELLONEW_HELLOWORLD_H

```

This creates the class for the pass with a declaration of the `run()`
method which actually runs the pass. Inheriting from `PassInfoMixin<PassT>`
sets up some more boilerplate so that we don't have to write it ourselves.

Our class is in the `llvm` namespace so that we don't pollute the global
namespace.

Next we'll create `llvm/lib/Transforms/Utils/HelloWorld.cpp`, starting
with

```c++
#include "llvm/Transforms/Utils/HelloWorld.h"

```

... to include the header file we just created.

```c++
using namespace llvm;

```

... is required because the functions from the include files live in the llvm
namespace. This should only be done in non-header files.

Next we have the pass's `run()` definition:

```c++
PreservedAnalyses HelloWorldPass::run(Function &F,
                                      FunctionAnalysisManager &AM) {
  errs() << F.getName() << "\n";
  return PreservedAnalyses::all();
}

```

... which simply prints out the name of the function to stderr. The pass
manager will ensure that the pass will be run on every function in a module.
The `PreservedAnalyses` return value says that all analyses (e.g. dominator
tree) are still valid after this pass since we didn't modify any functions.

That's it for the pass itself. Now in order to "register" the pass, we need
to add it to a couple places. Add the following to
`llvm/lib/Passes/PassRegistry.def` in the `FUNCTION_PASS` section

```c++
FUNCTION_PASS("helloworld", HelloWorldPass())

```

... which adds the pass under the name "helloworld".

`llvm/lib/Passes/PassRegistry.def` is #include'd into
`llvm/lib/Passes/PassBuilder.cpp` multiple times for various reasons. Since
it constructs our pass, we need to also add the proper #include in
`llvm/lib/Passes/PassBuilder.cpp`:

```c++
#include "llvm/Transforms/Utils/HelloWorld.h"

```

This should be all the code necessary for our pass, now it's time to compile
and run it.

### Running a pass with ``opt``


Now that you have a brand new shiny pass, we can build `opt` and use
it to run some LLVM IR through the pass.

```console
$ ninja -C build/ opt
# or whatever build system/build directory you are using

$ cat /tmp/a.ll
define i32 @foo() {
  %a = add i32 2, 3
  ret i32 %a
}

define void @bar() {
  ret void
}

$ build/bin/opt -disable-output /tmp/a.ll -passes=helloworld
foo
bar

```

Our pass ran and printed the names of functions as expected!

### Testing a pass


Testing our pass is important to prevent future regressions. We'll add a lit
test at `llvm/test/Transforms/Utils/helloworld.ll`. See
`TestingGuide` for more information on testing.

```llvm
$ cat llvm/test/Transforms/Utils/helloworld.ll
; RUN: opt -disable-output -passes=helloworld %s 2>&1 | FileCheck %s

; CHECK: {{^}}foo{{$}}
define i32 @foo() {
  %a = add i32 2, 3
  ret i32 %a
}

; CHECK-NEXT: {{^}}bar{{$}}
define void @bar() {
  ret void
}

$ ninja -C build check-llvm
# runs our new test alongside all other llvm lit tests

```

## FAQs


### Required passes


A pass that defines a static `isRequired()` method that returns true is a required pass. For example:

```c++
class HelloWorldPass : public PassInfoMixin<HelloWorldPass> {
public:
  PreservedAnalyses run(Function &F, FunctionAnalysisManager &AM);

  static bool isRequired() { return true; }
};

```

A required pass is a pass that may not be skipped. An example of a required
pass is `AlwaysInlinerPass`, which must always be run to preserve
`alwaysinline` semantics. Pass managers are required since they may contain
other required passes.

An example of how a pass can be skipped is the `optnone` function
attribute, which specifies that optimizations should not be run on the
function. Required passes will still be run on `optnone` functions.

For more implementation details, see
`PassInstrumentation::runBeforePass()`.

### Registering passes as plugins


LLVM provides a mechanism to register pass plugins within various tools like
`clang` or `opt`. A pass plugin can add passes to default optimization
pipelines or to be manually run via tools like `opt`.  For more information,
see `NewPassManager`.

Create a CMake project at the root of the repo alongside
other projects.  This project must contain the following minimal
`CMakeLists.txt`:

```cmake
add_llvm_pass_plugin(MyPassName source.cpp)

```

See the definition of `add_llvm_pass_plugin` for more CMake details.

The pass must provide at least one of two entry points for the new pass manager,
one for static registration and one for dynamically loaded plugins:

- `llvm::PassPluginLibraryInfo get##Name##PluginInfo();`
- `extern "C" ::llvm::PassPluginLibraryInfo llvmGetPassPluginInfo() LLVM_ATTRIBUTE_WEAK;`

Pass plugins are compiled and linked dynamically by default. Setting
`LLVM_${NAME}_LINK_INTO_TOOLS` to `ON` turns the project into a statically
linked extension.

For an in-tree example, see `llvm/examples/Bye/`.

To make `PassBuilder` aware of statically linked pass plugins:

```c++
// Declare plugin extension function declarations.
#define HANDLE_EXTENSION(Ext) llvm::PassPluginLibraryInfo get##Ext##PluginInfo();
#include "llvm/Support/Extension.def"

...

// Register plugin extensions in PassBuilder.
#define HANDLE_EXTENSION(Ext) get##Ext##PluginInfo().RegisterPassBuilderCallbacks(PB);
#include "llvm/Support/Extension.def"

```

To make `PassBuilder` aware of dynamically linked pass plugins:

```c++
// Load plugin dynamically.
auto Plugin = PassPlugin::Load(PathToPlugin);
if (!Plugin)
  report_error();
// Register plugin extensions in PassBuilder.
Plugin.registerPassBuilderCallbacks(PB);
```

## 来源、版本与核验

- 上游：[llvm/docs/WritingAnLLVMNewPMPass.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/WritingAnLLVMNewPMPass.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/llvm/llvm/docs/WritingAnLLVMNewPMPass.rst`；SHA-256：`0159bda01894c0fef26b5713decc2a17ab9bfcc7a4b48ff43fdcbf53d8598476`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
