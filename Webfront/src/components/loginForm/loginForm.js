import React, {useState} from 'react';
import axios from 'axios';
import './loginForm.css';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
import Cookies from 'js-cookie';

function LoginForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        successMessage: null,
        backError : ""
    })

    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        setState(prevState => ({
            ...prevState,
            backError : ""
        })); 
        const payload={
            "email":state.email,
            "password":state.password,
        }
        const back= JSON.stringify(payload)
        //console.log(payload);
        //console.log(back);
        //console.log(props);
        //console.log(state);
        axios.post(API_BASE_URL+'login',back,{"headers":{"content-type":"application/json" }})
            .then(function (response) {
                console.log(response);
                //console.log(response.status);
                //console.log(response.data);
                if(response.status === 200){
                    setState(prevState => ({
                        ...prevState,
                        successMessage : 'ورود موفقیت‌آمیز بود...'
                    }))
                    //console.log(response);
                    //console.log(props);
                    //console.log(state);
                    //console.log(response.data.token);
                    Cookies.set('userToken',response.data.token);
                    Cookies.set('userId',response.data.userid);
                    Cookies.set('userName',state.userName);
                   // console.log(Cookies.get('userToken'));
                    redirectToHome();
                    props.showError(null)
                }
                // else if(response.status === 404){
                //     props.showError("رمز یا ایمیل اشتباه است.")
                //     setState(prevState => ({
                //         ...prevState,
                //         backError : "رمز یا ایمیل اشتباه است."
                //     })); 

                // }
                // else{
                //     props.showError("ایمیل وجود ندارد.");
                //     setState(prevState => ({
                //         ...prevState,
                //         backError : "ایمیل وجود ندارد."
                //     })); 
                // }
            })
            .catch(function (error) {
                    props.showError("رمز یا ایمیل اشتباه است.")
                    setState(prevState => ({
                        ...prevState,
                        backError : "رمز یا ایمیل اشتباه است."
                    })); 
            });
            //console.log(state);
    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToRegister = () => {
        props.history.push('/register'); 
        props.updateTitle('Register');
    }
    return(
        <div className="d-flex justify-content-center py-sm-4 color4">
        <div className="card-group col-sm-10 my-sm-5 shadow-lg color4" >
            <div className="card color2 " >
                <br></br>
                <h1>به کیما خوش‌آمدی</h1>
                <p>"کتاب یار مهربان است"</p>
                <p>خوشحالیم امروز می‌بینیمت</p>
                <img src="people&books.png" className="col-12" alt=""/> 
            </div>
            <div className="card color2 p-2">
            <form className="col-8 m-auto was-validated">
                <h1>ورود</h1>
                <br></br>
                <div className="form-group-sm text-right">
                <label htmlFor="exampleInputEmail1">ایمیل</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       //aria-describedby="emailHelp" 
                       //placeholder="Enter email" 
                       value={state.email}
                       required
                       onChange={handleChange}
                       
                />
                {/* <div class="invalid-feedback">
                    لطفا یک ایمیل وارد کنید
                </div> */}
                </div>
                
                <div className="form-group text-right">
                <label htmlFor="exampleInputPassword1">رمز</label>
                <input type="password" 
                       className="form-control" 
                       id="password" 
                       //placeholder="Password"
                       value={state.password}
                       required
                       onChange={handleChange} 
                />
                {/* <div class="invalid-feedback">
                    لطفا رمز خود وارد کنید
                </div> */}
                </div>
                <p className="loginText"> {state.backError} </p>
                <button 
                    type="submit" 
                    className="btn col-6 mx-auto btn-outline-success btn-block badge-pill"
                    onClick={handleSubmitClick}
                >ثبت</button>
                
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {props.showError}
            </div>
            
            <div className="registerMessage">
                <span>قبلاً ثبت‌نام نکرده‌اید؟</span>
                <span className="loginText" onClick={() => redirectToRegister()}>اینجا ثبت‌نام کنید</span> 
            </div>
            </div>
        </div>
        </div>
    )
}

export default withRouter( LoginForm);