"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// plugins/public/node_modules/unicode-substring/index.js
var require_unicode_substring = __commonJS({
  "plugins/public/node_modules/unicode-substring/index.js"(exports, module2) {
    function charAt(string, index) {
      var first = string.charCodeAt(index);
      var second;
      if (first >= 55296 && first <= 56319 && string.length > index + 1) {
        second = string.charCodeAt(index + 1);
        if (second >= 56320 && second <= 57343) {
          return string.substring(index, index + 2);
        }
      }
      return string[index];
    }
    function slice(string, start, end) {
      var accumulator = "";
      var character;
      var stringIndex = 0;
      var unicodeIndex = 0;
      var length = string.length;
      while (stringIndex < length) {
        character = charAt(string, stringIndex);
        if (unicodeIndex >= start && unicodeIndex < end) {
          accumulator += character;
        }
        stringIndex += character.length;
        unicodeIndex += 1;
      }
      return accumulator;
    }
    function toNumber(value, fallback) {
      if (value === void 0) {
        return fallback;
      } else {
        return Number(value);
      }
    }
    module2.exports = function(string, start, end) {
      var realStart = toNumber(start, 0);
      var realEnd = toNumber(end, string.length);
      if (realEnd == realStart) {
        return "";
      } else if (realEnd > realStart) {
        return slice(string, realStart, realEnd);
      } else {
        return slice(string, realEnd, realStart);
      }
    };
  }
});

// plugins/public/crash_reporter/index.tsx
var crash_reporter_exports = {};
__export(crash_reporter_exports, {
  Component: () => Crashes,
  devicePlugin: () => devicePlugin
});
module.exports = __toCommonJS(crash_reporter_exports);
var import_flipper_plugin2 = require("flipper-plugin");

// plugins/public/crash_reporter/crash-utils.tsx
var import_unicode_substring = __toESM(require_unicode_substring());
var UNKNOWN_CRASH_REASON = "Unknown";
function truncate(baseString, numOfChars) {
  if (baseString.length <= numOfChars) {
    return baseString;
  }
  const truncated_string = (0, import_unicode_substring.default)(baseString, 0, numOfChars - 1);
  return `${truncated_string}\u2026`;
}
function trimCallStackIfPossible(callstack) {
  const regex = /Application Specific Information:/;
  const query = regex.exec(callstack);
  return query ? callstack.substring(0, query.index) : callstack;
}
function showCrashNotification(client, crash) {
  const ignore = !crash.name && !crash.reason;
  const unknownCrashCause = crash.reason === UNKNOWN_CRASH_REASON;
  if (ignore || unknownCrashCause) {
    console.warn("Ignored the notification for the crash", crash);
    return;
  }
  let title = `CRASH: ${truncate(crash.name || crash.reason, 50)}`;
  title = `${crash.name == crash.reason ? title : `${title}Reason: ${truncate(crash.reason, 50)}`}`;
  const callstack = crash.callstack ? trimCallStackIfPossible(crash.callstack) : "No callstack available";
  const msg = `Callstack: ${truncate(callstack, 200)}`;
  client.showNotification({
    id: crash.notificationID,
    message: msg,
    severity: "error",
    title,
    action: crash.notificationID,
    category: crash.reason || "Unknown reason"
  });
}

