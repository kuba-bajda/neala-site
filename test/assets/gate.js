/* Private-preview gate, shared by /test, /privacy and /terms.

   A door, not a lock. The word ships in this file like any other text, so it
   keeps a passer-by out and nothing more — the static host has no server-side
   auth to offer. Nothing behind it is secret.

   Loaded synchronously in <head>: it locks <html> before first paint, then adds
   the form once <body> exists. Unlocking lasts for the browser tab's session. */
(function () {
  var PASSCODE = 'muscleup';
  var KEY = 'neala_preview_ok';

  try {
    if (sessionStorage.getItem(KEY) === '1') return;
  } catch (e) { /* private browsing: just ask again */ }
  document.documentElement.className += ' locked';

  document.addEventListener('DOMContentLoaded', function () {
    var gate = document.createElement('div');
    gate.id = 'gate';
    gate.innerHTML =
      '<form id="gate-form">' +
        '<p class="g-brand">Neala</p>' +
        '<p class="g-hint">Private preview. Enter the word you were sent.</p>' +
        '<label class="sr-only" for="gate-input">Passcode</label>' +
        '<input id="gate-input" type="password" autocomplete="off" autocapitalize="off" spellcheck="false" aria-describedby="gate-wrong">' +
        '<button type="submit">Enter</button>' +
        '<p class="g-wrong" id="gate-wrong" aria-live="polite"></p>' +
      '</form>';
    document.body.insertBefore(gate, document.body.firstChild);

    var input = document.getElementById('gate-input');
    var wrong = document.getElementById('gate-wrong');

    document.getElementById('gate-form').addEventListener('submit', function (e) {
      e.preventDefault();
      if (input.value.trim().toLowerCase() !== PASSCODE) {
        wrong.textContent = 'That is not the word.';
        input.value = '';
        input.focus();
        return;
      }
      try { sessionStorage.setItem(KEY, '1'); } catch (err) {}
      document.documentElement.className =
        document.documentElement.className.replace(/\blocked\b/, '').trim();
      // Arriving from another page with a #section: go there, not the top.
      var target = location.hash && document.querySelector(location.hash);
      if (target) target.scrollIntoView(); else window.scrollTo(0, 0);
    });

    input.focus();
  });
})();
