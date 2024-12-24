import React from "react";
import FilterSideBar from "../../components/common/FilterSideBar";
import { useQuery } from "react-query";
import { getCategoryProducts } from "../../services/productServices";
import { Link, useParams } from "react-router-dom";

const CategoryProducts = () => {
  const { name } = useParams();
  const [filters, setFilters] = React.useState({});
  const { isLoading, error, data } = useQuery({
    queryKey: ["getCategoryProducts", name],
    queryFn: () => getCategoryProducts(name),
  });

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
    // Optionally trigger refetch here based on filters
  };

  if (isLoading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">Error loading products.</p>;

  return (
    <div className="flex flex-col md:flex-row mx-auto p-6 bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="md:w-1/4 w-full md:sticky md:top-6">
        <FilterSideBar onFilterChange={handleFilterChange} />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center md:text-left">
          {name} Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((item) => (
            <Link to={`/product/${item.id}/${item.name}`}>
            <div
              key={item.id}
              className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
