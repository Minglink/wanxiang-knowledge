---
{
  "schemaVersion": 2,
  "id": "wx-re-elf-plt-got",
  "title": "ELF：PLT、GOT 与延迟绑定的调用链",
  "type": "note",
  "tags": [
    "逆向工程",
    "ELF",
    "PLT",
    "GOT",
    "延迟绑定",
    "动态链接"
  ],
  "project": "逆向工程",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:reverse-2026-10-25-001",
  "sourceTitle": "公开技术资料归纳（外部来源，非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "49d11b4ee232d83c5cf5e7f9c7e306141b9ef7a5f512890e9bea868b1a220ee5",
  "generatedHash": "65458504a5d295cbf31b43296f1bc65c52f8292d4404ee39f63124d36e64c7e2",
  "archived": false,
  "verification": "文献核对；示例未实测",
  "l0": "ELF：PLT、GOT 与延迟绑定的调用链。PLT和GOT分别做什么？",
  "l1": " 原理 在常见 ELF 动态链接实现中，GOT 提供间接地址槽位，PLT 提供外部函数调用使用的跳转入口。把地址保存在可由装载器处理的间接层中，可使调用代码不必硬编码共享库的最终地址。 调用例（本库构造） 调用点 → 某函数的 PLT 入口 → 对应 GOT 槽位 → 共享库内的实际函数。启用延迟绑定时，首次调用可能经过解析器，完成符号解析后再更新相关槽位；后续调用可能直接转到已解析地址。 判断方法 结合反汇编、动态符号和重定位信息，确定槽位属于哪个符号。记录绑定前后的值以及实际目标模块，解释首次和后续路径差异。 易错点 并非所有调用都经过传统 PLT：体系结构、链接选项、立即绑定和编译方式会",
  "questions": [
    "PLT和GOT分别做什么？",
    "为什么第一次调用和后续调用路径不同？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "plt",
      "url": "https://reverseengineering.stackexchange.com/questions/1992/what-is-plt-got",
      "checkedAt": "2026-10-25"
    },
    {
      "id": "readelf",
      "url": "https://sourceware.org/binutils/docs/binutils/readelf.html",
      "checkedAt": "2026-10-25"
    }
  ],
  "batchId": "reverse-2026-10-25-001"
}
---
# ELF：PLT、GOT 与延迟绑定的调用链

## 原理
在常见 ELF 动态链接实现中，GOT 提供间接地址槽位，PLT 提供外部函数调用使用的跳转入口。把地址保存在可由装载器处理的间接层中，可使调用代码不必硬编码共享库的最终地址。

## 调用例（本库构造）
调用点 → 某函数的 PLT 入口 → 对应 GOT 槽位 → 共享库内的实际函数。启用延迟绑定时，首次调用可能经过解析器，完成符号解析后再更新相关槽位；后续调用可能直接转到已解析地址。

## 判断方法
结合反汇编、动态符号和重定位信息，确定槽位属于哪个符号。记录绑定前后的值以及实际目标模块，解释首次和后续路径差异。

## 易错点
并非所有调用都经过传统 PLT：体系结构、链接选项、立即绑定和编译方式会改变形态。观察到槽位发生变化本身不是篡改证据。论坛回答解释了典型模型，分析具体文件仍要以其实际重定位和指令为准。

## 来源与核验

- [What is PLT/GOT?](https://reverseengineering.stackexchange.com/questions/1992/what-is-plt-got)；作者/维护者：0xea、Ciro Santilli 等答主（以各答案署名为准）；核对日期：2026-10-25。
- [GNU readelf 手册](https://sourceware.org/binutils/docs/binutils/readelf.html)；作者/维护者：GNU Binutils；核对日期：2026-10-25。

本文为万象知识库的归纳与分析示例；“本库构造”的例子用于解释机制，未执行工具或样本验证。适用范围以正文及原始文档为准。
