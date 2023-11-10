import Modal from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';
import { useState } from 'react';

export function ImageGalleryItem({ pictureUrl, pictureLarge }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <li className={css.galleryList}>
      <img
        className={css.galleryPic}
        src={pictureUrl}
        alt=""
        onClick={() => setIsModalOpen(true)}
      />
      {isModalOpen && (
        <Modal onCloseModal={() => setIsModalOpen(false)}>
          <img src={pictureLarge} alt="" />
        </Modal>
      )}
    </li>
  );
}
