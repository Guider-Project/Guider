import NavBar from "@/components/common/navbar";
import Hero from "@/components/common/hero";
import Footer from "@/components/common/footer";

import AboutContent from "@/components/about/content";

export default function About() {
  return (
    <>
      <NavBar activeTab="about" />

      <Hero background={"bg-aboutBus"} title={"About us"} />
      <AboutContent />

      <Footer />
    </>
  );
}
