"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// plugins/public/hermesdebuggerrn/index.tsx
var hermesdebuggerrn_exports = {};
__export(hermesdebuggerrn_exports, {
  default: () => hermesdebuggerrn_default
});
module.exports = __toCommonJS(hermesdebuggerrn_exports);
var import_react7 = __toESM(require("react"));
var import_flipper6 = require("flipper");

// plugins/public/hermesdebuggerrn/LaunchScreen.tsx
var import_react = __toESM(require("react"));
var import_flipper = require("flipper");
var Container = (0, import_flipper.styled)(import_flipper.FlexColumn)({
  height: "100%",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: import_flipper.colors.light02
});
var Welcome = (0, import_flipper.styled)(import_flipper.FlexColumn)({
  width: 460,
  background: import_flipper.colors.white,
  borderRadius: 10,
  boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
  overflow: "hidden",
  transition: "0.6s all ease-out"
});
var Title = (0, import_flipper.styled)(import_flipper.Text)({
  fontSize: 24,
  fontWeight: 300,
  textAlign: "center",
  color: import_flipper.colors.light50,
  marginTop: 16,
  marginBottom: 16
});
var Item = (0, import_flipper.styled)(import_flipper.FlexRow)({
  padding: 10,
  alignItems: "center",
  borderTop: `1px solid ${import_flipper.colors.light10}`
});
var ItemTitle = (0, import_flipper.styled)(import_flipper.Text)({
  color: import_flipper.colors.light50,
  fontSize: 14,
  lineHeight: "20px"
});
var Bold = (0, import_flipper.styled)(import_flipper.Text)({
  fontWeight: 600
});
var Icon = (0, import_flipper.styled)(import_flipper.Glyph)({
  marginRight: 11,
  marginLeft: 6
});
function LaunchScreen() {
  return /* @__PURE__ */ import_react.default.createElement(Container, null, /* @__PURE__ */ import_react.default.createElement(Welcome, null, /* @__PURE__ */ import_react.default.createElement(Title, null, "Hermes Debugger"), /* @__PURE__ */ import_react.default.createElement(Item, null, /* @__PURE__ */ import_react.default.createElement(Icon, { size: 20, name: "question-circle", color: import_flipper.colors.info }), /* @__PURE__ */ import_react.default.createElement(import_flipper.FlexColumn, null, /* @__PURE__ */ import_react.default.createElement(ItemTitle, null, /* @__PURE__ */ import_react.default.createElement(Bold, null, "Metro is connected but no Hermes apps were found."), " ", "Open a React Native screen with Hermes enabled to connect. Note: you may need to reload the app in order to reconnect the device to Metro.")))));
}

// plugins/public/hermesdebuggerrn/Banner.tsx
var import_react2 = __toESM(require("react"));
var import_flipper2 = require("flipper");
var import_antd = require("antd");
var import_flipper_plugin = require("flipper-plugin");
var BannerContainer = (0, import_flipper2.styled)(import_flipper2.FlexRow)({
  height: "30px",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#2bb673"
});
var BannerText = (0, import_flipper2.styled)(import_flipper2.Text)({
  color: import_flipper2.colors.white,
  fontSize: 14,
  lineHeight: "20px"
});
var BannerLink = (0, import_flipper2.styled)(CustomLink)({
  color: import_flipper2.colors.white,
  textDecoration: "underline",
  "&:hover": {
    cursor: "pointer",
    color: "#303846"
  }
});
function CustomLink(props) {
  return /* @__PURE__ */ import_react2.default.createElement(
    import_antd.Typography.Link,
    {
      className: props.className,
      href: props.href,
      style: props.style
    },
    props.children || props.href
  );
}
var isBannerEnabled = function() {
  return (0, import_flipper_plugin.getFlipperLib)().GK("flipper_plugin_hermes_debugger_survey");
};
function Banner() {
  if (!(0, import_flipper_plugin.getFlipperLib)().GK("flipper_plugin_hermes_debugger_survey")) {
    return null;
  }
  return /* @__PURE__ */ import_react2.default.createElement(BannerContainer, null, /* @__PURE__ */ import_react2.default.createElement(BannerText, null, "Help us improve your debugging experience with this", " ", /* @__PURE__ */ import_react2.default.createElement(BannerLink, { href: "https://fburl.com/hermessurvey" }, "single page survey"), "!"));
}

// plugins/public/hermesdebuggerrn/SelectScreen.tsx
var import_react3 = __toESM(require("react"));
var import_flipper3 = require("flipper");
var Container2 = (0, import_flipper3.styled)(import_flipper3.FlexColumn)({
  height: "100%",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: import_flipper3.colors.light02
});
var Welcome2 = (0, import_flipper3.styled)(import_flipper3.FlexColumn)({
  width: 460,
  background: import_flipper3.colors.white,
  borderRadius: 10,
  boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
  overflow: "hidden",
  transition: "0.6s all ease-out"
});
var Title2 = (0, import_flipper3.styled)(import_flipper3.Text)({
  fontSize: 24,
  fontWeight: 300,
  textAlign: "center",
  color: import_flipper3.colors.light50,
  marginTop: 16,
  marginBottom: 16
});
var Item2 = (0, import_flipper3.styled)(import_flipper3.FlexRow)({
  padding: 10,
  alignItems: "center",
  borderTop: `1px solid ${import_flipper3.colors.light10}`
});
var ItemTitle2 = (0, import_flipper3.styled)(import_flipper3.Text)({
  color: import_flipper3.colors.light50,
  fontSize: 14,
  lineHeight: "20px"
});
var Icon2 = (0, import_flipper3.styled)(import_flipper3.Glyph)({
  marginRight: 11,
  marginLeft: 6
});
function SelectScreen(props) {
  return /* @__PURE__ */ import_react3.default.createElement(Container2, null, /* @__PURE__ */ import_react3.default.createElement(Welcome2, null, /* @__PURE__ */ import_react3.default.createElement(Title2, null, "Hermes Debugger Select"), /* @__PURE__ */ import_react3.default.createElement(Item2, null, /* @__PURE__ */ import_react3.default.createElement(import_flipper3.FlexColumn, null, /* @__PURE__ */ import_react3.default.createElement(ItemTitle2, null, "Please select a target:"))), props.targets.map((target) => {
    return /* @__PURE__ */ import_react3.default.createElement(Item2, { onClick: () => props.onSelect(target), key: target.id }, /* @__PURE__ */ import_react3.default.createElement(Icon2, { size: 20, name: "code", color: import_flipper3.colors.info }), /* @__PURE__ */ import_react3.default.createElement(import_flipper3.FlexColumn, null, /* @__PURE__ */ import_react3.default.createElement(ItemTitle2, null, target.title)));
  })));
}

// plugins/public/hermesdebuggerrn/ErrorScreen.tsx
var import_react4 = __toESM(require("react"));
var import_flipper4 = require("flipper");
var Container3 = (0, import_flipper4.styled)(import_flipper4.FlexColumn)({
  height: "100%",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: import_flipper4.colors.light02
});
var Welcome3 = (0, import_flipper4.styled)(import_flipper4.FlexColumn)({
  width: 460,
  background: import_flipper4.colors.white,
  borderRadius: 10,
  boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
  overflow: "hidden",
  transition: "0.6s all ease-out"
});
var Title3 = (0, import_flipper4.styled)(import_flipper4.Text)({
  fontSize: 24,
  fontWeight: 300,
  textAlign: "center",
  color: import_flipper4.colors.light50,
  marginTop: 16,
  marginBottom: 16
});
var Item3 = (0, import_flipper4.styled)(import_flipper4.FlexRow)({
  padding: 10,
  alignItems: "center",
  borderTop: `1px solid ${import_flipper4.colors.light10}`
});
var ItemTitle3 = (0, import_flipper4.styled)(import_flipper4.Text)({
  color: import_flipper4.colors.light50,
  fontSize: 14,
  lineHeight: "20px"
});
var Bold2 = (0, import_flipper4.styled)(import_flipper4.Text)({
  fontWeight: 600
});
var Icon3 = (0, import_flipper4.styled)(import_flipper4.Glyph)({
  marginRight: 11,
  marginLeft: 6
});
var KNOWN_FAILURE_MESSAGES = {
  "Failed to fetch": {
    message: "Metro disconnected.",
    hint: "Please check that metro is running and Flipper can connect to it."
  },
  default: {
    message: "Cannot connect to Metro.",
    hint: "Please check that metro is running and Flipper can connect to it."
  }
};
function getReason(error) {
  let failure_message = KNOWN_FAILURE_MESSAGES.default;
  if (error != null && KNOWN_FAILURE_MESSAGES[error.message]) {
    failure_message = KNOWN_FAILURE_MESSAGES[error.message];
  }
  return /* @__PURE__ */ import_react4.default.createElement(ItemTitle3, null, /* @__PURE__ */ import_react4.default.createElement(Bold2, null, failure_message.message, " "), failure_message.hint);
}
function ErrorScreen(props) {
  return /* @__PURE__ */ import_react4.default.createElement(Container3, null, /* @__PURE__ */ import_react4.default.createElement(Welcome3, null, /* @__PURE__ */ import_react4.default.createElement(Title3, null, "Hermes Debugger Error"), /* @__PURE__ */ import_react4.default.createElement(Item3, null, /* @__PURE__ */ import_react4.default.createElement(Icon3, { size: 20, name: "caution-octagon", color: import_flipper4.colors.red }), /* @__PURE__ */ import_react4.default.createElement(import_flipper4.FlexColumn, null, getReason(props.error)))));
}

