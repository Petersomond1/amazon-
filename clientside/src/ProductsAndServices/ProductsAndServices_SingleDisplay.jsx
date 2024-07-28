import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./productsandservices_singledisplay.css";
import UseFetchProducts from "./useFetchProducts.js";
// import { CartContext } from "./CartContext";
import { useTranslation } from "react-i18next";
import { TbReplace } from "react-icons/tb";
import { CiLocationOn } from "react-icons/ci";

const ProductsAndServices_SingleDisplay = () => {
  const { id } = useParams();
  const { data, isLoading, error } = UseFetchProducts();
  const { addToCart, cart } = useContext(CartContext);
  const { t } = useTranslation();

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 2);
      return newDate;
    });
  }, []);

  useEffect(() => {
    const months = [
      t("months.january"),
      t("months.february"),
      t("months.march"),
      t("months.april"),
      t("months.may"),
      t("months.june"),
      t("months.july"),
      t("months.august"),
      t("months.september"),
      t("months.october"),
      t("months.november"),
      t("months.december"),
    ];

    const daysOfWeek = [
      t("days.sunday"),
      t("days.monday"),
      t("days.tuesday"),
      t("days.wednesday"),
      t("days.thursday"),
      t("days.friday"),
      t("days.saturday"),
    ];

    const dayIndex = currentDate.getDay();
    const dayName = daysOfWeek[dayIndex];
    const dayOfMonth = currentDate.getDate();
    const monthIndex = currentDate.getMonth();
    const monthName = months[monthIndex];

    const formatDate = `${dayName}.${dayOfMonth}.${monthName}`;
    const dateElements = document.querySelectorAll(".date");
    dateElements.forEach((element) => {
      element.textContent = formatDate;
    });
  }, [currentDate, t]);

  if (isLoading) return <div style={{ color: "black" }}>Loading...</div>;
  if (error)
    return (
      <div style={{ color: "black" }}>An error occurred: {error.message}</div>
    );
  if (!data) return <div style={{ color: "black" }}>Product not found</div>;

  const products = data[0][0];
  const product = products.find((product) => product.id === Number(id));
  if (!product) return <div style={{ color: "black" }}>Product not found</div>;

  const cartProduct = cart.find((cartItem) => cartItem.id === product?.id);

//   const image1 = "https://m.media-amazon.com/images/I/61wQb8IB8UL._AC_SL1500_.jpg";
//   const image2 = "https://m.media-amazon.com/images/I/71b9BqHWlhL._AC_SL1500_.jpg";
//   const image3 = "https://m.media-amazon.com/images/I/61DSBjXuluL._AC_SL1500_.jpg";
//   const image4 = "https://m.media-amazon.com/images/I/61SmdvU7NDL._AC_SL1500_.jpg";
//   const image5 = "https://m.media-amazon.com/images/S/vse-vms-transcoding-artifact-us-east-1-prod/v2/af951231-c5aa-548d-8ec3-0f55ff82a632/ShortForm-Generic-480p-16-9-1409173089793-rpcbe5.mp4";

// -or-

