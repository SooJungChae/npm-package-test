import React from 'react';
// import { isMatchText } from 'page/event/utils/common';

const TextInput = ({ data }) => {
  const {
    id,
    name,
    className,
    placeholder,
    value = '',
    minLength,
    maxLength,
    pattern,
    disabled,
    readOnly,
    onBlur = () => {},
    onFocus = () => {},
    onChange = () => {},
  } = data;

  const handleChange = (e, id, value) => {
    if (pattern) {
      // if (isMatchText(pattern, value)) {
        onChange(e, id, value);
        return;
      // }
    }

    onChange(e, id, value);
  };

  const handleKeyOown = (e, id, value) => {
    if (pattern) {
      const { key, keyCode } = e;

      if (key === 'ArrowRight' || keyCode === 39) return;
      if (key === 'ArrowLeft' || keyCode === 37) return;
      if (key === 'Backspace' || keyCode === 8) return;
      if (key === 'Enter' || keyCode === 13) return;

      // if (!isMatchText(pattern, key)) e.preventDefault();
    }
  };

  return (
    <input
      type="text"
      id={id}
      name={name}
      className={className}
      placeholder={placeholder}
      value={value}
      minLength={minLength}
      maxLength={maxLength}
      disabled={disabled}
      readOnly={readOnly}
      onBlur={e => onBlur(e, id, e.target.value)}
      onFocus={e => onFocus(e, id, e.target.value)}
      onChange={e => handleChange(e, id, e.target.value)}
      onKeyDown={e => handleKeyOown(e, id, e.target.value)}
    />
  );
};

export default TextInput;
