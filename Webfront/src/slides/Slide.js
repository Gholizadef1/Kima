
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slide.css";
import Slider from "react-slick";
import {
  withRouter
} from "react-router-dom";
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles
} from "@material-ui/core/styles";
//import BookView from "../components/bookView/bookView";

import Tooltip from '@material-ui/core/Tooltip';
const BlueOnGreenTooltip = withStyles({
  tooltip: {
    color: "black",
    fontFamily:"Yekan",
    fontSize:20,
    backgroundColor: '#b7dee4',
    width:170,
    height:80,
    textAlign:"center",
    marginLeft:20,
    paddingTop:20,
  }
})(Tooltip);
function Slide(props) {
  console.log(props);
  const [suggestions, setSuggestions] = useState([]);
  const[favorite,setFavorite] = useState([]);
  const[discussed,setDiscussed] = useState([]);


  useEffect(() => {
    fetch("http://127.0.0.1:8000/bookdetail/")
      .then((res) => res.json())
      .then((data) => {
        setSuggestions(data);
      });
  }, []);
  useEffect(() => {

    fetch("http://127.0.0.1:8000/filter-book-rate")

      .then((res) => res.json())
      .then((data) => {
        setFavorite(data);
        console.log(data);
      });
  }, []);
  useEffect(() => {

    fetch("http://127.0.0.1:8000/filter-book-comment")

      .then((res) => res.json())
      .then((data) => {
        setDiscussed(data);
      });
  }, []);

  const bookSelectedHandler = ( b ) => {
        console.log(b);
        props.history.push( '/book/' + b.id );
  }

  let settings = {
    infinite:false,
    speed: 10,
    slidesToShow: 7,
    slidesToScroll: 4,
    

    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 7,

          slidesToScroll: 2,
          
        },
      }, 
     
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
     
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {

          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
     
    ],
  };

  
  return (
    <div className="container">

      <div class="brand" style={{fontcolor:"black",fontFamily:"Yekan"}}> کتاب‌های پیشنهادی</div> 
      {suggestions.length === 0 ? (
        <div className="spinner-border" role="status">
          <div className="sr-only">Loading...</div>
        </div>
        
      ) : (
        
       <div className = "slide ml-5">
        <Slider {...settings}>
          {suggestions.map((current) => (
            <div className="out pl-4" key={current.id}>

              <div className="card cat "onClick={() => bookSelectedHandler( current )}>
                <img
                  className="squere img-responsive" 
                  src={current.imgurl}
                
                />
   

              </div>
              <div className="body">
              {current.title.length >17 ?
<BlueOnGreenTooltip title={current.title}>
    <div className="card-title1" style={{fontWeight:"bold",color:"black",fontFamily:"Yekan"}}>{current.title}</div>
      </BlueOnGreenTooltip>
      : <div className="card-title1" style={{fontWeight:"bold",color:"black",fontFamily:"Yekan"}}>{current.title}</div>
      
} 
                <small className= "title">
                   <h5 className="card-title2"style={{fontWeight:"bold",color:"gray",fontFamily:"Yekan"}}>{current.author}</h5>

                   </small>
            </div>
            </div>
          ))}
        </Slider>
        </div>
      )}




<div class="brand" style={{fontcolor:"black",fontFamily:"Yekan"}}>محبوب‌ترین‌ها</div> 
      {favorite.length === 0 ? (

        <div className="spinner-border" role="status">
          <div className="sr-only">Loading...</div>
        </div>
        
      ) : (
        
       <div className = "slide ml-5">
        <Slider {...settings}>

          {favorite.map((current) => (

            <div className="out pl-4" key={current.id}>

              <div className="card cat "onClick={() => bookSelectedHandler( current )}>
                <img
                  className="squere img-responsive" 
                  src={current.imgurl}
                  
                />
   

              </div>
              <div className="body">
              {current.title.length >17 ?
<BlueOnGreenTooltip title={current.title}>
    <div className="card-title1" style={{fontWeight:"bold",color:"black",fontFamily:"Yekan"}}>{current.title}</div>
      </BlueOnGreenTooltip>
      : <div className="card-title1" style={{fontWeight:"bold",color:"black",fontFamily:"Yekan"}}>{current.title}</div>
      
} 
                <small className= "title">
                   <h5 className="card-title2"style={{fontWeight:"bold",color:"gray",fontFamily:"Yekan"}}>{current.author}</h5>

                   </small>
            </div>
            </div>
          ))}
        </Slider>
        </div>
      )}


<div class="brand" style={{fontcolor:"black",fontFamily:"Yekan"}}>پربحث‌ترین‌ها</div> 
            {discussed.length === 0 ? (

              <div className="spinner-border" role="status">
                <div className="sr-only">Loading...</div>
              </div>
              
            ) : (
              
             <div className = "slide ml-5">
              <Slider {...settings}>

                {discussed.map((current) => (

                  <div className="out pl-4" key={current.id}>
      
                    <div className="card cat "onClick={() => bookSelectedHandler( current )}>
                      <img
                        className="squere img-responsive" 
                        src={current.imgurl}
                        
                      />
         
      
                    </div>
                    <div className="body">
                    {current.title.length >17 ?
      <BlueOnGreenTooltip title={current.title}>
          <div className="card-title1" style={{fontWeight:"bold",color:"black",fontFamily:"Yekan"}}>{current.title}</div>
            </BlueOnGreenTooltip>
            : <div className="card-title1" style={{fontWeight:"bold",color:"black",fontFamily:"Yekan"}}>{current.title}</div>
            
      } 
                      <small className= "title">
                         <h5 className="card-title2"style={{fontWeight:"bold",color:"gray",fontFamily:"Yekan"}}>{current.author}</h5>
      
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

   