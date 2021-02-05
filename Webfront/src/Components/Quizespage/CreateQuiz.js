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
import "./CreateQuiz.css";
import image from "../../assets/5.jpeg";
import Cookies from 'js-cookie';
import Snackbar from '@material-ui/core/Snackbar';
import {API_BASE_URL} from '../../constants/apiContants';
import { v4 as uuidv4 } from 'uuid';
function Quizespage (props){
    const [newQuiz,setNewQuiz] = useState({
        quiz_photo: "",
        title : "",
        description :""
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
    const [validation,setValidation] = useState(false);
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
    const [massage, setMassage]= useState(<br></br>);
const[openSnack,setOpenSnack]=useState(false);
const handleCloseSnack = (event, reason) => {
  if (reason === 'clickaway') {
  return;
  }
  setOpenSnack(false);
  };

    const sendQuestion = ()=> {
      var validate = true;
     inputFields.map((i)=>{
      if(i.question_text === '' || i.a_text === '' || i.b_text === '' || i.c_text === ''
      || i.d_text === '')
      {
        setMassage('تمامی فیلدهای مربوط به سؤال باید پر شوند')
        setOpenSnack(true);
        validate = false;
        
      }
      else if(i.key !='1' && i.key!='2' && i.key!='3' && i.key!='4'){
        setMassage(' لطفاً عددهای موردنظر را برای پاسخ درست وارد کنید')
        setOpenSnack(true);
        console.log(i.key);
        validate = false;
       }
       if(i.question_text.length>=100 || i.a_text.length>=20 || i.b_text.length>=20
       || i.c_text.length>=20 || i.d_text.length>=20){
        setMassage('متن سؤال باید حداکثر 100 و متن جواب حداکثر 20 کاراکتر داشته باشد')
        setOpenSnack(true);
        validate = false;
       }
      
    
    })
    console.log(validation);
    if(validate){
      setValidation(true);
    }
    else
    setValidation(false);
  }
  const va =()=>{
  const fd = new FormData();
  for (var i = 0; i < inputFields.length; i++) {
    fd.append(`questions[${i}]question_text`, inputFields[i].question_text)
    fd.append(`questions[${i}]a_text`, inputFields[i].a_text)
    fd.append(`questions[${i}]b_text`, inputFields[i].b_text)
    fd.append(`questions[${i}]c_text`, inputFields[i].c_text)
    fd.append(`questions[${i}]d_text`, inputFields[i].d_text)
    fd.append(`questions[${i}]key`, inputFields[i].key)
    }
    fd.append('title', newQuiz.title)
    fd.append('description', newQuiz.description)
    fd.append("question_count", (inputFields.length).toString());
    fd.append("quiz_photo",state.file)
     console.log(input);
     let back= JSON.stringify(fd);
     console.log(fd);
     if(newQuiz.title === ""){
      setMassage("عنوان آزمونک نمی‌تواند خالی باشد")
      setOpenSnack(true);
    }
    else if(newQuiz.description === ""){
      setMassage("توضیحات آزمونک نمی‌تواند خالی باشد")
      setOpenSnack(true);
    }
    else{
  axios.post(API_BASE_URL+'/quiz',fd,
  {
    headers:{
  "Content-Type":"application/json",
   "Authorization":"Token "+Cookies.get("userToken")}
    }
  ).then(response=>{    
    console.log(response.data.Quiz.id);
    if(response.data.message === "Your quiz successfully created!"){
      setMassage('آزمونک با موفقیت ساخته شد')
      setOpenSnack(true);
      var id = response.data.id;
      
        console.log(id);
        props.history.push( '/reviewQuiz/' + response.data.Quiz.id );
      
    }
    
  })
}

     }

    
    return(
        
        <div className="mx-md-1 pt-5 px-md-5">
        <div>
        <Snackbar
          anchorOrigin={{ vertical:'bottom', horizontal:'center'}}
          open={openSnack}
          autoHideDuration={2500}
          onClose={handleCloseSnack}
          message={<div style={{fontFamily:'Yekan',fontSize:17,marginLeft:36}}>{massage}</div>}
          />
       </div>
       <div className="container-fluid text-center px-md-5 py-md-5" >
         <div className="mx-md-5">
         <div className="no-gutters shadow table-borderless my-5 mx-1 ">
         <img src={image} className="avatar-Q img-responsive"/>
         <div className="name-Q mt-2">
  
  <b className=""style={{position:'relative',fontFamily:"Yekan",fontSize:25}}>ساخت آزمونک  
  </b>
  <hr className="border rounded-circle col-2 border-info"></hr>

  </div>
         <div class="row rowin">

            <div className="form-group-sm fg text-right">
                        <div>
                        <form className="yekanfont">
                    <label className="mt-2 mb-n1 "style={{fontSize:23}}>نام آزمونک</label>
                    <input 
                    className="form-control border-dark text-right " 
                      value={newQuiz.title}
                      id="title"
                      type="title"
                      onChange={handleChange}
                      placeholder="...عنوان"
                      />
                    <label className="mt-2 mb-n1"style={{fontSize:23}}> توضیحات آزمونک</label>
                    <textarea className="form-control border border-dark text-right" rows="3"id="description"
                      value={newQuiz.description}
                      type="description"
                      onChange={handleChange}
                      placeholder="...توضیحات"
                      ></textarea>
                    </form>
                    <label className="mt-2 mb-n1"style={{fontSize:23}}>انتخاب عکس</label>
                  <input class="form-control" 
                  type="file" accept="image/*" 
                  onChange={handleImageUpload} 
                  ref={imageUploader} 
                  style={{ display: "none",color:"white" }} />
                  <img src={newQuiz.quiz_photo} ref={uploadedImage} className="rounded d-block text-right pic"/>
                  <div className="btn mr-5 mt-n5" onClick={() => imageUploader.current.click()}>
                     
           <Tooltip  title= {<div style={{color: "white",
 fontFamily:"Yekan",
 fontSize:20,
 
 width:190,
 height:80,
 textAlign:"center",
 marginLeft:-9,
 paddingTop:20,}}>برای انتخاب عکس اینجا را کلیک کنید</div>}> 
                    <svg className="mark"  style={{width:30,height:30}} viewBox="0 0 24 24">
                      <path fill="currentColor" d="M5,3A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H14.09C14.03,20.67 14,20.34 14,20C14,19.32 14.12,18.64 14.35,18H5L8.5,13.5L11,16.5L14.5,12L16.73,14.97C17.7,14.34 18.84,14 20,14C20.34,14 20.67,14.03 21,14.09V5C21,3.89 20.1,3 19,3H5M19,16V19H16V21H19V24H21V21H24V19H21V16H19Z" />
                    </svg>
                    </Tooltip>
                  </div>
                  </div>
                  <hr className="border rounded-circle col-10 border-info"></hr>
                  <div className="name-Q1">
  
  <b className=""style={{position:'relative',fontFamily:"Yekan",fontSize:22}}>:سؤالات 
  </b>
  </div>
  { inputFields.map(inputField => (
    <div key={inputField.id}>
  <label className="mt-5 mb-n1 yekanfont" htmlFor="exampleInputUserName" style={{fontSize:23}}>سوال{inputField.count}</label>
  <textarea className="form-control border border-dark input-normal text-right"onChange={event => handleChangeInput(inputField.id, event)}
 rows="1" value={inputField.question_text} placeholder="...صورت سؤال"  name="question_text"></textarea>
  <label style={{fontSize:18}} className="mt-2 mb-n1 yekanfont">1 گزینهٔ</label>

                <input
                       className="form-control border-dark input-normal text-right" 
                       placeholder="...صورت جواب"
                       required
                       name="a_text"
                       value={inputField.a_text}
                       onChange={event => handleChangeInput(inputField.id, event)}
                       
                />

  <label style={{fontSize:18}} className="mt-2 mb-n1 yekanfont">2 گزینهٔ</label>


                <input
                       className="form-control border-dark input-normal text-right" 
                       placeholder="...صورت جواب"
                       required
                       name="b_text"
                       value={inputField.b_text}
                       onChange={event => handleChangeInput(inputField.id, event)}
                       
                      
                       
                />

  <label style={{fontSize:18}} className="mt-2 mb-n1 yekanfont">3 گزینهٔ</label>
  <div class="form-check text-right mr-n4 ">
</div>

                <input 
                       className="form-control border-dark input-normal text-right" 
                       name="c_text"
                       placeholder="...صورت جواب"
                       required
                       value={inputField.c_text}
                       onChange={event => handleChangeInput(inputField.id, event)}
                       
                       
                      
                       
                />

  <label style={{fontSize:18}} className="mt-2 mb-n1 yekanfont">4 گزینهٔ</label>

                <input 
                     type=""
                       className="form-control border-dark input-normal text-right" 
                       placeholder="...صورت جواب"
                       required
                       
                       name="d_text"
                       value={inputField.d_text}
                       onChange={event => handleChangeInput(inputField.id, event)}
                       
                />
                <label style={{fontSize:18}} className="mt-2 mb-n1 yekanfont"> گزینهٔ درست</label>
                <input 
                     type=""
                       className="form-control border-dark input-normal text-right" 
                       placeholder="... مثلاً 1"
                       required
                       name="key"
                       value={inputField.key}
                       onChange={event => handleChangeInput(inputField.id, event)}

                />
                 </div>
          
       ))}
       <div>
          { inputFields.length === 1 ?
           
           <Tooltip  title= {<div style={{color: "white",
 fontFamily:"Yekan",
 fontSize:20,
 
 width:190,
 height:80,
 textAlign:"center",
 marginLeft:-9,
 paddingTop:20,}}>آزمونک باید حداقل دارای یک سؤال باشد</div>}> 
         <button className="btn b btn-info rounded-lg" style={{color:"white"}}>
             حذف سؤال
         </button>
         </Tooltip>
     :
     <div>
     <button className="btn b btn-info rounded-lg" style={{color:"white"}} onClick={() => handleRemoveFields(inputFields[inputFields.length-1].id)}>
       حذف سؤال
 </button>
 </div>

}
</div>
{ inputFields.length === 15 ?
<Tooltip  title= {<div style={{color: "white",
fontFamily:"Yekan",
fontSize:20,

width:190,
height:80,
textAlign:"center",
marginLeft:-9,
paddingTop:20,}}>آزمونک باید حداکثر دارای 15 سؤال باشد</div>}> 
        <button className="btn b1 btn-info rounded-lg" style={{color:"white"}}>
                 اضافه‌کردن سؤال
                  </button>
        </Tooltip>
     :
     <button
     className="btn b1 btn-info rounded-lg"
     style={{color:"white"}}
       onClick={handleAddFields}
       disabled={inputFields.length === 15 } 
     >
      اضافه‌کردن سؤال
     </button>
}
<div>
{validation === false ?
 <Tooltip  title= {<div style={{color: "white",
 fontFamily:"Yekan",
 fontSize:20,
 
 width:190,
 height:80,
 textAlign:"center",
 marginLeft:-9,
 paddingTop:20,}}>پس از ارزیابی فیلدها توسط سیستم دکمهٔ ثبت  ظاهر می‌شود</div>}> 
         <button className=" btn b2 btn-info rounded-lg" onClick={sendQuestion}>ارزیابی</button>
         </Tooltip>
:
<button className=" btn b2 btn-info rounded-lg" onClick={va}>ثبت</button>

}
</div>
         </div>
         </div>
         </div>
         </div>
         </div>
         </div>
    )
}
export default withRouter(Quizespage);
