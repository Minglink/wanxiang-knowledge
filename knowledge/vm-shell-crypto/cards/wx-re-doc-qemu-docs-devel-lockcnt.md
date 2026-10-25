---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-qemu-docs-devel-lockcnt",
  "title": "QEMU：Locked Counters (aka QemuLockCnt)",
  "type": "note",
  "tags": [
    "VM",
    "系统虚拟机",
    "QEMU",
    "底层实现",
    "lockcnt",
    "qemu"
  ],
  "project": "VM与动态翻译",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "afbb3dd23652022fcd71b7e9b4563df4b8e8b602b254cbdea4657c03580978c2",
  "generatedHash": "41314efb9205550320b29f615c0c5f1fe94dab0f6e0509cdbfd9f47c0d25b267",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Locked Counters (aka QemuLockCnt)：Locked Counters (aka ``QemuLockCnt``)",
  "l1": "QEMU often uses reference counts to track data structures that are being accessed and should not be freed. For example, a loop that invoke callbacks like this is not safe:: QLIST_FOREACH_SAFE(ioh, &io_handlers, next, pioh) { if (ioh->revents & G_IO_OUT) { ioh->fd_write(ioh->opaque); } } `QLIST_FOREACH_SAFE` protects against deletion of the current node (`ioh`) by stashing away its `next` pointer. However, `ioh->fd_write` could actually delete the next node from the list. The simplest way to avoid this is to mark the node as deleted, and remove it from the list in the above loop:: QLIST_FOREACH_SAFE(ioh, &io_handlers, next, pioh) { if (ioh->deleted) { QLIST_REMOVE(ioh, next); g_free(ioh); } else { if (ioh->revents & G_IO_OUT) { ioh->fd_write(ioh->opaque); } } } If however this loop must also be reentrant, i.e. it is possible that `ioh->fd_",
  "questions": [
    "lockcnt 如何用于Locked Counters (aka QemuLockCnt)？",
    "lockcnt 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-qemu-docs-devel-lockcnt",
      "url": "https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/lockcnt.rst",
      "checkedAt": "2026-10-25",
      "version": "v10.0.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）"
}
---
# QEMU：Locked Counters (aka QemuLockCnt)

> 本文收录 QEMU 的独立技术文献正文，固定标签 `v10.0.0`。主题：Locked Counters (aka QemuLockCnt)。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

Locked Counters (aka ``QemuLockCnt``)

## 技术正文

## Locked Counters (aka ``QemuLockCnt``)


QEMU often uses reference counts to track data structures that are being
accessed and should not be freed.  For example, a loop that invoke
callbacks like this is not safe::

    QLIST_FOREACH_SAFE(ioh, &io_handlers, next, pioh) {
        if (ioh->revents & G_IO_OUT) {
            ioh->fd_write(ioh->opaque);
        }
    }

`QLIST_FOREACH_SAFE` protects against deletion of the current node (`ioh`)
by stashing away its `next` pointer.  However, `ioh->fd_write` could
actually delete the next node from the list.  The simplest way to
avoid this is to mark the node as deleted, and remove it from the
list in the above loop::

    QLIST_FOREACH_SAFE(ioh, &io_handlers, next, pioh) {
        if (ioh->deleted) {
            QLIST_REMOVE(ioh, next);
            g_free(ioh);
        } else {
            if (ioh->revents & G_IO_OUT) {
                ioh->fd_write(ioh->opaque);
            }
        }
    }

If however this loop must also be reentrant, i.e. it is possible that
`ioh->fd_write` invokes the loop again, some kind of counting is needed::

    walking_handlers++;
    QLIST_FOREACH_SAFE(ioh, &io_handlers, next, pioh) {
        if (ioh->deleted) {
            if (walking_handlers == 1) {
                QLIST_REMOVE(ioh, next);
                g_free(ioh);
            }
        } else {
            if (ioh->revents & G_IO_OUT) {
                ioh->fd_write(ioh->opaque);
            }
        }
    }
    walking_handlers--;

One may think of using the RCU primitives, `rcu_read_lock()` and
`rcu_read_unlock()`; effectively, the RCU nesting count would take
the place of the walking_handlers global variable.  Indeed,
reference counting and RCU have similar purposes, but their usage in
general is complementary:

- reference counting is fine-grained and limited to a single data
  structure; RCU delays reclamation of *all* RCU-protected data
  structures;

