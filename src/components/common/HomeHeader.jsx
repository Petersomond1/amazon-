import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function HomeHeader({ firstProductSet }) {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[80vh] overflow-hidden bg-gray-200">
 
      <Slide autoplay={true} duration={4000} transitionDuration={800} infinite>
        {firstProductSet.map((product) => (
          <div
            key={product.id}
            className="relative w-full h-[80vh] flex items-center justify-center bg-cover bg-center transition-all duration-700"
            style={{ backgroundImage: `url(${product.image})` }}
            >
          </div>
        ))}
      </Slide>

    </div>
  );
}

export default HomeHeader;
