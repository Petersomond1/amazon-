import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, clearCart, removeItem } from "../../redux/slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useAddToCart, useCreateCheckoutSession } from "../../services/cartService";
import { useOutletContext } from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const products = useSelector((state) => state.cart.items);
  const { user, loading, error, checkAuth } = useAuth();
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  //const { mutateAsync } = useAddToCart();
  const createCheckoutSession = useCreateCheckoutSession();


  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    setTotalPrice((prev) => 0);
  };

  const handleAddQuantity = (item) => {
    dispatch(addItem(item));
  };

  const handleReduceQuantity = (id) => {
    dispatch(removeItem(id));
  };

  const handleProceedToPay = () => {
    //mutateAsync({ products, user, loading });
    createCheckoutSession.mutate(products, {
      onSuccess:(data)=>{
        //we use windows location to change url to another website
        // because navigate redirect the page under the same website but cannot take you to a different  website 
       window.location.href = data.url;
      }
    })
  };

  useEffect(() => {
    let total = 0;
    products.map((item) => {
      total += item.price * item.quantity;
      return setTotalPrice(total);
    });
  }, [products]);
  return (
    <div className="w-full bg-gray-100 p-4">
      {products.length > 0 ? (
        <div className="container mx-auto h-auto grid grid-cols-5 gap-8">
          <div className="w-full bg-white px-4 col-span-4">
            <div className="font-titleFont flex items-center justify-between border-b-[1px] border-b-gray-400 py-3">
              <h2 className="text-3xl font-medium">Shopping Cart</h2>
              <h4 className="text-xl font-normal">Subtitle</h4>
            </div>
            <div>
              {products.map((item) => (
                <div
                  key={item.id}
                  className="w-full border-b-[1px] border-b-gray-300 p-4 flex items-start  gap-6"
                >
                  <div className="w-2/5">
                    <img
                      className=" h-44 object-contain"
                      src={item.image}
                      alt=""
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">{item.title}</h2>
                    <p className="pr-10 text-sm">{item.description}</p>
                    <p className="text-base">
                      Unit Price{" "}
                      <span className="font-semibold"> ${item.price}</span>
                    </p>
                    <div
                      className="bg-[#F0F2F2] flex justify-center items-center gap-1 w-24
                  py-1 text-center drop-shadow-lg rounded-md"
                    >
                      <p className="">Quantity</p>
                      <p
                        onClick={() => handleReduceQuantity(item.id)}
                        className="cursor-pointer bg-gray-200 px-1 rounded-md 
                      hover:bg-gray-400 duration-300"
                      >
                        -
                      </p>
                      <p className="">{item.quantity}</p>

                      <p
                        onClick={() => handleAddQuantity(item)}
                        className="cursor-pointer bg-gray-200 px-1 rounded-md 
                      hover:bg-gray-400 duration-300"
                      >
                        +
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="bg-red-500 w-36 py-1 rounded-lg text-white mt-2 hover:bg-red-700 active:bg-red-900 duration-300"
                    >
                      Delete Item
                    </button>
                  </div>

                  <div>
                    <p className="text-lg font-titleFont font-semibold ">
                      {item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full py-2">
              <button
                onClick={handleClearCart}
                className="px-10 py-2 bg-red-500 hover:bg-red-600 active:bg-red-500
            text-white rounded-lg font-titleFont font-semibold text-lg -tracking-wide"
              >
                Clear Cart
              </button>
            </div>
          </div>
          <div className="w-full h-full bg-white col-span-1 flex flex-col justify-start items-center p-4">
            <div>
              <p className="flex gap-2 items-start text-sm">
                <span>
                  <CheckCircleIcon className="bg-white text-green-500 rounded-full" />
                </span>
                Your order qualifies for Free Shipping choose and checkout , See
                details ...
              </p>
            </div>
            <div>
              <p className="font-semibold px-10 py1 flex items-center justify-center">
                Total:{" "}
                <span className="text-lg font-bodyFont">${totalPrice}</span>
              </p>
            </div>
            <button
              onClick={handleProceedToPay}
              className=" w-full font-titleFont font-medium text-base bg-gradient-to-tr
          from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-50
          border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400
          active:to-yellow-500 duration-200 py-1.5 rounded md mt-3"
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center gap-4 py-10">
          <div className=" ">
            {" "}
            <img
              src={
                "https://i1.wp.com/www.huratips.com/wp-content/uploads/2019/04/empty-cart.png?fit=603%2C288&ssl=1"
              }
              alt=""
            />
          </div>
          <div className=" w-96 p-4 bg-white flex flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold">
              Your Cart Is Empty !!!
            </h1>
            <p className="text-sm text-center">
              You can go to the products , select your items and get back here{" "}
            </p>
            <Link to="/all-products">
              <button
                className="mt-6 bg-yellow-400 rounded-md cursor-pointer hover:bg-yellow-500
              active:bg-yellow-700 px-8 py-2 font-titleFont font-semibold text-lg"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
