import React from 'react';

const SelectInput = ({ data }) => {
  const { id, name, className, value, multiple, disabled, readOnly, style, onChange = () => {}, options = [] } = data;
  // [코드리뷰] multiple onchange 로직 협의해서 수정 필요.
  // 20200306 현재 BannerAddRegionMoal.js에서만 사용 onChange 수정 필요
  return (
    <select
      id={id}
      name={name}
      className={className}
      value={value}
      multiple={multiple}
      disabled={disabled}
      readOnly={readOnly}
      style={style}
      onChange={e => onChange(e, id || name, e.target.value)}
    >
      {options.map((v, i) => {
        return (
          <option key={i} value={v.value} disabled={v.disabled} selected={v.selected} hidden={v.hidden}>
            {v.label}
          </option>
        );
      })}
    </select>
  );
};

export default SelectInput;
