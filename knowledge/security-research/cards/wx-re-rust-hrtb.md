---
{
  "schemaVersion": 2,
  "id": "wx-re-rust-hrtb",
  "title": "Unsafe Rust：Higher-Rank Trait Bounds (HRTBs)",
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
  "snapshotHash": "7f508a728281b2a1c6ec777855169ee59878839b40355d57d49cb2d2ada7b9ac",
  "generatedHash": "2fa1a3eb9deeb4bbb6b727c6adb89e2c36a1d808c53c2d5dca395f6c8909d9bf",
  "archived": false,
  "verification": "文献收录；代码未实测",
  "l0": "Rust 的`Fn` trait 有一些黑魔法，例如，我们可以写出下面的代码： 如果我们试图天真地用与[生命周期][lt]部分相同的方式来对这段代码进行解语法糖，我们会遇到一些麻烦： 我们究竟应该如何表达`F`的 trait 约束上的生命周期？我们需要在那里提供一些生命周期，但是我们关心的生命周期在进入`call`的主体之前是不能被命名的! 而且，这并不是什",
  "l1": "Rust 的`Fn` trait 有一些黑魔法，例如，我们可以写出下面的代码： 如果我们试图天真地用与[生命周期][lt]部分相同的方式来对这段代码进行解语法糖，我们会遇到一些麻烦： 我们究竟应该如何表达`F`的 trait 约束上的生命周期？我们需要在那里提供一些生命周期，但是我们关心的生命周期在进入`call`的主体之前是不能被命名的! 而且，这并不是什么固定的生命周期；`call`可以与`&self`在这一时刻上的*任一*生命周期一起使用。 要完成这个事情，需要使用到高阶 Trait 约束（HRTB）的魔力。我们的解语法糖方式如下： （其中`Fn(a, b, c) -> d`本身只是不稳定的*真正的*`*Fn`特性的语法糖） `for<'a>`可以理解为“对于所有`'a`的可能”，并且基本上产生一个*无限的* F 必须满足的 trait 约束的列表。不过不用紧张，在`Fn` trai",
  "questions": [
    "Unsafe Rust：Higher-Rank Trait Bounds (HRTBs)的原理是什么？",
    "Unsafe Rust：Higher-Rank Trait Bounds (HRTBs)有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "rust-hrtb",
      "url": "https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/hrtb.md",
      "checkedAt": "2026-10-25",
      "mode": "MIT 许可中文文献收录，保留原始 Markdown"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "MIT（上游双许可中选择 MIT）"
}
---
# Unsafe Rust：Higher-Rank Trait Bounds (HRTBs)

> 收录自 Rust 秘典中文译本。原书说明其内容仍有不完整或可能过时之处；本库未编译和验证代码示例。

# Higher-Rank Trait Bounds (HRTBs)

Rust 的`Fn` trait 有一些黑魔法，例如，我们可以写出下面的代码：

```rust
struct Closure<F> {
    data: (u8, u16),
    func: F,
}

impl<F> Closure<F>
    where F: Fn(&(u8, u16)) -> &u8,
{
    fn call(&self) -> &u8 {
        (self.func)(&self.data)
    }
}

fn do_it(data: &(u8, u16)) -> &u8 { &data.0 }

fn main() {
    let clo = Closure { data: (0, 1), func: do_it };
    println!("{}", clo.call());
}
```

如果我们试图天真地用与[生命周期][lt]部分相同的方式来对这段代码进行解语法糖，我们会遇到一些麻烦：

<!-- ignore: desugared code -->

```rust,ignore
// NOTE: `&'b data.0` and `'x: {` is not valid syntax!
struct Closure<F> {
    data: (u8, u16),
    func: F,
}

impl<F> Closure<F>
    // where F: Fn(&'??? (u8, u16)) -> &'??? u8,
{
    fn call<'a>(&'a self) -> &'a u8 {
        (self.func)(&self.data)
    }
}

fn do_it<'b>(data: &'b (u8, u16)) -> &'b u8 { &'b data.0 }

fn main() {
    'x: {
        let clo = Closure { data: (0, 1), func: do_it };
        println!("{}", clo.call());
    }
}
```

我们究竟应该如何表达`F`的 trait 约束上的生命周期？我们需要在那里提供一些生命周期，但是我们关心的生命周期在进入`call`的主体之前是不能被命名的! 而且，这并不是什么固定的生命周期；`call`可以与`&self`在这一时刻上的*任一*生命周期一起使用。

要完成这个事情，需要使用到高阶 Trait 约束（HRTB）的魔力。我们的解语法糖方式如下：

<!-- ignore: simplified code -->

```rust,ignore
where for<'a> F: Fn(&'a (u8, u16)) -> &'a u8,
```

或者：

<!-- ignore: simplified code -->

```rust,ignore
where F: for<'a> Fn(&'a (u8, u16)) -> &'a u8,
```

（其中`Fn(a, b, c) -> d`本身只是不稳定的*真正的*`*Fn`特性的语法糖）

`for<'a>`可以理解为“对于所有`'a`的可能”，并且基本上产生一个*无限的* F 必须满足的 trait 约束的列表。不过不用紧张，在`Fn` trait 之外，我们遇到 HRTB 的地方不多，即使是那些地方，我们也有一个很好的魔法糖来处理普通的情况。

最终，我们可以把原本的代码重写成更加显式的样子：

```rust
struct Closure<F> {
    data: (u8, u16),
    func: F,
}
impl<F> Closure<F>
    where for<'a> F: Fn(&'a (u8, u16)) -> &'a u8,
{
    fn call(&self) -> &u8 {
        (self.func)(&self.data)
    }
}
fn do_it(data: &(u8, u16)) -> &u8 { &data.0 }
fn main() {
    let clo = Closure { data: (0, 1), func: do_it };
    println!("{}", clo.call());
}
```

[lt]: lifetimes.html


## 来源、版本与核验

- 来源：[Higher-Rank Trait Bounds (HRTBs)](https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/hrtb.md)
- 作者/维护者：The Rust Project Developers 与 nomicon-zh-Hans 中文贡献者
- 获取日期：2026-10-25。固定提交 e6bf12f4d91d3a2211664f40c4b46fd3271996d6
- 收录方式：MIT 许可中文文献收录，保留原始 Markdown。文献收录；代码未实测。
- 许可：MIT（上游双许可中选择 MIT）。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/rust-originals/hrtb.md`。
