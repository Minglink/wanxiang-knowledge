---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-err-state-save",
  "title": "OpenSSL：密码实现与接口 · OSSL_ERR_STATE_save（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_ERR_STATE_save"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "fad71df195d3a509f192e1837302f7dd0ae12a47285b1a3ce670d6c0d9f48e20",
  "generatedHash": "dd6562288bb31536de8b4c2aa49ef1811c7fa9e2de95613497480341f1786e9b",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_ERR_STATE_new, OSSL_ERR_STATE_save, OSSL_ERR_STATE_save_to_mark, OSSL_ERR_STATE_restore, OSSL_ERR_STATE_free - saving and restoring error state",
  "l1": "These functions save and restore the error state from the thread local error state to a preallocated error state structure. OSSL_ERR_STATE_new() allocates an empty error state structure to be used when saving and restoring thread error state. OSSL_ERR_STATE_save() saves the thread error state to `es`. It subsequently clears the thread error state. Any previously saved state in `es` is cleared prior to saving the new state. OSSL_ERR_STATE_save_to_mark() is similar to OSSL_ERR_STATE_save() but only saves ERR entries up to the most recent mark on the ERR stack. These entries are moved to `es` and removed from the thread error state. However, the most recent marked ERR and any ERR state before it remains part of the thread error state and is not moved to the ERR_STATE. The mark is not cleared and must be cleared explicitly after a call to thi",
  "questions": [
    "OSSL_ERR_STATE_save 如何用于密码实现与接口？",
    "OSSL_ERR_STATE_save 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-err-state-save",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_ERR_STATE_save.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_ERR_STATE_save（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_ERR_STATE_new, OSSL_ERR_STATE_save, OSSL_ERR_STATE_save_to_mark,
OSSL_ERR_STATE_restore, OSSL_ERR_STATE_free - saving and restoring error state

## 技术正文

## NAME


OSSL_ERR_STATE_new, OSSL_ERR_STATE_save, OSSL_ERR_STATE_save_to_mark,
OSSL_ERR_STATE_restore, OSSL_ERR_STATE_free - saving and restoring error state

## SYNOPSIS


```c
#include <openssl/err.h>

ERR_STATE *OSSL_ERR_STATE_new(void);
void OSSL_ERR_STATE_save(ERR_STATE *es);
void OSSL_ERR_STATE_save_to_mark(ERR_STATE *es);
void OSSL_ERR_STATE_restore(const ERR_STATE *es);
void OSSL_ERR_STATE_free(ERR_STATE *es);

```

## DESCRIPTION


These functions save and restore the error state from the thread
local error state to a preallocated error state structure.

OSSL_ERR_STATE_new() allocates an empty error state structure to
be used when saving and restoring thread error state.

OSSL_ERR_STATE_save() saves the thread error state to `es`. It
subsequently clears the thread error state. Any previously saved
state in `es` is cleared prior to saving the new state.

OSSL_ERR_STATE_save_to_mark() is similar to OSSL_ERR_STATE_save() but only saves
ERR entries up to the most recent mark on the ERR stack. These entries are moved
to `es` and removed from the thread error state. However, the most recent
marked ERR and any ERR state before it remains part of the thread error state
and is not moved to the ERR_STATE. The mark is not cleared and must be cleared
explicitly after a call to this function using ERR_pop_to_mark(3) or
ERR_clear_last_mark(3). (Since a call to OSSL_ERR_STATE_save_to_mark() leaves
the marked ERR as the top error, either of these functions will have the same
effect.) If there is no marked ERR in the thread local error state, all ERR
entries are copied and the effect is the same as for a call to
OSSL_ERR_STATE_save().

OSSL_ERR_STATE_restore() adds all the error entries from the
saved state `es` to the thread error state. Existing entries in
the thread error state are not affected if there is enough space
for all the added entries. Any allocated data in the saved error
entries is duplicated on adding to the thread state.

OSSL_ERR_STATE_free() frees the saved error state `es`.
If the argument is NULL, nothing is done.

## RETURN VALUES


OSSL_ERR_STATE_new() returns a pointer to the allocated ERR_STATE
structure or NULL on error.

OSSL_ERR_STATE_save(), OSSL_ERR_STATE_save_to_mark(), OSSL_ERR_STATE_restore(),
OSSL_ERR_STATE_free() do not return any values.

## NOTES


OSSL_ERR_STATE_save() and OSSL_ERR_STATE_save_to_mark() cannot fail as it takes
over any allocated data from the thread error state.

OSSL_ERR_STATE_restore() is a best effort function. The only failure
that can happen during its operation is when memory allocation fails.
Because it manipulates the thread error state it avoids raising memory
errors on such failure. At worst the restored error entries will be
missing the auxiliary error data.

## SEE ALSO


ERR_raise(3), ERR_get_error(3), ERR_clear_error(3)

## HISTORY


All of these functions were added in OpenSSL 3.2.

## COPYRIGHT


Copyright 2023-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_ERR_STATE_save.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_ERR_STATE_save.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_ERR_STATE_save.pod`；SHA-256：`fad71df195d3a509f192e1837302f7dd0ae12a47285b1a3ce670d6c0d9f48e20`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
