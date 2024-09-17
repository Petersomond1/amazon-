import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { usePayStripe } from "../services/payment.js";
import api from "../services/apiConfig.js";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice.js";

const Checkout = ({ totalAmount }) => {
  const products = useSelector((state) => state.cart.items);
  const stripe = useStripe();
  const elements = useElements();
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { mutateAsync: payToStripe, isLoading } = usePayStripe();

  const onSubmit = async () => {
    if (!stripe || !elements) {
      console.error("Stripe or Elements is not initialized");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      console.error("CardElement is not found");
      return;
    }

    try {
      const paymentIntent = await payToStripe({
        products,
        amount: totalAmount,
      });
      const { clientSecret } = paymentIntent;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: "Customer Name",
          },
        },
      });

      const saveToDB = await api.post("/payment/addRecord", result);
      dispatch(clearCart());
      navigate("/");

      if (result.error) {
        console.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        console.log("Payment successful!");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <div className="flex justify-center items-center py-12 bg-gray-100 min-h-screen">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Secure Checkout</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <CardElement className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none" />
          {errors.card && (
            <p className="text-red-600 text-sm mt-1">
              Card details are required
            </p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md shadow-lg transition-all duration-200"
          >
            {isLoading ? "Processing..." : `Pay Now $${totalAmount}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
