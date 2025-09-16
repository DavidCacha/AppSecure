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

// plugins/public/navigation/index.tsx
var navigation_exports = {};
__export(navigation_exports, {
  Component: () => Component2,
  plugin: () => plugin
});
module.exports = __toCommonJS(navigation_exports);

// plugins/public/navigation/components/AutoCompleteSheet.tsx
var import_flipper = require("flipper");

// plugins/public/navigation/hooks/autoCompleteSheet.tsx
var import_react = require("react");
var useItemNavigation = (lineItems, onHighlighted) => {
  const [selectedItem, setSelectedItem] = (0, import_react.useState)(0);
  const handleKeyPress = (event) => {
    switch (event.key) {
      case "ArrowDown": {
        const newSelectedItem = selectedItem < lineItems.length - 1 ? selectedItem + 1 : lineItems.length - 1;
        setSelectedItem(newSelectedItem);
        onHighlighted(lineItems[newSelectedItem].uri);
        break;
      }
      case "ArrowUp": {
        const newSelectedItem = selectedItem > 0 ? selectedItem - 1 : selectedItem;
        setSelectedItem(newSelectedItem);
        onHighlighted(lineItems[newSelectedItem].uri);
        break;
      }
      default: {
        setSelectedItem(0);
        break;
      }
    }
  };
  (0, import_react.useEffect)(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });
  return selectedItem;
};

// plugins/public/navigation/util/autoCompleteProvider.tsx
var bookmarksToAutoCompleteProvider = (bookmarks) => {
  const autoCompleteProvider = {
    icon: "bookmark",
    matchPatterns: /* @__PURE__ */ new Map()
  };
  bookmarks.forEach((bookmark, uri) => {
    const matchPattern = `${bookmark.commonName} - ${uri}`;
    autoCompleteProvider.matchPatterns.set(matchPattern, uri);
  });
  return autoCompleteProvider;
};
var appMatchPatternsToAutoCompleteProvider = (appMatchPatterns) => {
  const autoCompleteProvider = {
    icon: "mobile",
    matchPatterns: /* @__PURE__ */ new Map()
  };
  appMatchPatterns.forEach((appMatchPattern) => {
    const matchPattern = `${appMatchPattern.className} - ${appMatchPattern.pattern}`;
    autoCompleteProvider.matchPatterns.set(
      matchPattern,
      appMatchPattern.pattern
    );
  });
  return autoCompleteProvider;
};
var filterMatchPatterns = (matchPatterns, query, maxItems) => {
  const filteredPatterns = /* @__PURE__ */ new Map();
  for (const [pattern, uri] of matchPatterns) {
    if (filteredPatterns.size >= maxItems) {
      break;
    } else if (pattern.toLowerCase().includes(query.toLowerCase())) {
      filteredPatterns.set(pattern, uri);
    }
  }
  return filteredPatterns;
};
var filterProvider = (provider, query, maxItems) => {
  return {
    ...provider,
    matchPatterns: filterMatchPatterns(provider.matchPatterns, query, maxItems)
  };
};
var filterProvidersToLineItems = (providers, query, maxItems) => {
  let itemsLeft = maxItems;
  const lineItems = new Array(0);
  for (const provider of providers) {
    const filteredProvider = filterProvider(provider, query, itemsLeft);
    filteredProvider.matchPatterns.forEach((uri, matchPattern) => {
      lineItems.push({
        icon: provider.icon,
        matchPattern,
        uri
      });
    });
    itemsLeft -= filteredProvider.matchPatterns.size;
  }
  return lineItems;
};

// plugins/public/navigation/components/AutoCompleteSheet.tsx
var import_react2 = __toESM(require("react"));
var MAX_ITEMS = 5;
var AutoCompleteSheetContainer = import_flipper.styled.div({
  width: "100%",
  position: "absolute",
  top: "calc(100% - 3px)",
  backgroundColor: "white",
  zIndex: 1,
  borderBottomRightRadius: 10,
  borderBottomLeftRadius: 10,
  boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
});
var SheetItem = import_flipper.styled.div({
  padding: 5,
  textOverflow: "ellipsis",
  overflowX: "hidden",
  whiteSpace: "nowrap",
  "&.selected": {
    backgroundColor: "rgba(155, 155, 155, 0.2)"
  },
  "&:hover": {
    backgroundColor: "rgba(155, 155, 155, 0.2)"
  }
});
var SheetItemIcon = import_flipper.styled.span({
  padding: 8
});
function AutoCompleteSheet(props) {
  const { providers, onHighlighted, onNavigate, query } = props;
  const lineItems = filterProvidersToLineItems(providers, query, MAX_ITEMS);
  lineItems.unshift({ uri: query, matchPattern: query, icon: "send" });
  const selectedItem = useItemNavigation(lineItems, onHighlighted);
  return /* @__PURE__ */ import_react2.default.createElement(AutoCompleteSheetContainer, null, lineItems.map((lineItem, idx) => /* @__PURE__ */ import_react2.default.createElement(
    SheetItem,
    {
      className: idx === selectedItem ? "selected" : "",
      key: idx,
      onMouseDown: () => onNavigate(lineItem.uri)
    },
    /* @__PURE__ */ import_react2.default.createElement(SheetItemIcon, null, /* @__PURE__ */ import_react2.default.createElement(import_flipper.Glyph, { name: lineItem.icon, size: 16, variant: "outline" })),
    lineItem.matchPattern
  )));
}

// plugins/public/navigation/components/BookmarksSidebar.tsx
var import_flipper2 = require("flipper");
var import_react3 = __toESM(require("react"));
var import_flipper_plugin = require("flipper-plugin");
var NoData = (0, import_flipper2.styled)(import_flipper2.FlexCenter)({
  fontSize: 18,
  color: import_flipper_plugin.theme.textColorSecondary
});
var BookmarksList = import_flipper2.styled.div({
  overflowY: "scroll",
  overflowX: "hidden",
  height: "100%",
  backgroundColor: import_flipper_plugin.theme.backgroundDefault
});
var BookmarkContainer = (0, import_flipper2.styled)(import_flipper2.FlexRow)({
  width: "100%",
  padding: 10,
  height: 55,
  alignItems: "center",
  cursor: "pointer",
  borderBottom: `1px ${import_flipper_plugin.theme.dividerColor} solid`,
  ":last-child": {
    borderBottom: "0"
  },
  ":active": {
    backgroundColor: import_flipper_plugin.theme.backgroundWash
  }
});
var BookmarkTitle = (0, import_flipper2.styled)(import_flipper2.Text)({
  fontSize: "1.1em",
  overflowX: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  fontWeight: 500
});
var BookmarkSubtitle = (0, import_flipper2.styled)(import_flipper2.Text)({
  overflowX: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  color: import_flipper_plugin.theme.textColorSecondary,
  marginTop: 4
});
var TextContainer = (0, import_flipper2.styled)(import_flipper2.FlexColumn)({
  justifyContent: "center"
});
var alphabetizeBookmarkCompare = (b1, b2) => {
  return b1.uri < b2.uri ? -1 : b1.uri > b2.uri ? 1 : 0;
};
function BookmarksSidebar(props) {
  const { bookmarks, onNavigate, onRemove } = props;
  return /* @__PURE__ */ import_react3.default.createElement(import_flipper2.DetailSidebar, null, /* @__PURE__ */ import_react3.default.createElement(import_flipper2.Panel, { heading: "Bookmarks", floating: false, padded: false }, bookmarks.size === 0 ? /* @__PURE__ */ import_react3.default.createElement(NoData, { grow: true }, "No Bookmarks") : /* @__PURE__ */ import_react3.default.createElement(BookmarksList, null, [...bookmarks.values()].sort(alphabetizeBookmarkCompare).map((bookmark, idx) => /* @__PURE__ */ import_react3.default.createElement(
    BookmarkContainer,
    {
      key: idx,
      role: "button",
      tabIndex: 0,
      onClick: () => {
        onNavigate(bookmark.uri);
      }
    },
    /* @__PURE__ */ import_react3.default.createElement(TextContainer, { grow: true }, /* @__PURE__ */ import_react3.default.createElement(BookmarkTitle, null, bookmark.commonName || bookmark.uri), !bookmark.commonName && /* @__PURE__ */ import_react3.default.createElement(BookmarkSubtitle, null, bookmark.uri)),
    /* @__PURE__ */ import_react3.default.createElement(
      IconButton,
      {
        color: import_flipper_plugin.theme.textColorSecondary,
        outline: false,
        icon: "cross-circle",
        size: 16,
        onClick: () => onRemove(bookmark.uri)
      }
    )
  )))));
}

// plugins/public/navigation/components/FavoriteButton.tsx
var import_flipper3 = require("flipper");
var import_react4 = __toESM(require("react"));
var FavoriteButtonContainer = import_flipper3.styled.div({
  position: "relative",
  ">:first-child": {
    position: "absolute"
  },
  ">:last-child": {
    position: "relative"
  }
});
function FavoriteButton(props) {
  const { highlighted, onClick, ...iconButtonProps } = props;
  return /* @__PURE__ */ import_react4.default.createElement(FavoriteButtonContainer, null, highlighted ? /* @__PURE__ */ import_react4.default.createElement(
    IconButton,
    {
      outline: false,
      color: import_flipper3.colors.lemon,
      icon: "star",
      ...iconButtonProps
    }
  ) : null, /* @__PURE__ */ import_react4.default.createElement(IconButton, { outline: true, icon: "star", onClick, ...iconButtonProps }));
}

// plugins/public/navigation/components/IconButton.tsx
var import_flipper4 = require("flipper");
var import_react5 = __toESM(require("react"));
var shrinkAnimation = (0, import_flipper4.keyframes)({
  "0%": {
    transform: "scale(1);"
  },
  "100%": {
    transform: "scale(.9)"
  }
});
var RippleEffect = import_flipper4.styled.div({
  padding: 5,
  borderRadius: 100,
  backgroundPosition: "center",
  transition: "background 0.5s",
  ":hover": {
    background: "rgba(155, 155, 155, 0.2) radial-gradient(circle, transparent 1%, rgba(155, 155, 155, 0.2) 1%) center/15000%"
  },
  ":active": {
    backgroundColor: "rgba(201, 200, 200, 0.5)",
    backgroundSize: "100%",
    transition: "background 0s"
  }
});
var IconButtonContainer = import_flipper4.styled.div({
  ":active": {
    animation: `${shrinkAnimation} .25s ease forwards`
  }
});
function IconButton(props) {
  return /* @__PURE__ */ import_react5.default.createElement(RippleEffect, null, /* @__PURE__ */ import_react5.default.createElement(IconButtonContainer, { className: "icon-button", onClick: props.onClick }, /* @__PURE__ */ import_react5.default.createElement(
    import_flipper4.Glyph,
    {
      name: props.icon,
      size: props.size,
      color: props.color,
      variant: props.outline ? "outline" : "filled"
    }
  )));
}

// plugins/public/navigation/components/NavigationInfoBox.tsx
var import_flipper5 = require("flipper");

// plugins/public/navigation/util/uri.tsx
var validateParameter = (value, parameter) => {
  return value && (parameterIsNumberType(parameter) ? !isNaN(parseInt(value, 10)) : true) && (parameterIsBooleanType(parameter) ? value === "true" || value === "false" : true);
};
var filterOptionalParameters = (uri) => {
  return uri.replace(/[/&]?([^&?={}\/]*=)?{\?.*?}/g, "");
};
var parseURIParameters = (query) => {
  const parameters = query.split("?").splice(1).join("");
  const parametersObj = new URLSearchParams(parameters);
  const parametersMap = /* @__PURE__ */ new Map();
  for (const key in parametersObj) {
    parametersMap.set(key, parametersObj.get(key));
  }
  return parametersMap;
};
var parameterIsNumberType = (parameter) => {
  const regExp = /^{(#|\?#)/g;
  return regExp.test(parameter);
};
var parameterIsBooleanType = (parameter) => {
  const regExp = /^{(!|\?!)/g;
  return regExp.test(parameter);
};
var replaceRequiredParametersWithValues = (uri, values) => {
  const parameterRegExp = /{[^?]*?}/g;
  const replaceRegExp = /{[^?]*?}/;
  let newURI = uri;
  let index = 0;
  let match = parameterRegExp.exec(uri);
  while (match != null) {
    newURI = newURI.replace(replaceRegExp, values[index]);
    match = parameterRegExp.exec(uri);
    index++;
  }
  return newURI;
};
var getRequiredParameters = (uri) => {
  const parameterRegExp = /={[^?]*?}/g;
  const matches = [];
  let match = parameterRegExp.exec(uri);
  while (match != null) {
    if (match[0]) {
      const target = match[0].substring(1);
      try {
        JSON.parse(target);
      } catch {
        matches.push(target);
      }
    }
    match = parameterRegExp.exec(uri);
  }
  return matches;
};
var liveEdit = (uri, formValues) => {
  const parameterRegExp = /({[^?]*?})/g;
  const uriArray = uri.split(parameterRegExp);
  return uriArray.reduce((acc, uriComponent, idx) => {
    if (idx % 2 === 0 || !formValues[(idx - 1) / 2]) {
      return acc + uriComponent;
    } else {
      return acc + formValues[(idx - 1) / 2];
    }
  });
};
var stripQueryParameters = (uri) => {
  return uri.replace(/\?.*$/g, "");
};

// plugins/public/navigation/components/NavigationInfoBox.tsx
var import_react6 = __toESM(require("react"));
var import_flipper_plugin2 = require("flipper-plugin");
var BOX_HEIGHT = 240;
var ScreenshotContainer = import_flipper5.styled.div({
  width: 200,
  minWidth: 200,
  overflow: "hidden",
  borderLeft: `1px ${import_flipper5.colors.blueGrayTint90} solid`,
  position: "relative",
  height: "100%",
  borderRadius: 10,
  img: {
    width: "100%"
  }
});
var NoData2 = import_flipper5.styled.div({
  color: import_flipper5.colors.light30,
  fontSize: 14,
  position: "relative"
});
var NavigationDataContainer = import_flipper5.styled.div({
  alignItems: "flex-start",
  flexGrow: 1,
  position: "relative"
});
var Footer = import_flipper5.styled.div({
  width: "100%",
  padding: "10px",
  borderTop: `1px ${import_flipper5.colors.blueGrayTint90} solid`,
  display: "flex",
  alignItems: "center"
});
var Seperator = import_flipper5.styled.div({
  flexGrow: 1
});
var TimeContainer = import_flipper5.styled.div({
  color: import_flipper5.colors.light30,
  fontSize: 14
});
var NavigationInfoBoxContainer = import_flipper5.styled.div({
  display: "flex",
  height: BOX_HEIGHT,
  borderRadius: 10,
  flexGrow: 1,
  position: "relative",
  marginBottom: 10,
  backgroundColor: import_flipper_plugin2.theme.backgroundDefault,
  boxShadow: "1px 1px 5px rgba(0,0,0,0.1)"
});
var Header = import_flipper5.styled.div({
  fontSize: 18,
  fontWeight: 500,
  userSelect: "text",
  cursor: "text",
  padding: 10,
  borderBottom: `1px ${import_flipper5.colors.blueGrayTint90} solid`,
  display: "flex"
});
var ClassNameContainer = import_flipper5.styled.div({
  color: import_flipper5.colors.light30
});
var ParametersContainer = import_flipper5.styled.div({
  height: 150,
  "&>*": {
    height: 150,
    marginBottom: 20
  }
});
var NoParamters = (0, import_flipper5.styled)(import_flipper5.FlexCenter)({
  fontSize: 18,
  color: import_flipper5.colors.light10
});
var TimelineCircle = import_flipper5.styled.div({
  width: 18,
  height: 18,
  top: 11,
  left: -33,
  backgroundColor: import_flipper_plugin2.theme.backgroundWash,
  border: `4px solid ${import_flipper5.colors.highlight}`,
  borderRadius: "50%",
  position: "absolute"
});
var TimelineMiniCircle = import_flipper5.styled.div({
  width: 12,
  height: 12,
  top: 1,
  left: -30,
  borderRadius: "50%",
  backgroundColor: import_flipper_plugin2.theme.textColorActive,
  position: "absolute"
});
var buildParameterTable = (parameters) => {
  const tableRows = [];
  let idx = 0;
  parameters.forEach((parameter_value, parameter) => {
    tableRows.push({
      key: idx.toString(),
      columns: {
        parameter: {
          value: parameter
        },
        value: {
          value: parameter_value
        }
      }
    });
    idx++;
  });
  return /* @__PURE__ */ import_react6.default.createElement(
    import_flipper5.ManagedTable,
    {
      columns: { parameter: { value: "Parameter" }, value: { value: "Value" } },
      rows: tableRows,
      zebra: false
    }
  );
};
function NavigationInfoBox(props) {
  const {
    uri,
    isBookmarked,
    className,
    screenshot,
    onNavigate,
    onFavorite,
    date
  } = props;
  if (uri == null && className == null) {
    return /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, /* @__PURE__ */ import_react6.default.createElement(NoData2, null, /* @__PURE__ */ import_react6.default.createElement(TimelineMiniCircle, null), "Unknown Navigation Event"));
  } else {
    const parameters = uri != null ? parseURIParameters(uri) : null;
    return /* @__PURE__ */ import_react6.default.createElement(NavigationInfoBoxContainer, null, /* @__PURE__ */ import_react6.default.createElement(TimelineCircle, null), /* @__PURE__ */ import_react6.default.createElement(NavigationDataContainer, null, /* @__PURE__ */ import_react6.default.createElement(Header, null, uri != null ? stripQueryParameters(uri) : "", /* @__PURE__ */ import_react6.default.createElement(Seperator, null), className != null ? /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, /* @__PURE__ */ import_react6.default.createElement(
      import_flipper5.Glyph,
      {
        color: import_flipper5.colors.light30,
        size: 16,
        name: "paper-fold-text"
      }
    ), "\xA0", /* @__PURE__ */ import_react6.default.createElement(ClassNameContainer, null, className != null ? className : "")) : null), /* @__PURE__ */ import_react6.default.createElement(ParametersContainer, null, parameters != null && parameters.size > 0 ? buildParameterTable(parameters) : /* @__PURE__ */ import_react6.default.createElement(NoParamters, { grow: true }, "No Parameters for this Event")), /* @__PURE__ */ import_react6.default.createElement(Footer, null, uri != null ? /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, /* @__PURE__ */ import_react6.default.createElement(import_flipper5.Button, { onClick: () => onNavigate(uri) }, "Open"), /* @__PURE__ */ import_react6.default.createElement(import_flipper5.Button, { onClick: () => onFavorite(uri) }, isBookmarked ? "Edit Bookmark" : "Bookmark")) : null, /* @__PURE__ */ import_react6.default.createElement(Seperator, null), /* @__PURE__ */ import_react6.default.createElement(TimeContainer, null, date != null ? date.toTimeString() : ""))), uri != null || className != null ? /* @__PURE__ */ import_react6.default.createElement(ScreenshotContainer, null, screenshot != null ? /* @__PURE__ */ import_react6.default.createElement("img", { src: screenshot }) : /* @__PURE__ */ import_react6.default.createElement(import_flipper5.FlexCenter, { grow: true }, /* @__PURE__ */ import_react6.default.createElement(import_flipper5.LoadingIndicator, { size: 32 }))) : null);
  }
}

// plugins/public/navigation/components/RequiredParametersDialog.tsx
var import_antd = require("antd");
var import_flipper_plugin3 = require("flipper-plugin");

