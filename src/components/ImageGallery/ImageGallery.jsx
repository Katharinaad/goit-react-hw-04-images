import { ImageGalleryItem } from './ImageGalleryItem';
import css from './ImageGallery.module.css';

export function ImageGallery({ pictures, onClick }) {
  const showPics = Array.isArray(pictures) && pictures.length;

  return (
    <ul className={css.gallery}>
      {showPics
        ? pictures.map((picture, index) => (
            <ImageGalleryItem
              key={index}
              pictureUrl={picture.webformatURL}
              pictureLarge={picture.largeImageURL}
              onClick={onClick}
            />
          ))
        : null}
    </ul>
  );
}
