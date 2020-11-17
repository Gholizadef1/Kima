import React, {useState} from 'react';
import axios from 'axios';
import './registrationForm.css';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";

function RegistrationForm(props) {
    const [state , setState] = useState({
        userName : "",
        email : "",
        password : "",
        confirmPassword: "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const sendDetailsToServer = () => {
        if(state.userName.length && state.email.length && state.password.length ) {
            props.showError(null);
            const payload={
                "username":state.userName,
                "email":state.email,
                "password":state.password,
                "password2":state.confirmPassword,
            }
            const back= JSON.stringify(payload)
            axios.post(API_BASE_URL+'register', back,{"headers":{"content-type":"application/json"}})
                .then(function (response) {
                    
                    console.log(response);
                    console.log(response.data);
                    if(response.status=== 200){
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'ثبت‌نام موفقیت‌آمیز بود...'
                        }))
                        redirectToHome();
                        props.showError(null)
                    } else{
                        props.showError("Some error ocurred");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });    
        } else {
            props.showError('لطفا مشخصات خود را درست وارد کنید')    
        }
        
    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToLogin = () => {
        props.updateTitle('Login')
        props.history.push('/login'); 
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.password === state.confirmPassword) {
            sendDetailsToServer()    
        } else {
            props.showError('رمز ها فرق دارند');
        }
    }
    return(
        <div className="d-flex justify-content-center py-sm-4 color4">
        <div className="card-group col-sm-10 my-sm-5 shadow-lg color4" >
            <div className="card color2 " >
                <br></br>
                <h1>به کیما خوش آمدی</h1>
                <p>در کیما می‌توانی به دنبال کتاب‌های مورد‌علاقه خودت بگردی</p>
                <p>!و درباره‌ی کتاب‌ها گفت‌و‌گو کنی</p>
                <img src="people&books.png" className="col-12 hv-center" alt="" /> 
            </div>
            <div className="card color2 p-2">
            <form className="col-8 m-auto ">
                <h1>ثبت‌نام</h1>
                <br></br>
                <div className="form-group text-right">
                <label htmlFor="exampleInputUserName">نام کاربری</label>
                <input type="userName" 
                       className="form-control" 
                       id="userName" 
                       //placeholder="userName" 
                       value={state.userName}
                       onChange={handleChange}
                />
                </div>

                <div className="form-group text-right">
                <label htmlFor="exampleInputEmail1">ایمیل</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       //placeholder="Enter email" 
                       value={state.email}
                       onChange={handleChange}
                />
                
                </div>
                
                <div className="form-group text-right">
                    <label htmlFor="exampleInputPassword1">رمز</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        //placeholder="Password"
                        value={state.password}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group text-right">
                    <label htmlFor="exampleInputPassword1">تأیید رمز</label>
                    <input type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        //placeholder="Confirm Password"
                        value={state.confirmPassword}
                        onChange={handleChange} 
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn col-6 mx-auto btn-outline-success btn-block badge-pill"
                    onClick={handleSubmitClick}
                >
                    ثبت
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="mt-2">
                <span>قبلاً ثبت‌نام کرده‌اید؟ </span>
                <span className="loginText" onClick={() => redirectToLogin()}>اینجا وارد شوید</span> 
            </div>
            </div>
            </div>
        </div>
    )
}

export default withRouter(RegistrationForm);