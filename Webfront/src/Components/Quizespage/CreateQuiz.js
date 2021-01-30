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
    const [newGroup,setNewGroup] = useState({
        picture: "",
        name : "",
        description :""
       // backError : ""
      })
    const [state , setState]=useState(
        {
            navigate:false,
            file:null
        }
      )
    const imageUploader = React.useRef(null);
    const uploadedImage = React.useRef(null);

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
    const [countOfQ,setCount] = useState(1);
    
    const [inputFields, setInputFields] = useState([
      { id: uuidv4(), question:'', answer1:'',answer2:'',answer3:'',answer4:'',count:1,correctAnswer:'' },
    ]);
   
    console.log(inputFields.length);
      
    const handleChangeInput = (id, event) => {
      
      console.log(countOfQ);
      const newInputFields = inputFields.map(i => {
        if(id === i.id) {
          i[event.target.name] = event.target.value
        }
        return i;
      })
        console.log(inputFields.length+1);
        setInputFields(newInputFields);
        console.log(inputFields);
       
        console.log(countOfQ);
    }
    const handleAddFields = () => {
      console.log(countOfQ);
      setInputFields([...inputFields, { id: uuidv4(),  question:'', answer1:'',answer2:'',answer3:'',answer4:'',count:inputFields.length+1}])
      console.log(inputFields);

    }
    const handleRemoveFields = id => {

      const values  = [...inputFields];
      values.splice(values.findIndex(value => value.id === id),1);
      setInputFields(values);
      console.log(inputFields);
      
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
            
            <div className="form-group-sm text-right col-lg-5">
              
                <label style={{fontSize:18}} className="mt-2 mb-n1 yekanfont" htmlFor="exampleInputEmail1">عنوان آزمونک</label>
                <input type="email" 
                       className="form-control input-normal text-right" 
                       id="email" 
                       //aria-describedby="emailHelp" 
                       //placeholder="Enter email" 
                       placeholder="...عنوان"
                       required
                      
                       
                />
                <label style={{fontSize:18}} className="mt-2 mb-n1 yejanfont" htmlFor="exampleInputEmail1">توضیحات</label>
                <textarea className="form-control text-right" rows="1" id="comment" placeholder="...توضیح" name="text"></textarea>
                <div>
                  <input class="form-control" 
                  type="file" accept="image/*" 
                  onChange={handleImageUpload} 
                  ref={imageUploader} 
                  style={{ display: "none",color:"white" }} />

                  <div className="btn mr-5 mt-n4" onClick={() => imageUploader.current.click()}>
                    <svg className="mt-4"  style={{width:30,height:30}} viewBox="0 0 24 24">
                      <path fill="currentColor" d="M5,3A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H14.09C14.03,20.67 14,20.34 14,20C14,19.32 14.12,18.64 14.35,18H5L8.5,13.5L11,16.5L14.5,12L16.73,14.97C17.7,14.34 18.84,14 20,14C20.34,14 20.67,14.03 21,14.09V5C21,3.89 20.1,3 19,3H5M19,16V19H16V21H19V24H21V21H24V19H21V16H19Z" />
                    </svg>
                  </div>
                  <label src={newGroup.picture} ref={uploadedImage} style={{fontSize:18}} className="yakanfont" htmlFor="exampleInputEmail1">انتخاب عکس</label>
                  <hr/>

                  </div>
                  <div className="name-Q1">
  
  <b className=""style={{position:'relative',fontFamily:"Yekan",fontSize:22}}>سؤالات 
  </b>
  </div>
  { inputFields.map(inputField => (
    <div key={inputField.id}>
  <label style={{fontSize:18}} className="mt-2 mb-n1 yekanfont" htmlFor="exampleInputUserName">سوال{inputField.count}</label>
  <textarea className="form-control input-normal text-right"                       onChange={event => handleChangeInput(inputField.id, event)}
 rows="1" value={inputField.question} placeholder="...صورت سؤال"  name="question"></textarea>
  <label style={{fontSize:18}} className="mt-2 mb-n1 yekanfont">جواب 1</label>
  <div class="form-check text-right mr-n4 ">
  </div>

                <input
                       className="form-control input-normal text-right" 
                       placeholder="...صورت جواب"
                       required
                       name="answer1"
                       type="name"
                       value={inputField.answer1}
                       onChange={event => handleChangeInput(inputField.id, event)}
                       
                />

  <label style={{fontSize:18}} className="mt-2 mb-n1 yekanfont">جواب 2</label>
  <div class="form-check text-right mr-n4 ">
</div>

                <input
                       className="form-control input-normal text-right" 
                       placeholder="...صورت جواب"
                       required
                       name="answer2"
                       type="name"
                       value={inputField.answer2}
                       onChange={event => handleChangeInput(inputField.id, event)}
                       
                      
                       
                />

  <label style={{fontSize:18}} className="mt-2 mb-n1 yekanfont">جواب 3</label>
  <div class="form-check text-right mr-n4 ">
</div>

                <input 
                       className="form-control input-normal text-right" 
                       name="answer3"
                       placeholder="...صورت جواب"
                       type="name"
                       required
                       value={inputField.answer3}
                       onChange={event => handleChangeInput(inputField.id, event)}
                       
                       
                      
                       
                />

  <label style={{fontSize:18}} className="mt-2 mb-n1 yekanfont">جواب 4</label>
  <div class="form-check text-right mr-n4 ">
</div>

                <input 
                     type="name"
                       className="form-control input-normal text-right" 
                       placeholder="...صورت جواب"
                       required
                       
                       name="answer4"
                       value={inputField.answer4}
                       onChange={event => handleChangeInput(inputField.id, event)}
                       
                />
                <label style={{fontSize:18}} className="mt-2 mb-n1 yekanfont">عدد گزینهٔ درست</label>
                <input 
                     type=""
                       className="form-control input-normal text-right" 
                       placeholder="... گزینهٔ درست"
                       required
                       name="correctAnswer"
                       value={inputField.correctAnswer}
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
         <button className="btn b" style={{color:"blue",fontSize:15}}>
             حذف سؤال
         </button>
         </Tooltip>
         

     :
     <div>
 
     <button className="btn b" style={{color:"blue",fontSize:15}} onClick={() => handleRemoveFields(inputFields[inputFields.length-1].id)}>
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
        
         </div>
         </div>
         </div>
         </div>
         </div>
         </div>
    )
}
export default withRouter(Quizespage);
