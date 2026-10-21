// Navegación animada: mover indicador y mostrar panel con animación
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const indicator = document.querySelector('.nav__indicator');
  const links = [...document.querySelectorAll('.nav__link')];
  const panels = [...document.querySelectorAll('.panel')];

  if (!nav || !indicator || links.length === 0) return;

  const updateIndicator = (el) => {
    if (!el) return;

    const navRect = nav.getBoundingClientRect();
    const rect = el.getBoundingClientRect();

    indicator.style.width = `${rect.width}px`;
    indicator.style.transform = `translateX(${rect.left - navRect.left}px)`;
  };

  const setActiveLink = (el) => {
    links.forEach(link => link.classList.toggle('active', link === el));
    updateIndicator(el);
  };

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const activeLink =
    links.find(link => {
      const href = (link.getAttribute('href') || '').replace(/\/+$/, '');
      const pageName = href.split('/').pop() || '';
      return pageName === currentPage || href === window.location.pathname;
    }) || links[0];

  if (activeLink) setActiveLink(activeLink);

  // Si hay paneles en la página, se activa navegación interna por tabs
  if (panels.length) {
    links.forEach(link => {
      const href = link.getAttribute('href') || '';

      if (!href.startsWith('#')) return;

      link.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = href.slice(1);
        const targetPanel = document.getElementById(targetId);

        if (!targetPanel) return;

        panels.forEach(panel => {
          panel.classList.toggle('active', panel === targetPanel);
        });

        setActiveLink(link);
      });
    });
  }

  // Para páginas separadas (index.html, about.html, etc.), dejamos que el navegador navegue normalmente
  window.addEventListener('resize', () => {
    const active = document.querySelector('.nav__link.active');
    if (active) updateIndicator(active);
  });
});
