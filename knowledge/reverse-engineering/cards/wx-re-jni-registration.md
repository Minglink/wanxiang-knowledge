---
{
  "schemaVersion": 2,
  "id": "wx-re-jni-registration",
  "title": "JNI：名称解析、动态注册与 Java 到 Native 的映射",
  "type": "method",
  "tags": [
    "逆向工程",
    "Android",
    "JNI",
    "RegisterNatives",
    "JNI_OnLoad",
    "Native"
  ],
  "project": "逆向工程",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:reverse-2026-10-25-001",
  "sourceTitle": "公开技术资料归纳（外部来源，非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "6219967a0abaf14d98b5d077181a97673585f08b1be694ab0f08c68721d117f1",
  "generatedHash": "8c5a0dda2319d1b6bbef569bd78497da7c72a433048bf1cc780eee81f059c537",
  "archived": false,
  "verification": "文献核对；示例未实测",
  "l0": "JNI：名称解析、动态注册与 Java 到 Native 的映射。so里没有Java_开头的符号怎么找native方法？",
  "l1": " 原理 Native 方法可通过约定名称查找，也可使用 RegisterNatives 显式注册。后者把方法名、JNI 签名与实现指针关联起来，因此没有 Java_ 前缀导出不代表没有 Native 实现。 映射例（本库构造） Java 声明 native boolean verify(String s, int n)，注册项可以是名称 verify、签名 (Ljava/lang/String;I)Z 与某实现指针。类名还由注册时传入的类对象确定；名称和签名单独不足以唯一标识整个应用的方法。 判断方法 从 System.loadLibrary 对应的库开始，检查 JNI_OnLoad 及初始化",
  "questions": [
    "so里没有Java_开头的符号怎么找native方法？",
    "RegisterNatives注册表包含什么？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "jni",
      "url": "https://developer.android.com/ndk/guides/jni-tips",
      "checkedAt": "2026-10-25"
    }
  ],
  "batchId": "reverse-2026-10-25-001"
}
---
# JNI：名称解析、动态注册与 Java 到 Native 的映射

## 原理
Native 方法可通过约定名称查找，也可使用 RegisterNatives 显式注册。后者把方法名、JNI 签名与实现指针关联起来，因此没有 Java_ 前缀导出不代表没有 Native 实现。

## 映射例（本库构造）
Java 声明 native boolean verify(String s, int n)，注册项可以是名称 verify、签名 (Ljava/lang/String;I)Z 与某实现指针。类名还由注册时传入的类对象确定；名称和签名单独不足以唯一标识整个应用的方法。

## 判断方法
从 System.loadLibrary 对应的库开始，检查 JNI_OnLoad 及初始化路径，并追踪注册表构造和注册调用。将类、签名、函数指针及模块内位置一起记录。注册表也可能动态构造，不保证以静态数组存在。

## ABI 细节
普通 JNI 的实现参数还包含环境指针和实例对象或类对象，不能把业务参数直接当作第一个本机参数。CriticalNative 等特殊机制会改变约定，应先确认注解与版本再解释寄存器。

## 来源与核验

- [Android JNI tips](https://developer.android.com/ndk/guides/jni-tips)；作者/维护者：Android Developers；核对日期：2026-10-25。

本文为万象知识库的归纳与分析示例；“本库构造”的例子用于解释机制，未执行工具或样本验证。适用范围以正文及原始文档为准。
