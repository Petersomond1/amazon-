import React from 'react';
// import { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
import YouTube from "react-youtube";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './productsandservices_display_row_6_livestream_n_slider.css';
import { Link } from 'react-router-dom';
import './productsandservices_display_row_3_slider.css';
// import { NextArrow, PrevArrow } from './CustomArrows';


function ProductsAndServices_Display_Row_6_Livestream_n_Slider({ products }) {
  

  const onPlayerReady = (event) => {
    const player = event.target;
    player.pauseVideo();
  };

  const onPlayerStateChange = (event) => {
    const player = event.target;
    if (player.getPlayerState() === 2) {
      player.pauseVideo();
    }
  };
//  const row6videoIds = products.map((product) => product.videoId);
  const row6videoIds = true;
  const options = {
    height: "400",
    width: "400",
    playerVars: {
      autoplay: 1,
      pauseVideo: true,
    },
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      }
    ]
  };

   return (
    <>
      <div className='video_row_container'>
      
        <div className='livestream_n_text'>
        <div className='livestream_card'>
        {row6videoIds && row6videoIds.length > 0 && <YouTube videoId={row6videoIds[0]} opts={options} onReady={onPlayerReady} onStateChange={onPlayerStateChange} />}
        </div>
      </div>
      <div className='carousel-container_row6'>
        <Slider {...sliderSettings}>
        {products.map((product) => (
    <div key={product.id}>
    <Link to={`/ProductsAndServices_SingleDisplay/${product.id}`} key={product.id}>
    <span>{product.category}</span>
    <img src={product.image} alt={product.name}  />
    <p><small>low-prices</small>${product.price}</p>
    </Link>
  </div>
))}
        </Slider>
      </div>
      </div>
    </>
  );
};

export default ProductsAndServices_Display_Row_6_Livestream_n_Slider;
         
// In these settings:
  // 
          // dots: true enables navigation dots under the slider.
          // infinite: true makes the slider infinite.
          // speed: 500 sets the speed of the slide transition in milliseconds.
          // slidesToShow: 4 makes the slider show four images at a time.
          // slidesToScroll: 8 makes the slider scroll eight images at a time.
          // Use the Slider component in your render method and pass the settings as a prop:       
