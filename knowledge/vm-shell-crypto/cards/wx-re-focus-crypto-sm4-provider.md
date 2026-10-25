---
{
  "schemaVersion": 2,
  "id": "wx-re-focus-crypto-sm4-provider",
  "title": "SM4接口识别：算法名称与模式名称必须同时记录",
  "type": "note",
  "tags": [
    "加密算法",
    "SM4",
    "OpenSSL",
    "Provider",
    "工作模式",
    "国密SM4"
  ],
  "project": "密码算法机制",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "公开资料原创归纳（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "d60a1661b036d33313aeb627d3cdd8e25c53cb806db9c010cd4fc28267f3604f",
  "generatedHash": "fd59a8a3802579c41903299e09822f6a46e6b90594048db3b055ad6acd6e78f3",
  "archived": false,
  "verification": "已阅读相关来源并作机制归纳；构造示例未执行；未复现样本",
  "l0": "OpenSSL以带模式的算法名称暴露SM4，算法可获取性还依赖版本与Provider。",
  "l1": "OpenSSL的SM4文档列出不同工作模式接口。模式决定分组如何组合成消息处理过程，接口获取还涉及Provider及构建能力。逆向时应同时保留算法获取字符串、模式、密钥和IV参数、填充设置及更新/结束调用。 本库构造：两个组件都标注SM4，但一个选择CBC，另一个选择CTR。即使密钥相同，密文长度和数据依赖也可能不同；先核对模式和封装，再解释是否存在自定义算法。 本来源是OpenSSL接口文档，不代替国家标准的完整轮函数定义，所以本卡不据此给出内部常数或轮表。库版本中支持某模式也不证明目标程序已启用，算法获取失败还应检查Provider和参数。",
  "questions": [
    "只知道程序用了SM4为什么不能复现密文？",
    "EVP中SM4-CBC和SM4-CTR有什么差异？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "sm4",
      "url": "https://docs.openssl.org/3.5/man7/EVP_CIPHER-SM4/",
      "checkedAt": "2026-10-25",
      "version": "获取日公开文档；未固定上游提交"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "万象知识库原创归纳；引文和原始资料权利归各自作者"
}
---
# SM4接口识别：算法名称与模式名称必须同时记录

## 机制

OpenSSL的SM4文档列出不同工作模式接口。模式决定分组如何组合成消息处理过程，接口获取还涉及Provider及构建能力。逆向时应同时保留算法获取字符串、模式、密钥和IV参数、填充设置及更新/结束调用。

## 分析例与核对方法

本库构造：两个组件都标注SM4，但一个选择CBC，另一个选择CTR。即使密钥相同，密文长度和数据依赖也可能不同；先核对模式和封装，再解释是否存在自定义算法。

## 判断边界

本来源是OpenSSL接口文档，不代替国家标准的完整轮函数定义，所以本卡不据此给出内部常数或轮表。库版本中支持某模式也不证明目标程序已启用，算法获取失败还应检查Provider和参数。

## 来源与核验

- [SM4 EVP provider documentation](https://docs.openssl.org/3.5/man7/EVP_CIPHER-SM4/)；作者/维护者：OpenSSL project；版本：获取日公开文档；未固定上游提交；核对日期：2026-10-25。

本文是本库原创机制归纳。“本库构造”的例子用于说明判断方法，没有下载或执行论坛附件、保护样本；文献核对不等于实验复现。原始资料权利归其作者，本文不镜像论坛全文。
