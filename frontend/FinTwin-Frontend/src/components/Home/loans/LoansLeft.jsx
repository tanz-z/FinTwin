import { motion } from "framer-motion";

function LoansLeft({ image, title, description }) {
  return (
    <motion.div
      className="container py-5 my-5"
      initial={{ opacity: 0, y: 70, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="row align-items-center gx-5">

        <div className="col-lg-6 loan-image text-center">
          <img
            src={image}
            alt="Loan"
            className="img-fluid loan-image"
            style={{
              width: "290px",
              maxWidth: "100%",
            }}
          />
        </div>

        <div className="col-lg-6">
          <h2
            className="fw-bold mb-4"
            style={{
              fontSize: "2.2rem",
              lineHeight: "1.3",
              letterSpacing: "-1px",
            }}
          >
            {title}
          </h2>

          <p
            className="text-secondary"
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.9",
            }}
          >
            {description}
          </p>
        </div>

      </div>
    </motion.div>
  );
}

export default LoansLeft;