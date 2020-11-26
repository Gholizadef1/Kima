import React, {Component,useState,useEffect} from "react";
import {Redirect,withRouter} from "react-router-dom";
import axios from 'axios';
import "./Profile.css";
import Avatar from './Avatar';
import Cookies from 'js-cookie';

function ProFile (props){
    const [state , setState]=useState(
        {
            navigate:false
        }
    )
    const logout = () =>{
        
        //localStorage.clear("token");
        Cookies.remove('userToken')
        props.history.push('/login');
    }
    const [user , setUser] = useState({
       token : Cookies.get('userToken'),
       userName : "",
       email : "",
       picture : ""
    })
    console.log(user.token);
    // useEffect(() => {
    //     if (token) {       
    //         axios.get('http://127.0.0.1:8000/user/' + token)
    //             .then(response => {
    //               //console.log(response);
    //               //console.log(response.data);
    //               setState({ 
    //                 userName: response.data.userName,
    //                 email: response.data.email,
    //                 picture : response.data.picture
    //                 });
    //             });

    //     }
    // },[] );

    const handleChange = (e) => {
        const {id , value} = e.target   
        setUser(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        setUser(prevState => ({
            ...prevState,
            backError : ""
        })); 
        const payload={
            "email":user.email,
            "userName":user.userName,
        }
        const back= JSON.stringify(payload)
        console.log(payload);
        console.log(back);
        console.log(props);
        console.log(user);
        axios.post('http://127.0.0.1:8000/edit',back,{"headers":{"content-type":"application/json" }})
            .then(function (response) {
                console.log(response);
                console.log(response.status);
                console.log(response.data);
                if(response.status === 200){
                    setUser(prevState => ({
                        ...prevState,
                        successEdit : 'موفقیت‌آمیز بود'
                    }))
                    console.log(response);
                    console.log(props);
                    console.log(user);
                    Cookies.set('userToken',response.data.token,{path:"/"})
                    
                    console.log(Cookies.get('userToken'));
                    
                }
            })
            .catch(function (error) {
                    setState(prevState => ({
                        ...prevState,
                        backError : "رمز یا ایمیل اشتباه است."
                    })); 
            });
            console.log(user);
    }

    return(
        <div className="main-content">
            <div class="container-fluid">
                <div className="row">
                    <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
                        <div className="card card-profile">
                            <div className="row justify-content-center">
                                <div className="col-lg-3 order-lg-2">
                                    <div className="profile">
                                    <img src="index12.jpeg" class="rounded-circle img-fluid"/>
                                       <Avatar/>
                                       </div>
                                </div>
                            </div>
                            <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                <div className="d-flex justify-content-between">
                                    
                                    <button type="button" className="col-4 btn btn-sm btn-info"
                                     data-toggle="collapse" 
                                     data-target="#navbarToggleExternalContent" 
                                     aria-controls="navbarToggleExternalContent" 
                                     aria-expanded="false"
                                     aria-label="Toggle navigation">
                                        Edit
                                    </button>
                                    <button type="button" className="col-4 btn btn-sm btn-info" onClick = {logout} >
                                        خروج ازحساب
                                    </button>
                                </div>
                            </div>
                            <div class="color3 collapse" id="navbarToggleExternalContent">
                                <div class=" p-4">
                                    <form>
                                        <div class="form-group align-items-center">
                                            <div class="my-1">
                                                <label for="userName">نام کاربری</label>
                                                <input type="text"
                                                  class="form-control"
                                                  id="userName"
                                                  placeholder={user.userName}
                                                  value={user.userName}
                                                  onChange={handleChange}/>
                                            </div>
                                            <div class="my-1">
                                                <label for="email">ایمیل</label>
                                                <div class="input-group">
                                                    <div class="input-group-prepend">
                                                        <div class="input-group-text">@</div>
                                                    </div>
                                                    <input type="text"
                                                     class="form-control"
                                                     id="email" 
                                                     placeholder={user.email}
                                                     value={user.email}
                                                     onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div class="col-auto my-1">
                                            </div>
                                            <div class="col-auto my-1">
                                                <button 
                                                type="submit" 
                                                className="btn color5"
                                                onClick={handleSubmitClick}
                                                >تایید</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="card-body pt-0 pt-md-4">
                                <div className="text-center">
                                    <h3 className="">
                                        فاطمه امیدی
                                    </h3>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="card-profile-stats d-flex justify-content-between text-right mt-md-5">
                                           <div>
                                                <span className="heading text-muted">2</span>
                                                <span className="description"> : می‌خواهم بخوانم</span>
                                            </div>
                                            <div>
                                                <span className="heading text-muted">1</span>
                                                <span className="description"> : دارم می‌خوانم</span>
                                            </div>
                                            <div>
                                                <span className="heading text-muted">8</span>
                                                <span className="description"> : خوانده‌ام</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-8 order-xl-1">
                        <div class="card bg-secondary shadow">
                            <div class="card-header bg-white border-0">
                                <div class="row align-items-center">
                                    <div class="col-8">
                                        <h3 className="text-muted mb-0">کتاب‌ها</h3>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default withRouter(ProFile);