// plugins/public/hermesdebuggerrn/ChromeDevTools.tsx
var import_react5 = __toESM(require("react"));
var import_flipper5 = require("flipper");
var devToolsNodeId = (url) => `hermes-chromedevtools-out-of-react-node-${url.replace(/\W+/g, "-")}`;
var TARGET_CONTAINER_ID = "flipper-out-of-contents-container";
function createDevToolsNode(url, marginTop) {
  const existing = findDevToolsNode(url);
  if (existing) {
    return existing;
  }
  const wrapper = document.createElement("div");
  wrapper.id = devToolsNodeId(url);
  wrapper.style.height = "100%";
  wrapper.style.width = "100%";
  const iframe = document.createElement(
    "webview"
  );
  iframe.style.height = "100%";
  iframe.style.width = "100%";
  iframe.src = url.replace(/^chrome-/, "");
  wrapper.appendChild(iframe);
  if (marginTop) {
    document.getElementById(TARGET_CONTAINER_ID).style.marginTop = marginTop;
  }
  document.getElementById(TARGET_CONTAINER_ID).appendChild(wrapper);
  return wrapper;
}
function findDevToolsNode(url) {
  return document.querySelector(`#${devToolsNodeId(url)}`);
}
function attachDevTools(devToolsNode) {
  devToolsNode.style.display = "block";
  document.getElementById(TARGET_CONTAINER_ID).style.display = "block";
  document.getElementById(TARGET_CONTAINER_ID).parentElement.style.display = "block";
  document.getElementById(TARGET_CONTAINER_ID).parentElement.style.height = "100%";
}
function detachDevTools(devToolsNode) {
  document.getElementById(TARGET_CONTAINER_ID).style.display = "none";
  document.getElementById(TARGET_CONTAINER_ID).parentElement.style.display = "none";
  if (devToolsNode) {
    devToolsNode.style.display = "none";
  }
}
var EmptyContainer = (0, import_flipper5.styled)(import_flipper5.FlexColumn)({
  height: "100%",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: import_flipper5.colors.light02
});
var ChromeDevTools = class extends import_react5.default.Component {
  createDevTools(url, marginTop) {
    const devToolsNode = createDevToolsNode(url, marginTop);
    attachDevTools(devToolsNode);
  }
  hideDevTools(_url) {
    detachDevTools(findDevToolsNode(this.props.url));
  }
  componentDidMount() {
    this.createDevTools(this.props.url, this.props.marginTop);
  }
  componentWillUnmount() {
    this.hideDevTools(this.props.url);
  }
  componentDidUpdate(prevProps) {
    const oldUrl = prevProps.url;
    const newUrl = this.props.url;
    if (oldUrl != newUrl) {
      this.hideDevTools(oldUrl);
      this.createDevTools(newUrl, this.props.marginTop);
    }
  }
  render() {
    return /* @__PURE__ */ import_react5.default.createElement(EmptyContainer, null);
  }
};

// plugins/public/hermesdebuggerrn/index.tsx
var import_flipper_plugin3 = require("flipper-plugin");

// plugins/public/hermesdebuggerrn/fb-stubs/IncompatibleNotice.tsx
var import_flipper_plugin2 = require("flipper-plugin");
var import_react6 = __toESM(require("react"));
var import_antd2 = require("antd");
var IncompatibleNotice = () => {
  return /* @__PURE__ */ import_react6.default.createElement(
    import_flipper_plugin2.Layout.Container,
    {
      pad: "medium",
      style: { maxWidth: 350, alignItems: "center", margin: "auto" }
    },
    /* @__PURE__ */ import_react6.default.createElement("h1", { style: { fontSize: 20 } }, "Incompatibility notice"),
    /* @__PURE__ */ import_react6.default.createElement("p", null, "This plugin is not compatible with the in-browser Flipper distribution."),
    /* @__PURE__ */ import_react6.default.createElement("p", null, "Please, install our last Electron release v0.239.0 to use this plugin."),
    /* @__PURE__ */ import_react6.default.createElement("div", { style: { display: "inline-block", textAlign: "center" } }, /* @__PURE__ */ import_react6.default.createElement(
      import_antd2.Button,
      {
        type: "primary",
        block: true,
        onClick: () => (0, import_flipper_plugin2.getFlipperLib)().openLink(
          "https://github.com/facebook/flipper/releases/tag/v0.239.0"
        )
      },
      "Install"
    ))
  );
};

