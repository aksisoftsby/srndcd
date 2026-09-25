/* SURENDO – template rekomendasi 1 (one page) */
(function () {
  'use strict';

  /* ===== mobile nav ===== */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') nav.classList.remove('open');
    });
  }

  /* ===== product carousel ===== */
  var track = document.getElementById('prodTrack');
  var prev = document.getElementById('prodPrev');
  var next = document.getElementById('prodNext');
  if (track && prev && next) {
    var step = function () {
      var card = track.querySelector('.prod-card');
      return card ? card.getBoundingClientRect().width + 18 : 220;
    };
    prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
  }

  /* ===== testimonial slider ===== */
  var tTrack = document.getElementById('testiTrack');
  var tPrev = document.getElementById('testiPrev');
  var tNext = document.getElementById('testiNext');
  if (tTrack && tPrev && tNext) {
    var tStep = function () {
      var card = tTrack.querySelector('.testi-card');
      return card ? card.getBoundingClientRect().width + 18 : 360;
    };
    var maxShift = function () {
      return Math.max(0, tTrack.scrollWidth - tTrack.parentElement.clientWidth);
    };
    var pos = 0;
    var apply = function () {
      pos = Math.max(0, Math.min(pos, maxShift()));
      tTrack.style.transform = 'translateX(' + (-pos) + 'px)';
    };
    tPrev.addEventListener('click', function () { pos -= tStep(); apply(); });
    tNext.addEventListener('click', function () { pos += tStep(); apply(); });
    window.addEventListener('resize', apply);
  }

  /* ===== refs thumbnails -> main image ===== */
  var refsMain = document.querySelector('.refs-main img');
  var thumbs = document.querySelectorAll('.refs-thumbs img');
  if (refsMain && thumbs.length) {
    var mainSrc = refsMain.getAttribute('src');
    thumbs.forEach(function (t) {
      t.addEventListener('click', function () {
        var cur = refsMain.getAttribute('src');
        refsMain.setAttribute('src', t.getAttribute('src'));
        t.setAttribute('src', cur);
      });
    });
  }

  /* ===== active nav on scroll ===== */
  var sections = ['top', 'tentang', 'produk', 'referensi', 'testimoni', 'kontak']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  var navLinks = nav ? Array.prototype.slice.call(nav.querySelectorAll('a:not(.btn)')) : [];
  window.addEventListener('scroll', function () {
    var y = window.scrollY + 120;
    var current = sections[0];
    sections.forEach(function (s) { if (s.offsetTop <= y) current = s; });
    navLinks.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current.id);
    });
  }, { passive: true });
})();
