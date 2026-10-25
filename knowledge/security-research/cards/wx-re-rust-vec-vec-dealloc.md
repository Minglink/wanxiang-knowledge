---
{
  "schemaVersion": 2,
  "id": "wx-re-rust-vec-vec-dealloc",
  "title": "Unsafe Rust：释放内存",
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
  "snapshotHash": "b423b5b3b4707259557bb4c698dfca75bacd75d344964345c59ce8973a4a968f",
  "generatedHash": "6a8e1f671caeb77eae6f18552930369207854b092fc81f662f1b0935497452e7",
  "archived": false,
  "verification": "文献收录；代码未实测",
  "l0": "接下来我们应该实现 Drop，这样我们就不会大规模地泄漏大量的资源。最简单的方法是直接调用`pop`，直到它产生 None，然后再释放我们的 buffer。注意，如果`T: !Drop`的话，调用`pop`是不需要的。理论上，我们可以询问 Rust 是否`T` `need_drop`并省略对`pop`的调用。然而在实践中，LLVM 在做类似这样的简单的无副作",
  "l1": "接下来我们应该实现 Drop，这样我们就不会大规模地泄漏大量的资源。最简单的方法是直接调用`pop`，直到它产生 None，然后再释放我们的 buffer。注意，如果`T: !Drop`的话，调用`pop`是不需要的。理论上，我们可以询问 Rust 是否`T` `need_drop`并省略对`pop`的调用。然而在实践中，LLVM 在做类似这样的简单的无副作用的删除代码方面*非常*好，所以我就省得麻烦了，除非你注意到它没有被优化掉（在这种情况下它被优化了）。 要注意的是，当`self.cap == 0`时，我们不能调用`alloc::dealloc`，因为在这种情况下我们实际上没有分配任何内存。",
  "questions": [
    "Unsafe Rust：释放内存的原理是什么？",
    "Unsafe Rust：释放内存有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "rust-vec-vec-dealloc",
      "url": "https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/vec/vec-dealloc.md",
      "checkedAt": "2026-10-25",
      "mode": "MIT 许可中文文献收录，保留原始 Markdown"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "MIT（上游双许可中选择 MIT）"
}
---
# Unsafe Rust：释放内存

> 收录自 Rust 秘典中文译本。原书说明其内容仍有不完整或可能过时之处；本库未编译和验证代码示例。

# 释放内存

接下来我们应该实现 Drop，这样我们就不会大规模地泄漏大量的资源。最简单的方法是直接调用`pop`，直到它产生 None，然后再释放我们的 buffer。注意，如果`T: !Drop`的话，调用`pop`是不需要的。理论上，我们可以询问 Rust 是否`T` `need_drop`并省略对`pop`的调用。然而在实践中，LLVM 在做类似这样的简单的无副作用的删除代码方面*非常*好，所以我就省得麻烦了，除非你注意到它没有被优化掉（在这种情况下它被优化了）。

要注意的是，当`self.cap == 0`时，我们不能调用`alloc::dealloc`，因为在这种情况下我们实际上没有分配任何内存。

<!-- ignore: simplified code -->
```rust,ignore
impl<T> Drop for Vec<T> {
    fn drop(&mut self) {
        if self.cap != 0 {
            while let Some(_) = self.pop() { }
            let layout = Layout::array::<T>(self.cap).unwrap();
            unsafe {
                alloc::dealloc(self.ptr.as_ptr() as *mut u8, layout);
            }
        }
    }
}
```


## 来源、版本与核验

- 来源：[释放内存](https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/vec/vec-dealloc.md)
- 作者/维护者：The Rust Project Developers 与 nomicon-zh-Hans 中文贡献者
- 获取日期：2026-10-25。固定提交 e6bf12f4d91d3a2211664f40c4b46fd3271996d6
- 收录方式：MIT 许可中文文献收录，保留原始 Markdown。文献收录；代码未实测。
- 许可：MIT（上游双许可中选择 MIT）。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/rust-originals/vec/vec-dealloc.md`。
