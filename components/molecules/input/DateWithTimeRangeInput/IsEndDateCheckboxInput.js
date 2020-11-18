import React from 'react';

const IsEndDateCheckboxInput = ({ id = 'isEndDate', value = 1, checked = false, onChange = () => {} }) => {
  const handleChange = e => {
    const { id, checked } = e.target;
    onChange(id, checked);
  };

  return (
    <span className="txt-inp">
      <label className="lab-check">
        <input type="checkbox" id={id} value={value} checked={checked} onChange={handleChange} />
        <i />
        <span className="txt-check">종료일 없음</span>
      </label>
    </span>
  );
};

export default IsEndDateCheckboxInput;
