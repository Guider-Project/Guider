"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import NavBar from "@/components/common/navbar";
import Form from "@/components/admin/form";

export default function Admin() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;
    if (status === "authenticated") router.push("/admin/dashboard");
  }, [session, status, router]);

  return (
    <>
      <NavBar />
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
        <Form />
      )}
    </>
  );
}
