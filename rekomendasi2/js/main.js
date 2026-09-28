/* SURENDO – template rekomendasi 2 (company profile) */
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

  /* ===== hero background slider ===== */
  var slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 1) {
    var cur = 0;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) {
      setInterval(function () {
        slides[cur].classList.remove('active');
        cur = (cur + 1) % slides.length;
        slides[cur].classList.add('active');
      }, 6000);
    } else {
      slides.forEach(function (s, i) { s.classList.toggle('active', i === 0); });
    }
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

  /* ===== reveal on scroll (slide up / slide in) ===== */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var d = parseInt(en.target.getAttribute('data-delay') || '0', 10);
          en.target.style.transitionDelay = d + 'ms';
          en.target.classList.add('in-view');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ===== active nav on scroll ===== */
  var sections = ['top', 'tentang', 'layanan', 'proyek', 'testimoni', 'kontak']
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

  /* ===== floating whatsapp panel ===== */
  var waToggle = document.getElementById('waToggle');
  var waPanel = document.getElementById('waPanel');
  var waClose = document.getElementById('waClose');
  if (waToggle && waPanel) {
    var setPanel = function (open) {
      if (open) waPanel.removeAttribute('hidden');
      else waPanel.setAttribute('hidden', '');
    };
    waToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      setPanel(waPanel.hasAttribute('hidden'));
    });
    if (waClose) waClose.addEventListener('click', function () { setPanel(false); });
    document.addEventListener('click', function (e) {
      if (!waPanel.hasAttribute('hidden') && !waPanel.contains(e.target) && e.target !== waToggle) {
        setPanel(false);
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setPanel(false);
    });
  }
})();
