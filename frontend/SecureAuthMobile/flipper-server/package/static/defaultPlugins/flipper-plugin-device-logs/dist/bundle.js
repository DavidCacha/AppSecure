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

// plugins/public/logs/index.tsx
var logs_exports = {};
__export(logs_exports, {
  Component: () => Component,
  devicePlugin: () => devicePlugin
});
module.exports = __toCommonJS(logs_exports);
var import_flipper_plugin2 = require("flipper-plugin");
var import_icons2 = require("@ant-design/icons");
var import_react2 = __toESM(require("react"));
var import_antd = require("antd");

// plugins/public/logs/logTypes.tsx
var import_flipper_plugin = require("flipper-plugin");
var import_icons = require("@ant-design/icons");
var import_react = __toESM(require("react"));
var iconStyle = {
  fontSize: "16px"
};
var baseRowStyle = {
  ...import_flipper_plugin.theme.monospace
};
var logTypes = {
  verbose: {
    label: "Verbose",
    style: {
      ...baseRowStyle,
      color: import_flipper_plugin.theme.textColorSecondary
    },
    enabled: false
  },
  debug: {
    label: "Debug",
    style: {
      ...baseRowStyle,
      color: import_flipper_plugin.theme.textColorSecondary
    },
    enabled: true
  },
  info: {
    label: "Info",
    enabled: true
  },
  warn: {
    label: "Warn",
    style: {
      ...baseRowStyle,
      color: import_flipper_plugin.theme.warningColor
    },
    icon: /* @__PURE__ */ import_react.default.createElement(import_icons.WarningFilled, { style: iconStyle }),
    enabled: true
  },
  error: {
    label: "Error",
    style: {
      ...baseRowStyle,
      color: import_flipper_plugin.theme.errorColor
    },
    icon: /* @__PURE__ */ import_react.default.createElement(import_icons.CloseCircleFilled, { style: iconStyle }),
    enabled: true
  },
  fatal: {
    label: "Fatal",
    style: {
      ...baseRowStyle,
      background: import_flipper_plugin.theme.errorColor,
      color: import_flipper_plugin.theme.white
    },
    icon: /* @__PURE__ */ import_react.default.createElement(import_icons.CloseCircleFilled, { style: iconStyle }),
    enabled: true
  }
};

