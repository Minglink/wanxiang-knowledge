---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-llvm-llvm-docs-inalloca",
  "title": "LLVM：栈参数存储",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "InAlloca",
    "llvm"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "a41a6a2662f06b13a70f20283a63684ab9457acbffe914f6ec4d0425aebb1f2c",
  "generatedHash": "7d7c8f76244b8ac1333ca2bb270f73ad8d15bf08db41ed4911d661ce2ed20f21",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "栈参数存储：Design and Usage of the InAlloca Attribute",
  "l1": "The `inalloca <attr_inalloca>` attribute is designed to allow taking the address of an aggregate argument that is being passed by value through memory. Primarily, this feature is required for compatibility with the Microsoft C++ ABI. Under that ABI, class instances that are passed by value are constructed directly into argument stack memory. Prior to the addition of inalloca, calls in LLVM were indivisible instructions. There was no way to perform intermediate work, such as object construction, between the first stack adjustment and the final control transfer. With inalloca, all arguments passed in memory are modelled as a single alloca, which can be stored to prior to the call. Unfortunately, this complicated feature comes with a large set of restrictions designed to bound the lifetime of the argument memory around the call. For now, it ",
  "questions": [
    "InAlloca 如何用于栈参数存储？",
    "InAlloca 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-llvm-llvm-docs-inalloca",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/InAlloca.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# LLVM：栈参数存储

> 本文收录 LLVM 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：栈参数存储。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

Design and Usage of the InAlloca Attribute

## 技术正文

## Design and Usage of the InAlloca Attribute


## Introduction


The `inalloca <attr_inalloca>` attribute is designed to allow
taking the address of an aggregate argument that is being passed by
value through memory.  Primarily, this feature is required for
compatibility with the Microsoft C++ ABI.  Under that ABI, class
instances that are passed by value are constructed directly into
argument stack memory.  Prior to the addition of inalloca, calls in LLVM
were indivisible instructions.  There was no way to perform intermediate
work, such as object construction, between the first stack adjustment
and the final control transfer.  With inalloca, all arguments passed in
memory are modelled as a single alloca, which can be stored to prior to
the call.  Unfortunately, this complicated feature comes with a large
set of restrictions designed to bound the lifetime of the argument
memory around the call.

For now, it is recommended that frontends and optimizers avoid producing
this construct, primarily because it forces the use of a base pointer.
This feature may grow in the future to allow general mid-level
optimization, but for now, it should be regarded as less efficient than
passing by value with a copy.

## Intended Usage


The example below is the intended LLVM IR lowering for some C++ code
that passes two default-constructed `Foo` objects to `g` in the
32-bit Microsoft C++ ABI.

```c++
// Foo is non-trivial.
struct Foo { int a, b; Foo(); ~Foo(); Foo(const Foo &); };
void g(Foo a, Foo b);
void f() {
  g(Foo(), Foo());
}

```

```text
%struct.Foo = type { i32, i32 }
declare void @Foo_ctor(%struct.Foo* %this)
declare void @Foo_dtor(%struct.Foo* %this)
declare void @g(<{ %struct.Foo, %struct.Foo }>* inalloca %memargs)

define void @f() {
entry:
  %base = call i8* @llvm.stacksave()
  %memargs = alloca <{ %struct.Foo, %struct.Foo }>
  %b = getelementptr <{ %struct.Foo, %struct.Foo }>* %memargs, i32 1
  call void @Foo_ctor(%struct.Foo* %b)

  ; If a's ctor throws, we must destruct b.
  %a = getelementptr <{ %struct.Foo, %struct.Foo }>* %memargs, i32 0
  invoke void @Foo_ctor(%struct.Foo* %a)
      to label %invoke.cont unwind %invoke.unwind

invoke.cont:
  call void @g(<{ %struct.Foo, %struct.Foo }>* inalloca %memargs)
  call void @llvm.stackrestore(i8* %base)
  ...

invoke.unwind:
  call void @Foo_dtor(%struct.Foo* %b)
  call void @llvm.stackrestore(i8* %base)
  ...
}

```

To avoid stack leaks, the frontend saves the current stack pointer with
a call to `llvm.stacksave <int_stacksave>`.  Then, it allocates the
argument stack space with alloca and calls the default constructor.  The
default constructor could throw an exception, so the frontend has to
create a landing pad.  The frontend has to destroy the already
constructed argument `b` before restoring the stack pointer.  If the
constructor does not unwind, `g` is called.  In the Microsoft C++ ABI,
`g` will destroy its arguments, and then the stack is restored in
`f`.

## Design Considerations


### Lifetime


The biggest design consideration for this feature is object lifetime.
We cannot model the arguments as static allocas in the entry block,
because all calls need to use the memory at the top of the stack to pass
arguments.  We cannot vend pointers to that memory at function entry
because after code generation they will alias.

The rule against allocas between argument allocations and the call site
avoids this problem, but it creates a cleanup problem.  Cleanup and
lifetime is handled explicitly with stack save and restore calls.  In
the future, we may want to introduce a new construct such as `freea`
or `afree` to make it clear that this stack adjusting cleanup is less
powerful than a full stack save and restore.

### Nested Calls and Copy Elision


We also want to be able to support copy elision into these argument
slots.  This means we have to support multiple live argument
allocations.

Consider the evaluation of:

```c++
// Foo is non-trivial.
struct Foo { int a; Foo(); Foo(const &Foo); ~Foo(); };
Foo bar(Foo b);
int main() {
  bar(bar(Foo()));
}

```

In this case, we want to be able to elide copies into `bar`'s argument
slots.  That means we need to have more than one set of argument frames
active at the same time.  First, we need to allocate the frame for the
outer call so we can pass it in as the hidden struct return pointer to
the middle call.  Then we do the same for the middle call, allocating a
frame and passing its address to `Foo`'s default constructor.  By
wrapping the evaluation of the inner `bar` with stack save and
restore, we can have multiple overlapping active call frames.

### Callee-cleanup Calling Conventions


Another wrinkle is the existence of callee-cleanup conventions.  On
Windows, all methods and many other functions adjust the stack to clear
the memory used to pass their arguments.  In some sense, this means that
the allocas are automatically cleared by the call.  However, LLVM
instead models this as a write of undef to all of the inalloca values
passed to the call instead of a stack adjustment.  Frontends should
still restore the stack pointer to avoid a stack leak.

### Exceptions


There is also the possibility of an exception.  If argument evaluation
or copy construction throws an exception, the landing pad must do
cleanup, which includes adjusting the stack pointer to avoid a stack
leak.  This means the cleanup of the stack memory cannot be tied to the
call itself.  There needs to be a separate IR-level instruction that can
perform independent cleanup of arguments.

### Efficiency


Eventually, it should be possible to generate efficient code for this
construct.  In particular, using inalloca should not require a base
pointer.  If the backend can prove that all points in the CFG only have
one possible stack level, then it can address the stack directly from
the stack pointer.  While this is not yet implemented, the plan is that
the inalloca attribute should not change much, but the frontend IR
generation recommendations may change.

## 来源、版本与核验

- 上游：[llvm/docs/InAlloca.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/InAlloca.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/llvm/llvm/docs/InAlloca.rst`；SHA-256：`a41a6a2662f06b13a70f20283a63684ab9457acbffe914f6ec4d0425aebb1f2c`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
