const DatepickerTheme = () => {
  return {
    reactDatepicker: {
      fontFamily: 'NanumGothic, AppleSDGothicNeo-Regular, Malgun Gothic, Dotum, Helvetica, Arial, sans-serif',
      daySize: 35,

      colors: {
        primaryColor: '#37474f', // 변경
        silverCloud: '#919191', // 변경
        // charcoal: '#001217',
        darcula: '#333', // 변경
        // mud: '#58595B',
        // greey: '#808285',
        // graci: '#BCBEC0',
        // white: '#ffffff',
        accessibility: '#37474f', // 변경
        selectedDay: '#607d8b', // 변경
        selectedDayHover: '#37474f', // 변경
        normalDayHover: '#ddd', // 변경
      },

      selectDateLabelMargin: '0 0 10px',
      selectDateDateFontSize: 14,
      selectDateDatePadding: '0 0 10px',

      navButtonHeight: 35,
      navButtonWidth: 35,
      navButtonBorder: '0',
      navButtonIconColor: 0,

      monthLabelLineHeight: '35px',
      monthLabelFontSize: 13,

      dayFontWeight: 700,
      dayFontSize: 13,

      monthLabelMargin: '0 0 10px',
      monthDayLabelMargin: '0 0 10px',

      inputLabelBorder: '0',
      inputLabelBackground: 'transparent',
      inputFontWeight: 'normal',
      inputFontSize: 13,
      inputBackground: 'transparent',
      inputMinHeight: '33px',
      inputPadding: '7px 0 7px 33px',
      inputCalendarWrapperWidth: 13,
      inputCalendarWrapperHeight: 13,
      inputCalendarWrapperTop: 10,
      inputCalendarWrapperLeft: 10,
      inputCalendarIconWidth: 13,
      inputCalendarIconHeight: 13,

      datepickerBoxShadow: '0 5px 10px 0 rgba(0,0,0,0.1), 0 0 0 1px rgba(211,211,211,1)',
      datepickerPadding: 20,
      datepickerBorderRadius: 3,
      datepickerCloseWrapperRight: '0',
      datepickerCloseWrapperTop: '0',
      datepickerSelectDateGridTemplateColumns: 'auto auto auto auto',

      datepickerMonthsWrapperMargin: '35px 0 0',
      datepickerResetDatesWrapperMargin: '20px 0 0',
      datepickerMonthsGridGap: 20,

      datepickerPreviousMonthButtonTop: '0',
      datepickerNextMonthButtonTop: '0',

      datepickerMonthsGridOverflow: 'visible',

      datepickerZIndex: '7070',
      dateRangeZIndex: '8080',
      dateSingleZIndex: '9090',
      dateRangeGridTemplateColumns: 'auto 33px auto',
      dateRangeDatepickerWrapperRight: '0',
      dateRangeDatepickerWrapperLeft: 'auto',
    },
  };
};

export default DatepickerTheme;

// 참고 : https://github.com/tresko/react-datepicker/blob/master/docs/THEME_PROPS.md
