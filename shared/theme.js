/* ═══════════════════════════════════════════════════════════════
   THEME ENGINE + SNAKE EASTER EGG
   
   - Finds hardcoded #pkThemeBtn in nav, wires click handler
   - Before Terminal unlocked: button → navigates to game.html
   - After unlocked: button → toggles Atelier ⇄ Terminal themes
   - Konami code opens Snake overlay
   - Win Snake → unlocks Terminal theme
   - Swaps hero background on theme change (if on landing page)
   ═══════════════════════════════════════════════════════════════ */

(function() {
  'use strict';
  
  const STORAGE_KEYS = {
    unlocked: 'pk-terminal-unlocked',
    theme: 'pk-theme',
  };
  
  const KONAMI = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a',
  ];
  
  const CASE_STUDIES = [
    { label: 'ASAP', color: '#E8513D' },
    { label: 'UA', color: '#FF8A6B' },
    { label: 'XD', color: '#7FDBA8' },
    { label: 'KEXP', color: '#F4C78A' },
  ];
  
  // ──────────────────────────────────────
  // Theme state
  // ──────────────────────────────────────
  function isUnlocked() {
    return localStorage.getItem(STORAGE_KEYS.unlocked) === 'true';
  }
  function setUnlocked() {
    localStorage.setItem(STORAGE_KEYS.unlocked, 'true');
  }
  function getTheme() {
    return localStorage.getItem(STORAGE_KEYS.theme) || 'atelier';
  }
  function setTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.theme, theme);
    applyTheme(theme);
  }
  function applyTheme(theme) {
    if (theme === 'terminal') {
      document.documentElement.setAttribute('data-theme', 'terminal');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    // Set unlock state attribute for CSS-driven hint swap
    if (isUnlocked()) {
      document.documentElement.setAttribute('data-unlocked', 'true');
    } else {
      document.documentElement.removeAttribute('data-unlocked');
    }
    updateThemeBtn();
    // If we're on landing and hero backgrounds module is ready, swap background
    if (typeof window.__pkSwapHeroBackground === 'function') {
      window.__pkSwapHeroBackground(theme);
    }
  }
  
  // Compute relative path to game.html based on current URL depth
  function getGamePath() {
    const path = window.location.pathname;
    if (path.includes('/case-studies/') || path.includes('/also-pages/')) {
      return '../game.html';
    }
    return 'game.html';
  }
  
  // Apply saved theme immediately (before DOM ready)
  // CRITICAL GUARD: if Terminal theme is set but not unlocked, revert to atelier
  // This prevents theme desync when localStorage is partially cleared
  (function enforceThemeGuard() {
    const unlocked = localStorage.getItem(STORAGE_KEYS.unlocked) === 'true';
    const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
    if (savedTheme === 'terminal' && !unlocked) {
      localStorage.setItem(STORAGE_KEYS.theme, 'atelier');
    }
  })();
  applyTheme(getTheme());
  
  // ──────────────────────────────────────
  // Theme button handler (hardcoded in HTML)
  // ──────────────────────────────────────
  function wireThemeBtn() {
    const btn = document.getElementById('pkThemeBtn');
    if (!btn) return;
    
    const labelEl = btn.querySelector('.nav__theme-label');
    const blinkEl = btn.querySelector('.nav__theme-blink');
    
    function updateLabel() {
      if (!labelEl) return;
      if (isUnlocked()) {
        labelEl.textContent = getTheme() === 'terminal' ? 'Atelier' : 'Terminal';
      } else {
        labelEl.textContent = 'Terminal';
      }
      // Blink stays active in all states - continuity element
    }
    updateLabel();
    
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (isUnlocked()) {
        const current = getTheme();
        setTheme(current === 'terminal' ? 'atelier' : 'terminal');
        updateLabel();
      } else {
        window.location.href = getGamePath();
      }
    });
    
    // Expose for animation.js to call
    window.__pkUpdateThemeLabel = updateLabel;
  }
  
  function updateThemeBtn() {
    if (typeof window.__pkUpdateThemeLabel === 'function') {
      window.__pkUpdateThemeLabel();
    }
  }
  
  // ──────────────────────────────────────
  // Konami code → Snake overlay
  // ──────────────────────────────────────
  let konamiIndex = 0;
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (document.getElementById('snake-overlay')) return;
    
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    const expected = KONAMI[konamiIndex];
    
    if (key === expected) {
      konamiIndex++;
      if (konamiIndex === KONAMI.length) {
        konamiIndex = 0;
        openSnakeGame();
      }
    } else {
      konamiIndex = key === KONAMI[0] ? 1 : 0;
    }
  });
  
  // ──────────────────────────────────────
  // Snake overlay game (shortcut via Konami)
  // ──────────────────────────────────────
  function openSnakeGame() {
    const overlay = document.createElement('div');
    overlay.id = 'snake-overlay';
    overlay.innerHTML = `
      <style>
        #snake-overlay { position: fixed; inset: 0; background: rgba(10,14,11,0.97); z-index: 10000; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px; animation: sfi 0.3s ease; font-family: 'JetBrains Mono', monospace; }
        @keyframes sfi { from { opacity: 0; } to { opacity: 1; } }
        #snake-overlay .snake-header { max-width: 640px; width: 100%; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-end; color: #7FDBA8; }
        #snake-overlay .snake-title { font-size: 14px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 500; }
        #snake-overlay .snake-title span { color: #FF5F5F; }
        #snake-overlay .snake-close { background: transparent; border: 1px solid rgba(127,219,168,0.3); color: #7FDBA8; padding: 6px 14px; font-family: inherit; font-size: 11px; letter-spacing: 0.15em; cursor: pointer; text-transform: uppercase; }
        #snake-overlay .snake-close:hover { border-color: #FF5F5F; color: #FF5F5F; }
        #snake-overlay canvas { background: #0A0E0B; border: 1px solid rgba(127,219,168,0.3); max-width: 100%; height: auto; }
        #snake-overlay .snake-footer { max-width: 640px; width: 100%; margin-top: 20px; display: flex; justify-content: space-between; align-items: center; color: #5A9873; font-size: 11px; letter-spacing: 0.1em; flex-wrap: wrap; gap: 12px; }
        #snake-overlay .snake-pellets { display: flex; gap: 8px; }
        #snake-overlay .snake-pellet-indicator { padding: 4px 10px; border: 1px solid rgba(127,219,168,0.3); color: #5A9873; font-size: 10px; letter-spacing: 0.1em; transition: all 0.2s ease; }
        #snake-overlay .snake-pellet-indicator.eaten { background: #7FDBA8; color: #0A0E0B; border-color: #7FDBA8; text-decoration: line-through; }
        #snake-overlay .snake-message { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 16px; background: rgba(10,14,11,0.95); pointer-events: none; opacity: 0; transition: opacity 0.3s ease; z-index: 2; padding: 24px; }
        #snake-overlay .snake-message.visible { opacity: 1; pointer-events: auto; }
        #snake-overlay .snake-message h2 { color: #FF5F5F; font-size: 24px; letter-spacing: 0.1em; text-transform: uppercase; text-shadow: 0 0 20px rgba(255,95,95,0.4); margin: 0; font-weight: 500; }
        #snake-overlay .snake-message p { color: #7FDBA8; font-size: 13px; letter-spacing: 0.1em; max-width: 40ch; text-align: center; line-height: 1.6; margin: 0; }
        #snake-overlay .snake-message button { background: #FF5F5F; border: none; color: #0A0E0B; font-family: inherit; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; padding: 12px 24px; cursor: pointer; font-weight: 500; margin-top: 8px; transition: transform 0.15s ease; }
        #snake-overlay .snake-message button:hover { transform: translateY(-2px); }
      </style>
      <div class="snake-header">
        <div class="snake-title">Easter Egg · Eat the <span>four case studies</span></div>
        <button class="snake-close">ESC · Close</button>
      </div>
      <canvas id="snake-canvas" width="640" height="480"></canvas>
      <div class="snake-footer">
        <div class="snake-pellets" id="pellet-indicators">
          ${CASE_STUDIES.map(c => `<div class="snake-pellet-indicator" data-label="${c.label}">${c.label}</div>`).join('')}
        </div>
        <div>Arrow keys · or swipe</div>
      </div>
      <div class="snake-message" id="snake-message">
        <h2 id="snake-message-title"></h2>
        <p id="snake-message-body"></p>
        <button id="snake-message-btn"></button>
      </div>
    `;
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    
    const canvas = document.getElementById('snake-canvas');
    const ctx = canvas.getContext('2d');
    overlay.querySelector('.snake-close').addEventListener('click', closeGame);
    
    function closeGame() {
      document.body.style.overflow = '';
      overlay.remove();
      window.removeEventListener('keydown', handleKey);
      cancelAnimationFrame(rafId);
    }
    
    const GRID = 20;
    const COLS = Math.floor(canvas.width / GRID);
    const ROWS = Math.floor(canvas.height / GRID);
    let snake, direction, nextDirection, pellets, eatenLabels, gameOver, won, lastTick, tickMs, rafId;
    
    function initGame() {
      snake = [{x:10,y:12},{x:9,y:12},{x:8,y:12}];
      direction = {x:1,y:0};
      nextDirection = {x:1,y:0};
      pellets = [];
      eatenLabels = [];
      gameOver = false; won = false;
      lastTick = 0; tickMs = 110;
      CASE_STUDIES.forEach((cs) => {
        let pos, attempts = 0;
        do {
          pos = { x: 2 + Math.floor(Math.random()*(COLS-4)), y: 2 + Math.floor(Math.random()*(ROWS-4)) };
          attempts++;
        } while (attempts<50 && (snake.some(s=>s.x===pos.x&&s.y===pos.y) || pellets.some(p=>p.x===pos.x&&p.y===pos.y)));
        pellets.push({...pos, label:cs.label, color:cs.color});
      });
      updatePelletIndicators();
      hideMessage();
    }
    
    function updatePelletIndicators() {
      document.querySelectorAll('.snake-pellet-indicator').forEach(el => {
        el.classList.toggle('eaten', eatenLabels.includes(el.getAttribute('data-label')));
      });
    }
    
    function showMessage(title, body, btnText, onBtn) {
      const msg = document.getElementById('snake-message');
      document.getElementById('snake-message-title').textContent = title;
      document.getElementById('snake-message-body').textContent = body;
      const btn = document.getElementById('snake-message-btn');
      if (btnText === null || btnText === undefined) {
        btn.style.display = 'none';
      } else {
        btn.style.display = '';
        btn.textContent = btnText;
        btn.onclick = onBtn;
      }
      msg.classList.add('visible');
    }
    function hideMessage() {
      document.getElementById('snake-message').classList.remove('visible');
    }
    
    function handleKey(e) {
      if (!overlay.isConnected) return;
      if (e.key === 'Escape') { closeGame(); return; }
      const d = { ArrowUp:{x:0,y:-1}, ArrowDown:{x:0,y:1}, ArrowLeft:{x:-1,y:0}, ArrowRight:{x:1,y:0} }[e.key];
      if (d) {
        if (d.x !== -direction.x || d.y !== -direction.y) nextDirection = d;
        e.preventDefault();
      }
    }
    window.addEventListener('keydown', handleKey);
    
    let touchStart = null;
    canvas.addEventListener('touchstart', (e) => {
      touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    });
    canvas.addEventListener('touchend', (e) => {
      if (!touchStart) return;
      const dx = e.changedTouches[0].clientX - touchStart.x;
      const dy = e.changedTouches[0].clientY - touchStart.y;
      if (Math.abs(dx) > Math.abs(dy)) {
        const d = dx>0 ? {x:1,y:0} : {x:-1,y:0};
        if (d.x !== -direction.x) nextDirection = d;
      } else {
        const d = dy>0 ? {x:0,y:1} : {x:0,y:-1};
        if (d.y !== -direction.y) nextDirection = d;
      }
      touchStart = null;
      e.preventDefault();
    });
    
    function loop(ts) {
      if (gameOver || won) return;
      if (ts - lastTick >= tickMs) { tick(); lastTick = ts; }
      draw();
      rafId = requestAnimationFrame(loop);
    }
    
    function tick() {
      direction = nextDirection;
      const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
      if (head.x<0 || head.x>=COLS || head.y<0 || head.y>=ROWS) { gameOver=true; return handleGameOver(); }
      if (snake.some(s=>s.x===head.x&&s.y===head.y)) { gameOver=true; return handleGameOver(); }
      snake.unshift(head);
      const eaten = pellets.find(p=>p.x===head.x && p.y===head.y);
      if (eaten) {
        eatenLabels.push(eaten.label);
        pellets = pellets.filter(p => p !== eaten);
        updatePelletIndicators();
        tickMs = Math.max(70, tickMs - 8);
        if (pellets.length === 0) { won = true; return handleWin(); }
      } else {
        snake.pop();
      }
    }
    
    function draw() {
      ctx.fillStyle = '#0A0E0B';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(127, 219, 168, 0.04)';
      ctx.lineWidth = 1;
      for (let x=0; x<COLS; x++) { ctx.beginPath(); ctx.moveTo(x*GRID,0); ctx.lineTo(x*GRID,canvas.height); ctx.stroke(); }
      for (let y=0; y<ROWS; y++) { ctx.beginPath(); ctx.moveTo(0,y*GRID); ctx.lineTo(canvas.width,y*GRID); ctx.stroke(); }
      pellets.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color; ctx.shadowBlur = 12;
        ctx.fillRect(p.x*GRID+2, p.y*GRID+2, GRID-4, GRID-4);
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#0A0E0B';
        ctx.font = 'bold 8px JetBrains Mono, monospace';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(p.label, p.x*GRID+GRID/2, p.y*GRID+GRID/2);
      });
      snake.forEach((seg, i) => {
        const isHead = i === 0;
        ctx.fillStyle = isHead ? '#7FDBA8' : `rgba(127, 219, 168, ${Math.max(0.3, 1-i*0.04)})`;
        if (isHead) { ctx.shadowColor = '#7FDBA8'; ctx.shadowBlur = 8; }
        ctx.fillRect(seg.x*GRID+1, seg.y*GRID+1, GRID-2, GRID-2);
        ctx.shadowBlur = 0;
      });
    }
    
    function handleGameOver() {
      const eaten = eatenLabels.length;
      showMessage(
        eaten === 0 ? 'Game Over' : `Ate ${eaten} of 4`,
        eaten === 0 ? 'No case studies eaten. Try again?' : `${CASE_STUDIES.filter(c => !eatenLabels.includes(c.label)).map(c => c.label).join(', ')} got away.`,
        'Restart',
        () => { initGame(); requestAnimationFrame(loop); }
      );
    }
    
    function handleWin() {
      setUnlocked();
      setTheme('terminal');
      updateThemeBtn();
      
      // If we're on the landing page, replay the load animation in Terminal palette
      // by clearing the cache flag and reloading
      const onLanding = document.body.classList.contains('pk-landing');
      
      if (onLanding) {
        showMessage(
          'Terminal unlocked',
          'Reloading portfolio in Terminal mode…',
          null,
          null
        );
        setTimeout(() => {
          localStorage.removeItem('pk-loaded-once');
          window.location.reload();
        }, 1400);
      } else {
        showMessage(
          'Terminal unlocked',
          'Terminal theme is now active site-wide. Toggle anytime from the nav.',
          'Close',
          closeGame
        );
      }
    }
    
    initGame();
    rafId = requestAnimationFrame(loop);
  }
  
  // Expose for game.html page
  window.__pkTheme = { setUnlocked, setTheme, applyTheme, getTheme, isUnlocked, updateThemeBtn };
  
  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireThemeBtn);
  } else {
    wireThemeBtn();
  }
})();
