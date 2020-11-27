import React, {Component,useState,useEffect} from "react";
import {Redirect,withRouter} from "react-router-dom";
import axios from 'axios';
import "./Profile.css";
import Scroll from "./Scroll";
//import Avatar from './Avatar';
import Cookies from 'js-cookie';

function ProFile (props){
    const [state , setState]=useState(
        {
            navigate:false,
            file:null
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

    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);
    const handleImageUpload = e => {
      setState({file:e.target.files[0]});
      const [file] = e.target.files;
      if (file) {
        const reader = new FileReader();
        const { current } = uploadedImage;
        current.file = file;
        reader.onload = e => {
          current.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
  const handleUpload= e =>{

  var formdata = new FormData()
  formdata.append('profile_photo',state.file)
  // formdata.append('username','file')
   axios.put('http://127.0.0.1:8000/api/update-profile/'
   ,formdata,{
     headers:{
       
    "Content-Type":"application/json",
    "Authorization":"Token "+Cookies.get("userToken")}
     }
  
  ).then(function(res){
    console.log("Token" +Cookies.get("userToken"))
  })
  
  .then(function(res){
    console.log(res);
  })
  .catch(function(res){
    console.log(res);
  })
}

    return(
        <div className="main-content">
            
            <div class="container-fluid">
                <div className="row">
                    
                    <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
                        
                        <div className="card card-profile">
                            <div className=" d-flex justify-content-end">

                                <div className="col-7 mt-4 text-right">
                                    <h5 className="">
                                        فاطمه امیدی
                                    </h5>
                                </div>

                                <div className="col-lg-5 order-lg-2 ">
                                    <div className="profile">
                                        <img src="index12.jpeg" className="rounded-circle img-fluid"/>
                                        <img className="" ref={uploadedImage}/>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="card-header border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                <div className="d-flex justify-content-between">
                                    
                                    <button type="button" className="col-4 btn btn-sm btn-info"
                                     data-toggle="collapse" 
                                     data-target="#navbarToggleExternalContent" 
                                     aria-controls="navbarToggleExternalContent" 
                                     aria-expanded="false"
                                     aria-label="Toggle navigation">
                                        ویرایش
                                    </button>
                                    <button type="button" className="col-4 btn btn-sm btn-info" onClick = {logout} >
                                        خروج ازحساب
                                    </button>
                                    
                                </div>
                            </div>
                            <div class="collapse" id="navbarToggleExternalContent">
                                <div class=" p-4">
                                    <form>
                                        <div class="form-group align-items-center text-right">
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
                                            <div class=" my-2">
                                                <button 
                                                type="submit" 
                                                className="btn color5 d-flex flex-row "
                                                onClick={handleSubmitClick}
                                                >تغییر اطلاعات</button>
                                            </div>
                                            <div class="dropdown-divider"></div>
                                            <div class="my-1">
                                                <label for="img"> عکس</label>
                                                <div className="d-flex justify-content-between">
                                                    <button className="btn color5" type="button"onClick={handleUpload}>ثبت عکس</button>
                                                    <input class="form-control" 
                                                    type="file" accept="image/*" 
                                                    onChange={handleImageUpload} 
                                                    ref={imageUploader} 
                                                    style={{ display: "none", }} />
                                                     <button className="btn btn-dark col-auto" 
                                                     onClick={() => imageUploader.current.click()} >
                                                          انتخاب عکس

                                                         <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-bookmark-plus-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" d="M4 0a2 2 0 0 0-2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4zm4.5 4.5a.5.5 0 0 0-1 0V6H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V7H10a.5.5 0 0 0 0-1H8.5V4.5z"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="dropdown-divider"></div>
                                            
                                            <div class="my-1">
                                                <label for="password">رمز قبلی</label>
                                                <input type="text"
                                                  class="form-control"
                                                  id="userName"
                                                  placeholder={user.userName}
                                                  value={user.userName}
                                                  onChange={handleChange}/>
                                            </div>
                                            <div class="my-1">
                                                <label for="password">رمز جدید</label>
                                                <input type="text"
                                                  class="form-control"
                                                  id="userName"
                                                  placeholder={user.userName}
                                                  value={user.userName}
                                                  onChange={handleChange}/>
                                            </div>
                                            <div class="my-1">
                                                <label for="password">تایید رمز جدید</label>
                                                <input type="text"
                                                  class="form-control"
                                                  id="userName"
                                                  placeholder={user.userName}
                                                  value={user.userName}
                                                  onChange={handleChange}/>
                                            </div>
                                            <div class=" my-2">
                                                <button 
                                                type="submit" 
                                                className="btn color5 d-flex flex-row "
                                                onClick={handleSubmitClick}
                                                disabled
                                                >تغییر رمز</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="card-body pt-0 pt-md-4">
                                
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
                    <Scroll/>
                </div>
            </div>

        </div>
        
    )
}

export default withRouter(ProFile);


