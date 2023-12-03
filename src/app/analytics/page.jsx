"use client";

import { useSession } from "next-auth/react";

import NavBar from "@/components/common/navbar";
import Hero from "@/components/common/hero";
import Footer from "@/components/common/footer";

import AnalyticsComponent from "@/components/analytics";

export default function Analytics() {
  const { data: session, status } = useSession();

  return (
    <>
      <NavBar activeTab="about" />
      {session?.data?.role === "admin" ? (
        <div className="flex flex-col w-100 bg-homepageBus">
          <Hero background={"bg-aboutBus"} title={"Analytics"} />
          <AnalyticsComponent />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-100 bg-homepageBus min-h-[calc(100vh-470px)]">
          You are not authorized to view this page
        </div>
      )}

      <Footer />
    </>
  );
}
