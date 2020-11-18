import React, { useState, useEffect } from 'react';

const EmailInput = ({ data }) => {
  const [state, setState] = useState({
    id: null,
    name: null,
    className: null,
    placeholder: null,
    value: '',
    maxLength: 100,
    disabled: false,
    readOnly: false,
    autoComplete: 'on',
    onBlur: () => {},
    onFocus: () => {},
    onChange: () => {},
  });

  const {
    id,
    name,
    className,
    placeholder,
    value = '',
    maxLength,
    disabled,
    readOnly,
    autoComplete,
    onBlur,
    onFocus,
    onChange,
  } = state;

  useEffect(() => {
    if (!data) return;

    setState({
      ...state,
      ...data,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <input
      type="text"
      id={id}
      name={name}
      className={className}
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      disabled={disabled}
      readOnly={readOnly}
      autoComplete={autoComplete}
      onBlur={e => onBlur(id)}
      onFocus={e => onFocus(id)}
      onChange={e => onChange(id, e.target.value)}
    />
  );
};

export default EmailInput;
