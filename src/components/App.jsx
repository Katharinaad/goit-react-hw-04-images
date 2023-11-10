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
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [largeImageURL, setLargeImageURL] = useState('');

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

  // const onOpenModal = url => {
  //   setIsModalOpen(true);
  //   setLargeImageURL(url);
  // };

  // const onCloseModal = () => {
  //   setIsModalOpen(false);
  //   setLargeImageURL('');
  // };

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

// state = {
//   searchedQuery: '',
//   page: 1,
//   pictures: [],
//   isLoading: false,
//   error: null,
//   isEnd: false,
//   isModalOpen: false,
//   largeImageURL: '',
// };

//   async componentDidUpdate(_, prevState) {
//     const { page, searchedQuery } = this.state;
//     if (prevState.page !== page || prevState.searchedQuery !== searchedQuery) {
//       this.setState({ isLoading: true });

//       try {
//         const response = await API.fetchPics(searchedQuery, page);

//         this.setState(prevState => ({
//           pictures: [...prevState.pictures, ...response.hits],
//         }));

//         if (!response.totalHits) {
//           return NotificationManager.error('No images found');
//         }

//         const totalPages = Math.ceil(response.totalHits / 12);

//         if (page === totalPages) {
//           this.setState({ isEnd: true });
//           return NotificationManager.info('End of search');
//         }
//       } catch (error) {
//         return NotificationManager.error('Error fetching images');
//       } finally {
//         this.setState({ isLoading: false });
//       }
//     }
//   }

//   handleSearchSubmit = searchedQuery => {
//     this.setState({ searchedQuery, pictures: [], page: 1 });
//   };

//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   onOpenModal = url => {
//     this.setState({
//       isModalOpen: true,
//       largeImageURL: url,
//     });
//   };

//   onCloseModal = () => {
//     this.setState({
//       isModalOpen: false,
//       largeImageURL: '',
//     });
//   };

//   render() {
//     const showPics =
//       Array.isArray(this.state.pictures) && this.state.pictures.length;

//     return (
//       <div className="container">
//         <Searchbar onSubmit={this.handleSearchSubmit} />
//         {showPics > 0 && (
//           <ImageGallery
//             pictures={this.state.pictures}
//             onClick={this.onOpenModal}
//           />
//         )}
//         {showPics > 0 && !this.state.isEnd && (
//           <Button onClick={this.loadMore} />
//         )}
//         {this.state.isLoading && (
//           <div
//             style={{
//               position: 'fixed',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//             }}
//           >
//             <RotatingLines
//               strokeColor="grey"
//               strokeWidth="5"
//               animationDuration="0.75"
//               width="45"
//               visible={true}
//             />
//           </div>
//         )}
//         {this.state.isModalOpen && (
//           <Modal onCloseModal={this.onCloseModal}>
//             <img src={this.state.largeImageURL} alt="" />
//           </Modal>
//         )}
//         <NotificationContainer />
//       </div>
//     );
//   }
// }
