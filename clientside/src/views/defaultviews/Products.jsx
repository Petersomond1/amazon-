import React from "react";
import ProductsSidebar from "../../components/common/ProductsSidebar";
import "../../components/style/main.css";
import { useQuery } from "react-query";
import { getCategoryProducts } from "../../services/productServices";
import { useParams } from "react-router-dom";

const Products = () => {
  const { name } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ["getCategoryProducts", name],
    queryFn: () => getCategoryProducts(name),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <div className="flex  mx-auto p-6 bg-[#E3E6E6]">
      {/* Sidebar */}
      <div className="border border-blue-500 w-96  sticky ">
        <ProductsSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">
          {name} Products
        </h1>
        <div className="space-y-10">
          {data?.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-stretch bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
              style={{ height: "350px" }} // Set a fixed height
            >
              <div className="w-full sm:w-1/3 h-full">
                <img
                  className="w-full h-full object-cover"
                  src={item.image_url}
                  alt={item.name}
                />
              </div>
              <div className="w-full sm:w-2/3 p-8 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    {item.name}
                  </h2>
                  <p className="text-xl text-indigo-600 font-medium mb-4">
                    ${item.price}
                  </p>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
