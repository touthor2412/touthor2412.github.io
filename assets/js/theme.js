// Sun/moon button in the header: light or dark mode for the whole site.
// The small script at the top of head.html sets the theme before the page shows.
(function () {
  var root = document.documentElement;
  var button = document.querySelector('[data-theme-toggle]');
  var system = window.matchMedia('(prefers-color-scheme: dark)');

  function saved() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    if (button) button.setAttribute('aria-pressed', String(theme === 'dark'));
  }

  apply(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

  if (button) {
    button.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // Until someone picks a theme with the button, follow the system setting when it changes.
  system.addEventListener('change', function (e) {
    var choice = saved();
    if (choice !== 'dark' && choice !== 'light') apply(e.matches ? 'dark' : 'light');
  });
})();
