import React, {useState} from 'react';
import axios from 'axios';
import './registrationForm.css';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
import Cookies from 'js-cookie';
import Button from '@material-ui/core/Button';
import {withStyles } from '@material-ui/core/styles';
function RegistrationForm(props) {
    const [state , setState] = useState({
        userName : "",
        email : "",
        password : "",
        confirmPassword: "",
        successMessage: null,
        backError:""
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
                    //console.log(response.data);
                    if(response.data.response=== "successfully registered a new user."){
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'ثبت‌نام موفقیت‌آمیز بود...'
                        }))
                        Cookies.set('userToken',response.data.token);
                        Cookies.set('userName',state.userName);
                        Cookies.set('userId',response.data.userid);
                        redirectToHome();
                        props.showError(null)
                    } else{
                        // props.showError("Some error ocurred");
                        // setState(prevState => ({
                        //     ...prevState,
                        //     'backError' : 'Some error ocurred'
                        // }));
                        if(response.data.email!==back.email||response.data.username!==back.username){
                            if(response.data.email!==undefined&&response.data.username!==undefined){
                              //console.log(response.data.username);
                              //console.log(response.data.email);
                              setState(prevState => ({
                                ...prevState,
                                'backError' : 'کاربر وجود دارد'
                            })); 
                            }
                            else if(response.data.username!==undefined){
                            setState(prevState => ({
                                ...prevState,
                                'backError' : 'نام کاربری وجود دارد'
                            })); 
                          }
                          else if(response.data.email!==undefined){
                            setState(prevState => ({
                                ...prevState,
                                'backError' : 'ایمیل وجود دارد'
                            })); 
                          }
                            else{
                              setState(prevState => ({
                                ...prevState,
                                'backError' : 'لطفا ایمیل درست وارد کنید'
                            })); 
                            }
                            };
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });    
        } else {
           // props.showError('لطفا مشخصات خود را درست وارد کنید')
           setState(prevState => ({
            ...prevState,
            'backError' : 'لطفا مشخصات خود را درست وارد کنید'
        })); 
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
        setState(prevState => ({
            ...prevState,
            backError : ""
        }));
        e.preventDefault();
        if(state.password.length < 8){
            setState(prevState => ({
                ...prevState,
                'backError' : 'رمز را بیشتر از هشت کاراکتر انتخاب کنید'
            }));
        }
        else if(state.password === state.confirmPassword) {
            sendDetailsToServer()    
        } else {
            //props.showError('رمز ها فرق دارند');
            setState(prevState => ({
                ...prevState,
                'backError' : 'رمز ها فرق دارند'
            }));

        }
    }

    const StyledButton = withStyles({
        root: {
          background: 'linear-gradient(45deg, #7eccb7 30%, #4a8a96  90%)',
          borderRadius: 3,
          border: 0,
          color: 'black',
          height: 48,
          padding: '0 30px',
          boxShadow: ' 0 3px 5px 2px rgba(165, 105, 255, 0.3)',
        },
        label: {
          textTransform: 'capitalize',
        },
      })(Button);
    return(
        <div className="d-flex justify-content-center py-sm-4 color4">
        <div className="card-group col-sm-10 my-sm-5 shadow-lg color4" >
            <div className="card color2 " >
                <br></br>
                <h1 style={{fontFamily:'Morvarid'}}>به کیما خوش‌آمدی</h1>
                <p style={{fontFamily:'Morvarid'}}>در کیما می‌توانی به دنبال کتاب‌های مورد‌علاقه خودت بگردی</p>
                <p style={{fontFamily:'Morvarid'}}>!و درباره‌ی کتاب‌ها گفت‌و‌گو کنی</p>
                <img src="people&books.png" className="col-12 card-img-bottom hv-center" alt="" /> 
            </div>
            <div className="card color2 p-2">
            <form className="col-8 m-auto was-validated">
                <h1 style={{fontFamily:'Morvarid'}}>ثبت‌نام</h1>
                <br></br>
                <div className="form-group-sm text-right">
                <label htmlFor="exampleInputUserName" style={{fontFamily:'Morvarid'}}>نام کاربری</label>
                <input type="name" 
                       className="form-control" 
                       id="userName" 
                       //placeholder="userName" 
                       value={state.userName}
                       required
                       onChange={handleChange}
                />
                {/* <div class="invalid-feedback">
                    لطفا یک نام‌کاربری وارد کنید
                </div> */}
                </div>

                <div className="form-group-sm text-right">
                <label htmlFor="exampleInputEmail1"style={{fontFamily:'Morvarid'}}>ایمیل</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       //placeholder="Enter email" 
                       value={state.email}
                       required
                       onChange={handleChange}
                />
                {/* <div class="invalid-feedback">
                    لطفا یک ایمیل وارد کنید
                </div> */}
                </div>
                
                <div className="form-group-sm text-right">
                    <label htmlFor="exampleInputPassword1"style={{fontFamily:'Morvarid'}}>رمز</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        //placeholder="Password"
                        value={state.password}
                        required
                        onChange={handleChange} 
                    />
                    {/* <div class="invalid-feedback">
                    لطفا یک  رمز وارد کنید
                    </div> */}
                </div>
                <div className="form-group text-right">
                    <label htmlFor="exampleInputPassword1"style={{fontFamily:'Morvarid'}}>تأیید رمز</label>
                    <input type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        //placeholder="Confirm Password"
                        value={state.confirmPassword}
                        required
                        onChange={handleChange} 
                    />
                    {/* <div class="invalid-feedback">
                    لطفا رمز خود را تکرار کنید
                    </div> */}
                </div>
                <p className="loginText"> {state.backError} </p>
                <StyledButton 
                style={{fontFamily:'Morvarid'}}
                    type="submit" 
                    className="btn col-6 mx-auto btn-outline-success btn-block badge-pill"
                    onClick={handleSubmitClick}
                >
                    ثبت
                </StyledButton>
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