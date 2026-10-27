// Background photos for the Stories banner: a new photo every 5 seconds, with no buttons.
// Without JavaScript, or with reduced motion turned on, the first photo stays.
(function () {
  var banner = document.querySelector('[data-banner]');
  if (!banner) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var DELAY = 5000;
  var photos = banner.querySelectorAll('.banner-photo');
  var bars = banner.querySelectorAll('.banner-bar');
  var current = 0;

  function show(index) {
    photos[current].classList.remove('is-active');
    bars[current].classList.remove('is-active');
    current = index % photos.length;
    photos[current].classList.add('is-active');
    bars[current].classList.add('is-active');
  }

  banner.classList.add('is-moving');   // turns on the slow zoom
  setInterval(function () { show(current + 1); }, DELAY);
})();
