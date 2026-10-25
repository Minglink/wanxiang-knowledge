---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-llvm-llvm-docs-howtocrosscompilellvm",
  "title": "LLVM：How To Cross-Compile Clang/LLVM using Clang/LLVM",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "HowToCrossCompileLLVM",
    "llvm"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "3d342e79f7bc50158c97bd2d2e3f0111633ba9281e2c7e9550f66df16c29c7de",
  "generatedHash": "66720042ab7d47dcde893b12be5d8df5364636f70538e9984ae10ad47e69c1b4",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "How To Cross-Compile Clang/LLVM using Clang/LLVM：How To Cross-Compile Clang/LLVM using Clang/LLVM",
  "l1": "This document contains information about building LLVM and Clang on host machine, targeting another platform. For more information on how to use Clang as a cross-compiler, please check https://clang.llvm.org/docs/CrossCompilation.html. TODO: Add MIPS and other platforms to this document. In this use case, we'll be using CMake and Ninja, on a Debian-based Linux system, cross-compiling from an x86_64 host (most Intel and AMD chips nowadays) to a hard-float ARM target (most ARM targets nowadays). The packages you'll need are: * `cmake` * `ninja-build` (from backports in Ubuntu) * `gcc-4.7-arm-linux-gnueabihf` * `gcc-4.7-multilib-arm-linux-gnueabihf` * `binutils-arm-linux-gnueabihf` * `libgcc1-armhf-cross` * `libsfgcc1-armhf-cross` * `libstdc++6-armhf-cross` * `libstdc++6-4.7-dev-armhf-cross` For more information on how to configure CMake for",
  "questions": [
    "HowToCrossCompileLLVM 如何用于How To Cross-Compile Clang/LLVM using Clang/LLVM？",
    "HowToCrossCompileLLVM 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-llvm-llvm-docs-howtocrosscompilellvm",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/HowToCrossCompileLLVM.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# LLVM：How To Cross-Compile Clang/LLVM using Clang/LLVM

> 本文收录 LLVM 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：How To Cross-Compile Clang/LLVM using Clang/LLVM。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

How To Cross-Compile Clang/LLVM using Clang/LLVM

## 技术正文

## How To Cross-Compile Clang/LLVM using Clang/LLVM


## Introduction


This document contains information about building LLVM and
Clang on host machine, targeting another platform.

For more information on how to use Clang as a cross-compiler,
please check https://clang.llvm.org/docs/CrossCompilation.html.

TODO: Add MIPS and other platforms to this document.

## Cross-Compiling from x86_64 to ARM


In this use case, we'll be using CMake and Ninja, on a Debian-based Linux
system, cross-compiling from an x86_64 host (most Intel and AMD chips
nowadays) to a hard-float ARM target (most ARM targets nowadays).

The packages you'll need are:

 * `cmake`
 * `ninja-build` (from backports in Ubuntu)
 * `gcc-4.7-arm-linux-gnueabihf`
 * `gcc-4.7-multilib-arm-linux-gnueabihf`
 * `binutils-arm-linux-gnueabihf`
 * `libgcc1-armhf-cross`
 * `libsfgcc1-armhf-cross`
 * `libstdc++6-armhf-cross`
 * `libstdc++6-4.7-dev-armhf-cross`

### Configuring CMake


For more information on how to configure CMake for LLVM/Clang,
see `CMake`.

The CMake options you need to add are:

 * `-DCMAKE_SYSTEM_NAME=<target-system>`
 * `-DCMAKE_INSTALL_PREFIX=<install-dir>`
 * `-DLLVM_HOST_TRIPLE=arm-linux-gnueabihf`
 * `-DLLVM_TARGETS_TO_BUILD=ARM`

Note: `CMAKE_CROSSCOMPILING` is always set automatically when `CMAKE_SYSTEM_NAME` is set. Don't put `-DCMAKE_CROSSCOMPILING=TRUE` in your options.

Also note that `LLVM_HOST_TRIPLE` specifies the triple of the system
that the cross built LLVM is going to run on - the flag is named based
on the autoconf build/host/target nomenclature. (This flag implicitly sets
other defaults, such as `LLVM_DEFAULT_TARGET_TRIPLE`.)

If you're compiling with GCC, you can use architecture options for your target,
and the compiler driver will detect everything that it needs:

 * `-DCMAKE_CXX_FLAGS='-march=armv7-a -mcpu=cortex-a9 -mfloat-abi=hard'`

However, if you're using Clang, the driver might not be up-to-date with your
specific Linux distribution, version or GCC layout, so you'll need to fudge.

In addition to the ones above, you'll also need:

 * `--target=arm-linux-gnueabihf` or whatever is the triple of your cross GCC.
 * `'--sysroot=/usr/arm-linux-gnueabihf'`, `'--sysroot=/opt/gcc/arm-linux-gnueabihf'`
   or whatever is the location of your GCC's sysroot (where /lib, /bin etc are).
 * Appropriate use of `-I` and `-L`, depending on how the cross GCC is installed,
   and where are the libraries and headers.

You may also want to set the `LLVM_NATIVE_TOOL_DIR` option - pointing
at a directory with prebuilt LLVM tools (`llvm-tblgen`, `clang-tblgen`
etc) for the build host, allowing you to them reuse them if available.
E.g. `-DLLVM_NATIVE_TOOL_DIR=<path-to-native-llvm-build>/bin`.
If the option isn't set (or the directory doesn't contain all needed tools),
the LLVM cross build will automatically launch a nested build to build the
tools that are required.

