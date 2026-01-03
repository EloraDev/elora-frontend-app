import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";
import { useAuth } from "../../providers/auth.provider";
import { Loader2 } from "lucide-react";
import { AuthState } from "../../types/auth";

export const DashboardLayout = () => {
  const { authState, user } = useAuth();

  // Show loading state while authenticating
  if (authState === AuthState.AUTHENTICATING) {
    return (
      <div className="min-h-screen bg-(--color-cream) flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-(--color-peach-light)" />
          <p className="text-(--color-slate) text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--color-cream) flex">
      {/* Sidebar - Hidden on mobile, visible on md+ */}
      <Sidebar user={user ?? undefined} className="hidden md:flex" />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Content with padding for bottom nav on mobile */}
        <div className="flex-1 p-4 md:p-6 lg:p-8 pb-24 md:pb-8">
          <Outlet />
        </div>
      </main>

      {/* Bottom Navigation - Visible on mobile, hidden on md+ */}
      <BottomNav className="md:hidden" />
    </div>
  );
};

