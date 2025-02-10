import React, { useState, useEffect } from "react";

const FilterSideBar = ({ products, onFilterChange }) => {
  const [filters, setFilters] = useState({
    type: [],
    soldBy: [],
    priceRange: [0, 10000], // Default price range
    salePriceRange: [0, 10000], // Default sale price range
    review: 0, // Minimum review rating
  });

  // Extract unique values for filtering
  const uniqueTypes = [...new Set(products.map((item) => item.type.toLowerCase()))];
  const uniqueSoldBy = [...new Set(products.map((item) => item.sold_by?.toLowerCase()))];

  // Handle checkboxes
  const handleCheckboxChange = (filterType, value) => {
    setFilters((prev) => {
      const updated = { ...prev };
      const isSelected = prev[filterType].includes(value);
      updated[filterType] = isSelected
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value];

      onFilterChange(updated);
      return updated;
    });
  };

  // Handle price range
  const handlePriceChange = (event) => {
    const value = Number(event.target.value);
    setFilters((prev) => {
      const updated = { ...prev, priceRange: [0, value] };
      onFilterChange(updated);
      return updated;
    });
  };

  // Handle sale price range
  const handleSalePriceChange = (event) => {
    const value = Number(event.target.value);
    setFilters((prev) => {
      const updated = { ...prev, salePriceRange: [0, value] };
      onFilterChange(updated);
      return updated;
    });
  };

  // Handle review rating filter
  const handleReviewChange = (event) => {
    const value = Number(event.target.value);
    setFilters((prev) => {
      const updated = { ...prev, review: value };
      onFilterChange(updated);
      return updated;
    });
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg space-y-6">
      
      {/* Type Filter */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700">Type</h3>
        <div className="space-y-2 mt-3">
          {uniqueTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                className="w-5 h-5 accent-blue-500"
                checked={filters.type.includes(type)}
                onChange={() => handleCheckboxChange("type", type)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Sold By Filter */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700">Sold By</h3>
        <div className="space-y-2 mt-3">
          {uniqueSoldBy.map((seller,index) => (
            <label key={index} className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                className="w-5 h-5 accent-green-500"
                checked={filters.soldBy.includes(seller)}
                onChange={() => handleCheckboxChange("soldBy", seller)}
              />
              {seller}
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700">Price Range</h3>
        <input
          type="range"
          min="0"
          max="10000"
          step="1"
          value={filters.priceRange[1]}
          className="w-full accent-blue-500 mt-3"
          onChange={handlePriceChange}
        />
        <div className="text-gray-500 mt-2">Up to ${filters.priceRange[1]}</div>
      </div>

      {/* Sale Price Range Filter */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700">Sale Price</h3>
        <input
          type="range"
          min="0"
          max="10000"
          step="1"
          value={filters.salePriceRange[1]}
          className="w-full accent-red-500 mt-3"
          onChange={handleSalePriceChange}
        />
        <div className="text-gray-500 mt-2">Up to ${filters.salePriceRange[1]}</div>
      </div>

      {/* Review Filter */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700">Minimum Reviews</h3>
        <input
          type="number"
          min="0"
          max="5"
          step="1"
          value={filters.review}
          className="w-full p-2 border rounded-md mt-3"
          onChange={handleReviewChange}
        />
        <div className="text-gray-500 mt-2">Minimum {filters.review} stars</div>
      </div>
    </div>
  );
};

export default FilterSideBar;
