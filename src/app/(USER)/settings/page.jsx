"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Spinner, Button } from "@nextui-org/react";

import NavBar from "@/components/common/navbar";
import Footer from "@/components/common/footer";

export default function Settings() {
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "authenticated") {
      setUser(session?.data);
      setAuthenticated(true);
      setLoading(false);
    }
    if (status === "unauthenticated") {
      setAuthenticated(false);
      setLoading(false);
    }
  }, [session, status]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <NavBar activeTab="settings" />

      {loading ? (
        <div className="flex justify-center items-center h-screen w-screen">
          <Spinner color="primary" size="lg" />
        </div>
      ) : (
        <>
          {!authenticated ? (
            <div className="flex justify-center items-center h-[calc(100vh-470px)] w-screen">
              <h1 className="text-2xl font-semibold text-gray-700">Please sign in to continue.</h1>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center w-full py-10 px-24 gap-8">
              <h1 className="text-2xl font-semibold text-gray-700">Settings</h1>

              <div className="flex flex-col items-center justify-center w-full">
                <div className="flex w-full gap-5">
                  {(user?.role === "admin" || user?.role === "bus") && (
                    <>
                      <Button className="" color="success" auto>
                        Add new bus
                      </Button>

                      <Button className="" color="success" auto>
                        Add new time
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <Footer />
    </>
  );
}
