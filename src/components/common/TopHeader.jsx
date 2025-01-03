import React, { useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SideContent from "./SideContent";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

const TopHeader = () => {
  const ref = React.useRef();
  const [sidebar, setSidebar] = React.useState(false);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target.contains(ref.current)) {
        setSidebar(false);
      }
    });
  }, [ref, sidebar]);

  return (
    <div className="w-full px-4 h-[36px] bg-amazon_light text-white flex items-center ">
      <ul className="flex justify-center items-center">
        <li
          className="headerHover gap-2 text-sm tracking-wide"
          onClick={() => setSidebar(true)}
        >
          <MenuIcon />
          All
        </li>
        <li className="headerHover ">Today's Deals</li>
        <li className="headerHover ">Customer Services</li>
        <li className="headerHover ">Gift Cards</li>
        <li className="headerHover ">Registry</li>
        <li className="headerHover ">Sell</li>
      </ul>
      {sidebar && (
        <div
          className="w-full h-screen text-black fixed top-0 left-0 bg-amazon_blue
          bg-opacity-50"
        >
          <div className="w-full h-full relative">
            <motion.div
              ref={ref}
              initial={{ x: -550, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-[350px] h-full bg-white border border-black"
            >
              <div className="w-full bg-amazon_light text-white py-2 px-6 flex items-center gap-4">
                <AccountCircleIcon />
                <h3 className="font-titleFont font-bold text-lg tracking-wide">
                  Hello, Sign In
                </h3>
              </div>
              <div className="">
                <SideContent
                  title="Digital Content & Devices"
                  one="Amazon Music"
                  two="Kindle E-readers & Books"
                  three="Amazon Appstore"
                />
                <SideContent
                  title="Shop By Department"
                  one="Electronics"
                  two="Computers"
                  three="Smart Home"
                />
                <SideContent
                  title="Programs & Features"
                  one="Gift Cards"
                  two="Amazon live"
                  three="International Shopping"
                />
                <SideContent
                  title="Help & Settings"
                  one="Your Account"
                  two="Customer Service"
                  three=""
                />
              </div>
              <span
                onClick={() => setSidebar(false)}
                className="cursor-pointer absolute top-0 right-0 w-10 h-10 text-black
                 flex items-center justify-center border bg-gray-200 hover:bg-red-500
               hover:text-white duration-300"
              >
                <CloseIcon />
              </span>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopHeader;