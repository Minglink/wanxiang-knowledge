---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-core-api-protection-keys",
  "title": "Linux 内核：内存保护密钥",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "core-api"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "467d04800b4e1a6e84ab77a483390a14830adc3c4b3bd74d95a2a32db17fa9fb",
  "generatedHash": "aaf40a6c7d27303c4330ec63e0f61e0db2238d01fa80376820f2cb2ca593014c",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "用户空间的内存保护密钥（Memory Protection Keys for Userspace，PKU，亦 即PKEYs）是英特尔Skylake（及以后）“可扩展处理器”服务器CPU上的一项功能。 它将在未来的非服务器英特尔处理器和未来的AMD处理器中可用。 对于任何希望测试或使用该功能的人来说，它在亚马逊的EC2 C5实例中是可用的， 并且已知可以在那里",
  "l1": "用户空间的内存保护密钥（Memory Protection Keys for Userspace，PKU，亦 即PKEYs）是英特尔Skylake（及以后）“可扩展处理器”服务器CPU上的一项功能。 它将在未来的非服务器英特尔处理器和未来的AMD处理器中可用。 对于任何希望测试或使用该功能的人来说，它在亚马逊的EC2 C5实例中是可用的， 并且已知可以在那里使用Ubuntu 17.04镜像运行。 内存保护密钥提供了一种机制来执行基于页面的保护，但在应用程序改变保护域 时不需要修改页表。它的工作原理是在每个页表项中为“保护密钥”分配4个以 前被忽略的位，从而提供16个可能的密钥。 还有一个新的用户可访问寄存器（PKRU），为每个密钥提供两个单独的位（访 问禁止和写入禁止）。作为一个CPU寄存器，PKRU在本质上是线程本地的，可能 会给每个线程提供一套不同于其他线程的保护措施。 有两条新指令（",
  "questions": [
    "Linux 内核：内存保护密钥的原理是什么？",
    "Linux 内核：内存保护密钥有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-core-api-protection-keys",
      "url": "https://docs.kernel.org/translations/zh_CN/core-api/protection-keys.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：内存保护密钥

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 内存保护密钥

用户空间的内存保护密钥（Memory Protection Keys for Userspace，PKU，亦
即PKEYs）是英特尔Skylake（及以后）“可扩展处理器”服务器CPU上的一项功能。
它将在未来的非服务器英特尔处理器和未来的AMD处理器中可用。

对于任何希望测试或使用该功能的人来说，它在亚马逊的EC2 C5实例中是可用的，
并且已知可以在那里使用Ubuntu 17.04镜像运行。

内存保护密钥提供了一种机制来执行基于页面的保护，但在应用程序改变保护域
时不需要修改页表。它的工作原理是在每个页表项中为“保护密钥”分配4个以
前被忽略的位，从而提供16个可能的密钥。

还有一个新的用户可访问寄存器（PKRU），为每个密钥提供两个单独的位（访
问禁止和写入禁止）。作为一个CPU寄存器，PKRU在本质上是线程本地的，可能
会给每个线程提供一套不同于其他线程的保护措施。

有两条新指令（RDPKRU/WRPKRU）用于读取和写入新的寄存器。该功能仅在64位
模式下可用，尽管物理地址扩展页表中理论上有空间。这些权限只在数据访问上
强制执行，对指令获取没有影响。

### 系统调用

有3个系统调用可以直接与pkeys进行交互:

```
int pkey_alloc(unsigned long flags, unsigned long init_access_rights)
int pkey_free(int pkey);
int pkey_mprotect(unsigned long start, size_t len,
                  unsigned long prot, int pkey);
```

在使用一个pkey之前，必须先用pkey\_alloc()分配它。一个应用程序直接调用
WRPKRU指令，以改变一个密钥覆盖的内存的访问权限。在这个例子中，WRPKRU
被一个叫做pkey\_set()的C函数所封装:

```
int real_prot = PROT_READ|PROT_WRITE;
pkey = pkey_alloc(0, PKEY_DISABLE_WRITE);
ptr = mmap(NULL, PAGE_SIZE, PROT_NONE, MAP_ANONYMOUS|MAP_PRIVATE, -1, 0);
ret = pkey_mprotect(ptr, PAGE_SIZE, real_prot, pkey);
... application runs here
```

现在，如果应用程序需要更新'ptr'处的数据，它可以获得访问权，进行更新，
然后取消其写访问权:

```
pkey_set(pkey, 0); // clear PKEY_DISABLE_WRITE
*ptr = foo; // assign something
pkey_set(pkey, PKEY_DISABLE_WRITE); // set PKEY_DISABLE_WRITE again
```

现在，当它释放内存时，它也将释放pkey，因为它不再被使用了:

```
munmap(ptr, PAGE_SIZE);
pkey_free(pkey);
```

Note

pkey\_set()是RDPKRU和WRPKRU指令的一个封装器。在tools/testing/selftests/x86/protection\_keys.c中可以找到一个实现实例。
tools/testing/selftests/x86/protection\_keys.c.

### 行为

内核试图使保护密钥与普通的mprotect()的行为一致。例如，如果你这样做:

```
mprotect(ptr, size, PROT_NONE);
something(ptr);
```

这样做的时候，你可以期待保护密钥的相同效果:

```
pkey = pkey_alloc(0, PKEY_DISABLE_WRITE | PKEY_DISABLE_READ);
pkey_mprotect(ptr, size, PROT_READ|PROT_WRITE, pkey);
something(ptr);
```

无论something()是否是对'ptr'的直接访问，这都应该为真。
如:

```
*ptr = foo;
```

或者当内核代表应用程序进行访问时，比如read():

```
read(fd, ptr, 1);
```

在这两种情况下，内核都会发送一个SIGSEGV，但当违反保护密钥时，si\_code
将被设置为SEGV\_PKERR，而当违反普通的mprotect()权限时，则是SEGV\_ACCERR。

## 来源、版本与核验

- 来源：[内存保护密钥](https://docs.kernel.org/translations/zh_CN/core-api/protection-keys.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/core-api/protection-keys.rst`。