// plugins/public/crash_reporter/Crashes.tsx
var import_react = __toESM(require("react"));
var import_antd = require("antd");
var import_icons = require("@ant-design/icons");
var import_flipper_plugin = require("flipper-plugin");
var { Text } = import_antd.Typography;
function Crashes() {
  const plugin = (0, import_flipper_plugin.usePlugin)(devicePlugin);
  const crashes = (0, import_flipper_plugin.useValue)(plugin.crashes);
  const selectedCrashId = (0, import_flipper_plugin.useValue)(plugin.selectedCrash);
  const selectedCrash = crashes.find(
    (c) => c.notificationID === selectedCrashId
  );
  return /* @__PURE__ */ import_react.default.createElement(import_flipper_plugin.Layout.Left, { resizable: true, width: 400 }, /* @__PURE__ */ import_react.default.createElement(
    import_flipper_plugin.DataList,
    {
      items: crashes.map((crash) => ({
        id: crash.notificationID,
        title: crash.reason ?? crash.name,
        description: `${new Date(crash.date).toLocaleString()} - ${crash.name}`
      })),
      selection: selectedCrashId,
      onSelect: (id) => {
        plugin.selectedCrash.set(id);
      },
      onRenderEmpty: null
    }
  ), selectedCrash ? /* @__PURE__ */ import_react.default.createElement(CrashDetails, { crash: selectedCrash }) : /* @__PURE__ */ import_react.default.createElement(import_flipper_plugin.Layout.Horizontal, { center: true, grow: true }, /* @__PURE__ */ import_react.default.createElement(import_flipper_plugin.Layout.Container, { center: true, grow: true, gap: true }, /* @__PURE__ */ import_react.default.createElement(import_icons.CoffeeOutlined, null), /* @__PURE__ */ import_react.default.createElement(Text, { type: "secondary" }, crashes.length === 0 ? "No crashes detected so far!" : "No crash selected"))));
}
function CrashDetails({ crash }) {
  const plugin = (0, import_flipper_plugin.usePlugin)(devicePlugin);
  return /* @__PURE__ */ import_react.default.createElement(import_flipper_plugin.Layout.Top, null, /* @__PURE__ */ import_react.default.createElement(
    import_flipper_plugin.Toolbar,
    {
      wash: true,
      right: /* @__PURE__ */ import_react.default.createElement(
        import_antd.Button,
        {
          onClick: () => {
            plugin.clearCrashes();
          },
          title: "Clear all crashes",
          danger: true
        },
        /* @__PURE__ */ import_react.default.createElement(import_icons.DeleteOutlined, null)
      )
    },
    /* @__PURE__ */ import_react.default.createElement(
      import_antd.Button,
      {
        onClick: () => {
          plugin.copyCrashToClipboard(crash.callstack);
        }
      },
      /* @__PURE__ */ import_react.default.createElement(import_icons.CopyOutlined, null)
    ),
    plugin.isFB ? /* @__PURE__ */ import_react.default.createElement(
      import_antd.Button,
      {
        onClick: () => {
          plugin.createPaste(crash.callstack).then((x) => {
            if (x) {
              import_antd.notification.success({
                message: "Created paste",
                description: /* @__PURE__ */ import_react.default.createElement("span", null, "Created a paste P", x.number)
              });
            }
          }).catch((e) => {
            import_antd.notification.error({
              message: "Failed to create paste",
              description: /* @__PURE__ */ import_react.default.createElement("span", null, e.toString())
            });
          });
        }
      },
      "Create paste"
    ) : null,
    /* @__PURE__ */ import_react.default.createElement(
      import_antd.Button,
      {
        disabled: !crash.callstack,
        onClick: () => {
          plugin.openInLogs(crash.callstack);
        }
      },
      "Open In Logs"
    )
  ), /* @__PURE__ */ import_react.default.createElement(import_flipper_plugin.Layout.ScrollContainer, { pad: true, vertical: true }, /* @__PURE__ */ import_react.default.createElement(import_flipper_plugin.CodeBlock, null, /* @__PURE__ */ import_react.default.createElement(Text, { strong: true }, crash.name), /* @__PURE__ */ import_react.default.createElement("br", null), /* @__PURE__ */ import_react.default.createElement("br", null), /* @__PURE__ */ import_react.default.createElement(Text, { strong: true }, crash.reason), /* @__PURE__ */ import_react.default.createElement("br", null), /* @__PURE__ */ import_react.default.createElement("br", null), crash.callstack)));
}

