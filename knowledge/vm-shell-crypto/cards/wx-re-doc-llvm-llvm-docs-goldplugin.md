---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-llvm-llvm-docs-goldplugin",
  "title": "LLVM：The LLVM gold plugin",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "GoldPlugin",
    "llvm"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "901e9ae974fa2628aacd99a12dc4745586daffa55ca85f8abdc2c2bf1aa96854",
  "generatedHash": "d2798a3b13269a68147415ce1147e31e6cdd7057ddefbd511c199df9164de0dc",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "The LLVM gold plugin：The LLVM gold plugin",
  "l1": "Building with link time optimization requires cooperation from the system linker. LTO support on Linux systems is available via the `gold linker`_ which supports LTO via plugins. This is the same mechanism used by the `GCC LTO`_ project. The LLVM gold plugin implements the gold plugin interface on top of `libLTO`. The same plugin can also be used by other tools such as `ar` and `nm`. Note that ld.bfd from binutils version 2.21.51.0.2 and above also supports LTO via plugins. However, usage of the LLVM gold plugin with ld.bfd is not tested and therefore not officially supported or recommended. As of LLVM 15, the gold plugin will ignore bitcode from the `.llvmbc` section inside of ELF object files. However, LTO with bitcode files is still supported. .. _`gold linker`: http://sourceware.org/binutils .. _`GCC LTO`: http://gcc.gnu.org/wiki/Link",
  "questions": [
    "GoldPlugin 如何用于The LLVM gold plugin？",
    "GoldPlugin 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-llvm-llvm-docs-goldplugin",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/GoldPlugin.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# LLVM：The LLVM gold plugin

> 本文收录 LLVM 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：The LLVM gold plugin。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

The LLVM gold plugin

## 技术正文

## The LLVM gold plugin


## Introduction


Building with link time optimization requires cooperation from
the system linker. LTO support on Linux systems is available via the
`gold linker`_ which supports LTO via plugins. This is the same mechanism
used by the `GCC LTO`_ project.

The LLVM gold plugin implements the gold plugin interface on top of
`libLTO`.  The same plugin can also be used by other tools such as
`ar` and `nm`.  Note that ld.bfd from binutils version 2.21.51.0.2
and above also supports LTO via plugins.  However, usage of the LLVM
gold plugin with ld.bfd is not tested and therefore not officially
supported or recommended.

As of LLVM 15, the gold plugin will ignore bitcode from the `.llvmbc`
section inside of ELF object files.  However, LTO with bitcode files
is still supported.

.. _`gold linker`: http://sourceware.org/binutils
.. _`GCC LTO`: http://gcc.gnu.org/wiki/LinkTimeOptimization
.. _`gold plugin interface`: http://gcc.gnu.org/wiki/whopr/driver


## How to build it


You need to have gold with plugin support and build the LLVMgold plugin.
The gold linker is installed as ld.gold. To see whether gold is the default
on your system, run `/usr/bin/ld -v`. It will report "GNU
gold" or else "GNU ld" if not. If gold is already installed at
`/usr/bin/ld.gold`, one option is to simply make that the default by
backing up your existing `/usr/bin/ld` and creating a symbolic link
with `ln -s /usr/bin/ld.gold /usr/bin/ld`. Alternatively, you can build
with clang's `-fuse-ld=gold` or add `-fuse-ld=gold` to LDFLAGS, which will
cause the clang driver to invoke `/usr/bin/ld.gold` directly.

If you have gold installed, check for plugin support by running
`/usr/bin/ld.gold -plugin`. If it complains "missing argument" then
you have plugin support. If not, and you get an error such as "unknown option",
then you will either need to build gold or install a version with plugin
support.

* Download, configure and build gold with plugin support:

```bash
$ git clone --depth 1 git://sourceware.org/git/binutils-gdb.git binutils
$ mkdir build
$ cd build
$ ../binutils/configure --enable-gold --enable-plugins --disable-werror
$ make all-gold

```

  That should leave you with `build/gold/ld-new` which supports
  the `-plugin` option. Running `make` will additionally build
  `build/binutils/ar` and `nm-new` binaries supporting plugins.

  Once you're ready to switch to using gold, backup your existing
  `/usr/bin/ld` then replace it with `ld-new`. Alternatively, install
  in `/usr/bin/ld.gold` and use `-fuse-ld=gold` as described earlier.

  Optionally, add `--enable-gold=default` to the above configure invocation
  to automatically install the newly built gold as the default linker with
  `make install`.

* Build the LLVMgold plugin. Run CMake with
  `-DLLVM_BINUTILS_INCDIR=/path/to/binutils/include`.  The correct include
  path will contain the file `plugin-api.h`.

## Usage


You should produce bitcode files from `clang` with the option
`-flto`. This flag will also cause `clang` to look for the gold plugin in
the `lib` directory under its prefix and pass the `-plugin` option to
`ld`. It will not look for an alternate linker without `-fuse-ld=gold`,
which is why you otherwise need gold to be the installed system linker in
your path.

`ar` and `nm` also accept the `-plugin` option and it's possible to
to install `LLVMgold.so` to `/usr/lib/bfd-plugins` for a seamless setup.
If you built your own gold, be sure to install the `ar` and `nm-new` you
built to `/usr/bin`.


### Example of link time optimization


The following example shows a worked example of the gold plugin mixing LLVM
bitcode and native code.

```c
--- a.c ---
#include <stdio.h>

extern void foo1(void);
extern void foo4(void);

void foo2(void) {
  printf("Foo2\n");
}

void foo3(void) {
  foo4();
}

int main(void) {
  foo1();
}

--- b.c ---
#include <stdio.h>

extern void foo2(void);

void foo1(void) {
  foo2();
}

void foo4(void) {
  printf("Foo4");
}

```

```bash
--- command lines ---
$ clang -flto a.c -c -o a.o      # <-- a.o is LLVM bitcode file
$ ar q a.a a.o                   # <-- a.a is an archive with LLVM bitcode
$ clang b.c -c -o b.o            # <-- b.o is native object file
$ clang -flto a.a b.o -o main    # <-- link with LLVMgold plugin

```

Gold informs the plugin that foo3 is never referenced outside the IR,
leading LLVM to delete that function. However, unlike in the :ref:`libLTO
example <libLTO-example>` gold does not currently eliminate foo4.

## Quickstart for using LTO with autotooled projects


Once your system `ld`, `ar`, and `nm` all support LLVM bitcode,
everything is in place for an easy to use LTO build of autotooled projects:

* Follow the instructions :ref:`on how to build LLVMgold.so
  <lto-how-to-build>`.

* Install the newly built binutils to `$PREFIX`

* Copy `Release/lib/LLVMgold.so` to `$PREFIX/lib/bfd-plugins/`

* Set environment variables (`$PREFIX` is where you installed clang and
  binutils):

```bash
export CC="$PREFIX/bin/clang -flto"
export CXX="$PREFIX/bin/clang++ -flto"
export AR="$PREFIX/bin/ar"
export NM="$PREFIX/bin/nm"
export RANLIB=/bin/true #ranlib is not needed, and doesn't support .bc files in .a

```

* Or you can just set your path:

```bash
export PATH="$PREFIX/bin:$PATH"
export CC="clang -flto"
export CXX="clang++ -flto"
export RANLIB=/bin/true
```

* Configure and build the project as usual:

```bash
% ./configure && make && make check

```

The environment variable settings may work for non-autotooled projects too,
but you may need to set the `LD` environment variable as well.

## Licensing


Gold is licensed under the GPLv3. LLVMgold uses the interface file
`plugin-api.h` from gold which means that the resulting `LLVMgold.so`
binary is also GPLv3. This can still be used to link non-GPLv3 programs
just as much as gold could without the plugin.

## 来源、版本与核验

- 上游：[llvm/docs/GoldPlugin.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/GoldPlugin.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/llvm/llvm/docs/GoldPlugin.rst`；SHA-256：`901e9ae974fa2628aacd99a12dc4745586daffa55ca85f8abdc2c2bf1aa96854`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
