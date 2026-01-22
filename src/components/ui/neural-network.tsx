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

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initParticles();
        };

        const initParticles = () => {
            // Reduce particles on mobile for performance
            const isMobile = width < 768;
            isMobileRef.current = isMobile;
            const baseCount = isMobile ? 12 : Math.min(Math.floor((width * height) / 15000), 100);
            const particleCount = baseCount;

            particles.current = [];
            for (let i = 0; i < particleCount; i++) {
                particles.current.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.25),
                    vy: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.25),
                    size: Math.random() * (isMobile ? 1.2 : 1.8) + 0.8,
                });
            }
        };

        const drawStats = () => {
            const isDark = theme === "dark";
            // Professional Colors
            const particleFill = isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.4)";
            const lineStroke = isDark ? "rgba(100, 100, 255," : "rgba(0, 0, 0,";

            // FPS controlling for mobile
            const now = Date.now();
            const elapsed = now - lastFrameTime.current;
            const fpsLimit = isMobileRef.current ? 33 : 16; // ~30fps mobile, ~60fps desktop

            if (elapsed < fpsLimit) {
                animationFrameId = requestAnimationFrame(drawStats);
                return;
            }
            lastFrameTime.current = now;

            ctx.clearRect(0, 0, width, height);

            particles.current.forEach((p, i) => {
                // Base Movement
                p.x += p.vx;
                p.y += p.vy;

                // Wall Bounce
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Mouse Interaction (Softer Repulsion)
                if (isMouseIn.current) {
                    const dx = mouse.current.x - p.x;
                    const dy = mouse.current.y - p.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const repulsionRadius = 200;

                    if (distance < repulsionRadius) {
                        const force = (repulsionRadius - distance) / repulsionRadius;
                        const angle = Math.atan2(dy, dx);
                        const push = force * 2; // Gentle push
                        p.x -= Math.cos(angle) * push;
                        p.y -= Math.sin(angle) * push;
                    }
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = particleFill;
                ctx.fill();

                // Connections - Skip on mobile for performance
                if (!isMobileRef.current) {
                    for (let j = i + 1; j < particles.current.length; j++) {
                        const p2 = particles.current[j];
                        const dx = p.x - p2.x;
                        const dy = p.y - p2.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const connectDistance = 100;

                        if (dist < connectDistance) {
                            const opacity = 1 - dist / connectDistance;
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.strokeStyle = `${lineStroke} ${opacity * 0.12})`;
                            ctx.lineWidth = 0.6;
                            ctx.stroke();
                        }
                    }
                }
            });

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
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
        />
    );
};
