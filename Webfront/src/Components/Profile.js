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
import {API_BASE_URL} from '../constants/apiContants';
import MyGroups from '../Tabs/MyGroupsTab.js';
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
            axios.get(API_BASE_URL + '/user/' + Cookies.get('userId'))
                .then(function (response){
                  console.log(response);
                  console.log(response.data);
                  setUser(prevState => ({ 
                    ...prevState,
                    userName: response.data.username,
                    email: response.data.email,
                    picture : API_BASE_URL +response.data.profile_photo
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
        axios.put(API_BASE_URL+ '/user/'+Cookies.get('userId')+'/update-profile',
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

            axios.put( API_BASE_URL+ '/user/'+Cookies.get('userId')+'/change-password',
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
   axios.put(API_BASE_URL+ '/user/'+Cookies.get('userId')+'/update-profile'
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
const [read,setRead] = useState();
const[reading,setReading] = useState();
const[wantto,setWantto] = useState();


const apiURLRead = API_BASE_URL + `/user/${Cookies.get('userId')}/collection?type=Read`;
const apiURLReading = API_BASE_URL + `/user/${Cookies.get('userId')}/collection?type=Reading`;
const apiURLWantto = API_BASE_URL + `/user/${Cookies.get('userId')}/collection?type=ToRead`;
useEffect(() => {
  axios.get(apiURLRead,{
    headers:{
      "Content-Type":"application/json",
   "Authorization":"Token "+Cookies.get("userToken")}
    })
    .then((data) => {
      console.log(data.data.data);
      console.log(data.data.Count);
      setRead(data.data.Count);
    });
}, []);
useEffect(() => {
    axios.get(apiURLReading,{
      headers:{
        "Content-Type":"application/json",
     "Authorization":"Token "+Cookies.get("userToken")}
      })
      .then((data) => {
        console.log(data.data.data);
        console.log(data.data.Count);
        setReading(data.data.Count);
      });
  }, []);
  useEffect(() => {
    axios.get(apiURLWantto,{
      headers:{
        "Content-Type":"application/json",
     "Authorization":"Token "+Cookies.get("userToken")}
      })
      .then((data) => {
        console.log(data.data.data);
        console.log(data.data.Count);
        setWantto(data.data.Count);
      });
  }, []);

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
                                    <button type="button" className="btn btn1 btn-info rounded-lg"
                                     data-toggle="collapse" 
                                     data-target="#navbarToggleExternalContent" 
                                     aria-controls="navbarToggleExternalContent" 
                                     aria-expanded="false"
                                     variant="gray"
                                     onClick={handleShow}


                                     aria-label="Toggle navigation"style={{fontFamily:'Yekan',marginTop:10,color:"white",fontWeight:"bold"}}>
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

                                        <div className="d-flex heading justify-content-between mt-md-n1 ml-5 mr-5">
                                        <b className="heading1 mr-n3 "style={{fontFamily:'Iranian Sans'}}>{read}</b>
                                        <b className="heading2"style={{fontFamily:'Iranian Sans'}}>{wantto}</b>
                                        <b className="heading3"style={{fontFamily:'Iranian Sans'}}>{reading}</b> 
                                        </div>
                                        <div className="d-flex justify-content-between mt-md-2">
                                        <b className="description decsciptionmine3 ml-3 ">خوانده‌ام</b>

                                        <b className="description decsciptionmine1 ml-n4">می‌خواهم بخوانم</b>
                                        <b className="description decsciptionmine2 pr-n5 mr-2">دارم می‌خوانم</b>
                                        </div>  
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

                 <button className="btn custom-btn btn-info rounded-lg" type="submit"onClick={handleUpload}style={{fontFamily:'Yekan',color:"white"}}>ثبت عکس</button>

                <input class="form-control" 
                type="file" accept="image/*" 
                onChange={handleImageUpload} 
                ref={imageUploader} 

                style={{ display: "none",color:"white" }} />
              <button className="btn custom-btn1 btn-info rounded-lg" type="submit" style={{fontFamily:'Yekan',color:"white"}}

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
                                                  class="form-control"
                                                  id="userName"
                                                //   placeholder={user.userName}
                                                  value={user.userName}
                                                  onChange={handleChange}/>
                                            </div>
                                            <div class=" my-2">
                                                <button
                                                type="submit" 
                                                className="btn d-flex flex-row btn-info rounded-lg "
                                                onClick={handleChangeInfosClick}


                                                style={{color:"white",fontFamily:'Yekan'}}


                                                >ذخیره</button>
                                                <div class="my-1">
                                                <label for="password" style={{fontFamily:"Yekan"}}>رمز قبلی</label>
                                                <input type="password"

                                                  class="form-control"

                                                  id="oldPass"


                                                  value={user.oldPass}
                                                  onChange={handleChange}/>
                                            </div>
                                            <div class="my-1">
                                                <label for="password"style={{fontFamily:"Yekan"}}>رمز جدید</label>
                                                <input type="password"

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
                                                <button
                                                type="submit" 
                                                className="btn  d-flex flex-row btn-info rounded-lg"
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

        
          <button className="btn rounded-lg mx-4"  onClick={handleClose} style={{fontFamily:'Yekan',color:"black"}}>

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


