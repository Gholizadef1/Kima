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
import Cookies from 'js-cookie';
import { ajax } from 'jquery';
//import { data } from 'jquery';

function BookView(props) {
    let { bookId } = useParams();

    //const bookId= props.match.params.id;
    console.log(bookId);
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
                    console.log(response);
                    setUserCoice(response.data.book_state);
                    console.log(response.data.book_state);
                    document.getElementById(response.data.book_state).selected=true;
                 })
                 .catch(function (error) {
                    console.log(error);
                    
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



    return(
        
        <div className="container-fluid col-8 rTOl text-right " >
            <div className="d-flex flex-row shadow color1 table-borderless my-1">
                

                <img src={state.imgurl} className="m-3 img-fluid col-3 shadow float-right" alt="" />
                <div className="d-flex col-6 flex-column p-3">

                <h2 style={{fontFamily:'Morvarid'}}>{state.title}</h2>
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
                        <th style={{fontFamily:'Morvarid'}}>
                            نام نویسنده
                        </th>
                        <td>
                            {state.author}
                        </td>
                    </tr>
                    <tr>
                        <th style={{fontFamily:'Morvarid'}}>
                            نام ناشر
                        </th>
                        <td>
                            {state.publisher}
                        </td>
                    </tr>
                  </tbody>
                </table>
                <div className="row" style={{fontFamily:'Morvarid'}}>
                    
                    {/* <svg width="3.5em" height="3.5em" viewBox="0 0 16 16" className="btn bi bi-bookmark-plus-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M4 0a2 2 0 0 0-2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4zm4.5 4.5a.5.5 0 0 0-1 0V6H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V7H10a.5.5 0 0 0 0-1H8.5V4.5z"/>
                    </svg> */}

                    <label className="col-10 mr-2">به کتاب‌های خود اضافه کنید:</label>
                    <select className="form-control mr-4 col-6" id="bookMood"onChange={ addBookToMineHandler}>
                        <option id="none" value="none">هیچکدام</option>

                        <option id="ToRead" value="ToRead">می‌خواهم بخوانم</option>
                        <option id="Reading" value="Reading">دارم می‌خوانم</option>
                        <option id="Read" value="Read">خوانده‌ام</option>
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
                        <a className="nav-link" href="#bookDescription" style={{fontFamily:'Morvarid'}}>توضیح</a>
                    </li>
                    {/* <li className="nav-item">
                        <a className="nav-link" href="#bookCriticism">نقد</a>
                     </li> */}
    
                </ul>
            </nav>

            <div id="bookDescription" className="shadow color1 p-2">
                <br></br>
                <h3 style={{fontFamily:'Morvarid'}}>توضیح کتاب {state.title}</h3>
                <br></br>
                <p style={{fontFamily:'Morvarid'}}>
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