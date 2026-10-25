---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-llvm-llvm-docs-telemetry",
  "title": "LLVM：Telemetry framework in LLVM",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "Telemetry",
    "llvm"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "da6931d23190b56f526b2e30dd4c0930ce39a4261a009c7054e26f895f0f2656",
  "generatedHash": "6e683baa89e441a876810c6d69b047371c23280bd278f410179f5fd7adbdaaa2",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Telemetry framework in LLVM：Telemetry framework in LLVM",
  "l1": ".. contents:: :local: :hidden: Provides a common framework in LLVM for collecting various usage and performance metrics. It is located at `llvm/Telemetry/Telemetry.h`. * Configurable and extensible by: * Tools: any tool that wants to use Telemetry can extend and customize it. * Vendors: Toolchain vendors can also provide custom implementation of the library, which could either override or extend the given tool's upstream implementation, to best fit their organization's usage and privacy models. * End users of such tool can also configure Telemetry (as allowed by their vendor). * There is no concrete implementation of a Telemetry library in upstream LLVM. We only provide the abstract API here. Any tool that wants telemetry will implement one. The rationale for this is that all the tools in LLVM are very different in what they care about (w",
  "questions": [
    "Telemetry 如何用于Telemetry framework in LLVM？",
    "Telemetry 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-llvm-llvm-docs-telemetry",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/Telemetry.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# LLVM：Telemetry framework in LLVM

> 本文收录 LLVM 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：Telemetry framework in LLVM。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

Telemetry framework in LLVM

## 技术正文

## Telemetry framework in LLVM


.. contents::
   :local:

> 原文 RST 指令（依赖上游工程，未展开）：`.. toctree::`
   :hidden:

## Objective


Provides a common framework in LLVM for collecting various usage and performance
metrics.
It is located at `llvm/Telemetry/Telemetry.h`.

### Characteristics

* Configurable and extensible by:

  * Tools: any tool that wants to use Telemetry can extend and customize it.
  * Vendors: Toolchain vendors can also provide custom implementation of the
    library, which could either override or extend the given tool's upstream
    implementation, to best fit their organization's usage and privacy models.
  * End users of such tool can also configure Telemetry (as allowed by their
    vendor).

### Important notes


* There is no concrete implementation of a Telemetry library in upstream LLVM.
  We only provide the abstract API here. Any tool that wants telemetry will
  implement one.
  
  The rationale for this is that all the tools in LLVM are very different in
  what they care about (what/where/when to instrument data). Hence, it might not
  be practical to have a single implementation.
  However, in the future, if we see enough common pattern, we can extract them
  into a shared place. This is TBD - contributions are welcome.

* No implementation of Telemetry in upstream LLVM shall store any of the
  collected data due to privacy and security reasons:
  
  * Different organizations have different privacy models:
  
    * Which data is sensitive, which is not?
    * Whether it is acceptable for instrumented data to be stored anywhere?
      (to a local file, what not?)
      
  * Data ownership and data collection consents are hard to accommodate from
    LLVM developers' point of view:
  
    * E.g., data collected by Telemetry is not necessarily owned by the user
      of an LLVM tool with Telemetry enabled, hence the user's consent to data
      collection is not meaningful. On the other hand, LLVM developers have no
      reasonable ways to request consent from the "real" owners.


## High-level design


### Key components


The framework consists of four important classes:

* `llvm::telemetry::Manager`: The class responsible for collecting and
  transmitting telemetry data. This is the main point of interaction between the
  framework and any tool that wants to enable telemetry.
* `llvm::telemetry::TelemetryInfo`: Data courier
* `llvm::telemetry::Destination`: Data sink to which the Telemetry framework
  sends data.
  Its implementation is transparent to the framework.
  It is up to the vendor to decide which pieces of data to forward and where
  to forward them to for their final storage.
* `llvm::telemetry::Config`: Configurations for the `Manager`.
  
> 原文 RST 指令（依赖上游工程，未展开）：`.. image:: llvm_telemetry_design.png`

### How to implement and interact with the API


To use Telemetry in your tool, you need to provide a concrete implementation of the `Manager` class and `Destination`.

1) Define a custom `Serializer`, `Manager`, `Destination` and optionally a subclass of `TelemetryInfo`

