import React from "react";
import { useQuery } from "react-query";
import HomeHeader from "../components/common/HomeHeader.jsx";
import HomeCategories from "../components/common/HomeCategories.jsx";
import HomeListCard1 from "../components/common/HomeListCard1.jsx";
import ProductsCards from "../components/common/ProductCards.jsx";
import FourthView from "../components/common/HomeList2.jsx";
import { fetchIdsofProducts } from "../services/homeService.js";
import { useAuth } from "../context/AuthContext.jsx";
import FeaturedSection from "../components/common/featuredSection.jsx";
import SixthCarousel from "../components/common/HomeCarousel.jsx";
import HomeListCard2 from "../components/common/HomeList2.jsx";

const Home = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: "fetchIdsofProducts",
    queryFn: fetchIdsofProducts,
  });
  // Data extraction from fetched products
  const firstProductSet = products && products[0] ? products[0] : [];
  const secondProductSet = products && products[1] ? products[1] : [];
  const thirdProductSet = products && products[2] ? products[2] : [];
  const fourthProductSet = products && products[3] ? products[3] : [];
  const fifthProductSet = products && products[4] ? products[4] : [];
  const sixthProductSet = products && products[5] ? products[5] : [];

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100">
      {/* Hero Slider */}
      <section className="h-[70vh] w-full">
        <HomeHeader firstProductSet={firstProductSet} />
      </section>

      {/* Categories Section */}
      <section className="relative -mt-[8%]">
        <HomeCategories categories={secondProductSet} />
      </section>

      {/* Product List Section */}
      <section className="py-0 bg-gray-100">
        <HomeListCard1 thirdProductSet={thirdProductSet} />
      </section>

      {/* Products Cards */}
      <section className="py-0">
      <ProductsCards secondProductSet={secondProductSet} />
      </section>

      {/* feature Cards */}
      <section>
      <FeaturedSection fifthProductSet={fifthProductSet} />
      </section>


      {/* Product List Section */}
      <section className="py-0 bg-gray-100">
        <HomeListCard1 thirdProductSet={thirdProductSet} />
      </section>


      {/* Product List Section */}
      <section className="py-0 bg-gray-100">
        <HomeListCard2 thirdProductSet={sixthProductSet} />
      </section>


    </div>
  );
};

export default Home;
