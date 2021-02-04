import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import Cookies from 'js-cookie';
import Slider from "react-slick";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'
import {API_BASE_URL} from '../constants/apiContants';

import {
  withRouter
} from "react-router-dom";
import "./Scroll.css";
import { get } from "js-cookie";
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles
} from "@material-ui/core/styles";

import Tooltip from '@material-ui/core/Tooltip';
function Slide(props) {
  console.log(props);
  const [bookRead, setBookRead] = useState([]);
  const [bookReading, setBookReading] = useState([]);
  const [bookWantto, setBookWantto] = useState([]);
 
  const apiURLRead = API_BASE_URL + `/user/${Cookies.get('userId')}/collection?type=Read`;
  const apiURLReading = API_BASE_URL + `/user/${Cookies.get('userId')}/collection?type=Reading`;
  const apiURLWantto = API_BASE_URL + `/user/${Cookies.get('userId')}/collection?type=ToRead`;
    useEffect(() => {
      axios.get(apiURLRead,{
        headers:{
          "Content-Type":"application/json",
       "Authorization":"Token "+Cookies.get("userToken")}
        })
        .then((data) => {
          console.log(data.data.data);
          console.log(data.data.Count);
          setBookRead(data.data.data);
        });
    }, []);

    useEffect(() => {
      axios.get(apiURLReading,{
        headers:{
          "Content-Type":"application/json",
       "Authorization":"Token "+Cookies.get("userToken")}
        })
        .then((data) => {
          setBookReading(data.data.data);
        });
    }, []);

    useEffect(() => {
      axios.get(apiURLWantto,{
        headers:{
          "Content-Type":"application/json",
       "Authorization":"Token "+Cookies.get("userToken")}
        })
        .then((data) => {
          setBookWantto(data.data.data);
        });
    }, []);


  const bookSelectedHandler = ( b ) => {
        console.log(b);
        props.history.push( '/book/' + b.id );
     
  }
  const BlueOnGreenTooltip = withStyles({
    tooltip: {
      color: "black",
      fontFamily:"Yekan",
      fontSize:14,
      backgroundColor: "lightblue",
      width:120,
      height:80,
      textAlign:"center",
      marginLeft:20,
      paddingTop:23,
    }
  })(Tooltip);

  let settings = {
    infinite: false,
    speed: 10,
    arrows: true,
    slidesToShow: 4,
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
        breakpoint: 360,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  
  return (
   
    <ListItem alignItems="flex-start">
    <ListItem
      alignItems="flex-start"
      style={{direction:"rtl"}}
     >
    
      <ListItemText style={{textAlign:"right"}}
        primary={
          <List  >
            <div className="">
              
             <div className="brand1 mb-md-3 ml-sm-5 mt-sm-1" style={{fontFamily: 'Yekan',fontWeight:"bold",color:"black",fontSize:22}}> خوانده‌ام</div> 

      {bookRead.length === 0 ? (
<div>
        <div className="subbrand1 mt-sm-n4 ml-sm-5 pt-md-3" style={{fontFamily:'Yekan',fontSize:20,fontWeight:"bold",color:"red"}}>کتابی اضافه نشده‌است </div>
</div>
      ) : (
       <div className = "slid ">
        <Slider {...settings}>
          {bookRead.map((current) => (
            <div className="out"  key={current.id}>
              <div className="card car"onClick={() => bookSelectedHandler( current )}>
                <img
                  className="squer img-responsive" 
                  src={current.imgurl}
               
                />
                </div>
                <div className="body">
                     {current.title.length >17 ?
<BlueOnGreenTooltip title={current.title}>
<div className="card-title3" style={{fontWeight:"bold",color:"black"}}>{current.title}</div>
      </BlueOnGreenTooltip>
      : <div className="card-title3" style={{fontWeight:"bold",color:"black"}}>{current.title}</div>
      
} 
              <small className= "title0">
                   <h5 className="card-title2"style={{fontWeight:"bold",color:"gray",fontFamily:"Yekan"}}>{current.author}</h5>

                   </small>                   
              </div>
              </div>
          ))}
            </Slider>
            </div>
      )
        }
    
    <div className="brand2 mb-5 mt-5 ml-sm-5 mt-sm-2" style={{fontFamily: 'Yekan',fontWeight:"bold",color:"black",fontSize:22}}> دارم می‌خوانم</div> 
      {bookReading.length === 0 ? (
        <div>
       
        <div className="subbrand2 mt-1 mt-sm-n4 ml-sm-5 pb-2" style={{fontFamily:'Yekan',fontWeight:"bold",color:"red",fontSize:20}}>کتابی اضافه نشده‌است</div>
</div>
      ) : (
         <div className = "slid">
          <Slider {...settings}>
            {bookReading.map((current) => (
              <div className="out" key={current.id}>
                <div className="card car"onClick={() => bookSelectedHandler( current )}>
                  <img
                    className="squer img-responsive" 
                    src={current.imgurl}
                 
                  />
                  </div>
                  <div className="body">
                       {current.title.length >17 ?
  <BlueOnGreenTooltip title={current.title}>
  <div className="card-title3" style={{fontWeight:"bold",color:"black"}}>{current.title}</div>
        </BlueOnGreenTooltip>
        : <div className="card-title3" style={{fontWeight:"bold",color:"black"}}>{current.title}</div>
        
  } 
                <small className= "title0">
                     <h5 className="card-title2"style={{fontWeight:"bold",color:"gray",fontFamily:"Yekan"}}>{current.author}</h5>
  
                     </small>                   
                </div>
                </div>
            ))}
              </Slider>
              </div>
      )
          }

           <div className="brand3 text-right ml-1 ml-sm-5 mb-5 pb-1 mt-1" style={{fontFamily: 'Yekan',fontWeight:"bold",color:"black",fontSize:22}}> می‌خواهم بخوانم</div> 

      {bookWantto.length === 0 ? (
        <div>
       
          <div className="subbrand3  mt-sm-n4 ml-sm-5" style={{fontFamily:'Yekan',fontWeight:"bold",color:"red",fontSize:20}}>کتابی اضافه نشده‌است</div>
</div>
      ) : (
         <div className = "slid">
          <Slider {...settings}>
            {bookWantto.map((current) => (
              <div className="out" key={current.id}>
                <div className="card car"onClick={() => bookSelectedHandler( current )}>
                  <img
                    className="squer img-responsive" 
                    src={current.imgurl}
                 
                  />
                  </div>
                  <div className="body">
                       {current.title.length >17 ?
  <BlueOnGreenTooltip title={current.title}>
  <div className="card-title3" style={{fontWeight:"bold",color:"black"}}>{current.title}</div>
        </BlueOnGreenTooltip>
        : <div className="card-title3" style={{fontWeight:"bold",color:"black"}}>{current.title}</div>
        
  } 
                <small className= "title0">
                     <h5 className="card-title2"style={{fontWeight:"bold",color:"gray",fontFamily:"Yekan"}}>{current.author}</h5>
  
                     </small>                   
                </div>
                </div>
            ))}
              </Slider>
              </div>
      )
          }
      
      
</div>
</List>
             }
            />
            </ListItem>
            </ListItem>
    );
          }

export default withRouter(Slide);