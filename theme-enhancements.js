/* Identidade visual compartilhada do Pet em Casa: patinhas discretas e pequenos estados interativos. */
(() => {
  const pawSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><g fill="#7626ce" fill-opacity=".10"><ellipse cx="28" cy="27" rx="7" ry="10" transform="rotate(-28 28 27)"/><ellipse cx="44" cy="19" rx="7" ry="10" transform="rotate(-8 44 19)"/><ellipse cx="60" cy="23" rx="7" ry="10" transform="rotate(18 60 23)"/><ellipse cx="72" cy="36" rx="7" ry="10" transform="rotate(35 72 36)"/><path d="M25 55c0-10 10-18 23-18s23 8 23 18c0 8-7 13-14 11-5-2-9-2-14 0-9 3-18-3-18-11z"/></g></svg>';
  const style = document.createElement('style');
  style.textContent = 'body{background-image:url("data:image/svg+xml,' + encodeURIComponent(pawSvg) + '"),linear-gradient(180deg,#fff8f5 0%,#fff 52%,#fff8f5 100%);background-repeat:repeat, no-repeat;background-size:108px 108px,100% 100%;background-attachment:fixed,scroll}body:has(.admin-wrap){background-image:url("data:image/svg+xml,' + encodeURIComponent(pawSvg) + '"),linear-gradient(180deg,#fff8f5 0%,#fff 100%)}';
  document.head.append(style);

  if (!document.querySelector('.admin-wrap')) return;
  const form = document.querySelector('#site-settings');
  const cards = [...document.querySelectorAll('.panel-card')];
  const markChanged = (event) => {
    const field = event.target;
    if (!field.matches('input,textarea')) return;
    field.dataset.changed = 'true';
    field.style.borderColor = '#a879ed';
    const card = field.closest('.panel-card');
    if (card) {
      let indicator = card.querySelector('.edit-state');
      if (!indicator) {
        indicator = document.createElement('span');
        indicator.className = 'edit-state';
        indicator.textContent = 'Alterações não salvas';
        indicator.style.cssText = 'display:inline-flex;align-items:center;width:max-content;max-width:100%;padding:5px 9px;border-radius:999px;background:#fff0f3;color:#c22c57;font-size:10px;font-weight:800;margin:0 0 10px';
        const heading = card.querySelector('.card-heading');
        if (heading) heading.insertAdjacentElement('afterend', indicator);
      }
    }
  };
  document.querySelectorAll('.panel-card').forEach(card => {
    card.addEventListener('input', markChanged);
    card.addEventListener('change', markChanged);
    card.addEventListener('click', event => {
      if (!event.target.closest('button')) return;
      const button = event.target.closest('button');
      if (/Salvar/.test(button.textContent)) {
        const state = card.querySelector('.edit-state');
        if (state) { state.textContent = 'Salvo neste navegador'; state.style.background = '#e5fff4'; state.style.color = '#176b56'; }
        card.querySelectorAll('[data-changed="true"]').forEach(field => { field.dataset.changed = 'false'; field.style.borderColor = ''; });
      }
    });
  });
  if (form) form.addEventListener('submit', () => {
    const state = form.closest('.panel-card')?.querySelector('.edit-state');
    if (state) { state.textContent = 'Salvo neste navegador'; state.style.background = '#e5fff4'; state.style.color = '#176b56'; }
  });
})();