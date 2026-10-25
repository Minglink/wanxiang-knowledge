---
{
  "schemaVersion": 2,
  "id": "wx-re-rust-coercions",
  "title": "Unsafe Rust：强转",
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
  "snapshotHash": "9f336d68b25617a1b68554d65e3c4aed57ad33662db4254194fcd842be1b3eb8",
  "generatedHash": "9429de56efcdc0a9e8e49e64693b5d4844474306f2698dde7f7e850a79662bd9",
  "archived": false,
  "verification": "文献收录；代码未实测",
  "l0": "在某些情况下，类型可以隐式地被强转。这些变化通常只是*削弱*类型，主要集中在指针和生命周期方面。它们的存在主要是为了让 Rust 在更多的情况下“正常工作”，而且基本上是无害的。 关于所有强转类型的详尽列表，请参见《The Reference》中的[Coercion types]部分。 请注意，在匹配 Trait 时，我们不进行强制转换（除了接收者，见[下一",
  "l1": "在某些情况下，类型可以隐式地被强转。这些变化通常只是*削弱*类型，主要集中在指针和生命周期方面。它们的存在主要是为了让 Rust 在更多的情况下“正常工作”，而且基本上是无害的。 关于所有强转类型的详尽列表，请参见《The Reference》中的[Coercion types]部分。 请注意，在匹配 Trait 时，我们不进行强制转换（除了接收者，见[下一页][dot-operator]）。如果某个类型`U`有一个`impl`，而`T`可以强转到`U`，这并不构成`T`的实现。例如，下面的内容不会通过类型检查，尽管将`t`强转到`&T`是可以的，并且有针对`&T`的`impl`。",
  "questions": [
    "Unsafe Rust：强转的原理是什么？",
    "Unsafe Rust：强转有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "rust-coercions",
      "url": "https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/coercions.md",
      "checkedAt": "2026-10-25",
      "mode": "MIT 许可中文文献收录，保留原始 Markdown"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "MIT（上游双许可中选择 MIT）"
}
---
# Unsafe Rust：强转

> 收录自 Rust 秘典中文译本。原书说明其内容仍有不完整或可能过时之处；本库未编译和验证代码示例。

# 强转

在某些情况下，类型可以隐式地被强转。这些变化通常只是*削弱*类型，主要集中在指针和生命周期方面。它们的存在主要是为了让 Rust 在更多的情况下“正常工作”，而且基本上是无害的。

关于所有强转类型的详尽列表，请参见《The Reference》中的[Coercion types]部分。

请注意，在匹配 Trait 时，我们不进行强制转换（除了接收者，见[下一页][dot-operator]）。如果某个类型`U`有一个`impl`，而`T`可以强转到`U`，这并不构成`T`的实现。例如，下面的内容不会通过类型检查，尽管将`t`强转到`&T`是可以的，并且有针对`&T`的`impl`。

```rust,compile_fail
trait Trait {}

fn foo<X: Trait>(t: X) {}

impl<'a> Trait for &'a i32 {}

fn main() {
    let t: &mut i32 = &mut 0;
    foo(t);
}
```

这样编译失败：

```text
error[E0277]: the trait bound `&mut i32: Trait` is not satisfied
 --> src/main.rs:9:9
  |
3 | fn foo<X: Trait>(t: X) {}
  |           ----- required by this bound in `foo`
...
9 |     foo(t);
  |         ^ the trait `Trait` is not implemented for `&mut i32`
  |
  = help: the following implementations were found:
            <&'a i32 as Trait>
  = note: `Trait` is implemented for `&i32`, but not for `&mut i32`
```

[Coercion types]: https://doc.rust-lang.org/reference/type-coercions.html#coercion-types
[dot-operator]: ./dot-operator.html


## 来源、版本与核验

- 来源：[强转](https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/coercions.md)
- 作者/维护者：The Rust Project Developers 与 nomicon-zh-Hans 中文贡献者
- 获取日期：2026-10-25。固定提交 e6bf12f4d91d3a2211664f40c4b46fd3271996d6
- 收录方式：MIT 许可中文文献收录，保留原始 Markdown。文献收录；代码未实测。
- 许可：MIT（上游双许可中选择 MIT）。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/rust-originals/coercions.md`。
