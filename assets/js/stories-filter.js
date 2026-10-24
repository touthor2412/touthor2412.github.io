// Topic filter for the Stories page.
// Without JavaScript the buttons stay hidden and every story shows.
(function () {
  var group = document.querySelector('[data-filters]');
  if (!group) return;

  var buttons = group.querySelectorAll('button[data-filter]');
  var items = document.querySelectorAll('[data-story-tag]');
  var status = document.getElementById('filter-status');

  function show(filter, label) {
    var count = 0;
    items.forEach(function (item) {
      var match = filter === 'all' || item.getAttribute('data-story-tag') === filter;
      item.hidden = !match;
      if (match) count++;
    });
    buttons.forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.getAttribute('data-filter') === filter));
    });
    if (!status) return;
    if (count === 0) {
      status.textContent = 'No stories about ' + label + ' yet. Check back soon.';
    } else if (filter === 'all') {
      status.textContent = '';
    } else {
      status.textContent = 'Showing ' + count + (count === 1 ? ' story' : ' stories') + ' about ' + label + '.';
    }
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      show(button.getAttribute('data-filter'), button.textContent);
    });
  });

  group.hidden = false;
})();