- reference counting works even in the presence of code that keeps
  a reference for a long time; RCU critical sections in principle
  should be kept short;

- reference counting is often applied to code that is not thread-safe
  but is reentrant; in fact, usage of reference counting in QEMU predates
  the introduction of threads by many years.  RCU is generally used to
  protect readers from other threads freeing memory after concurrent
  modifications to a data structure.

- reclaiming data can be done by a separate thread in the case of RCU;
  this can improve performance, but also delay reclamation undesirably.
  With reference counting, reclamation is deterministic.

This file documents `QemuLockCnt`, an abstraction for using reference
counting in code that has to be both thread-safe and reentrant.


### ``QemuLockCnt`` concepts


A `QemuLockCnt` comprises both a counter and a mutex; it has primitives
to increment and decrement the counter, and to take and release the
mutex.  The counter notes how many visits to the data structures are
taking place (the visits could be from different threads, or there could
be multiple reentrant visits from the same thread).  The basic rules
governing the counter/mutex pair then are the following:

- Data protected by the QemuLockCnt must not be freed unless the
  counter is zero and the mutex is taken.

- A new visit cannot be started while the counter is zero and the
  mutex is taken.

Most of the time, the mutex protects all writes to the data structure,
not just frees, though there could be cases where this is not necessary.

Reads, instead, can be done without taking the mutex, as long as the
readers and writers use the same macros that are used for RCU, for
example `qatomic_rcu_read`, `qatomic_rcu_set`, `QLIST_FOREACH_RCU`,
etc.  This is because the reads are done outside a lock and a set
or `QLIST_INSERT_HEAD`
can happen concurrently with the read.  The RCU API ensures that the
processor and the compiler see all required memory barriers.

This could be implemented simply by protecting the counter with the
mutex, for example::

    // (1)
    qemu_mutex_lock(&walking_handlers_mutex);
    walking_handlers++;
    qemu_mutex_unlock(&walking_handlers_mutex);

    ...

    // (2)
    qemu_mutex_lock(&walking_handlers_mutex);
    if (--walking_handlers == 0) {
        QLIST_FOREACH_SAFE(ioh, &io_handlers, next, pioh) {
            if (ioh->deleted) {
                QLIST_REMOVE(ioh, next);
                g_free(ioh);
            }
        }
    }
    qemu_mutex_unlock(&walking_handlers_mutex);

Here, no frees can happen in the code represented by the ellipsis.
If another thread is executing critical section (2), that part of
the code cannot be entered, because the thread will not be able
to increment the `walking_handlers` variable.  And of course
during the visit any other thread will see a nonzero value for
`walking_handlers`, as in the single-threaded code.

Note that it is possible for multiple concurrent accesses to delay
the cleanup arbitrarily; in other words, for the `walking_handlers`
counter to never become zero.  For this reason, this technique is
more easily applicable if concurrent access to the structure is rare.

However, critical sections are easy to forget since you have to do
them for each modification of the counter.  `QemuLockCnt` ensures that
all modifications of the counter take the lock appropriately, and it
can also be more efficient in two ways:

- it avoids taking the lock for many operations (for example
  incrementing the counter while it is non-zero);

- on some platforms, one can implement `QemuLockCnt` to hold the lock
  and the mutex in a single word, making the fast path no more expensive
  than simply managing a counter using atomic operations (see
  `atomics`).  This can be very helpful if concurrent access to
  the data structure is expected to be rare.


Using the same mutex for frees and writes can still incur some small
inefficiencies; for example, a visit can never start if the counter is
zero and the mutex is taken -- even if the mutex is taken by a write,
which in principle need not block a visit of the data structure.
However, these are usually not a problem if any of the following
assumptions are valid:

- concurrent access is possible but rare

- writes are rare

- writes are frequent, but this kind of write (e.g. appending to a
  list) has a very small critical section.

For example, QEMU uses `QemuLockCnt` to manage an `AioContext`'s list of
bottom halves and file descriptor handlers.  Modifications to the list
of file descriptor handlers are rare.  Creation of a new bottom half is
frequent and can happen on a fast path; however: 1) it is almost never
concurrent with a visit to the list of bottom halves; 2) it only has
three instructions in the critical path, two assignments and a `smp_wmb()`.


### ``QemuLockCnt`` API


.. kernel-doc:: include/qemu/lockcnt.h


### ``QemuLockCnt`` usage


