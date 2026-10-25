---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-clang-clang-docs-clanglinkerwrapper",
  "title": "CLANG：Clang Linker Wrapper",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "ClangLinkerWrapper",
    "clang"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "49a547f10d561c7f0aa9bad79b1d74be9dfdb09ce48252d6cbbc6e67978f82cc",
  "generatedHash": "efff3d305e808337370dd5b022c9a71637bab874ab618e755e96edb3f312fa97",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Clang Linker Wrapper：Clang Linker Wrapper",
  "l1": ".. contents:: :local: This tool works as a wrapper of the normal host linking job. This tool is used to create linked device images for offloading and the necessary runtime calls to register them. It works by first scanning the linker's input for embedded device offloading data stored at the `.llvm.offloading` section. This section contains binary data created by the `ClangOffloadPackager`. The extracted device files will then be linked. The linked modules will then be wrapped into a new object file containing the code necessary to register it with the offloading runtime. This tool can be used with the following options. Any arguments not intended only for the linker wrapper will be forwarded to the wrapped linker job. ```console USAGE: clang-linker-wrapper [options] -- <options to passed to the linker> OPTIONS: --cuda-path=<dir> Set the ",
  "questions": [
    "ClangLinkerWrapper 如何用于Clang Linker Wrapper？",
    "ClangLinkerWrapper 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-clang-clang-docs-clanglinkerwrapper",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/clang/docs/ClangLinkerWrapper.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# CLANG：Clang Linker Wrapper

> 本文收录 CLANG 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：Clang Linker Wrapper。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

Clang Linker Wrapper

## 技术正文

## Clang Linker Wrapper


.. contents::
   :local:


## Introduction


This tool works as a wrapper of the normal host linking job. This tool is used
to create linked device images for offloading and the necessary runtime calls to
register them. It works by first scanning the linker's input for embedded device
offloading data stored at the `.llvm.offloading` section. This section
contains binary data created by the `ClangOffloadPackager`. The extracted
device files will then be linked. The linked modules will then be wrapped into a
new object file containing the code necessary to register it with the offloading
runtime.

## Usage


This tool can be used with the following options. Any arguments not intended
only for the linker wrapper will be forwarded to the wrapped linker job.

```console
USAGE: clang-linker-wrapper [options] -- <options to passed to the linker>

OPTIONS:
  --cuda-path=<dir>      Set the system CUDA path
  --device-debug         Use debugging
  --device-linker=<value> or <triple>=<value>
                         Arguments to pass to the device linker invocation
  --dry-run              Print program arguments without running
  --help-hidden          Display all available options
  --help                 Display available options (--help-hidden for more)
  --host-triple=<triple> Triple to use for the host compilation
  --linker-path=<path>   The linker executable to invoke
  -L <dir>               Add <dir> to the library search path
  -l <libname>           Search for library <libname>
  --opt-level=<O0, O1, O2, or O3>
                         Optimization level for LTO
  --override-image=<kind=file>
                          Uses the provided file as if it were the output of the device link step
  -o <path>              Path to file to write output
  --pass-remarks-analysis=<value>
                         Pass remarks for LTO
  --pass-remarks-missed=<value>
                         Pass remarks for LTO
  --pass-remarks=<value> Pass remarks for LTO
  --print-wrapped-module Print the wrapped module's IR for testing
  --ptxas-arg=<value>    Argument to pass to the 'ptxas' invocation
  --relocatable           Link device code to create a relocatable offloading application
  --save-temps           Save intermediate results
  --sysroot<value>       Set the system root
  --verbose              Verbose output from tools
  --v                    Display the version number and exit
  --                     The separator for the wrapped linker arguments

```

## Relocatable Linking


The `clang-linker-wrapper` handles linking embedded device code and then
registering it with the appropriate runtime. Normally, this is only done when
the executable is created so other files containing device code can be linked
together. This can be somewhat problematic for users who wish to ship static
libraries that contain offloading code to users without a compatible offloading
toolchain.

When using a relocatable link with `-r`, the `clang-linker-wrapper` will
perform the device linking and registration eagerly. This will remove the
embedded device code and register it correctly with the runtime. Semantically,
this is similar to creating a shared library object. If standard relocatable
linking is desired, simply do not run the binaries through the
`clang-linker-wrapper`. This will simply append the embedded device code so
that it can be linked later.

## Matching


The linker wrapper will link extracted device code that is compatible with each
other. Generally, this requires that the target triple and architecture match.
An exception is made when the architecture is listed as `generic`, which will
cause it be linked with any other device code with the same target triple.

## Debugging


The linker wrapper performs a lot of steps internally, such as input matching,
symbol resolution, and image registration. This makes it difficult to debug in
some scenarios. The behavior of the linker-wrapper is controlled mostly through
metadata, described in `clang documentation
<https://clang.llvm.org/docs/OffloadingDesign.html>`_. Intermediate output can
be obtained from the linker-wrapper using the `--save-temps` flag. These files
can then be modified.

```sh
$> clang openmp.c -fopenmp --offload-arch=gfx90a -c
$> clang openmp.o -fopenmp --offload-arch=gfx90a -Wl,--save-temps
$> ; Modify temp files.
$> llvm-objcopy --update-section=.llvm.offloading=out.bc openmp.o

```

Doing this will allow you to override one of the input files by replacing its
embedded offloading metadata with a user-modified version. However, this will be
more difficult when there are multiple input files. For a very large hammer, the
`--override-image=<kind>=<file>` flag can be used.

In the following example, we use the `--save-temps` to obtain the LLVM-IR just
before running the backend. We then modify it to test altered behavior, and then
compile it to a binary. This can then be passed to the linker-wrapper which will
then ignore all embedded metadata and use the provided image as if it were the
result of the device linking phase.

```sh
$> clang openmp.c -fopenmp --offload-arch=gfx90a -Wl,--save-temps
$> ; Modify temp files.
$> clang --target=amdgcn-amd-amdhsa -mcpu=gfx90a -nogpulib out.bc -o a.out
$> clang openmp.c -fopenmp --offload-arch=gfx90a -Wl,--override-image=openmp=a.out

```

## Example


This tool links object files with offloading images embedded within it using the
`-fembed-offload-object` flag in Clang. Given an input file containing the
magic section we can pass it to this tool to extract the data contained at that
section and run a device linking job on it.

```console
clang-linker-wrapper --host-triple=x86_64 --linker-path=/usr/bin/ld -- <Args>
```

## 来源、版本与核验

- 上游：[clang/docs/ClangLinkerWrapper.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/clang/docs/ClangLinkerWrapper.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/clang/clang/docs/ClangLinkerWrapper.rst`；SHA-256：`49a547f10d561c7f0aa9bad79b1d74be9dfdb09ce48252d6cbbc6e67978f82cc`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
