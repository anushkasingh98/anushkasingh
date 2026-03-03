/**
 * Design 3: Warm Brutalist — Main JS
 * Raw. Bold. Industrial.
 */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initCurrentNavLink();
});

function initNav() {
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when clicking a link
  links.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initCurrentNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('nav__link--active');
    }
  });
}

/**
 * Template function for blog cards — Warm Brutalist style.
 * Full-width stacked cards with thick borders.
 */
function blogCardTemplate(item) {
  const date = Router.formatDate(item.date);
  const tags = item.tags ? item.tags.map(t => `<span class="card__tag">${t}</span>`).join('') : '';
  return `
    <article class="card">
      <div class="card__image">Blog</div>
      <div class="card__body">
        <time class="card__date" datetime="${item.date}">${date}</time>
        <h3 class="card__title"><a href="post.html?slug=${item.slug}">${item.title}</a></h3>
        <p class="card__excerpt">${item.excerpt}</p>
        <div class="card__tags">${tags}</div>
      </div>
    </article>
  `;
}

/**
 * Template function for project cards — Warm Brutalist style.
 * Full-width stacked cards with thick borders and status badges.
 */
function projectCardTemplate(item) {
  const date = Router.formatDate(item.date);
  const tags = item.tags ? item.tags.map(t => `<span class="card__tag">${t}</span>`).join('') : '';
  const status = item.status ? `<span class="card__tag" style="color:var(--color-accent);border-color:var(--color-accent)">${item.status}</span>` : '';
  return `
    <article class="card">
      <div class="card__image">Project</div>
      <div class="card__body">
        <time class="card__date" datetime="${item.date}">${date}</time>
        <h3 class="card__title"><a href="project.html?slug=${item.slug}">${item.title}</a></h3>
        <p class="card__excerpt">${item.excerpt}</p>
        <div class="card__tags">${status}${tags}</div>
      </div>
    </article>
  `;
}
