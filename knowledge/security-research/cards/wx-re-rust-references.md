---
{
  "schemaVersion": 2,
  "id": "wx-re-rust-references",
  "title": "Unsafe Rust：引用",
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
  "snapshotHash": "4dd3e44b732566230c9961b5eafbc9696647865cca80adafcadbb93297249927",
  "generatedHash": "b4f7450585adf2283e9d0ded29f8ed718de63b3fc576346922816021d217b38b",
  "archived": false,
  "verification": "文献收录；代码未实测",
  "l0": "* 一个引用的生命周期不能超过它所引用对象的生命周期 * 一个可变的引用不能有别名 这就是引用所遵循的整个模型。 当然，我们也许应该定义*别名*的含义： 不幸的是，Rust 还没有真正定义其别名模型。🙀 在我们等待 Rust 的设计者明确他们语言的语义时，让我们用下一节来讨论下在一般场景下别名到底是什么，以及它为什么重要。",
  "l1": "* 一个引用的生命周期不能超过它所引用对象的生命周期 * 一个可变的引用不能有别名 这就是引用所遵循的整个模型。 当然，我们也许应该定义*别名*的含义： 不幸的是，Rust 还没有真正定义其别名模型。🙀 在我们等待 Rust 的设计者明确他们语言的语义时，让我们用下一节来讨论下在一般场景下别名到底是什么，以及它为什么重要。",
  "questions": [
    "Unsafe Rust：引用的原理是什么？",
    "Unsafe Rust：引用有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "rust-references",
      "url": "https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/references.md",
      "checkedAt": "2026-10-25",
      "mode": "MIT 许可中文文献收录，保留原始 Markdown"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "MIT（上游双许可中选择 MIT）"
}
---
# Unsafe Rust：引用

> 收录自 Rust 秘典中文译本。原书说明其内容仍有不完整或可能过时之处；本库未编译和验证代码示例。

# 引用

有两种类型的引用：

* 共享的引用：`&`
* 可变引用：`&mut`

它们遵守以下规则：

* 一个引用的生命周期不能超过它所引用对象的生命周期
* 一个可变的引用不能有别名

这就是引用所遵循的整个模型。

当然，我们也许应该定义*别名*的含义：

```text
error[E0425]: cannot find value `aliased` in this scope
 --> <rust.rs>:2:20
  |
2 |     println!("{}", aliased);
  |                    ^^^^^^^ not found in this scope

error: aborting due to previous error
```

不幸的是，Rust 还没有真正定义其别名模型。🙀

在我们等待 Rust 的设计者明确他们语言的语义时，让我们用下一节来讨论下在一般场景下别名到底是什么，以及它为什么重要。


## 来源、版本与核验

- 来源：[引用](https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/references.md)
- 作者/维护者：The Rust Project Developers 与 nomicon-zh-Hans 中文贡献者
- 获取日期：2026-10-25。固定提交 e6bf12f4d91d3a2211664f40c4b46fd3271996d6
- 收录方式：MIT 许可中文文献收录，保留原始 Markdown。文献收录；代码未实测。
- 许可：MIT（上游双许可中选择 MIT）。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/rust-originals/references.md`。
