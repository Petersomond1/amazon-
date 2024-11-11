import React, { Component } from "react";
import Slider from "react-slick";
import FourthDataCard from "./FourthDataCard.jsx";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray" }}
      onClick={onClick}
    />
  );
}

const FourthView = ({ fourthProductSet }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    style: {
      display: "flex",
      paddingLeft: "10px",
      justifyContent: "center",
    },
  };

  return (
    <div className="">
      <Slider {...settings}>
        {fourthProductSet.map((item) => (
          <FourthDataCard
            key={item.id}
            descriptoin={item.descriptoin}
            name={item.name}
            image={item.image_url}
            price={item.price}
            stock={item.stock}
          />
        ))}
      </Slider>
    </div>
  );
};

export default FourthView;
