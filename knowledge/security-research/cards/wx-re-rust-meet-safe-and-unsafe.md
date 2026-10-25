---
{
  "schemaVersion": 2,
  "id": "wx-re-rust-meet-safe-and-unsafe",
  "title": "Unsafe Rust：认识 Safe 与 Unsafe",
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
  "snapshotHash": "659d17b38333ef25a8b37c3195c10a276e61f7ddc03b821f6fdfafa22f4ed908",
  "generatedHash": "14179c15816769434bfaee2e6b71c9aecc144227d7eb5865bfb96754af82921b",
  "archived": false,
  "verification": "文献收录；代码未实测",
  "l0": "我们都不想关心底层的实现细节。谁会关心空元组占用了多少空间呢？可悲的是，它有时很重要，我们需要担心这个问题。开发人员开始关心实现细节的最常见的原因是性能，但更重要的是，当与硬件、操作系统或其他语言直接交互时，这些细节就是关乎对错的问题。 当实现细节在安全的编程语言中开始变得重要时，程序员通常有三种选择。 * 调整代码以鼓励编译器/运行时进行优化 * 采用一种",
  "l1": "我们都不想关心底层的实现细节。谁会关心空元组占用了多少空间呢？可悲的是，它有时很重要，我们需要担心这个问题。开发人员开始关心实现细节的最常见的原因是性能，但更重要的是，当与硬件、操作系统或其他语言直接交互时，这些细节就是关乎对错的问题。 当实现细节在安全的编程语言中开始变得重要时，程序员通常有三种选择。 * 调整代码以鼓励编译器/运行时进行优化 * 采用一种更不规范或更繁琐的设计来获得所需的实现 * 用一种能让你处理这些细节的语言重写实现 对于最后一种选择，程序员往往使用的语言是*C*。这对于对接那些只声明 C 语言接口的系统来说往往是必要的。 不幸的是，C 语言使用起来非常不安全（尽管有时有很好的理由），当试图与另一种语言交互时，这种危险会被放大。我们必须小心翼翼地确保 C 语言和其他语言的一致性，以使它们不会越俎代庖。 嗯，与 C 不同，Rust 是一种安全的编程语言。 但是，和 C ",
  "questions": [
    "Unsafe Rust：认识 Safe 与 Unsafe的原理是什么？",
    "Unsafe Rust：认识 Safe 与 Unsafe有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "rust-meet-safe-and-unsafe",
      "url": "https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/meet-safe-and-unsafe.md",
      "checkedAt": "2026-10-25",
      "mode": "MIT 许可中文文献收录，保留原始 Markdown"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "MIT（上游双许可中选择 MIT）"
}
---
# Unsafe Rust：认识 Safe 与 Unsafe

> 收录自 Rust 秘典中文译本。原书说明其内容仍有不完整或可能过时之处；本库未编译和验证代码示例。

# 认识 Safe 与 Unsafe

![safe and unsafe](https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/img/safeandunsafe.svg)

我们都不想关心底层的实现细节。谁会关心空元组占用了多少空间呢？可悲的是，它有时很重要，我们需要担心这个问题。开发人员开始关心实现细节的最常见的原因是性能，但更重要的是，当与硬件、操作系统或其他语言直接交互时，这些细节就是关乎对错的问题。

当实现细节在安全的编程语言中开始变得重要时，程序员通常有三种选择。

* 调整代码以鼓励编译器/运行时进行优化
* 采用一种更不规范或更繁琐的设计来获得所需的实现
* 用一种能让你处理这些细节的语言重写实现

对于最后一种选择，程序员往往使用的语言是*C*。这对于对接那些只声明 C 语言接口的系统来说往往是必要的。

不幸的是，C 语言使用起来非常不安全（尽管有时有很好的理由），当试图与另一种语言交互时，这种危险会被放大。我们必须小心翼翼地确保 C 语言和其他语言的一致性，以使它们不会越俎代庖。

那么，这与 Rust 有什么关系呢？

嗯，与 C 不同，Rust 是一种安全的编程语言。

但是，和 C 语言一样，Rust 也是一种不安全的编程语言。

更准确地说，Rust 同时*包含*了一种安全和一种不安全的编程语言。

Rust 可以被认为是两种编程语言的结合。*Safe Rust* 和*Unsafe Rust*。顾名思义，Safe Rust 是安全的。Unsafe Rust 是，嗯，不安全的。事实上，Unsafe Rust 让我们做一些*真正*不安全的事情。Rust 的作者会恳求你不要做这些事情，但我们还是要做。

Safe Rust 是*真正*的 Rust 编程语言。如果你只写 Safe Rust，你将永远不必担心类型安全或内存安全的问题。你永远不会遇见悬空的指针，释放后使用（use-after-free），或任何其他类型的未定义行为。

标准库也为你提供了足够多的开箱即用的工具，你将能够用纯粹的Safe Rust 编写高性能的应用程序和库。

但是，也许你想调用另一种语言，也许你正在写一个标准库没有暴露的低级抽象，也许你正在*写*标准库（它完全是用 Rust 写的），也许你需要做点类型系统看不懂的*底层数据操作*。也许你需要Unsafe Rust。

Unsafe Rust 与Safe Rust 完全一样，具有所有相同的规则和语义。它只是允许你做一些*额外的*、绝对不安全的事情（我们将在下一节中定义）。

这种分离的价值在于，我们获得了使用像 C 这样的不安全语言的好处——获得对底层实现细节的控制——而与其他安全语言交互时却没有那么多问题了。

仍然有一些问题——最明显的是，我们必须意识到类型系统有一些程序必须遵守的假设的规则，且认真审核任何与 Unsafe Rust 交互的代码以遵守规则。这就是本书的目的：教你了解这些规则以及如何遵守它们。


## 来源、版本与核验

- 来源：[认识 Safe 与 Unsafe](https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/meet-safe-and-unsafe.md)
- 作者/维护者：The Rust Project Developers 与 nomicon-zh-Hans 中文贡献者
- 获取日期：2026-10-25。固定提交 e6bf12f4d91d3a2211664f40c4b46fd3271996d6
- 收录方式：MIT 许可中文文献收录，保留原始 Markdown。文献收录；代码未实测。
- 许可：MIT（上游双许可中选择 MIT）。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/rust-originals/meet-safe-and-unsafe.md`。
