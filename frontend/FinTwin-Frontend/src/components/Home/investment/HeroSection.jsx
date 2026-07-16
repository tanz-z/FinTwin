import {motion} from "framer-motion";
import "./investments.css";
import HeroImg from "../../../assets/investment-img.png"

const HeroSection = () => {
    const leftVariant = {
  hidden: {
    opacity: 0,
    x: -80,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const rightVariant = {
  hidden: {
    opacity: 0,
    x: 80,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const statsVariant = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      duration: 0.7,
    },
  },
};


  return (
    <section className="investment-hero mt-5 pt-5">
      <div className="investment-hero-container">

        <motion.div
  className="investment-left"
  variants={leftVariant}
  initial="hidden"
  animate="visible"
>

          <span className="hero-tag">
            📈 Smart Investing Starts Here
          </span>

          <h1>
            Build Your <span>Future Wealth</span> with Confidence
          </h1>

          <p>
            Discover investment opportunities tailored to your financial goals.
            Explore Mutual Funds, Fixed Deposits, SIPs, Government Schemes,
            PPF, and much more—all from one secure platform.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">
              Start Investing
            </button>

            <button className="secondary-btn">
              Explore Plans
            </button>
          </div>

          <motion.div
  className="hero-stats"
  variants={statsVariant}
  initial="hidden"
  animate="visible"
>

            <div className="stat-card">
              <h2>150+</h2>
              <p>Investment Plans</p>
            </div>

            <div className="stat-card">
              <h2>₹5 Cr+</h2>
              <p>Assets Managed</p>
            </div>

            <div className="stat-card">
              <h2>50K+</h2>
              <p>Happy Investors</p>
            </div>

          </motion.div>

        </motion.div>

        <motion.div
  className="investment-right"
  variants={rightVariant}
  initial="hidden"
  animate="visible"
>

          <div className="hero-image-wrapper">
            <img
              src={HeroImg}
              alt="Investment Illustration"
            />

           

          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default HeroSection;