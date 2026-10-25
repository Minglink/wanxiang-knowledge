---
{
  "schemaVersion": 2,
  "id": "wx-re-rust-lifetime-elision",
  "title": "Unsafe Rust：生命周期省略",
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
  "snapshotHash": "388832cb4b729f44c997f9966dde00e288e50d8ffa6065d565dd1f8087ce9a20",
  "generatedHash": "9b34d4857f4391de3b3ec50c1d802dd7de29ddf039a65148d7d14b4106707d6f",
  "archived": false,
  "verification": "文献收录；代码未实测",
  "l0": "为了使常见的模式更符合人体工程学，Rust 允许在函数签名中*省略*生命周期。 *生命周期位置*是指在一个类型中可以写入生命周期的任何地方。 生命周期位置可以作为“输入”或“输出”出现： * 对于`fn`定义、`fn`类型以及 Trait `Fn`、`FnMut`和`FnOnce`，输入是指形式参数的类型，而输出是指结果类型。所以`fn foo(s: &st",
  "l1": "为了使常见的模式更符合人体工程学，Rust 允许在函数签名中*省略*生命周期。 *生命周期位置*是指在一个类型中可以写入生命周期的任何地方。 生命周期位置可以作为“输入”或“输出”出现： * 对于`fn`定义、`fn`类型以及 Trait `Fn`、`FnMut`和`FnOnce`，输入是指形式参数的类型，而输出是指结果类型。所以`fn foo(s: &str) -> (&str, &str)`在输入位置有一个生命周期，在输出位置有两个生命周期。请注意，`fn`方法定义的输入位置不包括方法的`impl`头中出现的生命周期（对于默认方法，也不包括 trait 头中出现的生命周期） * 对于`impl`头，所有类型都是输入。所以`impl Trait<&T> for Struct<&T>`在输入位置上省略了两个生命周期，而`impl Struct<&T>`则省略了一个 省略规则如下： * 在输",
  "questions": [
    "Unsafe Rust：生命周期省略的原理是什么？",
    "Unsafe Rust：生命周期省略有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "rust-lifetime-elision",
      "url": "https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/lifetime-elision.md",
      "checkedAt": "2026-10-25",
      "mode": "MIT 许可中文文献收录，保留原始 Markdown"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "MIT（上游双许可中选择 MIT）"
}
---
# Unsafe Rust：生命周期省略

> 收录自 Rust 秘典中文译本。原书说明其内容仍有不完整或可能过时之处；本库未编译和验证代码示例。

# 生命周期省略

为了使常见的模式更符合人体工程学，Rust 允许在函数签名中*省略*生命周期。

*生命周期位置*是指在一个类型中可以写入生命周期的任何地方。

<!-- ignore: simplified code -->
```rust,ignore
&'a T
&'a mut T
T<'a>
```

生命周期位置可以作为“输入”或“输出”出现：
* 对于`fn`定义、`fn`类型以及 Trait `Fn`、`FnMut`和`FnOnce`，输入是指形式参数的类型，而输出是指结果类型。所以`fn foo(s: &str) -> (&str, &str)`在输入位置有一个生命周期，在输出位置有两个生命周期。请注意，`fn`方法定义的输入位置不包括方法的`impl`头中出现的生命周期（对于默认方法，也不包括 trait 头中出现的生命周期）
* 对于`impl`头，所有类型都是输入。所以`impl Trait<&T> for Struct<&T>`在输入位置上省略了两个生命周期，而`impl Struct<&T>`则省略了一个

省略规则如下：
* 在输入位置的每一个被省略的生命周期都成为一个独立的生命周期参数
* 如果正好有一个输入生命周期的位置（无论是否被省略），该生命周期将被分配给*所有*被省略的输出生命周期
* 如果有多个输入生命周期位置，但其中一个是`&self`或`&mut self`，那么`self`的生命周期将被分配给*所有*被省略的输出生命周期
* 否则，省略一个输出生命周期是一个错误

示例：

<!-- ignore: simplified code -->
```rust,ignore
fn print(s: &str);                                      // elided
fn print<'a>(s: &'a str);                               // expanded

fn debug(lvl: usize, s: &str);                          // elided
fn debug<'a>(lvl: usize, s: &'a str);                   // expanded

fn substr(s: &str, until: usize) -> &str;               // elided
fn substr<'a>(s: &'a str, until: usize) -> &'a str;     // expanded

fn get_str() -> &str;                                   // ILLEGAL

fn frob(s: &str, t: &str) -> &str;                      // ILLEGAL

fn get_mut(&mut self) -> &mut T;                        // elided
fn get_mut<'a>(&'a mut self) -> &'a mut T;              // expanded

fn args<T: ToCStr>(&mut self, args: &[T]) -> &mut Command                  // elided
fn args<'a, 'b, T: ToCStr>(&'a mut self, args: &'b [T]) -> &'a mut Command // expanded

fn new(buf: &mut [u8]) -> BufWriter;                    // elided
fn new(buf: &mut [u8]) -> BufWriter<'_>;                // elided (with `rust_2018_idioms`)
fn new<'a>(buf: &'a mut [u8]) -> BufWriter<'a>          // expanded
```


## 来源、版本与核验

- 来源：[生命周期省略](https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/lifetime-elision.md)
- 作者/维护者：The Rust Project Developers 与 nomicon-zh-Hans 中文贡献者
- 获取日期：2026-10-25。固定提交 e6bf12f4d91d3a2211664f40c4b46fd3271996d6
- 收录方式：MIT 许可中文文献收录，保留原始 Markdown。文献收录；代码未实测。
- 许可：MIT（上游双许可中选择 MIT）。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/rust-originals/lifetime-elision.md`。
