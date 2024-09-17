import "../style/productDetails.css";
import React, { useState } from "react";
import "../../assets/data.json";
import VerticalCarousel from "../../components/common/VerticalCarousel.jsx";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import imag from "../../assets/images/326adee0c0ab562d6d5b3ce0d4503ea8.jpg";
import { useForm, Controller } from "react-hook-form";
import api from "../../services/apiConfig.js";

const ProductDetail = () => {
  const [quantity, setQuantiy] = useState("");
  const [buttonType, setButtonType] = useState("");
  const { register, control, handleSubmit, formState: errors } = useForm();

  const handleChange = (event) => {
    setQuantiy(event.target.value);
  };

  const onSubmit = async (data) => {
    data.id = 13;
    if (buttonType === "cart") {
      try {
        const result = await api.post("/cart/", data);
      } catch (error) {
        console.log("issue while adding to cart", error);
      }
    } else {
      try {
        // const result = await api.post("/order");
      } catch (error) {
        console.log("issue while adding to buy", error);
      }
    }
  };

  return (
    <div className="product-detail-container">
      <div className="left-container">
        <div className="vertical-images">here</div>
        <img src={imag} alt="it should be an image" className="left-image" />
      </div>
      <div className="middle-container">
        <div className="upper-div">
          <p className="details-title">
            Corsair K70 RGB PRO Wired Mechanical Gaming Keyboard (Cherry MX RGB
            Red Switches: Linear and Fast, 8,000Hz Hyper-Polling, PBT
            Double-Shot PRO Keycaps, Soft-Touch Palm Rest) QWERTY, NA - Black
          </p>
          <p>
            Visit the Corsair Store <br />
            4.6 4.6 out of 5 stars 6,093 ratings | Search this page
            <br />
            1K+ bought in past month
          </p>
        </div>
        <div className="under-upper-div">
          <p>
            <strong style={{ fontSize: "22px" }}>price 229$</strong>
          </p>
          <p>description</p>
          <div className="list">
            <span>some suf</span>
            <span>another stuf</span>
            <span>another other stuff</span>
          </div>
        </div>
        <div className="after-lower-div">
          <p>dra chniya</p>
          <div className="span-div">
            <span className="hedhi-span">first </span>
            <span className="hedhi-span">Second </span>
            <span className="hedhi-span">Third </span>
          </div>
          <p>This should be another data here in this form </p>
          <p>
            here it would be better if i add the design for the resting features
            that mimic amazon{" "}
          </p>
          <p className="first-zones">zones </p>
          <p className="first-zones">zones </p>
          <p className="">different zones </p>
        </div>
        <div className="lower-div"></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="right-container">
          <h2>price</h2>
          <italic>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sit
          </italic>
          <p>deliver to tunis</p>
          <strong>only 1 item left in stock</strong>

          <div className="three-btn">
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
              <InputLabel id="demo-select-small-label">Quantity</InputLabel>
              <Controller
                name="quantity"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    {...field}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
            <div className="detail-page-buttons">
              <button
                className="detail-btn first"
                type="submit"
                onClick={() => setButtonType("cart")}
              >
                add to cart
              </button>
              <button
                className="detail-btn second"
                type="submit"
                onClick={() => setButtonType("buy")}
              >
                buy now
              </button>
            </div>
          </div>
          <p>ships from</p>
          <p>ships to</p>
          <button className="detail-btn ">click here</button>
        </div>
      </form>
    </div>
  );
};

export default ProductDetail;
