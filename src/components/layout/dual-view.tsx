import { ReactNode } from "react";

/**
 * Renders children ONLY when in Web (Browser) mode.
 * Hidden immediately via CSS in Standalone mode (zero flash).
 */
export function SeoOnly({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <div className={`standalone:hidden ${className}`}>
            {children}
        </div>
    );
}

/**
 * Renders children ONLY when in Standalone (App) mode.
 * Hidden immediately via CSS in Web mode (zero flash).
 * Note: Use 'hidden standalone:block' logic.
 */
export function AppOnly({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <div className={`hidden standalone:block ${className}`}>
            {children}
        </div>
    );
}
