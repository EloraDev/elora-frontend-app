import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "../../lib/utils";
import { Home, Brain, Calendar, FileText, User } from "lucide-react";

interface BottomNavProps {
  className?: string;
}

const navItems = [
  {
    name: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Diagnosis",
    href: "/dashboard/scan",
    icon: Brain,
  },
  {
    name: "Bookings",
    href: "/dashboard/appointments",
    icon: Calendar,
  },
  {
    name: "History",
    href: "/dashboard/history",
    icon: FileText,
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
];

export const BottomNav = ({ className }: BottomNavProps) => {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return currentPath === "/dashboard";
    }
    return currentPath.startsWith(href);
  };

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-inset-bottom z-50",
        className
      )}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg flex-1 max-w-[80px] transition-all",
                active
                  ? "text-(--color-brown-dark)"
                  : "text-(--color-slate)"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 shrink-0",
                  active && "text-[#E4B68A]"
                )}
              />
              <span
                className={cn(
                  "text-[10px] font-medium",
                  active && "text-(--color-brown-dark)"
                )}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

