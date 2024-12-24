import React from "react";

const FourthDataCard = ({ key, description, name, image, price, stock }) => {
  return (
    <div className=" m-5 h-60  w-60" key={key}>
      <img src={image} alt={name} className="w-full h-full" />
    </div>
  );
};

export default FourthDataCard;
