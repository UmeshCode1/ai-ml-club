"use client";

import { Circle, CheckCircle2, PlayCircle, Loader2, AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export type StatusVariant =
  | "completed"
  | "ongoing"
  | "upcoming"
  | "idle"
  | "success"
  | "error"
  | "loading"
  | "pending"
  | "past";

export type StatusSize = "sm" | "md" | "lg" | "xl";

export interface StatusIndicatorProps {
  variant: StatusVariant;
  size?: StatusSize;
  label?: string;
  showIcon?: boolean;
  showLabel?: boolean;
  showPing?: boolean;
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
}

const sizeConfig = {
  sm: {
    dot: "w-1.5 h-1.5",
    container: "w-4 h-4",
    border: "border-2",
    icon: "w-2.5 h-2.5",
    badge: "px-2 py-0.5 text-[8px]",
    iconInBadge: "w-2.5 h-2.5",
  },
  md: {
    dot: "w-1.5 h-1.5",
    container: "w-6 h-6",
    border: "border-[3px]",
    icon: "w-3 h-3",
    badge: "px-3 py-1 text-[9px]",
    iconInBadge: "w-3 h-3",
  },
  lg: {
    dot: "w-2 h-2",
    container: "w-8 h-8",
    border: "border-4",
    icon: "w-4 h-4",
    badge: "px-4 py-1.5 text-[10px]",
    iconInBadge: "w-3.5 h-3.5",
  },
  xl: {
    dot: "w-3 h-3",
    container: "w-10 h-10",
    border: "border-4",
    icon: "w-5 h-5",
    badge: "px-5 py-2 text-xs",
    iconInBadge: "w-4 h-4",
  },
};

const variantConfig: Record<
  StatusVariant,
  {
    icon: typeof Circle;
    dotColor: string;
    borderColor: string;
    bgColor: string;
    textColor: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder?: string;
    scale?: string;
    animate?: boolean;
  }
> = {
  completed: {
    icon: CheckCircle2,
    dotColor: "bg-green-500",
    borderColor: "border-green-500",
    bgColor: "bg-white dark:bg-black",
    textColor: "text-green-600",
    badgeBg: "bg-green-500/10",
    badgeText: "text-green-600",
    badgeBorder: "border border-green-500/20",
  },
  past: {
    icon: CheckCircle2,
    dotColor: "bg-green-500",
    borderColor: "border-green-500",
    bgColor: "bg-white dark:bg-black",
    textColor: "text-green-600/80",
    badgeBg: "bg-green-500/10",
    badgeText: "text-green-600",
    badgeBorder: "border border-green-500/20",
  },
  ongoing: {
    icon: PlayCircle,
    dotColor: "bg-[var(--neon-lime)]",
    borderColor: "border-[var(--neon-lime)]",
    bgColor: "bg-white dark:bg-black",
    textColor: "text-[var(--neon-lime)]",
    badgeBg: "bg-[var(--neon-lime)]",
    badgeText: "text-black",
    scale: "scale-110",
    animate: true,
  },
  upcoming: {
    icon: Circle,
    dotColor: "bg-neutral-400 dark:bg-neutral-800",
    borderColor: "border-neutral-300 dark:border-neutral-800",
    bgColor: "bg-white dark:bg-black",
    textColor: "text-neutral-500",
    badgeBg: "bg-neutral-100 dark:bg-neutral-800",
    badgeText: "text-neutral-500",
  },
  idle: {
    icon: Circle,
    dotColor: "bg-neutral-300 dark:bg-neutral-700",
    borderColor: "border-neutral-200 dark:border-neutral-700",
    bgColor: "bg-white dark:bg-black",
    textColor: "text-neutral-400",
    badgeBg: "bg-neutral-50 dark:bg-neutral-900",
    badgeText: "text-neutral-400",
  },
  success: {
    icon: CheckCircle2,
    dotColor: "bg-green-500",
    borderColor: "border-green-500",
    bgColor: "bg-white dark:bg-black",
    textColor: "text-green-600",
    badgeBg: "bg-green-500",
    badgeText: "text-white",
  },
  error: {
    icon: AlertCircle,
    dotColor: "bg-red-500",
    borderColor: "border-red-500",
    bgColor: "bg-white dark:bg-black",
    textColor: "text-red-600",
    badgeBg: "bg-red-500",
    badgeText: "text-white",
    animate: true,
  },
  loading: {
    icon: Loader2,
    dotColor: "bg-[var(--electric-cyan)]",
    borderColor: "border-[var(--electric-cyan)]",
    bgColor: "bg-white dark:bg-black",
    textColor: "text-[var(--electric-cyan)]",
    badgeBg: "bg-[var(--electric-cyan)]/10",
    badgeText: "text-[var(--electric-cyan)]",
    animate: true,
  },
  pending: {
    icon: Clock,
    dotColor: "bg-amber-500",
    borderColor: "border-amber-500",
    bgColor: "bg-white dark:bg-black",
    textColor: "text-amber-600",
    badgeBg: "bg-amber-500/10",
    badgeText: "text-amber-600",
    badgeBorder: "border border-amber-500/20",
  },
};

export function StatusIndicator({
  variant,
  size = "md",
  label,
  showIcon = true,
  showLabel = false,
  showPing = true,
  className,
  iconClassName,
  labelClassName,
}: StatusIndicatorProps) {
  const config = variantConfig[variant];
  const sizes = sizeConfig[size];
  const Icon = config.icon;

  // Simple dot indicator (default)
  if (!showLabel && showIcon) {
    return (
      <div
        className={cn(
          "rounded-full transition-all duration-500 relative flex items-center justify-center",
          sizes.container,
          sizes.border,
          config.borderColor,
          config.bgColor,
          config.scale,
          className
        )}
      >
        <div className={cn("rounded-full", sizes.dot, config.dotColor)} />
        {config.animate && showPing && (
          <span
            className={cn(
              "absolute inset-0 animate-ping rounded-full opacity-30",
              config.dotColor
            )}
          />
        )}
      </div>
    );
  }

  // Badge with icon and label
  if (showLabel && label) {
    return (
      <div
        className={cn(
          "rounded-full font-black uppercase tracking-tighter flex items-center gap-1.5 transition-all duration-300",
          sizes.badge,
          config.badgeBg,
          config.badgeText,
          config.badgeBorder,
          className
        )}
      >
        {showIcon && (
          <Icon
            className={cn(
              sizes.iconInBadge,
              variant === "loading" && "animate-spin",
              iconClassName
            )}
          />
        )}
        <span className={labelClassName}>{label}</span>
      </div>
    );
  }

  // Icon only
  return (
    <Icon
      className={cn(
        sizes.icon,
        config.textColor,
        variant === "loading" && "animate-spin",
        className,
        iconClassName
      )}
    />
  );
}

export function StatusDot({
  variant,
  size = "md",
  showPing = true,
  className,
}: {
  variant: StatusVariant;
  size?: StatusSize;
  showPing?: boolean;
  className?: string;
}) {
  const config = variantConfig[variant];
  const sizes = sizeConfig[size];

  return (
    <div
      className={cn(
        "rounded-full transition-all duration-500 relative flex items-center justify-center",
        sizes.container,
        sizes.border,
        config.borderColor,
        config.bgColor,
        config.scale,
        className
      )}
    >
      <div className={cn("rounded-full", sizes.dot, config.dotColor)} />
      {config.animate && showPing && (
        <span
          className={cn(
            "absolute inset-0 animate-ping rounded-full opacity-30",
            config.dotColor
          )}
        />
      )}
    </div>
  );
}

export function StatusBadge({
  variant,
  label,
  size = "md",
  showIcon = true,
  className,
  iconClassName,
  labelClassName,
}: {
  variant: StatusVariant;
  label: string;
  size?: StatusSize;
  showIcon?: boolean;
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
}) {
  const config = variantConfig[variant];
  const sizes = sizeConfig[size];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "rounded-full font-black uppercase tracking-tighter flex items-center gap-1.5 transition-all duration-300",
        sizes.badge,
        config.badgeBg,
        config.badgeText,
        config.badgeBorder,
        className
      )}
    >
      {showIcon && (
        <Icon
          className={cn(
            sizes.iconInBadge,
            variant === "loading" && "animate-spin",
            iconClassName
          )}
        />
      )}
      <span className={labelClassName}>{label}</span>
    </div>
  );
}
