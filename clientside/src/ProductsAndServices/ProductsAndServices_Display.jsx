import React from "react";
import ProductsAndServices_Display_Row_1_Carousel from "./ProductsAndServices_Display_Row_1_Carousel";
import ProductsAndServices_Display_Row_2 from "./ProductsAndServices_Display_Row_2";
import "./productsandservices_display.css";
import ProductsAndServices_Display_Row_3_Slider from "./ProductsAndServices_Display_Row_3_Slider";
import ProductsAndServices_Display_Row_4_Slider from "./ProductsAndServices_Display_Row_4_Slider";
import ProductsAndServices_Display_Row_5 from "./ProductsAndServices_Display_Row_5";
import ProductsAndServices_Display_Row_6_Livestream_n_Slider from "./ProductsAndServices_Display_Row_6_Livestream_n_Slider";
import { Link } from "react-router-dom";
import useFetchProducts from "./useFetchProducts.js";


export const ProductsAndServices_Display = () => {
  const { data, isLoading, error } = useFetchProducts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  // Assuming data[1] contains arrays of product IDs for each row
  const products = data[0][0];
  // const RowIds = data[1];
  

  const rowIds_1 = JSON.parse(data[1][0]); 
  const rowIds_2 = JSON.parse(data[1][1]); 
  const rowIds_3 = JSON.parse(data[1][2]);
  const rowIds_4 = JSON.parse(data[1][3]);
  const rowIds_5 = JSON.parse(data[1][4]);
  const rowIds_6 = JSON.parse(data[1][5]);

  // Filter products based on RowIds
  const filteredProductsByRow_1 = products.filter(product => rowIds_1.includes(product.id));
  const filteredProductsByRow_2 = products.filter(product => rowIds_2.includes(product.id));
  const filteredProductsByRow_3 = products.filter(product => rowIds_3.includes(product.id));
  const filteredProductsByRow_4 = products.filter(product => rowIds_4.includes(product.id));
  const filteredProductsByRow_5 = products.filter(product => rowIds_5.includes(product.id));
  const filteredProductsByRow_6 = products.filter(product => rowIds_6.includes(product.id));

  
  return (
    <div className="productsandservices_display_container">
      <div className="productsandservices_display_container_carousel">
        <Link to={`ProductsAndServices_Display_Row_1_Carousel_Listing`}> 
          <ProductsAndServices_Display_Row_1_Carousel products={filteredProductsByRow_1} />
        </Link>
      </div>
      <div className="productsandservices_display_rows">
        <ProductsAndServices_Display_Row_2 products={filteredProductsByRow_2} />
        <br />
        <Link to={`/ProductsAndServices_CategoryDisplay/:category`}> 
        <ProductsAndServices_Display_Row_3_Slider products={filteredProductsByRow_3} />
        </Link>
        <br />
        <ProductsAndServices_Display_Row_4_Slider products={filteredProductsByRow_4} />
        <br />
        <ProductsAndServices_Display_Row_5 products={filteredProductsByRow_5} />
        <br />
        <div className='streamtext'>
        <h3>Amazon Live Stream</h3>
        <p>Watch live streams of your favorite products and services</p>
        </div>
        <ProductsAndServices_Display_Row_6_Livestream_n_Slider products={filteredProductsByRow_6}/>
      </div>
    </div>
  );
};

export default ProductsAndServices_Display;

// import React from "react";
// import ProductsAndServices_Display_Row_1_Carousel from "./ProductsAndServices_Display_Row_1_Carousel";
// import ProductsAndServices_Display_Row_2 from "./ProductsAndServices_Display_Row_2";
// import "./productsandservices_display.css";
// import ProductsAndServices_Display_Row_3_Slider from "./ProductsAndServices_Display_Row_3_Slider";
// import ProductsAndServices_Display_Row_4_Slider from "./ProductsAndServices_Display_Row_4_Slider";
// import ProductsAndServices_Display_Row_5 from "./ProductsAndServices_Display_Row_5";
// import ProductsAndServices_Display_Row_6_Livestream_n_Slider from "./ProductsAndServices_Display_Row_6_Livestream_n_Slider";
// import { Link } from "react-router-dom";
// import useFetchProducts from "./useFetchProducts.js";

// export const ProductsAndServices_Display = () => {
//   const { data, isLoading, error } = useFetchProducts();

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>An error occurred: {error.message}</div>;

//   console.log("Fetched data:", data); // Add logging to inspect the data

//   const products = data[0][0];

//   let rowIds_1 = [];
//   let rowIds_2 = [];
//   let rowIds_3 = [];
//   let rowIds_4 = [];
//   let rowIds_5 = [];
//   let rowIds_6 = [];

//   try {
//     rowIds_1 = JSON.parse(data[1][0]); 
//     rowIds_2 = JSON.parse(data[1][1]); 
//     rowIds_3 = JSON.parse(data[1][2]);
//     rowIds_4 = JSON.parse(data[1][3]);
//     rowIds_5 = JSON.parse(data[1][4]);
//     rowIds_6 = JSON.parse(data[1][5]);
//   } catch (parseError) {
//     console.error("JSON parsing error:", parseError.message);
//   }

//   const filteredProductsByRow_1 = products.filter(product => rowIds_1.includes(product.id));
//   const filteredProductsByRow_2 = products.filter(product => rowIds_2.includes(product.id));
//   const filteredProductsByRow_3 = products.filter(product => rowIds_3.includes(product.id));
//   const filteredProductsByRow_4 = products.filter(product => rowIds_4.includes(product.id));
//   const filteredProductsByRow_5 = products.filter(product => rowIds_5.includes(product.id));
//   const filteredProductsByRow_6 = products.filter(product => rowIds_6.includes(product.id));

