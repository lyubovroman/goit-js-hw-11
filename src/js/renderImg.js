import { refs } from './refs';

export function renderImg(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `
          
            <a class="gallery__link" href="${largeImageURL}">
            <div class="photo-card">
  <img clas= gallery_img src="${webformatURL}" alt="${tags}" height = "120" width = "150" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes<br>${likes}</br></b>
    </p>
    <p class="info-item">
      <b>Views<br>${views}</br></b>
    </p>
    <p class="info-item">
      <b>Comments<br>${comments}</br></b>
    </p>
    <p class="info-item">
      <b>Downloads<br>${downloads}</br></b>
    </p>
  </div>
</div>
</a>
`
    )
    .join('');
  refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}

export function resetGallery() {
  refs.galleryEl.innerHTML = '';
}