const image1 = "https://m.media-amazon.com/images/I/A1ZSgQ2riAL._SX679_.jpg";
const image2 = "https://m.media-amazon.com/images/I/81Kkw39-qkL._AC_UY218_.jpg";
const image3 = "https://m.media-amazon.com/images/I/91GysfwgziL._SX679_.jpg";
const image4 = "https://m.media-amazon.com/images/I/412hWogQHAS.jpg";
const image5 = "https://m.media-amazon.com/images/I/51tJgJvnxVL.jpg";



  const handleImageChange = (image) => {
    const mainImage = document.querySelector(".mainImage");
    mainImage.src = image;



const imgElement = document.querySelector(".miniImg")

if(imgElement){
    const src = imgElement.getAttribute("src");
}




  };

  const seemore = () => {
    const specifications = document.querySelector(".specifications");
    const seemoreText = document.querySelector(".seemoreText");

    if (specifications.style.height !== "245px") {
      specifications.style.height = "245px";
      seemoreText.innerText = "See less";
    } else {
      specifications.style.height = "160px";
      seemoreText.innerText = "See more";
    }
  };

  const AddToCart = async (event) => {
    event.preventDefault();
    try {
      await addToCart(product);
    } catch (error) {
      console.error("An error occurred while adding to cart:", error);
    }
  };


  const handleInc = async (event) => {
    event.preventDefault();
    try {
      const currentQuantity = cartProduct ? cartProduct.quantity_in_stock : 0;
      console.log("Current cartProduct:", cartProduct);
      console.log("Current quantity before increment:", currentQuantity);
      await updateQuantityInCart(product.id, currentQuantity + 1);
    } catch (error) {
      console.error("An error occurred while increasing quantity:", error);
    }
  };




  const handleDec = async (event) => {
    event.preventDefault();
    try {
      const currentQuantity = cartProduct ? cartProduct.quantity_in_stock : 0;
      console.log("Current cartProduct:", cartProduct);
      console.log("Current quantity before decrement:", currentQuantity);
      if (currentQuantity > 1) {
        await updateQuantityInCart(product.id, currentQuantity - 1);
      }
    } catch (error) {
      console.error("An error occurred while decreasing quantity:", error);
    }
  };

  const handleQuantityChange = (event) => {
    const quantity = parseInt(event.target.value);
    // Handle quantity change logic here
  };



  return (
    <>
      <div key={product.id} className="product_main_container">
        <div className="productOne">
          <div className="productImageContainer">
            <div className="mainImageContainer">
              <img className="mainImage" src={product.image} alt="" />
            </div>
            <div className="miniImageContainer">
              <div
                className="miniImage boxShadow_1"
                onClick={() => handleImageChange(image1)}
                onMouseOver={() => handleImageChange(image1)}
              >
                <img
                  className="mini_image1 miniImg"
                  src={image1}
                  alt=""
                />
              </div>
              <div
                className="miniImage boxShadow_2"
                onClick={() => handleImageChange(image2)}
                onMouseOver={() => handleImageChange(image2)}
              >
                <img
                  className="mini_image2 miniImg"
                  src={image2}
                  alt=""
                />
              </div>
              <div
                className="miniImage boxShadow_3"
                onClick={() => handleImageChange(image3)}
                onMouseOver={() => handleImageChange(image3)}
              >
                <img
                  className="mini_image3 miniImg"
                  src={image3}
                  alt=""
                />
              </div>
              <div
                className="miniImage boxShadow_4"
                onClick={() => handleImageChange(image4)}
                onMouseOver={() => handleImageChange(image4)}
              >
                <img
                  className="mini_image4 miniImg"
                  src={image4}
                  alt=""
                />
              </div>
              <div
                className="miniImage boxShadow_5"
                onClick={() => handleImageChange(image5)}
                onMouseOver={() => handleImageChange(image5)}
              >
                <video
                  controls
                  className="mini_image5 miniImg"
                  src={image5}
                  alt=""
                />
              </div>
            </div>
          </div>

     
<div className="productDetailsContainer">
                  <div className="productName">{product.name}</div>
                  <span className="productStore">Visit the Zoye Chen Store</span>
               
                <div className="productDescription">{product.description}</div>

                <div className="productRatingSection">
                    <span className="productRatingPoints">4.8</span>
                    <span className="productRatingStars"></span>
                    <span className="productArrowIcon"></span>
                    <span className="productRatingNumbers">89 ratings</span>
                </div>
                <hr />
                <div className="productPriceSection">
                    <div className="productPricebox">
                    <span className="productDiscount">-55%</span>
                    <span className="productPriceSymbol">$</span>
                    <span className="productPrice">45.99</span>
                    </div>
                    <div className="productMrp">
                    M.R.P.: <span> $999</span>
                    </div>
                    <div className="taxes">Inclusive of all taxes</div>
                </div>
                <hr />
                <div className="offers">
                    <div className="offersHeading">
                    <span className="offersIcon"></span>
                    <span className="offersText">Offers</span>
                    </div>
                    <div className="offerBoxContainer">
                    <div className="offerBox">
                        <span className="offerType">Bank Offer</span>
                        <p>Upto $250.00 discount on SBI cr_</p>
                    </div>
                    <div className="offerBox">
                        <span className="offerType">Partner Offers</span>
                        <p>Get invoice and save up to 28% on_</p>
                    </div>
                    </div>
                </div>
                <hr />
                <div className="services">
                    <div className="replacementContainer serviceDivs">
                    <img
                        className="servicesIcons"
                        src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-returns._CB"
                        alt=""
                    />
                    <TbReplace />
                    <span className="replacement serviceText">
                        7 Days Replacement (Return & Exchange) Policy
                    </span>
                    </div>
                    <div className="freeDeliveredByContainer serviceDivs">
                    <img
                        className="servicesIcons"
                        src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/trust_icon_free_shipping_81px"
                        alt=""
                    />
                    <span className="freeDelivery serviceText">Amazon Delivered</span>
                    </div>
                    <div className="deliveredByContainer serviceDivs">
                    <img
                        className="servicesIcons"
                        src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-amazon-delivered"
                        alt=""
                    />
                    <TbReplace />
                    <span className="deliveredBy serviceText">Free Delivery</span>
                    </div>
                    <div className="brandTypeContainer serviceDivs">
                    <img
                        src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-top-brand"
                        alt=""
                    />
                    <span className="brandType serviceText">Top Brand</span>
                    </div>
                </div>
                <hr />
                <div className="specifications">
                    <tbody className="brand">
                    <tr className="specsTitle">Brand</tr>
                    <td className="specs">product-brand</td>
                    </tbody>
                    <tbody className="brand">
                    <tr className="specsTitle">Colour</tr>
                    <td className="specs">Grey</td>
                    </tbody>
                    <tbody className="brand">
                    <tr className="specsTitle">Material</tr>
                    <td className="specs">Polyester</td>
                    </tbody>
                    <tbody className="brand">
                    <tr className="specsTitle">Product Dimensions</tr>
                    <td className="specs">150L by 120W centimenters</td>
                    </tbody>
                    <tbody className="brand">
                    <tr className="specsTitle">Opacity</tr>
                    <td className="specs">Sheer</td>
                    </tbody>
                    <tbody className="brand">
                    <tr className="specsTitle">Special Feature</tr>
                    <td className="specs">Blackout Eyelet</td>
                    </tbody>
                    <tbody className="brand">
                    <tr className="specsTitle">Room Type</tr>
                    <td className="specs">Living Room</td>
                    </tbody>
                    <tbody className="brand">
                    <tr className="specsTitle">Style</tr>
                    <td className="specs">Contemporary</td>
                    </tbody>
                    <tbody className="brand">
                    <tr className="specsTitle">Pattern</tr>
                    <td className="specs">striped</td>
                    </tbody>
                    <tbody className="brand">
                    <tr className="specsTitle">Theme</tr>
                    <td className="specs">Art</td>
                    </tbody>
                </div>
                <div className="seemore" onClick={seemore}>
                    <span className="seemoreIcon"></span>
                    <span className="seemoreText">See more</span>
                </div>
                <hr />
                <div className="aboutThisItem">
                    <div className="aboutThisItemHeading">About this item</div>
                    <ul>
                    <li>
                        Durable and Breathable Upper: The upper of the hiking shoes is
                        made of leather and breathable knitted mesh fabric, super soft,
                        comfortable and durable, with good breathability.
                    </li>
                    <li>
                        Comfortable and Soft Inner: The inner of these trekking shoes is
                        soft and comfortable. The lightweight cushioning EVA midsole
                        combined with the elastic insole ensures comfort on any terrain
                        and relieves foot fatigue during long-term hiking.
                    </li>
                    <li>
                        Protective and Supportive: The running sneakers provide multiple
                        protection, the protective toe cap and supportive heel
                        effectively protect your feet from bumps and sprains and make
                        your steps safer
                    </li>
                    <li>
                        Non-Slip Outsole: The sole is made of multiple MD+RB materials
                        with non-slip particles, the wear-resistant rubber outsole is
                        equipped with scientifically distributed anti-slip studs, and
                        the cushioning midsole reduces foot pressure. You can walk
                        comfortably even on bumpy or wet road
                    </li>
                    <li>
                        Ideal for all seasons: OutPro hiking shoes are very suitable for
                        all seasons, no matter spring, summer, autumn or winter. They
                        are great for indoor and outdoor activities such as hiking,
                        walking, rocky trails, backpacking, traveling. Mountaineering,
                        camping, climbing, running, also good for everyday wear
                    </li>
                    </ul>
                    <hr />
                    <div className="report">
                    <span className="reportIcon"></span>
                    <span className="reportText">
                        Report incorrect product information
                    </span>
                    </div>
                  
                </div>
</div>

          <div className="productPurchaseContainer">

          <div className="prime">
    <div className="primeLogo"></div>
 <h4> 
  Enjoy fast, free delivery, exclusive deals, and award-winning movies & TV shows with Prime.
  Try Prime and start saving today with fast, free delivery.
 </h4>
 </div>

 <span>Delivery</span> <span>Pickup</span>
 <div className="deliveryandpick_choose_borderbox">
        <div className="productPricebox">
         <span className="productPriceSymbol">$</span>
         <span className="productPrice">45.99</span>
         </div>
         <div className="deliveryDateSection">
      
             <span className="productDeliveryType">FREE Delivery</span>
             <p>
             <span className="date">Wednesday, Aug 20</span>
             <span className="orderwithin">if ordered within</span>
             <span className="orderwithinTime">7hrs 10mins</span>
             </p>
             <span className="details">Details</span>
             </div>
         <br />

         <div className="deliveryLocation">
         <span className="locationIcon"><CiLocationOn /></span>
         <span className="locationBox">Delivering to - Update location</span>
         </div>
         <br />
         <div className="stockAvailability">In stock</div>
         <div className="quantity">
         <span className="quantityTitle">Quantity</span>
         <select name="quantity" id="quantity" className="quantityBox">
         <option value="one">1</option>
         <option value="two">2</option>
         <option value="three">3</option>
         <option value="four">4</option>
         <option value="five">5</option>
         <option value="six">6</option>
         </select>
         </div>
 <br />
         <div className="secureTransaction">
         <span className="lockIcon"></span>
         <span style={{marginRight: '30px'}}> Secure transaction</span>
         </div>
         <div className="cartSection">
         <button className="addToCartButton" onClick={AddToCart}>Add to Cart</button>
         <button className="buyNowButton">BuyNowButton</button>
         <button className="wishlistBtn">AddTo wishList</button>
         </div>
         <hr />
            <div className="addtocart">
              <div className="quantity_container">
                <input
                  type="number"
                  className="quantity"
                  min="1"
                  max="5"
                  defaultValue={cartProduct ? cartProduct.quantity : 1}
                  onChange={handleQuantityChange}
                />
                &nbsp; &nbsp;&emsp; &ensp;
                <button className="handleDec" onClick={handleDec}>-</button>
                <button className="addtocart_button" onClick={AddToCart}>Add to cart</button>
                <button className="handleInc" onClick={handleInc}>+</button>
              </div>
            </div>
         <br />
         <div className="shippingContainer">
         <tbody className="shippingInfo">
         <tr className="shipsFrom">Delivered by :</tr>
         <td className="">Amazon</td>
         </tbody>
         <tbody className="sellingInfo">
         <tr className="soldBy">Sold by</tr>
         <td className="sellerCompanyName">Parda Sansar</td>
         </tbody>
         </div>
         </div>
  </div>

        </div>

        <div className="relatedProducts">
                     <h3> Related Products in category </h3>
        </div>
      </div>
    </>
  );
};

export default ProductsAndServices_SingleDisplay;
