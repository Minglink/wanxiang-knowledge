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
