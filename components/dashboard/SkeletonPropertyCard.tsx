import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonPropertyCard() {
  return (
    <Card className="group overflow-hidden">
      <div className="relative h-64 overflow-hidden">
        <Skeleton className="absolute top-3 left-3 h-7 w-20 rounded-full" />
        <Skeleton className="absolute top-3 right-3 h-8 w-8 rounded-full" />
        <Skeleton className="h-full w-full" />
      </div>
      <CardContent className="p-4">
        <div className="space-y-3">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-8 w-1/3 mb-2" />
          <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-4 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}
