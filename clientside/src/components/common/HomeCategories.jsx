import React from "react";
import { Link } from "react-router-dom";

const HomeCategories = ({ categories }) => {
  return (
    <div className=" container mx-auto p-6 w-full rounded-lg ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories?.map((category, index) => {
          if (index < 8)
            return (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transform transition-transform hover:scale-105"
                style={{
                  width: "100%", // Make cards stretch to match parent width
                  height: "450px", // Larger height for cards
                }}
              >
                <Link to={`/category/${category.name}`}>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-2/3 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800">{category.name}</h3>
                  <Link
                    to={`/category/${category.name}`}
                    className="mt-3 inline-block text-base font-medium text-blue-600 hover:text-blue-700"
                  >
                    See more
                  </Link>
                </div>
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default HomeCategories;
