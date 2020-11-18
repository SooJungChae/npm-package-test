import React from 'react';
import { isPercentFormat } from 'page/event/utils/common';

const NumberInput = ({ data }) => {
  const {
    id,
    name,
    className,
    placeholder,
    value = '',
    max,
    maxLength,
    validation,
    disabled,
    readOnly,
    onBlur = () => {},
    onFocus = () => {},
    onChange = () => {},
  } = data;

  const handleChange = e => {
    let val = e.target.value;

    if (val) {
      e.target.value = Number(val); // 00000 입력 막기

      if (max) {
        if (val * 1 > max * 1) {
          val = value;
          e.target.value = val;
        }
      }

      if (maxLength) {
        if (val.length > maxLength * 1) {
          val = value;
          e.target.value = val;
        }
      }

      if (validation === 'percent') {
        if (!isPercentFormat(val)) {
          val = value;
          e.target.value = val;
        }
      }
    }

    onChange(e, id, val);
  };

  return (
    <input
      type="number"
      inputMode="numeric"
      pattern="[0-9]*"
      name={name}
      className={className}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      readOnly={readOnly}
      onBlur={e => onBlur(e, id)}
      onFocus={e => onFocus(e, id)}
      onChange={e => handleChange(e)}
    />
  );
};

export default NumberInput;
