import React from 'react';
import CheckboxInput from './CheckboxInput';

const CheckboxGroupInput = ({ data }) => {
  return <CheckboxInput data={{ ...data, align: 'vertical' }} />;
};

export default CheckboxGroupInput;
