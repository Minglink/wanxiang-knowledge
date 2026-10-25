---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-arch-arm64-elf-hwcaps",
  "title": "Linux 内核：ARM64 ELF hwcaps",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "arch"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "44eb21c96e24e1bf1fcd36bdf96201ca9a8211c8ad617aad2bc149574af848ff",
  "generatedHash": "b3a4ffa43145f1096646c362ffff5f3a070bf9518c0c67986daae0517a43d1a3",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "这篇文档描述了 arm64 ELF hwcaps 的用法和语义。 有些硬件或软件功能仅在某些 CPU 实现上和/或在具体某个内核配置上可用，但 对于处于 EL0 的用户空间代码没有可用的架构发现机制。内核通过在辅助向量表 公开一组称为 hwcaps 的标志而把这些功能暴露给用户空间。 用户空间软件可以通过获取辅助向量的 AT_HWCAP 或 AT_HWCAP",
  "l1": "这篇文档描述了 arm64 ELF hwcaps 的用法和语义。 有些硬件或软件功能仅在某些 CPU 实现上和/或在具体某个内核配置上可用，但 对于处于 EL0 的用户空间代码没有可用的架构发现机制。内核通过在辅助向量表 公开一组称为 hwcaps 的标志而把这些功能暴露给用户空间。 用户空间软件可以通过获取辅助向量的 AT_HWCAP 或 AT_HWCAP2 条目来测试功能， 并测试是否设置了相关标志，例如: 如果软件依赖于 hwcap 描述的功能，在尝试使用该功能前则应检查相关的 hwcap 标志以验证该功能是否存在。 不能通过其他方式探查这些功能。当一个功能不可用时，尝试使用它可能导致不可 预测的行为，并且无法保证能确切的知道该功能不可用，例如 SIGILL。 大多数 hwcaps 旨在说明通过架构 ID 寄存器(处于 EL0 的用户空间代码无法访问) 描述的功能的存在。这些 hwc",
  "questions": [
    "Linux 内核：ARM64 ELF hwcaps的原理是什么？",
    "Linux 内核：ARM64 ELF hwcaps有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-arch-arm64-elf-hwcaps",
      "url": "https://docs.kernel.org/translations/zh_CN/arch/arm64/elf_hwcaps.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0 (repository default; no file SPDX found)"
}
---
# Linux 内核：ARM64 ELF hwcaps

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

Translator: Bailu Lin <[bailu.lin@vivo.com](mailto:bailu.lin@vivo.com)>

## ARM64 ELF hwcaps

这篇文档描述了 arm64 ELF hwcaps 的用法和语义。

### 1. 简介

有些硬件或软件功能仅在某些 CPU 实现上和/或在具体某个内核配置上可用，但
对于处于 EL0 的用户空间代码没有可用的架构发现机制。内核通过在辅助向量表
公开一组称为 hwcaps 的标志而把这些功能暴露给用户空间。

用户空间软件可以通过获取辅助向量的 AT\_HWCAP 或 AT\_HWCAP2 条目来测试功能，
并测试是否设置了相关标志，例如:

```
bool floating_point_is_present(void)
{
        unsigned long hwcaps = getauxval(AT_HWCAP);
        if (hwcaps & HWCAP_FP)
                return true;

        return false;
}
```

如果软件依赖于 hwcap 描述的功能，在尝试使用该功能前则应检查相关的 hwcap
标志以验证该功能是否存在。

不能通过其他方式探查这些功能。当一个功能不可用时，尝试使用它可能导致不可
预测的行为，并且无法保证能确切的知道该功能不可用，例如 SIGILL。

### 2. Hwcaps 的说明

大多数 hwcaps 旨在说明通过架构 ID 寄存器(处于 EL0 的用户空间代码无法访问)
描述的功能的存在。这些 hwcap 通过 ID 寄存器字段定义，并且应根据 ARM 体系
结构参考手册（ARM ARM）中定义的字段来解释说明。

