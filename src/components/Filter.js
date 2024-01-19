import React from 'react';

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      <p>Find contacts by name</p>
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default Filter;
