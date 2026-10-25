---
{
  "schemaVersion": 2,
  "id": "wx-re-rust-checked-uninit",
  "title": "Unsafe Rust：经检查的未初始化的内存",
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
  "snapshotHash": "4048fc1c95294861f56f1e15ef2b788b961d37d4999ef73704b87c09562c7bc4",
  "generatedHash": "2dc887c1c509bd3606701a80393e7a68a0648edc662fa2ab007c5a6147ef3ba1",
  "archived": false,
  "verification": "文献收录；代码未实测",
  "l0": "和 C 语言一样，Rust 中的所有堆栈变量都是未初始化的，直到为它们明确赋值。与 C 不同的是，Rust 静态地阻止你读取它们，直到你为它们赋值。 这基于一个基本的分支分析：每个分支都必须在第一次使用`x`之前给它赋值，方便起见，我们会说“x 被初始化了”或者“x 未初始化”。有趣的是，如果每个分支恰好赋值一次，Rust 不要求变量是可变的，以执行延迟初始",
  "l1": "和 C 语言一样，Rust 中的所有堆栈变量都是未初始化的，直到为它们明确赋值。与 C 不同的是，Rust 静态地阻止你读取它们，直到你为它们赋值。 这基于一个基本的分支分析：每个分支都必须在第一次使用`x`之前给它赋值，方便起见，我们会说“x 被初始化了”或者“x 未初始化”。有趣的是，如果每个分支恰好赋值一次，Rust 不要求变量是可变的，以执行延迟初始化。然而这个分析并没有利用常量分析或类似的东西。所以下述的代码是可以编译的： 当然，虽然分析不考虑实际值，但它对依赖关系和控制流有相对复杂的理解。例如，这样是可以编译通过的： 如果一个值从一个变量中移出，并且该值的类型不是 Copy，该变量在逻辑上就会变成未初始化。也就是说： 然而，在这个例子中重新给`y`赋值需要将`y`标记为可变，这样一个安全的 Rust 程序就可以观察到`y`的值发生了变化： 否则`y`就像是一个全新的变量。",
  "questions": [
    "Unsafe Rust：经检查的未初始化的内存的原理是什么？",
    "Unsafe Rust：经检查的未初始化的内存有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "rust-checked-uninit",
      "url": "https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/checked-uninit.md",
      "checkedAt": "2026-10-25",
      "mode": "MIT 许可中文文献收录，保留原始 Markdown"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "MIT（上游双许可中选择 MIT）"
}
---
# Unsafe Rust：经检查的未初始化的内存

> 收录自 Rust 秘典中文译本。原书说明其内容仍有不完整或可能过时之处；本库未编译和验证代码示例。

# 经检查的未初始化的内存

和 C 语言一样，Rust 中的所有堆栈变量都是未初始化的，直到为它们明确赋值。与 C 不同的是，Rust 静态地阻止你读取它们，直到你为它们赋值。

```rust,compile_fail
fn main() {
    let x: i32;
    println!("{}", x);
}
```

```text
  |
3 |     println!("{}", x);
  |                    ^ 使用了没有初始化的 `x`
```

这基于一个基本的分支分析：每个分支都必须在第一次使用`x`之前给它赋值，方便起见，我们会说“x 被初始化了”或者“x 未初始化”。有趣的是，如果每个分支恰好赋值一次，Rust 不要求变量是可变的，以执行延迟初始化。然而这个分析并没有利用常量分析或类似的东西。所以下述的代码是可以编译的：

```rust
fn main() {
    let x: i32;

    if true {
        x = 1;
    } else {
        x = 2;
    }

    println!("{}", x);
}
```

但这个不行：

```rust,compile_fail
fn main() {
    let x: i32;
    if true {
        x = 1;
    }
    println!("{}", x);
}
```

```text
  |
6 |     println!("{}", x);
  |                    ^ 使用了可能没有初始化的 `x`
```

这个又可以了：

```rust
fn main() {
    let x: i32;
    if true {
        x = 1;
        println!("{}", x);
    }
    // 不需要担心还有没有初始化 x 的分支，
    // 因为我们实际上并没有在别的分支使用 x
}
```

当然，虽然分析不考虑实际值，但它对依赖关系和控制流有相对复杂的理解。例如，这样是可以编译通过的：

```rust
let x: i32;

loop {
    // Rust 不知道这个分支会被无条件执行，
    // 因为它依赖于实际值
    if true {
        // 但是它确实知道循环只会有一次，
        // 因为我们会无条件 break，
        // 所以 x 不需要是可变的
        x = 0;
        break;
    }
}
// Rust 知道如果没有执行 break 的话，代码不会运行到这里
// 所以一旦运行到这里，x 一定已经初始化了
println!("{}", x);
```

如果一个值从一个变量中移出，并且该值的类型不是 Copy，该变量在逻辑上就会变成未初始化。也就是说：

```rust
fn main() {
    let x = 0;
    let y = Box::new(0);
    let z1 = x; // x 仍然是有效的，因为 i32 可以 Copy
    let z2 = y; // 现在 y 逻辑上未初始化，因为 Box 不能 Copy
}
```

然而，在这个例子中重新给`y`赋值需要将`y`标记为可变，这样一个安全的 Rust 程序就可以观察到`y`的值发生了变化：

```rust
fn main() {
    let mut y = Box::new(0);
    let z = y; // 现在 y 逻辑上未初始化，因为 Box 不能 Copy
    y = Box::new(1); // 重新初始化 y
}
```

否则`y`就像是一个全新的变量。


## 来源、版本与核验

- 来源：[经检查的未初始化的内存](https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/checked-uninit.md)
- 作者/维护者：The Rust Project Developers 与 nomicon-zh-Hans 中文贡献者
- 获取日期：2026-10-25。固定提交 e6bf12f4d91d3a2211664f40c4b46fd3271996d6
- 收录方式：MIT 许可中文文献收录，保留原始 Markdown。文献收录；代码未实测。
- 许可：MIT（上游双许可中选择 MIT）。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/rust-originals/checked-uninit.md`。