这些 hwcaps 以下面的形式描述:

```
idreg.field == val 表示有某个功能。
```

当 idreg.field 中有 val 时，hwcaps 表示 ARM ARM 定义的功能是有效的，但是
并不是说要完全和 val 相等，也不是说 idreg.field 描述的其他功能就是缺失的。

其他 hwcaps 可能表明无法仅由 ID 寄存器描述的功能的存在。这些 hwcaps 可能
没有被 ID 寄存器描述，需要参考其他文档。

### 3. AT\_HWCAP 中揭示的 hwcaps

HWCAP\_FP
:   ID\_AA64PFR0\_EL1.FP == 0b0000 表示有此功能。

HWCAP\_ASIMD
:   ID\_AA64PFR0\_EL1.AdvSIMD == 0b0000 表示有此功能。

HWCAP\_EVTSTRM
:   通用计时器频率配置为大约100KHz以生成事件。

HWCAP\_AES
:   ID\_AA64ISAR0\_EL1.AES == 0b0001 表示有此功能。

HWCAP\_PMULL
:   ID\_AA64ISAR0\_EL1.AES == 0b0010 表示有此功能。

HWCAP\_SHA1
:   ID\_AA64ISAR0\_EL1.SHA1 == 0b0001 表示有此功能。

HWCAP\_SHA2
:   ID\_AA64ISAR0\_EL1.SHA2 == 0b0001 表示有此功能。

HWCAP\_CRC32
:   ID\_AA64ISAR0\_EL1.CRC32 == 0b0001 表示有此功能。

HWCAP\_ATOMICS
:   ID\_AA64ISAR0\_EL1.Atomic == 0b0010 表示有此功能。

HWCAP\_FPHP
:   ID\_AA64PFR0\_EL1.FP == 0b0001 表示有此功能。

HWCAP\_ASIMDHP
:   ID\_AA64PFR0\_EL1.AdvSIMD == 0b0001 表示有此功能。

HWCAP\_CPUID
:   根据 Documentation/arch/arm64/cpu-feature-registers.rst 描述，EL0 可以访问
    某些 ID 寄存器。

    这些 ID 寄存器可能表示功能的可用性。

HWCAP\_ASIMDRDM
:   ID\_AA64ISAR0\_EL1.RDM == 0b0001 表示有此功能。

HWCAP\_JSCVT
:   ID\_AA64ISAR1\_EL1.JSCVT == 0b0001 表示有此功能。

HWCAP\_FCMA
:   ID\_AA64ISAR1\_EL1.FCMA == 0b0001 表示有此功能。

HWCAP\_LRCPC
:   ID\_AA64ISAR1\_EL1.LRCPC == 0b0001 表示有此功能。

HWCAP\_DCPOP
:   ID\_AA64ISAR1\_EL1.DPB == 0b0001 表示有此功能。

HWCAP\_SHA3
:   ID\_AA64ISAR0\_EL1.SHA3 == 0b0001 表示有此功能。

HWCAP\_SM3
:   ID\_AA64ISAR0\_EL1.SM3 == 0b0001 表示有此功能。

HWCAP\_SM4
:   ID\_AA64ISAR0\_EL1.SM4 == 0b0001 表示有此功能。

HWCAP\_ASIMDDP
:   ID\_AA64ISAR0\_EL1.DP == 0b0001 表示有此功能。

HWCAP\_SHA512
:   ID\_AA64ISAR0\_EL1.SHA2 == 0b0010 表示有此功能。

HWCAP\_SVE
:   ID\_AA64PFR0\_EL1.SVE == 0b0001 表示有此功能。

HWCAP\_ASIMDFHM
:   ID\_AA64ISAR0\_EL1.FHM == 0b0001 表示有此功能。

HWCAP\_DIT
:   ID\_AA64PFR0\_EL1.DIT == 0b0001 表示有此功能。

