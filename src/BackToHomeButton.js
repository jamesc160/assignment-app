import React from "react";
import { Link } from "react-router-dom";
import "./BackToHomeButton.css";

const BackToHomeButton = () => {
  return (
    <Link to="/">
      <button className="back-to-home-button">Back to Home Page</button>
    </Link>
  );
};

export default BackToHomeButton;
