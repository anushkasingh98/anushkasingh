/**
 * Design 5: Modern Grid Dark Mode — Main JS
 */
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initDrawer();
  initCurrentNavLink();
});

/* ==========================================================================
   Dark / Light Mode Toggle
   ========================================================================== */
function initThemeToggle() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  // Load saved preference or default to dark
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('light-mode');
  }

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

/* ==========================================================================
   Side Drawer Navigation
   ========================================================================== */
function initDrawer() {
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.drawer');
  const overlay = document.querySelector('.drawer-overlay');
  const closeBtn = document.querySelector('.drawer__close');

  if (!hamburger || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('active');
    overlay.classList.add('active');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('active');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  overlay.addEventListener('click', closeDrawer);

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });

  // Close when clicking a navigation link
  drawer.querySelectorAll('.drawer__link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   Current Page Highlighting
   ========================================================================== */
function initCurrentNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.drawer__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('drawer__link--active');
    }
  });
}

/* ==========================================================================
   Blog Card Template (used by ContentLoader)
   ========================================================================== */
function blogCardTemplate(item) {
  const date = Router.formatDate(item.date);
  const tags = item.tags
    ? item.tags.map(t => '<span class="card__tag">' + t + '</span>').join('')
    : '';
  return (
    '<article class="card">' +
      '<div class="card__accent"></div>' +
      '<div class="card__body">' +
        '<time class="card__date" datetime="' + item.date + '">' + date + '</time>' +
        '<h3 class="card__title"><a href="post.html?slug=' + item.slug + '">' + item.title + '</a></h3>' +
        '<p class="card__excerpt">' + item.excerpt + '</p>' +
        '<div class="card__tags">' + tags + '</div>' +
        '<span class="card__arrow">&rarr;</span>' +
      '</div>' +
    '</article>'
  );
}

/* ==========================================================================
   Project Card Template (used by ContentLoader)
   ========================================================================== */
function projectCardTemplate(item) {
  const date = Router.formatDate(item.date);
  const tags = item.tags
    ? item.tags.map(t => '<span class="card__tag">' + t + '</span>').join('')
    : '';
  const status = item.status
    ? '<span class="card__tag card__status">' + item.status + '</span>'
    : '';
  return (
    '<article class="card">' +
      '<div class="card__accent"></div>' +
      '<div class="card__body">' +
        '<time class="card__date" datetime="' + item.date + '">' + date + '</time>' +
        '<h3 class="card__title"><a href="project.html?slug=' + item.slug + '">' + item.title + '</a></h3>' +
        '<p class="card__excerpt">' + item.excerpt + '</p>' +
        '<div class="card__tags">' + status + tags + '</div>' +
        '<span class="card__arrow">&rarr;</span>' +
      '</div>' +
    '</article>'
  );
}
