---
{
  "schemaVersion": 2,
  "id": "wx-re-rust-transmutes",
  "title": "Unsafe Rust：Transmutes",
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
  "snapshotHash": "d653ea969c8089e420f8b81f3ddba12facbd33c4daec13d5cc3e4976226c8bbc",
  "generatedHash": "fc0e432e23c45154adc487b4404d38c7898be9f8238e0fbec015b597ae3105cb",
  "archived": false,
  "verification": "文献收录；代码未实测",
  "l0": "类型系统，别挡着我们的路！我们要重新解释这些比特，否则就会死掉！尽管这本书是关于做不安全的事情的，但我真的必须强调，你应该深入思考找到本节中所涉及的操作以外的另一种方法。这真的是你在 Rust 中所能做的最可怕的不安全的事情，而这基本不设防。 [`mem::transmute<T, U>`][transmute]接收一个`T`类型的值并将其重新解释为`U`类",
  "l1": "类型系统，别挡着我们的路！我们要重新解释这些比特，否则就会死掉！尽管这本书是关于做不安全的事情的，但我真的必须强调，你应该深入思考找到本节中所涉及的操作以外的另一种方法。这真的是你在 Rust 中所能做的最可怕的不安全的事情，而这基本不设防。 [`mem::transmute<T, U>`][transmute]接收一个`T`类型的值并将其重新解释为`U`类型。唯一的限制是`T`和`U`被验证为具有相同的大小。导致未定义行为的方法是令人难以置信的。 - 首先，创建一个具有无效状态的*任何*类型的实例都会导致无法真正预测的任意混乱。即使你从未对`bool`做过任何事情，也不要把`3`转化为`bool`。就是不要。 - Transmute 有一个重载的返回类型。如果你不指定返回类型，它可能会为了满足类型推导而返回一个令人惊讶的类型。 - 将一个`&`转为`&mut`是未定义行为，尽管某些用法*",
  "questions": [
    "Unsafe Rust：Transmutes的原理是什么？",
    "Unsafe Rust：Transmutes有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "rust-transmutes",
      "url": "https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/transmutes.md",
      "checkedAt": "2026-10-25",
      "mode": "MIT 许可中文文献收录，保留原始 Markdown"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "MIT（上游双许可中选择 MIT）"
}
---
# Unsafe Rust：Transmutes

> 收录自 Rust 秘典中文译本。原书说明其内容仍有不完整或可能过时之处；本库未编译和验证代码示例。

# Transmutes

类型系统，别挡着我们的路！我们要重新解释这些比特，否则就会死掉！尽管这本书是关于做不安全的事情的，但我真的必须强调，你应该深入思考找到本节中所涉及的操作以外的另一种方法。这真的是你在 Rust 中所能做的最可怕的不安全的事情，而这基本不设防。

[`mem::transmute<T, U>`][transmute]接收一个`T`类型的值并将其重新解释为`U`类型。唯一的限制是`T`和`U`被验证为具有相同的大小。导致未定义行为的方法是令人难以置信的。

- 首先，创建一个具有无效状态的*任何*类型的实例都会导致无法真正预测的任意混乱。即使你从未对`bool`做过任何事情，也不要把`3`转化为`bool`。就是不要。
- Transmute 有一个重载的返回类型。如果你不指定返回类型，它可能会为了满足类型推导而返回一个令人惊讶的类型。
- 将一个`&`转为`&mut`是未定义行为，尽管某些用法*可能*是安全的，但是需要注意，Rust 优化器可以自由地假设一个共享引用在它的生命周期内是不变的，而这种转换会违反这个假设。因此：
  - 将一个`&`转为`&mut`*总是*未定义行为
  - 不，你不能这样做
  - 不，你并不特别
- Transmute 到一个没有明确提供生命周期的引用会产生一个[无限制的寿命][unbounded lifetime]
- 当在不同的复合类型之间转换时，你必须确保它们的布局是一样的！如果布局不同，错误的字段就会被填入错误的数据，这也许仅仅让你 Debug 一阵，也可能会造成 UB（见上文）

  那么你怎么知道布局是否相同呢？对于`repr(C)`类型和`repr(transparent)`类型，布局是精确定义的。但是对于普通的`repr(Rust)`来说，它不是。即使是同一个通用类型的不同实例也可以有截然不同的布局。`Vec<i32>`和`Vec<u32>`*可能*有相同的字段顺序，也可能没有。数据布局保证了什么，或者没保证什么的细节可以参考[ UCG 工作组][ucg-layout]。

[`mem::transmute_copy<T, U>`][transmute_copy]比这个更不安全。它把`size_of<U>`字节从`T`中复制出来，并把它们解释为`U`。`mem::transmute`的大小检查没有了（因为复制出一个前缀可能是有效的），尽管`U`比`T`大是未定义行为。

当然，你也可以使用原始指针转换或`union`来获得这些函数的所有功能，并关闭 Lint 或其他基本的合理性检查。原始指针转换和`union`并不能神奇地避免上述规则。

[unbounded lifetime]: ./unbounded-lifetimes.md
[transmute]: https://doc.rust-lang.org/std/mem/fn.transmute.html
[transmute_copy]: https://doc.rust-lang.org/std/mem/fn.transmute_copy.html
[ucg-layout]: https://rust-lang.github.io/unsafe-code-guidelines/layout.html


## 来源、版本与核验

- 来源：[Transmutes](https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/transmutes.md)
- 作者/维护者：The Rust Project Developers 与 nomicon-zh-Hans 中文贡献者
- 获取日期：2026-10-25。固定提交 e6bf12f4d91d3a2211664f40c4b46fd3271996d6
- 收录方式：MIT 许可中文文献收录，保留原始 Markdown。文献收录；代码未实测。
- 许可：MIT（上游双许可中选择 MIT）。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/rust-originals/transmutes.md`。
