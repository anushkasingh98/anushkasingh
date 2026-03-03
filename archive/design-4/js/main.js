/**
 * Design 4: Organic & Flowing — Main JS
 */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initCurrentNavLink();
});

/**
 * Mobile navigation toggle.
 * Handles the centered arc-style nav with mobile fallback.
 */
function initNav() {
  const toggle = document.querySelector('.nav__toggle');
  const mobileLinks = document.querySelector('.nav__mobile-links');
  if (!toggle || !mobileLinks) return;

  toggle.addEventListener('click', () => {
    const isOpen = mobileLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when clicking a link
  mobileLinks.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      mobileLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav') && mobileLinks.classList.contains('open')) {
      mobileLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * Highlight the current page in the navigation.
 */
function initCurrentNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('nav__link--active');
    }
  });
}

/**
 * Template function for blog cards (used by ContentLoader).
 * Organic style: no borders, generous radius, soft shadows, masonry-ready.
 */
function blogCardTemplate(item) {
  const date = Router.formatDate(item.date);
  const tags = item.tags
    ? item.tags.map(t => '<span class="card__tag">' + t + '</span>').join('')
    : '';
  return (
    '<article class="card">' +
      '<div class="card__image">Blog Image</div>' +
      '<div class="card__body">' +
        '<time class="card__date" datetime="' + item.date + '">' + date + '</time>' +
        '<h3 class="card__title"><a href="post.html?slug=' + item.slug + '">' + item.title + '</a></h3>' +
        '<p class="card__excerpt">' + item.excerpt + '</p>' +
        '<div class="card__tags">' + tags + '</div>' +
      '</div>' +
    '</article>'
  );
}

/**
 * Template function for project cards.
 * Organic style with status badge and soft shadows.
 */
function projectCardTemplate(item) {
  const date = Router.formatDate(item.date);
  const tags = item.tags
    ? item.tags.map(t => '<span class="card__tag">' + t + '</span>').join('')
    : '';
  const status = item.status
    ? '<span class="card__status">' + item.status + '</span>'
    : '';
  return (
    '<article class="card">' +
      '<div class="card__image">Project Image</div>' +
      '<div class="card__body">' +
        '<time class="card__date" datetime="' + item.date + '">' + date + '</time>' +
        '<h3 class="card__title"><a href="project.html?slug=' + item.slug + '">' + item.title + '</a></h3>' +
        '<p class="card__excerpt">' + item.excerpt + '</p>' +
        '<div class="card__tags">' + status + tags + '</div>' +
      '</div>' +
    '</article>'
  );
}
