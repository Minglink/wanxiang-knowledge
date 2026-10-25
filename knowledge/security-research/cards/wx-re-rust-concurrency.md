---
{
  "schemaVersion": 2,
  "id": "wx-re-rust-concurrency",
  "title": "Unsafe Rust：并发和并行",
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
  "snapshotHash": "af55ce00f843ef3dd167bcf2b92c762394cc1b477dcb6893e214bb953b0ffeb3",
  "generatedHash": "15c839fa457f671da87315fdfc4b94a84c9ae6a756b6c938c1f13a36737ea925",
  "archived": false,
  "verification": "文献收录；代码未实测",
  "l0": "Rust 作为一种语言，对如何进行并发或并行并没有什么意见。标准库暴露了操作系统线程和阻塞系统调用，因为每个人都有这些东西，而且它们足够统一，你可以以一种相对没有争议的方式提供对它们的抽象。消息传递、绿色线程和异步 API 都是多种多样的，任何对它们的抽象都会涉及到我们不愿意在 1.0 中承诺的 trade-off。 然而，Rust 建立的并发模型，使得将你",
  "l1": "Rust 作为一种语言，对如何进行并发或并行并没有什么意见。标准库暴露了操作系统线程和阻塞系统调用，因为每个人都有这些东西，而且它们足够统一，你可以以一种相对没有争议的方式提供对它们的抽象。消息传递、绿色线程和异步 API 都是多种多样的，任何对它们的抽象都会涉及到我们不愿意在 1.0 中承诺的 trade-off。 然而，Rust 建立的并发模型，使得将你自己的并发范式设计成一个库变得相对容易，并且让其他人的代码可以与你的代码一起工作。只要要求正确的生命周期、`Sync`和`Send`，你就可以不用担心数据竞争了。",
  "questions": [
    "Unsafe Rust：并发和并行的原理是什么？",
    "Unsafe Rust：并发和并行有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "rust-concurrency",
      "url": "https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/concurrency.md",
      "checkedAt": "2026-10-25",
      "mode": "MIT 许可中文文献收录，保留原始 Markdown"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "MIT（上游双许可中选择 MIT）"
}
---
# Unsafe Rust：并发和并行

> 收录自 Rust 秘典中文译本。原书说明其内容仍有不完整或可能过时之处；本库未编译和验证代码示例。

# 并发和并行

Rust 作为一种语言，对如何进行并发或并行并没有什么意见。标准库暴露了操作系统线程和阻塞系统调用，因为每个人都有这些东西，而且它们足够统一，你可以以一种相对没有争议的方式提供对它们的抽象。消息传递、绿色线程和异步 API 都是多种多样的，任何对它们的抽象都会涉及到我们不愿意在 1.0 中承诺的 trade-off。

然而，Rust 建立的并发模型，使得将你自己的并发范式设计成一个库变得相对容易，并且让其他人的代码可以与你的代码一起工作。只要要求正确的生命周期、`Sync`和`Send`，你就可以不用担心数据竞争了。


## 来源、版本与核验

- 来源：[并发和并行](https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/concurrency.md)
- 作者/维护者：The Rust Project Developers 与 nomicon-zh-Hans 中文贡献者
- 获取日期：2026-10-25。固定提交 e6bf12f4d91d3a2211664f40c4b46fd3271996d6
- 收录方式：MIT 许可中文文献收录，保留原始 Markdown。文献收录；代码未实测。
- 许可：MIT（上游双许可中选择 MIT）。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/rust-originals/concurrency.md`。
