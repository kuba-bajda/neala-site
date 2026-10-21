/* Neala landing page. No build step, no dependencies. */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Footer year ---------- */

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Scroll reveal ----------
     Elements rise in as they enter the viewport. Each one reveals once and is
     then unobserved. Reduced motion skips the whole mechanism — the CSS already
     renders .reveal fully visible under that media query. */

  var revealables = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.1 });

    revealables.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Hero video ----------
     Nothing plays until she asks. Before the first play, the native controls
     are swapped for one big play button; after it, the native player takes
     over (pause, seek, volume, fullscreen). */

  var heroVideo = document.getElementById('hero-video');
  var playButton = document.getElementById('hero-play');

  heroVideo.controls = false;
  playButton.hidden = false;
  playButton.addEventListener('click', function () {
    playButton.hidden = true;
    heroVideo.controls = true;
    heroVideo.play();
  });

  /* ---------- Header hairline ----------
     The border only appears once the page has scrolled off the top. */

  var header = document.getElementById('site-header');
  var sentinel = document.createElement('div');
  sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:1px';
  document.body.prepend(sentinel);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      header.classList.toggle('is-stuck', !entries[0].isIntersecting);
    }).observe(sentinel);
  }

  /* ---------- Active nav link ----------
     Highlights whichever linked section is currently furthest down the
     viewport, so the nav tracks the scroll position. */

  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a'));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var visible = new Set();

    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });

      var current = sections.filter(function (s) { return visible.has(s); }).pop();
      navLinks.forEach(function (link) {
        link.classList.toggle(
          'is-active',
          !!current && link.getAttribute('href') === '#' + current.id
        );
      });
    }, { rootMargin: '-20% 0px -60% 0px' });

    sections.forEach(function (s) { sectionObserver.observe(s); });
  }

  /* ---------- FAQ accordion ----------
     <details> handles open/close natively; this only enforces one-at-a-time. */

  var faqItems = Array.prototype.slice.call(document.querySelectorAll('.faq details'));
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      faqItems.forEach(function (other) { if (other !== item) other.open = false; });
    });
  });

  /* ---------- Waitlist ----------
     Posts straight to the `waitlist` table on the Neala Supabase project via
     PostgREST. Insert-only RLS: the anon key has INSERT but no SELECT, so this
     is a plain insert rather than an upsert (an upsert would need SELECT). */

  var SUPABASE_URL = 'https://fhbalobhjoxwsscuadyk.supabase.co';
  var SUPABASE_ANON_KEY = 'sb_publishable_dJAZFeYFl8la9ukj0JCwrg_r7sd3Vhj';

  var form = document.getElementById('waitlist');
  var input = document.getElementById('email');
  var button = form.querySelector('button');
  var msg = document.getElementById('msg');

  function show(text) { msg.textContent = text; }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var email = input.value.trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      show('Please enter a valid email address.');
      return;
    }

    button.disabled = true;
    show('');

    fetch(SUPABASE_URL + '/rest/v1/waitlist', {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ email: email, source: 'landing' })
    })
      .then(function (res) {
        // 409 is the unique-constraint violation: she is already on the list,
        // which is the same outcome for her as a fresh sign-up.
        if (!res.ok && res.status !== 409) throw new Error('HTTP ' + res.status);
        show("You're on the list. We'll be in touch.");
        form.reset();
      })
      .catch(function () {
        show('Something went wrong. Please try again in a moment.');
        button.disabled = false;
      });
  });
})();
