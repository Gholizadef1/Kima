import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
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

  const [quoteAgain,setquoteAgain] = useState(0);
  const [commentAgain,setcommentAgain] = useState(0);

  const [endQuote,setEndQuote] = useState("");
  const [endComment,setEndComment] = useState("");


  //for comment
  useEffect(()=>{
    console.log(props.book)
    axios.get("http://127.0.0.1:8000/bookdetail/"+props.book+'/comment')
    .then(response=>{
      setComments(response.data);
      console.log(response);
      //setcommentAgain("");
    })
    .catch(error=>{
      console.log(error);
    });

  },[props.book,commentAgain]);

//for quote
  useEffect(()=>{
    console.log(props.book)
    console.log(quotesPage);
    axios.get("http://127.0.0.1:8000/api/quotes/"+props.book+"?page="+quotesPage)
    .then(response=>{
     //setQuotes(quotes.concat(response.data));
     setQuotes(response.data);
      console.log(response);
      //setquoteAgain("");
    })
    .catch(error=>{
      console.log(error);
      //setMassage("نقل قول دیگری وجود ندارد");
      setEndQuote("نقل قول دیگری وجود ندارد")
    });
  },[props.book,quoteAgain,quotesPage]);




  const[userComment,setUserComment]=useState("")

  const[userQuote,setUserQuote]=useState("")

  const handleChangeComment = (e) => {
    const {value} = e.target   
    setUserComment(value);
    console.log(e);
    console.log(userComment);
  }

  const handleChangeQuote = (e) => {
    const { value} = e.target   
    setUserQuote( value)
    console.log(e);
    console.log(userQuote);
  }

  const handleSubmitCommentClick = (e) => {
    e.preventDefault();
    console.log(userComment);
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
        if(response.data.status=="success"){
          setOpenSnack(true);
          setMassage("نظر شما با موفقیت ثبت شد")
          setUserComment("");
          setcommentAgain("added");
        }
      })
      .catch(error=>{
        console.log(error);
      });
  
     }else{
      setOpenSnack(true);
      setMassage("نظر خالی ثبت نشد")
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
      if(response.data.status=="success"){
        setOpenSnack(true);
        setMassage("نقل قول شما با موفقیت ثبت شد")
        setUserQuote("");
        setquoteAgain(quoteAgain+1);
    }})
    .catch(error=>{
      console.log(error);
    });

  }else{
    setOpenSnack(true);
    setMassage("نقل قول خالی ثبت نشد")
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
        if(response.data.message=="successfully liked!"){
          setMassage("لایک نظر شما با موفقیت ثبت شد");
        }else setMassage("لایک نظر شما با موفقیت برداشته شد");
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
        if(response.data.message=="successfully disliked!"){
          setMassage("دیسلایک نظر شما با موفقیت ثبت شد");
        }else setMassage("دیسلایک نظر شما با موفقیت برداشته شد");
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
      if(response.status=="like success!"){
        setMassage("لایک نقل قول شما با موفقیت ثبت شد");
      }else setMassage("لایک نقل قول شما با موفقیت برداشته شد");
        setquoteAgain(quoteAgain+1);
        console.log(response.data.data);
    })
    .catch(error=>{
      console.log(error);
    });
   }


  const StyledButton = withStyles({
    root: {
      background: 'linear-gradient(45deg, #7eccb7 30%, #4a8a96  90%)',
      borderRadius: 3,
      border: 0,
      color: 'black',
      boxShadow: '0 3px 5px 2px rgba(165, 105, 255, 0.3)',
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);



  return (
    <div  >
      <div>
         <Snackbar
              anchorOrigin={{ vertical:'top', horizontal:'center'}}
              open={openSnack}
              autoHideDuration={3000}
              onClose={handleCloseSnack}
              message={massage}
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
          <Tab label="خلاصه کتاب" {...a11yProps(0)} />
          <Tab label="نظر‌ها" {...a11yProps(1)} />
          <Tab label="نقل‌قول‌ها" {...a11yProps(2)} />
          
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'ltr' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
         <TabPanel value={value} index={0} dir={theme.direction}>
          {props.bookdescription}
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
          <div style={{direction:"rtl"}}>
            <div className="">
              <h3 className="text-center">نظر شما چیست؟</h3>
              <div className="d-flex p-3">
                <Avatar className="" alt={Cookies.get('userName')} src={Cookies.get('userPic')} style={{width:60, height:60}} />
                <div className="d-flex flex-column mt-2 flex-fill">
                <div className="d-flex">
                <div className="flex-fill form-group mx-3">
                  <textarea className="form-control" rows="1" id="comment" name="text" onChange={handleChangeComment} value={userComment}></textarea>
                </div>
                
                <StyledButton type="submit" className="btn shadow  align-self-start"
                onClick={handleSubmitCommentClick}
                >ثبت</StyledButton>
                </div>
                </div>
              </div>
              <Divider className="mt-3" variant="fullWidth" />
            </div>

            <div className="d-flex my-2 mr-4 " style={{fontFamily:'Morvarid'}}>
              <label className="ml-2 mt-1">براساس:</label>
              <select className="form-control rounded-pill" style={{width:120}} id="" onChange="" >
                  <option id="rateBase" value="none">محبوب‌ترین</option>
                  <option id="timeBase" value="ToRead">جدید‌ترین</option>
              </select>
            </div>


            <List >
              {comments.message === "No Comment!" ? (
                 

                 <p>هیچ نظری ثبت نشده</p>

                ) : (
                  <div>

                  {comments.map ((current) => (
                    
               <div className="" style={{direction:"rtl"}}>
                  <div className="d-flex p-3">
                    <Avatar alt={current.account.username} src={`http://127.0.0.1:8000${current.account.profile_photo}`} style={{width:60, height:60}} />
                    <div className="ml-auto mr-3">
                      <h5>
                        {current.account.username}
                      </h5>
                      <small>
                      {`${current.sendtime.toString().split('T')[0]}  ${current.sendtime.toString().split('.')[0].split('T')[1]}`}
                      </small>
                    </div>
                    <div className="d-flex flex-column">
                      <div className="btn " onClick={()=> handleLikeClick(current.id)}> 
                        <svg className="bi bi-hand-thumbs-up" style={{color:"green"}} width="1.5em" height="1.5em" viewBox="0 0 16 16"  fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16v-1c.563 0 .901-.272 1.066-.56a.865.865 0 0 0 .121-.416c0-.12-.035-.165-.04-.17l-.354-.354.353-.354c.202-.201.407-.511.505-.804.104-.312.043-.441-.005-.488l-.353-.354.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315L12.793 9l.353-.354c.353-.352.373-.713.267-1.02-.122-.35-.396-.593-.571-.652-.653-.217-1.447-.224-2.11-.164a8.907 8.907 0 0 0-1.094.171l-.014.003-.003.001a.5.5 0 0 1-.595-.643 8.34 8.34 0 0 0 .145-4.726c-.03-.111-.128-.215-.288-.255l-.262-.065c-.306-.077-.642.156-.667.518-.075 1.082-.239 2.15-.482 2.85-.174.502-.603 1.268-1.238 1.977-.637.712-1.519 1.41-2.614 1.708-.394.108-.62.396-.62.65v4.002c0 .26.22.515.553.55 1.293.137 1.936.53 2.491.868l.04.025c.27.164.495.296.776.393.277.095.63.163 1.14.163h3.5v1H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                        </svg>
                      </div>
                      <small className="mr-3">
                        {current.LikeCount}+
                      </small>
                    </div>
                    <div className=" d-flex flex-column">
                      <div className="btn " onClick={()=> handleDislikeClick(current.id)}>
                        <svg className="bi bi-hand-thumbs-down " style={{color:"red"}} width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28v1c.563 0 .901.272 1.066.56.086.15.121.3.121.416 0 .12-.035.165-.04.17l-.354.353.353.354c.202.202.407.512.505.805.104.312.043.44-.005.488l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.415-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.353.352.373.714.267 1.021-.122.35-.396.593-.571.651-.653.218-1.447.224-2.11.164a8.907 8.907 0 0 1-1.094-.17l-.014-.004H9.62a.5.5 0 0 0-.595.643 8.34 8.34 0 0 1 .145 4.725c-.03.112-.128.215-.288.255l-.262.066c-.306.076-.642-.156-.667-.519-.075-1.081-.239-2.15-.482-2.85-.174-.502-.603-1.267-1.238-1.977C5.597 8.926 4.715 8.23 3.62 7.93 3.226 7.823 3 7.534 3 7.28V3.279c0-.26.22-.515.553-.55 1.293-.138 1.936-.53 2.491-.869l.04-.024c.27-.165.495-.296.776-.393.277-.096.63-.163 1.14-.163h3.5v-1H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z"/>
                        </svg>
                      </div>
                      <small className="mr-3">
                        {current.DislikeCount}-
                      </small>
                    </div>
                  </div>
                  <p className="px-3">
                    {current.comment_text}  
                  </p>
                  <Divider variant="middle" component="li" />
                  

              </div>
               ))}
               </div>

                   )}
            </List>

          </div>
        </TabPanel>

        <TabPanel value={value} index={2} dir={theme.direction}>
          <div style={{direction:"rtl"}}>
            <div className="">
              <h3 className="text-center">بریده ای از کتاب بنویسید :</h3>
              <div className="d-flex p-3">
                <Avatar className="" alt={Cookies.get('userName')} src={Cookies.get('userPic')} style={{width:60, height:60}} />
                <div className="d-flex flex-column mt-2 flex-fill">
                <div className="d-flex">
                <div className="flex-fill form-group mx-3">
                  <textarea className="form-control" rows="1" id="quote" name="text" value={userQuote} onChange={handleChangeQuote}></textarea>
                </div>
                
                <StyledButton type="submit" className="btn shadow  align-self-start"
                onClick={handleSubmitQuoteClick}
                >ثبت</StyledButton>
                </div>
                </div>
              </div>
              <Divider className="mt-3" variant="fullWidth" />
            </div>

            <div className="d-flex my-2 mr-4 " style={{fontFamily:'Morvarid'}}>
              <label className="ml-2 mt-1">براساس:</label>
              <select className="form-control rounded-pill" style={{width:120}} id="" onChange="" >
                  <option id="rateBase" value="none">محبوب‌ترین</option>
                  <option id="timeBase" value="ToRead">جدید‌ترین</option>
              </select>
            </div>

            <List >
            {quotes.message === "No Quote!" ? (
                 

                 <p>هیچ نقل قولی ثبت نشده</p>

                ) : (
                  <div>

                  {quotes.map ((current) => (
              
              <div className="" style={{direction:"rtl"}}>
                  <div className="d-flex p-3">
                    <Avatar alt={current.account.username} src={`http://127.0.0.1:8000${current.account.profile_photo}`} style={{width:60, height:60}} />
                    <div className="ml-auto mr-3">
                      <h5>
                        {current.account.username}
                      </h5>
                      <small>
                      {`${current.sendtime.toString().split('T')[0]}  ${current.sendtime.toString().split('.')[0].split('T')[1]}`}
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
                        <svg width="2em" height="2em" style={{color:"red"}} viewBox="0 0 16 16" className="bi bi-heart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 d-flex justify-content-center align-items-center text-center mx-3">
                    <div>
                      <svg style={{width:24,height:24}} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M13 6V14H14.88L12.88 18H18.62L21 13.24V6M15 8H19V12.76L17.38 16H16.12L18.12 12H15M3 6V14H4.88L2.88 18H8.62L11 13.24V6M5 8H9V12.76L7.38 16H6.12L8.12 12H5Z" />
                      </svg>
                    </div>
                    <p className="text-right col-11 mx-3">
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

            <p>
              {endQuote}
            </p>

            <button type="button" className="btn btn-light col-12"
              onClick={()=>{setQuotesPage(quotesPage+1)}}
             >
              بیشتر
            </button>

           

          </div>
          
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
