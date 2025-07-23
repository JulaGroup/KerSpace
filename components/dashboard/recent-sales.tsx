import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>JM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">John Miller</p>
          <p className="text-sm text-muted-foreground">
            Scheduled viewing for Luxury Villa
          </p>
        </div>
        <div className="ml-auto font-medium">Today</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sarah Davis</p>
          <p className="text-sm text-muted-foreground">
            Inquired about Beach House
          </p>
        </div>
        <div className="ml-auto font-medium">Yesterday</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>MR</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Mike Ross</p>
          <p className="text-sm text-muted-foreground">
            Listed new Downtown Apartment
          </p>
        </div>
        <div className="ml-auto font-medium">2 days ago</div>
      </div>
    </div>
  );
}
