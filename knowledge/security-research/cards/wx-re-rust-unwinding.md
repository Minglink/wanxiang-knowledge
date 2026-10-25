---
{
  "schemaVersion": 2,
  "id": "wx-re-rust-unwinding",
  "title": "Unsafe Rust：Unwinding",
  "type": "note",
  "tags": [
    "软件底层",
    "Rust",
    "内存安全",
    "Unsafe Rust"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "8d010909863922112f4ddd16087cb91f2e642348a94edda9cbe514e1b22b9120",
  "generatedHash": "17bb64082e6dc6654f0567279c4a1cc10e8c10ebb87cec132bbd69b7687cf407",
  "archived": false,
  "verification": "文献收录；代码未实测",
  "l0": "Rust 有一个*分等级*的错误处理方案： * 如果某些东西可能不存在，则使用 Option * 如果出了问题并且可以合理地处理，则使用 Result * 如果有什么东西出错了，而且不能合理地处理，线程就会 panic * 如果发生了灾难性的事情，程序就会直接中止（abort） 在大多数情况下，Option 和 Result 是绝大多数人的首选，特别是因为它",
  "l1": "Rust 有一个*分等级*的错误处理方案： * 如果某些东西可能不存在，则使用 Option * 如果出了问题并且可以合理地处理，则使用 Result * 如果有什么东西出错了，而且不能合理地处理，线程就会 panic * 如果发生了灾难性的事情，程序就会直接中止（abort） 在大多数情况下，Option 和 Result 是绝大多数人的首选，特别是因为它们可以提供了 API，可以根据用户的决定被提升为 panic 或中止。panic 会导致线程停止正常的执行，并 unwind 它的堆栈，调用析构器，就像每个函数瞬间返回一样。 从 1.0 开始，Rust 在涉及到 panic 时有两种想法。在很久以前，Rust 很像 Erlang，有轻量级的任务，而任务的目的是在达到无法维持的状态时用 panic 来杀死自己。与 Java 或 C++ 中的异常不同，panic 不能在任何时候被捕获。pa",
  "questions": [
    "Unsafe Rust：Unwinding的原理是什么？",
    "Unsafe Rust：Unwinding有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "rust-unwinding",
      "url": "https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/unwinding.md",
      "checkedAt": "2026-10-25",
      "mode": "MIT 许可中文文献收录，保留原始 Markdown"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "MIT（上游双许可中选择 MIT）"
}
---
# Unsafe Rust：Unwinding

> 收录自 Rust 秘典中文译本。原书说明其内容仍有不完整或可能过时之处；本库未编译和验证代码示例。

# Unwinding

> 译者注：unwind 可以翻译为展开、解卷等等，但是没有找到合适的信达雅的翻译，所以暂且保留英文原文，作为固定词语处理。

Rust 有一个*分等级*的错误处理方案：

* 如果某些东西可能不存在，则使用 Option
* 如果出了问题并且可以合理地处理，则使用 Result
* 如果有什么东西出错了，而且不能合理地处理，线程就会 panic
* 如果发生了灾难性的事情，程序就会直接中止（abort）

在大多数情况下，Option 和 Result 是绝大多数人的首选，特别是因为它们可以提供了 API，可以根据用户的决定被提升为 panic 或中止。panic 会导致线程停止正常的执行，并 unwind 它的堆栈，调用析构器，就像每个函数瞬间返回一样。

从 1.0 开始，Rust 在涉及到 panic 时有两种想法。在很久以前，Rust 很像 Erlang，有轻量级的任务，而任务的目的是在达到无法维持的状态时用 panic 来杀死自己。与 Java 或 C++ 中的异常不同，panic 不能在任何时候被捕获。panic 只能被任务的所有者捕捉到，这时必须对其进行处理，否则*该*任务本身就会出现 panic。

unwind 对这个故事很重要，因为如果一个任务的析构器没有被调用，就会导致内存和其他系统资源的泄漏。由于任务会在正常执行过程中死亡，这将使 Rust 在长期运行的系统中变得非常糟糕。

随着我们今天所知道的 Rust 的出现，这种编程风格在对越来越少的抽象的推动下逐渐失去了时尚。轻量级的任务在重量级的操作系统线程中被杀死。尽管如此，在 1.0 版本的稳定版 Rust 上，panic 只能由父线程捕捉。这意味着捕捉 panic 需要使用一整个操作系统线程。不幸的是，这与 Rust 的零成本抽象理念有冲突。

有一个叫做[`catch_unwind`]的 API，可以在不产生线程的情况下捕捉到一个 panic。不过，我们还是鼓励你少用这个方法。特别是，Rust 目前的 unwind 实现为“不 unwind”的情况做了大量的优化。如果一个程序没有 unwind，那么这个程序在仅仅预备好 unwind 时就不应该有运行时成本。因此，实际 unwind 的成本会比 Java 中的成本高。在正常情况下，不要让你的程序来 unwind。理想情况下，你应该只为编程错误或*极端*的问题而 panic。

Rust 的 unwind 策略没有被指定为与任何其他语言的 unwind 在本质上兼容。因此，从其他语言 unwind 到 Rust，或者从 Rust unwind 到其他语言，都是未定义行为。你必须在 FFI 的边界上*绝对地*捕捉任何 panic！你在这时候（FFI 边界上捕捉到 panic 后）做什么完全由你自己决定，但你*必须*做一些事情。如果你没有做到这一点，最好的情况是你的应用程序会崩溃，在最坏的情况下，你的应用程序*不会*崩溃，但至于会发生什么？祝你好运。

[`catch_unwind`]: https://doc.rust-lang.org/std/panic/fn.catch_unwind.html


## 来源、版本与核验

- 来源：[Unwinding](https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/unwinding.md)
- 作者/维护者：The Rust Project Developers 与 nomicon-zh-Hans 中文贡献者
- 获取日期：2026-10-25。固定提交 e6bf12f4d91d3a2211664f40c4b46fd3271996d6
- 收录方式：MIT 许可中文文献收录，保留原始 Markdown。文献收录；代码未实测。
- 许可：MIT（上游双许可中选择 MIT）。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/rust-originals/unwinding.md`。
