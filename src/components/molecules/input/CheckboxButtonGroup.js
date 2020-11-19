import React from 'react';
import styles from './CheckboxButtonGroup.module.scss';

/**
 * CheckboxButtonGroup
 * @param {Object} {data}
 * @param {String} {data.name}
 * @param {String} {data.className}
 * @param {Array} {data.options} *필수
 * @param {function} {data.onChange} *필수
 * @return {(e, name, value)} e, name, value
 * @example
 * <Index type="checkboxButtonGroup" options={Array} onChange={function} />
 */

const CheckboxButtonGroup = ({ data }) => {
  const { name, className, options = [], onChange = () => {}, disabled } = data;

  const handleChange = (e, i) => {
    const value = [];

    options[i].checked = options[i].checked !== true;

    options.forEach(v => {
      if (v.checked) {
        value.push(v.value);
      }
    });

    onChange(e, name, value);
  };

  return (
    <div className={`${styles.group}${className ? ` ${className}` : ''}`}>
      {options.map((v, i) => {
        const { label, value, checked, className = '' } = v;

        return (
          <label key={value || i} className={`${styles.label}${className ? ` ${className}` : ''}`}>
            <input
              type="checkbox"
              name={name}
              className={styles.input}
              value={value}
              checked={checked}
              onChange={e => handleChange(e, i)}
              disabled={disabled}
            />
            <span className={styles.button} disabled={disabled}>
              {label}
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default CheckboxButtonGroup;
