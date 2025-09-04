// Botón para pausar/reanudar las animaciones del fondo
const btn = document.getElementById('toggle-ambient');
const storageKey = 'ambient-anim-enabled';

function setAmbientAnim(enabled){
  document.body.style.animationPlayState = enabled ? 'running' : 'paused';
  btn.setAttribute('aria-pressed', String(!enabled));
  btn.querySelector('span').textContent = enabled ? 'ON' : 'OFF';
}

// Estado inicial guardado
const saved = localStorage.getItem(storageKey);
const startEnabled = saved === null ? true : saved === '1';
setAmbientAnim(startEnabled);

btn.addEventListener('click', () =>{
  const isRunning = document.body.style.animationPlayState !== 'paused';
  const next = !isRunning;
  setAmbientAnim(next);
  localStorage.setItem(storageKey, next ? '1' : '0');
});