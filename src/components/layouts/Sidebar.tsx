import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "../../lib/utils";
import {
  Home,
  Brain,
  Calendar,
  FileText,
  User,
  LogOut,
} from "lucide-react";
import type { LoginUser } from "../../features/auth/types";
import { useAuth } from "../../providers/auth.provider";

interface SidebarProps {
  user?: LoginUser;
  className?: string;
}

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "AI Diagnosis",
    href: "/dashboard/scan",
    icon: Brain,
  },
  {
    name: "Consultations",
    href: "/dashboard/appointments",
    icon: Calendar,
  },
  {
    name: "Medical History",
    href: "/dashboard/history",
    icon: FileText,
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
];

export const Sidebar = ({ user, className }: SidebarProps) => {
  const router = useRouterState();
  const { logout } = useAuth();
  const currentPath = router.location.pathname;

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return currentPath === "/dashboard";
    }
    return currentPath.startsWith(href);
  };

  return (
    <aside
      className={cn(
        "w-64 lg:w-72 min-h-screen bg-white border-r border-gray-200 flex flex-col",
        className
      )}
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link to="/dashboard" className="flex items-center gap-2">
          <img
            src="/img/icons/elora-logo.svg"
            alt="Elora Logo"
            className="h-8"
          />
        </Link>
      </div>

      {/* User Profile Section */}
      {user && (
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-(--color-peach-lightest) flex items-center justify-center overflow-hidden">
              <span className="text-lg font-semibold text-(--color-brown)">
                {user.first_name?.[0]}
                {user.last_name?.[0]}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-(--color-gray-darker) truncate">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-xs text-(--color-slate) truncate">
                {user.email}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                active
                  ? "bg-[#E4B68A]/10 text-(--color-brown-dark)"
                  : "text-(--color-slate) hover:bg-gray-50 hover:text-(--color-gray-darker)"
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => logout()}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-(--color-slate) hover:bg-red-50 hover:text-red-600 transition-all w-full"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

