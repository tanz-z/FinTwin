import ai from "../../../assets/ai.png";
import security from "../../../assets/security.png";
import loans from "../../../assets/loans.png";
import investment from "../../../assets/investment.png";
import mobilebanking from "../../../assets/mobilebanking.png";

function FeaturedCarousel() {

  const cards = [
    { title: "AI Assistant", image: ai },
    { title: "Cyber Security", image: security },
    { title: "Instant Loans", image: loans },
    { title: "Investments", image: investment },
    { title: "Mobile Banking", image: mobilebanking }
  ];

  return (
    <section className="featured">

      <h2>Featured Services</h2>

      <div className="carousel-track">

        {[...cards, ...cards].map((card, index) => (
          <div className="carousel-card" key={index}>

            <img
              src={card.image}
              alt={card.title}
              className="card-image"
            />

            <h3>{card.title}</h3>

          </div>
        ))}

      </div>

    </section>
  );
}

export default FeaturedCarousel;