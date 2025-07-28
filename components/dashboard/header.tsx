"use client";

import { Bell, Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Avatar } from "../ui/avatar";
import { useRouter } from "next/navigation";
import { Message } from "@mui/icons-material";
import { useEffect, useState } from "react";

export function Header() {
  const router = useRouter();
  const { setTheme } = useTheme();
  const [userInitials, setUserInitials] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          if (payload.name) {
            const initials = payload.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .toUpperCase();
            setUserInitials(initials);
          }
        } catch (e) {
          setUserInitials(null);
        }
      } else {
        setUserInitials(null);
      }
    }
  }, []);

  return (
    <header className="border-b bg-background">
      <div className="flex h-16 items-center px-6">
        <div className="ml-auto flex items-center space-x-4">
          <button
            onClick={() => {
              router.push("/");
            }}
            className="bg-blue-600 p-2 hover:bg-blue-500 duration-150 ease-in transition text-white rounded-md"
          >
            Go to Home Page
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          {userInitials && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer p-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {userInitials}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    localStorage.removeItem("token");
                    router.push("/");
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
