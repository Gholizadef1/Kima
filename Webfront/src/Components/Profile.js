import React, {Component,useState,useEffect} from "react";
import {Redirect,withRouter} from "react-router-dom";
import axios from 'axios';
import "./Profile.css";
import Button from '@material-ui/core/Button';
import {withStyles } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import { Modal, Form } from "react-bootstrap";  
import Cookies from 'js-cookie';
import Tabs from '../Tabs/Tabs';
import MyGroups from '../Tabs/MyGroups';
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
                    email: response.data.email,
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
                    Cookies.set('userName',user.userName);

                    
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
    Cookies.set('userPic',user.picture);
  })
  .catch(function(res){
    console.log(res);
  })
}

const StyledButton = withStyles({
    root: {
      background: 'linear-gradient(45deg, #a0a0a0 30%, #a0a0a0 90%)',
      color: 'black',
      height: 50,
      padding: '0 30px',
      boxShadow: '5px 3px 4px 2px rgba(34, 33, 35, 0.3)',
      fontWeight:'bolder',

    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);

const accent = teal[200]; // #e040fb

useEffect(() => {
  }, [user]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return(
        <div className="main-content">
            <div class="container-fluid">
                <div className="row">
                        <div className="card cardp">
                            <div className=" d-flex justify-content-end">

                                <div className="col-7 mt-5 text-center ">
                                    {/* <img src={image} style={{width:300}}></img> */}
                                    <h5 className="username">
                                        {user.userName}
                                    </h5>

                                    <h6 className="email">
                                       {user.email}
                                    </h6>
                                    <button type="button" className="btn btn1 btn-primary"
                                     data-toggle="collapse" 
                                     data-target="#navbarToggleExternalContent" 
                                     aria-controls="navbarToggleExternalContent" 
                                     aria-expanded="false"
                                     variant="gray"
                                     onClick={handleShow}


                                     aria-label="Toggle navigation"style={{fontFamily:'Yekan',marginTop:10,color:"white"}}>
                  ویرایش

                                    </button>
                                </div>
                                    <div className="profile col-md-5">
                                        <img src={user.picture} ref={uploadedImage} alt="" className="rounded-circle rounded-circle1 img-fluid"/>
                                        {/* <img className="rounded-circle img-fluid" ref={uploadedImage}/> */}

                                </div>
                            </div>

                            <div className="card-body pt-0">
                                <div className="row">
                                    <div className="col">

                                <hr className="line" style={{width:"100%",color:"#333",backgroundColor:"#333"}}></hr>

                                        <div className="d-flex heading justify-content-between text-right mt-md-n1 ml-5 mr-5">
                                        <b className="heading1"style={{fontFamily:'Iranian Sans'}}>{bookNumbers.toRead}</b>
                                        <b className="heading2"style={{fontFamily:'Iranian Sans'}}>{bookNumbers.reading}</b>
                                        <b className="heading3"style={{fontFamily:'Iranian Sans'}}>{bookNumbers.read}</b> 
                                        </div>
                                        <div className="d-flex justify-content-between text-right mt-md-2">

                                        <b className="description decsciptionmine1">می‌خواهم بخوانم</b>
                                        <b className="description decsciptionmine2">دارم می‌خوانم</b>
                                        <b className="description decsciptionmine3">خوانده‌ام</b>
                                        </div>   {/* < FaRegSmileBeam/> */}
                                    </div>
                                </div>
                            </div>
                          
                    
      <Modal show={show} onHide={handleClose} className="maodal">
        <Modal.Body>
         <img src={user.picture} ref={uploadedImage} alt="" className="rounded-circle rounded-circle gholi img-fluid" style={{
           width: 120,
             height: 120,
             marginLeft:180,
            marginTop:-5,
             display: "block"}}/>
            <div className="d-flex justify-content-between p-4">

                 <button className="btn custom-btn bg-primary" type="submit"onClick={handleUpload}style={{fontFamily:'Yekan',color:"white"}}>ثبت عکس</button>

                <input class="form-control" 
                type="file" accept="image/*" 
                onChange={handleImageUpload} 
                ref={imageUploader} 

                style={{ display: "none",color:"white" }} />
              <button className="btn custom-btn1 bg-primary" type="submit" style={{fontFamily:'Yekan',color:"white"}}

                             onClick={() => imageUploader.current.click()} >
                             انتخاب عکس
                            </button>
                            </div>
                            <div class=" p-4">
                                    <form>
                                        <div class="form-group align-items-center text-right">

                                            <p className="loginText my-1" style={{fontFamily:'Yekan'}}>{user.backError}</p>

                                            <div class="my-1">
                                                <label  for="userName"style={{fontFamily:'Yekan'}}>نام کاربری</label>
                                                <input type="text"
                                                  class="form-control rounded-pill"
                                                  id="userName"
                                                //   placeholder={user.userName}
                                                  value={user.userName}
                                                  onChange={handleChange}/>
                                            </div>
                                            <div class=" my-2">
                                                <button
                                                type="submit" 
                                                className="btn d-flex flex-row bg-primary "
                                                onClick={handleChangeInfosClick}


                                                style={{color:"white",fontFamily:'Yekan'}}


                                                >ذخیره</button>
                                                <div class="my-1">
                                                <label for="password">رمز قبلی</label>
                                                <input type="password"

                                                  class="form-control rounded-pill"

                                                  id="oldPass"


                                                  value={user.oldPass}
                                                  onChange={handleChange}/>
                                            </div>
                                            <div class="my-1">
                                                <label for="password">رمز جدید</label>
                                                <input type="password"

                                                  class="form-control rounded-pill"


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
                                                <button
                                                type="submit" 
                                                className="btn color5 d-flex flex-row bg-primary"
                                                onClick={handleChangePassClick}


                                                style={{fontFamily:'Yekan',color:"white"}}


                                               
                                                >ذخیره </button>
                                            </div>
                                                
                                            </div>
                                            </div>
                                            </form>
                                            </div>
        </Modal.Body>
        <Modal.Footer>

        
          <button className="btn bg-primary mx-4"  onClick={handleClose} style={{fontFamily:'Yekan',color:"white"}}>

            بستن
          </button>
          
        </Modal.Footer>
      </Modal>
                                   
                                </div>
                            </div>
                            </div>
                           <div className="mygroups">
                               <MyGroups/>
                           </div>
                        

                            <div className="Tabz">

                              <Tabs/>
                              </div>  
                            </div>
                            
    )
    
} 

export default withRouter(ProFile);


