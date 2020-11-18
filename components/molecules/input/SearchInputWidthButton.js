import React from 'react';
import SearchInput from './SearchInput';

const SearchInputWidthButton = ({ data }) => {
  const { onClick } = data;

  return (
    <SearchInput data={data}>
      <button type="submit" className="btn-slate" onClick={onClick}>
        검색
      </button>
    </SearchInput>
  );
};

export default SearchInputWidthButton;
