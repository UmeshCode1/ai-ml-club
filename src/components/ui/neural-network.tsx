"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
}

export const NeuralNetwork = ({ className }: { className?: string }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();
    const particles = useRef<Particle[]>([]);
    const mouse = useRef({ x: 0, y: 0 });
    const isMouseIn = useRef(false);
    const isMobileRef = useRef(false);
    const lastFrameTime = useRef(0);
    const isVisible = useRef(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;

        // Visibility Observer to stop energy drain when not looking at it
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible.current = entry.isIntersecting;
            },
            { threshold: 0.01 }
        );
        observer.observe(canvas);

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            const isMobile = width < 768;
            // Lower resolution on mobile to save GPU fill rate
            const dpr = isMobile ? Math.min(window.devicePixelRatio, 1.5) : (window.devicePixelRatio || 1);
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(dpr, dpr);
            initParticles();
        };

        const initParticles = () => {
            const isMobile = width < 768;
            const isSmallMobile = width < 480;
            isMobileRef.current = isMobile;
            // Dramatically fewer particles on mobile
            const baseCount = isSmallMobile ? 6 : (isMobile ? 12 : Math.min(Math.floor((width * height) / 20000), 80));
            const particleCount = baseCount;

            particles.current = [];
            for (let i = 0; i < particleCount; i++) {
                particles.current.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * (isMobile ? 0.03 : 0.2), // Even slower on mobile
                    vy: (Math.random() - 0.5) * (isMobile ? 0.03 : 0.2),
                    size: Math.random() * (isMobile ? 0.6 : 1.5) + 0.4,
                });
            }
        };

        const drawStats = () => {
            // Stop energy drain if not visible
            if (!isVisible.current) {
                animationFrameId = requestAnimationFrame(drawStats);
                return;
            }

            const isDark = theme === "dark";
            const particleFill = isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.2)";
            const lineStroke = isDark ? "rgba(100, 100, 255," : "rgba(0, 0, 0,";

            const now = Date.now();
            const elapsed = now - lastFrameTime.current;
            // Cap FPS for mobile to save battery
            const fpsLimit = isMobileRef.current ? 60 : 25; // ~16ms vs ~40ms

            if (elapsed < fpsLimit) {
                animationFrameId = requestAnimationFrame(drawStats);
                return;
            }
            lastFrameTime.current = now;

            ctx.clearRect(0, 0, width, height);

            const parts = particles.current;
            const len = parts.length;
            const connectDistance = isMobileRef.current ? 0 : 120; // NO connections on mobile

            for (let i = 0; i < len; i++) {
                const p = parts[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = particleFill;
                ctx.fill();

                // Connections - Only for desktop to significantly save power
                if (connectDistance > 0) {
                    for (let j = i + 1; j < len; j++) {
                        const p2 = parts[j];
                        const dx = p.x - p2.x;
                        if (Math.abs(dx) > connectDistance) continue;

                        const dy = p.y - p2.y;
                        if (Math.abs(dy) > connectDistance) continue;

                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < connectDistance) {
                            const opacity = (1 - dist / connectDistance) * 0.15;
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.strokeStyle = `${lineStroke}${opacity})`;
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    }
                }
            }

            animationFrameId = requestAnimationFrame(drawStats);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
            isMouseIn.current = true;
        };
        const handleMouseLeave = () => {
            isMouseIn.current = false;
        };

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseout", handleMouseLeave);

        resize();
        drawStats();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseout", handleMouseLeave);
            observer.disconnect();
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className={cn("absolute inset-0 w-full h-full pointer-events-none will-change-transform", className)}
        />
    );
};

