import { motion } from "framer-motion";
import "./LoanToptext.css";


function LoanCTA() {
  return (
    <div className="container my-5 py-5">
      <motion.div
        className="text-center mx-auto p-5"
        initial={{ opacity: 0, y: 80, scale: 0.70 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{ once: true, amount: 0.3 }}
        style={{
          maxWidth: "1000px",
          background: "linear-gradient(135deg, #f8fbff, #eef5ff)",
          borderRadius: "32px",
          boxShadow: "0 12px 40px rgba(0,0,0,0.05)",
        }}
      >
        <p
          className="text-primary fw-semibold text-uppercase mb-3"
          style={{
            letterSpacing: "3px",
            fontSize: "0.9rem",
          }}
        >
          Get Started
        </p>

        <h2
          className="fw-bold mb-4"
          style={{
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            lineHeight: "1.2",
            letterSpacing: "-1px",
          }}
        >
          Let's Turn Your
          <br />
          Plans Into Reality.
        </h2>

        <p
          className="text-secondary mx-auto"
          style={{
            maxWidth: "700px",
            fontSize: "1.1rem",
            lineHeight: "1.9",
          }}
        >
          From personal loans to business financing, we make borrowing
          simple, transparent, and hassle-free.
          <br />
          Connect with our experts today and get personalized assistance
          for your financial journey.
        </p>

        <button
          className="btn btn-primary btn-lg rounded-pill mt-5 px-5 py-3"
          style={{
            fontWeight: "600",
          }}
        >
          Talk to an Advisor
        </button>
      </motion.div>
    </div>
  );
}

export default LoanCTA;