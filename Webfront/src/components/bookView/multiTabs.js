import React,{useState} from 'react';
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

  // useEffect(()=>{
  //   axis.get()
  //   .then()
  //   .catch();

  // },[]);




  const[userComment,setUserComment]=useState("")

  const[userQuote,setUserQuote]=useState("")

  // const handleChangeComment = (e) => {
  //   const {id , value} = e.target   
  //   setUserComment(prevState => ({
  //       ...prevState,
  //       [id] : value
  //   }))
  // }

  // const handleChangeQuote = (e) => {
  //   const {id , value} = e.target   
  //   setUserQuote(prevState => ({
  //       ...prevState,
  //       [id] : value
  //   }))
  // }

  const handleSubmitCommentClick = (e) => {
    if(userComment.length){
      const payload={
        "textcomment": userComment
      }
      const back= JSON.stringify(payload);
      axios.post('http://127.0.0.1:8000/api/comments/'+props.book,
      back
      ,{
       headers:{
      "Content-Type":"application/json",
     "Authorization":"Token "+Cookies.get("userToken")}
      })
      .then(response=>{
        console.log(response);
        if(response.status=="success"){
          setOpenSnack(true);
          setMassage("نظر شما با موفقیت ثبت شد")
          setUserComment("");
  
        }
      })
      .catch(error=>{
        console.log(error);
      });
  
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
      if(response.status=="success"){
        setOpenSnack(true);
        setMassage("نقل قول شما با موفقیت ثبت شد")
        setUserQuote("");

      }
    })
    .catch(error=>{
      console.log(error);
    });

  }}


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
                  <textarea className="form-control" rows="1" id="comment" name="text" value={userComment}></textarea>
                </div>
                
                <StyledButton type="submit" className="btn shadow  align-self-start"
                onClick={handleSubmitCommentClick}style={{color:"white",fontFamily:"Mitra",fontWeight:"bold"}}
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
               <div className="" style={{direction:"rtl"}}>
                {/* {customElements.map((current)=>( */}
                  <div className="d-flex p-3">
                    <Avatar alt="ali" src="" style={{width:60, height:60}} />
                    <div className="ml-auto mr-3">
                      <h5>
                        ali
                      </h5>
                      <small>
                      2020-02-20   10:30
                      </small>
                    </div>
                    <div className="d-flex flex-column">
                      <div className="btn "> 
                      <AiOutlineLike  color="blue" size="25"/>
                      </div>
                      <small className="mr-3">
                        10+
                      </small>
                    </div>
                    <div className=" d-flex flex-column">
                      <div className="btn ">
                      <AiOutlineDislike  color="red" size="25"/>
                      </div>
                      <small className="mr-3">
                        10-
                      </small>
                    </div>
                  </div>
                  <p className="px-3">
                  من اینه که  نظر من اینه که  نظر من اینه که  نظر من ای من اینه که  نظر من اینه که  نظر من اینه که  نظر من ای من اینه که  نظر من اینه که  نظر من اینه که  نظر من ای من اینه که  نظر من اینه که  نظر من اینه که  نظر من ای من اینه که  نظر من اینه که  نظر من اینه که  نظر من ای من اینه که  نظر من اینه که  نظر من اینه که  نظر من ایی
                  </p>
                  <Divider variant="middle" component="li" />
                {/* ))} */}
              </div>
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
                  <textarea className="form-control" rows="1" id="quote" name="text" value={userQuote}></textarea>
                </div>
                
                <StyledButton type="submit" className="btn shadow  align-self-start"
                onClick={handleSubmitQuoteClick} style={{color:"white",fontFamily:"Mitra",fontWeight:"bold"}}
                >ثبت</StyledButton>
                </div>
                </div>
              </div>
              <Divider className="mt-3" variant="fullWidth" />
            </div>

            <div className="d-flex my-2 mr-4 " style={{fontFamily:'Mitra'}}>
              <label className="ml-2 mt-1">براساس:</label>
              <select className="form-control rounded-pill" style={{width:120}} id="" onChange="" >
                  <option id="rateBase" value="none">محبوب‌ترین</option>
                  <option id="timeBase" value="ToRead">جدید‌ترین</option>
              </select>
            </div>

            <List >
               <div className="" style={{direction:"rtl"}}>
                {/* {customElements.map((current)=>( */}
                  <div className="d-flex p-3">
                    <Avatar alt="فاطمه" src="" style={{width:60, height:60}} />
                    <div className="ml-auto mr-3">
                      <h5>
                        fateme
                      </h5>
                      <small>
                      2020-02-20   10:30
                      </small>
                    </div>
                    <div className="d-flex">
                    <small className=" mt-3">
                        10
                      </small>
                      <div className="btn "> 
                      <AiOutlineDislike color="blue" size="25"/>
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
                      نقل قول اینی که نقل قول اینی که نقل قول اینی که نقل قول اینی که نقل قول اینی که نقل قول اینی که نقل قول اینی که نقل قول اینی که 
                    </p>
                    <div>
                      <svg style={{width:24,height:24}} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M11 18V10H9.12L11.12 6H5.38L3 10.76V18M9 16H5V11.24L6.62 8H7.88L5.88 12H9M21 18V10H19.12L21.12 6H15.38L13 10.76V18M19 16H15V11.24L16.62 8H17.88L15.88 12H19Z" />
                      </svg>
                    </div>
                  </div>
                  <Divider variant="middle" component="li" />
                {/* ))} */}
              </div>
              <div className="" style={{direction:"rtl"}}>
                {/* {customElements.map((current)=>( */}
                  <div className="d-flex p-3">
                    <Avatar alt="فاطمه" src="" style={{width:60, height:60}} />
                    <div className="ml-auto mr-3">
                      <h5>
                        fateme
                      </h5>
                      <small>
                      2020-02-20   10:30
                      </small>
                    </div>
                    <div className="d-flex">
                    <small className=" mt-3">
                        10
                      </small>
                      <div className="btn "> 
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
                      نقل قول اینی که نقل قول اینیل اینی که نقل قول اینی که 
                    </p>
                    <div>
                      <svg style={{width:24,height:24}} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M11 18V10H9.12L11.12 6H5.38L3 10.76V18M9 16H5V11.24L6.62 8H7.88L5.88 12H9M21 18V10H19.12L21.12 6H15.38L13 10.76V18M19 16H15V11.24L16.62 8H17.88L15.88 12H19Z" />
                      </svg>
                    </div>
                  </div>
                  <Divider variant="middle" component="li" />
                {/* ))} */}
              </div>
            </List>

          </div>
          
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
