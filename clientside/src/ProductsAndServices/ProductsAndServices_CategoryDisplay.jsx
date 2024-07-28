import React from "react";
import { useParams } from "react-router-dom";
import "./productsandservices_categorydisplay.css";
import UseFetchProducts from "./useFetchProducts.js";
import { Link } from "react-router-dom";

const ProductsAndServices_CategoryDisplay = () => {
  const { category } = useParams(); // Get the category from the URL
  const { data, isLoading, error } = UseFetchProducts(); // Fetch all products

  // Check if data is defined and has the expected structure
  const allProducts = data ? data[0][0] : null;
  // Filter products by category
  const productsInCategory = allProducts ? allProducts.filter(product => product.category === category) : [];

  if (isLoading) return <div style={{color: 'black'}}>Loading...</div>;
  if (error) return <div style={{color: 'black'}}>An error occurred: {error.message}</div>;
  if (productsInCategory.length === 0) return <div style={{color: 'black'}}>Product not found</div>; // Show this if no product is found

  const AddToCart = () => {
      console.log("AddToCart");
  };
  
  const BuyThisNow = () => {
      console.log("BuyThisNow");
  };

  return (
    // <>
    //   <div className='container_category'>
    //     <h3>{category}</h3> {/* Use the category variable here */}
    //     {productsInCategory.map((product) => (
    //       <div key={product.id}>
    //         <Link to={`/ProductsAndServices_SingleDisplay/${product.id}`}>
    //           <div className="category_box">
    //             <div className="category_box_content">
    //               <div>
    //                 <img src={product.image} alt={product.name} />
    //               </div>
    //               <div className="category_products_properties">
    //                 <h3>{product.name}</h3>
    //                 <p>{product.description}</p>
    //                 <p>{product.reviews}</p>
    //                 <p>{product.ratings}</p> {/* Corrected <P> to <p> */}
    //                 <p>{product.price}</p>
    //               </div>
    //             </div>
    //           </div>
    //         </Link>
    //       </div>
    //     ))}
    //   </div>
    // </>

    // ||

    <>
  <div className="productsandservices_row2_container">
    {/* <h3>{category}</h3> Use the category variable here */}
    <div className="productsandservices_display_row_2_card">
      {productsInCategory.map((product) => (
        <div key={product?.id} className="page__row">
         
            <div className="container_row_2_cardsx4">
              <div key={product?.id}>
             
                <div className="box_single">
                  <Link to={`/ProductsAndServices_SingleDisplay/${product?.id}`} style={{textDecoration:'none', color:'black'}}>
                  <div className="content">
                    <h3>{product?.name}</h3>
                  </div>
                  <div>
                    <img src={product?.image} alt={product?.name} className="category-image"/>
                  </div>
                  </Link>
                  <div>
                    <p>{product.description?.slice(0, 40)}{product.description?.length > 30 ? "..." : ""}</p>
                    <p>{product.reviews} Reviews and {product.ratings} Ratings</p> 
                    <div>
                   <div style={{display:'flex'}}> <h2 style={{paddingRight:'20px'}}>${product.price}</h2> <button onClick={AddToCart} className="addToCartButton"> <strong>AddToCart </strong></button> <button onClick={BuyThisNow} className="buyRightaway"> <strong>BuyNow </strong></button></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      ))}
    </div>
  </div>
</>
  );
}

export default ProductsAndServices_CategoryDisplay;