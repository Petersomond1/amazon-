import React, { useEffect } from "react";
import GoUp from "./GoUp";
import logo from "../../../assets/assets/logo.png";
import flag from "../../../assets/assets/flag.png";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const { user, loading } = useAuth(); // Access user and loading
  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }
  useEffect(() => {}, [user]);
  return (
    <div className="font-titleFont">
      <div className="w-full bg-white py-6">
        <div className="w-full border-t-[1px] border-b-[1px] py-8">
          {user ? (
            <div className="w-64 mx-auto text-center">
              <p className="text-sm">See Personlized recommendations</p>
              <Link>
                <button
                  className="w-full  bg-yellow-400 rounded-md py-1 font-semibold 
            cursor-pointer hover:bg-yellow-500 active:bg-yellow-700 "
                >
                  Go To Account
                </button>
              </Link>
            </div>
          ) : (
            <div className="w-64 mx-auto text-center">
              <p className="text-sm">See Personlized recommendations</p>
              <Link to="/login">
                <button
                  className="w-full  bg-yellow-400 rounded-md py-1 font-semibold 
            cursor-pointer hover:bg-yellow-500 active:bg-yellow-700 "
                >
                  Sign In
                </button>
              </Link>
              <p className="text-xs mt-1">
                New Customer ?{" "}
                <Link to="/register">
                  <span className="text-blue-600 ml-1 cursor-pointer">
                    Start here
                  </span>
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
      <GoUp />
      <div className="w-full bg-amazon_light text-white ">
        <div className="w-full border-b-[1px] border-gray-500 py-10">
          <div className="max-w-5xl mx-auto text-gray-300 ">
            <div className="w-full grid grid-cols-4 place-items-center items-start">
              <div>
                <h3 className="font-titleFont text-white text-base font-semibold mb-3">
                  Get To know Use
                </h3>
                <ul className="flex flex-col gap-2 font-bodyFont">
                  <li className="footerLink">Careers</li>
                  <li className="footerLink">Careers</li>
                  <li className="footerLink">Careers</li>
                  <li className="footerLink">Careers</li>
                </ul>
              </div>
              <div>
                <h3 className="font-titleFont text-white text-base font-semibold mb-3">
                  Get To know Use
                </h3>
                <ul className="flex flex-col gap-2 font-bodyFont">
                  <li className="footerLink">Careers</li>
                  <li className="footerLink">Careers</li>
                  <li className="footerLink">Careers</li>
                  <li className="footerLink">Careers</li>
                </ul>
              </div>
              <div>
                <h3 className="font-titleFont text-white text-base font-semibold mb-3">
                  Get To know Use
                </h3>
                <ul className="flex flex-col gap-2 font-bodyFont">
                  <li className="footerLink">Careers</li>
                  <li className="footerLink">Careers</li>
                  <li className="footerLink">Careers</li>
                  <li className="footerLink">Careers</li>
                </ul>
              </div>
              <div>
                <h3 className="font-titleFont text-white text-base font-semibold mb-3">
                  Get To know Use
                </h3>
                <ul className="flex flex-col gap-2 font-bodyFont">
                  <li className="footerLink">Careers</li>
                  <li className="footerLink">Careers</li>
                  <li className="footerLink">Careers</li>
                  <li className="footerLink">Careers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex gap-6 items-center  bg-amazon_light justify-center py-6">
        <div>
          <img className="w-20 pt-3" src={logo} alt="logo" />
        </div>
        <div className="flex -gap-2">
          <p
            className="flex gap-1 items-center justify-center border border-gray-500 
          hover:border-amazon_yellow cursor-pointer duration-200 px-2 py-1"
          >
            English
          </p>
        </div>
        <div
          className="flex gap-1 items-center justify-center border border-gray-500 
          hover:border-amazon_yellow cursor-pointer duration-200 px-2 py-1"
        >
          <img className="w-6" src={flag} alt="flag here" />
          <p>USA </p>
        </div>
      </div>
      <div className="w-full bg-slate-900 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="w-full grid grid-cols-7 gap-3 place-content-center text-gray-400">
            {[...Array(25)].map((_, index) => (
              <div key={index} className="">
                <h3 className=" w-24 font-semibold text-[12px]  text-[#DDD] leading-3 mb-[2px]">
                  name
                </h3>
                <p className="w-24 tracking-tight text-[12px] text-[#999] groupe-hover:underline leading-3">
                  description link bla bla bla dra dra dra
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;