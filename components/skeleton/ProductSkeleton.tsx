import { Skeleton } from "@/components/ui/skeleton";

export default function ProductSkeleton() {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="border rounded-lg p-4 space-y-3">
          <Skeleton className="h-40 w-full bg-gray-300" />
          <Skeleton className="h-5 w-3/4 bg-gray-300" />
          <Skeleton className="h-4 w-full bg-gray-300" />
          <Skeleton className="h-4 w-2/3 bg-gray-300" />
          <Skeleton className="h-7 w-20 bg-gray-300" />
        </div>

        {/* Card 2 */}
        <div className="border rounded-lg p-4 space-y-3">
          <Skeleton className="h-40 w-full bg-gray-300" />
          <Skeleton className="h-5 w-2/3 bg-gray-300" />
          <Skeleton className="h-4 w-full bg-gray-300" />
          <Skeleton className="h-4 w-3/4 bg-gray-300" />
          <Skeleton className="h-7 w-20 bg-gray-300" />
        </div>

        {/* Card 3 */}
        <div className="border rounded-lg p-4 space-y-3">
          <Skeleton className="h-40 w-full bg-gray-300" />
          <Skeleton className="h-5 w-1/2 bg-gray-300" />
          <Skeleton className="h-4 w-full bg-gray-300" />
          <Skeleton className="h-4 w-4/5 bg-gray-300" />
          <Skeleton className="h-7 w-20 bg-gray-300" />
        </div>
      </div>
    </div>
  );
}
