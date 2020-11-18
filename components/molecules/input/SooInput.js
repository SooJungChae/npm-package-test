/* eslint-disable import/no-cycle */
import SooTextInput from './SooTextInput';

/**
 * SooInput Compoent
 * @param {object} props
 * @return {Component} SooInput Compoent
 */

const SooInput = props => {
  return <SooTextInput data={props} />
};

export default SooInput;
