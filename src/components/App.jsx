import { useEffect, useState } from 'react';
import 'react-notifications/lib/notifications.css';
import API from '../services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { RotatingLines } from 'react-loader-spinner';
import { Searchbar } from './Searchbar/Searchbar';
import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';

export function App() {
  const [searchedQuery, setSearchedQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (!searchedQuery) return;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await API.fetchPics(searchedQuery, page);

        if (!response.totalHits) {
          return NotificationManager.error('No images found');
        }

        setPictures(prevPictures => [...prevPictures, ...response.hits]);

        const totalPages = Math.ceil(response.totalHits / 12);

        if (page === totalPages) {
          setIsEnd(true);
          return NotificationManager.info('End of search');
        }
      } catch (error) {
        return NotificationManager.error('Error fetching images');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchedQuery, page]);

  const handleSearchSubmit = searchedQuery => {
    setSearchedQuery(searchedQuery);
    setPictures([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="container">
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery pictures={pictures} />
      {pictures.length > 0 && !isEnd && <Button onClick={loadMore} />}
      {isLoading ? (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="45"
            visible={true}
          />
        </div>
      ) : null}
      <NotificationContainer />
    </div>
  );
}
