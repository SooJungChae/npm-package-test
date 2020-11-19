/* eslint-disable import/no-cycle */
import React from 'react';
import TextInput from './TextInput';
import CheckboxInput from './CheckboxInput';
// import CheckboxGroupInput from './CheckboxGroupInput';
import CheckboxButtonGroup from './CheckboxButtonGroup';
// import Radio from './RadioInput';
// import RadioGroup from './RadioGroupInput';
// import DateInput from './DateInput';
// import DateRangeInput from './DateRangeInput';
// import DateAndTimeRangeInput from './DateAndTimeRangeInput';
// import DateWithTimeRangeInput from './DateWithTimeRangeInput';
// import EmailInput from './EmailInput';
// import ExposureInput from './ExposureInput';
// import FileInput from './FileInput';
// import ImgFileInput from './ImgFileInput';
// import NumberInput from './NumberInput';
// import SearchInput from './SearchInput';
// import SearchInputWidthButton from './SearchInputWidthButton';
// import SelectInput from './SelectInput';
// import PriceInput from './PriceInput';
// import TimeInput from './TimeInput';
// import ToggleInput from './ToggleInput';
// import TextArea from './TextArea';
// import WeekdayInput from './WeekdayInput';
// import NumberCommaInput from './NumberCommaInput';

/**
 * Index Compoent
 * @param {object} props
 * @return {Component} Index Compoent
 */

const Input = props => {
  const { type } = props;

  switch (type) {
    case 'checkbox':
      return <CheckboxInput data={props} />;
    // case 'checkboxGroup':
    //   return <CheckboxGroupInput data={props} />;
    case 'checkboxButtonGroup':
      return <CheckboxButtonGroup data={props} />;
    // case 'radio':
    //   return <Radio data={props} />;
    // case 'radioGroup':
    //   return <RadioGroup data={props} />;
    // case 'date':
    //   return <DateInput data={props} />;
    // case 'daterange':
    //   return <DateRangeInput data={props} />;
    // case 'dateAndTimeRange':
    //   return <DateAndTimeRangeInput data={props} />;
    // case 'dateWithTimeRange':
    //   return <DateWithTimeRangeInput data={props} />;
    // case 'email':
    //   return <EmailInput data={props} />;
    // case 'exposure':
    // case 'displayType':
    //   return <ExposureInput data={props} />;
    // case 'file':
    //   return <FileInput data={props} />;
    // case 'img':
    //   return <ImgFileInput data={props} />;
    // case 'number':
    //   return <NumberInput data={props} />;
    // case 'numberComma':
    //   return <NumberCommaInput data={props} />;
    // case 'searchWidthButton':
    //   return <SearchInputWidthButton data={props} />;
    // case 'search':
    //   return <SearchInput data={props} />;
    // case 'select':
    //   return <SelectInput data={props} />;
    // case 'price':
    //   return <PriceInput data={props} />;
    // case 'time':
    //   return <TimeInput data={props} />;
    // case 'toggle':
    //   return <ToggleInput data={props} />;
    // case 'textArea':
    //   return <TextArea data={props} />;
    // case 'weekday':
    //   return <WeekdayInput data={props} />;
    default:
      return <TextInput data={props} />;
  }
};

export default Input;
