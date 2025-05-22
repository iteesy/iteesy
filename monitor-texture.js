// animated CRT scanline and noise texture for .monitor-screen
(function() {
  function createMonitorTexture() {
    const screen = document.querySelector('.monitor-screen');
    if (!screen) return;

    // canvas
    const canvas = document.createElement('canvas');
    canvas.className = 'monitor-texture-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = 2;
    screen.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = screen.offsetWidth;
      canvas.height = screen.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function drawTexture(time) {
      // Only draw if not off
      if (screen.classList.contains('monitor-off')) {
        canvas.style.display = 'none';
        requestAnimationFrame(drawTexture);
        return;
      } else {
        canvas.style.display = '';
      }
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Draw scanlines
      for (let y = 0; y < h; y += 2) {
        ctx.globalAlpha = 0.22 + 0.08 * Math.sin((time/300) + y/10);
        ctx.fillStyle = 'rgba(120, 200, 255, 0.32)';
        ctx.fillRect(0, y, w, 2);
      }
      ctx.globalAlpha = 1;

      // Draw subtle noise
      const imageData = ctx.getImageData(0, 0, w, h);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 8;
        data[i] = data[i] + noise;     // R
        data[i+1] = data[i+1] + noise; // G
        data[i+2] = data[i+2] + noise; // B
      }
      ctx.putImageData(imageData, 0, 0);

      requestAnimationFrame(drawTexture);
    }

    requestAnimationFrame(drawTexture);

    //function to hide/show the canvas externally
    window.toggleMonitorScanlines = function(show) {
      canvas.style.display = show ? '' : 'none';
    };
  }

  document.addEventListener('DOMContentLoaded', function() {
    const el = document.querySelector('.opening-line');
    if (!el) return;
    const text = el.textContent;
    el.textContent = '';
    let i = 0;
    function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        // Subtle opacity flicker
        el.style.opacity = '0.7';
        setTimeout(() => {
          el.style.opacity = '1';
        }, 40);
        // Random delay between 20ms and 120ms
        const delay = 20 + Math.random() * 100;
        i++;
        setTimeout(type, delay);
      }
    }
    type();
  });

  document.addEventListener('DOMContentLoaded', createMonitorTexture);
})(); 