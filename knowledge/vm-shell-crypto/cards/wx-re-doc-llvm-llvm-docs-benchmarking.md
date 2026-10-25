---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-llvm-llvm-docs-benchmarking",
  "title": "LLVM：Benchmarking tips",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "Benchmarking",
    "llvm"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "9a664d1f3dc2aad020ab0bbd4f5ade7a9931a8439e4e0711397c9f9353863cb5",
  "generatedHash": "45d717c21a1ef0a92c683ed32a02796cf6860269d295b1e6c986316c7dda130c",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Benchmarking tips：Benchmarking tips",
  "l1": "For benchmarking a patch we want to reduce all possible sources of noise as much as possible. How to do that is very OS dependent. Note that low noise is required, but not sufficient. It does not exclude measurement bias. See [\"Producing Wrong Data Without Doing Anything Obviously Wrong!\" by Mytkowicz, Diwan, Hauswith and Sweeney (ASPLOS 2009) ](https://users.cs.northwestern.edu/~robby/courses/322-2013-spring/mytkowicz-wrong-data.pdf) for example. * Use a high resolution timer, e.g. perf under linux. * Run the benchmark multiple times to be able to recognize noise. * Disable as many processes or services as possible on the target system. * Disable frequency scaling, turbo boost and address space randomization (see OS specific section). * Static link if the OS supports it. That avoids any variation that might be introduced by loading dynam",
  "questions": [
    "Benchmarking 如何用于Benchmarking tips？",
    "Benchmarking 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-llvm-llvm-docs-benchmarking",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/Benchmarking.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# LLVM：Benchmarking tips

> 本文收录 LLVM 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：Benchmarking tips。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

Benchmarking tips

## 技术正文

## Benchmarking tips



## Introduction


For benchmarking a patch we want to reduce all possible sources of
noise as much as possible. How to do that is very OS dependent.

Note that low noise is required, but not sufficient. It does not
exclude measurement bias.
See ["Producing Wrong Data Without Doing Anything Obviously Wrong!" by Mytkowicz, Diwan, Hauswith and Sweeney (ASPLOS 2009) ](https://users.cs.northwestern.edu/~robby/courses/322-2013-spring/mytkowicz-wrong-data.pdf)
for example.

## General


* Use a high resolution timer, e.g. perf under linux.

* Run the benchmark multiple times to be able to recognize noise.

* Disable as many processes or services as possible on the target system.

* Disable frequency scaling, turbo boost and address space
  randomization (see OS specific section).

* Static link if the OS supports it. That avoids any variation that
  might be introduced by loading dynamic libraries. This can be done
  by passing `-DLLVM_BUILD_STATIC=ON` to cmake.

* Try to avoid storage. On some systems you can use tmpfs. Putting the
  program, inputs and outputs on tmpfs avoids touching a real storage
  system, which can have a pretty big variability.

  To mount it (on linux and freebsd at least)::

    mount -t tmpfs -o size=<XX>g none dir_to_mount

## Linux


* Disable address space randomization::

    echo 0 > /proc/sys/kernel/randomize_va_space

* Set scaling_governor to performance::

   for i in /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
   do
     echo performance > $i
   done

* Use https://github.com/lpechacek/cpuset to reserve cpus for just the
  program you are benchmarking. If using perf, leave at least 2 cores
  so that perf runs in one and your program in another::

    cset shield -c N1,N2 -k on

  This will move all threads out of N1 and N2. The `-k on` means
  that even kernel threads are moved out.

* Disable the SMT pair of the cpus you will use for the benchmark. The
  pair of cpu N can be found in
  `/sys/devices/system/cpu/cpuN/topology/thread_siblings_list` and
  disabled with::

    echo 0 > /sys/devices/system/cpu/cpuX/online


* Run the program with::

    cset shield --exec -- perf stat -r 10 <cmd>

  This will run the command after `--` in the isolated cpus. The
  particular perf command runs the `<cmd>` 10 times and reports
  statistics.

With these in place you can expect perf variations of less than 0.1%.

### Linux Intel


* Disable turbo mode::

    echo 1 > /sys/devices/system/cpu/intel_pstate/no_turbo

## 来源、版本与核验

- 上游：[llvm/docs/Benchmarking.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/Benchmarking.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/llvm/llvm/docs/Benchmarking.rst`；SHA-256：`9a664d1f3dc2aad020ab0bbd4f5ade7a9931a8439e4e0711397c9f9353863cb5`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
