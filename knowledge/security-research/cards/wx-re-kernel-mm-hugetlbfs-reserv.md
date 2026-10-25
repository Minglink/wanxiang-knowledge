---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-mm-hugetlbfs-reserv",
  "title": "Linux 内核：Hugetlbfs 预留",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "mm"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "29f17de06dc5c847703c1a130cbb4021c6f217b92dad80b0c230aa84c23a546b",
  "generatedHash": "1f55cfda0ef4ea51b7a1c70d03c2bab272991bb207d9e983296b7e54b8c3d7f4",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "Documentation/admin-guide/mm/hugetlbpage.rst 中描述的巨页通常是预先分配给应用程序使用的 。如果VMA指 示要使用巨页，这些巨页会在缺页异常时被实例化到任务的地址空间。如果在缺页异常 时没有巨页存在，任务就会被发送一个SIGBUS，并经常不高兴地死去。在加入巨页支 持后不久，人们决定，在mmap()时检测巨页的短缺",
  "l1": "Documentation/admin-guide/mm/hugetlbpage.rst 中描述的巨页通常是预先分配给应用程序使用的 。如果VMA指 示要使用巨页，这些巨页会在缺页异常时被实例化到任务的地址空间。如果在缺页异常 时没有巨页存在，任务就会被发送一个SIGBUS，并经常不高兴地死去。在加入巨页支 持后不久，人们决定，在mmap()时检测巨页的短缺情况会更好。这个想法是，如果 没有足够的巨页来覆盖映射，mmap()将失败。这首先是在mmap()时在代码中做一个 简单的检查，以确定是否有足够的空闲巨页来覆盖映射。就像内核中的大多数东西一 样，代码随着时间的推移而不断发展。然而，基本的想法是在mmap()时 “预留” 巨页，以确保巨页可以用于该映射中的缺页异常。下面的描述试图描述在v4.10内核 中是如何进行巨页预留处理的。 这个描述主要是针对正在修改hugetlbfs代码的内核开发",
  "questions": [
    "Linux 内核：Hugetlbfs 预留的原理是什么？",
    "Linux 内核：Hugetlbfs 预留有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-mm-hugetlbfs-reserv",
      "url": "https://docs.kernel.org/translations/zh_CN/mm/hugetlbfs_reserv.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0 (repository default; no file SPDX found)"
}
---
# Linux 内核：Hugetlbfs 预留

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## Hugetlbfs 预留

### 概述

Documentation/admin-guide/mm/hugetlbpage.rst
中描述的巨页通常是预先分配给应用程序使用的 。如果VMA指
示要使用巨页，这些巨页会在缺页异常时被实例化到任务的地址空间。如果在缺页异常
时没有巨页存在，任务就会被发送一个SIGBUS，并经常不高兴地死去。在加入巨页支
持后不久，人们决定，在mmap()时检测巨页的短缺情况会更好。这个想法是，如果
没有足够的巨页来覆盖映射，mmap()将失败。这首先是在mmap()时在代码中做一个
简单的检查，以确定是否有足够的空闲巨页来覆盖映射。就像内核中的大多数东西一
样，代码随着时间的推移而不断发展。然而，基本的想法是在mmap()时 “预留”
巨页，以确保巨页可以用于该映射中的缺页异常。下面的描述试图描述在v4.10内核
中是如何进行巨页预留处理的。

### 读者

这个描述主要是针对正在修改hugetlbfs代码的内核开发者。

### 数据结构

resv\_huge\_pages
:   这是一个全局的（per-hstate）预留的巨页的计数。预留的巨页只对预留它们的任
    务可用。因此，一般可用的巨页的数量被计算为(free\_huge\_pages - resv\_huge\_pages)。

