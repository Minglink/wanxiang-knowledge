---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-qemu-docs-devel-writing-monitor-commands",
  "title": "QEMU：How to write monitor commands",
  "type": "note",
  "tags": [
    "VM",
    "系统虚拟机",
    "QEMU",
    "底层实现",
    "writing-monitor-commands",
    "qemu"
  ],
  "project": "VM与动态翻译",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "aa88913df660d0d6509239df93faf4d10dc18a823124fd10bcb68db7bd3c7c24",
  "generatedHash": "77dd06f2fef91a26b0e76a0f1204099c894cfec97d324029a472d1ca80873536",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "How to write monitor commands：How to write monitor commands",
  "l1": "This document is a step-by-step guide on how to write new QMP commands using the QAPI framework and HMP commands. This document doesn't discuss QMP protocol level details, nor does it dive into the QAPI framework implementation. For an in-depth introduction to the QAPI framework, please refer to `qapi-code-gen`. For the QMP protocol, see the `/interop/qmp-spec`. New commands may be implemented in QMP only. New HMP commands should be implemented on top of QMP. The typical HMP command wraps around an equivalent QMP command, but HMP convenience commands built from QMP building blocks are also fine. The long term goal is to make all existing HMP commands conform to this, to fully isolate HMP from the internals of QEMU. Refer to the `Writing a debugging aid returning unstructured text`_ section for further guidance on commands that would have ",
  "questions": [
    "writing-monitor-commands 如何用于How to write monitor commands？",
    "writing-monitor-commands 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-qemu-docs-devel-writing-monitor-commands",
      "url": "https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/writing-monitor-commands.rst",
      "checkedAt": "2026-10-25",
      "version": "v10.0.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）"
}
---
# QEMU：How to write monitor commands

> 本文收录 QEMU 的独立技术文献正文，固定标签 `v10.0.0`。主题：How to write monitor commands。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

How to write monitor commands

## 技术正文

## How to write monitor commands


This document is a step-by-step guide on how to write new QMP commands using
the QAPI framework and HMP commands.

This document doesn't discuss QMP protocol level details, nor does it dive
into the QAPI framework implementation.

For an in-depth introduction to the QAPI framework, please refer to
`qapi-code-gen`.  For the QMP protocol, see the
`/interop/qmp-spec`.

New commands may be implemented in QMP only.  New HMP commands should be
implemented on top of QMP.  The typical HMP command wraps around an
equivalent QMP command, but HMP convenience commands built from QMP
building blocks are also fine.  The long term goal is to make all
existing HMP commands conform to this, to fully isolate HMP from the
internals of QEMU. Refer to the `Writing a debugging aid returning
unstructured text`_ section for further guidance on commands that
would have traditionally been HMP only.

### Overview


Generally speaking, the following steps should be taken in order to write a
new QMP command.

1. Define the command and any types it needs in the appropriate QAPI
   schema module.

2. Write the QMP command itself, which is a regular C function. Preferably,
   the command should be exported by some QEMU subsystem. But it can also be
   added to the monitor/qmp-cmds.c file

3. At this point the command can be tested under the QMP protocol

4. Write the HMP command equivalent. This is not required and should only be
   done if it does make sense to have the functionality in HMP. The HMP command
   is implemented in terms of the QMP command

The following sections will demonstrate each of the steps above. We will start
very simple and get more complex as we progress.


### Testing


For all the examples in the next sections, the test setup is the same and is
shown here.

First, QEMU should be started like this::

 # qemu-system-TARGET [...] \
     -chardev socket,id=qmp,port=4444,host=localhost,server=on \
     -mon chardev=qmp,mode=control,pretty=on

Then, in a different terminal::

 $ telnet localhost 4444
 Trying 127.0.0.1...
 Connected to localhost.
 Escape character is '^]'.
 {
     "QMP": {
         "version": {
             "qemu": {
                 "micro": 50,
                 "minor": 2,
                 "major": 8
             },
             "package": ...
         },
         "capabilities": [
             "oob"
         ]
     }
 }

The above output is the QMP server saying you're connected. The server is
actually in capabilities negotiation mode. To enter in command mode type::

 { "execute": "qmp_capabilities" }

