---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-qemu-docs-devel-tcg-plugins",
  "title": "QEMU：QEMU TCG Plugins",
  "type": "note",
  "tags": [
    "VM",
    "系统虚拟机",
    "QEMU",
    "底层实现",
    "tcg-plugins",
    "qemu"
  ],
  "project": "VM与动态翻译",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "d6ff669359eddf87705642674c8ba194168a3bd90d4a07ad49c85b743b521e82",
  "generatedHash": "ab76d8fabb16fe0091fcaa52ab63c6f63304de7941481991bcd991dacf71d25c",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "QEMU TCG Plugins：QEMU TCG Plugins",
  "l1": ".. Copyright (C) 2017, Emilio G. Cota <cota@braap.org> Copyright (c) 2019, Linaro Limited Written by Emilio Cota and Alex Bennée This is a new feature for QEMU and it does allow people to develop out-of-tree plugins that can be dynamically linked into a running QEMU process. However the project reserves the right to change or break the API should it need to do so. The best way to avoid this is to submit your plugin upstream so they can be updated if/when the API changes. All plugins need to declare a symbol which exports the plugin API version they were built against. This can be done simply by:: QEMU_PLUGIN_EXPORT int qemu_plugin_version = QEMU_PLUGIN_VERSION; The core code will refuse to load a plugin that doesn't export a `qemu_plugin_version` symbol or if plugin version is outside of QEMU's supported range of API versions. Additionall",
  "questions": [
    "tcg-plugins 如何用于QEMU TCG Plugins？",
    "tcg-plugins 有哪些参数、约束、实现语义和注意事项？"
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
      "id": "doc-qemu-docs-devel-tcg-plugins",
      "url": "https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/tcg-plugins.rst",
      "checkedAt": "2026-10-25",
      "version": "v10.0.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）"
}
---
# QEMU：QEMU TCG Plugins

> 本文收录 QEMU 的独立技术文献正文，固定标签 `v10.0.0`。主题：QEMU TCG Plugins。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

QEMU TCG Plugins

## 技术正文

..
   Copyright (C) 2017, Emilio G. Cota <cota@braap.org>
   Copyright (c) 2019, Linaro Limited
   Written by Emilio Cota and Alex Bennée


## QEMU TCG Plugins



### Writing plugins


#### API versioning


This is a new feature for QEMU and it does allow people to develop
out-of-tree plugins that can be dynamically linked into a running QEMU
process. However the project reserves the right to change or break the
API should it need to do so. The best way to avoid this is to submit
your plugin upstream so they can be updated if/when the API changes.

All plugins need to declare a symbol which exports the plugin API
version they were built against. This can be done simply by::

  QEMU_PLUGIN_EXPORT int qemu_plugin_version = QEMU_PLUGIN_VERSION;

The core code will refuse to load a plugin that doesn't export a
`qemu_plugin_version` symbol or if plugin version is outside of QEMU's
supported range of API versions.

Additionally the `qemu_info_t` structure which is passed to the
`qemu_plugin_install` method of a plugin will detail the minimum and
current API versions supported by QEMU. The API version will be
incremented if new APIs are added. The minimum API version will be
incremented if existing APIs are changed or removed.

#### Lifetime of the query handle


Each callback provides an opaque anonymous information handle which
can usually be further queried to find out information about a
translation, instruction or operation. The handles themselves are only
valid during the lifetime of the callback so it is important that any
information that is needed is extracted during the callback and saved
by the plugin.

#### Plugin life cycle


First the plugin is loaded and the public qemu_plugin_install function
is called. The plugin will then register callbacks for various plugin
events. Generally plugins will register a handler for the *atexit*
if they want to dump a summary of collected information once the
program/system has finished running.

When a registered event occurs the plugin callback is invoked. The
callbacks may provide additional information. In the case of a
translation event the plugin has an option to enumerate the
instructions in a block of instructions and optionally register
callbacks to some or all instructions when they are executed.

