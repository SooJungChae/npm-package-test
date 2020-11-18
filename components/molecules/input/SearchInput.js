import React from 'react';

const SearchInput = ({ data, children }) => {
  const {
    id,
    name,
    className,
    placeholder,
    value = '',
    maxLength,
    disabled,
    readOnly,
    onBlur = () => {},
    onFocus = () => {},
    onChange = () => {},
  } = data;

  return (
    <div className="inp-group">
      <span className="txt-inp">
        <i className="fa fa-search" />
      </span>
      <input
        type="text"
        id={id}
        name={name}
        className={className}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        disabled={disabled}
        readOnly={readOnly}
        onBlur={e => onBlur(e, id, e.target.value)}
        onFocus={e => onFocus(e, id, e.target.value)}
        onChange={e => onChange(e, id, e.target.value)}
      />
      {children}
    </div>
  );
};

export default SearchInput;
