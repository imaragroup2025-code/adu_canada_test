// ==============================
// ADU Canada — site.js
// Clean, minimal JavaScript
// ==============================

// Global Config
const SALES_EMAIL = "sales@aducanada.com";
const PHONE_NUMBER = "980-222-4469";

// ==============================
// Mobile Menu Toggle
// Uses the existing .menu-toggle button in the HTML
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  const toggle = document.querySelector('.menu-toggle');

  if (!nav || !toggle) return;

  toggle.setAttribute('aria-label', 'Toggle menu');
  toggle.setAttribute('aria-expanded', 'false');

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.innerHTML = isOpen ? '✕' : '☰';
  });

  // Close menu when clicking any nav link (mobile)
  const navLinks = nav.querySelectorAll('a[href]');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (!nav.classList.contains('nav-open')) return;
      nav.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = '☰';
    });
  });
});

// ==============================
// Helper: mailto links
// ==============================
function mailto(subject) {
  return `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

// ==============================
// CTA Button Wiring
// Ensures all CTA buttons link to correct mailto
// ==============================
(function wireCTAs() {
  const rules = [
    { match: /contact sales/i, href: mailto("ADU Canada - Contact Sales") },
    { match: /schedule.*consultation/i, href: mailto("ADU Canada - Schedule a Consultation") },
    { match: /get (your )?price/i, href: mailto("ADU Canada - Get Your Price") },
  ];

  function closestClickable(el) {
    let cur = el;
    for (let i = 0; i < 10 && cur; i++) {
      const tag = (cur.tagName || "").toLowerCase();
      if (tag === "a" || tag === "button") return cur;
      if (cur.classList && (
        cur.classList.contains("btn") ||
        cur.classList.contains("btn-primary") ||
        cur.classList.contains("btn-secondary")
      )) return cur;
      cur = cur.parentElement;
    }
    return null;
  }

  function normalizeText(s) {
    return (s || "").replace(/\s+/g, " ").trim();
  }

  document.addEventListener("click", function (e) {
    const el = closestClickable(e.target);
    if (!el) return;

    const text = normalizeText(el.textContent);
    if (!text) return;

    for (const r of rules) {
      if (r.match.test(text)) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof e.stopImmediatePropagation === "function") {
          e.stopImmediatePropagation();
        }
        window.location.href = r.href;
        return;
      }
    }
  }, true);
})();

// ==============================
// Replace placeholder phone numbers
// ==============================
(function normalizePhoneNumbers() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
  let node;
  while ((node = walker.nextNode())) {
    if (node.nodeValue && node.nodeValue.includes("404-555-0123")) {
      node.nodeValue = node.nodeValue.replace(/404-555-0123/g, PHONE_NUMBER);
    }
  }
})();
