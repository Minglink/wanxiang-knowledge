---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-openssl-quic",
  "title": "OpenSSL：密码实现与接口 · openssl-quic（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "openssl-quic"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "ace19140f973996785286a555abf815fba02a95b42527fc1dc7a3207d0e61c3c",
  "generatedHash": "153af5cf12eef6c6922afe1ed3fbe37cf36a892e30b870b8ba34a8a066b168f9",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：openssl-quic - OpenSSL QUIC",
  "l1": "OpenSSL 3.2 and later features support for the QUIC transport protocol. You can use OpenSSL's QUIC capabilities for both client and server applications. This man page describes how to let applications use the QUIC protocol using the libssl API. The QUIC protocol maps to the standard SSL API. A QUIC connection is represented by an SSL object in the same way that a TLS connection is. Only minimal changes are needed to existing applications which use libssl API to bring QUIC protocol support in. QUIC clients can use OSSL_QUIC_client_method(3) or OSSL_QUIC_client_thread_method(3) with SSL_CTX_new(3). See below for more details about the difference between the two. For servers, there is only one option: SSL method OSSL_QUIC_server_method(3) with SSL_CTX_new(3). The remainder of this man page discusses, in order: Default stream mode versus mult",
  "questions": [
    "openssl-quic 如何用于密码实现与接口？",
    "openssl-quic 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-openssl-quic",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/openssl-quic.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · openssl-quic（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

openssl-quic - OpenSSL QUIC

## 技术正文

## NAME


openssl-quic - OpenSSL QUIC

## DESCRIPTION


OpenSSL 3.2 and later features support for the QUIC transport protocol.
You can use OpenSSL's QUIC capabilities for both client and server applications.
This man page describes how to let applications use the QUIC protocol using the
libssl API.

The QUIC protocol maps to the standard SSL API. A QUIC connection is represented
by an SSL object in the same way that a TLS connection is. Only minimal changes
are needed to existing applications which use libssl API to bring QUIC protocol
support in. QUIC clients can use OSSL_QUIC_client_method(3) or
OSSL_QUIC_client_thread_method(3) with SSL_CTX_new(3). See below for more
details about the difference between the two. For servers, there is only one
option: SSL method OSSL_QUIC_server_method(3) with SSL_CTX_new(3).

The remainder of this man page discusses, in order:


- 

Default stream mode versus multi-stream mode for clients;

- 

The changes to existing libssl APIs which are driven by QUIC-related
implementation requirements, which existing applications should bear in mind;

- 

Aspects which must be considered by existing applications when adopting QUIC,
including potential changes which may be needed.

- 

Recommended usage approaches for new applications.

- 

New, QUIC-specific APIs.


## CLIENT MODES OF OPERATION


When a client creates a QUIC connection, by default, it operates in default
stream mode, which is intended to provide compatibility with existing non-QUIC
application usage patterns. In this mode, the connection has a single stream
associated with it. Calls to SSL_read(3) and SSL_write(3) on the QUIC
connection SSL object read and write from that stream. Whether the stream is
client-initiated or server-initiated from a QUIC perspective depends on whether
SSL_read(3) or SSL_write(3) is called first.

Default stream mode is primarily for compatibility with existing applications.
For new applications utilizing QUIC, it's recommended to disable this mode and
instead adopt the multi-stream API. See the RECOMMENDATIONS FOR NEW APPLICATIONS
section for more details.

### Default Stream Mode


A QUIC client connection can be used in either default stream mode or
multi-stream mode. By default, a newly created QUIC connection SSL object uses
default stream mode.

In default stream mode, a stream is implicitly created and bound to the QUIC
connection SSL object; SSL_read(3) and SSL_write(3) calls to the QUIC
connection SSL object work by default and are mapped to that stream.

When default stream mode is used, any API function which can be called on a QUIC
stream SSL object can also be called on a QUIC connection SSL object, in which
case it affects the default stream bound to the connection.

The identity of a QUIC stream, including its stream ID, varies depending on
whether a stream is client-initiated or server-initiated. In default stream
mode, if a client application calls SSL_read(3) first before any call to
SSL_write(3) on the connection, it is assumed that the application protocol
is using a server-initiated stream, and the SSL_read(3) call will not
complete (either blocking, or failing appropriately if nonblocking mode is
configured) until the server initiates a stream. Conversely, if the client
application calls SSL_write(3) before any call to SSL_read(3) on the
connection, it is assumed that a client-initiated stream is to be used
and such a stream is created automatically.

Default stream mode is intended to aid compatibility with legacy applications.
New applications adopting QUIC should use multi-stream mode, described below,
and avoid use of the default stream functionality.

It is possible to use additional streams in default stream mode using
SSL_new_stream(3) and SSL_accept_stream(3); note that the default incoming
stream policy will need to be changed using SSL_set_incoming_stream_policy(3)
in order to use SSL_accept_stream(3) in this case. However, applications
using additional streams are strongly recommended to use multi-stream mode
instead.

Calling SSL_new_stream(3) or SSL_accept_stream(3) before a default stream
has been associated with the QUIC connection SSL object will inhibit future
creation of a default stream.

### Multi-Stream Mode


The recommended usage mode for new applications adopting QUIC is multi-stream
mode, in which no default stream is attached to the QUIC connection SSL object
and attempts to call SSL_read(3) and SSL_write(3) on the QUIC connection
SSL object fail. Instead, an application calls SSL_new_stream(3) or
SSL_accept_stream(3) to create individual stream SSL objects for sending and
receiving application data using SSL_read(3) and SSL_write(3).

To use multi-stream mode, call SSL_set_default_stream_mode(3) with an
argument of **SSL_DEFAULT_STREAM_MODE_NONE**; this function must be called prior
to initiating the connection. The default stream mode cannot be changed after
initiating a connection.

When multi-stream mode is used, meaning that no default stream is associated
with the connection, calls to API functions which are defined as operating on a
QUIC stream fail if called on the QUIC connection SSL object. For example, calls
such as SSL_write(3) or SSL_get_stream_id(3) will fail.

## CHANGES TO EXISTING APIS


Most SSL APIs, such as SSL_read(3) and SSL_write(3), function as they do
for TLS connections and do not have changed semantics, with some exceptions. The
changes to the semantics of existing APIs are as follows:


- 

Since QUIC uses UDP, SSL_set_bio(3), SSL_set0_rbio(3) and
SSL_set0_wbio(3) function as before, but must now receive a BIO with datagram
semantics. There are broadly four options for applications to use as a network
BIO:


- 

BIO_s_datagram(3), recommended for most applications, replaces
BIO_s_socket(3) and provides a UDP socket.

- 

BIO_s_dgram_pair(3) provides BIO pair-like functionality but with datagram
semantics, and is recommended for existing applications which use a BIO pair or
memory BIO to manage libssl's communication with the network.

- 

BIO_s_dgram_mem(3) provides a simple memory BIO-like interface but with
datagram semantics. Unlike BIO_s_dgram_pair(3), it is unidirectional.

- 

An application may also choose to implement a custom BIO. The new
BIO_sendmmsg(3) and BIO_recvmmsg(3) APIs must be supported.


- 

SSL_set_fd(3), SSL_set_rfd(3) and SSL_set_wfd(3) traditionally
instantiate a BIO_s_socket(3). For QUIC, these functions instead instantiate
a BIO_s_datagram(3). This is equivalent to instantiating a
BIO_s_datagram(3) and using SSL_set0_rbio(3) and SSL_set0_wbio(3).

- 

Traditionally, whether the application-level I/O APIs (such as SSL_read(3)
and SSL_write(3) operated in a blocking fashion was directly correlated with
whether the underlying network socket was configured in a blocking fashion. This
is no longer the case; applications must explicitly configure the desired
application-level blocking mode using SSL_set_blocking_mode(3). See
SSL_set_blocking_mode(3) for details.

- 

Network-level I/O must always be performed in a nonblocking manner. The
application can still enjoy blocking semantics for calls to application-level
I/O functions such as SSL_read(3) and SSL_write(3), but the underlying
network BIO provided to QUIC (such as a BIO_s_datagram(3)) must be configured
in nonblocking mode. For application-level blocking functionality, see
SSL_set_blocking_mode(3).

- 

BIO_new_ssl_connect(3) has been changed to automatically use a
BIO_s_datagram(3) when used with QUIC, therefore applications which use this
do not need to change the BIO they use.

- 

BIO_new_buffer_ssl_connect(3) cannot be used with QUIC and applications must
change to use BIO_new_ssl_connect(3) instead.

- 

SSL_shutdown(3) has significant changes in relation to how QUIC connections
must be shut down. In particular, applications should be advised that the full
RFC-conformant QUIC shutdown process may take an extended amount of time. This
may not be suitable for short-lived processes which should exit immediately
after their usage of a QUIC connection is completed. A rapid shutdown mode
is available for such applications. For details, see SSL_shutdown(3).

- 

SSL_want(3), SSL_want_read(3) and SSL_want_write(3) no longer reflect
the I/O state of the network BIO passed to the QUIC SSL object, but instead
reflect the flow control state of the QUIC stream associated with the SSL
object.

When used in nonblocking mode, **SSL_ERROR_WANT_READ** indicates that the
receive part of a QUIC stream does not currently have any more data available to
be read, and **SSL_ERROR_WANT_WRITE** indicates that the stream's internal buffer
is full.

To determine if the QUIC implementation currently wishes to be informed of
incoming network datagrams, use the new function SSL_net_read_desired(3);
likewise, to determine if the QUIC implementation currently wishes to be
informed when it is possible to transmit network datagrams, use the new function
SSL_net_write_desired(3). Only applications which wish to manage their own event
loops need to use these functions; see **APPLICATION-DRIVEN EVENT LOOPS** for
further discussion.

- 

The use of ALPN is mandatory when using QUIC. Attempts to connect without
configuring ALPN will fail. For information on how to configure ALPN, see
SSL_set_alpn_protos(3).

- 

Whether QUIC operates in a client or server mode is determined by the
**SSL_METHOD** used, rather than by calls to SSL_set_connect_state(3) or
SSL_set_accept_state(3). It is not necessary to call either of
SSL_set_connect_state(3) or SSL_set_accept_state(3) before connecting, but
if either of these are called, the function called must be congruent with the
**SSL_METHOD** being used.

- 

The SSL_set_min_proto_version(3) and SSL_set_max_proto_version(3) APIs are
not used and the values passed to them are ignored, as OpenSSL QUIC currently
always uses TLS 1.3.

- 

The following libssl functionality is not available when used with QUIC.


- 

Async functionality

- 

**SSL_MODE_AUTO_RETRY**

- 

Record Padding and Fragmentation (SSL_set_block_padding(3), etc.)

- 

SSL_stateless(3) support

- 

SRTP functionality

- 

TLSv1.3 Early Data

- 

TLS Next Protocol Negotiation cannot be used and is superseded by ALPN, which
must be used instead. The use of ALPN is mandatory with QUIC.

- 

Post-Handshake Client Authentication is not available as QUIC prohibits its use.

- 

QUIC requires the use of TLSv1.3 or later, therefore functionality only relevant
to older TLS versions is not available.

- 

Some cipher suites which are generally available for TLSv1.3 are not available
for QUIC, such as **TLS_AES_128_CCM_8_SHA256**. Your application may need to
adjust the list of acceptable cipher suites it passes to libssl.

- 

CCM mode is not currently supported.


The following libssl functionality is also not available when used with QUIC,
but calls to the relevant functions are treated as no-ops:


- 

Readahead (SSL_set_read_ahead(3), etc.)



## CONSIDERATIONS FOR EXISTING APPLICATIONS


Existing applications seeking to adopt QUIC should apply the following list to
determine what changes they will need to make:


- 

A client application wishing to use QUIC must use OSSL_QUIC_client_method(3)
or OSSL_QUIC_client_thread_method(3) as its SSL method. For more information
on the differences between these two methods, see
**THREAD ASSISTED MODE**.

- 

A server application wishing to use QUIC must use OSSL_QUIC_server_method(3). 
The server can then accept new connections with SSL_accept_connection(3).

- 

Determine how to provide QUIC with network access. Determine which of the below
apply for your application:


- 

Your application uses BIO_s_socket(3) to construct a BIO which is passed to
the SSL object to provide it with network access.

Changes needed: Change your application to use BIO_s_datagram(3) instead when
using QUIC. The socket must be configured in nonblocking mode. You may or may
not need to use SSL_set1_initial_peer_addr(3) to set the initial peer
address; see the **QUIC-SPECIFIC APIS** section for details.

- 

Your application uses BIO_new_ssl_connect(3) to
construct a BIO which is passed to the SSL object to provide it with network
access.

Changes needed: No changes needed. Use of QUIC is detected automatically and a
datagram socket is created instead of a normal TCP socket.

- 

Your application uses any other I/O strategy in this list but combines it with a
BIO_f_buffer(3), for example using BIO_push(3).

Changes needed: Disable the usage of BIO_f_buffer(3) when using QUIC. Usage
of such a buffer is incompatible with QUIC as QUIC requires datagram semantics
in its interaction with the network.

- 

Your application uses a BIO pair to cause the SSL object to read and write
network traffic to a memory buffer. Your application manages the transmission
and reception of buffered data itself in a way unknown to libssl.

Changes needed: Switch from using a conventional BIO pair to using
BIO_s_dgram_pair(3) instead, which has the necessary datagram semantics. You
will need to modify your application to transmit and receive using a UDP socket
and to use datagram semantics when interacting with the BIO_s_dgram_pair(3)
instance.

- 

Your application uses a custom BIO method to provide the SSL object with network
access.

Changes needed: The custom BIO must be re-architected to have datagram
semantics. BIO_sendmmsg(3) and BIO_recvmmsg(3) must be implemented. These
calls must operate in a nonblocking fashion. Optionally, implement the
BIO_get_rpoll_descriptor(3) and BIO_get_wpoll_descriptor(3) methods if
desired. Implementing these methods is required if blocking semantics at the SSL
API level are desired.


- 

An application must explicitly configure whether it wishes to use the SSL APIs
in blocking mode or not. Traditionally, an SSL object has automatically operated
in blocking or nonblocking mode based on whether the underlying network BIO
operates in blocking or nonblocking mode. QUIC requires the use of a
nonblocking network BIO, therefore the blocking mode at the application level
can be explicitly configured by the application using the new
SSL_set_blocking_mode(3) API. The default mode is blocking. If an application
wishes to use the SSL object APIs at application level in a nonblocking manner,
it must add a call to SSL_set_blocking_mode(3) to disable blocking mode.

- 

If your client application does not choose to use thread assisted mode, it must
ensure that it calls an I/O function on the SSL object (for example,
SSL_read(3) or SSL_write(3)), or the new function SSL_handle_events(3),
regularly. If the SSL object is used in blocking mode, an ongoing blocking call
to an I/O function satisfies this requirement. This is required to ensure that
timer events required by QUIC are handled in a timely fashion.

Most applications will service the SSL object by calling SSL_read(3) or
SSL_write(3) regularly. If an application does not do this, it should ensure
that SSL_handle_events(3) is called regularly.

SSL_get_event_timeout(3) can be used to determine when
SSL_handle_events(3) must next be called.

If the SSL object is being used with an underlying network BIO which is pollable
(such as BIO_s_datagram(3)), the application can use
SSL_get_rpoll_descriptor(3), SSL_get_wpoll_descriptor(3) to obtain
resources which can be used to determine when SSL_handle_events(3) should be
called due to network I/O.

Client applications which use thread assisted mode do not need to be concerned
with this requirement, as the QUIC implementation ensures timeout events
are handled in a timely manner. See **THREAD ASSISTED MODE** for details.

- 

Ensure that your usage of SSL_want(3), SSL_want_read(3) and
SSL_want_write(3) reflects the API changes described in B<CHANGES TO EXISTING
APIS>. In particular, you should use these APIs to determine the ability of a
QUIC stream to receive or provide application data, not to to determine if
network I/O is required.

- 

Evaluate your application's use of SSL_shutdown(3) in light of the changes
discussed in **CHANGES TO EXISTING APIS**. Depending on whether your application
wishes to prioritise RFC conformance or rapid shutdown, consider using the new
SSL_shutdown_ex(3) API instead. See **QUIC-SPECIFIC APIS** for details.


## RECOMMENDED USAGE IN NEW APPLICATIONS


The recommended usage in new applications varies depending on three independent
design decisions:


- 

Whether the application will use blocking or nonblocking I/O at the application
level (configured using SSL_set_blocking_mode(3)).

If the application does nonblocking I/O at the application level it can choose
to manage its own polling and event loop; see **APPLICATION-DRIVEN EVENT LOOPS**.

- 

Whether the application intends to give the QUIC implementation direct access to
a network socket (e.g. via BIO_s_datagram(3)) or whether it intends to buffer
transmitted and received datagrams via a BIO_s_dgram_pair(3) or custom BIO.

The former is preferred where possible as it reduces latency to the network,
which enables QUIC to achieve higher performance and more accurate connection
round trip time (RTT) estimation.

- 

Whether thread assisted mode will be used (see **THREAD ASSISTED MODE**).


Simple demos for QUIC usage under these various scenarios can be found at
https://github.com/openssl/openssl/tree/master/doc/designs/ddd.

Applications which wish to implement QUIC-specific protocols should be aware of
the APIs listed under **QUIC-SPECIFIC APIS** which provide access to
QUIC-specific functionality. For example, SSL_stream_conclude(3) can be used
to indicate the end of the sending part of a stream, and SSL_shutdown_ex(3)
can be used to provide a QUIC application error code when closing a connection.

Regardless of the design decisions chosen above, it is recommended that new
applications avoid use of the default stream mode and use the multi-stream API
by calling SSL_set_default_stream_mode(3); see the MODES OF OPERATION section
for details.

## QUIC-SPECIFIC APIS


This section details new APIs which are directly or indirectly related to QUIC.
For details on the operation of each API, see the referenced man pages.

The following SSL APIs are new but relevant to both QUIC and DTLS:


- SSL_get_event_timeout(3)

Determines when the QUIC implementation should next be woken up via a call to
SSL_handle_events(3) (or another I/O function such as SSL_read(3) or
SSL_write(3)), if ever.

This can also be used with DTLS and supersedes DTLSv1_get_timeout(3) for new
usage.

- SSL_handle_events(3)

This is a non-specific I/O operation which makes a best effort attempt to
perform any pending I/O or timeout processing. It can be used to advance the
QUIC state machine by processing incoming network traffic, generating outgoing
network traffic and handling any expired timeout events. Most other I/O
functions on an SSL object, such as SSL_read(3) and SSL_write(3),
implicitly perform event handling on the SSL object, so calling this function is
only needed if no other I/O function is to be called.

This can also be used with DTLS and supersedes DTLSv1_handle_timeout(3) for
new usage.


The following SSL APIs are specific to QUIC:


- SSL_new_listener(3)

Creates a listener SSL object, which differs from an ordinary SSL object in that
it is used to provide an abstraction for the acceptance of network connections
in a protocol-agnostic manner.

Currently, listener SSL objects are only supported for QUIC server usage or
client-only usage. The listener interface may expand to support additional
protocols in the future.

- SSL_new_listener_from(3)

Creates a listener SSL object which is subordinate to a QUIC domain SSL object
`ssl`. See SSL_new_domain(3) and openssl-quic-concurrency(7) for details
on QUIC domain SSL objects.

- SSL_is_listener(3)

Returns 1 if and only if an SSL object is a listener SSL object.

- SSL_get0_listener(3)

Returns an SSL object pointer (potentially to the same object on which it is
called) or NULL.

- SSL_listen(3)

Begin listening after a listener has been created. It is ordinarily not needed
to call this because it will be called automatically on the first call to
SSL_accept_connection(3). 

- SSL_accept_connection(3)

Accepts a new incoming connection for a listner SSL object. A new SSL object
representing the accepted connection is created and returned on success. If no
incoming connection is available and the listener SSL object is configured in
nonblocking mode, NULL is returned.

- SSL_get_accept_connection_queue_len(3)

Returns an informational value listing the number of connections waiting to be
popped from the queue via calls to SSL_accept_connection().

- SSL_new_from_listener(3)

Creates a client connection under a given listener SSL object. For QUIC, it is
also possible to use SSL_new_from_listener() in conjunction with a listener
which does accept incoming connections (i.e., which was not created using
**SSL_LISTENER_FLAG_NO_ACCEPT**), leading to a UDP network endpoint which has
both incoming and outgoing connections.

- SSL_new_domain(3)

Creates a new QUIC event domain, represented as an SSL object. This is known as
a QUIC domain SSL object. The concept of a QUIC event domain is discussed in
detail in openssl-quic-concurrency(7).

- SSL_is_domain(3)

Returns 1 if an SSL object is a QUIC domain SSL object.

- SSL_get0_domain(3)

SSL_get0_domain() obtains a pointer to the QUIC domain SSL object in an SSL
object hierarchy (if any).

- SSL_set_blocking_mode(3), SSL_get_blocking_mode(3)

Configures whether blocking semantics are used at the application level. This
determines whether calls to functions such as SSL_read(3) and SSL_write(3)
will block.

- SSL_get_rpoll_descriptor(3), SSL_get_wpoll_descriptor(3)

These functions facilitate operation in nonblocking mode.

When an SSL object is being used with an underlying network read BIO which
supports polling, SSL_get_rpoll_descriptor(3) outputs an OS resource which
can be used to synchronise on network readability events which should result in
a call to SSL_handle_events(3). SSL_get_wpoll_descriptor(3) works in an
analogous fashion for the underlying network write BIO.

The poll descriptors provided by these functions should be used only when
SSL_net_read_desired(3) and SSL_net_write_desired(3) return 1,
respectively.

- SSL_net_read_desired(3), SSL_net_write_desired(3)

These functions facilitate operation in nonblocking mode and are used in
conjunction with SSL_get_rpoll_descriptor(3) and
SSL_get_wpoll_descriptor(3) respectively. They determine whether the
respective poll descriptor is currently relevant for the purposes of polling.

- SSL_set1_initial_peer_addr(3)

This function can be used to set the initial peer address for an outgoing QUIC
connection. This function must be used in the general case when creating an
outgoing QUIC connection; however, the correct initial peer address can be
autodetected in some cases. See SSL_set1_initial_peer_addr(3) for details.

- SSL_shutdown_ex(3)

This augments SSL_shutdown(3) by allowing an application error code to be
specified. It also allows an application to decide how quickly it wants a
shutdown to be performed, potentially by trading off strict RFC compliance.

- SSL_stream_conclude(3)

This allows an application to indicate the normal end of the sending part of a
QUIC stream. This corresponds to the FIN flag in the QUIC RFC. The receiving
part of a stream remains usable.

- SSL_stream_reset(3)

This allows an application to indicate the non-normal termination of the sending
part of a stream. This corresponds to the RESET_STREAM frame in the QUIC RFC.

- SSL_get_stream_write_state(3) and SSL_get_stream_read_state(3)

This allows an application to determine the current stream states for the
sending and receiving parts of a stream respectively.

- SSL_get_stream_write_error_code(3) and SSL_get_stream_read_error_code(3)

This allows an application to determine the application error code which was
signalled by a peer which has performed a non-normal stream termination of the
respective sending or receiving part of a stream, if any.

- SSL_get_conn_close_info(3)

This allows an application to determine the error code which was signalled when
the local or remote endpoint terminated the QUIC connection.

- SSL_get0_connection(3)

Gets the QUIC connection SSL object from a QUIC stream SSL object.

- SSL_is_connection(3)

Returns 1 if an SSL object is not a QUIC stream SSL object.

- SSL_get_stream_type(3)

Provides information on the kind of QUIC stream which is attached
to the SSL object.

- SSL_get_stream_id(3)

Returns the QUIC stream ID which the QUIC protocol has associated with a QUIC
stream.

- SSL_new_stream(3)

Creates a new QUIC stream SSL object representing a new, locally-initiated QUIC
stream.

- SSL_accept_stream(3)

Potentially yields a new QUIC stream SSL object representing a new
remotely-initiated QUIC stream, blocking until one is available if the
connection is configured to do so.

- SSL_get_accept_stream_queue_len(3)

Provides information on the number of pending remotely-initiated streams.

- SSL_set_incoming_stream_policy(3)

Configures how incoming, remotely-initiated streams are handled. The incoming
stream policy can be used to automatically reject streams created by the peer,
or allow them to be handled using SSL_accept_stream(3).

- SSL_set_default_stream_mode(3)

Used to configure or disable default stream mode; see the MODES OF OPERATION
section for details.


The following BIO APIs are not specific to QUIC but have been added to
facilitate QUIC-specific requirements and are closely associated with its use:


- BIO_s_dgram_pair(3)

This is a new BIO method which is similar to a conventional BIO pair but
provides datagram semantics.

- BIO_get_rpoll_descriptor(3), BIO_get_wpoll_descriptor(3)

This is a new BIO API which allows a BIO to expose a poll descriptor. This API
is used to implement the corresponding SSL APIs SSL_get_rpoll_descriptor(3)
and SSL_get_wpoll_descriptor(3).

- BIO_sendmmsg(3), BIO_recvmmsg(3)

This is a new BIO API which can be implemented by BIOs which implement datagram
semantics. It is implemented by BIO_s_datagram(3) and BIO_s_dgram_pair(3).
It is used by the QUIC implementation to send and receive UDP datagrams.

- BIO_dgram_set_no_trunc(3), BIO_dgram_get_no_trunc(3)

By default, BIO_s_dgram_pair(3) has semantics comparable to those of Berkeley
sockets being used with datagram semantics. This allows an alternative mode
to be enabled in which datagrams will not be silently truncated if they are
too large.

- BIO_dgram_set_caps(3), BIO_dgram_get_caps(3)

These functions are used to allow the user of one end of a
BIO_s_dgram_pair(3) to indicate its capabilities to the other end of a
BIO_s_dgram_pair(3). In particular, this allows an application to inform the
QUIC implementation of whether it is prepared to handle local and/or peer
addresses in transmitted datagrams and to provide the applicable information in
received datagrams.

- BIO_dgram_get_local_addr_cap(3), BIO_dgram_set_local_addr_enable(3),
BIO_dgram_get_local_addr_enable(3)

Local addressing support refers to the ability of a BIO with datagram semantics
to allow a source address to be specified on transmission and to report the
destination address on reception. These functions can be used to determine if a
BIO can support local addressing and to enable local addressing support if it
can.

- BIO_err_is_non_fatal(3)

This is used to determine if an error while calling BIO_sendmmsg(3) or
BIO_recvmmsg(3) is ephemeral in nature, such as "would block" errors.


## THREAD ASSISTED MODE


The optional thread assisted mode for clients can be used with
OSSL_QUIC_client_thread_method(3). In this mode, a background thread is
created automatically. The OpenSSL QUIC implementation then takes responsibility
for ensuring that timeout events are handled on a timely basis even if no SSL
I/O function such as SSL_read(3) or SSL_write(3) is called by the
application for a long time.

All necessary locking is handled automatically internally, but the thread safety
guarantees for the public SSL API are unchanged. Therefore, an application must
still do its own locking if it wishes to make concurrent use of the public SSL
APIs.

Because this method relies on threads, it is not available on platforms where
threading support is not available or not supported by OpenSSL. However, it
does provide the simplest mode of usage for an application.

The implementation may or may not use a common thread or thread pool to service
multiple SSL objects in the same **SSL_CTX**.

## APPLICATION-DRIVEN EVENT LOOPS


OpenSSL's QUIC implementation is designed to facilitate applications which wish
to use the SSL APIs in a blocking fashion, but is also designed to facilitate
applications which wish to use the SSL APIs in a nonblocking fashion and manage
their own event loops and polling directly. This is useful when it is desirable
to host OpenSSL's QUIC implementation on top of an application's existing
nonblocking I/O infrastructure.

This is supported via the concept of poll descriptors; see
BIO_get_rpoll_descriptor(3) for details. Broadly, a **BIO_POLL_DESCRIPTOR** is
a structure which expresses some kind of OS resource which can be used to
synchronise on I/O events. The QUIC implementation provides a
**BIO_POLL_DESCRIPTOR** based on the poll descriptor provided by the underlying
network BIO. This is typically an OS socket handle, though custom BIOs could
choose to implement their own custom poll descriptor format.

Broadly, an application which wishes to manage its own event loop should
interact with the SSL object as follows:


- 

It should provide read and write BIOs with nonblocking datagram semantics to
the SSL object using SSL_set0_rbio(3) and SSL_set0_wbio(3). This could be
a BIO abstracting a network socket such as BIO_s_datagram(3), or a BIO
abstracting some kind of memory buffer such as BIO_s_dgram_pair(3). Use of a
custom BIO is also possible.

- 

It should configure the SSL object into nonblocking mode by calling
SSL_set_blocking_mode(3).

- 

It should configure the SSL object as desired, set an initial peer as needed
using SSL_set1_initial_peer_addr(3), and trigger the connection process by
calling SSL_connect(3).

- 

If the network read and write BIOs provided were pollable (for example,
a BIO_s_datagram(3), or a custom BIO which implements
BIO_get_rpoll_descriptor(3) and BIO_get_wpoll_descriptor(3)), it should
perform the following steps repeatedly:


- 

The application should call SSL_get_rpoll_descriptor(3) and
SSL_get_wpoll_descriptor(3) to identify OS resources which can be used for
synchronisation.

- 

It should call SSL_net_read_desired(3) and SSL_net_write_desired(3) to determine
whether the QUIC implementation is currently interested in readability and
writability events on the underlying network BIO which was provided, and call
SSL_get_event_timeout(3) to determine if any timeout event will become
applicable in the future.

- 

It should wait until one of the following events occurs:


- 

The poll descriptor returned by SSL_get_rpoll_descriptor(3) becomes readable
(if SSL_net_read_desired(3) returned 1);

- 

The poll descriptor returned by SSL_get_wpoll_descriptor(3) becomes writable
(if SSL_net_write_desired(3) returned 1);

- 

The timeout returned by SSL_get_event_timeout(3) (if any) expires.


Once any of these events occurs, SSL_handle_events(3) should be called.


- 

If the network read and write BIOs provided were not pollable (for example, in
the case of BIO_s_dgram_pair(3)), the application is responsible for managing
and synchronising network I/O. It should call SSL_handle_events(3) after it
writes data to a BIO_s_dgram_pair(3) or otherwise takes action so that the
QUIC implementation can read new datagrams via a call to BIO_recvmmsg(3) on
the underlying network BIO. The QUIC implementation may output datagrams via a
call to BIO_sendmmsg(3) and the application is responsible for ensuring these
are transmitted.

The application must call SSL_get_event_timeout(3) after every call to
SSL_handle_events(3) (or another I/O function on the SSL object), and ensure
that a call to SSL_handle_events(3) is performed after the specified timeout
(if any).


## SEE ALSO


SSL_handle_events(3), SSL_get_event_timeout(3),
SSL_net_read_desired(3), SSL_net_write_desired(3),
SSL_get_rpoll_descriptor(3), SSL_get_wpoll_descriptor(3),
SSL_set_blocking_mode(3), SSL_shutdown_ex(3),
SSL_set1_initial_peer_addr(3), SSL_stream_conclude(3),
SSL_stream_reset(3), SSL_get_stream_read_state(3),
SSL_get_stream_read_error_code(3), SSL_get_conn_close_info(3),
SSL_get0_connection(3), SSL_get_stream_type(3), SSL_get_stream_id(3),
SSL_new_stream(3), SSL_accept_stream(3),
SSL_set_incoming_stream_policy(3), SSL_set_default_stream_mode(3),
SSL_new_listener(3), SSL_new_listener_from(3), SSL_is_listener(3),
SSL_get0_listener(3), SSL_listen(3), SSL_accept_connection(3),
SSL_get_accept_connection_queue_len(3), SSL_new_domain(3),
SSL_is_domain(3), SSL_get0_domain(3)

## COPYRIGHT


Copyright 2022-2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/openssl-quic.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/openssl-quic.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/openssl-quic.pod`；SHA-256：`ace19140f973996785286a555abf815fba02a95b42527fc1dc7a3207d0e61c3c`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
