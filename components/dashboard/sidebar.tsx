"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {
  LayoutDashboard,
  Home,
  CalendarClock,
  Settings,
  Building2,
  LogOut,
  MessageCircleQuestionIcon,
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { DialogDescription } from "../ui/dialog";
import { Message } from "@mui/icons-material";
// import { useClerk } from "@clerk/nextjs";
// import { Message } from "@mui/icons-material";
const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Properties",
    icon: Building2,
    href: "/dashboard/properties",
  },
  {
    label: "Appointments",
    icon: CalendarClock,
    href: "/dashboard/appointments",
  },
  {
    label: "Messages",
    icon: Message,
    href: "/dashboard/messages",
  },
  // {
  //   label: "Support & Resources",
  //   icon: MessageCircleQuestionIcon,
  //   href: "/dashboard/support",
  // },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  // const { signOut } = useClerk();
  const [confirmSignOut, setConfirmSignOut] = useState(false);
  return (
    <div className="flex flex-col h-full border-r bg-background w-44">
      <div className="p-6">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6" />
            <h1 className="sniglet-extrabold text-3xl drop-shadow-lg">
              Kër<span className="text-blue-500">Spaces</span>
            </h1>
          </div>
        </Link>
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-2">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                pathname === route.href && "bg-muted"
              )}
              asChild
            >
              <Link href={route.href}>
                <route.icon className="mr-2 h-4 w-4" />
                {route.label}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 mt-auto border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground"
          onClick={() => setConfirmSignOut(true)}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
        <Dialog open={confirmSignOut} onOpenChange={setConfirmSignOut}>
          <DialogOverlay className="fixed inset-0 bg-black opacity-30" />
          <DialogContent className="fixed inset-0 flex items-center justify-center">
            <div className="bg-blue-500 p-6 rounded shadow-lg">
              <DialogTitle className="text-lg font-bold">
                Confirm Sign Out
              </DialogTitle>
              <DialogDescription className="mt-2 text-white">
                Are you sure you want to sign out?
              </DialogDescription>
              <div className="mt-4 flex justify-end space-x-2">
                <Button
                  variant="secondary"
                  onClick={() => setConfirmSignOut(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      localStorage.removeItem("token");
                    }
                    setConfirmSignOut(false);
                    window.location.href = "/auth";
                  }}
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