// plugins/public/navigation/hooks/requiredParameters.tsx
var import_react7 = require("react");
var useRequiredParameterFormValidator = (requiredParameters) => {
  const [values, setValuesArray] = (0, import_react7.useState)(
    requiredParameters.map(() => "")
  );
  const isValid = (0, import_react7.useMemo)(() => {
    if (requiredParameters.length != values.length) {
      setValuesArray(requiredParameters.map(() => ""));
    }
    if (values.every(
      (value, idx) => validateParameter(value, requiredParameters[idx])
    )) {
      return true;
    } else {
      return false;
    }
  }, [requiredParameters, values]);
  return { isValid, values, setValuesArray };
};

// plugins/public/navigation/components/RequiredParametersDialog.tsx
var import_react8 = __toESM(require("react"));
function RequiredParametersDialog(props) {
  const { onHide, onSubmit, uri, requiredParameters } = props;
  const { isValid, values, setValuesArray } = useRequiredParameterFormValidator(requiredParameters);
  return /* @__PURE__ */ import_react8.default.createElement(
    import_antd.Modal,
    {
      open: true,
      onCancel: onHide,
      title: "Provide bookmark details",
      footer: /* @__PURE__ */ import_react8.default.createElement(import_react8.default.Fragment, null, /* @__PURE__ */ import_react8.default.createElement(
        import_antd.Button,
        {
          onClick: () => {
            onHide();
            setValuesArray([]);
          }
        },
        "Cancel"
      ), /* @__PURE__ */ import_react8.default.createElement(
        import_antd.Button,
        {
          type: "primary",
          onClick: () => {
            onSubmit(replaceRequiredParametersWithValues(uri, values));
            onHide();
          },
          disabled: !isValid
        },
        "Submit"
      ))
    },
    /* @__PURE__ */ import_react8.default.createElement(import_flipper_plugin3.Layout.Container, { gap: true }, /* @__PURE__ */ import_react8.default.createElement(
      import_antd.Alert,
      {
        type: "info",
        message: "This uri has required parameters denoted by '{parameter}'}."
      }
    ), requiredParameters.map((paramater, idx) => /* @__PURE__ */ import_react8.default.createElement("div", { key: idx }, /* @__PURE__ */ import_react8.default.createElement(
      import_antd.Input,
      {
        onChange: (event) => setValuesArray([
          ...values.slice(0, idx),
          event.target.value,
          ...values.slice(idx + 1)
        ]),
        name: paramater,
        placeholder: paramater
      }
    ), values[idx] && parameterIsNumberType(paramater) && !validateParameter(values[idx], paramater) ? /* @__PURE__ */ import_react8.default.createElement(import_antd.Alert, { type: "error", message: "Parameter must be a number" }) : null, values[idx] && parameterIsBooleanType(paramater) && !validateParameter(values[idx], paramater) ? /* @__PURE__ */ import_react8.default.createElement(
      import_antd.Alert,
      {
        type: "error",
        message: "Parameter must be either 'true' or 'false'"
      }
    ) : null)), /* @__PURE__ */ import_react8.default.createElement(import_antd.Typography.Text, { code: true }, liveEdit(uri, values)))
  );
}

// plugins/public/navigation/components/SaveBookmarkDialog.tsx
var import_antd2 = require("antd");
var import_flipper6 = require("flipper");
var import_react9 = __toESM(require("react"));
var Container = (0, import_flipper6.styled)(import_flipper6.FlexColumn)({
  padding: 10,
  width: 400
});
var Title = import_flipper6.styled.div({
  fontWeight: 500,
  marginTop: 8,
  marginLeft: 2,
  marginBottom: 8
});
var URIContainer = import_flipper6.styled.div({
  marginLeft: 2,
  marginBottom: 8,
  overflowWrap: "break-word"
});
var ButtonContainer = import_flipper6.styled.div({
  marginLeft: "auto"
});
var NameInput = (0, import_flipper6.styled)(import_flipper6.Input)({
  margin: 0,
  marginBottom: 10,
  height: 30
});
function SaveBookmarkDialog(props) {
  const { edit, shouldShow, onHide, onRemove, onSubmit, uri } = props;
  const [commonName, setCommonName] = (0, import_react9.useState)("");
  if (uri == null || !shouldShow) {
    return null;
  } else {
    return /* @__PURE__ */ import_react9.default.createElement(import_antd2.Modal, { open: true, footer: null, onCancel: onHide }, (onHide2) => {
      return /* @__PURE__ */ import_react9.default.createElement(Container, null, /* @__PURE__ */ import_react9.default.createElement(Title, null, edit ? "Edit bookmark..." : "Save to bookmarks..."), /* @__PURE__ */ import_react9.default.createElement(
        NameInput,
        {
          placeholder: "Name...",
          value: commonName,
          onChange: (event) => setCommonName(event.target.value)
        }
      ), /* @__PURE__ */ import_react9.default.createElement(URIContainer, null, uri), /* @__PURE__ */ import_react9.default.createElement(ButtonContainer, null, /* @__PURE__ */ import_react9.default.createElement(
        import_flipper6.Button,
        {
          onClick: () => {
            onHide2();
            setCommonName("");
          },
          compact: true,
          padded: true
        },
        "Cancel"
      ), edit ? /* @__PURE__ */ import_react9.default.createElement(
        import_flipper6.Button,
        {
          type: "danger",
          onClick: () => {
            onHide2();
            onRemove(uri);
            setCommonName("");
          },
          compact: true,
          padded: true
        },
        "Remove"
      ) : null, /* @__PURE__ */ import_react9.default.createElement(
        import_flipper6.Button,
        {
          type: "primary",
          onClick: () => {
            onHide2();
            onSubmit({ uri, commonName });
            setCommonName("");
          },
          compact: true,
          padded: true
        },
        "Save"
      )));
    });
  }
}

// plugins/public/navigation/components/SearchBar.tsx
var import_flipper7 = require("flipper");
var import_react10 = __toESM(require("react"));
var IconContainer = import_flipper7.styled.div({
  display: "inline-flex",
  height: "16px",
  alignItems: "center",
  "": {
    marginLeft: 10,
    ".icon-button": {
      height: 16
    },
    "img,div": {
      verticalAlign: "top",
      alignItems: "none"
    }
  }
});
var ToolbarContainer = import_flipper7.styled.div({
  ".drop-shadow": {
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
  }
});
var SearchInputContainer = import_flipper7.styled.div({
  width: "100%",
  marginLeft: 5,
  marginRight: 9,
  position: "relative"
});
var SearchBar = class extends import_react10.Component {
  constructor() {
    super(...arguments);
    this.state = {
      inputFocused: false,
      autoCompleteSheetOpen: false,
      query: "",
      searchInputValue: "",
      prevURIFromAbove: ""
    };
    this.favorite = (searchInputValue) => {
      this.props.onFavorite(searchInputValue);
    };
    this.navigateTo = (searchInputValue) => {
      this.setState({ query: searchInputValue, searchInputValue });
      this.props.onNavigate(searchInputValue);
    };
    this.queryInputChanged = (event) => {
      const value = event.target.value;
      this.setState({ query: value, searchInputValue: value });
    };
  }
  render() {
    const { bookmarks, providers } = this.props;
    const { autoCompleteSheetOpen, inputFocused, searchInputValue, query } = this.state;
    return /* @__PURE__ */ import_react10.default.createElement(ToolbarContainer, null, /* @__PURE__ */ import_react10.default.createElement(import_flipper7.Toolbar, null, /* @__PURE__ */ import_react10.default.createElement(import_flipper7.SearchBox, { className: inputFocused ? "drop-shadow" : "" }, /* @__PURE__ */ import_react10.default.createElement(SearchInputContainer, null, /* @__PURE__ */ import_react10.default.createElement(
      import_flipper7.SearchInput,
      {
        value: searchInputValue,
        onBlur: () => this.setState({
          autoCompleteSheetOpen: false,
          inputFocused: false
        }),
        onFocus: (event) => {
          event.target.select();
          this.setState({
            autoCompleteSheetOpen: true,
            inputFocused: true
          });
        },
        onChange: this.queryInputChanged,
        onKeyPress: (e) => {
          if (e.key === "Enter") {
            this.navigateTo(this.state.searchInputValue);
            e.target.blur();
          }
        },
        placeholder: "Navigate To..."
      }
    ), autoCompleteSheetOpen && query.length > 0 ? /* @__PURE__ */ import_react10.default.createElement(
      AutoCompleteSheet,
      {
        providers,
        onNavigate: this.navigateTo,
        onHighlighted: (newInputValue) => this.setState({ searchInputValue: newInputValue }),
        query
      }
    ) : null)), searchInputValue.length > 0 ? /* @__PURE__ */ import_react10.default.createElement(IconContainer, null, /* @__PURE__ */ import_react10.default.createElement(
      IconButton,
      {
        icon: "send",
        size: 16,
        outline: true,
        onClick: () => this.navigateTo(searchInputValue)
      }
    ), /* @__PURE__ */ import_react10.default.createElement(
      FavoriteButton,
      {
        size: 16,
        highlighted: bookmarks.has(searchInputValue),
        onClick: () => this.favorite(searchInputValue)
      }
    )) : null));
  }
};
SearchBar.getDerivedStateFromProps = (newProps, state) => {
  const { uriFromAbove: newURIFromAbove } = newProps;
  const { prevURIFromAbove } = state;
  if (newURIFromAbove !== prevURIFromAbove) {
    return {
      searchInputValue: newURIFromAbove,
      query: newURIFromAbove,
      prevURIFromAbove: newURIFromAbove
    };
  }
  return null;
};

// plugins/public/navigation/components/Timeline.tsx
var import_react11 = __toESM(require("react"));
var import_flipper_plugin4 = require("flipper-plugin");
var TimelineLine = import_flipper_plugin4.styled.div({
  width: 2,
  backgroundColor: import_flipper_plugin4.theme.textColorActive,
  position: "absolute",
  top: 38,
  bottom: 0
});
var NavigationEventContainer = import_flipper_plugin4.styled.div({
  display: "flex",
  paddingTop: 25,
  paddingLeft: 25,
  marginRight: 25
});
function Timeline(props) {
  const { bookmarks, events, onNavigate, onFavorite } = props;
  const timelineRef = (0, import_react11.useRef)(null);
  return events.length === 0 ? /* @__PURE__ */ import_react11.default.createElement(
    import_flipper_plugin4.Layout.Container,
    {
      center: true,
      grow: true,
      style: {
        fontSize: 18,
        backgroundColor: import_flipper_plugin4.theme.backgroundWash,
        color: import_flipper_plugin4.theme.textColorSecondary
      }
    },
    "No Navigation Events to Show"
  ) : /* @__PURE__ */ import_react11.default.createElement(import_flipper_plugin4.Layout.ScrollContainer, { ref: timelineRef }, /* @__PURE__ */ import_react11.default.createElement(import_flipper_plugin4.Layout.Container, { grow: true, style: { paddingBottom: 25, paddingLeft: 25 } }, /* @__PURE__ */ import_react11.default.createElement(TimelineLine, null), events.map((event, idx) => {
    return /* @__PURE__ */ import_react11.default.createElement(NavigationEventContainer, { key: idx }, /* @__PURE__ */ import_react11.default.createElement(
      NavigationInfoBox,
      {
        isBookmarked: event.uri != null ? bookmarks.has(event.uri) : false,
        className: event.className,
        uri: event.uri,
        onNavigate: (uri) => {
          if (timelineRef.current != null) {
            timelineRef.current.scrollTo(0, 0);
          }
          onNavigate(uri);
        },
        onFavorite,
        screenshot: event.screenshot,
        date: event.date
      }
    ));
  })));
}

// plugins/public/navigation/util/indexedDB.tsx
var FLIPPER_NAVIGATION_PLUGIN_DB = "flipper_navigation_plugin_db";
var FLIPPER_NAVIGATION_PLUGIN_DB_VERSION = 1;
var BOOKMARKS_KEY = "bookmarks";
var createBookmarksObjectStore = (db) => {
  return new Promise((resolve, reject) => {
    if (!db.objectStoreNames.contains(BOOKMARKS_KEY)) {
      const bookmarksObjectStore = db.createObjectStore(BOOKMARKS_KEY, {
        keyPath: "uri"
      });
      bookmarksObjectStore.transaction.oncomplete = () => resolve();
      bookmarksObjectStore.transaction.onerror = () => reject(bookmarksObjectStore.transaction.error);
    } else {
      resolve();
    }
  });
};
var initializeNavigationPluginDB = (db) => {
  return Promise.all([createBookmarksObjectStore(db)]);
};
var openNavigationPluginDB = () => {
  return new Promise((resolve, reject) => {
    const openRequest = window.indexedDB.open(
      FLIPPER_NAVIGATION_PLUGIN_DB,
      FLIPPER_NAVIGATION_PLUGIN_DB_VERSION
    );
    openRequest.onupgradeneeded = () => {
      const db = openRequest.result;
      initializeNavigationPluginDB(db).then(() => resolve(db)).catch(reject);
    };
    openRequest.onerror = () => reject(openRequest.error);
    openRequest.onsuccess = () => resolve(openRequest.result);
  });
};
var writeBookmarkToDB = (bookmark) => {
  return new Promise((resolve, reject) => {
    openNavigationPluginDB().then((db) => {
      const bookmarksObjectStore = db.transaction(BOOKMARKS_KEY, "readwrite").objectStore(BOOKMARKS_KEY);
      const request = bookmarksObjectStore.put(bookmark);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    }).catch(reject);
  });
};
var readBookmarksFromDB = () => {
  return new Promise((resolve, reject) => {
    const bookmarks = /* @__PURE__ */ new Map();
    openNavigationPluginDB().then((db) => {
      const bookmarksObjectStore = db.transaction(BOOKMARKS_KEY).objectStore(BOOKMARKS_KEY);
      const request = bookmarksObjectStore.openCursor();
      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          const bookmark = cursor.value;
          bookmarks.set(bookmark.uri, bookmark);
          cursor.continue();
        } else {
          resolve(bookmarks);
        }
      };
      request.onerror = () => reject(request.error);
    }).catch(reject);
  });
};
var removeBookmarkFromDB = (uri) => {
  return new Promise((resolve, reject) => {
    openNavigationPluginDB().then((db) => {
      const bookmarksObjectStore = db.transaction(BOOKMARKS_KEY, "readwrite").objectStore(BOOKMARKS_KEY);
      const request = bookmarksObjectStore.delete(uri);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    }).catch(reject);
  });
};

// plugins/public/navigation/util/appMatchPatterns.tsx
var import_flipper_plugin5 = require("flipper-plugin");
var import_flipper_plugin6 = require("flipper-plugin");
var extractAppNameFromSelectedApp = (selectedApp) => {
  if (selectedApp == null) {
    return null;
  } else {
    return selectedApp.split("#")[0];
  }
};
var getAppMatchPatterns = (selectedApp, device) => {
  return new Promise(async (resolve, reject) => {
    const appName = extractAppNameFromSelectedApp(selectedApp);
    if (appName === "Facebook") {
      let filename;
      if (device.os === "Android") {
        filename = "facebook-match-patterns-android.json";
      } else if (device.os === "iOS") {
        filename = "facebook-match-patterns-ios.json";
      } else {
        return;
      }
      const patternsFilePath = import_flipper_plugin5.path.join(
        (0, import_flipper_plugin6.getFlipperLib)().paths.staticPath,
        "facebook",
        filename
      );
      const patternsFileContentString = await (0, import_flipper_plugin6.getFlipperLib)().remoteServerContext.fs.readFile(patternsFilePath);
      return JSON.parse(patternsFileContentString);
    } else if (appName != null) {
      console.log(`No rule for app ${appName}`);
      resolve([]);
    } else {
      reject(new Error("selectedApp was null"));
    }
  });
};

// plugins/public/navigation/plugin.tsx
var import_react12 = __toESM(require("react"));
var import_flipper_plugin7 = require("flipper-plugin");
function plugin(client) {
  const bookmarks = (0, import_flipper_plugin7.createState)(/* @__PURE__ */ new Map(), {
    persist: "bookmarks"
  });
  const navigationEvents = (0, import_flipper_plugin7.createState)([], {
    persist: "navigationEvents"
  });
  const appMatchPatterns = (0, import_flipper_plugin7.createState)([], {
    persist: "appMatchPatterns"
  });
  const currentURI = (0, import_flipper_plugin7.createState)("");
  const shouldShowSaveBookmarkDialog = (0, import_flipper_plugin7.createState)(false);
  const saveBookmarkURI = (0, import_flipper_plugin7.createState)(null);
  client.onMessage("nav_event", async (payload) => {
    const navigationEvent = {
      uri: payload.uri === void 0 ? null : decodeURIComponent(payload.uri),
      date: payload.date ? new Date(payload.date) : new Date(),
      className: payload.class === void 0 ? null : payload.class,
      screenshot: null
    };
    if (navigationEvent.uri)
      currentURI.set(navigationEvent.uri);
    navigationEvents.update((draft) => {
      draft.unshift(navigationEvent);
    });
    const screenshot = await client.device.screenshot();
    if (!screenshot) {
      console.warn(
        "[navigation] Could not retrieve valid screenshot from the device."
      );
      return;
    }
    const blobURL = URL.createObjectURL(new Blob([screenshot.buffer]));
    const navigationEventIndex = navigationEvents.get().indexOf(navigationEvent);
    if (navigationEventIndex !== -1) {
      navigationEvents.update((draft) => {
        draft[navigationEventIndex].screenshot = blobURL;
      });
    }
  });
  getAppMatchPatterns(client.appId, client.device).then((patterns) => {
    appMatchPatterns.set(patterns);
  }).catch((e) => {
    console.error("[Navigation] Failed to find appMatchPatterns", e);
  });
  readBookmarksFromDB().then((bookmarksData) => {
    bookmarks.set(bookmarksData);
  }).catch((e) => console.error("[navigation] readBookmarksFromDB failed:", e));
  function navigateTo(query) {
    const filteredQuery = filterOptionalParameters(query);
    currentURI.set(filteredQuery);
    const params = getRequiredParameters(filteredQuery);
    if (params.length === 0) {
      if (client.appName === "Facebook" && client.device.os === "iOS") {
        client.send("navigate_to", {
          url: filterOptionalParameters(filteredQuery)
        });
      } else {
        client.device.navigateToLocation(
          filterOptionalParameters(filteredQuery)
        );
      }
    } else {
      (0, import_flipper_plugin7.renderReactRoot)((unmount) => /* @__PURE__ */ import_react12.default.createElement(
        RequiredParametersDialog,
        {
          onHide: unmount,
          uri: filteredQuery,
          requiredParameters: params,
          onSubmit: navigateTo
        }
      ));
    }
  }
  function onFavorite(uri) {
    shouldShowSaveBookmarkDialog.set(true);
    saveBookmarkURI.set(uri);
  }
  function addBookmark(bookmark) {
    const newBookmark = {
      uri: bookmark.uri,
      commonName: bookmark.commonName
    };
    bookmarks.update((draft) => {
      draft.set(newBookmark.uri, newBookmark);
    });
    writeBookmarkToDB(newBookmark);
  }
  function removeBookmark(uri) {
    bookmarks.update((draft) => {
      draft.delete(uri);
    });
    removeBookmarkFromDB(uri);
  }
  return {
    navigateTo,
    onFavorite,
    addBookmark,
    removeBookmark,
    bookmarks,
    saveBookmarkURI,
    shouldShowSaveBookmarkDialog,
    appMatchPatterns,
    navigationEvents,
    currentURI,
    getAutoCompleteAppMatchPatterns(query, bookmarks2, appMatchPatterns2, limit) {
      const q = query.toLowerCase();
      const results = [];
      for (const item of appMatchPatterns2) {
        if (!bookmarks2.has(item.pattern) && (item.className.toLowerCase().includes(q) || item.pattern.toLowerCase().includes(q))) {
          results.push(item);
          if (--limit < 1)
            break;
        }
      }
      return results;
    }
  };
}

