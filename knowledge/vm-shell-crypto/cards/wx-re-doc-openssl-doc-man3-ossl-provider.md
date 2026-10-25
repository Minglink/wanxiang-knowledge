---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-provider",
  "title": "OpenSSL：Provider 架构 · OSSL_PROVIDER（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "Provider",
    "算法获取",
    "openssl",
    "OSSL_PROVIDER"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "853748ca0945ed0264bd0a7d33f00e60030ea0843f245bbab8709fc58bd93abe",
  "generatedHash": "42ea593ac1eb612c6d79820b16b7e06244d5fec0ebad3ed6162030d4e2b33b41",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Provider 架构：OSSL_PROVIDER_set_default_search_path, OSSL_PROVIDER_get0_default_search_path, OSSL_PROVIDER, OSSL_PROVIDER_load, OSSL_PROVIDER_try_load, OSSL_PROVIDER_unload, OSSL_PROVIDER_load_ex, OSSL_PROVIDER_try_load_ex, OSSL_PROVIDER_available, OSSL_PROVIDER_do_all, OSSL_PROVIDER_gettable_params, OSSL_PROVIDE",
  "l1": "**OSSL_PROVIDER** is a type that holds internal information about implementation providers (see provider(7) for information on what a provider is). A provider can be built in to the application or the OpenSSL libraries, or can be a loadable module. The functions described here handle both forms. Some of these functions operate within a library context, please see OSSL_LIB_CTX(3) for further details. OSSL_PROVIDER_set_default_search_path() specifies the default search `path` that is to be used for looking for providers in the specified `libctx`. If left unspecified, an environment variable and a fall back default value will be used instead. OSSL_PROVIDER_get0_default_search_path() retrieves the default search `path` that is to be used for looking for providers in the specified `libctx`. If successful returns the path or empty string; the p",
  "questions": [
    "OSSL_PROVIDER 如何用于Provider 架构？",
    "OSSL_PROVIDER 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-provider",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_PROVIDER.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：Provider 架构 · OSSL_PROVIDER（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：Provider 架构。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_PROVIDER_set_default_search_path,
OSSL_PROVIDER_get0_default_search_path,
OSSL_PROVIDER, OSSL_PROVIDER_load, OSSL_PROVIDER_try_load, OSSL_PROVIDER_unload,
OSSL_PROVIDER_load_ex, OSSL_PROVIDER_try_load_ex,
OSSL_PROVIDER_available, OSSL_PROVIDER_do_all,
OSSL_PROVIDER_gettable_params, OSSL_PROVIDER_get_params,
OSSL_PROVIDER_query_operation, OSSL_PROVIDER_unquery_operation,
OSSL_PROVIDER_get0_provider_ctx, OSSL_PROVIDER_get0_dispatch,
OSSL_PROVIDER_add_builtin, OSSL_PROVIDER_get0_name, OSSL_PROVIDER_get_capabilities,
OSSL_PROVIDER_add_conf_parameter, OSSL_PROVIDER_get_conf_parameters,
OSSL_PROVIDER_conf_get_bool, OSSL_PROVIDER_self_test
- provider routines

## 技术正文

## NAME


OSSL_PROVIDER_set_default_search_path,
OSSL_PROVIDER_get0_default_search_path,
OSSL_PROVIDER, OSSL_PROVIDER_load, OSSL_PROVIDER_try_load, OSSL_PROVIDER_unload,
OSSL_PROVIDER_load_ex, OSSL_PROVIDER_try_load_ex,
OSSL_PROVIDER_available, OSSL_PROVIDER_do_all,
OSSL_PROVIDER_gettable_params, OSSL_PROVIDER_get_params,
OSSL_PROVIDER_query_operation, OSSL_PROVIDER_unquery_operation,
OSSL_PROVIDER_get0_provider_ctx, OSSL_PROVIDER_get0_dispatch,
OSSL_PROVIDER_add_builtin, OSSL_PROVIDER_get0_name, OSSL_PROVIDER_get_capabilities,
OSSL_PROVIDER_add_conf_parameter, OSSL_PROVIDER_get_conf_parameters,
OSSL_PROVIDER_conf_get_bool, OSSL_PROVIDER_self_test
- provider routines

## SYNOPSIS


```c
#include <openssl/provider.h>

typedef struct ossl_provider_st OSSL_PROVIDER;

int OSSL_PROVIDER_set_default_search_path(OSSL_LIB_CTX *libctx,
                                          const char *path);
const char *OSSL_PROVIDER_get0_default_search_path(OSSL_LIB_CTX *libctx);

OSSL_PROVIDER *OSSL_PROVIDER_load(OSSL_LIB_CTX *libctx, const char *name);
OSSL_PROVIDER *OSSL_PROVIDER_load_ex(OSSL_LIB_CTX *, const char *name,
                                     OSSL_PARAM *params);
OSSL_PROVIDER *OSSL_PROVIDER_try_load(OSSL_LIB_CTX *libctx, const char *name,
                                      int retain_fallbacks);
OSSL_PROVIDER *OSSL_PROVIDER_try_load_ex(OSSL_LIB_CTX *, const char *name,
                                         OSSL_PARAM *params,
                                         int retain_fallbacks);
int OSSL_PROVIDER_unload(OSSL_PROVIDER *prov);
int OSSL_PROVIDER_available(OSSL_LIB_CTX *libctx, const char *name);
int OSSL_PROVIDER_do_all(OSSL_LIB_CTX *ctx,
                         int (*cb)(OSSL_PROVIDER *provider, void *cbdata),
                         void *cbdata);

const OSSL_PARAM *OSSL_PROVIDER_gettable_params(OSSL_PROVIDER *prov);
int OSSL_PROVIDER_get_params(OSSL_PROVIDER *prov, OSSL_PARAM params[]);

const OSSL_ALGORITHM *OSSL_PROVIDER_query_operation(const OSSL_PROVIDER *prov,
                                                    int operation_id,
                                                    int *no_cache);
void OSSL_PROVIDER_unquery_operation(const OSSL_PROVIDER *prov,
                                     int operation_id,
                                     const OSSL_ALGORITHM *algs);
void *OSSL_PROVIDER_get0_provider_ctx(const OSSL_PROVIDER *prov);
const OSSL_DISPATCH *OSSL_PROVIDER_get0_dispatch(const OSSL_PROVIDER *prov);

int OSSL_PROVIDER_add_builtin(OSSL_LIB_CTX *libctx, const char *name,
                              ossl_provider_init_fn *init_fn);

const char *OSSL_PROVIDER_get0_name(const OSSL_PROVIDER *prov);

int OSSL_PROVIDER_get_capabilities(const OSSL_PROVIDER *prov,
                                   const char *capability,
                                   OSSL_CALLBACK *cb,
                                   void *arg);
int OSSL_PROVIDER_add_conf_parameter(OSSL_PROVIDER *prov, const char *name,
                                     const char *value);
int OSSL_PROVIDER_get_conf_parameters(OSSL_PROVIDER *prov,
                                      OSSL_PARAM params[]);
int OSSL_PROVIDER_conf_get_bool(const OSSL_PROVIDER *prov,
                                const char *name, int defval);
int OSSL_PROVIDER_self_test(const OSSL_PROVIDER *prov);

```

## DESCRIPTION


**OSSL_PROVIDER** is a type that holds internal information about
implementation providers (see provider(7) for information on what a
provider is).
A provider can be built in to the application or the OpenSSL
libraries, or can be a loadable module.
The functions described here handle both forms.

Some of these functions operate within a library context, please see
OSSL_LIB_CTX(3) for further details.

### Functions


OSSL_PROVIDER_set_default_search_path() specifies the default search `path`
that is to be used for looking for providers in the specified `libctx`.
If left unspecified, an environment variable and a fall back default value will
be used instead.

OSSL_PROVIDER_get0_default_search_path() retrieves the default search `path`
that is to be used for looking for providers in the specified `libctx`.
If successful returns the path or empty string; the path is valid until the
context is released or OSSL_PROVIDER_set_default_search_path() is called.

OSSL_PROVIDER_add_builtin() is used to add a built in provider to
**OSSL_PROVIDER** store in the given library context, by associating a
provider name with a provider initialization function.
This name can then be used with OSSL_PROVIDER_load().

OSSL_PROVIDER_load() loads and initializes a provider.
This may simply initialize a provider that was previously added with
OSSL_PROVIDER_add_builtin() and run its given initialization function,
or load a provider module with the given name and run its provider
entry point, `OSSL_provider_init`. The `name` can be a path
to a provider module, in that case the provider name as returned
by OSSL_PROVIDER_get0_name() will be the path. Interpretation
of relative paths is platform dependent and they are relative
to the configured "MODULESDIR" directory or the path set in
the environment variable OPENSSL_MODULES if set.

OSSL_PROVIDER_try_load() functions like OSSL_PROVIDER_load(), except that
it does not disable the fallback providers if the provider cannot be
loaded and initialized or if `retain_fallbacks` is nonzero.
If the provider loads successfully and `retain_fallbacks` is zero, the
fallback providers are disabled.

OSSL_PROVIDER_load_ex() and OSSL_PROVIDER_try_load_ex() are the variants
of the previous functions accepting an `OSSL_PARAM` array of the parameters
that are passed as the configuration of the loaded provider. The parameters
of any type but `OSSL_PARAM_UTF8_STRING` are silently ignored. If the
parameters are provided, they replace **all** the ones specified in the
configuration file.

OSSL_PROVIDER_unload() unloads the given provider.
For a provider added with OSSL_PROVIDER_add_builtin(), this simply
runs its teardown function.

OSSL_PROVIDER_available() checks if a named provider is available
for use.

OSSL_PROVIDER_do_all() iterates over all loaded providers, calling
`cb` for each one, with the current provider in `provider` and the
`cbdata` that comes from the caller. If no other provider has been loaded
before calling this function, the default provider is still available as
fallback.
See OSSL_PROVIDER-default(7) for more information on this fallback
behaviour.

OSSL_PROVIDER_gettable_params() is used to get a provider parameter
descriptor set as a constant OSSL_PARAM(3) array.

OSSL_PROVIDER_get_params() is used to get provider parameter values.
The caller must prepare the OSSL_PARAM(3) array before calling this
function, and the variables acting as buffers for this parameter array
should be filled with data when it returns successfully.

OSSL_PROVIDER_add_conf_parameter() sets the provider configuration parameter
`name` to `value`.
Provider configuration parameters are managed by the OpenSSL core and normally
set in the configuration file, but can also be set early in the main program
before a provider is in use by multiple threads.
Parameters that only affect provider initialisation must, for now, be set in
the configuration file, only parameters that are also queried later have any
affect when set via this interface.
Only text parameters can be given, and it's up to the provider to
interpret them.

OSSL_PROVIDER_get_conf_parameters() retrieves global configuration parameters
associated with `prov`.
These configuration parameters are stored for each provider by the OpenSSL core,
not the provider itself, parameters managed by the provider are queried via
**OSSL_PROVIDER_get_params()** described above.
The parameters are returned by reference, not as copies, and so the elements of
the `param` array must have **OSSL_PARAM_UTF8_PTR** as their **data_type**.

OSSL_PROVIDER_conf_get_bool() parses the global configuration parameter `name`
associated with provider `prov` as a boolean value, returning a default value
`defval` when unable to retrieve or parse the parameter.
Parameter values equal (case-insensitively) to `1`, `on`, `yes`, or `true`
yield a true (nonzero) result.
Parameter values equal (case-insensitively) to `0`, `off`, `no`, or `false`
yield a false (zero) result.

OSSL_PROVIDER_self_test() is used to run a provider's self tests on demand.
If the self tests fail then the provider will fail to provide any further
services and algorithms. OSSL_SELF_TEST_set_callback(3) may be called
beforehand in order to display diagnostics for the running self tests.

OSSL_PROVIDER_query_operation() calls the provider's `query_operation`
function (see provider(7)), if the provider has one. It returns an
array of `OSSL_ALGORITHM` for the given `operation_id` terminated by an all
NULL OSSL_ALGORITHM entry. This is considered a low-level function that most
applications should not need to call.

OSSL_PROVIDER_unquery_operation() calls the provider's `unquery_operation`
function (see provider(7)), if the provider has one.  This is considered a
low-level function that most applications should not need to call.

OSSL_PROVIDER_get0_provider_ctx() returns the provider context for the given
provider. The provider context is an opaque handle set by the provider itself
and is passed back to the provider by libcrypto in various function calls.

OSSL_PROVIDER_get0_dispatch() returns the provider's dispatch table as it was
returned in the `out` parameter from the provider's init function. See
provider-base(7).

If it is permissible to cache references to this array then `*no_store` is set
to 0 or 1 otherwise. If the array is not cacheable then it is assumed to
have a short lifetime.

OSSL_PROVIDER_get0_name() returns the name of the given provider.

OSSL_PROVIDER_get_capabilities() provides information about the capabilities
supported by the provider specified in `prov` with the capability name
`capability`. For each capability of that name supported by the provider it
will call the callback `cb` and supply a set of OSSL_PARAM(3)s describing the
capability. It will also pass back the argument `arg`. For more details about
capabilities and what they can be used for please see
provider-base(7)/CAPABILTIIES.

## RETURN VALUES


OSSL_PROVIDER_set_default_search_path(), OSSL_PROVIDER_add(),
OSSL_PROVIDER_unload(), OSSL_PROVIDER_get_params(),
OSSL_PROVIDER_add_conf_parameter(), OSSL_PROVIDER_get_conf_parameters()
and
OSSL_PROVIDER_get_capabilities() return 1 on success, or 0 on error.

OSSL_PROVIDER_get0_default_search_path() returns a pointer to a path on success,
or NULL on error or if the path has not previously been set.

OSSL_PROVIDER_load() and OSSL_PROVIDER_try_load() return a pointer to a
provider object on success, or NULL on error.

OSSL_PROVIDER_do_all() returns 1 if the callback `cb` returns 1 for every
provider it is called with, or 0 if any provider callback invocation returns 0;
callback processing stops at the first callback invocation on a provider
that returns 0.

OSSL_PROVIDER_available() returns 1 if the named provider is available,
otherwise 0.

OSSL_PROVIDER_gettable_params() returns a pointer to an array
of constant OSSL_PARAM(3), or NULL if none is provided.

OSSL_PROVIDER_get_params() and returns 1 on success, or 0 on error.

OSSL_PROVIDER_query_operation() returns an array of OSSL_ALGORITHM or NULL on
error.

OSSL_PROVIDER_self_test() returns 1 if the self tests pass, or 0 on error.

## EXAMPLES


This demonstrates how to load the provider module "foo" and ask for
its build information.

```c
#include <openssl/params.h>
#include <openssl/provider.h>
#include <openssl/err.h>

OSSL_PROVIDER *prov = NULL;
const char *build = NULL;
OSSL_PARAM request[] = {
    { "buildinfo", OSSL_PARAM_UTF8_PTR, &build, 0, 0 },
    { NULL, 0, NULL, 0, 0 }
};

if ((prov = OSSL_PROVIDER_load(NULL, "foo")) != NULL
    && OSSL_PROVIDER_get_params(prov, request))
    printf("Provider 'foo' buildinfo: %s\n", build);
else
    ERR_print_errors_fp(stderr);

```

## SEE ALSO


openssl-core.h(7), OSSL_LIB_CTX(3), provider(7)

## HISTORY


The type and functions described here were added in OpenSSL 3.0.

The `OSSL_PROVIDER_load_ex` and `OSSL_PROVIDER_try_load_ex` functions were
added in OpenSSL 3.2.

The
`OSSL_PROVIDER_add_conf_parameter`,
`OSSL_PROVIDER_get_conf_parameters`, and
`OSSL_PROVIDER_conf_get_bool` functions
were added in OpenSSL 3.5.

## COPYRIGHT


Copyright 2019-2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_PROVIDER.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_PROVIDER.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_PROVIDER.pod`；SHA-256：`853748ca0945ed0264bd0a7d33f00e60030ea0843f245bbab8709fc58bd93abe`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
