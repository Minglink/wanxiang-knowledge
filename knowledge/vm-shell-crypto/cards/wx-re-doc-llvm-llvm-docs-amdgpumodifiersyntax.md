---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-llvm-llvm-docs-amdgpumodifiersyntax",
  "title": "LLVM：Syntax of AMDGPU Instruction Modifiers",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "AMDGPUModifierSyntax",
    "llvm"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "2ebd6024ac168296caa5bfbea492be307911506aa7aadd4899c650b96d0b9ed5",
  "generatedHash": "aa948378603c0fd4b61a0fd50e1e0bbbabc309242270327c8963d2edb397a65b",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Syntax of AMDGPU Instruction Modifiers：Syntax of AMDGPU Instruction Modifiers",
  "l1": ".. contents:: :local: The following notation is used throughout this document: =================== ============================================================= Notation Description =================== ============================================================= {0..N} Any integer value in the range from 0 to N (inclusive). <x> Syntax and meaning of *x* are explained elsewhere. =================== ============================================================= Specifies the first 8-bit offset, in bytes. The default value is 0. Used with DS instructions that expect two addresses. =================== ==================================================================== Syntax Description =================== ==================================================================== offset0:{0..0xFF} Specifies an unsigned 8-bit offset as a positive `",
  "questions": [
    "AMDGPUModifierSyntax 如何用于Syntax of AMDGPU Instruction Modifiers？",
    "AMDGPUModifierSyntax 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-llvm-llvm-docs-amdgpumodifiersyntax",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/AMDGPUModifierSyntax.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# LLVM：Syntax of AMDGPU Instruction Modifiers

> 本文收录 LLVM 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：Syntax of AMDGPU Instruction Modifiers。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

Syntax of AMDGPU Instruction Modifiers

## 技术正文

## Syntax of AMDGPU Instruction Modifiers


.. contents::
   :local:

## Conventions


The following notation is used throughout this document:

    =================== =============================================================
    Notation            Description
    =================== =============================================================
    {0..N}              Any integer value in the range from 0 to N (inclusive).
    <x>                 Syntax and meaning of *x* are explained elsewhere.
    =================== =============================================================


## Modifiers


### DS Modifiers



#### offset0


Specifies the first 8-bit offset, in bytes. The default value is 0.

Used with DS instructions that expect two addresses.

    =================== ====================================================================
    Syntax              Description
    =================== ====================================================================
    offset0:{0..0xFF}   Specifies an unsigned 8-bit offset as a positive
                        `integer number <amdgpu_synid_integer_number>`
                        or an `absolute expression<amdgpu_synid_absolute_expression>`.
    =================== ====================================================================

Examples:

```
offset0:0xff
offset0:2-x
offset0:-x-y

```


#### offset1


Specifies the second 8-bit offset, in bytes. The default value is 0.

Used with DS instructions that expect two addresses.

    =================== ====================================================================
    Syntax              Description
    =================== ====================================================================
    offset1:{0..0xFF}   Specifies an unsigned 8-bit offset as a positive
                        `integer number <amdgpu_synid_integer_number>`
                        or an `absolute expression<amdgpu_synid_absolute_expression>`.
    =================== ====================================================================

Examples:

```
offset1:0xff
offset1:2-x
offset1:-x-y

```


#### offset


Specifies a 16-bit offset, in bytes. The default value is 0.

Used with DS instructions that expect a single address.

    ==================== ====================================================================
    Syntax               Description
    ==================== ====================================================================
    offset:{0..0xFFFF}   Specifies an unsigned 16-bit offset as a positive
                         `integer number <amdgpu_synid_integer_number>`
                         or an `absolute expression<amdgpu_synid_absolute_expression>`.
    ==================== ====================================================================

Examples:

```
offset:65535
offset:0xffff
offset:-x-y

```


#### swizzle pattern


This is a special modifier that may be used with *ds_swizzle_b32* instruction only.
It specifies a swizzle pattern in numeric or symbolic form. The default value is 0.

    ======================================================= ===========================================================
    Syntax                                                  Description
    ======================================================= ===========================================================
    offset:{0..0xFFFF}                                      Specifies a 16-bit swizzle pattern.
    offset:swizzle(QUAD_PERM,{0..3},{0..3},{0..3},{0..3})   Specifies a quad permute mode pattern

                                                            Each number is a lane *id*.
    offset:swizzle(BITMASK_PERM, "<mask>")                  Specifies a bitmask permute mode pattern.

                                                            The pattern converts a 5-bit lane *id* to another
                                                            lane *id* with which the lane interacts.

                                                            The *mask* is a 5-character sequence which
                                                            specifies how to transform the bits of the
                                                            lane *id*.

                                                            The following characters are allowed:

                                                            * "0" - set bit to 0.

                                                            * "1" - set bit to 1.

                                                            * "p" - preserve bit.

                                                            * "i" - inverse bit.

    offset:swizzle(BROADCAST,{2..32},{0..N})                Specifies a broadcast mode.

                                                            Broadcasts the value of any particular lane to
                                                            all lanes in its group.

                                                            The first numeric parameter is a group
                                                            size and must be equal to 2, 4, 8, 16 or 32.

                                                            The second numeric parameter is an index of the
                                                            lane being broadcast.

                                                            The index must not exceed group size.
    offset:swizzle(SWAP,{1..16})                            Specifies a swap mode.

                                                            Swaps the neighboring groups of
                                                            1, 2, 4, 8 or 16 lanes.
    offset:swizzle(REVERSE,{2..32})                         Specifies a reverse mode.

                                                            Reverses the lanes for groups of 2, 4, 8, 16 or 32 lanes.
    ======================================================= ===========================================================

Note: numeric values may be specified as either
`integer numbers<amdgpu_synid_integer_number>` or
`absolute expressions<amdgpu_synid_absolute_expression>`.

Examples:

```
offset:255
offset:0xffff
offset:swizzle(QUAD_PERM, 0, 1, 2, 3)
offset:swizzle(BITMASK_PERM, "01pi0")
offset:swizzle(BROADCAST, 2, 0)
offset:swizzle(SWAP, 8)
offset:swizzle(REVERSE, 30 + 2)

```


#### gds


Specifies whether to use GDS or LDS memory (LDS is the default).

    ======================================== ================================================
    Syntax                                   Description
    ======================================== ================================================
    gds                                      Use GDS memory.
    ======================================== ================================================


### EXP Modifiers



#### done


Specifies if this is the last export from the shader to the target. By default,
an *export* instruction does not finish an export sequence.

    ======================================== ================================================
    Syntax                                   Description
    ======================================== ================================================
    done                                     Indicates the last export operation.
    ======================================== ================================================


#### compr


Indicates if the data is compressed (data is not compressed by default).

    ======================================== ================================================
    Syntax                                   Description
    ======================================== ================================================
    compr                                    Data is compressed.
    ======================================== ================================================


vm
~~

Specifies if the `exec<amdgpu_synid_exec>` mask is valid for this *export* instruction
(the mask is not valid by default).

    ======================================== ================================================
    Syntax                                   Description
    ======================================== ================================================
    vm                                       Set the flag indicating a valid
                                             `exec<amdgpu_synid_exec>` mask.
    ======================================== ================================================


#### row_en


Specifies whether to export one row or multiple rows of data.

    ======================================== ================================================
    Syntax                                   Description
    ======================================== ================================================
    row_en                                   Export multiple rows using row index from M0.
    ======================================== ================================================

### FLAT Modifiers



#### offset12


Specifies an immediate unsigned 12-bit offset, in bytes. The default value is 0.

    ================= ====================================================================
    Syntax            Description
    ================= ====================================================================
    offset:{0..4095}  Specifies a 12-bit unsigned offset as a positive
                      `integer number <amdgpu_synid_integer_number>`
                      or an `absolute expression<amdgpu_synid_absolute_expression>`.
    ================= ====================================================================

Examples:

```
offset:4095
offset:x-0xff

```


#### offset13s


Specifies an immediate signed 13-bit offset, in bytes. The default value is 0.

    ===================== ====================================================================
    Syntax                Description
    ===================== ====================================================================
    offset:{-4096..4095}  Specifies a 13-bit signed offset as an
                          `integer number <amdgpu_synid_integer_number>`
                          or an `absolute expression<amdgpu_synid_absolute_expression>`.
    ===================== ====================================================================

Examples:

```
offset:-4000
offset:0x10
offset:-x

```


#### offset12s


Specifies an immediate signed 12-bit offset, in bytes. The default value is 0.

    ===================== ====================================================================
    Syntax                Description
    ===================== ====================================================================
    offset:{-2048..2047}  Specifies a 12-bit signed offset as an
                          `integer number <amdgpu_synid_integer_number>`
                          or an `absolute expression<amdgpu_synid_absolute_expression>`.
    ===================== ====================================================================

Examples:

```
offset:-2000
offset:0x10
offset:-x+y

```


#### offset11


Specifies an immediate unsigned 11-bit offset, in bytes. The default value is 0.

    ================= ====================================================================
    Syntax            Description
    ================= ====================================================================
    offset:{0..2047}  Specifies an 11-bit unsigned offset as a positive
                      `integer number <amdgpu_synid_integer_number>`
                      or an `absolute expression<amdgpu_synid_absolute_expression>`.
    ================= ====================================================================

Examples:

```
offset:2047
offset:x+0xff

```

#### dlc


See a description `here<amdgpu_synid_dlc>`.

#### glc


See a description `here<amdgpu_synid_glc>`.

#### lds


See a description `here<amdgpu_synid_lds>`.

#### slc


See a description `here<amdgpu_synid_slc>`.

#### tfe


See a description `here<amdgpu_synid_tfe>`.

nv
~~

See a description `here<amdgpu_synid_nv>`.

#### sc0


See a description `here<amdgpu_synid_sc0>`.

#### sc1


See a description `here<amdgpu_synid_sc1>`.

nt
~~

See a description `here<amdgpu_synid_nt>`.

### MIMG Modifiers



#### dmask


Specifies which channels (image components) are used by the operation.
By default, no channels are used.

    =============== ====================================================================
    Syntax          Description
    =============== ====================================================================
    dmask:{0..15}   Specifies image channels as a positive
                    `integer number <amdgpu_synid_integer_number>`
                    or an `absolute expression<amdgpu_synid_absolute_expression>`.

                    Each bit corresponds to one of 4 image components (RGBA).

                    If the specified bit value is 0, the image component is not used,
                    while value 1 means that the component is used.
    =============== ====================================================================

This modifier has some limitations depending on the instruction kind:

    =================================================== ========================
    Instruction Kind                                    Valid dmask Values
    =================================================== ========================
    32-bit atomic *cmpswap*                             0x3
    32-bit atomic instructions except for *cmpswap*     0x1
    64-bit atomic *cmpswap*                             0xF
    64-bit atomic instructions except for *cmpswap*     0x3
    *gather4*                                           0x1, 0x2, 0x4, 0x8
    GFX11+ *msaa_load*                                  0x1, 0x2, 0x4, 0x8
    Other instructions                                  any value
    =================================================== ========================

Examples:

```
dmask:0xf
dmask:0b1111
dmask:x|y|z

```


#### unorm


Specifies whether the address is normalized or not (the address is normalized by default).

    ======================== ========================================
    Syntax                   Description
    ======================== ========================================
    unorm                    Force the address to be not normalized.
    ======================== ========================================

#### glc


See a description `here<amdgpu_synid_glc>`.

#### slc


See a description `here<amdgpu_synid_slc>`.


#### r128


Specifies texture resource size. The default size is 256 bits.

    =================== ================================================
    Syntax              Description
    =================== ================================================
    r128                Specifies 128 bits texture resource size.
    =================== ================================================

.. WARNING:: Using this modifier shall decrease *rsrc* operand size from 8 to 4 dwords, \
             but assembler does not currently support this feature.

#### tfe


See a description `here<amdgpu_synid_tfe>`.


#### lwe


Specifies LOD warning status (LOD warning is disabled by default).

    ======================================== ================================================
    Syntax                                   Description
    ======================================== ================================================
    lwe                                      Enables LOD warning.
    ======================================== ================================================


da
~~

Specifies if an array index must be sent to TA. By default, the array index is not sent.

    ======================================== ================================================
    Syntax                                   Description
    ======================================== ================================================
    da                                       Send an array index to TA.
    ======================================== ================================================


#### d16


Specifies data size: 16 or 32 bits (32 bits by default).

    ======================================== ================================================
    Syntax                                   Description
    ======================================== ================================================
    d16                                      Enables 16-bits data mode.

                                             On loads, convert data in memory to 16-bit
                                             format before storing it in VGPRs.

                                             For stores, convert 16-bit data in VGPRs to
                                             32 bits before writing the values to memory.

                                             Note that GFX8.0 does not support data packing.
                                             Each 16-bit data element occupies 1 VGPR.

                                             GFX8.1 and GFX9+ support data packing.
                                             Each pair of 16-bit data elements
                                             occupies 1 VGPR.
    ======================================== ================================================


#### a16


Specifies the size of image address components: 16 or 32 bits (32 bits by default).

    ======================================== ================================================
    Syntax                                   Description
    ======================================== ================================================
    a16                                      Enables 16-bits image address components.
    ======================================== ================================================


#### dim


Specifies surface dimension. This is a mandatory modifier. There is no default value.

    =============================== =========================================================
    Syntax                          Description
    =============================== =========================================================
    dim:1D                          One-dimensional image.
    dim:2D                          Two-dimensional image.
    dim:3D                          Three-dimensional image.
    dim:CUBE                        Cubemap array.
    dim:1D_ARRAY                    One-dimensional image array.
    dim:2D_ARRAY                    Two-dimensional image array.
    dim:2D_MSAA                     Two-dimensional multi-sample auto-aliasing image.
    dim:2D_MSAA_ARRAY               Two-dimensional multi-sample auto-aliasing image array.
    =============================== =========================================================

The following table defines an alternative syntax which is supported
for compatibility with SP3 assembler:

    =============================== =========================================================
    Syntax                          Description
    =============================== =========================================================
    dim:SQ_RSRC_IMG_1D              One-dimensional image.
    dim:SQ_RSRC_IMG_2D              Two-dimensional image.
    dim:SQ_RSRC_IMG_3D              Three-dimensional image.
    dim:SQ_RSRC_IMG_CUBE            Cubemap array.
    dim:SQ_RSRC_IMG_1D_ARRAY        One-dimensional image array.
    dim:SQ_RSRC_IMG_2D_ARRAY        Two-dimensional image array.
    dim:SQ_RSRC_IMG_2D_MSAA         Two-dimensional multi-sample auto-aliasing image.
    dim:SQ_RSRC_IMG_2D_MSAA_ARRAY   Two-dimensional multi-sample auto-aliasing image array.
    =============================== =========================================================

#### dlc


See a description `here<amdgpu_synid_dlc>`.

### Miscellaneous Modifiers



#### dlc


Controls device level cache policy for memory operations. Used for synchronization.
When specified, forces operation to bypass device level cache, making the operation device
level coherent. By default, instructions use device level cache.

    ======================================== ================================================
    Syntax                                   Description
    ======================================== ================================================
    dlc                                      Bypass device level cache.
    ======================================== ================================================


#### glc


For atomic opcodes, this modifier indicates that the instruction returns the value from memory
before the operation. For other opcodes, it is used together with `slc<amdgpu_synid_slc>`
to specify cache policy.

The default value is off (0).

    ======================================== ================================================
    Syntax                                   Description
    ======================================== ================================================
    glc                                      Set glc bit to 1.
    ======================================== ================================================


#### lds


Specifies where to store the result: VGPRs or LDS (VGPRs by default).

    ======================================== ===========================
    Syntax                                   Description
    ======================================== ===========================
    lds                                      Store the result in LDS.
    ======================================== ===========================


nv
~~

Specifies if the instruction is operating on non-volatile memory.
By default, memory is volatile.

    ======================================== ================================================
    Syntax                                   Description
    ======================================== ================================================
    nv                                       Indicates that the instruction operates on
                                             non-volatile memory.
    ======================================== ================================================


#### slc


Controls behavior of L2 cache. The default value is off (0).

    ======================================== ================================================
    Syntax                                   Description
    ======================================== ================================================
    slc                                      Set slc bit to 1.
    ======================================== ================================================


#### tfe


Controls access to partially resident textures. The default value is off (0).

    ======================================== ================================================
    Syntax                                   Description
    ======================================== ================================================
    tfe                                      Set tfe bit to 1.
    ======================================== ================================================


#### sc0


For atomic opcodes, this modifier indicates that the instruction returns the value from memory
before the operation. For other opcodes, it is used together with `sc1<amdgpu_synid_sc1>`
to specify cache policy.

    ======================================== ================================================
    Syntax                                   Description
    ======================================== ================================================
    sc0                                      Set sc0 bit to 1.
    ======================================== ================================================


#### sc1


This modifier is used together with `sc0<amdgpu_synid_sc0>` to specify cache
policy.

    ======================================== ================================================
    Syntax                                   Description
    ======================================== ================================================
    sc1                                      Set sc1 bit to 1.
    ======================================== ================================================


nt
~~

Indicates an operation with non-temporal data.

    ======================================== ================================================
    Syntax                                   Description
    ======================================== ================================================
    nt                                       Set nt bit to 1.
    ======================================== ================================================

### MUBUF/MTBUF Modifiers



#### idxen


Specifies whether address components include an index. By default, the index is not used.

May be used together with `offen<amdgpu_synid_offen>`.

Cannot be used with `addr64<amdgpu_synid_addr64>`.

    ======================================== ================================================
    Syntax                                   Description
    ======================================== ================================================
    idxen                                    Address components include an index.
    ======================================== ================================================


#### offen


Specifies whether address components include an offset. By default, the offset is not used.

May be used together with `idxen<amdgpu_synid_idxen>`.

Cannot be used with `addr64<amdgpu_synid_addr64>`.

    ======================================== ================================================
    Syntax                                   Description
    ======================================== ================================================
    offen                                    Address components include an offset.
    ======================================== ================================================


#### addr64


Specifies whether a 64-bit address is used. By default, no address is used.

Cannot be used with `offen<amdgpu_synid_offen>` and
`idxen<amdgpu_synid_idxen>` modifiers.

    ======================================== ================================================
    Syntax                                   Description
    ======================================== ================================================
    addr64                                   A 64-bit address is used.
    ======================================== ================================================


#### offset12


Specifies an immediate unsigned 12-bit offset, in bytes. The default value is 0.

    ================== ====================================================================
    Syntax             Description
    ================== ====================================================================
    offset:{0..0xFFF}  Specifies a 12-bit unsigned offset as a positive
                       `integer number <amdgpu_synid_integer_number>`
                       or an `absolute expression<amdgpu_synid_absolute_expression>`.
    ================== ====================================================================

Examples:

```
offset:x+y
offset:0x10

```

#### glc


See a description `here<amdgpu_synid_glc>`.

#### slc


See a description `here<amdgpu_synid_slc>`.

#### lds


See a description `here<amdgpu_synid_lds>`.

#### dlc


See a description `here<amdgpu_synid_dlc>`.

#### tfe


See a description `here<amdgpu_synid_tfe>`.


#### fmt


Specifies data and numeric formats used by the operation.
The default numeric format is BUF_NUM_FORMAT_UNORM.
The default data format is BUF_DATA_FORMAT_8.

    ========================================= ===============================================================
    Syntax                                    Description
    ========================================= ===============================================================
    format:{0..127}                           Use a format specified as either an
                                              `integer number<amdgpu_synid_integer_number>` or an
                                              `absolute expression<amdgpu_synid_absolute_expression>`.
    format:[<data format>]                    Use the specified data format and
                                              default numeric format.
    format:[<numeric format>]                 Use the specified numeric format and
                                              default data format.
    format:[<data format>,<numeric format>]   Use the specified data and numeric formats.
    format:[<numeric format>,<data format>]   Use the specified data and numeric formats.
    ========================================= ===============================================================


Supported data formats are defined in the following table:

    ========================================= ===============================
    Syntax                                    Note
    ========================================= ===============================
    BUF_DATA_FORMAT_INVALID
    BUF_DATA_FORMAT_8                         The default value.
    BUF_DATA_FORMAT_16
    BUF_DATA_FORMAT_8_8
    BUF_DATA_FORMAT_32
    BUF_DATA_FORMAT_16_16
    BUF_DATA_FORMAT_10_11_11
    BUF_DATA_FORMAT_11_11_10
    BUF_DATA_FORMAT_10_10_10_2
    BUF_DATA_FORMAT_2_10_10_10
    BUF_DATA_FORMAT_8_8_8_8
    BUF_DATA_FORMAT_32_32
    BUF_DATA_FORMAT_16_16_16_16
    BUF_DATA_FORMAT_32_32_32
    BUF_DATA_FORMAT_32_32_32_32
    BUF_DATA_FORMAT_RESERVED_15
    ========================================= ===============================


Supported numeric formats are defined below:

    ========================================= ===============================
    Syntax                                    Note
    ========================================= ===============================
    BUF_NUM_FORMAT_UNORM                      The default value.
    BUF_NUM_FORMAT_SNORM
    BUF_NUM_FORMAT_USCALED
    BUF_NUM_FORMAT_SSCALED
    BUF_NUM_FORMAT_UINT
    BUF_NUM_FORMAT_SINT
    BUF_NUM_FORMAT_SNORM_OGL                  GFX7 only.
    BUF_NUM_FORMAT_RESERVED_6                 GFX8 and GFX9 only.
    BUF_NUM_FORMAT_FLOAT
    ========================================= ===============================

Examples:

```
format:0
format:127
format:[BUF_DATA_FORMAT_16]
format:[BUF_DATA_FORMAT_16,BUF_NUM_FORMAT_SSCALED]
format:[BUF_NUM_FORMAT_FLOAT]

```


#### ufmt


Specifies a unified format used by the operation.
The default format is BUF_FMT_8_UNORM.

    ========================================= ===============================================================
    Syntax                                    Description
    ========================================= ===============================================================
    format:{0..127}                           Use a unified format specified as either an
                                              `integer number<amdgpu_synid_integer_number>` or an
                                              `absolute expression<amdgpu_synid_absolute_expression>`.
                                              Note that unified format numbers are incompatible with
                                              format numbers used for pre-GFX10 ISA.
    format:[<unified format>]                 Use the specified unified format.
    ========================================= ===============================================================

Unified format is a replacement for `data<amdgpu_synid_format_data>`
and `numeric<amdgpu_synid_format_num>` formats. For compatibility with older ISA,
`the syntax with data and numeric formats<amdgpu_synid_fmt>` is still accepted
provided that the combination of formats can be mapped to a unified format.

Supported unified formats and equivalent combinations of data and numeric formats
are defined below:

    ============================== ============================== ============================= ============
    Unified Format Syntax          Equivalent Data Format         Equivalent Numeric Format     Note
    ============================== ============================== ============================= ============
    BUF_FMT_INVALID                BUF_DATA_FORMAT_INVALID        BUF_NUM_FORMAT_UNORM

    BUF_FMT_8_UNORM                BUF_DATA_FORMAT_8              BUF_NUM_FORMAT_UNORM
    BUF_FMT_8_SNORM                BUF_DATA_FORMAT_8              BUF_NUM_FORMAT_SNORM
    BUF_FMT_8_USCALED              BUF_DATA_FORMAT_8              BUF_NUM_FORMAT_USCALED
    BUF_FMT_8_SSCALED              BUF_DATA_FORMAT_8              BUF_NUM_FORMAT_SSCALED
    BUF_FMT_8_UINT                 BUF_DATA_FORMAT_8              BUF_NUM_FORMAT_UINT
    BUF_FMT_8_SINT                 BUF_DATA_FORMAT_8              BUF_NUM_FORMAT_SINT

    BUF_FMT_16_UNORM               BUF_DATA_FORMAT_16             BUF_NUM_FORMAT_UNORM
    BUF_FMT_16_SNORM               BUF_DATA_FORMAT_16             BUF_NUM_FORMAT_SNORM
    BUF_FMT_16_USCALED             BUF_DATA_FORMAT_16             BUF_NUM_FORMAT_USCALED
    BUF_FMT_16_SSCALED             BUF_DATA_FORMAT_16             BUF_NUM_FORMAT_SSCALED
    BUF_FMT_16_UINT                BUF_DATA_FORMAT_16             BUF_NUM_FORMAT_UINT
    BUF_FMT_16_SINT                BUF_DATA_FORMAT_16             BUF_NUM_FORMAT_SINT
    BUF_FMT_16_FLOAT               BUF_DATA_FORMAT_16             BUF_NUM_FORMAT_FLOAT

    BUF_FMT_8_8_UNORM              BUF_DATA_FORMAT_8_8            BUF_NUM_FORMAT_UNORM
    BUF_FMT_8_8_SNORM              BUF_DATA_FORMAT_8_8            BUF_NUM_FORMAT_SNORM
    BUF_FMT_8_8_USCALED            BUF_DATA_FORMAT_8_8            BUF_NUM_FORMAT_USCALED
    BUF_FMT_8_8_SSCALED            BUF_DATA_FORMAT_8_8            BUF_NUM_FORMAT_SSCALED
    BUF_FMT_8_8_UINT               BUF_DATA_FORMAT_8_8            BUF_NUM_FORMAT_UINT
    BUF_FMT_8_8_SINT               BUF_DATA_FORMAT_8_8            BUF_NUM_FORMAT_SINT

    BUF_FMT_32_UINT                BUF_DATA_FORMAT_32             BUF_NUM_FORMAT_UINT
    BUF_FMT_32_SINT                BUF_DATA_FORMAT_32             BUF_NUM_FORMAT_SINT
    BUF_FMT_32_FLOAT               BUF_DATA_FORMAT_32             BUF_NUM_FORMAT_FLOAT

    BUF_FMT_16_16_UNORM            BUF_DATA_FORMAT_16_16          BUF_NUM_FORMAT_UNORM
    BUF_FMT_16_16_SNORM            BUF_DATA_FORMAT_16_16          BUF_NUM_FORMAT_SNORM
    BUF_FMT_16_16_USCALED          BUF_DATA_FORMAT_16_16          BUF_NUM_FORMAT_USCALED
    BUF_FMT_16_16_SSCALED          BUF_DATA_FORMAT_16_16          BUF_NUM_FORMAT_SSCALED
    BUF_FMT_16_16_UINT             BUF_DATA_FORMAT_16_16          BUF_NUM_FORMAT_UINT
    BUF_FMT_16_16_SINT             BUF_DATA_FORMAT_16_16          BUF_NUM_FORMAT_SINT
    BUF_FMT_16_16_FLOAT            BUF_DATA_FORMAT_16_16          BUF_NUM_FORMAT_FLOAT

    BUF_FMT_10_11_11_UNORM         BUF_DATA_FORMAT_10_11_11       BUF_NUM_FORMAT_UNORM          GFX10 only
    BUF_FMT_10_11_11_SNORM         BUF_DATA_FORMAT_10_11_11       BUF_NUM_FORMAT_SNORM          GFX10 only
    BUF_FMT_10_11_11_USCALED       BUF_DATA_FORMAT_10_11_11       BUF_NUM_FORMAT_USCALED        GFX10 only
    BUF_FMT_10_11_11_SSCALED       BUF_DATA_FORMAT_10_11_11       BUF_NUM_FORMAT_SSCALED        GFX10 only
    BUF_FMT_10_11_11_UINT          BUF_DATA_FORMAT_10_11_11       BUF_NUM_FORMAT_UINT           GFX10 only
    BUF_FMT_10_11_11_SINT          BUF_DATA_FORMAT_10_11_11       BUF_NUM_FORMAT_SINT           GFX10 only
    BUF_FMT_10_11_11_FLOAT         BUF_DATA_FORMAT_10_11_11       BUF_NUM_FORMAT_FLOAT

    BUF_FMT_11_11_10_UNORM         BUF_DATA_FORMAT_11_11_10       BUF_NUM_FORMAT_UNORM          GFX10 only
    BUF_FMT_11_11_10_SNORM         BUF_DATA_FORMAT_11_11_10       BUF_NUM_FORMAT_SNORM          GFX10 only
    BUF_FMT_11_11_10_USCALED       BUF_DATA_FORMAT_11_11_10       BUF_NUM_FORMAT_USCALED        GFX10 only
    BUF_FMT_11_11_10_SSCALED       BUF_DATA_FORMAT_11_11_10       BUF_NUM_FORMAT_SSCALED        GFX10 only
    BUF_FMT_11_11_10_UINT          BUF_DATA_FORMAT_11_11_10       BUF_NUM_FORMAT_UINT           GFX10 only
    BUF_FMT_11_11_10_SINT          BUF_DATA_FORMAT_11_11_10       BUF_NUM_FORMAT_SINT           GFX10 only
    BUF_FMT_11_11_10_FLOAT         BUF_DATA_FORMAT_11_11_10       BUF_NUM_FORMAT_FLOAT

    BUF_FMT_10_10_10_2_UNORM       BUF_DATA_FORMAT_10_10_10_2     BUF_NUM_FORMAT_UNORM
    BUF_FMT_10_10_10_2_SNORM       BUF_DATA_FORMAT_10_10_10_2     BUF_NUM_FORMAT_SNORM
    BUF_FMT_10_10_10_2_USCALED     BUF_DATA_FORMAT_10_10_10_2     BUF_NUM_FORMAT_USCALED        GFX10 only
    BUF_FMT_10_10_10_2_SSCALED     BUF_DATA_FORMAT_10_10_10_2     BUF_NUM_FORMAT_SSCALED        GFX10 only
    BUF_FMT_10_10_10_2_UINT        BUF_DATA_FORMAT_10_10_10_2     BUF_NUM_FORMAT_UINT
    BUF_FMT_10_10_10_2_SINT        BUF_DATA_FORMAT_10_10_10_2     BUF_NUM_FORMAT_SINT

    BUF_FMT_2_10_10_10_UNORM       BUF_DATA_FORMAT_2_10_10_10     BUF_NUM_FORMAT_UNORM
    BUF_FMT_2_10_10_10_SNORM       BUF_DATA_FORMAT_2_10_10_10     BUF_NUM_FORMAT_SNORM
    BUF_FMT_2_10_10_10_USCALED     BUF_DATA_FORMAT_2_10_10_10     BUF_NUM_FORMAT_USCALED
    BUF_FMT_2_10_10_10_SSCALED     BUF_DATA_FORMAT_2_10_10_10     BUF_NUM_FORMAT_SSCALED
    BUF_FMT_2_10_10_10_UINT        BUF_DATA_FORMAT_2_10_10_10     BUF_NUM_FORMAT_UINT
    BUF_FMT_2_10_10_10_SINT        BUF_DATA_FORMAT_2_10_10_10     BUF_NUM_FORMAT_SINT

    BUF_FMT_8_8_8_8_UNORM          BUF_DATA_FORMAT_8_8_8_8        BUF_NUM_FORMAT_UNORM
    BUF_FMT_8_8_8_8_SNORM          BUF_DATA_FORMAT_8_8_8_8        BUF_NUM_FORMAT_SNORM
    BUF_FMT_8_8_8_8_USCALED        BUF_DATA_FORMAT_8_8_8_8        BUF_NUM_FORMAT_USCALED
    BUF_FMT_8_8_8_8_SSCALED        BUF_DATA_FORMAT_8_8_8_8        BUF_NUM_FORMAT_SSCALED
    BUF_FMT_8_8_8_8_UINT           BUF_DATA_FORMAT_8_8_8_8        BUF_NUM_FORMAT_UINT
    BUF_FMT_8_8_8_8_SINT           BUF_DATA_FORMAT_8_8_8_8        BUF_NUM_FORMAT_SINT

    BUF_FMT_32_32_UINT             BUF_DATA_FORMAT_32_32          BUF_NUM_FORMAT_UINT
    BUF_FMT_32_32_SINT             BUF_DATA_FORMAT_32_32          BUF_NUM_FORMAT_SINT
    BUF_FMT_32_32_FLOAT            BUF_DATA_FORMAT_32_32          BUF_NUM_FORMAT_FLOAT

    BUF_FMT_16_16_16_16_UNORM      BUF_DATA_FORMAT_16_16_16_16    BUF_NUM_FORMAT_UNORM
    BUF_FMT_16_16_16_16_SNORM      BUF_DATA_FORMAT_16_16_16_16    BUF_NUM_FORMAT_SNORM
    BUF_FMT_16_16_16_16_USCALED    BUF_DATA_FORMAT_16_16_16_16    BUF_NUM_FORMAT_USCALED
    BUF_FMT_16_16_16_16_SSCALED    BUF_DATA_FORMAT_16_16_16_16    BUF_NUM_FORMAT_SSCALED
    BUF_FMT_16_16_16_16_UINT       BUF_DATA_FORMAT_16_16_16_16    BUF_NUM_FORMAT_UINT
    BUF_FMT_16_16_16_16_SINT       BUF_DATA_FORMAT_16_16_16_16    BUF_NUM_FORMAT_SINT
    BUF_FMT_16_16_16_16_FLOAT      BUF_DATA_FORMAT_16_16_16_16    BUF_NUM_FORMAT_FLOAT

    BUF_FMT_32_32_32_UINT          BUF_DATA_FORMAT_32_32_32       BUF_NUM_FORMAT_UINT
    BUF_FMT_32_32_32_SINT          BUF_DATA_FORMAT_32_32_32       BUF_NUM_FORMAT_SINT
    BUF_FMT_32_32_32_FLOAT         BUF_DATA_FORMAT_32_32_32       BUF_NUM_FORMAT_FLOAT
    BUF_FMT_32_32_32_32_UINT       BUF_DATA_FORMAT_32_32_32_32    BUF_NUM_FORMAT_UINT
    BUF_FMT_32_32_32_32_SINT       BUF_DATA_FORMAT_32_32_32_32    BUF_NUM_FORMAT_SINT
    BUF_FMT_32_32_32_32_FLOAT      BUF_DATA_FORMAT_32_32_32_32    BUF_NUM_FORMAT_FLOAT
    ============================== ============================== ============================= ============

Examples:

```
format:0
format:[BUF_FMT_32_UINT]

```

### SMRD/SMEM Modifiers


#### glc


See a description `here<amdgpu_synid_glc>`.

nv
~~

See a description `here<amdgpu_synid_nv>`.

#### dlc


See a description `here<amdgpu_synid_dlc>`.


#### offset20u


Specifies an unsigned 20-bit offset, in bytes. The default value is 0.

    ==================== ====================================================================
    Syntax               Description
    ==================== ====================================================================
    offset:{0..0xFFFFF}  Specifies an offset as a positive
                         `integer number <amdgpu_synid_integer_number>`
                         or an `absolute expression<amdgpu_synid_absolute_expression>`.
    ==================== ====================================================================

Examples:

```
offset:1
offset:0xfffff
offset:x-y

```


#### offset21s


Specifies a signed 21-bit offset, in bytes. The default value is 0.

    ============================= ====================================================================
    Syntax                        Description
    ============================= ====================================================================
    offset:{-0x100000..0xFFFFF}   Specifies an offset as an
                                  `integer number <amdgpu_synid_integer_number>`
                                  or an `absolute expression<amdgpu_synid_absolute_expression>`.
    ============================= ====================================================================

Examples:

```
offset:-1
offset:0xfffff
offset:-x

```

### VINTRP/VINTERP/LDSDIR Modifiers



#### high


Specifies which half of the LDS word to use. Low half of LDS word is used by default.

    ======================================== ================================
    Syntax                                   Description
    ======================================== ================================
    high                                     Use the high half of LDS word.
    ======================================== ================================

#### neg


See a description `here<amdgpu_synid_neg>`.


#### wait_exp


Specifies a wait on the EXP counter before issuing the current instruction.
The counter must be less than or equal to this value before the instruction is issued.
If set to 7, no wait is performed.

The default value is zero. This is a safe value, but it may be suboptimal.

    ================ ======================================================
    Syntax           Description
    ================ ======================================================
    wait_exp:{0..7}  An additional wait on the EXP counter before
                     issuing this instruction.
    ================ ======================================================


#### wait_vdst


Specifies a wait on the VA_VDST counter before issuing the current instruction.
The counter must be less than or equal to this value before the instruction is issued.
If set to 15, no wait is performed.

The default value is zero. This is a safe value, but it may be suboptimal.

    ================== ======================================================
    Syntax             Description
    ================== ======================================================
    wait_vdst:{0..15}  An additional wait on the VA_VDST counter before
                       issuing this instruction.
    ================== ======================================================

### DPP8 Modifiers



#### dpp8_sel


Selects which lanes to pull data from, within a group of 8 lanes. This is a mandatory modifier.
There is no default value.

The *dpp8_sel* modifier must specify exactly 8 values.
The first value selects which lane to read from to supply data into lane 0.
The second value controls lane 1 and so on.

Each value may be specified as either
an `integer number<amdgpu_synid_integer_number>` or
an `absolute expression<amdgpu_synid_absolute_expression>`.

    =============================================================== ===========================
    Syntax                                                          Description
    =============================================================== ===========================
    dpp8:[{0..7},{0..7},{0..7},{0..7},{0..7},{0..7},{0..7},{0..7}]  Select lanes to read from.
    =============================================================== ===========================

Examples:

```
dpp8:[7,6,5,4,3,2,1,0]
dpp8:[0,1,0,1,0,1,0,1]

```


fi
~~

Controls interaction with inactive lanes for *dpp8* instructions. The default value is zero.

Note: *inactive* lanes are those whose `exec<amdgpu_synid_exec>` mask bit is zero.

    ==================================== =====================================================
    Syntax                               Description
    ==================================== =====================================================
    fi:0                                 Fetch zero when accessing data from inactive lanes.
    fi:1                                 Fetch pre-existing values from inactive lanes.
    ==================================== =====================================================

Note: numeric values may be specified as either
`integer numbers<amdgpu_synid_integer_number>` or
`absolute expressions<amdgpu_synid_absolute_expression>`.

### DPP Modifiers



#### dpp_ctrl


Specifies how data is shared between threads. This is a mandatory modifier.
There is no default value.

Note: the lanes of a wavefront are organized in four *rows* and four *banks*.

    ======================================== ========================================================
    Syntax                                   Description
    ======================================== ========================================================
    quad_perm:[{0..3},{0..3},{0..3},{0..3}]  Full permute of 4 threads.
    row_mirror                               Mirror threads within row.
    row_half_mirror                          Mirror threads within 1/2 row (8 threads).
    row_bcast:15                             Broadcast the 15th thread of each row to the next row.
    row_bcast:31                             Broadcast thread 31 to rows 2 and 3.
    wave_shl:1                               Wavefront left shift by 1 thread.
    wave_rol:1                               Wavefront left rotate by 1 thread.
    wave_shr:1                               Wavefront right shift by 1 thread.
    wave_ror:1                               Wavefront right rotate by 1 thread.
    row_shl:{1..15}                          Row shift left by 1-15 threads.
    row_shr:{1..15}                          Row shift right by 1-15 threads.
    row_ror:{1..15}                          Row rotate right by 1-15 threads.
    ======================================== ========================================================

Note: numeric values may be specified as either
`integer numbers<amdgpu_synid_integer_number>` or
`absolute expressions<amdgpu_synid_absolute_expression>`.

Examples:

```
quad_perm:[0, 1, 2, 3]
row_shl:3

```


#### dpp16_ctrl


Specifies how data is shared between threads. This is a mandatory modifier.
There is no default value.

Note: the lanes of a wavefront are organized in four *rows* and four *banks*.
(There are only two rows in *wave32* mode.)

    ======================================== =======================================================
    Syntax                                   Description
    ======================================== =======================================================
    quad_perm:[{0..3},{0..3},{0..3},{0..3}]  Full permute of 4 threads.
    row_mirror                               Mirror threads within row.
    row_half_mirror                          Mirror threads within 1/2 row (8 threads).
    row_share:{0..15}                        Share the value from the specified lane with other
                                             lanes in the row.
    row_xmask:{0..15}                        Fetch from XOR(<current lane id>,<specified lane id>).
    row_shl:{1..15}                          Row shift left by 1-15 threads.
    row_shr:{1..15}                          Row shift right by 1-15 threads.
    row_ror:{1..15}                          Row rotate right by 1-15 threads.
    ======================================== =======================================================

Note: numeric values may be specified as either
`integer numbers<amdgpu_synid_integer_number>` or
`absolute expressions<amdgpu_synid_absolute_expression>`.

Examples:

```
quad_perm:[0, 1, 2, 3]
row_shl:3

```


#### dpp32_ctrl


Specifies how data is shared between threads. This is a mandatory modifier.
There is no default value.

Note: the lanes of a wavefront are organized in four *rows* and four *banks*.

    ======================================== =========================================================
    Syntax                                   Description
    ======================================== =========================================================
    quad_perm:[{0..3},{0..3},{0..3},{0..3}]  Full permute of 4 threads.
    row_mirror                               Mirror threads within row.
    row_half_mirror                          Mirror threads within 1/2 row (8 threads).
    row_bcast:15                             Broadcast the 15th thread of each row to the next row.
    row_bcast:31                             Broadcast thread 31 to rows 2 and 3.
    wave_shl:1                               Wavefront left shift by 1 thread.
    wave_rol:1                               Wavefront left rotate by 1 thread.
    wave_shr:1                               Wavefront right shift by 1 thread.
    wave_ror:1                               Wavefront right rotate by 1 thread.
    row_shl:{1..15}                          Row shift left by 1-15 threads.
    row_shr:{1..15}                          Row shift right by 1-15 threads.
    row_ror:{1..15}                          Row rotate right by 1-15 threads.
    row_newbcast:{1..15}                     Broadcast a thread within a row to the whole row.
    ======================================== =========================================================

Note: numeric values may be specified as either
`integer numbers<amdgpu_synid_integer_number>` or
`absolute expressions<amdgpu_synid_absolute_expression>`.

Examples:

```
quad_perm:[0, 1, 2, 3]
row_shl:3


```


#### dpp64_ctrl


Specifies how data is shared between threads. This is a mandatory modifier.
There is no default value.

Note: the lanes of a wavefront are organized in four *rows* and four *banks*.

    ======================================== ==================================================
    Syntax                                   Description
    ======================================== ==================================================
    row_newbcast:{1..15}                     Broadcast a thread within a row to the whole row.
    ======================================== ==================================================

Note: numeric values may be specified as either
`integer numbers<amdgpu_synid_integer_number>` or
`absolute expressions<amdgpu_synid_absolute_expression>`.

Examples:

```
row_newbcast:3


```


#### row_mask


Controls which rows are enabled for data sharing. By default, all rows are enabled.

Note: the lanes of a wavefront are organized in four *rows* and four *banks*.
(There are only two rows in *wave32* mode.)

    ================= ====================================================================
    Syntax            Description
    ================= ====================================================================
    row_mask:{0..15}  Specifies a *row mask* as a positive
                      `integer number <amdgpu_synid_integer_number>`
                      or an `absolute expression<amdgpu_synid_absolute_expression>`.

                      Each of the 4 bits in the mask controls one row
                      (0 - disabled, 1 - enabled).

                      In *wave32* mode, the values shall be limited to {0..7}.
    ================= ====================================================================

Examples:

```
row_mask:0xf
row_mask:0b1010
row_mask:x|y

```


#### bank_mask


Controls which banks are enabled for data sharing. By default, all banks are enabled.

Note: the lanes of a wavefront are organized in four *rows* and four *banks*.
(There are only two rows in *wave32* mode.)

    ================== ====================================================================
    Syntax             Description
    ================== ====================================================================
    bank_mask:{0..15}  Specifies a *bank mask* as a positive
                       `integer number <amdgpu_synid_integer_number>`
                       or an `absolute expression<amdgpu_synid_absolute_expression>`.

                       Each of the 4 bits in the mask controls one bank
                       (0 - disabled, 1 - enabled).
    ================== ====================================================================

Examples:

```
bank_mask:0x3
bank_mask:0b0011
bank_mask:x&y

```


#### bound_ctrl


Controls data sharing when accessing an invalid lane. By default, data sharing with
invalid lanes is disabled.

    ======================================== ================================================
    Syntax                                   Description
    ======================================== ================================================
    bound_ctrl:1                             Enables data sharing with invalid lanes.

                                             Accessing data from an invalid lane will
                                             return zero.

    bound_ctrl:0 (GFX11+)                    Disables data sharing with invalid lanes.
    ======================================== ================================================

.. WARNING:: For historical reasons, *bound_ctrl:0* has the same meaning as *bound_ctrl:1* for older architectures.


fi
~~

Controls interaction with *inactive* lanes for *dpp16* instructions. The default value is zero.

Note: *inactive* lanes are those whose `exec<amdgpu_synid_exec>` mask bit is zero.

    ======================================== ==================================================
    Syntax                                   Description
    ======================================== ==================================================
    fi:0                                     Interaction with inactive lanes is controlled by
                                             `bound_ctrl<amdgpu_synid_bound_ctrl>`.

    fi:1                                     Fetch pre-existing values from inactive lanes.
    ======================================== ==================================================

Note: numeric values may be specified as either
`integer numbers<amdgpu_synid_integer_number>` or
`absolute expressions<amdgpu_synid_absolute_expression>`.

### SDWA Modifiers


#### clamp


See a description `here<amdgpu_synid_clamp>`.

#### omod


See a description `here<amdgpu_synid_omod>`.


#### dst_sel


Selects which bits in the destination are affected. By default, all bits are affected.

    ======================================== ================================================
    Syntax                                   Description
    ======================================== ================================================
    dst_sel:DWORD                            Use bits 31:0.
    dst_sel:BYTE_0                           Use bits 7:0.
    dst_sel:BYTE_1                           Use bits 15:8.
    dst_sel:BYTE_2                           Use bits 23:16.
    dst_sel:BYTE_3                           Use bits 31:24.
    dst_sel:WORD_0                           Use bits 15:0.
    dst_sel:WORD_1                           Use bits 31:16.
    ======================================== ================================================


#### dst_unused


Controls what to do with the bits in the destination which are not selected
by `dst_sel<amdgpu_synid_dst_sel>`.
By default, unused bits are preserved.

    ======================================== ================================================
    Syntax                                   Description
    ======================================== ================================================
    dst_unused:UNUSED_PAD                    Pad with zeros.
    dst_unused:UNUSED_SEXT                   Sign-extend upper bits, zero lower bits.
    dst_unused:UNUSED_PRESERVE               Preserve bits.
    ======================================== ================================================


#### src0_sel


Controls which bits in the src0 are used. By default, all bits are used.

    ======================================== ================================================
    Syntax                                   Description
    ======================================== ================================================
    src0_sel:DWORD                           Use bits 31:0.
    src0_sel:BYTE_0                          Use bits 7:0.
    src0_sel:BYTE_1                          Use bits 15:8.
    src0_sel:BYTE_2                          Use bits 23:16.
    src0_sel:BYTE_3                          Use bits 31:24.
    src0_sel:WORD_0                          Use bits 15:0.
    src0_sel:WORD_1                          Use bits 31:16.
    ======================================== ================================================


#### src1_sel


Controls which bits in the src1 are used. By default, all bits are used.

    ======================================== ================================================
    Syntax                                   Description
    ======================================== ================================================
    src1_sel:DWORD                           Use bits 31:0.
    src1_sel:BYTE_0                          Use bits 7:0.
    src1_sel:BYTE_1                          Use bits 15:8.
    src1_sel:BYTE_2                          Use bits 23:16.
    src1_sel:BYTE_3                          Use bits 31:24.
    src1_sel:WORD_0                          Use bits 15:0.
    src1_sel:WORD_1                          Use bits 31:16.
    ======================================== ================================================


### SDWA Operand Modifiers


Operand modifiers are not used separately. They are applied to source operands.

#### abs


See a description `here<amdgpu_synid_abs>`.

#### neg


See a description `here<amdgpu_synid_neg>`.


#### sext


Sign-extends the value of a (sub-dword) integer operand to fill all 32 bits.

Valid for integer operands only.

    ======================================== ================================================
    Syntax                                   Description
    ======================================== ================================================
    sext(<operand>)                          Sign-extend operand value.
    ======================================== ================================================

Examples:

```
sext(v4)
sext(v255)

```

### VOP3 Modifiers



#### op_sel


Selects the low [15:0] or high [31:16] operand bits for source and destination operands.
By default, low bits are used for all operands.

The number of values specified with the op_sel modifier must match the number of instruction
operands (both source and destination). The first value controls src0, the second value controls src1
and so on, except that the last value controls destination.
The value 0 selects the low bits, while 1 selects the high bits.

Note: op_sel modifier affects 16-bit operands only. For 32-bit operands, the value specified
by op_sel must be 0.

    ======================================== ============================================================
    Syntax                                   Description
    ======================================== ============================================================
    op_sel:[{0..1},{0..1}]                   Select operand bits for instructions with 1 source operand.
    op_sel:[{0..1},{0..1},{0..1}]            Select operand bits for instructions with 2 source operands.
    op_sel:[{0..1},{0..1},{0..1},{0..1}]     Select operand bits for instructions with 3 source operands.
    ======================================== ============================================================

Note: numeric values may be specified as either
`integer numbers<amdgpu_synid_integer_number>` or
`absolute expressions<amdgpu_synid_absolute_expression>`.

Examples:

```
op_sel:[0,0]
op_sel:[0,1]

```


#### dpp_op_sel


This is a special version of *op_sel* used for *permlane* opcodes to specify
dpp-like mode bits - `fi<amdgpu_synid_fi16>` and
`bound_ctrl<amdgpu_synid_bound_ctrl>`.

    ======================================== =================================================================
    Syntax                                   Description
    ======================================== =================================================================
    op_sel:[{0..1},{0..1}]                   The first bit specifies `fi<amdgpu_synid_fi16>`, the second
                                             bit specifies `bound_ctrl<amdgpu_synid_bound_ctrl>`.
    ======================================== =================================================================

Note: numeric values may be specified as either
`integer numbers<amdgpu_synid_integer_number>` or
`absolute expressions<amdgpu_synid_absolute_expression>`.

Examples:

```
op_sel:[0,0]

```


#### clamp


Clamp meaning depends on instruction.

For *v_cmp* instructions, clamp modifier indicates that the compare signals
if a floating-point exception occurs. By default, signaling is disabled.

For integer operations, clamp modifier indicates that the result must be clamped
to the largest and smallest representable value. By default, there is no clamping.

For floating-point operations, clamp modifier indicates that the result must be clamped
to the range [0.0, 1.0]. By default, there is no clamping.

Note: clamp modifier is applied after `output modifiers<amdgpu_synid_omod>` (if any).

    ======================================== ================================================
    Syntax                                   Description
    ======================================== ================================================
    clamp                                    Enables clamping (or signaling).
    ======================================== ================================================


#### omod


Specifies if an output modifier must be applied to the result.
It is assumed that the result is a floating-point number.

By default, no output modifiers are applied.

Note: output modifiers are applied before `clamping<amdgpu_synid_clamp>` (if any).

    ======================================== ================================================
    Syntax                                   Description
    ======================================== ================================================
    mul:2                                    Multiply the result by 2.
    mul:4                                    Multiply the result by 4.
    div:2                                    Multiply the result by 0.5.
    ======================================== ================================================

Note: numeric values may be specified as either
`integer numbers<amdgpu_synid_integer_number>` or
`absolute expressions<amdgpu_synid_absolute_expression>`.

Examples:

```
mul:2
mul:x      // x must be equal to 2 or 4

```


### VOP3 Operand Modifiers


Operand modifiers are not used separately. They are applied to source operands.


#### abs


Computes the absolute value of its operand. Must be applied before `neg<amdgpu_synid_neg>`
(if any). Valid for floating-point operands only.

    ======================================== ====================================================
    Syntax                                   Description
    ======================================== ====================================================
    abs(<operand>)                           Get the absolute value of a floating-point operand.
    \|<operand>|                             The same as above (an SP3 syntax).
    ======================================== ====================================================

Note: avoid using SP3 syntax with operands specified as expressions because the trailing '|'
may be misinterpreted. Such operands should be enclosed into additional parentheses, as shown
in examples below.

Examples:

```
abs(v36)
\|v36|
abs(x|y)     // ok
\|(x|y)|      // additional parentheses are required

```


#### neg


Computes the negative value of its operand. Must be applied after `abs<amdgpu_synid_abs>`
(if any). Valid for floating-point operands only.

    ================== ====================================================
    Syntax             Description
    ================== ====================================================
    neg(<operand>)     Get the negative value of a floating-point operand.
                       An optional `abs<amdgpu_synid_abs>` modifier
                       may be applied to the operand before negation.
    -<operand>         The same as above (an SP3 syntax).
    ================== ====================================================

Note: SP3 syntax is supported with limitations because of a potential ambiguity.
Currently, it is allowed in the following cases:

* Before a register.
* Before an `abs<amdgpu_synid_abs>` modifier.
* Before an SP3 `abs<amdgpu_synid_abs>` modifier.

In all other cases, "-" is handled as a part of an expression that follows the sign.

Examples:

```
// Operands with negate modifiers
neg(v[0])
neg(1.0)
neg(abs(v0))
-v5
-abs(v5)
-\|v5|

// Expressions where "-" has a different meaning
-1
-x+y

```

### VOP3P Modifiers


This section describes modifiers of *regular* VOP3P instructions.

*v_mad_mix\** and *v_fma_mix\**
instructions use these modifiers `in a special manner<amdgpu_synid_mad_mix>`.


#### op_sel


Selects the low [15:0] or high [31:16] operand bits as input to the operation,
which results in the lower-half of the destination.
By default, low 16 bits are used for all operands.

The number of values specified by the *op_sel* modifier must match the number of source
operands. The first value controls src0, the second value controls src1 and so on.

The value 0 selects the low bits, while 1 selects the high bits.

    ================================= =============================================================
    Syntax                            Description
    ================================= =============================================================
    op_sel:[{0..1}]                   Select operand bits for instructions with 1 source operand.
    op_sel:[{0..1},{0..1}]            Select operand bits for instructions with 2 source operands.
    op_sel:[{0..1},{0..1},{0..1}]     Select operand bits for instructions with 3 source operands.
    ================================= =============================================================

Note: numeric values may be specified as either
`integer numbers<amdgpu_synid_integer_number>` or
`absolute expressions<amdgpu_synid_absolute_expression>`.

Examples:

```
op_sel:[0,0]
op_sel:[0,1,0]

```


#### op_sel_hi


Selects the low [15:0] or high [31:16] operand bits as input to the operation,
which results in the upper-half of the destination.
By default, high 16 bits are used for all operands.

The number of values specified by the *op_sel_hi* modifier must match the number of source
operands. The first value controls src0, the second value controls src1 and so on.

The value 0 selects the low bits, while 1 selects the high bits.

    =================================== =============================================================
    Syntax                              Description
    =================================== =============================================================
    op_sel_hi:[{0..1}]                  Select operand bits for instructions with 1 source operand.
    op_sel_hi:[{0..1},{0..1}]           Select operand bits for instructions with 2 source operands.
    op_sel_hi:[{0..1},{0..1},{0..1}]    Select operand bits for instructions with 3 source operands.
    =================================== =============================================================

Note: numeric values may be specified as either
`integer numbers<amdgpu_synid_integer_number>` or
`absolute expressions<amdgpu_synid_absolute_expression>`.

Examples:

```
op_sel_hi:[0,0]
op_sel_hi:[0,0,1]

```


#### neg_lo


Specifies whether to change the sign of operand values selected by
`op_sel<amdgpu_synid_op_sel>`. These values are then used
as input to the operation, which results in the upper-half of the destination.

The number of values specified by this modifier must match the number of source
operands. The first value controls src0, the second value controls src1 and so on.

The value 0 indicates that the corresponding operand value is used unmodified,
the value 1 indicates that the negative value of the operand must be used.

By default, operand values are used unmodified.

This modifier is valid for floating-point operands only.

    ================================ ==================================================================
    Syntax                           Description
    ================================ ==================================================================
    neg_lo:[{0..1}]                  Select affected operands for instructions with 1 source operand.
    neg_lo:[{0..1},{0..1}]           Select affected operands for instructions with 2 source operands.
    neg_lo:[{0..1},{0..1},{0..1}]    Select affected operands for instructions with 3 source operands.
    ================================ ==================================================================

Note: numeric values may be specified as either
`integer numbers<amdgpu_synid_integer_number>` or
`absolute expressions<amdgpu_synid_absolute_expression>`.

Examples:

```
neg_lo:[0]
neg_lo:[0,1]

```


#### neg_hi


Specifies whether to change sign of operand values selected by
`op_sel_hi<amdgpu_synid_op_sel_hi>`. These values are then used
as input to the operation, which results in the upper-half of the destination.

The number of values specified by this modifier must match the number of source
operands. The first value controls src0, the second value controls src1 and so on.

The value 0 indicates that the corresponding operand value is used unmodified,
the value 1 indicates that the negative value of the operand must be used.

By default, operand values are used unmodified.

This modifier is valid for floating-point operands only.

    =============================== ==================================================================
    Syntax                          Description
    =============================== ==================================================================
    neg_hi:[{0..1}]                 Select affected operands for instructions with 1 source operand.
    neg_hi:[{0..1},{0..1}]          Select affected operands for instructions with 2 source operands.
    neg_hi:[{0..1},{0..1},{0..1}]   Select affected operands for instructions with 3 source operands.
    =============================== ==================================================================

Note: numeric values may be specified as either
`integer numbers<amdgpu_synid_integer_number>` or
`absolute expressions<amdgpu_synid_absolute_expression>`.

Examples:

```
neg_hi:[1,0]
neg_hi:[0,1,1]

```

#### clamp


See a description `here<amdgpu_synid_clamp>`.


### VOP3P MAD_MIX/FMA_MIX Modifiers


*v_mad_mix\** and *v_fma_mix\**
instructions use *op_sel* and *op_sel_hi* modifiers
in a manner different from *regular* VOP3P instructions.

See a description below.


#### m_op_sel


This operand has meaning only for 16-bit source operands, as indicated by
`m_op_sel_hi<amdgpu_synid_mad_mix_op_sel_hi>`.
It specifies to select either the low [15:0] or high [31:16] operand bits
as input to the operation.

The number of values specified by the *op_sel* modifier must match the number of source
operands. The first value controls src0, the second value controls src1 and so on.

The value 0 indicates the low bits, the value 1 indicates the high 16 bits.

By default, low bits are used for all operands.

    =============================== ===================================================
    Syntax                          Description
    =============================== ===================================================
    op_sel:[{0..1},{0..1},{0..1}]   Select the location of each 16-bit source operand.
    =============================== ===================================================

Note: numeric values may be specified as either
`integer numbers<amdgpu_synid_integer_number>` or
`absolute expressions<amdgpu_synid_absolute_expression>`.

Examples:

```
op_sel:[0,1]

```


#### m_op_sel_hi


Selects the size of source operands: either 32 bits or 16 bits.
By default, 32 bits are used for all source operands.

The number of values specified by the *op_sel_hi* modifier must match the number of source
operands. The first value controls src0, the second value controls src1 and so on.

The value 0 indicates 32 bits, the value 1 indicates 16 bits.

The location of 16 bits in the operand may be specified by
`m_op_sel<amdgpu_synid_mad_mix_op_sel>`.

    ======================================== ========================================
    Syntax                                   Description
    ======================================== ========================================
    op_sel_hi:[{0..1},{0..1},{0..1}]         Select the size of each source operand.
    ======================================== ========================================

Note: numeric values may be specified as either
`integer numbers<amdgpu_synid_integer_number>` or
`absolute expressions<amdgpu_synid_absolute_expression>`.

Examples:

```
op_sel_hi:[1,1,1]

```

#### abs


See a description `here<amdgpu_synid_abs>`.

#### neg


See a description `here<amdgpu_synid_neg>`.

#### clamp


See a description `here<amdgpu_synid_clamp>`.

### VOP3P MFMA Modifiers



#### cbsz


Specifies a broadcast mode.

    =============================== ==================================================================
    Syntax                          Description
    =============================== ==================================================================
    cbsz:[{0..7}]                   A broadcast mode.
    =============================== ==================================================================

Note: numeric value may be specified as either
an `integer number<amdgpu_synid_integer_number>` or
an `absolute expression<amdgpu_synid_absolute_expression>`.


#### abid


Specifies matrix A group select.

    =============================== ==================================================================
    Syntax                          Description
    =============================== ==================================================================
    abid:[{0..15}]                  Matrix A group select id.
    =============================== ==================================================================

Note: numeric value may be specified as either
an `integer number<amdgpu_synid_integer_number>` or
an `absolute expression<amdgpu_synid_absolute_expression>`.


#### blgp


Specifies matrix B lane group pattern.

    =============================== ==================================================================
    Syntax                          Description
    =============================== ==================================================================
    blgp:[{0..7}]                   Matrix B lane group pattern.
    =============================== ==================================================================

Note: numeric value may be specified as either
an `integer number<amdgpu_synid_integer_number>` or
an `absolute expression<amdgpu_synid_absolute_expression>`.


#### neg


Indicates operands that must be negated before the operation.
The number of values specified by this modifier must match the number of source
operands. The first value controls src0, the second value controls src1 and so on.

The value 0 indicates that the corresponding operand value is used unmodified,
the value 1 indicates that the operand value must be negated before the operation.

By default, operand values are used unmodified.

    =============================== ==================================================================
    Syntax                          Description
    =============================== ==================================================================
    neg:[{0..1},{0..1},{0..1}]      Select operands which must be negated before the operation.
    =============================== ==================================================================

Note: numeric values may be specified as either
`integer numbers<amdgpu_synid_integer_number>` or
`absolute expressions<amdgpu_synid_absolute_expression>`.

Examples:

```
neg:[0,1,1]
```

## 来源、版本与核验

- 上游：[llvm/docs/AMDGPUModifierSyntax.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/AMDGPUModifierSyntax.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/llvm/llvm/docs/AMDGPUModifierSyntax.rst`；SHA-256：`2ebd6024ac168296caa5bfbea492be307911506aa7aadd4899c650b96d0b9ed5`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
