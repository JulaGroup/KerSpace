"use client";
import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";

const allowedRoutes = [
  "/",
  "/listings",
  "/about",
  "/contact",
  "/favorites",
  "/appointments",
];

export function HeaderWrapper() {
  const pathname = usePathname();
  if (!allowedRoutes.includes(pathname)) return null;
  return <Header />;
}
