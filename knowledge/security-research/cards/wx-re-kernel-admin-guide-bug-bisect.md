---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-admin-guide-bug-bisect",
  "title": "Linux 内核：二分（bisect）缺陷",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "admin-guide"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "0ba0dad0228d6dad32f865c774a8e76be393136964de5e50a2b39334bee5879d",
  "generatedHash": "a6507d6251c92d2e2c09575db5e64a0c0c2e4d09de0c4fe223b1fd2ec249119f",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "始终尝试由来自kernel.org的源代码构建的最新内核。如果您没有信心这样做，请将 错误报告给您的发行版供应商，而不是内核开发人员。 找到缺陷（bug）并不总是那么容易，不过仍然得去找。如果你找不到它，不要放弃。 尽可能多的向相关维护人员报告您发现的信息。请参阅MAINTAINERS文件以了解您所 关注的子系统的维护人员。 在提交错误报告之前，请阅读“Do",
  "l1": "始终尝试由来自kernel.org的源代码构建的最新内核。如果您没有信心这样做，请将 错误报告给您的发行版供应商，而不是内核开发人员。 找到缺陷（bug）并不总是那么容易，不过仍然得去找。如果你找不到它，不要放弃。 尽可能多的向相关维护人员报告您发现的信息。请参阅MAINTAINERS文件以了解您所 关注的子系统的维护人员。 在提交错误报告之前，请阅读“Documentation/admin-guide/reporting-issues.rst”。 这通常是由udev/systemd引起的。在将其归咎于内核之前先检查一下。 使用 git 提供的工具可以很容易地找到缺陷，只要缺陷是可复现的。 - 从git源代码构建内核 - 以此开始二分 [[1]](#f1): - 重新构建内核并测试 - 使用以下任一与git bisect进行交互: 这取决于您测试的变更集上是否有缺陷 - 在一些交互之后，g",
  "questions": [
    "Linux 内核：二分（bisect）缺陷的原理是什么？",
    "Linux 内核：二分（bisect）缺陷有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-admin-guide-bug-bisect",
      "url": "https://docs.kernel.org/translations/zh_CN/admin-guide/bug-bisect.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0 (repository default; no file SPDX found)"
}
---
# Linux 内核：二分（bisect）缺陷

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 二分（bisect）缺陷

（英文版）最后更新：2016年10月28日

### 引言

始终尝试由来自kernel.org的源代码构建的最新内核。如果您没有信心这样做，请将
错误报告给您的发行版供应商，而不是内核开发人员。

找到缺陷（bug）并不总是那么容易，不过仍然得去找。如果你找不到它，不要放弃。
尽可能多的向相关维护人员报告您发现的信息。请参阅MAINTAINERS文件以了解您所
关注的子系统的维护人员。

在提交错误报告之前，请阅读“Documentation/admin-guide/reporting-issues.rst”。

### 设备未出现（Devices not appearing）

这通常是由udev/systemd引起的。在将其归咎于内核之前先检查一下。

### 查找导致缺陷的补丁

使用 git 提供的工具可以很容易地找到缺陷，只要缺陷是可复现的。

操作步骤：

- 从git源代码构建内核
- 以此开始二分 [[1]](#f1):

  ```
  $ git bisect start
  ```
- 标记损坏的变更集:

  ```
  $ git bisect bad [commit]
  ```
- 标记正常工作的变更集:

  ```
  $ git bisect good [commit]
  ```
- 重新构建内核并测试
- 使用以下任一与git bisect进行交互:

  ```
  $ git bisect good
  ```

  或:

  ```
  $ git bisect bad
  ```

  这取决于您测试的变更集上是否有缺陷
- 在一些交互之后，git bisect将给出可能导致缺陷的变更集。
- 例如，如果您知道当前版本有问题，而4.8版本是正常的，则可以执行以下操作:

  ```
  $ git bisect start
  $ git bisect bad                 # Current version is bad
  $ git bisect good v4.8
  ```

[[1](#footnote-reference-1)]

您可以（可选地）在开始git bisect的时候提供good或bad参数
git bisect start [BAD] [GOOD]

如需进一步参考，请阅读：

- git-bisect 的手册页
- [Fighting regressions with git bisect（用git bisect解决回归）](https://www.kernel.org/pub/software/scm/git/docs/git-bisect-lk2009.html)
- [Fully automated bisecting with "git bisect run"（使用git bisect run
  来全自动二分）](https://lwn.net/Articles/317154)
- [Using Git bisect to figure out when brokenness was introduced
  （使用Git二分来找出何时引入了错误）](http://webchick.net/node/99)

## 来源、版本与核验

- 来源：[二分（bisect）缺陷](https://docs.kernel.org/translations/zh_CN/admin-guide/bug-bisect.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0 (repository default; no file SPDX found)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/admin-guide/bug-bisect.rst`。
