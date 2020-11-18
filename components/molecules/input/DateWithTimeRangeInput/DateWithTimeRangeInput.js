import React from 'react';
import moment from 'moment';
import DateWithTimeInput from './DateWithTimeInput';
import IsEndDateCheckboxInput from './IsEndDateCheckboxInput';

/**
 * 시작일/종료일
 * @description time이 date와 하나로 오는경우 - ex) date: 'YYYY-MM-DD HH:mm:ss'
 * @param {string} startDateId - 'startDate'
 * @param {string} startDate - 'YYYY-MM-DD HH:mm:ss'
 * @param {string} startDatePlaceholder - '시작일'
 * @param {string} endDateId - 'endDate'
 * @param {string} endDate - 'YYYY-MM-DD HH:mm:ss'
 * @param {string} endDatePlaceholder - '종료일'
 * @param {string} isEndDateId
 * @param {0|1} isEndDate
 * @param {int} minuteBy - 10
 * @param {function} onChange
 * @return {object} { [startDateId]: 'YYYY-MM-DD HH:mm:ss', [endDateId]: 'YYYY-MM-DD HH:mm:ss', [isEndDateId]: isEndDate}
 */
const DateWithTimeRangeInput = ({ data }) => {
  const {
    startDateId = 'startDate',
    startDate = '',
    startDatePlaceholder = '시작일',
    endDateId = 'endDate',
    endDate = '',
    endDatePlaceholder = '종료일',
    isEndDateId,
    isEndDate,
    minuteBy = 10,
    onChange = () => {},
  } = data;

  const handleChangeDateWithTime = (id, value) => {
    const start = id === startDateId ? value : startDate;
    const end = id === endDateId ? value : endDate;

    if (moment(end).isBefore(start)) {
      alert(`${endDatePlaceholder}이 ${startDatePlaceholder}보다 빠름으로 선택할 수 없습니다.`);
    } else {
      onChange({ [startDateId]: startDate, [endDateId]: endDate, [id]: value });
    }
  };

  const handleChangeIsEndDate = (id, checked) => {
    const value = { [startDateId]: startDate, [endDateId]: checked ? '9999-12-31 23:59:59' : '' };

    if (isEndDateId) {
      value[id] = checked ? 1 : 0;
    }

    onChange(value);
  };

  return (
    <div className="inp-group">
      <DateWithTimeInput
        id={startDateId}
        value={startDate}
        placeholder={startDatePlaceholder}
        minuteBy={minuteBy}
        onChange={handleChangeDateWithTime}
      />
      <span className="txt-inp">~</span>
      <DateWithTimeInput
        id={endDateId}
        value={endDate}
        placeholder={endDatePlaceholder}
        minuteBy={minuteBy}
        onChange={handleChangeDateWithTime}
      />
      <IsEndDateCheckboxInput
        id={isEndDateId}
        checked={isEndDateId ? isEndDate === 1 : endDate === '9999-12-31 23:59:59'}
        onChange={handleChangeIsEndDate}
      />
    </div>
  );
};

export default DateWithTimeRangeInput;
