---
{
  "schemaVersion": 2,
  "id": "wx-re-rust-conversions",
  "title": "Unsafe Rust：类型转换",
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
  "snapshotHash": "84e72bc2ff634fcb98a4a03ff52c96512147481103aaf034aafcd25db01c9877",
  "generatedHash": "4e5b9abb184b65856d68c08c84045a4d8fa254eccac4cc0b2e9f48af7f3fb098",
  "archived": false,
  "verification": "文献收录；代码未实测",
  "l0": "说到底，一切都只是某处的一堆比特，而类型系统只是为了帮助我们正确使用这些比特。类型系统中有两个常见的问题：需要将这些确切的位重新解释为不同的类型，以及需要改变位以对不同的类型具有同等的意义。因为 Rust 鼓励在类型系统中对重要的属性进行编码，所以这些问题是非常普遍的。因此，Rust 给了你几种方法来解决它们。 首先，我们将看看 Safe Rust 给你提供",
  "l1": "说到底，一切都只是某处的一堆比特，而类型系统只是为了帮助我们正确使用这些比特。类型系统中有两个常见的问题：需要将这些确切的位重新解释为不同的类型，以及需要改变位以对不同的类型具有同等的意义。因为 Rust 鼓励在类型系统中对重要的属性进行编码，所以这些问题是非常普遍的。因此，Rust 给了你几种方法来解决它们。 首先，我们将看看 Safe Rust 给你提供的重新解释值的方法。最简单的方法是把一个值分解成它的组成部分，然后从它们中建立一个新的类型： 但这最好也不过是一种烦人的做法。对于常见的转换，Rust 提供了更符合人体工程学的替代方法。",
  "questions": [
    "Unsafe Rust：类型转换的原理是什么？",
    "Unsafe Rust：类型转换有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "rust-conversions",
      "url": "https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/conversions.md",
      "checkedAt": "2026-10-25",
      "mode": "MIT 许可中文文献收录，保留原始 Markdown"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "MIT（上游双许可中选择 MIT）"
}
---
# Unsafe Rust：类型转换

> 收录自 Rust 秘典中文译本。原书说明其内容仍有不完整或可能过时之处；本库未编译和验证代码示例。

# 类型转换

说到底，一切都只是某处的一堆比特，而类型系统只是为了帮助我们正确使用这些比特。类型系统中有两个常见的问题：需要将这些确切的位重新解释为不同的类型，以及需要改变位以对不同的类型具有同等的意义。因为 Rust 鼓励在类型系统中对重要的属性进行编码，所以这些问题是非常普遍的。因此，Rust 给了你几种方法来解决它们。

首先，我们将看看 Safe Rust 给你提供的重新解释值的方法。最简单的方法是把一个值分解成它的组成部分，然后从它们中建立一个新的类型：

```rust
struct Foo {
    x: u32,
    y: u16,
}

struct Bar {
    a: u32,
    b: u16,
}

fn reinterpret(foo: Foo) -> Bar {
    let Foo { x, y } = foo;
    Bar { a: x, b: y }
}
```

但这最好也不过是一种烦人的做法。对于常见的转换，Rust 提供了更符合人体工程学的替代方法。


## 来源、版本与核验

- 来源：[类型转换](https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/conversions.md)
- 作者/维护者：The Rust Project Developers 与 nomicon-zh-Hans 中文贡献者
- 获取日期：2026-10-25。固定提交 e6bf12f4d91d3a2211664f40c4b46fd3271996d6
- 收录方式：MIT 许可中文文献收录，保留原始 Markdown。文献收录；代码未实测。
- 许可：MIT（上游双许可中选择 MIT）。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/rust-originals/conversions.md`。
