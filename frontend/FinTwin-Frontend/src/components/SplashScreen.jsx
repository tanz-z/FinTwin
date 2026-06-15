import "./SplashScreen.css";
import logo from "../assets/psbnobg.png";

function SplashScreen() {
  return (
    <div className="splash-screen">

      <div className="logo-container">

        <div className="glow-circle"></div>

        <img
          src={logo}
          alt="Punjab & Sind Bank"
          className="logo"
        />

        <div className="light-sweep"></div>

      </div>

      <div className="bank-info">
        <h1>Punjab & Sind Bank</h1>
        <p>Where Service Is A Way Of Life</p>
      </div>

    </div>
  );
}

export default SplashScreen;