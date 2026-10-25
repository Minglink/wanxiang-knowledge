---
{
  "schemaVersion": 2,
  "id": "wx-re-forum-pdb-rsds-identity",
  "title": "PDB 符号匹配：文件名、GUID 与 Age 各自证明什么",
  "type": "note",
  "tags": [
    "PDB",
    "RSDS",
    "符号",
    "PE",
    "论坛研究",
    "吾爱破解"
  ],
  "project": "逆向与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "0ad549d01e687ce992ec7522208eabde911d004c4f99db3e1423408e0f5aef14",
  "generatedHash": "a9d14c9a23d44409cf155b6d30981c98223f9d2da787a629d23851ebe3a486c3",
  "archived": false,
  "verification": "已阅读来源并归纳；未复现实验",
  "l0": "同名 PDB 不足以证明匹配；应从 CodeView 记录读取调试身份，再核对 GUID 与 Age。",
  "l1": "PE 调试目录中的 CodeView 记录能提供 PDB 身份线索。RSDS 记录关联 GUID、Age 和名称，其中名称只帮助定位文件，不能替代身份匹配。 读取时先验证 PE 头、节映射和调试记录边界，再解释 RSDS 内容。记录路径可能是构建机遗留路径，不等于分析机上存在该文件。 排查符号错配时，同时保存样本哈希、记录类型、GUID、Age 与实际加载的符号文件。能显示函数名也不能直接证明符号正确：错误版本的符号可能给出似是而非的名称和结构偏移。 分析例（本库构造，未执行）：例如，两份文件都叫 app.pdb，但 GUID 不同，应按不匹配处理；不能因文件名相同就采用其中的结构偏移。这个检查应在依赖符号解释关键地址之前完成。",
  "questions": [
    "PDB 符号匹配：文件名、GUID 与 Age 各自证明什么的原理是什么？",
    "PDB 符号匹配：文件名、GUID 与 Age 各自证明什么有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "52pojie-2119783",
      "url": "https://www.52pojie.cn/thread-2119783-1-1.html",
      "checkedAt": "2026-10-25",
      "mode": "原创归纳；仅提炼机制，不复制整篇帖子"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "本库原创归纳；原帖权利归原作者"
}
---
# PDB 符号匹配：文件名、GUID 与 Age 各自证明什么

PE 调试目录中的 CodeView 记录能提供 PDB 身份线索。RSDS 记录关联 GUID、Age 和名称，其中名称只帮助定位文件，不能替代身份匹配。

读取时先验证 PE 头、节映射和调试记录边界，再解释 RSDS 内容。记录路径可能是构建机遗留路径，不等于分析机上存在该文件。

排查符号错配时，同时保存样本哈希、记录类型、GUID、Age 与实际加载的符号文件。能显示函数名也不能直接证明符号正确：错误版本的符号可能给出似是而非的名称和结构偏移。

分析例（本库构造，未执行）：例如，两份文件都叫 app.pdb，但 GUID 不同，应按不匹配处理；不能因文件名相同就采用其中的结构偏移。这个检查应在依赖符号解释关键地址之前完成。

## 来源、版本与核验

- 来源：[[基础]从exe文件找到PDB调试文件位置](https://www.52pojie.cn/thread-2119783-1-1.html)
- 作者/维护者：WangWei-CM
- 获取日期：2026-10-25。论坛公开正文快照；附件未下载
- 收录方式：原创归纳；仅提炼机制，不复制整篇帖子。已阅读来源并归纳；未复现实验。
- 许可：本库原创归纳；原帖权利归原作者。原始署名及相关许可保留在本批 sources 附件中。
