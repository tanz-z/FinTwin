function HeroSlide({ slide }) {
  return (
    <div className="hero-slide container">
      <div className="row align-items-center">

        <div className="hero-content col-12 col-lg-6">
          <h1>{slide.title}</h1>

          <p>{slide.subtitle}</p>

          <button className="hero-btn">
            {slide.button}
          </button>
        </div>

        <div className="hero-image col-12 col-lg-6 text-center">
          <img
            src={slide.image}
            alt={slide.title}
            className="img-fluid"
          />
        </div>

      </div>
    </div>
  );
}

export default HeroSlide;