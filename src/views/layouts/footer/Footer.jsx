import React, { useState } from "react";
import logo from "../../../assets/assets/logo.png";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Footer = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <footer className="bg-amazon_light text-white mt-10 w-full">
      {/* Back to Top */}
      <div className="bg-gray-800 text-center py-3 cursor-pointer hover:bg-gray-700">
        <a href="#" className="text-sm">Back to Top</a>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {["Get to Know Us", "Make Money with Us", "Amazon Payment Products", "Let Us Help You"].map((section, idx) => (
            <div key={idx}>
              <button
                className="flex justify-between items-center w-full text-lg font-semibold sm:cursor-default"
                onClick={() => toggleSection(section)}
              >
                {section}
                <ExpandMoreIcon className="sm:hidden" />
              </button>

              <ul className={`mt-2 text-sm space-y-2 ${openSections[section] ? "block" : "hidden sm:block"}`}>
                <li><Link to="#" className="hover:underline">Careers</Link></li>
                <li><Link to="#" className="hover:underline">Blog</Link></li>
                <li><Link to="#" className="hover:underline">Press Releases</Link></li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-900 text-center py-4 text-sm w-full">
        <img src={logo} alt="Amazon" className="w-24 mx-auto mb-2" />
        <p>© 2025 Amazon Clone - All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
