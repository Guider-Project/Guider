import NavBar from "@/components/common/navbar";
import Footer from "@/components/common/footer";

import Hero from "@/components/common/hero";
import TrackingContent from "@/components/tracking/content";

export default function Tracking() {
  return (
    <>
      <NavBar activeTab="tracking" />
      <Hero background={"bg-trackingBus"} title={"Tracking"} />
      <TrackingContent />
      <Footer />
    </>
  );
}
