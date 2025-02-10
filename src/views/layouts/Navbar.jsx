import React, { useEffect, useState } from "react";
import logo from "../../assets/assets/logo.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/apiConfig";

const Navbar = () => {
  const { user, logout, login } = useAuth(); // Access user details
  const [showUser, setShowUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // Toggle for mobile menu
  const navigate = useNavigate();
  const products = useSelector((state) => state.cart.items);

  
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

useEffect(() => {
  setShowUser(false); // Reset user dropdown when auth changes
}, [user]);



  return (
    <div className="w-full sticky top-0 z-50 bg-amazon_blue text-white shadow-md">
      {/* Top Navigation */}
      <div className="flex items-center justify-between px-4 py-2 md:px-6">
        <div className="flex items-center">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl mr-4"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img className="w-28" src={logo} alt="Amazon Logo" />
          </Link>
        </div>

        {/* Search Bar - Visible on all devices, smaller on desktop */}
        <div className="flex-grow max-w-[72rem] mx-4 relative hidden sm:flex">
          <input
            className="h-10 flex-grow px-4 rounded-l-md text-amazon_blue outline-none"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Amazon..."
          />
          <button
            onClick={handleSearch}
            className="bg-yellow-400 hover:bg-yellow-500 px-4 rounded-r-md"
          >
            <SearchIcon className="text-amazon_blue" />
          </button>
        </div>

        {/* Account and Cart */}
        <div className="flex items-center space-x-4">
          {/* Account */}
          <div className="relative cursor-pointer">
            {!user ? (
              <Link to="/login">
                <p className="text-sm">Hello, Sign in</p>
                <p className="text-sm font-semibold">Account & Lists</p>
              </Link>
            ) : (
              <div>
                <p className="text-sm">Hello, {user.name}</p>
                <p
                  onClick={() => setShowUser(!showUser)}
                  className="text-sm font-semibold"
                >
                  Account & Lists
                </p>
                {showUser && (
                  <div className="absolute right-0 top-10 bg-white text-black shadow-lg rounded-md p-2 w-36">
                    <Link to="/orders" className="block px-3 py-2 hover:bg-gray-100">
                      Orders
                    </Link>
                    <Link to="/setting" className="block px-3 py-2 hover:bg-gray-100">
                      Settings
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCartIcon className="text-2xl" />
            {products.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-yellow-400 text-amazon_blue rounded-full px-2 text-sm">
                {products.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="sm:hidden px-4 pb-2">
        <div className="flex w-full">
          <input
            className="h-10 flex-grow px-4 rounded-l-md text-amazon_blue outline-none"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Amazon..."
          />
          <button
            onClick={handleSearch}
            className="bg-yellow-400 hover:bg-yellow-500 px-4 rounded-r-md"
          >
            <SearchIcon className="text-amazon_blue" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-amazon_blue text-white p-4">
          <Link to="/" className="block py-2">Home</Link>
          <Link to="/cart" className="block py-2">Cart</Link>
          {!user && <Link to="/login" className="block py-2">Sign In</Link>}
        </div>
      )}
    </div>
  );
};

export default Navbar;
