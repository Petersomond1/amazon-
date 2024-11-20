// src/components/SixthCarousel.js
import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} bg-blue-500 rounded-full`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} bg-blue-500 rounded-full`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

const SixthCarousel = ({ sixthProductSet }) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Trending Now</h2>
      <Slider {...settings}>
        {sixthProductSet?.map((product) => (
          <div
            key={product.id}
            className="p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
          >
            <Link to={`/product/${product.name}`}>
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </Link>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-blue-600 font-bold">
                  ${product.price}
                </span>
                <Link
                  to={`/product/${product.name}`}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SixthCarousel;
