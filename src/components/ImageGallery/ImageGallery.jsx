import { ImageGalleryItem } from './ImageGalleryItem';
import css from './ImageGallery.module.css';

export function ImageGallery({ pictures, onClick }) {
  return (
    <ul className={css.gallery}>
      {pictures.map(picture => (
        <ImageGalleryItem
          key={picture.id}
          pictureUrl={picture.webformatURL}
          pictureLarge={picture.largeImageURL}
          onClick={onClick}
        />
      ))}
    </ul>
  );
}
