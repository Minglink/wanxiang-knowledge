---
{
  "schemaVersion": 2,
  "id": "wx-re-rust-vec-vec-insert-remove",
  "title": "Unsafe Rust：插入和删除",
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
  "snapshotHash": "e1ee80bc56809c20f3cc7bd9f04834f3d85cd49178aed51cc61f3e34f2bcb5e8",
  "generatedHash": "c2000000cd0d60c5966d2854880522fb90cb52367e04f4765af46bff759edcd9",
  "archived": false,
  "verification": "文献收录；代码未实测",
  "l0": "slice *不*提供的东西是`insert`和`remove`，所以我们接下来做这些。 insert 需要将目标索引的所有元素向右移动一个。要做到这一点，我们需要使用`ptr::copy`，它是 C 语言`memmove`的 Rust 版本。它将一些内存块从一个位置复制到另一个位置，正确处理源和目标重叠的情况（这在这里肯定会发生）。 如果我们在索引`i`处",
  "l1": "slice *不*提供的东西是`insert`和`remove`，所以我们接下来做这些。 insert 需要将目标索引的所有元素向右移动一个。要做到这一点，我们需要使用`ptr::copy`，它是 C 语言`memmove`的 Rust 版本。它将一些内存块从一个位置复制到另一个位置，正确处理源和目标重叠的情况（这在这里肯定会发生）。 如果我们在索引`i`处插入，我们要使用旧的 len 将`[i ... len]`转移到`[i+1 ... len+1]`。 remove 的行为方式正好相反。我们需要将所有的元素从`[i+1 ... len + 1]`转移到`[i ... len]`，使用*新的* len。",
  "questions": [
    "Unsafe Rust：插入和删除的原理是什么？",
    "Unsafe Rust：插入和删除有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "rust-vec-vec-insert-remove",
      "url": "https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/vec/vec-insert-remove.md",
      "checkedAt": "2026-10-25",
      "mode": "MIT 许可中文文献收录，保留原始 Markdown"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "MIT（上游双许可中选择 MIT）"
}
---
# Unsafe Rust：插入和删除

> 收录自 Rust 秘典中文译本。原书说明其内容仍有不完整或可能过时之处；本库未编译和验证代码示例。

# 插入和删除

slice *不*提供的东西是`insert`和`remove`，所以我们接下来做这些。

insert 需要将目标索引的所有元素向右移动一个。要做到这一点，我们需要使用`ptr::copy`，它是 C 语言`memmove`的 Rust 版本。它将一些内存块从一个位置复制到另一个位置，正确处理源和目标重叠的情况（这在这里肯定会发生）。

如果我们在索引`i`处插入，我们要使用旧的 len 将`[i ... len]`转移到`[i+1 ... len+1]`。

<!-- ignore: simplified code -->
```rust,ignore
pub fn insert(&mut self, index: usize, elem: T) {
    // 注意：`<=` 是因为我们可以把值插入到任何索引范围 ([0,length-1]) 内的位置之后
    // 这种情况等同于 push
    assert!(index <= self.len, "index out of bounds");
    if self.len == self.cap { self.grow(); }

    unsafe {
        // ptr::copy(src, dest, len) 的含义： "从 src 复制连续的 len 个元素到 dst "
        ptr::copy(
            self.ptr.as_ptr().add(index),
            self.ptr.as_ptr().add(index + 1),
            self.len - index,
        );
        ptr::write(self.ptr.as_ptr().add(index), elem);
    }

    self.len += 1;
}
```

remove 的行为方式正好相反。我们需要将所有的元素从`[i+1 ... len + 1]`转移到`[i ... len]`，使用*新的* len。

<!-- ignore: simplified code -->
```rust,ignore
pub fn remove(&mut self, index: usize) -> T {
    // 注意：使用 `<` 是因为 index 不能删除超出元素下标的范围
    assert!(index < self.len, "index out of bounds");
    unsafe {
        self.len -= 1;
        let result = ptr::read(self.ptr.as_ptr().add(index));
        ptr::copy(
            self.ptr.as_ptr().add(index + 1),
            self.ptr.as_ptr().add(index),
            self.len - index,
        );
        result
    }
}
```


## 来源、版本与核验

- 来源：[插入和删除](https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/vec/vec-insert-remove.md)
- 作者/维护者：The Rust Project Developers 与 nomicon-zh-Hans 中文贡献者
- 获取日期：2026-10-25。固定提交 e6bf12f4d91d3a2211664f40c4b46fd3271996d6
- 收录方式：MIT 许可中文文献收录，保留原始 Markdown。文献收录；代码未实测。
- 许可：MIT（上游双许可中选择 MIT）。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/rust-originals/vec/vec-insert-remove.md`。
