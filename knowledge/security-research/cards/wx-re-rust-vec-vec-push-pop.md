---
{
  "schemaVersion": 2,
  "id": "wx-re-rust-vec-vec-push-pop",
  "title": "Unsafe Rust：Push 和 Pop",
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
  "snapshotHash": "d6286560478872bc6ee2a10dac3acf536aa8bf1d05ecae240e0033db9f40f99a",
  "generatedHash": "80a3854f1f1f9cfb3ed37de099bc6016f7b14c122ba08ec7b3b86b8526b37478",
  "archived": false,
  "verification": "文献收录；代码未实测",
  "l0": "好了，我们现在可以初始化，也可以分配了。让我们实际实现一些功能吧! 让我们从`push`开始。它所需要做的就是检查我们是否已经满了并 grow，然后无条件地写到下一个索引，接着增加我们的长度。 在写入时，我们必须注意不要对我们想要写入的内存做解引用。最坏的情况是，它是来自分配器的真正未初始化的内存（里面是垃圾值）。最好的情况是，它是我们 pop 出的一些旧值",
  "l1": "好了，我们现在可以初始化，也可以分配了。让我们实际实现一些功能吧! 让我们从`push`开始。它所需要做的就是检查我们是否已经满了并 grow，然后无条件地写到下一个索引，接着增加我们的长度。 在写入时，我们必须注意不要对我们想要写入的内存做解引用。最坏的情况是，它是来自分配器的真正未初始化的内存（里面是垃圾值）。最好的情况是，它是我们 pop 出的一些旧值的地址。无论是哪种情况，我们都不能索引到那个地址并解引用，因为这将把该内存认为是一个 T 类型的存活的实例；更糟的是，`foo[idx] = x`会试图在`foo[idx]`的旧值上调用`drop`! 正确的方法是使用`ptr::write`，它只是盲目地用我们提供的值的位来覆盖目标地址，而不会对该地址做解引用。 对于`push`，如果旧的 len（在 push 被调用之前）是 0，那么我们正好想写到第 0 个索引，所以我们应该用旧的 ",
  "questions": [
    "Unsafe Rust：Push 和 Pop的原理是什么？",
    "Unsafe Rust：Push 和 Pop有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "rust-vec-vec-push-pop",
      "url": "https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/vec/vec-push-pop.md",
      "checkedAt": "2026-10-25",
      "mode": "MIT 许可中文文献收录，保留原始 Markdown"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "MIT（上游双许可中选择 MIT）"
}
---
# Unsafe Rust：Push 和 Pop

> 收录自 Rust 秘典中文译本。原书说明其内容仍有不完整或可能过时之处；本库未编译和验证代码示例。

# Push 和 Pop

好了，我们现在可以初始化，也可以分配了。让我们实际实现一些功能吧! 让我们从`push`开始。它所需要做的就是检查我们是否已经满了并 grow，然后无条件地写到下一个索引，接着增加我们的长度。

在写入时，我们必须注意不要对我们想要写入的内存做解引用。最坏的情况是，它是来自分配器的真正未初始化的内存（里面是垃圾值）。最好的情况是，它是我们 pop 出的一些旧值的地址。无论是哪种情况，我们都不能索引到那个地址并解引用，因为这将把该内存认为是一个 T 类型的存活的实例；更糟的是，`foo[idx] = x`会试图在`foo[idx]`的旧值上调用`drop`!

正确的方法是使用`ptr::write`，它只是盲目地用我们提供的值的位来覆盖目标地址，而不会对该地址做解引用。

对于`push`，如果旧的 len（在 push 被调用之前）是 0，那么我们正好想写到第 0 个索引，所以我们应该用旧的 len 来作为写入的索引。

<!-- ignore: simplified code -->

```rust,ignore
pub fn push(&mut self, elem: T) {
    if self.len == self.cap { self.grow(); }

    unsafe {
        ptr::write(self.ptr.as_ptr().add(self.len), elem);
    }

    // 不可能出错，因为出错之前一定会 OOM(out of memory)
    self.len += 1;
}
```

是不是很简单! 那么`pop`呢？虽然这次我们要访问的索引被初始化了，但 Rust 不会让我们直接解构内存的位置来把实例移动（move）出去，因为这将使内存未被初始化（译者注：和 push 一样，如果 pop 出的是在 Vec 的内存中的值，那么当这个值被丢弃后，Vec 的这块内存会被 drop，这就出大事了）! 为此我们需要`ptr::read`，它只是从目标地址复制出 bit，并将其解释为 T 类型的值。这将使这个地址的内存在逻辑上未被初始化，尽管事实上那里有一个完美的 T 的实例。

对于`pop`，举个例子，如果旧的 len 是 1，那我们正好想从第 0 个索引中读出，所以我们应该用新的 len 来作为读出的索引。

<!-- ignore: simplified code -->

```rust,ignore
pub fn pop(&mut self) -> Option<T> {
    if self.len == 0 {
        None
    } else {
        self.len -= 1;
        unsafe {
            Some(ptr::read(self.ptr.as_ptr().add(self.len)))
        }
    }
}
```


## 来源、版本与核验

- 来源：[Push 和 Pop](https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/vec/vec-push-pop.md)
- 作者/维护者：The Rust Project Developers 与 nomicon-zh-Hans 中文贡献者
- 获取日期：2026-10-25。固定提交 e6bf12f4d91d3a2211664f40c4b46fd3271996d6
- 收录方式：MIT 许可中文文献收录，保留原始 Markdown。文献收录；代码未实测。
- 许可：MIT（上游双许可中选择 MIT）。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/rust-originals/vec/vec-push-pop.md`。