The CXX flags define the target, cpu (which in this case
defaults to `fpu=VFP3` with NEON), and forcing the hard-float ABI. If you're
using Clang as a cross-compiler, you will *also* have to set `--sysroot`
to make sure it picks the correct linker.

When using Clang, it's important that you choose the triple to be *identical*
to the GCC triple and the sysroot. This will make it easier for Clang to
find the correct tools and include headers. But that won't mean all headers and
libraries will be found. You'll still need to use `-I` and `-L` to locate
those extra ones, depending on your distribution.

Most of the time, what you want is to have a native compiler to the
platform itself, but not others. So there's rarely a point in compiling
all back-ends. For that reason, you should also set the
`TARGETS_TO_BUILD` to only build the back-end you're targeting to.

You must set the `CMAKE_INSTALL_PREFIX`, otherwise a `ninja install`
will copy ARM binaries to your root filesystem, which is not what you
want.

### Hacks


There are some bugs in current LLVM, which require some fiddling before
running CMake:

#. If you're using Clang as the cross-compiler, there is a problem in
   the LLVM ARM back-end that is producing absolute relocations on
   position-independent code (`R_ARM_THM_MOVW_ABS_NC`), so for now, you
   should disable PIC:

```bash
-DLLVM_ENABLE_PIC=False

```

   This is not a problem, since Clang/LLVM libraries are statically
   linked anyway, it shouldn't affect much.

#. The ARM libraries won't be installed in your system.
   But the CMake prepare step, which checks for
   dependencies, will check the *host* libraries, not the *target*
   ones. Below there's a list of some dependencies, but your project could
   have more, or this document could be outdated. You'll see the errors
   while linking as an indication of that.

   Debian based distros have a way to add `multiarch`, which adds
   a new architecture and allows you to install packages for those
   systems. See https://wiki.debian.org/Multiarch/HOWTO for more info.

   But not all distros will have that, and possibly not an easy way to
   install them in any anyway, so you'll have to build/download
   them separately.

   A quick way of getting the libraries is to download them from
   a distribution repository, like Debian (http://packages.debian.org/jessie/),
   and download the missing libraries. Note that the `libXXX`
   will have the shared objects (`.so`) and the `libXXX-dev` will
   give you the headers and the static (`.a`) library. Just in
   case, download both.

   The ones you need for ARM are: `libtinfo`, `zlib1g`,
   `libxml2` and `liblzma`. In the Debian repository you'll
   find downloads for all architectures.

   After you download and unpack all `.deb` packages, copy all
   `.so` and `.a` to a directory, make the appropriate
   symbolic links (if necessary), and add the relevant `-L`
   and `-I` paths to `-DCMAKE_CXX_FLAGS` above.


### Running CMake and Building


Finally, if you're using your platform compiler, run:

```bash
$ cmake -G Ninja <source-dir> -DCMAKE_BUILD_TYPE=<type> <options above>

```

If you're using Clang as the cross-compiler, run:

```bash
$ CC='clang' CXX='clang++' cmake -G Ninja <source-dir> -DCMAKE_BUILD_TYPE=<type> <options above>

```

If you have `clang`/`clang++` on the path, it should just work, and special
Ninja files will be created in the build directory. I strongly suggest
you to run `cmake` on a separate build directory, *not* inside the
source tree.

To build, simply type:

```bash
$ ninja

```

It should automatically find out how many cores you have, what are
the rules that needs building and will build the whole thing.

You can't run `ninja check-all` on this tree because the created
binaries are targeted to ARM, not x86_64.

### Installing and Using


After the LLVM/Clang has built successfully, you should install it
via:

```bash
$ ninja install

```

which will create a sysroot on the install-dir. You can then tar
that directory into a binary with the full triple name (for easy
identification), like:

```bash
$ ln -sf <install-dir> arm-linux-gnueabihf-clang
$ tar zchf arm-linux-gnueabihf-clang.tar.gz arm-linux-gnueabihf-clang

```

If you copy that tarball to your target board, you'll be able to use
it for running the test-suite, for example. Follow the guidelines at
https://llvm.org/docs/lnt/quickstart.html, unpack the tarball in the
test directory, and use options:

```bash
$ ./sandbox/bin/python sandbox/bin/lnt runtest nt \
    --sandbox sandbox \
    --test-suite `pwd`/test-suite \
    --cc `pwd`/arm-linux-gnueabihf-clang/bin/clang \
    --cxx `pwd`/arm-linux-gnueabihf-clang/bin/clang++

```

Remember to add the `-jN` options to `lnt` to the number of CPUs
on your board. Also, the path to your clang has to be absolute, so
you'll need the `pwd` trick above.

## 来源、版本与核验

- 上游：[llvm/docs/HowToCrossCompileLLVM.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/HowToCrossCompileLLVM.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/llvm/llvm/docs/HowToCrossCompileLLVM.rst`；SHA-256：`3d342e79f7bc50158c97bd2d2e3f0111633ba9281e2c7e9550f66df16c29c7de`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
