import React, { useState } from "react";
import { addItem } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchProductDetails } from "../../services/productServices";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: productData, isLoading, isError } = useFetchProductDetails(id);
  const [currentImage, setCurrentImage] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (isLoading) return <p className="text-center mt-8">Loading...</p>;
  if (isError) return <p className="text-center mt-8 text-red-500">Error loading product.</p>;

  const { name, description, price, sale_price, image, image_a, image_b, image_c, quantity_InStock, soldby } = productData;

  const images = [image, image_a, image_b, image_c];

  const handleAddToCart = () => {
    dispatch(addItem({ id, name, price }));
  };



  const handleBuy = () => {
    navigate("/cart");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Image Carousel */}
        <div className=" lg:col-span-1 flex  items-center">
        <div className="flex flex-col items-center mt-4 space-y-2">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Product Image ${index + 1}`}
                className={`w-20 h-20 object-cover border ${currentImage === index ? "border-yellow-500" : "border-gray-300"} rounded cursor-pointer`}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </div>
          <div className="w-full h-96 flex items-center justify-center border border-gray-300 rounded-md">
            <img
              src={images[currentImage]}
              alt={name}
              className="object-contain h-96"
            />
          </div>

        </div>

        {/* Product Info */}
        <div className="lg:col-span-1">
          <h1 className="text-2xl font-bold mb-4">{name}</h1>
          <p className="text-gray-700 mb-4">{description}</p>
          <p className="text-green-600 text-lg font-semibold">
            {quantity_InStock > 0 ? "In Stock" : "Out of Stock"}
          </p>
          <p className="text-gray-700 mt-2">
            Ships from and sold by <span className="text-blue-600">{soldby}</span>.
          </p>
          <hr className="my-4" />
          <p className="text-2xl font-bold text-gray-800">${price}</p>
          {sale_price > 0 && (
            <p className="text-gray-500 line-through">${sale_price}</p>
          )}
          <p className="text-gray-700 mt-4">
            Free delivery on orders over $50. Available at checkout.
          </p>
        </div>

        {/* Purchase Section */}
        <div className="lg:col-span-1 bg-gray-100 p-4 rounded-md">
          <p className="text-gray-800 font-bold text-lg">${price}</p>
          <p className="text-sm text-gray-600">+ $5.99 shipping</p>
          <button
            onClick={handleAddToCart}
            className="bg-yellow-500 text-white py-2 px-4 rounded-md w-full mt-4 hover:bg-yellow-600"
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuy}
            className="bg-orange-500 text-white py-2 px-4 rounded-md w-full mt-2 hover:bg-orange-600"
          >
            Buy Now
          </button>
          <p className="text-xs text-gray-500 mt-4">
            Secure transaction. Ships from and sold by <span className="text-blue-600">{soldby}</span>.
          </p>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Product Description</h2>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
