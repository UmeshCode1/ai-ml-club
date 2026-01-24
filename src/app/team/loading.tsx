import { Skeleton } from "@/components/ui/skeleton";

export default function TeamLoading() {
    return (
        <div className="min-h-screen pt-24 px-4 flex flex-col items-center max-w-7xl mx-auto w-full">
            <div className="flex flex-col items-center gap-6 mb-12 w-full">
                <Skeleton className="w-24 h-24 rounded-full" />
                <Skeleton className="h-6 w-64 rounded-full" />
                <Skeleton className="h-16 w-full max-w-2xl" />
                <Skeleton className="h-10 w-48 rounded-full" />
                <Skeleton className="h-24 w-full max-w-2xl" />
            </div>

            <div className="flex gap-2 mb-8 overflow-hidden justify-center">
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-10 w-24 rounded-full" />
                ))}
            </div>

            <div className="flex gap-4 mb-8">
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-10 w-32 rounded-full" />
                ))}
            </div>

            <div className="w-full space-y-12">
                {[1, 2].map((section) => (
                    <div key={section} className="p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800">
                        <div className="flex gap-4 mb-6">
                            <Skeleton className="w-12 h-12 rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-48" />
                                <Skeleton className="h-4 w-64" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[1, 2, 3].map((i) => (
                                <Skeleton key={i} className="h-40 rounded-3xl" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
