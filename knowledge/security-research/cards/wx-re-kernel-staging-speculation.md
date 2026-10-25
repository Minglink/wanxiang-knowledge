---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-staging-speculation",
  "title": "Linux 内核：推测执行",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "staging"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "9d2a045a006a4717068b3876efe8d6d72f60ef41513d0fc07d0eaa7be1e3bee3",
  "generatedHash": "a77c1ce686bf7e947b88cd87b815e1b5d7833aaae31b4b4ad8c77299fe3ee624",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "本文档解释了推测执行的潜在影响，以及如何使用通用API来减轻不良影响。 为提高性能并减少平均延迟，许多现代处理器都采用分支预测等推测执行技术，执行结果 可能在后续阶段被丢弃。 通常情况下，我们无法从架构状态（如寄存器内容）观察到推测执行。然而，在某些情况 下从微架构状态观察其影响是可能的，例如数据是否存在于缓存中。这种状态可能会形成 侧信道，通过观察侧信道可",
  "l1": "本文档解释了推测执行的潜在影响，以及如何使用通用API来减轻不良影响。 为提高性能并减少平均延迟，许多现代处理器都采用分支预测等推测执行技术，执行结果 可能在后续阶段被丢弃。 通常情况下，我们无法从架构状态（如寄存器内容）观察到推测执行。然而，在某些情况 下从微架构状态观察其影响是可能的，例如数据是否存在于缓存中。这种状态可能会形成 侧信道，通过观察侧信道可以提取秘密信息。 例如，在分支预测存在的情况下，边界检查可能被推测执行的代码忽略。考虑以下代码: 在arm64上，可以编译成如下汇编序列: 处理器有可能误预测条件分支，并推测性装载array[index]，即使index >= MAX_ARRAY_ELEMS。 这个值随后会被丢弃，但推测的装载可能会影响微架构状态，随后可被测量到。 涉及多个依赖内存访问的更复杂序列可能会导致敏感信息泄露。以前面的示例为基础，考虑 以下代码: 根据推测，对",
  "questions": [
    "Linux 内核：推测执行的原理是什么？",
    "Linux 内核：推测执行有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-staging-speculation",
      "url": "https://docs.kernel.org/translations/zh_CN/staging/speculation.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：推测执行

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 推测执行

本文档解释了推测执行的潜在影响，以及如何使用通用API来减轻不良影响。

---

为提高性能并减少平均延迟，许多现代处理器都采用分支预测等推测执行技术，执行结果
可能在后续阶段被丢弃。

通常情况下，我们无法从架构状态（如寄存器内容）观察到推测执行。然而，在某些情况
下从微架构状态观察其影响是可能的，例如数据是否存在于缓存中。这种状态可能会形成
侧信道，通过观察侧信道可以提取秘密信息。

例如，在分支预测存在的情况下，边界检查可能被推测执行的代码忽略。考虑以下代码:

```
int load_array(int *array, unsigned int index)
{
        if (index >= MAX_ARRAY_ELEMS)
                return 0;
        else
                return array[index];
}
```

在arm64上，可以编译成如下汇编序列:

```
      CMP     <index>, #MAX_ARRAY_ELEMS
      B.LT    less
      MOV     <returnval>, #0
      RET
less:
      LDR     <returnval>, [<array>, <index>]
      RET
```

处理器有可能误预测条件分支，并推测性装载array[index]，即使index >= MAX\_ARRAY\_ELEMS。
这个值随后会被丢弃，但推测的装载可能会影响微架构状态，随后可被测量到。

涉及多个依赖内存访问的更复杂序列可能会导致敏感信息泄露。以前面的示例为基础，考虑
以下代码:

```
int load_dependent_arrays(int *arr1, int *arr2, int index)
{
        int val1, val2,

        val1 = load_array(arr1, index);
        val2 = load_array(arr2, val1);

        return val2;
}
```

根据推测，对load\_array()的第一次调用可能会返回一个越界地址的值，而第二次调用将影响
依赖于该值的微架构状态。这可能会提供一个任意读取原语。

### 缓解推测执行侧信道

内核提供了一个通用API以确保即使在推测情况下也能遵守边界检查。受推测执行侧信道影响
的架构应当实现这些原语。

<linux/nospec.h>中的array\_index\_nospec()辅助函数可用于防止信息通过侧信道泄漏。

调用array\_index\_nospec(index, size)将返回一个经过净化的索引值，即使在CPU推测执行
条件下，该值也会被严格限制在[0, size)范围内。

这可以用来保护前面的load\_array()示例:

```
int load_array(int *array, unsigned int index)
{
        if (index >= MAX_ARRAY_ELEMS)
                return 0;
        else {
                index = array_index_nospec(index, MAX_ARRAY_ELEMS);
                return array[index];
        }
}
```

## 来源、版本与核验

- 来源：[推测执行](https://docs.kernel.org/translations/zh_CN/staging/speculation.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/staging/speculation.rst`。