There is also a facility to add inline instructions doing various operations,
like adding or storing an immediate value. It is also possible to execute a
callback conditionally, with condition being evaluated inline. All those inline
operations are associated to a `scoreboard`, which is a thread-local storage
automatically expanded when new cores/threads are created and that can be
accessed/modified in a thread-safe way without any lock needed. Combining inline
operations and conditional callbacks offer a more efficient way to instrument
binaries, compared to classic callbacks.

Finally when QEMU exits all the registered *atexit* callbacks are
invoked.

#### Exposure of QEMU internals


The plugin architecture actively avoids leaking implementation details
about how QEMU's translation works to the plugins. While there are
conceptions such as translation time and translation blocks the
details are opaque to plugins. The plugin is able to query select
details of instructions and system configuration only through the
exported *qemu_plugin* functions.

However the following assumptions can be made:

##### Translation Blocks


All code will go through a translation phase although not all
translations will be necessarily be executed. You need to instrument
actual executions to track what is happening.

It is quite normal to see the same address translated multiple times.
If you want to track the code in system emulation you should examine
the underlying physical address (`qemu_plugin_insn_haddr`) to take
into account the effects of virtual memory although if the system does
paging this will change too.

Not all instructions in a block will always execute so if its
important to track individual instruction execution you need to
instrument them directly. However asynchronous interrupts will not
change control flow mid-block.

##### Instructions


Instruction instrumentation runs before the instruction executes. You
can be can be sure the instruction will be dispatched, but you can't
be sure it will complete. Generally this will be because of a
synchronous exception (e.g. SIGILL) triggered by the instruction
attempting to execute. If you want to be sure you will need to
instrument the next instruction as well. See the `execlog.c` plugin
for examples of how to track this and finalise details after execution.

##### Memory Accesses


Memory callbacks are called after a successful load or store.
Unsuccessful operations (i.e. faults) will not be visible to memory
instrumentation although the execution side effects can be observed
(e.g. entering a exception handler).

##### System Idle and Resume States


The `qemu_plugin_register_vcpu_idle_cb` and
`qemu_plugin_register_vcpu_resume_cb` functions can be used to track
when CPUs go into and return from sleep states when waiting for
external I/O. Be aware though that these may occur less frequently
than in real HW due to the inefficiencies of emulation giving less
chance for the CPU to idle.

### Internals


#### Locking


We have to ensure we cannot deadlock, particularly under MTTCG. For
this we acquire a lock when called from plugin code. We also keep the
list of callbacks under RCU so that we do not have to hold the lock
when calling the callbacks. This is also for performance, since some
callbacks (e.g. memory access callbacks) might be called very
frequently.

  * A consequence of this is that we keep our own list of CPUs, so that
    we do not have to worry about locking order wrt cpu_list_lock.
  * Use a recursive lock, since we can get registration calls from
    callbacks.

As a result registering/unregistering callbacks is "slow", since it
takes a lock. But this is very infrequent; we want performance when
calling (or not calling) callbacks, not when registering them. Using
RCU is great for this.

We support the uninstallation of a plugin at any time (e.g. from
plugin callbacks). This allows plugins to remove themselves if they no
longer want to instrument the code. This operation is asynchronous
which means callbacks may still occur after the uninstall operation is
requested. The plugin isn't completely uninstalled until the safe work
has executed while all vCPUs are quiescent.

## Plugin API


The following API is generated from the inline documentation in
`include/qemu/qemu-plugin.h`. Please ensure any updates to the API
include the full kernel-doc annotations.

.. kernel-doc:: include/qemu/qemu-plugin.h

## 来源、版本与核验

- 上游：[docs/devel/tcg-plugins.rst](https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/tcg-plugins.rst)
- 作者：qemu/qemu 项目贡献者，原文内具体署名保留。
- 标签：v10.0.0；树标识：7c949c53e936aa3a658d84ab53bae5cadaa5d59c；获取日期：2026-10-25。
- 许可：GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/qemu/docs/devel/tcg-plugins.rst`；SHA-256：`d6ff669359eddf87705642674c8ba194168a3bd90d4a07ad49c85b743b521e82`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
