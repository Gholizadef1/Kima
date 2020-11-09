import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slide.css";
import Slider from "react-slick";

function Slide() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/bookdetail/")
      .then((res) => res.json())
      .then((data) => {
        setSuggestions(data);
      });
  }, []);

  let settings = {
    infinite: false,
    speed: 10,
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 4,

    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <div className="container">
      <div class="brand">کتاب‌های پیشنهادی</div> 
      {suggestions.length === 0 ? (
        <div className="spinner-border" role="status">
          <div className="sr-only">Loading...</div>
        </div>
        
      ) : (
        
       <div className = "slide">
        <Slider {...settings}>
          {suggestions.map((current) => (
            <div className="out" key={current.id}>
              <div className="card cat">
                <img
                  className="squere" 
                  src={current.imgurl}
                  height={56}
                  width={56}
                />
                <small className= "title">
                  <b className="card-title1">{current.title}</b>
                   <h5 className="card-title2">{current.author}</h5>
                   </small>
              </div>
            </div>
          ))}
        </Slider>
        </div>
      )}
    </div>
  );
}

export default Slide;