Reserve Map
:   预留映射由以下结构体描述:

    ```
    struct resv_map {
            struct kref refs;
            spinlock_t lock;
            struct list_head regions;
            long adds_in_progress;
            struct list_head region_cache;
            long region_cache_count;
    };
    ```

    系统中每个巨页映射都有一个预留映射。resv\_map中的regions列表描述了映射中的
    区域。一个区域被描述为:

    ```
    struct file_region {
            struct list_head link;
            long from;
            long to;
    };
    ```

    file\_region结构体的 ‘from’ 和 ‘to’ 字段是进入映射的巨页索引。根据映射的类型，在
    reserv\_map 中的一个区域可能表示该范围存在预留，或预留不存在。

Flags for MAP\_PRIVATE Reservations
:   这些被存储在预留的映射指针的底部。

    #define HPAGE\_RESV\_OWNER (1UL << 0)
    :   表示该任务是与该映射相关的预留的所有者。

    #define HPAGE\_RESV\_UNMAPPED (1UL << 1)
    :   表示最初映射此范围（并创建储备）的任务由于COW失败而从该任务（子任务）中取消映
        射了一个页面。

Page Flags
:   PagePrivate页面标志是用来指示在释放巨页时必须恢复巨页的预留。更多细节将在
    “释放巨页” 一节中讨论。

### 预留映射位置（私有或共享）

一个巨页映射或段要么是私有的，要么是共享的。如果是私有的，它通常只对一个地址空间
（任务）可用。如果是共享的，它可以被映射到多个地址空间（任务）。对于这两种类型的映射，
预留映射的位置和语义是明显不同的。位置的差异是：

- 对于私有映射，预留映射挂在VMA结构体上。具体来说，就是vma->vm\_private\_data。这个保
  留映射是在创建映射（mmap(MAP\_PRIVATE)）时创建的。
- 对于共享映射，预留映射挂在inode上。具体来说，就是inode->i\_mapping->private\_data。
  由于共享映射总是由hugetlbfs文件系统中的文件支持，hugetlbfs代码确保每个节点包含一个预
  留映射。因此，预留映射在创建节点时被分配。

### 创建预留

当创建一个巨大的有页面支持的共享内存段（shmget(SHM\_HUGETLB)）或通过mmap(MAP\_HUGETLB)
创建一个映射时，就会创建预留。这些操作会导致对函数hugetlb\_reserve\_pages()的调用:

```
int hugetlb_reserve_pages(struct inode *inode,
                          long from, long to,
                          struct vm_area_struct *vma,
                          vm_flags_t vm_flags)
```

hugetlb\_reserve\_pages()做的第一件事是检查在调用shmget()或mmap()时是否指定了NORESERVE
标志。如果指定了NORESERVE，那么这个函数立即返回，因为不需要预留。

参数'from'和'to'是映射或基础文件的巨页索引。对于shmget()，'from'总是0，'to'对应于段/映射
的长度。对于mmap()，offset参数可以用来指定进入底层文件的偏移量。在这种情况下，'from'和'to'
参数已经被这个偏移量所调整。

PRIVATE和SHARED映射之间的一个很大的区别是预留在预留映射中的表示方式。

- 对于共享映射，预留映射中的条目表示对应页面的预留存在或曾经存在。当预留被消耗时，预留映射不被
  修改。
- 对于私有映射，预留映射中没有条目表示相应页面存在预留。随着预留被消耗，条目被添加到预留映射中。
  因此，预留映射也可用于确定哪些预留已被消耗。

对于私有映射，hugetlb\_reserve\_pages()创建预留映射并将其挂在VMA结构体上。此外，
HPAGE\_RESV\_OWNER标志被设置，以表明该VMA拥有预留。

预留映射被查阅以确定当前映射/段需要多少巨页预留。对于私有映射，这始终是一个值（to - from）。
然而，对于共享映射来说，一些预留可能已经存在于(to - from)的范围内。关于如何实现这一点的细节，
请参见 预留映射的修改 一节。

该映射可能与一个子池（subpool）相关联。如果是这样，将查询子池以确保有足够的空间用于映射。子池
有可能已经预留了可用于映射的预留空间。更多细节请参见 :ref: 子池预留 <sub\_pool\_resv>
一节。

