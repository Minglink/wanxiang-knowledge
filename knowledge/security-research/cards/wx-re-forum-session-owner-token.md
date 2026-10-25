---
{
  "schemaVersion": 2,
  "id": "wx-re-forum-session-owner-token",
  "title": "Windows 身份：Session、进程对象 Owner 与访问令牌",
  "type": "note",
  "tags": [
    "Windows",
    "Session 0",
    "Token",
    "SID",
    "隔离",
    "论坛研究",
    "吾爱破解"
  ],
  "project": "逆向与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "9596ee8997b1204fc1dbb812e03aeb5b2fd2b3fc04dd9a4f733f8d0a966ea067",
  "generatedHash": "4c411cc72be7292619b68451e89f70cd59888745338704b2b969c28eee5fa0f3",
  "archived": false,
  "verification": "已阅读来源并归纳；未复现实验",
  "l0": "Session 表示运行会话，Owner 属于对象安全描述符，Token 描述执行安全上下文，三者不能混用。",
  "l1": "会话编号回答进程位于哪个登录环境；进程对象 Owner 来自对象安全描述符；访问令牌则包含用户、组、特权及完整性等执行身份信息。它们关联同一进程，却不能相互代替。 Session 0 常用于系统服务，但仅有 Session 0 身份不能证明进程拥有最高权限。解释实际访问结果，还需结合令牌、目标对象访问控制及相关策略。 采集时逐字段保存来源与失败状态。Owner 查询失败并不意味着 TokenUser 也未知；某个 SID 无法解析成账户名称，也不应丢弃已读取到的 SID 本身。 分析例（本库构造，未执行）：例如，Session相同但TokenUser不同的两个进程，应保留为不同执行身份；反过来，同一账户在不同会话内的进程，也不应因为用户名相同而合并会话资源。",
  "questions": [
    "Windows 身份：Session、进程对象 Owner 与访问令牌的原理是什么？",
    "Windows 身份：Session、进程对象 Owner 与访问令牌有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "52pojie-2130230",
      "url": "https://www.52pojie.cn/thread-2130230-1-1.html",
      "checkedAt": "2026-10-25",
      "mode": "原创归纳；仅提炼机制，不复制整篇帖子"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "本库原创归纳；原帖权利归原作者"
}
---
# Windows 身份：Session、进程对象 Owner 与访问令牌

会话编号回答进程位于哪个登录环境；进程对象 Owner 来自对象安全描述符；访问令牌则包含用户、组、特权及完整性等执行身份信息。它们关联同一进程，却不能相互代替。

Session 0 常用于系统服务，但仅有 Session 0 身份不能证明进程拥有最高权限。解释实际访问结果，还需结合令牌、目标对象访问控制及相关策略。

采集时逐字段保存来源与失败状态。Owner 查询失败并不意味着 TokenUser 也未知；某个 SID 无法解析成账户名称，也不应丢弃已读取到的 SID 本身。

分析例（本库构造，未执行）：例如，Session相同但TokenUser不同的两个进程，应保留为不同执行身份；反过来，同一账户在不同会话内的进程，也不应因为用户名相同而合并会话资源。

## 来源、版本与核验

- 来源：[Windows 会话、Session 0 与进程 Token 隔离身份](https://www.52pojie.cn/thread-2130230-1-1.html)
- 作者/维护者：WangWei-CM
- 获取日期：2026-10-25。论坛公开正文快照；附件未下载
- 收录方式：原创归纳；仅提炼机制，不复制整篇帖子。已阅读来源并归纳；未复现实验。
- 许可：本库原创归纳；原帖权利归原作者。原始署名及相关许可保留在本批 sources 附件中。
