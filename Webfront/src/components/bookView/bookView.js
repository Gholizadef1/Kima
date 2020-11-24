import React, {useState,useEffect} from 'react';
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
//import { data } from 'jquery';

function BookView(props) {
    let { bookId } = useParams();

    //const bookId= props.match.params.id;
    console.log(bookId);
    console.log(bookId.name);
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
                });

        }
    }, []);
    //console.log(state.id);
    //console.log(state.title);
    //console.log(response.data.title);



    return(
        
        <div className="container-fluid col-sm-8 rTOl text-right " >
            <div className="d-flex flex-row shadow color1 table-borderless my-1">
                
                <img src={state.imgurl} className="m-3 img-fluid col-sm-3 shadow float-right" alt="" />
                <div className="d-flex flex-column p-3">
                <h2>{state.title}</h2>
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
                        <th>
                            نام نویسنده
                        </th>
                        <td>
                            {state.author}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            نام ناشر
                        </th>
                        <td>
                            {state.publisher}
                        </td>
                    </tr>
                  </tbody>
                </table>
                </div>
    
                
            </div>

            <nav className="shadow navbar navbar-expand-sm navbar-light sticky-top color3">  
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="#bookDescription">توضیح</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#bookCriticism">نقد</a>
                     </li>
    
                </ul>
            </nav>

            <div id="bookDescription" className="shadow color1 p-2">
                <br></br>
                <h3>توضیح کتاب {state.title}</h3>
                <br></br>
                <p>
                    {state.description}
                    <br></br>
                </p>
            </div>
            <div id="bookCriticism" className="color1 p-2">
                <br></br>
                <h3>نقد کتاب {state.title}</h3>
                <br></br>
                <p>


                    <br></br>
                </p>
            </div>






        </div>





    )








}


export default withRouter(BookView);