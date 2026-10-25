---
{
  "schemaVersion": 2,
  "id": "wx-re-rust-vec-vec-drain",
  "title": "Unsafe Rust：Drain",
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
  "snapshotHash": "52e100d3585b5286e3fc6129eaae4126833694af99203e785f276183055b7fd4",
  "generatedHash": "7bad7eff06b356a8557b1a2a84c0fa78b3691996b1126d5536ce53a2d7b99262",
  "archived": false,
  "verification": "文献收录；代码未实测",
  "l0": "接下来，让我们来实现 Drain。 Drain 与 IntoIter 大体上相同，只是它不是消耗 Vec，而是借用 Vec，并且不会修改到其分配。现在我们只实现“基本”的全范围版本。 ——等等，这看着好像很眼熟？IntoIter 和 Drain 有完全相同的结构，让我们再做一些抽象： 请注意，我在这个设计中留下了一些奇怪之处，以使升级 Drain 来处理任意",
  "l1": "接下来，让我们来实现 Drain。 Drain 与 IntoIter 大体上相同，只是它不是消耗 Vec，而是借用 Vec，并且不会修改到其分配。现在我们只实现“基本”的全范围版本。 ——等等，这看着好像很眼熟？IntoIter 和 Drain 有完全相同的结构，让我们再做一些抽象： 请注意，我在这个设计中留下了一些奇怪之处，以使升级 Drain 来处理任意的子范围更容易一些。特别是我们*可以*让 RawValIter 在 drop 时 drain 自身，但这对更复杂的 Drain 来说是不合适的。我们还使用了一个 slice 来简化 Drain 的初始化。 好了，现在实现 Drain 真的很容易了： 关于`mem::forget`问题的更多细节，参见[关于泄漏的章节][leaks]。",
  "questions": [
    "Unsafe Rust：Drain的原理是什么？",
    "Unsafe Rust：Drain有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "rust-vec-vec-drain",
      "url": "https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/vec/vec-drain.md",
      "checkedAt": "2026-10-25",
      "mode": "MIT 许可中文文献收录，保留原始 Markdown"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "MIT（上游双许可中选择 MIT）"
}
---
# Unsafe Rust：Drain

> 收录自 Rust 秘典中文译本。原书说明其内容仍有不完整或可能过时之处；本库未编译和验证代码示例。

# Drain

接下来，让我们来实现 Drain。 Drain 与 IntoIter 大体上相同，只是它不是消耗 Vec，而是借用 Vec，并且不会修改到其分配。现在我们只实现“基本”的全范围版本。

<!-- ignore: simplified code -->

```rust,ignore
use std::marker::PhantomData;

struct Drain<'a, T: 'a> {
    // 这里需要限制生命周期, 因此我们使用了 `&'a mut Vec<T>`，
    // 也就是我们语义上包含的内容，
    // 我们只会调用 `pop()` 和 `remove(0)` 两个方法
    vec: PhantomData<&'a mut Vec<T>>,
    start: *const T,
    end: *const T,
}

impl<'a, T> Iterator for Drain<'a, T> {
    type Item = T;
    fn next(&mut self) -> Option<T> {
        if self.start == self.end {
            None
```

——等等，这看着好像很眼熟？IntoIter 和 Drain 有完全相同的结构，让我们再做一些抽象：

<!-- ignore: simplified code -->

```rust,ignore
struct RawValIter<T> {
    start: *const T,
    end: *const T,
}

impl<T> RawValIter<T> {
    // 构建 RawValIter 是不安全的，因为它没有关联的生命周期，
    // 将 RawValIter 存储在与它实际分配相同的结构体中是非常有必要的，
    // 但这里是具体的实现细节，不用对外公开
    unsafe fn new(slice: &[T]) -> Self {
        RawValIter {
            start: slice.as_ptr(),
            end: if slice.len() == 0 {
                // 如果 `len = 0`, 说明没有分配内存，需要避免使用 offset，
                // 因为那样会给 LLVM 的 GEP 传递错误的信息
                slice.as_ptr()
            } else {
                slice.as_ptr().add(slice.len())
            }
        }
    }
}

// Iterator 和 DoubleEndedIterator 和 IntoIter 实现起来很类似
```

IntoIter 我们可以改成这样：

<!-- ignore: simplified code -->

```rust,ignore
pub struct IntoIter<T> {
    _buf: RawVec<T>,
    iter: RawValIter<T>,
}

impl<T> Iterator for IntoIter<T> {
    type Item = T;
    fn next(&mut self) -> Option<T> { self.iter.next() }
    fn size_hint(&self) -> (usize, Option<usize>) { self.iter.size_hint() }
}

impl<T> DoubleEndedIterator for IntoIter<T> {
    fn next_back(&mut self) -> Option<T> { self.iter.next_back() }
}

impl<T> Drop for IntoIter<T> {
    fn drop(&mut self) {
        for _ in &mut *self {}
    }
}

impl<T> IntoIterator for Vec<T> {
    type Item = T;
    type IntoIter = IntoIter<T>;
    fn into_iter(self) -> IntoIter<T> {
        unsafe {
            let iter = RawValIter::new(&self);

            let buf = ptr::read(&self.buf);
            mem::forget(self);

            IntoIter {
                iter,
                _buf: buf,
            }
        }
    }
}
```

请注意，我在这个设计中留下了一些奇怪之处，以使升级 Drain 来处理任意的子范围更容易一些。特别是我们*可以*让 RawValIter 在 drop 时 drain 自身，但这对更复杂的 Drain 来说是不合适的。我们还使用了一个 slice 来简化 Drain 的初始化。

好了，现在实现 Drain 真的很容易了：

<!-- ignore: simplified code -->

```rust,ignore
use std::marker::PhantomData;

pub struct Drain<'a, T: 'a> {
    vec: PhantomData<&'a mut Vec<T>>,
    iter: RawValIter<T>,
}

impl<'a, T> Iterator for Drain<'a, T> {
    type Item = T;
    fn next(&mut self) -> Option<T> { self.iter.next() }
    fn size_hint(&self) -> (usize, Option<usize>) { self.iter.size_hint() }
}

impl<'a, T> DoubleEndedIterator for Drain<'a, T> {
    fn next_back(&mut self) -> Option<T> { self.iter.next_back() }
}

impl<'a, T> Drop for Drain<'a, T> {
    fn drop(&mut self) {
        for _ in &mut *self {}
    }
}

impl<T> Vec<T> {
    pub fn drain(&mut self) -> Drain<T> {
        let iter = unsafe { RawValIter::new(&self) };

        // 这里事关 mem::forget 的安全。
        // 如果 Drain 被 forget，我们就会泄露整个 Vec 的内存，
        // 既然我们始终要做这一步，为何不在这里完成呢？
        self.len = 0;

        Drain {
            iter: iter,
            vec: PhantomData,
        }
    }
}
```

关于`mem::forget`问题的更多细节，参见[关于泄漏的章节][leaks]。

[leaks]: ../leaking.html


## 来源、版本与核验

- 来源：[Drain](https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/vec/vec-drain.md)
- 作者/维护者：The Rust Project Developers 与 nomicon-zh-Hans 中文贡献者
- 获取日期：2026-10-25。固定提交 e6bf12f4d91d3a2211664f40c4b46fd3271996d6
- 收录方式：MIT 许可中文文献收录，保留原始 Markdown。文献收录；代码未实测。
- 许可：MIT（上游双许可中选择 MIT）。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/rust-originals/vec/vec-drain.md`。
