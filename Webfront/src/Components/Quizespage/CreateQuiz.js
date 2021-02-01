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
import Tooltip from '@material-ui/core/Tooltip';
  import {GoSearch} from 'react-icons/go';
import "./CreateQuiz.css";
import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField';
import image from "../../assets/5.jpeg";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Cookies from 'js-cookie';
import Snackbar from '@material-ui/core/Snackbar';
import {API_BASE_URL} from '../../constants/apiContants';
import { v4 as uuidv4 } from 'uuid';

function Quizespage (props){
    const [newQuiz,setNewQuiz] = useState({
        quiz_photo: "",
        title : "",
        description :""
       // backError : ""
      })
    const [state , setState]=useState(
        {
            navigate:false,
            file:null
        }
      )
      console.log(state.title);
    const imageUploader = React.useRef(null);
    const uploadedImage = React.useRef(null);
    var sendpic = new FormData()
    sendpic.append("quiz_photo",state.file)
    const handleImageUpload = e => {
        setState({file:e.target.files[0]});
        const [file] = e.target.files;
        if (file) {
          const reader = new FileReader();
          const { current } = uploadedImage;
          current.file = file;
          reader.onload = e => {
            //current.src = e.target.result;
            setNewQuiz(prevState => ({
              ...prevState,
              quiz_photo : e.target.result
          }));
      
          };
          reader.readAsDataURL(file);
        }
    };
    const [valid,setValid] = useState(false);
    const[countOfQ,setCount]=useState();
    const [inputFields, setInputFields] = useState([
      { id: uuidv4(), question_text:'',a_text:'',b_text:'',c_text:'',d_text:'',count:1,key:'' },
    ]);
    const [input, setInput] = useState([
      {question_text:'',a_text:'',b_text:'',c_text:'',d_text:'',key:'' },
    ]);
   
    console.log(inputFields.length);
    const handleChange = (e) => {
      const {id , value} = e.target   
      setNewQuiz(prevState => ({
          ...prevState,
          [id] : value
      }))
  }
   

    const handleChangeInput = (id, event) => {
      
     
      console.log(input);
      const newInputFields = inputFields.map(i => {
        if(id === i.id) {
          i[event.target.name] = event.target.value
        }
        return i;
      })
        console.log(inputFields.length+1);
        setInputFields(newInputFields);
        setInput(newInputFields);
        console.log(input);
        console.log(inputFields);
       
        console.log(input);
    }
    const handleAddFields = () => {
      console.log(countOfQ);
      setInputFields([...inputFields, { id: uuidv4(),  question_text:'', a_text:'',b_text:'',c_text:'',d_text:'',count:inputFields.length+1,key:''}])
      console.log(inputFields);

    }
    const handleRemoveFields = id => {

      const values  = [...inputFields];
      values.splice(values.findIndex(value => value.id === id),1);
      setInputFields(values);
      console.log(inputFields);
      
    }
    console.log(inputFields);
    const sendQuestion = (e)=> {
    const fd = {
    "title":newQuiz.title,
    "description":newQuiz.description,
    "question_count":inputFields.length,
    "quiz_photo":state.file,
    "questions":inputFields
    }
     console.log(input);
     let back= JSON.stringify(fd);
     console.log(fd);
      axios.post(API_BASE_URL+'/quiz',back,
  {
    headers:{
   "Content-Type":"application/json",
   "Authorization":"Token "+Cookies.get("userToken")}
    }
  )
    
    }
    return(
        
        <div className="mx-md-1 pt-5 px-md-5">
        <div>
       </div>
       <div className="container-fluid text-center px-md-5 py-md-5" >
         <div className="mx-md-5">
         <div className="no-gutters shadow table-borderless my-5 mx-2 ">
         <img src={image} className="avatar-Q img-responsive"/>
         <div className="name-Q">
  
  <b className=""style={{position:'relative',fontFamily:"Yekan",fontSize:25}}>ساخت آزمونک  
  </b>
  </div>
         <div class="row rowin">

            <div className="form-group-sm text-right  col-lg-5">
                        <div>
                        <form className="yekanfont">
                    <label className="mt-2 mb-n1 ">نام آزمونک</label>
                    <input 
                    className="form-control text-right " 
                      value={newQuiz.title}
                      id="title"
                      type="title"
                      onChange={handleChange}
                      placeholder="...عنوان"
                      />
                    <label className="mt-2 mb-n1"> توضیحات آزمونک</label>
                    <textarea className="form-control text-right" rows="3"id="description"
                      value={newQuiz.description}
                      type="description"
                      onChange={handleChange}
                      placeholder="...توضیحات"
                      ></textarea>
                    </form>
                  
                  <input class="form-control" 
                  type="file" accept="image/*" 
                  onChange={handleImageUpload} 
                  ref={imageUploader} 
                  style={{ display: "none",color:"white" }} />
                  <img src={newQuiz.quiz_photo} ref={uploadedImage} style={{width:270}} alt=" انتخاب عکس" className="rounded-lg d-block text-center mx-md-5"/>
                  <div className="btn mr-5 mt-n4" onClick={() => imageUploader.current.click()}>
                    <svg className=""  style={{width:30,height:30}} viewBox="0 0 24 24">
                      <path fill="currentColor" d="M5,3A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H14.09C14.03,20.67 14,20.34 14,20C14,19.32 14.12,18.64 14.35,18H5L8.5,13.5L11,16.5L14.5,12L16.73,14.97C17.7,14.34 18.84,14 20,14C20.34,14 20.67,14.03 21,14.09V5C21,3.89 20.1,3 19,3H5M19,16V19H16V21H19V24H21V21H24V19H21V16H19Z" />
                    </svg>
                  </div>
                  </div>
       
                  <div className="name-Q1">
  
  <b className=""style={{position:'relative',fontFamily:"Yekan",fontSize:22}}>سؤالات 
  </b>
  </div>
  { inputFields.map(inputField => (
    <div key={inputField.id}>
  <label style={{fontSize:18}} className="mt-5 mb-n1 yekanfont" htmlFor="exampleInputUserName" style={{fontSize:23}}>سوال{inputField.count}</label>
  <textarea className="form-control input-normal text-right"onChange={event => handleChangeInput(inputField.id, event)}
 rows="1" value={inputField.question_text} placeholder="...صورت سؤال"  name="question_text"></textarea>
  <label style={{fontSize:18}} className="mt-2 mb-n1 yekanfont">جواب 1</label>
  <div class="form-check text-right mr-n4 ">
  </div>

                <input
                       className="form-control input-normal text-right" 
                       placeholder="...صورت جواب"
                       required
                       name="a_text"
                       value={inputField.a_text}
                       onChange={event => handleChangeInput(inputField.id, event)}
                       
                />

  <label style={{fontSize:18}} className="mt-2 mb-n1 yekanfont">جواب 2</label>


                <input
                       className="form-control input-normal text-right" 
                       placeholder="...صورت جواب"
                       required
                       name="b_text"
                       value={inputField.b_text}
                       onChange={event => handleChangeInput(inputField.id, event)}
                       
                      
                       
                />

  <label style={{fontSize:18}} className="mt-2 mb-n1 yekanfont">جواب 3</label>
  <div class="form-check text-right mr-n4 ">
</div>

                <input 
                       className="form-control input-normal text-right" 
                       name="c_text"
                       placeholder="...صورت جواب"
                       required
                       value={inputField.c_text}
                       onChange={event => handleChangeInput(inputField.id, event)}
                       
                       
                      
                       
                />

  <label style={{fontSize:18}} className="mt-2 mb-n1 yekanfont">جواب 4</label>

                <input 
                     type=""
                       className="form-control input-normal text-right" 
                       placeholder="...صورت جواب"
                       required
                       
                       name="d_text"
                       value={inputField.d_text}
                       onChange={event => handleChangeInput(inputField.id, event)}
                       
                />
                <label style={{fontSize:18}} className="mt-2 mb-n1 yekanfont">عدد گزینهٔ درست</label>
                <input 
                     type=""
                       className="form-control input-normal text-right" 
                       placeholder="... گزینهٔ درست"
                       required
                       name="key"
                       value={inputField.key}
                       onChange={event => handleChangeInput(inputField.id, event)}

                />
                 </div>
          
       ))}
          { inputFields.length === 1 ?
           
           <Tooltip  title= {<div style={{color: "white",
 fontFamily:"Yekan",
 fontSize:20,
 
 width:190,
 height:80,
 textAlign:"center",
 marginLeft:-9,
 paddingTop:20,}}>آزمونک باید حداقل دارای یک سؤال باشد</div>}> 
         <button className="btn b" style={{color:"black",fontSize:15}}>
             حذف سؤال
         </button>
         </Tooltip>
         

     :
     <div>
 
     <button className="btn b" style={{color:"black",fontSize:15}} onClick={() => handleRemoveFields(inputFields[inputFields.length-1].id)}>
       حذف سؤال
 </button>
 </div>

}
{ inputFields.length === 15 ?
<Tooltip  title= {<div style={{color: "white",
fontFamily:"Yekan",
fontSize:20,

width:190,
height:80,
textAlign:"center",
marginLeft:-9,
paddingTop:20,}}>آزمونک باید حداکثر دارای 15 سؤال باشد</div>}> 
        <button className="btn" style={{color:"blue",fontSize:15}}>
                 / اضافه‌کردن سؤال
                  </button>
        </Tooltip>
     :
     <button
     className="btn"
     style={{color:"blue",fontSize:15}}
       onClick={handleAddFields}
       disabled={inputFields.length === 15 } 
     >
       / اضافه‌کردن سؤال
     </button>
}
<button onClick={sendQuestion(inputFields)}>ثبت</button>
        
         </div>
         </div>
         </div>
         </div>
         </div>
         </div>
    )
}
export default withRouter(Quizespage);
