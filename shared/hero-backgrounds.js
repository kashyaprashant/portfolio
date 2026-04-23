/* ═══════════════════════════════════════════════════════════════
   HERO BACKGROUNDS
   
   Atelier: reactbits DotField (engagement-gated bulge, cream halo)
   Terminal: actual reactbits Threads shader via OGL (from CDN)
   
   Rendered inside an element with class .hero__canvas-container
   located inside the landing hero section.
   
   Exposes window.__pkSwapHeroBackground(theme) for the theme
   toggle to call when switching themes.
   ═══════════════════════════════════════════════════════════════ */

(function() {
  'use strict';
  
  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  let activeBackground = null;
  let containerEl = null;
  
  // ──────────────────────────────────────
  // ATELIER: Reactbits DotField (ported)
  // ──────────────────────────────────────
  function initDotField(container) {
    if (prefersReducedMotion()) return null;
    
    const TWO_PI = Math.PI * 2;
    
    const CONFIG = {
      dotRadius: 1.5,
      dotSpacing: 14,
      cursorRadius: 500,
      bulgeStrength: 67,
      glowRadius: 160,
      gradientFrom: 'rgba(26, 24, 20, 0.55)',
      gradientTo: 'rgba(74, 70, 64, 0.45)',
      glowColor: 'rgba(255, 252, 245, 0.55)',
    };
    
    // Build DOM
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;';
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
    wrap.appendChild(canvas);
    
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;';
    const defs = document.createElementNS(svgNS, 'defs');
    const gradId = 'pk-df-glow-' + Math.random().toString(36).slice(2, 9);
    const radialGrad = document.createElementNS(svgNS, 'radialGradient');
    radialGrad.setAttribute('id', gradId);
    const stop0 = document.createElementNS(svgNS, 'stop');
    stop0.setAttribute('offset', '0%');
    stop0.setAttribute('stop-color', CONFIG.glowColor);
    const stop1 = document.createElementNS(svgNS, 'stop');
    stop1.setAttribute('offset', '100%');
    stop1.setAttribute('stop-color', 'rgba(255, 252, 245, 0)');
    radialGrad.appendChild(stop0);
    radialGrad.appendChild(stop1);
    defs.appendChild(radialGrad);
    svg.appendChild(defs);
    const glowCircle = document.createElementNS(svgNS, 'circle');
    glowCircle.setAttribute('cx', '-9999');
    glowCircle.setAttribute('cy', '-9999');
    glowCircle.setAttribute('r', String(CONFIG.glowRadius));
    glowCircle.setAttribute('fill', `url(#${gradId})`);
    glowCircle.style.opacity = '0';
    glowCircle.style.willChange = 'opacity';
    svg.appendChild(glowCircle);
    wrap.appendChild(svg);
    container.appendChild(wrap);
    
    const ctx = canvas.getContext('2d', { alpha: true });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    let size = { w: 0, h: 0, offsetX: 0, offsetY: 0 };
    let dots = [];
    let mouse = { x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 };
    let engagement = 0;
    let glowOpacity = 0;
    let rafId = null;
    let isDestroyed = false;
    let frameCount = 0;
    let resizeTimer = null;
    
    function doResize() {
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      size = {
        w, h,
        offsetX: rect.left + window.scrollX,
        offsetY: rect.top + window.scrollY,
      };
      
      buildDots(w, h);
    }
    
    function resize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(doResize, 100);
    }
    
    function buildDots(w, h) {
      const step = CONFIG.dotRadius + CONFIG.dotSpacing;
      const cols = Math.floor(w / step);
      const rows = Math.floor(h / step);
      const padX = (w % step) / 2;
      const padY = (h % step) / 2;
      const arr = new Array(rows * cols);
      let idx = 0;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const ax = padX + col * step + step / 2;
          const ay = padY + row * step + step / 2;
          arr[idx++] = { ax, ay, sx: ax, sy: ay };
        }
      }
      dots = arr;
    }
    
    function onMouseMove(e) {
      mouse.x = e.pageX - size.offsetX;
      mouse.y = e.pageY - size.offsetY;
    }
    
    function updateMouseSpeed() {
      const dx = mouse.prevX - mouse.x;
      const dy = mouse.prevY - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      mouse.speed += (dist - mouse.speed) * 0.5;
      if (mouse.speed < 0.001) mouse.speed = 0;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
    }
    const speedInterval = setInterval(updateMouseSpeed, 20);
    
    function tick() {
      if (isDestroyed) return;
      frameCount++;
      const { w, h } = size;
      const len = dots.length;
      
      const targetEngagement = Math.min(mouse.speed / 5, 1);
      engagement += (targetEngagement - engagement) * 0.06;
      if (engagement < 0.001) engagement = 0;
      const eng = engagement;
      
      glowOpacity += (eng - glowOpacity) * 0.08;
      glowCircle.setAttribute('cx', String(mouse.x));
      glowCircle.setAttribute('cy', String(mouse.y));
      glowCircle.style.opacity = String(glowOpacity);
      
      ctx.clearRect(0, 0, w, h);
      
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, CONFIG.gradientFrom);
      grad.addColorStop(1, CONFIG.gradientTo);
      ctx.fillStyle = grad;
      
      const cr = CONFIG.cursorRadius;
      const crSq = cr * cr;
      const rad = CONFIG.dotRadius / 2;
      
      ctx.beginPath();
      
      for (let i = 0; i < len; i++) {
        const d = dots[i];
        const dx = mouse.x - d.ax;
        const dy = mouse.y - d.ay;
        const distSq = dx * dx + dy * dy;
        
        if (distSq < crSq && eng > 0.01) {
          const dist = Math.sqrt(distSq);
          const t = 1 - dist / cr;
          const push = t * t * CONFIG.bulgeStrength * eng;
          const angle = Math.atan2(dy, dx);
          d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15;
          d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15;
        } else {
          d.sx += (d.ax - d.sx) * 0.1;
          d.sy += (d.ay - d.sy) * 0.1;
        }
        
        ctx.moveTo(d.sx + rad, d.sy);
        ctx.arc(d.sx, d.sy, rad, 0, TWO_PI);
      }
      
      ctx.fill();
      
      rafId = requestAnimationFrame(tick);
    }
    
    doResize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(tick);
    
    return {
      type: 'dotfield',
      destroy() {
        isDestroyed = true;
        if (rafId) cancelAnimationFrame(rafId);
        clearInterval(speedInterval);
        clearTimeout(resizeTimer);
        window.removeEventListener('resize', resize);
        window.removeEventListener('mousemove', onMouseMove);
        wrap.remove();
      }
    };
  }
  
  // ──────────────────────────────────────
  // TERMINAL: Reactbits Threads via OGL
  // ──────────────────────────────────────
  async function initThreads(container) {
    let ogl;
    try {
      ogl = await import('https://cdn.jsdelivr.net/npm/ogl@1.0.11/+esm');
    } catch (e) {
      console.warn('[pk] OGL failed to load, falling back to dot field for Terminal:', e);
      return initDotField(container);
    }
    const { Renderer, Program, Mesh, Triangle, Color } = ogl;
    
    if (prefersReducedMotion()) {
      const div = document.createElement('div');
      div.style.cssText = 'position:absolute;inset:0;background:radial-gradient(ellipse at center, rgba(127,219,168,0.05), transparent 70%);';
      container.appendChild(div);
      return { type: 'threads-reduced', destroy() { div.remove(); } };
    }
    
    const vertexShader = `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;
    
    const fragmentShader = `
      precision highp float;
      uniform float iTime;
      uniform vec3 iResolution;
      uniform vec3 uColor;
      uniform float uAmplitude;
      uniform float uDistance;
      uniform vec2 uMouse;
      #define PI 3.1415926538
      const int u_line_count = 40;
      const float u_line_width = 7.0;
      const float u_line_blur = 10.0;
      
      float Perlin2D(vec2 P) {
        vec2 Pi = floor(P);
        vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
        vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
        Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
        Pt += vec2(26.0, 161.0).xyxy;
        Pt *= Pt;
        Pt = Pt.xzxz * Pt.yyww;
        vec4 hash_x = fract(Pt * (1.0 / 951.135664));
        vec4 hash_y = fract(Pt * (1.0 / 642.949883));
        vec4 grad_x = hash_x - 0.49999;
        vec4 grad_y = hash_y - 0.49999;
        vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)
          * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
        grad_results *= 1.4142135623730950;
        vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy
          * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
        vec4 blend2 = vec4(blend, vec2(1.0 - blend));
        return dot(grad_results, blend2.zxzx * blend2.wwyy);
      }
      
      float pixel(float count, vec2 resolution) {
        return (1.0 / max(resolution.x, resolution.y)) * count;
      }
      
      float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {
        float split_offset = (perc * 0.4);
        float split_point = 0.1 + split_offset;
        float amplitude_normal = smoothstep(split_point, 0.7, st.x);
        float amplitude_strength = 0.5;
        float finalAmplitude = amplitude_normal * amplitude_strength
          * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);
        float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;
        float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;
        float xnoise = mix(
          Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),
          Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,
          st.x * 0.3
        );
        float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;
        float line_start = smoothstep(
          y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),
          y, st.y);
        float line_end = smoothstep(
          y, y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),
          st.y);
        return clamp(
          (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
          0.0, 1.0);
      }
      
      void mainImage(out vec4 fragColor, in vec2 fragCoord) {
        vec2 uv = fragCoord / iResolution.xy;
        float line_strength = 1.0;
        for (int i = 0; i < u_line_count; i++) {
          float p = float(i) / float(u_line_count);
          line_strength *= (1.0 - lineFn(
            uv,
            u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),
            p,
            (PI * 1.0) * p,
            uMouse,
            iTime,
            uAmplitude,
            uDistance
          ));
        }
        float colorVal = 1.0 - line_strength;
        fragColor = vec4(uColor * colorVal, colorVal);
      }
      
      void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;
    
    const renderer = new Renderer({ alpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    container.appendChild(gl.canvas);
    
    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
        },
        uColor: { value: new Color(0.498, 0.859, 0.659) },
        uAmplitude: { value: 1.0 },
        uDistance: { value: 0.0 },
        uMouse: { value: new Float32Array([0.5, 0.5]) }
      }
    });
    
    const mesh = new Mesh(gl, { geometry, program });
    
    function resize() {
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight);
      program.uniforms.iResolution.value.r = clientWidth;
      program.uniforms.iResolution.value.g = clientHeight;
      program.uniforms.iResolution.value.b = clientWidth / clientHeight;
    }
    window.addEventListener('resize', resize);
    resize();
    
    let currentMouse = [0.5, 0.5];
    let targetMouse = [0.5, 0.5];
    
    function handleMouseMove(e) {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      targetMouse = [x, y];
    }
    function handleMouseLeave() {
      targetMouse = [0.5, 0.5];
    }
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    let animationFrameId = null;
    let isDestroyed = false;
    
    function update(t) {
      if (isDestroyed) return;
      const smoothing = 0.05;
      currentMouse[0] += smoothing * (targetMouse[0] - currentMouse[0]);
      currentMouse[1] += smoothing * (targetMouse[1] - currentMouse[1]);
      program.uniforms.uMouse.value[0] = currentMouse[0];
      program.uniforms.uMouse.value[1] = currentMouse[1];
      program.uniforms.iTime.value = t * 0.001;
      renderer.render({ scene: mesh });
      animationFrameId = requestAnimationFrame(update);
    }
    animationFrameId = requestAnimationFrame(update);
    
    return {
      type: 'threads',
      destroy() {
        isDestroyed = true;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', resize);
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
        if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      }
    };
  }
  
  // ──────────────────────────────────────
  // Swap between backgrounds
  // ──────────────────────────────────────
  async function swapHeroBackground(theme) {
    if (!containerEl) return;
    
    if (activeBackground && activeBackground.destroy) {
      activeBackground.destroy();
    }
    containerEl.innerHTML = '';
    activeBackground = null;
    
    if (theme === 'terminal') {
      try {
        activeBackground = await initThreads(containerEl);
      } catch (e) {
        console.warn('[pk] Threads init failed, falling back to dot field:', e);
        activeBackground = initDotField(containerEl);
      }
    } else {
      activeBackground = initDotField(containerEl);
    }
  }
  
  // ──────────────────────────────────────
  // Initialization — support multiple canvas containers
  // - #pkHeroCanvas (landing) = full intensity
  // - .hero-bg-canvas with data-subtle="true" = 30% opacity + auto-pause
  // ──────────────────────────────────────
  function init() {
    const landingContainer = document.getElementById('pkHeroCanvas');
    const subtleContainers = document.querySelectorAll('.hero-bg-canvas');
    
    const theme = localStorage.getItem('pk-theme') || 'atelier';
    
    if (landingContainer) {
      containerEl = landingContainer;
      swapHeroBackground(theme);
      window.__pkSwapHeroBackground = swapHeroBackground;
    }
    
    // Initialize subtle backgrounds on sub-pages
    const subtleInstances = [];
    subtleContainers.forEach(c => {
      c.style.opacity = '0.3';
      initSubtle(c, theme, subtleInstances);
    });
    
    // Global theme swap handler for sub-pages (replaces subtle backgrounds too)
    if (!landingContainer && subtleContainers.length > 0) {
      window.__pkSwapHeroBackground = function(newTheme) {
        subtleInstances.forEach(inst => inst.destroy && inst.destroy());
        subtleInstances.length = 0;
        subtleContainers.forEach(c => {
          c.innerHTML = '';
          initSubtle(c, newTheme, subtleInstances);
        });
      };
    }
  }
  
  async function initSubtle(container, theme, instances) {
    let inst;
    if (theme === 'terminal') {
      try {
        inst = await initThreads(container);
      } catch (e) {
        inst = initDotField(container);
      }
    } else {
      inst = initDotField(container);
    }
    if (inst) {
      instances.push(inst);
      // Auto-pause after 3s idle
      attachIdlePause(container, inst);
    }
  }
  
  function attachIdlePause(container, instance) {
    if (!instance || !container) return;
    let idleTimer = null;
    let paused = false;
    
    const canvas = container.querySelector('canvas');
    if (!canvas) return;
    
    function pause() {
      if (paused) return;
      paused = true;
      canvas.style.transition = 'opacity 0.8s ease';
      canvas.style.opacity = '0.15';
    }
    function resume() {
      if (!paused) return;
      paused = false;
      canvas.style.opacity = '1';
    }
    function resetTimer() {
      resume();
      clearTimeout(idleTimer);
      idleTimer = setTimeout(pause, 3000);
    }
    
    window.addEventListener('mousemove', resetTimer, { passive: true });
    resetTimer();
    
    // Extend destroy
    const origDestroy = instance.destroy;
    instance.destroy = function() {
      clearTimeout(idleTimer);
      window.removeEventListener('mousemove', resetTimer);
      if (origDestroy) origDestroy();
    };
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
