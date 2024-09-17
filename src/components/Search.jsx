import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchValue, onSearchChange, placeholder }) => (
  <input
    type="text"
    className="search-bar"
    placeholder={placeholder}
    value={searchValue}
    onChange={onSearchChange}
  />
);

Search.propTypes = {
  searchValue: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Search;
