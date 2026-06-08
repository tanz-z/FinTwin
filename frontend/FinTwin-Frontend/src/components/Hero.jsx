import heroImage from "../assets/bank-hero.png";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-left">

        <h1>
          Banking That Moves
          At Your Speed
        </h1>

        <p>
          Secure transactions,
          instant transfers and
          complete control over
          your finances.
        </p>

        <div className="hero-buttons">
          <button className="register-btn" style={{ marginRight: '10px' }}>
            Open Account
          </button>
          <button className="login-btn">Login</button>
        </div>

      </div>

      <div className="hero-right">
        <img src={heroImage} alt="Banking" />
      </div>

    </section>
  );
}

export default Hero;