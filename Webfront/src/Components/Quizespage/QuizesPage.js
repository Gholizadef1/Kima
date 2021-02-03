import React, {useEffect, useState} from "react";
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useRouteMatch,
  useParams,
  withRouter
} from "react-router-dom";
  import {GoSearch} from 'react-icons/go';

import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Cookies from 'js-cookie';
import Snackbar from '@material-ui/core/Snackbar';
import {API_BASE_URL} from '../../constants/apiContants';



function Quizespage (props){
  const [groups,setGroups] = useState([]);
  const [filterBase,setFilterBase]= useState("time");
  const [isMine,setIsMine]=useState(false);
  const [page, setPage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState();
  

  useEffect(()=>{
    if(isMine){
      axios.get(`${API_BASE_URL}/quiz`
      ,{
        headers:{
       "Authorization":"Token "+Cookies.get("userToken")}
        })
      .then(response=>{
        console.log(response.data.Quiz);
        //setGroups(response.data.groups);
        setGroups(response.data.Quiz);
        console.log("f")
      
        // setPagesNumber(response.data.count)
      })
    }
  },[filterBase,page,isMine])


  const handleChangeList =(e) =>{
    setPage(1);
    if(e.target.value==="all"){
    setFilterBase(e.target.value);
    setIsMine(false)
    console.log("fj");
    }else if(e.target.value==="mine") {
      // const newList = groups.filter((item)=>item.is_member === true);
      // setGroups(newList);
      // //setPagesNumber(0)
      setIsMine(true);
      console.log("fj");

    }
    console.log(e.target.value);


    
    //console.log(e.target.value);
  }

  const [openCreateGroup, setOpenCreateGroup] = useState(false);

  const routeToCreateQuize = () => {
    
        props.history.push('/creatquize');
      
  };

  const handleCloseCreateGroup = () => {
    setOpenCreateGroup(false);
    setNewGroup({
      picture: "defualt.jpg",
      name : "",
      description :""
     // backError : ""
    }); 
  };

  const [newGroup,setNewGroup] = useState({
    picture: "defualt.jpg",
    name : "",
    description :""
   // backError : ""
  })

  const handleChange = (e) => {
    const {id , value} = e.target   
    setNewGroup(prevState => ({
        ...prevState,
        [id] : value
    }))
}

const handleCreateGroupSubmit =(e) =>{
  e.preventDefault();

  if(newGroup.name === ""){
    setMassage("اسم آزمونک نمی‌تواند خالی باشد")
    setOpenSnack(true);
  }
  else if(newGroup.description === ""){
    setMassage("توضیحات آزمونک نمی‌تواند خالی باشد")
    setOpenSnack(true);
  }

  else{

  var formdata = new FormData()
  formdata.append('title',newGroup.name)
  formdata.append('summary',newGroup.description)
  formdata.append('photo',state.file)

  axios.post(API_BASE_URL+ '/group',formdata,
  {
    headers:{
   "Content-Type":"application/json",
   "Authorization":"Token "+Cookies.get("userToken")}
    }
  )
  .then(response=>{
    console.log(response);

    if(response.data.message === "Your group is succesfully created!"){
      setMassage('آزمونک با موفقیت ساخته شد')
      setOpenSnack(true);
      handleCloseCreateGroup();
      routeToQuizHandler(response.data.data.id);
    }
    else{
      setMassage("آزمونک از قبل وجود دارد")
      setOpenSnack(true);
    }
  })
  .catch(error=>{
    console.log(error);
    setMassage("مشکلی پیش آمده دوباره امتحان کنید")
    setOpenSnack(true);
  });
}
}

const [state , setState]=useState(
  {
      navigate:false,
      file:null
  }
)
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
      setNewGroup(prevState => ({
        ...prevState,
        picture : e.target.result
    }));

    };
    reader.readAsDataURL(file);
  }
};

