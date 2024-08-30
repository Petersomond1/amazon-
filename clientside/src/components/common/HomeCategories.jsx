import React from "react";
// import "../styles/homeCategories.css";
import { Link } from "react-router-dom";

const HomeCategories = ({ categories }) => {
  return categories?.map((category, index) => {
    if (index < 8)
      return (
        <div className="cardid" key={index}>
          <h3>{category.name}</h3>
          <Link to={`/category/${category.name}`}>
            <img
              src={category.image_url}
              alt={category.name}
              className="card-image"
            />
          </Link>
          <Link to={`/category/${category.name}`}>
            <p>See more</p>
          </Link>
        </div>
      );
  });
};

export default HomeCategories;