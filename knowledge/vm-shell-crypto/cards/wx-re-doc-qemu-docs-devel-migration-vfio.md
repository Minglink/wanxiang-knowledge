---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-qemu-docs-devel-migration-vfio",
  "title": "QEMU：VFIO device migration",
  "type": "note",
  "tags": [
    "VM",
    "系统虚拟机",
    "QEMU",
    "底层实现",
    "vfio",
    "qemu"
  ],
  "project": "VM与动态翻译",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "3fb2b7b19477c8fc86f13e583a00c91c49938f3bafa8a2fd08fbb610d6357b2c",
  "generatedHash": "4c3106f4759c2a69a6ccf814e9db86bc4b60f6741c620755ade8cc2a92ea5805",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "VFIO device migration：VFIO device migration",
  "l1": "Migration of virtual machine involves saving the state for each device that the guest is running on source host and restoring this saved state on the destination host. This document details how saving and restoring of VFIO devices is done in QEMU. Migration of VFIO devices consists of two phases: the optional pre-copy phase, and the stop-and-copy phase. The pre-copy phase is iterative and allows to accommodate VFIO devices that have a large amount of data that needs to be transferred. The iterative pre-copy phase of migration allows for the guest to continue whilst the VFIO device state is transferred to the destination, this helps to reduce the total downtime of the VM. VFIO devices opt-in to pre-copy support by reporting the VFIO_MIGRATION_PRE_COPY flag in the VFIO_DEVICE_FEATURE_MIGRATION ioctl. When pre-copy is supported, it's possibl",
  "questions": [
    "vfio 如何用于VFIO device migration？",
    "vfio 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-qemu-docs-devel-migration-vfio",
      "url": "https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/migration/vfio.rst",
      "checkedAt": "2026-10-25",
      "version": "v10.0.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）"
}
---
# QEMU：VFIO device migration

> 本文收录 QEMU 的独立技术文献正文，固定标签 `v10.0.0`。主题：VFIO device migration。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

VFIO device migration

## 技术正文

## VFIO device migration


Migration of virtual machine involves saving the state for each device that
the guest is running on source host and restoring this saved state on the
destination host. This document details how saving and restoring of VFIO
devices is done in QEMU.

Migration of VFIO devices consists of two phases: the optional pre-copy phase,
and the stop-and-copy phase. The pre-copy phase is iterative and allows to
accommodate VFIO devices that have a large amount of data that needs to be
transferred. The iterative pre-copy phase of migration allows for the guest to
continue whilst the VFIO device state is transferred to the destination, this
helps to reduce the total downtime of the VM. VFIO devices opt-in to pre-copy
support by reporting the VFIO_MIGRATION_PRE_COPY flag in the
VFIO_DEVICE_FEATURE_MIGRATION ioctl.

When pre-copy is supported, it's possible to further reduce downtime by
enabling "switchover-ack" migration capability.
VFIO migration uAPI defines "initial bytes" as part of its pre-copy data stream
and recommends that the initial bytes are sent and loaded in the destination
before stopping the source VM. Enabling this migration capability will
guarantee that and thus, can potentially reduce downtime even further.

To support migration of multiple devices that might do P2P transactions between
themselves, VFIO migration uAPI defines an intermediate P2P quiescent state.
While in the P2P quiescent state, P2P DMA transactions cannot be initiated by
the device, but the device can respond to incoming ones. Additionally, all
outstanding P2P transactions are guaranteed to have been completed by the time
the device enters this state.

All the devices that support P2P migration are first transitioned to the P2P
quiescent state and only then are they stopped or started. This makes migration
safe P2P-wise, since starting and stopping the devices is not done atomically
for all the devices together.

Thus, multiple VFIO devices migration is allowed only if all the devices
support P2P migration. Single VFIO device migration is allowed regardless of
P2P migration support.

A detailed description of the UAPI for VFIO device migration can be found in
the comment for the `vfio_device_mig_state` structure in the header file
linux-headers/linux/vfio.h.

VFIO implements the device hooks for the iterative approach as follows:

* A `save_setup` function that sets up migration on the source.

* A `load_setup` function that sets the VFIO device on the destination in
  _RESUMING state.

