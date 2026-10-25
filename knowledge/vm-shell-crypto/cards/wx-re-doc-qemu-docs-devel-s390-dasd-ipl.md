---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-qemu-docs-devel-s390-dasd-ipl",
  "title": "QEMU：Booting from real channel-attached devices on s390x",
  "type": "note",
  "tags": [
    "VM",
    "系统虚拟机",
    "QEMU",
    "底层实现",
    "s390-dasd-ipl",
    "qemu"
  ],
  "project": "VM与动态翻译",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "29fd90bb93d1007e3259519ffcb92899d7ab78d045d02cfd9ced7dc17cf999ca",
  "generatedHash": "a10a5c650da3d2ddb88f5abf9a27f56b8a575d9e403d8328cb8bc22b855a5fcc",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Booting from real channel-attached devices on s390x：Booting from real channel-attached devices on s390x",
  "l1": "The s390 hardware IPL process consists of the following steps. 1. A READ IPL ccw is constructed in memory location `0x0`. This ccw, by definition, reads the IPL1 record which is located on the disk at cylinder 0 track 0 record 1. Note that the chain flag is on in this ccw so when it is complete another ccw will be fetched and executed from memory location `0x08`. 2. Execute the Read IPL ccw at `0x00`, thereby reading IPL1 data into `0x00`. IPL1 data is 24 bytes in length and consists of the following pieces of information: `[psw][read ccw][tic ccw]`. When the machine executes the Read IPL ccw it read the 24-bytes of IPL1 to be read into memory starting at location `0x0`. Then the ccw program at `0x08` which consists of a read ccw and a tic ccw is automatically executed because of the chain flag from the original READ IPL ccw. The read ccw",
  "questions": [
    "s390-dasd-ipl 如何用于Booting from real channel-attached devices on s390x？",
    "s390-dasd-ipl 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-qemu-docs-devel-s390-dasd-ipl",
      "url": "https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/s390-dasd-ipl.rst",
      "checkedAt": "2026-10-25",
      "version": "v10.0.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）"
}
---
# QEMU：Booting from real channel-attached devices on s390x

> 本文收录 QEMU 的独立技术文献正文，固定标签 `v10.0.0`。主题：Booting from real channel-attached devices on s390x。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

Booting from real channel-attached devices on s390x

## 技术正文

## Booting from real channel-attached devices on s390x


### s390 hardware IPL


The s390 hardware IPL process consists of the following steps.

1. A READ IPL ccw is constructed in memory location `0x0`.
   This ccw, by definition, reads the IPL1 record which is located on the disk
   at cylinder 0 track 0 record 1. Note that the chain flag is on in this ccw
   so when it is complete another ccw will be fetched and executed from memory
   location `0x08`.

2. Execute the Read IPL ccw at `0x00`, thereby reading IPL1 data into `0x00`.
   IPL1 data is 24 bytes in length and consists of the following pieces of
   information: `[psw][read ccw][tic ccw]`. When the machine executes the Read
   IPL ccw it read the 24-bytes of IPL1 to be read into memory starting at
   location `0x0`. Then the ccw program at `0x08` which consists of a read
   ccw and a tic ccw is automatically executed because of the chain flag from
   the original READ IPL ccw. The read ccw will read the IPL2 data into memory
   and the TIC (Transfer In Channel) will transfer control to the channel
   program contained in the IPL2 data. The TIC channel command is the
   equivalent of a branch/jump/goto instruction for channel programs.

   NOTE: The ccws in IPL1 are defined by the architecture to be format 0.

3. Execute IPL2.
   The TIC ccw instruction at the end of the IPL1 channel program will begin
   the execution of the IPL2 channel program. IPL2 is stage-2 of the boot
   process and will contain a larger channel program than IPL1. The point of
   IPL2 is to find and load either the operating system or a small program that
   loads the operating system from disk. At the end of this step all or some of
   the real operating system is loaded into memory and we are ready to hand
   control over to the guest operating system. At this point the guest
   operating system is entirely responsible for loading any more data it might
   need to function.

   NOTE: The IPL2 channel program might read data into memory
   location `0x0` thereby overwriting the IPL1 psw and channel program. This is ok
   as long as the data placed in location `0x0` contains a psw whose instruction
   address points to the guest operating system code to execute at the end of
   the IPL/boot process.

   NOTE: The ccws in IPL2 are defined by the architecture to be format 0.

