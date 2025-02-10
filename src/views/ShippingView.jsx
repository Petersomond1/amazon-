import React from "react";
import { useForm } from "react-hook-form";
import { useAddShippingAddress, useCreateCheckoutSession } from "../services/cartService";
import { useSelector } from "react-redux";

const ShippingView = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const { mutateAsync: addShippingAddress } = useAddShippingAddress();
  const createCheckoutSession = useCreateCheckoutSession();
  const products = useSelector((state) => state.cart.items); // Get cart items

  const onSubmit = async (data) => {
    try {
      console.log("shiiping adress", data)
      await addShippingAddress(data); // Store shipping address
      const session = await createCheckoutSession.mutateAsync(products); // Create Stripe session
      window.location.href = session.url; // Redirect to Stripe Checkout
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Shipping Address</h1>

      {/* Shipping Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-lg space-y-6">
        {/* Full Name */}
        <div>
          <label className="text-gray-700 font-medium">Full Name</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            {...register("name", { required: "Full name is required" })} />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        </div>

        {/* Phone Number */}
        <div>
          <label className="text-gray-700 font-medium">Phone Number</label>
          <input type="tel" className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            {...register("phoneNumber", { required: "Phone number is required" })} />
          {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber.message}</span>}
        </div>

        {/* Address Fields */}
        <div>
          <label className="text-gray-700 font-medium">Street Address</label>
          <input type="text" placeholder="123 Main St" className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            {...register("street", { required: "Street address is required" })} />
          {errors.street && <span className="text-red-500">{errors.street.message}</span>}
        </div>

        <div>
          <label className="text-gray-700 font-medium">Apartment, Suite, etc. (Optional)</label>
          <input type="text" placeholder="Apt, Suite, Floor" className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            {...register("addressLine2")} />
        </div>

        {/* Country & City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-700 font-medium">Country/Region</label>
            <select {...register("country", { required: "Country is required" })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200">
              <option value="">Select a country</option>
              <option value="usa">United States</option>
              <option value="canada">Canada</option>
              <option value="uk">United Kingdom</option>
              <option value="germany">Germany</option>
              <option value="france">France</option>
            </select>
            {errors.country && <span className="text-red-500">{errors.country.message}</span>}
          </div>

          <div>
            <label className="text-gray-700 font-medium">City</label>
            <input type="text" placeholder="Enter your city" className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              {...register("city", { required: "City is required" })} />
            {errors.city && <span className="text-red-500">{errors.city.message}</span>}
          </div>
        </div>

        {/* State & ZIP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-700 font-medium">State</label>
            <select {...register("state", { required: "State is required" })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200">
              <option value="">Select a state</option>
              <option value="state1">State 1</option>
              <option value="state2">State 2</option>
            </select>
            {errors.state && <span className="text-red-500">{errors.state.message}</span>}
          </div>

          <div>
            <label className="text-gray-700 font-medium">ZIP Code</label>
            <input type="text" placeholder="ZIP Code" className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              {...register("zip", { required: "ZIP Code is required" })} />
            {errors.zip && <span className="text-red-500">{errors.zip.message}</span>}
          </div>
        </div>

        {/* Save as Default Address */}
        <div className="flex items-center">
          <input type="checkbox" id="default-address" {...register("defaultAddress")}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 rounded" />
          <label htmlFor="default-address" className="ml-2 text-gray-700">
            Make this my default address
          </label>
        </div>

        {/* Proceed Button */}
        <button type="submit" className="w-full bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition duration-300">
          Proceed to Payment
        </button>
      </form>

      {/* Order Summary Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {products.length > 0 ? (
          <ul className="space-y-4">
            {products.map((item) => (
              <li key={item.id} className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center">
                  <img src={item.image} alt={item.title} className="w-16 h-16 rounded-md object-cover mr-4" />
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default ShippingView;