* A `state_pending_estimate` function that reports an estimate of the
  remaining pre-copy data that the vendor driver has yet to save for the VFIO
  device.

* A `state_pending_exact` function that reads pending_bytes from the vendor
  driver, which indicates the amount of data that the vendor driver has yet to
  save for the VFIO device.

* An `is_active_iterate` function that indicates `save_live_iterate` is
  active only when the VFIO device is in pre-copy states.

* A `save_live_iterate` function that reads the VFIO device's data from the
  vendor driver during iterative pre-copy phase.

* A `switchover_ack_needed` function that checks if the VFIO device uses
  "switchover-ack" migration capability when this capability is enabled.

* A `switchover_start` function that in the multifd mode starts a thread that
  reassembles the multifd received data and loads it in-order into the device.
  In the non-multifd mode this function is a NOP.

* A `save_state` function to save the device config space if it is present
  in the non-multifd mode.
  In the multifd mode it just emits either a dummy EOS marker.

* A `save_live_complete_precopy` function that sets the VFIO device in
  _STOP_COPY state and iteratively copies the data for the VFIO device until
  the vendor driver indicates that no data remains.
  In the multifd mode it just emits a dummy EOS marker.

* A `save_live_complete_precopy_thread` function that in the multifd mode
  provides thread handler performing multifd device state transfer.
  It sets the VFIO device to _STOP_COPY state, iteratively reads the data
  from the VFIO device and queues it for multifd transmission until the vendor
  driver indicates that no data remains.
  After that, it saves the device config space and queues it for multifd
  transfer too.
  In the non-multifd mode this thread is a NOP.

* A `load_state` function that loads the config section and the data
  sections that are generated by the save functions above.

* A `load_state_buffer` function that loads the device state and the device
  config that arrived via multifd channels.
  It's used only in the multifd mode.

* `cleanup` functions for both save and load that perform any migration
  related cleanup.


The VFIO migration code uses a VM state change handler to change the VFIO
device state when the VM state changes from running to not-running, and
vice versa.

Similarly, a migration state change handler is used to trigger a transition of
the VFIO device state when certain changes of the migration state occur. For
example, the VFIO device state is transitioned back to _RUNNING in case a
migration failed or was canceled.

### System memory dirty pages tracking


A `log_global_start` and `log_global_stop` memory listener callback informs
the VFIO dirty tracking module to start and stop dirty page tracking. A
`log_sync` memory listener callback queries the dirty page bitmap from the
dirty tracking module and marks system memory pages which were DMA-ed by the
VFIO device as dirty. The dirty page bitmap is queried per container.

Currently there are two ways dirty page tracking can be done:
(1) Device dirty tracking:
In this method the device is responsible to log and report its DMAs. This
method can be used only if the device is capable of tracking its DMAs.
Discovering device capability, starting and stopping dirty tracking, and
syncing the dirty bitmaps from the device are done using the DMA logging uAPI.
More info about the uAPI can be found in the comments of the
`vfio_device_feature_dma_logging_control` and
`vfio_device_feature_dma_logging_report` structures in the header file
linux-headers/linux/vfio.h.

(2) VFIO IOMMU module:
In this method dirty tracking is done by IOMMU. However, there is currently no
IOMMU support for dirty page tracking. For this reason, all pages are
perpetually marked dirty, unless the device driver pins pages through external
APIs in which case only those pinned pages are perpetually marked dirty.

If the above two methods are not supported, all pages are perpetually marked
dirty by QEMU.

By default, dirty pages are tracked during pre-copy as well as stop-and-copy
phase. So, a page marked as dirty will be copied to the destination in both
phases. Copying dirty pages in pre-copy phase helps QEMU to predict if it can
achieve its downtime tolerances. If QEMU during pre-copy phase keeps finding
dirty pages continuously, then it understands that even in stop-and-copy phase,
it is likely to find dirty pages and can predict the downtime accordingly.

QEMU also provides a per device opt-out option `pre-copy-dirty-page-tracking`
which disables querying the dirty bitmap during pre-copy phase. If it is set to
off, all dirty pages will be copied to the destination in stop-and-copy phase
only.

### System memory dirty pages tracking when vIOMMU is enabled


