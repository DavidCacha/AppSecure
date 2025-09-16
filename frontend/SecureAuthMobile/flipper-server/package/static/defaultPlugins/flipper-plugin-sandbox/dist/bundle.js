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

// plugins/public/sandbox/index.tsx
var sandbox_exports = {};
__export(sandbox_exports, {
  Component: () => Component,
  plugin: () => plugin
});
module.exports = __toCommonJS(sandbox_exports);
var import_react = __toESM(require("react"));
var import_antd = require("antd");
var import_flipper_plugin = require("flipper-plugin");

// plugins/public/sandbox/fb-stubs/internBox.tsx
var InternBox = () => null;

// plugins/public/sandbox/index.tsx
function plugin(client) {
  const sandboxes = (0, import_flipper_plugin.createState)([]);
  const customSandbox = (0, import_flipper_plugin.createState)("");
  const isLoadingSandboxes = (0, import_flipper_plugin.createState)(false);
  client.onConnect(() => {
    isLoadingSandboxes.set(true);
    client.send("getSandbox", void 0).then((results) => {
      sandboxes.set(results);
      isLoadingSandboxes.set(false);
    }).catch((e) => {
      console.error("[sandbox] getSandbox call failed:", e);
      isLoadingSandboxes.set(false);
      displayError(e);
    });
  });
  const onSendSandboxEnvironment = (sandbox) => {
    client.send("setSandbox", {
      sandbox
    }).then((result) => {
      if (result.result)
        displaySuccess(`Update to ${sandbox} successful`);
      else
        displayError(`Update to ${sandbox} failed`);
    }).catch((e) => {
      console.error("[sandbox] setSandbox call failed:", e);
      displayError(e);
    });
  };
  const onChangeSandbox = (e) => {
    customSandbox.set(e.target.value);
  };
  const displaySuccess = (title) => {
    import_antd.message.success(title);
  };
  const displayError = (title) => {
    import_antd.message.error(title);
  };
  return {
    client,
    onChangeSandbox,
    onSendSandboxEnvironment,
    customSandbox,
    sandboxes,
    isLoadingSandboxes
  };
}
function Component() {
  const instance = (0, import_flipper_plugin.usePlugin)(plugin);
  const customSandbox = (0, import_flipper_plugin.useValue)(instance.customSandbox);
  const sandboxes = (0, import_flipper_plugin.useValue)(instance.sandboxes);
  const isLoadingSandboxes = (0, import_flipper_plugin.useValue)(instance.isLoadingSandboxes);
  return /* @__PURE__ */ import_react.default.createElement(import_flipper_plugin.Layout.Container, { center: true, pad: "medium" }, /* @__PURE__ */ import_react.default.createElement(
    import_flipper_plugin.Layout.Container,
    {
      center: true,
      gap: true,
      style: {
        width: "350px"
      }
    },
    (0, import_flipper_plugin.getFlipperLib)().isFB ? /* @__PURE__ */ import_react.default.createElement(InternBox, null) : /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_antd.Typography.Text, { type: "secondary" }, "Select the environment:"), /* @__PURE__ */ import_react.default.createElement(import_antd.Spin, { spinning: isLoadingSandboxes }), sandboxes.map((sandbox) => /* @__PURE__ */ import_react.default.createElement(
      import_antd.Button,
      {
        key: sandbox.value,
        onClick: () => instance.onSendSandboxEnvironment(sandbox.value),
        style: {
          width: "100%"
        }
      },
      sandbox.name
    )), /* @__PURE__ */ import_react.default.createElement(import_antd.Typography.Text, { type: "secondary" }, "Provide custom Sandbox URL"), /* @__PURE__ */ import_react.default.createElement(import_antd.Input.Group, { compact: true }, /* @__PURE__ */ import_react.default.createElement(
      import_antd.Input,
      {
        style: {
          width: "calc(100% - 80px)"
        },
        placeholder: "e.g. unixname.sb.facebook.com",
        onChange: instance.onChangeSandbox,
        onKeyPress: (event) => {
          if (event.key === "Enter") {
            instance.onSendSandboxEnvironment(customSandbox);
          }
        }
      }
    ), /* @__PURE__ */ import_react.default.createElement(
      import_antd.Button,
      {
        type: "primary",
        onClick: () => instance.onSendSandboxEnvironment(customSandbox),
        disabled: customSandbox == null
      },
      "Submit"
    )))
  ));
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vaW5kZXgudHN4IiwgIi4uL2ZiLXN0dWJzL2ludGVybkJveC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogQ29weXJpZ2h0IChjKSBNZXRhIFBsYXRmb3JtcywgSW5jLiBhbmQgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZm9ybWF0XG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7Q2hhbmdlRXZlbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7QnV0dG9uLCBJbnB1dCwgVHlwb2dyYXBoeSwgU3BpbiwgbWVzc2FnZX0gZnJvbSAnYW50ZCc7XG5pbXBvcnQge1xuICBQbHVnaW5DbGllbnQsXG4gIGNyZWF0ZVN0YXRlLFxuICB1c2VQbHVnaW4sXG4gIHVzZVZhbHVlLFxuICBMYXlvdXQsXG4gIGdldEZsaXBwZXJMaWIsXG59IGZyb20gJ2ZsaXBwZXItcGx1Z2luJztcbmltcG9ydCB7SW50ZXJuQm94fSBmcm9tICcuL2ZiLXN0dWJzL2ludGVybkJveCc7XG5cbmV4cG9ydCB0eXBlIFNhbmRib3ggPSB7XG4gIG5hbWU6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbn07XG5cbnR5cGUgQ2xpZW50TWV0aG9kcyA9IHtcbiAgZ2V0U2FuZGJveCgpOiBQcm9taXNlPFNhbmRib3hbXT47XG4gIHNldFNhbmRib3goc2FuZGJveDoge3NhbmRib3g6IHN0cmluZ30pOiBQcm9taXNlPFNldFNhbmRib3hSZXN1bHQ+O1xufTtcblxudHlwZSBTZXRTYW5kYm94UmVzdWx0ID0ge3Jlc3VsdDogYm9vbGVhbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBwbHVnaW4oY2xpZW50OiBQbHVnaW5DbGllbnQ8e30sIENsaWVudE1ldGhvZHM+KSB7XG4gIGNvbnN0IHNhbmRib3hlcyA9IGNyZWF0ZVN0YXRlPEFycmF5PFNhbmRib3g+PihbXSk7XG4gIGNvbnN0IGN1c3RvbVNhbmRib3ggPSBjcmVhdGVTdGF0ZTxzdHJpbmc+KCcnKTtcbiAgY29uc3QgaXNMb2FkaW5nU2FuZGJveGVzID0gY3JlYXRlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIGNsaWVudC5vbkNvbm5lY3QoKCkgPT4ge1xuICAgIGlzTG9hZGluZ1NhbmRib3hlcy5zZXQodHJ1ZSk7XG4gICAgY2xpZW50XG4gICAgICAuc2VuZCgnZ2V0U2FuZGJveCcsIHVuZGVmaW5lZClcbiAgICAgIC50aGVuKChyZXN1bHRzOiBBcnJheTxTYW5kYm94PikgPT4ge1xuICAgICAgICBzYW5kYm94ZXMuc2V0KHJlc3VsdHMpO1xuICAgICAgICBpc0xvYWRpbmdTYW5kYm94ZXMuc2V0KGZhbHNlKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignW3NhbmRib3hdIGdldFNhbmRib3ggY2FsbCBmYWlsZWQ6JywgZSk7XG4gICAgICAgIGlzTG9hZGluZ1NhbmRib3hlcy5zZXQoZmFsc2UpO1xuICAgICAgICBkaXNwbGF5RXJyb3IoZSk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgY29uc3Qgb25TZW5kU2FuZGJveEVudmlyb25tZW50ID0gKHNhbmRib3g6IHN0cmluZykgPT4ge1xuICAgIGNsaWVudFxuICAgICAgLnNlbmQoJ3NldFNhbmRib3gnLCB7XG4gICAgICAgIHNhbmRib3gsXG4gICAgICB9KVxuICAgICAgLnRoZW4oKHJlc3VsdDogU2V0U2FuZGJveFJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAocmVzdWx0LnJlc3VsdCkgZGlzcGxheVN1Y2Nlc3MoYFVwZGF0ZSB0byAke3NhbmRib3h9IHN1Y2Nlc3NmdWxgKTtcbiAgICAgICAgZWxzZSBkaXNwbGF5RXJyb3IoYFVwZGF0ZSB0byAke3NhbmRib3h9IGZhaWxlZGApO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdbc2FuZGJveF0gc2V0U2FuZGJveCBjYWxsIGZhaWxlZDonLCBlKTtcbiAgICAgICAgZGlzcGxheUVycm9yKGUpO1xuICAgICAgfSk7XG4gIH07XG5cbiAgY29uc3Qgb25DaGFuZ2VTYW5kYm94ID0gKGU6IENoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgY3VzdG9tU2FuZGJveC5zZXQoZS50YXJnZXQudmFsdWUpO1xuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlTdWNjZXNzID0gKHRpdGxlOiBzdHJpbmcpID0+IHtcbiAgICBtZXNzYWdlLnN1Y2Nlc3ModGl0bGUpO1xuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlFcnJvciA9ICh0aXRsZTogc3RyaW5nKSA9PiB7XG4gICAgbWVzc2FnZS5lcnJvcih0aXRsZSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBjbGllbnQsXG4gICAgb25DaGFuZ2VTYW5kYm94LFxuICAgIG9uU2VuZFNhbmRib3hFbnZpcm9ubWVudCxcbiAgICBjdXN0b21TYW5kYm94LFxuICAgIHNhbmRib3hlcyxcbiAgICBpc0xvYWRpbmdTYW5kYm94ZXMsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDb21wb25lbnQoKSB7XG4gIGNvbnN0IGluc3RhbmNlID0gdXNlUGx1Z2luKHBsdWdpbik7XG4gIGNvbnN0IGN1c3RvbVNhbmRib3ggPSB1c2VWYWx1ZShpbnN0YW5jZS5jdXN0b21TYW5kYm94KTtcbiAgY29uc3Qgc2FuZGJveGVzID0gdXNlVmFsdWUoaW5zdGFuY2Uuc2FuZGJveGVzKTtcbiAgY29uc3QgaXNMb2FkaW5nU2FuZGJveGVzID0gdXNlVmFsdWUoaW5zdGFuY2UuaXNMb2FkaW5nU2FuZGJveGVzKTtcblxuICByZXR1cm4gKFxuICAgIDxMYXlvdXQuQ29udGFpbmVyIGNlbnRlciBwYWQ9XCJtZWRpdW1cIj5cbiAgICAgIDxMYXlvdXQuQ29udGFpbmVyXG4gICAgICAgIGNlbnRlclxuICAgICAgICBnYXBcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICB3aWR0aDogJzM1MHB4JyxcbiAgICAgICAgfX0+XG4gICAgICAgIHtnZXRGbGlwcGVyTGliKCkuaXNGQiA/IChcbiAgICAgICAgICA8SW50ZXJuQm94IC8+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIDxUeXBvZ3JhcGh5LlRleHQgdHlwZT1cInNlY29uZGFyeVwiPlxuICAgICAgICAgICAgICBTZWxlY3QgdGhlIGVudmlyb25tZW50OlxuICAgICAgICAgICAgPC9UeXBvZ3JhcGh5LlRleHQ+XG4gICAgICAgICAgICA8U3BpbiBzcGlubmluZz17aXNMb2FkaW5nU2FuZGJveGVzfSAvPlxuICAgICAgICAgICAge3NhbmRib3hlcy5tYXAoKHNhbmRib3gpID0+IChcbiAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgIGtleT17c2FuZGJveC52YWx1ZX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBpbnN0YW5jZS5vblNlbmRTYW5kYm94RW52aXJvbm1lbnQoc2FuZGJveC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAge3NhbmRib3gubmFtZX1cbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDxUeXBvZ3JhcGh5LlRleHQgdHlwZT1cInNlY29uZGFyeVwiPlxuICAgICAgICAgICAgICBQcm92aWRlIGN1c3RvbSBTYW5kYm94IFVSTFxuICAgICAgICAgICAgPC9UeXBvZ3JhcGh5LlRleHQ+XG4gICAgICAgICAgICA8SW5wdXQuR3JvdXAgY29tcGFjdD5cbiAgICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiAnY2FsYygxMDAlIC0gODBweCknLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJlLmcuIHVuaXhuYW1lLnNiLmZhY2Vib29rLmNvbVwiXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e2luc3RhbmNlLm9uQ2hhbmdlU2FuZGJveH1cbiAgICAgICAgICAgICAgICBvbktleVByZXNzPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2Uub25TZW5kU2FuZGJveEVudmlyb25tZW50KGN1c3RvbVNhbmRib3gpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaW5zdGFuY2Uub25TZW5kU2FuZGJveEVudmlyb25tZW50KGN1c3RvbVNhbmRib3gpfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtjdXN0b21TYW5kYm94ID09IG51bGx9PlxuICAgICAgICAgICAgICAgIFN1Ym1pdFxuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDwvSW5wdXQuR3JvdXA+XG4gICAgICAgICAgPC8+XG4gICAgICAgICl9XG4gICAgICA8L0xheW91dC5Db250YWluZXI+XG4gICAgPC9MYXlvdXQuQ29udGFpbmVyPlxuICApO1xufVxuIiwgIi8qKlxuICogQ29weXJpZ2h0IChjKSBNZXRhIFBsYXRmb3JtcywgSW5jLiBhbmQgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZm9ybWF0XG4gKi9cblxuZXhwb3J0IGNvbnN0IEludGVybkJveCA9ICgpID0+IG51bGw7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVNBLG1CQUFpQztBQUNqQyxrQkFBdUQ7QUFDdkQsNEJBT087OztBQ1RBLElBQU0sWUFBWSxNQUFNOzs7QUR3QnhCLFNBQVMsT0FBTyxRQUF5QztBQUM5RCxRQUFNLGdCQUFZLG1DQUE0QixDQUFDLENBQUM7QUFDaEQsUUFBTSxvQkFBZ0IsbUNBQW9CLEVBQUU7QUFDNUMsUUFBTSx5QkFBcUIsbUNBQXFCLEtBQUs7QUFFckQsU0FBTyxVQUFVLE1BQU07QUFDckIsdUJBQW1CLElBQUksSUFBSTtBQUMzQixXQUNHLEtBQUssY0FBYyxNQUFTLEVBQzVCLEtBQUssQ0FBQyxZQUE0QjtBQUNqQyxnQkFBVSxJQUFJLE9BQU87QUFDckIseUJBQW1CLElBQUksS0FBSztBQUFBLElBQzlCLENBQUMsRUFDQSxNQUFNLENBQUMsTUFBTTtBQUNaLGNBQVEsTUFBTSxxQ0FBcUMsQ0FBQztBQUNwRCx5QkFBbUIsSUFBSSxLQUFLO0FBQzVCLG1CQUFhLENBQUM7QUFBQSxJQUNoQixDQUFDO0FBQUEsRUFDTCxDQUFDO0FBRUQsUUFBTSwyQkFBMkIsQ0FBQyxZQUFvQjtBQUNwRCxXQUNHLEtBQUssY0FBYztBQUFBLE1BQ2xCO0FBQUEsSUFDRixDQUFDLEVBQ0EsS0FBSyxDQUFDLFdBQTZCO0FBQ2xDLFVBQUksT0FBTztBQUFRLHVCQUFlLGFBQWEsb0JBQW9CO0FBQUE7QUFDOUQscUJBQWEsYUFBYSxnQkFBZ0I7QUFBQSxJQUNqRCxDQUFDLEVBQ0EsTUFBTSxDQUFDLE1BQU07QUFDWixjQUFRLE1BQU0scUNBQXFDLENBQUM7QUFDcEQsbUJBQWEsQ0FBQztBQUFBLElBQ2hCLENBQUM7QUFBQSxFQUNMO0FBRUEsUUFBTSxrQkFBa0IsQ0FBQyxNQUFxQztBQUM1RCxrQkFBYyxJQUFJLEVBQUUsT0FBTyxLQUFLO0FBQUEsRUFDbEM7QUFFQSxRQUFNLGlCQUFpQixDQUFDLFVBQWtCO0FBQ3hDLHdCQUFRLFFBQVEsS0FBSztBQUFBLEVBQ3ZCO0FBRUEsUUFBTSxlQUFlLENBQUMsVUFBa0I7QUFDdEMsd0JBQVEsTUFBTSxLQUFLO0FBQUEsRUFDckI7QUFFQSxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNGO0FBRU8sU0FBUyxZQUFZO0FBQzFCLFFBQU0sZUFBVyxpQ0FBVSxNQUFNO0FBQ2pDLFFBQU0sb0JBQWdCLGdDQUFTLFNBQVMsYUFBYTtBQUNyRCxRQUFNLGdCQUFZLGdDQUFTLFNBQVMsU0FBUztBQUM3QyxRQUFNLHlCQUFxQixnQ0FBUyxTQUFTLGtCQUFrQjtBQUUvRCxTQUNFLDZCQUFBQSxRQUFBLGNBQUMsNkJBQU8sV0FBUCxFQUFpQixRQUFNLE1BQUMsS0FBSSxZQUMzQiw2QkFBQUEsUUFBQTtBQUFBLElBQUMsNkJBQU87QUFBQSxJQUFQO0FBQUEsTUFDQyxRQUFNO0FBQUEsTUFDTixLQUFHO0FBQUEsTUFDSCxPQUFPO0FBQUEsUUFDTCxPQUFPO0FBQUEsTUFDVDtBQUFBO0FBQUEsUUFDQyxxQ0FBYyxFQUFFLE9BQ2YsNkJBQUFBLFFBQUEsY0FBQyxlQUFVLElBRVgsNkJBQUFBLFFBQUEsMkJBQUFBLFFBQUEsZ0JBQ0UsNkJBQUFBLFFBQUEsY0FBQyx1QkFBVyxNQUFYLEVBQWdCLE1BQUssZUFBWSx5QkFFbEMsR0FDQSw2QkFBQUEsUUFBQSxjQUFDLG9CQUFLLFVBQVUsb0JBQW9CLEdBQ25DLFVBQVUsSUFBSSxDQUFDLFlBQ2QsNkJBQUFBLFFBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLEtBQUssUUFBUTtBQUFBLFFBQ2IsU0FBUyxNQUFNLFNBQVMseUJBQXlCLFFBQVEsS0FBSztBQUFBLFFBQzlELE9BQU87QUFBQSxVQUNMLE9BQU87QUFBQSxRQUNUO0FBQUE7QUFBQSxNQUNDLFFBQVE7QUFBQSxJQUNYLENBQ0QsR0FDRCw2QkFBQUEsUUFBQSxjQUFDLHVCQUFXLE1BQVgsRUFBZ0IsTUFBSyxlQUFZLDRCQUVsQyxHQUNBLDZCQUFBQSxRQUFBLGNBQUMsa0JBQU0sT0FBTixFQUFZLFNBQU8sUUFDbEIsNkJBQUFBLFFBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLE9BQU87QUFBQSxVQUNMLE9BQU87QUFBQSxRQUNUO0FBQUEsUUFDQSxhQUFZO0FBQUEsUUFDWixVQUFVLFNBQVM7QUFBQSxRQUNuQixZQUFZLENBQUMsVUFBVTtBQUNyQixjQUFJLE1BQU0sUUFBUSxTQUFTO0FBQ3pCLHFCQUFTLHlCQUF5QixhQUFhO0FBQUEsVUFDakQ7QUFBQSxRQUNGO0FBQUE7QUFBQSxJQUNGLEdBQ0EsNkJBQUFBLFFBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLE1BQUs7QUFBQSxRQUNMLFNBQVMsTUFBTSxTQUFTLHlCQUF5QixhQUFhO0FBQUEsUUFDOUQsVUFBVSxpQkFBaUI7QUFBQTtBQUFBLE1BQU07QUFBQSxJQUVuQyxDQUNGLENBQ0Y7QUFBQSxFQUVKLENBQ0Y7QUFFSjsiLAogICJuYW1lcyI6IFsiUmVhY3QiXQp9Cg==
