import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from './Input';

class NumberCommaInput extends React.Component {
  state = {
    value: 0.0,
  };

  onChange = (e, id, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <Input
        type="numberComma"
        placeholder="0.0"
        name="distance"
        id="distance"
        max={99.9}
        maxLength={5}
        value={this.state.value}
        onChange={this.onChange}
      />
    );
  }
}

class FloatNumberCommaInput extends React.Component {
  state = {
    value: 0.0,
  };

  onChange = (e, id, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <Input
        type="numberComma"
        placeholder="0.0"
        name="distance"
        id="distance"
        format="float"
        max={99.9}
        maxLength={5}
        decimalSize={1}
        value={this.state.value}
        onChange={this.onChange}
      />
    );
  }
}

const setup = () => {
  const utils = render(<NumberCommaInput />);
  const input = utils.container.querySelector('input');

  return {
    input,
    ...utils,
  };
};

const setupFloat = () => {
  const utils = render(<FloatNumberCommaInput />);
  const input = utils.container.querySelector('input');

  return {
    input,
    ...utils,
  };
};

describe('default NumberCommaInput', () => {
  test('0 -> 0', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: '0' } });
    expect(input.value).toBe('0');
  });

  test('앞에 0 이 올 수 없다.', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: '023' } });
    expect(input.value).toBe('23');
  });

  test('앞에 0000 이 올 수 없다.', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: '000023' } });
    expect(input.value).toBe('23');
  });

  test('소수점 불가능', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: '23.' } });
    expect(input.value).toBe('23');
  });

  test('소수 부분 불가능', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: '23.0' } });
    expect(input.value).toBe('23');
  });
});

describe('float NumberCommaInput', function() {
  test('0 -> 0', () => {
    const { input } = setupFloat();
    fireEvent.change(input, { target: { value: '0' } });
    expect(input.value).toBe('0');
  });

  test('앞에 0 이 올 수 없다.', () => {
    const { input } = setupFloat();
    fireEvent.change(input, { target: { value: '023' } });
    expect(input.value).toBe('23');
  });

  test('앞에 0000 이 올 수 없다.', () => {
    const { input } = setupFloat();
    fireEvent.change(input, { target: { value: '000023' } });
    expect(input.value).toBe('23');
  });

  test('소수점 가능', () => {
    const { input } = setupFloat();
    fireEvent.change(input, { target: { value: '23.' } });
    expect(input.value).toBe('23.');
  });

  test('맨 앞 소수점 불가능', () => {
    const { input } = setupFloat();
    fireEvent.change(input, { target: { value: '.23' } });
    expect(input.value).toBe('23');
  });

  test('연속된 소수점 불가능', () => {
    const { input } = setupFloat();
    fireEvent.change(input, { target: { value: '23..' } });
    expect(input.value).toBe('23.');
  });

  test('소수점 부분 가능', () => {
    const { input } = setupFloat();
    fireEvent.change(input, { target: { value: '23.0' } });
    expect(input.value).toBe('23.0');
  });

  test('소수점 여러개 불가능', () => {
    const { input } = setupFloat();
    fireEvent.change(input, { target: { value: '23.1' } });
    fireEvent.change(input, { target: { value: '23.1.' } });
    expect(input.value).toBe('23.1');
  });

  test('소수점 길이 제한', () => {
    const { input } = setupFloat();
    fireEvent.change(input, { target: { value: '23.12' } });
    expect(input.value).toBe('23.1');
  });
});