With vIOMMU, an IO virtual address range can get unmapped while in pre-copy
phase of migration. In that case, the unmap ioctl returns any dirty pages in
that range and QEMU reports corresponding guest physical pages dirty. During
stop-and-copy phase, an IOMMU notifier is used to get a callback for mapped
pages and then dirty pages bitmap is fetched from VFIO IOMMU modules for those
mapped ranges. If device dirty tracking is enabled with vIOMMU, live migration
will be blocked.

## Flow of state changes during Live migration


Below is the state change flow during live migration for a VFIO device that
supports both precopy and P2P migration. The flow for devices that don't
support it is similar, except that the relevant states for precopy and P2P are
skipped.
The values in the parentheses represent the VM state, the migration state, and
the VFIO device state, respectively.

### Live migration save path


::

                           QEMU normal running state
                           (RUNNING, _NONE, _RUNNING)
                                      |
                     migrate_init spawns migration_thread
            Migration thread then calls each device's .save_setup()
                          (RUNNING, _SETUP, _PRE_COPY)
                                      |
                         (RUNNING, _ACTIVE, _PRE_COPY)
  If device is active, get pending_bytes by .state_pending_{estimate,exact}()
       If total pending_bytes >= threshold_size, call .save_live_iterate()
                Data of VFIO device for pre-copy phase is copied
      Iterate till total pending bytes converge and are less than threshold
                                      |
       On migration completion, the vCPUs and the VFIO device are stopped
              The VFIO device is first put in P2P quiescent state
                    (FINISH_MIGRATE, _ACTIVE, _PRE_COPY_P2P)
                                      |
                Then the VFIO device is put in _STOP_COPY state
                     (FINISH_MIGRATE, _ACTIVE, _STOP_COPY)
         .save_live_complete_precopy() is called for each active device
              For the VFIO device: in the non-multifd mode iterate in
                        .save_live_complete_precopy() until
                               pending data is 0
	          In the multifd mode this iteration is done in
	          .save_live_complete_precopy_thread() instead.
                                      |
                     (POSTMIGRATE, _COMPLETED, _STOP_COPY)
            Migraton thread schedules cleanup bottom half and exits
                                      |
                           .save_cleanup() is called
                        (POSTMIGRATE, _COMPLETED, _STOP)

### Live migration resume path


::

             Incoming migration calls .load_setup() for each device
                          (RESTORE_VM, _ACTIVE, _STOP)
                                      |
     For each device, .load_state() is called for that device section data
                 transmitted via the main migration channel.
     For data transmitted via multifd channels .load_state_buffer() is called
                                   instead.
                        (RESTORE_VM, _ACTIVE, _RESUMING)
                                      |
  At the end, .load_cleanup() is called for each device and vCPUs are started
              The VFIO device is first put in P2P quiescent state
                        (RUNNING, _ACTIVE, _RUNNING_P2P)
                                      |
                           (RUNNING, _NONE, _RUNNING)

## Postcopy


Postcopy migration is currently not supported for VFIO devices.

## Multifd


Starting from QEMU version 10.0 there's a possibility to transfer VFIO device
_STOP_COPY state via multifd channels. This helps reduce downtime - especially
with multiple VFIO devices or with devices having a large migration state.
As an additional benefit, setting the VFIO device to _STOP_COPY state and
saving its config space is also parallelized (run in a separate thread) in
such migration mode.

The multifd VFIO device state transfer is controlled by
"x-migration-multifd-transfer" VFIO device property. This property defaults to
AUTO, which means that VFIO device state transfer via multifd channels is
attempted in configurations that otherwise support it.

## 来源、版本与核验

- 上游：[docs/devel/migration/vfio.rst](https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/migration/vfio.rst)
- 作者：qemu/qemu 项目贡献者，原文内具体署名保留。
- 标签：v10.0.0；树标识：7c949c53e936aa3a658d84ab53bae5cadaa5d59c；获取日期：2026-10-25。
- 许可：GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/qemu/docs/devel/migration/vfio.rst`；SHA-256：`3fb2b7b19477c8fc86f13e583a00c91c49938f3bafa8a2fd08fbb610d6357b2c`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
