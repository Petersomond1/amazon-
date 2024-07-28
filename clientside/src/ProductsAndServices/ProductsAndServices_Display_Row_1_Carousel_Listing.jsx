import React from 'react';
// import './productsandservices_display_row_1_carousel.css';
import './productsandservices_display_listing.css'
import {Link} from 'react-router-dom';
import {useFetchFilteredProductsByRow} from "./useFetchProducts.js";
// import {useFetchProducts} from "./useFetchProducts.js";

// Make this be a slider listing carousel products

  const ProductsAndServices_Display_Row_1_Carousel_Listing = () => {
    const { data: products, isLoading, error } = useFetchFilteredProductsByRow(0); // Assuming rowId for Row 1 is 0

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="listing_container">
      {products.map((product) => {
        return (
          <div key={product.id}>
            <Link
              to={`/ProductsAndServices_SingleDisplay/${product.id}`}
              key={product.id}
            >
              <div className="listing_card">
                <div className="listing_image">
                  <div className="listing_name">
                    <h3>{product.name}</h3>
                  </div>
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="listing_details">
                  <div>
                  <h3>${product.price}</h3>
                    <br />
                    <div>
                    <button className="addToCart">Add to Cart</button>
                    &nbsp; &nbsp; &nbsp;
                    <button className="buyNow">Buy Now</button>
                  </div>
                    <br />
                    <p>{product.description}</p>
                   
                  
                  </div>
                  
                  
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsAndServices_Display_Row_1_Carousel_Listing