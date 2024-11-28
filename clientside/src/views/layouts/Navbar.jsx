import React, { useEffect, useState } from "react";
import logo from "../../assets/assets/logo.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
//import { useSearchMutation } from "../../services/search";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { allItems } from "../../constants";
import TopHeader from "../../components/common/TopHeader"
import { useSelector } from "react-redux";
import api from "../../services/apiConfig";
import { useAuth } from "../../context/AuthContext";
import Cookies from 'js-cookie';

const Navbar = () => {

  const { user, loading, checkAuth, error } = useAuth(); // Access user and loading
  console.log("user on fronted ", user)
  const [showAll, setShowAll] = useState(false);
  const [showUser, seShowUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryChoice, setCategoryChoice] = useState("All");


  const navigate = useNavigate();
  //const products = useSelector((state) => state.cart.items);

  const onSuccess = (data) => {
    navigate("/all-products", { state: { results: data } });
  };
  const products = useSelector((state) => state.cart.items);

  const onError = (error) => {
    console.error("Search failed: ", error);
    alert("Search failed. Please try again.");
  };

  //const { mutate, error, isError } = useSearchMutation(onSuccess, onError);

  const handleSearch = () => {
    //console.log("search: ", searchTerm);
    //mutate(searchTerm);
  };

  const handleLogout = async () => {
    try {
      const result = await api.post("/auth/logout");
      if (result.status === 200) {
        console.log("logout done ");
        seShowUser(false);
        navigate("/login");
      } else {
        console.log("logout but status to check");
      }
    } catch (error) {
      console.log("error while logut , ", error);
    }
  };

  useEffect(() => {}, [showUser]);

  return (
    <div className="w-full sticky top-0 z-50">
      <div className="w-full bg-amazon_blue text-white px-4 py-2 flex items-center gap-4 ">
        <Link to="/">
          <div className="headerHover">
            <img className="w-28 mt-2" src={logo} alt="" />{" "}
            {/* Adjusted width */}
          </div>
        </Link>

        <div className="headerHover">
          <LocationOnIcon />
          <p className="text-sm text-lightText font-light flex flex-col">
            Deliver to{" "}
            <span className="text-sm font-semibold mt-1 text-white">USA</span>
          </p>
        </div>

        <div className="h-10 rounded-md flex flex-grow relative">
          <span
            onClick={() => setShowAll(!showAll)}
            className="w-22 h-full bg-gray-200 hover:bg-gray-300 border-2 cursor-pointer
            duration-300 text-sm text-amazon_blue font-titleFont flex items-center 
            justify-center rounded-tl-md rounded-bl-md"
          >
            {categoryChoice} <ArrowDropDownOutlinedIcon />
          </span>
          {showAll && (
            <div>
              <ul
                className="absolute w-56 h-80 top-12 left-0 overflow-y-scroll
                overflow-x-hidden bg-white border-[1px] border-amazon_blue text-black
                p-2 flex-col gap-1 z-50"
              >
                {allItems.map((item, index) => (
                  <li
                    key={item.id}
                    onClick={(e) => setCategoryChoice(item.title)}
                    className="text-sm tracking-wide font-titleFont border-b-[1px]
                    border-b-transparent hover:border-b-amazon_blue cursor-pointer duration-200"
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <input
            className="h-full text-base text-amazon_blue flex-grow outline-none border-none px-2"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span
            onClick={handleSearch}
            className="w-12 h-full flex items-center justify-center bg-amazon_yellow
            hover:bg-[#f3a847] duration-300 text-amazon_blue rounded-tr-md
            rounded-br-md cursor-pointer"
          >
            <SearchIcon />
          </span>
        </div>

        <div className="flex flex-col items-start justify-center headerHover">
          {user ? (
            <div>
              <p className="text-xs text-lightText font-light">
                Hello, {user.name}
              </p>
              <p
                onClick={() => seShowUser(!showUser)}
                className="text-sm font-semibold -mt-1 text-whiteText"
              >
                Account & Lists{" "}
                <span>
                  <ArrowDropDownOutlinedIcon />
                </span>
              </p>
              {showUser && (
                <ul
                  className="absolute w-36 h-22 top-14 right-40 
                overflow-x-hidden bg-white border-[1px] border-amazon_blue text-black
                p-2 flex-col gap-1 z-50"
                >
                  <li
                    className="text-sm tracking-wide font-titleFont border-b-[1px]
                    border-b-transparent hover:border-b-amazon_blue cursor-pointer duration-200"
                  >
                    Settings
                  </li>
                  <li
                    onClick={handleLogout}
                    className="text-sm tracking-wide font-titleFont border-b-[1px]
                    border-b-transparent hover:border-b-amazon_blue cursor-pointer duration-200"
                  >
                    Logout
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link to="/login">
              <p className="text-xs text-lightText font-light">
                Hello, Sign in
              </p>
              <p className="text-sm font-semibold -mt-1 text-whiteText">
                Account & Lists{" "}
                <span>
                  <ArrowDropDownOutlinedIcon />
                </span>
              </p>
            </Link>
          )}
        </div>

        <div className="flex flex-col items-start justify-center headerHover">
          <p className="text-xs text-lightText font-light">Returns</p>
          <p className="text-sm font-semibold -mt-1 text-whiteText">& Orders</p>
        </div>

        <Link to="/cart">
          <div className="flex flex-col items-start justify-center headerHover relative">
            <ShoppingCartIcon />
            <p className="text-xs font-semibold mt-3 text-whiteText">
              <span
                className="absolute text-xs top-0 left-6 font-semibold p-1 h-4 bg-[#f3a847]
              text-amazon_blue rounded-full flex justify-center items-center"
              >
               
                {products.length > 0 ? products.length : 0}
                 
              </span>
            </p>
          </div>
        </Link>
      </div>
      <TopHeader />
    </div>
  );
};

export default Navbar;