// plugins/public/crash_reporter/index.tsx
function devicePlugin(client) {
  let notificationID = -1;
  const crashes = (0, import_flipper_plugin2.createState)([], { persist: "crashes" });
  const selectedCrash = (0, import_flipper_plugin2.createState)();
  client.onDeepLink((crashId) => {
    selectedCrash.set(crashId);
  });
  function reportCrash(payload) {
    notificationID++;
    const crash = {
      notificationID: notificationID.toString(),
      callstack: payload.callstack,
      name: payload.name,
      reason: payload.reason,
      date: payload.date || Date.now()
    };
    crashes.update((draft) => {
      draft.push(crash);
    });
    showCrashNotification(client, crash);
  }
  if (client.device.isConnected) {
    client.onDeviceCrash(reportCrash);
  }
  return {
    crashes,
    selectedCrash,
    reportCrash,
    openInLogs(callstack) {
      client.selectPlugin("DeviceLogs", callstack);
    },
    os: client.device.os,
    copyCrashToClipboard(callstack) {
      client.writeTextToClipboard(callstack);
    },
    createPaste(callstack) {
      return client.createPaste(callstack);
    },
    isFB: client.isFB,
    clearCrashes() {
      crashes.set([]);
      selectedCrash.set(void 0);
    }
  };
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL3VuaWNvZGUtc3Vic3RyaW5nL2luZGV4LmpzIiwgIi4uL2luZGV4LnRzeCIsICIuLi9jcmFzaC11dGlscy50c3giLCAiLi4vQ3Jhc2hlcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImZ1bmN0aW9uIGNoYXJBdChzdHJpbmcsIGluZGV4KSB7XG4gIHZhciBmaXJzdCA9IHN0cmluZy5jaGFyQ29kZUF0KGluZGV4KTtcbiAgdmFyIHNlY29uZDtcbiAgaWYgKGZpcnN0ID49IDB4RDgwMCAmJiBmaXJzdCA8PSAweERCRkYgJiYgc3RyaW5nLmxlbmd0aCA+IGluZGV4ICsgMSkge1xuICAgIHNlY29uZCA9IHN0cmluZy5jaGFyQ29kZUF0KGluZGV4ICsgMSk7XG4gICAgaWYgKHNlY29uZCA+PSAweERDMDAgJiYgc2Vjb25kIDw9IDB4REZGRikge1xuICAgICAgcmV0dXJuIHN0cmluZy5zdWJzdHJpbmcoaW5kZXgsIGluZGV4ICsgMik7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHJpbmdbaW5kZXhdO1xufVxuXG5mdW5jdGlvbiBzbGljZShzdHJpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGFjY3VtdWxhdG9yID0gXCJcIjtcbiAgdmFyIGNoYXJhY3RlcjtcbiAgdmFyIHN0cmluZ0luZGV4ID0gMDtcbiAgdmFyIHVuaWNvZGVJbmRleCA9IDA7XG4gIHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuXG4gIHdoaWxlIChzdHJpbmdJbmRleCA8IGxlbmd0aCkge1xuICAgIGNoYXJhY3RlciA9IGNoYXJBdChzdHJpbmcsIHN0cmluZ0luZGV4KTtcbiAgICBpZiAodW5pY29kZUluZGV4ID49IHN0YXJ0ICYmIHVuaWNvZGVJbmRleCA8IGVuZCkge1xuICAgICAgYWNjdW11bGF0b3IgKz0gY2hhcmFjdGVyO1xuICAgIH1cbiAgICBzdHJpbmdJbmRleCArPSBjaGFyYWN0ZXIubGVuZ3RoO1xuICAgIHVuaWNvZGVJbmRleCArPSAxO1xuICB9XG4gIHJldHVybiBhY2N1bXVsYXRvcjtcbn1cblxuZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUsIGZhbGxiYWNrKSB7XG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZhbGxiYWNrO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBOdW1iZXIodmFsdWUpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0cmluZywgc3RhcnQsIGVuZCkge1xuICB2YXIgcmVhbFN0YXJ0ID0gdG9OdW1iZXIoc3RhcnQsIDApO1xuICB2YXIgcmVhbEVuZCA9IHRvTnVtYmVyKGVuZCwgc3RyaW5nLmxlbmd0aCk7XG4gIGlmIChyZWFsRW5kID09IHJlYWxTdGFydCkge1xuICAgIHJldHVybiBcIlwiO1xuICB9IGVsc2UgaWYgKHJlYWxFbmQgPiByZWFsU3RhcnQpIHtcbiAgICByZXR1cm4gc2xpY2Uoc3RyaW5nLCByZWFsU3RhcnQsIHJlYWxFbmQpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzbGljZShzdHJpbmcsIHJlYWxFbmQsIHJlYWxTdGFydCk7XG4gIH1cbn1cbiIsICIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZvcm1hdFxuICovXG5cbmltcG9ydCB7Y3JlYXRlU3RhdGUsIERldmljZVBsdWdpbkNsaWVudCwgQ3Jhc2hMb2d9IGZyb20gJ2ZsaXBwZXItcGx1Z2luJztcbmltcG9ydCB7c2hvd0NyYXNoTm90aWZpY2F0aW9ufSBmcm9tICcuL2NyYXNoLXV0aWxzJztcblxuZXhwb3J0IHR5cGUgQ3Jhc2ggPSB7XG4gIG5vdGlmaWNhdGlvbklEOiBzdHJpbmc7XG4gIGNhbGxzdGFjaz86IHN0cmluZztcbiAgcmVhc29uOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgZGF0ZTogbnVtYmVyO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRldmljZVBsdWdpbihjbGllbnQ6IERldmljZVBsdWdpbkNsaWVudCkge1xuICBsZXQgbm90aWZpY2F0aW9uSUQgPSAtMTtcblxuICBjb25zdCBjcmFzaGVzID0gY3JlYXRlU3RhdGU8Q3Jhc2hbXT4oW10sIHtwZXJzaXN0OiAnY3Jhc2hlcyd9KTtcbiAgY29uc3Qgc2VsZWN0ZWRDcmFzaCA9IGNyZWF0ZVN0YXRlPHN0cmluZyB8IHVuZGVmaW5lZD4oKTtcblxuICBjbGllbnQub25EZWVwTGluaygoY3Jhc2hJZCkgPT4ge1xuICAgIHNlbGVjdGVkQ3Jhc2guc2V0KGNyYXNoSWQgYXMgc3RyaW5nKTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gcmVwb3J0Q3Jhc2gocGF5bG9hZDogQ3Jhc2hMb2cpIHtcbiAgICBub3RpZmljYXRpb25JRCsrO1xuXG4gICAgY29uc3QgY3Jhc2ggPSB7XG4gICAgICBub3RpZmljYXRpb25JRDogbm90aWZpY2F0aW9uSUQudG9TdHJpbmcoKSxcbiAgICAgIGNhbGxzdGFjazogcGF5bG9hZC5jYWxsc3RhY2ssXG4gICAgICBuYW1lOiBwYXlsb2FkLm5hbWUsXG4gICAgICByZWFzb246IHBheWxvYWQucmVhc29uLFxuICAgICAgZGF0ZTogcGF5bG9hZC5kYXRlIHx8IERhdGUubm93KCksXG4gICAgfTtcblxuICAgIGNyYXNoZXMudXBkYXRlKChkcmFmdCkgPT4ge1xuICAgICAgZHJhZnQucHVzaChjcmFzaCk7XG4gICAgfSk7XG5cbiAgICBzaG93Q3Jhc2hOb3RpZmljYXRpb24oY2xpZW50LCBjcmFzaCk7XG4gIH1cblxuICAvLyBTdGFydHVwIGxvZ2ljIHRvIGVzdGFibGlzaCBsb2cgbW9uaXRvcmluZ1xuICBpZiAoY2xpZW50LmRldmljZS5pc0Nvbm5lY3RlZCkge1xuICAgIGNsaWVudC5vbkRldmljZUNyYXNoKHJlcG9ydENyYXNoKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY3Jhc2hlcyxcbiAgICBzZWxlY3RlZENyYXNoLFxuICAgIHJlcG9ydENyYXNoLFxuICAgIG9wZW5JbkxvZ3MoY2FsbHN0YWNrOiBzdHJpbmcpIHtcbiAgICAgIGNsaWVudC5zZWxlY3RQbHVnaW4oJ0RldmljZUxvZ3MnLCBjYWxsc3RhY2spO1xuICAgIH0sXG4gICAgb3M6IGNsaWVudC5kZXZpY2Uub3MsXG4gICAgY29weUNyYXNoVG9DbGlwYm9hcmQoY2FsbHN0YWNrOiBzdHJpbmcpIHtcbiAgICAgIGNsaWVudC53cml0ZVRleHRUb0NsaXBib2FyZChjYWxsc3RhY2spO1xuICAgIH0sXG4gICAgY3JlYXRlUGFzdGUoY2FsbHN0YWNrOiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiBjbGllbnQuY3JlYXRlUGFzdGUoY2FsbHN0YWNrKTtcbiAgICB9LFxuICAgIGlzRkI6IGNsaWVudC5pc0ZCLFxuICAgIGNsZWFyQ3Jhc2hlcygpIHtcbiAgICAgIGNyYXNoZXMuc2V0KFtdKTtcbiAgICAgIHNlbGVjdGVkQ3Jhc2guc2V0KHVuZGVmaW5lZCk7XG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IHtDcmFzaGVzIGFzIENvbXBvbmVudH0gZnJvbSAnLi9DcmFzaGVzJztcbiIsICIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZvcm1hdFxuICovXG5cbmltcG9ydCB1bmljb2RlU3Vic3RyaW5nIGZyb20gJ3VuaWNvZGUtc3Vic3RyaW5nJztcbmltcG9ydCB0eXBlIHtDcmFzaH0gZnJvbSAnLi9pbmRleCc7XG5pbXBvcnQge0RldmljZVBsdWdpbkNsaWVudH0gZnJvbSAnZmxpcHBlci1wbHVnaW4nO1xuXG5leHBvcnQgY29uc3QgVU5LTk9XTl9DUkFTSF9SRUFTT04gPSAnVW5rbm93bic7XG5cbmZ1bmN0aW9uIHRydW5jYXRlKGJhc2VTdHJpbmc6IHN0cmluZywgbnVtT2ZDaGFyczogbnVtYmVyKTogc3RyaW5nIHtcbiAgaWYgKGJhc2VTdHJpbmcubGVuZ3RoIDw9IG51bU9mQ2hhcnMpIHtcbiAgICByZXR1cm4gYmFzZVN0cmluZztcbiAgfVxuICBjb25zdCB0cnVuY2F0ZWRfc3RyaW5nID0gdW5pY29kZVN1YnN0cmluZyhiYXNlU3RyaW5nLCAwLCBudW1PZkNoYXJzIC0gMSk7XG4gIHJldHVybiBgJHt0cnVuY2F0ZWRfc3RyaW5nfVxcdTIwMjZgO1xufVxuXG5mdW5jdGlvbiB0cmltQ2FsbFN0YWNrSWZQb3NzaWJsZShjYWxsc3RhY2s6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHJlZ2V4ID0gL0FwcGxpY2F0aW9uIFNwZWNpZmljIEluZm9ybWF0aW9uOi87XG4gIGNvbnN0IHF1ZXJ5ID0gcmVnZXguZXhlYyhjYWxsc3RhY2spO1xuICByZXR1cm4gcXVlcnkgPyBjYWxsc3RhY2suc3Vic3RyaW5nKDAsIHF1ZXJ5LmluZGV4KSA6IGNhbGxzdGFjaztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dDcmFzaE5vdGlmaWNhdGlvbihcbiAgY2xpZW50OiBEZXZpY2VQbHVnaW5DbGllbnQsXG4gIGNyYXNoOiBDcmFzaCxcbikge1xuICBjb25zdCBpZ25vcmUgPSAhY3Jhc2gubmFtZSAmJiAhY3Jhc2gucmVhc29uO1xuICBjb25zdCB1bmtub3duQ3Jhc2hDYXVzZSA9IGNyYXNoLnJlYXNvbiA9PT0gVU5LTk9XTl9DUkFTSF9SRUFTT047XG4gIGlmIChpZ25vcmUgfHwgdW5rbm93bkNyYXNoQ2F1c2UpIHtcbiAgICBjb25zb2xlLndhcm4oJ0lnbm9yZWQgdGhlIG5vdGlmaWNhdGlvbiBmb3IgdGhlIGNyYXNoJywgY3Jhc2gpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCB0aXRsZTogc3RyaW5nID0gYENSQVNIOiAke3RydW5jYXRlKGNyYXNoLm5hbWUgfHwgY3Jhc2gucmVhc29uLCA1MCl9YDtcbiAgdGl0bGUgPSBgJHtcbiAgICBjcmFzaC5uYW1lID09IGNyYXNoLnJlYXNvblxuICAgICAgPyB0aXRsZVxuICAgICAgOiBgJHt0aXRsZX1SZWFzb246ICR7dHJ1bmNhdGUoY3Jhc2gucmVhc29uLCA1MCl9YFxuICB9YDtcbiAgY29uc3QgY2FsbHN0YWNrID0gY3Jhc2guY2FsbHN0YWNrXG4gICAgPyB0cmltQ2FsbFN0YWNrSWZQb3NzaWJsZShjcmFzaC5jYWxsc3RhY2spXG4gICAgOiAnTm8gY2FsbHN0YWNrIGF2YWlsYWJsZSc7XG4gIGNvbnN0IG1zZyA9IGBDYWxsc3RhY2s6ICR7dHJ1bmNhdGUoY2FsbHN0YWNrLCAyMDApfWA7XG4gIC8vIFRPRE86IGZpeCBjbGllbnQgaWRcbiAgY2xpZW50LnNob3dOb3RpZmljYXRpb24oe1xuICAgIGlkOiBjcmFzaC5ub3RpZmljYXRpb25JRCxcbiAgICBtZXNzYWdlOiBtc2csXG4gICAgc2V2ZXJpdHk6ICdlcnJvcicsXG4gICAgdGl0bGUsXG4gICAgYWN0aW9uOiBjcmFzaC5ub3RpZmljYXRpb25JRCxcbiAgICBjYXRlZ29yeTogY3Jhc2gucmVhc29uIHx8ICdVbmtub3duIHJlYXNvbicsXG4gIH0pO1xufVxuIiwgIi8qKlxuICogQ29weXJpZ2h0IChjKSBNZXRhIFBsYXRmb3JtcywgSW5jLiBhbmQgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZm9ybWF0XG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7QnV0dG9uLCBub3RpZmljYXRpb24sIFR5cG9ncmFwaHl9IGZyb20gJ2FudGQnO1xuaW1wb3J0IHtDb2ZmZWVPdXRsaW5lZCwgQ29weU91dGxpbmVkLCBEZWxldGVPdXRsaW5lZH0gZnJvbSAnQGFudC1kZXNpZ24vaWNvbnMnO1xuaW1wb3J0IHtcbiAgdXNlUGx1Z2luLFxuICB1c2VWYWx1ZSxcbiAgRGF0YUxpc3QsXG4gIExheW91dCxcbiAgQ29kZUJsb2NrLFxuICBUb29sYmFyLFxufSBmcm9tICdmbGlwcGVyLXBsdWdpbic7XG5pbXBvcnQge0NyYXNoLCBkZXZpY2VQbHVnaW59IGZyb20gJy4vaW5kZXgnO1xuXG5jb25zdCB7VGV4dH0gPSBUeXBvZ3JhcGh5O1xuZXhwb3J0IGZ1bmN0aW9uIENyYXNoZXMoKSB7XG4gIGNvbnN0IHBsdWdpbiA9IHVzZVBsdWdpbihkZXZpY2VQbHVnaW4pO1xuICBjb25zdCBjcmFzaGVzID0gdXNlVmFsdWUocGx1Z2luLmNyYXNoZXMpO1xuICBjb25zdCBzZWxlY3RlZENyYXNoSWQgPSB1c2VWYWx1ZShwbHVnaW4uc2VsZWN0ZWRDcmFzaCk7XG4gIGNvbnN0IHNlbGVjdGVkQ3Jhc2ggPSBjcmFzaGVzLmZpbmQoXG4gICAgKGMpID0+IGMubm90aWZpY2F0aW9uSUQgPT09IHNlbGVjdGVkQ3Jhc2hJZCxcbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxMYXlvdXQuTGVmdCByZXNpemFibGUgd2lkdGg9ezQwMH0+XG4gICAgICA8RGF0YUxpc3RcbiAgICAgICAgaXRlbXM9e2NyYXNoZXMubWFwKChjcmFzaCkgPT4gKHtcbiAgICAgICAgICBpZDogY3Jhc2gubm90aWZpY2F0aW9uSUQsXG4gICAgICAgICAgdGl0bGU6IGNyYXNoLnJlYXNvbiA/PyBjcmFzaC5uYW1lLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBgJHtuZXcgRGF0ZShjcmFzaC5kYXRlKS50b0xvY2FsZVN0cmluZygpfSAtICR7XG4gICAgICAgICAgICBjcmFzaC5uYW1lXG4gICAgICAgICAgfWAsXG4gICAgICAgIH0pKX1cbiAgICAgICAgc2VsZWN0aW9uPXtzZWxlY3RlZENyYXNoSWR9XG4gICAgICAgIG9uU2VsZWN0PXsoaWQpID0+IHtcbiAgICAgICAgICBwbHVnaW4uc2VsZWN0ZWRDcmFzaC5zZXQoaWQpO1xuICAgICAgICB9fVxuICAgICAgICBvblJlbmRlckVtcHR5PXtudWxsfVxuICAgICAgLz5cbiAgICAgIHtzZWxlY3RlZENyYXNoID8gKFxuICAgICAgICA8Q3Jhc2hEZXRhaWxzIGNyYXNoPXtzZWxlY3RlZENyYXNofSAvPlxuICAgICAgKSA6IChcbiAgICAgICAgPExheW91dC5Ib3Jpem9udGFsIGNlbnRlciBncm93PlxuICAgICAgICAgIDxMYXlvdXQuQ29udGFpbmVyIGNlbnRlciBncm93IGdhcD5cbiAgICAgICAgICAgIDxDb2ZmZWVPdXRsaW5lZCAvPlxuICAgICAgICAgICAgPFRleHQgdHlwZT1cInNlY29uZGFyeVwiPlxuICAgICAgICAgICAgICB7Y3Jhc2hlcy5sZW5ndGggPT09IDBcbiAgICAgICAgICAgICAgICA/ICdObyBjcmFzaGVzIGRldGVjdGVkIHNvIGZhciEnXG4gICAgICAgICAgICAgICAgOiAnTm8gY3Jhc2ggc2VsZWN0ZWQnfVxuICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgIDwvTGF5b3V0LkNvbnRhaW5lcj5cbiAgICAgICAgPC9MYXlvdXQuSG9yaXpvbnRhbD5cbiAgICAgICl9XG4gICAgPC9MYXlvdXQuTGVmdD5cbiAgKTtcbn1cblxuZnVuY3Rpb24gQ3Jhc2hEZXRhaWxzKHtjcmFzaH06IHtjcmFzaDogQ3Jhc2h9KSB7XG4gIGNvbnN0IHBsdWdpbiA9IHVzZVBsdWdpbihkZXZpY2VQbHVnaW4pO1xuXG4gIHJldHVybiAoXG4gICAgPExheW91dC5Ub3A+XG4gICAgICA8VG9vbGJhclxuICAgICAgICB3YXNoXG4gICAgICAgIHJpZ2h0PXtcbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIHBsdWdpbi5jbGVhckNyYXNoZXMoKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICB0aXRsZT1cIkNsZWFyIGFsbCBjcmFzaGVzXCJcbiAgICAgICAgICAgIGRhbmdlcj5cbiAgICAgICAgICAgIDxEZWxldGVPdXRsaW5lZCAvPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICB9PlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgLy8gVE9ETzogRml4IHRoaXMgdGhlIG5leHQgdGltZSB0aGUgZmlsZSBpcyBlZGl0ZWQuXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgICAgICAgcGx1Z2luLmNvcHlDcmFzaFRvQ2xpcGJvYXJkKGNyYXNoLmNhbGxzdGFjayEpO1xuICAgICAgICAgIH19PlxuICAgICAgICAgIDxDb3B5T3V0bGluZWQgLz5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIHtwbHVnaW4uaXNGQiA/IChcbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIHBsdWdpbiAvLyBUT0RPOiBGaXggdGhpcyB0aGUgbmV4dCB0aW1lIHRoZSBmaWxlIGlzIGVkaXRlZC5cbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgICAgICAgICAgIC5jcmVhdGVQYXN0ZShjcmFzaC5jYWxsc3RhY2shKVxuICAgICAgICAgICAgICAgIC50aGVuKCh4KSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAoeCkge1xuICAgICAgICAgICAgICAgICAgICBub3RpZmljYXRpb24uc3VjY2Vzcyh7XG4gICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ0NyZWF0ZWQgcGFzdGUnLFxuICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiA8c3Bhbj5DcmVhdGVkIGEgcGFzdGUgUHt4Lm51bWJlcn08L3NwYW4+LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uLmVycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ0ZhaWxlZCB0byBjcmVhdGUgcGFzdGUnLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogPHNwYW4+e2UudG9TdHJpbmcoKX08L3NwYW4+LFxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9fT5cbiAgICAgICAgICAgIENyZWF0ZSBwYXN0ZVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGRpc2FibGVkPXshY3Jhc2guY2FsbHN0YWNrfVxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgIC8vIFRPRE86IEZpeCB0aGlzIHRoZSBuZXh0IHRpbWUgdGhlIGZpbGUgaXMgZWRpdGVkLlxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgIHBsdWdpbi5vcGVuSW5Mb2dzKGNyYXNoLmNhbGxzdGFjayEpO1xuICAgICAgICAgIH19PlxuICAgICAgICAgIE9wZW4gSW4gTG9nc1xuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvVG9vbGJhcj5cbiAgICAgIDxMYXlvdXQuU2Nyb2xsQ29udGFpbmVyIHBhZCB2ZXJ0aWNhbD5cbiAgICAgICAgPENvZGVCbG9jaz5cbiAgICAgICAgICA8VGV4dCBzdHJvbmc+e2NyYXNoLm5hbWV9PC9UZXh0PlxuICAgICAgICAgIDxiciAvPlxuICAgICAgICAgIDxiciAvPlxuICAgICAgICAgIDxUZXh0IHN0cm9uZz57Y3Jhc2gucmVhc29ufTwvVGV4dD5cbiAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICB7Y3Jhc2guY2FsbHN0YWNrfVxuICAgICAgICA8L0NvZGVCbG9jaz5cbiAgICAgIDwvTGF5b3V0LlNjcm9sbENvbnRhaW5lcj5cbiAgICA8L0xheW91dC5Ub3A+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUEsb0VBQUFBLFNBQUE7QUFBQSxhQUFTLE9BQU8sUUFBUSxPQUFPO0FBQzdCLFVBQUksUUFBUSxPQUFPLFdBQVcsS0FBSztBQUNuQyxVQUFJO0FBQ0osVUFBSSxTQUFTLFNBQVUsU0FBUyxTQUFVLE9BQU8sU0FBUyxRQUFRLEdBQUc7QUFDbkUsaUJBQVMsT0FBTyxXQUFXLFFBQVEsQ0FBQztBQUNwQyxZQUFJLFVBQVUsU0FBVSxVQUFVLE9BQVE7QUFDeEMsaUJBQU8sT0FBTyxVQUFVLE9BQU8sUUFBUSxDQUFDO0FBQUEsUUFDMUM7QUFBQSxNQUNGO0FBQ0EsYUFBTyxPQUFPO0FBQUEsSUFDaEI7QUFFQSxhQUFTLE1BQU0sUUFBUSxPQUFPLEtBQUs7QUFDakMsVUFBSSxjQUFjO0FBQ2xCLFVBQUk7QUFDSixVQUFJLGNBQWM7QUFDbEIsVUFBSSxlQUFlO0FBQ25CLFVBQUksU0FBUyxPQUFPO0FBRXBCLGFBQU8sY0FBYyxRQUFRO0FBQzNCLG9CQUFZLE9BQU8sUUFBUSxXQUFXO0FBQ3RDLFlBQUksZ0JBQWdCLFNBQVMsZUFBZSxLQUFLO0FBQy9DLHlCQUFlO0FBQUEsUUFDakI7QUFDQSx1QkFBZSxVQUFVO0FBQ3pCLHdCQUFnQjtBQUFBLE1BQ2xCO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFFQSxhQUFT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N0QsUUFBTSxvQkFBZ0Isb0NBQWdDO0FBRXRELFNBQU8sV0FBVyxDQUFDLFlBQVk7QUFDN0Isa0JBQWMsSUFBSSxPQUFpQjtBQUFBLEVBQ3JDLENBQUM7QUFFRCxXQUFTLFlBQVksU0FBbUI7QUFDdEM7QUFFQSxVQUFNLFFBQVE7QUFBQSxNQUNaLGdCQUFnQixlQUFlLFNBQVM7QUFBQSxNQUN4QyxXQUFXLFFBQVE7QUFBQSxNQUNuQixNQUFNLFFBQVE7QUFBQSxNQUNkLFFBQVEsUUFBUTtBQUFBLE1BQ2hCLE1BQU0sUUFBUSxRQUFRLEtBQUssSUFBSTtBQUFBLElBQ2pDO0FBRUEsWUFBUSxPQUFPLENBQUMsVUFBVTtBQUN4QixZQUFNLEtBQUssS0FBSztBQUFBLElBQ2xCLENBQUM7QUFFRCwwQkFBc0IsUUFBUSxLQUFLO0FBQUEsRUFDckM7QUFHQSxNQUFJLE9BQU8sT0FBTyxhQUFhO0FBQzdCLFdBQU8sY0FBYyxXQUFXO0FBQUEsRUFDbEM7QUFFQSxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxXQUFXLFdBQW1CO0FBQzVCLGFBQU8sYUFBYSxjQUFjLFNBQVM7QUFBQSxJQUM3QztBQUFBLElBQ0EsSUFBSSxPQUFPLE9BQU87QUFBQSxJQUNsQixxQkFBcUIsV0FBbUI7QUFDdEMsYUFBTyxxQkFBcUIsU0FBUztBQUFBLElBQ3ZDO0FBQUEsSUFDQSxZQUFZLFdBQW1CO0FBQzdCLGFBQU8sT0FBTyxZQUFZLFNBQVM7QUFBQSxJQUNyQztBQUFBLElBQ0EsTUFBTSxPQUFPO0FBQUEsSUFDYixlQUFlO0FBQ2IsY0FBUSxJQUFJLENBQUMsQ0FBQztBQUNkLG9CQUFjLElBQUksTUFBUztBQUFBLElBQzdCO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogWyJtb2R1bGUiLCAiaW1wb3J0X2ZsaXBwZXJfcGx1Z2luIiwgInVuaWNvZGVTdWJzdHJpbmciLCAiUmVhY3QiXQp9Cg==
