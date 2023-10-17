import NavBar from "@/components/common/navbar";
import Hero from "@/components/common/hero";
import Footer from "@/components/common/footer";

import NewsContent from "@/components/news/content";

export default function News() {
  return (
    <>
      <NavBar activeTab="news" />

      <Hero background={"bg-newsBus"} title={"News"} />
      <NewsContent />

      <Footer />
    </>
  );
}
