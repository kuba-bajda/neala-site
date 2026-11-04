// GA4 behind Google Consent Mode v2 (LUN-166). Analytics cookies are denied
// until the visitor accepts in the banner; ad storage is always denied (no ads
// point at this site). The choice is kept in localStorage and can be changed
// from the footer's "Cookie settings" link.
//
// GA_ID empty = no Google tag, no banner, no footer link. Paste the GA4
// measurement id (G-…) to switch it all on.
(function () {
  var GA_ID = "";
  var KEY = "neala.consent"; // "granted" | "denied"
  if (!GA_ID) return;

  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function save(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  var choice = read();
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: choice === "granted" ? "granted" : "denied",
  });
  gtag("js", new Date());
  gtag("config", GA_ID);
  var tag = document.createElement("script");
  tag.async = true;
  tag.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  document.head.appendChild(tag);

  function decide(v) {
    save(v);
    gtag("consent", "update", { analytics_storage: v });
    var b = document.getElementById("cookie-banner");
    if (b) b.remove();
  }

  function showBanner() {
    if (document.getElementById("cookie-banner")) return;
    var b = document.createElement("div");
    b.id = "cookie-banner";
    b.className = "cookie-banner";
    b.setAttribute("role", "dialog");
    b.setAttribute("aria-label", "Cookie choice");
    b.innerHTML =
      '<p>Can we use Google Analytics cookies to see how people find and use this site? ' +
      'Nothing is stored unless you say yes. <a href="/privacy/#website">Privacy policy</a></p>' +
      '<div class="cookie-actions">' +
      '<button type="button" class="cookie-btn cookie-decline">No thanks</button>' +
      '<button type="button" class="cookie-btn cookie-accept">Accept</button>' +
      "</div>";
    b.querySelector(".cookie-accept").addEventListener("click", function () { decide("granted"); });
    b.querySelector(".cookie-decline").addEventListener("click", function () { decide("denied"); });
    document.body.appendChild(b);
  }

  document.querySelectorAll("[data-cookie-settings]").forEach(function (a) {
    a.hidden = false;
    a.addEventListener("click", function (e) { e.preventDefault(); showBanner(); });
  });
  if (choice !== "granted" && choice !== "denied") showBanner();
})();
