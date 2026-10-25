---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-security-secrets-coco",
  "title": "Linux 内核：机密计算密钥",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "security"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "9d54bdd286be4a1fbd8069867bbd94013d1f58f2b0793214d144bc1014ced1d4",
  "generatedHash": "137abe3f9706b7e71780060e66e68e7aaf70fb50a8f2f118e5599fb678042a08",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "本文档介绍了在EFI驱动程序和efi_secret内核模块中，机密计算密钥从固件 到操作系统的注入处理流程。 机密计算硬件（如AMD SEV，Secure Encrypted Virtualization）允许虚拟机 所有者将密钥注入虚拟机（VM）内存，且主机/虚拟机监控程序无法读取这些密 钥。在SEV中，密钥注入需在虚拟机启动流程的早期阶段（客户机开始运行",
  "l1": "本文档介绍了在EFI驱动程序和efi_secret内核模块中，机密计算密钥从固件 到操作系统的注入处理流程。 机密计算硬件（如AMD SEV，Secure Encrypted Virtualization）允许虚拟机 所有者将密钥注入虚拟机（VM）内存，且主机/虚拟机监控程序无法读取这些密 钥。在SEV中，密钥注入需在虚拟机启动流程的早期阶段（客户机开始运行前） 执行。 efi_secret内核模块允许用户空间应用程序通过securityfs（安全文件系统）访 问这些密钥。 客户机固件可能会为密钥注入预留一块指定的内存区域，并将该区域的位置（基准 客户机物理地址GPA和长度）在EFI配置表中，通过 LINUX_EFI_COCO_SECRET_AREA_GUID 条目（对应的GUID值为 adf956ad-e98c-484c-ae11-b51c7d336447 ）的形式发布。 固件应将此内存",
  "questions": [
    "Linux 内核：机密计算密钥的原理是什么？",
    "Linux 内核：机密计算密钥有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-security-secrets-coco",
      "url": "https://docs.kernel.org/translations/zh_CN/security/secrets/coco.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：机密计算密钥

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 机密计算密钥

本文档介绍了在EFI驱动程序和efi\_secret内核模块中，机密计算密钥从固件
到操作系统的注入处理流程。

### 简介

机密计算硬件（如AMD SEV，Secure Encrypted Virtualization）允许虚拟机
所有者将密钥注入虚拟机（VM）内存，且主机/虚拟机监控程序无法读取这些密
钥。在SEV中，密钥注入需在虚拟机启动流程的早期阶段（客户机开始运行前）
执行。

efi\_secret内核模块允许用户空间应用程序通过securityfs（安全文件系统）访
问这些密钥。

### 密钥数据流

客户机固件可能会为密钥注入预留一块指定的内存区域，并将该区域的位置（基准
客户机物理地址GPA和长度）在EFI配置表中，通过 LINUX\_EFI\_COCO\_SECRET\_AREA\_GUID
条目（对应的GUID值为 adf956ad-e98c-484c-ae11-b51c7d336447 ）的形式发布。
固件应将此内存区域标记为 EFI\_RESERVED\_TYPE ，因此内核不应将其用于自身用途。

虚拟机启动过程中，虚拟机管理器可向该区域注入密钥。在AMD SEV和SEV-ES中，此
操作通过 KVM\_SEV\_LAUNCH\_SECRET 命令执行（参见 [[sev\_CN]](#sev-cn) ）。注入的“客户机
所有者密钥数据”应采用带GUID的密钥值表结构，其二进制格式在 drivers/virt/ coco/efi\_secret/efi\_secret.c 文件的EFI密钥区域结构部分中有详细描述。

内核启动时，内核的EFI驱动程序将保存密钥区域位置（来自EFI配置表）到 efi.coco\_secret
字段。随后，它会检查密钥区域是否已填充：映射该区域并检查其内容是否以
EFI\_SECRET\_TABLE\_HEADER\_GUID （对应的GUID为 1e74f542-71dd-4d66-963e-ef4287ff173b ）
开头。如果密钥区域已填充，EFI驱动程序将自动加载efi\_secret内核模块，并通过securityfs将密钥
暴露给用户空间应用程序。efi\_secret文件系统接口的详细信息请参考 [[secrets-coco-abi\_CN]](#secrets-coco-abi-cn) 。

### 应用使用示例

假设客户机需要对加密文件进行计算处理。客户机所有者通过密钥注入机制提供解密密钥
（即密钥）。客户机应用程序从efi\_secret文件系统读取该密钥，然后将文件解密到内存中，
接着对内容进行需要的计算。

在此示例中，主机无法从磁盘镜像中读取文件，因为文件是加密的；主机无法读取解密密钥，
因为它是通过密钥注入机制（即安全通道）传递的；主机也无法读取内存中的解密内容，因为
这是一个机密型（内存加密）客户机。

以下是一个简单的示例，展示了在客户机中使用efi\_secret模块的过程，在启动时注入了
一个包含4个密钥的EFI密钥区域:

```
# ls -la /sys/kernel/security/secrets/coco
total 0
drwxr-xr-x 2 root root 0 Jun 28 11:54 .
drwxr-xr-x 3 root root 0 Jun 28 11:54 ..
-r--r----- 1 root root 0 Jun 28 11:54 736870e5-84f0-4973-92ec-06879ce3da0b
-r--r----- 1 root root 0 Jun 28 11:54 83c83f7f-1356-4975-8b7e-d3a0b54312c6
-r--r----- 1 root root 0 Jun 28 11:54 9553f55d-3da2-43ee-ab5d-ff17f78864d2
-r--r----- 1 root root 0 Jun 28 11:54 e6f5a162-d67f-4750-a67c-5d065f2a9910

# hd /sys/kernel/security/secrets/coco/e6f5a162-d67f-4750-a67c-5d065f2a9910
00000000  74 68 65 73 65 2d 61 72  65 2d 74 68 65 2d 6b 61  |these-are-the-ka|
00000010  74 61 2d 73 65 63 72 65  74 73 00 01 02 03 04 05  |ta-secrets......|
00000020  06 07                                             |..|
00000022

# rm /sys/kernel/security/secrets/coco/e6f5a162-d67f-4750-a67c-5d065f2a9910

# ls -la /sys/kernel/security/secrets/coco
total 0
drwxr-xr-x 2 root root 0 Jun 28 11:55 .
drwxr-xr-x 3 root root 0 Jun 28 11:54 ..
-r--r----- 1 root root 0 Jun 28 11:54 736870e5-84f0-4973-92ec-06879ce3da0b
-r--r----- 1 root root 0 Jun 28 11:54 83c83f7f-1356-4975-8b7e-d3a0b54312c6
-r--r----- 1 root root 0 Jun 28 11:54 9553f55d-3da2-43ee-ab5d-ff17f78864d2
```

### 参考文献

请参见 [[sev-api-spec\_CN]](#sev-api-spec-cn) 以获取有关SEV LAUNCH\_SECRET 操作的更多信息。

[[sev\_CN](#citation-reference-1)]

Documentation/virt/kvm/x86/amd-memory-encryption.rst

[[secrets-coco-abi\_CN](#citation-reference-2)]

Documentation/ABI/testing/securityfs-secrets-coco

[[sev-api-spec\_CN](#citation-reference-3)]

<https://www.amd.com/system/files/TechDocs/55766_SEV-KM_API_Specification.pdf>

## 来源、版本与核验

- 来源：[机密计算密钥](https://docs.kernel.org/translations/zh_CN/security/secrets/coco.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/security/secrets/coco.rst`。
