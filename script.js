document.addEventListener('DOMContentLoaded', () => {
  const views = document.querySelectorAll('.view');

  function showView(name){
    if (!name || !document.getElementById(name)) {
      name = 'home';
    }
    views.forEach(v => v.classList.toggle('active', v.id === name));
    document.querySelectorAll('nav.tabs a, .sidebar nav a').forEach(a => {
      a.classList.toggle('current', a.dataset.target === name);
    });
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  document.querySelectorAll('[data-target]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = el.dataset.target || el.getAttribute('href')?.replace(/^#/, '');
      if (target) {
        history.replaceState(null, '', `#${target}`);
        showView(target);
      }
    });
  });

  window.addEventListener('hashchange', () => {
    const target = window.location.hash.replace('#', '');
    showView(target);
  });

  showView(window.location.hash.replace('#', '') || 'home');

  document.querySelectorAll('.back-to-top').forEach(btn => {
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
});
