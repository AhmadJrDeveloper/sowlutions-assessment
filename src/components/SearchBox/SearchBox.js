import React from 'react';
import './SearchBox.css';
import removeIcon from '../../assets/remove.png';

const SearchBox = ({ value, onChange }) => {
  const handleClearInput = () => {
    onChange({ target: { value: '' } });
  };

  return (
    <div className='search-box-container'>
      <form>
        <input
          className='search-input'
          type='text'
          placeholder='Search by User Id, Article Title, Article Description'
          value={value}
          onChange={onChange}
        />
        {value && (
          <img
            src={removeIcon}
            alt='Clear Input'
            className='clear-input-icon'
            onClick={handleClearInput}
          />
        )}
      </form>
    </div>
  );
};

export default SearchBox;
