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

// plugins/public/cpu/index.tsx
var cpu_exports = {};
__export(cpu_exports, {
  Component: () => Component2,
  devicePlugin: () => devicePlugin
});
module.exports = __toCommonJS(cpu_exports);
var import_flipper_plugin = require("flipper-plugin");

// plugins/public/cpu/TemperatureTable.tsx
var import_flipper = require("flipper");
var import_react = __toESM(require("react"));
var ColumnSizes = {
  thermal_zone: "flex",
  temperature: "flex",
  path: "flex"
};
var Columns = {
  thermal_zone: {
    value: "Thermal Zone",
    resizable: true
  },
  temperature: {
    value: "Temperature",
    resizable: true
  },
  path: {
    value: "Path",
    resizable: true
  }
};
var TemperatureTable = class extends import_flipper.Component {
  constructor() {
    super(...arguments);
    this.buildRow = (tz, tempInfo) => {
      return {
        columns: {
          thermal_zone: { value: /* @__PURE__ */ import_react.default.createElement(import_flipper.Text, null, tz) },
          temperature: {
            value: /* @__PURE__ */ import_react.default.createElement(import_flipper.Text, null, tempInfo.temp.toString())
          },
          path: {
            value: /* @__PURE__ */ import_react.default.createElement(import_flipper.Text, null, tempInfo.path)
          }
        },
        key: tz
      };
    };
    this.buildRows = () => {
      const rows = [];
      for (const tz of Object.keys(this.props.temperatureMap).sort()) {
        rows.push(this.buildRow(tz, this.props.temperatureMap[tz]));
      }
      return rows;
    };
  }
  render() {
    return /* @__PURE__ */ import_react.default.createElement(
      import_flipper.SearchableTable,
      {
        multiline: true,
        autoHeight: true,
        floating: false,
        zebra: true,
        columnSizes: ColumnSizes,
        columns: Columns,
        rows: this.buildRows(),
        grow: true
      }
    );
  }
};

