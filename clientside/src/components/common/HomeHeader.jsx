import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../styles/listCard.css";
import { Link } from "react-router-dom";
import React from "react";
import Slider from "react-slick";
// testing
import first from "../../assets/assets/banner/first.jpg";
import second from "../../assets/assets/banner/second.jpg";
import third from "../../assets/assets/banner/third.jpg";
import fourth from "../../assets/assets/banner/fourth.jpg";
import fifth from "../../assets/assets/banner/fifth.jpg";
// testing

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow custom-next`}
      style={{
        ...style,
        display: "flex", // Use flexbox to center the arrow icon
        alignItems: "center", // Vertically center the arrow
        justifyContent: "center", // Horizontally center the arrow
        background: "rgba(0, 0, 0, 0.5)", // Background color of the arrow
        borderRadius: "50%", // Makes the arrow circular
        padding: "15px", // Increase padding for height and width
        right: "15px", // Position from the right side
        top: "50%", // Vertically center the arrow
        transform: "translateY(-50%)", // Adjust for perfect centering
        zIndex: 1, // Ensure the arrow is above other elements
        cursor: "pointer", // Changes cursor to pointer on hover
        border: "2px solid transparent", // Initial transparent border
        transition: "border 0.2s ease", // Smooth transition for border change
      }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-right text-white"></i>{" "}
      {/* Icon for the arrow */}
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow custom-prev active: border-white`}
      style={{
        ...style,
        display: "flex", // Use flexbox to center the arrow icon
        alignItems: "center", // Vertically center the arrow
        justifyContent: "center", // Horizontally center the arrow
        background: "rgba(0, 0, 0, 0.5)", // Background color of the arrow
        borderRadius: "50%", // Makes the arrow circular
        padding: "15px", // Increase padding for height and width
        left: "15px", // Position from the left side
        top: "50%", // Vertically center the arrow
        transform: "translateY(-50%)", // Adjust for perfect centering
        zIndex: 1, // Ensure the arrow is above other elements
        cursor: "pointer", // Changes cursor to pointer on hover
        border: "2px solid transparent", // Initial transparent border
        transition: "border 0.2s ease", // Smooth transition for border change
      }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-left text-white"></i>{" "}
      {/* Icon for the arrow */}
    </div>
  );
}

function HomeHeader({ firstProductSet }) {
  const settings = {
    infinite: true,
    autoplay: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const data = [first, second, third, fourth, fifth];

  return (
    <div className="slider-container ">
      <Slider {...settings}>
        {data.map((image, index) => (
          <div key={index} className="relative">
            <img src={image} alt={`slide-${index}`} className="w-full z-0" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HomeHeader;