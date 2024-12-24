import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

const HomeListCard2 = ({ sixthProductSet }) => {
  // Ensure sixthProductSet is defined and has items before rendering
  if (!sixthProductSet || sixthProductSet.length === 0) {
    return <div>No products available.</div>; // Optional fallback UI
  }

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Best Sellers</h2>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay
        autoPlaySpeed={3000}
        centerMode={false}
        className="custom-carousel"
        containerClass="carousel-container"
        customTransition="all 0.8s ease-in-out"
        infinite
        keyBoardControl
        minimumTouchDrag={80}
        responsive={responsive}
        showDots={false}
        swipeable
      >
        {sixthProductSet.map((product, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
          >
            <Link to={`/product/${product.name}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
            </Link>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 text-sm mt-2">
                {product.description || "No description available."}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-blue-600">
                  ${product.price}
                </span>
                <Link
                  to={`/product/${product.name}`}
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HomeListCard2;
