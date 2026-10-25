---
{
  "schemaVersion": 2,
  "id": "wx-re-rust-constructors",
  "title": "Unsafe Rust：构造",
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
  "snapshotHash": "0d8802744a53669bc5c99c6ae583f9f8b12ca6619eaed6f8ff77ae3f5d4f37ab",
  "generatedHash": "07b4d373aa178ce9684d2c69c97c58447994e412c0237635cbf845da18ed83d4",
  "archived": false,
  "verification": "文献收录；代码未实测",
  "l0": "构造一个用户定义类型的实例只有一种方法：为其命名，并一次性初始化其所有字段: 就这样。其他所有构造类型实例的方法都是在调用一个完全虚无的函数，这个函数做了一些事情，最后变成了唯一的真实构造函数。 与 C++ 不同，Rust 没有内置的各种构造函数。没有 Copy、Default、Assignment、Move 或其他构造函数。其原因是多方面的，但主要归结为 ",
  "l1": "构造一个用户定义类型的实例只有一种方法：为其命名，并一次性初始化其所有字段: 就这样。其他所有构造类型实例的方法都是在调用一个完全虚无的函数，这个函数做了一些事情，最后变成了唯一的真实构造函数。 与 C++ 不同，Rust 没有内置的各种构造函数。没有 Copy、Default、Assignment、Move 或其他构造函数。其原因是多方面的，但主要归结为 Rust 的*显式*哲学。 移动构造函数在 Rust 中是没有意义的，因为我们不允许类型“关心”它们在内存中的位置。每个类型都必须准备好被盲目地移动到内存中的其他地方。这意味着纯粹的栈上但仍可移动的侵入性链表在 Rust 中根本无法（安全地）实现。 赋值和复制构造函数也同样不存在，因为移动语义是 Rust 中唯一的语义。`x = y`最多只是把 y 的位移到 x 变量中。Rust 确实提供了两种方法来提供 C++ 的面向拷贝的语义：`C",
  "questions": [
    "Unsafe Rust：构造的原理是什么？",
    "Unsafe Rust：构造有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "rust-constructors",
      "url": "https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/constructors.md",
      "checkedAt": "2026-10-25",
      "mode": "MIT 许可中文文献收录，保留原始 Markdown"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "MIT（上游双许可中选择 MIT）"
}
---
# Unsafe Rust：构造

> 收录自 Rust 秘典中文译本。原书说明其内容仍有不完整或可能过时之处；本库未编译和验证代码示例。

# 构造

构造一个用户定义类型的实例只有一种方法：为其命名，并一次性初始化其所有字段:

```rust
struct Foo {
    a: u8,
    b: u32,
    c: bool,
}

enum Bar {
    X(u32),
    Y(bool),
}

struct Unit;

let foo = Foo { a: 0, b: 1, c: false };
let bar = Bar::X(0);
let empty = Unit;
```

就这样。其他所有构造类型实例的方法都是在调用一个完全虚无的函数，这个函数做了一些事情，最后变成了唯一的真实构造函数。

与 C++ 不同，Rust 没有内置的各种构造函数。没有 Copy、Default、Assignment、Move 或其他构造函数。其原因是多方面的，但主要归结为 Rust 的*显式*哲学。

移动构造函数在 Rust 中是没有意义的，因为我们不允许类型“关心”它们在内存中的位置。每个类型都必须准备好被盲目地移动到内存中的其他地方。这意味着纯粹的栈上但仍可移动的侵入性链表在 Rust 中根本无法（安全地）实现。

赋值和复制构造函数也同样不存在，因为移动语义是 Rust 中唯一的语义。`x = y`最多只是把 y 的位移到 x 变量中。Rust 确实提供了两种方法来提供 C++ 的面向拷贝的语义：`Copy`和`Clone`。Clone 类似我们所说的复制构造函数，但它从未被隐式调用。你必须在你想要克隆的元素上明确地调用`clone`。Copy 是 Clone 的一个特例，它的实现只是“复制比特”。Copy 类型*是*隐式克隆的，只要它们被移动；但由于 Copy 的定义，这只是意味着不把旧的变量当作未初始化的 —— 也就是说，啥都没干（no-op）。

虽然 Rust 提供了一个`Default`特性来指定了一个类似默认构造函数的东西，但这个特性很少被使用。这是因为变量[不是隐式初始化的][uninit]。 Default 基本上只对泛型编程有用。在具体环境中，一个类型将为任何类型的“默认”构造函数提供一个静态的`new`方法。这与其他语言中的`new`没有关系，也没有特殊含义。它只是一个命名惯例。

TODO: talk about "placement new"?

[uninit]: uninitialized.html


## 来源、版本与核验

- 来源：[构造](https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/constructors.md)
- 作者/维护者：The Rust Project Developers 与 nomicon-zh-Hans 中文贡献者
- 获取日期：2026-10-25。固定提交 e6bf12f4d91d3a2211664f40c4b46fd3271996d6
- 收录方式：MIT 许可中文文献收录，保留原始 Markdown。文献收录；代码未实测。
- 许可：MIT（上游双许可中选择 MIT）。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/rust-originals/constructors.md`。
