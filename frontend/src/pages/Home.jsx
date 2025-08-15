import React from "react";
import Events from "./Events";
import welcomeImage from "../assets/welcome2.jpg"; // replace with your image path

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-hero">
        <div className="home-welcome">
          <h1 className="home-title">
            Welcome to <span style={{color:"#9a76ff"}}>GATHERLY</span>
          </h1>
          <p className="home-desc">
            Create, manage, and explore events easily.
          </p>
        </div>

        {/* Right: Image */}
        <div className="home-image">
          <img
            src={welcomeImage}
            alt="Welcome"
          />
        </div>
      </div>

      {/* Events Section */}
      <Events />
    </div>
  );
};

export default Home;