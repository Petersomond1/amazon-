import React from "react";
import "../views/adminViews/admindashboard.css"; // Importing the CSS file for styling
import { useForm } from "react-hook-form";
import { useAddShippingAddress } from "../services/cartService";

const ShippingView = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { mutateAsync: addShippingAddress } = useAddShippingAddress();

  const onSubmit = async (data) => {
    addShippingAddress(data);
  };

  return (
    <div className="shipping-view-container">
      <div className="shipping-form">
        <h1>Enter a new shipping address</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-group">
            <label>Country/Region</label>
            <select
              {...register("country", { required: "Country is required" })}
            >
              <option value="">Select a country</option>
              <option value="usa">United States</option>
              <option value="canada">Canada</option>
              <option value="uk">United Kingdom</option>
              <option value="germany">Germany</option>
              <option value="france">France</option>
              <option value="australia">Australia</option>
              <option value="japan">Japan</option>
              <option value="india">India</option>
            </select>
            {errors.country && (
              <span className="error-message">{errors.country.message}</span>
            )}
          </div>
          <div className="form-group">
            <label>Full name (First and Last name)</label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: "Full name is required" })}
            />
            {errors.name && (
              <span className="error-message">{errors.name.message}</span>
            )}
          </div>
          <div className="form-group">
            <label>Phone number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              {...register("phoneNumber", {
                required: "Phone number is required",
              })}
            />
            {errors.phoneNumber && (
              <span className="error-message">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              placeholder="Street address or P.O. Box"
              {...register("street", {
                required: "Street address is required",
              })}
            />
            {errors.street && (
              <span className="error-message">{errors.street.message}</span>
            )}
            <input
              type="text"
              placeholder="Apt, suite, unit, building, floor, etc."
              {...register("addressLine2")}
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              placeholder="City"
              {...register("city", { required: "City is required" })}
            />
            {errors.city && (
              <span className="error-message">{errors.city.message}</span>
            )}
          </div>
          <div className="form-group half-width">
            <label>State</label>
            <select {...register("state", { required: "State is required" })}>
              <option value="">Select a state</option>
              <option value={"state1"}>State 1</option>
              <option value={"state2"}>State 2</option>
            </select>
            {errors.state && (
              <span className="error-message">{errors.state.message}</span>
            )}
          </div>
          <div className="form-group half-width">
            <label>ZIP Code</label>
            <input
              type="text"
              placeholder="ZIP Code"
              {...register("zip", { required: "ZIP Code is required" })}
            />
            {errors.zip && (
              <span className="error-message">{errors.zip.message}</span>
            )}
          </div>
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="default-address"
              {...register("defaultAddress")}
            />
            <label htmlFor="default-address">
              Make this my default address
            </label>
          </div>
          <button
            className="border bg-yellow-400 hover:bg-yellow-600 h-10 rounded-md	color-white"
            type="submit"
          >
            proceed to payment
            {/* {isLoading ? "Processing..." : "Proceed to Payment"} */}
          </button>
        </form>
      </div>
      <div className="order-summary">
        <h2>Checkout (1 item)</h2>
        <div className="summary-box">
          <div className="summary-row">
            <span>Items:</span>
            <span>--</span>
          </div>
          <div className="summary-row">
            <span>Shipping & handling:</span>
            <span>--</span>
          </div>
          <div className="summary-row">
            <span>Total before tax:</span>
            <span>--</span>
          </div>
          <div className="summary-row">
            <span>Estimated tax to be collected:</span>
            <span>--</span>
          </div>
          <div className="summary-row total">
            <strong>Order total:</strong>
            <strong>$159.99</strong>
          </div>
          <div className="summary-link">How are shipping costs calculated?</div>
        </div>
      </div>
    </div>
  );
};

export default ShippingView;