在咨询了预留映射和子池之后，就知道了需要的新预留数量。hugetlb\_acct\_memory()函数被调用以检查
并获取所要求的预留数量。hugetlb\_acct\_memory()调用到可能分配和调整剩余页数的函数。然而，在这
些函数中，代码只是检查以确保有足够的空闲的巨页来容纳预留。如果有的话，全局预留计数resv\_huge\_pages
会被调整，如下所示:

```
if (resv_needed <= (resv_huge_pages - free_huge_pages))
        resv_huge_pages += resv_needed;
```

注意，在检查和调整这些计数器时，全局锁hugetlb\_lock会被预留。

如果有足够的空闲的巨页，并且全局计数resv\_huge\_pages被调整，那么与映射相关的预留映射被修改以
反映预留。在共享映射的情况下，将存在一个file\_region，包括'from'-'to'范围。对于私有映射，
不对预留映射进行修改，因为没有条目表示存在预留。

如果hugetlb\_reserve\_pages()成功，全局预留数和与映射相关的预留映射将根据需要被修改，以确保
在'from'-'to'范围内存在预留。

### 消耗预留/分配一个巨页

当与预留相关的巨页在相应的映射中被分配和实例化时，预留就被消耗了。该分配是在函数alloc\_hugetlb\_folio()
中进行的:

```
struct folio *alloc_hugetlb_folio(struct vm_area_struct *vma,
                             unsigned long addr, int avoid_reserve)
```

alloc\_hugetlb\_folio被传递给一个VMA指针和一个虚拟地址，因此它可以查阅预留映射以确定是否存在预留。
此外，alloc\_hugetlb\_folio需要一个参数avoid\_reserve，该参数表示即使看起来已经为指定的地址预留了
预留，也不应该使用预留。avoid\_reserve参数最常被用于写时拷贝和页面迁移的情况下，即现有页面的额
外拷贝被分配。

调用辅助函数vma\_needs\_reservation()来确定是否存在对映射(vma)中地址的预留。关于这个函数的详
细内容，请参见 预留映射帮助函数 一节。从
vma\_needs\_reservation()返回的值通常为0或1。如果该地址存在预留，则为0，如果不存在预留，则为1。
如果不存在预留，并且有一个与映射相关联的子池，则查询子池以确定它是否包含预留。如果子池包含预留，
则可将其中一个用于该分配。然而，在任何情况下，avoid\_reserve参数都会优先考虑为分配使用预留。在
确定预留是否存在并可用于分配后，调用dequeue\_huge\_page\_vma()函数。这个函数需要两个与预留有关
的参数：

- avoid\_reserve，这是传递给alloc\_hugetlb\_folio()的同一个值/参数。
- chg，尽管这个参数的类型是long，但只有0或1的值被传递给dequeue\_huge\_page\_vma。如果该值为0，
  则表明存在预留（关于可能的问题，请参见 “预留和内存策略” 一节）。如果值
  为1，则表示不存在预留，如果可能的话，必须从全局空闲池中取出该页。

与VMA的内存策略相关的空闲列表被搜索到一个空闲页。如果找到了一个页面，当该页面从空闲列表中移除时，
free\_huge\_pages的值被递减。如果有一个与该页相关的预留，将进行以下调整:

```
SetPagePrivate(page);   /* 表示分配这个页面消耗了一个预留，
                         * 如果遇到错误，以至于必须释放这个页面，预留将被
                         * 恢复。 */
resv_huge_pages--;      /* 减少全局预留计数 */
```

注意，如果找不到满足VMA内存策略的巨页，将尝试使用伙伴分配器分配一个。这就带来了超出预留范围
的剩余巨页和超额分配的问题。即使分配了一个多余的页面，也会进行与上面一样的基于预留的调整:
SetPagePrivate(page) 和 resv\_huge\_pages--.

在获得一个新的巨页后，(folio)->\_hugetlb\_subpool被设置为与该页面相关的子池的值，如果它存在的话。当页
面被释放时，这将被用于子池的计数。

