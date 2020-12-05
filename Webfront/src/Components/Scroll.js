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
  const [bookRead, setBookRead] = useState([]);
  const [bookReading, setBookReading] = useState([]);
  const [bookWantto, setBookWantto] = useState([]);
 
    const apiURLRead = `http://127.0.0.1:8000/api/user-profile/${Cookies.get('userId')}/Read`;
    const apiURLReading = `http://127.0.0.1:8000/api/user-profile/${Cookies.get('userId')}/Reading`;
    const apiURLWantto = `http://127.0.0.1:8000/api/user-profile/${Cookies.get('userId')}/ToRead`;
    useEffect(() => {
      axios.get(apiURLRead,{
        headers:{
          "Content-Type":"application/json",
       "Authorization":"Token "+Cookies.get("userToken")}
        })
        .then((data) => {
          setBookRead(data.data);
        });
    }, []);

    useEffect(() => {
      axios.get(apiURLReading,{
        headers:{
          "Content-Type":"application/json",
       "Authorization":"Token "+Cookies.get("userToken")}
        })
        .then((data) => {
          setBookReading(data.data);
        });
    }, []);

    useEffect(() => {
      axios.get(apiURLWantto,{
        headers:{
          "Content-Type":"application/json",
       "Authorization":"Token "+Cookies.get("userToken")}
        })
        .then((data) => {
          setBookWantto(data.data);
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
    <div className="con col-xl-8 col-xl-8-gholi">
              <div className="brand1 text-right m-2" style={{fontFamily: 'Morvarid',fontSize:25,fontWeight:"bold",color:"black"}}> خوانده‌ام</div> 

      {bookRead.length === 0 ? (
        <div>چیزی اضافه نشده‌است</div>
      ) : (
       <div className = "slid">
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
    <div className="brand1 text-right m-2" style={{fontFamily: 'Morvarid',fontSize:25,fontWeight:"bold",color:"black"}}> درحال خواندن</div> 
      {bookReading.length === 0 ? (
        <div>چیزی اضافه نشده‌است</div>
      ) : (
       <div className = "slid">

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
           <div className="brand1 text-right m-2" style={{fontFamily: 'Morvarid',fontSize:25,fontWeight:"bold",color:"black"}}> می‌خواهم بخوانم</div> 

      {bookWantto.length === 0 ? (
          <div>چیزی اضافه نشده است</div>
      ) : (
       <div className = "slid">
        <Slider {...settings}>
          {bookWantto.map((current) => (
            
            <div className="out" key={current.id}>
             {/* <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0 mt-3"> */}
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
              {/* </div> */}
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