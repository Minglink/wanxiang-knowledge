---
{
  "schemaVersion": 2,
  "id": "wx-re-rust-arc-mutex-arc-layout",
  "title": "Unsafe Rust：布局",
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
  "snapshotHash": "68d922a08301b35fdee4487190ecc562c7534d0fff0a882a8193c266d47a5bca",
  "generatedHash": "146dc9b9fafedb0f7f6dcc6780133d98c3c3f7d86ed51419e5cc3a36747f8203",
  "archived": false,
  "verification": "文献收录；代码未实测",
  "l0": "让我们开始为我们的`Arc`的实现做布局。 一个`Arc<T>`为`T`类型的值提供了线程安全的共享所有权，并在堆中分配。在 Rust 中，共享意味着不变性，所以我们不需要设计任何东西来管理对该值的访问，对吧？虽然像 Mutex 这样的内部可变性类型允许 Arc 的用户创建共享可变性，但 Arc 本身并不需要关注这些问题。 然而，有一个地方 Arc 需要关注",
  "l1": "让我们开始为我们的`Arc`的实现做布局。 一个`Arc<T>`为`T`类型的值提供了线程安全的共享所有权，并在堆中分配。在 Rust 中，共享意味着不变性，所以我们不需要设计任何东西来管理对该值的访问，对吧？虽然像 Mutex 这样的内部可变性类型允许 Arc 的用户创建共享可变性，但 Arc 本身并不需要关注这些问题。 然而，有一个地方 Arc 需要关注可变：销毁。当 Arc 的所有所有者都销毁时，我们需要能够`drop`其内容并释放其分配。所以我们需要一种方法让所有者知道它是否是最后一个所有者，而最简单的方法就是对所有者进行计数——引用计数。 不幸的是，这种引用计数本质上是共享的可变状态，所以 Arc _需要_ 考虑同步问题。我们可以为此使用 Mutex，但那太过于杀鸡用牛刀了。相反，我们将使用 atomics。既然每个人都需要一个指向 T 的分配的指针，我们也可以把引用计数放在同一",
  "questions": [
    "Unsafe Rust：布局的原理是什么？",
    "Unsafe Rust：布局有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "rust-arc-mutex-arc-layout",
      "url": "https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/arc-mutex/arc-layout.md",
      "checkedAt": "2026-10-25",
      "mode": "MIT 许可中文文献收录，保留原始 Markdown"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "MIT（上游双许可中选择 MIT）"
}
---
# Unsafe Rust：布局

> 收录自 Rust 秘典中文译本。原书说明其内容仍有不完整或可能过时之处；本库未编译和验证代码示例。

# 布局

让我们开始为我们的`Arc`的实现做布局。

一个`Arc<T>`为`T`类型的值提供了线程安全的共享所有权，并在堆中分配。在 Rust 中，共享意味着不变性，所以我们不需要设计任何东西来管理对该值的访问，对吧？虽然像 Mutex 这样的内部可变性类型允许 Arc 的用户创建共享可变性，但 Arc 本身并不需要关注这些问题。

然而，有一个地方 Arc 需要关注可变：销毁。当 Arc 的所有所有者都销毁时，我们需要能够`drop`其内容并释放其分配。所以我们需要一种方法让所有者知道它是否是最后一个所有者，而最简单的方法就是对所有者进行计数——引用计数。

不幸的是，这种引用计数本质上是共享的可变状态，所以 Arc _需要_ 考虑同步问题。我们可以为此使用 Mutex，但那太过于杀鸡用牛刀了。相反，我们将使用 atomics。既然每个人都需要一个指向 T 的分配的指针，我们也可以把引用计数放在同一个分配中。

直观地说，它看起来就像这样：

```rust
use std::sync::atomic;

pub struct Arc<T> {
    ptr: *mut ArcInner<T>,
}

pub struct ArcInner<T> {
    rc: atomic::AtomicUsize,
    data: T,
}
```

这可以编译通过，然而它是不正确的。首先，编译器会给我们太严格的可变性。例如，在期望使用`Arc<&'a str>`的地方不能使用`Arc<&'static str>`。更重要的是，它将给 drop checker 提供不正确的所有权信息，因为它将假定我们不拥有任何`T`类型的值。由于这是一个提供值的共享所有权的结构，在某些时候会有一个完全拥有其数据的结构实例。参见[关于所有权和生命周期的章节](https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/ownership.md)，了解关于变异和 drop checker 的所有细节。

为了解决第一个问题，我们可以使用`NonNull<T>`。请注意，`NonNull<T>`是一个围绕原始指针的包装，并声明以下内容：

* 我们是`T`的协变
* 我们的指针从不为空

为了解决第二个问题，我们可以包含一个包含`ArcInner<T>`的`PhantomData`标记。这将告诉 drop checker，我们对`ArcInner<T>`（它本身包含`T`）的值有一些所有权的概念。

通过这些改变，我们得到了最终的结构：

```rust
use std::marker::PhantomData;
use std::ptr::NonNull;
use std::sync::atomic::AtomicUsize;

pub struct Arc<T> {
    ptr: NonNull<ArcInner<T>>,
    phantom: PhantomData<ArcInner<T>>,
}

pub struct ArcInner<T> {
    rc: AtomicUsize,
    data: T,
}
```


## 来源、版本与核验

- 来源：[布局](https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/arc-mutex/arc-layout.md)
- 作者/维护者：The Rust Project Developers 与 nomicon-zh-Hans 中文贡献者
- 获取日期：2026-10-25。固定提交 e6bf12f4d91d3a2211664f40c4b46fd3271996d6
- 收录方式：MIT 许可中文文献收录，保留原始 Markdown。文献收录；代码未实测。
- 许可：MIT（上游双许可中选择 MIT）。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/rust-originals/arc-mutex/arc-layout.md`。
