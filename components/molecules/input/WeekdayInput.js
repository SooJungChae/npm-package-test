import React, { useState, useEffect } from 'react';
import { Input } from 'components/molecules';

/**
 * WeekdayInput
 * @param {Object} {data}
 * @param {String} {data.name} *필수
 * @param {String} {data.className}
 * @param {String} {data.controller}
 * @param {Array} {data.value} *필수 (무조건 0, 1 값으로 들어와야 한다. ex) [0,0,0,0,1])
 * @param {function} {data.onChange} *필수
 * @return {(e, name, value)} e, name, value
 * @example
 * <Input type="weekday" name={String} className={String} controller="all" value={Array} onChange={function} />
 */

const WeekdayInput = ({ data }) => {
  const { name, className, controller, value = [0, 0, 0, 0, 0, 0, 0], onChange = () => {}, disabled } = data;
  const options = [
    { label: '월', value: 0, checked: value[0] * 1 },
    { label: '화', value: 1, checked: value[1] * 1 },
    { label: '수', value: 2, checked: value[2] * 1 },
    { label: '목', value: 3, checked: value[3] * 1 },
    { label: '금', value: 4, checked: value[4] * 1 },
    { label: '토', value: 5, checked: value[5] * 1 },
    { label: '일', value: 6, checked: value[6] * 1 },
  ];

  const [checked, setChecked] = useState(false);

  const handleChange = (e, name) => {
    const { checked } = e.target;
    value[e.target.value] = checked ? 1 : 0;
    const sum = value.reduce((prev, curr) => prev + curr, -6);

    setChecked(sum > 0);
    onChange(e, name, value);
  };

  const checkedAll = (e, name) => {
    const { checked } = e.target;
    const newValue = value.map(() => (checked ? 1 : 0));

    setChecked(checked);
    onChange(e, name, newValue);
  };

  useEffect(() => {
    const sum = value.reduce((prev, curr) => prev + curr, -6);

    setChecked(sum > 0);
  }, [value]);

  if (controller === 'all') {
    return (
      <div className={`inp-group${className ? ` ${className}` : ''}`}>
        <Input type="checkboxButtonGroup" name={name} options={options} onChange={handleChange} />
        <div className="txt-inp">
          <Input
            type="checkbox"
            name={name}
            options={[{ label: '전체 요일 적용', value: 1, checked }]}
            onChange={checkedAll}
          />
        </div>
      </div>
    );
  }

  return (
    <Input
      type="checkboxButtonGroup"
      className={className}
      name={name}
      options={options}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};

export default WeekdayInput;
