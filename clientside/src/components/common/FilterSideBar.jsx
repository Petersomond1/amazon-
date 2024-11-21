import React, { useState } from "react";

const FilterSideBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    brand: [],
    provider: [],
    availability: false,
    worldwideShipping: false,
    priceRange: [0, 100],
  });

  const handleCheckboxChange = (filterType, value) => {
    setFilters((prev) => {
      const updated = { ...prev };
      if (filterType === "availability" || filterType === "worldwideShipping") {
        updated[filterType] = !prev[filterType];
      } else {
        const isSelected = prev[filterType].includes(value);
        updated[filterType] = isSelected
          ? prev[filterType].filter((item) => item !== value)
          : [...prev[filterType], value];
      }
      onFilterChange(updated);
      return updated;
    });
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setFilters((prev) => {
      const updated = { ...prev, priceRange: [0, value] };
      onFilterChange(updated);
      return updated;
    });
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg space-y-8">
      {/* Brand Filter */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700">Brand</h3>
        <div className="space-y-2 mt-3">
          {["Amazon Basics", "Brand X", "Brand Y"].map((brand) => (
            <label key={brand} className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                className="w-5 h-5 accent-blue-500"
                checked={filters.brand.includes(brand)}
                onChange={() => handleCheckboxChange("brand", brand)}
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* Provider Filter */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700">Provider</h3>
        <div className="space-y-2 mt-3">
          {["Amazon", "Other Provider"].map((provider) => (
            <label
              key={provider}
              className="flex items-center gap-2 text-gray-600"
            >
              <input
                type="checkbox"
                className="w-5 h-5 accent-green-500"
                checked={filters.provider.includes(provider)}
                onChange={() => handleCheckboxChange("provider", provider)}
              />
              {provider}
            </label>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700">Availability</h3>
        <label className="flex items-center gap-2 text-gray-600 mt-3">
          <input
            type="checkbox"
            className="w-5 h-5 accent-red-500"
            checked={filters.availability}
            onChange={() => handleCheckboxChange("availability")}
          />
          In Stock Only
        </label>
      </div>

      {/* Worldwide Shipping Filter */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700">
          Worldwide Shipping
        </h3>
        <label className="flex items-center gap-2 text-gray-600 mt-3">
          <input
            type="checkbox"
            className="w-5 h-5 accent-purple-500"
            checked={filters.worldwideShipping}
            onChange={() => handleCheckboxChange("worldwideShipping")}
          />
          Available
        </label>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700">Price Range</h3>
        <input
          type="range"
          min="0"
          max="500"
          step="1"
          value={filters.priceRange[1]}
          className="w-full accent-blue-500 mt-3"
          onChange={handlePriceChange}
        />
        <div className="text-gray-500 mt-2">
          Up to ${filters.priceRange[1]}
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
