"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

module.exports = Promise.resolve().then(function () {
  return _interopRequireWildcard(require('./molecules'));
});
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "SooInput", {
  enumerable: true,
  get: function get() {
    return _SooInput["default"];
  }
});

var _SooInput = _interopRequireDefault(require("./input/SooInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _SooTextInput = _interopRequireDefault(require("./SooTextInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable import/no-cycle */

/**
 * SooInput Compoent
 * @param {object} props
 * @return {Component} SooInput Compoent
 */
var SooInput = function SooInput(props) {
  return /*#__PURE__*/React.createElement(_SooTextInput["default"], {
    data: props
  });
};

var _default = SooInput;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _common = require("page/event/utils/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SooTextInput = function SooTextInput(_ref) {
  var data = _ref.data;

  var id = data.id,
      name = data.name,
      className = data.className,
      placeholder = data.placeholder,
      _data$value = data.value,
      value = _data$value === void 0 ? '' : _data$value,
      minLength = data.minLength,
      maxLength = data.maxLength,
      pattern = data.pattern,
      disabled = data.disabled,
      readOnly = data.readOnly,
      _data$onBlur = data.onBlur,
      _onBlur = _data$onBlur === void 0 ? function () {} : _data$onBlur,
      _data$onFocus = data.onFocus,
      _onFocus = _data$onFocus === void 0 ? function () {} : _data$onFocus,
      _data$onChange = data.onChange,
      onChange = _data$onChange === void 0 ? function () {} : _data$onChange;

  var handleChange = function handleChange(e, id, value) {
    if (pattern) {
      if ((0, _common.isMatchText)(pattern, value)) {
        onChange(e, id, value);
        return;
      }
    }

    onChange(e, id, value);
  };

  var handleKeyOown = function handleKeyOown(e, id, value) {
    if (pattern) {
      var key = e.key,
          keyCode = e.keyCode;
      if (key === 'ArrowRight' || keyCode === 39) return;
      if (key === 'ArrowLeft' || keyCode === 37) return;
      if (key === 'Backspace' || keyCode === 8) return;
      if (key === 'Enter' || keyCode === 13) return;
      if (!(0, _common.isMatchText)(pattern, key)) e.preventDefault();
    }
  };

  return /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    id: id,
    name: name,
    className: className,
    placeholder: placeholder,
    value: value,
    minLength: minLength,
    maxLength: maxLength,
    disabled: disabled,
    readOnly: readOnly,
    onBlur: function onBlur(e) {
      return _onBlur(e, id, e.target.value);
    },
    onFocus: function onFocus(e) {
      return _onFocus(e, id, e.target.value);
    },
    onChange: function onChange(e) {
      return handleChange(e, id, e.target.value);
    },
    onKeyDown: function onKeyDown(e) {
      return handleKeyOown(e, id, e.target.value);
    }
  });
};

var _default = SooTextInput;
exports["default"] = _default;
