import React from 'react';
import SelectInput from './SelectInput';

/**
 * 앞에 0 이 붙은 숫자를 만든다.
 * @param {object} target - 변경할 대상
 * @param {int} length - 총 자릿수 (default: 2)
 * @param {string} value - 앞에 붙일 요소 (default: 0)
 */
const fixedSize = (target, length, value) => {
  let len = length;
  let val = value;

  if (typeof len === 'undefined') {
    len = 2;
  }
  if (typeof val === 'undefined') {
    val = '0';
  }

  for (let i = 0; i < length; i += 1) {
    val += val;
  }

  return (val + target).slice(-len);
};

/**
 * 시간 Input
 * @param {string} minuteBy - 지정한 분단위 만큼 설정 가능
 * @param {boolean} max - true 면 24:00 까지 가능. false 면 23:59 가 최대
 * @param {boolean} seconds - 초단위 지정
 * @param {boolean} disableBefore
 * @returns {*}
 * @constructor
 */
const TimeInput = ({ data }) => {
  const { minuteBy = 30, max, seconds = false, disableBefore } = data;
  const options = [];
  let disable = true;

  for (let hour = 0; hour <= 24; hour += 1) {
    if (hour === 24) {
      // max 있으면 24:00 까지 가능
      if (max) {
        options.push({
          label: `${fixedSize(hour)}:${fixedSize(0)}`,
          value: `${fixedSize(23)}:${fixedSize(59)}${seconds ? ':59' : ''}`,
          disabled: disable,
        });
      }

      break;
    }

    for (let minute = 0; minute < 59; minute += 1) {
      const newMinute = minute * minuteBy;

      // '분' 은 59 분까지 가능
      if (newMinute > 59) {
        break;
      }

      const time = `${fixedSize(hour)}:${fixedSize(newMinute)}`;

      if (!disableBefore) {
        disable = false;
      } else if (time === disableBefore) {
        disable = false;
      }

      options.push({
        label: `${fixedSize(hour)}:${fixedSize(newMinute)}`,
        value: `${fixedSize(hour)}:${fixedSize(newMinute)}${seconds ? ':00' : ''}`,
        disabled: disable,
      });
    }
  }

  const timeData = {
    ...data,
    options,
  };

  return (
    <>
      <SelectInput data={timeData} />
    </>
  );
};

export default TimeInput;
