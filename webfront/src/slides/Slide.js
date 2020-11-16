import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slide.css";
import Slider from "react-slick";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  withRouter
} from "react-router-dom";
import BookView from "../components/bookView/bookView";

function Slide(props) {
  //console.log(props);
  const [suggestions, setSuggestions] = useState([]);
  //let match=useRouteMatch();
  //console.log(useRouteMatch())


  useEffect(() => {
    fetch("http://127.0.0.1:8000/bookdetail/")
      .then((res) => res.json())
      .then((data) => {
        setSuggestions(data);
      });
  }, []);

  const bookSelectedHandler = ( b ) => {
        //console.log(b);
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
      <b className="slider-brand">Random Books</b>
      {suggestions.length === 0 ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <Slider {...settings}>
          {suggestions.map((current) => (
            <div className="out" key={current.id}>
              <div className="card cat" onClick={() => bookSelectedHandler( current )} >
                <img
                  className="squere " 
                  alt={"users here"}
                  src={current.imgurl}
                  height={56}
                  width={56}
                />
                <div className="card-body ">
                  <h5 className="card-text title-sm-center ">{current.username}</h5>
                  <small className="card-text text-sm-center text-muted">
                    In your contacts
                  </small>
                  <br />
                </div>
                
              </div>
            </div>
          ))}
        </Slider>
      )}

{/* 
      <Switch>
        <Route path={`${match.path}/:bookId`}>
          <BookView/>
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch> */}

    </div>
  );
}

export default withRouter(Slide);