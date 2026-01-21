"use client";

import { usePathname } from "next/navigation";

export function useRouteKey() {
    const pathname = usePathname();
    return pathname;
}
