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

// plugins/public/node_modules/dateformat/lib/dateformat.js
var require_dateformat = __commonJS({
  "plugins/public/node_modules/dateformat/lib/dateformat.js"(exports, module2) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    (function(global2) {
      var _arguments = arguments;
      var dateFormat2 = function() {
        var token = /d{1,4}|D{3,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|W{1,2}|[LlopSZN]|"[^"]*"|'[^']*'/g;
        var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
        var timezoneClip = /[^-+\dA-Z]/g;
        return function(date, mask, utc, gmt) {
          if (_arguments.length === 1 && kindOf(date) === "string" && !/\d/.test(date)) {
            mask = date;
            date = void 0;
          }
          date = date || date === 0 ? date : new Date();
          if (!(date instanceof Date)) {
            date = new Date(date);
          }
          if (isNaN(date)) {
            throw TypeError("Invalid date");
          }
          mask = String(dateFormat2.masks[mask] || mask || dateFormat2.masks["default"]);
          var maskSlice = mask.slice(0, 4);
          if (maskSlice === "UTC:" || maskSlice === "GMT:") {
            mask = mask.slice(4);
            utc = true;
            if (maskSlice === "GMT:") {
              gmt = true;
            }
          }
          var _ = function _2() {
            return utc ? "getUTC" : "get";
          };
          var _d = function d() {
            return date[_() + "Date"]();
          };
          var D = function D2() {
            return date[_() + "Day"]();
          };
          var _m = function m() {
            return date[_() + "Month"]();
          };
          var y = function y2() {
            return date[_() + "FullYear"]();
          };
          var _H = function H() {
            return date[_() + "Hours"]();
          };
          var _M = function M() {
            return date[_() + "Minutes"]();
          };
          var _s = function s() {
            return date[_() + "Seconds"]();
          };
          var _L = function L() {
            return date[_() + "Milliseconds"]();
          };
          var _o = function o() {
            return utc ? 0 : date.getTimezoneOffset();
          };
          var _W = function W() {
            return getWeek(date);
          };
          var _N = function N() {
            return getDayOfWeek(date);
          };
          var flags = { d: function d() {
            return _d();
          }, dd: function dd() {
            return pad(_d());
          }, ddd: function ddd() {
            return dateFormat2.i18n.dayNames[D()];
          }, DDD: function DDD() {
            return getDayName({ y: y(), m: _m(), d: _d(), _: _(), dayName: dateFormat2.i18n.dayNames[D()], short: true });
          }, dddd: function dddd() {
            return dateFormat2.i18n.dayNames[D() + 7];
          }, DDDD: function DDDD() {
            return getDayName({ y: y(), m: _m(), d: _d(), _: _(), dayName: dateFormat2.i18n.dayNames[D() + 7] });
          }, m: function m() {
            return _m() + 1;
          }, mm: function mm() {
            return pad(_m() + 1);
          }, mmm: function mmm() {
            return dateFormat2.i18n.monthNames[_m()];
          }, mmmm: function mmmm() {
            return dateFormat2.i18n.monthNames[_m() + 12];
          }, yy: function yy() {
            return String(y()).slice(2);
          }, yyyy: function yyyy() {
            return pad(y(), 4);
          }, h: function h() {
            return _H() % 12 || 12;
          }, hh: function hh() {
            return pad(_H() % 12 || 12);
          }, H: function H() {
            return _H();
          }, HH: function HH() {
            return pad(_H());
          }, M: function M() {
            return _M();
          }, MM: function MM() {
            return pad(_M());
          }, s: function s() {
            return _s();
          }, ss: function ss() {
            return pad(_s());
          }, l: function l() {
            return pad(_L(), 3);
          }, L: function L() {
            return pad(Math.floor(_L() / 10));
          }, t: function t() {
            return _H() < 12 ? dateFormat2.i18n.timeNames[0] : dateFormat2.i18n.timeNames[1];
          }, tt: function tt() {
            return _H() < 12 ? dateFormat2.i18n.timeNames[2] : dateFormat2.i18n.timeNames[3];
          }, T: function T() {
            return _H() < 12 ? dateFormat2.i18n.timeNames[4] : dateFormat2.i18n.timeNames[5];
          }, TT: function TT() {
            return _H() < 12 ? dateFormat2.i18n.timeNames[6] : dateFormat2.i18n.timeNames[7];
          }, Z: function Z() {
            return gmt ? "GMT" : utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, "").replace(/GMT\+0000/g, "UTC");
          }, o: function o() {
            return (_o() > 0 ? "-" : "+") + pad(Math.floor(Math.abs(_o()) / 60) * 100 + Math.abs(_o()) % 60, 4);
          }, p: function p() {
            return (_o() > 0 ? "-" : "+") + pad(Math.floor(Math.abs(_o()) / 60), 2) + ":" + pad(Math.floor(Math.abs(_o()) % 60), 2);
          }, S: function S() {
            return ["th", "st", "nd", "rd"][_d() % 10 > 3 ? 0 : (_d() % 100 - _d() % 10 != 10) * _d() % 10];
          }, W: function W() {
            return _W();
          }, WW: function WW() {
            return pad(_W());
          }, N: function N() {
            return _N();
          } };
          return mask.replace(token, function(match) {
            if (match in flags) {
              return flags[match]();
            }
            return match.slice(1, match.length - 1);
          });
        };
      }();
      dateFormat2.masks = { default: "ddd mmm dd yyyy HH:MM:ss", shortDate: "m/d/yy", paddedShortDate: "mm/dd/yyyy", mediumDate: "mmm d, yyyy", longDate: "mmmm d, yyyy", fullDate: "dddd, mmmm d, yyyy", shortTime: "h:MM TT", mediumTime: "h:MM:ss TT", longTime: "h:MM:ss TT Z", isoDate: "yyyy-mm-dd", isoTime: "HH:MM:ss", isoDateTime: "yyyy-mm-dd'T'HH:MM:sso", isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'", expiresHeaderFormat: "ddd, dd mmm yyyy HH:MM:ss Z" };
      dateFormat2.i18n = { dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"] };
      var pad = function pad2(val, len) {
        val = String(val);
        len = len || 2;
        while (val.length < len) {
          val = "0" + val;
        }
        return val;
      };
      var getDayName = function getDayName2(_ref) {
        var y = _ref.y, m = _ref.m, d = _ref.d, _ = _ref._, dayName = _ref.dayName, _ref$short = _ref["short"], _short = _ref$short === void 0 ? false : _ref$short;
        var today = new Date();
        var yesterday = new Date();
        yesterday.setDate(yesterday[_ + "Date"]() - 1);
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow[_ + "Date"]() + 1);
        var today_d = function today_d2() {
          return today[_ + "Date"]();
        };
        var today_m = function today_m2() {
          return today[_ + "Month"]();
        };
        var today_y = function today_y2() {
          return today[_ + "FullYear"]();
        };
        var yesterday_d = function yesterday_d2() {
          return yesterday[_ + "Date"]();
        };
        var yesterday_m = function yesterday_m2() {
          return yesterday[_ + "Month"]();
        };
        var yesterday_y = function yesterday_y2() {
          return yesterday[_ + "FullYear"]();
        };
        var tomorrow_d = function tomorrow_d2() {
          return tomorrow[_ + "Date"]();
        };
        var tomorrow_m = function tomorrow_m2() {
          return tomorrow[_ + "Month"]();
        };
        var tomorrow_y = function tomorrow_y2() {
          return tomorrow[_ + "FullYear"]();
        };
        if (today_y() === y && today_m() === m && today_d() === d) {
          return _short ? "Tdy" : "Today";
        } else if (yesterday_y() === y && yesterday_m() === m && yesterday_d() === d) {
          return _short ? "Ysd" : "Yesterday";
        } else if (tomorrow_y() === y && tomorrow_m() === m && tomorrow_d() === d) {
          return _short ? "Tmw" : "Tomorrow";
        }
        return dayName;
      };
      var getWeek = function getWeek2(date) {
        var targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        targetThursday.setDate(targetThursday.getDate() - (targetThursday.getDay() + 6) % 7 + 3);
        var firstThursday = new Date(targetThursday.getFullYear(), 0, 4);
        firstThursday.setDate(firstThursday.getDate() - (firstThursday.getDay() + 6) % 7 + 3);
        var ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
        targetThursday.setHours(targetThursday.getHours() - ds);
        var weekDiff = (targetThursday - firstThursday) / (864e5 * 7);
        return 1 + Math.floor(weekDiff);
      };
      var getDayOfWeek = function getDayOfWeek2(date) {
        var dow = date.getDay();
        if (dow === 0) {
          dow = 7;
        }
        return dow;
      };
      var kindOf = function kindOf2(val) {
        if (val === null) {
          return "null";
        }
        if (val === void 0) {
          return "undefined";
        }
        if (_typeof(val) !== "object") {
          return _typeof(val);
        }
        if (Array.isArray(val)) {
          return "array";
        }
        return {}.toString.call(val).slice(8, -1).toLowerCase();
      };
      if (typeof define === "function" && define.amd) {
        define(function() {
          return dateFormat2;
        });
      } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
        module2.exports = dateFormat2;
      } else {
        global2.dateFormat = dateFormat2;
      }
    })(void 0);
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_freeGlobal.js
var require_freeGlobal = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_freeGlobal.js"(exports, module2) {
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    module2.exports = freeGlobal;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_root.js
var require_root = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_root.js"(exports, module2) {
    var freeGlobal = require_freeGlobal();
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    module2.exports = root;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_Symbol.js
var require_Symbol = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_Symbol.js"(exports, module2) {
    var root = require_root();
    var Symbol2 = root.Symbol;
    module2.exports = Symbol2;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_arrayMap.js
var require_arrayMap = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_arrayMap.js"(exports, module2) {
    function arrayMap(array, iteratee) {
      var index = -1, length = array == null ? 0 : array.length, result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }
    module2.exports = arrayMap;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/isArray.js
var require_isArray = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/isArray.js"(exports, module2) {
    var isArray = Array.isArray;
    module2.exports = isArray;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_getRawTag.js
var require_getRawTag = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_getRawTag.js"(exports, module2) {
    var Symbol2 = require_Symbol();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var nativeObjectToString = objectProto.toString;
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e) {
      }
      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    module2.exports = getRawTag;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_objectToString.js
var require_objectToString = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_objectToString.js"(exports, module2) {
    var objectProto = Object.prototype;
    var nativeObjectToString = objectProto.toString;
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    module2.exports = objectToString;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseGetTag.js
var require_baseGetTag = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseGetTag.js"(exports, module2) {
    var Symbol2 = require_Symbol();
    var getRawTag = require_getRawTag();
    var objectToString = require_objectToString();
    var nullTag = "[object Null]";
    var undefinedTag = "[object Undefined]";
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    module2.exports = baseGetTag;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/isObjectLike.js
var require_isObjectLike = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/isObjectLike.js"(exports, module2) {
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    module2.exports = isObjectLike;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/isSymbol.js
var require_isSymbol = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/isSymbol.js"(exports, module2) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var symbolTag = "[object Symbol]";
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
    }
    module2.exports = isSymbol;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseToString.js
var require_baseToString = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseToString.js"(exports, module2) {
    var Symbol2 = require_Symbol();
    var arrayMap = require_arrayMap();
    var isArray = require_isArray();
    var isSymbol = require_isSymbol();
    var INFINITY = 1 / 0;
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolToString = symbolProto ? symbolProto.toString : void 0;
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isArray(value)) {
        return arrayMap(value, baseToString) + "";
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module2.exports = baseToString;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseSlice.js
var require_baseSlice = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseSlice.js"(exports, module2) {
    function baseSlice(array, start, end) {
      var index = -1, length = array.length;
      if (start < 0) {
        start = -start > length ? 0 : length + start;
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : end - start >>> 0;
      start >>>= 0;
      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }
    module2.exports = baseSlice;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_castSlice.js
var require_castSlice = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_castSlice.js"(exports, module2) {
    var baseSlice = require_baseSlice();
    function castSlice(array, start, end) {
      var length = array.length;
      end = end === void 0 ? length : end;
      return !start && end >= length ? array : baseSlice(array, start, end);
    }
    module2.exports = castSlice;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseFindIndex.js
var require_baseFindIndex = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseFindIndex.js"(exports, module2) {
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
      while (fromRight ? index-- : ++index < length) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }
    module2.exports = baseFindIndex;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseIsNaN.js
var require_baseIsNaN = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseIsNaN.js"(exports, module2) {
    function baseIsNaN(value) {
      return value !== value;
    }
    module2.exports = baseIsNaN;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_strictIndexOf.js
var require_strictIndexOf = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_strictIndexOf.js"(exports, module2) {
    function strictIndexOf(array, value, fromIndex) {
      var index = fromIndex - 1, length = array.length;
      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }
    module2.exports = strictIndexOf;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseIndexOf.js
var require_baseIndexOf = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseIndexOf.js"(exports, module2) {
    var baseFindIndex = require_baseFindIndex();
    var baseIsNaN = require_baseIsNaN();
    var strictIndexOf = require_strictIndexOf();
    function baseIndexOf(array, value, fromIndex) {
      return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
    }
    module2.exports = baseIndexOf;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_charsEndIndex.js
var require_charsEndIndex = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_charsEndIndex.js"(exports, module2) {
    var baseIndexOf = require_baseIndexOf();
    function charsEndIndex(strSymbols, chrSymbols) {
      var index = strSymbols.length;
      while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
      }
      return index;
    }
    module2.exports = charsEndIndex;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_asciiToArray.js
var require_asciiToArray = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_asciiToArray.js"(exports, module2) {
    function asciiToArray(string) {
      return string.split("");
    }
    module2.exports = asciiToArray;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_hasUnicode.js
var require_hasUnicode = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_hasUnicode.js"(exports, module2) {
    var rsAstralRange = "\\ud800-\\udfff";
    var rsComboMarksRange = "\\u0300-\\u036f";
    var reComboHalfMarksRange = "\\ufe20-\\ufe2f";
    var rsComboSymbolsRange = "\\u20d0-\\u20ff";
    var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
    var rsVarRange = "\\ufe0e\\ufe0f";
    var rsZWJ = "\\u200d";
    var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
    function hasUnicode(string) {
      return reHasUnicode.test(string);
    }
    module2.exports = hasUnicode;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_unicodeToArray.js
var require_unicodeToArray = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_unicodeToArray.js"(exports, module2) {
    var rsAstralRange = "\\ud800-\\udfff";
    var rsComboMarksRange = "\\u0300-\\u036f";
    var reComboHalfMarksRange = "\\ufe20-\\ufe2f";
    var rsComboSymbolsRange = "\\u20d0-\\u20ff";
    var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
    var rsVarRange = "\\ufe0e\\ufe0f";
    var rsAstral = "[" + rsAstralRange + "]";
    var rsCombo = "[" + rsComboRange + "]";
    var rsFitz = "\\ud83c[\\udffb-\\udfff]";
    var rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")";
    var rsNonAstral = "[^" + rsAstralRange + "]";
    var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
    var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
    var rsZWJ = "\\u200d";
    var reOptMod = rsModifier + "?";
    var rsOptVar = "[" + rsVarRange + "]?";
    var rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*";
    var rsSeq = rsOptVar + reOptMod + rsOptJoin;
    var rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
    var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
    function unicodeToArray(string) {
      return string.match(reUnicode) || [];
    }
    module2.exports = unicodeToArray;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_stringToArray.js
var require_stringToArray = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_stringToArray.js"(exports, module2) {
    var asciiToArray = require_asciiToArray();
    var hasUnicode = require_hasUnicode();
    var unicodeToArray = require_unicodeToArray();
    function stringToArray(string) {
      return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
    }
    module2.exports = stringToArray;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/toString.js
var require_toString = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/toString.js"(exports, module2) {
    var baseToString = require_baseToString();
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    module2.exports = toString;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/trimEnd.js
var require_trimEnd = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/trimEnd.js"(exports, module2) {
    var baseToString = require_baseToString();
    var castSlice = require_castSlice();
    var charsEndIndex = require_charsEndIndex();
    var stringToArray = require_stringToArray();
    var toString = require_toString();
    var reTrimEnd = /\s+$/;
    function trimEnd(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === void 0)) {
        return string.replace(reTrimEnd, "");
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
      return castSlice(strSymbols, 0, end).join("");
    }
    module2.exports = trimEnd;
  }
});

// plugins/public/node_modules/sql-formatter/lib/core/tokenTypes.js
var require_tokenTypes = __commonJS({
  "plugins/public/node_modules/sql-formatter/lib/core/tokenTypes.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = {
      WHITESPACE: "whitespace",
      WORD: "word",
      STRING: "string",
      RESERVED: "reserved",
      RESERVED_TOPLEVEL: "reserved-toplevel",
      RESERVED_NEWLINE: "reserved-newline",
      OPERATOR: "operator",
      OPEN_PAREN: "open-paren",
      CLOSE_PAREN: "close-paren",
      LINE_COMMENT: "line-comment",
      BLOCK_COMMENT: "block-comment",
      NUMBER: "number",
      PLACEHOLDER: "placeholder"
    };
    module2.exports = exports["default"];
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseRepeat.js
var require_baseRepeat = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseRepeat.js"(exports, module2) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    var nativeFloor = Math.floor;
    function baseRepeat(string, n) {
      var result = "";
      if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
        return result;
      }
      do {
        if (n % 2) {
          result += string;
        }
        n = nativeFloor(n / 2);
        if (n) {
          string += string;
        }
      } while (n);
      return result;
    }
    module2.exports = baseRepeat;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/eq.js
var require_eq = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/eq.js"(exports, module2) {
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    module2.exports = eq;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/isObject.js
var require_isObject = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/isObject.js"(exports, module2) {
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    module2.exports = isObject;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/isFunction.js
var require_isFunction = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/isFunction.js"(exports, module2) {
    var baseGetTag = require_baseGetTag();
    var isObject = require_isObject();
    var asyncTag = "[object AsyncFunction]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var proxyTag = "[object Proxy]";
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    module2.exports = isFunction;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/isLength.js
var require_isLength = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/isLength.js"(exports, module2) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    module2.exports = isLength;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/isArrayLike.js
var require_isArrayLike = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/isArrayLike.js"(exports, module2) {
    var isFunction = require_isFunction();
    var isLength = require_isLength();
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    module2.exports = isArrayLike;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_isIndex.js
var require_isIndex = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_isIndex.js"(exports, module2) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    module2.exports = isIndex;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_isIterateeCall.js
var require_isIterateeCall = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_isIterateeCall.js"(exports, module2) {
    var eq = require_eq();
    var isArrayLike = require_isArrayLike();
    var isIndex = require_isIndex();
    var isObject = require_isObject();
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index;
      if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
        return eq(object[index], value);
      }
      return false;
    }
    module2.exports = isIterateeCall;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/toNumber.js
var require_toNumber = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/toNumber.js"(exports, module2) {
    var isObject = require_isObject();
    var isSymbol = require_isSymbol();
    var NAN = 0 / 0;
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module2.exports = toNumber;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/toFinite.js
var require_toFinite = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/toFinite.js"(exports, module2) {
    var toNumber = require_toNumber();
    var INFINITY = 1 / 0;
    var MAX_INTEGER = 17976931348623157e292;
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }
    module2.exports = toFinite;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/toInteger.js
var require_toInteger = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/toInteger.js"(exports, module2) {
    var toFinite = require_toFinite();
    function toInteger(value) {
      var result = toFinite(value), remainder = result % 1;
      return result === result ? remainder ? result - remainder : result : 0;
    }
    module2.exports = toInteger;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/repeat.js
var require_repeat = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/repeat.js"(exports, module2) {
    var baseRepeat = require_baseRepeat();
    var isIterateeCall = require_isIterateeCall();
    var toInteger = require_toInteger();
    var toString = require_toString();
    function repeat(string, n, guard) {
      if (guard ? isIterateeCall(string, n, guard) : n === void 0) {
        n = 1;
      } else {
        n = toInteger(n);
      }
      return baseRepeat(toString(string), n);
    }
    module2.exports = repeat;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/last.js
var require_last = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/last.js"(exports, module2) {
    function last(array) {
      var length = array == null ? 0 : array.length;
      return length ? array[length - 1] : void 0;
    }
    module2.exports = last;
  }
});

// plugins/public/node_modules/sql-formatter/lib/core/Indentation.js
var require_Indentation = __commonJS({
  "plugins/public/node_modules/sql-formatter/lib/core/Indentation.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    var _repeat = require_repeat();
    var _repeat2 = _interopRequireDefault(_repeat);
    var _last = require_last();
    var _last2 = _interopRequireDefault(_last);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var INDENT_TYPE_TOP_LEVEL = "top-level";
    var INDENT_TYPE_BLOCK_LEVEL = "block-level";
    var Indentation = function() {
      function Indentation2(indent) {
        _classCallCheck(this, Indentation2);
        this.indent = indent || "  ";
        this.indentTypes = [];
      }
      Indentation2.prototype.getIndent = function getIndent() {
        return (0, _repeat2["default"])(this.indent, this.indentTypes.length);
      };
      Indentation2.prototype.increaseToplevel = function increaseToplevel() {
        this.indentTypes.push(INDENT_TYPE_TOP_LEVEL);
      };
      Indentation2.prototype.increaseBlockLevel = function increaseBlockLevel() {
        this.indentTypes.push(INDENT_TYPE_BLOCK_LEVEL);
      };
      Indentation2.prototype.decreaseTopLevel = function decreaseTopLevel() {
        if ((0, _last2["default"])(this.indentTypes) === INDENT_TYPE_TOP_LEVEL) {
          this.indentTypes.pop();
        }
      };
      Indentation2.prototype.decreaseBlockLevel = function decreaseBlockLevel() {
        while (this.indentTypes.length > 0) {
          var type = this.indentTypes.pop();
          if (type !== INDENT_TYPE_TOP_LEVEL) {
            break;
          }
        }
      };
      return Indentation2;
    }();
    exports["default"] = Indentation;
    module2.exports = exports["default"];
  }
});

// plugins/public/node_modules/sql-formatter/lib/core/InlineBlock.js
var require_InlineBlock = __commonJS({
  "plugins/public/node_modules/sql-formatter/lib/core/InlineBlock.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    var _tokenTypes = require_tokenTypes();
    var _tokenTypes2 = _interopRequireDefault(_tokenTypes);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var INLINE_MAX_LENGTH = 50;
    var InlineBlock = function() {
      function InlineBlock2() {
        _classCallCheck(this, InlineBlock2);
        this.level = 0;
      }
      InlineBlock2.prototype.beginIfPossible = function beginIfPossible(tokens, index) {
        if (this.level === 0 && this.isInlineBlock(tokens, index)) {
          this.level = 1;
        } else if (this.level > 0) {
          this.level++;
        } else {
          this.level = 0;
        }
      };
      InlineBlock2.prototype.end = function end() {
        this.level--;
      };
      InlineBlock2.prototype.isActive = function isActive() {
        return this.level > 0;
      };
      InlineBlock2.prototype.isInlineBlock = function isInlineBlock(tokens, index) {
        var length = 0;
        var level = 0;
        for (var i = index; i < tokens.length; i++) {
          var token = tokens[i];
          length += token.value.length;
          if (length > INLINE_MAX_LENGTH) {
            return false;
          }
          if (token.type === _tokenTypes2["default"].OPEN_PAREN) {
            level++;
          } else if (token.type === _tokenTypes2["default"].CLOSE_PAREN) {
            level--;
            if (level === 0) {
              return true;
            }
          }
          if (this.isForbiddenToken(token)) {
            return false;
          }
        }
        return false;
      };
      InlineBlock2.prototype.isForbiddenToken = function isForbiddenToken(_ref) {
        var type = _ref.type, value = _ref.value;
        return type === _tokenTypes2["default"].RESERVED_TOPLEVEL || type === _tokenTypes2["default"].RESERVED_NEWLINE || type === _tokenTypes2["default"].COMMENT || type === _tokenTypes2["default"].BLOCK_COMMENT || value === ";";
      };
      return InlineBlock2;
    }();
    exports["default"] = InlineBlock;
    module2.exports = exports["default"];
  }
});

// plugins/public/node_modules/sql-formatter/lib/core/Params.js
var require_Params = __commonJS({
  "plugins/public/node_modules/sql-formatter/lib/core/Params.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var Params = function() {
      function Params2(params) {
        _classCallCheck(this, Params2);
        this.params = params;
        this.index = 0;
      }
      Params2.prototype.get = function get(_ref) {
        var key = _ref.key, value = _ref.value;
        if (!this.params) {
          return value;
        }
        if (key) {
          return this.params[key];
        }
        return this.params[this.index++];
      };
      return Params2;
    }();
    exports["default"] = Params;
    module2.exports = exports["default"];
  }
});

// plugins/public/node_modules/sql-formatter/lib/core/Formatter.js
var require_Formatter = __commonJS({
  "plugins/public/node_modules/sql-formatter/lib/core/Formatter.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    var _trimEnd = require_trimEnd();
    var _trimEnd2 = _interopRequireDefault(_trimEnd);
    var _tokenTypes = require_tokenTypes();
    var _tokenTypes2 = _interopRequireDefault(_tokenTypes);
    var _Indentation = require_Indentation();
    var _Indentation2 = _interopRequireDefault(_Indentation);
    var _InlineBlock = require_InlineBlock();
    var _InlineBlock2 = _interopRequireDefault(_InlineBlock);
    var _Params = require_Params();
    var _Params2 = _interopRequireDefault(_Params);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var Formatter = function() {
      function Formatter2(cfg, tokenizer) {
        _classCallCheck(this, Formatter2);
        this.cfg = cfg || {};
        this.indentation = new _Indentation2["default"](this.cfg.indent);
        this.inlineBlock = new _InlineBlock2["default"]();
        this.params = new _Params2["default"](this.cfg.params);
        this.tokenizer = tokenizer;
        this.previousReservedWord = {};
        this.tokens = [];
        this.index = 0;
      }
      Formatter2.prototype.format = function format(query) {
        this.tokens = this.tokenizer.tokenize(query);
        var formattedQuery = this.getFormattedQueryFromTokens();
        return formattedQuery.trim();
      };
      Formatter2.prototype.getFormattedQueryFromTokens = function getFormattedQueryFromTokens() {
        var _this = this;
        var formattedQuery = "";
        this.tokens.forEach(function(token, index) {
          _this.index = index;
          if (token.type === _tokenTypes2["default"].WHITESPACE) {
          } else if (token.type === _tokenTypes2["default"].LINE_COMMENT) {
            formattedQuery = _this.formatLineComment(token, formattedQuery);
          } else if (token.type === _tokenTypes2["default"].BLOCK_COMMENT) {
            formattedQuery = _this.formatBlockComment(token, formattedQuery);
          } else if (token.type === _tokenTypes2["default"].RESERVED_TOPLEVEL) {
            formattedQuery = _this.formatToplevelReservedWord(token, formattedQuery);
            _this.previousReservedWord = token;
          } else if (token.type === _tokenTypes2["default"].RESERVED_NEWLINE) {
            formattedQuery = _this.formatNewlineReservedWord(token, formattedQuery);
            _this.previousReservedWord = token;
          } else if (token.type === _tokenTypes2["default"].RESERVED) {
            formattedQuery = _this.formatWithSpaces(token, formattedQuery);
            _this.previousReservedWord = token;
          } else if (token.type === _tokenTypes2["default"].OPEN_PAREN) {
            formattedQuery = _this.formatOpeningParentheses(token, formattedQuery);
          } else if (token.type === _tokenTypes2["default"].CLOSE_PAREN) {
            formattedQuery = _this.formatClosingParentheses(token, formattedQuery);
          } else if (token.type === _tokenTypes2["default"].PLACEHOLDER) {
            formattedQuery = _this.formatPlaceholder(token, formattedQuery);
          } else if (token.value === ",") {
            formattedQuery = _this.formatComma(token, formattedQuery);
          } else if (token.value === ":") {
            formattedQuery = _this.formatWithSpaceAfter(token, formattedQuery);
          } else if (token.value === ".") {
            formattedQuery = _this.formatWithoutSpaces(token, formattedQuery);
          } else if (token.value === ";") {
            formattedQuery = _this.formatQuerySeparator(token, formattedQuery);
          } else {
            formattedQuery = _this.formatWithSpaces(token, formattedQuery);
          }
        });
        return formattedQuery;
      };
      Formatter2.prototype.formatLineComment = function formatLineComment(token, query) {
        return this.addNewline(query + token.value);
      };
      Formatter2.prototype.formatBlockComment = function formatBlockComment(token, query) {
        return this.addNewline(this.addNewline(query) + this.indentComment(token.value));
      };
      Formatter2.prototype.indentComment = function indentComment(comment) {
        return comment.replace(/\n/g, "\n" + this.indentation.getIndent());
      };
      Formatter2.prototype.formatToplevelReservedWord = function formatToplevelReservedWord(token, query) {
        this.indentation.decreaseTopLevel();
        query = this.addNewline(query);
        this.indentation.increaseToplevel();
        query += this.equalizeWhitespace(token.value);
        return this.addNewline(query);
      };
      Formatter2.prototype.formatNewlineReservedWord = function formatNewlineReservedWord(token, query) {
        return this.addNewline(query) + this.equalizeWhitespace(token.value) + " ";
      };
      Formatter2.prototype.equalizeWhitespace = function equalizeWhitespace(string) {
        return string.replace(/\s+/g, " ");
      };
      Formatter2.prototype.formatOpeningParentheses = function formatOpeningParentheses(token, query) {
        var preserveWhitespaceFor = [_tokenTypes2["default"].WHITESPACE, _tokenTypes2["default"].OPEN_PAREN, _tokenTypes2["default"].LINE_COMMENT];
        if (!preserveWhitespaceFor.includes(this.previousToken().type)) {
          query = (0, _trimEnd2["default"])(query);
        }
        query += token.value;
        this.inlineBlock.beginIfPossible(this.tokens, this.index);
        if (!this.inlineBlock.isActive()) {
          this.indentation.increaseBlockLevel();
          query = this.addNewline(query);
        }
        return query;
      };
      Formatter2.prototype.formatClosingParentheses = function formatClosingParentheses(token, query) {
        if (this.inlineBlock.isActive()) {
          this.inlineBlock.end();
          return this.formatWithSpaceAfter(token, query);
        } else {
          this.indentation.decreaseBlockLevel();
          return this.formatWithSpaces(token, this.addNewline(query));
        }
      };
      Formatter2.prototype.formatPlaceholder = function formatPlaceholder(token, query) {
        return query + this.params.get(token) + " ";
      };
      Formatter2.prototype.formatComma = function formatComma(token, query) {
        query = this.trimTrailingWhitespace(query) + token.value + " ";
        if (this.inlineBlock.isActive()) {
          return query;
        } else if (/^LIMIT$/i.test(this.previousReservedWord.value)) {
          return query;
        } else {
          return this.addNewline(query);
        }
      };
      Formatter2.prototype.formatWithSpaceAfter = function formatWithSpaceAfter(token, query) {
        return this.trimTrailingWhitespace(query) + token.value + " ";
      };
      Formatter2.prototype.formatWithoutSpaces = function formatWithoutSpaces(token, query) {
        return this.trimTrailingWhitespace(query) + token.value;
      };
      Formatter2.prototype.formatWithSpaces = function formatWithSpaces(token, query) {
        return query + token.value + " ";
      };
      Formatter2.prototype.formatQuerySeparator = function formatQuerySeparator(token, query) {
        return this.trimTrailingWhitespace(query) + token.value + "\n";
      };
      Formatter2.prototype.addNewline = function addNewline(query) {
        return (0, _trimEnd2["default"])(query) + "\n" + this.indentation.getIndent();
      };
      Formatter2.prototype.trimTrailingWhitespace = function trimTrailingWhitespace(query) {
        if (this.previousNonWhitespaceToken().type === _tokenTypes2["default"].LINE_COMMENT) {
          return (0, _trimEnd2["default"])(query) + "\n";
        } else {
          return (0, _trimEnd2["default"])(query);
        }
      };
      Formatter2.prototype.previousNonWhitespaceToken = function previousNonWhitespaceToken() {
        var n = 1;
        while (this.previousToken(n).type === _tokenTypes2["default"].WHITESPACE) {
          n++;
        }
        return this.previousToken(n);
      };
      Formatter2.prototype.previousToken = function previousToken() {
        var offset = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
        return this.tokens[this.index - offset] || {};
      };
      return Formatter2;
    }();
    exports["default"] = Formatter;
    module2.exports = exports["default"];
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_isPrototype.js
var require_isPrototype = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_isPrototype.js"(exports, module2) {
    var objectProto = Object.prototype;
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    module2.exports = isPrototype;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_overArg.js
var require_overArg = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_overArg.js"(exports, module2) {
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    module2.exports = overArg;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_nativeKeys.js
var require_nativeKeys = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_nativeKeys.js"(exports, module2) {
    var overArg = require_overArg();
    var nativeKeys = overArg(Object.keys, Object);
    module2.exports = nativeKeys;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseKeys.js
var require_baseKeys = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseKeys.js"(exports, module2) {
    var isPrototype = require_isPrototype();
    var nativeKeys = require_nativeKeys();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    module2.exports = baseKeys;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_coreJsData.js
var require_coreJsData = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_coreJsData.js"(exports, module2) {
    var root = require_root();
    var coreJsData = root["__core-js_shared__"];
    module2.exports = coreJsData;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_isMasked.js
var require_isMasked = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_isMasked.js"(exports, module2) {
    var coreJsData = require_coreJsData();
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    module2.exports = isMasked;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_toSource.js
var require_toSource = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_toSource.js"(exports, module2) {
    var funcProto = Function.prototype;
    var funcToString = funcProto.toString;
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    module2.exports = toSource;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseIsNative.js
var require_baseIsNative = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseIsNative.js"(exports, module2) {
    var isFunction = require_isFunction();
    var isMasked = require_isMasked();
    var isObject = require_isObject();
    var toSource = require_toSource();
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    module2.exports = baseIsNative;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_getValue.js
var require_getValue = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_getValue.js"(exports, module2) {
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    module2.exports = getValue;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_getNative.js
var require_getNative = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_getNative.js"(exports, module2) {
    var baseIsNative = require_baseIsNative();
    var getValue = require_getValue();
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    module2.exports = getNative;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_DataView.js
var require_DataView = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_DataView.js"(exports, module2) {
    var getNative = require_getNative();
    var root = require_root();
    var DataView = getNative(root, "DataView");
    module2.exports = DataView;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_Map.js
var require_Map = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_Map.js"(exports, module2) {
    var getNative = require_getNative();
    var root = require_root();
    var Map = getNative(root, "Map");
    module2.exports = Map;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_Promise.js
var require_Promise = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_Promise.js"(exports, module2) {
    var getNative = require_getNative();
    var root = require_root();
    var Promise2 = getNative(root, "Promise");
    module2.exports = Promise2;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_Set.js
var require_Set = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_Set.js"(exports, module2) {
    var getNative = require_getNative();
    var root = require_root();
    var Set = getNative(root, "Set");
    module2.exports = Set;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_WeakMap.js
var require_WeakMap = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_WeakMap.js"(exports, module2) {
    var getNative = require_getNative();
    var root = require_root();
    var WeakMap = getNative(root, "WeakMap");
    module2.exports = WeakMap;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_getTag.js
var require_getTag = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_getTag.js"(exports, module2) {
    var DataView = require_DataView();
    var Map = require_Map();
    var Promise2 = require_Promise();
    var Set = require_Set();
    var WeakMap = require_WeakMap();
    var baseGetTag = require_baseGetTag();
    var toSource = require_toSource();
    var mapTag = "[object Map]";
    var objectTag = "[object Object]";
    var promiseTag = "[object Promise]";
    var setTag = "[object Set]";
    var weakMapTag = "[object WeakMap]";
    var dataViewTag = "[object DataView]";
    var dataViewCtorString = toSource(DataView);
    var mapCtorString = toSource(Map);
    var promiseCtorString = toSource(Promise2);
    var setCtorString = toSource(Set);
    var weakMapCtorString = toSource(WeakMap);
    var getTag = baseGetTag;
    if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
      getTag = function(value) {
        var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    module2.exports = getTag;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseIsArguments.js
var require_baseIsArguments = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseIsArguments.js"(exports, module2) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }
    module2.exports = baseIsArguments;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/isArguments.js
var require_isArguments = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/isArguments.js"(exports, module2) {
    var baseIsArguments = require_baseIsArguments();
    var isObjectLike = require_isObjectLike();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var isArguments = baseIsArguments(function() {
      return arguments;
    }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    module2.exports = isArguments;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/stubFalse.js
var require_stubFalse = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/stubFalse.js"(exports, module2) {
    function stubFalse() {
      return false;
    }
    module2.exports = stubFalse;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/isBuffer.js
var require_isBuffer = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/isBuffer.js"(exports, module2) {
    var root = require_root();
    var stubFalse = require_stubFalse();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module2 == "object" && module2 && !module2.nodeType && module2;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer2 = moduleExports ? root.Buffer : void 0;
    var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
    var isBuffer = nativeIsBuffer || stubFalse;
    module2.exports = isBuffer;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseIsTypedArray.js
var require_baseIsTypedArray = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseIsTypedArray.js"(exports, module2) {
    var baseGetTag = require_baseGetTag();
    var isLength = require_isLength();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var objectTag = "[object Object]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }
    module2.exports = baseIsTypedArray;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseUnary.js
var require_baseUnary = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_baseUnary.js"(exports, module2) {
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    module2.exports = baseUnary;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/_nodeUtil.js
var require_nodeUtil = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/_nodeUtil.js"(exports, module2) {
    var freeGlobal = require_freeGlobal();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module2 == "object" && module2 && !module2.nodeType && module2;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    }();
    module2.exports = nodeUtil;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/isTypedArray.js
var require_isTypedArray = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/isTypedArray.js"(exports, module2) {
    var baseIsTypedArray = require_baseIsTypedArray();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    module2.exports = isTypedArray;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/isEmpty.js
var require_isEmpty = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/isEmpty.js"(exports, module2) {
    var baseKeys = require_baseKeys();
    var getTag = require_getTag();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isArrayLike = require_isArrayLike();
    var isBuffer = require_isBuffer();
    var isPrototype = require_isPrototype();
    var isTypedArray = require_isTypedArray();
    var mapTag = "[object Map]";
    var setTag = "[object Set]";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function isEmpty(value) {
      if (value == null) {
        return true;
      }
      if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
        return !value.length;
      }
      var tag = getTag(value);
      if (tag == mapTag || tag == setTag) {
        return !value.size;
      }
      if (isPrototype(value)) {
        return !baseKeys(value).length;
      }
      for (var key in value) {
        if (hasOwnProperty.call(value, key)) {
          return false;
        }
      }
      return true;
    }
    module2.exports = isEmpty;
  }
});

// plugins/public/node_modules/sql-formatter/node_modules/lodash/escapeRegExp.js
var require_escapeRegExp = __commonJS({
  "plugins/public/node_modules/sql-formatter/node_modules/lodash/escapeRegExp.js"(exports, module2) {
    var toString = require_toString();
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reHasRegExpChar = RegExp(reRegExpChar.source);
    function escapeRegExp(string) {
      string = toString(string);
      return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
    }
    module2.exports = escapeRegExp;
  }
});

// plugins/public/node_modules/sql-formatter/lib/core/Tokenizer.js
var require_Tokenizer = __commonJS({
  "plugins/public/node_modules/sql-formatter/lib/core/Tokenizer.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    var _isEmpty = require_isEmpty();
    var _isEmpty2 = _interopRequireDefault(_isEmpty);
    var _escapeRegExp = require_escapeRegExp();
    var _escapeRegExp2 = _interopRequireDefault(_escapeRegExp);
    var _tokenTypes = require_tokenTypes();
    var _tokenTypes2 = _interopRequireDefault(_tokenTypes);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var Tokenizer = function() {
      function Tokenizer2(cfg) {
        _classCallCheck(this, Tokenizer2);
        this.WHITESPACE_REGEX = /^(\s+)/;
        this.NUMBER_REGEX = /^((-\s*)?[0-9]+(\.[0-9]+)?|0x[0-9a-fA-F]+|0b[01]+)\b/;
        this.OPERATOR_REGEX = /^(!=|<>|==|<=|>=|!<|!>|\|\||::|->>|->|~~\*|~~|!~~\*|!~~|~\*|!~\*|!~|.)/;
        this.BLOCK_COMMENT_REGEX = /^(\/\*[^]*?(?:\*\/|$))/;
        this.LINE_COMMENT_REGEX = this.createLineCommentRegex(cfg.lineCommentTypes);
        this.RESERVED_TOPLEVEL_REGEX = this.createReservedWordRegex(cfg.reservedToplevelWords);
        this.RESERVED_NEWLINE_REGEX = this.createReservedWordRegex(cfg.reservedNewlineWords);
        this.RESERVED_PLAIN_REGEX = this.createReservedWordRegex(cfg.reservedWords);
        this.WORD_REGEX = this.createWordRegex(cfg.specialWordChars);
        this.STRING_REGEX = this.createStringRegex(cfg.stringTypes);
        this.OPEN_PAREN_REGEX = this.createParenRegex(cfg.openParens);
        this.CLOSE_PAREN_REGEX = this.createParenRegex(cfg.closeParens);
        this.INDEXED_PLACEHOLDER_REGEX = this.createPlaceholderRegex(cfg.indexedPlaceholderTypes, "[0-9]*");
        this.IDENT_NAMED_PLACEHOLDER_REGEX = this.createPlaceholderRegex(cfg.namedPlaceholderTypes, "[a-zA-Z0-9._$]+");
        this.STRING_NAMED_PLACEHOLDER_REGEX = this.createPlaceholderRegex(cfg.namedPlaceholderTypes, this.createStringPattern(cfg.stringTypes));
      }
      Tokenizer2.prototype.createLineCommentRegex = function createLineCommentRegex(lineCommentTypes) {
        return new RegExp("^((?:" + lineCommentTypes.map(function(c) {
          return (0, _escapeRegExp2["default"])(c);
        }).join("|") + ").*?(?:\n|$))");
      };
      Tokenizer2.prototype.createReservedWordRegex = function createReservedWordRegex(reservedWords) {
        var reservedWordsPattern = reservedWords.join("|").replace(/ /g, "\\s+");
        return new RegExp("^(" + reservedWordsPattern + ")\\b", "i");
      };
      Tokenizer2.prototype.createWordRegex = function createWordRegex() {
        var specialChars = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
        return new RegExp("^([\\w" + specialChars.join("") + "]+)");
      };
      Tokenizer2.prototype.createStringRegex = function createStringRegex(stringTypes) {
        return new RegExp("^(" + this.createStringPattern(stringTypes) + ")");
      };
      Tokenizer2.prototype.createStringPattern = function createStringPattern(stringTypes) {
        var patterns = {
          "``": "((`[^`]*($|`))+)",
          "[]": "((\\[[^\\]]*($|\\]))(\\][^\\]]*($|\\]))*)",
          '""': '(("[^"\\\\]*(?:\\\\.[^"\\\\]*)*("|$))+)',
          "''": "(('[^'\\\\]*(?:\\\\.[^'\\\\]*)*('|$))+)",
          "N''": "((N'[^N'\\\\]*(?:\\\\.[^N'\\\\]*)*('|$))+)"
        };
        return stringTypes.map(function(t) {
          return patterns[t];
        }).join("|");
      };
      Tokenizer2.prototype.createParenRegex = function createParenRegex(parens) {
        var _this = this;
        return new RegExp("^(" + parens.map(function(p) {
          return _this.escapeParen(p);
        }).join("|") + ")", "i");
      };
      Tokenizer2.prototype.escapeParen = function escapeParen(paren) {
        if (paren.length === 1) {
          return (0, _escapeRegExp2["default"])(paren);
        } else {
          return "\\b" + paren + "\\b";
        }
      };
      Tokenizer2.prototype.createPlaceholderRegex = function createPlaceholderRegex(types, pattern) {
        if ((0, _isEmpty2["default"])(types)) {
          return false;
        }
        var typesRegex = types.map(_escapeRegExp2["default"]).join("|");
        return new RegExp("^((?:" + typesRegex + ")(?:" + pattern + "))");
      };
      Tokenizer2.prototype.tokenize = function tokenize(input) {
        var tokens = [];
        var token = void 0;
        while (input.length) {
          token = this.getNextToken(input, token);
          input = input.substring(token.value.length);
          tokens.push(token);
        }
        return tokens;
      };
      Tokenizer2.prototype.getNextToken = function getNextToken(input, previousToken) {
        return this.getWhitespaceToken(input) || this.getCommentToken(input) || this.getStringToken(input) || this.getOpenParenToken(input) || this.getCloseParenToken(input) || this.getPlaceholderToken(input) || this.getNumberToken(input) || this.getReservedWordToken(input, previousToken) || this.getWordToken(input) || this.getOperatorToken(input);
      };
      Tokenizer2.prototype.getWhitespaceToken = function getWhitespaceToken(input) {
        return this.getTokenOnFirstMatch({
          input,
          type: _tokenTypes2["default"].WHITESPACE,
          regex: this.WHITESPACE_REGEX
        });
      };
      Tokenizer2.prototype.getCommentToken = function getCommentToken(input) {
        return this.getLineCommentToken(input) || this.getBlockCommentToken(input);
      };
      Tokenizer2.prototype.getLineCommentToken = function getLineCommentToken(input) {
        return this.getTokenOnFirstMatch({
          input,
          type: _tokenTypes2["default"].LINE_COMMENT,
          regex: this.LINE_COMMENT_REGEX
        });
      };
      Tokenizer2.prototype.getBlockCommentToken = function getBlockCommentToken(input) {
        return this.getTokenOnFirstMatch({
          input,
          type: _tokenTypes2["default"].BLOCK_COMMENT,
          regex: this.BLOCK_COMMENT_REGEX
        });
      };
      Tokenizer2.prototype.getStringToken = function getStringToken(input) {
        return this.getTokenOnFirstMatch({
          input,
          type: _tokenTypes2["default"].STRING,
          regex: this.STRING_REGEX
        });
      };
      Tokenizer2.prototype.getOpenParenToken = function getOpenParenToken(input) {
        return this.getTokenOnFirstMatch({
          input,
          type: _tokenTypes2["default"].OPEN_PAREN,
          regex: this.OPEN_PAREN_REGEX
        });
      };
      Tokenizer2.prototype.getCloseParenToken = function getCloseParenToken(input) {
        return this.getTokenOnFirstMatch({
          input,
          type: _tokenTypes2["default"].CLOSE_PAREN,
          regex: this.CLOSE_PAREN_REGEX
        });
      };
      Tokenizer2.prototype.getPlaceholderToken = function getPlaceholderToken(input) {
        return this.getIdentNamedPlaceholderToken(input) || this.getStringNamedPlaceholderToken(input) || this.getIndexedPlaceholderToken(input);
      };
      Tokenizer2.prototype.getIdentNamedPlaceholderToken = function getIdentNamedPlaceholderToken(input) {
        return this.getPlaceholderTokenWithKey({
          input,
          regex: this.IDENT_NAMED_PLACEHOLDER_REGEX,
          parseKey: function parseKey(v) {
            return v.slice(1);
          }
        });
      };
      Tokenizer2.prototype.getStringNamedPlaceholderToken = function getStringNamedPlaceholderToken(input) {
        var _this2 = this;
        return this.getPlaceholderTokenWithKey({
          input,
          regex: this.STRING_NAMED_PLACEHOLDER_REGEX,
          parseKey: function parseKey(v) {
            return _this2.getEscapedPlaceholderKey({ key: v.slice(2, -1), quoteChar: v.slice(-1) });
          }
        });
      };
      Tokenizer2.prototype.getIndexedPlaceholderToken = function getIndexedPlaceholderToken(input) {
        return this.getPlaceholderTokenWithKey({
          input,
          regex: this.INDEXED_PLACEHOLDER_REGEX,
          parseKey: function parseKey(v) {
            return v.slice(1);
          }
        });
      };
      Tokenizer2.prototype.getPlaceholderTokenWithKey = function getPlaceholderTokenWithKey(_ref) {
        var input = _ref.input, regex = _ref.regex, parseKey = _ref.parseKey;
        var token = this.getTokenOnFirstMatch({ input, regex, type: _tokenTypes2["default"].PLACEHOLDER });
        if (token) {
          token.key = parseKey(token.value);
        }
        return token;
      };
      Tokenizer2.prototype.getEscapedPlaceholderKey = function getEscapedPlaceholderKey(_ref2) {
        var key = _ref2.key, quoteChar = _ref2.quoteChar;
        return key.replace(new RegExp((0, _escapeRegExp2["default"])("\\") + quoteChar, "g"), quoteChar);
      };
      Tokenizer2.prototype.getNumberToken = function getNumberToken(input) {
        return this.getTokenOnFirstMatch({
          input,
          type: _tokenTypes2["default"].NUMBER,
          regex: this.NUMBER_REGEX
        });
      };
      Tokenizer2.prototype.getOperatorToken = function getOperatorToken(input) {
        return this.getTokenOnFirstMatch({
          input,
          type: _tokenTypes2["default"].OPERATOR,
          regex: this.OPERATOR_REGEX
        });
      };
      Tokenizer2.prototype.getReservedWordToken = function getReservedWordToken(input, previousToken) {
        if (previousToken && previousToken.value && previousToken.value === ".") {
          return;
        }
        return this.getToplevelReservedToken(input) || this.getNewlineReservedToken(input) || this.getPlainReservedToken(input);
      };
      Tokenizer2.prototype.getToplevelReservedToken = function getToplevelReservedToken(input) {
        return this.getTokenOnFirstMatch({
          input,
          type: _tokenTypes2["default"].RESERVED_TOPLEVEL,
          regex: this.RESERVED_TOPLEVEL_REGEX
        });
      };
      Tokenizer2.prototype.getNewlineReservedToken = function getNewlineReservedToken(input) {
        return this.getTokenOnFirstMatch({
          input,
          type: _tokenTypes2["default"].RESERVED_NEWLINE,
          regex: this.RESERVED_NEWLINE_REGEX
        });
      };
      Tokenizer2.prototype.getPlainReservedToken = function getPlainReservedToken(input) {
        return this.getTokenOnFirstMatch({
          input,
          type: _tokenTypes2["default"].RESERVED,
          regex: this.RESERVED_PLAIN_REGEX
        });
      };
      Tokenizer2.prototype.getWordToken = function getWordToken(input) {
        return this.getTokenOnFirstMatch({
          input,
          type: _tokenTypes2["default"].WORD,
          regex: this.WORD_REGEX
        });
      };
      Tokenizer2.prototype.getTokenOnFirstMatch = function getTokenOnFirstMatch(_ref3) {
        var input = _ref3.input, type = _ref3.type, regex = _ref3.regex;
        var matches = input.match(regex);
        if (matches) {
          return { type, value: matches[1] };
        }
      };
      return Tokenizer2;
    }();
    exports["default"] = Tokenizer;
    module2.exports = exports["default"];
  }
});

// plugins/public/node_modules/sql-formatter/lib/languages/Db2Formatter.js
var require_Db2Formatter = __commonJS({
  "plugins/public/node_modules/sql-formatter/lib/languages/Db2Formatter.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    var _Formatter = require_Formatter();
    var _Formatter2 = _interopRequireDefault(_Formatter);
    var _Tokenizer = require_Tokenizer();
    var _Tokenizer2 = _interopRequireDefault(_Tokenizer);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var reservedWords = ["ABS", "ACTIVATE", "ALIAS", "ALL", "ALLOCATE", "ALLOW", "ALTER", "ANY", "ARE", "ARRAY", "AS", "ASC", "ASENSITIVE", "ASSOCIATE", "ASUTIME", "ASYMMETRIC", "AT", "ATOMIC", "ATTRIBUTES", "AUDIT", "AUTHORIZATION", "AUX", "AUXILIARY", "AVG", "BEFORE", "BEGIN", "BETWEEN", "BIGINT", "BINARY", "BLOB", "BOOLEAN", "BOTH", "BUFFERPOOL", "BY", "CACHE", "CALL", "CALLED", "CAPTURE", "CARDINALITY", "CASCADED", "CASE", "CAST", "CCSID", "CEIL", "CEILING", "CHAR", "CHARACTER", "CHARACTER_LENGTH", "CHAR_LENGTH", "CHECK", "CLOB", "CLONE", "CLOSE", "CLUSTER", "COALESCE", "COLLATE", "COLLECT", "COLLECTION", "COLLID", "COLUMN", "COMMENT", "COMMIT", "CONCAT", "CONDITION", "CONNECT", "CONNECTION", "CONSTRAINT", "CONTAINS", "CONTINUE", "CONVERT", "CORR", "CORRESPONDING", "COUNT", "COUNT_BIG", "COVAR_POP", "COVAR_SAMP", "CREATE", "CROSS", "CUBE", "CUME_DIST", "CURRENT", "CURRENT_DATE", "CURRENT_DEFAULT_TRANSFORM_GROUP", "CURRENT_LC_CTYPE", "CURRENT_PATH", "CURRENT_ROLE", "CURRENT_SCHEMA", "CURRENT_SERVER", "CURRENT_TIME", "CURRENT_TIMESTAMP", "CURRENT_TIMEZONE", "CURRENT_TRANSFORM_GROUP_FOR_TYPE", "CURRENT_USER", "CURSOR", "CYCLE", "DATA", "DATABASE", "DATAPARTITIONNAME", "DATAPARTITIONNUM", "DATE", "DAY", "DAYS", "DB2GENERAL", "DB2GENRL", "DB2SQL", "DBINFO", "DBPARTITIONNAME", "DBPARTITIONNUM", "DEALLOCATE", "DEC", "DECIMAL", "DECLARE", "DEFAULT", "DEFAULTS", "DEFINITION", "DELETE", "DENSERANK", "DENSE_RANK", "DEREF", "DESCRIBE", "DESCRIPTOR", "DETERMINISTIC", "DIAGNOSTICS", "DISABLE", "DISALLOW", "DISCONNECT", "DISTINCT", "DO", "DOCUMENT", "DOUBLE", "DROP", "DSSIZE", "DYNAMIC", "EACH", "EDITPROC", "ELEMENT", "ELSE", "ELSEIF", "ENABLE", "ENCODING", "ENCRYPTION", "END", "END-EXEC", "ENDING", "ERASE", "ESCAPE", "EVERY", "EXCEPTION", "EXCLUDING", "EXCLUSIVE", "EXEC", "EXECUTE", "EXISTS", "EXIT", "EXP", "EXPLAIN", "EXTENDED", "EXTERNAL", "EXTRACT", "FALSE", "FENCED", "FETCH", "FIELDPROC", "FILE", "FILTER", "FINAL", "FIRST", "FLOAT", "FLOOR", "FOR", "FOREIGN", "FREE", "FULL", "FUNCTION", "FUSION", "GENERAL", "GENERATED", "GET", "GLOBAL", "GOTO", "GRANT", "GRAPHIC", "GROUP", "GROUPING", "HANDLER", "HASH", "HASHED_VALUE", "HINT", "HOLD", "HOUR", "HOURS", "IDENTITY", "IF", "IMMEDIATE", "IN", "INCLUDING", "INCLUSIVE", "INCREMENT", "INDEX", "INDICATOR", "INDICATORS", "INF", "INFINITY", "INHERIT", "INNER", "INOUT", "INSENSITIVE", "INSERT", "INT", "INTEGER", "INTEGRITY", "INTERSECTION", "INTERVAL", "INTO", "IS", "ISOBID", "ISOLATION", "ITERATE", "JAR", "JAVA", "KEEP", "KEY", "LABEL", "LANGUAGE", "LARGE", "LATERAL", "LC_CTYPE", "LEADING", "LEAVE", "LEFT", "LIKE", "LINKTYPE", "LN", "LOCAL", "LOCALDATE", "LOCALE", "LOCALTIME", "LOCALTIMESTAMP", "LOCATOR", "LOCATORS", "LOCK", "LOCKMAX", "LOCKSIZE", "LONG", "LOOP", "LOWER", "MAINTAINED", "MATCH", "MATERIALIZED", "MAX", "MAXVALUE", "MEMBER", "MERGE", "METHOD", "MICROSECOND", "MICROSECONDS", "MIN", "MINUTE", "MINUTES", "MINVALUE", "MOD", "MODE", "MODIFIES", "MODULE", "MONTH", "MONTHS", "MULTISET", "NAN", "NATIONAL", "NATURAL", "NCHAR", "NCLOB", "NEW", "NEW_TABLE", "NEXTVAL", "NO", "NOCACHE", "NOCYCLE", "NODENAME", "NODENUMBER", "NOMAXVALUE", "NOMINVALUE", "NONE", "NOORDER", "NORMALIZE", "NORMALIZED", "NOT", "NULL", "NULLIF", "NULLS", "NUMERIC", "NUMPARTS", "OBID", "OCTET_LENGTH", "OF", "OFFSET", "OLD", "OLD_TABLE", "ON", "ONLY", "OPEN", "OPTIMIZATION", "OPTIMIZE", "OPTION", "ORDER", "OUT", "OUTER", "OVER", "OVERLAPS", "OVERLAY", "OVERRIDING", "PACKAGE", "PADDED", "PAGESIZE", "PARAMETER", "PART", "PARTITION", "PARTITIONED", "PARTITIONING", "PARTITIONS", "PASSWORD", "PATH", "PERCENTILE_CONT", "PERCENTILE_DISC", "PERCENT_RANK", "PIECESIZE", "PLAN", "POSITION", "POWER", "PRECISION", "PREPARE", "PREVVAL", "PRIMARY", "PRIQTY", "PRIVILEGES", "PROCEDURE", "PROGRAM", "PSID", "PUBLIC", "QUERY", "QUERYNO", "RANGE", "RANK", "READ", "READS", "REAL", "RECOVERY", "RECURSIVE", "REF", "REFERENCES", "REFERENCING", "REFRESH", "REGR_AVGX", "REGR_AVGY", "REGR_COUNT", "REGR_INTERCEPT", "REGR_R2", "REGR_SLOPE", "REGR_SXX", "REGR_SXY", "REGR_SYY", "RELEASE", "RENAME", "REPEAT", "RESET", "RESIGNAL", "RESTART", "RESTRICT", "RESULT", "RESULT_SET_LOCATOR", "RETURN", "RETURNS", "REVOKE", "RIGHT", "ROLE", "ROLLBACK", "ROLLUP", "ROUND_CEILING", "ROUND_DOWN", "ROUND_FLOOR", "ROUND_HALF_DOWN", "ROUND_HALF_EVEN", "ROUND_HALF_UP", "ROUND_UP", "ROUTINE", "ROW", "ROWNUMBER", "ROWS", "ROWSET", "ROW_NUMBER", "RRN", "RUN", "SAVEPOINT", "SCHEMA", "SCOPE", "SCRATCHPAD", "SCROLL", "SEARCH", "SECOND", "SECONDS", "SECQTY", "SECURITY", "SENSITIVE", "SEQUENCE", "SESSION", "SESSION_USER", "SIGNAL", "SIMILAR", "SIMPLE", "SMALLINT", "SNAN", "SOME", "SOURCE", "SPECIFIC", "SPECIFICTYPE", "SQL", "SQLEXCEPTION", "SQLID", "SQLSTATE", "SQLWARNING", "SQRT", "STACKED", "STANDARD", "START", "STARTING", "STATEMENT", "STATIC", "STATMENT", "STAY", "STDDEV_POP", "STDDEV_SAMP", "STOGROUP", "STORES", "STYLE", "SUBMULTISET", "SUBSTRING", "SUM", "SUMMARY", "SYMMETRIC", "SYNONYM", "SYSFUN", "SYSIBM", "SYSPROC", "SYSTEM", "SYSTEM_USER", "TABLE", "TABLESAMPLE", "TABLESPACE", "THEN", "TIME", "TIMESTAMP", "TIMEZONE_HOUR", "TIMEZONE_MINUTE", "TO", "TRAILING", "TRANSACTION", "TRANSLATE", "TRANSLATION", "TREAT", "TRIGGER", "TRIM", "TRUE", "TRUNCATE", "TYPE", "UESCAPE", "UNDO", "UNIQUE", "UNKNOWN", "UNNEST", "UNTIL", "UPPER", "USAGE", "USER", "USING", "VALIDPROC", "VALUE", "VARCHAR", "VARIABLE", "VARIANT", "VARYING", "VAR_POP", "VAR_SAMP", "VCAT", "VERSION", "VIEW", "VOLATILE", "VOLUMES", "WHEN", "WHENEVER", "WHILE", "WIDTH_BUCKET", "WINDOW", "WITH", "WITHIN", "WITHOUT", "WLM", "WRITE", "XMLELEMENT", "XMLEXISTS", "XMLNAMESPACES", "YEAR", "YEARS"];
    var reservedToplevelWords = ["ADD", "AFTER", "ALTER COLUMN", "ALTER TABLE", "DELETE FROM", "EXCEPT", "FETCH FIRST", "FROM", "GROUP BY", "GO", "HAVING", "INSERT INTO", "INTERSECT", "LIMIT", "ORDER BY", "SELECT", "SET CURRENT SCHEMA", "SET SCHEMA", "SET", "UNION ALL", "UPDATE", "VALUES", "WHERE"];
    var reservedNewlineWords = ["AND", "CROSS JOIN", "INNER JOIN", "JOIN", "LEFT JOIN", "LEFT OUTER JOIN", "OR", "OUTER JOIN", "RIGHT JOIN", "RIGHT OUTER JOIN"];
    var tokenizer = void 0;
    var Db2Formatter = function() {
      function Db2Formatter2(cfg) {
        _classCallCheck(this, Db2Formatter2);
        this.cfg = cfg;
      }
      Db2Formatter2.prototype.format = function format(query) {
        if (!tokenizer) {
          tokenizer = new _Tokenizer2["default"]({
            reservedWords,
            reservedToplevelWords,
            reservedNewlineWords,
            stringTypes: ['""', "''", "``", "[]"],
            openParens: ["("],
            closeParens: [")"],
            indexedPlaceholderTypes: ["?"],
            namedPlaceholderTypes: [":"],
            lineCommentTypes: ["--"],
            specialWordChars: ["#", "@"]
          });
        }
        return new _Formatter2["default"](this.cfg, tokenizer).format(query);
      };
      return Db2Formatter2;
    }();
    exports["default"] = Db2Formatter;
    module2.exports = exports["default"];
  }
});

// plugins/public/node_modules/sql-formatter/lib/languages/N1qlFormatter.js
var require_N1qlFormatter = __commonJS({
  "plugins/public/node_modules/sql-formatter/lib/languages/N1qlFormatter.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    var _Formatter = require_Formatter();
    var _Formatter2 = _interopRequireDefault(_Formatter);
    var _Tokenizer = require_Tokenizer();
    var _Tokenizer2 = _interopRequireDefault(_Tokenizer);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var reservedWords = ["ALL", "ALTER", "ANALYZE", "AND", "ANY", "ARRAY", "AS", "ASC", "BEGIN", "BETWEEN", "BINARY", "BOOLEAN", "BREAK", "BUCKET", "BUILD", "BY", "CALL", "CASE", "CAST", "CLUSTER", "COLLATE", "COLLECTION", "COMMIT", "CONNECT", "CONTINUE", "CORRELATE", "COVER", "CREATE", "DATABASE", "DATASET", "DATASTORE", "DECLARE", "DECREMENT", "DELETE", "DERIVED", "DESC", "DESCRIBE", "DISTINCT", "DO", "DROP", "EACH", "ELEMENT", "ELSE", "END", "EVERY", "EXCEPT", "EXCLUDE", "EXECUTE", "EXISTS", "EXPLAIN", "FALSE", "FETCH", "FIRST", "FLATTEN", "FOR", "FORCE", "FROM", "FUNCTION", "GRANT", "GROUP", "GSI", "HAVING", "IF", "IGNORE", "ILIKE", "IN", "INCLUDE", "INCREMENT", "INDEX", "INFER", "INLINE", "INNER", "INSERT", "INTERSECT", "INTO", "IS", "JOIN", "KEY", "KEYS", "KEYSPACE", "KNOWN", "LAST", "LEFT", "LET", "LETTING", "LIKE", "LIMIT", "LSM", "MAP", "MAPPING", "MATCHED", "MATERIALIZED", "MERGE", "MINUS", "MISSING", "NAMESPACE", "NEST", "NOT", "NULL", "NUMBER", "OBJECT", "OFFSET", "ON", "OPTION", "OR", "ORDER", "OUTER", "OVER", "PARSE", "PARTITION", "PASSWORD", "PATH", "POOL", "PREPARE", "PRIMARY", "PRIVATE", "PRIVILEGE", "PROCEDURE", "PUBLIC", "RAW", "REALM", "REDUCE", "RENAME", "RETURN", "RETURNING", "REVOKE", "RIGHT", "ROLE", "ROLLBACK", "SATISFIES", "SCHEMA", "SELECT", "SELF", "SEMI", "SET", "SHOW", "SOME", "START", "STATISTICS", "STRING", "SYSTEM", "THEN", "TO", "TRANSACTION", "TRIGGER", "TRUE", "TRUNCATE", "UNDER", "UNION", "UNIQUE", "UNKNOWN", "UNNEST", "UNSET", "UPDATE", "UPSERT", "USE", "USER", "USING", "VALIDATE", "VALUE", "VALUED", "VALUES", "VIA", "VIEW", "WHEN", "WHERE", "WHILE", "WITH", "WITHIN", "WORK", "XOR"];
    var reservedToplevelWords = ["DELETE FROM", "EXCEPT ALL", "EXCEPT", "EXPLAIN DELETE FROM", "EXPLAIN UPDATE", "EXPLAIN UPSERT", "FROM", "GROUP BY", "HAVING", "INFER", "INSERT INTO", "INTERSECT ALL", "INTERSECT", "LET", "LIMIT", "MERGE", "NEST", "ORDER BY", "PREPARE", "SELECT", "SET CURRENT SCHEMA", "SET SCHEMA", "SET", "UNION ALL", "UNION", "UNNEST", "UPDATE", "UPSERT", "USE KEYS", "VALUES", "WHERE"];
    var reservedNewlineWords = ["AND", "INNER JOIN", "JOIN", "LEFT JOIN", "LEFT OUTER JOIN", "OR", "OUTER JOIN", "RIGHT JOIN", "RIGHT OUTER JOIN", "XOR"];
    var tokenizer = void 0;
    var N1qlFormatter = function() {
      function N1qlFormatter2(cfg) {
        _classCallCheck(this, N1qlFormatter2);
        this.cfg = cfg;
      }
      N1qlFormatter2.prototype.format = function format(query) {
        if (!tokenizer) {
          tokenizer = new _Tokenizer2["default"]({
            reservedWords,
            reservedToplevelWords,
            reservedNewlineWords,
            stringTypes: ['""', "''", "``"],
            openParens: ["(", "[", "{"],
            closeParens: [")", "]", "}"],
            namedPlaceholderTypes: ["$"],
            lineCommentTypes: ["#", "--"]
          });
        }
        return new _Formatter2["default"](this.cfg, tokenizer).format(query);
      };
      return N1qlFormatter2;
    }();
    exports["default"] = N1qlFormatter;
    module2.exports = exports["default"];
  }
});

// plugins/public/node_modules/sql-formatter/lib/languages/PlSqlFormatter.js
var require_PlSqlFormatter = __commonJS({
  "plugins/public/node_modules/sql-formatter/lib/languages/PlSqlFormatter.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    var _Formatter = require_Formatter();
    var _Formatter2 = _interopRequireDefault(_Formatter);
    var _Tokenizer = require_Tokenizer();
    var _Tokenizer2 = _interopRequireDefault(_Tokenizer);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var reservedWords = ["A", "ACCESSIBLE", "AGENT", "AGGREGATE", "ALL", "ALTER", "ANY", "ARRAY", "AS", "ASC", "AT", "ATTRIBUTE", "AUTHID", "AVG", "BETWEEN", "BFILE_BASE", "BINARY_INTEGER", "BINARY", "BLOB_BASE", "BLOCK", "BODY", "BOOLEAN", "BOTH", "BOUND", "BULK", "BY", "BYTE", "C", "CALL", "CALLING", "CASCADE", "CASE", "CHAR_BASE", "CHAR", "CHARACTER", "CHARSET", "CHARSETFORM", "CHARSETID", "CHECK", "CLOB_BASE", "CLONE", "CLOSE", "CLUSTER", "CLUSTERS", "COALESCE", "COLAUTH", "COLLECT", "COLUMNS", "COMMENT", "COMMIT", "COMMITTED", "COMPILED", "COMPRESS", "CONNECT", "CONSTANT", "CONSTRUCTOR", "CONTEXT", "CONTINUE", "CONVERT", "COUNT", "CRASH", "CREATE", "CREDENTIAL", "CURRENT", "CURRVAL", "CURSOR", "CUSTOMDATUM", "DANGLING", "DATA", "DATE_BASE", "DATE", "DAY", "DECIMAL", "DEFAULT", "DEFINE", "DELETE", "DESC", "DETERMINISTIC", "DIRECTORY", "DISTINCT", "DO", "DOUBLE", "DROP", "DURATION", "ELEMENT", "ELSIF", "EMPTY", "ESCAPE", "EXCEPTIONS", "EXCLUSIVE", "EXECUTE", "EXISTS", "EXIT", "EXTENDS", "EXTERNAL", "EXTRACT", "FALSE", "FETCH", "FINAL", "FIRST", "FIXED", "FLOAT", "FOR", "FORALL", "FORCE", "FROM", "FUNCTION", "GENERAL", "GOTO", "GRANT", "GROUP", "HASH", "HEAP", "HIDDEN", "HOUR", "IDENTIFIED", "IF", "IMMEDIATE", "IN", "INCLUDING", "INDEX", "INDEXES", "INDICATOR", "INDICES", "INFINITE", "INSTANTIABLE", "INT", "INTEGER", "INTERFACE", "INTERVAL", "INTO", "INVALIDATE", "IS", "ISOLATION", "JAVA", "LANGUAGE", "LARGE", "LEADING", "LENGTH", "LEVEL", "LIBRARY", "LIKE", "LIKE2", "LIKE4", "LIKEC", "LIMITED", "LOCAL", "LOCK", "LONG", "MAP", "MAX", "MAXLEN", "MEMBER", "MERGE", "MIN", "MINUS", "MINUTE", "MLSLABEL", "MOD", "MODE", "MONTH", "MULTISET", "NAME", "NAN", "NATIONAL", "NATIVE", "NATURAL", "NATURALN", "NCHAR", "NEW", "NEXTVAL", "NOCOMPRESS", "NOCOPY", "NOT", "NOWAIT", "NULL", "NULLIF", "NUMBER_BASE", "NUMBER", "OBJECT", "OCICOLL", "OCIDATE", "OCIDATETIME", "OCIDURATION", "OCIINTERVAL", "OCILOBLOCATOR", "OCINUMBER", "OCIRAW", "OCIREF", "OCIREFCURSOR", "OCIROWID", "OCISTRING", "OCITYPE", "OF", "OLD", "ON", "ONLY", "OPAQUE", "OPEN", "OPERATOR", "OPTION", "ORACLE", "ORADATA", "ORDER", "ORGANIZATION", "ORLANY", "ORLVARY", "OTHERS", "OUT", "OVERLAPS", "OVERRIDING", "PACKAGE", "PARALLEL_ENABLE", "PARAMETER", "PARAMETERS", "PARENT", "PARTITION", "PASCAL", "PCTFREE", "PIPE", "PIPELINED", "PLS_INTEGER", "PLUGGABLE", "POSITIVE", "POSITIVEN", "PRAGMA", "PRECISION", "PRIOR", "PRIVATE", "PROCEDURE", "PUBLIC", "RAISE", "RANGE", "RAW", "READ", "REAL", "RECORD", "REF", "REFERENCE", "RELEASE", "RELIES_ON", "REM", "REMAINDER", "RENAME", "RESOURCE", "RESULT_CACHE", "RESULT", "RETURN", "RETURNING", "REVERSE", "REVOKE", "ROLLBACK", "ROW", "ROWID", "ROWNUM", "ROWTYPE", "SAMPLE", "SAVE", "SAVEPOINT", "SB1", "SB2", "SB4", "SECOND", "SEGMENT", "SELF", "SEPARATE", "SEQUENCE", "SERIALIZABLE", "SHARE", "SHORT", "SIZE_T", "SIZE", "SMALLINT", "SOME", "SPACE", "SPARSE", "SQL", "SQLCODE", "SQLDATA", "SQLERRM", "SQLNAME", "SQLSTATE", "STANDARD", "START", "STATIC", "STDDEV", "STORED", "STRING", "STRUCT", "STYLE", "SUBMULTISET", "SUBPARTITION", "SUBSTITUTABLE", "SUBTYPE", "SUCCESSFUL", "SUM", "SYNONYM", "SYSDATE", "TABAUTH", "TABLE", "TDO", "THE", "THEN", "TIME", "TIMESTAMP", "TIMEZONE_ABBR", "TIMEZONE_HOUR", "TIMEZONE_MINUTE", "TIMEZONE_REGION", "TO", "TRAILING", "TRANSACTION", "TRANSACTIONAL", "TRIGGER", "TRUE", "TRUSTED", "TYPE", "UB1", "UB2", "UB4", "UID", "UNDER", "UNIQUE", "UNPLUG", "UNSIGNED", "UNTRUSTED", "USE", "USER", "USING", "VALIDATE", "VALIST", "VALUE", "VARCHAR", "VARCHAR2", "VARIABLE", "VARIANCE", "VARRAY", "VARYING", "VIEW", "VIEWS", "VOID", "WHENEVER", "WHILE", "WITH", "WORK", "WRAPPED", "WRITE", "YEAR", "ZONE"];
    var reservedToplevelWords = ["ADD", "ALTER COLUMN", "ALTER TABLE", "BEGIN", "CONNECT BY", "DECLARE", "DELETE FROM", "DELETE", "END", "EXCEPT", "EXCEPTION", "FETCH FIRST", "FROM", "GROUP BY", "HAVING", "INSERT INTO", "INSERT", "INTERSECT", "LIMIT", "LOOP", "MODIFY", "ORDER BY", "SELECT", "SET CURRENT SCHEMA", "SET SCHEMA", "SET", "START WITH", "UNION ALL", "UNION", "UPDATE", "VALUES", "WHERE"];
    var reservedNewlineWords = ["AND", "CROSS APPLY", "CROSS JOIN", "ELSE", "END", "INNER JOIN", "JOIN", "LEFT JOIN", "LEFT OUTER JOIN", "OR", "OUTER APPLY", "OUTER JOIN", "RIGHT JOIN", "RIGHT OUTER JOIN", "WHEN", "XOR"];
    var tokenizer = void 0;
    var PlSqlFormatter = function() {
      function PlSqlFormatter2(cfg) {
        _classCallCheck(this, PlSqlFormatter2);
        this.cfg = cfg;
      }
      PlSqlFormatter2.prototype.format = function format(query) {
        if (!tokenizer) {
          tokenizer = new _Tokenizer2["default"]({
            reservedWords,
            reservedToplevelWords,
            reservedNewlineWords,
            stringTypes: ['""', "N''", "''", "``"],
            openParens: ["(", "CASE"],
            closeParens: [")", "END"],
            indexedPlaceholderTypes: ["?"],
            namedPlaceholderTypes: [":"],
            lineCommentTypes: ["--"],
            specialWordChars: ["_", "$", "#", ".", "@"]
          });
        }
        return new _Formatter2["default"](this.cfg, tokenizer).format(query);
      };
      return PlSqlFormatter2;
    }();
    exports["default"] = PlSqlFormatter;
    module2.exports = exports["default"];
  }
});

// plugins/public/node_modules/sql-formatter/lib/languages/StandardSqlFormatter.js
var require_StandardSqlFormatter = __commonJS({
  "plugins/public/node_modules/sql-formatter/lib/languages/StandardSqlFormatter.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    var _Formatter = require_Formatter();
    var _Formatter2 = _interopRequireDefault(_Formatter);
    var _Tokenizer = require_Tokenizer();
    var _Tokenizer2 = _interopRequireDefault(_Tokenizer);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var reservedWords = ["ACCESSIBLE", "ACTION", "AGAINST", "AGGREGATE", "ALGORITHM", "ALL", "ALTER", "ANALYSE", "ANALYZE", "AS", "ASC", "AUTOCOMMIT", "AUTO_INCREMENT", "BACKUP", "BEGIN", "BETWEEN", "BINLOG", "BOTH", "CASCADE", "CASE", "CHANGE", "CHANGED", "CHARACTER SET", "CHARSET", "CHECK", "CHECKSUM", "COLLATE", "COLLATION", "COLUMN", "COLUMNS", "COMMENT", "COMMIT", "COMMITTED", "COMPRESSED", "CONCURRENT", "CONSTRAINT", "CONTAINS", "CONVERT", "CREATE", "CROSS", "CURRENT_TIMESTAMP", "DATABASE", "DATABASES", "DAY", "DAY_HOUR", "DAY_MINUTE", "DAY_SECOND", "DEFAULT", "DEFINER", "DELAYED", "DELETE", "DESC", "DESCRIBE", "DETERMINISTIC", "DISTINCT", "DISTINCTROW", "DIV", "DO", "DROP", "DUMPFILE", "DUPLICATE", "DYNAMIC", "ELSE", "ENCLOSED", "END", "ENGINE", "ENGINES", "ENGINE_TYPE", "ESCAPE", "ESCAPED", "EVENTS", "EXEC", "EXECUTE", "EXISTS", "EXPLAIN", "EXTENDED", "FAST", "FETCH", "FIELDS", "FILE", "FIRST", "FIXED", "FLUSH", "FOR", "FORCE", "FOREIGN", "FULL", "FULLTEXT", "FUNCTION", "GLOBAL", "GRANT", "GRANTS", "GROUP_CONCAT", "HEAP", "HIGH_PRIORITY", "HOSTS", "HOUR", "HOUR_MINUTE", "HOUR_SECOND", "IDENTIFIED", "IF", "IFNULL", "IGNORE", "IN", "INDEX", "INDEXES", "INFILE", "INSERT", "INSERT_ID", "INSERT_METHOD", "INTERVAL", "INTO", "INVOKER", "IS", "ISOLATION", "KEY", "KEYS", "KILL", "LAST_INSERT_ID", "LEADING", "LEVEL", "LIKE", "LINEAR", "LINES", "LOAD", "LOCAL", "LOCK", "LOCKS", "LOGS", "LOW_PRIORITY", "MARIA", "MASTER", "MASTER_CONNECT_RETRY", "MASTER_HOST", "MASTER_LOG_FILE", "MATCH", "MAX_CONNECTIONS_PER_HOUR", "MAX_QUERIES_PER_HOUR", "MAX_ROWS", "MAX_UPDATES_PER_HOUR", "MAX_USER_CONNECTIONS", "MEDIUM", "MERGE", "MINUTE", "MINUTE_SECOND", "MIN_ROWS", "MODE", "MODIFY", "MONTH", "MRG_MYISAM", "MYISAM", "NAMES", "NATURAL", "NOT", "NOW()", "NULL", "OFFSET", "ON DELETE", "ON UPDATE", "ON", "ONLY", "OPEN", "OPTIMIZE", "OPTION", "OPTIONALLY", "OUTFILE", "PACK_KEYS", "PAGE", "PARTIAL", "PARTITION", "PARTITIONS", "PASSWORD", "PRIMARY", "PRIVILEGES", "PROCEDURE", "PROCESS", "PROCESSLIST", "PURGE", "QUICK", "RAID0", "RAID_CHUNKS", "RAID_CHUNKSIZE", "RAID_TYPE", "RANGE", "READ", "READ_ONLY", "READ_WRITE", "REFERENCES", "REGEXP", "RELOAD", "RENAME", "REPAIR", "REPEATABLE", "REPLACE", "REPLICATION", "RESET", "RESTORE", "RESTRICT", "RETURN", "RETURNS", "REVOKE", "RLIKE", "ROLLBACK", "ROW", "ROWS", "ROW_FORMAT", "SECOND", "SECURITY", "SEPARATOR", "SERIALIZABLE", "SESSION", "SHARE", "SHOW", "SHUTDOWN", "SLAVE", "SONAME", "SOUNDS", "SQL", "SQL_AUTO_IS_NULL", "SQL_BIG_RESULT", "SQL_BIG_SELECTS", "SQL_BIG_TABLES", "SQL_BUFFER_RESULT", "SQL_CACHE", "SQL_CALC_FOUND_ROWS", "SQL_LOG_BIN", "SQL_LOG_OFF", "SQL_LOG_UPDATE", "SQL_LOW_PRIORITY_UPDATES", "SQL_MAX_JOIN_SIZE", "SQL_NO_CACHE", "SQL_QUOTE_SHOW_CREATE", "SQL_SAFE_UPDATES", "SQL_SELECT_LIMIT", "SQL_SLAVE_SKIP_COUNTER", "SQL_SMALL_RESULT", "SQL_WARNINGS", "START", "STARTING", "STATUS", "STOP", "STORAGE", "STRAIGHT_JOIN", "STRING", "STRIPED", "SUPER", "TABLE", "TABLES", "TEMPORARY", "TERMINATED", "THEN", "TO", "TRAILING", "TRANSACTIONAL", "TRUE", "TRUNCATE", "TYPE", "TYPES", "UNCOMMITTED", "UNIQUE", "UNLOCK", "UNSIGNED", "USAGE", "USE", "USING", "VARIABLES", "VIEW", "WHEN", "WITH", "WORK", "WRITE", "YEAR_MONTH"];
    var reservedToplevelWords = ["ADD", "AFTER", "ALTER COLUMN", "ALTER TABLE", "DELETE FROM", "EXCEPT", "FETCH FIRST", "FROM", "GROUP BY", "GO", "HAVING", "INSERT INTO", "INSERT", "INTERSECT", "LIMIT", "MODIFY", "ORDER BY", "SELECT", "SET CURRENT SCHEMA", "SET SCHEMA", "SET", "UNION ALL", "UNION", "UPDATE", "VALUES", "WHERE"];
    var reservedNewlineWords = ["AND", "CROSS APPLY", "CROSS JOIN", "ELSE", "INNER JOIN", "JOIN", "LEFT JOIN", "LEFT OUTER JOIN", "OR", "OUTER APPLY", "OUTER JOIN", "RIGHT JOIN", "RIGHT OUTER JOIN", "WHEN", "XOR"];
    var tokenizer = void 0;
    var StandardSqlFormatter = function() {
      function StandardSqlFormatter2(cfg) {
        _classCallCheck(this, StandardSqlFormatter2);
        this.cfg = cfg;
      }
      StandardSqlFormatter2.prototype.format = function format(query) {
        if (!tokenizer) {
          tokenizer = new _Tokenizer2["default"]({
            reservedWords,
            reservedToplevelWords,
            reservedNewlineWords,
            stringTypes: ['""', "N''", "''", "``", "[]"],
            openParens: ["(", "CASE"],
            closeParens: [")", "END"],
            indexedPlaceholderTypes: ["?"],
            namedPlaceholderTypes: ["@", ":"],
            lineCommentTypes: ["#", "--"]
          });
        }
        return new _Formatter2["default"](this.cfg, tokenizer).format(query);
      };
      return StandardSqlFormatter2;
    }();
    exports["default"] = StandardSqlFormatter;
    module2.exports = exports["default"];
  }
});

// plugins/public/node_modules/sql-formatter/lib/sqlFormatter.js
var require_sqlFormatter = __commonJS({
  "plugins/public/node_modules/sql-formatter/lib/sqlFormatter.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    var _Db2Formatter = require_Db2Formatter();
    var _Db2Formatter2 = _interopRequireDefault(_Db2Formatter);
    var _N1qlFormatter = require_N1qlFormatter();
    var _N1qlFormatter2 = _interopRequireDefault(_N1qlFormatter);
    var _PlSqlFormatter = require_PlSqlFormatter();
    var _PlSqlFormatter2 = _interopRequireDefault(_PlSqlFormatter);
    var _StandardSqlFormatter = require_StandardSqlFormatter();
    var _StandardSqlFormatter2 = _interopRequireDefault(_StandardSqlFormatter);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    exports["default"] = {
      format: function format(query, cfg) {
        cfg = cfg || {};
        switch (cfg.language) {
          case "db2":
            return new _Db2Formatter2["default"](cfg).format(query);
          case "n1ql":
            return new _N1qlFormatter2["default"](cfg).format(query);
          case "pl/sql":
            return new _PlSqlFormatter2["default"](cfg).format(query);
          case "sql":
          case void 0:
            return new _StandardSqlFormatter2["default"](cfg).format(query);
          default:
            throw Error("Unsupported SQL dialect: " + cfg.language);
        }
      }
    };
    module2.exports = exports["default"];
  }
});

// plugins/public/databases/index.tsx
var databases_exports = {};
__export(databases_exports, {
  Component: () => Component,
  plugin: () => plugin
});
module.exports = __toCommonJS(databases_exports);
var import_dateformat = __toESM(require_dateformat());
var import_flipper_plugin5 = require("flipper-plugin");

// plugins/public/databases/DatabasesPlugin.tsx
var import_flipper = require("flipper");

// plugins/public/databases/utils.tsx
function getStringFromErrorLike(e) {
  if (Array.isArray(e)) {
    return e.map(getStringFromErrorLike).join(" ");
  } else if (typeof e == "string") {
    return e;
  } else if (e instanceof Error) {
    return e.message || e.toString();
  } else {
    try {
      return JSON.stringify(e);
    } catch (e2) {
      return `${e2}`;
    }
  }
}

// plugins/public/databases/TypeBasedValueRenderer.tsx
var import_flipper_plugin = require("flipper-plugin");
var import_antd = require("antd");
var import_react = __toESM(require("react"));
var { Text } = import_antd.Typography;
var WrappingText = (0, import_flipper_plugin.styled)(Text)({
  wordWrap: "break-word",
  width: "100%",
  lineHeight: "125%",
  padding: "3px 0"
});
WrappingText.displayName = "TypeBasedValueRenderer:WrappingText";
var NonWrappingText = (0, import_flipper_plugin.styled)(Text)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
});
NonWrappingText.displayName = "TypeBasedValueRenderer:NonWrappingText";
var BooleanValue = (0, import_flipper_plugin.styled)(NonWrappingText)((props) => ({
  "&::before": {
    content: '""',
    display: "inline-block",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: props.active ? import_flipper_plugin.theme.successColor : import_flipper_plugin.theme.errorColor,
    marginRight: 5,
    marginTop: 1
  }
}));
BooleanValue.displayName = "TypeBasedValueRenderer:BooleanValue";
function valueToNullableString(val) {
  return val.value?.toString() ?? null;
}
function renderValue(val, wordWrap) {
  const TextComponent = wordWrap ? WrappingText : NonWrappingText;
  switch (val.type) {
    case "boolean":
      return /* @__PURE__ */ import_react.default.createElement(BooleanValue, { active: val.value }, val.value.toString());
    case "blob":
    case "string":
      return /* @__PURE__ */ import_react.default.createElement(TextComponent, null, val.value);
    case "integer":
    case "float":
    case "double":
    case "number":
      return /* @__PURE__ */ import_react.default.createElement(TextComponent, null, val.value);
    case "null":
      return /* @__PURE__ */ import_react.default.createElement(TextComponent, null, "NULL");
    default:
      return /* @__PURE__ */ import_react.default.createElement(TextComponent, null);
  }
}

// plugins/public/databases/DatabasesPlugin.tsx
var import_react5 = __toESM(require("react"));

// plugins/public/databases/ButtonNavigation.tsx
var import_antd2 = require("antd");
var import_react2 = __toESM(require("react"));
var import_icons = require("@ant-design/icons");
var ButtonNavigation_default = import_react2.default.memo(
  (props) => {
    return /* @__PURE__ */ import_react2.default.createElement(import_antd2.Radio.Group, { style: { marginLeft: 5, marginRight: 5 } }, /* @__PURE__ */ import_react2.default.createElement(import_antd2.Radio.Button, { disabled: !props.canGoBack, onClick: props.onBack }, /* @__PURE__ */ import_react2.default.createElement(import_icons.LeftOutlined, { size: 16 })), /* @__PURE__ */ import_react2.default.createElement(import_antd2.Radio.Button, { disabled: !props.canGoForward, onClick: props.onForward }, /* @__PURE__ */ import_react2.default.createElement(import_icons.RightOutlined, { size: 16 })));
  }
);

// plugins/public/databases/DatabaseDetailSidebar.tsx
var import_react3 = __toESM(require("react"));
var import_flipper_plugin2 = require("flipper-plugin");
var import_antd3 = require("antd");
var TableDetailRow = import_flipper_plugin2.styled.div({
  borderBottom: `1px solid ${import_flipper_plugin2.theme.dividerColor}`,
  padding: 8
});
var TableDetailRowTitle = import_flipper_plugin2.styled.div({
  fontWeight: "bold",
  marginBottom: 8
});
var TableDetailRowType = import_flipper_plugin2.styled.span({
  color: import_flipper_plugin2.theme.white,
  marginLeft: 8,
  fontWeight: "normal"
});
var TableDetailRowValue = import_flipper_plugin2.styled.div({});
function sidebarRows(labels, values) {
  return labels.map((label, idx) => buildSidebarRow(label, values[idx]));
}
function buildSidebarRow(key, val) {
  let output = renderValue(val, true);
  if ((val.type === "string" || val.type === "blob") && (val.value[0] === "[" || val.value[0] === "{")) {
    try {
      var parsed = JSON.parse(val.value);
    } catch (_error) {
    }
    if (parsed) {
      output = /* @__PURE__ */ import_react3.default.createElement(import_flipper_plugin2.DataInspector, { data: parsed, expandRoot: true, collapsed: true });
    }
  }
  return {
    col: key,
    type: val.type,
    value: output
  };
}
function sidebarEditableRows(labels, values, rowDispatch) {
  return labels.map(
    (label, idx) => buildSidebarEditableRow(
      label,
      values[idx],
      (value) => rowDispatch({ type: "set", key: label, value })
    )
  );
}
function buildSidebarEditableRow(key, val, onUpdateValue) {
  if (val.type === "blob" || !val.type) {
    return buildSidebarRow(key, val);
  }
  return {
    col: key,
    type: val.type,
    value: /* @__PURE__ */ import_react3.default.createElement(
      EditField,
      {
        key,
        initialValue: valueToNullableString(val),
        onUpdateValue
      }
    )
  };
}
var EditField = import_react3.default.memo(
  (props) => {
    const { initialValue, onUpdateValue } = props;
    const [value, setValue] = (0, import_react3.useState)(initialValue);
    (0, import_react3.useEffect)(() => setValue(initialValue), [initialValue]);
    return /* @__PURE__ */ import_react3.default.createElement(
      import_antd3.Input,
      {
        value: value || "",
        onChange: (e) => {
          setValue(e.target.value);
          onUpdateValue(e.target.value);
        },
        placeholder: value === null ? "NULL" : void 0,
        "data-testid": "update-query-input",
        style: { width: "100%" }
      }
    );
  }
);
var rowStateReducer = (0, import_flipper_plugin2.produce)((draftState, action) => {
  switch (action.type) {
    case "set":
      draftState.changes[action.key] = action.value;
      draftState.updated = true;
      return;
    case "reset":
      draftState.changes = {};
      draftState.updated = false;
      return;
  }
});
var DatabaseDetailSidebar_default = import_react3.default.memo(function DatabaseDetailSidebar(props) {
  const [editing, setEditing] = (0, import_react3.useState)(false);
  const [rowState, rowDispatch] = (0, import_react3.useReducer)(rowStateReducer, {
    changes: {},
    updated: false
  });
  const { columnLabels, columnValues, onSave } = props;
  (0, import_react3.useEffect)(() => rowDispatch({ type: "reset" }), [columnLabels, columnValues]);
  const rows = (0, import_react3.useMemo)(
    () => editing ? sidebarEditableRows(columnLabels, columnValues, rowDispatch) : sidebarRows(columnLabels, columnValues),
    [columnLabels, columnValues, editing]
  );
  return /* @__PURE__ */ import_react3.default.createElement(import_flipper_plugin2.DetailSidebar, null, /* @__PURE__ */ import_react3.default.createElement(import_flipper_plugin2.Panel, { title: "Row details", collapsible: true }, onSave ? /* @__PURE__ */ import_react3.default.createElement(import_flipper_plugin2.Layout.Right, { center: true }, /* @__PURE__ */ import_react3.default.createElement("div", null), editing ? /* @__PURE__ */ import_react3.default.createElement(import_flipper_plugin2.Layout.Horizontal, { pad: true, gap: true }, /* @__PURE__ */ import_react3.default.createElement(import_antd3.Button, { onClick: () => setEditing(false) }, "Close"), /* @__PURE__ */ import_react3.default.createElement(
    import_antd3.Button,
    {
      disabled: !rowState.updated,
      type: "primary",
      onClick: () => {
        onSave(rowState.changes);
        setEditing(false);
      }
    },
    "Save"
  )) : /* @__PURE__ */ import_react3.default.createElement(import_flipper_plugin2.Layout.Horizontal, { pad: true }, /* @__PURE__ */ import_react3.default.createElement(import_antd3.Button, { onClick: () => setEditing(true) }, "Edit"))) : null, /* @__PURE__ */ import_react3.default.createElement("div", null, rows.map((row) => /* @__PURE__ */ import_react3.default.createElement(TableDetailRow, { key: row.col }, /* @__PURE__ */ import_react3.default.createElement(TableDetailRowTitle, null, row.col, /* @__PURE__ */ import_react3.default.createElement(TableDetailRowType, null, "(", row.type, ")")), /* @__PURE__ */ import_react3.default.createElement(TableDetailRowValue, null, row.value))))));
});

// plugins/public/databases/DatabaseStructure.tsx
var import_flipper_plugin3 = require("flipper-plugin");
var import_react4 = __toESM(require("react"));
function createRows(columns, rows) {
  return rows.map(
    (values) => values.reduce((acc, cur, i) => {
      acc[columns[i]] = cur;
      return acc;
    }, {})
  );
}
function createColumnConfig(columns) {
  const columnObjs = columns.map(
    (c) => ({
      key: c,
      title: c,
      onRender(row) {
        return renderValue(row[c]);
      }
    })
  );
  return columnObjs;
}
var DatabaseStructure_default = import_react4.default.memo((props) => {
  const { structure } = props;
  const { columns, rows, indexesColumns, indexesValues } = structure;
  const rowObjs = (0, import_flipper_plugin3.useMemoize)(
    (columns2, rows2) => createRows(columns2, rows2),
    [columns, rows]
  );
  const columnObjs = (0, import_flipper_plugin3.useMemoize)(
    (columns2) => createColumnConfig(columns2),
    [columns]
  );
  const indexRowObjs = (0, import_flipper_plugin3.useMemoize)(
    (indexesColumns2, indexesValues2) => createRows(indexesColumns2, indexesValues2),
    [indexesColumns, indexesValues]
  );
  const indexColumnObjs = (0, import_flipper_plugin3.useMemoize)(
    (indexesColumns2) => createColumnConfig(indexesColumns2),
    [indexesColumns]
  );
  return /* @__PURE__ */ import_react4.default.createElement(import_flipper_plugin3.Layout.Top, { resizable: true, height: 400 }, /* @__PURE__ */ import_react4.default.createElement(
    import_flipper_plugin3.DataTable,
    {
      records: rowObjs,
      columns: columnObjs,
      enableSearchbar: false
    }
  ), /* @__PURE__ */ import_react4.default.createElement(
    import_flipper_plugin3.DataTable,
    {
      records: indexRowObjs,
      columns: indexColumnObjs,
      enableSearchbar: false
    }
  ));
});

// plugins/public/databases/UpdateQueryUtil.tsx
var INT_DATA_TYPE = ["INTEGER", "LONG", "INT", "BIGINT"];
var FLOAT_DATA_TYPE = ["REAL", "DOUBLE"];
var BLOB_DATA_TYPE = ["BLOB"];
function convertStringToValue(types, key, value) {
  if (types.hasOwnProperty(key)) {
    const { type, nullable } = types[key];
    value = value === null ? "" : value;
    if (value.length <= 0 && nullable) {
      return { type: "null", value: null };
    }
    if (INT_DATA_TYPE.indexOf(type) >= 0) {
      const converted = parseInt(value, 10);
      return { type: "integer", value: isNaN(converted) ? 0 : converted };
    } else if (FLOAT_DATA_TYPE.indexOf(type) >= 0) {
      const converted = parseFloat(value);
      return { type: "float", value: isNaN(converted) ? 0 : converted };
    } else if (BLOB_DATA_TYPE.indexOf(type) >= 0) {
      return { type: "blob", value };
    } else {
      return { type: "string", value };
    }
  }
  if (value === null || value.length <= 0) {
    return { type: "null", value: null };
  } else {
    return { type: "string", value };
  }
}
function constructQueryClause(values, connector) {
  return Object.entries(values).reduce(
    (clauses, [key, val], idx) => {
      const valueString = val.type === "null" ? "NULL" : val.type === "string" || val.type === "blob" ? `'${val.value.replace(/'/g, "''")}'` : `${val.value}`;
      if (idx <= 0) {
        return `\`${key}\`=${valueString}`;
      } else {
        return `${clauses} ${connector} \`${key}\`=${valueString}`;
      }
    },
    ""
  );
}
function constructUpdateQuery(table, where, change) {
  return `UPDATE \`${table}\`
    SET ${constructQueryClause(change, ",")}
    WHERE ${constructQueryClause(where, "AND")}`;
}
function isUpdatable(columnMeta, columnData) {
  const primaryKeyIdx = columnMeta.indexOf("primary_key");
  return primaryKeyIdx >= 0 && columnData.reduce((acc, column) => {
    const primaryValue = column[primaryKeyIdx];
    return acc || primaryValue.type === "boolean" && primaryValue.value;
  }, false);
}

// plugins/public/databases/DatabasesPlugin.tsx
var import_sql_formatter = __toESM(require_sqlFormatter());
var import_flipper_plugin4 = require("flipper-plugin");
var import_antd4 = require("antd");
var import_icons2 = require("@ant-design/icons");
var { TextArea } = import_antd4.Input;
var { Option } = import_antd4.Select;
var { Text: Text2 } = import_antd4.Typography;
var BoldSpan = import_flipper_plugin4.styled.span({
  fontSize: 12,
  color: "#90949c",
  fontWeight: "bold",
  textTransform: "uppercase"
});
var ErrorBar = import_flipper_plugin4.styled.div({
  backgroundColor: import_flipper_plugin4.theme.errorColor,
  color: import_flipper_plugin4.theme.textColorPrimary,
  lineHeight: "26px",
  textAlign: "center"
});
var PageInfoContainer = (0, import_flipper_plugin4.styled)(import_flipper_plugin4.Layout.Horizontal)({ alignItems: "center" });
function transformRow(columns, row, index) {
  const transformedColumns = {};
  for (let i = 0; i < columns.length; i++) {
    transformedColumns[columns[i]] = { value: renderValue(row[i], true) };
  }
  return { key: String(index), columns: transformedColumns };
}
var QueryHistory = import_react5.default.memo(({ history }) => {
  if (!history || typeof history === "undefined") {
    return null;
  }
  const columns = {
    time: {
      value: "Time",
      resizable: true
    },
    query: {
      value: "Query",
      resizable: true
    }
  };
  const rows = [];
  if (history.length > 0) {
    for (let i = 0; i < history.length; i++) {
      const query = history[i];
      const time = query.time;
      const value = query.value;
      rows.push({
        key: `${i}`,
        columns: { time: { value: time }, query: { value } }
      });
    }
  }
  return /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Layout.Horizontal, { grow: true }, /* @__PURE__ */ import_react5.default.createElement(
    import_flipper.ManagedTable,
    {
      floating: false,
      columns,
      columnSizes: { time: 75 },
      zebra: true,
      rows,
      horizontallyScrollable: true
    }
  ));
});
var PageInfo = import_react5.default.memo((props) => {
  const [state, setState] = (0, import_react5.useState)({
    isOpen: false,
    inputValue: String(props.currentRow)
  });
  const onOpen = (0, import_react5.useCallback)(() => {
    setState({ ...state, isOpen: true });
  }, [state]);
  const onInputChanged = (0, import_react5.useCallback)(
    (e) => {
      setState({ ...state, inputValue: e.target.value });
    },
    [state]
  );
  const onSubmit = (0, import_react5.useCallback)(
    (e) => {
      if (e.key === "Enter") {
        const rowNumber = parseInt(state.inputValue, 10);
        props.onChange(rowNumber - 1, props.count);
        setState({ ...state, isOpen: false });
      }
    },
    [props, state]
  );
  return /* @__PURE__ */ import_react5.default.createElement(PageInfoContainer, { grow: true }, /* @__PURE__ */ import_react5.default.createElement("div", { style: { flex: 1 } }), /* @__PURE__ */ import_react5.default.createElement(Text2, null, props.count === props.totalRows ? `${props.count} ` : `${props.currentRow + 1}-${props.currentRow + props.count} `, "of ", props.totalRows, " rows"), /* @__PURE__ */ import_react5.default.createElement("div", { style: { flex: 1 } }), state.isOpen ? /* @__PURE__ */ import_react5.default.createElement(
    import_antd4.Input,
    {
      tabIndex: -1,
      placeholder: (props.currentRow + 1).toString(),
      onChange: onInputChanged,
      onKeyDown: onSubmit
    }
  ) : /* @__PURE__ */ import_react5.default.createElement(import_antd4.Button, { style: { textAlign: "center" }, onClick: onOpen }, "Go To Row"));
});
var DataTable2 = import_react5.default.memo(
  ({
    page,
    highlightedRowsChanged,
    sortOrderChanged,
    currentSort,
    currentStructure,
    onRowEdited
  }) => page && page.columns ? /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Layout.Horizontal, { grow: true }, /* @__PURE__ */ import_react5.default.createElement(
    import_flipper.ManagedTable,
    {
      tableKey: `databases-${page.databaseId}-${page.table}`,
      floating: false,
      columnOrder: page.columns.map((name) => ({
        key: name,
        visible: true
      })),
      columns: page.columns.reduce(
        (acc, val) => Object.assign({}, acc, {
          [val]: { value: val, resizable: true, sortable: true }
        }),
        {}
      ),
      zebra: true,
      rows: page.rows.map(
        (row, index) => transformRow(page.columns, row, index)
      ),
      horizontallyScrollable: true,
      multiHighlight: true,
      onRowHighlighted: highlightedRowsChanged,
      onSort: sortOrderChanged,
      initialSortOrder: currentSort ?? void 0
    }
  ), page.highlightedRows.length === 1 && /* @__PURE__ */ import_react5.default.createElement(
    DatabaseDetailSidebar_default,
    {
      columnLabels: page.columns,
      columnValues: page.rows[page.highlightedRows[0]],
      onSave: currentStructure && isUpdatable(currentStructure.columns, currentStructure.rows) ? onRowEdited : void 0
    }
  )) : null
);
var QueryTable = import_react5.default.memo(
  ({
    query,
    highlightedRowsChanged
  }) => {
    if (!query || query === null) {
      return null;
    }
    if (query.table && typeof query.table !== "undefined" && query.table !== null) {
      const table = query.table;
      const columns = table.columns;
      const rows = table.rows;
      return /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Layout.Container, { grow: true }, /* @__PURE__ */ import_react5.default.createElement(
        import_flipper.ManagedTable,
        {
          floating: false,
          multiline: true,
          columnOrder: columns.map((name) => ({
            key: name,
            visible: true
          })),
          columns: columns.reduce(
            (acc, val) => Object.assign({}, acc, { [val]: { value: val, resizable: true } }),
            {}
          ),
          zebra: true,
          rows: rows.map(
            (row, index) => transformRow(columns, row, index)
          ),
          horizontallyScrollable: true,
          onRowHighlighted: highlightedRowsChanged
        }
      ), table.highlightedRows.length === 1 && /* @__PURE__ */ import_react5.default.createElement(
        DatabaseDetailSidebar_default,
        {
          columnLabels: table.columns,
          columnValues: table.rows[table.highlightedRows[0]]
        }
      ));
    } else if (query.id && query.id !== null) {
      return /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Layout.Horizontal, { grow: true, pad: true }, /* @__PURE__ */ import_react5.default.createElement(Text2, null, "Row id: ", query.id));
    } else if (query.count && query.count !== null) {
      return /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Layout.Horizontal, { grow: true, pad: true }, /* @__PURE__ */ import_react5.default.createElement(Text2, null, "Rows affected: ", query.count));
    } else {
      return null;
    }
  }
);
var FavoritesMenu = import_react5.default.memo(
  ({
    favorites,
    onClick
  }) => {
    const onMenuClick = (0, import_react5.useCallback)(
      (p) => onClick(p.key),
      [onClick]
    );
    return /* @__PURE__ */ import_react5.default.createElement(import_antd4.Menu, null, favorites.map((q) => /* @__PURE__ */ import_react5.default.createElement(import_antd4.Menu.Item, { key: q, onClick: onMenuClick }, q)));
  }
);
function Component() {
  const instance = (0, import_flipper_plugin4.usePlugin)(plugin);
  const state = (0, import_flipper_plugin4.useValue)(instance.state);
  const favorites = (0, import_flipper_plugin4.useValue)(instance.favoritesState);
  const onViewModeChanged = (0, import_react5.useCallback)(
    (evt) => {
      instance.updateViewMode({ viewMode: evt.target.value ?? "data" });
    },
    [instance]
  );
  const onDataClicked = (0, import_react5.useCallback)(() => {
    instance.updateViewMode({ viewMode: "data" });
  }, [instance]);
  const onStructureClicked = (0, import_react5.useCallback)(() => {
    instance.updateViewMode({ viewMode: "structure" });
  }, [instance]);
  const onSQLClicked = (0, import_react5.useCallback)(() => {
    instance.updateViewMode({ viewMode: "SQL" });
  }, [instance]);
  const onTableInfoClicked = (0, import_react5.useCallback)(() => {
    instance.updateViewMode({ viewMode: "tableInfo" });
  }, [instance]);
  const onQueryHistoryClicked = (0, import_react5.useCallback)(() => {
    instance.updateViewMode({ viewMode: "queryHistory" });
  }, [instance]);
  const onRefreshClicked = (0, import_react5.useCallback)(() => {
    instance.state.update((state2) => {
      state2.error = null;
    });
    instance.refresh();
  }, [instance]);
  const onFavoriteButtonClicked = (0, import_react5.useCallback)(() => {
    if (state.query) {
      instance.addOrRemoveQueryToFavorites(state.query.value);
    }
  }, [instance, state.query]);
  const onDatabaseSelected = (0, import_react5.useCallback)(
    (selected) => {
      const dbId = instance.state.get().databases.find((x) => x.name === selected)?.id || 0;
      instance.updateSelectedDatabase({
        database: dbId
      });
    },
    [instance]
  );
  const onDatabaseTableSelected = (0, import_react5.useCallback)(
    (selected) => {
      instance.updateSelectedDatabaseTable({
        table: selected
      });
    },
    [instance]
  );
  const onNextPageClicked = (0, import_react5.useCallback)(() => {
    instance.nextPage();
  }, [instance]);
  const onPreviousPageClicked = (0, import_react5.useCallback)(() => {
    instance.previousPage();
  }, [instance]);
  const onExecuteClicked = (0, import_react5.useCallback)(() => {
    const query = instance.state.get().query;
    if (query) {
      instance.execute({ query: query.value });
    }
  }, [instance]);
  const onQueryTextareaKeyPress = (0, import_react5.useCallback)(
    (event) => {
      if (event.key === "\n" && event.ctrlKey) {
        event.preventDefault();
        event.stopPropagation();
        onExecuteClicked();
      }
    },
    [onExecuteClicked]
  );
  const onGoToRow = (0, import_react5.useCallback)(
    (row, _count) => {
      instance.goToRow({ row });
    },
    [instance]
  );
  const onQueryChanged = (0, import_react5.useCallback)(
    (selected) => {
      instance.updateQuery({
        value: selected.target.value
      });
    },
    [instance]
  );
  const onFavoriteQuerySelected = (0, import_react5.useCallback)(
    (query) => {
      instance.updateQuery({
        value: query
      });
    },
    [instance]
  );
  const pageHighlightedRowsChanged = (0, import_react5.useCallback)(
    (rows) => {
      instance.pageHighlightedRowsChanged(rows);
    },
    [instance]
  );
  const queryHighlightedRowsChanged = (0, import_react5.useCallback)(
    (rows) => {
      instance.queryHighlightedRowsChanged(rows);
    },
    [instance]
  );
  const sortOrderChanged = (0, import_react5.useCallback)(
    (sortOrder) => {
      instance.sortByChanged({ sortOrder });
    },
    [instance]
  );
  const onRowEdited = (0, import_react5.useCallback)(
    (change) => {
      const { selectedDatabaseTable, currentStructure, viewMode, currentPage } = instance.state.get();
      const highlightedRowIdx = currentPage?.highlightedRows[0] ?? -1;
      const row = highlightedRowIdx >= 0 ? currentPage?.rows[currentPage?.highlightedRows[0]] : void 0;
      const columns = currentPage?.columns;
      if (viewMode !== "data" || selectedDatabaseTable === null || currentStructure === null || currentPage === null || row === void 0 || columns === void 0 || Object.keys(change).length <= 0) {
        return;
      }
      const primaryKeyIdx = currentStructure.columns.indexOf("primary_key");
      const nameKeyIdx = currentStructure.columns.indexOf("column_name");
      const typeIdx = currentStructure.columns.indexOf("data_type");
      const nullableIdx = currentStructure.columns.indexOf("nullable");
      if (primaryKeyIdx < 0 && nameKeyIdx < 0 && typeIdx < 0) {
        console.error(
          "primary_key, column_name, and/or data_type cannot be empty"
        );
        return;
      }
      const primaryColumnIndexes = currentStructure.rows.reduce((acc, row2) => {
        const primary = row2[primaryKeyIdx];
        if (primary.type === "boolean" && primary.value) {
          const name = row2[nameKeyIdx];
          return name.type === "string" ? acc.concat(name.value) : acc;
        } else {
          return acc;
        }
      }, []).map((name) => columns.indexOf(name)).filter((idx) => idx >= 0);
      if (primaryColumnIndexes.length <= 0) {
        return;
      }
      const types = currentStructure.rows.reduce(
        (acc, row2) => {
          const nameValue = row2[nameKeyIdx];
          const name = nameValue.type === "string" ? nameValue.value : null;
          const typeValue = row2[typeIdx];
          const type = typeValue.type === "string" ? typeValue.value : null;
          const nullableValue = nullableIdx < 0 ? { type: "null", value: null } : row2[nullableIdx];
          const nullable = nullableValue.value !== false;
          if (name !== null && type !== null) {
            acc[name] = { type, nullable };
          }
          return acc;
        },
        {}
      );
      const changeValue = Object.entries(change).reduce(
        (acc, [key, value]) => {
          acc[key] = convertStringToValue(types, key, value);
          return acc;
        },
        {}
      );
      instance.execute({
        query: constructUpdateQuery(
          selectedDatabaseTable,
          primaryColumnIndexes.reduce(
            (acc, idx) => {
              acc[columns[idx]] = row[idx];
              return acc;
            },
            {}
          ),
          changeValue
        )
      });
      instance.updatePage({
        ...(0, import_flipper_plugin4.produce)(
          currentPage,
          (draft) => Object.entries(changeValue).forEach(
            ([key, value]) => {
              const columnIdx = draft.columns.indexOf(key);
              if (columnIdx >= 0) {
                draft.rows[highlightedRowIdx][columnIdx] = value;
              }
            }
          )
        )
      });
    },
    [instance]
  );
  const databaseOptions = (0, import_flipper_plugin4.useMemoize)(
    (databases) => databases.map((x) => /* @__PURE__ */ import_react5.default.createElement(Option, { key: x.name, value: x.name, label: x.name }, x.name)),
    [state.databases]
  );
  const selectedDatabaseName = (0, import_flipper_plugin4.useMemoize)(
    (selectedDatabase, databases) => selectedDatabase && databases[state.selectedDatabase - 1] ? databases[selectedDatabase - 1].name : void 0,
    [state.selectedDatabase, state.databases]
  );
  const tableOptions = (0, import_flipper_plugin4.useMemoize)(
    (selectedDatabase, databases) => selectedDatabase && databases[state.selectedDatabase - 1] ? databases[selectedDatabase - 1].tables.map((tableName) => /* @__PURE__ */ import_react5.default.createElement(Option, { key: tableName, value: tableName, label: tableName }, tableName)) : [],
    [state.selectedDatabase, state.databases]
  );
  const selectedTableName = (0, import_flipper_plugin4.useMemoize)(
    (selectedDatabase, databases, selectedDatabaseTable) => selectedDatabase && databases[selectedDatabase - 1] ? databases[selectedDatabase - 1].tables.find(
      (t) => t === selectedDatabaseTable
    ) ?? databases[selectedDatabase - 1].tables[0] : void 0,
    [state.selectedDatabase, state.databases, state.selectedDatabaseTable]
  );
  return /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Layout.Container, { grow: true }, /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Toolbar, { position: "top" }, /* @__PURE__ */ import_react5.default.createElement(import_antd4.Radio.Group, { value: state.viewMode, onChange: onViewModeChanged }, /* @__PURE__ */ import_react5.default.createElement(import_antd4.Radio.Button, { value: "data", onClick: onDataClicked }, /* @__PURE__ */ import_react5.default.createElement(import_icons2.TableOutlined, { style: { marginRight: 5 } }), /* @__PURE__ */ import_react5.default.createElement(import_antd4.Typography.Text, null, "Data")), /* @__PURE__ */ import_react5.default.createElement(import_antd4.Radio.Button, { onClick: onStructureClicked, value: "structure" }, /* @__PURE__ */ import_react5.default.createElement(import_icons2.SettingOutlined, { style: { marginRight: 5 } }), /* @__PURE__ */ import_react5.default.createElement(import_antd4.Typography.Text, null, "Structure")), /* @__PURE__ */ import_react5.default.createElement(import_antd4.Radio.Button, { onClick: onSQLClicked, value: "SQL" }, /* @__PURE__ */ import_react5.default.createElement(import_icons2.ConsoleSqlOutlined, { style: { marginRight: 5 } }), /* @__PURE__ */ import_react5.default.createElement(import_antd4.Typography.Text, null, "SQL")), /* @__PURE__ */ import_react5.default.createElement(import_antd4.Radio.Button, { onClick: onTableInfoClicked, value: "tableInfo" }, /* @__PURE__ */ import_react5.default.createElement(import_icons2.DatabaseOutlined, { style: { marginRight: 5 } }), /* @__PURE__ */ import_react5.default.createElement(import_antd4.Typography.Text, null, "Table Info")), /* @__PURE__ */ import_react5.default.createElement(import_antd4.Radio.Button, { onClick: onQueryHistoryClicked, value: "queryHistory" }, /* @__PURE__ */ import_react5.default.createElement(import_icons2.HistoryOutlined, { style: { marginRight: 5 } }), /* @__PURE__ */ import_react5.default.createElement(import_antd4.Typography.Text, null, "Query History")))), state.viewMode === "data" || state.viewMode === "structure" || state.viewMode === "tableInfo" ? /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Toolbar, { position: "top" }, /* @__PURE__ */ import_react5.default.createElement(BoldSpan, null, "Database"), /* @__PURE__ */ import_react5.default.createElement(
    import_antd4.Select,
    {
      showSearch: true,
      value: selectedDatabaseName,
      onChange: onDatabaseSelected,
      style: { flex: 1 },
      dropdownMatchSelectWidth: false
    },
    databaseOptions
  ), /* @__PURE__ */ import_react5.default.createElement(BoldSpan, null, "Table"), /* @__PURE__ */ import_react5.default.createElement(
    import_antd4.Select,
    {
      showSearch: true,
      value: selectedTableName,
      onChange: onDatabaseTableSelected,
      style: { flex: 1 },
      dropdownMatchSelectWidth: false
    },
    tableOptions
  ), /* @__PURE__ */ import_react5.default.createElement("div", null), /* @__PURE__ */ import_react5.default.createElement(import_antd4.Button, { onClick: onRefreshClicked, type: "default" }, "Refresh")) : null, state.viewMode === "SQL" ? /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Layout.Container, null, /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Toolbar, { position: "top" }, /* @__PURE__ */ import_react5.default.createElement(BoldSpan, null, "Database"), /* @__PURE__ */ import_react5.default.createElement(
    import_antd4.Select,
    {
      showSearch: true,
      value: selectedDatabaseName,
      onChange: onDatabaseSelected,
      dropdownMatchSelectWidth: false
    },
    databaseOptions
  )), /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Layout.Horizontal, { pad: import_flipper_plugin4.theme.space.small, style: { paddingBottom: 0 } }, /* @__PURE__ */ import_react5.default.createElement(
    TextArea,
    {
      onChange: onQueryChanged,
      onKeyPress: onQueryTextareaKeyPress,
      placeholder: "Type query here..",
      value: state.query !== null && typeof state.query !== "undefined" ? state.query.value : void 0
    }
  )), /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Toolbar, { position: "top" }, /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Layout.Right, null, /* @__PURE__ */ import_react5.default.createElement("div", null), /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Layout.Horizontal, { gap: import_flipper_plugin4.theme.space.small }, /* @__PURE__ */ import_react5.default.createElement(
    import_antd4.Button,
    {
      icon: state.query && favorites.includes(state.query.value) ? /* @__PURE__ */ import_react5.default.createElement(import_icons2.StarFilled, null) : /* @__PURE__ */ import_react5.default.createElement(import_icons2.StarOutlined, null),
      onClick: onFavoriteButtonClicked
    }
  ), /* @__PURE__ */ import_react5.default.createElement(
    import_antd4.Dropdown,
    {
      overlay: /* @__PURE__ */ import_react5.default.createElement(
        FavoritesMenu,
        {
          favorites,
          onClick: onFavoriteQuerySelected
        }
      )
    },
    /* @__PURE__ */ import_react5.default.createElement(import_antd4.Button, { onClick: () => {
    } }, "Choose from previous queries ", /* @__PURE__ */ import_react5.default.createElement(import_icons2.DownOutlined, null))
  ), /* @__PURE__ */ import_react5.default.createElement(
    import_antd4.Button,
    {
      type: "primary",
      onClick: onExecuteClicked,
      title: "Execute SQL [Ctrl+Return]"
    },
    "Execute"
  ))))) : null, /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Layout.Container, { grow: true }, state.viewMode === "data" ? /* @__PURE__ */ import_react5.default.createElement(
    DataTable2,
    {
      page: state.currentPage,
      highlightedRowsChanged: pageHighlightedRowsChanged,
      onRowEdited,
      sortOrderChanged,
      currentSort: state.currentSort,
      currentStructure: state.currentStructure
    }
  ) : null, state.viewMode === "structure" && state.currentStructure ? /* @__PURE__ */ import_react5.default.createElement(DatabaseStructure_default, { structure: state.currentStructure }) : null, state.viewMode === "SQL" ? /* @__PURE__ */ import_react5.default.createElement(
    QueryTable,
    {
      query: state.queryResult,
      highlightedRowsChanged: queryHighlightedRowsChanged
    }
  ) : null, state.viewMode === "tableInfo" ? /* @__PURE__ */ import_react5.default.createElement(
    import_flipper_plugin4.Layout.Horizontal,
    {
      grow: true,
      pad: import_flipper_plugin4.theme.space.small,
      style: { paddingBottom: 0 }
    },
    /* @__PURE__ */ import_react5.default.createElement(TextArea, { value: import_sql_formatter.default.format(state.tableInfo), readOnly: true })
  ) : null, state.viewMode === "queryHistory" ? /* @__PURE__ */ import_react5.default.createElement(QueryHistory, { history: state.queryHistory }) : null), /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Toolbar, { position: "bottom", style: { paddingLeft: 8 } }, /* @__PURE__ */ import_react5.default.createElement(import_flipper_plugin4.Layout.Horizontal, { grow: true }, state.viewMode === "SQL" && state.executionTime !== 0 ? /* @__PURE__ */ import_react5.default.createElement(Text2, null, " ", state.executionTime, " ms ") : null, state.viewMode === "data" && state.currentPage ? /* @__PURE__ */ import_react5.default.createElement(
    PageInfo,
    {
      currentRow: state.currentPage.start,
      count: state.currentPage.count,
      totalRows: state.currentPage.total,
      onChange: onGoToRow
    }
  ) : null, state.viewMode === "data" && state.currentPage ? /* @__PURE__ */ import_react5.default.createElement(
    ButtonNavigation_default,
    {
      canGoBack: state.currentPage.start > 0,
      canGoForward: state.currentPage.start + state.currentPage.count < state.currentPage.total,
      onBack: onPreviousPageClicked,
      onForward: onNextPageClicked
    }
  ) : null)), state.error && /* @__PURE__ */ import_react5.default.createElement(ErrorBar, null, getStringFromErrorLike(state.error)));
}

// plugins/public/databases/index.tsx
var PAGE_SIZE = 50;
var FAVORITES_LOCAL_STORAGE_KEY = "plugin-database-favorites-sql-queries";
function plugin(client) {
  const pluginState = (0, import_flipper_plugin5.createState)({
    selectedDatabase: 0,
    selectedDatabaseTable: null,
    pageRowNumber: 0,
    databases: [],
    outdatedDatabaseList: true,
    viewMode: "data",
    error: null,
    currentPage: null,
    currentStructure: null,
    currentSort: null,
    query: null,
    queryResult: null,
    executionTime: 0,
    tableInfo: "",
    queryHistory: []
  });
  const favoritesState = (0, import_flipper_plugin5.createState)([], { persist: "favorites" });
  favoritesState.subscribe((favorites) => {
    localStorage.setItem(
      FAVORITES_LOCAL_STORAGE_KEY,
      JSON.stringify(favorites)
    );
  });
  const updateDatabases = (event) => {
    const updates = event.databases ?? [];
    const state = pluginState.get();
    const databases = updates.sort((db1, db2) => db1.id - db2.id);
    const selectedDatabase = state.selectedDatabase || (Object.values(databases)[0] ? Object.values(databases)[0].id : 0);
    const selectedTable = state.selectedDatabaseTable && selectedDatabase > 0 && databases.length >= selectedDatabase && databases[selectedDatabase - 1].tables.includes(
      state.selectedDatabaseTable
    ) ? state.selectedDatabaseTable : databases[selectedDatabase - 1].tables[0];
    const sameTableSelected = selectedDatabase === state.selectedDatabase && selectedTable === state.selectedDatabaseTable;
    pluginState.set({
      ...state,
      databases,
      outdatedDatabaseList: false,
      selectedDatabase,
      selectedDatabaseTable: selectedTable,
      pageRowNumber: 0,
      currentPage: sameTableSelected ? state.currentPage : null,
      currentStructure: null,
      currentSort: sameTableSelected ? state.currentSort : null
    });
  };
  const updateSelectedDatabase = (event) => {
    const state = pluginState.get();
    pluginState.set({
      ...state,
      selectedDatabase: event.database,
      selectedDatabaseTable: state.databases[event.database - 1].tables[0] || null,
      pageRowNumber: 0,
      currentPage: null,
      currentStructure: null,
      currentSort: null
    });
  };
  const updateSelectedDatabaseTable = (event) => {
    const state = pluginState.get();
    pluginState.set({
      ...state,
      selectedDatabaseTable: event.table,
      pageRowNumber: 0,
      currentPage: null,
      currentStructure: null,
      currentSort: null
    });
  };
  const updateViewMode = (event) => {
    pluginState.update((state) => {
      state.viewMode = event.viewMode;
      state.error = null;
    });
  };
  const updatePage = (event) => {
    pluginState.update((state) => {
      state.currentPage = event;
    });
  };
  const updateStructure = (event) => {
    pluginState.update((state) => {
      state.currentStructure = {
        databaseId: event.databaseId,
        table: event.table,
        columns: event.columns,
        rows: event.rows,
        indexesColumns: event.indexesColumns,
        indexesValues: event.indexesValues
      };
    });
  };
  const displaySelect = (event) => {
    pluginState.update((state) => {
      state.queryResult = {
        table: {
          columns: event.columns,
          rows: event.values,
          highlightedRows: []
        },
        id: null,
        count: null
      };
    });
  };
  const displayInsert = (event) => {
    const state = pluginState.get();
    pluginState.set({
      ...state,
      queryResult: {
        table: null,
        id: event.id,
        count: null
      }
    });
  };
  const displayUpdateDelete = (event) => {
    pluginState.update((state) => {
      state.queryResult = {
        table: null,
        id: null,
        count: event.count
      };
    });
  };
  const updateTableInfo = (event) => {
    pluginState.update((state) => {
      state.tableInfo = event.tableInfo;
    });
  };
  const nextPage = () => {
    pluginState.update((state) => {
      state.pageRowNumber += PAGE_SIZE;
      state.currentPage = null;
    });
  };
  const previousPage = () => {
    pluginState.update((state) => {
      state.pageRowNumber = Math.max(state.pageRowNumber - PAGE_SIZE, 0);
      state.currentPage = null;
    });
  };
  const execute = (event) => {
    const timeBefore = Date.now();
    const { query } = event;
    client.send("execute", {
      databaseId: pluginState.get().selectedDatabase,
      value: query
    }).then((data) => {
      pluginState.update((state) => {
        state.error = null;
        state.executionTime = Date.now() - timeBefore;
      });
      if (data.type === "select") {
        displaySelect({
          columns: data.columns,
          values: data.values
        });
      } else if (data.type === "insert") {
        displayInsert({
          id: data.insertedId
        });
      } else if (data.type === "update_delete") {
        displayUpdateDelete({
          count: data.affectedCount
        });
      }
    }).catch((e) => {
      pluginState.update((state) => {
        state.error = e;
      });
    });
    let newHistory = pluginState.get().queryHistory;
    const newQuery = pluginState.get().query;
    if (newQuery !== null && typeof newQuery !== "undefined" && newHistory !== null && typeof newHistory !== "undefined") {
      newQuery.time = (0, import_dateformat.default)(new Date(), "hh:MM:ss");
      newHistory = newHistory.concat(newQuery);
    }
    pluginState.update((state) => {
      state.queryHistory = newHistory;
    });
  };
  const goToRow = (event) => {
    const state = pluginState.get();
    if (!state.currentPage) {
      return;
    }
    const destinationRow = event.row < 0 ? 0 : event.row >= state.currentPage.total - PAGE_SIZE ? Math.max(state.currentPage.total - PAGE_SIZE, 0) : event.row;
    pluginState.update((state2) => {
      state2.pageRowNumber = destinationRow;
      state2.currentPage = null;
    });
  };
  const refresh = () => {
    pluginState.update((state) => {
      state.outdatedDatabaseList = true;
      state.currentPage = null;
    });
  };
  const addOrRemoveQueryToFavorites = (query) => {
    favoritesState.update((favorites) => {
      const index = favorites.indexOf(query);
      if (index < 0) {
        favorites.push(query);
      } else {
        favorites.splice(index, 1);
      }
    });
  };
  const sortByChanged = (event) => {
    const state = pluginState.get();
    pluginState.set({
      ...state,
      currentSort: event.sortOrder,
      pageRowNumber: 0,
      currentPage: null
    });
  };
  const updateQuery = (event) => {
    const state = pluginState.get();
    pluginState.set({
      ...state,
      query: {
        value: event.value,
        time: (0, import_dateformat.default)(new Date(), "hh:MM:ss")
      }
    });
  };
  const pageHighlightedRowsChanged = (event) => {
    pluginState.update((draftState) => {
      if (draftState.currentPage !== null) {
        draftState.currentPage.highlightedRows = event.map(parseInt);
      }
    });
  };
  const queryHighlightedRowsChanged = (event) => {
    pluginState.update((state) => {
      if (state.queryResult) {
        if (state.queryResult.table) {
          state.queryResult.table.highlightedRows = event.map(parseInt);
        }
        state.queryResult.id = null;
        state.queryResult.count = null;
      }
    });
  };
  pluginState.subscribe(
    (newState, previousState) => {
      const databaseId = newState.selectedDatabase;
      const table = newState.selectedDatabaseTable;
      if (newState.viewMode === "data" && newState.currentPage === null && databaseId && table) {
        client.send("getTableData", {
          count: PAGE_SIZE,
          databaseId: newState.selectedDatabase,
          order: newState.currentSort?.key,
          reverse: (newState.currentSort?.direction || "up") === "down",
          table,
          start: newState.pageRowNumber
        }).then((data) => {
          updatePage({
            databaseId,
            table,
            columns: data.columns,
            rows: data.values,
            start: data.start,
            count: data.count,
            total: data.total,
            highlightedRows: []
          });
        }).catch((e) => {
          pluginState.update((state) => {
            state.error = e;
          });
        });
      }
      if (newState.currentStructure === null && databaseId && table) {
        client.send("getTableStructure", {
          databaseId,
          table
        }).then((data) => {
          updateStructure({
            databaseId,
            table,
            columns: data.structureColumns,
            rows: data.structureValues,
            indexesColumns: data.indexesColumns,
            indexesValues: data.indexesValues
          });
        }).catch((e) => {
          pluginState.update((state) => {
            state.error = e;
          });
        });
      }
      if (newState.viewMode === "tableInfo" && newState.currentStructure === null && databaseId && table) {
        client.send("getTableInfo", {
          databaseId,
          table
        }).then((data) => {
          updateTableInfo({
            tableInfo: data.definition
          });
        }).catch((e) => {
          pluginState.update((state) => {
            state.error = e;
          });
        });
      }
      if (!previousState.outdatedDatabaseList && newState.outdatedDatabaseList) {
        client.send("databaseList", {}).then((databases) => {
          updateDatabases({
            databases
          });
        }).catch((e) => console.error("databaseList request failed:", e));
      }
    }
  );
  client.onConnect(() => {
    client.send("databaseList", {}).then((databases) => {
      updateDatabases({
        databases
      });
    }).catch((e) => console.error("initial databaseList request failed:", e));
    const loadedFavoritesJson = localStorage.getItem(
      FAVORITES_LOCAL_STORAGE_KEY
    );
    if (loadedFavoritesJson) {
      try {
        favoritesState.set(JSON.parse(loadedFavoritesJson));
      } catch (err) {
        console.error("Failed to load favorite queries from local storage");
      }
    }
  });
  return {
    state: pluginState,
    favoritesState,
    updateDatabases,
    updateSelectedDatabase,
    updateSelectedDatabaseTable,
    updateViewMode,
    updatePage,
    updateStructure,
    displaySelect,
    displayInsert,
    displayUpdateDelete,
    updateTableInfo,
    nextPage,
    previousPage,
    execute,
    goToRow,
    refresh,
    addOrRemoveQueryToFavorites,
    sortByChanged,
    updateQuery,
    pageHighlightedRowsChanged,
    queryHighlightedRowsChanged
  };
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL2RhdGVmb3JtYXQvbGliL2RhdGVmb3JtYXQuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9fZnJlZUdsb2JhbC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL19yb290LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1N5bWJvbC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL19hcnJheU1hcC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL2lzQXJyYXkuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0UmF3VGFnLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvX29iamVjdFRvU3RyaW5nLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VHZXRUYWcuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdExpa2UuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N5bWJvbC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlVG9TdHJpbmcuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVNsaWNlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Nhc3RTbGljZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlRmluZEluZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VJc05hTi5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL19zdHJpY3RJbmRleE9mLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VJbmRleE9mLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2NoYXJzRW5kSW5kZXguanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXNjaWlUb0FycmF5LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2hhc1VuaWNvZGUuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9fdW5pY29kZVRvQXJyYXkuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9fc3RyaW5nVG9BcnJheS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL3RvU3RyaW5nLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvdHJpbUVuZC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9saWIvY29yZS90b2tlblR5cGVzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VSZXBlYXQuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9lcS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL2lzT2JqZWN0LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNGdW5jdGlvbi5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL2lzTGVuZ3RoLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNBcnJheUxpa2UuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9faXNJbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL19pc0l0ZXJhdGVlQ2FsbC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL3RvTnVtYmVyLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvdG9GaW5pdGUuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC90b0ludGVnZXIuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9yZXBlYXQuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9sYXN0LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL2xpYi9jb3JlL0luZGVudGF0aW9uLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL2xpYi9jb3JlL0lubGluZUJsb2NrLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL2xpYi9jb3JlL1BhcmFtcy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9saWIvY29yZS9Gb3JtYXR0ZXIuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9faXNQcm90b3R5cGUuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9fb3ZlckFyZy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL19uYXRpdmVLZXlzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VLZXlzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2NvcmVKc0RhdGEuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9faXNNYXNrZWQuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9fdG9Tb3VyY2UuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUlzTmF0aXZlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFZhbHVlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldE5hdGl2ZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL19EYXRhVmlldy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL19NYXAuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9fUHJvbWlzZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL19TZXQuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9fV2Vha01hcC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL19nZXRUYWcuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUlzQXJndW1lbnRzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNBcmd1bWVudHMuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9zdHViRmFsc2UuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9pc0J1ZmZlci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXNUeXBlZEFycmF5LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VVbmFyeS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL19ub2RlVXRpbC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL2lzVHlwZWRBcnJheS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9ub2RlX21vZHVsZXMvbG9kYXNoL2lzRW1wdHkuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC9lc2NhcGVSZWdFeHAuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbGliL2NvcmUvVG9rZW5pemVyLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL2xpYi9sYW5ndWFnZXMvRGIyRm9ybWF0dGVyLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL2xpYi9sYW5ndWFnZXMvTjFxbEZvcm1hdHRlci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc3FsLWZvcm1hdHRlci9saWIvbGFuZ3VhZ2VzL1BsU3FsRm9ybWF0dGVyLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zcWwtZm9ybWF0dGVyL2xpYi9sYW5ndWFnZXMvU3RhbmRhcmRTcWxGb3JtYXR0ZXIuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NxbC1mb3JtYXR0ZXIvbGliL3NxbEZvcm1hdHRlci5qcyIsICIuLi9pbmRleC50c3giLCAiLi4vRGF0YWJhc2VzUGx1Z2luLnRzeCIsICIuLi91dGlscy50c3giLCAiLi4vVHlwZUJhc2VkVmFsdWVSZW5kZXJlci50c3giLCAiLi4vQnV0dG9uTmF2aWdhdGlvbi50c3giLCAiLi4vRGF0YWJhc2VEZXRhaWxTaWRlYmFyLnRzeCIsICIuLi9EYXRhYmFzZVN0cnVjdHVyZS50c3giLCAiLi4vVXBkYXRlUXVlcnlVdGlsLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX3R5cGVvZihvYmope1wiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtpZih0eXBlb2YgU3ltYm9sPT09XCJmdW5jdGlvblwiJiZ0eXBlb2YgU3ltYm9sLml0ZXJhdG9yPT09XCJzeW1ib2xcIil7X3R5cGVvZj1mdW5jdGlvbiBfdHlwZW9mKG9iail7cmV0dXJuIHR5cGVvZiBvYmp9fWVsc2V7X3R5cGVvZj1mdW5jdGlvbiBfdHlwZW9mKG9iail7cmV0dXJuIG9iaiYmdHlwZW9mIFN5bWJvbD09PVwiZnVuY3Rpb25cIiYmb2JqLmNvbnN0cnVjdG9yPT09U3ltYm9sJiZvYmohPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIG9ian19cmV0dXJuIF90eXBlb2Yob2JqKX0oZnVuY3Rpb24oZ2xvYmFsKXt2YXIgX2FyZ3VtZW50cz1hcmd1bWVudHM7dmFyIGRhdGVGb3JtYXQ9ZnVuY3Rpb24oKXt2YXIgdG9rZW49L2R7MSw0fXxEezMsNH18bXsxLDR9fHl5KD86eXkpP3woW0hoTXNUdF0pXFwxP3xXezEsMn18W0xsb3BTWk5dfFwiW15cIl0qXCJ8J1teJ10qJy9nO3ZhciB0aW1lem9uZT0vXFxiKD86W1BNQ0VBXVtTRFBdVHwoPzpQYWNpZmljfE1vdW50YWlufENlbnRyYWx8RWFzdGVybnxBdGxhbnRpYykgKD86U3RhbmRhcmR8RGF5bGlnaHR8UHJldmFpbGluZykgVGltZXwoPzpHTVR8VVRDKSg/OlstK11cXGR7NH0pPylcXGIvZzt2YXIgdGltZXpvbmVDbGlwPS9bXi0rXFxkQS1aXS9nO3JldHVybiBmdW5jdGlvbihkYXRlLG1hc2ssdXRjLGdtdCl7aWYoX2FyZ3VtZW50cy5sZW5ndGg9PT0xJiZraW5kT2YoZGF0ZSk9PT1cInN0cmluZ1wiJiYhL1xcZC8udGVzdChkYXRlKSl7bWFzaz1kYXRlO2RhdGU9dW5kZWZpbmVkfWRhdGU9ZGF0ZXx8ZGF0ZT09PTA/ZGF0ZTpuZXcgRGF0ZTtpZighKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSl7ZGF0ZT1uZXcgRGF0ZShkYXRlKX1pZihpc05hTihkYXRlKSl7dGhyb3cgVHlwZUVycm9yKFwiSW52YWxpZCBkYXRlXCIpfW1hc2s9U3RyaW5nKGRhdGVGb3JtYXQubWFza3NbbWFza118fG1hc2t8fGRhdGVGb3JtYXQubWFza3NbXCJkZWZhdWx0XCJdKTt2YXIgbWFza1NsaWNlPW1hc2suc2xpY2UoMCw0KTtpZihtYXNrU2xpY2U9PT1cIlVUQzpcInx8bWFza1NsaWNlPT09XCJHTVQ6XCIpe21hc2s9bWFzay5zbGljZSg0KTt1dGM9dHJ1ZTtpZihtYXNrU2xpY2U9PT1cIkdNVDpcIil7Z210PXRydWV9fXZhciBfPWZ1bmN0aW9uIF8oKXtyZXR1cm4gdXRjP1wiZ2V0VVRDXCI6XCJnZXRcIn07dmFyIF9kPWZ1bmN0aW9uIGQoKXtyZXR1cm4gZGF0ZVtfKCkrXCJEYXRlXCJdKCl9O3ZhciBEPWZ1bmN0aW9uIEQoKXtyZXR1cm4gZGF0ZVtfKCkrXCJEYXlcIl0oKX07dmFyIF9tPWZ1bmN0aW9uIG0oKXtyZXR1cm4gZGF0ZVtfKCkrXCJNb250aFwiXSgpfTt2YXIgeT1mdW5jdGlvbiB5KCl7cmV0dXJuIGRhdGVbXygpK1wiRnVsbFllYXJcIl0oKX07dmFyIF9IPWZ1bmN0aW9uIEgoKXtyZXR1cm4gZGF0ZVtfKCkrXCJIb3Vyc1wiXSgpfTt2YXIgX009ZnVuY3Rpb24gTSgpe3JldHVybiBkYXRlW18oKStcIk1pbnV0ZXNcIl0oKX07dmFyIF9zPWZ1bmN0aW9uIHMoKXtyZXR1cm4gZGF0ZVtfKCkrXCJTZWNvbmRzXCJdKCl9O3ZhciBfTD1mdW5jdGlvbiBMKCl7cmV0dXJuIGRhdGVbXygpK1wiTWlsbGlzZWNvbmRzXCJdKCl9O3ZhciBfbz1mdW5jdGlvbiBvKCl7cmV0dXJuIHV0Yz8wOmRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKX07dmFyIF9XPWZ1bmN0aW9uIFcoKXtyZXR1cm4gZ2V0V2VlayhkYXRlKX07dmFyIF9OPWZ1bmN0aW9uIE4oKXtyZXR1cm4gZ2V0RGF5T2ZXZWVrKGRhdGUpfTt2YXIgZmxhZ3M9e2Q6ZnVuY3Rpb24gZCgpe3JldHVybiBfZCgpfSxkZDpmdW5jdGlvbiBkZCgpe3JldHVybiBwYWQoX2QoKSl9LGRkZDpmdW5jdGlvbiBkZGQoKXtyZXR1cm4gZGF0ZUZvcm1hdC5pMThuLmRheU5hbWVzW0QoKV19LERERDpmdW5jdGlvbiBEREQoKXtyZXR1cm4gZ2V0RGF5TmFtZSh7eTp5KCksbTpfbSgpLGQ6X2QoKSxfOl8oKSxkYXlOYW1lOmRhdGVGb3JtYXQuaTE4bi5kYXlOYW1lc1tEKCldLHNob3J0OnRydWV9KX0sZGRkZDpmdW5jdGlvbiBkZGRkKCl7cmV0dXJuIGRhdGVGb3JtYXQuaTE4bi5kYXlOYW1lc1tEKCkrN119LEREREQ6ZnVuY3Rpb24gRERERCgpe3JldHVybiBnZXREYXlOYW1lKHt5OnkoKSxtOl9tKCksZDpfZCgpLF86XygpLGRheU5hbWU6ZGF0ZUZvcm1hdC5pMThuLmRheU5hbWVzW0QoKSs3XX0pfSxtOmZ1bmN0aW9uIG0oKXtyZXR1cm4gX20oKSsxfSxtbTpmdW5jdGlvbiBtbSgpe3JldHVybiBwYWQoX20oKSsxKX0sbW1tOmZ1bmN0aW9uIG1tbSgpe3JldHVybiBkYXRlRm9ybWF0LmkxOG4ubW9udGhOYW1lc1tfbSgpXX0sbW1tbTpmdW5jdGlvbiBtbW1tKCl7cmV0dXJuIGRhdGVGb3JtYXQuaTE4bi5tb250aE5hbWVzW19tKCkrMTJdfSx5eTpmdW5jdGlvbiB5eSgpe3JldHVybiBTdHJpbmcoeSgpKS5zbGljZSgyKX0seXl5eTpmdW5jdGlvbiB5eXl5KCl7cmV0dXJuIHBhZCh5KCksNCl9LGg6ZnVuY3Rpb24gaCgpe3JldHVybiBfSCgpJTEyfHwxMn0saGg6ZnVuY3Rpb24gaGgoKXtyZXR1cm4gcGFkKF9IKCklMTJ8fDEyKX0sSDpmdW5jdGlvbiBIKCl7cmV0dXJuIF9IKCl9LEhIOmZ1bmN0aW9uIEhIKCl7cmV0dXJuIHBhZChfSCgpKX0sTTpmdW5jdGlvbiBNKCl7cmV0dXJuIF9NKCl9LE1NOmZ1bmN0aW9uIE1NKCl7cmV0dXJuIHBhZChfTSgpKX0sczpmdW5jdGlvbiBzKCl7cmV0dXJuIF9zKCl9LHNzOmZ1bmN0aW9uIHNzKCl7cmV0dXJuIHBhZChfcygpKX0sbDpmdW5jdGlvbiBsKCl7cmV0dXJuIHBhZChfTCgpLDMpfSxMOmZ1bmN0aW9uIEwoKXtyZXR1cm4gcGFkKE1hdGguZmxvb3IoX0woKS8xMCkpfSx0OmZ1bmN0aW9uIHQoKXtyZXR1cm4gX0goKTwxMj9kYXRlRm9ybWF0LmkxOG4udGltZU5hbWVzWzBdOmRhdGVGb3JtYXQuaTE4bi50aW1lTmFtZXNbMV19LHR0OmZ1bmN0aW9uIHR0KCl7cmV0dXJuIF9IKCk8MTI/ZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1syXTpkYXRlRm9ybWF0LmkxOG4udGltZU5hbWVzWzNdfSxUOmZ1bmN0aW9uIFQoKXtyZXR1cm4gX0goKTwxMj9kYXRlRm9ybWF0LmkxOG4udGltZU5hbWVzWzRdOmRhdGVGb3JtYXQuaTE4bi50aW1lTmFtZXNbNV19LFRUOmZ1bmN0aW9uIFRUKCl7cmV0dXJuIF9IKCk8MTI/ZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1s2XTpkYXRlRm9ybWF0LmkxOG4udGltZU5hbWVzWzddfSxaOmZ1bmN0aW9uIFooKXtyZXR1cm4gZ210P1wiR01UXCI6dXRjP1wiVVRDXCI6KFN0cmluZyhkYXRlKS5tYXRjaCh0aW1lem9uZSl8fFtcIlwiXSkucG9wKCkucmVwbGFjZSh0aW1lem9uZUNsaXAsXCJcIikucmVwbGFjZSgvR01UXFwrMDAwMC9nLFwiVVRDXCIpfSxvOmZ1bmN0aW9uIG8oKXtyZXR1cm4oX28oKT4wP1wiLVwiOlwiK1wiKStwYWQoTWF0aC5mbG9vcihNYXRoLmFicyhfbygpKS82MCkqMTAwK01hdGguYWJzKF9vKCkpJTYwLDQpfSxwOmZ1bmN0aW9uIHAoKXtyZXR1cm4oX28oKT4wP1wiLVwiOlwiK1wiKStwYWQoTWF0aC5mbG9vcihNYXRoLmFicyhfbygpKS82MCksMikrXCI6XCIrcGFkKE1hdGguZmxvb3IoTWF0aC5hYnMoX28oKSklNjApLDIpfSxTOmZ1bmN0aW9uIFMoKXtyZXR1cm5bXCJ0aFwiLFwic3RcIixcIm5kXCIsXCJyZFwiXVtfZCgpJTEwPjM/MDooX2QoKSUxMDAtX2QoKSUxMCE9MTApKl9kKCklMTBdfSxXOmZ1bmN0aW9uIFcoKXtyZXR1cm4gX1coKX0sV1c6ZnVuY3Rpb24gV1coKXtyZXR1cm4gcGFkKF9XKCkpfSxOOmZ1bmN0aW9uIE4oKXtyZXR1cm4gX04oKX19O3JldHVybiBtYXNrLnJlcGxhY2UodG9rZW4sZnVuY3Rpb24obWF0Y2gpe2lmKG1hdGNoIGluIGZsYWdzKXtyZXR1cm4gZmxhZ3NbbWF0Y2hdKCl9cmV0dXJuIG1hdGNoLnNsaWNlKDEsbWF0Y2gubGVuZ3RoLTEpfSl9fSgpO2RhdGVGb3JtYXQubWFza3M9e2RlZmF1bHQ6XCJkZGQgbW1tIGRkIHl5eXkgSEg6TU06c3NcIixzaG9ydERhdGU6XCJtL2QveXlcIixwYWRkZWRTaG9ydERhdGU6XCJtbS9kZC95eXl5XCIsbWVkaXVtRGF0ZTpcIm1tbSBkLCB5eXl5XCIsbG9uZ0RhdGU6XCJtbW1tIGQsIHl5eXlcIixmdWxsRGF0ZTpcImRkZGQsIG1tbW0gZCwgeXl5eVwiLHNob3J0VGltZTpcImg6TU0gVFRcIixtZWRpdW1UaW1lOlwiaDpNTTpzcyBUVFwiLGxvbmdUaW1lOlwiaDpNTTpzcyBUVCBaXCIsaXNvRGF0ZTpcInl5eXktbW0tZGRcIixpc29UaW1lOlwiSEg6TU06c3NcIixpc29EYXRlVGltZTpcInl5eXktbW0tZGQnVCdISDpNTTpzc29cIixpc29VdGNEYXRlVGltZTpcIlVUQzp5eXl5LW1tLWRkJ1QnSEg6TU06c3MnWidcIixleHBpcmVzSGVhZGVyRm9ybWF0OlwiZGRkLCBkZCBtbW0geXl5eSBISDpNTTpzcyBaXCJ9O2RhdGVGb3JtYXQuaTE4bj17ZGF5TmFtZXM6W1wiU3VuXCIsXCJNb25cIixcIlR1ZVwiLFwiV2VkXCIsXCJUaHVcIixcIkZyaVwiLFwiU2F0XCIsXCJTdW5kYXlcIixcIk1vbmRheVwiLFwiVHVlc2RheVwiLFwiV2VkbmVzZGF5XCIsXCJUaHVyc2RheVwiLFwiRnJpZGF5XCIsXCJTYXR1cmRheVwiXSxtb250aE5hbWVzOltcIkphblwiLFwiRmViXCIsXCJNYXJcIixcIkFwclwiLFwiTWF5XCIsXCJKdW5cIixcIkp1bFwiLFwiQXVnXCIsXCJTZXBcIixcIk9jdFwiLFwiTm92XCIsXCJEZWNcIixcIkphbnVhcnlcIixcIkZlYnJ1YXJ5XCIsXCJNYXJjaFwiLFwiQXByaWxcIixcIk1heVwiLFwiSnVuZVwiLFwiSnVseVwiLFwiQXVndXN0XCIsXCJTZXB0ZW1iZXJcIixcIk9jdG9iZXJcIixcIk5vdmVtYmVyXCIsXCJEZWNlbWJlclwiXSx0aW1lTmFtZXM6W1wiYVwiLFwicFwiLFwiYW1cIixcInBtXCIsXCJBXCIsXCJQXCIsXCJBTVwiLFwiUE1cIl19O3ZhciBwYWQ9ZnVuY3Rpb24gcGFkKHZhbCxsZW4pe3ZhbD1TdHJpbmcodmFsKTtsZW49bGVufHwyO3doaWxlKHZhbC5sZW5ndGg8bGVuKXt2YWw9XCIwXCIrdmFsfXJldHVybiB2YWx9O3ZhciBnZXREYXlOYW1lPWZ1bmN0aW9uIGdldERheU5hbWUoX3JlZil7dmFyIHk9X3JlZi55LG09X3JlZi5tLGQ9X3JlZi5kLF89X3JlZi5fLGRheU5hbWU9X3JlZi5kYXlOYW1lLF9yZWYkc2hvcnQ9X3JlZltcInNob3J0XCJdLF9zaG9ydD1fcmVmJHNob3J0PT09dm9pZCAwP2ZhbHNlOl9yZWYkc2hvcnQ7dmFyIHRvZGF5PW5ldyBEYXRlO3ZhciB5ZXN0ZXJkYXk9bmV3IERhdGU7eWVzdGVyZGF5LnNldERhdGUoeWVzdGVyZGF5W18rXCJEYXRlXCJdKCktMSk7dmFyIHRvbW9ycm93PW5ldyBEYXRlO3RvbW9ycm93LnNldERhdGUodG9tb3Jyb3dbXytcIkRhdGVcIl0oKSsxKTt2YXIgdG9kYXlfZD1mdW5jdGlvbiB0b2RheV9kKCl7cmV0dXJuIHRvZGF5W18rXCJEYXRlXCJdKCl9O3ZhciB0b2RheV9tPWZ1bmN0aW9uIHRvZGF5X20oKXtyZXR1cm4gdG9kYXlbXytcIk1vbnRoXCJdKCl9O3ZhciB0b2RheV95PWZ1bmN0aW9uIHRvZGF5X3koKXtyZXR1cm4gdG9kYXlbXytcIkZ1bGxZZWFyXCJdKCl9O3ZhciB5ZXN0ZXJkYXlfZD1mdW5jdGlvbiB5ZXN0ZXJkYXlfZCgpe3JldHVybiB5ZXN0ZXJkYXlbXytcIkRhdGVcIl0oKX07dmFyIHllc3RlcmRheV9tPWZ1bmN0aW9uIHllc3RlcmRheV9tKCl7cmV0dXJuIHllc3RlcmRheVtfK1wiTW9udGhcIl0oKX07dmFyIHllc3RlcmRheV95PWZ1bmN0aW9uIHllc3RlcmRheV95KCl7cmV0dXJuIHllc3RlcmRheVtfK1wiRnVsbFllYXJcIl0oKX07dmFyIHRvbW9ycm93X2Q9ZnVuY3Rpb24gdG9tb3Jyb3dfZCgpe3JldHVybiB0b21vcnJvd1tfK1wiRGF0ZVwiXSgpfTt2YXIgdG9tb3Jyb3dfbT1mdW5jdGlvbiB0b21vcnJvd19tKCl7cmV0dXJuIHRvbW9ycm93W18rXCJNb250aFwiXSgpfTt2YXIgdG9tb3Jyb3dfeT1mdW5jdGlvbiB0b21vcnJvd195KCl7cmV0dXJuIHRvbW9ycm93W18rXCJGdWxsWWVhclwiXSgpfTtpZih0b2RheV95KCk9PT15JiZ0b2RheV9tKCk9PT1tJiZ0b2RheV9kKCk9PT1kKXtyZXR1cm4gX3Nob3J0P1wiVGR5XCI6XCJUb2RheVwifWVsc2UgaWYoeWVzdGVyZGF5X3koKT09PXkmJnllc3RlcmRheV9tKCk9PT1tJiZ5ZXN0ZXJkYXlfZCgpPT09ZCl7cmV0dXJuIF9zaG9ydD9cIllzZFwiOlwiWWVzdGVyZGF5XCJ9ZWxzZSBpZih0b21vcnJvd195KCk9PT15JiZ0b21vcnJvd19tKCk9PT1tJiZ0b21vcnJvd19kKCk9PT1kKXtyZXR1cm4gX3Nob3J0P1wiVG13XCI6XCJUb21vcnJvd1wifXJldHVybiBkYXlOYW1lfTt2YXIgZ2V0V2Vlaz1mdW5jdGlvbiBnZXRXZWVrKGRhdGUpe3ZhciB0YXJnZXRUaHVyc2RheT1uZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksZGF0ZS5nZXRNb250aCgpLGRhdGUuZ2V0RGF0ZSgpKTt0YXJnZXRUaHVyc2RheS5zZXREYXRlKHRhcmdldFRodXJzZGF5LmdldERhdGUoKS0odGFyZ2V0VGh1cnNkYXkuZ2V0RGF5KCkrNiklNyszKTt2YXIgZmlyc3RUaHVyc2RheT1uZXcgRGF0ZSh0YXJnZXRUaHVyc2RheS5nZXRGdWxsWWVhcigpLDAsNCk7Zmlyc3RUaHVyc2RheS5zZXREYXRlKGZpcnN0VGh1cnNkYXkuZ2V0RGF0ZSgpLShmaXJzdFRodXJzZGF5LmdldERheSgpKzYpJTcrMyk7dmFyIGRzPXRhcmdldFRodXJzZGF5LmdldFRpbWV6b25lT2Zmc2V0KCktZmlyc3RUaHVyc2RheS5nZXRUaW1lem9uZU9mZnNldCgpO3RhcmdldFRodXJzZGF5LnNldEhvdXJzKHRhcmdldFRodXJzZGF5LmdldEhvdXJzKCktZHMpO3ZhciB3ZWVrRGlmZj0odGFyZ2V0VGh1cnNkYXktZmlyc3RUaHVyc2RheSkvKDg2NGU1KjcpO3JldHVybiAxK01hdGguZmxvb3Iod2Vla0RpZmYpfTt2YXIgZ2V0RGF5T2ZXZWVrPWZ1bmN0aW9uIGdldERheU9mV2VlayhkYXRlKXt2YXIgZG93PWRhdGUuZ2V0RGF5KCk7aWYoZG93PT09MCl7ZG93PTd9cmV0dXJuIGRvd307dmFyIGtpbmRPZj1mdW5jdGlvbiBraW5kT2YodmFsKXtpZih2YWw9PT1udWxsKXtyZXR1cm5cIm51bGxcIn1pZih2YWw9PT11bmRlZmluZWQpe3JldHVyblwidW5kZWZpbmVkXCJ9aWYoX3R5cGVvZih2YWwpIT09XCJvYmplY3RcIil7cmV0dXJuIF90eXBlb2YodmFsKX1pZihBcnJheS5pc0FycmF5KHZhbCkpe3JldHVyblwiYXJyYXlcIn1yZXR1cm57fS50b1N0cmluZy5jYWxsKHZhbCkuc2xpY2UoOCwtMSkudG9Mb3dlckNhc2UoKX07aWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKGZ1bmN0aW9uKCl7cmV0dXJuIGRhdGVGb3JtYXR9KX1lbHNlIGlmKCh0eXBlb2YgZXhwb3J0cz09PVwidW5kZWZpbmVkXCI/XCJ1bmRlZmluZWRcIjpfdHlwZW9mKGV4cG9ydHMpKT09PVwib2JqZWN0XCIpe21vZHVsZS5leHBvcnRzPWRhdGVGb3JtYXR9ZWxzZXtnbG9iYWwuZGF0ZUZvcm1hdD1kYXRlRm9ybWF0fX0pKHZvaWQgMCk7IiwgIi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbm1vZHVsZS5leHBvcnRzID0gZnJlZUdsb2JhbDtcbiIsICJ2YXIgZnJlZUdsb2JhbCA9IHJlcXVpcmUoJy4vX2ZyZWVHbG9iYWwnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvb3Q7XG4iLCAidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN5bWJvbDtcbiIsICIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5tYXBgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZVxuICogc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IG1hcHBlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlNYXAoYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5TWFwO1xuIiwgIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXk7XG4iLCAidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0UmF3VGFnO1xuIiwgIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgdXNpbmcgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG9iamVjdFRvU3RyaW5nO1xuIiwgInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBnZXRSYXdUYWcgPSByZXF1aXJlKCcuL19nZXRSYXdUYWcnKSxcbiAgICBvYmplY3RUb1N0cmluZyA9IHJlcXVpcmUoJy4vX29iamVjdFRvU3RyaW5nJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VHZXRUYWc7XG4iLCAiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3RMaWtlO1xuIiwgInZhciBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgYmFzZUdldFRhZyh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1N5bWJvbDtcbiIsICJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyksXG4gICAgYXJyYXlNYXAgPSByZXF1aXJlKCcuL19hcnJheU1hcCcpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc1N5bWJvbCA9IHJlcXVpcmUoJy4vaXNTeW1ib2wnKTtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMDtcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFRvU3RyaW5nID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by50b1N0cmluZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50b1N0cmluZ2Agd2hpY2ggZG9lc24ndCBjb252ZXJ0IG51bGxpc2hcbiAqIHZhbHVlcyB0byBlbXB0eSBzdHJpbmdzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgLy8gRXhpdCBlYXJseSBmb3Igc3RyaW5ncyB0byBhdm9pZCBhIHBlcmZvcm1hbmNlIGhpdCBpbiBzb21lIGVudmlyb25tZW50cy5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAvLyBSZWN1cnNpdmVseSBjb252ZXJ0IHZhbHVlcyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIHJldHVybiBhcnJheU1hcCh2YWx1ZSwgYmFzZVRvU3RyaW5nKSArICcnO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gc3ltYm9sVG9TdHJpbmcgPyBzeW1ib2xUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICB9XG4gIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gIHJldHVybiAocmVzdWx0ID09ICcwJyAmJiAoMSAvIHZhbHVlKSA9PSAtSU5GSU5JVFkpID8gJy0wJyA6IHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlVG9TdHJpbmc7XG4iLCAiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5zbGljZWAgd2l0aG91dCBhbiBpdGVyYXRlZSBjYWxsIGd1YXJkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gc2xpY2UuXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PTBdIFRoZSBzdGFydCBwb3NpdGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbZW5kPWFycmF5Lmxlbmd0aF0gVGhlIGVuZCBwb3NpdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgc2xpY2Ugb2YgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYmFzZVNsaWNlKGFycmF5LCBzdGFydCwgZW5kKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIGlmIChzdGFydCA8IDApIHtcbiAgICBzdGFydCA9IC1zdGFydCA+IGxlbmd0aCA/IDAgOiAobGVuZ3RoICsgc3RhcnQpO1xuICB9XG4gIGVuZCA9IGVuZCA+IGxlbmd0aCA/IGxlbmd0aCA6IGVuZDtcbiAgaWYgKGVuZCA8IDApIHtcbiAgICBlbmQgKz0gbGVuZ3RoO1xuICB9XG4gIGxlbmd0aCA9IHN0YXJ0ID4gZW5kID8gMCA6ICgoZW5kIC0gc3RhcnQpID4+PiAwKTtcbiAgc3RhcnQgPj4+PSAwO1xuXG4gIHZhciByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSBhcnJheVtpbmRleCArIHN0YXJ0XTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VTbGljZTtcbiIsICJ2YXIgYmFzZVNsaWNlID0gcmVxdWlyZSgnLi9fYmFzZVNsaWNlJyk7XG5cbi8qKlxuICogQ2FzdHMgYGFycmF5YCB0byBhIHNsaWNlIGlmIGl0J3MgbmVlZGVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBUaGUgc3RhcnQgcG9zaXRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gW2VuZD1hcnJheS5sZW5ndGhdIFRoZSBlbmQgcG9zaXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNhc3Qgc2xpY2UuXG4gKi9cbmZ1bmN0aW9uIGNhc3RTbGljZShhcnJheSwgc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbmd0aCA6IGVuZDtcbiAgcmV0dXJuICghc3RhcnQgJiYgZW5kID49IGxlbmd0aCkgPyBhcnJheSA6IGJhc2VTbGljZShhcnJheSwgc3RhcnQsIGVuZCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2FzdFNsaWNlO1xuIiwgIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZmluZEluZGV4YCBhbmQgYF8uZmluZExhc3RJbmRleGAgd2l0aG91dFxuICogc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBiYXNlRmluZEluZGV4KGFycmF5LCBwcmVkaWNhdGUsIGZyb21JbmRleCwgZnJvbVJpZ2h0KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBpbmRleCA9IGZyb21JbmRleCArIChmcm9tUmlnaHQgPyAxIDogLTEpO1xuXG4gIHdoaWxlICgoZnJvbVJpZ2h0ID8gaW5kZXgtLSA6ICsraW5kZXggPCBsZW5ndGgpKSB7XG4gICAgaWYgKHByZWRpY2F0ZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGaW5kSW5kZXg7XG4iLCAiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hTmAgd2l0aG91dCBzdXBwb3J0IGZvciBudW1iZXIgb2JqZWN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBgTmFOYCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNOYU47XG4iLCAiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uaW5kZXhPZmAgd2hpY2ggcGVyZm9ybXMgc3RyaWN0IGVxdWFsaXR5XG4gKiBjb21wYXJpc29ucyBvZiB2YWx1ZXMsIGkuZS4gYD09PWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gc3RyaWN0SW5kZXhPZihhcnJheSwgdmFsdWUsIGZyb21JbmRleCkge1xuICB2YXIgaW5kZXggPSBmcm9tSW5kZXggLSAxLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGFycmF5W2luZGV4XSA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0cmljdEluZGV4T2Y7XG4iLCAidmFyIGJhc2VGaW5kSW5kZXggPSByZXF1aXJlKCcuL19iYXNlRmluZEluZGV4JyksXG4gICAgYmFzZUlzTmFOID0gcmVxdWlyZSgnLi9fYmFzZUlzTmFOJyksXG4gICAgc3RyaWN0SW5kZXhPZiA9IHJlcXVpcmUoJy4vX3N0cmljdEluZGV4T2YnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pbmRleE9mYCB3aXRob3V0IGBmcm9tSW5kZXhgIGJvdW5kcyBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUluZGV4T2YoYXJyYXksIHZhbHVlLCBmcm9tSW5kZXgpIHtcbiAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZVxuICAgID8gc3RyaWN0SW5kZXhPZihhcnJheSwgdmFsdWUsIGZyb21JbmRleClcbiAgICA6IGJhc2VGaW5kSW5kZXgoYXJyYXksIGJhc2VJc05hTiwgZnJvbUluZGV4KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSW5kZXhPZjtcbiIsICJ2YXIgYmFzZUluZGV4T2YgPSByZXF1aXJlKCcuL19iYXNlSW5kZXhPZicpO1xuXG4vKipcbiAqIFVzZWQgYnkgYF8udHJpbWAgYW5kIGBfLnRyaW1FbmRgIHRvIGdldCB0aGUgaW5kZXggb2YgdGhlIGxhc3Qgc3RyaW5nIHN5bWJvbFxuICogdGhhdCBpcyBub3QgZm91bmQgaW4gdGhlIGNoYXJhY3RlciBzeW1ib2xzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBzdHJTeW1ib2xzIFRoZSBzdHJpbmcgc3ltYm9scyB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtBcnJheX0gY2hyU3ltYm9scyBUaGUgY2hhcmFjdGVyIHN5bWJvbHMgdG8gZmluZC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBsYXN0IHVubWF0Y2hlZCBzdHJpbmcgc3ltYm9sLlxuICovXG5mdW5jdGlvbiBjaGFyc0VuZEluZGV4KHN0clN5bWJvbHMsIGNoclN5bWJvbHMpIHtcbiAgdmFyIGluZGV4ID0gc3RyU3ltYm9scy5sZW5ndGg7XG5cbiAgd2hpbGUgKGluZGV4LS0gJiYgYmFzZUluZGV4T2YoY2hyU3ltYm9scywgc3RyU3ltYm9sc1tpbmRleF0sIDApID4gLTEpIHt9XG4gIHJldHVybiBpbmRleDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjaGFyc0VuZEluZGV4O1xuIiwgIi8qKlxuICogQ29udmVydHMgYW4gQVNDSUkgYHN0cmluZ2AgdG8gYW4gYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGFzY2lpVG9BcnJheShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5zcGxpdCgnJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXNjaWlUb0FycmF5O1xuIiwgIi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjaGFyYWN0ZXIgY2xhc3Nlcy4gKi9cbnZhciByc0FzdHJhbFJhbmdlID0gJ1xcXFx1ZDgwMC1cXFxcdWRmZmYnLFxuICAgIHJzQ29tYm9NYXJrc1JhbmdlID0gJ1xcXFx1MDMwMC1cXFxcdTAzNmYnLFxuICAgIHJlQ29tYm9IYWxmTWFya3NSYW5nZSA9ICdcXFxcdWZlMjAtXFxcXHVmZTJmJyxcbiAgICByc0NvbWJvU3ltYm9sc1JhbmdlID0gJ1xcXFx1MjBkMC1cXFxcdTIwZmYnLFxuICAgIHJzQ29tYm9SYW5nZSA9IHJzQ29tYm9NYXJrc1JhbmdlICsgcmVDb21ib0hhbGZNYXJrc1JhbmdlICsgcnNDb21ib1N5bWJvbHNSYW5nZSxcbiAgICByc1ZhclJhbmdlID0gJ1xcXFx1ZmUwZVxcXFx1ZmUwZic7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjYXB0dXJlIGdyb3Vwcy4gKi9cbnZhciByc1pXSiA9ICdcXFxcdTIwMGQnO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgc3RyaW5ncyB3aXRoIFt6ZXJvLXdpZHRoIGpvaW5lcnMgb3IgY29kZSBwb2ludHMgZnJvbSB0aGUgYXN0cmFsIHBsYW5lc10oaHR0cDovL2Vldi5lZS9ibG9nLzIwMTUvMDkvMTIvZGFyay1jb3JuZXJzLW9mLXVuaWNvZGUvKS4gKi9cbnZhciByZUhhc1VuaWNvZGUgPSBSZWdFeHAoJ1snICsgcnNaV0ogKyByc0FzdHJhbFJhbmdlICArIHJzQ29tYm9SYW5nZSArIHJzVmFyUmFuZ2UgKyAnXScpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgc3RyaW5nYCBjb250YWlucyBVbmljb2RlIHN5bWJvbHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBpbnNwZWN0LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGEgc3ltYm9sIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc1VuaWNvZGUoc3RyaW5nKSB7XG4gIHJldHVybiByZUhhc1VuaWNvZGUudGVzdChzdHJpbmcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc1VuaWNvZGU7XG4iLCAiLyoqIFVzZWQgdG8gY29tcG9zZSB1bmljb2RlIGNoYXJhY3RlciBjbGFzc2VzLiAqL1xudmFyIHJzQXN0cmFsUmFuZ2UgPSAnXFxcXHVkODAwLVxcXFx1ZGZmZicsXG4gICAgcnNDb21ib01hcmtzUmFuZ2UgPSAnXFxcXHUwMzAwLVxcXFx1MDM2ZicsXG4gICAgcmVDb21ib0hhbGZNYXJrc1JhbmdlID0gJ1xcXFx1ZmUyMC1cXFxcdWZlMmYnLFxuICAgIHJzQ29tYm9TeW1ib2xzUmFuZ2UgPSAnXFxcXHUyMGQwLVxcXFx1MjBmZicsXG4gICAgcnNDb21ib1JhbmdlID0gcnNDb21ib01hcmtzUmFuZ2UgKyByZUNvbWJvSGFsZk1hcmtzUmFuZ2UgKyByc0NvbWJvU3ltYm9sc1JhbmdlLFxuICAgIHJzVmFyUmFuZ2UgPSAnXFxcXHVmZTBlXFxcXHVmZTBmJztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSB1bmljb2RlIGNhcHR1cmUgZ3JvdXBzLiAqL1xudmFyIHJzQXN0cmFsID0gJ1snICsgcnNBc3RyYWxSYW5nZSArICddJyxcbiAgICByc0NvbWJvID0gJ1snICsgcnNDb21ib1JhbmdlICsgJ10nLFxuICAgIHJzRml0eiA9ICdcXFxcdWQ4M2NbXFxcXHVkZmZiLVxcXFx1ZGZmZl0nLFxuICAgIHJzTW9kaWZpZXIgPSAnKD86JyArIHJzQ29tYm8gKyAnfCcgKyByc0ZpdHogKyAnKScsXG4gICAgcnNOb25Bc3RyYWwgPSAnW14nICsgcnNBc3RyYWxSYW5nZSArICddJyxcbiAgICByc1JlZ2lvbmFsID0gJyg/OlxcXFx1ZDgzY1tcXFxcdWRkZTYtXFxcXHVkZGZmXSl7Mn0nLFxuICAgIHJzU3VyclBhaXIgPSAnW1xcXFx1ZDgwMC1cXFxcdWRiZmZdW1xcXFx1ZGMwMC1cXFxcdWRmZmZdJyxcbiAgICByc1pXSiA9ICdcXFxcdTIwMGQnO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgcmVnZXhlcy4gKi9cbnZhciByZU9wdE1vZCA9IHJzTW9kaWZpZXIgKyAnPycsXG4gICAgcnNPcHRWYXIgPSAnWycgKyByc1ZhclJhbmdlICsgJ10/JyxcbiAgICByc09wdEpvaW4gPSAnKD86JyArIHJzWldKICsgJyg/OicgKyBbcnNOb25Bc3RyYWwsIHJzUmVnaW9uYWwsIHJzU3VyclBhaXJdLmpvaW4oJ3wnKSArICcpJyArIHJzT3B0VmFyICsgcmVPcHRNb2QgKyAnKSonLFxuICAgIHJzU2VxID0gcnNPcHRWYXIgKyByZU9wdE1vZCArIHJzT3B0Sm9pbixcbiAgICByc1N5bWJvbCA9ICcoPzonICsgW3JzTm9uQXN0cmFsICsgcnNDb21ibyArICc/JywgcnNDb21ibywgcnNSZWdpb25hbCwgcnNTdXJyUGFpciwgcnNBc3RyYWxdLmpvaW4oJ3wnKSArICcpJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggW3N0cmluZyBzeW1ib2xzXShodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC11bmljb2RlKS4gKi9cbnZhciByZVVuaWNvZGUgPSBSZWdFeHAocnNGaXR6ICsgJyg/PScgKyByc0ZpdHogKyAnKXwnICsgcnNTeW1ib2wgKyByc1NlcSwgJ2cnKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhIFVuaWNvZGUgYHN0cmluZ2AgdG8gYW4gYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIHVuaWNvZGVUb0FycmF5KHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLm1hdGNoKHJlVW5pY29kZSkgfHwgW107XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdW5pY29kZVRvQXJyYXk7XG4iLCAidmFyIGFzY2lpVG9BcnJheSA9IHJlcXVpcmUoJy4vX2FzY2lpVG9BcnJheScpLFxuICAgIGhhc1VuaWNvZGUgPSByZXF1aXJlKCcuL19oYXNVbmljb2RlJyksXG4gICAgdW5pY29kZVRvQXJyYXkgPSByZXF1aXJlKCcuL191bmljb2RlVG9BcnJheScpO1xuXG4vKipcbiAqIENvbnZlcnRzIGBzdHJpbmdgIHRvIGFuIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY29udmVydGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBzdHJpbmdUb0FycmF5KHN0cmluZykge1xuICByZXR1cm4gaGFzVW5pY29kZShzdHJpbmcpXG4gICAgPyB1bmljb2RlVG9BcnJheShzdHJpbmcpXG4gICAgOiBhc2NpaVRvQXJyYXkoc3RyaW5nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHJpbmdUb0FycmF5O1xuIiwgInZhciBiYXNlVG9TdHJpbmcgPSByZXF1aXJlKCcuL19iYXNlVG9TdHJpbmcnKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWQgZm9yIGBudWxsYFxuICogYW5kIGB1bmRlZmluZWRgIHZhbHVlcy4gVGhlIHNpZ24gb2YgYC0wYCBpcyBwcmVzZXJ2ZWQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvU3RyaW5nKG51bGwpO1xuICogLy8gPT4gJydcbiAqXG4gKiBfLnRvU3RyaW5nKC0wKTtcbiAqIC8vID0+ICctMCdcbiAqXG4gKiBfLnRvU3RyaW5nKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiAnMSwyLDMnXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiBiYXNlVG9TdHJpbmcodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvU3RyaW5nO1xuIiwgInZhciBiYXNlVG9TdHJpbmcgPSByZXF1aXJlKCcuL19iYXNlVG9TdHJpbmcnKSxcbiAgICBjYXN0U2xpY2UgPSByZXF1aXJlKCcuL19jYXN0U2xpY2UnKSxcbiAgICBjaGFyc0VuZEluZGV4ID0gcmVxdWlyZSgnLi9fY2hhcnNFbmRJbmRleCcpLFxuICAgIHN0cmluZ1RvQXJyYXkgPSByZXF1aXJlKCcuL19zdHJpbmdUb0FycmF5JyksXG4gICAgdG9TdHJpbmcgPSByZXF1aXJlKCcuL3RvU3RyaW5nJyk7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuICovXG52YXIgcmVUcmltRW5kID0gL1xccyskLztcblxuLyoqXG4gKiBSZW1vdmVzIHRyYWlsaW5nIHdoaXRlc3BhY2Ugb3Igc3BlY2lmaWVkIGNoYXJhY3RlcnMgZnJvbSBgc3RyaW5nYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byB0cmltLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjaGFycz13aGl0ZXNwYWNlXSBUaGUgY2hhcmFjdGVycyB0byB0cmltLlxuICogQHBhcmFtLSB7T2JqZWN0fSBbZ3VhcmRdIEVuYWJsZXMgdXNlIGFzIGFuIGl0ZXJhdGVlIGZvciBtZXRob2RzIGxpa2UgYF8ubWFwYC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHRyaW1tZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRyaW1FbmQoJyAgYWJjICAnKTtcbiAqIC8vID0+ICcgIGFiYydcbiAqXG4gKiBfLnRyaW1FbmQoJy1fLWFiYy1fLScsICdfLScpO1xuICogLy8gPT4gJy1fLWFiYydcbiAqL1xuZnVuY3Rpb24gdHJpbUVuZChzdHJpbmcsIGNoYXJzLCBndWFyZCkge1xuICBzdHJpbmcgPSB0b1N0cmluZyhzdHJpbmcpO1xuICBpZiAoc3RyaW5nICYmIChndWFyZCB8fCBjaGFycyA9PT0gdW5kZWZpbmVkKSkge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZShyZVRyaW1FbmQsICcnKTtcbiAgfVxuICBpZiAoIXN0cmluZyB8fCAhKGNoYXJzID0gYmFzZVRvU3RyaW5nKGNoYXJzKSkpIHtcbiAgICByZXR1cm4gc3RyaW5nO1xuICB9XG4gIHZhciBzdHJTeW1ib2xzID0gc3RyaW5nVG9BcnJheShzdHJpbmcpLFxuICAgICAgZW5kID0gY2hhcnNFbmRJbmRleChzdHJTeW1ib2xzLCBzdHJpbmdUb0FycmF5KGNoYXJzKSkgKyAxO1xuXG4gIHJldHVybiBjYXN0U2xpY2Uoc3RyU3ltYm9scywgMCwgZW5kKS5qb2luKCcnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0cmltRW5kO1xuIiwgIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuLyoqXG4gKiBDb25zdGFudHMgZm9yIHRva2VuIHR5cGVzXG4gKi9cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0ge1xuICAgIFdISVRFU1BBQ0U6IFwid2hpdGVzcGFjZVwiLFxuICAgIFdPUkQ6IFwid29yZFwiLFxuICAgIFNUUklORzogXCJzdHJpbmdcIixcbiAgICBSRVNFUlZFRDogXCJyZXNlcnZlZFwiLFxuICAgIFJFU0VSVkVEX1RPUExFVkVMOiBcInJlc2VydmVkLXRvcGxldmVsXCIsXG4gICAgUkVTRVJWRURfTkVXTElORTogXCJyZXNlcnZlZC1uZXdsaW5lXCIsXG4gICAgT1BFUkFUT1I6IFwib3BlcmF0b3JcIixcbiAgICBPUEVOX1BBUkVOOiBcIm9wZW4tcGFyZW5cIixcbiAgICBDTE9TRV9QQVJFTjogXCJjbG9zZS1wYXJlblwiLFxuICAgIExJTkVfQ09NTUVOVDogXCJsaW5lLWNvbW1lbnRcIixcbiAgICBCTE9DS19DT01NRU5UOiBcImJsb2NrLWNvbW1lbnRcIixcbiAgICBOVU1CRVI6IFwibnVtYmVyXCIsXG4gICAgUExBQ0VIT0xERVI6IFwicGxhY2Vob2xkZXJcIlxufTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwgIi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlRmxvb3IgPSBNYXRoLmZsb29yO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnJlcGVhdGAgd2hpY2ggZG9lc24ndCBjb2VyY2UgYXJndW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gcmVwZWF0LlxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiB0aW1lcyB0byByZXBlYXQgdGhlIHN0cmluZy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHJlcGVhdGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVJlcGVhdChzdHJpbmcsIG4pIHtcbiAgdmFyIHJlc3VsdCA9ICcnO1xuICBpZiAoIXN0cmluZyB8fCBuIDwgMSB8fCBuID4gTUFYX1NBRkVfSU5URUdFUikge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgLy8gTGV2ZXJhZ2UgdGhlIGV4cG9uZW50aWF0aW9uIGJ5IHNxdWFyaW5nIGFsZ29yaXRobSBmb3IgYSBmYXN0ZXIgcmVwZWF0LlxuICAvLyBTZWUgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRXhwb25lbnRpYXRpb25fYnlfc3F1YXJpbmcgZm9yIG1vcmUgZGV0YWlscy5cbiAgZG8ge1xuICAgIGlmIChuICUgMikge1xuICAgICAgcmVzdWx0ICs9IHN0cmluZztcbiAgICB9XG4gICAgbiA9IG5hdGl2ZUZsb29yKG4gLyAyKTtcbiAgICBpZiAobikge1xuICAgICAgc3RyaW5nICs9IHN0cmluZztcbiAgICB9XG4gIH0gd2hpbGUgKG4pO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVJlcGVhdDtcbiIsICIvKipcbiAqIFBlcmZvcm1zIGFcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmUgZXF1aXZhbGVudC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2EnOiAxIH07XG4gKlxuICogXy5lcShvYmplY3QsIG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcSgnYScsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcSgnYScsIE9iamVjdCgnYScpKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcShOYU4sIE5hTik7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGVxKHZhbHVlLCBvdGhlcikge1xuICByZXR1cm4gdmFsdWUgPT09IG90aGVyIHx8ICh2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlcTtcbiIsICIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcbiIsICJ2YXIgYmFzZUdldFRhZyA9IHJlcXVpcmUoJy4vX2Jhc2VHZXRUYWcnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFzeW5jVGFnID0gJ1tvYmplY3QgQXN5bmNGdW5jdGlvbl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXScsXG4gICAgcHJveHlUYWcgPSAnW29iamVjdCBQcm94eV0nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXlzIGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBiYXNlR2V0VGFnKHZhbHVlKTtcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWcgfHwgdGFnID09IGFzeW5jVGFnIHx8IHRhZyA9PSBwcm94eVRhZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0Z1bmN0aW9uO1xuIiwgIi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0xlbmd0aDtcbiIsICJ2YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJy4vaXNGdW5jdGlvbicpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuIEEgdmFsdWUgaXMgY29uc2lkZXJlZCBhcnJheS1saWtlIGlmIGl0J3NcbiAqIG5vdCBhIGZ1bmN0aW9uIGFuZCBoYXMgYSBgdmFsdWUubGVuZ3RoYCB0aGF0J3MgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gb3JcbiAqIGVxdWFsIHRvIGAwYCBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICFpc0Z1bmN0aW9uKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5TGlrZTtcbiIsICIvKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL14oPzowfFsxLTldXFxkKikkLztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcblxuICByZXR1cm4gISFsZW5ndGggJiZcbiAgICAodHlwZSA9PSAnbnVtYmVyJyB8fFxuICAgICAgKHR5cGUgIT0gJ3N5bWJvbCcgJiYgcmVJc1VpbnQudGVzdCh2YWx1ZSkpKSAmJlxuICAgICAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJbmRleDtcbiIsICJ2YXIgZXEgPSByZXF1aXJlKCcuL2VxJyksXG4gICAgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlJyksXG4gICAgaXNJbmRleCA9IHJlcXVpcmUoJy4vX2lzSW5kZXgnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgdmFsdWUgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IGluZGV4IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgaW5kZXggb3Iga2V5IGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBvYmplY3QgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBvYmplY3QgYXJndW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJdGVyYXRlZUNhbGwodmFsdWUsIGluZGV4LCBvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIGluZGV4O1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJ1xuICAgICAgICA/IChpc0FycmF5TGlrZShvYmplY3QpICYmIGlzSW5kZXgoaW5kZXgsIG9iamVjdC5sZW5ndGgpKVxuICAgICAgICA6ICh0eXBlID09ICdzdHJpbmcnICYmIGluZGV4IGluIG9iamVjdClcbiAgICAgICkge1xuICAgIHJldHVybiBlcShvYmplY3RbaW5kZXhdLCB2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSXRlcmF0ZWVDYWxsO1xuIiwgInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKSxcbiAgICBpc1N5bWJvbCA9IHJlcXVpcmUoJy4vaXNTeW1ib2wnKTtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTkFOID0gMCAvIDA7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuICovXG52YXIgcmVUcmltID0gL15cXHMrfFxccyskL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiYWQgc2lnbmVkIGhleGFkZWNpbWFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JhZEhleCA9IC9eWy0rXTB4WzAtOWEtZl0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmluYXJ5IHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JpbmFyeSA9IC9eMGJbMDFdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG9jdGFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc09jdGFsID0gL14wb1swLTddKyQvaTtcblxuLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbnZhciBmcmVlUGFyc2VJbnQgPSBwYXJzZUludDtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvTnVtYmVyKDMuMik7XG4gKiAvLyA9PiAzLjJcbiAqXG4gKiBfLnRvTnVtYmVyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b051bWJlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBJbmZpbml0eVxuICpcbiAqIF8udG9OdW1iZXIoJzMuMicpO1xuICogLy8gPT4gMy4yXG4gKi9cbmZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBOQU47XG4gIH1cbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHZhciBvdGhlciA9IHR5cGVvZiB2YWx1ZS52YWx1ZU9mID09ICdmdW5jdGlvbicgPyB2YWx1ZS52YWx1ZU9mKCkgOiB2YWx1ZTtcbiAgICB2YWx1ZSA9IGlzT2JqZWN0KG90aGVyKSA/IChvdGhlciArICcnKSA6IG90aGVyO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6ICt2YWx1ZTtcbiAgfVxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVUcmltLCAnJyk7XG4gIHZhciBpc0JpbmFyeSA9IHJlSXNCaW5hcnkudGVzdCh2YWx1ZSk7XG4gIHJldHVybiAoaXNCaW5hcnkgfHwgcmVJc09jdGFsLnRlc3QodmFsdWUpKVxuICAgID8gZnJlZVBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCBpc0JpbmFyeSA/IDIgOiA4KVxuICAgIDogKHJlSXNCYWRIZXgudGVzdCh2YWx1ZSkgPyBOQU4gOiArdmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvTnVtYmVyO1xuIiwgInZhciB0b051bWJlciA9IHJlcXVpcmUoJy4vdG9OdW1iZXInKTtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMCxcbiAgICBNQVhfSU5URUdFUiA9IDEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4O1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBmaW5pdGUgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4xMi4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9GaW5pdGUoMy4yKTtcbiAqIC8vID0+IDMuMlxuICpcbiAqIF8udG9GaW5pdGUoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvRmluaXRlKEluZmluaXR5KTtcbiAqIC8vID0+IDEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4XG4gKlxuICogXy50b0Zpbml0ZSgnMy4yJyk7XG4gKiAvLyA9PiAzLjJcbiAqL1xuZnVuY3Rpb24gdG9GaW5pdGUodmFsdWUpIHtcbiAgaWYgKCF2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogMDtcbiAgfVxuICB2YWx1ZSA9IHRvTnVtYmVyKHZhbHVlKTtcbiAgaWYgKHZhbHVlID09PSBJTkZJTklUWSB8fCB2YWx1ZSA9PT0gLUlORklOSVRZKSB7XG4gICAgdmFyIHNpZ24gPSAodmFsdWUgPCAwID8gLTEgOiAxKTtcbiAgICByZXR1cm4gc2lnbiAqIE1BWF9JTlRFR0VSO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PT0gdmFsdWUgPyB2YWx1ZSA6IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9GaW5pdGU7XG4iLCAidmFyIHRvRmluaXRlID0gcmVxdWlyZSgnLi90b0Zpbml0ZScpO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYW4gaW50ZWdlci5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0ludGVnZXJgXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdG9pbnRlZ2VyKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBpbnRlZ2VyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvSW50ZWdlcigzLjIpO1xuICogLy8gPT4gM1xuICpcbiAqIF8udG9JbnRlZ2VyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gMFxuICpcbiAqIF8udG9JbnRlZ2VyKEluZmluaXR5KTtcbiAqIC8vID0+IDEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4XG4gKlxuICogXy50b0ludGVnZXIoJzMuMicpO1xuICogLy8gPT4gM1xuICovXG5mdW5jdGlvbiB0b0ludGVnZXIodmFsdWUpIHtcbiAgdmFyIHJlc3VsdCA9IHRvRmluaXRlKHZhbHVlKSxcbiAgICAgIHJlbWFpbmRlciA9IHJlc3VsdCAlIDE7XG5cbiAgcmV0dXJuIHJlc3VsdCA9PT0gcmVzdWx0ID8gKHJlbWFpbmRlciA/IHJlc3VsdCAtIHJlbWFpbmRlciA6IHJlc3VsdCkgOiAwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvSW50ZWdlcjtcbiIsICJ2YXIgYmFzZVJlcGVhdCA9IHJlcXVpcmUoJy4vX2Jhc2VSZXBlYXQnKSxcbiAgICBpc0l0ZXJhdGVlQ2FsbCA9IHJlcXVpcmUoJy4vX2lzSXRlcmF0ZWVDYWxsJyksXG4gICAgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi90b0ludGVnZXInKSxcbiAgICB0b1N0cmluZyA9IHJlcXVpcmUoJy4vdG9TdHJpbmcnKTtcblxuLyoqXG4gKiBSZXBlYXRzIHRoZSBnaXZlbiBzdHJpbmcgYG5gIHRpbWVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIHJlcGVhdC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbj0xXSBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIHJlcGVhdCB0aGUgc3RyaW5nLlxuICogQHBhcmFtLSB7T2JqZWN0fSBbZ3VhcmRdIEVuYWJsZXMgdXNlIGFzIGFuIGl0ZXJhdGVlIGZvciBtZXRob2RzIGxpa2UgYF8ubWFwYC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHJlcGVhdGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5yZXBlYXQoJyonLCAzKTtcbiAqIC8vID0+ICcqKionXG4gKlxuICogXy5yZXBlYXQoJ2FiYycsIDIpO1xuICogLy8gPT4gJ2FiY2FiYydcbiAqXG4gKiBfLnJlcGVhdCgnYWJjJywgMCk7XG4gKiAvLyA9PiAnJ1xuICovXG5mdW5jdGlvbiByZXBlYXQoc3RyaW5nLCBuLCBndWFyZCkge1xuICBpZiAoKGd1YXJkID8gaXNJdGVyYXRlZUNhbGwoc3RyaW5nLCBuLCBndWFyZCkgOiBuID09PSB1bmRlZmluZWQpKSB7XG4gICAgbiA9IDE7XG4gIH0gZWxzZSB7XG4gICAgbiA9IHRvSW50ZWdlcihuKTtcbiAgfVxuICByZXR1cm4gYmFzZVJlcGVhdCh0b1N0cmluZyhzdHJpbmcpLCBuKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZXBlYXQ7XG4iLCAiLyoqXG4gKiBHZXRzIHRoZSBsYXN0IGVsZW1lbnQgb2YgYGFycmF5YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBsYXN0IGVsZW1lbnQgb2YgYGFycmF5YC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5sYXN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiAzXG4gKi9cbmZ1bmN0aW9uIGxhc3QoYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoO1xuICByZXR1cm4gbGVuZ3RoID8gYXJyYXlbbGVuZ3RoIC0gMV0gOiB1bmRlZmluZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGFzdDtcbiIsICJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9yZXBlYXQgPSByZXF1aXJlKFwibG9kYXNoL3JlcGVhdFwiKTtcblxudmFyIF9yZXBlYXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVwZWF0KTtcblxudmFyIF9sYXN0ID0gcmVxdWlyZShcImxvZGFzaC9sYXN0XCIpO1xuXG52YXIgX2xhc3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGFzdCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IFwiZGVmYXVsdFwiOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgSU5ERU5UX1RZUEVfVE9QX0xFVkVMID0gXCJ0b3AtbGV2ZWxcIjtcbnZhciBJTkRFTlRfVFlQRV9CTE9DS19MRVZFTCA9IFwiYmxvY2stbGV2ZWxcIjtcblxuLyoqXG4gKiBNYW5hZ2VzIGluZGVudGF0aW9uIGxldmVscy5cbiAqXG4gKiBUaGVyZSBhcmUgdHdvIHR5cGVzIG9mIGluZGVudGF0aW9uIGxldmVsczpcbiAqXG4gKiAtIEJMT0NLX0xFVkVMIDogaW5jcmVhc2VkIGJ5IG9wZW4tcGFyZW50aGVzaXNcbiAqIC0gVE9QX0xFVkVMIDogaW5jcmVhc2VkIGJ5IFJFU0VSVkVEX1RPUExFVkVMIHdvcmRzXG4gKi9cblxudmFyIEluZGVudGF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpbmRlbnQgSW5kZW50IHZhbHVlLCBkZWZhdWx0IGlzIFwiICBcIiAoMiBzcGFjZXMpXG4gICAgICovXG4gICAgZnVuY3Rpb24gSW5kZW50YXRpb24oaW5kZW50KSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBJbmRlbnRhdGlvbik7XG5cbiAgICAgICAgdGhpcy5pbmRlbnQgPSBpbmRlbnQgfHwgXCIgIFwiO1xuICAgICAgICB0aGlzLmluZGVudFR5cGVzID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBjdXJyZW50IGluZGVudGF0aW9uIHN0cmluZy5cbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICovXG5cblxuICAgIEluZGVudGF0aW9uLnByb3RvdHlwZS5nZXRJbmRlbnQgPSBmdW5jdGlvbiBnZXRJbmRlbnQoKSB7XG4gICAgICAgIHJldHVybiAoMCwgX3JlcGVhdDJbXCJkZWZhdWx0XCJdKSh0aGlzLmluZGVudCwgdGhpcy5pbmRlbnRUeXBlcy5sZW5ndGgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBJbmNyZWFzZXMgaW5kZW50YXRpb24gYnkgb25lIHRvcC1sZXZlbCBpbmRlbnQuXG4gICAgICovXG5cblxuICAgIEluZGVudGF0aW9uLnByb3RvdHlwZS5pbmNyZWFzZVRvcGxldmVsID0gZnVuY3Rpb24gaW5jcmVhc2VUb3BsZXZlbCgpIHtcbiAgICAgICAgdGhpcy5pbmRlbnRUeXBlcy5wdXNoKElOREVOVF9UWVBFX1RPUF9MRVZFTCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEluY3JlYXNlcyBpbmRlbnRhdGlvbiBieSBvbmUgYmxvY2stbGV2ZWwgaW5kZW50LlxuICAgICAqL1xuXG5cbiAgICBJbmRlbnRhdGlvbi5wcm90b3R5cGUuaW5jcmVhc2VCbG9ja0xldmVsID0gZnVuY3Rpb24gaW5jcmVhc2VCbG9ja0xldmVsKCkge1xuICAgICAgICB0aGlzLmluZGVudFR5cGVzLnB1c2goSU5ERU5UX1RZUEVfQkxPQ0tfTEVWRUwpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWNyZWFzZXMgaW5kZW50YXRpb24gYnkgb25lIHRvcC1sZXZlbCBpbmRlbnQuXG4gICAgICogRG9lcyBub3RoaW5nIHdoZW4gdGhlIHByZXZpb3VzIGluZGVudCBpcyBub3QgdG9wLWxldmVsLlxuICAgICAqL1xuXG5cbiAgICBJbmRlbnRhdGlvbi5wcm90b3R5cGUuZGVjcmVhc2VUb3BMZXZlbCA9IGZ1bmN0aW9uIGRlY3JlYXNlVG9wTGV2ZWwoKSB7XG4gICAgICAgIGlmICgoMCwgX2xhc3QyW1wiZGVmYXVsdFwiXSkodGhpcy5pbmRlbnRUeXBlcykgPT09IElOREVOVF9UWVBFX1RPUF9MRVZFTCkge1xuICAgICAgICAgICAgdGhpcy5pbmRlbnRUeXBlcy5wb3AoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWNyZWFzZXMgaW5kZW50YXRpb24gYnkgb25lIGJsb2NrLWxldmVsIGluZGVudC5cbiAgICAgKiBJZiB0aGVyZSBhcmUgdG9wLWxldmVsIGluZGVudHMgd2l0aGluIHRoZSBibG9jay1sZXZlbCBpbmRlbnQsXG4gICAgICogdGhyb3dzIGF3YXkgdGhlc2UgYXMgd2VsbC5cbiAgICAgKi9cblxuXG4gICAgSW5kZW50YXRpb24ucHJvdG90eXBlLmRlY3JlYXNlQmxvY2tMZXZlbCA9IGZ1bmN0aW9uIGRlY3JlYXNlQmxvY2tMZXZlbCgpIHtcbiAgICAgICAgd2hpbGUgKHRoaXMuaW5kZW50VHlwZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFyIHR5cGUgPSB0aGlzLmluZGVudFR5cGVzLnBvcCgpO1xuICAgICAgICAgICAgaWYgKHR5cGUgIT09IElOREVOVF9UWVBFX1RPUF9MRVZFTCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBJbmRlbnRhdGlvbjtcbn0oKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBJbmRlbnRhdGlvbjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwgIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3Rva2VuVHlwZXMgPSByZXF1aXJlKFwiLi90b2tlblR5cGVzXCIpO1xuXG52YXIgX3Rva2VuVHlwZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdG9rZW5UeXBlcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IFwiZGVmYXVsdFwiOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgSU5MSU5FX01BWF9MRU5HVEggPSA1MDtcblxuLyoqXG4gKiBCb29ra2VlcGVyIGZvciBpbmxpbmUgYmxvY2tzLlxuICpcbiAqIElubGluZSBibG9ja3MgYXJlIHBhcmVudGhpemVkIGV4cHJlc3Npb25zIHRoYXQgYXJlIHNob3J0ZXIgdGhhbiBJTkxJTkVfTUFYX0xFTkdUSC5cbiAqIFRoZXNlIGJsb2NrcyBhcmUgZm9ybWF0dGVkIG9uIGEgc2luZ2xlIGxpbmUsIHVubGlrZSBsb25nZXIgcGFyZW50aGl6ZWRcbiAqIGV4cHJlc3Npb25zIHdoZXJlIG9wZW4tcGFyZW50aGVzaXMgY2F1c2VzIG5ld2xpbmUgYW5kIGluY3JlYXNlIG9mIGluZGVudGF0aW9uLlxuICovXG5cbnZhciBJbmxpbmVCbG9jayA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBJbmxpbmVCbG9jaygpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIElubGluZUJsb2NrKTtcblxuICAgICAgICB0aGlzLmxldmVsID0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCZWdpbnMgaW5saW5lIGJsb2NrIHdoZW4gbG9va2FoZWFkIHRocm91Z2ggdXBjb21pbmcgdG9rZW5zIGRldGVybWluZXNcbiAgICAgKiB0aGF0IHRoZSBibG9jayB3b3VsZCBiZSBzbWFsbGVyIHRoYW4gSU5MSU5FX01BWF9MRU5HVEguXG4gICAgICogQHBhcmFtICB7T2JqZWN0W119IHRva2VucyBBcnJheSBvZiBhbGwgdG9rZW5zXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBpbmRleCBDdXJyZW50IHRva2VuIHBvc2l0aW9uXG4gICAgICovXG5cblxuICAgIElubGluZUJsb2NrLnByb3RvdHlwZS5iZWdpbklmUG9zc2libGUgPSBmdW5jdGlvbiBiZWdpbklmUG9zc2libGUodG9rZW5zLCBpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5sZXZlbCA9PT0gMCAmJiB0aGlzLmlzSW5saW5lQmxvY2sodG9rZW5zLCBpbmRleCkpIHtcbiAgICAgICAgICAgIHRoaXMubGV2ZWwgPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubGV2ZWwgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmxldmVsKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxldmVsID0gMDtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGaW5pc2hlcyBjdXJyZW50IGlubGluZSBibG9jay5cbiAgICAgKiBUaGVyZSBtaWdodCBiZSBzZXZlcmFsIG5lc3RlZCBvbmVzLlxuICAgICAqL1xuXG5cbiAgICBJbmxpbmVCbG9jay5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gZW5kKCkge1xuICAgICAgICB0aGlzLmxldmVsLS07XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRydWUgd2hlbiBpbnNpZGUgYW4gaW5saW5lIGJsb2NrXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgSW5saW5lQmxvY2sucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxldmVsID4gMDtcbiAgICB9O1xuXG4gICAgLy8gQ2hlY2sgaWYgdGhpcyBzaG91bGQgYmUgYW4gaW5saW5lIHBhcmVudGhlc2VzIGJsb2NrXG4gICAgLy8gRXhhbXBsZXMgYXJlIFwiTk9XKClcIiwgXCJDT1VOVCgqKVwiLCBcImludCgxMClcIiwga2V5KGBzb21lY29sdW1uYCksIERFQ0lNQUwoNywyKVxuXG5cbiAgICBJbmxpbmVCbG9jay5wcm90b3R5cGUuaXNJbmxpbmVCbG9jayA9IGZ1bmN0aW9uIGlzSW5saW5lQmxvY2sodG9rZW5zLCBpbmRleCkge1xuICAgICAgICB2YXIgbGVuZ3RoID0gMDtcbiAgICAgICAgdmFyIGxldmVsID0gMDtcblxuICAgICAgICBmb3IgKHZhciBpID0gaW5kZXg7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgICAgICAgIGxlbmd0aCArPSB0b2tlbi52YWx1ZS5sZW5ndGg7XG5cbiAgICAgICAgICAgIC8vIE92ZXJyYW4gbWF4IGxlbmd0aFxuICAgICAgICAgICAgaWYgKGxlbmd0aCA+IElOTElORV9NQVhfTEVOR1RIKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gX3Rva2VuVHlwZXMyW1wiZGVmYXVsdFwiXS5PUEVOX1BBUkVOKSB7XG4gICAgICAgICAgICAgICAgbGV2ZWwrKztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gX3Rva2VuVHlwZXMyW1wiZGVmYXVsdFwiXS5DTE9TRV9QQVJFTikge1xuICAgICAgICAgICAgICAgIGxldmVsLS07XG4gICAgICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNGb3JiaWRkZW5Ub2tlbih0b2tlbikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAvLyBSZXNlcnZlZCB3b3JkcyB0aGF0IGNhdXNlIG5ld2xpbmVzLCBjb21tZW50cyBhbmQgc2VtaWNvbG9uc1xuICAgIC8vIGFyZSBub3QgYWxsb3dlZCBpbnNpZGUgaW5saW5lIHBhcmVudGhlc2VzIGJsb2NrXG5cblxuICAgIElubGluZUJsb2NrLnByb3RvdHlwZS5pc0ZvcmJpZGRlblRva2VuID0gZnVuY3Rpb24gaXNGb3JiaWRkZW5Ub2tlbihfcmVmKSB7XG4gICAgICAgIHZhciB0eXBlID0gX3JlZi50eXBlLFxuICAgICAgICAgICAgdmFsdWUgPSBfcmVmLnZhbHVlO1xuXG4gICAgICAgIHJldHVybiB0eXBlID09PSBfdG9rZW5UeXBlczJbXCJkZWZhdWx0XCJdLlJFU0VSVkVEX1RPUExFVkVMIHx8IHR5cGUgPT09IF90b2tlblR5cGVzMltcImRlZmF1bHRcIl0uUkVTRVJWRURfTkVXTElORSB8fCB0eXBlID09PSBfdG9rZW5UeXBlczJbXCJkZWZhdWx0XCJdLkNPTU1FTlQgfHwgdHlwZSA9PT0gX3Rva2VuVHlwZXMyW1wiZGVmYXVsdFwiXS5CTE9DS19DT01NRU5UIHx8IHZhbHVlID09PSBcIjtcIjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIElubGluZUJsb2NrO1xufSgpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IElubGluZUJsb2NrO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCAiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qKlxuICogSGFuZGxlcyBwbGFjZWhvbGRlciByZXBsYWNlbWVudCB3aXRoIGdpdmVuIHBhcmFtcy5cbiAqL1xudmFyIFBhcmFtcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zXG4gICAgICovXG4gICAgZnVuY3Rpb24gUGFyYW1zKHBhcmFtcykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUGFyYW1zKTtcblxuICAgICAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBwYXJhbSB2YWx1ZSB0aGF0IG1hdGNoZXMgZ2l2ZW4gcGxhY2Vob2xkZXIgd2l0aCBwYXJhbSBrZXkuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHRva2VuXG4gICAgICogICBAcGFyYW0ge1N0cmluZ30gdG9rZW4ua2V5IFBsYWNlaG9sZGVyIGtleVxuICAgICAqICAgQHBhcmFtIHtTdHJpbmd9IHRva2VuLnZhbHVlIFBsYWNlaG9sZGVyIHZhbHVlXG4gICAgICogQHJldHVybiB7U3RyaW5nfSBwYXJhbSBvciB0b2tlbi52YWx1ZSB3aGVuIHBhcmFtcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuXG5cbiAgICBQYXJhbXMucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldChfcmVmKSB7XG4gICAgICAgIHZhciBrZXkgPSBfcmVmLmtleSxcbiAgICAgICAgICAgIHZhbHVlID0gX3JlZi52YWx1ZTtcblxuICAgICAgICBpZiAoIXRoaXMucGFyYW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyYW1zW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucGFyYW1zW3RoaXMuaW5kZXgrK107XG4gICAgfTtcblxuICAgIHJldHVybiBQYXJhbXM7XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gUGFyYW1zO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCAiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdHJpbUVuZCA9IHJlcXVpcmUoXCJsb2Rhc2gvdHJpbUVuZFwiKTtcblxudmFyIF90cmltRW5kMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RyaW1FbmQpO1xuXG52YXIgX3Rva2VuVHlwZXMgPSByZXF1aXJlKFwiLi90b2tlblR5cGVzXCIpO1xuXG52YXIgX3Rva2VuVHlwZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdG9rZW5UeXBlcyk7XG5cbnZhciBfSW5kZW50YXRpb24gPSByZXF1aXJlKFwiLi9JbmRlbnRhdGlvblwiKTtcblxudmFyIF9JbmRlbnRhdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9JbmRlbnRhdGlvbik7XG5cbnZhciBfSW5saW5lQmxvY2sgPSByZXF1aXJlKFwiLi9JbmxpbmVCbG9ja1wiKTtcblxudmFyIF9JbmxpbmVCbG9jazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9JbmxpbmVCbG9jayk7XG5cbnZhciBfUGFyYW1zID0gcmVxdWlyZShcIi4vUGFyYW1zXCIpO1xuXG52YXIgX1BhcmFtczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9QYXJhbXMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEZvcm1hdHRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnXG4gICAgICogICBAcGFyYW0ge09iamVjdH0gY2ZnLmluZGVudFxuICAgICAqICAgQHBhcmFtIHtPYmplY3R9IGNmZy5wYXJhbXNcbiAgICAgKiBAcGFyYW0ge1Rva2VuaXplcn0gdG9rZW5pemVyXG4gICAgICovXG4gICAgZnVuY3Rpb24gRm9ybWF0dGVyKGNmZywgdG9rZW5pemVyKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBGb3JtYXR0ZXIpO1xuXG4gICAgICAgIHRoaXMuY2ZnID0gY2ZnIHx8IHt9O1xuICAgICAgICB0aGlzLmluZGVudGF0aW9uID0gbmV3IF9JbmRlbnRhdGlvbjJbXCJkZWZhdWx0XCJdKHRoaXMuY2ZnLmluZGVudCk7XG4gICAgICAgIHRoaXMuaW5saW5lQmxvY2sgPSBuZXcgX0lubGluZUJsb2NrMltcImRlZmF1bHRcIl0oKTtcbiAgICAgICAgdGhpcy5wYXJhbXMgPSBuZXcgX1BhcmFtczJbXCJkZWZhdWx0XCJdKHRoaXMuY2ZnLnBhcmFtcyk7XG4gICAgICAgIHRoaXMudG9rZW5pemVyID0gdG9rZW5pemVyO1xuICAgICAgICB0aGlzLnByZXZpb3VzUmVzZXJ2ZWRXb3JkID0ge307XG4gICAgICAgIHRoaXMudG9rZW5zID0gW107XG4gICAgICAgIHRoaXMuaW5kZXggPSAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvcm1hdHMgd2hpdGVzcGFjZXMgaW4gYSBTUUwgc3RyaW5nIHRvIG1ha2UgaXQgZWFzaWVyIHRvIHJlYWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcXVlcnkgVGhlIFNRTCBxdWVyeSBzdHJpbmdcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IGZvcm1hdHRlZCBxdWVyeVxuICAgICAqL1xuXG5cbiAgICBGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdCA9IGZ1bmN0aW9uIGZvcm1hdChxdWVyeSkge1xuICAgICAgICB0aGlzLnRva2VucyA9IHRoaXMudG9rZW5pemVyLnRva2VuaXplKHF1ZXJ5KTtcbiAgICAgICAgdmFyIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5nZXRGb3JtYXR0ZWRRdWVyeUZyb21Ub2tlbnMoKTtcblxuICAgICAgICByZXR1cm4gZm9ybWF0dGVkUXVlcnkudHJpbSgpO1xuICAgIH07XG5cbiAgICBGb3JtYXR0ZXIucHJvdG90eXBlLmdldEZvcm1hdHRlZFF1ZXJ5RnJvbVRva2VucyA9IGZ1bmN0aW9uIGdldEZvcm1hdHRlZFF1ZXJ5RnJvbVRva2VucygpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICB2YXIgZm9ybWF0dGVkUXVlcnkgPSBcIlwiO1xuXG4gICAgICAgIHRoaXMudG9rZW5zLmZvckVhY2goZnVuY3Rpb24gKHRva2VuLCBpbmRleCkge1xuICAgICAgICAgICAgX3RoaXMuaW5kZXggPSBpbmRleDtcblxuICAgICAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09IF90b2tlblR5cGVzMltcImRlZmF1bHRcIl0uV0hJVEVTUEFDRSkge1xuICAgICAgICAgICAgICAgIC8vIGlnbm9yZSAod2UgZG8gb3VyIG93biB3aGl0ZXNwYWNlIGZvcm1hdHRpbmcpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IF90b2tlblR5cGVzMltcImRlZmF1bHRcIl0uTElORV9DT01NRU5UKSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSBfdGhpcy5mb3JtYXRMaW5lQ29tbWVudCh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSBfdG9rZW5UeXBlczJbXCJkZWZhdWx0XCJdLkJMT0NLX0NPTU1FTlQpIHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IF90aGlzLmZvcm1hdEJsb2NrQ29tbWVudCh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSBfdG9rZW5UeXBlczJbXCJkZWZhdWx0XCJdLlJFU0VSVkVEX1RPUExFVkVMKSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSBfdGhpcy5mb3JtYXRUb3BsZXZlbFJlc2VydmVkV29yZCh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgICAgICAgICAgIF90aGlzLnByZXZpb3VzUmVzZXJ2ZWRXb3JkID0gdG9rZW47XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IF90b2tlblR5cGVzMltcImRlZmF1bHRcIl0uUkVTRVJWRURfTkVXTElORSkge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gX3RoaXMuZm9ybWF0TmV3bGluZVJlc2VydmVkV29yZCh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgICAgICAgICAgIF90aGlzLnByZXZpb3VzUmVzZXJ2ZWRXb3JkID0gdG9rZW47XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IF90b2tlblR5cGVzMltcImRlZmF1bHRcIl0uUkVTRVJWRUQpIHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IF90aGlzLmZvcm1hdFdpdGhTcGFjZXModG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgICAgICAgICAgICBfdGhpcy5wcmV2aW91c1Jlc2VydmVkV29yZCA9IHRva2VuO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSBfdG9rZW5UeXBlczJbXCJkZWZhdWx0XCJdLk9QRU5fUEFSRU4pIHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IF90aGlzLmZvcm1hdE9wZW5pbmdQYXJlbnRoZXNlcyh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSBfdG9rZW5UeXBlczJbXCJkZWZhdWx0XCJdLkNMT1NFX1BBUkVOKSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSBfdGhpcy5mb3JtYXRDbG9zaW5nUGFyZW50aGVzZXModG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gX3Rva2VuVHlwZXMyW1wiZGVmYXVsdFwiXS5QTEFDRUhPTERFUikge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gX3RoaXMuZm9ybWF0UGxhY2Vob2xkZXIodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodG9rZW4udmFsdWUgPT09IFwiLFwiKSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSBfdGhpcy5mb3JtYXRDb21tYSh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0b2tlbi52YWx1ZSA9PT0gXCI6XCIpIHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IF90aGlzLmZvcm1hdFdpdGhTcGFjZUFmdGVyKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRva2VuLnZhbHVlID09PSBcIi5cIikge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gX3RoaXMuZm9ybWF0V2l0aG91dFNwYWNlcyh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0b2tlbi52YWx1ZSA9PT0gXCI7XCIpIHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IF90aGlzLmZvcm1hdFF1ZXJ5U2VwYXJhdG9yKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gX3RoaXMuZm9ybWF0V2l0aFNwYWNlcyh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlZFF1ZXJ5O1xuICAgIH07XG5cbiAgICBGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdExpbmVDb21tZW50ID0gZnVuY3Rpb24gZm9ybWF0TGluZUNvbW1lbnQodG9rZW4sIHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZE5ld2xpbmUocXVlcnkgKyB0b2tlbi52YWx1ZSk7XG4gICAgfTtcblxuICAgIEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0QmxvY2tDb21tZW50ID0gZnVuY3Rpb24gZm9ybWF0QmxvY2tDb21tZW50KHRva2VuLCBxdWVyeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGROZXdsaW5lKHRoaXMuYWRkTmV3bGluZShxdWVyeSkgKyB0aGlzLmluZGVudENvbW1lbnQodG9rZW4udmFsdWUpKTtcbiAgICB9O1xuXG4gICAgRm9ybWF0dGVyLnByb3RvdHlwZS5pbmRlbnRDb21tZW50ID0gZnVuY3Rpb24gaW5kZW50Q29tbWVudChjb21tZW50KSB7XG4gICAgICAgIHJldHVybiBjb21tZW50LnJlcGxhY2UoL1xcbi9nLCBcIlxcblwiICsgdGhpcy5pbmRlbnRhdGlvbi5nZXRJbmRlbnQoKSk7XG4gICAgfTtcblxuICAgIEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0VG9wbGV2ZWxSZXNlcnZlZFdvcmQgPSBmdW5jdGlvbiBmb3JtYXRUb3BsZXZlbFJlc2VydmVkV29yZCh0b2tlbiwgcXVlcnkpIHtcbiAgICAgICAgdGhpcy5pbmRlbnRhdGlvbi5kZWNyZWFzZVRvcExldmVsKCk7XG5cbiAgICAgICAgcXVlcnkgPSB0aGlzLmFkZE5ld2xpbmUocXVlcnkpO1xuXG4gICAgICAgIHRoaXMuaW5kZW50YXRpb24uaW5jcmVhc2VUb3BsZXZlbCgpO1xuXG4gICAgICAgIHF1ZXJ5ICs9IHRoaXMuZXF1YWxpemVXaGl0ZXNwYWNlKHRva2VuLnZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkTmV3bGluZShxdWVyeSk7XG4gICAgfTtcblxuICAgIEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0TmV3bGluZVJlc2VydmVkV29yZCA9IGZ1bmN0aW9uIGZvcm1hdE5ld2xpbmVSZXNlcnZlZFdvcmQodG9rZW4sIHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZE5ld2xpbmUocXVlcnkpICsgdGhpcy5lcXVhbGl6ZVdoaXRlc3BhY2UodG9rZW4udmFsdWUpICsgXCIgXCI7XG4gICAgfTtcblxuICAgIC8vIFJlcGxhY2UgYW55IHNlcXVlbmNlIG9mIHdoaXRlc3BhY2UgY2hhcmFjdGVycyB3aXRoIHNpbmdsZSBzcGFjZVxuXG5cbiAgICBGb3JtYXR0ZXIucHJvdG90eXBlLmVxdWFsaXplV2hpdGVzcGFjZSA9IGZ1bmN0aW9uIGVxdWFsaXplV2hpdGVzcGFjZShzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9cXHMrL2csIFwiIFwiKTtcbiAgICB9O1xuXG4gICAgLy8gT3BlbmluZyBwYXJlbnRoZXNlcyBpbmNyZWFzZSB0aGUgYmxvY2sgaW5kZW50IGxldmVsIGFuZCBzdGFydCBhIG5ldyBsaW5lXG5cblxuICAgIEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0T3BlbmluZ1BhcmVudGhlc2VzID0gZnVuY3Rpb24gZm9ybWF0T3BlbmluZ1BhcmVudGhlc2VzKHRva2VuLCBxdWVyeSkge1xuICAgICAgICAvLyBUYWtlIG91dCB0aGUgcHJlY2VkaW5nIHNwYWNlIHVubGVzcyB0aGVyZSB3YXMgd2hpdGVzcGFjZSB0aGVyZSBpbiB0aGUgb3JpZ2luYWwgcXVlcnlcbiAgICAgICAgLy8gb3IgYW5vdGhlciBvcGVuaW5nIHBhcmVucyBvciBsaW5lIGNvbW1lbnRcbiAgICAgICAgdmFyIHByZXNlcnZlV2hpdGVzcGFjZUZvciA9IFtfdG9rZW5UeXBlczJbXCJkZWZhdWx0XCJdLldISVRFU1BBQ0UsIF90b2tlblR5cGVzMltcImRlZmF1bHRcIl0uT1BFTl9QQVJFTiwgX3Rva2VuVHlwZXMyW1wiZGVmYXVsdFwiXS5MSU5FX0NPTU1FTlRdO1xuICAgICAgICBpZiAoIXByZXNlcnZlV2hpdGVzcGFjZUZvci5pbmNsdWRlcyh0aGlzLnByZXZpb3VzVG9rZW4oKS50eXBlKSkge1xuICAgICAgICAgICAgcXVlcnkgPSAoMCwgX3RyaW1FbmQyW1wiZGVmYXVsdFwiXSkocXVlcnkpO1xuICAgICAgICB9XG4gICAgICAgIHF1ZXJ5ICs9IHRva2VuLnZhbHVlO1xuXG4gICAgICAgIHRoaXMuaW5saW5lQmxvY2suYmVnaW5JZlBvc3NpYmxlKHRoaXMudG9rZW5zLCB0aGlzLmluZGV4KTtcblxuICAgICAgICBpZiAoIXRoaXMuaW5saW5lQmxvY2suaXNBY3RpdmUoKSkge1xuICAgICAgICAgICAgdGhpcy5pbmRlbnRhdGlvbi5pbmNyZWFzZUJsb2NrTGV2ZWwoKTtcbiAgICAgICAgICAgIHF1ZXJ5ID0gdGhpcy5hZGROZXdsaW5lKHF1ZXJ5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcXVlcnk7XG4gICAgfTtcblxuICAgIC8vIENsb3NpbmcgcGFyZW50aGVzZXMgZGVjcmVhc2UgdGhlIGJsb2NrIGluZGVudCBsZXZlbFxuXG5cbiAgICBGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdENsb3NpbmdQYXJlbnRoZXNlcyA9IGZ1bmN0aW9uIGZvcm1hdENsb3NpbmdQYXJlbnRoZXNlcyh0b2tlbiwgcXVlcnkpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5saW5lQmxvY2suaXNBY3RpdmUoKSkge1xuICAgICAgICAgICAgdGhpcy5pbmxpbmVCbG9jay5lbmQoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1hdFdpdGhTcGFjZUFmdGVyKHRva2VuLCBxdWVyeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmluZGVudGF0aW9uLmRlY3JlYXNlQmxvY2tMZXZlbCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0V2l0aFNwYWNlcyh0b2tlbiwgdGhpcy5hZGROZXdsaW5lKHF1ZXJ5KSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRQbGFjZWhvbGRlciA9IGZ1bmN0aW9uIGZvcm1hdFBsYWNlaG9sZGVyKHRva2VuLCBxdWVyeSkge1xuICAgICAgICByZXR1cm4gcXVlcnkgKyB0aGlzLnBhcmFtcy5nZXQodG9rZW4pICsgXCIgXCI7XG4gICAgfTtcblxuICAgIC8vIENvbW1hcyBzdGFydCBhIG5ldyBsaW5lICh1bmxlc3Mgd2l0aGluIGlubGluZSBwYXJlbnRoZXNlcyBvciBTUUwgXCJMSU1JVFwiIGNsYXVzZSlcblxuXG4gICAgRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRDb21tYSA9IGZ1bmN0aW9uIGZvcm1hdENvbW1hKHRva2VuLCBxdWVyeSkge1xuICAgICAgICBxdWVyeSA9IHRoaXMudHJpbVRyYWlsaW5nV2hpdGVzcGFjZShxdWVyeSkgKyB0b2tlbi52YWx1ZSArIFwiIFwiO1xuXG4gICAgICAgIGlmICh0aGlzLmlubGluZUJsb2NrLmlzQWN0aXZlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBxdWVyeTtcbiAgICAgICAgfSBlbHNlIGlmICgvXkxJTUlUJC9pLnRlc3QodGhpcy5wcmV2aW91c1Jlc2VydmVkV29yZC52YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBxdWVyeTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZE5ld2xpbmUocXVlcnkpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0V2l0aFNwYWNlQWZ0ZXIgPSBmdW5jdGlvbiBmb3JtYXRXaXRoU3BhY2VBZnRlcih0b2tlbiwgcXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJpbVRyYWlsaW5nV2hpdGVzcGFjZShxdWVyeSkgKyB0b2tlbi52YWx1ZSArIFwiIFwiO1xuICAgIH07XG5cbiAgICBGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdFdpdGhvdXRTcGFjZXMgPSBmdW5jdGlvbiBmb3JtYXRXaXRob3V0U3BhY2VzKHRva2VuLCBxdWVyeSkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmltVHJhaWxpbmdXaGl0ZXNwYWNlKHF1ZXJ5KSArIHRva2VuLnZhbHVlO1xuICAgIH07XG5cbiAgICBGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdFdpdGhTcGFjZXMgPSBmdW5jdGlvbiBmb3JtYXRXaXRoU3BhY2VzKHRva2VuLCBxdWVyeSkge1xuICAgICAgICByZXR1cm4gcXVlcnkgKyB0b2tlbi52YWx1ZSArIFwiIFwiO1xuICAgIH07XG5cbiAgICBGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdFF1ZXJ5U2VwYXJhdG9yID0gZnVuY3Rpb24gZm9ybWF0UXVlcnlTZXBhcmF0b3IodG9rZW4sIHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyaW1UcmFpbGluZ1doaXRlc3BhY2UocXVlcnkpICsgdG9rZW4udmFsdWUgKyBcIlxcblwiO1xuICAgIH07XG5cbiAgICBGb3JtYXR0ZXIucHJvdG90eXBlLmFkZE5ld2xpbmUgPSBmdW5jdGlvbiBhZGROZXdsaW5lKHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiAoMCwgX3RyaW1FbmQyW1wiZGVmYXVsdFwiXSkocXVlcnkpICsgXCJcXG5cIiArIHRoaXMuaW5kZW50YXRpb24uZ2V0SW5kZW50KCk7XG4gICAgfTtcblxuICAgIEZvcm1hdHRlci5wcm90b3R5cGUudHJpbVRyYWlsaW5nV2hpdGVzcGFjZSA9IGZ1bmN0aW9uIHRyaW1UcmFpbGluZ1doaXRlc3BhY2UocXVlcnkpIHtcbiAgICAgICAgaWYgKHRoaXMucHJldmlvdXNOb25XaGl0ZXNwYWNlVG9rZW4oKS50eXBlID09PSBfdG9rZW5UeXBlczJbXCJkZWZhdWx0XCJdLkxJTkVfQ09NTUVOVCkge1xuICAgICAgICAgICAgcmV0dXJuICgwLCBfdHJpbUVuZDJbXCJkZWZhdWx0XCJdKShxdWVyeSkgKyBcIlxcblwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICgwLCBfdHJpbUVuZDJbXCJkZWZhdWx0XCJdKShxdWVyeSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRm9ybWF0dGVyLnByb3RvdHlwZS5wcmV2aW91c05vbldoaXRlc3BhY2VUb2tlbiA9IGZ1bmN0aW9uIHByZXZpb3VzTm9uV2hpdGVzcGFjZVRva2VuKCkge1xuICAgICAgICB2YXIgbiA9IDE7XG4gICAgICAgIHdoaWxlICh0aGlzLnByZXZpb3VzVG9rZW4obikudHlwZSA9PT0gX3Rva2VuVHlwZXMyW1wiZGVmYXVsdFwiXS5XSElURVNQQUNFKSB7XG4gICAgICAgICAgICBuKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucHJldmlvdXNUb2tlbihuKTtcbiAgICB9O1xuXG4gICAgRm9ybWF0dGVyLnByb3RvdHlwZS5wcmV2aW91c1Rva2VuID0gZnVuY3Rpb24gcHJldmlvdXNUb2tlbigpIHtcbiAgICAgICAgdmFyIG9mZnNldCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogMTtcblxuICAgICAgICByZXR1cm4gdGhpcy50b2tlbnNbdGhpcy5pbmRleCAtIG9mZnNldF0gfHwge307XG4gICAgfTtcblxuICAgIHJldHVybiBGb3JtYXR0ZXI7XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gRm9ybWF0dGVyO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCAiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzUHJvdG90eXBlO1xuIiwgIi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG92ZXJBcmc7XG4iLCAidmFyIG92ZXJBcmcgPSByZXF1aXJlKCcuL19vdmVyQXJnJyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVLZXlzID0gb3ZlckFyZyhPYmplY3Qua2V5cywgT2JqZWN0KTtcblxubW9kdWxlLmV4cG9ydHMgPSBuYXRpdmVLZXlzO1xuIiwgInZhciBpc1Byb3RvdHlwZSA9IHJlcXVpcmUoJy4vX2lzUHJvdG90eXBlJyksXG4gICAgbmF0aXZlS2V5cyA9IHJlcXVpcmUoJy4vX25hdGl2ZUtleXMnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzYCB3aGljaCBkb2Vzbid0IHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzKG9iamVjdCkge1xuICBpZiAoIWlzUHJvdG90eXBlKG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5cyhvYmplY3QpO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGtleSAhPSAnY29uc3RydWN0b3InKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VLZXlzO1xuIiwgInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb3ZlcnJlYWNoaW5nIGNvcmUtanMgc2hpbXMuICovXG52YXIgY29yZUpzRGF0YSA9IHJvb3RbJ19fY29yZS1qc19zaGFyZWRfXyddO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcmVKc0RhdGE7XG4iLCAidmFyIGNvcmVKc0RhdGEgPSByZXF1aXJlKCcuL19jb3JlSnNEYXRhJyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtZXRob2RzIG1hc3F1ZXJhZGluZyBhcyBuYXRpdmUuICovXG52YXIgbWFza1NyY0tleSA9IChmdW5jdGlvbigpIHtcbiAgdmFyIHVpZCA9IC9bXi5dKyQvLmV4ZWMoY29yZUpzRGF0YSAmJiBjb3JlSnNEYXRhLmtleXMgJiYgY29yZUpzRGF0YS5rZXlzLklFX1BST1RPIHx8ICcnKTtcbiAgcmV0dXJuIHVpZCA/ICgnU3ltYm9sKHNyYylfMS4nICsgdWlkKSA6ICcnO1xufSgpKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYGZ1bmNgIGhhcyBpdHMgc291cmNlIG1hc2tlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGZ1bmNgIGlzIG1hc2tlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc01hc2tlZChmdW5jKSB7XG4gIHJldHVybiAhIW1hc2tTcmNLZXkgJiYgKG1hc2tTcmNLZXkgaW4gZnVuYyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNNYXNrZWQ7XG4iLCAiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgZnVuY2AgdG8gaXRzIHNvdXJjZSBjb2RlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc291cmNlIGNvZGUuXG4gKi9cbmZ1bmN0aW9uIHRvU291cmNlKGZ1bmMpIHtcbiAgaWYgKGZ1bmMgIT0gbnVsbCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZnVuY1RvU3RyaW5nLmNhbGwoZnVuYyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChmdW5jICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvU291cmNlO1xuIiwgInZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNNYXNrZWQgPSByZXF1aXJlKCcuL19pc01hc2tlZCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIHRvU291cmNlID0gcmVxdWlyZSgnLi9fdG9Tb3VyY2UnKTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXBhdHRlcm5zKS5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmF0aXZlYCB3aXRob3V0IGJhZCBzaGltIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbixcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSB8fCBpc01hc2tlZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHBhdHRlcm4gPSBpc0Z1bmN0aW9uKHZhbHVlKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNOYXRpdmU7XG4iLCAiLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0VmFsdWU7XG4iLCAidmFyIGJhc2VJc05hdGl2ZSA9IHJlcXVpcmUoJy4vX2Jhc2VJc05hdGl2ZScpLFxuICAgIGdldFZhbHVlID0gcmVxdWlyZSgnLi9fZ2V0VmFsdWUnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgcmV0dXJuIGJhc2VJc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXROYXRpdmU7XG4iLCAidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpLFxuICAgIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBEYXRhVmlldyA9IGdldE5hdGl2ZShyb290LCAnRGF0YVZpZXcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBEYXRhVmlldztcbiIsICJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFwO1xuIiwgInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuL19nZXROYXRpdmUnKSxcbiAgICByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgUHJvbWlzZSA9IGdldE5hdGl2ZShyb290LCAnUHJvbWlzZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb21pc2U7XG4iLCAidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpLFxuICAgIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBTZXQgPSBnZXROYXRpdmUocm9vdCwgJ1NldCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNldDtcbiIsICJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIFdlYWtNYXAgPSBnZXROYXRpdmUocm9vdCwgJ1dlYWtNYXAnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBXZWFrTWFwO1xuIiwgInZhciBEYXRhVmlldyA9IHJlcXVpcmUoJy4vX0RhdGFWaWV3JyksXG4gICAgTWFwID0gcmVxdWlyZSgnLi9fTWFwJyksXG4gICAgUHJvbWlzZSA9IHJlcXVpcmUoJy4vX1Byb21pc2UnKSxcbiAgICBTZXQgPSByZXF1aXJlKCcuL19TZXQnKSxcbiAgICBXZWFrTWFwID0gcmVxdWlyZSgnLi9fV2Vha01hcCcpLFxuICAgIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgdG9Tb3VyY2UgPSByZXF1aXJlKCcuL190b1NvdXJjZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcHJvbWlzZVRhZyA9ICdbb2JqZWN0IFByb21pc2VdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWFwcywgc2V0cywgYW5kIHdlYWttYXBzLiAqL1xudmFyIGRhdGFWaWV3Q3RvclN0cmluZyA9IHRvU291cmNlKERhdGFWaWV3KSxcbiAgICBtYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoTWFwKSxcbiAgICBwcm9taXNlQ3RvclN0cmluZyA9IHRvU291cmNlKFByb21pc2UpLFxuICAgIHNldEN0b3JTdHJpbmcgPSB0b1NvdXJjZShTZXQpLFxuICAgIHdlYWtNYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoV2Vha01hcCk7XG5cbi8qKlxuICogR2V0cyB0aGUgYHRvU3RyaW5nVGFnYCBvZiBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbnZhciBnZXRUYWcgPSBiYXNlR2V0VGFnO1xuXG4vLyBGYWxsYmFjayBmb3IgZGF0YSB2aWV3cywgbWFwcywgc2V0cywgYW5kIHdlYWsgbWFwcyBpbiBJRSAxMSBhbmQgcHJvbWlzZXMgaW4gTm9kZS5qcyA8IDYuXG5pZiAoKERhdGFWaWV3ICYmIGdldFRhZyhuZXcgRGF0YVZpZXcobmV3IEFycmF5QnVmZmVyKDEpKSkgIT0gZGF0YVZpZXdUYWcpIHx8XG4gICAgKE1hcCAmJiBnZXRUYWcobmV3IE1hcCkgIT0gbWFwVGFnKSB8fFxuICAgIChQcm9taXNlICYmIGdldFRhZyhQcm9taXNlLnJlc29sdmUoKSkgIT0gcHJvbWlzZVRhZykgfHxcbiAgICAoU2V0ICYmIGdldFRhZyhuZXcgU2V0KSAhPSBzZXRUYWcpIHx8XG4gICAgKFdlYWtNYXAgJiYgZ2V0VGFnKG5ldyBXZWFrTWFwKSAhPSB3ZWFrTWFwVGFnKSkge1xuICBnZXRUYWcgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciByZXN1bHQgPSBiYXNlR2V0VGFnKHZhbHVlKSxcbiAgICAgICAgQ3RvciA9IHJlc3VsdCA9PSBvYmplY3RUYWcgPyB2YWx1ZS5jb25zdHJ1Y3RvciA6IHVuZGVmaW5lZCxcbiAgICAgICAgY3RvclN0cmluZyA9IEN0b3IgPyB0b1NvdXJjZShDdG9yKSA6ICcnO1xuXG4gICAgaWYgKGN0b3JTdHJpbmcpIHtcbiAgICAgIHN3aXRjaCAoY3RvclN0cmluZykge1xuICAgICAgICBjYXNlIGRhdGFWaWV3Q3RvclN0cmluZzogcmV0dXJuIGRhdGFWaWV3VGFnO1xuICAgICAgICBjYXNlIG1hcEN0b3JTdHJpbmc6IHJldHVybiBtYXBUYWc7XG4gICAgICAgIGNhc2UgcHJvbWlzZUN0b3JTdHJpbmc6IHJldHVybiBwcm9taXNlVGFnO1xuICAgICAgICBjYXNlIHNldEN0b3JTdHJpbmc6IHJldHVybiBzZXRUYWc7XG4gICAgICAgIGNhc2Ugd2Vha01hcEN0b3JTdHJpbmc6IHJldHVybiB3ZWFrTWFwVGFnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFRhZztcbiIsICJ2YXIgYmFzZUdldFRhZyA9IHJlcXVpcmUoJy4vX2Jhc2VHZXRUYWcnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzQXJndW1lbnRzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0FyZ3VtZW50cyh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBiYXNlR2V0VGFnKHZhbHVlKSA9PSBhcmdzVGFnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc0FyZ3VtZW50cztcbiIsICJ2YXIgYmFzZUlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi9fYmFzZUlzQXJndW1lbnRzJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJndW1lbnRzID0gYmFzZUlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID8gYmFzZUlzQXJndW1lbnRzIDogZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpICYmXG4gICAgIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcmd1bWVudHM7XG4iLCAiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGBmYWxzZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEzLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRpbWVzKDIsIF8uc3R1YkZhbHNlKTtcbiAqIC8vID0+IFtmYWxzZSwgZmFsc2VdXG4gKi9cbmZ1bmN0aW9uIHN0dWJGYWxzZSgpIHtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0dWJGYWxzZTtcbiIsICJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKSxcbiAgICBzdHViRmFsc2UgPSByZXF1aXJlKCcuL3N0dWJGYWxzZScpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIEJ1ZmZlciA9IG1vZHVsZUV4cG9ydHMgPyByb290LkJ1ZmZlciA6IHVuZGVmaW5lZDtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUlzQnVmZmVyID0gQnVmZmVyID8gQnVmZmVyLmlzQnVmZmVyIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgYnVmZmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4zLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgYnVmZmVyLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IEJ1ZmZlcigyKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0J1ZmZlcihuZXcgVWludDhBcnJheSgyKSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNCdWZmZXIgPSBuYXRpdmVJc0J1ZmZlciB8fCBzdHViRmFsc2U7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNCdWZmZXI7XG4iLCAidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgb2YgdHlwZWQgYXJyYXlzLiAqL1xudmFyIHR5cGVkQXJyYXlUYWdzID0ge307XG50eXBlZEFycmF5VGFnc1tmbG9hdDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Zsb2F0NjRUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDhUYWddID0gdHlwZWRBcnJheVRhZ3NbaW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQ4VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50OENsYW1wZWRUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbnR5cGVkQXJyYXlUYWdzW2FyZ3NUYWddID0gdHlwZWRBcnJheVRhZ3NbYXJyYXlUYWddID1cbnR5cGVkQXJyYXlUYWdzW2FycmF5QnVmZmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Jvb2xUYWddID1cbnR5cGVkQXJyYXlUYWdzW2RhdGFWaWV3VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2RhdGVUYWddID1cbnR5cGVkQXJyYXlUYWdzW2Vycm9yVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Z1bmNUYWddID1cbnR5cGVkQXJyYXlUYWdzW21hcFRhZ10gPSB0eXBlZEFycmF5VGFnc1tudW1iZXJUYWddID1cbnR5cGVkQXJyYXlUYWdzW29iamVjdFRhZ10gPSB0eXBlZEFycmF5VGFnc1tyZWdleHBUYWddID1cbnR5cGVkQXJyYXlUYWdzW3NldFRhZ10gPSB0eXBlZEFycmF5VGFnc1tzdHJpbmdUYWddID1cbnR5cGVkQXJyYXlUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNUeXBlZEFycmF5YCB3aXRob3V0IE5vZGUuanMgb3B0aW1pemF0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc1R5cGVkQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiZcbiAgICBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICEhdHlwZWRBcnJheVRhZ3NbYmFzZUdldFRhZyh2YWx1ZSldO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc1R5cGVkQXJyYXk7XG4iLCAiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy51bmFyeWAgd2l0aG91dCBzdXBwb3J0IGZvciBzdG9yaW5nIG1ldGFkYXRhLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjYXAgYXJndW1lbnRzIGZvci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNhcHBlZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVVuYXJ5KGZ1bmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmModmFsdWUpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VVbmFyeTtcbiIsICJ2YXIgZnJlZUdsb2JhbCA9IHJlcXVpcmUoJy4vX2ZyZWVHbG9iYWwnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHByb2Nlc3NgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlUHJvY2VzcyA9IG1vZHVsZUV4cG9ydHMgJiYgZnJlZUdsb2JhbC5wcm9jZXNzO1xuXG4vKiogVXNlZCB0byBhY2Nlc3MgZmFzdGVyIE5vZGUuanMgaGVscGVycy4gKi9cbnZhciBub2RlVXRpbCA9IChmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICAvLyBVc2UgYHV0aWwudHlwZXNgIGZvciBOb2RlLmpzIDEwKy5cbiAgICB2YXIgdHlwZXMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUucmVxdWlyZSAmJiBmcmVlTW9kdWxlLnJlcXVpcmUoJ3V0aWwnKS50eXBlcztcblxuICAgIGlmICh0eXBlcykge1xuICAgICAgcmV0dXJuIHR5cGVzO1xuICAgIH1cblxuICAgIC8vIExlZ2FjeSBgcHJvY2Vzcy5iaW5kaW5nKCd1dGlsJylgIGZvciBOb2RlLmpzIDwgMTAuXG4gICAgcmV0dXJuIGZyZWVQcm9jZXNzICYmIGZyZWVQcm9jZXNzLmJpbmRpbmcgJiYgZnJlZVByb2Nlc3MuYmluZGluZygndXRpbCcpO1xuICB9IGNhdGNoIChlKSB7fVxufSgpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBub2RlVXRpbDtcbiIsICJ2YXIgYmFzZUlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4vX2Jhc2VJc1R5cGVkQXJyYXknKSxcbiAgICBiYXNlVW5hcnkgPSByZXF1aXJlKCcuL19iYXNlVW5hcnknKSxcbiAgICBub2RlVXRpbCA9IHJlcXVpcmUoJy4vX25vZGVVdGlsJyk7XG5cbi8qIE5vZGUuanMgaGVscGVyIHJlZmVyZW5jZXMuICovXG52YXIgbm9kZUlzVHlwZWRBcnJheSA9IG5vZGVVdGlsICYmIG5vZGVVdGlsLmlzVHlwZWRBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShuZXcgVWludDhBcnJheSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkoW10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzVHlwZWRBcnJheSA9IG5vZGVJc1R5cGVkQXJyYXkgPyBiYXNlVW5hcnkobm9kZUlzVHlwZWRBcnJheSkgOiBiYXNlSXNUeXBlZEFycmF5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzVHlwZWRBcnJheTtcbiIsICJ2YXIgYmFzZUtleXMgPSByZXF1aXJlKCcuL19iYXNlS2V5cycpLFxuICAgIGdldFRhZyA9IHJlcXVpcmUoJy4vX2dldFRhZycpLFxuICAgIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc0J1ZmZlciA9IHJlcXVpcmUoJy4vaXNCdWZmZXInKSxcbiAgICBpc1Byb3RvdHlwZSA9IHJlcXVpcmUoJy4vX2lzUHJvdG90eXBlJyksXG4gICAgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi9pc1R5cGVkQXJyYXknKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFuIGVtcHR5IG9iamVjdCwgY29sbGVjdGlvbiwgbWFwLCBvciBzZXQuXG4gKlxuICogT2JqZWN0cyBhcmUgY29uc2lkZXJlZCBlbXB0eSBpZiB0aGV5IGhhdmUgbm8gb3duIGVudW1lcmFibGUgc3RyaW5nIGtleWVkXG4gKiBwcm9wZXJ0aWVzLlxuICpcbiAqIEFycmF5LWxpa2UgdmFsdWVzIHN1Y2ggYXMgYGFyZ3VtZW50c2Agb2JqZWN0cywgYXJyYXlzLCBidWZmZXJzLCBzdHJpbmdzLCBvclxuICogalF1ZXJ5LWxpa2UgY29sbGVjdGlvbnMgYXJlIGNvbnNpZGVyZWQgZW1wdHkgaWYgdGhleSBoYXZlIGEgYGxlbmd0aGAgb2YgYDBgLlxuICogU2ltaWxhcmx5LCBtYXBzIGFuZCBzZXRzIGFyZSBjb25zaWRlcmVkIGVtcHR5IGlmIHRoZXkgaGF2ZSBhIGBzaXplYCBvZiBgMGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZW1wdHksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0VtcHR5KG51bGwpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNFbXB0eSh0cnVlKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRW1wdHkoMSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0VtcHR5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNFbXB0eSh7ICdhJzogMSB9KTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRW1wdHkodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoaXNBcnJheUxpa2UodmFsdWUpICYmXG4gICAgICAoaXNBcnJheSh2YWx1ZSkgfHwgdHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZS5zcGxpY2UgPT0gJ2Z1bmN0aW9uJyB8fFxuICAgICAgICBpc0J1ZmZlcih2YWx1ZSkgfHwgaXNUeXBlZEFycmF5KHZhbHVlKSB8fCBpc0FyZ3VtZW50cyh2YWx1ZSkpKSB7XG4gICAgcmV0dXJuICF2YWx1ZS5sZW5ndGg7XG4gIH1cbiAgdmFyIHRhZyA9IGdldFRhZyh2YWx1ZSk7XG4gIGlmICh0YWcgPT0gbWFwVGFnIHx8IHRhZyA9PSBzZXRUYWcpIHtcbiAgICByZXR1cm4gIXZhbHVlLnNpemU7XG4gIH1cbiAgaWYgKGlzUHJvdG90eXBlKHZhbHVlKSkge1xuICAgIHJldHVybiAhYmFzZUtleXModmFsdWUpLmxlbmd0aDtcbiAgfVxuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwga2V5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0VtcHR5O1xuIiwgInZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4vdG9TdHJpbmcnKTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXBhdHRlcm5zKS5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZyxcbiAgICByZUhhc1JlZ0V4cENoYXIgPSBSZWdFeHAocmVSZWdFeHBDaGFyLnNvdXJjZSk7XG5cbi8qKlxuICogRXNjYXBlcyB0aGUgYFJlZ0V4cGAgc3BlY2lhbCBjaGFyYWN0ZXJzIFwiXlwiLCBcIiRcIiwgXCJcXFwiLCBcIi5cIiwgXCIqXCIsIFwiK1wiLFxuICogXCI/XCIsIFwiKFwiLCBcIilcIiwgXCJbXCIsIFwiXVwiLCBcIntcIiwgXCJ9XCIsIGFuZCBcInxcIiBpbiBgc3RyaW5nYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5lc2NhcGVSZWdFeHAoJ1tsb2Rhc2hdKGh0dHBzOi8vbG9kYXNoLmNvbS8pJyk7XG4gKiAvLyA9PiAnXFxbbG9kYXNoXFxdXFwoaHR0cHM6Ly9sb2Rhc2hcXC5jb20vXFwpJ1xuICovXG5mdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyaW5nKSB7XG4gIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG4gIHJldHVybiAoc3RyaW5nICYmIHJlSGFzUmVnRXhwQ2hhci50ZXN0KHN0cmluZykpXG4gICAgPyBzdHJpbmcucmVwbGFjZShyZVJlZ0V4cENoYXIsICdcXFxcJCYnKVxuICAgIDogc3RyaW5nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVzY2FwZVJlZ0V4cDtcbiIsICJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9pc0VtcHR5ID0gcmVxdWlyZShcImxvZGFzaC9pc0VtcHR5XCIpO1xuXG52YXIgX2lzRW1wdHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNFbXB0eSk7XG5cbnZhciBfZXNjYXBlUmVnRXhwID0gcmVxdWlyZShcImxvZGFzaC9lc2NhcGVSZWdFeHBcIik7XG5cbnZhciBfZXNjYXBlUmVnRXhwMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2VzY2FwZVJlZ0V4cCk7XG5cbnZhciBfdG9rZW5UeXBlcyA9IHJlcXVpcmUoXCIuL3Rva2VuVHlwZXNcIik7XG5cbnZhciBfdG9rZW5UeXBlczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90b2tlblR5cGVzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgXCJkZWZhdWx0XCI6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBUb2tlbml6ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNmZ1xuICAgICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcucmVzZXJ2ZWRXb3JkcyBSZXNlcnZlZCB3b3JkcyBpbiBTUUxcbiAgICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLnJlc2VydmVkVG9wbGV2ZWxXb3JkcyBXb3JkcyB0aGF0IGFyZSBzZXQgdG8gbmV3IGxpbmUgc2VwYXJhdGVseVxuICAgICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcucmVzZXJ2ZWROZXdsaW5lV29yZHMgV29yZHMgdGhhdCBhcmUgc2V0IHRvIG5ld2xpbmVcbiAgICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLnN0cmluZ1R5cGVzIFN0cmluZyB0eXBlcyB0byBlbmFibGU6IFwiXCIsICcnLCBgYCwgW10sIE4nJ1xuICAgICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcub3BlblBhcmVucyBPcGVuaW5nIHBhcmVudGhlc2VzIHRvIGVuYWJsZSwgbGlrZSAoLCBbXG4gICAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5jbG9zZVBhcmVucyBDbG9zaW5nIHBhcmVudGhlc2VzIHRvIGVuYWJsZSwgbGlrZSApLCBdXG4gICAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5pbmRleGVkUGxhY2Vob2xkZXJUeXBlcyBQcmVmaXhlcyBmb3IgaW5kZXhlZCBwbGFjZWhvbGRlcnMsIGxpa2UgP1xuICAgICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcubmFtZWRQbGFjZWhvbGRlclR5cGVzIFByZWZpeGVzIGZvciBuYW1lZCBwbGFjZWhvbGRlcnMsIGxpa2UgQCBhbmQgOlxuICAgICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcubGluZUNvbW1lbnRUeXBlcyBMaW5lIGNvbW1lbnRzIHRvIGVuYWJsZSwgbGlrZSAjIGFuZCAtLVxuICAgICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcuc3BlY2lhbFdvcmRDaGFycyBTcGVjaWFsIGNoYXJzIHRoYXQgY2FuIGJlIGZvdW5kIGluc2lkZSBvZiB3b3JkcywgbGlrZSBAIGFuZCAjXG4gICAgICovXG4gICAgZnVuY3Rpb24gVG9rZW5pemVyKGNmZykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVG9rZW5pemVyKTtcblxuICAgICAgICB0aGlzLldISVRFU1BBQ0VfUkVHRVggPSAvXihcXHMrKS87XG4gICAgICAgIHRoaXMuTlVNQkVSX1JFR0VYID0gL14oKC1cXHMqKT9bMC05XSsoXFwuWzAtOV0rKT98MHhbMC05YS1mQS1GXSt8MGJbMDFdKylcXGIvO1xuICAgICAgICB0aGlzLk9QRVJBVE9SX1JFR0VYID0gL14oIT18PD58PT18PD18Pj18ITx8IT58XFx8XFx8fDo6fC0+PnwtPnx+flxcKnx+fnwhfn5cXCp8IX5+fH5cXCp8IX5cXCp8IX58LikvO1xuXG4gICAgICAgIHRoaXMuQkxPQ0tfQ09NTUVOVF9SRUdFWCA9IC9eKFxcL1xcKlteXSo/KD86XFwqXFwvfCQpKS87XG4gICAgICAgIHRoaXMuTElORV9DT01NRU5UX1JFR0VYID0gdGhpcy5jcmVhdGVMaW5lQ29tbWVudFJlZ2V4KGNmZy5saW5lQ29tbWVudFR5cGVzKTtcblxuICAgICAgICB0aGlzLlJFU0VSVkVEX1RPUExFVkVMX1JFR0VYID0gdGhpcy5jcmVhdGVSZXNlcnZlZFdvcmRSZWdleChjZmcucmVzZXJ2ZWRUb3BsZXZlbFdvcmRzKTtcbiAgICAgICAgdGhpcy5SRVNFUlZFRF9ORVdMSU5FX1JFR0VYID0gdGhpcy5jcmVhdGVSZXNlcnZlZFdvcmRSZWdleChjZmcucmVzZXJ2ZWROZXdsaW5lV29yZHMpO1xuICAgICAgICB0aGlzLlJFU0VSVkVEX1BMQUlOX1JFR0VYID0gdGhpcy5jcmVhdGVSZXNlcnZlZFdvcmRSZWdleChjZmcucmVzZXJ2ZWRXb3Jkcyk7XG5cbiAgICAgICAgdGhpcy5XT1JEX1JFR0VYID0gdGhpcy5jcmVhdGVXb3JkUmVnZXgoY2ZnLnNwZWNpYWxXb3JkQ2hhcnMpO1xuICAgICAgICB0aGlzLlNUUklOR19SRUdFWCA9IHRoaXMuY3JlYXRlU3RyaW5nUmVnZXgoY2ZnLnN0cmluZ1R5cGVzKTtcblxuICAgICAgICB0aGlzLk9QRU5fUEFSRU5fUkVHRVggPSB0aGlzLmNyZWF0ZVBhcmVuUmVnZXgoY2ZnLm9wZW5QYXJlbnMpO1xuICAgICAgICB0aGlzLkNMT1NFX1BBUkVOX1JFR0VYID0gdGhpcy5jcmVhdGVQYXJlblJlZ2V4KGNmZy5jbG9zZVBhcmVucyk7XG5cbiAgICAgICAgdGhpcy5JTkRFWEVEX1BMQUNFSE9MREVSX1JFR0VYID0gdGhpcy5jcmVhdGVQbGFjZWhvbGRlclJlZ2V4KGNmZy5pbmRleGVkUGxhY2Vob2xkZXJUeXBlcywgXCJbMC05XSpcIik7XG4gICAgICAgIHRoaXMuSURFTlRfTkFNRURfUExBQ0VIT0xERVJfUkVHRVggPSB0aGlzLmNyZWF0ZVBsYWNlaG9sZGVyUmVnZXgoY2ZnLm5hbWVkUGxhY2Vob2xkZXJUeXBlcywgXCJbYS16QS1aMC05Ll8kXStcIik7XG4gICAgICAgIHRoaXMuU1RSSU5HX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYID0gdGhpcy5jcmVhdGVQbGFjZWhvbGRlclJlZ2V4KGNmZy5uYW1lZFBsYWNlaG9sZGVyVHlwZXMsIHRoaXMuY3JlYXRlU3RyaW5nUGF0dGVybihjZmcuc3RyaW5nVHlwZXMpKTtcbiAgICB9XG5cbiAgICBUb2tlbml6ZXIucHJvdG90eXBlLmNyZWF0ZUxpbmVDb21tZW50UmVnZXggPSBmdW5jdGlvbiBjcmVhdGVMaW5lQ29tbWVudFJlZ2V4KGxpbmVDb21tZW50VHlwZXMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoXCJeKCg/OlwiICsgbGluZUNvbW1lbnRUeXBlcy5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgIHJldHVybiAoMCwgX2VzY2FwZVJlZ0V4cDJbXCJkZWZhdWx0XCJdKShjKTtcbiAgICAgICAgfSkuam9pbihcInxcIikgKyBcIikuKj8oPzpcXG58JCkpXCIpO1xuICAgIH07XG5cbiAgICBUb2tlbml6ZXIucHJvdG90eXBlLmNyZWF0ZVJlc2VydmVkV29yZFJlZ2V4ID0gZnVuY3Rpb24gY3JlYXRlUmVzZXJ2ZWRXb3JkUmVnZXgocmVzZXJ2ZWRXb3Jkcykge1xuICAgICAgICB2YXIgcmVzZXJ2ZWRXb3Jkc1BhdHRlcm4gPSByZXNlcnZlZFdvcmRzLmpvaW4oXCJ8XCIpLnJlcGxhY2UoLyAvZywgXCJcXFxccytcIik7XG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKFwiXihcIiArIHJlc2VydmVkV29yZHNQYXR0ZXJuICsgXCIpXFxcXGJcIiwgXCJpXCIpO1xuICAgIH07XG5cbiAgICBUb2tlbml6ZXIucHJvdG90eXBlLmNyZWF0ZVdvcmRSZWdleCA9IGZ1bmN0aW9uIGNyZWF0ZVdvcmRSZWdleCgpIHtcbiAgICAgICAgdmFyIHNwZWNpYWxDaGFycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogW107XG5cbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoXCJeKFtcXFxcd1wiICsgc3BlY2lhbENoYXJzLmpvaW4oXCJcIikgKyBcIl0rKVwiKTtcbiAgICB9O1xuXG4gICAgVG9rZW5pemVyLnByb3RvdHlwZS5jcmVhdGVTdHJpbmdSZWdleCA9IGZ1bmN0aW9uIGNyZWF0ZVN0cmluZ1JlZ2V4KHN0cmluZ1R5cGVzKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKFwiXihcIiArIHRoaXMuY3JlYXRlU3RyaW5nUGF0dGVybihzdHJpbmdUeXBlcykgKyBcIilcIik7XG4gICAgfTtcblxuICAgIC8vIFRoaXMgZW5hYmxlcyB0aGUgZm9sbG93aW5nIHN0cmluZyBwYXR0ZXJuczpcbiAgICAvLyAxLiBiYWNrdGljayBxdW90ZWQgc3RyaW5nIHVzaW5nIGBgIHRvIGVzY2FwZVxuICAgIC8vIDIuIHNxdWFyZSBicmFja2V0IHF1b3RlZCBzdHJpbmcgKFNRTCBTZXJ2ZXIpIHVzaW5nIF1dIHRvIGVzY2FwZVxuICAgIC8vIDMuIGRvdWJsZSBxdW90ZWQgc3RyaW5nIHVzaW5nIFwiXCIgb3IgXFxcIiB0byBlc2NhcGVcbiAgICAvLyA0LiBzaW5nbGUgcXVvdGVkIHN0cmluZyB1c2luZyAnJyBvciBcXCcgdG8gZXNjYXBlXG4gICAgLy8gNS4gbmF0aW9uYWwgY2hhcmFjdGVyIHF1b3RlZCBzdHJpbmcgdXNpbmcgTicnIG9yIE5cXCcgdG8gZXNjYXBlXG5cblxuICAgIFRva2VuaXplci5wcm90b3R5cGUuY3JlYXRlU3RyaW5nUGF0dGVybiA9IGZ1bmN0aW9uIGNyZWF0ZVN0cmluZ1BhdHRlcm4oc3RyaW5nVHlwZXMpIHtcbiAgICAgICAgdmFyIHBhdHRlcm5zID0ge1xuICAgICAgICAgICAgXCJgYFwiOiBcIigoYFteYF0qKCR8YCkpKylcIixcbiAgICAgICAgICAgIFwiW11cIjogXCIoKFxcXFxbW15cXFxcXV0qKCR8XFxcXF0pKShcXFxcXVteXFxcXF1dKigkfFxcXFxdKSkqKVwiLFxuICAgICAgICAgICAgXCJcXFwiXFxcIlwiOiBcIigoXFxcIlteXFxcIlxcXFxcXFxcXSooPzpcXFxcXFxcXC5bXlxcXCJcXFxcXFxcXF0qKSooXFxcInwkKSkrKVwiLFxuICAgICAgICAgICAgXCInJ1wiOiBcIigoJ1teJ1xcXFxcXFxcXSooPzpcXFxcXFxcXC5bXidcXFxcXFxcXF0qKSooJ3wkKSkrKVwiLFxuICAgICAgICAgICAgXCJOJydcIjogXCIoKE4nW15OJ1xcXFxcXFxcXSooPzpcXFxcXFxcXC5bXk4nXFxcXFxcXFxdKikqKCd8JCkpKylcIlxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBzdHJpbmdUeXBlcy5tYXAoZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXR0ZXJuc1t0XTtcbiAgICAgICAgfSkuam9pbihcInxcIik7XG4gICAgfTtcblxuICAgIFRva2VuaXplci5wcm90b3R5cGUuY3JlYXRlUGFyZW5SZWdleCA9IGZ1bmN0aW9uIGNyZWF0ZVBhcmVuUmVnZXgocGFyZW5zKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoXCJeKFwiICsgcGFyZW5zLm1hcChmdW5jdGlvbiAocCkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLmVzY2FwZVBhcmVuKHApO1xuICAgICAgICB9KS5qb2luKFwifFwiKSArIFwiKVwiLCBcImlcIik7XG4gICAgfTtcblxuICAgIFRva2VuaXplci5wcm90b3R5cGUuZXNjYXBlUGFyZW4gPSBmdW5jdGlvbiBlc2NhcGVQYXJlbihwYXJlbikge1xuICAgICAgICBpZiAocGFyZW4ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAvLyBBIHNpbmdsZSBwdW5jdHVhdGlvbiBjaGFyYWN0ZXJcbiAgICAgICAgICAgIHJldHVybiAoMCwgX2VzY2FwZVJlZ0V4cDJbXCJkZWZhdWx0XCJdKShwYXJlbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBsb25nZXIgd29yZFxuICAgICAgICAgICAgcmV0dXJuIFwiXFxcXGJcIiArIHBhcmVuICsgXCJcXFxcYlwiO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIFRva2VuaXplci5wcm90b3R5cGUuY3JlYXRlUGxhY2Vob2xkZXJSZWdleCA9IGZ1bmN0aW9uIGNyZWF0ZVBsYWNlaG9sZGVyUmVnZXgodHlwZXMsIHBhdHRlcm4pIHtcbiAgICAgICAgaWYgKCgwLCBfaXNFbXB0eTJbXCJkZWZhdWx0XCJdKSh0eXBlcykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdHlwZXNSZWdleCA9IHR5cGVzLm1hcChfZXNjYXBlUmVnRXhwMltcImRlZmF1bHRcIl0pLmpvaW4oXCJ8XCIpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKFwiXigoPzpcIiArIHR5cGVzUmVnZXggKyBcIikoPzpcIiArIHBhdHRlcm4gKyBcIikpXCIpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBUYWtlcyBhIFNRTCBzdHJpbmcgYW5kIGJyZWFrcyBpdCBpbnRvIHRva2Vucy5cbiAgICAgKiBFYWNoIHRva2VuIGlzIGFuIG9iamVjdCB3aXRoIHR5cGUgYW5kIHZhbHVlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBTUUwgc3RyaW5nXG4gICAgICogQHJldHVybiB7T2JqZWN0W119IHRva2VucyBBbiBhcnJheSBvZiB0b2tlbnMuXG4gICAgICogIEByZXR1cm4ge1N0cmluZ30gdG9rZW4udHlwZVxuICAgICAqICBAcmV0dXJuIHtTdHJpbmd9IHRva2VuLnZhbHVlXG4gICAgICovXG5cblxuICAgIFRva2VuaXplci5wcm90b3R5cGUudG9rZW5pemUgPSBmdW5jdGlvbiB0b2tlbml6ZShpbnB1dCkge1xuICAgICAgICB2YXIgdG9rZW5zID0gW107XG4gICAgICAgIHZhciB0b2tlbiA9IHZvaWQgMDtcblxuICAgICAgICAvLyBLZWVwIHByb2Nlc3NpbmcgdGhlIHN0cmluZyB1bnRpbCBpdCBpcyBlbXB0eVxuICAgICAgICB3aGlsZSAoaW5wdXQubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBHZXQgdGhlIG5leHQgdG9rZW4gYW5kIHRoZSB0b2tlbiB0eXBlXG4gICAgICAgICAgICB0b2tlbiA9IHRoaXMuZ2V0TmV4dFRva2VuKGlucHV0LCB0b2tlbik7XG4gICAgICAgICAgICAvLyBBZHZhbmNlIHRoZSBzdHJpbmdcbiAgICAgICAgICAgIGlucHV0ID0gaW5wdXQuc3Vic3RyaW5nKHRva2VuLnZhbHVlLmxlbmd0aCk7XG5cbiAgICAgICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9rZW5zO1xuICAgIH07XG5cbiAgICBUb2tlbml6ZXIucHJvdG90eXBlLmdldE5leHRUb2tlbiA9IGZ1bmN0aW9uIGdldE5leHRUb2tlbihpbnB1dCwgcHJldmlvdXNUb2tlbikge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRXaGl0ZXNwYWNlVG9rZW4oaW5wdXQpIHx8IHRoaXMuZ2V0Q29tbWVudFRva2VuKGlucHV0KSB8fCB0aGlzLmdldFN0cmluZ1Rva2VuKGlucHV0KSB8fCB0aGlzLmdldE9wZW5QYXJlblRva2VuKGlucHV0KSB8fCB0aGlzLmdldENsb3NlUGFyZW5Ub2tlbihpbnB1dCkgfHwgdGhpcy5nZXRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB8fCB0aGlzLmdldE51bWJlclRva2VuKGlucHV0KSB8fCB0aGlzLmdldFJlc2VydmVkV29yZFRva2VuKGlucHV0LCBwcmV2aW91c1Rva2VuKSB8fCB0aGlzLmdldFdvcmRUb2tlbihpbnB1dCkgfHwgdGhpcy5nZXRPcGVyYXRvclRva2VuKGlucHV0KTtcbiAgICB9O1xuXG4gICAgVG9rZW5pemVyLnByb3RvdHlwZS5nZXRXaGl0ZXNwYWNlVG9rZW4gPSBmdW5jdGlvbiBnZXRXaGl0ZXNwYWNlVG9rZW4oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgICAgICAgaW5wdXQ6IGlucHV0LFxuICAgICAgICAgICAgdHlwZTogX3Rva2VuVHlwZXMyW1wiZGVmYXVsdFwiXS5XSElURVNQQUNFLFxuICAgICAgICAgICAgcmVnZXg6IHRoaXMuV0hJVEVTUEFDRV9SRUdFWFxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgVG9rZW5pemVyLnByb3RvdHlwZS5nZXRDb21tZW50VG9rZW4gPSBmdW5jdGlvbiBnZXRDb21tZW50VG9rZW4oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TGluZUNvbW1lbnRUb2tlbihpbnB1dCkgfHwgdGhpcy5nZXRCbG9ja0NvbW1lbnRUb2tlbihpbnB1dCk7XG4gICAgfTtcblxuICAgIFRva2VuaXplci5wcm90b3R5cGUuZ2V0TGluZUNvbW1lbnRUb2tlbiA9IGZ1bmN0aW9uIGdldExpbmVDb21tZW50VG9rZW4oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgICAgICAgaW5wdXQ6IGlucHV0LFxuICAgICAgICAgICAgdHlwZTogX3Rva2VuVHlwZXMyW1wiZGVmYXVsdFwiXS5MSU5FX0NPTU1FTlQsXG4gICAgICAgICAgICByZWdleDogdGhpcy5MSU5FX0NPTU1FTlRfUkVHRVhcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIFRva2VuaXplci5wcm90b3R5cGUuZ2V0QmxvY2tDb21tZW50VG9rZW4gPSBmdW5jdGlvbiBnZXRCbG9ja0NvbW1lbnRUb2tlbihpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICAgICAgICBpbnB1dDogaW5wdXQsXG4gICAgICAgICAgICB0eXBlOiBfdG9rZW5UeXBlczJbXCJkZWZhdWx0XCJdLkJMT0NLX0NPTU1FTlQsXG4gICAgICAgICAgICByZWdleDogdGhpcy5CTE9DS19DT01NRU5UX1JFR0VYXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBUb2tlbml6ZXIucHJvdG90eXBlLmdldFN0cmluZ1Rva2VuID0gZnVuY3Rpb24gZ2V0U3RyaW5nVG9rZW4oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgICAgICAgaW5wdXQ6IGlucHV0LFxuICAgICAgICAgICAgdHlwZTogX3Rva2VuVHlwZXMyW1wiZGVmYXVsdFwiXS5TVFJJTkcsXG4gICAgICAgICAgICByZWdleDogdGhpcy5TVFJJTkdfUkVHRVhcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIFRva2VuaXplci5wcm90b3R5cGUuZ2V0T3BlblBhcmVuVG9rZW4gPSBmdW5jdGlvbiBnZXRPcGVuUGFyZW5Ub2tlbihpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICAgICAgICBpbnB1dDogaW5wdXQsXG4gICAgICAgICAgICB0eXBlOiBfdG9rZW5UeXBlczJbXCJkZWZhdWx0XCJdLk9QRU5fUEFSRU4sXG4gICAgICAgICAgICByZWdleDogdGhpcy5PUEVOX1BBUkVOX1JFR0VYXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBUb2tlbml6ZXIucHJvdG90eXBlLmdldENsb3NlUGFyZW5Ub2tlbiA9IGZ1bmN0aW9uIGdldENsb3NlUGFyZW5Ub2tlbihpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICAgICAgICBpbnB1dDogaW5wdXQsXG4gICAgICAgICAgICB0eXBlOiBfdG9rZW5UeXBlczJbXCJkZWZhdWx0XCJdLkNMT1NFX1BBUkVOLFxuICAgICAgICAgICAgcmVnZXg6IHRoaXMuQ0xPU0VfUEFSRU5fUkVHRVhcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIFRva2VuaXplci5wcm90b3R5cGUuZ2V0UGxhY2Vob2xkZXJUb2tlbiA9IGZ1bmN0aW9uIGdldFBsYWNlaG9sZGVyVG9rZW4oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SWRlbnROYW1lZFBsYWNlaG9sZGVyVG9rZW4oaW5wdXQpIHx8IHRoaXMuZ2V0U3RyaW5nTmFtZWRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB8fCB0aGlzLmdldEluZGV4ZWRQbGFjZWhvbGRlclRva2VuKGlucHV0KTtcbiAgICB9O1xuXG4gICAgVG9rZW5pemVyLnByb3RvdHlwZS5nZXRJZGVudE5hbWVkUGxhY2Vob2xkZXJUb2tlbiA9IGZ1bmN0aW9uIGdldElkZW50TmFtZWRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBsYWNlaG9sZGVyVG9rZW5XaXRoS2V5KHtcbiAgICAgICAgICAgIGlucHV0OiBpbnB1dCxcbiAgICAgICAgICAgIHJlZ2V4OiB0aGlzLklERU5UX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYLFxuICAgICAgICAgICAgcGFyc2VLZXk6IGZ1bmN0aW9uIHBhcnNlS2V5KHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdi5zbGljZSgxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIFRva2VuaXplci5wcm90b3R5cGUuZ2V0U3RyaW5nTmFtZWRQbGFjZWhvbGRlclRva2VuID0gZnVuY3Rpb24gZ2V0U3RyaW5nTmFtZWRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB7XG4gICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmdldFBsYWNlaG9sZGVyVG9rZW5XaXRoS2V5KHtcbiAgICAgICAgICAgIGlucHV0OiBpbnB1dCxcbiAgICAgICAgICAgIHJlZ2V4OiB0aGlzLlNUUklOR19OQU1FRF9QTEFDRUhPTERFUl9SRUdFWCxcbiAgICAgICAgICAgIHBhcnNlS2V5OiBmdW5jdGlvbiBwYXJzZUtleSh2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzMi5nZXRFc2NhcGVkUGxhY2Vob2xkZXJLZXkoeyBrZXk6IHYuc2xpY2UoMiwgLTEpLCBxdW90ZUNoYXI6IHYuc2xpY2UoLTEpIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgVG9rZW5pemVyLnByb3RvdHlwZS5nZXRJbmRleGVkUGxhY2Vob2xkZXJUb2tlbiA9IGZ1bmN0aW9uIGdldEluZGV4ZWRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBsYWNlaG9sZGVyVG9rZW5XaXRoS2V5KHtcbiAgICAgICAgICAgIGlucHV0OiBpbnB1dCxcbiAgICAgICAgICAgIHJlZ2V4OiB0aGlzLklOREVYRURfUExBQ0VIT0xERVJfUkVHRVgsXG4gICAgICAgICAgICBwYXJzZUtleTogZnVuY3Rpb24gcGFyc2VLZXkodikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2LnNsaWNlKDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgVG9rZW5pemVyLnByb3RvdHlwZS5nZXRQbGFjZWhvbGRlclRva2VuV2l0aEtleSA9IGZ1bmN0aW9uIGdldFBsYWNlaG9sZGVyVG9rZW5XaXRoS2V5KF9yZWYpIHtcbiAgICAgICAgdmFyIGlucHV0ID0gX3JlZi5pbnB1dCxcbiAgICAgICAgICAgIHJlZ2V4ID0gX3JlZi5yZWdleCxcbiAgICAgICAgICAgIHBhcnNlS2V5ID0gX3JlZi5wYXJzZUtleTtcblxuICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHsgaW5wdXQ6IGlucHV0LCByZWdleDogcmVnZXgsIHR5cGU6IF90b2tlblR5cGVzMltcImRlZmF1bHRcIl0uUExBQ0VIT0xERVIgfSk7XG4gICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgICAgdG9rZW4ua2V5ID0gcGFyc2VLZXkodG9rZW4udmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9O1xuXG4gICAgVG9rZW5pemVyLnByb3RvdHlwZS5nZXRFc2NhcGVkUGxhY2Vob2xkZXJLZXkgPSBmdW5jdGlvbiBnZXRFc2NhcGVkUGxhY2Vob2xkZXJLZXkoX3JlZjIpIHtcbiAgICAgICAgdmFyIGtleSA9IF9yZWYyLmtleSxcbiAgICAgICAgICAgIHF1b3RlQ2hhciA9IF9yZWYyLnF1b3RlQ2hhcjtcblxuICAgICAgICByZXR1cm4ga2V5LnJlcGxhY2UobmV3IFJlZ0V4cCgoMCwgX2VzY2FwZVJlZ0V4cDJbXCJkZWZhdWx0XCJdKShcIlxcXFxcIikgKyBxdW90ZUNoYXIsIFwiZ1wiKSwgcXVvdGVDaGFyKTtcbiAgICB9O1xuXG4gICAgLy8gRGVjaW1hbCwgYmluYXJ5LCBvciBoZXggbnVtYmVyc1xuXG5cbiAgICBUb2tlbml6ZXIucHJvdG90eXBlLmdldE51bWJlclRva2VuID0gZnVuY3Rpb24gZ2V0TnVtYmVyVG9rZW4oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgICAgICAgaW5wdXQ6IGlucHV0LFxuICAgICAgICAgICAgdHlwZTogX3Rva2VuVHlwZXMyW1wiZGVmYXVsdFwiXS5OVU1CRVIsXG4gICAgICAgICAgICByZWdleDogdGhpcy5OVU1CRVJfUkVHRVhcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIFB1bmN0dWF0aW9uIGFuZCBzeW1ib2xzXG5cblxuICAgIFRva2VuaXplci5wcm90b3R5cGUuZ2V0T3BlcmF0b3JUb2tlbiA9IGZ1bmN0aW9uIGdldE9wZXJhdG9yVG9rZW4oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgICAgICAgaW5wdXQ6IGlucHV0LFxuICAgICAgICAgICAgdHlwZTogX3Rva2VuVHlwZXMyW1wiZGVmYXVsdFwiXS5PUEVSQVRPUixcbiAgICAgICAgICAgIHJlZ2V4OiB0aGlzLk9QRVJBVE9SX1JFR0VYXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBUb2tlbml6ZXIucHJvdG90eXBlLmdldFJlc2VydmVkV29yZFRva2VuID0gZnVuY3Rpb24gZ2V0UmVzZXJ2ZWRXb3JkVG9rZW4oaW5wdXQsIHByZXZpb3VzVG9rZW4pIHtcbiAgICAgICAgLy8gQSByZXNlcnZlZCB3b3JkIGNhbm5vdCBiZSBwcmVjZWRlZCBieSBhIFwiLlwiXG4gICAgICAgIC8vIHRoaXMgbWFrZXMgaXQgc28gaW4gXCJteXRhYmxlLmZyb21cIiwgXCJmcm9tXCIgaXMgbm90IGNvbnNpZGVyZWQgYSByZXNlcnZlZCB3b3JkXG4gICAgICAgIGlmIChwcmV2aW91c1Rva2VuICYmIHByZXZpb3VzVG9rZW4udmFsdWUgJiYgcHJldmlvdXNUb2tlbi52YWx1ZSA9PT0gXCIuXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5nZXRUb3BsZXZlbFJlc2VydmVkVG9rZW4oaW5wdXQpIHx8IHRoaXMuZ2V0TmV3bGluZVJlc2VydmVkVG9rZW4oaW5wdXQpIHx8IHRoaXMuZ2V0UGxhaW5SZXNlcnZlZFRva2VuKGlucHV0KTtcbiAgICB9O1xuXG4gICAgVG9rZW5pemVyLnByb3RvdHlwZS5nZXRUb3BsZXZlbFJlc2VydmVkVG9rZW4gPSBmdW5jdGlvbiBnZXRUb3BsZXZlbFJlc2VydmVkVG9rZW4oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgICAgICAgaW5wdXQ6IGlucHV0LFxuICAgICAgICAgICAgdHlwZTogX3Rva2VuVHlwZXMyW1wiZGVmYXVsdFwiXS5SRVNFUlZFRF9UT1BMRVZFTCxcbiAgICAgICAgICAgIHJlZ2V4OiB0aGlzLlJFU0VSVkVEX1RPUExFVkVMX1JFR0VYXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBUb2tlbml6ZXIucHJvdG90eXBlLmdldE5ld2xpbmVSZXNlcnZlZFRva2VuID0gZnVuY3Rpb24gZ2V0TmV3bGluZVJlc2VydmVkVG9rZW4oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgICAgICAgaW5wdXQ6IGlucHV0LFxuICAgICAgICAgICAgdHlwZTogX3Rva2VuVHlwZXMyW1wiZGVmYXVsdFwiXS5SRVNFUlZFRF9ORVdMSU5FLFxuICAgICAgICAgICAgcmVnZXg6IHRoaXMuUkVTRVJWRURfTkVXTElORV9SRUdFWFxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgVG9rZW5pemVyLnByb3RvdHlwZS5nZXRQbGFpblJlc2VydmVkVG9rZW4gPSBmdW5jdGlvbiBnZXRQbGFpblJlc2VydmVkVG9rZW4oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgICAgICAgaW5wdXQ6IGlucHV0LFxuICAgICAgICAgICAgdHlwZTogX3Rva2VuVHlwZXMyW1wiZGVmYXVsdFwiXS5SRVNFUlZFRCxcbiAgICAgICAgICAgIHJlZ2V4OiB0aGlzLlJFU0VSVkVEX1BMQUlOX1JFR0VYXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBUb2tlbml6ZXIucHJvdG90eXBlLmdldFdvcmRUb2tlbiA9IGZ1bmN0aW9uIGdldFdvcmRUb2tlbihpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICAgICAgICBpbnB1dDogaW5wdXQsXG4gICAgICAgICAgICB0eXBlOiBfdG9rZW5UeXBlczJbXCJkZWZhdWx0XCJdLldPUkQsXG4gICAgICAgICAgICByZWdleDogdGhpcy5XT1JEX1JFR0VYXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBUb2tlbml6ZXIucHJvdG90eXBlLmdldFRva2VuT25GaXJzdE1hdGNoID0gZnVuY3Rpb24gZ2V0VG9rZW5PbkZpcnN0TWF0Y2goX3JlZjMpIHtcbiAgICAgICAgdmFyIGlucHV0ID0gX3JlZjMuaW5wdXQsXG4gICAgICAgICAgICB0eXBlID0gX3JlZjMudHlwZSxcbiAgICAgICAgICAgIHJlZ2V4ID0gX3JlZjMucmVnZXg7XG5cbiAgICAgICAgdmFyIG1hdGNoZXMgPSBpbnB1dC5tYXRjaChyZWdleCk7XG5cbiAgICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHR5cGU6IHR5cGUsIHZhbHVlOiBtYXRjaGVzWzFdIH07XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIFRva2VuaXplcjtcbn0oKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBUb2tlbml6ZXI7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsICJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9Gb3JtYXR0ZXIgPSByZXF1aXJlKFwiLi4vY29yZS9Gb3JtYXR0ZXJcIik7XG5cbnZhciBfRm9ybWF0dGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Zvcm1hdHRlcik7XG5cbnZhciBfVG9rZW5pemVyID0gcmVxdWlyZShcIi4uL2NvcmUvVG9rZW5pemVyXCIpO1xuXG52YXIgX1Rva2VuaXplcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Ub2tlbml6ZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIHJlc2VydmVkV29yZHMgPSBbXCJBQlNcIiwgXCJBQ1RJVkFURVwiLCBcIkFMSUFTXCIsIFwiQUxMXCIsIFwiQUxMT0NBVEVcIiwgXCJBTExPV1wiLCBcIkFMVEVSXCIsIFwiQU5ZXCIsIFwiQVJFXCIsIFwiQVJSQVlcIiwgXCJBU1wiLCBcIkFTQ1wiLCBcIkFTRU5TSVRJVkVcIiwgXCJBU1NPQ0lBVEVcIiwgXCJBU1VUSU1FXCIsIFwiQVNZTU1FVFJJQ1wiLCBcIkFUXCIsIFwiQVRPTUlDXCIsIFwiQVRUUklCVVRFU1wiLCBcIkFVRElUXCIsIFwiQVVUSE9SSVpBVElPTlwiLCBcIkFVWFwiLCBcIkFVWElMSUFSWVwiLCBcIkFWR1wiLCBcIkJFRk9SRVwiLCBcIkJFR0lOXCIsIFwiQkVUV0VFTlwiLCBcIkJJR0lOVFwiLCBcIkJJTkFSWVwiLCBcIkJMT0JcIiwgXCJCT09MRUFOXCIsIFwiQk9USFwiLCBcIkJVRkZFUlBPT0xcIiwgXCJCWVwiLCBcIkNBQ0hFXCIsIFwiQ0FMTFwiLCBcIkNBTExFRFwiLCBcIkNBUFRVUkVcIiwgXCJDQVJESU5BTElUWVwiLCBcIkNBU0NBREVEXCIsIFwiQ0FTRVwiLCBcIkNBU1RcIiwgXCJDQ1NJRFwiLCBcIkNFSUxcIiwgXCJDRUlMSU5HXCIsIFwiQ0hBUlwiLCBcIkNIQVJBQ1RFUlwiLCBcIkNIQVJBQ1RFUl9MRU5HVEhcIiwgXCJDSEFSX0xFTkdUSFwiLCBcIkNIRUNLXCIsIFwiQ0xPQlwiLCBcIkNMT05FXCIsIFwiQ0xPU0VcIiwgXCJDTFVTVEVSXCIsIFwiQ09BTEVTQ0VcIiwgXCJDT0xMQVRFXCIsIFwiQ09MTEVDVFwiLCBcIkNPTExFQ1RJT05cIiwgXCJDT0xMSURcIiwgXCJDT0xVTU5cIiwgXCJDT01NRU5UXCIsIFwiQ09NTUlUXCIsIFwiQ09OQ0FUXCIsIFwiQ09ORElUSU9OXCIsIFwiQ09OTkVDVFwiLCBcIkNPTk5FQ1RJT05cIiwgXCJDT05TVFJBSU5UXCIsIFwiQ09OVEFJTlNcIiwgXCJDT05USU5VRVwiLCBcIkNPTlZFUlRcIiwgXCJDT1JSXCIsIFwiQ09SUkVTUE9ORElOR1wiLCBcIkNPVU5UXCIsIFwiQ09VTlRfQklHXCIsIFwiQ09WQVJfUE9QXCIsIFwiQ09WQVJfU0FNUFwiLCBcIkNSRUFURVwiLCBcIkNST1NTXCIsIFwiQ1VCRVwiLCBcIkNVTUVfRElTVFwiLCBcIkNVUlJFTlRcIiwgXCJDVVJSRU5UX0RBVEVcIiwgXCJDVVJSRU5UX0RFRkFVTFRfVFJBTlNGT1JNX0dST1VQXCIsIFwiQ1VSUkVOVF9MQ19DVFlQRVwiLCBcIkNVUlJFTlRfUEFUSFwiLCBcIkNVUlJFTlRfUk9MRVwiLCBcIkNVUlJFTlRfU0NIRU1BXCIsIFwiQ1VSUkVOVF9TRVJWRVJcIiwgXCJDVVJSRU5UX1RJTUVcIiwgXCJDVVJSRU5UX1RJTUVTVEFNUFwiLCBcIkNVUlJFTlRfVElNRVpPTkVcIiwgXCJDVVJSRU5UX1RSQU5TRk9STV9HUk9VUF9GT1JfVFlQRVwiLCBcIkNVUlJFTlRfVVNFUlwiLCBcIkNVUlNPUlwiLCBcIkNZQ0xFXCIsIFwiREFUQVwiLCBcIkRBVEFCQVNFXCIsIFwiREFUQVBBUlRJVElPTk5BTUVcIiwgXCJEQVRBUEFSVElUSU9OTlVNXCIsIFwiREFURVwiLCBcIkRBWVwiLCBcIkRBWVNcIiwgXCJEQjJHRU5FUkFMXCIsIFwiREIyR0VOUkxcIiwgXCJEQjJTUUxcIiwgXCJEQklORk9cIiwgXCJEQlBBUlRJVElPTk5BTUVcIiwgXCJEQlBBUlRJVElPTk5VTVwiLCBcIkRFQUxMT0NBVEVcIiwgXCJERUNcIiwgXCJERUNJTUFMXCIsIFwiREVDTEFSRVwiLCBcIkRFRkFVTFRcIiwgXCJERUZBVUxUU1wiLCBcIkRFRklOSVRJT05cIiwgXCJERUxFVEVcIiwgXCJERU5TRVJBTktcIiwgXCJERU5TRV9SQU5LXCIsIFwiREVSRUZcIiwgXCJERVNDUklCRVwiLCBcIkRFU0NSSVBUT1JcIiwgXCJERVRFUk1JTklTVElDXCIsIFwiRElBR05PU1RJQ1NcIiwgXCJESVNBQkxFXCIsIFwiRElTQUxMT1dcIiwgXCJESVNDT05ORUNUXCIsIFwiRElTVElOQ1RcIiwgXCJET1wiLCBcIkRPQ1VNRU5UXCIsIFwiRE9VQkxFXCIsIFwiRFJPUFwiLCBcIkRTU0laRVwiLCBcIkRZTkFNSUNcIiwgXCJFQUNIXCIsIFwiRURJVFBST0NcIiwgXCJFTEVNRU5UXCIsIFwiRUxTRVwiLCBcIkVMU0VJRlwiLCBcIkVOQUJMRVwiLCBcIkVOQ09ESU5HXCIsIFwiRU5DUllQVElPTlwiLCBcIkVORFwiLCBcIkVORC1FWEVDXCIsIFwiRU5ESU5HXCIsIFwiRVJBU0VcIiwgXCJFU0NBUEVcIiwgXCJFVkVSWVwiLCBcIkVYQ0VQVElPTlwiLCBcIkVYQ0xVRElOR1wiLCBcIkVYQ0xVU0lWRVwiLCBcIkVYRUNcIiwgXCJFWEVDVVRFXCIsIFwiRVhJU1RTXCIsIFwiRVhJVFwiLCBcIkVYUFwiLCBcIkVYUExBSU5cIiwgXCJFWFRFTkRFRFwiLCBcIkVYVEVSTkFMXCIsIFwiRVhUUkFDVFwiLCBcIkZBTFNFXCIsIFwiRkVOQ0VEXCIsIFwiRkVUQ0hcIiwgXCJGSUVMRFBST0NcIiwgXCJGSUxFXCIsIFwiRklMVEVSXCIsIFwiRklOQUxcIiwgXCJGSVJTVFwiLCBcIkZMT0FUXCIsIFwiRkxPT1JcIiwgXCJGT1JcIiwgXCJGT1JFSUdOXCIsIFwiRlJFRVwiLCBcIkZVTExcIiwgXCJGVU5DVElPTlwiLCBcIkZVU0lPTlwiLCBcIkdFTkVSQUxcIiwgXCJHRU5FUkFURURcIiwgXCJHRVRcIiwgXCJHTE9CQUxcIiwgXCJHT1RPXCIsIFwiR1JBTlRcIiwgXCJHUkFQSElDXCIsIFwiR1JPVVBcIiwgXCJHUk9VUElOR1wiLCBcIkhBTkRMRVJcIiwgXCJIQVNIXCIsIFwiSEFTSEVEX1ZBTFVFXCIsIFwiSElOVFwiLCBcIkhPTERcIiwgXCJIT1VSXCIsIFwiSE9VUlNcIiwgXCJJREVOVElUWVwiLCBcIklGXCIsIFwiSU1NRURJQVRFXCIsIFwiSU5cIiwgXCJJTkNMVURJTkdcIiwgXCJJTkNMVVNJVkVcIiwgXCJJTkNSRU1FTlRcIiwgXCJJTkRFWFwiLCBcIklORElDQVRPUlwiLCBcIklORElDQVRPUlNcIiwgXCJJTkZcIiwgXCJJTkZJTklUWVwiLCBcIklOSEVSSVRcIiwgXCJJTk5FUlwiLCBcIklOT1VUXCIsIFwiSU5TRU5TSVRJVkVcIiwgXCJJTlNFUlRcIiwgXCJJTlRcIiwgXCJJTlRFR0VSXCIsIFwiSU5URUdSSVRZXCIsIFwiSU5URVJTRUNUSU9OXCIsIFwiSU5URVJWQUxcIiwgXCJJTlRPXCIsIFwiSVNcIiwgXCJJU09CSURcIiwgXCJJU09MQVRJT05cIiwgXCJJVEVSQVRFXCIsIFwiSkFSXCIsIFwiSkFWQVwiLCBcIktFRVBcIiwgXCJLRVlcIiwgXCJMQUJFTFwiLCBcIkxBTkdVQUdFXCIsIFwiTEFSR0VcIiwgXCJMQVRFUkFMXCIsIFwiTENfQ1RZUEVcIiwgXCJMRUFESU5HXCIsIFwiTEVBVkVcIiwgXCJMRUZUXCIsIFwiTElLRVwiLCBcIkxJTktUWVBFXCIsIFwiTE5cIiwgXCJMT0NBTFwiLCBcIkxPQ0FMREFURVwiLCBcIkxPQ0FMRVwiLCBcIkxPQ0FMVElNRVwiLCBcIkxPQ0FMVElNRVNUQU1QXCIsIFwiTE9DQVRPUlwiLCBcIkxPQ0FUT1JTXCIsIFwiTE9DS1wiLCBcIkxPQ0tNQVhcIiwgXCJMT0NLU0laRVwiLCBcIkxPTkdcIiwgXCJMT09QXCIsIFwiTE9XRVJcIiwgXCJNQUlOVEFJTkVEXCIsIFwiTUFUQ0hcIiwgXCJNQVRFUklBTElaRURcIiwgXCJNQVhcIiwgXCJNQVhWQUxVRVwiLCBcIk1FTUJFUlwiLCBcIk1FUkdFXCIsIFwiTUVUSE9EXCIsIFwiTUlDUk9TRUNPTkRcIiwgXCJNSUNST1NFQ09ORFNcIiwgXCJNSU5cIiwgXCJNSU5VVEVcIiwgXCJNSU5VVEVTXCIsIFwiTUlOVkFMVUVcIiwgXCJNT0RcIiwgXCJNT0RFXCIsIFwiTU9ESUZJRVNcIiwgXCJNT0RVTEVcIiwgXCJNT05USFwiLCBcIk1PTlRIU1wiLCBcIk1VTFRJU0VUXCIsIFwiTkFOXCIsIFwiTkFUSU9OQUxcIiwgXCJOQVRVUkFMXCIsIFwiTkNIQVJcIiwgXCJOQ0xPQlwiLCBcIk5FV1wiLCBcIk5FV19UQUJMRVwiLCBcIk5FWFRWQUxcIiwgXCJOT1wiLCBcIk5PQ0FDSEVcIiwgXCJOT0NZQ0xFXCIsIFwiTk9ERU5BTUVcIiwgXCJOT0RFTlVNQkVSXCIsIFwiTk9NQVhWQUxVRVwiLCBcIk5PTUlOVkFMVUVcIiwgXCJOT05FXCIsIFwiTk9PUkRFUlwiLCBcIk5PUk1BTElaRVwiLCBcIk5PUk1BTElaRURcIiwgXCJOT1RcIiwgXCJOVUxMXCIsIFwiTlVMTElGXCIsIFwiTlVMTFNcIiwgXCJOVU1FUklDXCIsIFwiTlVNUEFSVFNcIiwgXCJPQklEXCIsIFwiT0NURVRfTEVOR1RIXCIsIFwiT0ZcIiwgXCJPRkZTRVRcIiwgXCJPTERcIiwgXCJPTERfVEFCTEVcIiwgXCJPTlwiLCBcIk9OTFlcIiwgXCJPUEVOXCIsIFwiT1BUSU1JWkFUSU9OXCIsIFwiT1BUSU1JWkVcIiwgXCJPUFRJT05cIiwgXCJPUkRFUlwiLCBcIk9VVFwiLCBcIk9VVEVSXCIsIFwiT1ZFUlwiLCBcIk9WRVJMQVBTXCIsIFwiT1ZFUkxBWVwiLCBcIk9WRVJSSURJTkdcIiwgXCJQQUNLQUdFXCIsIFwiUEFEREVEXCIsIFwiUEFHRVNJWkVcIiwgXCJQQVJBTUVURVJcIiwgXCJQQVJUXCIsIFwiUEFSVElUSU9OXCIsIFwiUEFSVElUSU9ORURcIiwgXCJQQVJUSVRJT05JTkdcIiwgXCJQQVJUSVRJT05TXCIsIFwiUEFTU1dPUkRcIiwgXCJQQVRIXCIsIFwiUEVSQ0VOVElMRV9DT05UXCIsIFwiUEVSQ0VOVElMRV9ESVNDXCIsIFwiUEVSQ0VOVF9SQU5LXCIsIFwiUElFQ0VTSVpFXCIsIFwiUExBTlwiLCBcIlBPU0lUSU9OXCIsIFwiUE9XRVJcIiwgXCJQUkVDSVNJT05cIiwgXCJQUkVQQVJFXCIsIFwiUFJFVlZBTFwiLCBcIlBSSU1BUllcIiwgXCJQUklRVFlcIiwgXCJQUklWSUxFR0VTXCIsIFwiUFJPQ0VEVVJFXCIsIFwiUFJPR1JBTVwiLCBcIlBTSURcIiwgXCJQVUJMSUNcIiwgXCJRVUVSWVwiLCBcIlFVRVJZTk9cIiwgXCJSQU5HRVwiLCBcIlJBTktcIiwgXCJSRUFEXCIsIFwiUkVBRFNcIiwgXCJSRUFMXCIsIFwiUkVDT1ZFUllcIiwgXCJSRUNVUlNJVkVcIiwgXCJSRUZcIiwgXCJSRUZFUkVOQ0VTXCIsIFwiUkVGRVJFTkNJTkdcIiwgXCJSRUZSRVNIXCIsIFwiUkVHUl9BVkdYXCIsIFwiUkVHUl9BVkdZXCIsIFwiUkVHUl9DT1VOVFwiLCBcIlJFR1JfSU5URVJDRVBUXCIsIFwiUkVHUl9SMlwiLCBcIlJFR1JfU0xPUEVcIiwgXCJSRUdSX1NYWFwiLCBcIlJFR1JfU1hZXCIsIFwiUkVHUl9TWVlcIiwgXCJSRUxFQVNFXCIsIFwiUkVOQU1FXCIsIFwiUkVQRUFUXCIsIFwiUkVTRVRcIiwgXCJSRVNJR05BTFwiLCBcIlJFU1RBUlRcIiwgXCJSRVNUUklDVFwiLCBcIlJFU1VMVFwiLCBcIlJFU1VMVF9TRVRfTE9DQVRPUlwiLCBcIlJFVFVSTlwiLCBcIlJFVFVSTlNcIiwgXCJSRVZPS0VcIiwgXCJSSUdIVFwiLCBcIlJPTEVcIiwgXCJST0xMQkFDS1wiLCBcIlJPTExVUFwiLCBcIlJPVU5EX0NFSUxJTkdcIiwgXCJST1VORF9ET1dOXCIsIFwiUk9VTkRfRkxPT1JcIiwgXCJST1VORF9IQUxGX0RPV05cIiwgXCJST1VORF9IQUxGX0VWRU5cIiwgXCJST1VORF9IQUxGX1VQXCIsIFwiUk9VTkRfVVBcIiwgXCJST1VUSU5FXCIsIFwiUk9XXCIsIFwiUk9XTlVNQkVSXCIsIFwiUk9XU1wiLCBcIlJPV1NFVFwiLCBcIlJPV19OVU1CRVJcIiwgXCJSUk5cIiwgXCJSVU5cIiwgXCJTQVZFUE9JTlRcIiwgXCJTQ0hFTUFcIiwgXCJTQ09QRVwiLCBcIlNDUkFUQ0hQQURcIiwgXCJTQ1JPTExcIiwgXCJTRUFSQ0hcIiwgXCJTRUNPTkRcIiwgXCJTRUNPTkRTXCIsIFwiU0VDUVRZXCIsIFwiU0VDVVJJVFlcIiwgXCJTRU5TSVRJVkVcIiwgXCJTRVFVRU5DRVwiLCBcIlNFU1NJT05cIiwgXCJTRVNTSU9OX1VTRVJcIiwgXCJTSUdOQUxcIiwgXCJTSU1JTEFSXCIsIFwiU0lNUExFXCIsIFwiU01BTExJTlRcIiwgXCJTTkFOXCIsIFwiU09NRVwiLCBcIlNPVVJDRVwiLCBcIlNQRUNJRklDXCIsIFwiU1BFQ0lGSUNUWVBFXCIsIFwiU1FMXCIsIFwiU1FMRVhDRVBUSU9OXCIsIFwiU1FMSURcIiwgXCJTUUxTVEFURVwiLCBcIlNRTFdBUk5JTkdcIiwgXCJTUVJUXCIsIFwiU1RBQ0tFRFwiLCBcIlNUQU5EQVJEXCIsIFwiU1RBUlRcIiwgXCJTVEFSVElOR1wiLCBcIlNUQVRFTUVOVFwiLCBcIlNUQVRJQ1wiLCBcIlNUQVRNRU5UXCIsIFwiU1RBWVwiLCBcIlNURERFVl9QT1BcIiwgXCJTVERERVZfU0FNUFwiLCBcIlNUT0dST1VQXCIsIFwiU1RPUkVTXCIsIFwiU1RZTEVcIiwgXCJTVUJNVUxUSVNFVFwiLCBcIlNVQlNUUklOR1wiLCBcIlNVTVwiLCBcIlNVTU1BUllcIiwgXCJTWU1NRVRSSUNcIiwgXCJTWU5PTllNXCIsIFwiU1lTRlVOXCIsIFwiU1lTSUJNXCIsIFwiU1lTUFJPQ1wiLCBcIlNZU1RFTVwiLCBcIlNZU1RFTV9VU0VSXCIsIFwiVEFCTEVcIiwgXCJUQUJMRVNBTVBMRVwiLCBcIlRBQkxFU1BBQ0VcIiwgXCJUSEVOXCIsIFwiVElNRVwiLCBcIlRJTUVTVEFNUFwiLCBcIlRJTUVaT05FX0hPVVJcIiwgXCJUSU1FWk9ORV9NSU5VVEVcIiwgXCJUT1wiLCBcIlRSQUlMSU5HXCIsIFwiVFJBTlNBQ1RJT05cIiwgXCJUUkFOU0xBVEVcIiwgXCJUUkFOU0xBVElPTlwiLCBcIlRSRUFUXCIsIFwiVFJJR0dFUlwiLCBcIlRSSU1cIiwgXCJUUlVFXCIsIFwiVFJVTkNBVEVcIiwgXCJUWVBFXCIsIFwiVUVTQ0FQRVwiLCBcIlVORE9cIiwgXCJVTklRVUVcIiwgXCJVTktOT1dOXCIsIFwiVU5ORVNUXCIsIFwiVU5USUxcIiwgXCJVUFBFUlwiLCBcIlVTQUdFXCIsIFwiVVNFUlwiLCBcIlVTSU5HXCIsIFwiVkFMSURQUk9DXCIsIFwiVkFMVUVcIiwgXCJWQVJDSEFSXCIsIFwiVkFSSUFCTEVcIiwgXCJWQVJJQU5UXCIsIFwiVkFSWUlOR1wiLCBcIlZBUl9QT1BcIiwgXCJWQVJfU0FNUFwiLCBcIlZDQVRcIiwgXCJWRVJTSU9OXCIsIFwiVklFV1wiLCBcIlZPTEFUSUxFXCIsIFwiVk9MVU1FU1wiLCBcIldIRU5cIiwgXCJXSEVORVZFUlwiLCBcIldISUxFXCIsIFwiV0lEVEhfQlVDS0VUXCIsIFwiV0lORE9XXCIsIFwiV0lUSFwiLCBcIldJVEhJTlwiLCBcIldJVEhPVVRcIiwgXCJXTE1cIiwgXCJXUklURVwiLCBcIlhNTEVMRU1FTlRcIiwgXCJYTUxFWElTVFNcIiwgXCJYTUxOQU1FU1BBQ0VTXCIsIFwiWUVBUlwiLCBcIllFQVJTXCJdO1xuXG52YXIgcmVzZXJ2ZWRUb3BsZXZlbFdvcmRzID0gW1wiQUREXCIsIFwiQUZURVJcIiwgXCJBTFRFUiBDT0xVTU5cIiwgXCJBTFRFUiBUQUJMRVwiLCBcIkRFTEVURSBGUk9NXCIsIFwiRVhDRVBUXCIsIFwiRkVUQ0ggRklSU1RcIiwgXCJGUk9NXCIsIFwiR1JPVVAgQllcIiwgXCJHT1wiLCBcIkhBVklOR1wiLCBcIklOU0VSVCBJTlRPXCIsIFwiSU5URVJTRUNUXCIsIFwiTElNSVRcIiwgXCJPUkRFUiBCWVwiLCBcIlNFTEVDVFwiLCBcIlNFVCBDVVJSRU5UIFNDSEVNQVwiLCBcIlNFVCBTQ0hFTUFcIiwgXCJTRVRcIiwgXCJVTklPTiBBTExcIiwgXCJVUERBVEVcIiwgXCJWQUxVRVNcIiwgXCJXSEVSRVwiXTtcblxudmFyIHJlc2VydmVkTmV3bGluZVdvcmRzID0gW1wiQU5EXCIsIFwiQ1JPU1MgSk9JTlwiLCBcIklOTkVSIEpPSU5cIiwgXCJKT0lOXCIsIFwiTEVGVCBKT0lOXCIsIFwiTEVGVCBPVVRFUiBKT0lOXCIsIFwiT1JcIiwgXCJPVVRFUiBKT0lOXCIsIFwiUklHSFQgSk9JTlwiLCBcIlJJR0hUIE9VVEVSIEpPSU5cIl07XG5cbnZhciB0b2tlbml6ZXIgPSB2b2lkIDA7XG5cbnZhciBEYjJGb3JtYXR0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNmZyBEaWZmZXJlbnQgc2V0IG9mIGNvbmZpZ3VyYXRpb25zXG4gICAgICovXG4gICAgZnVuY3Rpb24gRGIyRm9ybWF0dGVyKGNmZykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRGIyRm9ybWF0dGVyKTtcblxuICAgICAgICB0aGlzLmNmZyA9IGNmZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGb3JtYXRzIERCMiBxdWVyeSB0byBtYWtlIGl0IGVhc2llciB0byByZWFkXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcXVlcnkgVGhlIERCMiBxdWVyeSBzdHJpbmdcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IGZvcm1hdHRlZCBzdHJpbmdcbiAgICAgKi9cblxuXG4gICAgRGIyRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbiBmb3JtYXQocXVlcnkpIHtcbiAgICAgICAgaWYgKCF0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgIHRva2VuaXplciA9IG5ldyBfVG9rZW5pemVyMltcImRlZmF1bHRcIl0oe1xuICAgICAgICAgICAgICAgIHJlc2VydmVkV29yZHM6IHJlc2VydmVkV29yZHMsXG4gICAgICAgICAgICAgICAgcmVzZXJ2ZWRUb3BsZXZlbFdvcmRzOiByZXNlcnZlZFRvcGxldmVsV29yZHMsXG4gICAgICAgICAgICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHM6IHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgICAgICAgICAgICAgIHN0cmluZ1R5cGVzOiBbXCJcXFwiXFxcIlwiLCBcIicnXCIsIFwiYGBcIiwgXCJbXVwiXSxcbiAgICAgICAgICAgICAgICBvcGVuUGFyZW5zOiBbXCIoXCJdLFxuICAgICAgICAgICAgICAgIGNsb3NlUGFyZW5zOiBbXCIpXCJdLFxuICAgICAgICAgICAgICAgIGluZGV4ZWRQbGFjZWhvbGRlclR5cGVzOiBbXCI/XCJdLFxuICAgICAgICAgICAgICAgIG5hbWVkUGxhY2Vob2xkZXJUeXBlczogW1wiOlwiXSxcbiAgICAgICAgICAgICAgICBsaW5lQ29tbWVudFR5cGVzOiBbXCItLVwiXSxcbiAgICAgICAgICAgICAgICBzcGVjaWFsV29yZENoYXJzOiBbXCIjXCIsIFwiQFwiXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBfRm9ybWF0dGVyMltcImRlZmF1bHRcIl0odGhpcy5jZmcsIHRva2VuaXplcikuZm9ybWF0KHF1ZXJ5KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIERiMkZvcm1hdHRlcjtcbn0oKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBEYjJGb3JtYXR0ZXI7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsICJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9Gb3JtYXR0ZXIgPSByZXF1aXJlKFwiLi4vY29yZS9Gb3JtYXR0ZXJcIik7XG5cbnZhciBfRm9ybWF0dGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Zvcm1hdHRlcik7XG5cbnZhciBfVG9rZW5pemVyID0gcmVxdWlyZShcIi4uL2NvcmUvVG9rZW5pemVyXCIpO1xuXG52YXIgX1Rva2VuaXplcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Ub2tlbml6ZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIHJlc2VydmVkV29yZHMgPSBbXCJBTExcIiwgXCJBTFRFUlwiLCBcIkFOQUxZWkVcIiwgXCJBTkRcIiwgXCJBTllcIiwgXCJBUlJBWVwiLCBcIkFTXCIsIFwiQVNDXCIsIFwiQkVHSU5cIiwgXCJCRVRXRUVOXCIsIFwiQklOQVJZXCIsIFwiQk9PTEVBTlwiLCBcIkJSRUFLXCIsIFwiQlVDS0VUXCIsIFwiQlVJTERcIiwgXCJCWVwiLCBcIkNBTExcIiwgXCJDQVNFXCIsIFwiQ0FTVFwiLCBcIkNMVVNURVJcIiwgXCJDT0xMQVRFXCIsIFwiQ09MTEVDVElPTlwiLCBcIkNPTU1JVFwiLCBcIkNPTk5FQ1RcIiwgXCJDT05USU5VRVwiLCBcIkNPUlJFTEFURVwiLCBcIkNPVkVSXCIsIFwiQ1JFQVRFXCIsIFwiREFUQUJBU0VcIiwgXCJEQVRBU0VUXCIsIFwiREFUQVNUT1JFXCIsIFwiREVDTEFSRVwiLCBcIkRFQ1JFTUVOVFwiLCBcIkRFTEVURVwiLCBcIkRFUklWRURcIiwgXCJERVNDXCIsIFwiREVTQ1JJQkVcIiwgXCJESVNUSU5DVFwiLCBcIkRPXCIsIFwiRFJPUFwiLCBcIkVBQ0hcIiwgXCJFTEVNRU5UXCIsIFwiRUxTRVwiLCBcIkVORFwiLCBcIkVWRVJZXCIsIFwiRVhDRVBUXCIsIFwiRVhDTFVERVwiLCBcIkVYRUNVVEVcIiwgXCJFWElTVFNcIiwgXCJFWFBMQUlOXCIsIFwiRkFMU0VcIiwgXCJGRVRDSFwiLCBcIkZJUlNUXCIsIFwiRkxBVFRFTlwiLCBcIkZPUlwiLCBcIkZPUkNFXCIsIFwiRlJPTVwiLCBcIkZVTkNUSU9OXCIsIFwiR1JBTlRcIiwgXCJHUk9VUFwiLCBcIkdTSVwiLCBcIkhBVklOR1wiLCBcIklGXCIsIFwiSUdOT1JFXCIsIFwiSUxJS0VcIiwgXCJJTlwiLCBcIklOQ0xVREVcIiwgXCJJTkNSRU1FTlRcIiwgXCJJTkRFWFwiLCBcIklORkVSXCIsIFwiSU5MSU5FXCIsIFwiSU5ORVJcIiwgXCJJTlNFUlRcIiwgXCJJTlRFUlNFQ1RcIiwgXCJJTlRPXCIsIFwiSVNcIiwgXCJKT0lOXCIsIFwiS0VZXCIsIFwiS0VZU1wiLCBcIktFWVNQQUNFXCIsIFwiS05PV05cIiwgXCJMQVNUXCIsIFwiTEVGVFwiLCBcIkxFVFwiLCBcIkxFVFRJTkdcIiwgXCJMSUtFXCIsIFwiTElNSVRcIiwgXCJMU01cIiwgXCJNQVBcIiwgXCJNQVBQSU5HXCIsIFwiTUFUQ0hFRFwiLCBcIk1BVEVSSUFMSVpFRFwiLCBcIk1FUkdFXCIsIFwiTUlOVVNcIiwgXCJNSVNTSU5HXCIsIFwiTkFNRVNQQUNFXCIsIFwiTkVTVFwiLCBcIk5PVFwiLCBcIk5VTExcIiwgXCJOVU1CRVJcIiwgXCJPQkpFQ1RcIiwgXCJPRkZTRVRcIiwgXCJPTlwiLCBcIk9QVElPTlwiLCBcIk9SXCIsIFwiT1JERVJcIiwgXCJPVVRFUlwiLCBcIk9WRVJcIiwgXCJQQVJTRVwiLCBcIlBBUlRJVElPTlwiLCBcIlBBU1NXT1JEXCIsIFwiUEFUSFwiLCBcIlBPT0xcIiwgXCJQUkVQQVJFXCIsIFwiUFJJTUFSWVwiLCBcIlBSSVZBVEVcIiwgXCJQUklWSUxFR0VcIiwgXCJQUk9DRURVUkVcIiwgXCJQVUJMSUNcIiwgXCJSQVdcIiwgXCJSRUFMTVwiLCBcIlJFRFVDRVwiLCBcIlJFTkFNRVwiLCBcIlJFVFVSTlwiLCBcIlJFVFVSTklOR1wiLCBcIlJFVk9LRVwiLCBcIlJJR0hUXCIsIFwiUk9MRVwiLCBcIlJPTExCQUNLXCIsIFwiU0FUSVNGSUVTXCIsIFwiU0NIRU1BXCIsIFwiU0VMRUNUXCIsIFwiU0VMRlwiLCBcIlNFTUlcIiwgXCJTRVRcIiwgXCJTSE9XXCIsIFwiU09NRVwiLCBcIlNUQVJUXCIsIFwiU1RBVElTVElDU1wiLCBcIlNUUklOR1wiLCBcIlNZU1RFTVwiLCBcIlRIRU5cIiwgXCJUT1wiLCBcIlRSQU5TQUNUSU9OXCIsIFwiVFJJR0dFUlwiLCBcIlRSVUVcIiwgXCJUUlVOQ0FURVwiLCBcIlVOREVSXCIsIFwiVU5JT05cIiwgXCJVTklRVUVcIiwgXCJVTktOT1dOXCIsIFwiVU5ORVNUXCIsIFwiVU5TRVRcIiwgXCJVUERBVEVcIiwgXCJVUFNFUlRcIiwgXCJVU0VcIiwgXCJVU0VSXCIsIFwiVVNJTkdcIiwgXCJWQUxJREFURVwiLCBcIlZBTFVFXCIsIFwiVkFMVUVEXCIsIFwiVkFMVUVTXCIsIFwiVklBXCIsIFwiVklFV1wiLCBcIldIRU5cIiwgXCJXSEVSRVwiLCBcIldISUxFXCIsIFwiV0lUSFwiLCBcIldJVEhJTlwiLCBcIldPUktcIiwgXCJYT1JcIl07XG5cbnZhciByZXNlcnZlZFRvcGxldmVsV29yZHMgPSBbXCJERUxFVEUgRlJPTVwiLCBcIkVYQ0VQVCBBTExcIiwgXCJFWENFUFRcIiwgXCJFWFBMQUlOIERFTEVURSBGUk9NXCIsIFwiRVhQTEFJTiBVUERBVEVcIiwgXCJFWFBMQUlOIFVQU0VSVFwiLCBcIkZST01cIiwgXCJHUk9VUCBCWVwiLCBcIkhBVklOR1wiLCBcIklORkVSXCIsIFwiSU5TRVJUIElOVE9cIiwgXCJJTlRFUlNFQ1QgQUxMXCIsIFwiSU5URVJTRUNUXCIsIFwiTEVUXCIsIFwiTElNSVRcIiwgXCJNRVJHRVwiLCBcIk5FU1RcIiwgXCJPUkRFUiBCWVwiLCBcIlBSRVBBUkVcIiwgXCJTRUxFQ1RcIiwgXCJTRVQgQ1VSUkVOVCBTQ0hFTUFcIiwgXCJTRVQgU0NIRU1BXCIsIFwiU0VUXCIsIFwiVU5JT04gQUxMXCIsIFwiVU5JT05cIiwgXCJVTk5FU1RcIiwgXCJVUERBVEVcIiwgXCJVUFNFUlRcIiwgXCJVU0UgS0VZU1wiLCBcIlZBTFVFU1wiLCBcIldIRVJFXCJdO1xuXG52YXIgcmVzZXJ2ZWROZXdsaW5lV29yZHMgPSBbXCJBTkRcIiwgXCJJTk5FUiBKT0lOXCIsIFwiSk9JTlwiLCBcIkxFRlQgSk9JTlwiLCBcIkxFRlQgT1VURVIgSk9JTlwiLCBcIk9SXCIsIFwiT1VURVIgSk9JTlwiLCBcIlJJR0hUIEpPSU5cIiwgXCJSSUdIVCBPVVRFUiBKT0lOXCIsIFwiWE9SXCJdO1xuXG52YXIgdG9rZW5pemVyID0gdm9pZCAwO1xuXG52YXIgTjFxbEZvcm1hdHRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIERpZmZlcmVudCBzZXQgb2YgY29uZmlndXJhdGlvbnNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBOMXFsRm9ybWF0dGVyKGNmZykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTjFxbEZvcm1hdHRlcik7XG5cbiAgICAgICAgdGhpcy5jZmcgPSBjZmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9ybWF0IHRoZSB3aGl0ZXNwYWNlIGluIGEgTjFRTCBzdHJpbmcgdG8gbWFrZSBpdCBlYXNpZXIgdG8gcmVhZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5IFRoZSBOMVFMIHN0cmluZ1xuICAgICAqIEByZXR1cm4ge1N0cmluZ30gZm9ybWF0dGVkIHN0cmluZ1xuICAgICAqL1xuXG5cbiAgICBOMXFsRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbiBmb3JtYXQocXVlcnkpIHtcbiAgICAgICAgaWYgKCF0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgIHRva2VuaXplciA9IG5ldyBfVG9rZW5pemVyMltcImRlZmF1bHRcIl0oe1xuICAgICAgICAgICAgICAgIHJlc2VydmVkV29yZHM6IHJlc2VydmVkV29yZHMsXG4gICAgICAgICAgICAgICAgcmVzZXJ2ZWRUb3BsZXZlbFdvcmRzOiByZXNlcnZlZFRvcGxldmVsV29yZHMsXG4gICAgICAgICAgICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHM6IHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgICAgICAgICAgICAgIHN0cmluZ1R5cGVzOiBbXCJcXFwiXFxcIlwiLCBcIicnXCIsIFwiYGBcIl0sXG4gICAgICAgICAgICAgICAgb3BlblBhcmVuczogW1wiKFwiLCBcIltcIiwgXCJ7XCJdLFxuICAgICAgICAgICAgICAgIGNsb3NlUGFyZW5zOiBbXCIpXCIsIFwiXVwiLCBcIn1cIl0sXG4gICAgICAgICAgICAgICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbXCIkXCJdLFxuICAgICAgICAgICAgICAgIGxpbmVDb21tZW50VHlwZXM6IFtcIiNcIiwgXCItLVwiXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBfRm9ybWF0dGVyMltcImRlZmF1bHRcIl0odGhpcy5jZmcsIHRva2VuaXplcikuZm9ybWF0KHF1ZXJ5KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIE4xcWxGb3JtYXR0ZXI7XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gTjFxbEZvcm1hdHRlcjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwgIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX0Zvcm1hdHRlciA9IHJlcXVpcmUoXCIuLi9jb3JlL0Zvcm1hdHRlclwiKTtcblxudmFyIF9Gb3JtYXR0ZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRm9ybWF0dGVyKTtcblxudmFyIF9Ub2tlbml6ZXIgPSByZXF1aXJlKFwiLi4vY29yZS9Ub2tlbml6ZXJcIik7XG5cbnZhciBfVG9rZW5pemVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1Rva2VuaXplcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IFwiZGVmYXVsdFwiOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgcmVzZXJ2ZWRXb3JkcyA9IFtcIkFcIiwgXCJBQ0NFU1NJQkxFXCIsIFwiQUdFTlRcIiwgXCJBR0dSRUdBVEVcIiwgXCJBTExcIiwgXCJBTFRFUlwiLCBcIkFOWVwiLCBcIkFSUkFZXCIsIFwiQVNcIiwgXCJBU0NcIiwgXCJBVFwiLCBcIkFUVFJJQlVURVwiLCBcIkFVVEhJRFwiLCBcIkFWR1wiLCBcIkJFVFdFRU5cIiwgXCJCRklMRV9CQVNFXCIsIFwiQklOQVJZX0lOVEVHRVJcIiwgXCJCSU5BUllcIiwgXCJCTE9CX0JBU0VcIiwgXCJCTE9DS1wiLCBcIkJPRFlcIiwgXCJCT09MRUFOXCIsIFwiQk9USFwiLCBcIkJPVU5EXCIsIFwiQlVMS1wiLCBcIkJZXCIsIFwiQllURVwiLCBcIkNcIiwgXCJDQUxMXCIsIFwiQ0FMTElOR1wiLCBcIkNBU0NBREVcIiwgXCJDQVNFXCIsIFwiQ0hBUl9CQVNFXCIsIFwiQ0hBUlwiLCBcIkNIQVJBQ1RFUlwiLCBcIkNIQVJTRVRcIiwgXCJDSEFSU0VURk9STVwiLCBcIkNIQVJTRVRJRFwiLCBcIkNIRUNLXCIsIFwiQ0xPQl9CQVNFXCIsIFwiQ0xPTkVcIiwgXCJDTE9TRVwiLCBcIkNMVVNURVJcIiwgXCJDTFVTVEVSU1wiLCBcIkNPQUxFU0NFXCIsIFwiQ09MQVVUSFwiLCBcIkNPTExFQ1RcIiwgXCJDT0xVTU5TXCIsIFwiQ09NTUVOVFwiLCBcIkNPTU1JVFwiLCBcIkNPTU1JVFRFRFwiLCBcIkNPTVBJTEVEXCIsIFwiQ09NUFJFU1NcIiwgXCJDT05ORUNUXCIsIFwiQ09OU1RBTlRcIiwgXCJDT05TVFJVQ1RPUlwiLCBcIkNPTlRFWFRcIiwgXCJDT05USU5VRVwiLCBcIkNPTlZFUlRcIiwgXCJDT1VOVFwiLCBcIkNSQVNIXCIsIFwiQ1JFQVRFXCIsIFwiQ1JFREVOVElBTFwiLCBcIkNVUlJFTlRcIiwgXCJDVVJSVkFMXCIsIFwiQ1VSU09SXCIsIFwiQ1VTVE9NREFUVU1cIiwgXCJEQU5HTElOR1wiLCBcIkRBVEFcIiwgXCJEQVRFX0JBU0VcIiwgXCJEQVRFXCIsIFwiREFZXCIsIFwiREVDSU1BTFwiLCBcIkRFRkFVTFRcIiwgXCJERUZJTkVcIiwgXCJERUxFVEVcIiwgXCJERVNDXCIsIFwiREVURVJNSU5JU1RJQ1wiLCBcIkRJUkVDVE9SWVwiLCBcIkRJU1RJTkNUXCIsIFwiRE9cIiwgXCJET1VCTEVcIiwgXCJEUk9QXCIsIFwiRFVSQVRJT05cIiwgXCJFTEVNRU5UXCIsIFwiRUxTSUZcIiwgXCJFTVBUWVwiLCBcIkVTQ0FQRVwiLCBcIkVYQ0VQVElPTlNcIiwgXCJFWENMVVNJVkVcIiwgXCJFWEVDVVRFXCIsIFwiRVhJU1RTXCIsIFwiRVhJVFwiLCBcIkVYVEVORFNcIiwgXCJFWFRFUk5BTFwiLCBcIkVYVFJBQ1RcIiwgXCJGQUxTRVwiLCBcIkZFVENIXCIsIFwiRklOQUxcIiwgXCJGSVJTVFwiLCBcIkZJWEVEXCIsIFwiRkxPQVRcIiwgXCJGT1JcIiwgXCJGT1JBTExcIiwgXCJGT1JDRVwiLCBcIkZST01cIiwgXCJGVU5DVElPTlwiLCBcIkdFTkVSQUxcIiwgXCJHT1RPXCIsIFwiR1JBTlRcIiwgXCJHUk9VUFwiLCBcIkhBU0hcIiwgXCJIRUFQXCIsIFwiSElEREVOXCIsIFwiSE9VUlwiLCBcIklERU5USUZJRURcIiwgXCJJRlwiLCBcIklNTUVESUFURVwiLCBcIklOXCIsIFwiSU5DTFVESU5HXCIsIFwiSU5ERVhcIiwgXCJJTkRFWEVTXCIsIFwiSU5ESUNBVE9SXCIsIFwiSU5ESUNFU1wiLCBcIklORklOSVRFXCIsIFwiSU5TVEFOVElBQkxFXCIsIFwiSU5UXCIsIFwiSU5URUdFUlwiLCBcIklOVEVSRkFDRVwiLCBcIklOVEVSVkFMXCIsIFwiSU5UT1wiLCBcIklOVkFMSURBVEVcIiwgXCJJU1wiLCBcIklTT0xBVElPTlwiLCBcIkpBVkFcIiwgXCJMQU5HVUFHRVwiLCBcIkxBUkdFXCIsIFwiTEVBRElOR1wiLCBcIkxFTkdUSFwiLCBcIkxFVkVMXCIsIFwiTElCUkFSWVwiLCBcIkxJS0VcIiwgXCJMSUtFMlwiLCBcIkxJS0U0XCIsIFwiTElLRUNcIiwgXCJMSU1JVEVEXCIsIFwiTE9DQUxcIiwgXCJMT0NLXCIsIFwiTE9OR1wiLCBcIk1BUFwiLCBcIk1BWFwiLCBcIk1BWExFTlwiLCBcIk1FTUJFUlwiLCBcIk1FUkdFXCIsIFwiTUlOXCIsIFwiTUlOVVNcIiwgXCJNSU5VVEVcIiwgXCJNTFNMQUJFTFwiLCBcIk1PRFwiLCBcIk1PREVcIiwgXCJNT05USFwiLCBcIk1VTFRJU0VUXCIsIFwiTkFNRVwiLCBcIk5BTlwiLCBcIk5BVElPTkFMXCIsIFwiTkFUSVZFXCIsIFwiTkFUVVJBTFwiLCBcIk5BVFVSQUxOXCIsIFwiTkNIQVJcIiwgXCJORVdcIiwgXCJORVhUVkFMXCIsIFwiTk9DT01QUkVTU1wiLCBcIk5PQ09QWVwiLCBcIk5PVFwiLCBcIk5PV0FJVFwiLCBcIk5VTExcIiwgXCJOVUxMSUZcIiwgXCJOVU1CRVJfQkFTRVwiLCBcIk5VTUJFUlwiLCBcIk9CSkVDVFwiLCBcIk9DSUNPTExcIiwgXCJPQ0lEQVRFXCIsIFwiT0NJREFURVRJTUVcIiwgXCJPQ0lEVVJBVElPTlwiLCBcIk9DSUlOVEVSVkFMXCIsIFwiT0NJTE9CTE9DQVRPUlwiLCBcIk9DSU5VTUJFUlwiLCBcIk9DSVJBV1wiLCBcIk9DSVJFRlwiLCBcIk9DSVJFRkNVUlNPUlwiLCBcIk9DSVJPV0lEXCIsIFwiT0NJU1RSSU5HXCIsIFwiT0NJVFlQRVwiLCBcIk9GXCIsIFwiT0xEXCIsIFwiT05cIiwgXCJPTkxZXCIsIFwiT1BBUVVFXCIsIFwiT1BFTlwiLCBcIk9QRVJBVE9SXCIsIFwiT1BUSU9OXCIsIFwiT1JBQ0xFXCIsIFwiT1JBREFUQVwiLCBcIk9SREVSXCIsIFwiT1JHQU5JWkFUSU9OXCIsIFwiT1JMQU5ZXCIsIFwiT1JMVkFSWVwiLCBcIk9USEVSU1wiLCBcIk9VVFwiLCBcIk9WRVJMQVBTXCIsIFwiT1ZFUlJJRElOR1wiLCBcIlBBQ0tBR0VcIiwgXCJQQVJBTExFTF9FTkFCTEVcIiwgXCJQQVJBTUVURVJcIiwgXCJQQVJBTUVURVJTXCIsIFwiUEFSRU5UXCIsIFwiUEFSVElUSU9OXCIsIFwiUEFTQ0FMXCIsIFwiUENURlJFRVwiLCBcIlBJUEVcIiwgXCJQSVBFTElORURcIiwgXCJQTFNfSU5URUdFUlwiLCBcIlBMVUdHQUJMRVwiLCBcIlBPU0lUSVZFXCIsIFwiUE9TSVRJVkVOXCIsIFwiUFJBR01BXCIsIFwiUFJFQ0lTSU9OXCIsIFwiUFJJT1JcIiwgXCJQUklWQVRFXCIsIFwiUFJPQ0VEVVJFXCIsIFwiUFVCTElDXCIsIFwiUkFJU0VcIiwgXCJSQU5HRVwiLCBcIlJBV1wiLCBcIlJFQURcIiwgXCJSRUFMXCIsIFwiUkVDT1JEXCIsIFwiUkVGXCIsIFwiUkVGRVJFTkNFXCIsIFwiUkVMRUFTRVwiLCBcIlJFTElFU19PTlwiLCBcIlJFTVwiLCBcIlJFTUFJTkRFUlwiLCBcIlJFTkFNRVwiLCBcIlJFU09VUkNFXCIsIFwiUkVTVUxUX0NBQ0hFXCIsIFwiUkVTVUxUXCIsIFwiUkVUVVJOXCIsIFwiUkVUVVJOSU5HXCIsIFwiUkVWRVJTRVwiLCBcIlJFVk9LRVwiLCBcIlJPTExCQUNLXCIsIFwiUk9XXCIsIFwiUk9XSURcIiwgXCJST1dOVU1cIiwgXCJST1dUWVBFXCIsIFwiU0FNUExFXCIsIFwiU0FWRVwiLCBcIlNBVkVQT0lOVFwiLCBcIlNCMVwiLCBcIlNCMlwiLCBcIlNCNFwiLCBcIlNFQ09ORFwiLCBcIlNFR01FTlRcIiwgXCJTRUxGXCIsIFwiU0VQQVJBVEVcIiwgXCJTRVFVRU5DRVwiLCBcIlNFUklBTElaQUJMRVwiLCBcIlNIQVJFXCIsIFwiU0hPUlRcIiwgXCJTSVpFX1RcIiwgXCJTSVpFXCIsIFwiU01BTExJTlRcIiwgXCJTT01FXCIsIFwiU1BBQ0VcIiwgXCJTUEFSU0VcIiwgXCJTUUxcIiwgXCJTUUxDT0RFXCIsIFwiU1FMREFUQVwiLCBcIlNRTEVSUk1cIiwgXCJTUUxOQU1FXCIsIFwiU1FMU1RBVEVcIiwgXCJTVEFOREFSRFwiLCBcIlNUQVJUXCIsIFwiU1RBVElDXCIsIFwiU1REREVWXCIsIFwiU1RPUkVEXCIsIFwiU1RSSU5HXCIsIFwiU1RSVUNUXCIsIFwiU1RZTEVcIiwgXCJTVUJNVUxUSVNFVFwiLCBcIlNVQlBBUlRJVElPTlwiLCBcIlNVQlNUSVRVVEFCTEVcIiwgXCJTVUJUWVBFXCIsIFwiU1VDQ0VTU0ZVTFwiLCBcIlNVTVwiLCBcIlNZTk9OWU1cIiwgXCJTWVNEQVRFXCIsIFwiVEFCQVVUSFwiLCBcIlRBQkxFXCIsIFwiVERPXCIsIFwiVEhFXCIsIFwiVEhFTlwiLCBcIlRJTUVcIiwgXCJUSU1FU1RBTVBcIiwgXCJUSU1FWk9ORV9BQkJSXCIsIFwiVElNRVpPTkVfSE9VUlwiLCBcIlRJTUVaT05FX01JTlVURVwiLCBcIlRJTUVaT05FX1JFR0lPTlwiLCBcIlRPXCIsIFwiVFJBSUxJTkdcIiwgXCJUUkFOU0FDVElPTlwiLCBcIlRSQU5TQUNUSU9OQUxcIiwgXCJUUklHR0VSXCIsIFwiVFJVRVwiLCBcIlRSVVNURURcIiwgXCJUWVBFXCIsIFwiVUIxXCIsIFwiVUIyXCIsIFwiVUI0XCIsIFwiVUlEXCIsIFwiVU5ERVJcIiwgXCJVTklRVUVcIiwgXCJVTlBMVUdcIiwgXCJVTlNJR05FRFwiLCBcIlVOVFJVU1RFRFwiLCBcIlVTRVwiLCBcIlVTRVJcIiwgXCJVU0lOR1wiLCBcIlZBTElEQVRFXCIsIFwiVkFMSVNUXCIsIFwiVkFMVUVcIiwgXCJWQVJDSEFSXCIsIFwiVkFSQ0hBUjJcIiwgXCJWQVJJQUJMRVwiLCBcIlZBUklBTkNFXCIsIFwiVkFSUkFZXCIsIFwiVkFSWUlOR1wiLCBcIlZJRVdcIiwgXCJWSUVXU1wiLCBcIlZPSURcIiwgXCJXSEVORVZFUlwiLCBcIldISUxFXCIsIFwiV0lUSFwiLCBcIldPUktcIiwgXCJXUkFQUEVEXCIsIFwiV1JJVEVcIiwgXCJZRUFSXCIsIFwiWk9ORVwiXTtcblxudmFyIHJlc2VydmVkVG9wbGV2ZWxXb3JkcyA9IFtcIkFERFwiLCBcIkFMVEVSIENPTFVNTlwiLCBcIkFMVEVSIFRBQkxFXCIsIFwiQkVHSU5cIiwgXCJDT05ORUNUIEJZXCIsIFwiREVDTEFSRVwiLCBcIkRFTEVURSBGUk9NXCIsIFwiREVMRVRFXCIsIFwiRU5EXCIsIFwiRVhDRVBUXCIsIFwiRVhDRVBUSU9OXCIsIFwiRkVUQ0ggRklSU1RcIiwgXCJGUk9NXCIsIFwiR1JPVVAgQllcIiwgXCJIQVZJTkdcIiwgXCJJTlNFUlQgSU5UT1wiLCBcIklOU0VSVFwiLCBcIklOVEVSU0VDVFwiLCBcIkxJTUlUXCIsIFwiTE9PUFwiLCBcIk1PRElGWVwiLCBcIk9SREVSIEJZXCIsIFwiU0VMRUNUXCIsIFwiU0VUIENVUlJFTlQgU0NIRU1BXCIsIFwiU0VUIFNDSEVNQVwiLCBcIlNFVFwiLCBcIlNUQVJUIFdJVEhcIiwgXCJVTklPTiBBTExcIiwgXCJVTklPTlwiLCBcIlVQREFURVwiLCBcIlZBTFVFU1wiLCBcIldIRVJFXCJdO1xuXG52YXIgcmVzZXJ2ZWROZXdsaW5lV29yZHMgPSBbXCJBTkRcIiwgXCJDUk9TUyBBUFBMWVwiLCBcIkNST1NTIEpPSU5cIiwgXCJFTFNFXCIsIFwiRU5EXCIsIFwiSU5ORVIgSk9JTlwiLCBcIkpPSU5cIiwgXCJMRUZUIEpPSU5cIiwgXCJMRUZUIE9VVEVSIEpPSU5cIiwgXCJPUlwiLCBcIk9VVEVSIEFQUExZXCIsIFwiT1VURVIgSk9JTlwiLCBcIlJJR0hUIEpPSU5cIiwgXCJSSUdIVCBPVVRFUiBKT0lOXCIsIFwiV0hFTlwiLCBcIlhPUlwiXTtcblxudmFyIHRva2VuaXplciA9IHZvaWQgMDtcblxudmFyIFBsU3FsRm9ybWF0dGVyID0gZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgRGlmZmVyZW50IHNldCBvZiBjb25maWd1cmF0aW9uc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIFBsU3FsRm9ybWF0dGVyKGNmZykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUGxTcWxGb3JtYXR0ZXIpO1xuXG4gICAgICAgIHRoaXMuY2ZnID0gY2ZnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvcm1hdCB0aGUgd2hpdGVzcGFjZSBpbiBhIFBML1NRTCBzdHJpbmcgdG8gbWFrZSBpdCBlYXNpZXIgdG8gcmVhZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5IFRoZSBQTC9TUUwgc3RyaW5nXG4gICAgICogQHJldHVybiB7U3RyaW5nfSBmb3JtYXR0ZWQgc3RyaW5nXG4gICAgICovXG5cblxuICAgIFBsU3FsRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbiBmb3JtYXQocXVlcnkpIHtcbiAgICAgICAgaWYgKCF0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgIHRva2VuaXplciA9IG5ldyBfVG9rZW5pemVyMltcImRlZmF1bHRcIl0oe1xuICAgICAgICAgICAgICAgIHJlc2VydmVkV29yZHM6IHJlc2VydmVkV29yZHMsXG4gICAgICAgICAgICAgICAgcmVzZXJ2ZWRUb3BsZXZlbFdvcmRzOiByZXNlcnZlZFRvcGxldmVsV29yZHMsXG4gICAgICAgICAgICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHM6IHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgICAgICAgICAgICAgIHN0cmluZ1R5cGVzOiBbXCJcXFwiXFxcIlwiLCBcIk4nJ1wiLCBcIicnXCIsIFwiYGBcIl0sXG4gICAgICAgICAgICAgICAgb3BlblBhcmVuczogW1wiKFwiLCBcIkNBU0VcIl0sXG4gICAgICAgICAgICAgICAgY2xvc2VQYXJlbnM6IFtcIilcIiwgXCJFTkRcIl0sXG4gICAgICAgICAgICAgICAgaW5kZXhlZFBsYWNlaG9sZGVyVHlwZXM6IFtcIj9cIl0sXG4gICAgICAgICAgICAgICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbXCI6XCJdLFxuICAgICAgICAgICAgICAgIGxpbmVDb21tZW50VHlwZXM6IFtcIi0tXCJdLFxuICAgICAgICAgICAgICAgIHNwZWNpYWxXb3JkQ2hhcnM6IFtcIl9cIiwgXCIkXCIsIFwiI1wiLCBcIi5cIiwgXCJAXCJdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IF9Gb3JtYXR0ZXIyW1wiZGVmYXVsdFwiXSh0aGlzLmNmZywgdG9rZW5pemVyKS5mb3JtYXQocXVlcnkpO1xuICAgIH07XG5cbiAgICByZXR1cm4gUGxTcWxGb3JtYXR0ZXI7XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gUGxTcWxGb3JtYXR0ZXI7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsICJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9Gb3JtYXR0ZXIgPSByZXF1aXJlKFwiLi4vY29yZS9Gb3JtYXR0ZXJcIik7XG5cbnZhciBfRm9ybWF0dGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Zvcm1hdHRlcik7XG5cbnZhciBfVG9rZW5pemVyID0gcmVxdWlyZShcIi4uL2NvcmUvVG9rZW5pemVyXCIpO1xuXG52YXIgX1Rva2VuaXplcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Ub2tlbml6ZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIHJlc2VydmVkV29yZHMgPSBbXCJBQ0NFU1NJQkxFXCIsIFwiQUNUSU9OXCIsIFwiQUdBSU5TVFwiLCBcIkFHR1JFR0FURVwiLCBcIkFMR09SSVRITVwiLCBcIkFMTFwiLCBcIkFMVEVSXCIsIFwiQU5BTFlTRVwiLCBcIkFOQUxZWkVcIiwgXCJBU1wiLCBcIkFTQ1wiLCBcIkFVVE9DT01NSVRcIiwgXCJBVVRPX0lOQ1JFTUVOVFwiLCBcIkJBQ0tVUFwiLCBcIkJFR0lOXCIsIFwiQkVUV0VFTlwiLCBcIkJJTkxPR1wiLCBcIkJPVEhcIiwgXCJDQVNDQURFXCIsIFwiQ0FTRVwiLCBcIkNIQU5HRVwiLCBcIkNIQU5HRURcIiwgXCJDSEFSQUNURVIgU0VUXCIsIFwiQ0hBUlNFVFwiLCBcIkNIRUNLXCIsIFwiQ0hFQ0tTVU1cIiwgXCJDT0xMQVRFXCIsIFwiQ09MTEFUSU9OXCIsIFwiQ09MVU1OXCIsIFwiQ09MVU1OU1wiLCBcIkNPTU1FTlRcIiwgXCJDT01NSVRcIiwgXCJDT01NSVRURURcIiwgXCJDT01QUkVTU0VEXCIsIFwiQ09OQ1VSUkVOVFwiLCBcIkNPTlNUUkFJTlRcIiwgXCJDT05UQUlOU1wiLCBcIkNPTlZFUlRcIiwgXCJDUkVBVEVcIiwgXCJDUk9TU1wiLCBcIkNVUlJFTlRfVElNRVNUQU1QXCIsIFwiREFUQUJBU0VcIiwgXCJEQVRBQkFTRVNcIiwgXCJEQVlcIiwgXCJEQVlfSE9VUlwiLCBcIkRBWV9NSU5VVEVcIiwgXCJEQVlfU0VDT05EXCIsIFwiREVGQVVMVFwiLCBcIkRFRklORVJcIiwgXCJERUxBWUVEXCIsIFwiREVMRVRFXCIsIFwiREVTQ1wiLCBcIkRFU0NSSUJFXCIsIFwiREVURVJNSU5JU1RJQ1wiLCBcIkRJU1RJTkNUXCIsIFwiRElTVElOQ1RST1dcIiwgXCJESVZcIiwgXCJET1wiLCBcIkRST1BcIiwgXCJEVU1QRklMRVwiLCBcIkRVUExJQ0FURVwiLCBcIkRZTkFNSUNcIiwgXCJFTFNFXCIsIFwiRU5DTE9TRURcIiwgXCJFTkRcIiwgXCJFTkdJTkVcIiwgXCJFTkdJTkVTXCIsIFwiRU5HSU5FX1RZUEVcIiwgXCJFU0NBUEVcIiwgXCJFU0NBUEVEXCIsIFwiRVZFTlRTXCIsIFwiRVhFQ1wiLCBcIkVYRUNVVEVcIiwgXCJFWElTVFNcIiwgXCJFWFBMQUlOXCIsIFwiRVhURU5ERURcIiwgXCJGQVNUXCIsIFwiRkVUQ0hcIiwgXCJGSUVMRFNcIiwgXCJGSUxFXCIsIFwiRklSU1RcIiwgXCJGSVhFRFwiLCBcIkZMVVNIXCIsIFwiRk9SXCIsIFwiRk9SQ0VcIiwgXCJGT1JFSUdOXCIsIFwiRlVMTFwiLCBcIkZVTExURVhUXCIsIFwiRlVOQ1RJT05cIiwgXCJHTE9CQUxcIiwgXCJHUkFOVFwiLCBcIkdSQU5UU1wiLCBcIkdST1VQX0NPTkNBVFwiLCBcIkhFQVBcIiwgXCJISUdIX1BSSU9SSVRZXCIsIFwiSE9TVFNcIiwgXCJIT1VSXCIsIFwiSE9VUl9NSU5VVEVcIiwgXCJIT1VSX1NFQ09ORFwiLCBcIklERU5USUZJRURcIiwgXCJJRlwiLCBcIklGTlVMTFwiLCBcIklHTk9SRVwiLCBcIklOXCIsIFwiSU5ERVhcIiwgXCJJTkRFWEVTXCIsIFwiSU5GSUxFXCIsIFwiSU5TRVJUXCIsIFwiSU5TRVJUX0lEXCIsIFwiSU5TRVJUX01FVEhPRFwiLCBcIklOVEVSVkFMXCIsIFwiSU5UT1wiLCBcIklOVk9LRVJcIiwgXCJJU1wiLCBcIklTT0xBVElPTlwiLCBcIktFWVwiLCBcIktFWVNcIiwgXCJLSUxMXCIsIFwiTEFTVF9JTlNFUlRfSURcIiwgXCJMRUFESU5HXCIsIFwiTEVWRUxcIiwgXCJMSUtFXCIsIFwiTElORUFSXCIsIFwiTElORVNcIiwgXCJMT0FEXCIsIFwiTE9DQUxcIiwgXCJMT0NLXCIsIFwiTE9DS1NcIiwgXCJMT0dTXCIsIFwiTE9XX1BSSU9SSVRZXCIsIFwiTUFSSUFcIiwgXCJNQVNURVJcIiwgXCJNQVNURVJfQ09OTkVDVF9SRVRSWVwiLCBcIk1BU1RFUl9IT1NUXCIsIFwiTUFTVEVSX0xPR19GSUxFXCIsIFwiTUFUQ0hcIiwgXCJNQVhfQ09OTkVDVElPTlNfUEVSX0hPVVJcIiwgXCJNQVhfUVVFUklFU19QRVJfSE9VUlwiLCBcIk1BWF9ST1dTXCIsIFwiTUFYX1VQREFURVNfUEVSX0hPVVJcIiwgXCJNQVhfVVNFUl9DT05ORUNUSU9OU1wiLCBcIk1FRElVTVwiLCBcIk1FUkdFXCIsIFwiTUlOVVRFXCIsIFwiTUlOVVRFX1NFQ09ORFwiLCBcIk1JTl9ST1dTXCIsIFwiTU9ERVwiLCBcIk1PRElGWVwiLCBcIk1PTlRIXCIsIFwiTVJHX01ZSVNBTVwiLCBcIk1ZSVNBTVwiLCBcIk5BTUVTXCIsIFwiTkFUVVJBTFwiLCBcIk5PVFwiLCBcIk5PVygpXCIsIFwiTlVMTFwiLCBcIk9GRlNFVFwiLCBcIk9OIERFTEVURVwiLCBcIk9OIFVQREFURVwiLCBcIk9OXCIsIFwiT05MWVwiLCBcIk9QRU5cIiwgXCJPUFRJTUlaRVwiLCBcIk9QVElPTlwiLCBcIk9QVElPTkFMTFlcIiwgXCJPVVRGSUxFXCIsIFwiUEFDS19LRVlTXCIsIFwiUEFHRVwiLCBcIlBBUlRJQUxcIiwgXCJQQVJUSVRJT05cIiwgXCJQQVJUSVRJT05TXCIsIFwiUEFTU1dPUkRcIiwgXCJQUklNQVJZXCIsIFwiUFJJVklMRUdFU1wiLCBcIlBST0NFRFVSRVwiLCBcIlBST0NFU1NcIiwgXCJQUk9DRVNTTElTVFwiLCBcIlBVUkdFXCIsIFwiUVVJQ0tcIiwgXCJSQUlEMFwiLCBcIlJBSURfQ0hVTktTXCIsIFwiUkFJRF9DSFVOS1NJWkVcIiwgXCJSQUlEX1RZUEVcIiwgXCJSQU5HRVwiLCBcIlJFQURcIiwgXCJSRUFEX09OTFlcIiwgXCJSRUFEX1dSSVRFXCIsIFwiUkVGRVJFTkNFU1wiLCBcIlJFR0VYUFwiLCBcIlJFTE9BRFwiLCBcIlJFTkFNRVwiLCBcIlJFUEFJUlwiLCBcIlJFUEVBVEFCTEVcIiwgXCJSRVBMQUNFXCIsIFwiUkVQTElDQVRJT05cIiwgXCJSRVNFVFwiLCBcIlJFU1RPUkVcIiwgXCJSRVNUUklDVFwiLCBcIlJFVFVSTlwiLCBcIlJFVFVSTlNcIiwgXCJSRVZPS0VcIiwgXCJSTElLRVwiLCBcIlJPTExCQUNLXCIsIFwiUk9XXCIsIFwiUk9XU1wiLCBcIlJPV19GT1JNQVRcIiwgXCJTRUNPTkRcIiwgXCJTRUNVUklUWVwiLCBcIlNFUEFSQVRPUlwiLCBcIlNFUklBTElaQUJMRVwiLCBcIlNFU1NJT05cIiwgXCJTSEFSRVwiLCBcIlNIT1dcIiwgXCJTSFVURE9XTlwiLCBcIlNMQVZFXCIsIFwiU09OQU1FXCIsIFwiU09VTkRTXCIsIFwiU1FMXCIsIFwiU1FMX0FVVE9fSVNfTlVMTFwiLCBcIlNRTF9CSUdfUkVTVUxUXCIsIFwiU1FMX0JJR19TRUxFQ1RTXCIsIFwiU1FMX0JJR19UQUJMRVNcIiwgXCJTUUxfQlVGRkVSX1JFU1VMVFwiLCBcIlNRTF9DQUNIRVwiLCBcIlNRTF9DQUxDX0ZPVU5EX1JPV1NcIiwgXCJTUUxfTE9HX0JJTlwiLCBcIlNRTF9MT0dfT0ZGXCIsIFwiU1FMX0xPR19VUERBVEVcIiwgXCJTUUxfTE9XX1BSSU9SSVRZX1VQREFURVNcIiwgXCJTUUxfTUFYX0pPSU5fU0laRVwiLCBcIlNRTF9OT19DQUNIRVwiLCBcIlNRTF9RVU9URV9TSE9XX0NSRUFURVwiLCBcIlNRTF9TQUZFX1VQREFURVNcIiwgXCJTUUxfU0VMRUNUX0xJTUlUXCIsIFwiU1FMX1NMQVZFX1NLSVBfQ09VTlRFUlwiLCBcIlNRTF9TTUFMTF9SRVNVTFRcIiwgXCJTUUxfV0FSTklOR1NcIiwgXCJTVEFSVFwiLCBcIlNUQVJUSU5HXCIsIFwiU1RBVFVTXCIsIFwiU1RPUFwiLCBcIlNUT1JBR0VcIiwgXCJTVFJBSUdIVF9KT0lOXCIsIFwiU1RSSU5HXCIsIFwiU1RSSVBFRFwiLCBcIlNVUEVSXCIsIFwiVEFCTEVcIiwgXCJUQUJMRVNcIiwgXCJURU1QT1JBUllcIiwgXCJURVJNSU5BVEVEXCIsIFwiVEhFTlwiLCBcIlRPXCIsIFwiVFJBSUxJTkdcIiwgXCJUUkFOU0FDVElPTkFMXCIsIFwiVFJVRVwiLCBcIlRSVU5DQVRFXCIsIFwiVFlQRVwiLCBcIlRZUEVTXCIsIFwiVU5DT01NSVRURURcIiwgXCJVTklRVUVcIiwgXCJVTkxPQ0tcIiwgXCJVTlNJR05FRFwiLCBcIlVTQUdFXCIsIFwiVVNFXCIsIFwiVVNJTkdcIiwgXCJWQVJJQUJMRVNcIiwgXCJWSUVXXCIsIFwiV0hFTlwiLCBcIldJVEhcIiwgXCJXT1JLXCIsIFwiV1JJVEVcIiwgXCJZRUFSX01PTlRIXCJdO1xuXG52YXIgcmVzZXJ2ZWRUb3BsZXZlbFdvcmRzID0gW1wiQUREXCIsIFwiQUZURVJcIiwgXCJBTFRFUiBDT0xVTU5cIiwgXCJBTFRFUiBUQUJMRVwiLCBcIkRFTEVURSBGUk9NXCIsIFwiRVhDRVBUXCIsIFwiRkVUQ0ggRklSU1RcIiwgXCJGUk9NXCIsIFwiR1JPVVAgQllcIiwgXCJHT1wiLCBcIkhBVklOR1wiLCBcIklOU0VSVCBJTlRPXCIsIFwiSU5TRVJUXCIsIFwiSU5URVJTRUNUXCIsIFwiTElNSVRcIiwgXCJNT0RJRllcIiwgXCJPUkRFUiBCWVwiLCBcIlNFTEVDVFwiLCBcIlNFVCBDVVJSRU5UIFNDSEVNQVwiLCBcIlNFVCBTQ0hFTUFcIiwgXCJTRVRcIiwgXCJVTklPTiBBTExcIiwgXCJVTklPTlwiLCBcIlVQREFURVwiLCBcIlZBTFVFU1wiLCBcIldIRVJFXCJdO1xuXG52YXIgcmVzZXJ2ZWROZXdsaW5lV29yZHMgPSBbXCJBTkRcIiwgXCJDUk9TUyBBUFBMWVwiLCBcIkNST1NTIEpPSU5cIiwgXCJFTFNFXCIsIFwiSU5ORVIgSk9JTlwiLCBcIkpPSU5cIiwgXCJMRUZUIEpPSU5cIiwgXCJMRUZUIE9VVEVSIEpPSU5cIiwgXCJPUlwiLCBcIk9VVEVSIEFQUExZXCIsIFwiT1VURVIgSk9JTlwiLCBcIlJJR0hUIEpPSU5cIiwgXCJSSUdIVCBPVVRFUiBKT0lOXCIsIFwiV0hFTlwiLCBcIlhPUlwiXTtcblxudmFyIHRva2VuaXplciA9IHZvaWQgMDtcblxudmFyIFN0YW5kYXJkU3FsRm9ybWF0dGVyID0gZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgRGlmZmVyZW50IHNldCBvZiBjb25maWd1cmF0aW9uc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIFN0YW5kYXJkU3FsRm9ybWF0dGVyKGNmZykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgU3RhbmRhcmRTcWxGb3JtYXR0ZXIpO1xuXG4gICAgICAgIHRoaXMuY2ZnID0gY2ZnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvcm1hdCB0aGUgd2hpdGVzcGFjZSBpbiBhIFN0YW5kYXJkIFNRTCBzdHJpbmcgdG8gbWFrZSBpdCBlYXNpZXIgdG8gcmVhZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5IFRoZSBTdGFuZGFyZCBTUUwgc3RyaW5nXG4gICAgICogQHJldHVybiB7U3RyaW5nfSBmb3JtYXR0ZWQgc3RyaW5nXG4gICAgICovXG5cblxuICAgIFN0YW5kYXJkU3FsRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbiBmb3JtYXQocXVlcnkpIHtcbiAgICAgICAgaWYgKCF0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgIHRva2VuaXplciA9IG5ldyBfVG9rZW5pemVyMltcImRlZmF1bHRcIl0oe1xuICAgICAgICAgICAgICAgIHJlc2VydmVkV29yZHM6IHJlc2VydmVkV29yZHMsXG4gICAgICAgICAgICAgICAgcmVzZXJ2ZWRUb3BsZXZlbFdvcmRzOiByZXNlcnZlZFRvcGxldmVsV29yZHMsXG4gICAgICAgICAgICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHM6IHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgICAgICAgICAgICAgIHN0cmluZ1R5cGVzOiBbXCJcXFwiXFxcIlwiLCBcIk4nJ1wiLCBcIicnXCIsIFwiYGBcIiwgXCJbXVwiXSxcbiAgICAgICAgICAgICAgICBvcGVuUGFyZW5zOiBbXCIoXCIsIFwiQ0FTRVwiXSxcbiAgICAgICAgICAgICAgICBjbG9zZVBhcmVuczogW1wiKVwiLCBcIkVORFwiXSxcbiAgICAgICAgICAgICAgICBpbmRleGVkUGxhY2Vob2xkZXJUeXBlczogW1wiP1wiXSxcbiAgICAgICAgICAgICAgICBuYW1lZFBsYWNlaG9sZGVyVHlwZXM6IFtcIkBcIiwgXCI6XCJdLFxuICAgICAgICAgICAgICAgIGxpbmVDb21tZW50VHlwZXM6IFtcIiNcIiwgXCItLVwiXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBfRm9ybWF0dGVyMltcImRlZmF1bHRcIl0odGhpcy5jZmcsIHRva2VuaXplcikuZm9ybWF0KHF1ZXJ5KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFN0YW5kYXJkU3FsRm9ybWF0dGVyO1xufSgpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IFN0YW5kYXJkU3FsRm9ybWF0dGVyO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCAiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfRGIyRm9ybWF0dGVyID0gcmVxdWlyZShcIi4vbGFuZ3VhZ2VzL0RiMkZvcm1hdHRlclwiKTtcblxudmFyIF9EYjJGb3JtYXR0ZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRGIyRm9ybWF0dGVyKTtcblxudmFyIF9OMXFsRm9ybWF0dGVyID0gcmVxdWlyZShcIi4vbGFuZ3VhZ2VzL04xcWxGb3JtYXR0ZXJcIik7XG5cbnZhciBfTjFxbEZvcm1hdHRlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9OMXFsRm9ybWF0dGVyKTtcblxudmFyIF9QbFNxbEZvcm1hdHRlciA9IHJlcXVpcmUoXCIuL2xhbmd1YWdlcy9QbFNxbEZvcm1hdHRlclwiKTtcblxudmFyIF9QbFNxbEZvcm1hdHRlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9QbFNxbEZvcm1hdHRlcik7XG5cbnZhciBfU3RhbmRhcmRTcWxGb3JtYXR0ZXIgPSByZXF1aXJlKFwiLi9sYW5ndWFnZXMvU3RhbmRhcmRTcWxGb3JtYXR0ZXJcIik7XG5cbnZhciBfU3RhbmRhcmRTcWxGb3JtYXR0ZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU3RhbmRhcmRTcWxGb3JtYXR0ZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB7XG4gICAgLyoqXG4gICAgICogRm9ybWF0IHdoaXRlc3BhY2VzIGluIGEgcXVlcnkgdG8gbWFrZSBpdCBlYXNpZXIgdG8gcmVhZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBxdWVyeVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmdcbiAgICAgKiAgQHBhcmFtIHtTdHJpbmd9IGNmZy5sYW5ndWFnZSBRdWVyeSBsYW5ndWFnZSwgZGVmYXVsdCBpcyBTdGFuZGFyZCBTUUxcbiAgICAgKiAgQHBhcmFtIHtTdHJpbmd9IGNmZy5pbmRlbnQgQ2hhcmFjdGVycyB1c2VkIGZvciBpbmRlbnRhdGlvbiwgZGVmYXVsdCBpcyBcIiAgXCIgKDIgc3BhY2VzKVxuICAgICAqICBAcGFyYW0ge09iamVjdH0gY2ZnLnBhcmFtcyBDb2xsZWN0aW9uIG9mIHBhcmFtcyBmb3IgcGxhY2Vob2xkZXIgcmVwbGFjZW1lbnRcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICovXG4gICAgZm9ybWF0OiBmdW5jdGlvbiBmb3JtYXQocXVlcnksIGNmZykge1xuICAgICAgICBjZmcgPSBjZmcgfHwge307XG5cbiAgICAgICAgc3dpdGNoIChjZmcubGFuZ3VhZ2UpIHtcbiAgICAgICAgICAgIGNhc2UgXCJkYjJcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IF9EYjJGb3JtYXR0ZXIyW1wiZGVmYXVsdFwiXShjZmcpLmZvcm1hdChxdWVyeSk7XG4gICAgICAgICAgICBjYXNlIFwibjFxbFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgX04xcWxGb3JtYXR0ZXIyW1wiZGVmYXVsdFwiXShjZmcpLmZvcm1hdChxdWVyeSk7XG4gICAgICAgICAgICBjYXNlIFwicGwvc3FsXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBfUGxTcWxGb3JtYXR0ZXIyW1wiZGVmYXVsdFwiXShjZmcpLmZvcm1hdChxdWVyeSk7XG4gICAgICAgICAgICBjYXNlIFwic3FsXCI6XG4gICAgICAgICAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IF9TdGFuZGFyZFNxbEZvcm1hdHRlcjJbXCJkZWZhdWx0XCJdKGNmZykuZm9ybWF0KHF1ZXJ5KTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJVbnN1cHBvcnRlZCBTUUwgZGlhbGVjdDogXCIgKyBjZmcubGFuZ3VhZ2UpO1xuICAgICAgICB9XG4gICAgfVxufTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwgIi8qKlxuICogQ29weXJpZ2h0IChjKSBNZXRhIFBsYXRmb3JtcywgSW5jLiBhbmQgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZm9ybWF0XG4gKi9cblxuLy8gVE9ETzogRml4IHRoaXMgdGhlIG5leHQgdGltZSB0aGUgZmlsZSBpcyBlZGl0ZWQuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcnVsZXNkaXIvbm8tcmVzdHJpY3RlZC1pbXBvcnRzLWNsb25lXG5pbXBvcnQge1RhYmxlUm93U29ydE9yZGVyLCBUYWJsZUhpZ2hsaWdodGVkUm93c30gZnJvbSAnZmxpcHBlcic7XG5pbXBvcnQge1ZhbHVlfSBmcm9tICcuL1R5cGVCYXNlZFZhbHVlUmVuZGVyZXInO1xuaW1wb3J0IHtNZXRob2RzLCBFdmVudHN9IGZyb20gJy4vQ2xpZW50UHJvdG9jb2wnO1xuaW1wb3J0IGRhdGVGb3JtYXQgZnJvbSAnZGF0ZWZvcm1hdCc7XG5pbXBvcnQge2NyZWF0ZVN0YXRlLCBQbHVnaW5DbGllbnR9IGZyb20gJ2ZsaXBwZXItcGx1Z2luJztcbmV4cG9ydCB7Q29tcG9uZW50fSBmcm9tICcuL0RhdGFiYXNlc1BsdWdpbic7XG5cbmNvbnN0IFBBR0VfU0laRSA9IDUwO1xuY29uc3QgRkFWT1JJVEVTX0xPQ0FMX1NUT1JBR0VfS0VZID0gJ3BsdWdpbi1kYXRhYmFzZS1mYXZvcml0ZXMtc3FsLXF1ZXJpZXMnO1xuXG50eXBlIERhdGFiYXNlc1BsdWdpblN0YXRlID0ge1xuICBzZWxlY3RlZERhdGFiYXNlOiBudW1iZXI7XG4gIHNlbGVjdGVkRGF0YWJhc2VUYWJsZTogc3RyaW5nIHwgbnVsbDtcbiAgcGFnZVJvd051bWJlcjogbnVtYmVyO1xuICBkYXRhYmFzZXM6IEFycmF5PERhdGFiYXNlRW50cnk+O1xuICBvdXRkYXRlZERhdGFiYXNlTGlzdDogYm9vbGVhbjtcbiAgdmlld01vZGU6ICdkYXRhJyB8ICdzdHJ1Y3R1cmUnIHwgJ1NRTCcgfCAndGFibGVJbmZvJyB8ICdxdWVyeUhpc3RvcnknO1xuICBlcnJvcjogbnVsbDtcbiAgY3VycmVudFBhZ2U6IFBhZ2UgfCBudWxsO1xuICBjdXJyZW50U3RydWN0dXJlOiBTdHJ1Y3R1cmUgfCBudWxsO1xuICBjdXJyZW50U29ydDogVGFibGVSb3dTb3J0T3JkZXIgfCBudWxsO1xuICBxdWVyeTogUXVlcnkgfCBudWxsO1xuICBxdWVyeVJlc3VsdDogUXVlcnlSZXN1bHQgfCBudWxsO1xuICBleGVjdXRpb25UaW1lOiBudW1iZXI7XG4gIHRhYmxlSW5mbzogc3RyaW5nO1xuICBxdWVyeUhpc3Rvcnk6IEFycmF5PFF1ZXJ5Pjtcbn07XG5cbmV4cG9ydCB0eXBlIFBhZ2UgPSB7XG4gIGRhdGFiYXNlSWQ6IG51bWJlcjtcbiAgdGFibGU6IHN0cmluZztcbiAgY29sdW1uczogQXJyYXk8c3RyaW5nPjtcbiAgcm93czogQXJyYXk8QXJyYXk8VmFsdWU+PjtcbiAgc3RhcnQ6IG51bWJlcjtcbiAgY291bnQ6IG51bWJlcjtcbiAgdG90YWw6IG51bWJlcjtcbiAgaGlnaGxpZ2h0ZWRSb3dzOiBBcnJheTxudW1iZXI+O1xufTtcblxuZXhwb3J0IHR5cGUgU3RydWN0dXJlID0ge1xuICBkYXRhYmFzZUlkOiBudW1iZXI7XG4gIHRhYmxlOiBzdHJpbmc7XG4gIGNvbHVtbnM6IEFycmF5PHN0cmluZz47XG4gIHJvd3M6IEFycmF5PEFycmF5PFZhbHVlPj47XG4gIGluZGV4ZXNDb2x1bW5zOiBBcnJheTxzdHJpbmc+O1xuICBpbmRleGVzVmFsdWVzOiBBcnJheTxBcnJheTxWYWx1ZT4+O1xufTtcblxuZXhwb3J0IHR5cGUgUXVlcnlSZXN1bHQgPSB7XG4gIHRhYmxlOiBRdWVyaWVkVGFibGUgfCBudWxsO1xuICBpZDogbnVtYmVyIHwgbnVsbDtcbiAgY291bnQ6IG51bWJlciB8IG51bGw7XG59O1xuXG5leHBvcnQgdHlwZSBRdWVyaWVkVGFibGUgPSB7XG4gIGNvbHVtbnM6IEFycmF5PHN0cmluZz47XG4gIHJvd3M6IEFycmF5PEFycmF5PFZhbHVlPj47XG4gIGhpZ2hsaWdodGVkUm93czogQXJyYXk8bnVtYmVyPjtcbn07XG5cbmV4cG9ydCB0eXBlIERhdGFiYXNlRW50cnkgPSB7XG4gIGlkOiBudW1iZXI7XG4gIG5hbWU6IHN0cmluZztcbiAgdGFibGVzOiBBcnJheTxzdHJpbmc+O1xufTtcblxuZXhwb3J0IHR5cGUgUXVlcnkgPSB7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIHRpbWU6IHN0cmluZztcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBwbHVnaW4oY2xpZW50OiBQbHVnaW5DbGllbnQ8RXZlbnRzLCBNZXRob2RzPikge1xuICBjb25zdCBwbHVnaW5TdGF0ZSA9IGNyZWF0ZVN0YXRlPERhdGFiYXNlc1BsdWdpblN0YXRlPih7XG4gICAgc2VsZWN0ZWREYXRhYmFzZTogMCxcbiAgICBzZWxlY3RlZERhdGFiYXNlVGFibGU6IG51bGwsXG4gICAgcGFnZVJvd051bWJlcjogMCxcbiAgICBkYXRhYmFzZXM6IFtdLFxuICAgIG91dGRhdGVkRGF0YWJhc2VMaXN0OiB0cnVlLFxuICAgIHZpZXdNb2RlOiAnZGF0YScsXG4gICAgZXJyb3I6IG51bGwsXG4gICAgY3VycmVudFBhZ2U6IG51bGwsXG4gICAgY3VycmVudFN0cnVjdHVyZTogbnVsbCxcbiAgICBjdXJyZW50U29ydDogbnVsbCxcbiAgICBxdWVyeTogbnVsbCxcbiAgICBxdWVyeVJlc3VsdDogbnVsbCxcbiAgICBleGVjdXRpb25UaW1lOiAwLFxuICAgIHRhYmxlSW5mbzogJycsXG4gICAgcXVlcnlIaXN0b3J5OiBbXSxcbiAgfSk7XG5cbiAgY29uc3QgZmF2b3JpdGVzU3RhdGUgPSBjcmVhdGVTdGF0ZTxzdHJpbmdbXT4oW10sIHtwZXJzaXN0OiAnZmF2b3JpdGVzJ30pO1xuICBmYXZvcml0ZXNTdGF0ZS5zdWJzY3JpYmUoKGZhdm9yaXRlcykgPT4ge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgRkFWT1JJVEVTX0xPQ0FMX1NUT1JBR0VfS0VZLFxuICAgICAgSlNPTi5zdHJpbmdpZnkoZmF2b3JpdGVzKSxcbiAgICApO1xuICB9KTtcblxuICBjb25zdCB1cGRhdGVEYXRhYmFzZXMgPSAoZXZlbnQ6IHtcbiAgICBkYXRhYmFzZXM6IEFycmF5PHtuYW1lOiBzdHJpbmc7IGlkOiBudW1iZXI7IHRhYmxlczogQXJyYXk8c3RyaW5nPn0+O1xuICB9KSA9PiB7XG4gICAgY29uc3QgdXBkYXRlcyA9IGV2ZW50LmRhdGFiYXNlcyA/PyBbXTtcbiAgICBjb25zdCBzdGF0ZSA9IHBsdWdpblN0YXRlLmdldCgpO1xuICAgIGNvbnN0IGRhdGFiYXNlcyA9IHVwZGF0ZXMuc29ydCgoZGIxLCBkYjIpID0+IGRiMS5pZCAtIGRiMi5pZCk7XG4gICAgY29uc3Qgc2VsZWN0ZWREYXRhYmFzZSA9XG4gICAgICBzdGF0ZS5zZWxlY3RlZERhdGFiYXNlIHx8XG4gICAgICAoT2JqZWN0LnZhbHVlcyhkYXRhYmFzZXMpWzBdID8gT2JqZWN0LnZhbHVlcyhkYXRhYmFzZXMpWzBdLmlkIDogMCk7XG4gICAgY29uc3Qgc2VsZWN0ZWRUYWJsZSA9XG4gICAgICBzdGF0ZS5zZWxlY3RlZERhdGFiYXNlVGFibGUgJiZcbiAgICAgIHNlbGVjdGVkRGF0YWJhc2UgPiAwICYmXG4gICAgICBkYXRhYmFzZXMubGVuZ3RoID49IHNlbGVjdGVkRGF0YWJhc2UgJiZcbiAgICAgIGRhdGFiYXNlc1tzZWxlY3RlZERhdGFiYXNlIC0gMV0udGFibGVzLmluY2x1ZGVzKFxuICAgICAgICBzdGF0ZS5zZWxlY3RlZERhdGFiYXNlVGFibGUsXG4gICAgICApXG4gICAgICAgID8gc3RhdGUuc2VsZWN0ZWREYXRhYmFzZVRhYmxlXG4gICAgICAgIDogZGF0YWJhc2VzW3NlbGVjdGVkRGF0YWJhc2UgLSAxXS50YWJsZXNbMF07XG4gICAgY29uc3Qgc2FtZVRhYmxlU2VsZWN0ZWQgPVxuICAgICAgc2VsZWN0ZWREYXRhYmFzZSA9PT0gc3RhdGUuc2VsZWN0ZWREYXRhYmFzZSAmJlxuICAgICAgc2VsZWN0ZWRUYWJsZSA9PT0gc3RhdGUuc2VsZWN0ZWREYXRhYmFzZVRhYmxlO1xuICAgIHBsdWdpblN0YXRlLnNldCh7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGRhdGFiYXNlcyxcbiAgICAgIG91dGRhdGVkRGF0YWJhc2VMaXN0OiBmYWxzZSxcbiAgICAgIHNlbGVjdGVkRGF0YWJhc2UsXG4gICAgICBzZWxlY3RlZERhdGFiYXNlVGFibGU6IHNlbGVjdGVkVGFibGUsXG4gICAgICBwYWdlUm93TnVtYmVyOiAwLFxuICAgICAgY3VycmVudFBhZ2U6IHNhbWVUYWJsZVNlbGVjdGVkID8gc3RhdGUuY3VycmVudFBhZ2UgOiBudWxsLFxuICAgICAgY3VycmVudFN0cnVjdHVyZTogbnVsbCxcbiAgICAgIGN1cnJlbnRTb3J0OiBzYW1lVGFibGVTZWxlY3RlZCA/IHN0YXRlLmN1cnJlbnRTb3J0IDogbnVsbCxcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCB1cGRhdGVTZWxlY3RlZERhdGFiYXNlID0gKGV2ZW50OiB7ZGF0YWJhc2U6IG51bWJlcn0pID0+IHtcbiAgICBjb25zdCBzdGF0ZSA9IHBsdWdpblN0YXRlLmdldCgpO1xuICAgIHBsdWdpblN0YXRlLnNldCh7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIHNlbGVjdGVkRGF0YWJhc2U6IGV2ZW50LmRhdGFiYXNlLFxuICAgICAgc2VsZWN0ZWREYXRhYmFzZVRhYmxlOlxuICAgICAgICBzdGF0ZS5kYXRhYmFzZXNbZXZlbnQuZGF0YWJhc2UgLSAxXS50YWJsZXNbMF0gfHwgbnVsbCxcbiAgICAgIHBhZ2VSb3dOdW1iZXI6IDAsXG4gICAgICBjdXJyZW50UGFnZTogbnVsbCxcbiAgICAgIGN1cnJlbnRTdHJ1Y3R1cmU6IG51bGwsXG4gICAgICBjdXJyZW50U29ydDogbnVsbCxcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCB1cGRhdGVTZWxlY3RlZERhdGFiYXNlVGFibGUgPSAoZXZlbnQ6IHt0YWJsZTogc3RyaW5nfSkgPT4ge1xuICAgIGNvbnN0IHN0YXRlID0gcGx1Z2luU3RhdGUuZ2V0KCk7XG4gICAgcGx1Z2luU3RhdGUuc2V0KHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgc2VsZWN0ZWREYXRhYmFzZVRhYmxlOiBldmVudC50YWJsZSxcbiAgICAgIHBhZ2VSb3dOdW1iZXI6IDAsXG4gICAgICBjdXJyZW50UGFnZTogbnVsbCxcbiAgICAgIGN1cnJlbnRTdHJ1Y3R1cmU6IG51bGwsXG4gICAgICBjdXJyZW50U29ydDogbnVsbCxcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCB1cGRhdGVWaWV3TW9kZSA9IChldmVudDoge1xuICAgIHZpZXdNb2RlOiAnZGF0YScgfCAnc3RydWN0dXJlJyB8ICdTUUwnIHwgJ3RhYmxlSW5mbycgfCAncXVlcnlIaXN0b3J5JztcbiAgfSkgPT4ge1xuICAgIHBsdWdpblN0YXRlLnVwZGF0ZSgoc3RhdGUpID0+IHtcbiAgICAgIHN0YXRlLnZpZXdNb2RlID0gZXZlbnQudmlld01vZGU7XG4gICAgICBzdGF0ZS5lcnJvciA9IG51bGw7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlUGFnZSA9IChldmVudDogUGFnZSkgPT4ge1xuICAgIHBsdWdpblN0YXRlLnVwZGF0ZSgoc3RhdGUpID0+IHtcbiAgICAgIHN0YXRlLmN1cnJlbnRQYWdlID0gZXZlbnQ7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlU3RydWN0dXJlID0gKGV2ZW50OiB7XG4gICAgZGF0YWJhc2VJZDogbnVtYmVyO1xuICAgIHRhYmxlOiBzdHJpbmc7XG4gICAgY29sdW1uczogQXJyYXk8c3RyaW5nPjtcbiAgICByb3dzOiBBcnJheTxBcnJheTxWYWx1ZT4+O1xuICAgIGluZGV4ZXNDb2x1bW5zOiBBcnJheTxzdHJpbmc+O1xuICAgIGluZGV4ZXNWYWx1ZXM6IEFycmF5PEFycmF5PFZhbHVlPj47XG4gIH0pID0+IHtcbiAgICBwbHVnaW5TdGF0ZS51cGRhdGUoKHN0YXRlKSA9PiB7XG4gICAgICBzdGF0ZS5jdXJyZW50U3RydWN0dXJlID0ge1xuICAgICAgICBkYXRhYmFzZUlkOiBldmVudC5kYXRhYmFzZUlkLFxuICAgICAgICB0YWJsZTogZXZlbnQudGFibGUsXG4gICAgICAgIGNvbHVtbnM6IGV2ZW50LmNvbHVtbnMsXG4gICAgICAgIHJvd3M6IGV2ZW50LnJvd3MsXG4gICAgICAgIGluZGV4ZXNDb2x1bW5zOiBldmVudC5pbmRleGVzQ29sdW1ucyxcbiAgICAgICAgaW5kZXhlc1ZhbHVlczogZXZlbnQuaW5kZXhlc1ZhbHVlcyxcbiAgICAgIH07XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheVNlbGVjdCA9IChldmVudDoge1xuICAgIGNvbHVtbnM6IEFycmF5PHN0cmluZz47XG4gICAgdmFsdWVzOiBBcnJheTxBcnJheTxWYWx1ZT4+O1xuICB9KSA9PiB7XG4gICAgcGx1Z2luU3RhdGUudXBkYXRlKChzdGF0ZSkgPT4ge1xuICAgICAgc3RhdGUucXVlcnlSZXN1bHQgPSB7XG4gICAgICAgIHRhYmxlOiB7XG4gICAgICAgICAgY29sdW1uczogZXZlbnQuY29sdW1ucyxcbiAgICAgICAgICByb3dzOiBldmVudC52YWx1ZXMsXG4gICAgICAgICAgaGlnaGxpZ2h0ZWRSb3dzOiBbXSxcbiAgICAgICAgfSxcbiAgICAgICAgaWQ6IG51bGwsXG4gICAgICAgIGNvdW50OiBudWxsLFxuICAgICAgfTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBkaXNwbGF5SW5zZXJ0ID0gKGV2ZW50OiB7aWQ6IG51bWJlcn0pID0+IHtcbiAgICBjb25zdCBzdGF0ZSA9IHBsdWdpblN0YXRlLmdldCgpO1xuICAgIHBsdWdpblN0YXRlLnNldCh7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIHF1ZXJ5UmVzdWx0OiB7XG4gICAgICAgIHRhYmxlOiBudWxsLFxuICAgICAgICBpZDogZXZlbnQuaWQsXG4gICAgICAgIGNvdW50OiBudWxsLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBkaXNwbGF5VXBkYXRlRGVsZXRlID0gKGV2ZW50OiB7Y291bnQ6IG51bWJlcn0pID0+IHtcbiAgICBwbHVnaW5TdGF0ZS51cGRhdGUoKHN0YXRlKSA9PiB7XG4gICAgICBzdGF0ZS5xdWVyeVJlc3VsdCA9IHtcbiAgICAgICAgdGFibGU6IG51bGwsXG4gICAgICAgIGlkOiBudWxsLFxuICAgICAgICBjb3VudDogZXZlbnQuY291bnQsXG4gICAgICB9O1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHVwZGF0ZVRhYmxlSW5mbyA9IChldmVudDoge3RhYmxlSW5mbzogc3RyaW5nfSkgPT4ge1xuICAgIHBsdWdpblN0YXRlLnVwZGF0ZSgoc3RhdGUpID0+IHtcbiAgICAgIHN0YXRlLnRhYmxlSW5mbyA9IGV2ZW50LnRhYmxlSW5mbztcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBuZXh0UGFnZSA9ICgpID0+IHtcbiAgICBwbHVnaW5TdGF0ZS51cGRhdGUoKHN0YXRlKSA9PiB7XG4gICAgICBzdGF0ZS5wYWdlUm93TnVtYmVyICs9IFBBR0VfU0laRTtcbiAgICAgIHN0YXRlLmN1cnJlbnRQYWdlID0gbnVsbDtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBwcmV2aW91c1BhZ2UgPSAoKSA9PiB7XG4gICAgcGx1Z2luU3RhdGUudXBkYXRlKChzdGF0ZSkgPT4ge1xuICAgICAgc3RhdGUucGFnZVJvd051bWJlciA9IE1hdGgubWF4KHN0YXRlLnBhZ2VSb3dOdW1iZXIgLSBQQUdFX1NJWkUsIDApO1xuICAgICAgc3RhdGUuY3VycmVudFBhZ2UgPSBudWxsO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGV4ZWN1dGUgPSAoZXZlbnQ6IHtxdWVyeTogc3RyaW5nfSkgPT4ge1xuICAgIGNvbnN0IHRpbWVCZWZvcmUgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IHtxdWVyeX0gPSBldmVudDtcbiAgICBjbGllbnRcbiAgICAgIC5zZW5kKCdleGVjdXRlJywge1xuICAgICAgICBkYXRhYmFzZUlkOiBwbHVnaW5TdGF0ZS5nZXQoKS5zZWxlY3RlZERhdGFiYXNlLFxuICAgICAgICB2YWx1ZTogcXVlcnksXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgcGx1Z2luU3RhdGUudXBkYXRlKChzdGF0ZSkgPT4ge1xuICAgICAgICAgIHN0YXRlLmVycm9yID0gbnVsbDtcbiAgICAgICAgICBzdGF0ZS5leGVjdXRpb25UaW1lID0gRGF0ZS5ub3coKSAtIHRpbWVCZWZvcmU7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZGF0YS50eXBlID09PSAnc2VsZWN0Jykge1xuICAgICAgICAgIGRpc3BsYXlTZWxlY3Qoe1xuICAgICAgICAgICAgY29sdW1uczogZGF0YS5jb2x1bW5zLFxuICAgICAgICAgICAgdmFsdWVzOiBkYXRhLnZhbHVlcyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLnR5cGUgPT09ICdpbnNlcnQnKSB7XG4gICAgICAgICAgZGlzcGxheUluc2VydCh7XG4gICAgICAgICAgICBpZDogZGF0YS5pbnNlcnRlZElkLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gJ3VwZGF0ZV9kZWxldGUnKSB7XG4gICAgICAgICAgZGlzcGxheVVwZGF0ZURlbGV0ZSh7XG4gICAgICAgICAgICBjb3VudDogZGF0YS5hZmZlY3RlZENvdW50LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgIHBsdWdpblN0YXRlLnVwZGF0ZSgoc3RhdGUpID0+IHtcbiAgICAgICAgICBzdGF0ZS5lcnJvciA9IGU7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgbGV0IG5ld0hpc3RvcnkgPSBwbHVnaW5TdGF0ZS5nZXQoKS5xdWVyeUhpc3Rvcnk7XG4gICAgY29uc3QgbmV3UXVlcnkgPSBwbHVnaW5TdGF0ZS5nZXQoKS5xdWVyeTtcbiAgICBpZiAoXG4gICAgICBuZXdRdWVyeSAhPT0gbnVsbCAmJlxuICAgICAgdHlwZW9mIG5ld1F1ZXJ5ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgbmV3SGlzdG9yeSAhPT0gbnVsbCAmJlxuICAgICAgdHlwZW9mIG5ld0hpc3RvcnkgIT09ICd1bmRlZmluZWQnXG4gICAgKSB7XG4gICAgICBuZXdRdWVyeS50aW1lID0gZGF0ZUZvcm1hdChuZXcgRGF0ZSgpLCAnaGg6TU06c3MnKTtcbiAgICAgIG5ld0hpc3RvcnkgPSBuZXdIaXN0b3J5LmNvbmNhdChuZXdRdWVyeSk7XG4gICAgfVxuICAgIHBsdWdpblN0YXRlLnVwZGF0ZSgoc3RhdGUpID0+IHtcbiAgICAgIHN0YXRlLnF1ZXJ5SGlzdG9yeSA9IG5ld0hpc3Rvcnk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgZ29Ub1JvdyA9IChldmVudDoge3JvdzogbnVtYmVyfSkgPT4ge1xuICAgIGNvbnN0IHN0YXRlID0gcGx1Z2luU3RhdGUuZ2V0KCk7XG4gICAgaWYgKCFzdGF0ZS5jdXJyZW50UGFnZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBkZXN0aW5hdGlvblJvdyA9XG4gICAgICBldmVudC5yb3cgPCAwXG4gICAgICAgID8gMFxuICAgICAgICA6IGV2ZW50LnJvdyA+PSBzdGF0ZS5jdXJyZW50UGFnZS50b3RhbCAtIFBBR0VfU0laRVxuICAgICAgICAgID8gTWF0aC5tYXgoc3RhdGUuY3VycmVudFBhZ2UudG90YWwgLSBQQUdFX1NJWkUsIDApXG4gICAgICAgICAgOiBldmVudC5yb3c7XG4gICAgcGx1Z2luU3RhdGUudXBkYXRlKChzdGF0ZSkgPT4ge1xuICAgICAgc3RhdGUucGFnZVJvd051bWJlciA9IGRlc3RpbmF0aW9uUm93O1xuICAgICAgc3RhdGUuY3VycmVudFBhZ2UgPSBudWxsO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHJlZnJlc2ggPSAoKSA9PiB7XG4gICAgcGx1Z2luU3RhdGUudXBkYXRlKChzdGF0ZSkgPT4ge1xuICAgICAgc3RhdGUub3V0ZGF0ZWREYXRhYmFzZUxpc3QgPSB0cnVlO1xuICAgICAgc3RhdGUuY3VycmVudFBhZ2UgPSBudWxsO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGFkZE9yUmVtb3ZlUXVlcnlUb0Zhdm9yaXRlcyA9IChxdWVyeTogc3RyaW5nKSA9PiB7XG4gICAgZmF2b3JpdGVzU3RhdGUudXBkYXRlKChmYXZvcml0ZXMpID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gZmF2b3JpdGVzLmluZGV4T2YocXVlcnkpO1xuICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICBmYXZvcml0ZXMucHVzaChxdWVyeSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmYXZvcml0ZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBzb3J0QnlDaGFuZ2VkID0gKGV2ZW50OiB7c29ydE9yZGVyOiBUYWJsZVJvd1NvcnRPcmRlcn0pID0+IHtcbiAgICBjb25zdCBzdGF0ZSA9IHBsdWdpblN0YXRlLmdldCgpO1xuICAgIHBsdWdpblN0YXRlLnNldCh7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGN1cnJlbnRTb3J0OiBldmVudC5zb3J0T3JkZXIsXG4gICAgICBwYWdlUm93TnVtYmVyOiAwLFxuICAgICAgY3VycmVudFBhZ2U6IG51bGwsXG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlUXVlcnkgPSAoZXZlbnQ6IHt2YWx1ZTogc3RyaW5nfSkgPT4ge1xuICAgIGNvbnN0IHN0YXRlID0gcGx1Z2luU3RhdGUuZ2V0KCk7XG4gICAgcGx1Z2luU3RhdGUuc2V0KHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgcXVlcnk6IHtcbiAgICAgICAgdmFsdWU6IGV2ZW50LnZhbHVlLFxuICAgICAgICB0aW1lOiBkYXRlRm9ybWF0KG5ldyBEYXRlKCksICdoaDpNTTpzcycpLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBwYWdlSGlnaGxpZ2h0ZWRSb3dzQ2hhbmdlZCA9IChldmVudDogVGFibGVIaWdobGlnaHRlZFJvd3MpID0+IHtcbiAgICBwbHVnaW5TdGF0ZS51cGRhdGUoKGRyYWZ0U3RhdGU6IERhdGFiYXNlc1BsdWdpblN0YXRlKSA9PiB7XG4gICAgICBpZiAoZHJhZnRTdGF0ZS5jdXJyZW50UGFnZSAhPT0gbnVsbCkge1xuICAgICAgICBkcmFmdFN0YXRlLmN1cnJlbnRQYWdlLmhpZ2hsaWdodGVkUm93cyA9IGV2ZW50Lm1hcChwYXJzZUludCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgcXVlcnlIaWdobGlnaHRlZFJvd3NDaGFuZ2VkID0gKGV2ZW50OiBUYWJsZUhpZ2hsaWdodGVkUm93cykgPT4ge1xuICAgIHBsdWdpblN0YXRlLnVwZGF0ZSgoc3RhdGUpID0+IHtcbiAgICAgIGlmIChzdGF0ZS5xdWVyeVJlc3VsdCkge1xuICAgICAgICBpZiAoc3RhdGUucXVlcnlSZXN1bHQudGFibGUpIHtcbiAgICAgICAgICBzdGF0ZS5xdWVyeVJlc3VsdC50YWJsZS5oaWdobGlnaHRlZFJvd3MgPSBldmVudC5tYXAocGFyc2VJbnQpO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlLnF1ZXJ5UmVzdWx0LmlkID0gbnVsbDtcbiAgICAgICAgc3RhdGUucXVlcnlSZXN1bHQuY291bnQgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIHBsdWdpblN0YXRlLnN1YnNjcmliZShcbiAgICAobmV3U3RhdGU6IERhdGFiYXNlc1BsdWdpblN0YXRlLCBwcmV2aW91c1N0YXRlOiBEYXRhYmFzZXNQbHVnaW5TdGF0ZSkgPT4ge1xuICAgICAgY29uc3QgZGF0YWJhc2VJZCA9IG5ld1N0YXRlLnNlbGVjdGVkRGF0YWJhc2U7XG4gICAgICBjb25zdCB0YWJsZSA9IG5ld1N0YXRlLnNlbGVjdGVkRGF0YWJhc2VUYWJsZTtcbiAgICAgIGlmIChcbiAgICAgICAgbmV3U3RhdGUudmlld01vZGUgPT09ICdkYXRhJyAmJlxuICAgICAgICBuZXdTdGF0ZS5jdXJyZW50UGFnZSA9PT0gbnVsbCAmJlxuICAgICAgICBkYXRhYmFzZUlkICYmXG4gICAgICAgIHRhYmxlXG4gICAgICApIHtcbiAgICAgICAgY2xpZW50XG4gICAgICAgICAgLnNlbmQoJ2dldFRhYmxlRGF0YScsIHtcbiAgICAgICAgICAgIGNvdW50OiBQQUdFX1NJWkUsXG4gICAgICAgICAgICBkYXRhYmFzZUlkOiBuZXdTdGF0ZS5zZWxlY3RlZERhdGFiYXNlLFxuICAgICAgICAgICAgb3JkZXI6IG5ld1N0YXRlLmN1cnJlbnRTb3J0Py5rZXksXG4gICAgICAgICAgICByZXZlcnNlOiAobmV3U3RhdGUuY3VycmVudFNvcnQ/LmRpcmVjdGlvbiB8fCAndXAnKSA9PT0gJ2Rvd24nLFxuICAgICAgICAgICAgdGFibGUsXG4gICAgICAgICAgICBzdGFydDogbmV3U3RhdGUucGFnZVJvd051bWJlcixcbiAgICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICB1cGRhdGVQYWdlKHtcbiAgICAgICAgICAgICAgZGF0YWJhc2VJZCxcbiAgICAgICAgICAgICAgdGFibGUsXG4gICAgICAgICAgICAgIGNvbHVtbnM6IGRhdGEuY29sdW1ucyxcbiAgICAgICAgICAgICAgcm93czogZGF0YS52YWx1ZXMsXG4gICAgICAgICAgICAgIHN0YXJ0OiBkYXRhLnN0YXJ0LFxuICAgICAgICAgICAgICBjb3VudDogZGF0YS5jb3VudCxcbiAgICAgICAgICAgICAgdG90YWw6IGRhdGEudG90YWwsXG4gICAgICAgICAgICAgIGhpZ2hsaWdodGVkUm93czogW10sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgcGx1Z2luU3RhdGUudXBkYXRlKChzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgICBzdGF0ZS5lcnJvciA9IGU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChuZXdTdGF0ZS5jdXJyZW50U3RydWN0dXJlID09PSBudWxsICYmIGRhdGFiYXNlSWQgJiYgdGFibGUpIHtcbiAgICAgICAgY2xpZW50XG4gICAgICAgICAgLnNlbmQoJ2dldFRhYmxlU3RydWN0dXJlJywge1xuICAgICAgICAgICAgZGF0YWJhc2VJZCxcbiAgICAgICAgICAgIHRhYmxlLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZVN0cnVjdHVyZSh7XG4gICAgICAgICAgICAgIGRhdGFiYXNlSWQsXG4gICAgICAgICAgICAgIHRhYmxlLFxuICAgICAgICAgICAgICBjb2x1bW5zOiBkYXRhLnN0cnVjdHVyZUNvbHVtbnMsXG4gICAgICAgICAgICAgIHJvd3M6IGRhdGEuc3RydWN0dXJlVmFsdWVzLFxuICAgICAgICAgICAgICBpbmRleGVzQ29sdW1uczogZGF0YS5pbmRleGVzQ29sdW1ucyxcbiAgICAgICAgICAgICAgaW5kZXhlc1ZhbHVlczogZGF0YS5pbmRleGVzVmFsdWVzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgIHBsdWdpblN0YXRlLnVwZGF0ZSgoc3RhdGUpID0+IHtcbiAgICAgICAgICAgICAgc3RhdGUuZXJyb3IgPSBlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIG5ld1N0YXRlLnZpZXdNb2RlID09PSAndGFibGVJbmZvJyAmJlxuICAgICAgICBuZXdTdGF0ZS5jdXJyZW50U3RydWN0dXJlID09PSBudWxsICYmXG4gICAgICAgIGRhdGFiYXNlSWQgJiZcbiAgICAgICAgdGFibGVcbiAgICAgICkge1xuICAgICAgICBjbGllbnRcbiAgICAgICAgICAuc2VuZCgnZ2V0VGFibGVJbmZvJywge1xuICAgICAgICAgICAgZGF0YWJhc2VJZCxcbiAgICAgICAgICAgIHRhYmxlLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZVRhYmxlSW5mbyh7XG4gICAgICAgICAgICAgIHRhYmxlSW5mbzogZGF0YS5kZWZpbml0aW9uLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgIHBsdWdpblN0YXRlLnVwZGF0ZSgoc3RhdGUpID0+IHtcbiAgICAgICAgICAgICAgc3RhdGUuZXJyb3IgPSBlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgIXByZXZpb3VzU3RhdGUub3V0ZGF0ZWREYXRhYmFzZUxpc3QgJiZcbiAgICAgICAgbmV3U3RhdGUub3V0ZGF0ZWREYXRhYmFzZUxpc3RcbiAgICAgICkge1xuICAgICAgICBjbGllbnRcbiAgICAgICAgICAuc2VuZCgnZGF0YWJhc2VMaXN0Jywge30pXG4gICAgICAgICAgLnRoZW4oKGRhdGFiYXNlcykgPT4ge1xuICAgICAgICAgICAgdXBkYXRlRGF0YWJhc2VzKHtcbiAgICAgICAgICAgICAgZGF0YWJhc2VzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGUpID0+IGNvbnNvbGUuZXJyb3IoJ2RhdGFiYXNlTGlzdCByZXF1ZXN0IGZhaWxlZDonLCBlKSk7XG4gICAgICB9XG4gICAgfSxcbiAgKTtcblxuICBjbGllbnQub25Db25uZWN0KCgpID0+IHtcbiAgICBjbGllbnRcbiAgICAgIC5zZW5kKCdkYXRhYmFzZUxpc3QnLCB7fSlcbiAgICAgIC50aGVuKChkYXRhYmFzZXMpID0+IHtcbiAgICAgICAgdXBkYXRlRGF0YWJhc2VzKHtcbiAgICAgICAgICBkYXRhYmFzZXMsXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZSkgPT4gY29uc29sZS5lcnJvcignaW5pdGlhbCBkYXRhYmFzZUxpc3QgcmVxdWVzdCBmYWlsZWQ6JywgZSkpO1xuICAgIGNvbnN0IGxvYWRlZEZhdm9yaXRlc0pzb24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcbiAgICAgIEZBVk9SSVRFU19MT0NBTF9TVE9SQUdFX0tFWSxcbiAgICApO1xuICAgIGlmIChsb2FkZWRGYXZvcml0ZXNKc29uKSB7XG4gICAgICB0cnkge1xuICAgICAgICBmYXZvcml0ZXNTdGF0ZS5zZXQoSlNPTi5wYXJzZShsb2FkZWRGYXZvcml0ZXNKc29uKSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGxvYWQgZmF2b3JpdGUgcXVlcmllcyBmcm9tIGxvY2FsIHN0b3JhZ2UnKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgc3RhdGU6IHBsdWdpblN0YXRlLFxuICAgIGZhdm9yaXRlc1N0YXRlLFxuICAgIHVwZGF0ZURhdGFiYXNlcyxcbiAgICB1cGRhdGVTZWxlY3RlZERhdGFiYXNlLFxuICAgIHVwZGF0ZVNlbGVjdGVkRGF0YWJhc2VUYWJsZSxcbiAgICB1cGRhdGVWaWV3TW9kZSxcbiAgICB1cGRhdGVQYWdlLFxuICAgIHVwZGF0ZVN0cnVjdHVyZSxcbiAgICBkaXNwbGF5U2VsZWN0LFxuICAgIGRpc3BsYXlJbnNlcnQsXG4gICAgZGlzcGxheVVwZGF0ZURlbGV0ZSxcbiAgICB1cGRhdGVUYWJsZUluZm8sXG4gICAgbmV4dFBhZ2UsXG4gICAgcHJldmlvdXNQYWdlLFxuICAgIGV4ZWN1dGUsXG4gICAgZ29Ub1JvdyxcbiAgICByZWZyZXNoLFxuICAgIGFkZE9yUmVtb3ZlUXVlcnlUb0Zhdm9yaXRlcyxcbiAgICBzb3J0QnlDaGFuZ2VkLFxuICAgIHVwZGF0ZVF1ZXJ5LFxuICAgIHBhZ2VIaWdobGlnaHRlZFJvd3NDaGFuZ2VkLFxuICAgIHF1ZXJ5SGlnaGxpZ2h0ZWRSb3dzQ2hhbmdlZCxcbiAgfTtcbn1cbiIsICIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZvcm1hdFxuICovXG5cbi8vIFRPRE86IEZpeCB0aGlzIHRoZSBuZXh0IHRpbWUgdGhlIGZpbGUgaXMgZWRpdGVkLlxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJ1bGVzZGlyL25vLXJlc3RyaWN0ZWQtaW1wb3J0cy1jbG9uZVxuaW1wb3J0IHtcbiAgTWFuYWdlZFRhYmxlLFxuICBUYWJsZUJvZHlDb2x1bW4sXG4gIFRhYmxlUm93cyxcbiAgVGFibGVCb2R5Um93LFxuICBUYWJsZVJvd1NvcnRPcmRlcixcbiAgVGFibGVIaWdobGlnaHRlZFJvd3MsXG59IGZyb20gJ2ZsaXBwZXInO1xuaW1wb3J0IHtcbiAgRGF0YWJhc2VFbnRyeSxcbiAgUGFnZSxcbiAgcGx1Z2luLFxuICBRdWVyeSxcbiAgUXVlcnlSZXN1bHQsXG4gIFN0cnVjdHVyZSxcbn0gZnJvbSAnLi9pbmRleCc7XG5pbXBvcnQge2dldFN0cmluZ0Zyb21FcnJvckxpa2V9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHtWYWx1ZSwgcmVuZGVyVmFsdWV9IGZyb20gJy4vVHlwZUJhc2VkVmFsdWVSZW5kZXJlcic7XG5pbXBvcnQgUmVhY3QsIHtLZXlib2FyZEV2ZW50LCBDaGFuZ2VFdmVudCwgdXNlU3RhdGUsIHVzZUNhbGxiYWNrfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQnV0dG9uTmF2aWdhdGlvbiBmcm9tICcuL0J1dHRvbk5hdmlnYXRpb24nO1xuaW1wb3J0IERhdGFiYXNlRGV0YWlsU2lkZWJhciBmcm9tICcuL0RhdGFiYXNlRGV0YWlsU2lkZWJhcic7XG5pbXBvcnQgRGF0YWJhc2VTdHJ1Y3R1cmUgZnJvbSAnLi9EYXRhYmFzZVN0cnVjdHVyZSc7XG5pbXBvcnQge1xuICBjb252ZXJ0U3RyaW5nVG9WYWx1ZSxcbiAgY29uc3RydWN0VXBkYXRlUXVlcnksXG4gIGlzVXBkYXRhYmxlLFxufSBmcm9tICcuL1VwZGF0ZVF1ZXJ5VXRpbCc7XG5pbXBvcnQgc3FsRm9ybWF0dGVyIGZyb20gJ3NxbC1mb3JtYXR0ZXInO1xuaW1wb3J0IHtcbiAgdXNlUGx1Z2luLFxuICB1c2VWYWx1ZSxcbiAgTGF5b3V0LFxuICB1c2VNZW1vaXplLFxuICBUb29sYmFyLFxuICB0aGVtZSxcbiAgc3R5bGVkLFxuICBwcm9kdWNlLFxufSBmcm9tICdmbGlwcGVyLXBsdWdpbic7XG5pbXBvcnQge1xuICBTZWxlY3QsXG4gIFJhZGlvLFxuICBSYWRpb0NoYW5nZUV2ZW50LFxuICBUeXBvZ3JhcGh5LFxuICBCdXR0b24sXG4gIE1lbnUsXG4gIERyb3Bkb3duLFxuICBJbnB1dCxcbn0gZnJvbSAnYW50ZCc7XG5pbXBvcnQge1xuICBDb25zb2xlU3FsT3V0bGluZWQsXG4gIERhdGFiYXNlT3V0bGluZWQsXG4gIERvd25PdXRsaW5lZCxcbiAgSGlzdG9yeU91dGxpbmVkLFxuICBTZXR0aW5nT3V0bGluZWQsXG4gIFN0YXJGaWxsZWQsXG4gIFN0YXJPdXRsaW5lZCxcbiAgVGFibGVPdXRsaW5lZCxcbn0gZnJvbSAnQGFudC1kZXNpZ24vaWNvbnMnO1xuXG5jb25zdCB7VGV4dEFyZWF9ID0gSW5wdXQ7XG5cbmNvbnN0IHtPcHRpb259ID0gU2VsZWN0O1xuXG5jb25zdCB7VGV4dH0gPSBUeXBvZ3JhcGh5O1xuXG5jb25zdCBCb2xkU3BhbiA9IHN0eWxlZC5zcGFuKHtcbiAgZm9udFNpemU6IDEyLFxuICBjb2xvcjogJyM5MDk0OWMnLFxuICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnLFxufSk7XG5jb25zdCBFcnJvckJhciA9IHN0eWxlZC5kaXYoe1xuICBiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmVycm9yQ29sb3IsXG4gIGNvbG9yOiB0aGVtZS50ZXh0Q29sb3JQcmltYXJ5LFxuICBsaW5lSGVpZ2h0OiAnMjZweCcsXG4gIHRleHRBbGlnbjogJ2NlbnRlcicsXG59KTtcbmNvbnN0IFBhZ2VJbmZvQ29udGFpbmVyID0gc3R5bGVkKExheW91dC5Ib3Jpem9udGFsKSh7YWxpZ25JdGVtczogJ2NlbnRlcid9KTtcblxuZnVuY3Rpb24gdHJhbnNmb3JtUm93KFxuICBjb2x1bW5zOiBBcnJheTxzdHJpbmc+LFxuICByb3c6IEFycmF5PFZhbHVlPixcbiAgaW5kZXg6IG51bWJlcixcbik6IFRhYmxlQm9keVJvdyB7XG4gIGNvbnN0IHRyYW5zZm9ybWVkQ29sdW1uczoge1trZXk6IHN0cmluZ106IFRhYmxlQm9keUNvbHVtbn0gPSB7fTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2x1bW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgdHJhbnNmb3JtZWRDb2x1bW5zW2NvbHVtbnNbaV1dID0ge3ZhbHVlOiByZW5kZXJWYWx1ZShyb3dbaV0sIHRydWUpfTtcbiAgfVxuICByZXR1cm4ge2tleTogU3RyaW5nKGluZGV4KSwgY29sdW1uczogdHJhbnNmb3JtZWRDb2x1bW5zfTtcbn1cblxuY29uc3QgUXVlcnlIaXN0b3J5ID0gUmVhY3QubWVtbygoe2hpc3Rvcnl9OiB7aGlzdG9yeTogQXJyYXk8UXVlcnk+fSkgPT4ge1xuICBpZiAoIWhpc3RvcnkgfHwgdHlwZW9mIGhpc3RvcnkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgY29uc3QgY29sdW1ucyA9IHtcbiAgICB0aW1lOiB7XG4gICAgICB2YWx1ZTogJ1RpbWUnLFxuICAgICAgcmVzaXphYmxlOiB0cnVlLFxuICAgIH0sXG4gICAgcXVlcnk6IHtcbiAgICAgIHZhbHVlOiAnUXVlcnknLFxuICAgICAgcmVzaXphYmxlOiB0cnVlLFxuICAgIH0sXG4gIH07XG4gIGNvbnN0IHJvd3M6IFRhYmxlUm93cyA9IFtdO1xuICBpZiAoaGlzdG9yeS5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoaXN0b3J5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBxdWVyeSA9IGhpc3RvcnlbaV07XG4gICAgICBjb25zdCB0aW1lID0gcXVlcnkudGltZTtcbiAgICAgIGNvbnN0IHZhbHVlID0gcXVlcnkudmFsdWU7XG4gICAgICByb3dzLnB1c2goe1xuICAgICAgICBrZXk6IGAke2l9YCxcbiAgICAgICAgY29sdW1uczoge3RpbWU6IHt2YWx1ZTogdGltZX0sIHF1ZXJ5OiB7dmFsdWV9fSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPExheW91dC5Ib3Jpem9udGFsIGdyb3c+XG4gICAgICA8TWFuYWdlZFRhYmxlXG4gICAgICAgIGZsb2F0aW5nPXtmYWxzZX1cbiAgICAgICAgY29sdW1ucz17Y29sdW1uc31cbiAgICAgICAgY29sdW1uU2l6ZXM9e3t0aW1lOiA3NX19XG4gICAgICAgIHplYnJhXG4gICAgICAgIHJvd3M9e3Jvd3N9XG4gICAgICAgIGhvcml6b250YWxseVNjcm9sbGFibGVcbiAgICAgIC8+XG4gICAgPC9MYXlvdXQuSG9yaXpvbnRhbD5cbiAgKTtcbn0pO1xuXG50eXBlIFBhZ2VJbmZvUHJvcHMgPSB7XG4gIGN1cnJlbnRSb3c6IG51bWJlcjtcbiAgY291bnQ6IG51bWJlcjtcbiAgdG90YWxSb3dzOiBudW1iZXI7XG4gIG9uQ2hhbmdlOiAoY3VycmVudFJvdzogbnVtYmVyLCBjb3VudDogbnVtYmVyKSA9PiB2b2lkO1xufTtcblxuY29uc3QgUGFnZUluZm8gPSBSZWFjdC5tZW1vKChwcm9wczogUGFnZUluZm9Qcm9wcykgPT4ge1xuICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IHVzZVN0YXRlKHtcbiAgICBpc09wZW46IGZhbHNlLFxuICAgIGlucHV0VmFsdWU6IFN0cmluZyhwcm9wcy5jdXJyZW50Um93KSxcbiAgfSk7XG5cbiAgY29uc3Qgb25PcGVuID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldFN0YXRlKHsuLi5zdGF0ZSwgaXNPcGVuOiB0cnVlfSk7XG4gIH0sIFtzdGF0ZV0pO1xuXG4gIGNvbnN0IG9uSW5wdXRDaGFuZ2VkID0gdXNlQ2FsbGJhY2soXG4gICAgKGU6IENoYW5nZUV2ZW50PGFueT4pID0+IHtcbiAgICAgIHNldFN0YXRlKHsuLi5zdGF0ZSwgaW5wdXRWYWx1ZTogZS50YXJnZXQudmFsdWV9KTtcbiAgICB9LFxuICAgIFtzdGF0ZV0sXG4gICk7XG5cbiAgY29uc3Qgb25TdWJtaXQgPSB1c2VDYWxsYmFjayhcbiAgICAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgIGNvbnN0IHJvd051bWJlciA9IHBhcnNlSW50KHN0YXRlLmlucHV0VmFsdWUsIDEwKTtcbiAgICAgICAgcHJvcHMub25DaGFuZ2Uocm93TnVtYmVyIC0gMSwgcHJvcHMuY291bnQpO1xuICAgICAgICBzZXRTdGF0ZSh7Li4uc3RhdGUsIGlzT3BlbjogZmFsc2V9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtwcm9wcywgc3RhdGVdLFxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPFBhZ2VJbmZvQ29udGFpbmVyIGdyb3c+XG4gICAgICA8ZGl2IHN0eWxlPXt7ZmxleDogMX19IC8+XG4gICAgICA8VGV4dD5cbiAgICAgICAge3Byb3BzLmNvdW50ID09PSBwcm9wcy50b3RhbFJvd3NcbiAgICAgICAgICA/IGAke3Byb3BzLmNvdW50fSBgXG4gICAgICAgICAgOiBgJHtwcm9wcy5jdXJyZW50Um93ICsgMX0tJHtwcm9wcy5jdXJyZW50Um93ICsgcHJvcHMuY291bnR9IGB9XG4gICAgICAgIG9mIHtwcm9wcy50b3RhbFJvd3N9IHJvd3NcbiAgICAgIDwvVGV4dD5cbiAgICAgIDxkaXYgc3R5bGU9e3tmbGV4OiAxfX0gLz5cbiAgICAgIHtzdGF0ZS5pc09wZW4gPyAoXG4gICAgICAgIDxJbnB1dFxuICAgICAgICAgIHRhYkluZGV4PXstMX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj17KHByb3BzLmN1cnJlbnRSb3cgKyAxKS50b1N0cmluZygpfVxuICAgICAgICAgIG9uQ2hhbmdlPXtvbklucHV0Q2hhbmdlZH1cbiAgICAgICAgICBvbktleURvd249e29uU3VibWl0fVxuICAgICAgICAvPlxuICAgICAgKSA6IChcbiAgICAgICAgPEJ1dHRvbiBzdHlsZT17e3RleHRBbGlnbjogJ2NlbnRlcid9fSBvbkNsaWNrPXtvbk9wZW59PlxuICAgICAgICAgIEdvIFRvIFJvd1xuICAgICAgICA8L0J1dHRvbj5cbiAgICAgICl9XG4gICAgPC9QYWdlSW5mb0NvbnRhaW5lcj5cbiAgKTtcbn0pO1xuXG5jb25zdCBEYXRhVGFibGUgPSBSZWFjdC5tZW1vKFxuICAoe1xuICAgIHBhZ2UsXG4gICAgaGlnaGxpZ2h0ZWRSb3dzQ2hhbmdlZCxcbiAgICBzb3J0T3JkZXJDaGFuZ2VkLFxuICAgIGN1cnJlbnRTb3J0LFxuICAgIGN1cnJlbnRTdHJ1Y3R1cmUsXG4gICAgb25Sb3dFZGl0ZWQsXG4gIH06IHtcbiAgICBwYWdlOiBQYWdlIHwgbnVsbDtcbiAgICBoaWdobGlnaHRlZFJvd3NDaGFuZ2VkOiAoaGlnaGxpZ2h0ZWRSb3dzOiBUYWJsZUhpZ2hsaWdodGVkUm93cykgPT4gdm9pZDtcbiAgICBzb3J0T3JkZXJDaGFuZ2VkOiAoc29ydE9yZGVyOiBUYWJsZVJvd1NvcnRPcmRlcikgPT4gdm9pZDtcbiAgICBjdXJyZW50U29ydDogVGFibGVSb3dTb3J0T3JkZXIgfCBudWxsO1xuICAgIGN1cnJlbnRTdHJ1Y3R1cmU6IFN0cnVjdHVyZSB8IG51bGw7XG4gICAgb25Sb3dFZGl0ZWQ6IChjaGFuZ2VzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVsbH0pID0+IHZvaWQ7XG4gIH0pID0+XG4gICAgcGFnZSAmJiBwYWdlLmNvbHVtbnMgPyAoXG4gICAgICA8TGF5b3V0Lkhvcml6b250YWwgZ3Jvdz5cbiAgICAgICAgPE1hbmFnZWRUYWJsZVxuICAgICAgICAgIHRhYmxlS2V5PXtgZGF0YWJhc2VzLSR7cGFnZS5kYXRhYmFzZUlkfS0ke3BhZ2UudGFibGV9YH1cbiAgICAgICAgICBmbG9hdGluZz17ZmFsc2V9XG4gICAgICAgICAgY29sdW1uT3JkZXI9e3BhZ2UuY29sdW1ucy5tYXAoKG5hbWUpID0+ICh7XG4gICAgICAgICAgICBrZXk6IG5hbWUsXG4gICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgIH0pKX1cbiAgICAgICAgICBjb2x1bW5zPXtwYWdlLmNvbHVtbnMucmVkdWNlKFxuICAgICAgICAgICAgKGFjYywgdmFsKSA9PlxuICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHt9LCBhY2MsIHtcbiAgICAgICAgICAgICAgICBbdmFsXToge3ZhbHVlOiB2YWwsIHJlc2l6YWJsZTogdHJ1ZSwgc29ydGFibGU6IHRydWV9LFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHt9LFxuICAgICAgICAgICl9XG4gICAgICAgICAgemVicmFcbiAgICAgICAgICByb3dzPXtwYWdlLnJvd3MubWFwKChyb3c6IEFycmF5PFZhbHVlPiwgaW5kZXg6IG51bWJlcikgPT5cbiAgICAgICAgICAgIHRyYW5zZm9ybVJvdyhwYWdlLmNvbHVtbnMsIHJvdywgaW5kZXgpLFxuICAgICAgICAgICl9XG4gICAgICAgICAgaG9yaXpvbnRhbGx5U2Nyb2xsYWJsZVxuICAgICAgICAgIG11bHRpSGlnaGxpZ2h0XG4gICAgICAgICAgb25Sb3dIaWdobGlnaHRlZD17aGlnaGxpZ2h0ZWRSb3dzQ2hhbmdlZH1cbiAgICAgICAgICBvblNvcnQ9e3NvcnRPcmRlckNoYW5nZWR9XG4gICAgICAgICAgaW5pdGlhbFNvcnRPcmRlcj17Y3VycmVudFNvcnQgPz8gdW5kZWZpbmVkfVxuICAgICAgICAvPlxuICAgICAgICB7cGFnZS5oaWdobGlnaHRlZFJvd3MubGVuZ3RoID09PSAxICYmIChcbiAgICAgICAgICA8RGF0YWJhc2VEZXRhaWxTaWRlYmFyXG4gICAgICAgICAgICBjb2x1bW5MYWJlbHM9e3BhZ2UuY29sdW1uc31cbiAgICAgICAgICAgIGNvbHVtblZhbHVlcz17cGFnZS5yb3dzW3BhZ2UuaGlnaGxpZ2h0ZWRSb3dzWzBdXX1cbiAgICAgICAgICAgIG9uU2F2ZT17XG4gICAgICAgICAgICAgIGN1cnJlbnRTdHJ1Y3R1cmUgJiZcbiAgICAgICAgICAgICAgaXNVcGRhdGFibGUoY3VycmVudFN0cnVjdHVyZS5jb2x1bW5zLCBjdXJyZW50U3RydWN0dXJlLnJvd3MpXG4gICAgICAgICAgICAgICAgPyBvblJvd0VkaXRlZFxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgIDwvTGF5b3V0Lkhvcml6b250YWw+XG4gICAgKSA6IG51bGwsXG4pO1xuXG5jb25zdCBRdWVyeVRhYmxlID0gUmVhY3QubWVtbyhcbiAgKHtcbiAgICBxdWVyeSxcbiAgICBoaWdobGlnaHRlZFJvd3NDaGFuZ2VkLFxuICB9OiB7XG4gICAgcXVlcnk6IFF1ZXJ5UmVzdWx0IHwgbnVsbDtcbiAgICBoaWdobGlnaHRlZFJvd3NDaGFuZ2VkOiAoaGlnaGxpZ2h0ZWRSb3dzOiBUYWJsZUhpZ2hsaWdodGVkUm93cykgPT4gdm9pZDtcbiAgfSkgPT4ge1xuICAgIGlmICghcXVlcnkgfHwgcXVlcnkgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBxdWVyeS50YWJsZSAmJlxuICAgICAgdHlwZW9mIHF1ZXJ5LnRhYmxlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgcXVlcnkudGFibGUgIT09IG51bGxcbiAgICApIHtcbiAgICAgIGNvbnN0IHRhYmxlID0gcXVlcnkudGFibGU7XG4gICAgICBjb25zdCBjb2x1bW5zID0gdGFibGUuY29sdW1ucztcbiAgICAgIGNvbnN0IHJvd3MgPSB0YWJsZS5yb3dzO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPExheW91dC5Db250YWluZXIgZ3Jvdz5cbiAgICAgICAgICA8TWFuYWdlZFRhYmxlXG4gICAgICAgICAgICBmbG9hdGluZz17ZmFsc2V9XG4gICAgICAgICAgICBtdWx0aWxpbmVcbiAgICAgICAgICAgIGNvbHVtbk9yZGVyPXtjb2x1bW5zLm1hcCgobmFtZSkgPT4gKHtcbiAgICAgICAgICAgICAga2V5OiBuYW1lLFxuICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSkpfVxuICAgICAgICAgICAgY29sdW1ucz17Y29sdW1ucy5yZWR1Y2UoXG4gICAgICAgICAgICAgIChhY2MsIHZhbCkgPT5cbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHt9LCBhY2MsIHtbdmFsXToge3ZhbHVlOiB2YWwsIHJlc2l6YWJsZTogdHJ1ZX19KSxcbiAgICAgICAgICAgICAge30sXG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgemVicmFcbiAgICAgICAgICAgIHJvd3M9e3Jvd3MubWFwKChyb3c6IEFycmF5PFZhbHVlPiwgaW5kZXg6IG51bWJlcikgPT5cbiAgICAgICAgICAgICAgdHJhbnNmb3JtUm93KGNvbHVtbnMsIHJvdywgaW5kZXgpLFxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIGhvcml6b250YWxseVNjcm9sbGFibGVcbiAgICAgICAgICAgIG9uUm93SGlnaGxpZ2h0ZWQ9e2hpZ2hsaWdodGVkUm93c0NoYW5nZWR9XG4gICAgICAgICAgLz5cbiAgICAgICAgICB7dGFibGUuaGlnaGxpZ2h0ZWRSb3dzLmxlbmd0aCA9PT0gMSAmJiAoXG4gICAgICAgICAgICA8RGF0YWJhc2VEZXRhaWxTaWRlYmFyXG4gICAgICAgICAgICAgIGNvbHVtbkxhYmVscz17dGFibGUuY29sdW1uc31cbiAgICAgICAgICAgICAgY29sdW1uVmFsdWVzPXt0YWJsZS5yb3dzW3RhYmxlLmhpZ2hsaWdodGVkUm93c1swXV19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvTGF5b3V0LkNvbnRhaW5lcj5cbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChxdWVyeS5pZCAmJiBxdWVyeS5pZCAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPExheW91dC5Ib3Jpem9udGFsIGdyb3cgcGFkPlxuICAgICAgICAgIDxUZXh0PlJvdyBpZDoge3F1ZXJ5LmlkfTwvVGV4dD5cbiAgICAgICAgPC9MYXlvdXQuSG9yaXpvbnRhbD5cbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChxdWVyeS5jb3VudCAmJiBxdWVyeS5jb3VudCAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPExheW91dC5Ib3Jpem9udGFsIGdyb3cgcGFkPlxuICAgICAgICAgIDxUZXh0PlJvd3MgYWZmZWN0ZWQ6IHtxdWVyeS5jb3VudH08L1RleHQ+XG4gICAgICAgIDwvTGF5b3V0Lkhvcml6b250YWw+XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH0sXG4pO1xuXG5jb25zdCBGYXZvcml0ZXNNZW51ID0gUmVhY3QubWVtbyhcbiAgKHtcbiAgICBmYXZvcml0ZXMsXG4gICAgb25DbGljayxcbiAgfToge1xuICAgIGZhdm9yaXRlczogc3RyaW5nW107XG4gICAgb25DbGljazogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIH0pID0+IHtcbiAgICBjb25zdCBvbk1lbnVDbGljayA9IHVzZUNhbGxiYWNrKFxuICAgICAgKHA6IGFueSkgPT4gb25DbGljayhwLmtleSBhcyBzdHJpbmcpLFxuICAgICAgW29uQ2xpY2tdLFxuICAgICk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxNZW51PlxuICAgICAgICB7ZmF2b3JpdGVzLm1hcCgocSkgPT4gKFxuICAgICAgICAgIDxNZW51Lkl0ZW0ga2V5PXtxfSBvbkNsaWNrPXtvbk1lbnVDbGlja30+XG4gICAgICAgICAgICB7cX1cbiAgICAgICAgICA8L01lbnUuSXRlbT5cbiAgICAgICAgKSl9XG4gICAgICA8L01lbnU+XG4gICAgKTtcbiAgfSxcbik7XG5cbmV4cG9ydCBmdW5jdGlvbiBDb21wb25lbnQoKSB7XG4gIGNvbnN0IGluc3RhbmNlID0gdXNlUGx1Z2luKHBsdWdpbik7XG4gIGNvbnN0IHN0YXRlID0gdXNlVmFsdWUoaW5zdGFuY2Uuc3RhdGUpO1xuICBjb25zdCBmYXZvcml0ZXMgPSB1c2VWYWx1ZShpbnN0YW5jZS5mYXZvcml0ZXNTdGF0ZSk7XG5cbiAgY29uc3Qgb25WaWV3TW9kZUNoYW5nZWQgPSB1c2VDYWxsYmFjayhcbiAgICAoZXZ0OiBSYWRpb0NoYW5nZUV2ZW50KSA9PiB7XG4gICAgICBpbnN0YW5jZS51cGRhdGVWaWV3TW9kZSh7dmlld01vZGU6IGV2dC50YXJnZXQudmFsdWUgPz8gJ2RhdGEnfSk7XG4gICAgfSxcbiAgICBbaW5zdGFuY2VdLFxuICApO1xuXG4gIGNvbnN0IG9uRGF0YUNsaWNrZWQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaW5zdGFuY2UudXBkYXRlVmlld01vZGUoe3ZpZXdNb2RlOiAnZGF0YSd9KTtcbiAgfSwgW2luc3RhbmNlXSk7XG5cbiAgY29uc3Qgb25TdHJ1Y3R1cmVDbGlja2VkID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGluc3RhbmNlLnVwZGF0ZVZpZXdNb2RlKHt2aWV3TW9kZTogJ3N0cnVjdHVyZSd9KTtcbiAgfSwgW2luc3RhbmNlXSk7XG5cbiAgY29uc3Qgb25TUUxDbGlja2VkID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGluc3RhbmNlLnVwZGF0ZVZpZXdNb2RlKHt2aWV3TW9kZTogJ1NRTCd9KTtcbiAgfSwgW2luc3RhbmNlXSk7XG5cbiAgY29uc3Qgb25UYWJsZUluZm9DbGlja2VkID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGluc3RhbmNlLnVwZGF0ZVZpZXdNb2RlKHt2aWV3TW9kZTogJ3RhYmxlSW5mbyd9KTtcbiAgfSwgW2luc3RhbmNlXSk7XG5cbiAgY29uc3Qgb25RdWVyeUhpc3RvcnlDbGlja2VkID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGluc3RhbmNlLnVwZGF0ZVZpZXdNb2RlKHt2aWV3TW9kZTogJ3F1ZXJ5SGlzdG9yeSd9KTtcbiAgfSwgW2luc3RhbmNlXSk7XG5cbiAgY29uc3Qgb25SZWZyZXNoQ2xpY2tlZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpbnN0YW5jZS5zdGF0ZS51cGRhdGUoKHN0YXRlKSA9PiB7XG4gICAgICBzdGF0ZS5lcnJvciA9IG51bGw7XG4gICAgfSk7XG4gICAgaW5zdGFuY2UucmVmcmVzaCgpO1xuICB9LCBbaW5zdGFuY2VdKTtcblxuICBjb25zdCBvbkZhdm9yaXRlQnV0dG9uQ2xpY2tlZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoc3RhdGUucXVlcnkpIHtcbiAgICAgIGluc3RhbmNlLmFkZE9yUmVtb3ZlUXVlcnlUb0Zhdm9yaXRlcyhzdGF0ZS5xdWVyeS52YWx1ZSk7XG4gICAgfVxuICB9LCBbaW5zdGFuY2UsIHN0YXRlLnF1ZXJ5XSk7XG5cbiAgY29uc3Qgb25EYXRhYmFzZVNlbGVjdGVkID0gdXNlQ2FsbGJhY2soXG4gICAgKHNlbGVjdGVkOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGRiSWQgPVxuICAgICAgICBpbnN0YW5jZS5zdGF0ZS5nZXQoKS5kYXRhYmFzZXMuZmluZCgoeCkgPT4geC5uYW1lID09PSBzZWxlY3RlZCk/LmlkIHx8XG4gICAgICAgIDA7XG4gICAgICBpbnN0YW5jZS51cGRhdGVTZWxlY3RlZERhdGFiYXNlKHtcbiAgICAgICAgZGF0YWJhc2U6IGRiSWQsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtpbnN0YW5jZV0sXG4gICk7XG5cbiAgY29uc3Qgb25EYXRhYmFzZVRhYmxlU2VsZWN0ZWQgPSB1c2VDYWxsYmFjayhcbiAgICAoc2VsZWN0ZWQ6IHN0cmluZykgPT4ge1xuICAgICAgaW5zdGFuY2UudXBkYXRlU2VsZWN0ZWREYXRhYmFzZVRhYmxlKHtcbiAgICAgICAgdGFibGU6IHNlbGVjdGVkLFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBbaW5zdGFuY2VdLFxuICApO1xuXG4gIGNvbnN0IG9uTmV4dFBhZ2VDbGlja2VkID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGluc3RhbmNlLm5leHRQYWdlKCk7XG4gIH0sIFtpbnN0YW5jZV0pO1xuXG4gIGNvbnN0IG9uUHJldmlvdXNQYWdlQ2xpY2tlZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpbnN0YW5jZS5wcmV2aW91c1BhZ2UoKTtcbiAgfSwgW2luc3RhbmNlXSk7XG5cbiAgY29uc3Qgb25FeGVjdXRlQ2xpY2tlZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBxdWVyeSA9IGluc3RhbmNlLnN0YXRlLmdldCgpLnF1ZXJ5O1xuICAgIGlmIChxdWVyeSkge1xuICAgICAgaW5zdGFuY2UuZXhlY3V0ZSh7cXVlcnk6IHF1ZXJ5LnZhbHVlfSk7XG4gICAgfVxuICB9LCBbaW5zdGFuY2VdKTtcblxuICBjb25zdCBvblF1ZXJ5VGV4dGFyZWFLZXlQcmVzcyA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgLy8gSW1wbGVtZW50IGN0cmwrZW50ZXIgYXMgYSBzaG9ydGN1dCBmb3IgY2xpY2tpbmcgJ0V4ZWN1dGUnLlxuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ1xcbicgJiYgZXZlbnQuY3RybEtleSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgb25FeGVjdXRlQ2xpY2tlZCgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW29uRXhlY3V0ZUNsaWNrZWRdLFxuICApO1xuXG4gIGNvbnN0IG9uR29Ub1JvdyA9IHVzZUNhbGxiYWNrKFxuICAgIChyb3c6IG51bWJlciwgX2NvdW50OiBudW1iZXIpID0+IHtcbiAgICAgIGluc3RhbmNlLmdvVG9Sb3coe3Jvd30pO1xuICAgIH0sXG4gICAgW2luc3RhbmNlXSxcbiAgKTtcblxuICBjb25zdCBvblF1ZXJ5Q2hhbmdlZCA9IHVzZUNhbGxiYWNrKFxuICAgIChzZWxlY3RlZDogYW55KSA9PiB7XG4gICAgICBpbnN0YW5jZS51cGRhdGVRdWVyeSh7XG4gICAgICAgIHZhbHVlOiBzZWxlY3RlZC50YXJnZXQudmFsdWUsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtpbnN0YW5jZV0sXG4gICk7XG5cbiAgY29uc3Qgb25GYXZvcml0ZVF1ZXJ5U2VsZWN0ZWQgPSB1c2VDYWxsYmFjayhcbiAgICAocXVlcnk6IHN0cmluZykgPT4ge1xuICAgICAgaW5zdGFuY2UudXBkYXRlUXVlcnkoe1xuICAgICAgICB2YWx1ZTogcXVlcnksXG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtpbnN0YW5jZV0sXG4gICk7XG5cbiAgY29uc3QgcGFnZUhpZ2hsaWdodGVkUm93c0NoYW5nZWQgPSB1c2VDYWxsYmFjayhcbiAgICAocm93czogVGFibGVIaWdobGlnaHRlZFJvd3MpID0+IHtcbiAgICAgIGluc3RhbmNlLnBhZ2VIaWdobGlnaHRlZFJvd3NDaGFuZ2VkKHJvd3MpO1xuICAgIH0sXG4gICAgW2luc3RhbmNlXSxcbiAgKTtcblxuICBjb25zdCBxdWVyeUhpZ2hsaWdodGVkUm93c0NoYW5nZWQgPSB1c2VDYWxsYmFjayhcbiAgICAocm93czogVGFibGVIaWdobGlnaHRlZFJvd3MpID0+IHtcbiAgICAgIGluc3RhbmNlLnF1ZXJ5SGlnaGxpZ2h0ZWRSb3dzQ2hhbmdlZChyb3dzKTtcbiAgICB9LFxuICAgIFtpbnN0YW5jZV0sXG4gICk7XG5cbiAgY29uc3Qgc29ydE9yZGVyQ2hhbmdlZCA9IHVzZUNhbGxiYWNrKFxuICAgIChzb3J0T3JkZXI6IFRhYmxlUm93U29ydE9yZGVyKSA9PiB7XG4gICAgICBpbnN0YW5jZS5zb3J0QnlDaGFuZ2VkKHtzb3J0T3JkZXJ9KTtcbiAgICB9LFxuICAgIFtpbnN0YW5jZV0sXG4gICk7XG5cbiAgY29uc3Qgb25Sb3dFZGl0ZWQgPSB1c2VDYWxsYmFjayhcbiAgICAoY2hhbmdlOiB7W2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVsbH0pID0+IHtcbiAgICAgIGNvbnN0IHtzZWxlY3RlZERhdGFiYXNlVGFibGUsIGN1cnJlbnRTdHJ1Y3R1cmUsIHZpZXdNb2RlLCBjdXJyZW50UGFnZX0gPVxuICAgICAgICBpbnN0YW5jZS5zdGF0ZS5nZXQoKTtcbiAgICAgIGNvbnN0IGhpZ2hsaWdodGVkUm93SWR4ID0gY3VycmVudFBhZ2U/LmhpZ2hsaWdodGVkUm93c1swXSA/PyAtMTtcbiAgICAgIGNvbnN0IHJvdyA9XG4gICAgICAgIGhpZ2hsaWdodGVkUm93SWR4ID49IDBcbiAgICAgICAgICA/IGN1cnJlbnRQYWdlPy5yb3dzW2N1cnJlbnRQYWdlPy5oaWdobGlnaHRlZFJvd3NbMF1dXG4gICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICBjb25zdCBjb2x1bW5zID0gY3VycmVudFBhZ2U/LmNvbHVtbnM7XG4gICAgICAvLyBjdXJyZW50bHkgb25seSBhbGxvdyB0byBlZGl0IGRhdGEgc2hvd24gaW4gRGF0YSB0YWJcbiAgICAgIGlmIChcbiAgICAgICAgdmlld01vZGUgIT09ICdkYXRhJyB8fFxuICAgICAgICBzZWxlY3RlZERhdGFiYXNlVGFibGUgPT09IG51bGwgfHxcbiAgICAgICAgY3VycmVudFN0cnVjdHVyZSA9PT0gbnVsbCB8fFxuICAgICAgICBjdXJyZW50UGFnZSA9PT0gbnVsbCB8fFxuICAgICAgICByb3cgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICBjb2x1bW5zID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgLy8gb25seSB0cmlnZ2VyIHdoZW4gdGhlcmUgaXMgY2hhbmdlXG4gICAgICAgIE9iamVjdC5rZXlzKGNoYW5nZSkubGVuZ3RoIDw9IDBcbiAgICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBjaGVjayBpZiB0aGUgdGFibGUgaGFzIHByaW1hcnkga2V5IHRvIHVzZSBmb3IgcXVlcnlcbiAgICAgIC8vIFRoaXMgaXMgYXNzdW1lZCBkYXRhIGFyZSBpbiB0aGUgc2FtZSBmb3JtYXQgYXMgaW4gU3FsaXRlRGF0YWJhc2VEcml2ZXIuamF2YVxuICAgICAgY29uc3QgcHJpbWFyeUtleUlkeCA9IGN1cnJlbnRTdHJ1Y3R1cmUuY29sdW1ucy5pbmRleE9mKCdwcmltYXJ5X2tleScpO1xuICAgICAgY29uc3QgbmFtZUtleUlkeCA9IGN1cnJlbnRTdHJ1Y3R1cmUuY29sdW1ucy5pbmRleE9mKCdjb2x1bW5fbmFtZScpO1xuICAgICAgY29uc3QgdHlwZUlkeCA9IGN1cnJlbnRTdHJ1Y3R1cmUuY29sdW1ucy5pbmRleE9mKCdkYXRhX3R5cGUnKTtcbiAgICAgIGNvbnN0IG51bGxhYmxlSWR4ID0gY3VycmVudFN0cnVjdHVyZS5jb2x1bW5zLmluZGV4T2YoJ251bGxhYmxlJyk7XG4gICAgICBpZiAocHJpbWFyeUtleUlkeCA8IDAgJiYgbmFtZUtleUlkeCA8IDAgJiYgdHlwZUlkeCA8IDApIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAncHJpbWFyeV9rZXksIGNvbHVtbl9uYW1lLCBhbmQvb3IgZGF0YV90eXBlIGNhbm5vdCBiZSBlbXB0eScsXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHByaW1hcnlDb2x1bW5JbmRleGVzID0gY3VycmVudFN0cnVjdHVyZS5yb3dzXG4gICAgICAgIC5yZWR1Y2UoKGFjYywgcm93KSA9PiB7XG4gICAgICAgICAgY29uc3QgcHJpbWFyeSA9IHJvd1twcmltYXJ5S2V5SWR4XTtcbiAgICAgICAgICBpZiAocHJpbWFyeS50eXBlID09PSAnYm9vbGVhbicgJiYgcHJpbWFyeS52YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHJvd1tuYW1lS2V5SWR4XTtcbiAgICAgICAgICAgIHJldHVybiBuYW1lLnR5cGUgPT09ICdzdHJpbmcnID8gYWNjLmNvbmNhdChuYW1lLnZhbHVlKSA6IGFjYztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICB9XG4gICAgICAgIH0sIFtdIGFzIEFycmF5PHN0cmluZz4pXG4gICAgICAgIC5tYXAoKG5hbWUpID0+IGNvbHVtbnMuaW5kZXhPZihuYW1lKSlcbiAgICAgICAgLmZpbHRlcigoaWR4KSA9PiBpZHggPj0gMCk7XG4gICAgICAvLyBzdG9wIGlmIG5vIHByaW1hcnkga2V5IHRvIGRpc3Rpbmd1aXNoIHVuaXF1ZSBxdWVyeVxuICAgICAgaWYgKHByaW1hcnlDb2x1bW5JbmRleGVzLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdHlwZXMgPSBjdXJyZW50U3RydWN0dXJlLnJvd3MucmVkdWNlKFxuICAgICAgICAoYWNjLCByb3cpID0+IHtcbiAgICAgICAgICBjb25zdCBuYW1lVmFsdWUgPSByb3dbbmFtZUtleUlkeF07XG4gICAgICAgICAgY29uc3QgbmFtZSA9IG5hbWVWYWx1ZS50eXBlID09PSAnc3RyaW5nJyA/IG5hbWVWYWx1ZS52YWx1ZSA6IG51bGw7XG4gICAgICAgICAgY29uc3QgdHlwZVZhbHVlID0gcm93W3R5cGVJZHhdO1xuICAgICAgICAgIGNvbnN0IHR5cGUgPSB0eXBlVmFsdWUudHlwZSA9PT0gJ3N0cmluZycgPyB0eXBlVmFsdWUudmFsdWUgOiBudWxsO1xuICAgICAgICAgIGNvbnN0IG51bGxhYmxlVmFsdWUgPVxuICAgICAgICAgICAgbnVsbGFibGVJZHggPCAwID8ge3R5cGU6ICdudWxsJywgdmFsdWU6IG51bGx9IDogcm93W251bGxhYmxlSWR4XTtcbiAgICAgICAgICBjb25zdCBudWxsYWJsZSA9IG51bGxhYmxlVmFsdWUudmFsdWUgIT09IGZhbHNlO1xuICAgICAgICAgIGlmIChuYW1lICE9PSBudWxsICYmIHR5cGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGFjY1tuYW1lXSA9IHt0eXBlLCBudWxsYWJsZX07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sXG4gICAgICAgIHt9IGFzIHtba2V5OiBzdHJpbmddOiB7dHlwZTogc3RyaW5nOyBudWxsYWJsZTogYm9vbGVhbn19LFxuICAgICAgKTtcblxuICAgICAgY29uc3QgY2hhbmdlVmFsdWUgPSBPYmplY3QuZW50cmllcyhjaGFuZ2UpLnJlZHVjZShcbiAgICAgICAgKGFjYywgW2tleSwgdmFsdWVdOiBbc3RyaW5nLCBzdHJpbmcgfCBudWxsXSkgPT4ge1xuICAgICAgICAgIGFjY1trZXldID0gY29udmVydFN0cmluZ1RvVmFsdWUodHlwZXMsIGtleSwgdmFsdWUpO1xuICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sXG4gICAgICAgIHt9IGFzIHtba2V5OiBzdHJpbmddOiBWYWx1ZX0sXG4gICAgICApO1xuICAgICAgaW5zdGFuY2UuZXhlY3V0ZSh7XG4gICAgICAgIHF1ZXJ5OiBjb25zdHJ1Y3RVcGRhdGVRdWVyeShcbiAgICAgICAgICBzZWxlY3RlZERhdGFiYXNlVGFibGUsXG4gICAgICAgICAgcHJpbWFyeUNvbHVtbkluZGV4ZXMucmVkdWNlKFxuICAgICAgICAgICAgKGFjYywgaWR4KSA9PiB7XG4gICAgICAgICAgICAgIGFjY1tjb2x1bW5zW2lkeF1dID0gcm93W2lkeF07XG4gICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge30gYXMge1trZXk6IHN0cmluZ106IFZhbHVlfSxcbiAgICAgICAgICApLFxuICAgICAgICAgIGNoYW5nZVZhbHVlLFxuICAgICAgICApLFxuICAgICAgfSk7XG4gICAgICBpbnN0YW5jZS51cGRhdGVQYWdlKHtcbiAgICAgICAgLi4ucHJvZHVjZShjdXJyZW50UGFnZSwgKGRyYWZ0KSA9PlxuICAgICAgICAgIE9iamVjdC5lbnRyaWVzKGNoYW5nZVZhbHVlKS5mb3JFYWNoKFxuICAgICAgICAgICAgKFtrZXksIHZhbHVlXTogW3N0cmluZywgVmFsdWVdKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGNvbHVtbklkeCA9IGRyYWZ0LmNvbHVtbnMuaW5kZXhPZihrZXkpO1xuICAgICAgICAgICAgICBpZiAoY29sdW1uSWR4ID49IDApIHtcbiAgICAgICAgICAgICAgICBkcmFmdC5yb3dzW2hpZ2hsaWdodGVkUm93SWR4XVtjb2x1bW5JZHhdID0gdmFsdWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKSxcbiAgICAgICAgKSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW2luc3RhbmNlXSxcbiAgKTtcblxuICBjb25zdCBkYXRhYmFzZU9wdGlvbnMgPSB1c2VNZW1vaXplKFxuICAgIChkYXRhYmFzZXMpID0+XG4gICAgICBkYXRhYmFzZXMubWFwKCh4KSA9PiAoXG4gICAgICAgIDxPcHRpb24ga2V5PXt4Lm5hbWV9IHZhbHVlPXt4Lm5hbWV9IGxhYmVsPXt4Lm5hbWV9PlxuICAgICAgICAgIHt4Lm5hbWV9XG4gICAgICAgIDwvT3B0aW9uPlxuICAgICAgKSksXG4gICAgW3N0YXRlLmRhdGFiYXNlc10sXG4gICk7XG5cbiAgY29uc3Qgc2VsZWN0ZWREYXRhYmFzZU5hbWUgPSB1c2VNZW1vaXplKFxuICAgIChzZWxlY3RlZERhdGFiYXNlOiBudW1iZXIsIGRhdGFiYXNlczogRGF0YWJhc2VFbnRyeVtdKSA9PlxuICAgICAgc2VsZWN0ZWREYXRhYmFzZSAmJiBkYXRhYmFzZXNbc3RhdGUuc2VsZWN0ZWREYXRhYmFzZSAtIDFdXG4gICAgICAgID8gZGF0YWJhc2VzW3NlbGVjdGVkRGF0YWJhc2UgLSAxXS5uYW1lXG4gICAgICAgIDogdW5kZWZpbmVkLFxuICAgIFtzdGF0ZS5zZWxlY3RlZERhdGFiYXNlLCBzdGF0ZS5kYXRhYmFzZXNdLFxuICApO1xuXG4gIGNvbnN0IHRhYmxlT3B0aW9ucyA9IHVzZU1lbW9pemUoXG4gICAgKHNlbGVjdGVkRGF0YWJhc2U6IG51bWJlciwgZGF0YWJhc2VzOiBEYXRhYmFzZUVudHJ5W10pID0+XG4gICAgICBzZWxlY3RlZERhdGFiYXNlICYmIGRhdGFiYXNlc1tzdGF0ZS5zZWxlY3RlZERhdGFiYXNlIC0gMV1cbiAgICAgICAgPyBkYXRhYmFzZXNbc2VsZWN0ZWREYXRhYmFzZSAtIDFdLnRhYmxlcy5tYXAoKHRhYmxlTmFtZSkgPT4gKFxuICAgICAgICAgICAgPE9wdGlvbiBrZXk9e3RhYmxlTmFtZX0gdmFsdWU9e3RhYmxlTmFtZX0gbGFiZWw9e3RhYmxlTmFtZX0+XG4gICAgICAgICAgICAgIHt0YWJsZU5hbWV9XG4gICAgICAgICAgICA8L09wdGlvbj5cbiAgICAgICAgICApKVxuICAgICAgICA6IFtdLFxuICAgIFtzdGF0ZS5zZWxlY3RlZERhdGFiYXNlLCBzdGF0ZS5kYXRhYmFzZXNdLFxuICApO1xuXG4gIGNvbnN0IHNlbGVjdGVkVGFibGVOYW1lID0gdXNlTWVtb2l6ZShcbiAgICAoXG4gICAgICBzZWxlY3RlZERhdGFiYXNlOiBudW1iZXIsXG4gICAgICBkYXRhYmFzZXM6IERhdGFiYXNlRW50cnlbXSxcbiAgICAgIHNlbGVjdGVkRGF0YWJhc2VUYWJsZTogc3RyaW5nIHwgbnVsbCxcbiAgICApID0+XG4gICAgICBzZWxlY3RlZERhdGFiYXNlICYmIGRhdGFiYXNlc1tzZWxlY3RlZERhdGFiYXNlIC0gMV1cbiAgICAgICAgPyBkYXRhYmFzZXNbc2VsZWN0ZWREYXRhYmFzZSAtIDFdLnRhYmxlcy5maW5kKFxuICAgICAgICAgICAgKHQpID0+IHQgPT09IHNlbGVjdGVkRGF0YWJhc2VUYWJsZSxcbiAgICAgICAgICApID8/IGRhdGFiYXNlc1tzZWxlY3RlZERhdGFiYXNlIC0gMV0udGFibGVzWzBdXG4gICAgICAgIDogdW5kZWZpbmVkLFxuICAgIFtzdGF0ZS5zZWxlY3RlZERhdGFiYXNlLCBzdGF0ZS5kYXRhYmFzZXMsIHN0YXRlLnNlbGVjdGVkRGF0YWJhc2VUYWJsZV0sXG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8TGF5b3V0LkNvbnRhaW5lciBncm93PlxuICAgICAgPFRvb2xiYXIgcG9zaXRpb249XCJ0b3BcIj5cbiAgICAgICAgPFJhZGlvLkdyb3VwIHZhbHVlPXtzdGF0ZS52aWV3TW9kZX0gb25DaGFuZ2U9e29uVmlld01vZGVDaGFuZ2VkfT5cbiAgICAgICAgICA8UmFkaW8uQnV0dG9uIHZhbHVlPVwiZGF0YVwiIG9uQ2xpY2s9e29uRGF0YUNsaWNrZWR9PlxuICAgICAgICAgICAgPFRhYmxlT3V0bGluZWQgc3R5bGU9e3ttYXJnaW5SaWdodDogNX19IC8+XG4gICAgICAgICAgICA8VHlwb2dyYXBoeS5UZXh0PkRhdGE8L1R5cG9ncmFwaHkuVGV4dD5cbiAgICAgICAgICA8L1JhZGlvLkJ1dHRvbj5cbiAgICAgICAgICA8UmFkaW8uQnV0dG9uIG9uQ2xpY2s9e29uU3RydWN0dXJlQ2xpY2tlZH0gdmFsdWU9XCJzdHJ1Y3R1cmVcIj5cbiAgICAgICAgICAgIDxTZXR0aW5nT3V0bGluZWQgc3R5bGU9e3ttYXJnaW5SaWdodDogNX19IC8+XG4gICAgICAgICAgICA8VHlwb2dyYXBoeS5UZXh0PlN0cnVjdHVyZTwvVHlwb2dyYXBoeS5UZXh0PlxuICAgICAgICAgIDwvUmFkaW8uQnV0dG9uPlxuICAgICAgICAgIDxSYWRpby5CdXR0b24gb25DbGljaz17b25TUUxDbGlja2VkfSB2YWx1ZT1cIlNRTFwiPlxuICAgICAgICAgICAgPENvbnNvbGVTcWxPdXRsaW5lZCBzdHlsZT17e21hcmdpblJpZ2h0OiA1fX0gLz5cbiAgICAgICAgICAgIDxUeXBvZ3JhcGh5LlRleHQ+U1FMPC9UeXBvZ3JhcGh5LlRleHQ+XG4gICAgICAgICAgPC9SYWRpby5CdXR0b24+XG4gICAgICAgICAgPFJhZGlvLkJ1dHRvbiBvbkNsaWNrPXtvblRhYmxlSW5mb0NsaWNrZWR9IHZhbHVlPVwidGFibGVJbmZvXCI+XG4gICAgICAgICAgICA8RGF0YWJhc2VPdXRsaW5lZCBzdHlsZT17e21hcmdpblJpZ2h0OiA1fX0gLz5cbiAgICAgICAgICAgIDxUeXBvZ3JhcGh5LlRleHQ+VGFibGUgSW5mbzwvVHlwb2dyYXBoeS5UZXh0PlxuICAgICAgICAgIDwvUmFkaW8uQnV0dG9uPlxuICAgICAgICAgIDxSYWRpby5CdXR0b24gb25DbGljaz17b25RdWVyeUhpc3RvcnlDbGlja2VkfSB2YWx1ZT1cInF1ZXJ5SGlzdG9yeVwiPlxuICAgICAgICAgICAgPEhpc3RvcnlPdXRsaW5lZCBzdHlsZT17e21hcmdpblJpZ2h0OiA1fX0gLz5cbiAgICAgICAgICAgIDxUeXBvZ3JhcGh5LlRleHQ+UXVlcnkgSGlzdG9yeTwvVHlwb2dyYXBoeS5UZXh0PlxuICAgICAgICAgIDwvUmFkaW8uQnV0dG9uPlxuICAgICAgICA8L1JhZGlvLkdyb3VwPlxuICAgICAgPC9Ub29sYmFyPlxuICAgICAge3N0YXRlLnZpZXdNb2RlID09PSAnZGF0YScgfHxcbiAgICAgIHN0YXRlLnZpZXdNb2RlID09PSAnc3RydWN0dXJlJyB8fFxuICAgICAgc3RhdGUudmlld01vZGUgPT09ICd0YWJsZUluZm8nID8gKFxuICAgICAgICA8VG9vbGJhciBwb3NpdGlvbj1cInRvcFwiPlxuICAgICAgICAgIDxCb2xkU3Bhbj5EYXRhYmFzZTwvQm9sZFNwYW4+XG4gICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgc2hvd1NlYXJjaFxuICAgICAgICAgICAgdmFsdWU9e3NlbGVjdGVkRGF0YWJhc2VOYW1lfVxuICAgICAgICAgICAgb25DaGFuZ2U9e29uRGF0YWJhc2VTZWxlY3RlZH1cbiAgICAgICAgICAgIHN0eWxlPXt7ZmxleDogMX19XG4gICAgICAgICAgICBkcm9wZG93bk1hdGNoU2VsZWN0V2lkdGg9e2ZhbHNlfT5cbiAgICAgICAgICAgIHtkYXRhYmFzZU9wdGlvbnN9XG4gICAgICAgICAgPC9TZWxlY3Q+XG4gICAgICAgICAgPEJvbGRTcGFuPlRhYmxlPC9Cb2xkU3Bhbj5cbiAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICBzaG93U2VhcmNoXG4gICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRUYWJsZU5hbWV9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25EYXRhYmFzZVRhYmxlU2VsZWN0ZWR9XG4gICAgICAgICAgICBzdHlsZT17e2ZsZXg6IDF9fVxuICAgICAgICAgICAgZHJvcGRvd25NYXRjaFNlbGVjdFdpZHRoPXtmYWxzZX0+XG4gICAgICAgICAgICB7dGFibGVPcHRpb25zfVxuICAgICAgICAgIDwvU2VsZWN0PlxuICAgICAgICAgIDxkaXYgLz5cbiAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e29uUmVmcmVzaENsaWNrZWR9IHR5cGU9XCJkZWZhdWx0XCI+XG4gICAgICAgICAgICBSZWZyZXNoXG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvVG9vbGJhcj5cbiAgICAgICkgOiBudWxsfVxuICAgICAge3N0YXRlLnZpZXdNb2RlID09PSAnU1FMJyA/IChcbiAgICAgICAgPExheW91dC5Db250YWluZXI+XG4gICAgICAgICAgPFRvb2xiYXIgcG9zaXRpb249XCJ0b3BcIj5cbiAgICAgICAgICAgIDxCb2xkU3Bhbj5EYXRhYmFzZTwvQm9sZFNwYW4+XG4gICAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICAgIHNob3dTZWFyY2hcbiAgICAgICAgICAgICAgdmFsdWU9e3NlbGVjdGVkRGF0YWJhc2VOYW1lfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17b25EYXRhYmFzZVNlbGVjdGVkfVxuICAgICAgICAgICAgICBkcm9wZG93bk1hdGNoU2VsZWN0V2lkdGg9e2ZhbHNlfT5cbiAgICAgICAgICAgICAge2RhdGFiYXNlT3B0aW9uc31cbiAgICAgICAgICAgIDwvU2VsZWN0PlxuICAgICAgICAgIDwvVG9vbGJhcj5cbiAgICAgICAgICA8TGF5b3V0Lkhvcml6b250YWwgcGFkPXt0aGVtZS5zcGFjZS5zbWFsbH0gc3R5bGU9e3twYWRkaW5nQm90dG9tOiAwfX0+XG4gICAgICAgICAgICA8VGV4dEFyZWFcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e29uUXVlcnlDaGFuZ2VkfVxuICAgICAgICAgICAgICBvbktleVByZXNzPXtvblF1ZXJ5VGV4dGFyZWFLZXlQcmVzc31cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJUeXBlIHF1ZXJ5IGhlcmUuLlwiXG4gICAgICAgICAgICAgIHZhbHVlPXtcbiAgICAgICAgICAgICAgICBzdGF0ZS5xdWVyeSAhPT0gbnVsbCAmJiB0eXBlb2Ygc3RhdGUucXVlcnkgIT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgICAgICAgICA/IHN0YXRlLnF1ZXJ5LnZhbHVlXG4gICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvTGF5b3V0Lkhvcml6b250YWw+XG4gICAgICAgICAgPFRvb2xiYXIgcG9zaXRpb249XCJ0b3BcIj5cbiAgICAgICAgICAgIDxMYXlvdXQuUmlnaHQ+XG4gICAgICAgICAgICAgIDxkaXYgLz5cbiAgICAgICAgICAgICAgPExheW91dC5Ib3Jpem9udGFsIGdhcD17dGhlbWUuc3BhY2Uuc21hbGx9PlxuICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgIGljb249e1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5xdWVyeSAmJiBmYXZvcml0ZXMuaW5jbHVkZXMoc3RhdGUucXVlcnkudmFsdWUpID8gKFxuICAgICAgICAgICAgICAgICAgICAgIDxTdGFyRmlsbGVkIC8+XG4gICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgPFN0YXJPdXRsaW5lZCAvPlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtvbkZhdm9yaXRlQnV0dG9uQ2xpY2tlZH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxEcm9wZG93blxuICAgICAgICAgICAgICAgICAgb3ZlcmxheT17XG4gICAgICAgICAgICAgICAgICAgIDxGYXZvcml0ZXNNZW51XG4gICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGVzPXtmYXZvcml0ZXN9XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17b25GYXZvcml0ZVF1ZXJ5U2VsZWN0ZWR9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICB9PlxuICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXsoKSA9PiB7fX0+XG4gICAgICAgICAgICAgICAgICAgIENob29zZSBmcm9tIHByZXZpb3VzIHF1ZXJpZXMgPERvd25PdXRsaW5lZCAvPlxuICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgPC9Ecm9wZG93bj5cbiAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtvbkV4ZWN1dGVDbGlja2VkfVxuICAgICAgICAgICAgICAgICAgdGl0bGU9eydFeGVjdXRlIFNRTCBbQ3RybCtSZXR1cm5dJ30+XG4gICAgICAgICAgICAgICAgICBFeGVjdXRlXG4gICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgIDwvTGF5b3V0Lkhvcml6b250YWw+XG4gICAgICAgICAgICA8L0xheW91dC5SaWdodD5cbiAgICAgICAgICA8L1Rvb2xiYXI+XG4gICAgICAgIDwvTGF5b3V0LkNvbnRhaW5lcj5cbiAgICAgICkgOiBudWxsfVxuICAgICAgPExheW91dC5Db250YWluZXIgZ3Jvdz5cbiAgICAgICAge3N0YXRlLnZpZXdNb2RlID09PSAnZGF0YScgPyAoXG4gICAgICAgICAgPERhdGFUYWJsZVxuICAgICAgICAgICAgcGFnZT17c3RhdGUuY3VycmVudFBhZ2V9XG4gICAgICAgICAgICBoaWdobGlnaHRlZFJvd3NDaGFuZ2VkPXtwYWdlSGlnaGxpZ2h0ZWRSb3dzQ2hhbmdlZH1cbiAgICAgICAgICAgIG9uUm93RWRpdGVkPXtvblJvd0VkaXRlZH1cbiAgICAgICAgICAgIHNvcnRPcmRlckNoYW5nZWQ9e3NvcnRPcmRlckNoYW5nZWR9XG4gICAgICAgICAgICBjdXJyZW50U29ydD17c3RhdGUuY3VycmVudFNvcnR9XG4gICAgICAgICAgICBjdXJyZW50U3RydWN0dXJlPXtzdGF0ZS5jdXJyZW50U3RydWN0dXJlfVxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICB7c3RhdGUudmlld01vZGUgPT09ICdzdHJ1Y3R1cmUnICYmIHN0YXRlLmN1cnJlbnRTdHJ1Y3R1cmUgPyAoXG4gICAgICAgICAgPERhdGFiYXNlU3RydWN0dXJlIHN0cnVjdHVyZT17c3RhdGUuY3VycmVudFN0cnVjdHVyZX0gLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHtzdGF0ZS52aWV3TW9kZSA9PT0gJ1NRTCcgPyAoXG4gICAgICAgICAgPFF1ZXJ5VGFibGVcbiAgICAgICAgICAgIHF1ZXJ5PXtzdGF0ZS5xdWVyeVJlc3VsdH1cbiAgICAgICAgICAgIGhpZ2hsaWdodGVkUm93c0NoYW5nZWQ9e3F1ZXJ5SGlnaGxpZ2h0ZWRSb3dzQ2hhbmdlZH1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAge3N0YXRlLnZpZXdNb2RlID09PSAndGFibGVJbmZvJyA/IChcbiAgICAgICAgICA8TGF5b3V0Lkhvcml6b250YWxcbiAgICAgICAgICAgIGdyb3dcbiAgICAgICAgICAgIHBhZD17dGhlbWUuc3BhY2Uuc21hbGx9XG4gICAgICAgICAgICBzdHlsZT17e3BhZGRpbmdCb3R0b206IDB9fT5cbiAgICAgICAgICAgIDxUZXh0QXJlYSB2YWx1ZT17c3FsRm9ybWF0dGVyLmZvcm1hdChzdGF0ZS50YWJsZUluZm8pfSByZWFkT25seSAvPlxuICAgICAgICAgIDwvTGF5b3V0Lkhvcml6b250YWw+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICB7c3RhdGUudmlld01vZGUgPT09ICdxdWVyeUhpc3RvcnknID8gKFxuICAgICAgICAgIDxRdWVyeUhpc3RvcnkgaGlzdG9yeT17c3RhdGUucXVlcnlIaXN0b3J5fSAvPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgIDwvTGF5b3V0LkNvbnRhaW5lcj5cbiAgICAgIDxUb29sYmFyIHBvc2l0aW9uPVwiYm90dG9tXCIgc3R5bGU9e3twYWRkaW5nTGVmdDogOH19PlxuICAgICAgICA8TGF5b3V0Lkhvcml6b250YWwgZ3Jvdz5cbiAgICAgICAgICB7c3RhdGUudmlld01vZGUgPT09ICdTUUwnICYmIHN0YXRlLmV4ZWN1dGlvblRpbWUgIT09IDAgPyAoXG4gICAgICAgICAgICA8VGV4dD4ge3N0YXRlLmV4ZWN1dGlvblRpbWV9IG1zIDwvVGV4dD5cbiAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICB7c3RhdGUudmlld01vZGUgPT09ICdkYXRhJyAmJiBzdGF0ZS5jdXJyZW50UGFnZSA/IChcbiAgICAgICAgICAgIDxQYWdlSW5mb1xuICAgICAgICAgICAgICBjdXJyZW50Um93PXtzdGF0ZS5jdXJyZW50UGFnZS5zdGFydH1cbiAgICAgICAgICAgICAgY291bnQ9e3N0YXRlLmN1cnJlbnRQYWdlLmNvdW50fVxuICAgICAgICAgICAgICB0b3RhbFJvd3M9e3N0YXRlLmN1cnJlbnRQYWdlLnRvdGFsfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17b25Hb1RvUm93fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICB7c3RhdGUudmlld01vZGUgPT09ICdkYXRhJyAmJiBzdGF0ZS5jdXJyZW50UGFnZSA/IChcbiAgICAgICAgICAgIDxCdXR0b25OYXZpZ2F0aW9uXG4gICAgICAgICAgICAgIGNhbkdvQmFjaz17c3RhdGUuY3VycmVudFBhZ2Uuc3RhcnQgPiAwfVxuICAgICAgICAgICAgICBjYW5Hb0ZvcndhcmQ9e1xuICAgICAgICAgICAgICAgIHN0YXRlLmN1cnJlbnRQYWdlLnN0YXJ0ICsgc3RhdGUuY3VycmVudFBhZ2UuY291bnQgPFxuICAgICAgICAgICAgICAgIHN0YXRlLmN1cnJlbnRQYWdlLnRvdGFsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgb25CYWNrPXtvblByZXZpb3VzUGFnZUNsaWNrZWR9XG4gICAgICAgICAgICAgIG9uRm9yd2FyZD17b25OZXh0UGFnZUNsaWNrZWR9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICA8L0xheW91dC5Ib3Jpem9udGFsPlxuICAgICAgPC9Ub29sYmFyPlxuICAgICAge3N0YXRlLmVycm9yICYmIChcbiAgICAgICAgPEVycm9yQmFyPntnZXRTdHJpbmdGcm9tRXJyb3JMaWtlKHN0YXRlLmVycm9yKX08L0Vycm9yQmFyPlxuICAgICAgKX1cbiAgICA8L0xheW91dC5Db250YWluZXI+XG4gICk7XG59XG4iLCAiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIE1ldGEgUGxhdGZvcm1zLCBJbmMuIGFuZCBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmb3JtYXRcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RyaW5nRnJvbUVycm9yTGlrZShlOiBhbnkpOiBzdHJpbmcge1xuICBpZiAoQXJyYXkuaXNBcnJheShlKSkge1xuICAgIHJldHVybiBlLm1hcChnZXRTdHJpbmdGcm9tRXJyb3JMaWtlKS5qb2luKCcgJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZTtcbiAgfSBlbHNlIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICByZXR1cm4gZS5tZXNzYWdlIHx8IGUudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIFN0cmluZ2lmeSBtaWdodCBmYWlsIG9uIGFyYml0cmFyeSBzdHJ1Y3R1cmVzXG4gICAgICAvLyBMYXN0IHJlc29ydDogdG9TdHJpbmcgaXQuXG4gICAgICByZXR1cm4gYCR7ZX1gO1xuICAgIH1cbiAgfVxufVxuIiwgIi8qKlxuICogQ29weXJpZ2h0IChjKSBNZXRhIFBsYXRmb3JtcywgSW5jLiBhbmQgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZm9ybWF0XG4gKi9cblxuaW1wb3J0IHt0aGVtZSwgc3R5bGVkfSBmcm9tICdmbGlwcGVyLXBsdWdpbic7XG5pbXBvcnQge1R5cG9ncmFwaHl9IGZyb20gJ2FudGQnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3Qge1RleHR9ID0gVHlwb2dyYXBoeTtcblxuZXhwb3J0IHR5cGUgVmFsdWUgPVxuICB8IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnIHwgJ2Jsb2InO1xuICAgICAgdmFsdWU6IHN0cmluZztcbiAgICB9XG4gIHwge1xuICAgICAgdHlwZTogJ2Jvb2xlYW4nO1xuICAgICAgdmFsdWU6IGJvb2xlYW47XG4gICAgfVxuICB8IHtcbiAgICAgIHR5cGU6ICdpbnRlZ2VyJyB8ICdmbG9hdCcgfCAnZG91YmxlJyB8ICdudW1iZXInO1xuICAgICAgdmFsdWU6IG51bWJlcjtcbiAgICB9XG4gIHwge1xuICAgICAgdHlwZTogJ251bGwnO1xuICAgICAgdmFsdWU6IG51bGw7XG4gICAgfTtcblxuY29uc3QgV3JhcHBpbmdUZXh0ID0gc3R5bGVkKFRleHQpKHtcbiAgd29yZFdyYXA6ICdicmVhay13b3JkJyxcbiAgd2lkdGg6ICcxMDAlJyxcbiAgbGluZUhlaWdodDogJzEyNSUnLFxuICBwYWRkaW5nOiAnM3B4IDAnLFxufSk7XG5XcmFwcGluZ1RleHQuZGlzcGxheU5hbWUgPSAnVHlwZUJhc2VkVmFsdWVSZW5kZXJlcjpXcmFwcGluZ1RleHQnO1xuXG5jb25zdCBOb25XcmFwcGluZ1RleHQgPSBzdHlsZWQoVGV4dCkoe1xuICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcbiAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG59KTtcbk5vbldyYXBwaW5nVGV4dC5kaXNwbGF5TmFtZSA9ICdUeXBlQmFzZWRWYWx1ZVJlbmRlcmVyOk5vbldyYXBwaW5nVGV4dCc7XG5cbmNvbnN0IEJvb2xlYW5WYWx1ZSA9IHN0eWxlZChOb25XcmFwcGluZ1RleHQpPHthY3RpdmU/OiBib29sZWFufT4oKHByb3BzKSA9PiAoe1xuICAnJjo6YmVmb3JlJzoge1xuICAgIGNvbnRlbnQ6ICdcIlwiJyxcbiAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICB3aWR0aDogOCxcbiAgICBoZWlnaHQ6IDgsXG4gICAgYm9yZGVyUmFkaXVzOiA0LFxuICAgIGJhY2tncm91bmRDb2xvcjogcHJvcHMuYWN0aXZlID8gdGhlbWUuc3VjY2Vzc0NvbG9yIDogdGhlbWUuZXJyb3JDb2xvcixcbiAgICBtYXJnaW5SaWdodDogNSxcbiAgICBtYXJnaW5Ub3A6IDEsXG4gIH0sXG59KSk7XG5Cb29sZWFuVmFsdWUuZGlzcGxheU5hbWUgPSAnVHlwZUJhc2VkVmFsdWVSZW5kZXJlcjpCb29sZWFuVmFsdWUnO1xuXG5leHBvcnQgZnVuY3Rpb24gdmFsdWVUb051bGxhYmxlU3RyaW5nKHZhbDogVmFsdWUpOiBzdHJpbmcgfCBudWxsIHtcbiAgcmV0dXJuIHZhbC52YWx1ZT8udG9TdHJpbmcoKSA/PyBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyVmFsdWUodmFsOiBWYWx1ZSwgd29yZFdyYXA/OiBib29sZWFuKSB7XG4gIGNvbnN0IFRleHRDb21wb25lbnQgPSB3b3JkV3JhcCA/IFdyYXBwaW5nVGV4dCA6IE5vbldyYXBwaW5nVGV4dDtcbiAgc3dpdGNoICh2YWwudHlwZSkge1xuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEJvb2xlYW5WYWx1ZSBhY3RpdmU9e3ZhbC52YWx1ZX0+e3ZhbC52YWx1ZS50b1N0cmluZygpfTwvQm9vbGVhblZhbHVlPlxuICAgICAgKTtcbiAgICBjYXNlICdibG9iJzpcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcmV0dXJuIDxUZXh0Q29tcG9uZW50Pnt2YWwudmFsdWV9PC9UZXh0Q29tcG9uZW50PjtcbiAgICBjYXNlICdpbnRlZ2VyJzpcbiAgICBjYXNlICdmbG9hdCc6XG4gICAgY2FzZSAnZG91YmxlJzpcbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgcmV0dXJuIDxUZXh0Q29tcG9uZW50Pnt2YWwudmFsdWV9PC9UZXh0Q29tcG9uZW50PjtcbiAgICBjYXNlICdudWxsJzpcbiAgICAgIHJldHVybiA8VGV4dENvbXBvbmVudD5OVUxMPC9UZXh0Q29tcG9uZW50PjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIDxUZXh0Q29tcG9uZW50IC8+O1xuICB9XG59XG4iLCAiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIE1ldGEgUGxhdGZvcm1zLCBJbmMuIGFuZCBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmb3JtYXRcbiAqL1xuXG5pbXBvcnQge1JhZGlvfSBmcm9tICdhbnRkJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge0xlZnRPdXRsaW5lZCwgUmlnaHRPdXRsaW5lZH0gZnJvbSAnQGFudC1kZXNpZ24vaWNvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5tZW1vKFxuICAocHJvcHM6IHtcbiAgICAvKiogQmFjayBidXR0b24gaXMgZW5hYmxlZCAqL1xuICAgIGNhbkdvQmFjazogYm9vbGVhbjtcbiAgICAvKiogRm9yd2FyZHMgYnV0dG9uIGlzIGVuYWJsZWQgKi9cbiAgICBjYW5Hb0ZvcndhcmQ6IGJvb2xlYW47XG4gICAgLyoqIENhbGxiYWNrIHdoZW4gYmFjayBidXR0b24gaXMgY2xpY2tlZCAqL1xuICAgIG9uQmFjazogKCkgPT4gdm9pZDtcbiAgICAvKiogQ2FsbGJhY2sgd2hlbiBmb3J3YXJkcyBidXR0b24gaXMgY2xpY2tlZCAqL1xuICAgIG9uRm9yd2FyZDogKCkgPT4gdm9pZDtcbiAgfSkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICA8UmFkaW8uR3JvdXAgc3R5bGU9e3ttYXJnaW5MZWZ0OiA1LCBtYXJnaW5SaWdodDogNX19PlxuICAgICAgICA8UmFkaW8uQnV0dG9uIGRpc2FibGVkPXshcHJvcHMuY2FuR29CYWNrfSBvbkNsaWNrPXtwcm9wcy5vbkJhY2t9PlxuICAgICAgICAgIDxMZWZ0T3V0bGluZWQgc2l6ZT17MTZ9IC8+XG4gICAgICAgIDwvUmFkaW8uQnV0dG9uPlxuICAgICAgICA8UmFkaW8uQnV0dG9uIGRpc2FibGVkPXshcHJvcHMuY2FuR29Gb3J3YXJkfSBvbkNsaWNrPXtwcm9wcy5vbkZvcndhcmR9PlxuICAgICAgICAgIDxSaWdodE91dGxpbmVkIHNpemU9ezE2fSAvPlxuICAgICAgICA8L1JhZGlvLkJ1dHRvbj5cbiAgICAgIDwvUmFkaW8uR3JvdXA+XG4gICAgKTtcbiAgfSxcbik7XG4iLCAiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIE1ldGEgUGxhdGZvcm1zLCBJbmMuIGFuZCBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmb3JtYXRcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHt1c2VNZW1vLCB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWR1Y2VyfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7XG4gIFBhbmVsLFxuICBEZXRhaWxTaWRlYmFyLFxuICBEYXRhSW5zcGVjdG9yIGFzIE1hbmFnZWREYXRhSW5zcGVjdG9yLFxuICB0aGVtZSxcbiAgc3R5bGVkLFxuICBwcm9kdWNlLFxuICBMYXlvdXQsXG59IGZyb20gJ2ZsaXBwZXItcGx1Z2luJztcblxuaW1wb3J0IHtcbiAgVmFsdWUsXG4gIHZhbHVlVG9OdWxsYWJsZVN0cmluZyxcbiAgcmVuZGVyVmFsdWUsXG59IGZyb20gJy4vVHlwZUJhc2VkVmFsdWVSZW5kZXJlcic7XG5cbmltcG9ydCB7QnV0dG9uLCBJbnB1dH0gZnJvbSAnYW50ZCc7XG5cbnR5cGUgVGFibGVSb3cgPSB7XG4gIGNvbDogc3RyaW5nO1xuICB0eXBlOiBWYWx1ZVsndHlwZSddO1xuICB2YWx1ZTogUmVhY3QuUmVhY3RFbGVtZW50O1xufTtcblxudHlwZSBEYXRhYmFzZURldGFpbFNpZGViYXJQcm9wcyA9IHtcbiAgY29sdW1uTGFiZWxzOiBBcnJheTxzdHJpbmc+O1xuICBjb2x1bW5WYWx1ZXM6IEFycmF5PFZhbHVlPjtcbiAgb25TYXZlPzogKChjaGFuZ2VzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVsbH0pID0+IHZvaWQpIHwgdW5kZWZpbmVkO1xufTtcblxuY29uc3QgVGFibGVEZXRhaWxSb3cgPSBzdHlsZWQuZGl2KHtcbiAgYm9yZGVyQm90dG9tOiBgMXB4IHNvbGlkICR7dGhlbWUuZGl2aWRlckNvbG9yfWAsXG4gIHBhZGRpbmc6IDgsXG59KTtcblxuY29uc3QgVGFibGVEZXRhaWxSb3dUaXRsZSA9IHN0eWxlZC5kaXYoe1xuICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gIG1hcmdpbkJvdHRvbTogOCxcbn0pO1xuXG5jb25zdCBUYWJsZURldGFpbFJvd1R5cGUgPSBzdHlsZWQuc3Bhbih7XG4gIGNvbG9yOiB0aGVtZS53aGl0ZSxcbiAgbWFyZ2luTGVmdDogOCxcbiAgZm9udFdlaWdodDogJ25vcm1hbCcsXG59KTtcblxuY29uc3QgVGFibGVEZXRhaWxSb3dWYWx1ZSA9IHN0eWxlZC5kaXYoe30pO1xuXG5mdW5jdGlvbiBzaWRlYmFyUm93cyhsYWJlbHM6IEFycmF5PHN0cmluZz4sIHZhbHVlczogQXJyYXk8VmFsdWU+KTogVGFibGVSb3dbXSB7XG4gIHJldHVybiBsYWJlbHMubWFwKChsYWJlbCwgaWR4KSA9PiBidWlsZFNpZGViYXJSb3cobGFiZWwsIHZhbHVlc1tpZHhdKSk7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkU2lkZWJhclJvdyhrZXk6IHN0cmluZywgdmFsOiBWYWx1ZSk6IFRhYmxlUm93IHtcbiAgbGV0IG91dHB1dCA9IHJlbmRlclZhbHVlKHZhbCwgdHJ1ZSk7XG4gIGlmIChcbiAgICAodmFsLnR5cGUgPT09ICdzdHJpbmcnIHx8IHZhbC50eXBlID09PSAnYmxvYicpICYmXG4gICAgKHZhbC52YWx1ZVswXSA9PT0gJ1snIHx8IHZhbC52YWx1ZVswXSA9PT0gJ3snKVxuICApIHtcbiAgICB0cnkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICB2YXIgcGFyc2VkID0gSlNPTi5wYXJzZSh2YWwudmFsdWUpO1xuICAgIH0gY2F0Y2ggKF9lcnJvcikge31cbiAgICBpZiAocGFyc2VkKSB7XG4gICAgICBvdXRwdXQgPSA8TWFuYWdlZERhdGFJbnNwZWN0b3IgZGF0YT17cGFyc2VkfSBleHBhbmRSb290IGNvbGxhcHNlZCAvPjtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBjb2w6IGtleSxcbiAgICB0eXBlOiB2YWwudHlwZSxcbiAgICB2YWx1ZTogb3V0cHV0LFxuICB9O1xufVxuXG5mdW5jdGlvbiBzaWRlYmFyRWRpdGFibGVSb3dzKFxuICBsYWJlbHM6IEFycmF5PHN0cmluZz4sXG4gIHZhbHVlczogQXJyYXk8VmFsdWU+LFxuICByb3dEaXNwYXRjaDogKGFjdGlvbjogUm93QWN0aW9uKSA9PiB2b2lkLFxuKTogVGFibGVSb3dbXSB7XG4gIHJldHVybiBsYWJlbHMubWFwKChsYWJlbCwgaWR4KSA9PlxuICAgIGJ1aWxkU2lkZWJhckVkaXRhYmxlUm93KGxhYmVsLCB2YWx1ZXNbaWR4XSwgKHZhbHVlOiBzdHJpbmcgfCBudWxsKSA9PlxuICAgICAgcm93RGlzcGF0Y2goe3R5cGU6ICdzZXQnLCBrZXk6IGxhYmVsLCB2YWx1ZX0pLFxuICAgICksXG4gICk7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkU2lkZWJhckVkaXRhYmxlUm93KFxuICBrZXk6IHN0cmluZyxcbiAgdmFsOiBWYWx1ZSxcbiAgb25VcGRhdGVWYWx1ZTogKHZhbHVlOiBzdHJpbmcgfCBudWxsKSA9PiB2b2lkLFxuKTogVGFibGVSb3cge1xuICBpZiAodmFsLnR5cGUgPT09ICdibG9iJyB8fCAhdmFsLnR5cGUpIHtcbiAgICByZXR1cm4gYnVpbGRTaWRlYmFyUm93KGtleSwgdmFsKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIGNvbDoga2V5LFxuICAgIHR5cGU6IHZhbC50eXBlLFxuICAgIHZhbHVlOiAoXG4gICAgICA8RWRpdEZpZWxkXG4gICAgICAgIGtleT17a2V5fVxuICAgICAgICBpbml0aWFsVmFsdWU9e3ZhbHVlVG9OdWxsYWJsZVN0cmluZyh2YWwpfVxuICAgICAgICBvblVwZGF0ZVZhbHVlPXtvblVwZGF0ZVZhbHVlfVxuICAgICAgLz5cbiAgICApLFxuICB9O1xufVxuXG5jb25zdCBFZGl0RmllbGQgPSBSZWFjdC5tZW1vKFxuICAocHJvcHM6IHtcbiAgICBpbml0aWFsVmFsdWU6IHN0cmluZyB8IG51bGw7XG4gICAgb25VcGRhdGVWYWx1ZTogKHZhbHVlOiBzdHJpbmcgfCBudWxsKSA9PiB2b2lkO1xuICB9KSA9PiB7XG4gICAgY29uc3Qge2luaXRpYWxWYWx1ZSwgb25VcGRhdGVWYWx1ZX0gPSBwcm9wcztcbiAgICBjb25zdCBbdmFsdWUsIHNldFZhbHVlXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KGluaXRpYWxWYWx1ZSk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHNldFZhbHVlKGluaXRpYWxWYWx1ZSksIFtpbml0aWFsVmFsdWVdKTtcbiAgICByZXR1cm4gKFxuICAgICAgPElucHV0XG4gICAgICAgIHZhbHVlPXt2YWx1ZSB8fCAnJ31cbiAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgc2V0VmFsdWUoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICAgIG9uVXBkYXRlVmFsdWUoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICB9fVxuICAgICAgICBwbGFjZWhvbGRlcj17dmFsdWUgPT09IG51bGwgPyAnTlVMTCcgOiB1bmRlZmluZWR9XG4gICAgICAgIGRhdGEtdGVzdGlkPXsndXBkYXRlLXF1ZXJ5LWlucHV0J31cbiAgICAgICAgc3R5bGU9e3t3aWR0aDogJzEwMCUnfX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSxcbik7XG5cbnR5cGUgUm93U3RhdGUgPSB7Y2hhbmdlczoge1trZXk6IHN0cmluZ106IHN0cmluZyB8IG51bGx9OyB1cGRhdGVkOiBib29sZWFufTtcbnR5cGUgUm93QWN0aW9uID1cbiAgfCB7dHlwZTogJ3NldCc7IGtleTogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIHwgbnVsbH1cbiAgfCB7dHlwZTogJ3Jlc2V0J307XG5cbmNvbnN0IHJvd1N0YXRlUmVkdWNlciA9IHByb2R1Y2UoKGRyYWZ0U3RhdGU6IFJvd1N0YXRlLCBhY3Rpb246IFJvd0FjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnc2V0JzpcbiAgICAgIGRyYWZ0U3RhdGUuY2hhbmdlc1thY3Rpb24ua2V5XSA9IGFjdGlvbi52YWx1ZTtcbiAgICAgIGRyYWZ0U3RhdGUudXBkYXRlZCA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgY2FzZSAncmVzZXQnOlxuICAgICAgZHJhZnRTdGF0ZS5jaGFuZ2VzID0ge307XG4gICAgICBkcmFmdFN0YXRlLnVwZGF0ZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFJlYWN0Lm1lbW8oZnVuY3Rpb24gRGF0YWJhc2VEZXRhaWxTaWRlYmFyKFxuICBwcm9wczogRGF0YWJhc2VEZXRhaWxTaWRlYmFyUHJvcHMsXG4pIHtcbiAgY29uc3QgW2VkaXRpbmcsIHNldEVkaXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcm93U3RhdGUsIHJvd0Rpc3BhdGNoXSA9IHVzZVJlZHVjZXIocm93U3RhdGVSZWR1Y2VyLCB7XG4gICAgY2hhbmdlczoge30sXG4gICAgdXBkYXRlZDogZmFsc2UsXG4gIH0pO1xuICBjb25zdCB7Y29sdW1uTGFiZWxzLCBjb2x1bW5WYWx1ZXMsIG9uU2F2ZX0gPSBwcm9wcztcbiAgdXNlRWZmZWN0KCgpID0+IHJvd0Rpc3BhdGNoKHt0eXBlOiAncmVzZXQnfSksIFtjb2x1bW5MYWJlbHMsIGNvbHVtblZhbHVlc10pO1xuICBjb25zdCByb3dzID0gdXNlTWVtbyhcbiAgICAoKSA9PlxuICAgICAgZWRpdGluZ1xuICAgICAgICA/IHNpZGViYXJFZGl0YWJsZVJvd3MoY29sdW1uTGFiZWxzLCBjb2x1bW5WYWx1ZXMsIHJvd0Rpc3BhdGNoKVxuICAgICAgICA6IHNpZGViYXJSb3dzKGNvbHVtbkxhYmVscywgY29sdW1uVmFsdWVzKSxcbiAgICBbY29sdW1uTGFiZWxzLCBjb2x1bW5WYWx1ZXMsIGVkaXRpbmddLFxuICApO1xuICByZXR1cm4gKFxuICAgIDxEZXRhaWxTaWRlYmFyPlxuICAgICAgPFBhbmVsIHRpdGxlPVwiUm93IGRldGFpbHNcIiBjb2xsYXBzaWJsZT5cbiAgICAgICAge29uU2F2ZSA/IChcbiAgICAgICAgICA8TGF5b3V0LlJpZ2h0IGNlbnRlcj5cbiAgICAgICAgICAgIDxkaXYgLz5cbiAgICAgICAgICAgIHtlZGl0aW5nID8gKFxuICAgICAgICAgICAgICA8TGF5b3V0Lkhvcml6b250YWwgcGFkIGdhcD5cbiAgICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldEVkaXRpbmcoZmFsc2UpfT5DbG9zZTwvQnV0dG9uPlxuICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshcm93U3RhdGUudXBkYXRlZH1cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb25TYXZlKHJvd1N0YXRlLmNoYW5nZXMpO1xuICAgICAgICAgICAgICAgICAgICBzZXRFZGl0aW5nKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgU2F2ZVxuICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICA8L0xheW91dC5Ib3Jpem9udGFsPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPExheW91dC5Ib3Jpem9udGFsIHBhZD5cbiAgICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldEVkaXRpbmcodHJ1ZSl9PkVkaXQ8L0J1dHRvbj5cbiAgICAgICAgICAgICAgPC9MYXlvdXQuSG9yaXpvbnRhbD5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9MYXlvdXQuUmlnaHQ+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIHtyb3dzLm1hcCgocm93KSA9PiAoXG4gICAgICAgICAgICA8VGFibGVEZXRhaWxSb3cga2V5PXtyb3cuY29sfT5cbiAgICAgICAgICAgICAgPFRhYmxlRGV0YWlsUm93VGl0bGU+XG4gICAgICAgICAgICAgICAge3Jvdy5jb2x9XG4gICAgICAgICAgICAgICAgPFRhYmxlRGV0YWlsUm93VHlwZT4oe3Jvdy50eXBlfSk8L1RhYmxlRGV0YWlsUm93VHlwZT5cbiAgICAgICAgICAgICAgPC9UYWJsZURldGFpbFJvd1RpdGxlPlxuICAgICAgICAgICAgICA8VGFibGVEZXRhaWxSb3dWYWx1ZT57cm93LnZhbHVlfTwvVGFibGVEZXRhaWxSb3dWYWx1ZT5cbiAgICAgICAgICAgIDwvVGFibGVEZXRhaWxSb3c+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9QYW5lbD5cbiAgICA8L0RldGFpbFNpZGViYXI+XG4gICk7XG59KTtcbiIsICIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZvcm1hdFxuICovXG5cbmltcG9ydCB7VmFsdWUsIHJlbmRlclZhbHVlfSBmcm9tICcuL1R5cGVCYXNlZFZhbHVlUmVuZGVyZXInO1xuaW1wb3J0IHtEYXRhVGFibGUsIERhdGFUYWJsZUNvbHVtbiwgTGF5b3V0LCB1c2VNZW1vaXplfSBmcm9tICdmbGlwcGVyLXBsdWdpbic7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtTdHJ1Y3R1cmV9IGZyb20gJy4vaW5kZXgnO1xuXG5mdW5jdGlvbiBjcmVhdGVSb3dzKFxuICBjb2x1bW5zOiBzdHJpbmdbXSxcbiAgcm93czogVmFsdWVbXVtdLFxuKToge1trZXk6IHN0cmluZ106IFZhbHVlfVtdIHtcbiAgcmV0dXJuIHJvd3MubWFwKCh2YWx1ZXMpID0+XG4gICAgdmFsdWVzLnJlZHVjZSgoYWNjOiB7W2tleTogc3RyaW5nXTogVmFsdWV9LCBjdXI6IFZhbHVlLCBpOiBudW1iZXIpID0+IHtcbiAgICAgIGFjY1tjb2x1bW5zW2ldXSA9IGN1cjtcbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pLFxuICApO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb2x1bW5Db25maWcoY29sdW1uczogc3RyaW5nW10pIHtcbiAgY29uc3QgY29sdW1uT2JqczogRGF0YVRhYmxlQ29sdW1uPHtba2V5OiBzdHJpbmddOiBWYWx1ZX0+W10gPSBjb2x1bW5zLm1hcChcbiAgICAoYykgPT4gKHtcbiAgICAgIGtleTogYyxcbiAgICAgIHRpdGxlOiBjLFxuICAgICAgb25SZW5kZXIocm93KSB7XG4gICAgICAgIHJldHVybiByZW5kZXJWYWx1ZShyb3dbY10pO1xuICAgICAgfSxcbiAgICB9KSxcbiAgKTtcbiAgcmV0dXJuIGNvbHVtbk9ianM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlYWN0Lm1lbW8oKHByb3BzOiB7c3RydWN0dXJlOiBTdHJ1Y3R1cmV9KSA9PiB7XG4gIGNvbnN0IHtzdHJ1Y3R1cmV9ID0gcHJvcHM7XG4gIGNvbnN0IHtjb2x1bW5zLCByb3dzLCBpbmRleGVzQ29sdW1ucywgaW5kZXhlc1ZhbHVlc30gPSBzdHJ1Y3R1cmU7XG4gIGNvbnN0IHJvd09ianMgPSB1c2VNZW1vaXplKFxuICAgIChjb2x1bW5zOiBzdHJpbmdbXSwgcm93czogVmFsdWVbXVtdKSA9PiBjcmVhdGVSb3dzKGNvbHVtbnMsIHJvd3MpLFxuICAgIFtjb2x1bW5zLCByb3dzXSxcbiAgKTtcbiAgY29uc3QgY29sdW1uT2JqcyA9IHVzZU1lbW9pemUoXG4gICAgKGNvbHVtbnM6IHN0cmluZ1tdKSA9PiBjcmVhdGVDb2x1bW5Db25maWcoY29sdW1ucyksXG4gICAgW2NvbHVtbnNdLFxuICApO1xuICBjb25zdCBpbmRleFJvd09ianMgPSB1c2VNZW1vaXplKFxuICAgIChpbmRleGVzQ29sdW1uczogc3RyaW5nW10sIGluZGV4ZXNWYWx1ZXM6IFZhbHVlW11bXSkgPT5cbiAgICAgIGNyZWF0ZVJvd3MoaW5kZXhlc0NvbHVtbnMsIGluZGV4ZXNWYWx1ZXMpLFxuICAgIFtpbmRleGVzQ29sdW1ucywgaW5kZXhlc1ZhbHVlc10sXG4gICk7XG4gIGNvbnN0IGluZGV4Q29sdW1uT2JqcyA9IHVzZU1lbW9pemUoXG4gICAgKGluZGV4ZXNDb2x1bW5zOiBzdHJpbmdbXSkgPT4gY3JlYXRlQ29sdW1uQ29uZmlnKGluZGV4ZXNDb2x1bW5zKSxcbiAgICBbaW5kZXhlc0NvbHVtbnNdLFxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPExheW91dC5Ub3AgcmVzaXphYmxlIGhlaWdodD17NDAwfT5cbiAgICAgIDxEYXRhVGFibGU8e1trZXk6IHN0cmluZ106IFZhbHVlfT5cbiAgICAgICAgcmVjb3Jkcz17cm93T2Jqc31cbiAgICAgICAgY29sdW1ucz17Y29sdW1uT2Jqc31cbiAgICAgICAgZW5hYmxlU2VhcmNoYmFyPXtmYWxzZX1cbiAgICAgIC8+XG4gICAgICA8RGF0YVRhYmxlPHtba2V5OiBzdHJpbmddOiBWYWx1ZX0+XG4gICAgICAgIHJlY29yZHM9e2luZGV4Um93T2Jqc31cbiAgICAgICAgY29sdW1ucz17aW5kZXhDb2x1bW5PYmpzfVxuICAgICAgICBlbmFibGVTZWFyY2hiYXI9e2ZhbHNlfVxuICAgICAgLz5cbiAgICA8L0xheW91dC5Ub3A+XG4gICk7XG59KTtcbiIsICIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZvcm1hdFxuICovXG5cbmltcG9ydCB7VmFsdWV9IGZyb20gJy4vVHlwZUJhc2VkVmFsdWVSZW5kZXJlcic7XG5cbmNvbnN0IElOVF9EQVRBX1RZUEUgPSBbJ0lOVEVHRVInLCAnTE9ORycsICdJTlQnLCAnQklHSU5UJ107XG5jb25zdCBGTE9BVF9EQVRBX1RZUEUgPSBbJ1JFQUwnLCAnRE9VQkxFJ107XG5jb25zdCBCTE9CX0RBVEFfVFlQRSA9IFsnQkxPQiddO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydFN0cmluZ1RvVmFsdWUoXG4gIHR5cGVzOiB7W2tleTogc3RyaW5nXToge3R5cGU6IHN0cmluZzsgbnVsbGFibGU6IGJvb2xlYW59fSxcbiAga2V5OiBzdHJpbmcsXG4gIHZhbHVlOiBzdHJpbmcgfCBudWxsLFxuKTogVmFsdWUge1xuICBpZiAodHlwZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgIGNvbnN0IHt0eXBlLCBudWxsYWJsZX0gPSB0eXBlc1trZXldO1xuICAgIHZhbHVlID0gdmFsdWUgPT09IG51bGwgPyAnJyA6IHZhbHVlO1xuICAgIGlmICh2YWx1ZS5sZW5ndGggPD0gMCAmJiBudWxsYWJsZSkge1xuICAgICAgcmV0dXJuIHt0eXBlOiAnbnVsbCcsIHZhbHVlOiBudWxsfTtcbiAgICB9XG5cbiAgICBpZiAoSU5UX0RBVEFfVFlQRS5pbmRleE9mKHR5cGUpID49IDApIHtcbiAgICAgIGNvbnN0IGNvbnZlcnRlZCA9IHBhcnNlSW50KHZhbHVlLCAxMCk7XG4gICAgICByZXR1cm4ge3R5cGU6ICdpbnRlZ2VyJywgdmFsdWU6IGlzTmFOKGNvbnZlcnRlZCkgPyAwIDogY29udmVydGVkfTtcbiAgICB9IGVsc2UgaWYgKEZMT0FUX0RBVEFfVFlQRS5pbmRleE9mKHR5cGUpID49IDApIHtcbiAgICAgIGNvbnN0IGNvbnZlcnRlZCA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgcmV0dXJuIHt0eXBlOiAnZmxvYXQnLCB2YWx1ZTogaXNOYU4oY29udmVydGVkKSA/IDAgOiBjb252ZXJ0ZWR9O1xuICAgIH0gZWxzZSBpZiAoQkxPQl9EQVRBX1RZUEUuaW5kZXhPZih0eXBlKSA+PSAwKSB7XG4gICAgICByZXR1cm4ge3R5cGU6ICdibG9iJywgdmFsdWV9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge3R5cGU6ICdzdHJpbmcnLCB2YWx1ZX07XG4gICAgfVxuICB9XG4gIC8vIGlmIG5vIHR5cGUgZm91bmQgYXNzdW1lIHR5cGUgaXMgbnVsbGFibGUgc3RyaW5nXG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZS5sZW5ndGggPD0gMCkge1xuICAgIHJldHVybiB7dHlwZTogJ251bGwnLCB2YWx1ZTogbnVsbH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHt0eXBlOiAnc3RyaW5nJywgdmFsdWV9O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25zdHJ1Y3RRdWVyeUNsYXVzZShcbiAgdmFsdWVzOiB7W2tleTogc3RyaW5nXTogVmFsdWV9LFxuICBjb25uZWN0b3I6IHN0cmluZyxcbik6IHN0cmluZyB7XG4gIHJldHVybiBPYmplY3QuZW50cmllcyh2YWx1ZXMpLnJlZHVjZShcbiAgICAoY2xhdXNlcywgW2tleSwgdmFsXTogW3N0cmluZywgVmFsdWVdLCBpZHgpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlU3RyaW5nID1cbiAgICAgICAgdmFsLnR5cGUgPT09ICdudWxsJ1xuICAgICAgICAgID8gJ05VTEwnXG4gICAgICAgICAgOiB2YWwudHlwZSA9PT0gJ3N0cmluZycgfHwgdmFsLnR5cGUgPT09ICdibG9iJ1xuICAgICAgICAgICAgPyBgJyR7dmFsLnZhbHVlLnJlcGxhY2UoLycvZywgXCInJ1wiKX0nYFxuICAgICAgICAgICAgOiBgJHt2YWwudmFsdWV9YDtcbiAgICAgIGlmIChpZHggPD0gMCkge1xuICAgICAgICByZXR1cm4gYFxcYCR7a2V5fVxcYD0ke3ZhbHVlU3RyaW5nfWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYCR7Y2xhdXNlc30gJHtjb25uZWN0b3J9IFxcYCR7a2V5fVxcYD0ke3ZhbHVlU3RyaW5nfWA7XG4gICAgICB9XG4gICAgfSxcbiAgICAnJyxcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnN0cnVjdFVwZGF0ZVF1ZXJ5KFxuICB0YWJsZTogc3RyaW5nLFxuICB3aGVyZToge1trZXk6IHN0cmluZ106IFZhbHVlfSxcbiAgY2hhbmdlOiB7W2tleTogc3RyaW5nXTogVmFsdWV9LFxuKTogc3RyaW5nIHtcbiAgcmV0dXJuIGBVUERBVEUgXFxgJHt0YWJsZX1cXGBcbiAgICBTRVQgJHtjb25zdHJ1Y3RRdWVyeUNsYXVzZShjaGFuZ2UsICcsJyl9XG4gICAgV0hFUkUgJHtjb25zdHJ1Y3RRdWVyeUNsYXVzZSh3aGVyZSwgJ0FORCcpfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1VwZGF0YWJsZShcbiAgY29sdW1uTWV0YTogQXJyYXk8c3RyaW5nPixcbiAgY29sdW1uRGF0YTogQXJyYXk8QXJyYXk8VmFsdWU+Pixcbik6IGJvb2xlYW4ge1xuICBjb25zdCBwcmltYXJ5S2V5SWR4ID0gY29sdW1uTWV0YS5pbmRleE9mKCdwcmltYXJ5X2tleScpO1xuICByZXR1cm4gKFxuICAgIHByaW1hcnlLZXlJZHggPj0gMCAmJlxuICAgIGNvbHVtbkRhdGEucmVkdWNlKChhY2M6IGJvb2xlYW4sIGNvbHVtbikgPT4ge1xuICAgICAgY29uc3QgcHJpbWFyeVZhbHVlID0gY29sdW1uW3ByaW1hcnlLZXlJZHhdO1xuICAgICAgcmV0dXJuIGFjYyB8fCAocHJpbWFyeVZhbHVlLnR5cGUgPT09ICdib29sZWFuJyAmJiBwcmltYXJ5VmFsdWUudmFsdWUpO1xuICAgIH0sIGZhbHNlKVxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBLHNFQUFBQSxTQUFBO0FBQUE7QUFBYSxhQUFTLFFBQVEsS0FBSTtBQUFDO0FBQTBCLFVBQUcsT0FBTyxXQUFTLGNBQVksT0FBTyxPQUFPLGFBQVcsVUFBUztBQUFDLGtCQUFRLFNBQVNDLFNBQVFDLE1BQUk7QUFBQyxpQkFBTyxPQUFPQTtBQUFBLFFBQUc7QUFBQSxNQUFDLE9BQUs7QUFBQyxrQkFBUSxTQUFTRCxTQUFRQyxNQUFJO0FBQUMsaUJBQU9BLFFBQUssT0FBTyxXQUFTLGNBQVlBLEtBQUksZ0JBQWMsVUFBUUEsU0FBTSxPQUFPLFlBQVUsV0FBUyxPQUFPQTtBQUFBLFFBQUc7QUFBQSxNQUFDO0FBQUMsYUFBTyxRQUFRLEdBQUc7QUFBQSxJQUFDO0FBQUMsS0FBQyxTQUFTQyxTQUFPO0FBQUMsVUFBSSxhQUFXO0FBQVUsVUFBSUMsY0FBVyxXQUFVO0FBQUMsWUFBSSxRQUFNO0FBQWlGLFlBQUksV0FBUztBQUF1SSxZQUFJLGVBQWE7QUFBYyxlQUFPLFNBQVMsTUFBSyxNQUFLLEtBQUksS0FBSTtBQUFDLGNBQUcsV0FBVyxXQUFTLEtBQUcsT0FBTyxJQUFJLE1BQUksWUFBVSxDQUFDLEtBQUssS0FBSyxJQUFJLEdBQUU7QUFBQyxtQkFBSztBQUFLLG1CQUFLO0FBQUEsVUFBUztBQUFDLGlCQUFLLFFBQU0sU0FBTyxJ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LG1CQUFPQSxZQUFXLEtBQUssV0FBVyxHQUFHO0FBQUEsVUFBRSxHQUFFLE1BQUssU0FBUyxPQUFNO0FBQUMsbUJBQU9BLFlBQVcsS0FBSyxXQUFXLEdBQUcsSUFBRTtBQUFBLFVBQUcsR0FBRSxJQUFHLFNBQVMsS0FBSTtBQUFDLG1CQUFPLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDO0FBQUEsVUFBQyxHQUFFLE1BQUssU0FBUyxPQUFNO0FBQUMsbUJBQU8sSUFBSSxFQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUMsR0FBRSxHQUFFLFNBQVMsSUFBRztBQUFDLG1CQUFPLEdBQUcsSUFBRSxNQUFJO0FBQUEsVUFBRSxHQUFFLElBQUcsU0FBUyxLQUFJO0FBQUMsbUJBQU8sSUFBSSxHQUFHLElBQUUsTUFBSSxFQUFFO0FBQUEsVUFBQyxHQUFFLEdBQUUsU0FBUyxJQUFHO0FBQUMsbUJBQU8sR0FBRztBQUFBLFVBQUMsR0FBRSxJQUFHLFNBQVMsS0FBSTtBQUFDLG1CQUFPLElBQUksR0FBRyxDQUFDO0FBQUEsVUFBQyxHQUFFLEdBQUUsU0FBUyxJQUFHO0FBQUMsbUJBQU8sR0FBRztBQUFBLFVBQUMsR0FBRSxJQUFHLFNBQVMsS0FBSTtBQUFDLG1CQUFPLElBQUksR0FBRyxDQUFDO0FBQUEsVUFBQyxHQUFFLEdBQUUsU0FBUyxJQUFHO0FBQUMsbUJBQU8sR0FBRztBQUFBLFVBQUMsR0FBRSxJQUFHLFNBQVMsS0FBSTtBQUFDLG1CQUFPLElBQUksR0FBRyxDQUFDO0FBQUEsVUFBQyxHQUFFLEdBQUUsU0FBUyxJQUFHO0FBQUMsbUJBQU8sSUFBSSxHQUFHLEdBQUUsQ0FBQztBQUFBLFVBQUMsR0FBRSxHQUFFLFNBQVMsSUFBRztBQUFDLG1CQUFPLElBQUksS0FBSyxNQUFNLEdBQUcsSUFBRSxFQUFFLENBQUM7QUFBQSxVQUFDLEdBQUUsR0FBRSxTQUFTLElBQUc7QUFBQyxtQkFBTyxHQUFHLElBQUUsS0FBR0EsWUFBVyxLQUFLLFVBQVUsS0FBR0EsWUFBVyxLQUFLLFVBQVU7QUFBQSxVQUFFLEdBQUUsSUFBRyxTQUFTLEtBQUk7QUFBQyxtQkFBTyxHQUFHLElBQUUsS0FBR0EsWUFBVyxLQUFLLFVBQVUsS0FBR0EsWUFBVyxLQUFLLFVBQVU7QUFBQSxVQUFFLEdBQUUsR0FBRSxTQUFTLElBQUc7QUFBQyxtQkFBTyxHQUFHLElBQUUsS0FBR0EsWUFBVyxLQUFLLFVBQVUsS0FBR0EsWUFBVyxLQUFLLFVBQVU7QUFBQSxVQUFFLEdBQUUsSUFBRyxTQUFTLEtBQUk7QUFBQyxtQkFBTyxHQUFHLElBQUUsS0FBR0EsWUFBVyxLQUFLLFVBQVUsS0FBR0EsWUFBVyxLQUFLLFVBQVU7QUFBQSxVQUFFLEdBQUUsR0FBRSxTQUFTLElBQUc7QUFBQyxtQkFBTyxNQUFJLFFBQU0sTUFBSSxTQUFPLE9BQU8sSUFBSSxFQUFFLE1BQU0sUUFBUSxLQUFHLENBQUMsRUFBRSxHQUFHLElBQUksRUFBRSxRQUFRLGNBQWEsRUFBRSxFQUFFLFFBQVEsY0FBYSxLQUFLO0FBQUEsVUFBQyxHQUFFLEdBQUUsU0FBUyxJQUFHO0FBQUMsb0JBQU8sR0FBRyxJQUFFLElBQUUsTUFBSSxPQUFLLElBQUksS0FBSyxNQUFNLEtBQUssSUFBSSxHQUFHLENBQUMsSUFBRSxFQUFFLElBQUUsTUFBSSxLQUFLLElBQUksR0FBRyxDQUFDLElBQUUsSUFBRyxDQUFDO0FBQUEsVUFBQyxHQUFFLEdBQUUsU0FBUyxJQUFHO0FBQUMsb0JBQU8sR0FBRyxJQUFFLElBQUUsTUFBSSxPQUFLLElBQUksS0FBSyxNQUFNLEtBQUssSUFBSSxHQUFHLENBQUMsSUFBRSxFQUFFLEdBQUUsQ0FBQyxJQUFFLE1BQUksSUFBSSxLQUFLLE1BQU0sS0FBSyxJQUFJLEdBQUcsQ0FBQyxJQUFFLEVBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxHQUFFLEdBQUUsU0FBUyxJQUFHO0FBQUMsbUJBQU0sQ0FBQyxNQUFLLE1BQUssTUFBSyxJQUFJLEVBQUUsR0FBRyxJQUFFLEtBQUcsSUFBRSxLQUFHLEdBQUcsSUFBRSxNQUFJLEdBQUcsSUFBRSxNQUFJLE1BQUksR0FBRyxJQUFFO0FB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QVUsU0FBUyxhQUFhLFFBQVEsVUFBVSxTQUFTLFNBQVMsU0FBUyxTQUFTLE9BQU8sV0FBVyxRQUFRLFFBQVEsWUFBWSxVQUFVLFdBQVcsYUFBYSxPQUFPLFVBQVUsUUFBUSxTQUFTLFdBQVcsU0FBUyxZQUFZLFdBQVcsUUFBUSxnQkFBZ0IsUUFBUSxRQUFRLFFBQVEsU0FBUyxZQUFZLE1BQU0sYUFBYSxNQUFNLGFBQWEsYUFBYSxhQUFhLFNBQVMsYUFBYSxjQUFjLE9BQU8sWUFBWSxXQUFXLFNBQVMsU0FBUyxlQUFlLFVBQVUsT0FBTyxXQUFXLGFBQWEsZ0JBQWdCLFlBQVksUUFBUSxNQUFNLFVBQVUsYUFBYSxXQUFXLE9BQU8sUUFBUSxRQUFRLE9BQU8sU0FBUyxZQUFZLFNBQVMsV0FBVyxZQUFZLFdBQVcsU0FBUyxRQUFRLFFBQVEsWUFBWSxNQUFNLFNBQVMsYUFBYSxVQUFVLGFBQWEsa0JBQWtCLFdBQVcsWUFBWSxRQUFRLFdBQVcsWUFBWSxRQUFRLFFBQVEsU0FBUyxjQUFjLFNBQVMsZ0JBQWdCLE9BQU8sWUFBWSxVQUFVLFNBQVMsVUFBVSxlQUFlLGdCQUFnQixPQUFPLFVBQVUsV0FBVyxZQUFZLE9BQU8sUUFBUSxZQUFZLFVBQVUsU0FBUyxVQUFVLFlBQVksT0FBTyxZQUFZLFdBQVcsU0FBUyxTQUFTLE9BQU8sYUFBYSxXQUFXLE1BQU0sV0FBVyxXQUFXLFlBQVksY0FBYyxjQUFjLGNBQWMsUUFBUSxXQUFXLGFBQWEsY0FBYyxPQUFPLFFBQVEsVUFBVSxTQUFTLFdBQVcsWUFBWSxRQUFRLGdCQUFnQixNQUFNLFVBQVUsT0FBTyxhQUFhLE1BQU0sUUFBUSxRQUFRLGdCQUFnQixZQUFZLFVBQVUsU0FBUyxPQUFPLFNBQVMsUUFBUSxZQUFZLFdBQVcsY0FBYyxXQUFXLFVBQVUsWUFBWSxhQUFhLFFBQVEsYUFBYSxlQUFlLGdCQUFnQixjQUFjLFlBQVksUUFBUSxtQkFBbUIsbUJBQW1CLGdCQUFnQixhQUFhLFFBQVEsWUFBWSxTQUFTLGFBQWEsV0FBVyxXQUFXLFdBQVcsVUFBVSxjQUFjLGFBQWEs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LE1BQU0sQ0FBQyxNQUFNLFFBQVEsTUFBTSxnQ0FBZ0MsQ0FBQyxDQUFDO0FBQUEsTUFDbEU7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLFNBQU8sVUFBVSxNQUFNO0FBQ3JCLFdBQ0csS0FBSyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQ3ZCLEtBQUssQ0FBQyxjQUFjO0FBQ25CLHNCQUFnQjtBQUFBLFFBQ2Q7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNILENBQUMsRUFDQSxNQUFNLENBQUMsTUFBTSxRQUFRLE1BQU0sd0NBQXdDLENBQUMsQ0FBQztBQUN4RSxVQUFNLHNCQUFzQixhQUFhO0FBQUEsTUFDdkM7QUFBQSxJQUNGO0FBQ0EsUUFBSSxxQkFBcUI7QUFDdkIsVUFBSTtBQUNGLHVCQUFlLElBQUksS0FBSyxNQUFNLG1CQUFtQixDQUFDO0FBQUEsTUFDcEQsU0FBUyxLQUFQO0FBQ0EsZ0JBQVEsTUFBTSxvREFBb0Q7QUFBQSxNQUNwRTtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUM7QUFFRCxTQUFPO0FBQUEsSUFDTCxPQUFPO0FBQUEsSUFDUDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogWyJtb2R1bGUiLCAiX3R5cGVvZiIsICJvYmoiLCAiZ2xvYmFsIiwgImRhdGVGb3JtYXQiLCAiXyIsICJEIiwgInkiLCAicGFkIiwgImdldERheU5hbWUiLCAidG9kYXlfZCIsICJ0b2RheV9tIiwgInRvZGF5X3kiLCAieWVzdGVyZGF5X2QiLCAieWVzdGVyZGF5X20iLCAieWVzdGVyZGF5X3kiLCAidG9tb3Jyb3dfZCIsICJ0b21vcnJvd19tIiwgInRvbW9ycm93X3kiLCAiZ2V0V2VlayIsICJnZXREYXlPZldlZWsiLCAia2luZE9mIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIlN5bWJvbCIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJTeW1ib2wiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJTeW1ib2wiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAiU3ltYm9sIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJJbmRlbnRhdGlvbiIsICJtb2R1bGUiLCAiSW5saW5lQmxvY2siLCAibW9kdWxlIiwgIlBhcmFtcyIsICJtb2R1bGUiLCAiRm9ybWF0dGVyIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJQcm9taXNlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIlByb21pc2UiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIkJ1ZmZlciIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAiVG9rZW5pemVyIiwgIm1vZHVsZSIsICJEYjJGb3JtYXR0ZXIiLCAibW9kdWxlIiwgIk4xcWxGb3JtYXR0ZXIiLCAibW9kdWxlIiwgIlBsU3FsRm9ybWF0dGVyIiwgIm1vZHVsZSIsICJTdGFuZGFyZFNxbEZvcm1hdHRlciIsICJtb2R1bGUiLCAiaW1wb3J0X2ZsaXBwZXJfcGx1Z2luIiwgImUiLCAiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9hbnRkIiwgImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2ZsaXBwZXJfcGx1Z2luIiwgImltcG9ydF9hbnRkIiwgIlJlYWN0IiwgIk1hbmFnZWREYXRhSW5zcGVjdG9yIiwgImltcG9ydF9mbGlwcGVyX3BsdWdpbiIsICJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAiY29sdW1ucyIsICJyb3dzIiwgImluZGV4ZXNDb2x1bW5zIiwgImluZGV4ZXNWYWx1ZXMiLCAiaW1wb3J0X2ZsaXBwZXJfcGx1Z2luIiwgImltcG9ydF9hbnRkIiwgImltcG9ydF9pY29ucyIsICJUZXh0IiwgIlJlYWN0IiwgIkRhdGFUYWJsZSIsICJzdGF0ZSIsICJyb3ciLCAic3FsRm9ybWF0dGVyIiwgImRhdGVGb3JtYXQiLCAic3RhdGUiXQp9Cg==