Then the server should respond::

 {
     "return": {
     }
 }

Which is QMP's way of saying "the latest command executed OK and didn't return
any data". Now you're ready to enter the QMP example commands as explained in
the following sections.


### Writing a simple command: hello-world


That's the most simple QMP command that can be written. Usually, this kind of
command carries some meaningful action in QEMU but here it will just print
"Hello, world" to the standard output.

Our command will be called "hello-world". It takes no arguments, nor does it
return any data.

The first step is defining the command in the appropriate QAPI schema
module.  We pick module qapi/misc.json, and add the following line at
the bottom::

 ##
 # @hello-world:
 #
 # Since: 9.0
 ##
 { 'command': 'hello-world' }

The "command" keyword defines a new QMP command. It instructs QAPI to
generate any prototypes and the necessary code to marshal and unmarshal
protocol data.

The next step is to write the "hello-world" implementation. As explained
earlier, it's preferable for commands to live in QEMU subsystems. But
"hello-world" doesn't pertain to any, so we put its implementation in
monitor/qmp-cmds.c::

 void qmp_hello_world(Error **errp)
 {
     printf("Hello, world!\n");
 }

There are a few things to be noticed:

1. QMP command implementation functions must be prefixed with "qmp\_"
2. qmp_hello_world() returns void, this is in accordance with the fact that the
   command doesn't return any data
3. It takes an "Error \*\*" argument. This is required. Later we will see how to
   return errors and take additional arguments. The Error argument should not
   be touched if the command doesn't return errors
4. We won't add the function's prototype. That's automatically done by QAPI
5. Printing to the terminal is discouraged for QMP commands, we do it here
   because it's the easiest way to demonstrate a QMP command

You're done. Now build QEMU, run it as suggested in the "Testing" section,
and then type the following QMP command::

 { "execute": "hello-world" }

Then check the terminal running QEMU and look for the "Hello, world" string. If
you don't see it then something went wrong.


#### Arguments


Let's add arguments to our "hello-world" command.

The first change we have to do is to modify the command specification in the
schema file to the following::

 ##
 # @hello-world:
 #
 # @message: message to be printed (default: "Hello, world!")
 #
 # @times: how many times to print the message (default: 1)
 #
 # Since: 9.0
 ##
 { 'command': 'hello-world',
   'data': { '*message': 'str', '*times': 'int' } }

Notice the new 'data' member in the schema. It specifies an argument
'message' of QAPI type 'str', and an argument 'times' of QAPI type
'int'.  Also notice the asterisk, it's used to mark the argument
optional.

Now, let's update our C implementation in monitor/qmp-cmds.c::

 void qmp_hello_world(const char *message, bool has_times, int64_t times,
                      Error **errp)
 {
     if (!message) {
         message = "Hello, world";
     }
     if (!has_times) {
         times = 1;
     }

     for (int i = 0; i < times; i++) {
         printf("%s\n", message);
     }
 }

There are two important details to be noticed:

1. Optional arguments other than pointers are accompanied by a 'has\_'
   boolean, which is set if the optional argument is present or false
   otherwise
2. The C implementation signature must follow the schema's argument ordering,
   which is defined by the "data" member

Time to test our new version of the "hello-world" command. Build QEMU, run it as
described in the "Testing" section and then send two commands::

 { "execute": "hello-world" }
 {
     "return": {
     }
 }

 { "execute": "hello-world", "arguments": { "message": "We love QEMU" } }
 {
     "return": {
     }
 }

You should see "Hello, world" and "We love QEMU" in the terminal running QEMU,
if you don't see these strings, then something went wrong.


#### Errors


QMP commands should use the error interface exported by the error.h header
file. Basically, most errors are set by calling the error_setg() function.

Let's say we don't accept the string "message" to contain the word "love". If
it does contain it, we want the "hello-world" command to return an error::

 void qmp_hello_world(const char *message, Error **errp)
 {
     if (message) {
         if (strstr(message, "love")) {
             error_setg(errp, "the word 'love' is not allowed");
             return;
         }
         printf("%s\n", message);
     } else {
         printf("Hello, world\n");
     }
 }

