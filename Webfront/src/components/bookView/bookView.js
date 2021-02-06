import React, {useState,useEffect, Children} from 'react';
import axios from 'axios';
import Tooltip from '@material-ui/core/Tooltip';
import {API_BASE_URL} from '../../constants/apiContants';
import {
//BrowserRouter as Router,
// Switch,
// Route,
// Link,
// useRouteMatch,
useParams,
withRouter
} from "react-router-dom";
//import {IoMdCheckmarkCircleOutline} from "react-icons/io";
import {withStyles } from '@material-ui/core/styles';
import './bookView.css';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
//import Box from '@material-ui/core/Box';
import Cookies from 'js-cookie';
//import RatingStars from "../../Components/RatingStars";

//import { data, event, noConflict } from 'jquery';

import Tabs from "./multiTabs"
//import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
//import { ajax } from 'jquery';
//import { data } from 'jquery';


function BookView(props) {

let { bookId } = useParams();

//const bookId= props.match.params.id; //console.log(bookId);
//console.log(bookId.name);
const [userCoice, setUserCoice]= useState("");

const [selectMassage, setSelectMassage]= useState(<br></br>);

const [state , setState] = useState(
{
//bookId:props.match.params.id,
author: "",
average_rating:"",
average_rating_count:"",
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
paddingLeft:23,
height:22,
alignItems: 'center',
direction:"ltr",
},
});

const [value, setValue] = useState(0);
const [hover, setHover] = useState(-1);
const [update,setUpdate] = useState();
const [mess, setMess] = useState("");
const [num, setNum] = useState();
const classes = useStyles();

//console.log(useParams);
//onsole.log(props);
//const {bookId} = props.match.params;
useEffect(() => {
if (props.match.params.bookId) {
axios.get(API_BASE_URL + '/book/' + props.match.params.bookId,
{
  headers:{
 "Authorization":"Token "+Cookies.get("userToken")}
  })
.then(response => {
console.log(response);
//console.log(response.data);
//console.log(response.data.title);
setState({
author: response.data.data.author,
average_rating_count:response.data.data.average_rating_count,
average_rating:response.data.data.average_rating,
avgrating: response.data.data.avgrating,
description: response.data.data.description,
id: response.data.data.id,
imgurl: response.data.data.imgurl,
numpages: response.data.data.numpages,
publisher: response.data.data.publisher,
ratecount: response.data.data.ratecount,
smallimgurl: response.data.data.smallimgurl,
title:response.data.data.title
});

setUserCoice(response.data.book_state);
document.getElementById(response.data.book_state).selected=true;

})
.catch(function (error) {
console.log(error);

});
// axios.get(API_BASE_URL + '/book/' + props.match.params.bookId+'/getstate',
// {headers:{

// "Content-Type":"application/json",
// "Authorization":"Token "+Cookies.get("userToken")}
// }
// )
// .then(function (response) {
// //console.log(response);
// setUserCoice(response.data.book_state);
// //console.log(response.data.book_state);
// document.getElementById(response.data.book_state).selected=true;
// })
// .catch(function (error) {
// console.log(error);

// });


}
},[state,props.match.params.bookId] );

// const StyledButton = withStyles({
//     root: {
//       background: 'linear-gradient(45deg, #7eccb7 30%, #4a8a96  90%)',
//       borderRadius: 10,
//       border: 10,
//       color: 'black',
//       height: 10,
//       padding: '0 30px',
//       boxShadow: '5px 3px 4px 2px rgba(34, 33, 35, 0.3)',

//     },
//   })(Button);
  const BlueOnGreenTooltip = withStyles({
    tooltip: {
      color: "black",
      fontSize:15,
      backgroundColor: "lightblue",
      width:100,
      height:50,
      textAlign:"center",
      marginLeft:20,
      paddingTop:10,
    }

  })(Tooltip);
