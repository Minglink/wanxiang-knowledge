---
{
  "schemaVersion": 2,
  "id": "wx-re-rust-beneath-std",
  "title": "Unsafe Rust：在 `std` 之下",
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
  "snapshotHash": "bdb3e9827971b4e8fa4a43122237030633dbaf178834c3e37ce20c27c315eebd",
  "generatedHash": "783d4c1ef69d5c201ec5348e982d40fbcfb2c8f32369f59b2c99c5dd77b806ea",
  "archived": false,
  "verification": "文献收录；代码未实测",
  "l0": "本节介绍了通常由 `std` crate 提供的功能，以及 `#![no_std]` 开发者在构建 `#![no_std]` 二进制 crate 时需要处理（即提供）的功能。 为了构建一个 `#[no_std]` 可执行文件，我们需要将 `libc` 作为依赖项。我们可以在 `Cargo.toml` 文件中指定这个依赖： 注意已经禁用了默认功能。这是一个关键",
  "l1": "本节介绍了通常由 `std` crate 提供的功能，以及 `#![no_std]` 开发者在构建 `#![no_std]` 二进制 crate 时需要处理（即提供）的功能。 为了构建一个 `#[no_std]` 可执行文件，我们需要将 `libc` 作为依赖项。我们可以在 `Cargo.toml` 文件中指定这个依赖： 注意已经禁用了默认功能。这是一个关键步骤——** `libc` 的默认功能包括 `std` crate，因此必须禁用。** 另外，我们可以像下述例子一样，结合使用不稳定的 `rustc_private` 私有功能和 `extern crate libc;` 声明。需要注意的是，windows-msvc target 不需要 libc，对应的在 sysroot 中也不存在 `libc` 这个 crate，因此在 windows-msvc target 下，我们不需要添加这个",
  "questions": [
    "Unsafe Rust：在 `std` 之下的原理是什么？",
    "Unsafe Rust：在 `std` 之下有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "rust-beneath-std",
      "url": "https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/beneath-std.md",
      "checkedAt": "2026-10-25",
      "mode": "MIT 许可中文文献收录，保留原始 Markdown"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "MIT（上游双许可中选择 MIT）"
}
---
# Unsafe Rust：在 `std` 之下

> 收录自 Rust 秘典中文译本。原书说明其内容仍有不完整或可能过时之处；本库未编译和验证代码示例。

# 在 `std` 之下

本节介绍了通常由 `std` crate 提供的功能，以及 `#![no_std]` 开发者在构建 `#![no_std]` 二进制 crate 时需要处理（即提供）的功能。

## 使用 `libc`

为了构建一个 `#[no_std]` 可执行文件，我们需要将 `libc` 作为依赖项。我们可以在 `Cargo.toml` 文件中指定这个依赖：

```toml
[dependencies]
libc = { version = "0.2.146", default-features = false }
```

注意已经禁用了默认功能。这是一个关键步骤——** `libc` 的默认功能包括 `std` crate，因此必须禁用。**

另外，我们可以像下述例子一样，结合使用不稳定的 `rustc_private` 私有功能和 `extern crate libc;` 声明。需要注意的是，windows-msvc target 不需要 libc，对应的在 sysroot 中也不存在 `libc` 这个 crate，因此在 windows-msvc target 下，我们不需要添加这个声明，并且添加了这个声明会导致编译错误。

## 在没有 `std` 的情况下编写可执行文件

我们可能需要编译器的 nightly 版本来生成 `#![no_std]` 可执行文件，因为在许多平台上，我们必须提供不稳定的 `eh_personality` [lang item]。

你需要为你的目标平台定义一个适合的入口点符号，例如 `main`、`_start`、`WinMain` 或任何与你的目标平台相关的入口点名称。

此外，你需要使用 `#![no_main]` 属性，以防止编译器尝试自动生成入口点。

另外，还需要定义一个[panic 处理函数](https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/panic-handler.html)。

```rust
#![feature(lang_items, core_intrinsics, rustc_private)]
#![allow(internal_features)]
#![no_std]
#![no_main]

// 在 cfg(unix) 平台上，对于 `panic = "unwind"` 构建来说是必要的。
#![feature(panic_unwind)]
extern crate unwind;

// 导入 crt0.o 可能需要的系统 libc 库。
#[cfg(not(windows))]
extern crate libc;

use core::ffi::{c_char, c_int};
use core::panic::PanicInfo;

// 本程序的入口点。
#[unsafe(no_mangle)] // 确保将此符号作为 `main` 包含在输出中
extern "C" fn main(_argc: c_int, _argv: *const *const c_char) -> c_int {
    0
}

// 编译器使用这些函数，但对于像这样的空程序来说并不需要。
// 它们通常由 `std` 提供。
#[lang = "eh_personality"]
fn rust_eh_personality() {}
#[panic_handler]
fn panic_handler(_info: &PanicInfo) -> ! { core::intrinsics::abort_immediate() }
```

如果您正在使用一个没有通过 rustup 提供标准库二进制版本的目标（这可能意味着您正在自己构建 `core` crate）并且需要 compiler-rt intrinsics（即您可能在构建可执行文件时遇到链接错误：`undefined reference to '__aeabi_memcpy'`），您需要手动链接到 [`compiler_builtins` crate] 来获取这些 intrinsics 并解决链接错误。

[`compiler_builtins` crate]: https://crates.io/crates/compiler_builtins
[lang item]: https://doc.rust-lang.org/nightly/unstable-book/language-features/lang-items.html


## 来源、版本与核验

- 来源：[在 `std` 之下](https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/beneath-std.md)
- 作者/维护者：The Rust Project Developers 与 nomicon-zh-Hans 中文贡献者
- 获取日期：2026-10-25。固定提交 e6bf12f4d91d3a2211664f40c4b46fd3271996d6
- 收录方式：MIT 许可中文文献收录，保留原始 Markdown。文献收录；代码未实测。
- 许可：MIT（上游双许可中选择 MIT）。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/rust-originals/beneath-std.md`。
