---
{
  "schemaVersion": 2,
  "id": "wx-re-rust-vec-vec",
  "title": "Unsafe Rust：示例：实现 Vec",
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
  "snapshotHash": "efec0f9aa6ceb8d4c244700edf066e81a863835fb74976d558740c7b631a3acd",
  "generatedHash": "a6cf48def1892d73b7f8c9c569df9d1a6c0bfb959257b53375597d8b97f0c59d",
  "archived": false,
  "verification": "文献收录；代码未实测",
  "l0": "为了将所有的东西整合起来，我们将从头开始编写`std::Vec`。我们将限制自己使用稳定的 Rust。特别是我们不会使用任何可以让我们的代码变得更漂亮或更高效的内建指令，因为内建指令是永远不稳定的。尽管许多内建指令*确实*在其他地方变得稳定了（`std::ptr`和`std::mem`由许多内建指令组成）。 最终，这意味着我们的实现可能不会利用所有可能的优化",
  "l1": "为了将所有的东西整合起来，我们将从头开始编写`std::Vec`。我们将限制自己使用稳定的 Rust。特别是我们不会使用任何可以让我们的代码变得更漂亮或更高效的内建指令，因为内建指令是永远不稳定的。尽管许多内建指令*确实*在其他地方变得稳定了（`std::ptr`和`std::mem`由许多内建指令组成）。 最终，这意味着我们的实现可能不会利用所有可能的优化，但它也绝不是*简陋*的。我们肯定会在细枝末节的细节上钻牛角尖，即使问题并不*真的*值得这样做。 你想要高级的。我们要的就是高级。",
  "questions": [
    "Unsafe Rust：示例：实现 Vec的原理是什么？",
    "Unsafe Rust：示例：实现 Vec有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "rust-vec-vec",
      "url": "https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/vec/vec.md",
      "checkedAt": "2026-10-25",
      "mode": "MIT 许可中文文献收录，保留原始 Markdown"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "MIT（上游双许可中选择 MIT）"
}
---
# Unsafe Rust：示例：实现 Vec

> 收录自 Rust 秘典中文译本。原书说明其内容仍有不完整或可能过时之处；本库未编译和验证代码示例。

# 示例：实现 Vec

为了将所有的东西整合起来，我们将从头开始编写`std::Vec`。我们将限制自己使用稳定的 Rust。特别是我们不会使用任何可以让我们的代码变得更漂亮或更高效的内建指令，因为内建指令是永远不稳定的。尽管许多内建指令*确实*在其他地方变得稳定了（`std::ptr`和`std::mem`由许多内建指令组成）。

最终，这意味着我们的实现可能不会利用所有可能的优化，但它也绝不是*简陋*的。我们肯定会在细枝末节的细节上钻牛角尖，即使问题并不*真的*值得这样做。

你想要高级的。我们要的就是高级。


## 来源、版本与核验

- 来源：[示例：实现 Vec](https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/vec/vec.md)
- 作者/维护者：The Rust Project Developers 与 nomicon-zh-Hans 中文贡献者
- 获取日期：2026-10-25。固定提交 e6bf12f4d91d3a2211664f40c4b46fd3271996d6
- 收录方式：MIT 许可中文文献收录，保留原始 Markdown。文献收录；代码未实测。
- 许可：MIT（上游双许可中选择 MIT）。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/rust-originals/vec/vec.md`。