// plugins/public/logs/index.tsx
var logLevelEnumLabels = Object.entries(logTypes).reduce(
  (res, [key, { label }]) => {
    res[key] = label;
    return res;
  },
  {}
);
function createColumnConfig(_os) {
  return [
    {
      key: "type",
      title: "Level",
      width: 30,
      onRender(entry) {
        return entry.count > 1 ? /* @__PURE__ */ import_react2.default.createElement(
          import_antd.Badge,
          {
            count: entry.count,
            size: "small",
            style: {
              color: import_flipper_plugin2.theme.white,
              background: logTypes[entry.type]?.style?.color ?? import_flipper_plugin2.theme.textColorSecondary
            }
          }
        ) : logTypes[entry.type]?.icon;
      },
      powerSearchConfig: {
        type: "enum",
        enumLabels: logLevelEnumLabels
      }
    },
    {
      key: "date",
      title: "Time",
      width: 120,
      powerSearchConfig: {
        type: "dateTime"
      }
    },
    {
      key: "pidStr",
      title: "PID",
      width: 60,
      visible: true,
      powerSearchConfig: {
        type: "enum",
        inferEnumOptionsFromData: true
      }
    },
    {
      key: "tid",
      title: "TID",
      width: 60,
      visible: false
    },
    {
      key: "tag",
      title: "Tag",
      width: 160,
      powerSearchConfig: {
        type: "enum",
        inferEnumOptionsFromData: true
      }
    },
    {
      key: "app",
      title: "App",
      width: 160,
      visible: false
    },
    {
      key: "message",
      title: "Message",
      wrap: true,
      formatters: [
        import_flipper_plugin2.DataFormatter.truncate(400),
        import_flipper_plugin2.DataFormatter.prettyPrintJson,
        import_flipper_plugin2.DataFormatter.linkify
      ]
    }
  ];
}
function getRowStyle(entry) {
  return logTypes[entry.type]?.style ?? baseRowStyle;
}
var powerSearchInitialState = [
  {
    field: {
      key: "type",
      label: "Level"
    },
    operator: import_flipper_plugin2.dataTablePowerSearchOperators.enum_set_is_any_of(logLevelEnumLabels),
    searchValue: Object.entries(logTypes).filter(([_, item]) => item.enabled).map(([key]) => key)
  }
];
function devicePlugin(client) {
  const rows = (0, import_flipper_plugin2.createDataSource)([], {
    limit: 2e5,
    persist: "logs",
    indices: [["pidStr"], ["tag"]]
  });
  const isPaused = (0, import_flipper_plugin2.createState)(true);
  const tableManagerRef = (0, import_react2.createRef)();
  client.onDeepLink((payload) => {
    if (typeof payload === "string") {
      tableManagerRef.current?.setSearchExpression(powerSearchInitialState);
      setTimeout(() => {
        let hasMatch = false;
        rows.view.output(0, rows.view.size).forEach((row, index) => {
          if (row.message.includes(payload)) {
            tableManagerRef.current?.selectItem(index, hasMatch);
            hasMatch = true;
          }
        });
      }, 500);
    }
  });
  client.addMenuEntry(
    {
      action: "clear",
      handler: clearLogs,
      accelerator: "ctrl+l"
    },
    {
      action: "createPaste",
      handler: createPaste
    },
    {
      action: "goToBottom",
      handler: goToBottom
    }
  );
  let logDisposer;
  function resumePause() {
    if (isPaused.get() && client.device.isConnected) {
      isPaused.set(false);
      logDisposer = client.onDeviceLogEntry((entry) => {
        const lastIndex = rows.size - 1;
        const previousRow = rows.get(lastIndex);
        if (previousRow && previousRow.message === entry.message && previousRow.tag === entry.tag && previousRow.type === entry.type) {
          rows.update(lastIndex, {
            ...previousRow,
            pidStr: previousRow.pid.toString(),
            count: previousRow.count + 1
          });
        } else {
          rows.append({
            ...entry,
            pidStr: entry.pid.toString(),
            count: 1
          });
        }
      });
    } else {
      logDisposer?.();
      isPaused.set(true);
    }
  }
  async function clearLogs() {
    if (client.device.connected.get()) {
      await client.device.clearLogs();
    }
    rows.clear();
    tableManagerRef.current?.clearSelection();
  }
  function createPaste() {
    let selection = tableManagerRef.current?.getSelectedItems();
    if (!selection?.length) {
      selection = rows.view.output(0, rows.view.size);
    }
    if (selection?.length) {
      client.createPaste(JSON.stringify(selection, null, 2));
    }
  }
  function goToBottom() {
    tableManagerRef?.current?.selectItem(rows.view.size - 1);
  }
  resumePause();
  const columns = createColumnConfig(client.device.os);
  return {
    columns,
    isConnected: client.device.isConnected,
    isPaused,
    tableManagerRef,
    rows,
    clearLogs,
    resumePause
  };
}
function Component() {
  const plugin = (0, import_flipper_plugin2.usePlugin)(devicePlugin);
  const paused = (0, import_flipper_plugin2.useValue)(plugin.isPaused);
  return /* @__PURE__ */ import_react2.default.createElement(
    import_flipper_plugin2.DataTable,
    {
      dataSource: plugin.rows,
      columns: plugin.columns,
      enableAutoScroll: true,
      enableMultiPanels: true,
      onRowStyle: getRowStyle,
      enableHorizontalScroll: false,
      extraActions: plugin.isConnected ? /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, null, /* @__PURE__ */ import_react2.default.createElement(
        import_antd.Button,
        {
          type: "ghost",
          title: `Click to ${paused ? "resume" : "pause"} the log stream`,
          danger: paused,
          onClick: plugin.resumePause
        },
        paused ? /* @__PURE__ */ import_react2.default.createElement(import_icons2.PlayCircleOutlined, null) : /* @__PURE__ */ import_react2.default.createElement(import_icons2.PauseCircleOutlined, null)
      ), /* @__PURE__ */ import_react2.default.createElement(import_antd.Button, { type: "ghost", title: "Clear logs", onClick: plugin.clearLogs }, /* @__PURE__ */ import_react2.default.createElement(import_icons2.DeleteOutlined, null))) : void 0,
      tableManagerRef: plugin.tableManagerRef,
      powerSearchInitialState
    }
  );
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vaW5kZXgudHN4IiwgIi4uL2xvZ1R5cGVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIE1ldGEgUGxhdGZvcm1zLCBJbmMuIGFuZCBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmb3JtYXRcbiAqL1xuXG5pbXBvcnQge1xuICBEZXZpY2VQbHVnaW5DbGllbnQsXG4gIERldmljZUxvZ0VudHJ5LFxuICB1c2VQbHVnaW4sXG4gIGNyZWF0ZURhdGFTb3VyY2UsXG4gIGRhdGFUYWJsZVBvd2VyU2VhcmNoT3BlcmF0b3JzLFxuICBEYXRhVGFibGVDb2x1bW4sXG4gIERhdGFUYWJsZSxcbiAgdGhlbWUsXG4gIERhdGFUYWJsZU1hbmFnZXIsXG4gIGNyZWF0ZVN0YXRlLFxuICB1c2VWYWx1ZSxcbiAgRGF0YUZvcm1hdHRlcixcbiAgRW51bUxhYmVscyxcbiAgU2VhcmNoRXhwcmVzc2lvblRlcm0sXG59IGZyb20gJ2ZsaXBwZXItcGx1Z2luJztcbmltcG9ydCB7XG4gIFBsYXlDaXJjbGVPdXRsaW5lZCxcbiAgUGF1c2VDaXJjbGVPdXRsaW5lZCxcbiAgRGVsZXRlT3V0bGluZWQsXG59IGZyb20gJ0BhbnQtZGVzaWduL2ljb25zJztcbmltcG9ydCBSZWFjdCwge2NyZWF0ZVJlZiwgQ1NTUHJvcGVydGllc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtCYWRnZSwgQnV0dG9ufSBmcm9tICdhbnRkJztcblxuaW1wb3J0IHtiYXNlUm93U3R5bGUsIGxvZ1R5cGVzfSBmcm9tICcuL2xvZ1R5cGVzJztcblxuZXhwb3J0IHR5cGUgRXh0ZW5kZWRMb2dFbnRyeSA9IERldmljZUxvZ0VudHJ5ICYge1xuICBjb3VudDogbnVtYmVyO1xuICBwaWRTdHI6IHN0cmluZzsgLy9mb3IgdGhlIHB1cnBvc2VzIG9mIGluZmVycmluZyAob25seSBzdXBwb3J0cyBzdHJpbmcgdHlwZSlcbn07XG5cbmNvbnN0IGxvZ0xldmVsRW51bUxhYmVscyA9IE9iamVjdC5lbnRyaWVzKGxvZ1R5cGVzKS5yZWR1Y2UoXG4gIChyZXMsIFtrZXksIHtsYWJlbH1dKSA9PiB7XG4gICAgcmVzW2tleV0gPSBsYWJlbDtcbiAgICByZXR1cm4gcmVzO1xuICB9LFxuICB7fSBhcyBFbnVtTGFiZWxzLFxuKTtcblxuZnVuY3Rpb24gY3JlYXRlQ29sdW1uQ29uZmlnKFxuICBfb3M6ICdpT1MnIHwgJ0FuZHJvaWQnIHwgJ01ldHJvJyxcbik6IERhdGFUYWJsZUNvbHVtbjxFeHRlbmRlZExvZ0VudHJ5PltdIHtcbiAgcmV0dXJuIFtcbiAgICB7XG4gICAgICBrZXk6ICd0eXBlJyxcbiAgICAgIHRpdGxlOiAnTGV2ZWwnLFxuICAgICAgd2lkdGg6IDMwLFxuICAgICAgb25SZW5kZXIoZW50cnkpIHtcbiAgICAgICAgcmV0dXJuIGVudHJ5LmNvdW50ID4gMSA/IChcbiAgICAgICAgICA8QmFkZ2VcbiAgICAgICAgICAgIGNvdW50PXtlbnRyeS5jb3VudH1cbiAgICAgICAgICAgIHNpemU9XCJzbWFsbFwiXG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBjb2xvcjogdGhlbWUud2hpdGUsXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6XG4gICAgICAgICAgICAgICAgKGxvZ1R5cGVzW2VudHJ5LnR5cGVdPy5zdHlsZSBhcyBhbnkpPy5jb2xvciA/P1xuICAgICAgICAgICAgICAgIHRoZW1lLnRleHRDb2xvclNlY29uZGFyeSxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICBsb2dUeXBlc1tlbnRyeS50eXBlXT8uaWNvblxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIHBvd2VyU2VhcmNoQ29uZmlnOiB7XG4gICAgICAgIHR5cGU6ICdlbnVtJyxcbiAgICAgICAgZW51bUxhYmVsczogbG9nTGV2ZWxFbnVtTGFiZWxzLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGtleTogJ2RhdGUnLFxuICAgICAgdGl0bGU6ICdUaW1lJyxcbiAgICAgIHdpZHRoOiAxMjAsXG4gICAgICBwb3dlclNlYXJjaENvbmZpZzoge1xuICAgICAgICB0eXBlOiAnZGF0ZVRpbWUnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGtleTogJ3BpZFN0cicsXG4gICAgICB0aXRsZTogJ1BJRCcsXG4gICAgICB3aWR0aDogNjAsXG4gICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgcG93ZXJTZWFyY2hDb25maWc6IHtcbiAgICAgICAgdHlwZTogJ2VudW0nLFxuICAgICAgICBpbmZlckVudW1PcHRpb25zRnJvbURhdGE6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAga2V5OiAndGlkJyxcbiAgICAgIHRpdGxlOiAnVElEJyxcbiAgICAgIHdpZHRoOiA2MCxcbiAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgIH0sXG4gICAge1xuICAgICAga2V5OiAndGFnJyxcbiAgICAgIHRpdGxlOiAnVGFnJyxcbiAgICAgIHdpZHRoOiAxNjAsXG4gICAgICBwb3dlclNlYXJjaENvbmZpZzoge1xuICAgICAgICB0eXBlOiAnZW51bScsXG4gICAgICAgIGluZmVyRW51bU9wdGlvbnNGcm9tRGF0YTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBrZXk6ICdhcHAnLFxuICAgICAgdGl0bGU6ICdBcHAnLFxuICAgICAgd2lkdGg6IDE2MCxcbiAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgIH0sXG4gICAge1xuICAgICAga2V5OiAnbWVzc2FnZScsXG4gICAgICB0aXRsZTogJ01lc3NhZ2UnLFxuICAgICAgd3JhcDogdHJ1ZSxcbiAgICAgIGZvcm1hdHRlcnM6IFtcbiAgICAgICAgRGF0YUZvcm1hdHRlci50cnVuY2F0ZSg0MDApLFxuICAgICAgICBEYXRhRm9ybWF0dGVyLnByZXR0eVByaW50SnNvbixcbiAgICAgICAgRGF0YUZvcm1hdHRlci5saW5raWZ5LFxuICAgICAgXSxcbiAgICB9LFxuICBdO1xufVxuXG5mdW5jdGlvbiBnZXRSb3dTdHlsZShlbnRyeTogRGV2aWNlTG9nRW50cnkpOiBDU1NQcm9wZXJ0aWVzIHwgdW5kZWZpbmVkIHtcbiAgcmV0dXJuIChsb2dUeXBlc1tlbnRyeS50eXBlXT8uc3R5bGUgYXMgYW55KSA/PyBiYXNlUm93U3R5bGU7XG59XG5cbmNvbnN0IHBvd2VyU2VhcmNoSW5pdGlhbFN0YXRlOiBTZWFyY2hFeHByZXNzaW9uVGVybVtdID0gW1xuICB7XG4gICAgZmllbGQ6IHtcbiAgICAgIGtleTogJ3R5cGUnLFxuICAgICAgbGFiZWw6ICdMZXZlbCcsXG4gICAgfSxcbiAgICBvcGVyYXRvcjpcbiAgICAgIGRhdGFUYWJsZVBvd2VyU2VhcmNoT3BlcmF0b3JzLmVudW1fc2V0X2lzX2FueV9vZihsb2dMZXZlbEVudW1MYWJlbHMpLFxuICAgIHNlYXJjaFZhbHVlOiBPYmplY3QuZW50cmllcyhsb2dUeXBlcylcbiAgICAgIC5maWx0ZXIoKFtfLCBpdGVtXSkgPT4gaXRlbS5lbmFibGVkKVxuICAgICAgLm1hcCgoW2tleV0pID0+IGtleSksXG4gIH0sXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gZGV2aWNlUGx1Z2luKGNsaWVudDogRGV2aWNlUGx1Z2luQ2xpZW50KSB7XG4gIGNvbnN0IHJvd3MgPSBjcmVhdGVEYXRhU291cmNlPEV4dGVuZGVkTG9nRW50cnk+KFtdLCB7XG4gICAgbGltaXQ6IDIwMDAwMCxcbiAgICBwZXJzaXN0OiAnbG9ncycsXG4gICAgaW5kaWNlczogW1sncGlkU3RyJ10sIFsndGFnJ11dLCAvL3RoZXJlIGFyZSBmb3IgaW5mZXJyaW5nIGVudW0gdHlwZXNcbiAgfSk7XG4gIGNvbnN0IGlzUGF1c2VkID0gY3JlYXRlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IHRhYmxlTWFuYWdlclJlZiA9IGNyZWF0ZVJlZjxcbiAgICB1bmRlZmluZWQgfCBEYXRhVGFibGVNYW5hZ2VyPEV4dGVuZGVkTG9nRW50cnk+XG4gID4oKTtcblxuICBjbGllbnQub25EZWVwTGluaygocGF5bG9hZDogdW5rbm93bikgPT4ge1xuICAgIGlmICh0eXBlb2YgcGF5bG9hZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRhYmxlTWFuYWdlclJlZi5jdXJyZW50Py5zZXRTZWFyY2hFeHByZXNzaW9uKHBvd2VyU2VhcmNoSW5pdGlhbFN0YXRlKTtcbiAgICAgIC8vIHRpbWVvdXQgYXMgd2Ugd2FudCB0byBhd2FpdCByZXN0b3JpbmcgYW55IHByZXZpb3VzIHNjcm9sbCBwb3NpdGlvbiBmaXJzdCwgdGhlbiBzY3JvbGwgdG8gdGhlbVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGxldCBoYXNNYXRjaCA9IGZhbHNlO1xuICAgICAgICByb3dzLnZpZXcub3V0cHV0KDAsIHJvd3Mudmlldy5zaXplKS5mb3JFYWNoKChyb3csIGluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKHJvdy5tZXNzYWdlLmluY2x1ZGVzKHBheWxvYWQpKSB7XG4gICAgICAgICAgICB0YWJsZU1hbmFnZXJSZWYuY3VycmVudD8uc2VsZWN0SXRlbShpbmRleCwgaGFzTWF0Y2gpO1xuICAgICAgICAgICAgaGFzTWF0Y2ggPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9LCA1MDApO1xuICAgIH1cbiAgfSk7XG5cbiAgY2xpZW50LmFkZE1lbnVFbnRyeShcbiAgICB7XG4gICAgICBhY3Rpb246ICdjbGVhcicsXG4gICAgICBoYW5kbGVyOiBjbGVhckxvZ3MsXG4gICAgICBhY2NlbGVyYXRvcjogJ2N0cmwrbCcsXG4gICAgfSxcbiAgICB7XG4gICAgICBhY3Rpb246ICdjcmVhdGVQYXN0ZScsXG4gICAgICBoYW5kbGVyOiBjcmVhdGVQYXN0ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGFjdGlvbjogJ2dvVG9Cb3R0b20nLFxuICAgICAgaGFuZGxlcjogZ29Ub0JvdHRvbSxcbiAgICB9LFxuICApO1xuXG4gIGxldCBsb2dEaXNwb3NlcjogKCgpID0+IHZvaWQpIHwgdW5kZWZpbmVkO1xuXG4gIGZ1bmN0aW9uIHJlc3VtZVBhdXNlKCkge1xuICAgIGlmIChpc1BhdXNlZC5nZXQoKSAmJiBjbGllbnQuZGV2aWNlLmlzQ29ubmVjdGVkKSB7XG4gICAgICAvLyBzdGFydCBsaXN0ZW5pbmcgdG8gdGhlIGxvZ3NcbiAgICAgIGlzUGF1c2VkLnNldChmYWxzZSk7XG4gICAgICBsb2dEaXNwb3NlciA9IGNsaWVudC5vbkRldmljZUxvZ0VudHJ5KChlbnRyeTogRGV2aWNlTG9nRW50cnkpID0+IHtcbiAgICAgICAgY29uc3QgbGFzdEluZGV4ID0gcm93cy5zaXplIC0gMTtcbiAgICAgICAgY29uc3QgcHJldmlvdXNSb3cgPSByb3dzLmdldChsYXN0SW5kZXgpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgcHJldmlvdXNSb3cgJiZcbiAgICAgICAgICBwcmV2aW91c1Jvdy5tZXNzYWdlID09PSBlbnRyeS5tZXNzYWdlICYmXG4gICAgICAgICAgcHJldmlvdXNSb3cudGFnID09PSBlbnRyeS50YWcgJiZcbiAgICAgICAgICBwcmV2aW91c1Jvdy50eXBlID09PSBlbnRyeS50eXBlXG4gICAgICAgICkge1xuICAgICAgICAgIHJvd3MudXBkYXRlKGxhc3RJbmRleCwge1xuICAgICAgICAgICAgLi4ucHJldmlvdXNSb3csXG4gICAgICAgICAgICBwaWRTdHI6IHByZXZpb3VzUm93LnBpZC50b1N0cmluZygpLFxuICAgICAgICAgICAgY291bnQ6IHByZXZpb3VzUm93LmNvdW50ICsgMSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByb3dzLmFwcGVuZCh7XG4gICAgICAgICAgICAuLi5lbnRyeSxcbiAgICAgICAgICAgIHBpZFN0cjogZW50cnkucGlkLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBjb3VudDogMSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZ0Rpc3Bvc2VyPy4oKTtcbiAgICAgIGlzUGF1c2VkLnNldCh0cnVlKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBjbGVhckxvZ3MoKSB7XG4gICAgaWYgKGNsaWVudC5kZXZpY2UuY29ubmVjdGVkLmdldCgpKSB7XG4gICAgICBhd2FpdCBjbGllbnQuZGV2aWNlLmNsZWFyTG9ncygpO1xuICAgIH1cbiAgICByb3dzLmNsZWFyKCk7XG4gICAgdGFibGVNYW5hZ2VyUmVmLmN1cnJlbnQ/LmNsZWFyU2VsZWN0aW9uKCk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVQYXN0ZSgpIHtcbiAgICBsZXQgc2VsZWN0aW9uID0gdGFibGVNYW5hZ2VyUmVmLmN1cnJlbnQ/LmdldFNlbGVjdGVkSXRlbXMoKTtcbiAgICBpZiAoIXNlbGVjdGlvbj8ubGVuZ3RoKSB7XG4gICAgICBzZWxlY3Rpb24gPSByb3dzLnZpZXcub3V0cHV0KDAsIHJvd3Mudmlldy5zaXplKTtcbiAgICB9XG4gICAgaWYgKHNlbGVjdGlvbj8ubGVuZ3RoKSB7XG4gICAgICBjbGllbnQuY3JlYXRlUGFzdGUoSlNPTi5zdHJpbmdpZnkoc2VsZWN0aW9uLCBudWxsLCAyKSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ29Ub0JvdHRvbSgpIHtcbiAgICB0YWJsZU1hbmFnZXJSZWY/LmN1cnJlbnQ/LnNlbGVjdEl0ZW0ocm93cy52aWV3LnNpemUgLSAxKTtcbiAgfVxuXG4gIC8vIHN0YXJ0IGxpc3RlbmluZyB0byB0aGUgbG9nc1xuICByZXN1bWVQYXVzZSgpO1xuXG4gIGNvbnN0IGNvbHVtbnMgPSBjcmVhdGVDb2x1bW5Db25maWcoY2xpZW50LmRldmljZS5vcyBhcyBhbnkpO1xuXG4gIHJldHVybiB7XG4gICAgY29sdW1ucyxcbiAgICBpc0Nvbm5lY3RlZDogY2xpZW50LmRldmljZS5pc0Nvbm5lY3RlZCxcbiAgICBpc1BhdXNlZCxcbiAgICB0YWJsZU1hbmFnZXJSZWYsXG4gICAgcm93cyxcbiAgICBjbGVhckxvZ3MsXG4gICAgcmVzdW1lUGF1c2UsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDb21wb25lbnQoKSB7XG4gIGNvbnN0IHBsdWdpbiA9IHVzZVBsdWdpbihkZXZpY2VQbHVnaW4pO1xuICBjb25zdCBwYXVzZWQgPSB1c2VWYWx1ZShwbHVnaW4uaXNQYXVzZWQpO1xuICByZXR1cm4gKFxuICAgIDxEYXRhVGFibGU8RXh0ZW5kZWRMb2dFbnRyeT5cbiAgICAgIGRhdGFTb3VyY2U9e3BsdWdpbi5yb3dzfVxuICAgICAgY29sdW1ucz17cGx1Z2luLmNvbHVtbnN9XG4gICAgICBlbmFibGVBdXRvU2Nyb2xsXG4gICAgICBlbmFibGVNdWx0aVBhbmVsc1xuICAgICAgb25Sb3dTdHlsZT17Z2V0Um93U3R5bGV9XG4gICAgICBlbmFibGVIb3Jpem9udGFsU2Nyb2xsPXtmYWxzZX1cbiAgICAgIGV4dHJhQWN0aW9ucz17XG4gICAgICAgIHBsdWdpbi5pc0Nvbm5lY3RlZCA/IChcbiAgICAgICAgICA8PlxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiZ2hvc3RcIlxuICAgICAgICAgICAgICB0aXRsZT17YENsaWNrIHRvICR7cGF1c2VkID8gJ3Jlc3VtZScgOiAncGF1c2UnfSB0aGUgbG9nIHN0cmVhbWB9XG4gICAgICAgICAgICAgIGRhbmdlcj17cGF1c2VkfVxuICAgICAgICAgICAgICBvbkNsaWNrPXtwbHVnaW4ucmVzdW1lUGF1c2V9PlxuICAgICAgICAgICAgICB7cGF1c2VkID8gPFBsYXlDaXJjbGVPdXRsaW5lZCAvPiA6IDxQYXVzZUNpcmNsZU91dGxpbmVkIC8+fVxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJnaG9zdFwiIHRpdGxlPVwiQ2xlYXIgbG9nc1wiIG9uQ2xpY2s9e3BsdWdpbi5jbGVhckxvZ3N9PlxuICAgICAgICAgICAgICA8RGVsZXRlT3V0bGluZWQgLz5cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDwvPlxuICAgICAgICApIDogdW5kZWZpbmVkXG4gICAgICB9XG4gICAgICB0YWJsZU1hbmFnZXJSZWY9e3BsdWdpbi50YWJsZU1hbmFnZXJSZWZ9XG4gICAgICBwb3dlclNlYXJjaEluaXRpYWxTdGF0ZT17cG93ZXJTZWFyY2hJbml0aWFsU3RhdGV9XG4gICAgLz5cbiAgKTtcbn1cbiIsICIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZvcm1hdFxuICovXG5cbmltcG9ydCB7dGhlbWV9IGZyb20gJ2ZsaXBwZXItcGx1Z2luJztcbmltcG9ydCB7V2FybmluZ0ZpbGxlZCwgQ2xvc2VDaXJjbGVGaWxsZWR9IGZyb20gJ0BhbnQtZGVzaWduL2ljb25zJztcbmltcG9ydCBSZWFjdCwge0NTU1Byb3BlcnRpZXN9IGZyb20gJ3JlYWN0JztcblxuY29uc3QgaWNvblN0eWxlID0ge1xuICBmb250U2l6ZTogJzE2cHgnLFxufTtcblxuZXhwb3J0IGNvbnN0IGJhc2VSb3dTdHlsZSA9IHtcbiAgLi4udGhlbWUubW9ub3NwYWNlLFxufTtcblxuZXhwb3J0IGNvbnN0IGxvZ1R5cGVzOiB7XG4gIFtsZXZlbDogc3RyaW5nXToge1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgaWNvbj86IFJlYWN0LlJlYWN0Tm9kZTtcbiAgICBzdHlsZT86IENTU1Byb3BlcnRpZXM7XG4gICAgZW5hYmxlZDogYm9vbGVhbjtcbiAgfTtcbn0gPSB7XG4gIHZlcmJvc2U6IHtcbiAgICBsYWJlbDogJ1ZlcmJvc2UnLFxuICAgIHN0eWxlOiB7XG4gICAgICAuLi5iYXNlUm93U3R5bGUsXG4gICAgICBjb2xvcjogdGhlbWUudGV4dENvbG9yU2Vjb25kYXJ5LFxuICAgIH0sXG4gICAgZW5hYmxlZDogZmFsc2UsXG4gIH0sXG4gIGRlYnVnOiB7XG4gICAgbGFiZWw6ICdEZWJ1ZycsXG4gICAgc3R5bGU6IHtcbiAgICAgIC4uLmJhc2VSb3dTdHlsZSxcbiAgICAgIGNvbG9yOiB0aGVtZS50ZXh0Q29sb3JTZWNvbmRhcnksXG4gICAgfSxcbiAgICBlbmFibGVkOiB0cnVlLFxuICB9LFxuICBpbmZvOiB7XG4gICAgbGFiZWw6ICdJbmZvJyxcbiAgICBlbmFibGVkOiB0cnVlLFxuICB9LFxuICB3YXJuOiB7XG4gICAgbGFiZWw6ICdXYXJuJyxcbiAgICBzdHlsZToge1xuICAgICAgLi4uYmFzZVJvd1N0eWxlLFxuICAgICAgY29sb3I6IHRoZW1lLndhcm5pbmdDb2xvcixcbiAgICB9LFxuICAgIGljb246IDxXYXJuaW5nRmlsbGVkIHN0eWxlPXtpY29uU3R5bGV9IC8+LFxuICAgIGVuYWJsZWQ6IHRydWUsXG4gIH0sXG4gIGVycm9yOiB7XG4gICAgbGFiZWw6ICdFcnJvcicsXG4gICAgc3R5bGU6IHtcbiAgICAgIC4uLmJhc2VSb3dTdHlsZSxcbiAgICAgIGNvbG9yOiB0aGVtZS5lcnJvckNvbG9yLFxuICAgIH0sXG4gICAgaWNvbjogPENsb3NlQ2lyY2xlRmlsbGVkIHN0eWxlPXtpY29uU3R5bGV9IC8+LFxuICAgIGVuYWJsZWQ6IHRydWUsXG4gIH0sXG4gIGZhdGFsOiB7XG4gICAgbGFiZWw6ICdGYXRhbCcsXG4gICAgc3R5bGU6IHtcbiAgICAgIC4uLmJhc2VSb3dTdHlsZSxcbiAgICAgIGJhY2tncm91bmQ6IHRoZW1lLmVycm9yQ29sb3IsXG4gICAgICBjb2xvcjogdGhlbWUud2hpdGUsXG4gICAgfSxcbiAgICBpY29uOiA8Q2xvc2VDaXJjbGVGaWxsZWQgc3R5bGU9e2ljb25TdHlsZX0gLz4sXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgfSxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVNBLElBQUFBLHlCQWVPO0FBQ1AsSUFBQUMsZ0JBSU87QUFDUCxJQUFBQyxnQkFBOEM7QUFDOUMsa0JBQTRCOzs7QUN0QjVCLDRCQUFvQjtBQUNwQixtQkFBK0M7QUFDL0MsbUJBQW1DO0FBRW5DLElBQU0sWUFBWTtBQUFBLEVBQ2hCLFVBQVU7QUFDWjtBQUVPLElBQU0sZUFBZTtBQUFBLEVBQzFCLEdBQUcsNEJBQU07QUFDWDtBQUVPLElBQU0sV0FPVDtBQUFBLEVBQ0YsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsR0FBRztBQUFBLE1BQ0gsT0FBTyw0QkFBTTtBQUFBLElBQ2Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxFQUNYO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxPQUFPO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxHQUFHO0FBQUEsTUFDSCxPQUFPLDRCQUFNO0FBQUEsSUFDZjtBQUFBLElBQ0EsU0FBUztBQUFBLEVBQ1g7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLFNBQVM7QUFBQSxFQUNYO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxHQUFHO0FBQUEsTUFDSCxPQUFPLDRCQUFNO0FBQUEsSUFDZjtBQUFBLElBQ0EsTUFBTSw2QkFBQUMsUUFBQSxjQUFDLDhCQUFjLE9BQU8sV0FBVztBQUFBLElBQ3ZDLFNBQVM7QUFBQSxFQUNYO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxPQUFPO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxHQUFHO0FBQUEsTUFDSCxPQUFPLDRCQUFNO0FBQUEsSUFDZjtBQUFBLElBQ0Es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Q0EsYUFBYSxPQUFPLE9BQU87QUFBQSxJQUMzQjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7QUFFTyxTQUFTLFlBQVk7QUFDMUIsUUFBTSxhQUFTLGtDQUFVLFlBQVk7QUFDckMsUUFBTSxhQUFTLGlDQUFTLE9BQU8sUUFBUTtBQUN2QyxTQUNFLDhCQUFBQSxRQUFBO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQyxZQUFZLE9BQU87QUFBQSxNQUNuQixTQUFTLE9BQU87QUFBQSxNQUNoQixrQkFBZ0I7QUFBQSxNQUNoQixtQkFBaUI7QUFBQSxNQUNqQixZQUFZO0FBQUEsTUFDWix3QkFBd0I7QUFBQSxNQUN4QixjQUNFLE9BQU8sY0FDTCw4QkFBQUEsUUFBQSw0QkFBQUEsUUFBQSxnQkFDRSw4QkFBQUEsUUFBQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsTUFBSztBQUFBLFVBQ0wsT0FBTyxZQUFZLFNBQVMsV0FBVztBQUFBLFVBQ3ZDLFFBQVE7QUFBQSxVQUNSLFNBQVMsT0FBTztBQUFBO0FBQUEsUUFDZixTQUFTLDhCQUFBQSxRQUFBLGNBQUMsc0NBQW1CLElBQUssOEJBQUFBLFFBQUEsY0FBQyx1Q0FBb0I7QUFBQSxNQUMxRCxHQUNBLDhCQUFBQSxRQUFBLGNBQUMsc0JBQU8sTUFBSyxTQUFRLE9BQU0sY0FBYSxTQUFTLE9BQU8sYUFDdEQsOEJBQUFBLFFBQUEsY0FBQyxrQ0FBZSxDQUNsQixDQUNGLElBQ0U7QUFBQSxNQUVOLGlCQUFpQixPQUFPO0FBQUEsTUFDeEI7QUFBQTtBQUFBLEVBQ0Y7QUFFSjsiLAogICJuYW1lcyI6IFsiaW1wb3J0X2ZsaXBwZXJfcGx1Z2luIiwgImltcG9ydF9pY29ucyIsICJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAiUmVhY3QiXQp9Cg==
