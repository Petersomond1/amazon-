import React from "react";
import "../style/homeCategories.css";
import { Link } from "react-router-dom";

const HomeCategories = ({ categories }) => {
  console.log("this are categories", categories)
  return categories?.map((category, index) => {
    if (index < 8)
      return (
        <div className="cardid" key={index}>
          <h3>{category.name}</h3>
          <Link to={`/category/${category.name}`}>
            <img
              src={category.image}
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