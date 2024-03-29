import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderUsers(array, itemTarget, loader) {
  if (array.length <= 0) {
    loader.classList.add('is-hiden');
    iziToast.error({
      title: '',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    return;
  } else {
    itemTarget.innerHTML = '';
    const markup = array
      .map(hit => {
        return `

<li class="list-item">
<a href="${hit.largeImageURL}"><img src="${hit.webformatURL}" alt="${hit.tags}" width="360" height="200"></img></a>
<div class="img-card">
<p class="desc"><b>Likes</b> ${hit.likes}</p>
  <p  class="desc"><b>Views</b> ${hit.views}</p>
  <p  class="desc"><b>Comments</b> ${hit.comments}</p>
  <p  class="desc"><b>Downloads</b> ${hit.downloads}</p>
  <div/>
</li>
`;
      })
      .join('');

    itemTarget.insertAdjacentHTML('beforeend', markup);
    let gallery = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
    gallery.on('show.simplelightbox', function () {
      // Do something…

      gallery.refresh();
    });
  }

  loader.classList.add('is-hiden');
}
export function renderPostsMore(array, itemTarget, loader) {
  const markup = array
    .map(hit => {
      return `

<li class="list-item">
<a href="${hit.largeImageURL}"><img src="${hit.webformatURL}" alt="${hit.tags}" width="360" height="200"></img></a>
<div class="img-card">
<p class="desc"><b>Likes</b> ${hit.likes}</p>
  <p  class="desc"><b>Views</b> ${hit.views}</p>
  <p  class="desc"><b>Comments</b> ${hit.comments}</p>
  <p  class="desc"><b>Downloads</b> ${hit.downloads}</p>
  <div/>
</li>
`;
    })
    .join('');

  itemTarget.insertAdjacentHTML('beforeend', markup);
  let gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  const elementHeight = getParamsLiIt();
  window.scrollBy({
    top: elementHeight * 2,
    left: 0,
  });
  gallery.on('show.simplelightbox', function () {
    // Do something…

    gallery.refresh();
  });
  loader.classList.add('is-hiden');
}
function getParamsLiIt() {
  const ListItemElem = document.querySelector('.list-item');
  let rect = ListItemElem.getBoundingClientRect();
  return rect.height;
}
