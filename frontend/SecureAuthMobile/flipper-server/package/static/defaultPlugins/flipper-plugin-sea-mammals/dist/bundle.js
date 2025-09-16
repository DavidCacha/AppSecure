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

// plugins/public/seamammals/src/index_custom.tsx
var index_custom_exports = {};
__export(index_custom_exports, {
  Component: () => Component,
  plugin: () => plugin
});
module.exports = __toCommonJS(index_custom_exports);
var import_react = __toESM(require("react"));
var import_antd = require("antd");
var import_flipper_plugin = require("flipper-plugin");
function plugin(client) {
  const rows = (0, import_flipper_plugin.createState)({}, { persist: "rows" });
  const selectedID = (0, import_flipper_plugin.createState)(null, { persist: "selection" });
  client.addMenuEntry(
    {
      label: "Reset Selection",
      handler: () => {
        selectedID.set(null);
      }
    },
    {
      action: "createPaste",
      handler: async () => {
        const selection = selectedID.get();
        if (selection) {
          await client.createPaste(
            JSON.stringify(rows.get()[selection], null, 2)
          );
        }
      }
    }
  );
  client.onMessage("newRow", (row) => {
    rows.update((draft) => {
      draft[row.id] = row;
    });
  });
  function setSelection(id) {
    selectedID.set(`${id}`);
  }
  return {
    rows,
    selectedID,
    setSelection
  };
}
function Component() {
  const instance = (0, import_flipper_plugin.usePlugin)(plugin);
  const rows = (0, import_flipper_plugin.useValue)(instance.rows);
  const selectedID = (0, import_flipper_plugin.useValue)(instance.selectedID);
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(
    import_flipper_plugin.Layout.ScrollContainer,
    {
      vertical: true,
      style: { background: import_flipper_plugin.theme.backgroundWash }
    },
    /* @__PURE__ */ import_react.default.createElement(import_flipper_plugin.Layout.Horizontal, { gap: true, pad: true, style: { flexWrap: "wrap" } }, Object.entries(rows).map(([id, row]) => /* @__PURE__ */ import_react.default.createElement(
      MammalCard,
      {
        row,
        onSelect: instance.setSelection,
        selected: id === selectedID,
        key: id
      }
    )))
  ), /* @__PURE__ */ import_react.default.createElement(import_flipper_plugin.DetailSidebar, null, selectedID && renderSidebar(rows[selectedID])));
}
function renderSidebar(row) {
  return /* @__PURE__ */ import_react.default.createElement(import_flipper_plugin.Layout.Container, { gap: true, pad: true }, /* @__PURE__ */ import_react.default.createElement(import_antd.Typography.Title, { level: 4 }, "Extras"), /* @__PURE__ */ import_react.default.createElement(import_flipper_plugin.DataInspector, { data: row, expandRoot: true }));
}
var MammalCard = (0, import_react.memo)(({ row, selected, onSelect }) => {
  return /* @__PURE__ */ import_react.default.createElement(
    import_antd.Card,
    {
      hoverable: true,
      "data-testid": row.title,
      onClick: () => onSelect(row.id),
      title: row.title,
      style: {
        width: 150,
        borderColor: selected ? import_flipper_plugin.theme.primaryColor : void 0
      }
    },
    /* @__PURE__ */ import_react.default.createElement(Image, { style: { backgroundImage: `url(${row.url || ""})` } })
  );
});
var Image = import_flipper_plugin.styled.div({
  backgroundSize: "cover",
  width: "100%",
  paddingTop: "100%"
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4X2N1c3RvbS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogQ29weXJpZ2h0IChjKSBNZXRhIFBsYXRmb3JtcywgSW5jLiBhbmQgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZm9ybWF0XG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7bWVtb30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtUeXBvZ3JhcGh5LCBDYXJkfSBmcm9tICdhbnRkJztcbmltcG9ydCB7XG4gIExheW91dCxcbiAgUGx1Z2luQ2xpZW50LFxuICB1c2VQbHVnaW4sXG4gIGNyZWF0ZVN0YXRlLFxuICB1c2VWYWx1ZSxcbiAgdGhlbWUsXG4gIHN0eWxlZCxcbiAgRGF0YUluc3BlY3RvcixcbiAgRGV0YWlsU2lkZWJhcixcbn0gZnJvbSAnZmxpcHBlci1wbHVnaW4nO1xuXG50eXBlIFJvdyA9IHtcbiAgaWQ6IG51bWJlcjtcbiAgdGl0bGU6IHN0cmluZztcbiAgdXJsOiBzdHJpbmc7XG59O1xuXG50eXBlIEV2ZW50cyA9IHtcbiAgbmV3Um93OiBSb3c7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcGx1Z2luKGNsaWVudDogUGx1Z2luQ2xpZW50PEV2ZW50cywge30+KSB7XG4gIGNvbnN0IHJvd3MgPSBjcmVhdGVTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBSb3c+Pih7fSwge3BlcnNpc3Q6ICdyb3dzJ30pO1xuICBjb25zdCBzZWxlY3RlZElEID0gY3JlYXRlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCwge3BlcnNpc3Q6ICdzZWxlY3Rpb24nfSk7XG5cbiAgY2xpZW50LmFkZE1lbnVFbnRyeShcbiAgICB7XG4gICAgICBsYWJlbDogJ1Jlc2V0IFNlbGVjdGlvbicsXG4gICAgICBoYW5kbGVyOiAoKSA9PiB7XG4gICAgICAgIHNlbGVjdGVkSUQuc2V0KG51bGwpO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGFjdGlvbjogJ2NyZWF0ZVBhc3RlJyxcbiAgICAgIGhhbmRsZXI6IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gc2VsZWN0ZWRJRC5nZXQoKTtcbiAgICAgICAgaWYgKHNlbGVjdGlvbikge1xuICAgICAgICAgIGF3YWl0IGNsaWVudC5jcmVhdGVQYXN0ZShcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHJvd3MuZ2V0KClbc2VsZWN0aW9uXSwgbnVsbCwgMiksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9LFxuICApO1xuXG4gIGNsaWVudC5vbk1lc3NhZ2UoJ25ld1JvdycsIChyb3cpID0+IHtcbiAgICByb3dzLnVwZGF0ZSgoZHJhZnQpID0+IHtcbiAgICAgIGRyYWZ0W3Jvdy5pZF0gPSByb3c7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHNldFNlbGVjdGlvbihpZDogbnVtYmVyKSB7XG4gICAgc2VsZWN0ZWRJRC5zZXQoYCR7aWR9YCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJvd3MsXG4gICAgc2VsZWN0ZWRJRCxcbiAgICBzZXRTZWxlY3Rpb24sXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDb21wb25lbnQoKSB7XG4gIGNvbnN0IGluc3RhbmNlID0gdXNlUGx1Z2luKHBsdWdpbik7XG4gIGNvbnN0IHJvd3MgPSB1c2VWYWx1ZShpbnN0YW5jZS5yb3dzKTtcbiAgY29uc3Qgc2VsZWN0ZWRJRCA9IHVzZVZhbHVlKGluc3RhbmNlLnNlbGVjdGVkSUQpO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxMYXlvdXQuU2Nyb2xsQ29udGFpbmVyXG4gICAgICAgIHZlcnRpY2FsXG4gICAgICAgIHN0eWxlPXt7YmFja2dyb3VuZDogdGhlbWUuYmFja2dyb3VuZFdhc2h9fT5cbiAgICAgICAgPExheW91dC5Ib3Jpem9udGFsIGdhcCBwYWQgc3R5bGU9e3tmbGV4V3JhcDogJ3dyYXAnfX0+XG4gICAgICAgICAge09iamVjdC5lbnRyaWVzKHJvd3MpLm1hcCgoW2lkLCByb3ddKSA9PiAoXG4gICAgICAgICAgICA8TWFtbWFsQ2FyZFxuICAgICAgICAgICAgICByb3c9e3Jvd31cbiAgICAgICAgICAgICAgb25TZWxlY3Q9e2luc3RhbmNlLnNldFNlbGVjdGlvbn1cbiAgICAgICAgICAgICAgc2VsZWN0ZWQ9e2lkID09PSBzZWxlY3RlZElEfVxuICAgICAgICAgICAgICBrZXk9e2lkfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9MYXlvdXQuSG9yaXpvbnRhbD5cbiAgICAgIDwvTGF5b3V0LlNjcm9sbENvbnRhaW5lcj5cbiAgICAgIDxEZXRhaWxTaWRlYmFyPlxuICAgICAgICB7c2VsZWN0ZWRJRCAmJiByZW5kZXJTaWRlYmFyKHJvd3Nbc2VsZWN0ZWRJRF0pfVxuICAgICAgPC9EZXRhaWxTaWRlYmFyPlxuICAgIDwvPlxuICApO1xufVxuXG5mdW5jdGlvbiByZW5kZXJTaWRlYmFyKHJvdzogUm93KSB7XG4gIHJldHVybiAoXG4gICAgPExheW91dC5Db250YWluZXIgZ2FwIHBhZD5cbiAgICAgIDxUeXBvZ3JhcGh5LlRpdGxlIGxldmVsPXs0fT5FeHRyYXM8L1R5cG9ncmFwaHkuVGl0bGU+XG4gICAgICA8RGF0YUluc3BlY3RvciBkYXRhPXtyb3d9IGV4cGFuZFJvb3QgLz5cbiAgICA8L0xheW91dC5Db250YWluZXI+XG4gICk7XG59XG5cbnR5cGUgQ2FyZFByb3BzID0ge1xuICBvblNlbGVjdDogKGlkOiBudW1iZXIpID0+IHZvaWQ7XG4gIHNlbGVjdGVkOiBib29sZWFuO1xuICByb3c6IFJvdztcbn07XG5jb25zdCBNYW1tYWxDYXJkID0gbWVtbygoe3Jvdywgc2VsZWN0ZWQsIG9uU2VsZWN0fTogQ2FyZFByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPENhcmRcbiAgICAgIGhvdmVyYWJsZVxuICAgICAgZGF0YS10ZXN0aWQ9e3Jvdy50aXRsZX1cbiAgICAgIG9uQ2xpY2s9eygpID0+IG9uU2VsZWN0KHJvdy5pZCl9XG4gICAgICB0aXRsZT17cm93LnRpdGxlfVxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgd2lkdGg6IDE1MCxcbiAgICAgICAgYm9yZGVyQ29sb3I6IHNlbGVjdGVkID8gdGhlbWUucHJpbWFyeUNvbG9yIDogdW5kZWZpbmVkLFxuICAgICAgfX0+XG4gICAgICA8SW1hZ2Ugc3R5bGU9e3tiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtyb3cudXJsIHx8ICcnfSlgfX0gLz5cbiAgICA8L0NhcmQ+XG4gICk7XG59KTtcblxuY29uc3QgSW1hZ2UgPSBzdHlsZWQuZGl2KHtcbiAgYmFja2dyb3VuZFNpemU6ICdjb3ZlcicsXG4gIHdpZHRoOiAnMTAwJScsXG4gIHBhZGRpbmdUb3A6ICcxMDAlJyxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFTQSxtQkFBMEI7QUFDMUIsa0JBQStCO0FBQy9CLDRCQVVPO0FBWUEsU0FBUyxPQUFPLFFBQWtDO0FBQ3ZELFFBQU0sV0FBTyxtQ0FBaUMsQ0FBQyxHQUFHLEVBQUMsU0FBUyxPQUFNLENBQUM7QUFDbkUsUUFBTSxpQkFBYSxtQ0FBMkIsTUFBTSxFQUFDLFNBQVMsWUFBVyxDQUFDO0FBRTFFLFNBQU87QUFBQSxJQUNMO0FBQUEsTUFDRSxPQUFPO0FBQUEsTUFDUCxTQUFTLE1BQU07QUFDYixtQkFBVyxJQUFJLElBQUk7QUFBQSxNQUNyQjtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxRQUFRO0FBQUEsTUFDUixTQUFTLFlBQVk7QUFDbkIsY0FBTSxZQUFZLFdBQVcsSUFBSTtBQUNqQyxZQUFJLFdBQVc7QUFDYixnQkFB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
