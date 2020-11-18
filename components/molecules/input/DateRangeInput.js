/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useReducer } from 'react';
import { DateRangeInput as DataeRage } from '@datepicker-react/styled';
import { ThemeProvider } from 'styled-components';
import moment from 'moment';
import { Input } from 'components/molecules';
import { Debug } from 'library/Debug';
import DatepickerTheme from './DatepickerTheme';

/**
 * DateRangePicker input
 * 필요한 옵션은 추가적으로 더사용
 * @param {Object} {data}
 * @param {String} {data.id}  *필수 -> startDate_data.id // endDate_data.id
 * @param {String} {data.name}
 * @param {String} {data.format} yyyy MM dd 조합 으로 사용 필수 default : yyyy-MM-dd
 * @param {String} {data.disabled}
 * @param {String} {data.readOnly}
 * @param {function} {data.onChange} *필수
 * @param {function} {data.onFocus}
 * @param {function} {data.startDate}
 * @param {function} {data.endDate}
 * @return {(id, {value})} id, {startDate : '2019-12-01', endDate : '2019-12-10'}
 * @example
 * <DateRangePicker onChange={function}/>
 * <Input type="daterange" id={String} name={String} startDate={function} onChange={function} />
 * @참고  https://reactjsexample.com/an-easily-internationalizable-and-mobile-friendly-datepicker-library-for-the-web/
 * @참고 props : https://github.com/tresko/react-datepicker/blob/master/packages/styled/src/components/DateRangeInput/DateRangeInput.tsx
 * @참고 theme : https://github.com/tresko/react-datepicker/blob/master/packages/styled/src/components/Datepicker/Datepicker.tsx#L306
 */

const initialState = {
  startDate: null,
  endDate: null,
  focusedInput: null,
};

// 리듀서 useState로 하면 라이브러리 내부적으로 state.date 빈값으로 업데이트를 시켜버려서 임시적으로 리듀서 사용
function reducer(state, action) {
  switch (action.type) {
    case 'focusChange':
      return { ...state, focusedInput: action.payload };
    case 'dateChange':
      return action.payload;
    case 'startDateSet':
      return { ...state, startDate: action.payload };
    case 'endDateSet':
      return { ...state, endDate: action.payload };
    default:
      throw new Error();
  }
}

const DateRangeInput = ({ data }) => {
  const {
    id,
    name,
    selectDate,
    startDate,
    endDate,
    format = 'yyyy-MM-dd',
    disabled = false,
    readOnly = true,
    onChange = () => {},
    onFocus = () => {},
    options = [
      { label: '오늘', value: '오늘', startDate: moment(), endDate: moment() },
      {
        label: '어제',
        value: '어제',
        startDate: moment().subtract(1, 'days'),
        endDate: moment().subtract(1, 'days'),
      },
      {
        label: '최근 7일',
        value: '최근 7일',
        startDate: moment().subtract(1, 'week'),
        endDate: moment().subtract(0, 'week'),
      },
      {
        label: '최근 1개월',
        value: '최근 1개월',
        startDate: moment().subtract(1, 'month'),
        endDate: moment().subtract(0, 'month'),
      },
      { label: '날짜 직접선택', value: '날짜 직접선택' },
    ],
  } = data;

  const [state, dispatch] = useReducer(reducer, initialState);
  const { focusedInput } = state;
  const [period, setPeriod] = useState(selectDate);

  const onDatesChange = data => {
    const payload = data;
    const startDate = payload.startDate ? moment(payload.startDate).format('YYYY-MM-DD') : '';
    const endDate = payload.endDate ? moment(payload.endDate).format('YYYY-MM-DD') : '';
    const value = { startDate, endDate };

    onChange(id, value);
    dispatch({ type: 'dateChange', payload });
  };

  const onFocusChange = focusedInput => {
    if (focusedInput) onFocus(focusedInput, dispatch);
    dispatch({ type: 'focusChange', payload: focusedInput });
  };

  const weekdayLabelFormat = date => {
    const week = moment(date).format('dddd');

    switch (week) {
      case 'Monday':
        return '월';
      case 'Tuesday':
        return '화';
      case 'Wednesday':
        return '수';
      case 'Thursday':
        return '목';
      case 'Friday':
        return '금';
      case 'Saturday':
        return '토';
      case 'Sunday':
        return '일';
      default:
        return null;
    }
  };

  useEffect(() => {
    const sInput = document.getElementById(`startDate_${id}`);
    const eInput = document.getElementById(`endDate_${id}`);

    const setAttribute = el => {
      const element = el;
      element.disabled = disabled;
      element.readOnly = readOnly;
    };

    if (sInput || eInput) {
      setAttribute(sInput);
      setAttribute(eInput);
    } else {
      Debug.error('[DateRangeInput] ID 가 없습니다.');
      return;
    }
    if (startDate) dispatch({ type: 'startDateSet', payload: moment(startDate).toDate() });
    if (endDate) dispatch({ type: 'endDateSet', payload: moment(endDate).toDate() });
  }, [data]);

  useEffect(() => {
    if (focusedInput !== null) {
      setPeriod('날짜 직접선택');
    }
  }, [focusedInput]);

  useEffect(() => {
    options.forEach(option => {
      if (option.value === period) {
        onDatesChange({
          ...state,
          startDate: option.startDate ? option.startDate._d : state.startDate,
          endDate: option.endDate ? option.endDate._d : state.endDate,
          focusedInput,
        });
      }
    });
  }, [period]);

  return (
    <>
      {selectDate && (
        <Input
          type="select"
          id={id}
          name={name}
          value={period}
          options={options}
          onChange={(e, id, value) => setPeriod(value)}
        />
      )}
      <ThemeProvider theme={DatepickerTheme}>
        <DataeRage
          {...data}
          startDateInputId={`startDate_${id}`}
          endDateInputId={`endDate_${id}`}
          name={name}
          displayFormat={format}
          weekdayLabelFormat={date => {
            return weekdayLabelFormat(date);
          }}
          monthLabelFormat={date => {
            return moment(date).format('YYYY년 MM월');
          }}
          phrases={{
            datepickerStartDatePlaceholder: '날짜 선택',
            datepickerStartDateLabel: '시작일',
            datepickerEndDatePlaceholder: '날짜 선택',
            datepickerEndDateLabel: '종료일',
            resetDates: '초기화',
            close: '닫기',
            startDateAriaLabel: '시작일',
            startDatePlaceholder: '시작일',
            endDateAriaLabel: '종료일',
            endDatePlaceholder: '종료일',
          }}
          startDate={state.startDate} // Date or null
          endDate={state.endDate} // Date or null
          focusedInput={focusedInput} // START_DATE, END_DATE or null
          onDatesChange={data => onDatesChange(data)}
          onFocusChange={focusedInput => onFocusChange(focusedInput)}
        />
      </ThemeProvider>
    </>
  );
};

export default DateRangeInput;
