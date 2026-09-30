(function () {
  'use strict';

  var reduce = window.matchMedia &&
               window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================================================
     1. MENU MOBILE
     ========================================================= */
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (!document.body.classList.contains('menu-open')) return;
      var nav = document.querySelector('.nav');
      if (nav && !nav.contains(e.target) && e.target !== toggle) {
        document.body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || !document.body.classList.contains('menu-open')) return;
      document.body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    });
  }

  /* =========================================================
     2. HEADER AU SCROLL
     ========================================================= */
  var header = document.querySelector('.header');
  if (header) {
    var onScrollHeader = function () {
      var y = window.scrollY || window.pageYOffset;
      header.classList.toggle('is-scrolled', y > 120);
    };
    window.addEventListener('scroll', onScrollHeader, { passive: true });
    onScrollHeader();
  }

  /* =========================================================
     3. REVEAL GÉNÉRIQUE
     ========================================================= */
  var targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !targets.length) {
    for (var i = 0; i < targets.length; i++) targets[i].classList.add('is-visible');
  } else {
    var io = new IntersectionObserver(function (entries) {
      for (var j = 0; j < entries.length; j++) {
        if (!entries[j].isIntersecting) continue;
        entries[j].target.classList.add('is-visible');
        io.unobserve(entries[j].target);
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    for (var k = 0; k < targets.length; k++) {
      targets[k].style.transitionDelay = Math.min(k % 6, 5) * 70 + 'ms';
      io.observe(targets[k]);
    }
  }

  /* =========================================================
     4. S2 OUVERTURE — filet d'or
     ========================================================= */
  var ouvRule = document.querySelector('.s-ouverture__rule');
  if (ouvRule && 'IntersectionObserver' in window) {
    var ouvIO = new IntersectionObserver(function (entries) {
      for (var o = 0; o < entries.length; o++) {
        if (!entries[o].isIntersecting) continue;
        ouvRule.classList.add('is-on');
        ouvIO.disconnect();
        break;
      }
    }, { threshold: 0.3 });
    ouvIO.observe(ouvRule);
  } else if (ouvRule) {
    ouvRule.classList.add('is-on');
  }

  /* =========================================================
     5. CTA FIL DU COMMISSAIRE
     ========================================================= */
  var thread = document.querySelector('.cta-thread');
  if (thread) {
    var threadTarget = document.querySelector('#ouverture') || document.querySelector('.s-ouverture');
    thread.addEventListener('click', function (e) {
      if (reduce || !threadTarget) return;
      e.preventDefault();
      if (thread.classList.contains('is-snapped')) {
        threadTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      thread.classList.add('is-snapped');
      setTimeout(function () {
        threadTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 520);
      setTimeout(function () {
        thread.classList.remove('is-snapped');
      }, 2400);
    });
  }

  /* =========================================================
     6. HERO VITRINE — filet de lumière + rotation 3D
     ========================================================= */
  var prestigeHero = document.querySelector('.hero-v2--prestige');
  if (prestigeHero && !reduce) {
    var vitrine = prestigeHero.querySelector('.hero-v2__vitrine');
    var beam    = prestigeHero.querySelector('.hero-v2__light-beam');
    var object  = prestigeHero.querySelector('.hero-v2__object');

    if (vitrine && beam && object &&
        window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      var onMove = function (e) {
        var r = vitrine.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width  - .5;
        var y = (e.clientY - r.top)  / r.height - .5;
        beam.style.setProperty('--beam-x', (x * 80).toFixed(1) + 'px');
        object.style.setProperty('--ry', (x * 8).toFixed(2) + 'deg');
        object.style.setProperty('--rx', (-y * 6).toFixed(2) + 'deg');
      };
      vitrine.addEventListener('mousemove', onMove, { passive: true });
      vitrine.addEventListener('mouseleave', function () {
        object.style.setProperty('--ry', '0deg');
        object.style.setProperty('--rx', '0deg');
        beam.style.setProperty('--beam-x', '0');
      });
    }
  }

  /* =========================================================
     7. FAQ — accordéon exclusif
     ========================================================= */
  var faqs = document.querySelectorAll('.faq details');
  if (faqs.length > 1) {
    for (var n = 0; n < faqs.length; n++) {
      faqs[n].addEventListener('toggle', function (ev) {
        if (!ev.target.open) return;
        for (var m = 0; m < faqs.length; m++) {
          if (faqs[m] !== ev.target) faqs[m].open = false;
        }
      });
    }
  }

})();