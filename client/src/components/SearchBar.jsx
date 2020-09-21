import React, { useEffect, useState } from 'react';
import './styles/SearchBar.css';

function SearchBar(props) {
  const [input, setInput] = useState('');

  useEffect(() => console.log('search UseEffect'));

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