```c++
class JsonSerializer : public Serializer {
public:
  json::Object *getOutputObject() { return Out.get(); }

  Error init() override {
    if (Started)
      return createStringError("Serializer already in use");
    started = true;
    Out = std::make_unique<json::Object>();
    return Error::success();
  }

  // Serialize the given value.
  void write(StringRef KeyName, bool Value) override {
    writeHelper(KeyName, Value);
  }

  void write(StringRef KeyName, int Value) override {
    writeHelper(KeyName, Value);
  }

  void write(StringRef KeyName, long Value) override {
    writeHelper(KeyName, Value);
  }

  void write(StringRef KeyName, long long Value ) override {
    writeHelper(KeyName, Value);
  }

  void write(StringRef KeyName, unsigned int Value) override {
    writeHelper(KeyName, Value);
  }

  void write(StringRef KeyName, unsigned long Value) override {
    writeHelper(KeyName, Value);
  }
  
  void write(StringRef KeyName, unsigned long long Value) override {
    writeHelper(KeyName, Value);
  }

  void write(StringRef KeyName, StringRef Value) override {
    writeHelper(KeyName, Value);
  }

  void beginObject(StringRef KeyName) override {
    Children.push_back(json::Object());
    ChildrenNames.push_back(KeyName.str());
  }
  
  void endObject() override {
    assert(!Children.empty() && !ChildrenNames.empty());
    json::Value Val = json::Value(std::move(Children.back()));
    std::string Name = ChildrenNames.back();

    Children.pop_back();
    ChildrenNames.pop_back();
    writeHelper(Name, std::move(Val));
  }
  
  Error finalize() override {
    if (!Started)
      return createStringError("Serializer not currently in use");
    Started = false;
    return Error::success();
  }

private:
  template <typename T> void writeHelper(StringRef Name, T Value) {
    assert(Started && "serializer not started");
    if (Children.empty())
      Out->try_emplace(Name, Value);
    else
      Children.back().try_emplace(Name, Value);
  }
  bool Started = false;
  std::unique_ptr<json::Object> Out;
  std::vector<json::Object> Children;
  std::vector<std::string> ChildrenNames;
};
     
class MyManager : public telemery::Manager {
public:
static std::unique_ptr<MyManager> createInstatnce(telemetry::Config *Config) {
  // If Telemetry is not enabled, then just return null;
  if (!Config->EnableTelemetry)
    return nullptr;
  return std::make_unique<MyManager>();
}
MyManager() = default;

Error preDispatch(TelemetryInfo *Entry) override {
  Entry->SessionId = SessionId;
  return Error::success();
}

// You can also define additional instrumentation points.
void logStartup(TelemetryInfo *Entry) {
  // Add some additional data to entry.
  Entry->Msg = "Some message";
  dispatch(Entry);
}

void logAdditionalPoint(TelemetryInfo *Entry) {
  // .... code here
}

private:    
  const std::string SessionId;
};

class MyDestination : public telemetry::Destination {
public:
  Error receiveEntry(const TelemetryInfo *Entry) override {
    if (Error Err = Serializer.init())
      return Err;
    
    Entry->serialize(Serializer);
    if (Error Err = Serializer.finalize())
      return Err;
    
    json::Object Copied = *Serializer.getOutputObject();
    // Send the `Copied` object to wherever.
    return Error::success();
  }

private:
  JsonSerializer Serializer;
};

// This defines a custom TelemetryInfo that has an additional Msg field.
struct MyTelemetryInfo : public telemetry::TelemetryInfo {
  std::string Msg;
  
  Error serialize(Serializer &Serializer) const override {
    TelemetryInfo::serialize(serializer);
    Serializer.writeString("MyMsg", Msg);
  }
    
  // Note: implement getKind() and classof() to support dyn_cast operations.
};

  
```

2) Use the library in your tool.

Logging the tool init-process:

```c++
// In tool's initialization code.
auto StartTime = std::chrono::time_point<std::chrono::steady_clock>::now();
telemetry::Config MyConfig = makeConfig(); // Build up the appropriate Config struct here.
auto Manager = MyManager::createInstance(&MyConfig);


// Any other tool's init code can go here.
// ...

// Finally, take a snapshot of the time now so we know how long it took the
// init process to finish.
auto EndTime = std::chrono::time_point<std::chrono::steady_clock>::now();
MyTelemetryInfo Entry;

Entry.Start = StartTime;
Entry.End = EndTime;
Manager->logStartup(&Entry);

```

Similar code can be used for logging the tool's exit.

## 来源、版本与核验

- 上游：[llvm/docs/Telemetry.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/Telemetry.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/llvm/llvm/docs/Telemetry.rst`；SHA-256：`da6931d23190b56f526b2e30dd4c0930ce39a4261a009c7054e26f895f0f2656`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