4. Start executing the guest operating system.
   The psw that was loaded into memory location `0x0` as part of the ipl process
   should contain the needed flags for the operating system we have loaded. The
   psw's instruction address will point to the location in memory where we want
   to start executing the operating system. This psw is loaded (via LPSW
   instruction) causing control to be passed to the operating system code.

In a non-virtualized environment this process, handled entirely by the hardware,
is kicked off by the user initiating a "Load" procedure from the hardware
management console. This "Load" procedure crafts a special "Read IPL" ccw in
memory location 0x0 that reads IPL1. It then executes this ccw thereby kicking
off the reading of IPL1 data. Since the channel program from IPL1 will be
written immediately after the special "Read IPL" ccw, the IPL1 channel program
will be executed immediately (the special read ccw has the chaining bit turned
on). The TIC at the end of the IPL1 channel program will cause the IPL2 channel
program to be executed automatically. After this sequence completes the "Load"
procedure then loads the psw from `0x0`.

### How this all pertains to QEMU (and the kernel)


In theory we should merely have to do the following to IPL/boot a guest
operating system from a DASD device:

1. Place a "Read IPL" ccw into memory location `0x0` with chaining bit on.
2. Execute channel program at `0x0`.
3. LPSW `0x0`.

However, our emulation of the machine's channel program logic within the kernel
is missing one key feature that is required for this process to work:
non-prefetch of ccw data.

When we start a channel program we pass the channel subsystem parameters via an
ORB (Operation Request Block). One of those parameters is a prefetch bit. If the
bit is on then the vfio-ccw kernel driver is allowed to read the entire channel
program from guest memory before it starts executing it. This means that any
channel commands that read additional channel commands will not work as expected
because the newly read commands will only exist in guest memory and NOT within
the kernel's channel subsystem memory. The kernel vfio-ccw driver currently
requires this bit to be on for all channel programs. This is a problem because
the IPL process consists of transferring control from the "Read IPL" ccw
immediately to the IPL1 channel program that was read by "Read IPL".

Not being able to turn off prefetch will also prevent the TIC at the end of the
IPL1 channel program from transferring control to the IPL2 channel program.

Lastly, in some cases (the zipl bootloader for example) the IPL2 program also
transfers control to another channel program segment immediately after reading
it from the disk. So we need to be able to handle this case.

### What QEMU does


Since we are forced to live with prefetch we cannot use the very simple IPL
procedure we defined in the preceding section. So we compensate by doing the
following.

1. Place "Read IPL" ccw into memory location `0x0`, but turn off chaining bit.
2. Execute "Read IPL" at `0x0`.

   So now IPL1's psw is at `0x0` and IPL1's channel program is at `0x08`.

3. Write a custom channel program that will seek to the IPL2 record and then
   execute the READ and TIC ccws from IPL1.  Normally the seek is not required
   because after reading the IPL1 record the disk is automatically positioned
   to read the very next record which will be IPL2. But since we are not reading
   both IPL1 and IPL2 as part of the same channel program we must manually set
   the position.

4. Grab the target address of the TIC instruction from the IPL1 channel program.
   This address is where the IPL2 channel program starts.

   Now IPL2 is loaded into memory somewhere, and we know the address.

5. Execute the IPL2 channel program at the address obtained in step #4.

   Because this channel program can be dynamic, we must use a special algorithm
   that detects a READ immediately followed by a TIC and breaks the ccw chain
   by turning off the chain bit in the READ ccw. When control is returned from
   the kernel/hardware to the QEMU bios code we immediately issue another start
   subchannel to execute the remaining TIC instruction. This causes the entire
   channel program (starting from the TIC) and all needed data to be refetched
   thereby stepping around the limitation that would otherwise prevent this
   channel program from executing properly.

   Now the operating system code is loaded somewhere in guest memory and the psw
   in memory location `0x0` will point to entry code for the guest operating
   system.

6. LPSW `0x0`

   LPSW transfers control to the guest operating system and we're done.

## 来源、版本与核验

- 上游：[docs/devel/s390-dasd-ipl.rst](https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/s390-dasd-ipl.rst)
- 作者：qemu/qemu 项目贡献者，原文内具体署名保留。
- 标签：v10.0.0；树标识：7c949c53e936aa3a658d84ab53bae5cadaa5d59c；获取日期：2026-10-25。
- 许可：GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/qemu/docs/devel/s390-dasd-ipl.rst`；SHA-256：`29fd90bb93d1007e3259519ffcb92899d7ab78d045d02cfd9ced7dc17cf999ca`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
