"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const path = window.location.pathname;

    if (path === "/admin") return;
    if (status === "loading") return;
    if (!session) {
      router.push("/admin");
    }
  }, [router, session, status]);

  return (
    <>
      {status === "loading" ? (
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            <div className="mt-4 text-xl font-semibold tracking-wider text-gray-900">
              Loading...
            </div>
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
