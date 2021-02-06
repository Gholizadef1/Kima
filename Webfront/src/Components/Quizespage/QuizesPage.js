import React, {useEffect, useState} from "react";
import axios from 'axios';
import Tooltip from '@material-ui/core/Tooltip';
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
import {AiFillStar} from "react-icons/ai";


function Quizespage (props){
  const [groups,setGroups] = useState([]);
  const [filterBase,setFilterBase]= useState("all");
  const [isMine,setIsMine]=useState(false);
  
  const [page, setPage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState();
  const[me,setMe]=useState("");
  const[notme,setNotme]=useState("");
  const handleChangeList =(e) =>{
    setPage(1);
    if(e.target.value!=="mine"){
    setFilterBase(e.target.value);
    setIsMine(false)
    console.log(isMine);
    }else {
      console.log(groups);
      // const newList = groups.filter((item)=>item.is_none === false);
      // setGroups(newList);
      setPagesNumber(0)
      setIsMine(true);
    }
  }

  useEffect(()=>{
    if(isMine){
      axios.get(API_BASE_URL+ `/user/${Cookies.get("userId")}/quiz`
     )
      .then(response=>{
        console.log(response.data.Quiz)
        setGroups(response.data.Quiz);
          console.log("f")
        })}
     if(isMine === false){
        axios.get(API_BASE_URL+ `/quiz?page=`+page
      ,{
        headers:{
       "Authorization":"Token "+Cookies.get("userToken")}
        })
      .then(response=>{
        console.log(response.data.Quiz)
        console.log(response.data.Quiz.length)

        // const newList = response.data.Quiz.filter((item)=>item.is_none === true);
        // console.log(newList);
        setGroups(response.data.Quiz);
        setPagesNumber(response.data.count)
        console.log(groups);
        console.log(me);
        console.log("f")
        })
      }
  },[filterBase,page,isMine])


 
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
    axios.get(`${API_BASE_URL}/quizes?search=${searchWord}`,{
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
    props.history.push( '/takeQuiz/' + id );
  }
  const routeToMyQuizHandler = ( id ) => {
    console.log(id);
    props.history.push( '/reviewQuiz/' + id );
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
                 
                  <option class="yekanfont" value="all">آزمونک‌ها</option>
                  
                  <option value="mine">آزمونک‌های من</option>
                </select>
                
              </div>
              <div>
                <div className="btn btn-info rounded-lg  shadow" onClick={routeToCreateQuize}>
                  آزمون جدید
                </div>  
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
                      {
                        isMine === true ? <img src={API_BASE_URL+`tutorial`+current.quiz_photo} class="card-img-top shadow-sm " alt={current.title}/>
                        :
                        <img src={API_BASE_URL+`tutorial`+current.quiz_photo.substring(27)} class="card-img-top shadow-sm " alt={current.title}/>
                      }
                      
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
                        <h6 class="card-subtitle pb-3  text-muted  yekanfont">تعداد سؤالات: {current.question_count}</h6>
                        <h6 class="card-subtitle  text-muted  yekanfont">سازنده: {current.creator.username}</h6>
                        {(current.creator.username === Cookies.get.userName) ? <AiFillStar></AiFillStar>:<div></div>
                        
                      }

                        {(isMine === true ) || (isMine===false&& current.is_none === false) ?
                        <div className="text-left mt-n3 ">
                        <button onClick={() => routeToMyQuizHandler(current.id)} className="btn mt-n3  btn-info rounded-lg" style={{color:'white'}}>مرور آزمون</button>
                        </div>
                        :
                        
                         <div className="text-left mt-n3 ">
                        <button onClick={() => routeToQuizHandler(current.id)} className="btn mt-n3  btn-info rounded-lg" style={{color:'white'}}>شرکت در آزمون</button>
                       
                        </div>
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



