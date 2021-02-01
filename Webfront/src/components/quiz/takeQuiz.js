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

    useEffect(()=>{
        axios.get(API_BASE_URL + "quiz" + props.match.params.quizId)
        .then(response=>{
            setQuiz(response.data.Quiz);
            setCreator(response.data.Quiz.creator);
            setQuestions(response.data.Questions);
             console.log(response);
           })
           .catch(error=>{
             console.log(error);
           });
    })


  return(
    <div>
      <div className="mx-md-5 px-md-5">
        <div className="rTOl text-right px-md-5 mx-md-5" >
          <div className="mx-md-5 my-5 px-md-3 shadow rounded-lg ">
              <div>
                <div className="d-flex flex-wrap mx-2  rounded-lg pt-3">
                  <div className="d-flex flex-column flex-wrap mx-3">
                    <h3 className="my-1 rounded-lg " >{quiz.title}</h3>
                    <p className="my-1 ">{quiz.description}</p>
                  </div>
                  <div>
                    <Avatar className="" alt={creator.username} src={`${API_BASE_URL}${creator.profile_photo}`} style={{width:60, height:60}} />
                    <h5 className="text-center mt-2">{creator.username}</h5>
                    <p>تاریخ ساخت {quiz.creeate_time}</p>
                  </div>
                </div> 
              </div>
              <div>
                  <div>
                      <p>{questions.questions_num}</p>
                      <h4>صورت سوال {questions.questions_text}</h4>
                      <div>
                          <p>{questions.a_text}</p>
                          <p>{questions.b_text}</p>
                          <p>{questions.c_text}</p>
                          <p>{questions.d_text}</p>
                      </div>

                  </div>
              </div>

          </div>
        </div>
      </div>
    </div>
    )
}

export default withRouter(TakeQuiz);