import NavBar from "@/components/common/navbar";
import Hero from "@/components/common/hero";
import Footer from "@/components/common/footer";

import ComplainsContent from "@/components/complains/content";

export default function Complains() {
  return (
    <>
      <NavBar activeTab="complains" />

      <Hero background={"bg-complainsBus"} title={"Complains & Inquiries"} />
      <ComplainsContent />

      <Footer />
    </>
  );
}
