import React from 'react';
import { numberWithCommas } from 'library/Utils';
import SelectInput from './SelectInput';

/**
 * PriceInput
 * @param {number} min - 1000
 * @param {number} max - 10000
 * @param {number} unit - default 500원 단위로 항목 노출
 * @param {string} placeholder
 */
const PriceInput = ({ data }) => {
  const { min = 1000, max = 10000, unit = 500, placeholder } = data;
  const options = [];

  if (placeholder) {
    options.push({ label: placeholder, value: 0 });
  }

  for (let i = min; i <= max; i += unit) {
    options.push({ label: numberWithCommas(i), value: i });
  }

  return (
    <SelectInput
      data={{
        ...data,
        options,
      }}
    />
  );
};

export default PriceInput;
