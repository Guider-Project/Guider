import NavBar from "@/components/common/navbar";
import Footer from "@/components/common/footer";

import Hero from "@/components/homepage/hero";
import About from "@/components/homepage/about";

export default function Home() {
  return (
    <>
      <NavBar />

      <div className="flex flex-col w-100">
        <Hero />
        <About />
      </div>

      <Footer />
    </>
  );
}
