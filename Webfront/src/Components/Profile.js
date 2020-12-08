import React, {Component,useState,useEffect} from "react";
import {Redirect,withRouter} from "react-router-dom";
import axios from 'axios';
import "./Profile.css";
import {FaRegSmileBeam} from "react-icons/fa";
import Button from '@material-ui/core/Button';
import {withStyles } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
       
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
        Cookies.remove('userToken');
        Cookies.remove('userName');
        Cookies.remove('userId');
        Cookies.remove('userPic');
        props.history.push('/login');
    }
    const [user , setUser] = useState({
       token : Cookies.get('userToken'),
       userName : "",
       email : "",
       picture : "",
       oldPass :"",
       newPass:"",
       newPass2 : "",
       backError : ""
    })
    const [bookNumbers,setBookNumbers]=useState({
        toRead : 1,
        reading : 2,
        read: 3
    })

    //console.log(user.token);

    useEffect(() => {
        console.log(user)
        if (user.token) {       
            axios.get('http://127.0.0.1:8000/api/user-profile/' + Cookies.get('userId'))
                .then(function (response){
                  console.log(response);
                  console.log(response.data);
                  setUser(prevState => ({ 
                    ...prevState,
                    userName: response.data.username,
                    //email: response.data.email,
                    picture : "http://127.0.0.1:8000"+response.data.profile_photo
                    }));
                    console.log(user);
                })
                .catch(function (error) {
                    console.log(error);
                    
                });

        }
    },[] );

    const handleChange = (e) => {
        const {id , value} = e.target   
        setUser(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleChangeInfosClick = (e) => {
        e.preventDefault();
        setUser(prevState => ({
            ...prevState,
            backError : ""
        })); 
        const payload={
              // "email":user.email,
              "username":user.userName
        }
        const back= JSON.stringify(payload)
        axios.put('http://127.0.0.1:8000/api/update-profile/',
        back,{
            headers:{

           "Content-Type":"application/json",
           "Authorization":"Token "+Cookies.get("userToken")}
            })
                .then(function (response) {
                console.log(response);
                if(response.status === 200){
                    console.log(response.status);
                    setUser(prevState => ({
                        ...prevState,
                        backError : 'نام کاربری با موفقیت عوض شد'
                    }))

                    
                }
            })
            .catch(function (error) {
                console.log(error);
                setUser(prevState => ({
                    ...prevState,
                    backError : "نام کاربری از قبل وجود دارد"
                }));
            });
    }

    const handleChangePassClick = (e) => {
        e.preventDefault();
        setUser(prevState => ({
            ...prevState,
            backError : ""
        })); 
        if(user.oldPass.length&&user.newPass.length){
            const payload={
                "old_password": user.oldPass,
                "new_password":user.newPass,
            }
            const back= JSON.stringify(payload);
            console.log(back);

            axios.put('http://127.0.0.1:8000/api/change-password/',
             back
             ,{
              headers:{
             "Content-Type":"application/json",
            "Authorization":"Token "+Cookies.get("userToken")}
             }
  
            ).then(function(response){
                console.log(response);
                setUser(prevState => ({
                    ...prevState,
                    backError : 'پسورد با موفقیت عوض شد'
                }))

            })
            .catch(function(error){
                console.log(error);
                setUser(prevState => ({
                    ...prevState,
                    backError : "پسورد قبلی غلط است"
                }));
             })
            
        }
        else {
            setUser(prevState => ({
             ...prevState,
             'backError' : 'لطفاً همه را درست وارد کنید'
         })); 
         }

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
          //current.src = e.target.result;
          setUser(prevState => ({
            ...prevState,
            picture : e.target.result
        }));

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
    console.log(res);
    console.log("Token" +Cookies.get("userToken"));
    setUser(prevState => ({
        ...prevState,
        backError : 'عکس با موفقیت عوض شد'
    }))
  })
  .catch(function(res){
    console.log(res);
  })
}

