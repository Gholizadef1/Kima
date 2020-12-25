import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slide.css";
import Slider from "react-slick";
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  // Link,
  // useRouteMatch,
  // useParams,
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
    fontFamily:"Mitra",
    fontSize:20,
    backgroundColor: "lightblue",
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
  //let match=useRouteMatch();
  //console.log(useRouteMatch())


  useEffect(() => {
    fetch("http://127.0.0.1:8000/bookdetail/")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setSuggestions(data);
      });
  }, []);

  const bookSelectedHandler = ( b ) => {
        console.log(b);
        props.history.push( '/book/' + b.id );
      //   return (
      //     <div>
      //         <Link to={'/book/' + b.id} key={b.id}> </Link>
      //         {/* <section className="Posts">
      //             {suggestions}
      //         </section>
      //         <Route path={props.match.url + '/:id'} exact component={BookView} /> */}
      //     </div>
      // );
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
    <div className="container">

      <div class="brand" style={{fontSize:25,fontWeight:"bold",color:"black"}}>کتاب‌های پیشنهادی</div> 
      {suggestions.length === 0 ? (
        <div className="spinner-border" role="status">
          <div className="sr-only">Loading...</div>
        </div>
        
      ) : (
        
       <div className = "slide">
        <Slider {...settings}>
          {suggestions.map((current) => (
            <div className="out" key={current.id}>

              <div className="card cat"onClick={() => bookSelectedHandler( current )}>
                <img
                  className="squere" 
                  src={current.imgurl}
                  height={56}
                  width={56}
                />
      {current.title.length >19 ?
<BlueOnGreenTooltip title={current.title}>
<div className="card-title1" style={{fontWeight:"bold",color:"black"}}>{current.title}</div>
      </BlueOnGreenTooltip>
      : <div className="card-title1" style={{fontWeight:"bold",color:"black"}}>{current.title}</div>
      
} 
                <small className= "title">
                   <h5 className="card-title2"style={{fontWeight:"bold",color:"black"}}>{current.author}</h5>

                   </small>

              </div>
            </div>
          ))}
        </Slider>
        </div>
      )}

      <div class="brand" style={{fontcolor:"black",fontFamily:"Yekan"}}>پربحث‌ترین‌ها</div> 
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
            </div>
  );
}

export default withRouter(Slide);