// plugins/public/cpu/index.tsx
var import_antd = require("antd");
var import_icons = require("@ant-design/icons");
var import_react2 = __toESM(require("react"));
function isNormalInteger(str) {
  const n = Math.floor(Number(str));
  return String(n) === str && n >= 0;
}
function formatFrequency(freq) {
  if (freq == -1) {
    return "N/A";
  } else if (freq == -2) {
    return "off";
  } else if (freq > 1e3 * 1e3) {
    return `${(freq / 1e3 / 1e3).toFixed(2)} GHz`;
  } else {
    return `${freq / 1e3} MHz`;
  }
}
function devicePlugin(client) {
  const device = client.device;
  const executeShell = async (command) => device.executeShell(command);
  let intervalID = null;
  const cpuState = (0, import_flipper_plugin.createState)({
    cpuCount: 0,
    cpuFreq: [],
    monitoring: false,
    hardwareInfo: "",
    temperatureMap: {},
    thermalAccessible: true,
    displayThermalInfo: false,
    displayCPUDetail: true
  });
  const updateCoreFrequency = async (core, type) => {
    const output = await executeShell(
      `cat /sys/devices/system/cpu/cpu${core}/cpufreq/${type}`
    );
    cpuState.update((draft) => {
      const newFreq = isNormalInteger(output) ? parseInt(output, 10) : -1;
      if (draft.cpuFreq[core][type] != newFreq) {
        draft.cpuFreq[core][type] = newFreq;
        if (type == "scaling_cur_freq" && draft.cpuFreq[core][type] < 0) {
          draft.cpuFreq[core][type] = -2;
        }
      }
    });
  };
  const updateAvailableFrequencies = async (core) => {
    const output = await executeShell(
      `cat /sys/devices/system/cpu/cpu${core}/cpufreq/scaling_available_frequencies`
    );
    cpuState.update((draft) => {
      const freqs = output.split(" ").map((num) => {
        return parseInt(num, 10);
      });
      draft.cpuFreq[core].scaling_available_freqs = freqs;
      const maxFreq = draft.cpuFreq[core].scaling_max_freq;
      if (maxFreq > 0 && freqs.indexOf(maxFreq) == -1) {
        freqs.push(maxFreq);
      }
    });
  };
  const updateCoreGovernor = async (core) => {
    const output = await executeShell(
      `cat /sys/devices/system/cpu/cpu${core}/cpufreq/scaling_governor`
    );
    cpuState.update((draft) => {
      if (output.toLowerCase().includes("no such file")) {
        draft.cpuFreq[core].scaling_governor = "N/A";
      } else {
        draft.cpuFreq[core].scaling_governor = output;
      }
    });
  };
  const readAvailableGovernors = async (core) => {
    const output = await executeShell(
      `cat /sys/devices/system/cpu/cpu${core}/cpufreq/scaling_available_governors`
    );
    return output.split(" ");
  };
  const readCoreFrequency = async (core) => {
    const freq = cpuState.get().cpuFreq[core];
    const promises = [];
    if (freq.cpuinfo_max_freq < 0) {
      promises.push(updateCoreFrequency(core, "cpuinfo_max_freq"));
    }
    if (freq.cpuinfo_min_freq < 0) {
      promises.push(updateCoreFrequency(core, "cpuinfo_min_freq"));
    }
    promises.push(updateCoreFrequency(core, "scaling_cur_freq"));
    promises.push(updateCoreFrequency(core, "scaling_min_freq"));
    promises.push(updateCoreFrequency(core, "scaling_max_freq"));
    return Promise.all(promises).then(() => {
    });
  };
  const updateHardwareInfo = async () => {
    const output = await executeShell("getprop ro.board.platform");
    let hwInfo = "";
    if (output.startsWith("msm") || output.startsWith("apq") || output.startsWith("sdm")) {
      hwInfo = `QUALCOMM ${output.toUpperCase()}`;
    } else if (output.startsWith("exynos")) {
      const chipname = await executeShell("getprop ro.chipname");
      if (chipname != null) {
        cpuState.update((draft) => {
          draft.hardwareInfo = `SAMSUMG ${chipname.toUpperCase()}`;
        });
      }
      return;
    } else if (output.startsWith("mt")) {
      hwInfo = `MEDIATEK ${output.toUpperCase()}`;
    } else if (output.startsWith("sc")) {
      hwInfo = `SPREADTRUM ${output.toUpperCase()}`;
    } else if (output.startsWith("hi") || output.startsWith("kirin")) {
      hwInfo = `HISILICON ${output.toUpperCase()}`;
    } else if (output.startsWith("rk")) {
      hwInfo = `ROCKCHIP ${output.toUpperCase()}`;
    } else if (output.startsWith("bcm")) {
      hwInfo = `BROADCOM ${output.toUpperCase()}`;
    }
    cpuState.update((draft) => {
      draft.hardwareInfo = hwInfo;
    });
  };
  const readThermalZones = async () => {
    const thermal_dir = "/sys/class/thermal/";
    const map = {};
    const output = await executeShell(`ls ${thermal_dir}`);
    if (output.toLowerCase().includes("permission denied")) {
      cpuState.update((draft) => {
        draft.thermalAccessible = false;
      });
      return;
    }
    const dirs = output.split(/\s/);
    const promises = [];
    for (let d of dirs) {
      d = d.trim();
      if (d.length == 0) {
        continue;
      }
      const path = thermal_dir + d;
      promises.push(readThermalZone(path, d, map));
    }
    await Promise.all(promises);
    cpuState.update((draft) => {
      draft.temperatureMap = map;
      draft.thermalAccessible = true;
    });
    if (cpuState.get().displayThermalInfo) {
      setTimeout(readThermalZones, 1e3);
    }
  };
  const readThermalZone = async (path, dir, map) => {
    const type = await executeShell(`cat ${path}/type`);
    if (type.length == 0) {
      return;
    }
    const temp = await executeShell(`cat ${path}/temp`);
    if (Number.isNaN(Number(temp))) {
      return;
    }
    map[type] = {
      path: dir,
      temp: parseInt(temp, 10)
    };
  };
  const onStartMonitor = () => {
    if (cpuState.get().monitoring) {
      return;
    }
    cpuState.update((draft) => {
      draft.monitoring = true;
    });
    for (let i = 0; i < cpuState.get().cpuCount; ++i) {
      readAvailableGovernors(i).then((output) => {
        cpuState.update((draft) => {
          draft.cpuFreq[i].scaling_available_governors = output;
        });
      }).catch((e) => {
        console.error("Failed to read CPU governors:", e);
      });
    }
    const update = async () => {
      if (!cpuState.get().monitoring) {
        return;
      }
      const promises = [];
      for (let i = 0; i < cpuState.get().cpuCount; ++i) {
        promises.push(readCoreFrequency(i));
        promises.push(updateCoreGovernor(i));
        promises.push(updateAvailableFrequencies(i));
      }
      await Promise.all(promises);
      intervalID = setTimeout(update, 500);
    };
    intervalID = setTimeout(update, 500);
  };
  const onStopMonitor = () => {
    intervalID && clearInterval(intervalID);
    intervalID = null;
    cpuState.update((draft) => {
      draft.monitoring = false;
    });
  };
  const cleanup = () => {
    onStopMonitor();
    cpuState.update((draft) => {
      for (let i = 0; i < draft.cpuCount; ++i) {
        draft.cpuFreq[i].scaling_cur_freq = -1;
        draft.cpuFreq[i].scaling_min_freq = -1;
        draft.cpuFreq[i].scaling_max_freq = -1;
        draft.cpuFreq[i].scaling_available_freqs = [];
        draft.cpuFreq[i].scaling_governor = "N/A";
      }
    });
  };
  const toggleThermalSidebar = () => {
    if (!cpuState.get().displayThermalInfo) {
      readThermalZones();
    }
    cpuState.update((draft) => {
      draft.displayThermalInfo = !draft.displayThermalInfo;
      draft.displayCPUDetail = false;
    });
  };
  const toggleCPUSidebar = () => {
    cpuState.update((draft) => {
      draft.displayCPUDetail = !draft.displayCPUDetail;
      draft.displayThermalInfo = false;
    });
  };
  executeShell("cat /sys/devices/system/cpu/possible").then((output) => {
    const idx = output.indexOf("-");
    const cpuFreq = [];
    const count = parseInt(output.substring(idx + 1), 10) + 1;
    for (let i = 0; i < count; ++i) {
      cpuFreq[i] = {
        cpu_id: i,
        scaling_cur_freq: -1,
        scaling_min_freq: -1,
        scaling_max_freq: -1,
        cpuinfo_min_freq: -1,
        cpuinfo_max_freq: -1,
        scaling_available_freqs: [],
        scaling_governor: "N/A",
        scaling_available_governors: []
      };
    }
    cpuState.set({
      cpuCount: count,
      cpuFreq,
      monitoring: false,
      hardwareInfo: "",
      temperatureMap: {},
      thermalAccessible: true,
      displayThermalInfo: false,
      displayCPUDetail: true
    });
  }).catch((e) => {
    console.error("Failed to read CPU cores:", e);
  });
  client.onDeactivate(() => cleanup());
  client.onActivate(() => {
    updateHardwareInfo();
    readThermalZones();
  });
  return {
    executeShell,
    cpuState,
    onStartMonitor,
    onStopMonitor,
    toggleCPUSidebar,
    toggleThermalSidebar
  };
}
var columns = [
  { key: "cpu_id", title: "CPU ID" },
  { key: "scaling_cur_freq", title: "Current Frequency" },
  { key: "scaling_min_freq", title: "Scaling min" },
  { key: "scaling_max_freq", title: "Scaling max" },
  { key: "cpuinfo_min_freq", title: "CPU min" },
  { key: "cpuinfo_max_freq", title: "CPU max" },
  { key: "scaling_governor", title: "Scaling governor" }
];
var cpuSidebarColumns = [
  {
    key: "key",
    title: "key",
    wrap: true
  },
  {
    key: "value",
    title: "value",
    wrap: true
  }
];
function Component2() {
  const instance = (0, import_flipper_plugin.usePlugin)(devicePlugin);
  const {
    onStartMonitor,
    onStopMonitor,
    toggleCPUSidebar,
    toggleThermalSidebar
  } = instance;
  const cpuState = (0, import_flipper_plugin.useValue)(instance.cpuState);
  const [selectedIds, setSelectedIds] = (0, import_react2.useState)([]);
  const sidebarRows = (id) => {
    let availableFreqTitle = "Scaling Available Frequencies";
    const selected = cpuState.cpuFreq[id];
    if (selected.scaling_available_freqs.length > 0) {
      availableFreqTitle += ` (${selected.scaling_available_freqs.length.toString()})`;
    }
    const keys = [availableFreqTitle, "Scaling Available Governors"];
    const vals = [
      buildAvailableFreqList(selected),
      buildAvailableGovList(selected)
    ];
    return keys.map((key, idx) => {
      return buildSidebarRow(key, vals[idx]);
    });
  };
  const renderCPUSidebar = () => {
    if (!cpuState.displayCPUDetail || selectedIds.length == 0) {
      return null;
    }
    const id = selectedIds[0];
    return /* @__PURE__ */ import_react2.default.createElement(import_flipper_plugin.DetailSidebar, { width: 500 }, /* @__PURE__ */ import_react2.default.createElement(import_flipper_plugin.Layout.Container, { pad: true }, /* @__PURE__ */ import_react2.default.createElement(import_antd.Typography.Title, null, "CPU Details: CPU_", id), /* @__PURE__ */ import_react2.default.createElement(
      import_flipper_plugin.DataTable,
      {
        records: sidebarRows(id),
        columns: cpuSidebarColumns,
        scrollable: false,
        enableSearchbar: false
      }
    )));
  };
  const renderThermalSidebar = () => {
    if (!cpuState.displayThermalInfo) {
      return null;
    }
    return /* @__PURE__ */ import_react2.default.createElement(import_flipper_plugin.DetailSidebar, { width: 500 }, /* @__PURE__ */ import_react2.default.createElement(
      import_flipper_plugin.Panel,
      {
        pad: import_flipper_plugin.theme.space.small,
        title: "Thermal Information",
        collapsible: false
      },
      cpuState.thermalAccessible ? /* @__PURE__ */ import_react2.default.createElement(TemperatureTable, { temperatureMap: cpuState.temperatureMap }) : "Temperature information not accessible on this device."
    ));
  };
  const setSelected = (0, import_react2.useCallback)((selected) => {
    setSelectedIds(selected ? [selected.core] : []);
  }, []);
  return /* @__PURE__ */ import_react2.default.createElement(import_flipper_plugin.Layout.Container, { pad: true }, /* @__PURE__ */ import_react2.default.createElement(import_antd.Typography.Title, null, "CPU Info"), /* @__PURE__ */ import_react2.default.createElement(import_flipper_plugin.Toolbar, null, cpuState.monitoring ? /* @__PURE__ */ import_react2.default.createElement(import_antd.Button, { onClick: onStopMonitor, icon: /* @__PURE__ */ import_react2.default.createElement(import_icons.PauseCircleOutlined, null) }, "Pause") : /* @__PURE__ */ import_react2.default.createElement(import_antd.Button, { onClick: onStartMonitor, icon: /* @__PURE__ */ import_react2.default.createElement(import_icons.PlayCircleOutlined, null) }, "Start"), "\xA0 ", cpuState.hardwareInfo, /* @__PURE__ */ import_react2.default.createElement(
    import_antd.Switch,
    {
      checked: cpuState.displayThermalInfo,
      onClick: toggleThermalSidebar
    }
  ), "Thermal Information", /* @__PURE__ */ import_react2.default.createElement(
    import_antd.Switch,
    {
      onClick: toggleCPUSidebar,
      checked: cpuState.displayCPUDetail
    }
  ), "CPU Details", cpuState.displayCPUDetail && selectedIds.length == 0 && " (Please select a core in the table below)"), /* @__PURE__ */ import_react2.default.createElement(
    import_flipper_plugin.DataTable,
    {
      records: frequencyRows(cpuState.cpuFreq),
      columns,
      scrollable: false,
      onSelect: setSelected,
      onRowStyle: getRowStyle,
      enableSearchbar: false
    }
  ), renderCPUSidebar(), renderThermalSidebar());
}
function buildAvailableGovList(freq) {
  if (freq.scaling_available_governors.length == 0) {
    return "N/A";
  }
  return freq.scaling_available_governors.join(", ");
}
function buildSidebarRow(key, val) {
  return {
    key,
    value: val
  };
}
function buildRow(freq) {
  return {
    core: freq.cpu_id,
    cpu_id: `CPU_${freq.cpu_id}`,
    scaling_cur_freq: formatFrequency(freq.scaling_cur_freq),
    scaling_min_freq: formatFrequency(freq.scaling_min_freq),
    scaling_max_freq: formatFrequency(freq.scaling_max_freq),
    cpuinfo_min_freq: formatFrequency(freq.cpuinfo_min_freq),
    cpuinfo_max_freq: formatFrequency(freq.cpuinfo_max_freq),
    scaling_governor: freq.scaling_governor
  };
}
function frequencyRows(cpuFreqs) {
  return cpuFreqs.map(buildRow);
}
function getRowStyle(freq) {
  if (freq.scaling_cur_freq == -2) {
    return {
      backgroundColor: import_flipper_plugin.theme.backgroundWash,
      color: import_flipper_plugin.theme.textColorPrimary,
      fontWeight: 700
    };
  } else if (freq.scaling_min_freq != freq.cpuinfo_min_freq && freq.scaling_min_freq > 0 && freq.cpuinfo_min_freq > 0) {
    return {
      backgroundColor: import_flipper_plugin.theme.warningColor,
      color: import_flipper_plugin.theme.textColorPrimary,
      fontWeight: 700
    };
  } else if (freq.scaling_max_freq != freq.cpuinfo_max_freq && freq.scaling_max_freq > 0 && freq.cpuinfo_max_freq > 0) {
    return {
      backgroundColor: import_flipper_plugin.theme.backgroundWash,
      color: import_flipper_plugin.theme.textColorSecondary,
      fontWeight: 700
    };
  }
}
function buildAvailableFreqList(freq) {
  if (freq.scaling_available_freqs.length == 0) {
    return /* @__PURE__ */ import_react2.default.createElement(import_antd.Typography.Text, null, "N/A");
  }
  const info = freq;
  return /* @__PURE__ */ import_react2.default.createElement(import_antd.Typography.Text, null, freq.scaling_available_freqs.map((freq2, idx) => {
    const bold = freq2 == info.scaling_cur_freq || freq2 == info.scaling_min_freq || freq2 == info.scaling_max_freq;
    return /* @__PURE__ */ import_react2.default.createElement(import_antd.Typography.Text, { key: idx, strong: bold }, formatFrequency(freq2), freq2 == info.scaling_cur_freq && /* @__PURE__ */ import_react2.default.createElement(import_antd.Typography.Text, { strong: bold }, " ", "(scaling current)"), freq2 == info.scaling_min_freq && /* @__PURE__ */ import_react2.default.createElement(import_antd.Typography.Text, { strong: bold }, " (scaling min)"), freq2 == info.scaling_max_freq && /* @__PURE__ */ import_react2.default.createElement(import_antd.Typography.Text, { strong: bold }, " (scaling max)"), /* @__PURE__ */ import_react2.default.createElement("br", null));
  }));
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vaW5kZXgudHN4IiwgIi4uL1RlbXBlcmF0dXJlVGFibGUudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZvcm1hdFxuICovXG5cbmltcG9ydCB7XG4gIGNyZWF0ZVN0YXRlLFxuICBQbHVnaW5DbGllbnQsXG4gIHVzZVBsdWdpbixcbiAgdXNlVmFsdWUsXG4gIFBhbmVsLFxuICB0aGVtZSxcbiAgTGF5b3V0LFxuICBEZXRhaWxTaWRlYmFyLFxuICBEYXRhVGFibGUsXG4gIERhdGFUYWJsZUNvbHVtbixcbiAgVG9vbGJhcixcbn0gZnJvbSAnZmxpcHBlci1wbHVnaW4nO1xuaW1wb3J0IFRlbXBlcmF0dXJlVGFibGUgZnJvbSAnLi9UZW1wZXJhdHVyZVRhYmxlJztcbmltcG9ydCB7QnV0dG9uLCBUeXBvZ3JhcGh5LCBTd2l0Y2h9IGZyb20gJ2FudGQnO1xuaW1wb3J0IHtQbGF5Q2lyY2xlT3V0bGluZWQsIFBhdXNlQ2lyY2xlT3V0bGluZWR9IGZyb20gJ0BhbnQtZGVzaWduL2ljb25zJztcblxuaW1wb3J0IFJlYWN0LCB7dXNlQ2FsbGJhY2ssIHVzZVN0YXRlfSBmcm9tICdyZWFjdCc7XG5cbi8vIHdlIGtlZXAgdmFpcmFibGUgbmFtZSB3aXRoIHVuZGVybGluZSBmb3IgdG8gcGh5c2ljYWwgcGF0aCBtYXBwaW5ncyBvbiBkZXZpY2VcbnR5cGUgQ1BVRnJlcXVlbmN5ID0ge1xuICBbaW5kZXg6IHN0cmluZ106IG51bWJlciB8IEFycmF5PG51bWJlcj4gfCBzdHJpbmcgfCBBcnJheTxzdHJpbmc+O1xuICBjcHVfaWQ6IG51bWJlcjtcbiAgc2NhbGluZ19jdXJfZnJlcTogbnVtYmVyO1xuICBzY2FsaW5nX21pbl9mcmVxOiBudW1iZXI7XG4gIHNjYWxpbmdfbWF4X2ZyZXE6IG51bWJlcjtcbiAgc2NhbGluZ19hdmFpbGFibGVfZnJlcXM6IEFycmF5PG51bWJlcj47XG4gIHNjYWxpbmdfZ292ZXJub3I6IHN0cmluZztcbiAgc2NhbGluZ19hdmFpbGFibGVfZ292ZXJub3JzOiBBcnJheTxzdHJpbmc+O1xuICBjcHVpbmZvX21heF9mcmVxOiBudW1iZXI7XG4gIGNwdWluZm9fbWluX2ZyZXE6IG51bWJlcjtcbn07XG5cbnR5cGUgQ1BVU3RhdGUgPSB7XG4gIGNwdUZyZXE6IEFycmF5PENQVUZyZXF1ZW5jeT47XG4gIGNwdUNvdW50OiBudW1iZXI7XG4gIG1vbml0b3Jpbmc6IGJvb2xlYW47XG4gIGhhcmR3YXJlSW5mbzogc3RyaW5nO1xuICB0ZW1wZXJhdHVyZU1hcDogYW55O1xuICB0aGVybWFsQWNjZXNzaWJsZTogYm9vbGVhbjtcbiAgZGlzcGxheVRoZXJtYWxJbmZvOiBib29sZWFuO1xuICBkaXNwbGF5Q1BVRGV0YWlsOiBib29sZWFuO1xufTtcblxuLy8gY2hlY2sgaWYgc3RyIGlzIGEgbnVtYmVyXG5mdW5jdGlvbiBpc05vcm1hbEludGVnZXIoc3RyOiBzdHJpbmcpIHtcbiAgY29uc3QgbiA9IE1hdGguZmxvb3IoTnVtYmVyKHN0cikpO1xuICByZXR1cm4gU3RyaW5nKG4pID09PSBzdHIgJiYgbiA+PSAwO1xufVxuXG4vLyBmb3JtYXQgZnJlcXVlbmN5IHRvIE1IeiwgR0h6XG5mdW5jdGlvbiBmb3JtYXRGcmVxdWVuY3koZnJlcTogbnVtYmVyKSB7XG4gIGlmIChmcmVxID09IC0xKSB7XG4gICAgcmV0dXJuICdOL0EnO1xuICB9IGVsc2UgaWYgKGZyZXEgPT0gLTIpIHtcbiAgICByZXR1cm4gJ29mZic7XG4gIH0gZWxzZSBpZiAoZnJlcSA+IDEwMDAgKiAxMDAwKSB7XG4gICAgcmV0dXJuIGAkeyhmcmVxIC8gMTAwMCAvIDEwMDApLnRvRml4ZWQoMil9IEdIemA7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGAke2ZyZXEgLyAxMDAwfSBNSHpgO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXZpY2VQbHVnaW4oY2xpZW50OiBQbHVnaW5DbGllbnQ8e30sIHt9Pikge1xuICBjb25zdCBkZXZpY2UgPSBjbGllbnQuZGV2aWNlO1xuXG4gIGNvbnN0IGV4ZWN1dGVTaGVsbCA9IGFzeW5jIChjb21tYW5kOiBzdHJpbmcpID0+IGRldmljZS5leGVjdXRlU2hlbGwoY29tbWFuZCk7XG5cbiAgbGV0IGludGVydmFsSUQ6IE5vZGVKUy5UaW1lciB8IG51bGwgPSBudWxsO1xuICBjb25zdCBjcHVTdGF0ZSA9IGNyZWF0ZVN0YXRlPENQVVN0YXRlPih7XG4gICAgY3B1Q291bnQ6IDAsXG4gICAgY3B1RnJlcTogW10sXG4gICAgbW9uaXRvcmluZzogZmFsc2UsXG4gICAgaGFyZHdhcmVJbmZvOiAnJyxcbiAgICB0ZW1wZXJhdHVyZU1hcDoge30sXG4gICAgdGhlcm1hbEFjY2Vzc2libGU6IHRydWUsXG4gICAgZGlzcGxheVRoZXJtYWxJbmZvOiBmYWxzZSxcbiAgICBkaXNwbGF5Q1BVRGV0YWlsOiB0cnVlLFxuICB9KTtcblxuICBjb25zdCB1cGRhdGVDb3JlRnJlcXVlbmN5OiAoXG4gICAgY29yZTogbnVtYmVyLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgKSA9PiBQcm9taXNlPHZvaWQ+ID0gYXN5bmMgKGNvcmU6IG51bWJlciwgdHlwZTogc3RyaW5nKSA9PiB7XG4gICAgY29uc3Qgb3V0cHV0ID0gYXdhaXQgZXhlY3V0ZVNoZWxsKFxuICAgICAgYGNhdCAvc3lzL2RldmljZXMvc3lzdGVtL2NwdS9jcHUke2NvcmV9L2NwdWZyZXEvJHt0eXBlfWAsXG4gICAgKTtcbiAgICBjcHVTdGF0ZS51cGRhdGUoKGRyYWZ0KSA9PiB7XG4gICAgICBjb25zdCBuZXdGcmVxID0gaXNOb3JtYWxJbnRlZ2VyKG91dHB1dCkgPyBwYXJzZUludChvdXRwdXQsIDEwKSA6IC0xO1xuICAgICAgLy8gdXBkYXRlIHRhYmxlIG9ubHkgaWYgZnJlcXVlbmN5IGNoYW5nZWRcbiAgICAgIGlmIChkcmFmdC5jcHVGcmVxW2NvcmVdW3R5cGVdICE9IG5ld0ZyZXEpIHtcbiAgICAgICAgZHJhZnQuY3B1RnJlcVtjb3JlXVt0eXBlXSA9IG5ld0ZyZXE7XG4gICAgICAgIGlmICh0eXBlID09ICdzY2FsaW5nX2N1cl9mcmVxJyAmJiBkcmFmdC5jcHVGcmVxW2NvcmVdW3R5cGVdIDwgMCkge1xuICAgICAgICAgIC8vIGNhbm5vdCBmaW5kIGN1cnJlbnQgZnJlcSBtZWFucyBvZmZsaW5lXG4gICAgICAgICAgZHJhZnQuY3B1RnJlcVtjb3JlXVt0eXBlXSA9IC0yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlQXZhaWxhYmxlRnJlcXVlbmNpZXM6IChjb3JlOiBudW1iZXIpID0+IFByb21pc2U8dm9pZD4gPSBhc3luYyAoXG4gICAgY29yZTogbnVtYmVyLFxuICApID0+IHtcbiAgICBjb25zdCBvdXRwdXQgPSBhd2FpdCBleGVjdXRlU2hlbGwoXG4gICAgICBgY2F0IC9zeXMvZGV2aWNlcy9zeXN0ZW0vY3B1L2NwdSR7Y29yZX0vY3B1ZnJlcS9zY2FsaW5nX2F2YWlsYWJsZV9mcmVxdWVuY2llc2AsXG4gICAgKTtcbiAgICBjcHVTdGF0ZS51cGRhdGUoKGRyYWZ0KSA9PiB7XG4gICAgICBjb25zdCBmcmVxcyA9IG91dHB1dC5zcGxpdCgnICcpLm1hcCgobnVtOiBzdHJpbmcpID0+IHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KG51bSwgMTApO1xuICAgICAgfSk7XG4gICAgICBkcmFmdC5jcHVGcmVxW2NvcmVdLnNjYWxpbmdfYXZhaWxhYmxlX2ZyZXFzID0gZnJlcXM7XG4gICAgICBjb25zdCBtYXhGcmVxID0gZHJhZnQuY3B1RnJlcVtjb3JlXS5zY2FsaW5nX21heF9mcmVxO1xuICAgICAgaWYgKG1heEZyZXEgPiAwICYmIGZyZXFzLmluZGV4T2YobWF4RnJlcSkgPT0gLTEpIHtcbiAgICAgICAgZnJlcXMucHVzaChtYXhGcmVxKTsgLy8gYWx3YXlzIGFkZCBzY2FsaW5nIG1heCB0byBhdmFpbGFibGUgZnJlcXVlbmNpZXNcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCB1cGRhdGVDb3JlR292ZXJub3I6IChjb3JlOiBudW1iZXIpID0+IFByb21pc2U8dm9pZD4gPSBhc3luYyAoXG4gICAgY29yZTogbnVtYmVyLFxuICApID0+IHtcbiAgICBjb25zdCBvdXRwdXQgPSBhd2FpdCBleGVjdXRlU2hlbGwoXG4gICAgICBgY2F0IC9zeXMvZGV2aWNlcy9zeXN0ZW0vY3B1L2NwdSR7Y29yZX0vY3B1ZnJlcS9zY2FsaW5nX2dvdmVybm9yYCxcbiAgICApO1xuICAgIGNwdVN0YXRlLnVwZGF0ZSgoZHJhZnQpID0+IHtcbiAgICAgIGlmIChvdXRwdXQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnbm8gc3VjaCBmaWxlJykpIHtcbiAgICAgICAgZHJhZnQuY3B1RnJlcVtjb3JlXS5zY2FsaW5nX2dvdmVybm9yID0gJ04vQSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkcmFmdC5jcHVGcmVxW2NvcmVdLnNjYWxpbmdfZ292ZXJub3IgPSBvdXRwdXQ7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgcmVhZEF2YWlsYWJsZUdvdmVybm9yczogKGNvcmU6IG51bWJlcikgPT4gUHJvbWlzZTxzdHJpbmdbXT4gPSBhc3luYyAoXG4gICAgY29yZTogbnVtYmVyLFxuICApID0+IHtcbiAgICBjb25zdCBvdXRwdXQgPSBhd2FpdCBleGVjdXRlU2hlbGwoXG4gICAgICBgY2F0IC9zeXMvZGV2aWNlcy9zeXN0ZW0vY3B1L2NwdSR7Y29yZX0vY3B1ZnJlcS9zY2FsaW5nX2F2YWlsYWJsZV9nb3Zlcm5vcnNgLFxuICAgICk7XG4gICAgcmV0dXJuIG91dHB1dC5zcGxpdCgnICcpO1xuICB9O1xuXG4gIGNvbnN0IHJlYWRDb3JlRnJlcXVlbmN5ID0gYXN5bmMgKGNvcmU6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IGZyZXEgPSBjcHVTdGF0ZS5nZXQoKS5jcHVGcmVxW2NvcmVdO1xuICAgIGNvbnN0IHByb21pc2VzID0gW107XG4gICAgaWYgKGZyZXEuY3B1aW5mb19tYXhfZnJlcSA8IDApIHtcbiAgICAgIHByb21pc2VzLnB1c2godXBkYXRlQ29yZUZyZXF1ZW5jeShjb3JlLCAnY3B1aW5mb19tYXhfZnJlcScpKTtcbiAgICB9XG4gICAgaWYgKGZyZXEuY3B1aW5mb19taW5fZnJlcSA8IDApIHtcbiAgICAgIHByb21pc2VzLnB1c2godXBkYXRlQ29yZUZyZXF1ZW5jeShjb3JlLCAnY3B1aW5mb19taW5fZnJlcScpKTtcbiAgICB9XG4gICAgcHJvbWlzZXMucHVzaCh1cGRhdGVDb3JlRnJlcXVlbmN5KGNvcmUsICdzY2FsaW5nX2N1cl9mcmVxJykpO1xuICAgIHByb21pc2VzLnB1c2godXBkYXRlQ29yZUZyZXF1ZW5jeShjb3JlLCAnc2NhbGluZ19taW5fZnJlcScpKTtcbiAgICBwcm9taXNlcy5wdXNoKHVwZGF0ZUNvcmVGcmVxdWVuY3koY29yZSwgJ3NjYWxpbmdfbWF4X2ZyZXEnKSk7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHt9KTtcbiAgfTtcblxuICBjb25zdCB1cGRhdGVIYXJkd2FyZUluZm8gPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3Qgb3V0cHV0ID0gYXdhaXQgZXhlY3V0ZVNoZWxsKCdnZXRwcm9wIHJvLmJvYXJkLnBsYXRmb3JtJyk7XG4gICAgbGV0IGh3SW5mbyA9ICcnO1xuICAgIGlmIChcbiAgICAgIG91dHB1dC5zdGFydHNXaXRoKCdtc20nKSB8fFxuICAgICAgb3V0cHV0LnN0YXJ0c1dpdGgoJ2FwcScpIHx8XG4gICAgICBvdXRwdXQuc3RhcnRzV2l0aCgnc2RtJylcbiAgICApIHtcbiAgICAgIGh3SW5mbyA9IGBRVUFMQ09NTSAke291dHB1dC50b1VwcGVyQ2FzZSgpfWA7XG4gICAgfSBlbHNlIGlmIChvdXRwdXQuc3RhcnRzV2l0aCgnZXh5bm9zJykpIHtcbiAgICAgIGNvbnN0IGNoaXBuYW1lID0gYXdhaXQgZXhlY3V0ZVNoZWxsKCdnZXRwcm9wIHJvLmNoaXBuYW1lJyk7XG4gICAgICBpZiAoY2hpcG5hbWUgIT0gbnVsbCkge1xuICAgICAgICBjcHVTdGF0ZS51cGRhdGUoKGRyYWZ0KSA9PiB7XG4gICAgICAgICAgZHJhZnQuaGFyZHdhcmVJbmZvID0gYFNBTVNVTUcgJHtjaGlwbmFtZS50b1VwcGVyQ2FzZSgpfWA7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAob3V0cHV0LnN0YXJ0c1dpdGgoJ210JykpIHtcbiAgICAgIGh3SW5mbyA9IGBNRURJQVRFSyAke291dHB1dC50b1VwcGVyQ2FzZSgpfWA7XG4gICAgfSBlbHNlIGlmIChvdXRwdXQuc3RhcnRzV2l0aCgnc2MnKSkge1xuICAgICAgaHdJbmZvID0gYFNQUkVBRFRSVU0gJHtvdXRwdXQudG9VcHBlckNhc2UoKX1gO1xuICAgIH0gZWxzZSBpZiAob3V0cHV0LnN0YXJ0c1dpdGgoJ2hpJykgfHwgb3V0cHV0LnN0YXJ0c1dpdGgoJ2tpcmluJykpIHtcbiAgICAgIGh3SW5mbyA9IGBISVNJTElDT04gJHtvdXRwdXQudG9VcHBlckNhc2UoKX1gO1xuICAgIH0gZWxzZSBpZiAob3V0cHV0LnN0YXJ0c1dpdGgoJ3JrJykpIHtcbiAgICAgIGh3SW5mbyA9IGBST0NLQ0hJUCAke291dHB1dC50b1VwcGVyQ2FzZSgpfWA7XG4gICAgfSBlbHNlIGlmIChvdXRwdXQuc3RhcnRzV2l0aCgnYmNtJykpIHtcbiAgICAgIGh3SW5mbyA9IGBCUk9BRENPTSAke291dHB1dC50b1VwcGVyQ2FzZSgpfWA7XG4gICAgfVxuICAgIGNwdVN0YXRlLnVwZGF0ZSgoZHJhZnQpID0+IHtcbiAgICAgIGRyYWZ0LmhhcmR3YXJlSW5mbyA9IGh3SW5mbztcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCByZWFkVGhlcm1hbFpvbmVzID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHRoZXJtYWxfZGlyID0gJy9zeXMvY2xhc3MvdGhlcm1hbC8nO1xuICAgIGNvbnN0IG1hcCA9IHt9O1xuICAgIGNvbnN0IG91dHB1dCA9IGF3YWl0IGV4ZWN1dGVTaGVsbChgbHMgJHt0aGVybWFsX2Rpcn1gKTtcbiAgICBpZiAob3V0cHV0LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ3Blcm1pc3Npb24gZGVuaWVkJykpIHtcbiAgICAgIGNwdVN0YXRlLnVwZGF0ZSgoZHJhZnQpID0+IHtcbiAgICAgICAgZHJhZnQudGhlcm1hbEFjY2Vzc2libGUgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBkaXJzID0gb3V0cHV0LnNwbGl0KC9cXHMvKTtcbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuICAgIGZvciAobGV0IGQgb2YgZGlycykge1xuICAgICAgZCA9IGQudHJpbSgpO1xuICAgICAgaWYgKGQubGVuZ3RoID09IDApIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBjb25zdCBwYXRoID0gdGhlcm1hbF9kaXIgKyBkO1xuICAgICAgcHJvbWlzZXMucHVzaChyZWFkVGhlcm1hbFpvbmUocGF0aCwgZCwgbWFwKSk7XG4gICAgfVxuICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICBjcHVTdGF0ZS51cGRhdGUoKGRyYWZ0KSA9PiB7XG4gICAgICBkcmFmdC50ZW1wZXJhdHVyZU1hcCA9IG1hcDtcbiAgICAgIGRyYWZ0LnRoZXJtYWxBY2Nlc3NpYmxlID0gdHJ1ZTtcbiAgICB9KTtcbiAgICBpZiAoY3B1U3RhdGUuZ2V0KCkuZGlzcGxheVRoZXJtYWxJbmZvKSB7XG4gICAgICBzZXRUaW1lb3V0KHJlYWRUaGVybWFsWm9uZXMsIDEwMDApO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZWFkVGhlcm1hbFpvbmUgPSBhc3luYyAocGF0aDogc3RyaW5nLCBkaXI6IHN0cmluZywgbWFwOiBhbnkpID0+IHtcbiAgICBjb25zdCB0eXBlID0gYXdhaXQgZXhlY3V0ZVNoZWxsKGBjYXQgJHtwYXRofS90eXBlYCk7XG4gICAgaWYgKHR5cGUubGVuZ3RoID09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdGVtcCA9IGF3YWl0IGV4ZWN1dGVTaGVsbChgY2F0ICR7cGF0aH0vdGVtcGApO1xuICAgIGlmIChOdW1iZXIuaXNOYU4oTnVtYmVyKHRlbXApKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBtYXBbdHlwZV0gPSB7XG4gICAgICBwYXRoOiBkaXIsXG4gICAgICB0ZW1wOiBwYXJzZUludCh0ZW1wLCAxMCksXG4gICAgfTtcbiAgfTtcblxuICBjb25zdCBvblN0YXJ0TW9uaXRvciA9ICgpID0+IHtcbiAgICBpZiAoY3B1U3RhdGUuZ2V0KCkubW9uaXRvcmluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNwdVN0YXRlLnVwZGF0ZSgoZHJhZnQpID0+IHtcbiAgICAgIGRyYWZ0Lm1vbml0b3JpbmcgPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjcHVTdGF0ZS5nZXQoKS5jcHVDb3VudDsgKytpKSB7XG4gICAgICByZWFkQXZhaWxhYmxlR292ZXJub3JzKGkpXG4gICAgICAgIC50aGVuKChvdXRwdXQpID0+IHtcbiAgICAgICAgICBjcHVTdGF0ZS51cGRhdGUoKGRyYWZ0KSA9PiB7XG4gICAgICAgICAgICBkcmFmdC5jcHVGcmVxW2ldLnNjYWxpbmdfYXZhaWxhYmxlX2dvdmVybm9ycyA9IG91dHB1dDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHJlYWQgQ1BVIGdvdmVybm9yczonLCBlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgdXBkYXRlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKCFjcHVTdGF0ZS5nZXQoKS5tb25pdG9yaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHByb21pc2VzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNwdVN0YXRlLmdldCgpLmNwdUNvdW50OyArK2kpIHtcbiAgICAgICAgcHJvbWlzZXMucHVzaChyZWFkQ29yZUZyZXF1ZW5jeShpKSk7XG4gICAgICAgIHByb21pc2VzLnB1c2godXBkYXRlQ29yZUdvdmVybm9yKGkpKTtcbiAgICAgICAgcHJvbWlzZXMucHVzaCh1cGRhdGVBdmFpbGFibGVGcmVxdWVuY2llcyhpKSk7IC8vIHNjYWxpbmcgbWF4IG1pZ2h0IGNoYW5nZSwgc28gd2UgYWxzbyB1cGRhdGUgdGhpc1xuICAgICAgfVxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgICAgaW50ZXJ2YWxJRCA9IHNldFRpbWVvdXQodXBkYXRlLCA1MDApO1xuICAgIH07XG5cbiAgICBpbnRlcnZhbElEID0gc2V0VGltZW91dCh1cGRhdGUsIDUwMCk7XG4gIH07XG5cbiAgY29uc3Qgb25TdG9wTW9uaXRvciA9ICgpID0+IHtcbiAgICBpbnRlcnZhbElEICYmIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJRCk7XG4gICAgaW50ZXJ2YWxJRCA9IG51bGw7XG4gICAgY3B1U3RhdGUudXBkYXRlKChkcmFmdCkgPT4ge1xuICAgICAgZHJhZnQubW9uaXRvcmluZyA9IGZhbHNlO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGNsZWFudXAgPSAoKSA9PiB7XG4gICAgb25TdG9wTW9uaXRvcigpO1xuICAgIGNwdVN0YXRlLnVwZGF0ZSgoZHJhZnQpID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZHJhZnQuY3B1Q291bnQ7ICsraSkge1xuICAgICAgICBkcmFmdC5jcHVGcmVxW2ldLnNjYWxpbmdfY3VyX2ZyZXEgPSAtMTtcbiAgICAgICAgZHJhZnQuY3B1RnJlcVtpXS5zY2FsaW5nX21pbl9mcmVxID0gLTE7XG4gICAgICAgIGRyYWZ0LmNwdUZyZXFbaV0uc2NhbGluZ19tYXhfZnJlcSA9IC0xO1xuICAgICAgICBkcmFmdC5jcHVGcmVxW2ldLnNjYWxpbmdfYXZhaWxhYmxlX2ZyZXFzID0gW107XG4gICAgICAgIGRyYWZ0LmNwdUZyZXFbaV0uc2NhbGluZ19nb3Zlcm5vciA9ICdOL0EnO1xuICAgICAgICAvLyB3ZSBkb24ndCBjbGVhbnVwIGNwdWluZm9fbWluX2ZyZXEsIGNwdWluZm9fbWF4X2ZyZXFcbiAgICAgICAgLy8gYmVjYXVzZSB1c3VhbGx5IHRoZXkgYXJlIGZpeGVkIChoYXJkd2FyZSlcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCB0b2dnbGVUaGVybWFsU2lkZWJhciA9ICgpID0+IHtcbiAgICBpZiAoIWNwdVN0YXRlLmdldCgpLmRpc3BsYXlUaGVybWFsSW5mbykge1xuICAgICAgcmVhZFRoZXJtYWxab25lcygpO1xuICAgIH1cbiAgICBjcHVTdGF0ZS51cGRhdGUoKGRyYWZ0KSA9PiB7XG4gICAgICBkcmFmdC5kaXNwbGF5VGhlcm1hbEluZm8gPSAhZHJhZnQuZGlzcGxheVRoZXJtYWxJbmZvO1xuICAgICAgZHJhZnQuZGlzcGxheUNQVURldGFpbCA9IGZhbHNlO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHRvZ2dsZUNQVVNpZGViYXIgPSAoKSA9PiB7XG4gICAgY3B1U3RhdGUudXBkYXRlKChkcmFmdCkgPT4ge1xuICAgICAgZHJhZnQuZGlzcGxheUNQVURldGFpbCA9ICFkcmFmdC5kaXNwbGF5Q1BVRGV0YWlsO1xuICAgICAgZHJhZnQuZGlzcGxheVRoZXJtYWxJbmZvID0gZmFsc2U7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gY2hlY2sgaG93IG1hbnkgY29yZXMgd2UgaGF2ZSBvbiB0aGlzIGRldmljZVxuICBleGVjdXRlU2hlbGwoJ2NhdCAvc3lzL2RldmljZXMvc3lzdGVtL2NwdS9wb3NzaWJsZScpXG4gICAgLnRoZW4oKG91dHB1dCkgPT4ge1xuICAgICAgY29uc3QgaWR4ID0gb3V0cHV0LmluZGV4T2YoJy0nKTtcbiAgICAgIGNvbnN0IGNwdUZyZXEgPSBbXTtcbiAgICAgIGNvbnN0IGNvdW50ID0gcGFyc2VJbnQob3V0cHV0LnN1YnN0cmluZyhpZHggKyAxKSwgMTApICsgMTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7ICsraSkge1xuICAgICAgICBjcHVGcmVxW2ldID0ge1xuICAgICAgICAgIGNwdV9pZDogaSxcbiAgICAgICAgICBzY2FsaW5nX2N1cl9mcmVxOiAtMSxcbiAgICAgICAgICBzY2FsaW5nX21pbl9mcmVxOiAtMSxcbiAgICAgICAgICBzY2FsaW5nX21heF9mcmVxOiAtMSxcbiAgICAgICAgICBjcHVpbmZvX21pbl9mcmVxOiAtMSxcbiAgICAgICAgICBjcHVpbmZvX21heF9mcmVxOiAtMSxcbiAgICAgICAgICBzY2FsaW5nX2F2YWlsYWJsZV9mcmVxczogW10sXG4gICAgICAgICAgc2NhbGluZ19nb3Zlcm5vcjogJ04vQScsXG4gICAgICAgICAgc2NhbGluZ19hdmFpbGFibGVfZ292ZXJub3JzOiBbXSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGNwdVN0YXRlLnNldCh7XG4gICAgICAgIGNwdUNvdW50OiBjb3VudCxcbiAgICAgICAgY3B1RnJlcSxcbiAgICAgICAgbW9uaXRvcmluZzogZmFsc2UsXG4gICAgICAgIGhhcmR3YXJlSW5mbzogJycsXG4gICAgICAgIHRlbXBlcmF0dXJlTWFwOiB7fSxcbiAgICAgICAgdGhlcm1hbEFjY2Vzc2libGU6IHRydWUsXG4gICAgICAgIGRpc3BsYXlUaGVybWFsSW5mbzogZmFsc2UsXG4gICAgICAgIGRpc3BsYXlDUFVEZXRhaWw6IHRydWUsXG4gICAgICB9KTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHJlYWQgQ1BVIGNvcmVzOicsIGUpO1xuICAgIH0pO1xuXG4gIGNsaWVudC5vbkRlYWN0aXZhdGUoKCkgPT4gY2xlYW51cCgpKTtcbiAgY2xpZW50Lm9uQWN0aXZhdGUoKCkgPT4ge1xuICAgIHVwZGF0ZUhhcmR3YXJlSW5mbygpO1xuICAgIHJlYWRUaGVybWFsWm9uZXMoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICBleGVjdXRlU2hlbGwsXG4gICAgY3B1U3RhdGUsXG4gICAgb25TdGFydE1vbml0b3IsXG4gICAgb25TdG9wTW9uaXRvcixcbiAgICB0b2dnbGVDUFVTaWRlYmFyLFxuICAgIHRvZ2dsZVRoZXJtYWxTaWRlYmFyLFxuICB9O1xufVxuXG5jb25zdCBjb2x1bW5zOiBEYXRhVGFibGVDb2x1bW5bXSA9IFtcbiAge2tleTogJ2NwdV9pZCcsIHRpdGxlOiAnQ1BVIElEJ30sXG4gIHtrZXk6ICdzY2FsaW5nX2N1cl9mcmVxJywgdGl0bGU6ICdDdXJyZW50IEZyZXF1ZW5jeSd9LFxuICB7a2V5OiAnc2NhbGluZ19taW5fZnJlcScsIHRpdGxlOiAnU2NhbGluZyBtaW4nfSxcbiAge2tleTogJ3NjYWxpbmdfbWF4X2ZyZXEnLCB0aXRsZTogJ1NjYWxpbmcgbWF4J30sXG4gIHtrZXk6ICdjcHVpbmZvX21pbl9mcmVxJywgdGl0bGU6ICdDUFUgbWluJ30sXG4gIHtrZXk6ICdjcHVpbmZvX21heF9mcmVxJywgdGl0bGU6ICdDUFUgbWF4J30sXG4gIHtrZXk6ICdzY2FsaW5nX2dvdmVybm9yJywgdGl0bGU6ICdTY2FsaW5nIGdvdmVybm9yJ30sXG5dO1xuXG5jb25zdCBjcHVTaWRlYmFyQ29sdW1uczogRGF0YVRhYmxlQ29sdW1uW10gPSBbXG4gIHtcbiAgICBrZXk6ICdrZXknLFxuICAgIHRpdGxlOiAna2V5JyxcbiAgICB3cmFwOiB0cnVlLFxuICB9LFxuICB7XG4gICAga2V5OiAndmFsdWUnLFxuICAgIHRpdGxlOiAndmFsdWUnLFxuICAgIHdyYXA6IHRydWUsXG4gIH0sXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gQ29tcG9uZW50KCkge1xuICBjb25zdCBpbnN0YW5jZSA9IHVzZVBsdWdpbihkZXZpY2VQbHVnaW4pO1xuICBjb25zdCB7XG4gICAgb25TdGFydE1vbml0b3IsXG4gICAgb25TdG9wTW9uaXRvcixcbiAgICB0b2dnbGVDUFVTaWRlYmFyLFxuICAgIHRvZ2dsZVRoZXJtYWxTaWRlYmFyLFxuICB9ID0gaW5zdGFuY2U7XG5cbiAgY29uc3QgY3B1U3RhdGUgPSB1c2VWYWx1ZShpbnN0YW5jZS5jcHVTdGF0ZSk7XG5cbiAgY29uc3QgW3NlbGVjdGVkSWRzLCBzZXRTZWxlY3RlZElkc10gPSB1c2VTdGF0ZTxudW1iZXJbXT4oW10pO1xuXG4gIGNvbnN0IHNpZGViYXJSb3dzID0gKGlkOiBudW1iZXIpID0+IHtcbiAgICBsZXQgYXZhaWxhYmxlRnJlcVRpdGxlID0gJ1NjYWxpbmcgQXZhaWxhYmxlIEZyZXF1ZW5jaWVzJztcbiAgICBjb25zdCBzZWxlY3RlZCA9IGNwdVN0YXRlLmNwdUZyZXFbaWRdO1xuICAgIGlmIChzZWxlY3RlZC5zY2FsaW5nX2F2YWlsYWJsZV9mcmVxcy5sZW5ndGggPiAwKSB7XG4gICAgICBhdmFpbGFibGVGcmVxVGl0bGUgKz0gYCAoJHtzZWxlY3RlZC5zY2FsaW5nX2F2YWlsYWJsZV9mcmVxcy5sZW5ndGgudG9TdHJpbmcoKX0pYDtcbiAgICB9XG5cbiAgICBjb25zdCBrZXlzID0gW2F2YWlsYWJsZUZyZXFUaXRsZSwgJ1NjYWxpbmcgQXZhaWxhYmxlIEdvdmVybm9ycyddO1xuXG4gICAgY29uc3QgdmFscyA9IFtcbiAgICAgIGJ1aWxkQXZhaWxhYmxlRnJlcUxpc3Qoc2VsZWN0ZWQpLFxuICAgICAgYnVpbGRBdmFpbGFibGVHb3ZMaXN0KHNlbGVjdGVkKSxcbiAgICBdO1xuICAgIHJldHVybiBrZXlzLm1hcDxhbnk+KChrZXksIGlkeCkgPT4ge1xuICAgICAgcmV0dXJuIGJ1aWxkU2lkZWJhclJvdyhrZXksIHZhbHNbaWR4XSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgcmVuZGVyQ1BVU2lkZWJhciA9ICgpID0+IHtcbiAgICBpZiAoIWNwdVN0YXRlLmRpc3BsYXlDUFVEZXRhaWwgfHwgc2VsZWN0ZWRJZHMubGVuZ3RoID09IDApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBpZCA9IHNlbGVjdGVkSWRzWzBdO1xuICAgIHJldHVybiAoXG4gICAgICA8RGV0YWlsU2lkZWJhciB3aWR0aD17NTAwfT5cbiAgICAgICAgPExheW91dC5Db250YWluZXIgcGFkPlxuICAgICAgICAgIDxUeXBvZ3JhcGh5LlRpdGxlPkNQVSBEZXRhaWxzOiBDUFVfe2lkfTwvVHlwb2dyYXBoeS5UaXRsZT5cbiAgICAgICAgICA8RGF0YVRhYmxlXG4gICAgICAgICAgICByZWNvcmRzPXtzaWRlYmFyUm93cyhpZCl9XG4gICAgICAgICAgICBjb2x1bW5zPXtjcHVTaWRlYmFyQ29sdW1uc31cbiAgICAgICAgICAgIHNjcm9sbGFibGU9e2ZhbHNlfVxuICAgICAgICAgICAgZW5hYmxlU2VhcmNoYmFyPXtmYWxzZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0xheW91dC5Db250YWluZXI+XG4gICAgICA8L0RldGFpbFNpZGViYXI+XG4gICAgKTtcbiAgfTtcblxuICBjb25zdCByZW5kZXJUaGVybWFsU2lkZWJhciA9ICgpID0+IHtcbiAgICBpZiAoIWNwdVN0YXRlLmRpc3BsYXlUaGVybWFsSW5mbykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8RGV0YWlsU2lkZWJhciB3aWR0aD17NTAwfT5cbiAgICAgICAgPFBhbmVsXG4gICAgICAgICAgcGFkPXt0aGVtZS5zcGFjZS5zbWFsbH1cbiAgICAgICAgICB0aXRsZT1cIlRoZXJtYWwgSW5mb3JtYXRpb25cIlxuICAgICAgICAgIGNvbGxhcHNpYmxlPXtmYWxzZX0+XG4gICAgICAgICAge2NwdVN0YXRlLnRoZXJtYWxBY2Nlc3NpYmxlID8gKFxuICAgICAgICAgICAgPFRlbXBlcmF0dXJlVGFibGUgdGVtcGVyYXR1cmVNYXA9e2NwdVN0YXRlLnRlbXBlcmF0dXJlTWFwfSAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAnVGVtcGVyYXR1cmUgaW5mb3JtYXRpb24gbm90IGFjY2Vzc2libGUgb24gdGhpcyBkZXZpY2UuJ1xuICAgICAgICAgICl9XG4gICAgICAgIDwvUGFuZWw+XG4gICAgICA8L0RldGFpbFNpZGViYXI+XG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBzZXRTZWxlY3RlZCA9IHVzZUNhbGxiYWNrKChzZWxlY3RlZDogYW55KSA9PiB7XG4gICAgc2V0U2VsZWN0ZWRJZHMoc2VsZWN0ZWQgPyBbc2VsZWN0ZWQuY29yZV0gOiBbXSk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDxMYXlvdXQuQ29udGFpbmVyIHBhZD5cbiAgICAgIDxUeXBvZ3JhcGh5LlRpdGxlPkNQVSBJbmZvPC9UeXBvZ3JhcGh5LlRpdGxlPlxuICAgICAgPFRvb2xiYXI+XG4gICAgICAgIHtjcHVTdGF0ZS5tb25pdG9yaW5nID8gKFxuICAgICAgICAgIDxCdXR0b24gb25DbGljaz17b25TdG9wTW9uaXRvcn0gaWNvbj17PFBhdXNlQ2lyY2xlT3V0bGluZWQgLz59PlxuICAgICAgICAgICAgUGF1c2VcbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e29uU3RhcnRNb25pdG9yfSBpY29uPXs8UGxheUNpcmNsZU91dGxpbmVkIC8+fT5cbiAgICAgICAgICAgIFN0YXJ0XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICl9XG4gICAgICAgICZuYnNwOyB7Y3B1U3RhdGUuaGFyZHdhcmVJbmZvfVxuICAgICAgICA8U3dpdGNoXG4gICAgICAgICAgY2hlY2tlZD17Y3B1U3RhdGUuZGlzcGxheVRoZXJtYWxJbmZvfVxuICAgICAgICAgIG9uQ2xpY2s9e3RvZ2dsZVRoZXJtYWxTaWRlYmFyfVxuICAgICAgICAvPlxuICAgICAgICBUaGVybWFsIEluZm9ybWF0aW9uXG4gICAgICAgIDxTd2l0Y2hcbiAgICAgICAgICBvbkNsaWNrPXt0b2dnbGVDUFVTaWRlYmFyfVxuICAgICAgICAgIGNoZWNrZWQ9e2NwdVN0YXRlLmRpc3BsYXlDUFVEZXRhaWx9XG4gICAgICAgIC8+XG4gICAgICAgIENQVSBEZXRhaWxzXG4gICAgICAgIHtjcHVTdGF0ZS5kaXNwbGF5Q1BVRGV0YWlsICYmXG4gICAgICAgICAgc2VsZWN0ZWRJZHMubGVuZ3RoID09IDAgJiZcbiAgICAgICAgICAnIChQbGVhc2Ugc2VsZWN0IGEgY29yZSBpbiB0aGUgdGFibGUgYmVsb3cpJ31cbiAgICAgIDwvVG9vbGJhcj5cblxuICAgICAgPERhdGFUYWJsZVxuICAgICAgICByZWNvcmRzPXtmcmVxdWVuY3lSb3dzKGNwdVN0YXRlLmNwdUZyZXEpfVxuICAgICAgICBjb2x1bW5zPXtjb2x1bW5zfVxuICAgICAgICBzY3JvbGxhYmxlPXtmYWxzZX1cbiAgICAgICAgb25TZWxlY3Q9e3NldFNlbGVjdGVkfVxuICAgICAgICBvblJvd1N0eWxlPXtnZXRSb3dTdHlsZX1cbiAgICAgICAgZW5hYmxlU2VhcmNoYmFyPXtmYWxzZX1cbiAgICAgIC8+XG4gICAgICB7cmVuZGVyQ1BVU2lkZWJhcigpfVxuICAgICAge3JlbmRlclRoZXJtYWxTaWRlYmFyKCl9XG4gICAgPC9MYXlvdXQuQ29udGFpbmVyPlxuICApO1xufVxuXG5mdW5jdGlvbiBidWlsZEF2YWlsYWJsZUdvdkxpc3QoZnJlcTogQ1BVRnJlcXVlbmN5KTogc3RyaW5nIHtcbiAgaWYgKGZyZXEuc2NhbGluZ19hdmFpbGFibGVfZ292ZXJub3JzLmxlbmd0aCA9PSAwKSB7XG4gICAgcmV0dXJuICdOL0EnO1xuICB9XG4gIHJldHVybiBmcmVxLnNjYWxpbmdfYXZhaWxhYmxlX2dvdmVybm9ycy5qb2luKCcsICcpO1xufVxuXG5mdW5jdGlvbiBidWlsZFNpZGViYXJSb3coa2V5OiBzdHJpbmcsIHZhbDogYW55KSB7XG4gIHJldHVybiB7XG4gICAga2V5LFxuICAgIHZhbHVlOiB2YWwsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGJ1aWxkUm93KGZyZXE6IENQVUZyZXF1ZW5jeSkge1xuICByZXR1cm4ge1xuICAgIGNvcmU6IGZyZXEuY3B1X2lkLFxuICAgIGNwdV9pZDogYENQVV8ke2ZyZXEuY3B1X2lkfWAsXG4gICAgc2NhbGluZ19jdXJfZnJlcTogZm9ybWF0RnJlcXVlbmN5KGZyZXEuc2NhbGluZ19jdXJfZnJlcSksXG4gICAgc2NhbGluZ19taW5fZnJlcTogZm9ybWF0RnJlcXVlbmN5KGZyZXEuc2NhbGluZ19taW5fZnJlcSksXG4gICAgc2NhbGluZ19tYXhfZnJlcTogZm9ybWF0RnJlcXVlbmN5KGZyZXEuc2NhbGluZ19tYXhfZnJlcSksXG4gICAgY3B1aW5mb19taW5fZnJlcTogZm9ybWF0RnJlcXVlbmN5KGZyZXEuY3B1aW5mb19taW5fZnJlcSksXG4gICAgY3B1aW5mb19tYXhfZnJlcTogZm9ybWF0RnJlcXVlbmN5KGZyZXEuY3B1aW5mb19tYXhfZnJlcSksXG4gICAgc2NhbGluZ19nb3Zlcm5vcjogZnJlcS5zY2FsaW5nX2dvdmVybm9yLFxuICB9O1xufVxuXG5mdW5jdGlvbiBmcmVxdWVuY3lSb3dzKGNwdUZyZXFzOiBBcnJheTxDUFVGcmVxdWVuY3k+KSB7XG4gIHJldHVybiBjcHVGcmVxcy5tYXAoYnVpbGRSb3cpO1xufVxuXG5mdW5jdGlvbiBnZXRSb3dTdHlsZShmcmVxOiBDUFVGcmVxdWVuY3kpIHtcbiAgaWYgKGZyZXEuc2NhbGluZ19jdXJfZnJlcSA9PSAtMikge1xuICAgIHJldHVybiB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmJhY2tncm91bmRXYXNoLFxuICAgICAgY29sb3I6IHRoZW1lLnRleHRDb2xvclByaW1hcnksXG4gICAgICBmb250V2VpZ2h0OiA3MDAsXG4gICAgfTtcbiAgfSBlbHNlIGlmIChcbiAgICBmcmVxLnNjYWxpbmdfbWluX2ZyZXEgIT0gZnJlcS5jcHVpbmZvX21pbl9mcmVxICYmXG4gICAgZnJlcS5zY2FsaW5nX21pbl9mcmVxID4gMCAmJlxuICAgIGZyZXEuY3B1aW5mb19taW5fZnJlcSA+IDBcbiAgKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogdGhlbWUud2FybmluZ0NvbG9yLFxuICAgICAgY29sb3I6IHRoZW1lLnRleHRDb2xvclByaW1hcnksXG4gICAgICBmb250V2VpZ2h0OiA3MDAsXG4gICAgfTtcbiAgfSBlbHNlIGlmIChcbiAgICBmcmVxLnNjYWxpbmdfbWF4X2ZyZXEgIT0gZnJlcS5jcHVpbmZvX21heF9mcmVxICYmXG4gICAgZnJlcS5zY2FsaW5nX21heF9mcmVxID4gMCAmJlxuICAgIGZyZXEuY3B1aW5mb19tYXhfZnJlcSA+IDBcbiAgKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogdGhlbWUuYmFja2dyb3VuZFdhc2gsXG4gICAgICBjb2xvcjogdGhlbWUudGV4dENvbG9yU2Vjb25kYXJ5LFxuICAgICAgZm9udFdlaWdodDogNzAwLFxuICAgIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gYnVpbGRBdmFpbGFibGVGcmVxTGlzdChmcmVxOiBDUFVGcmVxdWVuY3kpIHtcbiAgaWYgKGZyZXEuc2NhbGluZ19hdmFpbGFibGVfZnJlcXMubGVuZ3RoID09IDApIHtcbiAgICByZXR1cm4gPFR5cG9ncmFwaHkuVGV4dD5OL0E8L1R5cG9ncmFwaHkuVGV4dD47XG4gIH1cbiAgY29uc3QgaW5mbyA9IGZyZXE7XG4gIHJldHVybiAoXG4gICAgPFR5cG9ncmFwaHkuVGV4dD5cbiAgICAgIHtmcmVxLnNjYWxpbmdfYXZhaWxhYmxlX2ZyZXFzLm1hcCgoZnJlcSwgaWR4KSA9PiB7XG4gICAgICAgIGNvbnN0IGJvbGQgPVxuICAgICAgICAgIGZyZXEgPT0gaW5mby5zY2FsaW5nX2N1cl9mcmVxIHx8XG4gICAgICAgICAgZnJlcSA9PSBpbmZvLnNjYWxpbmdfbWluX2ZyZXEgfHxcbiAgICAgICAgICBmcmVxID09IGluZm8uc2NhbGluZ19tYXhfZnJlcTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8VHlwb2dyYXBoeS5UZXh0IGtleT17aWR4fSBzdHJvbmc9e2JvbGR9PlxuICAgICAgICAgICAge2Zvcm1hdEZyZXF1ZW5jeShmcmVxKX1cbiAgICAgICAgICAgIHtmcmVxID09IGluZm8uc2NhbGluZ19jdXJfZnJlcSAmJiAoXG4gICAgICAgICAgICAgIDxUeXBvZ3JhcGh5LlRleHQgc3Ryb25nPXtib2xkfT5cbiAgICAgICAgICAgICAgICB7JyAnfVxuICAgICAgICAgICAgICAgIChzY2FsaW5nIGN1cnJlbnQpXG4gICAgICAgICAgICAgIDwvVHlwb2dyYXBoeS5UZXh0PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtmcmVxID09IGluZm8uc2NhbGluZ19taW5fZnJlcSAmJiAoXG4gICAgICAgICAgICAgIDxUeXBvZ3JhcGh5LlRleHQgc3Ryb25nPXtib2xkfT4gKHNjYWxpbmcgbWluKTwvVHlwb2dyYXBoeS5UZXh0PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtmcmVxID09IGluZm8uc2NhbGluZ19tYXhfZnJlcSAmJiAoXG4gICAgICAgICAgICAgIDxUeXBvZ3JhcGh5LlRleHQgc3Ryb25nPXtib2xkfT4gKHNjYWxpbmcgbWF4KTwvVHlwb2dyYXBoeS5UZXh0PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgIDwvVHlwb2dyYXBoeS5UZXh0PlxuICAgICAgICApO1xuICAgICAgfSl9XG4gICAgPC9UeXBvZ3JhcGh5LlRleHQ+XG4gICk7XG59XG4iLCAiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIE1ldGEgUGxhdGZvcm1zLCBJbmMuIGFuZCBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmb3JtYXRcbiAqL1xuXG4vLyBUT0RPOiBGaXggdGhpcyB0aGUgbmV4dCB0aW1lIHRoZSBmaWxlIGlzIGVkaXRlZC5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBydWxlc2Rpci9uby1yZXN0cmljdGVkLWltcG9ydHMtY2xvbmVcbmltcG9ydCB7Q29tcG9uZW50LCBUZXh0LCBTZWFyY2hhYmxlVGFibGV9IGZyb20gJ2ZsaXBwZXInO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgQ29sdW1uU2l6ZXMgPSB7XG4gIHRoZXJtYWxfem9uZTogJ2ZsZXgnLFxuICB0ZW1wZXJhdHVyZTogJ2ZsZXgnLFxuICBwYXRoOiAnZmxleCcsXG59O1xuXG5jb25zdCBDb2x1bW5zID0ge1xuICB0aGVybWFsX3pvbmU6IHtcbiAgICB2YWx1ZTogJ1RoZXJtYWwgWm9uZScsXG4gICAgcmVzaXphYmxlOiB0cnVlLFxuICB9LFxuICB0ZW1wZXJhdHVyZToge1xuICAgIHZhbHVlOiAnVGVtcGVyYXR1cmUnLFxuICAgIHJlc2l6YWJsZTogdHJ1ZSxcbiAgfSxcbiAgcGF0aDoge1xuICAgIHZhbHVlOiAnUGF0aCcsXG4gICAgcmVzaXphYmxlOiB0cnVlLFxuICB9LFxufTtcblxudHlwZSBUZW1wZXJhdHVyZVRhYmxlUHJvcHMgPSB7XG4gIHRlbXBlcmF0dXJlTWFwOiBhbnk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZW1wZXJhdHVyZVRhYmxlIGV4dGVuZHMgQ29tcG9uZW50PFRlbXBlcmF0dXJlVGFibGVQcm9wcz4ge1xuICBidWlsZFJvdyA9ICh0ejogc3RyaW5nLCB0ZW1wSW5mbzogYW55KSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbHVtbnM6IHtcbiAgICAgICAgdGhlcm1hbF96b25lOiB7dmFsdWU6IDxUZXh0Pnt0en08L1RleHQ+fSxcbiAgICAgICAgdGVtcGVyYXR1cmU6IHtcbiAgICAgICAgICB2YWx1ZTogPFRleHQ+e3RlbXBJbmZvLnRlbXAudG9TdHJpbmcoKX08L1RleHQ+LFxuICAgICAgICB9LFxuICAgICAgICBwYXRoOiB7XG4gICAgICAgICAgdmFsdWU6IDxUZXh0Pnt0ZW1wSW5mby5wYXRofTwvVGV4dD4sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAga2V5OiB0eixcbiAgICB9O1xuICB9O1xuXG4gIGJ1aWxkUm93cyA9ICgpID0+IHtcbiAgICBjb25zdCByb3dzID0gW107XG4gICAgZm9yIChjb25zdCB0eiBvZiBPYmplY3Qua2V5cyh0aGlzLnByb3BzLnRlbXBlcmF0dXJlTWFwKS5zb3J0KCkpIHtcbiAgICAgIHJvd3MucHVzaCh0aGlzLmJ1aWxkUm93KHR6LCB0aGlzLnByb3BzLnRlbXBlcmF0dXJlTWFwW3R6XSkpO1xuICAgIH1cbiAgICByZXR1cm4gcm93cztcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxTZWFyY2hhYmxlVGFibGVcbiAgICAgICAgbXVsdGlsaW5lXG4gICAgICAgIGF1dG9IZWlnaHRcbiAgICAgICAgZmxvYXRpbmc9e2ZhbHNlfVxuICAgICAgICB6ZWJyYVxuICAgICAgICBjb2x1bW5TaXplcz17Q29sdW1uU2l6ZXN9XG4gICAgICAgIGNvbHVtbnM9e0NvbHVtbnN9XG4gICAgICAgIHJvd3M9e3RoaXMuYnVpbGRSb3dzKCl9XG4gICAgICAgIGdyb3dcbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUEsbUJBQUFBO0FBQUEsRUFBQTtBQUFBO0FBQUE7QUFTQSw0QkFZTzs7O0FDVlAscUJBQStDO0FBQy9DLG1CQUFrQjtBQUVsQixJQUFNLGNBQWM7QUFBQSxFQUNsQixjQUFjO0FBQUEsRUFDZCxhQUFhO0FBQUEsRUFDYixNQUFNO0FBQ1I7QUFFQSxJQUFNLFVBQVU7QUFBQSxF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Z0JBQWdCO0FBQUEsSUFDdkQsa0JBQWtCLEtBQUs7QUFBQSxFQUN6QjtBQUNGO0FBRUEsU0FBUyxjQUFjLFVBQStCO0FBQ3BELFNBQU8sU0FBUyxJQUFJLFFBQVE7QUFDOUI7QUFFQSxTQUFTLFlBQVksTUFBb0I7QUFDdkMsTUFBSSxLQUFLLG9CQUFvQixJQUFJO0FBQy9CLFdBQU87QUFBQSxNQUNMLGlCQUFpQiw0QkFBTTtBQUFBLE1BQ3ZCLE9BQU8sNEJBQU07QUFBQSxNQUNiLFlBQVk7QUFBQSxJQUNkO0FBQUEsRUFDRixXQUNFLEtBQUssb0JBQW9CLEtBQUssb0JBQzlCLEtBQUssbUJBQW1CLEtBQ3hCLEtBQUssbUJBQW1CLEdBQ3hCO0FBQ0EsV0FBTztBQUFBLE1BQ0wsaUJBQWlCLDRCQUFNO0FBQUEsTUFDdkIsT0FBTyw0QkFBTTtBQUFBLE1BQ2IsWUFBWTtBQUFBLElBQ2Q7QUFBQSxFQUNGLFdBQ0UsS0FBSyxvQkFBb0IsS0FBSyxvQkFDOUIsS0FBSyxtQkFBbUIsS0FDeEIsS0FBSyxtQkFBbUIsR0FDeEI7QUFDQSxXQUFPO0FBQUEsTUFDTCxpQkFBaUIsNEJBQU07QUFBQSxNQUN2QixPQUFPLDRCQUFNO0FBQUEsTUFDYixZQUFZO0FBQUEsSUFDZDtBQUFBLEVBQ0Y7QUFDRjtBQUVBLFNBQVMsdUJBQXVCLE1BQW9CO0FBQ2xELE1BQUksS0FBSyx3QkFBd0IsVUFBVSxHQUFHO0FBQzVDLFdBQU8sOEJBQUFBLFFBQUEsY0FBQyx1QkFBVyxNQUFYLE1BQWdCLEtBQUc7QUFBQSxFQUM3QjtBQUNBLFFBQU0sT0FBTztBQUNiLFNBQ0UsOEJBQUFBLFFBQUEsY0FBQyx1QkFBVyxNQUFYLE1BQ0UsS0FBSyx3QkFBd0IsSUFBSSxDQUFDQyxPQUFNLFFBQVE7QUFDL0MsVUFBTSxPQUNKQSxTQUFRLEtBQUssb0JBQ2JBLFNBQVEsS0FBSyxvQkFDYkEsU0FBUSxLQUFLO0FBQ2YsV0FDRSw4QkFBQUQsUUFBQSxjQUFDLHVCQUFXLE1BQVgsRUFBZ0IsS0FBSyxLQUFLLFFBQVEsUUFDaEMsZ0JBQWdCQyxLQUFJLEdBQ3BCQSxTQUFRLEtBQUssb0JBQ1osOEJBQUFELFFBQUEsY0FBQyx1QkFBVyxNQUFYLEVBQWdCLFFBQVEsUUFDdEIsS0FBSSxtQkFFUCxHQUVEQyxTQUFRLEtBQUssb0JBQ1osOEJBQUFELFFBQUEsY0FBQyx1QkFBVyxNQUFYLEVBQWdCLFFBQVEsUUFBTSxnQkFBYyxHQUU5Q0MsU0FBUSxLQUFLLG9CQUNaLDhCQUFBRCxRQUFBLGNBQUMsdUJBQVcsTUFBWCxFQUFnQixRQUFRLFFBQU0sZ0JBQWMsR0FFL0MsOEJBQUFBLFFBQUEsY0FBQyxVQUFHLENBQ047QUFBQSxFQUVKLENBQUMsQ0FDSDtBQUVKOyIsCiAgIm5hbWVzIjogWyJDb21wb25lbnQiLCAiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIkNvbXBvbmVudCIsICJSZWFjdCIsICJmcmVxIl0KfQo=
