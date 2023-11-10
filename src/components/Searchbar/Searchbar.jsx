import css from './Searchbar.module.css';
import { useState } from 'react';

export function Searchbar({ onSubmit }) {
  const [searchQuery, setsearchQuery] = useState('');

  const handleChange = event => {
    setsearchQuery(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const query = searchQuery;

    onSubmit(query);
    setsearchQuery('');
  };

  return (
    <header className={css.searchBar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchButton}>
          Search
        </button>

        <input
          className={css.searchInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={searchQuery}
        />
      </form>
    </header>
  );
}
