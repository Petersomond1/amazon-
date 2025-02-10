import React, { useState, useEffect } from "react";
import FilterSideBar from '../components/common/FilterSideBar'
import { Link, useParams } from "react-router-dom";
import { useGetAllProducts } from "../hooks/usePublic";

const AllProducts = () => {
  const { name } = useParams();
  const [filters, setFilters] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Controls filter modal
  const {data, isLoading, error, refetch} = useGetAllProducts()

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
    setIsFilterOpen(false); // Close filter modal automatically on mobile
  };

  useEffect(() => {
    if (!data) return;

    const applyFilters = () => {
      if (Object.keys(filters).length === 0) {
        setFilteredProducts(data);
        return;
      }

      const filtered = data.filter((item) => {
        const matchesType =
          filters.type?.length > 0 ? filters.type.includes(item.type) : true;
        const matchesSoldBy =
          filters.soldBy?.length > 0 ? filters.soldBy.includes(item.sold_by?.toLowerCase()) : true;
        const matchesPrice =
          filters.priceRange
            ? item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1]
            : true;
        const matchesSalePrice =
          filters.salePriceRange
            ? item.sale_price >= filters.salePriceRange[0] &&
              item.sale_price <= filters.salePriceRange[1]
            : true;
        const matchesReview =
          filters.review !== undefined ? parseFloat(item.ratings) >= filters.review : true;

        return matchesType && matchesSoldBy && matchesPrice && matchesSalePrice && matchesReview;
      });

      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [filters, data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <div className="flex flex-col md:flex-row mx-auto p-6 bg-gray-100 min-h-screen">
      {/* Filter Toggle Button (Visible Only on Mobile) */}
      <button
        className="md:hidden mb-6 mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md fixed bottom-5 left-5 z-50"
        onClick={() => setIsFilterOpen(true)}
      >
        Show Filters
      </button>

      {/* Sticky Filter Sidebar on Desktop */}
      {data && (

        <div className="hidden md:block md:w-1/4 sticky top-20 h-screen overflow-y-auto">
        <FilterSideBar products={data} onFilterChange={handleFilterChange} />
      </div>
      )}

      {/* Mobile Filter Modal (Sliding Sidebar) */}
      {data && isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
          <div className="w-3/4 sm:w-1/2 bg-white p-6 shadow-lg h-full flex flex-col">
            <button
              className="text-red-500 text-lg font-bold mb-4 self-end"
              onClick={() => setIsFilterOpen(false)}
            >
              Close ✖
            </button>
            <FilterSideBar products={data} onFilterChange={handleFilterChange} />
          </div>
        </div>
      )}

      {/* Product List */}
      <div className="flex-grow p-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          {name} Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts?.length > 0 ? (
            filteredProducts?.map((item) => (
              <Link key={item.id} to={`/product/${item.id}/${item.name}`}>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
                  <div className="w-full h-56">
                    <img
                      className="w-full h-full object-cover"
                      src={item.image_a}
                      alt={item.name}
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.name}
                    </h2>
                    <p className="text-lg text-indigo-600 font-medium mb-4">
                      ${item.price}
                    </p>
                    <p className="text-gray-700 line-clamp-2">{item.description}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-600 mt-8">No products match your filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
