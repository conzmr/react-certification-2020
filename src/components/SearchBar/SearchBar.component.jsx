import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useGlobalContext } from '../../state/GlobalProvider';

function SearchBar() {
  const {state, dispatch} = useGlobalContext();
  const history = useHistory();
  const [keyWord, setKeyWord] = useState(state.searchTerm);

  const triggerChange = () => {
    dispatch({
      type: 'SET_SEARCH_TERM',
      payload: keyWord
    });
    if (!keyWord) history.push('/');
    else history.push(`/results?q=${keyWord.replace(' ', '+')}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      triggerChange();
    }
  };
  const handleChange = (event) => {
    setKeyWord(event.target.value);
  };

  return (
    <div className="relative mx-auto text-gray-600">
      <input
        className="border-1 border-gray-300 bg-white dark:bg-black-900 dark:border-black-100 h-10 px-5 pr-10 rounded-lg text-sm focus:outline-none"
        type="search"
        name="search"
        placeholder="Search..."
        value={keyWord}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button
        type="submit"
        className="absolute right-4 top-3 text-gray-600 h-4 w-4 focus:outline-none"
        onClick={triggerChange}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  );
}

export default SearchBar;
