// ===================================================
// SHOOTING STARS (TUTA TARA) — Grok Style
// ===================================================
(function() {
  const canvas = document.getElementById('shooting-stars-canvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const stars = [];

  // Twinkling background stars
  const bgStars = Array.from({length: 180}, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.5 + 0.3,
    alpha: Math.random(),
    speed: Math.random() * 0.012 + 0.004
  }));

  function makeGradient(ctx, s) {
    const grd = ctx.createLinearGradient(
      s.x - Math.cos(s.angle) * s.len,
      s.y - Math.sin(s.angle) * s.len,
      s.x, s.y
    );
    grd.addColorStop(0, 'rgba(0,0,0,0)');
    grd.addColorStop(0.7, s.color === '#0ef'
      ? 'rgba(0,238,255,0.5)'
      : 'rgba(168,85,247,0.5)');
    grd.addColorStop(1, '#ffffff');
    return grd;
  }

  class ShootingStar {
    constructor() { this.reset(); }
    reset() {
      if (Math.random() > 0.5) {
        this.x = Math.random() * canvas.width;
        this.y = -20;
      } else {
        this.x = -20;
        this.y = Math.random() * canvas.height * 0.6;
      }
      this.len   = Math.random() * 220 + 100;
      this.speed = Math.random() * 9 + 6;
      this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.4;
      this.alpha = 1;
      this.width = Math.random() * 2.5 + 1;
      this.color = Math.random() > 0.5 ? '#0ef' : '#a855f7';
      this.fade  = Math.random() * 0.015 + 0.008;
      this.tail  = [];
    }
    update() {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      this.alpha -= this.fade;
      if (Math.random() > 0.6) {
        this.tail.push({ x: this.x, y: this.y, alpha: 0.8, r: Math.random() * 2 + 0.5 });
      }
      this.tail.forEach(p => { p.alpha -= 0.04; });
      this.tail = this.tail.filter(p => p.alpha > 0);
      if (this.alpha <= 0) this.reset();
    }
    draw(ctx) {
      this.tail.forEach(p => {
        ctx.save();
        ctx.globalAlpha = p.alpha * 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      });
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.strokeStyle = makeGradient(ctx, this);
      ctx.lineWidth = this.width;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.moveTo(
        this.x - Math.cos(this.angle) * this.len,
        this.y - Math.sin(this.angle) * this.len
      );
      ctx.lineTo(this.x, this.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.width * 1.6, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 20;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 6; i++) {
    const s = new ShootingStar();
    s.x = Math.random() * canvas.width;
    s.y = Math.random() * canvas.height * 0.5;
    stars.push(s);
  }

  setInterval(() => {
    if (stars.length < 10) stars.push(new ShootingStar());
  }, 900);

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bgStars.forEach(s => {
      s.alpha += s.speed * (Math.random() > 0.5 ? 1 : -1);
      s.alpha = Math.max(0.05, Math.min(1, s.alpha));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,' + s.alpha + ')';
      ctx.fill();
    });
    stars.forEach(s => { s.update(); s.draw(ctx); });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ===================================================
// TIME-BASED GREETING — VOICE ONLY (Speech Synthesis)
// ===================================================
(function() {
  function speakGreeting() {
    if (!window.speechSynthesis) return;
    const h = new Date().getHours();
    let greeting;
    if (h >= 5 && h < 12) {
      greeting = "Good Morning! Welcome to Raghav Agrawal's portfolio. Have a wonderful day!";
    } else if (h >= 12 && h < 17) {
      greeting = "Good Afternoon! Welcome to Raghav Agrawal's portfolio. Hope you are having a great day!";
    } else if (h >= 17 && h < 21) {
      greeting = "Good Evening! Welcome to Raghav Agrawal's portfolio. Enjoy exploring his work!";
    } else {
      greeting = "Good Night! Welcome to Raghav Agrawal's portfolio. Still working late? So does Raghav!";
    }
    const utter = new SpeechSynthesisUtterance(greeting);
    utter.lang   = 'en-IN';
    utter.rate   = 0.92;
    utter.pitch  = 1.05;
    utter.volume = 1;
    // Pick a pleasant voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female'))
                   || voices.find(v => v.lang.startsWith('en'))
                   || voices[0];
    if (preferred) utter.voice = preferred;
    window.speechSynthesis.speak(utter);
  }

  // Voices may not load instantly — wait for them
  if (window.speechSynthesis.getVoices().length > 0) {
    speakGreeting();
  } else {
    window.speechSynthesis.addEventListener('voiceschanged', speakGreeting, { once: true });
  }
})();

// ===================================================
// BACKGROUND AMBIENT MUSIC
// ===================================================
(function() {
  const btn   = document.getElementById('music-toggle');
  const audio = document.getElementById('bg-music');
  if (!btn || !audio) return;
  let playing = false;
  audio.volume = 0.18;
  btn.addEventListener('click', () => {
    if (!playing) {
      audio.play().then(() => {
        btn.textContent = '\uD83D\uDD07';
        btn.title = 'Pause Music';
        playing = true;
      }).catch(() => {});
    } else {
      audio.pause();
      btn.textContent = '\uD83C\uDFB5';
      btn.title = 'Play Music';
      playing = false;
    }
  });
})();
