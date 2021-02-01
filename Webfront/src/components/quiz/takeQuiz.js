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
    // [userAnswers,setUserAnswers] = useState([]);

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

    const submitAnswer = (e) => {
      e.target.setAttribute("disabled", "");
      
      //show true answers
      //document.getElementById("a").style.backgroundColor = "red";
      //document.getElementById("a").style.backgroundColor = "green";
      //document.getElementById("a").style.color = "white";
      var i;
      for(i=1;i < questions.length+1;i++){
        var node= document.getElementById(i).getElementsByClassName("active")[0].id;
        document.getElementById(node).style.color = "white";
        document.getElementById(node).style.backgroundColor = "red";
        //console.log(node);
        //console.log(questions.questions_num + node);

        document.getElementById(i+questions[i-1].key).style.backgroundColor = "green";
       }
      
      //console.log( document.getElementById("w").getElementsByClassName("active")[0].id);

      

      //post answer
      // axios.get(API_BASE_URL + "quiz" + props.match.params.quizId)
      //   .then(response=>{
      //       setQuiz(response.data.Quiz);
      //       setCreator(response.data.Quiz.creator);
      //       setQuestions(response.data.Questions);
      //        console.log(response);
      //      })
      //      .catch(error=>{
      //        console.log(error);
      //      });
  }


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
                  </div>
                  <div className=" px-3 border-right border-dark my-auto">
                    <Avatar className="mx-auto mb-2" alt={creator.username} src={`${API_BASE_URL}${creator.profile_photo}`}  />
                    <p className="text-center my-n1">سازنده :</p>
                    <p className="text-center my-n1">فاطمه {creator.username}</p>
                    <p className="text-center text-muted my-n1">{quiz.creeate_time}sss</p>
                  </div>
                </div> 
              </div>
              <hr className="border border-dark"></hr>
              <div className="mx-2 mt-5">
                  <div className="">
                      <p>{questions.questions_num}</p>
                      <h4 className="my-4 col-8 mx-auto ">صورت سوال1 {questions.questions_text}</h4>
                      <div>
                        <div className=" btn-group-toggle d-flex flex-column col-8 mx-auto " id="1" data-toggle="buttons">
                          <label className="btn btn-outline-dark m-1" id={questions.questions_num+"a"}>
                            <input type="radio" name={questions.questions_num} id="a" /> {questions.a_text}ggggggg
                          </label>
                          <label className="btn btn-outline-dark m-1" id={questions.questions_num+"b"}>
                            <input type="radio" name={questions.questions_num} id="b" /> {questions.b_text}ggggggg jtjyjyjtyjy tjrhhgn hgng hgfh hdfg dfd fg df dfg fd gdf gdf gsdflksld ew dfef gf fdg f gf bf d fdv sdf sdhgnghmghmghm
                          </label>
                          <label className="btn btn-outline-dark m-1" id={questions.questions_num+"c"}>
                            <input type="radio" name={questions.questions_num} id="c" />{questions.c_text}ggggggg hrt hrthrhr
                          </label>
                          <label className="btn btn-outline-dark m-1" id={questions.questions_num+"d"}>
                            <input type="radio" name={questions.questions_num} id="d" />{questions.d_text}gggggggfg dfg dfb fdb g bgf bg 
                          </label>
                          <label className="active" id={questions.questions_num+"none"} ></label>
                        </div>
                      </div>
                      <hr className="border rounded-circle col-6 border-info"></hr>
                  </div>
              </div>
              <div className="d-flex">
                <button className="btn mx-auto mb-2 btn-info" onClick={submitAnswer}>پایان آزمون</button>
              </div>

          </div>
        </div>
      </div>
    </div>
    )
}

export default withRouter(TakeQuiz);