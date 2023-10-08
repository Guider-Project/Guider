"use client";

import NavBar from "@/components/common/navbar";
import Hero from "@/components/home/hero";
import About from "@/components/home/about";
import Footer from "@/components/common/footer";

export default function Home() {
  return (
    <>
      <NavBar active="home" />
      <Hero />
      <About />
      <Footer />
    </>
  );
}
