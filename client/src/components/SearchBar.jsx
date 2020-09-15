import React, { useState } from 'react';
import './styles/SearchBar.css';

function SearchBar(props) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setInput('');
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='searchBar'
        type='sumbit'
        name='name'
        onChange={handleChange}
        value={input}
        placeholder='SEARCH  '
      />
    </form>
  );
}

export default SearchBar;
