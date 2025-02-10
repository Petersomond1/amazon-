// src/components/FeaturedSection.js
import React from "react";
import { Link } from "react-router-dom";

const FeaturedSection = ({ fifthProductSet }) => {

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Exclusive Deals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 px-4 md:px-8">
        {fifthProductSet?.map((product, index) => (
          <div
            key={index}
            className="p-2 bg-white rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
          >
            <Link to={`/product/${product.id}/${product.name}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover rounded-t-lg"
              />
            </Link>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              {product.description && (
                <p className="text-gray-600 text-sm mt-2">
                  {product.description}
                </p>
              )}
              <div className="mt-4">
                <span className="text-blue-600 font-bold">${product.price}</span>
                <Link
                  to={`/product/${product.id}/${product.name}`}
                  className="text-sm text-blue-500 hover:text-blue-700 ml-4"
                >
                  View More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;