The first argument to the error_setg() function is the Error pointer
to pointer, which is passed to all QMP functions. The next argument is a human
description of the error, this is a free-form printf-like string.

Let's test the example above. Build QEMU, run it as defined in the "Testing"
section, and then issue the following command::

 { "execute": "hello-world", "arguments": { "message": "all you need is love" } }

The QMP server's response should be::

 {
     "error": {
         "class": "GenericError",
         "desc": "the word 'love' is not allowed"
     }
 }

Note that error_setg() produces a "GenericError" class.  In general,
all QMP errors should have that error class.  There are two exceptions
to this rule:

 1. To support a management application's need to recognize a specific
    error for special handling

 2. Backward compatibility

If the failure you want to report falls into one of the two cases above,
use error_set() with a second argument of an ErrorClass value.


#### Implementing the HMP command


Now that the QMP command is in place, we can also make it available in the human
monitor (HMP).

With the introduction of QAPI, HMP commands make QMP calls. Most of the
time HMP commands are simple wrappers.

Here's the implementation of the "hello-world" HMP command::

 void hmp_hello_world(Monitor *mon, const QDict *qdict)
 {
     const char *message = qdict_get_try_str(qdict, "message");
     Error *err = NULL;

     qmp_hello_world(!!message, message, &err);
     if (hmp_handle_error(mon, err)) {
         return;
     }
 }

Add it to monitor/hmp-cmds.c.  Also, add its prototype to
include/monitor/hmp.h.

There are four important points to be noticed:

1. The "mon" and "qdict" arguments are mandatory for all HMP functions. The
   former is the monitor object. The latter is how the monitor passes
   arguments entered by the user to the command implementation
2. We chose not to support the "times" argument in HMP
3. hmp_hello_world() performs error checking. In this example we just call
   hmp_handle_error() which prints a message to the user, but we could do
   more, like taking different actions depending on the error
   qmp_hello_world() returns
4. The "err" variable must be initialized to NULL before performing the
   QMP call

There's one last step to actually make the command available to monitor users,
we should add it to the hmp-commands.hx file::

    {
        .name       = "hello-world",
        .args_type  = "message:s?",
        .params     = "hello-world [message]",
        .help       = "Print message to the standard output",
        .cmd        = hmp_hello_world,
    },

 SRST
 `hello_world` *message*
   Print message to the standard output
 ERST

To test this you have to open a user monitor and issue the "hello-world"
command. It might be instructive to check the command's documentation with
HMP's "help" command.

Please check the "-monitor" command-line option to know how to open a user
monitor.


### Writing more complex commands


A QMP command is capable of returning any data QAPI supports like integers,
strings, booleans, enumerations and user defined types.

In this section we will focus on user defined types. Please check the QAPI
documentation for information about the other types.


#### Modelling data in QAPI


For a QMP command that to be considered stable and supported long term,
there is a requirement returned data should be explicitly modelled
using fine-grained QAPI types. As a general guide, a caller of the QMP
command should never need to parse individual returned data fields. If
a field appears to need parsing, then it should be split into separate
fields corresponding to each distinct data item. This should be the
common case for any new QMP command that is intended to be used by
machines, as opposed to exclusively human operators.

Some QMP commands, however, are only intended as ad hoc debugging aids
for human operators. While they may return large amounts of formatted
data, it is not expected that machines will need to parse the result.
The overhead of defining a fine grained QAPI type for the data may not
be justified by the potential benefit. In such cases, it is permitted
to have a command return a simple string that contains formatted data,
however, it is mandatory for the command to be marked unstable.
This indicates that the command is not guaranteed to be long term
stable / liable to change in future and is not following QAPI design
best practices. An example where this approach is taken is the QMP
command "x-query-registers". This returns a formatted dump of the
architecture specific CPU state. The way the data is formatted varies
across QEMU targets, is liable to change over time, and is only
intended to be consumed as an opaque string by machines. Refer to the
`Writing a debugging aid returning unstructured text`_ section for
an illustration.

#### User Defined Types


For this example we will write the query-option-roms command, which
returns information about ROMs loaded into the option ROM space. For
more information about it, please check the "-option-rom" command-line
option.

