import React, { useEffect, useState } from "react";
// import Card from "../components/common/Card.jsx";
import { useQuery } from "react-query";
// import HomeHeader from "../components/common/HomeHeader.jsx";
// import HomeCategories from "../components/common/HomeCategories.jsx";
// import ListCards from "../components/common/ListCards.jsx";
// import ListCard2 from "../components/common/ListCard2.jsx";
import { fetchIdsofProducts} from "../services/homeService.js";
// import ProductsCards from "../components/common/ProductCards.jsx";
// import FourthView from "./FourthView.jsx";

const Home = () => {
  const [fetchProducts, setFetchProducts] = useState(true);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const {data, isLoading, error} = useQuery({
    queryKey: "fetchIdsofProducts",
    queryFn: fetchIdsofProducts,

 } )

 console.log( 'the data', data)

//   const {
//     data: categories,
//     isLoading: loadingCategories,
//     error: errorsCategories,
//   } = useQuery({
//     queryKey: "fetchCategories",
//     queryFn: getCategories,
//     enabled: fetchProducts,
//     onSettled: () => setFetchProducts(false),
//   });

  
  // Conditional rendering for loading and error states
  

  // Data extraction from fetched products
  // const firstProductSet = products && products[0] ? products[0][0] : [];
  // const secondProductSet = products && products[1] ? products[1][0] : [];
  // const thirdProductSet = products && products[2] ? products[2][0] : [];
  // const fourthProductSet = products && products[3] ? products[3][0] : [];
  // const fifthProductSet = products && products[4] ? products[4][0] : [];
  // const sixthProductSet = products && products[5] ? products[5][0] : [];

  if (isLoading)
    return <div>url Loading</div>
  return (
    <div className="bg-[#E3E6E6]">
        {
            data?.map((row)=>(
              <div key={row.id}>{row.row_ids}</div>
            )
          )
        }

        <h1> 'The data'; </h1>
      {/* <div className="">
        <HomeHeader firstProductSet={firstProductSet} />
      </div> */}
{/* 
      <div className="relative top-[184px] transform -translate-y-1/2  z-20 flex justify-center items-center gap-10 flex-wrap ">
        <HomeCategories categories={categories} />
      </div>
      <div className="-translate-y-1/2">
        <ListCards thirdProductSet={thirdProductSet} />
      </div>
      <div className="flex justify-center items-center flex-wrap gap-10 mt-10 relative top-[-180px] -translate-y-1/8 ">
        <ProductsCards secondProductSet={secondProductSet} />
      </div>
      <div className="px-8 py-2 relative top-[-180px] -translate-y-1/8 ">
        
        <FourthView fourthProductSet={fourthProductSet} />
      </div>
      <div className="px-8 py-2 relative top-[-180px] -translate-y-1/8">
    
        <FourthView fourthProductSet={fifthProductSet} />
      </div> */}
    </div>
  );
};

export default Home;