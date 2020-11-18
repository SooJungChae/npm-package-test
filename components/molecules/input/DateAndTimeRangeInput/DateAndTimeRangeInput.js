import React from 'react';
import moment from 'moment';
import IsEndDateCheckboxInput from 'components/molecules/input/DateWithTimeRangeInput/IsEndDateCheckboxInput';
import DateAndTimeInput from './DateAndTimeInput';

/**
 * 시작일/종료일
 * @description time이 date와 나눠서 오는경우 - ex) date: 'YYYY-MM-DD', time: 'HH:mm:ss'
 * @param {string} startDateId - 'startDate'
 * @param {string} startDate - 'YYYY-MM-DD'
 * @param {string} startDatePlaceholder - '시작일'
 * @param {string} startTimeId - 'startTime'
 * @param {string} startTime - 'HH:mm:ss'
 * @param {string} endDateId - 'endDate'
 * @param {string} endDate - 'YYYY-MM-DD'
 * @param {string} endDatePlaceholder - '종료일'
 * @param {string} endTimeId - 'endTime'
 * @param {string} endTime - 'HH:mm:ss'
 * @param {string} isEndDateId
 * @param {0|1} isEndDate
 * @param {int} minuteBy - 10
 * @param {function} onChange
 * @return {object}
 * {
 *   [startDateId]: 'YYYY-MM-DD',
 *   [startTimeId]: 'HH:mm:ss',
 *   [endDateId]: 'YYYY-MM-DD HH:mm:ss',
 *   [endTimeId]: 'HH:mm:ss',
 *   [isEndDateId]: isEndDate
 * }
 */
const DateAndTimeRangeInput = ({ data }) => {
  const {
    startDateId = 'startDate',
    startDate = '',
    startDatePlaceholder = '시작일',
    startTimeId = 'startTime',
    startTime = '',
    endDateId = 'endDate',
    endDate = '',
    endDatePlaceholder = '종료일',
    endTimeId = 'endTime',
    endTime = '',
    isEndDateId,
    isEndDate,
    minuteBy = 10,
    onChange = () => {},
  } = data;

  const handleChange = value => {
    const newValue = {
      [startDateId]: startDate,
      [startTimeId]: startTime,
      [endDateId]: endDate,
      [endTimeId]: endTime,
      ...value,
    };
    const isCompare = moment(`${newValue[endDateId]} ${newValue[endTimeId]}`).isBefore(
      `${newValue[startDateId]} ${newValue[startTimeId]}`,
    );

    if (isCompare) {
      alert(`${endDatePlaceholder}이 ${startDatePlaceholder}보다 빠름으로 선택할 수 없습니다.`);
    } else {
      onChange(newValue);
    }
  };

  const handleChangeIsEndDate = (id, checked) => {
    const newValue = {
      [startDateId]: startDate,
      [startTimeId]: startTime,
      [endDateId]: checked ? '9999-12-31' : '',
      [endTimeId]: checked ? '23:59:59' : '',
    };

    if (isEndDateId) {
      newValue[id] = checked ? 1 : 0;
    }

    onChange(newValue);
  };

  return (
    <div className="inp-group">
      <DateAndTimeInput
        dateId={startDateId}
        timeId={startTimeId}
        values={{ [startDateId]: startDate, [startTimeId]: startTime }}
        placeholder={startDatePlaceholder}
        minuteBy={minuteBy}
        onChange={handleChange}
      />
      <span className="txt-inp">~</span>
      <DateAndTimeInput
        dateId={endDateId}
        timeId={endTimeId}
        values={{ [endDateId]: endDate, [endTimeId]: endTime }}
        placeholder={endDatePlaceholder}
        minuteBy={minuteBy}
        onChange={handleChange}
      />
      <IsEndDateCheckboxInput
        id={isEndDateId}
        checked={isEndDateId ? isEndDate === 1 : endDate === '9999-12-31'}
        onChange={handleChangeIsEndDate}
      />
    </div>
  );
};

export default DateAndTimeRangeInput;
