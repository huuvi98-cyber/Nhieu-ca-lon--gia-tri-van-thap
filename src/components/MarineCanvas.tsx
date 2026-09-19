import React, { useEffect, useRef } from 'react';
import { MarineSettings, OceanTheme } from '../types';

interface MarineCanvasProps {
  theme: OceanTheme;
  settings: MarineSettings;
  isPlaying: boolean;
  playbackSpeed: number;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
}

interface Fish {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  width: number;
  finPhase: number;
  finSpeed: number;
  scale: number;
  alpha: number;
  baseY: number;
  layer: number; // 0 (background), 1 (midground), 2 (foreground)
}

interface Jellyfish {
  x: number;
  y: number;
  size: number;
  speedY: number;
  pulsePhase: number;
  tentacles: number;
}

interface Turtle {
  x: number;
  y: number;
  vx: number;
  size: number;
  flipperPhase: number;
}

interface Bubble {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  phase: number;
  alpha: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const MarineCanvas: React.FC<MarineCanvasProps> = ({
  theme,
  settings,
  isPlaying,
  playbackSpeed,
  onCanvasReady,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Entities stored in refs to prevent recreation on every render
  const fishListRef = useRef<Fish[]>([]);
  const jellyfishRef = useRef<Jellyfish | null>(null);
  const turtleRef = useRef<Turtle | null>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });
  const timeRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Initialize entities
  const initEntities = (width: number, height: number) => {
    // Fish
    const fish: Fish[] = [];
    const count = Math.max(3, settings.fishCount);
    for (let i = 0; i < count; i++) {
      const layer = i % 3; // 0: small background, 1: mid, 2: foreground
      const scale = layer === 0 ? 0.6 : layer === 1 ? 0.85 : 1.15;
      const speed = (0.7 + Math.random() * 0.9) * (layer === 0 ? 0.8 : layer === 1 ? 1.0 : 1.2);
      const isRightToLeft = Math.random() < 0.15; // most swim left-to-right or right-to-left
      fish.push({
        x: Math.random() * width,
        y: height * 0.15 + Math.random() * (height * 0.7),
        vx: isRightToLeft ? -speed : speed,
        vy: 0,
        length: 50 * scale,
        width: 18 * scale,
        finPhase: Math.random() * Math.PI * 2,
        finSpeed: 0.1 + Math.random() * 0.05,
        scale,
        alpha: layer === 0 ? 0.25 : layer === 1 ? 0.4 : 0.65,
        baseY: height * 0.2 + Math.random() * (height * 0.65),
        layer,
      });
    }
    fishListRef.current = fish;

    // Jellyfish
    jellyfishRef.current = {
      x: width * 0.55,
      y: height * 0.18,
      size: 42,
      speedY: 0.35,
      pulsePhase: 0,
      tentacles: 5,
    };

    // Turtle
    turtleRef.current = {
      x: width * 0.65,
      y: height * 0.38,
      vx: 0.45,
      size: 38,
      flipperPhase: 0,
    };

    // Bubbles
    const bubbles: Bubble[] = [];
    const bCount = settings.bubbleDensity * 12;
    for (let i = 0; i < bCount; i++) {
      bubbles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 2 + Math.random() * 5,
        speedY: 0.4 + Math.random() * 0.9,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
        wobbleAmp: 1.5 + Math.random() * 2.5,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.2 + Math.random() * 0.5,
      });
    }
    bubblesRef.current = bubbles;
  };

  // Sync fish count when settings change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);
    const currentFish = fishListRef.current;
    const targetCount = settings.fishCount;

    if (currentFish.length < targetCount) {
      const added = targetCount - currentFish.length;
      for (let i = 0; i < added; i++) {
        const layer = Math.floor(Math.random() * 3);
        const scale = layer === 0 ? 0.6 : layer === 1 ? 0.85 : 1.15;
        const speed = (0.7 + Math.random() * 0.9) * (layer === 0 ? 0.8 : layer === 1 ? 1.0 : 1.2);
        currentFish.push({
          x: Math.random() * width,
          y: height * 0.15 + Math.random() * (height * 0.7),
          vx: speed,
          vy: 0,
          length: 50 * scale,
          width: 18 * scale,
          finPhase: Math.random() * Math.PI * 2,
          finSpeed: 0.1 + Math.random() * 0.05,
          scale,
          alpha: layer === 0 ? 0.25 : layer === 1 ? 0.4 : 0.65,
          baseY: height * 0.2 + Math.random() * (height * 0.65),
          layer,
        });
      }
    } else if (currentFish.length > targetCount) {
      currentFish.splice(targetCount);
    }
  }, [settings.fishCount]);

  // Handle Resize and Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    if (onCanvasReady) {
      onCanvasReady(canvas);
    }

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      if (fishListRef.current.length === 0) {
        initEntities(rect.width, rect.height);
      }
    };

    handleResize();
    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Click handler to create ripples and bubble bursts
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Add ripple
      ripplesRef.current.push({
        x,
        y,
        radius: 5,
        maxRadius: 100,
        alpha: 0.8,
      });

      // Add small burst of bubbles
      for (let i = 0; i < 6; i++) {
        bubblesRef.current.push({
          x: x + (Math.random() - 0.5) * 30,
          y: y + (Math.random() - 0.5) * 20,
          radius: 2 + Math.random() * 4,
          speedY: 1.2 + Math.random() * 1.5,
          wobbleSpeed: 0.04,
          wobbleAmp: 2,
          phase: Math.random() * Math.PI * 2,
          alpha: 0.8,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mousePosRef.current.active = false;
    };

    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  // Main Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = performance.now();

    const render = (currentTime: number) => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      if (width <= 0 || height <= 0) {
        animFrameIdRef.current = requestAnimationFrame(render);
        return;
      }

      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      if (isPlaying) {
        timeRef.current += dt * playbackSpeed;
      }
      const t = timeRef.current;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // 1. Sea wave colors
      const waveColor = theme.accentWaveColor;
      const secondaryWave = theme.secondaryWaveColor;

      // 2. Draw Gentle Wave Ribbon across the middle/lower third
      // First wave layer (Soft cyan undulating ribbon - extends past boundaries to remain flush with borders)
      ctx.save();
      ctx.beginPath();
      const waveY = height * 0.58;
      const waveAmp = 22;
      const waveFreq = 0.0028;
      const waveSpeed = settings.waveSpeed * 1.2;

      ctx.moveTo(-50, height + 50);
      ctx.lineTo(-50, waveY);
      for (let x = -50; x <= width + 50; x += 10) {
        const y =
          waveY +
          Math.sin(x * waveFreq + t * waveSpeed) * waveAmp +
          Math.cos(x * 0.0012 + t * waveSpeed * 0.7) * 12;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width + 50, height + 50);
      ctx.closePath();
      ctx.fillStyle = secondaryWave;
      ctx.globalAlpha = 0.45;
      ctx.fill();
      ctx.restore();

      // Second ribbon (Foreground crisp translucent ocean stroke/ribbon - fully flush past edges)
      ctx.save();
      ctx.beginPath();
      const wave2Y = height * 0.62;
      ctx.moveTo(-50, wave2Y);
      for (let x = -50; x <= width + 50; x += 10) {
        const y =
          wave2Y +
          Math.sin((x + 120) * waveFreq * 1.1 + t * waveSpeed * 1.1) * 26 +
          Math.sin(x * 0.004 - t * 0.5) * 8;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = waveColor;
      ctx.lineWidth = 16;
      ctx.lineCap = 'round';
      ctx.globalAlpha = 0.55;
      ctx.stroke();
      ctx.restore();

      // Subtle water ripple graphic pattern (similar to the ≋ mark in original image)
      ctx.save();
      const ripX = width * 0.88;
      const ripY = height * 0.38;
      ctx.strokeStyle = theme.accentWaveColor;
      ctx.lineWidth = 2.5;
      ctx.globalAlpha = 0.35;
      for (let r = 0; r < 3; r++) {
        ctx.beginPath();
        const lineY = ripY + r * 10;
        for (let x = ripX; x <= ripX + 45; x += 2) {
          const y = lineY + Math.sin((x - ripX) * 0.25 + t * 2) * 2.5;
          if (x === ripX) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();

      // 3. Draw Sea Turtle (if enabled)
      if (settings.showTurtle && turtleRef.current) {
        const turtle = turtleRef.current;
        if (isPlaying) {
          turtle.x -= turtle.vx * settings.fishSpeed * playbackSpeed;
          turtle.flipperPhase += 0.04 * playbackSpeed;
          if (turtle.x < -150) {
            turtle.x = width + 100;
            turtle.y = height * 0.25 + Math.random() * (height * 0.3);
          }
        }
        drawTurtle(ctx, turtle, theme.turtleColor, t);
      }

      // 4. Draw Jellyfish (if enabled)
      if (settings.showJellyfish && jellyfishRef.current) {
        const jf = jellyfishRef.current;
        if (isPlaying) {
          jf.pulsePhase += 0.03 * playbackSpeed;
          // Bobbing vertically
          jf.y += Math.sin(jf.pulsePhase) * 0.35 * playbackSpeed;
        }
        drawJellyfish(ctx, jf, theme.jellyfishColor, t);
      }

      // 5. Draw and Update Schools of Fish
      const mouse = mousePosRef.current;
      const fishList = fishListRef.current;
      const speedMult = settings.fishSpeed * playbackSpeed;

      for (let i = 0; i < fishList.length; i++) {
        const fish = fishList[i];

        if (isPlaying) {
          // Natural sinusoidal undulation
          fish.finPhase += fish.finSpeed * speedMult;
          fish.y = fish.baseY + Math.sin(fish.finPhase * 0.6 + i) * (8 * fish.scale);

          // Interactive mouse repulsion
          if (settings.interactiveRepulsion && mouse.active) {
            const dx = fish.x - mouse.x;
            const dy = fish.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const repelRadius = 140;

            if (dist < repelRadius && dist > 0) {
              const force = ((repelRadius - dist) / repelRadius) * 4;
              fish.x += (dx / dist) * force;
              fish.y += (dy / dist) * force * 0.6;
            }
          }

          // Move horizontally
          fish.x += fish.vx * speedMult;

          // Wrap around borders
          if (fish.vx > 0 && fish.x > width + 80) {
            fish.x = -80;
            fish.baseY = height * 0.15 + Math.random() * (height * 0.7);
          } else if (fish.vx < 0 && fish.x < -80) {
            fish.x = width + 80;
            fish.baseY = height * 0.15 + Math.random() * (height * 0.7);
          }
        }

        drawStylizedFish(ctx, fish, theme.fishColor, theme.fishAlpha);
      }

      // 6. Draw Effervescent Bubbles
      const bubbles = bubblesRef.current;
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        if (isPlaying) {
          b.y -= b.speedY * playbackSpeed;
          b.phase += b.wobbleSpeed * playbackSpeed;
          b.x += Math.sin(b.phase) * 0.4;

          if (b.y < -20) {
            b.y = height + 20;
            b.x = Math.random() * width;
          }
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha * 0.7})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(186, 230, 253, ${b.alpha * 0.9})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Bubble highlight reflection dot
        ctx.beginPath();
        ctx.arc(b.x - b.radius * 0.35, b.y - b.radius * 0.35, b.radius * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha * 0.9})`;
        ctx.fill();
        ctx.restore();
      }

      // 7. Draw Click Ripples
      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        if (isPlaying) {
          r.radius += 2.5 * playbackSpeed;
          r.alpha -= 0.02 * playbackSpeed;
        }

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = theme.accentWaveColor;
        ctx.lineWidth = 2.2;
        ctx.globalAlpha = r.alpha;
        ctx.stroke();
        ctx.restore();
      }

      ctx.restore();
      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [theme, settings, isPlaying, playbackSpeed]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto">
      <canvas ref={canvasRef} className="w-full h-full block cursor-pointer" />
    </div>
  );
};

// Helper to draw clean stylized ocean fish matching the uploaded graphic
function drawStylizedFish(
  ctx: CanvasRenderingContext2D,
  fish: Fish,
  color: string,
  baseAlpha: number
) {
  ctx.save();
  ctx.translate(fish.x, fish.y);
  const facingRight = fish.vx > 0;
  if (!facingRight) {
    ctx.scale(-1, 1);
  }

  const length = fish.length;
  const height = fish.width;
  const tailOscillation = Math.sin(fish.finPhase) * 6;

  ctx.fillStyle = color;
  ctx.globalAlpha = fish.alpha * baseAlpha;

  // Fish Body: Streamlined oceanic fish silhouette
  ctx.beginPath();
  // Nose
  ctx.moveTo(length * 0.5, 0);
  // Top curve to tail base
  ctx.quadraticCurveTo(length * 0.15, -height * 0.7, -length * 0.35, -height * 0.2);
  // Tail base
  ctx.lineTo(-length * 0.45, tailOscillation * 0.5);
  // Tail Fin (V-shape fork)
  ctx.lineTo(-length * 0.65, -height * 0.65 + tailOscillation);
  ctx.quadraticCurveTo(-length * 0.52, tailOscillation, -length * 0.65, height * 0.65 + tailOscillation);
  ctx.lineTo(-length * 0.45, tailOscillation * 0.5);
  // Bottom curve back to nose
  ctx.quadraticCurveTo(length * 0.15, height * 0.7, length * 0.5, 0);
  ctx.closePath();
  ctx.fill();

  // Dorsal fin (Top fin)
  ctx.beginPath();
  ctx.moveTo(-length * 0.05, -height * 0.5);
  ctx.quadraticCurveTo(-length * 0.15, -height * 1.1, -length * 0.3, -height * 0.35);
  ctx.closePath();
  ctx.fill();

  // Pectoral fin (Side fin with fluttering motion)
  const pectoralAngle = Math.sin(fish.finPhase * 1.4) * 0.2;
  ctx.save();
  ctx.translate(length * 0.1, height * 0.1);
  ctx.rotate(pectoralAngle);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(-length * 0.2, height * 0.3, -length * 0.22, 0);
  ctx.closePath();
  ctx.globalAlpha = fish.alpha * baseAlpha * 0.8;
  ctx.fill();
  ctx.restore();

  // Translucent gill slit / eye highlight
  ctx.beginPath();
  ctx.arc(length * 0.32, -height * 0.12, 1.8 * fish.scale, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.fill();

  ctx.restore();
}

// Helper to draw translucent pulsing jellyfish
function drawJellyfish(
  ctx: CanvasRenderingContext2D,
  jf: Jellyfish,
  color: string,
  time: number
) {
  ctx.save();
  ctx.translate(jf.x, jf.y);

  const pulse = Math.sin(jf.pulsePhase);
  const scaleX = 1 + pulse * 0.08;
  const scaleY = 1 - pulse * 0.12;
  ctx.scale(scaleX, scaleY);

  const radius = jf.size;

  // Bell dome
  ctx.save();
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.35;
  ctx.beginPath();
  ctx.arc(0, 0, radius, Math.PI, 0, false);
  // Undulating skirt
  ctx.bezierCurveTo(radius * 0.6, radius * 0.25, -radius * 0.6, radius * 0.25, -radius, 0);
  ctx.closePath();
  ctx.fill();

  // Inner bell highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.beginPath();
  ctx.arc(0, -radius * 0.15, radius * 0.65, Math.PI, 0, false);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Floating tentacles
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.8;
  ctx.globalAlpha = 0.45;

  const tentacleOffsets = [-radius * 0.65, -radius * 0.3, 0, radius * 0.3, radius * 0.65];
  for (let i = 0; i < tentacleOffsets.length; i++) {
    const ox = tentacleOffsets[i];
    const tentacleLength = radius * 1.6 + (i % 2 === 0 ? 12 : 0);
    ctx.beginPath();
    ctx.moveTo(ox, 0);

    for (let y = 10; y <= tentacleLength; y += 8) {
      const sway = Math.sin(time * 2.2 + y * 0.06 + i) * 6;
      ctx.lineTo(ox + sway, y);
    }
    ctx.stroke();
  }

  ctx.restore();
}

// Helper to draw peaceful sea turtle
function drawTurtle(
  ctx: CanvasRenderingContext2D,
  turtle: Turtle,
  color: string,
  time: number
) {
  ctx.save();
  ctx.translate(turtle.x, turtle.y);
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.35;

  const size = turtle.size;
  const flipperAngle = Math.sin(turtle.flipperPhase) * 0.3;

  // Shell (Carapace)
  ctx.beginPath();
  ctx.ellipse(0, 0, size * 0.6, size * 0.45, 0, 0, Math.PI * 2);
  ctx.fill();

  // Head
  ctx.beginPath();
  ctx.arc(-size * 0.65, 0, size * 0.2, 0, Math.PI * 2);
  ctx.fill();

  // Left front flipper
  ctx.save();
  ctx.translate(-size * 0.25, -size * 0.35);
  ctx.rotate(-0.5 + flipperAngle);
  ctx.beginPath();
  ctx.ellipse(0, -size * 0.3, size * 0.15, size * 0.45, 0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Right front flipper
  ctx.save();
  ctx.translate(-size * 0.25, size * 0.35);
  ctx.rotate(0.5 - flipperAngle);
  ctx.beginPath();
  ctx.ellipse(0, size * 0.3, size * 0.15, size * 0.45, -0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Back flippers
  ctx.beginPath();
  ctx.ellipse(size * 0.45, -size * 0.28, size * 0.12, size * 0.22, -0.3, 0, Math.PI * 2);
  ctx.ellipse(size * 0.45, size * 0.28, size * 0.12, size * 0.22, 0.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}