然后调用函数vma\_commit\_reservation()，根据预留的消耗情况调整预留映射。一般来说，这涉及
到确保页面在区域映射的file\_region结构体中被表示。对于预留存在的共享映射，预留映射中的条目
已经存在，所以不做任何改变。然而，如果共享映射中没有预留，或者这是一个私有映射，则必须创建一
个新的条目。

注意，如果找不到满足VMA内存策略的巨页，将尝试使用伙伴分配器分配一个。这就带来了超出预留范围
的剩余巨页和过度分配的问题。即使分配了一个多余的页面，也会进行与上面一样的基于预留的调整。
SetPagePrivate(page)和resv\_huge\_pages-。

在获得一个新的巨页后，(page)->private被设置为与该页面相关的子池的值，如果它存在的话。当页
面被释放时，这将被用于子池的计数。

然后调用函数vma\_commit\_reservation()，根据预留的消耗情况调整预留映射。一般来说，这涉及
到确保页面在区域映射的file\_region结构体中被表示。对于预留存在的共享映射，预留映射中的条目
已经存在，所以不做任何改变。然而，如果共享映射中没有预留，或者这是一个私有映射，则必须创建
一个新的条目。

在alloc\_hugetlb\_folio()开始调用vma\_needs\_reservation()和页面分配后调用
vma\_commit\_reservation()之间，预留映射有可能被改变。如果hugetlb\_reserve\_pages在共
享映射中为同一页面被调用，这将是可能的。在这种情况下，预留计数和子池空闲页计数会有一个偏差。
这种罕见的情况可以通过比较vma\_needs\_reservation和vma\_commit\_reservation的返回值来
识别。如果检测到这种竞争，子池和全局预留计数将被调整以进行补偿。关于这些函数的更多信息，请
参见 预留映射帮助函数 一节。

### 实例化巨页

在巨页分配之后，页面通常被添加到分配任务的页表中。在此之前，共享映射中的页面被添加到页面缓
存中，私有映射中的页面被添加到匿名反向映射中。在这两种情况下，PagePrivate标志被清除。因此，
当一个已经实例化的巨页被释放时，不会对全局预留计数（resv\_huge\_pages）进行调整。

### 释放巨页

巨页释放是由函数free\_huge\_folio()执行的。这个函数是hugetlbfs复合页的析构器。因此，它只传
递一个指向页面结构体的指针。当一个巨页被释放时，可能需要进行预留计算。如果该页与包含保
留的子池相关联，或者该页在错误路径上被释放，必须恢复全局预留计数，就会出现这种情况。

page->private字段指向与该页相关的任何子池。如果PagePrivate标志被设置，它表明全局预留计数
应该被调整（关于如何设置这些标志的信息，请参见
:ref: 消耗预留/分配一个巨页 <consume\_resv> ）。

该函数首先调用hugepage\_subpool\_put\_pages()来处理该页。如果这个函数返回一个0的值（不等于
传递的1的值），它表明预留与子池相关联，这个新释放的页面必须被用来保持子池预留的数量超过最小值。
因此，在这种情况下，全局resv\_huge\_pages计数器被递增。

如果页面中设置了PagePrivate标志，那么全局resv\_huge\_pages计数器将永远被递增。

### 子池预留

有一个结构体hstate与每个巨页尺寸相关联。hstate跟踪所有指定大小的巨页。一个子池代表一
个hstate中的页面子集，它与一个已挂载的hugetlbfs文件系统相关

当一个hugetlbfs文件系统被挂载时，可以指定min\_size选项，它表示文件系统所需的最小的巨页数量。
如果指定了这个选项，与min\_size相对应的巨页的数量将被预留给文件系统使用。这个数字在结构体
hugepage\_subpool的min\_hpages字段中被跟踪。在挂载时，hugetlb\_acct\_memory(min\_hpages)
被调用以预留指定数量的巨页。如果它们不能被预留，挂载就会失败。

