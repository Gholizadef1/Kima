import React, {useState} from 'react';
import axios from 'axios';
import './loginForm.css';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
import Cookies from 'js-cookie';
import image from '../../assets/people&books.png';


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
        axios.post(API_BASE_URL+'/login',back,{"headers":{"content-type":"application/json" }})
            .then(function (response) {
                //console.log(response);
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
                    Cookies.set('userName',response.data.username);
                   // console.log(Cookies.get('userToken'));
                    redirectToHome();
                    props.showError(null)
                }
            })
            .catch(function (error) {
                    props.showError("رمز یا ایمیل اشتباه است")
                    setState(prevState => ({
                        ...prevState,
                        backError : "رمز یا ایمیل اشتباه است"
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
    // const StyledButton = withStyles({
    //     root: {
    //       background: 'linear-gradient(45deg, #7eccb7 30%, #4a8a96  90%)',
    //       borderRadius: 3,
    //       border: 0,
    //       color: 'black',
    //       height: 48,
    //       padding: '0 30px',
    //       boxShadow: ' 0 3px 5px 2px rgba(165, 105, 255, 0.3)',
    //     },
    //     label: {
    //       textTransform: 'capitalize',
    //     },
    //   })(Button);
    return(
        <div className="d-flex justify-content-center py-sm-4 color4">
        <div className="card-group col-sm-10 mx-sm-5 shadow-lg color4" >
            <div className="card color2" >
                <div class="card-body mt-1">
                    <h1 className="mt-4 card-title" >به کیما خوش‌آمدید</h1>
                    <p className="card-text" style={{fontSize:24}}>"کتاب یار مهربان است"</p>
                    <p className="card-text" style={{fontSize:20}}>خوشحالیم امروز می‌بینیمتون</p>
                    <img src={image} className="col-12 mt-n5 card-img-bottom hv-center mt-auto" alt=""/> 
                </div>
            </div>
            <div className="card color2">
            <form className="col-8 mx-auto mt-5 was-validated">
                <h1 >ورود</h1>
                <br></br>
                <div className="form-group-sm text-right">
                <label className="mt-2 mb-n1" htmlFor="exampleInputEmail1">ایمیل</label>
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
                <label className="mt-2 mb-n1" htmlFor="exampleInputPassword1">رمز</label>
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
                    className="btn  mx-auto btn-info"
                    onClick={handleSubmitClick}
                >ثبت</button>
                
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {props.showError}
            </div>
            
            <div className="registerMessage">
                <span > قبلاً ثبت‌نام نکرده‌اید؟ </span>
                <span className="loginText" onClick={() => redirectToRegister()}>اینجا ثبت‌نام کنید</span> 
            </div>
            </div>
        </div>
        </div>
    )
}

export default withRouter( LoginForm);
