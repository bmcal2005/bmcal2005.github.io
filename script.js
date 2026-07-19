document.addEventListener('DOMContentLoaded', () => {
  const views = document.querySelectorAll('.view');

  function showView(name){
    if (!name || !document.getElementById(name)) {
      name = 'home';
    }
    views.forEach(v => v.classList.toggle('active', v.id === name));
    document.querySelectorAll('.sidebar nav a').forEach(a => {
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

  // ---- lightbox: click-to-enlarge, opens in the same tab as an overlay ----
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  function openLightbox(src, alt){
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('active');
  }
  function closeLightbox(){
    lightbox.classList.remove('active');
    lightboxImg.src = '';
  }

  document.querySelectorAll('[data-lightbox]').forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
});