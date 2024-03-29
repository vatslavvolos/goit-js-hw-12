import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';
import { renderUsers } from './render-functions';
import { renderPostsMore } from './render-functions';
axios.defaults.baseURL = 'https://pixabay.com';
export const fetchPosts = async (value, galleryBox, loader) => {
  const fetchUsers = async value => {
    const response = await axios.get('/api/', {
      params: {
        key: '43027125-0c79f762e35459ec2a7d85557',
        q: value,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: '1',
        per_page: '15',
      },
    });

    localStorage.setItem('totalHits', response.data.totalHits);

    return response.data;
  };
  try {
    const data = await fetchUsers(value, galleryBox, loader);
    renderUsers(data.hits, galleryBox, loader);
    localStorage.setItem('search-request', value);
  } catch (error) {
    console.log(error);
  }
};
export const moreFetchPosts = async (itemTarget, pages, loader) => {
  const value = localStorage.getItem('search-request');
  const totalPages = Math.ceil(localStorage.getItem('totalHits') / 15);
  if (pages > totalPages) {
    loader.classList.add('is-hiden');
    iziToast.error({
      title: '',
      message: `We're sorry, but you've reached the end of search results.`,
      position: 'topRight',
      backgroundColor: 'g',
    });
    return;
  } else {
    const morePosts = async value => {
      const response = await axios.get('/api/', {
        params: {
          key: '43027125-0c79f762e35459ec2a7d85557',
          q: value,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page: pages,
          per_page: '15',
        },
      });
      return response.data;
    };
    try {
      const data = await morePosts(value);
      renderPostsMore(data.hits, itemTarget, loader);
    } catch (error) {
      console.log(error);
    }
  }
};
