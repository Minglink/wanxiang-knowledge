---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-dev-tools-kmsan",
  "title": "Linux 内核：内核内存消毒剂（KMSAN）",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "dev-tools"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "fbf58f1d95eebb51c2fc8add22698ddd9c9c1ee05ff0134cd69cebac34560598",
  "generatedHash": "3a5f7849223aca43a5755bea00755bb7b6a310411dbeebf4588a97926eec8258",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "KMSAN 是一个动态错误检测器，旨在查找未初始化值的使用。它基于编译器插桩，类似于用 户空间的 MemorySanitizer tool。 需要注意的是 KMSAN 并不适合生产环境，因为它会大幅增加内核内存占用并降低系统运行速度。 要构建带有 KMSAN 的内核，你需要一个较新的 Clang (14.0.6+)。 请参阅 LLVM documentati",
  "l1": "KMSAN 是一个动态错误检测器，旨在查找未初始化值的使用。它基于编译器插桩，类似于用 户空间的 MemorySanitizer tool。 需要注意的是 KMSAN 并不适合生产环境，因为它会大幅增加内核内存占用并降低系统运行速度。 要构建带有 KMSAN 的内核，你需要一个较新的 Clang (14.0.6+)。 请参阅 LLVM documentation 了解如何构建 Clang。 现在配置并构建一个启用 CONFIG_KMSAN 的内核。 报告指出本地变量 uninit 在 do_uninit_local_array() 中未初始化。 第三个堆栈跟踪对应于该变量创建的位置。 第一个堆栈跟踪显示了未初始化值的使用位置（在 test_uninit_kmsan_check_memory()）。 工具显示了局部变量中未初始化的字节及其被复制到其他内存位置前的堆栈。 KMSAN 会在以下情",
  "questions": [
    "Linux 内核：内核内存消毒剂（KMSAN）的原理是什么？",
    "Linux 内核：内核内存消毒剂（KMSAN）有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-dev-tools-kmsan",
      "url": "https://docs.kernel.org/translations/zh_CN/dev-tools/kmsan.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：内核内存消毒剂（KMSAN）

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 内核内存消毒剂（KMSAN）

KMSAN 是一个动态错误检测器，旨在查找未初始化值的使用。它基于编译器插桩，类似于用
户空间的 [MemorySanitizer tool](https://clang.llvm.org/docs/MemorySanitizer.html)。

需要注意的是 KMSAN 并不适合生产环境，因为它会大幅增加内核内存占用并降低系统运行速度。

### 使用方法

#### 构建内核

要构建带有 KMSAN 的内核，你需要一个较新的 Clang (14.0.6+)。
请参阅 [LLVM documentation](https://llvm.org/docs/GettingStarted.html) 了解如何构建 Clang。

现在配置并构建一个启用 CONFIG\_KMSAN 的内核。

#### 示例报告

以下是一个 KMSAN 报告的示例:

```
=====================================================
BUG: KMSAN: uninit-value in test_uninit_kmsan_check_memory+0x1be/0x380 [kmsan_test]
 test_uninit_kmsan_check_memory+0x1be/0x380 mm/kmsan/kmsan_test.c:273
 kunit_run_case_internal lib/kunit/test.c:333
 kunit_try_run_case+0x206/0x420 lib/kunit/test.c:374
 kunit_generic_run_threadfn_adapter+0x6d/0xc0 lib/kunit/try-catch.c:28
 kthread+0x721/0x850 kernel/kthread.c:327
 ret_from_fork+0x1f/0x30 ??:?

Uninit was stored to memory at:
 do_uninit_local_array+0xfa/0x110 mm/kmsan/kmsan_test.c:260
 test_uninit_kmsan_check_memory+0x1a2/0x380 mm/kmsan/kmsan_test.c:271
 kunit_run_case_internal lib/kunit/test.c:333
 kunit_try_run_case+0x206/0x420 lib/kunit/test.c:374
 kunit_generic_run_threadfn_adapter+0x6d/0xc0 lib/kunit/try-catch.c:28
 kthread+0x721/0x850 kernel/kthread.c:327
 ret_from_fork+0x1f/0x30 ??:?

Local variable uninit created at:
 do_uninit_local_array+0x4a/0x110 mm/kmsan/kmsan_test.c:256
 test_uninit_kmsan_check_memory+0x1a2/0x380 mm/kmsan/kmsan_test.c:271

Bytes 4-7 of 8 are uninitialized
Memory access of size 8 starts at ffff888083fe3da0

CPU: 0 PID: 6731 Comm: kunit_try_catch Tainted: G    B       E     5.16.0-rc3+ #104
Hardware name: QEMU Standard PC (i440FX + PIIX, 1996), BIOS 1.14.0-2 04/01/2014
=====================================================
```

报告指出本地变量 uninit 在 do\_uninit\_local\_array() 中未初始化。
第三个堆栈跟踪对应于该变量创建的位置。

第一个堆栈跟踪显示了未初始化值的使用位置（在
test\_uninit\_kmsan\_check\_memory()）。
工具显示了局部变量中未初始化的字节及其被复制到其他内存位置前的堆栈。

KMSAN 会在以下情况下报告未初始化的值 v:

> - 在条件判断中，例如 if (v) { ... }；
> - 在索引或指针解引用中，例如 array[v] 或 \*v；
> - 当它被复制到用户空间或硬件时，例如 copy\_to\_user(..., &v, ...)；
> - 当它作为函数参数传递，并且启用 CONFIG\_KMSAN\_CHECK\_PARAM\_RETVAL 时（见下文）。

这些情况（除了复制数据到用户空间或硬件外，这是一个安全问题）被视为 C11 标准下的未定义行为。

#### 禁用插桩

可以用 \_\_no\_kmsan\_checks 标记函数。这样，KMSAN 会忽略该函数中的未初始化值，
并将其输出标记为已初始化。如此，用户不会收到与该函数相关的 KMSAN 报告。

KMSAN 还支持 \_\_no\_sanitize\_memory 函数属性。KMSAN 不会对拥有该属性的函数进行
插桩，这在我们不希望编译器干扰某些底层代码（例如标记为 noinstr 的代码，该
代码隐式添加了 \_\_no\_sanitize\_memory）时可能很有用。

然而，这会有代价：此类函数的栈分配将具有不正确的影子/初始值，可能导致误报。来
自非插桩代码的函数也可能接收到不正确的元数据。

作为经验之谈，避免显式使用 \_\_no\_sanitize\_memory。

也可以通过 Makefile 禁用 KMSAN 对某个文件（例如 main.o）的作用:

```
KMSAN_SANITIZE_main.o := n
```

或者对整个目录:

```
KMSAN_SANITIZE := n
```

将其应用到文件或目录中的每个函数。大多数用户不会需要 KMSAN\_SANITIZE，
除非他们的代码被 KMSAN 破坏（例如在早期启动时运行的代码）。

还可以通过调用 kmsan\_disable\_current() 和 kmsan\_enable\_current()
暂时对当前任务禁用 KMSAN 检查。每个 kmsan\_enable\_current() 必须在
kmsan\_disable\_current() 之后调用；这些调用对可以嵌套。在调用时需要注意保持
嵌套区域简短，并且尽可能使用其他方法禁用插桩。

### 支持

为了使用 KMSAN，内核必须使用 Clang 构建，到目前为止，Clang 是唯一支持 KMSAN
的编译器。内核插桩过程基于用户空间的 [MemorySanitizer tool](https://clang.llvm.org/docs/MemorySanitizer.html)。

目前运行时库仅支持 x86\_64 架构。

### KMSAN 的工作原理

#### KMSAN 阴影内存

KMSAN 将一个元数据字节（也称为阴影字节）与每个内核内存字节关联。仅当内核内存字节
的相应位未初始化时，阴影字节中的一个比特位才会被设置。将内存标记为未初始化（即
将其阴影字节设置为 0xff）称为中毒，将其标记为已初始化（将阴影字节设置为
0x00）称为解毒。

当在栈上分配新变量时，默认情况下它会中毒，这由编译器插入的插桩代码完成（除非它
是立即初始化的栈变量）。任何未使用 \_\_GFP\_ZERO 的堆分配也会中毒。

编译器插桩还跟踪阴影值在代码中的使用。当需要时，插桩代码会调用 mm/kmsan/ 中
的运行时库以持久化阴影值。

基本或复合类型的阴影值是长度相同的字节数组。当常量值写入内存时，该内存会被解毒
。当从内存读取值时，其阴影内存也会被获取，并传递到所有使用该值的操作中。对于每
个需要一个或多个值的指令，编译器会生成代码根据这些值及其阴影来计算结果的阴影。

示例:

```
int a = 0xff;  // i.e. 0x000000ff
int b;
int c = a | b;
```

在这种情况下， a 的阴影为 0， b 的阴影为 0xffffffff，
c 的阴影为 0xffffff00。这意味着 c 的高三个字节未初始化，而低字节已
初始化。

#### 起源跟踪

每四字节的内核内存都有一个所谓的源点与之映射。这个源点描述了在程序执行中，未初
始化值的创建点。每个源点都与完整的分配栈（对于堆分配的内存）或包含未初始化变
量的函数（对于局部变量）相关联。

当一个未初始化的变量在栈或堆上分配时，会创建一个新的源点值，并将该变量的初始值
填充为这个值。当从内存中读取一个值时，其初始值也会被读取并与阴影一起保留。对于
每个接受一个或多个值的指令，结果的源点是与任何未初始化输入相对应的源点之一。如
果一个污染值被写入内存，其起源也会被写入相应的存储中。

示例 1:

```
int a = 42;
int b;
int c = a + b;
```

在这种情况下， b 的源点是在函数入口时生成的，并在加法结果写入内存之前存储到
c 的源点中。

如果几个变量共享相同的源点地址，则它们被存储在同一个四字节块中。在这种情况下，
对任何变量的每次写入都会更新所有变量的源点。在这种情况下我们必须牺牲精度，因
为为单独的位（甚至字节）存储源点成本过高。

示例 2:

```
int combine(short a, short b) {
  union ret_t {
    int i;
    short s[2];
  } ret;
  ret.s[0] = a;
  ret.s[1] = b;
  return ret.i;
}
```

如果 a 已初始化而 b 未初始化，则结果的阴影为 0xffff0000，结果的源点为
b 的源点。 ret.s[0] 会有相同的起源，但它不会被使用，因为该变量已初始化。

如果两个函数参数都未初始化，则只保留第二个参数的源点。

##### 源点链

为了便于调试，KMSAN 在每次将未初始化值存储到内存时都会创建一个新的源点。新的源点
引用了其创建栈以及值的前一个起源。这可能导致内存消耗增加，因此我们在运行时限制
了源点链的长度。

#### Clang 插桩 API

Clang 插桩通过在内核代码中插入定义在 mm/kmsan/instrumentation.c 中的函数调用
来实现。

##### 阴影操作

对于每次内存访问，编译器都会发出一个函数调用，该函数返回一对指针，指向给定内存
的阴影和原始地址:

```
typedef struct {
  void *shadow, *origin;
} shadow_origin_ptr_t

shadow_origin_ptr_t __msan_metadata_ptr_for_load_{1,2,4,8}(void *addr)
shadow_origin_ptr_t __msan_metadata_ptr_for_store_{1,2,4,8}(void *addr)
shadow_origin_ptr_t __msan_metadata_ptr_for_load_n(void *addr, uintptr_t size)
shadow_origin_ptr_t __msan_metadata_ptr_for_store_n(void *addr, uintptr_t size)
```

函数名依赖于内存访问的大小。

编译器确保对于每个加载的值，其阴影和原始值都从内存中读取。当一个值存储到内存时
，其阴影和原始值也会通过元数据指针进行存储。

##### 处理局部变量

一个特殊的函数用于为局部变量创建一个新的原始值，并将该变量的原始值设置为该值:

```
void __msan_poison_alloca(void *addr, uintptr_t size, char *descr)
```

##### 访问每个任务数据

在每个插桩函数的开始处，KMSAN 插入一个对 \_\_msan\_get\_context\_state() 的调用

```
kmsan_context_state *__msan_get_context_state(void)
```

kmsan\_context\_state 在 include/linux/kmsan.h 中声明:

```
struct kmsan_context_state {
  char param_tls[KMSAN_PARAM_SIZE];
  char retval_tls[KMSAN_RETVAL_SIZE];
  char va_arg_tls[KMSAN_PARAM_SIZE];
  char va_arg_origin_tls[KMSAN_PARAM_SIZE];
  u64 va_arg_overflow_size_tls;
  char param_origin_tls[KMSAN_PARAM_SIZE];
  depot_stack_handle_t retval_origin_tls;
};
```

KMSAN 使用此结构体在插桩函数之间传递参数阴影和原始值（除非立刻通过
:   CONFIG\_KMSAN\_CHECK\_PARAM\_RETVAL 检查参数）。

##### 将未初始化的值传递给函数

Clang 的 MemorySanitizer 插桩有一个选项 -fsanitize-memory-param-retval，该
选项使编译器检查按值传递的函数参数，以及函数返回值。

该选项由 CONFIG\_KMSAN\_CHECK\_PARAM\_RETVAL 控制，默认启用以便 KMSAN 更早报告
未初始化的值。有关更多细节，请参考 [LKML discussion](https://lore.kernel.org/all/20220614144853.3693273-1-glider@google.com/)。

由于 LLVM 中的实现检查的方式（它们仅应用于标记为 noundef 的参数），并不是所
有参数都能保证被检查，因此我们不能放弃 kmsan\_context\_state 中的元数据存储
。

##### 字符串函数

编译器将对 memcpy()/memmove()/memset() 的调用替换为以下函数。这些函
数在数据结构初始化或复制时也会被调用，确保阴影和原始值与数据一起复制:

```
void *__msan_memcpy(void *dst, void *src, uintptr_t n)
void *__msan_memmove(void *dst, void *src, uintptr_t n)
void *__msan_memset(void *dst, int c, uintptr_t n)
```

##### 错误报告

对于每个值的使用，编译器发出一个阴影检查，在值中毒的情况下调用
\_\_msan\_warning():

```
void __msan_warning(u32 origin)
```

\_\_msan\_warning() 使 KMSAN 运行时打印错误报告。

##### 内联汇编插桩

KMSAN 对每个内联汇编输出进行插桩，调用:

```
void __msan_instrument_asm_store(void *addr, uintptr_t size)
```

，该函数解除内存区域的污染。

这种方法可能会掩盖某些错误，但也有助于避免许多位操作、原子操作等中的假阳性。

有时传递给内联汇编的指针不指向有效内存。在这种情况下，它们在运行时被忽略。

#### 运行时库

代码位于 mm/kmsan/。

##### 每个任务 KMSAN 状态

每个 task\_struct 都有一个关联的 KMSAN 任务状态，它保存 KMSAN
上下文（见上文）和一个每个任务计数器以禁止 KMSAN 报告:

```
struct kmsan_context {
  ...
  unsigned int depth;
  struct kmsan_context_state cstate;
  ...
}

struct task_struct {
  ...
  struct kmsan_context kmsan;
  ...
}
```

##### KMSAN 上下文

在内核任务上下文中运行时，KMSAN 使用 current->kmsan.cstate 来
保存函数参数和返回值的元数据。

但在内核运行于中断、softirq 或 NMI 上下文中， current 不可用时，
KMSAN 切换到每 CPU 中断状态:

```
DEFINE_PER_CPU(struct kmsan_ctx, kmsan_percpu_ctx);
```

##### 元数据分配

内核中有多个地方存储元数据。

1. 每个 struct page 实例包含两个指向其影子和内存页面的指针

```
struct page {
  ...
  struct page *shadow, *origin;
  ...
};
```

在启动时，内核为每个可用的内核页面分配影子和源页面。这是在内核地址空间已经碎片
化时后完成的，完成的相当晚，因此普通数据页面可能与元数据页面任意交错。

这意味着通常两个相邻的内存页面，它们的影子/源页面可能不是连续的。因此，如果内存
访问跨越内存块的边界，访问影子/源内存可能会破坏其他页面或从中读取错误的值。

实际上，由相同 alloc\_pages() 调用返回的连续内存页面将具有连续的元数据，而
如果这些页面属于两个不同的分配，它们的元数据页面可能会被碎片化。

对于内核数据（ .data、 .bss 等）和每 CPU 内存区域，也没有对元数据连续
性的保证。

在 \_\_msan\_metadata\_ptr\_for\_XXX\_YYY() 遇到两个页面之间的
非连续元数据边界时，它返回指向假影子/源区域的指针:

```
char dummy_load_page[PAGE_SIZE] __attribute__((aligned(PAGE_SIZE)));
char dummy_store_page[PAGE_SIZE] __attribute__((aligned(PAGE_SIZE)));
```

dummy\_load\_page 被初始化为零，因此读取它始终返回零。对 dummy\_store\_page 的
所有写入都被忽略。

2. 对于 vmalloc 内存和模块，内存范围、影子和源之间有一个直接映射。KMSAN 将
vmalloc 区域缩小了 3/4，仅使前四分之一可用于 vmalloc()。vmalloc
区域的第二个四分之一包含第一个四分之一的影子内存，第三个四分之一保存源。第四个
四分之一的小部分包含内核模块的影子和源。有关更多详细信息，请参阅
arch/x86/include/asm/pgtable\_64\_types.h。

当一系列页面映射到一个连续的虚拟内存空间时，它们的影子和源页面也以连续区域的方
式映射。

### 参考文献

E. Stepanov, K. Serebryany. [MemorySanitizer: fast detector of uninitialized
memory use in C++](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/43308.pdf).
In Proceedings of CGO 2015.

## 来源、版本与核验

- 来源：[内核内存消毒剂（KMSAN）](https://docs.kernel.org/translations/zh_CN/dev-tools/kmsan.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/dev-tools/kmsan.rst`。
