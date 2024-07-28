import React from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
import "./productsandservices_display_row_2.css";


const ProductsAndServices_Display_Row_2 = ({ products }) => {
  
  return (
    <>
      <div className="productsandservices_row2_container">
        <div className="productsandservices_display_row_2_card">
          {products?.map((product) => (
            <div key={product?.id} className="page__row">
              <Link
                to={`/ProductsAndServices_CategoryDisplay/${product?.category}`} 
                key={product?.category}
              > 
                {/* <div className="container_row_2_cardsx4"> */}
                  <div key={product?.id}>
                    <div className="box_single">
                      <div className="content">
                        <h3>{product?.type}</h3>
                      </div>
                      <div>
                      <img src={product?.image} alt={product?.name} className="category-image"/>
                      </div>
                      <div>
                        <h3>{product?.category}</h3>
                      </div>
                    </div>
                  </div>
                {/* </div> */}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default ProductsAndServices_Display_Row_2;
