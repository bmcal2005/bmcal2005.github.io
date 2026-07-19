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

  // Tag each .shots container with a data-count attribute (number of images)
  function tagShotCounts(){
    document.querySelectorAll('.project .shots').forEach(shots => {
      const imgCount = shots.querySelectorAll('img').length;
      const shotCount = shots.querySelectorAll('.shot').length;
      const count = imgCount || shotCount || 0;
      shots.setAttribute('data-count', String(Math.min(count, 6)));
    });
  }
  tagShotCounts();
  // Re-run after window load to account for late-loading images
  window.addEventListener('load', tagShotCounts);

  // Classify each .shot by its image orientation and set an aspect CSS variable
  function classifyShotOrientations(){
    document.querySelectorAll('.project .shots').forEach(shots => {
      shots.querySelectorAll('.shot').forEach(shot => {
        const img = shot.querySelector('img');
        function applyClass(){
          if(!img || !img.naturalWidth || !img.naturalHeight){
            shot.classList.remove('landscape','portrait','square');
            shot.classList.add('square');
            shot.style.setProperty('--aspect','1/1');
            return;
          }
          const w = img.naturalWidth; const h = img.naturalHeight;
          const ratio = w / h;
          shot.classList.remove('landscape','portrait','square');
          if(ratio > 1.25){
            shot.classList.add('landscape');
            shot.style.setProperty('--aspect','16/9');
          } else if(ratio < 0.8){
            shot.classList.add('portrait');
            shot.style.setProperty('--aspect','3/4');
          } else {
            shot.classList.add('square');
            shot.style.setProperty('--aspect','1/1');
          }
        }
        if(!img){ applyClass(); }
        else if(img.complete){ applyClass(); }
        else { img.addEventListener('load', applyClass); }
      });
    });
  }
  classifyShotOrientations();
  window.addEventListener('load', classifyShotOrientations);

  document.querySelectorAll('.back-to-top').forEach(btn => {
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
});
