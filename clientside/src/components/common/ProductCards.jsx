// src/components/Card.js
import React from "react";
import "../style/homeCategories.css";
import { Link } from "react-router-dom";

const ProductsCards = ({ secondProductSet }) => {

  return secondProductSet?.map((product, index) => (
    <div className="cardid" key={index}>
      <h3>{product.name}</h3>
      <Link to={`/product/${product.name}`}>
        <img
          src={product.image_url}
          alt={product.name}
          className="card-image"
        />
      </Link>
      {product.description && <p>{product.description}</p>}
    </div>
  ));
};

export default ProductsCards;
