import React, {useState,useEffect, Children} from 'react';
import axios from 'axios';
//import {API_BASE_URL} from '../../constants/apiContants';
import {
    //BrowserRouter as Router,
    // Switch,
    // Route,
    // Link,
    // useRouteMatch,
    useParams,
    withRouter
  } from "react-router-dom";
import './bookView.css';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Cookies from 'js-cookie';
import RatingStars from "../../Components/RatingStars";
import { data, event } from 'jquery';
//import { data } from 'jquery';

function BookView(props) {
    let { bookId } = useParams();

    //const bookId= props.match.params.id;
    console.log(bookId);
    //console.log(bookId.name);
    
    const [userCoice, setUserCoice]= useState();

    const [selectMassage, setSelectMassage]= useState(<br></br>);

    const [state , setState] = useState(
        {
        //bookId:props.match.params.id,
        author: "",
        avgrating: "",
        description: "",
        id: "",
        imgurl: "",
        numpages: "",
        publisher: "",
        ratecount: "",
        smallimgurl: "",
        title:""
    }
    );
    const [current , setCurrent] = useState(
        { 
           rate:"",
        });

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };
  
  const useStyles = makeStyles({
    root: {
      width: 200,
      display: 'flex',
      paddingLeft:59,
      height:22,
      alignItems: 'center',
      direction:"ltr",
    },
  });

  const [value, setValue] = React.useState();
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();  
  
    //console.log(useParams);
    //onsole.log(props);
    //const {bookId} = props.match.params;
    useEffect(() => {
        if (props.match.params.bookId) {       
            axios.get('http://127.0.0.1:8000/bookdetail/' + props.match.params.bookId)
                .then(response => {
                  //console.log(response);
                  //console.log(response.data);
                  //console.log(response.data.title);
                  setState({ 
                    author: response.data.author,
                    avgrating: response.data.avgrating,
                    description: response.data.description,
                    id: response.data.id,
                    imgurl: response.data.imgurl,
                    numpages: response.data.numpages,
                    publisher: response.data.publisher,
                    ratecount: response.data.ratecount,
                    smallimgurl: response.data.smallimgurl,
                    title:response.data.title
                    });
                });

        }
    },[] );
    const addBookToMineHandler = (choices)=>{
        console.log(choices.target.value);
        console.log(choices);
        setUserCoice(choices.target.value);
        console.log(userCoice);
        const payload={
            "book_state": choices.target.value,
        }
        const back= JSON.stringify(payload);
        axios.post('http://127.0.0.1:8000/bookdetail/' + props.match.params.bookId,
        back,{
            headers:{
           "Content-Type":"application/json",
           "Authorization":"Token "+Cookies.get("userToken")}
            })
        .then(function (response){

            if(response.data=== "successfully added"){
                setSelectMassage("کتاب به مجموعه شما اضافه شد");

            }else if (response.data==="successfully changed state"){
                setSelectMassage("کتاب به لیست دیگری از مجموعه شما اضافه شد");

            }else if (response.data==="successfully deleted from collection"){
                setSelectMassage("کتاب از مجموعه شما حذف شد");

            }
            else if (response.data==="this book is already here"){
                setSelectMassage("قبلاً اضافه کرده اید");

            }else console.log(response.data);

            console.log(response);
        })
        .catch(function (error) {
           console.log(error);
        });
    

    }
    //console.log(state.id);
    //console.log(state.title);
    //console.log(response.data.title);
    const bo = Number.isInteger(value);
    console.log(bo);
    const Setval = (event, newValue) => {
        setValue(newValue);
    }
    const store={
        "rate": value,
    }
    const rating= JSON.stringify();

    useEffect(() => {
        axios.post('http://127.0.0.1:8000/api/bookrating/' + props.match.params.bookId,
        rating,{
            headers:{
         "Content-Type":"application/json",
           "Authorization":"Token "+Cookies.get("userToken")}
            })
            console.log(typeof(value));
    },[] );
        useEffect(() => {
            if (props.match.params.bookId) {       
                axios.get('http://127.0.0.1:8000/api/bookrating/' + props.match.params.bookId
                ,{
                headers:{
            "Content-Type":"application/json",
           "Authorization":"Token "+Cookies.get("userToken")}
                    })
                    .then(data => {
                      setCurrent({ 
                        rate:data[0],
                    });
                    console.log(data);
                    
                });
        }
    },[] );


    return(
        
        <div className="container-fluid col-8 rTOl text-right " >
            <div className="d-flex flex-row shadow color1 table-borderless my-1">
                

                <img src={state.imgurl} className="m-3 img-fluid col-3 shadow float-right" alt="" />
                <div className="d-flex col-6 flex-column p-3">

                <h2 style={{fontFamily:'Mitra'}}>{state.title}</h2>
                <table className="mt-auto table table-hover text-right" >
                  <tbody >
                    {/* <tr >
                        <th >
                            نام کتاب
                        </th>
                        <td>
                            {state.title}
                        </td>
                    </tr> */}
                    <tr>
                        <th style={{fontFamily:'Mitra'}}>
                            نام نویسنده
                        </th>
                        <th style={{fontFamily:'Mitra'}}>
                            {state.author}
                        </th>
                    </tr>
                    <tr>
                        <th style={{fontFamily:'Mitra'}}>
                            نام ناشر
                        </th>
                        <th style={{fontFamily:'Mitra'}}>
                            {state.publisher}
                        </th>
                    </tr>
                    <tr>
                        <th style={{fontFamily:'Mitra'}}>
                    امتیاز این کتاب: 
                        </th>
                        <th style={{fontFamily:'Mitra'}}>
                        {current.rate}  
                        </th>
                       
                    </tr>
                    <tr>
                        <th style={{fontFamily:'Mitra'}}>
                        به این کتاب رای دهید

                        </th>
                        <th>
                        
    <div className={classes.root}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        size="large"
        onChange={Setval}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
    </div>
                        </th>
                    </tr>
                  </tbody>
                </table>
                <div className="row" style={{fontFamily:'Mitra'}}>
                    <label className="col-10 mr-2" style={{fontFamily:"Mitra"}}>به کتاب‌های خود اضافه کنید:</label>
                    <select className="form-control mr-4 col-6" id="bookMood"onChange={ addBookToMineHandler}>
                        <option value="none"style={{fontFamily:"Mitra"}}>هیچکدام</option>

                        <option value="ToRead"style={{fontFamily:"Mitra"}}>می‌خواهم بخوانم</option>
                        <option value="Reading"style={{fontFamily:"Mitra"}}>دارم می‌خوانم</option>
                        <option value="Read"style={{fontFamily:"Mitra"}}>خوانده‌ام</option>
                    </select>

                <small className="col-12 text-muted mt-2">{selectMassage}</small>


                </div>
               
                {/* <div class="input-group-prepend ">
                    <button class="btn btn-outline-secondary" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><h3>+</h3></button>
                    <div class="dropdown-menu">
                        <button className="dropdown-item" onClick={()=>addBookToMineHandler('toRead')}>می‌خواهم بخوانم</button>
                        <button className="dropdown-item" onClick={()=>addBookToMineHandler('reading')}>دارم می‌خوانم</button>
                        <button className="dropdown-item" onClick={()=>addBookToMineHandler('read')}>خوانده‌ام</button>
                    </div>
                </div> */}
            </div> 
        </div>

            <nav className="shadow navbar navbar-expand-sm navbar-light color3">  
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="#bookDescription" style={{fontFamily:"Mitra"}}>توضیح</a>
                    </li>
                    {/* <li className="nav-item">
                        <a className="nav-link" href="#bookCriticism">نقد</a>
                     </li> */}
    
                </ul>
            </nav>

            <div id="bookDescription" className="shadow color1 p-2">
                <br></br>
                <h3 style={{fontFamily:"Mitra"}}>توضیح کتاب {state.title}</h3>
                <br></br>
                <p style={{fontFamily:"Mitra"}}>
                    {state.description}
                    <br></br>
                </p>
            </div>
            {/* <div id="bookCriticism" className="color1 p-2">
                <br></br>
                <h3>نقد کتاب {state.title}</h3>
                <br></br>
                <p>


                    <br></br>
                </p>
            </div> */}






        </div>

    )
        }



export default withRouter(BookView);