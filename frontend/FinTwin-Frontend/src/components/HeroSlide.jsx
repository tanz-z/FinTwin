function HeroSlide({ slide }) {
  return (
    <div className="hero-slide">

      <div className="hero-content">

        <h1>{slide.title}</h1>

        <p>{slide.subtitle}</p>

        <button className="hero-btn">
          {slide.button}
        </button>

      </div>

      <div className="hero-image">

        <img
          src={slide.image}
          alt={slide.title}
        />

      </div>

    </div>
  );
}

export default HeroSlide;