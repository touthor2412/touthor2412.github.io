// Photo slideshow for the Home hero.
// Without JavaScript only the first photo shows and the buttons stay hidden.
(function () {
  var root = document.querySelector('[data-slideshow]');
  if (!root) return;

  var slides = root.querySelectorAll('[data-slide]');
  if (slides.length < 2) return;

  var DELAY = 5000;
  var SWIPE = 40;   // px a finger must move sideways to count as a swipe
  var frame = root.querySelector('[data-frame]');
  var track = root.querySelector('[data-slides]');
  var dots = root.querySelectorAll('[data-dot]');
  var toggle = root.querySelector('[data-toggle]');
  var toggleText = toggle.querySelector('[data-toggle-text]');

  var current = 0;
  var timer = null;
  var playing = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hovering = false;        // mouse is over the slideshow
  var keyboardFocus = false;   // a button inside has keyboard focus

  // Start the 5-second wait again, or stop it while paused or held.
  function restart() {
    clearTimeout(timer);
    var running = playing && !hovering && !keyboardFocus;
    // Screen readers announce the new photo only when it changes because someone asked.
    track.setAttribute('aria-live', running ? 'off' : 'polite');
    if (running) timer = setTimeout(function () { show(current + 1); }, DELAY);
  }

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach(function (slide, i) {
      slide.classList.toggle('is-active', i === current);
    });
    dots.forEach(function (dot, i) {
      if (i === current) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    restart();
  }

  function setPlaying(value) {
    playing = value;
    toggle.setAttribute('data-playing', String(playing));
    toggleText.textContent = playing ? 'Pause' : 'Play';
    restart();
  }

  function hasKeyboardFocus(el) {
    try { return el.matches(':focus-visible'); } catch (e) { return true; }
  }

  root.querySelector('[data-prev]').addEventListener('click', function () { show(current - 1); });
  root.querySelector('[data-next]').addEventListener('click', function () { show(current + 1); });
  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { show(i); });
  });
  toggle.addEventListener('click', function () { setPlaying(!playing); });

  // Only a real mouse counts: a tap on a phone shouldn't pause it for good.
  root.addEventListener('pointerenter', function (e) {
    if (e.pointerType === 'mouse') { hovering = true; restart(); }
  });
  root.addEventListener('pointerleave', function (e) {
    if (e.pointerType === 'mouse') { hovering = false; restart(); }
  });

  root.addEventListener('focusin', function (e) {
    keyboardFocus = hasKeyboardFocus(e.target);
    restart();
  });
  root.addEventListener('focusout', function (e) {
    if (root.contains(e.relatedTarget)) return;
    keyboardFocus = false;
    restart();
  });

  root.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    keyboardFocus = true;
    show(current + (e.key === 'ArrowRight' ? 1 : -1));
  });

  var startX = null;
  var startY = 0;
  frame.addEventListener('touchstart', function (e) {
    if (e.touches.length !== 1) { startX = null; return; }
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });
  frame.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    var dy = e.changedTouches[0].clientY - startY;
    startX = null;
    if (Math.abs(dx) > SWIPE && Math.abs(dx) > Math.abs(dy)) show(current + (dx < 0 ? 1 : -1));
  });

  slides.forEach(function (slide) { slide.hidden = false; });
  root.querySelectorAll('[data-prev], [data-next], [data-controls]').forEach(function (el) {
    el.hidden = false;
  });
  setPlaying(playing);
})();
