---
{
  "schemaVersion": 2,
  "id": "wx-re-rust-what-unsafe-does",
  "title": "Unsafe Rust：Unsafe Rust 能做什么",
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
  "snapshotHash": "e5354067a112cd0a14223052f7600db0955070bfe9db2289d323c6e068971957",
  "generatedHash": "a8c6a939119dc10bea1639ffde8fd01a9d2e8bfcead0294778950b75982e5856",
  "archived": false,
  "verification": "文献收录；代码未实测",
  "l0": "- 对原始指针进行解引用 - 调用 “Unsafe” 的函数（包括 C 函数、编译器的内建指令和原始分配器。 - 实现 “Unsafe” trait - 访问或者修改可变的静态变量 - 访问 “union” 的字段 这就是全部了。这些操作被归入 unsafe 的原因是，误用其中的任何一项都会引起可怕的未定义行为。调用“未定义行为”使编译器有充分的权利对你的程",
  "l1": "- 对原始指针进行解引用 - 调用 “Unsafe” 的函数（包括 C 函数、编译器的内建指令和原始分配器。 - 实现 “Unsafe” trait - 访问或者修改可变的静态变量 - 访问 “union” 的字段 这就是全部了。这些操作被归入 unsafe 的原因是，误用其中的任何一项都会引起可怕的未定义行为。调用“未定义行为”使编译器有充分的权利对你的程序做任何坏事。你绝对*不能*调用“未定义行为”。 与 C 语言不同，Rust 中的“未定义行为”的范围相当有限。核心语言中，你只需要关心防止以下事情： - 解除引用（使用`*`运算符）悬空或不对齐的指针（见下文） - 破坏[指针别名规则][pointer aliasing rules] - 调用一个 ABI 错误的函数，或者从一个 unwind ABI 错误的函数中 unwinding - 引起[数据竞争][race] - 执行用当前执",
  "questions": [
    "Unsafe Rust：Unsafe Rust 能做什么的原理是什么？",
    "Unsafe Rust：Unsafe Rust 能做什么有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "rust-what-unsafe-does",
      "url": "https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/what-unsafe-does.md",
      "checkedAt": "2026-10-25",
      "mode": "MIT 许可中文文献收录，保留原始 Markdown"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "MIT（上游双许可中选择 MIT）"
}
---
# Unsafe Rust：Unsafe Rust 能做什么

> 收录自 Rust 秘典中文译本。原书说明其内容仍有不完整或可能过时之处；本库未编译和验证代码示例。

# Unsafe Rust 能做什么

在 Unsafe Rust 中唯一不同的是，你可以：

- 对原始指针进行解引用
- 调用 “Unsafe” 的函数（包括 C 函数、编译器的内建指令和原始分配器。
- 实现 “Unsafe” trait
- 访问或者修改可变的静态变量
- 访问 “union” 的字段

这就是全部了。这些操作被归入 unsafe 的原因是，误用其中的任何一项都会引起可怕的未定义行为。调用“未定义行为”使编译器有充分的权利对你的程序做任何坏事。你绝对*不能*调用“未定义行为”。

与 C 语言不同，Rust 中的“未定义行为”的范围相当有限。核心语言中，你只需要关心防止以下事情：

- 解除引用（使用`*`运算符）悬空或不对齐的指针（见下文）
- 破坏[指针别名规则][pointer aliasing rules]
- 调用一个 ABI 错误的函数，或者从一个 unwind ABI 错误的函数中 unwinding
- 引起[数据竞争][race]
- 执行用当前执行线程不支持的[目标特性][target features]编译的代码
- 产生无效的值（无论是单独的还是作为一个复合类型的字段，如`enum`/`struct`/`array`/`tuple`）
  - 一个不是 0 或 1 的`bool`
  - 一个具有无效判别符的`enum`
  - 一个空的`fn`指针
  - 一个超出[0x0, 0xD7FF]和[0xE000, 0x10FFFF]范围的`char`
  - 一个`!`（所有的值对这个类型都是无效的）
  - 一个从[未初始化的内存][uninitialized memory]读出的整数(`i*`/`u*`)、浮点值(`f*`)或原始指针，或`str`中的未初始化的内存
  - 一个悬空的、不对齐的、或指向无效值的引用/`Box`
  - 一个胖指针、`Box`或原始指针，具有无效的元数据：
    - 如果一个`dyn Trait`指针 / 引用指向的 vtable 和对应 Trait 的 vtable 不匹配，那么`dyn Trait`的元数据是无效的
    - 如果 Slice 的长度不是有效的 usize（比如，从未初始化的内存中读取的 usize），那么 Slice 的元数据是无效的
  - 一个由类型自定义的无效值，比如在标准库中的[`NonNull`]和`NonZero*`(自定义无效值是一个不稳定的特性，但一些稳定的 libstd 类型，如`NonNull`使用了这个特性)。

如果你想要了解更多关于“未定义行为”的信息，可以参考 [Rust 参考手册](https://www.rustwiki.org.cn/zh-CN/reference/behavior-considered-undefined.html)。

赋值、传递给一个函数/原始操作、从一个函数/原始操作返回的时候，都会“产生”一个值。

如果一个引用/指针是空的，或者它所指向的地址并非都是合法的地址（合法地址都应该是已分配内存的），那么它就是`悬垂`的。它所指向的范围是由指针值和被指向类型的大小决定的（使用`size_of_val`）。因此，如果指向的范围是空的，`悬垂`与`空`是一样的。要注意，切片和字符串指向它们的整个范围，所以它们元数据中的长度不能太大。内存分配的长度、切片和字符串的长度不能大于`isize::MAX`字节。如果因为某些原因，这太麻烦了，可以考虑使用原始指针。

这就是所有 Rust 中可能会导致未定义行为的原因。当然，unsafe 的函数和 trait 可以自由地声明任意的其他约束，程序必须保持这些约束以避免未定义行为。例如，分配器 API 声明，释放未分配的内存是未定义行为。

然而，对这些约束的违反通常只会导致上述问题中的一个，一些额外的约束也可能来自于编译器，编译器为优化代码做出了特殊的假设。例如，Vec 和 Box 使用了内建指令，要求他们的指针在任何时候都是非空的。

Rust 在其他方面对其他可疑的操作是相当宽容的。Rust 认为以下情况是“安全的”：

- 死锁
- 有一个[数据竞争][race]
- 内存泄漏
- 整数溢出（使用内置的运算符，比如“+”）
- 中止程序
- 删除生产数据库

如果你想了解更多信息，可以参考 [Rust 参考手册](https://www.rustwiki.org.cn/zh-CN/reference/behavior-not-considered-unsafe.html)。

然而任何真正可能做这种事情的程序都是*可能*不正确的，Rust 提供了很多工具来尽可能检查出这些问题，但要这些问题完全被预防是不现实的。

[pointer aliasing rules]: references.html
[uninitialized memory]: uninitialized.html
[race]: races.html
[target features]: https://doc.rust-lang.org/reference/attributes/codegen.html#the-target_feature-attribute
[`nonnull`]: https://doc.rust-lang.org/std/ptr/struct.NonNull.html


## 来源、版本与核验

- 来源：[Unsafe Rust 能做什么](https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/what-unsafe-does.md)
- 作者/维护者：The Rust Project Developers 与 nomicon-zh-Hans 中文贡献者
- 获取日期：2026-10-25。固定提交 e6bf12f4d91d3a2211664f40c4b46fd3271996d6
- 收录方式：MIT 许可中文文献收录，保留原始 Markdown。文献收录；代码未实测。
- 许可：MIT（上游双许可中选择 MIT）。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/rust-originals/what-unsafe-does.md`。
