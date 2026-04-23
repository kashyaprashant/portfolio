/* ═══════════════════════════════════════════════════════════════
   PORTFOLIO LOAD ANIMATION
   
   First-visit animation: dot falls from top, bounces 3 times with
   color journey, transforms into blinking cursor, types name,
   settles as period, tucks to top-nav wordmark, reveals page.
   
   - Reads theme from localStorage → picks palette accordingly
   - Atelier: warm earth gradient → plastic-cream
   - Terminal: phosphor journey → terminal-black
   - localStorage['pk-loaded-once'] gates re-runs
   - window.__pkReplayLoad() available for testing
   ═══════════════════════════════════════════════════════════════ */

(function() {
  'use strict';
  
  const STORAGE = {
    loaded: 'pk-loaded-once',
    theme: 'pk-theme',
  };
  
  const NAME = 'Prashant Kashyap';
  
  const TIMING = {
    fall: 600,
    bounce1: { squash: 90, up: 180, down: 140 },
    bounce2: { squash: 80, up: 130, down: 100 },
    bounce3: { squash: 70, up: 70, down: 60 },
    pause: 240,
    cursorMove: 75,
    cursorPause: 70,
    periodBreath: 280,
    tuck: 750,
  };
  
  const BOUNCE_HEIGHTS = [0.48, 0.23, 0.08];
  
  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // ──────────────────────────────────────
  // Build load overlay DOM
  // ──────────────────────────────────────
  function createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'load-overlay';
    overlay.id = 'pkLoadOverlay';
    overlay.setAttribute('data-palette', 'atelier');
    overlay.setAttribute('data-stage', '0');
    overlay.innerHTML = `
      <div class="load-overlay__vignette"></div>
      <div class="load-stage" id="pkLoadStage">
        <span class="load-name" id="pkLoadName" aria-label="${NAME}"></span>
        <div class="load-dot-wrap">
          <div class="load-dot-shadow" id="pkLoadShadow"></div>
          <div class="load-dot" id="pkLoadDot"></div>
        </div>
      </div>
    `;
    document.body.insertBefore(overlay, document.body.firstChild);
    return overlay;
  }
  
  // ──────────────────────────────────────
  // Palette colors per theme
  // ──────────────────────────────────────
  function getStageColors(palette) {
    if (palette === 'terminal') {
      return [
        { bg: '--t-stage-0-bg', dot: '--t-stage-0-dot' },
        { bg: '--t-stage-1-bg', dot: '--t-stage-1-dot' },
        { bg: '--t-stage-2-bg', dot: '--t-stage-2-dot' },
        { bg: '--t-stage-3-bg', dot: '--t-stage-3-dot' },
      ];
    }
    return [
      { bg: '--a-stage-0-bg', dot: '--a-stage-0-dot' },
      { bg: '--a-stage-1-bg', dot: '--a-stage-1-dot' },
      { bg: '--a-stage-2-bg', dot: '--a-stage-2-dot' },
      { bg: '--a-stage-3-bg', dot: '--a-stage-3-dot' },
    ];
  }
  
  // ──────────────────────────────────────
  // Animation orchestration
  // ──────────────────────────────────────
  function buildLetters(nameEl) {
    nameEl.innerHTML = '';
    const letters = [];
    for (let i = 0; i < NAME.length; i++) {
      const ch = NAME[i];
      if (ch === ' ') {
        const space = document.createElement('span');
        space.className = 'load-space';
        nameEl.appendChild(space);
        letters.push({ el: space, isSpace: true });
      } else {
        const span = document.createElement('span');
        span.className = 'load-letter';
        span.textContent = ch;
        nameEl.appendChild(span);
        letters.push({ el: span, isSpace: false, char: ch });
      }
    }
    return letters;
  }
  
  function resetToInitial(refs, palette) {
    const { overlay, stage, dot, shadow } = refs;
    overlay.classList.remove('hidden', 'bouncing');
    overlay.style.opacity = '';
    overlay.setAttribute('data-palette', palette);
    overlay.setAttribute('data-stage', '0');
    
    stage.style.transition = 'none';
    stage.style.transform = '';
    stage.style.opacity = '1';
    
    const colors = getStageColors(palette);
    dot.style.transition = 'none';
    dot.style.background = `var(${colors[0].dot})`;
    dot.style.borderRadius = '50%';
    dot.style.width = '18px';
    dot.style.height = '18px';
    dot.style.top = '-40px';
    dot.style.left = '50%';
    dot.style.transform = 'translateX(-50%)';
    dot.classList.remove('breathing', 'cursor-blink');
    dot.style.opacity = '1';
    
    shadow.style.transition = 'none';
    shadow.style.opacity = '0';
    shadow.style.width = '22px';
    
    void overlay.offsetWidth;
  }
  
  function animateDropAndBounces(refs, letters, palette) {
    return new Promise((resolve) => {
      const { overlay, dot, shadow, nameEl } = refs;
      const colors = getStageColors(palette);
      
      const nameRect = nameEl.getBoundingClientRect();
      const textBaseline = nameRect.height * 0.82;
      const baselineY = textBaseline - 9;
      
      const dropX = -10;
      const fallDistance = baselineY + 40;
      
      dot.style.transition = 'none';
      dot.style.left = `${dropX}px`;
      dot.style.top = '-40px';
      dot.style.transform = 'translateX(-50%)';
      dot.style.background = `var(${colors[0].dot})`;
      dot.style.borderRadius = '50%';
      dot.style.width = '18px';
      dot.style.height = '18px';
      
      shadow.style.transition = 'none';
      shadow.style.left = `${dropX}px`;
      shadow.style.top = `${baselineY + 18}px`;
      shadow.style.opacity = '0.15';
      shadow.style.width = '10px';
      
      void dot.offsetWidth;
      
      let cumTime = 0;
      
      // FALL
      dot.style.transition = `top ${TIMING.fall}ms cubic-bezier(0.5, 0, 0.9, 0.25), transform ${TIMING.fall}ms cubic-bezier(0.5, 0, 0.9, 0.25)`;
      dot.style.top = `${baselineY}px`;
      
      shadow.style.transition = `opacity ${TIMING.fall}ms ease-out, width ${TIMING.fall}ms ease-out`;
      shadow.style.opacity = '0.5';
      shadow.style.width = '24px';
      
      cumTime = TIMING.fall;
      setTimeout(() => overlay.classList.add('bouncing'), cumTime - 100);
      
      const bounces = [
        { ...TIMING.bounce1, height: fallDistance * BOUNCE_HEIGHTS[0], stageAfter: 1 },
        { ...TIMING.bounce2, height: fallDistance * BOUNCE_HEIGHTS[1], stageAfter: 2 },
        { ...TIMING.bounce3, height: fallDistance * BOUNCE_HEIGHTS[2], stageAfter: 3 },
      ];
      
      bounces.forEach((b, i) => {
        // SQUASH
        setTimeout(() => {
          dot.style.transition = `transform ${b.squash}ms cubic-bezier(0.2, 0.8, 0.4, 1), border-radius ${b.squash}ms ease-out, width ${b.squash}ms ease-out, height ${b.squash}ms ease-out, background-color 200ms ease-out`;
          dot.style.transform = 'translateX(-50%) scale(1.65, 0.35)';
          dot.style.borderRadius = '50% 50% 40% 40% / 70% 70% 30% 30%';
          dot.style.background = `var(${colors[b.stageAfter].dot})`;
          
          shadow.style.transition = `opacity 80ms ease-out, width 80ms ease-out`;
          shadow.style.opacity = '0.55';
          shadow.style.width = '34px';
          
          overlay.setAttribute('data-stage', String(b.stageAfter));
        }, cumTime);
        
        // UP
        setTimeout(() => {
          dot.style.transition = `top ${b.up}ms cubic-bezier(0.25, 0.6, 0.35, 1), transform ${b.up}ms cubic-bezier(0.3, 0.8, 0.5, 1), border-radius 120ms ease-out`;
          dot.style.top = `${baselineY - b.height}px`;
          dot.style.transform = 'translateX(-50%) scale(0.75, 1.35)';
          dot.style.borderRadius = '55% 55% 50% 50% / 40% 40% 60% 60%';
          
          shadow.style.transition = `opacity ${b.up}ms ease-out, width ${b.up}ms ease-out`;
          shadow.style.opacity = '0.18';
          shadow.style.width = '12px';
        }, cumTime + b.squash);
        
        // DOWN
        setTimeout(() => {
          dot.style.transition = `top ${b.down}ms cubic-bezier(0.55, 0, 0.75, 0.2), transform ${b.down}ms ease-in, border-radius 80ms ease-out`;
          dot.style.top = `${baselineY}px`;
          dot.style.transform = 'translateX(-50%) scale(1, 1)';
          dot.style.borderRadius = '50%';
          
          shadow.style.transition = `opacity ${b.down}ms ease-out, width ${b.down}ms ease-out`;
          shadow.style.opacity = '0.5';
          shadow.style.width = '24px';
        }, cumTime + b.squash + b.up);
        
        cumTime += b.squash + b.up + b.down;
      });
      
      // Settle + transform to cursor
      setTimeout(() => {
        dot.style.transition = 'width 200ms ease-out, height 200ms ease-out, top 200ms ease-out, border-radius 200ms ease-out';
        dot.style.width = '4px';
        dot.style.height = `${nameRect.height * 0.62}px`;
        dot.style.borderRadius = '1px';
        dot.style.top = `${baselineY - nameRect.height * 0.55}px`;
        
        shadow.style.transition = 'opacity 200ms ease-out';
        shadow.style.opacity = '0';
        
        overlay.classList.remove('bouncing');
      }, cumTime);
      
      cumTime += TIMING.pause;
      
      setTimeout(() => {
        resolve({ baselineY, dropX, palette });
      }, cumTime);
    });
  }
  
  function animateCursorTyping(refs, { baselineY, dropX, palette }) {
    return new Promise((resolve) => {
      const { dot, stage, nameEl } = refs;
      
      dot.classList.add('cursor-blink');
      
      const stageRect = stage.getBoundingClientRect();
      const letterEls = nameEl.querySelectorAll('.load-letter');
      const letterPositions = Array.from(letterEls).map(el => {
        const r = el.getBoundingClientRect();
        return { el, x: r.left - stageRect.left + r.width };
      });
      
      if (letterPositions.length === 0) {
        resolve();
        return;
      }
      
      let i = 0;
      const totalLetters = letterPositions.length;
      
      function moveToNext() {
        if (i >= totalLetters) {
          const finalX = letterPositions[totalLetters - 1].x + 6;
          dot.classList.remove('cursor-blink');
          dot.style.opacity = '1';
          dot.style.transition = `left ${TIMING.cursorMove}ms cubic-bezier(0.4, 0, 0.2, 1), width 220ms ease-out, height 220ms ease-out, border-radius 220ms ease-out, top 220ms ease-out, background-color 200ms ease-out`;
          dot.style.left = `${finalX}px`;
          const colors = getStageColors(palette);
          dot.style.background = `var(${colors[3].dot})`;
          setTimeout(() => {
            dot.style.width = '14px';
            dot.style.height = '14px';
            dot.style.borderRadius = '50%';
            dot.style.top = `${baselineY + 2}px`;
          }, 100);
          setTimeout(() => resolve(), TIMING.cursorMove + 250);
          return;
        }
        
        const target = letterPositions[i];
        
        dot.style.transition = `left ${TIMING.cursorMove}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        dot.style.left = `${target.x}px`;
        
        setTimeout(() => {
          target.el.classList.add('visible');
        }, TIMING.cursorMove * 0.4);
        
        i++;
        setTimeout(moveToNext, TIMING.cursorMove + TIMING.cursorPause);
      }
      
      setTimeout(moveToNext, 100);
    });
  }
  
  function animatePeriodBreath(refs) {
    return new Promise((resolve) => {
      const { dot } = refs;
      dot.style.transition = 'none';
      void dot.offsetWidth;
      dot.classList.add('breathing');
      setTimeout(() => {
        dot.classList.remove('breathing');
        resolve();
      }, TIMING.periodBreath + 50);
    });
  }
  
  function animateTuckToNav(refs) {
    return new Promise((resolve) => {
      const { overlay, stage } = refs;
      
      const wordmarkEl = document.querySelector('.nav__wordmark');
      if (!wordmarkEl) {
        overlay.classList.add('hidden');
        setTimeout(() => {
          overlay.style.display = 'none';
          resolve();
        }, 600);
        return;
      }
      
      // Measure the actual name element (not the stage wrapper) for accurate scale
      const nameEl = refs.nameEl;
      const nameRect = nameEl.getBoundingClientRect();
      const wordmarkRect = wordmarkEl.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      
      // Scale by HEIGHT ratio using the name element (font height, not stage padding)
      // This makes the name shrink to match wordmark line-height exactly
      const scale = wordmarkRect.height / nameRect.height;
      
      // Translate so the name's bottom-left lands at wordmark's bottom-left
      // transform-origin is already 0 100% (bottom-left of stage)
      const translateX = wordmarkRect.left - stageRect.left;
      const translateY = wordmarkRect.bottom - stageRect.bottom;
      
      stage.style.transition = `transform ${TIMING.tuck}ms cubic-bezier(0.65, 0, 0.25, 1), opacity ${TIMING.tuck * 0.8}ms ease-out ${TIMING.tuck * 0.25}ms`;
      stage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
      
      setTimeout(() => {
        overlay.setAttribute('data-stage', 'reveal');
        stage.style.opacity = '0';
      }, TIMING.tuck * 0.55);
      
      setTimeout(() => {
        overlay.classList.add('hidden');
        localStorage.setItem(STORAGE.loaded, 'true');
        setTimeout(() => {
          overlay.style.display = 'none';
        }, 400);
        resolve();
      }, TIMING.tuck + 100);
    });
  }
  
  async function runFullAnimation(refs) {
    const palette = localStorage.getItem(STORAGE.theme) || 'atelier';
    
    // Lock scroll to top during animation + clear URL hash to prevent scroll-to-anchor
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    
    refs.overlay.style.display = 'flex';
    resetToInitial(refs, palette);
    const letters = buildLetters(refs.nameEl);
    
    await new Promise(r => requestAnimationFrame(r));
    await new Promise(r => requestAnimationFrame(r));
    
    const dropResult = await animateDropAndBounces(refs, letters, palette);
    await animateCursorTyping(refs, dropResult);
    await animatePeriodBreath(refs);
    await animateTuckToNav(refs);
    
    // Unlock scroll after animation
    document.body.style.overflow = '';
  }
  
  function skipAnimation(refs) {
    refs.overlay.style.display = 'none';
  }
  
  // ──────────────────────────────────────
  // Public API + initialization
  // ──────────────────────────────────────
  function init() {
    // Only run on landing page
    if (!document.body.classList.contains('pk-landing')) return;
    
    const overlay = createOverlay();
    const refs = {
      overlay,
      stage: document.getElementById('pkLoadStage'),
      nameEl: document.getElementById('pkLoadName'),
      dot: document.getElementById('pkLoadDot'),
      shadow: document.getElementById('pkLoadShadow'),
    };
    
    // Expose replay for testing
    window.__pkReplayLoad = () => {
      runFullAnimation(refs);
    };
    
    // Skip conditions
    if (prefersReducedMotion()) {
      skipAnimation(refs);
      return;
    }
    if (localStorage.getItem(STORAGE.loaded) === 'true') {
      skipAnimation(refs);
      return;
    }
    
    runFullAnimation(refs);
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
