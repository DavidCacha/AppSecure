"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WSCloseCode = void 0;
// Borrowed from https://github.com/strong-roots-capital/websocket-close-codes
var WSCloseCode;
(function (WSCloseCode) {
    /**
     * Normal closure; the connection successfully completed whatever
     * purpose for which it was created.
     */
    WSCloseCode[WSCloseCode["NormalClosure"] = 1000] = "NormalClosure";
    /**
     * The endpoint is going away, either because of a server failure
     * or because the browser is navigating away from the page that
     * opened the connection.
     */
    WSCloseCode[WSCloseCode["GoingAway"] = 1001] = "GoingAway";
    /**
     * The endpoint is terminating the connection due to a protocol
     * error.
     */
    WSCloseCode[WSCloseCode["ProtocolError"] = 1002] = "ProtocolError";
    /**
     * The connection is being terminated because the endpoint
     * received data of a type it cannot accept (for example, a
     * text-only endpoint received binary data).
     */
    WSCloseCode[WSCloseCode["UnsupportedData"] = 1003] = "UnsupportedData";
    /**
     * (Reserved.)  Indicates that no status code was provided even
     * though one was expected.
     */
    WSCloseCode[WSCloseCode["NoStatusRecvd"] = 1005] = "NoStatusRecvd";
    /**
     * (Reserved.) Used to indicate that a connection was closed
     * abnormally (that is, with no close frame being sent) when a
     * status code is expected.
     */
    WSCloseCode[WSCloseCode["AbnormalClosure"] = 1006] = "AbnormalClosure";
    /**
     * The endpoint is terminating the connection because a message
     * was received that contained inconsistent data (e.g., non-UTF-8
     * data within a text message).
     */
    WSCloseCode[WSCloseCode["InvalidFramePayloadData"] = 1007] = "InvalidFramePayloadData";
    /**
     * The endpoint is terminating the connection because it received
     * a message that violates its policy. This is a generic status
     * code, used when codes 1003 and 1009 are not suitable.
     */
    WSCloseCode[WSCloseCode["PolicyViolation"] = 1008] = "PolicyViolation";
    /**
     * The endpoint is terminating the connection because a data frame
     * was received that is too large.
     */
    WSCloseCode[WSCloseCode["MessageTooBig"] = 1009] = "MessageTooBig";
    /**
     * The client is terminating the connection because it expected
     * the server to negotiate one or more extension, but the server
     * didn't.
     */
    WSCloseCode[WSCloseCode["MissingExtension"] = 1010] = "MissingExtension";
    /**
     * The server is terminating the connection because it encountered
     * an unexpected condition that prevented it from fulfilling the
     * request.
     */
    WSCloseCode[WSCloseCode["InternalError"] = 1011] = "InternalError";
    /**
     * The server is terminating the connection because it is
     * restarting. [Ref]
     */
    WSCloseCode[WSCloseCode["ServiceRestart"] = 1012] = "ServiceRestart";
    /**
     * The server is terminating the connection due to a temporary
     * condition, e.g. it is overloaded and is casting off some of its
     * clients.
     */
    WSCloseCode[WSCloseCode["TryAgainLater"] = 1013] = "TryAgainLater";
    /**
     * The server was acting as a gateway or proxy and received an
     * invalid response from the upstream server. This is similar to
     * 502 HTTP Status Code.
     */
    WSCloseCode[WSCloseCode["BadGateway"] = 1014] = "BadGateway";
    /**
     * (Reserved.) Indicates that the connection was closed due to a
     * failure to perform a TLS handshake (e.g., the server
     * certificate can't be verified).
     */
    WSCloseCode[WSCloseCode["TLSHandshake"] = 1015] = "TLSHandshake";
})(WSCloseCode || (exports.WSCloseCode = WSCloseCode = {}));
//# sourceMappingURL=WSCloseCode.js.map