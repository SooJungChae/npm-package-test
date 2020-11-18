import React from 'react';
// import { Debug } from 'library/Debug';

const Checkbox = ({ id, name, className, children, ...other }) => {
  return (
    <label htmlFor={id} className={className}>
      <input type="checkbox" id={id} name={name} {...other} />
      <i />
      <span className="txt-check">{children}</span>
    </label>
  );
};

const CheckboxInput = ({ data }) => {
  const { id, name, className = 'lab-check', align = 'horizontal', onChange = () => {}, options = [], disabled } = data;
  const { length } = options;
  const randomID = Math.random()
    .toString(36)
    .substring(2);
  let value = [];

  const handleChange = (e, i) => {
    const type = length > 1 ? 'group' : 'single';
    value = type === 'group' ? [] : '';

    options[i].checked = options[i].checked !== true;

    options.forEach(v => {
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

  const getID = (globalID, localID, randomID, index) => {
    if (typeof localID === 'number') return (globalID || name || randomID) + localID;
    if (localID) return localID;
    if (globalID || name) return length > 1 ? (globalID || name) + index : globalID || name;
  };

  if (align === 'vertical') {
    return (
      <ul className="list-check">
        {options.map((v, i) => {
          const labelId = getID(id, v.id || v.ID, randomID, i);

          return (
            <li key={v.value}>
              <Checkbox
                id={labelId}
                name={name}
                className={className}
                value={v.value}
                checked={v.checked}
                disabled={disabled}
                onChange={e => handleChange(e, i)}
              >
                {v.label}
              </Checkbox>
            </li>
          );
        })}
      </ul>
    );
  }

  return options.map((v, i) => {
    const labelId = getID(id, v.id || v.ID, randomID, i);

    return (
      <Checkbox
        // key={v.value} -> 루프로 그려지는 체크박스의 경우, 키 중복으로 인한 수정
        key={labelId}
        id={labelId}
        name={name}
        className={className}
        value={v.value}
        checked={v.checked}
        disabled={disabled}
        onChange={e => handleChange(e, i)}
      >
        {v.label}
      </Checkbox>
    );
  });
};

export default CheckboxInput;