当从子池中获取或释放页面时，会调用hugepage\_subpool\_get/put\_pages()函数。
hugepage\_subpool\_get/put\_pages被传递给巨页数量，以此来调整子池的 “已用页面” 计数
（get为下降，put为上升）。通常情况下，如果子池中没有足够的页面，它们会返回与传递的相同的值或
一个错误。

然而，如果预留与子池相关联，可能会返回一个小于传递值的返回值。这个返回值表示必须进行的额外全局
池调整的数量。例如，假设一个子池包含3个预留的巨页，有人要求5个。与子池相关的3个预留页可以用来
满足部分请求。但是，必须从全局池中获得2个页面。为了向调用者转达这一信息，将返回值2。然后，调用
者要负责从全局池中获取另外两个页面。

### COW和预留

由于共享映射都指向并使用相同的底层页面，COW最大的预留问题是私有映射。在这种情况下，两个任务可
以指向同一个先前分配的页面。一个任务试图写到该页，所以必须分配一个新的页，以便每个任务都指向它
自己的页。

当该页最初被分配时，该页的预留被消耗了。当由于COW而试图分配一个新的页面时，有可能没有空闲的巨
页，分配会失败。

当最初创建私有映射时，通过设置所有者的预留映射指针中的HPAGE\_RESV\_OWNER位来标记映射的所有者。
由于所有者创建了映射，所有者拥有与映射相关的所有预留。因此，当一个写异常发生并且没有可用的页面
时，对预留的所有者和非所有者采取不同的行动。

在发生异常的任务不是所有者的情况下，异常将失败，该任务通常会收到一个SIGBUS。

如果所有者是发生异常的任务，我们希望它能够成功，因为它拥有原始的预留。为了达到这个目的，该页被
从非所有者任务中解映射出来。这样一来，唯一的引用就是来自拥有者的任务。此外，HPAGE\_RESV\_UNMAPPED
位被设置在非拥有任务的预留映射指针中。如果非拥有者任务后来在一个不存在的页面上发生异常，它可能
会收到一个SIGBUS。但是，映射/预留的原始拥有者的行为将与预期一致。

### 预留映射的修改

以下低级函数用于对预留映射进行修改。通常情况下，这些函数不会被直接调用。而是调用一个预留映射辅
助函数，该函数调用这些低级函数中的一个。这些低级函数在源代码（mm/hugetlb.c）中得到了相当好的
记录。这些函数是:

```
long region_chg(struct resv_map *resv, long f, long t);
long region_add(struct resv_map *resv, long f, long t);
void region_abort(struct resv_map *resv, long f, long t);
long region_count(struct resv_map *resv, long f, long t);
```

在预留映射上的操作通常涉及两个操作:

1. region\_chg()被调用来检查预留映射，并确定在指定的范围[f, t]内有多少页目前没有被代表。

   调用代码执行全局检查和分配，以确定是否有足够的巨页使操作成功。
2. 1. 如果操作能够成功，region\_add()将被调用，以实际修改先前传递给region\_chg()的相同范围
      [f, t]的预留映射。
   2. 如果操作不能成功，region\_abort被调用，在相同的范围[f, t]内中止操作。

注意，这是一个两步的过程， region\_add()和 region\_abort()在事先调用 region\_chg()后保证
成功。 region\_chg()负责预先分配任何必要的数据结构以确保后续操作（特别是 region\_add()）的
成功。

如上所述，region\_chg()确定该范围内当前没有在映射中表示的页面的数量。region\_add()返回添加
到映射中的范围内的页数。在大多数情况下， region\_add() 的返回值与 region\_chg() 的返回值相
同。然而，在共享映射的情况下，有可能在调用 region\_chg() 和 region\_add() 之间对预留映射进
行更改。在这种情况下，region\_add()的返回值将与region\_chg()的返回值不符。在这种情况下，全局计数
和子池计数很可能是不正确的，需要调整。检查这种情况并进行适当的调整是调用者的责任。

函数region\_del()被调用以从预留映射中移除区域。
它通常在以下情况下被调用:

