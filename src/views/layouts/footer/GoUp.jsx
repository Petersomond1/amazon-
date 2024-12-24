import React from "react";
import "./footer.css";

const GoUp = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="goup">
      <span className="thebtn" onClick={scrollToTop}>
        Go to the top
      </span>
    </div>
  );
};

export default GoUp;