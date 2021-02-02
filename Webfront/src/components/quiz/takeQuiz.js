import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
import Cookies from 'js-cookie';
import Avatar from '@material-ui/core/Avatar';

function TakeQuiz(props) {

    const [quiz,setQuiz] = useState([])
    const [creator,setCreator] = useState([]);
    const [questions,setQuestions] = useState([]);
    const [userAnswers,setUserAnswers] = useState([]);
    const [userScore,setUserScore] = useState("");


    useEffect(()=>{
        axios.get(API_BASE_URL + "/quiz/" + 1)
        .then(response=>{
            setQuiz(response.data.Quiz);
            setCreator(response.data.Quiz.creator);
            setQuestions(response.data.Questions);
             console.log(response);
           })
           .catch(error=>{
             console.log(error);
           });
    },[props.match.params.quizId])

    const submitAnswer = (e) => {
      e.target.setAttribute("disabled", "");
      
      //show true answers
      //document.getElementById("a").style.backgroundColor = "red";
      //document.getElementById("a").style.backgroundColor = "green";
      //document.getElementById("a").style.color = "white";
      var i;
      for(i=1;i < questions.length+1;i++){
        var chosen= document.getElementById(i).getElementsByClassName("active")[0].id;
        document.getElementById(chosen).style.color = "white";
        document.getElementById(chosen).style.backgroundColor = "red";
        //console.log(chosen);
        //console.log(questions.questions_num + chosen);
        document.getElementById(i+questions[i-1].key).style.backgroundColor = "green";
        document.getElementById(i+questions[i-1].key).style.color = "white";
         setUserAnswers( userAnswers.push(chosen[chosen.length -1]));
        //console.log(lastChar(chosen));
        console.log(chosen[chosen.length -1]);
        
       }
      
      //post answer
      const payload={
        "user_answer": userAnswers
      }
      //const back= JSON.stringify(userAnswers);
      console.log(userAnswers);
      axios.post(API_BASE_URL + "/quiz/" + 1
      ,payload
      ,{
        headers:{
        "Content-Type":"application/json",
       "Authorization":"Token "+Cookies.get("userToken")}
        })
        .then(response=>{
             console.log(response);
             //setUserScore(response.data.score+"امتیاز شما = ");
             setUserScore(`امتیاز شما = ${response.data.score}`);
           })
           .catch(error=>{
             console.log(error);
           });
  }


  return(
    <div>
      <div className="mx-md-5 px-md-5">
        <div className="rTOl text-right px-md-5 mx-md-5" >
          <div className="mx-md-5 my-5 px-md-3 shadow border rounded-lg ">
              <div >
                <div className="d-flex mx-2 pt-3">
                  <div className="d-flex flex-column flex-wrap ml-auto col-8">
                    <h1 className="my-1 rounded-lg " >{quiz.title}</h1>
                    <p className="my-1 text-break ">{quiz.description}</p>
                  </div>
                  <div className=" px-3 border-right border-dark my-auto">
                    <p className="text-center my-1">سازنده :</p>
                    <Avatar className="mx-auto mb-2" alt={creator.username} src={`${API_BASE_URL}${creator.profile_photo}`}  />
                    <p className="text-center my-n1">{creator.username}</p>
                    {/* <small className="text-center text-muted my-n1">{`${quiz.create_time.toString().split('T')[0]}`}</small> */}
                  </div>
                </div> 
              </div>
              <hr className="border border-dark"></hr>
              <div className="mx-2 mt-5">


              {questions === undefined ? (
                 

                 <p >نطری برای نمایش وجود ندارد</p>

                ) : (
                  <div>

                  {questions.map ((current) => (


                  <div className="">
                      
                      <h4 className="my-4 col-8 mx-auto"><p className="badge border-bottom border-left border-dark rounded-pill m-2">{current.question_num}</p>{current.question_text} </h4>
                      <div>
                        <div className=" btn-group-toggle d-flex flex-column col-8 mx-auto " id={current.question_num} data-toggle="buttons">
                          <label className="btn btn-outline-dark m-1" id={current.question_num+"a"}>
                            <input type="radio" name={current.question_num} id="a" /> {current.a_text}
                          </label>
                          <label className="btn btn-outline-dark m-1" id={current.question_num+"b"}>
                            <input type="radio" name={current.question_num} id="b" /> {current.b_text}
                          </label>
                          <label className="btn btn-outline-dark m-1" id={current.question_num+"c"}>
                            <input type="radio" name={current.question_num} id="c" />{current.c_text}
                          </label>
                          <label className="btn btn-outline-dark m-1" id={current.question_num+"d"}>
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
              <div className="d-flex">
                <button className="btn mx-auto mb-2 btn-info" onClick={submitAnswer}>پایان آزمون</button>
              </div>
              <h3 className="border-bottom border-top my-1 pt-1 border-success text-center mx-5">{userScore}</h3>

          </div>
        </div>
      </div>
    </div>
    )
}

export default withRouter(TakeQuiz);