const [massage, setMassage]= useState(<br></br>);
const[openSnack,setOpenSnack]=useState(false);
const handleCloseSnack = (event, reason) => {
  if (reason === 'clickaway') {
  return;
  }
  setOpenSnack(false);
  };

  const [searchWord,setSearchWord]=useState("");

  const handleChangeSearchWord = (e) => {
    const {value} = e.target   
    setSearchWord(value);
  };

  const handleGoSearchGroup = ( ) => {
    console.log( searchWord);
    setPagesNumber(1);
    axios.get(`${API_BASE_URL}/group?search=${searchWord}&search-fields=title`,{
      headers:{
     "Authorization":"Token "+Cookies.get("userToken")}
      })
      .then(response=>{
        console.log(response);
        setGroups(response.data.results);
      })
      .catch(error=>{
        console.log(error);
      });
  }
  
  const routeToQuizHandler = ( id ) => {
    console.log(id);
    props.history.push( '/takequiz/' + id );
  }
  const routeToMyQuizHandler = ( id ) => {
    console.log(id);
    props.history.push( '/reviw/' + id );
  }


    return(
        <div className="container-fluid rTOl my-md-5 px-md-5">
            <div className="d-flex  my-4 flex-wrap mx-md-5 px-md-4 ">
              <div className="d-flex ml-auto ">
                <div variant="gray" className="btn" onClick={handleGoSearchGroup} >
                  <GoSearch size="30" color="black"/>
                </div>
                <input className=" shadow form-control rounded-pill px-4 text-right "
                 type="title" name="group" placeholder="جستجوی آزمونک... " 
                 value={searchWord}
                 onChange={handleChangeSearchWord}/>  
                <div variant="gray" className="btn">
                </div>
              </div>
              <div className="rounded-pill mx-md-4 mx-2">
                <select className="form-control rounded-pill shadow yekanfont" onClick={handleChangeList} >
                  <option class="yekanfont" value="all">همهٔ آزمونک‌ها</option>
                  <option value="mine">آزمونک‌های من</option>
                </select>
              </div>
              <div>
                <div className="btn btn-info rounded-lg  shadow" onClick={routeToCreateQuize}>
                  آزمون جدید
                </div>

                <Dialog  open={openCreateGroup} onClose={handleCloseCreateGroup} aria-labelledby="form-dialog-title" style={{direction:"rtl",textAlign:"right"}}>
                  <DialogTitle  id="form-dialog-title">
                    <h5 style={{fontFamily:'Yekan'}}> گروه جدید بسازید</h5>
                  </DialogTitle>
                  <DialogContent className="yekanfont">
                  <div>
                  <input class="form-control" 
                  type="file" accept="image/*" 
                  onChange={handleImageUpload} 
                  ref={imageUploader} 
                  style={{ display: "none",color:"white" }} />

                  <img src={newGroup.picture} ref={uploadedImage} style={{width:270}} alt=" انتخاب عکس" className="rounded-lg d-block text-center mx-md-5"/>
                  <div className="btn mr-5 mt-n4" onClick={() => imageUploader.current.click()}>
                    <svg className=""  style={{width:30,height:30}} viewBox="0 0 24 24">
                      <path fill="currentColor" d="M5,3A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H14.09C14.03,20.67 14,20.34 14,20C14,19.32 14.12,18.64 14.35,18H5L8.5,13.5L11,16.5L14.5,12L16.73,14.97C17.7,14.34 18.84,14 20,14C20.34,14 20.67,14.03 21,14.09V5C21,3.89 20.1,3 19,3H5M19,16V19H16V21H19V24H21V21H24V19H21V16H19Z" />
                    </svg>
                  </div>

                  <form className="yekanfont">
                    <label className="mt-2 mb-n1 ">نام گروه</label>
                    {/* <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      value={newGroup.name}
                      type="title"
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                    /> */}
                    <input 
                    className="form-control" 
                      id="name"
                      value={newGroup.name}
                      type="title"
                      onChange={handleChange}></input>


                    <label className="mt-2 mb-n1">توضیحات</label>
                    <textarea className="form-control" rows="3"id="description"
                      value={newGroup.description}
                      type="description"
                      onChange={handleChange}></textarea>

                    </form>
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button style={{fontFamily:'Yekan',fontSize:16}} onClick={handleCloseCreateGroup} color="black">
                      انصراف
                    </Button>
                    <Button style={{fontFamily:'Yekan',fontSize:16}} onClick={handleCreateGroupSubmit} color="black">
                      ثبت
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>

            <div className="my-3">
              <hr></hr>
            </div>

            <div className="mx-md-5 px-md-5"  >
               

                {groups.length === 0 ? (
                 

                 <p >کوییزی برای نمایش وجود ندارد</p>

                ) : (
                  <div class="row row-cols-1 row-cols-md-4 row-cols-sm-2" style={{textAlign:'right'}}>

                {groups.map ((current) => (
                  

                  <div class="col mb-4">
                    <div class="card h-100 text-right shadow-lg" >
                      <img src={current.quiz_photo} class="card-img-top shadow-sm " alt={current.title}/>
                      <div class="card-body">
                        <h5 class="card-title m-n2  yekanfont"  style={{fontSize:22}}>عنوان: {current.title}</h5>  {current.description.length >= 80 ?(
                          <div>
                           <p class="card-text yekanfont mt-3" style={{fontSize:20}}>توضیحات: {current.description.substring(0, 60)}</p>
                           <div className="btn text-muted" onClick={() => routeToQuizHandler(current.id)}>بیشتر...</div>
                           </div>
                        ):(
                          <p class="card-text  yekanfont mt-3"style={{fontSize:20}}>توضیحات: {current.description}</p>
                        )}
                        
                      </div>
                      <div className="align-items-center m-3">
                        <h6 class="card-subtitle  text-muted  yekanfont">تعداد سؤالات: {current.question_count}</h6>
                        <h6 class="card-subtitle  text-muted  yekanfont">سازنده: {current.creator.username}</h6>

                        {groups.is_owner === true?
                        <div className="text-left mt-n3 ">
                        <button onClick={() => routeToMyQuizHandler(current.id)} className="btn mt-n3  btn-info rounded-lg" style={{color:'white'}}>مرور آزمون</button>
                        </div>
                        :
                        <div></div>
}
                      {groups.is_none === true ?
                        <div className="text-left mt-n3 ">
                        <button onClick={() => routeToQuizHandler(current.id)} className="btn mt-n3  btn-info rounded-lg" style={{color:'white'}}>شرکت در آزمون</button>
                        </div>
                        :
                        <div></div>
                         }
                         {groups.is_taken === true ?
                        <div className="text-left mt-n3 ">
                        <button onClick={() => routeToQuizHandler(current.id)} className="btn mt-n3  btn-info rounded-lg" style={{color:'white'}}>  آزمون</button>
                        </div>
                        :
                        <div></div>
                         }
                       
                      </div>
                      
                    </div>
                  </div>
               ))}
                </div>

                   )}
            </div>

            <div className="mb-5">

              {pagesNumber===1 ?(
                <p></p>

              ):(
                <div>
                {Array.from(Array(pagesNumber),(e,i)=>{
                  return <div className="btn btn-light" 
                  onClick={()=>{setPage(i+1)}}
                  > {i+1} </div>
                })}
                </div>
              )}
              </div>

            <Snackbar
          anchorOrigin={{ vertical:'bottom', horizontal:'center'}}
          open={openSnack}
          autoHideDuration={2500}
          onClose={handleCloseSnack}
          message={<div style={{fontFamily:'Yekan',fontSize:17}}>{massage}</div>}
          />
        </div>


    )



} 

export default withRouter(Quizespage);



