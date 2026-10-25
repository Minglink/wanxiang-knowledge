---
{
  "schemaVersion": 2,
  "id": "wx-re-rust-lifetime-mismatch",
  "title": "Unsafe Rust：生命周期的局限",
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
  "snapshotHash": "fc12249e3bb0e1e6950ed6a80e49e5f92cfebd259324e80e50dd3cb40be2fc68",
  "generatedHash": "d33cb31b2b89a83917c8c7f21c009cc606ffb7fc0db8d746fde151f775f62a5c",
  "archived": false,
  "verification": "文献收录；代码未实测",
  "l0": "人们可能期望它能被编译成功，我们调用`mutate_and_share`，它可以暂时可变借用`foo`，但随后只返回一个共享引用。因此我们期望`foo.share()`能够成功，因为`foo`不应该被可变借用。 这是为啥？好吧，我们得到的推理和[上一节例 2][ex2]完全一样。我们对程序进行解语法糖后，可以得到如下结果： 由于`loan`的生命周期和`mu",
  "l1": "人们可能期望它能被编译成功，我们调用`mutate_and_share`，它可以暂时可变借用`foo`，但随后只返回一个共享引用。因此我们期望`foo.share()`能够成功，因为`foo`不应该被可变借用。 这是为啥？好吧，我们得到的推理和[上一节例 2][ex2]完全一样。我们对程序进行解语法糖后，可以得到如下结果： 由于`loan`的生命周期和`mutate_and_share`的签名，生命周期系统被迫将`&mut foo`扩展为`'c`的生命周期。然后当我们试图调用`share`时，它看到我们试图别名`&'c mut foo`，然后就炸了！ 根据我们真正关心的引用语义，这个程序显然是正确的，但是生命周期系统太蠢了(原话是粗糙)，无法处理这个问题。",
  "questions": [
    "Unsafe Rust：生命周期的局限的原理是什么？",
    "Unsafe Rust：生命周期的局限有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "rust-lifetime-mismatch",
      "url": "https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/lifetime-mismatch.md",
      "checkedAt": "2026-10-25",
      "mode": "MIT 许可中文文献收录，保留原始 Markdown"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "MIT（上游双许可中选择 MIT）"
}
---
# Unsafe Rust：生命周期的局限

> 收录自 Rust 秘典中文译本。原书说明其内容仍有不完整或可能过时之处；本库未编译和验证代码示例。

# 生命周期的局限

让我们来看以下代码：

```rust,compile_fail
#[derive(Debug)]
struct Foo;

impl Foo {
    fn mutate_and_share(&mut self) -> &Self { &*self }
    fn share(&self) {}
}

fn main() {
    let mut foo = Foo;
    let loan = foo.mutate_and_share();
    foo.share();
    println!("{:?}", loan);
}
```

人们可能期望它能被编译成功，我们调用`mutate_and_share`，它可以暂时可变借用`foo`，但随后只返回一个共享引用。因此我们期望`foo.share()`能够成功，因为`foo`不应该被可变借用。

然而，当我们试图编译它时：

```text
error[E0502]: cannot borrow `foo` as immutable because it is also borrowed as mutable
  --> src/main.rs:12:5
   |
11 |     let loan = foo.mutate_and_share();
   |                --- mutable borrow occurs here
12 |     foo.share();
   |     ^^^ immutable borrow occurs here
13 |     println!("{:?}", loan);
```

这是为啥？好吧，我们得到的推理和[上一节例 2][ex2]完全一样。我们对程序进行解语法糖后，可以得到如下结果：

<!-- ignore: desugared code -->

```rust,ignore
struct Foo;

impl Foo {
    fn mutate_and_share<'a>(&'a mut self) -> &'a Self { &'a *self }
    fn share<'a>(&'a self) {}
}

fn main() {
    'b: {
        let mut foo: Foo = Foo;
        'c: {
            let loan: &'c Foo = Foo::mutate_and_share::<'c>(&'c mut foo);
            'd: {
                Foo::share::<'d>(&'d foo);
            }
            println!("{:?}", loan);
        }
    }
}
```

由于`loan`的生命周期和`mutate_and_share`的签名，生命周期系统被迫将`&mut foo`扩展为`'c`的生命周期。然后当我们试图调用`share`时，它看到我们试图别名`&'c mut foo`，然后就炸了！

根据我们真正关心的引用语义，这个程序显然是正确的，但是生命周期系统太蠢了(原话是粗糙)，无法处理这个问题。

[ex2]: lifetimes.html#示例别名一个可变引用


## 来源、版本与核验

- 来源：[生命周期的局限](https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/lifetime-mismatch.md)
- 作者/维护者：The Rust Project Developers 与 nomicon-zh-Hans 中文贡献者
- 获取日期：2026-10-25。固定提交 e6bf12f4d91d3a2211664f40c4b46fd3271996d6
- 收录方式：MIT 许可中文文献收录，保留原始 Markdown。文献收录；代码未实测。
- 许可：MIT（上游双许可中选择 MIT）。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/rust-originals/lifetime-mismatch.md`。
