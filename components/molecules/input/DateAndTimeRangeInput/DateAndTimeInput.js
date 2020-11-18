import React from 'react';
import { Input } from 'components/molecules';

const DateAndTimeInput = ({ dateId, placeholder, timeId, values, minuteBy, onChange }) => {
  const date = values[dateId];
  const time = values[timeId];

  const handleChangeDate = (id, value) => {
    onChange({ [id]: value, [timeId]: '00:00:00' });
  };

  const handleChangeTime = (e, id, value) => {
    onChange({ ...values, [id]: value });
  };

  return (
    <>
      <Input
        type="date"
        id={dateId}
        value={date === '9999-12-31' ? '' : date}
        disabled={date === '9999-12-31'}
        placeholder={placeholder}
        onChange={handleChangeDate}
      />
      <Input
        type="time"
        id={timeId}
        value={date === '9999-12-31' ? '' : time}
        disabled={date === '9999-12-31' || date === ''}
        minuteBy={minuteBy}
        max
        seconds
        onChange={handleChangeTime}
      />
    </>
  );
};

export default DateAndTimeInput;
