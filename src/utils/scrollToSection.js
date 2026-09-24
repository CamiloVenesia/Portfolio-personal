// Función reutilizable de scroll suave con easing.
// Se usa desde el Header (menú) y desde el Hero (botones "Ver Proyectos" / "Hablemos").
export const scrollToSection = (e, targetId, onStart) => {
  e.preventDefault();

  if (onStart) onStart();

  const target = document.getElementById(targetId);
  if (!target) return;

  const targetPosition = target.getBoundingClientRect().top + window.scrollY;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const duration = 800;
  let start = null;

  const animation = (currentTime) => {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const progress = Math.min(timeElapsed / duration, 1);

    // Curva de aceleración (arranca rápido, frena suave)
    const ease =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, startPosition + distance * ease);

    if (timeElapsed < duration) requestAnimationFrame(animation);
  };

  requestAnimationFrame(animation);
};