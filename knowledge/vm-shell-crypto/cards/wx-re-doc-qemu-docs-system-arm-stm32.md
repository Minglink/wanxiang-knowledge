---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-qemu-docs-system-arm-stm32",
  "title": "QEMU：ARM设备模型 · stm32",
  "type": "note",
  "tags": [
    "VM",
    "系统虚拟机",
    "QEMU",
    "底层实现",
    "stm32",
    "qemu"
  ],
  "project": "VM与动态翻译",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "4be94b8fcf7198b8c1bf0e28127c00dced718affef881108a26c8d4cc42a0d7b",
  "generatedHash": "6f2b09d0e342a0a1a464c869c29bd6c20f889f2baaa3b780e112275f88173af6",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "STMicroelectronics STM32 boards (netduino2, netduinoplus2, olimex-stm32-h405, stm32vldiscovery)：STMicroelectronics STM32 boards (``netduino2``, ``netduinoplus2``, ``olimex-stm32-h405``, ``stm32vldiscovery``)",
  "l1": "The `STM32`_ chips are a family of 32-bit ARM-based microcontroller by STMicroelectronics. .. _STM32: https://www.st.com/en/microcontrollers-microprocessors/stm32-32-bit-arm-cortex-mcus.html The STM32F1 series is based on ARM Cortex-M3 core. The following machines are based on this chip : - `stm32vldiscovery` STM32VLDISCOVERY board with STM32F100RBT6 microcontroller The STM32F2 series is based on ARM Cortex-M3 core. The following machines are based on this chip : - `netduino2` Netduino 2 board with STM32F205RFT6 microcontroller The STM32F4 series is based on ARM Cortex-M4F core, as well as the STM32L4 ultra-low-power series. The STM32F4 series is pin-to-pin compatible with STM32F2 series. The following machines are based on this ARM Cortex-M4F chip : - `netduinoplus2` Netduino Plus 2 board with STM32F405RGT6 microcontroller - `olimex-stm3",
  "questions": [
    "stm32 如何用于STMicroelectronics STM32 boards (netduino2, netduinoplus2, olimex-stm32-h405, stm32vldiscovery)？",
    "stm32 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-qemu-docs-system-arm-stm32",
      "url": "https://github.com/qemu/qemu/blob/v10.0.0/docs/system/arm/stm32.rst",
      "checkedAt": "2026-10-25",
      "version": "v10.0.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）"
}
---
# QEMU：ARM设备模型 · stm32

> 本文收录 QEMU 的独立技术文献正文，固定标签 `v10.0.0`。主题：STMicroelectronics STM32 boards (netduino2, netduinoplus2, olimex-stm32-h405, stm32vldiscovery)。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

STMicroelectronics STM32 boards (``netduino2``, ``netduinoplus2``, ``olimex-stm32-h405``, ``stm32vldiscovery``)

## 技术正文

## STMicroelectronics STM32 boards (``netduino2``, ``netduinoplus2``, ``olimex-stm32-h405``, ``stm32vldiscovery``)


The `STM32`_ chips are a family of 32-bit ARM-based microcontroller by
STMicroelectronics.

.. _STM32: https://www.st.com/en/microcontrollers-microprocessors/stm32-32-bit-arm-cortex-mcus.html

The STM32F1 series is based on ARM Cortex-M3 core. The following machines are
based on this chip :

- `stm32vldiscovery`  STM32VLDISCOVERY board with STM32F100RBT6 microcontroller

The STM32F2 series is based on ARM Cortex-M3 core. The following machines are
based on this chip :

- `netduino2`         Netduino 2 board with STM32F205RFT6 microcontroller

The STM32F4 series is based on ARM Cortex-M4F core, as well as the STM32L4
ultra-low-power series. The STM32F4 series is pin-to-pin compatible with STM32F2 series.
The following machines are based on this ARM Cortex-M4F chip :

- `netduinoplus2`     Netduino Plus 2 board with STM32F405RGT6 microcontroller
- `olimex-stm32-h405` Olimex STM32 H405 board with STM32F405RGT6 microcontroller
- `b-l475e-iot01a`     `B-L475E-IOT01A IoT Node </system/arm/b-l475e-iot01a>` board with STM32L475VG microcontroller

There are many other STM32 series that are currently not supported by QEMU.

### Supported devices


 * ARM Cortex-M3, Cortex M4F
 * Analog to Digital Converter (ADC)
 * EXTI interrupt
 * Serial ports (USART)
 * SPI controller
 * System configuration (SYSCFG)
 * Timer controller (TIMER)
 * Reset and Clock Controller (RCC) (STM32F4 only, reset and enable only)

### Missing devices


 * Camera interface (DCMI)
 * Controller Area Network (CAN)
 * Cycle Redundancy Check (CRC) calculation unit
 * Digital to Analog Converter (DAC)
 * DMA controller
 * Ethernet controller
 * Flash Interface Unit
 * GPIO controller
 * I2C controller
 * Inter-Integrated Sound (I2S) controller
 * Power supply configuration (PWR)
 * Random Number Generator (RNG)
 * Real-Time Clock (RTC) controller
 * Reset and Clock Controller (RCC) (other features than reset and enable)
 * Secure Digital Input/Output (SDIO) interface
 * USB OTG
 * Watchdog controller (IWDG, WWDG)

### Boot options


The STM32 machines can be started using the `-kernel` option to load a
firmware. Example:

```bash
$ qemu-system-arm -M stm32vldiscovery -kernel firmware.bin
```

## 来源、版本与核验

- 上游：[docs/system/arm/stm32.rst](https://github.com/qemu/qemu/blob/v10.0.0/docs/system/arm/stm32.rst)
- 作者：qemu/qemu 项目贡献者，原文内具体署名保留。
- 标签：v10.0.0；树标识：7c949c53e936aa3a658d84ab53bae5cadaa5d59c；获取日期：2026-10-25。
- 许可：GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/qemu/docs/system/arm/stm32.rst`；SHA-256：`4be94b8fcf7198b8c1bf0e28127c00dced718affef881108a26c8d4cc42a0d7b`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
