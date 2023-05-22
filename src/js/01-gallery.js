// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів

import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line
const refs = {
  gallery: document.querySelector('.gallery'),
};

const markup = galleryItems
  .map(item => {
    return `
      <li class="gallery__item">
      <a class="gallery__link" href="${item.original}">
      <img class="gallery__image" src="${item.preview}" alt="${item.description}" /></a>
      </li>
    `;
  })
  .join('');
refs.gallery.innerHTML = markup;
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

console.log(galleryItems);
