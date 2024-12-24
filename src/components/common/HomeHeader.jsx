import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

function SampleNextArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="absolute top-1/2 right-5 transform -translate-y-1/2 z-10 p-3 bg-black bg-opacity-50 rounded-full cursor-pointer hover:bg-opacity-75"
    >
      <i className="fas fa-chevron-right text-white text-lg"></i>
    </div>
  );
}

function SamplePrevArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="absolute top-1/2 left-5 transform -translate-y-1/2 z-10 p-3 bg-black bg-opacity-50 rounded-full cursor-pointer hover:bg-opacity-75"
    >
      <i className="fas fa-chevron-left text-white text-lg"></i>
    </div>
  );
}

function HomeHeader({ firstProductSet }) {
  return (
    <div className="relative w-full h-[70vh] overflow-hidden bg-gray-200">
      <SamplePrevArrow onClick={() => document.querySelector('.react-slideshow-container .back').click()} />
      <Slide>
        {firstProductSet.map((product) => (
          <div
            key={product.id}
            className="w-full h-[70vh] flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${product.image})` }}
          ></div>
        ))}
      </Slide>
      <SampleNextArrow onClick={() => document.querySelector('.react-slideshow-container .next').click()} />
    </div>
  );
}

export default HomeHeader;
