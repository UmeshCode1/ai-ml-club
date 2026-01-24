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
            canvas.width = width;
            canvas.height = height;
            initParticles();
        };

        const initParticles = () => {
            const isMobile = width < 768;
            isMobileRef.current = isMobile;
            const baseCount = isMobile ? 15 : Math.min(Math.floor((width * height) / 20000), 80);
            const particleCount = baseCount;

            particles.current = [];
            for (let i = 0; i < particleCount; i++) {
                particles.current.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * (isMobile ? 0.1 : 0.2),
                    vy: (Math.random() - 0.5) * (isMobile ? 0.1 : 0.2),
                    size: Math.random() * (isMobile ? 1.0 : 1.5) + 0.5,
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
            const particleFill = isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.3)";
            const lineStroke = isDark ? "rgba(100, 100, 255," : "rgba(0, 0, 0,";

            const now = Date.now();
            const elapsed = now - lastFrameTime.current;
            // Cap FPS for mobile to save battery
            const fpsLimit = isMobileRef.current ? 40 : 25;

            if (elapsed < fpsLimit) {
                animationFrameId = requestAnimationFrame(drawStats);
                return;
            }
            lastFrameTime.current = now;

            ctx.clearRect(0, 0, width, height);

            const parts = particles.current;
            const len = parts.length;
            const connectDistance = isMobileRef.current ? 80 : 120;
            const mouseRepulsion = 150;

            for (let i = 0; i < len; i++) {
                const p = parts[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                if (isMouseIn.current) {
                    const dx = mouse.current.x - p.x;
                    const dy = mouse.current.y - p.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouseRepulsion) {
                        const force = (mouseRepulsion - distance) / mouseRepulsion;
                        const angle = Math.atan2(dy, dx);
                        p.x -= Math.cos(angle) * force * 1.5;
                        p.y -= Math.sin(angle) * force * 1.5;
                    }
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = particleFill;
                ctx.fill();

                // Connections - Only for desktop to significantly save power
                if (!isMobileRef.current) {
                    // Optimization: Only check half the connections to reduce CPU Load
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

