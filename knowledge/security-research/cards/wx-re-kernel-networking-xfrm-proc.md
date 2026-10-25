---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-networking-xfrm-proc",
  "title": "Linux 内核：XFRM proc - /proc/net/xfrm_* 文件",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "networking"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "5af68f3ecb512b1cb9c4f2555521ba4f2605e9f3987bbbd11101b67128f4882e",
  "generatedHash": "7822dfa2433bf479b2b3bd9bccd38b6077feb732c6cd04977cc0a8dfd6fc15d6",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "xfrm_proc 提供一组统计计数器，显示转换过程中丢弃的数据包及其原因。 这些计数器属于Linux私有MIB的一部分，可通过 /proc/net/xfrm_stat 查看。 XfrmInError: :   未匹配其他类别的所有错误 XfrmInNoStates: :   未找到状态 （入站SPI、地址或SA的IPsec协议不匹配） XfrmInStat",
  "l1": "xfrm_proc 提供一组统计计数器，显示转换过程中丢弃的数据包及其原因。 这些计数器属于Linux私有MIB的一部分，可通过 /proc/net/xfrm_stat 查看。 XfrmInError: :   未匹配其他类别的所有错误 XfrmInNoStates: :   未找到状态 （入站SPI、地址或SA的IPsec协议不匹配） XfrmInStateProtoError: :   转换协议相关的错误 （如SA密钥错误） XfrmInStateSeqError: :   序列号错误 :   序列号超出窗口范围 XfrmInStateMismatch: :   状态选项不匹配 （如UDP封装类型不匹配） XfrmInTmplMismatch: :   状态模板不匹配 （如入站SA正确但SP规则错误） XfrmInNoPols: :   未找到状态的对应策略 （如入站SA正确但无SP规",
  "questions": [
    "Linux 内核：XFRM proc - /proc/net/xfrm_* 文件的原理是什么？",
    "Linux 内核：XFRM proc - /proc/net/xfrm_* 文件有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-networking-xfrm-proc",
      "url": "https://docs.kernel.org/translations/zh_CN/networking/xfrm_proc.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：XFRM proc - /proc/net/xfrm_* 文件

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## XFRM proc - /proc/net/xfrm\_\* 文件

作者：Masahide NAKAMURA <[nakam@linux-ipv6.org](mailto:nakam@linux-ipv6.org)>

### 转换统计信息

xfrm\_proc 提供一组统计计数器，显示转换过程中丢弃的数据包及其原因。
这些计数器属于Linux私有MIB的一部分，可通过 /proc/net/xfrm\_stat
查看。

#### 入站错误

XfrmInError:
:   未匹配其他类别的所有错误

XfrmInBufferError:
:   缓冲区不足

XfrmInHdrError:
:   头部错误

XfrmInNoStates:
:   未找到状态
    （入站SPI、地址或SA的IPsec协议不匹配）

XfrmInStateProtoError:
:   转换协议相关的错误
    （如SA密钥错误）

XfrmInStateModeError:
:   转换模式相关的错误

XfrmInStateSeqError:
:   序列号错误
    :   序列号超出窗口范围

XfrmInStateExpired:
:   状态已过期

XfrmInStateMismatch:
:   状态选项不匹配
    （如UDP封装类型不匹配）

XfrmInStateInvalid:
:   无效状态

XfrmInTmplMismatch:
:   状态模板不匹配
    （如入站SA正确但SP规则错误）

XfrmInNoPols:
:   未找到状态的对应策略
    （如入站SA正确但无SP规则）

XfrmInPolBlock:
:   丢弃的策略

XfrmInPolError:
:   错误的策略

XfrmAcquireError:
:   状态未完全获取即被使用

XfrmFwdHdrError:
:   转发路由禁止

XfrmInStateDirError:
:   状态方向不匹配
    （输入路径查找到输出状态，预期是输入状态或者无方向）

#### 出站错误

XfrmOutError:
:   未匹配其他类别的所有错误

XfrmOutBundleGenError:
:   捆绑包生成错误

XfrmOutBundleCheckError:
:   捆绑包校验错误

XfrmOutNoStates:
:   未找到状态

XfrmOutStateProtoError:
:   转换协议特定错误

XfrmOutStateModeError:
:   转换模式特定错误

XfrmOutStateSeqError:
:   序列号错误
    （序列号溢出）

XfrmOutStateExpired:
:   状态已过期

XfrmOutPolBlock:
:   丢弃策略

XfrmOutPolDead:
:   失效策略

XfrmOutPolError:
:   错误策略

XfrmOutStateInvalid:
:   无效状态（可能已过期）

XfrmOutStateDirError:
:   状态方向不匹配（输出路径查找到输入状态，预期为输出状态或无方向）

## 来源、版本与核验

- 来源：[XFRM proc - /proc/net/xfrm_* 文件](https://docs.kernel.org/translations/zh_CN/networking/xfrm_proc.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/networking/xfrm_proc.rst`。