This section explains the typical usage patterns for `QemuLockCnt` functions.

Setting a variable to a non-NULL value can be done between
`qemu_lockcnt_lock` and `qemu_lockcnt_unlock`::

    qemu_lockcnt_lock(&xyz_lockcnt);
    if (!xyz) {
        new_xyz = g_new(XYZ, 1);
        ...
        qatomic_rcu_set(&xyz, new_xyz);
    }
    qemu_lockcnt_unlock(&xyz_lockcnt);

Accessing the value can be done between `qemu_lockcnt_inc` and
`qemu_lockcnt_dec`::

    qemu_lockcnt_inc(&xyz_lockcnt);
    if (xyz) {
        XYZ *p = qatomic_rcu_read(&xyz);
        ...
        /* Accesses can now be done through "p".  */
    }
    qemu_lockcnt_dec(&xyz_lockcnt);

Freeing the object can similarly use `qemu_lockcnt_lock` and
`qemu_lockcnt_unlock`, but you also need to ensure that the count
is zero (i.e. there is no concurrent visit).  Because `qemu_lockcnt_inc`
takes the `QemuLockCnt`'s lock, the count cannot become non-zero while
the object is being freed.  Freeing an object looks like this::

    qemu_lockcnt_lock(&xyz_lockcnt);
    if (!qemu_lockcnt_count(&xyz_lockcnt)) {
        g_free(xyz);
        xyz = NULL;
    }
    qemu_lockcnt_unlock(&xyz_lockcnt);

If an object has to be freed right after a visit, you can combine
the decrement, the locking and the check on count as follows::

    qemu_lockcnt_inc(&xyz_lockcnt);
    if (xyz) {
        XYZ *p = qatomic_rcu_read(&xyz);
        ...
        /* Accesses can now be done through "p".  */
    }
    if (qemu_lockcnt_dec_and_lock(&xyz_lockcnt)) {
        g_free(xyz);
        xyz = NULL;
        qemu_lockcnt_unlock(&xyz_lockcnt);
    }

`QemuLockCnt` can also be used to access a list as follows::

    qemu_lockcnt_inc(&io_handlers_lockcnt);
    QLIST_FOREACH_RCU(ioh, &io_handlers, pioh) {
        if (ioh->revents & G_IO_OUT) {
            ioh->fd_write(ioh->opaque);
        }
    }

    if (qemu_lockcnt_dec_and_lock(&io_handlers_lockcnt)) {
        QLIST_FOREACH_SAFE(ioh, &io_handlers, next, pioh) {
            if (ioh->deleted) {
                QLIST_REMOVE(ioh, next);
                g_free(ioh);
            }
        }
        qemu_lockcnt_unlock(&io_handlers_lockcnt);
    }

Again, the RCU primitives are used because new items can be added to the
list during the walk.  `QLIST_FOREACH_RCU` ensures that the processor and
the compiler see the appropriate memory barriers.

An alternative pattern uses `qemu_lockcnt_dec_if_lock`::

    qemu_lockcnt_inc(&io_handlers_lockcnt);
    QLIST_FOREACH_SAFE_RCU(ioh, &io_handlers, next, pioh) {
        if (ioh->deleted) {
            if (qemu_lockcnt_dec_if_lock(&io_handlers_lockcnt)) {
                QLIST_REMOVE(ioh, next);
                g_free(ioh);
                qemu_lockcnt_inc_and_unlock(&io_handlers_lockcnt);
            }
        } else {
            if (ioh->revents & G_IO_OUT) {
                ioh->fd_write(ioh->opaque);
            }
        }
    }
    qemu_lockcnt_dec(&io_handlers_lockcnt);

Here you can use `qemu_lockcnt_dec` instead of `qemu_lockcnt_dec_and_lock`,
because there is no special task to do if the count goes from 1 to 0.

## 来源、版本与核验

- 上游：[docs/devel/lockcnt.rst](https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/lockcnt.rst)
- 作者：qemu/qemu 项目贡献者，原文内具体署名保留。
- 标签：v10.0.0；树标识：7c949c53e936aa3a658d84ab53bae5cadaa5d59c；获取日期：2026-10-25。
- 许可：GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/qemu/docs/devel/lockcnt.rst`；SHA-256：`afbb3dd23652022fcd71b7e9b4563df4b8e8b602b254cbdea4657c03580978c2`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
