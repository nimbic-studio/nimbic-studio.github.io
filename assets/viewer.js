// Screenshot viewer for Nimbic product pages. Every `main .shot` image opens a full-screen viewer;
// the arrows (and arrow keys, and swipes) step through all of them in page order and loop around.
// Without <dialog> support or JavaScript, gallery links still open the plain image.
(function () {
  var shots = [].slice.call(document.querySelectorAll('main .shot'));
  if (!shots.length) return;

  var viewer = document.createElement('dialog');
  if (typeof viewer.showModal !== 'function') return;
  viewer.className = 'viewer';
  viewer.setAttribute('aria-label', 'Screenshots');
  var arrow = function (d) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="' + d + '"/></svg>';
  };
  viewer.innerHTML =
    '<figure><img alt=""></figure>' +
    '<figcaption><b class="count"></b><span class="caption"></span></figcaption>' +
    '<button class="prev" type="button" aria-label="Previous screenshot">' + arrow('M15 5l-7 7 7 7') + '</button>' +
    '<button class="next" type="button" aria-label="Next screenshot">' + arrow('M9 5l7 7-7 7') + '</button>' +
    '<button class="close" type="button" aria-label="Close" autofocus>' + arrow('M6 6l12 12M18 6L6 18') + '</button>';
  document.body.appendChild(viewer);
  document.documentElement.classList.add('js');

  var big = viewer.querySelector('figure img');
  var count = viewer.querySelector('.count');
  var caption = viewer.querySelector('.caption');
  var index = 0;

  function show(i) {
    index = (i + shots.length) % shots.length; // loop: last -> first, first -> last
    var s = shots[index];
    big.src = s.currentSrc || s.src;
    big.alt = s.alt;
    count.textContent = (index + 1) + ' / ' + shots.length;
    caption.textContent = s.alt;
  }
  function open(i) { show(i); if (!viewer.open) viewer.showModal(); }
  function trigger(s) { return s.closest('a') || s; }

  shots.forEach(function (s, i) {
    var link = s.closest('a');
    if (!link) { s.tabIndex = 0; s.setAttribute('role', 'button'); s.setAttribute('aria-label', 'View larger: ' + s.alt); }
    trigger(s).addEventListener('click', function (e) { e.preventDefault(); open(i); });
    if (!link) s.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
    });
  });

  viewer.querySelector('.prev').addEventListener('click', function () { show(index - 1); });
  viewer.querySelector('.next').addEventListener('click', function () { show(index + 1); });
  viewer.querySelector('.close').addEventListener('click', function () { viewer.close(); });
  viewer.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1); }
  });
  // A click on the dark area around the picture closes.
  viewer.addEventListener('click', function (e) {
    if (e.target === viewer || e.target.tagName === 'FIGURE' || e.target.tagName === 'FIGCAPTION') viewer.close();
  });
  var x0 = null;
  viewer.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  viewer.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
  });
  viewer.addEventListener('close', function () { trigger(shots[index]).focus(); });
})();