// plugins/public/navigation/Component.tsx
var import_react13 = __toESM(require("react"));
var import_flipper_plugin8 = require("flipper-plugin");
function Component2() {
  const instance = (0, import_flipper_plugin8.usePlugin)(plugin);
  const bookmarks = (0, import_flipper_plugin8.useValue)(instance.bookmarks);
  const appMatchPatterns = (0, import_flipper_plugin8.useValue)(instance.appMatchPatterns);
  const saveBookmarkURI = (0, import_flipper_plugin8.useValue)(instance.saveBookmarkURI);
  const shouldShowSaveBookmarkDialog = (0, import_flipper_plugin8.useValue)(
    instance.shouldShowSaveBookmarkDialog
  );
  const currentURI = (0, import_flipper_plugin8.useValue)(instance.currentURI);
  const navigationEvents = (0, import_flipper_plugin8.useValue)(instance.navigationEvents);
  const autoCompleteProviders = (0, import_react13.useMemo)(
    () => [
      bookmarksToAutoCompleteProvider(bookmarks),
      appMatchPatternsToAutoCompleteProvider(appMatchPatterns)
    ],
    [bookmarks, appMatchPatterns]
  );
  return /* @__PURE__ */ import_react13.default.createElement(import_flipper_plugin8.Layout.Container, { grow: true }, /* @__PURE__ */ import_react13.default.createElement(
    SearchBar,
    {
      providers: autoCompleteProviders,
      bookmarks,
      onNavigate: instance.navigateTo,
      onFavorite: instance.onFavorite,
      uriFromAbove: currentURI
    }
  ), /* @__PURE__ */ import_react13.default.createElement(
    Timeline,
    {
      bookmarks,
      events: navigationEvents,
      onNavigate: instance.navigateTo,
      onFavorite: instance.onFavorite
    }
  ), /* @__PURE__ */ import_react13.default.createElement(
    BookmarksSidebar,
    {
      bookmarks,
      onRemove: instance.removeBookmark,
      onNavigate: instance.navigateTo
    }
  ), /* @__PURE__ */ import_react13.default.createElement(
    SaveBookmarkDialog,
    {
      shouldShow: shouldShowSaveBookmarkDialog,
      uri: saveBookmarkURI,
      onHide: () => {
        instance.shouldShowSaveBookmarkDialog.set(false);
      },
      edit: saveBookmarkURI != null ? bookmarks.has(saveBookmarkURI) : false,
      onSubmit: instance.addBookmark,
      onRemove: instance.removeBookmark
    }
  ));
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vaW5kZXgudHN4IiwgIi4uL2NvbXBvbmVudHMvQXV0b0NvbXBsZXRlU2hlZXQudHN4IiwgIi4uL2hvb2tzL2F1dG9Db21wbGV0ZVNoZWV0LnRzeCIsICIuLi91dGlsL2F1dG9Db21wbGV0ZVByb3ZpZGVyLnRzeCIsICIuLi9jb21wb25lbnRzL0Jvb2ttYXJrc1NpZGViYXIudHN4IiwgIi4uL2NvbXBvbmVudHMvRmF2b3JpdGVCdXR0b24udHN4IiwgIi4uL2NvbXBvbmVudHMvSWNvbkJ1dHRvbi50c3giLCAiLi4vY29tcG9uZW50cy9OYXZpZ2F0aW9uSW5mb0JveC50c3giLCAiLi4vdXRpbC91cmkudHN4IiwgIi4uL2NvbXBvbmVudHMvUmVxdWlyZWRQYXJhbWV0ZXJzRGlhbG9nLnRzeCIsICIuLi9ob29rcy9yZXF1aXJlZFBhcmFtZXRlcnMudHN4IiwgIi4uL2NvbXBvbmVudHMvU2F2ZUJvb2ttYXJrRGlhbG9nLnRzeCIsICIuLi9jb21wb25lbnRzL1NlYXJjaEJhci50c3giLCAiLi4vY29tcG9uZW50cy9UaW1lbGluZS50c3giLCAiLi4vdXRpbC9pbmRleGVkREIudHN4IiwgIi4uL3V0aWwvYXBwTWF0Y2hQYXR0ZXJucy50c3giLCAiLi4vcGx1Z2luLnRzeCIsICIuLi9Db21wb25lbnQudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZvcm1hdFxuICogQGZsb3cgc3RyaWN0LWxvY2FsXG4gKi9cblxuZXhwb3J0IHtwbHVnaW4sIE5hdmlnYXRpb25QbHVnaW59IGZyb20gJy4vcGx1Z2luJztcbmV4cG9ydCB7Q29tcG9uZW50fSBmcm9tICcuL0NvbXBvbmVudCc7XG4iLCAiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIE1ldGEgUGxhdGZvcm1zLCBJbmMuIGFuZCBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmb3JtYXRcbiAqL1xuXG4vLyBUT0RPOiBGaXggdGhpcyB0aGUgbmV4dCB0aW1lIHRoZSBmaWxlIGlzIGVkaXRlZC5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBydWxlc2Rpci9uby1yZXN0cmljdGVkLWltcG9ydHMtY2xvbmVcbmltcG9ydCB7R2x5cGgsIHN0eWxlZH0gZnJvbSAnZmxpcHBlcic7XG5pbXBvcnQge3VzZUl0ZW1OYXZpZ2F0aW9ufSBmcm9tICcuLi9ob29rcy9hdXRvQ29tcGxldGVTaGVldCc7XG5pbXBvcnQge2ZpbHRlclByb3ZpZGVyc1RvTGluZUl0ZW1zfSBmcm9tICcuLi91dGlsL2F1dG9Db21wbGV0ZVByb3ZpZGVyJztcbmltcG9ydCB7QXV0b0NvbXBsZXRlUHJvdmlkZXIsIEF1dG9Db21wbGV0ZUxpbmVJdGVtLCBVUkl9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbnR5cGUgUHJvcHMgPSB7XG4gIHByb3ZpZGVyczogQXJyYXk8QXV0b0NvbXBsZXRlUHJvdmlkZXI+O1xuICBvbkhpZ2hsaWdodGVkOiAodXJpOiBVUkkpID0+IHZvaWQ7XG4gIG9uTmF2aWdhdGU6ICh1cmk6IFVSSSkgPT4gdm9pZDtcbiAgcXVlcnk6IHN0cmluZztcbn07XG5cbmNvbnN0IE1BWF9JVEVNUyA9IDU7XG5cbmNvbnN0IEF1dG9Db21wbGV0ZVNoZWV0Q29udGFpbmVyID0gc3R5bGVkLmRpdih7XG4gIHdpZHRoOiAnMTAwJScsXG4gIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICB0b3A6ICdjYWxjKDEwMCUgLSAzcHgpJyxcbiAgYmFja2dyb3VuZENvbG9yOiAnd2hpdGUnLFxuICB6SW5kZXg6IDEsXG4gIGJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzOiAxMCxcbiAgYm9yZGVyQm90dG9tTGVmdFJhZGl1czogMTAsXG4gIGJveFNoYWRvdzogJzAgMXB4IDNweCByZ2JhKDAsMCwwLDAuMTIpLCAwIDFweCAycHggcmdiYSgwLDAsMCwwLjI0KScsXG59KTtcblxuY29uc3QgU2hlZXRJdGVtID0gc3R5bGVkLmRpdih7XG4gIHBhZGRpbmc6IDUsXG4gIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcbiAgb3ZlcmZsb3dYOiAnaGlkZGVuJyxcbiAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICcmLnNlbGVjdGVkJzoge1xuICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMTU1LCAxNTUsIDE1NSwgMC4yKScsXG4gIH0sXG4gICcmOmhvdmVyJzoge1xuICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMTU1LCAxNTUsIDE1NSwgMC4yKScsXG4gIH0sXG59KTtcblxuY29uc3QgU2hlZXRJdGVtSWNvbiA9IHN0eWxlZC5zcGFuKHtcbiAgcGFkZGluZzogOCxcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gQXV0b0NvbXBsZXRlU2hlZXQocHJvcHM6IFByb3BzKSB7XG4gIGNvbnN0IHtwcm92aWRlcnMsIG9uSGlnaGxpZ2h0ZWQsIG9uTmF2aWdhdGUsIHF1ZXJ5fSA9IHByb3BzO1xuICBjb25zdCBsaW5lSXRlbXMgPSBmaWx0ZXJQcm92aWRlcnNUb0xpbmVJdGVtcyhwcm92aWRlcnMsIHF1ZXJ5LCBNQVhfSVRFTVMpO1xuICBsaW5lSXRlbXMudW5zaGlmdCh7dXJpOiBxdWVyeSwgbWF0Y2hQYXR0ZXJuOiBxdWVyeSwgaWNvbjogJ3NlbmQnfSk7XG4gIGNvbnN0IHNlbGVjdGVkSXRlbSA9IHVzZUl0ZW1OYXZpZ2F0aW9uKGxpbmVJdGVtcywgb25IaWdobGlnaHRlZCk7XG4gIHJldHVybiAoXG4gICAgPEF1dG9Db21wbGV0ZVNoZWV0Q29udGFpbmVyPlxuICAgICAge2xpbmVJdGVtcy5tYXAoKGxpbmVJdGVtOiBBdXRvQ29tcGxldGVMaW5lSXRlbSwgaWR4OiBudW1iZXIpID0+IChcbiAgICAgICAgPFNoZWV0SXRlbVxuICAgICAgICAgIGNsYXNzTmFtZT17aWR4ID09PSBzZWxlY3RlZEl0ZW0gPyAnc2VsZWN0ZWQnIDogJyd9XG4gICAgICAgICAga2V5PXtpZHh9XG4gICAgICAgICAgb25Nb3VzZURvd249eygpID0+IG9uTmF2aWdhdGUobGluZUl0ZW0udXJpKX0+XG4gICAgICAgICAgPFNoZWV0SXRlbUljb24+XG4gICAgICAgICAgICA8R2x5cGggbmFtZT17bGluZUl0ZW0uaWNvbn0gc2l6ZT17MTZ9IHZhcmlhbnQ9XCJvdXRsaW5lXCIgLz5cbiAgICAgICAgICA8L1NoZWV0SXRlbUljb24+XG4gICAgICAgICAge2xpbmVJdGVtLm1hdGNoUGF0dGVybn1cbiAgICAgICAgPC9TaGVldEl0ZW0+XG4gICAgICApKX1cbiAgICA8L0F1dG9Db21wbGV0ZVNoZWV0Q29udGFpbmVyPlxuICApO1xufVxuIiwgIi8qKlxuICogQ29weXJpZ2h0IChjKSBNZXRhIFBsYXRmb3JtcywgSW5jLiBhbmQgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZm9ybWF0XG4gKi9cblxuaW1wb3J0IHt1c2VFZmZlY3QsIHVzZVN0YXRlfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge0F1dG9Db21wbGV0ZUxpbmVJdGVtfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBjb25zdCB1c2VJdGVtTmF2aWdhdGlvbiA9IChcbiAgbGluZUl0ZW1zOiBBcnJheTxBdXRvQ29tcGxldGVMaW5lSXRlbT4sXG4gIG9uSGlnaGxpZ2h0ZWQ6ICh1cmk6IHN0cmluZykgPT4gdm9pZCxcbikgPT4ge1xuICBjb25zdCBbc2VsZWN0ZWRJdGVtLCBzZXRTZWxlY3RlZEl0ZW1dID0gdXNlU3RhdGUoMCk7XG5cbiAgY29uc3QgaGFuZGxlS2V5UHJlc3MgPSAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgY2FzZSAnQXJyb3dEb3duJzoge1xuICAgICAgICBjb25zdCBuZXdTZWxlY3RlZEl0ZW0gPVxuICAgICAgICAgIHNlbGVjdGVkSXRlbSA8IGxpbmVJdGVtcy5sZW5ndGggLSAxXG4gICAgICAgICAgICA/IHNlbGVjdGVkSXRlbSArIDFcbiAgICAgICAgICAgIDogbGluZUl0ZW1zLmxlbmd0aCAtIDE7XG4gICAgICAgIHNldFNlbGVjdGVkSXRlbShuZXdTZWxlY3RlZEl0ZW0pO1xuICAgICAgICBvbkhpZ2hsaWdodGVkKGxpbmVJdGVtc1tuZXdTZWxlY3RlZEl0ZW1dLnVyaSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnQXJyb3dVcCc6IHtcbiAgICAgICAgY29uc3QgbmV3U2VsZWN0ZWRJdGVtID1cbiAgICAgICAgICBzZWxlY3RlZEl0ZW0gPiAwID8gc2VsZWN0ZWRJdGVtIC0gMSA6IHNlbGVjdGVkSXRlbTtcbiAgICAgICAgc2V0U2VsZWN0ZWRJdGVtKG5ld1NlbGVjdGVkSXRlbSk7XG4gICAgICAgIG9uSGlnaGxpZ2h0ZWQobGluZUl0ZW1zW25ld1NlbGVjdGVkSXRlbV0udXJpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIHNldFNlbGVjdGVkSXRlbSgwKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVLZXlQcmVzcyk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlS2V5UHJlc3MpO1xuICAgIH07XG4gIH0pO1xuXG4gIHJldHVybiBzZWxlY3RlZEl0ZW07XG59O1xuIiwgIi8qKlxuICogQ29weXJpZ2h0IChjKSBNZXRhIFBsYXRmb3JtcywgSW5jLiBhbmQgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZm9ybWF0XG4gKi9cblxuaW1wb3J0IHtcbiAgVVJJLFxuICBCb29rbWFyayxcbiAgQXV0b0NvbXBsZXRlUHJvdmlkZXIsXG4gIEF1dG9Db21wbGV0ZUxpbmVJdGVtLFxuICBBcHBNYXRjaFBhdHRlcm4sXG59IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIERlZmF1bHRQcm92aWRlcigpOiBBdXRvQ29tcGxldGVQcm92aWRlciB7XG4gIHJldHVybiB7XG4gICAgaWNvbjogJ2NhdXRpb24nLFxuICAgIG1hdGNoUGF0dGVybnM6IG5ldyBNYXA8c3RyaW5nLCBVUkk+KCksXG4gIH07XG59XG5cbmV4cG9ydCBjb25zdCBib29rbWFya3NUb0F1dG9Db21wbGV0ZVByb3ZpZGVyID0gKFxuICBib29rbWFya3M6IE1hcDxVUkksIEJvb2ttYXJrPixcbikgPT4ge1xuICBjb25zdCBhdXRvQ29tcGxldGVQcm92aWRlciA9IHtcbiAgICBpY29uOiAnYm9va21hcmsnLFxuICAgIG1hdGNoUGF0dGVybnM6IG5ldyBNYXA8c3RyaW5nLCBVUkk+KCksXG4gIH0gYXMgQXV0b0NvbXBsZXRlUHJvdmlkZXI7XG4gIGJvb2ttYXJrcy5mb3JFYWNoKChib29rbWFyaywgdXJpKSA9PiB7XG4gICAgY29uc3QgbWF0Y2hQYXR0ZXJuID0gYCR7Ym9va21hcmsuY29tbW9uTmFtZX0gLSAke3VyaX1gO1xuICAgIGF1dG9Db21wbGV0ZVByb3ZpZGVyLm1hdGNoUGF0dGVybnMuc2V0KG1hdGNoUGF0dGVybiwgdXJpKTtcbiAgfSk7XG4gIHJldHVybiBhdXRvQ29tcGxldGVQcm92aWRlcjtcbn07XG5cbmV4cG9ydCBjb25zdCBhcHBNYXRjaFBhdHRlcm5zVG9BdXRvQ29tcGxldGVQcm92aWRlciA9IChcbiAgYXBwTWF0Y2hQYXR0ZXJuczogQXJyYXk8QXBwTWF0Y2hQYXR0ZXJuPixcbikgPT4ge1xuICBjb25zdCBhdXRvQ29tcGxldGVQcm92aWRlciA9IHtcbiAgICBpY29uOiAnbW9iaWxlJyxcbiAgICBtYXRjaFBhdHRlcm5zOiBuZXcgTWFwPHN0cmluZywgVVJJPigpLFxuICB9O1xuICBhcHBNYXRjaFBhdHRlcm5zLmZvckVhY2goKGFwcE1hdGNoUGF0dGVybikgPT4ge1xuICAgIGNvbnN0IG1hdGNoUGF0dGVybiA9IGAke2FwcE1hdGNoUGF0dGVybi5jbGFzc05hbWV9IC0gJHthcHBNYXRjaFBhdHRlcm4ucGF0dGVybn1gO1xuICAgIGF1dG9Db21wbGV0ZVByb3ZpZGVyLm1hdGNoUGF0dGVybnMuc2V0KFxuICAgICAgbWF0Y2hQYXR0ZXJuLFxuICAgICAgYXBwTWF0Y2hQYXR0ZXJuLnBhdHRlcm4sXG4gICAgKTtcbiAgfSk7XG4gIHJldHVybiBhdXRvQ29tcGxldGVQcm92aWRlcjtcbn07XG5cbmV4cG9ydCBjb25zdCBmaWx0ZXJNYXRjaFBhdHRlcm5zID0gKFxuICBtYXRjaFBhdHRlcm5zOiBNYXA8c3RyaW5nLCBVUkk+LFxuICBxdWVyeTogVVJJLFxuICBtYXhJdGVtczogbnVtYmVyLFxuKSA9PiB7XG4gIGNvbnN0IGZpbHRlcmVkUGF0dGVybnMgPSBuZXcgTWFwPHN0cmluZywgVVJJPigpO1xuICBmb3IgKGNvbnN0IFtwYXR0ZXJuLCB1cmldIG9mIG1hdGNoUGF0dGVybnMpIHtcbiAgICBpZiAoZmlsdGVyZWRQYXR0ZXJucy5zaXplID49IG1heEl0ZW1zKSB7XG4gICAgICBicmVhaztcbiAgICB9IGVsc2UgaWYgKHBhdHRlcm4udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxdWVyeS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgZmlsdGVyZWRQYXR0ZXJucy5zZXQocGF0dGVybiwgdXJpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZpbHRlcmVkUGF0dGVybnM7XG59O1xuXG5jb25zdCBmaWx0ZXJQcm92aWRlciA9IChcbiAgcHJvdmlkZXI6IEF1dG9Db21wbGV0ZVByb3ZpZGVyLFxuICBxdWVyeTogc3RyaW5nLFxuICBtYXhJdGVtczogbnVtYmVyLFxuKSA9PiB7XG4gIHJldHVybiB7XG4gICAgLi4ucHJvdmlkZXIsXG4gICAgbWF0Y2hQYXR0ZXJuczogZmlsdGVyTWF0Y2hQYXR0ZXJucyhwcm92aWRlci5tYXRjaFBhdHRlcm5zLCBxdWVyeSwgbWF4SXRlbXMpLFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGZpbHRlclByb3ZpZGVyc1RvTGluZUl0ZW1zID0gKFxuICBwcm92aWRlcnM6IEFycmF5PEF1dG9Db21wbGV0ZVByb3ZpZGVyPixcbiAgcXVlcnk6IHN0cmluZyxcbiAgbWF4SXRlbXM6IG51bWJlcixcbikgPT4ge1xuICBsZXQgaXRlbXNMZWZ0ID0gbWF4SXRlbXM7XG4gIGNvbnN0IGxpbmVJdGVtcyA9IG5ldyBBcnJheTxBdXRvQ29tcGxldGVMaW5lSXRlbT4oMCk7XG4gIGZvciAoY29uc3QgcHJvdmlkZXIgb2YgcHJvdmlkZXJzKSB7XG4gICAgY29uc3QgZmlsdGVyZWRQcm92aWRlciA9IGZpbHRlclByb3ZpZGVyKHByb3ZpZGVyLCBxdWVyeSwgaXRlbXNMZWZ0KTtcbiAgICBmaWx0ZXJlZFByb3ZpZGVyLm1hdGNoUGF0dGVybnMuZm9yRWFjaCgodXJpLCBtYXRjaFBhdHRlcm4pID0+IHtcbiAgICAgIGxpbmVJdGVtcy5wdXNoKHtcbiAgICAgICAgaWNvbjogcHJvdmlkZXIuaWNvbixcbiAgICAgICAgbWF0Y2hQYXR0ZXJuLFxuICAgICAgICB1cmksXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpdGVtc0xlZnQgLT0gZmlsdGVyZWRQcm92aWRlci5tYXRjaFBhdHRlcm5zLnNpemU7XG4gIH1cbiAgcmV0dXJuIGxpbmVJdGVtcztcbn07XG4iLCAiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIE1ldGEgUGxhdGZvcm1zLCBJbmMuIGFuZCBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmb3JtYXRcbiAqL1xuXG4vLyBUT0RPOiBGaXggdGhpcyB0aGUgbmV4dCB0aW1lIHRoZSBmaWxlIGlzIGVkaXRlZC5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBydWxlc2Rpci9uby1yZXN0cmljdGVkLWltcG9ydHMtY2xvbmVcbmltcG9ydCB7XG4gIERldGFpbFNpZGViYXIsXG4gIEZsZXhDZW50ZXIsXG4gIHN0eWxlZCxcbiAgRmxleFJvdyxcbiAgRmxleENvbHVtbixcbiAgVGV4dCxcbiAgUGFuZWwsXG59IGZyb20gJ2ZsaXBwZXInO1xuaW1wb3J0IHtCb29rbWFyaywgVVJJfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQge0ljb25CdXR0b259IGZyb20gJy4vJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge3RoZW1lfSBmcm9tICdmbGlwcGVyLXBsdWdpbic7XG5cbnR5cGUgUHJvcHMgPSB7XG4gIGJvb2ttYXJrczogTWFwPHN0cmluZywgQm9va21hcms+O1xuICBvbk5hdmlnYXRlOiAodXJpOiBVUkkpID0+IHZvaWQ7XG4gIG9uUmVtb3ZlOiAodXJpOiBVUkkpID0+IHZvaWQ7XG59O1xuXG5jb25zdCBOb0RhdGEgPSBzdHlsZWQoRmxleENlbnRlcikoe1xuICBmb250U2l6ZTogMTgsXG4gIGNvbG9yOiB0aGVtZS50ZXh0Q29sb3JTZWNvbmRhcnksXG59KTtcblxuY29uc3QgQm9va21hcmtzTGlzdCA9IHN0eWxlZC5kaXYoe1xuICBvdmVyZmxvd1k6ICdzY3JvbGwnLFxuICBvdmVyZmxvd1g6ICdoaWRkZW4nLFxuICBoZWlnaHQ6ICcxMDAlJyxcbiAgYmFja2dyb3VuZENvbG9yOiB0aGVtZS5iYWNrZ3JvdW5kRGVmYXVsdCxcbn0pO1xuXG5jb25zdCBCb29rbWFya0NvbnRhaW5lciA9IHN0eWxlZChGbGV4Um93KSh7XG4gIHdpZHRoOiAnMTAwJScsXG4gIHBhZGRpbmc6IDEwLFxuICBoZWlnaHQ6IDU1LFxuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgY3Vyc29yOiAncG9pbnRlcicsXG4gIGJvcmRlckJvdHRvbTogYDFweCAke3RoZW1lLmRpdmlkZXJDb2xvcn0gc29saWRgLFxuICAnOmxhc3QtY2hpbGQnOiB7XG4gICAgYm9yZGVyQm90dG9tOiAnMCcsXG4gIH0sXG4gICc6YWN0aXZlJzoge1xuICAgIGJhY2tncm91bmRDb2xvcjogdGhlbWUuYmFja2dyb3VuZFdhc2gsXG4gIH0sXG59KTtcblxuY29uc3QgQm9va21hcmtUaXRsZSA9IHN0eWxlZChUZXh0KSh7XG4gIGZvbnRTaXplOiAnMS4xZW0nLFxuICBvdmVyZmxvd1g6ICdoaWRkZW4nLFxuICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLFxuICBmb250V2VpZ2h0OiA1MDAsXG59KTtcblxuY29uc3QgQm9va21hcmtTdWJ0aXRsZSA9IHN0eWxlZChUZXh0KSh7XG4gIG92ZXJmbG93WDogJ2hpZGRlbicsXG4gIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsXG4gIGNvbG9yOiB0aGVtZS50ZXh0Q29sb3JTZWNvbmRhcnksXG4gIG1hcmdpblRvcDogNCxcbn0pO1xuXG5jb25zdCBUZXh0Q29udGFpbmVyID0gc3R5bGVkKEZsZXhDb2x1bW4pKHtcbiAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxufSk7XG5cbmNvbnN0IGFscGhhYmV0aXplQm9va21hcmtDb21wYXJlID0gKGIxOiBCb29rbWFyaywgYjI6IEJvb2ttYXJrKSA9PiB7XG4gIHJldHVybiBiMS51cmkgPCBiMi51cmkgPyAtMSA6IGIxLnVyaSA+IGIyLnVyaSA/IDEgOiAwO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIEJvb2ttYXJrc1NpZGViYXIocHJvcHM6IFByb3BzKSB7XG4gIGNvbnN0IHtib29rbWFya3MsIG9uTmF2aWdhdGUsIG9uUmVtb3ZlfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxEZXRhaWxTaWRlYmFyPlxuICAgICAgPFBhbmVsIGhlYWRpbmc9XCJCb29rbWFya3NcIiBmbG9hdGluZz17ZmFsc2V9IHBhZGRlZD17ZmFsc2V9PlxuICAgICAgICB7Ym9va21hcmtzLnNpemUgPT09IDAgPyAoXG4gICAgICAgICAgPE5vRGF0YSBncm93Pk5vIEJvb2ttYXJrczwvTm9EYXRhPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxCb29rbWFya3NMaXN0PlxuICAgICAgICAgICAge1suLi5ib29rbWFya3MudmFsdWVzKCldXG4gICAgICAgICAgICAgIC5zb3J0KGFscGhhYmV0aXplQm9va21hcmtDb21wYXJlKVxuICAgICAgICAgICAgICAubWFwKChib29rbWFyaywgaWR4KSA9PiAoXG4gICAgICAgICAgICAgICAgPEJvb2ttYXJrQ29udGFpbmVyXG4gICAgICAgICAgICAgICAgICBrZXk9e2lkeH1cbiAgICAgICAgICAgICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9uTmF2aWdhdGUoYm9va21hcmsudXJpKTtcbiAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgPFRleHRDb250YWluZXIgZ3Jvdz5cbiAgICAgICAgICAgICAgICAgICAgPEJvb2ttYXJrVGl0bGU+XG4gICAgICAgICAgICAgICAgICAgICAge2Jvb2ttYXJrLmNvbW1vbk5hbWUgfHwgYm9va21hcmsudXJpfVxuICAgICAgICAgICAgICAgICAgICA8L0Jvb2ttYXJrVGl0bGU+XG4gICAgICAgICAgICAgICAgICAgIHshYm9va21hcmsuY29tbW9uTmFtZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPEJvb2ttYXJrU3VidGl0bGU+e2Jvb2ttYXJrLnVyaX08L0Jvb2ttYXJrU3VidGl0bGU+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L1RleHRDb250YWluZXI+XG4gICAgICAgICAgICAgICAgICA8SWNvbkJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjb2xvcj17dGhlbWUudGV4dENvbG9yU2Vjb25kYXJ5fVxuICAgICAgICAgICAgICAgICAgICBvdXRsaW5lPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgaWNvbj1cImNyb3NzLWNpcmNsZVwiXG4gICAgICAgICAgICAgICAgICAgIHNpemU9ezE2fVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblJlbW92ZShib29rbWFyay51cmkpfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L0Jvb2ttYXJrQ29udGFpbmVyPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICA8L0Jvb2ttYXJrc0xpc3Q+XG4gICAgICAgICl9XG4gICAgICA8L1BhbmVsPlxuICAgIDwvRGV0YWlsU2lkZWJhcj5cbiAgKTtcbn1cbiIsICIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZvcm1hdFxuICovXG5cbi8vIFRPRE86IEZpeCB0aGlzIHRoZSBuZXh0IHRpbWUgdGhlIGZpbGUgaXMgZWRpdGVkLlxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJ1bGVzZGlyL25vLXJlc3RyaWN0ZWQtaW1wb3J0cy1jbG9uZVxuaW1wb3J0IHtzdHlsZWQsIEljb25TaXplLCBjb2xvcnN9IGZyb20gJ2ZsaXBwZXInO1xuaW1wb3J0IHtJY29uQnV0dG9ufSBmcm9tICcuLyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG50eXBlIFByb3BzID0ge1xuICBvbkNsaWNrPzogKCkgPT4gdm9pZDtcbiAgaGlnaGxpZ2h0ZWQ6IGJvb2xlYW47XG4gIHNpemU6IEljb25TaXplO1xufTtcblxuY29uc3QgRmF2b3JpdGVCdXR0b25Db250YWluZXIgPSBzdHlsZWQuZGl2KHtcbiAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICc+OmZpcnN0LWNoaWxkJzoge1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICB9LFxuICAnPjpsYXN0LWNoaWxkJzoge1xuICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICB9LFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBGYXZvcml0ZUJ1dHRvbihwcm9wczogUHJvcHMpIHtcbiAgY29uc3Qge2hpZ2hsaWdodGVkLCBvbkNsaWNrLCAuLi5pY29uQnV0dG9uUHJvcHN9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPEZhdm9yaXRlQnV0dG9uQ29udGFpbmVyPlxuICAgICAge2hpZ2hsaWdodGVkID8gKFxuICAgICAgICA8SWNvbkJ1dHRvblxuICAgICAgICAgIG91dGxpbmU9e2ZhbHNlfVxuICAgICAgICAgIGNvbG9yPXtjb2xvcnMubGVtb259XG4gICAgICAgICAgaWNvbj1cInN0YXJcIlxuICAgICAgICAgIHsuLi5pY29uQnV0dG9uUHJvcHN9XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbH1cbiAgICAgIDxJY29uQnV0dG9uIG91dGxpbmUgaWNvbj1cInN0YXJcIiBvbkNsaWNrPXtvbkNsaWNrfSB7Li4uaWNvbkJ1dHRvblByb3BzfSAvPlxuICAgIDwvRmF2b3JpdGVCdXR0b25Db250YWluZXI+XG4gICk7XG59XG4iLCAiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIE1ldGEgUGxhdGZvcm1zLCBJbmMuIGFuZCBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmb3JtYXRcbiAqL1xuXG4vLyBUT0RPOiBGaXggdGhpcyB0aGUgbmV4dCB0aW1lIHRoZSBmaWxlIGlzIGVkaXRlZC5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBydWxlc2Rpci9uby1yZXN0cmljdGVkLWltcG9ydHMtY2xvbmVcbmltcG9ydCB7R2x5cGgsIHN0eWxlZCwga2V5ZnJhbWVzLCBJY29uU2l6ZX0gZnJvbSAnZmxpcHBlcic7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBzaHJpbmtBbmltYXRpb24gPSBrZXlmcmFtZXMoe1xuICAnMCUnOiB7XG4gICAgdHJhbnNmb3JtOiAnc2NhbGUoMSk7JyxcbiAgfSxcbiAgJzEwMCUnOiB7XG4gICAgdHJhbnNmb3JtOiAnc2NhbGUoLjkpJyxcbiAgfSxcbn0pO1xuXG50eXBlIFByb3BzID0ge1xuICBpY29uOiBzdHJpbmc7XG4gIG91dGxpbmU/OiBib29sZWFuO1xuICBvbkNsaWNrPzogKCkgPT4gdm9pZDtcbiAgY29sb3I/OiBzdHJpbmc7XG4gIHNpemU6IEljb25TaXplO1xufTtcblxuY29uc3QgUmlwcGxlRWZmZWN0ID0gc3R5bGVkLmRpdih7XG4gIHBhZGRpbmc6IDUsXG4gIGJvcmRlclJhZGl1czogMTAwLFxuICBiYWNrZ3JvdW5kUG9zaXRpb246ICdjZW50ZXInLFxuICB0cmFuc2l0aW9uOiAnYmFja2dyb3VuZCAwLjVzJyxcbiAgJzpob3Zlcic6IHtcbiAgICBiYWNrZ3JvdW5kOlxuICAgICAgJ3JnYmEoMTU1LCAxNTUsIDE1NSwgMC4yKSByYWRpYWwtZ3JhZGllbnQoY2lyY2xlLCB0cmFuc3BhcmVudCAxJSwgcmdiYSgxNTUsIDE1NSwgMTU1LCAwLjIpIDElKSBjZW50ZXIvMTUwMDAlJyxcbiAgfSxcbiAgJzphY3RpdmUnOiB7XG4gICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgyMDEsIDIwMCwgMjAwLCAwLjUpJyxcbiAgICBiYWNrZ3JvdW5kU2l6ZTogJzEwMCUnLFxuICAgIHRyYW5zaXRpb246ICdiYWNrZ3JvdW5kIDBzJyxcbiAgfSxcbn0pO1xuXG5jb25zdCBJY29uQnV0dG9uQ29udGFpbmVyID0gc3R5bGVkLmRpdih7XG4gICc6YWN0aXZlJzoge1xuICAgIGFuaW1hdGlvbjogYCR7c2hyaW5rQW5pbWF0aW9ufSAuMjVzIGVhc2UgZm9yd2FyZHNgLFxuICB9LFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBJY29uQnV0dG9uKHByb3BzOiBQcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxSaXBwbGVFZmZlY3Q+XG4gICAgICA8SWNvbkJ1dHRvbkNvbnRhaW5lciBjbGFzc05hbWU9XCJpY29uLWJ1dHRvblwiIG9uQ2xpY2s9e3Byb3BzLm9uQ2xpY2t9PlxuICAgICAgICA8R2x5cGhcbiAgICAgICAgICBuYW1lPXtwcm9wcy5pY29ufVxuICAgICAgICAgIHNpemU9e3Byb3BzLnNpemV9XG4gICAgICAgICAgY29sb3I9e3Byb3BzLmNvbG9yfVxuICAgICAgICAgIHZhcmlhbnQ9e3Byb3BzLm91dGxpbmUgPyAnb3V0bGluZScgOiAnZmlsbGVkJ31cbiAgICAgICAgLz5cbiAgICAgIDwvSWNvbkJ1dHRvbkNvbnRhaW5lcj5cbiAgICA8L1JpcHBsZUVmZmVjdD5cbiAgKTtcbn1cbiIsICIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZvcm1hdFxuICovXG5cbi8vIFRPRE86IEZpeCB0aGlzIHRoZSBuZXh0IHRpbWUgdGhlIGZpbGUgaXMgZWRpdGVkLlxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJ1bGVzZGlyL25vLXJlc3RyaWN0ZWQtaW1wb3J0cy1jbG9uZVxuaW1wb3J0IHtcbiAgc3R5bGVkLFxuICBjb2xvcnMsXG4gIE1hbmFnZWRUYWJsZSxcbiAgVGFibGVCb2R5Um93LFxuICBGbGV4Q2VudGVyLFxuICBMb2FkaW5nSW5kaWNhdG9yLFxuICBCdXR0b24sXG4gIEdseXBoLFxufSBmcm9tICdmbGlwcGVyJztcbmltcG9ydCB7cGFyc2VVUklQYXJhbWV0ZXJzLCBzdHJpcFF1ZXJ5UGFyYW1ldGVyc30gZnJvbSAnLi4vdXRpbC91cmknO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7dGhlbWV9IGZyb20gJ2ZsaXBwZXItcGx1Z2luJztcblxuY29uc3QgQk9YX0hFSUdIVCA9IDI0MDtcblxudHlwZSBQcm9wcyA9IHtcbiAgaXNCb29rbWFya2VkOiBib29sZWFuO1xuICB1cmk6IHN0cmluZyB8IG51bGw7XG4gIGNsYXNzTmFtZTogc3RyaW5nIHwgbnVsbDtcbiAgb25OYXZpZ2F0ZTogKHF1ZXJ5OiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRmF2b3JpdGU6IChxdWVyeTogc3RyaW5nKSA9PiB2b2lkO1xuICBzY3JlZW5zaG90OiBzdHJpbmcgfCBudWxsO1xuICBkYXRlOiBEYXRlIHwgbnVsbDtcbn07XG5cbmNvbnN0IFNjcmVlbnNob3RDb250YWluZXIgPSBzdHlsZWQuZGl2KHtcbiAgd2lkdGg6IDIwMCxcbiAgbWluV2lkdGg6IDIwMCxcbiAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICBib3JkZXJMZWZ0OiBgMXB4ICR7Y29sb3JzLmJsdWVHcmF5VGludDkwfSBzb2xpZGAsXG4gIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICBoZWlnaHQ6ICcxMDAlJyxcbiAgYm9yZGVyUmFkaXVzOiAxMCxcbiAgaW1nOiB7XG4gICAgd2lkdGg6ICcxMDAlJyxcbiAgfSxcbn0pO1xuXG5jb25zdCBOb0RhdGEgPSBzdHlsZWQuZGl2KHtcbiAgY29sb3I6IGNvbG9ycy5saWdodDMwLFxuICBmb250U2l6ZTogMTQsXG4gIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxufSk7XG5cbmNvbnN0IE5hdmlnYXRpb25EYXRhQ29udGFpbmVyID0gc3R5bGVkLmRpdih7XG4gIGFsaWduSXRlbXM6ICdmbGV4LXN0YXJ0JyxcbiAgZmxleEdyb3c6IDEsXG4gIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxufSk7XG5cbmNvbnN0IEZvb3RlciA9IHN0eWxlZC5kaXYoe1xuICB3aWR0aDogJzEwMCUnLFxuICBwYWRkaW5nOiAnMTBweCcsXG4gIGJvcmRlclRvcDogYDFweCAke2NvbG9ycy5ibHVlR3JheVRpbnQ5MH0gc29saWRgLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGFsaWduSXRlbXM6ICdjZW50ZXInLFxufSk7XG5cbmNvbnN0IFNlcGVyYXRvciA9IHN0eWxlZC5kaXYoe1xuICBmbGV4R3JvdzogMSxcbn0pO1xuXG5jb25zdCBUaW1lQ29udGFpbmVyID0gc3R5bGVkLmRpdih7XG4gIGNvbG9yOiBjb2xvcnMubGlnaHQzMCxcbiAgZm9udFNpemU6IDE0LFxufSk7XG5cbmNvbnN0IE5hdmlnYXRpb25JbmZvQm94Q29udGFpbmVyID0gc3R5bGVkLmRpdih7XG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgaGVpZ2h0OiBCT1hfSEVJR0hULFxuICBib3JkZXJSYWRpdXM6IDEwLFxuICBmbGV4R3JvdzogMSxcbiAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gIG1hcmdpbkJvdHRvbTogMTAsXG4gIGJhY2tncm91bmRDb2xvcjogdGhlbWUuYmFja2dyb3VuZERlZmF1bHQsXG4gIGJveFNoYWRvdzogJzFweCAxcHggNXB4IHJnYmEoMCwwLDAsMC4xKScsXG59KTtcblxuY29uc3QgSGVhZGVyID0gc3R5bGVkLmRpdih7XG4gIGZvbnRTaXplOiAxOCxcbiAgZm9udFdlaWdodDogNTAwLFxuICB1c2VyU2VsZWN0OiAndGV4dCcsXG4gIGN1cnNvcjogJ3RleHQnLFxuICBwYWRkaW5nOiAxMCxcbiAgYm9yZGVyQm90dG9tOiBgMXB4ICR7Y29sb3JzLmJsdWVHcmF5VGludDkwfSBzb2xpZGAsXG4gIGRpc3BsYXk6ICdmbGV4Jyxcbn0pO1xuXG5jb25zdCBDbGFzc05hbWVDb250YWluZXIgPSBzdHlsZWQuZGl2KHtcbiAgY29sb3I6IGNvbG9ycy5saWdodDMwLFxufSk7XG5cbmNvbnN0IFBhcmFtZXRlcnNDb250YWluZXIgPSBzdHlsZWQuZGl2KHtcbiAgaGVpZ2h0OiAxNTAsXG4gICcmPionOiB7XG4gICAgaGVpZ2h0OiAxNTAsXG4gICAgbWFyZ2luQm90dG9tOiAyMCxcbiAgfSxcbn0pO1xuXG5jb25zdCBOb1BhcmFtdGVycyA9IHN0eWxlZChGbGV4Q2VudGVyKSh7XG4gIGZvbnRTaXplOiAxOCxcbiAgY29sb3I6IGNvbG9ycy5saWdodDEwLFxufSk7XG5cbmNvbnN0IFRpbWVsaW5lQ2lyY2xlID0gc3R5bGVkLmRpdih7XG4gIHdpZHRoOiAxOCxcbiAgaGVpZ2h0OiAxOCxcbiAgdG9wOiAxMSxcbiAgbGVmdDogLTMzLFxuICBiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmJhY2tncm91bmRXYXNoLFxuICBib3JkZXI6IGA0cHggc29saWQgJHtjb2xvcnMuaGlnaGxpZ2h0fWAsXG4gIGJvcmRlclJhZGl1czogJzUwJScsXG4gIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxufSk7XG5cbmNvbnN0IFRpbWVsaW5lTWluaUNpcmNsZSA9IHN0eWxlZC5kaXYoe1xuICB3aWR0aDogMTIsXG4gIGhlaWdodDogMTIsXG4gIHRvcDogMSxcbiAgbGVmdDogLTMwLFxuICBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICBiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLnRleHRDb2xvckFjdGl2ZSxcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG59KTtcblxuY29uc3QgYnVpbGRQYXJhbWV0ZXJUYWJsZSA9IChwYXJhbWV0ZXJzOiBNYXA8c3RyaW5nLCBzdHJpbmc+KSA9PiB7XG4gIGNvbnN0IHRhYmxlUm93czogQXJyYXk8VGFibGVCb2R5Um93PiA9IFtdO1xuICBsZXQgaWR4ID0gMDtcbiAgcGFyYW1ldGVycy5mb3JFYWNoKChwYXJhbWV0ZXJfdmFsdWUsIHBhcmFtZXRlcikgPT4ge1xuICAgIHRhYmxlUm93cy5wdXNoKHtcbiAgICAgIGtleTogaWR4LnRvU3RyaW5nKCksXG4gICAgICBjb2x1bW5zOiB7XG4gICAgICAgIHBhcmFtZXRlcjoge1xuICAgICAgICAgIHZhbHVlOiBwYXJhbWV0ZXIsXG4gICAgICAgIH0sXG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgdmFsdWU6IHBhcmFtZXRlcl92YWx1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgaWR4Kys7XG4gIH0pO1xuICByZXR1cm4gKFxuICAgIDxNYW5hZ2VkVGFibGVcbiAgICAgIGNvbHVtbnM9e3twYXJhbWV0ZXI6IHt2YWx1ZTogJ1BhcmFtZXRlcid9LCB2YWx1ZToge3ZhbHVlOiAnVmFsdWUnfX19XG4gICAgICByb3dzPXt0YWJsZVJvd3N9XG4gICAgICB6ZWJyYT17ZmFsc2V9XG4gICAgLz5cbiAgKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBOYXZpZ2F0aW9uSW5mb0JveChwcm9wczogUHJvcHMpIHtcbiAgY29uc3Qge1xuICAgIHVyaSxcbiAgICBpc0Jvb2ttYXJrZWQsXG4gICAgY2xhc3NOYW1lLFxuICAgIHNjcmVlbnNob3QsXG4gICAgb25OYXZpZ2F0ZSxcbiAgICBvbkZhdm9yaXRlLFxuICAgIGRhdGUsXG4gIH0gPSBwcm9wcztcbiAgaWYgKHVyaSA9PSBudWxsICYmIGNsYXNzTmFtZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDw+XG4gICAgICAgIDxOb0RhdGE+XG4gICAgICAgICAgPFRpbWVsaW5lTWluaUNpcmNsZSAvPlxuICAgICAgICAgIFVua25vd24gTmF2aWdhdGlvbiBFdmVudFxuICAgICAgICA8L05vRGF0YT5cbiAgICAgIDwvPlxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgcGFyYW1ldGVycyA9IHVyaSAhPSBudWxsID8gcGFyc2VVUklQYXJhbWV0ZXJzKHVyaSkgOiBudWxsO1xuICAgIHJldHVybiAoXG4gICAgICA8TmF2aWdhdGlvbkluZm9Cb3hDb250YWluZXI+XG4gICAgICAgIDxUaW1lbGluZUNpcmNsZSAvPlxuICAgICAgICA8TmF2aWdhdGlvbkRhdGFDb250YWluZXI+XG4gICAgICAgICAgPEhlYWRlcj5cbiAgICAgICAgICAgIHt1cmkgIT0gbnVsbCA/IHN0cmlwUXVlcnlQYXJhbWV0ZXJzKHVyaSkgOiAnJ31cbiAgICAgICAgICAgIDxTZXBlcmF0b3IgLz5cbiAgICAgICAgICAgIHtjbGFzc05hbWUgIT0gbnVsbCA/IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8R2x5cGhcbiAgICAgICAgICAgICAgICAgIGNvbG9yPXtjb2xvcnMubGlnaHQzMH1cbiAgICAgICAgICAgICAgICAgIHNpemU9ezE2fVxuICAgICAgICAgICAgICAgICAgbmFtZT1cInBhcGVyLWZvbGQtdGV4dFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAmbmJzcDtcbiAgICAgICAgICAgICAgICA8Q2xhc3NOYW1lQ29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAge2NsYXNzTmFtZSAhPSBudWxsID8gY2xhc3NOYW1lIDogJyd9XG4gICAgICAgICAgICAgICAgPC9DbGFzc05hbWVDb250YWluZXI+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgPC9IZWFkZXI+XG4gICAgICAgICAgPFBhcmFtZXRlcnNDb250YWluZXI+XG4gICAgICAgICAgICB7cGFyYW1ldGVycyAhPSBudWxsICYmIHBhcmFtZXRlcnMuc2l6ZSA+IDAgPyAoXG4gICAgICAgICAgICAgIGJ1aWxkUGFyYW1ldGVyVGFibGUocGFyYW1ldGVycylcbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxOb1BhcmFtdGVycyBncm93Pk5vIFBhcmFtZXRlcnMgZm9yIHRoaXMgRXZlbnQ8L05vUGFyYW10ZXJzPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L1BhcmFtZXRlcnNDb250YWluZXI+XG4gICAgICAgICAgPEZvb3Rlcj5cbiAgICAgICAgICAgIHt1cmkgIT0gbnVsbCA/IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9eygpID0+IG9uTmF2aWdhdGUodXJpKX0+T3BlbjwvQnV0dG9uPlxuICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17KCkgPT4gb25GYXZvcml0ZSh1cmkpfT5cbiAgICAgICAgICAgICAgICAgIHtpc0Jvb2ttYXJrZWQgPyAnRWRpdCBCb29rbWFyaycgOiAnQm9va21hcmsnfVxuICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgPFNlcGVyYXRvciAvPlxuICAgICAgICAgICAgPFRpbWVDb250YWluZXI+XG4gICAgICAgICAgICAgIHtkYXRlICE9IG51bGwgPyBkYXRlLnRvVGltZVN0cmluZygpIDogJyd9XG4gICAgICAgICAgICA8L1RpbWVDb250YWluZXI+XG4gICAgICAgICAgPC9Gb290ZXI+XG4gICAgICAgIDwvTmF2aWdhdGlvbkRhdGFDb250YWluZXI+XG4gICAgICAgIHt1cmkgIT0gbnVsbCB8fCBjbGFzc05hbWUgIT0gbnVsbCA/IChcbiAgICAgICAgICA8U2NyZWVuc2hvdENvbnRhaW5lcj5cbiAgICAgICAgICAgIHtzY3JlZW5zaG90ICE9IG51bGwgPyAoXG4gICAgICAgICAgICAgIDxpbWcgc3JjPXtzY3JlZW5zaG90fSAvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPEZsZXhDZW50ZXIgZ3Jvdz5cbiAgICAgICAgICAgICAgICA8TG9hZGluZ0luZGljYXRvciBzaXplPXszMn0gLz5cbiAgICAgICAgICAgICAgPC9GbGV4Q2VudGVyPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L1NjcmVlbnNob3RDb250YWluZXI+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgPC9OYXZpZ2F0aW9uSW5mb0JveENvbnRhaW5lcj5cbiAgICApO1xuICB9XG59XG4iLCAiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIE1ldGEgUGxhdGZvcm1zLCBJbmMuIGFuZCBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmb3JtYXRcbiAqL1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVQYXJhbWV0ZXIgPSAodmFsdWU6IHN0cmluZywgcGFyYW1ldGVyOiBzdHJpbmcpID0+IHtcbiAgcmV0dXJuIChcbiAgICB2YWx1ZSAmJlxuICAgIChwYXJhbWV0ZXJJc051bWJlclR5cGUocGFyYW1ldGVyKSA/ICFpc05hTihwYXJzZUludCh2YWx1ZSwgMTApKSA6IHRydWUpICYmXG4gICAgKHBhcmFtZXRlcklzQm9vbGVhblR5cGUocGFyYW1ldGVyKVxuICAgICAgPyB2YWx1ZSA9PT0gJ3RydWUnIHx8IHZhbHVlID09PSAnZmFsc2UnXG4gICAgICA6IHRydWUpXG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgZmlsdGVyT3B0aW9uYWxQYXJhbWV0ZXJzID0gKHVyaTogc3RyaW5nKSA9PiB7XG4gIHJldHVybiB1cmkucmVwbGFjZSgvWy8mXT8oW14mPz17fVxcL10qPSk/e1xcPy4qP30vZywgJycpO1xufTtcblxuZXhwb3J0IGNvbnN0IHBhcnNlVVJJUGFyYW1ldGVycyA9IChxdWVyeTogc3RyaW5nKSA9PiB7XG4gIC8vIGdldCBwYXJhbWV0ZXJzIGZyb20gcXVlcnkgc3RyaW5nIGFuZCBzdG9yZSBpbiBNYXBcbiAgY29uc3QgcGFyYW1ldGVycyA9IHF1ZXJ5LnNwbGl0KCc/Jykuc3BsaWNlKDEpLmpvaW4oJycpO1xuICBjb25zdCBwYXJhbWV0ZXJzT2JqID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhwYXJhbWV0ZXJzKTtcbiAgY29uc3QgcGFyYW1ldGVyc01hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4gIGZvciAoY29uc3Qga2V5IGluIHBhcmFtZXRlcnNPYmopIHtcbiAgICBwYXJhbWV0ZXJzTWFwLnNldChrZXksIHBhcmFtZXRlcnNPYmouZ2V0KGtleSkgYXMgc3RyaW5nKTtcbiAgfVxuICByZXR1cm4gcGFyYW1ldGVyc01hcDtcbn07XG5cbmV4cG9ydCBjb25zdCBwYXJhbWV0ZXJJc051bWJlclR5cGUgPSAocGFyYW1ldGVyOiBzdHJpbmcpID0+IHtcbiAgY29uc3QgcmVnRXhwID0gL157KCN8XFw/IykvZztcbiAgcmV0dXJuIHJlZ0V4cC50ZXN0KHBhcmFtZXRlcik7XG59O1xuXG5leHBvcnQgY29uc3QgcGFyYW1ldGVySXNCb29sZWFuVHlwZSA9IChwYXJhbWV0ZXI6IHN0cmluZykgPT4ge1xuICBjb25zdCByZWdFeHAgPSAvXnsoIXxcXD8hKS9nO1xuICByZXR1cm4gcmVnRXhwLnRlc3QocGFyYW1ldGVyKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZXBsYWNlUmVxdWlyZWRQYXJhbWV0ZXJzV2l0aFZhbHVlcyA9IChcbiAgdXJpOiBzdHJpbmcsXG4gIHZhbHVlczogQXJyYXk8c3RyaW5nPixcbikgPT4ge1xuICBjb25zdCBwYXJhbWV0ZXJSZWdFeHAgPSAve1teP10qP30vZztcbiAgY29uc3QgcmVwbGFjZVJlZ0V4cCA9IC97W14/XSo/fS87XG4gIGxldCBuZXdVUkkgPSB1cmk7XG4gIGxldCBpbmRleCA9IDA7XG4gIGxldCBtYXRjaCA9IHBhcmFtZXRlclJlZ0V4cC5leGVjKHVyaSk7XG4gIHdoaWxlIChtYXRjaCAhPSBudWxsKSB7XG4gICAgbmV3VVJJID0gbmV3VVJJLnJlcGxhY2UocmVwbGFjZVJlZ0V4cCwgdmFsdWVzW2luZGV4XSk7XG4gICAgbWF0Y2ggPSBwYXJhbWV0ZXJSZWdFeHAuZXhlYyh1cmkpO1xuICAgIGluZGV4Kys7XG4gIH1cbiAgcmV0dXJuIG5ld1VSSTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRSZXF1aXJlZFBhcmFtZXRlcnMgPSAodXJpOiBzdHJpbmcpID0+IHtcbiAgLy8gQWRkID0gdG8gdGhlIG1hdGNoaW5nIGdyb3VwIHRvIGZpbHRlciBvdXQgc3RyaW5naWZpZWQgSlNPTiBwYXJhbWV0ZXJzXG4gIGNvbnN0IHBhcmFtZXRlclJlZ0V4cCA9IC89e1teP10qP30vZztcbiAgY29uc3QgbWF0Y2hlczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBsZXQgbWF0Y2ggPSBwYXJhbWV0ZXJSZWdFeHAuZXhlYyh1cmkpO1xuICB3aGlsZSAobWF0Y2ggIT0gbnVsbCkge1xuICAgIGlmIChtYXRjaFswXSkge1xuICAgICAgLy8gUmVtb3ZlID0gZnJvbSB0aGUgbWF0Y2hcbiAgICAgIGNvbnN0IHRhcmdldCA9IG1hdGNoWzBdLnN1YnN0cmluZygxKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIElmIHRoZSB2YWx1ZSBjb3VsZCBiZSBwYXJzZWQgYXNhIHZhbGlkIEpTT04sIGlnbm9yZSBpdFxuICAgICAgICBKU09OLnBhcnNlKHRhcmdldCk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgbWF0Y2hlcy5wdXNoKHRhcmdldCk7XG4gICAgICB9XG4gICAgfVxuICAgIG1hdGNoID0gcGFyYW1ldGVyUmVnRXhwLmV4ZWModXJpKTtcbiAgfVxuICByZXR1cm4gbWF0Y2hlcztcbn07XG5cbmV4cG9ydCBjb25zdCBsaXZlRWRpdCA9ICh1cmk6IHN0cmluZywgZm9ybVZhbHVlczogQXJyYXk8c3RyaW5nPikgPT4ge1xuICBjb25zdCBwYXJhbWV0ZXJSZWdFeHAgPSAvKHtbXj9dKj99KS9nO1xuICBjb25zdCB1cmlBcnJheSA9IHVyaS5zcGxpdChwYXJhbWV0ZXJSZWdFeHApO1xuICByZXR1cm4gdXJpQXJyYXkucmVkdWNlKChhY2MsIHVyaUNvbXBvbmVudCwgaWR4KSA9PiB7XG4gICAgaWYgKGlkeCAlIDIgPT09IDAgfHwgIWZvcm1WYWx1ZXNbKGlkeCAtIDEpIC8gMl0pIHtcbiAgICAgIHJldHVybiBhY2MgKyB1cmlDb21wb25lbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBhY2MgKyBmb3JtVmFsdWVzWyhpZHggLSAxKSAvIDJdO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc3RyaXBRdWVyeVBhcmFtZXRlcnMgPSAodXJpOiBzdHJpbmcpID0+IHtcbiAgcmV0dXJuIHVyaS5yZXBsYWNlKC9cXD8uKiQvZywgJycpO1xufTtcbiIsICIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZvcm1hdFxuICovXG5cbmltcG9ydCB7TW9kYWwsIEJ1dHRvbiwgQWxlcnQsIElucHV0LCBUeXBvZ3JhcGh5fSBmcm9tICdhbnRkJztcbmltcG9ydCB7TGF5b3V0fSBmcm9tICdmbGlwcGVyLXBsdWdpbic7XG5pbXBvcnQge1xuICByZXBsYWNlUmVxdWlyZWRQYXJhbWV0ZXJzV2l0aFZhbHVlcyxcbiAgcGFyYW1ldGVySXNOdW1iZXJUeXBlLFxuICBwYXJhbWV0ZXJJc0Jvb2xlYW5UeXBlLFxuICB2YWxpZGF0ZVBhcmFtZXRlcixcbiAgbGl2ZUVkaXQsXG59IGZyb20gJy4uL3V0aWwvdXJpJztcbmltcG9ydCB7dXNlUmVxdWlyZWRQYXJhbWV0ZXJGb3JtVmFsaWRhdG9yfSBmcm9tICcuLi9ob29rcy9yZXF1aXJlZFBhcmFtZXRlcnMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHtVUkl9IGZyb20gJy4uL3R5cGVzJztcblxudHlwZSBQcm9wcyA9IHtcbiAgdXJpOiBzdHJpbmc7XG4gIHJlcXVpcmVkUGFyYW1ldGVyczogQXJyYXk8c3RyaW5nPjtcbiAgb25IaWRlOiAoKSA9PiB2b2lkO1xuICBvblN1Ym1pdDogKHVyaTogVVJJKSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIFJlcXVpcmVkUGFyYW1ldGVyc0RpYWxvZyhwcm9wczogUHJvcHMpIHtcbiAgY29uc3Qge29uSGlkZSwgb25TdWJtaXQsIHVyaSwgcmVxdWlyZWRQYXJhbWV0ZXJzfSA9IHByb3BzO1xuICBjb25zdCB7aXNWYWxpZCwgdmFsdWVzLCBzZXRWYWx1ZXNBcnJheX0gPVxuICAgIHVzZVJlcXVpcmVkUGFyYW1ldGVyRm9ybVZhbGlkYXRvcihyZXF1aXJlZFBhcmFtZXRlcnMpO1xuICByZXR1cm4gKFxuICAgIDxNb2RhbFxuICAgICAgb3BlblxuICAgICAgb25DYW5jZWw9e29uSGlkZX1cbiAgICAgIHRpdGxlPVwiUHJvdmlkZSBib29rbWFyayBkZXRhaWxzXCJcbiAgICAgIGZvb3Rlcj17XG4gICAgICAgIDw+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICBvbkhpZGUoKTtcbiAgICAgICAgICAgICAgc2V0VmFsdWVzQXJyYXkoW10pO1xuICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICBDYW5jZWxcbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICB0eXBlPXsncHJpbWFyeSd9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIG9uU3VibWl0KHJlcGxhY2VSZXF1aXJlZFBhcmFtZXRlcnNXaXRoVmFsdWVzKHVyaSwgdmFsdWVzKSk7XG4gICAgICAgICAgICAgIG9uSGlkZSgpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGRpc2FibGVkPXshaXNWYWxpZH0+XG4gICAgICAgICAgICBTdWJtaXRcbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC8+XG4gICAgICB9PlxuICAgICAgPExheW91dC5Db250YWluZXIgZ2FwPlxuICAgICAgICA8QWxlcnRcbiAgICAgICAgICB0eXBlPVwiaW5mb1wiXG4gICAgICAgICAgbWVzc2FnZT1cIlRoaXMgdXJpIGhhcyByZXF1aXJlZCBwYXJhbWV0ZXJzIGRlbm90ZWQgYnkgJ3twYXJhbWV0ZXJ9J30uXCJcbiAgICAgICAgLz5cblxuICAgICAgICB7cmVxdWlyZWRQYXJhbWV0ZXJzLm1hcCgocGFyYW1hdGVyLCBpZHgpID0+IChcbiAgICAgICAgICA8ZGl2IGtleT17aWR4fT5cbiAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50OiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT5cbiAgICAgICAgICAgICAgICBzZXRWYWx1ZXNBcnJheShbXG4gICAgICAgICAgICAgICAgICAuLi52YWx1ZXMuc2xpY2UoMCwgaWR4KSxcbiAgICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC52YWx1ZSxcbiAgICAgICAgICAgICAgICAgIC4uLnZhbHVlcy5zbGljZShpZHggKyAxKSxcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG5hbWU9e3BhcmFtYXRlcn1cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3BhcmFtYXRlcn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB7dmFsdWVzW2lkeF0gJiZcbiAgICAgICAgICAgIHBhcmFtZXRlcklzTnVtYmVyVHlwZShwYXJhbWF0ZXIpICYmXG4gICAgICAgICAgICAhdmFsaWRhdGVQYXJhbWV0ZXIodmFsdWVzW2lkeF0sIHBhcmFtYXRlcikgPyAoXG4gICAgICAgICAgICAgIDxBbGVydCB0eXBlPVwiZXJyb3JcIiBtZXNzYWdlPVwiUGFyYW1ldGVyIG11c3QgYmUgYSBudW1iZXJcIiAvPlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICB7dmFsdWVzW2lkeF0gJiZcbiAgICAgICAgICAgIHBhcmFtZXRlcklzQm9vbGVhblR5cGUocGFyYW1hdGVyKSAmJlxuICAgICAgICAgICAgIXZhbGlkYXRlUGFyYW1ldGVyKHZhbHVlc1tpZHhdLCBwYXJhbWF0ZXIpID8gKFxuICAgICAgICAgICAgICA8QWxlcnRcbiAgICAgICAgICAgICAgICB0eXBlPVwiZXJyb3JcIlxuICAgICAgICAgICAgICAgIG1lc3NhZ2U9XCJQYXJhbWV0ZXIgbXVzdCBiZSBlaXRoZXIgJ3RydWUnIG9yICdmYWxzZSdcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkpfVxuICAgICAgICA8VHlwb2dyYXBoeS5UZXh0IGNvZGU+e2xpdmVFZGl0KHVyaSwgdmFsdWVzKX08L1R5cG9ncmFwaHkuVGV4dD5cbiAgICAgIDwvTGF5b3V0LkNvbnRhaW5lcj5cbiAgICA8L01vZGFsPlxuICApO1xufVxuIiwgIi8qKlxuICogQ29weXJpZ2h0IChjKSBNZXRhIFBsYXRmb3JtcywgSW5jLiBhbmQgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZm9ybWF0XG4gKi9cblxuaW1wb3J0IHt1c2VNZW1vLCB1c2VTdGF0ZX0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHt2YWxpZGF0ZVBhcmFtZXRlcn0gZnJvbSAnLi4vdXRpbC91cmknO1xuXG5leHBvcnQgY29uc3QgdXNlUmVxdWlyZWRQYXJhbWV0ZXJGb3JtVmFsaWRhdG9yID0gKFxuICByZXF1aXJlZFBhcmFtZXRlcnM6IEFycmF5PHN0cmluZz4sXG4pID0+IHtcbiAgY29uc3QgW3ZhbHVlcywgc2V0VmFsdWVzQXJyYXldID0gdXNlU3RhdGU8QXJyYXk8c3RyaW5nPj4oXG4gICAgcmVxdWlyZWRQYXJhbWV0ZXJzLm1hcCgoKSA9PiAnJyksXG4gICk7XG4gIGNvbnN0IGlzVmFsaWQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAocmVxdWlyZWRQYXJhbWV0ZXJzLmxlbmd0aCAhPSB2YWx1ZXMubGVuZ3RoKSB7XG4gICAgICBzZXRWYWx1ZXNBcnJheShyZXF1aXJlZFBhcmFtZXRlcnMubWFwKCgpID0+ICcnKSk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIHZhbHVlcy5ldmVyeSgodmFsdWUsIGlkeCkgPT5cbiAgICAgICAgdmFsaWRhdGVQYXJhbWV0ZXIodmFsdWUsIHJlcXVpcmVkUGFyYW1ldGVyc1tpZHhdKSxcbiAgICAgIClcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9LCBbcmVxdWlyZWRQYXJhbWV0ZXJzLCB2YWx1ZXNdKTtcbiAgcmV0dXJuIHtpc1ZhbGlkLCB2YWx1ZXMsIHNldFZhbHVlc0FycmF5fTtcbn07XG4iLCAiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIE1ldGEgUGxhdGZvcm1zLCBJbmMuIGFuZCBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmb3JtYXRcbiAqL1xuXG5pbXBvcnQge01vZGFsfSBmcm9tICdhbnRkJztcbi8vIFRPRE86IEZpeCB0aGlzIHRoZSBuZXh0IHRpbWUgdGhlIGZpbGUgaXMgZWRpdGVkLlxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJ1bGVzZGlyL25vLXJlc3RyaWN0ZWQtaW1wb3J0cy1jbG9uZVxuaW1wb3J0IHtCdXR0b24sIEZsZXhDb2x1bW4sIElucHV0LCBzdHlsZWR9IGZyb20gJ2ZsaXBwZXInO1xuaW1wb3J0IFJlYWN0LCB7dXNlU3RhdGV9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7Qm9va21hcmssIFVSSX0gZnJvbSAnLi4vdHlwZXMnO1xuXG50eXBlIFByb3BzID0ge1xuICB1cmk6IHN0cmluZyB8IG51bGw7XG4gIGVkaXQ6IGJvb2xlYW47XG4gIHNob3VsZFNob3c6IGJvb2xlYW47XG4gIG9uSGlkZT86ICgpID0+IHZvaWQ7XG4gIG9uUmVtb3ZlOiAodXJpOiBVUkkpID0+IHZvaWQ7XG4gIG9uU3VibWl0OiAoYm9va21hcms6IEJvb2ttYXJrKSA9PiB2b2lkO1xufTtcblxuY29uc3QgQ29udGFpbmVyID0gc3R5bGVkKEZsZXhDb2x1bW4pKHtcbiAgcGFkZGluZzogMTAsXG4gIHdpZHRoOiA0MDAsXG59KTtcblxuY29uc3QgVGl0bGUgPSBzdHlsZWQuZGl2KHtcbiAgZm9udFdlaWdodDogNTAwLFxuICBtYXJnaW5Ub3A6IDgsXG4gIG1hcmdpbkxlZnQ6IDIsXG4gIG1hcmdpbkJvdHRvbTogOCxcbn0pO1xuXG5jb25zdCBVUklDb250YWluZXIgPSBzdHlsZWQuZGl2KHtcbiAgbWFyZ2luTGVmdDogMixcbiAgbWFyZ2luQm90dG9tOiA4LFxuICBvdmVyZmxvd1dyYXA6ICdicmVhay13b3JkJyxcbn0pO1xuXG5jb25zdCBCdXR0b25Db250YWluZXIgPSBzdHlsZWQuZGl2KHtcbiAgbWFyZ2luTGVmdDogJ2F1dG8nLFxufSk7XG5cbmNvbnN0IE5hbWVJbnB1dCA9IHN0eWxlZChJbnB1dCkoe1xuICBtYXJnaW46IDAsXG4gIG1hcmdpbkJvdHRvbTogMTAsXG4gIGhlaWdodDogMzAsXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIFNhdmVCb29rbWFya0RpYWxvZyhwcm9wczogUHJvcHMpIHtcbiAgY29uc3Qge2VkaXQsIHNob3VsZFNob3csIG9uSGlkZSwgb25SZW1vdmUsIG9uU3VibWl0LCB1cml9ID0gcHJvcHM7XG4gIGNvbnN0IFtjb21tb25OYW1lLCBzZXRDb21tb25OYW1lXSA9IHVzZVN0YXRlKCcnKTtcbiAgaWYgKHVyaSA9PSBudWxsIHx8ICFzaG91bGRTaG93KSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxNb2RhbCBvcGVuIGZvb3Rlcj17bnVsbH0gb25DYW5jZWw9e29uSGlkZX0+XG4gICAgICAgIHsob25IaWRlOiAoKSA9PiB2b2lkKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxDb250YWluZXI+XG4gICAgICAgICAgICAgIDxUaXRsZT5cbiAgICAgICAgICAgICAgICB7ZWRpdCA/ICdFZGl0IGJvb2ttYXJrLi4uJyA6ICdTYXZlIHRvIGJvb2ttYXJrcy4uLid9XG4gICAgICAgICAgICAgIDwvVGl0bGU+XG4gICAgICAgICAgICAgIDxOYW1lSW5wdXRcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIk5hbWUuLi5cIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtjb21tb25OYW1lfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQ6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PlxuICAgICAgICAgICAgICAgICAgc2V0Q29tbW9uTmFtZShldmVudC50YXJnZXQudmFsdWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8VVJJQ29udGFpbmVyPnt1cml9PC9VUklDb250YWluZXI+XG4gICAgICAgICAgICAgIDxCdXR0b25Db250YWluZXI+XG4gICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvbkhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0Q29tbW9uTmFtZSgnJyk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgY29tcGFjdFxuICAgICAgICAgICAgICAgICAgcGFkZGVkPlxuICAgICAgICAgICAgICAgICAgQ2FuY2VsXG4gICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAge2VkaXQgPyAoXG4gICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJkYW5nZXJcIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgb25IaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgb25SZW1vdmUodXJpKTtcbiAgICAgICAgICAgICAgICAgICAgICBzZXRDb21tb25OYW1lKCcnKTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgY29tcGFjdFxuICAgICAgICAgICAgICAgICAgICBwYWRkZWQ+XG4gICAgICAgICAgICAgICAgICAgIFJlbW92ZVxuICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9uSGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICBvblN1Ym1pdCh7dXJpLCBjb21tb25OYW1lfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBjb21wb25lbnQgc3RhdGUgaXMgcmVtZW1iZXJlZCBldmVuIGFmdGVyIHVubW91bnRpbmcuXG4gICAgICAgICAgICAgICAgICAgIC8vIFRodXMgaXQgaXMgbmVjZXNzYXJ5IHRvIHJlc2V0IHRoZSBjb21tb25OYW1lIGhlcmUuXG4gICAgICAgICAgICAgICAgICAgIHNldENvbW1vbk5hbWUoJycpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIGNvbXBhY3RcbiAgICAgICAgICAgICAgICAgIHBhZGRlZD5cbiAgICAgICAgICAgICAgICAgIFNhdmVcbiAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgPC9CdXR0b25Db250YWluZXI+XG4gICAgICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgICAgICApO1xuICAgICAgICB9fVxuICAgICAgPC9Nb2RhbD5cbiAgICApO1xuICB9XG59XG4iLCAiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIE1ldGEgUGxhdGZvcm1zLCBJbmMuIGFuZCBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmb3JtYXRcbiAqL1xuXG4vLyBUT0RPOiBGaXggdGhpcyB0aGUgbmV4dCB0aW1lIHRoZSBmaWxlIGlzIGVkaXRlZC5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBydWxlc2Rpci9uby1yZXN0cmljdGVkLWltcG9ydHMtY2xvbmVcbmltcG9ydCB7c3R5bGVkLCBTZWFyY2hCb3gsIFNlYXJjaElucHV0LCBUb29sYmFyfSBmcm9tICdmbGlwcGVyJztcbmltcG9ydCB7QXV0b0NvbXBsZXRlU2hlZXQsIEljb25CdXR0b24sIEZhdm9yaXRlQnV0dG9ufSBmcm9tICcuLyc7XG5pbXBvcnQge0F1dG9Db21wbGV0ZVByb3ZpZGVyLCBCb29rbWFyaywgVVJJfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcblxudHlwZSBQcm9wcyA9IHtcbiAgb25GYXZvcml0ZTogKHF1ZXJ5OiBVUkkpID0+IHZvaWQ7XG4gIG9uTmF2aWdhdGU6IChxdWVyeTogVVJJKSA9PiB2b2lkO1xuICBib29rbWFya3M6IE1hcDxVUkksIEJvb2ttYXJrPjtcbiAgcHJvdmlkZXJzOiBBcnJheTxBdXRvQ29tcGxldGVQcm92aWRlcj47XG4gIHVyaUZyb21BYm92ZTogVVJJO1xufTtcblxudHlwZSBTdGF0ZSA9IHtcbiAgcXVlcnk6IFVSSTtcbiAgaW5wdXRGb2N1c2VkOiBib29sZWFuO1xuICBhdXRvQ29tcGxldGVTaGVldE9wZW46IGJvb2xlYW47XG4gIHNlYXJjaElucHV0VmFsdWU6IFVSSTtcbiAgcHJldlVSSUZyb21BYm92ZTogVVJJO1xufTtcblxuY29uc3QgSWNvbkNvbnRhaW5lciA9IHN0eWxlZC5kaXYoe1xuICBkaXNwbGF5OiAnaW5saW5lLWZsZXgnLFxuICBoZWlnaHQ6ICcxNnB4JyxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICcnOiB7XG4gICAgbWFyZ2luTGVmdDogMTAsXG4gICAgJy5pY29uLWJ1dHRvbic6IHtcbiAgICAgIGhlaWdodDogMTYsXG4gICAgfSxcbiAgICAnaW1nLGRpdic6IHtcbiAgICAgIHZlcnRpY2FsQWxpZ246ICd0b3AnLFxuICAgICAgYWxpZ25JdGVtczogJ25vbmUnLFxuICAgIH0sXG4gIH0sXG59KTtcblxuY29uc3QgVG9vbGJhckNvbnRhaW5lciA9IHN0eWxlZC5kaXYoe1xuICAnLmRyb3Atc2hhZG93Jzoge1xuICAgIGJveFNoYWRvdzogJzAgMXB4IDNweCByZ2JhKDAsMCwwLDAuMTIpLCAwIDFweCAycHggcmdiYSgwLDAsMCwwLjI0KScsXG4gIH0sXG59KTtcblxuY29uc3QgU2VhcmNoSW5wdXRDb250YWluZXIgPSBzdHlsZWQuZGl2KHtcbiAgd2lkdGg6ICcxMDAlJyxcbiAgbWFyZ2luTGVmdDogNSxcbiAgbWFyZ2luUmlnaHQ6IDksXG4gIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxufSk7XG5cbmV4cG9ydCBjbGFzcyBTZWFyY2hCYXIgZXh0ZW5kcyBDb21wb25lbnQ8UHJvcHMsIFN0YXRlPiB7XG4gIHN0YXRlID0ge1xuICAgIGlucHV0Rm9jdXNlZDogZmFsc2UsXG4gICAgYXV0b0NvbXBsZXRlU2hlZXRPcGVuOiBmYWxzZSxcbiAgICBxdWVyeTogJycsXG4gICAgc2VhcmNoSW5wdXRWYWx1ZTogJycsXG4gICAgcHJldlVSSUZyb21BYm92ZTogJycsXG4gIH07XG5cbiAgZmF2b3JpdGUgPSAoc2VhcmNoSW5wdXRWYWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbkZhdm9yaXRlKHNlYXJjaElucHV0VmFsdWUpO1xuICB9O1xuXG4gIG5hdmlnYXRlVG8gPSAoc2VhcmNoSW5wdXRWYWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7cXVlcnk6IHNlYXJjaElucHV0VmFsdWUsIHNlYXJjaElucHV0VmFsdWV9KTtcbiAgICB0aGlzLnByb3BzLm9uTmF2aWdhdGUoc2VhcmNoSW5wdXRWYWx1ZSk7XG4gIH07XG5cbiAgcXVlcnlJbnB1dENoYW5nZWQgPSAoZXZlbnQ6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7cXVlcnk6IHZhbHVlLCBzZWFyY2hJbnB1dFZhbHVlOiB2YWx1ZX0pO1xuICB9O1xuXG4gIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMgPSAobmV3UHJvcHM6IFByb3BzLCBzdGF0ZTogU3RhdGUpID0+IHtcbiAgICBjb25zdCB7dXJpRnJvbUFib3ZlOiBuZXdVUklGcm9tQWJvdmV9ID0gbmV3UHJvcHM7XG4gICAgY29uc3Qge3ByZXZVUklGcm9tQWJvdmV9ID0gc3RhdGU7XG4gICAgaWYgKG5ld1VSSUZyb21BYm92ZSAhPT0gcHJldlVSSUZyb21BYm92ZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2VhcmNoSW5wdXRWYWx1ZTogbmV3VVJJRnJvbUFib3ZlLFxuICAgICAgICBxdWVyeTogbmV3VVJJRnJvbUFib3ZlLFxuICAgICAgICBwcmV2VVJJRnJvbUFib3ZlOiBuZXdVUklGcm9tQWJvdmUsXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge2Jvb2ttYXJrcywgcHJvdmlkZXJzfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge2F1dG9Db21wbGV0ZVNoZWV0T3BlbiwgaW5wdXRGb2N1c2VkLCBzZWFyY2hJbnB1dFZhbHVlLCBxdWVyeX0gPVxuICAgICAgdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPFRvb2xiYXJDb250YWluZXI+XG4gICAgICAgIDxUb29sYmFyPlxuICAgICAgICAgIDxTZWFyY2hCb3ggY2xhc3NOYW1lPXtpbnB1dEZvY3VzZWQgPyAnZHJvcC1zaGFkb3cnIDogJyd9PlxuICAgICAgICAgICAgPFNlYXJjaElucHV0Q29udGFpbmVyPlxuICAgICAgICAgICAgICA8U2VhcmNoSW5wdXRcbiAgICAgICAgICAgICAgICB2YWx1ZT17c2VhcmNoSW5wdXRWYWx1ZX1cbiAgICAgICAgICAgICAgICBvbkJsdXI9eygpID0+XG4gICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgYXV0b0NvbXBsZXRlU2hlZXRPcGVuOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRGb2N1c2VkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9uRm9jdXM9eyhldmVudDogUmVhY3QuRm9jdXNFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xuICAgICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnNlbGVjdCgpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGF1dG9Db21wbGV0ZVNoZWV0T3BlbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRGb2N1c2VkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5xdWVyeUlucHV0Q2hhbmdlZH1cbiAgICAgICAgICAgICAgICBvbktleVByZXNzPXsoZTogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVUbyh0aGlzLnN0YXRlLnNlYXJjaElucHV0VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkuYmx1cigpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJOYXZpZ2F0ZSBUby4uLlwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIHthdXRvQ29tcGxldGVTaGVldE9wZW4gJiYgcXVlcnkubGVuZ3RoID4gMCA/IChcbiAgICAgICAgICAgICAgICA8QXV0b0NvbXBsZXRlU2hlZXRcbiAgICAgICAgICAgICAgICAgIHByb3ZpZGVycz17cHJvdmlkZXJzfVxuICAgICAgICAgICAgICAgICAgb25OYXZpZ2F0ZT17dGhpcy5uYXZpZ2F0ZVRvfVxuICAgICAgICAgICAgICAgICAgb25IaWdobGlnaHRlZD17KG5ld0lucHV0VmFsdWU6IFVSSSkgPT5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VhcmNoSW5wdXRWYWx1ZTogbmV3SW5wdXRWYWx1ZX0pXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBxdWVyeT17cXVlcnl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICA8L1NlYXJjaElucHV0Q29udGFpbmVyPlxuICAgICAgICAgIDwvU2VhcmNoQm94PlxuICAgICAgICAgIHtzZWFyY2hJbnB1dFZhbHVlLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICA8SWNvbkNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgPEljb25CdXR0b25cbiAgICAgICAgICAgICAgICBpY29uPVwic2VuZFwiXG4gICAgICAgICAgICAgICAgc2l6ZT17MTZ9XG4gICAgICAgICAgICAgICAgb3V0bGluZVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMubmF2aWdhdGVUbyhzZWFyY2hJbnB1dFZhbHVlKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPEZhdm9yaXRlQnV0dG9uXG4gICAgICAgICAgICAgICAgc2l6ZT17MTZ9XG4gICAgICAgICAgICAgICAgaGlnaGxpZ2h0ZWQ9e2Jvb2ttYXJrcy5oYXMoc2VhcmNoSW5wdXRWYWx1ZSl9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5mYXZvcml0ZShzZWFyY2hJbnB1dFZhbHVlKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvSWNvbkNvbnRhaW5lcj5cbiAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPC9Ub29sYmFyPlxuICAgICAgPC9Ub29sYmFyQ29udGFpbmVyPlxuICAgICk7XG4gIH1cbn1cbiIsICIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZvcm1hdFxuICovXG5cbmltcG9ydCB7TmF2aWdhdGlvbkluZm9Cb3h9IGZyb20gJy4vJztcbmltcG9ydCB7Qm9va21hcmssIE5hdmlnYXRpb25FdmVudCwgVVJJfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgUmVhY3QsIHt1c2VSZWZ9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7dGhlbWUsIExheW91dCwgc3R5bGVkfSBmcm9tICdmbGlwcGVyLXBsdWdpbic7XG5cbnR5cGUgUHJvcHMgPSB7XG4gIGJvb2ttYXJrczogTWFwPHN0cmluZywgQm9va21hcms+O1xuICBldmVudHM6IEFycmF5PE5hdmlnYXRpb25FdmVudD47XG4gIG9uTmF2aWdhdGU6ICh1cmk6IFVSSSkgPT4gdm9pZDtcbiAgb25GYXZvcml0ZTogKHVyaTogVVJJKSA9PiB2b2lkO1xufTtcblxuY29uc3QgVGltZWxpbmVMaW5lID0gc3R5bGVkLmRpdih7XG4gIHdpZHRoOiAyLFxuICBiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLnRleHRDb2xvckFjdGl2ZSxcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIHRvcDogMzgsXG4gIGJvdHRvbTogMCxcbn0pO1xuXG5jb25zdCBOYXZpZ2F0aW9uRXZlbnRDb250YWluZXIgPSBzdHlsZWQuZGl2KHtcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICBwYWRkaW5nVG9wOiAyNSxcbiAgcGFkZGluZ0xlZnQ6IDI1LFxuICBtYXJnaW5SaWdodDogMjUsXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIFRpbWVsaW5lKHByb3BzOiBQcm9wcykge1xuICBjb25zdCB7Ym9va21hcmtzLCBldmVudHMsIG9uTmF2aWdhdGUsIG9uRmF2b3JpdGV9ID0gcHJvcHM7XG4gIGNvbnN0IHRpbWVsaW5lUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcbiAgcmV0dXJuIGV2ZW50cy5sZW5ndGggPT09IDAgPyAoXG4gICAgPExheW91dC5Db250YWluZXJcbiAgICAgIGNlbnRlclxuICAgICAgZ3Jvd1xuICAgICAgc3R5bGU9e3tcbiAgICAgICAgZm9udFNpemU6IDE4LFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmJhY2tncm91bmRXYXNoLFxuICAgICAgICBjb2xvcjogdGhlbWUudGV4dENvbG9yU2Vjb25kYXJ5LFxuICAgICAgfX0+XG4gICAgICBObyBOYXZpZ2F0aW9uIEV2ZW50cyB0byBTaG93XG4gICAgPC9MYXlvdXQuQ29udGFpbmVyPlxuICApIDogKFxuICAgIDxMYXlvdXQuU2Nyb2xsQ29udGFpbmVyIHJlZj17dGltZWxpbmVSZWZ9PlxuICAgICAgPExheW91dC5Db250YWluZXIgZ3JvdyBzdHlsZT17e3BhZGRpbmdCb3R0b206IDI1LCBwYWRkaW5nTGVmdDogMjV9fT5cbiAgICAgICAgPFRpbWVsaW5lTGluZSAvPlxuICAgICAgICB7ZXZlbnRzLm1hcCgoZXZlbnQ6IE5hdmlnYXRpb25FdmVudCwgaWR4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPE5hdmlnYXRpb25FdmVudENvbnRhaW5lciBrZXk9e2lkeH0+XG4gICAgICAgICAgICAgIDxOYXZpZ2F0aW9uSW5mb0JveFxuICAgICAgICAgICAgICAgIGlzQm9va21hcmtlZD17XG4gICAgICAgICAgICAgICAgICBldmVudC51cmkgIT0gbnVsbCA/IGJvb2ttYXJrcy5oYXMoZXZlbnQudXJpKSA6IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17ZXZlbnQuY2xhc3NOYW1lfVxuICAgICAgICAgICAgICAgIHVyaT17ZXZlbnQudXJpfVxuICAgICAgICAgICAgICAgIG9uTmF2aWdhdGU9eyh1cmkpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmICh0aW1lbGluZVJlZi5jdXJyZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGltZWxpbmVSZWYuY3VycmVudC5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIG9uTmF2aWdhdGUodXJpKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIG9uRmF2b3JpdGU9e29uRmF2b3JpdGV9XG4gICAgICAgICAgICAgICAgc2NyZWVuc2hvdD17ZXZlbnQuc2NyZWVuc2hvdH1cbiAgICAgICAgICAgICAgICBkYXRlPXtldmVudC5kYXRlfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9OYXZpZ2F0aW9uRXZlbnRDb250YWluZXI+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSl9XG4gICAgICA8L0xheW91dC5Db250YWluZXI+XG4gICAgPC9MYXlvdXQuU2Nyb2xsQ29udGFpbmVyPlxuICApO1xufVxuIiwgIi8qKlxuICogQ29weXJpZ2h0IChjKSBNZXRhIFBsYXRmb3JtcywgSW5jLiBhbmQgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZm9ybWF0XG4gKi9cblxuaW1wb3J0IHtCb29rbWFya30gZnJvbSAnLi4vdHlwZXMnO1xuXG5jb25zdCBGTElQUEVSX05BVklHQVRJT05fUExVR0lOX0RCID0gJ2ZsaXBwZXJfbmF2aWdhdGlvbl9wbHVnaW5fZGInO1xuY29uc3QgRkxJUFBFUl9OQVZJR0FUSU9OX1BMVUdJTl9EQl9WRVJTSU9OID0gMTtcblxuY29uc3QgQk9PS01BUktTX0tFWSA9ICdib29rbWFya3MnO1xuXG5jb25zdCBjcmVhdGVCb29rbWFya3NPYmplY3RTdG9yZSA9IChkYjogSURCRGF0YWJhc2UpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBpZiAoIWRiLm9iamVjdFN0b3JlTmFtZXMuY29udGFpbnMoQk9PS01BUktTX0tFWSkpIHtcbiAgICAgIGNvbnN0IGJvb2ttYXJrc09iamVjdFN0b3JlID0gZGIuY3JlYXRlT2JqZWN0U3RvcmUoQk9PS01BUktTX0tFWSwge1xuICAgICAgICBrZXlQYXRoOiAndXJpJyxcbiAgICAgIH0pO1xuICAgICAgYm9va21hcmtzT2JqZWN0U3RvcmUudHJhbnNhY3Rpb24ub25jb21wbGV0ZSA9ICgpID0+IHJlc29sdmUoKTtcbiAgICAgIGJvb2ttYXJrc09iamVjdFN0b3JlLnRyYW5zYWN0aW9uLm9uZXJyb3IgPSAoKSA9PlxuICAgICAgICByZWplY3QoYm9va21hcmtzT2JqZWN0U3RvcmUudHJhbnNhY3Rpb24uZXJyb3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IGluaXRpYWxpemVOYXZpZ2F0aW9uUGx1Z2luREIgPSAoZGI6IElEQkRhdGFiYXNlKSA9PiB7XG4gIHJldHVybiBQcm9taXNlLmFsbChbY3JlYXRlQm9va21hcmtzT2JqZWN0U3RvcmUoZGIpXSk7XG59O1xuXG5jb25zdCBvcGVuTmF2aWdhdGlvblBsdWdpbkRCOiAoKSA9PiBQcm9taXNlPElEQkRhdGFiYXNlPiA9ICgpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBvcGVuUmVxdWVzdCA9IHdpbmRvdy5pbmRleGVkREIub3BlbihcbiAgICAgIEZMSVBQRVJfTkFWSUdBVElPTl9QTFVHSU5fREIsXG4gICAgICBGTElQUEVSX05BVklHQVRJT05fUExVR0lOX0RCX1ZFUlNJT04sXG4gICAgKTtcbiAgICBvcGVuUmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSAoKSA9PiB7XG4gICAgICBjb25zdCBkYiA9IG9wZW5SZXF1ZXN0LnJlc3VsdDtcbiAgICAgIGluaXRpYWxpemVOYXZpZ2F0aW9uUGx1Z2luREIoZGIpXG4gICAgICAgIC50aGVuKCgpID0+IHJlc29sdmUoZGIpKVxuICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICB9O1xuICAgIG9wZW5SZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiByZWplY3Qob3BlblJlcXVlc3QuZXJyb3IpO1xuICAgIG9wZW5SZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHJlc29sdmUob3BlblJlcXVlc3QucmVzdWx0KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgd3JpdGVCb29rbWFya1RvREIgPSAoYm9va21hcms6IEJvb2ttYXJrKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgb3Blbk5hdmlnYXRpb25QbHVnaW5EQigpXG4gICAgICAudGhlbigoZGI6IElEQkRhdGFiYXNlKSA9PiB7XG4gICAgICAgIGNvbnN0IGJvb2ttYXJrc09iamVjdFN0b3JlID0gZGJcbiAgICAgICAgICAudHJhbnNhY3Rpb24oQk9PS01BUktTX0tFWSwgJ3JlYWR3cml0ZScpXG4gICAgICAgICAgLm9iamVjdFN0b3JlKEJPT0tNQVJLU19LRVkpO1xuICAgICAgICBjb25zdCByZXF1ZXN0ID0gYm9va21hcmtzT2JqZWN0U3RvcmUucHV0KGJvb2ttYXJrKTtcbiAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiByZXNvbHZlKCk7XG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9ICgpID0+IHJlamVjdChyZXF1ZXN0LmVycm9yKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVhZEJvb2ttYXJrc0Zyb21EQjogKCkgPT4gUHJvbWlzZTxNYXA8c3RyaW5nLCBCb29rbWFyaz4+ID0gKCkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGJvb2ttYXJrcyA9IG5ldyBNYXAoKTtcbiAgICBvcGVuTmF2aWdhdGlvblBsdWdpbkRCKClcbiAgICAgIC50aGVuKChkYjogSURCRGF0YWJhc2UpID0+IHtcbiAgICAgICAgY29uc3QgYm9va21hcmtzT2JqZWN0U3RvcmUgPSBkYlxuICAgICAgICAgIC50cmFuc2FjdGlvbihCT09LTUFSS1NfS0VZKVxuICAgICAgICAgIC5vYmplY3RTdG9yZShCT09LTUFSS1NfS0VZKTtcbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IGJvb2ttYXJrc09iamVjdFN0b3JlLm9wZW5DdXJzb3IoKTtcbiAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gcmVxdWVzdC5yZXN1bHQ7XG4gICAgICAgICAgaWYgKGN1cnNvcikge1xuICAgICAgICAgICAgY29uc3QgYm9va21hcmsgPSBjdXJzb3IudmFsdWU7XG4gICAgICAgICAgICBib29rbWFya3Muc2V0KGJvb2ttYXJrLnVyaSwgYm9va21hcmspO1xuICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUoYm9va21hcmtzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9ICgpID0+IHJlamVjdChyZXF1ZXN0LmVycm9yKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlQm9va21hcmtGcm9tREI6ICh1cmk6IHN0cmluZykgPT4gUHJvbWlzZTx2b2lkPiA9ICh1cmkpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBvcGVuTmF2aWdhdGlvblBsdWdpbkRCKClcbiAgICAgIC50aGVuKChkYjogSURCRGF0YWJhc2UpID0+IHtcbiAgICAgICAgY29uc3QgYm9va21hcmtzT2JqZWN0U3RvcmUgPSBkYlxuICAgICAgICAgIC50cmFuc2FjdGlvbihCT09LTUFSS1NfS0VZLCAncmVhZHdyaXRlJylcbiAgICAgICAgICAub2JqZWN0U3RvcmUoQk9PS01BUktTX0tFWSk7XG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSBib29rbWFya3NPYmplY3RTdG9yZS5kZWxldGUodXJpKTtcbiAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiByZXNvbHZlKCk7XG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9ICgpID0+IHJlamVjdChyZXF1ZXN0LmVycm9yKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgfSk7XG59O1xuIiwgIi8qKlxuICogQ29weXJpZ2h0IChjKSBNZXRhIFBsYXRmb3JtcywgSW5jLiBhbmQgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZm9ybWF0XG4gKi9cblxuaW1wb3J0IHtwYXRofSBmcm9tICdmbGlwcGVyLXBsdWdpbic7XG5pbXBvcnQge0FwcE1hdGNoUGF0dGVybn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHtEZXZpY2UsIGdldEZsaXBwZXJMaWJ9IGZyb20gJ2ZsaXBwZXItcGx1Z2luJztcblxuY29uc3QgZXh0cmFjdEFwcE5hbWVGcm9tU2VsZWN0ZWRBcHAgPSAoc2VsZWN0ZWRBcHA6IHN0cmluZyB8IG51bGwpID0+IHtcbiAgaWYgKHNlbGVjdGVkQXBwID09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc2VsZWN0ZWRBcHAuc3BsaXQoJyMnKVswXTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldEFwcE1hdGNoUGF0dGVybnMgPSAoXG4gIHNlbGVjdGVkQXBwOiBzdHJpbmcgfCBudWxsLFxuICBkZXZpY2U6IERldmljZSxcbikgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2U8QXJyYXk8QXBwTWF0Y2hQYXR0ZXJuPj4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGFwcE5hbWUgPSBleHRyYWN0QXBwTmFtZUZyb21TZWxlY3RlZEFwcChzZWxlY3RlZEFwcCk7XG4gICAgaWYgKGFwcE5hbWUgPT09ICdGYWNlYm9vaycpIHtcbiAgICAgIGxldCBmaWxlbmFtZTogc3RyaW5nO1xuICAgICAgaWYgKGRldmljZS5vcyA9PT0gJ0FuZHJvaWQnKSB7XG4gICAgICAgIGZpbGVuYW1lID0gJ2ZhY2Vib29rLW1hdGNoLXBhdHRlcm5zLWFuZHJvaWQuanNvbic7XG4gICAgICB9IGVsc2UgaWYgKGRldmljZS5vcyA9PT0gJ2lPUycpIHtcbiAgICAgICAgZmlsZW5hbWUgPSAnZmFjZWJvb2stbWF0Y2gtcGF0dGVybnMtaW9zLmpzb24nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgcGF0dGVybnNGaWxlUGF0aCA9IHBhdGguam9pbihcbiAgICAgICAgZ2V0RmxpcHBlckxpYigpLnBhdGhzLnN0YXRpY1BhdGgsXG4gICAgICAgICdmYWNlYm9vaycsXG4gICAgICAgIGZpbGVuYW1lLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHBhdHRlcm5zRmlsZUNvbnRlbnRTdHJpbmcgPVxuICAgICAgICBhd2FpdCBnZXRGbGlwcGVyTGliKCkucmVtb3RlU2VydmVyQ29udGV4dC5mcy5yZWFkRmlsZShwYXR0ZXJuc0ZpbGVQYXRoKTtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKHBhdHRlcm5zRmlsZUNvbnRlbnRTdHJpbmcpO1xuICAgIH0gZWxzZSBpZiAoYXBwTmFtZSAhPSBudWxsKSB7XG4gICAgICBjb25zb2xlLmxvZyhgTm8gcnVsZSBmb3IgYXBwICR7YXBwTmFtZX1gKTtcbiAgICAgIHJlc29sdmUoW10pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWplY3QobmV3IEVycm9yKCdzZWxlY3RlZEFwcCB3YXMgbnVsbCcpKTtcbiAgICB9XG4gIH0pO1xufTtcbiIsICIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZvcm1hdFxuICogQGZsb3cgc3RyaWN0LWxvY2FsXG4gKi9cblxuaW1wb3J0IHtSZXF1aXJlZFBhcmFtZXRlcnNEaWFsb2d9IGZyb20gJy4vY29tcG9uZW50cyc7XG5pbXBvcnQge1xuICByZW1vdmVCb29rbWFya0Zyb21EQixcbiAgcmVhZEJvb2ttYXJrc0Zyb21EQixcbiAgd3JpdGVCb29rbWFya1RvREIsXG59IGZyb20gJy4vdXRpbC9pbmRleGVkREInO1xuaW1wb3J0IHt9IGZyb20gJy4vdXRpbC9hdXRvQ29tcGxldGVQcm92aWRlcic7XG5pbXBvcnQge2dldEFwcE1hdGNoUGF0dGVybnN9IGZyb20gJy4vdXRpbC9hcHBNYXRjaFBhdHRlcm5zJztcbmltcG9ydCB7Z2V0UmVxdWlyZWRQYXJhbWV0ZXJzLCBmaWx0ZXJPcHRpb25hbFBhcmFtZXRlcnN9IGZyb20gJy4vdXRpbC91cmknO1xuaW1wb3J0IHtcbiAgQm9va21hcmssXG4gIE5hdmlnYXRpb25FdmVudCxcbiAgQXBwTWF0Y2hQYXR0ZXJuLFxuICBVUkksXG4gIFJhd05hdmlnYXRpb25FdmVudCxcbn0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtQbHVnaW5DbGllbnQsIGNyZWF0ZVN0YXRlLCByZW5kZXJSZWFjdFJvb3R9IGZyb20gJ2ZsaXBwZXItcGx1Z2luJztcblxuZXhwb3J0IHR5cGUgU3RhdGUgPSB7XG4gIHNob3VsZFNob3dTYXZlQm9va21hcmtEaWFsb2c6IGJvb2xlYW47XG4gIHNob3VsZFNob3dVUklFcnJvckRpYWxvZzogYm9vbGVhbjtcbiAgc2F2ZUJvb2ttYXJrVVJJOiBVUkkgfCBudWxsO1xuICByZXF1aXJlZFBhcmFtZXRlcnM6IEFycmF5PHN0cmluZz47XG59O1xuXG50eXBlIEV2ZW50cyA9IHtcbiAgbmF2X2V2ZW50OiBSYXdOYXZpZ2F0aW9uRXZlbnQ7XG59O1xuXG50eXBlIE1ldGhvZHMgPSB7XG4gIG5hdmlnYXRlX3RvKHBhcmFtczoge3VybDogc3RyaW5nfSk6IFByb21pc2U8dm9pZD47XG59O1xuXG5leHBvcnQgdHlwZSBOYXZpZ2F0aW9uUGx1Z2luID0gUmV0dXJuVHlwZTx0eXBlb2YgcGx1Z2luPjtcblxuZXhwb3J0IGZ1bmN0aW9uIHBsdWdpbihjbGllbnQ6IFBsdWdpbkNsaWVudDxFdmVudHMsIE1ldGhvZHM+KSB7XG4gIGNvbnN0IGJvb2ttYXJrcyA9IGNyZWF0ZVN0YXRlKG5ldyBNYXA8VVJJLCBCb29rbWFyaz4oKSwge1xuICAgIHBlcnNpc3Q6ICdib29rbWFya3MnLFxuICB9KTtcbiAgY29uc3QgbmF2aWdhdGlvbkV2ZW50cyA9IGNyZWF0ZVN0YXRlPE5hdmlnYXRpb25FdmVudFtdPihbXSwge1xuICAgIHBlcnNpc3Q6ICduYXZpZ2F0aW9uRXZlbnRzJyxcbiAgfSk7XG4gIGNvbnN0IGFwcE1hdGNoUGF0dGVybnMgPSBjcmVhdGVTdGF0ZTxBcHBNYXRjaFBhdHRlcm5bXT4oW10sIHtcbiAgICBwZXJzaXN0OiAnYXBwTWF0Y2hQYXR0ZXJucycsXG4gIH0pO1xuICBjb25zdCBjdXJyZW50VVJJID0gY3JlYXRlU3RhdGUoJycpO1xuICBjb25zdCBzaG91bGRTaG93U2F2ZUJvb2ttYXJrRGlhbG9nID0gY3JlYXRlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBzYXZlQm9va21hcmtVUkkgPSBjcmVhdGVTdGF0ZTxudWxsIHwgc3RyaW5nPihudWxsKTtcblxuICBjbGllbnQub25NZXNzYWdlKCduYXZfZXZlbnQnLCBhc3luYyAocGF5bG9hZCkgPT4ge1xuICAgIGNvbnN0IG5hdmlnYXRpb25FdmVudDogTmF2aWdhdGlvbkV2ZW50ID0ge1xuICAgICAgdXJpOiBwYXlsb2FkLnVyaSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGRlY29kZVVSSUNvbXBvbmVudChwYXlsb2FkLnVyaSksXG4gICAgICBkYXRlOiBwYXlsb2FkLmRhdGUgPyBuZXcgRGF0ZShwYXlsb2FkLmRhdGUpIDogbmV3IERhdGUoKSxcbiAgICAgIGNsYXNzTmFtZTogcGF5bG9hZC5jbGFzcyA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IHBheWxvYWQuY2xhc3MsXG4gICAgICBzY3JlZW5zaG90OiBudWxsLFxuICAgIH07XG5cbiAgICBpZiAobmF2aWdhdGlvbkV2ZW50LnVyaSkgY3VycmVudFVSSS5zZXQobmF2aWdhdGlvbkV2ZW50LnVyaSk7XG5cbiAgICBuYXZpZ2F0aW9uRXZlbnRzLnVwZGF0ZSgoZHJhZnQpID0+IHtcbiAgICAgIGRyYWZ0LnVuc2hpZnQobmF2aWdhdGlvbkV2ZW50KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHNjcmVlbnNob3QgPSBhd2FpdCBjbGllbnQuZGV2aWNlLnNjcmVlbnNob3QoKTtcbiAgICBpZiAoIXNjcmVlbnNob3QpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ1tuYXZpZ2F0aW9uXSBDb3VsZCBub3QgcmV0cmlldmUgdmFsaWQgc2NyZWVuc2hvdCBmcm9tIHRoZSBkZXZpY2UuJyxcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGJsb2JVUkwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtzY3JlZW5zaG90LmJ1ZmZlcl0pKTtcbiAgICAvLyB0aGlzIHByb2Nlc3MgaXMgYXN5bmMsIG1ha2Ugc3VyZSB3ZSB1cGRhdGUgdGhlIGNvcnJlY3Qgb25lLi5cbiAgICBjb25zdCBuYXZpZ2F0aW9uRXZlbnRJbmRleCA9IG5hdmlnYXRpb25FdmVudHNcbiAgICAgIC5nZXQoKVxuICAgICAgLmluZGV4T2YobmF2aWdhdGlvbkV2ZW50KTtcbiAgICBpZiAobmF2aWdhdGlvbkV2ZW50SW5kZXggIT09IC0xKSB7XG4gICAgICBuYXZpZ2F0aW9uRXZlbnRzLnVwZGF0ZSgoZHJhZnQpID0+IHtcbiAgICAgICAgZHJhZnRbbmF2aWdhdGlvbkV2ZW50SW5kZXhdLnNjcmVlbnNob3QgPSBibG9iVVJMO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxuICBnZXRBcHBNYXRjaFBhdHRlcm5zKGNsaWVudC5hcHBJZCwgY2xpZW50LmRldmljZSlcbiAgICAudGhlbigocGF0dGVybnMpID0+IHtcbiAgICAgIGFwcE1hdGNoUGF0dGVybnMuc2V0KHBhdHRlcm5zKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcignW05hdmlnYXRpb25dIEZhaWxlZCB0byBmaW5kIGFwcE1hdGNoUGF0dGVybnMnLCBlKTtcbiAgICB9KTtcblxuICByZWFkQm9va21hcmtzRnJvbURCKClcbiAgICAudGhlbigoYm9va21hcmtzRGF0YSkgPT4ge1xuICAgICAgYm9va21hcmtzLnNldChib29rbWFya3NEYXRhKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZSkgPT4gY29uc29sZS5lcnJvcignW25hdmlnYXRpb25dIHJlYWRCb29rbWFya3NGcm9tREIgZmFpbGVkOicsIGUpKTtcblxuICBmdW5jdGlvbiBuYXZpZ2F0ZVRvKHF1ZXJ5OiBzdHJpbmcpIHtcbiAgICBjb25zdCBmaWx0ZXJlZFF1ZXJ5ID0gZmlsdGVyT3B0aW9uYWxQYXJhbWV0ZXJzKHF1ZXJ5KTtcbiAgICBjdXJyZW50VVJJLnNldChmaWx0ZXJlZFF1ZXJ5KTtcbiAgICBjb25zdCBwYXJhbXMgPSBnZXRSZXF1aXJlZFBhcmFtZXRlcnMoZmlsdGVyZWRRdWVyeSk7XG4gICAgaWYgKHBhcmFtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGlmIChjbGllbnQuYXBwTmFtZSA9PT0gJ0ZhY2Vib29rJyAmJiBjbGllbnQuZGV2aWNlLm9zID09PSAnaU9TJykge1xuICAgICAgICAvLyB1c2UgY3VzdG9tIG5hdmlnYXRlX3RvIGV2ZW50IGZvciBXaWxkZVxuICAgICAgICBjbGllbnQuc2VuZCgnbmF2aWdhdGVfdG8nLCB7XG4gICAgICAgICAgdXJsOiBmaWx0ZXJPcHRpb25hbFBhcmFtZXRlcnMoZmlsdGVyZWRRdWVyeSksXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xpZW50LmRldmljZS5uYXZpZ2F0ZVRvTG9jYXRpb24oXG4gICAgICAgICAgZmlsdGVyT3B0aW9uYWxQYXJhbWV0ZXJzKGZpbHRlcmVkUXVlcnkpLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZW5kZXJSZWFjdFJvb3QoKHVubW91bnQpID0+IChcbiAgICAgICAgPFJlcXVpcmVkUGFyYW1ldGVyc0RpYWxvZ1xuICAgICAgICAgIG9uSGlkZT17dW5tb3VudH1cbiAgICAgICAgICB1cmk9e2ZpbHRlcmVkUXVlcnl9XG4gICAgICAgICAgcmVxdWlyZWRQYXJhbWV0ZXJzPXtwYXJhbXN9XG4gICAgICAgICAgb25TdWJtaXQ9e25hdmlnYXRlVG99XG4gICAgICAgIC8+XG4gICAgICApKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkZhdm9yaXRlKHVyaTogc3RyaW5nKSB7XG4gICAgc2hvdWxkU2hvd1NhdmVCb29rbWFya0RpYWxvZy5zZXQodHJ1ZSk7XG4gICAgc2F2ZUJvb2ttYXJrVVJJLnNldCh1cmkpO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkQm9va21hcmsoYm9va21hcms6IEJvb2ttYXJrKSB7XG4gICAgY29uc3QgbmV3Qm9va21hcmsgPSB7XG4gICAgICB1cmk6IGJvb2ttYXJrLnVyaSxcbiAgICAgIGNvbW1vbk5hbWU6IGJvb2ttYXJrLmNvbW1vbk5hbWUsXG4gICAgfTtcblxuICAgIGJvb2ttYXJrcy51cGRhdGUoKGRyYWZ0KSA9PiB7XG4gICAgICBkcmFmdC5zZXQobmV3Qm9va21hcmsudXJpLCBuZXdCb29rbWFyayk7XG4gICAgfSk7XG4gICAgd3JpdGVCb29rbWFya1RvREIobmV3Qm9va21hcmspO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlQm9va21hcmsodXJpOiBzdHJpbmcpIHtcbiAgICBib29rbWFya3MudXBkYXRlKChkcmFmdCkgPT4ge1xuICAgICAgZHJhZnQuZGVsZXRlKHVyaSk7XG4gICAgfSk7XG4gICAgcmVtb3ZlQm9va21hcmtGcm9tREIodXJpKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbmF2aWdhdGVUbyxcbiAgICBvbkZhdm9yaXRlLFxuICAgIGFkZEJvb2ttYXJrLFxuICAgIHJlbW92ZUJvb2ttYXJrLFxuICAgIGJvb2ttYXJrcyxcbiAgICBzYXZlQm9va21hcmtVUkksXG4gICAgc2hvdWxkU2hvd1NhdmVCb29rbWFya0RpYWxvZyxcbiAgICBhcHBNYXRjaFBhdHRlcm5zLFxuICAgIG5hdmlnYXRpb25FdmVudHMsXG4gICAgY3VycmVudFVSSSxcbiAgICBnZXRBdXRvQ29tcGxldGVBcHBNYXRjaFBhdHRlcm5zKFxuICAgICAgcXVlcnk6IHN0cmluZyxcbiAgICAgIGJvb2ttYXJrczogTWFwPHN0cmluZywgQm9va21hcms+LFxuICAgICAgYXBwTWF0Y2hQYXR0ZXJuczogQXBwTWF0Y2hQYXR0ZXJuW10sXG4gICAgICBsaW1pdDogbnVtYmVyLFxuICAgICk6IEFwcE1hdGNoUGF0dGVybltdIHtcbiAgICAgIGNvbnN0IHEgPSBxdWVyeS50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3QgcmVzdWx0czogQXBwTWF0Y2hQYXR0ZXJuW10gPSBbXTtcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBhcHBNYXRjaFBhdHRlcm5zKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhYm9va21hcmtzLmhhcyhpdGVtLnBhdHRlcm4pICYmXG4gICAgICAgICAgKGl0ZW0uY2xhc3NOYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSkgfHxcbiAgICAgICAgICAgIGl0ZW0ucGF0dGVybi50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHEpKVxuICAgICAgICApIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2goaXRlbSk7XG4gICAgICAgICAgaWYgKC0tbGltaXQgPCAxKSBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSxcbiAgfTtcbn1cbiIsICIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZvcm1hdFxuICogQGZsb3cgc3RyaWN0LWxvY2FsXG4gKi9cblxuaW1wb3J0IHtcbiAgQm9va21hcmtzU2lkZWJhcixcbiAgU2F2ZUJvb2ttYXJrRGlhbG9nLFxuICBTZWFyY2hCYXIsXG4gIFRpbWVsaW5lLFxufSBmcm9tICcuL2NvbXBvbmVudHMnO1xuaW1wb3J0IHtcbiAgYXBwTWF0Y2hQYXR0ZXJuc1RvQXV0b0NvbXBsZXRlUHJvdmlkZXIsXG4gIGJvb2ttYXJrc1RvQXV0b0NvbXBsZXRlUHJvdmlkZXIsXG59IGZyb20gJy4vdXRpbC9hdXRvQ29tcGxldGVQcm92aWRlcic7XG5pbXBvcnQgUmVhY3QsIHt1c2VNZW1vfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge3VzZVZhbHVlLCB1c2VQbHVnaW4sIExheW91dH0gZnJvbSAnZmxpcHBlci1wbHVnaW4nO1xuaW1wb3J0IHtwbHVnaW59IGZyb20gJy4vcGx1Z2luJztcblxuZXhwb3J0IGZ1bmN0aW9uIENvbXBvbmVudCgpIHtcbiAgY29uc3QgaW5zdGFuY2UgPSB1c2VQbHVnaW4ocGx1Z2luKTtcbiAgY29uc3QgYm9va21hcmtzID0gdXNlVmFsdWUoaW5zdGFuY2UuYm9va21hcmtzKTtcbiAgY29uc3QgYXBwTWF0Y2hQYXR0ZXJucyA9IHVzZVZhbHVlKGluc3RhbmNlLmFwcE1hdGNoUGF0dGVybnMpO1xuICBjb25zdCBzYXZlQm9va21hcmtVUkkgPSB1c2VWYWx1ZShpbnN0YW5jZS5zYXZlQm9va21hcmtVUkkpO1xuICBjb25zdCBzaG91bGRTaG93U2F2ZUJvb2ttYXJrRGlhbG9nID0gdXNlVmFsdWUoXG4gICAgaW5zdGFuY2Uuc2hvdWxkU2hvd1NhdmVCb29rbWFya0RpYWxvZyxcbiAgKTtcbiAgY29uc3QgY3VycmVudFVSSSA9IHVzZVZhbHVlKGluc3RhbmNlLmN1cnJlbnRVUkkpO1xuICBjb25zdCBuYXZpZ2F0aW9uRXZlbnRzID0gdXNlVmFsdWUoaW5zdGFuY2UubmF2aWdhdGlvbkV2ZW50cyk7XG5cbiAgY29uc3QgYXV0b0NvbXBsZXRlUHJvdmlkZXJzID0gdXNlTWVtbyhcbiAgICAoKSA9PiBbXG4gICAgICBib29rbWFya3NUb0F1dG9Db21wbGV0ZVByb3ZpZGVyKGJvb2ttYXJrcyksXG4gICAgICBhcHBNYXRjaFBhdHRlcm5zVG9BdXRvQ29tcGxldGVQcm92aWRlcihhcHBNYXRjaFBhdHRlcm5zKSxcbiAgICBdLFxuICAgIFtib29rbWFya3MsIGFwcE1hdGNoUGF0dGVybnNdLFxuICApO1xuICByZXR1cm4gKFxuICAgIDxMYXlvdXQuQ29udGFpbmVyIGdyb3c+XG4gICAgICA8U2VhcmNoQmFyXG4gICAgICAgIHByb3ZpZGVycz17YXV0b0NvbXBsZXRlUHJvdmlkZXJzfVxuICAgICAgICBib29rbWFya3M9e2Jvb2ttYXJrc31cbiAgICAgICAgb25OYXZpZ2F0ZT17aW5zdGFuY2UubmF2aWdhdGVUb31cbiAgICAgICAgb25GYXZvcml0ZT17aW5zdGFuY2Uub25GYXZvcml0ZX1cbiAgICAgICAgdXJpRnJvbUFib3ZlPXtjdXJyZW50VVJJfVxuICAgICAgLz5cbiAgICAgIDxUaW1lbGluZVxuICAgICAgICBib29rbWFya3M9e2Jvb2ttYXJrc31cbiAgICAgICAgZXZlbnRzPXtuYXZpZ2F0aW9uRXZlbnRzfVxuICAgICAgICBvbk5hdmlnYXRlPXtpbnN0YW5jZS5uYXZpZ2F0ZVRvfVxuICAgICAgICBvbkZhdm9yaXRlPXtpbnN0YW5jZS5vbkZhdm9yaXRlfVxuICAgICAgLz5cbiAgICAgIDxCb29rbWFya3NTaWRlYmFyXG4gICAgICAgIGJvb2ttYXJrcz17Ym9va21hcmtzfVxuICAgICAgICBvblJlbW92ZT17aW5zdGFuY2UucmVtb3ZlQm9va21hcmt9XG4gICAgICAgIG9uTmF2aWdhdGU9e2luc3RhbmNlLm5hdmlnYXRlVG99XG4gICAgICAvPlxuICAgICAgPFNhdmVCb29rbWFya0RpYWxvZ1xuICAgICAgICBzaG91bGRTaG93PXtzaG91bGRTaG93U2F2ZUJvb2ttYXJrRGlhbG9nfVxuICAgICAgICB1cmk9e3NhdmVCb29rbWFya1VSSX1cbiAgICAgICAgb25IaWRlPXsoKSA9PiB7XG4gICAgICAgICAgaW5zdGFuY2Uuc2hvdWxkU2hvd1NhdmVCb29rbWFya0RpYWxvZy5zZXQoZmFsc2UpO1xuICAgICAgICB9fVxuICAgICAgICBlZGl0PXtzYXZlQm9va21hcmtVUkkgIT0gbnVsbCA/IGJvb2ttYXJrcy5oYXMoc2F2ZUJvb2ttYXJrVVJJKSA6IGZhbHNlfVxuICAgICAgICBvblN1Ym1pdD17aW5zdGFuY2UuYWRkQm9va21hcmt9XG4gICAgICAgIG9uUmVtb3ZlPXtpbnN0YW5jZS5yZW1vdmVCb29rbWFya31cbiAgICAgIC8+XG4gICAgPC9MYXlvdXQuQ29udGFpbmVyPlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7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QUVKOyIsCiAgIm5hbWVzIjogWyJDb21wb25lbnQiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9mbGlwcGVyIiwgImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJpbXBvcnRfZmxpcHBlciIsICJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAiaW1wb3J0X2ZsaXBwZXIiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9mbGlwcGVyIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfZmxpcHBlcl9wbHVnaW4iLCAiTm9EYXRhIiwgIlJlYWN0IiwgImltcG9ydF9mbGlwcGVyX3BsdWdpbiIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9hbnRkIiwgImltcG9ydF9mbGlwcGVyIiwgImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJvbkhpZGUiLCAiaW1wb3J0X2ZsaXBwZXIiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfZmxpcHBlcl9wbHVnaW4iLCAiUmVhY3QiLCAiaW1wb3J0X2ZsaXBwZXJfcGx1Z2luIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfZmxpcHBlcl9wbHVnaW4iLCAiUmVhY3QiLCAiYm9va21hcmtzIiwgImFwcE1hdGNoUGF0dGVybnMiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9mbGlwcGVyX3BsdWdpbiIsICJDb21wb25lbnQiLCAiUmVhY3QiXQp9Cg==
