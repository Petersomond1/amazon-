import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, clearCart, removeItem } from "../../redux/slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const products = useSelector((state) => state.cart.items);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    setTotalPrice(0);
  };

  const handleAddQuantity = (item) => {
    dispatch(addItem(item));
  };

  const handleReduceQuantity = (id) => {
    dispatch(removeItem(id));
  };

  const handleProceedToShipping = () => {
    if (!user) {
      return navigate("/login");
    }
    navigate("/shipping"); // Redirect to the shipping page first
  };

  useEffect(() => {
    let total = 0;
    products.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  }, [products, user]);

  return (
    <div className="w-full bg-gray-100 py-8 px-4">
      {products.length > 0 ? (
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">Shopping Cart</h2>

            <div className="mt-6 space-y-6">
              {products.map((item) => (
                <div key={item.id} className="flex flex-col md:flex-row gap-6 border-b pb-4">
                  {/* Product Image */}
                  <div className="w-full md:w-1/4">
                    <img className="w-full h-36 object-cover rounded-lg" src={item.image} alt={item.title} />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-gray-800 font-bold mt-2">Price: ${item.price}</p>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => handleReduceQuantity(item.id)}
                        className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                      >
                        <FaMinus className="text-gray-700" />
                      </button>
                      <p className="font-semibold">{item.quantity}</p>
                      <button
                        onClick={() => handleAddQuantity(item)}
                        className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                      >
                        <FaPlus className="text-gray-700" />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg self-start hover:bg-red-700 transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            {/* Clear Cart Button */}
            <div className="mt-6">
              <button
                onClick={handleClearCart}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition w-full md:w-auto"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 text-green-600">
              <FaCheckCircle className="text-xl" />
              <p>Your order qualifies for Free Shipping on orders over $50!</p>
            </div>

            <hr className="my-4" />

            <div className="text-lg font-semibold">
              <p className="flex justify-between">
                <span>Subtotal:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </p>
              <p className="flex justify-between text-gray-600 text-sm">
                <span>Estimated Tax:</span>
                <span>$5.99</span>
              </p>
              <p className="flex justify-between text-gray-900 mt-2 text-xl">
                <span>Total:</span>
                <span>${(totalPrice + 5.99).toFixed(2)}</span>
              </p>
            </div>

            <button
              onClick={handleProceedToShipping}
              className="w-full bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition mt-4"
            >
              Proceed to Shipping
            </button>
          </div>
        </div>
      ) : (
        // Empty Cart Display
        <div className="flex flex-col items-center justify-center gap-4 py-16">
          <img
            src="https://i1.wp.com/www.huratips.com/wp-content/uploads/2019/04/empty-cart.png?fit=603%2C288&ssl=1"
            alt="Empty Cart"
            className="w-72"
          />
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
            <p className="text-gray-600 mt-2">Browse products and add items to your cart!</p>
            <Link to="/all-products">
              <button className="mt-6 bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400">
                Cart is empty
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
