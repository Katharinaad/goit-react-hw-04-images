import css from './Button.module.css';

export function Button({ onClick, dissabled }) {
  return (
    <button
      className={css.loadMoreButton}
      onClick={onClick}
      disabled={dissabled}
    >
      Load More
    </button>
  );
}
