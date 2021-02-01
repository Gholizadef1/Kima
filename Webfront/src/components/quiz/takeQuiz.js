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
          <div className="mx-md-5 my-5 px-md-3 shadow border rounded-lg ">
              <div >
                <div className="d-flex mx-2 pt-3">
                  <div className="d-flex flex-column flex-wrap ml-auto col-8">
                    <h1 className="my-1 rounded-lg " >عنوان {quiz.title}</h1>
                    <p className="my-1 text-break ">ییبر اذ لابلذ بلت ذی ت دبل تبل یل دبل دشبی تعارذهتب لبا لببل ربلذ لبذ د ادد لل بل للا ل ل لبد بلد لت تپ بلبا بیل سال یبل یسبیب ل یبل ال بذ یا سیبل یب لیب ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffل یبل سیبل یا بل اب ابل ا لب
                    ل الاغبهنی بتغلل  {quiz.description}</p>
                    <div className="btn btn-info ml-auto mt-2">شروع آزمونک</div>
                  </div>
                  <div className=" px-3 border-right border-dark my-auto">
                    <Avatar className="mx-auto " alt={creator.username} src={`${API_BASE_URL}${creator.profile_photo}`}  />
                    <h5 className="text-center mt-2">فاطمه {creator.username}</h5>
                    <p>تاریخ ساخت {quiz.creeate_time}
                    {/* {`${quiz.creeate_time.toString().split('T')[0]}`} */}
                    </p>
                  </div>
                 
                </div> 
              </div>
              <hr className="border border-dark"></hr>
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