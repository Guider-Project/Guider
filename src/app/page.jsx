import NavBar from "@/components/common/navbar";
import Footer from "@/components/common/footer";

import Hero from "@/components/homepage/hero";
import Travels from "@/components/homepage/travels";
import About from "@/components/homepage/about";

export default function Home() {
  return (
    <>
      <NavBar activeTab="home" />

      <div className="flex flex-col w-100 bg-homepageBus">
        <Hero />
        <Travels />
        <About />
      </div>

      <Footer />
    </>
  );
}
