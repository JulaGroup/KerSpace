"use client";
import { Toaster } from "sonner";
import "../styles/dashboard.css";
import { Sidebar } from "@/components/dashboard/sidebar";
import { ThemeProvider } from "next-themes";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { useTheme } from "next-themes";
import React, { useMemo } from "react";
import { Header } from "@/components/dashboard/header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { resolvedTheme } = useTheme();
  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: resolvedTheme === "dark" ? "dark" : "light",
        },
      }),
    [resolvedTheme]
  );
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <MuiThemeProvider theme={muiTheme}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto bg-muted/10 p-6">
              {children}
            </main>
          </div>
        </div>
        <Toaster />
      </MuiThemeProvider>
    </ThemeProvider>
  );
};

export default DashboardLayout;
