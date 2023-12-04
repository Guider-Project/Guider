import NavBar from "@/components/common/navbar";
import Hero from "@/components/common/hero";
import Footer from "@/components/common/footer";

import MyBookingsComponents from "@/components/my-bookings";

export default function MyBookings() {
  return (
    <>
      <NavBar activeTab="news" />

      <Hero background={"bg-newsBus"} title={"My Bookings"} />
      <MyBookingsComponents />

      <Footer />
    </>
  );
}