For each option ROM, we want to return two pieces of information: the
ROM image's file name, and its bootindex, if any.  We need to create a
new QAPI type for that, as shown below::

 ##
 # @OptionRomInfo:
 #
 # @filename: option ROM image file name
 #
 # @bootindex: option ROM's bootindex
 #
 # Since: 9.0
 ##
 { 'struct': 'OptionRomInfo',
   'data': { 'filename': 'str', '*bootindex': 'int' } }

The "struct" keyword defines a new QAPI type. Its "data" member
contains the type's members. In this example our members are
"filename" and "bootindex". The latter is optional.

Now let's define the query-option-roms command::

 ##
 # @query-option-roms:
 #
 # Query information on ROMs loaded into the option ROM space.
 #
 # Returns: OptionRomInfo
 #
 # Since: 9.0
 ##
 { 'command': 'query-option-roms',
   'returns': ['OptionRomInfo'] }

Notice the "returns" keyword. As its name suggests, it's used to define the
data returned by a command.

Notice the syntax ['OptionRomInfo']". This should be read as "returns
a list of OptionRomInfo".

It's time to implement the qmp_query_option_roms() function.  Add to
monitor/qmp-cmds.c::

 OptionRomInfoList *qmp_query_option_roms(Error **errp)
 {
     OptionRomInfoList *info_list = NULL;
     OptionRomInfoList **tailp = &info_list;
     OptionRomInfo *info;

     for (int i = 0; i < nb_option_roms; i++) {
         info = g_malloc0(sizeof(*info));
         info->filename = g_strdup(option_rom[i].name);
         info->has_bootindex = option_rom[i].bootindex >= 0;
         if (info->has_bootindex) {
             info->bootindex = option_rom[i].bootindex;
         }
         QAPI_LIST_APPEND(tailp, info);
     }

     return info_list;
 }

There are a number of things to be noticed:

1. Type OptionRomInfo is automatically generated by the QAPI framework,
   its members correspond to the type's specification in the schema
   file
2. Type OptionRomInfoList is also generated.  It's a singly linked
   list.
3. As specified in the schema file, the function returns a
   OptionRomInfoList, and takes no arguments (besides the "errp" one,
   which is mandatory for all QMP functions)
4. The returned object is dynamically allocated
5. All strings are dynamically allocated. This is so because QAPI also
   generates a function to free its types and it cannot distinguish
   between dynamically or statically allocated strings
6. Remember that "bootindex" is optional? As a non-pointer optional
   member, it comes with a 'has_bootindex' member that needs to be set
   by the implementation, as shown above

Time to test the new command. Build QEMU, run it as described in the "Testing"
section and try this::

 { "execute": "query-option-rom" }
 {
     "return": [
         {
             "filename": "kvmvapic.bin"
         }
     ]
 }


#### The HMP command


Here's the HMP counterpart of the query-option-roms command::

 void hmp_info_option_roms(Monitor *mon, const QDict *qdict)
 {
     Error *err = NULL;
     OptionRomInfoList *info_list, *tail;
     OptionRomInfo *info;

     info_list = qmp_query_option_roms(&err);
     if (hmp_handle_error(mon, err)) {
         return;
     }

     for (tail = info_list; tail; tail = tail->next) {
         info = tail->value;
         monitor_printf(mon, "%s", info->filename);
         if (info->has_bootindex) {
             monitor_printf(mon, " %" PRId64, info->bootindex);
         }
         monitor_printf(mon, "\n");
     }

     qapi_free_OptionRomInfoList(info_list);
 }

It's important to notice that hmp_info_option_roms() calls
qapi_free_OptionRomInfoList() to free the data returned by
qmp_query_option_roms().  For user defined types, QAPI will generate a
qapi_free_QAPI_TYPE_NAME() function, and that's what you have to use to
free the types you define and qapi_free_QAPI_TYPE_NAMEList() for list
types (explained in the next section). If the QMP function returns a
string, then you should g_free() to free it.

Also note that hmp_info_option_roms() performs error handling. That's
not strictly required when you're sure the QMP function doesn't return
errors; you could instead pass it &error_abort then.

