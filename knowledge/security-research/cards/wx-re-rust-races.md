---
{
  "schemaVersion": 2,
  "id": "wx-re-rust-races",
  "title": "Unsafe Rust：数据竞争和竞态条件",
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
  "snapshotHash": "73dfc92022dcf4eed53e59db88f243ba0be3dbda895adeab32fcf3f8edcb2a5c",
  "generatedHash": "437cf58bd50c41b58ab57c2a0dfb66173c188996bbe30df3887a2ce2679ce538",
  "archived": false,
  "verification": "文献收录；代码未实测",
  "l0": "安全的 Rust 保证没有数据竞争，数据竞争的定义是： * 两个或多个线程同时访问一个内存位置 * 其中一个或多个线程是写的 * 其中一个或多个是非同步的 数据竞争具有未定义行为，因此在 Safe Rust 中不可能执行。数据竞争主要是通过 Rust 的所有权系统来防止的：不可能别名一个可变引用，所以不可能进行数据竞争。但内部可变性使其更加复杂，这也是我们有",
  "l1": "安全的 Rust 保证没有数据竞争，数据竞争的定义是： * 两个或多个线程同时访问一个内存位置 * 其中一个或多个线程是写的 * 其中一个或多个是非同步的 数据竞争具有未定义行为，因此在 Safe Rust 中不可能执行。数据竞争主要是通过 Rust 的所有权系统来防止的：不可能别名一个可变引用，所以不可能进行数据竞争。但内部可变性使其更加复杂，这也是我们有 Send 和 Sync Trait 的主要原因（见下个章节更详细的说明）。 **然而，Rust 并没有（也无法）阻止更广泛的竞态条件。** 在你无法控制调度器的情况下，这在数学上是不可能的，而对于普通的操作系统环境来说你是无法控制调度器的。如果你确实控制了抢占，那么 _有可能_ 防止一般的竞态——这种技术被像 RTIC 这样的框架所使用。然而，实际上拥有对调度的控制是一个非常罕见的情况。 因此，对于一个安全的 Rust 程序来说，在不",
  "questions": [
    "Unsafe Rust：数据竞争和竞态条件的原理是什么？",
    "Unsafe Rust：数据竞争和竞态条件有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "rust-races",
      "url": "https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/races.md",
      "checkedAt": "2026-10-25",
      "mode": "MIT 许可中文文献收录，保留原始 Markdown"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "MIT（上游双许可中选择 MIT）"
}
---
# Unsafe Rust：数据竞争和竞态条件

> 收录自 Rust 秘典中文译本。原书说明其内容仍有不完整或可能过时之处；本库未编译和验证代码示例。

# 数据竞争和竞态条件

安全的 Rust 保证没有数据竞争，数据竞争的定义是：

* 两个或多个线程同时访问一个内存位置
* 其中一个或多个线程是写的
* 其中一个或多个是非同步的

数据竞争具有未定义行为，因此在 Safe Rust 中不可能执行。数据竞争主要是通过 Rust 的所有权系统来防止的：不可能别名一个可变引用，所以不可能进行数据竞争。但内部可变性使其更加复杂，这也是我们有 Send 和 Sync Trait 的主要原因（见下个章节更详细的说明）。

**然而，Rust 并没有（也无法）阻止更广泛的竞态条件。**

在你无法控制调度器的情况下，这在数学上是不可能的，而对于普通的操作系统环境来说你是无法控制调度器的。如果你确实控制了抢占，那么 _有可能_ 防止一般的竞态——这种技术被像 [RTIC](https://github.com/rtic-rs/rtic) 这样的框架所使用。然而，实际上拥有对调度的控制是一个非常罕见的情况。

因此，对于一个安全的 Rust 程序来说，在不正确的同步下出现死锁或做一些无意义的事情是完全“正常”的。很明显，这样的程序有问题，但 Rust 只能帮你到这里。不过，Rust 程序中的竞态条件本身并不能违反内存安全；只有与其他不安全的代码结合在一起，竞态条件才能真正违反内存安全。比如说：

```rust,no_run
use std::thread;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::Arc;

let data = vec![1, 2, 3, 4];
// 使用 Arc，这样即使程序执行完毕，存储 AtomicUsize 的内存依然存在，
// 否则由于 thread::spawn 的生命周期限制，Rust 不会为我们编译这段代码
let idx = Arc::new(AtomicUsize::new(0));
let other_idx = idx.clone();

// `move` 捕获了 other_idx 的值，将它移入这个线程
thread::spawn(move || {
    // 因为这是一个原子变量，不存在数据竞争问题，所以可以修改 other_idx 的值
    other_idx.fetch_add(10, Ordering::SeqCst);
});

// 因为我们只读取了一次原子的内存，因此用原子中的值做索引是安全的，
// 然后将读出的值的拷贝传递给 Vec 做为索引，
// 索引过程可以做正确的边界检查，并且在执行索引期间这个值也不会发生改变。
// 但是，如果上面的线程在执行这句代码之前增加了这个值，这段代码会 panic。
// 因为程序的正确执行（panic 几乎不可能是正确的），所以这就是一个 *竞态*，
// 其执行结果依赖于线程的执行顺序
println!("{}", data[idx.load(Ordering::SeqCst)]);
```

如果我们提前进行边界检查，然后使用未经检查的值不安全地访问数据，我们就可能引起数据竞争：

```rust,no_run
use std::thread;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::Arc;

let data = vec![1, 2, 3, 4];

let idx = Arc::new(AtomicUsize::new(0));
let other_idx = idx.clone();

// `move` 捕获了 other_idx 值，将它移入这个线程
thread::spawn(move || {
    // 因为这是一个原子变量，不存在数据竞争问题，所以可以修改 other_idx 的值
    other_idx.fetch_add(10, Ordering::SeqCst);
});

if idx.load(Ordering::SeqCst) < data.len() {
    unsafe {
        // 所以在边界检查之后读取 idx 的值可能是不正确的
        // 因为我们这里会 `get_unchecked`, 而这个操作是 `unsafe` 的，
        // 所以这里就存在着竞态，并且 *非常危险*！
        println!("{}", data.get_unchecked(idx.load(Ordering::SeqCst)));
    }
}
```


## 来源、版本与核验

- 来源：[数据竞争和竞态条件](https://github.com/rust-lang-cn/nomicon-zh-Hans/blob/e6bf12f4d91d3a2211664f40c4b46fd3271996d6/src/races.md)
- 作者/维护者：The Rust Project Developers 与 nomicon-zh-Hans 中文贡献者
- 获取日期：2026-10-25。固定提交 e6bf12f4d91d3a2211664f40c4b46fd3271996d6
- 收录方式：MIT 许可中文文献收录，保留原始 Markdown。文献收录；代码未实测。
- 许可：MIT（上游双许可中选择 MIT）。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/rust-originals/races.md`。
