---
{
  "schemaVersion": 2,
  "id": "wx-re-rust-poisoning",
  "title": "Unsafe Rust：Poisoning",
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
  "snapshotHash": "662cfa555fdd7bef473b0b22bea329cf46ecea604449ade9d2419760ee3521f8",
  "generatedHash": "0f0c62dcce96101973cb4b4e2c55df48e692c7b16158b17f832ee4e8e33b223b",
  "archived": false,
  "verification": "文献收录；代码未实测",
  "l0": "尽管所有不安全的代码都*必须*确保其具有最小的异常安全，但并非所有类型都能确保*最大*的异常安全；而即使类型保证了，你的代码也可能导致额外的问题。例如，一个整数当然是异常安全的，但它本身没有语义。panic 的代码有可能无法正确地更新整数，从而产生不一致的程序状态。 这*通常*是没问题的，因为任何见证异常的东西都会被销毁。例如，如果你发送一个 Vec 给另一",
  "l1": "尽管所有不安全的代码都*必须*确保其具有最小的异常安全，但并非所有类型都能确保*最大*的异常安全；而即使类型保证了，你的代码也可能导致额外的问题。例如，一个整数当然是异常安全的，但它本身没有语义。panic 的代码有可能无法正确地更新整数，从而产生不一致的程序状态。 这*通常*是没问题的，因为任何见证异常的东西都会被销毁。例如，如果你发送一个 Vec 给另一个线程，而那个线程 panic 了，那么这个 Vec 是否处于一个奇怪的状态并不重要。它将被丢弃并永远消失。然而，有些类型特别擅长跨越 panic 边界获取值。 这些类型可以选择明确地 *毒害（Poison）* 自己，如果他们遇到了一个 panic。Poisoning 并不意味着什么特别的事情。一般来说，它只是意味着阻止正常的使用继续进行。这方面最明显的例子是标准库的 Mutex 类型。如果 Mutex 的一个 MutexGuards（",
  "questions": [
    "Unsafe Rust：Poisoning的原理是什么？",
    "Unsafe Rust：Poisoning有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "rust-poisoning",
      "url": "https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/poisoning.md",
      "checkedAt": "2026-10-25",
      "mode": "MIT 许可中文文献收录，保留原始 Markdown"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "MIT（上游双许可中选择 MIT）"
}
---
# Unsafe Rust：Poisoning

> 收录自 Rust 秘典中文译本。原书说明其内容仍有不完整或可能过时之处；本库未编译和验证代码示例。

# Poisoning

尽管所有不安全的代码都*必须*确保其具有最小的异常安全，但并非所有类型都能确保*最大*的异常安全；而即使类型保证了，你的代码也可能导致额外的问题。例如，一个整数当然是异常安全的，但它本身没有语义。panic 的代码有可能无法正确地更新整数，从而产生不一致的程序状态。

这*通常*是没问题的，因为任何见证异常的东西都会被销毁。例如，如果你发送一个 Vec 给另一个线程，而那个线程 panic 了，那么这个 Vec 是否处于一个奇怪的状态并不重要。它将被丢弃并永远消失。然而，有些类型特别擅长跨越 panic 边界获取值。

这些类型可以选择明确地 *毒害（Poison）* 自己，如果他们遇到了一个 panic。Poisoning 并不意味着什么特别的事情。一般来说，它只是意味着阻止正常的使用继续进行。这方面最明显的例子是标准库的 Mutex 类型。如果 Mutex 的一个 MutexGuards（当获得锁时返回的东西）在 panic 中被丢弃，Mutex 将自我中毒。今后任何试图锁定 Mutex 的行为都会返回`Err`或 panic。

Mutex 中毒不是为了 Rust 通常关心的真正的安全。它是作为一种安全防护措施，防止盲目地使用在锁定时发生了 panic 的 Mutex 中的数据。这样的 Mutex 中的数据可能正在被修改中，因此可能处于不一致或不完整的状态。需要注意的是，如果正确地编写了这样一个类型，就不会违反内存安全。毕竟，它必须是最低限度的异常安全的。

然而，如果 Mutex 包含，比如说，一个实际上不具备堆属性的 BinaryHeap，那么任何使用它的代码都不可能按照作者的意图运行。因此，程序不应该正常进行。不过，如果你确信你可以对这个值做*一些*事情，Mutex 还是暴露了一个方法来获得锁。毕竟，它*是*安全的，只是可能是无稽之谈。


## 来源、版本与核验

- 来源：[Poisoning](https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/poisoning.md)
- 作者/维护者：The Rust Project Developers 与 nomicon-zh-Hans 中文贡献者
- 获取日期：2026-10-25。固定提交 e6bf12f4d91d3a2211664f40c4b46fd3271996d6
- 收录方式：MIT 许可中文文献收录，保留原始 Markdown。文献收录；代码未实测。
- 许可：MIT（上游双许可中选择 MIT）。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/rust-originals/poisoning.md`。
