// Botón para pausar/reanudar las animaciones del fondo
const btn = document.getElementById('toggle-ambient');
const storageKey = 'ambient-anim-enabled';

function renderButton(enabled){
  btn.innerHTML = enabled
    ? "▶️ Animación: <strong>ACTIVA</strong>"
    : "🛑 Animación: <strong>PAUSADA</strong>";
}
function setAmbientAnim(enabled){
  document.body.classList.toggle('paused', !enabled);
  btn.setAttribute('aria-pressed', String(!enabled));
  renderButton(enabled);
}

// Estado inicial guardado
const saved = localStorage.getItem(storageKey);
const startEnabled = saved === null ? true : saved === '1';
setAmbientAnim(startEnabled);
renderButton(startEnabled);

btn.addEventListener('click', () =>{
  const isPaused = document.body.classList.contains('paused'); // true => actualmente pausada
  const nextEnabled = isPaused;  // si está pausada, la activamos; si no, la pausamos
  setAmbientAnim(nextEnabled);
  localStorage.setItem(storageKey, nextEnabled ? '1' : '0');
});
/* ====================
   LIGHTBOX (click para ampliar imágenes)
   ==================== */
// Crear contenedor de lightbox una sola vez
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
  <figure>
    <img src="" alt="Imagen ampliada">
    <figcaption class="caption"></figcaption>
  </figure>
`;
document.body.appendChild(lightbox);

function openLightbox(src, captionText){
  const img = lightbox.querySelector('img');
  const caption = lightbox.querySelector('.caption');
  img.src = src;
  caption.textContent = captionText || '';
  lightbox.classList.add('open');
  // Cerrar con ESC
  const onKey = (e) => {
    if(e.key === 'Escape'){ closeLightbox(); }
  };
  document.addEventListener('keydown', onKey, { once: true });
}

function closeLightbox(){
  lightbox.classList.remove('open');
}

// Cerrar al hacer click fuera de la imagen
lightbox.addEventListener('click', (e) => {
  const clickedImg = e.target.tagName === 'IMG';
  if(!clickedImg){ closeLightbox(); }
});

// Delegación: escuchar clicks en todas las imágenes de tarjetas
document.querySelectorAll('.card img').forEach(img => {
  img.addEventListener('click', () => {
    const title = img.closest('.card')?.querySelector('h3')?.textContent || img.alt || '';
    openLightbox(img.src, title);
  });
});