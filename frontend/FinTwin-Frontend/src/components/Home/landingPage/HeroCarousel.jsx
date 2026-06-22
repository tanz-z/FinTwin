import { useState, useEffect } from "react"; 
import HeroSlides from "./HeroSlides"; 
import HeroSlide from "./HeroSlide"; 
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../../../styles/heroCarousel.css";

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0
        ? HeroSlides.length - 1
        : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === HeroSlides.length - 1
        ? 0
        : prev + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrent((prev) =>
          prev === HeroSlides.length - 1
            ? 0
            : prev + 1
        );

        setFade(true);
      }, 600);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-carousel">

      {/* LEFT ARROW */}
      <div
        className="arrow left-arrow"
        onClick={prevSlide}
      >
        <FaChevronLeft />
      </div>

      {/* CURRENT SLIDE */}
      <div className={fade ? "slide-show" : "slide-hide"}>
        <HeroSlide
          key={current}
          slide={HeroSlides[current]}
        />
      </div>

      {/* RIGHT ARROW */}
      <div
        className="arrow right-arrow"
        onClick={nextSlide}
      >
        <FaChevronRight />
      </div>

      {/* DOTS */}
      <div className="dots">
        {HeroSlides.map((_, index) => (
          <span
            key={index}
            className={
              current === index
                ? "dot active-dot"
                : "dot"
            }
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>

    </section>
  );
}

export default HeroCarousel;