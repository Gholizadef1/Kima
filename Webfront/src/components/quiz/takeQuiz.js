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
                    <p className="my-1 text-break ">ییبر اذ لابلذ بلت ذی ت دبلببل ربلذ لبذ دسال یبل یسبیب ل یبل ال بذ یا سیبل یب لیب ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffل یبل سیبل یا بل اب ابل ا لب
                    ل الاغبهنی بتغلل  {quiz.description}</p>
                    {/* <div className="btn btn-info ml-auto mt-2">شروع آزمونک</div> */}
                  </div>
                  <div className=" px-3 border-right border-dark my-auto">
                    <Avatar className="mx-auto " alt={creator.username} src={`${API_BASE_URL}${creator.profile_photo}`}  />
                    <h5 className="text-center mt-2">فاطمه {creator.username}</h5>
                    <p>تاریخ ساخت {quiz.creeate_time}</p>
                  </div>
                </div> 
              </div>
              <hr className="border border-dark"></hr>
              <div className="mx-2 mt-5">

                  <div className="">
                      <p>{questions.questions_num}</p>
                      <h4 className="my-4">صورت سوال1 {questions.questions_text}</h4>
                      <div>

                        <div className=" btn-group-toggle d-flex flex-column col-8 mx-auto " data-toggle="buttons">
                          <label className="btn btn-outline-dark rounded-pill m-1">
                            <input type="radio" name="options" id="option1" checked/> {questions.a_text}ggggggg
                          </label>
                          <label className="btn btn-outline-dark rounded-pill m-1">
                            <input type="radio" name="options" id="option2"/> {questions.b_text}ggggggg jtjyjyjtyjy tjrhhgn hgnhgnghmghmghm
                          </label>
                          <label className="btn btn-outline-dark rounded-pill m-1">
                            <input type="radio" name="options" id="option3"/>{questions.c_text}ggggggg hrt hrthrhr
                            jytjyjyjtu
                          </label>
                          <label className="btn btn-outline-dark rounded-pill m-1 ">
                            <input type="radio" name="options" id="option4"/>{questions.d_text}gggggggfg dfg dfb fdb g bgf bg 
                          </label>
                        </div>

                      </div>
                      <hr className="border rounded-circle col-6 border-info"></hr>

                  </div>


                  <div className="">
                      <p>{questions.questions_num}</p>
                      <h4 className="my-4">صورت سوال1 {questions.questions_text}</h4>
                      <div>

                        <div className=" btn-group-toggle d-flex flex-column col-8 mx-auto " data-toggle="buttons">
                          <label className="btn btn-outline-dark rounded-pill m-1">
                            <input type="radio" name="options" id="option1" checked/> {questions.a_text}ggggggg
                          </label>
                          <label className="btn btn-outline-dark rounded-pill m-1">
                            <input type="radio" name="options" id="option2"/> {questions.b_text}ggggggg jtjyjyjtyyjtyjyjdtyhhhgn hgnhgnghmghmghm
                          </label>
                          <label className="btn btn-outline-dark rounded-pill m-1">
                            <input type="radio" name="options" id="option3"/>{questions.c_text}ggggggg hrt hrthrhrjytjyjyjtu
                          </label>
                          <label className="btn btn-outline-dark rounded-pill m-1 ">
                            <input type="radio" name="options" id="option4"/>{questions.d_text}gggggggfg dfg dfb fdb g bgf bg 
                          </label>
                        </div>

                      </div>
                      <hr className="border rounded-circle col-6 border-info"></hr>

                  </div>
                 
              </div>

          </div>
        </div>
      </div>
    </div>
    )
}

export default withRouter(TakeQuiz);