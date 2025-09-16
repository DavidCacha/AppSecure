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

// plugins/public/rn-tic-tac-toe/index.tsx
var rn_tic_tac_toe_exports = {};
__export(rn_tic_tac_toe_exports, {
  Component: () => Component,
  plugin: () => plugin
});
module.exports = __toCommonJS(rn_tic_tac_toe_exports);
var import_react = __toESM(require("react"));
var import_antd = require("antd");
var import_flipper_plugin = require("flipper-plugin");
function initialState() {
  return {
    cells: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    turn: Math.random() < 0.5 ? "O" : "X",
    winner: " "
  };
}
var computeNextState = (cell, player) => (draft) => {
  draft.cells[cell] = player;
  draft.turn = player === "X" ? "O" : "X";
  draft.winner = computeWinner(draft.cells);
};
function computeWinner(c) {
  if (c[0] === c[4] && c[0] === c[8] || c[2] === c[4] && c[2] === c[6]) {
    return c[4];
  }
  for (let i = 0; i < 3; i++) {
    if (c[i] === c[3 + i] && c[i] === c[6 + i]) {
      return c[i];
    }
    if (c[i * 3] === c[i * 3 + 1] && c[i * 3] === c[i * 3 + 2]) {
      return c[i * 3];
    }
  }
  return " ";
}
var plugin = (client) => {
  const state = (0, import_flipper_plugin.createState)(initialState());
  const sendUpdate = () => {
    client.send("SetState", state.get());
  };
  const makeMove = (player, move) => {
    if (state.get().turn === player && state.get().cells[move] === " ") {
      state.update(computeNextState(move, player));
      sendUpdate();
    }
  };
  const reset = () => {
    state.set(initialState());
    sendUpdate();
  };
  client.onConnect(() => {
    client.onMessage("XMove", ({ move }) => {
      makeMove("X", move);
    });
    client.onMessage("GetState", () => {
      sendUpdate();
    });
    sendUpdate();
  });
  return {
    makeMove,
    reset,
    state
  };
};
var desktopPlayer = "O";
var Component = () => {
  const pluginInstance = (0, import_flipper_plugin.usePlugin)(plugin);
  const { winner, turn, cells } = (0, import_flipper_plugin.useValue)(pluginInstance.state);
  return /* @__PURE__ */ import_react.default.createElement(import_flipper_plugin.Layout.Container, null, /* @__PURE__ */ import_react.default.createElement(import_antd.Space, { direction: "vertical", align: "center" }, /* @__PURE__ */ import_react.default.createElement(
    import_antd.Alert,
    {
      message: /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, "This plugin demonstrates how to create pure JavaScript Flipper plugins for React Native. Find out how to create a similar plugin at", " ", /* @__PURE__ */ import_react.default.createElement(
        "a",
        {
          href: "https://fbflipper.com/docs/tutorial/intro",
          target: "blank"
        },
        "fbflipper.com"
      ), "."),
      type: "info"
    }
  ), /* @__PURE__ */ import_react.default.createElement(import_antd.Typography.Title, null, "Flipper Tic-Tac-Toe"), /* @__PURE__ */ import_react.default.createElement(import_antd.Typography.Text, null, winner !== " " ? `Winner! ${winner}` : turn === "O" ? "Your turn" : "Mobile players turn.."), /* @__PURE__ */ import_react.default.createElement(GameBoard, null, cells.map((c, idx) => /* @__PURE__ */ import_react.default.createElement(
    Cell,
    {
      key: idx,
      disabled: c !== " " || turn != desktopPlayer || winner !== " ",
      onClick: () => pluginInstance.makeMove(desktopPlayer, idx)
    },
    c
  ))), /* @__PURE__ */ import_react.default.createElement(import_antd.Button, { onClick: () => pluginInstance.reset() }, "Start new game")));
};
var GameBoard = (0, import_flipper_plugin.styled)("div")({
  display: "grid",
  gridTemplateColumns: "repeat(3, 80px)",
  gridTemplateRows: "repeat(3, 80px)",
  justifyContent: "center",
  gap: 10
});
var Cell = (0, import_flipper_plugin.styled)("button")({
  padding: 20,
  width: "100%",
  height: "100%",
  minWidth: 80,
  fontSize: 24,
  flex: 0,
  borderRadius: 4,
  backgroundColor: import_flipper_plugin.theme.backgroundDefault,
  color: "white",
  ":disabled": {
    backgroundColor: import_flipper_plugin.theme.disabledColor
  }
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vaW5kZXgudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZvcm1hdFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1R5cG9ncmFwaHksIEJ1dHRvbiwgQWxlcnQsIFNwYWNlfSBmcm9tICdhbnRkJztcbmltcG9ydCB7RHJhZnR9IGZyb20gJ2ltbWVyJztcbmltcG9ydCB7XG4gIGNyZWF0ZVN0YXRlLFxuICBQbHVnaW5DbGllbnQsXG4gIHVzZVBsdWdpbixcbiAgdXNlVmFsdWUsXG4gIHN0eWxlZCxcbiAgdGhlbWUsXG4gIExheW91dCxcbn0gZnJvbSAnZmxpcHBlci1wbHVnaW4nO1xuXG50eXBlIFBsYXllciA9ICcgJyB8ICdYJyB8ICdPJztcblxudHlwZSBTdGF0ZSA9IHtcbiAgY2VsbHM6IHJlYWRvbmx5IFtcbiAgICBQbGF5ZXIsXG4gICAgUGxheWVyLFxuICAgIFBsYXllcixcbiAgICBQbGF5ZXIsXG4gICAgUGxheWVyLFxuICAgIFBsYXllcixcbiAgICBQbGF5ZXIsXG4gICAgUGxheWVyLFxuICAgIFBsYXllcixcbiAgXTtcbiAgd2lubmVyOiBQbGF5ZXI7XG4gIHR1cm46ICdYJyB8ICdPJztcbn07XG5cbmZ1bmN0aW9uIGluaXRpYWxTdGF0ZSgpOiBTdGF0ZSB7XG4gIHJldHVybiB7XG4gICAgLy8gQ2VsbHNcbiAgICAvLyAwIDEgMlxuICAgIC8vIDMgNCA1XG4gICAgLy8gNiA3IDhcbiAgICBjZWxsczogWycgJywgJyAnLCAnICcsICcgJywgJyAnLCAnICcsICcgJywgJyAnLCAnICddIGFzIGNvbnN0LFxuICAgIHR1cm46IE1hdGgucmFuZG9tKCkgPCAwLjUgPyAnTycgOiAnWCcsXG4gICAgd2lubmVyOiAnICcsXG4gIH0gYXMgY29uc3Q7XG59XG5cbmNvbnN0IGNvbXB1dGVOZXh0U3RhdGUgPVxuICAoY2VsbDogbnVtYmVyLCBwbGF5ZXI6ICdYJyB8ICdPJykgPT4gKGRyYWZ0OiBEcmFmdDxTdGF0ZT4pID0+IHtcbiAgICBkcmFmdC5jZWxsc1tjZWxsXSA9IHBsYXllcjtcbiAgICBkcmFmdC50dXJuID0gcGxheWVyID09PSAnWCcgPyAnTycgOiAnWCc7XG4gICAgZHJhZnQud2lubmVyID0gY29tcHV0ZVdpbm5lcihkcmFmdC5jZWxscyk7XG4gIH07XG5cbmZ1bmN0aW9uIGNvbXB1dGVXaW5uZXIoYzogU3RhdGVbJ2NlbGxzJ10pOiBQbGF5ZXIge1xuICAvLyBjaGVjayB0aGUgMiBkaWFnb25hbHNcbiAgaWYgKChjWzBdID09PSBjWzRdICYmIGNbMF0gPT09IGNbOF0pIHx8IChjWzJdID09PSBjWzRdICYmIGNbMl0gPT09IGNbNl0pKSB7XG4gICAgcmV0dXJuIGNbNF07XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAvLyBjaGVjayB2ZXJ0aWNhbFxuICAgIGlmIChjW2ldID09PSBjWzMgKyBpXSAmJiBjW2ldID09PSBjWzYgKyBpXSkge1xuICAgICAgcmV0dXJuIGNbaV07XG4gICAgfVxuICAgIC8vIGNoZWNrIGhvcml6b250YWxcbiAgICBpZiAoY1tpICogM10gPT09IGNbaSAqIDMgKyAxXSAmJiBjW2kgKiAzXSA9PT0gY1tpICogMyArIDJdKSB7XG4gICAgICByZXR1cm4gY1tpICogM107XG4gICAgfVxuICB9XG4gIHJldHVybiAnICc7XG59XG5cbnR5cGUgRXZlbnRzID0ge1xuICBYTW92ZToge21vdmU6IG51bWJlcn07XG4gIEdldFN0YXRlOiBuZXZlcjtcbn07XG5cbnR5cGUgTWV0aG9kcyA9IHtcbiAgU2V0U3RhdGU6IChzdGF0ZTogU3RhdGUpID0+IFByb21pc2U8dm9pZD47XG59O1xuXG5leHBvcnQgY29uc3QgcGx1Z2luID0gKGNsaWVudDogUGx1Z2luQ2xpZW50PEV2ZW50cywgTWV0aG9kcz4pID0+IHtcbiAgY29uc3Qgc3RhdGUgPSBjcmVhdGVTdGF0ZShpbml0aWFsU3RhdGUoKSk7XG5cbiAgY29uc3Qgc2VuZFVwZGF0ZSA9ICgpID0+IHtcbiAgICBjbGllbnQuc2VuZCgnU2V0U3RhdGUnLCBzdGF0ZS5nZXQoKSk7XG4gIH07XG5cbiAgY29uc3QgbWFrZU1vdmUgPSAocGxheWVyOiAnWCcgfCAnTycsIG1vdmU6IG51bWJlcikgPT4ge1xuICAgIGlmIChzdGF0ZS5nZXQoKS50dXJuID09PSBwbGF5ZXIgJiYgc3RhdGUuZ2V0KCkuY2VsbHNbbW92ZV0gPT09ICcgJykge1xuICAgICAgc3RhdGUudXBkYXRlKGNvbXB1dGVOZXh0U3RhdGUobW92ZSwgcGxheWVyKSk7XG4gICAgICBzZW5kVXBkYXRlKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlc2V0ID0gKCkgPT4ge1xuICAgIHN0YXRlLnNldChpbml0aWFsU3RhdGUoKSk7XG4gICAgc2VuZFVwZGF0ZSgpO1xuICB9O1xuXG4gIGNsaWVudC5vbkNvbm5lY3QoKCkgPT4ge1xuICAgIGNsaWVudC5vbk1lc3NhZ2UoJ1hNb3ZlJywgKHttb3ZlfSkgPT4ge1xuICAgICAgbWFrZU1vdmUoJ1gnLCBtb3ZlKTtcbiAgICB9KTtcbiAgICBjbGllbnQub25NZXNzYWdlKCdHZXRTdGF0ZScsICgpID0+IHtcbiAgICAgIHNlbmRVcGRhdGUoKTtcbiAgICB9KTtcbiAgICBzZW5kVXBkYXRlKCk7XG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgbWFrZU1vdmUsXG4gICAgcmVzZXQsXG4gICAgc3RhdGUsXG4gIH07XG59O1xuXG5jb25zdCBkZXNrdG9wUGxheWVyID0gJ08nO1xuXG5leHBvcnQgY29uc3QgQ29tcG9uZW50ID0gKCkgPT4ge1xuICBjb25zdCBwbHVnaW5JbnN0YW5jZSA9IHVzZVBsdWdpbihwbHVnaW4pO1xuICBjb25zdCB7d2lubmVyLCB0dXJuLCBjZWxsc30gPSB1c2VWYWx1ZShwbHVnaW5JbnN0YW5jZS5zdGF0ZSk7XG5cbiAgcmV0dXJuIChcbiAgICA8TGF5b3V0LkNvbnRhaW5lcj5cbiAgICAgIDxTcGFjZSBkaXJlY3Rpb249XCJ2ZXJ0aWNhbFwiIGFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgIDxBbGVydFxuICAgICAgICAgIG1lc3NhZ2U9e1xuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgVGhpcyBwbHVnaW4gZGVtb25zdHJhdGVzIGhvdyB0byBjcmVhdGUgcHVyZSBKYXZhU2NyaXB0IEZsaXBwZXJcbiAgICAgICAgICAgICAgcGx1Z2lucyBmb3IgUmVhY3QgTmF0aXZlLiBGaW5kIG91dCBob3cgdG8gY3JlYXRlIGEgc2ltaWxhciBwbHVnaW5cbiAgICAgICAgICAgICAgYXR7JyAnfVxuICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgIGhyZWY9XCJodHRwczovL2ZiZmxpcHBlci5jb20vZG9jcy90dXRvcmlhbC9pbnRyb1wiXG4gICAgICAgICAgICAgICAgdGFyZ2V0PVwiYmxhbmtcIj5cbiAgICAgICAgICAgICAgICBmYmZsaXBwZXIuY29tXG4gICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgLlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgfVxuICAgICAgICAgIHR5cGU9XCJpbmZvXCJcbiAgICAgICAgLz5cbiAgICAgICAgPFR5cG9ncmFwaHkuVGl0bGU+RmxpcHBlciBUaWMtVGFjLVRvZTwvVHlwb2dyYXBoeS5UaXRsZT5cbiAgICAgICAgPFR5cG9ncmFwaHkuVGV4dD5cbiAgICAgICAgICB7d2lubmVyICE9PSAnICdcbiAgICAgICAgICAgID8gYFdpbm5lciEgJHt3aW5uZXJ9YFxuICAgICAgICAgICAgOiB0dXJuID09PSAnTydcbiAgICAgICAgICAgICAgPyAnWW91ciB0dXJuJ1xuICAgICAgICAgICAgICA6ICdNb2JpbGUgcGxheWVycyB0dXJuLi4nfVxuICAgICAgICA8L1R5cG9ncmFwaHkuVGV4dD5cbiAgICAgICAgPEdhbWVCb2FyZD5cbiAgICAgICAgICB7Y2VsbHMubWFwKChjLCBpZHgpID0+IChcbiAgICAgICAgICAgIDxDZWxsXG4gICAgICAgICAgICAgIGtleT17aWR4fVxuICAgICAgICAgICAgICBkaXNhYmxlZD17YyAhPT0gJyAnIHx8IHR1cm4gIT0gZGVza3RvcFBsYXllciB8fCB3aW5uZXIgIT09ICcgJ31cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gcGx1Z2luSW5zdGFuY2UubWFrZU1vdmUoZGVza3RvcFBsYXllciwgaWR4KX0+XG4gICAgICAgICAgICAgIHtjfVxuICAgICAgICAgICAgPC9DZWxsPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L0dhbWVCb2FyZD5cbiAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBwbHVnaW5JbnN0YW5jZS5yZXNldCgpfT5TdGFydCBuZXcgZ2FtZTwvQnV0dG9uPlxuICAgICAgPC9TcGFjZT5cbiAgICA8L0xheW91dC5Db250YWluZXI+XG4gICk7XG59O1xuXG5jb25zdCBHYW1lQm9hcmQgPSBzdHlsZWQoJ2RpdicpKHtcbiAgZGlzcGxheTogJ2dyaWQnLFxuICBncmlkVGVtcGxhdGVDb2x1bW5zOiAncmVwZWF0KDMsIDgwcHgpJyxcbiAgZ3JpZFRlbXBsYXRlUm93czogJ3JlcGVhdCgzLCA4MHB4KScsXG4gIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgZ2FwOiAxMCxcbn0pO1xuXG5jb25zdCBDZWxsID0gc3R5bGVkKCdidXR0b24nKSh7XG4gIHBhZGRpbmc6IDIwLFxuICB3aWR0aDogJzEwMCUnLFxuICBoZWlnaHQ6ICcxMDAlJyxcbiAgbWluV2lkdGg6IDgwLFxuICBmb250U2l6ZTogMjQsXG4gIGZsZXg6IDAsXG4gIGJvcmRlclJhZGl1czogNCxcbiAgYmFja2dyb3VuZENvbG9yOiB0aGVtZS5iYWNrZ3JvdW5kRGVmYXVsdCxcbiAgY29sb3I6ICd3aGl0ZScsXG4gICc6ZGlzYWJsZWQnOiB7XG4gICAgYmFja2dyb3VuZENvbG9yOiB0aGVtZS5kaXNhYmxlZENvbG9yLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVNBLG1CQUFrQjtBQUNsQixrQkFBK0M7QUFFL0MsNEJBUU87QUFvQlAsU0FBUyxlQUFzQjtBQUM3QixTQUFPO0FBQUEsSUFLTCxPQUFPLENBQUMsS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEdBQUc7QUFBQSxJQUNuRCxNQUFNLEtBQUssT0FBTyxJQUFJLE1BQU0sTUFBTTtBQUFBLElBQ2xDLFFBQVE7QUFBQSxFQUNWO0FBQ0Y7QUFFQSxJQUFNLG1CQUNKLENBQUMsTUFBYyxXQUFzQixDQUFDLFVBQXdCO0FBQzVELFFBQU0sTUFBTSxRQUFRO0FBQ3BCLFFBQU0sT0FBTyxXQUFXLE1BQU0sTUFBTTtBQUNwQyxRQUFNLFNBQVMsY0FBYyxNQUFNLEtBQUs7QUFDMUM7QUFFRixTQUFTLGNBQWMsR0FBMkI7QUFFaEQsTUFBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFLO0FBQ3hFLFdBQU8sRUFBRTtBQUFBLEVBQ1g7QUFDQSxXQUFTLElBQUksR0FBRyxJQUFJLEdBQUcsS0FBSztBQUUxQixRQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLElBQUk7QUFDMUMsYUFBTyxFQUFFO0FBQUEsSUFDWDtBQUVBLFFBQUksRUFBRSxJQUFJLE9BQU8sRUFBRSxJQUFJLElBQUksTUFBTSxFQUFFLElBQUksT0FBTyxFQUFFLElBQUksSUFBSSxJQUFJO0FBQzFELGFBQU8sRUFBRSxJQUFJO0FBQUEsSUFDZjtBQUFBLEVBQ0Y7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
