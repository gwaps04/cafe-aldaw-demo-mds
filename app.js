(function () {
  'use strict';

  const state = {
    category: 'All',
    search: ''
  };

  const categoryColors = {
    'Snacks': '#D4A373',
    'Rice Meals': '#7A8B6E',
    'Noodles & Pasta': '#E6C58E',
    'Coffee': '#6F4E37',
    'Non-Coffee': '#D68C6F',
    'Matcha': '#9CAF88',
    'Desserts / Shaved Ice': '#C9ADA7',
    default: '#9CAF88'
  };

  const escapeHTML = (str) =>
    String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  const escapeXml = (str) =>
    String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');

  function formatMoney(amount) {
    const symbol = CAFE_CONFIG.currency || '₱';
    return `${symbol}${Number(amount).toLocaleString('en-PH')}`;
  }

  function getInitials(name) {
    const words = name.split(/\s+/).filter(Boolean);
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  function getPlaceholderSvg(item) {
    const bg = categoryColors[item.category] || categoryColors.default;
    const initials = getInitials(item.name);
    const words = item.name.split(/\s+/).filter(Boolean);
    const line1 = words.slice(0, 2).join(' ');
    const line2 = words.slice(2).join(' ');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="${bg}"/>
  <circle cx="200" cy="115" r="70" fill="rgba(255,255,255,0.18)"/>
  <text x="200" y="140" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="56" font-weight="700" fill="#fff" letter-spacing="2">${initials}</text>
  <text x="200" y="230" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="22" font-weight="500" fill="#fff">${escapeXml(line1)}</text>
  ${line2 ? `<text x="200" y="258" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="18" fill="rgba(255,255,255,0.85)">${escapeXml(line2)}</text>` : ''}
</svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.trim());
  }

  function getItemImage(item) {
    if (item.image) return item.image;
    return getPlaceholderSvg(item);
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  function switchTab(tab) {
    document.querySelectorAll('.view').forEach((view) => view.classList.remove('active'));
    const target = document.getElementById(`${tab}-view`);
    if (target) target.classList.add('active');

    document.querySelectorAll('.nav-item').forEach((nav) => nav.classList.toggle('active', nav.dataset.tab === tab));

    if (tab !== 'menu') {
      const bar = document.getElementById('search-bar');
      if (!bar.classList.contains('hidden')) {
        bar.classList.add('hidden');
        state.search = '';
        document.getElementById('search-input').value = '';
        renderMenu();
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function toggleSearch() {
    const bar = document.getElementById('search-bar');
    bar.classList.toggle('hidden');
    if (!bar.classList.contains('hidden')) {
      document.getElementById('search-input').focus();
    }
  }

  function clearSearch() {
    state.search = '';
    document.getElementById('search-input').value = '';
    renderMenu();
  }

  function renderCategories() {
    const list = document.getElementById('category-list');
    list.innerHTML = MENU_CATEGORIES.map((cat) => {
      const active = state.category === cat ? 'active' : '';
      return `<button class="category ${active}" data-category="${escapeHTML(cat)}" type="button">${escapeHTML(cat)}</button>`;
    }).join('');
  }

  function createCard(item) {
    const img = getItemImage(item);
    const badge = item.bestSeller ? '<span class="badge">Best Seller</span>' : '';
    return `<article class="item-card" data-id="${item.id}">
  <div class="item-img-wrap">
    <div class="item-img-bg" style="background-color:${categoryColors[item.category] || categoryColors.default}"></div>
    <img src="${img}" alt="${escapeHTML(item.name)}" loading="lazy" />
    ${badge}
  </div>
  <div class="item-body">
    <span class="item-category">${escapeHTML(item.category)}</span>
    <h3 class="item-name">${escapeHTML(item.name)}</h3>
    <p class="item-desc">${escapeHTML(item.description)}</p>
    <div class="item-footer">
      <span class="item-price">${formatMoney(item.price)}</span>
    </div>
  </div>
</article>`;
  }

  function renderMenu() {
    const term = state.search.trim().toLowerCase();
    let items = MENU_ITEMS;

    if (state.category === 'Best Sellers') {
      items = items.filter((i) => i.bestSeller);
    } else if (state.category !== 'All') {
      items = items.filter((i) => i.category === state.category);
    }

    if (term) {
      items = items.filter((i) => {
        const hay = `${i.name} ${i.description} ${i.category} ${(i.tags || []).join(' ')}`.toLowerCase();
        return hay.includes(term);
      });
    }

    const countEl = document.getElementById('menu-count');
    const grid = document.getElementById('menu-grid');

    countEl.textContent = `${items.length} item${items.length !== 1 ? 's' : ''}`;

    if (!items.length) {
      grid.innerHTML = '<p class="empty-note">No matches found. Try another search or category.</p>';
      return;
    }

    grid.innerHTML = items.map(createCard).join('');
  }

  function openItemModal(id) {
    const item = MENU_ITEMS.find((i) => i.id === id);
    if (!item) return;

    document.getElementById('modal-img').src = getItemImage(item);
    document.getElementById('modal-img').alt = item.name;
    document.getElementById('modal-category').textContent = item.category;
    document.getElementById('modal-title').textContent = item.name;
    document.getElementById('modal-price').textContent = formatMoney(item.price);
    document.getElementById('modal-desc').textContent = item.description;

    const modal = document.getElementById('item-modal');
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeItemModal() {
    const modal = document.getElementById('item-modal');
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }

  function updateInfo() {
    document.getElementById('info-hours').textContent = CAFE_CONFIG.hours;
    document.getElementById('info-location').textContent = CAFE_CONFIG.location;
    document.getElementById('info-tagline').textContent = CAFE_CONFIG.tagline;
    const ig = document.getElementById('info-instagram');
    if (ig) {
      ig.textContent = `@${CAFE_CONFIG.instagram}`;
      ig.href = `https://instagram.com/${CAFE_CONFIG.instagram}`;
    }
  }

  function startSplash() {
    const splash = document.getElementById('splash');
    const hide = () => splash.classList.add('hidden');
    splash.addEventListener('click', hide, { once: true });
    setTimeout(hide, 2800);
  }

  function initEvents() {
    document.getElementById('search-toggle').addEventListener('click', toggleSearch);
    document.getElementById('search-clear').addEventListener('click', clearSearch);
    document.getElementById('search-input').addEventListener('input', (e) => {
      state.search = e.target.value;
      renderMenu();
    });

    document.getElementById('category-list').addEventListener('click', (e) => {
      const btn = e.target.closest('.category');
      if (!btn) return;
      state.category = btn.dataset.category;
      renderCategories();
      renderMenu();
    });

    document.getElementById('menu-grid').addEventListener('click', (e) => {
      const card = e.target.closest('.item-card');
      if (card) openItemModal(card.dataset.id);
    });

    document.querySelector('.modal-close').addEventListener('click', closeItemModal);
    document.querySelector('.modal-backdrop').addEventListener('click', closeItemModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeItemModal();
    });

    document.querySelector('.bottom-nav').addEventListener('click', (e) => {
      const btn = e.target.closest('.nav-item');
      if (btn) switchTab(btn.dataset.tab);
    });
  }

  function registerSW() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
  }

  function init() {
    updateInfo();
    renderCategories();
    renderMenu();
    initEvents();
    startSplash();
    registerSW();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
