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
import Tabs from "./multiTabs"
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
//import { ajax } from 'jquery';
//import { data } from 'jquery';


function BookView(props) {
    let { bookId } = useParams();

    //const bookId= props.match.params.id;    //console.log(bookId);
    //console.log(bookId.name);
    const [userCoice, setUserCoice]= useState("");

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

    const[openSnack,setOpenSnack]=useState(false);
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

  const [value, setValue] = useState();
  const [hover, setHover] = useState(-1);
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
                    average_rating_count:response.data.average_rating_count,
                    average_rating:response.data.average_rating,
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
                })
                .catch(function (error) {
                    console.log(error);
                    
                });
            axios.get('http://127.0.0.1:8000/bookdetail/' + props.match.params.bookId+'/getstate',
            {headers:{

                "Content-Type":"application/json",
                "Authorization":"Token "+Cookies.get("userToken")}
                 }
                 )
                 .then(function (response) {
                    //console.log(response);
                    setUserCoice(response.data.book_state);
                    //console.log(response.data.book_state);
                    document.getElementById(response.data.book_state).selected=true;
                 })
                 .catch(function (error) {
                    console.log(error);
                    
                });

        }
    },[] );
    const addBookToMineHandler = (choices)=>{
        //console.log(choices.target.value);
        //console.log(choices);
        setUserCoice(choices.target.value);
        //console.log(userCoice);
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

            setOpenSnack(true);
            //console.log(response);
        })
        .catch(function (error) {
           console.log(error);
        });
    

    }

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }
        setOpenSnack(false);
      };

    // const handleClickSnack = () => {
    //     setOpenSnack(true);
    //   };
    //console.log(state.id);
    //console.log(state.title);
    //console.log(response.data.title);

    const bo = Number.isInteger(value);
    console.log(bo);
    console.log(value);
    async function Sendrequest (e) {
        //console.log(event);
    await setValue(e.target.value);
        console.log(e.target.value);
    const payload={
        "rate":value,
    }
    console.log(payload);
  let back= JSON.stringify(payload);
    console.log(back);
        axios.post('http://127.0.0.1:8000/api/bookrating/' + props.match.params.bookId,
        back,{
            headers:{
           "Content-Type":"application/json",
           "Authorization":"Token "+Cookies.get("userToken")}
            },)
   
    }
        useEffect(() => {
                axios.get('http://127.0.0.1:8000/api/bookrating/' + props.match.params.bookId
                ,{
                headers:{
            "Content-Type":"application/json",
           "Authorization":"Token "+Cookies.get("userToken")}
                    })
                    .then(data => {
                      
                      setValue(data);
                      console.log(data.data);
                      console.log(setValue(data));
                    //   console.log(setValue(data))
                }).catch(error =>{
                    console.log(error)
                });
            
    },[] );


    return(
      <div>
        <div className="container-fluid col-8 rTOl text-right " >
            <div className="row no-gutters position-relative shadow color1 table-borderless my-1">
                <div className="col-md-4 mb-md-0 p-md-4 p-sm-4">
                    <img src={state.imgurl} className=" img-fluid shadow float-right" alt=""  style={{width:'100%',height:'auto'}} />
                </div>
                <div className="col-md-8 position-static p-4 pl-md-0 d-flex flex-column p-3">

                <h2 style={{fontFamily:'Mitra'}}>{state.title}</h2>
                <table className="mt-auto table table-hover text-right" >
                  <tbody >
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
                       
                        {state.average_rating_count}
                        </th>
                       
                    </tr>
                    <tr>
                        <th style={{fontFamily:'Mitra'}}>
                        به این کتاب رای دهید

                        </th>
                        <th>
                            <div className={classes.root}>
                              <Rating
                               value={value}
                                name="hover-feedback"
                                precision={1}
                                size="large"
                                onChange={(event,newValue)=>{
                                    setValue(newValue)
                                }}
                              />
                              <button onClick={Sendrequest}></button>
                            </div>
                        </th>
                    </tr>
                  </tbody>
                </table>
                    <div className="row" style={{fontFamily:'Morvarid'}}>
                    <label className="col-10 mr-2" >به کتاب‌های خود اضافه کنید:</label>
                    <select className="form-control mr-4 rounded-pill" style={{width:150}} id="bookMood" onChange={ addBookToMineHandler} >
                        <option id="none" value="none">هیچکدام</option>
                        <option id="ToRead" value="ToRead">می‌خواهم بخوانم</option>
                        <option id="Reading" value="Reading">دارم می‌خوانم</option>
                        <option id="Read" value="Read">خوانده‌ام</option>
                    </select>
                    <div>
                        <Snackbar
                            anchorOrigin={{ vertical:'bottom', horizontal:'center'}}
                            open={openSnack}
                            autoHideDuration={3000}
                            onClose={handleCloseSnack}
                            message={selectMassage}
                          />
                    </div>
                   
                    </div>
                </div> 
            </div>
             <div className="Tab color1 my-3 mb-5">
                <Tabs book={state.id} bookdescription={state.description}/>
            </div>
        </div>
      </div>
    )
}


export default withRouter(BookView);