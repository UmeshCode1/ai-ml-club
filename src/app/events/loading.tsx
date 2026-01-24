import { Skeleton } from "@/components/ui/skeleton";

export default function EventsLoading() {
    return (
        <div className="min-h-screen pt-28 pb-12 px-6 lg:px-8 max-w-6xl mx-auto">
            <div className="text-center mb-12 flex flex-col items-center gap-4">
                <Skeleton className="h-6 w-32 rounded-full" />
                <Skeleton className="h-16 w-64 md:w-96" />
                <Skeleton className="h-20 w-full max-w-2xl" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex flex-col gap-4 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                        <Skeleton className="aspect-video w-full rounded-xl" />
                        <div className="space-y-4">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-16 w-full" />
                            <div className="flex gap-4">
                                <Skeleton className="h-10 w-32 rounded-full" />
                                <Skeleton className="h-10 w-10 rounded-full" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