Another important detail is that HMP's "info" commands go into
hmp-commands-info.hx, not hmp-commands.hx. The entry for the "info
option-roms" follows::

     {
         .name       = "option-roms",
         .args_type  = "",
         .params     = "",
         .help       = "show roms",
         .cmd        = hmp_info_option_roms,
     },
 SRST
 `info option-roms`
   Show the option ROMs.
 ERST

To test this, run QEMU and type "info option-roms" in the user monitor.


### Writing a debugging aid returning unstructured text


As discussed in section `Modelling data in QAPI`_, it is required that
commands expecting machine usage be using fine-grained QAPI data types.
The exception to this rule applies when the command is solely intended
as a debugging aid and allows for returning unstructured text, such as
a query command that report aspects of QEMU's internal state that are
useful only to human operators.

In this example we will consider the existing QMP command
`x-query-roms` in qapi/machine.json.  It has no parameters and
returns a `HumanReadableText`::

 ##
 # @x-query-roms:
 #
 # Query information on the registered ROMS
 #
 # Features:
 #
 # @unstable: This command is meant for debugging.
 #
 # Returns: registered ROMs
 #
 # Since: 6.2
 ##
 { 'command': 'x-query-roms',
   'returns': 'HumanReadableText',
   'features': [ 'unstable' ] }

The `HumanReadableText` struct is defined in qapi/common.json as a
struct with a string member. It is intended to be used for all
commands that are returning unstructured text targeted at
humans. These should all have feature 'unstable'.  Note that the
feature's documentation states why the command is unstable.  We
commonly use a `x-` command name prefix to make lack of stability
obvious to human users.

#### Implementing the QMP command


The QMP implementation will typically involve creating a `GString`
object and printing formatted data into it, like this::

 HumanReadableText *qmp_x_query_roms(Error **errp)
 {
     g_autoptr(GString) buf = g_string_new("");
     Rom *rom;

     QTAILQ_FOREACH(rom, &roms, next) {
        g_string_append_printf("%s size=0x%06zx name=\"%s\"\n",
                               memory_region_name(rom->mr),
                               rom->romsize,
                               rom->name);
     }

     return human_readable_text_from_str(buf);
 }

The actual implementation emits more information.  You can find it in
hw/core/loader.c.


#### Implementing the HMP command


Now that the QMP command is in place, we can also make it available in
the human monitor (HMP) as shown in previous examples. The HMP
implementations will all look fairly similar, as all they need do is
invoke the QMP command and then print the resulting text or error
message. Here's an implementation of the "info roms" HMP command::

 void hmp_info_roms(Monitor *mon, const QDict *qdict)
 {
     Error err = NULL;
     g_autoptr(HumanReadableText) info = qmp_x_query_roms(&err);

     if (hmp_handle_error(mon, err)) {
         return;
     }
     monitor_puts(mon, info->human_readable_text);
 }

Also, you have to add the function's prototype to the hmp.h file.

There's one last step to actually make the command available to
monitor users, we should add it to the hmp-commands-info.hx file::

    {
        .name       = "roms",
        .args_type  = "",
        .params     = "",
        .help       = "show roms",
        .cmd        = hmp_info_roms,
    },

The case of writing a HMP info handler that calls a no-parameter QMP query
command is quite common. To simplify the implementation there is a general
purpose HMP info handler for this scenario. All that is required to expose
a no-parameter QMP query command via HMP is to declare it using the
'.cmd_info_hrt' field to point to the QMP handler, and leave the '.cmd'
field NULL::

    {
        .name         = "roms",
        .args_type    = "",
        .params       = "",
        .help         = "show roms",
        .cmd_info_hrt = qmp_x_query_roms,
    },

This is how the actual HMP command is done.

## 来源、版本与核验

- 上游：[docs/devel/writing-monitor-commands.rst](https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/writing-monitor-commands.rst)
- 作者：qemu/qemu 项目贡献者，原文内具体署名保留。
- 标签：v10.0.0；树标识：7c949c53e936aa3a658d84ab53bae5cadaa5d59c；获取日期：2026-10-25。
- 许可：GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/qemu/docs/devel/writing-monitor-commands.rst`；SHA-256：`aa88913df660d0d6509239df93faf4d10dc18a823124fd10bcb68db7bd3c7c24`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
