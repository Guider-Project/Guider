"use client";

import { SessionProvider } from "next-auth/react";
import ProtectedRoute from "@/components/admin/protectedRoute";

export default function AdminLayout({ children }) {
  return (
    <SessionProvider>
      <ProtectedRoute>{children}</ProtectedRoute>
    </SessionProvider>
  );
}
