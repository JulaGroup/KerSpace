import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface SkeletonPropertyCardProps {
  viewMode?: "grid" | "list";
}

export function SkeletonPropertyCard({
  viewMode = "grid",
}: SkeletonPropertyCardProps) {
  return (
    <Card
      className={cn(
        "group overflow-hidden",
        viewMode === "list" ? "flex flex-row h-32" : ""
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          viewMode === "list" ? "w-48 h-full flex-shrink-0" : "h-64"
        )}
      >
        <Skeleton className="absolute top-3 left-3 h-7 w-20 rounded-full" />
        <Skeleton className="absolute top-3 right-3 h-8 w-8 rounded-full" />
        <Skeleton className="h-full w-full" />
      </div>
      <CardContent
        className={cn(
          "p-4",
          viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""
        )}
      >
        {viewMode === "list" ? (
          <div className="flex flex-col justify-between h-full space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <div className="ml-4">
                <Skeleton className="h-6 w-20 mb-1" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-6 w-12 rounded-lg" />
                <Skeleton className="h-6 w-12 rounded-lg" />
                <Skeleton className="h-6 w-16 rounded-lg" />
              </div>
              <Skeleton className="h-3 w-full" />
            </div>
          </div>
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
}
