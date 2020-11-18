import React from 'react';

const ToggleInput = ({ data }) => {
  const { id = '', name = '', value = '', className = '', onChange = () => {}, options = [] } = data;

  const optionsList = options.map((v, i) => {
    return (
      <option key={i} value={v.value}>
        {v.label}
      </option>
    );
  });

  return (
    <select id={id} name={name} className={className} value={value} onChange={e => onChange(e, id, e.target.value)}>
      {optionsList}
    </select>
  );
};

export default ToggleInput;
