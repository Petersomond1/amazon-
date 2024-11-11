import React, { useEffect, useState } from "react";
// import Card from "../components/common/Card.jsx";
import { useQuery } from "react-query";
import HomeHeader from "../components/common/HomeHeader.jsx";
import HomeCategories from "../components/common/HomeCategories.jsx";
import HomeListCard1 from "../components/common/HomeListCard1.jsx";
// import ListCard2 from "../components/common/ListCard2.jsx";
import { fetchIdsofProducts} from "../services/homeService.js";
import ProductsCards from "../components/common/ProductCards.jsx";
import FourthView from "../components/common/FourthView.jsx"
import { useAuth } from "../context/AuthContext.jsx";

const Home = () => {
  const [fetchProducts, setFetchProducts] = useState(true);
  const {user, loading, error, checkAuth} = useAuth()

  const {data:products, isLoading, error:fetchedError} = useQuery({
    queryKey: "fetchIdsofProducts",
    queryFn: fetchIdsofProducts,
 } )

  //Data extraction from fetched products
  const firstProductSet = products && products[0] ? products[0] : [];
  const secondProductSet = products && products[1] ? products[1] : [];
  const thirdProductSet = products && products[2] ? products[2] : [];
  const fourthProductSet = products && products[3] ? products[3][0] : [];
  const fifthProductSet = products && products[4] ? products[4][0] : [];
  const sixthProductSet = products && products[5] ? products[5][0] : [];

 // console.log("here is the products ",firstProductSet)
  //console.log("here is the products second",secondProductSet)
  //console.log("here is the products thirdProductSet",thirdProductSet)
  // console.log("here is the products fourthProductSet ",fourthProductSet)
  //console.log("here is the products fifthProductSet",fifthProductSet)
  //console.log("here is the products sixthProductSet",sixthProductSet)

  if (isLoading)
    return <div>url Loading</div>
  return (
    <div className="bg-[#E3E6E6]">
      
      <div className="border border-[4px] border-blue-500 h-96 w-screen-full">
        <HomeHeader firstProductSet={firstProductSet} />
      </div> 

      <div className="relative top-[184px] transform -translate-y-1/2  z-20 flex justify-center items-center gap-10 flex-wrap ">
        <HomeCategories categories={secondProductSet} />
      </div>
      <div className="-translate-y-1/2">
        <HomeListCard1 thirdProductSet={thirdProductSet} />
      </div>

      
      <div className="flex justify-center items-center flex-wrap gap-10 mt-10 relative top-[-180px] -translate-y-1/8 ">
        <ProductsCards secondProductSet={secondProductSet} />
      </div>
      <div className="px-8 py-2 relative top-[-180px] -translate-y-1/8 ">
        
        <FourthView fourthProductSet={fourthProductSet} />
      </div>
      <div className="px-8 py-2 relative top-[-180px] -translate-y-1/8">
    
        <FourthView fourthProductSet={fifthProductSet} />
      </div> 
    </div>
  );
};

export default Home;