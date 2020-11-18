import React from 'react';
import RadioInput from './RadioInput';

const RadioGroupInput = ({ data }) => {
  return <RadioInput data={{ ...data, align: 'vertical' }} />;
};

export default RadioGroupInput;
