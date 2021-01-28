
import React, { useState, useEffect } from "react";

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {AiOutlineDislike} from 'react-icons/ai';
import {AiOutlineLike} from 'react-icons/ai';
import axios from 'axios';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Cookies from 'js-cookie';
import Button from '@material-ui/core/Button';
import {withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs(props) {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [massage,setMassage]=useState("");
  const[openSnack,setOpenSnack]=useState(false);
  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
        return;
      }
    setOpenSnack(false);
  };

  const [comments, setComments] = useState([]);
  const [quotes, setQuotes] = useState([]);

  const [quotesPage, setQuotesPage] = useState(1);
  const [quotesPagesNumber, setQuotesPagesNumber] = useState();

  const [commentsPage, setCommentsPage] = useState(1);
  const [commentsPagesNumber, setCommentsPagesNumber] = useState();

  const [quoteAgain,setquoteAgain] = useState(0);
  const [commentAgain,setcommentAgain] = useState(0);

  const [filterBaseComment,setFilterBaseComment]= useState("time");
  const [filterBaseQuote,setFilterBaseQuote]= useState("time");
  

  //for comment
  useEffect(()=>{
    //console.log(props)
    console.log(props.book)
    // axios.get("http://127.0.0.1:8000/bookdetail/"+props.book+'/comment')
    // .then(response=>{
    //   setComments(response.data);
    //   console.log(response);
    //   //setcommentAgain("");
    // })
    // .catch(error=>{
    //   console.log(error);
    //   setEndComment("نظر دیگری وجود ندارد");
    // });

      axios.get("http://127.0.0.1:8000/bookdetail/"+props.book+"/comment-filter-"+filterBaseComment+"?page="+commentsPage,
      {
        headers:{
       "Authorization":"Token "+Cookies.get("userToken")}
        })
    .then(response=>{
     setComments(response.data.comments);
     setCommentsPagesNumber(response.data.count)
      console.log(response);
    })
    .catch(error=>{
      console.log(error);
    });

  },[props.book,commentAgain,commentsPage,filterBaseComment]);

  
  
