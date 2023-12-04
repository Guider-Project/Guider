import NavBar from "@/components/common/navbar";
import Footer from "@/components/common/footer";

import Hero from "@/components/common/hero";
import Tracking from "@/components/tracking";

export default function TrackingPage() {
  return (
    <>
      <NavBar activeTab="tracking" />
      <Hero background={"bg-trackingBus"} title={"Tracking"} />
      <Tracking />
      <Footer />
    </>
  );
}
