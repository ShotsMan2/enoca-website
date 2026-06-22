"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function GlobeVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;
    
    // Resize handler
    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width;
        canvas.height = height;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const isDark = resolvedTheme === "dark";
    const dotColor = isDark ? "rgba(96, 165, 250, 0.8)" : "rgba(37, 99, 235, 0.6)"; // Blue
    const lineColor = isDark ? "rgba(96, 165, 250, 0.2)" : "rgba(37, 99, 235, 0.15)";
    const highlightColor = isDark ? "rgba(250, 204, 21, 0.8)" : "rgba(234, 179, 8, 0.8)"; // Yellow

    const dots: { x: number; y: number; z: number; lat: number; lng: number; size: number; isNode: boolean; pulse: number }[] = [];
    const radius = Math.min(width, height) * 0.4;
    const TOTAL_DOTS = 400;

    // Generate points on a sphere (Fibonacci sphere algorithm)
    for (let i = 0; i < TOTAL_DOTS; i++) {
      const phi = Math.acos(-1 + (2 * i) / TOTAL_DOTS);
      const theta = Math.sqrt(TOTAL_DOTS * Math.PI) * phi;

      dots.push({
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        lat: phi,
        lng: theta,
        size: Math.random() * 1.5 + 0.5,
        isNode: Math.random() > 0.95, // 5% of dots are major nodes
        pulse: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;
    let animationFrameId: number;

    const draw = () => {
      time += 0.005;
      ctx.clearRect(0, 0, width, height);
      
      const centerX = width / 2;
      const centerY = height / 2;

      // Rotation matrix for Y axis
      const cosY = Math.cos(time);
      const sinY = Math.sin(time);
      // Rotation matrix for X axis (tilt)
      const cosX = Math.cos(0.4);
      const sinX = Math.sin(0.4);

      // Sort dots by Z index to draw back-to-front
      const projectedDots = dots.map(dot => {
        // Rotate Y
        const rotX = dot.x * cosY - dot.z * sinY;
        const rotZ = dot.z * cosY + dot.x * sinY;
        
        // Rotate X
        const finalY = dot.y * cosX - rotZ * sinX;
        const finalZ = rotZ * cosX + dot.y * sinX;

        // Perspective
        const scale = (radius + radius * 2) / (radius * 2 + finalZ);
        
        return {
          x: centerX + rotX * scale,
          y: centerY + finalY * scale,
          z: finalZ,
          scale,
          orig: dot
        };
      });

      projectedDots.sort((a, b) => b.z - a.z);

      // Draw connections between major nodes
      const nodes = projectedDots.filter(d => d.orig.isNode && d.z < radius * 0.5); // Only connect front nodes
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < radius * 0.8) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = lineColor;
            ctx.stroke();
          }
        }
      }

      // Draw dots
      projectedDots.forEach(p => {
        // Fade out dots in the back
        const opacity = Math.max(0.1, Math.min(1, (radius - p.z) / (radius * 1.5)));
        
        ctx.beginPath();
        
        if (p.orig.isNode) {
          const pulseScale = Math.sin(time * 5 + p.orig.pulse) * 0.5 + 1;
          ctx.arc(p.x, p.y, (p.orig.size + 2) * p.scale * pulseScale, 0, Math.PI * 2);
          ctx.fillStyle = highlightColor;
          ctx.fill();
          
          // Glow effect for nodes
          ctx.beginPath();
          ctx.arc(p.x, p.y, (p.orig.size + 8) * p.scale * pulseScale, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? `rgba(250, 204, 21, ${0.1 * opacity})` : `rgba(234, 179, 8, ${0.2 * opacity})`;
        } else {
          ctx.arc(p.x, p.y, p.orig.size * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = dotColor.replace('0.8)', `${opacity})`).replace('0.6)', `${opacity})`);
        }
        
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-50 blur-2xl" />
      <canvas 
        ref={canvasRef} 
        className="w-full h-full cursor-crosshair relative z-10"
        style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.2))" }}
      />
    </div>
  );
}
