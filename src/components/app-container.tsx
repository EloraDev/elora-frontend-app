"use client";
import type { ReactNode } from "react";

interface AppContainerProps {
  user: any;
  onLogout: () => void;
  children?: ReactNode;
}

export function AppContainer({ user, onLogout, children }: AppContainerProps) {
  // Provide context here if needed
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {children}
    </div>
  );
}
