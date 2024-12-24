// src/components/Card.js
import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { Tag } from "primereact/tag";
import "../style/card.css";
import { Link } from "react-router-dom";

const Card = ({ fourthProductSet }) => {
  const [products, setProducts] = useState([]);
  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };

  useEffect(() => {
    setProducts(fourthProductSet.slice(0, 9));
  }, []);

  const productTemplate = (product) => {
    return (
      <div className=" product-template border-1 surface-border border-round m-2 text-center py-5 px-3 h-72">
        <div className="mb-3">
          <Link to={`/product/${product.name}`}>
            <img
              src={product.image_url}
              alt={product.name}
              className="card_image"
            />
          </Link>
        </div>
        <div>
          <h4 className="">{product.name}</h4>
          <h6 className="mt">${product.price}</h6>
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <Carousel
        value={products}
        numVisible={3}
        numScroll={3}
        responsiveOptions={responsiveOptions}
        itemTemplate={productTemplate}
      />
    </div>
  );
};

export default Card;