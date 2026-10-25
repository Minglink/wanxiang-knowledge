---
{
  "schemaVersion": 2,
  "id": "wx-re-rust-unbounded-lifetimes",
  "title": "Unsafe Rust：不受约束的生命周期",
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
  "snapshotHash": "ad2fa11b5b941616c97adf6804ef2c97b4e19226a06f800e61f0af5b354c9190",
  "generatedHash": "08c9e77da44f7895d6e61fd58da833759655a4b058dddbece09a3475d018aed9",
  "archived": false,
  "verification": "文献收录；代码未实测",
  "l0": "不安全的代码经常会凭空产生引用或生命周期，这种生命周期是以*无约束*的形式出现在世界中的。最常见的原因是对原始指针的解引用，这产生了一个具有无约束生命周期的引用。这样的生命周期会随着上下文的要求而变大。这实际上比简单地标记为`'static`更强大，因为例如`&'static &'a T`将无法通过类型检查，但无约束的生命周期将根据需要完美地塑造为`&'a ",
  "l1": "不安全的代码经常会凭空产生引用或生命周期，这种生命周期是以*无约束*的形式出现在世界中的。最常见的原因是对原始指针的解引用，这产生了一个具有无约束生命周期的引用。这样的生命周期会随着上下文的要求而变大。这实际上比简单地标记为`'static`更强大，因为例如`&'static &'a T`将无法通过类型检查，但无约束的生命周期将根据需要完美地塑造为`&'a &'a T`。然而，对于大多数意图和目的来说，这样的无约束生命周期可以被看作是`'static`。 几乎没有引用是`'static`的，所以这可能是错误的。`transmute`和`transmute_copy`是另外两个主要的违规者。我们应该尽可能快地约束一个无约束的生命周期，特别是当跨越函数边界的时候。 给定一个函数，任何不来自输入的输出生命周期都是无约束的，比如说： 避免无约束生命周期的最简单方法是在函数边界使用生命周期省略。如果",
  "questions": [
    "Unsafe Rust：不受约束的生命周期的原理是什么？",
    "Unsafe Rust：不受约束的生命周期有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "rust-unbounded-lifetimes",
      "url": "https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/unbounded-lifetimes.md",
      "checkedAt": "2026-10-25",
      "mode": "MIT 许可中文文献收录，保留原始 Markdown"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "MIT（上游双许可中选择 MIT）"
}
---
# Unsafe Rust：不受约束的生命周期

> 收录自 Rust 秘典中文译本。原书说明其内容仍有不完整或可能过时之处；本库未编译和验证代码示例。

# 不受约束的生命周期

不安全的代码经常会凭空产生引用或生命周期，这种生命周期是以*无约束*的形式出现在世界中的。最常见的原因是对原始指针的解引用，这产生了一个具有无约束生命周期的引用。这样的生命周期会随着上下文的要求而变大。这实际上比简单地标记为`'static`更强大，因为例如`&'static &'a T`将无法通过类型检查，但无约束的生命周期将根据需要完美地塑造为`&'a &'a T`。然而，对于大多数意图和目的来说，这样的无约束生命周期可以被看作是`'static`。

几乎没有引用是`'static`的，所以这可能是错误的。`transmute`和`transmute_copy`是另外两个主要的违规者。我们应该尽可能快地约束一个无约束的生命周期，特别是当跨越函数边界的时候。

给定一个函数，任何不来自输入的输出生命周期都是无约束的，比如说：

<!-- no_run: This example exhibits undefined behavior. -->
```rust,no_run
fn get_str<'a>(s: *const String) -> &'a str {
    unsafe { &*s }
}
fn main() {
    let soon_dropped = String::from("hello");
    let dangling = get_str(&soon_dropped);
    drop(soon_dropped);
    println!("Invalid str: {}", dangling); // Invalid str: gӚ_`
}
```

避免无约束生命周期的最简单方法是在函数边界使用生命周期省略。如果一个输出的生命周期被省略了，那么它*必须*被一个输入的生命周期所约束。当然，它也可能被错误的生命周期所约束，但这通常只会引起编译错误，而不是让内存安全被简单地违反。

在一个函数中，对生命周期的约束更容易出错。约束生命周期的最安全和最简单的方法是从一个具有约束的生命周期的函数中返回它。然而，如果这样做是不可接受的，可以将引用放在一个有特定生命周期的位置。不幸的是，我们不可能命名一个函数中涉及的所有生命周期。


## 来源、版本与核验

- 来源：[不受约束的生命周期](https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/unbounded-lifetimes.md)
- 作者/维护者：The Rust Project Developers 与 nomicon-zh-Hans 中文贡献者
- 获取日期：2026-10-25。固定提交 e6bf12f4d91d3a2211664f40c4b46fd3271996d6
- 收录方式：MIT 许可中文文献收录，保留原始 Markdown。文献收录；代码未实测。
- 许可：MIT（上游双许可中选择 MIT）。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/rust-originals/unbounded-lifetimes.md`。
