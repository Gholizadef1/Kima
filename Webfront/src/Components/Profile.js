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
    Cookies.set('userName',user.picture);
  })
  .catch(function(res){
    console.log(res);
  })
}

const StyledButton = withStyles({
    root: {
      background: 'linear-gradient(45deg, #7eccb7 30%, #4a8a96  90%)',
      borderRadius: 10,
      border: 10,
      color: 'black',
      height: 50,
      padding: '0 30px',
      boxShadow: '5px 3px 4px 2px rgba(34, 33, 35, 0.3)',

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
                    <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0 mt-3">
                        <div className="card cardp">
                            <div className=" d-flex justify-content-end">

                                <div className="col-7 mt-5 text-center ">
                                    {/* <img src={image} style={{width:300}}></img> */}
                                    <h5 className="" style={{fontFamily:'Mitra',fontWeight:"bold"}}>
                                        {user.userName}
                                    </h5>

                                    <h6 className="" style={{fontFamily:'Mitra',fontWeight:"bold"}}>
                                       {user.email}
                                    </h6>
                                    <StyledButton type="button" className="col-4 btn btn-sm btn-info"
                                     data-toggle="collapse" 
                                     data-target="#navbarToggleExternalContent" 
                                     aria-controls="navbarToggleExternalContent" 
                                     aria-expanded="false"
                                     variant="gray"
                                     onClick={handleShow}
                                     aria-label="Toggle navigation"style={{fontFamily:'Mitra',marginTop:10,color:"white"}}>
                                        ویرایش
                                    </StyledButton>
                                </div>
                                    <div className="profile">
                                        <img src={user.picture} ref={uploadedImage} alt="" className="rounded-circle img-fluid" style={{
                                      
                                                                         width: 140,
                                                                         height: 140,
                                                                         display: "block"}}/>
                                        {/* <img className="rounded-circle img-fluid" ref={uploadedImage}/> */}

                                </div>
                            </div>

                            <div className="card-body pt-0">
                                <div className="row">
                                    <div className="col">
                                <hr style={{width:"90%",height:1,color:"#333",backgroundColor:"#333"}}></hr>
                                        <div className="d-flex justify-content-between text-right mt-md-2 ml-5 mr-5">
                                        <b className="heading"style={{fontSize:20}}>{bookNumbers.toRead}</b>
                                        <b className="heading"style={{fontSize:20}}>{bookNumbers.reading}</b>
                                        <b className="heading"style={{fontSize:20}}>{bookNumbers.read}</b> 
                                        </div>
                                        <div className="d-flex justify-content-between text-right mt-md-2">

                                        <span className="description ml-4"style={{fontFamily:'Mitra',fontSize:18}}>  می‌خواهم بخوانم</span>
                                        <span className="description mr-4"style={{fontFamily:'Mitra',fontSize:18}}>  دارم می‌خوانم</span>
                                        <span className="description mr-4"style={{fontFamily:'Mitra',fontSize:18}}>  خوانده‌ام</span>
                                        </div>   {/* < FaRegSmileBeam/> */}
                                    </div>
                                </div>
                            </div>
                            <div className="card-header border-0 pt-6 pt-md-3 pb-3 pb-md-3">
                                <div className="d-flex justify-content-between">
                                    
                    
      <Modal show={show} onHide={handleClose} className="maodal">
        <Modal.Body>
         <img src={user.picture} ref={uploadedImage} alt="" className="rounded-circle rounded-circle gholi img-fluid" style={{
           width: 120,
             height: 120,
             marginLeft:300,
            marginTop:-5,
             display: "block"}}/>
            <div className="d-flex justify-content-between">
                 <StyledButton className="btn1" type="button"onClick={handleUpload}style={{fontFamily:'Mitra',left:20,color:"white"}}>ثبت عکس</StyledButton>

                <input class="form-control" 
                type="file" accept="image/*" 
                onChange={handleImageUpload} 
                ref={imageUploader} 
                style={{ display: "none",color:"white" }} />
              <StyledButton className="btn1" type="button" style={{fontFamily:'Mitra',left:-15,color:"white"}}

                             onClick={() => imageUploader.current.click()} >
                             انتخاب عکس
                            </StyledButton>
                            </div>
                            <div class=" p-4">
                                    <form>
                                        <div class="form-group align-items-center text-right">

                                            <p className="loginText my-1" style={{fontFamily:'Mitra'}}>{user.backError}</p>

                                            <div class="my-1">
                                                <label  for="userName"style={{fontFamily:'Mitra'}}>نام کاربری</label>
                                                <input type="text"
                                                  class="form-control rounded-pill"
                                                  id="userName"
                                                //   placeholder={user.userName}
                                                  value={user.userName}
                                                  onChange={handleChange}/>
                                            </div>
                                            <div class=" my-2">
                                                <StyledButton 
                                                type="submit" 
                                                className="btn color5 d-flex flex-row "
                                                onClick={handleChangeInfosClick}
                                                style={{fontFamily:'Mitra',color:"white"}}
                                                >ذخیره</StyledButton>
                                                <div class="my-1">
                                                <label for="password"style={{fontFamily:'Mitra'}}>رمز قبلی</label>
                                                <input type="text"
                                                  class="form-control"
                                                  id="oldPass"
                                                  value={user.oldPass}
                                                  onChange={handleChange}/>
                                            </div>
                                            <div class="my-1">
                                                <label for="password"style={{fontFamily:'Mitra'}}>رمز جدید</label>
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
                                                className="btn color5 d-flex flex-row"
                                                onClick={handleChangePassClick}
                                                style={{fontFamily:'Mitra',color:"white"}}
                                               
                                                >ذخیره </StyledButton>
                                            </div>
                                                
                                            </div>
                                            </div>
                                            </form>
                                            </div>
        </Modal.Body>
        <Modal.Footer>
          <StyledButton variant="info" onClick={handleClose} style={{fontFamily:'Mitra',right:10,color:"white"}}>
            بستن
          </StyledButton>
        </Modal.Footer>
      </Modal>
                                   
                                </div>
                            </div>
                            </div>
                            </div>
                            </div>
                            </div>
                            <div className="Tabz">
                              <Tabs/>
                              </div>
                            </div>
                            
    )
    
} 

export default withRouter(ProFile);


