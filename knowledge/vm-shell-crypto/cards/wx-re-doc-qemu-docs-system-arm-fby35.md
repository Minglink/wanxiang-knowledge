---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-qemu-docs-system-arm-fby35",
  "title": "QEMU：ARM设备模型 · fby35",
  "type": "note",
  "tags": [
    "VM",
    "系统虚拟机",
    "QEMU",
    "底层实现",
    "fby35",
    "qemu"
  ],
  "project": "VM与动态翻译",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "966a77c8e55c92ea9f96665847cf6c5f76c422324b7da6404963004b72f62088",
  "generatedHash": "71c612e8e084ff41070d7c51722040c500bf64b506b9669511d314723024de42",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Facebook Yosemite v3.5 Platform and CraterLake Server (fby35)：Facebook Yosemite v3.5 Platform and CraterLake Server (``fby35``)",
  "l1": "Facebook has a series of multi-node compute server designs named Yosemite. The most recent version released was [Yosemite v3 ](https://www.opencompute.org/documents/ocp-yosemite-v3-platform-design-specification-1v16-pdf). Yosemite v3.5 is an iteration on this design, and is very similar: there's a baseboard with a BMC, and 4 server slots. The new server board design termed \"CraterLake\" includes a Bridge IC (BIC), with room for expansion boards to include various compute accelerators (video, inferencing, etc). At the moment, only the first server slot's BIC is included. Yosemite v3.5 is itself a sled which fits into a 40U chassis, and 3 sleds can be fit into a chassis. See [here ](https://www.opencompute.org/products-chiplets/237/wiwynn-yosemite-v3-server) for an example. In this generation, the BMC is an AST2600 and each BIC is an AST1030",
  "questions": [
    "fby35 如何用于Facebook Yosemite v3.5 Platform and CraterLake Server (fby35)？",
    "fby35 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-qemu-docs-system-arm-fby35",
      "url": "https://github.com/qemu/qemu/blob/v10.0.0/docs/system/arm/fby35.rst",
      "checkedAt": "2026-10-25",
      "version": "v10.0.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）"
}
---
# QEMU：ARM设备模型 · fby35

> 本文收录 QEMU 的独立技术文献正文，固定标签 `v10.0.0`。主题：Facebook Yosemite v3.5 Platform and CraterLake Server (fby35)。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

Facebook Yosemite v3.5 Platform and CraterLake Server (``fby35``)

## 技术正文

## Facebook Yosemite v3.5 Platform and CraterLake Server (``fby35``)


Facebook has a series of multi-node compute server designs named
Yosemite. The most recent version released was
[Yosemite v3 ](https://www.opencompute.org/documents/ocp-yosemite-v3-platform-design-specification-1v16-pdf).

Yosemite v3.5 is an iteration on this design, and is very similar: there's a
baseboard with a BMC, and 4 server slots. The new server board design termed
"CraterLake" includes a Bridge IC (BIC), with room for expansion boards to
include various compute accelerators (video, inferencing, etc). At the moment,
only the first server slot's BIC is included.

Yosemite v3.5 is itself a sled which fits into a 40U chassis, and 3 sleds
can be fit into a chassis. See [here ](https://www.opencompute.org/products-chiplets/237/wiwynn-yosemite-v3-server)
for an example.

In this generation, the BMC is an AST2600 and each BIC is an AST1030. The BMC
runs [OpenBMC ](https://github.com/facebook/openbmc), and the BIC runs
[OpenBIC ](https://github.com/facebook/openbic).

Firmware images can be retrieved from the Github releases or built from the
source code, see the README's for instructions on that. This image uses the
"fby35" machine recipe from OpenBMC, and the "yv35-cl" target from OpenBIC.
Some reference images can also be found here:

```bash
$ wget https://github.com/facebook/openbmc/releases/download/openbmc-e2294ff5d31d/fby35.mtd
$ wget https://github.com/peterdelevoryas/OpenBIC/releases/download/oby35-cl-2022.13.01/Y35BCL.elf

```

Since this machine has multiple SoC's, each with their own serial console, the
recommended way to run it is to allocate a pseudoterminal for each serial
console and let the monitor use stdio. Also, starting in a paused state is
useful because it allows you to attach to the pseudoterminals before the boot
process starts.

```bash
$ qemu-system-arm -machine fby35 \
    -drive file=fby35.mtd,format=raw,if=mtd \
    -device loader,file=Y35BCL.elf,addr=0,cpu-num=2 \
    -serial pty -serial pty -serial mon:stdio \
    -display none -S
$ screen /dev/tty0 # In a separate TMUX pane, terminal window, etc.
$ screen /dev/tty1
$ (qemu) c		   # Start the boot process once screen is setup.

```

This machine model supports emulation of the boot from the CE0 flash device by
setting option `execute-in-place`. When using this option, the CPU fetches
instructions to execute by reading CE0 and not from a preloaded ROM
initialized at machine init time. As a result, execution will be slower.

## 来源、版本与核验

- 上游：[docs/system/arm/fby35.rst](https://github.com/qemu/qemu/blob/v10.0.0/docs/system/arm/fby35.rst)
- 作者：qemu/qemu 项目贡献者，原文内具体署名保留。
- 标签：v10.0.0；树标识：7c949c53e936aa3a658d84ab53bae5cadaa5d59c；获取日期：2026-10-25。
- 许可：GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/qemu/docs/system/arm/fby35.rst`；SHA-256：`966a77c8e55c92ea9f96665847cf6c5f76c422324b7da6404963004b72f62088`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