const StyledButton = withStyles({
    root: {
      background: 'linear-gradient(45deg, #7eccb7 30%, #4a8a96  90%)',
      borderRadius: 3,
      border: 0,
      color: 'black',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(165, 105, 255, 0.3)',
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);

const accent = teal[200]; // #e040fb

    return(
        <div className="main-content">
            
            <div class="container-fluid">
                <div className="row">
                    <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0 mt-3">
                        
                        <div className="card cardp">
                            <div className=" d-flex justify-content-end">

                                <div className="col-7 mt-5 text-center ">
                                    {/* <img src={image} style={{width:300}}></img> */}
                                    <h5 className="" style={{fontFamily:'Morvarid',fontWeight:"bold"}}>
                                        {user.userName}
                                    </h5>

                                    <h6 className="" style={{fontFamily:'Morvarid',fontWeight:"bold"}}>
                                       {user.email}
                                    </h6>
                                    
                                </div>

                                <div className="col-lg-5 order-lg-2 ">
                                    <div className="profile">
                                        <img src={user.picture} ref={uploadedImage} alt="" className="m-2 rounded-circle img-fluid" style={{

                                                                         width: 120,
                                                                         height: 120,
                                                                         display: "block"}}/>
                                        {/* <img className="rounded-circle img-fluid" ref={uploadedImage}/> */}

                                    </div>
                                </div>
                            </div>

                            <div className="card-body pt-0 ">
                                <div className="row">
                                    <div className="col">
                                        <div className="d-flex justify-content-between text-right mt-md-2">
                                           <div>

                                        <span className="heading text-muted">{bookNumbers.toRead}</span>

                                               
                                                <span className="description"style={{fontFamily:'Morvarid'}}> : می‌خواهم بخوانم</span>
                                            </div>
                                            <div>

                                                <span className="heading text-muted">{bookNumbers.reading}</span>
                                                <span className="description"style={{fontFamily:'Morvarid'}}> : دارم می‌خوانم</span>
                                            </div>
                                            <div>
                                                <span className="heading text-muted">{bookNumbers.read}</span>
                                                <span className="description"style={{fontFamily:'Morvarid'}}> : خوانده‌ام</span>
                                                {/* < FaRegSmileBeam/> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-header border-0 pt-6 pt-md-3 pb-3 pb-md-3">
                                <div className="d-flex justify-content-between">
                                    <StyledButton type="button" className="col-4 btn btn-sm btn-info" onClick = {logout}style={{fontFamily:'Morvarid'}} >
                                        خروج ازحساب
                                    </StyledButton>
                                                                            
                                    <StyledButton type="button" className="col-4 btn btn-sm btn-info"
                                     data-toggle="collapse" 
                                     data-target="#navbarToggleExternalContent" 
                                     aria-controls="navbarToggleExternalContent" 
                                     aria-expanded="false"
                                     aria-label="Toggle navigation"style={{fontFamily:'Morvarid'}}>
                                        ویرایش
                                    </StyledButton>
                                   
                                </div>
                            </div>
                            <div class="collapse" id="navbarToggleExternalContent">
                                <div class=" p-4">
                                    <form>
                                        <div class="form-group align-items-center text-right">

                                            <p className="loginText my-1" style={{fontFamily:'Morvarid'}}>{user.backError}</p>

                                            <div class="my-1">
                                                <label for="userName"style={{fontFamily:'Morvarid'}}>نام کاربری</label>
                                                <input type="text"
                                                  class="form-control"
                                                  id="userName"
                                                //   placeholder={user.userName}
                                                  value={user.userName}
                                                  onChange={handleChange}/>
                                            </div>
                                            {/* <div class="my-1">
                                                <label for="email"style={{fontFamily:'Morvarid'}}>ایمیل</label>
                                                <div class="input-group">
                                                    <div class="input-group-prepend">
                                                        <div class="input-group-text">@</div>
                                                    </div>
                                                    <input type="text"
                                                     class="form-control"
                                                     id="email" 
                                                    //  placeholder={user.email}
                                                     value={user.email}
                                                     onChange={handleChange}/>
                                                </div>
                                            </div> */}
                                            <div class=" my-2">
                                                <StyledButton 
                                                type="submit" 
                                                className="btn color5 d-flex flex-row "
                                                onClick={handleChangeInfosClick}
                                                style={{fontFamily:'Morvarid'}}
                                                >تغییر اطلاعات</StyledButton>
                                                
                                            </div>
                                            
                                            <div class="dropdown-divider"></div>
                                            <div class="my-1">
                                                <label for="img" style={{fontFamily:'Morvarid'}}style={{fontFamily:'Morvarid'}}> عکس</label>
                                                <div className="d-flex justify-content-between">
                                                    <StyledButton className="btn1" type="button"onClick={handleUpload}style={{fontFamily:'Morvarid'}}>ثبت عکس</StyledButton>
                                                    <input class="form-control" 
                                                    type="file" accept="image/*" 
                                                    onChange={handleImageUpload} 
                                                    ref={imageUploader} 
                                                    style={{ display: "none", }} />
                                                     <StyledButton className="btn1 col-auto" style={{fontFamily:'Morvarid'}}
                                                     onClick={() => imageUploader.current.click()} >
                                                          انتخاب عکس

                                                         {/* <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-bookmark-plus-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" d="M4 0a2 2 0 0 0-2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4zm4.5 4.5a.5.5 0 0 0-1 0V6H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V7H10a.5.5 0 0 0 0-1H8.5V4.5z"/>
                                                        </svg> */}
                                                    </StyledButton>
                                                </div>
                                            </div>
                                            <div class="dropdown-divider"></div>
                                            
                                            <div class="my-1">
                                                <label for="password"style={{fontFamily:'Morvarid'}}>رمز قبلی</label>
                                                <input type="text"
                                                  class="form-control"
                                                  id="oldPass"
                                                  value={user.oldPass}
                                                  onChange={handleChange}/>
                                            </div>
                                            <div class="my-1">
                                                <label for="password"style={{fontFamily:'Morvarid'}}>رمز جدید</label>
                                                <input type="text"
                                                  class="form-control"
                                                  id="newPass"
                                                  value={user.newPass}
                                                  onChange={handleChange}/>
                                            </div>
                                            {/* <div class="my-1">
                                                <label for="password"style={{fontFamily:'Morvarid'}}>تایید رمز جدید</label>
                                                <input type="text"
                                                  class="form-control"
                                                  id="newPass2"
                                                  value={user.newPass2}
                                                  onChange={handleChange}/>
                                            </div> */}
                                            <div class=" my-2">
                                                <StyledButton 
                                                type="submit" 
                                                className="btn color5 d-flex flex-row "
                                                onClick={handleChangePassClick}
                                                style={{fontFamily:'Morvarid'}}
                                               
                                                >تغییر رمز</StyledButton>
                                            </div>
                                        </div>
                                            
                                    </form>
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


