import React, {useState} from 'react';
import axios from 'axios';
import './loginForm.css';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";

function LoginForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        successMessage: null
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
        const payload={
            "email":state.email,
            "password":state.password,
        }
        axios.post(API_BASE_URL+'login', payload)
            .then(function (response) {
                if(response.status === 200){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'ورود موفقیت‌آمیز بود...'
                    }))
                    redirectToHome();
                    props.showError(null)
                }
                else if(response.data.code === 404){
                    props.showError("رمز یا ایمیل اشتباه است.");

                }
                else{
                    props.showError("ایمیل وجود ندارد.");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
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
            <form className="col-8 m-auto ">
                <h1>ورود</h1>
                <br></br>
                <div className="form-group text-right">
                <label htmlFor="exampleInputEmail1">ایمیل</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       //aria-describedby="emailHelp" 
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
                
                <button 
                    type="submit" 
                    className="btn col-6 mx-auto btn-outline-success btn-block badge-pill"
                    onClick={handleSubmitClick}
                >ثبت</button>
                
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
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

export default withRouter(LoginForm);