- 当hugetlbfs文件系统中的一个文件被删除时，该节点将被释放，预留映射也被释放。在释放预留映射
  之前，所有单独的file\_region结构体必须被释放。在这种情况下，region\_del的范围是[0, LONG\_MAX]。
- 当一个hugetlbfs文件正在被截断时。在这种情况下，所有在新文件大小之后分配的页面必须被释放。
  此外，预留映射中任何超过新文件大小的file\_region条目必须被删除。在这种情况下，region\_del
  的范围是[new\_end\_of\_file, LONG\_MAX]。
- 当在一个hugetlbfs文件中打洞时。在这种情况下，巨页被一次次从文件的中间移除。当这些页被移除
  时，region\_del()被调用以从预留映射中移除相应的条目。在这种情况下，region\_del被传递的范
  围是[page\_idx, page\_idx + 1]。

在任何情况下，region\_del()都会返回从预留映射中删除的页面数量。在非常罕见的情况下，region\_del()
会失败。这只能发生在打洞的情况下，即它必须分割一个现有的file\_region条目，而不能分配一个新的
结构体。在这种错误情况下，region\_del()将返回-ENOMEM。这里的问题是，预留映射将显示对该页有
预留。然而，子池和全局预留计数将不反映该预留。为了处理这种情况，调用函数hugetlb\_fix\_reserve\_counts()
来调整计数器，使其与不能被删除的预留映射条目相对应。

region\_count()在解除私有巨页映射时被调用。在私有映射中，预留映射中没有条目表明存在一个预留。
因此，通过计算预留映射中的条目数，我们知道有多少预留被消耗了，有多少预留是未完成的
（Outstanding = (end - start) - region\_count（resv, start, end））。由于映射正在消
失，子池和全局预留计数被未完成的预留数量所减去。

### 预留映射帮助函数

有几个辅助函数可以查询和修改预留映射。这些函数只对特定的巨页的预留感兴趣，所以它们只是传入一个
地址而不是一个范围。此外，它们还传入相关的VMA。从VMA中，可以确定映射的类型（私有或共享）和预留
映射的位置（inode或VMA）。这些函数只是调用 “预留映射的修改” 一节中描述的基础函数。然而，
它们确实考虑到了私有和共享映射的预留映射条目的 “相反” 含义，并向调用者隐藏了这个细节:

```
long vma_needs_reservation(struct hstate *h,
                           struct vm_area_struct *vma,
                           unsigned long addr)
```

该函数为指定的页面调用 region\_chg()。如果不存在预留，则返回1。如果存在预留，则返回0:

```
long vma_commit_reservation(struct hstate *h,
                            struct vm_area_struct *vma,
                            unsigned long addr)
```

这将调用 region\_add()，用于指定的页面。与region\_chg和region\_add的情况一样，该函数应在
先前调用的vma\_needs\_reservation后调用。它将为该页添加一个预留条目。如果预留被添加，它将
返回1，如果没有则返回0。返回值应与之前调用vma\_needs\_reservation的返回值进行比较。如果出
现意外的差异，说明在两次调用之间修改了预留映射:

```
void vma_end_reservation(struct hstate *h,
                         struct vm_area_struct *vma,
                         unsigned long addr)
```

这将调用指定页面的 region\_abort()。与region\_chg和region\_abort的情况一样，该函数应在
先前调用的vma\_needs\_reservation后被调用。它将中止/结束正在进行的预留添加操作:

```
long vma_add_reservation(struct hstate *h,
                         struct vm_area_struct *vma,
                         unsigned long addr)
```

这是一个特殊的包装函数，有助于在错误路径上清理预留。它只从repare\_reserve\_on\_error()函数
中调用。该函数与vma\_needs\_reservation一起使用，试图将一个预留添加到预留映射中。它考虑到
了私有和共享映射的不同预留映射语义。因此，region\_add被调用用于共享映射（因为映射中的条目表
示预留），而region\_del被调用用于私有映射（因为映射中没有条目表示预留）。关于在错误路径上需
要做什么的更多信息，请参见 “错误路径中的预留清理” 。

