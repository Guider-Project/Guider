import NavBar from "@/components/common/navbar";
import Hero from "@/components/common/hero";
import Footer from "@/components/common/footer";

import PrivacyContent from "@/components/privacy/content";

export default function Privacy() {
  return (
    <>
      <NavBar activeTab="privacy" />

      <Hero background={"bg-privacyBus"} title={"Privacy"} />
      <PrivacyContent />

      <Footer />
    </>
  );
}
