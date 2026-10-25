---
{
  "schemaVersion": 2,
  "id": "wx-re-rust-vec-vec-deref",
  "title": "Unsafe Rust：Deref",
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
  "snapshotHash": "4438c5b91e5647fbd30912eeabf3e154d9dabd6e9f817c8c5328bdc9ee1f960d",
  "generatedHash": "b322863240883c3b0c82d60052c25c4ca8be96ab54aea1cf77cfabeae9094c2a",
  "archived": false,
  "verification": "文献收录；代码未实测",
  "l0": "好了！我们已经实现了一个基本像样的栈。我们可以 push 和 pop，我们还可以自己 drop。然而，我们还需要一大堆的功能。特别是， 尽管我们有了一个合适的数组，但还没有切片的功能。这其实很容易解决：我们可以实现`Deref<Target=[T]>`。这将神奇地使我们的 Vec 在各种条件下强制成为一个切片，并且表现得像一个切片。 我们只需要`slice:",
  "l1": "好了！我们已经实现了一个基本像样的栈。我们可以 push 和 pop，我们还可以自己 drop。然而，我们还需要一大堆的功能。特别是， 尽管我们有了一个合适的数组，但还没有切片的功能。这其实很容易解决：我们可以实现`Deref<Target=[T]>`。这将神奇地使我们的 Vec 在各种条件下强制成为一个切片，并且表现得像一个切片。 我们只需要`slice::from_raw_parts`。它将为我们正确处理空切片。之后当我们设置了零大小的类型支持，它也会对这些类型进行正确的处理。 现在我们有了`len`、`first`、`last`、索引、切片、排序、`iter`、`iter_mut`，以及 slice 提供的其他各种功能啦！",
  "questions": [
    "Unsafe Rust：Deref的原理是什么？",
    "Unsafe Rust：Deref有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "rust-vec-vec-deref",
      "url": "https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/vec/vec-deref.md",
      "checkedAt": "2026-10-25",
      "mode": "MIT 许可中文文献收录，保留原始 Markdown"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "MIT（上游双许可中选择 MIT）"
}
---
# Unsafe Rust：Deref

> 收录自 Rust 秘典中文译本。原书说明其内容仍有不完整或可能过时之处；本库未编译和验证代码示例。

# Deref

好了！我们已经实现了一个基本像样的栈。我们可以 push 和 pop，我们还可以自己 drop。然而，我们还需要一大堆的功能。特别是， 尽管我们有了一个合适的数组，但还没有切片的功能。这其实很容易解决：我们可以实现`Deref<Target=[T]>`。这将神奇地使我们的 Vec 在各种条件下强制成为一个切片，并且表现得像一个切片。

我们只需要`slice::from_raw_parts`。它将为我们正确处理空切片。之后当我们设置了零大小的类型支持，它也会对这些类型进行正确的处理。

<!-- ignore: simplified code -->
```rust,ignore
use std::ops::Deref;

impl<T> Deref for Vec<T> {
    type Target = [T];
    fn deref(&self) -> &[T] {
        unsafe {
            std::slice::from_raw_parts(self.ptr.as_ptr(), self.len)
        }
    }
}
```

还有 DerefMut：

<!-- ignore: simplified code -->
```rust,ignore
use std::ops::DerefMut;

impl<T> DerefMut for Vec<T> {
    fn deref_mut(&mut self) -> &mut [T] {
        unsafe {
            std::slice::from_raw_parts_mut(self.ptr.as_ptr(), self.len)
        }
    }
}
```

现在我们有了`len`、`first`、`last`、索引、切片、排序、`iter`、`iter_mut`，以及 slice 提供的其他各种功能啦！


## 来源、版本与核验

- 来源：[Deref](https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/vec/vec-deref.md)
- 作者/维护者：The Rust Project Developers 与 nomicon-zh-Hans 中文贡献者
- 获取日期：2026-10-25。固定提交 e6bf12f4d91d3a2211664f40c4b46fd3271996d6
- 收录方式：MIT 许可中文文献收录，保留原始 Markdown。文献收录；代码未实测。
- 许可：MIT（上游双许可中选择 MIT）。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/rust-originals/vec/vec-deref.md`。
