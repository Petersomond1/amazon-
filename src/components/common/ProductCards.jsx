// src/components/ProductsCards.js
import React from "react";
import "../style/homeCategories.css";
import { Link } from "react-router-dom";

const ProductsCards = ({ secondProductSet }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8 py-4">
      {secondProductSet?.map((product, index) => {
        if (index < 12)
        return (
        <div
          key={index}
          className="p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
        >
          <Link to={`/product/${product.name}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-52 object-cover rounded-t-lg"
            />
          </Link>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            {product.description && (
              <p className="text-gray-600 text-sm mt-2">{product.description}</p>
            )}
          </div>
        </div>
)
    })}
    </div>
  );
};

export default ProductsCards;
