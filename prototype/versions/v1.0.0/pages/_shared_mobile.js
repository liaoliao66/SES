// Shared helpers for mobile prototype pages (vanilla JS, no build).
function qs(sel, root) { return (root || document).querySelector(sel); }
function qsa(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }

function toast(message) {
  const el = document.createElement('div');
  el.className = 'fixed left-1/2 -translate-x-1/2 bottom-24 z-[999] px-4 py-2 rounded-2xl text-sm font-medium text-white bg-slate-900/90 shadow-[0_8px_24px_rgba(0,0,0,0.18)]';
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity 250ms ease'; }, 1200);
  setTimeout(() => el.remove(), 1700);
}

function navTo(page) {
  window.location.href = page;
}

function navBack(fallback) {
  if (history.length > 1) history.back();
  else if (fallback) navTo(fallback);
}

/** 同步 fixed 顶栏高度，避免内容被遮挡 */
function syncMobileLayout() {
  const header = document.querySelector('.mobile-header');
  if (header) {
    document.documentElement.style.setProperty('--mobile-header-h', header.offsetHeight + 'px');
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', syncMobileLayout);
  window.addEventListener('resize', syncMobileLayout);
}

function setActiveTab(tabId) {
  const items = qsa('[data-tab]');
  items.forEach(i => {
    const active = i.dataset.tab === tabId;
    i.classList.toggle('text-slate-900', active);
    i.classList.toggle('text-slate-500', !active);
    const dot = i.querySelector('[data-dot]');
    if (dot) dot.classList.toggle('opacity-100', active);
    if (dot) dot.classList.toggle('opacity-0', !active);
  });
}