//for quote
  useEffect(()=>{
    console.log(props.book)
    console.log(quotesPage);
    // axios.get("http://127.0.0.1:8000/api/quotes/"+props.book+"?page="+quotesPage)
    // .then(response=>{
    //  //setQuotes(quotes.concat(response.data));
    //  setQuotes(response.data);
    //   console.log(response);
    // })
    // .catch(error=>{
    //   console.log(error);
    //   setEndQuote("نقل قول دیگری وجود ندارد");
    // });

      axios.get("http://127.0.0.1:8000/bookdetail/"+props.book+"/quote-filter-" + filterBaseQuote +"?page="+quotesPage,
      {
        headers:{
       "Authorization":"Token "+Cookies.get("userToken")}
        })
    .then(response=>{
     setQuotes(response.data.quotes);
     setQuotesPagesNumber(response.data.count);
      console.log(response);
    })
    .catch(error=>{
      console.log(error);
    });
  },[props.book,quoteAgain,quotesPage,filterBaseQuote]);





  const[userComment,setUserComment]=useState("")

  const[userQuote,setUserQuote]=useState("")


  const handleChangeComment = (e) => {
    const {value} = e.target   
    setUserComment(value);
    //console.log(e);
    //console.log(userComment);
  }

  const handleChangeQuote = (e) => {
    const { value} = e.target   
    setUserQuote( value)
    //console.log(e);
    //console.log(userQuote);
  }

  const handleSubmitCommentClick = (e) => {
    //e.preventDefault();
    //console.log(userComment);

    if(userComment.length){
      const payload={
        "textcomment": userComment
      }

      console.log(payload);
      const back= JSON.stringify(payload);
      console.log(back);
      axios.post(
        "http://127.0.0.1:8000/bookdetail/"+props.book+'/comment',

      back
      ,{
       headers:{
      "Content-Type":"application/json",
     "Authorization":"Token "+Cookies.get("userToken")}
      })
      .then(response=>{
        console.log(response);

        if(response.data.status==="success"){
          setOpenSnack(true);
          setMassage("نظر شما با موفقیت ثبت شد")
          setUserComment("");
          setcommentAgain(commentAgain+1);

        }
      })
      .catch(error=>{
        console.log(error);
      });
  

     }else{
      setOpenSnack(true);
      setMassage("نظر خالی است لطفاً چیزی بنویسید")
     }

  }

  const handleSubmitQuoteClick = (e) => {
   if(userQuote.length){
    const payload={
      "textquote": userQuote
    }
    const back= JSON.stringify(payload);
    axios.post('http://127.0.0.1:8000/api/quotes/'+props.book,
    back
    ,{
     headers:{
    "Content-Type":"application/json",
   "Authorization":"Token "+Cookies.get("userToken")}
    })
    .then(response=>{
      console.log(response);

      if(response.data.status==="success"){
        setOpenSnack(true);
        setMassage("نقل‌قول شما با موفقیت ثبت شد")
        setUserQuote("");
        setquoteAgain(quoteAgain+1);
    }})
    .catch(error=>{
      console.log(error);
    });

  }else{
    setOpenSnack(true);
    setMassage("نقل‌قول خالی است لطفاً چیزی بنویسید")
   }
}

  const handleDeleteQuote = (id) => {
    axios.delete('http://127.0.0.1:8000/api/quotes/'+id,
    {
      headers:{
     "Content-Type":"application/json",
    "Authorization":"Token "+Cookies.get("userToken")}
     }
    )
    .then(response=>{
      console.log(response);
      setquoteAgain(quoteAgain+1);

    })
    .catch(error=>{
      console.log(error);
    });

  }

  const handleDeleteComment = (id) => {
    axios.delete("http://127.0.0.1:8000/comment/"+id+'/delete',
    {
      headers:{
     "Content-Type":"application/json",
    "Authorization":"Token "+Cookies.get("userToken")}
     }
    )
    .then(response=>{
      console.log(response);
      setcommentAgain(commentAgain+1);
    })
    .catch(error=>{
      console.log(error);
    });
  }

  const handleLikeClick = (id) => {
    //console.log(id);
    //const payload={}
    //const back= JSON.stringify(payload);
      axios.post(
        "http://127.0.0.1:8000/comment/"+id+"/like",
      {},
      {
       headers:{
      "Content-Type":"application/json",
     "Authorization":"Token "+Cookies.get("userToken")}
      })
      .then(response=>{
        console.log(response);
        setOpenSnack(true);
        if(response.data.message==="successfully liked!"){
          setMassage("عمل با موفقیت انجام شد");
        }else setMassage("عمل با موفقیت انجام شد");
          setcommentAgain(commentAgain+1);
          console.log(response.data.data);
      })
      .catch(error=>{
        console.log(error);
      });
   }

   const handleDislikeClick = (id) => {
      
      axios.post(
        "http://127.0.0.1:8000/comment/"+id+'/dislike',
      {},
      {
       headers:{
      "Content-Type":"application/json",
     "Authorization":"Token "+Cookies.get("userToken")}
      })
      .then(response=>{
        console.log(response);
        setOpenSnack(true);
        if(response.data.message==="successfully disliked!"){
          setMassage("عمل با موفقیت انجام شد");
        }else setMassage("عمل با موفقیت انجام شد");
          setcommentAgain(commentAgain+1);
          console.log(response.data.data);
        
      })
      .catch(error=>{
        console.log(error);
      });
  
   }

   const handleLoveClick=(id)=>{
     console.log(id);
    // console.log(Cookies.get("userToken"));
    // const payload={}
    //const back= JSON.stringify(payload);
    axios.post('http://127.0.0.1:8000/api/quotes/like/'+id,
    {},
    {
     headers:{
    "Content-Type":"application/json",
   "Authorization":"Token "+Cookies.get("userToken")}
    })
    .then(response=>{
      console.log(response);
      setOpenSnack(true);
      if(response.data.message==="like success!"){
        setMassage("عمل با موفقیت انجام شد");
      }else setMassage("عمل با موفقیت انحام شد");
        setquoteAgain(quoteAgain+1);
        console.log(response.data.data);
    })
    .catch(error=>{
      console.log(error);
    });
   }

   const handleCommentFilter=(e)=>{
     setFilterBaseComment(e.target.value);
     console.log(e.target.value);
   }

   const handleQuoteFilter=(e)=>{
    setFilterBaseQuote(e.target.value);
    console.log(e.target.value);
  }



  const StyledButton = withStyles({
    root: {
      background: 'linear-gradient(45deg, #7eccb7 30%, #4a8a96  90%)',
      borderRadius: 3,
      border: 0,
      color: 'black',
      boxShadow: '5px 3px 4px 2px rgba(34, 33, 35, 0.3)',
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);



  return (
    <div>
      <div>
         <Snackbar
              anchorOrigin={{ vertical:'top', horizontal:'center'}}
              open={openSnack}
              autoHideDuration={2500}
              onClose={handleCloseSnack}
              message={<div style={{fontFamily:'Yekan',fontSize:17}}>{massage}</div>}
            />
      </div>
      <AppBar position="static" color="default"  >
        <Tabs
          value={value}
          onChange={handleChangeTab}
           indicatorColor="primary"
          // textColor="primary"
           variant="fullWidth"
          //aria-label="full width tabs example"
        >
          <Tab style={{fontFamily:'Yekan',fontSize:17}} label="خلاصه کتاب" {...a11yProps(0)} />
          <Tab style={{fontFamily:'Yekan',fontSize:17}} label="نظر‌ها" {...a11yProps(1)} />
          <Tab style={{fontFamily:'Yekan',fontSize:17}} label="نقل‌قول‌ها" {...a11yProps(2)} />
          
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'ltr' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
         <TabPanel value={value} index={0} dir={theme.direction} >
          <div style={{fontSize:18,fontFamily:'Yekan'}}>
           {props.bookdescription}
          </div>
        </TabPanel>

        <TabPanel className="" value={value} index={1} dir={theme.direction} >
          <div style={{fontSize:18,fontFamily:'Yekan',direction:"rtl"}}>
            <div className="">
              <h3 className="text-center" >نظر شما چیست؟</h3>
              <div className="d-flex flex-wrap p-3  ">
                <Avatar className="mx-auto" alt={Cookies.get('userName')} src={Cookies.get('userPic')} style={{width:60, height:60}} />
                <div className="d-flex  flex-column mt-2 flex-fill">
                <div className="d-flex flex-wrap">
                <div className="flex-fill form-group mx-3">

                  <textarea className="form-control" rows="1" id="comment" name="text" onChange={handleChangeComment} value={userComment}></textarea>

                </div>
                
                <div type="submit" className="btn btn-info rounded-lg shadow mx-auto align-self-start"
                onClick={handleSubmitCommentClick}
                >ثبت</div>
                </div>
                </div>
              </div>
              <Divider className="mt-3" variant="fullWidth" />
            </div>

            <div className="d-flex my-2 mr-4 " >
              <label className="ml-2 mt-1">براساس:</label>

              <select className="form-control rounded-pill" style={{width:120}} id=""  onChange={handleCommentFilter} >
                  
                <option id="timeBase" value="time">جدید‌ترین</option>
                <option id="rateBase" value="like">محبوب‌ترین</option>

              </select>
            </div>


            <List >

               {comments === undefined ? (
                 

                 <p >نطری برای نمایش وجود ندارد</p>

                ) : (
                  <div>

                  {comments.map ((current) => (
                    
               <div className="" style={{direction:"rtl"}}>
                  <div className="d-flex px-md-3 py-3">
                    <Avatar alt={current.account.username} src={`http://127.0.0.1:8000${current.account.profile_photo}`} style={{width:60, height:60}} />
                    <div className="ml-auto mr-3">
                      <h5>
                        {current.account.username}
                      </h5>
                      <small>
                      {`${current.sendtime.toString().split('T')[0]}`}
                      </small>
                    </div>


                    {current.account.id != Cookies.get("userId") ?(
                      <div></div>
                    ):(
                      <div className="btn m-n1" onClick={()=> handleDeleteComment(current.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                         <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                        </svg>
                      </div>
                    )
                  }


                    
                    <div className="d-flex flex-column m-n1">

                      <div className="btn "> 
                      <AiOutlineLike  color="blue" size="25" onClick={()=> handleLikeClick(current.id)}/>

                      </div>
                      <small className="mr-3">

                        {current.LikeCount}
                      </small>
                    </div>
                    <div className=" d-flex flex-column m-n1">

                      <div className="btn ">
                      <AiOutlineDislike  color="red" size="25"onClick={()=> handleDislikeClick(current.id)}/>

                      </div>
                      <small className="mr-3">

                        {current.DislikeCount}

                      </small>
                    </div>
                  </div>
                  <p className="px-md-3">

                    {current.comment_text}  
                  </p>
                  <Divider variant="middle" component="li" />
                  

              </div>
               ))}
               </div>

                   )} 

            </List>

            {commentsPagesNumber===1 ?(
                <p></p>
              ):(
            <div className="">
              {Array.from(Array(commentsPagesNumber),(e,i)=>{
                return <div className="btn btn-light" 
                onClick={()=>{setCommentsPage(i+1)}}
                > {i+1} </div>
              })}
              </div>
               )}

          </div>
        </TabPanel>

        <TabPanel value={value} index={2} dir={theme.direction}>
          <div style={{fontSize:18,fontFamily:'Yekan',direction:"rtl"}}>
            <div className="">
              <h3 className="text-center">بریده ای از کتاب بنویسید :</h3>
              <div className="d-flex flex-wrap p-3">
                <Avatar className="mx-auto" alt={Cookies.get('userName')} src={Cookies.get('userPic')} style={{width:60, height:60}} />
                <div className="d-flex flex-column mt-2 flex-fill">
                <div className="d-flex flex-wrap">
                <div className="flex-fill form-group mx-3">

                  <textarea className="form-control" rows="1" id="quote" name="text" value={userQuote} onChange={handleChangeQuote}></textarea>

                </div>
                
                <div type="submit" className="btn btn-info rounded-lg shadow mx-auto align-self-start"
                onClick={handleSubmitQuoteClick}
                >ثبت</div>
                </div>
                </div>
              </div>
              <Divider className="mt-3" variant="fullWidth" />
            </div>

            <div className="d-flex my-2 mr-4 " >
              <label className="ml-2 mt-1">براساس:</label>

              <select className="form-control rounded-pill" style={{width:120}} id="" onChange={handleQuoteFilter} >
                  <option id="timeBase" value="time">جدید‌ترین</option>
                  <option id="rateBase" value="like">محبوب‌ترین</option>

              </select>
            </div>

            <List >

            {quotes === undefined ? (
                 

                 <p >نقل‌قولی برای نمایش وجود ندارد </p>

                ) : (
                  <div>

                  {quotes.map ((current) => (
              
              <div className="" style={{direction:"rtl"}}>
                  <div className="d-flex px-md-3 py-3">
                    <Avatar alt={current.account.username} src={`http://127.0.0.1:8000${current.account.profile_photo}`} style={{width:60, height:60}} />
                    <div className="ml-auto mr-3">
                      <h5>
                        {current.account.username}
                      </h5>
                      <small>
                      {`${current.sendtime.toString().split('T')[0]}`}
                      </small>
                    </div>

                    

                    {current.account.id != Cookies.get("userId") ?(
                      <div></div>
                    ):(
                      <div className="btn" onClick={()=> handleDeleteQuote(current.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                         <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                        </svg>

                      </div>
                    )
                  }



                    <div className="d-flex">
                    <small className=" mt-3">
                        {current.Likes}
                      </small>
                      <div className="btn" onClick={()=> handleLoveClick(current.id)}> 

                        <svg width="1.6em" height="1.6em" style={{color:"red"}} viewBox="0 0 16 16" className="bi bi-heart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                        </svg>
                      </div>

                    </div>
                  </div>
                  <div className="px-md-3 d-flex justify-content-center align-items-center text-center mx-3">
                    <div>
                      <svg style={{width:24,height:24}} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M13 6V14H14.88L12.88 18H18.62L21 13.24V6M15 8H19V12.76L17.38 16H16.12L18.12 12H15M3 6V14H4.88L2.88 18H8.62L11 13.24V6M5 8H9V12.76L7.38 16H6.12L8.12 12H5Z" />
                      </svg>
                    </div>
                    <p className="text-right col-11 mx-md-3">

                    {current.quote_text}

                    </p>
                    <div>
                      <svg style={{width:24,height:24}} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M11 18V10H9.12L11.12 6H5.38L3 10.76V18M9 16H5V11.24L6.62 8H7.88L5.88 12H9M21 18V10H19.12L21.12 6H15.38L13 10.76V18M19 16H15V11.24L16.62 8H17.88L15.88 12H19Z" />
                      </svg>
                    </div>
                  </div>
                  <Divider variant="middle" component="li" />

                  </div>
               ))}
               </div>

                   )}
            </List>


            {quotesPagesNumber===1 ?(
                <p></p>
              ):(
            <div className="">
              {Array.from(Array(quotesPagesNumber),(e,i)=>{
                return <div className="btn btn-light" 
                onClick={()=>{setQuotesPage(i+1)}}
                > {i+1} </div>
              })}

              {/* <button type="button" className="btn btn-light "
                onClick={()=>{setQuotesPage(quotesPage-1)}}
               >
                 صفحه قبلی 
              </button>
              <button type="button" className="btn btn-light"
                onClick={()=>{setQuotesPage(quotesPage+1)}}
               >
                صفحه بعدی
              </button> */}
            </div>
              )}


          </div>
          
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
