import axios from 'axios';

const KEY_API = '38980097-7acd167c88be026b0eb497bb1';

// export const findPictureByName = async query => {
//   const url = `https://pixabay.com/api/?q=${query}&page=1&key=38980097-7acd167c88be026b0eb497bb1&image_type=photo&orientation=horizontal&per_page=12`;
//   const { data } = await axios.get(url);

//   console.log(data.hits);
//   return data.hits;
// };

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchPics(searchedQuery, page) {
  const { data } = await axios({
    params: {
      key: KEY_API,
      q: searchedQuery,
      page: page,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
  return data;
}

const API = {
  fetchPics,
};

export default API;
