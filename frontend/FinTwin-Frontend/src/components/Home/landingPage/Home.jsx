import HeroCarousel from "./HeroCarousel";
import FeaturedCarousel from "./FeaturedCarousel";
import ScrollToTop from "./ScrollToTop";
import Features from "./Features";

function Home() {
  return (
    <>
      <ScrollToTop />

      <HeroCarousel />
      <FeaturedCarousel />
      <Features />
    </>
  );
}

export default Home;