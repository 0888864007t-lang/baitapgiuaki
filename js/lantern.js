// Đèn kéo quân: 6 mặt xoay quanh trục dọc, rê chuột vào một hình thì dừng
(function () {
  const lantern = document.getElementById('lantern');
  const status = document.getElementById('status');
  const faces = lantern.querySelectorAll('.face');
  let angle = 0, last = null, paused = false;
  const SPEED = 40; // độ / giây

  faces.forEach((face, i) => {
    face.style.setProperty('--i', i);
    face.addEventListener('mouseenter', () => { paused = true; status.textContent = 'Đèn đang dừng ở hình ' + (i + 1); });
    face.addEventListener('mouseleave', () => { paused = false; status.textContent = 'Đèn đang quay'; });
    face.addEventListener('touchstart', () => { paused = !paused; status.textContent = paused ? 'Đèn đang dừng ở hình ' + (i + 1) : 'Đèn đang quay'; }, { passive: true });
  });

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function tick(t) {
    if (last !== null && !paused && !reduce) angle = (angle + SPEED * (t - last) / 1000) % 360;
    last = t;
    lantern.style.transform = 'rotateY(' + (-angle) + 'deg)';
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
