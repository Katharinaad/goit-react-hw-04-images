import css from './Button.module.css';

export function Button({ onClick }) {
  return (
    <button className={css.loadMoreButton} onClick={onClick}>
      Load More
    </button>
  );
}
