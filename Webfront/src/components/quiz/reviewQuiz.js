import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
import Cookies from 'js-cookie';
import Avatar from '@material-ui/core/Avatar';

function ReviewQuiz(props) {

    const [quiz,setQuiz] = useState([])
    const [creator,setCreator] = useState([]);
    const [questions,setQuestions] = useState([]);
    const [userAnswers,setUserAnswers] = useState([]);
    const [userScore,setUserScore] = useState("");


    useEffect(()=>{

      axios.get(`${API_BASE_URL}/user/${1}/quiz/${1}/result`)
      .then(response=>{
             console.log(response.data);
             setUserAnswers(response.data.user_answer);
             setUserScore(`امتیاز شما = ${response.data.score}`);
             setQuiz(response.data.Quiz);
             setCreator(response.data.Quiz.creator);
             setQuestions(response.data.Questions);

             var i;
            for(i=1;i < response.data.Questions.length+1;i++){
              document.getElementById(i+response.data.user_answer[i-1]).style.backgroundColor = "red";
              document.getElementById(i+response.data.user_answer[i-1]).style.color = "white";
             }
             var i;
            for(i=1;i < response.data.Questions.length+1;i++){
              document.getElementById(i+response.data.Questions[i-1].key).style.backgroundColor = "green";
              document.getElementById(i+response.data.Questions[i-1].key).style.color = "white";
             }
           })
           .catch(error=>{
             console.log(error);
           })
           .then(()=>{
               
           })

    },[props.match.params.quizId])


  const handleRuoteToQuizs=() =>{
    props.history.push('/quizez');
  }


  return(
    <div>
      <div className="mx-md-5 px-md-5">
        <div className="container-fluid  rTOl text-right px-md-5 mx-md-5 my-md-5" >
          <div className=" mx-md-5 my-1 px-md-3 shadow border rounded-lg ">
              <div >
                <div className="d-flex mx-2 pt-3">
                  <div className="d-flex flex-column flex-wrap ml-auto col-8">
                    <h1 className="my-1 rounded-lg " >{quiz.title}</h1>
                    <p className="my-1 text-break ">{quiz.description}</p>
                  </div>
                  <div className=" px-3 border-right border-dark my-auto">
                    <Avatar className="mx-auto mb-2" alt={creator.username} src={`${API_BASE_URL}${creator.profile_photo}`}  />
                    <p className="text-center my-n1">{` سازنده : ${creator.username}`}</p>
                    {/* <small className="text-center text-muted my-n1">{`${quiz.create_time.toString().split('T')[0]}`}</small> */}
                  </div>
                </div> 
              </div>
              <hr className="border border-dark"></hr>
              <div className="mx-2 mt-3">


              {questions === undefined ? (
                 

                 <p >نطری برای نمایش وجود ندارد</p>

                ) : (
                  <div>

                  {questions.map ((current) => (


                  <div className="border-left border-right">
                      
                      <h4 className="my-3 col-8 mx-auto"><p className="badge border-bottom border-left border-dark rounded-pill m-2">{current.question_num}</p>{current.question_text} </h4>
                      <div>
                        <div className=" btn-group-toggle d-flex flex-column col-8 mx-auto " id={current.question_num} data-toggle="buttons">
                          <label className="btn border-dark m-1 " id={current.question_num+"a"} >
                            <input type="radio" name={current.question_num} id="a" /> {current.a_text}
                          </label>
                          <label className="btn border-dark m-1" id={current.question_num+"b"}>
                            <input type="radio" name={current.question_num} id="b" /> {current.b_text}
                          </label>
                          <label className="btn border-dark m-1" id={current.question_num+"c"}>
                            <input type="radio" name={current.question_num} id="c" />{current.c_text}
                          </label>
                          <label className="btn border-dark m-1" id={current.question_num+"d"}>
                            <input type="radio" name={current.question_num} id="d" />{current.d_text}
                          </label>
                          <label className="active" id={current.question_num+"none"} ></label>
                        </div>
                      </div>
                      <hr className="border rounded-circle col-6 border-info"></hr>
                  </div>
                  
                  ))}
                  </div>
   
                      )} 

              </div>
              <h3 className="border-bottom border-top my-2 pt-2 border-success text-center mx-5 rounded-pill">{userScore}</h3>
              <div className="d-flex">
                <button className="btn mx-auto mb-2 btn-info" id="handleRuoteToQuizs" onClick={handleRuoteToQuizs} >خروج</button>
              </div>
             

          </div>
        </div>
      </div>
    </div>
    )
}

export default withRouter(ReviewQuiz);