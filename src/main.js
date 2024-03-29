import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import { fetchPosts } from './js/pixabay-api';
import { moreFetchPosts } from './js/pixabay-api';
import { renderUsers } from './js/render-functions';
const form = document.querySelector('form');
const galleryBox = document.querySelector('.gallery');
const input = document.querySelector('#search');
const loader = document.querySelector('.loader');
const morePostsBtn = document.querySelector('.loader-more');
let pages = 1;
window.addEventListener('load', event => {
  morePostsBtn.classList.add('is-hiden');
});
const clickHandler = event => {
  morePostsBtn.classList.remove('is-hiden');
  loader.classList.remove('bottom');

  if (input.value.trim() === '') {
    iziToast.error({
      title: '',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    return;
  }
  event.preventDefault();
  loader.classList.remove('is-hiden');

  fetchPosts(input.value, galleryBox, loader);

  morePostsBtn.classList.remove('is-hiden');
};
const submitMorePosts = event => {
  pages += 1;
  event.preventDefault();
  loader.classList.add('bottom');
  loader.classList.remove('is-hiden');
  moreFetchPosts(galleryBox, pages, loader);
};
form.addEventListener('submit', clickHandler);
morePostsBtn.addEventListener('click', submitMorePosts);
