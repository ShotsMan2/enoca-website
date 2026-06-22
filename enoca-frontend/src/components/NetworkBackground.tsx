"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    let animationFrameId: number;

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    const init = () => {
      resize();
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 12000);
      for (let i = 0; i < particleCount; i++) {
        const pRadius = Math.random() * 1.5 + 0.5;
        particles.push({
          x: pRadius + Math.random() * (canvas.width - pRadius * 2),
          y: pRadius + Math.random() * (canvas.height - pRadius * 2),
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: pRadius,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = resolvedTheme === "dark" || document.documentElement.classList.contains("dark");
      
      const particleColor = isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 82, 255, 0.4)";
      const lineColor = isDark ? "rgba(255, 255, 255, " : "rgba(0, 82, 255, ";

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Ensure particles stay entirely within the canvas by accounting for their radius
        if (p.x < p.radius) {
          p.x = p.radius;
          p.vx *= -1;
        } else if (p.x > canvas.width - p.radius) {
          p.x = canvas.width - p.radius;
          p.vx *= -1;
        }

        if (p.y < p.radius) {
          p.y = p.radius;
          p.vy *= -1;
        } else if (p.y > canvas.height - p.radius) {
          p.y = canvas.height - p.radius;
          p.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${lineColor}${0.15 - dist / 1000})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    init();
    draw();

    let resizeObserver: ResizeObserver;
    if (canvas.parentElement) {
      resizeObserver = new ResizeObserver(() => {
        // Prevent continuous rapid re-init on minor sub-pixel changes by checking if size actually changed significantly
        if (
          Math.abs(canvas.width - canvas.parentElement!.offsetWidth) > 2 ||
          Math.abs(canvas.height - canvas.parentElement!.offsetHeight) > 2
        ) {
          init();
        }
      });
      resizeObserver.observe(canvas.parentElement);
    } else {
      window.addEventListener("resize", init);
    }

    return () => {
      if (resizeObserver && canvas.parentElement) {
        resizeObserver.unobserve(canvas.parentElement);
      }
      window.removeEventListener("resize", init);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0 mix-blend-screen"
    />
  );
}
