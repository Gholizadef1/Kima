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
                if(response.data.code === 200){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Login successful. Redirecting to home page..'
                    }))
                    redirectToHome();
                    props.showError(null)
                }
                else if(response.data.code === 204){
                    props.showError("Username and password do not match");
                }
                else{
                    props.showError("Username does not exists");
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
        <div className="card-group color3" >
            <div className="card col-12 hv-center color3" >
                <h1>به کیما خوش آمدی</h1>
                <p>"کتاب یار مهربان است"</p>
                <p>خوشحالیم امروز میبینیمت</p>
                <img src="people&books.png" className="col-12 hv-center" alt="" width="204" height="236"/> 
            </div>
            <div className="card col-12 hv-center color3">
            <form className="mx-5">
                <h1>ورود</h1>
                <br></br>
                <div className="form-group text-right">
                <label htmlFor="exampleInputEmail1">آدرس ایمیل</label>
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
                <div className="form-check">
                </div>
                <button 
                    type="submit" 
                    className="btn btn-outline-success"
                    onClick={handleSubmitClick}
                >ثبت</button>
                
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="registerMessage">
                <span>قبلاً ثبت نام نکرده اید؟</span>
                <span className="loginText" onClick={() => redirectToRegister()}>اینجا ثبت نام کنید</span> 
            </div>
            </div>
        </div>
    )
}

export default withRouter(LoginForm);