(function () {
  var lastTrigger = null;
  document.querySelectorAll('[data-dialog]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var d = document.getElementById(btn.getAttribute('data-dialog'));
      if (!d) return;
      lastTrigger = btn;
      document.body.classList.add('modal-open');
      d.showModal();
      var c = d.querySelector('.close');
      if (c) c.focus();
    });
  });
  document.querySelectorAll('dialog').forEach(function (d) {
    d.addEventListener('click', function (e) {
      if (e.target === d || e.target.hasAttribute('data-close')) d.close();
    });
    d.addEventListener('close', function () {
      document.body.classList.remove('modal-open');
      if (lastTrigger) lastTrigger.focus();
    });
  });
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js-reveal');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (i) { io.observe(i); });
  }
})();
