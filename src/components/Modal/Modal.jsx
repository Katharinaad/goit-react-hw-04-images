import { useEffect } from 'react';
import css from './Modal.module.css';

export default function Modal({ onCloseModal, children }) {
  useEffect(() => {
    const onKeyDown = event => {
      if (event.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onCloseModal]);

  const onOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  };

  return (
    <div onClick={onOverlayClick} className={css.overlay}>
      <div className={css.modal}>{children}</div>
    </div>
  );
}
