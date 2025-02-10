import React, { useState } from "react";
import { addItem } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchProductDetails } from "../../services/productServices";
import { FaShoppingCart, FaCheckCircle, FaTruck, FaStar } from "react-icons/fa";
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useAuth } from "../../context/AuthContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: productData, isLoading, isError } = useFetchProductDetails(id);
  const { user } = useAuth();
  const [currentImage, setCurrentImage] = useState(0);
  const [userRating, setUserRating] = useState(0);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (isLoading) return <p className="text-center mt-8">Loading...</p>;
  if (isError) return <p className="text-center mt-8 text-red-500">Error loading product.</p>;

  const { name, description, price, sale_price, image, image_a, image_b, image_c, quantity_InStock, soldby, ratings, reviews: totalReviews } = productData;
  const images = [image, image_a, image_b, image_c];

  const handleAddToCart = () => {
    dispatch(addItem({ id, name, price, image, quantity: 1 }));
  };

  const handleBuy = () => {
    dispatch(addItem({ id, name, price, image, quantity: 1 }));
    navigate("/cart");
  };

  const handleStarClick = (rating) => {
    setUserRating(rating);
  };

  // Dummy featured products for carousel
  const featuredProducts = [
    { id: 1, name: "Samsung Galaxy S23", price: 999.99, image: "/images/s23.jpg" },
    { id: 2, name: "MacBook Pro M3", price: 2199.99, image: "/images/macbook.jpg" },
    { id: 3, name: "Sony WH-1000XM5", price: 399.99, image: "/images/sony_headphones.jpg" },
    { id: 4, name: "iPad Pro 12.9", price: 1199.99, image: "/images/ipad.jpg" },
  ];

  // Slick Carousel Settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="container mx-auto px-6 py-8 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Image Section */}
        <div className="lg:col-span-1 flex flex-col items-center">
          <div className="w-full h-96 flex items-center justify-center border border-gray-300 rounded-lg overflow-hidden shadow-lg">
            <img src={images[currentImage]} alt={name} className="object-cover h-full w-full transition-transform transform hover:scale-110" />
          </div>
          <div className="flex space-x-3 mt-4">
            {images.map((img, index) => (
              img && (
                <img
                  key={index}
                  src={img}
                  alt={`Product ${index + 1}`}
                  className={`w-20 h-20 object-cover border-2 rounded-lg cursor-pointer transition duration-300 ${
                    currentImage === index ? "border-yellow-500 shadow-lg scale-110" : "border-gray-300"
                  }`}
                  onClick={() => setCurrentImage(index)}
                />
              )
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:col-span-1">
          <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
          <p className="text-gray-700 text-lg mt-3">{description}</p>

          {/* Ratings & Reviews */}
          <div className="flex items-center mt-2">
            <span className="text-yellow-500 text-lg font-bold">{ratings} ★</span>
            <span className="text-gray-600 ml-2">({totalReviews} reviews)</span>
          </div>

          {/* Stock & Seller Info */}
          <p className="text-lg font-semibold mt-3">
            {quantity_InStock > 0 ? (
              <span className="text-green-600 flex items-center"><FaCheckCircle className="mr-1" /> In Stock</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </p>
          <p className="text-gray-600 mt-1">Sold by <span className="text-blue-600">{soldby}</span></p>

          {/* Pricing */}
          <div className="mt-4">
            <p className="text-3xl font-bold text-gray-900">${price}</p>
            {sale_price > 0 && <p className="text-gray-500 line-through">${sale_price}</p>}
          </div>

          <div className="flex items-center mt-3 text-gray-700">
            <FaTruck className="mr-2" />
            Free delivery on orders over $50. Estimated 3-5 days.
          </div>
        </div>

        {/* Purchase Section */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
          <button onClick={handleAddToCart} className="bg-yellow-500 text-white py-3 px-6 rounded-lg w-full mt-5 text-lg flex items-center justify-center hover:bg-yellow-600 transition">
            <FaShoppingCart className="mr-2" />
            Add to Cart
          </button>

          <button onClick={handleBuy} className="bg-orange-500 text-white py-3 px-6 rounded-lg w-full mt-3 text-lg flex items-center justify-center hover:bg-orange-600 transition">
            Buy Now
          </button>
        </div>
      </div>

      {/* User Review Section */}
      {user && (
        <div className="mt-10 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`text-3xl cursor-pointer ${
                  userRating >= star ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => handleStarClick(star)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Featured Products Carousel */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <Slider {...sliderSettings}>
          {featuredProducts.map((product) => (
            <div key={product.id} className="p-4 bg-white shadow-md rounded-lg">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-gray-700">${product.price}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductDetails;
