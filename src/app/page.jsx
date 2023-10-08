"use client";

import NavBar from "@/components/common/navbar";
import Hero from "@/components/home/hero";

export default function Home() {
  return (
    <>
      <NavBar active="home" />
      <Hero />
    </>
  );
}
