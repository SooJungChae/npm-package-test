import React, { useMemo } from 'react';
import moment from 'moment';
import { Input } from 'components/molecules';

const DateWithTimeInput = ({ id, value, placeholder, minuteBy, onChange }) => {
  const computeExpensiveValue = value => {
    const m = moment(value);
    const { _isValid } = m;

    if (_isValid) {
      const date = m.format('YYYY-MM-DD');
      const time = m.format('HH:mm:ss');

      return {
        date,
        time,
        disabled: date === '' || date === '9999-12-31',
      };
    }

    return {
      date: '',
      time: '',
      disabled: true,
    };
  };

  const memoizedValue = useMemo(() => computeExpensiveValue(value), [value]);
  const { date, time, disabled } = memoizedValue;

  const handleChangeDate = (id, value) => {
    const newValue = value === '' ? '' : moment(`${value} ${time || '00:00:00'}`).format('YYYY-MM-DD HH:mm:ss');
    onChange(id, newValue);
  };

  const handleChangeTime = (e, name, value) => {
    onChange(name, moment(`${date} ${value}`).format('YYYY-MM-DD HH:mm:ss'));
  };

  return (
    <>
      <Input
        type="date"
        id={id}
        value={date === '9999-12-31' ? '' : date}
        disabled={date === '9999-12-31'}
        placeholder={placeholder}
        onChange={handleChangeDate}
      />
      <Input
        type="time"
        name={id}
        value={value === '9999-12-31 23:59:59' ? '' : time}
        disabled={disabled}
        minuteBy={minuteBy}
        max
        seconds
        onChange={handleChangeTime}
      />
    </>
  );
};

export default DateWithTimeInput;