const addBookToMineHandler = (choices)=>{
//console.log(choices.target.value);
//console.log(choices);
setUserCoice(choices.target.value);
//console.log(userCoice);
const payload={
"book_id": props.match.params.bookId,
}
const back= JSON.stringify(payload);
axios.post(API_BASE_URL + '/user/' + Cookies.get("userId") + '/collection?type=' + choices.target.value,
back
,{
headers:{
"Content-Type":"application/json"
}
}
)
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
// setOpenSnack(true);
// };
//console.log(state.id);
//console.log(state.title);
//console.log(response.data.title);

const bo = Number.isInteger(value);
//console.log(bo);
//console.log(value);
const Sendrequest =()=>{
  console.log(mess);
  if(mess === "No User Rating!"){
  const payload={
    "rate":value,
    }
    console.log(payload);
    let back= JSON.stringify(payload);
    console.log(back);
    console.log(value);
    axios.post(API_BASE_URL + `/book/${props.match.params.bookId}/rate`,
payload,{
headers:{
"Content-Type":"application/json",
"Authorization":"Token "+Cookies.get("userToken")}
}).then((data)=>{
  setMess(data.message);
    setSelectMassage("امتیاز شما با مؤفقیت ثبت شد");
    setOpenSnack(true);
})
}
    
 else if(num!=0) {
  const load={
    "rate":value,
    }
    console.log(load);
    let bac= JSON.stringify(load);
    console.log(bookId);
    console.log(bac);
    console.log(value);
    axios.put(API_BASE_URL + `/book/${props.match.params.bookId}/rate`,
    load,{
    headers:{
    "Content-Type":"application/json",
    "Authorization":"Token "+Cookies.get("userToken")}
    },)
      setSelectMassage("امتیاز شما با مؤفقیت عوض شد");
      setOpenSnack(true);
}
}



useEffect(() => {
  axios.get(API_BASE_URL + `/book/${props.match.params.bookId}/rate`
  ,{
  headers:{
  "Content-Type":"application/json",
  "Authorization":"Token "+Cookies.get("userToken")}
  })
  .then(data => {
  setValue(data.data.data);
  setMess(data.data.message);
  setNum(data.data.data)
  console.log(data.data.message);
  console.log(data.data.data);
  console.log(data.message);
  console.log(data);
  const b = typeof(data.data);
  console.log(b);
  }).catch(error =>{
  console.log(error)
  });
  }, []);

return(
<div className="mx-md-5 px-md-5">

  <div className="container-fluid rTOl text-right px-md-5 rounded-lg" >
    <div className="mx-md-5 my-md-5">
    <div className=" row no-gutters position-relative shadow border color1 table-borderless my-1 mx-md-5 rounded-lg" style={{fontSize:16}}>
     
        <img src={state.imgurl} 
        className="img-fluid mx-auto my-4 float-right rounded-lg" alt="" style={{width:270,boxShadow: '2px 2px 10px 8px rgba(35, 35, 35, 0.3)'}}/>

      <div className="mx-auto position-static pl-md-0 d-flex flex-column mb-4 rounded-lg">
        <h1 className="p-3 mt-2" >{state.title}</h1>
        <div>
              <div className="ml-auto">
                 <div className={classes.root}>
                 <button onClick={Sendrequest} className="btn bg-info" style={{
              height:25,width:35,marginBottom:8,borderRadius:7,marginRight:10}}>
                  <div style={{marginLeft:-7,marginTop:-5 ,color:"white"}}>
                  ثبت
                  </div>
                 </button>
              <Rating
              className=""
              name="hover-feedback"
              precision={1}
              size="medium"
              onChange={(event,newValue)=>{
              setValue(event.target.value)
              }}
              onChangeActive={(event, newHover) => {
              setHover(newHover);
              }}
              value={value}
                         />
                             </div>
              </div>
              </div>



          <table className="m-auto table table-hover text-right " >
            <tbody className="">
              <tr>
              <th >
              نام نویسنده:
              </th>
              <th >
              {state.author}
              </th>
              </tr>
              <tr>
              <th >
              نام ناشر:
              </th>
              <th >
              {state.publisher}
              </th>
              </tr>
              <tr>
              <th >
              امتیاز کتاب:
              </th>
                 <th >
                  {parseFloat(state.average_rating).toFixed(1)}
                 از 5 در
                  {state.average_rating_count}
              رای
              </th>
              </tr>
             
            </tbody>
          </table>
          <div className="row mb-auto" >
          <label className="col-10 mr-2">به کتاب‌های خود اضافه کنید:</label>
          <select className="form-control mr-4 rounded-pill shadow" style={{width:170}} id="bookMood" onChange={ addBookToMineHandler} >
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
          message={<div style={{fontFamily:'Yekan',fontSize:17}}>{selectMassage}</div>}
          />
      </div>
    </div>
  </div>
</div>
<div className="Tab color1 my-1 mb-5 mx-md-5 shadow border rounded-lg  ">
<Tabs book={state.id} bookdescription={state.description}/>
</div>
</div>
</div>
</div>
)
}


export default withRouter(BookView);