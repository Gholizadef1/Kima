import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import Cookies from 'js-cookie';
import Slider from "react-slick";
import {
  withRouter
} from "react-router-dom";
import "./Scroll.css";
import { get } from "js-cookie";

function Slide(props) {
  console.log(props);
  const [bookRead, setBookRead] = useState(null);
  const [bookReading, setBookReading] = useState(null);
  const [bookWantto, setBookWantto] = useState(null);

    const apiURLRead = "" + Cookies.get('userId');
    const apiURLReading = "" + Cookies.get('userId');
    const apiURLWantto = "" + Cookies.get('userId');

    useEffect(() => {
      axios.get(apiURLRead)
        .then((res) => res.json())
        .then((data) => {
          setBookRead(data);
        });
    }, []);

    useEffect(() => {
     axios.get(apiURLReading)
        .then((res) => res.json())
        .then((data) => {
          setBookReading(data);
        });
    }, []);

    useEffect(() => {
      axios.get(apiURLWantto)
        .then((res) => res.json())
        .then((data) => {
          setBookWantto(data);
        });
    }, []);


  const bookSelectedHandler = ( b ) => {
        console.log(b);
        props.history.push( '/book/' + b.id );
     
  }

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
    <div className="con col-xl-8">
    
      {bookRead.length === 0 ? (
        <div className="spinner-border" role="status">
          <div className="sr-only">Loading...</div>
        </div>
      ) : (
       <div className = "slid">
          <div className="brand1 text-right m-2" style={{fontFamily: 'Morvarid',fontSize:25,fontWeight:"bold",color:"black"}}> خوانده‌ام</div> 
        <Slider {...settings}>
          {bookRead.map((current) => (
            <div className="out" key={current.id}>
              <div className="card car"onClick={() => bookSelectedHandler( current )}>
                <img
                  className="squer" 
                  src={current.imgurl}
                  height={56}
                  width={56}
                />
                <small className= "title">
                  <b className="card-titl0" style={{fontFamily: 'Morvarid',fontWeight:"bold",color:"black"}}>{current.title}</b>
                   <h5 className="card-titl1"style={{fontFamily: 'Morvarid',fontWeight:"bold",color:"black"}}>{current.author}</h5>
                   </small>
              </div>
            </div>
          ))}
        </Slider>
        </div>
      )}
    
      {bookReading.length === 0 ? (
        <div className="spinner-border" role="status">
          <div className="sr-only">Loading...</div>
        </div>
      ) : (
       <div className = "slid">
           <div className="brand1 text-right m-2" style={{fontFamily: 'Morvarid',fontSize:25,fontWeight:"bold",color:"black"}}> درحال خواندن</div> 
        <Slider {...settings}>
          {bookReading.map((current) => (
            <div className="out" key={current.id}>
              <div className="card car"onClick={() => bookSelectedHandler( current )}>
                <img
                  className="squer" 
                  src={current.imgurl}
                  height={56}
                  width={56}
                />
                <small className= "title">
                  <b className="card-titl0" style={{fontFamily: 'Morvarid',fontWeight:"bold",color:"black"}}>{current.title}</b>
                   <h5 className="card-titl1"style={{fontFamily: 'Morvarid',fontWeight:"bold",color:"black"}}>{current.author}</h5>
                   </small>
              </div>
            </div>
          ))}
        </Slider>
        </div>
      )}
     
      {bookWantto.length === 0 ? (
        <div className="spinner-border" role="status">
          <div className="sr-only">Loading...</div>
        </div>
      ) : (
       <div className = "slid">
      <div className="brand1 text-right m-2" style={{fontFamily: 'Morvarid',fontSize:25,fontWeight:"bold",color:"black"}}> می‌خواهم بخوانم</div> 
        <Slider {...settings}>
          {bookWantto.map((current) => (
            
            <div className="out" key={current.id}>
              
              <div className="card car"onClick={() => bookSelectedHandler( current )}>
                
                <img
                  className="squer" 
                  src={current.imgurl}
                  height={56}
                  width={56}
                />
                <small className= "title">
                  <b className="card-titl0" style={{fontFamily: 'Morvarid',fontWeight:"bold",color:"black"}}>{current.title}</b>
                   <h5 className="card-titl1"style={{fontFamily: 'Morvarid',fontWeight:"bold",color:"black"}}>{current.author}</h5>
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

export default withRouter(Slide);