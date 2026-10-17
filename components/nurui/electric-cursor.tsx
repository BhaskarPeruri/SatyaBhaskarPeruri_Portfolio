"use client";
import React, { useEffect, useRef } from "react";

// Interface for Spark instance
interface ISpark {
  x: number;
  y: number;
  length: number;
  alpha: number;
  update: () => void;
  draw: () => void;
}

const ElectricCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const sparks: ISpark[] = [];
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Skip the effect on touch devices and for users who prefer reduced motion
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    class Spark implements ISpark {
      x: number;
      y: number;
      length: number;
      alpha: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.length = Math.random() * 10 + 5;
        this.alpha = 1;
      }

      update(): void {
        this.length -= 0.5;
        this.alpha -= 0.03;
      }

      draw(): void {
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x + Math.random() * this.length,
          this.y + Math.random() * this.length,
        );
        ctx.strokeStyle = `rgba(0, 200, 255, ${this.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    let frameId = 0;
    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = sparks.length - 1; i >= 0; i--) {
        sparks[i].update();
        sparks[i].draw();
        if (sparks[i].alpha <= 0) {
          sparks.splice(i, 1);
        }
      }

      frameId = requestAnimationFrame(animate);
    };

    const onMove = (e: MouseEvent): void => {
      for (let i = 0; i < 3; i++) {
        sparks.push(new Spark(e.clientX, e.clientY));
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", resize);
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-50"
    />
  );
};

export default ElectricCursor;
