import React from 'react';

const Radio = ({ id, name, className, required, children, ...other }) => {
  return (
    <label htmlFor={id} className={className}>
      <input type="radio" id={id} name={name} {...other} />
      <i />
      <span className="txt-check">{children}</span>
      {required && <span style={{ color: '#d84315' }}>*</span>}
    </label>
  );
};

const RadioInput = ({ data }) => {
  const { id, name, className = 'lab-check', value, align = 'horizontal', onChange = () => {}, options = [] } = data;
  const randomID = Math.random()
    .toString(36)
    .substring(2);

  const getID = (globalID, localID, randomID, index) => {
    if (typeof localID === 'number') return (globalID || name || randomID) + localID;
    if (localID) return localID;
    if (globalID || name) return (globalID || name) + index;
  };

  if (align === 'vertical') {
    return (
      <ul className="list-check">
        {options.map((v, i) => {
          const labelId = getID(id, v.id || v.ID, randomID, i);

          return (
            <li key={v.value}>
              <Radio
                id={labelId}
                name={name}
                className={className}
                value={v.value}
                checked={String(v.value) === String(value)}
                disabled={v.disabled}
                required={v.required}
                onChange={e => onChange(e, id || name, e.target.value)}
              >
                {v.label}
              </Radio>
            </li>
          );
        })}
      </ul>
    );
  }

  return options.map((v, i) => {
    const labelId = getID(id, v.id || v.ID, randomID, i);

    return (
      <Radio
        key={v.value}
        id={labelId}
        name={name}
        className={className}
        value={v.value}
        checked={String(v.value) === String(value)}
        disabled={v.disabled}
        required={v.required}
        onChange={e => onChange(e, id || name, e.target.value)}
      >
        {v.label}
      </Radio>
    );
  });
};

export default RadioInput;
