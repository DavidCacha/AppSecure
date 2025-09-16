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

// plugins/public/example/index.tsx
var example_exports = {};
__export(example_exports, {
  Component: () => Component,
  plugin: () => plugin
});
module.exports = __toCommonJS(example_exports);
var import_flipper_plugin = require("flipper-plugin");
var import_antd = require("antd");
var import_react = __toESM(require("react"));
var { Text } = import_antd.Typography;
function plugin(client) {
  const receivedMessage = (0, import_flipper_plugin.createState)("");
  const prompt = (0, import_flipper_plugin.createState)(
    "Type a message below to see it displayed on the mobile app"
  );
  const nextMessage = (0, import_flipper_plugin.createState)("");
  client.onMessage("triggerNotification", ({ id }) => {
    client.showNotification({
      id: `test-notification:${id}`,
      message: "Example Notification",
      severity: "warning",
      title: `Notification: ${id}`
    });
  });
  client.onMessage("displayMessage", ({ msg }) => {
    receivedMessage.set(msg);
  });
  async function sendMessage() {
    if (client.isConnected) {
      try {
        const response = await client.send("displayMessage", {
          message: nextMessage.get() || "Weeeee!"
        });
        prompt.set(response.greeting || "Nice");
        nextMessage.set("");
      } catch (e) {
        console.warn("Error returned from client", e);
        import_antd.message.error(`Failed to get response from client ${e}`);
      }
    }
  }
  return {
    sendMessage,
    prompt,
    nextMessage,
    receivedMessage
  };
}
function Component() {
  const instance = (0, import_flipper_plugin.usePlugin)(plugin);
  const prompt = (0, import_flipper_plugin.useValue)(instance.prompt);
  const nextMessage = (0, import_flipper_plugin.useValue)(instance.nextMessage);
  const receivedMessage = (0, import_flipper_plugin.useValue)(instance.receivedMessage);
  return /* @__PURE__ */ import_react.default.createElement(import_flipper_plugin.Layout.Container, { pad: true, center: true }, /* @__PURE__ */ import_react.default.createElement(import_flipper_plugin.Layout.Container, { pad: true, gap: true, width: 400 }, /* @__PURE__ */ import_react.default.createElement(Text, null, prompt), /* @__PURE__ */ import_react.default.createElement(
    import_antd.Input,
    {
      placeholder: "Message",
      value: nextMessage,
      onChange: (event) => {
        instance.nextMessage.set(event.target.value);
      }
    }
  ), /* @__PURE__ */ import_react.default.createElement(
    import_antd.Button,
    {
      onClick: () => {
        instance.sendMessage();
      }
    },
    "Send"
  ), receivedMessage && /* @__PURE__ */ import_react.default.createElement(Text, null, " ", receivedMessage, " ")));
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vaW5kZXgudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZvcm1hdFxuICovXG5cbmltcG9ydCB7XG4gIGNyZWF0ZVN0YXRlLFxuICBMYXlvdXQsXG4gIFBsdWdpbkNsaWVudCxcbiAgdXNlUGx1Z2luLFxuICB1c2VWYWx1ZSxcbn0gZnJvbSAnZmxpcHBlci1wbHVnaW4nO1xuaW1wb3J0IHtCdXR0b24sIElucHV0LCBtZXNzYWdlLCBUeXBvZ3JhcGh5fSBmcm9tICdhbnRkJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IHtUZXh0fSA9IFR5cG9ncmFwaHk7XG5cbnR5cGUgRGlzcGxheU1lc3NhZ2VSZXNwb25zZSA9IHtcbiAgZ3JlZXRpbmc6IHN0cmluZztcbn07XG5cbi8qKlxuICogRXZlbnRzIHRoYXQgY2FuIGJlIHJlY2VpdmVkIEZST00gdGhlIGNsaWVudCBhcHBsaWNhdGlvblxuICovXG50eXBlIEV2ZW50cyA9IHtcbiAgdHJpZ2dlck5vdGlmaWNhdGlvbjoge1xuICAgIGlkOiBudW1iZXI7XG4gIH07XG4gIGRpc3BsYXlNZXNzYWdlOiB7XG4gICAgbXNnOiBzdHJpbmc7XG4gIH07XG59O1xuXG4vKipcbiAqIE1ldGhvZHMgdGhhdCBjYW4gYmUgaW52b2tlZCBPTiB0aGUgY2xpZW50IGFwcGxpY2F0aW9uXG4gKi9cbnR5cGUgTWV0aG9kcyA9IHtcbiAgZGlzcGxheU1lc3NhZ2UocGF5bG9hZDoge21lc3NhZ2U6IHN0cmluZ30pOiBQcm9taXNlPERpc3BsYXlNZXNzYWdlUmVzcG9uc2U+O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBsdWdpbihjbGllbnQ6IFBsdWdpbkNsaWVudDxFdmVudHMsIE1ldGhvZHM+KSB7XG4gIGNvbnN0IHJlY2VpdmVkTWVzc2FnZSA9IGNyZWF0ZVN0YXRlKCcnKTtcbiAgY29uc3QgcHJvbXB0ID0gY3JlYXRlU3RhdGUoXG4gICAgJ1R5cGUgYSBtZXNzYWdlIGJlbG93IHRvIHNlZSBpdCBkaXNwbGF5ZWQgb24gdGhlIG1vYmlsZSBhcHAnLFxuICApO1xuICBjb25zdCBuZXh0TWVzc2FnZSA9IGNyZWF0ZVN0YXRlKCcnKTtcblxuICAvKlxuICAgKiBQcm9jZXNzIGluY29taW5nIG1lc3NhZ2VzXG4gICAqL1xuICBjbGllbnQub25NZXNzYWdlKCd0cmlnZ2VyTm90aWZpY2F0aW9uJywgKHtpZH0pID0+IHtcbiAgICBjbGllbnQuc2hvd05vdGlmaWNhdGlvbih7XG4gICAgICBpZDogYHRlc3Qtbm90aWZpY2F0aW9uOiR7aWR9YCxcbiAgICAgIG1lc3NhZ2U6ICdFeGFtcGxlIE5vdGlmaWNhdGlvbicsXG4gICAgICBzZXZlcml0eTogJ3dhcm5pbmcnIGFzICd3YXJuaW5nJyxcbiAgICAgIHRpdGxlOiBgTm90aWZpY2F0aW9uOiAke2lkfWAsXG4gICAgfSk7XG4gIH0pO1xuXG4gIGNsaWVudC5vbk1lc3NhZ2UoJ2Rpc3BsYXlNZXNzYWdlJywgKHttc2d9KSA9PiB7XG4gICAgcmVjZWl2ZWRNZXNzYWdlLnNldChtc2cpO1xuICB9KTtcblxuICAvKlxuICAgKiBDYWxsIGEgbWV0aG9kIG9mIHRoZSBtb2JpbGUgY291bnRlcnBhcnQsIHRvIGRpc3BsYXkgYSBtZXNzYWdlLlxuICAgKi9cbiAgYXN5bmMgZnVuY3Rpb24gc2VuZE1lc3NhZ2UoKSB7XG4gICAgaWYgKGNsaWVudC5pc0Nvbm5lY3RlZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjbGllbnQuc2VuZCgnZGlzcGxheU1lc3NhZ2UnLCB7XG4gICAgICAgICAgbWVzc2FnZTogbmV4dE1lc3NhZ2UuZ2V0KCkgfHwgJ1dlZWVlZSEnLFxuICAgICAgICB9KTtcbiAgICAgICAgcHJvbXB0LnNldChyZXNwb25zZS5ncmVldGluZyB8fCAnTmljZScpO1xuICAgICAgICBuZXh0TWVzc2FnZS5zZXQoJycpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0Vycm9yIHJldHVybmVkIGZyb20gY2xpZW50JywgZSk7XG4gICAgICAgIG1lc3NhZ2UuZXJyb3IoYEZhaWxlZCB0byBnZXQgcmVzcG9uc2UgZnJvbSBjbGllbnQgJHtlfWApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc2VuZE1lc3NhZ2UsXG4gICAgcHJvbXB0LFxuICAgIG5leHRNZXNzYWdlLFxuICAgIHJlY2VpdmVkTWVzc2FnZSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENvbXBvbmVudCgpIHtcbiAgY29uc3QgaW5zdGFuY2UgPSB1c2VQbHVnaW4ocGx1Z2luKTtcbiAgY29uc3QgcHJvbXB0ID0gdXNlVmFsdWUoaW5zdGFuY2UucHJvbXB0KTtcbiAgY29uc3QgbmV4dE1lc3NhZ2UgPSB1c2VWYWx1ZShpbnN0YW5jZS5uZXh0TWVzc2FnZSk7XG4gIGNvbnN0IHJlY2VpdmVkTWVzc2FnZSA9IHVzZVZhbHVlKGluc3RhbmNlLnJlY2VpdmVkTWVzc2FnZSk7XG5cbiAgcmV0dXJuIChcbiAgICA8TGF5b3V0LkNvbnRhaW5lciBwYWQgY2VudGVyPlxuICAgICAgPExheW91dC5Db250YWluZXIgcGFkIGdhcCB3aWR0aD17NDAwfT5cbiAgICAgICAgPFRleHQ+e3Byb21wdH08L1RleHQ+XG4gICAgICAgIDxJbnB1dFxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTWVzc2FnZVwiXG4gICAgICAgICAgdmFsdWU9e25leHRNZXNzYWdlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGluc3RhbmNlLm5leHRNZXNzYWdlLnNldChldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICBpbnN0YW5jZS5zZW5kTWVzc2FnZSgpO1xuICAgICAgICAgIH19PlxuICAgICAgICAgIFNlbmRcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIHtyZWNlaXZlZE1lc3NhZ2UgJiYgPFRleHQ+IHtyZWNlaXZlZE1lc3NhZ2V9IDwvVGV4dD59XG4gICAgICA8L0xheW91dC5Db250YWluZXI+XG4gICAgPC9MYXlvdXQuQ29udGFpbmVyPlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFTQSw0QkFNTztBQUNQLGtCQUFpRDtBQUNqRCxtQkFBa0I7QUFFbEIsSUFBTSxFQUFDLEtBQUksSUFBSTtBQXlCUixTQUFTLE9BQU8sUUFBdUM7QUFDNUQsUUFBTSxzQkFBa0IsbUNBQVksRUFBRTtBQUN0QyxRQUFNLGFBQVM7QUFBQSxJQUNiO0FBQUEsRUFDRjtBQUNBLFFBQU0sa0JBQWMsbUNBQVksRUFBRTtBQUtsQyxTQUFPLFVBQVUsdUJBQXVCLENBQUMsRUFBQyxHQUFFLE1BQU07QUFDaEQsV0FBTyxpQkFBaUI7QUFBQSxNQUN0QixJQUFJLHFCQUFxQjtBQUFBLE1BQ3pCLFNBQVM7QUFBQSxNQUNULFVBQVU7QUFBQSxNQUNWLE9BQU8saUJBQWlCO0FBQUEsSUFDMUIsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELFNBQU8sVUFBVSxrQkFBa0IsQ0FBQyxFQUFDLElBQUcsTUFBTTtBQUM1QyxvQkFBZ0IsSUFBSSxHQUFHO0FBQUEsRUFDekIsQ0FBQztBQUtELGlCQUFlLGNBQWM7QUFDM0IsUUFBSSxPQUFPLGFBQWE7QUFDdEIsVUFBSTtBQUNGLGNBQU0sV0FBVyxNQUFNLE9BQU8sS0FBSyxrQkFBa0I7QUFBQSxVQUNuRCxTQUFTLFlBQVksSUFBSSxLQUFLO0FBQUEsUUFDaEMsQ0FBQztBQUNELGVBQU8sSUFBSSxTQUFTLFlBQVksTUFBTTtBQUN0QyxvQkFBWSxJQUFJLEVBQUU7QUFBQSxNQUNwQixTQUFTLEdBQVA7QUFDQSxnQkFBUSxLQUFLLDhCQUE4QixDQUFDO0FBQzVDLDRCQUFRLE1BQU0sc0NBQXNDLEdBQUc7QUFBQSxNQUN6RDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7QUFFTyxTQUFTLFlBQVk7QUFDMUIsUUFBTSxlQUFXLGlDQUFVLE1BQU07QUFDakMsUUFBTSxhQUFTLGdDQUFTLFNBQVMsTUFBTTtBQUN2QyxRQUFNLGtCQUFjLGdDQUFTLFNBQVMsV0FBVztBQUNqRCxRQUFNLHNCQUFrQixnQ0FBUyxTQUFTLGVBQWU7QUFFekQsU0FDRSw2QkFBQUEsUUFBQSxjQUFDLDZCQUFPLFdBQVAsRUFBaUIsS0FBRyxNQUFDLFFBQU0sUUFDMUIsNkJBQUFBLFFBQUEsY0FBQyw2QkFBTyxXQUFQLEVBQWlCLEtBQUcsTUFBQyxLQUFHLE1BQUMsT0FBTyxPQUMvQiw2QkFBQUEsUUFBQSxjQUFDLFlBQU0sTUFBTyxHQUNkLDZCQUFBQSxRQUFBO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQyxhQUFZO0FBQUEsTUFDWixPQUFPO0FBQUEsTUFDUCxVQUFVLENBQUMsVUFBVTtBQUNuQixpQkFBUyxZQUFZLElBQUksTUFBTSxPQUFPLEtBQUs7QUFBQSxNQUM3QztBQUFBO0FBQUEsRUFDRixHQUNBLDZCQUFBQSxRQUFBO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQyxTQUFTLE1BQU07QUFDYixpQkFBUyxZQUFZO0FBQUEsTUFDdkI7QUFBQTtBQUFBLElBQUc7QUFBQSxFQUVMLEdBQ0MsbUJBQW1CLDZCQUFBQSxRQUFBLGNBQUMsWUFBSyxLQUFFLGlCQUFnQixHQUFDLENBQy9DLENBQ0Y7QUFFSjsiLAogICJuYW1lcyI6IFsiUmVhY3QiXQp9Cg==
