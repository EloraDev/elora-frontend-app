"use client"

import { Home, ScanLine, FileText, Calendar, User } from "lucide-react"
import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import { Link, useRouter } from "@tanstack/react-router"

interface BottomNavigationProps {
  onScanClick: () => void // callback for scan action
}

const navItems = [
  {
    id: "dashboard",
    label: "Home",
    icon: Home,
    color: "text-blue-600",
    to: "/dashboard",
  },
  {
    id: "records",
    label: "Records",
    icon: FileText,
    color: "text-purple-600",
    to: "/dashboard/records",
  },
  {
    id: "scan",
    label: "Scan",
    icon: ScanLine,
    color: "text-green-600",
    to: "/dashboard/scan",
    isSpecial: true,
  },
  {
    id: "appointments",
    label: "Appointments",
    icon: Calendar,
    color: "text-orange-600",
    to: "/dashboard/appointments",
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    color: "text-gray-600",
    to: "/dashboard/profile",
  },
]

export function BottomNavigation({ onScanClick }: BottomNavigationProps) {
  const router = useRouter()
  const currentPath = router.state.location.pathname

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50 shadow-lg">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon
            // Use exact path matching for dashboard, otherwise use startsWith for sub-routes
            const isActive = item.id === "dashboard" 
              ? currentPath === item.to 
              : currentPath.startsWith(item.to)

            if (item.isSpecial) {
              return (
                <Link
                  key={item.id}
                  to={item.to}
                  onClick={onScanClick}
                  className="relative -mt-6 no-underline"
                >
                  <div
                    className={cn(
                      "w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-green-500 to-blue-500 scale-110"
                        : "bg-gradient-to-r from-green-600 to-blue-600 hover:scale-105",
                    )}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full" />
                  )}
                </Link>
              )
            }

            return (
              <Link
                key={item.id}
                to={item.to}
                className={cn(
                  "flex flex-col items-center space-y-1 py-2 px-2 rounded-lg transition-all duration-200",
                  isActive ? "bg-gray-100" : "hover:bg-gray-50",
                  "no-underline"
                )}
              >
                <Icon
                  className={cn("w-5 h-5 transition-colors duration-200", isActive ? item.color : "text-gray-400")}
                />
                <span
                  className={cn(
                    "text-xs font-medium transition-colors duration-200",
                    isActive ? item.color : "text-gray-400",
                  )}
                >
                  {item.label}
                </span>
                {isActive && <div className={cn("w-1 h-1 rounded-full", item.color.replace("text-", "bg-"))} />}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
