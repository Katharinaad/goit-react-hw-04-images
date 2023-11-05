import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem({ pictureUrl, pictureLarge, onClick }) {
  return (
    <li className={css.galleryList}>
      <img
        className={css.galleryPic}
        src={pictureUrl}
        alt=""
        onClick={() => onClick(pictureLarge)}
      />
    </li>
  );
}
