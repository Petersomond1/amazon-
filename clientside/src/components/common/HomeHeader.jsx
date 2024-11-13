import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
// import './homeListCard.css'; // Ensure styling for custom slider arrows and other components

function SampleNextArrow({ onClick }) {
  return (
    <div
      className="custom-arrow custom-next"
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.5)",
        borderRadius: "50%",
        padding: "15px",
        right: "15px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        cursor: "pointer",
        position: "absolute",
      }}
    >
      <i className="fas fa-chevron-right text-white"></i>
    </div>
  );
}

function SamplePrevArrow({ onClick }) {
  return (
    <div
      className="custom-arrow custom-prev"
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.5)",
        borderRadius: "50%",
        padding: "15px",
        left: "15px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        cursor: "pointer",
        position: "absolute",
      }}
    >
      <i className="fas fa-chevron-left text-white"></i>
    </div>
  );
}

function HomeHeader({ firstProductSet }) {
  const slideStyles = {
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    height: '60vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '95%',
    color: '#f2f2f2',
    fontSize: '30px',
    textTransform: 'uppercase',
    letterSpacing: '8px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: '28px',
    textAlign: 'center',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    opacity: '0.8',
    zIndex: '998',
  };

  const spanStyle = {
    padding: '30px',
    background: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '4px',
  };

  return (
    <div className="slider-container m-10" style={{ position: 'relative' }}>
      <SamplePrevArrow onClick={() => document.querySelector(".react-slideshow-container .back").click()} />
      <Slide>
        {firstProductSet.map((product) => (
          <div
            key={product.id}
            style={{ ...slideStyles, backgroundImage: `url(${product.image})` }}
          >
            <span style={spanStyle}>{product.name}</span>
          </div>
        ))}
      </Slide>
      <SampleNextArrow onClick={() => document.querySelector(".react-slideshow-container .next").click()} />
    </div>
  );
}

export default HomeHeader;





// import "../style/homeListCard.css";
// import { Link } from "react-router-dom";
// import React from "react";
// import Slider from "react-slick";


// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`${className} custom-arrow custom-next`}
//       style={{
//         ...style,
//         display: "flex", // Use flexbox to center the arrow icon
//         alignItems: "center", // Vertically center the arrow
//         justifyContent: "center", // Horizontally center the arrow
//         background: "rgba(0, 0, 0, 0.5)", // Background color of the arrow
//         borderRadius: "50%", // Makes the arrow circular
//         padding: "15px", // Increase padding for height and width
//         right: "15px", // Position from the right side
//         top: "50%", // Vertically center the arrow
//         transform: "translateY(-50%)", // Adjust for perfect centering
//         zIndex: 1, // Ensure the arrow is above other elements
//         cursor: "pointer", // Changes cursor to pointer on hover
//         border: "2px solid transparent", // Initial transparent border
//         transition: "border 0.2s ease", // Smooth transition for border change
//       }}
//       onClick={onClick}
//     >
//       <i className="fas fa-chevron-right text-white"></i>{" "}
//       {/* Icon for the arrow */}
//     </div>
//   );
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`${className} custom-arrow custom-prev active: border-white`}
//       style={{
//         ...style,
//         display: "flex", // Use flexbox to center the arrow icon
//         alignItems: "center", // Vertically center the arrow
//         justifyContent: "center", // Horizontally center the arrow
//         background: "rgba(0, 0, 0, 0.5)", // Background color of the arrow
//         borderRadius: "50%", // Makes the arrow circular
//         padding: "15px", // Increase padding for height and width
//         left: "15px", // Position from the left side
//         top: "50%", // Vertically center the arrow
//         transform: "translateY(-50%)", // Adjust for perfect centering
//         zIndex: 1, // Ensure the arrow is above other elements
//         cursor: "pointer", // Changes cursor to pointer on hover
//         border: "2px solid transparent", // Initial transparent border
//         transition: "border 0.2s ease", // Smooth transition for border change
//       }}
//       onClick={onClick}
//     >
//       <i className="fas fa-chevron-left text-white"></i>{" "}
//       {/* Icon for the arrow */}
//     </div>
//   );
// }

// function HomeHeader({ firstProductSet }) {
//   console.log("this is first carousel ", firstProductSet)
//   const settings = {
//     infinite: true,
//     autoplay: true,
//     fade: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//   };

//   console.log("slider data ", firstProductSet)

//   return (
//     <div className="slider-container m-10  ">
//       WRITE AND MAKE A SLIDER FOR IMAGES HERE
//     </div>
//   );
// }

// export default HomeHeader;







// import React, {useContext, useState, useEffect } from 'react';
// import { Slide } from 'react-slideshow-image';
// import 'react-slideshow-image/dist/styles.css';
// import './productsandservices_display_row_1_carousel.css';
// import { ProductContext,
//     // ProductProvider
//    } from './ProductContext.jsx';
// import UseFetchProducts from './UseFetchProducts.jsx';
// // import { Link } from 'react-router-dom';
 


// export const ProductsAndServices_Display_Row_1_Carousel = () => {
//     const { row1productIds} = useContext(ProductContext);
//     const [selectedProducts, setSelectedProducts] = useState([]);
//     const products = UseFetchProducts();


//     useEffect(() => {
//         if (products && row1productIds) {
//             const filteredProducts = products.filter(product => row1productIds.includes(product.id));
//             setSelectedProducts(filteredProducts);
//             console.log('filteredProducts-Row1-listing:', filteredProducts);
//         }
//     }, [
//         // products, row1productIds
//         ]);

//     const divStyle = {
//         justifyContent:'center',
//         marginTop: '0px, auto',
//         marginLeft: '30px',
//         display: 'flex',
//         alignItems: 'center',
//         height: '60vh',
//         backgroundSize: '110%',
//          /* scale the image to fill the container */
//         backgroundRepeat: 'no-repeat',
//         backgroundPosition: '60% 0%', //shifts the image to the right
//         // backgroundPosition: 'center',
//         width: '95%',
//         backgroundBlendMode: 'multiply',
//         background: 'linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1))',
//         color: '#f2f2f2',
//         fontSize: '30px',
//         textTransform: 'uppercase',
//         letterSpacing: '8px',
//         fontFamily: 'Roboto',
//         fontStyle: 'normal',
//         fontWeight: 'bold',
//         lineHeight: '28px',
//         textAlign: 'center',
//         textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
//         opacity: '0.8',
//         zIndex:'998',
//     }

 
//     const spanStyle = {
//         padding: '30px',
//         background: 'rgba(0,0,0,0.5)',
//         borderRadius: '4px',
//     }

//     return (
//         // <ProductProvider>
//         <div>
//             <Slide>
//                 {selectedProducts.map((product) => (
//                     <div
//                         key={product.id}
//                         className="divStyle"
//                         style={{ ...divStyle, backgroundImage: `url(${product.image})` }}
//                     >
//                          {/* <Link to="/ProductsAndServices_Display_Row_1_Carousel_Listing"> */}
//                         <span className="spanStyle" style={spanStyle}>
//                             {product.name}
//                         </span>
//                         {/* </Link> */}
//                     </div>
//                 ))}
//             </Slide>
//         </div>
//         // </ProductProvider>
//     );
// }

// export default ProductsAndServices_Display_Row_1_Carousel;