---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-qemu-docs-devel-block-coroutine-wrapper",
  "title": "QEMU：block-coroutine-wrapper",
  "type": "note",
  "tags": [
    "VM",
    "系统虚拟机",
    "QEMU",
    "底层实现",
    "block-coroutine-wrapper",
    "qemu"
  ],
  "project": "VM与动态翻译",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "05c16e3941c0fae464a483dff698978cbe0fd90ca27d849b2484155dfd98ba44",
  "generatedHash": "75ec46be19d71241155389514a60430d82edf8baa6aea61c692b7d5e23ad39df",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "block-coroutine-wrapper：block-coroutine-wrapper",
  "l1": "A lot of functions in QEMU block layer (see `block/*`) can only be called in coroutine context. Such functions are normally marked by the coroutine_fn specifier. Still, sometimes we need to call them from non-coroutine context; for this we need to start a coroutine, run the needed function from it and wait for the coroutine to finish in a BDRV_POLL_WHILE() loop. To run a coroutine we need a function with one void* argument. So for each coroutine_fn function which needs a non-coroutine interface, we should define a structure to pack the parameters, define a separate function to unpack the parameters and call the original function and finally define a new interface function with same list of arguments as original one, which will pack the parameters into a struct, create a coroutine, run it and wait in BDRV_POLL_WHILE() loop. It's boring to ",
  "questions": [
    "block-coroutine-wrapper 如何用于block-coroutine-wrapper？",
    "block-coroutine-wrapper 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-qemu-docs-devel-block-coroutine-wrapper",
      "url": "https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/block-coroutine-wrapper.rst",
      "checkedAt": "2026-10-25",
      "version": "v10.0.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）"
}
---
# QEMU：block-coroutine-wrapper

> 本文收录 QEMU 的独立技术文献正文，固定标签 `v10.0.0`。主题：block-coroutine-wrapper。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

block-coroutine-wrapper

## 技术正文

## block-coroutine-wrapper


A lot of functions in QEMU block layer (see `block/*`) can only be
called in coroutine context. Such functions are normally marked by the
coroutine_fn specifier. Still, sometimes we need to call them from
non-coroutine context; for this we need to start a coroutine, run the
needed function from it and wait for the coroutine to finish in a
BDRV_POLL_WHILE() loop. To run a coroutine we need a function with one
void* argument. So for each coroutine_fn function which needs a
non-coroutine interface, we should define a structure to pack the
parameters, define a separate function to unpack the parameters and
call the original function and finally define a new interface function
with same list of arguments as original one, which will pack the
parameters into a struct, create a coroutine, run it and wait in
BDRV_POLL_WHILE() loop. It's boring to create such wrappers by hand,
so we have a script to generate them.

## Usage


Assume we have defined the `coroutine_fn` function
`bdrv_co_foo(<some args>)` and need a non-coroutine interface for it,
called `bdrv_foo(<same args>)`. In this case the script can help. To
trigger the generation:

1. You need `bdrv_foo` declaration somewhere (for example, in
   `block/coroutines.h`) with the `co_wrapper` mark,
   like this:

```c
int co_wrapper bdrv_foo(<some args>);

```

2. You need to feed this declaration to block-coroutine-wrapper script.
   For this, add the .h (or .c) file with the declaration to the
   `input: files(...)` list of `block_gen_c` target declaration in
   `block/meson.build`

You are done. During the build, coroutine wrappers will be generated in
`<BUILD_DIR>/block/block-gen.c`.

## Links


1. The script location is `scripts/block-coroutine-wrapper.py`.

2. Generic place for private `co_wrapper` declarations is
   `block/coroutines.h`, for public declarations:
   `include/block/block.h`

3. The core API of generated coroutine wrappers is placed in
   (not generated) `block/block-gen.h`

## 来源、版本与核验

- 上游：[docs/devel/block-coroutine-wrapper.rst](https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/block-coroutine-wrapper.rst)
- 作者：qemu/qemu 项目贡献者，原文内具体署名保留。
- 标签：v10.0.0；树标识：7c949c53e936aa3a658d84ab53bae5cadaa5d59c；获取日期：2026-10-25。
- 许可：GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/qemu/docs/devel/block-coroutine-wrapper.rst`；SHA-256：`05c16e3941c0fae464a483dff698978cbe0fd90ca27d849b2484155dfd98ba44`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
