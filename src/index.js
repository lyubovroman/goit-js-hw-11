import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { ApiService } from './js/fetchAxiosImg.js';
import { renderImg, resetGallery } from './js/renderImg.js';
import { refs } from './js/refs';

refs.inputEl.addEventListener('submit', onSearchImg);
refs.btnLoad.addEventListener('click', onBtnloadClick);

addClassVH();
const newApiService = new ApiService();

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

async function onSearchImg(event) {
  event.preventDefault();
  newApiService.resetPage();

  resetGallery();

  const searchQuery = event.target.elements.searchQuery.value.trim();
  if (!searchQuery) {
    Notiflix.Notify.failure('Please type something.');
    addClassVH();
    return;
  }
  newApiService.query = searchQuery;
  const {
    data: { hits, totalHits },
  } = await newApiService.fetchImages();

  checkLastPage(totalHits);

  if (hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );

    return;
  }
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

  renderImg(hits);
  lightbox.refresh();
}

async function onBtnloadClick(event) {
  newApiService.incrementPage();

  const {
    data: { hits, totalHits },
  } = await newApiService.fetchImages();

  checkLastPage(totalHits);
  renderImg(hits);
  lightbox.refresh();
  onScroll();
}

function checkLastPage(totalHits) {
  if (newApiService.page >= Math.ceil(totalHits / newApiService.perPage)) {
    addClassVH();
  } else {
    removeClassVH();
  }
}

function onScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function addClassVH() {
  refs.btnLoad.classList.add('visually-hidden');
}

function removeClassVH() {
  refs.btnLoad.classList.remove('visually-hidden');
}
