import "../style/homeListCard.css";
import { Link } from "react-router-dom";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


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
  console.log("this is first carousel ", firstProductSet)
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


  return (
    <div className="slider-container m-10 border border-[2px] border-green-500 ">
      <Slider {...settings}>
        {firstProductSet?.map((item, index) => (
          <div key={index} className="relative">
            {index ==1 && console.log("here is the item ", item)}
            <img src={item.image} alt={`slide-${index}`} className="w-full z-0" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HomeHeader;