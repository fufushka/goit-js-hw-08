import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';

document.addEventListener('DOMContentLoaded', function () {
  const currentTime = localStorage.getItem('videoplayer-current-time');

  if (currentTime) {
    // Встановлюємо час відтворення плеєра
    player.setCurrentTime(parseFloat(currentTime));
  }
  player.play().catch(error => {
    console.error('Не вдалося запустити відтворення:', error.message);
  });
});

const updateTime = throttle(() => {
  player.getCurrentTime().then(function (currentTime) {
    localStorage.setItem(STORAGE_KEY, currentTime);
  });
}, 1000);

player.on('timeupdate', updateTime);
