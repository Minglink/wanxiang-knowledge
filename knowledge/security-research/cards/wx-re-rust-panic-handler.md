---
{
  "schemaVersion": 2,
  "id": "wx-re-rust-panic-handler",
  "title": "Unsafe Rust：#[panic_handler]",
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
  "snapshotHash": "c6c18d901046ba4a298bcfaec2021586f91fbb797ec9ab78338e3e6dc697f565",
  "generatedHash": "f50031a526f13a80b4b31a792360a6c6b42ca5eaab1d0aa5128c94e10cb5a674",
  "archived": false,
  "verification": "文献收录；代码未实测",
  "l0": "`#[panic_handler]`用于定义`panic!`在`#![no_std]`程序中的行为。`#[panic_handler]`必须应用于签名为`fn(&PanicInfo) -> !`的函数，并且这样的函数仅能在一个二进制程序/动态链接库的整个依赖图中仅出现一次。`PanicInfo`的 API 可以在 [API docs] 中找到。 鉴于`#![",
  "l1": "`#[panic_handler]`用于定义`panic!`在`#![no_std]`程序中的行为。`#[panic_handler]`必须应用于签名为`fn(&PanicInfo) -> !`的函数，并且这样的函数仅能在一个二进制程序/动态链接库的整个依赖图中仅出现一次。`PanicInfo`的 API 可以在 [API docs] 中找到。 鉴于`#![no_std]`应用程序没有*标准*的输出，并且一些`#![no_std]`应用程序，例如嵌入式应用程序，在开发和发布时需要不同的 panic 行为，因此拥有专门的 panic crate，即只包含`#[panic_handler]`的 crate 是有帮助的。这样，应用程序可以通过简单地链接到一个不同的 panic crate 来轻松地选择 panic 行为。 下面是一个例子，根据使用开发配置文件（`cargo build`）或使用发",
  "questions": [
    "Unsafe Rust：#[panic_handler]的原理是什么？",
    "Unsafe Rust：#[panic_handler]有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "rust-panic-handler",
      "url": "https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/panic-handler.md",
      "checkedAt": "2026-10-25",
      "mode": "MIT 许可中文文献收录，保留原始 Markdown"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "MIT（上游双许可中选择 MIT）"
}
---
# Unsafe Rust：#[panic_handler]

> 收录自 Rust 秘典中文译本。原书说明其内容仍有不完整或可能过时之处；本库未编译和验证代码示例。

# #[panic_handler]

`#[panic_handler]`用于定义`panic!`在`#![no_std]`程序中的行为。`#[panic_handler]`必须应用于签名为`fn(&PanicInfo) -> !`的函数，并且这样的函数仅能在一个二进制程序/动态链接库的整个依赖图中仅出现一次。`PanicInfo`的 API 可以在 [API docs] 中找到。

[API docs]: https://doc.rust-lang.org/core/panic/struct.PanicInfo.html

鉴于`#![no_std]`应用程序没有*标准*的输出，并且一些`#![no_std]`应用程序，例如嵌入式应用程序，在开发和发布时需要不同的 panic 行为，因此拥有专门的 panic crate，即只包含`#[panic_handler]`的 crate 是有帮助的。这样，应用程序可以通过简单地链接到一个不同的 panic crate 来轻松地选择 panic 行为。

下面是一个例子，根据使用开发配置文件（`cargo build`）或使用发布配置文件（`cargo build --release`）编译的应用程序具有不同的恐慌行为：

`panic-semihosting`crate —— 使用 semihosting 将 panic 信息记录到主机 stderr：

<!-- ignore: simplified code -->
```rust,ignore
#![no_std]

use core::fmt::{Write, self};
use core::panic::PanicInfo;

struct HStderr {
    // ..
#     _0: (),
}
#
# impl HStderr {
#     fn new() -> HStderr { HStderr { _0: () } }
# }
#
# impl fmt::Write for HStderr {
#     fn write_str(&mut self, _: &str) -> fmt::Result { Ok(()) }
# }

#[panic_handler]
fn panic(info: &PanicInfo) -> ! {
    let mut host_stderr = HStderr::new();

    // 输出日志: "panicked at '$reason', src/main.rs:27:4" 
    writeln!(host_stderr, "{}", info).ok();

    loop {}
}
```

`panic-halt`crate —— panic 时停止线程；消息被丢弃：

<!-- ignore: simplified code -->
```rust,ignore
#![no_std]

use core::panic::PanicInfo;

#[panic_handler]
fn panic(_info: &PanicInfo) -> ! {
    loop {}
}
```

`app` crate：

<!-- ignore: requires the above crates -->
```rust,ignore
#![no_std]

// dev profile
#[cfg(debug_assertions)]
extern crate panic_semihosting;

// release profile
#[cfg(not(debug_assertions))]
extern crate panic_halt;

fn main() {
    // ..
}
```


## 来源、版本与核验

- 来源：[#[panic_handler]](https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/panic-handler.md)
- 作者/维护者：The Rust Project Developers 与 nomicon-zh-Hans 中文贡献者
- 获取日期：2026-10-25。固定提交 e6bf12f4d91d3a2211664f40c4b46fd3271996d6
- 收录方式：MIT 许可中文文献收录，保留原始 Markdown。文献收录；代码未实测。
- 许可：MIT（上游双许可中选择 MIT）。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/rust-originals/panic-handler.md`。
