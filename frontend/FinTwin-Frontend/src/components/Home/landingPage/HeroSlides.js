import aiImage from "../../../assets/aiImg.png";
import securityImage from "../../../assets/securityImg.png";
import bankingImage from "../../../assets/bankingImg.png";
import LoanImage from "../../../assets/loanImg.png";

const HeroSlides = [
  {
    title: "Smart Banking",
    subtitle: "Transfer funds, pay bills, and manage accounts effortlessly.",
    image: bankingImage,
    button: "Start Banking",
    route: "/banking",
  },

  {
    title: "Your Personal AI Wealth Manager",
    subtitle:
      "Analyze spending, track goals, and grow your wealth with AI-powered banking.",
    image: aiImage,
    button: "Try AI Assistant",
    route: "/aiassistant",
  },

  {
    title: "Bank-Grade Security",
    subtitle:
      "Real-time fraud detection and advanced cybersecurity protection.",
    image: securityImage,
    button: "Explore Security",
    route: "/security",
  },

  {
    title: "Investment Hub",
    subtitle:
      "Track mutual funds, FDs and investment goals from one dashboard.",
    image: LoanImage,
    button: "View Investments",
    route: "/investment",
  },
];

export default HeroSlides;
