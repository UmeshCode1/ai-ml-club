import { Skeleton } from "@/components/ui/skeleton";

export default function GalleryLoading() {
    return (
        <div className="min-h-screen pt-28 pb-12 px-6 lg:px-8 max-w-6xl mx-auto">
            <div className="text-center mb-12 flex flex-col items-center gap-4">
                <Skeleton className="h-6 w-32 rounded-full" />
                <Skeleton className="h-16 w-64 md:w-96" />
                <Skeleton className="h-20 w-full max-w-2xl" />
            </div>

            <Skeleton className="h-32 w-full rounded-2xl mb-8" />

            <div className="flex gap-4 mb-8 overflow-hidden justify-center">
                {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-10 w-28 rounded-full shrink-0" />
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                        <Skeleton className="aspect-[4/3] w-full" />
                        <div className="p-4 space-y-3">
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-4 w-full" />
                            <div className="flex justify-between pt-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-8 w-8 rounded-full" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
