import { motion } from "framer-motion";
import "./LoanToptext.css";

function LoanToptext() {
  return (
    <section className="loan-hero p-4 " style={{ position: "relative", overflow: "hidden", backgroundColor: "#333" }}>

      {/* Floating Blobs */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      <motion.div
        className="container text-center hero-content"
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <p className="hero-tag">
          FINANCING SOLUTIONS
        </p>

        <h1 className="hero-title">
          Empowering Every Dream,
          <br />
          One Loan at a Time.
        </h1>

        <p className="hero-desc">
          Whether you're buying your first home, pursuing higher
          education, or growing your business, our flexible loan
          solutions help you move forward with confidence.
        </p>

      </motion.div>

    </section>
  );
}

export default LoanToptext;