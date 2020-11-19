import React from 'react';

var TextInput = function TextInput(_ref) {
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
      // if (isMatchText(pattern, value)) {
      onChange(e, id, value);
      return; // }
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
      if (key === 'Enter' || keyCode === 13) return; // if (!isMatchText(pattern, key)) e.preventDefault();
    }
  };

  return /*#__PURE__*/React.createElement("input", {
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

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var Checkbox = function Checkbox(_ref) {
  var id = _ref.id,
      name = _ref.name,
      className = _ref.className,
      children = _ref.children,
      other = _objectWithoutProperties(_ref, ["id", "name", "className", "children"]);

  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    className: className
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    id: id,
    name: name
  }, other)), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("span", {
    className: "txt-check"
  }, children));
};

var CheckboxInput = function CheckboxInput(_ref2) {
  var data = _ref2.data;
  var id = data.id,
      name = data.name,
      _data$className = data.className,
      className = _data$className === void 0 ? 'lab-check' : _data$className,
      _data$align = data.align,
      align = _data$align === void 0 ? 'horizontal' : _data$align,
      _data$onChange = data.onChange,
      onChange = _data$onChange === void 0 ? function () {} : _data$onChange,
      _data$options = data.options,
      options = _data$options === void 0 ? [] : _data$options,
      disabled = data.disabled;
  var length = options.length;
  var randomID = Math.random().toString(36).substring(2);
  var value = [];

  var handleChange = function handleChange(e, i) {
    var type = length > 1 ? 'group' : 'single';
    value = type === 'group' ? [] : '';
    options[i].checked = options[i].checked !== true;
    options.forEach(function (v) {
      if (v.checked) {
        if (type === 'group') {
          value.push(v.value);
        } else {
          value = v.value;
        }
      }
    });
    return onChange(e, id || name, value);
  };

  var getID = function getID(globalID, localID, randomID, index) {
    if (typeof localID === 'number') return (globalID || name || randomID) + localID;
    if (localID) return localID;
    if (globalID || name) return length > 1 ? (globalID || name) + index : globalID || name;
  };

  if (align === 'vertical') {
    return /*#__PURE__*/React.createElement("ul", {
      className: "list-check"
    }, options.map(function (v, i) {
      var labelId = getID(id, v.id || v.ID, randomID, i);
      return /*#__PURE__*/React.createElement("li", {
        key: v.value
      }, /*#__PURE__*/React.createElement(Checkbox, {
        id: labelId,
        name: name,
        className: className,
        value: v.value,
        checked: v.checked,
        disabled: disabled,
        onChange: function onChange(e) {
          return handleChange(e, i);
        }
      }, v.label));
    }));
  }

  return options.map(function (v, i) {
    var labelId = getID(id, v.id || v.ID, randomID, i);
    return /*#__PURE__*/React.createElement(Checkbox // key={v.value} -> 루프로 그려지는 체크박스의 경우, 키 중복으로 인한 수정
    , {
      key: labelId,
      id: labelId,
      name: name,
      className: className,
      value: v.value,
      checked: v.checked,
      disabled: disabled,
      onChange: function onChange(e) {
        return handleChange(e, i);
      }
    }, v.label);
  });
};

/* eslint-disable import/no-cycle */
// import CheckboxButtonGroup from './CheckboxButtonGroup';
// import Radio from './RadioInput';
// import RadioGroup from './RadioGroupInput';
// import DateInput from './DateInput';
// import DateRangeInput from './DateRangeInput';
// import DateAndTimeRangeInput from './DateAndTimeRangeInput';
// import DateWithTimeRangeInput from './DateWithTimeRangeInput';
// import EmailInput from './EmailInput';
// import ExposureInput from './ExposureInput';
// import FileInput from './FileInput';
// import ImgFileInput from './ImgFileInput';
// import NumberInput from './NumberInput';
// import SearchInput from './SearchInput';
// import SearchInputWidthButton from './SearchInputWidthButton';
// import SelectInput from './SelectInput';
// import PriceInput from './PriceInput';
// import TimeInput from './TimeInput';
// import ToggleInput from './ToggleInput';
// import TextArea from './TextArea';
// import WeekdayInput from './WeekdayInput';
// import NumberCommaInput from './NumberCommaInput';

/**
 * Input Compoent
 * @param {object} props
 * @return {Component} Input Compoent
 */

var Input = function Input(props) {
  var type = props.type;

  switch (type) {
    case 'checkbox':
      return /*#__PURE__*/React.createElement(CheckboxInput, {
        data: props
      });
    // case 'checkboxGroup':
    //   return <CheckboxGroupInput data={props} />;
    // case 'checkboxButtonGroup':
    //   return <CheckboxButtonGroup data={props} />;
    // case 'radio':
    //   return <Radio data={props} />;
    // case 'radioGroup':
    //   return <RadioGroup data={props} />;
    // case 'date':
    //   return <DateInput data={props} />;
    // case 'daterange':
    //   return <DateRangeInput data={props} />;
    // case 'dateAndTimeRange':
    //   return <DateAndTimeRangeInput data={props} />;
    // case 'dateWithTimeRange':
    //   return <DateWithTimeRangeInput data={props} />;
    // case 'email':
    //   return <EmailInput data={props} />;
    // case 'exposure':
    // case 'displayType':
    //   return <ExposureInput data={props} />;
    // case 'file':
    //   return <FileInput data={props} />;
    // case 'img':
    //   return <ImgFileInput data={props} />;
    // case 'number':
    //   return <NumberInput data={props} />;
    // case 'numberComma':
    //   return <NumberCommaInput data={props} />;
    // case 'searchWidthButton':
    //   return <SearchInputWidthButton data={props} />;
    // case 'search':
    //   return <SearchInput data={props} />;
    // case 'select':
    //   return <SelectInput data={props} />;
    // case 'price':
    //   return <PriceInput data={props} />;
    // case 'time':
    //   return <TimeInput data={props} />;
    // case 'toggle':
    //   return <ToggleInput data={props} />;
    // case 'textArea':
    //   return <TextArea data={props} />;
    // case 'weekday':
    //   return <WeekdayInput data={props} />;

    default:
      return /*#__PURE__*/React.createElement(TextInput, {
        data: props
      });
  }
};

var DummyComponent = function DummyComponent() {
  return /*#__PURE__*/React.createElement("div", null, "I am a dummy react npm module!", /*#__PURE__*/React.createElement(Input, null));
};

export default DummyComponent;