// plugins/public/hermesdebuggerrn/index.tsx
var POLL_SECS = 5 * 1e3;
var METRO_PORT_ENV_VAR = process.env.METRO_SERVER_PORT || "8081";
var METRO_PORT = isNaN(+METRO_PORT_ENV_VAR) ? "8081" : METRO_PORT_ENV_VAR;
var METRO_URL = new URL("http://localhost");
METRO_URL.port = METRO_PORT;
var Content = (0, import_flipper6.styled)(import_flipper6.FlexRow)({
  height: "100%",
  width: "100%",
  flexGrow: 1,
  justifyContent: "center",
  alignItems: "center"
});
var Container4 = (0, import_flipper6.styled)(import_flipper6.FlexColumn)({
  height: "100%",
  width: "100%",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  backgroundColor: import_flipper6.colors.light02
});
var hermesdebuggerrn_default = class extends import_flipper6.FlipperDevicePlugin {
  constructor() {
    super(...arguments);
    this.state = {
      targets: null,
      selectedTarget: null,
      error: null
    };
    this.checkDebugTargets = () => {
      fetch(`${METRO_URL.toString()}json`).then((res) => res.json()).then((result) => {
        const targets = result.filter(
          (target) => target.title === "React Native Experimental (Improved Chrome Reloads)"
        );
        let currentlySelected = null;
        if (this.state.selectedTarget != null) {
          for (const target of result) {
            if (this.state.selectedTarget?.webSocketDebuggerUrl === target.webSocketDebuggerUrl) {
              currentlySelected = this.state.selectedTarget;
            }
          }
        }
        const selectedTarget = currentlySelected == null && targets.length === 1 ? targets[0] : currentlySelected;
        this.setState({
          error: null,
          targets,
          selectedTarget
        });
      }).catch((error) => {
        this.setState({
          targets: null,
          selectedTarget: null,
          error
        });
      });
    };
    this.handleSelect = (selectedTarget) => this.setState({ selectedTarget });
  }
  static supportsDevice(device) {
    return !device.isArchived && device.os === "Metro";
  }
  componentDidMount() {
    this.poll = setInterval(this.checkDebugTargets, POLL_SECS);
    this.checkDebugTargets();
  }
  componentWillUnmount() {
    if (this.poll) {
      clearInterval(this.poll);
    }
  }
  renderContent() {
    const { error, selectedTarget, targets } = this.state;
    if (selectedTarget) {
      let bannerMargin = null;
      if (isBannerEnabled()) {
        bannerMargin = "29px";
      }
      return /* @__PURE__ */ import_react7.default.createElement(
        ChromeDevTools,
        {
          url: selectedTarget.devtoolsFrontendUrl,
          marginTop: bannerMargin
        }
      );
    } else if (targets != null && targets.length === 0) {
      return /* @__PURE__ */ import_react7.default.createElement(LaunchScreen, null);
    } else if (targets != null && targets.length > 0) {
      return /* @__PURE__ */ import_react7.default.createElement(SelectScreen, { targets, onSelect: this.handleSelect });
    } else if (error != null) {
      return /* @__PURE__ */ import_react7.default.createElement(ErrorScreen, { error });
    } else {
      return null;
    }
  }
  render() {
    if ((0, import_flipper_plugin3.getFlipperLib)().environmentInfo.isHeadlessBuild) {
      return /* @__PURE__ */ import_react7.default.createElement(IncompatibleNotice, null);
    }
    return /* @__PURE__ */ import_react7.default.createElement(Container4, null, /* @__PURE__ */ import_react7.default.createElement(Banner, null), /* @__PURE__ */ import_react7.default.createElement(Content, null, this.renderContent()));
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vaW5kZXgudHN4IiwgIi4uL0xhdW5jaFNjcmVlbi50c3giLCAiLi4vQmFubmVyLnRzeCIsICIuLi9TZWxlY3RTY3JlZW4udHN4IiwgIi4uL0Vycm9yU2NyZWVuLnRzeCIsICIuLi9DaHJvbWVEZXZUb29scy50c3giLCAiLi4vZmItc3R1YnMvSW5jb21wYXRpYmxlTm90aWNlLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIE1ldGEgUGxhdGZvcm1zLCBJbmMuIGFuZCBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmb3JtYXRcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuLy8gVE9ETzogRml4IHRoaXMgdGhlIG5leHQgdGltZSB0aGUgZmlsZSBpcyBlZGl0ZWQuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcnVsZXNkaXIvbm8tcmVzdHJpY3RlZC1pbXBvcnRzLWNsb25lXG5pbXBvcnQge1xuICBGbGlwcGVyRGV2aWNlUGx1Z2luLFxuICBEZXZpY2UsXG4gIHN0eWxlZCxcbiAgY29sb3JzLFxuICBGbGV4Um93LFxuICBGbGV4Q29sdW1uLFxufSBmcm9tICdmbGlwcGVyJztcbmltcG9ydCBMYXVuY2hTY3JlZW4gZnJvbSAnLi9MYXVuY2hTY3JlZW4nO1xuaW1wb3J0IEJhbm5lciwge2lzQmFubmVyRW5hYmxlZH0gZnJvbSAnLi9CYW5uZXInO1xuaW1wb3J0IFNlbGVjdFNjcmVlbiBmcm9tICcuL1NlbGVjdFNjcmVlbic7XG5pbXBvcnQgRXJyb3JTY3JlZW4gZnJvbSAnLi9FcnJvclNjcmVlbic7XG5pbXBvcnQgQ2hyb21lRGV2VG9vbHMgZnJvbSAnLi9DaHJvbWVEZXZUb29scyc7XG5pbXBvcnQge2dldEZsaXBwZXJMaWJ9IGZyb20gJ2ZsaXBwZXItcGx1Z2luJztcbmltcG9ydCB7SW5jb21wYXRpYmxlTm90aWNlfSBmcm9tICcuL2ZiLXN0dWJzL0luY29tcGF0aWJsZU5vdGljZSc7XG5cbmNvbnN0IFBPTExfU0VDUyA9IDUgKiAxMDAwO1xuY29uc3QgTUVUUk9fUE9SVF9FTlZfVkFSID0gcHJvY2Vzcy5lbnYuTUVUUk9fU0VSVkVSX1BPUlQgfHwgJzgwODEnO1xuY29uc3QgTUVUUk9fUE9SVCA9IGlzTmFOKCtNRVRST19QT1JUX0VOVl9WQVIpID8gJzgwODEnIDogTUVUUk9fUE9SVF9FTlZfVkFSO1xuY29uc3QgTUVUUk9fVVJMID0gbmV3IFVSTCgnaHR0cDovL2xvY2FsaG9zdCcpO1xuTUVUUk9fVVJMLnBvcnQgPSBNRVRST19QT1JUO1xuXG5leHBvcnQgdHlwZSBUYXJnZXQgPSBSZWFkb25seTx7XG4gIGlkOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGZhdmljb25Vcmw6IHN0cmluZztcbiAgZGV2dG9vbHNGcm9udGVuZFVybDogc3RyaW5nO1xuICB0eXBlOiBzdHJpbmc7XG4gIHdlYlNvY2tldERlYnVnZ2VyVXJsOiBzdHJpbmc7XG4gIHZtOiBzdHJpbmc7XG59PjtcblxuZXhwb3J0IHR5cGUgVGFyZ2V0cyA9IFJlYWRvbmx5QXJyYXk8VGFyZ2V0PjtcblxudHlwZSBTdGF0ZSA9IFJlYWRvbmx5PHtcbiAgdGFyZ2V0cz86IFRhcmdldHMgfCBudWxsO1xuICBzZWxlY3RlZFRhcmdldD86IFRhcmdldCB8IG51bGw7XG4gIGVycm9yPzogRXJyb3IgfCBudWxsO1xufT47XG5cbmNvbnN0IENvbnRlbnQgPSBzdHlsZWQoRmxleFJvdykoe1xuICBoZWlnaHQ6ICcxMDAlJyxcbiAgd2lkdGg6ICcxMDAlJyxcbiAgZmxleEdyb3c6IDEsXG4gIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG59KTtcblxuY29uc3QgQ29udGFpbmVyID0gc3R5bGVkKEZsZXhDb2x1bW4pKHtcbiAgaGVpZ2h0OiAnMTAwJScsXG4gIHdpZHRoOiAnMTAwJScsXG4gIGp1c3RpZnlDb250ZW50OiAnZmxleC1zdGFydCcsXG4gIGFsaWduSXRlbXM6ICdmbGV4LXN0YXJ0JyxcbiAgYmFja2dyb3VuZENvbG9yOiBjb2xvcnMubGlnaHQwMixcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEZsaXBwZXJEZXZpY2VQbHVnaW48U3RhdGUsIGFueSwgYW55PiB7XG4gIHN0YXRpYyBzdXBwb3J0c0RldmljZShkZXZpY2U6IERldmljZSkge1xuICAgIHJldHVybiAhZGV2aWNlLmlzQXJjaGl2ZWQgJiYgZGV2aWNlLm9zID09PSAnTWV0cm8nO1xuICB9XG5cbiAgc3RhdGU6IFN0YXRlID0ge1xuICAgIHRhcmdldHM6IG51bGwsXG4gICAgc2VsZWN0ZWRUYXJnZXQ6IG51bGwsXG4gICAgZXJyb3I6IG51bGwsXG4gIH07XG5cbiAgcG9sbD86IE5vZGVKUy5UaW1lb3V0O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIC8vIFRoaXMgaXMgYSBwcmV0dHkgYmFzaWMgcG9sbGluZyBtZWNobmFpc20uIFdlIGFzayBNZXRybyBldmVyeSBQT0xMX1NFQ1Mgd2hhdCB0aGVcbiAgICAvLyBjdXJyZW50IGF2YWlsYWJsZSB0YXJnZXRzIGFyZSBhbmQgb25seSBoYW5kbGUgYSBmZXcgYmFzaWMgc3RhdGUgdHJhbnNpdGlvbnMuXG4gICAgdGhpcy5wb2xsID0gc2V0SW50ZXJ2YWwodGhpcy5jaGVja0RlYnVnVGFyZ2V0cywgUE9MTF9TRUNTKTtcbiAgICB0aGlzLmNoZWNrRGVidWdUYXJnZXRzKCk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBpZiAodGhpcy5wb2xsKSB7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMucG9sbCk7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tEZWJ1Z1RhcmdldHMgPSAoKSA9PiB7XG4gICAgZmV0Y2goYCR7TUVUUk9fVVJMLnRvU3RyaW5nKCl9anNvbmApXG4gICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAvLyBXZSBvbmx5IHdhbnQgdG8gdXNlIHRoZSBDaHJvbWUgUmVsb2FkIHRhcmdldHMuXG4gICAgICAgIGNvbnN0IHRhcmdldHMgPSByZXN1bHQuZmlsdGVyKFxuICAgICAgICAgICh0YXJnZXQ6IGFueSkgPT5cbiAgICAgICAgICAgIHRhcmdldC50aXRsZSA9PT1cbiAgICAgICAgICAgICdSZWFjdCBOYXRpdmUgRXhwZXJpbWVudGFsIChJbXByb3ZlZCBDaHJvbWUgUmVsb2FkcyknLFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIEZpbmQgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCB0YXJnZXQuXG4gICAgICAgIC8vIElmIHRoZSBjdXJyZW50IHNlbGVjdGVkVGFyZ2V0IGlzbid0IHJldHVybmVkLCBjbGVhciBpdC5cbiAgICAgICAgbGV0IGN1cnJlbnRseVNlbGVjdGVkID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWRUYXJnZXQgIT0gbnVsbCkge1xuICAgICAgICAgIGZvciAoY29uc3QgdGFyZ2V0IG9mIHJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkVGFyZ2V0Py53ZWJTb2NrZXREZWJ1Z2dlclVybCA9PT1cbiAgICAgICAgICAgICAgdGFyZ2V0LndlYlNvY2tldERlYnVnZ2VyVXJsXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY3VycmVudGx5U2VsZWN0ZWQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkVGFyZ2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEF1dG8tc2VsZWN0IHRoZSBmaXJzdCB0YXJnZXQgaWYgdGhlcmUgaXMgb25lLFxuICAgICAgICAvLyBidXQgZG9uJ3QgY2hhbmdlIHRoZSBvbmUgdGhhdCdzIGFscmVhZHkgc2VsZWN0ZWQuXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkVGFyZ2V0ID1cbiAgICAgICAgICBjdXJyZW50bHlTZWxlY3RlZCA9PSBudWxsICYmIHRhcmdldHMubGVuZ3RoID09PSAxXG4gICAgICAgICAgICA/IHRhcmdldHNbMF1cbiAgICAgICAgICAgIDogY3VycmVudGx5U2VsZWN0ZWQ7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgICAgdGFyZ2V0cyxcbiAgICAgICAgICBzZWxlY3RlZFRhcmdldCxcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICB0YXJnZXRzOiBudWxsLFxuICAgICAgICAgIHNlbGVjdGVkVGFyZ2V0OiBudWxsLFxuICAgICAgICAgIGVycm9yLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9O1xuXG4gIGhhbmRsZVNlbGVjdCA9IChzZWxlY3RlZFRhcmdldDogVGFyZ2V0KSA9PiB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZFRhcmdldH0pO1xuXG4gIHJlbmRlckNvbnRlbnQoKSB7XG4gICAgY29uc3Qge2Vycm9yLCBzZWxlY3RlZFRhcmdldCwgdGFyZ2V0c30gPSB0aGlzLnN0YXRlO1xuICAgIGlmIChzZWxlY3RlZFRhcmdldCkge1xuICAgICAgbGV0IGJhbm5lck1hcmdpbiA9IG51bGw7XG4gICAgICBpZiAoaXNCYW5uZXJFbmFibGVkKCkpIHtcbiAgICAgICAgYmFubmVyTWFyZ2luID0gJzI5cHgnO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENocm9tZURldlRvb2xzXG4gICAgICAgICAgdXJsPXtzZWxlY3RlZFRhcmdldC5kZXZ0b29sc0Zyb250ZW5kVXJsfVxuICAgICAgICAgIG1hcmdpblRvcD17YmFubmVyTWFyZ2lufVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHRhcmdldHMgIT0gbnVsbCAmJiB0YXJnZXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIDxMYXVuY2hTY3JlZW4gLz47XG4gICAgfSBlbHNlIGlmICh0YXJnZXRzICE9IG51bGwgJiYgdGFyZ2V0cy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gPFNlbGVjdFNjcmVlbiB0YXJnZXRzPXt0YXJnZXRzfSBvblNlbGVjdD17dGhpcy5oYW5kbGVTZWxlY3R9IC8+O1xuICAgIH0gZWxzZSBpZiAoZXJyb3IgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIDxFcnJvclNjcmVlbiBlcnJvcj17ZXJyb3J9IC8+O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgaWYgKGdldEZsaXBwZXJMaWIoKS5lbnZpcm9ubWVudEluZm8uaXNIZWFkbGVzc0J1aWxkKSB7XG4gICAgICByZXR1cm4gPEluY29tcGF0aWJsZU5vdGljZSAvPjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxDb250YWluZXI+XG4gICAgICAgIDxCYW5uZXIgLz5cbiAgICAgICAgPENvbnRlbnQ+e3RoaXMucmVuZGVyQ29udGVudCgpfTwvQ29udGVudD5cbiAgICAgIDwvQ29udGFpbmVyPlxuICAgICk7XG4gIH1cbn1cbiIsICIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZvcm1hdFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG4vLyBUT0RPOiBGaXggdGhpcyB0aGUgbmV4dCB0aW1lIHRoZSBmaWxlIGlzIGVkaXRlZC5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBydWxlc2Rpci9uby1yZXN0cmljdGVkLWltcG9ydHMtY2xvbmVcbmltcG9ydCB7c3R5bGVkLCBGbGV4Q29sdW1uLCBGbGV4Um93LCBUZXh0LCBHbHlwaCwgY29sb3JzfSBmcm9tICdmbGlwcGVyJztcblxuY29uc3QgQ29udGFpbmVyID0gc3R5bGVkKEZsZXhDb2x1bW4pKHtcbiAgaGVpZ2h0OiAnMTAwJScsXG4gIHdpZHRoOiAnMTAwJScsXG4gIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIGJhY2tncm91bmRDb2xvcjogY29sb3JzLmxpZ2h0MDIsXG59KTtcblxuY29uc3QgV2VsY29tZSA9IHN0eWxlZChGbGV4Q29sdW1uKSh7XG4gIHdpZHRoOiA0NjAsXG4gIGJhY2tncm91bmQ6IGNvbG9ycy53aGl0ZSxcbiAgYm9yZGVyUmFkaXVzOiAxMCxcbiAgYm94U2hhZG93OiAnMCAxcHggM3B4IHJnYmEoMCwwLDAsMC4yNSknLFxuICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gIHRyYW5zaXRpb246ICcwLjZzIGFsbCBlYXNlLW91dCcsXG59KTtcblxuY29uc3QgVGl0bGUgPSBzdHlsZWQoVGV4dCkoe1xuICBmb250U2l6ZTogMjQsXG4gIGZvbnRXZWlnaHQ6IDMwMCxcbiAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgY29sb3I6IGNvbG9ycy5saWdodDUwLFxuICBtYXJnaW5Ub3A6IDE2LFxuICBtYXJnaW5Cb3R0b206IDE2LFxufSk7XG5cbmNvbnN0IEl0ZW0gPSBzdHlsZWQoRmxleFJvdykoe1xuICBwYWRkaW5nOiAxMCxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIGJvcmRlclRvcDogYDFweCBzb2xpZCAke2NvbG9ycy5saWdodDEwfWAsXG59KTtcblxuY29uc3QgSXRlbVRpdGxlID0gc3R5bGVkKFRleHQpKHtcbiAgY29sb3I6IGNvbG9ycy5saWdodDUwLFxuICBmb250U2l6ZTogMTQsXG4gIGxpbmVIZWlnaHQ6ICcyMHB4Jyxcbn0pO1xuXG5jb25zdCBCb2xkID0gc3R5bGVkKFRleHQpKHtcbiAgZm9udFdlaWdodDogNjAwLFxufSk7XG5cbmNvbnN0IEljb24gPSBzdHlsZWQoR2x5cGgpKHtcbiAgbWFyZ2luUmlnaHQ6IDExLFxuICBtYXJnaW5MZWZ0OiA2LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExhdW5jaFNjcmVlbigpIHtcbiAgcmV0dXJuIChcbiAgICA8Q29udGFpbmVyPlxuICAgICAgPFdlbGNvbWU+XG4gICAgICAgIDxUaXRsZT5IZXJtZXMgRGVidWdnZXI8L1RpdGxlPlxuICAgICAgICA8SXRlbT5cbiAgICAgICAgICA8SWNvbiBzaXplPXsyMH0gbmFtZT1cInF1ZXN0aW9uLWNpcmNsZVwiIGNvbG9yPXtjb2xvcnMuaW5mb30gLz5cbiAgICAgICAgICA8RmxleENvbHVtbj5cbiAgICAgICAgICAgIDxJdGVtVGl0bGU+XG4gICAgICAgICAgICAgIDxCb2xkPk1ldHJvIGlzIGNvbm5lY3RlZCBidXQgbm8gSGVybWVzIGFwcHMgd2VyZSBmb3VuZC48L0JvbGQ+eycgJ31cbiAgICAgICAgICAgICAgT3BlbiBhIFJlYWN0IE5hdGl2ZSBzY3JlZW4gd2l0aCBIZXJtZXMgZW5hYmxlZCB0byBjb25uZWN0LiBOb3RlOlxuICAgICAgICAgICAgICB5b3UgbWF5IG5lZWQgdG8gcmVsb2FkIHRoZSBhcHAgaW4gb3JkZXIgdG8gcmVjb25uZWN0IHRoZSBkZXZpY2UgdG9cbiAgICAgICAgICAgICAgTWV0cm8uXG4gICAgICAgICAgICA8L0l0ZW1UaXRsZT5cbiAgICAgICAgICA8L0ZsZXhDb2x1bW4+XG4gICAgICAgIDwvSXRlbT5cbiAgICAgIDwvV2VsY29tZT5cbiAgICA8L0NvbnRhaW5lcj5cbiAgKTtcbn1cbiIsICIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZvcm1hdFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG4vLyBUT0RPOiBGaXggdGhpcyB0aGUgbmV4dCB0aW1lIHRoZSBmaWxlIGlzIGVkaXRlZC5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBydWxlc2Rpci9uby1yZXN0cmljdGVkLWltcG9ydHMtY2xvbmVcbmltcG9ydCB7c3R5bGVkLCBjb2xvcnMsIEZsZXhSb3csIFRleHR9IGZyb20gJ2ZsaXBwZXInO1xuaW1wb3J0IHtUeXBvZ3JhcGh5fSBmcm9tICdhbnRkJztcbmltcG9ydCB7Z2V0RmxpcHBlckxpYn0gZnJvbSAnZmxpcHBlci1wbHVnaW4nO1xuXG5jb25zdCBCYW5uZXJDb250YWluZXIgPSBzdHlsZWQoRmxleFJvdykoe1xuICBoZWlnaHQ6ICczMHB4JyxcbiAgd2lkdGg6ICcxMDAlJyxcbiAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgYmFja2dyb3VuZENvbG9yOiAnIzJiYjY3MycsIC8vIEhlcm1lcyBncmVlbi5cbn0pO1xuXG5jb25zdCBCYW5uZXJUZXh0ID0gc3R5bGVkKFRleHQpKHtcbiAgY29sb3I6IGNvbG9ycy53aGl0ZSxcbiAgZm9udFNpemU6IDE0LFxuICBsaW5lSGVpZ2h0OiAnMjBweCcsXG59KTtcblxuY29uc3QgQmFubmVyTGluayA9IHN0eWxlZChDdXN0b21MaW5rKSh7XG4gIGNvbG9yOiBjb2xvcnMud2hpdGUsXG4gIHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lJyxcbiAgJyY6aG92ZXInOiB7XG4gICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgY29sb3I6ICcjMzAzODQ2JyxcbiAgfSxcbn0pO1xuXG5mdW5jdGlvbiBDdXN0b21MaW5rKHByb3BzOiB7XG4gIGhyZWY6IHN0cmluZztcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBjaGlsZHJlbj86IFJlYWN0LlJlYWN0Tm9kZTtcbiAgc3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzO1xufSkge1xuICByZXR1cm4gKFxuICAgIDxUeXBvZ3JhcGh5LkxpbmtcbiAgICAgIGNsYXNzTmFtZT17cHJvcHMuY2xhc3NOYW1lfVxuICAgICAgaHJlZj17cHJvcHMuaHJlZn1cbiAgICAgIHN0eWxlPXtwcm9wcy5zdHlsZX0+XG4gICAgICB7cHJvcHMuY2hpbGRyZW4gfHwgcHJvcHMuaHJlZn1cbiAgICA8L1R5cG9ncmFwaHkuTGluaz5cbiAgKTtcbn1cblxuZXhwb3J0IGNvbnN0IGlzQmFubmVyRW5hYmxlZDogKCkgPT4gYm9vbGVhbiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGdldEZsaXBwZXJMaWIoKS5HSygnZmxpcHBlcl9wbHVnaW5faGVybWVzX2RlYnVnZ2VyX3N1cnZleScpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQmFubmVyKCkge1xuICBpZiAoIWdldEZsaXBwZXJMaWIoKS5HSygnZmxpcHBlcl9wbHVnaW5faGVybWVzX2RlYnVnZ2VyX3N1cnZleScpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIChcbiAgICA8QmFubmVyQ29udGFpbmVyPlxuICAgICAgPEJhbm5lclRleHQ+XG4gICAgICAgIEhlbHAgdXMgaW1wcm92ZSB5b3VyIGRlYnVnZ2luZyBleHBlcmllbmNlIHdpdGggdGhpc3snICd9XG4gICAgICAgIDxCYW5uZXJMaW5rIGhyZWY9XCJodHRwczovL2ZidXJsLmNvbS9oZXJtZXNzdXJ2ZXlcIj5cbiAgICAgICAgICBzaW5nbGUgcGFnZSBzdXJ2ZXlcbiAgICAgICAgPC9CYW5uZXJMaW5rPlxuICAgICAgICAhXG4gICAgICA8L0Jhbm5lclRleHQ+XG4gICAgPC9CYW5uZXJDb250YWluZXI+XG4gICk7XG59XG4iLCAiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIE1ldGEgUGxhdGZvcm1zLCBJbmMuIGFuZCBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmb3JtYXRcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuLy8gVE9ETzogRml4IHRoaXMgdGhlIG5leHQgdGltZSB0aGUgZmlsZSBpcyBlZGl0ZWQuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcnVsZXNkaXIvbm8tcmVzdHJpY3RlZC1pbXBvcnRzLWNsb25lXG5pbXBvcnQge3N0eWxlZCwgRmxleENvbHVtbiwgRmxleFJvdywgVGV4dCwgR2x5cGgsIGNvbG9yc30gZnJvbSAnZmxpcHBlcic7XG5pbXBvcnQge1RhcmdldCwgVGFyZ2V0c30gZnJvbSAnLi9pbmRleCc7XG5cbmNvbnN0IENvbnRhaW5lciA9IHN0eWxlZChGbGV4Q29sdW1uKSh7XG4gIGhlaWdodDogJzEwMCUnLFxuICB3aWR0aDogJzEwMCUnLFxuICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9ycy5saWdodDAyLFxufSk7XG5cbmNvbnN0IFdlbGNvbWUgPSBzdHlsZWQoRmxleENvbHVtbikoe1xuICB3aWR0aDogNDYwLFxuICBiYWNrZ3JvdW5kOiBjb2xvcnMud2hpdGUsXG4gIGJvcmRlclJhZGl1czogMTAsXG4gIGJveFNoYWRvdzogJzAgMXB4IDNweCByZ2JhKDAsMCwwLDAuMjUpJyxcbiAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICB0cmFuc2l0aW9uOiAnMC42cyBhbGwgZWFzZS1vdXQnLFxufSk7XG5cbmNvbnN0IFRpdGxlID0gc3R5bGVkKFRleHQpKHtcbiAgZm9udFNpemU6IDI0LFxuICBmb250V2VpZ2h0OiAzMDAsXG4gIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gIGNvbG9yOiBjb2xvcnMubGlnaHQ1MCxcbiAgbWFyZ2luVG9wOiAxNixcbiAgbWFyZ2luQm90dG9tOiAxNixcbn0pO1xuXG5jb25zdCBJdGVtID0gc3R5bGVkKEZsZXhSb3cpKHtcbiAgcGFkZGluZzogMTAsXG4gIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICBib3JkZXJUb3A6IGAxcHggc29saWQgJHtjb2xvcnMubGlnaHQxMH1gLFxufSk7XG5cbmNvbnN0IEl0ZW1UaXRsZSA9IHN0eWxlZChUZXh0KSh7XG4gIGNvbG9yOiBjb2xvcnMubGlnaHQ1MCxcbiAgZm9udFNpemU6IDE0LFxuICBsaW5lSGVpZ2h0OiAnMjBweCcsXG59KTtcblxuY29uc3QgSWNvbiA9IHN0eWxlZChHbHlwaCkoe1xuICBtYXJnaW5SaWdodDogMTEsXG4gIG1hcmdpbkxlZnQ6IDYsXG59KTtcblxudHlwZSBQcm9wcyA9IHtcbiAgcmVhZG9ubHkgdGFyZ2V0czogVGFyZ2V0cztcbiAgcmVhZG9ubHkgb25TZWxlY3Q6ICh0YXJnZXQ6IFRhcmdldCkgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNlbGVjdFNjcmVlbihwcm9wczogUHJvcHMpIHtcbiAgcmV0dXJuIChcbiAgICA8Q29udGFpbmVyPlxuICAgICAgPFdlbGNvbWU+XG4gICAgICAgIDxUaXRsZT5IZXJtZXMgRGVidWdnZXIgU2VsZWN0PC9UaXRsZT5cbiAgICAgICAgPEl0ZW0+XG4gICAgICAgICAgPEZsZXhDb2x1bW4+XG4gICAgICAgICAgICA8SXRlbVRpdGxlPlBsZWFzZSBzZWxlY3QgYSB0YXJnZXQ6PC9JdGVtVGl0bGU+XG4gICAgICAgICAgPC9GbGV4Q29sdW1uPlxuICAgICAgICA8L0l0ZW0+XG4gICAgICAgIHtwcm9wcy50YXJnZXRzLm1hcCgodGFyZ2V0KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxJdGVtIG9uQ2xpY2s9eygpID0+IHByb3BzLm9uU2VsZWN0KHRhcmdldCl9IGtleT17dGFyZ2V0LmlkfT5cbiAgICAgICAgICAgICAgPEljb24gc2l6ZT17MjB9IG5hbWU9XCJjb2RlXCIgY29sb3I9e2NvbG9ycy5pbmZvfSAvPlxuICAgICAgICAgICAgICA8RmxleENvbHVtbj5cbiAgICAgICAgICAgICAgICA8SXRlbVRpdGxlPnt0YXJnZXQudGl0bGV9PC9JdGVtVGl0bGU+XG4gICAgICAgICAgICAgIDwvRmxleENvbHVtbj5cbiAgICAgICAgICAgIDwvSXRlbT5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cbiAgICAgIDwvV2VsY29tZT5cbiAgICA8L0NvbnRhaW5lcj5cbiAgKTtcbn1cbiIsICIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZvcm1hdFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG4vLyBUT0RPOiBGaXggdGhpcyB0aGUgbmV4dCB0aW1lIHRoZSBmaWxlIGlzIGVkaXRlZC5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBydWxlc2Rpci9uby1yZXN0cmljdGVkLWltcG9ydHMtY2xvbmVcbmltcG9ydCB7c3R5bGVkLCBGbGV4Q29sdW1uLCBGbGV4Um93LCBUZXh0LCBHbHlwaCwgY29sb3JzfSBmcm9tICdmbGlwcGVyJztcblxuY29uc3QgQ29udGFpbmVyID0gc3R5bGVkKEZsZXhDb2x1bW4pKHtcbiAgaGVpZ2h0OiAnMTAwJScsXG4gIHdpZHRoOiAnMTAwJScsXG4gIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIGJhY2tncm91bmRDb2xvcjogY29sb3JzLmxpZ2h0MDIsXG59KTtcblxuY29uc3QgV2VsY29tZSA9IHN0eWxlZChGbGV4Q29sdW1uKSh7XG4gIHdpZHRoOiA0NjAsXG4gIGJhY2tncm91bmQ6IGNvbG9ycy53aGl0ZSxcbiAgYm9yZGVyUmFkaXVzOiAxMCxcbiAgYm94U2hhZG93OiAnMCAxcHggM3B4IHJnYmEoMCwwLDAsMC4yNSknLFxuICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gIHRyYW5zaXRpb246ICcwLjZzIGFsbCBlYXNlLW91dCcsXG59KTtcblxuY29uc3QgVGl0bGUgPSBzdHlsZWQoVGV4dCkoe1xuICBmb250U2l6ZTogMjQsXG4gIGZvbnRXZWlnaHQ6IDMwMCxcbiAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgY29sb3I6IGNvbG9ycy5saWdodDUwLFxuICBtYXJnaW5Ub3A6IDE2LFxuICBtYXJnaW5Cb3R0b206IDE2LFxufSk7XG5cbmNvbnN0IEl0ZW0gPSBzdHlsZWQoRmxleFJvdykoe1xuICBwYWRkaW5nOiAxMCxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIGJvcmRlclRvcDogYDFweCBzb2xpZCAke2NvbG9ycy5saWdodDEwfWAsXG59KTtcblxuY29uc3QgSXRlbVRpdGxlID0gc3R5bGVkKFRleHQpKHtcbiAgY29sb3I6IGNvbG9ycy5saWdodDUwLFxuICBmb250U2l6ZTogMTQsXG4gIGxpbmVIZWlnaHQ6ICcyMHB4Jyxcbn0pO1xuXG5jb25zdCBCb2xkID0gc3R5bGVkKFRleHQpKHtcbiAgZm9udFdlaWdodDogNjAwLFxufSk7XG5cbmNvbnN0IEljb24gPSBzdHlsZWQoR2x5cGgpKHtcbiAgbWFyZ2luUmlnaHQ6IDExLFxuICBtYXJnaW5MZWZ0OiA2LFxufSk7XG5cbi8vIEFzIG1vcmUga25vd24gZmFpbHVyZXMgYXJlIGZvdW5kLCBhZGQgdGhlbSB0byB0aGlzIGxpc3Qgd2l0aCBiZXR0ZXIgZXJyb3IgaW5mb3JtYXRpb24uXG5jb25zdCBLTk9XTl9GQUlMVVJFX01FU1NBR0VTOiBSZWNvcmQ8XG4gIHN0cmluZyxcbiAgUmVjb3JkPCdtZXNzYWdlJyB8ICdoaW50Jywgc3RyaW5nPlxuPiA9IHtcbiAgJ0ZhaWxlZCB0byBmZXRjaCc6IHtcbiAgICAvLyBUaGlzIGlzIHRoZSBlcnJvciB0aGF0IGlzIHJldHVybmVkIHNwZWNpZmNhbGx5IHdoZW4gTWV0cm8gaXMgdHVybmVkIG9mZi5cbiAgICBtZXNzYWdlOiAnTWV0cm8gZGlzY29ubmVjdGVkLicsXG4gICAgaGludDogJ1BsZWFzZSBjaGVjayB0aGF0IG1ldHJvIGlzIHJ1bm5pbmcgYW5kIEZsaXBwZXIgY2FuIGNvbm5lY3QgdG8gaXQuJyxcbiAgfSxcbiAgZGVmYXVsdDoge1xuICAgIC8vIEFsbCB3ZSByZWFsbHkga25vdyBpbiB0aGlzIGNhc2UgaXMgdGhhdCB3ZSBjYW4ndCBjb25uZWN0IHRvIG1ldHJvLlxuICAgIC8vIERvIG5vdCB0cnkgYW5kIGJlIG1vcmUgc3BlY2lmaWMgaGVyZS5cbiAgICBtZXNzYWdlOiAnQ2Fubm90IGNvbm5lY3QgdG8gTWV0cm8uJyxcbiAgICBoaW50OiAnUGxlYXNlIGNoZWNrIHRoYXQgbWV0cm8gaXMgcnVubmluZyBhbmQgRmxpcHBlciBjYW4gY29ubmVjdCB0byBpdC4nLFxuICB9LFxufTtcblxuZnVuY3Rpb24gZ2V0UmVhc29uKGVycm9yOiBFcnJvcikge1xuICBsZXQgZmFpbHVyZV9tZXNzYWdlID0gS05PV05fRkFJTFVSRV9NRVNTQUdFUy5kZWZhdWx0O1xuICBpZiAoZXJyb3IgIT0gbnVsbCAmJiBLTk9XTl9GQUlMVVJFX01FU1NBR0VTW2Vycm9yLm1lc3NhZ2VdKSB7XG4gICAgZmFpbHVyZV9tZXNzYWdlID0gS05PV05fRkFJTFVSRV9NRVNTQUdFU1tlcnJvci5tZXNzYWdlXTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPEl0ZW1UaXRsZT5cbiAgICAgIDxCb2xkPntmYWlsdXJlX21lc3NhZ2UubWVzc2FnZX0gPC9Cb2xkPlxuICAgICAge2ZhaWx1cmVfbWVzc2FnZS5oaW50fVxuICAgIDwvSXRlbVRpdGxlPlxuICApO1xufVxuXG50eXBlIFByb3BzID0gUmVhZG9ubHk8e1xuICBlcnJvcjogRXJyb3I7XG59PjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRXJyb3JTY3JlZW4ocHJvcHM6IFByb3BzKSB7XG4gIHJldHVybiAoXG4gICAgPENvbnRhaW5lcj5cbiAgICAgIDxXZWxjb21lPlxuICAgICAgICA8VGl0bGU+SGVybWVzIERlYnVnZ2VyIEVycm9yPC9UaXRsZT5cbiAgICAgICAgPEl0ZW0+XG4gICAgICAgICAgPEljb24gc2l6ZT17MjB9IG5hbWU9XCJjYXV0aW9uLW9jdGFnb25cIiBjb2xvcj17Y29sb3JzLnJlZH0gLz5cbiAgICAgICAgICA8RmxleENvbHVtbj57Z2V0UmVhc29uKHByb3BzLmVycm9yKX08L0ZsZXhDb2x1bW4+XG4gICAgICAgIDwvSXRlbT5cbiAgICAgIDwvV2VsY29tZT5cbiAgICA8L0NvbnRhaW5lcj5cbiAgKTtcbn1cbiIsICIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZvcm1hdFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG4vLyBUT0RPOiBGaXggdGhpcyB0aGUgbmV4dCB0aW1lIHRoZSBmaWxlIGlzIGVkaXRlZC5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBydWxlc2Rpci9uby1yZXN0cmljdGVkLWltcG9ydHMtY2xvbmVcbmltcG9ydCB7c3R5bGVkLCBjb2xvcnMsIEZsZXhDb2x1bW59IGZyb20gJ2ZsaXBwZXInO1xuXG5jb25zdCBkZXZUb29sc05vZGVJZCA9ICh1cmw6IHN0cmluZykgPT5cbiAgYGhlcm1lcy1jaHJvbWVkZXZ0b29scy1vdXQtb2YtcmVhY3Qtbm9kZS0ke3VybC5yZXBsYWNlKC9cXFcrL2csICctJyl9YDtcblxuLy8gVE9ETzogYnVpbGQgYWJzdHJhY3Rpb24gb2YgdGhpczogVDYyMzA2NzMyXG4vLyBUT0RPOiByZXVzZSByZWFjdGRldnRvb2xzL0RldlRvb2xzRW1iZWRkZXIgZm9yIHRoaXNcbmNvbnN0IFRBUkdFVF9DT05UQUlORVJfSUQgPSAnZmxpcHBlci1vdXQtb2YtY29udGVudHMtY29udGFpbmVyJzsgLy8gc2hvdWxkIGJlIGEgaG9vayBpbiB0aGUgZnV0dXJlXG5cbmZ1bmN0aW9uIGNyZWF0ZURldlRvb2xzTm9kZShcbiAgdXJsOiBzdHJpbmcsXG4gIG1hcmdpblRvcDogc3RyaW5nIHwgbnVsbCxcbik6IEhUTUxFbGVtZW50IHtcbiAgY29uc3QgZXhpc3RpbmcgPSBmaW5kRGV2VG9vbHNOb2RlKHVybCk7XG4gIGlmIChleGlzdGluZykge1xuICAgIHJldHVybiBleGlzdGluZztcbiAgfVxuXG4gIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgd3JhcHBlci5pZCA9IGRldlRvb2xzTm9kZUlkKHVybCk7XG4gIHdyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICB3cmFwcGVyLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuXG4gIGNvbnN0IGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXG4gICAgJ3dlYnZpZXcnLFxuICApIGFzIHVua25vd24gYXMgSFRNTElGcmFtZUVsZW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gIGlmcmFtZS5zdHlsZS53aWR0aCA9ICcxMDAlJztcblxuICAvLyBIQUNLOiBjaHJvbWUtZGV2dG9vbHM6Ly8gaXMgYmxvY2tlZCBieSB0aGUgc2FuZGJveCBidXQgZGV2dG9vbHM6Ly8gaXNuJ3QgZm9yIHNvbWUgcmVhc29uLlxuICBpZnJhbWUuc3JjID0gdXJsLnJlcGxhY2UoL15jaHJvbWUtLywgJycpO1xuXG4gIHdyYXBwZXIuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcblxuICBpZiAobWFyZ2luVG9wKSB7XG4gICAgLy8gVE9ETzogRml4IHRoaXMgdGhlIG5leHQgdGltZSB0aGUgZmlsZSBpcyBlZGl0ZWQuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChUQVJHRVRfQ09OVEFJTkVSX0lEKSEuc3R5bGUubWFyZ2luVG9wID0gbWFyZ2luVG9wO1xuICB9XG5cbiAgLy8gVE9ETzogRml4IHRoaXMgdGhlIG5leHQgdGltZSB0aGUgZmlsZSBpcyBlZGl0ZWQuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFRBUkdFVF9DT05UQUlORVJfSUQpIS5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcbiAgcmV0dXJuIHdyYXBwZXI7XG59XG5cbmZ1bmN0aW9uIGZpbmREZXZUb29sc05vZGUodXJsOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB8IG51bGwge1xuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7ZGV2VG9vbHNOb2RlSWQodXJsKX1gKTtcbn1cblxuZnVuY3Rpb24gYXR0YWNoRGV2VG9vbHMoZGV2VG9vbHNOb2RlOiBIVE1MRWxlbWVudCkge1xuICBkZXZUb29sc05vZGUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIC8vIFRPRE86IEZpeCB0aGlzIHRoZSBuZXh0IHRpbWUgdGhlIGZpbGUgaXMgZWRpdGVkLlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChUQVJHRVRfQ09OVEFJTkVSX0lEKSEuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIC8vIFRPRE86IEZpeCB0aGlzIHRoZSBuZXh0IHRpbWUgdGhlIGZpbGUgaXMgZWRpdGVkLlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChUQVJHRVRfQ09OVEFJTkVSX0lEKSEucGFyZW50RWxlbWVudCEuc3R5bGUuZGlzcGxheSA9XG4gICAgJ2Jsb2NrJztcbiAgLy8gVE9ETzogRml4IHRoaXMgdGhlIG5leHQgdGltZSB0aGUgZmlsZSBpcyBlZGl0ZWQuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFRBUkdFVF9DT05UQUlORVJfSUQpIS5wYXJlbnRFbGVtZW50IS5zdHlsZS5oZWlnaHQgPVxuICAgICcxMDAlJztcbn1cblxuZnVuY3Rpb24gZGV0YWNoRGV2VG9vbHMoZGV2VG9vbHNOb2RlOiBIVE1MRWxlbWVudCB8IG51bGwpIHtcbiAgLy8gVE9ETzogRml4IHRoaXMgdGhlIG5leHQgdGltZSB0aGUgZmlsZSBpcyBlZGl0ZWQuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFRBUkdFVF9DT05UQUlORVJfSUQpIS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAvLyBUT0RPOiBGaXggdGhpcyB0aGUgbmV4dCB0aW1lIHRoZSBmaWxlIGlzIGVkaXRlZC5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoVEFSR0VUX0NPTlRBSU5FUl9JRCkhLnBhcmVudEVsZW1lbnQhLnN0eWxlLmRpc3BsYXkgPVxuICAgICdub25lJztcblxuICBpZiAoZGV2VG9vbHNOb2RlKSB7XG4gICAgZGV2VG9vbHNOb2RlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cbn1cblxuY29uc3QgRW1wdHlDb250YWluZXIgPSBzdHlsZWQoRmxleENvbHVtbikoe1xuICBoZWlnaHQ6ICcxMDAlJyxcbiAgd2lkdGg6ICcxMDAlJyxcbiAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgYmFja2dyb3VuZENvbG9yOiBjb2xvcnMubGlnaHQwMixcbn0pO1xuXG50eXBlIENocm9tZURldlRvb2xzUHJvcHMgPSB7XG4gIHVybDogc3RyaW5nO1xuICBtYXJnaW5Ub3A6IHN0cmluZyB8IG51bGw7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaHJvbWVEZXZUb29scyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxDaHJvbWVEZXZUb29sc1Byb3BzPiB7XG4gIGNyZWF0ZURldlRvb2xzKHVybDogc3RyaW5nLCBtYXJnaW5Ub3A6IHN0cmluZyB8IG51bGwpIHtcbiAgICBjb25zdCBkZXZUb29sc05vZGUgPSBjcmVhdGVEZXZUb29sc05vZGUodXJsLCBtYXJnaW5Ub3ApO1xuICAgIGF0dGFjaERldlRvb2xzKGRldlRvb2xzTm9kZSk7XG4gIH1cblxuICBoaWRlRGV2VG9vbHMoX3VybDogc3RyaW5nKSB7XG4gICAgZGV0YWNoRGV2VG9vbHMoZmluZERldlRvb2xzTm9kZSh0aGlzLnByb3BzLnVybCkpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5jcmVhdGVEZXZUb29scyh0aGlzLnByb3BzLnVybCwgdGhpcy5wcm9wcy5tYXJnaW5Ub3ApO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5oaWRlRGV2VG9vbHModGhpcy5wcm9wcy51cmwpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wczogQ2hyb21lRGV2VG9vbHNQcm9wcykge1xuICAgIGNvbnN0IG9sZFVybCA9IHByZXZQcm9wcy51cmw7XG4gICAgY29uc3QgbmV3VXJsID0gdGhpcy5wcm9wcy51cmw7XG4gICAgaWYgKG9sZFVybCAhPSBuZXdVcmwpIHtcbiAgICAgIHRoaXMuaGlkZURldlRvb2xzKG9sZFVybCk7XG4gICAgICB0aGlzLmNyZWF0ZURldlRvb2xzKG5ld1VybCwgdGhpcy5wcm9wcy5tYXJnaW5Ub3ApO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gPEVtcHR5Q29udGFpbmVyIC8+O1xuICB9XG59XG4iLCAiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIE1ldGEgUGxhdGZvcm1zLCBJbmMuIGFuZCBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmb3JtYXRcbiAqL1xuXG5pbXBvcnQge0xheW91dCwgZ2V0RmxpcHBlckxpYn0gZnJvbSAnZmxpcHBlci1wbHVnaW4nO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7QnV0dG9ufSBmcm9tICdhbnRkJztcblxuZXhwb3J0IGNvbnN0IEluY29tcGF0aWJsZU5vdGljZSA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8TGF5b3V0LkNvbnRhaW5lclxuICAgICAgcGFkPVwibWVkaXVtXCJcbiAgICAgIHN0eWxlPXt7bWF4V2lkdGg6IDM1MCwgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbjogJ2F1dG8nfX0+XG4gICAgICA8aDEgc3R5bGU9e3tmb250U2l6ZTogMjB9fT5JbmNvbXBhdGliaWxpdHkgbm90aWNlPC9oMT5cbiAgICAgIDxwPlxuICAgICAgICBUaGlzIHBsdWdpbiBpcyBub3QgY29tcGF0aWJsZSB3aXRoIHRoZSBpbi1icm93c2VyIEZsaXBwZXIgZGlzdHJpYnV0aW9uLlxuICAgICAgPC9wPlxuICAgICAgPHA+XG4gICAgICAgIFBsZWFzZSwgaW5zdGFsbCBvdXIgbGFzdCBFbGVjdHJvbiByZWxlYXNlIHYwLjIzOS4wIHRvIHVzZSB0aGlzIHBsdWdpbi5cbiAgICAgIDwvcD5cbiAgICAgIDxkaXYgc3R5bGU9e3tkaXNwbGF5OiAnaW5saW5lLWJsb2NrJywgdGV4dEFsaWduOiAnY2VudGVyJ319PlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgdHlwZT1cInByaW1hcnlcIlxuICAgICAgICAgIGJsb2NrXG4gICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgIGdldEZsaXBwZXJMaWIoKS5vcGVuTGluayhcbiAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9mbGlwcGVyL3JlbGVhc2VzL3RhZy92MC4yMzkuMCcsXG4gICAgICAgICAgICApXG4gICAgICAgICAgfT5cbiAgICAgICAgICBJbnN0YWxsXG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9MYXlvdXQuQ29udGFpbmVyPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVNBLElBQUFBLGdCQUFrQjtBQUdsQixJQUFBQyxrQkFPTzs7O0FDVlAsbUJBQWtCO0FBR2xCLHFCQUErRDtBQUUvRCxJQUFNLGdCQUFZLHVCQUFPLHlCQUFVLEVBQUU7QUFBQSxFQUNuQyxRQUFRO0FBQUEsRUFDUixPQUFPO0FBQUEsRUFDUCxnQkFBZ0I7QUFBQSxFQUNoQixZ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SyxNQUFNO0FBQ2Isb0JBQWMsS0FBSyxJQUFJO0FBQUEsSUFDekI7QUFBQSxFQUNGO0FBQUEsRUFtREEsZ0JBQWdCO0FBQ2QsVUFBTSxFQUFDLE9BQU8sZ0JBQWdCLFFBQU8sSUFBSSxLQUFLO0FBQzlDLFFBQUksZ0JBQWdCO0FBQ2xCLFVBQUksZUFBZTtBQUNuQixVQUFJLGdCQUFnQixHQUFHO0FBQ3JCLHVCQUFlO0FBQUEsTUFDakI7QUFDQSxhQUNFLDhCQUFBQyxRQUFBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxLQUFLLGVBQWU7QUFBQSxVQUNwQixXQUFXO0FBQUE7QUFBQSxNQUNiO0FBQUEsSUFFSixXQUFXLFdBQVcsUUFBUSxRQUFRLFdBQVcsR0FBRztBQUNsRCxhQUFPLDhCQUFBQSxRQUFBLGNBQUMsa0JBQWE7QUFBQSxJQUN2QixXQUFXLFdBQVcsUUFBUSxRQUFRLFNBQVMsR0FBRztBQUNoRCxhQUFPLDhCQUFBQSxRQUFBLGNBQUMsZ0JBQWEsU0FBa0IsVUFBVSxLQUFLLGNBQWM7QUFBQSxJQUN0RSxXQUFXLFNBQVMsTUFBTTtBQUN4QixhQUFPLDhCQUFBQSxRQUFBLGNBQUMsZUFBWSxPQUFjO0FBQUEsSUFDcEMsT0FBTztBQUNMLGFBQU87QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUFBLEVBRUEsU0FBUztBQUNQLFlBQUksc0NBQWMsRUFBRSxnQkFBZ0IsaUJBQWlCO0FBQ25ELGFBQU8sOEJBQUFBLFFBQUEsY0FBQyx3QkFBbUI7QUFBQSxJQUM3QjtBQUNBLFdBQ0UsOEJBQUFBLFFBQUEsY0FBQ0QsWUFBQSxNQUNDLDhCQUFBQyxRQUFBLGNBQUMsWUFBTyxHQUNSLDhCQUFBQSxRQUFBLGNBQUMsZUFBUyxLQUFLLGNBQWMsQ0FBRSxDQUNqQztBQUFBLEVBRUo7QUFDRjsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9mbGlwcGVyIiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfZmxpcHBlciIsICJSZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2ZsaXBwZXIiLCAiQ29udGFpbmVyIiwgIldlbGNvbWUiLCAiVGl0bGUiLCAiSXRlbSIsICJJdGVtVGl0bGUiLCAiSWNvbiIsICJSZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2ZsaXBwZXIiLCAiQ29udGFpbmVyIiwgIldlbGNvbWUiLCAiVGl0bGUiLCAiSXRlbSIsICJJdGVtVGl0bGUiLCAiQm9sZCIsICJJY29uIiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfZmxpcHBlciIsICJSZWFjdCIsICJpbXBvcnRfZmxpcHBlcl9wbHVnaW4iLCAiaW1wb3J0X2ZsaXBwZXJfcGx1Z2luIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfYW50ZCIsICJSZWFjdCIsICJDb250YWluZXIiLCAiUmVhY3QiXQp9Cg==
