import React from 'react';
import { numberWithCommas } from '../../../library/Utils';
import styles from './NumberCommaInput.module.scss';

/**
 * 3자리마다 콤마 찍는 컴포넌트
 * @param id id,name 중 하나는 필수
 * @param name id,name 중 하나는 필수
 * @param value *필수
 *
 * <Input type="numberComma" name={propertyName} value={value} onChange={onChangeFunc} />
 */
const NumberCommaInput = ({ data }) => {
  const {
    id,
    name,
    className,
    placeholder,
    value = '',
    max,
    maxLength,
    decimalSize,
    format,
    disabled,
    readOnly,
    onBlur = () => {},
    onFocus = () => {},
    onChange = () => {},
  } = data;

  const regex = {
    frontZeros: /^0+/,
    frontZeroNumber: /^0([0-9]+)/,
    frontDots: /^\.+/,
    allDots: /\./g,
    continuousDot: /\.+/g,
    notNumComma: /[^\d.]/g,
    decimalPart: /\.\d*/g,
    decimalPartOneMoreNumber: /\.\d+/g,
  };

  const handleChange = e => {
    let val = e.target.value;

    const setValue = value => {
      val = value;

      e.target.value = value;
    };

    if (val) {
      // 숫자, . 아닌 값 막기
      val = val.toString().replace(regex.notNumComma, '');

      // 맨앞 0 처리
      if (val.search(regex.frontZeroNumber) !== -1) {
        val = val.replace(regex.frontZeros, '');
      }

      if (max) {
        if (val * 1 > max * 1) {
          setValue(value);
        }
      }

      if (maxLength) {
        val += '';
        if (val.length > maxLength * 1) {
          setValue(value);
        }
      }

      if (!format) {
        val = val.toString().replace(regex.decimalPart, '');
      }

      if (format === 'float') {
        if (val.toString().search(regex.allDots) !== -1) {
          val = val.toString().replace(regex.frontDots, '');
          val = val.replace(regex.continuousDot, '.');

          // 소수점은 한개만 가능
          const decimal = val.match(regex.allDots);

          if (decimal && decimal.length > 1) {
            setValue(value);
          }

          // 소수점 길이 제한
          if (decimalSize) {
            const decimal = val.match(regex.decimalPartOneMoreNumber);
            if (decimal) {
              // 소수점(.) 을 뺀 길이
              if (decimal[0].length - 1 > decimalSize) {
                setValue((val * 1).toFixed(decimalSize));
              }
            }
          }
        }
      }

      val = val.toString().replace(/,/g, ''); // 콤마 제거
    }

    onChange(e, id || name, val);
  };

  return (
    <input
      type="text"
      name={name}
      className={`${styles.numberInput} ${className}`}
      placeholder={placeholder}
      value={numberWithCommas(value)}
      disabled={disabled}
      readOnly={readOnly}
      onBlur={e => onBlur(e, id)}
      onFocus={e => onFocus(e, id)}
      onChange={e => handleChange(e)}
    />
  );
};

export default NumberCommaInput;