//   return (
//     <div className="productsandservices_display_container">
//       <div className="productsandservices_display_container_carousel">
//         <Link to={`ProductsAndServices_Display_Row_1_Carousel_Listing`}> 
//           <ProductsAndServices_Display_Row_1_Carousel products={filteredProductsByRow_1} />
//         </Link>
//       </div>
//       <div className="productsandservices_display_rows">
//         <ProductsAndServices_Display_Row_2 products={filteredProductsByRow_2} />
//         <br />
//         <Link to={`/ProductsAndServices_CategoryDisplay/:category`}> 
//         <ProductsAndServices_Display_Row_3_Slider products={filteredProductsByRow_3} />
//         </Link>
//         <br />
//         <ProductsAndServices_Display_Row_4_Slider products={filteredProductsByRow_4} />
//         <br />
//         <ProductsAndServices_Display_Row_5 products={filteredProductsByRow_5} />
//         <br />
//         <div className='streamtext'>
//         <h3>Amazon Live Stream</h3>
//         <p>Watch live streams of your favorite products and services</p>
//         </div>
//         <ProductsAndServices_Display_Row_6_Livestream_n_Slider products={filteredProductsByRow_6}/>
//       </div>
//     </div>
//   );
// };

// export default ProductsAndServices_Display;

// import React from "react";
// import ProductsAndServices_Display_Row_1_Carousel from "./ProductsAndServices_Display_Row_1_Carousel";
// import ProductsAndServices_Display_Row_2 from "./ProductsAndServices_Display_Row_2";
// import "./productsandservices_display.css";
// import ProductsAndServices_Display_Row_3_Slider from "./ProductsAndServices_Display_Row_3_Slider";
// import ProductsAndServices_Display_Row_4_Slider from "./ProductsAndServices_Display_Row_4_Slider";
// import ProductsAndServices_Display_Row_5 from "./ProductsAndServices_Display_Row_5";
// import ProductsAndServices_Display_Row_6_Livestream_n_Slider from "./ProductsAndServices_Display_Row_6_Livestream_n_Slider";
// import { Link } from "react-router-dom";
// import useFetchProducts from "./useFetchProducts.js";

// export const ProductsAndServices_Display = () => {
//   const { data, isLoading, error } = useFetchProducts();

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>An error occurred: {error.message}</div>;

//   // console.log("Fetched data:", data); // Add logging to inspect the data

//   if (!data || !data[0] || !data[1]) {
//     return <div>An error occurred: Invalid data structure</div>;
//   }

//   const products = data[0];
//   if (!Array.isArray(products) || products.length === 0) {
//     return <div>No products found</div>;
//   }

//   let rowIds_1 = [];
//   let rowIds_2 = [];
//   let rowIds_3 = [];
//   let rowIds_4 = [];
//   let rowIds_5 = [];
//   let rowIds_6 = [];

//   try {
//     rowIds_1 = JSON.parse(data[1][0] || '[]');
//     rowIds_2 = JSON.parse(data[1][1] || '[]');
//     rowIds_3 = JSON.parse(data[1][2] || '[]');
//     rowIds_4 = JSON.parse(data[1][3] || '[]');
//     rowIds_5 = JSON.parse(data[1][4] || '[]');
//     rowIds_6 = JSON.parse(data[1][5] || '[]');
//   } catch (parseError) {
//     console.error("JSON parsing error:", parseError.message);
//   }

//   const filteredProductsByRow_1 = products.filter(product => rowIds_1.includes(product.id));
//   const filteredProductsByRow_2 = products.filter(product => rowIds_2.includes(product.id));
//   const filteredProductsByRow_3 = products.filter(product => rowIds_3.includes(product.id));
//   const filteredProductsByRow_4 = products.filter(product => rowIds_4.includes(product.id));
//   const filteredProductsByRow_5 = products.filter(product => rowIds_5.includes(product.id));
//   const filteredProductsByRow_6 = products.filter(product => rowIds_6.includes(product.id));

//   return (
//     <div className="productsandservices_display_container">
//       <div className="productsandservices_display_container_carousel">
//         <Link to={`ProductsAndServices_Display_Row_1_Carousel_Listing`}> 
//           <ProductsAndServices_Display_Row_1_Carousel products={filteredProductsByRow_1} />
//         </Link>
//       </div>
//       <div className="productsandservices_display_rows">
//         <ProductsAndServices_Display_Row_2 products={filteredProductsByRow_2} />
//         <br />
//         <Link to={`/ProductsAndServices_CategoryDisplay/:category`}> 
//         <ProductsAndServices_Display_Row_3_Slider products={filteredProductsByRow_3} />
//         </Link>
//         <br />
//         <ProductsAndServices_Display_Row_4_Slider products={filteredProductsByRow_4} />
//         <br />
//         <ProductsAndServices_Display_Row_5 products={filteredProductsByRow_5} />
//         <br />
//         <div className='streamtext'>
//         <h3>Amazon Live Stream</h3>
//         <p>Watch live streams of your favorite products and services</p>
//         </div>
//         <ProductsAndServices_Display_Row_6_Livestream_n_Slider products={filteredProductsByRow_6}/>
//       </div>
//     </div>
//   );
// };

// export default ProductsAndServices_Display;