HWCAP\_USCAT
:   ID\_AA64MMFR2\_EL1.AT == 0b0001 表示有此功能。

HWCAP\_ILRCPC
:   ID\_AA64ISAR1\_EL1.LRCPC == 0b0010 表示有此功能。

HWCAP\_FLAGM
:   ID\_AA64ISAR0\_EL1.TS == 0b0001 表示有此功能。

HWCAP\_SSBS
:   ID\_AA64PFR1\_EL1.SSBS == 0b0010 表示有此功能。

HWCAP\_SB
:   ID\_AA64ISAR1\_EL1.SB == 0b0001 表示有此功能。

HWCAP\_PACA
:   如 Documentation/arch/arm64/pointer-authentication.rst 所描述，
    ID\_AA64ISAR1\_EL1.APA == 0b0001 或 ID\_AA64ISAR1\_EL1.API == 0b0001
    表示有此功能。

HWCAP\_PACG
:   如 Documentation/arch/arm64/pointer-authentication.rst 所描述，
    ID\_AA64ISAR1\_EL1.GPA == 0b0001 或 ID\_AA64ISAR1\_EL1.GPI == 0b0001
    表示有此功能。

HWCAP2\_DCPODP

> ID\_AA64ISAR1\_EL1.DPB == 0b0010 表示有此功能。

HWCAP2\_SVE2

> ID\_AA64ZFR0\_EL1.SVEVer == 0b0001 表示有此功能。

HWCAP2\_SVEAES

> ID\_AA64ZFR0\_EL1.AES == 0b0001 表示有此功能。

HWCAP2\_SVEPMULL

> ID\_AA64ZFR0\_EL1.AES == 0b0010 表示有此功能。

HWCAP2\_SVEBITPERM

> ID\_AA64ZFR0\_EL1.BitPerm == 0b0001 表示有此功能。

HWCAP2\_SVESHA3

> ID\_AA64ZFR0\_EL1.SHA3 == 0b0001 表示有此功能。

HWCAP2\_SVESM4

> ID\_AA64ZFR0\_EL1.SM4 == 0b0001 表示有此功能。

HWCAP2\_FLAGM2

> ID\_AA64ISAR0\_EL1.TS == 0b0010 表示有此功能。

HWCAP2\_FRINT

> ID\_AA64ISAR1\_EL1.FRINTTS == 0b0001 表示有此功能。

HWCAP2\_SVEI8MM

> ID\_AA64ZFR0\_EL1.I8MM == 0b0001 表示有此功能。

HWCAP2\_SVEF32MM

> ID\_AA64ZFR0\_EL1.F32MM == 0b0001 表示有此功能。

HWCAP2\_SVEF64MM

> ID\_AA64ZFR0\_EL1.F64MM == 0b0001 表示有此功能。

HWCAP2\_SVEBF16

> ID\_AA64ZFR0\_EL1.BF16 == 0b0001 表示有此功能。

HWCAP2\_I8MM

> ID\_AA64ISAR1\_EL1.I8MM == 0b0001 表示有此功能。

HWCAP2\_BF16

> ID\_AA64ISAR1\_EL1.BF16 == 0b0001 表示有此功能。

HWCAP2\_DGH

> ID\_AA64ISAR1\_EL1.DGH == 0b0001 表示有此功能。

HWCAP2\_RNG

> ID\_AA64ISAR0\_EL1.RNDR == 0b0001 表示有此功能。

HWCAP2\_BTI

> ID\_AA64PFR0\_EL1.BT == 0b0001 表示有此功能。

### 4. 未使用的 AT\_HWCAP 位

为了与用户空间交互，内核保证 AT\_HWCAP 的第62、63位将始终返回0。

## 来源、版本与核验

- 来源：[ARM64 ELF hwcaps](https://docs.kernel.org/translations/zh_CN/arch/arm64/elf_hwcaps.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0 (repository default; no file SPDX found)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/arch/arm64/elf_hwcaps.rst`。
