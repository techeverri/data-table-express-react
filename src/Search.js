import React from 'react';
import './Search.css';
import { LIMIT_OPTIONS } from './constants';

const Search = ({ limit, onLimitChange, onSearchChange }) => (
  <div className="search">
    <div className="search__left">
      <label htmlFor="limit">Show</label>{' '}
      <select
        name="limit"
        value={limit}
        onChange={event => onLimitChange(event.target.value)}
      >
        {LIMIT_OPTIONS.map(limit => (
          <option key={limit} value={limit}>
            {limit}
          </option>
        ))}
      </select>{' '}
      entries
    </div>
    <div className="search__right">
      <label htmlFor="name">Search by name:</label>{' '}
      <input
        name="name"
        placeholder="e.g. davinci"
        onChange={event => onSearchChange(event.target.value)}
      />
    </div>
  </div>
);

export default Search;
