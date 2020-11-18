import React, { useReducer, useEffect } from 'react';
import { DateSingleInput } from '@datepicker-react/styled';
import { ThemeProvider } from 'styled-components';
import moment from 'moment';
import DatepickerTheme from './DatepickerTheme';

/**
 * DatePicker input
 * 필요한 옵션은 추가적으로 더사용
 * @param {Object} {data}
 * @param {String} {data.id} *필수
 * @param {String} {data.name}
 * @param {String} {data.value} - string -> Date 필요. Date 로 들어오면 그대로 셋팅
 * @param {String} {data.format} yyyy MM dd 조합 으로 사용 필수 default : yyyy-MM-dd
 * @param {String} {data.disabled}
 * @param {String} {data.readOnly}
 * @param {function} {data.onChange} *필수
 * @param {function} {data.onFocus}
 * @return {(id, value)} id, value
 * @example
 * <DateInput id={String} onChange={function}/>
 * <Input type="date" id={String} name={String} onChange={function} />
 * @참고  https://reactjsexample.com/an-easily-internationalizable-and-mobile-friendly-datepicker-library-for-the-web/
 * @참고 props : https://github.com/tresko/react-datepicker/blob/master/packages/styled/src/components/DateSingleInput/DateSingleInput.tsx#L187
 * @참고 theme : https://github.com/tresko/react-datepicker/blob/master/packages/styled/src/components/Datepicker/Datepicker.tsx#L306
 */

const initialState = {
  date: null,
  showDatepicker: false,
};

// 리듀서 useState로 하면 라이브러리 내부적으로 state.date 빈값으로 업데이트를 시켜버려서 임시적으로 리듀서 사용
function reducer(state, action) {
  switch (action.type) {
    case 'focusChange':
      return { ...state, showDatepicker: action.payload };
    case 'dateChange':
      return action.payload;
    case 'dateSet':
      return { ...state, date: action.payload };
    default:
      throw new Error();
  }
}

const DateInput = ({ data }) => {
  const {
    id,
    name,
    value,
    placeholder = '날짜 선택',
    format = 'yyyy-MM-dd',
    disabled = false,
    readOnly = true,
    onChange = () => {},
    onFocus = () => {},
  } = data;

  const [state, dispatch] = useReducer(reducer, initialState);

  const onDateChange = data => {
    onChange(id, data.date ? moment(data.date).format('YYYY-MM-DD') : '');
  };

  const onFocusChange = focusedInput => {
    if (focusedInput) onFocus();
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
    const input = document.getElementById(id);

    if (input) {
      input.disabled = disabled;
      input.readOnly = readOnly;
    } else {
      console.error('[DateInput] ID 가 없습니다.');
      return;
    }

    dispatch({ type: 'dateSet', payload: value ? moment(value).toDate() : '' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <ThemeProvider theme={DatepickerTheme}>
      <DateSingleInput
        {...data}
        inputId={id}
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
          dateAriaLabel: placeholder,
          datePlaceholder: placeholder,
        }}
        date={state.date} // Date or null
        showDatepicker={state.showDatepicker}
        onDateChange={data => onDateChange(data)}
        onFocusChange={focusedInput => onFocusChange(focusedInput)}
      />
    </ThemeProvider>
  );
};

export default DateInput;
