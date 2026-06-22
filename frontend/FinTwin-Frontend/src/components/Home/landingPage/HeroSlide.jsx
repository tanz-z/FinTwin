import { useNavigate } from "react-router-dom";

function HeroSlide({ slide }) {
  const navigate = useNavigate();

  return (
    <div className="hero-slide">
      <div className="hero-content">
        <h1>{slide.title}</h1>

        <p>{slide.subtitle}</p>

        <button
          className="hero-btn"
          onClick={() => navigate(slide.route)}
        >
          {slide.button}
        </button>
      </div>

      <div className="hero-image">
        <img src={slide.image} alt={slide.title} />
      </div>
    </div>
  );
}

export default HeroSlide;