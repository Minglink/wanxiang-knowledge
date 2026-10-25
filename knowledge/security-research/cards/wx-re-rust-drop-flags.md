---
{
  "schemaVersion": 2,
  "id": "wx-re-rust-drop-flags",
  "title": "Unsafe Rust：丢弃标志",
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
  "snapshotHash": "bdefdd17083ac9b67840e02533ce832ec2dd63b8087fe48e66362d03090d312e",
  "generatedHash": "cc927835d104d86b4660f4a9fbd5a5c2e29d512574edf3e9f8217ddd20be9eb4",
  "archived": false,
  "verification": "文献收录；代码未实测",
  "l0": "上一节的例子为 Rust 引入了一个有趣的问题。我们已经看到，可以完全安全地对内存位置进行有条件的初始化、非初始化和重新初始化。对于实现了`Copy`的类型来说，这并不特别值得注意，因为它们只是一堆随机的比特。然而，带有析构器的类型是一个不同的故事。Rust 需要知道每当一个变量被赋值，或者一个变量超出范围时，是否要调用一个析构器。它怎么能用条件初始化来做到",
  "l1": "上一节的例子为 Rust 引入了一个有趣的问题。我们已经看到，可以完全安全地对内存位置进行有条件的初始化、非初始化和重新初始化。对于实现了`Copy`的类型来说，这并不特别值得注意，因为它们只是一堆随机的比特。然而，带有析构器的类型是一个不同的故事。Rust 需要知道每当一个变量被赋值，或者一个变量超出范围时，是否要调用一个析构器。它怎么能用条件初始化来做到这一点呢？ 请注意，这不是所有赋值都需要担心的问题。特别是，通过解引用的赋值会无条件地被丢弃，而相对的，在`let`中的赋值无论如何都不会被丢弃： 仅当覆盖先前初始化的变量或其子字段之一时，这才是个问题。 这种情况下，Rust 实际上是在*运行时*跟踪一个类型是否应该被丢弃。当一个变量被初始化和未初始化时，该变量的*丢弃标志*被切换。当一个变量可能需要被丢弃时，这个标志会被读取，以确定它是否应该被丢弃。 当然，通常的情况是，一个值的初始",
  "questions": [
    "Unsafe Rust：丢弃标志的原理是什么？",
    "Unsafe Rust：丢弃标志有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "rust-drop-flags",
      "url": "https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/drop-flags.md",
      "checkedAt": "2026-10-25",
      "mode": "MIT 许可中文文献收录，保留原始 Markdown"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "MIT（上游双许可中选择 MIT）"
}
---
# Unsafe Rust：丢弃标志

> 收录自 Rust 秘典中文译本。原书说明其内容仍有不完整或可能过时之处；本库未编译和验证代码示例。

# 丢弃标志

上一节的例子为 Rust 引入了一个有趣的问题。我们已经看到，可以完全安全地对内存位置进行有条件的初始化、非初始化和重新初始化。对于实现了`Copy`的类型来说，这并不特别值得注意，因为它们只是一堆随机的比特。然而，带有析构器的类型是一个不同的故事。Rust 需要知道每当一个变量被赋值，或者一个变量超出范围时，是否要调用一个析构器。它怎么能用条件初始化来做到这一点呢？

请注意，这不是所有赋值都需要担心的问题。特别是，通过解引用的赋值会无条件地被丢弃，而相对的，在`let`中的赋值无论如何都不会被丢弃：

```rust
let mut x = Box::new(0); // let 创建了一个全新的变量，所以一定(也没有必要)调用 drop
let y = &mut x;
*y = Box::new(1); // 解引用假设原先的变量已经初始化了，因此一定会 drop
```

仅当覆盖先前初始化的变量或其子字段之一时，这才是个问题。

这种情况下，Rust 实际上是在*运行时*跟踪一个类型是否应该被丢弃。当一个变量被初始化和未初始化时，该变量的*丢弃标志*被切换。当一个变量可能需要被丢弃时，这个标志会被读取，以确定它是否应该被丢弃。

当然，通常的情况是，一个值的初始化状态在程序的每一个点上都是静态已知的。如果是这种情况，那么编译器理论上可以生成更有效的代码。例如，直线型代码就有这样的*静态丢弃语义（static drop semantics）*：

```rust
let mut x = Box::new(0); // x 未初始化；仅覆盖值
let mut y = x;           // y 未初始化；仅覆盖值，并设置 x 为未初始化
x = Box::new(0);         // x 未初始化；仅覆盖值
y = x;                   // y 已初始化；销毁 y，覆盖它的值，设置 x 为未初始化
                         // y 离开作用域；y 已初始化；销毁 y
                         // x 离开作用域；x 未初始化；什么都不用做
```

类似地，所有分支都在初始化方面具有相同行为的代码具有静态丢弃语义：

```rust
# let condition = true;
let mut x = Box::new(0); // x 未初始化；仅覆盖值
if condition {
    drop(x);             // x 失去值；设置 x 为未初始化
} else {
    println!("{}", x);
    drop(x);             // x 失去值；设置 x 为未初始化
}
x = Box::new(0);         // x 未初始化；仅覆盖值
                         // x 离开作用域；x 已初始化；销毁 x
```

然而像这样的代码*需要*运行时的信息来正确地 Drop：

```rust
# let condition = true;
let x;
if condition {
    x = Box::new(0);        // x 未初始化；仅覆盖值
    println!("{}", x);
}
                            // x 离开了作用域，可能未初始化
                            // 检查 drop 标志位!
```

当然，在这种情况下，获得静态丢弃语义是很简单的：

```rust
# let condition = true;
if condition {
    let x = Box::new(0);
    println!("{}", x);
}
```

丢弃标志在栈中被跟踪。
在旧的 Rust 版本中，丢弃标志曾经是隐藏在实现`Drop`的类型中。


## 来源、版本与核验

- 来源：[丢弃标志](https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/drop-flags.md)
- 作者/维护者：The Rust Project Developers 与 nomicon-zh-Hans 中文贡献者
- 获取日期：2026-10-25。固定提交 e6bf12f4d91d3a2211664f40c4b46fd3271996d6
- 收录方式：MIT 许可中文文献收录，保留原始 Markdown。文献收录；代码未实测。
- 许可：MIT（上游双许可中选择 MIT）。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/rust-originals/drop-flags.md`。