### 错误路径中的预留清理

正如在预留映射帮助函数 一节中提到的，预留的修改分两步进行。首
先，在分配页面之前调用vma\_needs\_reservation。如果分配成功，则调用vma\_commit\_reservation。
如果不是，则调用vma\_end\_reservation。全局和子池的预留计数根据操作的成功或失败进行调整，
一切都很好。

此外，在一个巨页被实例化后，PagePrivate标志被清空，这样，当页面最终被释放时，计数是
正确的。

然而，有几种情况是，在一个巨页被分配后，但在它被实例化之前，就遇到了错误。在这种情况下，
页面分配已经消耗了预留，并进行了适当的子池、预留映射和全局计数调整。如果页面在这个时候被释放
（在实例化和清除PagePrivate之前），那么free\_huge\_folio将增加全局预留计数。然而，预留映射
显示报留被消耗了。这种不一致的状态将导致预留的巨页的 “泄漏” 。全局预留计数将比它原本的要高，
并阻止分配一个预先分配的页面。

函数 restore\_reserve\_on\_error() 试图处理这种情况。它有相当完善的文档。这个函数的目的
是将预留映射恢复到页面分配前的状态。通过这种方式，预留映射的状态将与页面释放后的全局预留计
数相对应。

函数restore\_reserve\_on\_error本身在试图恢复预留映射条目时可能会遇到错误。在这种情况下，
它将简单地清除该页的PagePrivate标志。这样一来，当页面被释放时，全局预留计数将不会被递增。
然而，预留映射将继续看起来像预留被消耗了一样。一个页面仍然可以被分配到该地址，但它不会像最
初设想的那样使用一个预留页。

有一些代码（最明显的是userfaultfd）不能调用restore\_reserve\_on\_error。在这种情况下，
它简单地修改了PagePrivate，以便在释放巨页时不会泄露预留。

### 预留和内存策略

当git第一次被用来管理Linux代码时，每个节点的巨页列表就存在于hstate结构中。预留的概念是
在一段时间后加入的。当预留被添加时，没有尝试将内存策略考虑在内。虽然cpusets与内存策略不
完全相同，但hugetlb\_acct\_memory中的这个注释总结了预留和cpusets/内存策略之间的相互作
用:

```
/*
 * 当cpuset被配置时，它打破了严格的hugetlb页面预留，因为计数是在一个全局变量上完
 * 成的。在有cpuset的情况下，这样的预留完全是垃圾，因为预留没有根据当前cpuset的
 * 页面可用性来检查。在任务所在的cpuset中缺乏空闲的htlb页面时，应用程序仍然有可能
 * 被内核OOM'ed。试图用cpuset来执行严格的计数几乎是不可能的（或者说太难看了），因
 * 为cpuset太不稳定了，任务或内存节点可以在cpuset之间动态移动。与cpuset共享
 * hugetlb映射的语义变化是不可取的。然而，为了预留一些语义，我们退回到检查当前空闲
 * 页的可用性，作为一种最好的尝试，希望能将cpuset改变语义的影响降到最低。
 */
```

添加巨页预留是为了防止在缺页异常时出现意外的页面分配失败（OOM）。然而，如果一个应用
程序使用cpusets或内存策略，就不能保证在所需的节点上有巨页可用。即使有足够数量的全局
预留，也是如此。

### Hugetlbfs回归测试

最完整的hugetlb测试集在libhugetlbfs仓库。如果你修改了任何hugetlb相关的代码，请使用
libhugetlbfs测试套件来检查回归情况。此外，如果你添加了任何新的hugetlb功能，请在
libhugetlbfs中添加适当的测试。

--
Mike Kravetz，2017年4月7日

## 来源、版本与核验

- 来源：[Hugetlbfs 预留](https://docs.kernel.org/translations/zh_CN/mm/hugetlbfs_reserv.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0 (repository default; no file SPDX found)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/mm/hugetlbfs_reserv.rst`。
